import { btnOpenCloseSidebar, closeModalBtn, fullscreenBtn, sidebarContainer } from "./elements";

export function opencloseSidebarInit() {
    let isOpen = false;

    btnOpenCloseSidebar.addEventListener("click", () => {
        if (isOpen === true) { // on sidebar close
            isOpen = false;

            // offset sidebar to the left (outside of viewport)
            sidebarContainer.classList.add("left-[-400px]");

            // change buttons' position, icons and set function attribute (onclick) to open
            btnOpenCloseSidebar.classList.remove("left-[305px]", "sm:left-400px", "absolute");
            btnOpenCloseSidebar.classList.add("left-0", "fixed");
            btnOpenCloseSidebar.innerHTML = '<i class="fa-solid fa-caret-right"></i>';

            fullscreenBtn.classList.remove("left-[305px]", "sm:left-400px", "absolute");
            fullscreenBtn.classList.add("left-0", "fixed");

            // remove main content margin to occupy the viewport's full width
            document.getElementById("main")!.classList.remove("ml-400px");
            document.getElementById("main")!.classList.add("ml-0");

            // show logo displayed in main
            document.getElementById("main-logo")!.removeAttribute("hidden");
        } else { // on sidebar open
            isOpen = true;
            
            // offset sidebar to the right (inside of viewport)
            document.getElementById("sidebar-container")!.classList.remove("left-[-400px]");

            // change buttons' position and icons
            btnOpenCloseSidebar.classList.add("left-[305px]", "sm:left-400px", "absolute");
            btnOpenCloseSidebar.classList.remove("left-0", "fixed");
            btnOpenCloseSidebar.innerHTML = '<i class="fa-solid fa-caret-left"></i>';

            document.getElementById("fullscreen-btn")!.classList.add("left-[305px]", "sm:left-400px", "absolute");
            document.getElementById("fullscreen-btn")!.classList.remove("left-0", "fixed");

            // add margin to main content to accomodate the sidebar without overlapping main content
            document.getElementById("main")!.classList.remove("ml-0");
            document.getElementById("main")!.classList.add("ml-400px");

            // hide logo displayed in main
            document.getElementById("main-logo")!.setAttribute("hidden", "true");
        }
    });

    closeModalBtn.addEventListener("click", () => { // warning modal close
        isOpen = true; // open sidebar
            
        // offset sidebar to the right (inside of viewport)
        document.getElementById("sidebar-container")!.classList.remove("left-[-400px]");

        // change buttons' position and icons
        btnOpenCloseSidebar.classList.add("left-[305px]", "sm:left-400px", "absolute");
        btnOpenCloseSidebar.classList.remove("left-0", "fixed");
        btnOpenCloseSidebar.innerHTML = '<i class="fa-solid fa-caret-left"></i>';

        document.getElementById("fullscreen-btn")!.classList.add("left-[305px]", "sm:left-400px", "absolute");
        document.getElementById("fullscreen-btn")!.classList.remove("left-0", "fixed");

        // add margin to main content to accomodate the sidebar without overlapping main content
        document.getElementById("main")!.classList.remove("ml-0");
        document.getElementById("main")!.classList.add("ml-400px");

        // hide logo displayed in main
        document.getElementById("main-logo")!.setAttribute("hidden", "true");
    });
}