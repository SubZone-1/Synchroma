import { fullscreenBtn } from "./elements";

export function fullscreenInit() {
    let fs = false;

    fullscreenBtn.addEventListener("click", () => {
        if (fs == false) {
            document.documentElement.requestFullscreen();
            fs = true;
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
        } else {
            document.exitFullscreen();
            fs = false;
            fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
        }
    });
}