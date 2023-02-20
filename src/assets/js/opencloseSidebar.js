let isOpen = true;

document.getElementById("opencloseSidebar").addEventListener("click", () => {
    if (isOpen == true) {
        isOpen = false;

        // offset sidebar to the left (outside of viewport)
        document.getElementById("sidebar-container").classList.add("left-[-400px]");

        // change buttons' position, icons and set function attribute (onclick) to open
        document.getElementById("opencloseSidebar").classList.remove("left-[305px]", "sm:left-400px", "absolute");
        document.getElementById("opencloseSidebar").classList.add("left-0", "fixed");
        document.getElementById("opencloseSidebar").innerHTML = '<i class="fa-solid fa-caret-right"></i>';

        document.getElementById("fullscreen-btn").classList.remove("left-[305px]", "sm:left-400px", "absolute");
        document.getElementById("fullscreen-btn").classList.add("left-0", "fixed");

        // remove main content margin to occupy the viewport's full width
        document.getElementById("main").classList.remove("ml-400px");
        document.getElementById("main").classList.add("ml-0");

        // show logo displayed in main
        document.getElementById("main-logo").removeAttribute("hidden");
    } else {
        isOpen = true;
        
        // offset sidebar to the right (inside of viewport)
        document.getElementById("sidebar-container").classList.remove("left-[-400px]");

        // change buttons' position, icons and set function attribute (onclick) to close
        document.getElementById("opencloseSidebar").classList.add("left-[305px]", "sm:left-400px", "absolute");
        document.getElementById("opencloseSidebar").classList.remove("left-0", "fixed");
        document.getElementById("opencloseSidebar").innerHTML = '<i class="fa-solid fa-caret-left"></i>';

        document.getElementById("fullscreen-btn").classList.add("left-[305px]", "sm:left-400px", "absolute");
        document.getElementById("fullscreen-btn").classList.remove("left-0", "fixed");

        // add margin to main content to accomodate the sidebar without overlapping main content
        document.getElementById("main").classList.remove("ml-0");
        document.getElementById("main").classList.add("ml-400px");

        // hide logo displayed in main
        document.getElementById("main-logo").setAttribute("hidden", "true");
    }
});