function autoMode() {
    // show auto mode
    document.getElementById("auto-mode").removeAttribute("hidden");
    // hide manual mode
    document.getElementById("manual-mode").setAttribute("hidden", "true");

    var autoBtn = document.getElementById("auto");
    var manualBtn = document.getElementById("manual");

    // disable auto mode button (selected) and enable manual mode button
    autoBtn.setAttribute("disabled", "true");
    manualBtn.removeAttribute("disabled");
}