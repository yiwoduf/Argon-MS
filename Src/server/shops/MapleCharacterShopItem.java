/*






 */

package server.shops;

import client.items.IItem;

public class MapleCharacterShopItem {
    public IItem item;
    public short bundles;
    public int price;

    public MapleCharacterShopItem(IItem item, short bundles, int price) {
	this.item = item;
	this.bundles = bundles;
	this.price = price;
    }
}
