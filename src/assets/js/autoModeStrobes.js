// function imports
import { startCheckingAudioPlaying } from "./autoMode.js";

let selectedFrequencyRange = "master"; // default value
var trackBPM_interval = 0;
var trackBPM_text = document.getElementById("track-bpm");
var inputDevice = document.getElementById("select-input-device");
var inputDevice_text = "Internal Player"; // default option
var changed = false; // in order to activate the strobe before event the listener gets triggered
var isActive = false; // in order to check if strobe is on or off
var trackStrobeTimeout; // unchanged track interval
var trackStrobeTimeout_changed; // changed track interval
const overlay = document.getElementById("overlay"); // strobe overlay

document.getElementById("low").addEventListener("click", () => {
    selectedFrequencyRange = "low";
});
document.getElementById("mid").addEventListener("click", () => {
    selectedFrequencyRange = "mid";
});
document.getElementById("high").addEventListener("click", () => {
    selectedFrequencyRange = "high";
});
document.getElementById("master").addEventListener("click", () => {
    selectedFrequencyRange = "master";
});

inputDevice.addEventListener("change", event => { // get selected device name (label)
    var inputDevice_option = event.target.selectedOptions[0];
    inputDevice_text = inputDevice_option.label;
});

// create an AudioContext instance
const audioContext = new AudioContext();

// create a filter node (to analyze separate frequency ranges)
const filter = audioContext.createBiquadFilter();

// create an analyser node and set fftSize
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;

// create a source (internal player)
const TrackSource = audioContext.createMediaElementSource(document.getElementById("internal-player"));

inputDevice.addEventListener("change", () => {
    startCheckingAudioPlaying();

    if (inputDevice.selectedIndex == "1") { // if selected device is the integrated player
        // audio processing nodes
        TrackSource.connect(filter);
        filter.connect(analyser);

        // destination (audio that is played)
        TrackSource.connect(audioContext.destination);
    } else {
        TrackSource.disconnect(); // disconnect TrackSource from all nodes
        document.getElementById("internal-player").pause(); // pause internal player

        // get the selected deviceID from select input device element
        const selectedDeviceID = inputDevice.value;
    
        // create a MediaStreamTrackSource from the selected device
        const constraints = { audio: { deviceID: selectedDeviceID, echoCancellation: false, googAutoGainControl: false } };
        navigator.mediaDevices.getUserMedia(constraints)
        .then((stream) => {
            // disconnect MicSource from all nodes if internal player is selected as an input device
            inputDevice.addEventListener("change", () => {
                if (inputDevice.selectedIndex == "1") {
                    MicSource.disconnect();
                }
            });

            // create a source node
            const MicSource = audioContext.createMediaStreamSource(stream);

            // create a ScriptProcessorNode to analyze the audio
            const scriptNode = audioContext.createScriptProcessor(1024, 1, 1);

            // audio processing nodes
            MicSource.connect(filter);
            filter.connect(scriptNode);
            scriptNode.connect(analyser);

            // destination (audio that is played)
            MicSource.connect(audioContext.destination);

            // initialize the beat detection variables
            let lastPeak = 0;
            let threshold = 0.2;
            let decay = 0.98;

            // define the function that will be called each time the scriptNode processes audio
            scriptNode.onaudioprocess = function(audioProcessingEvent) {
                // get the input buffer
                const inputBuffer = audioProcessingEvent.inputBuffer;

                // get the left channel data from the input buffer
                const inputData = inputBuffer.getChannelData(0);

                // initialize the variables for peak detection
                let currentPeak = 0;
                let currentValley = 0;
                let isRising = true;

                // iterate over the input data
                for (let i = 0; i < inputData.length; i++) {
                    // get the absolute value of the sample
                    const absVal = Math.abs(inputData[i]);

                    if (absVal > currentPeak) {
                        currentPeak = absVal;
                    } else if (absVal < currentValley) {
                        currentValley = absVal;
                    } else if (isRising && absVal < currentPeak * threshold) {
                        // a peak has been detected
                        const timeSinceLastPeak = audioContext.currentTime - lastPeak;

                        if (timeSinceLastPeak > 0.1) {
                            console.log('beat detected at time', audioContext.currentTime);

                            // update the last peak time and the threshold
                            lastPeak = audioContext.currentTime;
                            threshold = currentPeak * decay;
                        }

                        isRising = false;
                    } else if (!isRising && absVal > currentValley * threshold) {
                        isRising = true;
                    }

                    // decay the threshold over time
                    threshold *= decay;
                }
            };
        })
        .catch((err) => {
            console.error("Error getting microphone input:", err);
        });
    }
});

// set up the data array
const dataArray = new Uint8Array(analyser.frequencyBinCount);

