/// I/O ROUTINES (SPEAK, PSPEAK, RSPEAK, GETIN, YES, A5TOA1)

/**
 * Outputs message from LINES, in addition returns the message which can be used 
 * in dialog. If BLKLIN true the message is preceded with a blank line.
 * @param n message number
 * @return message to output
 * @see YESX
 */
function SPEAK(n, skip) { /* jsfiddle test ok */
	if (n == 0) return '';
	if (LINES[n].substr(8,3) == '>$<') return '';
	skip = typeof skip !== 'undefined' ? skip : -1;
	var mssg = '';
	if (BLKLIN) out('');
	if (skip != -1) { // find start of (multiline) status message
		while (parseInt(LINES[n]) != (skip*100) && parseInt(LINES[n]) != -1) n++;
	}
	var k = n;
	while (parseInt(LINES[k++]) == parseInt(LINES[n])) {
		out(LINES[k-1].substr(8)); 
		mssg += LINES[k-1].substr(8);
	}
	return mssg;
}

/**
 * Outputs skip+1st message from msg
 * @param msg index of inventory message for an object (INVENT+N+1 is PROP=N)
 * @param skip number of messages to skip (status of object)
 * @return message to output
 */
function PSPEAK(msg, skip) { 
	var m = PTEXT[msg];
	if (skip >= 0) return SPEAK(m, skip); // m += skip + 1;
	else return SPEAK(m);
}

/**
 * Outputs the i-th 'random' message (Section 6 of database) 
 * @param i number of message to output
 * @return message to output
 */
function RSPEAK(i) {
	if (i != 0) return SPEAK(RTEXT[i]);
	else return '';
}

/**
 * Outputs the i-th 'magic' message (Section 12 of database) 
 * @param i number of message to output
 * @return message to output
 */
function MSPEAK(i) {
	if (i != 0) return SPEAK(MTEXT[i]);
	else return '';
}

/*
		SUBROUTINE GETIN(WORD1,WORD1X,WORD2,WORD2X)

	// GET A COMMAND FROM THE ADVENTURER.  SNARF OUT THE FIRST WORD, PAD IT WITH
	// BLANKS, AND RETURN IT IN WORD1.  CHARS 6 THRU 10 ARE RETURNED IN WORD1X, IN
	// CASE WE NEED TO PRINT OUT THE WHOLE WORD IN AN ERROR MESSAGE.  ANY NUMBER OF
	// BLANKS MAY FOLLOW THE WORD.  IF A SECOND WORD APPEARS, IT IS RETURNED IN
	// WORD2 (CHARS 6 THRU 10 IN WORD2X), ELSE WORD2 IS SET TO ZERO.
	var GETIN = function(WORD1,WORD1X,WORD2,WORD2X) {
		
	};
		DIMENSION A(5),MASKS(6)
		DATA MASKS/"4000000000,"20000000,"100000,"400,"2,0/
		1	,BLANKS/'     '/

		IF(BLKLIN)TYPE 1
	1	FORMAT()
	2	ACCEPT 3,(A(I),I=1,4)
	3	FORMAT(4A5)
		J=0
		DO 9 I=1,4
		IF(A(I).NE.BLANKS)J=1
	9	A(I)=A(I).AND.(SHIFT((A(I).AND.'@@@@@'),-1).XOR.-1)
		IF(BLKLIN.AND.J.EQ.0)GOTO 2

		SECOND=0
		WORD1=A(1)
		WORD1X=A(2)
		WORD2=0

		DO 10 J=1,4
		DO 10 K=1,5
		MSK="774000000000
		IF(K.NE.1)MSK="177*MASKS(K)
		IF(((A(J).XOR.BLANKS).AND.MSK).EQ.0)GOTO 15
		IF(SECOND.EQ.0)GOTO 10
		MSK=-MASKS(6-K)
		WORD2=(SHIFT(A(J),7*(K-1)).AND.MSK)
		1	+(SHIFT(A(J+1),7*(K-6)).AND.(-2-MSK))
		WORD2X=(SHIFT(A(J+1),7*(K-1)).AND.MSK)
		1	+(SHIFT(A(J+2),7*(K-6)).AND.(-2-MSK))
		RETURN

	15	IF(SECOND.EQ.1)GOTO 10
		SECOND=1
		IF(J.EQ.1)WORD1=(WORD1.AND.-MASKS(K))
		1	.OR.(BLANKS.AND.(-MASKS(K).XOR.-1))
	10	CONTINUE
		RETURN
		END
*/

/**
 * Call YESX with messages from section 6.
 * @param x question to ask
 * @param y reply when OK 
 * @param z reply when Cancel
 * @return true when OK, false when Cancel
 */
function YES(x, y, z) { /** as this is the only one pointing to YESX, it can be incorporated **/
	return YESX(x, y, z, RSPEAK);
}

/**
 * Call YESX with messages from section 12.
 * @param x question to ask
 * @param y reply when OK 
 * @param z reply when Cancel
 * @return true when OK, false when Cancel
 */
