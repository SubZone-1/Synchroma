var sensSlider = document.getElementById("sens-slider");
var sensOutput = document.getElementById("sens-label");
sensOutput.innerHTML = "DETECTION SENSITIVITY (" + sensSlider.value + "%)"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
sensSlider.oninput = function() {
    sensOutput.innerHTML = "DETECTION SENSITIVITY (" + this.value + "%)";
}