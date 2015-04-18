	// Arrays to hold the classes
	var locations = [],
		items = [], // holds the object, we call them items to avoid confusion with 'Object'
		words = [], // array of Word: holds all known words
		vocabulary = [], // indexed by value
		command = new Command(''),
		responses = [], // rtext
		classifications = [], // ctext
		magic = []; // mtext


/**
 * convert - load current (classic) database into class structure
 *           and save as JSON
 */
function convert() {

	var	text = '', // merged text for long descriptions
		index;
	
	// locations and their long descriptions
	for (var lt in LTEXT) {
		index = LTEXT[lt];
		while (parseInt(LINES[index++]) == parseInt(LINES[LTEXT[lt]])) {
			text += LINES[index-1].substr(8).trim() + '\n';
		}
		locations[lt] = new Location(lt, text.slice(0,-1)); // remove the very last '\n'
		text = ''; // reset
	}
	
	// short descriptions
	for (var st in STEXT) {
		index = STEXT[st];
		while (parseInt(LINES[index++]) == parseInt(LINES[STEXT[st]])) {
			text += LINES[index-1].substr(8).trim() + '\n';
		}
		locations[st].addShort(text.slice(0,-1)); // remove the very last '\n'
		text = ''; // reset
	}
	console.log(locations);

}