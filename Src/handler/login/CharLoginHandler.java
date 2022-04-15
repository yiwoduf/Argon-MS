/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
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
                if (!login.contains("������")) {
                    c.send(MainPacketCreator.serverNotice(1, "���� ���� ������ �Դϴ�."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                }
            }
            if (ServerConstants.isShutdown) {
                c.send(MainPacketCreator.serverNotice(1, "���� ������ �Դϴ�."));
                c.send(LoginPacket.getLoginFailed(20));
                return;
            }
            c.setAccountName(login);
            boolean ipBan = c.hasBannedIP();
            boolean macBan = false;

            int checkId = AutoRegister.checkAccount(c, login, pwd);
            if (!GameConstants.isServerReady()) {
                c.send(MainPacketCreator.serverNotice(1, "���������͸� �ҷ����� ���Դϴ�. ��ø� ��ٷ��ּ���."));
                c.send(LoginPacket.getLoginFailed(20));
                return;
            }

            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("SELECT * FROM accounts WHERE name = ?"); // ���̵� �ҷ���.
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
                c.send(MainPacketCreator.serverNotice(1, "[�˸�] �ش� ��ǻ�Ϳ��� �̹� " + c.getSessionIPAccountName(c.getSessionIPAddress()) + "�������� �̹� �α��� �Ǿ��ֽ��ϴ�. �ش� ���� �α׾ƿ� ���� �α��� ��Ź�帳�ϴ�."));
                c.send(LoginPacket.getLoginFailed(20));
                return;
            } else {
                c.InsertSessionIP(c.getSessionIPAddress(), login);
            } */

            switch (checkId) {
                case 0:
                    //���� ������ ���̵��϶�
                    if (canjoin == 1) {
                        AutoRegister.registerAccount(c, login, pwd);
                        c.send(MainPacketCreator.serverNotice(1, ServerConstants.serverName + " ���������� ���������� �Ϸ��Ͽ����ϴ� !\r\n�ٽ��ѹ� �α��� ���ֽñ� �ٶ��ϴ�."));
                        c.send(LoginPacket.getLoginFailed(20));
                        return;
                    } else {
                        c.send(MainPacketCreator.serverNotice(1, "���� �������Դϴ�, ��� �Ŀ� �ٽýõ� ���ּ���."));
                        c.send(LoginPacket.getLoginFailed(20));
                    }
                    break;
                case 1:
                    //���� ã�� ����
                    c.send(MainPacketCreator.serverNotice(1, "�ش��ϴ� ������ �����ϴ�.\r\n" + ServerConstants.serverName + " Ȩ��������\r\n���� �����ϼż� ȸ��������\r\n���ֽñ� �ٶ��ϴ�."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                case 2:
                    //php����
                    c.send(MainPacketCreator.serverNotice(1, "������ ������ �߻��߽��ϴ�, ��� �Ŀ� �ٽýõ� ���ּ���."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                case 3:
                    //����
                    c.send(MainPacketCreator.serverNotice(1, "����Ʈ�� ������ ���� �ʽ��ϴ�. ������ ��޾��� ������ �� �̿��� �ֽñ� �ٶ��ϴ�."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                case 6:
                    //Ƚ���ʰ�
                    c.send(MainPacketCreator.serverNotice(1, "�� �����Ǵ� ������ �������� �ִ�Ƚ���� �ʰ��߽��ϴ�."));
                    c.send(LoginPacket.getLoginFailed(20));
                    return;
                case 5:
                    if (c.getSessionIP(c.getSessionIPAddress()) != null && c.getLoginState() > MapleClient.LOGIN_NOTLOGGEDIN) { // ġ�쾾 :: �ҽ� ���� ?���� ������ ���ϳ�; ����߸��Է��ϸ� �׳� ��׾��� �����°��� ������
                        c.send(MainPacketCreator.serverNotice(1, "[�˸�] �ش� ��ǻ�Ϳ��� �̹� " + c.getSessionIPAccountName(c.getSessionIPAddress()) + "�������� �̹� �α��� �Ǿ��ֽ��ϴ�. �ش� ���� �α׾ƿ� ���� �α��� ��Ź�帳�ϴ�."));
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
            c.send(MainPacketCreator.serverNotice(1, "[" + ServerConstants.serverName + "] ���� ������ �غ���� �ʾҽ��ϴ�.\r\n\r\n�ʿ��� �����͸� �ҷ����� ���̹Ƿ� ���� ������ �����Ͻ� �� �����ϴ�.\r\n\r\n��� �� ������ ���ֽñ� �ٶ��ϴ�."));
            return;
        }
        final boolean isFirstLogin = rh.readByte() == 0;
        if (!isFirstLogin) { //1.2.239+ ���� ���� ����.
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
        /* �α��� ���� */
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
            c.getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "�߸��� ��û�Դϴ�."));
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
        if (JobType == MapleNewCharJobType.����.getValue()) {
            newchar.setSecondGender(rh.readByte());
        } else {
            newchar.setGender(rh.readByte());
        }
        newchar.setSkinColor(rh.readByte());
        rh.skip(1);
        newchar.setFace(rh.readInt());
        newchar.setHair(rh.readInt());
        if (JobType == MapleNewCharJobType.���󽽷��̾�.getValue() || JobType == MapleNewCharJobType.����.getValue()) {
            newchar.setSecondFace(rh.readInt());
        }
        if (JobType == MapleNewCharJobType.����.getValue()) {
            newchar.setGender((byte) 1);
            newchar.setSecondSkinColor((byte) 0);
            newchar.setSecondFace(21290);
            newchar.setSecondHair(37623);
        }
        int top = rh.readInt();
        int bottom = 0;
        if (JobType != MapleNewCharJobType.�ñ׳ʽ�.getValue() && JobType != MapleNewCharJobType.����������.getValue() && JobType != MapleNewCharJobType.�޸�������.getValue() && JobType != MapleNewCharJobType.���󽽷��̾�.getValue() && JobType != MapleNewCharJobType.��̳ʽ�.getValue() && JobType != MapleNewCharJobType.ī����.getValue() && JobType != MapleNewCharJobType.������������.getValue() && JobType != MapleNewCharJobType.����.getValue() && JobType != MapleNewCharJobType.���谡.getValue() && JobType != MapleNewCharJobType.ĳ����.getValue() && JobType != MapleNewCharJobType.�����̴�.getValue() && JobType != MapleNewCharJobType.����.getValue() && JobType != MapleNewCharJobType.����.getValue() && JobType != MapleNewCharJobType.��ũ��.getValue() && JobType != MapleNewCharJobType.Ű�׽ý�.getValue()) {
            bottom = rh.readInt();
        }
        if (JobType == MapleNewCharJobType.�ñ׳ʽ�.getValue()) {
            rh.skip(4);
        }
        int cape = 0;
        if (JobType == MapleNewCharJobType.����.getValue() || JobType == MapleNewCharJobType.��̳ʽ�.getValue() || JobType == MapleNewCharJobType.����.getValue() || JobType == MapleNewCharJobType.����.getValue()) {
            cape = rh.readInt();
        }
        int shoes = rh.readInt();
        int weapon = rh.readInt();
        int shield = 0;
        if (JobType == MapleNewCharJobType.���󽽷��̾�.getValue()) {
            shield = rh.readInt();
        }
        if (!MapleCharacterUtil.canCreateChar(name) || MapleLoginHelper.getInstance().isForbiddenName(name)) { //���� ���� �ߺ��г��� �߽߰�
            c.send(MainPacketCreator.serverNotice(1, "ĳ���� �������� ������ �߻��߽��ϴ�!"));
            c.send(LoginPacket.getLoginFailed(30));
            return;
        }
        newchar.setSubcategory(subCategory);
        newchar.setName(name);
        if (c.isGm()) {
            newchar.setGMLevel((byte) 6);
        }

        if (JobType == MapleNewCharJobType.���谡.getValue() || JobType == MapleNewCharJobType.�����̴�.getValue() || JobType == MapleNewCharJobType.ĳ����.getValue()) { //���谡
            newchar.setJob((short) 0);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161001, (byte) 0, (short) 1, (byte) 0));
        } else if (JobType == MapleNewCharJobType.����������.getValue()) { //����������
            newchar.setJob((short) 3000);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161054, (byte) 0, (short) 1, (byte) 0));
            newchar.changeSkillLevel(SkillFactory.getSkill(30001061), (byte) 1, (byte) 1);
        } else if (JobType == MapleNewCharJobType.�ñ׳ʽ�.getValue()) { //�ñ׳ʽ�
            newchar.setJob((short) 1000);
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161047, (byte) 0, (short) 1, (byte) 0));
            newchar.changeSkillLevel(SkillFactory.getSkill(10001003), (byte) 1, (byte) 1); //������ ȥ
            newchar.changeSkillLevel(SkillFactory.getSkill(10001244), (byte) 1, (byte) 1); //������Ż ������
            newchar.changeSkillLevel(SkillFactory.getSkill(10001245), (byte) 1, (byte) 1); //���� Ȩ
            newchar.changeSkillLevel(SkillFactory.getSkill(10000246), (byte) 1, (byte) 1); //������Ż �ϸ��
            newchar.changeSkillLevel(SkillFactory.getSkill(10000252), (byte) 1, (byte) 1); //������Ż ����Ʈ
        } else if (JobType == MapleNewCharJobType.�ƶ�.getValue()) { //�ƶ�
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161048, (byte) 0, (short) 1, (byte) 0));
            newchar.setJob((short) 2000);
        } else if (JobType == MapleNewCharJobType.����.getValue()) { //����
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161052, (byte) 0, (short) 1, (byte) 0));
            newchar.setJob((short) 2001);
        } else if (JobType == MapleNewCharJobType.�޸�������.getValue()) { //�޸�������
            newchar.setJob((short) 2002);
            newchar.changeSkillLevel(SkillFactory.getSkill(20020109), (byte) 1, (byte) 1); //������ ȸ��
            newchar.changeSkillLevel(SkillFactory.getSkill(20021110), (byte) 1, (byte) 1); //������ �ູ
            newchar.changeSkillLevel(SkillFactory.getSkill(20020111), (byte) 1, (byte) 1); //��Ÿ�ϸ��� ����
            newchar.changeSkillLevel(SkillFactory.getSkill(20020112), (byte) 1, (byte) 1); //���� �ڰ�
            newchar.getInventory(MapleInventoryType.ETC).addItem(new Item(4161079, (byte) 0, (short) 1, (byte) 0));
        } else if (JobType == MapleNewCharJobType.���󽽷��̾�.getValue()) { //���󽽷��̾�
            newchar.setJob((short) 3001);
            newchar.changeSkillLevel(SkillFactory.getSkill(30011109), (byte) 1, (byte) 1); //���� ����
            newchar.changeSkillLevel(SkillFactory.getSkill(30010110), (byte) 1, (byte) 1); //���� ����
        } else if (JobType == MapleNewCharJobType.����.getValue()) { //����
            newchar.setJob((short) 3002);
            newchar.changeSkillLevel(SkillFactory.getSkill(30020232), (byte) 1, (byte) 1); //���÷��� ���ö���
            newchar.changeSkillLevel(SkillFactory.getSkill(30020233), (byte) 1, (byte) 1); //���̺긮�� ����
            newchar.changeSkillLevel(SkillFactory.getSkill(30020234), (byte) 1, (byte) 1); //��Ƽ���ͷ� I
            newchar.changeSkillLevel(SkillFactory.getSkill(30021235), (byte) 1, (byte) 1); //���θ�� ���Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(30021236), (byte) 1, (byte) 1); //��Ƽ ��� ��Ŀ
            newchar.changeSkillLevel(SkillFactory.getSkill(30021237), (byte) 1, (byte) 1); //�����̼� ����Ƽ
            newchar.changeSkillLevel(SkillFactory.getSkill(30020240), (byte) 1, (byte) 1); //ī���ö���
        } else if (JobType == MapleNewCharJobType.����.getValue()) { //����
            newchar.setJob((short) 2003);
            newchar.changeSkillLevel(SkillFactory.getSkill(20031203), (byte) 1, (byte) 1); //���� ���� ����
            newchar.changeSkillLevel(SkillFactory.getSkill(20030204), (byte) 1, (byte) 1); //���鸮 �ν���Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(20031205), (byte) 1, (byte) 1); //���� ������
            newchar.changeSkillLevel(SkillFactory.getSkill(20030206), (byte) 1, (byte) 1); //���� �����ͷ�Ƽ
            newchar.changeSkillLevel(SkillFactory.getSkill(20031207), (byte) 1, (byte) 1); //��ƿ ��ų
            newchar.changeSkillLevel(SkillFactory.getSkill(20031208), (byte) 1, (byte) 1); //��ų �Ŵ�����Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(20031209), (byte) 1, (byte) 1); //������Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(20031260), (byte) 1, (byte) 1); //������Ʈ AUTO / MANUAL
        } else if (JobType == MapleNewCharJobType.������.getValue()) { //������
            newchar.setJob((short) 5000);
            newchar.changeSkillLevel(SkillFactory.getSkill(50001214), (byte) 1, (byte) 1); //���� ��ȣ
        } else if (JobType == MapleNewCharJobType.��̳ʽ�.getValue()) { //��̳ʽ�
            newchar.setJob((short) 2004);
            newchar.changeSkillLevel(SkillFactory.getSkill(20040219), (byte) 1, (byte) 1);  //�������긮��
            newchar.changeSkillLevel(SkillFactory.getSkill(20040216), (byte) 1, (byte) 1); //�����̾�
            newchar.changeSkillLevel(SkillFactory.getSkill(20040217), (byte) 1, (byte) 1); //��Ŭ����
            newchar.changeSkillLevel(SkillFactory.getSkill(20040218), (byte) 1, (byte) 1); //�۹̿���Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(20040221), (byte) 1, (byte) 1); //�Ŀ��������Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(20041222), (byte) 1, (byte) 1); //����Ʈ ��ũ
        } else if (JobType == MapleNewCharJobType.ī����.getValue()) { //ī����
            newchar.setJob((short) 6000);
            newchar.changeSkillLevel(SkillFactory.getSkill(60001216), (byte) 1, (byte) 1); //������ ����ġ : �����
            newchar.changeSkillLevel(SkillFactory.getSkill(60001217), (byte) 1, (byte) 1); //������ ����ġ : ���ݸ��
            newchar.changeSkillLevel(SkillFactory.getSkill(60001218), (byte) 1, (byte) 1); //��Ƽ��Ŀ��Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(60001219), (byte) 1, (byte) 1); //���̾� ��
            newchar.changeSkillLevel(SkillFactory.getSkill(60001220), (byte) 1, (byte) 1); //Ʈ�����ǱԷ��̼�
            newchar.changeSkillLevel(SkillFactory.getSkill(60001225), (byte) 1, (byte) 1); //Ŀ�ǵ�
        } else if (JobType == MapleNewCharJobType.������������.getValue()) { //ī����
            newchar.setJob((short) 6001);
            newchar.changeSkillLevel(SkillFactory.getSkill(60011216), (byte) 1, (byte) 1); //������
            newchar.changeSkillLevel(SkillFactory.getSkill(60011218), (byte) 1, (byte) 1); //������ ����Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(60011219), (byte) 1, (byte) 1); //�ҿ� ��Ʈ��Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(60011220), (byte) 1, (byte) 1); //���̵帲
            newchar.changeSkillLevel(SkillFactory.getSkill(60011221), (byte) 1, (byte) 1); //�ڵ����Ʈ
            newchar.changeSkillLevel(SkillFactory.getSkill(60011222), (byte) 1, (byte) 1); //�巹�� ��
        } else if (JobType == MapleNewCharJobType.����.getValue()) {
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
        } else if (JobType == MapleNewCharJobType.����.getValue()) {
            newchar.setJob((short) 2005);
        } else if (JobType == MapleNewCharJobType.��ũ��.getValue()) {
            newchar.setJob((short) 13100);
        } else if (JobType == MapleNewCharJobType.Ű�׽ý�.getValue()) {
            newchar.setJob((short) 14000);
        }
        newchar.setMap(ServerConstants.startMap);
        MapleInventory equip = newchar.getInventory(MapleInventoryType.EQUIPPED);
        Equip eq_top = new Equip(top, (short) -5, (byte) 0);
        eq_top.setWdef((short) 3);
        eq_top.setUpgradeSlots((byte) 7);
        eq_top.setExpiration(-1);
        equip.addFromDB(eq_top.copy());
        if (JobType == MapleNewCharJobType.���󽽷��̾�.getValue()) {
            Equip shielde = new Equip(shield, (short) -10, (byte) 0);
            shielde.setMp((short) 110);
            shielde.setHp((short) 200);
            shielde.setUpgradeSlots((byte) 7);
            shielde.setExpiration(-1);
            equip.addFromDB(shielde.copy());
        }
        if (JobType == MapleNewCharJobType.ī����.getValue() || JobType == MapleNewCharJobType.������������.getValue()) {
            Equip js = new Equip(1352504, (short) -10, (byte) 0);
            if (JobType == MapleNewCharJobType.ī����.getValue()) {
                js = null;
                js = new Equip(1352504, (short) -10, (byte) 0);
            } else if (JobType == MapleNewCharJobType.������������.getValue()) {
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
        if (JobType != MapleNewCharJobType.�ñ׳ʽ�.getValue() && JobType != MapleNewCharJobType.����������.getValue() && JobType != MapleNewCharJobType.�޸�������.getValue() && JobType != MapleNewCharJobType.���󽽷��̾�.getValue() && JobType != MapleNewCharJobType.��̳ʽ�.getValue() && JobType != MapleNewCharJobType.ī����.getValue() && JobType != MapleNewCharJobType.������������.getValue() && JobType != MapleNewCharJobType.����.getValue() && JobType != MapleNewCharJobType.���谡.getValue() && JobType != MapleNewCharJobType.ĳ����.getValue() && JobType != MapleNewCharJobType.�����̴�.getValue() && JobType != MapleNewCharJobType.����.getValue() && JobType != MapleNewCharJobType.����.getValue() && JobType != MapleNewCharJobType.��ũ��.getValue() && JobType != MapleNewCharJobType.Ű�׽ý�.getValue()) { //���󽽷��̾�, ����������, �޸�������, ��̳ʽ�, ī����, ����, ����, Ű�׽ý��� �ѹ���.
            Equip bottome = new Equip(bottom, (short) -6, (byte) 0);
            bottome.setWdef((short) 2);
            bottome.setUpgradeSlots((byte) 7);
            bottome.setExpiration(-1);
            equip.addFromDB(bottome.copy());
        }
        if (JobType == MapleNewCharJobType.����.getValue() || JobType == MapleNewCharJobType.��̳ʽ�.getValue() || JobType == MapleNewCharJobType.����.getValue() || JobType == MapleNewCharJobType.����.getValue()) {
            Equip capee = new Equip(cape, (short) -9, (byte) 0);
            capee.setWdef((short) 5);
            capee.setMdef((short) 5);
            capee.setUpgradeSlots((byte) 7);
            capee.setExpiration(-1);
            equip.addFromDB(capee.copy());
        }
        if (JobType == MapleNewCharJobType.�ñ׳ʽ�.getValue()) {
            Equip capee = new Equip(1102534, (short) -9, (byte) 0);
            capee.setWdef((short) 5);
            capee.setMdef((short) 5);
            capee.setUpgradeSlots((byte) 7);
            capee.setExpiration(-1);
            equip.addFromDB(capee.copy());
        }
        Equip weapone = new Equip(weapon, (short) -11, (byte) 0);
        if (JobType == MapleNewCharJobType.��̳ʽ�.getValue()) {
            weapone.setMatk((short) 17);
        } else {
            weapone.setWatk((short) 17);
        }
        weapone.setUpgradeSlots((byte) 7);
        weapone.setExpiration(-1);
        equip.addFromDB(weapone.copy());
        if (JobType == MapleNewCharJobType.����.getValue()) {
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
