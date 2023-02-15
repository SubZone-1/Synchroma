// variable imports
import { strobeActive } from "./onBtn.js";

//function imports
import { handleTapBPM } from "./manualModeStrobes.js";

var count = 0;
var msecsFirst = 0;
var msecsPrevious = 0;
var tapBPM = 0;

window.resetCount = () => {
  count = 0;
  msecsFirst = 0;
  msecsPrevious = 0;
  tapBPM = 0;
  document.getElementById("avg-value").innerHTML = "--- BPM";
  document.getElementById("rounded-value").innerHTML = "--- BPM";
  document.getElementById("tap-bpm").value = 0; // hidden input
}

document.getElementById("tap-btn").addEventListener("click", () => {
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
});

export { tapBPM };