function autoMode() {
    // show auto mode
    document.getElementById("auto-mode-container").removeAttribute("hidden");
    // hide manual mode
    document.getElementById("manual-mode-container").setAttribute("hidden", "true");

    var autoBtn = document.getElementById("auto");
    var manualBtn = document.getElementById("manual");

    // disable auto mode button (selected) and enable manual mode button
    autoBtn.setAttribute("disabled", "true");
    manualBtn.removeAttribute("disabled");

    // styling
    autoBtn.classList.remove("text-gray-700");
    autoBtn.classList.remove("hover:scale-1125");
    autoBtn.classList.add("text-themeOrange");

    manualBtn.classList.remove("text-themeOrange");
    manualBtn.classList.add("text-text-gray-700");
    manualBtn.classList.add("hover:scale-1125");

    // variable used in scrollbar script
    selectedMode = "auto";
}