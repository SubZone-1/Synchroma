import { logoBlack_Img, logoHorizontalBlack_Img, logoHorizontalWhite_Img, symbol_Img } from "./assets/js/elements";

/* ---------- CSS files ---------- */
import "./assets/css/styles.css";
import "./assets/css/extra.css";

/* ---------- JS scripts ---------- */
import { autoModeInit } from "./assets/js/autoMode";
import { autoModeStrobesInit } from "./assets/js/autoModeStrobes";
import "./assets/js/BeatDetect";
import { durationSliderInit } from "./assets/js/durationSlider";
import { frequencyRangeFocusInit } from "./assets/js/frequencyRangeFocus";
import { fullscreenInit } from "./assets/js/fullscreen";
import { inputDevicesInit } from "./assets/js/inputDevices";
import { internalPlayerInit } from "./assets/js/internalPlayer";
import { manualModeInit } from "./assets/js/manualMode";
import { manualModeStrobesInit } from "./assets/js/manualModeStrobes";
import { offBtnInit } from "./assets/js/offBtn";
import { onBtnInit } from "./assets/js/onBtn";
import { opencloseSidebarInit } from "./assets/js/opencloseSidebar";
import { sidebarScrollInit } from "./assets/js/sidebarScroll";
import { strobeColorsInit } from "./assets/js/strobeColors";
import { tempoTapInit } from "./assets/js/tempoTap";
import { thresholdSliderInit } from "./assets/js/thresholdSlider";
import { warningInit } from "./assets/js/warning";

/* ---------- Images ---------- */
import symbol from "./assets/img/logo-V2/symbol.png";                               // 1
import logoHorizontalBlack from "./assets/img/logo-V2/logo-horizontal-black.png";   // 2
import logoHorizontalWhite from "./assets/img/logo-V2/logo-horizontal-white.png";   // 3
import logoBlack from "./assets/img/logo-V2/logo-black.png";                        // 4

// 4
logoBlack_Img.src = logoBlack;

// required functions before app initialization
opencloseSidebarInit();
sidebarScrollInit();

warningInit(initApp);

// The AudioContext was not allowed to start. It must be resumed (or created) after a user gesture on the page. https://goo.gl/7K7WLu

async function initApp() {
    // 1
    symbol_Img.src = symbol;
    // 2
    logoHorizontalBlack_Img.src = logoHorizontalBlack;
    // 3
    logoHorizontalWhite_Img.src = logoHorizontalWhite;

    const { 
        audioContext, TrackSource, analyser, killAutoModeStrobes, trackStrobe, micStrobe
    } = await autoModeStrobesInit()
    await autoModeInit(audioContext, TrackSource, analyser)

    durationSliderInit()
    frequencyRangeFocusInit()
    fullscreenInit()
    inputDevicesInit()
    const {getFile, getTrackBPM} = internalPlayerInit()
    const { getBPMvalueSource } = manualModeInit()
    const { killManualModeStrobes, manualStrobe, tapStrobe, handleTapBPM } = manualModeStrobesInit(getBPMvalueSource)
    offBtnInit(killAutoModeStrobes, killManualModeStrobes)
    onBtnInit(getFile, getTrackBPM, trackStrobe, micStrobe, getBPMvalueSource, manualStrobe, tapStrobe)
    strobeColorsInit()
    tempoTapInit(handleTapBPM)
    thresholdSliderInit()
}

/** 
 * ! Problem Log:
 * ? - toastr notifications not working
 * * - manualModeStrobes.ts [Ln 121] throws "No overload matches this call" error, alternative does not work
 */