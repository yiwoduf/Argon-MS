
package client.commands;

import client.MapleCharacter;
import client.MapleClient;
import client.commands.Command;
import client.commands.CommandDefinition;
import client.items.*;
import client.skills.SkillFactory;
import client.stats.BuffStats;
import client.stats.DiseaseStats;
import client.stats.PlayerStat;
import constants.GameConstants;
import constants.ServerConstants;
import constants.programs.MedalRanking;
import handler.channel.InventoryHandler;
import launch.ChannelServer;
import launch.world.WorldBroadcasting;
import packet.creators.MainPacketCreator;
import packet.creators.MobPacket;
import packet.creators.UIPacket;
import packet.transfer.write.WritingPacket;
import provider.MapleData;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.items.InventoryManipulator;
import server.items.ItemInformation;
import server.life.MapleMonster;
import server.life.MobSkillFactory;
import server.maps.MapleMapObject;
import server.maps.MapleSummon;
import server.maps.SummonMovementType;
import server.shops.MapleShopFactory;
import tools.*;

import java.awt.*;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;

import static client.commands.CommandProcessor.getOptionalIntArg;
import client.commands.IllegalCommandSyntaxException;
import client.skills.ISkill;
import java.sql.SQLException;
import java.util.logging.Level;
import java.util.logging.Logger;

public class CharCommands implements Command {

