/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.life;

public enum Element {
    NEUTRAL, PHYSICAL, FIRE, ICE, LIGHTING, POISON, HOLY, DARKNESS;

    public static Element getFromChar(char c) {
	switch (Character.toUpperCase(c)) {
	    case 'F':
		return FIRE;
	    case 'I':
		return ICE;
	    case 'L':
		return LIGHTING;
	    case 'S':
		return POISON;
	    case 'H':
		return HOLY;
	    case 'P':
		return PHYSICAL;
	    case 'D': // Added on v.92 MSEA
		return DARKNESS;
	}
	throw new IllegalArgumentException("unknown elemnt char " + c);
    }
}