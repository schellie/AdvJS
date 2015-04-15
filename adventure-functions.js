// STATEMENT FUNCTIONS

/**
 * TOTING - Check if an object is being carried
 * @param obj object to check
 * @returns true if the object is being carried
 */
function TOTING(obj) { 
	return PLACE[obj] == -1; 
}

/**
 * HERE - Check whether an object is at location or carried
 * @param obj object to check
 * @returns true if the object is at the current location (LOC), or carried
 */
function HERE(obj) { 
	return PLACE[obj] == LOC || TOTING(obj); 
}

/**
 * AT - Check whether a fixed object is at location
 * @param obj object to check
 * @returns true if the object is on either side of two-placed object
 */
function AT(obj) { 
	return PLACE[obj] == LOC || FIXED[obj] == LOC; 
}


function LIQ2(pbotl) { /** test ok **/
	return (1-pbotl)*WATER + (pbotl/2>>0)*(WATER+OIL);
}

// OBJECT NUMBER OF LIQUID IN BOTTLE
/**
 * 
 */
function LIQ() { /** test ok **/
	return LIQ2(Math.max(PROP[BOTTLE], -1-PROP[BOTTLE]));
}

// OBJECT NUMBER OF LIQUID (IF ANY) AT LOC
function LIQLOC(loc) { /** test ok **/
	var c1 = (COND[loc]/2>>0)*2,
		c2 = (COND[loc]/4>>0);
	return LIQ2(((c1%8)-5) * (c2%2) + 1);
}

// TRUE IF COND(L) HAS BIT N SET (BIT 0 IS UNITS BIT)
function BITSET(l, n) {
	return ((COND[l] & 1<<n) != 0);
}

//RETURN VAL LEFT-SHIFTED (LOGICALLY) DIST BITS (RIGHT-SHIFT IF DIST<0).
function SHIFT(val, dist) {
	if (dist >= 0) return (val << dist);
	else return (val >> Math.abs(dist));
}

// TRUE IF LOC MOVES WITHOUT ASKING FOR INPUT (COND=2)
function FORCED(loc) { /** test ok **/
	return (COND[loc] == 2);
}

/**
 * DARK - check darkness in (current) location
 * @returns true if current location (LOC) is dark 
 */
function DARK() {
	return ((COND[LOC] % 2) == 0) && ((PROP[LAMP] == 0) || !HERE(LAMP));
}
 
/**
 * RAN - Return a random (integer) value between 0 and range-1
 * @param range
 * @returns random integer between 0 and range-1
 */
function RAN(range) { 
	return (range * Math.random())>>0; // right shift 0 to make this integer (alt. Math.floor)
}

/**
 * PCT - Checks percentage
 * @param n
 * @return true n% of the time (n integer from 0 to 100)
 */
function PCT(n) {
	return (RAN(100) < n);
}
