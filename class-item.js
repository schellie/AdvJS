/**
 * Class Item
 */
function Item(id, description) {
	this.id = id;
	this.description = description;
	this.initial = [];
	this.currentStatus = 0;
	this.statusMessage = [];
	this.fixed = false; 
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
	this.fixed = typeof fixed !== 'undefined' ? true : false;
	this.initial.push(location);
	location.drop(this);
	if (this.isFixed() && !isObjectEmpty(fixed)) {
		this.initial.push(fixed);
		fixed.drop(this);
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