/**
 * Class Player
 */
function Player() {
	this.currentLocation = 1; // starting location
	this.previousLocation = 1;
	this.lastInput = []; // array of words
	this.score = 0;
	this.alive = 5; // this is for the dwarves: the number of dwarves left alive 
	this.inventory = []; // list of items holding, HOLDNG = this.inventory.length
}

Player.prototype.newInput = function(str) {
	this.lastInput = str.match(/\S+/g) || [];
	commandLine.value = '';
	//Give focus to commandLine if not a touch device.
	if (!isTouch) commandLine.focus();
};

Player.prototype.getFirstWord = function() {
	return (this.lastInput.length > 0) ? this.lastInput[0] : '';
};

Player.prototype.getSecondWord = function() {
	return (this.lastInput.length > 1) ? this.lastInput[1] : '';
};

Player.prototype.getFirstCmd = function() {
	var word = this.getFirstWord().substr(0,5).toUpperCase();
	var cmd = vocabulary[word];
	return cmd ? actions[cmd].getId() : -1;
};

Player.prototype.getSecondCmd = function() {
	var word = this.getSecondWord().substr(0,5).toUpperCase();
	return (word == '') ? -1 : vocabulary[word].getId();
};

Player.prototype.holding = function() {
	return this.inventory.length;
};

Player.prototype.toting = function(item) {
	return (this.inventory.indexOf(item) !== -1);
};

Player.prototype.here = function(item) {
	return (this.toting(item) || locations[this.currentlocation].hasItem(item));
};

Player.prototype.look = function() {
	var loc = locations[this.currentLocation],
		look = loc.look();
	for (var i in loc.getItems()) {
		look += '\n' + loc.getItems()[i].getStatus();
	}
	return look;
};

Player.prototype.move = function() {
	this.previousLocation = this.currentLocation;
	this.currentLocation = locations[this.currentLocation].move();
	this.look();
};

var player;
