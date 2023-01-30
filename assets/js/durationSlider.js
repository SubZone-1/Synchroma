var durationSlider = document.getElementById("duration-slider");
var durationOutput = document.getElementById("duration-label");
durationOutput.innerHTML = "STROBE DURATION (" + durationSlider.value + " MILISECONDS)"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
durationSlider.oninput = function() {
    durationOutput.innerHTML = "STROBE DURATION (" + this.value + " MILISECONDS)";
}