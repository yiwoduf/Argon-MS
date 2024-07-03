
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

        if (splitted[0].equals("!체력낮추기")) {
            c.getPlayer().getStat().setHp(1, c.getPlayer());
            c.getPlayer().getStat().setMp(500);
            c.getPlayer().updateSingleStat(PlayerStat.HP, 1);
            c.getPlayer().updateSingleStat(PlayerStat.MP, 500);
        } else if (splitted[0].equals("!힐")) {
            c.getPlayer().getStat().setHp(c.getPlayer().getStat().getMaxHp(), c.getPlayer());
            c.getPlayer().getStat().setMp(c.getPlayer().getStat().getMaxMp());
            c.getPlayer().updateSingleStat(PlayerStat.HP, c.getPlayer().getStat().getMaxHp());
            c.getPlayer().updateSingleStat(PlayerStat.MP, c.getPlayer().getStat().getMaxMp());
        } else if (splitted[0].equals("!인벤초기화")) {
            Map<Pair<Short, Short>, MapleInventoryType> eqs = new ArrayMap<Pair<Short, Short>, MapleInventoryType>();
            if (splitted[1].equals("모두")) {
                for (MapleInventoryType type : MapleInventoryType.values()) {
                    for (IItem item : c.getPlayer().getInventory(type)) {
                        eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), type);
                    }
                }
            } else if (splitted[1].equals("장착")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIPPED)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.EQUIPPED);
                }
            } else if (splitted[1].equals("장비")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIP)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.EQUIP);
                }
            } else if (splitted[1].equals("소비")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.USE)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.USE);
                }
            } else if (splitted[1].equals("설치")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.SETUP)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.SETUP);
                }
            } else if (splitted[1].equals("기타")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.ETC)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.ETC);
                }
            } else if (splitted[1].equals("캐시")) {
                for (IItem item : c.getPlayer().getInventory(MapleInventoryType.CASH)) {
                    eqs.put(new Pair<Short, Short>(item.getPosition(), item.getQuantity()), MapleInventoryType.CASH);
                }
            } else {
                c.getPlayer().dropMessage(6, "[모두/장착/장비/소비/설치/기타/캐시]");
            }
            for (Entry<Pair<Short, Short>, MapleInventoryType> eq : eqs.entrySet()) {
                InventoryManipulator.removeFromSlot(c, eq.getValue(), eq.getKey().left, eq.getKey().right, false, false);
            }
        } else if (splitted[0].equals("!몬스터버프")) {
            c.getPlayer().giveDebuff(DiseaseStats.ZOMBIFY, MobSkillFactory.getMobSkill(133, 1));
            c.getPlayer().dropMessage(1, "Monster Buff");
        } else if (splitted[0].equals("!스킬")) {
            ISkill skill = SkillFactory.getSkill(Integer.parseInt(splitted[1]));
            byte level = (byte) getOptionalIntArg(splitted, 2, 1);
            byte masterlevel = (byte) getOptionalIntArg(splitted, 3, 1);

            if (level > skill.getMaxLevel()) {
                level = skill.getMaxLevel();
            }
            c.getPlayer().changeSkillLevel(skill, level, masterlevel);
        } else if (splitted[0].equals("!맥스스킬")) {
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
        } else if (splitted[0].equals("!스킬포인트")) {
            c.getPlayer().setRemainingSp(getOptionalIntArg(splitted, 1, 1));
            c.getPlayer().updateSingleStat(PlayerStat.AVAILABLESP, c.getPlayer().getRemainingSp());
        } else if (splitted[0].equals("!스킬포인트2")) {
            c.getPlayer().setRemainingSp(getOptionalIntArg(splitted, 2, 1), getOptionalIntArg(splitted, 1, 1) - 1);
            c.getPlayer().updateSingleStat(PlayerStat.AVAILABLESP, c.getPlayer().getRemainingSp());
        } else if (splitted[0].equals("!스탯포인트")) {
            c.getPlayer().setRemainingAp(Integer.parseInt(splitted[1]));
            c.getPlayer().updateSingleStat(PlayerStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
        } else if (splitted[0].equals("!직업")) {
            c.getPlayer().changeJob(Integer.parseInt(splitted[1]));
        } else if (splitted[0].equals("!얼리기")) {
            for (ChannelServer ch : ChannelServer.getAllInstances()) {
                if (ch.얼리기() == false) {
                    ch.얼리기(true);
                    byte[] packet = MainPacketCreator.serverNotice(1, "채팅금지가 시작되었습니다.\r\n모든채팅이 불가능합니다.");
                    ChannelServer.getInstance(ch.getChannel()).broadcastPacket(packet);
                }
            }
        } else if (splitted[0].equals("!녹이기")) {
            for (ChannelServer ch : ChannelServer.getAllInstances()) {
                if (ch.얼리기() == true) {
                    ch.얼리기(false);
                    byte[] packet = MainPacketCreator.serverNotice(1, "채팅금지가 종료 되었습니다.");
                    ChannelServer.getInstance(ch.getChannel()).broadcastPacket(packet);
                }
            }
        } else if (splitted[0].equals("!채팅금지")) {
            for (ChannelServer ch : ChannelServer.getAllInstances()) {
                if (ch.얼리기() == false) {
                    ch.얼리기(true);
                    byte[] packet = MainPacketCreator.serverNotice(1, "채팅금지가 시작되었습니다.\r\n모든채팅이 불가능합니다.");
                    ChannelServer.getInstance(ch.getChannel()).broadcastPacket(packet);
                } else if (ch.얼리기() == true) {
                    ch.얼리기(false);
                    byte[] packet = MainPacketCreator.serverNotice(1, "채팅금지가 종료 되었습니다.");
                    ChannelServer.getInstance(ch.getChannel()).broadcastPacket(packet);
                }
            }
        } else if (splitted[0].equals("!현재맵")) {
            c.getPlayer().dropMessage(5, "현재 " + c.getPlayer().getMap().getId() + " 맵에 있습니다.");
        } else if (splitted[0].equals("!미스틱오픈")) {
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오픈 - 입장가능 -");
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오픈 - 입장가능 -");
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오픈 - 입장가능 -");
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오픈 - 입장가능 -");
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오픈 - 입장가능 -");
        } else if (splitted[0].equals("!미스틱오프")) {
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오프 - 입장불가 -");
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오프 - 입장불가 -");
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오프 - 입장불가 -");
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오프 - 입장불가 -");
            c.getPlayer().Message(7, "[ 알림 ] 미스틱필드 오프 - 입장불가 -");

        } else if (splitted[0].equals("!상점")) {
            MapleShopFactory shop = MapleShopFactory.getInstance();
            int shopId = Integer.parseInt(splitted[1]);
            if (shop.getShop(shopId) != null) {
                shop.getShop(shopId).sendShop(c);
            }

        } else if (splitted[0].equals("!메소")) {
            c.getPlayer().gainMeso((long) (9999999999L - c.getPlayer().getMeso()), true);

        } else if (splitted[0].equals("!레벨업")) {
            if (c.getPlayer().getLevel() < 200) {
                c.getPlayer().gainExp(500000000, false, false, true);
            }
        } else if (splitted[0].equals("!아이템투")) {
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            if (c.getPlayer().getGMLevel() < 6) {
                for (int i : GameConstants.itemBlock) {
                    if (itemId == i) {
                        c.getPlayer().dropMessage(5, "해당 아이템은 당신의 GM 레벨로는 생성 하실수 없습니다.");
                    }
                }
            }
            ItemInformation ii = ItemInformation.getInstance();
            if (GameConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "펫은 캐시샵을 이용해주시기 바랍니다.");
            } else if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " 번 아이템은 존재하지 않습니다.");
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

        } else if (splitted[0].equals("!아이템")) {
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            /*if (itemId == 2100106 | itemId == 2100107 | itemId == 1002140 | itemId == 1003142 | itemId == 1042003 | itemId == 1062007 | itemId == 1322013) {
                c.getPlayer().dropMessage(5, "" + itemId + " 아이템은 생성 할 수 없습니다. by 세이버");
                return;
            }
             */
            if (c.getPlayer().getGMLevel() < 6) {
                for (int i : GameConstants.itemBlock) {
                    if (itemId == i) {
                        c.getPlayer().dropMessage(5, "해당 아이템은 당신의 GM 레벨로는 생성 하실수 없습니다.");
                    }
                }
            }
            ItemInformation ii = ItemInformation.getInstance();
            if (GameConstants.isPet(itemId)) {
                c.getPlayer().BuyPET(itemId);
                c.getPlayer().Message("[" + ii.getName(itemId) + "] 펫을 만들엇습니다.");
            } else if (!ii.itemExists(itemId)) {
                c.getPlayer().dropMessage(5, itemId + " 번 아이템은 존재하지 않습니다.");
            } else {
                IItem item;
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    item = ii.randomizeStats((Equip) ii.getEquipById(itemId), true);
                } else {
                    item = new Item(itemId, (byte) 0, (short) quantity, (byte) 0);
                }
                item.setOwner(c.getPlayer().getName());
                item.setGMLog(CurrentTime.getAllCurrentTime() + "에 " + c.getPlayer().getName() + "의 명령어로 얻은 아이템.");
                InventoryManipulator.addbyItem(c, item);
            }
        } else if (splitted[0].equals("!드롭")) {
            final int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) (short) getOptionalIntArg(splitted, 2, 1);
            if (GameConstants.isPet(itemId)) {
                c.getPlayer().dropMessage(5, "펫은 캐시샵에서 구매해 주세요.");
            } else {
                IItem toDrop;
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    ItemInformation ii = ItemInformation.getInstance();
                    toDrop = ii.randomizeStats((Equip) ii.getEquipById(itemId), true);
                } else {
                    toDrop = new Item(itemId, (byte) 0, (short) quantity, (byte) 0);
                }
                toDrop.setGMLog(c.getPlayer().getName() + "이 드롭 명령어로 제작한 아이템");

                c.getPlayer().getMap().spawnItemDrop(c.getPlayer(), c.getPlayer(), toDrop, c.getPlayer().getPosition(), true, true);
            }
        } else if (splitted[0].equals("!레벨")) {
            c.getPlayer().setLevel(Short.parseShort(splitted[1]));
            c.getPlayer().levelUp();
            if (c.getPlayer().getExp() < 0) {
                c.getPlayer().gainExp(-c.getPlayer().getExp(), false, false, true);
            }

        } else if (splitted[0].equals("!온라인")) {
            c.getPlayer().dropMessage(6, "현재 채널에 접속된 유저는 다음과 같습니다. :");
            String names = "";
            for (String name : c.getChannelServer().getPlayerStorage().getAllCharacters().keySet()) {
                names += name;
                names += ", ";
            }
            if (names.equals("")) {
                names = "현재채널에 접속중인 유저가 없습니다.";
            }
            c.getPlayer().dropMessage(6, names);

        } else if (splitted[0].equals("!총온라인")) {
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {

                String names = "채널 " + (cserv.getChannel() == 0 ? 1 : cserv.getChannel() == 1 ? "20세이상" : cserv.getChannel() == ServerConstants.serverCount - 1 ? cserv.getChannel() + " (관리테스트채널)" : cserv.getChannel()) + " (" + cserv.getPlayerStorage().getAllCharacters().size() + " 명) : ";
                for (String name : cserv.getPlayerStorage().getAllCharacters().keySet()) {
                    names += name + ", ";
                }
                c.getPlayer().dropMessage(6, names);
            }
        } else if (splitted[0].equals("!모두저장")) {
            c.getPlayer().dropMessage(6, "저장을 시작합니다.");
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                cserv.saveAllMerchant();
                for (MapleCharacter hp : cserv.getPlayerStorage().getAllCharacters().values()) {
                    if (hp != null) {
                        hp.saveToDB(false, false);
                    }
                }
            }
            MedalRanking.getInstance().save();
            c.getPlayer().dropMessage(6, "저장이 완료되었습니다.");
        } else if (splitted[0].equals("!말")) {
            if (splitted.length > 2) {
                StringBuilder sb = new StringBuilder();
                sb.append(StringUtil.joinStringFrom(splitted, 2));
                if (!c.getPlayer().hasGmLevel((byte) 5)) {
                    if (Integer.parseInt(splitted[1]) >= 12) {
                        c.getPlayer().dropMessage(6, "사용할 수 없는 색깔코드입니다. 사용가능코드 : 0~11");
                        return;
                    }
                }
                byte[] packet = MainPacketCreator.getGMText(Integer.parseInt(splitted[1]), sb.toString());
                WorldBroadcasting.broadcastMessage(packet);
            } else {
                c.getPlayer().dropMessage(6, "사용법: !말 <색깔코드> <할말>");
            }
        } else if (splitted[0].equals("!백")) {
            if (!c.getPlayer().isHidden()) {
                c.getPlayer().dropMessage(6, "하이드 모드에서만 백을 사용할 수 있습니다.");
            } else {
                for (final MapleMapObject mmo : c.getPlayer().getMap().getAllMonster()) {
                    final MapleMonster monster = (MapleMonster) mmo;
                  //  c.getPlayer().getMap().broadcastMessage(MobPacket.moveMonster(false, -1, 0, 0, 0, 0, monster.getObjectId(), monster.getPosition(), c.getPlayer().getLastRes()));
                    monster.setPosition(c.getPlayer().getPosition());
                }
            }
        } else if (splitted[0].equals("!노래")) {
            c.getPlayer().getMap().broadcastMessage(MainPacketCreator.musicChange(splitted[1]));
        } else if (splitted[0].equals("!맥스스탯")) {
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
        } else if (splitted[0].equals("!스탯초기화")) {
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
        } else if (splitted[0].equals("!스킬마스터")) {
            MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr(splitted[1], '0', 3) + ".img");
            byte maxLevel = 0;
            for (MapleData skill : data) {
                if (skill != null) {
                    for (MapleData skillId : skill.getChildren()) {
                        if (!skillId.getName().equals("icon")) {
                            maxLevel = (byte) MapleDataTool.getIntConvert("maxLevel", skillId.getChildByPath("common"), 0);
                            if (MapleDataTool.getIntConvert("invisible", skillId, 0) == 0) { //스킬창에 안보이는 스킬은 올리지않음
                                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(Integer.parseInt(skillId.getName())), maxLevel, SkillFactory.getSkill(Integer.parseInt(skillId.getName())).isFourthJob() ? maxLevel : 0);
                            }
                        }
                    }
                }
            }
            c.send(MainPacketCreator.getGMText(6, "해당 직업의 스킬을 모두 최대레벨로 올렸습니다."));
        } else if (splitted[0].equals("!스킬초기화")) {
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
        } else if (splitted[0].equals("!캐쉬")) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "메소가 필요합니다.");
                return;
            }
            c.getPlayer().modifyCSPoints(1, Integer.parseInt(splitted[1]), true);
        } else if (splitted[0].equals("!메이플포인트")) {
            if (splitted.length < 2) {
                c.getPlayer().dropMessage(5, "메소가 필요합니다.");
                return;
            }
            c.getPlayer().modifyCSPoints(2, Integer.parseInt(splitted[1]), true);
        } else if (splitted[0].equals("!하이드")) {
            boolean hided = c.getPlayer().isHidden();
            if (hided == true) {
                c.getPlayer().message(6, "하이드 상태가 해제되었습니다.");
            } else {
                c.getPlayer().message(6, "하이드 상태가 적용되었습니다.");
            }
            c.getPlayer().setHide(!hided);
         } else if (splitted[0].equals("!핫타임")) {
            int itemId = Integer.parseInt(splitted[1]);
            final short quantity = (short) getOptionalIntArg(splitted, 2, 1);
            ItemInformation ii = ItemInformation.getInstance();
            short a = (short) Integer.parseInt(splitted[2]);
            for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                for (MapleCharacter hp : cserv.getPlayerStorage().getAllCharacters().values()) {
                    c.getSession().write(MainPacketCreator.getNPCTalk(9000108, (byte) 0, "" + c.getPlayer().getName() + " 님 준 선물은 잘 받았지? 바로 인벤토리를 확인해봐", "00 00", (byte) 0));
                    hp.gainItem(itemId, a);
                }
            }
            // 잠시 소스 바꿔보겟음
        } else if (splitted[0].equals("!전체말")) {
            if (splitted.length > 1) {
                StringBuilder text = new StringBuilder();
                text.append(StringUtil.joinStringFrom(splitted, 1));//?
                WorldBroadcasting.broadcastMessage(UIPacket.showInfo("[공지] : " + text + ""));
            }
        } else if (splitted[0].equals("!후원")) {
            MapleCharacter who = c.getChannelServer().getPlayerStorage().getCharacterByName(splitted[1]);
            final int rc = Integer.parseInt(splitted[2]);
            if (who != null) {
                who.gainRC(rc);
                who.dropMessage(6, "운영자 " + c.getPlayer().getName() + " 님으로부터 " + rc + "후원포인트를 지급받았습니다.");
                c.getPlayer().dropMessage(6, "" + splitted[1] + "에게 " + rc + "후원포인트를 지급했습니다.");
                try {
                    FileWriter fw = new FileWriter(new File("후원 로그.txt"), true);
                    fw.write("명령어 사용자 : " + c.getPlayer().getName() + " | 후원자 : " + splitted[1] + " | 금액 : " + splitted[2] + " | 시일 : " + FileoutputUtil.CurrentReadable_Time() + "\r\n");
                    fw.close();
                } catch (IOException ioe) {
                    if (!ServerConstants.realese) {
                        ioe.printStackTrace();
                    }
                }
            } else {
                c.getPlayer().dropMessage(6, "대상 플레이어를 발견하지 못했습니다.");
            }
        } else if (splitted[0].equals("!제로무기초기화")) {
            InventoryHandler.resetZeroWeapon(c.getPlayer());
        } else if (splitted[0].equals("!스로잉웨폰")) {
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
            new CommandDefinition("노래", "<재생할BGM>", "Sound.wz에서 해당 경로의 BGM을 재생합니다.", 1),
            new CommandDefinition("체력낮추기", "", "자신의 HP를 1, MP를 500으로 만듭니다.", 1),
            new CommandDefinition("힐", "", "자신의 HP와 MP를 서버에서 계산된 최대 HP,MP만큼 채웁니다.", 1),
            new CommandDefinition("스킬", "<스킬id> <스킬레벨> <스킬마스터레벨>", "해당 스킬id의 스킬레벨과 마스터레벨만큼 스킬을 올립니다.", 4),
            new CommandDefinition("맥스스킬", "", "모든 스킬을 마스터 합니다. 단, 재접속시 튕길 우려가 있습니다.", 6),
            new CommandDefinition("맥스스탯", "", "모든 스탯을 최대로 만듭니다.", 5),
            new CommandDefinition("스탯초기화", "", "모든 스탯을 초기화 합니다.", 5),
            new CommandDefinition("스킬포인트", "<스킬포인트량>", "기본 스킬포인트를 입력한 스킬포인트 양으로 만듭니다.", 4),
            new CommandDefinition("스킬포인트2", "<확장스킬포인트 인덱스> <스킬포인트량>", "해당 스킬포인트창의 스킬포인트를 입력한 양으로 만듭니다.", 4),
            new CommandDefinition("스탯포인트", "<스탯포인트량>", "스탯 포인트를 늘립니다.", 1),
            new CommandDefinition("직업", "<직업id>", "해당하는 직업 id로 전직합니다. id를 잘못 입력할 시 게임접속이 불가능해질 수 있습니다.", 5),
            new CommandDefinition("현재맵", "", "현재 맵 고유넘버를 출력합니다.", 3),
            new CommandDefinition("미스틱오픈", "", "미스틱필드 오픈을 알려줌", 3),
            new CommandDefinition("미스틱오프", "", "미스틱필드 오프를 알려줌", 3),
            new CommandDefinition("모두저장", "", "현재 접속중인 모든 플레이어를 저장합니다.", 5),
            new CommandDefinition("상점", "<상점ID>", "해당 상점 ID를 가진 상점을 엽니다.", 5),
            new CommandDefinition("메소", "", Long.MAX_VALUE + "메소를 가지게 만듭니다.", 6), // Meso are untraceable, which may fk up the economy if the GM tries to screw us.
            new CommandDefinition("레벨업", "", "레벨업이 바로 가능한 만큼의 경험치를 획득합니다.", 4),
            new CommandDefinition("얼리기", "", "채팅금지를 시작합니다.", 9),
            new CommandDefinition("녹이기", "", "채팅금지를 종료합니다.", 9),
            new CommandDefinition("채팅금지", "", "채팅금지를 종료합니다.", 9),
            //     new CommandDefinition("아이템투", "<아이템ID> (<아이템갯수> 기본값:1)", "해당 아이템을 아이템 갯수만큼 가집니다.", 2),
            new CommandDefinition("아이템", "<아이템ID> (<아이템갯수> 기본값:1)", "해당 아이템을 아이템 갯수만큼 가집니다.", 2),
            new CommandDefinition("코어", "<코어 아이템 ID>", "코어 아이템을 지급합니다.", 2),
            new CommandDefinition("드롭", "<아이템ID> (<아이템갯수> 기본값:1)", "해당 아이템을 아이템 갯수만큼 드롭합니다.", 7),
            new CommandDefinition("레벨", "<레벨>", "입력한 레벨로 올리거나 내립니다.", 4),
            new CommandDefinition("온라인", "", "현재 채널에 접속중인 유저를 모두 출력합니다.", 1),
            new CommandDefinition("총온라인", "", "모든 채널에 접속중인 유저를 모두 출력합니다.", 1),
            new CommandDefinition("인벤초기화", "모두/장착/장비/소비/설치/기타/캐시", "해당 탭의 인벤토리를 모두 비워버립니다.", 1),
            new CommandDefinition("백", "", "현재 캐릭터의 위치로 몬스터를 자석처럼 붙여버립니다.", 5),
            new CommandDefinition("말", "<색깔코드> <메시지>", "전체 월드에 GM텍스트 패킷을 이용하여 메시지를 출력합니다.", 2),
            new CommandDefinition("하이드", "", "다른 플레이어에게 보이지 않게 숨어버립니다.", 2),
            new CommandDefinition("스킬마스터", "<직업코드>", "직업코드의 스킬을 모두 최대레벨로 올립니다.", 5),
            new CommandDefinition("스킬초기화", "", "직업코드의 스킬을 모두 최소레벨로 내립니다.", 5),
            new CommandDefinition("캐쉬", "<필요캐쉬량>", "필요한 캐쉬를 얻습니다.", 5),
            new CommandDefinition("후원", "", "후원 닉네임 금액", 10),
            new CommandDefinition("전체말", "할말", "노란색으로 알립니다.", 9),
            new CommandDefinition("핫타임", "", "핫타임이 시작됩니다.", 7),
            new CommandDefinition("제로무기초기화", "", "제로무기를 초기화합니다.", 10),
            new CommandDefinition("스로잉웨폰", "way", "제로 스로잉 웨폰을 시전합니다.", 10),
            new CommandDefinition("스페셜버프", "", "스페셜 버프를 시전합니다.", 10),
            new CommandDefinition("몬스터버프", "", "", 1),
            new CommandDefinition("온타임랜덤보너스", "", "", 1),
            new CommandDefinition("별이핫타임", "", "", 1),
            new CommandDefinition("별이핫타임2", "", "", 1),
            new CommandDefinition("메이플포인트", "<메이플포인트량>", "필요한 메이플포인트를 얻습니다.", 5)
        };
    }
}
