// function imports
import { AM_offBtn, AM_onBtn, internalPlayer, mmOffBtn, mmOnBtn, playPauseCheck, resetTapperBtn_a, resetTapperBtn_h } from "./elements";

export function offBtnInit(
    killAutoModeStrobes: ()=>void,
    killManualModeStrobes: ()=>void,
) {
    /* ----- Auto mode OFF button ----- */
    AM_offBtn.addEventListener("click", () => {

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

        if (playPauseCheck.checked) {
            internalPlayer.pause(); // pause audio playback
        }
    });

    /* ----- Manual mode OFF button ----- */
    mmOffBtn.addEventListener("click", () => { // only for HTML call

        // disable off button (selected) and enable on button and reset tapper bpm
        mmOffBtn.setAttribute("disabled", "true");
        mmOnBtn.removeAttribute("disabled");
        resetTapperBtn_a.innerHTML = "(RESET)";
        resetTapperBtn_h.removeAttribute("disabled");
        resetTapperBtn_a.removeAttribute("disabled");

        mmOffBtn.classList.remove("text-gray-700");
        mmOffBtn.classList.remove("hover:scale-1125");
        mmOffBtn.classList.add("text-themeOrange");

        mmOnBtn.classList.add("text-gray-700");
        mmOnBtn.classList.add("hover:scale-1125");
        mmOnBtn.classList.remove("text-themeOrange");

        resetTapperBtn_h.classList.add("cursor-pointer");
        resetTapperBtn_h.classList.add("hover:text-themeOrange");

        killManualModeStrobes();

        if (internalPlayer.src && playPauseCheck.checked && !internalPlayer.paused) { // if a file is loaded into the player, play/pause is checked and player is playing
            internalPlayer.pause(); // pause audio playback
        }
    });
}