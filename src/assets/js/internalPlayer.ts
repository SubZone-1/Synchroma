// BeatDetect.js
import BeatDetect from './BeatDetect.js';
import { AM_offBtn, AM_onBtn, avgAmplitude, avgAmplitudeLabel, bmpMultipliers, bmpMultipliersLabel, bpmDivSpan, doublespeedBtn, eject, halfspeedBtn, inputDevice, internalPlayer, internalPlayerContainer, micLoaderContainer, micLoaderLabel, nowPlaying, playerFile, showHideA, trackBPM_text } from './elements.js';
import toastr from "toastr";

export function internalPlayerInit() {
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

    let file: File;
    let fileURL: string;
    let trackBPM: number;

    playerFile.addEventListener("change", () => {
        file = playerFile.files![0];
        fileURL = blob.createObjectURL(file);

        console.log(file);
        console.log('File name: ' + file.name);
        console.log('File type: ' + file.type);
        console.log('File BlobURL: ' + fileURL);

        internalPlayer.src = fileURL;
        nowPlaying.innerHTML = "<b>Playing: </b>" + file.name;
        nowPlaying.removeAttribute("hidden");
        // select internal player as input device
        inputDevice.selectedIndex = 1;

        if (!trackBPM) { // show BPM loader while trackBPM is undefined
            micLoaderContainer.removeAttribute("hidden");
            micLoaderLabel.removeAttribute("hidden");

            AM_onBtn.setAttribute("disabled", 'true');
        }

        beatDetect.getBeatInfo({
            url: fileURL
        }).then(info => { // after calculation is done
            trackBPM = Math.round(info.bpm);
            
            console.log("Track BPM (average): " + info.bpm);
            console.log("Track BPM (rounded): " + trackBPM);
            console.log("Offset: " + info.offset);
            console.log("First Bar: " + info.firstBar);

            trackBPM_text.value = trackBPM; // hidden input

            micLoaderContainer.setAttribute("hidden", 'true');
            micLoaderLabel.setAttribute("hidden", 'true');
            AM_onBtn.removeAttribute("disabled");

            avgAmplitudeLabel.removeAttribute("hidden");
            avgAmplitude.removeAttribute("hidden");

            bmpMultipliersLabel.removeAttribute("hidden");
            bmpMultipliers.removeAttribute("hidden");
            bpmDivSpan.innerHTML = String(trackBPM);

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
            
            micLoaderContainer.setAttribute("hidden", 'true');
            micLoaderLabel.setAttribute("hidden", 'true');

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
        internalPlayer.src = ""; // remove file from player

        nowPlaying.setAttribute("hidden", 'true'); // hide now playing
        eject.setAttribute("hidden", 'true'); // hide eject button

        bpmDivSpan.innerHTML = "---"; // reset detected tempo text
        avgAmplitude.innerHTML = "0"; // reset avg amplitude text

        // hide avg amplitude
        avgAmplitudeLabel.setAttribute("hidden", 'true');
        avgAmplitude.setAttribute("hidden", 'true');

        // hide track BPM multipliers
        bmpMultipliersLabel.setAttribute("hidden", 'true');
        bmpMultipliers.setAttribute("hidden", 'true')

        AM_offBtn.click(); // simulate OFF button click
    });

    showHideA.addEventListener("click", () => {
        if (showHideA.innerHTML == "(HIDE)") {
            internalPlayerContainer.setAttribute("hidden", 'true');
            showHideA.innerHTML = "(SHOW)";
        } else {
            internalPlayerContainer.removeAttribute("hidden");
            showHideA.innerHTML = "(HIDE)";
        }
    });

    /* ----- SOUND COME THROUGH BPM multipliers ----- */
    halfspeedBtn.addEventListener("click", () => {
        trackBPM = trackBPM / 2;
        trackBPM_text.value = trackBPM; // hidden input
        bpmDivSpan.innerHTML = String(trackBPM);
    });
    doublespeedBtn.addEventListener("click", () => {
        trackBPM = trackBPM * 2;
        trackBPM_text.value = trackBPM; // hidden input
        bpmDivSpan.innerHTML = String(trackBPM);
    });

    return { 
        getFile() {
            return file
        }, 
        getTrackBPM() {
            return trackBPM
        } 
    };
}
