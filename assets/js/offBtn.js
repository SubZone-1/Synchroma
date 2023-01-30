function turnOff() {
    var offBtn = document.getElementById("off");
    var onBtn = document.getElementById("on");

    // disable off button (selected) and enable on button
    offBtn.setAttribute("disabled", "true");
    onBtn.removeAttribute("disabled");

    offBtn.setAttribute("class", "off-btn selected");
    onBtn.setAttribute("class", "on-btn");
}