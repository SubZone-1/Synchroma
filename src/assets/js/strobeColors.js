// assign buttons to variables
const white = document.getElementById("white");
const red = document.getElementById("red");
const green = document.getElementById("green");
const blue = document.getElementById("blue");
const purple = document.getElementById("purple");
const yellow = document.getElementById("yellow");

let selectedColor = "white"; // default color

const overlay = document.getElementById("overlay"); // strobe overlay

white.addEventListener("click", () => {
    if (selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
        selectedColor = "white";
    
        // select and disable white button
        white.classList.add("border-2")
        white.classList.add("border-themeOrange")
        white.classList.remove("hover:scale-1100");
        white.setAttribute("disbled", "true");

        // de-select rest
        red.classList.add("hover:scale-1100");
        red.classList.remove("border-2");
        red.classList.remove("border-themeOrange");
        green.classList.add("hover:scale-1100");
        green.classList.remove("border-2");
        green.classList.remove("border-themeOrange");
        blue.classList.add("hover:scale-1100");
        blue.classList.remove("border-2");
        blue.classList.remove("border-themeOrange");
        purple.classList.add("hover:scale-1100");
        purple.classList.remove("border-2");
        purple.classList.remove("border-themeOrange");
        yellow.classList.add("hover:scale-1100");
        yellow.classList.remove("border-2");
        yellow.classList.remove("border-themeOrange");

        // enable rest
        red.removeAttribute("disabled");
        green.removeAttribute("disabled");
        blue.removeAttribute("disabled");
        purple.removeAttribute("disabled");
        yellow.removeAttribute("disabled");

        overlay.className = "w-full h-full absolute";
        overlay.classList.add("bg-white");
    }
});

red.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
        selectedColor = "red";
    
        // select and disable red button
        red.classList.add("border-2")
        red.classList.add("border-themeOrange")
        red.classList.remove("hover:scale-1100");
        red.setAttribute("disbled", "true");

        // de-select rest
        white.classList.add("hover:scale-1100");
        white.classList.remove("border-2");
        white.classList.remove("border-themeOrange");
        green.classList.add("hover:scale-1100");
        green.classList.remove("border-2");
        green.classList.remove("border-themeOrange");
        blue.classList.add("hover:scale-1100");
        blue.classList.remove("border-2");
        blue.classList.remove("border-themeOrange");
        purple.classList.add("hover:scale-1100");
        purple.classList.remove("border-2");
        purple.classList.remove("border-themeOrange");
        yellow.classList.add("hover:scale-1100");
        yellow.classList.remove("border-2");
        yellow.classList.remove("border-themeOrange");

        // enable rest
        white.removeAttribute("disabled");
        green.removeAttribute("disabled");
        blue.removeAttribute("disabled");
        purple.removeAttribute("disabled");
        yellow.removeAttribute("disabled");

        overlay.className = "w-full h-full absolute";
        overlay.classList.add("bg-red-700");
    }
});

green.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "red" || selectedColor == "blue" || selectedColor == "purple" || selectedColor == "yellow") {
        selectedColor = "green";
    
        // select and disable green button
        green.classList.add("border-2")
        green.classList.add("border-themeOrange")
        green.classList.remove("hover:scale-1100");
        green.setAttribute("disbled", "true");

        // de-select rest
        white.classList.add("hover:scale-1100");
        white.classList.remove("border-2");
        white.classList.remove("border-themeOrange");
        red.classList.add("hover:scale-1100");
        red.classList.remove("border-2");
        red.classList.remove("border-themeOrange");
        blue.classList.add("hover:scale-1100");
        blue.classList.remove("border-2");
        blue.classList.remove("border-themeOrange");
        purple.classList.add("hover:scale-1100");
        purple.classList.remove("border-2");
        purple.classList.remove("border-themeOrange");
        yellow.classList.add("hover:scale-1100");
        yellow.classList.remove("border-2");
        yellow.classList.remove("border-themeOrange");

        // enable rest
        white.removeAttribute("disabled");
        red.removeAttribute("disabled");
        blue.removeAttribute("disabled");
        purple.removeAttribute("disabled");
        yellow.removeAttribute("disabled");

        overlay.className = "w-full h-full absolute";
        overlay.classList.add("bg-green-500");
    }
});

