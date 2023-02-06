window.onresize = window.onload = function () {
    if (window.innerHeight <= 900) {
        document.getElementById("AM-bottom-position-container").classList.remove("absolute");
    } else {
        document.getElementById("AM-bottom-position-container").classList.add("absolute");
    }
}