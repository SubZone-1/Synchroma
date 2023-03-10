// realtime-bpm-analyzer library
import { createRealTimeBpmProcessor } from "realtime-bpm-analyzer";

// function imports
import { startCheckingAudioPlaying, awaitMicSource } from "./autoMode.js";

const trackBPM_text = document.getElementById("track-bpm"); // track strobe interval value element (hidden input)
const micBPM_text = document.getElementById("mic-bpm"); // mic strobe interval value element (hidden input)
const inputDevice = document.getElementById("select-input-device"); // input device select element
const slider_threshold = document.getElementById("threshold-slider"); // threshold slider element
const slider = document.getElementById("AM-duration-slider"); // duration slider element
const overlay = document.getElementById("overlay"); // strobe overlay element

var selectedFrequencyRange = "master"; // default selection
var inputDevice_text = "Internal Player"; // default option
var trackBPM_interval = 0; // track strobe interval value
var micBPM_interval = 0; // mic strobe interval value
var tempo = 0; // mic audio BPM value
var threshold = 30; // threshold default value
var duration = 100; // duration default value

var trackStrobeTimeout; // unchanged track interval
var trackStrobeTimeout_changed; // changed track interval
var micStrobeTimeout; // unchanged mic interval
var micStrobeTimeout_changed; // changed mic interval

var changed = false; // default value; in order to activate the strobe before event the listener gets triggered
var isActive = false; // default value; in order to check if strobe is on or off
var playerHidden = false; // default value; in order to check if internal player is hidden or visible

// input device dropdown event listener (for device listing)
inputDevice.addEventListener("change", event => {
    var inputDevice_option = event.target.selectedOptions[0]; // get selected device name (label)
    inputDevice_text = inputDevice_option.label;
});

// frequency range focus buttons event listeners
document.getElementById("low").addEventListener("click", () => {
    selectedFrequencyRange = "low"; // low end frequency focus selected
});
document.getElementById("mid").addEventListener("click", () => {
    selectedFrequencyRange = "mid"; // mid range frequency focus selected
});
document.getElementById("high").addEventListener("click", () => {
    selectedFrequencyRange = "high"; // high end frequency focus selected
});
document.getElementById("master").addEventListener("click", () => { 
    selectedFrequencyRange = "master"; // master range frequency focus selected
});

// beat detection threshold event listener
slider_threshold.addEventListener("input", () => {
    threshold = slider_threshold.value;
}, false);

// strobe duration event listener
slider.addEventListener("input", () => {
    duration = slider.value;
}, false);

// ON & OFF buttons event listeners
document.getElementById("AM-off").addEventListener("click", () => {
    isActive = false; // strobe is off
});
document.getElementById("AM-on").addEventListener("click", () => {
    isActive = true; // strobe is on
});

// player visibility event listener
document.getElementById("show-hide-a").addEventListener("click", () => {
    if (document.getElementById("show-hide-a").innerHTML == "(HIDE)") {
        playerHidden = true; // player is hidden
    } else {
        playerHidden = false;// player is visible
    }
});

// create an AudioContext instance
const audioContext = new AudioContext();

// create a real-time BPM detection node
const realtimeAnalyzerNode = await createRealTimeBpmProcessor(audioContext);

// create a filter node (to analyze separate frequency ranges)
const filter = audioContext.createBiquadFilter();

// create an analyser node and set fftSize
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;

// create a source (internal player)
const TrackSource = audioContext.createMediaElementSource(document.getElementById("internal-player"));

// set up the data array
const dataArray = new Uint8Array(analyser.frequencyBinCount);

