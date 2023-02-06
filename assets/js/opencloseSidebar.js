var sidebarContent = document.getElementById("sidebar-container");

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeSidebar() {
    sidebarContent.style.opacity = 0;

    document.getElementById("sidebar").classList.remove("w-400px");
    document.getElementById("sidebar").classList.add("w-0");
    document.getElementById("sidebar-container").classList.remove("opacity-100");
    document.getElementById("sidebar-container").classList.add("opacity-0");
    document.getElementById("main").classList.remove("ml-400px");
    document.getElementById("main").classList.add("ml-0");

    // change open/close sidebar button onclick event to open
    document.getElementById("opencloseSidebar").setAttribute("onclick", "openSidebar()");
    document.getElementById("opencloseSidebar").innerHTML = '<i class="fa-solid fa-caret-right"></i>';

    document.getElementById("main-logo").removeAttribute("hidden");
    console.log("visible");
}

/* Set the width of the sidebar to 400px and the left margin of the page content to 400px */
function openSidebar() {
    sidebarContent.style.opacity = 1;

    document.getElementById("sidebar").classList.remove("w-0");
    document.getElementById("sidebar").classList.add("w-400px");
    document.getElementById("sidebar-container").classList.remove("opacity-0");
    document.getElementById("sidebar-container").classList.add("opacity-100");
    document.getElementById("main").classList.remove("ml-0");
    document.getElementById("main").classList.add("ml-400px");

    // change open/close sidebar button onclick event to close
    document.getElementById("opencloseSidebar").setAttribute("onclick", "closeSidebar()");
    document.getElementById("opencloseSidebar").innerHTML = '<i class="fa-solid fa-caret-left"></i>';

    document.getElementById("main-logo").setAttribute("hidden", "true");
    console.log("invisible");
}

/* Toggle main-logo visibility upon interaction with open/close sidebar button 
function toggleLogo() {
    if (sidebarOpened == false) {
        document.getElementById("main-logo").removeAttribute("hidden");
        console.log("visible");
    } else {
        document.getElementById("main-logo").setAttribute("hidden" = "true");
        console.log("invisible");
    }
} */