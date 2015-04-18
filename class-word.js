/**
 * Class Word
 */
function Word(id, value) {
	this.id = id;
	this.value = value;
	this.response = '';
	//this.motionSpeak = 12; // I DON'T KNOW HOW TO APPLY THAT WORD HERE.
	//this.actionSpeak;
	this.type = parseInt(value / 1000);
	// this.defaultResponse = (this.type == WordType.MOTION) ? 12 : 0;
} 
Word.prototype.setResponse = function(message) {
	this.response = message;
};