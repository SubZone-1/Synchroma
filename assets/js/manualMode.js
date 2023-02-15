import { MM_turnOff_aux } from "./offBtn.js";

document.getElementById("manual").addEventListener("click", () => {
    // show manual mode
    document.getElementById("manual-mode-container").removeAttribute("hidden");
    // hide auto mode
    document.getElementById("auto-mode-container").setAttribute("hidden", "true");
    
    var manualBtn = document.getElementById("manual");
    var autoBtn = document.getElementById("auto");

    // disable manual mode button (selected) and enable auto mode button
    manualBtn.setAttribute("disabled", "true");
    autoBtn.removeAttribute("disabled");

    // styling
    manualBtn.classList.remove("text-gray-700");
    manualBtn.classList.remove("hover:scale-1125");
    manualBtn.classList.add("text-themeOrange");

    autoBtn.classList.remove("text-themeOrange");
    autoBtn.classList.add("text-text-gray-700");
    autoBtn.classList.add("hover:scale-1125");

    // variable used in scrollbar script
    selectedMode = "manual";
});

var BPMvalueSource = "manual"; // default value

document.getElementById("useManual-btn").addEventListener("click", () => {
    // disable manual value button (selected) and enable tap value button
    document.getElementById("useManual-btn").setAttribute("disabled", "true");
    document.getElementById("useTap-btn").removeAttribute("disabled");
    
    // styling
    document.getElementById("useManual-btn").classList.remove("text-gray-700");
    document.getElementById("useManual-btn").classList.remove("hover:scale-1050");
    document.getElementById("useManual-btn").classList.add("text-themeOrange");

    document.getElementById("useTap-btn").classList.remove("text-themeOrange");
    document.getElementById("useTap-btn").classList.add("text-text-gray-700");
    document.getElementById("useTap-btn").classList.add("hover:scale-1050");

    MM_turnOff_aux();

    BPMvalueSource = "manual";
});

document.getElementById("useTap-btn").addEventListener("click", () => {
    // disable tap value button (selected) and enable manual value button
    document.getElementById("useTap-btn").setAttribute("disabled", "true");
    document.getElementById("useManual-btn").removeAttribute("disabled");

    // styling
    document.getElementById("useTap-btn").classList.remove("text-gray-700");
    document.getElementById("useTap-btn").classList.remove("hover:scale-1050");
    document.getElementById("useTap-btn").classList.add("text-themeOrange");

    document.getElementById("useManual-btn").classList.remove("text-themeOrange");
    document.getElementById("useManual-btn").classList.add("text-text-gray-700");
    document.getElementById("useManual-btn").classList.add("hover:scale-1050");

    MM_turnOff_aux();

    BPMvalueSource = "tap";
});

export { BPMvalueSource };