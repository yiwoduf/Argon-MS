/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package scripting;

import constants.GameConstants;
import constants.programs.HighRanking;
import constants.programs.HighRanking.RankingData;
import constants.programs.MedalRanking;
import constants.programs.MedalRanking.MedalRankHolder;
import client.MapleClient;
import client.MapleCharacter;
import client.MaplePet;
import client.MapleProfession;
import client.MapleProfessionType;
import client.items.*;
import client.skills.Skill;
import client.skills.InnerAbillity;
import client.skills.InnerSkillValueHolder;
import client.skills.SkillFactory;
import client.stats.DiseaseStats;
import client.stats.PlayerStat;
import community.*;
import constants.ServerConstants;
import constants.subclasses.HighRankingType;
import java.util.Timer;
import java.util.TimerTask;
import database.MYSQL;
import handler.channel.HiredMerchantHandler;
import handler.channel.InterServerHandler;
import static handler.channel.InventoryHandler.potential;
import handler.channel.Marriage;
import handler.duey.DueyHandler;
import java.awt.Point;
import launch.ChannelServer;
import launch.LoginServer;
import packet.creators.MainPacketCreator;
import server.items.InventoryManipulator;
import server.items.ItemInformation;
import server.maps.AramiaFireWorks;
import server.maps.MapleMap;
import server.quest.MapleQuest;
import server.shops.MapleShopFactory;
import tools.Pair;
import tools.RandomStream.Randomizer;
import tools.Timer.EtcTimer;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import javax.script.Invocable;
import launch.world.WorldBroadcasting;
import launch.world.WorldCommunity;
import launch.world.WorldConnected;
import packet.creators.PlayerShopPacket;
import packet.creators.UIPacket;
import packet.transfer.write.WritingPacket;
import provider.MapleData;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.items.MapleItemIdenfier;
import server.items.MapleRing;
import server.life.MapleLifeProvider;
import server.life.MapleMonster;
import server.life.MobSkillFactory;
import server.life.OverrideMonsterStats;
import server.maps.Event_DojoAgent;
import server.maps.MapleMapObject;
import server.maps.MaplePortal;
import server.maps.MapleReactor;
import server.maps.MapleReactorFactory;
import server.maps.MapleReactorStats;
import server.maps.PotSystem;
import server.named.Named;
import tools.HexTool;
import tools.StringUtil;
import tools.Timer.MapTimer;
import static launch.world.WorldCommunity.아르미;
import server.maps.MapleMapObjectType;

public class NPCConversationManager extends AbstractPlayerInteraction {

    private MapleClient c;
    private int npc, questid, MAX_REBORNS = 3;
    private String getText;
    private byte type; // -1 = NPC, 0 = start quest, 1 = end quest
    public boolean pendingDisposal = false;
    private Invocable iv;
    private String path;

    public NPCConversationManager(MapleClient c, int npc, int questid, byte type, Invocable iv) {
        super(c);
        this.c = c;
        this.npc = npc;
        this.questid = questid;
        this.type = type;
        this.iv = iv;
    }

    public Invocable getIv() {
        return iv;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }

    public String getServerName() {
        return ServerConstants.serverName;
    }

    public int getNpc() {
        return npc;
    }

    public int getReborns() {
        return getPlayer().getReborns();
    }

    public int getVPoints() {
        return getPlayer().getVPoints();
    }

    public void gainVPoints(int gainedpoints) {
        c.getPlayer().gainVPoints(gainedpoints);
    }

    public int getNX() {
        return getPlayer().getNX();
    }

    public int getQuest() {
        return questid;
    }

