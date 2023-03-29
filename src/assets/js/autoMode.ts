// node imports (Web Audio API)
import webAudioPeakMeter from "web-audio-peak-meter";
import { MicAudioMeter, TrackAudioMeter, autoBtn, autoModeContainer, inputDevice, internalPlayer, manualBtn, manualModeContainer, meterToggle, mmOffBtn } from "./elements";
import { circularRefs } from "./circularRefs";

export async function autoModeInit(
    audioContext:  AudioContext, 
    TrackSource: MediaElementAudioSourceNode, 
    analyser: AnalyserNode
) {
    autoBtn.addEventListener("click", () => {
        // show auto mode
        autoModeContainer.removeAttribute("hidden");
        // hide manual mode
        manualModeContainer.setAttribute("hidden", "true");

        // disable auto mode button (selected) and enable manual mode button
        autoBtn.setAttribute("disabled", "true");
        manualBtn.removeAttribute("disabled");
        
        mmOffBtn.click(); // turn off manual mode strobe

        // styling
        autoBtn.classList.remove("text-gray-700");
        autoBtn.classList.remove("hover:scale-1125");
        autoBtn.classList.add("text-themeOrange");

        manualBtn.classList.remove("text-themeOrange");
        manualBtn.classList.add("text-text-gray-700");
        manualBtn.classList.add("hover:scale-1125");
    });

    /* ----- SOUND COME THROUGH Check ----- */
    const checkbox = document.getElementById("SCT-check") as HTMLInputElement;

    // create a new Float32Array to store the frequency data
    const frequencyData = new Float32Array(analyser.frequencyBinCount);

    // function to check if audio is playing
    function checkAudioPlaying() {
        // get the frequency data from the analyser node
        analyser.getFloatFrequencyData(frequencyData);

        // loop through the frequency data and check if any values are greater than -60 dB
        for (let i = 0; i < frequencyData.length; i++) {
            if (frequencyData[i] > -60) {
            // audio is playing, check the checkbox
            checkbox.checked = true;
            
            return;
            }
        }

        // audio is not playing, uncheck the checkbox
        checkbox.checked = false;
    }

    // function to start checking if audio is playing
    circularRefs.startCheckingAudioPlaying = () => {
        // create a new AudioBufferTrackSourceNode and connect it to the analyser node
        const bufferTrackSourceNode = audioContext.createBufferSource();
        bufferTrackSourceNode.buffer = audioContext.createBuffer(1, 1, 22050);
        bufferTrackSourceNode.connect(analyser);

        // start the AudioBufferTrackSourceNode and call checkAudioPlaying() every 50 ms
        bufferTrackSourceNode.start();
        setInterval(checkAudioPlaying, 50);
    }

    // call startCheckingAudioPlaying() when audio element is ready to play
    internalPlayer.addEventListener('canplay', circularRefs.startCheckingAudioPlaying);

    /* ----- Track Audio Meter (Web Audio Peak Meters) ----- */

    const TrackMeterNode = webAudioPeakMeter.createMeterNode(TrackSource, audioContext);
    webAudioPeakMeter.createMeter(TrackAudioMeter, TrackMeterNode, {});

    meterToggle.addEventListener("change", () => { // toggle visibility
        if (inputDevice.selectedIndex === 1) { // if internal player is selected as input device
            if (TrackAudioMeter.style.visibility === "hidden") {
                TrackAudioMeter.style.visibility = "visible";
            } else {
                TrackAudioMeter.style.visibility = "hidden";
            }
        } else {
            if (MicAudioMeter.style.visibility === "hidden") {
                MicAudioMeter.style.visibility = "visible";
            } else {
                MicAudioMeter.style.visibility = "hidden";
            }
        }    
    });

    inputDevice.addEventListener("change", () => {
        if (meterToggle.checked) {
            meterToggle.checked = false; // uncheck toggle

            TrackAudioMeter.style.visibility = "hidden";
            MicAudioMeter.style.visibility = "hidden";
        }
    });
}