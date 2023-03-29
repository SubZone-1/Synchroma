// BeatDetect.js
import BeatDetect from './BeatDetect.js';
import { circularRefs } from './circularRefs.js';

import { avgValue, resetTapperBtn_a, roundedValue, tapBPM_text, tapBtn } from './elements.js';

export function tempoTapInit(
  handleTapBPM: () => void
) {
  // Component presented with default values
  const beatDetect = new BeatDetect({
    sampleRate: 44100, // Most track are using this sample rate
    log: false, // Debug BeatDetect execution with logs
    perf: false, // Attach elapsed time to result object
    round: false, // To have an integer result for the BPM
    float: 4, // The floating precision in [1, Infinity]
    lowPassFreq: 150, // Low pass filter cut frequency
    highPassFreq: 100, // High pass filter cut frequency
    bpmRange: [50, 200], // The BPM range to output
    timeSignature: 4 // The number of beats in a measure
  });

  resetTapperBtn_a.addEventListener("click", () => {
    if (!circularRefs.getStrobeActive()) { // if strobe is off
      tapBPM = 0;
      avgValue.innerHTML = "--- BPM";
      roundedValue.innerHTML = "--- BPM";
      tapBPM_text.value = 0; // hidden input
    }
  });

  let tapBPM = 0;
  let lastBPM = 0;
  let currentBPM = 0;

  beatDetect.tapBpm({
    element: tapBtn,
    precision: 4, // Floating point for result
    callback: bpm => {
      console.log(bpm);
      if (bpm === '--') {
        avgValue.innerHTML = lastBPM + " BPM";
      roundedValue.innerHTML = tapBPM + " BPM";
      return   
      }

      lastBPM = currentBPM;
      currentBPM = bpm;
      tapBPM = Math.round(lastBPM);

      avgValue.innerHTML = lastBPM + " BPM";
      roundedValue.innerHTML = tapBPM + " BPM";
      tapBPM_text.value = tapBPM; // hidden input

      if (circularRefs.getStrobeActive()) {
        handleTapBPM();
      }
    }
  });

  circularRefs.getTapBPM = () => tapBPM;
}
