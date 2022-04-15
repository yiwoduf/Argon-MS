/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client.items;

import java.util.Collection;

public interface InventoryContainer {
	Collection<MapleInventory> allInventories();
}