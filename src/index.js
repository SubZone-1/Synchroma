/* ---------- CSS files ---------- */
import "./assets/css/styles.css";
import "./assets/css/extra.css";

/* ---------- JS scripts ---------- */
require("./assets/js/autoMode"); // TODO: change source on peak meter to selected input device source
require("./assets/js/autoModeStrobes"); // TODO: fine-tune detection threshold and filters (detection method?) // TODO: process microphone audio
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
require("./assets/js/tempoTap"); // TODO: find a way to pause strobe while tap count is 1-2
require("./assets/js/thresholdSlider");

/* ---------- Images ---------- */
import symbol from "./assets/img/logo-V2/symbol.png";                               // 1
import logoHorizontalBlack from "./assets/img/logo-V2/logo-horizontal-black.png";   // 2
import logoHorizontalWhite from "./assets/img/logo-V2/logo-horizontal-white.png";   // 3

// 1
const symbol_Img = document.querySelector("link[rel~='icon']");
symbol_Img.href = symbol;

// 2
const logoHorizontalBlack_Img = document.getElementById("sidebar-logo");
logoHorizontalBlack_Img.src = logoHorizontalBlack;

// 3
const logoHorizontalWhite_Img = document.getElementById("main-logo");
logoHorizontalWhite_Img.src = logoHorizontalWhite;