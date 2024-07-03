package packet.creators;

import constants.GameConstants;
import java.sql.SQLException;
import java.sql.ResultSet;
import client.MapleClient;
import client.MapleCharacter;
import client.items.Equip;
import client.items.IItem;
import client.items.Item;
import client.items.MapleInventoryType;
import handler.channel.InventoryHandler;
//import packet.transfer.write.byte[];
import packet.opcode.SendPacketOpcode;
import tools.HexTool;
import packet.transfer.write.WritingPacket;
import server.items.CashItemInfo;
import tools.Pair;
import java.util.List;
import launch.LoginServer;
import server.shops.HiredMerchant;
import server.shops.MapleCharacterShopItem;

public class CashPacket {

    public static byte[] warpCS(MapleClient c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.WARP_TO_MAP.getValue() + 2);
        PacketProvider.addPlayerInfo(packet, c.getPlayer());
        for (int i = 0; i < 10; i++) {
            packet.writeShort(0);
            packet.writeShort(0);
            packet.writeInt(0);
        }
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write0(1080);
        packet.writeShort(0);
        packet.writeShort(0);
        return packet.getPacket();
    }

    public static byte[] useCharm(byte charmsleft, byte daysleft) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        packet.write(9);
        packet.write(1);
        packet.write(charmsleft);
        packet.write(daysleft);

        return packet.getPacket();
    }

    public static byte[] itemExpired(int itemid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(3); //1.2.250+ (+1)
        packet.writeInt(itemid);

        return packet.getPacket();
    }

    public static byte[] GoldenHammer(boolean start, boolean success) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.HAMMER_EFFECT.getValue());
        if (start) {
            packet.write(0);
            packet.writeInt(1);
        } else {
            packet.write(2);
            packet.writeInt(success ? 0 : 1);
        }

        return packet.getPacket();
    }

    public static byte[] changePetName(MapleCharacter chr, String newname, int slot) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.PET_NAMECHANGE.getValue());
        mplew.writeInt(chr.getId());
        mplew.writeInt(slot);
        mplew.writeMapleAsciiString(newname);
        mplew.writeInt(0);

        return mplew.getPacket();
    }

    public static byte[] useChalkboard(final int charid, final String msg) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CHALKBOARD.getValue());

        packet.writeInt(charid);
        if (msg == null) {
            packet.write(0);
        } else {
            packet.write(1);
            packet.writeMapleAsciiString(msg);
        }

        return packet.getPacket();
    }

    public static byte[] getTrockRefresh(MapleCharacter chr, byte vip, boolean delete) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.TROCK_LOCATIONS.getValue());
        packet.write(delete ? 2 : 3);
        packet.write(vip);
        chr.sendPacketTrock(packet, vip);

        return packet.getPacket();
    }

    public static byte[] sendWishList(MapleCharacter chr, boolean update) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x0A); //1.2.203+
        int[] list = chr.getWishlist();
        for (int i = 0; i < 12; i++) {
            packet.writeInt(list[i] != -1 ? list[i] : 0);
        }
        return packet.getPacket();
    }

    public static byte[] showNXMapleTokens(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_UPDATE.getValue());
        packet.writeInt(chr.getCSPoints(1)); // NXCash
        packet.writeInt(chr.getCSPoints(2)); // MPoint
        packet.writeInt(0); //MMileage

        return packet.getPacket();
    }

    public static byte[] showBoughtCSItem(IItem item, int sn, int accid, int chrid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x0E);
        PacketProvider.addCashItemInformation(packet, item, accid, sn);
        packet.write0(5);

        return packet.getPacket();
    }

    public static byte[] showBoughtPendentSlot(int data) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x61); //1.2.250+ (+2)
        packet.writeInt(data);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] showBoughtCSPackages(List<Pair<Integer, CashItemInfo>> item, List<IItem> items, int accid, int chrid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x4A);
        packet.write(item.size());
        int i = 0;
        for (Pair<Integer, CashItemInfo> p : item) {
            if (GameConstants.getInventoryType(p.getRight().getId()).equals(MapleInventoryType.EQUIP)) {
                Equip equip = (Equip) items.get(i);
                PacketProvider.addCashItemInformation(packet, equip, accid, p.getLeft());
            } else {
                Item itemr = (Item) items.get(i);
                PacketProvider.addCashItemInformation(packet, itemr, accid, p.getLeft());
            }
            i++;
        }
        packet.write0(7);

        return packet.getPacket();
    }

    public static byte[] showCashInventory(MapleClient c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x6);
        packet.write(0);
        packet.writeShort(c.getPlayer().getCashInventory().getInventory().size()); //CashInventory Size
        for (IItem item : c.getPlayer().getCashInventory().getInventory()) {
            PacketProvider.addCashItemInformation(packet, item, c.getAccID(), item.getUniqueId());
        }
        if (c.getPlayer().getCashInventory().getInventory().size() > 0) {
            packet.writeInt(0);
        }
        packet.writeShort(c.getPlayer().getStorage().getSlots());
        //packet.writeInt(c.getChrSlot()); //Character Slot.
        packet.writeInt(c.getChrSlot());
        packet.writeShort(c.getChrSlot()); //Follwing Character Slot.

        return packet.getPacket();
    }

    public static byte[] takeOutFromCashInventory(IItem item, short position) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x23); //1.2.250 (+2)
        packet.write(1);
        packet.writeShort(position);
        PacketProvider.addItemInfo(packet, item, true, true, null);
        packet.write0(5); //1.2.239+

        return packet.getPacket();
    }

    public static byte[] putIntoCashInventory(IItem item, int accid, int chrid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x25);
        PacketProvider.addCashItemInformation(packet, item, accid, -1);

        return packet.getPacket();
    }

    public static byte[] showBoughtCSQuestItem(short position, int itemid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.writeInt(0x191); //1.2.192+
        packet.write(0);
        packet.writeShort(1);
        packet.write(position);
        packet.write(0);
        packet.writeInt(itemid);

        return packet.getPacket();
    }

    public static byte[] wrongCouponCode() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x54);
        packet.write(0xB9);

        return packet.getPacket();
    }

    public static byte[] showCouponRedeemedItem(int itemid) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.writeShort(0x3E);
        packet.writeInt(0);
        packet.writeInt(1);
        packet.writeShort(1);
        packet.writeShort(0x1A);
        packet.writeInt(itemid);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] readyToPurchase() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x5F);
        packet.writeInt(0);
        packet.writeInt(1);

        return packet.getPacket();
    }

    public static byte[] sendPendont() {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x1F);
        packet.writeShort(0);
        packet.writeShort(0x1E);

        return packet.getPacket();
    }

    public static byte[] enableUse() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CHANNEL_SELECTED.getValue());
        packet.write(1);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] showGifts() {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x8);
        packet.writeShort(0);

        return packet.getPacket();
    }

    public static byte[] enableUse3(MapleCharacter c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x5);
        packet.writeInt(1);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] getCSCody() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_CODY.getValue());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] payBackItem(int point, int id) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0x89); // 9A → 83
        packet.writeLong(id);
        packet.writeInt(point);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] showRandomReward(int uniqueid, IItem item, short slot) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CS_OPERATION.getValue());
        packet.write(0xA7);
        packet.writeInt(uniqueid);
        packet.writeInt(0);
        packet.writeInt(0);
        PacketProvider.addItemInfo(packet, item, true, true, null);
        packet.writeShort(slot);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] getOwlOpen() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OWL_OF_MINERVA.getValue());
        packet.write(9);
        packet.write(GameConstants.owlItems.length);
        for (int i : GameConstants.owlItems) {
            packet.writeInt(i); //these are the most searched items. too lazy to actually make
        }
        return packet.getPacket();
    }

    public static byte[] getOwlSearched(final int itemSearch, final List<HiredMerchant> hms) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OWL_OF_MINERVA.getValue());
        packet.write(8);
        packet.writeInt(0);
        packet.writeInt(itemSearch);
        int size = 0;

        for (HiredMerchant hm : hms) {
            size += hm.searchItem(itemSearch).size();
        }
        packet.writeInt(size);
        for (HiredMerchant hm : hms) {
            final List<MapleCharacterShopItem> items = hm.searchItem(itemSearch);
            for (MapleCharacterShopItem item : items) {
                packet.writeMapleAsciiString(hm.getOwnerName());
                packet.writeInt(hm.getMap().getId());
                packet.writeMapleAsciiString(hm.getDescription());
                packet.writeInt(item.item.getQuantity()); //I THINK.
                packet.writeInt(item.bundles); //I THINK.
                packet.writeInt(item.price);
                switch (InventoryHandler.OWL_ID) {
                    case 0:
                        packet.writeInt(hm.getOwnerId()); //store ID
                        break;
                    case 1:
                        packet.writeInt(hm.getStoreId());
                        break;
                    default:
                        packet.writeInt(hm.getObjectId());
                        break;
                }
                packet.write(hm.getFreeSlot() == -1 ? 1 : 0);
                packet.write(GameConstants.getInventoryType(itemSearch).getType()); //position?
                if (GameConstants.getInventoryType(itemSearch) == MapleInventoryType.EQUIP) {
                    PacketProvider.addItemInfo(packet, item.item, true, true, null);
                }
            }
        }
        return packet.getPacket();
    }

    public static byte[] getOwlMessage(final int msg) {
        WritingPacket packet = new WritingPacket(3);
        packet.writeShort(SendPacketOpcode.OWL_RESULT.getValue());
        packet.write(msg);
        return packet.getPacket();
    }

    public static byte[] pendantSlot(boolean p) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PENDANT_SLOT.getValue());
        packet.write(p ? 1 : 0);
        return packet.getPacket();
    }
}
