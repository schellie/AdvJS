/**
 * Class Player
 */
function Player() {
	this.currentLocation = {};
	this.previousLocation = {};
	this.score = 0;
	this.alive = 5; // this is for the dwarves: the number of dwarves left alive 
	this.inventory = []; // list of items holding, HOLDNG = this.inventory.length
}
Player.prototype.holding = function() {
	return this.inventory.length;
};
Player.prototype.toting = function(item) {
	return (this.inventory.indexOf(item) !== -1);
};
Player.prototype.here = function(item) {
	return (this.toting(item) || this.currentlocation.hasItem(item));
};

Player.prototype.look = function() {
	var look = this.currentLocation.look();
	for (var i = 0; i < this.currentLocation.itemList.length; i++) {
		look += '<br />' + this.currentLocation.itemList[i].getStatus();
	}
	return look;
};
