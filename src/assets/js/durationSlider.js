/* ----- Auto mode slider ----- */
var AM_durationSlider = document.getElementById("AM-duration-slider");
var AM_durationOutput = document.getElementById("AM-duration-label");
AM_durationOutput.innerHTML = "STROBE DURATION (" + AM_durationSlider.value + " MILISECONDS)"; // Display the default slider value

// Update current slider value (each time you drag the slider handle)
AM_durationSlider.oninput = function() {
    AM_durationOutput.innerHTML = "STROBE DURATION (" + this.value + " MILISECONDS)";
}

/* ----- Manual mode slider ----- */
var MM_durationSlider = document.getElementById("MM-duration-slider");
var MM_durationOutput = document.getElementById("MM-duration-label");
MM_durationOutput.innerHTML = "STROBE DURATION (" + MM_durationSlider.value + " MILISECONDS)"; // Display the default slider value

// Update current slider value (each time you drag the slider handle)
MM_durationSlider.oninput = function() {
    MM_durationOutput.innerHTML = "STROBE DURATION (" + this.value + " MILISECONDS)";
}