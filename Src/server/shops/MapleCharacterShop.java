/*
 * ArcStory Project
 * 최주원 sch2307@naver.com
 * 이준 junny_adm@naver.com
 * 우지훈 raccoonfox69@gmail.com
 * 강정규 ku3135@nate.com
 * 김진홍 designer@inerve.kr
 */

package server.shops;

import client.MapleClient;
import client.MapleCharacter;
import packet.creators.PlayerShopPacket;
import server.maps.MapleMapObjectType;
import java.util.ArrayList;
import java.util.List;

public class MapleCharacterShop extends AbstractPlayerStore {

    private boolean open;
    private MapleCharacter owner;
    private List<String> bannedList = new ArrayList<String>();

    public MapleCharacterShop(MapleCharacter owner, int itemId, String desc) {
	super(owner, owner.getId(), owner.getAccountID(), owner.getPosition(), itemId, desc, 3);
	this.owner = owner;
	open = false;
    }

    @Override
    public void buy(MapleClient c, int item, short quantity) {
	MapleCharacterShopItem pItem = items.get(item);
	if (pItem.bundles > 0) {
	    owner.getClient().send(PlayerShopPacket.shopItemUpdate(this));
	}
    }

    @Override
    public byte getShopType() {
	return IMapleCharacterShop.PLAYER_SHOP;
    }

    @Override
    public void closeShop(boolean saveItems, boolean remove) {
        MapleCharacter owner = getMCOwner();
        getMCOwner().getClient().send(PlayerShopPacket.shopErrorMessage(10, 3, 0)); //상점이 닫혔습니다.
        removeAllVisitors(3, -2);
        
        getMap().removeMapObject(this);
        for (MapleCharacterShopItem items : getItems()) {
            saveItems(); 
            break;
        }
        owner.setPlayerShop(null);
        update();
    }

    public void banPlayer(String name) {
	if (!bannedList.contains(name)) {
	    bannedList.add(name);
	}
	for (int i = 0; i < 3; i++) {
	    MapleCharacter chr = getVisitor(i);
	    if (chr.getName().equals(name)) {
		chr.getClient().send(PlayerShopPacket.shopErrorMessage(5, 1, 0x11));
		chr.setPlayerShop(null);
		removeVisitor(chr);
	    }
	}
    }

    @Override
    public void setOpen(boolean open) {
	this.open = open;
    }

    @Override
    public boolean isOpen() {
	return open;
    }

    public boolean isBanned(String name) {
	if (bannedList.contains(name)) {
	    return true;
	}
	return false;
    }

    public MapleCharacter getMCOwner() {
	return owner;
    }

    @Override
    public MapleMapObjectType getType() {
	return MapleMapObjectType.SHOP;
    }

    @Override
    public void sendSpawnData(MapleClient client) {

    }

    @Override
    public void sendDestroyData(MapleClient client) {

    }
}
