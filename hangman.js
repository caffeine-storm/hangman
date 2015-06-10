var word = "hello";
var guessesLeft = 10;

// This tracks what the user sees. To update the page, call 'updateBoard'.
var boardState = ["_", "_", "_", "_", "_"];

// This function draws the boardState to the screen.
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


function printGuessesLeft() {
    var message = document.getElementById("guessesLeft");
    console.log("printGuessesLeft: guessesLeft: " + guessesLeft);
    message.innerHTML = "" + guessesLeft;
}

function game_over() {
    console.log("GAME OVER!");
}

function handleKeyPress(event) {
    var key = String.fromCharCode(event.keyCode);
    var shouldPenalize = true;

    console.log("key: " + key);

    // for( initializer ; condition ; after-thought ) {
    //    body;
    // }
    
    // 1) Run the initializer
    // 2) Check the condition
    // 3) a) If the condition is true, run the body, then head to step 4
    //    b) If the condition is false, jump past closing brace, stop looping
    // 4) after-thought
    // 5) go to 2)

    console.log("Before for loop, guessesLeft: " + guessesLeft);

    // Each time a key is pressed
    for( var i = 0; i < word.length; i++ ) {
    //  Check if the i'th character matches
        if( word[i] === key ) {
    //      If so, mark the character
            boardState[i] = word[i];
            shouldPenalize = false;
        }
    }

    if(shouldPenalize) {
        // Every time the user's guess was wrong
        //    Penalize the user
        guessesLeft--;
        // Update the page with how many guesses are left
        printGuessesLeft();
        //    If the user runs out of guesses, game over!
        if(guessesLeft <= 0) {
            game_over();
        }
    }

    console.log("After for loop, guessesLeft: ", guessesLeft);

    updateBoard();
}

document.addEventListener("DOMContentLoaded", handleLoad, false);
document.addEventListener("keypress", handleKeyPress, false);
