import { AM_durationOutput, AM_durationSlider, MM_durationOutput, MM_durationSlider } from "./elements";

export function durationSliderInit() {
    /* ----- Auto mode slider ----- */
    AM_durationOutput.innerHTML = "STROBE DURATION (" + AM_durationSlider.value + " MILISECONDS)"; // Display the default slider value

    // Update current slider value (each time you drag the slider handle)
    AM_durationSlider.oninput = function() {
        AM_durationOutput.innerHTML = "STROBE DURATION (" + AM_durationSlider.value + " MILISECONDS)";
    }

    /* ----- Manual mode slider ----- */
    MM_durationOutput.innerHTML = "STROBE DURATION (" + MM_durationSlider.value + " MILISECONDS)"; // Display the default slider value

    // Update current slider value (each time you drag the slider handle)
    MM_durationSlider.oninput = function() {
        MM_durationOutput.innerHTML = "STROBE DURATION (" + MM_durationSlider.value + " MILISECONDS)";
    }
}