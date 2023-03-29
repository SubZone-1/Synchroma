export const symbol_Img = document.querySelector("link[rel~='icon']") as HTMLImageElement;
export const logoHorizontalBlack_Img = document.getElementById("sidebar-logo") as HTMLImageElement;
export const logoHorizontalWhite_Img = document.getElementById("main-logo") as HTMLImageElement;
export const logoBlack_Img = document.getElementById("modal-logo") as HTMLImageElement;

export const autoModeContainer = document.getElementById("auto-mode-container") as HTMLDivElement;
export const manualModeContainer = document.getElementById("manual-mode-container") as HTMLDivElement;

export const autoBtn = document.getElementById("auto") as HTMLButtonElement;
export const manualBtn = document.getElementById("manual") as HTMLButtonElement;
export const mmOnBtn = document.getElementById("MM-on") as HTMLButtonElement;
export const mmOffBtn = document.getElementById("MM-off") as HTMLButtonElement;
export const lowBtn = document.getElementById("low") as HTMLButtonElement;
export const midBtn = document.getElementById("mid") as HTMLButtonElement;
export const highBtn = document.getElementById("high") as HTMLButtonElement;
export const masterBtn = document.getElementById("master") as HTMLButtonElement;
export const fullscreenBtn = document.getElementById("fullscreen-btn") as HTMLButtonElement;
export const useManualBtn = document.getElementById("useManual-btn") as HTMLButtonElement;
export const useTapBtn = document.getElementById("useTap-btn") as HTMLButtonElement;
export const btnOpenCloseSidebar = document.getElementById("opencloseSidebar") as HTMLButtonElement;
export const sidebarContainer = document.getElementById("sidebar-container") as HTMLDivElement;
export const closeModalBtn = document.getElementById("close-modal") as HTMLButtonElement;

export const trackBPM_text = document.getElementById("track-bpm") as HTMLProgressElement; // track strobe interval value element (hidden input)
export const micBPM_text = document.getElementById("mic-bpm") as HTMLProgressElement; // mic strobe interval value element (hidden input)
export const inputDevice = document.getElementById("select-input-device") as HTMLSelectElement; // input device select element
export const slider_threshold = document.getElementById("threshold-slider") as HTMLProgressElement; // threshold slider element
export const overlay = document.getElementById("overlay") as HTMLDivElement; // strobe overlay element

export const AM_durationSlider = document.getElementById("AM-duration-slider") as HTMLProgressElement; // duration slider element
export const AM_durationOutput = document.getElementById("AM-duration-label") as HTMLHeadElement;
export const AM_onBtn = document.getElementById("AM-on") as HTMLButtonElement;
export const AM_offBtn = document.getElementById("AM-off") as HTMLButtonElement;

export const MM_durationOutput = document.getElementById("MM-duration-label") as HTMLHeadElement;
export const MM_durationSlider = document.getElementById("MM-duration-slider") as HTMLProgressElement;

export const  showHideA = document.getElementById("show-hide-a") as HTMLAnchorElement;

export const internalPlayer = document.getElementById("internal-player") as HTMLAudioElement;
export const internalPlayerContainer = document.getElementById("internal-player-container") as HTMLDivElement;
export const playerFile = document.getElementById("player-file") as HTMLInputElement;
export const eject = document.getElementById("eject") as HTMLButtonElement;

export const bpmDiv = document.getElementById("bpm") as HTMLDivElement;
export const bpmDivSpan = bpmDiv.querySelector("span") as HTMLSpanElement;
export const avgAmplitude = document.getElementById("avg-amplitude") as HTMLHeadElement;
export const avgAmplitudeLabel = document.getElementById("avg-amplitude-label") as HTMLHeadElement;

export const micLoaderContainer = document.getElementById("mic-loader-container") as HTMLDivElement;
export const micLoaderLabel = document.getElementById("mic-loader-label") as HTMLDivElement;

export const bmpMultipliers = document.getElementById("BPM-multipliers") as HTMLHeadElement;
export const bmpMultipliersLabel = document.getElementById("BPM-multipliers-label") as HTMLHeadElement;
export const nowPlaying =  document.getElementById('now-playing') as HTMLParagraphElement;

export const MicAudioMeter = document.getElementById('mic-audio-meter') as HTMLDivElement;
export const colorsBtn = Array.from(document.getElementsByClassName("colorbtn")) as HTMLButtonElement[]; // array with color buttons
export const staticCycleA = document.getElementById("static-cycle-a") as HTMLAnchorElement;

export const whiteBtn = document.getElementById("white") as HTMLButtonElement;
export const redBtn = document.getElementById("red") as HTMLButtonElement;
export const greenBtn = document.getElementById("green") as HTMLButtonElement;
export const blueBtn = document.getElementById("blue") as HTMLButtonElement;
export const purpleBtn = document.getElementById("purple") as HTMLButtonElement;
export const yellowBtn = document.getElementById("yellow") as HTMLButtonElement;

export const tapBPM_text = document.getElementById("tap-bpm") as HTMLProgressElement;
export const manualBPM_text = document.getElementById("manual-value") as HTMLProgressElement;

export const meterToggle = document.getElementById("meter-ON-OFF") as HTMLInputElement;
export const TrackAudioMeter = document.getElementById("track-audio-meter") as HTMLDivElement;

export const halfspeedBtn = document.getElementById("halfspeed") as HTMLButtonElement;
export const doublespeedBtn = document.getElementById("doublespeed") as HTMLButtonElement;

export const playPauseCheck = document.getElementById("play-pause-check") as HTMLInputElement;

export const resetTapperBtn_a = document.getElementById("reset-tapbpm-a") as HTMLAnchorElement;
export const resetTapperBtn_h = document.getElementById("reset-tapbpm-h") as HTMLHeadElement;

export const avgValue = document.getElementById("avg-value") as HTMLHeadElement;
export const roundedValue = document.getElementById("rounded-value") as HTMLHeadElement;

export const tapBtn = document.getElementById('tap-btn') as HTMLButtonElement;
