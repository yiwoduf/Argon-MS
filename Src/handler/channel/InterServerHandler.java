/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package handler.channel;

import client.MapleCharacter;
import client.MapleClient;
import client.MapleQuestStatus;
import client.items.Equip;
import client.items.MapleInventoryType;
import client.skills.SkillFactory;
import community.*;
import constants.GameConstants;
import constants.ServerConstants;
import database.MYSQL;
import handler.admin.AdminToolPacket;
import handler.duey.DueyHandler;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import launch.AdminToolServer;
import launch.ChannelServer;
import launch.helpers.ChracterTransfer;
import launch.helpers.MaplePlayerIdChannelPair;
import launch.world.WorldBroadcasting;
import launch.world.WorldCommunity;
import packet.creators.CashPacket;
import packet.creators.LoginPacket;
import packet.creators.MainPacketCreator;
import packet.creators.PetPacket;
import packet.creators.SoulWeaponPacket;
import packet.creators.UIPacket;
import packet.skills.AngelicBusterSkill;
import packet.skills.ZeroSkill;
import packet.transfer.read.ReadingMaple;
//import packet.transfer.write.byte[];
import scripting.NPCScriptManager;
import server.maps.FieldLimitType;
import server.maps.MapleMap;
import server.shops.IMapleCharacterShop;

public class InterServerHandler {

    public static final void EnterMTS(final MapleClient c) {
        final MapleMap map = c.getChannelServer().getMapFactory().getMap(910000000);
        c.getPlayer().changeMap(map, map.getPortal(0));
    }

