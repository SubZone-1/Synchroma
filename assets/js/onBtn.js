/* ----- Auto mode ON button ----- */
function AM_turnOn() {
    var AM_onBtn = document.getElementById("AM-on");
    var AM_offBtn = document.getElementById("AM-off");

    // disable on button (selected) and enable off button
    AM_onBtn.setAttribute("disabled", "true");
    AM_offBtn.removeAttribute("disabled");

    AM_onBtn.classList.remove("text-gray-700");
    AM_onBtn.classList.remove("hover:scale-1125");
    AM_onBtn.classList.add("text-themeOrange");

    AM_offBtn.classList.add("text-gray-700");
    AM_offBtn.classList.add("hover:scale-1125");
    AM_offBtn.classList.remove("text-themeOrange");
}

/* ----- Manual mode ON button ----- */
function MM_turnOn() {
    var MM_onBtn = document.getElementById("MM-on");
    var MM_offBtn = document.getElementById("MM-off");

    // disable on button (selected) and enable off button
    MM_onBtn.setAttribute("disabled", "true");
    MM_offBtn.removeAttribute("disabled");

    MM_onBtn.classList.remove("text-gray-700");
    MM_onBtn.classList.remove("hover:scale-1125");
    MM_onBtn.classList.add("text-themeOrange");

    MM_offBtn.classList.add("text-gray-700");
    MM_offBtn.classList.add("hover:scale-1125");
    MM_offBtn.classList.remove("text-themeOrange");
}