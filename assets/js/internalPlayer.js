// Check for BlobURL support
var blob = window.URL || window.webkitURL;
    if (!blob) {
        console.log("Your browser does not support Blob URL's.");          
    }

document.getElementById("player-file").addEventListener("change", () => {

    var file = this.files[0],
     fileURL = blob.createObjectURL(file);
    console.log(file);
    console.log('File name: '+file.name);
    console.log('File type: '+file.type);
    console.log('File BlobURL: '+ fileURL);
    document.getElementById('internal-player').src = fileURL;
    document.getElementById('now-playing').innerHTML = "<b>Playing: </b>" + file.name;
    document.getElementById('now-playing').removeAttribute("hidden");

});

var playerHidden = false; // used for controlling sidebar scroll point

function hidePlayer() {
    playerHidden = true;
    document.getElementById("internal-player-container").setAttribute("hidden", true);

    document.getElementById("show-hide-a").innerHTML = "(SHOW)";
    document.getElementById("show-hide-a").setAttribute("onclick", "showPlayer()");
}

function showPlayer() {
    playerHidden = false;
    document.getElementById("internal-player-container").removeAttribute("hidden");
    
    document.getElementById("show-hide-a").innerHTML = "(HIDE)";
    document.getElementById("show-hide-a").setAttribute("onclick", "hidePlayer()");
}