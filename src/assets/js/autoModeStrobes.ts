// realtime-bpm-analyzer library
import { createRealTimeBpmProcessor } from "realtime-bpm-analyzer";
import toastr from "toastr";
// function imports
import { AM_durationSlider, AM_offBtn, AM_onBtn, MicAudioMeter, avgAmplitude, avgAmplitudeLabel, bmpMultipliers, bmpMultipliersLabel, bpmDivSpan, colorsBtn, highBtn, inputDevice, internalPlayer, lowBtn, masterBtn, micBPM_text, micLoaderContainer, micLoaderLabel, midBtn, overlay, showHideA, slider_threshold, staticCycleA, trackBPM_text } from "./elements";
import webAudioPeakMeter from "web-audio-peak-meter";
import { circularRefs } from "./circularRefs";

export async function autoModeStrobesInit() {
    var selectedFrequencyRange = "master"; // default selection
    var inputDevice_text = "Internal Player"; // default option
    var trackBPM_interval = 0; // track strobe interval value
    var micBPM_interval = 0; // mic strobe interval value
    var threshold = 30; // threshold default value
    var duration = 100; // duration default value

    var trackStrobeTimeout: Timer; // unchanged track interval
    var trackStrobeTimeout_changed: Timer; // changed track interval
    var micStrobeTimeout: Timer; // mic interval

    var changed = false; // default value; in order to activate the strobe before event the listener gets triggered
    var isActive = false; // default value; in order to check if strobe is on or off
    var playerHidden = false; // default value; in order to check if internal player is hidden or visible

    let currentColorIndex = 0;

    // add event listeners to each color button
    colorsBtn.forEach((button, index) => {
        button.addEventListener('click', () => {
            currentColorIndex = index;
        });
    });

    // input device dropdown event listener (for device listing)
    inputDevice.addEventListener("change", event => {
        var inputDevice_option = (event.target as any).selectedOptions[0]; // get selected device name (label)
        inputDevice_text = inputDevice_option.label;
    });

    // frequency range focus buttons event listeners
    lowBtn.addEventListener("click", () => {
        selectedFrequencyRange = "low"; // low end frequency focus selected
    });
    midBtn.addEventListener("click", () => {
        selectedFrequencyRange = "mid"; // mid range frequency focus selected
    });
    highBtn.addEventListener("click", () => {
        selectedFrequencyRange = "high"; // high end frequency focus selected
    });
    masterBtn.addEventListener("click", () => {
        selectedFrequencyRange = "master"; // master range frequency focus selected
    });

    // beat detection threshold event listener
    slider_threshold.addEventListener("input", () => {
        threshold = slider_threshold.value;
    }, false);

    // strobe duration event listener
    AM_durationSlider.addEventListener("input", () => {
        duration = AM_durationSlider.value;
    }, false);

    // ON & OFF buttons event listeners
    AM_offBtn.addEventListener("click", () => {
        isActive = false; // strobe is off
    });
    AM_onBtn.addEventListener("click", () => {
        isActive = true; // strobe is on
    });

    // player visibility event listener
    showHideA.addEventListener("click", async () => {
        if (showHideA.innerHTML == "(HIDE)") {
            playerHidden = true; // player is hidden
        } else {
            playerHidden = false;// player is visible
        }
    });

    // create an AudioContext instance
    const audioContext = new AudioContext();

    // create a filter node for track audio (to analyze separate frequency ranges)
    const filter = audioContext.createBiquadFilter();

    // create a filter node for mic audio (to analyze separate frequency ranges)
    const filter_mic = audioContext.createBiquadFilter();

    // create an analyser node and set fftSize
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    // create a source (internal player)
    const TrackSource = audioContext.createMediaElementSource(internalPlayer);

    // set up the data array
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    let realtimeAnalyzerNode: AudioWorkletNode | undefined

    inputDevice.addEventListener("change", async () => { // on selecting a different input device
        killAutoModeStrobes(); // kill all strobes (intervals) to prevent interference
        try {
            AM_offBtn.click(); // simulate OFF button click

            micBPM_text.value = 0; // reset mic BPM value

            if (internalPlayer.src == "") { // if there is no file loaded onto the player
                bpmDivSpan.innerHTML = "---"; // reset detected tempo text
                avgAmplitude.innerHTML = "0"; // reset avg amplitude text

                // hide avg amplitude
                avgAmplitudeLabel.setAttribute("hidden", "true");
                avgAmplitude.setAttribute("hidden", "true");

                trackBPM_text.value = 0; // reset track BPM value
            } else { // if there is a file loaded onto the player
                bpmDivSpan.innerHTML = String(trackBPM_text.value); // set detected tempo text to track BPM
            }

            if (inputDevice.selectedIndex == 1) { // if selected device is the integrated player
                // audio processing nodes
                TrackSource.connect(filter);
                filter.connect(analyser);

                // destination (audio that is played)
                TrackSource.connect(audioContext.destination);

                // hide loader
                micLoaderContainer.setAttribute("hidden", 'true');
                micLoaderLabel.setAttribute("hidden", 'true');

                // show avg amplitude
                avgAmplitudeLabel.removeAttribute("hidden");
                avgAmplitude.removeAttribute("hidden");

                // show track BPM multipliers
                bmpMultipliersLabel.removeAttribute("hidden");
                bmpMultipliers.removeAttribute("hidden");

                if (playerHidden == true) { // if player is hidden
                    showHideA.click(); // show internal player (simulated click)
                }
            } else {
                internalPlayer.pause(); // pause internal player
                if (playerHidden == false) { // if player is visible
                    showHideA.click(); // hide internal player (simulated click)
                }

                bpmDivSpan.innerHTML = "---"; // reset detected tempo text

                // hide avg amplitude
                avgAmplitudeLabel.setAttribute("hidden", "true");
                avgAmplitude.setAttribute("hidden", "true");

                // hide track BPM multipliers
                bmpMultipliersLabel.setAttribute("hidden", 'true');
                bmpMultipliers.setAttribute("hidden", 'true');

                // get the selected deviceID from select input device element
                const selectedDeviceID = inputDevice.value;

                // create a MediaStreamTrackSource from the selected device
                const constraints = { audio: { deviceID: selectedDeviceID, echoCancellation: false, googAutoGainControl: false } };
                const stream = await navigator.mediaDevices.getUserMedia(constraints)

                // disconnect MicSource from all nodes if input device is changed
                inputDevice.addEventListener("change", () => {
                    MicSource.disconnect();
                });

                // show loader
                micLoaderContainer.removeAttribute("hidden");
                micLoaderLabel.removeAttribute("hidden");

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

                // MicSource is defined, create meter (Web Audio Peak Meters)
                const MicMeterNode = webAudioPeakMeter.createMeterNode(MicSource, audioContext);
                webAudioPeakMeter.createMeter(MicAudioMeter, MicMeterNode, {});

                setInterval(() => {
                    // change filter type according to selected frequency range
                    // NOTE: filtered audio (filter node) is only read by the realtime analyzer, only the unchanged audio (micSource node) comes trough the speakers (destination)
                    if (selectedFrequencyRange == "low") { // lowpass
                        filter_mic.type = "lowpass";
                    } else if (selectedFrequencyRange == "mid") { // bandpass
                        filter_mic.type = "bandpass";
                    } else if (selectedFrequencyRange == "high") { // highpass
                        filter_mic.type = "highpass";
                    } else { // no filter, all frequencies pass through
                        filter_mic.type = "allpass";
                    }
                }, 100);

                if (!realtimeAnalyzerNode) {
                    // create a real-time BPM detection node
                    realtimeAnalyzerNode = await createRealTimeBpmProcessor(audioContext)
                }
                // connect stuff together
                MicSource.connect(filter_mic).connect(realtimeAnalyzerNode);
                MicSource.connect(filter_mic).connect(analyser); // analyser connection for SCT check readability

                //MicSource.connect(filter_mic).connect(audioContext.destination); //* Uncomment to monitor mic audio that is being analyzed

                if (circularRefs.startCheckingAudioPlaying)
                    circularRefs.startCheckingAudioPlaying(); // SCT check for mic audio stream
                else
                    console.error('startCheckingAudioPlaying not defined')

                realtimeAnalyzerNode.port.onmessage = (event) => {
                    if (event.data.message === 'BPM') {
                        console.log('BPM', event.data.result.bpm[0].tempo);
                    }
                    if (event.data.message === 'BPM_STABLE') {
                        console.log('BPM_STABLE', event.data.result);
                    }

                    const tempo = event.data.result.bpm?.[0]?.tempo;

                    if (tempo) {
                        bpmDivSpan.innerHTML = String(tempo);

                        micBPM_text.value = tempo; // hidden input

                        // hide loader
                        micLoaderContainer.setAttribute("hidden", 'true');
                        micLoaderLabel.setAttribute("hidden", 'true');

                        //show avg amplitude
                        avgAmplitudeLabel.removeAttribute("hidden");
                        avgAmplitude.removeAttribute("hidden");
                    }
                };
            }
        }
        catch (err) {
            console.error("Error getting microphone input:", err);

            // error notification
            toastr["error"]("Error getting microphone input. Check console for error details", "Microphone Error")

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
        }
    });

    function micStrobe() {
        let lastMicBPMValue = micBPM_text.value; // default value
        var ranTimes = 0;

        micBPM_interval = (60 / lastMicBPMValue) * 1000;
        micStrobeTimeout = setInterval(() => {
            // set the analyser to get frequency data from the filtered audio
            analyser.getByteFrequencyData(dataArray);

            // loop over data and calculate average amplitude
            let averageAmplitude = 0;
            for (let i = 0; i < dataArray.length; i++) {
                averageAmplitude += dataArray[i];
            }
            averageAmplitude /= dataArray.length;

            console.log(averageAmplitude);
            avgAmplitude.innerHTML = String(averageAmplitude);

            // if average amplitude is above a certain threshold, then there is a beat
            if (averageAmplitude > threshold) {
                // trigger strobe
                overlay.style.visibility = "visible";

                // kill strobe once the strobe duration expires
                setTimeout(() => {
                    overlay.style.visibility = "hidden";
                }, duration);

                if (staticCycleA.innerHTML == "(CYCLE MODE)") { // if color cycle mode is active
                    // trigger click on current color
                    colorsBtn[currentColorIndex].click();

                    // increment current color index
                    currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
                }

                ranTimes++;
                console.log("Device: " + inputDevice_text + " | BPM: " + lastMicBPMValue + " | Strobe duration: " + duration + "ms | " + "Beat detection threshold: " + threshold + "% | " + "Times ran: " + ranTimes + " | Filter: " + filter_mic.type);

                if (micBPM_text.value != lastMicBPMValue) { // if micBPM_text value changes
                    clearInterval(micStrobeTimeout); // clear interval

                    micStrobe(); // run function again with updated values
                }
            }
        }, micBPM_interval);
    }

    function trackStrobe() {
        let lastTrackBPMValue = trackBPM_text.value; // default value
        var ranTimes = 0;

        if (changed == false) {
            trackBPM_interval = (60 / lastTrackBPMValue) * 1000;
            trackStrobeTimeout = setInterval(() => {
                // change filter type according to selected frequency range
                // NOTE: filtered audio (filter node) is only read by the analyser, only the unchanged audio (TrackSource node) comes trough the speakers (destination)
                if (selectedFrequencyRange == "low") { // lowpass
                    filter.type = "lowpass";

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

                avgAmplitude.innerHTML = String(averageAmplitude);

                // if average amplitude is above a certain threshold, then there is a beat
                if (averageAmplitude > threshold) {
                    // trigger strobe
                    overlay.style.visibility = "visible";

                    // kill strobe once the strobe duration expires
                    setTimeout(() => {
                        overlay.style.visibility = "hidden";
                    }, duration);

                    if (staticCycleA.innerHTML == "(CYCLE MODE)") { // if color cycle mode is active
                        // trigger click on current color
                        colorsBtn[currentColorIndex].click();

                        // increment current color index
                        currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
                    }

                    ranTimes++;
                    console.log("Device: " + inputDevice_text + " | BPM: " + lastTrackBPMValue + " | Strobe duration: " + duration + "ms | " + "Beat detection threshold: " + threshold + "% | " + "Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
                }
            }, trackBPM_interval);
        }

        bmpMultipliers.addEventListener("click", () => { // event listener for multiplier buttons
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

                        if (staticCycleA.innerHTML == "(CYCLE MODE)") { // if color cycle mode is active
                            // trigger click on current color
                            colorsBtn[currentColorIndex].click();

                            // increment current color index
                            currentColorIndex = (currentColorIndex + 1) % colorsBtn.length;
                        }

                        ranTimes++;
                        console.log("Device: " + inputDevice_text + " | BPM: " + lastTrackBPMValue + " | Strobe duration: " + duration + "ms | " + "Beat detection threshold: " + threshold + "% | " + "Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
                    }
                }, trackBPM_interval);
            }
        });
    }

    function killAutoModeStrobes() {
        if (realtimeAnalyzerNode) {
            realtimeAnalyzerNode.disconnect()
            realtimeAnalyzerNode = undefined
        }
        clearInterval(trackStrobeTimeout);
        clearInterval(trackStrobeTimeout_changed);

        clearInterval(micStrobeTimeout);

        changed = false;
    }

    return { audioContext, TrackSource, analyser, killAutoModeStrobes, trackStrobe, micStrobe };

}