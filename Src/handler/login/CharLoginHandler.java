/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package handler.login;

import client.*;
import client.items.Equip;
import client.items.Item;
import client.items.MapleInventory;
import client.items.MapleInventoryType;
import client.skills.SkillFactory;
import constants.ServerConstants;
import constants.GameConstants;

import static constants.ServerConstants.serverCheck;

import database.MYSQL;

import java.sql.SQLException;

import launch.helpers.MapleLoginHelper;
import launch.helpers.MapleLoginWorker;
import launch.helpers.MapleNewCharJobType;
import packet.creators.LoginPacket;
import packet.creators.MainPacketCreator;
import packet.transfer.read.ReadingMaple;
import tools.KoreanDateUtil;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.Calendar;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import launch.ChannelServer;
import launch.Start;

import launch.world.WorldConnected;
import packet.opcode.RecvPacketOpcode;
import packet.opcode.SendPacketOpcode;
import tools.RandomStream.Randomizer;

public class CharLoginHandler {

    public static int canjoin = 1;

    private static boolean loginFailCount(MapleClient c) {
        c.loginAttempt++;
        if (c.loginAttempt > 5) {
            return true;
        }
        return false;
    }

    public static void checkLoginAuthInfo(ReadingMaple rh, MapleClient c) {
        try {
            rh.skip(24); //
            String login = rh.readMapleAsciiString();
            String pwd = rh.readMapleAsciiString();
            if (ServerConstants.serverCheck) {
                if (!login.contains("현무암")) {
                    c.send(MainPacketCreator.serverNotice(1, "현재 서버 점검중 입니다."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                }
            }
            if (ServerConstants.isShutdown) {
                c.send(MainPacketCreator.serverNotice(1, "현재 리붓중 입니다."));
                c.send(LoginPacket.getLoginFailed(20));
                return;
            }
            c.setAccountName(login);
            boolean ipBan = c.hasBannedIP();
            boolean macBan = false;

            int checkId = AutoRegister.checkAccount(c, login, pwd);
            if (!GameConstants.isServerReady()) {
                c.send(MainPacketCreator.serverNotice(1, "서버데이터를 불러오는 중입니다. 잠시만 기다려주세요."));
                c.send(LoginPacket.getLoginFailed(20));
                return;
            }

            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?"); // 아이디 불러옴.
                ps.setString(1, login);
                ResultSet rs = ps.executeQuery();
                rs.next();
                for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                    for (MapleCharacter players : cserv.getPlayerStorage().getAllCharacters().values()) {
                        if (players.getAccountID() == rs.getInt("id")) {
                            players.getClient().getSession().close(); //
                            players.getClient().disconnect(true, false);
                        }
                    }
                }
                PreparedStatement ps3 = con.prepareStatement("UPDATE accounts SET loggedin = ? WHERE name = ?");
                ps3.setInt(1, 0);
                ps3.setString(2, login);
                ps3.executeUpdate();
                ps3.close();

                rs.close();
                ps.close();
            } catch (SQLException ex) {
                // ex.printStackTrace();                
            }
            /*            if (c.getSessionIP(c.getSessionIPAddress()) != null) {
                c.send(MainPacketCreator.serverNotice(1, "[알림] 해당 컴퓨터에서 이미 " + c.getSessionIPAccountName(c.getSessionIPAddress()) + "계정으로 이미 로그인 되어있습니다. 해당 계정 로그아웃 이후 로그인 부탁드립니다."));
                c.send(LoginPacket.getLoginFailed(20));
                return;
            } else {
                c.InsertSessionIP(c.getSessionIPAddress(), login);
            } */

            switch (checkId) {
                case 0:
                    //생성 가능한 아이디일때
                    if (canjoin == 1) {
                        AutoRegister.registerAccount(c, login, pwd);
                        c.send(MainPacketCreator.serverNotice(1, ServerConstants.serverName + " 계정생성을 성공적으로 완료하였습니다 !\r\n다시한번 로그인 해주시기 바랍니다."));
                        c.send(LoginPacket.getLoginFailed(20));
                        return;
                    } else {
                        c.send(MainPacketCreator.serverNotice(1, "서버 리붓중입니다, 잠시 후에 다시시도 해주세요."));
                        c.send(LoginPacket.getLoginFailed(20));
                    }
                    break;
                case 1:
                    //계정 찾기 실패
                    c.send(MainPacketCreator.serverNotice(1, "해당하는 계정이 없습니다.\r\n" + ServerConstants.serverName + " 홈페이지에\r\n먼저 접속하셔서 회원가입을\r\n해주시기 바랍니다."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                case 2:
                    //php오류
                    c.send(MainPacketCreator.serverNotice(1, "페이지 오류가 발생했습니다, 잠시 후에 다시시도 해주세요."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                case 3:
                    //레벨
                    c.send(MainPacketCreator.serverNotice(1, "사이트의 레벨이 맞지 않습니다. 계정을 등급업을 받으신 후 이용해 주시기 바랍니다."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                case 6:
                    //횟수초과
                    c.send(MainPacketCreator.serverNotice(1, "한 아이피당 가능한 계정생성 최대횟수를 초과했습니다."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                case 5:
                    if (c.getSessionIP(c.getSessionIPAddress()) != null && c.getLoginState() > MapleClient.LOGIN_NOTLOGGEDIN) { // 치우씨 :: 소스 누가 ?는지 나보다 못하네; 비번잘못입력하면 그냥 재붓없인 못들어가는거임 ㅋㅋㅋ
                        c.send(MainPacketCreator.serverNotice(1, "[알림] 해당 컴퓨터에서 이미 " + c.getSessionIPAccountName(c.getSessionIPAddress()) + "계정으로 이미 로그인 되어있습니다. 해당 계정 로그아웃 이후 로그인 부탁드립니다."));
                        c.send(LoginPacket.getLoginFailed(20));
                        return;
                    } else {
                        c.InsertSessionIP(c.getSessionIPAddress(), login);
                    }
                    break;
                default:
                    return;
            }

            int loginok = c.login(login, pwd, ipBan || macBan);
            Calendar tempbannedTill = c.getTempBanCalendar();
            if (loginok == 0 && (ipBan || macBan)) {
                loginok = 3;
                if (ipBan || macBan) {
                    MapleCharacter.ban(c.getIp().split(":")[0], "Enforcing account ban, account " + login, false);
                }
            }
            if (loginok != 0) {
                if (!loginFailCount(c)) {
                    c.getSession().writeAndFlush(LoginPacket.getLoginFailed(loginok));
                }
            } else if (tempbannedTill.getTimeInMillis() != 0) {
                if (!loginFailCount(c)) {
                    c.getSession().writeAndFlush(LoginPacket.getTempBan(KoreanDateUtil.getTempBanTimestamp(tempbannedTill.getTimeInMillis()), c.getBanReason()));
                }
            } else {
                c.loginAttempt = 0;
                MapleLoginWorker.registerClient(c);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public static void CharlistRequest(ReadingMaple rh, MapleClient c) {
        if (!GameConstants.isServerReady()) {
            c.send(MainPacketCreator.serverNotice(1, "[" + ServerConstants.serverName + "] 현재 서버가 준비되지 않았습니다.\r\n\r\n필요한 데이터를 불러오는 중이므로 아직 서버에 접속하실 수 없습니다.\r\n\r\n잠시 후 재접속 해주시기 바랍니다."));
            return;
        }
        final boolean isFirstLogin = rh.readByte() == 0;
        if (!isFirstLogin) { //1.2.239+ 게임 종료 대응.
            rh.skip(1);
            final String account = rh.readMapleAsciiString();
            final String login = account.split(",")[0];
            final String pwd = account.split(",")[1];
            rh.skip(21);
            c.getSession().write(LoginPacket.getCharEndRequest(c, login, pwd, true));
            c.getSession().write(LoginPacket.getSelectedWorld());
        }
        int server = rh.readByte();
        int channel = rh.readByte();
        c.setWorld(server);
        c.setChannel(channel);
        Start.println("[ARGON] " + c.getSessionIPAddress().toString() + " IP " + c.getAccountName() + " Account " + (channel == 0 ? 1 : channel == 1 ? "Adult" : channel) + " channel connecting." + isFirstLogin, 37);
        try {
            List<MapleCharacter> chars = c.loadCharacters();
            c.getSession().writeAndFlush(LoginPacket.charlist(c, c.isUsing2ndPassword(), chars));
            chars.clear();
            chars = null;
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public static void onlyRegisterSecondPassword(ReadingMaple rh, MapleClient c) {
        String secondpw = rh.readMapleAsciiString();
        c.setSecondPassword(secondpw);
        c.updateSecondPassword();
        c.send(LoginPacket.getSecondPasswordResult(true));
    }

    public static void registerSecondPassword(ReadingMaple rh, MapleClient c) {
        String originalPassword = rh.readMapleAsciiString();
        String changePassword = rh.readMapleAsciiString();

        if (!originalPassword.equals(c.getSecondPassword())) {
            c.send(LoginPacket.getSecondPasswordResult(false));
        } else {
            c.setSecondPassword(changePassword);
            c.updateSecondPassword();
            c.send(LoginPacket.getSecondPasswordResult(true));
        }
    }

    public static void getSPCheck(ReadingMaple rh, MapleClient c) {
        if (c.getSecondPassword() != null) {
            c.getSession().writeAndFlush(LoginPacket.getSecondPasswordCheck(true, true, true));
        } else {
            c.getSession().writeAndFlush(LoginPacket.getSecondPasswordCheck(false, false, false));
        }
    }

    public static void getLoginRequest(ReadingMaple rh, MapleClient c) {
        /* 로그인 시작 */
        rh.skip(2);
        final String account = rh.readMapleAsciiString();
        final String login = account.split(",")[0];
        final String pwd = account.split(",")[1];
        int loginok = c.login(login, pwd, c.hasBannedIP());
        if (loginok != 0) { // hack
            c.getSession().close();
            return;
        }
        if (c.finishLogin() == 0) {
            c.setAccountName(login);
            c.getSession().writeAndFlush(LoginPacket.getRelogResponse());
            c.getSession().writeAndFlush(LoginPacket.getCharEndRequest(c, login, pwd, false));
        } else {
            c.getSession().writeAndFlush(LoginPacket.getLoginFailed(20));
        }
    }

    public static void checkHotfix(ReadingMaple rh, MapleClient c) {
        if (rh.readByte() == 0) {
            c.getSession().writeAndFlush(LoginPacket.getHotfix());
        }
    }

    public static void getIPRequest(ReadingMaple rh, MapleClient c) {
        if (!c.isLoggedIn()) { // hack
            return;
        }
        c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION, c.getSessionIPAddress());
        c.getSession().writeAndFlush(MainPacketCreator.getServerIP(c, ServerConstants.basePorts + c.getChannel(), ServerConstants.BuddyChatPort, rh.readInt()));
    }

    public static void getDisplayChannel(final boolean first_login, MapleClient c) {
        c.getSession().writeAndFlush(LoginPacket.getChannelBackImg(first_login, (byte) Randomizer.rand(0, 1)));
        c.getSession().writeAndFlush(LoginPacket.getServerList(0, WorldConnected.getConnected()));
        c.getSession().writeAndFlush(LoginPacket.recommendWorld());
        c.getSession().writeAndFlush(LoginPacket.getEndOfServerList());
        c.getSession().writeAndFlush(LoginPacket.getLastWorld());
    }

    public static void getSessionCheck(ReadingMaple rh, MapleClient c) {
        int pRequest = rh.readInt();
        int pResponse;
        pResponse = ((pRequest >> 5) << 5) + (((((pRequest & 0x1F) >> 3) ^ 2) << 3) + (7 - (pRequest & 7)));
        pResponse |= ((pRequest >> 7) << 7);
        c.getSession().writeAndFlush(LoginPacket.getSessionResponse(pResponse));
    }

    public static void setBurningCharacter(ReadingMaple rh, MapleClient c) {
        rh.skip(1);
        int accountId = rh.readInt();
        int charId = rh.readInt();
        if (!c.isLoggedIn() || c.getAccID() != accountId) { // hack
            return;
        }
        if (!c.setBurningCharacter(accountId, charId)) {
            c.getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "잘못된 요청입니다."));
            return;
        }
        c.send(LoginPacket.setBurningEffect(charId));
    }

    public static void checkSecondPassword(ReadingMaple rh, MapleClient c) {
        String code = rh.readMapleAsciiString();
        if (!code.equals(c.getSecondPassword())) {
            c.send(LoginPacket.getSecondPasswordConfirm(false));
        } else {
            c.send(LoginPacket.getSecondPasswordConfirm(true));
        }
    }

    public static void newConnection(MapleClient c) {
        Connection con = null;
        if (ServerConstants.Host.equals(c.getSessionIPAddress().replace("/", "")) || ServerConstants.showPackets) {
            c.allowLoggin = true;
            return;
        }
        try {
            con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM acceptip where ip = ?");
            ps.setString(1, c.getIp().split(":")[0]);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                c.allowLoggin = true;
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static void CheckCharName(String name, MapleClient c) {
        c.getSession().writeAndFlush(LoginPacket.charNameResponse(name, !MapleCharacterUtil.canCreateChar(name) || MapleLoginHelper.getInstance().isForbiddenName(name)));
    }

    public static void CreateChar(ReadingMaple rh, MapleClient c) {
        final LinkedHashMap<Integer, Integer> linkedHashMap = new LinkedHashMap<Integer, Integer>();
        String name = rh.readMapleAsciiString();
        MapleCharacter newchar = MapleCharacter.getDefault(c);
        rh.skip(8);
        int JobType = rh.readInt(); // 1 = Adventurer, 0 = Cygnus, 2 = Aran
        short subCategory = rh.readShort();
        if (JobType == MapleNewCharJobType.제로.getValue()) {
            newchar.setSecondGender(rh.readByte());
        } else {
            newchar.setGender(rh.readByte());
        }
        newchar.setSkinColor(rh.readByte());
        rh.skip(1);
        newchar.setFace(rh.readInt());
        newchar.setHair(rh.readInt());
        if (JobType == MapleNewCharJobType.데몬슬레이어.getValue() || JobType == MapleNewCharJobType.제논.getValue()) {
            newchar.setSecondFace(rh.readInt());
        }
        if (JobType == MapleNewCharJobType.제로.getValue()) {
            newchar.setGender((byte) 1);
            newchar.setSecondSkinColor((byte) 0);
            newchar.setSecondFace(21290);
            newchar.setSecondHair(37623);
        }
        int top = rh.readInt();
        int bottom = 0;
        if (JobType != MapleNewCharJobType.시그너스.getValue() && JobType != MapleNewCharJobType.레지스탕스.getValue() && JobType != MapleNewCharJobType.메르세데스.getValue() && JobType != MapleNewCharJobType.데몬슬레이어.getValue() && JobType != MapleNewCharJobType.루미너스.getValue() && JobType != MapleNewCharJobType.카이저.getValue() && JobType != MapleNewCharJobType.엔젤릭버스터.getValue() && JobType != MapleNewCharJobType.제논.getValue() && JobType != MapleNewCharJobType.모험가.getValue() && JobType != MapleNewCharJobType.캐논슈터.getValue() && JobType != MapleNewCharJobType.듀얼블레이더.getValue() && JobType != MapleNewCharJobType.팬텀.getValue() && JobType != MapleNewCharJobType.제로.getValue() && JobType != MapleNewCharJobType.핑크빈.getValue() && JobType != MapleNewCharJobType.키네시스.getValue()) {
            bottom = rh.readInt();
        }
        if (JobType == MapleNewCharJobType.시그너스.getValue()) {
            rh.skip(4);
        }
        int cape = 0;
        if (JobType == MapleNewCharJobType.팬텀.getValue() || JobType == MapleNewCharJobType.루미너스.getValue() || JobType == MapleNewCharJobType.제로.getValue() || JobType == MapleNewCharJobType.은월.getValue()) {
            cape = rh.readInt();
        }
        int shoes = rh.readInt();
        int weapon = rh.readInt();
        int shield = 0;
        if (JobType == MapleNewCharJobType.데몬슬레이어.getValue()) {
            shield = rh.readInt();
        }
        if (!MapleCharacterUtil.canCreateChar(name) || MapleLoginHelper.getInstance().isForbiddenName(name)) { //생성 도중 중복닉네임 발견시
            c.send(MainPacketCreator.serverNotice(1, "캐릭터 생성도중 오류가 발생했습니다!"));
            c.send(LoginPacket.getLoginFailed(30));
            return;
        }
        newchar.setSubcategory(subCategory);
        newchar.setName(name);
        if (c.isGm()) {
            newchar.setGMLevel((byte) 6);
        }

        if (JobType == MapleNewCharJobType.모험가.getValue() || JobType == MapleNewCharJobType.듀얼블레이더.getValue() || JobType == MapleNewCharJobType.캐논슈터.getValue()) { //모험가
            newchar.setJob((short) 0);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161001, (byte) 0, (short) 1, (byte) 0));
        } else if (JobType == MapleNewCharJobType.레지스탕스.getValue()) { //레지스탕스
            newchar.setJob((short) 3000);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161054, (byte) 0, (short) 1, (byte) 0));
            newchar.changeSkillLevel(SkillFactory.getSkill(30001061), (byte) 1, (byte) 1);
        } else if (JobType == MapleNewCharJobType.시그너스.getValue()) { //시그너스
            newchar.setJob((short) 1000);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161047, (byte) 0, (short) 1, (byte) 0));
            newchar.changeSkillLevel(SkillFactory.getSkill(10001003), (byte) 1, (byte) 1); //장인의 혼
            newchar.changeSkillLevel(SkillFactory.getSkill(10001244), (byte) 1, (byte) 1); //엘리멘탈 슬래시
            newchar.changeSkillLevel(SkillFactory.getSkill(10001245), (byte) 1, (byte) 1); //져니 홈
            newchar.changeSkillLevel(SkillFactory.getSkill(10000246), (byte) 1, (byte) 1); //엘리멘탈 하모니
            newchar.changeSkillLevel(SkillFactory.getSkill(10000252), (byte) 1, (byte) 1); //엘리멘탈 쉬프트
        } else if (JobType == MapleNewCharJobType.아란.getValue()) { //아란
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161048, (byte) 0, (short) 1, (byte) 0));
            newchar.setJob((short) 2000);
        } else if (JobType == MapleNewCharJobType.에반.getValue()) { //에반
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161052, (byte) 0, (short) 1, (byte) 0));
            newchar.setJob((short) 2001);
        } else if (JobType == MapleNewCharJobType.메르세데스.getValue()) { //메르세데스
            newchar.setJob((short) 2002);
            newchar.changeSkillLevel(SkillFactory.getSkill(20020109), (byte) 1, (byte) 1); //엘프의 회복
            newchar.changeSkillLevel(SkillFactory.getSkill(20021110), (byte) 1, (byte) 1); //엘프의 축복
            newchar.changeSkillLevel(SkillFactory.getSkill(20020111), (byte) 1, (byte) 1); //스타일리쉬 무브
            newchar.changeSkillLevel(SkillFactory.getSkill(20020112), (byte) 1, (byte) 1); //왕의 자격
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161079, (byte) 0, (short) 1, (byte) 0));
        } else if (JobType == MapleNewCharJobType.데몬슬레이어.getValue()) { //데몬슬레이어
            newchar.setJob((short) 3001);
            newchar.changeSkillLevel(SkillFactory.getSkill(30011109), (byte) 1, (byte) 1); //데빌 윙즈
            newchar.changeSkillLevel(SkillFactory.getSkill(30010110), (byte) 1, (byte) 1); //데몬 점프
        } else if (JobType == MapleNewCharJobType.제논.getValue()) { //제논
            newchar.setJob((short) 3002);
            newchar.changeSkillLevel(SkillFactory.getSkill(30020232), (byte) 1, (byte) 1); //서플러스 서플라이
            newchar.changeSkillLevel(SkillFactory.getSkill(30020233), (byte) 1, (byte) 1); //하이브리드 로직
            newchar.changeSkillLevel(SkillFactory.getSkill(30020234), (byte) 1, (byte) 1); //멀티래터럴 I
            newchar.changeSkillLevel(SkillFactory.getSkill(30021235), (byte) 1, (byte) 1); //프로멧사 어썰트
            newchar.changeSkillLevel(SkillFactory.getSkill(30021236), (byte) 1, (byte) 1); //멀티 모드 링커
            newchar.changeSkillLevel(SkillFactory.getSkill(30021237), (byte) 1, (byte) 1); //에비에이션 리버티
            newchar.changeSkillLevel(SkillFactory.getSkill(30020240), (byte) 1, (byte) 1); //카모플라쥬
        } else if (JobType == MapleNewCharJobType.팬텀.getValue()) { //팬텀
            newchar.setJob((short) 2003);
            newchar.changeSkillLevel(SkillFactory.getSkill(20031203), (byte) 1, (byte) 1); //리턴 오브 팬텀
            newchar.changeSkillLevel(SkillFactory.getSkill(20030204), (byte) 1, (byte) 1); //데들리 인스팅트
            newchar.changeSkillLevel(SkillFactory.getSkill(20031205), (byte) 1, (byte) 1); //팬텀 슈라우드
            newchar.changeSkillLevel(SkillFactory.getSkill(20030206), (byte) 1, (byte) 1); //하이 덱스터러티
            newchar.changeSkillLevel(SkillFactory.getSkill(20031207), (byte) 1, (byte) 1); //스틸 스킬
            newchar.changeSkillLevel(SkillFactory.getSkill(20031208), (byte) 1, (byte) 1); //스킬 매니지먼트
            newchar.changeSkillLevel(SkillFactory.getSkill(20031209), (byte) 1, (byte) 1); //저지먼트
            newchar.changeSkillLevel(SkillFactory.getSkill(20031260), (byte) 1, (byte) 1); //저지먼트 AUTO / MANUAL
        } else if (JobType == MapleNewCharJobType.미하일.getValue()) { //미하일
            newchar.setJob((short) 5000);
            newchar.changeSkillLevel(SkillFactory.getSkill(50001214), (byte) 1, (byte) 1); //빛의 수호
        } else if (JobType == MapleNewCharJobType.루미너스.getValue()) { //루미너스
            newchar.setJob((short) 2004);
            newchar.changeSkillLevel(SkillFactory.getSkill(20040219), (byte) 1, (byte) 1);  //이퀄리브리엄
            newchar.changeSkillLevel(SkillFactory.getSkill(20040216), (byte) 1, (byte) 1); //선파이어
            newchar.changeSkillLevel(SkillFactory.getSkill(20040217), (byte) 1, (byte) 1); //이클립스
            newchar.changeSkillLevel(SkillFactory.getSkill(20040218), (byte) 1, (byte) 1); //퍼미에이트
            newchar.changeSkillLevel(SkillFactory.getSkill(20040221), (byte) 1, (byte) 1); //파워오브라이트
            newchar.changeSkillLevel(SkillFactory.getSkill(20041222), (byte) 1, (byte) 1); //라이트 블링크
        } else if (JobType == MapleNewCharJobType.카이저.getValue()) { //카이저
            newchar.setJob((short) 6000);
            newchar.changeSkillLevel(SkillFactory.getSkill(60001216), (byte) 1, (byte) 1); //리셔플 스위치 : 방어모드
            newchar.changeSkillLevel(SkillFactory.getSkill(60001217), (byte) 1, (byte) 1); //리셔플 스위치 : 공격모드
            newchar.changeSkillLevel(SkillFactory.getSkill(60001218), (byte) 1, (byte) 1); //바티컬커넥트
            newchar.changeSkillLevel(SkillFactory.getSkill(60001219), (byte) 1, (byte) 1); //아이언 윌
            newchar.changeSkillLevel(SkillFactory.getSkill(60001220), (byte) 1, (byte) 1); //트랜스피규레이션
            newchar.changeSkillLevel(SkillFactory.getSkill(60001225), (byte) 1, (byte) 1); //커맨드
        } else if (JobType == MapleNewCharJobType.엔젤릭버스터.getValue()) { //카이저
            newchar.setJob((short) 6001);
            newchar.changeSkillLevel(SkillFactory.getSkill(60011216), (byte) 1, (byte) 1); //석세서
            newchar.changeSkillLevel(SkillFactory.getSkill(60011218), (byte) 1, (byte) 1); //매지컬 리프트
            newchar.changeSkillLevel(SkillFactory.getSkill(60011219), (byte) 1, (byte) 1); //소울 컨트랙트
            newchar.changeSkillLevel(SkillFactory.getSkill(60011220), (byte) 1, (byte) 1); //데이드림
            newchar.changeSkillLevel(SkillFactory.getSkill(60011221), (byte) 1, (byte) 1); //코디네이트
            newchar.changeSkillLevel(SkillFactory.getSkill(60011222), (byte) 1, (byte) 1); //드레스 업
        } else if (JobType == MapleNewCharJobType.제로.getValue()) {
            newchar.setJob((short) 10112);
            newchar.setLevel(100);
            newchar.changeSkillLevel(SkillFactory.getSkill(100001262), (byte) 1, (byte) 1);
            newchar.changeSkillLevel(SkillFactory.getSkill(100000282), (byte) 1, (byte) 1);
            newchar.changeSkillLevel(SkillFactory.getSkill(100001263), (byte) 1, (byte) 1);
            newchar.changeSkillLevel(SkillFactory.getSkill(100001264), (byte) 1, (byte) 1);
            newchar.changeSkillLevel(SkillFactory.getSkill(100001265), (byte) 1, (byte) 1);
            newchar.changeSkillLevel(SkillFactory.getSkill(100001266), (byte) 1, (byte) 1);
            newchar.changeSkillLevel(SkillFactory.getSkill(100001268), (byte) 1, (byte) 1);
            newchar.changeSkillLevel(SkillFactory.getSkill(100000279), (byte) 5, (byte) 5);
        } else if (JobType == MapleNewCharJobType.은월.getValue()) {
            newchar.setJob((short) 2005);
        } else if (JobType == MapleNewCharJobType.핑크빈.getValue()) {
            newchar.setJob((short) 13100);
        } else if (JobType == MapleNewCharJobType.키네시스.getValue()) {
            newchar.setJob((short) 14000);
        }
        newchar.setMap(ServerConstants.startMap);
        MapleInventory equip = newchar.getInventory(MapleInventoryType.EQUIPPED);
        Equip eq_top = new Equip(top, (short) -5, (byte) 0);
        eq_top.setWdef((short) 3);
        eq_top.setUpgradeSlots((byte) 7);
        eq_top.setExpiration(-1);
        equip.addFromDB(eq_top.copy());
        if (JobType == MapleNewCharJobType.데몬슬레이어.getValue()) {
            Equip shielde = new Equip(shield, (short) -10, (byte) 0);
            shielde.setMp((short) 110);
            shielde.setHp((short) 200);
            shielde.setUpgradeSlots((byte) 7);
            shielde.setExpiration(-1);
            equip.addFromDB(shielde.copy());
        }
        if (JobType == MapleNewCharJobType.카이저.getValue() || JobType == MapleNewCharJobType.엔젤릭버스터.getValue()) {
            Equip js = new Equip(1352504, (short) -10, (byte) 0);
            if (JobType == MapleNewCharJobType.카이저.getValue()) {
                js = null;
                js = new Equip(1352504, (short) -10, (byte) 0);
            } else if (JobType == MapleNewCharJobType.엔젤릭버스터.getValue()) {
                js = null;
                js = new Equip(1352600, (short) -10, (byte) 0);
            }
            js.setWdef((short) 5);
            js.setMdef((short) 5);
            js.setUpgradeSlots((byte) 7);
            js.setExpiration(-1);
            equip.addFromDB(js.copy());
        }
        Equip shoese = new Equip(shoes, (short) -7, (byte) 0);
        shoese.setWdef((short) 2);
        shoese.setUpgradeSlots((byte) 7);
        shoese.setExpiration(-1);
        equip.addFromDB(shoese.copy());
        if (JobType != MapleNewCharJobType.시그너스.getValue() && JobType != MapleNewCharJobType.레지스탕스.getValue() && JobType != MapleNewCharJobType.메르세데스.getValue() && JobType != MapleNewCharJobType.데몬슬레이어.getValue() && JobType != MapleNewCharJobType.루미너스.getValue() && JobType != MapleNewCharJobType.카이저.getValue() && JobType != MapleNewCharJobType.엔젤릭버스터.getValue() && JobType != MapleNewCharJobType.제논.getValue() && JobType != MapleNewCharJobType.모험가.getValue() && JobType != MapleNewCharJobType.캐논슈터.getValue() && JobType != MapleNewCharJobType.듀얼블레이더.getValue() && JobType != MapleNewCharJobType.팬텀.getValue() && JobType != MapleNewCharJobType.제로.getValue() && JobType != MapleNewCharJobType.핑크빈.getValue() && JobType != MapleNewCharJobType.키네시스.getValue()) { //데몬슬레이어, 레지스탕스, 메르세데스, 루미너스, 카이저, 엔버, 제논, 키네시스는 한벌옷.
            Equip bottome = new Equip(bottom, (short) -6, (byte) 0);
            bottome.setWdef((short) 2);
            bottome.setUpgradeSlots((byte) 7);
            bottome.setExpiration(-1);
            equip.addFromDB(bottome.copy());
        }
        if (JobType == MapleNewCharJobType.팬텀.getValue() || JobType == MapleNewCharJobType.루미너스.getValue() || JobType == MapleNewCharJobType.제로.getValue() || JobType == MapleNewCharJobType.은월.getValue()) {
            Equip capee = new Equip(cape, (short) -9, (byte) 0);
            capee.setWdef((short) 5);
            capee.setMdef((short) 5);
            capee.setUpgradeSlots((byte) 7);
            capee.setExpiration(-1);
            equip.addFromDB(capee.copy());
        }
        if (JobType == MapleNewCharJobType.시그너스.getValue()) {
            Equip capee = new Equip(1102534, (short) -9, (byte) 0);
            capee.setWdef((short) 5);
            capee.setMdef((short) 5);
            capee.setUpgradeSlots((byte) 7);
            capee.setExpiration(-1);
            equip.addFromDB(capee.copy());
        }
        Equip weapone = new Equip(weapon, (short) -11, (byte) 0);
        if (JobType == MapleNewCharJobType.루미너스.getValue()) {
            weapone.setMatk((short) 17);
        } else {
            weapone.setWatk((short) 17);
        }
        weapone.setUpgradeSlots((byte) 7);
        weapone.setExpiration(-1);
        equip.addFromDB(weapone.copy());
        if (JobType == MapleNewCharJobType.제로.getValue()) {
            Equip js = new Equip(1562000, (short) -10, (byte) 0);
            weapone.setUpgradeSlots((byte) 7);
            weapone.setExpiration(-1);
            equip.addFromDB(js.copy());
        }
        if (MapleCharacterUtil.canCreateChar(name) && !MapleLoginHelper.getInstance().isForbiddenName(name)) {
            MapleCharacter.saveNewCharToDB(newchar);
            MapleItempotMain.getInstance().newCharDB(newchar.getId());
            c.getSession().writeAndFlush(LoginPacket.addNewCharacterEntry(newchar, true));
            c.createdChar(newchar.getId());
            if (c.getCharacterPosition(c.getAccID()).size() > 0) {
                linkedHashMap.put(c.getCharacterPosition(c.getAccID()).size() + 1, newchar.getId());
                c.updateCharacterPosition(linkedHashMap, true);
            }
        } else {
            c.getSession().writeAndFlush(LoginPacket.addNewCharacterEntry(newchar, false));
        }
        newchar = null;
    }

