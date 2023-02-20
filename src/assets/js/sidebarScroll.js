var selectedMode = "auto"; // default value; changes according to which strobe sync mode button is pressed

document.getElementById("auto").addEventListener("click", () => {
    selectedMode = "auto";
});
document.getElementById("manual").addEventListener("click", () => {
    selectedMode = "manual";
});

var playerHidden = false; // default value; used for controlling sidebar scroll point

document.getElementById("show-hide-a").addEventListener("click", () => {
    if (document.getElementById("show-hide-a").innerHTML == "(HIDE)") {
        playerHidden = true;
    } else {
        playerHidden = false;
    }
});

// execute function on page load and window resize
window.onresize = window.onload = () => {
    if (selectedMode = "auto") { // when auto strobe sync mode is selected
        if (playerHidden == false && window.innerHeight <= 1050) { // if internal player is being shown and viewport height is lower or equals 1050px
            document.getElementById("AM-bottom-position-container").classList.remove("absolute");
        } else if (playerHidden == true && window.innerHeight <= 940) { // if internal player is hidden and viewport height is lower or equals 940px
            document.getElementById("AM-bottom-position-container").classList.remove("absolute");
        } else {
            document.getElementById("AM-bottom-position-container").classList.add("absolute"); // in order to ignore DOM and stick element to the bottom of the sidebar
        }
    }

    if (selectedMode = "manual") { // when manual strobe sync mode is selected
        if (playerHidden == false && window.innerHeight <= 835) { // when internal player is being shown and viewport height is lower or equals 835px
            document.getElementById("MM-bottom-position-container").classList.remove("absolute");
        } else if (playerHidden == true && window.innerHeight <= 705) { // when internal player is hidden and viewport height is lower or equals 705px
            document.getElementById("MM-bottom-position-container").classList.remove("absolute");
        } else {
            document.getElementById("MM-bottom-position-container").classList.add("absolute"); // in order to ignore DOM and stick element to the bottom of the sidebar
        }
    }
}