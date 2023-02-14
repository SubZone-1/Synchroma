// variable imports
import { BPMvalueSource } from "./manualMode.js";
import { manualBPM_text } from "./manualModeStrobes.js";
import { tapBPM } from "./tempoTap.js";


import { manualStrobe, tapStrobe } from "./manualModeStrobes.js"; // function imports

/* ----- Auto mode ON button ----- */
function AM_turnOn() {
    var AM_onBtn = document.getElementById("AM-on");
    var AM_offBtn = document.getElementById("AM-off");

    // disable on button (selected) and enable off button
    AM_onBtn.setAttribute("disabled", "true");
    AM_offBtn.removeAttribute("disabled");

    // styling
    AM_onBtn.classList.remove("text-gray-700");
    AM_onBtn.classList.remove("hover:scale-1125");
    AM_onBtn.classList.add("text-themeOrange");

    AM_offBtn.classList.add("text-gray-700");
    AM_offBtn.classList.add("hover:scale-1125");
    AM_offBtn.classList.remove("text-themeOrange");
}

var strobeActive = false;
document.getElementById("manual-value").addEventListener("change", function() {
    manualBPM_text.classList.add("clicked");
});

/* ----- Manual mode ON button ----- */
window.MM_turnOn = () => {    
    if (!manualBPM_text.classList.contains("clicked") && BPMvalueSource == "manual") {
        window.alert("Please insert a BPM value or use the tempo tapper.");
    } else if (manualBPM_text.value < 0 && BPMvalueSource == "manual") {
        window.alert("Negative BPM values are not allowed.")
    } else if (!tapBPM && BPMvalueSource == "tap") {
        window.alert("Please use the tempo tapper or insert a BPM value.");
    } else {
        var MM_onBtn = document.getElementById("MM-on");
        var MM_offBtn = document.getElementById("MM-off");
        var resetTapperBtn_a = document.getElementById("reset-tapbpm-a");
        var resetTapperBtn_h = document.getElementById("reset-tapbpm-h");

        // disable on button (selected) and reset tapper bpm and enable off button
        MM_onBtn.setAttribute("disabled", "true");
        MM_offBtn.removeAttribute("disabled");
        resetTapperBtn_a.setAttribute("disabled", "true");
        resetTapperBtn_a.removeAttribute("onclick");

        // styling
        MM_onBtn.classList.remove("text-gray-700");
        MM_onBtn.classList.remove("hover:scale-1125");
        MM_onBtn.classList.add("text-themeOrange");

        MM_offBtn.classList.add("text-gray-700");
        MM_offBtn.classList.add("hover:scale-1125");
        MM_offBtn.classList.remove("text-themeOrange");

        resetTapperBtn_h.classList.remove("cursor-pointer");
        resetTapperBtn_h.classList.remove("hover:text-themeOrange");

        strobeActive = true;

        if (BPMvalueSource == "manual") { 
            manualStrobe();
        } else if (BPMvalueSource == "tap") { 
            tapStrobe();
        }
    }
}

export { strobeActive };