// Check for BlobURL support
var blob = window.URL || window.webkitURL;
    if (!blob) {
        console.log("Your browser does not support Blob URL's.");          
    }

const playerFile = document.getElementById("player-file");

var fileURL;

playerFile.addEventListener("change", () => {
    var file = playerFile.files[0];
    fileURL = blob.createObjectURL(file);
    console.log(file);
    console.log('File name: '+file.name);
    console.log('File type: '+file.type);
    console.log('File BlobURL: '+ fileURL);
    document.getElementById('internal-player').src = fileURL;
    document.getElementById('now-playing').innerHTML = "<b>Playing: </b>" + file.name;
    document.getElementById('now-playing').removeAttribute("hidden");
});

document.getElementById("show-hide-a").addEventListener("click", () => {
    if (document.getElementById("show-hide-a").innerHTML == "(HIDE)") {
        document.getElementById("internal-player-container").setAttribute("hidden", true);
        document.getElementById("show-hide-a").innerHTML = "(SHOW)";
    } else {
        document.getElementById("internal-player-container").removeAttribute("hidden");
        document.getElementById("show-hide-a").innerHTML = "(HIDE)";
    }
});

export { fileURL };