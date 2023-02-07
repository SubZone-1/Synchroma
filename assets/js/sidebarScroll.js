window.onresize = window.onload = function () {
    if (playerHidden == false && window.innerHeight <= 1050) {
        document.getElementById("AM-bottom-position-container").classList.remove("absolute");
    } else if (playerHidden == true && window.innerHeight <= 940) {
        document.getElementById("AM-bottom-position-container").classList.remove("absolute");
    } else {
        document.getElementById("AM-bottom-position-container").classList.add("absolute");
    }
}