    public static void DeleteChar(ReadingMaple rh, MapleClient c) {
        String Secondpw_Client = rh.readMapleAsciiString();
        int Character_ID = rh.readInt();
        MapleCharacter chr = MapleCharacter.loadCharFromDB(Character_ID, c, false);
        if (!c.login_Auth(Character_ID)) {
            c.getSession().close();
            return; // Attempting to delete other character
        }
        byte state = 0;
        if (Secondpw_Client == null) { // Client's hacking
            c.getSession().close();
            return;
        } else if (!c.CheckSecondPassword(Secondpw_Client)) { // Wrong Password
            state = 0x14;
        }
        if (state == 0) {
            if (!c.deleteCharacter(Character_ID)) {
                state = 1; //actually something else would be good o.o
            }
        }
        c.getSession().writeAndFlush(LoginPacket.deleteCharResponse(Character_ID, state));
    }

    public static void Character_WithSecondPassword(ReadingMaple rh, MapleClient c) {
        String password = rh.readMapleAsciiString();
        int charId = rh.readInt();

        if (loginFailCount(c) || c.getSecondPassword() == null || !c.login_Auth(charId)) { // This should not happen unless player is hacking
            c.getSession().close();
            return;
        }
        if (c.CheckSecondPassword(password)) {
            if (c.getIdleTask() != null) {
                c.getIdleTask().cancel(true);
            }
            c.updateLoginState(MapleClient.LOGIN_SERVER_TRANSITION, c.getSessionIPAddress());
            c.getSession().writeAndFlush(MainPacketCreator.getServerIP(c, ServerConstants.ChannelPort + c.getChannel(), ServerConstants.BuddyChatPort, charId));
        } else {
            c.getSession().writeAndFlush(LoginPacket.secondPwError((byte) 0x14));
        }
    }