inputDevice.addEventListener("change", () => {
    if (inputDevice.selectedIndex == "1") { // if selected device is the integrated player
        // audio processing nodes
        TrackSource.connect(filter);
        filter.connect(analyser);

        // destination (audio that is played)
        TrackSource.connect(audioContext.destination);

        // hide loader
        document.getElementById("mic-loader-container").setAttribute("hidden", true);
        document.getElementById("mic-loader-label").setAttribute("hidden", true);

        // show track BPM multipliers
        document.getElementById("BPM-multipliers-label").removeAttribute("hidden");
        document.getElementById("BPM-multipliers").removeAttribute("hidden");

        if (playerHidden == true) { // if player is hidden
            document.getElementById("show-hide-a").click(); // show internal player (simulated click)
        }
    } else {
        document.getElementById("internal-player").pause(); // pause internal player
        if (playerHidden == false) { // if player is visible
            document.getElementById("show-hide-a").click(); // hide internal player (simulated click)
        }

        // hide track BPM multipliers
        document.getElementById("BPM-multipliers-label").setAttribute("hidden", true);
        document.getElementById("BPM-multipliers").setAttribute("hidden", true);

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

            // show loader
            document.getElementById("mic-loader-container").removeAttribute("hidden");
            document.getElementById("mic-loader-label").removeAttribute("hidden");

            // detecting bpm notification
            toastr["info"]("Looking for a beat to process. This might take some time.", "Detecting BPM...")

            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }

            // create a source node
            const MicSource = audioContext.createMediaStreamSource(stream);

            // MicSource is defined, create meter
            const webAudioPeakMeter = require("web-audio-peak-meter");
            const MicAudioMeter = document.getElementById('mic-audio-meter')
            const MicMeterNode = webAudioPeakMeter.createMeterNode(MicSource, audioContext);
            webAudioPeakMeter.createMeter(MicAudioMeter, MicMeterNode, {});

            // create a filter
            const filter = audioContext.createBiquadFilter();
            
            // change filter type according to selected frequency range
            // NOTE: filtered audio (filter node) is only read by the realtime analyzer, only the unchanged audio (micSource node) comes trough the speakers (destination)
            if (selectedFrequencyRange == "low") { // lowpass
                filter.type = "lowpass";
            } else if (selectedFrequencyRange == "mid") { // bandpass
                filter.type = "bandpass";
            } else if (selectedFrequencyRange == "high") { // highpass
                filter.type = "highpass";
            } else { // no filter, all frequencies pass through
                filter.type = "allpass";
            }

            // connect stuff together
            MicSource.connect(filter).connect(realtimeAnalyzerNode);
            MicSource.connect(filter).connect(analyser); // analyser connection for SCT check readability
            // MicSource.connect(audioContext.destination); //* Uncomment to monitor mic audio

            startCheckingAudioPlaying(); // SCT check for mic audio stream

            realtimeAnalyzerNode.port.onmessage = (event) => {
                /*if (event.data.message === 'BPM') {
                    console.log('BPM', event.data.result.bpm[0].tempo);
                }
                if (event.data.message === 'BPM_STABLE') {
                    console.log('BPM_STABLE', event.data.result);
                }*/

                /**
                * * code commented for dependency interferance while debugging
                tempo = event.data.result.bpm[0].tempo;
                
                if (tempo > 0) {
                    document.getElementById("bpm").querySelector("span").innerHTML = tempo;
                    
                    micBPM_text.value = tempo; // hidden input

                    // hide loader
                    document.getElementById("mic-loader-container").setAttribute("hidden", true);
                    document.getElementById("mic-loader-label").setAttribute("hidden", true);
                }
                */
            };
        })
        .catch((err) => {
            console.error("Error getting microphone input:", err);
        });
    }
});

export function micStrobe() {
    let lastMicBPMValue = micBPM_text.value; // default value
    var ranTimes = 0;

    if (changed == false) {
        micBPM_interval = (60 / lastMicBPMValue) * 1000;
        micStrobeTimeout = setInterval(() => {
            // trigger strobe
            overlay.style.visibility = "visible";

            // kill strobe once the strobe duration expires
            setTimeout(() => {
                overlay.style.visibility = "hidden";
            }, duration);

            ranTimes++;
            console.log("Device: " + inputDevice_text + " | BPM: " + lastMicBPMValue + " | Strobe duration: " + duration + "ms | " + "Beat detection threshold: " + threshold + "% | " + "Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
        }, micBPM_interval);
    }

    micBPM_text.addEventListener("input", () => { // TODO: test function with event listener firing using "input" instead of "change"
        if (isActive == true) { // only runs when auto mode is ON
            clearInterval(micStrobeTimeout); // kill unchanged strobe
            changed = true;
            lastMicBPMValue = micBPM_text.value;

            clearInterval(micStrobeTimeout_changed); // so that old value doesn't interfere with new value
            micBPM_interval = (60 / lastMicBPMValue) * 1000;
            micStrobeTimeout_changed = setInterval(() => {
                // trigger strobe
                overlay.style.visibility = "visible";

                // kill strobe once the strobe duration expires
                setTimeout(() => {
                    overlay.style.visibility = "hidden";
                }, duration);
                
                ranTimes++;
                console.log("Device: " + inputDevice_text + " | BPM: " + lastMicBPMValue + " | Strobe duration: " + duration + "ms | " + "Beat detection threshold: " + threshold + "% | " + "Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
            }, micBPM_interval);
        }
    });
}

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
    clearInterval(trackStrobeTimeout);
    clearInterval(trackStrobeTimeout_changed);

    clearInterval(micStrobeTimeout);
    clearInterval(micStrobeTimeout_changed);

    changed = false;
}

export { audioContext, TrackSource, analyser, tempo };