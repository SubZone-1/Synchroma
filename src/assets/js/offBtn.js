// function imports
import { killAutoModeStrobes } from "./autoModeStrobes.js";
import { killManualModeStrobes } from "./manualModeStrobes.js";

/* ----- Auto mode OFF button ----- */
document.getElementById("AM-off").addEventListener("click", () => {
    var AM_offBtn = document.getElementById("AM-off");
    var AM_onBtn = document.getElementById("AM-on");

    // disable off button (selected) and enable on button
    AM_offBtn.setAttribute("disabled", "true");
    AM_onBtn.removeAttribute("disabled");

    AM_offBtn.classList.remove("text-gray-700");
    AM_offBtn.classList.remove("hover:scale-1125");
    AM_offBtn.classList.add("text-themeOrange");

    AM_onBtn.classList.add("text-gray-700");
    AM_onBtn.classList.add("hover:scale-1125");
    AM_onBtn.classList.remove("text-themeOrange");

    killAutoModeStrobes();

    if (document.getElementById("play-pause-check").checked) {
        document.getElementById("internal-player").pause(); // pause audio playback
    }
});

export function AM_turnOff_aux() { // function duplicate for imports
    var AM_offBtn = document.getElementById("AM-off");
    var AM_onBtn = document.getElementById("AM-on");

    // disable off button (selected) and enable on button
    AM_offBtn.setAttribute("disabled", "true");
    AM_onBtn.removeAttribute("disabled");

    AM_offBtn.classList.remove("text-gray-700");
    AM_offBtn.classList.remove("hover:scale-1125");
    AM_offBtn.classList.add("text-themeOrange");

    AM_onBtn.classList.add("text-gray-700");
    AM_onBtn.classList.add("hover:scale-1125");
    AM_onBtn.classList.remove("text-themeOrange");

    killAutoModeStrobes();
}

/* ----- Manual mode OFF button ----- */
document.getElementById("MM-off").addEventListener("click", () => { // only for HTML call
    var MM_offBtn = document.getElementById("MM-off");
    var MM_onBtn = document.getElementById("MM-on");
    var resetTapperBtn_a = document.getElementById("reset-tapbpm-a");
    var resetTapperBtn_h = document.getElementById("reset-tapbpm-h");

    // disable off button (selected) and enable on button and reset tapper bpm
    MM_offBtn.setAttribute("disabled", "true");
    MM_onBtn.removeAttribute("disabled");
    resetTapperBtn_a.innerHTML = "(RESET)";
    resetTapperBtn_a.removeAttribute("disabled");
    resetTapperBtn_a.setAttribute("onclick", "resetCount()");

    MM_offBtn.classList.remove("text-gray-700");
    MM_offBtn.classList.remove("hover:scale-1125");
    MM_offBtn.classList.add("text-themeOrange");

    MM_onBtn.classList.add("text-gray-700");
    MM_onBtn.classList.add("hover:scale-1125");
    MM_onBtn.classList.remove("text-themeOrange");

    resetTapperBtn_h.classList.add("cursor-pointer");
    resetTapperBtn_h.classList.add("hover:text-themeOrange");

    killManualModeStrobes();

    if (document.getElementById("internal-player").src && document.getElementById("play-pause-check").checked && !document.getElementById("internal-player").paused) { // if a file is loaded into the player, play/pause is checked and player is playing
        document.getElementById("internal-player").pause(); // pause audio playback
    }
});

export function MM_turnOff_aux() { // function duplicate for imports
    var MM_offBtn = document.getElementById("MM-off");
    var MM_onBtn = document.getElementById("MM-on");
    var resetTapperBtn_a = document.getElementById("reset-tapbpm-a");
    var resetTapperBtn_h = document.getElementById("reset-tapbpm-h");

    // disable off button (selected) and enable on button and reset tapper bpm
    MM_offBtn.setAttribute("disabled", "true");
    MM_onBtn.removeAttribute("disabled");
    resetTapperBtn_a.innerHTML = "(RESET)";
    resetTapperBtn_a.removeAttribute("disabled");
    resetTapperBtn_a.setAttribute("onclick", "resetCount()");

    MM_offBtn.classList.remove("text-gray-700");
    MM_offBtn.classList.remove("hover:scale-1125");
    MM_offBtn.classList.add("text-themeOrange");

    MM_onBtn.classList.add("text-gray-700");
    MM_onBtn.classList.add("hover:scale-1125");
    MM_onBtn.classList.remove("text-themeOrange");

    resetTapperBtn_h.classList.add("cursor-pointer");
    resetTapperBtn_h.classList.add("hover:text-themeOrange");

    killManualModeStrobes();
}