// strobe duration event listener
var duration = 100; // default value
const slider = document.getElementById("AM-duration-slider");
slider.addEventListener("input", () => {
    duration = slider.value;
}, false);

// beat detection threshold event listener
var threshold = 30; // default value
const slider_threshold = document.getElementById("threshold-slider");
slider_threshold.addEventListener("input", () => {
    threshold = slider_threshold.value;
}, false);

document.getElementById("AM-off").addEventListener("click", () => {
    isActive = false;
});
document.getElementById("AM-on").addEventListener("click", () => {
    isActive = true;
});

export function trackStrobe() {
    let lastTrackBPMValue = trackBPM_text.value; // default value
    var ranTimes = 0;

    if (changed == false) {
        trackBPM_interval = (60 / lastTrackBPMValue) * 1000;
        trackStrobeTimeout = setInterval(() => {
            // change filter type according to selected frequency range
            // NOTE: filtered audio (filter node) is only read by the analyser, only the unchanged audio (TrackSource node) comes trough the speakers (destination)
            if (selectedFrequencyRange == "low") { // lowpass
                filter.type = "lowpass";
                filter.frequency.value = 200; // Hz

                // audio processing nodes
                TrackSource.connect(filter);
                filter.connect(analyser);

                // destination (audio that is played)
                TrackSource.connect(audioContext.destination);
            } else if (selectedFrequencyRange == "mid") { // bandpass
                filter.type = "bandpass";

                // audio processing nodes
                TrackSource.connect(filter);
                filter.connect(analyser);

                // destination (audio that is played)
                TrackSource.connect(audioContext.destination);
            } else if (selectedFrequencyRange == "high") { // highpass
                filter.type = "highpass";

                // audio processing nodes
                TrackSource.connect(filter);
                filter.connect(analyser);

                // destination (audio that is played)
                TrackSource.connect(audioContext.destination);
            } else { // no filter, all frequencies pass through
                filter.type = "allpass";

                // audio processing nodes
                TrackSource.connect(filter);
                filter.connect(analyser);

                // destination (audio that is played)
                TrackSource.connect(audioContext.destination);
            }

            // set the analyser to get frequency data from the filtered audio
            analyser.getByteFrequencyData(dataArray);

            // loop over data and calculate average amplitude
            let averageAmplitude = 0;
            for (let i = 0; i < dataArray.length; i++) {
                averageAmplitude += dataArray[i];
            }
            averageAmplitude /= dataArray.length;

            console.log(averageAmplitude);

            // if average amplitude is above a certain threshold, then there is a beat
            if (averageAmplitude > threshold) {
                // trigger strobe
                overlay.style.visibility = "visible";

                // kill strobe once the strobe duration expires
                setTimeout(() => {
                    overlay.style.visibility = "hidden";
                }, duration);
                
                ranTimes++;
                console.log("Device: " + inputDevice_text + " | BPM: " + lastTrackBPMValue + " | Strobe duration: " + duration + "ms | " + "Beat detection threshold: " + threshold + "% | " + "Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
            }
        }, trackBPM_interval);
    }
    
    document.getElementById("BPM-multipliers").addEventListener("click", () => { // event listener for multiplier buttons
        if (isActive == true) { // only runs when auto mode is ON
            clearInterval(trackStrobeTimeout); // kill unchanged strobe
            changed = true;
            lastTrackBPMValue = trackBPM_text.value;

            clearInterval(trackStrobeTimeout_changed); // so that old value doesn't interfere with new value
            trackBPM_interval = (60 / lastTrackBPMValue) * 1000;
            trackStrobeTimeout_changed = setInterval(() => {
                // set the analyser to get frequency data from the audio
                analyser.getByteFrequencyData(dataArray);

                // loop over data and calculate average amplitude
                let averageAmplitude = 0;
                for (let i = 0; i < dataArray.length; i++) {
                    averageAmplitude += dataArray[i];
                }
                averageAmplitude /= dataArray.length;

                console.log(averageAmplitude);

                // if average amplitude is above a certain threshold, then there is a beat
                if (averageAmplitude > threshold) {
                    // trigger strobe
                    overlay.style.visibility = "visible";

                    // kill strobe once the strobe duration expires
                    setTimeout(() => {
                        overlay.style.visibility = "hidden";
                    }, duration);
                    
                    ranTimes++;
                    console.log("Device: " + inputDevice_text + " | BPM: " + lastTrackBPMValue + " | Strobe duration: " + duration + "ms | " + "Beat detection threshold: " + threshold + "% | " + "Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
                }
            }, trackBPM_interval);
        }
    });
}

export function killAutoModeStrobes() {
    clearInterval(trackStrobeTimeout_changed);
    clearInterval(trackStrobeTimeout);

    changed = false;
}

export { audioContext, TrackSource, analyser };