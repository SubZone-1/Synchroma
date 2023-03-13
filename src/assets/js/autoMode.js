// variable imports 
import { MM_turnOff_aux } from "./offBtn.js";

// node imports (Web Audio API)
import { audioContext, TrackSource, analyser } from "./autoModeStrobes.js";

document.getElementById("auto").addEventListener("click", () => {
    // show auto mode
    document.getElementById("auto-mode-container").removeAttribute("hidden");
    // hide manual mode
    document.getElementById("manual-mode-container").setAttribute("hidden", "true");

    var autoBtn = document.getElementById("auto");
    var manualBtn = document.getElementById("manual");

    // disable auto mode button (selected) and enable manual mode button
    autoBtn.setAttribute("disabled", "true");
    manualBtn.removeAttribute("disabled");

    MM_turnOff_aux(); // turn off manual mode strobe

    // styling
    autoBtn.classList.remove("text-gray-700");
    autoBtn.classList.remove("hover:scale-1125");
    autoBtn.classList.add("text-themeOrange");

    manualBtn.classList.remove("text-themeOrange");
    manualBtn.classList.add("text-text-gray-700");
    manualBtn.classList.add("hover:scale-1125");
});

/* ----- SOUND COME THROUGH Check ----- */
const player = document.getElementById("internal-player");
const checkbox = document.getElementById("SCT-check");

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
export function startCheckingAudioPlaying() {
    // create a new AudioBufferTrackSourceNode and connect it to the analyser node
    const bufferTrackSourceNode = audioContext.createBufferSource();
    bufferTrackSourceNode.buffer = audioContext.createBuffer(1, 1, 22050);
    bufferTrackSourceNode.connect(analyser);

    // start the AudioBufferTrackSourceNode and call checkAudioPlaying() every 50 ms
    bufferTrackSourceNode.start();
    setInterval(checkAudioPlaying, 50);
}

// call startCheckingAudioPlaying() when audio element is ready to play
player.addEventListener('canplay', startCheckingAudioPlaying);

/* ----- Audio Meter (Web Audio Peak Meters) ----- */
const webAudioPeakMeter = require("web-audio-peak-meter");

const meterToggle = document.getElementById("meter-ON-OFF");
const audioMeter = document.getElementById("audio-meter");

const meterNode = webAudioPeakMeter.createMeterNode(TrackSource, audioContext);
webAudioPeakMeter.createMeter(audioMeter, meterNode, {});

meterToggle.addEventListener("change", () => { // toggle visibility
    if (audioMeter.style.visibility === "hidden") {
        audioMeter.style.visibility = "visible";
    } else {
        audioMeter.style.visibility = "hidden";
    }
});

export { webAudioPeakMeter, meterNode };