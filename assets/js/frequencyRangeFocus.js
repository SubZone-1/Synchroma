// assign buttons to variables
var lowBtn = document.getElementById("low");
var midBtn = document.getElementById("mid");
var highBtn = document.getElementById("high");
var masterBtn = document.getElementById("master");

function low_Btn() {
    // select and disable low button
    lowBtn.setAttribute("class", "low-btn selected");
    lowBtn.setAttribute("disabled", "true");

    // de-select rest
    midBtn.setAttribute("class", "mid-btn");
    highBtn.setAttribute("class", "high-btn");
    masterBtn.setAttribute("class", "master-btn");

    // enable rest
    midBtn.removeAttribute("disabled");
    highBtn.removeAttribute("disabled");
    masterBtn.removeAttribute("disabled");
}
function mid_Btn() {
    // select and disable mid button
    midBtn.setAttribute("class", "mid-btn selected");
    midBtn.setAttribute("disabled", "true");

    // de-select rest
    lowBtn.setAttribute("class", "low-btn");
    highBtn.setAttribute("class", "high-btn");
    masterBtn.setAttribute("class", "master-btn");
    
    // enable rest
    lowBtn.removeAttribute("disabled");
    highBtn.removeAttribute("disabled");
    masterBtn.removeAttribute("disabled");
}
function high_Btn() {
    // select and disable high button
    highBtn.setAttribute("class", "high-btn selected");
    highBtn.setAttribute("disabled", "true");

    // de-select rest
    lowBtn.setAttribute("class", "low-btn");
    midBtn.setAttribute("class", "mid-btn");
    masterBtn.setAttribute("class", "master-btn");

    // enable rest
    lowBtn.removeAttribute("disabled");
    midBtn.removeAttribute("disabled");
    masterBtn.removeAttribute("disabled");
}
function master_Btn() {
    // select and disable master button
    masterBtn.setAttribute("class", "master-btn selected");
    masterBtn.setAttribute("disabled", "true");

    // de-select rest
    lowBtn.setAttribute("class", "low-btn");
    midBtn.setAttribute("class", "mid-btn");
    highBtn.setAttribute("class", "high-btn");

    // enable rest
    lowBtn.removeAttribute("disabled");
    midBtn.removeAttribute("disabled");
    highBtn.removeAttribute("disabled");
}