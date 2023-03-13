// variable imports
import { BPMvalueSource } from "./manualMode.js";
import { strobeActive } from "./onBtn.js";

var manualBPM_interval = 0;
var tapBPM_interval = 0;
var tapBPM_text = document.getElementById("tap-bpm");
var manualBPM_text = document.getElementById("manual-value");
var changed = false; // in order to activate the strobe before the event listener gets triggered
var isActive = false; // in order to check if strobe is on or off
var manualStrobeTimeout; // unchanged manual interval
var manualStrobeTimeout_changed; // changed manual interval
var tapStrobeTimeout; // unchanged tap interval
var tapStrobeTimeout_changed; // changed tap interval
const overlay = document.getElementById("overlay"); // strobe overlay

// strobe duration variable definition and event listener
var duration = 100; // default value
const slider = document.getElementById("MM-duration-slider");
slider.addEventListener("input", () => {
    duration = slider.value;
}, false);

document.getElementById("MM-off").addEventListener("click", () => {
    isActive = false;
});
document.getElementById("MM-on").addEventListener("click", () => {
    isActive = true;
});

export { manualBPM_text };

export function manualStrobe() {
    let lastManualBPMValue = manualBPM_text.value; // default value
    var ranTimes = 0;

    if (changed == false) {
        manualBPM_interval = (60 / lastManualBPMValue) * 1000;
        manualStrobeTimeout = setInterval(() => {
            // trigger strobe
            overlay.style.visibility = "visible";

            // kill strobe once the strobe duration expires
            setTimeout(() => {
                overlay.style.visibility = "hidden";
            }, duration);
            
            ranTimes++;
            console.log("BPM: " + lastManualBPMValue + " (source: " + BPMvalueSource + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes + " | Changed = " + changed);
        }, manualBPM_interval);
    }

    manualBPM_text.addEventListener("change", () => { // event listener
        if (manualBPM_text.value <= 0) {
            toastr["error"]("Negative or null BPM values are not allowed.", "BPM error")

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
            }
        } else {
            if (isActive == true) { // only runs when manual mode is ON
                clearInterval(manualStrobeTimeout); // kill unchanged strobe
                changed = true;
                lastManualBPMValue = manualBPM_text.value;
    
                clearInterval(manualStrobeTimeout_changed); // so that old value doesn't interfere with new value
                manualBPM_interval = (60 / lastManualBPMValue) * 1000;
                manualStrobeTimeout_changed = setInterval(() => {
                // trigger strobe
                overlay.style.visibility = "visible";

                // kill strobe once the strobe duration expires
                setTimeout(() => {
                    overlay.style.visibility = "hidden";
                }, duration);
                
                ranTimes++;
                console.log("BPM: " + lastManualBPMValue + " (source: " + BPMvalueSource + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes + " | Changed = " + changed);
                }, manualBPM_interval);
            }
        }
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
            overlay.style.visibility = "visible";

            // kill strobe once the strobe duration expires
            setTimeout(() => {
                overlay.style.visibility = "hidden";
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