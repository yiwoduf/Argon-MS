/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
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
