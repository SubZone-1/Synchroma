/* ---------- CSS files ---------- */
import "./assets/css/styles.css";
import "./assets/css/extra.css";

/* ---------- JS scripts ---------- */
require("./assets/js/autoMode");
require("./assets/js/autoModeStrobes"); 
// TODO: fine-tune track detection threshold and filters (detection method?)
    //* TODO: set up filters (selected range) on mic audio stream (might be completed, needs testing)
    //* TODO: add a gain node to amplify mic audio stream amplitude for better readability
    //* TODO: add bpm value variation readability for mic audio stream (might be fixed, needs testing)
require("./assets/js/BeatDetect");
require("./assets/js/durationSlider");
require("./assets/js/frequencyRangeFocus");
require("./assets/js/fullscreen");
require("./assets/js/inputDevices");
require("./assets/js/internalPlayer");
require("./assets/js/manualMode");
require("./assets/js/manualModeStrobes");
require("./assets/js/offBtn");
require("./assets/js/onBtn");
require("./assets/js/opencloseSidebar");
require("./assets/js/sidebarScroll");
require("./assets/js/strobeColors");
require("./assets/js/tempoTap"); 
require("./assets/js/thresholdSlider");
require("./assets/js/warning");
// TODO: use cookies to show popup only when the user visits the page for the first time

/* ---------- Images ---------- */
import symbol from "./assets/img/logo-V2/symbol.png";                               // 1
import logoHorizontalBlack from "./assets/img/logo-V2/logo-horizontal-black.png";   // 2
import logoHorizontalWhite from "./assets/img/logo-V2/logo-horizontal-white.png";   // 3
import logoBlack from "./assets/img/logo-V2/logo-black.png";                        // 4

// 1
const symbol_Img = document.querySelector("link[rel~='icon']");
symbol_Img.href = symbol;

// 2
const logoHorizontalBlack_Img = document.getElementById("sidebar-logo");
logoHorizontalBlack_Img.src = logoHorizontalBlack;

// 3
const logoHorizontalWhite_Img = document.getElementById("main-logo");
logoHorizontalWhite_Img.src = logoHorizontalWhite;

// 4
const logoBlack_Img = document.getElementById("modal-logo");
logoBlack_Img.src = logoBlack;