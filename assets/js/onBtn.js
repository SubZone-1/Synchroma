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

// manual bpm variable definition and event listener
var manualBPM = 0;
var manualBPM_text = document.getElementById("manual-value");
manualBPM_text.addEventListener("change", function() {
    manualBPM = manualBPM_text.value;
}, false);

// strobe duration variable definition and event listener
var duration = 100;
var slider = document.getElementById("MM-duration-slider");
slider.addEventListener("input", function() {
    duration = slider.value;
}, false);

var strobeActive = false;

/* ----- Manual mode ON button ----- */
function MM_turnOn() {
    //var manualBPM = document.getElementById("manual-value").value;
    
    if (!manualBPM && BPMvalueSource == "manual") {
        window.alert("Please insert a BPM value or use the tempo tapper.");
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

        const body = document.querySelector("body");
        var interval = 0;
        var ranTimes = 0;

        if (BPMvalueSource == "manual") { 
            interval = (60 / manualBPM) * 1000;//manualBPM not updating

            // repeat once the interval expires
            window.strobeTimeout = setInterval(function() {
            // trigger strobe
            body.classList.remove("bg-black");
            body.classList.add("bg-white");

            // kill strobe once the strobe duration expires
            setTimeout(function() {
                body.classList.remove("bg-white");
                body.classList.add("bg-black");
            }, duration);
            
            ranTimes++;
            console.log("BPM: " + manualBPM + " (source: " + BPMvalueSource + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes);
            }, interval);
        } else if (BPMvalueSource == "tap") { 
            interval = (60 / tapBPM) * 1000;//tapBPM not updating

            // repeat once the interval expires
            window.strobeTimeout = setInterval(function() {
            // trigger strobe
            body.classList.remove("bg-black");
            body.classList.add("bg-white");

            // kill strobe once the strobe duration expires
            setTimeout(function() {
                body.classList.remove("bg-white");
                body.classList.add("bg-black");
            }, duration);
            
            ranTimes++;
            console.log("BPM: " + tapBPM + " (source: " + BPMvalueSource + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes);
            }, interval);
        }
    }
}

function killStrobe() {
    strobeActive = false;
    // function to turn off the strobe cycle
    clearInterval(strobeTimeout);
}