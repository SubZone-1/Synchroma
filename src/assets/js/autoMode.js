// node imports (Web Audio API)
import { audioContext, source } from "./autoModeStrobes.js";

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

    // styling
    autoBtn.classList.remove("text-gray-700");
    autoBtn.classList.remove("hover:scale-1125");
    autoBtn.classList.add("text-themeOrange");

    manualBtn.classList.remove("text-themeOrange");
    manualBtn.classList.add("text-text-gray-700");
    manualBtn.classList.add("hover:scale-1125");
});

/* ----- SOUND COME THROUGH Check ----- */
// internal player reference
const player = document.getElementById("internal-player");
// checkbox reference
const checkbox = document.getElementById("SCT-check");

// create a new analyser node, set fftSize and connect it to AudioContext destination
const analyser1 = audioContext.createAnalyser();
analyser1.fftSize = 2048;
source.connect(analyser1);

// create a new Float32Array to store the frequency data
const frequencyData = new Float32Array(analyser1.frequencyBinCount);

// function to check if audio is playing
function checkAudioPlaying() {
    // get the frequency data from the analyser node
    analyser1.getFloatFrequencyData(frequencyData);

    // loop through the frequency data and check if any values are greater than -50 dB
    for (let i = 0; i < frequencyData.length; i++) {
        if (frequencyData[i] > -50) {
        // audio is playing, do something here
        checkbox.checked = true;

        return;
        }
    }

    // audio is not playing, do something here
    checkbox.checked = false;
}

// function to start checking if audio is playing
function startCheckingAudioPlaying() {
    // create a new AudioBufferSourceNode and connect it to the analyser node
    const bufferSourceNode = audioContext.createBufferSource();
    bufferSourceNode.buffer = audioContext.createBuffer(1, 1, 22050);
    bufferSourceNode.connect(analyser1);

    // start the AudioBufferSourceNode and call checkAudioPlaying() every 50 ms
    bufferSourceNode.start();
    setInterval(checkAudioPlaying, 50);
}

// call startCheckingAudioPlaying() when the audio element is ready to play
player.addEventListener('canplay', startCheckingAudioPlaying);

// event listeners for internal player controls
player.addEventListener('play', () => {
    checkbox.checked = true;
    player.play();
});
player.addEventListener('pause', () => {
    checkbox.checked = false;
    player.pause();
});
player.addEventListener('ended', () => {
    checkbox.checked = false;
});

/* ----- Audio Meter (Web Audio Peak Meters) ----- */
var webAudioPeakMeter = require("web-audio-peak-meter");

const meterToggle = document.getElementById("meter-ON-OFF");
const audioMeter = document.getElementById("audio-meter");

var meterNode = webAudioPeakMeter.createMeterNode(source, audioContext);
webAudioPeakMeter.createMeter(audioMeter, meterNode, {});

meterToggle.addEventListener("change", () => { // toggle visibility
    if (audioMeter.style.visibility === "hidden") {
        audioMeter.style.visibility = "visible";
    } else {
        audioMeter.style.visibility = "hidden";
    }
});