/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.maps;

public enum SavedLocationType {

    FREE_MARKET,
    WORLDTOUR,
    FLORINA,
    MONSTERPARK,
    BATTLESQUARE,
    GUILD,
    MIRROR,
    RICHIE,
    HAPPYVILLIAGE,
    LIONCASTLE,
    WEDDING,
    PROFESSION,
    CRYSTALGARDEN,
    EREB,
    FREE_MARKET_SHOP;

    public static SavedLocationType fromString(String Str) {
	return valueOf(Str);
    }
}
