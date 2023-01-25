if (document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled ) {
  create_fullscreen_button();
}

function create_fullscreen_button() {
  let fullscreen_button = document.createElement("button");
  fullscreen_button.setAttribute('id','fullscreen-button');
  fullscreen_button.addEventListener("click", toggle_fullscreen);
  fullscreen_button.innerHTML  = `
      <span></span>
      <span></span>
      <span></span>
      <span></span>
  `;

  document.body.appendChild(fullscreen_button);
}

function toggle_fullscreen() {
  if (!document.fullscreenElement && !document.mozFullScreenElement && !document.webkitFullscreenElement) { 
      if (document.documentElement.requestFullscreen) {
          document.documentElement.requestFullscreen()
      } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen()
      } else if (document.documentElement.webkitRequestFullscreen) {
          document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
      }

  document.body.setAttribute("fullscreen","") 

  } else {
      if (document.cancelFullScreen) {
          document.cancelFullScreen()
      } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen()
      } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen()
      }

      document.body.removeAttribute("fullscreen") 
  }
}

function check_fullscreen() {
  // Because users can exit & enter fullscreen by other methods
  if (document.fullscreenElement || document.webkitIsFullScreen || document.mozFullScreen) { 
      document.body.setAttribute("fullscreen","") 
  }
  else  { 
      document.body.removeAttribute("fullscreen") 
  }
}

setInterval(function(){ check_fullscreen();}, 1000);