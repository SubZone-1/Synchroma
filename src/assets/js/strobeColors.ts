import { blueBtn, greenBtn, overlay, purpleBtn, redBtn, staticCycleA, whiteBtn, yellowBtn } from "./elements";

export function strobeColorsInit() {
    let selectedColor = "white"; // default color

    whiteBtn.addEventListener("click", () => {
        if (selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
            selectedColor = "white";
        
            // select and disable white button
            whiteBtn.classList.add("border-2")
            whiteBtn.classList.add("border-themeOrange")
            whiteBtn.classList.remove("hover:scale-1100");
            whiteBtn.setAttribute("disbled", "true");

            // de-select rest
            redBtn.classList.add("hover:scale-1100");
            redBtn.classList.remove("border-2");
            redBtn.classList.remove("border-themeOrange");
            greenBtn.classList.add("hover:scale-1100");
            greenBtn.classList.remove("border-2");
            greenBtn.classList.remove("border-themeOrange");
            blueBtn.classList.add("hover:scale-1100");
            blueBtn.classList.remove("border-2");
            blueBtn.classList.remove("border-themeOrange");
            purpleBtn.classList.add("hover:scale-1100");
            purpleBtn.classList.remove("border-2");
            purpleBtn.classList.remove("border-themeOrange");
            yellowBtn.classList.add("hover:scale-1100");
            yellowBtn.classList.remove("border-2");
            yellowBtn.classList.remove("border-themeOrange");

            // enable rest
            redBtn.removeAttribute("disabled");
            greenBtn.removeAttribute("disabled");
            blueBtn.removeAttribute("disabled");
            purpleBtn.removeAttribute("disabled");
            yellowBtn.removeAttribute("disabled");

            overlay.className = "w-full h-full absolute";
            overlay.classList.add("bg-white");
        }
    });

    redBtn.addEventListener("click", () => {
        if (selectedColor == "white" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
            selectedColor = "red";
        
            // select and disable red button
            redBtn.classList.add("border-2")
            redBtn.classList.add("border-themeOrange")
            redBtn.classList.remove("hover:scale-1100");
            redBtn.setAttribute("disbled", "true");

            // de-select rest
            whiteBtn.classList.add("hover:scale-1100");
            whiteBtn.classList.remove("border-2");
            whiteBtn.classList.remove("border-themeOrange");
            greenBtn.classList.add("hover:scale-1100");
            greenBtn.classList.remove("border-2");
            greenBtn.classList.remove("border-themeOrange");
            blueBtn.classList.add("hover:scale-1100");
            blueBtn.classList.remove("border-2");
            blueBtn.classList.remove("border-themeOrange");
            purpleBtn.classList.add("hover:scale-1100");
            purpleBtn.classList.remove("border-2");
            purpleBtn.classList.remove("border-themeOrange");
            yellowBtn.classList.add("hover:scale-1100");
            yellowBtn.classList.remove("border-2");
            yellowBtn.classList.remove("border-themeOrange");

            // enable rest
            whiteBtn.removeAttribute("disabled");
            greenBtn.removeAttribute("disabled");
            blueBtn.removeAttribute("disabled");
            purpleBtn.removeAttribute("disabled");
            yellowBtn.removeAttribute("disabled");

            overlay.className = "w-full h-full absolute";
            overlay.classList.add("bg-red-700");
        }
    });

    greenBtn.addEventListener("click", () => {
        if (selectedColor == "white" || selectedColor == "red" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
            selectedColor = "green";
        
            // select and disable green button
            greenBtn.classList.add("border-2")
            greenBtn.classList.add("border-themeOrange")
            greenBtn.classList.remove("hover:scale-1100");
            greenBtn.setAttribute("disbled", "true");

            // de-select rest
            whiteBtn.classList.add("hover:scale-1100");
            whiteBtn.classList.remove("border-2");
            whiteBtn.classList.remove("border-themeOrange");
            redBtn.classList.add("hover:scale-1100");
            redBtn.classList.remove("border-2");
            redBtn.classList.remove("border-themeOrange");
            blueBtn.classList.add("hover:scale-1100");
            blueBtn.classList.remove("border-2");
            blueBtn.classList.remove("border-themeOrange");
            purpleBtn.classList.add("hover:scale-1100");
            purpleBtn.classList.remove("border-2");
            purpleBtn.classList.remove("border-themeOrange");
            yellowBtn.classList.add("hover:scale-1100");
            yellowBtn.classList.remove("border-2");
            yellowBtn.classList.remove("border-themeOrange");

            // enable rest
            whiteBtn.removeAttribute("disabled");
            redBtn.removeAttribute("disabled");
            blueBtn.removeAttribute("disabled");
            purpleBtn.removeAttribute("disabled");
            yellowBtn.removeAttribute("disabled");

            overlay.className = "w-full h-full absolute";
            overlay.classList.add("bg-green-500");
        }
    });

    blueBtn.addEventListener("click", () => {
        if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "purple" || selectedColor == "yellow") {
            selectedColor = "blue";
        
            // select and disable blue button
            blueBtn.classList.add("border-2")
            blueBtn.classList.add("border-themeOrange")
            blueBtn.classList.remove("hover:scale-1100");
            blueBtn.setAttribute("disbled", "true");

            // de-select rest
            whiteBtn.classList.add("hover:scale-1100");
            whiteBtn.classList.remove("border-2");
            whiteBtn.classList.remove("border-themeOrange");
            redBtn.classList.add("hover:scale-1100");
            redBtn.classList.remove("border-2");
            redBtn.classList.remove("border-themeOrange");
            greenBtn.classList.add("hover:scale-1100");
            greenBtn.classList.remove("border-2");
            greenBtn.classList.remove("border-themeOrange");
            purpleBtn.classList.add("hover:scale-1100");
            purpleBtn.classList.remove("border-2");
            purpleBtn.classList.remove("border-themeOrange");
            yellowBtn.classList.add("hover:scale-1100");
            yellowBtn.classList.remove("border-2");
            yellowBtn.classList.remove("border-themeOrange");

            // enable rest
            whiteBtn.removeAttribute("disabled");
            redBtn.removeAttribute("disabled");
            greenBtn.removeAttribute("disabled");
            purpleBtn.removeAttribute("disabled");
            yellowBtn.removeAttribute("disabled");

            overlay.className = "w-full h-full absolute";
            overlay.classList.add("bg-blue-600");
        }
    });

    purpleBtn.addEventListener("click", () => {
        if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "yellow") {
            selectedColor = "purple";
        
            // select and disable purple button
            purpleBtn.classList.add("border-2")
            purpleBtn.classList.add("border-themeOrange")
            purpleBtn.classList.remove("hover:scale-1100");
            purpleBtn.setAttribute("disbled", "true");

            // de-select rest
            whiteBtn.classList.add("hover:scale-1100");
            whiteBtn.classList.remove("border-2");
            whiteBtn.classList.remove("border-themeOrange");
            redBtn.classList.add("hover:scale-1100");
            redBtn.classList.remove("border-2");
            redBtn.classList.remove("border-themeOrange");
            greenBtn.classList.add("hover:scale-1100");
            greenBtn.classList.remove("border-2");
            greenBtn.classList.remove("border-themeOrange");
            blueBtn.classList.add("hover:scale-1100");
            blueBtn.classList.remove("border-2");
            blueBtn.classList.remove("border-themeOrange");
            yellowBtn.classList.add("hover:scale-1100");
            yellowBtn.classList.remove("border-2");
            yellowBtn.classList.remove("border-themeOrange");

            // enable rest
            whiteBtn.removeAttribute("disabled");
            redBtn.removeAttribute("disabled");
            greenBtn.removeAttribute("disabled");
            blueBtn.removeAttribute("disabled");
            yellowBtn.removeAttribute("disabled");

            overlay.className = "w-full h-full absolute";
            overlay.classList.add("bg-purple-700");
        }
    });

    yellowBtn.addEventListener("click", () => {
        if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple") {
            selectedColor = "yellow";
        
            // select and disable yellow button
            yellowBtn.classList.add("border-2")
            yellowBtn.classList.add("border-themeOrange")
            yellowBtn.classList.remove("hover:scale-1100");
            yellowBtn.setAttribute("disbled", "true");

            // de-select rest
            whiteBtn.classList.add("hover:scale-1100");
            whiteBtn.classList.remove("border-2");
            whiteBtn.classList.remove("border-themeOrange");
            redBtn.classList.add("hover:scale-1100");
            redBtn.classList.remove("border-2");
            redBtn.classList.remove("border-themeOrange");
            greenBtn.classList.add("hover:scale-1100");
            greenBtn.classList.remove("border-2");
            greenBtn.classList.remove("border-themeOrange");
            blueBtn.classList.add("hover:scale-1100");
            blueBtn.classList.remove("border-2");
            blueBtn.classList.remove("border-themeOrange");
            purpleBtn.classList.add("hover:scale-1100");
            purpleBtn.classList.remove("border-2");
            purpleBtn.classList.remove("border-themeOrange");

            // enable rest
            whiteBtn.removeAttribute("disabled");
            redBtn.removeAttribute("disabled");
            greenBtn.removeAttribute("disabled");
            blueBtn.removeAttribute("disabled");
            purpleBtn.removeAttribute("disabled");

            overlay.className = "w-full h-full absolute";
            overlay.classList.add("bg-yellow-300");
        }
    });

    staticCycleA.addEventListener("click", () => {
        if (staticCycleA.innerHTML == "(STATIC MODE)") {
            staticCycleA.innerHTML = "(CYCLE MODE)";
        } else {
            staticCycleA.innerHTML = "(STATIC MODE)";
        }
    });
}