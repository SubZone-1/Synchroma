import { highBtn, lowBtn, masterBtn, midBtn } from "./elements";

export function frequencyRangeFocusInit() {
    var selectedRange = "master"; // default value

    lowBtn.addEventListener("click", () => {
        if (selectedRange == "mid" || selectedRange == "high" || selectedRange == "master") {
            selectedRange = "low";
            
            // select and disable low button
            lowBtn.classList.add("text-themeOrange");
            lowBtn.classList.remove("text-gray-700");
            lowBtn.classList.remove("hover:scale-1125");
            lowBtn.setAttribute("disabled", "true");

            // de-select rest
            midBtn.classList.add("text-gray-700");
            midBtn.classList.add("hover:scale-1125");
            midBtn.classList.remove("text-themeOrange");
            highBtn.classList.add("text-gray-700");
            highBtn.classList.add("hover:scale-1125");
            highBtn.classList.remove("text-themeOrange");
            masterBtn.classList.add("text-gray-700");
            masterBtn.classList.add("hover:scale-1125");
            masterBtn.classList.remove("text-themeOrange");

            // enable rest
            midBtn.removeAttribute("disabled");
            highBtn.removeAttribute("disabled");
            masterBtn.removeAttribute("disabled");
        }
    });

    midBtn.addEventListener("click", () => {
        if (selectedRange == "low" || selectedRange == "high" || selectedRange == "master") {
            selectedRange = "mid";
            
            // select and disable mid button
            midBtn.classList.add("text-themeOrange");
            midBtn.classList.remove("text-gray-700");
            midBtn.classList.remove("hover:scale-1125");
            midBtn.setAttribute("disabled", "true");

            // de-select rest
            lowBtn.classList.add("text-gray-700");
            lowBtn.classList.add("hover:scale-1125");
            lowBtn.classList.remove("text-themeOrange");
            highBtn.classList.add("text-gray-700");
            highBtn.classList.add("hover:scale-1125");
            highBtn.classList.remove("text-themeOrange");
            masterBtn.classList.add("text-gray-700");
            masterBtn.classList.add("hover:scale-1125");
            masterBtn.classList.remove("text-themeOrange");
            
            // enable rest
            lowBtn.removeAttribute("disabled");
            highBtn.removeAttribute("disabled");
            masterBtn.removeAttribute("disabled");
        }
    });

    highBtn.addEventListener("click", () => {
        if (selectedRange == "low" || selectedRange == "mid" || selectedRange == "master") {
            selectedRange = "high";
            
            // select and disable high button
            highBtn.classList.add("text-themeOrange");
            highBtn.classList.remove("text-gray-700");
            highBtn.classList.remove("hover:scale-1125");
            highBtn.setAttribute("disabled", "true");

            // de-select rest
            lowBtn.classList.add("text-gray-700");
            lowBtn.classList.add("hover:scale-1125");
            lowBtn.classList.remove("text-themeOrange");
            midBtn.classList.add("text-gray-700");
            midBtn.classList.add("hover:scale-1125");
            midBtn.classList.remove("text-themeOrange");
            masterBtn.classList.add("text-gray-700");
            masterBtn.classList.add("hover:scale-1125");
            masterBtn.classList.remove("text-themeOrange");

            // enable rest
            lowBtn.removeAttribute("disabled");
            midBtn.removeAttribute("disabled");
            masterBtn.removeAttribute("disabled");
        }
    });

    masterBtn.addEventListener("click", () => {
        if (selectedRange == "low" || selectedRange == "mid" || selectedRange == "high") {
            selectedRange = "master";

            // select and disable master button
            masterBtn.classList.add("text-themeOrange");
            masterBtn.classList.remove("text-gray-700");
            masterBtn.classList.remove("hover:scale-1125");
            masterBtn.setAttribute("disabled", "true");

            // de-select rest
            lowBtn.classList.add("text-gray-700");
            lowBtn.classList.add("hover:scale-1125");
            lowBtn.classList.remove("text-themeOrange");
            midBtn.classList.add("text-gray-700");
            midBtn.classList.add("hover:scale-1125");
            midBtn.classList.remove("text-themeOrange");
            highBtn.classList.add("text-gray-700");
            highBtn.classList.add("hover:scale-1125");
            highBtn.classList.remove("text-themeOrange");

            // enable rest
            lowBtn.removeAttribute("disabled");
            midBtn.removeAttribute("disabled");
            highBtn.removeAttribute("disabled");
        }
    });
}