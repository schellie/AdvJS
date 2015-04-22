/**
 * Class Player
 */
var player = {
	currentLocation: 1, // starting location
	previousLocation: 1,
	lastInput: [], // array of words
	score: 0,
	lives: 3, // max deaths
	items: [], // inventory
	
	newInput: function(str) {
		this.lastInput = str.match(/\S+/g) || [];
		commandLine.value = '';
		commandLine.focus();
	},
	getFirstWord: function() { return (this.lastInput.length > 0) ? this.lastInput[0] : ''; },
	getSecondWord: function() { return (this.lastInput.length > 1) ? this.lastInput[1] : ''; },
	getCurrentLoc: function() { return currentLocation; },
	holding: function() { return this.items.length; },
	toting: function(i) { return this.items.indexOf(i) != -1; },
	here: function(i) { return (this.toting(i) || rooms[this.getCurrentLoc()].here(i)); },
	look: function() {}
};


/*
Player.prototype.getFirstCmd = function() {
	var word = this.getFirstWord().substr(0,5).toUpperCase();
	var cmd = vocabulary[word];
	return cmd ? actions[cmd].getId() : -1;
};

Player.prototype.getSecondCmd = function() {
	var word = this.getSecondWord().substr(0,5).toUpperCase();
	return (word == '') ? -1 : vocabulary[word].getId();
};
*/

/*
Player.prototype.look = function() {
	var loc = locations[this.currentLocation],
		look = loc.look();
	for (var i in loc.getItems()) {
		look += '\n' + loc.getItems()[i].getStatus();
	}
	return look;
};
*/
Player.prototype.move = function() {
	this.previousLocation = this.currentLocation;
	this.currentLocation = locations[this.currentLocation].move();
	this.look();
};

