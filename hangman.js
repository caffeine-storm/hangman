var word_choices = [
    "approval",
    "artificial",
    "banana",
    "bandana",
    "hello",
    "subtract"
];

function random_choice(n) {
    return Math.floor(Math.random() * n);
}

var guesses_allowed = 6;
var bad_guess_count = 0;

var keys_seen = [];

var secret_word = word_choices[random_choice(word_choices.length)];
var board = [];
for( var i = 0; i < secret_word.length; i++ ) {
	board[i] = "_";
}

function updateBoard() {
    var dom_board = document.getElementById("secretWord");
	dom_board.innerHTML = board.join(" ");
}

function setImage(image_name) {
	var dom_img = document.getElementById("drawing");
	dom_img.src = image_name;
}

function updateKeysSeen() {
    var dom_span = document.getElementById("guessedLetters");
    dom_span.innerHTML = keys_seen.join(", ");
}

function updateImage(img_num) {
    setImage("img/" + img_num + ".png");
}

function updateGuessCount(n) {
    var dom_span = document.getElementById("guessesLeft");
    dom_span.innerHTML = "" + n;
}

function updateDisplay() {
    updateKeysSeen();
	updateBoard();
	updateImage(bad_guess_count);
	updateGuessCount(guesses_allowed - bad_guess_count);
}

function handleLoad() {
    updateDisplay();
}

function write_message( message ) {
    var dom_message_box = document.getElementById("messageBox");
    dom_message_box.innerHTML = message;
}

function game_over( message ) {
	write_message( message );
	document.removeEventListener("keypress", handleKeyPress, false);
}

function handleKeyPress(event) {
    var key = event.key ? event.key : String.fromCharCode(event.keyCode);
	key = key.toLowerCase();

    // Have we seen this key before?
    for( var i = 0; i < keys_seen.length; i++ ) {
        if( keys_seen[i] === key ) {
            write_message("You've already guessed that!");
            return;
        }
    }
    
    // If we get here, we know it's a new key. Track it!
    keys_seen.push(key);
    keys_seen.sort();

    // Check it!
	var match = false;
	for( var i = 0; i < secret_word.length; i++ ) {
		if( secret_word[i] === key ) {
			match = true;
			board[i] = secret_word[i];
		}
	}

	if( match ) {
		// Correct guess! Did they win?
		var saw_blank = false;
		for( var i = 0; i < board.length; i++ ) {
			if( board[i] == '_' ) {
				// They haven't won yet...
				saw_blank = true;
				break;
			}
		}

		if( !saw_blank ) {
			// Winner!
			game_over("You Win!");
			updateDisplay();
			setImage("img/win.png");
			return;
		}
	} else {
		// Incorrect guess!
		bad_guess_count++;
		if( bad_guess_count >= guesses_allowed ) {
			game_over("You Lose!");
			for( var i = 0; i < secret_word.length; i++ ) {
			    board[i] = secret_word[i];
			}
		}
	}

    updateDisplay();
}

document.addEventListener("DOMContentLoaded", handleLoad, false);
document.addEventListener("keypress", handleKeyPress, false);

