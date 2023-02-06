let fs = false;

function fullscreen() {
    if (fs == false) {
        //console.log('Browser is in fullscreen');
        document.documentElement.requestFullscreen();
        fs = true;
        document.getElementById("fullscreen-btn").innerHTML = '<i class="fa-solid fa-compress"></i>';
    } else {
        //console.log('Browser is not in fullscreen');
        document.exitFullscreen();
        fs = false;
        document.getElementById("fullscreen-btn").innerHTML = '<i class="fa-solid fa-expand"></i>';
    }
}