	// Arrays to hold the classes
	var locations = [],
		items = [], // holds the object, we call them items to avoid confusion with 'Object'
		command = new Command(''),
		responses = [], // rtext
		classifications = [], // ctext
		magic = []; // mtext

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
 * Returns true if specified object has no properties, false otherwise.
 * @author Slava Fomin II
 * @param object the object to check
 * @return true if object is empty
 */
function isObjectEmpty(object) {
	if ('object' !== typeof object) throw new Error('Object must be specified.');
	if (null === object) return true;
	if ('undefined' !== Object.keys) return (0 === Object.keys(object).length); // Using ECMAScript 5 feature.
	else { // Using legacy compatibility mode.
		for (var key in object) {
			if (object.hasOwnProperty(key)) return false;
		}
		return true;
	}
}
/**
 * Load current (classic) database into class structure and save as JSON
 */
function convert() {

	var	text = '', // merged text for long descriptions
		i, index;
	
	// locations and their long descriptions
	for (var lt in LTEXT) {
		index = LTEXT[lt];
		i = parseInt(lt);
		if (index == 0) break;
		while (parseInt(LINES[index++]) == parseInt(LINES[LTEXT[lt]])) {
			text += LINES[index-1].substr(8).trim() + '\n';
		}
		locations[i] = new Location(i, text.slice(0,-1)); // remove the very last '\n'
		text = ''; // reset
	}
	
	// short descriptions
	for (var st in STEXT) {
		index = STEXT[st];
		if (index == 0) continue;
		while (parseInt(LINES[index++]) == parseInt(LINES[STEXT[st]])) {
			text += LINES[index-1].substr(8).trim() + '\n';
		}
		locations[parseInt(st)].setShort(text.slice(0,-1)); // remove the very last '\n'
		text = ''; // reset
	}
	
	// travels
	for (var loc in locations) {
		index = KEY[loc];
		if (index == 0) continue;
		while (true) {
			locations[parseInt(loc)].addExit(
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
			commandWords.push(new CommandWord(KTAB[w]));
			word[0] = commandWords[commandWords.length - 1];
		}
		vocabulary[ATAB[w]] = word[0];
	}
	//console.log(commandWords);	
	//console.log(vocabulary);	
	
	// items
	for (var pt in PTEXT) {
		index = PTEXT[pt];
		var first = index;
		if (index == 0) continue;
		// item
		while (parseInt(LINES[index]) == parseInt(LINES[first])) {
			text += LINES[index].substr(8).trim() + '\n';
			index++;
		}
		items.push(new Item(parseInt(pt), text.slice(0,-1)));
		text = ''; // reset
		// status messages
		while (parseInt(LINES[index])%100 == 0) { // status message
			var sIndex = index;
			while (parseInt(LINES[index]) === parseInt(LINES[sIndex])) {
				text += LINES[index-1].substr(8).trim() + '\n';
				index++;
			}
			items[items.length-1].addStatus(int(parseInt(LINES[sIndex])/100), text.slice(0,-1));
			text = ''; // reset
		}
	}
	//console.log(items);
	
	// responses (rtext)
	for (var r in RTEXT) {
		index = RTEXT[r];
		if (index == 0) continue;
		while (parseInt(LINES[index++]) == parseInt(LINES[RTEXT[r]])) {
			text += LINES[index-1].substr(8).trim() + '\n';
		}
		responses[parseInt(r)] = text.slice(0,-1); // remove the very last '\n'
		text = ''; // reset
	}
	//console.log(responses);
	
	// items (initial location)
	for (var p in PLAC) {
		if (PLAC[p] == 0) continue;
		var item = items.filter(filterId(p))[0];
		var loc1 = locations.filter(filterId(PLAC[p]))[0];
		var loc2 = FIXD[p] > 0 ? locations.filter(filterId(FIXD[p]))[0] : {};
		if (FIXD[p] == 0) item.setLocation(loc1);
		else item.setLocation(loc1, loc2);
	}
	//console.log(items);
	
	// default response to CommandWord
	for (var as in ACTSPK) {
		i = parseInt(as);
		index = RTEXT[ACTSPK[i]];
		if (index == 0) continue;
		while (parseInt(LINES[index++]) == parseInt(LINES[RTEXT[ACTSPK[i]]])) {
			text += LINES[index-1].substr(8).trim() + '\n';
		}
		var wrd = commandWords.filter(filterId(2000 + i));
		wrd[0].setResponse(text.slice(0,-1));
		text = '';
	}
	// default response for action verbs is '12'
	text = LINES[RTEXT[12]].substr(8).trim();
	for (var act in commandWords) {
		if (commandWords[act].getId() < 1000) commandWords[act].setResponse(text);
	}
//	addResponse(43, 9);
//	addResponse(44, 9);
//	addResponse(45, 9);
//	addResponse(46, 9);
//	addResponse(47, 9);
//	addResponse(48, 9);
//	addResponse(49, 9);
//	addResponse(50, 9);
//	addResponse(29, 9);
//	addResponse(30, 9);
//	addResponse(7, 10);
//	addResponse(36, 10);
//	addResponse(37, 10);
//	addResponse(11, 11);
//	addResponse(19, 11);
//	addResponse(62, 42);
//	addResponse(65, 42);
//	addResponse(17, 80);
	
	console.log(commandWords);
	
	
	
	
}