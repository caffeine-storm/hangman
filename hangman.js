var word = "hello";
var boardState = ["_", "_", "_", "_", "_"];

function updateBoard() {
    var board = document.getElementById("secretWord");
    board.innerHTML = boardState[0] + ' '
    + boardState[1] + ' '
    + boardState[2] + ' '
    + boardState[3] + ' '
    + boardState[4];
}

function handleLoad() {
    updateBoard();
}

function handleKeyPress(event) {
    var key = String.fromCharCode(event.keyCode);

    var character = word[0];
    console.log("key: " + key, "character: " + character);
    if(key === character) {
        boardState[0] = character;
    }
    if(boardState[0] == word[0]) {

        var character1 = word[1];
        if(key == character1) {
            boardState[1] = character1;
        }
    }
    updateBoard();
}

document.addEventListener("DOMContentLoaded", handleLoad, false);
document.addEventListener("keypress", handleKeyPress, false);