    public void execute(MapleClient c, String[] splitted) throws Exception, IllegalCommandSyntaxException {

        if (splitted[0].equals("!ü�³��߱�")) {
            c.getPlayer().getStat().setHp(1, c.getPlayer());
            c.getPlayer().getStat().setMp(500);
            c.getPlayer().updateSingleStat(PlayerStat.HP, 1);
            c.getPlayer().updateSingleStat(PlayerStat.MP, 500);
        } else if (splitted[0].equals("!��")) {
            c.getPlayer().getStat().setHp(c.getPlayer().getStat().getMaxHp(), c.getPlayer());
            c.getPlayer().getStat().setMp(c.getPlayer().getStat().getMaxMp());
            c.getPlayer().updateSingleStat(PlayerStat.HP, c.getPlayer().getStat().getMaxHp());
            c.getPlayer().updateSingleStat(PlayerStat.MP, c.getPlayer().getStat().getMaxMp());
        } else if (splitted[0].equals("!�κ��ʱ�ȭ")) {
            Map<Pair<Short, Short>, MapleInventoryType> eqs = new ArrayMap<Pair<Short, Short>, MapleInventoryType>();
            if (splitted[1].equals("���")) {
                for (MapleInventoryType type : MapleInventoryType.values()) {
                    for (IItem item : c.getPlayer().getInventory(type)) {
                        eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), type);
                    }
                }
            } else if (splitted[1].equals("����")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIPPED)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.EQUIPPED);
                }
            } else if (splitted[1].equals("���")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIP)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.EQUIP);
                }
            } else if (splitted[1].equals("�Һ�")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.USE)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.USE);
                }
            } else if (splitted[1].equals("��ġ")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.SETUP)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.SETUP);
                }
            } else if (splitted[1].equals("��Ÿ")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.ETC)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.ETC);
                }
            } else if (splitted[1].equals("ĳ��")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.CASH)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.CASH);
                }
            } else {
                c.getPlayer().dropMessage(6, "[���/����/���/�Һ�/��ġ/��Ÿ/ĳ��]");
            }
            for (Entry<Pair<Short, Short>, MapleInventoryType> eq : eqs.entrySet()) {
                InventoryManipulator.removeFromSlot(c, eq.getValue(), eq.getKey().left, eq.getKey().right, false, false);
            }
        } else if (splitted[0].equals("!���͹���")) {
            c.getPlayer().giveDebuff(DiseaseStats.ZOMBIFY, MobSkillFactory.getMobSkill(133, 1));
            c.getPlayer().dropMessage(1, "Monster Buff");
        } else if (splitted[0].equals("!��ų")) {
            ISkill skill = SkillFactory.getSkill(Integer.parseInt(splitted[1]));
            byte level = (byte) getOptionalIntArg(splitted, 2, 1);
            byte masterlevel = (byte) getOptionalIntArg(splitted, 3, 1);

            if (level > skill.getMaxLevel()) {
                level = skill.getMaxLevel();
            }
            c.getPlayer().changeSkillLevel(skill, level, masterlevel);
        } else if (splitted[0].equals("!�ƽ���ų")) {
            for (MapleData skill_ : MapleDataProviderFactory.getDataProvider(new File("Setting/wz/String.wz")).getData("Skill.img").getChildren()) {
                try {
                    ISkill skill = SkillFactory.getSkill(Integer.parseInt(skill_.getName()));
                    if ((skill.getId() < 1009 || skill.getId() > 1011)) ;
                    c.getPlayer().changeSkillLevel(skill, skill.getMaxLevel(), skill.getMaxLevel());
                } catch (NumberFormatException nfe) {
                    break;
                } catch (NullPointerException npe) {
                    continue;
                }
            }
        } else if (splitted[0].equals("!��ų����Ʈ")) {
            c.getPlayer().setRemainingSp(getOptionalIntArg(splitted, 1, 1));
            c.getPlayer().updateSingleStat(PlayerStat.AVAILABLESP, c.getPlayer().getRemainingSp());
        } else if (splitted[0].equals("!��ų����Ʈ2")) {
            c.getPlayer().setRemainingSp(getOptionalIntArg(splitted, 2, 1), getOptionalIntArg(splitted, 1, 1) - 1);
            c.getPlayer().updateSingleStat(PlayerStat.AVAILABLESP, c.getPlayer().getRemainingSp());
        } else if (splitted[0].equals("!��������Ʈ")) {
            c.getPlayer().setRemainingAp(Integer.parseInt(splitted[1]));
            c.getPlayer().updateSingleStat(PlayerStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
        } else if (splitted[0].equals("!����")) {
            c.getPlayer().changeJob(Integer.parseInt(splitted[1]));
        } else if (splitted[0].equals("!�󸮱�")) {
            for (ChannelServer ch : ChannelServer.getAllInstances()) {
                if (ch.�󸮱�() == false) {
                    ch.�󸮱�(true);
                    byte[] packet = MainPacketCreator.serverNotice(1, "ä�ñ����� ���۵Ǿ����ϴ�.\r\n���ä���� �Ұ����մϴ�.");
                    ChannelServer.getInstance(ch.getChannel()).broadcastPacket(packet);
                }
            }
        } else if (splitted[0].equals("!���̱�")) {
            for (ChannelServer ch : ChannelServer.getAllInstances()) {
                if (ch.�󸮱�() == true) {
                    ch.�󸮱�(false);
                    byte[] packet = MainPacketCreator.serverNotice(1, "ä�ñ����� ���� �Ǿ����ϴ�.");
                    ChannelServer.getInstance(ch.getChannel()).broadcastPacket(packet);
                }
            }
        } else if (splitted[0].equals("!ä�ñ���")) {
            for (ChannelServer ch : ChannelServer.getAllInstances()) {
                if (ch.�󸮱�() == false) {
                    ch.�󸮱�(true);
                    byte[] packet = MainPacketCreator.serverNotice(1, "ä�ñ����� ���۵Ǿ����ϴ�.\r\n���ä���� �Ұ����մϴ�.");
                    ChannelServer.getInstance(ch.getChannel()).broadcastPacket(packet);
                } else if (ch.�󸮱�() == true) {
                    ch.�󸮱�(false);
                    byte[] packet = MainPacketCreator.serverNotice(1, "ä�ñ����� ���� �Ǿ����ϴ�.");
                    ChannelServer.getInstance(ch.getChannel()).broadcastPacket(packet);
                }
            }
        } else if (splitted[0].equals("!�����")) {
            c.getPlayer().dropMessage(5, "���� " + c.getPlayer().getMap().getId() + " �ʿ� �ֽ��ϴ�.");
        } else if (splitted[0].equals("!�̽�ƽ����")) {
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ���尡�� -");
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ���尡�� -");
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ���尡�� -");
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ���尡�� -");
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ���尡�� -");
        } else if (splitted[0].equals("!�̽�ƽ����")) {
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ����Ұ� -");
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ����Ұ� -");
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ����Ұ� -");
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ����Ұ� -");
            c.getPlayer().Message(7, "[ �˸� ] �̽�ƽ�ʵ� ���� - ����Ұ� -");

        } else if (splitted[0].equals("!����")) {
            MapleShopFactory shop = MapleShopFactory.getInstance();
            int shopId = Integer.parseInt(splitted[1]);
            if (shop.getShop(shopId) != null) {
                shop.getShop(shopId).sendShop(c);
            }

        } else if (splitted[0].equals("!�޼�")) {
            c.getPlayer().gainMeso((long) (9999999999L - c.getPlayer().getMeso()), true);

        } else if (splitted[0].equals("!������")) {
            if (c.getPlayer().getLevel() < 200) {
                c.getPlayer().gainExp(500000000, false, false, true);
            }
        } else if (splitted[0].equals("!��������")) {
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            if (c.getPlayer().getGMLevel() < 6) {
                for (int i : GameConstants.itemBlock) {
                    if (itemId == i) {
                        c.getPlayer().dropMessage(5, "�ش� �������� ����� GM �����δ� ���� �ϽǼ� �����ϴ�.");
                    }
                }
            }
            ItemInformation ii = ItemInformation.getInstance();
            if (GameConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "���� ĳ�ü��� �̿����ֽñ� �ٶ��ϴ�.");
            } else if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " �� �������� �������� �ʽ��ϴ�.");
            } else {
                IItem item;
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    item = ii.randomizeStats((Equip) ii.getEquipById(itemId), true);
                    item.setCash(true);
                } else {
                    item = new Item(itemId, (byte) 0, (short) quantity, (byte) 0);
                }
                InventoryManipulator.addbyItem(c, item);
            }

        } else if (splitted[0].equals("!������")) {
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            /*if (itemId == 2100106 | itemId == 2100107 | itemId == 1002140 | itemId == 1003142 | itemId == 1042003 | itemId == 1062007 | itemId == 1322013) {
                c.getPlayer().dropMessage(5, "" + itemId + " �������� ���� �� �� �����ϴ�. by ���̹�");
                return;
            }
             */
            if (c.getPlayer().getGMLevel() < 6) {
                for (int i : GameConstants.itemBlock) {
                    if (itemId == i) {
                        c.getPlayer().dropMessage(5, "�ش� �������� ����� GM �����δ� ���� �ϽǼ� �����ϴ�.");
                    }
                }
            }
            ItemInformation ii = ItemInformation.getInstance();
            if (GameConstants.isPet(itemId)) {
                c.getPlayer().BuyPET(itemId);
                c.getPlayer().Message("[" + ii.getName(itemId) + "] ���� ��������ϴ�.");
            } else if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " �� �������� �������� �ʽ��ϴ�.");
            } else {
                IItem item;
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    item = ii.randomizeStats((Equip) ii.getEquipById(itemId), true);
                } else {
                    item = new Item(itemId, (byte) 0, (short) quantity, (byte) 0);
                }
                item.setOwner(c.getPlayer().getName());
                item.setGMLog(CurrentTime.getAllCurrentTime() + "�� " + c.getPlayer().getName() + "�� ��ɾ�� ���� ������.");
                InventoryManipulator.addbyItem(c, item);
            }
        } else if (splitted[0].equals("!���")) {
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) (short) getOptionalIntArg(splitted, 2, 1);
            if (GameConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "���� ĳ�ü����� ������ �ּ���.");
            } else {
                IItem toDrop;
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    ItemInformation ii = ItemInformation.getInstance();
                    toDrop = ii.randomizeStats((Equip) ii.getEquipById(itemId), true);
                } else {
                    toDrop = new Item(itemId, (byte) 0, (short) quantity, (byte) 0);
                }
                toDrop.setGMLog(c.getPlayer().getName() + "�� ��� ��ɾ�� ������ ������");

                c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), toDrop, c.getPlayer().getPosition(), true, true);
            }
        } else if (splitted[0].equals("!����")) {
            c.getPlayer().setLevel(Short.parseShort(splitted[1]));
            c.getPlayer().levelUp();
            if (c.getPlayer().getExp() < 0) {
                c.getPlayer().gainExp(-c.getPlayer().getExp(), false, false, true);
            }

        } else if (splitted[0].equals("!�¶���")) {
            c.getPlayer().dropMessage(6, "���� ä�ο� ���ӵ� ������ ������ �����ϴ�. :");
            String names = "";
            for (String name : c.getChannelServer().getPlayerStorage().getAllCharacters().keySet()) {
                names += name;
                names += ", ";
            }
            if (names.equals("")) {
                names = "����ä�ο� �������� ������ �����ϴ�.";
            }
            c.getPlayer().dropMessage(6, names);

        } else if (splitted[0].equals("!�ѿ¶���")) {
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {

                String names = "ä�� " + (cserv.getChannel() == 0 ? 1 : cserv.getChannel() == 1 ? "20���̻�" : cserv.getChannel() == ServerConstants.serverCount - 1 ? cserv.getChannel() + " (�����׽�Ʈä��)" : cserv.getChannel()) + " (" + cserv.getPlayerStorage().getAllCharacters().size() + " ��) : ";
                for (String name : cserv.getPlayerStorage().getAllCharacters().keySet()) {
                    names += name + ", ";
                }
                c.getPlayer().dropMessage(6, names);
            }
        } else if (splitted[0].equals("!�������")) {
            c.getPlayer().dropMessage(6, "������ �����մϴ�.");
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                cserv.saveAllMerchant();
                for (MapleCharacter hp : cserv.getPlayerStorage().getAllCharacters().values()) {
                    if (hp != null) {
                        hp.saveToDB(false, false);
                    }
                }
            }
            MedalRanking.getInstance().save();
            c.getPlayer().dropMessage(6, "������ �Ϸ�Ǿ����ϴ�.");
        } else if (splitted[0].equals("!��")) {
            if (splitted.length > 2) {
                StringBuilder sb = new StringBuilder();
                sb.append(StringUtil.joinStringFrom(splitted, 2));
                if (!c.getPlayer().hasGmLevel((byte) 5)) {
                    if (Integer.parseInt(splitted[1]) >= 12) {
                        c.getPlayer().dropMessage(6, "����� �� ���� �����ڵ��Դϴ�. ��밡���ڵ� : 0~11");
                        return;
                    }
                }
                byte[] packet = MainPacketCreator.getGMText(Integer.parseInt(splitted[1]), sb.toString());
                WorldBroadcasting.broadcastMessage(packet);
            } else {
                c.getPlayer().dropMessage(6, "����: !�� <�����ڵ�> <�Ҹ�>");
            }
        } else if (splitted[0].equals("!��")) {
            if (!c.getPlayer().isHidden()) {
                c.getPlayer().dropMessage(6, "���̵� ��忡���� ���� ����� �� �ֽ��ϴ�.");
            } else {
                for (final MapleMapObject mmo : c.getPlayer().getMap().getAllMonster()) {
                    final MapleMonster monster = (MapleMonster) mmo;
                  //  c.getPlayer().getMap().broadcastMessage(MobPacket.moveMonster(false, -1, 0, 0, 0, 0, monster.getObjectId(), monster.getPosition(), c.getPlayer().getLastRes()));
                    monster.setPosition(c.getPlayer().getPosition());
                }
            }
        } else if (splitted[0].equals("!�뷡")) {
            c.getPlayer().getMap().broadcastMessage(MainPacketCreator.musicChange(splitted[1]));
        } else if (splitted[0].equals("!�ƽ�����")) {
            c.getPlayer().getStat().setAmbition(32767);
            c.getPlayer().getStat().setCharm(32767);
            c.getPlayer().getStat().setDex(32767);
            c.getPlayer().getStat().setDiligence(32767);
            c.getPlayer().getStat().setEmpathy(32767);
            c.getPlayer().getStat().setInsight(32767);
            c.getPlayer().getStat().setInt(32767);
            c.getPlayer().getStat().setLuk(32767);
            c.getPlayer().getStat().setMaxHp(500000);
            if (!GameConstants.isZero(c.getPlayer().getJob())) {
                c.getPlayer().getStat().setMaxMp(500000);
                c.getPlayer().getStat().setMp(500000);
            }
            c.getPlayer().getStat().setHp(500000, c.getPlayer());
            c.getPlayer().getStat().setStr(32767);
            c.getPlayer().getStat().setWillPower(32767);
            c.getPlayer().updateSingleStat(PlayerStat.STR, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.DEX, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.INT, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.LUK, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.CHARISMA, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.WILLPOWER, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.INSIGHT, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.CHARM, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.CRAFT, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.SENSE, 32767);
            c.getPlayer().updateSingleStat(PlayerStat.MAXHP, 500000);
            if (!GameConstants.isZero(c.getPlayer().getJob())) {
                c.getPlayer().updateSingleStat(PlayerStat.MAXMP, 500000);
                c.getPlayer().updateSingleStat(PlayerStat.MP, 500000);
            }
            c.getPlayer().updateSingleStat(PlayerStat.HP, 500000);
        } else if (splitted[0].equals("!�����ʱ�ȭ")) {
            c.getPlayer().getStat().setAmbition(0);
            c.getPlayer().getStat().setCharm(0);
            c.getPlayer().getStat().setDex(4);
            c.getPlayer().getStat().setDiligence(0);
            c.getPlayer().getStat().setEmpathy(0);
            c.getPlayer().getStat().setInsight(0);
            c.getPlayer().getStat().setInt(4);
            c.getPlayer().getStat().setLuk(4);
            c.getPlayer().getStat().setMaxHp(1000);
            c.getPlayer().getStat().setMaxMp(1000);
            c.getPlayer().getStat().setHp(1000, c.getPlayer());
            c.getPlayer().getStat().setMp(1000);
            c.getPlayer().getStat().setStr(4);
            c.getPlayer().getStat().setWillPower(0);
            c.getPlayer().updateSingleStat(PlayerStat.STR, 4);
            c.getPlayer().updateSingleStat(PlayerStat.DEX, 4);
            c.getPlayer().updateSingleStat(PlayerStat.INT, 4);
            c.getPlayer().updateSingleStat(PlayerStat.LUK, 4);
            c.getPlayer().updateSingleStat(PlayerStat.CHARISMA, 0);
            c.getPlayer().updateSingleStat(PlayerStat.WILLPOWER, 0);
            c.getPlayer().updateSingleStat(PlayerStat.INSIGHT, 0);
            c.getPlayer().updateSingleStat(PlayerStat.CHARM, 0);
            c.getPlayer().updateSingleStat(PlayerStat.CRAFT, 0);
            c.getPlayer().updateSingleStat(PlayerStat.SENSE, 0);
            c.getPlayer().updateSingleStat(PlayerStat.MAXHP, 1000);
            c.getPlayer().updateSingleStat(PlayerStat.MAXMP, 1000);
            c.getPlayer().updateSingleStat(PlayerStat.MP, 1000);
            c.getPlayer().updateSingleStat(PlayerStat.HP, 1000);
        } else if (splitted[0].equals("!��ų������")) {
            MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr(splitted[1], '0', 3) + ".img");
            byte maxLevel = 0;
            for (MapleData skill : data) {
                if (skill != null) {
                    for (MapleData skillId : skill.getChildren()) {
                        if (!skillId.getName().equals("icon")) {
                            maxLevel = (byte) MapleDataTool.getIntConvert("maxLevel", skillId.getChildByPath("common"), 0);
                            if (MapleDataTool.getIntConvert("invisible", skillId, 0) == 0) { //��ųâ�� �Ⱥ��̴� ��ų�� �ø�������
                                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(Integer.parseInt(skillId.getName())), maxLevel, SkillFactory.getSkill(Integer.parseInt(skillId.getName())).isFourthJob() ? maxLevel : 0);
                            }
                        }
                    }
                }
            }
            c.send(MainPacketCreator.getGMText(6, "�ش� ������ ��ų�� ��� �ִ뷹���� �÷Ƚ��ϴ�."));
        } else if (splitted[0].equals("!��ų�ʱ�ȭ")) {
            MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr(splitted[1], '0', 3) + ".img");
            byte maxLevel = 0;
            for (MapleData skill : data) {
                if (skill != null) {
                    for (MapleData skillId : skill.getChildren()) {
                        if (!skillId.getName().equals("icon")) {
                            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(Integer.parseInt(skillId.getName())), maxLevel, SkillFactory.getSkill(Integer.parseInt(skillId.getName())).isFourthJob() ? maxLevel : 0);
                        }
                    }
                }
            }
        } else if (splitted[0].equals("!ĳ��")) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "�޼Ұ� �ʿ��մϴ�.");
                return;
            }
            c.getPlayer().modifyCSPoints(1, Integer.parseInt(splitted[1]), true);
        } else if (splitted[0].equals("!����������Ʈ")) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "�޼Ұ� �ʿ��մϴ�.");
                return;
            }
            c.getPlayer().modifyCSPoints(2, Integer.parseInt(splitted[1]), true);
        } else if (splitted[0].equals("!���̵�")) {
            boolean hided = c.getPlayer().isHidden();
            if (hided == true) {
                c.getPlayer().message(6, "���̵� ���°� �����Ǿ����ϴ�.");
            } else {
                c.getPlayer().message(6, "���̵� ���°� ����Ǿ����ϴ�.");
            }
            c.getPlayer().setHide(!hided);
         } else if (splitted[0].equals("!��Ÿ��")) {
            int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            ItemInformation ii = ItemInformation.getInstance();
            short a = (short) Integer.parseInt(splitted[2]);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter hp : cserv.getPlayerStorage().getAllCharacters().values()) {
                    c.getSession().write(MainPacketCreator.getNPCTalk(9000108, (byte) 0, "" + c.getPlayer().getName() + " �� �� ������ �� �޾���? �ٷ� �κ��丮�� Ȯ���غ�", "00 00", (byte) 0));
                    hp.gainItem(itemId, a);
                }
            }
            // ��� �ҽ� �ٲ㺸����
        } else if (splitted[0].equals("!��ü��")) {
            if (splitted.length > 1) {
                StringBuilder text = new StringBuilder();
                text.append(StringUtil.joinStringFrom(splitted, 1));//?
                WorldBroadcasting.broadcastMessage(UIPacket.showInfo("[����] : " + text + ""));
            }
        } else if (splitted[0].equals("!�Ŀ�")) {
            MapleCharacter who = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            final int rc = Integer.parseInt(splitted[2]);
            if (who != null) {
                who.gainRC(rc);
                who.dropMessage(6, "��� " + c.getPlayer().getName() + " �����κ��� " + rc + "�Ŀ�����Ʈ�� ���޹޾ҽ��ϴ�.");
                c.getPlayer().dropMessage(6, "" + splitted[1] + "���� " + rc + "�Ŀ�����Ʈ�� �����߽��ϴ�.");
                try {
                    FileWriter fw = new FileWriter(new File("�Ŀ� �α�.txt"), true);
                    fw.write("��ɾ� ����� : " + c.getPlayer().getName() + " | �Ŀ��� : " + splitted[1] + " | �ݾ� : " + splitted[2] + " | ���� : " + FileoutputUtil.CurrentReadable_Time() + "\r\n");
                    fw.close();
                } catch (IOException ioe) {
                    if (!ServerConstants.realese) {
                        ioe.printStackTrace();
                    }
                }
            } else {
                c.getPlayer().dropMessage(6, "��� �÷��̾ �߰����� ���߽��ϴ�.");
            }
        } else if (splitted[0].equals("!���ι����ʱ�ȭ")) {
            InventoryHandler.resetZeroWeapon(c.getPlayer());
        } else if (splitted[0].equals("!�����׿���")) {
            Point pos = c.getPlayer().getPosition();
            byte way = Byte.parseByte(splitted[1]);
            final MapleSummon summon = new MapleSummon(c.getPlayer(), 101100100, pos, SummonMovementType.ZEROWEAPON, way);
            c.getPlayer().getMap().spawnSummon(summon, true, 5000);
            c.getSession().write(MainPacketCreator.resetActions());
        } 
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("�뷡", "<�����BGM>", "Sound.wz���� �ش� ����� BGM�� ����մϴ�.", 1),
            new CommandDefinition("ü�³��߱�", "", "�ڽ��� HP�� 1, MP�� 500���� ����ϴ�.", 1),
            new CommandDefinition("��", "", "�ڽ��� HP�� MP�� �������� ���� �ִ� HP,MP��ŭ ä��ϴ�.", 1),
            new CommandDefinition("��ų", "<��ųid> <��ų����> <��ų�����ͷ���>", "�ش� ��ųid�� ��ų������ �����ͷ�����ŭ ��ų�� �ø��ϴ�.", 4),
            new CommandDefinition("�ƽ���ų", "", "��� ��ų�� ������ �մϴ�. ��, �����ӽ� ƨ�� ����� �ֽ��ϴ�.", 6),
            new CommandDefinition("�ƽ�����", "", "��� ������ �ִ�� ����ϴ�.", 5),
            new CommandDefinition("�����ʱ�ȭ", "", "��� ������ �ʱ�ȭ �մϴ�.", 5),
            new CommandDefinition("��ų����Ʈ", "<��ų����Ʈ��>", "�⺻ ��ų����Ʈ�� �Է��� ��ų����Ʈ ������ ����ϴ�.", 4),
            new CommandDefinition("��ų����Ʈ2", "<Ȯ�彺ų����Ʈ �ε���> <��ų����Ʈ��>", "�ش� ��ų����Ʈâ�� ��ų����Ʈ�� �Է��� ������ ����ϴ�.", 4),
            new CommandDefinition("��������Ʈ", "<��������Ʈ��>", "���� ����Ʈ�� �ø��ϴ�.", 1),
            new CommandDefinition("����", "<����id>", "�ش��ϴ� ���� id�� �����մϴ�. id�� �߸� �Է��� �� ���������� �Ұ������� �� �ֽ��ϴ�.", 5),
            new CommandDefinition("�����", "", "���� �� �����ѹ��� ����մϴ�.", 3),
            new CommandDefinition("�̽�ƽ����", "", "�̽�ƽ�ʵ� ������ �˷���", 3),
            new CommandDefinition("�̽�ƽ����", "", "�̽�ƽ�ʵ� ������ �˷���", 3),
            new CommandDefinition("�������", "", "���� �������� ��� �÷��̾ �����մϴ�.", 5),
            new CommandDefinition("����", "<����ID>", "�ش� ���� ID�� ���� ������ ���ϴ�.", 5),
            new CommandDefinition("�޼�", "", Long.MAX_VALUE + "�޼Ҹ� ������ ����ϴ�.", 6), // Meso are untraceable, which may fk up the economy if the GM tries to screw us.
            new CommandDefinition("������", "", "�������� �ٷ� ������ ��ŭ�� ����ġ�� ȹ���մϴ�.", 4),
            new CommandDefinition("�󸮱�", "", "ä�ñ����� �����մϴ�.", 9),
            new CommandDefinition("���̱�", "", "ä�ñ����� �����մϴ�.", 9),
            new CommandDefinition("ä�ñ���", "", "ä�ñ����� �����մϴ�.", 9),
            //     new CommandDefinition("��������", "<������ID> (<�����۰���> �⺻��:1)", "�ش� �������� ������ ������ŭ �����ϴ�.", 2),
            new CommandDefinition("������", "<������ID> (<�����۰���> �⺻��:1)", "�ش� �������� ������ ������ŭ �����ϴ�.", 2),
            new CommandDefinition("�ھ�", "<�ھ� ������ ID>", "�ھ� �������� �����մϴ�.", 2),
            new CommandDefinition("���", "<������ID> (<�����۰���> �⺻��:1)", "�ش� �������� ������ ������ŭ ����մϴ�.", 7),
            new CommandDefinition("����", "<����>", "�Է��� ������ �ø��ų� �����ϴ�.", 4),
            new CommandDefinition("�¶���", "", "���� ä�ο� �������� ������ ��� ����մϴ�.", 1),
            new CommandDefinition("�ѿ¶���", "", "��� ä�ο� �������� ������ ��� ����մϴ�.", 1),
            new CommandDefinition("�κ��ʱ�ȭ", "���/����/���/�Һ�/��ġ/��Ÿ/ĳ��", "�ش� ���� �κ��丮�� ��� ��������ϴ�.", 1),
            new CommandDefinition("��", "", "���� ĳ������ ��ġ�� ���͸� �ڼ�ó�� �ٿ������ϴ�.", 5),
            new CommandDefinition("��", "<�����ڵ�> <�޽���>", "��ü ���忡 GM�ؽ�Ʈ ��Ŷ�� �̿��Ͽ� �޽����� ����մϴ�.", 2),
            new CommandDefinition("���̵�", "", "�ٸ� �÷��̾�� ������ �ʰ� ��������ϴ�.", 2),
            new CommandDefinition("��ų������", "<�����ڵ�>", "�����ڵ��� ��ų�� ��� �ִ뷹���� �ø��ϴ�.", 5),
            new CommandDefinition("��ų�ʱ�ȭ", "", "�����ڵ��� ��ų�� ��� �ּҷ����� �����ϴ�.", 5),
            new CommandDefinition("ĳ��", "<�ʿ�ĳ����>", "�ʿ��� ĳ���� ����ϴ�.", 5),
            new CommandDefinition("�Ŀ�", "", "�Ŀ� �г��� �ݾ�", 10),
            new CommandDefinition("��ü��", "�Ҹ�", "��������� �˸��ϴ�.", 9),
            new CommandDefinition("��Ÿ��", "", "��Ÿ���� ���۵˴ϴ�.", 7),
            new CommandDefinition("���ι����ʱ�ȭ", "", "���ι��⸦ �ʱ�ȭ�մϴ�.", 10),
            new CommandDefinition("�����׿���", "way", "���� ������ ������ �����մϴ�.", 10),
            new CommandDefinition("����ȹ���", "", "����� ������ �����մϴ�.", 10),
            new CommandDefinition("���͹���", "", "", 1),
            new CommandDefinition("��Ÿ�ӷ������ʽ�", "", "", 1),
            new CommandDefinition("������Ÿ��", "", "", 1),
            new CommandDefinition("������Ÿ��2", "", "", 1),
            new CommandDefinition("����������Ʈ", "<����������Ʈ��>", "�ʿ��� ����������Ʈ�� ����ϴ�.", 5)
        };
    }
}
