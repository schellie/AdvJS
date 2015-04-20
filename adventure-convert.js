// Arrays to hold the classes
var locations = [],
	items = [], // holds the object, we call them items to avoid confusion with 'Object'
	command = new Command(''),
	responses = [], // rtext
	classifications = [], // ctext
	magic = []; // mtext

//For converting a JS object into a string, use
//	JSON.stringify(obj);
//For converting a string into a JS object, use
//	JSON.parse(string);

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

/**
 * Load current (classic) database into class structure and save as JSON
 */
function convert() {

	var	text = '', // merged text for long descriptions
		index;
	
	// locations and their long descriptions
	locations[0] = new Location(0, 'You\'re dead');
	for (var lt in LTEXT) {
		if (LTEXT[lt] == 0) break;
		locations[+lt] = new Location(+lt, getMessage(LTEXT[lt]));
	}
	
	// short descriptions
	for (var st in STEXT) {
		if (STEXT[st] == 0) continue;
		locations[+st].setShort(getMessage(STEXT[st]));
	}
	
	// travels
	for (var loc in locations) {
		if (loc == 0) continue;
		index = KEY[loc];
		if (index == 0) continue;
		while (true) {
			locations[+loc].addExit(
        		new Exit(Math.abs(TRAVEL[index])%1000, 
        				int(Math.abs(TRAVEL[index])/1000))
        		);
			if(TRAVEL[index] < 0) break;
			index++;
		}
	}
	//console.log(locations);
	
	// words
	for (var w in KTAB) {
		if (KTAB[w] < 0) break;
		var word = commandWords.filter(filterId(KTAB[w]));
		if (word.length == 0) {
			commandWords.push(new CommandWord(KTAB[w], ATAB[w]));
			word[0] = commandWords[commandWords.length - 1];
		}
		vocabulary[ATAB[w]] = word[0];
	}
	//console.log(commandWords);	
	//console.log(vocabulary);	
	
	// items
	for (var pt in PTEXT) {
		index = +PTEXT[pt];
		var first = index;
		if (index == 0) continue;
		// item
		while (parseInt(LINES[index]) == parseInt(LINES[first])) {
			text += LINES[index].substr(8).trim() + '\n';
			index++;
		}
		items[+pt] = new Item(+pt, text.slice(0,-1));
		text = ''; // reset
		// status messages
		while (parseInt(LINES[index])%100 == 0) { // status message
			var sIndex = index;
			while (parseInt(LINES[index]) == parseInt(LINES[sIndex])) {
				text += LINES[index].substr(8).trim() + '\n';
				index++;
			}
			items[+pt].addStatus(int(parseInt(LINES[sIndex])/100), text.slice(0,-1));
			text = ''; // reset
		}
	}
	//console.log(items);
	
	// responses (rtext)
	for (var r in RTEXT) {
		if (RTEXT[r] == 0) continue;
		responses[+r] = getMessage(RTEXT[r]); // remove the very last '\n'
	}
	//console.log(responses);
	
	// items (initial location)
	for (var p in PLAC) {
		if (PLAC[p] == 0) continue;
		var item = items.filter(filterId(+p))[0];
		item.setLocation(PLAC[p], FIXD[p]);
	}
	//console.log(items);
	
	// default response to CommandWord
	for (var as in ACTSPK) {
		if (RTEXT[ACTSPK[as]] == 0) continue;
		var wrd = commandWords.filter(filterId(2000 + (+as)));
		wrd[0].setResponse(getMessage(RTEXT[ACTSPK[parseInt(as)]]));
	}
	// default response for action verbs is '12'
	text = getMessage(RTEXT[12]);
	for (var act in commandWords) {
		var cmd = commandWords[act].getId();
		if (cmd < 1000) commandWords[act].setResponse(text);
		if ((cmd >= 43 && cmd <=50) || cmd == 29 || cmd == 30) commandWords[act].setResponse(RTEXT[9]);
		if (cmd == 7 || cmd == 36 || cmd == 37) commandWords[act].setResponse(RTEXT[10]);
		if (cmd == 11 || cmd == 19) commandWords[act].setResponse(RTEXT[11]);
		if (cmd == 62 || cmd == 65) commandWords[act].setResponse(RTEXT[42]);
		if (cmd == 17) commandWords[act].setResponse(RTEXT[80]);
	}
	for (var w in commandWords) {
		if (commandWords[w].getId() < 3050) continue;
		commandWords[w].setResponse(getMessage(RTEXT[commandWords[w].getId()%1000]));
	}
	//console.log(commandWords);
	
	// properties of locations
	for (var c in COND) {
		var loc = locations[+c];
		if (COND[c] == 0) continue;
		if (COND[c] & 1) loc.addProp(0); // light
		if (COND[c] & 2) loc.addProp(1); // water
		if (COND[c] & 4) loc.addProp(2); // liquid
		if (COND[c] & 8) loc.addProp(3); // no pirate
		if (COND[c] & 16) loc.addProp(4); // cave hint
		if (COND[c] & 32) loc.addProp(5); // bird hint
		if (COND[c] & 64) loc.addProp(6); // snake hint
		if (COND[c] & 128) loc.addProp(7); // maze hint
		if (COND[c] & 256) loc.addProp(8); // dark hint
		if (COND[c] & 512) loc.addProp(9); // witt hint
	}
	//console.log(locations);

	
	someTests();
}

function sayResponse(word) {
	out(vocabulary[word].getResponse());
}


function someTests() {
//	console.log(JSON.stringify(commandWords));
//	console.log(JSON.stringify(vocabulary));
//	console.log(JSON.stringify(items));
//	console.log(JSON.stringify(locations));
	sayResponse('HELP');
	sayResponse('TAKE');
	sayResponse('STEAL');
}