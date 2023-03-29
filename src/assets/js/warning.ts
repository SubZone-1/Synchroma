import { closeModalBtn, btnOpenCloseSidebar } from "./elements";

export function warningInit(
    initApp: ()=> Promise<void>
) {
    closeModalBtn.addEventListener("click", async () => {
        await initApp()

        // close warning modal
        document.getElementById("modal-container")!.style.visibility = "hidden";
        closeModalBtn.style.visibility = "hidden";

        // enable open/close sidebar button
        document.getElementById("opencloseSidebar")!.classList.add("hover:scale-1125", "hover:opacity-100");
        document.getElementById("opencloseSidebar")!.classList.remove("blur-sm");
        document.getElementById("opencloseSidebar")!.removeAttribute("disabled");

        // enable fullscreen button
        document.getElementById("fullscreen-btn")!.classList.add("hover:scale-1125", "hover:opacity-100");
        document.getElementById("fullscreen-btn")!.classList.remove("blur-sm");
        document.getElementById("fullscreen-btn")!.removeAttribute("disabled");

        // enable main logo hover effect
        document.getElementById("main-logo")!.classList.add("hover:opacity-100");
        document.getElementById("main-logo")!.classList.remove("blur-sm");
    });
}