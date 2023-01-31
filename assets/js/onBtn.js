/* ----- Auto mode ON button ----- */
function AM_turnOn() {
    var AM_onBtn = document.getElementById("AM-on");
    var AM_offBtn = document.getElementById("AM-off");

    // disable on button (selected) and enable off button
    AM_onBtn.setAttribute("disabled", "true");
    AM_offBtn.removeAttribute("disabled");

    AM_onBtn.setAttribute("class", "on-btn selected");
    AM_offBtn.setAttribute("class", "off-btn");
}

/* ----- Manual mode ON button ----- */
function MM_turnOn() {
    var MM_onBtn = document.getElementById("MM-on");
    var MM_offBtn = document.getElementById("MM-off");

    // disable on button (selected) and enable off button
    MM_onBtn.setAttribute("disabled", "true");
    MM_offBtn.removeAttribute("disabled");

    MM_onBtn.setAttribute("class", "on-btn selected");
    MM_offBtn.setAttribute("class", "off-btn");
}