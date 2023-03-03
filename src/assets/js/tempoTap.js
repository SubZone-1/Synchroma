// BeatDetect.js
import BeatDetect from './BeatDetect.js';

// variable imports
import { strobeActive } from "./onBtn.js";

// function imports
import { handleTapBPM } from "./manualModeStrobes.js";

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

// var count = 0;
// var msecsFirst = 0;
// var msecsPrevious = 0;

document.getElementById("reset-tapbpm-a").addEventListener("click", () => {
  if (strobeActive == false) {
    // count = 0;
    // msecsFirst = 0;
    // msecsPrevious = 0;
    tapBPM = 0;
    document.getElementById("avg-value").innerHTML = "--- BPM";
    document.getElementById("rounded-value").innerHTML = "--- BPM";
    document.getElementById("tap-bpm").value = 0; // hidden input
  }
});

let tapBPM = 0;
let lastBPM = 0;
let currentBPM = 0;

beatDetect.tapBpm({
  element: document.getElementById('tap-btn'),
  precision: 4, // Floating point for result
  callback: bpm => {
    console.log(bpm);

    lastBPM = currentBPM;
    currentBPM = bpm;
    tapBPM = Math.round(lastBPM);

    document.getElementById("avg-value").innerHTML = lastBPM + " BPM";
    document.getElementById("rounded-value").innerHTML = tapBPM + " BPM";
    document.getElementById("tap-bpm").value = tapBPM; // hidden input

    if (strobeActive == true) {
      handleTapBPM();
    }
  }
});

export { tapBPM };

/*document.getElementById("tap-btn").addEventListener("click", () => {
  let timeSeconds = new Date;
  let msecs = timeSeconds.getTime();

  if ((msecs - msecsPrevious) > 10000) { // reset tap count after 10 seconds
  count = 0;
  }

  if (count == 0) {
    document.getElementById("avg-value").innerHTML = "--- BPM";
    document.getElementById("rounded-value").innerHTML = "--- BPM";
    document.getElementById("tap-bpm").value = 0; // hidden input
    msecsFirst = msecs;
    count = 1;
    console.log("Tap Count: " + count + " | BPM: " + document.getElementById("tap-bpm").value)
  } else {
    let bpmAvg = 60000 * count / (msecs - msecsFirst);
    document.getElementById("avg-value").innerHTML = Math.round(bpmAvg * 100) / 100 + " BPM"; // in order to display decimal value
    document.getElementById("rounded-value").innerHTML = Math.round(bpmAvg) + " BPM";
    tapBPM = Math.round(bpmAvg);
    document.getElementById("tap-bpm").value = tapBPM; // hidden input
    count++;
    console.log("Tap Count: " + count + " | BPM: " + document.getElementById("tap-bpm").value)

    if (strobeActive == true) {
      handleTapBPM();
    }
  }
  msecsPrevious = msecs;
});*/
