/**
 * Class Item
 */
function Item(id, description) {
	this.id = id;
	this.description = description;
	this.where = 0; // needed?
	this.currentStatus = 0;
	this.statusMessage = [];
	this.fixed = 0; // -1 if fixed, or second location (location needed?, or boolean)
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
Item.prototype.setFixed = function(first, second) {
	this.where = first;
	this.fixed = second;
};
Item.prototype.isFixed = function() {
	return (this.fixed !== 0);
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