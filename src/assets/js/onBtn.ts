
import { AM_onBtn, internalPlayer, mmOffBtn, inputDevice, AM_offBtn, resetTapperBtn_a, mmOnBtn, playPauseCheck, micBPM_text, manualBPM_text, resetTapperBtn_h } from "./elements";

import toastr from "toastr";
import { circularRefs } from "./circularRefs.js";

export function onBtnInit(
    getFile: () => File|null,
    getTrackBPM: () => number,
    trackStrobe: () => void,
    micStrobe: () => void,
    getBPMvalueSource:  ()=>  'manual' | 'tap',
    manualStrobe: () => void,
    tapStrobe: () => void,
) {
    let strobeActive = false;

    /* ----- Auto mode ON button ----- */
    AM_onBtn.addEventListener("click", () => {
        if (inputDevice.selectedIndex == 0) { // no device selected
            toastr["error"]("No input device selected.", "Device error")
        
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
        } else if (inputDevice.selectedIndex == 1) { // integrated player
            if (!getFile()) { // if no file is loaded into the player
                toastr["error"]("No file loaded on internal player.", "Player error")
        
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
            } else if (!getTrackBPM()) { // if, for any reason, trackBPM is not calculated
                toastr["error"]("Unable to read track BPM.", "Player error")
        
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

                trackStrobe(); // activate strobe

                if (playPauseCheck.checked) {
                    internalPlayer.play(); // start audio playback
                }
            }
        } else { // mic audio
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

            strobeActive = true;

            const checkTempoDetected = setInterval(() => { // to only turn on strobe when a tempo value gets defined
                if (micBPM_text.value > 0) {
                    clearInterval(checkTempoDetected);
                    micStrobe(); // activate strobe
                }
            }, 100);
        }
    });

    manualBPM_text.addEventListener("change", () => {
        manualBPM_text.classList.add("clicked");
    });

    /* ----- Manual mode ON button ----- */
    mmOnBtn.addEventListener("click", () => {    
        if (!manualBPM_text.classList.contains("clicked") && getBPMvalueSource() == "manual") {
            toastr["error"]("Please insert a BPM value or use the tempo tapper.", "BPM error")

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
        } else if (manualBPM_text.value <= 0 && getBPMvalueSource() == "manual") {
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
        } else if (!circularRefs.getTapBPM() && getBPMvalueSource() == "tap") {

            toastr["error"]("Please use the tempo tapper or insert a BPM value.", "BPM error")

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

            // disable on button (selected) and reset tapper bpm and enable off button
            mmOnBtn.setAttribute("disabled", "true");
            mmOffBtn.removeAttribute("disabled");
            resetTapperBtn_a.innerHTML = "(TURN OFF TO RESET)";
            resetTapperBtn_h.setAttribute("disabled", "true");
            resetTapperBtn_a.setAttribute("disabled", "true");

            // styling
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
                manualStrobe(); // activate strobe (manual value)
            } else if (getBPMvalueSource() == "tap") { 
                tapStrobe(); // activate strobe (BPM tapper value)
            }

            if (internalPlayer.src && playPauseCheck.checked && internalPlayer.paused) { // if  file is loaded into the player, play/pause is checked and internal player is paused
                internalPlayer.play(); // start audio playback
            }
        }
    }); 

    mmOffBtn.addEventListener("click", () => {
        strobeActive = false;
    });

    circularRefs.getStrobeActive = () => {
        return strobeActive
    }
}