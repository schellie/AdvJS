/**
 * Class Location
 */
function Location(id, long) {
	this.id = id;
	this.longDescription = long;
	this.shortDescription;
	this.items = []; // dynamic list, drop & take
	this.exits = []; // static list
	this.props = {forced:false, light:false, water:false, oil:false, pirate:false, 
		cave:false, bird:false, snake:false, maze:false, dkroom:false, witt:false};
}

Location.prototype.setLong = function(description) {
	this.longDescription = description;
};

Location.prototype.setShort = function(description) {
	this.shortDescription = description;
};

Location.prototype.addExit = function(exit) {
	this.exits.push(exit);
};

Location.prototype.drop = function(item) {
	this.items.push(item);
};

Location.prototype.take = function(item) {
	var index = this.items.indexOf(item);
	this.items.splice(index, 1);
};

Location.prototype.look = function() {
	return this.longDescription;
};

Location.prototype.addProp = function(prop) { // this is initialisation only
	// prop is in range 0-9
	if (prop == 0) this.props.light = true; // 0 = light
	if (prop == 1) { // the liquid prop is read first, so we turn water to false (and it stays that way)
		this.props.oil = true; // 1 = oil (liquid) [prev:water if false, oil if true]
		this.props.water = false; // oil, not water
	}
	if (prop == 2) this.props.water = true; // 2 = water (liqloc) [prev:water&oil]
	if (prop == 3) this.props.pirate = true; // 3 = pirate
	if (prop == 4) this.props.cave = true; // 4 = cave hint
	if (prop == 5) this.props.bird = true; // 5 = bird hint
	if (prop == 6) this.props.snake = true; // 6 = snake hint
	if (prop == 7) this.props.maze = true; // 7 = maze hint
	if (prop == 8) this.props.dkroom = true; // 8 = darkroom hint
	if (prop == 9) this.props.witt = true; // 9 = witt's end hint
};
Location.prototype.hasProp = function(prop) { 
	return this.props[prop];
};


Location.prototype.countItems = function() {
	return this.itemList.length;
};
Location.prototype.getItems = function() {
	return this.itemList;
};
Location.prototype.hasItem = function(item) {
	return (this.itemList.indexOf(item) !== 0);
};