/*
 * ArcStory Project
 * 최주원 sch2307@naver.com
 * 이준 junny_adm@naver.com
 * 우지훈 raccoonfox69@gmail.com
 * 강정규 ku3135@nate.com
 * 김진홍 designer@inerve.kr
 */

package server.shops;

import java.util.HashMap;
import java.util.Map;

public class MapleShopFactory {
    private Map<Integer,MapleShop> shops = new HashMap<Integer,MapleShop>();
    private Map<Integer,MapleShop> npcShops = new HashMap<Integer,MapleShop>();
    private static MapleShopFactory instance = new MapleShopFactory();

    public static MapleShopFactory getInstance() {
	return instance;
    }

    public void clear() {
        shops.clear();
        npcShops.clear();
    }

    public MapleShop getShop(int shopId) {
	if (shops.containsKey(shopId)) {
	    return shops.get(shopId);
	}
	return loadShop(shopId, true);
    }

    public MapleShop getShopForNPC(int npcId) {
	if (npcShops.containsKey(npcId)) {
	    return npcShops.get(npcId);
	}
	return loadShop(npcId, false);
    }

    private MapleShop loadShop(int id, boolean isShopId) {
	MapleShop ret = MapleShop.createFromDB(id, isShopId);
	if (ret != null) {
	    shops.put(ret.getId(), ret);
	    npcShops.put(ret.getNpcId(), ret);
	} else if (isShopId) {
	    shops.put(id, null);
	} else {
	    npcShops.put(id, null);
	}
	return ret;
    }
}
