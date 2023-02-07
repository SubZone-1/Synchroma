var sidebarContent = document.getElementById("sidebar-container");

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeSidebar() {
    //sidebarContent.style.opacity = 0;

    /*document.getElementById("sidebar").classList.remove("w-400px");
    document.getElementById("sidebar").classList.add("w-0");*/
    document.getElementById("sidebar-container").classList.add("left-[-400px]");

    document.getElementById("opencloseSidebar").classList.remove("left-[305px]", "sm:left-400px", "absolute");
    document.getElementById("opencloseSidebar").classList.add("left-0", "fixed");

    document.getElementById("fullscreen-btn").classList.remove("left-[305px]", "sm:left-400px", "absolute");
    document.getElementById("fullscreen-btn").classList.add("left-0", "fixed");

    /*document.getElementById("sidebar-container").classList.remove("opacity-100");
    document.getElementById("sidebar-container").classList.add("opacity-0");*/
    document.getElementById("main").classList.remove("ml-400px");
    document.getElementById("main").classList.add("ml-0");

    /* change open/close sidebar button styling and onclick event to open
    document.getElementById("opencloseSidebar").classList.remove("sm:left-400px", "left-[305px]");
    document.getElementById("opencloseSidebar").classList.add("sm:left-0");*/
    
    document.getElementById("opencloseSidebar").setAttribute("onclick", "openSidebar()");
    document.getElementById("opencloseSidebar").innerHTML = '<i class="fa-solid fa-caret-right"></i>';

    document.getElementById("main-logo").removeAttribute("hidden");
}

/* Set the width of the sidebar to 400px and the left margin of the page content to 400px */
function openSidebar() {
    //sidebarContent.style.opacity = 1;

    /*document.getElementById("sidebar").classList.remove("w-0");
    document.getElementById("sidebar").classList.add("w-400px");*/
    document.getElementById("sidebar-container").classList.remove("left-[-400px]");

    document.getElementById("opencloseSidebar").classList.add("left-[305px]", "sm:left-400px", "absolute");
    document.getElementById("opencloseSidebar").classList.remove("left-0", "fixed");

    document.getElementById("fullscreen-btn").classList.add("left-[305px]", "sm:left-400px", "absolute");
    document.getElementById("fullscreen-btn").classList.remove("left-0", "fixed");
    /*document.getElementById("sidebar-container").classList.remove("opacity-0");
    document.getElementById("sidebar-container").classList.add("opacity-100");*/
    document.getElementById("main").classList.remove("ml-0");
    document.getElementById("main").classList.add("ml-400px");

    /* change open/close sidebar button styling and onclick event to close
    document.getElementById("opencloseSidebar").classList.remove("sm:left-0");
    document.getElementById("opencloseSidebar").classList.add("sm:left-400px", "left-[305px]");*/

    document.getElementById("opencloseSidebar").setAttribute("onclick", "closeSidebar()");
    document.getElementById("opencloseSidebar").innerHTML = '<i class="fa-solid fa-caret-left"></i>';

    document.getElementById("main-logo").setAttribute("hidden", "true");
}