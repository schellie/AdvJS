
var rooms = [],
	items = [],
	vocabulary = [],
	responses = [], // rtext
	classifications = [], // ctext
	magic = [], // mtext
	
	actions = [];

// I/O for html/js
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0)), // touch device?
	displayText, // area to output messages
	commandLine; // area to input commands

/**
 * Convert to integer number (used for divisions)
 * @param a number to convert
 * @return integer number
 */	
function int(a) { return ((a)>>0); }

/**
 * Display a string
 * @param s string to display
 */
function out(s) {
	displayText.value += s + '\n';
	displayText.scrollTop = displayText.scrollHeight;
}

/**
 * Update the status bar
 * @param score current score
 * @param moves number of moves
 */
function updateStatusBar(score, moves) {
	document.getElementById('statusScore').innerHTML = score;
	document.getElementById('statusMoves').innerHTML = moves;
}

/**
 * Calculates a percentage
 * @param n percentage
 * @returns true n%, false 100-n%
 */
function percent(n) {
	return (100 * Math.random()) < n;
}

/**
 * Searches an array of objects and matches those object which have a property id with
 * the value 'id'
 * @param id value to search for
 * @return array of matching objects
 */
function filterId(id) {
	return function (element) {
		if (element.id == id) return true; else return false;
	};
}

/**
 * Read text from the LINES array
 * @param index starting index to read
 * @return string with (multi-line) message
 */
function getMessage(index) {
	var start = index,
		count = index,
		text = '';
	while (parseInt(LINES[count++]) == parseInt(LINES[start])) {
		text += LINES[count-1].substr(8).trim() + '\n';
	}
	return text.slice(0,-1); // remove the very last '\n'
}