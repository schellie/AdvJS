/**
 * Class CommandWord
 */
function CommandWord(id) {
	this.id = id;
	this.response = '';
	//this.motionSpeak = 12; // I DON'T KNOW HOW TO APPLY THAT WORD HERE.
	//this.actionSpeak;
	this.type = int(id/1000);
	// this.defaultResponse = (this.type == WordType.MOTION) ? 12 : 0;
} 

CommandWord.prototype.setResponse = function(message) {
	this.response = message;
};

var commandWords = []; // array of CommandWord: holds all known words
var vocabulary = []; // indexed by text


