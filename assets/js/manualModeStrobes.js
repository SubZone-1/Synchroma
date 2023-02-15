// variable imports
import { BPMvalueSource } from "./manualMode.js";
import { strobeActive } from "./onBtn.js";

var manualBPM_interval = 0;
var tapBPM_interval = 0;
var tapBPM_text = document.getElementById("tap-bpm");
var manualBPM_text = document.getElementById("manual-value");
var changed = false; // in order to activate the strobe before the event listener gets triggered
var manualStrobeTimeout; // unchanged manual interval
var manualStrobeTimeout_changed; // changed manual interval
var tapStrobeTimeout; // unchanged tap interval
var tapStrobeTimeout_changed; // changed tap interval
const body = document.body;

// strobe duration variable definition and event listener
var duration = 100;
const slider = document.getElementById("MM-duration-slider");
slider.addEventListener("input", () => {
    duration = slider.value;
}, false);

export { manualBPM_text };

export function manualStrobe() {
    let lastManualBPMValue = manualBPM_text.value; // default value
    var ranTimes = 0;

    if (changed == false) {
        manualBPM_interval = (60 / lastManualBPMValue) * 1000;
        manualStrobeTimeout = setInterval(() => {
            // trigger strobe
            body.classList.remove("bg-black");
            body.classList.add("bg-white");

            // kill strobe once the strobe duration expires
            setTimeout(() => {
                body.classList.remove("bg-white");
                body.classList.add("bg-black");
            }, duration);
            
            ranTimes++;
            console.log("BPM: " + lastManualBPMValue + " (source: " + BPMvalueSource + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes + " | Changed = " + changed);
        }, manualBPM_interval);
    }

    manualBPM_text.addEventListener("change", () => { // event listener
        clearInterval(manualStrobeTimeout); // kill unchanged strobe
        changed = true;
        lastManualBPMValue = manualBPM_text.value;

        clearInterval(manualStrobeTimeout_changed); // so that old value doesn't interfere with new value
        manualBPM_interval = (60 / lastManualBPMValue) * 1000;
        manualStrobeTimeout_changed = setInterval(() => {
            // trigger strobe
            body.classList.remove("bg-black");
            body.classList.add("bg-white");

            // kill strobe once the strobe duration expires
            setTimeout(() => {
                body.classList.remove("bg-white");
                body.classList.add("bg-black");
            }, duration);
            
            ranTimes++;
            console.log("BPM: " + lastManualBPMValue + " (source: " + BPMvalueSource + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes + " | Changed = " + changed);
        }, manualBPM_interval);
    }, false);
}

export function tapStrobe() {
    document.getElementById("tap-bpm").addEventListener("change", handleTapBPM(), false); // event listener for hidden input values
}

export function handleTapBPM() {
    if (strobeActive == true) {
        clearInterval(tapStrobeTimeout); // kill unchanged strobe
        
        let lastTapBPMValue = tapBPM_text.value;
        var ranTimes = 0;

        clearInterval(tapStrobeTimeout_changed); // so that old value doesn't interfere with new value
        tapBPM_interval = (60 / lastTapBPMValue) * 1000;
        tapStrobeTimeout_changed = setInterval(() => {
            // trigger strobe
            body.classList.remove("bg-black");
            body.classList.add("bg-white");

            // kill strobe once the strobe duration expires
            setTimeout(() => {
                body.classList.remove("bg-white");
                body.classList.add("bg-black");
            }, duration);
            
            ranTimes++;
            console.log("BPM: " + lastTapBPMValue + " (source: " + BPMvalueSource + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes);
        }, tapBPM_interval);
    }
}

export function killManualModeStrobes() {
    clearInterval(manualStrobeTimeout_changed);
    clearInterval(manualStrobeTimeout);

    clearInterval(tapStrobeTimeout_changed);
    clearInterval(tapStrobeTimeout);

    changed = false;
}