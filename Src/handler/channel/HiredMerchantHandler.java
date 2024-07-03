/*
 * ArcStory Project
 * 최주원 sch2307@naver.com
 * 이준 junny_adm@naver.com
 * 우지훈 raccoonfox69@gmail.com
 * 강정규 ku3135@nate.com
 * 김진홍 designer@inerve.kr
 */
package handler.channel;

import constants.ServerConstants;
import constants.GameConstants;
import client.MapleClient;
import client.MapleCharacter;
import client.items.IItem;
import client.items.ItemFactory;
import client.items.MapleInventoryType;
import database.MYSQL;
import launch.ChannelServer;
import launch.world.WorldConnected;
import packet.creators.PlayerShopPacket;
import packet.transfer.read.ReadingMaple;
import server.items.InventoryManipulator;
import server.items.MerchItemPackage;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import packet.creators.MainPacketCreator;
import server.maps.MapleMap;

public class HiredMerchantHandler {

    public static final void UseHiredMerchant(final ReadingMaple rh, final MapleClient c) {
        if (c.getPlayer().getMapId() == 910000001) {
            final byte state = checkExistance(c.getAccID());

            switch (state) {
                case 1:
                    c.getPlayer().dropMessage(1, "프레드릭에게 먼저 물건을 찾아가세요.");
                    break;
                case 0:
                    /*boolean merch = true;
                    merch = WorldConnected.hasMerchant(c.getAccID());
                    if (!merch) {
                        c.send(PlayerShopPacket.sendTitleBox());
                    } else {
                        c.getPlayer().dropMessage(1, "이미 고용상점이 열려 있습니다.");
                    }*/
                    boolean merch = c.getChannelServer().constainsMerchant(c.getAccID());
                    if (!merch) {
                        c.send(PlayerShopPacket.sendTitleBox());
                    } else {
                        c.getPlayer().dropMessage(1, "이미 고용상점이 열려잇습니다.");
                    }
                    break;
                default:
                    c.getPlayer().dropMessage(1, "An unknown error occured.");
                    break;
            }
        } else {
            MapleMap map = c.getChannelServer().getMapFactory().getMap(910000001);
            c.getPlayer().changeMap(map, map.getPortal(0));
        }
    }

    public static void displayMerch(MapleClient c) {
        int conv = c.getPlayer().getConversation();
        boolean merch = WorldConnected.hasMerchant(c.getPlayer().getAccountID());
        MerchItemPackage pack;
        if (merch) {
            c.getPlayer().dropMessage(1, "고용상인을 닫고 다시 시도해 주십시오");
            c.getPlayer().setConversation(0);
        } else if (c.getChannelServer().isShutdown()) {
            c.getPlayer().dropMessage(1, "셧다운이 진행중이므로 이용하실수 없습니다.");
            c.getPlayer().setConversation(0);
        } else if (conv == 3) {
            pack = loadItemFrom_Database(c.getPlayer().getId());
            if (pack == null) {
                c.getPlayer().dropMessage(1, "보관중인 아이템이 없습니다.");
                c.getPlayer().setConversation(0);
            } else {
                c.send(PlayerShopPacket.merchItemStore_ItemData(pack));
            }
        }
        c.send(MainPacketCreator.resetActions());
    }

    private static final byte checkExistance(final int accid) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * from hiredmerch where accountid = ?");
            ps.setInt(1, accid);

