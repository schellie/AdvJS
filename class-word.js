/**
 * Class CommandWord
 */
function CommandWord(id, word) {
	this.id = id;
	this.response = '';
	this.type = int(id/1000);
	switch (this.type) {
	case 0: 
		this.action = processMove;
		break;
	case 1:
		this.action = processObject;
		break;
	case 2: 
		this.action = 'action' + word.substr(0,1).toUpperCase() + word.substr(1).toLowerCase();
		break;
	case 3:
		if (id >= 3001 && id <= 3005) this.action = actionFoo;
		this.action = sayResponse;
		break;
	}
	
} 

CommandWord.prototype.getId = function() {
	return this.id;
};

CommandWord.prototype.setResponse = function(message) {
	this.response = message;
};

CommandWord.prototype.getResponse = function() {
	return this.response;
};

var commandWords = []; // array of CommandWord: holds all known words
var vocabulary = []; // indexed by text


