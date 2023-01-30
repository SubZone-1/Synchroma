function turnOn() {
    var onBtn = document.getElementById("on");
    var offBtn = document.getElementById("off");

    // disable on button (selected) and enable off button
    onBtn.setAttribute("disabled", "true");
    offBtn.removeAttribute("disabled");

    onBtn.setAttribute("class", "on-btn selected");
    offBtn.setAttribute("class", "off-btn");
}