            if (ps.executeQuery().next()) {
                ps.close();
                return 1;
            }
            ps.close();
            return 0;
        } catch (SQLException se) {
            return -1;
        }
    }

    public static final void MerchantItemStore(final ReadingMaple slea, final MapleClient c) {
        if (c.getPlayer() == null) {
            return;
        }
        final byte operation = slea.readByte();
        //System.out.println(operation);
        boolean merch = c.getChannelServer().constainsMerchant(c.getPlayer().getAccountID());
        if (operation == 0x17) {
            final String secondPassword = slea.readMapleAsciiString();
            final MerchItemPackage pack = loadItemFrom_Database(c.getPlayer().getId());
            if (c.CheckSecondPassword(secondPassword)) {
                if (merch) {
                    c.getPlayer().dropMessage(1, "해당 계정으로 열려잇는 고용상인을 닫아주신후에 이용 부탁드립니다.");
                    c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                } else {
                    if (pack == null) {
                        c.send(PlayerShopPacket.merchItemStore_ItemDataNone()); //보관중인 아이템이 없습니다.
                        c.getPlayer().setConversation(0);
                    } else {
                        c.send(PlayerShopPacket.merchItemStore_ItemData(pack));
                    }
                }
            } else {
                c.send(PlayerShopPacket.merchItemStore2PWCheck((byte) 1));
            }
        } else if (operation == 0x1F) {  // v 1.2.258 +2
            final MerchItemPackage pack = loadItemFrom_Database(c.getPlayer().getId());

            if (pack == null) {
                c.getPlayer().dropMessage(1, "An unknown error occured.");
                return;
            } else if (c.getChannelServer().isShutdown()) {
                c.getPlayer().dropMessage(1, "The world is going to shut down.");
                c.getPlayer().setConversation(0);
                return;
            }
            if (!check(c.getPlayer(), pack)) {
                c.send(PlayerShopPacket.merchItem_Message((byte) 0x28)); // v 1.2.258 +2
                c.getPlayer().dropMessage(1, "2");
                return;
            }
            if (deletePackage(c.getPlayer().getId(), pack.getPackageid())) {
                if (deleteHired(c.getPlayer().getId())) {
                    c.getPlayer().gainMeso(pack.getMesos(), false);
                    for (IItem item : pack.getItems()) {
                        InventoryManipulator.addFromDrop(c, item, false);
                    }
                    c.send(PlayerShopPacket.merchItem_Message((byte) 0x24));  // v 1.2.258 +2
                }
            } else {
                c.getPlayer().dropMessage(1, "찾을 아이템 혹은 메소가 없습니다.");
            }
        } else if (operation == 0x21) {  // v 1.2.258 +2
            c.getPlayer().setConversation(0);
        }
    }

    private static final boolean check(final MapleCharacter chr, final MerchItemPackage pack) {
        if (chr.getMeso() + pack.getMesos() < 0) {
            return false;
        }
        byte eq = 0, use = 0, setup = 0, etc = 0, cash = 0;
        for (IItem item : pack.getItems()) {
            final MapleInventoryType invtype = GameConstants.getInventoryType(item.getItemId());
            if (invtype == MapleInventoryType.EQUIP) {
                eq++;
            } else if (invtype == MapleInventoryType.USE) {
                use++;
            } else if (invtype == MapleInventoryType.SETUP) {
                setup++;
            } else if (invtype == MapleInventoryType.ETC) {
                etc++;
            } else if (invtype == MapleInventoryType.CASH) {
                cash++;
            }
        }
        if (chr.getInventory(MapleInventoryType.EQUIP).getNumFreeSlot() <= eq
                || chr.getInventory(MapleInventoryType.USE).getNumFreeSlot() <= use
                || chr.getInventory(MapleInventoryType.SETUP).getNumFreeSlot() <= setup
                || chr.getInventory(MapleInventoryType.ETC).getNumFreeSlot() <= etc
                || chr.getInventory(MapleInventoryType.CASH).getNumFreeSlot() <= cash) {
            return false;
        }
        return true;
    }

    public static final boolean deletePackage(final int charid, int packageId) {
        try {
            final Connection con = MYSQL.getConnection();

            PreparedStatement ps = con.prepareStatement("DELETE from hiredmerch where characterid = ?");
            ps.setInt(1, charid);
            ps.execute();
            ps.close();

            return true;
        } catch (SQLException e) {
            return false;
        }
    }

    public static final boolean deleteHired(final int characterid) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement del = con.prepareStatement("SELECT PackageId FROM hiredmerch WHERE characterid = ?");
            del.setInt(1, characterid);
            ResultSet rss = del.executeQuery();
            del = con.prepareStatement("DELETE FROM hiredmerch WHERE PackageId = ?");
            PreparedStatement del2 = con.prepareStatement("DELETE FROM hiredmerchantsaves WHERE id = ?");

            PreparedStatement del3 = con.prepareStatement("DELETE FROM hiredmerchantsaveitems WHERE merchid = ?");
            while (rss.next()) {
                del.setInt(1, rss.getInt("PackageId"));
                del.executeUpdate();
                del2.setInt(1, rss.getInt("PackageId"));
                del2.executeUpdate();

                PreparedStatement gc = con.prepareStatement("SELECT uniqueid FROM hiredmerchantsaveitems WHERE merchid = ?");
                gc.setInt(1, rss.getInt("PackageId"));
                ResultSet gcRs = gc.executeQuery();
                PreparedStatement delitem = con.prepareStatement("DELETE FROM inventoryitems WHERE uniqueid = ?");
                while (gcRs.next()) {
                    delitem.setInt(1, gcRs.getInt("uniqueid"));
                    delitem.executeUpdate();
                }
                delitem.close();

                del3.setInt(1, rss.getInt("PackageId"));
                del3.executeUpdate();
            }
            del.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return true;
    }

    public static final MerchItemPackage loadItemFrom_Database(final int charid) {
        Connection con = null;

        try {
            con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * from hiredmerch where characterid = ?");
            ps.setInt(1, charid);

            ResultSet rs = ps.executeQuery();

            if (!rs.next()) {
                ps.close();
                rs.close();
                con.close();
                return null;
            }
            final int packageid = rs.getInt("PackageId");

            final MerchItemPackage pack = new MerchItemPackage();
            pack.setPackageid(packageid);
            pack.setMesos(rs.getInt("Mesos"));
            pack.setSentTime(rs.getLong("time"));
            ps.close();
            rs.close();
            con.close();
            ItemFactory.loadItemsFromMerchant(pack);

            return pack;
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
            return null;
        }
    }
}
