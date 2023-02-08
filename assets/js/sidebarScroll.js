var selectedMode = "auto"; // default selection; changes according to which strobe sync mode button is pressed

// execute function on page load and window resize
window.onresize = window.onload = function () {
    if (selectedMode = "auto") { // when auto strobe sync mode is selected
        if (playerHidden == false && window.innerHeight <= 1050) { // if internal player is being shown and viewport height is lower or equals 1050px
            document.getElementById("AM-bottom-position-container").classList.remove("absolute");
        } else if (playerHidden == true && window.innerHeight <= 940) { // if internal player is hidden and viewport height is lower or equals 940px
            document.getElementById("AM-bottom-position-container").classList.remove("absolute");
        } else {
            document.getElementById("AM-bottom-position-container").classList.add("absolute"); // in order to ignore DOM and stick element to the bottom
        }
    }

    if (selectedMode = "manual") { // when manual strobe sync mode is selected
        if (playerHidden == false && window.innerHeight <= 835) { // when internal player is being shown and viewport height is lower or equals685px
            document.getElementById("MM-bottom-position-container").classList.remove("absolute");
        } else if (playerHidden == true && window.innerHeight <= 705) { // when internal player is hidden and viewport height is lower or equals 565px
            document.getElementById("MM-bottom-position-container").classList.remove("absolute");
        } else {
            document.getElementById("MM-bottom-position-container").classList.add("absolute"); // in order to ignore DOM and stick element to the bottom
        }
    }
}