let fs = false;

document.getElementById("fullscreen-btn").addEventListener("click", () => {
    if (fs == false) {
        document.documentElement.requestFullscreen();
        fs = true;
        document.getElementById("fullscreen-btn").innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
        document.exitFullscreen();
        fs = false;
        document.getElementById("fullscreen-btn").innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
});