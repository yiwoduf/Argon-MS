/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package launch;

import client.items.IItem;
import client.items.ItemFactory;
import constants.ServerConstants;
import database.MYSQL;
import java.awt.Point;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import launch.ChannelServer;
import java.sql.Connection;
import server.items.MerchItemPackage;
import server.shops.AbstractPlayerStore;
import server.shops.HiredMerchant;
import server.shops.MapleCharacterShopItem;
import launch.Start;

/**
 *
 * @author userv
 */
public class autoRestartHiredMerchant {

    public static void respawnMerchants() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT id,meso,start FROM hiredmerchantsaves");
            ResultSet rs = ps.executeQuery();
            int rows = 0;
            while (rs.next()) {
                final MerchItemPackage pack = new MerchItemPackage();
                pack.setPackageid(rs.getInt("id"));
                pack.setMesos(rs.getInt("meso"));
                pack.setSentTime(rs.getLong("start"));
                ItemFactory.loadItemsFromMerchant(pack);
                spawnMerchant(rs.getInt("id"), pack);
                rows++;
            }
            Start.println("[ARGON] Total" + rows + "of Merchant Shop has been respawned.", 34);
            rs.close();
            ps.close();
            con.close();
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public static void spawnMerchant(int merchid, MerchItemPackage pack) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM hiredmerchantsaves WHERE id = ?");
            ps.setInt(1, merchid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {

                final String desc = rs.getString("desc");
                final int itemId = rs.getInt(("itemId"));
                final String name = rs.getString("ownerName");
                final int cid = rs.getInt("ownerId");
                final int accid = rs.getInt(("ownerAccid"));
                final int x = rs.getInt(("x"));
                final int y = rs.getInt(("y"));
                final int map = rs.getInt(("map"));
                final int channel = rs.getInt(("channel"));
                final long startTime = rs.getLong("start");
                if (rs.getLong("start") + 1000 * 60 * 60 * 24 > System.currentTimeMillis()) {
                    final HiredMerchant merchant = new HiredMerchant(name, cid, accid, new Point(x, y), map, channel, itemId, desc, startTime);
                    ps = con.prepareStatement("SELECT * FROM hiredmerchantsaveitems WHERE merchid = ? ORDER BY id ASC");
                    ps.setInt(1, merchid);
                    ResultSet rs2 = ps.executeQuery();
                    while (rs2.next()) {
                        for (IItem item : pack.getItems()) {
                            if (item.getUniqueId() == rs2.getInt("uniqueid")) {
                                MapleCharacterShopItem shopitem = new MapleCharacterShopItem(item, rs2.getShort("bundle"), rs2.getInt("price"));
                                merchant.addItem(shopitem);
                            }
                        }
                    }
                    merchant.setMeso(rs.getInt("meso"));
                    merchant.setStoreid(ChannelServer.getInstance(channel).addMerchant(merchant));
                    merchant.setOpen(true);
                    ChannelServer.getInstance(channel).getMapFactory().getMap(map).addMapObject((AbstractPlayerStore) merchant);
                    ps.close();
                }
                try {
                    PreparedStatement pszzz = con.prepareStatement("DELETE FROM hiredmerchantsaveitems WHERE merchid = ?");
                    pszzz.setInt(1, merchid);
                    pszzz.execute();
                    pszzz.close();
                    PreparedStatement pszz = con.prepareStatement("DELETE FROM hiredmerchantsaves WHERE id = ?");
                    pszz.setInt(1, merchid);
                    pszz.execute();
                    pszz.close();
                    PreparedStatement psz = con.prepareStatement("DELETE from hiredmerch where characterid = ?");
                    psz.setInt(1, cid);
                    psz.execute();
                    psz.close();
                } catch (SQLException e) {
                }
                con.close();
            } else {
                Start.println("[오류] 고용상점을 재소환 하는데 실패했습니다. 해당 아이디가 없습니다. : " + merchid, 34);
            }

        } catch (Exception e) {
            Start.println("[오류] 고용상점을 재소환 하는데 실패했습니다.", 34);
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }
}
