var count = 0;
var msecsFirst = 0;
var msecsPrevious = 0;
var tapBPM = 0;

function resetCount() {
  count = 0;
  document.getElementById("avg-value").innerHTML = "--- BPM";
  document.getElementById("rounded-value").innerHTML = "--- BPM";
}

function tempoTap() {
    timeSeconds = new Date;
    msecs = timeSeconds.getTime();

    if ((msecs - msecsPrevious) > 10000) { // reset tap count after 10 seconds
    count = 0;
    }

    if (count == 0) {
    document.getElementById("avg-value").innerHTML = "--- BPM";
    document.getElementById("rounded-value").innerHTML = "--- BPM";
    msecsFirst = msecs;
    count = 1;
    console.log("Tap Count: " + count)
    } else {
    bpmAvg = 60000 * count / (msecs - msecsFirst);
    document.getElementById("avg-value").innerHTML = Math.round(bpmAvg * 100) / 100 + " BPM"; // in order to display decimal value
    document.getElementById("rounded-value").innerHTML = Math.round(bpmAvg) + " BPM";
    tapBPM = Math.round(bpmAvg);
    count++;
    console.log("Tap Count: " + count)
    }

    msecsPrevious = msecs;
}

document.getElementById("tap-btn").onclick = tempoTap; //function gets triggered on every tap button press