blue.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "purple" || selectedColor == "yellow") {
        selectedColor = "blue";
    
        // select and disable blue button
        blue.classList.add("border-2")
        blue.classList.add("border-themeOrange")
        blue.classList.remove("hover:scale-1100");
        blue.setAttribute("disbled", "true");

        // de-select rest
        white.classList.add("hover:scale-1100");
        white.classList.remove("border-2");
        white.classList.remove("border-themeOrange");
        red.classList.add("hover:scale-1100");
        red.classList.remove("border-2");
        red.classList.remove("border-themeOrange");
        green.classList.add("hover:scale-1100");
        green.classList.remove("border-2");
        green.classList.remove("border-themeOrange");
        purple.classList.add("hover:scale-1100");
        purple.classList.remove("border-2");
        purple.classList.remove("border-themeOrange");
        yellow.classList.add("hover:scale-1100");
        yellow.classList.remove("border-2");
        yellow.classList.remove("border-themeOrange");

        // enable rest
        white.removeAttribute("disabled");
        red.removeAttribute("disabled");
        green.removeAttribute("disabled");
        purple.removeAttribute("disabled");
        yellow.removeAttribute("disabled");

        overlay.className = "w-full h-full absolute";
        overlay.classList.add("bg-blue-600");
    }
});

purple.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "yellow") {
        selectedColor = "purple";
    
        // select and disable purple button
        purple.classList.add("border-2")
        purple.classList.add("border-themeOrange")
        purple.classList.remove("hover:scale-1100");
        purple.setAttribute("disbled", "true");

        // de-select rest
        white.classList.add("hover:scale-1100");
        white.classList.remove("border-2");
        white.classList.remove("border-themeOrange");
        red.classList.add("hover:scale-1100");
        red.classList.remove("border-2");
        red.classList.remove("border-themeOrange");
        green.classList.add("hover:scale-1100");
        green.classList.remove("border-2");
        green.classList.remove("border-themeOrange");
        blue.classList.add("hover:scale-1100");
        blue.classList.remove("border-2");
        blue.classList.remove("border-themeOrange");
        yellow.classList.add("hover:scale-1100");
        yellow.classList.remove("border-2");
        yellow.classList.remove("border-themeOrange");

        // enable rest
        white.removeAttribute("disabled");
        red.removeAttribute("disabled");
        green.removeAttribute("disabled");
        blue.removeAttribute("disabled");
        yellow.removeAttribute("disabled");

        overlay.className = "w-full h-full absolute";
        overlay.classList.add("bg-purple-700");
    }
});

yellow.addEventListener("click", () => {
    if (selectedColor == "white" || selectedColor == "red" || selectedColor == "green" || selectedColor == "blue" || selectedColor == "purple") {
        selectedColor = "yellow";
    
        // select and disable yellow button
        yellow.classList.add("border-2")
        yellow.classList.add("border-themeOrange")
        yellow.classList.remove("hover:scale-1100");
        yellow.setAttribute("disbled", "true");

        // de-select rest
        white.classList.add("hover:scale-1100");
        white.classList.remove("border-2");
        white.classList.remove("border-themeOrange");
        red.classList.add("hover:scale-1100");
        red.classList.remove("border-2");
        red.classList.remove("border-themeOrange");
        green.classList.add("hover:scale-1100");
        green.classList.remove("border-2");
        green.classList.remove("border-themeOrange");
        blue.classList.add("hover:scale-1100");
        blue.classList.remove("border-2");
        blue.classList.remove("border-themeOrange");
        purple.classList.add("hover:scale-1100");
        purple.classList.remove("border-2");
        purple.classList.remove("border-themeOrange");

        // enable rest
        white.removeAttribute("disabled");
        red.removeAttribute("disabled");
        green.removeAttribute("disabled");
        blue.removeAttribute("disabled");
        purple.removeAttribute("disabled");

        overlay.className = "w-full h-full absolute";
        overlay.classList.add("bg-yellow-300");
    }
});