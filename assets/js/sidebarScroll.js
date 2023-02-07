var selectedMode = "auto";

window.onresize = window.onload = function () {
    if (selectedMode = "auto" && playerHidden == false && window.innerHeight <= 1050) {
        document.getElementById("AM-bottom-position-container").classList.remove("absolute");
    } else if (selectedMode = "auto" && playerHidden == true && window.innerHeight <= 940) {
        document.getElementById("AM-bottom-position-container").classList.remove("absolute");
    } else if (selectedMode = "manual" && playerHidden == false && window.innerHeight <= 685) {
        document.getElementById("MM-bottom-position-container").classList.remove("absolute");
    } else if (selectedMode = "manual" && playerHidden == true && window.innerHeight <= 565) {
        document.getElementById("MM-bottom-position-container").classList.remove("absolute");
    } else {
        document.getElementById("AM-bottom-position-container").classList.add("absolute");
        document.getElementById("MM-bottom-position-container").classList.add("absolute");
    }
}