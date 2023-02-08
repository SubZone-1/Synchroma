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

/* ----- Manual mode ON button ----- */
function MM_turnOn() {
    var manualBPM = document.getElementById("manual-value").value;
    var duration = document.getElementById("MM-duration-slider").value;
    
    if (!manualBPM && BPMvalueSource == "manual") {
        window.alert("Please insert a BPM value or use the tempo tapper.");
    } else if (!tapBPM && BPMvalueSource == "tap") {
        window.alert("Please use the tempo tapper or insert a BPM value.");
    } else {
        var MM_onBtn = document.getElementById("MM-on");
        var MM_offBtn = document.getElementById("MM-off");

        // disable on button (selected) and enable off button
        MM_onBtn.setAttribute("disabled", "true");
        MM_offBtn.removeAttribute("disabled");

        // styling
        MM_onBtn.classList.remove("text-gray-700");
        MM_onBtn.classList.remove("hover:scale-1125");
        MM_onBtn.classList.add("text-themeOrange");

        MM_offBtn.classList.add("text-gray-700");
        MM_offBtn.classList.add("hover:scale-1125");
        MM_offBtn.classList.remove("text-themeOrange");

        const body = document.querySelector("body");

        var bpm = 0;

        if (BPMvalueSource == "manual") {
            console.log("manual");
            bpm = manualBPM;
        } else if (BPMvalueSource == "tap") {
            console.log("tap");
            bpm = tapBPM;
        }

        var interval = (60 / bpm) * 1000;
        var ranTimes = 0;

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
            console.log("BPM: " + bpm + " (source: " + BPMvalueSource + ") | Strobe duration: " + duration + "ms | " + "Times ran: " + ranTimes);
        }, interval);
    }
}