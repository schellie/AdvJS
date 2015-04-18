/**
 * Class Command
 */
function Command(input) {
	this.input = input;
	var words = input.match(/\S+/g) || [];
	this.word1 = (words.length > 0) ? words[0] : '';
	this.word2 = (words.length > 1) ? words[1] : '';
	
	var WD1 = (this.word1 == '') ? 0 : this.word1.substr(0,5).toUpperCase();
	var WD2 = (this.word2 == '') ? 0 : this.word2.substr(0,5).toUpperCase();
	
	this.cmd1 = (WD1 == 0) ? -1 : vocabulary(WD1,-1);
	this.cmd2 = (WD2 == 0) ? -1 : vocabulary(WD2,-1);
	
	this.verb = this.cmd1 % 1000;
	this.verbType = int(this.cmd1/1000); // make integer
	this.obj = this.cmd2 % 1000;
} 
Command.prototype.getVerb = function() {
	return this.verb;
};
Command.prototype.getObj = function() {
	return this.obj;
};

