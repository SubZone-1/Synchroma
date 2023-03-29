(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const symbol_Img = document.querySelector("link[rel~='icon']");
const logoHorizontalBlack_Img = document.getElementById("sidebar-logo");
const logoHorizontalWhite_Img = document.getElementById("main-logo");
const logoBlack_Img = document.getElementById("modal-logo");
const autoModeContainer = document.getElementById("auto-mode-container");
const manualModeContainer = document.getElementById("manual-mode-container");
const autoBtn = document.getElementById("auto");
const manualBtn = document.getElementById("manual");
const mmOnBtn = document.getElementById("MM-on");
const mmOffBtn = document.getElementById("MM-off");
const lowBtn = document.getElementById("low");
const midBtn = document.getElementById("mid");
const highBtn = document.getElementById("high");
const masterBtn = document.getElementById("master");
const fullscreenBtn = document.getElementById("fullscreen-btn");
const useManualBtn = document.getElementById("useManual-btn");
const useTapBtn = document.getElementById("useTap-btn");
const btnOpenCloseSidebar = document.getElementById("opencloseSidebar");
const sidebarContainer = document.getElementById("sidebar-container");
const closeModalBtn = document.getElementById("close-modal");
const trackBPM_text = document.getElementById("track-bpm");
const micBPM_text = document.getElementById("mic-bpm");
const inputDevice = document.getElementById("select-input-device");
const slider_threshold = document.getElementById("threshold-slider");
const overlay = document.getElementById("overlay");
const AM_durationSlider = document.getElementById("AM-duration-slider");
const AM_durationOutput = document.getElementById("AM-duration-label");
const AM_onBtn = document.getElementById("AM-on");
const AM_offBtn = document.getElementById("AM-off");
const MM_durationOutput = document.getElementById("MM-duration-label");
const MM_durationSlider = document.getElementById("MM-duration-slider");
const showHideA = document.getElementById("show-hide-a");
const internalPlayer = document.getElementById("internal-player");
const internalPlayerContainer = document.getElementById("internal-player-container");
const playerFile = document.getElementById("player-file");
const eject = document.getElementById("eject");
const bpmDiv = document.getElementById("bpm");
const bpmDivSpan = bpmDiv.querySelector("span");
const avgAmplitude = document.getElementById("avg-amplitude");
const avgAmplitudeLabel = document.getElementById("avg-amplitude-label");
const micLoaderContainer = document.getElementById("mic-loader-container");
const micLoaderLabel = document.getElementById("mic-loader-label");
const bmpMultipliers = document.getElementById("BPM-multipliers");
const bmpMultipliersLabel = document.getElementById("BPM-multipliers-label");
const nowPlaying = document.getElementById("now-playing");
const MicAudioMeter = document.getElementById("mic-audio-meter");
const colorsBtn = Array.from(document.getElementsByClassName("colorbtn"));
const staticCycleA = document.getElementById("static-cycle-a");
const whiteBtn = document.getElementById("white");
const redBtn = document.getElementById("red");
const greenBtn = document.getElementById("green");
const blueBtn = document.getElementById("blue");
const purpleBtn = document.getElementById("purple");
const yellowBtn = document.getElementById("yellow");
const tapBPM_text = document.getElementById("tap-bpm");
const manualBPM_text = document.getElementById("manual-value");
const meterToggle = document.getElementById("meter-ON-OFF");
const TrackAudioMeter = document.getElementById("track-audio-meter");
const halfspeedBtn = document.getElementById("halfspeed");
const doublespeedBtn = document.getElementById("doublespeed");
const playPauseCheck = document.getElementById("play-pause-check");
const resetTapperBtn_a = document.getElementById("reset-tapbpm-a");
const resetTapperBtn_h = document.getElementById("reset-tapbpm-h");
const avgValue = document.getElementById("avg-value");
const roundedValue = document.getElementById("rounded-value");
const tapBtn = document.getElementById("tap-btn");
const styles = "";
const extra = "";
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function log(...args) {
}
function getBaseLog(x, y) {
  return Math.log(y) / Math.log(x);
}
function dbFromFloat(floatVal) {
  return getBaseLog(10, floatVal) * 20;
}
function findAudioProcBufferSize$1(numSamplesIn) {
  return [256, 512, 1024, 2048, 4096, 8192, 16384].reduce((a, b) => Math.abs(b - numSamplesIn) < Math.abs(a - numSamplesIn) ? b : a);
}
var utils$3 = {
  log,
  dbFromFloat,
  findAudioProcBufferSize: findAudioProcBufferSize$1
};
const utils$2 = utils$3;
function audioClipPath(db, dbRange, vertical) {
  let clipPercent = Math.floor(db * -100 / dbRange);
  if (clipPercent > 100) {
    clipPercent = 100;
  }
  if (clipPercent < 0) {
    clipPercent = 0;
  }
  if (vertical) {
    return `inset(${clipPercent}% 0 0)`;
  }
  return `inset(0 ${clipPercent}% 0 0)`;
}
function createContainerDiv(parent, config) {
  const { clientWidth, clientHeight } = parent;
  const { backgroundColor } = config;
  const meterElement = document.createElement("div");
  meterElement.style.position = "relative";
  meterElement.style.width = `${clientWidth}px`;
  meterElement.style.height = `${clientHeight}px`;
  meterElement.style.backgroundColor = backgroundColor;
  parent.appendChild(meterElement);
  return meterElement;
}
function createTicks(parent, config) {
  const { clientWidth, clientHeight } = parent;
  const {
    dbRange,
    dbTickSize,
    fontSize,
    borderSize,
    tickColor
  } = config;
  const numTicks = Math.floor(dbRange / dbTickSize);
  const tickDivs = Array.from(Array(numTicks).keys()).map((i) => {
    const tickDiv = document.createElement("div");
    parent.appendChild(tickDiv);
    tickDiv.style.position = "absolute";
    tickDiv.style.color = tickColor;
    tickDiv.style.textAlign = "right";
    tickDiv.style.fontSize = `${fontSize}px`;
    tickDiv.textContent = `-${dbTickSize * i}`;
    return tickDiv;
  });
  const vertical = clientHeight > clientWidth;
  if (vertical) {
    const tickWidth2 = fontSize * 2;
    const meterTop2 = fontSize * 1.5 + borderSize;
    const dbTickTop = fontSize + borderSize;
    const meterHeight2 = clientHeight - meterTop2 - borderSize;
    const meterWidth2 = clientWidth - tickWidth2 - borderSize;
    const tickSpacing2 = meterHeight2 / numTicks;
    tickDivs.forEach((tickDiv, i) => {
      tickDiv.style.width = `${tickWidth2}px`;
      tickDiv.style.top = `${tickSpacing2 * i + dbTickTop}px`;
    });
    return {
      vertical,
      tickWidth: tickWidth2,
      meterHeight: meterHeight2,
      meterWidth: meterWidth2,
      meterTop: meterTop2
    };
  }
  const tickWidth = fontSize * 1.5;
  const meterHeight = clientHeight - tickWidth - borderSize * 2;
  const meterTop = fontSize * 3;
  const meterWidth = clientWidth - meterTop - borderSize * 2;
  const tickSpacing = meterWidth / numTicks;
  tickDivs.forEach((tickDiv, i) => {
    tickDiv.style.width = `${meterTop}px`;
    tickDiv.style.bottom = `${borderSize}px`;
    tickDiv.style.right = `${tickSpacing * i + meterTop}px`;
  });
  return {
    vertical,
    tickWidth,
    meterHeight,
    meterWidth,
    meterTop
  };
}
function createBars(parent, config, meterData) {
  const { gradient, borderSize } = config;
  const {
    channelCount,
    vertical,
    meterWidth,
    meterHeight,
    meterTop,
    tickWidth
  } = meterData;
  const barDivs = Array.from(Array(channelCount).keys()).map(() => {
    const barDiv = document.createElement("div");
    parent.appendChild(barDiv);
    barDiv.style.position = "absolute";
    return barDiv;
  });
  if (vertical) {
    const barWidth = meterWidth / channelCount - borderSize;
    const gradientStyle = `linear-gradient(to bottom, ${gradient.join(", ")})`;
    barDivs.forEach((barDiv, i) => {
      barDiv.style.height = `${meterHeight}px`;
      barDiv.style.width = `${barWidth}px`;
      barDiv.style.backgroundImage = gradientStyle;
      barDiv.style.top = `${meterTop}px`;
      barDiv.style.left = `${(barWidth + borderSize) * i + tickWidth + borderSize}px`;
    });
  } else {
    const barWidth = meterHeight / channelCount - borderSize;
    const gradientStyle = `linear-gradient(to left, ${gradient.join(", ")})`;
    barDivs.forEach((barDiv, i) => {
      barDiv.style.height = `${barWidth}px`;
      barDiv.style.width = `${meterWidth}px`;
      barDiv.style.backgroundImage = gradientStyle;
      barDiv.style.top = `${(barWidth + borderSize) * i + borderSize}px`;
      barDiv.style.right = `${meterTop}px`;
    });
  }
  return barDivs;
}
function createMasks(parent, config, meterData) {
  const { backgroundColor, borderSize, maskTransition } = config;
  const {
    channelCount,
    vertical,
    meterWidth,
    meterHeight,
    meterTop,
    tickWidth
  } = meterData;
  const barDivs = Array.from(Array(channelCount).keys()).map(() => {
    const barDiv = document.createElement("div");
    parent.appendChild(barDiv);
    barDiv.style.position = "absolute";
    barDiv.style.backgroundColor = backgroundColor;
    return barDiv;
  });
  if (vertical) {
    const barWidth = meterWidth / channelCount - borderSize;
    barDivs.forEach((barDiv, i) => {
      barDiv.style.height = `${meterHeight}px`;
      barDiv.style.width = `${barWidth}px`;
      barDiv.style.top = `${meterTop}px`;
      barDiv.style.left = `${(barWidth + borderSize) * i + tickWidth + borderSize}px`;
      barDiv.style.transition = `height ${maskTransition}`;
    });
  } else {
    const barWidth = meterHeight / channelCount - borderSize;
    barDivs.forEach((barDiv, i) => {
      barDiv.style.height = `${barWidth}px`;
      barDiv.style.width = `${meterWidth}px`;
      barDiv.style.top = `${(barWidth + borderSize) * i + borderSize}px`;
      barDiv.style.right = `${meterTop}px`;
      barDiv.style.transition = `width ${maskTransition}`;
    });
  }
  return barDivs;
}
function createPeakLabels(parent, config, meterData) {
  const { borderSize, labelColor, fontSize } = config;
  const {
    channelCount,
    vertical,
    meterWidth,
    meterHeight,
    tickWidth
  } = meterData;
  const labelDivs = Array.from(Array(channelCount).keys()).map(() => {
    const label = document.createElement("div");
    parent.appendChild(label);
    label.style.textAlign = "center";
    label.style.color = labelColor;
    label.style.fontSize = `${fontSize}px`;
    label.style.position = "absolute";
    label.textContent = "-∞";
    return label;
  });
  if (vertical) {
    const barWidth = meterWidth / channelCount;
    labelDivs.forEach((label, i) => {
      label.style.width = `${barWidth}px`;
      label.style.top = `${borderSize}px`;
      label.style.left = `${barWidth * i + tickWidth}px`;
    });
  } else {
    const barHeight = meterHeight / channelCount;
    labelDivs.forEach((label, i) => {
      label.style.width = `${fontSize * 2}px`;
      label.style.right = `${borderSize}px`;
      label.style.top = `${barHeight * i + tickWidth}px`;
    });
  }
  return labelDivs;
}
function maskSize(floatVal, dbRange, meterDimension) {
  const d = dbRange * -1;
  const numPx = Math.floor(utils$2.dbFromFloat(floatVal) * meterDimension / d);
  if (numPx > meterDimension) {
    return meterDimension;
  }
  if (numPx < 0) {
    return 0;
  }
  return numPx;
}
function paintMeter(config, meterData) {
  const { dbRange } = config;
  const {
    tempPeaks,
    heldPeaks,
    channelMasks,
    textLabels,
    meterHeight,
    meterWidth,
    vertical
  } = meterData;
  const meterDimension = vertical ? meterHeight : meterWidth;
  channelMasks.forEach((maskDiv, i) => {
    const channelSize = maskSize(tempPeaks[i], dbRange, meterDimension);
    if (vertical) {
      maskDiv.style.height = `${channelSize}px`;
    } else {
      maskDiv.style.width = `${channelSize}px`;
    }
  });
  textLabels.forEach((textLabel, i) => {
    if (heldPeaks[i] === 0) {
      textLabel.textContent = "-∞";
    } else {
      const heldPeak = utils$2.dbFromFloat(heldPeaks[i]);
      textLabel.textContent = heldPeak.toFixed(1);
    }
  });
  window.requestAnimationFrame(() => paintMeter(config, meterData));
}
var markup$1 = {
  audioClipPath,
  createContainerDiv,
  createTicks,
  createBars,
  createMasks,
  createPeakLabels,
  maskSize,
  paintMeter
};
function calculateMaxValues(inputBuffer) {
  const channelMaxes = [];
  const { numberOfChannels } = inputBuffer;
  for (let c = 0; c < numberOfChannels; c += 1) {
    channelMaxes[c] = 0;
    const channelData = inputBuffer.getChannelData(c);
    for (let s = 0; s < channelData.length; s += 1) {
      if (Math.abs(channelData[s]) > channelMaxes[c]) {
        channelMaxes[c] = Math.abs(channelData[s]);
      }
    }
  }
  return channelMaxes;
}
var peakSample$1 = {
  calculateMaxValues
};
const utils$1 = utils$3;
function findAudioProcBufferSize(numSamplesIn) {
  return [256, 512, 1024, 2048, 4096, 8192, 16384].reduce((a, b) => Math.abs(b - numSamplesIn) < Math.abs(a - numSamplesIn) ? b : a);
}
function calculateLPFCoefficients(numCoefficients, upsampleFactor) {
  const retCoefs = [];
  const fcRel = 1 / (4 * upsampleFactor);
  const coefsLim = Math.floor((numCoefficients - 1) / 2);
  for (let n = -coefsLim; n <= coefsLim; n += 1) {
    const wn = 0.54 + 0.46 * Math.cos(2 * Math.PI * n / numCoefficients);
    let hn = 0;
    if (n === 0) {
      hn = 2 * fcRel;
    } else {
      hn = Math.sin(2 * Math.PI * fcRel * n) / (Math.PI * n);
    }
    hn = wn * hn * upsampleFactor;
    retCoefs.push(hn);
  }
  return retCoefs;
}
function filterSample(sample, meterData) {
  const { lpfBuffer, lpfCoefficients, upsampleFactor } = meterData;
  const ret = [];
  lpfBuffer.push(sample);
  if (lpfBuffer.length >= lpfCoefficients.length) {
    lpfBuffer.shift();
  }
  for (let nA = 0; nA < upsampleFactor; nA += 1) {
    let nT = 0;
    let retVal = 0;
    for (let nc = nA; nc < lpfCoefficients.length; nc += upsampleFactor) {
      retVal += lpfCoefficients[nc] * lpfBuffer[lpfBuffer.length - 1 - nT];
      nT += 1;
    }
    ret.push(retVal);
  }
  return ret;
}
function audioOverSampleAndFilter(channelData, inputFs, meterData) {
  let res = [];
  if (meterData.lpfCoefficients.length <= 0) {
    if (inputFs >= 96e3) {
      meterData.upsampleFactor = 2;
    }
    meterData.lpfCoefficients = calculateLPFCoefficients(33, meterData.upsampleFactor);
    meterData.lpfBuffer = new Array(meterData.lpfCoefficients.length).fill(0);
    utils$1.log(`Initialized lpfCoefficients lpfCoefficients=[${meterData.lpfCoefficients.join(",")}], and lpfBuffer: [${meterData.lpfBuffer.join(",")}]`);
  }
  for (let ni = 0; ni < channelData.length; ni += 1) {
    const samplesOut = filterSample(channelData[ni], meterData);
    res = res.concat(samplesOut);
  }
  return res;
}
function calculateTPValues(inputBuffer, meterData) {
  const { lastChannelTP, channelCount } = meterData;
  const { sampleRate } = inputBuffer;
  if (lastChannelTP.length <= 0) {
    meterData.lastChannelTP = new Array(channelCount).fill(0);
    const attFactor = Math.pow(10, -20 / 10);
    const decayTimeS = 1700 / 1e3;
    meterData.decayFactor = Math.pow(attFactor, 1 / (sampleRate * decayTimeS));
    utils$1.log(`Initialized with decayFactor ${meterData.decayFactor}`);
  }
  for (let c = 0; c < channelCount; c += 1) {
    const channelData = inputBuffer.getChannelData(c);
    const overSampledAndLPF = audioOverSampleAndFilter(channelData, sampleRate, meterData);
    for (let s = 0; s < overSampledAndLPF.length; s += 1) {
      lastChannelTP[c] *= meterData.decayFactor;
      if (Math.abs(overSampledAndLPF[s]) > lastChannelTP[c]) {
        lastChannelTP[c] = Math.abs(overSampledAndLPF[s]);
      }
    }
  }
  return lastChannelTP;
}
var truePeak$1 = {
  findAudioProcBufferSize,
  calculateLPFCoefficients,
  filterSample,
  audioOverSampleAndFilter,
  calculateTPValues
};
const markup = markup$1;
const peakSample = peakSample$1;
const truePeak = truePeak$1;
const utils = utils$3;
const defaultConfig = {
  borderSize: 2,
  fontSize: 9,
  backgroundColor: "black",
  tickColor: "#ddd",
  labelColor: "#ddd",
  gradient: ["red 1%", "#ff0 16%", "lime 45%", "#080 100%"],
  dbRange: 48,
  dbTickSize: 6,
  maskTransition: "0.1s",
  audioMeterStandard: "peak-sample",
  // Could be "true-peak" (ITU-R BS.1770) or "peak-sample"
  refreshEveryApproxMs: 20,
  peakHoldDuration: null
};
function createMeterNode(sourceNode, audioCtx, options = {}) {
  const config = Object.assign({}, defaultConfig, options);
  const { refreshEveryApproxMs } = config;
  const { channelCount, sampleRate } = sourceNode;
  const resfreshIntervalSamples = refreshEveryApproxMs / 1e3 * sampleRate * channelCount;
  const bufferSize = utils.findAudioProcBufferSize(resfreshIntervalSamples);
  const meterNode = audioCtx.createScriptProcessor(bufferSize, channelCount, channelCount);
  sourceNode.connect(meterNode).connect(audioCtx.destination);
  return meterNode;
}
function updateMeter(audioProcessingEvent, config, meterData) {
  const { inputBuffer } = audioProcessingEvent;
  const { audioMeterStandard, peakHoldDuration } = config;
  let channelMaxes = [];
  if (audioMeterStandard === "true-peak") {
    channelMaxes = truePeak.calculateTPValues(inputBuffer, meterData);
  } else {
    channelMaxes = peakSample.calculateMaxValues(inputBuffer);
  }
  for (let i = 0; i < channelMaxes.length; i += 1) {
    meterData.tempPeaks[i] = channelMaxes[i];
    if (channelMaxes[i] > meterData.heldPeaks[i]) {
      meterData.heldPeaks[i] = channelMaxes[i];
      if (peakHoldDuration) {
        if (meterData.peakHoldTimeouts[i]) {
          clearTimeout(meterData.peakHoldTimeouts[i]);
        }
        meterData.peakHoldTimeouts[i] = setTimeout(() => {
          meterData.heldPeaks[i] = meterData.tempPeaks[i];
        }, peakHoldDuration);
      }
    }
  }
}
function createMeter(domElement, meterNode, options = {}) {
  const config = Object.assign({}, defaultConfig, options);
  const meterElement = markup.createContainerDiv(domElement, config);
  const meterData = markup.createTicks(meterElement, config);
  const { channelCount } = meterNode;
  meterData.tempPeaks = new Array(channelCount).fill(0);
  meterData.heldPeaks = new Array(channelCount).fill(0);
  meterData.peakHoldTimeouts = new Array(channelCount).fill(null);
  meterData.channelCount = channelCount;
  meterData.channelBars = markup.createBars(meterElement, config, meterData);
  meterData.channelMasks = markup.createMasks(meterElement, config, meterData);
  meterData.textLabels = markup.createPeakLabels(meterElement, config, meterData);
  if (config.audioMeterStandard === "true-peak") {
    meterData.lpfCoefficients = [];
    meterData.lpfBuffer = [];
    meterData.upsampleFactor = 4;
    meterData.lastChannelTP = [];
    meterData.decayFactor = 0.99999;
  }
  meterNode.onaudioprocess = (evt) => updateMeter(evt, config, meterData);
  meterElement.addEventListener("click", () => {
    meterData.heldPeaks.fill(0);
  }, false);
  markup.paintMeter(config, meterData);
}
var src = {
  createMeterNode,
  createMeter
};
const circularRefs = {
  startCheckingAudioPlaying() {
    throw new Error("startCheckingAudioPlaying not defined yet");
  },
  getStrobeActive() {
    throw new Error("getStrobeActive not defined yet");
  },
  getTapBPM() {
    throw new Error("getTapBPM not defined yet");
  }
};
async function autoModeInit(audioContext, TrackSource, analyser) {
  autoBtn.addEventListener("click", () => {
    autoModeContainer.removeAttribute("hidden");
    manualModeContainer.setAttribute("hidden", "true");
    autoBtn.setAttribute("disabled", "true");
    manualBtn.removeAttribute("disabled");
    mmOffBtn.click();
    autoBtn.classList.remove("text-gray-700");
    autoBtn.classList.remove("hover:scale-1125");
    autoBtn.classList.add("text-themeOrange");
    manualBtn.classList.remove("text-themeOrange");
    manualBtn.classList.add("text-text-gray-700");
    manualBtn.classList.add("hover:scale-1125");
  });
  const checkbox = document.getElementById("SCT-check");
  const frequencyData = new Float32Array(analyser.frequencyBinCount);
  function checkAudioPlaying() {
    analyser.getFloatFrequencyData(frequencyData);
    for (let i = 0; i < frequencyData.length; i++) {
      if (frequencyData[i] > -60) {
        checkbox.checked = true;
        return;
      }
    }
    checkbox.checked = false;
  }
  circularRefs.startCheckingAudioPlaying = () => {
    const bufferTrackSourceNode = audioContext.createBufferSource();
    bufferTrackSourceNode.buffer = audioContext.createBuffer(1, 1, 22050);
    bufferTrackSourceNode.connect(analyser);
    bufferTrackSourceNode.start();
    setInterval(checkAudioPlaying, 50);
  };
  internalPlayer.addEventListener("canplay", circularRefs.startCheckingAudioPlaying);
  const TrackMeterNode = src.createMeterNode(TrackSource, audioContext);
  src.createMeter(TrackAudioMeter, TrackMeterNode, {});
  meterToggle.addEventListener("change", () => {
    if (inputDevice.selectedIndex === 1) {
      if (TrackAudioMeter.style.visibility === "hidden") {
        TrackAudioMeter.style.visibility = "visible";
      } else {
        TrackAudioMeter.style.visibility = "hidden";
      }
    } else {
      if (MicAudioMeter.style.visibility === "hidden") {
        MicAudioMeter.style.visibility = "visible";
      } else {
        MicAudioMeter.style.visibility = "hidden";
      }
    }
  });
  inputDevice.addEventListener("change", () => {
    if (meterToggle.checked) {
      meterToggle.checked = false;
      TrackAudioMeter.style.visibility = "hidden";
      MicAudioMeter.style.visibility = "hidden";
    }
  });
}
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var realtimeBpmProcessorName = "realtime-bpm-processor";
function createRealTimeBpmProcessor(_0) {
  return __async(this, arguments, function* (audioContext, realtimeBpmProcessorPath = `/${realtimeBpmProcessorName}.js`) {
    const processorNode = yield setupAudioWorkletNode(audioContext, realtimeBpmProcessorPath, realtimeBpmProcessorName);
    yield audioContext.resume();
    return processorNode;
  });
}
function setupAudioWorkletNode(audioContext, pathToProcessor, processorName) {
  return __async(this, null, function* () {
    try {
      yield audioContext.audioWorklet.addModule(pathToProcessor);
      const audioWorkletNode = new AudioWorkletNode(audioContext, processorName);
      return audioWorkletNode;
    } catch (error) {
      console.error("setupAudioWorkletNode ERROR", error);
      throw error;
    }
  });
}
var toastrExports = {};
var toastr$1 = {
  get exports() {
    return toastrExports;
  },
  set exports(v) {
    toastrExports = v;
  }
};
var jqueryExports = {};
var jquery = {
  get exports() {
    return jqueryExports;
  },
  set exports(v) {
    jqueryExports = v;
  }
};
/*!
 * jQuery JavaScript Library v3.6.4
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-03-08T15:28Z
 */
var hasRequiredJquery;
function requireJquery() {
  if (hasRequiredJquery)
    return jqueryExports;
  hasRequiredJquery = 1;
  (function(module) {
    (function(global2, factory) {
      {
        module.exports = global2.document ? factory(global2, true) : function(w) {
          if (!w.document) {
            throw new Error("jQuery requires a window with a document");
          }
          return factory(w);
        };
      }
    })(typeof window !== "undefined" ? window : commonjsGlobal, function(window2, noGlobal) {
      var arr = [];
      var getProto = Object.getPrototypeOf;
      var slice = arr.slice;
      var flat = arr.flat ? function(array) {
        return arr.flat.call(array);
      } : function(array) {
        return arr.concat.apply([], array);
      };
      var push = arr.push;
      var indexOf = arr.indexOf;
      var class2type = {};
      var toString = class2type.toString;
      var hasOwn = class2type.hasOwnProperty;
      var fnToString = hasOwn.toString;
      var ObjectFunctionString = fnToString.call(Object);
      var support = {};
      var isFunction = function isFunction2(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number" && typeof obj.item !== "function";
      };
      var isWindow = function isWindow2(obj) {
        return obj != null && obj === obj.window;
      };
      var document2 = window2.document;
      var preservedScriptAttributes = {
        type: true,
        src: true,
        nonce: true,
        noModule: true
      };
      function DOMEval(code, node, doc) {
        doc = doc || document2;
        var i, val, script = doc.createElement("script");
        script.text = code;
        if (node) {
          for (i in preservedScriptAttributes) {
            val = node[i] || node.getAttribute && node.getAttribute(i);
            if (val) {
              script.setAttribute(i, val);
            }
          }
        }
        doc.head.appendChild(script).parentNode.removeChild(script);
      }
      function toType(obj) {
        if (obj == null) {
          return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
      }
      var version = "3.6.4", jQuery = function(selector, context) {
        return new jQuery.fn.init(selector, context);
      };
      jQuery.fn = jQuery.prototype = {
        // The current version of jQuery being used
        jquery: version,
        constructor: jQuery,
        // The default length of a jQuery object is 0
        length: 0,
        toArray: function() {
          return slice.call(this);
        },
        // Get the Nth element in the matched element set OR
        // Get the whole matched element set as a clean array
        get: function(num) {
          if (num == null) {
            return slice.call(this);
          }
          return num < 0 ? this[num + this.length] : this[num];
        },
        // Take an array of elements and push it onto the stack
        // (returning the new matched element set)
        pushStack: function(elems) {
          var ret = jQuery.merge(this.constructor(), elems);
          ret.prevObject = this;
          return ret;
        },
        // Execute a callback for every element in the matched set.
        each: function(callback) {
          return jQuery.each(this, callback);
        },
        map: function(callback) {
          return this.pushStack(jQuery.map(this, function(elem, i) {
            return callback.call(elem, i, elem);
          }));
        },
        slice: function() {
          return this.pushStack(slice.apply(this, arguments));
        },
        first: function() {
          return this.eq(0);
        },
        last: function() {
          return this.eq(-1);
        },
        even: function() {
          return this.pushStack(jQuery.grep(this, function(_elem, i) {
            return (i + 1) % 2;
          }));
        },
        odd: function() {
          return this.pushStack(jQuery.grep(this, function(_elem, i) {
            return i % 2;
          }));
        },
        eq: function(i) {
          var len = this.length, j = +i + (i < 0 ? len : 0);
          return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
        },
        end: function() {
          return this.prevObject || this.constructor();
        },
        // For internal use only.
        // Behaves like an Array's method, not like a jQuery method.
        push,
        sort: arr.sort,
        splice: arr.splice
      };
      jQuery.extend = jQuery.fn.extend = function() {
        var options, name, src2, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[i] || {};
          i++;
        }
        if (typeof target !== "object" && !isFunction(target)) {
          target = {};
        }
        if (i === length) {
          target = this;
          i--;
        }
        for (; i < length; i++) {
          if ((options = arguments[i]) != null) {
            for (name in options) {
              copy = options[name];
              if (name === "__proto__" || target === copy) {
                continue;
              }
              if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = Array.isArray(copy)))) {
                src2 = target[name];
                if (copyIsArray && !Array.isArray(src2)) {
                  clone = [];
                } else if (!copyIsArray && !jQuery.isPlainObject(src2)) {
                  clone = {};
                } else {
                  clone = src2;
                }
                copyIsArray = false;
                target[name] = jQuery.extend(deep, clone, copy);
              } else if (copy !== void 0) {
                target[name] = copy;
              }
            }
          }
        }
        return target;
      };
      jQuery.extend({
        // Unique for each copy of jQuery on the page
        expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),
        // Assume jQuery is ready without the ready module
        isReady: true,
        error: function(msg) {
          throw new Error(msg);
        },
        noop: function() {
        },
        isPlainObject: function(obj) {
          var proto, Ctor;
          if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
          }
          proto = getProto(obj);
          if (!proto) {
            return true;
          }
          Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
          return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
        },
        isEmptyObject: function(obj) {
          var name;
          for (name in obj) {
            return false;
          }
          return true;
        },
        // Evaluates a script in a provided context; falls back to the global one
        // if not specified.
        globalEval: function(code, options, doc) {
          DOMEval(code, { nonce: options && options.nonce }, doc);
        },
        each: function(obj, callback) {
          var length, i = 0;
          if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
              if (callback.call(obj[i], i, obj[i]) === false) {
                break;
              }
            }
          } else {
            for (i in obj) {
              if (callback.call(obj[i], i, obj[i]) === false) {
                break;
              }
            }
          }
          return obj;
        },
        // results is for internal usage only
        makeArray: function(arr2, results) {
          var ret = results || [];
          if (arr2 != null) {
            if (isArrayLike(Object(arr2))) {
              jQuery.merge(
                ret,
                typeof arr2 === "string" ? [arr2] : arr2
              );
            } else {
              push.call(ret, arr2);
            }
          }
          return ret;
        },
        inArray: function(elem, arr2, i) {
          return arr2 == null ? -1 : indexOf.call(arr2, elem, i);
        },
        // Support: Android <=4.0 only, PhantomJS 1 only
        // push.apply(_, arraylike) throws on ancient WebKit
        merge: function(first, second) {
          var len = +second.length, j = 0, i = first.length;
          for (; j < len; j++) {
            first[i++] = second[j];
          }
          first.length = i;
          return first;
        },
        grep: function(elems, callback, invert) {
          var callbackInverse, matches = [], i = 0, length = elems.length, callbackExpect = !invert;
          for (; i < length; i++) {
            callbackInverse = !callback(elems[i], i);
            if (callbackInverse !== callbackExpect) {
              matches.push(elems[i]);
            }
          }
          return matches;
        },
        // arg is for internal usage only
        map: function(elems, callback, arg) {
          var length, value, i = 0, ret = [];
          if (isArrayLike(elems)) {
            length = elems.length;
            for (; i < length; i++) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          } else {
            for (i in elems) {
              value = callback(elems[i], i, arg);
              if (value != null) {
                ret.push(value);
              }
            }
          }
          return flat(ret);
        },
        // A global GUID counter for objects
        guid: 1,
        // jQuery.support is not used in Core but other projects attach their
        // properties to it so it needs to exist.
        support
      });
      if (typeof Symbol === "function") {
        jQuery.fn[Symbol.iterator] = arr[Symbol.iterator];
      }
      jQuery.each(
        "Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
        function(_i, name) {
          class2type["[object " + name + "]"] = name.toLowerCase();
        }
      );
      function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length, type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) {
          return false;
        }
        return type === "array" || length === 0 || typeof length === "number" && length > 0 && length - 1 in obj;
      }
      var Sizzle = (
        /*!
         * Sizzle CSS Selector Engine v2.3.10
         * https://sizzlejs.com/
         *
         * Copyright JS Foundation and other contributors
         * Released under the MIT license
         * https://js.foundation/
         *
         * Date: 2023-02-14
         */
        function(window3) {
          var i, support2, Expr, getText, isXML, tokenize, compile, select, outermostContext, sortInput, hasDuplicate, setDocument, document3, docElem, documentIsHTML, rbuggyQSA, rbuggyMatches, matches, contains, expando = "sizzle" + 1 * /* @__PURE__ */ new Date(), preferredDoc = window3.document, dirruns = 0, done = 0, classCache = createCache(), tokenCache = createCache(), compilerCache = createCache(), nonnativeSelectorCache = createCache(), sortOrder = function(a, b) {
            if (a === b) {
              hasDuplicate = true;
            }
            return 0;
          }, hasOwn2 = {}.hasOwnProperty, arr2 = [], pop = arr2.pop, pushNative = arr2.push, push2 = arr2.push, slice2 = arr2.slice, indexOf2 = function(list, elem) {
            var i2 = 0, len = list.length;
            for (; i2 < len; i2++) {
              if (list[i2] === elem) {
                return i2;
              }
            }
            return -1;
          }, booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", whitespace2 = "[\\x20\\t\\r\\n\\f]", identifier = "(?:\\\\[\\da-fA-F]{1,6}" + whitespace2 + "?|\\\\[^\\r\\n\\f]|[\\w-]|[^\0-\\x7f])+", attributes = "\\[" + whitespace2 + "*(" + identifier + ")(?:" + whitespace2 + // Operator (capture 2)
          "*([*^$|!~]?=)" + whitespace2 + // "Attribute values must be CSS identifiers [capture 5]
          // or strings [capture 3 or capture 4]"
          `*(?:'((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)"|(` + identifier + "))|)" + whitespace2 + "*\\]", pseudos = ":(" + identifier + `)(?:\\((('((?:\\\\.|[^\\\\'])*)'|"((?:\\\\.|[^\\\\"])*)")|((?:\\\\.|[^\\\\()[\\]]|` + attributes + ")*)|.*)\\)|)", rwhitespace = new RegExp(whitespace2 + "+", "g"), rtrim2 = new RegExp("^" + whitespace2 + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace2 + "+$", "g"), rcomma = new RegExp("^" + whitespace2 + "*," + whitespace2 + "*"), rleadingCombinator = new RegExp("^" + whitespace2 + "*([>+~]|" + whitespace2 + ")" + whitespace2 + "*"), rdescend = new RegExp(whitespace2 + "|>"), rpseudo = new RegExp(pseudos), ridentifier = new RegExp("^" + identifier + "$"), matchExpr = {
            "ID": new RegExp("^#(" + identifier + ")"),
            "CLASS": new RegExp("^\\.(" + identifier + ")"),
            "TAG": new RegExp("^(" + identifier + "|[*])"),
            "ATTR": new RegExp("^" + attributes),
            "PSEUDO": new RegExp("^" + pseudos),
            "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace2 + "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace2 + "*(?:([+-]|)" + whitespace2 + "*(\\d+)|))" + whitespace2 + "*\\)|)", "i"),
            "bool": new RegExp("^(?:" + booleans + ")$", "i"),
            // For use in libraries implementing .is()
            // We use this for POS matching in `select`
            "needsContext": new RegExp("^" + whitespace2 + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + whitespace2 + "*((?:-\\d)?\\d*)" + whitespace2 + "*\\)|)(?=[^-]|$)", "i")
          }, rhtml2 = /HTML$/i, rinputs = /^(?:input|select|textarea|button)$/i, rheader = /^h\d$/i, rnative = /^[^{]+\{\s*\[native \w/, rquickExpr2 = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, rsibling = /[+~]/, runescape = new RegExp("\\\\[\\da-fA-F]{1,6}" + whitespace2 + "?|\\\\([^\\r\\n\\f])", "g"), funescape = function(escape, nonHex) {
            var high = "0x" + escape.slice(1) - 65536;
            return nonHex ? (
              // Strip the backslash prefix from a non-hex escape sequence
              nonHex
            ) : (
              // Replace a hexadecimal escape sequence with the encoded Unicode code point
              // Support: IE <=11+
              // For values outside the Basic Multilingual Plane (BMP), manually construct a
              // surrogate pair
              high < 0 ? String.fromCharCode(high + 65536) : String.fromCharCode(high >> 10 | 55296, high & 1023 | 56320)
            );
          }, rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g, fcssescape = function(ch, asCodePoint) {
            if (asCodePoint) {
              if (ch === "\0") {
                return "�";
              }
              return ch.slice(0, -1) + "\\" + ch.charCodeAt(ch.length - 1).toString(16) + " ";
            }
            return "\\" + ch;
          }, unloadHandler = function() {
            setDocument();
          }, inDisabledFieldset = addCombinator(
            function(elem) {
              return elem.disabled === true && elem.nodeName.toLowerCase() === "fieldset";
            },
            { dir: "parentNode", next: "legend" }
          );
          try {
            push2.apply(
              arr2 = slice2.call(preferredDoc.childNodes),
              preferredDoc.childNodes
            );
            arr2[preferredDoc.childNodes.length].nodeType;
          } catch (e) {
            push2 = {
              apply: arr2.length ? (
                // Leverage slice if possible
                function(target, els) {
                  pushNative.apply(target, slice2.call(els));
                }
              ) : (
                // Support: IE<9
                // Otherwise append directly
                function(target, els) {
                  var j = target.length, i2 = 0;
                  while (target[j++] = els[i2++]) {
                  }
                  target.length = j - 1;
                }
              )
            };
          }
          function Sizzle2(selector, context, results, seed) {
            var m, i2, elem, nid, match, groups, newSelector, newContext = context && context.ownerDocument, nodeType = context ? context.nodeType : 9;
            results = results || [];
            if (typeof selector !== "string" || !selector || nodeType !== 1 && nodeType !== 9 && nodeType !== 11) {
              return results;
            }
            if (!seed) {
              setDocument(context);
              context = context || document3;
              if (documentIsHTML) {
                if (nodeType !== 11 && (match = rquickExpr2.exec(selector))) {
                  if (m = match[1]) {
                    if (nodeType === 9) {
                      if (elem = context.getElementById(m)) {
                        if (elem.id === m) {
                          results.push(elem);
                          return results;
                        }
                      } else {
                        return results;
                      }
                    } else {
                      if (newContext && (elem = newContext.getElementById(m)) && contains(context, elem) && elem.id === m) {
                        results.push(elem);
                        return results;
                      }
                    }
                  } else if (match[2]) {
                    push2.apply(results, context.getElementsByTagName(selector));
                    return results;
                  } else if ((m = match[3]) && support2.getElementsByClassName && context.getElementsByClassName) {
                    push2.apply(results, context.getElementsByClassName(m));
                    return results;
                  }
                }
                if (support2.qsa && !nonnativeSelectorCache[selector + " "] && (!rbuggyQSA || !rbuggyQSA.test(selector)) && // Support: IE 8 only
                // Exclude object elements
                (nodeType !== 1 || context.nodeName.toLowerCase() !== "object")) {
                  newSelector = selector;
                  newContext = context;
                  if (nodeType === 1 && (rdescend.test(selector) || rleadingCombinator.test(selector))) {
                    newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
                    if (newContext !== context || !support2.scope) {
                      if (nid = context.getAttribute("id")) {
                        nid = nid.replace(rcssescape, fcssescape);
                      } else {
                        context.setAttribute("id", nid = expando);
                      }
                    }
                    groups = tokenize(selector);
                    i2 = groups.length;
                    while (i2--) {
                      groups[i2] = (nid ? "#" + nid : ":scope") + " " + toSelector(groups[i2]);
                    }
                    newSelector = groups.join(",");
                  }
                  try {
                    push2.apply(
                      results,
                      newContext.querySelectorAll(newSelector)
                    );
                    return results;
                  } catch (qsaError) {
                    nonnativeSelectorCache(selector, true);
                  } finally {
                    if (nid === expando) {
                      context.removeAttribute("id");
                    }
                  }
                }
              }
            }
            return select(selector.replace(rtrim2, "$1"), context, results, seed);
          }
          function createCache() {
            var keys = [];
            function cache(key, value) {
              if (keys.push(key + " ") > Expr.cacheLength) {
                delete cache[keys.shift()];
              }
              return cache[key + " "] = value;
            }
            return cache;
          }
          function markFunction(fn) {
            fn[expando] = true;
            return fn;
          }
          function assert(fn) {
            var el = document3.createElement("fieldset");
            try {
              return !!fn(el);
            } catch (e) {
              return false;
            } finally {
              if (el.parentNode) {
                el.parentNode.removeChild(el);
              }
              el = null;
            }
          }
          function addHandle(attrs, handler) {
            var arr3 = attrs.split("|"), i2 = arr3.length;
            while (i2--) {
              Expr.attrHandle[arr3[i2]] = handler;
            }
          }
          function siblingCheck(a, b) {
            var cur = b && a, diff = cur && a.nodeType === 1 && b.nodeType === 1 && a.sourceIndex - b.sourceIndex;
            if (diff) {
              return diff;
            }
            if (cur) {
              while (cur = cur.nextSibling) {
                if (cur === b) {
                  return -1;
                }
              }
            }
            return a ? 1 : -1;
          }
          function createInputPseudo(type) {
            return function(elem) {
              var name = elem.nodeName.toLowerCase();
              return name === "input" && elem.type === type;
            };
          }
          function createButtonPseudo(type) {
            return function(elem) {
              var name = elem.nodeName.toLowerCase();
              return (name === "input" || name === "button") && elem.type === type;
            };
          }
          function createDisabledPseudo(disabled) {
            return function(elem) {
              if ("form" in elem) {
                if (elem.parentNode && elem.disabled === false) {
                  if ("label" in elem) {
                    if ("label" in elem.parentNode) {
                      return elem.parentNode.disabled === disabled;
                    } else {
                      return elem.disabled === disabled;
                    }
                  }
                  return elem.isDisabled === disabled || // Where there is no isDisabled, check manually
                  /* jshint -W018 */
                  elem.isDisabled !== !disabled && inDisabledFieldset(elem) === disabled;
                }
                return elem.disabled === disabled;
              } else if ("label" in elem) {
                return elem.disabled === disabled;
              }
              return false;
            };
          }
          function createPositionalPseudo(fn) {
            return markFunction(function(argument) {
              argument = +argument;
              return markFunction(function(seed, matches2) {
                var j, matchIndexes = fn([], seed.length, argument), i2 = matchIndexes.length;
                while (i2--) {
                  if (seed[j = matchIndexes[i2]]) {
                    seed[j] = !(matches2[j] = seed[j]);
                  }
                }
              });
            });
          }
          function testContext(context) {
            return context && typeof context.getElementsByTagName !== "undefined" && context;
          }
          support2 = Sizzle2.support = {};
          isXML = Sizzle2.isXML = function(elem) {
            var namespace = elem && elem.namespaceURI, docElem2 = elem && (elem.ownerDocument || elem).documentElement;
            return !rhtml2.test(namespace || docElem2 && docElem2.nodeName || "HTML");
          };
          setDocument = Sizzle2.setDocument = function(node) {
            var hasCompare, subWindow, doc = node ? node.ownerDocument || node : preferredDoc;
            if (doc == document3 || doc.nodeType !== 9 || !doc.documentElement) {
              return document3;
            }
            document3 = doc;
            docElem = document3.documentElement;
            documentIsHTML = !isXML(document3);
            if (preferredDoc != document3 && (subWindow = document3.defaultView) && subWindow.top !== subWindow) {
              if (subWindow.addEventListener) {
                subWindow.addEventListener("unload", unloadHandler, false);
              } else if (subWindow.attachEvent) {
                subWindow.attachEvent("onunload", unloadHandler);
              }
            }
            support2.scope = assert(function(el) {
              docElem.appendChild(el).appendChild(document3.createElement("div"));
              return typeof el.querySelectorAll !== "undefined" && !el.querySelectorAll(":scope fieldset div").length;
            });
            support2.cssHas = assert(function() {
              try {
                document3.querySelector(":has(*,:jqfake)");
                return false;
              } catch (e) {
                return true;
              }
            });
            support2.attributes = assert(function(el) {
              el.className = "i";
              return !el.getAttribute("className");
            });
            support2.getElementsByTagName = assert(function(el) {
              el.appendChild(document3.createComment(""));
              return !el.getElementsByTagName("*").length;
            });
            support2.getElementsByClassName = rnative.test(document3.getElementsByClassName);
            support2.getById = assert(function(el) {
              docElem.appendChild(el).id = expando;
              return !document3.getElementsByName || !document3.getElementsByName(expando).length;
            });
            if (support2.getById) {
              Expr.filter["ID"] = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  return elem.getAttribute("id") === attrId;
                };
              };
              Expr.find["ID"] = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var elem = context.getElementById(id);
                  return elem ? [elem] : [];
                }
              };
            } else {
              Expr.filter["ID"] = function(id) {
                var attrId = id.replace(runescape, funescape);
                return function(elem) {
                  var node2 = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
                  return node2 && node2.value === attrId;
                };
              };
              Expr.find["ID"] = function(id, context) {
                if (typeof context.getElementById !== "undefined" && documentIsHTML) {
                  var node2, i2, elems, elem = context.getElementById(id);
                  if (elem) {
                    node2 = elem.getAttributeNode("id");
                    if (node2 && node2.value === id) {
                      return [elem];
                    }
                    elems = context.getElementsByName(id);
                    i2 = 0;
                    while (elem = elems[i2++]) {
                      node2 = elem.getAttributeNode("id");
                      if (node2 && node2.value === id) {
                        return [elem];
                      }
                    }
                  }
                  return [];
                }
              };
            }
            Expr.find["TAG"] = support2.getElementsByTagName ? function(tag, context) {
              if (typeof context.getElementsByTagName !== "undefined") {
                return context.getElementsByTagName(tag);
              } else if (support2.qsa) {
                return context.querySelectorAll(tag);
              }
            } : function(tag, context) {
              var elem, tmp = [], i2 = 0, results = context.getElementsByTagName(tag);
              if (tag === "*") {
                while (elem = results[i2++]) {
                  if (elem.nodeType === 1) {
                    tmp.push(elem);
                  }
                }
                return tmp;
              }
              return results;
            };
            Expr.find["CLASS"] = support2.getElementsByClassName && function(className, context) {
              if (typeof context.getElementsByClassName !== "undefined" && documentIsHTML) {
                return context.getElementsByClassName(className);
              }
            };
            rbuggyMatches = [];
            rbuggyQSA = [];
            if (support2.qsa = rnative.test(document3.querySelectorAll)) {
              assert(function(el) {
                var input;
                docElem.appendChild(el).innerHTML = "<a id='" + expando + "'></a><select id='" + expando + "-\r\\' msallowcapture=''><option selected=''></option></select>";
                if (el.querySelectorAll("[msallowcapture^='']").length) {
                  rbuggyQSA.push("[*^$]=" + whitespace2 + `*(?:''|"")`);
                }
                if (!el.querySelectorAll("[selected]").length) {
                  rbuggyQSA.push("\\[" + whitespace2 + "*(?:value|" + booleans + ")");
                }
                if (!el.querySelectorAll("[id~=" + expando + "-]").length) {
                  rbuggyQSA.push("~=");
                }
                input = document3.createElement("input");
                input.setAttribute("name", "");
                el.appendChild(input);
                if (!el.querySelectorAll("[name='']").length) {
                  rbuggyQSA.push("\\[" + whitespace2 + "*name" + whitespace2 + "*=" + whitespace2 + `*(?:''|"")`);
                }
                if (!el.querySelectorAll(":checked").length) {
                  rbuggyQSA.push(":checked");
                }
                if (!el.querySelectorAll("a#" + expando + "+*").length) {
                  rbuggyQSA.push(".#.+[+~]");
                }
                el.querySelectorAll("\\\f");
                rbuggyQSA.push("[\\r\\n\\f]");
              });
              assert(function(el) {
                el.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var input = document3.createElement("input");
                input.setAttribute("type", "hidden");
                el.appendChild(input).setAttribute("name", "D");
                if (el.querySelectorAll("[name=d]").length) {
                  rbuggyQSA.push("name" + whitespace2 + "*[*^$|!~]?=");
                }
                if (el.querySelectorAll(":enabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }
                docElem.appendChild(el).disabled = true;
                if (el.querySelectorAll(":disabled").length !== 2) {
                  rbuggyQSA.push(":enabled", ":disabled");
                }
                el.querySelectorAll("*,:x");
                rbuggyQSA.push(",.*:");
              });
            }
            if (support2.matchesSelector = rnative.test(matches = docElem.matches || docElem.webkitMatchesSelector || docElem.mozMatchesSelector || docElem.oMatchesSelector || docElem.msMatchesSelector)) {
              assert(function(el) {
                support2.disconnectedMatch = matches.call(el, "*");
                matches.call(el, "[s!='']:x");
                rbuggyMatches.push("!=", pseudos);
              });
            }
            if (!support2.cssHas) {
              rbuggyQSA.push(":has");
            }
            rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
            rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));
            hasCompare = rnative.test(docElem.compareDocumentPosition);
            contains = hasCompare || rnative.test(docElem.contains) ? function(a, b) {
              var adown = a.nodeType === 9 && a.documentElement || a, bup = b && b.parentNode;
              return a === bup || !!(bup && bup.nodeType === 1 && (adown.contains ? adown.contains(bup) : a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16));
            } : function(a, b) {
              if (b) {
                while (b = b.parentNode) {
                  if (b === a) {
                    return true;
                  }
                }
              }
              return false;
            };
            sortOrder = hasCompare ? function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
              if (compare) {
                return compare;
              }
              compare = (a.ownerDocument || a) == (b.ownerDocument || b) ? a.compareDocumentPosition(b) : (
                // Otherwise we know they are disconnected
                1
              );
              if (compare & 1 || !support2.sortDetached && b.compareDocumentPosition(a) === compare) {
                if (a == document3 || a.ownerDocument == preferredDoc && contains(preferredDoc, a)) {
                  return -1;
                }
                if (b == document3 || b.ownerDocument == preferredDoc && contains(preferredDoc, b)) {
                  return 1;
                }
                return sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0;
              }
              return compare & 4 ? -1 : 1;
            } : function(a, b) {
              if (a === b) {
                hasDuplicate = true;
                return 0;
              }
              var cur, i2 = 0, aup = a.parentNode, bup = b.parentNode, ap = [a], bp = [b];
              if (!aup || !bup) {
                return a == document3 ? -1 : b == document3 ? 1 : (
                  /* eslint-enable eqeqeq */
                  aup ? -1 : bup ? 1 : sortInput ? indexOf2(sortInput, a) - indexOf2(sortInput, b) : 0
                );
              } else if (aup === bup) {
                return siblingCheck(a, b);
              }
              cur = a;
              while (cur = cur.parentNode) {
                ap.unshift(cur);
              }
              cur = b;
              while (cur = cur.parentNode) {
                bp.unshift(cur);
              }
              while (ap[i2] === bp[i2]) {
                i2++;
              }
              return i2 ? (
                // Do a sibling check if the nodes have a common ancestor
                siblingCheck(ap[i2], bp[i2])
              ) : (
                // Otherwise nodes in our document sort first
                // Support: IE 11+, Edge 17 - 18+
                // IE/Edge sometimes throw a "Permission denied" error when strict-comparing
                // two documents; shallow comparisons work.
                /* eslint-disable eqeqeq */
                ap[i2] == preferredDoc ? -1 : bp[i2] == preferredDoc ? 1 : (
                  /* eslint-enable eqeqeq */
                  0
                )
              );
            };
            return document3;
          };
          Sizzle2.matches = function(expr, elements) {
            return Sizzle2(expr, null, null, elements);
          };
          Sizzle2.matchesSelector = function(elem, expr) {
            setDocument(elem);
            if (support2.matchesSelector && documentIsHTML && !nonnativeSelectorCache[expr + " "] && (!rbuggyMatches || !rbuggyMatches.test(expr)) && (!rbuggyQSA || !rbuggyQSA.test(expr))) {
              try {
                var ret = matches.call(elem, expr);
                if (ret || support2.disconnectedMatch || // As well, disconnected nodes are said to be in a document
                // fragment in IE 9
                elem.document && elem.document.nodeType !== 11) {
                  return ret;
                }
              } catch (e) {
                nonnativeSelectorCache(expr, true);
              }
            }
            return Sizzle2(expr, document3, null, [elem]).length > 0;
          };
          Sizzle2.contains = function(context, elem) {
            if ((context.ownerDocument || context) != document3) {
              setDocument(context);
            }
            return contains(context, elem);
          };
          Sizzle2.attr = function(elem, name) {
            if ((elem.ownerDocument || elem) != document3) {
              setDocument(elem);
            }
            var fn = Expr.attrHandle[name.toLowerCase()], val = fn && hasOwn2.call(Expr.attrHandle, name.toLowerCase()) ? fn(elem, name, !documentIsHTML) : void 0;
            return val !== void 0 ? val : support2.attributes || !documentIsHTML ? elem.getAttribute(name) : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
          };
          Sizzle2.escape = function(sel) {
            return (sel + "").replace(rcssescape, fcssescape);
          };
          Sizzle2.error = function(msg) {
            throw new Error("Syntax error, unrecognized expression: " + msg);
          };
          Sizzle2.uniqueSort = function(results) {
            var elem, duplicates = [], j = 0, i2 = 0;
            hasDuplicate = !support2.detectDuplicates;
            sortInput = !support2.sortStable && results.slice(0);
            results.sort(sortOrder);
            if (hasDuplicate) {
              while (elem = results[i2++]) {
                if (elem === results[i2]) {
                  j = duplicates.push(i2);
                }
              }
              while (j--) {
                results.splice(duplicates[j], 1);
              }
            }
            sortInput = null;
            return results;
          };
          getText = Sizzle2.getText = function(elem) {
            var node, ret = "", i2 = 0, nodeType = elem.nodeType;
            if (!nodeType) {
              while (node = elem[i2++]) {
                ret += getText(node);
              }
            } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
              if (typeof elem.textContent === "string") {
                return elem.textContent;
              } else {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  ret += getText(elem);
                }
              }
            } else if (nodeType === 3 || nodeType === 4) {
              return elem.nodeValue;
            }
            return ret;
          };
          Expr = Sizzle2.selectors = {
            // Can be adjusted by the user
            cacheLength: 50,
            createPseudo: markFunction,
            match: matchExpr,
            attrHandle: {},
            find: {},
            relative: {
              ">": { dir: "parentNode", first: true },
              " ": { dir: "parentNode" },
              "+": { dir: "previousSibling", first: true },
              "~": { dir: "previousSibling" }
            },
            preFilter: {
              "ATTR": function(match) {
                match[1] = match[1].replace(runescape, funescape);
                match[3] = (match[3] || match[4] || match[5] || "").replace(runescape, funescape);
                if (match[2] === "~=") {
                  match[3] = " " + match[3] + " ";
                }
                return match.slice(0, 4);
              },
              "CHILD": function(match) {
                match[1] = match[1].toLowerCase();
                if (match[1].slice(0, 3) === "nth") {
                  if (!match[3]) {
                    Sizzle2.error(match[0]);
                  }
                  match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
                  match[5] = +(match[7] + match[8] || match[3] === "odd");
                } else if (match[3]) {
                  Sizzle2.error(match[0]);
                }
                return match;
              },
              "PSEUDO": function(match) {
                var excess, unquoted = !match[6] && match[2];
                if (matchExpr["CHILD"].test(match[0])) {
                  return null;
                }
                if (match[3]) {
                  match[2] = match[4] || match[5] || "";
                } else if (unquoted && rpseudo.test(unquoted) && // Get excess from tokenize (recursively)
                (excess = tokenize(unquoted, true)) && // advance to the next closing parenthesis
                (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {
                  match[0] = match[0].slice(0, excess);
                  match[2] = unquoted.slice(0, excess);
                }
                return match.slice(0, 3);
              }
            },
            filter: {
              "TAG": function(nodeNameSelector) {
                var nodeName2 = nodeNameSelector.replace(runescape, funescape).toLowerCase();
                return nodeNameSelector === "*" ? function() {
                  return true;
                } : function(elem) {
                  return elem.nodeName && elem.nodeName.toLowerCase() === nodeName2;
                };
              },
              "CLASS": function(className) {
                var pattern = classCache[className + " "];
                return pattern || (pattern = new RegExp("(^|" + whitespace2 + ")" + className + "(" + whitespace2 + "|$)")) && classCache(
                  className,
                  function(elem) {
                    return pattern.test(
                      typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || ""
                    );
                  }
                );
              },
              "ATTR": function(name, operator, check) {
                return function(elem) {
                  var result = Sizzle2.attr(elem, name);
                  if (result == null) {
                    return operator === "!=";
                  }
                  if (!operator) {
                    return true;
                  }
                  result += "";
                  return operator === "=" ? result === check : operator === "!=" ? result !== check : operator === "^=" ? check && result.indexOf(check) === 0 : operator === "*=" ? check && result.indexOf(check) > -1 : operator === "$=" ? check && result.slice(-check.length) === check : operator === "~=" ? (" " + result.replace(rwhitespace, " ") + " ").indexOf(check) > -1 : operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" : false;
                };
              },
              "CHILD": function(type, what, _argument, first, last) {
                var simple = type.slice(0, 3) !== "nth", forward = type.slice(-4) !== "last", ofType = what === "of-type";
                return first === 1 && last === 0 ? (
                  // Shortcut for :nth-*(n)
                  function(elem) {
                    return !!elem.parentNode;
                  }
                ) : function(elem, _context, xml) {
                  var cache, uniqueCache, outerCache, node, nodeIndex, start, dir2 = simple !== forward ? "nextSibling" : "previousSibling", parent = elem.parentNode, name = ofType && elem.nodeName.toLowerCase(), useCache = !xml && !ofType, diff = false;
                  if (parent) {
                    if (simple) {
                      while (dir2) {
                        node = elem;
                        while (node = node[dir2]) {
                          if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                            return false;
                          }
                        }
                        start = dir2 = type === "only" && !start && "nextSibling";
                      }
                      return true;
                    }
                    start = [forward ? parent.firstChild : parent.lastChild];
                    if (forward && useCache) {
                      node = parent;
                      outerCache = node[expando] || (node[expando] = {});
                      uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                      cache = uniqueCache[type] || [];
                      nodeIndex = cache[0] === dirruns && cache[1];
                      diff = nodeIndex && cache[2];
                      node = nodeIndex && parent.childNodes[nodeIndex];
                      while (node = ++nodeIndex && node && node[dir2] || // Fallback to seeking `elem` from the start
                      (diff = nodeIndex = 0) || start.pop()) {
                        if (node.nodeType === 1 && ++diff && node === elem) {
                          uniqueCache[type] = [dirruns, nodeIndex, diff];
                          break;
                        }
                      }
                    } else {
                      if (useCache) {
                        node = elem;
                        outerCache = node[expando] || (node[expando] = {});
                        uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                        cache = uniqueCache[type] || [];
                        nodeIndex = cache[0] === dirruns && cache[1];
                        diff = nodeIndex;
                      }
                      if (diff === false) {
                        while (node = ++nodeIndex && node && node[dir2] || (diff = nodeIndex = 0) || start.pop()) {
                          if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                            if (useCache) {
                              outerCache = node[expando] || (node[expando] = {});
                              uniqueCache = outerCache[node.uniqueID] || (outerCache[node.uniqueID] = {});
                              uniqueCache[type] = [dirruns, diff];
                            }
                            if (node === elem) {
                              break;
                            }
                          }
                        }
                      }
                    }
                    diff -= last;
                    return diff === first || diff % first === 0 && diff / first >= 0;
                  }
                };
              },
              "PSEUDO": function(pseudo, argument) {
                var args, fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] || Sizzle2.error("unsupported pseudo: " + pseudo);
                if (fn[expando]) {
                  return fn(argument);
                }
                if (fn.length > 1) {
                  args = [pseudo, pseudo, "", argument];
                  return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ? markFunction(function(seed, matches2) {
                    var idx, matched = fn(seed, argument), i2 = matched.length;
                    while (i2--) {
                      idx = indexOf2(seed, matched[i2]);
                      seed[idx] = !(matches2[idx] = matched[i2]);
                    }
                  }) : function(elem) {
                    return fn(elem, 0, args);
                  };
                }
                return fn;
              }
            },
            pseudos: {
              // Potentially complex pseudos
              "not": markFunction(function(selector) {
                var input = [], results = [], matcher = compile(selector.replace(rtrim2, "$1"));
                return matcher[expando] ? markFunction(function(seed, matches2, _context, xml) {
                  var elem, unmatched = matcher(seed, null, xml, []), i2 = seed.length;
                  while (i2--) {
                    if (elem = unmatched[i2]) {
                      seed[i2] = !(matches2[i2] = elem);
                    }
                  }
                }) : function(elem, _context, xml) {
                  input[0] = elem;
                  matcher(input, null, xml, results);
                  input[0] = null;
                  return !results.pop();
                };
              }),
              "has": markFunction(function(selector) {
                return function(elem) {
                  return Sizzle2(selector, elem).length > 0;
                };
              }),
              "contains": markFunction(function(text) {
                text = text.replace(runescape, funescape);
                return function(elem) {
                  return (elem.textContent || getText(elem)).indexOf(text) > -1;
                };
              }),
              // "Whether an element is represented by a :lang() selector
              // is based solely on the element's language value
              // being equal to the identifier C,
              // or beginning with the identifier C immediately followed by "-".
              // The matching of C against the element's language value is performed case-insensitively.
              // The identifier C does not have to be a valid language name."
              // http://www.w3.org/TR/selectors/#lang-pseudo
              "lang": markFunction(function(lang) {
                if (!ridentifier.test(lang || "")) {
                  Sizzle2.error("unsupported lang: " + lang);
                }
                lang = lang.replace(runescape, funescape).toLowerCase();
                return function(elem) {
                  var elemLang;
                  do {
                    if (elemLang = documentIsHTML ? elem.lang : elem.getAttribute("xml:lang") || elem.getAttribute("lang")) {
                      elemLang = elemLang.toLowerCase();
                      return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
                    }
                  } while ((elem = elem.parentNode) && elem.nodeType === 1);
                  return false;
                };
              }),
              // Miscellaneous
              "target": function(elem) {
                var hash = window3.location && window3.location.hash;
                return hash && hash.slice(1) === elem.id;
              },
              "root": function(elem) {
                return elem === docElem;
              },
              "focus": function(elem) {
                return elem === document3.activeElement && (!document3.hasFocus || document3.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
              },
              // Boolean properties
              "enabled": createDisabledPseudo(false),
              "disabled": createDisabledPseudo(true),
              "checked": function(elem) {
                var nodeName2 = elem.nodeName.toLowerCase();
                return nodeName2 === "input" && !!elem.checked || nodeName2 === "option" && !!elem.selected;
              },
              "selected": function(elem) {
                if (elem.parentNode) {
                  elem.parentNode.selectedIndex;
                }
                return elem.selected === true;
              },
              // Contents
              "empty": function(elem) {
                for (elem = elem.firstChild; elem; elem = elem.nextSibling) {
                  if (elem.nodeType < 6) {
                    return false;
                  }
                }
                return true;
              },
              "parent": function(elem) {
                return !Expr.pseudos["empty"](elem);
              },
              // Element/input types
              "header": function(elem) {
                return rheader.test(elem.nodeName);
              },
              "input": function(elem) {
                return rinputs.test(elem.nodeName);
              },
              "button": function(elem) {
                var name = elem.nodeName.toLowerCase();
                return name === "input" && elem.type === "button" || name === "button";
              },
              "text": function(elem) {
                var attr;
                return elem.nodeName.toLowerCase() === "input" && elem.type === "text" && // Support: IE <10 only
                // New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
                ((attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text");
              },
              // Position-in-collection
              "first": createPositionalPseudo(function() {
                return [0];
              }),
              "last": createPositionalPseudo(function(_matchIndexes, length) {
                return [length - 1];
              }),
              "eq": createPositionalPseudo(function(_matchIndexes, length, argument) {
                return [argument < 0 ? argument + length : argument];
              }),
              "even": createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 0;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "odd": createPositionalPseudo(function(matchIndexes, length) {
                var i2 = 1;
                for (; i2 < length; i2 += 2) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "lt": createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2 = argument < 0 ? argument + length : argument > length ? length : argument;
                for (; --i2 >= 0; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              }),
              "gt": createPositionalPseudo(function(matchIndexes, length, argument) {
                var i2 = argument < 0 ? argument + length : argument;
                for (; ++i2 < length; ) {
                  matchIndexes.push(i2);
                }
                return matchIndexes;
              })
            }
          };
          Expr.pseudos["nth"] = Expr.pseudos["eq"];
          for (i in { radio: true, checkbox: true, file: true, password: true, image: true }) {
            Expr.pseudos[i] = createInputPseudo(i);
          }
          for (i in { submit: true, reset: true }) {
            Expr.pseudos[i] = createButtonPseudo(i);
          }
          function setFilters() {
          }
          setFilters.prototype = Expr.filters = Expr.pseudos;
          Expr.setFilters = new setFilters();
          tokenize = Sizzle2.tokenize = function(selector, parseOnly) {
            var matched, match, tokens, type, soFar, groups, preFilters, cached = tokenCache[selector + " "];
            if (cached) {
              return parseOnly ? 0 : cached.slice(0);
            }
            soFar = selector;
            groups = [];
            preFilters = Expr.preFilter;
            while (soFar) {
              if (!matched || (match = rcomma.exec(soFar))) {
                if (match) {
                  soFar = soFar.slice(match[0].length) || soFar;
                }
                groups.push(tokens = []);
              }
              matched = false;
              if (match = rleadingCombinator.exec(soFar)) {
                matched = match.shift();
                tokens.push({
                  value: matched,
                  // Cast descendant combinators to space
                  type: match[0].replace(rtrim2, " ")
                });
                soFar = soFar.slice(matched.length);
              }
              for (type in Expr.filter) {
                if ((match = matchExpr[type].exec(soFar)) && (!preFilters[type] || (match = preFilters[type](match)))) {
                  matched = match.shift();
                  tokens.push({
                    value: matched,
                    type,
                    matches: match
                  });
                  soFar = soFar.slice(matched.length);
                }
              }
              if (!matched) {
                break;
              }
            }
            return parseOnly ? soFar.length : soFar ? Sizzle2.error(selector) : (
              // Cache the tokens
              tokenCache(selector, groups).slice(0)
            );
          };
          function toSelector(tokens) {
            var i2 = 0, len = tokens.length, selector = "";
            for (; i2 < len; i2++) {
              selector += tokens[i2].value;
            }
            return selector;
          }
          function addCombinator(matcher, combinator, base) {
            var dir2 = combinator.dir, skip = combinator.next, key = skip || dir2, checkNonElements = base && key === "parentNode", doneName = done++;
            return combinator.first ? (
              // Check against closest ancestor/preceding element
              function(elem, context, xml) {
                while (elem = elem[dir2]) {
                  if (elem.nodeType === 1 || checkNonElements) {
                    return matcher(elem, context, xml);
                  }
                }
                return false;
              }
            ) : (
              // Check against all ancestor/preceding elements
              function(elem, context, xml) {
                var oldCache, uniqueCache, outerCache, newCache = [dirruns, doneName];
                if (xml) {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      if (matcher(elem, context, xml)) {
                        return true;
                      }
                    }
                  }
                } else {
                  while (elem = elem[dir2]) {
                    if (elem.nodeType === 1 || checkNonElements) {
                      outerCache = elem[expando] || (elem[expando] = {});
                      uniqueCache = outerCache[elem.uniqueID] || (outerCache[elem.uniqueID] = {});
                      if (skip && skip === elem.nodeName.toLowerCase()) {
                        elem = elem[dir2] || elem;
                      } else if ((oldCache = uniqueCache[key]) && oldCache[0] === dirruns && oldCache[1] === doneName) {
                        return newCache[2] = oldCache[2];
                      } else {
                        uniqueCache[key] = newCache;
                        if (newCache[2] = matcher(elem, context, xml)) {
                          return true;
                        }
                      }
                    }
                  }
                }
                return false;
              }
            );
          }
          function elementMatcher(matchers) {
            return matchers.length > 1 ? function(elem, context, xml) {
              var i2 = matchers.length;
              while (i2--) {
                if (!matchers[i2](elem, context, xml)) {
                  return false;
                }
              }
              return true;
            } : matchers[0];
          }
          function multipleContexts(selector, contexts, results) {
            var i2 = 0, len = contexts.length;
            for (; i2 < len; i2++) {
              Sizzle2(selector, contexts[i2], results);
            }
            return results;
          }
          function condense(unmatched, map, filter, context, xml) {
            var elem, newUnmatched = [], i2 = 0, len = unmatched.length, mapped = map != null;
            for (; i2 < len; i2++) {
              if (elem = unmatched[i2]) {
                if (!filter || filter(elem, context, xml)) {
                  newUnmatched.push(elem);
                  if (mapped) {
                    map.push(i2);
                  }
                }
              }
            }
            return newUnmatched;
          }
          function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
            if (postFilter && !postFilter[expando]) {
              postFilter = setMatcher(postFilter);
            }
            if (postFinder && !postFinder[expando]) {
              postFinder = setMatcher(postFinder, postSelector);
            }
            return markFunction(function(seed, results, context, xml) {
              var temp, i2, elem, preMap = [], postMap = [], preexisting = results.length, elems = seed || multipleContexts(
                selector || "*",
                context.nodeType ? [context] : context,
                []
              ), matcherIn = preFilter && (seed || !selector) ? condense(elems, preMap, preFilter, context, xml) : elems, matcherOut = matcher ? (
                // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
                postFinder || (seed ? preFilter : preexisting || postFilter) ? (
                  // ...intermediate processing is necessary
                  []
                ) : (
                  // ...otherwise use results directly
                  results
                )
              ) : matcherIn;
              if (matcher) {
                matcher(matcherIn, matcherOut, context, xml);
              }
              if (postFilter) {
                temp = condense(matcherOut, postMap);
                postFilter(temp, [], context, xml);
                i2 = temp.length;
                while (i2--) {
                  if (elem = temp[i2]) {
                    matcherOut[postMap[i2]] = !(matcherIn[postMap[i2]] = elem);
                  }
                }
              }
              if (seed) {
                if (postFinder || preFilter) {
                  if (postFinder) {
                    temp = [];
                    i2 = matcherOut.length;
                    while (i2--) {
                      if (elem = matcherOut[i2]) {
                        temp.push(matcherIn[i2] = elem);
                      }
                    }
                    postFinder(null, matcherOut = [], temp, xml);
                  }
                  i2 = matcherOut.length;
                  while (i2--) {
                    if ((elem = matcherOut[i2]) && (temp = postFinder ? indexOf2(seed, elem) : preMap[i2]) > -1) {
                      seed[temp] = !(results[temp] = elem);
                    }
                  }
                }
              } else {
                matcherOut = condense(
                  matcherOut === results ? matcherOut.splice(preexisting, matcherOut.length) : matcherOut
                );
                if (postFinder) {
                  postFinder(null, results, matcherOut, xml);
                } else {
                  push2.apply(results, matcherOut);
                }
              }
            });
          }
          function matcherFromTokens(tokens) {
            var checkContext, matcher, j, len = tokens.length, leadingRelative = Expr.relative[tokens[0].type], implicitRelative = leadingRelative || Expr.relative[" "], i2 = leadingRelative ? 1 : 0, matchContext = addCombinator(function(elem) {
              return elem === checkContext;
            }, implicitRelative, true), matchAnyContext = addCombinator(function(elem) {
              return indexOf2(checkContext, elem) > -1;
            }, implicitRelative, true), matchers = [function(elem, context, xml) {
              var ret = !leadingRelative && (xml || context !== outermostContext) || ((checkContext = context).nodeType ? matchContext(elem, context, xml) : matchAnyContext(elem, context, xml));
              checkContext = null;
              return ret;
            }];
            for (; i2 < len; i2++) {
              if (matcher = Expr.relative[tokens[i2].type]) {
                matchers = [addCombinator(elementMatcher(matchers), matcher)];
              } else {
                matcher = Expr.filter[tokens[i2].type].apply(null, tokens[i2].matches);
                if (matcher[expando]) {
                  j = ++i2;
                  for (; j < len; j++) {
                    if (Expr.relative[tokens[j].type]) {
                      break;
                    }
                  }
                  return setMatcher(
                    i2 > 1 && elementMatcher(matchers),
                    i2 > 1 && toSelector(
                      // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                      tokens.slice(0, i2 - 1).concat({ value: tokens[i2 - 2].type === " " ? "*" : "" })
                    ).replace(rtrim2, "$1"),
                    matcher,
                    i2 < j && matcherFromTokens(tokens.slice(i2, j)),
                    j < len && matcherFromTokens(tokens = tokens.slice(j)),
                    j < len && toSelector(tokens)
                  );
                }
                matchers.push(matcher);
              }
            }
            return elementMatcher(matchers);
          }
          function matcherFromGroupMatchers(elementMatchers, setMatchers) {
            var bySet = setMatchers.length > 0, byElement = elementMatchers.length > 0, superMatcher = function(seed, context, xml, results, outermost) {
              var elem, j, matcher, matchedCount = 0, i2 = "0", unmatched = seed && [], setMatched = [], contextBackup = outermostContext, elems = seed || byElement && Expr.find["TAG"]("*", outermost), dirrunsUnique = dirruns += contextBackup == null ? 1 : Math.random() || 0.1, len = elems.length;
              if (outermost) {
                outermostContext = context == document3 || context || outermost;
              }
              for (; i2 !== len && (elem = elems[i2]) != null; i2++) {
                if (byElement && elem) {
                  j = 0;
                  if (!context && elem.ownerDocument != document3) {
                    setDocument(elem);
                    xml = !documentIsHTML;
                  }
                  while (matcher = elementMatchers[j++]) {
                    if (matcher(elem, context || document3, xml)) {
                      results.push(elem);
                      break;
                    }
                  }
                  if (outermost) {
                    dirruns = dirrunsUnique;
                  }
                }
                if (bySet) {
                  if (elem = !matcher && elem) {
                    matchedCount--;
                  }
                  if (seed) {
                    unmatched.push(elem);
                  }
                }
              }
              matchedCount += i2;
              if (bySet && i2 !== matchedCount) {
                j = 0;
                while (matcher = setMatchers[j++]) {
                  matcher(unmatched, setMatched, context, xml);
                }
                if (seed) {
                  if (matchedCount > 0) {
                    while (i2--) {
                      if (!(unmatched[i2] || setMatched[i2])) {
                        setMatched[i2] = pop.call(results);
                      }
                    }
                  }
                  setMatched = condense(setMatched);
                }
                push2.apply(results, setMatched);
                if (outermost && !seed && setMatched.length > 0 && matchedCount + setMatchers.length > 1) {
                  Sizzle2.uniqueSort(results);
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
                outermostContext = contextBackup;
              }
              return unmatched;
            };
            return bySet ? markFunction(superMatcher) : superMatcher;
          }
          compile = Sizzle2.compile = function(selector, match) {
            var i2, setMatchers = [], elementMatchers = [], cached = compilerCache[selector + " "];
            if (!cached) {
              if (!match) {
                match = tokenize(selector);
              }
              i2 = match.length;
              while (i2--) {
                cached = matcherFromTokens(match[i2]);
                if (cached[expando]) {
                  setMatchers.push(cached);
                } else {
                  elementMatchers.push(cached);
                }
              }
              cached = compilerCache(
                selector,
                matcherFromGroupMatchers(elementMatchers, setMatchers)
              );
              cached.selector = selector;
            }
            return cached;
          };
          select = Sizzle2.select = function(selector, context, results, seed) {
            var i2, tokens, token, type, find, compiled = typeof selector === "function" && selector, match = !seed && tokenize(selector = compiled.selector || selector);
            results = results || [];
            if (match.length === 1) {
              tokens = match[0] = match[0].slice(0);
              if (tokens.length > 2 && (token = tokens[0]).type === "ID" && context.nodeType === 9 && documentIsHTML && Expr.relative[tokens[1].type]) {
                context = (Expr.find["ID"](token.matches[0].replace(runescape, funescape), context) || [])[0];
                if (!context) {
                  return results;
                } else if (compiled) {
                  context = context.parentNode;
                }
                selector = selector.slice(tokens.shift().value.length);
              }
              i2 = matchExpr["needsContext"].test(selector) ? 0 : tokens.length;
              while (i2--) {
                token = tokens[i2];
                if (Expr.relative[type = token.type]) {
                  break;
                }
                if (find = Expr.find[type]) {
                  if (seed = find(
                    token.matches[0].replace(runescape, funescape),
                    rsibling.test(tokens[0].type) && testContext(context.parentNode) || context
                  )) {
                    tokens.splice(i2, 1);
                    selector = seed.length && toSelector(tokens);
                    if (!selector) {
                      push2.apply(results, seed);
                      return results;
                    }
                    break;
                  }
                }
              }
            }
            (compiled || compile(selector, match))(
              seed,
              context,
              !documentIsHTML,
              results,
              !context || rsibling.test(selector) && testContext(context.parentNode) || context
            );
            return results;
          };
          support2.sortStable = expando.split("").sort(sortOrder).join("") === expando;
          support2.detectDuplicates = !!hasDuplicate;
          setDocument();
          support2.sortDetached = assert(function(el) {
            return el.compareDocumentPosition(document3.createElement("fieldset")) & 1;
          });
          if (!assert(function(el) {
            el.innerHTML = "<a href='#'></a>";
            return el.firstChild.getAttribute("href") === "#";
          })) {
            addHandle("type|href|height|width", function(elem, name, isXML2) {
              if (!isXML2) {
                return elem.getAttribute(name, name.toLowerCase() === "type" ? 1 : 2);
              }
            });
          }
          if (!support2.attributes || !assert(function(el) {
            el.innerHTML = "<input/>";
            el.firstChild.setAttribute("value", "");
            return el.firstChild.getAttribute("value") === "";
          })) {
            addHandle("value", function(elem, _name, isXML2) {
              if (!isXML2 && elem.nodeName.toLowerCase() === "input") {
                return elem.defaultValue;
              }
            });
          }
          if (!assert(function(el) {
            return el.getAttribute("disabled") == null;
          })) {
            addHandle(booleans, function(elem, name, isXML2) {
              var val;
              if (!isXML2) {
                return elem[name] === true ? name.toLowerCase() : (val = elem.getAttributeNode(name)) && val.specified ? val.value : null;
              }
            });
          }
          return Sizzle2;
        }(window2)
      );
      jQuery.find = Sizzle;
      jQuery.expr = Sizzle.selectors;
      jQuery.expr[":"] = jQuery.expr.pseudos;
      jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
      jQuery.text = Sizzle.getText;
      jQuery.isXMLDoc = Sizzle.isXML;
      jQuery.contains = Sizzle.contains;
      jQuery.escapeSelector = Sizzle.escape;
      var dir = function(elem, dir2, until) {
        var matched = [], truncate = until !== void 0;
        while ((elem = elem[dir2]) && elem.nodeType !== 9) {
          if (elem.nodeType === 1) {
            if (truncate && jQuery(elem).is(until)) {
              break;
            }
            matched.push(elem);
          }
        }
        return matched;
      };
      var siblings = function(n, elem) {
        var matched = [];
        for (; n; n = n.nextSibling) {
          if (n.nodeType === 1 && n !== elem) {
            matched.push(n);
          }
        }
        return matched;
      };
      var rneedsContext = jQuery.expr.match.needsContext;
      function nodeName(elem, name) {
        return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
      }
      var rsingleTag = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i;
      function winnow(elements, qualifier, not) {
        if (isFunction(qualifier)) {
          return jQuery.grep(elements, function(elem, i) {
            return !!qualifier.call(elem, i, elem) !== not;
          });
        }
        if (qualifier.nodeType) {
          return jQuery.grep(elements, function(elem) {
            return elem === qualifier !== not;
          });
        }
        if (typeof qualifier !== "string") {
          return jQuery.grep(elements, function(elem) {
            return indexOf.call(qualifier, elem) > -1 !== not;
          });
        }
        return jQuery.filter(qualifier, elements, not);
      }
      jQuery.filter = function(expr, elems, not) {
        var elem = elems[0];
        if (not) {
          expr = ":not(" + expr + ")";
        }
        if (elems.length === 1 && elem.nodeType === 1) {
          return jQuery.find.matchesSelector(elem, expr) ? [elem] : [];
        }
        return jQuery.find.matches(expr, jQuery.grep(elems, function(elem2) {
          return elem2.nodeType === 1;
        }));
      };
      jQuery.fn.extend({
        find: function(selector) {
          var i, ret, len = this.length, self2 = this;
          if (typeof selector !== "string") {
            return this.pushStack(jQuery(selector).filter(function() {
              for (i = 0; i < len; i++) {
                if (jQuery.contains(self2[i], this)) {
                  return true;
                }
              }
            }));
          }
          ret = this.pushStack([]);
          for (i = 0; i < len; i++) {
            jQuery.find(selector, self2[i], ret);
          }
          return len > 1 ? jQuery.uniqueSort(ret) : ret;
        },
        filter: function(selector) {
          return this.pushStack(winnow(this, selector || [], false));
        },
        not: function(selector) {
          return this.pushStack(winnow(this, selector || [], true));
        },
        is: function(selector) {
          return !!winnow(
            this,
            // If this is a positional/relative selector, check membership in the returned set
            // so $("p:first").is("p:last") won't return true for a doc with two "p".
            typeof selector === "string" && rneedsContext.test(selector) ? jQuery(selector) : selector || [],
            false
          ).length;
        }
      });
      var rootjQuery, rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/, init = jQuery.fn.init = function(selector, context, root) {
        var match, elem;
        if (!selector) {
          return this;
        }
        root = root || rootjQuery;
        if (typeof selector === "string") {
          if (selector[0] === "<" && selector[selector.length - 1] === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }
          if (match && (match[1] || !context)) {
            if (match[1]) {
              context = context instanceof jQuery ? context[0] : context;
              jQuery.merge(this, jQuery.parseHTML(
                match[1],
                context && context.nodeType ? context.ownerDocument || context : document2,
                true
              ));
              if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                for (match in context) {
                  if (isFunction(this[match])) {
                    this[match](context[match]);
                  } else {
                    this.attr(match, context[match]);
                  }
                }
              }
              return this;
            } else {
              elem = document2.getElementById(match[2]);
              if (elem) {
                this[0] = elem;
                this.length = 1;
              }
              return this;
            }
          } else if (!context || context.jquery) {
            return (context || root).find(selector);
          } else {
            return this.constructor(context).find(selector);
          }
        } else if (selector.nodeType) {
          this[0] = selector;
          this.length = 1;
          return this;
        } else if (isFunction(selector)) {
          return root.ready !== void 0 ? root.ready(selector) : (
            // Execute immediately if ready is not present
            selector(jQuery)
          );
        }
        return jQuery.makeArray(selector, this);
      };
      init.prototype = jQuery.fn;
      rootjQuery = jQuery(document2);
      var rparentsprev = /^(?:parents|prev(?:Until|All))/, guaranteedUnique = {
        children: true,
        contents: true,
        next: true,
        prev: true
      };
      jQuery.fn.extend({
        has: function(target) {
          var targets = jQuery(target, this), l = targets.length;
          return this.filter(function() {
            var i = 0;
            for (; i < l; i++) {
              if (jQuery.contains(this, targets[i])) {
                return true;
              }
            }
          });
        },
        closest: function(selectors, context) {
          var cur, i = 0, l = this.length, matched = [], targets = typeof selectors !== "string" && jQuery(selectors);
          if (!rneedsContext.test(selectors)) {
            for (; i < l; i++) {
              for (cur = this[i]; cur && cur !== context; cur = cur.parentNode) {
                if (cur.nodeType < 11 && (targets ? targets.index(cur) > -1 : (
                  // Don't pass non-elements to Sizzle
                  cur.nodeType === 1 && jQuery.find.matchesSelector(cur, selectors)
                ))) {
                  matched.push(cur);
                  break;
                }
              }
            }
          }
          return this.pushStack(matched.length > 1 ? jQuery.uniqueSort(matched) : matched);
        },
        // Determine the position of an element within the set
        index: function(elem) {
          if (!elem) {
            return this[0] && this[0].parentNode ? this.first().prevAll().length : -1;
          }
          if (typeof elem === "string") {
            return indexOf.call(jQuery(elem), this[0]);
          }
          return indexOf.call(
            this,
            // If it receives a jQuery object, the first element is used
            elem.jquery ? elem[0] : elem
          );
        },
        add: function(selector, context) {
          return this.pushStack(
            jQuery.uniqueSort(
              jQuery.merge(this.get(), jQuery(selector, context))
            )
          );
        },
        addBack: function(selector) {
          return this.add(
            selector == null ? this.prevObject : this.prevObject.filter(selector)
          );
        }
      });
      function sibling(cur, dir2) {
        while ((cur = cur[dir2]) && cur.nodeType !== 1) {
        }
        return cur;
      }
      jQuery.each({
        parent: function(elem) {
          var parent = elem.parentNode;
          return parent && parent.nodeType !== 11 ? parent : null;
        },
        parents: function(elem) {
          return dir(elem, "parentNode");
        },
        parentsUntil: function(elem, _i, until) {
          return dir(elem, "parentNode", until);
        },
        next: function(elem) {
          return sibling(elem, "nextSibling");
        },
        prev: function(elem) {
          return sibling(elem, "previousSibling");
        },
        nextAll: function(elem) {
          return dir(elem, "nextSibling");
        },
        prevAll: function(elem) {
          return dir(elem, "previousSibling");
        },
        nextUntil: function(elem, _i, until) {
          return dir(elem, "nextSibling", until);
        },
        prevUntil: function(elem, _i, until) {
          return dir(elem, "previousSibling", until);
        },
        siblings: function(elem) {
          return siblings((elem.parentNode || {}).firstChild, elem);
        },
        children: function(elem) {
          return siblings(elem.firstChild);
        },
        contents: function(elem) {
          if (elem.contentDocument != null && // Support: IE 11+
          // <object> elements with no `data` attribute has an object
          // `contentDocument` with a `null` prototype.
          getProto(elem.contentDocument)) {
            return elem.contentDocument;
          }
          if (nodeName(elem, "template")) {
            elem = elem.content || elem;
          }
          return jQuery.merge([], elem.childNodes);
        }
      }, function(name, fn) {
        jQuery.fn[name] = function(until, selector) {
          var matched = jQuery.map(this, fn, until);
          if (name.slice(-5) !== "Until") {
            selector = until;
          }
          if (selector && typeof selector === "string") {
            matched = jQuery.filter(selector, matched);
          }
          if (this.length > 1) {
            if (!guaranteedUnique[name]) {
              jQuery.uniqueSort(matched);
            }
            if (rparentsprev.test(name)) {
              matched.reverse();
            }
          }
          return this.pushStack(matched);
        };
      });
      var rnothtmlwhite = /[^\x20\t\r\n\f]+/g;
      function createOptions(options) {
        var object = {};
        jQuery.each(options.match(rnothtmlwhite) || [], function(_, flag) {
          object[flag] = true;
        });
        return object;
      }
      jQuery.Callbacks = function(options) {
        options = typeof options === "string" ? createOptions(options) : jQuery.extend({}, options);
        var firing, memory, fired, locked, list = [], queue = [], firingIndex = -1, fire = function() {
          locked = locked || options.once;
          fired = firing = true;
          for (; queue.length; firingIndex = -1) {
            memory = queue.shift();
            while (++firingIndex < list.length) {
              if (list[firingIndex].apply(memory[0], memory[1]) === false && options.stopOnFalse) {
                firingIndex = list.length;
                memory = false;
              }
            }
          }
          if (!options.memory) {
            memory = false;
          }
          firing = false;
          if (locked) {
            if (memory) {
              list = [];
            } else {
              list = "";
            }
          }
        }, self2 = {
          // Add a callback or a collection of callbacks to the list
          add: function() {
            if (list) {
              if (memory && !firing) {
                firingIndex = list.length - 1;
                queue.push(memory);
              }
              (function add(args) {
                jQuery.each(args, function(_, arg) {
                  if (isFunction(arg)) {
                    if (!options.unique || !self2.has(arg)) {
                      list.push(arg);
                    }
                  } else if (arg && arg.length && toType(arg) !== "string") {
                    add(arg);
                  }
                });
              })(arguments);
              if (memory && !firing) {
                fire();
              }
            }
            return this;
          },
          // Remove a callback from the list
          remove: function() {
            jQuery.each(arguments, function(_, arg) {
              var index;
              while ((index = jQuery.inArray(arg, list, index)) > -1) {
                list.splice(index, 1);
                if (index <= firingIndex) {
                  firingIndex--;
                }
              }
            });
            return this;
          },
          // Check if a given callback is in the list.
          // If no argument is given, return whether or not list has callbacks attached.
          has: function(fn) {
            return fn ? jQuery.inArray(fn, list) > -1 : list.length > 0;
          },
          // Remove all callbacks from the list
          empty: function() {
            if (list) {
              list = [];
            }
            return this;
          },
          // Disable .fire and .add
          // Abort any current/pending executions
          // Clear all callbacks and values
          disable: function() {
            locked = queue = [];
            list = memory = "";
            return this;
          },
          disabled: function() {
            return !list;
          },
          // Disable .fire
          // Also disable .add unless we have memory (since it would have no effect)
          // Abort any pending executions
          lock: function() {
            locked = queue = [];
            if (!memory && !firing) {
              list = memory = "";
            }
            return this;
          },
          locked: function() {
            return !!locked;
          },
          // Call all callbacks with the given context and arguments
          fireWith: function(context, args) {
            if (!locked) {
              args = args || [];
              args = [context, args.slice ? args.slice() : args];
              queue.push(args);
              if (!firing) {
                fire();
              }
            }
            return this;
          },
          // Call all the callbacks with the given arguments
          fire: function() {
            self2.fireWith(this, arguments);
            return this;
          },
          // To know if the callbacks have already been called at least once
          fired: function() {
            return !!fired;
          }
        };
        return self2;
      };
      function Identity(v) {
        return v;
      }
      function Thrower(ex) {
        throw ex;
      }
      function adoptValue(value, resolve, reject, noValue) {
        var method;
        try {
          if (value && isFunction(method = value.promise)) {
            method.call(value).done(resolve).fail(reject);
          } else if (value && isFunction(method = value.then)) {
            method.call(value, resolve, reject);
          } else {
            resolve.apply(void 0, [value].slice(noValue));
          }
        } catch (value2) {
          reject.apply(void 0, [value2]);
        }
      }
      jQuery.extend({
        Deferred: function(func) {
          var tuples = [
            // action, add listener, callbacks,
            // ... .then handlers, argument index, [final state]
            [
              "notify",
              "progress",
              jQuery.Callbacks("memory"),
              jQuery.Callbacks("memory"),
              2
            ],
            [
              "resolve",
              "done",
              jQuery.Callbacks("once memory"),
              jQuery.Callbacks("once memory"),
              0,
              "resolved"
            ],
            [
              "reject",
              "fail",
              jQuery.Callbacks("once memory"),
              jQuery.Callbacks("once memory"),
              1,
              "rejected"
            ]
          ], state = "pending", promise = {
            state: function() {
              return state;
            },
            always: function() {
              deferred.done(arguments).fail(arguments);
              return this;
            },
            "catch": function(fn) {
              return promise.then(null, fn);
            },
            // Keep pipe for back-compat
            pipe: function() {
              var fns = arguments;
              return jQuery.Deferred(function(newDefer) {
                jQuery.each(tuples, function(_i, tuple) {
                  var fn = isFunction(fns[tuple[4]]) && fns[tuple[4]];
                  deferred[tuple[1]](function() {
                    var returned = fn && fn.apply(this, arguments);
                    if (returned && isFunction(returned.promise)) {
                      returned.promise().progress(newDefer.notify).done(newDefer.resolve).fail(newDefer.reject);
                    } else {
                      newDefer[tuple[0] + "With"](
                        this,
                        fn ? [returned] : arguments
                      );
                    }
                  });
                });
                fns = null;
              }).promise();
            },
            then: function(onFulfilled, onRejected, onProgress) {
              var maxDepth = 0;
              function resolve(depth, deferred2, handler, special) {
                return function() {
                  var that = this, args = arguments, mightThrow = function() {
                    var returned, then;
                    if (depth < maxDepth) {
                      return;
                    }
                    returned = handler.apply(that, args);
                    if (returned === deferred2.promise()) {
                      throw new TypeError("Thenable self-resolution");
                    }
                    then = returned && // Support: Promises/A+ section 2.3.4
                    // https://promisesaplus.com/#point-64
                    // Only check objects and functions for thenability
                    (typeof returned === "object" || typeof returned === "function") && returned.then;
                    if (isFunction(then)) {
                      if (special) {
                        then.call(
                          returned,
                          resolve(maxDepth, deferred2, Identity, special),
                          resolve(maxDepth, deferred2, Thrower, special)
                        );
                      } else {
                        maxDepth++;
                        then.call(
                          returned,
                          resolve(maxDepth, deferred2, Identity, special),
                          resolve(maxDepth, deferred2, Thrower, special),
                          resolve(
                            maxDepth,
                            deferred2,
                            Identity,
                            deferred2.notifyWith
                          )
                        );
                      }
                    } else {
                      if (handler !== Identity) {
                        that = void 0;
                        args = [returned];
                      }
                      (special || deferred2.resolveWith)(that, args);
                    }
                  }, process = special ? mightThrow : function() {
                    try {
                      mightThrow();
                    } catch (e) {
                      if (jQuery.Deferred.exceptionHook) {
                        jQuery.Deferred.exceptionHook(
                          e,
                          process.stackTrace
                        );
                      }
                      if (depth + 1 >= maxDepth) {
                        if (handler !== Thrower) {
                          that = void 0;
                          args = [e];
                        }
                        deferred2.rejectWith(that, args);
                      }
                    }
                  };
                  if (depth) {
                    process();
                  } else {
                    if (jQuery.Deferred.getStackHook) {
                      process.stackTrace = jQuery.Deferred.getStackHook();
                    }
                    window2.setTimeout(process);
                  }
                };
              }
              return jQuery.Deferred(function(newDefer) {
                tuples[0][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction(onProgress) ? onProgress : Identity,
                    newDefer.notifyWith
                  )
                );
                tuples[1][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction(onFulfilled) ? onFulfilled : Identity
                  )
                );
                tuples[2][3].add(
                  resolve(
                    0,
                    newDefer,
                    isFunction(onRejected) ? onRejected : Thrower
                  )
                );
              }).promise();
            },
            // Get a promise for this deferred
            // If obj is provided, the promise aspect is added to the object
            promise: function(obj) {
              return obj != null ? jQuery.extend(obj, promise) : promise;
            }
          }, deferred = {};
          jQuery.each(tuples, function(i, tuple) {
            var list = tuple[2], stateString = tuple[5];
            promise[tuple[1]] = list.add;
            if (stateString) {
              list.add(
                function() {
                  state = stateString;
                },
                // rejected_callbacks.disable
                // fulfilled_callbacks.disable
                tuples[3 - i][2].disable,
                // rejected_handlers.disable
                // fulfilled_handlers.disable
                tuples[3 - i][3].disable,
                // progress_callbacks.lock
                tuples[0][2].lock,
                // progress_handlers.lock
                tuples[0][3].lock
              );
            }
            list.add(tuple[3].fire);
            deferred[tuple[0]] = function() {
              deferred[tuple[0] + "With"](this === deferred ? void 0 : this, arguments);
              return this;
            };
            deferred[tuple[0] + "With"] = list.fireWith;
          });
          promise.promise(deferred);
          if (func) {
            func.call(deferred, deferred);
          }
          return deferred;
        },
        // Deferred helper
        when: function(singleValue) {
          var remaining = arguments.length, i = remaining, resolveContexts = Array(i), resolveValues = slice.call(arguments), primary = jQuery.Deferred(), updateFunc = function(i2) {
            return function(value) {
              resolveContexts[i2] = this;
              resolveValues[i2] = arguments.length > 1 ? slice.call(arguments) : value;
              if (!--remaining) {
                primary.resolveWith(resolveContexts, resolveValues);
              }
            };
          };
          if (remaining <= 1) {
            adoptValue(
              singleValue,
              primary.done(updateFunc(i)).resolve,
              primary.reject,
              !remaining
            );
            if (primary.state() === "pending" || isFunction(resolveValues[i] && resolveValues[i].then)) {
              return primary.then();
            }
          }
          while (i--) {
            adoptValue(resolveValues[i], updateFunc(i), primary.reject);
          }
          return primary.promise();
        }
      });
      var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
      jQuery.Deferred.exceptionHook = function(error, stack) {
        if (window2.console && window2.console.warn && error && rerrorNames.test(error.name)) {
          window2.console.warn("jQuery.Deferred exception: " + error.message, error.stack, stack);
        }
      };
      jQuery.readyException = function(error) {
        window2.setTimeout(function() {
          throw error;
        });
      };
      var readyList = jQuery.Deferred();
      jQuery.fn.ready = function(fn) {
        readyList.then(fn).catch(function(error) {
          jQuery.readyException(error);
        });
        return this;
      };
      jQuery.extend({
        // Is the DOM ready to be used? Set to true once it occurs.
        isReady: false,
        // A counter to track how many items to wait for before
        // the ready event fires. See trac-6781
        readyWait: 1,
        // Handle when the DOM is ready
        ready: function(wait) {
          if (wait === true ? --jQuery.readyWait : jQuery.isReady) {
            return;
          }
          jQuery.isReady = true;
          if (wait !== true && --jQuery.readyWait > 0) {
            return;
          }
          readyList.resolveWith(document2, [jQuery]);
        }
      });
      jQuery.ready.then = readyList.then;
      function completed() {
        document2.removeEventListener("DOMContentLoaded", completed);
        window2.removeEventListener("load", completed);
        jQuery.ready();
      }
      if (document2.readyState === "complete" || document2.readyState !== "loading" && !document2.documentElement.doScroll) {
        window2.setTimeout(jQuery.ready);
      } else {
        document2.addEventListener("DOMContentLoaded", completed);
        window2.addEventListener("load", completed);
      }
      var access = function(elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0, len = elems.length, bulk = key == null;
        if (toType(key) === "object") {
          chainable = true;
          for (i in key) {
            access(elems, fn, i, key[i], true, emptyGet, raw);
          }
        } else if (value !== void 0) {
          chainable = true;
          if (!isFunction(value)) {
            raw = true;
          }
          if (bulk) {
            if (raw) {
              fn.call(elems, value);
              fn = null;
            } else {
              bulk = fn;
              fn = function(elem, _key, value2) {
                return bulk.call(jQuery(elem), value2);
              };
            }
          }
          if (fn) {
            for (; i < len; i++) {
              fn(
                elems[i],
                key,
                raw ? value : value.call(elems[i], i, fn(elems[i], key))
              );
            }
          }
        }
        if (chainable) {
          return elems;
        }
        if (bulk) {
          return fn.call(elems);
        }
        return len ? fn(elems[0], key) : emptyGet;
      };
      var rmsPrefix = /^-ms-/, rdashAlpha = /-([a-z])/g;
      function fcamelCase(_all, letter) {
        return letter.toUpperCase();
      }
      function camelCase(string) {
        return string.replace(rmsPrefix, "ms-").replace(rdashAlpha, fcamelCase);
      }
      var acceptData = function(owner) {
        return owner.nodeType === 1 || owner.nodeType === 9 || !+owner.nodeType;
      };
      function Data() {
        this.expando = jQuery.expando + Data.uid++;
      }
      Data.uid = 1;
      Data.prototype = {
        cache: function(owner) {
          var value = owner[this.expando];
          if (!value) {
            value = {};
            if (acceptData(owner)) {
              if (owner.nodeType) {
                owner[this.expando] = value;
              } else {
                Object.defineProperty(owner, this.expando, {
                  value,
                  configurable: true
                });
              }
            }
          }
          return value;
        },
        set: function(owner, data, value) {
          var prop, cache = this.cache(owner);
          if (typeof data === "string") {
            cache[camelCase(data)] = value;
          } else {
            for (prop in data) {
              cache[camelCase(prop)] = data[prop];
            }
          }
          return cache;
        },
        get: function(owner, key) {
          return key === void 0 ? this.cache(owner) : (
            // Always use camelCase key (gh-2257)
            owner[this.expando] && owner[this.expando][camelCase(key)]
          );
        },
        access: function(owner, key, value) {
          if (key === void 0 || key && typeof key === "string" && value === void 0) {
            return this.get(owner, key);
          }
          this.set(owner, key, value);
          return value !== void 0 ? value : key;
        },
        remove: function(owner, key) {
          var i, cache = owner[this.expando];
          if (cache === void 0) {
            return;
          }
          if (key !== void 0) {
            if (Array.isArray(key)) {
              key = key.map(camelCase);
            } else {
              key = camelCase(key);
              key = key in cache ? [key] : key.match(rnothtmlwhite) || [];
            }
            i = key.length;
            while (i--) {
              delete cache[key[i]];
            }
          }
          if (key === void 0 || jQuery.isEmptyObject(cache)) {
            if (owner.nodeType) {
              owner[this.expando] = void 0;
            } else {
              delete owner[this.expando];
            }
          }
        },
        hasData: function(owner) {
          var cache = owner[this.expando];
          return cache !== void 0 && !jQuery.isEmptyObject(cache);
        }
      };
      var dataPriv = new Data();
      var dataUser = new Data();
      var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, rmultiDash = /[A-Z]/g;
      function getData(data) {
        if (data === "true") {
          return true;
        }
        if (data === "false") {
          return false;
        }
        if (data === "null") {
          return null;
        }
        if (data === +data + "") {
          return +data;
        }
        if (rbrace.test(data)) {
          return JSON.parse(data);
        }
        return data;
      }
      function dataAttr(elem, key, data) {
        var name;
        if (data === void 0 && elem.nodeType === 1) {
          name = "data-" + key.replace(rmultiDash, "-$&").toLowerCase();
          data = elem.getAttribute(name);
          if (typeof data === "string") {
            try {
              data = getData(data);
            } catch (e) {
            }
            dataUser.set(elem, key, data);
          } else {
            data = void 0;
          }
        }
        return data;
      }
      jQuery.extend({
        hasData: function(elem) {
          return dataUser.hasData(elem) || dataPriv.hasData(elem);
        },
        data: function(elem, name, data) {
          return dataUser.access(elem, name, data);
        },
        removeData: function(elem, name) {
          dataUser.remove(elem, name);
        },
        // TODO: Now that all calls to _data and _removeData have been replaced
        // with direct calls to dataPriv methods, these can be deprecated.
        _data: function(elem, name, data) {
          return dataPriv.access(elem, name, data);
        },
        _removeData: function(elem, name) {
          dataPriv.remove(elem, name);
        }
      });
      jQuery.fn.extend({
        data: function(key, value) {
          var i, name, data, elem = this[0], attrs = elem && elem.attributes;
          if (key === void 0) {
            if (this.length) {
              data = dataUser.get(elem);
              if (elem.nodeType === 1 && !dataPriv.get(elem, "hasDataAttrs")) {
                i = attrs.length;
                while (i--) {
                  if (attrs[i]) {
                    name = attrs[i].name;
                    if (name.indexOf("data-") === 0) {
                      name = camelCase(name.slice(5));
                      dataAttr(elem, name, data[name]);
                    }
                  }
                }
                dataPriv.set(elem, "hasDataAttrs", true);
              }
            }
            return data;
          }
          if (typeof key === "object") {
            return this.each(function() {
              dataUser.set(this, key);
            });
          }
          return access(this, function(value2) {
            var data2;
            if (elem && value2 === void 0) {
              data2 = dataUser.get(elem, key);
              if (data2 !== void 0) {
                return data2;
              }
              data2 = dataAttr(elem, key);
              if (data2 !== void 0) {
                return data2;
              }
              return;
            }
            this.each(function() {
              dataUser.set(this, key, value2);
            });
          }, null, value, arguments.length > 1, null, true);
        },
        removeData: function(key) {
          return this.each(function() {
            dataUser.remove(this, key);
          });
        }
      });
      jQuery.extend({
        queue: function(elem, type, data) {
          var queue;
          if (elem) {
            type = (type || "fx") + "queue";
            queue = dataPriv.get(elem, type);
            if (data) {
              if (!queue || Array.isArray(data)) {
                queue = dataPriv.access(elem, type, jQuery.makeArray(data));
              } else {
                queue.push(data);
              }
            }
            return queue || [];
          }
        },
        dequeue: function(elem, type) {
          type = type || "fx";
          var queue = jQuery.queue(elem, type), startLength = queue.length, fn = queue.shift(), hooks = jQuery._queueHooks(elem, type), next = function() {
            jQuery.dequeue(elem, type);
          };
          if (fn === "inprogress") {
            fn = queue.shift();
            startLength--;
          }
          if (fn) {
            if (type === "fx") {
              queue.unshift("inprogress");
            }
            delete hooks.stop;
            fn.call(elem, next, hooks);
          }
          if (!startLength && hooks) {
            hooks.empty.fire();
          }
        },
        // Not public - generate a queueHooks object, or return the current one
        _queueHooks: function(elem, type) {
          var key = type + "queueHooks";
          return dataPriv.get(elem, key) || dataPriv.access(elem, key, {
            empty: jQuery.Callbacks("once memory").add(function() {
              dataPriv.remove(elem, [type + "queue", key]);
            })
          });
        }
      });
      jQuery.fn.extend({
        queue: function(type, data) {
          var setter = 2;
          if (typeof type !== "string") {
            data = type;
            type = "fx";
            setter--;
          }
          if (arguments.length < setter) {
            return jQuery.queue(this[0], type);
          }
          return data === void 0 ? this : this.each(function() {
            var queue = jQuery.queue(this, type, data);
            jQuery._queueHooks(this, type);
            if (type === "fx" && queue[0] !== "inprogress") {
              jQuery.dequeue(this, type);
            }
          });
        },
        dequeue: function(type) {
          return this.each(function() {
            jQuery.dequeue(this, type);
          });
        },
        clearQueue: function(type) {
          return this.queue(type || "fx", []);
        },
        // Get a promise resolved when queues of a certain type
        // are emptied (fx is the type by default)
        promise: function(type, obj) {
          var tmp, count = 1, defer = jQuery.Deferred(), elements = this, i = this.length, resolve = function() {
            if (!--count) {
              defer.resolveWith(elements, [elements]);
            }
          };
          if (typeof type !== "string") {
            obj = type;
            type = void 0;
          }
          type = type || "fx";
          while (i--) {
            tmp = dataPriv.get(elements[i], type + "queueHooks");
            if (tmp && tmp.empty) {
              count++;
              tmp.empty.add(resolve);
            }
          }
          resolve();
          return defer.promise(obj);
        }
      });
      var pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source;
      var rcssNum = new RegExp("^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i");
      var cssExpand = ["Top", "Right", "Bottom", "Left"];
      var documentElement = document2.documentElement;
      var isAttached = function(elem) {
        return jQuery.contains(elem.ownerDocument, elem);
      }, composed = { composed: true };
      if (documentElement.getRootNode) {
        isAttached = function(elem) {
          return jQuery.contains(elem.ownerDocument, elem) || elem.getRootNode(composed) === elem.ownerDocument;
        };
      }
      var isHiddenWithinTree = function(elem, el) {
        elem = el || elem;
        return elem.style.display === "none" || elem.style.display === "" && // Otherwise, check computed style
        // Support: Firefox <=43 - 45
        // Disconnected elements can have computed display: none, so first confirm that elem is
        // in the document.
        isAttached(elem) && jQuery.css(elem, "display") === "none";
      };
      function adjustCSS(elem, prop, valueParts, tween) {
        var adjusted, scale, maxIterations = 20, currentValue = tween ? function() {
          return tween.cur();
        } : function() {
          return jQuery.css(elem, prop, "");
        }, initial = currentValue(), unit = valueParts && valueParts[3] || (jQuery.cssNumber[prop] ? "" : "px"), initialInUnit = elem.nodeType && (jQuery.cssNumber[prop] || unit !== "px" && +initial) && rcssNum.exec(jQuery.css(elem, prop));
        if (initialInUnit && initialInUnit[3] !== unit) {
          initial = initial / 2;
          unit = unit || initialInUnit[3];
          initialInUnit = +initial || 1;
          while (maxIterations--) {
            jQuery.style(elem, prop, initialInUnit + unit);
            if ((1 - scale) * (1 - (scale = currentValue() / initial || 0.5)) <= 0) {
              maxIterations = 0;
            }
            initialInUnit = initialInUnit / scale;
          }
          initialInUnit = initialInUnit * 2;
          jQuery.style(elem, prop, initialInUnit + unit);
          valueParts = valueParts || [];
        }
        if (valueParts) {
          initialInUnit = +initialInUnit || +initial || 0;
          adjusted = valueParts[1] ? initialInUnit + (valueParts[1] + 1) * valueParts[2] : +valueParts[2];
          if (tween) {
            tween.unit = unit;
            tween.start = initialInUnit;
            tween.end = adjusted;
          }
        }
        return adjusted;
      }
      var defaultDisplayMap = {};
      function getDefaultDisplay(elem) {
        var temp, doc = elem.ownerDocument, nodeName2 = elem.nodeName, display = defaultDisplayMap[nodeName2];
        if (display) {
          return display;
        }
        temp = doc.body.appendChild(doc.createElement(nodeName2));
        display = jQuery.css(temp, "display");
        temp.parentNode.removeChild(temp);
        if (display === "none") {
          display = "block";
        }
        defaultDisplayMap[nodeName2] = display;
        return display;
      }
      function showHide(elements, show) {
        var display, elem, values = [], index = 0, length = elements.length;
        for (; index < length; index++) {
          elem = elements[index];
          if (!elem.style) {
            continue;
          }
          display = elem.style.display;
          if (show) {
            if (display === "none") {
              values[index] = dataPriv.get(elem, "display") || null;
              if (!values[index]) {
                elem.style.display = "";
              }
            }
            if (elem.style.display === "" && isHiddenWithinTree(elem)) {
              values[index] = getDefaultDisplay(elem);
            }
          } else {
            if (display !== "none") {
              values[index] = "none";
              dataPriv.set(elem, "display", display);
            }
          }
        }
        for (index = 0; index < length; index++) {
          if (values[index] != null) {
            elements[index].style.display = values[index];
          }
        }
        return elements;
      }
      jQuery.fn.extend({
        show: function() {
          return showHide(this, true);
        },
        hide: function() {
          return showHide(this);
        },
        toggle: function(state) {
          if (typeof state === "boolean") {
            return state ? this.show() : this.hide();
          }
          return this.each(function() {
            if (isHiddenWithinTree(this)) {
              jQuery(this).show();
            } else {
              jQuery(this).hide();
            }
          });
        }
      });
      var rcheckableType = /^(?:checkbox|radio)$/i;
      var rtagName = /<([a-z][^\/\0>\x20\t\r\n\f]*)/i;
      var rscriptType = /^$|^module$|\/(?:java|ecma)script/i;
      (function() {
        var fragment = document2.createDocumentFragment(), div = fragment.appendChild(document2.createElement("div")), input = document2.createElement("input");
        input.setAttribute("type", "radio");
        input.setAttribute("checked", "checked");
        input.setAttribute("name", "t");
        div.appendChild(input);
        support.checkClone = div.cloneNode(true).cloneNode(true).lastChild.checked;
        div.innerHTML = "<textarea>x</textarea>";
        support.noCloneChecked = !!div.cloneNode(true).lastChild.defaultValue;
        div.innerHTML = "<option></option>";
        support.option = !!div.lastChild;
      })();
      var wrapMap = {
        // XHTML parsers do not magically insert elements in the
        // same way that tag soup parsers do. So we cannot shorten
        // this by omitting <tbody> or other required elements.
        thead: [1, "<table>", "</table>"],
        col: [2, "<table><colgroup>", "</colgroup></table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: [0, "", ""]
      };
      wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
      wrapMap.th = wrapMap.td;
      if (!support.option) {
        wrapMap.optgroup = wrapMap.option = [1, "<select multiple='multiple'>", "</select>"];
      }
      function getAll(context, tag) {
        var ret;
        if (typeof context.getElementsByTagName !== "undefined") {
          ret = context.getElementsByTagName(tag || "*");
        } else if (typeof context.querySelectorAll !== "undefined") {
          ret = context.querySelectorAll(tag || "*");
        } else {
          ret = [];
        }
        if (tag === void 0 || tag && nodeName(context, tag)) {
          return jQuery.merge([context], ret);
        }
        return ret;
      }
      function setGlobalEval(elems, refElements) {
        var i = 0, l = elems.length;
        for (; i < l; i++) {
          dataPriv.set(
            elems[i],
            "globalEval",
            !refElements || dataPriv.get(refElements[i], "globalEval")
          );
        }
      }
      var rhtml = /<|&#?\w+;/;
      function buildFragment(elems, context, scripts, selection, ignored) {
        var elem, tmp, tag, wrap, attached, j, fragment = context.createDocumentFragment(), nodes = [], i = 0, l = elems.length;
        for (; i < l; i++) {
          elem = elems[i];
          if (elem || elem === 0) {
            if (toType(elem) === "object") {
              jQuery.merge(nodes, elem.nodeType ? [elem] : elem);
            } else if (!rhtml.test(elem)) {
              nodes.push(context.createTextNode(elem));
            } else {
              tmp = tmp || fragment.appendChild(context.createElement("div"));
              tag = (rtagName.exec(elem) || ["", ""])[1].toLowerCase();
              wrap = wrapMap[tag] || wrapMap._default;
              tmp.innerHTML = wrap[1] + jQuery.htmlPrefilter(elem) + wrap[2];
              j = wrap[0];
              while (j--) {
                tmp = tmp.lastChild;
              }
              jQuery.merge(nodes, tmp.childNodes);
              tmp = fragment.firstChild;
              tmp.textContent = "";
            }
          }
        }
        fragment.textContent = "";
        i = 0;
        while (elem = nodes[i++]) {
          if (selection && jQuery.inArray(elem, selection) > -1) {
            if (ignored) {
              ignored.push(elem);
            }
            continue;
          }
          attached = isAttached(elem);
          tmp = getAll(fragment.appendChild(elem), "script");
          if (attached) {
            setGlobalEval(tmp);
          }
          if (scripts) {
            j = 0;
            while (elem = tmp[j++]) {
              if (rscriptType.test(elem.type || "")) {
                scripts.push(elem);
              }
            }
          }
        }
        return fragment;
      }
      var rtypenamespace = /^([^.]*)(?:\.(.+)|)/;
      function returnTrue() {
        return true;
      }
      function returnFalse() {
        return false;
      }
      function expectSync(elem, type) {
        return elem === safeActiveElement() === (type === "focus");
      }
      function safeActiveElement() {
        try {
          return document2.activeElement;
        } catch (err) {
        }
      }
      function on(elem, types, selector, data, fn, one) {
        var origFn, type;
        if (typeof types === "object") {
          if (typeof selector !== "string") {
            data = data || selector;
            selector = void 0;
          }
          for (type in types) {
            on(elem, type, selector, data, types[type], one);
          }
          return elem;
        }
        if (data == null && fn == null) {
          fn = selector;
          data = selector = void 0;
        } else if (fn == null) {
          if (typeof selector === "string") {
            fn = data;
            data = void 0;
          } else {
            fn = data;
            data = selector;
            selector = void 0;
          }
        }
        if (fn === false) {
          fn = returnFalse;
        } else if (!fn) {
          return elem;
        }
        if (one === 1) {
          origFn = fn;
          fn = function(event) {
            jQuery().off(event);
            return origFn.apply(this, arguments);
          };
          fn.guid = origFn.guid || (origFn.guid = jQuery.guid++);
        }
        return elem.each(function() {
          jQuery.event.add(this, types, fn, data, selector);
        });
      }
      jQuery.event = {
        global: {},
        add: function(elem, types, handler, data, selector) {
          var handleObjIn, eventHandle, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.get(elem);
          if (!acceptData(elem)) {
            return;
          }
          if (handler.handler) {
            handleObjIn = handler;
            handler = handleObjIn.handler;
            selector = handleObjIn.selector;
          }
          if (selector) {
            jQuery.find.matchesSelector(documentElement, selector);
          }
          if (!handler.guid) {
            handler.guid = jQuery.guid++;
          }
          if (!(events = elemData.events)) {
            events = elemData.events = /* @__PURE__ */ Object.create(null);
          }
          if (!(eventHandle = elemData.handle)) {
            eventHandle = elemData.handle = function(e) {
              return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ? jQuery.event.dispatch.apply(elem, arguments) : void 0;
            };
          }
          types = (types || "").match(rnothtmlwhite) || [""];
          t = types.length;
          while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();
            if (!type) {
              continue;
            }
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            special = jQuery.event.special[type] || {};
            handleObj = jQuery.extend({
              type,
              origType,
              data,
              handler,
              guid: handler.guid,
              selector,
              needsContext: selector && jQuery.expr.match.needsContext.test(selector),
              namespace: namespaces.join(".")
            }, handleObjIn);
            if (!(handlers = events[type])) {
              handlers = events[type] = [];
              handlers.delegateCount = 0;
              if (!special.setup || special.setup.call(elem, data, namespaces, eventHandle) === false) {
                if (elem.addEventListener) {
                  elem.addEventListener(type, eventHandle);
                }
              }
            }
            if (special.add) {
              special.add.call(elem, handleObj);
              if (!handleObj.handler.guid) {
                handleObj.handler.guid = handler.guid;
              }
            }
            if (selector) {
              handlers.splice(handlers.delegateCount++, 0, handleObj);
            } else {
              handlers.push(handleObj);
            }
            jQuery.event.global[type] = true;
          }
        },
        // Detach an event or set of events from an element
        remove: function(elem, types, handler, selector, mappedTypes) {
          var j, origCount, tmp, events, t, handleObj, special, handlers, type, namespaces, origType, elemData = dataPriv.hasData(elem) && dataPriv.get(elem);
          if (!elemData || !(events = elemData.events)) {
            return;
          }
          types = (types || "").match(rnothtmlwhite) || [""];
          t = types.length;
          while (t--) {
            tmp = rtypenamespace.exec(types[t]) || [];
            type = origType = tmp[1];
            namespaces = (tmp[2] || "").split(".").sort();
            if (!type) {
              for (type in events) {
                jQuery.event.remove(elem, type + types[t], handler, selector, true);
              }
              continue;
            }
            special = jQuery.event.special[type] || {};
            type = (selector ? special.delegateType : special.bindType) || type;
            handlers = events[type] || [];
            tmp = tmp[2] && new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)");
            origCount = j = handlers.length;
            while (j--) {
              handleObj = handlers[j];
              if ((mappedTypes || origType === handleObj.origType) && (!handler || handler.guid === handleObj.guid) && (!tmp || tmp.test(handleObj.namespace)) && (!selector || selector === handleObj.selector || selector === "**" && handleObj.selector)) {
                handlers.splice(j, 1);
                if (handleObj.selector) {
                  handlers.delegateCount--;
                }
                if (special.remove) {
                  special.remove.call(elem, handleObj);
                }
              }
            }
            if (origCount && !handlers.length) {
              if (!special.teardown || special.teardown.call(elem, namespaces, elemData.handle) === false) {
                jQuery.removeEvent(elem, type, elemData.handle);
              }
              delete events[type];
            }
          }
          if (jQuery.isEmptyObject(events)) {
            dataPriv.remove(elem, "handle events");
          }
        },
        dispatch: function(nativeEvent) {
          var i, j, ret, matched, handleObj, handlerQueue, args = new Array(arguments.length), event = jQuery.event.fix(nativeEvent), handlers = (dataPriv.get(this, "events") || /* @__PURE__ */ Object.create(null))[event.type] || [], special = jQuery.event.special[event.type] || {};
          args[0] = event;
          for (i = 1; i < arguments.length; i++) {
            args[i] = arguments[i];
          }
          event.delegateTarget = this;
          if (special.preDispatch && special.preDispatch.call(this, event) === false) {
            return;
          }
          handlerQueue = jQuery.event.handlers.call(this, event, handlers);
          i = 0;
          while ((matched = handlerQueue[i++]) && !event.isPropagationStopped()) {
            event.currentTarget = matched.elem;
            j = 0;
            while ((handleObj = matched.handlers[j++]) && !event.isImmediatePropagationStopped()) {
              if (!event.rnamespace || handleObj.namespace === false || event.rnamespace.test(handleObj.namespace)) {
                event.handleObj = handleObj;
                event.data = handleObj.data;
                ret = ((jQuery.event.special[handleObj.origType] || {}).handle || handleObj.handler).apply(matched.elem, args);
                if (ret !== void 0) {
                  if ((event.result = ret) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                  }
                }
              }
            }
          }
          if (special.postDispatch) {
            special.postDispatch.call(this, event);
          }
          return event.result;
        },
        handlers: function(event, handlers) {
          var i, handleObj, sel, matchedHandlers, matchedSelectors, handlerQueue = [], delegateCount = handlers.delegateCount, cur = event.target;
          if (delegateCount && // Support: IE <=9
          // Black-hole SVG <use> instance trees (trac-13180)
          cur.nodeType && // Support: Firefox <=42
          // Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
          // https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
          // Support: IE 11 only
          // ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
          !(event.type === "click" && event.button >= 1)) {
            for (; cur !== this; cur = cur.parentNode || this) {
              if (cur.nodeType === 1 && !(event.type === "click" && cur.disabled === true)) {
                matchedHandlers = [];
                matchedSelectors = {};
                for (i = 0; i < delegateCount; i++) {
                  handleObj = handlers[i];
                  sel = handleObj.selector + " ";
                  if (matchedSelectors[sel] === void 0) {
                    matchedSelectors[sel] = handleObj.needsContext ? jQuery(sel, this).index(cur) > -1 : jQuery.find(sel, this, null, [cur]).length;
                  }
                  if (matchedSelectors[sel]) {
                    matchedHandlers.push(handleObj);
                  }
                }
                if (matchedHandlers.length) {
                  handlerQueue.push({ elem: cur, handlers: matchedHandlers });
                }
              }
            }
          }
          cur = this;
          if (delegateCount < handlers.length) {
            handlerQueue.push({ elem: cur, handlers: handlers.slice(delegateCount) });
          }
          return handlerQueue;
        },
        addProp: function(name, hook) {
          Object.defineProperty(jQuery.Event.prototype, name, {
            enumerable: true,
            configurable: true,
            get: isFunction(hook) ? function() {
              if (this.originalEvent) {
                return hook(this.originalEvent);
              }
            } : function() {
              if (this.originalEvent) {
                return this.originalEvent[name];
              }
            },
            set: function(value) {
              Object.defineProperty(this, name, {
                enumerable: true,
                configurable: true,
                writable: true,
                value
              });
            }
          });
        },
        fix: function(originalEvent) {
          return originalEvent[jQuery.expando] ? originalEvent : new jQuery.Event(originalEvent);
        },
        special: {
          load: {
            // Prevent triggered image.load events from bubbling to window.load
            noBubble: true
          },
          click: {
            // Utilize native event to ensure correct state for checkable inputs
            setup: function(data) {
              var el = this || data;
              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click", returnTrue);
              }
              return false;
            },
            trigger: function(data) {
              var el = this || data;
              if (rcheckableType.test(el.type) && el.click && nodeName(el, "input")) {
                leverageNative(el, "click");
              }
              return true;
            },
            // For cross-browser consistency, suppress native .click() on links
            // Also prevent it if we're currently inside a leveraged native-event stack
            _default: function(event) {
              var target = event.target;
              return rcheckableType.test(target.type) && target.click && nodeName(target, "input") && dataPriv.get(target, "click") || nodeName(target, "a");
            }
          },
          beforeunload: {
            postDispatch: function(event) {
              if (event.result !== void 0 && event.originalEvent) {
                event.originalEvent.returnValue = event.result;
              }
            }
          }
        }
      };
      function leverageNative(el, type, expectSync2) {
        if (!expectSync2) {
          if (dataPriv.get(el, type) === void 0) {
            jQuery.event.add(el, type, returnTrue);
          }
          return;
        }
        dataPriv.set(el, type, false);
        jQuery.event.add(el, type, {
          namespace: false,
          handler: function(event) {
            var notAsync, result, saved = dataPriv.get(this, type);
            if (event.isTrigger & 1 && this[type]) {
              if (!saved.length) {
                saved = slice.call(arguments);
                dataPriv.set(this, type, saved);
                notAsync = expectSync2(this, type);
                this[type]();
                result = dataPriv.get(this, type);
                if (saved !== result || notAsync) {
                  dataPriv.set(this, type, false);
                } else {
                  result = {};
                }
                if (saved !== result) {
                  event.stopImmediatePropagation();
                  event.preventDefault();
                  return result && result.value;
                }
              } else if ((jQuery.event.special[type] || {}).delegateType) {
                event.stopPropagation();
              }
            } else if (saved.length) {
              dataPriv.set(this, type, {
                value: jQuery.event.trigger(
                  // Support: IE <=9 - 11+
                  // Extend with the prototype to reset the above stopImmediatePropagation()
                  jQuery.extend(saved[0], jQuery.Event.prototype),
                  saved.slice(1),
                  this
                )
              });
              event.stopImmediatePropagation();
            }
          }
        });
      }
      jQuery.removeEvent = function(elem, type, handle) {
        if (elem.removeEventListener) {
          elem.removeEventListener(type, handle);
        }
      };
      jQuery.Event = function(src2, props) {
        if (!(this instanceof jQuery.Event)) {
          return new jQuery.Event(src2, props);
        }
        if (src2 && src2.type) {
          this.originalEvent = src2;
          this.type = src2.type;
          this.isDefaultPrevented = src2.defaultPrevented || src2.defaultPrevented === void 0 && // Support: Android <=2.3 only
          src2.returnValue === false ? returnTrue : returnFalse;
          this.target = src2.target && src2.target.nodeType === 3 ? src2.target.parentNode : src2.target;
          this.currentTarget = src2.currentTarget;
          this.relatedTarget = src2.relatedTarget;
        } else {
          this.type = src2;
        }
        if (props) {
          jQuery.extend(this, props);
        }
        this.timeStamp = src2 && src2.timeStamp || Date.now();
        this[jQuery.expando] = true;
      };
      jQuery.Event.prototype = {
        constructor: jQuery.Event,
        isDefaultPrevented: returnFalse,
        isPropagationStopped: returnFalse,
        isImmediatePropagationStopped: returnFalse,
        isSimulated: false,
        preventDefault: function() {
          var e = this.originalEvent;
          this.isDefaultPrevented = returnTrue;
          if (e && !this.isSimulated) {
            e.preventDefault();
          }
        },
        stopPropagation: function() {
          var e = this.originalEvent;
          this.isPropagationStopped = returnTrue;
          if (e && !this.isSimulated) {
            e.stopPropagation();
          }
        },
        stopImmediatePropagation: function() {
          var e = this.originalEvent;
          this.isImmediatePropagationStopped = returnTrue;
          if (e && !this.isSimulated) {
            e.stopImmediatePropagation();
          }
          this.stopPropagation();
        }
      };
      jQuery.each({
        altKey: true,
        bubbles: true,
        cancelable: true,
        changedTouches: true,
        ctrlKey: true,
        detail: true,
        eventPhase: true,
        metaKey: true,
        pageX: true,
        pageY: true,
        shiftKey: true,
        view: true,
        "char": true,
        code: true,
        charCode: true,
        key: true,
        keyCode: true,
        button: true,
        buttons: true,
        clientX: true,
        clientY: true,
        offsetX: true,
        offsetY: true,
        pointerId: true,
        pointerType: true,
        screenX: true,
        screenY: true,
        targetTouches: true,
        toElement: true,
        touches: true,
        which: true
      }, jQuery.event.addProp);
      jQuery.each({ focus: "focusin", blur: "focusout" }, function(type, delegateType) {
        jQuery.event.special[type] = {
          // Utilize native event if possible so blur/focus sequence is correct
          setup: function() {
            leverageNative(this, type, expectSync);
            return false;
          },
          trigger: function() {
            leverageNative(this, type);
            return true;
          },
          // Suppress native focus or blur if we're currently inside
          // a leveraged native-event stack
          _default: function(event) {
            return dataPriv.get(event.target, type);
          },
          delegateType
        };
      });
      jQuery.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
      }, function(orig, fix) {
        jQuery.event.special[orig] = {
          delegateType: fix,
          bindType: fix,
          handle: function(event) {
            var ret, target = this, related = event.relatedTarget, handleObj = event.handleObj;
            if (!related || related !== target && !jQuery.contains(target, related)) {
              event.type = handleObj.origType;
              ret = handleObj.handler.apply(this, arguments);
              event.type = fix;
            }
            return ret;
          }
        };
      });
      jQuery.fn.extend({
        on: function(types, selector, data, fn) {
          return on(this, types, selector, data, fn);
        },
        one: function(types, selector, data, fn) {
          return on(this, types, selector, data, fn, 1);
        },
        off: function(types, selector, fn) {
          var handleObj, type;
          if (types && types.preventDefault && types.handleObj) {
            handleObj = types.handleObj;
            jQuery(types.delegateTarget).off(
              handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
              handleObj.selector,
              handleObj.handler
            );
            return this;
          }
          if (typeof types === "object") {
            for (type in types) {
              this.off(type, selector, types[type]);
            }
            return this;
          }
          if (selector === false || typeof selector === "function") {
            fn = selector;
            selector = void 0;
          }
          if (fn === false) {
            fn = returnFalse;
          }
          return this.each(function() {
            jQuery.event.remove(this, types, fn, selector);
          });
        }
      });
      var rnoInnerhtml = /<script|<style|<link/i, rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i, rcleanScript = /^\s*<!\[CDATA\[|\]\]>\s*$/g;
      function manipulationTarget(elem, content) {
        if (nodeName(elem, "table") && nodeName(content.nodeType !== 11 ? content : content.firstChild, "tr")) {
          return jQuery(elem).children("tbody")[0] || elem;
        }
        return elem;
      }
      function disableScript(elem) {
        elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
        return elem;
      }
      function restoreScript(elem) {
        if ((elem.type || "").slice(0, 5) === "true/") {
          elem.type = elem.type.slice(5);
        } else {
          elem.removeAttribute("type");
        }
        return elem;
      }
      function cloneCopyEvent(src2, dest) {
        var i, l, type, pdataOld, udataOld, udataCur, events;
        if (dest.nodeType !== 1) {
          return;
        }
        if (dataPriv.hasData(src2)) {
          pdataOld = dataPriv.get(src2);
          events = pdataOld.events;
          if (events) {
            dataPriv.remove(dest, "handle events");
            for (type in events) {
              for (i = 0, l = events[type].length; i < l; i++) {
                jQuery.event.add(dest, type, events[type][i]);
              }
            }
          }
        }
        if (dataUser.hasData(src2)) {
          udataOld = dataUser.access(src2);
          udataCur = jQuery.extend({}, udataOld);
          dataUser.set(dest, udataCur);
        }
      }
      function fixInput(src2, dest) {
        var nodeName2 = dest.nodeName.toLowerCase();
        if (nodeName2 === "input" && rcheckableType.test(src2.type)) {
          dest.checked = src2.checked;
        } else if (nodeName2 === "input" || nodeName2 === "textarea") {
          dest.defaultValue = src2.defaultValue;
        }
      }
      function domManip(collection, args, callback, ignored) {
        args = flat(args);
        var fragment, first, scripts, hasScripts, node, doc, i = 0, l = collection.length, iNoClone = l - 1, value = args[0], valueIsFunction = isFunction(value);
        if (valueIsFunction || l > 1 && typeof value === "string" && !support.checkClone && rchecked.test(value)) {
          return collection.each(function(index) {
            var self2 = collection.eq(index);
            if (valueIsFunction) {
              args[0] = value.call(this, index, self2.html());
            }
            domManip(self2, args, callback, ignored);
          });
        }
        if (l) {
          fragment = buildFragment(args, collection[0].ownerDocument, false, collection, ignored);
          first = fragment.firstChild;
          if (fragment.childNodes.length === 1) {
            fragment = first;
          }
          if (first || ignored) {
            scripts = jQuery.map(getAll(fragment, "script"), disableScript);
            hasScripts = scripts.length;
            for (; i < l; i++) {
              node = fragment;
              if (i !== iNoClone) {
                node = jQuery.clone(node, true, true);
                if (hasScripts) {
                  jQuery.merge(scripts, getAll(node, "script"));
                }
              }
              callback.call(collection[i], node, i);
            }
            if (hasScripts) {
              doc = scripts[scripts.length - 1].ownerDocument;
              jQuery.map(scripts, restoreScript);
              for (i = 0; i < hasScripts; i++) {
                node = scripts[i];
                if (rscriptType.test(node.type || "") && !dataPriv.access(node, "globalEval") && jQuery.contains(doc, node)) {
                  if (node.src && (node.type || "").toLowerCase() !== "module") {
                    if (jQuery._evalUrl && !node.noModule) {
                      jQuery._evalUrl(node.src, {
                        nonce: node.nonce || node.getAttribute("nonce")
                      }, doc);
                    }
                  } else {
                    DOMEval(node.textContent.replace(rcleanScript, ""), node, doc);
                  }
                }
              }
            }
          }
        }
        return collection;
      }
      function remove(elem, selector, keepData) {
        var node, nodes = selector ? jQuery.filter(selector, elem) : elem, i = 0;
        for (; (node = nodes[i]) != null; i++) {
          if (!keepData && node.nodeType === 1) {
            jQuery.cleanData(getAll(node));
          }
          if (node.parentNode) {
            if (keepData && isAttached(node)) {
              setGlobalEval(getAll(node, "script"));
            }
            node.parentNode.removeChild(node);
          }
        }
        return elem;
      }
      jQuery.extend({
        htmlPrefilter: function(html) {
          return html;
        },
        clone: function(elem, dataAndEvents, deepDataAndEvents) {
          var i, l, srcElements, destElements, clone = elem.cloneNode(true), inPage = isAttached(elem);
          if (!support.noCloneChecked && (elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem)) {
            destElements = getAll(clone);
            srcElements = getAll(elem);
            for (i = 0, l = srcElements.length; i < l; i++) {
              fixInput(srcElements[i], destElements[i]);
            }
          }
          if (dataAndEvents) {
            if (deepDataAndEvents) {
              srcElements = srcElements || getAll(elem);
              destElements = destElements || getAll(clone);
              for (i = 0, l = srcElements.length; i < l; i++) {
                cloneCopyEvent(srcElements[i], destElements[i]);
              }
            } else {
              cloneCopyEvent(elem, clone);
            }
          }
          destElements = getAll(clone, "script");
          if (destElements.length > 0) {
            setGlobalEval(destElements, !inPage && getAll(elem, "script"));
          }
          return clone;
        },
        cleanData: function(elems) {
          var data, elem, type, special = jQuery.event.special, i = 0;
          for (; (elem = elems[i]) !== void 0; i++) {
            if (acceptData(elem)) {
              if (data = elem[dataPriv.expando]) {
                if (data.events) {
                  for (type in data.events) {
                    if (special[type]) {
                      jQuery.event.remove(elem, type);
                    } else {
                      jQuery.removeEvent(elem, type, data.handle);
                    }
                  }
                }
                elem[dataPriv.expando] = void 0;
              }
              if (elem[dataUser.expando]) {
                elem[dataUser.expando] = void 0;
              }
            }
          }
        }
      });
      jQuery.fn.extend({
        detach: function(selector) {
          return remove(this, selector, true);
        },
        remove: function(selector) {
          return remove(this, selector);
        },
        text: function(value) {
          return access(this, function(value2) {
            return value2 === void 0 ? jQuery.text(this) : this.empty().each(function() {
              if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
                this.textContent = value2;
              }
            });
          }, null, value, arguments.length);
        },
        append: function() {
          return domManip(this, arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.appendChild(elem);
            }
          });
        },
        prepend: function() {
          return domManip(this, arguments, function(elem) {
            if (this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9) {
              var target = manipulationTarget(this, elem);
              target.insertBefore(elem, target.firstChild);
            }
          });
        },
        before: function() {
          return domManip(this, arguments, function(elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this);
            }
          });
        },
        after: function() {
          return domManip(this, arguments, function(elem) {
            if (this.parentNode) {
              this.parentNode.insertBefore(elem, this.nextSibling);
            }
          });
        },
        empty: function() {
          var elem, i = 0;
          for (; (elem = this[i]) != null; i++) {
            if (elem.nodeType === 1) {
              jQuery.cleanData(getAll(elem, false));
              elem.textContent = "";
            }
          }
          return this;
        },
        clone: function(dataAndEvents, deepDataAndEvents) {
          dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
          deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;
          return this.map(function() {
            return jQuery.clone(this, dataAndEvents, deepDataAndEvents);
          });
        },
        html: function(value) {
          return access(this, function(value2) {
            var elem = this[0] || {}, i = 0, l = this.length;
            if (value2 === void 0 && elem.nodeType === 1) {
              return elem.innerHTML;
            }
            if (typeof value2 === "string" && !rnoInnerhtml.test(value2) && !wrapMap[(rtagName.exec(value2) || ["", ""])[1].toLowerCase()]) {
              value2 = jQuery.htmlPrefilter(value2);
              try {
                for (; i < l; i++) {
                  elem = this[i] || {};
                  if (elem.nodeType === 1) {
                    jQuery.cleanData(getAll(elem, false));
                    elem.innerHTML = value2;
                  }
                }
                elem = 0;
              } catch (e) {
              }
            }
            if (elem) {
              this.empty().append(value2);
            }
          }, null, value, arguments.length);
        },
        replaceWith: function() {
          var ignored = [];
          return domManip(this, arguments, function(elem) {
            var parent = this.parentNode;
            if (jQuery.inArray(this, ignored) < 0) {
              jQuery.cleanData(getAll(this));
              if (parent) {
                parent.replaceChild(elem, this);
              }
            }
          }, ignored);
        }
      });
      jQuery.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
      }, function(name, original) {
        jQuery.fn[name] = function(selector) {
          var elems, ret = [], insert = jQuery(selector), last = insert.length - 1, i = 0;
          for (; i <= last; i++) {
            elems = i === last ? this : this.clone(true);
            jQuery(insert[i])[original](elems);
            push.apply(ret, elems.get());
          }
          return this.pushStack(ret);
        };
      });
      var rnumnonpx = new RegExp("^(" + pnum + ")(?!px)[a-z%]+$", "i");
      var rcustomProp = /^--/;
      var getStyles = function(elem) {
        var view = elem.ownerDocument.defaultView;
        if (!view || !view.opener) {
          view = window2;
        }
        return view.getComputedStyle(elem);
      };
      var swap = function(elem, options, callback) {
        var ret, name, old = {};
        for (name in options) {
          old[name] = elem.style[name];
          elem.style[name] = options[name];
        }
        ret = callback.call(elem);
        for (name in options) {
          elem.style[name] = old[name];
        }
        return ret;
      };
      var rboxStyle = new RegExp(cssExpand.join("|"), "i");
      var whitespace = "[\\x20\\t\\r\\n\\f]";
      var rtrimCSS = new RegExp(
        "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$",
        "g"
      );
      (function() {
        function computeStyleTests() {
          if (!div) {
            return;
          }
          container.style.cssText = "position:absolute;left:-11111px;width:60px;margin-top:1px;padding:0;border:0";
          div.style.cssText = "position:relative;display:block;box-sizing:border-box;overflow:scroll;margin:auto;border:1px;padding:1px;width:60%;top:1%";
          documentElement.appendChild(container).appendChild(div);
          var divStyle = window2.getComputedStyle(div);
          pixelPositionVal = divStyle.top !== "1%";
          reliableMarginLeftVal = roundPixelMeasures(divStyle.marginLeft) === 12;
          div.style.right = "60%";
          pixelBoxStylesVal = roundPixelMeasures(divStyle.right) === 36;
          boxSizingReliableVal = roundPixelMeasures(divStyle.width) === 36;
          div.style.position = "absolute";
          scrollboxSizeVal = roundPixelMeasures(div.offsetWidth / 3) === 12;
          documentElement.removeChild(container);
          div = null;
        }
        function roundPixelMeasures(measure) {
          return Math.round(parseFloat(measure));
        }
        var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal, reliableTrDimensionsVal, reliableMarginLeftVal, container = document2.createElement("div"), div = document2.createElement("div");
        if (!div.style) {
          return;
        }
        div.style.backgroundClip = "content-box";
        div.cloneNode(true).style.backgroundClip = "";
        support.clearCloneStyle = div.style.backgroundClip === "content-box";
        jQuery.extend(support, {
          boxSizingReliable: function() {
            computeStyleTests();
            return boxSizingReliableVal;
          },
          pixelBoxStyles: function() {
            computeStyleTests();
            return pixelBoxStylesVal;
          },
          pixelPosition: function() {
            computeStyleTests();
            return pixelPositionVal;
          },
          reliableMarginLeft: function() {
            computeStyleTests();
            return reliableMarginLeftVal;
          },
          scrollboxSize: function() {
            computeStyleTests();
            return scrollboxSizeVal;
          },
          // Support: IE 9 - 11+, Edge 15 - 18+
          // IE/Edge misreport `getComputedStyle` of table rows with width/height
          // set in CSS while `offset*` properties report correct values.
          // Behavior in IE 9 is more subtle than in newer versions & it passes
          // some versions of this test; make sure not to make it pass there!
          //
          // Support: Firefox 70+
          // Only Firefox includes border widths
          // in computed dimensions. (gh-4529)
          reliableTrDimensions: function() {
            var table, tr, trChild, trStyle;
            if (reliableTrDimensionsVal == null) {
              table = document2.createElement("table");
              tr = document2.createElement("tr");
              trChild = document2.createElement("div");
              table.style.cssText = "position:absolute;left:-11111px;border-collapse:separate";
              tr.style.cssText = "border:1px solid";
              tr.style.height = "1px";
              trChild.style.height = "9px";
              trChild.style.display = "block";
              documentElement.appendChild(table).appendChild(tr).appendChild(trChild);
              trStyle = window2.getComputedStyle(tr);
              reliableTrDimensionsVal = parseInt(trStyle.height, 10) + parseInt(trStyle.borderTopWidth, 10) + parseInt(trStyle.borderBottomWidth, 10) === tr.offsetHeight;
              documentElement.removeChild(table);
            }
            return reliableTrDimensionsVal;
          }
        });
      })();
      function curCSS(elem, name, computed) {
        var width, minWidth, maxWidth, ret, isCustomProp = rcustomProp.test(name), style = elem.style;
        computed = computed || getStyles(elem);
        if (computed) {
          ret = computed.getPropertyValue(name) || computed[name];
          if (isCustomProp && ret) {
            ret = ret.replace(rtrimCSS, "$1") || void 0;
          }
          if (ret === "" && !isAttached(elem)) {
            ret = jQuery.style(elem, name);
          }
          if (!support.pixelBoxStyles() && rnumnonpx.test(ret) && rboxStyle.test(name)) {
            width = style.width;
            minWidth = style.minWidth;
            maxWidth = style.maxWidth;
            style.minWidth = style.maxWidth = style.width = ret;
            ret = computed.width;
            style.width = width;
            style.minWidth = minWidth;
            style.maxWidth = maxWidth;
          }
        }
        return ret !== void 0 ? (
          // Support: IE <=9 - 11 only
          // IE returns zIndex value as an integer.
          ret + ""
        ) : ret;
      }
      function addGetHookIf(conditionFn, hookFn) {
        return {
          get: function() {
            if (conditionFn()) {
              delete this.get;
              return;
            }
            return (this.get = hookFn).apply(this, arguments);
          }
        };
      }
      var cssPrefixes = ["Webkit", "Moz", "ms"], emptyStyle = document2.createElement("div").style, vendorProps = {};
      function vendorPropName(name) {
        var capName = name[0].toUpperCase() + name.slice(1), i = cssPrefixes.length;
        while (i--) {
          name = cssPrefixes[i] + capName;
          if (name in emptyStyle) {
            return name;
          }
        }
      }
      function finalPropName(name) {
        var final = jQuery.cssProps[name] || vendorProps[name];
        if (final) {
          return final;
        }
        if (name in emptyStyle) {
          return name;
        }
        return vendorProps[name] = vendorPropName(name) || name;
      }
      var rdisplayswap = /^(none|table(?!-c[ea]).+)/, cssShow = { position: "absolute", visibility: "hidden", display: "block" }, cssNormalTransform = {
        letterSpacing: "0",
        fontWeight: "400"
      };
      function setPositiveNumber(_elem, value, subtract) {
        var matches = rcssNum.exec(value);
        return matches ? (
          // Guard against undefined "subtract", e.g., when used as in cssHooks
          Math.max(0, matches[2] - (subtract || 0)) + (matches[3] || "px")
        ) : value;
      }
      function boxModelAdjustment(elem, dimension, box, isBorderBox, styles2, computedVal) {
        var i = dimension === "width" ? 1 : 0, extra2 = 0, delta = 0;
        if (box === (isBorderBox ? "border" : "content")) {
          return 0;
        }
        for (; i < 4; i += 2) {
          if (box === "margin") {
            delta += jQuery.css(elem, box + cssExpand[i], true, styles2);
          }
          if (!isBorderBox) {
            delta += jQuery.css(elem, "padding" + cssExpand[i], true, styles2);
            if (box !== "padding") {
              delta += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles2);
            } else {
              extra2 += jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles2);
            }
          } else {
            if (box === "content") {
              delta -= jQuery.css(elem, "padding" + cssExpand[i], true, styles2);
            }
            if (box !== "margin") {
              delta -= jQuery.css(elem, "border" + cssExpand[i] + "Width", true, styles2);
            }
          }
        }
        if (!isBorderBox && computedVal >= 0) {
          delta += Math.max(0, Math.ceil(
            elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - computedVal - delta - extra2 - 0.5
            // If offsetWidth/offsetHeight is unknown, then we can't determine content-box scroll gutter
            // Use an explicit zero to avoid NaN (gh-3964)
          )) || 0;
        }
        return delta;
      }
      function getWidthOrHeight(elem, dimension, extra2) {
        var styles2 = getStyles(elem), boxSizingNeeded = !support.boxSizingReliable() || extra2, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles2) === "border-box", valueIsBorderBox = isBorderBox, val = curCSS(elem, dimension, styles2), offsetProp = "offset" + dimension[0].toUpperCase() + dimension.slice(1);
        if (rnumnonpx.test(val)) {
          if (!extra2) {
            return val;
          }
          val = "auto";
        }
        if ((!support.boxSizingReliable() && isBorderBox || // Support: IE 10 - 11+, Edge 15 - 18+
        // IE/Edge misreport `getComputedStyle` of table rows with width/height
        // set in CSS while `offset*` properties report correct values.
        // Interestingly, in some cases IE 9 doesn't suffer from this issue.
        !support.reliableTrDimensions() && nodeName(elem, "tr") || // Fall back to offsetWidth/offsetHeight when value is "auto"
        // This happens for inline elements with no explicit setting (gh-3571)
        val === "auto" || // Support: Android <=4.1 - 4.3 only
        // Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
        !parseFloat(val) && jQuery.css(elem, "display", false, styles2) === "inline") && // Make sure the element is visible & connected
        elem.getClientRects().length) {
          isBorderBox = jQuery.css(elem, "boxSizing", false, styles2) === "border-box";
          valueIsBorderBox = offsetProp in elem;
          if (valueIsBorderBox) {
            val = elem[offsetProp];
          }
        }
        val = parseFloat(val) || 0;
        return val + boxModelAdjustment(
          elem,
          dimension,
          extra2 || (isBorderBox ? "border" : "content"),
          valueIsBorderBox,
          styles2,
          // Provide the current computed size to request scroll gutter calculation (gh-3589)
          val
        ) + "px";
      }
      jQuery.extend({
        // Add in style property hooks for overriding the default
        // behavior of getting and setting a style property
        cssHooks: {
          opacity: {
            get: function(elem, computed) {
              if (computed) {
                var ret = curCSS(elem, "opacity");
                return ret === "" ? "1" : ret;
              }
            }
          }
        },
        // Don't automatically add "px" to these possibly-unitless properties
        cssNumber: {
          "animationIterationCount": true,
          "columnCount": true,
          "fillOpacity": true,
          "flexGrow": true,
          "flexShrink": true,
          "fontWeight": true,
          "gridArea": true,
          "gridColumn": true,
          "gridColumnEnd": true,
          "gridColumnStart": true,
          "gridRow": true,
          "gridRowEnd": true,
          "gridRowStart": true,
          "lineHeight": true,
          "opacity": true,
          "order": true,
          "orphans": true,
          "widows": true,
          "zIndex": true,
          "zoom": true
        },
        // Add in properties whose names you wish to fix before
        // setting or getting the value
        cssProps: {},
        // Get and set the style property on a DOM Node
        style: function(elem, name, value, extra2) {
          if (!elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style) {
            return;
          }
          var ret, type, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name), style = elem.style;
          if (!isCustomProp) {
            name = finalPropName(origName);
          }
          hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
          if (value !== void 0) {
            type = typeof value;
            if (type === "string" && (ret = rcssNum.exec(value)) && ret[1]) {
              value = adjustCSS(elem, name, ret);
              type = "number";
            }
            if (value == null || value !== value) {
              return;
            }
            if (type === "number" && !isCustomProp) {
              value += ret && ret[3] || (jQuery.cssNumber[origName] ? "" : "px");
            }
            if (!support.clearCloneStyle && value === "" && name.indexOf("background") === 0) {
              style[name] = "inherit";
            }
            if (!hooks || !("set" in hooks) || (value = hooks.set(elem, value, extra2)) !== void 0) {
              if (isCustomProp) {
                style.setProperty(name, value);
              } else {
                style[name] = value;
              }
            }
          } else {
            if (hooks && "get" in hooks && (ret = hooks.get(elem, false, extra2)) !== void 0) {
              return ret;
            }
            return style[name];
          }
        },
        css: function(elem, name, extra2, styles2) {
          var val, num, hooks, origName = camelCase(name), isCustomProp = rcustomProp.test(name);
          if (!isCustomProp) {
            name = finalPropName(origName);
          }
          hooks = jQuery.cssHooks[name] || jQuery.cssHooks[origName];
          if (hooks && "get" in hooks) {
            val = hooks.get(elem, true, extra2);
          }
          if (val === void 0) {
            val = curCSS(elem, name, styles2);
          }
          if (val === "normal" && name in cssNormalTransform) {
            val = cssNormalTransform[name];
          }
          if (extra2 === "" || extra2) {
            num = parseFloat(val);
            return extra2 === true || isFinite(num) ? num || 0 : val;
          }
          return val;
        }
      });
      jQuery.each(["height", "width"], function(_i, dimension) {
        jQuery.cssHooks[dimension] = {
          get: function(elem, computed, extra2) {
            if (computed) {
              return rdisplayswap.test(jQuery.css(elem, "display")) && // Support: Safari 8+
              // Table columns in Safari have non-zero offsetWidth & zero
              // getBoundingClientRect().width unless display is changed.
              // Support: IE <=11 only
              // Running getBoundingClientRect on a disconnected node
              // in IE throws an error.
              (!elem.getClientRects().length || !elem.getBoundingClientRect().width) ? swap(elem, cssShow, function() {
                return getWidthOrHeight(elem, dimension, extra2);
              }) : getWidthOrHeight(elem, dimension, extra2);
            }
          },
          set: function(elem, value, extra2) {
            var matches, styles2 = getStyles(elem), scrollboxSizeBuggy = !support.scrollboxSize() && styles2.position === "absolute", boxSizingNeeded = scrollboxSizeBuggy || extra2, isBorderBox = boxSizingNeeded && jQuery.css(elem, "boxSizing", false, styles2) === "border-box", subtract = extra2 ? boxModelAdjustment(
              elem,
              dimension,
              extra2,
              isBorderBox,
              styles2
            ) : 0;
            if (isBorderBox && scrollboxSizeBuggy) {
              subtract -= Math.ceil(
                elem["offset" + dimension[0].toUpperCase() + dimension.slice(1)] - parseFloat(styles2[dimension]) - boxModelAdjustment(elem, dimension, "border", false, styles2) - 0.5
              );
            }
            if (subtract && (matches = rcssNum.exec(value)) && (matches[3] || "px") !== "px") {
              elem.style[dimension] = value;
              value = jQuery.css(elem, dimension);
            }
            return setPositiveNumber(elem, value, subtract);
          }
        };
      });
      jQuery.cssHooks.marginLeft = addGetHookIf(
        support.reliableMarginLeft,
        function(elem, computed) {
          if (computed) {
            return (parseFloat(curCSS(elem, "marginLeft")) || elem.getBoundingClientRect().left - swap(elem, { marginLeft: 0 }, function() {
              return elem.getBoundingClientRect().left;
            })) + "px";
          }
        }
      );
      jQuery.each({
        margin: "",
        padding: "",
        border: "Width"
      }, function(prefix, suffix) {
        jQuery.cssHooks[prefix + suffix] = {
          expand: function(value) {
            var i = 0, expanded = {}, parts = typeof value === "string" ? value.split(" ") : [value];
            for (; i < 4; i++) {
              expanded[prefix + cssExpand[i] + suffix] = parts[i] || parts[i - 2] || parts[0];
            }
            return expanded;
          }
        };
        if (prefix !== "margin") {
          jQuery.cssHooks[prefix + suffix].set = setPositiveNumber;
        }
      });
      jQuery.fn.extend({
        css: function(name, value) {
          return access(this, function(elem, name2, value2) {
            var styles2, len, map = {}, i = 0;
            if (Array.isArray(name2)) {
              styles2 = getStyles(elem);
              len = name2.length;
              for (; i < len; i++) {
                map[name2[i]] = jQuery.css(elem, name2[i], false, styles2);
              }
              return map;
            }
            return value2 !== void 0 ? jQuery.style(elem, name2, value2) : jQuery.css(elem, name2);
          }, name, value, arguments.length > 1);
        }
      });
      function Tween(elem, options, prop, end, easing) {
        return new Tween.prototype.init(elem, options, prop, end, easing);
      }
      jQuery.Tween = Tween;
      Tween.prototype = {
        constructor: Tween,
        init: function(elem, options, prop, end, easing, unit) {
          this.elem = elem;
          this.prop = prop;
          this.easing = easing || jQuery.easing._default;
          this.options = options;
          this.start = this.now = this.cur();
          this.end = end;
          this.unit = unit || (jQuery.cssNumber[prop] ? "" : "px");
        },
        cur: function() {
          var hooks = Tween.propHooks[this.prop];
          return hooks && hooks.get ? hooks.get(this) : Tween.propHooks._default.get(this);
        },
        run: function(percent) {
          var eased, hooks = Tween.propHooks[this.prop];
          if (this.options.duration) {
            this.pos = eased = jQuery.easing[this.easing](
              percent,
              this.options.duration * percent,
              0,
              1,
              this.options.duration
            );
          } else {
            this.pos = eased = percent;
          }
          this.now = (this.end - this.start) * eased + this.start;
          if (this.options.step) {
            this.options.step.call(this.elem, this.now, this);
          }
          if (hooks && hooks.set) {
            hooks.set(this);
          } else {
            Tween.propHooks._default.set(this);
          }
          return this;
        }
      };
      Tween.prototype.init.prototype = Tween.prototype;
      Tween.propHooks = {
        _default: {
          get: function(tween) {
            var result;
            if (tween.elem.nodeType !== 1 || tween.elem[tween.prop] != null && tween.elem.style[tween.prop] == null) {
              return tween.elem[tween.prop];
            }
            result = jQuery.css(tween.elem, tween.prop, "");
            return !result || result === "auto" ? 0 : result;
          },
          set: function(tween) {
            if (jQuery.fx.step[tween.prop]) {
              jQuery.fx.step[tween.prop](tween);
            } else if (tween.elem.nodeType === 1 && (jQuery.cssHooks[tween.prop] || tween.elem.style[finalPropName(tween.prop)] != null)) {
              jQuery.style(tween.elem, tween.prop, tween.now + tween.unit);
            } else {
              tween.elem[tween.prop] = tween.now;
            }
          }
        }
      };
      Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
        set: function(tween) {
          if (tween.elem.nodeType && tween.elem.parentNode) {
            tween.elem[tween.prop] = tween.now;
          }
        }
      };
      jQuery.easing = {
        linear: function(p) {
          return p;
        },
        swing: function(p) {
          return 0.5 - Math.cos(p * Math.PI) / 2;
        },
        _default: "swing"
      };
      jQuery.fx = Tween.prototype.init;
      jQuery.fx.step = {};
      var fxNow, inProgress, rfxtypes = /^(?:toggle|show|hide)$/, rrun = /queueHooks$/;
      function schedule() {
        if (inProgress) {
          if (document2.hidden === false && window2.requestAnimationFrame) {
            window2.requestAnimationFrame(schedule);
          } else {
            window2.setTimeout(schedule, jQuery.fx.interval);
          }
          jQuery.fx.tick();
        }
      }
      function createFxNow() {
        window2.setTimeout(function() {
          fxNow = void 0;
        });
        return fxNow = Date.now();
      }
      function genFx(type, includeWidth) {
        var which, i = 0, attrs = { height: type };
        includeWidth = includeWidth ? 1 : 0;
        for (; i < 4; i += 2 - includeWidth) {
          which = cssExpand[i];
          attrs["margin" + which] = attrs["padding" + which] = type;
        }
        if (includeWidth) {
          attrs.opacity = attrs.width = type;
        }
        return attrs;
      }
      function createTween(value, prop, animation) {
        var tween, collection = (Animation.tweeners[prop] || []).concat(Animation.tweeners["*"]), index = 0, length = collection.length;
        for (; index < length; index++) {
          if (tween = collection[index].call(animation, prop, value)) {
            return tween;
          }
        }
      }
      function defaultPrefilter(elem, props, opts) {
        var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display, isBox = "width" in props || "height" in props, anim = this, orig = {}, style = elem.style, hidden = elem.nodeType && isHiddenWithinTree(elem), dataShow = dataPriv.get(elem, "fxshow");
        if (!opts.queue) {
          hooks = jQuery._queueHooks(elem, "fx");
          if (hooks.unqueued == null) {
            hooks.unqueued = 0;
            oldfire = hooks.empty.fire;
            hooks.empty.fire = function() {
              if (!hooks.unqueued) {
                oldfire();
              }
            };
          }
          hooks.unqueued++;
          anim.always(function() {
            anim.always(function() {
              hooks.unqueued--;
              if (!jQuery.queue(elem, "fx").length) {
                hooks.empty.fire();
              }
            });
          });
        }
        for (prop in props) {
          value = props[prop];
          if (rfxtypes.test(value)) {
            delete props[prop];
            toggle = toggle || value === "toggle";
            if (value === (hidden ? "hide" : "show")) {
              if (value === "show" && dataShow && dataShow[prop] !== void 0) {
                hidden = true;
              } else {
                continue;
              }
            }
            orig[prop] = dataShow && dataShow[prop] || jQuery.style(elem, prop);
          }
        }
        propTween = !jQuery.isEmptyObject(props);
        if (!propTween && jQuery.isEmptyObject(orig)) {
          return;
        }
        if (isBox && elem.nodeType === 1) {
          opts.overflow = [style.overflow, style.overflowX, style.overflowY];
          restoreDisplay = dataShow && dataShow.display;
          if (restoreDisplay == null) {
            restoreDisplay = dataPriv.get(elem, "display");
          }
          display = jQuery.css(elem, "display");
          if (display === "none") {
            if (restoreDisplay) {
              display = restoreDisplay;
            } else {
              showHide([elem], true);
              restoreDisplay = elem.style.display || restoreDisplay;
              display = jQuery.css(elem, "display");
              showHide([elem]);
            }
          }
          if (display === "inline" || display === "inline-block" && restoreDisplay != null) {
            if (jQuery.css(elem, "float") === "none") {
              if (!propTween) {
                anim.done(function() {
                  style.display = restoreDisplay;
                });
                if (restoreDisplay == null) {
                  display = style.display;
                  restoreDisplay = display === "none" ? "" : display;
                }
              }
              style.display = "inline-block";
            }
          }
        }
        if (opts.overflow) {
          style.overflow = "hidden";
          anim.always(function() {
            style.overflow = opts.overflow[0];
            style.overflowX = opts.overflow[1];
            style.overflowY = opts.overflow[2];
          });
        }
        propTween = false;
        for (prop in orig) {
          if (!propTween) {
            if (dataShow) {
              if ("hidden" in dataShow) {
                hidden = dataShow.hidden;
              }
            } else {
              dataShow = dataPriv.access(elem, "fxshow", { display: restoreDisplay });
            }
            if (toggle) {
              dataShow.hidden = !hidden;
            }
            if (hidden) {
              showHide([elem], true);
            }
            anim.done(function() {
              if (!hidden) {
                showHide([elem]);
              }
              dataPriv.remove(elem, "fxshow");
              for (prop in orig) {
                jQuery.style(elem, prop, orig[prop]);
              }
            });
          }
          propTween = createTween(hidden ? dataShow[prop] : 0, prop, anim);
          if (!(prop in dataShow)) {
            dataShow[prop] = propTween.start;
            if (hidden) {
              propTween.end = propTween.start;
              propTween.start = 0;
            }
          }
        }
      }
      function propFilter(props, specialEasing) {
        var index, name, easing, value, hooks;
        for (index in props) {
          name = camelCase(index);
          easing = specialEasing[name];
          value = props[index];
          if (Array.isArray(value)) {
            easing = value[1];
            value = props[index] = value[0];
          }
          if (index !== name) {
            props[name] = value;
            delete props[index];
          }
          hooks = jQuery.cssHooks[name];
          if (hooks && "expand" in hooks) {
            value = hooks.expand(value);
            delete props[name];
            for (index in value) {
              if (!(index in props)) {
                props[index] = value[index];
                specialEasing[index] = easing;
              }
            }
          } else {
            specialEasing[name] = easing;
          }
        }
      }
      function Animation(elem, properties, options) {
        var result, stopped, index = 0, length = Animation.prefilters.length, deferred = jQuery.Deferred().always(function() {
          delete tick.elem;
        }), tick = function() {
          if (stopped) {
            return false;
          }
          var currentTime = fxNow || createFxNow(), remaining = Math.max(0, animation.startTime + animation.duration - currentTime), temp = remaining / animation.duration || 0, percent = 1 - temp, index2 = 0, length2 = animation.tweens.length;
          for (; index2 < length2; index2++) {
            animation.tweens[index2].run(percent);
          }
          deferred.notifyWith(elem, [animation, percent, remaining]);
          if (percent < 1 && length2) {
            return remaining;
          }
          if (!length2) {
            deferred.notifyWith(elem, [animation, 1, 0]);
          }
          deferred.resolveWith(elem, [animation]);
          return false;
        }, animation = deferred.promise({
          elem,
          props: jQuery.extend({}, properties),
          opts: jQuery.extend(true, {
            specialEasing: {},
            easing: jQuery.easing._default
          }, options),
          originalProperties: properties,
          originalOptions: options,
          startTime: fxNow || createFxNow(),
          duration: options.duration,
          tweens: [],
          createTween: function(prop, end) {
            var tween = jQuery.Tween(
              elem,
              animation.opts,
              prop,
              end,
              animation.opts.specialEasing[prop] || animation.opts.easing
            );
            animation.tweens.push(tween);
            return tween;
          },
          stop: function(gotoEnd) {
            var index2 = 0, length2 = gotoEnd ? animation.tweens.length : 0;
            if (stopped) {
              return this;
            }
            stopped = true;
            for (; index2 < length2; index2++) {
              animation.tweens[index2].run(1);
            }
            if (gotoEnd) {
              deferred.notifyWith(elem, [animation, 1, 0]);
              deferred.resolveWith(elem, [animation, gotoEnd]);
            } else {
              deferred.rejectWith(elem, [animation, gotoEnd]);
            }
            return this;
          }
        }), props = animation.props;
        propFilter(props, animation.opts.specialEasing);
        for (; index < length; index++) {
          result = Animation.prefilters[index].call(animation, elem, props, animation.opts);
          if (result) {
            if (isFunction(result.stop)) {
              jQuery._queueHooks(animation.elem, animation.opts.queue).stop = result.stop.bind(result);
            }
            return result;
          }
        }
        jQuery.map(props, createTween, animation);
        if (isFunction(animation.opts.start)) {
          animation.opts.start.call(elem, animation);
        }
        animation.progress(animation.opts.progress).done(animation.opts.done, animation.opts.complete).fail(animation.opts.fail).always(animation.opts.always);
        jQuery.fx.timer(
          jQuery.extend(tick, {
            elem,
            anim: animation,
            queue: animation.opts.queue
          })
        );
        return animation;
      }
      jQuery.Animation = jQuery.extend(Animation, {
        tweeners: {
          "*": [function(prop, value) {
            var tween = this.createTween(prop, value);
            adjustCSS(tween.elem, prop, rcssNum.exec(value), tween);
            return tween;
          }]
        },
        tweener: function(props, callback) {
          if (isFunction(props)) {
            callback = props;
            props = ["*"];
          } else {
            props = props.match(rnothtmlwhite);
          }
          var prop, index = 0, length = props.length;
          for (; index < length; index++) {
            prop = props[index];
            Animation.tweeners[prop] = Animation.tweeners[prop] || [];
            Animation.tweeners[prop].unshift(callback);
          }
        },
        prefilters: [defaultPrefilter],
        prefilter: function(callback, prepend) {
          if (prepend) {
            Animation.prefilters.unshift(callback);
          } else {
            Animation.prefilters.push(callback);
          }
        }
      });
      jQuery.speed = function(speed, easing, fn) {
        var opt = speed && typeof speed === "object" ? jQuery.extend({}, speed) : {
          complete: fn || !fn && easing || isFunction(speed) && speed,
          duration: speed,
          easing: fn && easing || easing && !isFunction(easing) && easing
        };
        if (jQuery.fx.off) {
          opt.duration = 0;
        } else {
          if (typeof opt.duration !== "number") {
            if (opt.duration in jQuery.fx.speeds) {
              opt.duration = jQuery.fx.speeds[opt.duration];
            } else {
              opt.duration = jQuery.fx.speeds._default;
            }
          }
        }
        if (opt.queue == null || opt.queue === true) {
          opt.queue = "fx";
        }
        opt.old = opt.complete;
        opt.complete = function() {
          if (isFunction(opt.old)) {
            opt.old.call(this);
          }
          if (opt.queue) {
            jQuery.dequeue(this, opt.queue);
          }
        };
        return opt;
      };
      jQuery.fn.extend({
        fadeTo: function(speed, to, easing, callback) {
          return this.filter(isHiddenWithinTree).css("opacity", 0).show().end().animate({ opacity: to }, speed, easing, callback);
        },
        animate: function(prop, speed, easing, callback) {
          var empty = jQuery.isEmptyObject(prop), optall = jQuery.speed(speed, easing, callback), doAnimation = function() {
            var anim = Animation(this, jQuery.extend({}, prop), optall);
            if (empty || dataPriv.get(this, "finish")) {
              anim.stop(true);
            }
          };
          doAnimation.finish = doAnimation;
          return empty || optall.queue === false ? this.each(doAnimation) : this.queue(optall.queue, doAnimation);
        },
        stop: function(type, clearQueue, gotoEnd) {
          var stopQueue = function(hooks) {
            var stop = hooks.stop;
            delete hooks.stop;
            stop(gotoEnd);
          };
          if (typeof type !== "string") {
            gotoEnd = clearQueue;
            clearQueue = type;
            type = void 0;
          }
          if (clearQueue) {
            this.queue(type || "fx", []);
          }
          return this.each(function() {
            var dequeue = true, index = type != null && type + "queueHooks", timers = jQuery.timers, data = dataPriv.get(this);
            if (index) {
              if (data[index] && data[index].stop) {
                stopQueue(data[index]);
              }
            } else {
              for (index in data) {
                if (data[index] && data[index].stop && rrun.test(index)) {
                  stopQueue(data[index]);
                }
              }
            }
            for (index = timers.length; index--; ) {
              if (timers[index].elem === this && (type == null || timers[index].queue === type)) {
                timers[index].anim.stop(gotoEnd);
                dequeue = false;
                timers.splice(index, 1);
              }
            }
            if (dequeue || !gotoEnd) {
              jQuery.dequeue(this, type);
            }
          });
        },
        finish: function(type) {
          if (type !== false) {
            type = type || "fx";
          }
          return this.each(function() {
            var index, data = dataPriv.get(this), queue = data[type + "queue"], hooks = data[type + "queueHooks"], timers = jQuery.timers, length = queue ? queue.length : 0;
            data.finish = true;
            jQuery.queue(this, type, []);
            if (hooks && hooks.stop) {
              hooks.stop.call(this, true);
            }
            for (index = timers.length; index--; ) {
              if (timers[index].elem === this && timers[index].queue === type) {
                timers[index].anim.stop(true);
                timers.splice(index, 1);
              }
            }
            for (index = 0; index < length; index++) {
              if (queue[index] && queue[index].finish) {
                queue[index].finish.call(this);
              }
            }
            delete data.finish;
          });
        }
      });
      jQuery.each(["toggle", "show", "hide"], function(_i, name) {
        var cssFn = jQuery.fn[name];
        jQuery.fn[name] = function(speed, easing, callback) {
          return speed == null || typeof speed === "boolean" ? cssFn.apply(this, arguments) : this.animate(genFx(name, true), speed, easing, callback);
        };
      });
      jQuery.each({
        slideDown: genFx("show"),
        slideUp: genFx("hide"),
        slideToggle: genFx("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" }
      }, function(name, props) {
        jQuery.fn[name] = function(speed, easing, callback) {
          return this.animate(props, speed, easing, callback);
        };
      });
      jQuery.timers = [];
      jQuery.fx.tick = function() {
        var timer, i = 0, timers = jQuery.timers;
        fxNow = Date.now();
        for (; i < timers.length; i++) {
          timer = timers[i];
          if (!timer() && timers[i] === timer) {
            timers.splice(i--, 1);
          }
        }
        if (!timers.length) {
          jQuery.fx.stop();
        }
        fxNow = void 0;
      };
      jQuery.fx.timer = function(timer) {
        jQuery.timers.push(timer);
        jQuery.fx.start();
      };
      jQuery.fx.interval = 13;
      jQuery.fx.start = function() {
        if (inProgress) {
          return;
        }
        inProgress = true;
        schedule();
      };
      jQuery.fx.stop = function() {
        inProgress = null;
      };
      jQuery.fx.speeds = {
        slow: 600,
        fast: 200,
        // Default speed
        _default: 400
      };
      jQuery.fn.delay = function(time, type) {
        time = jQuery.fx ? jQuery.fx.speeds[time] || time : time;
        type = type || "fx";
        return this.queue(type, function(next, hooks) {
          var timeout = window2.setTimeout(next, time);
          hooks.stop = function() {
            window2.clearTimeout(timeout);
          };
        });
      };
      (function() {
        var input = document2.createElement("input"), select = document2.createElement("select"), opt = select.appendChild(document2.createElement("option"));
        input.type = "checkbox";
        support.checkOn = input.value !== "";
        support.optSelected = opt.selected;
        input = document2.createElement("input");
        input.value = "t";
        input.type = "radio";
        support.radioValue = input.value === "t";
      })();
      var boolHook, attrHandle = jQuery.expr.attrHandle;
      jQuery.fn.extend({
        attr: function(name, value) {
          return access(this, jQuery.attr, name, value, arguments.length > 1);
        },
        removeAttr: function(name) {
          return this.each(function() {
            jQuery.removeAttr(this, name);
          });
        }
      });
      jQuery.extend({
        attr: function(elem, name, value) {
          var ret, hooks, nType = elem.nodeType;
          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (typeof elem.getAttribute === "undefined") {
            return jQuery.prop(elem, name, value);
          }
          if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
            hooks = jQuery.attrHooks[name.toLowerCase()] || (jQuery.expr.match.bool.test(name) ? boolHook : void 0);
          }
          if (value !== void 0) {
            if (value === null) {
              jQuery.removeAttr(elem, name);
              return;
            }
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
              return ret;
            }
            elem.setAttribute(name, value + "");
            return value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          ret = jQuery.find.attr(elem, name);
          return ret == null ? void 0 : ret;
        },
        attrHooks: {
          type: {
            set: function(elem, value) {
              if (!support.radioValue && value === "radio" && nodeName(elem, "input")) {
                var val = elem.value;
                elem.setAttribute("type", value);
                if (val) {
                  elem.value = val;
                }
                return value;
              }
            }
          }
        },
        removeAttr: function(elem, value) {
          var name, i = 0, attrNames = value && value.match(rnothtmlwhite);
          if (attrNames && elem.nodeType === 1) {
            while (name = attrNames[i++]) {
              elem.removeAttribute(name);
            }
          }
        }
      });
      boolHook = {
        set: function(elem, value, name) {
          if (value === false) {
            jQuery.removeAttr(elem, name);
          } else {
            elem.setAttribute(name, name);
          }
          return name;
        }
      };
      jQuery.each(jQuery.expr.match.bool.source.match(/\w+/g), function(_i, name) {
        var getter = attrHandle[name] || jQuery.find.attr;
        attrHandle[name] = function(elem, name2, isXML) {
          var ret, handle, lowercaseName = name2.toLowerCase();
          if (!isXML) {
            handle = attrHandle[lowercaseName];
            attrHandle[lowercaseName] = ret;
            ret = getter(elem, name2, isXML) != null ? lowercaseName : null;
            attrHandle[lowercaseName] = handle;
          }
          return ret;
        };
      });
      var rfocusable = /^(?:input|select|textarea|button)$/i, rclickable = /^(?:a|area)$/i;
      jQuery.fn.extend({
        prop: function(name, value) {
          return access(this, jQuery.prop, name, value, arguments.length > 1);
        },
        removeProp: function(name) {
          return this.each(function() {
            delete this[jQuery.propFix[name] || name];
          });
        }
      });
      jQuery.extend({
        prop: function(elem, name, value) {
          var ret, hooks, nType = elem.nodeType;
          if (nType === 3 || nType === 8 || nType === 2) {
            return;
          }
          if (nType !== 1 || !jQuery.isXMLDoc(elem)) {
            name = jQuery.propFix[name] || name;
            hooks = jQuery.propHooks[name];
          }
          if (value !== void 0) {
            if (hooks && "set" in hooks && (ret = hooks.set(elem, value, name)) !== void 0) {
              return ret;
            }
            return elem[name] = value;
          }
          if (hooks && "get" in hooks && (ret = hooks.get(elem, name)) !== null) {
            return ret;
          }
          return elem[name];
        },
        propHooks: {
          tabIndex: {
            get: function(elem) {
              var tabindex = jQuery.find.attr(elem, "tabindex");
              if (tabindex) {
                return parseInt(tabindex, 10);
              }
              if (rfocusable.test(elem.nodeName) || rclickable.test(elem.nodeName) && elem.href) {
                return 0;
              }
              return -1;
            }
          }
        },
        propFix: {
          "for": "htmlFor",
          "class": "className"
        }
      });
      if (!support.optSelected) {
        jQuery.propHooks.selected = {
          get: function(elem) {
            var parent = elem.parentNode;
            if (parent && parent.parentNode) {
              parent.parentNode.selectedIndex;
            }
            return null;
          },
          set: function(elem) {
            var parent = elem.parentNode;
            if (parent) {
              parent.selectedIndex;
              if (parent.parentNode) {
                parent.parentNode.selectedIndex;
              }
            }
          }
        };
      }
      jQuery.each([
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable"
      ], function() {
        jQuery.propFix[this.toLowerCase()] = this;
      });
      function stripAndCollapse(value) {
        var tokens = value.match(rnothtmlwhite) || [];
        return tokens.join(" ");
      }
      function getClass(elem) {
        return elem.getAttribute && elem.getAttribute("class") || "";
      }
      function classesToArray(value) {
        if (Array.isArray(value)) {
          return value;
        }
        if (typeof value === "string") {
          return value.match(rnothtmlwhite) || [];
        }
        return [];
      }
      jQuery.fn.extend({
        addClass: function(value) {
          var classNames, cur, curValue, className, i, finalValue;
          if (isFunction(value)) {
            return this.each(function(j) {
              jQuery(this).addClass(value.call(this, j, getClass(this)));
            });
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function() {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  if (cur.indexOf(" " + className + " ") < 0) {
                    cur += className + " ";
                  }
                }
                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        removeClass: function(value) {
          var classNames, cur, curValue, className, i, finalValue;
          if (isFunction(value)) {
            return this.each(function(j) {
              jQuery(this).removeClass(value.call(this, j, getClass(this)));
            });
          }
          if (!arguments.length) {
            return this.attr("class", "");
          }
          classNames = classesToArray(value);
          if (classNames.length) {
            return this.each(function() {
              curValue = getClass(this);
              cur = this.nodeType === 1 && " " + stripAndCollapse(curValue) + " ";
              if (cur) {
                for (i = 0; i < classNames.length; i++) {
                  className = classNames[i];
                  while (cur.indexOf(" " + className + " ") > -1) {
                    cur = cur.replace(" " + className + " ", " ");
                  }
                }
                finalValue = stripAndCollapse(cur);
                if (curValue !== finalValue) {
                  this.setAttribute("class", finalValue);
                }
              }
            });
          }
          return this;
        },
        toggleClass: function(value, stateVal) {
          var classNames, className, i, self2, type = typeof value, isValidValue = type === "string" || Array.isArray(value);
          if (isFunction(value)) {
            return this.each(function(i2) {
              jQuery(this).toggleClass(
                value.call(this, i2, getClass(this), stateVal),
                stateVal
              );
            });
          }
          if (typeof stateVal === "boolean" && isValidValue) {
            return stateVal ? this.addClass(value) : this.removeClass(value);
          }
          classNames = classesToArray(value);
          return this.each(function() {
            if (isValidValue) {
              self2 = jQuery(this);
              for (i = 0; i < classNames.length; i++) {
                className = classNames[i];
                if (self2.hasClass(className)) {
                  self2.removeClass(className);
                } else {
                  self2.addClass(className);
                }
              }
            } else if (value === void 0 || type === "boolean") {
              className = getClass(this);
              if (className) {
                dataPriv.set(this, "__className__", className);
              }
              if (this.setAttribute) {
                this.setAttribute(
                  "class",
                  className || value === false ? "" : dataPriv.get(this, "__className__") || ""
                );
              }
            }
          });
        },
        hasClass: function(selector) {
          var className, elem, i = 0;
          className = " " + selector + " ";
          while (elem = this[i++]) {
            if (elem.nodeType === 1 && (" " + stripAndCollapse(getClass(elem)) + " ").indexOf(className) > -1) {
              return true;
            }
          }
          return false;
        }
      });
      var rreturn = /\r/g;
      jQuery.fn.extend({
        val: function(value) {
          var hooks, ret, valueIsFunction, elem = this[0];
          if (!arguments.length) {
            if (elem) {
              hooks = jQuery.valHooks[elem.type] || jQuery.valHooks[elem.nodeName.toLowerCase()];
              if (hooks && "get" in hooks && (ret = hooks.get(elem, "value")) !== void 0) {
                return ret;
              }
              ret = elem.value;
              if (typeof ret === "string") {
                return ret.replace(rreturn, "");
              }
              return ret == null ? "" : ret;
            }
            return;
          }
          valueIsFunction = isFunction(value);
          return this.each(function(i) {
            var val;
            if (this.nodeType !== 1) {
              return;
            }
            if (valueIsFunction) {
              val = value.call(this, i, jQuery(this).val());
            } else {
              val = value;
            }
            if (val == null) {
              val = "";
            } else if (typeof val === "number") {
              val += "";
            } else if (Array.isArray(val)) {
              val = jQuery.map(val, function(value2) {
                return value2 == null ? "" : value2 + "";
              });
            }
            hooks = jQuery.valHooks[this.type] || jQuery.valHooks[this.nodeName.toLowerCase()];
            if (!hooks || !("set" in hooks) || hooks.set(this, val, "value") === void 0) {
              this.value = val;
            }
          });
        }
      });
      jQuery.extend({
        valHooks: {
          option: {
            get: function(elem) {
              var val = jQuery.find.attr(elem, "value");
              return val != null ? val : (
                // Support: IE <=10 - 11 only
                // option.text throws exceptions (trac-14686, trac-14858)
                // Strip and collapse whitespace
                // https://html.spec.whatwg.org/#strip-and-collapse-whitespace
                stripAndCollapse(jQuery.text(elem))
              );
            }
          },
          select: {
            get: function(elem) {
              var value, option, i, options = elem.options, index = elem.selectedIndex, one = elem.type === "select-one", values = one ? null : [], max = one ? index + 1 : options.length;
              if (index < 0) {
                i = max;
              } else {
                i = one ? index : 0;
              }
              for (; i < max; i++) {
                option = options[i];
                if ((option.selected || i === index) && // Don't return options that are disabled or in a disabled optgroup
                !option.disabled && (!option.parentNode.disabled || !nodeName(option.parentNode, "optgroup"))) {
                  value = jQuery(option).val();
                  if (one) {
                    return value;
                  }
                  values.push(value);
                }
              }
              return values;
            },
            set: function(elem, value) {
              var optionSet, option, options = elem.options, values = jQuery.makeArray(value), i = options.length;
              while (i--) {
                option = options[i];
                if (option.selected = jQuery.inArray(jQuery.valHooks.option.get(option), values) > -1) {
                  optionSet = true;
                }
              }
              if (!optionSet) {
                elem.selectedIndex = -1;
              }
              return values;
            }
          }
        }
      });
      jQuery.each(["radio", "checkbox"], function() {
        jQuery.valHooks[this] = {
          set: function(elem, value) {
            if (Array.isArray(value)) {
              return elem.checked = jQuery.inArray(jQuery(elem).val(), value) > -1;
            }
          }
        };
        if (!support.checkOn) {
          jQuery.valHooks[this].get = function(elem) {
            return elem.getAttribute("value") === null ? "on" : elem.value;
          };
        }
      });
      support.focusin = "onfocusin" in window2;
      var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/, stopPropagationCallback = function(e) {
        e.stopPropagation();
      };
      jQuery.extend(jQuery.event, {
        trigger: function(event, data, elem, onlyHandlers) {
          var i, cur, tmp, bubbleType, ontype, handle, special, lastElement, eventPath = [elem || document2], type = hasOwn.call(event, "type") ? event.type : event, namespaces = hasOwn.call(event, "namespace") ? event.namespace.split(".") : [];
          cur = lastElement = tmp = elem = elem || document2;
          if (elem.nodeType === 3 || elem.nodeType === 8) {
            return;
          }
          if (rfocusMorph.test(type + jQuery.event.triggered)) {
            return;
          }
          if (type.indexOf(".") > -1) {
            namespaces = type.split(".");
            type = namespaces.shift();
            namespaces.sort();
          }
          ontype = type.indexOf(":") < 0 && "on" + type;
          event = event[jQuery.expando] ? event : new jQuery.Event(type, typeof event === "object" && event);
          event.isTrigger = onlyHandlers ? 2 : 3;
          event.namespace = namespaces.join(".");
          event.rnamespace = event.namespace ? new RegExp("(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)") : null;
          event.result = void 0;
          if (!event.target) {
            event.target = elem;
          }
          data = data == null ? [event] : jQuery.makeArray(data, [event]);
          special = jQuery.event.special[type] || {};
          if (!onlyHandlers && special.trigger && special.trigger.apply(elem, data) === false) {
            return;
          }
          if (!onlyHandlers && !special.noBubble && !isWindow(elem)) {
            bubbleType = special.delegateType || type;
            if (!rfocusMorph.test(bubbleType + type)) {
              cur = cur.parentNode;
            }
            for (; cur; cur = cur.parentNode) {
              eventPath.push(cur);
              tmp = cur;
            }
            if (tmp === (elem.ownerDocument || document2)) {
              eventPath.push(tmp.defaultView || tmp.parentWindow || window2);
            }
          }
          i = 0;
          while ((cur = eventPath[i++]) && !event.isPropagationStopped()) {
            lastElement = cur;
            event.type = i > 1 ? bubbleType : special.bindType || type;
            handle = (dataPriv.get(cur, "events") || /* @__PURE__ */ Object.create(null))[event.type] && dataPriv.get(cur, "handle");
            if (handle) {
              handle.apply(cur, data);
            }
            handle = ontype && cur[ontype];
            if (handle && handle.apply && acceptData(cur)) {
              event.result = handle.apply(cur, data);
              if (event.result === false) {
                event.preventDefault();
              }
            }
          }
          event.type = type;
          if (!onlyHandlers && !event.isDefaultPrevented()) {
            if ((!special._default || special._default.apply(eventPath.pop(), data) === false) && acceptData(elem)) {
              if (ontype && isFunction(elem[type]) && !isWindow(elem)) {
                tmp = elem[ontype];
                if (tmp) {
                  elem[ontype] = null;
                }
                jQuery.event.triggered = type;
                if (event.isPropagationStopped()) {
                  lastElement.addEventListener(type, stopPropagationCallback);
                }
                elem[type]();
                if (event.isPropagationStopped()) {
                  lastElement.removeEventListener(type, stopPropagationCallback);
                }
                jQuery.event.triggered = void 0;
                if (tmp) {
                  elem[ontype] = tmp;
                }
              }
            }
          }
          return event.result;
        },
        // Piggyback on a donor event to simulate a different one
        // Used only for `focus(in | out)` events
        simulate: function(type, elem, event) {
          var e = jQuery.extend(
            new jQuery.Event(),
            event,
            {
              type,
              isSimulated: true
            }
          );
          jQuery.event.trigger(e, null, elem);
        }
      });
      jQuery.fn.extend({
        trigger: function(type, data) {
          return this.each(function() {
            jQuery.event.trigger(type, data, this);
          });
        },
        triggerHandler: function(type, data) {
          var elem = this[0];
          if (elem) {
            return jQuery.event.trigger(type, data, elem, true);
          }
        }
      });
      if (!support.focusin) {
        jQuery.each({ focus: "focusin", blur: "focusout" }, function(orig, fix) {
          var handler = function(event) {
            jQuery.event.simulate(fix, event.target, jQuery.event.fix(event));
          };
          jQuery.event.special[fix] = {
            setup: function() {
              var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix);
              if (!attaches) {
                doc.addEventListener(orig, handler, true);
              }
              dataPriv.access(doc, fix, (attaches || 0) + 1);
            },
            teardown: function() {
              var doc = this.ownerDocument || this.document || this, attaches = dataPriv.access(doc, fix) - 1;
              if (!attaches) {
                doc.removeEventListener(orig, handler, true);
                dataPriv.remove(doc, fix);
              } else {
                dataPriv.access(doc, fix, attaches);
              }
            }
          };
        });
      }
      var location = window2.location;
      var nonce = { guid: Date.now() };
      var rquery = /\?/;
      jQuery.parseXML = function(data) {
        var xml, parserErrorElem;
        if (!data || typeof data !== "string") {
          return null;
        }
        try {
          xml = new window2.DOMParser().parseFromString(data, "text/xml");
        } catch (e) {
        }
        parserErrorElem = xml && xml.getElementsByTagName("parsererror")[0];
        if (!xml || parserErrorElem) {
          jQuery.error("Invalid XML: " + (parserErrorElem ? jQuery.map(parserErrorElem.childNodes, function(el) {
            return el.textContent;
          }).join("\n") : data));
        }
        return xml;
      };
      var rbracket = /\[\]$/, rCRLF = /\r?\n/g, rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i, rsubmittable = /^(?:input|select|textarea|keygen)/i;
      function buildParams(prefix, obj, traditional, add) {
        var name;
        if (Array.isArray(obj)) {
          jQuery.each(obj, function(i, v) {
            if (traditional || rbracket.test(prefix)) {
              add(prefix, v);
            } else {
              buildParams(
                prefix + "[" + (typeof v === "object" && v != null ? i : "") + "]",
                v,
                traditional,
                add
              );
            }
          });
        } else if (!traditional && toType(obj) === "object") {
          for (name in obj) {
            buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
          }
        } else {
          add(prefix, obj);
        }
      }
      jQuery.param = function(a, traditional) {
        var prefix, s = [], add = function(key, valueOrFunction) {
          var value = isFunction(valueOrFunction) ? valueOrFunction() : valueOrFunction;
          s[s.length] = encodeURIComponent(key) + "=" + encodeURIComponent(value == null ? "" : value);
        };
        if (a == null) {
          return "";
        }
        if (Array.isArray(a) || a.jquery && !jQuery.isPlainObject(a)) {
          jQuery.each(a, function() {
            add(this.name, this.value);
          });
        } else {
          for (prefix in a) {
            buildParams(prefix, a[prefix], traditional, add);
          }
        }
        return s.join("&");
      };
      jQuery.fn.extend({
        serialize: function() {
          return jQuery.param(this.serializeArray());
        },
        serializeArray: function() {
          return this.map(function() {
            var elements = jQuery.prop(this, "elements");
            return elements ? jQuery.makeArray(elements) : this;
          }).filter(function() {
            var type = this.type;
            return this.name && !jQuery(this).is(":disabled") && rsubmittable.test(this.nodeName) && !rsubmitterTypes.test(type) && (this.checked || !rcheckableType.test(type));
          }).map(function(_i, elem) {
            var val = jQuery(this).val();
            if (val == null) {
              return null;
            }
            if (Array.isArray(val)) {
              return jQuery.map(val, function(val2) {
                return { name: elem.name, value: val2.replace(rCRLF, "\r\n") };
              });
            }
            return { name: elem.name, value: val.replace(rCRLF, "\r\n") };
          }).get();
        }
      });
      var r20 = /%20/g, rhash = /#.*$/, rantiCache = /([?&])_=[^&]*/, rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg, rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/, rnoContent = /^(?:GET|HEAD)$/, rprotocol = /^\/\//, prefilters = {}, transports = {}, allTypes = "*/".concat("*"), originAnchor = document2.createElement("a");
      originAnchor.href = location.href;
      function addToPrefiltersOrTransports(structure) {
        return function(dataTypeExpression, func) {
          if (typeof dataTypeExpression !== "string") {
            func = dataTypeExpression;
            dataTypeExpression = "*";
          }
          var dataType, i = 0, dataTypes = dataTypeExpression.toLowerCase().match(rnothtmlwhite) || [];
          if (isFunction(func)) {
            while (dataType = dataTypes[i++]) {
              if (dataType[0] === "+") {
                dataType = dataType.slice(1) || "*";
                (structure[dataType] = structure[dataType] || []).unshift(func);
              } else {
                (structure[dataType] = structure[dataType] || []).push(func);
              }
            }
          }
        };
      }
      function inspectPrefiltersOrTransports(structure, options, originalOptions, jqXHR) {
        var inspected = {}, seekingTransport = structure === transports;
        function inspect(dataType) {
          var selected;
          inspected[dataType] = true;
          jQuery.each(structure[dataType] || [], function(_, prefilterOrFactory) {
            var dataTypeOrTransport = prefilterOrFactory(options, originalOptions, jqXHR);
            if (typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[dataTypeOrTransport]) {
              options.dataTypes.unshift(dataTypeOrTransport);
              inspect(dataTypeOrTransport);
              return false;
            } else if (seekingTransport) {
              return !(selected = dataTypeOrTransport);
            }
          });
          return selected;
        }
        return inspect(options.dataTypes[0]) || !inspected["*"] && inspect("*");
      }
      function ajaxExtend(target, src2) {
        var key, deep, flatOptions = jQuery.ajaxSettings.flatOptions || {};
        for (key in src2) {
          if (src2[key] !== void 0) {
            (flatOptions[key] ? target : deep || (deep = {}))[key] = src2[key];
          }
        }
        if (deep) {
          jQuery.extend(true, target, deep);
        }
        return target;
      }
      function ajaxHandleResponses(s, jqXHR, responses) {
        var ct, type, finalDataType, firstDataType, contents = s.contents, dataTypes = s.dataTypes;
        while (dataTypes[0] === "*") {
          dataTypes.shift();
          if (ct === void 0) {
            ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
          }
        }
        if (ct) {
          for (type in contents) {
            if (contents[type] && contents[type].test(ct)) {
              dataTypes.unshift(type);
              break;
            }
          }
        }
        if (dataTypes[0] in responses) {
          finalDataType = dataTypes[0];
        } else {
          for (type in responses) {
            if (!dataTypes[0] || s.converters[type + " " + dataTypes[0]]) {
              finalDataType = type;
              break;
            }
            if (!firstDataType) {
              firstDataType = type;
            }
          }
          finalDataType = finalDataType || firstDataType;
        }
        if (finalDataType) {
          if (finalDataType !== dataTypes[0]) {
            dataTypes.unshift(finalDataType);
          }
          return responses[finalDataType];
        }
      }
      function ajaxConvert(s, response, jqXHR, isSuccess) {
        var conv2, current, conv, tmp, prev, converters = {}, dataTypes = s.dataTypes.slice();
        if (dataTypes[1]) {
          for (conv in s.converters) {
            converters[conv.toLowerCase()] = s.converters[conv];
          }
        }
        current = dataTypes.shift();
        while (current) {
          if (s.responseFields[current]) {
            jqXHR[s.responseFields[current]] = response;
          }
          if (!prev && isSuccess && s.dataFilter) {
            response = s.dataFilter(response, s.dataType);
          }
          prev = current;
          current = dataTypes.shift();
          if (current) {
            if (current === "*") {
              current = prev;
            } else if (prev !== "*" && prev !== current) {
              conv = converters[prev + " " + current] || converters["* " + current];
              if (!conv) {
                for (conv2 in converters) {
                  tmp = conv2.split(" ");
                  if (tmp[1] === current) {
                    conv = converters[prev + " " + tmp[0]] || converters["* " + tmp[0]];
                    if (conv) {
                      if (conv === true) {
                        conv = converters[conv2];
                      } else if (converters[conv2] !== true) {
                        current = tmp[0];
                        dataTypes.unshift(tmp[1]);
                      }
                      break;
                    }
                  }
                }
              }
              if (conv !== true) {
                if (conv && s.throws) {
                  response = conv(response);
                } else {
                  try {
                    response = conv(response);
                  } catch (e) {
                    return {
                      state: "parsererror",
                      error: conv ? e : "No conversion from " + prev + " to " + current
                    };
                  }
                }
              }
            }
          }
        }
        return { state: "success", data: response };
      }
      jQuery.extend({
        // Counter for holding the number of active queries
        active: 0,
        // Last-Modified header cache for next request
        lastModified: {},
        etag: {},
        ajaxSettings: {
          url: location.href,
          type: "GET",
          isLocal: rlocalProtocol.test(location.protocol),
          global: true,
          processData: true,
          async: true,
          contentType: "application/x-www-form-urlencoded; charset=UTF-8",
          /*
          timeout: 0,
          data: null,
          dataType: null,
          username: null,
          password: null,
          cache: null,
          throws: false,
          traditional: false,
          headers: {},
          */
          accepts: {
            "*": allTypes,
            text: "text/plain",
            html: "text/html",
            xml: "application/xml, text/xml",
            json: "application/json, text/javascript"
          },
          contents: {
            xml: /\bxml\b/,
            html: /\bhtml/,
            json: /\bjson\b/
          },
          responseFields: {
            xml: "responseXML",
            text: "responseText",
            json: "responseJSON"
          },
          // Data converters
          // Keys separate source (or catchall "*") and destination types with a single space
          converters: {
            // Convert anything to text
            "* text": String,
            // Text to html (true = no transformation)
            "text html": true,
            // Evaluate text as a json expression
            "text json": JSON.parse,
            // Parse text as xml
            "text xml": jQuery.parseXML
          },
          // For options that shouldn't be deep extended:
          // you can add your own custom options here if
          // and when you create one that shouldn't be
          // deep extended (see ajaxExtend)
          flatOptions: {
            url: true,
            context: true
          }
        },
        // Creates a full fledged settings object into target
        // with both ajaxSettings and settings fields.
        // If target is omitted, writes into ajaxSettings.
        ajaxSetup: function(target, settings) {
          return settings ? (
            // Building a settings object
            ajaxExtend(ajaxExtend(target, jQuery.ajaxSettings), settings)
          ) : (
            // Extending ajaxSettings
            ajaxExtend(jQuery.ajaxSettings, target)
          );
        },
        ajaxPrefilter: addToPrefiltersOrTransports(prefilters),
        ajaxTransport: addToPrefiltersOrTransports(transports),
        // Main method
        ajax: function(url, options) {
          if (typeof url === "object") {
            options = url;
            url = void 0;
          }
          options = options || {};
          var transport, cacheURL, responseHeadersString, responseHeaders, timeoutTimer, urlAnchor, completed2, fireGlobals, i, uncached, s = jQuery.ajaxSetup({}, options), callbackContext = s.context || s, globalEventContext = s.context && (callbackContext.nodeType || callbackContext.jquery) ? jQuery(callbackContext) : jQuery.event, deferred = jQuery.Deferred(), completeDeferred = jQuery.Callbacks("once memory"), statusCode = s.statusCode || {}, requestHeaders = {}, requestHeadersNames = {}, strAbort = "canceled", jqXHR = {
            readyState: 0,
            // Builds headers hashtable if needed
            getResponseHeader: function(key) {
              var match;
              if (completed2) {
                if (!responseHeaders) {
                  responseHeaders = {};
                  while (match = rheaders.exec(responseHeadersString)) {
                    responseHeaders[match[1].toLowerCase() + " "] = (responseHeaders[match[1].toLowerCase() + " "] || []).concat(match[2]);
                  }
                }
                match = responseHeaders[key.toLowerCase() + " "];
              }
              return match == null ? null : match.join(", ");
            },
            // Raw string
            getAllResponseHeaders: function() {
              return completed2 ? responseHeadersString : null;
            },
            // Caches the header
            setRequestHeader: function(name, value) {
              if (completed2 == null) {
                name = requestHeadersNames[name.toLowerCase()] = requestHeadersNames[name.toLowerCase()] || name;
                requestHeaders[name] = value;
              }
              return this;
            },
            // Overrides response content-type header
            overrideMimeType: function(type) {
              if (completed2 == null) {
                s.mimeType = type;
              }
              return this;
            },
            // Status-dependent callbacks
            statusCode: function(map) {
              var code;
              if (map) {
                if (completed2) {
                  jqXHR.always(map[jqXHR.status]);
                } else {
                  for (code in map) {
                    statusCode[code] = [statusCode[code], map[code]];
                  }
                }
              }
              return this;
            },
            // Cancel the request
            abort: function(statusText) {
              var finalText = statusText || strAbort;
              if (transport) {
                transport.abort(finalText);
              }
              done(0, finalText);
              return this;
            }
          };
          deferred.promise(jqXHR);
          s.url = ((url || s.url || location.href) + "").replace(rprotocol, location.protocol + "//");
          s.type = options.method || options.type || s.method || s.type;
          s.dataTypes = (s.dataType || "*").toLowerCase().match(rnothtmlwhite) || [""];
          if (s.crossDomain == null) {
            urlAnchor = document2.createElement("a");
            try {
              urlAnchor.href = s.url;
              urlAnchor.href = urlAnchor.href;
              s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !== urlAnchor.protocol + "//" + urlAnchor.host;
            } catch (e) {
              s.crossDomain = true;
            }
          }
          if (s.data && s.processData && typeof s.data !== "string") {
            s.data = jQuery.param(s.data, s.traditional);
          }
          inspectPrefiltersOrTransports(prefilters, s, options, jqXHR);
          if (completed2) {
            return jqXHR;
          }
          fireGlobals = jQuery.event && s.global;
          if (fireGlobals && jQuery.active++ === 0) {
            jQuery.event.trigger("ajaxStart");
          }
          s.type = s.type.toUpperCase();
          s.hasContent = !rnoContent.test(s.type);
          cacheURL = s.url.replace(rhash, "");
          if (!s.hasContent) {
            uncached = s.url.slice(cacheURL.length);
            if (s.data && (s.processData || typeof s.data === "string")) {
              cacheURL += (rquery.test(cacheURL) ? "&" : "?") + s.data;
              delete s.data;
            }
            if (s.cache === false) {
              cacheURL = cacheURL.replace(rantiCache, "$1");
              uncached = (rquery.test(cacheURL) ? "&" : "?") + "_=" + nonce.guid++ + uncached;
            }
            s.url = cacheURL + uncached;
          } else if (s.data && s.processData && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0) {
            s.data = s.data.replace(r20, "+");
          }
          if (s.ifModified) {
            if (jQuery.lastModified[cacheURL]) {
              jqXHR.setRequestHeader("If-Modified-Since", jQuery.lastModified[cacheURL]);
            }
            if (jQuery.etag[cacheURL]) {
              jqXHR.setRequestHeader("If-None-Match", jQuery.etag[cacheURL]);
            }
          }
          if (s.data && s.hasContent && s.contentType !== false || options.contentType) {
            jqXHR.setRequestHeader("Content-Type", s.contentType);
          }
          jqXHR.setRequestHeader(
            "Accept",
            s.dataTypes[0] && s.accepts[s.dataTypes[0]] ? s.accepts[s.dataTypes[0]] + (s.dataTypes[0] !== "*" ? ", " + allTypes + "; q=0.01" : "") : s.accepts["*"]
          );
          for (i in s.headers) {
            jqXHR.setRequestHeader(i, s.headers[i]);
          }
          if (s.beforeSend && (s.beforeSend.call(callbackContext, jqXHR, s) === false || completed2)) {
            return jqXHR.abort();
          }
          strAbort = "abort";
          completeDeferred.add(s.complete);
          jqXHR.done(s.success);
          jqXHR.fail(s.error);
          transport = inspectPrefiltersOrTransports(transports, s, options, jqXHR);
          if (!transport) {
            done(-1, "No Transport");
          } else {
            jqXHR.readyState = 1;
            if (fireGlobals) {
              globalEventContext.trigger("ajaxSend", [jqXHR, s]);
            }
            if (completed2) {
              return jqXHR;
            }
            if (s.async && s.timeout > 0) {
              timeoutTimer = window2.setTimeout(function() {
                jqXHR.abort("timeout");
              }, s.timeout);
            }
            try {
              completed2 = false;
              transport.send(requestHeaders, done);
            } catch (e) {
              if (completed2) {
                throw e;
              }
              done(-1, e);
            }
          }
          function done(status, nativeStatusText, responses, headers) {
            var isSuccess, success, error, response, modified, statusText = nativeStatusText;
            if (completed2) {
              return;
            }
            completed2 = true;
            if (timeoutTimer) {
              window2.clearTimeout(timeoutTimer);
            }
            transport = void 0;
            responseHeadersString = headers || "";
            jqXHR.readyState = status > 0 ? 4 : 0;
            isSuccess = status >= 200 && status < 300 || status === 304;
            if (responses) {
              response = ajaxHandleResponses(s, jqXHR, responses);
            }
            if (!isSuccess && jQuery.inArray("script", s.dataTypes) > -1 && jQuery.inArray("json", s.dataTypes) < 0) {
              s.converters["text script"] = function() {
              };
            }
            response = ajaxConvert(s, response, jqXHR, isSuccess);
            if (isSuccess) {
              if (s.ifModified) {
                modified = jqXHR.getResponseHeader("Last-Modified");
                if (modified) {
                  jQuery.lastModified[cacheURL] = modified;
                }
                modified = jqXHR.getResponseHeader("etag");
                if (modified) {
                  jQuery.etag[cacheURL] = modified;
                }
              }
              if (status === 204 || s.type === "HEAD") {
                statusText = "nocontent";
              } else if (status === 304) {
                statusText = "notmodified";
              } else {
                statusText = response.state;
                success = response.data;
                error = response.error;
                isSuccess = !error;
              }
            } else {
              error = statusText;
              if (status || !statusText) {
                statusText = "error";
                if (status < 0) {
                  status = 0;
                }
              }
            }
            jqXHR.status = status;
            jqXHR.statusText = (nativeStatusText || statusText) + "";
            if (isSuccess) {
              deferred.resolveWith(callbackContext, [success, statusText, jqXHR]);
            } else {
              deferred.rejectWith(callbackContext, [jqXHR, statusText, error]);
            }
            jqXHR.statusCode(statusCode);
            statusCode = void 0;
            if (fireGlobals) {
              globalEventContext.trigger(
                isSuccess ? "ajaxSuccess" : "ajaxError",
                [jqXHR, s, isSuccess ? success : error]
              );
            }
            completeDeferred.fireWith(callbackContext, [jqXHR, statusText]);
            if (fireGlobals) {
              globalEventContext.trigger("ajaxComplete", [jqXHR, s]);
              if (!--jQuery.active) {
                jQuery.event.trigger("ajaxStop");
              }
            }
          }
          return jqXHR;
        },
        getJSON: function(url, data, callback) {
          return jQuery.get(url, data, callback, "json");
        },
        getScript: function(url, callback) {
          return jQuery.get(url, void 0, callback, "script");
        }
      });
      jQuery.each(["get", "post"], function(_i, method) {
        jQuery[method] = function(url, data, callback, type) {
          if (isFunction(data)) {
            type = type || callback;
            callback = data;
            data = void 0;
          }
          return jQuery.ajax(jQuery.extend({
            url,
            type: method,
            dataType: type,
            data,
            success: callback
          }, jQuery.isPlainObject(url) && url));
        };
      });
      jQuery.ajaxPrefilter(function(s) {
        var i;
        for (i in s.headers) {
          if (i.toLowerCase() === "content-type") {
            s.contentType = s.headers[i] || "";
          }
        }
      });
      jQuery._evalUrl = function(url, options, doc) {
        return jQuery.ajax({
          url,
          // Make this explicit, since user can override this through ajaxSetup (trac-11264)
          type: "GET",
          dataType: "script",
          cache: true,
          async: false,
          global: false,
          // Only evaluate the response if it is successful (gh-4126)
          // dataFilter is not invoked for failure responses, so using it instead
          // of the default converter is kludgy but it works.
          converters: {
            "text script": function() {
            }
          },
          dataFilter: function(response) {
            jQuery.globalEval(response, options, doc);
          }
        });
      };
      jQuery.fn.extend({
        wrapAll: function(html) {
          var wrap;
          if (this[0]) {
            if (isFunction(html)) {
              html = html.call(this[0]);
            }
            wrap = jQuery(html, this[0].ownerDocument).eq(0).clone(true);
            if (this[0].parentNode) {
              wrap.insertBefore(this[0]);
            }
            wrap.map(function() {
              var elem = this;
              while (elem.firstElementChild) {
                elem = elem.firstElementChild;
              }
              return elem;
            }).append(this);
          }
          return this;
        },
        wrapInner: function(html) {
          if (isFunction(html)) {
            return this.each(function(i) {
              jQuery(this).wrapInner(html.call(this, i));
            });
          }
          return this.each(function() {
            var self2 = jQuery(this), contents = self2.contents();
            if (contents.length) {
              contents.wrapAll(html);
            } else {
              self2.append(html);
            }
          });
        },
        wrap: function(html) {
          var htmlIsFunction = isFunction(html);
          return this.each(function(i) {
            jQuery(this).wrapAll(htmlIsFunction ? html.call(this, i) : html);
          });
        },
        unwrap: function(selector) {
          this.parent(selector).not("body").each(function() {
            jQuery(this).replaceWith(this.childNodes);
          });
          return this;
        }
      });
      jQuery.expr.pseudos.hidden = function(elem) {
        return !jQuery.expr.pseudos.visible(elem);
      };
      jQuery.expr.pseudos.visible = function(elem) {
        return !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
      };
      jQuery.ajaxSettings.xhr = function() {
        try {
          return new window2.XMLHttpRequest();
        } catch (e) {
        }
      };
      var xhrSuccessStatus = {
        // File protocol always yields status code 0, assume 200
        0: 200,
        // Support: IE <=9 only
        // trac-1450: sometimes IE returns 1223 when it should be 204
        1223: 204
      }, xhrSupported = jQuery.ajaxSettings.xhr();
      support.cors = !!xhrSupported && "withCredentials" in xhrSupported;
      support.ajax = xhrSupported = !!xhrSupported;
      jQuery.ajaxTransport(function(options) {
        var callback, errorCallback;
        if (support.cors || xhrSupported && !options.crossDomain) {
          return {
            send: function(headers, complete) {
              var i, xhr = options.xhr();
              xhr.open(
                options.type,
                options.url,
                options.async,
                options.username,
                options.password
              );
              if (options.xhrFields) {
                for (i in options.xhrFields) {
                  xhr[i] = options.xhrFields[i];
                }
              }
              if (options.mimeType && xhr.overrideMimeType) {
                xhr.overrideMimeType(options.mimeType);
              }
              if (!options.crossDomain && !headers["X-Requested-With"]) {
                headers["X-Requested-With"] = "XMLHttpRequest";
              }
              for (i in headers) {
                xhr.setRequestHeader(i, headers[i]);
              }
              callback = function(type) {
                return function() {
                  if (callback) {
                    callback = errorCallback = xhr.onload = xhr.onerror = xhr.onabort = xhr.ontimeout = xhr.onreadystatechange = null;
                    if (type === "abort") {
                      xhr.abort();
                    } else if (type === "error") {
                      if (typeof xhr.status !== "number") {
                        complete(0, "error");
                      } else {
                        complete(
                          // File: protocol always yields status 0; see trac-8605, trac-14207
                          xhr.status,
                          xhr.statusText
                        );
                      }
                    } else {
                      complete(
                        xhrSuccessStatus[xhr.status] || xhr.status,
                        xhr.statusText,
                        // Support: IE <=9 only
                        // IE9 has no XHR2 but throws on binary (trac-11426)
                        // For XHR2 non-text, let the caller handle it (gh-2498)
                        (xhr.responseType || "text") !== "text" || typeof xhr.responseText !== "string" ? { binary: xhr.response } : { text: xhr.responseText },
                        xhr.getAllResponseHeaders()
                      );
                    }
                  }
                };
              };
              xhr.onload = callback();
              errorCallback = xhr.onerror = xhr.ontimeout = callback("error");
              if (xhr.onabort !== void 0) {
                xhr.onabort = errorCallback;
              } else {
                xhr.onreadystatechange = function() {
                  if (xhr.readyState === 4) {
                    window2.setTimeout(function() {
                      if (callback) {
                        errorCallback();
                      }
                    });
                  }
                };
              }
              callback = callback("abort");
              try {
                xhr.send(options.hasContent && options.data || null);
              } catch (e) {
                if (callback) {
                  throw e;
                }
              }
            },
            abort: function() {
              if (callback) {
                callback();
              }
            }
          };
        }
      });
      jQuery.ajaxPrefilter(function(s) {
        if (s.crossDomain) {
          s.contents.script = false;
        }
      });
      jQuery.ajaxSetup({
        accepts: {
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
          script: /\b(?:java|ecma)script\b/
        },
        converters: {
          "text script": function(text) {
            jQuery.globalEval(text);
            return text;
          }
        }
      });
      jQuery.ajaxPrefilter("script", function(s) {
        if (s.cache === void 0) {
          s.cache = false;
        }
        if (s.crossDomain) {
          s.type = "GET";
        }
      });
      jQuery.ajaxTransport("script", function(s) {
        if (s.crossDomain || s.scriptAttrs) {
          var script, callback;
          return {
            send: function(_, complete) {
              script = jQuery("<script>").attr(s.scriptAttrs || {}).prop({ charset: s.scriptCharset, src: s.url }).on("load error", callback = function(evt) {
                script.remove();
                callback = null;
                if (evt) {
                  complete(evt.type === "error" ? 404 : 200, evt.type);
                }
              });
              document2.head.appendChild(script[0]);
            },
            abort: function() {
              if (callback) {
                callback();
              }
            }
          };
        }
      });
      var oldCallbacks = [], rjsonp = /(=)\?(?=&|$)|\?\?/;
      jQuery.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
          var callback = oldCallbacks.pop() || jQuery.expando + "_" + nonce.guid++;
          this[callback] = true;
          return callback;
        }
      });
      jQuery.ajaxPrefilter("json jsonp", function(s, originalSettings, jqXHR) {
        var callbackName, overwritten, responseContainer, jsonProp = s.jsonp !== false && (rjsonp.test(s.url) ? "url" : typeof s.data === "string" && (s.contentType || "").indexOf("application/x-www-form-urlencoded") === 0 && rjsonp.test(s.data) && "data");
        if (jsonProp || s.dataTypes[0] === "jsonp") {
          callbackName = s.jsonpCallback = isFunction(s.jsonpCallback) ? s.jsonpCallback() : s.jsonpCallback;
          if (jsonProp) {
            s[jsonProp] = s[jsonProp].replace(rjsonp, "$1" + callbackName);
          } else if (s.jsonp !== false) {
            s.url += (rquery.test(s.url) ? "&" : "?") + s.jsonp + "=" + callbackName;
          }
          s.converters["script json"] = function() {
            if (!responseContainer) {
              jQuery.error(callbackName + " was not called");
            }
            return responseContainer[0];
          };
          s.dataTypes[0] = "json";
          overwritten = window2[callbackName];
          window2[callbackName] = function() {
            responseContainer = arguments;
          };
          jqXHR.always(function() {
            if (overwritten === void 0) {
              jQuery(window2).removeProp(callbackName);
            } else {
              window2[callbackName] = overwritten;
            }
            if (s[callbackName]) {
              s.jsonpCallback = originalSettings.jsonpCallback;
              oldCallbacks.push(callbackName);
            }
            if (responseContainer && isFunction(overwritten)) {
              overwritten(responseContainer[0]);
            }
            responseContainer = overwritten = void 0;
          });
          return "script";
        }
      });
      support.createHTMLDocument = function() {
        var body = document2.implementation.createHTMLDocument("").body;
        body.innerHTML = "<form></form><form></form>";
        return body.childNodes.length === 2;
      }();
      jQuery.parseHTML = function(data, context, keepScripts) {
        if (typeof data !== "string") {
          return [];
        }
        if (typeof context === "boolean") {
          keepScripts = context;
          context = false;
        }
        var base, parsed, scripts;
        if (!context) {
          if (support.createHTMLDocument) {
            context = document2.implementation.createHTMLDocument("");
            base = context.createElement("base");
            base.href = document2.location.href;
            context.head.appendChild(base);
          } else {
            context = document2;
          }
        }
        parsed = rsingleTag.exec(data);
        scripts = !keepScripts && [];
        if (parsed) {
          return [context.createElement(parsed[1])];
        }
        parsed = buildFragment([data], context, scripts);
        if (scripts && scripts.length) {
          jQuery(scripts).remove();
        }
        return jQuery.merge([], parsed.childNodes);
      };
      jQuery.fn.load = function(url, params, callback) {
        var selector, type, response, self2 = this, off = url.indexOf(" ");
        if (off > -1) {
          selector = stripAndCollapse(url.slice(off));
          url = url.slice(0, off);
        }
        if (isFunction(params)) {
          callback = params;
          params = void 0;
        } else if (params && typeof params === "object") {
          type = "POST";
        }
        if (self2.length > 0) {
          jQuery.ajax({
            url,
            // If "type" variable is undefined, then "GET" method will be used.
            // Make value of this field explicit since
            // user can override it through ajaxSetup method
            type: type || "GET",
            dataType: "html",
            data: params
          }).done(function(responseText) {
            response = arguments;
            self2.html(selector ? (
              // If a selector was specified, locate the right elements in a dummy div
              // Exclude scripts to avoid IE 'Permission Denied' errors
              jQuery("<div>").append(jQuery.parseHTML(responseText)).find(selector)
            ) : (
              // Otherwise use the full result
              responseText
            ));
          }).always(callback && function(jqXHR, status) {
            self2.each(function() {
              callback.apply(this, response || [jqXHR.responseText, status, jqXHR]);
            });
          });
        }
        return this;
      };
      jQuery.expr.pseudos.animated = function(elem) {
        return jQuery.grep(jQuery.timers, function(fn) {
          return elem === fn.elem;
        }).length;
      };
      jQuery.offset = {
        setOffset: function(elem, options, i) {
          var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition, position = jQuery.css(elem, "position"), curElem = jQuery(elem), props = {};
          if (position === "static") {
            elem.style.position = "relative";
          }
          curOffset = curElem.offset();
          curCSSTop = jQuery.css(elem, "top");
          curCSSLeft = jQuery.css(elem, "left");
          calculatePosition = (position === "absolute" || position === "fixed") && (curCSSTop + curCSSLeft).indexOf("auto") > -1;
          if (calculatePosition) {
            curPosition = curElem.position();
            curTop = curPosition.top;
            curLeft = curPosition.left;
          } else {
            curTop = parseFloat(curCSSTop) || 0;
            curLeft = parseFloat(curCSSLeft) || 0;
          }
          if (isFunction(options)) {
            options = options.call(elem, i, jQuery.extend({}, curOffset));
          }
          if (options.top != null) {
            props.top = options.top - curOffset.top + curTop;
          }
          if (options.left != null) {
            props.left = options.left - curOffset.left + curLeft;
          }
          if ("using" in options) {
            options.using.call(elem, props);
          } else {
            curElem.css(props);
          }
        }
      };
      jQuery.fn.extend({
        // offset() relates an element's border box to the document origin
        offset: function(options) {
          if (arguments.length) {
            return options === void 0 ? this : this.each(function(i) {
              jQuery.offset.setOffset(this, options, i);
            });
          }
          var rect, win, elem = this[0];
          if (!elem) {
            return;
          }
          if (!elem.getClientRects().length) {
            return { top: 0, left: 0 };
          }
          rect = elem.getBoundingClientRect();
          win = elem.ownerDocument.defaultView;
          return {
            top: rect.top + win.pageYOffset,
            left: rect.left + win.pageXOffset
          };
        },
        // position() relates an element's margin box to its offset parent's padding box
        // This corresponds to the behavior of CSS absolute positioning
        position: function() {
          if (!this[0]) {
            return;
          }
          var offsetParent, offset, doc, elem = this[0], parentOffset = { top: 0, left: 0 };
          if (jQuery.css(elem, "position") === "fixed") {
            offset = elem.getBoundingClientRect();
          } else {
            offset = this.offset();
            doc = elem.ownerDocument;
            offsetParent = elem.offsetParent || doc.documentElement;
            while (offsetParent && (offsetParent === doc.body || offsetParent === doc.documentElement) && jQuery.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.parentNode;
            }
            if (offsetParent && offsetParent !== elem && offsetParent.nodeType === 1) {
              parentOffset = jQuery(offsetParent).offset();
              parentOffset.top += jQuery.css(offsetParent, "borderTopWidth", true);
              parentOffset.left += jQuery.css(offsetParent, "borderLeftWidth", true);
            }
          }
          return {
            top: offset.top - parentOffset.top - jQuery.css(elem, "marginTop", true),
            left: offset.left - parentOffset.left - jQuery.css(elem, "marginLeft", true)
          };
        },
        // This method will return documentElement in the following cases:
        // 1) For the element inside the iframe without offsetParent, this method will return
        //    documentElement of the parent window
        // 2) For the hidden or detached element
        // 3) For body or html element, i.e. in case of the html node - it will return itself
        //
        // but those exceptions were never presented as a real life use-cases
        // and might be considered as more preferable results.
        //
        // This logic, however, is not guaranteed and can change at any point in the future
        offsetParent: function() {
          return this.map(function() {
            var offsetParent = this.offsetParent;
            while (offsetParent && jQuery.css(offsetParent, "position") === "static") {
              offsetParent = offsetParent.offsetParent;
            }
            return offsetParent || documentElement;
          });
        }
      });
      jQuery.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function(method, prop) {
        var top = "pageYOffset" === prop;
        jQuery.fn[method] = function(val) {
          return access(this, function(elem, method2, val2) {
            var win;
            if (isWindow(elem)) {
              win = elem;
            } else if (elem.nodeType === 9) {
              win = elem.defaultView;
            }
            if (val2 === void 0) {
              return win ? win[prop] : elem[method2];
            }
            if (win) {
              win.scrollTo(
                !top ? val2 : win.pageXOffset,
                top ? val2 : win.pageYOffset
              );
            } else {
              elem[method2] = val2;
            }
          }, method, val, arguments.length);
        };
      });
      jQuery.each(["top", "left"], function(_i, prop) {
        jQuery.cssHooks[prop] = addGetHookIf(
          support.pixelPosition,
          function(elem, computed) {
            if (computed) {
              computed = curCSS(elem, prop);
              return rnumnonpx.test(computed) ? jQuery(elem).position()[prop] + "px" : computed;
            }
          }
        );
      });
      jQuery.each({ Height: "height", Width: "width" }, function(name, type) {
        jQuery.each({
          padding: "inner" + name,
          content: type,
          "": "outer" + name
        }, function(defaultExtra, funcName) {
          jQuery.fn[funcName] = function(margin, value) {
            var chainable = arguments.length && (defaultExtra || typeof margin !== "boolean"), extra2 = defaultExtra || (margin === true || value === true ? "margin" : "border");
            return access(this, function(elem, type2, value2) {
              var doc;
              if (isWindow(elem)) {
                return funcName.indexOf("outer") === 0 ? elem["inner" + name] : elem.document.documentElement["client" + name];
              }
              if (elem.nodeType === 9) {
                doc = elem.documentElement;
                return Math.max(
                  elem.body["scroll" + name],
                  doc["scroll" + name],
                  elem.body["offset" + name],
                  doc["offset" + name],
                  doc["client" + name]
                );
              }
              return value2 === void 0 ? (
                // Get width or height on the element, requesting but not forcing parseFloat
                jQuery.css(elem, type2, extra2)
              ) : (
                // Set width or height on the element
                jQuery.style(elem, type2, value2, extra2)
              );
            }, type, chainable ? margin : void 0, chainable);
          };
        });
      });
      jQuery.each([
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend"
      ], function(_i, type) {
        jQuery.fn[type] = function(fn) {
          return this.on(type, fn);
        };
      });
      jQuery.fn.extend({
        bind: function(types, data, fn) {
          return this.on(types, null, data, fn);
        },
        unbind: function(types, fn) {
          return this.off(types, null, fn);
        },
        delegate: function(selector, types, data, fn) {
          return this.on(types, selector, data, fn);
        },
        undelegate: function(selector, types, fn) {
          return arguments.length === 1 ? this.off(selector, "**") : this.off(types, selector || "**", fn);
        },
        hover: function(fnOver, fnOut) {
          return this.mouseenter(fnOver).mouseleave(fnOut || fnOver);
        }
      });
      jQuery.each(
        "blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "),
        function(_i, name) {
          jQuery.fn[name] = function(data, fn) {
            return arguments.length > 0 ? this.on(name, null, data, fn) : this.trigger(name);
          };
        }
      );
      var rtrim = /^[\s\uFEFF\xA0]+|([^\s\uFEFF\xA0])[\s\uFEFF\xA0]+$/g;
      jQuery.proxy = function(fn, context) {
        var tmp, args, proxy;
        if (typeof context === "string") {
          tmp = fn[context];
          context = fn;
          fn = tmp;
        }
        if (!isFunction(fn)) {
          return void 0;
        }
        args = slice.call(arguments, 2);
        proxy = function() {
          return fn.apply(context || this, args.concat(slice.call(arguments)));
        };
        proxy.guid = fn.guid = fn.guid || jQuery.guid++;
        return proxy;
      };
      jQuery.holdReady = function(hold) {
        if (hold) {
          jQuery.readyWait++;
        } else {
          jQuery.ready(true);
        }
      };
      jQuery.isArray = Array.isArray;
      jQuery.parseJSON = JSON.parse;
      jQuery.nodeName = nodeName;
      jQuery.isFunction = isFunction;
      jQuery.isWindow = isWindow;
      jQuery.camelCase = camelCase;
      jQuery.type = toType;
      jQuery.now = Date.now;
      jQuery.isNumeric = function(obj) {
        var type = jQuery.type(obj);
        return (type === "number" || type === "string") && // parseFloat NaNs numeric-cast false positives ("")
        // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
        // subtraction forces infinities to NaN
        !isNaN(obj - parseFloat(obj));
      };
      jQuery.trim = function(text) {
        return text == null ? "" : (text + "").replace(rtrim, "$1");
      };
      var _jQuery = window2.jQuery, _$ = window2.$;
      jQuery.noConflict = function(deep) {
        if (window2.$ === jQuery) {
          window2.$ = _$;
        }
        if (deep && window2.jQuery === jQuery) {
          window2.jQuery = _jQuery;
        }
        return jQuery;
      };
      if (typeof noGlobal === "undefined") {
        window2.jQuery = window2.$ = jQuery;
      }
      return jQuery;
    });
  })(jquery);
  return jqueryExports;
}
(function(module) {
  (function(define) {
    define(["jquery"], function($) {
      return function() {
        var $container;
        var listener;
        var toastId = 0;
        var toastType = {
          error: "error",
          info: "info",
          success: "success",
          warning: "warning"
        };
        var toastr2 = {
          clear,
          remove,
          error,
          getContainer,
          info,
          options: {},
          subscribe,
          success,
          version: "2.1.4",
          warning
        };
        var previousToast;
        return toastr2;
        function error(message, title, optionsOverride) {
          return notify({
            type: toastType.error,
            iconClass: getOptions().iconClasses.error,
            message,
            optionsOverride,
            title
          });
        }
        function getContainer(options, create) {
          if (!options) {
            options = getOptions();
          }
          $container = $("#" + options.containerId);
          if ($container.length) {
            return $container;
          }
          if (create) {
            $container = createContainer(options);
          }
          return $container;
        }
        function info(message, title, optionsOverride) {
          return notify({
            type: toastType.info,
            iconClass: getOptions().iconClasses.info,
            message,
            optionsOverride,
            title
          });
        }
        function subscribe(callback) {
          listener = callback;
        }
        function success(message, title, optionsOverride) {
          return notify({
            type: toastType.success,
            iconClass: getOptions().iconClasses.success,
            message,
            optionsOverride,
            title
          });
        }
        function warning(message, title, optionsOverride) {
          return notify({
            type: toastType.warning,
            iconClass: getOptions().iconClasses.warning,
            message,
            optionsOverride,
            title
          });
        }
        function clear($toastElement, clearOptions) {
          var options = getOptions();
          if (!$container) {
            getContainer(options);
          }
          if (!clearToast($toastElement, options, clearOptions)) {
            clearContainer(options);
          }
        }
        function remove($toastElement) {
          var options = getOptions();
          if (!$container) {
            getContainer(options);
          }
          if ($toastElement && $(":focus", $toastElement).length === 0) {
            removeToast($toastElement);
            return;
          }
          if ($container.children().length) {
            $container.remove();
          }
        }
        function clearContainer(options) {
          var toastsToClear = $container.children();
          for (var i = toastsToClear.length - 1; i >= 0; i--) {
            clearToast($(toastsToClear[i]), options);
          }
        }
        function clearToast($toastElement, options, clearOptions) {
          var force = clearOptions && clearOptions.force ? clearOptions.force : false;
          if ($toastElement && (force || $(":focus", $toastElement).length === 0)) {
            $toastElement[options.hideMethod]({
              duration: options.hideDuration,
              easing: options.hideEasing,
              complete: function() {
                removeToast($toastElement);
              }
            });
            return true;
          }
          return false;
        }
        function createContainer(options) {
          $container = $("<div/>").attr("id", options.containerId).addClass(options.positionClass);
          $container.appendTo($(options.target));
          return $container;
        }
        function getDefaults() {
          return {
            tapToDismiss: true,
            toastClass: "toast",
            containerId: "toast-container",
            debug: false,
            showMethod: "fadeIn",
            //fadeIn, slideDown, and show are built into jQuery
            showDuration: 300,
            showEasing: "swing",
            //swing and linear are built into jQuery
            onShown: void 0,
            hideMethod: "fadeOut",
            hideDuration: 1e3,
            hideEasing: "swing",
            onHidden: void 0,
            closeMethod: false,
            closeDuration: false,
            closeEasing: false,
            closeOnHover: true,
            extendedTimeOut: 1e3,
            iconClasses: {
              error: "toast-error",
              info: "toast-info",
              success: "toast-success",
              warning: "toast-warning"
            },
            iconClass: "toast-info",
            positionClass: "toast-top-right",
            timeOut: 5e3,
            // Set timeOut and extendedTimeOut to 0 to make it sticky
            titleClass: "toast-title",
            messageClass: "toast-message",
            escapeHtml: false,
            target: "body",
            closeHtml: '<button type="button">&times;</button>',
            closeClass: "toast-close-button",
            newestOnTop: true,
            preventDuplicates: false,
            progressBar: false,
            progressClass: "toast-progress",
            rtl: false
          };
        }
        function publish(args) {
          if (!listener) {
            return;
          }
          listener(args);
        }
        function notify(map) {
          var options = getOptions();
          var iconClass = map.iconClass || options.iconClass;
          if (typeof map.optionsOverride !== "undefined") {
            options = $.extend(options, map.optionsOverride);
            iconClass = map.optionsOverride.iconClass || iconClass;
          }
          if (shouldExit(options, map)) {
            return;
          }
          toastId++;
          $container = getContainer(options, true);
          var intervalId = null;
          var $toastElement = $("<div/>");
          var $titleElement = $("<div/>");
          var $messageElement = $("<div/>");
          var $progressElement = $("<div/>");
          var $closeElement = $(options.closeHtml);
          var progressBar = {
            intervalId: null,
            hideEta: null,
            maxHideTime: null
          };
          var response = {
            toastId,
            state: "visible",
            startTime: /* @__PURE__ */ new Date(),
            options,
            map
          };
          personalizeToast();
          displayToast();
          handleEvents();
          publish(response);
          if (options.debug && console) {
            console.log(response);
          }
          return $toastElement;
          function escapeHtml(source) {
            if (source == null) {
              source = "";
            }
            return source.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          }
          function personalizeToast() {
            setIcon();
            setTitle();
            setMessage();
            setCloseButton();
            setProgressBar();
            setRTL();
            setSequence();
            setAria();
          }
          function setAria() {
            var ariaValue = "";
            switch (map.iconClass) {
              case "toast-success":
              case "toast-info":
                ariaValue = "polite";
                break;
              default:
                ariaValue = "assertive";
            }
            $toastElement.attr("aria-live", ariaValue);
          }
          function handleEvents() {
            if (options.closeOnHover) {
              $toastElement.hover(stickAround, delayedHideToast);
            }
            if (!options.onclick && options.tapToDismiss) {
              $toastElement.click(hideToast);
            }
            if (options.closeButton && $closeElement) {
              $closeElement.click(function(event) {
                if (event.stopPropagation) {
                  event.stopPropagation();
                } else if (event.cancelBubble !== void 0 && event.cancelBubble !== true) {
                  event.cancelBubble = true;
                }
                if (options.onCloseClick) {
                  options.onCloseClick(event);
                }
                hideToast(true);
              });
            }
            if (options.onclick) {
              $toastElement.click(function(event) {
                options.onclick(event);
                hideToast();
              });
            }
          }
          function displayToast() {
            $toastElement.hide();
            $toastElement[options.showMethod](
              { duration: options.showDuration, easing: options.showEasing, complete: options.onShown }
            );
            if (options.timeOut > 0) {
              intervalId = setTimeout(hideToast, options.timeOut);
              progressBar.maxHideTime = parseFloat(options.timeOut);
              progressBar.hideEta = (/* @__PURE__ */ new Date()).getTime() + progressBar.maxHideTime;
              if (options.progressBar) {
                progressBar.intervalId = setInterval(updateProgress, 10);
              }
            }
          }
          function setIcon() {
            if (map.iconClass) {
              $toastElement.addClass(options.toastClass).addClass(iconClass);
            }
          }
          function setSequence() {
            if (options.newestOnTop) {
              $container.prepend($toastElement);
            } else {
              $container.append($toastElement);
            }
          }
          function setTitle() {
            if (map.title) {
              var suffix = map.title;
              if (options.escapeHtml) {
                suffix = escapeHtml(map.title);
              }
              $titleElement.append(suffix).addClass(options.titleClass);
              $toastElement.append($titleElement);
            }
          }
          function setMessage() {
            if (map.message) {
              var suffix = map.message;
              if (options.escapeHtml) {
                suffix = escapeHtml(map.message);
              }
              $messageElement.append(suffix).addClass(options.messageClass);
              $toastElement.append($messageElement);
            }
          }
          function setCloseButton() {
            if (options.closeButton) {
              $closeElement.addClass(options.closeClass).attr("role", "button");
              $toastElement.prepend($closeElement);
            }
          }
          function setProgressBar() {
            if (options.progressBar) {
              $progressElement.addClass(options.progressClass);
              $toastElement.prepend($progressElement);
            }
          }
          function setRTL() {
            if (options.rtl) {
              $toastElement.addClass("rtl");
            }
          }
          function shouldExit(options2, map2) {
            if (options2.preventDuplicates) {
              if (map2.message === previousToast) {
                return true;
              } else {
                previousToast = map2.message;
              }
            }
            return false;
          }
          function hideToast(override) {
            var method = override && options.closeMethod !== false ? options.closeMethod : options.hideMethod;
            var duration = override && options.closeDuration !== false ? options.closeDuration : options.hideDuration;
            var easing = override && options.closeEasing !== false ? options.closeEasing : options.hideEasing;
            if ($(":focus", $toastElement).length && !override) {
              return;
            }
            clearTimeout(progressBar.intervalId);
            return $toastElement[method]({
              duration,
              easing,
              complete: function() {
                removeToast($toastElement);
                clearTimeout(intervalId);
                if (options.onHidden && response.state !== "hidden") {
                  options.onHidden();
                }
                response.state = "hidden";
                response.endTime = /* @__PURE__ */ new Date();
                publish(response);
              }
            });
          }
          function delayedHideToast() {
            if (options.timeOut > 0 || options.extendedTimeOut > 0) {
              intervalId = setTimeout(hideToast, options.extendedTimeOut);
              progressBar.maxHideTime = parseFloat(options.extendedTimeOut);
              progressBar.hideEta = (/* @__PURE__ */ new Date()).getTime() + progressBar.maxHideTime;
            }
          }
          function stickAround() {
            clearTimeout(intervalId);
            progressBar.hideEta = 0;
            $toastElement.stop(true, true)[options.showMethod](
              { duration: options.showDuration, easing: options.showEasing }
            );
          }
          function updateProgress() {
            var percentage = (progressBar.hideEta - (/* @__PURE__ */ new Date()).getTime()) / progressBar.maxHideTime * 100;
            $progressElement.width(percentage + "%");
          }
        }
        function getOptions() {
          return $.extend({}, getDefaults(), toastr2.options);
        }
        function removeToast($toastElement) {
          if (!$container) {
            $container = getContainer();
          }
          if ($toastElement.is(":visible")) {
            return;
          }
          $toastElement.remove();
          $toastElement = null;
          if ($container.children().length === 0) {
            $container.remove();
            previousToast = void 0;
          }
        }
      }();
    });
  })(function(deps, factory) {
    if (module.exports) {
      module.exports = factory(requireJquery());
    } else {
      window.toastr = factory(window.jQuery);
    }
  });
})(toastr$1);
const toastr = toastrExports;
async function autoModeStrobesInit() {
  var selectedFrequencyRange = "master";
  var inputDevice_text = "Internal Player";
  var trackBPM_interval = 0;
  var micBPM_interval = 0;
  var threshold = 30;
  var duration = 100;
  var trackStrobeTimeout;
  var trackStrobeTimeout_changed;
  var micStrobeTimeout;
  var changed = false;
  var isActive = false;
  var playerHidden = false;
  let currentColorIndex = 0;
  colorsBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentColorIndex = index;
    });
  });
  inputDevice.addEventListener("change", (event) => {
    var inputDevice_option = event.target.selectedOptions[0];
    inputDevice_text = inputDevice_option.label;
  });
  lowBtn.addEventListener("click", () => {
    selectedFrequencyRange = "low";
  });
  midBtn.addEventListener("click", () => {
    selectedFrequencyRange = "mid";
  });
  highBtn.addEventListener("click", () => {
    selectedFrequencyRange = "high";
  });
  masterBtn.addEventListener("click", () => {
    selectedFrequencyRange = "master";
  });
  slider_threshold.addEventListener("input", () => {
    threshold = slider_threshold.value;
  }, false);
  AM_durationSlider.addEventListener("input", () => {
    duration = AM_durationSlider.value;
  }, false);
  AM_offBtn.addEventListener("click", () => {
    isActive = false;
  });
  AM_onBtn.addEventListener("click", () => {
    isActive = true;
  });
  showHideA.addEventListener("click", async () => {
    if (showHideA.innerHTML == "(HIDE)") {
      playerHidden = true;
    } else {
      playerHidden = false;
    }
  });
  const audioContext = new AudioContext();
  const filter = audioContext.createBiquadFilter();
  const filter_mic = audioContext.createBiquadFilter();
  const analyser = audioContext.createAnalyser();
  analyser.fftSize = 2048;
  const TrackSource = audioContext.createMediaElementSource(internalPlayer);
  const dataArray = new Uint8Array(analyser.frequencyBinCount);
  let realtimeAnalyzerNode;
  inputDevice.addEventListener("change", async () => {
    killAutoModeStrobes();
    try {
      AM_offBtn.click();
      micBPM_text.value = 0;
      if (internalPlayer.src == "") {
        bpmDivSpan.innerHTML = "---";
        avgAmplitude.innerHTML = "0";
        avgAmplitudeLabel.setAttribute("hidden", "true");
        avgAmplitude.setAttribute("hidden", "true");
        trackBPM_text.value = 0;
      } else {
        bpmDivSpan.innerHTML = String(trackBPM_text.value);
      }
      if (inputDevice.selectedIndex == 1) {
        TrackSource.connect(filter);
        filter.connect(analyser);
        TrackSource.connect(audioContext.destination);
        micLoaderContainer.setAttribute("hidden", "true");
        micLoaderLabel.setAttribute("hidden", "true");
        avgAmplitudeLabel.removeAttribute("hidden");
        avgAmplitude.removeAttribute("hidden");
        bmpMultipliersLabel.removeAttribute("hidden");
        bmpMultipliers.removeAttribute("hidden");
        if (playerHidden == true) {
          showHideA.click();
        }
      } else {
        internalPlayer.pause();
        if (playerHidden == false) {
          showHideA.click();
        }
        bpmDivSpan.innerHTML = "---";
        avgAmplitudeLabel.setAttribute("hidden", "true");
        avgAmplitude.setAttribute("hidden", "true");
        bmpMultipliersLabel.setAttribute("hidden", "true");
        bmpMultipliers.setAttribute("hidden", "true");
        const selectedDeviceID = inputDevice.value;
        const constraints = { audio: { deviceID: selectedDeviceID, echoCancellation: false, googAutoGainControl: false } };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        inputDevice.addEventListener("change", () => {
          MicSource.disconnect();
        });
        micLoaderContainer.removeAttribute("hidden");
        micLoaderLabel.removeAttribute("hidden");
        toastr["info"]("Looking for a beat to process. This might take some time.", "Detecting BPM...");
        toastr.options = {
          "closeButton": false,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
        const MicSource = audioContext.createMediaStreamSource(stream);
        const MicMeterNode = src.createMeterNode(MicSource, audioContext);
        src.createMeter(MicAudioMeter, MicMeterNode, {});
        setInterval(() => {
          if (selectedFrequencyRange == "low") {
            filter_mic.type = "lowpass";
          } else if (selectedFrequencyRange == "mid") {
            filter_mic.type = "bandpass";
          } else if (selectedFrequencyRange == "high") {
            filter_mic.type = "highpass";
          } else {
            filter_mic.type = "allpass";
          }
        }, 100);
        if (!realtimeAnalyzerNode) {
          realtimeAnalyzerNode = await createRealTimeBpmProcessor(audioContext);
        }
        MicSource.connect(filter_mic).connect(realtimeAnalyzerNode);
        MicSource.connect(filter_mic).connect(analyser);
        if (circularRefs.startCheckingAudioPlaying)
          circularRefs.startCheckingAudioPlaying();
        else
          console.error("startCheckingAudioPlaying not defined");
        realtimeAnalyzerNode.port.onmessage = (event) => {
          var _a, _b;
          if (event.data.message === "BPM") {
            console.log("BPM", event.data.result.bpm[0].tempo);
          }
          if (event.data.message === "BPM_STABLE") {
            console.log("BPM_STABLE", event.data.result);
          }
          const tempo = (_b = (_a = event.data.result.bpm) == null ? void 0 : _a[0]) == null ? void 0 : _b.tempo;
          if (tempo) {
            bpmDivSpan.innerHTML = String(tempo);
            micBPM_text.value = tempo;
            micLoaderContainer.setAttribute("hidden", "true");
            micLoaderLabel.setAttribute("hidden", "true");
            avgAmplitudeLabel.removeAttribute("hidden");
            avgAmplitude.removeAttribute("hidden");
          }
        };
      }
    } catch (err) {
      console.error("Error getting microphone input:", err);
      toastr["error"]("Error getting microphone input. Check console for error details", "Microphone Error");
      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    }
  });
  function micStrobe() {
    let lastMicBPMValue = micBPM_text.value;
    var ranTimes = 0;
    micBPM_interval = 60 / lastMicBPMValue * 1e3;
    micStrobeTimeout = setInterval(() => {
      analyser.getByteFrequencyData(dataArray);
      let averageAmplitude = 0;
      for (let i = 0; i < dataArray.length; i++) {
        averageAmplitude += dataArray[i];
      }
      averageAmplitude /= dataArray.length;
      console.log(averageAmplitude);
      avgAmplitude.innerHTML = String(averageAmplitude);
      if (averageAmplitude > threshold) {
        overlay.style.visibility = "visible";
        setTimeout(() => {
          overlay.style.visibility = "hidden";
        }, duration);
        if (staticCycleA.innerHTML == "(CYCLE MODE)") {
          colorsBtn[currentColorIndex].click();
          currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
        }
        ranTimes++;
        console.log("Device: " + inputDevice_text + " | BPM: " + lastMicBPMValue + " | Strobe duration: " + duration + "ms | Beat detection threshold: " + threshold + "% | Times ran: " + ranTimes + " | Filter: " + filter_mic.type);
        if (micBPM_text.value != lastMicBPMValue) {
          clearInterval(micStrobeTimeout);
          micStrobe();
        }
      }
    }, micBPM_interval);
  }
  function trackStrobe() {
    let lastTrackBPMValue = trackBPM_text.value;
    var ranTimes = 0;
    if (changed == false) {
      trackBPM_interval = 60 / lastTrackBPMValue * 1e3;
      trackStrobeTimeout = setInterval(() => {
        if (selectedFrequencyRange == "low") {
          filter.type = "lowpass";
          TrackSource.connect(filter);
          filter.connect(analyser);
          TrackSource.connect(audioContext.destination);
        } else if (selectedFrequencyRange == "mid") {
          filter.type = "bandpass";
          TrackSource.connect(filter);
          filter.connect(analyser);
          TrackSource.connect(audioContext.destination);
        } else if (selectedFrequencyRange == "high") {
          filter.type = "highpass";
          TrackSource.connect(filter);
          filter.connect(analyser);
          TrackSource.connect(audioContext.destination);
        } else {
          filter.type = "allpass";
          TrackSource.connect(filter);
          filter.connect(analyser);
          TrackSource.connect(audioContext.destination);
        }
        analyser.getByteFrequencyData(dataArray);
        let averageAmplitude = 0;
        for (let i = 0; i < dataArray.length; i++) {
          averageAmplitude += dataArray[i];
        }
        averageAmplitude /= dataArray.length;
        avgAmplitude.innerHTML = String(averageAmplitude);
        if (averageAmplitude > threshold) {
          overlay.style.visibility = "visible";
          setTimeout(() => {
            overlay.style.visibility = "hidden";
          }, duration);
          if (staticCycleA.innerHTML == "(CYCLE MODE)") {
            colorsBtn[currentColorIndex].click();
            currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
          }
          ranTimes++;
          console.log("Device: " + inputDevice_text + " | BPM: " + lastTrackBPMValue + " | Strobe duration: " + duration + "ms | Beat detection threshold: " + threshold + "% | Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
        }
      }, trackBPM_interval);
    }
    bmpMultipliers.addEventListener("click", () => {
      if (isActive == true) {
        clearInterval(trackStrobeTimeout);
        changed = true;
        lastTrackBPMValue = trackBPM_text.value;
        clearInterval(trackStrobeTimeout_changed);
        trackBPM_interval = 60 / lastTrackBPMValue * 1e3;
        trackStrobeTimeout_changed = setInterval(() => {
          analyser.getByteFrequencyData(dataArray);
          let averageAmplitude = 0;
          for (let i = 0; i < dataArray.length; i++) {
            averageAmplitude += dataArray[i];
          }
          averageAmplitude /= dataArray.length;
          console.log(averageAmplitude);
          if (averageAmplitude > threshold) {
            overlay.style.visibility = "visible";
            setTimeout(() => {
              overlay.style.visibility = "hidden";
            }, duration);
            if (staticCycleA.innerHTML == "(CYCLE MODE)") {
              colorsBtn[currentColorIndex].click();
              currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
            }
            ranTimes++;
            console.log("Device: " + inputDevice_text + " | BPM: " + lastTrackBPMValue + " | Strobe duration: " + duration + "ms | Beat detection threshold: " + threshold + "% | Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
          }
        }, trackBPM_interval);
      }
    });
  }
  function killAutoModeStrobes() {
    if (realtimeAnalyzerNode) {
      realtimeAnalyzerNode.disconnect();
      realtimeAnalyzerNode = void 0;
    }
    clearInterval(trackStrobeTimeout);
    clearInterval(trackStrobeTimeout_changed);
    clearInterval(micStrobeTimeout);
    changed = false;
  }
  return { audioContext, TrackSource, analyser, killAutoModeStrobes, trackStrobe, micStrobe };
}
class BeatDetect {
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
  constructor(options = { log: false, perf: false, sampleRate: 44100, round: false, float: 8, lowPassFreq: 150, highPassFreq: 100, bpmRange: [90, 180], timeSignature: 4 }) {
    this.VERSION = "1.0.0";
    this._log = false;
    this._perf = false;
    this._sampleRate = 44100;
    this._round = false;
    this._float = 8;
    this._lowPassFreq = 150;
    this._highPassFreq = 100;
    this._bpmRange = [90, 180];
    this._timeSignature = 4;
    this.count = 0;
    this._ts = {
      current: 0,
      previous: 0,
      first: 0
    };
    this._tapResetId = -1;
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    window.OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    if (!window.AudioContext || !window.OfflineContext) {
      console.error(`BeatDetect.ERROR : Your browser doesn't support the WebAudio API.`);
      return;
    }
    this.VERSION = "1.0.0";
    this._log = options.log || false;
    this._perf = options.perf || false;
    this._sampleRate = options.sampleRate || 44100;
    this._round = options.round || false;
    this._float = options.float || 8;
    this._lowPassFreq = options.lowPassFreq || 150;
    this._highPassFreq = options.highPassFreq || 100;
    this._bpmRange = options.bpmRange || [90, 180];
    this._timeSignature = options.timeSignature || 4;
    this.count = 0;
    this._ts = {
      current: 0,
      previous: 0,
      first: 0
    };
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
  getBeatInfo(options) {
    options.perf = {
      m0: performance.now(),
      // Start beat detection
      m1: 0,
      // Fetch track done
      m2: 0,
      // Offline context rendered
      m3: 0
      // Bpm processing done
    };
    return new Promise((resolve, reject) => {
      this._fetchRawTrack(options).then(this._buildOfflineCtx.bind(this)).then(this._processRenderedBuffer.bind(this)).then(resolve).catch(reject);
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
  _fetchRawTrack(options) {
    return new Promise((resolve, reject) => {
      if (!options) {
        reject("BeatDetect.ERROR : No options object sent to _fetchRawTrack method.");
      } else if (!options.url || !options.perf || typeof options.url !== "string" || typeof options.perf !== "object") {
        reject("BeatDetect.ERROR : Options object sent to _fetchRawTrack method is invalid.");
      } else {
        this._logEvent("log", `Fetch track${options.name ? " " + options.name : ""}.`);
        let request = new XMLHttpRequest();
        request.open("GET", options.url, true);
        request.responseType = "arraybuffer";
        request.onload = () => {
          if (request.status == 404) {
            reject("BeatDetect.ERROR : 404 File not found.");
          }
          options.perf.m1 = performance.now();
          resolve(Object.assign(request, options));
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
  _buildOfflineCtx(options) {
    return new Promise((resolve, reject) => {
      if (!options) {
        reject("BeatDetect.ERROR : No options object sent to _buildOfflineCtx method.");
      } else if (!options.response || !options.perf || typeof options.response !== "object" || typeof options.perf !== "object") {
        reject("BeatDetect.ERROR : Options object sent to _buildOfflineCtx method is invalid.");
      } else {
        this._logEvent("log", "Offline rendering of the track.");
        const audioCtx = new AudioContext();
        audioCtx.decodeAudioData(options.response, (buffer) => {
          const offlineCtx = new window.OfflineContext(2, buffer.duration * this._sampleRate, this._sampleRate);
          const source = offlineCtx.createBufferSource();
          source.buffer = buffer;
          const lowpass = offlineCtx.createBiquadFilter();
          lowpass.type = "lowpass";
          lowpass.frequency.value = this._lowPassFreq;
          lowpass.Q.value = 1;
          const highpass = offlineCtx.createBiquadFilter();
          highpass.type = "highpass";
          highpass.frequency.value = this._highPassFreq;
          highpass.Q.value = 1;
          source.connect(lowpass);
          lowpass.connect(highpass);
          highpass.connect(offlineCtx.destination);
          source.start(0);
          offlineCtx.startRendering();
          offlineCtx.oncomplete = (result) => {
            options.perf.m2 = performance.now();
            resolve(Object.assign(result, options));
          };
        }, (err) => {
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
  _processRenderedBuffer(options) {
    return new Promise((resolve, reject) => {
      if (!options) {
        reject("BeatDetect.ERROR : No options object sent to _processRenderedBuffer method.");
      } else if (!options.renderedBuffer || !options.perf || typeof options.renderedBuffer !== "object" || typeof options.perf !== "object") {
        reject("BeatDetect.ERROR : Options object sent to _processRenderedBuffer method is invalid.");
      } else {
        this._logEvent("log", "Collect beat info.");
        const dataL = options.renderedBuffer.getChannelData(0);
        const dataR = options.renderedBuffer.getChannelData(1);
        const peaks = this._getPeaks([dataL, dataR]);
        const groups = this._getIntervals(peaks);
        var top = groups.sort((intA, intB) => {
          return intB.count - intA.count;
        }).splice(0, 5);
        const offsets = this._getOffsets(dataL, top[0].tempo);
        options.perf.m3 = performance.now();
        this._logEvent("log", "Analysis done.");
        resolve(Object.assign({
          bpm: top[0].tempo,
          offset: this._floatRound(offsets.offset, this._float),
          firstBar: this._floatRound(offsets.firstBar, this._float)
        }, this._perf ? {
          // Assign perf key to return object if user requested it
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
  _getPeaks(data) {
    const partSize = this._sampleRate / 2;
    const parts = data[0].length / partSize;
    let peaks = [];
    for (let i = 0; i < parts; ++i) {
      let max = 0;
      for (let j = i * partSize; j < (i + 1) * partSize; ++j) {
        const volume = Math.max(Math.abs(data[0][j]), Math.abs(data[1][j]));
        if (!max || volume > max.volume) {
          max = {
            position: j,
            volume
          };
        }
      }
      peaks.push(max);
    }
    peaks.sort((a, b) => {
      return b.volume - a.volume;
    });
    peaks = peaks.splice(0, peaks.length * 0.5);
    peaks.sort((a, b) => {
      return a.position - b.position;
    });
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
  _getIntervals(peaks) {
    const groups = [];
    peaks.forEach((peak, index) => {
      for (let i = 1; index + i < peaks.length && i < 10; ++i) {
        const group = {
          tempo: 60 * this._sampleRate / (peaks[index + i].position - peak.position),
          count: 1,
          position: peak.position,
          peaks: []
        };
        while (group.tempo <= this._bpmRange[0]) {
          group.tempo *= 2;
        }
        while (group.tempo > this._bpmRange[1]) {
          group.tempo /= 2;
        }
        if (this._round === true) {
          group.tempo = Math.round(group.tempo);
        } else {
          group.tempo = this._floatRound(group.tempo, this._float);
        }
        const exists = groups.some((interval) => {
          if (interval.tempo === group.tempo) {
            interval.peaks.push(peak);
            ++interval.count;
            return true;
          }
          return false;
        });
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
  _getOffsets(data, bpm) {
    var partSize = this._sampleRate / 2;
    var parts = data.length / partSize;
    var peaks = [];
    for (let i2 = 0; i2 < parts; ++i2) {
      let max = 0;
      for (let j = i2 * partSize; j < (i2 + 1) * partSize; ++j) {
        const volume = data[j];
        if (!max || volume > max.volume) {
          max = {
            position: j - Math.round(60 / bpm * 0.05 * this._sampleRate),
            // Arbitrary offset on the left of the peak about 5% bpm time
            volume
          };
        }
      }
      peaks.push(max);
    }
    const unsortedPeaks = [...peaks];
    peaks.sort((a, b) => {
      return b.volume - a.volume;
    });
    const refOffset = this._getLowestTimeOffset(peaks[0].position, bpm);
    let mean = 0;
    let divider = 0;
    for (let i2 = 0; i2 < peaks.length; ++i2) {
      const offset = this._getLowestTimeOffset(peaks[i2].position, bpm);
      if (offset - refOffset < 0.05 || refOffset - offset > -0.05) {
        mean += offset;
        ++divider;
      }
    }
    let i = 0;
    while (unsortedPeaks[i].volume < 0.02) {
      ++i;
    }
    let firstBar = unsortedPeaks[i].position / this._sampleRate;
    if (firstBar > mean / divider && firstBar < 60 / bpm) {
      firstBar = mean / divider;
    }
    return {
      offset: mean / divider,
      firstBar
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
  _getLowestTimeOffset(position, bpm) {
    const bpmTime = 60 / bpm;
    const firstBeatTime = position / this._sampleRate;
    let offset = firstBeatTime;
    while (offset >= bpmTime) {
      offset -= bpmTime * this._timeSignature;
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
  _getPerfDuration(perf) {
    return {
      total: (perf.m3 - perf.m0) / 1e3,
      fetch: (perf.m1 - perf.m0) / 1e3,
      render: (perf.m2 - perf.m1) / 1e3,
      process: (perf.m3 - perf.m2) / 1e3
    };
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
  tapBpm(options) {
    options.element.addEventListener("click", this._tapBpm.bind(this, options), false);
  }
  /** @method
   * @name _tapBpm
   * @private
   * @memberof BeatDetect
   * @description <blockquote>Internal method to determine manual BPM</blockquote>
   * @param {object} options - The internal options object
   * @param {number} precision - The floating point for result
   * @param {function} callback - The callback function to call each click **/
  _tapBpm(options) {
    window.clearTimeout(this._tapResetId);
    this._ts.current = Date.now();
    if (this._ts.first === 0) {
      this._ts.first = this._ts.current;
    }
    if (this._ts.previous !== 0) {
      let bpm = 6e4 * this.count / (this._ts.current - this._ts.first);
      if (options.precision) {
        bpm = this._floatRound(bpm, options.precision);
      }
      options.callback(bpm);
    }
    this._ts.previous = this._ts.current;
    ++this.count;
    this._tapResetId = window.setTimeout(() => {
      this.count = 0;
      this._ts.current = 0;
      this._ts.previous = 0;
      this._ts.first = 0;
      options.callback("--");
    }, 5e3);
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
  _logEvent(level, string) {
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
  _floatRound(value, precision) {
    const multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }
  /*  --------------------------------------------------------------------------------------------------------------- */
  /*  --------------------------------------------  SETTERS METHODS  -----------------------------------------------  */
  /*  --------------------------------------------------------------------------------------------------------------- */
  /** Set sample rate for analysis.
   * @param {number} sampleRate	**/
  set sampleRate(sampleRate) {
    this._sampleRate = sampleRate;
  }
  /** Set logging in console.
   * @param {boolean} log	**/
  set log(log2) {
    this._log = log2;
  }
  /** Set performance timings in console.
   * @param {boolean} perf	**/
  set perf(perf) {
    this._perf = perf;
  }
  /** Set output rounding.
   * @param {boolean} round	**/
  set round(round) {
    this._round = round;
  }
  /** Set the output floating precision.
   * @param {number} round	**/
  set float(float) {
    this._float = float;
  }
  /** Set the low pass filter cut frequency.
   * @param {number} round	**/
  set lowPassFreq(lowPassFreq) {
    this._lowPassFreq = lowPassFreq;
  }
  /** Set the high pass filter cut frequency.
   * @param {number} round	**/
  set highPassFreq(highPassFreq) {
    this._highPassFreq = highPassFreq;
  }
}
function durationSliderInit() {
  AM_durationOutput.innerHTML = "STROBE DURATION (" + AM_durationSlider.value + " MILISECONDS)";
  AM_durationSlider.oninput = function() {
    AM_durationOutput.innerHTML = "STROBE DURATION (" + AM_durationSlider.value + " MILISECONDS)";
  };
  MM_durationOutput.innerHTML = "STROBE DURATION (" + MM_durationSlider.value + " MILISECONDS)";
  MM_durationSlider.oninput = function() {
    MM_durationOutput.innerHTML = "STROBE DURATION (" + MM_durationSlider.value + " MILISECONDS)";
  };
}
function frequencyRangeFocusInit() {
  var selectedRange = "master";
  lowBtn.addEventListener("click", () => {
    if (selectedRange == "mid" || selectedRange == "high" || selectedRange == "master") {
      selectedRange = "low";
      lowBtn.classList.add("text-themeOrange");
      lowBtn.classList.remove("text-gray-700");
      lowBtn.classList.remove("hover:scale-1125");
      lowBtn.setAttribute("disabled", "true");
      midBtn.classList.add("text-gray-700");
      midBtn.classList.add("hover:scale-1125");
      midBtn.classList.remove("text-themeOrange");
      highBtn.classList.add("text-gray-700");
      highBtn.classList.add("hover:scale-1125");
      highBtn.classList.remove("text-themeOrange");
      masterBtn.classList.add("text-gray-700");
      masterBtn.classList.add("hover:scale-1125");
      masterBtn.classList.remove("text-themeOrange");
      midBtn.removeAttribute("disabled");
      highBtn.removeAttribute("disabled");
      masterBtn.removeAttribute("disabled");
    }
  });
  midBtn.addEventListener("click", () => {
    if (selectedRange == "low" || selectedRange == "high" || selectedRange == "master") {
      selectedRange = "mid";
      midBtn.classList.add("text-themeOrange");
      midBtn.classList.remove("text-gray-700");
      midBtn.classList.remove("hover:scale-1125");
      midBtn.setAttribute("disabled", "true");
      lowBtn.classList.add("text-gray-700");
      lowBtn.classList.add("hover:scale-1125");
      lowBtn.classList.remove("text-themeOrange");
      highBtn.classList.add("text-gray-700");
      highBtn.classList.add("hover:scale-1125");
      highBtn.classList.remove("text-themeOrange");
      masterBtn.classList.add("text-gray-700");
      masterBtn.classList.add("hover:scale-1125");
      masterBtn.classList.remove("text-themeOrange");
      lowBtn.removeAttribute("disabled");
      highBtn.removeAttribute("disabled");
      masterBtn.removeAttribute("disabled");
    }
  });
  highBtn.addEventListener("click", () => {
    if (selectedRange == "low" || selectedRange == "mid" || selectedRange == "master") {
      selectedRange = "high";
      highBtn.classList.add("text-themeOrange");
      highBtn.classList.remove("text-gray-700");
      highBtn.classList.remove("hover:scale-1125");
      highBtn.setAttribute("disabled", "true");
      lowBtn.classList.add("text-gray-700");
      lowBtn.classList.add("hover:scale-1125");
      lowBtn.classList.remove("text-themeOrange");
      midBtn.classList.add("text-gray-700");
      midBtn.classList.add("hover:scale-1125");
      midBtn.classList.remove("text-themeOrange");
      masterBtn.classList.add("text-gray-700");
      masterBtn.classList.add("hover:scale-1125");
      masterBtn.classList.remove("text-themeOrange");
      lowBtn.removeAttribute("disabled");
      midBtn.removeAttribute("disabled");
      masterBtn.removeAttribute("disabled");
    }
  });
  masterBtn.addEventListener("click", () => {
    if (selectedRange == "low" || selectedRange == "mid" || selectedRange == "high") {
      selectedRange = "master";
      masterBtn.classList.add("text-themeOrange");
      masterBtn.classList.remove("text-gray-700");
      masterBtn.classList.remove("hover:scale-1125");
      masterBtn.setAttribute("disabled", "true");
      lowBtn.classList.add("text-gray-700");
      lowBtn.classList.add("hover:scale-1125");
      lowBtn.classList.remove("text-themeOrange");
      midBtn.classList.add("text-gray-700");
      midBtn.classList.add("hover:scale-1125");
      midBtn.classList.remove("text-themeOrange");
      highBtn.classList.add("text-gray-700");
      highBtn.classList.add("hover:scale-1125");
      highBtn.classList.remove("text-themeOrange");
      lowBtn.removeAttribute("disabled");
      midBtn.removeAttribute("disabled");
      highBtn.removeAttribute("disabled");
    }
  });
}
function fullscreenInit() {
  let fs = false;
  fullscreenBtn.addEventListener("click", () => {
    if (fs == false) {
      document.documentElement.requestFullscreen();
      fs = true;
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fs = false;
      fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
  });
}
function inputDevicesInit() {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
    return navigator.mediaDevices.enumerateDevices();
  }).then((devices) => {
    devices.forEach((device) => {
      if (device.kind === "audioinput") {
        const deviceOption = document.createElement("option");
        deviceOption.value = device.deviceId;
        deviceOption.text = device.label;
        deviceOption.classList.add("text-left");
        inputDevice.add(deviceOption);
      }
    });
  }).catch((error) => {
    toastr["error"]("Failed to enumerate audio input devices.", "Device error");
    toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-right",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    console.log(error);
  });
}
function internalPlayerInit() {
  var blob = window.URL || window.webkitURL;
  if (!blob) {
    console.log("Your browser does not support Blob URL's.");
  }
  const beatDetect = new BeatDetect({
    sampleRate: 44100,
    // Most track are using this sample rate
    log: false,
    // Debug BeatDetect execution with logs
    perf: false,
    // Attach elapsed time to result object
    round: false,
    // To have an integer result for the BPM
    float: 4,
    // The floating precision in [1, Infinity]
    lowPassFreq: 150,
    // Low pass filter cut frequency
    highPassFreq: 100,
    // High pass filter cut frequency
    bpmRange: [90, 180],
    // The BPM range to output
    timeSignature: 4
    // The number of beat in a measure
  });
  let file;
  let fileURL;
  let trackBPM;
  playerFile.addEventListener("change", () => {
    file = playerFile.files[0];
    fileURL = blob.createObjectURL(file);
    console.log(file);
    console.log("File name: " + file.name);
    console.log("File type: " + file.type);
    console.log("File BlobURL: " + fileURL);
    internalPlayer.src = fileURL;
    nowPlaying.innerHTML = "<b>Playing: </b>" + file.name;
    nowPlaying.removeAttribute("hidden");
    inputDevice.selectedIndex = 1;
    if (!trackBPM) {
      micLoaderContainer.removeAttribute("hidden");
      micLoaderLabel.removeAttribute("hidden");
      AM_onBtn.setAttribute("disabled", "true");
    }
    beatDetect.getBeatInfo({
      url: fileURL
    }).then((info) => {
      trackBPM = Math.round(info.bpm);
      console.log("Track BPM (average): " + info.bpm);
      console.log("Track BPM (rounded): " + trackBPM);
      console.log("Offset: " + info.offset);
      console.log("First Bar: " + info.firstBar);
      trackBPM_text.value = trackBPM;
      micLoaderContainer.setAttribute("hidden", "true");
      micLoaderLabel.setAttribute("hidden", "true");
      AM_onBtn.removeAttribute("disabled");
      avgAmplitudeLabel.removeAttribute("hidden");
      avgAmplitude.removeAttribute("hidden");
      bmpMultipliersLabel.removeAttribute("hidden");
      bmpMultipliers.removeAttribute("hidden");
      bpmDivSpan.innerHTML = String(trackBPM);
      eject.removeAttribute("hidden");
      toastr["success"]("The loaded track's BPM has finished calculating. You can now turn on the strobe.", "BPM Found");
      toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    }).catch((error) => {
      console.log(error);
      micLoaderContainer.setAttribute("hidden", "true");
      micLoaderLabel.setAttribute("hidden", "true");
      toastr["error"](error, "BPM error");
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    });
  });
  eject.addEventListener("click", () => {
    playerFile.value = "";
    internalPlayer.src = "";
    nowPlaying.setAttribute("hidden", "true");
    eject.setAttribute("hidden", "true");
    bpmDivSpan.innerHTML = "---";
    avgAmplitude.innerHTML = "0";
    avgAmplitudeLabel.setAttribute("hidden", "true");
    avgAmplitude.setAttribute("hidden", "true");
    bmpMultipliersLabel.setAttribute("hidden", "true");
    bmpMultipliers.setAttribute("hidden", "true");
    AM_offBtn.click();
  });
  showHideA.addEventListener("click", () => {
    if (showHideA.innerHTML == "(HIDE)") {
      internalPlayerContainer.setAttribute("hidden", "true");
      showHideA.innerHTML = "(SHOW)";
    } else {
      internalPlayerContainer.removeAttribute("hidden");
      showHideA.innerHTML = "(HIDE)";
    }
  });
  halfspeedBtn.addEventListener("click", () => {
    trackBPM = trackBPM / 2;
    trackBPM_text.value = trackBPM;
    bpmDivSpan.innerHTML = String(trackBPM);
  });
  doublespeedBtn.addEventListener("click", () => {
    trackBPM = trackBPM * 2;
    trackBPM_text.value = trackBPM;
    bpmDivSpan.innerHTML = String(trackBPM);
  });
  return {
    getFile() {
      return file;
    },
    getTrackBPM() {
      return trackBPM;
    }
  };
}
function manualModeInit() {
  manualBtn.addEventListener("click", () => {
    manualModeContainer.removeAttribute("hidden");
    autoModeContainer.setAttribute("hidden", "true");
    manualBtn.setAttribute("disabled", "true");
    autoBtn.removeAttribute("disabled");
    AM_offBtn.click();
    manualBtn.classList.remove("text-gray-700");
    manualBtn.classList.remove("hover:scale-1125");
    manualBtn.classList.add("text-themeOrange");
    autoBtn.classList.remove("text-themeOrange");
    autoBtn.classList.add("text-text-gray-700");
    autoBtn.classList.add("hover:scale-1125");
  });
  var BPMvalueSource = "manual";
  useManualBtn.addEventListener("click", () => {
    useManualBtn.setAttribute("disabled", "true");
    useTapBtn.removeAttribute("disabled");
    useManualBtn.classList.remove("text-gray-700");
    useManualBtn.classList.remove("hover:scale-1050");
    useManualBtn.classList.add("text-themeOrange");
    useTapBtn.classList.remove("text-themeOrange");
    useTapBtn.classList.add("text-text-gray-700");
    useTapBtn.classList.add("hover:scale-1050");
    mmOffBtn.click();
    BPMvalueSource = "manual";
  });
  useTapBtn.addEventListener("click", () => {
    useTapBtn.setAttribute("disabled", "true");
    useManualBtn.removeAttribute("disabled");
    useTapBtn.classList.remove("text-gray-700");
    useTapBtn.classList.remove("hover:scale-1050");
    useTapBtn.classList.add("text-themeOrange");
    useManualBtn.classList.remove("text-themeOrange");
    useManualBtn.classList.add("text-text-gray-700");
    useManualBtn.classList.add("hover:scale-1050");
    mmOffBtn.click();
    BPMvalueSource = "tap";
  });
  return {
    getBPMvalueSource() {
      return BPMvalueSource;
    }
  };
}
function manualModeStrobesInit(getBPMvalueSource) {
  var manualBPM_interval = 0;
  var tapBPM_interval = 0;
  var changed = false;
  var isActive = false;
  var manualStrobeTimeout;
  var manualStrobeTimeout_changed;
  var tapStrobeTimeout;
  var tapStrobeTimeout_changed;
  let currentColorIndex = 0;
  colorsBtn.forEach((button, index) => {
    button.addEventListener("click", () => {
      currentColorIndex = index;
    });
  });
  var duration = 100;
  MM_durationSlider.addEventListener("input", () => {
    duration = MM_durationSlider.value;
  }, false);
  mmOffBtn.addEventListener("click", () => {
    isActive = false;
  });
  mmOnBtn.addEventListener("click", () => {
    isActive = true;
  });
  function manualStrobe() {
    let lastManualBPMValue = manualBPM_text.value;
    var ranTimes = 0;
    if (changed == false) {
      manualBPM_interval = 60 / lastManualBPMValue * 1e3;
      manualStrobeTimeout = setInterval(() => {
        overlay.style.visibility = "visible";
        setTimeout(() => {
          overlay.style.visibility = "hidden";
        }, duration);
        if (staticCycleA.innerHTML == "(CYCLE MODE)") {
          colorsBtn[currentColorIndex].click();
          currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
        }
        ranTimes++;
        console.log("BPM: " + lastManualBPMValue + " (source: " + getBPMvalueSource() + ") | Strobe duration: " + duration + "ms | Times ran: " + ranTimes + " | Changed = " + changed);
      }, manualBPM_interval);
    }
    manualBPM_text.addEventListener("change", () => {
      if (manualBPM_text.value <= 0) {
        toastr["error"]("Negative or null BPM values are not allowed.", "BPM error");
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
      } else {
        if (isActive == true) {
          clearInterval(manualStrobeTimeout);
          changed = true;
          lastManualBPMValue = manualBPM_text.value;
          clearInterval(manualStrobeTimeout_changed);
          manualBPM_interval = 60 / lastManualBPMValue * 1e3;
          manualStrobeTimeout_changed = setInterval(() => {
            overlay.style.visibility = "visible";
            setTimeout(() => {
              overlay.style.visibility = "hidden";
            }, duration);
            if (staticCycleA.innerHTML == "(CYCLE MODE)") {
              colorsBtn[currentColorIndex].click();
              currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
            }
            ranTimes++;
            console.log("BPM: " + lastManualBPMValue + " (source: " + getBPMvalueSource() + ") | Strobe duration: " + duration + "ms | Times ran: " + ranTimes + " | Changed = " + changed);
          }, manualBPM_interval);
        }
      }
    }, false);
  }
  function tapStrobe() {
    tapBPM_text.addEventListener("change", handleTapBPM(), false);
  }
  function handleTapBPM() {
    if (circularRefs.getStrobeActive()) {
      clearInterval(tapStrobeTimeout);
      let lastTapBPMValue = tapBPM_text.value;
      var ranTimes = 0;
      clearInterval(tapStrobeTimeout_changed);
      tapBPM_interval = 60 / lastTapBPMValue * 1e3;
      tapStrobeTimeout_changed = setInterval(() => {
        overlay.style.visibility = "visible";
        setTimeout(() => {
          overlay.style.visibility = "hidden";
        }, duration);
        if (staticCycleA.innerHTML == "(CYCLE MODE)") {
          colorsBtn[currentColorIndex].click();
          currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
        }
        ranTimes++;
        console.log("BPM: " + lastTapBPMValue + " (source: " + getBPMvalueSource() + ") | Strobe duration: " + duration + "ms | Times ran: " + ranTimes);
      }, tapBPM_interval);
    }
  }
  function killManualModeStrobes() {
    clearInterval(manualStrobeTimeout_changed);
    clearInterval(manualStrobeTimeout);
    clearInterval(tapStrobeTimeout_changed);
    clearInterval(tapStrobeTimeout);
    changed = false;
  }
  return { killManualModeStrobes, manualStrobe, tapStrobe, handleTapBPM };
}
function offBtnInit(killAutoModeStrobes, killManualModeStrobes) {
  AM_offBtn.addEventListener("click", () => {
    AM_offBtn.setAttribute("disabled", "true");
    AM_onBtn.removeAttribute("disabled");
    AM_offBtn.classList.remove("text-gray-700");
    AM_offBtn.classList.remove("hover:scale-1125");
    AM_offBtn.classList.add("text-themeOrange");
    AM_onBtn.classList.add("text-gray-700");
    AM_onBtn.classList.add("hover:scale-1125");
    AM_onBtn.classList.remove("text-themeOrange");
    killAutoModeStrobes();
    if (playPauseCheck.checked) {
      internalPlayer.pause();
    }
  });
  mmOffBtn.addEventListener("click", () => {
    mmOffBtn.setAttribute("disabled", "true");
    mmOnBtn.removeAttribute("disabled");
    resetTapperBtn_a.innerHTML = "(RESET)";
    resetTapperBtn_h.removeAttribute("disabled");
    resetTapperBtn_a.removeAttribute("disabled");
    mmOffBtn.classList.remove("text-gray-700");
    mmOffBtn.classList.remove("hover:scale-1125");
    mmOffBtn.classList.add("text-themeOrange");
    mmOnBtn.classList.add("text-gray-700");
    mmOnBtn.classList.add("hover:scale-1125");
    mmOnBtn.classList.remove("text-themeOrange");
    resetTapperBtn_h.classList.add("cursor-pointer");
    resetTapperBtn_h.classList.add("hover:text-themeOrange");
    killManualModeStrobes();
    if (internalPlayer.src && playPauseCheck.checked && !internalPlayer.paused) {
      internalPlayer.pause();
    }
  });
}
function onBtnInit(getFile, getTrackBPM, trackStrobe, micStrobe, getBPMvalueSource, manualStrobe, tapStrobe) {
  let strobeActive = false;
  AM_onBtn.addEventListener("click", () => {
    if (inputDevice.selectedIndex == 0) {
      toastr["error"]("No input device selected.", "Device error");
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    } else if (inputDevice.selectedIndex == 1) {
      if (!getFile()) {
        toastr["error"]("No file loaded on internal player.", "Player error");
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
      } else if (!getTrackBPM()) {
        toastr["error"]("Unable to read track BPM.", "Player error");
        toastr.options = {
          "closeButton": true,
          "debug": false,
          "newestOnTop": false,
          "progressBar": true,
          "positionClass": "toast-top-right",
          "preventDuplicates": false,
          "onclick": null,
          "showDuration": "300",
          "hideDuration": "1000",
          "timeOut": "5000",
          "extendedTimeOut": "1000",
          "showEasing": "swing",
          "hideEasing": "linear",
          "showMethod": "fadeIn",
          "hideMethod": "fadeOut"
        };
      } else {
        AM_onBtn.setAttribute("disabled", "true");
        AM_offBtn.removeAttribute("disabled");
        AM_onBtn.classList.remove("text-gray-700");
        AM_onBtn.classList.remove("hover:scale-1125");
        AM_onBtn.classList.add("text-themeOrange");
        AM_offBtn.classList.add("text-gray-700");
        AM_offBtn.classList.add("hover:scale-1125");
        AM_offBtn.classList.remove("text-themeOrange");
        trackStrobe();
        if (playPauseCheck.checked) {
          internalPlayer.play();
        }
      }
    } else {
      AM_onBtn.setAttribute("disabled", "true");
      AM_offBtn.removeAttribute("disabled");
      AM_onBtn.classList.remove("text-gray-700");
      AM_onBtn.classList.remove("hover:scale-1125");
      AM_onBtn.classList.add("text-themeOrange");
      AM_offBtn.classList.add("text-gray-700");
      AM_offBtn.classList.add("hover:scale-1125");
      AM_offBtn.classList.remove("text-themeOrange");
      strobeActive = true;
      const checkTempoDetected = setInterval(() => {
        if (micBPM_text.value > 0) {
          clearInterval(checkTempoDetected);
          micStrobe();
        }
      }, 100);
    }
  });
  manualBPM_text.addEventListener("change", () => {
    manualBPM_text.classList.add("clicked");
  });
  mmOnBtn.addEventListener("click", () => {
    if (!manualBPM_text.classList.contains("clicked") && getBPMvalueSource() == "manual") {
      toastr["error"]("Please insert a BPM value or use the tempo tapper.", "BPM error");
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    } else if (manualBPM_text.value <= 0 && getBPMvalueSource() == "manual") {
      toastr["error"]("Negative or null BPM values are not allowed.", "BPM error");
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    } else if (!circularRefs.getTapBPM() && getBPMvalueSource() == "tap") {
      toastr["error"]("Please use the tempo tapper or insert a BPM value.", "BPM error");
      toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
      };
    } else {
      mmOnBtn.setAttribute("disabled", "true");
      mmOffBtn.removeAttribute("disabled");
      resetTapperBtn_a.innerHTML = "(TURN OFF TO RESET)";
      resetTapperBtn_h.setAttribute("disabled", "true");
      resetTapperBtn_a.setAttribute("disabled", "true");
      mmOnBtn.classList.remove("text-gray-700");
      mmOnBtn.classList.remove("hover:scale-1125");
      mmOnBtn.classList.add("text-themeOrange");
      mmOffBtn.classList.add("text-gray-700");
      mmOffBtn.classList.add("hover:scale-1125");
      mmOffBtn.classList.remove("text-themeOrange");
      resetTapperBtn_h.classList.remove("cursor-pointer");
      resetTapperBtn_h.classList.remove("hover:text-themeOrange");
      strobeActive = true;
      if (getBPMvalueSource() == "manual") {
        manualStrobe();
      } else if (getBPMvalueSource() == "tap") {
        tapStrobe();
      }
      if (internalPlayer.src && playPauseCheck.checked && internalPlayer.paused) {
        internalPlayer.play();
      }
    }
  });
  mmOffBtn.addEventListener("click", () => {
    strobeActive = false;
  });
  circularRefs.getStrobeActive = () => {
    return strobeActive;
  };
}
function opencloseSidebarInit() {
  let isOpen = false;
  btnOpenCloseSidebar.addEventListener("click", () => {
    if (isOpen === true) {
      isOpen = false;
      sidebarContainer.classList.add("left-[-400px]");
      btnOpenCloseSidebar.classList.remove("left-[305px]", "sm:left-400px", "absolute");
      btnOpenCloseSidebar.classList.add("left-0", "fixed");
      btnOpenCloseSidebar.innerHTML = '<i class="fa-solid fa-caret-right"></i>';
      fullscreenBtn.classList.remove("left-[305px]", "sm:left-400px", "absolute");
      fullscreenBtn.classList.add("left-0", "fixed");
      document.getElementById("main").classList.remove("ml-400px");
      document.getElementById("main").classList.add("ml-0");
      document.getElementById("main-logo").removeAttribute("hidden");
    } else {
      isOpen = true;
      document.getElementById("sidebar-container").classList.remove("left-[-400px]");
      btnOpenCloseSidebar.classList.add("left-[305px]", "sm:left-400px", "absolute");
      btnOpenCloseSidebar.classList.remove("left-0", "fixed");
      btnOpenCloseSidebar.innerHTML = '<i class="fa-solid fa-caret-left"></i>';
      document.getElementById("fullscreen-btn").classList.add("left-[305px]", "sm:left-400px", "absolute");
      document.getElementById("fullscreen-btn").classList.remove("left-0", "fixed");
      document.getElementById("main").classList.remove("ml-0");
      document.getElementById("main").classList.add("ml-400px");
      document.getElementById("main-logo").setAttribute("hidden", "true");
    }
  });
  closeModalBtn.addEventListener("click", () => {
    isOpen = true;
    document.getElementById("sidebar-container").classList.remove("left-[-400px]");
    btnOpenCloseSidebar.classList.add("left-[305px]", "sm:left-400px", "absolute");
    btnOpenCloseSidebar.classList.remove("left-0", "fixed");
    btnOpenCloseSidebar.innerHTML = '<i class="fa-solid fa-caret-left"></i>';
    document.getElementById("fullscreen-btn").classList.add("left-[305px]", "sm:left-400px", "absolute");
    document.getElementById("fullscreen-btn").classList.remove("left-0", "fixed");
    document.getElementById("main").classList.remove("ml-0");
    document.getElementById("main").classList.add("ml-400px");
    document.getElementById("main-logo").setAttribute("hidden", "true");
  });
}
function sidebarScrollInit() {
  let selectedMode = "auto";
  autoBtn.addEventListener("click", () => {
    selectedMode = "auto";
  });
  manualBtn.addEventListener("click", () => {
    selectedMode = "manual";
  });
  var playerHidden = false;
  showHideA.addEventListener("click", () => {
    if (showHideA.innerHTML === "(HIDE)") {
      playerHidden = true;
    } else {
      playerHidden = false;
    }
  });
  window.addEventListener("load", scrollPoints);
  window.addEventListener("resize", scrollPoints);
  autoBtn.addEventListener("click", scrollPoints);
  manualBtn.addEventListener("click", scrollPoints);
  function scrollPoints() {
    if (selectedMode === "auto") {
      if (playerHidden === false && window.innerHeight <= 1150) {
        document.getElementById("AM-bottom-position-container").classList.remove("absolute");
      } else if (playerHidden === true && window.innerHeight <= 1010) {
        document.getElementById("AM-bottom-position-container").classList.remove("absolute");
      } else {
        document.getElementById("AM-bottom-position-container").classList.add("absolute");
      }
    }
    if (selectedMode === "manual") {
      if (playerHidden === false && window.innerHeight <= 930) {
        document.getElementById("MM-bottom-position-container").classList.remove("absolute");
      } else if (playerHidden === true && window.innerHeight <= 790) {
        document.getElementById("MM-bottom-position-container").classList.remove("absolute");
      } else {
        document.getElementById("MM-bottom-position-container").classList.add("absolute");
      }
    }
  }
}
function strobeColorsInit() {
  let selectedColor = "white";
  whiteBtn.addEventListener("click", () => {
    if (selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
      selectedColor = "white";
      whiteBtn.classList.add("border-2");
      whiteBtn.classList.add("border-themeOrange");
      whiteBtn.classList.remove("hover:scale-1100");
      whiteBtn.setAttribute("disbled", "true");
      redBtn.classList.add("hover:scale-1100");
      redBtn.classList.remove("border-2");
      redBtn.classList.remove("border-themeOrange");
      greenBtn.classList.add("hover:scale-1100");
      greenBtn.classList.remove("border-2");
      greenBtn.classList.remove("border-themeOrange");
      blueBtn.classList.add("hover:scale-1100");
      blueBtn.classList.remove("border-2");
      blueBtn.classList.remove("border-themeOrange");
      purpleBtn.classList.add("hover:scale-1100");
      purpleBtn.classList.remove("border-2");
      purpleBtn.classList.remove("border-themeOrange");
      yellowBtn.classList.add("hover:scale-1100");
      yellowBtn.classList.remove("border-2");
      yellowBtn.classList.remove("border-themeOrange");
      redBtn.removeAttribute("disabled");
      greenBtn.removeAttribute("disabled");
      blueBtn.removeAttribute("disabled");
      purpleBtn.removeAttribute("disabled");
      yellowBtn.removeAttribute("disabled");
      overlay.className = "w-full h-full absolute";
      overlay.classList.add("bg-white");
    }
  });
  redBtn.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
      selectedColor = "red";
      redBtn.classList.add("border-2");
      redBtn.classList.add("border-themeOrange");
      redBtn.classList.remove("hover:scale-1100");
      redBtn.setAttribute("disbled", "true");
      whiteBtn.classList.add("hover:scale-1100");
      whiteBtn.classList.remove("border-2");
      whiteBtn.classList.remove("border-themeOrange");
      greenBtn.classList.add("hover:scale-1100");
      greenBtn.classList.remove("border-2");
      greenBtn.classList.remove("border-themeOrange");
      blueBtn.classList.add("hover:scale-1100");
      blueBtn.classList.remove("border-2");
      blueBtn.classList.remove("border-themeOrange");
      purpleBtn.classList.add("hover:scale-1100");
      purpleBtn.classList.remove("border-2");
      purpleBtn.classList.remove("border-themeOrange");
      yellowBtn.classList.add("hover:scale-1100");
      yellowBtn.classList.remove("border-2");
      yellowBtn.classList.remove("border-themeOrange");
      whiteBtn.removeAttribute("disabled");
      greenBtn.removeAttribute("disabled");
      blueBtn.removeAttribute("disabled");
      purpleBtn.removeAttribute("disabled");
      yellowBtn.removeAttribute("disabled");
      overlay.className = "w-full h-full absolute";
      overlay.classList.add("bg-red-700");
    }
  });
  greenBtn.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "red" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
      selectedColor = "green";
      greenBtn.classList.add("border-2");
      greenBtn.classList.add("border-themeOrange");
      greenBtn.classList.remove("hover:scale-1100");
      greenBtn.setAttribute("disbled", "true");
      whiteBtn.classList.add("hover:scale-1100");
      whiteBtn.classList.remove("border-2");
      whiteBtn.classList.remove("border-themeOrange");
      redBtn.classList.add("hover:scale-1100");
      redBtn.classList.remove("border-2");
      redBtn.classList.remove("border-themeOrange");
      blueBtn.classList.add("hover:scale-1100");
      blueBtn.classList.remove("border-2");
      blueBtn.classList.remove("border-themeOrange");
      purpleBtn.classList.add("hover:scale-1100");
      purpleBtn.classList.remove("border-2");
      purpleBtn.classList.remove("border-themeOrange");
      yellowBtn.classList.add("hover:scale-1100");
      yellowBtn.classList.remove("border-2");
      yellowBtn.classList.remove("border-themeOrange");
      whiteBtn.removeAttribute("disabled");
      redBtn.removeAttribute("disabled");
      blueBtn.removeAttribute("disabled");
      purpleBtn.removeAttribute("disabled");
      yellowBtn.removeAttribute("disabled");
      overlay.className = "w-full h-full absolute";
      overlay.classList.add("bg-green-500");
    }
  });
  blueBtn.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "purple" || selectedColor == "yellow") {
      selectedColor = "blue";
      blueBtn.classList.add("border-2");
      blueBtn.classList.add("border-themeOrange");
      blueBtn.classList.remove("hover:scale-1100");
      blueBtn.setAttribute("disbled", "true");
      whiteBtn.classList.add("hover:scale-1100");
      whiteBtn.classList.remove("border-2");
      whiteBtn.classList.remove("border-themeOrange");
      redBtn.classList.add("hover:scale-1100");
      redBtn.classList.remove("border-2");
      redBtn.classList.remove("border-themeOrange");
      greenBtn.classList.add("hover:scale-1100");
      greenBtn.classList.remove("border-2");
      greenBtn.classList.remove("border-themeOrange");
      purpleBtn.classList.add("hover:scale-1100");
      purpleBtn.classList.remove("border-2");
      purpleBtn.classList.remove("border-themeOrange");
      yellowBtn.classList.add("hover:scale-1100");
      yellowBtn.classList.remove("border-2");
      yellowBtn.classList.remove("border-themeOrange");
      whiteBtn.removeAttribute("disabled");
      redBtn.removeAttribute("disabled");
      greenBtn.removeAttribute("disabled");
      purpleBtn.removeAttribute("disabled");
      yellowBtn.removeAttribute("disabled");
      overlay.className = "w-full h-full absolute";
      overlay.classList.add("bg-blue-600");
    }
  });
  purpleBtn.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "yellow") {
      selectedColor = "purple";
      purpleBtn.classList.add("border-2");
      purpleBtn.classList.add("border-themeOrange");
      purpleBtn.classList.remove("hover:scale-1100");
      purpleBtn.setAttribute("disbled", "true");
      whiteBtn.classList.add("hover:scale-1100");
      whiteBtn.classList.remove("border-2");
      whiteBtn.classList.remove("border-themeOrange");
      redBtn.classList.add("hover:scale-1100");
      redBtn.classList.remove("border-2");
      redBtn.classList.remove("border-themeOrange");
      greenBtn.classList.add("hover:scale-1100");
      greenBtn.classList.remove("border-2");
      greenBtn.classList.remove("border-themeOrange");
      blueBtn.classList.add("hover:scale-1100");
      blueBtn.classList.remove("border-2");
      blueBtn.classList.remove("border-themeOrange");
      yellowBtn.classList.add("hover:scale-1100");
      yellowBtn.classList.remove("border-2");
      yellowBtn.classList.remove("border-themeOrange");
      whiteBtn.removeAttribute("disabled");
      redBtn.removeAttribute("disabled");
      greenBtn.removeAttribute("disabled");
      blueBtn.removeAttribute("disabled");
      yellowBtn.removeAttribute("disabled");
      overlay.className = "w-full h-full absolute";
      overlay.classList.add("bg-purple-700");
    }
  });
  yellowBtn.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple") {
      selectedColor = "yellow";
      yellowBtn.classList.add("border-2");
      yellowBtn.classList.add("border-themeOrange");
      yellowBtn.classList.remove("hover:scale-1100");
      yellowBtn.setAttribute("disbled", "true");
      whiteBtn.classList.add("hover:scale-1100");
      whiteBtn.classList.remove("border-2");
      whiteBtn.classList.remove("border-themeOrange");
      redBtn.classList.add("hover:scale-1100");
      redBtn.classList.remove("border-2");
      redBtn.classList.remove("border-themeOrange");
      greenBtn.classList.add("hover:scale-1100");
      greenBtn.classList.remove("border-2");
      greenBtn.classList.remove("border-themeOrange");
      blueBtn.classList.add("hover:scale-1100");
      blueBtn.classList.remove("border-2");
      blueBtn.classList.remove("border-themeOrange");
      purpleBtn.classList.add("hover:scale-1100");
      purpleBtn.classList.remove("border-2");
      purpleBtn.classList.remove("border-themeOrange");
      whiteBtn.removeAttribute("disabled");
      redBtn.removeAttribute("disabled");
      greenBtn.removeAttribute("disabled");
      blueBtn.removeAttribute("disabled");
      purpleBtn.removeAttribute("disabled");
      overlay.className = "w-full h-full absolute";
      overlay.classList.add("bg-yellow-300");
    }
  });
  staticCycleA.addEventListener("click", () => {
    if (staticCycleA.innerHTML == "(STATIC MODE)") {
      staticCycleA.innerHTML = "(CYCLE MODE)";
    } else {
      staticCycleA.innerHTML = "(STATIC MODE)";
    }
  });
}
function tempoTapInit(handleTapBPM) {
  const beatDetect = new BeatDetect({
    sampleRate: 44100,
    // Most track are using this sample rate
    log: false,
    // Debug BeatDetect execution with logs
    perf: false,
    // Attach elapsed time to result object
    round: false,
    // To have an integer result for the BPM
    float: 4,
    // The floating precision in [1, Infinity]
    lowPassFreq: 150,
    // Low pass filter cut frequency
    highPassFreq: 100,
    // High pass filter cut frequency
    bpmRange: [50, 200],
    // The BPM range to output
    timeSignature: 4
    // The number of beats in a measure
  });
  resetTapperBtn_a.addEventListener("click", () => {
    if (!circularRefs.getStrobeActive()) {
      tapBPM = 0;
      avgValue.innerHTML = "--- BPM";
      roundedValue.innerHTML = "--- BPM";
      tapBPM_text.value = 0;
    }
  });
  let tapBPM = 0;
  let lastBPM = 0;
  let currentBPM = 0;
  beatDetect.tapBpm({
    element: tapBtn,
    precision: 4,
    // Floating point for result
    callback: (bpm) => {
      console.log(bpm);
      if (bpm === "--") {
        avgValue.innerHTML = lastBPM + " BPM";
        roundedValue.innerHTML = tapBPM + " BPM";
        return;
      }
      lastBPM = currentBPM;
      currentBPM = bpm;
      tapBPM = Math.round(lastBPM);
      avgValue.innerHTML = lastBPM + " BPM";
      roundedValue.innerHTML = tapBPM + " BPM";
      tapBPM_text.value = tapBPM;
      if (circularRefs.getStrobeActive()) {
        handleTapBPM();
      }
    }
  });
  circularRefs.getTapBPM = () => tapBPM;
}
function thresholdSliderInit() {
  var thresholdSlider = document.getElementById("threshold-slider");
  var sensOutput = document.getElementById("sens-label");
  sensOutput.innerHTML = "BEAT DETECTION THRESHOLD (" + thresholdSlider.value + "%)";
  thresholdSlider.oninput = function() {
    sensOutput.innerHTML = "BEAT DETECTION THRESHOLD (" + thresholdSlider.value + "%)";
  };
}
function warningInit(initApp2) {
  closeModalBtn.addEventListener("click", async () => {
    await initApp2();
    document.getElementById("modal-container").style.visibility = "hidden";
    closeModalBtn.style.visibility = "hidden";
    document.getElementById("opencloseSidebar").classList.add("hover:scale-1125", "hover:opacity-100");
    document.getElementById("opencloseSidebar").classList.remove("blur-sm");
    document.getElementById("opencloseSidebar").removeAttribute("disabled");
    document.getElementById("fullscreen-btn").classList.add("hover:scale-1125", "hover:opacity-100");
    document.getElementById("fullscreen-btn").classList.remove("blur-sm");
    document.getElementById("fullscreen-btn").removeAttribute("disabled");
    document.getElementById("main-logo").classList.add("hover:opacity-100");
    document.getElementById("main-logo").classList.remove("blur-sm");
  });
}
const symbol = "/assets/symbol-613461b6.png";
const logoHorizontalBlack = "/assets/logo-horizontal-black-69e5891a.png";
const logoHorizontalWhite = "/assets/logo-horizontal-white-7788fc8b.png";
const logoBlack = "/assets/logo-black-8eb64648.png";
logoBlack_Img.src = logoBlack;
opencloseSidebarInit();
sidebarScrollInit();
warningInit(initApp);
async function initApp() {
  symbol_Img.src = symbol;
  logoHorizontalBlack_Img.src = logoHorizontalBlack;
  logoHorizontalWhite_Img.src = logoHorizontalWhite;
  const {
    audioContext,
    TrackSource,
    analyser,
    killAutoModeStrobes,
    trackStrobe,
    micStrobe
  } = await autoModeStrobesInit();
  await autoModeInit(audioContext, TrackSource, analyser);
  durationSliderInit();
  frequencyRangeFocusInit();
  fullscreenInit();
  inputDevicesInit();
  const { getFile, getTrackBPM } = internalPlayerInit();
  const { getBPMvalueSource } = manualModeInit();
  const { killManualModeStrobes, manualStrobe, tapStrobe, handleTapBPM } = manualModeStrobesInit(getBPMvalueSource);
  offBtnInit(killAutoModeStrobes, killManualModeStrobes);
  onBtnInit(getFile, getTrackBPM, trackStrobe, micStrobe, getBPMvalueSource, manualStrobe, tapStrobe);
  strobeColorsInit();
  tempoTapInit(handleTapBPM);
  thresholdSliderInit();
}
