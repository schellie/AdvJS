/**
 * Class Exit
 */
function Exit(action, newLocation) {
	this.action = action; // VERB
	this.target = newLocation; // Y
	//M=Y/1000
	//N=Y MOD 1000
	//m = Math.floor(newLocation/1000);
	//n = newLocation % 1000;
	
	this.condition = Math.floor(newLocation/1000); 
	//C		IF M=0		IT'S UNCONDITIONAL.
	//C		IF 0<M<100	IT IS DONE WITH M% PROBABILITY.
	//C		IF M=100	UNCONDITIONAL, BUT FORBIDDEN TO DWARVES.
	//C		IF 100<M<=200	HE MUST BE CARRYING OBJECT M-100.
	//C		IF 200<M<=300	MUST BE CARRYING OR IN SAME ROOM AS M-200.
	//C		IF 300<M<=400	PROP(M MOD 100) MUST *NOT* BE 0.
	//C		IF 400<M<=500	PROP(M MOD 100) MUST *NOT* BE 1.
	//C		IF 500<M<=600	PROP(M MOD 100) MUST *NOT* BE 2, ETC.

}