    public static void addPartTime(ReadingMaple rh, MapleClient c) {
        byte mode = rh.readByte();
        if (mode == 1) {
            int chrid = rh.readInt();
            byte job = rh.readByte();
            c.send(MainPacketCreator.PartTimeJob(chrid, job, 0, System.currentTimeMillis()));
            Connection con = null;
            try {
                con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("INSERT INTO parttime (cid, job, starttime, reward) VALUES (?, ?, ?, ?)");
                Throwable localThrowable5 = null;
                try {
                    ps.setInt(1, chrid);
                    ps.setByte(2, job);
                    ps.setLong(3, System.currentTimeMillis());
                    ps.setInt(4, 0);
                    ps.execute();
                    ps.close();
                } catch (Throwable localThrowable1) {
                    localThrowable5 = localThrowable1;
                    throw localThrowable1;
                } finally {
                    if (ps != null) {
                        if (localThrowable5 != null) {
                            try {
                                ps.close();
                            } catch (Throwable x2) {
                                localThrowable5.addSuppressed(x2);
                            }
                        } else {
                            ps.close();
                        }
                    }
                }
            } catch (SQLException ex) {
                System.err.println(new StringBuilder().append("parttime error : \r\n").append(ex).toString());
            }
        } else if (mode == 2) {
            int chrid = rh.readInt();
            byte job = rh.readByte();
            long starttime = 0;
            int reward = 0;
            Connection con = null;
            try {
                con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM parttime WHERE cid = ?");
                try {
                    ps.setInt(1, chrid);
                    ResultSet rs = ps.executeQuery();
                    if (rs.next()) {
                        starttime = rs.getLong("starttime");
                    }
                    ps.close();
                    rs.close();
                } catch (Throwable localThrowable2) {
                    throw localThrowable2;
                } finally {
                    if (ps != null) {
                        try {
                            ps.close();
                        } catch (Throwable x2) {
                            x2.addSuppressed(x2);
                        }
                    } else {
                        ps.close();
                    }
                }
            } catch (SQLException ex) {
            }

            long length = System.currentTimeMillis() - starttime;
            Throwable localThrowable6;
            if (length < 3600000L) {
                job = 0;
                reward = 0;
                c.send(MainPacketCreator.PartTimeJob(chrid, job, reward, 94354848000000000L));
                try {
                    PreparedStatement ps = con.prepareStatement("DELETE FROM parttime WHERE cid = ?");
                    localThrowable6 = null;
                    try {
                        ps.setInt(1, chrid);
                        ps.execute();
                        ps.close();
                    } catch (Throwable localThrowable3) {
                        localThrowable6 = localThrowable3;
                        throw localThrowable3;
                    } finally {
                        if (ps != null) {
                            if (localThrowable6 != null) {
                                try {
                                    ps.close();
                                } catch (Throwable x2) {
                                    localThrowable6.addSuppressed(x2);
                                }
                            } else {
                                ps.close();
                            }
                        }
                    }
                } catch (SQLException ex) {
                }

                return;
            }
            switch (job) {
                case 1:
                    if (length >= 21600000L) {
                        reward = 999999;
                    } else if ((length < 21600000L) && (length > 3600000L)) {
                        reward = 500000;
                    }
                    break;
                case 2:
                    if (length >= 21600000L) {
                        reward = 1212065;
                    } else if ((length < 21600000L) && (length > 3600000L)) {
                        reward = 1212065;
                    }
                    break;
                case 3:
                    if (length >= 21600000L) {
                        reward = 1072789;
                    } else if ((length < 21600000L) && (length > 3600000L)) {
                        reward = 1072789;
                    }
                    break;
                case 4:
                    if (length >= 21600000L) {
                        reward = 1072850;
                    } else if ((length < 21600000L) && (length > 3600000L)) {
                        reward = 1072850;
                    }
                    break;
                case 5:
                    if (length >= 21600000L) {
                        reward = 1242025;
                    } else if ((length < 21600000L) && (length > 3600000L)) {
                        reward = 1242025;
                    }
                    break;
            }
            c.send(MainPacketCreator.PartTimeJob(chrid, job, reward, 0L));
            try {
                if (job != 0) {
                    con = MYSQL.getConnection();
                    PreparedStatement ps = con.prepareStatement("UPDATE parttime SET reward = ?, starttime = ? WHERE cid = ?");
                    localThrowable6 = null;
                    try {
                        ps.setInt(1, reward);
                        ps.setLong(2, length);
                        ps.setInt(3, chrid);
                        ps.execute();
                        ps.close();
                    } catch (Throwable localThrowable4) {
                        localThrowable6 = localThrowable4;
                        throw localThrowable4;
                    } finally {
                        if (ps != null) {
                            if (localThrowable6 != null) {
                                try {
                                    ps.close();
                                } catch (Throwable x2) {
                                    localThrowable6.addSuppressed(x2);
                                }
                            } else {
                                ps.close();
                            }
                        }
                    }
                }
            } catch (SQLException ex) {
            }

        }
    }

    public static final void updateCCards(final ReadingMaple slea, final MapleClient c) {
        final Map<Integer, Integer> cids = new LinkedHashMap<>();
        for (int i = 1; i <= 9; i++) { // 6 chars
            final int charId = slea.readInt();
            cids.put(i, charId);
        }
        c.updateCharacterCards(cids);
    }
}