    public void sendNext(String text, int id) {
        if (text.contains("#L")) {
            sendSimple(text);
            return;
        }
        this.c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(id, (byte) 0, text, "00 01", (byte) 0));
    }

    public void sendMixHair(String text, int npcID) {
        npc = npcID;
        this.c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npcID, (byte) 40, text, "", (byte) 0));
    }

    public EquipWorthCalculator newEWC() {
        return EquipWorthCalculator.ewc();
    }

    public String getWeaponEquip() {
        StringBuilder string = new StringBuilder();
        for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIP).list()) {
            if (GameConstants.isWeapon(item.getItemId())) {
                string.append("#L" + item.getPosition() + "##i" + item.getItemId() + "##l\r\n");
            }
        }
        return string.toString();
    }

    public String getAllEquip() {
        StringBuilder string = new StringBuilder();
        for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIP).list()) {
            string.append("#L" + item.getPosition() + "##i" + item.getItemId() + "##l\r\n");
        }
        return string.toString();
    }

    public String getAllItem() {
        StringBuilder string = new StringBuilder();
        for (IItem item : c.getPlayer().getInventory(MapleInventoryType.EQUIP).list()) {
            string.append("#L" + item.getUniqueId() + "##i " + item.getItemId() + "#\r\n");
        }
        return string.toString();
    }

    public Equip getEquip(byte slot) {
        return (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
    }

    public void giveBuff(int skill, int level) {
        SkillFactory.getSkill(skill).getEffect(level).applyTo(c.getPlayer());
    }

    public byte getType() {
        return type;
    }

    public void safeDispose() {
        pendingDisposal = true;
    }

    public void dispose() {
        NPCScriptManager.getInstance().dispose(c);
    }

    public void askMapSelection(final String sel) {
        c.getSession().writeAndFlush(MainPacketCreator.getMapSelection(npc, sel));
    }

    public void sendPlaces(String text) {
        getClient().getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0x10, text, "", (byte) 0));
    }

    public void sendNext(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", (byte) 0));
    }

    public void sendNextS(String text, byte type) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", type));
    }

    public void sendSimpleS(String text, byte type) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 5, text, "", (byte) type));
    }

    public void sendSimpleS(String text, byte type, int speaker) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 5, text, "", (byte) type, speaker));
    }

    public void sendNextS(String text, byte type, int speaker) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "00 01", type, speaker));
    }

    public void sendPrev(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", (byte) 0));
    }

    public void sendPrevS(String text, byte type) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", type));
    }

    public void sendPrevS(String text, byte type, int speaker) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "01 00", type, speaker));
    }

    public void sendNextPrev(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", (byte) 0));
    }

    public void sendNextPrevS(String text, byte type) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", type));
    }

    public void sendNextPrevS(String text, byte type, int speaker) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "01 01", type, speaker));
    }

    public void sendOk(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", (byte) 0));
    }

    public void sendSpirit(String text, boolean Simple, int npcid) {
        c.getSession().writeAndFlush(Simple ? MainPacketCreator.newgetNPCTalk(npc, text) : MainPacketCreator.NPCTalk(npcid != 0 ? npcid : npc, text));
    }

    public void sendOkS(String text, byte type) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", type));
    }

    public void sendOkS(String text, byte type, int speaker) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 0, text, "00 00", type, speaker));
    }

    public void sendYesNo(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 2, text, "", (byte) 0));
    }

    public void sendYesNoS(String text, byte type) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 2, text, "", type));
    }

    public void sendYesNoS(String text, byte type, int speaker) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 2, text, "", type, speaker));
    }

    public void askAcceptDecline(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 15, text, "", (byte) 0));
    }

    public void askAcceptDeclineNoESC(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 16, text, "", (byte) 0));
    }

    public void askAvatar(String text, int... args) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalkStyle(npc, text, true, false, args));
    }

    public void askAvatarZero(String text, int[] fargs, int[] sargs) {
        c.send(MainPacketCreator.getNPCTalkStyleZero(npc, text, fargs, sargs));
    }

    public void askCustomMixHairAndProb(String text) {
        c.send(MainPacketCreator.getNPCTalkMixStyle(npc, text, GameConstants.isAngelicBuster(c.getPlayer().getJob())));
    }

    public void askAvatarAndroid(String text, int... args) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalkStyle(npc, text, false, false, args));
    }

    public void sendSimple(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalk(npc, (byte) 5, text, "", (byte) 0));
    }

    public void sendGetNumber(String text, int def, int min, int max) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalkNum(npc, text, def, min, max));
    }

    public void sendGetText(String text) {
        c.getSession().writeAndFlush(MainPacketCreator.getNPCTalkText(npc, text));
    }

    public void setGetText(String text) {
        this.getText = text;
    }

    public String getText() {
        return getText;
    }

    public void reloadChar() {
        getPlayer().reloadChar();
    }

    public int setRandomAvatar(int ticket, int... args_all) {
        if (!haveItem(ticket)) {
            return -1;
        }
        gainItem(ticket, (short) -1);

        int args = args_all[Randomizer.nextInt(args_all.length)];
        if (args < 100) {
            c.getPlayer().setSkinColor((byte) args);
            c.getPlayer().updateSingleStat(PlayerStat.SKIN, args);
        } else if (args < 30000) {
            c.getPlayer().setFace(args);
            c.getPlayer().updateSingleStat(PlayerStat.FACE, args);
        } else {
            c.getPlayer().setHair(args);
            c.getPlayer().updateSingleStat(PlayerStat.HAIR, args);
        }
        c.getPlayer().equipChanged();
        return 1;
    }

    public int setAvatar(int ticket, int args, int args2) {
        if (args < 100 && args2 < 100) {
            c.getPlayer().setSkinColor((byte) args);
            c.getPlayer().setSecondSkinColor((byte) args2);
            c.getPlayer().updateSingleStat(PlayerStat.SKIN, args);
        } else if (args < 30000 && args2 < 30000) {
            c.getPlayer().setFace(args);
            c.getPlayer().setSecondFace(args2);
            c.getPlayer().updateSingleStat(PlayerStat.FACE, args);
        } else {
            c.getPlayer().setHair(args);
            c.getPlayer().setSecondHair(args2);
            c.getPlayer().updateSingleStat(PlayerStat.HAIR, args);
        }
        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.updateCharLook(c.getPlayer(), false));
        c.getPlayer().reloadChar();
        c.getPlayer().equipChanged();
        return 1;
    }

    public int setAvatar(int ticket, int args) {
        if (ticket != 0 && ticket != 4000000) {
            if (!haveItem(ticket)) {
                return -1;
            }
            gainItem(ticket, (short) -1);
        }
        if (args < 100) {
            c.getPlayer().setSkinColor((byte) args);
            c.getPlayer().updateSingleStat(PlayerStat.SKIN, args);
        } else if (args < 30000) {
            c.getPlayer().setFace(args);
            c.getPlayer().updateSingleStat(PlayerStat.FACE, args);
        } else {
            c.getPlayer().setHair(args);
            c.getPlayer().updateSingleStat(PlayerStat.HAIR, args);
        }
        c.getPlayer().equipChanged();
        return 1;
    }

    public void setSkin(byte skinColor) {
        c.getPlayer().setSkinColor(skinColor);
        c.getPlayer().updateSingleStat(PlayerStat.SKIN, skinColor);
        c.getPlayer().equipChanged();
    }

    public void setFace(int faceId) {
        c.getPlayer().setFace(faceId);
        c.getPlayer().updateSingleStat(PlayerStat.FACE, faceId);
        c.getPlayer().equipChanged();
    }

    public void setHair(int hairId) {
        c.getPlayer().setHair(hairId);
        c.getPlayer().updateSingleStat(PlayerStat.HAIR, hairId);
        c.getPlayer().equipChanged();
    }

    public void setFaceAndroid(int faceId) {
        c.getPlayer().getAndroid().setFace(faceId);
        c.getPlayer().updateAndroid();
    }

    public void setHairAndroid(int hairId) {
        c.getPlayer().getAndroid().setHair(hairId);
        c.getPlayer().updateAndroid();
    }

    public void setSkinColorAndroid(int skinId) {
        c.getPlayer().getAndroid().setSkinColor(skinId);
        c.getPlayer().updateAndroid();
    }

    public int getAndroidGender() {
        int itemid = c.getPlayer().getAndroid().getItemId();
        return ItemInformation.getInstance().getAndroidBasicSettings(ItemInformation.getInstance().getAndroid(itemid)).getGender();
    }

    public void sendStorage() {
       /* if (getPlayer().getLevel() < 120) { // 치우씨 :: 창고 레벨 제한
            getPlayer().dropMessage(1, "120레벨 이상부터 창고이용이 가능합니다.");
            return;
        }*/
        c.getPlayer().setConversation(4);
        c.getPlayer().getStorage().send2ndPWChecking(c, npc, false);
    }

    public void sendCompose() { //Celphis
        try {
            c.getPlayer().setConversation(4);
            c.getPlayer().getStorage().send2ndPWChecking(c, npc, true);
            c.getPlayer().dropMessage(1, "첫번째 장비템을 첫번째 슬롯으로 옮겨주세요");
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public void openShop(int id) {
        MapleShopFactory.getInstance().getShop(id).sendShop(c);
    }

    public void changeJob(int job) {
        c.getPlayer().changeJob(job);
    }

    public void startQuest(int id) {
        MapleQuest.getInstance(id).start(getPlayer(), npc);
    }

    public void completeQuest(int id) {
        MapleQuest.getInstance(id).complete(getPlayer(), npc);
    }

    public void forfeitQuest(int id) {
        MapleQuest.getInstance(id).forfeit(getPlayer());
    }

    public void forceStartQuest() {
        MapleQuest.getInstance(questid).forceStart(getPlayer(), getNpc(), null);
    }

    public void forceStartQuest(int id) {
        MapleQuest.getInstance(id).forceStart(getPlayer(), getNpc(), null);
    }

    public void forceStartQuest(String customData) {
        MapleQuest.getInstance(questid).forceStart(getPlayer(), getNpc(), customData);
    }

    public void forceCompleteQuest() {
        MapleQuest.getInstance(questid).forceComplete(getPlayer(), getNpc());
    }

    public String getQuestCustomData() {
        return c.getPlayer().getQuestNAdd(MapleQuest.getInstance(questid)).getCustomData();
    }

    public void setQuestCustomData(String customData) {
        getPlayer().getQuestNAdd(MapleQuest.getInstance(questid)).setCustomData(customData);
    }

    public String getQuestCustomData(int qid) {
        return c.getPlayer().getQuestNAdd(MapleQuest.getInstance(qid)).getCustomData();
    }

    public void setQuestCustomData(int qid, String customData) {
        getPlayer().getQuestNAdd(MapleQuest.getInstance(qid)).setCustomData(customData);
    }

    public long getMeso() {
        return getPlayer().getMeso();
    }

    public void gainAp(final int amount) {
        c.getPlayer().gainAp(amount);
    }

    public void setAp(final int amount) {
        c.getPlayer().setAp(amount);
    }

    public void ApReset() {
        c.getPlayer().updateSingleStat(PlayerStat.STR, 4);
        c.getPlayer().updateSingleStat(PlayerStat.DEX, 4);
        c.getPlayer().updateSingleStat(PlayerStat.INT, 4);
        c.getPlayer().updateSingleStat(PlayerStat.LUK, 4);
    }

    public void gainSp(final int amount) {
        c.getPlayer().gainSP(amount);
    }

    public void gainMeso(int gain) {
        c.getPlayer().gainMeso(gain, false, false, true);
    }

    public void gainExp(int gain) {
        c.getPlayer().gainExp(gain, true, true, true);
    }

    public void getGMLevel() {
        c.getPlayer().getGMLevel();
    }

    public void expandInventory(byte type, int amt) {
        c.getPlayer().getInventory(MapleInventoryType.getByType(type)).addSlot((byte) 4);
        c.getPlayer().inventoryslot_changed = true;
    }

    public void unequipEverything() {
        MapleInventory equipped = getPlayer().getInventory(MapleInventoryType.EQUIPPED);
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        List<Short> ids = new LinkedList<Short>();
        for (IItem item : equipped.list()) {
            ids.add(item.getPosition());
        }
        for (short id : ids) {
            InventoryManipulator.unequip(getC(), id, equip.getNextFreeSlot());
        }
    }

    public final void clearSkills() {

    }

    public final boolean isCash(final int itemid) {
        return ItemInformation.getInstance().isCash(itemid);
    }

    public boolean hasSkill(int skillid) {
        Skill theSkill = SkillFactory.getSkill(skillid);
        if (theSkill != null) {
            return c.getPlayer().getSkillLevel(theSkill) > 0;
        }
        return false;
    }

    public MapleCharacter getChar() {
        return getPlayer();
    }

    public MapleClient getC() {
        return c;
    }

    public void showEffect(boolean broadcast, String effect) {
        if (broadcast) {
            c.getPlayer().getMap().broadcastMessage(MainPacketCreator.showEffect(effect));
        } else {
            c.getSession().writeAndFlush(MainPacketCreator.showEffect(effect));
        }
    }

    public void playSound(boolean broadcast, String sound) {
        if (broadcast) {
            c.getPlayer().getMap().broadcastMessage(MainPacketCreator.playSound(sound));
        } else {
            c.getSession().writeAndFlush(MainPacketCreator.playSound(sound));
        }
    }

    public void environmentChange(boolean broadcast, String env) {
        if (broadcast) {
            c.getPlayer().getMap().broadcastMessage(MainPacketCreator.environmentChange(env, 2));
        } else {
            c.getSession().writeAndFlush(MainPacketCreator.environmentChange(env, 2));
        }
    }

    public void MapleStar(MapleCharacter chr) {
        int rank1 = 0;
        int rank2 = 0;
        int i = 0;
        boolean check = false;
        try {
            Connection con = MYSQL.getConnection();
            ResultSet sql = con.prepareStatement("SELECT * FROM characters WHERE gm = 0 ORDER BY fame DESC LIMIT 2").executeQuery();
            while (sql.next()) {
                i++;
                if (i == 1) {
                    rank1 = sql.getInt("id");
                    check = true;
                } else if (i == 2) {
                    rank2 = sql.getInt("id");
                }
            }
            sql.close();
            con.close();
        } catch (SQLException ex) {
            System.out.println("MapleStar 갱신중 오류발생 : " + ex);
        }
        if (check) {
            chr.send(UIPacket.getMapleStar((byte) 0x07, chr.getClient(), rank1, rank2));
        }
    }

    public void ChangeHeadTitle(byte i) {
        if (i == 0) {
            getPlayer().setKeyValue2("HeadTitle", Randomizer.isSuccess(50) ? +Randomizer.rand(10000, 90000) + Randomizer.rand(1000, 9000) : Randomizer.isSuccess(50) ? Randomizer.rand(1000, 9000) : 0 + Randomizer.rand(100, 900) + Randomizer.rand(10, 90) + Randomizer.rand(1, 9));
            List<Integer> num_ = new ArrayList<Integer>();
            int num = getPlayer().getKeyValue2("HaedTitle");
            int aa = num / 10000;
            int bb = num / 1000 - aa * 10;
            int cc = num / 100 - (aa * 100 + bb * 10);
            int dd = num / 10 - (aa * 1000 + bb * 100 + cc * 10);
            int ee = num / 1 - (aa * 10000 + bb * 1000 + cc * 100 + dd * 10);
            num_.add(aa);
            num_.add(bb);
            num_.add(cc);
            num_.add(dd);
            num_.add(ee);
            getPlayer().send(MainPacketCreator.HeadTitle(num_));
            sendOk("유저님의 왕관칭호가 성공적으로 변경되었습니다.\\r\\n#r채널이동을 해야 정상적으로 변경이 완료됩니다.#k");
        } else {
            getPlayer().setKeyValue2("HeadTitle", 000000);
            List<Integer> num_ = new ArrayList<Integer>();
            num_.add(0);
            num_.add(0);
            num_.add(0);
            num_.add(0);
            num_.add(0);
            getPlayer().send(MainPacketCreator.HeadTitle(num_));
            sendOk("유저님의 왕관칭호가 성공적으로 제거되었습니다.\\r\\n#r채널이동을 해야 정상적으로 변경이 완료됩니다.#k");
        }
        getPlayer().getMap().broadcastMessage(MainPacketCreator.removePlayerFromMap(getPlayer().getId()));
        getPlayer().getMap().broadcastMessage(MainPacketCreator.spawnPlayerMapobject(getPlayer()));
    }

    public void sendRebornRank() {
        String chat = "#e환생포인트 랭킹#n\r\n";
        try {
            int index = 0;
            Connection con = MYSQL.getConnection();
            ResultSet rs = con.prepareStatement("SELECT * FROM `characters` order by `reborns` desc limit 10").executeQuery();
            while (rs.next()) {
                index++;
                chat += "\r\n" + index + "위. " + rs.getString("name") + ", 환생 포인트 : " + rs.getInt("reborns");
            }
            rs.close();
            con.close();
        } catch (Exception e) {
        }
        sendOk(chat);
    }

    public void updateBuddyCapacity(int capacity) {
        c.getPlayer().setBuddyCapacity(capacity);
    }

    public int getBuddyCapacity() {
        return c.getPlayer().getBuddyCapacity();
    }

    public int partyMembersInMap() {
        int inMap = 0;
        for (MapleCharacter char2 : getPlayer().getMap().getCharacters()) {
            if (char2.getParty() == getPlayer().getParty()) {
                inMap++;
            }
        }
        return inMap;
    }

    public List<MapleCharacter> getPartyMembers() {
        if (getPlayer().getParty() == null) {
            return null;
        }
        List<MapleCharacter> chars = new LinkedList<MapleCharacter>(); // creates an empty array full of shit..
        for (ChannelServer channel : ChannelServer.getAllInstances()) {
            for (MapleCharacter chr : channel.getPartyMembers(getPlayer().getParty())) {
                if (chr != null) { // double check <3
                    chars.add(chr);
                }
            }
        }
        return chars;
    }

    public void warpPartyWithExp(int mapId, int exp) {
        MapleMap target = getMap(mapId);
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chr.getName());
            if ((curChar.getEventInstance() == null && getPlayer().getEventInstance() == null) || curChar.getEventInstance() == getPlayer().getEventInstance()) {
                curChar.changeMap(target, target.getPortal(0));
                curChar.gainExp(exp, true, false, true);
            }
        }
    }

    public void warpPartyWithExpMeso(int mapId, int exp, int meso) {
        MapleMap target = getMap(mapId);
        for (MaplePartyCharacter chr : getPlayer().getParty().getMembers()) {
            MapleCharacter curChar = c.getChannelServer().getPlayerStorage().getCharacterByName(chr.getName());
            if ((curChar.getEventInstance() == null && getPlayer().getEventInstance() == null) || curChar.getEventInstance() == getPlayer().getEventInstance()) {
                curChar.changeMap(target, target.getPortal(0));
                curChar.gainExp(exp, true, false, true);
                curChar.gainMeso(meso, false);
            }
        }
    }

    public int itemQuantity(int itemid) {
        return getPlayer().getInventory(GameConstants.getInventoryType(itemid)).countById(itemid);
    }

    public int getSkillLevel(int skillid) {
        return getPlayer().getSkillLevel(skillid);
    }

    public void resetReactors() {
        getPlayer().getMap().resetReactors(getClient());
    }

    public void genericGuildMessage(int code) {
        c.getSession().writeAndFlush(MainPacketCreator.genericGuildMessage((byte) code));
    }

    public void disbandGuild() {
        final int gid = c.getPlayer().getGuildId();
        if (gid <= 0 || c.getPlayer().getGuildRank() != 1) {
            return;
        }
        ChannelServer.disbandGuild(gid);
    }

    public void doReborn() {
        if (getPlayer().getReborns() < MAX_REBORNS) {
            getPlayer().setReborns(getPlayer().getReborns() + 1);
            List<Pair<PlayerStat, Long>> reborns = new ArrayList<Pair<PlayerStat, Long>>(4);
            getPlayer().setLevel(1);
            getPlayer().setExp(0);
            reborns.add(new Pair<PlayerStat, Long>(PlayerStat.LEVEL, Long.valueOf(1)));
            reborns.add(new Pair<PlayerStat, Long>(PlayerStat.EXP, Long.valueOf(0)));
        } else {
            getPlayer().getClient().getSession().writeAndFlush(MainPacketCreator.serverNotice(6, "You have reached the maximum amount of rebirths!"));
        }
    }

    public void increaseGuildCapacity() {
        if (c.getPlayer().getMeso() < 5000000) {
            c.getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "500만 메소가 충분하지 않습니다."));
            return;
        }
        final int gid = c.getPlayer().getGuildId();
        if (gid <= 0) {
            return;
        }
        ChannelServer.increaseGuildCapacity(gid);
        c.getPlayer().gainMeso(-5000000, true, false, true);
    }

    public boolean createAlliance(String alliancename) {
        MapleParty pt = c.getPlayer().getParty();
        MapleCharacter otherChar = c.getChannelServer().getPlayerStorage().getCharacterById(pt.getMemberByIndex(1).getId());
        if (otherChar == null || otherChar.getId() == c.getPlayer().getId()) {
            return false;
        }
        try {
            return ChannelServer.createAlliance(alliancename, c.getPlayer().getId(), otherChar.getId(), c.getPlayer().getGuildId(), otherChar.getGuildId());
        } catch (Exception re) {
            re.printStackTrace();
            return false;
        }
    }

    public boolean addCapacityToAlliance() {
        try {
            final MapleGuild gs = ChannelServer.getGuild(c.getPlayer().getGuildId());
            if (gs != null && c.getPlayer().getGuildRank() == 1 && c.getPlayer().getAllianceRank() == 1) {
                if (ChannelServer.getAllianceLeader(gs.getAllianceId()) == c.getPlayer().getId() && ChannelServer.changeAllianceCapacity(gs.getAllianceId())) {
                    gainMeso(-MapleAlliance.CHANGE_CAPACITY_COST);
                    return true;
                }
            }
        } catch (Exception re) {
            re.printStackTrace();
        }
        return false;
    }

    public boolean disbandAlliance() {
        try {
            final MapleGuild gs = ChannelServer.getGuild(c.getPlayer().getGuildId());
            if (gs != null && c.getPlayer().getGuildRank() == 1 && c.getPlayer().getAllianceRank() == 1) {
                if (ChannelServer.getAllianceLeader(gs.getAllianceId()) == c.getPlayer().getId() && ChannelServer.disbandAlliance(gs.getAllianceId())) {
                    return true;
                }
            }
        } catch (Exception re) {
            re.printStackTrace();
        }
        return false;
    }

    public void displayGuildRanks() {
        c.getSession().writeAndFlush(MainPacketCreator.showGuildRanks(npc, MapleGuildRanking.getInstance().getRank()));
    }

    public boolean removePlayerFromInstance() {
        if (c.getPlayer().getEventInstance() != null) {
            c.getPlayer().getEventInstance().removePlayer(c.getPlayer());
            return true;
        }
        return false;
    }

    public boolean isPlayerInstance() {
        if (c.getPlayer().getEventInstance() != null) {
            return true;
        }
        return false;
    }

    public void changeStat(byte slot, int type, short amount) {
        Equip sel = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(slot);
        switch (type) {
            case 0:
                sel.setStr(amount);
                break;
            case 1:
                sel.setDex(amount);
                break;
            case 2:
                sel.setInt(amount);
                break;
            case 3:
                sel.setLuk(amount);
                break;
            case 4:
                sel.setHp(amount);
                break;
            case 5:
                sel.setMp(amount);
                break;
            case 6:
                sel.setWatk(amount);
                break;
            case 7:
                sel.setMatk(amount);
                break;
            case 8:
                sel.setWdef(amount);
                break;
            case 9:
                sel.setMdef(amount);
                break;
            case 10:
                sel.setAcc(amount);
                break;
            case 11:
                sel.setAvoid(amount);
                break;
            case 12:
                sel.setHands(amount);
                break;
            case 13:
                sel.setSpeed(amount);
                break;
            case 14:
                sel.setJump(amount);
                break;
            case 15:
                sel.setUpgradeSlots((byte) amount);
                break;
            case 16:
                sel.setViciousHammer((byte) amount);
                break;
            case 17:
                sel.setLevel((byte) amount);
                break;
            default:
                break;
        }
        c.getPlayer().equipChanged();
    }

    public void giveMerchantMesos() {
        long mesos = 0;
        try {
            Connection con = (Connection) MYSQL.getConnection();
            PreparedStatement ps = (PreparedStatement) con.prepareStatement("SELECT * FROM hiredmerchants WHERE merchantid = ?");
            ps.setInt(1, getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
            } else {
                mesos = rs.getLong("mesos");
            }
            rs.close();
            ps.close();

            ps = (PreparedStatement) con.prepareStatement("UPDATE hiredmerchants SET mesos = 0 WHERE merchantid = ?");
            ps.setInt(1, getPlayer().getId());
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            System.err.println("Error gaining mesos in hired merchant" + ex);
        }
        c.getPlayer().gainMeso((int) mesos, false);
    }

    public long getMerchantMesos() {
        long mesos = 0;
        try {
            Connection con = (Connection) MYSQL.getConnection();
            PreparedStatement ps = (PreparedStatement) con.prepareStatement("SELECT * FROM hiredmerchants WHERE merchantid = ?");
            ps.setInt(1, getPlayer().getId());
            ResultSet rs = ps.executeQuery();
            if (!rs.next()) {
                rs.close();
                ps.close();
            } else {
                mesos = rs.getLong("mesos");
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            System.err.println("Error gaining mesos in hired merchant" + ex);
        }
        return mesos;
    }

    public void displayMerch(MapleClient c) {
        HiredMerchantHandler.displayMerch(c);
    }

    public final short getKegs() {
        return AramiaFireWorks.getInstance().getKegsPercentage();
    }

    public void giveKegs(final int kegs) {
        AramiaFireWorks.getInstance().giveKegs(c.getPlayer(), kegs);
    }

    public final MapleInventory getInventory(byte type) {
        return c.getPlayer().getInventory(MapleInventoryType.getByType(type));
    }

    public void resetStats(final int str, final int dex, final int int_, final int luk) {
        List<Pair<PlayerStat, Long>> stats = new ArrayList<Pair<PlayerStat, Long>>(2);
        final MapleCharacter chr = c.getPlayer();
        int total = chr.getStat().getStr() + chr.getStat().getDex() + chr.getStat().getLuk() + chr.getStat().getInt() + chr.getRemainingAp();

        total -= str;
        chr.getStat().setStr(str);

        total -= dex;
        chr.getStat().setDex(dex);

        total -= int_;
        chr.getStat().setInt(int_);

        total -= luk;
        chr.getStat().setLuk(luk);

        chr.setRemainingAp(total);
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.STR, (long) str));
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.DEX, (long) dex));
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.INT, (long) int_));
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.LUK, (long) luk));
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.AVAILABLEAP, (long) total));
        //   c.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(stats, false, c.getPlayer().getJob()));
    }

    public final boolean dropItem(int slot, int invType, int quantity) {
        MapleInventoryType inv = MapleInventoryType.getByType((byte) invType);
        if (inv == null) {
            return false;
        }
        InventoryManipulator.drop(c, inv, (short) slot, (short) quantity);
        return true;
    }

    public void maxStats() {
        List<Pair<PlayerStat, Long>> statup = new ArrayList<Pair<PlayerStat, Long>>(2);

        c.getPlayer().setRemainingAp(0);
        c.getPlayer().setRemainingSp(0);
        c.getPlayer().getStat().setStr(32767);
        c.getPlayer().getStat().setDex(32767);
        c.getPlayer().getStat().setInt(32767);
        c.getPlayer().getStat().setLuk(32767);

        c.getPlayer().getStat().setHp(99999, c.getPlayer());
        c.getPlayer().getStat().setMp(99999);
        c.getPlayer().getStat().setMaxHp(99999);
        c.getPlayer().getStat().setMaxMp(99999);

        statup.add(new Pair(PlayerStat.STR, Long.valueOf(32767)));
        statup.add(new Pair(PlayerStat.DEX, Long.valueOf(32767)));
        statup.add(new Pair(PlayerStat.LUK, Long.valueOf(32767)));
        statup.add(new Pair(PlayerStat.INT, Long.valueOf(32767)));
        statup.add(new Pair(PlayerStat.HP, Long.valueOf(99999)));
        statup.add(new Pair(PlayerStat.MAXHP, Long.valueOf(99999)));
        statup.add(new Pair(PlayerStat.MP, Long.valueOf(99999)));
        statup.add(new Pair(PlayerStat.MAXMP, Long.valueOf(99999)));
        statup.add(new Pair(PlayerStat.AVAILABLEAP, Long.valueOf(0)));
        statup.add(new Pair(PlayerStat.AVAILABLESP, Long.valueOf(0)));

        // c.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(statup, c.getPlayer().getJob()));
    }

    ///원정대 이전버전/////////////////////////////////////////////////////////////////////////
    public MapleSquadLegacy getSquad(String type) {
        return c.getChannelServer().getMapleSquad(type);
    }

    public int getSquadAvailability(String type) {
        final MapleSquadLegacy squad = c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        }
        return squad.getStatus();
    }

    public void registerSquad(String type, int minutes, String startText) {
        final MapleSquadLegacy squad = new MapleSquadLegacy(c.getChannel(), type, c.getPlayer(), minutes * 60 * 1000);
        final MapleMap map = c.getPlayer().getMap();

        map.broadcastMessage(MainPacketCreator.getClock(minutes * 60));
        map.broadcastMessage(MainPacketCreator.serverNotice(6, c.getPlayer().getName() + startText));
        c.getChannelServer().addMapleSquad(squad, type);
    }

    public boolean getSquadList(String type, byte type_) {
        final MapleSquadLegacy squad = c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return false;
        }
        if (type_ == 0) { // Normal viewing
            sendNext(squad.getSquadMemberString(type_));
        } else if (type_ == 1) { // Squad Leader banning, Check out banned participant
            sendSimple(squad.getSquadMemberString(type_));
        } else if (type_ == 2) {
            if (squad.getBannedMemberSize() > 0) {
                sendSimple(squad.getSquadMemberString(type_));
            } else {
                sendNext(squad.getSquadMemberString(type_));
            }
        }
        return true;
    }

    public byte isSquadLeader(String type) {
        final MapleSquadLegacy squad = c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        } else if (squad.getLeader().getId() == c.getPlayer().getId()) {
            return 1;
        } else {
            return 0;
        }
    }

    public void banMember(String type, int pos) {
        final MapleSquadLegacy squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.banMember(pos);
        }
    }

    public void acceptMember(String type, int pos) {
        final MapleSquadLegacy squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            squad.acceptMember(pos);
        }
    }

    public int addMember(String type, boolean join) {
        final MapleSquadLegacy squad = c.getChannelServer().getMapleSquad(type);
        if (squad != null) {
            return squad.addMember(c.getPlayer(), join);
        }
        return -1;
    }

    public byte isSquadMember(String type) {
        final MapleSquadLegacy squad = c.getChannelServer().getMapleSquad(type);
        if (squad == null) {
            return -1;
        } else if (squad.getMembers().contains(c.getPlayer())) {
            return 1;
        } else if (squad.isBanned(c.getPlayer())) {
            return 2;
        } else {
            return 0;
        }
    }

    public String getHighRanking(int type) {
        if (HighRanking.getInstance().getData(type).getRankings().isEmpty()) {
            return "현재 해당하는 랭킹이 없습니다.\r\n\r\n※ 랭킹은 1시간 주기로 업데이트 됩니다.\r\n\r\n";
        }

        String ret = "선택하신 랭킹은 아래와 같습니다.\r\n\r\n※ 랭킹은 1시간 주기로 업데이트 됩니다.\r\n\r\n";
        int i = 1;
        for (RankingData rd : HighRanking.getInstance().getData(type).getRankings()) {
            if (type == HighRankingType.FirstAdvance.getType()) {
                int time = rd.getValue1();
                int min = time / 60;
                int sec = time % 60;
                int left = time % 1000;
                ret += "#e" + i + ". #n#b" + rd.getName() + "#k 클리어시간 : " + min + "분 " + sec + "초 0." + left + "\r\n";
            } else if (type == HighRankingType.SecondAdvance.getType()) {
                int time = rd.getValue1();
                int min = time / 60;
                int sec = time % 60;
                int left = time % 1000;
                ret += "#e" + i + ". #n#b" + rd.getName() + "#k 클리어시간 : " + min + "분 " + sec + "초 0." + left + "\r\n";
            } else if (type == HighRankingType.ThirdAdvance.getType()) {
                int time = rd.getValue1();
                int min = time / 60;
                int sec = time % 60;
                int left = time % 1000;
                ret += "#e" + i + ". #n#b" + rd.getName() + "#k 클리어시간 : " + min + "분 " + sec + "초 남은라이프 : " + rd.getValue2() + " 실패 : " + rd.getValue3() + "\r\n";
            } else if (type == HighRankingType.ForthAdvance.getType()) {
                int time = rd.getValue1();
                int min = time / 60;
                int sec = time % 60;
                int left = time % 1000;
                ret += "#e" + i + ". #n#b" + rd.getName() + "#k 클리어시간 : " + min + "분 " + sec + "초 0." + left + "\r\n";
            }
        }
        return ret;
    }

    public void setProfession(int index, int skill) {
        MapleProfession pro = c.getPlayer().getProfession();
        if (index == 1) {
            pro.setFirstProfession(MapleProfessionType.getProfessionById(skill));
            pro.setFirstProfessionExp(0);
            pro.setFirstProfessionLevel(1);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(skill), (byte) 1, (byte) 10);
        } else if (index == 2) {
            pro.setSecondProfession(MapleProfessionType.getProfessionById(skill));
            pro.setSecondProfessionExp(0);
            pro.setSecondProfessionLevel(1);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(skill), (byte) 1, (byte) 10);
        }
    }

    public void deleteProfession(int index) {
        MapleProfession pro = c.getPlayer().getProfession();
        if (index == 1) {
            pro.setFirstProfessionExp(0);
            pro.setFirstProfessionLevel(0);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(pro.getFirstProfessionSkill()), (byte) 0, (byte) 0);
            pro.setFirstProfession(MapleProfessionType.NONE);
        } else if (index == 2) {
            pro.setSecondProfessionExp(0);
            pro.setSecondProfessionLevel(0);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(pro.getSecondProfessionSkill()), (byte) 0, (byte) 0);
            pro.setSecondProfession(MapleProfessionType.NONE);
        }
    }

    public void levelUpProfession(int index) {
        MapleProfession pro = c.getPlayer().getProfession();
        if (index == 1) {
            pro.setFirstProfessionExp(0);
            pro.addFirstProfessionLevel(1);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(pro.getFirstProfessionSkill()), (byte) 1, (byte) 10);
        } else if (index == 2) {
            pro.setSecondProfessionExp(0);
            pro.addSecondProfessionLevel(1);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(pro.getSecondProfessionSkill()), (byte) 1, (byte) 10);
        }
    }

    public int getProfession(int index) {
        if (index == 1) {
            return c.getPlayer().getProfession().getFirstProfessionSkill();
        } else if (index == 2) {
            return c.getPlayer().getProfession().getSecondProfessionSkill();
        }
        return 0;
    }

    public String printRanking(String type, int limit) {
        int i = 0;
        String ret = "";
        for (MedalRankHolder mrh : MedalRanking.getInstance().getRanks(type)) {
            if (i < limit) {
                ret += "#b#e" + i + ".#n " + mrh.name + " : " + mrh.value + "#k\r\n";
            } else {
                break;
            }
        }
        return ret;
    }

    public void MapiaStart(final MapleCharacter player, int time, final int morningmap, final int citizenmap1, final int citizenmap2, final int citizenmap3, final int citizenmap4, final int citizenmap5, final int citizenmap6, final int mapiamap, final int policemap, final int drmap, final int after, final int night, final int vote) {
        String[] job = {"시민", "마피아", "경찰", "의사", "시민", "시민", "마피아", "경찰", "시민", "마피아"};
        String name = "";
        String mapia = "";
        String police = "";
        int playernum = 0;
        int citizennumber = 0;
        //final List<MapleCharacter> players = new ArrayList<MapleCharacter>();

        final MapleMap map = ChannelServer.getInstance(getClient().getChannel()).getMapFactory().getMap(morningmap);
        for (MapleCharacter chr : player.getMap().getCharacters()) {
            playernum++;
        }
        int[] iNumber = new int[playernum];
        for (int i = 1; i <= iNumber.length; i++) {
            iNumber[i - 1] = i;
        }
        for (int i = 0; i < iNumber.length; i++) {
            int iRandom = (int) (Math.random() * playernum);
            int t = iNumber[0];
            iNumber[0] = iNumber[iRandom];
            iNumber[iRandom] = t;
        }
        for (int i = 0; i < iNumber.length; i++) {
            System.out.print(iNumber[i] + ",");
        }
        int jo = 0;
        map.names = "";
        for (MapleCharacter chr : player.getMap().getCharacters()) {
            chr.warp(morningmap);
            map.names += chr.getName() + ",";
            chr.mapiajob = job[iNumber[jo] - 1];
            if (chr.mapiajob == "마피아") {
                mapia += chr.getName() + ",";
            } else if (chr.mapiajob == "경찰") {
                police += chr.getName() + ",";
            } else if (chr.mapiajob == "시민") {
                citizennumber++;
            }
            chr.dropMessage(5, "당신의 직업은 " + job[iNumber[jo] - 1] + " 입니다.");
            chr.dropShowInfo(time + "초 후 마피아 게임이 시작됩니다.");
            jo++;
        }
        final String mapialist = mapia;
        final String policelist = police;
        final int citizennum = citizennumber;
        final int playernuma = playernum;
        final Timer m_timer = new Timer();
        TimerTask m_task = new TimerTask() {
            public void run() {
                for (MapleCharacter chr : player.getMap().getCharacters()) {
                    if (chr.mapiajob == "마피아") {
                        chr.isMapiaVote = true;
                        chr.dropMessage(6, "마피아인 당신 동료는 " + mapialist + " 들이 있습니다. 밤이되면 같이 의논하여 암살할 사람을 선택해 주시기 바랍니다.");
                    } else if (chr.mapiajob == "경찰") {
                        chr.isPoliceVote = true;
                        chr.dropMessage(6, "경찰인 당신 동료는 " + policelist + " 들이 있습니다. 밤이되면 마피아같다는 사람을 지목하면 마피아인지 아닌지를 알 수 있습니다.");
                    } else if (chr.mapiajob == "의사") {
                        chr.isDrVote = true;
                        chr.dropMessage(6, "당신은 하나밖에 없는 의사입니다. 당신에게 부여된 임무는 시민과 경찰을 살리는 것입니다. 밤이되면 마피아가 지목했을것 같은 사람을 선택하면 살리실 수 있습니다.");
                    } else if (chr.mapiajob == "시민") {
                        chr.dropMessage(6, "당신은 시민입니다. 낮이되면 대화를 통해 마피아를 찾아내 투표로 처형시키면 됩니다.");
                    }
                    chr.getmapiavote = 0;
                    chr.voteamount = 0;
                    chr.getpolicevote = 0;
                    chr.isDead = false;
                    chr.isDrVote = true;
                    chr.isMapiaVote = true;
                    chr.isPoliceVote = true;
                    chr.getdrvote = 0;
                    chr.isVoting = false;
                }
                map.broadcastMessage(MainPacketCreator.getGMText(1, "진행자>>낮이 되었습니다. 마피아를 찾아내 모두 처형하면 시민의 승리이며, 마피아가 경찰 또는 시민을 모두 죽일시 마피아의 승리입니다.(직업 : 시민,경찰,마피아,의사)"));
                map.playern = playernuma;
                map.morningmap = morningmap;
                map.aftertime = after;
                map.nighttime = night;
                map.votetime = vote;
                map.citizenmap1 = citizenmap1;
                map.citizenmap2 = citizenmap2;
                map.citizenmap3 = citizenmap3;
                map.citizenmap4 = citizenmap4;
                map.citizenmap5 = citizenmap5;
                map.citizenmap6 = citizenmap6;
                map.MapiaIng = true;

                map.mapiamap = mapiamap;
                map.policemap = policemap;
                map.drmap = drmap;
                m_timer.cancel();
                map.MapiaChannel = player.getClient().getChannel();
                return;
            }
        };
        m_timer.schedule(m_task, time * 1000);
    }

    public void setExpEvent(int rate, int time) {
        final int origin = ChannelServer.getInstance(0).getExpRate();
        long period = time * 1000L;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.setExpRate(rate);
            cserv.broadcastPacket(MainPacketCreator.getGMText(7, "[이벤트] 경험치 배율 이벤트가 시작되었습니다!"));
        }
        EtcTimer t = EtcTimer.getInstance();
        Runnable r = new Runnable() {
            @Override
            public void run() {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setExpRate(origin);
                    cserv.broadcastPacket(MainPacketCreator.getGMText(7, "[이벤트] 경험치 배율 이벤트가 종료되었습니다."));
                }
            }
        };
        t.schedule(r, period);
    }

    public void setDropEvent(int rate, int time) {
        final int origin = ChannelServer.getInstance(0).getDropRate();
        long period = time * 1000L;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.setDropRate(rate);
            cserv.broadcastPacket(MainPacketCreator.getGMText(7, "[이벤트] 드롭 배율 이벤트가 시작되었습니다!"));
        }
        EtcTimer t = EtcTimer.getInstance();
        Runnable r = new Runnable() {
            @Override
            public void run() {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setDropRate(origin);
                    cserv.broadcastPacket(MainPacketCreator.getGMText(7, "[이벤트] 드롭 배율 이벤트가 종료되었습니다."));
                }
            }
        };
        t.schedule(r, period);
    }

    public void setMesoEvent(int rate, int time) {
        final byte origin = (byte) ChannelServer.getInstance(0).getMesoRate();
        long period = time * 1000L;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.setMesoRate((byte) rate);
            cserv.broadcastPacket(MainPacketCreator.getGMText(7, "[이벤트] 메소 배율 이벤트가 시작되었습니다!"));
        }
        EtcTimer t = EtcTimer.getInstance();
        Runnable r = new Runnable() {
            @Override
            public void run() {
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    cserv.setMesoRate(origin);
                    cserv.broadcastPacket(MainPacketCreator.getGMText(7, "[이벤트] 메소 배율 이벤트가 종료되었습니다."));
                }
            }
        };
        t.schedule(r, period);
    }

    public void setTempMessage(String text, int time) {
        final String origin = LoginServer.getInstance().getEventMessage();
        long period = time * 1000L;
        LoginServer.getInstance().setEventMessage(text);
        EtcTimer t = EtcTimer.getInstance();
        Runnable r = new Runnable() {
            @Override
            public void run() {
                LoginServer.getInstance().setEventMessage(origin);
            }
        };
        t.schedule(r, period);
    }

    public void changeMap(int mapid) {
        ChannelServer cserv = c.getChannelServer();
        MapleMap target = null;
        if (c.getPlayer().getEventInstance() != null) {
            target = c.getPlayer().getEventInstance().getMapFactory().getMap(mapid);
        } else {
            target = cserv.getMapFactory().getMap(mapid);
        }

        MaplePortal targetPortal = null;
        if (mapid > 0) {
            try {
                targetPortal = target.getPortal(0);
            } catch (IndexOutOfBoundsException e) {
                // noop, assume the gm didn't know how many portals there are
                c.getPlayer().dropMessage(5, "Invalid portal selected.");
            } catch (NumberFormatException a) {
                // noop, assume that the gm is drunk
            }
        }
        if (targetPortal == null) {
            targetPortal = target.getPortal(0);
        }
        c.getPlayer().changeMap(target, targetPortal);
    }

    public void setName(String name) {
        String[] blocks = {"GM", "요크", "주니", "지훈", "정규", "라임", "소리"};
        for (String b : blocks) {
            if (name.indexOf(b) != -1) {
                return;
            }
        }
        for (char c : name.toCharArray()) {
            if (!(c > 'a' && c < 'z') && !(c > '가' && c < '하')) {
                return;
            }
        }
        if (!(name.length() > 1)) {
            return;
        }

        PreparedStatement ps;
        try {
            Connection con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM `characters` WHERE `name` = ?");
            ps.setString(1, name);
            if (!ps.executeQuery().next()) {
                getPlayer().setName(name);
                ps = con.prepareStatement("UPDATE `characters` SET `name` = ? WHERE `id` = ?");
                ps.setString(1, name);
                ps.setInt(2, getPlayer().getId());
                ps.executeUpdate();
            }
            ps.close();
            con.close();
            getPlayer().getClient().getSession().close();
        } catch (SQLException ex) {
            System.out.println("닉네임 변경 실패");
        }
    }

    public void setInnerAbility(int level) {
        if (level >= 30) {
            InnerSkillValueHolder isvh = InnerAbillity.getInstance().renewSkill(0, -1);
            c.getPlayer().getInnerSkills().add(isvh);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), isvh.getSkillLevel(), isvh.getSkillLevel());
        } else if (level >= 60) {
            InnerSkillValueHolder isvh = InnerAbillity.getInstance().renewSkill(Randomizer.rand(0, 2), -1);
            c.getPlayer().getInnerSkills().add(isvh);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), isvh.getSkillLevel(), isvh.getSkillLevel());
        } else if (level >= 100) {
            InnerSkillValueHolder isvh = InnerAbillity.getInstance().renewSkill(Randomizer.rand(1, 3), -1);
            c.getPlayer().getInnerSkills().add(isvh);
            c.getPlayer().changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), isvh.getSkillLevel(), isvh.getSkillLevel());
        }
    }

    public void setInnerStats() {
        InnerSkillValueHolder isvh = InnerAbillity.getInstance().renewSkill(0, -1);
        c.getPlayer().getInnerSkills().add(isvh);
        c.getPlayer().changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), isvh.getSkillLevel(), isvh.getSkillLevel());
        c.getPlayer().send(MainPacketCreator.getPlayerInfo(c.getPlayer()));
        MapleMap currentMap = c.getPlayer().getMap();
        currentMap.removePlayer(c.getPlayer());
        currentMap.addPlayer(c.getPlayer());
    }

    public void invitedRPS() {
        if (c.getPlayer().getKeyValue2("RPS") != 0) {
            MapleCharacter ochr = c.getPlayer().getMap().getCharacterById_InMap(c.getPlayer().getKeyValue2("RPSOTHER"));
            if (ochr.getMeso() >= c.getPlayer().getKeyValue2("RPS")) {
                ochr.setKeyValue2("RPS", c.getPlayer().getKeyValue2("RPS"));
                ochr.setKeyValue2("RPSOTHER", c.getPlayer().getId());
                NPCScriptManager.getInstance().start(ochr.getClient(), 2100, "RPSACCEPT");
            } else {
                c.getPlayer().dropMessage(1, "상대방 메소가 부족합니다.");
            }
        } else {
            c.getPlayer().dropMessage(1, "메소가 설정되지 않았습니다.");
        }

    }

    public void acceptRPS() {
        MapleCharacter ochr = c.getPlayer().getMap().getCharacterById_InMap(c.getPlayer().getKeyValue2("RPSOTHER"));
        MapleUserTrade.inviteTrade(ochr, c.getPlayer(), false);
    }

    public void openCS() {
        InterServerHandler.EnterCS(c, c.getPlayer(), false);
    }

    public String MakeGuildPot() {
        try {
            boolean isExist = false;
            MapleReactor react = null;
            if (PotSystem.getPotId(getPlayer().getGuildId()) != 0) {
                return "이미 설치되있습니다.";
            }
            for (final MapleMapObject remo : getPlayer().getMap().getAllReactor()) {
                react = (MapleReactor) remo;
                if (react.getGuildid() == 0) {
                    continue;
                } else if ((react.getPosition().getX() - 100 < getPlayer().getPosition().getX() && react.getPosition().getX() + 100 > getPlayer().getPosition().getX()) && (react.getPosition().getY() - 50 < getPlayer().getPosition().getY() && react.getPosition().getY() + 50 > getPlayer().getPosition().getY())) {
                    isExist = true;
                    return "타 길드 분재랑은 겹치지 못합니다.";
                }

            }

            if (!isExist) {
                int[] rids = {100000, 100002};
                int randrid = rids[Randomizer.rand(0, 1)];
                final MapleReactorStats stats = MapleReactorFactory.getReactor(randrid);
                final MapleReactor myReactor = new MapleReactor(stats, randrid, getPlayer().getGuildId());
                stats.setFacingDirection((byte) 0);
                myReactor.setPosition(c.getPlayer().getPosition());
                myReactor.setDelay(0);
                myReactor.setState((byte) 0);
                myReactor.setName(getPlayer().getGuild().getName());
                PotSystem.addPot(getPlayer().getGuildId(), myReactor.getReactorId(), 0);
                c.getPlayer().getMap().spawnReactor(myReactor);

                Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("INSERT INTO pots (rid,`name`,x,y,gid,channel) VALUES ( ?, ?, ?, ?,?,?)");
                ps.setInt(1, myReactor.getReactorId());
                ps.setString(2, getPlayer().getGuild().getName());
                ps.setInt(3, myReactor.getPosition().x);
                ps.setInt(4, myReactor.getPosition().y);
                ps.setInt(5, getPlayer().getGuildId());
                ps.setInt(6, getClient().getChannel());
                ps.executeUpdate();
                con.close();
                return "성공적으로 설치되었습니다.";
            }
            return "설치에 실패하셨습니다.";
        } catch (Exception ex) {
            ex.printStackTrace();
            return "오류가 발생하여 설치하지 못했습니다.";
        }
    }

    public int getRC() {
        return getPlayer().getRC();
    }

    public void setRC(int rc) {
        getPlayer().gainRC(rc - getRC());
    }

    public void loseRC(int rc) {
        getPlayer().loseRC(rc);
    }

    public void startCatch() {
        final int MaxCatchSize = (getMap().getCharactersSize() / 5) * 2;
        int CatchSize = 0;
        String CatchingName = "", CatchingName2 = "";

        MapleMap map = ChannelServer.getInstance(getClient().getChannel()).getMapFactory().getMap(109090300);
        map.stopCatch();
        List<MapleCharacter> players = new ArrayList<MapleCharacter>();
        players.addAll(getMap().getCharacters());
        Collections.addAll(players);
        Collections.shuffle(players);
        for (MapleCharacter chr : players) {
            chr.cancelAllBuffs();
            if (MaxCatchSize > CatchSize) {
                chr.isCatching = true;
                chr.isCatched = false;
                chr.changeMap(map, new Point(875, -453));
                CatchingName += chr.getName() + ",";
                CatchingName2 += chr.getName() + "\r\n";
                CatchSize++;
                chr.giveDebuff(DiseaseStats.STUN, MobSkillFactory.getMobSkill(123, 1));
            } else {
                chr.isCatched = true;
                chr.isCatching = false;
                chr.changeMap(map, new Point(-592, -451));
            }
        }

        map.broadcastMessage(MainPacketCreator.serverNotice(1, "[술래 목록]\r\n" + CatchingName2));
        map.broadcastMessage(MainPacketCreator.serverNotice(6, "[술래 목록] " + CatchingName));
        map.startCatch();
    }

    public void gainSponserItem(int item, final String name, short allstat, short damage, byte upgradeslot) {
        if (GameConstants.isEquip(item)) {
            Equip Item = (Equip) ItemInformation.getInstance().getEquipById(item);
            Item.setOwner(name);
            Item.setStr(allstat);
            Item.setDex(allstat);
            Item.setInt(allstat);
            Item.setLuk(allstat);
            Item.setWatk(damage);
            Item.setMatk(damage);
            Item.setUpgradeSlots(upgradeslot);
            InventoryManipulator.addFromDrop(c, Item, false);
        } else {
            gainItem(item, allstat, damage);
        }
    }

    public void gainPotentialItem(int item, int quantity, byte grade, byte thing, int potential1, int potential2, int potential3) {
        if (GameConstants.isEquip(item)) {
            Equip Item = (Equip) ItemInformation.getInstance().getEquipById(item);
            Item.setLines(grade);
            Item.setState(thing);
            Item.setPotential1(potential1);
            Item.setPotential2(potential2);
            Item.setPotential3(potential3);
            InventoryManipulator.addFromDrop(c, Item, false);
        }
    }

    public String getHyperSkills(byte type) {
        MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr("" + (getPlayer().getJob() == 2218 ? 2217 : getPlayer().getJob()), '0', 3) + ".img");
        int skillid = 0;
        String Lists = "";
        for (MapleData skill : data) {
            if (skill != null) {
                for (MapleData skillId : skill.getChildren()) {
                    if (!skillId.getName().equals("icon")) {
                        if (MapleDataTool.getIntConvert("hyper", skillId, 120) == type) {
                            if ((MapleDataTool.getIntConvert("reqLev", skillId, 0) <= getPlayer().getLevel()) || (getPlayer().getReborns() > 50 && getPlayer().getLevel() >= 140)) {
                                skillid = Integer.parseInt(skillId.getName());
                                if (getPlayer().getSkillLevel(skillid) == 0) {
                                    Lists += "#L" + skillid + "##s" + skillid + "# #q" + skillid + "##l\r\n";
                                }
                            }
                        }
                    }
                }
            }
        }
        return Lists;
    }

    public String giveHyperSp() {
        boolean reborn = getPlayer().getReborns() > 50;
        if (getPlayer().getLevel() >= 140) {
            if ((!reborn && getPlayer().getKeyValue2("hyper140") != 1) || (reborn && getPlayer().getKeyValue2("hyper140") != 2)) {
                getPlayer().setKeyValue2("hyper140", reborn ? 2 : 1);
                getPlayer().setKeyValue2("hyper1", getPlayer().getKeyValue2("hyper1") + 1);
                getPlayer().setKeyValue2("hyper2", getPlayer().getKeyValue2("hyper2") + 1);
            }
        }
        if (getPlayer().getLevel() >= 150) {
            if ((!reborn && getPlayer().getKeyValue2("hyper150") != 1) || (reborn && getPlayer().getKeyValue2("hyper150") != 2)) {
                getPlayer().setKeyValue2("hyper150", reborn ? 2 : 1);
                getPlayer().setKeyValue2("hyper1", getPlayer().getKeyValue2("hyper1") + 1);
                getPlayer().setKeyValue2("hyper3", getPlayer().getKeyValue2("hyper3") + 1);
            }
        }
        if (getPlayer().getLevel() >= 160) {
            if ((!reborn && getPlayer().getKeyValue2("hyper160") != 1) || (reborn && getPlayer().getKeyValue2("hyper160") != 2)) {
                getPlayer().setKeyValue2("hyper160", reborn ? 2 : 1);
                getPlayer().setKeyValue2("hyper1", getPlayer().getKeyValue2("hyper1") + 1);
                getPlayer().setKeyValue2("hyper2", getPlayer().getKeyValue2("hyper2") + 1);
            }
        }
        if (getPlayer().getLevel() >= 170) {
            if ((!reborn && getPlayer().getKeyValue2("hyper170") != 1) || (reborn && getPlayer().getKeyValue2("hyper170") != 2)) {
                getPlayer().setKeyValue2("hyper170", reborn ? 2 : 1);
                getPlayer().setKeyValue2("hyper1", getPlayer().getKeyValue2("hyper1") + 1);
                getPlayer().setKeyValue2("hyper3", getPlayer().getKeyValue2("hyper3") + 1);
            }
        }
        if (getPlayer().getLevel() >= 180) {
            if ((!reborn && getPlayer().getKeyValue2("hyper180") != 1) || (reborn && getPlayer().getKeyValue2("hyper180") != 2)) {
                getPlayer().setKeyValue2("hyper180", reborn ? 2 : 1);
                getPlayer().setKeyValue2("hyper2", getPlayer().getKeyValue2("hyper3") + 1);
            }
        }
        if (getPlayer().getLevel() >= 190) {
            if ((!reborn && getPlayer().getKeyValue2("hyper190") != 1) || (reborn && getPlayer().getKeyValue2("hyper190") != 2)) {
                getPlayer().setKeyValue2("hyper190", reborn ? 2 : 1);
                getPlayer().setKeyValue2("hyper1", getPlayer().getKeyValue2("hyper1") + 1);
                getPlayer().setKeyValue2("hyper2", getPlayer().getKeyValue2("hyper2") + 1);
            }
        }
        if (getPlayer().getLevel() >= 200) {
            if ((!reborn && getPlayer().getKeyValue2("hyper200") != 1) || (reborn && getPlayer().getKeyValue2("hyper200") != 2)) {
                getPlayer().setKeyValue2("hyper200", reborn ? 2 : 1);
                getPlayer().setKeyValue2("hyper1", getPlayer().getKeyValue2("hyper1") + 1);
                getPlayer().setKeyValue2("hyper2", getPlayer().getKeyValue2("hyper2") + 1);
                getPlayer().setKeyValue2("hyper3", getPlayer().getKeyValue2("hyper3") + 1);
            }
        }
        getPlayer().setKeyValue2("hyper", 1);
        return "성공적으로 하이퍼 스킬 SP가 지급되었습니다.";
    }

    public void ItemName(MapleCharacter player, byte pos, final String name) {
        MapleInventory equip = player.getInventory(MapleInventoryType.EQUIP);
        Equip eq = (Equip) equip.getItem(pos);
        eq.setOwner(name);
    }

    public String ItemList(MapleClient c, String error) {
        boolean a = false;
        StringBuilder str = new StringBuilder();
        MapleInventory equip = c.getPlayer().getInventory(MapleInventoryType.EQUIP);
        List<String> stra = new LinkedList<String>();
        for (IItem item : equip.list()) {
            stra.add("#L" + item.getPosition() + "##v" + item.getItemId() + "##l\r\n");
            a = true;
        }
        if (!a) {
            stra.add(error);
            NPCScriptManager.getInstance().dispose(c);
        }
        for (String strb : stra) {
            str.append(strb);
        }
        return str.toString();
    }

    public String 마스터리북() {
        MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr("" + getJob(), '0', 3) + ".img");
        int a = 0;
        StringBuilder str = new StringBuilder();
        for (MapleData skill : data) {
            if (skill != null) {
                for (MapleData skillId : skill.getChildren()) {
                    if (!skillId.getName().equals("icon")) {
                        byte maxlevel = (byte) MapleDataTool.getIntConvert("maxLevel", skillId.getChildByPath("common"), 0);
                        if (MapleDataTool.getIntConvert("invisible", skillId, 0) == 0 && !(MapleDataTool.getIntConvert("reqLev", skillId, 0) > 0) && Integer.parseInt(skillId.getName()) != 12110025 && Integer.parseInt(skillId.getName()) != 12101022) {
                            try {
                                if (getPlayer().getSkillLevel(Integer.parseInt(skillId.getName())) < maxlevel) {
                                    a++;
                                    str.append("#L" + Integer.parseInt(skillId.getName()) + "# #s" + Integer.parseInt(skillId.getName()) + "# #fn돋움##fs14##e#q" + Integer.parseInt(skillId.getName()) + "##n#fs##fn##l\r\n");
                                }
                            } catch (NumberFormatException e) {
                                continue;
                            }
                        }
                    }
                }
            }
        }
        if (a == 0) {
            str.append("#fn돋움##fs14##e더이상 마스터할 스킬이 없습니다.#n#fs##fn#\r\n");
        }
        return str.toString();
    }

    public String SoulItemList(MapleClient c, String b) {
        boolean a = false;
        String end;
        StringBuilder str = new StringBuilder();
        MapleInventory equip = c.getPlayer().getInventory(MapleInventoryType.EQUIP);
        List<String> stra = new LinkedList<String>();
        for (IItem item : equip.list()) {
            Equip eq = (Equip) equip.getItem(item.getPosition());
            if (eq.getSoulEnchanter() != 0) {
                stra.add("#b#L" + item.getPosition() + "##i" + item.getItemId() + "##t" + item.getItemId() + "##l\r\n");
                a = true;
            }
        }
        if (a) {
            for (String strb : stra) {
                str.append(strb);
            }
            end = b + "\r\n\r\n#b" + str;
            return end;
        } else {
            StringBuilder str1 = new StringBuilder();
            str1.append("소울을 감정할 아이템이 존재하지 않습니다.");
            return str1.toString();
        }
    }

    public String SoulItem(byte pos, boolean a) {
        MapleInventory equip = getPlayer().getInventory(MapleInventoryType.EQUIP);
        Equip eq = (Equip) equip.getItem(pos);
        if (a) {
            return "" + eq.getSoulSkill();
        } else {
            return "" + eq.getSoulEnchanter();
        }
    }

    public String getSoulSkillName(int i) {
        return SkillFactory.getSkillName(i);
    }

    public void showMessage(String txt) {
        getPlayer().send(MainPacketCreator.showQuestMessage(txt));
    }

    public void openDuey(boolean item) {
        if (getPlayer().getLevel() >= 120) {
            getPlayer().send(DueyHandler.sendDuey(item ? 10 : 9, getPlayer().getName()));
        } else {
            getPlayer().dropMessage(1, "레벨 120 이상부터 사용이 가능 합니다.");
            getPlayer().ea();
        }
    }

    public void BuyPET(int Petitem) {
        int uniqueid = Petitem;
        Item itemr = new Item(Petitem, (short) 1, (short) 1, (short) 0);
        itemr.setExpiration(2475606994921L);
        final MaplePet pet = MaplePet.createPet(Petitem, itemr.getExpiration());
        itemr.setPet(pet);
        itemr.setUniqueId(pet.getUniqueId());
        InventoryManipulator.addbyItem(c, itemr);
        InventoryManipulator.addFromDrop(getClient(), itemr, false);
    }

    public int AverageLevel(MapleCharacter chr) {
        int a = 0;
        for (final MapleCharacter partymem : chr.getClient().getChannelServer().getPartyMembers(chr.getParty())) {
            a += partymem.getLevel();
        }
        return (a / chr.getParty().getMembers().size());
    }

    public void startTime() {
        getPlayer().time = System.currentTimeMillis();
    }

    public int getTime() {
        return (int) ((System.currentTimeMillis() - getPlayer().time) / 1000);
    }

    public void openAuction() {
        c.getSession().writeAndFlush(UIPacket.OpenUI((byte) 0xA1));
    }

    public void HyperSkillMax() {
        MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr("" + c.getPlayer().getJob(), '0', 3) + ".img");
        final Skill skills = null;
        byte maxLevel = 0;
        for (MapleData skill : data) {
            if (skill != null) {
                for (MapleData skillId : skill.getChildren()) {
                    if (!skillId.getName().equals("icon")) {
                        maxLevel = (byte) MapleDataTool.getIntConvert("maxLevel", skillId.getChildByPath("common"), 0);
                        if (MapleDataTool.getIntConvert("invisible", skillId, 0) == 0 && MapleDataTool.getIntConvert("reqLev", skillId, 0) > 0) { //스킬창에 안보이는 스킬은 올리지않음
                            if (c.getPlayer().getLevel() >= MapleDataTool.getIntConvert("reqLev", skillId, 0)) {
                                c.getPlayer().changeSkillLevel(SkillFactory.getSkill(Integer.parseInt(skillId.getName())), maxLevel, SkillFactory.getSkill(Integer.parseInt(skillId.getName())).isFourthJob() ? maxLevel : 0);
                            }
                        }
                    }
                }
            }
        }
    }

    public void sendGuide() {
        String[][] list = {{"안녕하세요 #rMAPLE ONLINE#k을 안내해줄 운영자 입니다.", "1500"},
        {"#rMAPLE ONLINE#k은 스킬마스터 시스템을 사용중이며 #b@스킬마스터#k\r\n명령어로 사용 가능합니다.", "4000"}};
        for (String[] txt : list) {
            c.getSession().writeAndFlush(MainPacketCreator.OnAddPopupSay(9062000, Integer.parseInt(txt[1]), txt[0], ""));
        }
    }

    public void startDamageMeter() {
        resetMap(120000102);
        final OverrideMonsterStats overrideStats = new OverrideMonsterStats(Long.MAX_VALUE, 1, 0, false);
        MapleMonster mob = MapleLifeProvider.getMonster(1210102);
        mob.setHp(Long.MAX_VALUE);
        mob.setOverrideStats(overrideStats);
        mob.setScale(300);
        c.getChannelServer().getMapFactory().getMap(120000102).spawnMonsterOnGroundBelow(mob, new Point(6, 150));
        warp(120000102);
        c.getPlayer().setDamageMeter(0);
        c.getSession().writeAndFlush(MainPacketCreator.getClock(180));
        final int cRand = Randomizer.nextInt();
        c.getPlayer().setWarpRand(cRand);

        MapTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                if (cRand == c.getPlayer().getWarpRand()) {
                    int id = getDamageMeterRankerId();
                    initDamageMeter(c.getPlayer().getId(), c.getPlayer().getName(), c.getPlayer().getDamageMeter());
                    c.getPlayer().dropMessage(5, "누적 데미지 : " + c.getPlayer().getDamageMeter() + " 기록이 저장 되었습니다.");
                    c.getPlayer().setDamageMeter(0);
                    c.getPlayer().setWarpRand(-1);
                    warp(ServerConstants.mainMap);
                    if (isDamageMeterRanker(c.getPlayer().getId())) {
                        if (id != -1) {
                            for (ChannelServer cs : ChannelServer.getAllInstances()) {
                                for (MapleCharacter chr : cs.getPlayerStorage().getAllCharacters().values()) {
                                    if (chr.getId() == id) {
                                        chr.removeAllEquip(1142187, false);
                                        chr.dropMessage(5, "ZI존 딜량1등 자격이 박탈되어, 칭호가 회수되었습니다.");
                                    }
                                }
                            }
                        }
                        WorldBroadcasting.broadcastMessage(MainPacketCreator.OnAddPopupSay(9000036, 3000, "#b" + c.getPlayer().getName() + "#k님이 새로운 #e딜량 미터기 1위#k가 되었습니다.", ""));
                     //   gainItemAllStat(1142187, (short) 1, (short) 100, (short) 30);
                    }
                }
            }
        }, 180 * 1000);
    }

    void initDamageMeter(int cid, String name, long damage) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM damagerank WHERE cid = ?");
            ps.setInt(1, cid);
            ps.executeUpdate();
            ps.close();
            ps = con.prepareStatement("INSERT INTO damagerank(cid, name, damage) VALUES (?, ?, ?)");
            ps.setInt(1, cid);
            ps.setString(2, name);
            ps.setLong(3, damage);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public String DamageMeterRank() {
        String text = "#b";
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM damagerank ORDER BY damage DESC LIMIT 10");
            ResultSet rs = ps.executeQuery();
            int i = 1;
            while (rs.next()) {
                text += "#r#e" + (i != 10 ? "0" : "") + i + "#n#b위 #r닉네임#b " + rs.getString("name") + " #r누적 데미지#b " + Comma(rs.getLong("damage")) + "\r\n";
                i++;
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        if (text.equals("#b")) {
            text = "#r아직까지 딜량 미터기를 갱신한 유저가 없습니다.";
        }
        return text;
    }

    public boolean isDamageMeterRanker(int cid) {
        boolean value = false;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM damagerank ORDER BY damage DESC LIMIT 1");
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                if (rs.getInt("cid") == cid) {
                    value = true;
                }
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return value;
    }

    public int getDamageMeterRankerId() {
        int value = -1;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM damagerank ORDER BY damage DESC LIMIT 1");
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                value = rs.getInt("cid");
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return value;
    }

    public void gainItemAllStat(int itemid, short quantity, short allstat) {
        gainItemAllStat(itemid, quantity, allstat, (short) -1);
    }

    public void gainItemAllStat(int itemid, short quantity, short allstat, short wmtk) {
        Equip equip = new Equip(itemid, quantity, (byte) 0);
        equip.setStr(allstat);
        equip.setDex(allstat);
        equip.setInt(allstat);
        equip.setLuk(allstat);
        if (wmtk != -1) {
            equip.setWatk(wmtk);
            equip.setMatk(wmtk);
        }
        InventoryManipulator.addFromDrop(c, equip, true);
    }

    public void gainHongboJangbi(int itemId, short quantity) {
        Equip equip = new Equip(itemId, quantity, (byte) 0);
        equip.setStr((short) 100);
        equip.setDex((short) 100);
        equip.setInt((short) 100);
        equip.setLuk((short) 100);
        equip.setWatk((short) 10);
        equip.setMatk((short) 10);
        InventoryManipulator.addFromDrop(c, equip, true);
    }

    public void gainHongboJangbi1(int itemId, short quantity) {
        Equip equip = new Equip(itemId, quantity, (byte) 0);
        equip.setStr((short) 100);
        equip.setDex((short) 100);
        equip.setInt((short) 100);
        equip.setLuk((short) 100);
        equip.setWatk((short) 10);
        equip.setMatk((short) 10);
        InventoryManipulator.addFromDrop(c, equip, true);
    }

    public boolean isNamedTimeOver() {
        String[] ret = Named.namedTime.replaceAll("분", "").replaceAll("초", "").split(" ");
        int v1 = Integer.parseInt(ret[0]) * (1000 * 60);
        int v2 = Integer.parseInt(ret[1]) * 1000;
        return (v1 + v2) <= 40000;
    }

    public void setJagure(int mobid) {
        getPlayer().setKeyValue2("CapturedJaguar", mobid);
        getPlayer().send(MainPacketCreator.updateJaguar(getPlayer()));
    }

    public int getConnect() {
        return WorldConnected.getConnectedi();
    }

    public void snedPacket(short header, String hex) {
        WritingPacket p = new WritingPacket();
        p.writeShort(header);
        p.write(HexTool.getByteArrayFromHexString(hex));
        c.getSession().writeAndFlush(p.getPacket());
    }

    public String getCashEquipList() {
        String text = "";
        for (IItem item : getPlayer().getInventory(MapleInventoryType.EQUIPPED).list()) {
            if (ItemInformation.getInstance().getEquipStats(item.getItemId()).get("cash") > 0) {
                text += "#L" + item.getPosition() + "# #i" + item.getItemId() + "# #t" + item.getItemId() + "##l\r\n";
            }
        }
        return text;
    }

    public void renewCashPotential(short pos) {
        Equip item = (Equip) getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(pos);
        if (item != null) {
            if (item.getState() != 0) {
                item.renewPotential();
            } else {
                item.setState((byte) 1);
            }
            if (item.getState() == 1) { //레어
                int rand = Randomizer.nextInt(100);
                if (rand < 5) { //에픽
                    item.setState((byte) 18);
                } else if (rand < 3) { //유니크
                    item.setState((byte) 19);
                } else {
                    item.setState((byte) 17);
                }
            } else {
                item.setState((byte) (item.getState() + 16));
            }
            int level = item.getState() - 16;
            int temp = level;
            int a = 0;
            while (temp > 1) {
                if (temp > 1) {
                    --temp;
                    ++a;
                }
            }
            item.setPotential1(potential(level, a, true, item.getItemId()));
            item.setPotential2(potential(level, a, false, item.getItemId()));
            getPlayer().getMap().broadcastMessage(MainPacketCreator.showCubeEffect(getPlayer().getId(), 2430091));
            getPlayer().forceReAddItem(item, MapleInventoryType.EQUIPPED);
        }
    }
    
    public void SearchItem(String gomgo) {
        NPCConversationManager cm = this;
        if (gomgo.getBytes().length < 4) {
            cm.sendOk("검색어는 2글자 이상이어야 합니다.");
            cm.dispose();
            return;
        }
        c.send(UIPacket.greenShowInfo(gomgo + "(으)로 검색중입니다. 잠시만 기다려주세요."));
        String chat = "";
        ItemInformation ii = ItemInformation.getInstance();
        int g = 0;
        List<String> retItems = new ArrayList<String>();
        for (Pair<Integer, String> itemPair : ItemInformation.getInstance().getAllEquips()) {
            if (itemPair.getRight().toLowerCase().contains(gomgo.toLowerCase())) {
                if (ii.isCash(itemPair.getLeft())) {
                    if (itemPair.getLeft() / 100000 >= 1) {
                        chat += "#L" + itemPair.getLeft() + "# #i" + itemPair.getLeft() + "# #fs14##b" + itemPair.getRight() + "#fs12##k#l\r\n";
                        g++;
                    }
                }
            }
        }
        if (g != 0) {
            cm.sendSimple(chat);
        } else {
            chat = "발견된 아이템이 없습니다.";
            cm.sendOk(chat);
            cm.dispose();
        }
    }

    public String ElevenString() {
        String chat = "";
        int itemlist[] = {1004172, 1102691, 1052758, 1212095, 1222089, 1232089, 1242095, 1302304, 1312179, 1322230, 1332254, 1342094, 1362115, 1372201, 1382239, 1402229, 1412158, 1422165, 1432194, 1442248, 1452232, 1462219, 1472241, 1482196, 1492205, 1522118, 1532124, 1012471, 1122280, 1142724};
        for (int i = 0; i < itemlist.length; i++) {
            chat += "#L" + itemlist[i] + "##i" + itemlist[i] + "##b#fs15#(#z" + itemlist[i] + "#)#k#l\r\n";
        }
        return chat;
    }

    public String MIBCoinShop() {
        String chat = "";
        int itemlist[] = {4001780, 2049360, 2450087, 1122076, 4001254};
        for (int i = 0; i < itemlist.length; i++) {
            chat += "#L" + itemlist[i] + "##i" + itemlist[i] + "##b(#z" + itemlist[i] + "#)#k - 지급받기\r\n#l";
        }
        return chat;
    }

    public void gainCoinShop(int itemId) {
        int itemlist[][] = {
            {4001780, 50, 1, 0, 0},
            {2049360, 100, 10, 0, 0},
            {2450087, 150, 5, 0, 0},
            {1122076, 200, 1, 200, 100},
            {4001254, 300, 1, 0, 0}
        };

        if (!getPlayer().haveItem(4310038, itemlist[itemId][1], false, true)) {
            sendOk("#i4310038#(#z4310038#) " + itemlist[itemId][1] + "개의 코인이 필요합니다");
            dispose();
            return;
        }
        if (GameConstants.isEquip(itemId)) {
            Equip equip = (Equip) ItemInformation.getInstance().getEquipById(itemlist[itemId][0]);
            equip.addStr((short) itemlist[itemId][3]);
            equip.addDex((short) itemlist[itemId][3]);
            equip.addInt((short) itemlist[itemId][3]);
            equip.addLuk((short) itemlist[itemId][3]);
            equip.addMatk((short) itemlist[itemId][4]);
            equip.addWatk((short) itemlist[itemId][4]);
            InventoryManipulator.addFromDrop(c, equip, false);
        } else {
            gainItem(itemlist[itemId][0], (short) itemlist[itemId][2]);
        }
        gainItem(4310038, (short) -itemlist[itemId][1]);
        getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + ItemInformation.getInstance().getName(itemlist[itemId][0]) + "] 아이템을 구매 하였습니다...."));
    }

    public String DamageSkinShop() {
        String chat = "";
        // 5680343, 2431965, 2431966, 2431967, 2432084, 2432131, 2432153, 2432154, 2432207, 2432354, 2432355, 2432465, 2432479, 2432526, 2432532, 2432592, 2432637, 2432638, 2432639, 2432640, 2432658, 2432659, 2432660, 2432661, 2432710, 2432836, 2432972, 2432973, 2433063, 2433178, 2433456, 2433715, 2433804, 2433919, 2433990, 2434248, 2434274, 2434289, 2434390, 2434391, 2434528, 2434529, 2434530, 2434574, 2434575, 2434654, 2434655, 2434661, 2434734, 2434950, 2434951, 2435005, 2435023, 2435024, 2435025, 2435026, 2435027, 2435028, 2435029, 2435030, 2435043, 2435044, 2435045, 2435046, 2435047, 2435140, 2435141, 2435157, 2435158, 2435159, 2435160, 2435161, 2435162, 2435166, 2435168, 2435169, 2435170, 2435171, 2435172, 2435173, 2435174, 2435175, 2435176, 2435177, 2435179, 2435182, 2435184, 2435222, 5680395, 2433631, 2433655, 2433913, 2433980, 2433981, 2434273, 2434542, 2434546, 2434710, 2434824
        // 치우씨 :: 테설님 USFM 자료 데미지스킨
        int itemlist[] = {2431965,2431966,2431967,2432084,2432131,2432153,2432154,2432207,2432354,2432355,2432465,2432479,2432526,2432532,2432592,2432637,2432638,2432639,2432640,2432658,2432659,2432660,2432661,2432710,2432836,2432972,2432973,2433063,2433178,2433456,2433631,2433655,2433715,2433804,2433913,2433919,2433980,2433981,2433990,2434248,2434273,2434274,2434289,2434390,2434391,2434528,2434529,2434530,2434542,2434546,2434574,2434575,2434654,2434655,2434661,2434710,2434734,2434824,2434950,2434951,2435023,2435024,2435025,2435026,2435027,2435028,2435029,2435030,2435043,2435044,2435045,2435046,2435047,2435140,2435141,2435157,2435158,2435159,2435160,2435161,2435162,2435166,2435168,2435169,2435170,2435171,2435172,2435173,2435174,2435175,2435176,2435177,2435179,2435182,2435184,2435222,2435293,2435313,2435316,2435325,2435326,2435331,2435332,2435333,2435334,2435408,2435424,2435425,2435427,2435428,2435429,2435430,2435431,2435432,2435433,2435456,2435461,2435473,2435474,2435477,2435478,2435490,2435491,2435493,2435516,2435521,2435522,2435523,2435524,2435538,2435972,2436023,2436024,2436026,2436027,2436028,2436029,2435832,2435833,2435839,2435840,2435841,2436045,2436083,2436084,2436085,2436098,2436103,2436140,2436182,2436206,2436212,2436215,2435905,2435906,2435948,2435949,2435955,2435956,2436132,2436258,2436259,2436268,2436400,2436437,2436521,2436522,2436528,2436529,2436553,2436560,2436578,2436596,2436611,2436612,2436679,2436680,2436681,2436682,2436683,2436684,2436785,2436810,2436951,2436952,2436953,2437009,2437022,2437023,2437024,2437164,2437238,2437239,2437243,2437482,2437495,2437496,2437498,2437515,2437691,2437877,2438143,2438144,2438352,2438378,2438379,2438413,2438415,2438417,2438419,2438460};
        for (int i = 0; i < itemlist.length; i++) {
            chat += "#L" + itemlist[i] + "##i" + itemlist[i] + "##b(#z" + itemlist[i] + "#)#k - 지급받기\r\n#l";
        }
        return chat;
    }

    public String rebornShop() {
        String chat = "";
        int itemlist[][] = {
            {2450087, 1, 500},
            {5050100, 1, 1000},
            {4033427, 30, 1000},
            {4001716, 1, 3000},
            {2048718, 10, 3000},
            {4001254, 1, 5000},
            {3015246, 1, 7000},
            {2590007, 1, 1000},
            {1112141, 1, 15000},
            {1112585, 1, 30000},
            {2430226, 1, 30000},
            {1142607, 1, 100000},};

        for (int i = 0; i < itemlist.length; i++) {
            chat += "#L" + i + "##e#r환생포인트 " + itemlist[i][2] + "점 - #i" + itemlist[i][0] + "#(#z" + itemlist[i][0] + "#) " + itemlist[i][1] + "개 교환#k#n\r\n";
        }

        return chat;
    }

    public void gainRebornShop(final int itemId) {
        int itemlist[][] = {
            {2450087, 1, 500, 0, 0},
            {5050100, 1, 1000, 0, 0},
            {4033427, 30, 1000, 0, 0},
            {4001716, 1, 3000, 0, 0},
            {2048718, 10, 3000, 0, 0},
            {4001254, 1, 5000, 0, 0},
            {3015246, 1, 7000, 0, 0},
            {2590007, 1, 1000, 0, 0},
            {1112141, 1, 15000, 5000, 1000},
            {1112585, 1, 30000, 3000, 1000},
            {2430226, 1, 30000, 0, 0},
            {1142607, 1, 100000, 20000, 5000}};

        if (getPlayer().getGP() < itemlist[itemId][2]) {
            getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + ItemInformation.getInstance().getName(itemlist[itemId][0]) + "] 아이템은 환생포인트가 부족하여 구매 하실 수 없습니다..."));
            dispose();
            return;
        }

        if (GameConstants.isEquip(itemlist[itemId][0])) {
            Equip equip = (Equip) ItemInformation.getInstance().getEquipById(itemlist[itemId][0]);
            equip.setStr((short) itemlist[itemId][3]);
            equip.setDex((short) itemlist[itemId][3]);
            equip.setInt((short) itemlist[itemId][3]);
            equip.setLuk((short) itemlist[itemId][3]);
            equip.setMatk((short) itemlist[itemId][4]);
            equip.setWatk((short) itemlist[itemId][4]);
            InventoryManipulator.addFromDrop(c, equip, false);
        } else {
            gainItem(itemlist[itemId][0], (short) itemlist[itemId][1]);
        }
        getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + ItemInformation.getInstance().getName(itemlist[itemId][0]) + "] 아이템을 구매 하였습니다...."));
        getPlayer().gainGP(-itemlist[itemId][2]);

        /*if (getPlayer().getGP() < itemlist[itemId][2]) {
            getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + ItemInformation.getInstance().getName(itemlist[itemId][0]) + "] 아이템은 환생포인트가 부족하여 구매 하실 수 없습니다..."));
            dispose();
            return;
        }
        getPlayer().gainItem(itemlist[itemId][0], itemlist[itemId][1]);
        getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + ItemInformation.getInstance().getName(itemlist[itemId][0]) + "] 아이템을 구매 하였습니다...."));
        getPlayer().gainGP(-itemlist[itemId][2]);*/
    }

    public void ChaosBossSpawn(final int map) {
        int partypass = 0;
        int mapid[] = {
            240020401, // 마뇽
            240020102, // 그리프
            230040420, // 피아누스
            220080001, // 파폴라투스
            280030100, // 자쿰
            280030000, // 카오스 카쿰
            240060200, // 혼테일
            240060201, // 카오스 혼테일
            270050100, // 핑크빈            
            271040100, // 시그너스
            105200210, // 블러디 퀸(미적용)
            105200710, // 카오스 블러디 퀸
            105200110, // 반반
            105200510, // 카오스 반반
            105200210, // 붉은 피에르
            105200610, // 붉은 카오스 피에르
            105200410, // 벨륨
            105200810, // 카오스 벨륨
            262031300, // 힐라
            262031300, // 위대한 힐라
            211070100, // 반 레온
            401060300, // 매그너스
            272020210, // 아카이럼
            993000500, // 불꽃늑대
            350060160, // 스우
            209000100, // 루시드
            350160140, // 데미안
            940200204, // 악령
            970072300, // 우르스
                      };

        int mobCode[][] = {
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 마뇽 1
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 그리프 2
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 피아누스 3
            {100004, -362, -462, 99, 10}, // 파폴라투스 - x : -362, y : -462 4
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 자쿰 5
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 카오스 자쿰 6
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 혼테일 7
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 카오스 혼테일 8
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 핑크빈 9
            {100004, 97, 3, 99, 10}, // 시그너스 - x : 97, y : 3 10
            {100004, 535, 435, 99, 10}, // 블러디 퀸 11
            {100004, 65, 35, 99, 10}, // 카오스 블러디 퀸 12
            {100004, 535, 435, 99, 10}, // 반반 13
            {100004, -229, -329, 99, 10}, // 카오스 반반 14
            {100004, 535, 435, 99, 10}, // 붉은 피에르 - x : 1371, y : 1271 15
            {100004, 545, 445, 99, 10}, // 카오스 붉은 피에르 16
            {100004, 535, 435, 99, 10}, // 벨룸 17
            {100004, -695, -795, 99, 10}, // 카오스 벨륨 18
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 힐라 19
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 위대한 힐라 20
            {100004, -46, -146, 99, 10}, // 반 레온 - x : -46, y : -146 21
            {100004, 1650, -1347, 99, 10}, //매그너스 22
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 99, 10}, // 아카이럼 23
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 219, 10}, // 불꽃늑대 24
            {100004, 5, -14, 219, 10}, // 스우 - x : 5, y : -14 25
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 219, 10}, // 루시드 26
            {100004, 1206, 1306, 219, 10}, // 데미안 - x :, y :    27
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 219, 10}, //악령 28
            {100004, c.getPlayer().getPosition().x, c.getPlayer().getPosition().y, 219, 10} }; //우르스 29

        int time[] = {
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,
        10800,};

        String bossMessage[] = {
            "" + getPlayer().getName() + "님 마뇽 보스 인스턴스에 입장하신것을 환영합니다.",
            "" + getPlayer().getName() + "님 그리프 보스 인스턴스에 입장하신것을 환영합니다.",
            "" + getPlayer().getName() + "님 피아누스 보스 인스턴스에 입장하신것을 환영합니다.",
            "" + getPlayer().getName() + "님 파폴라투스 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 자쿰 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 카오스 자쿰 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 혼테일 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 카오스 혼테일 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 핑크빈 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 시그너스 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 블러디 퀸 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 카오스 블러디 퀸 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 반반 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 카오스 반반 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 붉은 피에르 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 카오스 피에르 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 벨륨 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 카오스 벨륨 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 힐라 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 위대한 힐라 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 반 레온 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 매그너스 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 아카이럼 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 불꽃늑대 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 스우 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 루시드 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 데미안 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 악령 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",
            "" + getPlayer().getName() + "님 우르스 보스 인스턴스에 입장하신것을 환영합니다. 맵안에 있는 엔피시를 클릭해주십시오.",};

        if (getParty() == null) {
            sendOk("파티로만 입장 하실 수 있습니다.");
            dispose();
            return;
        }

        if (!isLeader()) {
            sendOk("파티장이 입장신청을 할 수 있습니다.");
            dispose();
            return;
        }

        if (!allMembersHere()) {
            sendOk("파티원이 전원 이곳에 모여있어야 합니다.");
            dispose();
            return;
        }

        if (partypass == 0) {
            String 말 = "파티원 중 #b#e";
            for (int i = 0; i < getPartyMembers().size(); i++) {
                if (getPlayer().getParty().getMemberByIndex(i).getLevel() <= mobCode[map][3]) {
                    int h = 0;
                    partypass = 1;
                    h++;
                    말 += "" + getPlayer().getParty().getMemberByIndex(i).getName() + ",";
                    if (h != getPartyMembers().size()) {
                    }
                }
            }
            말 += "#n#k님은 레벨이 만족하지 않아서 불가능합니다.";
            if (partypass == 1) {
                sendOk(말);
                dispose();
            } else {
                MapleMonster mob;
                MapleMonster monster = MapleLifeProvider.getMonster(mobCode[map][0]);
                if (getClient().getChannelServer().getMapFactory().getMap(mapid[map]).getAllMonster().size() < 1) {
                    for (final MapleCharacter partymem : getClient().getChannelServer().getPartyMembers(getPlayer().getParty())) {
                        c.getPlayer().getMap().killAllMonsters(true);
                        partymem.timeMoveMap(970060000, mapid[map], time[map]);
                        partymem.Message(8, bossMessage[map]);
                    
                    }
                    //getPlayer().getMap().spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobCode[map][0]), new Point(mobCode[map][1], mobCode[map][2]));
                } else {
                    getPlayer().timeMoveMap(970060000, mapid[map], time[map]);
                    dispose();
                }
            }
        }

    }

    public void moneyBuff(int skillid) {
        String value[] = {
            "rc_shot",
            "stance",
            "holysymbol",
            "SharpEyes",
            "PartyBooster",
            "ShadowPartner",
            "TrifleWorm",
            "MagicArrow",
            "noir",
            "bling",
            "kinesis"
        };

        int moneybuff[][] = {
            {5321054, 50000},
            {80001140, 10000},
            {2311003, 30000},
            {3121002, 10000},
            {5121009, 10000},
            {4331002, 1000},
            {13101022, 20000},
            {3100010, 20000},
            {24120002, 20000},
            {24100003, 20000},
            {142110011, 20000}};
        if (getRC() < moneybuff[skillid][1]) {
            getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + SkillFactory.getSkillName(moneybuff[skillid][0]) + "] 버프는 후원포인트가 부족하여 구매 하실 수 없습니다..."));
            dispose();
            return;
        }
        if (getPlayer().getKeyValue(value[skillid]) != null) {
            getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + SkillFactory.getSkillName(moneybuff[skillid][0]) + "] 버프는 이미 구매하여 구매 하실 수 없습니다..."));
            dispose();
            return;
        }
        getPlayer().setKeyValue(value[skillid], "ture");
        loseRC(moneybuff[skillid][1]);
        getPlayer().unlockMaxDamage();
        getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + SkillFactory.getSkillName(moneybuff[skillid][0]) + "] 버프를 구매 완료 하였습니다.."));
        dispose();
    }

    public void RadWeaponShopGain(int itemid) {
        int itemlist[] = {
            1402214, // 레드 투핸드 소드
            1422156, // 레드 모울
            1472230, // 레드 스티어
            1332242, // 레드 커터
            1342087, // 레드 블레이드
            1382226, // 레드 스태프
            1492194, // 레드 건
            1462208, // 레드 크로스보우
            1452220, // 레드 보우
            1532112, // 레드 캐논
            1432182, // 레드 스피어
            1482183, // 레드 너클
        };
        if (!getPlayer().haveItem(4310129, 50, false, true)) {
            sendOk("코인이 부족하여 아이템을 구매 하실 수 없습니다.");
            dispose();
            return;
        }
        gainItem(4310129, (short) -50);
        if (GameConstants.isEquip(itemlist[itemid])) {
            Equip Item = (Equip) ItemInformation.getInstance().getEquipById(itemlist[itemid]);
            Item.addStr((short) 300);
            Item.addDex((short) 300);
            Item.addInt((short) 300);
            Item.addLuk((short) 300);
            Item.addWatk((short) 300);
            Item.addMatk((short) 400);
            InventoryManipulator.addFromDrop(c, Item, false);
        } else {
            gainItem(itemlist[itemid], (short) 1);
        }
        getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + ItemInformation.getInstance().getName(itemlist[itemid]) + "] 아이템을 구매 하였습니다...."));

    }

    public void gainInsItem(int selection) {
        int itemlist[] = {3015873, 3015788, 3015564, 3016200, 3015646, 3015643, 3015705, 3015844, 3015387, 3015388, 3015389, 3015390, 3015391, 3015392, 3017011, 3017012, 3017013, 3017014, 3017015, 3017016};
        if (!getPlayer().haveItem(4033247, 1000, false, true)) {
            sendOk("#r#i4033247#(#z4033247#) - 1000개가 필요합니다#k");
            dispose();
            return;
        }
        gainItem(4033247, (short) -1000);
        gainItem(itemlist[selection], (short) 1);
        getClient().getSession().writeAndFlush(UIPacket.greenShowInfo("선택하신 [" + ItemInformation.getInstance().getName(itemlist[selection]) + "] 아이템을 구매 하였습니다...."));
    }

    public void CollectivelyShop(int shopid, int npcid) {
        int shoplist[] = {
            // 모든 직업 상점 시작

            10021, // 전사 - 모자 상점
            10018, // 전사 - 상의 상점
            10017, // 전사 - 하의 상점
            10016, // 전사 - 신발 상점
            10019, // 전사 - 전신 상점
            10020, // 전사 - 장갑 상점
            10022, // 전사 - 방패 상점

            3000136, // 전사 - 데스페라도 상점
            10023, // 전사 - 한손 도끼 상점
            10024, // 전사 - 두손 도끼 상점
            10025, // 전사 - 한손 둔기 상점
            10026, // 전사 - 두손 둔기 상점
            10027, // 전사 - 한손검 상점
            10028, // 전사 - 두손검 상점
            10029, // 전사 - 창
            10030, // 전사 - 폴암

            10003, // 법사 - 모자 상점
            10001, // 법사 - 전신 상점 
            10123, // 법사 - 상의 상점
            12124, // 법사 - 하의 상점
            10000, // 법사 - 신발 상점
            10002, // 법사 - 장갑 상점
            10004, // 법사 - 방패 상점

            3000137, // 법사 - 샤이닝 로드 상점
            10125, // 법사 - 드래곤 장비 상점
            10005, // 법사 - 완드
            10006, // 법사 - 스태프

            10034, // 궁수 - 모자 상점
            10121, // 궁수 - 상의 상점
            10122, // 궁수 - 하의 상점
            10032, // 궁수 - 전신 상점
            10031, // 궁수 - 신발 상점
            10033, // 궁수 - 장갑 상점

            10035, // 궁수 - 활 상점
            10036, // 궁수 - 석궁 상점
            10108, // 궁수 - 듀얼궁 상점
            10110, // 궁수 - 마법화살 상점
            10037, // 궁수 - 화살 상점

            10012, // 도적 - 모자 상점
            10008, // 도적 - 상의 상점
            10009, // 도적 - 하의 상점
            10010, // 도적 - 전신 상점
            10007, // 도적 - 신발 상점
            10011, // 도적 - 장갑 상점
            10013, // 도적 - 방패 상점

            3000135, // 도적 - 에너지소드 상점
            10014, // 도적 - 단검 상점
            10015, // 도적 - 아대 상점
            10106, // 도적 - 블레이드 상점
            10109, // 도적 - 케인 상점
            2003, // 도적 - 카드 상점
            10038, // 도적 - 표창 상점

            10090, // 해적 - 모자상점
            10091, // 해적 - 전신상점
            10093, // 해적 - 신발상점
            10092, // 해적 - 장갑상점

            10087, // 해적 - 너클상점
            10088, // 해적 - 총상점
            10107, // 해적 - 핸드캐논상점
            11100, // 해적 - 소울슈터상점
            10089, // 해적 - 볼릿상점

            // 모든 직업 상점 종료

            // 세트 아이템 상점 시작

            1401004, // 템페스트 상점
            9250028, // 여제 상점
            2040000, // 타일런트 상점
            9250027, // 루타비스 상점
            1201002, // 앱솔랩스 상점

            9999999, // 아케인 무기 상점
            9999998, // 아케인 방어구 상점

            // 세트 아이템 상점 종료

            // 공용 상점 시작

            2232100, // 소비 상점
            8000, // 악세 상점 - 얼굴 장식
            8001, // 악세 상점 - 눈장식
            8002, // 악세 상점 - 펜던트
            8003, // 악세 상점 - 견장
            8004, // 악세 상점 - 반지
            8005, // 악세 상점 - 뱃지
            9110005, // 의자 상점

            444446, // 블래스터 무기상점
        };
        openShop(shoplist[shopid]);
        dispose();
    }

    public void sendPVP(String info, MapleCharacter chr, MapleCharacter you, int id) {
        NPCScriptManager.getInstance().start(you.getClient(), id, info, chr);
    }

    public MapleCharacter getChar(int id) {
        MapleCharacter chr = null;
        for (ChannelServer cs : ChannelServer.getAllInstances()) {
            chr = cs.getPlayerStorage().getCharacterById(id);
            if (chr != null) {
                return chr;
            }
        }
        return null;
    }

    public MapleCharacter getChar(String name) {
        return getPlayer().getMap().getCharacterByName_InMap(name);
    }

    public String isMarriCheck(final String name) {
        final MapleCharacter chr = getPlayer().getMap().getCharacterByName_InMap(name);
        if (chr == null) {
            return "상대방이 현재맵에 같이 있는게 맞나요?";
        }
        if (chr.getMid() > 0) {
            return "상대방은 이미 다른 배우자가 있습니다.";
        }
        if (chr.getGender() == getPlayer().getGender()) {
            return "동성 끼리의 결혼은 안됩니다.";
        }
        if (getPlayer().getMid() > 0) {
            return "이미 " + getPlayer().getName() + "님은 결혼하신 배우자가 계십니다만? (설마 불륜..?)";
        }
        return "";
    }

    public void startMarri(final String name) {
        final MapleCharacter chr = getPlayer().getMap().getCharacterByName_InMap(name);
        if (chr == null) {
            sendOk("그분이 현재맵에 같이 계신게 맞나요?");
            return;
        }
        getPlayer().warp(680000210);
        chr.warp(680000210);
        Marriage marri = new Marriage(getPlayer(), chr);
        marri.run();
        chr.ea();
        getPlayer().ea();
        ServerConstants.isMarri = true;
    }

    public boolean isCheckMeso() {
        boolean check = false;
        try {
            Connection connect = MYSQL.getConnection();
            PreparedStatement ps = connect.prepareCall("SELECT checkmeso FROM accounts WHERE id = ?");
            ps.setInt(1, getClient().getAccID());
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int checks = rs.getInt("checkmeso");
                if (checks > 0) {
                    check = true;
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return check;
    }

    public void setCheckMeso() {
        try {
            Connection connect = MYSQL.getConnection();
            PreparedStatement ps = connect.prepareCall("UPDATE accounts SET checkmeso = ? WHERE id = ?");
            ps.setInt(1, 1);
            ps.setInt(2, getClient().getAccID());
            ps.executeUpdate();
            ps.close();
            connect.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static boolean isCheck(int cid) {
        boolean check = false;
        try {
            Connection connect = MYSQL.getConnection();
            PreparedStatement ps = connect.prepareCall("SELECT 베팅금액 FROM totoplayer WHERE charid = ?");
            ps.setInt(1, cid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                int checks = rs.getInt("베팅금액");
                if (checks > 0) {
                    check = true;
                }
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return check;
    }

    public String getDonateList() {
        String text = "";
        for (IItem item : getPlayer().getInventory(MapleInventoryType.EQUIP).list()) {
            text += "#L" + item.getPosition() + "# #i" + item.getItemId() + "# #t" + item.getItemId() + "##l\r\n";
        }
        return text;
    }

    public void setDonateStat(short itemId, short allstat) {
        IItem item = getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(itemId);
        Equip equip = (Equip) ItemInformation.getInstance().getEquipById(item.getItemId());
        equip.setStr(allstat);
        equip.setDex(allstat);
        equip.setInt(allstat);
        equip.setLuk(allstat);
        getPlayer().dropMessage(6, "" + item.getItemId());
    }

    public void setDonateWatk(short itemId, byte damage) {
        IItem item = getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(itemId);
        Equip equip = (Equip) ItemInformation.getInstance().getEquipById(item.getItemId());
        equip.setWatk(damage);
        equip.setMatk(damage);
        getPlayer().dropMessage(6, "" + item.getItemId());
    }

    public int UserOnline() {
        return c.getChannelServer().getOnlineConnections();
    }

    public boolean itemExists(final int itemId) {
        return ItemInformation.getInstance().itemExists(itemId);
    }

    public int getTheSidTower(int i) {
        return GameConstants.getTheSidTower(i);
    }

    public int getTheSidMap(int i) {
        return GameConstants.getTheSidMap(i);
    }

    public void makeRing(int itemid, MapleCharacter chr) {
        try {
            IItem item = ItemInformation.getInstance().getEquipById(itemid);
            IItem item1 = ItemInformation.getInstance().getEquipById(itemid);
            item.setCash(true);
            item.setUniqueId(MapleItemIdenfier.getInstance().getNewUniqueId());
            item1.setCash(true);
            item1.setUniqueId(MapleItemIdenfier.getInstance().getNewUniqueId());
            MapleRing.makeRing(itemid, chr, item.getUniqueId(), item1.getUniqueId()); //내꺼
            MapleRing.makeRing(itemid, getPlayer(), item1.getUniqueId(), item.getUniqueId());//파트너꺼
            InventoryManipulator.addbyItem(getClient(), item);
            InventoryManipulator.addbyItem(chr.getClient(), item1);
            chr.reloadChar();
            reloadChar();
            sendOk("선택하신 반지를 제작 완료 하였습니다. 인벤토리를 확인해 봐주시길 바랍니다.");
            chr.dropMessage(5, getPlayer().getName() + "님으로 부터 반지가 도착 하였습니다. 인벤토리를 확인해 주시길 바랍니다.");
        } catch (Exception ex) {
            sendOk("반지를 제작하는데 오류가 발생 하였습니다.");
        }
    }

    public boolean start_DojoAgent(final boolean dojo, final boolean party) {
        if (dojo) {
            return Event_DojoAgent.warpStartDojo(c.getPlayer(), party);
        }
        return Event_DojoAgent.warpStartAgent(c.getPlayer(), party);
    }

    public void MulungRank() {
        String chat = "#e#b무릉도장 랭킹#k#n\r\n";
        try {
            int index = 0;
            Connection con = MYSQL.getConnection();
            ResultSet rs = con.prepareStatement("SELECT * FROM `mulung` order by `timeString` desc limit 30").executeQuery();
            while (rs.next()) {
                index++;
                chat += "#r#e\r\n" + index + "위#k#n #b닉네임 : " + rs.getString("name") + "#k #e클리어 시간 : " + rs.getString("timeString") + "#n";
            }
            rs.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        sendOk(chat);
    }

    public void 아르미() {
        WorldCommunity.아르미();
    }

    public void 아르미끝() {
        WorldBroadcasting.broadcastMessage(MainPacketCreator.startMapEffect("아르미 : 여러분 아쉽지만 화약이 다 떨어져 버렸어요 ㅠ.ㅠ 다음에 또 만나요~", 5120124, true));
        WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(11, "아르미 : 여러분 아쉽지만 화약이 다 떨어져 버렸어요 ㅠ.ㅠ 다음에 또 만나요~"));
        아르미 = false;
    }

    public boolean isMulung(int mapid) {
        switch (mapid) {
            case 925060600:
            case 925061200:
            case 925061800:
            case 925062400:
            case 925063000:
            case 925063600:
            case 925064200:
                return true;
        }
        return false;
    }

    public String Comma(long num) {
        DecimalFormat df = new DecimalFormat("#,###");
        return df.format(num);
    }
}
