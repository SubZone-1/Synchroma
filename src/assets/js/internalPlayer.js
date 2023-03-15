// BeatDetect.js
import BeatDetect from './BeatDetect.js';

// Check for BlobURL support
var blob = window.URL || window.webkitURL;
if (!blob) {
    console.log("Your browser does not support Blob URL's.");          
}

// Component presented with default values
const beatDetect = new BeatDetect({
    sampleRate: 44100, // Most track are using this sample rate
    log: false, // Debug BeatDetect execution with logs
    perf: false, // Attach elapsed time to result object
    round: false, // To have an integer result for the BPM
    float: 4, // The floating precision in [1, Infinity]
    lowPassFreq: 150, // Low pass filter cut frequency
    highPassFreq: 100, // High pass filter cut frequency
    bpmRange: [90, 180], // The BPM range to output
    timeSignature: 4 // The number of beat in a measure
});

const playerFile = document.getElementById("player-file");
const player = document.getElementById("internal-player");
const eject = document.getElementById("eject");

let file;
let fileURL;
let trackBPM;

playerFile.addEventListener("change", () => {
    file = playerFile.files[0];
    fileURL = blob.createObjectURL(file);

    console.log(file);
    console.log('File name: ' + file.name);
    console.log('File type: ' + file.type);
    console.log('File BlobURL: ' + fileURL);

    player.src = fileURL;
    document.getElementById('now-playing').innerHTML = "<b>Playing: </b>" + file.name;
    document.getElementById('now-playing').removeAttribute("hidden");
    // select internal player as input device
    document.getElementById('select-input-device').selectedIndex = "1";

    if (!trackBPM) { // show BPM loader while trackBPM is undefined
        document.getElementById("loader-container").removeAttribute("hidden");
        document.getElementById("loader-label").removeAttribute("hidden");

        document.getElementById("AM-on").setAttribute("disabled", true);
    }

    beatDetect.getBeatInfo({
        url: fileURL
    }).then(info => { // after calculation is done
        trackBPM = Math.round(info.bpm);
        
        console.log("Track BPM (average): " + info.bpm);
        console.log("Track BPM (rounded): " + trackBPM);
        console.log("Offset: " + info.offset);
        console.log("First Bar: " + info.firstBar);

        document.getElementById("track-bpm").value = trackBPM; // hidden input

        document.getElementById("loader-container").setAttribute("hidden", true);
        document.getElementById("loader-label").setAttribute("hidden", true);
        document.getElementById("AM-on").removeAttribute("disabled");

        document.getElementById("avg-amplitude-label").removeAttribute("hidden");
        document.getElementById("avg-amplitude").removeAttribute("hidden");

        document.getElementById("BPM-multipliers-label").removeAttribute("hidden");
        document.getElementById("BPM-multipliers").removeAttribute("hidden");
        document.getElementById("bpm").querySelector("span").innerHTML = trackBPM;

        eject.removeAttribute("hidden");

        toastr["success"]("The loaded track's BPM has finished calculating. You can now turn on the strobe.", "BPM Found")

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
    }).catch(error => { // throw error
        console.log(error);
        
        document.getElementById("loader-container").setAttribute("hidden", true);
        document.getElementById("loader-label").setAttribute("hidden", true);

        toastr["error"](error, "BPM error")

        toastr.options = {
            "closeButton": true,
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
    });
});

eject.addEventListener("click", () => {
    playerFile.value = ""; // remove file from input
    player.src = ""; // remove file from player

    document.getElementById('now-playing').setAttribute("hidden", true); // hide now playing
    eject.setAttribute("hidden", true); // hide eject button

    document.getElementById("bpm").querySelector("span").innerHTML = "---"; // reset detected tempo text
    document.getElementById("avg-amplitude").innerHTML = "0"; // reset avg amplitude text

    // hide avg amplitude
    document.getElementById("avg-amplitude-label").setAttribute("hidden", true);
    document.getElementById("avg-amplitude").setAttribute("hidden", true);

    // hide track BPM multipliers
    document.getElementById("BPM-multipliers-label").setAttribute("hidden", true);
    document.getElementById("BPM-multipliers").setAttribute("hidden", true)

    document.getElementById("AM-off").click(); // simulate OFF button click
});

document.getElementById("show-hide-a").addEventListener("click", () => {
    if (document.getElementById("show-hide-a").innerHTML == "(HIDE)") {
        document.getElementById("internal-player-container").setAttribute("hidden", true);
        document.getElementById("show-hide-a").innerHTML = "(SHOW)";
    } else {
        document.getElementById("internal-player-container").removeAttribute("hidden");
        document.getElementById("show-hide-a").innerHTML = "(HIDE)";
    }
});

/* ----- SOUND COME THROUGH BPM multipliers ----- */
document.getElementById("halfspeed").addEventListener("click", () => {
    trackBPM = trackBPM / 2;

    document.getElementById("track-bpm").value = trackBPM; // hidden input
    document.getElementById("bpm").querySelector("span").innerHTML = trackBPM;
});
document.getElementById("doublespeed").addEventListener("click", () => {
    trackBPM = trackBPM * 2;

    document.getElementById("track-bpm").value = trackBPM; // hidden input
    document.getElementById("bpm").querySelector("span").innerHTML = trackBPM;
});

export { file, trackBPM };