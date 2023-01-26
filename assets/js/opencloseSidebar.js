var sidebarContent = document.getElementById("sidebar-content");

/* Set the width of the sidebar to 400px and the left margin of the page content to 425px */
function openSidebar() {
    sidebarContent.style.opacity = 1;

    let sidebarOpened = true;

    // set index logo as hidden when sidebar is opened
    document.getElementById("index-logo").style.visibility = "hidden";
    document.getElementById("sidebar").style.width = "400px";
    document.getElementById("main").style.marginLeft = "425px";

    if (sidebarOpened = true) {
        // change open/close sidebar button onclick event to close
        document.getElementById("opencloseSidebar").setAttribute(/* attribute name */ "onclick", /* attribute value */ "closeSidebar()");
        document.getElementById("opencloseSidebar").innerHTML = "&#10094;";
    }
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeSidebar() {
    sidebarContent.style.opacity = 0;

    let sidebarOpened = false;

    // set index logo as visible when sidebar is closed
    document.getElementById("index-logo").style.visibility = "visible";
    document.getElementById("sidebar").style.width = "0px";
    document.getElementById("main").style.marginLeft = "0px";

    if (sidebarOpened = true) {
        // change open/close sidebar button onclick event to open
        document.getElementById("opencloseSidebar").setAttribute("onclick", "openSidebar()");
        document.getElementById("opencloseSidebar").innerHTML = "&#10095;";
    }
}

/* Activate index-logo upon first interaction with open/close sidebar button */
function activateLogo() {
    document.getElementById("index-logo").removeAttribute("hidden");
}