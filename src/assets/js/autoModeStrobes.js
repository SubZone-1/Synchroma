var selectedFrequencyRange = "master"; // default value

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

// create an AudioContext instance
const audioContext = new AudioContext();

// create a filter node (to analyze separate frequency ranges)
const filter = audioContext.createBiquadFilter();

// create an analyser node and set fftSize
const analyser = audioContext.createAnalyser();
analyser.fftSize = 2048;

// create a source (internal player)
const source = audioContext.createMediaElementSource(document.getElementById("internal-player"));

// change source whenever a new file is loaded into the player
document.getElementById("internal-player").addEventListener("change", () => {
    source = audioContext.createMediaElementSource(document.getElementById("internal-player"));
});

// connect the source audio (from internal player) to destination
source.connect(audioContext.destination);
filter.connect(analyser);

// set up the data array
const dataArray = new Uint8Array(analyser.frequencyBinCount);

var trackBPM_interval = 0;
var trackBPM_text = document.getElementById("track-bpm");
var inputDevice = document.getElementById("select-input-device");
var inputDevice_text = "Internal Player"; // default option
var changed = false; // in order to activate the strobe before event the listener gets triggered
var isActive = false; // in order to check if strobe is on or off
var trackStrobeTimeout; // unchanged track interval
var trackStrobeTimeout_changed; // changed track interval
const body = document.body;

inputDevice.addEventListener("change", event => { // get selected device name (label)
    var inputDevice_option = event.target.selectedOptions[0];
    inputDevice_text = inputDevice_option.label;
});

// strobe duration event listener
var duration = 100; // default value
const slider = document.getElementById("AM-duration-slider");
slider.addEventListener("input", () => {
    duration = slider.value;
}, false);

// beat detection threshold event listener
var threshold = 30; // default value
const slider1 = document.getElementById("threshold-slider");
slider1.addEventListener("input", () => {
    threshold = slider1.value;
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
            // NOTE: filtered audio (filter node) is only read by the analyser, only the unchanged audio (source node) comes trough the speakers (destination)
            if (selectedFrequencyRange == "low") { // lowpass
                filter.type = "lowpass";
                filter.frequency.value = 200; // Hz
                source.connect(filter);
                filter.connect(analyser);

                source.connect(audioContext.destination);
            } else if (selectedFrequencyRange == "mid") { // bandpass
                filter.type = "bandpass";
                source.connect(filter);
                filter.connect(analyser);

                source.connect(audioContext.destination);
            } else if (selectedFrequencyRange == "high") { // highpass
                filter.type = "highpass";
                source.connect(filter);
                filter.connect(analyser);

                source.connect(audioContext.destination);
            } else { // no filter, all frequencies pass through
                filter.type = "allpass";
                source.connect(filter);
                filter.connect(analyser);

                source.connect(audioContext.destination);
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
                body.classList.remove("bg-black");
                body.classList.add("bg-white");

                // kill strobe once the strobe duration expires
                setTimeout(() => {
                    body.classList.remove("bg-white");
                    body.classList.add("bg-black");
                }, duration);
                
                ranTimes++;
                console.log("Device: " + inputDevice_text + " | BPM: " + lastTrackBPMValue + " | Strobe duration: " + duration + "ms | " + "Beat detection threshold: " + threshold + "% | " + "Times ran: " + ranTimes + " | Changed = " + changed + " | Filter: " + filter.type);
            }
        }, trackBPM_interval);
    }
    
    document.getElementById("BPM-multipliers").addEventListener("click", () => { // event listener
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
                    body.classList.remove("bg-black");
                    body.classList.add("bg-white");

                    // kill strobe once the strobe duration expires
                    setTimeout(() => {
                        body.classList.remove("bg-white");
                        body.classList.add("bg-black");
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

export { audioContext, source };