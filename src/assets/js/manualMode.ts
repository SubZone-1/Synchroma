import { AM_offBtn, autoBtn, autoModeContainer, manualBtn, manualModeContainer, mmOffBtn, useManualBtn, useTapBtn } from "./elements";

export function manualModeInit() {
    manualBtn.addEventListener("click", () => {
        // show manual mode
        manualModeContainer.removeAttribute("hidden");
        // hide auto mode
        autoModeContainer.setAttribute("hidden", "true");
        
        // disable manual mode button (selected) and enable auto mode button
        manualBtn.setAttribute("disabled", "true");
        autoBtn.removeAttribute("disabled");

        AM_offBtn.click(); // turn off auto mode strobe

        // styling
        manualBtn.classList.remove("text-gray-700");
        manualBtn.classList.remove("hover:scale-1125");
        manualBtn.classList.add("text-themeOrange");

        autoBtn.classList.remove("text-themeOrange");
        autoBtn.classList.add("text-text-gray-700");
        autoBtn.classList.add("hover:scale-1125");
    });

    var BPMvalueSource: 'manual' | 'tap' = "manual"; // default value

    useManualBtn.addEventListener("click", () => {
        // disable manual value button (selected) and enable tap value button
        useManualBtn.setAttribute("disabled", "true");
        useTapBtn.removeAttribute("disabled");
        
        // styling
        useManualBtn.classList.remove("text-gray-700");
        useManualBtn.classList.remove("hover:scale-1050");
        useManualBtn.classList.add("text-themeOrange");

        useTapBtn.classList.remove("text-themeOrange");
        useTapBtn.classList.add("text-text-gray-700");
        useTapBtn.classList.add("hover:scale-1050");

        mmOffBtn.click(); // turn off manual mode strobe

        BPMvalueSource = "manual";
    });

    useTapBtn.addEventListener("click", () => {
        // disable tap value button (selected) and enable manual value button
        useTapBtn.setAttribute("disabled", "true");
        useManualBtn.removeAttribute("disabled");

        // styling
        useTapBtn.classList.remove("text-gray-700");
        useTapBtn.classList.remove("hover:scale-1050");
        useTapBtn.classList.add("text-themeOrange");

        useManualBtn.classList.remove("text-themeOrange");
        useManualBtn.classList.add("text-text-gray-700");
        useManualBtn.classList.add("hover:scale-1050");

        mmOffBtn.click(); // turn off manual mode strobe

        BPMvalueSource = "tap";
    });

  return {
    getBPMvalueSource() {
        return BPMvalueSource
    } 
  }
}