function YESM(x, y, z) { /** won't happen **/
	return YESX(x, y, z, MSPEAK);
}

/**
 * Create dialog (OK/Cancel) with message x (x is also shown on output), waits for 
 * OK/Cancel answer. If OK, output Y and return true; if Cancel output z and return false.
 * @param x question to ask
 * @param y reply when OK 
 * @param z reply when Cancel
 * @param spk either rspeak or mspeak
 * @return true when OK, false when Cancel
 */
function YESX(x, y, z, spk) {
	var reply = false;
	if (x != 0) {
		reply = confirm(spk(x));
		if (reply) { out('> Yes'); spk(y); }
		else { out('> No'); spk(z); }
	}
	return reply;
}

// SUBROUTINE A5TOA1(A,B,C,CHARS,LENG) - no need for unpacking characters

// A AND B CONTAIN A 1- TO 9-CHARACTER WORD IN A5 FORMAT, C CONTAINS ANOTHER
// WORD AND/OR PUNCTUATION.  THEY ARE UNPACKED TO ONE CHARACTER PER WORD IN THE
// ARRAY "CHARS", WITH EXACTLY ONE BLANK BETWEEN B AND C (OR NONE, IF C >= 0).
// THE INDEX OF THE LAST NON-BLANK CHAR IN CHARS IS RETURNED IN LENG.
function A5TOA1(A,B,C,CHARS,LENG) {
	return;
}

/*
	    IMPLICIT INTEGER(A-Z)
		DIMENSION CHARS(20),WORDS(3)
		DATA MASK,BLANK/"774000000000,' '/

		WORDS(1)=A
		WORDS(2)=B
		WORDS(3)=C
		POSN=1
		DO 1 WORD=1,3
		IF(WORD.EQ.2.AND.POSN.NE.6)GOTO 1
		IF(WORD.EQ.3.AND.C.LT.0)POSN=POSN+1
		DO 2 CH=1,5
		CHARS(POSN)=(WORDS(WORD).AND.MASK)+(BLANK-(BLANK.AND.MASK))
		IF(CHARS(POSN).EQ.BLANK)GOTO 1
		LENG=POSN
		WORDS(WORD)=SHIFT(WORDS(WORD),7)
	2	POSN=POSN+1
	1	CONTINUE
		RETURN
		END
*/


// DATA STRUCTURE ROUTINES (VOCAB, DSTROY, JUGGLE, MOVE, PUT, CARRY, DROP)

// LOOK UP ID IN THE VOCABULARY (ATAB) AND RETURN ITS "DEFINITION" (KTAB), OR
// -1 IF NOT FOUND.  IF INIT IS POSITIVE, THIS IS AN INITIALISATION CALL SETTING
// UP A KEYWORD VARIABLE, AND NOT FINDING IT CONSTITUTES A BUG.  IT ALSO MEANS
// THAT ONLY KTAB VALUES WHICH TAKEN OVER 1000 EQUAL INIT MAY BE CONSIDERED.
// (THUS "STEPS", WHICH IS A MOTION VERB AS WELL AS AN OBJECT, MAY BE LOCATED
// AS AN OBJECT.)  AND IT ALSO MEANS THE KTAB VALUE IS TAKEN MOD 1000.
function VOCAB(id, init) {
	for (var i = 1; i <= TABSIZ; i++) {
		if (KTAB[i] == -1) {
			if (init < 0) return -1; else throw 'REQUIRED VOCABULARY WORD NOT FOUND';
		}
		if (init >= 0 && int(KTAB[i]/1000) != init) continue;
		if (ATAB[i] == id) {
			if (init < 0) return KTAB[i];
			else return KTAB[i] % 1000;
		}
	}
	throw 'RAN OFF END OF VOCABULARY TABLE';
}
 
// PERMANENTLY ELIMINATE "OBJECT" BY MOVING TO A NON-EXISTENT LOCATION.
function DSTROY(object) {
	MOVE(object,0);
};

// JUGGLE AN OBJECT BY PICKING IT UP AND PUTTING IT DOWN AGAIN, THE PURPOSE
// BEING TO GET THE OBJECT TO THE FRONT OF THE CHAIN OF THINGS AT ITS LOC.
function JUGGLE(object) {
	var i = PLACE[object];
	var j = FIXED[object];
	MOVE(object, i);
	MOVE(object + 100, j);
}

// PLACE ANY OBJECT ANYWHERE BY PICKING IT UP AND DROPPING IT.  MAY ALREADY BE
// TOTING, IN WHICH CASE THE CARRY IS A NO-OP.  MUSTN'T PICK UP OBJECTS WHICH
// ARE NOT AT ANY LOC, SINCE CARRY WANTS TO REMOVE OBJECTS FROM ATLOC CHAINS.
function MOVE(object, where) {
	var from;
	if (object > 100) from = FIXED[object - 100];
	else from = PLACE[object];
	if (from > 0 && from <= 300) CARRY(object, from);
	DROP(object, where);
}

