var word = "hello";

function handleLoad() {
    var board = document.getElementById("secretWord");
    board.innerHTML = "_ _ _ _ _";
}

function handleKeyPress(event) {
    var key = event.key;
    console.log(String.fromCharCode(event.keyCode));
}

document.addEventListener("DOMContentLoaded", handleLoad, false);
document.addEventListener("keypress", handleKeyPress, false);
