import { autoBtn, manualBtn, showHideA } from "./elements";

export function sidebarScrollInit() {
    let selectedMode = "auto"; // default value; changes according to which strobe sync mode button is pressed

    autoBtn.addEventListener("click", () => {
        selectedMode = "auto";
    });

    manualBtn.addEventListener("click", () => {
        selectedMode = "manual";
    });

    var playerHidden = false; // default value; used for controlling sidebar scroll point

    showHideA.addEventListener("click", () => {
        if (showHideA.innerHTML === "(HIDE)") {
            playerHidden = true;
        } else {
            playerHidden = false;
        }
    });

    // execute scrollPoints() on page load, window resize and sync mode switch
    window.addEventListener('load', scrollPoints);
    window.addEventListener('resize', scrollPoints);
    autoBtn.addEventListener('click', scrollPoints);
    manualBtn.addEventListener('click', scrollPoints);
    
    function scrollPoints() {
        if (selectedMode === "auto") { // when auto strobe sync mode is selected
            if (playerHidden === false && window.innerHeight <= 1150) { // if internal player is being shown and viewport height is lower or equals 1150px
                document.getElementById("AM-bottom-position-container")!.classList.remove("absolute");
            } else if (playerHidden === true && window.innerHeight <= 1010) { // if internal player is hidden and viewport height is lower or equals 1010px
                document.getElementById("AM-bottom-position-container")!.classList.remove("absolute");
            } else {
                document.getElementById("AM-bottom-position-container")!.classList.add("absolute"); // in order to ignore DOM and stick element to the bottom of the sidebar
            }
        }

        if (selectedMode === "manual") { // when manual strobe sync mode is selected
            if (playerHidden === false && window.innerHeight <= 930) { // when internal player is being shown and viewport height is lower or equals 930px
                document.getElementById("MM-bottom-position-container")!.classList.remove("absolute");
            } else if (playerHidden === true && window.innerHeight <= 790) { // when internal player is hidden and viewport height is lower or equals 790px
                document.getElementById("MM-bottom-position-container")!.classList.remove("absolute");
            } else {
                document.getElementById("MM-bottom-position-container")!.classList.add("absolute"); // in order to ignore DOM and stick element to the bottom of the sidebar
            }
        }
    }
}