// PUT IS THE SAME AS MOVE, EXCEPT IT RETURNS A VALUE USED TO SET UP THE
// NEGATED PROP VALUES FOR THE REPOSITORY OBJECTS.
function PUT(object, where, pval) {
	MOVE(object, where);
	return (-1) - pval;
}

// START TOTING AN OBJECT, REMOVING IT FROM THE LIST OF THINGS AT ITS FORMER
// LOCATION.  INCR HOLDNG UNLESS IT WAS ALREADY BEING TOTED.  IF OBJECT>100
// (MOVING "FIXED" SECOND LOC), DON'T CHANGE PLACE OR HOLDNG.
function CARRY(object, where) {
	if (object <= 100 && PLACE[object] != -1) {
		PLACE[object] = -1;
		HOLDNG++;
	}
	if (ATLOC[where] == object) ATLOC[where] = LINK[object];
	else {
		var temp = ATLOC[where];
		while (LINK[temp] != object) temp = LINK[temp];
		LINK[temp] = LINK[object];
	}

}

// PLACE AN OBJECT AT A GIVEN LOC, PREFIXING IT ONTO THE ATLOC LIST.  DECR
// HOLDNG IF THE OBJECT WAS BEING TOTED.
function DROP(object, where) {
	if (object > 100) FIXED[object - 100] = where;
	else {
		if (PLACE[object] == -1) HOLDNG--;
		PLACE[object] = where;
	}
	if (where > 0) {
		LINK[object] = ATLOC[where];
		ATLOC[where] = object;
	}
}
		
// WIZARDRY ROUTINES (START, MAINT, WIZARD, HOURS(X), NEWHRS(X), MOTD, POOF)
// Skip these alltogether
function START() {};
function MAINT() {};
function WIZARD() {return false;};
function HOURS() {return;};
function NEWHRS() {return;};
function MOTD(alter) {return;};
function POOF() {
	WKDAY='00777400';
	WKEND=0;
	HOLID=0;
	HBEGIN=0;
	HEND=-1;
	SHORT=30;
	MAGIC='DWARF';
	MAGNM=11111;
	LATNCY=90;
}

// UTILITY ROUTINES (SHIFT, RAN, DATIME, CIAO, BUG)
// No real need ...





// RETURN THE DATE AND TIME IN D AND T. (won't because javascript won't modify d and t)
function DATIME(d, t) {
	return;
}

// EXITS, AFTER ISSUING REMINDER TO SAVE NEW CORE IMAGE. No core in javascript (typical mainframe behavior)
function CIAO() {
	throw 'Be sure to save your core-image...';
}

// THE FOLLOWING CONDITIONS ARE CURRENTLY CONSIDERED FATAL BUGS.  NUMBERS < 20
// ARE DETECTED WHILE READING THE DATABASE; THE OTHERS OCCUR AT "RUN TIME".
function BUG(num) {
	var mssg = '';
	switch (num) {
		case 0: mssg = 'MESSAGE LINE > 70 CHARACTERS'; break;
		case 1: mssg = 'NULL LINE IN MESSAGE'; break;
		case 2: mssg = 'TOO MANY WORDS OF MESSAGES'; break;
		case 3: mssg = 'TOO MANY TRAVEL OPTIONS'; break;
		case 4: mssg = 'TOO MANY VOCABULARY WORDS'; break;
		case 5: mssg = 'REQUIRED VOCABULARY WORD NOT FOUND'; break;
		case 6: mssg = 'TOO MANY RTEXT OR MTEXT MESSAGES'; break;
		case 7: mssg = 'TOO MANY HINTS'; break;
		case 8: mssg = 'LOCATION HAS COND BIT BEING SET TWICE'; break;
		case 9: mssg = 'INVALID SECTION NUMBER IN DATABASE'; break;
		case 20: mssg = 'SPECIAL TRAVEL (500>L>300) EXCEEDS GOTO LIST'; break;
		case 21: mssg = 'RAN OFF END OF VOCABULARY TABLE'; break;
		case 22: mssg = 'VOCABULARY TYPE (N/1000) NOT BETWEEN 0 AND 3'; break;
		case 23: mssg = 'INTRANSITIVE ACTION VERB EXCEEDS GOTO LIST'; break;
		case 24: mssg = 'TRANSITIVE ACTION VERB EXCEEDS GOTO LIST'; break;
		case 25: mssg = 'CONDITIONAL TRAVEL ENTRY WITH NO ALTERNATIVE'; break;
		case 26: mssg = 'LOCATION HAS NO TRAVEL ENTRIES'; break;
		case 27: mssg = 'HINT NUMBER EXCEEDS GOTO LIST'; break;
		case 28: mssg = 'INVALID MONTH RETURNED BY DATE FUNCTION'; break;
	}
	throw 'Fatal error: ' + mssg;
}
