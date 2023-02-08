/* ----- Auto mode OFF button ----- */
function AM_turnOff() {
    var AM_offBtn = document.getElementById("AM-off");
    var AM_onBtn = document.getElementById("AM-on");

    // disable off button (selected) and enable on button
    AM_offBtn.setAttribute("disabled", "true");
    AM_onBtn.removeAttribute("disabled");

    AM_offBtn.classList.remove("text-gray-700");
    AM_offBtn.classList.remove("hover:scale-1125");
    AM_offBtn.classList.add("text-themeOrange");

    AM_onBtn.classList.add("text-gray-700");
    AM_onBtn.classList.add("hover:scale-1125");
    AM_onBtn.classList.remove("text-themeOrange");
}

/* ----- Manual mode OFF button ----- */
function MM_turnOff() {
    var MM_offBtn = document.getElementById("MM-off");
    var MM_onBtn = document.getElementById("MM-on");

    // disable off button (selected) and enable on button
    MM_offBtn.setAttribute("disabled", "true");
    MM_onBtn.removeAttribute("disabled");

    MM_offBtn.classList.remove("text-gray-700");
    MM_offBtn.classList.remove("hover:scale-1125");
    MM_offBtn.classList.add("text-themeOrange");

    MM_onBtn.classList.add("text-gray-700");
    MM_onBtn.classList.add("hover:scale-1125");
    MM_onBtn.classList.remove("text-themeOrange");

    // action to turn off the strobe cycle
    clearInterval(strobeTimeout);
}