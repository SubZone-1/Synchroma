export function thresholdSliderInit() {
    var thresholdSlider = document.getElementById("threshold-slider") as HTMLProgressElement;
    var sensOutput = document.getElementById("sens-label") as HTMLProgressElement;
    sensOutput.innerHTML = "BEAT DETECTION THRESHOLD (" + thresholdSlider.value + "%)"; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    thresholdSlider.oninput = function() {
        sensOutput.innerHTML = "BEAT DETECTION THRESHOLD (" + thresholdSlider.value + "%)";
    }
}