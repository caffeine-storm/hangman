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

var secret_word = word_choices[random_choice(word_choices.length)];
var board = [];
for( var i = 0; i < secret_word.length; i++ ) {
	board[i] = "_";
}

function updateBoard() {
    var dom_board = document.getElementById("secretWord");
	dom_board.innerHTML = board.join(" ");
}

function updateImages(img_num) {
	var dom_img = document.getElementById("drawing");
	dom_img.src = "img/" + img_num + ".png";
}

function updateDisplay() {
	updateBoard();
	updateImages(bad_guess_count);
}

function handleLoad() {
    updateDisplay();
}

function game_over( message ) {
	write_message( message );
	document.removeEventListener("keypress", handleKeyPress, false);
}

function handleKeyPress(event) {
    var key = event.key ? event.key : String.fromCharCode(event.keyCode);
	key = key.toLowerCase();

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
		}
	} else {
		// Incorrect guess!
		bad_guess_count++;
		if( bad_guess_count >= guesses_allowed ) {
			game_over("You Lose!");
		}
	}

    updateDisplay();
}

document.addEventListener("DOMContentLoaded", handleLoad, false);
document.addEventListener("keypress", handleKeyPress, false);

