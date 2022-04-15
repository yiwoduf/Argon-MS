/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.life;

public class BanishInfo {

    private int map;
    private String portal, msg;

    public BanishInfo(String msg, int map, String portal) {
	this.msg = msg;
	this.map = map;
	this.portal = portal;
    }

    public int getMap() {
	return map;
    }

    public String getPortal() {
	return portal;
    }

    public String getMsg() {
	return msg;
    }
}
