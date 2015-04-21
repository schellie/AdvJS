/**
 * Class Action
 */
function Action(id, word) {
	this.id = id;
	this.response = '';
	this.type = int(id/1000);
	switch (this.type) {
	case 0: 
		//this.action = player.move(player); // closure
		break;
	case 1:
		//this.action = processObject;
		break;
	case 2: 
		//this.action = 'action' + word.substr(0,1).toUpperCase() + word.substr(1).toLowerCase();
		break;
	case 3:
		if (id >= 3001 && id <= 3005) this.action = actionFoo;
		//this.action = sayResponse;
		break;
	}
} 

Action.prototype.getId = function() {
	return this.id;
};

Action.prototype.setResponse = function(message) {
	this.response = message;
};

Action.prototype.getResponse = function() {
	return this.response;
};
