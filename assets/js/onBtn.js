// variable imports
import { BPMvalueSource } from "./manualMode.js";
import { manualBPM_text } from "./manualModeStrobes.js";
import { tapBPM } from "./tempoTap.js";

// function imports
import { manualStrobe, tapStrobe } from "./manualModeStrobes.js";

/* ----- Auto mode ON button ----- */
document.getElementById("AM-on").addEventListener("click", () => {
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
});

var strobeActive = false;

document.getElementById("manual-value").addEventListener("change", () => {
    manualBPM_text.classList.add("clicked");
});

/* ----- Manual mode ON button ----- */
document.getElementById("MM-on").addEventListener("click", () => {    
    if (!manualBPM_text.classList.contains("clicked") && BPMvalueSource == "manual") {
        toastr["error"]("Please insert a BPM value or use the tempo tapper.", "BPM error")

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
        }
    } else if (manualBPM_text.value < 0 && BPMvalueSource == "manual") {
        toastr["error"]("Negative BPM values are not allowed.", "BPM error")

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
        }
    } else if (!tapBPM && BPMvalueSource == "tap") {

        toastr["error"]("Please use the tempo tapper or insert a BPM value.", "BPM error")

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
        }
    } else {
        var MM_onBtn = document.getElementById("MM-on");
        var MM_offBtn = document.getElementById("MM-off");
        var resetTapperBtn_a = document.getElementById("reset-tapbpm-a");
        var resetTapperBtn_h = document.getElementById("reset-tapbpm-h");

        // disable on button (selected) and reset tapper bpm and enable off button
        MM_onBtn.setAttribute("disabled", "true");
        MM_offBtn.removeAttribute("disabled");
        resetTapperBtn_a.innerHTML = "(TURN OFF TO RESET)";
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
}); 

document.getElementById("MM-off").addEventListener("click", () => {
    strobeActive = false;
});

export { strobeActive };