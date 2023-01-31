/* ----- Auto mode OFF button ----- */
function AM_turnOff() {
    var AM_offBtn = document.getElementById("AM-off");
    var AM_onBtn = document.getElementById("AM-on");

    // disable off button (selected) and enable on button
    AM_offBtn.setAttribute("disabled", "true");
    AM_onBtn.removeAttribute("disabled");

    AM_offBtn.setAttribute("class", "off-btn selected");
    AM_onBtn.setAttribute("class", "on-btn");
}

/* ----- Manual mode OFF button ----- */
function MM_turnOff() {
    var MM_offBtn = document.getElementById("MM-off");
    var MM_onBtn = document.getElementById("MM-on");

    // disable off button (selected) and enable on button
    MM_offBtn.setAttribute("disabled", "true");
    MM_onBtn.removeAttribute("disabled");

    MM_offBtn.setAttribute("class", "off-btn selected");
    MM_onBtn.setAttribute("class", "on-btn");
}