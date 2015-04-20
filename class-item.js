/**
 * Class Item
 */
function Item(id, description) {
	this.id = id; // for reference (?)
	this.description = description;
	this.initial = []; // initial location, or locations for 2-sided items
	this.currentStatus = 0;
	this.statusMessage = []; // array of status messages, currentStatus is index
	this.fixed = false; // unmovable if true
}

Item.prototype.show = function() {
	return this.description;
};

Item.prototype.addStatus = function(status, message) {
	this.statusMessage[status] = message;
};

Item.prototype.getStatus = function() {
	return this.statusMessage[this.currentStatus];
};

Item.prototype.setStatus = function(status) {
	this.currentStatus = status;
};

Item.prototype.setLocation = function(location, fixed) {
	this.fixed = (fixed != 0);
	this.initial.push(location);
	locations[location].drop(this);
	if (this.isFixed() && fixed > 0) {
		this.initial.push(fixed);
		locations[fixed].drop(this);
	}
};

Item.prototype.isFixed = function() {
	return this.fixed;
};

Item.prototype.move = function(location) {
	if (this.fixed == 0) this.where = location;
};

Item.prototype.liquid = function() {
	if (this.id == 20) {
		if (this.currentStatus == 0) return 21; //water
		if (this.currentStatus == 2) return 22; //oil
	};
	return -1;
};

Item.prototype.isTreasure = function() {
	return (this.id >= 50);
};