    public static final void EnterCS(final MapleClient c, final MapleCharacter chr, final boolean ScriptEnter) {
        if (!chr.isAlive()) {
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        if (ScriptEnter && ServerConstants.cshopNpc != 0) {
            if (c.getPlayer().getConversation() != 0) {
                NPCScriptManager.getInstance().dispose(c);
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            }
            NPCScriptManager.getInstance().start(c, ServerConstants.cshopNpc);
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        final ChannelServer ch = ChannelServer.getInstance(c.getChannel());

        String ip = ServerConstants.getServerHost(c);

        if (ip == null) { // Cash Shop not init yet
            c.getSession().writeAndFlush(MainPacketCreator.serverNotice(5, "캐시샵을 현재 사용할 수 없습니다."));
            return;
        }

        if (chr.getTrade() != null) {
            MapleUserTrade.cancelTrade(chr.getTrade());
        }

        final IMapleCharacterShop shop = chr.getPlayerShop();
        if (shop != null) {
            shop.removeVisitor(chr);
            if (shop.isOwner(chr)) {
                shop.setOpen(true);
            }
        }

        if (chr.getMessenger() != null) {
            MapleMultiChatCharacter messengerplayer = new MapleMultiChatCharacter(chr);
            WorldCommunity.leaveMessenger(chr.getMessenger().getId(), messengerplayer);
        }
        try {
            chr.cancelAllBuffs();
        } catch (Exception ex) {

        }
        //ChannelServer.addBuffsToStorage(chr.getId(), chr.getAllBuffs());
        ChannelServer.addCooldownsToStorage(chr.getId(), chr.getAllCooldowns());
        ChannelServer.addDiseaseToStorage(chr.getId(), chr.getAllDiseases());
        ChannelServer.ChannelChange_Data(new ChracterTransfer(chr), chr.getId(), -10);
        ch.removePlayer(chr);
        c.updateLoginState(MapleClient.CHANGE_CHANNEL, c.getSessionIPAddress());

        c.getSession().writeAndFlush(MainPacketCreator.getChannelChange(ServerConstants.CashShopPort, ServerConstants.getServerHost(c))); //default cashshop port
        chr.saveToDB(false, false);
        chr.getMap().removePlayer(chr);
        c.setPlayer(null);
    }

    public static void Loggedin(final int playerid, final MapleClient c) {
        final ChannelServer channelServer = c.getChannelServer();
        MapleCharacter player;
        final ChracterTransfer transfer = channelServer.getPlayerStorage().getPendingCharacter(playerid);
        boolean checkFromDB = false;
        if (transfer == null) { // Player isn't in storage, probably isn't CC
            player = MapleCharacter.loadCharFromDB(playerid, c, true);
            checkFromDB = true;
        } else {
            player = MapleCharacter.ReconstructChr(transfer, c, true);
        }
        if (player == null) {
            System.out.println("ERROR!!!!!! CANNOT LOAD CHARACTER FROM DB!!");
            return;
        }
        c.setPlayer(player);
        c.setAccID(player.getAccountID());
        c.loadAuthData();
        c.getPlayer().setCTS_MorphGage(0);

        final int state = c.getLoginState();

        boolean allowLogin = false;

        if (state == MapleClient.LOGIN_SERVER_TRANSITION || state == MapleClient.CHANGE_CHANNEL) {
            if (!ChannelServer.isCharacterListConnected(c.loadCharacterNames(), true)) {
                allowLogin = true;
            }
        }
        if (!allowLogin) {
            c.setPlayer(null);
            c.getSession().close();
            if (!ServerConstants.realese) {
                System.out.println("not allow login - " + c.getAccountName() + " from " + c.getSessionIPAddress() + " / state : " + state);
            }
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_LOGGEDIN, c.getSessionIPAddress());

        final ChannelServer cserv = ChannelServer.getInstance(c.getChannel());
        cserv.addPlayer(player);
        c.getSession().writeAndFlush(MainPacketCreator.HeadTitle(player.HeadTitle()));
        c.getSession().writeAndFlush(MainPacketCreator.getPlayerInfo(player));
        player.getMap().addPlayer(player);
        c.getPlayer().completeQuest(6500, 1012117);
        if (player.getKeyValue("maxdamage") != null) {
            player.gainAddDamage(Long.parseLong(player.getKeyValue("maxdamage")));
            player.setKeyValue("maxdamage", null);
        }
        if (!checkFromDB) {
            c.getPlayer().giveCoolDowns(ChannelServer.getCooldownsFromStorage(player.getId()));
        }
        try {
            player.expirationTask();
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }

        if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -27) != null && player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -28) != null) {
            if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -27).getAndroid() != null) {
                player.setAndroid(player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -27).getAndroid());
            }
        }
        try {
            // Start of expirationTask
            player.expirationTask();
            // Start of buffs
            /* final List<MapleBuffValueHolder> buffs = ChannelServer.getBuffsFromStorage(player.getId());
            if (buffs != null) {
                player.silentGiveBuffs(buffs);
            }*/
            try {
                c.getPlayer().giveSilentDebuff(ChannelServer.getDiseaseFromStorage(player.getId()));
            } catch (NullPointerException ex) {

            }
            // Start of buddylist
            final int buddyIds[] = player.getBuddylist().getBuddyIds();
            WorldBroadcasting.loggedOn(player.getName(), player.getId(), c.getChannel(), buddyIds);
            final MaplePlayerIdChannelPair[] onlineBuddies = WorldCommunity.multiBuddyFind(player.getId(), buddyIds);
            for (MaplePlayerIdChannelPair onlineBuddy : onlineBuddies) {
                final BuddylistEntry ble = player.getBuddylist().get(onlineBuddy.getCharacterId());
                ble.setChannel(onlineBuddy.getChannel());
                player.getBuddylist().put(ble);
            }
            c.getSession().writeAndFlush(MainPacketCreator.updateBuddylist(player.getBuddylist().getBuddies(), 10, 0));
            if (player.getGuildId() > 0) {
                ChannelServer.setGuildMemberOnline(player.getMGC(), true, c.getChannel());
                c.getSession().writeAndFlush(MainPacketCreator.showGuildInfo(player));
                final MapleGuild gs = ChannelServer.getGuild(player.getGuildId());
                if (gs != null) {
                    final List<byte[]> packetList = ChannelServer.getAllianceInfo(gs.getAllianceId(), true);
                    if (packetList != null) {
                        for (byte[] pack : packetList) {
                            if (pack != null) {
                                c.getSession().writeAndFlush(pack);
                            }
                        }
                    }
                } else { //guild not found, change guild id
                    player.setGuildId(0);
                    player.setGuildRank((byte) 5);
                    player.setAllianceRank((byte) 5);
                    player.saveGuildStatus();
                }
            }
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
        player.showNote();
        player.updatePartyMemberHP();

        if (GameConstants.isPhantom(player.getJob())) {
            c.getSession().writeAndFlush(MainPacketCreator.cardAmount(c.getPlayer().getCardStack()));
        }

        for (MapleQuestStatus status : player.getStartedQuests()) {
            if (status.hasMobKills()) {
                c.getSession().writeAndFlush(MainPacketCreator.updateQuestMobKills(status));
            }
        }
        if (player.getQuickSlot().getQuickSlot().size() == 8) {
            c.send(MainPacketCreator.getQuickSlot(player.getQuickSlot().getQuickSlot()));
        }

        if (DueyHandler.DueyItemSize(player.getName()) > 0) {
            player.send(DueyHandler.DueyMessage(28));
        }

        if (GameConstants.isAngelicBuster(player.getJob())) {
            c.getSession().writeAndFlush(AngelicBusterSkill.AngelicBusterChangingWait((byte) 1, true));
            c.getSession().writeAndFlush(AngelicBusterSkill.AngelicBusterChangingWait((byte) 0, false));
        }

        /*     if (player.haveItem(1142187, 1, true, true)) {
            if (!isDamageMeterRanker(player.getId())) {
                player.removeAllEquip(1142187, false);
                player.send(MainPacketCreator.OnAddPopupSay(9000036, 3000, "ZI존 딜량1등 자격이 박탈되어, 칭호가 회수되었습니다.", ""));
            }
        } */
        if (ServerConstants.chr != null) {
            if (player.haveItem(1142558, 1, true, true)) {
                if (!player.getName().equals(ServerConstants.chr.getName())) {
                    player.removeAllEquip(1142558, false);
                    player.dropMessage(5, "<zl환생 최강자lz> 자격이 박탈되어, 칭호가 회수되었습니다.");
                }
            }
        }

        if (ServerConstants.chr != null) {
            if (player.getName().equals(ServerConstants.chr.getName())) {
                if (!player.haveItem(1142558, 1, true, true)) {
                    player.gainItem(1142558, 1);
                    player.dropMessage(5, "<zl환생 최강자lz> 훈장이 지급 되었습니다.");
                }
            }
        }

        if (ServerConstants.mrank1 != null) {
            if (player.haveItem(1142268, 1, true, true)) {
                if (!player.getName().equals(ServerConstants.mrank1)) {
                    player.removeAllEquip(1142268, false);
                    player.dropMessage(5, "메소보유량 전섭 1위의 위엄 자격이 박탈되어, 칭호가 회수되었습니다.");
                }
            }
        }

        /*  if (ServerConstants.mrank1 != null) {
            if (player.getName().equals(ServerConstants.mrank1)) {
                if (!player.haveItem(1142268, 1, true, true)) {
                    player.gainItem(1142268, 1);
                    player.dropMessage(5, "메소보유량 전섭 1위의 위엄 훈장이 지급 되었습니다.");
                }
            }
        } */
        if (ServerConstants.crank1 != null) {
            if (player.haveItem(1142505, 1, true, true)) {
                if (!player.getName().equals(ServerConstants.crank1)) {
                    player.removeAllEquip(1142505, false);
                    player.dropMessage(5, "추천인 랭킹 1위 자격이 박탈되어, 칭호가 회수되었습니다.");
                }
            }
        }

        /*   if (ServerConstants.crank1 != null) {
            if (player.getName().equals(ServerConstants.crank1)) {
                if (!player.haveItem(1142505, 1, true, true)) {
                    player.gainItem(1142505, 1);
                    player.dropMessage(5, "추천인 랭킹 1위 훈장이 지급 되었습니다.");
                }
            }
        } */

 /* 제로 초기화 */
        if (GameConstants.isZero(player.getJob())) {

            player.setGender((byte) 0);
            player.setSecondGender((byte) 1);
            player.send(ZeroSkill.Clothes(player.getBetaClothes()));
            player.zeroSkillMaster(); // 치우씨 :: 제로 @스킬마스터 구현
        } else {
            player.setSecondGender((byte) -1);
        }

        /* 핑크빈 */
        if (GameConstants.isPinkBean(player.getJob())) { // 치우씨 :: 핑크빈 요요 
            SkillFactory.getSkill(131001010).getEffect(player.getSkillLevel(131001010)).applyTo(player);
        }

        /* 소울인챈터 */
        if ((player.isEquippedSoulWeapon()) && (transfer == null)) {
            player.setSoulCount(0);
            c.send(SoulWeaponPacket.giveSoulGauge(player.getSoulCount(), player.getEquippedSoulSkill()));
        }

        /* 최대데미지 해제 */
        if (ServerConstants.UnlockMaxDamage) {
            player.unlockMaxDamage();
        }

        /* 정령의 펜던트 */
        if (player.getInventory(MapleInventoryType.EQUIPPED).findById(1122017) != null) {
            player.equipPendantOfSpirit();
        }

        /* 오픈게이트 */
        c.getPlayer().setKeyValue("opengate", null);
        c.getPlayer().setKeyValue("count", null);

        /* 펜던트 슬롯 */
        if (!c.getPlayer().getStat().getJC()) {
            String[] text = {"미남", "미녀", "장미칼", "관종", "유리멘탈", "부처맨탈", "주인공", "히로인", "엑스트라", "신", "어그로", "장비충", "마스터", "게이", "동정", "히키코모리", "찐따", "리얼충"};
            String[] text2 = {"반갑습니다", "안녕하세요?"};
            String text3 = text[(int) java.lang.Math.floor(java.lang.Math.random() * text.length)] + " " + player.getName() + " " + text2[(int) java.lang.Math.floor(java.lang.Math.random() * text2.length)];
            WorldBroadcasting.broadcastMessage(UIPacket.detailShowInfo(text3, false));
            c.getSession().writeAndFlush(MainPacketCreator.OnAddPopupSay(9062000, 3600, "접속 후 60분이 지날때마다 로그인포인트가 적립됩니다.", ""));
            c.getPlayer().getStat().setJC(true);
        }

        /* 피버 타임 */
        if (ServerConstants.feverTime) {
            c.getSession().writeAndFlush(MainPacketCreator.feverTime());
        }

        if (c.getPlayer().getPetLoot()) {
            c.send(PetPacket.updatePetLootStatus(1));
            for (int i = 0; i < c.getPlayer().getPets().length; ++i) {
                if (c.getPlayer().getPet(i) != null) {
                    c.send(PetPacket.updatePet(c.getPlayer(), c.getPlayer().getPet(i), false, c.getPlayer().getPetLoot()));
                }
            }
        }

        c.getSession().writeAndFlush(MainPacketCreator.serverMessage(ServerConstants.serverMessage));
        if (ServerConstants.serverHint != null) {
            if (ServerConstants.serverHint.length() > 0) {
                c.getSession().writeAndFlush(MainPacketCreator.OnAddPopupSay(9062000, 6000, ServerConstants.serverHint, ""));
                c.getSession().writeAndFlush(MainPacketCreator.serverNotice(5, ServerConstants.serverHint));
            }
        }

        if (GameConstants.isXenon(player.getJob())) {
            player.startSurPlus();
        }

        if (GameConstants.isBlaster(player.getJob())) {
            player.giveBulletGauge(0, false);
        }

        if (GameConstants.isDemonAvenger(player.getJob())) {
            c.send(MainPacketCreator.giveDemonWatk(c.getPlayer().getStat().getHp()));
        }

        c.getSession().writeAndFlush(CashPacket.pendantSlot(false));
        player.sendMacros();
        if (GameConstants.isKaiser(c.getPlayer().getJob())) {
            c.getPlayer().changeKaiserTransformKey();
        } else {
            c.getSession().writeAndFlush(MainPacketCreator.getKeymap(player.getKeyLayout()));
        }
        if (GameConstants.isKOC(player.getJob()) && player.getLevel() >= 100) {
            if (player.getSkillLevel(Integer.parseInt(String.valueOf(player.getJob() + "1000"))) <= 0) {
                player.teachSkill(Integer.parseInt(String.valueOf(player.getJob() + "1000")), (byte) 0, SkillFactory.getSkill(Integer.parseInt(String.valueOf(player.getJob() + "1000"))).getMaxLevel());
            }
        }
        c.getPlayer().LoginPoint();
        c.getSession().writeAndFlush(MainPacketCreator.OnChatLetClientConnect());
        AdminToolServer.broadcastMessage(AdminToolPacket.Info());
        if (c.getPlayer().getPartTimeJob(c.getPlayer().getId()) > 1) {
            c.getPlayer().dropMessage(6, "[Ms.어카운트] 아르바이트 보상을 받아주세요...");
        }
    }

    public static boolean isDamageMeterRanker(int cid) {
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

    public static final void ChangeChannel(final ReadingMaple rh, final MapleClient c, final MapleCharacter chr) {
        if (!chr.isAlive()) {
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        final int channel = rh.readByte();
        if (c.getPlayer().getMapId() == 120043000) {
            if (!(channel == 0 || channel == 1)) {
                c.getPlayer().dropMessage(1, "광장은 1채널 2채널만 사용할수 있습니다.");
                c.getPlayer().send(MainPacketCreator.resetActions());
                return;
            }
        }
        final ChannelServer toch = ChannelServer.getInstance(channel);

        if (FieldLimitType.ChannelSwitch.check(chr.getMap().getFieldLimit()) || channel == c.getChannel()) {
            c.getSession().close();
            return;
        } else if (toch == null || toch.isShutdown()) {
            c.getSession().writeAndFlush(MainPacketCreator.serverNotice(5, "현재 접근할 수 없습니다."));
            return;
        }
        if (chr.getTrade() != null) {
            MapleUserTrade.cancelTrade(chr.getTrade());
        }

        final IMapleCharacterShop shop = chr.getPlayerShop();
        if (shop != null) {
            shop.removeVisitor(chr);
            if (shop.isOwner(chr)) {
                shop.setOpen(true);
            }
        }

        final ChannelServer ch = ChannelServer.getInstance(c.getChannel());
        if (chr.getMessenger() != null) {
            WorldCommunity.silentLeaveMessenger(chr.getMessenger().getId(), new MapleMultiChatCharacter(chr));
        }
        try {
            chr.cancelAllBuffs();
        } catch (Exception ex) {

        }

        //ChannelServer.addBuffsToStorage(chr.getId(), chr.getAllBuffs());
        ChannelServer.addCooldownsToStorage(chr.getId(), chr.getAllCooldowns());
        ChannelServer.addDiseaseToStorage(chr.getId(), chr.getAllDiseases());
        ChannelServer.ChannelChange_Data(new ChracterTransfer(chr), chr.getId(), channel);
        ch.removePlayer(chr);
        c.updateLoginState(MapleClient.CHANGE_CHANNEL, c.getSessionIPAddress());
        c.getSession().writeAndFlush(MainPacketCreator.getChannelChange(ServerConstants.basePorts + (channel), ServerConstants.getServerHost(c)));
        chr.saveToDB(false, false);
        chr.getMap().removePlayer(chr);
        c.setPlayer(null);
    }

    public static void getGameQuitRequest(ReadingMaple rh, MapleClient c) {
        String account = rh.readMapleAsciiString();
        if (!c.isLoggedIn() && !c.getAccountName().equals(account)) { // hack
            c.getSession().close();
            return;
        }
        //-----------------------------------------------------------------------//
        try {
            c.disconnect(true, (c.getLoginState() == 4 || c.getLoginState() == 5));
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        } finally {
            c.getSession().write(MainPacketCreator.serverNotice(4, ""));
            c.getSession().write(LoginPacket.getClientQuitRequest((account) + "," + (c.getPassword(account))));
        }
    }

}
