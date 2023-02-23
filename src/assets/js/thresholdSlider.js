var thresholdSlider = document.getElementById("threshold-slider");
var sensOutput = document.getElementById("sens-label");
sensOutput.innerHTML = "BEAT DETECTION THRESHOLD (" + thresholdSlider.value + "%)"; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
thresholdSlider.oninput = function() {
    sensOutput.innerHTML = "BEAT DETECTION THRESHOLD (" + this.value + "%)";
}