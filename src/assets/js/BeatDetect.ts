class BeatDetect {

    public VERSION = '1.0.0';
    private _log = false;
    private _perf = false;
    private _sampleRate = 44100;
    private _round = false;
    private _float = 8;
    private _lowPassFreq = 150;
    private _highPassFreq = 100;
    private _bpmRange = [90, 180];
    private _timeSignature = 4;
    private count = 0;
    private _ts = {
      current: 0,
      previous: 0,
      first: 0
    };
    private _tapResetId = -1;

  /** @summary <h1>Beat detection library</h1>
   * @author Arthur Beaulieu
   * @since November 2020
   * @description <blockquote>This library provides an audio analyser to retrieve a track beat per minute value. It is
   * also made to guess the time offset before the first significant sound (relative to the BPM), and the time offset of
   * the estimated first bar. All its parameters can be updated when constructed, so it can adapt to any type of audio
   * input. The analysis method is based on the work of Joe Sullivan and José M. Pérez, and is describe in the
   * <code>README.md</code> file of its repository. Remarks and pull requests are welcome!</blockquote>
   * @param {object} [options] - The configuration object of this library
   * @param {boolean} [options.log=false] - Log debug information during the analysis process
   * @param {boolean} [options.perf=false] - Log ellapsed time of each analysis step
   * @param {number} [options.sampleRate=44100] - The sample rate to use during the audio analysis. Can be changed its setter
   * @param {boolean} [options.round=false] - Allow the output rounding to remove floating point
   * @param {number} [options.float=8] - The floating precision for the output. Disabled if round is at true
   * @param {number} [options.lowPassFreq=150] - The low pass filter cut frequency
   * @param {number} [options.highPassFreq=100] - The high pass filter cut frequency
   * @param {number[]} [options.bpmRange=[90, 180]] - The BPM range to output the result in
   * @param {number} [options.timeSignature=4] - The analysed audio time signature **/
  constructor(options = {log: false, perf: false, sampleRate: 44100, round: false, float: 8, lowPassFreq: 150, highPassFreq: 100, bpmRange: [90, 180], timeSignature: 4}) {
    // Attach Web Audio API components to the window
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    // Ensure that client browser supports the Web Audio API, return otherwise
    if (!window.AudioContext || !(window as any).OfflineContext) {
      console.error(`BeatDetect.ERROR : Your browser doesn't support the WebAudio API.`);
      return; // Stop right here the BeatDetect.js component construction
    }
    /** @public
     * @member {string} - The BeatDetect version number **/
    this.VERSION = '1.0.0';
    /** @private
     * @member {boolean} - Log debug information in the console when set to true **/
    this._log = options.log || false;
    /*  ----  Automation beat deterination internals  ----  */
    /** @private
     * @member {boolean} - Log elapsed times during the analysis in the console when set to true **/
    this._perf = options.perf || false;
    /** @private
     * @member {number} - The sample rate used for analysis. Must match the analysed audio sample rate **/
    this._sampleRate = options.sampleRate || 44100;
    /** @private
     * @member {boolean} - Remove any floating point from output when set to true **/
    this._round = options.round || false;
    /** @private
     * @member {number} - The number of floating point for the output **/
    this._float = options.float || 8;
    /** @private
     * @member {number} - The low pass filter cut frequency **/
    this._lowPassFreq = options.lowPassFreq || 150;
    /** @private
     * @member {number} - The high pass filter cut frequency **/
    this._highPassFreq = options.highPassFreq || 100;
    /** @private
     * @member {array} - The BPM range to display the output in **/
    this._bpmRange = options.bpmRange || [90, 180];
    /** @private
     * @member {number} - The studied track time signature **/
    this._timeSignature = options.timeSignature || 4;
    /*  ------  Manual beat deterination internals  ------  */
    /** @private
     * @member {number} - The amount of time a click is trigerred to compute BPM **/
    this.count = 0;
    /** @private
     * @member {object} - Contains timestamp used to determine manual BPM **/
    this._ts = {
      current: 0,
      previous: 0,
      first: 0
    };
    /** @private
     * @member {number} - Reset tap timeout ID **/
    this._tapResetId = -1;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ---------------------------------------------  PUBLIC METHOD  ------------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name getBeatInfo
   * @public
   * @memberof BeatDetect
   * @description <blockquote>Perform a beat detection on a given track and return the analysis result trhough the
   * Promise resolution. Any exception will be thrown in the Promise catch method.</blockquote>
   * @param {object} options - The beat detection option
   * @param {string} options.url - The url to the audio file to analyse
   * @param {string} [options.name] - The track name, only useful for logging
   * @returns {promise} A Promise that is resolved when analysis is done, of will be rejected otherwise **/
  getBeatInfo(options: BeatDetectionOptions): Promise<BeatInfo> {
    // Performances mark to compute execution duration
    options.perf = {
      m0: performance.now(), // Start beat detection
      m1: 0, // Fetch track done
      m2: 0, // Offline context rendered
      m3: 0 // Bpm processing done
    };
    // In order ; fetch track, decode its buffer, process it and send back BPM info
    return new Promise((resolve, reject) => {
      this._fetchRawTrack(options)
        .then(this._buildOfflineCtx.bind(this))
        .then(this._processRenderedBuffer.bind(this))
        .then(resolve).catch(reject);
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ----------------------------------------  OVERALL LOGIC METHODS  ---------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _fetchRawTrack
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will perform a fetch on the given URL to retrieve the track to analyse.</blockquote>
   * @param {object} options - The option object sent to the <code>getBeatInfo</code> method, augmented with performance marks
   * @returns {promise} A Promise that is resolved when analysis is done, of will be rejected otherwise **/
  _fetchRawTrack(options: BeatDetectionOptions) {
    return new Promise<BuildOfflineCtxOptions>((resolve, reject) => {
      if (!options) {
        reject('BeatDetect.ERROR : No options object sent to _fetchRawTrack method.');
      } else if (!options.url || !options.perf || typeof options.url !== 'string' || typeof options.perf !== 'object') {
        reject('BeatDetect.ERROR : Options object sent to _fetchRawTrack method is invalid.');
      } else {
        this._logEvent('log', `Fetch track${options.name ? ' ' + options.name : ''}.`);
        let request = new XMLHttpRequest();
        request.open('GET', options.url, true);
        request.responseType = 'arraybuffer';
        request.onload = () => {
          if (request.status == 404) {
            reject('BeatDetect.ERROR : 404 File not found.');
          }

          options!.perf!.m1 = performance.now();
          resolve(Object.assign(request, options) as BuildOfflineCtxOptions);
        };
        request.onerror = reject;
        request.send();
      }
    });
  }

  /** @method
   * @name _buildOfflineCtx
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will build and connect all required nodes to perform the BPM analysis.</blockquote>
   * @param {object} options - The option object sent to the <code>_fetchRawTrack</code> method, augmented with track array buffer
   * @returns {promise} A Promise that is resolved when analysis is done, of will be rejected otherwise **/
  _buildOfflineCtx(options : BuildOfflineCtxOptions) {
    return new Promise<ProcessRenderedBufferOptions>((resolve, reject) => {
      if (!options) {
        reject('BeatDetect.ERROR : No options object sent to _buildOfflineCtx method.');
      } else if (!options.response || !options.perf || typeof options.response !== 'object' || typeof options.perf !== 'object') {
        reject('BeatDetect.ERROR : Options object sent to _buildOfflineCtx method is invalid.');
      } else {
        this._logEvent('log', 'Offline rendering of the track.');
        // Decode track audio with audio context to later feed the offline context with a buffer
        const audioCtx = new AudioContext();
        audioCtx.decodeAudioData(options.response, buffer => {
          // Define offline context according to the buffer sample rate and duration
          const offlineCtx = new window.OfflineContext(2, buffer.duration * this._sampleRate, this._sampleRate);
          // Create buffer source from loaded track
          const source = offlineCtx.createBufferSource();
          source.buffer = buffer;
          // Lowpass filter to ignore most frequencies except bass (goal is to retrieve kick impulsions)
          const lowpass = offlineCtx.createBiquadFilter();
          lowpass.type = 'lowpass';
          lowpass.frequency.value = this._lowPassFreq;
          lowpass.Q.value = 1;
          // Apply a high pass filter to remove the bassline
          const highpass = offlineCtx.createBiquadFilter();
          highpass.type = 'highpass';
          highpass.frequency.value = this._highPassFreq;
          highpass.Q.value = 1;
          // Chain offline nodes from source to destination with filters among
          source.connect(lowpass);
          lowpass.connect(highpass);
          highpass.connect(offlineCtx.destination);
          // Start the source and rendering
          source.start(0);
          offlineCtx.startRendering();
          // Continnue analysis when buffer has been read
          offlineCtx.oncomplete = result => {
            options.perf.m2 = performance.now();
            resolve(Object.assign(result, options));
          };
          // offlineCtx.onerror = reject;
        }, err => {
          reject(`BeatDetect.ERROR : ${err}`);
        });
      }
    });
  }


  /** @method
   * @name _processRenderedBuffer
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will process the audio buffer to extract its peak and guess the track BPM and offset.</blockquote>
   * @param {object} options - The option object sent to the <code>_buildOfflineCtx</code> method, augmented with track audio buffer
   * @returns {promise} A Promise that is resolved when analysis is done, of will be rejected otherwise **/
  _processRenderedBuffer(options: ProcessRenderedBufferOptions) {
    return new Promise<BeatInfo>((resolve, reject) => {
      if (!options) {
        reject('BeatDetect.ERROR : No options object sent to _processRenderedBuffer method.');
      } else if (!options.renderedBuffer || !options.perf || typeof options.renderedBuffer !== 'object' || typeof options.perf !== 'object') {
        reject('BeatDetect.ERROR : Options object sent to _processRenderedBuffer method is invalid.');
      } else {
        this._logEvent('log', 'Collect beat info.');
        // Extract PCM data from offline rendered buffer
        const dataL = options.renderedBuffer.getChannelData(0);
        const dataR = options.renderedBuffer.getChannelData(1);
        // Extract most intense peaks, and create intervals between them
        const peaks = this._getPeaks([dataL, dataR]);
        const groups = this._getIntervals(peaks);
        // Sort found intervals by count to get the most accurate one in first position
        var top = groups.sort((intA, intB) => {
          return intB.count - intA.count;
        }).splice(0, 5); // Only keep the 5 best matches
        // Build offset and first bar
        const offsets = this._getOffsets(dataL, top[0].tempo);
        options.perf.m3 = performance.now();
        this._logEvent('log', 'Analysis done.');
        // Sent BPM info to the caller
        resolve(Object.assign({
          bpm: top[0].tempo,
          offset: this._floatRound(offsets.offset, this._float),
          firstBar: this._floatRound(offsets.firstBar, this._float)
        }, this._perf ? { // Assign perf key to return object if user requested it
          perf: this._getPerfDuration(options.perf)
        } : null));
      }
    });
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  ------------------------------------------  BPM GUESS METHODS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _getPeaks
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will extract peak value from given channel data. See implementation for further details.</blockquote>
   * @param {array[]} data - Array containg L/R audio data arrays
   * @returns {array} An array filled with peaks value **/
  _getPeaks(data: [Float32Array, Float32Array]) {
    // What we're going to do here, is to divide up our audio into parts.
    // We will then identify, for each part, what the loudest sample is in that part.
    // It's implied that that sample would represent the most likely 'beat' within that part.
    // Each part 22,050 samples, half fft.
    const partSize = this._sampleRate / 2;
    const parts = data[0].length / partSize;
    let peaks: Peak[] = [];
    // Iterate over .5s parts we created
    for (let i = 0; i < parts; ++i) {
      let max = 0 as unknown as Peak;
      // Iterate each byte in the studied part
      for (let j = i * partSize; j < (i + 1) * partSize; ++j) {
        const volume = Math.max(Math.abs(data[0][j]), Math.abs(data[1][j]));
        if (!max || (volume > max.volume)) {
          // Save peak at its most intense position
          max = {
            position: j,
            volume: volume
          };
        }
      }
      peaks.push(max);
    }
    // Sort peaks per volume
    peaks.sort((a, b) => {
      return b.volume - a.volume;
    });
    // This way we can ignore the less loud half
    peaks = peaks.splice(0, peaks.length * 0.5);
    // Then sort again by position to retrieve the playback order
    peaks.sort((a, b) => {
      return a.position - b.position;
    });
    // Send back peaks
    return peaks;
  }


  /** @method
   * @name _getIntervals
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will then compute time interval between peak, in order to
   * spot the interval that is the most represented. See implementation for further details.</blockquote>
   * @param {object[]} peaks - The peaks for a given track. Returned from _getPeaks method
   * @returns {array} An array of time intervals **/
  _getIntervals(peaks: Peak[]) {
    // What we now do is get all of our peaks, and then measure the distance to
    // other peaks, to create intervals. Then, based on the distance between
    // those peaks (the distance of the intervals) we can calculate the BPM of
    // that particular interval.
    // The interval that is seen the most should have the BPM that corresponds
    // to the track itself.
    const groups: PeakGroup[] = [];
    // Comparing each peak with the next one to compute an interval group
    peaks.forEach((peak, index) => {
      for (let i = 1; (index + i) < peaks.length && i < 10; ++i) {
        const group = {
          tempo: (60 * this._sampleRate) / (peaks[index + i].position - peak.position),
          count: 1,
          position: peak.position,
          peaks: []
        };
        // Trim to fit tempo range to lower bound
        while (group.tempo <= this._bpmRange[0]) {
          group.tempo *= 2;
        }
        // Trim to fit tempo range to upper bound
        while (group.tempo > this._bpmRange[1]) {
          group.tempo /= 2;
        }
        // Integer or floating rounding of tempo value
        if (this._round === true) { // Integer rounding
          group.tempo = Math.round(group.tempo);
        } else { // Floating rounding
          group.tempo = this._floatRound(group.tempo, this._float);
        }
        // Test if exists and if so, increment the interval count number
        const exists = groups.some(interval => {
          if (interval.tempo === group.tempo) {
            interval.peaks.push(peak);
            ++interval.count;
            // Notify that group already exists
            return true;
          }
          // Return false if no match
          return false;
        });
        // Insert only if not existing
        if (!exists) {
          groups.push(group);
        }
      }
    });

    return groups;
  }


  /** @method
   * @name _getOffsets
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will finally compute time offset from song start to first bar, or first
   * significant beat. See implementation for further details.</blockquote>
   * @param {object[]} data - Array containg L audio data (no important to stereo this)
   * @param {number} bpm - The most credible BPM, computed after the most frequent time interval
   * @returns {object} The beat offset and the offset to the first bar **/
  _getOffsets(data: Float32Array, bpm: number) {
    // Now we have bpm, we re-calculate peaks for the 30 first seconds.
    // Since a peak is at the maximum waveform height, we need to offset its time a little on its left.
    // This offset is empiric, and based on a fraction of the BPM duration in time.
    // We assume the left offset from the highest volule value is 5% of the bpm time frame
    // Once peak are found and sorted, we get offset by taking the most intense peak (which is
    // a strong time of the time signature), and use its position to find the smallest time from
    // the track start that is relative to the time signature and the strong time found.
    // The first bar is the actual first beat that overcome a 20% threshold, it will mostly be
    // equal to the BPM offset.
    var partSize = this._sampleRate / 2;
    var parts = data.length / partSize;
    var peaks = [];
    // Create peak with little offset on the left to get the very start of the peak
    for (let i = 0; i < parts; ++i) {
      let max = 0 as unknown as Peak;
      for (let j = i * partSize; j < (i + 1) * partSize; ++j) {
        const volume = data[j];
        if (!max || (volume > max.volume)) {
          max = {
            position: j - Math.round(((60 / bpm) * 0.05) * this._sampleRate), // Arbitrary offset on the left of the peak about 5% bpm time
            volume: volume
          };
        }
      }
      peaks.push(max);
    }
    // Saved peaks ordered by position before any sort manipuplation
    const unsortedPeaks = [...peaks]; // Clone array before sorting for first beat matching
    // Sort peak per decreasing volumes
    peaks.sort((a, b) => {
      return b.volume - a.volume;
    });
    // First peak is the loudest, we assume it is a strong time of the 4/4 time signature
    const refOffset = this._getLowestTimeOffset(peaks[0].position, bpm);
    let mean = 0;
    let divider = 0;
    // Find shortest offset
    for (let i = 0; i < peaks.length; ++i) {
      const offset = this._getLowestTimeOffset(peaks[i].position, bpm);
      if (offset - refOffset < 0.05 || refOffset - offset > -0.05) { // Only keep first times to compute mean
        mean += offset;
        ++divider;
      }
    }
    // Find first beat offset
    let i = 0; // Try finding the first peak index that is louder than provided threshold (0.02)
    while (unsortedPeaks[i].volume < 0.02) { // Threshold is also arbitrary...
      ++i;
    }
    // Convert position into time
    let firstBar = (unsortedPeaks[i].position / this._sampleRate);
    // If matching first bar is before any possible time ellapsed, we set it at computed offset
    if (firstBar > (mean / divider) && firstBar < (60 / bpm)) {
      firstBar = (mean / divider)
    }
    // Return both offset and first bar offset
    return {
      offset: (mean / divider),
      firstBar: firstBar
    };
  }


  /** @method
   * @name _getLowestTimeOffset
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will search for the smallest time in track for a beat ; using
   * the estimated bpm, we rewind from time signature to get the closest from the track beginning.
   * See implementation for further details.</blockquote>
   * @param {object[]} position - The beat position for beat to lower
   * @param {number} bpm - The most credible BPM, computed after the most frequent time interval
   * @returns {object} The beat offset and the offset to the first bar **/
  _getLowestTimeOffset(position: number, bpm: number) {
    // Here we compute beat time offset using the first spotted peak.
    // The lowest means we rewind following the time signature, to find the smallest time
    // which is between 0s and the full mesure time (timesignature * tempo)
    // Using its sample index and the found bpm
    const bpmTime = 60 / bpm;
    const firstBeatTime = position / this._sampleRate;
    let offset = firstBeatTime;

    while (offset >= bpmTime) {
      offset -= (bpmTime * this._timeSignature);
    }

    if (offset < 0) {
      while (offset < 0) {
        offset += bpmTime;
      }
    }

    return offset;
  }


  /** @method
   * @name _getPerfDuration
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will format performance mark to be readable as times</blockquote>
   * @param {object[]} perf - The performance mark to format
   * @returns {object} The ellapsed times for different beat detection steps **/
  _getPerfDuration(perf: BeatPerf) {
    // Convert performance mark into ellapsed seconds
    return {
      total: (perf.m3 - perf.m0) / 1000,
      fetch: (perf.m1 - perf.m0) / 1000,
      render: (perf.m2 - perf.m1) / 1000,
      process: (perf.m3 - perf.m2) / 1000
    }
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  -------------------------------------------  BPM TAP METHODS  ------------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name tapBpm
   * @public
   * @memberof BeatDetect
   * @description <blockquote>Providing a DOM element and a callback to manually determine a bpm, using a click.
   * After 5 seconds, the result will be reset.</blockquote>
   * @param {objects} options - Manual bpm determinitation options
   * @param {object} options.element - The DOM element to listen to
   * @param {number} options.precision - The floating point for result
   * @param {function} options.callback - The callback function to call each click **/
  tapBpm(options: TapBpmOptions) {
    options.element.addEventListener('click', this._tapBpm.bind(this, options), false);
  }


  /** @method
   * @name _tapBpm
   * @private
   * @memberof BeatDetect
   * @description <blockquote>Internal method to determine manual BPM</blockquote>
   * @param {object} options - The internal options object
   * @param {number} precision - The floating point for result
   * @param {function} callback - The callback function to call each click **/
  _tapBpm(options: TapBpmOptions) {
    window.clearTimeout(this._tapResetId);

    this._ts.current = Date.now();
    // Store the first timestamp of the tap sequence on first click
    if (this._ts.first === 0) {
      this._ts.first = this._ts.current;
    }

    if (this._ts.previous !== 0) {
      let bpm = 60000 * this.count / (this._ts.current - this._ts.first);
      if (options.precision) {
        bpm = this._floatRound(bpm, options.precision);
      }
      options.callback(bpm);
    }

    // Store the old timestamp
    this._ts.previous = this._ts.current;
    ++this.count;

    this._tapResetId = window.setTimeout(() => {
      this.count = 0;
      this._ts.current = 0;
      this._ts.previous = 0;
      this._ts.first = 0;
      options.callback('--');
    }, 5000);
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  UTIL METHODS  --------------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** @method
   * @name _logEvent
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will display a given console output if the logging is allowed.</blockquote>
   * @param {string} level - The console method to call in info, log, warn, error, trace etc.
   * @param {string} string - The text to display in the console **/
  _logEvent(level: 'info'|'log'|'warn'|'error'|'trace', string: string) {
    if (this._log === true) {
      console[level](`BeatDetect : ${string}`);
    }
  }


  /** @method
   * @name _floatRound
   * @private
   * @memberof BeatDetect
   * @description <blockquote>This method will return a rounded floating value to a given precision.</blockquote>
   * @param {number} value - The value to round at a given floating point
   * @param {number} precision - The amount of numbers after the floating point
   * @returns {number} The rounded value with its given floating point **/
  _floatRound(value: number, precision: number) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  SETTERS METHODS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */


  /** Set sample rate for analysis.
   * @param {number} sampleRate	**/
  set sampleRate(sampleRate: number) {
    this._sampleRate = sampleRate;
  }


  /** Set logging in console.
   * @param {boolean} log	**/
  set log(log: boolean) {
    this._log = log;
  }


  /** Set performance timings in console.
   * @param {boolean} perf	**/
  set perf(perf: boolean) {
    this._perf = perf;
  }


  /** Set output rounding.
   * @param {boolean} round	**/
  set round(round: boolean) {
    this._round = round;
  }


  /** Set the output floating precision.
   * @param {number} round	**/
  set float(float: number) {
    this._float = float;
  }


  /** Set the low pass filter cut frequency.
   * @param {number} round	**/
  set lowPassFreq(lowPassFreq: number) {
    this._lowPassFreq = lowPassFreq;
  }


  /** Set the high pass filter cut frequency.
   * @param {number} round	**/
  set highPassFreq(highPassFreq: number) {
    this._highPassFreq = highPassFreq;
  }
}

export default BeatDetect;

export interface BeatDetectionOptions {
  url: string, 
  name?: string, 
  perf?: BeatPerf
}

export interface BeatPerf {
  m0: number,
  m1: number, 
  m2: number, 
  m3: number
}

export interface BeatInfo {
  bpm: number
  offset: number
  firstBar: number
}

export interface TapBpmOptions {
  element: HTMLElement,
  precision: number,
  callback(npm: number|'--'): void
}

export interface BuildOfflineCtxOptions {
  response: ArrayBuffer,
  perf: BeatPerf
}

export interface ProcessRenderedBufferOptions {
  renderedBuffer: AudioBuffer
  perf: BeatPerf
}

export interface Peak {
  position: number,
  volume: number
}

export interface PeakGroup {
    tempo: number,
    count: number,
    position: number,
    peaks: Peak[]
}

declare global {
  interface Window { 
      webkitAudioContext: typeof AudioContext
      OfflineContext: typeof OfflineAudioContext
      webkitOfflineAudioContext: typeof OfflineAudioContext
  }
}
