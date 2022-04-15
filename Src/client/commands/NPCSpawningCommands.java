/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */
package client.commands;

import constants.ServerConstants;
import java.awt.Point;
import java.util.List;

import client.MapleClient;
import client.items.IItem;
import client.items.MapleInventoryType;
import database.MYSQL;
import java.sql.Connection;
import server.life.MapleLifeProvider;
import server.life.MapleNPC;
import server.maps.MapleMapObject;
import packet.creators.MainPacketCreator;
import server.life.*;
import server.maps.MapleMapObjectType;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;

public class NPCSpawningCommands implements Command {

    @Override
    public void execute(MapleClient c, String[] splitted) throws Exception, IllegalCommandSyntaxException {

        if (splitted[0].equals("!���ǽ�")) {
            int npcId = Integer.parseInt(splitted[1]);
            MapleNPC npc = MapleLifeProvider.getNPC(npcId);
            if (npc != null && !npc.getName().equals("MISSINGNO")) {
                npc.setPosition(c.getPlayer().getPosition());
                npc.setCy(c.getPlayer().getPosition().y);
                npc.setRx0(c.getPlayer().getPosition().x + 50);
                npc.setRx1(c.getPlayer().getPosition().x - 50);
                npc.setFh(c.getPlayer().getMap().getFootholds().findMaple(c.getPlayer().getPosition()).getId());
                npc.setCustom(true);
                c.getPlayer().getMap().addMapObject(npc);
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.spawnNPC(npc, true));
            } else {
                c.getPlayer().dropMessage(6, "WZ�� �������� �ʴ� NPC�� �Է��߽��ϴ�.");
            }
	} else if (splitted[0].equals("!���ǽû���")) {
	    for (MapleMapObject npcss : c.getPlayer().getMap().getAllNPC()) {
                MapleNPC npc = (MapleNPC) npcss;
                if (splitted[1] != null) {
                  if (npc.getId() == Integer.parseInt(splitted[1])) {
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeNPC(npc.getObjectId()));
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeNPCController(npc.getObjectId()));
                    c.getPlayer().getMap().removeMapObject(npc);
                  }
                } else {
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeNPC(npc.getObjectId()));
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeNPCController(npc.getObjectId()));
                    c.getPlayer().getMap().removeMapObject(npc);
                }
	    }
            c.getPlayer().dropMessage(6, "�ӽ� ��ȯ�� ���ǽð� �����Ǿ����ϴ�.");
        } else if (splitted[0].equals("!������ġ")) {
            Point pos = c.getPlayer().getPosition();
            c.getPlayer().dropMessage(6, "CY: " + (pos.y + 2) + " | RX0: " + (pos.x + 50) + " | RX1: " + (pos.x - 50) + " | FH: " + c.getPlayer().getMap().getFootholds().findMaple(pos).getId());
        } else if (splitted[0].equals("!�÷��̾�ǽ�")) {
            int npcId = Integer.parseInt(splitted[1]);
            MaplePlayerNPC npc = new MaplePlayerNPC(npcId, new MapleNPCStats(""));
            if (npc != null) {
                npc.setPosition(c.getPlayer().getPosition());
                npc.setName(c.getPlayer().getName());
                npc.setCy(c.getPlayer().getPosition().y);
                npc.setRx0(c.getPlayer().getPosition().x + 50);
                npc.setRx1(c.getPlayer().getPosition().x - 50);
                npc.setFace(c.getPlayer().getFace());
                npc.setHair(c.getPlayer().getHair());
                npc.setSkin((byte) c.getPlayer().getSkinColor());
                npc.setDirection((byte) (c.getPlayer().isFacingLeft() ? 0 : 1));
                npc.setFh(c.getPlayer().getMap().getFootholds().findMaple(c.getPlayer().getPosition()).getId());
                Map<Byte, Integer> equips = new LinkedHashMap<Byte, Integer>();
                for (IItem equip : c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).list()) {
                    equips.put((byte) equip.getPosition(), equip.getItemId());
                }
                npc.setEquips(equips);
                c.getPlayer().getMap().addMapObject(npc);
                npc.broadcastPacket(c.getPlayer().getMap());
                try {
                    Connection con = MYSQL.getConnection();
                    String sql = "INSERT INTO `playernpcs`(`id`, `name`, `hair`, `face`, `skin`, `dir`, `x`, `y`, `map`) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,?)";
                    PreparedStatement ps = con.prepareStatement(sql);
                    ps.setInt(1, npcId);
                    ps.setString(2, c.getPlayer().getName());
                    ps.setInt(3, c.getPlayer().getHair());
                    ps.setInt(4, c.getPlayer().getFace());
                    ps.setInt(5, c.getPlayer().getSkinColor());
                    ps.setInt(6, c.getPlayer().isFacingLeft() ? 0 : 1);
                    ps.setInt(7, c.getPlayer().getPosition().x);
                    ps.setInt(8, c.getPlayer().getPosition().y);
                    ps.setInt(9, c.getPlayer().getMapId());
                    ps.executeUpdate();
                    ps.close();
                    ps = con.prepareStatement("INSERT INTO `playernpcs_equip`(`npcid`, `equipid`, `equippos`) VALUES (? ,? ,?)");
                    ps.setInt(1, npcId);
                    for (IItem equip : c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).list()) {
                        ps.setInt(2, equip.getItemId());
                        ps.setByte(3, (byte) equip.getPosition());
                        ps.executeUpdate();
                    }
                    ps.close();
                    con.close();
                    c.getPlayer().dropMessage(6, "�÷��̾� ���ǽð� ���������� DB�� ��ϵǾ����ϴ�.");
                } catch (Exception e) {
                    c.getPlayer().dropMessage(1, "�÷��̾� ���ǽð� DB�� ��ϵ��� ���߽��ϴ�.");
                    System.err.println("[����] �÷��̾� ���ǽø� �����ϴ� ���� ������ �߻��߽��ϴ�.");
                    if (!ServerConstants.realese) {
                        e.printStackTrace();
                    }
                }
            } else {
                c.getPlayer().dropMessage(6, "WZ�� �������� �ʴ� NPC�� �Է��߽��ϴ�.");
            }
        } else if (splitted[0].equals("!�������ǽ�")) {
            int npcId = Integer.parseInt(splitted[1]);
            MapleNPC npc = MapleLifeProvider.getNPC(npcId);
            if (npc != null && !npc.getName().equals("MISSINGNO")) {
                npc.setPosition(c.getPlayer().getPosition());
                npc.setCy(c.getPlayer().getPosition().y + 2);
                npc.setRx0(c.getPlayer().getPosition().x + 50);
                npc.setRx1(c.getPlayer().getPosition().x - 50);
                npc.setFh(c.getPlayer().getMap().getFootholds().findMaple(c.getPlayer().getPosition()).getId());
                c.getPlayer().getMap().addMapObject(npc);
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.spawnNPC(npc, true));
            } else {
                c.getPlayer().dropMessage(6, "WZ�� �������� �ʴ� NPC�� �Է��߽��ϴ�.");
                return;
            }
            try {
                Connection con = MYSQL.getConnection();
                String sql = "INSERT INTO `spawn`(`lifeid`, `rx0`, `rx1`, `cy`, `fh`, `type`, `dir`, `mapid`, `mobTime`) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,?)";
                PreparedStatement ps = con.prepareStatement(sql);
                ps.setInt(1, npcId);
                ps.setInt(2, c.getPlayer().getPosition().x - 50);
                ps.setInt(3, c.getPlayer().getPosition().x + 50);
                ps.setInt(4, c.getPlayer().getPosition().y);
                ps.setInt(5, c.getPlayer().getMap().getFootholds().findMaple(c.getPlayer().getPosition()).getId());
                ps.setString(6, "n");
                ps.setInt(7, c.getPlayer().getFacingDirection() == 1 ? 0 : 1);
                ps.setInt(8, c.getPlayer().getMapId());
                ps.setInt(9, 0);
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (Exception e) {
                System.err.println("[����] ���ǽø� ���� ����ϴµ� �����߽��ϴ�.");
                if (!ServerConstants.realese) {
                    e.printStackTrace();
                }
            }
        } else if (splitted[0].equals("!�������ǽû���")) { // ġ�쾾 :: �������ǽ� ���� �õ�
            int npcId = Integer.parseInt(splitted[1]);
            for (MapleMapObject npcss : c.getPlayer().getMap().getAllNPC()) {
                MapleNPC npc = (MapleNPC) npcss;
                if (splitted[1] != null) {
                    if (npc.getId() == Integer.parseInt(splitted[1])) {
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeNPC(npc.getObjectId()));
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeNPCController(npc.getObjectId()));
                        c.getPlayer().getMap().removeMapObject(npc.getObjectId());
                    }
                } else {
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeNPC(npc.getObjectId()));
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeNPCController(npc.getObjectId()));
                    c.getPlayer().getMap().removeMapObject(npc.getObjectId());
                }
            }
            try {
                String sql = "DELETE FROM spawn WHERE lifeid = ?";
                PreparedStatement ps = MYSQL.getConnection().prepareStatement(sql);
                ps.setInt(1, npcId);
                ps.execute();
                ps.close();
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
            c.getPlayer().dropMessage(6, "���� ��ȯ�� ���ǽð� �����Ǿ����ϴ�.");
        } else if (splitted[0].equals("!������")) {
            int mobId = Integer.parseInt(splitted[1]);
            MapleMonster mob = MapleLifeProvider.getMonster(mobId);
            c.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, c.getPlayer().getPosition());
            try {
                Connection con = MYSQL.getConnection();
                String sql = "INSERT INTO `spawn`(`lifeid`, `rx0`, `rx1`, `cy`, `fh`, `type`, `dir`, `mapid`, `mobTime`) VALUES (? ,? ,? ,? ,? ,? ,? ,? ,?)";
                PreparedStatement ps = con.prepareStatement(sql);
                ps.setInt(1, mobId);
                ps.setInt(2, c.getPlayer().getPosition().x - 50);
                ps.setInt(3, c.getPlayer().getPosition().x + 50);
                ps.setInt(4, c.getPlayer().getPosition().y);
                ps.setInt(5, c.getPlayer().getMap().getFootholds().findMaple(c.getPlayer().getPosition()).getId());
                ps.setString(6, "m");
                ps.setInt(7, c.getPlayer().getFacingDirection() == 1 ? 0 : 1);
                ps.setInt(8, c.getPlayer().getMapId());
                ps.setInt(9, 0);
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (Exception e) {
                System.err.println("[����] ���ǽø� ���� ����ϴµ� �����߽��ϴ�.");
                if (!ServerConstants.realese) {
                    e.printStackTrace();
                }
            }
        }
        /* ġ�쾾 :: English Translated GM Command Starts here */
        if (splitted[0].equals("!npc")) {
            int npcId = Integer.parseInt(splitted[1]);
            MapleNPC npc = MapleLifeProvider.getNPC(npcId);
            if (npc != null && !npc.getName().equals("MISSINGNO")) {
                npc.setPosition(c.getPlayer().getPosition());
                npc.setCy(c.getPlayer().getPosition().y);
                npc.setRx0(c.getPlayer().getPosition().x + 50);
                npc.setRx1(c.getPlayer().getPosition().x - 50);
                npc.setFh(c.getPlayer().getMap().getFootholds().findMaple(c.getPlayer().getPosition()).getId());
                npc.setCustom(true);
                c.getPlayer().getMap().addMapObject(npc);
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.spawnNPC(npc, true));
            } else {
                c.getPlayer().dropMessage(6, "That NPC does not exist in WZ.");
            }
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("���ǽ�", "<���ǽ�ID>", "���� ��ġ�� �ش� ID�� ���ǽø� ��ȯ�մϴ�.", 5),
            new CommandDefinition("npc", "<NpcID>", "Spawn NPC yet your current location.", 5),
            new CommandDefinition("���ǽû���", "", "���� �ʿ��� ��ɾ�� ��ȯ�� ��� NPC�� �����մϴ�.", 5),
            new CommandDefinition("�÷��̾�ǽ�", "<��ũ��ƮID>", "���� �ʿ� ���� �÷��̾ ���ǽ÷� ����մϴ�.", 5),
            new CommandDefinition("�������ǽ�", "<���ǽ�ID>", "���� ���� ���� ��ġ�� �ش� ���ǽø� �������� ����մϴ�.", 5),
            new CommandDefinition("�������ǽû���", "", "", 6),
            new CommandDefinition("������", "<��ID>", "���� ���� ���� ��ġ�� �ش� ���͸� �������� ����մϴ�.", 5),
            new CommandDefinition("������ġ", "", "���� X,Y �� �� ��ǥ�� ����մϴ�.", 2)
        };
    }
}
