function manualMode() {
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
}