/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 배지훈 raccoonfox69@gmail.com
 * ==================================
 * 
 */
package client.commands;

import client.MapleCharacter;
import client.PlayerStats;
import client.MapleClient;
import client.items.IEquip;
import client.items.IItem;
import client.items.MapleInventoryType;
import client.skills.SkillFactory;
import client.stats.DiseaseStats;
import client.stats.PlayerStat;
import constants.GameConstants;
import constants.ServerConstants;
import java.util.Map;
import java.util.function.Function;
import launch.ChannelServer;
import packet.creators.MainPacketCreator;
import packet.creators.UIPacket;
import provider.MapleData;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import scripting.NPCScriptManager;
import scripting.ReactorScriptManager;
import server.items.InventoryManipulator;
import server.life.MapleMonsterProvider;
import server.life.MobSkillFactory;
import server.maps.MapleMap;
import server.maps.MaplePortal;
import tools.ArrayMap;
import tools.Pair;
import tools.StringUtil;

public class PlayerCommand implements Command {

    @Override
    public void execute(final MapleClient c, String[] splitted) throws Exception, IllegalCommandSyntaxException {
        ChannelServer cserv = c.getChannelServer();

        if (splitted[0].equals("@힘")) {
            int str = Integer.parseInt(splitted[1]);
            final PlayerStats stat = c.getPlayer().getStat();

            if (stat.getStr() + str > c.getPlayer().getMaxStats() || c.getPlayer().getRemainingAp() < str || c.getPlayer().getRemainingAp() < 0 || str < 0) {
                c.getPlayer().dropMessage(5, "오류가 발생했습니다.");
            } else {
                stat.setStr(stat.getStr() + str);
                c.getPlayer().setRemainingAp(c.getPlayer().getRemainingAp() - str);
                c.getPlayer().updateSingleStat(PlayerStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
                c.getPlayer().updateSingleStat(PlayerStat.STR, stat.getStr());
            }
        } else if (splitted[0].equals("@인트")) {
            int int_ = Integer.parseInt(splitted[1]);
            final PlayerStats stat = c.getPlayer().getStat();

            if (stat.getInt() + int_ > c.getPlayer().getMaxStats() || c.getPlayer().getRemainingAp() < int_ || c.getPlayer().getRemainingAp() < 0 || int_ < 0) {
                c.getPlayer().dropMessage(5, "오류가 발생했습니다.");
            } else {
                stat.setInt(stat.getInt() + int_);
                c.getPlayer().setRemainingAp(c.getPlayer().getRemainingAp() - int_);
                c.getPlayer().updateSingleStat(PlayerStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
                c.getPlayer().updateSingleStat(PlayerStat.INT, stat.getInt());
            }
        } else if (splitted[0].equals("@덱스")) {
            int dex = Integer.parseInt(splitted[1]);
            final PlayerStats stat = c.getPlayer().getStat();

            if (stat.getDex() + dex > c.getPlayer().getMaxStats() || c.getPlayer().getRemainingAp() < dex || c.getPlayer().getRemainingAp() < 0 || dex < 0) {
                c.getPlayer().dropMessage(5, "오류가 발생했습니다.");
            } else {
                stat.setDex(stat.getDex() + dex);
                c.getPlayer().setRemainingAp(c.getPlayer().getRemainingAp() - dex);
                c.getPlayer().updateSingleStat(PlayerStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
                c.getPlayer().updateSingleStat(PlayerStat.DEX, stat.getDex());
            }
        } else if (splitted[0].equals("@럭")) {
            int luk = Integer.parseInt(splitted[1]);
            final PlayerStats stat = c.getPlayer().getStat();

            if (stat.getLuk() + luk > c.getPlayer().getMaxStats() || c.getPlayer().getRemainingAp() < luk || c.getPlayer().getRemainingAp() < 0 || luk < 0) {
                c.getPlayer().dropMessage(5, "오류가 발생했습니다.");
            } else {
                stat.setLuk(stat.getLuk() + luk);
                c.getPlayer().setRemainingAp(c.getPlayer().getRemainingAp() - luk);
                c.getPlayer().updateSingleStat(PlayerStat.AVAILABLEAP, c.getPlayer().getRemainingAp());
                c.getPlayer().updateSingleStat(PlayerStat.LUK, stat.getLuk());
            }
        } else if (splitted[0].equals("@인벤초기화")) {
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
            for (Map.Entry<Pair<Short, Short>, MapleInventoryType> eq : eqs.entrySet()) {
                InventoryManipulator.removeFromSlot(c, eq.getValue(), eq.getKey().left, eq.getKey().right, false, false);
            }
        } else if (splitted[0].equals("@랙") || splitted[0].equals("@렉") || splitted[0].equals("@?")) {
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(MainPacketCreator.resetActions());
            c.getPlayer().dropMessage(1, "엔피시 렉이 제거되었습니다.");
        } else if (splitted[0].equals("@광장") || splitted[0].equals("@헤네시스") || splitted[0].equals("@마을")) {
            int jobid = c.getPlayer().getJob();
            if (jobid == 0 || jobid == 1000 || jobid == 2000 || jobid == 2001 || jobid == 2002 || jobid == 2003 || jobid == 2004
                    || jobid == 3000 || jobid == 3001 || jobid == 5000 || jobid == 6000 || jobid == 6001 || (jobid == 10112 && c.getPlayer().getMapId() == ServerConstants.startMap)) {
                c.getPlayer().dropMessage(5, "[시스템] 초보자는 광장으로 이동 할 수 없습니다.");
                return;
            }
            if (c.getPlayer().getMapId() == 910340500 || c.getPlayer().getMapId() == 240050200 || c.getPlayer().getMapId() == 272000600 || c.getPlayer().getMapId() == 921160400) {
                c.getPlayer().dropMessage(5, "[시스템] 보스레이드 도중에는 이동 할 수 없습니다.");
                return;
            }
            MapleMap target = c.getChannelServer().getMapFactory().getMap(ServerConstants.mainMap); // 치우씨 :: 광장 따로 설정
            MaplePortal targetPortal = null;
            if (splitted.length > 1) {
                try {
                    targetPortal = target.getPortal(Integer.parseInt(splitted[1]));
                } catch (IndexOutOfBoundsException e) {
                    c.getPlayer().dropMessage(5, "없는 포탈의 값이 있습니다.");
                }
            }
            if (targetPortal == null) {
                targetPortal = target.getPortal(0);
            }
            c.getPlayer().changeMap(target, targetPortal);
        } else if (splitted[0].equals("@자유시장")) {
            int jobid = c.getPlayer().getJob();
            if (jobid == 0 || jobid == 1000 || jobid == 2000 || jobid == 2001 || jobid == 2002 || jobid == 2003 || jobid == 2004
                    || jobid == 3000 || jobid == 3001 || jobid == 5000 || jobid == 6000 || jobid == 6001) {
                c.getPlayer().dropMessage(5, "초보자는 자유시장으로 이동 할 수 없습니다.");
                return;
            }
            MapleMap target = c.getChannelServer().getMapFactory().getMap(910000000);
            MaplePortal targetPortal = null;
            if (splitted.length > 1) {
                try {
                    targetPortal = target.getPortal(Integer.parseInt(splitted[1]));
                } catch (IndexOutOfBoundsException e) {
                    // noop, assume the gm didn't know how many portals there are
                    c.getPlayer().dropMessage(5, "없는 포탈의 값이 있습니다.");
                } catch (NumberFormatException a) {
                    // noop, assume that the gm is drunk
                }
            }
            if (targetPortal == null) {
                targetPortal = target.getPortal(0);
            }
            c.getPlayer().changeMap(target, targetPortal);
        } else if (splitted[0].equals("@도움말") || splitted[0].equals("@명령어")) {
            c.getPlayer().dropMessage(5, "사용가능한 명령어는 다음과 같습니다.:");
            c.getPlayer().dropMessage(5, "명령어로 인한 불이익에 관리자는 책임이 없음을 명시합니다. :");
            c.getPlayer().dropMessage(5, "@저장 : 종료전에 꼭 쳐야하는 명령어입니다. 명령어를 치지않고 발생하는 모든 오류에 대한 관리자의 책임은 없습니다.");
            c.getPlayer().dropMessage(5, "@힘, @덱스, @인트, @럭 <찍을 수치> : 해당 스탯을 마우스 클릭 대신 찍을 수 있습니다.");
            c.getPlayer().dropMessage(5, "@초자 : 초자 엔피시 등장.(처음오시는 유저분들 필수 사항)");
            c.getPlayer().dropMessage(5, "@렉 : 공격 등 채팅외에 아무것도 안될때 사용하세요.");
            c.getPlayer().dropMessage(5, "@광장 : " + ServerConstants.serverName + " 광장으로 이동합니다.");
            c.getPlayer().dropMessage(5, "@인벤초기화 : 인벤초기화 탭 모두/장착/장비/소비/설치/기타/캐시");
            c.getPlayer().dropMessage(5, "@스킬마스터 : 현재 자신의 직업 스킬을 마스터합니다.");
            c.getPlayer().dropMessage(5, "@로그인포인트 : 로그인포인트 상점을 호출합니다.");
            c.getPlayer().dropMessage(5, "@초자 : 초자 엔피시 등장.(처음오시는 유저분들 필수 사항)");
            c.getPlayer().dropMessage(5, "@동접 : 현재 메이플온라인의 동접수를 확인할 수 있습니다.");
            c.getPlayer().dropMessage(5, "@환생 : 사냥중에 환생을 빨리 할 수 있도록 만든 시스템. 환생 엔피시가 나온다.");
            c.getPlayer().dropMessage(5, "@추천인 : 추천인 엔피시가 나온다. 블로그나 유튜브등 홍보 경로를 따라 왔다면 추천인 등록은 필수이다.");
            c.getPlayer().dropMessage(5, "~할말 : 전체채팅");

        } else if (splitted[0].equals("@저장")) {
            c.getPlayer().saveToDB(false, false);
            c.getPlayer().dropMessage(5, "저장이 완료되었습니다.");
        } else if (splitted[0].equals("@추천인")) {
            NPCScriptManager.getInstance().dispose(c);
            NPCScriptManager.getInstance().start(c, 9010031);
        } else if (splitted[0].equals("@초자")) {
            NPCScriptManager.getInstance().dispose(c);
            NPCScriptManager.getInstance().start(c, 9001040);
        } else if (splitted[0].equals("@동접")) {
            c.getPlayer().Message(11, "현재 메이플 서버의 동접수는 : " + ChannelServer.getOnlineConnections() + "명 입니다.");
        } else if (splitted[0].equals("@보조무기해제")) {
            IEquip equip = null;
            equip = (IEquip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -10);
            if (equip == null) {
                c.getPlayer().Message(1, "장착중인 보조무기가 존재하지 않습니다.");
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                return;
            }
            c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).removeSlot((byte) -10);
            c.getPlayer().equipChanged();
            InventoryManipulator.addFromDrop(c, equip, false);
            c.getPlayer().getStat().recalcLocalStats(c.getPlayer());
            c.getPlayer().send(MainPacketCreator.getPlayerInfo(c.getPlayer()));
            MapleMap currentMap = c.getPlayer().getMap();
            currentMap.removePlayer(c.getPlayer());
            currentMap.addPlayer(c.getPlayer());
        } else if (splitted[0].equals("@랙") || splitted[0].equals("@렉") || splitted[0].equals("@?")) {
            NPCScriptManager.getInstance().dispose(c);
            c.getSession().write(MainPacketCreator.resetActions());
            c.getPlayer().dropMessage(1, "엔피시 렉이 제거되었습니다.");
        } else if (splitted[0].equals("@경매장")) {
            NPCScriptManager.getInstance().start(c, 9030300);
            c.getPlayer().ea();
        } else if (splitted[0].equals("@환생")) {
            NPCScriptManager.getInstance().start(c, 2491006);
            c.getPlayer().ea();
        } else if (splitted[0].equals("@스텟리로드") || splitted[0].equals("@스탯리로드")) {
            c.getPlayer().getStat().recalcLocalStats(c.getPlayer());
            c.getPlayer().dropMessage(5, "[알림] 스텟리로드를 완료 하였습니다.");
            c.getPlayer().giveDebuff(DiseaseStats.ZOMBIFY, MobSkillFactory.getMobSkill(133, 1));
        } else if (splitted[0].equals("@스킬마스터")) {
            if (GameConstants.isZero(c.getPlayer().getJob())) { // 치우씨 :: 제로 @스킬마스터
                c.getPlayer().maxskill(10100);
                c.getPlayer().maxskill(10110);
                c.getPlayer().maxskill(10111);
                c.getPlayer().maxskill(10112);
                c.getPlayer().Message(5, "스킬마스터가 완료되었습니다.");
                return;
            }
            for (int i = 0; i < (c.getPlayer().getJob() % 10) + 1; i++) {
                c.getPlayer().maxskill(((i + 1) == ((c.getPlayer().getJob() % 10) + 1)) ? c.getPlayer().getJob() - (c.getPlayer().getJob() % 100) : c.getPlayer().getJob() - (i + 1));
            }
            c.getPlayer().maxskill(c.getPlayer().getJob());
            c.getPlayer().Message(5, "스킬마스터가 완료되었습니다.");
        } else if (splitted[0].equals("@가이드")) {
            String[][] list = {{"안녕하세요 #r메이플온라인#k을 안내해줄 운영자 입니다.", "1500"},
            {"#r메이플온라인#k의 만능상점은 \r\n#bPANG TRADE#k버튼을 이용하거나 광장에 있는 껨디 에게서 이용 할 수 있습니다.", "4000"},
            {"#r메이플온라인#k은 스킬마스터 시스템을 사용중이며 #b@스킬마스터#k\r\n명령어로 사용 가능합니다.", "4000"},
            {"#k많은 홍보와 플레이 부탁드립니다. 감사합니다.", "4000"},};
            for (String[] txt : list) {
                c.getSession().writeAndFlush(MainPacketCreator.OnAddPopupSay(9062000, Integer.parseInt(txt[1]), txt[0], ""));
            }
        } else if (splitted[0].equals("@로그인포인트")) {
            NPCScriptManager.getInstance().start(c, 9062000, "lpShop");
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            /* 치우씨 :: English Translated GM Command Starts here */
        } else if (splitted[0].equals("@skillmaster")) {
            if (GameConstants.isZero(c.getPlayer().getJob())) { // 치우씨 :: 제로 @스킬마스터
                c.getPlayer().maxskill(10100);
                c.getPlayer().maxskill(10110);
                c.getPlayer().maxskill(10111);
                c.getPlayer().maxskill(10112);
                c.getPlayer().Message(5, "Skill Master Completed.");
                return;
            }
            for (int i = 0; i < (c.getPlayer().getJob() % 10) + 1; i++) {
                c.getPlayer().maxskill(((i + 1) == ((c.getPlayer().getJob() % 10) + 1)) ? c.getPlayer().getJob() - (c.getPlayer().getJob() % 100) : c.getPlayer().getJob() - (i + 1));
            }
            c.getPlayer().maxskill(c.getPlayer().getJob());
            c.getPlayer().Message(5, "Skill Master Completed.");
        } else if (splitted[0].equals("@return")) {
            int jobid = c.getPlayer().getJob();
            if (jobid == 0 || jobid == 1000 || jobid == 2000 || jobid == 2001 || jobid == 2002 || jobid == 2003 || jobid == 2004
                    || jobid == 3000 || jobid == 3001 || jobid == 5000 || jobid == 6000 || jobid == 6001 || (jobid == 10112 && c.getPlayer().getMapId() == ServerConstants.startMap)) {
                c.getPlayer().dropMessage(5, "[Argon] Beginner cannot return to town map.");
                return;
            }
            if (c.getPlayer().getMapId() == 910340500 || c.getPlayer().getMapId() == 240050200 || c.getPlayer().getMapId() == 272000600 || c.getPlayer().getMapId() == 921160400) {
                c.getPlayer().dropMessage(5, "[Argon] Cannot return right now.");
                return;
            }
            MapleMap target = c.getChannelServer().getMapFactory().getMap(ServerConstants.mainMap); // 치우씨 :: 광장 따로 설정
            MaplePortal targetPortal = null;
            if (splitted.length > 1) {
                try {
                    targetPortal = target.getPortal(Integer.parseInt(splitted[1]));
                } catch (IndexOutOfBoundsException e) {
                    c.getPlayer().dropMessage(5, "Portal Value doesn't exist.");
                }
            }
            if (targetPortal == null) {
                targetPortal = target.getPortal(0);
            }
            c.getPlayer().changeMap(target, targetPortal);
        }

    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("힘", "<올릴양>", "해당 스탯을 마우스 클릭 대신 찍을 수 있습니다.", 0),
            new CommandDefinition("인트", "<올릴양>", "해당 스탯을 마우스 클릭 대신 찍을 수 있습니다.", 0),
            new CommandDefinition("덱스", "<올릴양>", "해당 스탯을 마우스 클릭 대신 찍을 수 있습니다.", 0),
            new CommandDefinition("럭", "<올릴양>", "해당 스탯을 마우스 클릭 대신 찍을 수 있습니다.", 0),
            new CommandDefinition("랙", "", "공격 등 채팅외에 아무것도 안될때 사용하세요.", 0),
            new CommandDefinition("렉", "", "공격 등 채팅외에 아무것도 안될때 사용하세요.", 0),
            new CommandDefinition("명령어", "", "유저 명령어를 출력합니다.", 0),
            new CommandDefinition("저장", "", "캐릭터를 강제로 저장합니다.", 0),
            new CommandDefinition("원정대재입장", "", "보스 레이드 중이던 원정대의 마지막 원정대재입장맵으로 이동합니다.", 0),
            new CommandDefinition("광장", "", "해당 서버의 광장인 헤네시스로 이동합니다.", 0),
            new CommandDefinition("헤네시스", "", "해당 서버의 광장인 헤네시스로 이동합니다.", 0),
            new CommandDefinition("자유시장", "", "자유시장으로 이동합니다.", 0),
            new CommandDefinition("인벤초기화", "모두/장착/장비/소비/설치/기타/캐시", "해당 탭의 인벤토리를 모두 비워버립니다.", 0),
            new CommandDefinition("도움말", "", "유저 명령어를 출력합니다.", 0),
            new CommandDefinition("마을", "", "마을이동", 0),
            new CommandDefinition("추천인", "", "추천인", 0),
            new CommandDefinition("초자", "", "초자", 0),
            new CommandDefinition("동접", "", "동접", 0),
            new CommandDefinition("전직", "", "전직", 0),
            new CommandDefinition("경매장", "", "경매장", 0),
            new CommandDefinition("환생", "", "환생", 0),
            new CommandDefinition("스텟리로드", "", "스텟리로드", 0),
            new CommandDefinition("보조무기해제", "", "보조무기해제", 0),
            new CommandDefinition("스킬마스터", "", "", 0),
            new CommandDefinition("가이드", "", "", 0),
            new CommandDefinition("로그인포인트", "", "", 0),
            new CommandDefinition("죽기", "", "", 0),
            new CommandDefinition("skillmaster", "", "", 0),
            new CommandDefinition("return", "", "return to town", 0)
        };
    }
}
