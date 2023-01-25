function manualMode() {
    document.getElementById("auto-mode").toggleAttribute("hidden");
    document.getElementById("manual-mode").removeAttribute("hidden");
    
    document.getElementById("manual").setAttribute("disabled");
}