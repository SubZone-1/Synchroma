// variable imports
import { circularRefs } from "./circularRefs";
import { MM_durationSlider, colorsBtn, manualBPM_text, mmOffBtn, mmOnBtn, overlay, staticCycleA, tapBPM_text } from "./elements";
import toastr from "toastr";

export function manualModeStrobesInit(getBPMvalueSource: () => void) {
    var manualBPM_interval = 0;
    var tapBPM_interval = 0;
    var changed = false; // in order to activate the strobe before the event listener gets triggered
    var isActive = false; // in order to check if strobe is on or off
    var manualStrobeTimeout: Timer; // unchanged manual interval
    var manualStrobeTimeout_changed: Timer; // changed manual interval
    var tapStrobeTimeout: Timer; // unchanged tap interval
    var tapStrobeTimeout_changed: Timer; // changed tap interval

    let currentColorIndex = 0;

    // add event listeners to each color button
    colorsBtn.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentColorIndex = index;
        });
    });

    // strobe duration variable definition and event listener
    var duration = 100; // default value
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

                if (staticCycleA.innerHTML == "(CYCLE MODE)") { // if color cycle mode is active
                    // trigger click on current color
                    colorsBtn[currentColorIndex].click();
        
                    // increment current color index
                    currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
                }
                
                ranTimes++;
                console.log("BPM: " + lastManualBPMValue + " (source: " + getBPMvalueSource() + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes + " | Changed = " + changed);
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

                    if (staticCycleA.innerHTML == "(CYCLE MODE)") { // if color cycle mode is active
                        // trigger click on current color
                        colorsBtn[currentColorIndex].click();
            
                        // increment current color index
                        currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
                    }
                    
                    ranTimes++;
                    console.log("BPM: " + lastManualBPMValue + " (source: " + getBPMvalueSource() + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes + " | Changed = " + changed);
                    }, manualBPM_interval);
                }
            }
        }, false);
    }

    function tapStrobe() {
        tapBPM_text.addEventListener("change", handleTapBPM(), false); // event listener for hidden input values
    }

    function handleTapBPM() {
        if (circularRefs.getStrobeActive()) {
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

                if (staticCycleA.innerHTML == "(CYCLE MODE)") { // if color cycle mode is active
                    // trigger click on current color
                    colorsBtn[currentColorIndex].click();
        
                    // increment current color index
                    currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
                }
                
                ranTimes++;
                console.log("BPM: " + lastTapBPMValue + " (source: " + getBPMvalueSource() + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes);
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

    return { killManualModeStrobes, manualStrobe, tapStrobe, handleTapBPM }
}