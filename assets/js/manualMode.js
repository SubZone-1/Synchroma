function manualMode() {
    document.getElementById("manual-mode").removeAttribute("hidden");
    document.getElementById("auto-mode").setAttribute("hidden");
    document.getElementById("opencloseSidebar").innerHTML = "&#10095;";


}