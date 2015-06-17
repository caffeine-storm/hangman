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

// Handle game over
function game_over() {
    // Pop up a message to the user to say that the game is over.
    alert("The game is over!");
    // Stop responding to key strokes.
    document.removeEventListener("keypress", handleKeyPress, false);
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

        var they_have_won = true;

        // If the user guessed all the characters correctly, they win!
        for( var i = 0; i < boardState.length; i++ ) {
            // Is the current part of boardState an underscore? If so, they
            // haven't won. If not, keep checking.
            var slot = boardState[i];
            console.log("for loop: i: " + i + " slot: " + slot);

            if( slot == "_" ) {
                // They haven't won.
                they_have_won = false;
            } else {
                // They might have won, but we can't be sure just yet.
            }
        }

        updateBoard();

        if( they_have_won ) {
            alert("Congratulations, you've won!");
            game_over();
        }

        console.log("After for loop, guessesLeft: ", guessesLeft);
}

document.addEventListener("DOMContentLoaded", handleLoad, false);
document.addEventListener("keypress", handleKeyPress, false);
