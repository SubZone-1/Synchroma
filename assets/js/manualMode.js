function manualMode() {
    // show manual mode
    document.getElementById("manual-mode").removeAttribute("hidden");
    // hide auto mode
    document.getElementById("auto-mode").setAttribute("hidden", "true");
    
    var manualBtn = document.getElementById("manual");
    var autoBtn = document.getElementById("auto");

    // disable manual mode button (selected) and enable auto mode button
    manualBtn.setAttribute("disabled", "true");
    autoBtn.removeAttribute("disabled");

    manualBtn.setAttribute("class", "manual-btn selected");
    autoBtn.setAttribute("class", "auto-btn");
}