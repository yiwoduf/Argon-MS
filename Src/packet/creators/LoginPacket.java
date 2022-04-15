/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package packet.creators;

import java.util.List;
import java.util.Map;
import java.util.Set;

import client.MapleClient;
import client.MapleCharacter;
//import packet.transfer.write.byte[];
import packet.opcode.SendPacketOpcode;
import constants.ServerConstants;
import constants.GameConstants;
import launch.ChannelServer;
import launch.LoginServer;
import packet.transfer.write.WritingPacket;
import tools.HexTool;

public class LoginPacket {

    public static final byte[] initializeConnection(final short mapleVersion, final byte[] sendIv, final byte[] recvIv, final boolean ingame) {
        final WritingPacket w = new WritingPacket();

        int ret = 0;
        byte[] bytes = new byte[]{0x00};
        if (ingame) {
            bytes = HexTool.getByteArrayFromHexString("4E 00 00 10 40 00 65 AE 0C 00 A3 BF 4C 00 A6 8E 16 00 E4 4E 63 00 52 02 00 00 A7 51 63 00 21 16 00 00 72 69 63 00 AE 12 02 00 54 7C 65 00 4E 14 00 00 55 91 65 00 11 03 00 00 D2 94 65 00 0E 00 00 00 C3 95 65 00 89 18 00 00 8C B0 65 00 9F 02 00 00 16 B4 65 00 68 0D 00 00 AD C3 65 00 7A 00 00 00 00 CD 65 00 5B 00 00 00 59 CE 65 00 6F 01 00 00 30 D1 65 00 59 00 00 00 8D D3 65 00 9A AB 39 00 48 80 9F 00 95 00 00 00 C3 81 9F 00 02 01 00 00 98 87 9F 00 F0 02 00 00 D4 8D 9F 00 43 05 00 00 44 93 9F 00 BE 1A 00 00 A4 B0 9F 00 F5 15 00 00 B0 C8 9F 00 31 51 00 00 4E 1C A0 00 37 1D 00 00 C3 39 A0 00 3D 4A 00 00 C6 86 A0 00 54 9E 00 00 4B 25 A1 00 05 00 00 00 CB 25 A1 00 30 2C 00 00 2C 52 A1 00 E6 00 00 00 43 53 A1 00 18 5E 00 00 0D B2 A1 00 44 3C 03 00 CF EE A4 00 D2 00 00 00 F6 EF A4 00 C2 BA 00 00 F0 AE A5 00 AC 02 00 00 6D B2 A5 00 50 00 00 00 46 B4 A5 00 6B 8A 1C 00 6F 3F C2 00 E2 3D 00 00 14 7E C2 00 CD 68 00 00 C8 E7 C2 00 11 88 01 00 8A 70 C4 00 1C 00 00 00 D9 72 C4 00 26 00 00 00 F3 73 C4 00 28 00 00 00 C3 76 C4 00 26 00 00 00 4C 78 C4 00 1D 00 00 00 EA 79 C4 00 39 29 07 00 95 A3 CB 00 4D 04 00 00 81 A8 CB 00 5D 26 17 00 6D CF E2 00 59 02 00 00 37 D2 E2 00 EC 20 00 00 D3 F4 E2 00 00 00 40 00 D3 F4 22 01 00 00 40 00 D3 F4 62 01 09 3B 0E 00 2D 36 71 01 97 0A 00 00 43 47 71 01 A6 19 00 00 F7 68 71 01 E7 30 00 00 E2 A5 71 01 A1 54 05 00 6E FB 76 01 BC C7 00 00 E4 C5 77 01 BC 1A 01 00 D7 E0 78 01 A6 4E 01 00 2F 36 7A 01 04 C5 05 00 7F FB 7F 01 43 0A 00 00 34 06 80 01 0F 00 00 00 B2 06 80 01 5F 01 00 00 56 0A 80 01 0B 00 00 00 9C 0A 80 01 05 00 00 00 DC 0A 80 01 BD 06 00 00 69 13 80 01 37 00 00 00 3C 14 80 01 B9 01 00 00 C2 16 80 01 72 00 00 00 3A 18 80 01 A3 02 00 00 44 1C 80 01 51 00 00 00 B5 1D 80 01 1D 00 00 00 68 1E 80 01 0C 00 00 00 F4 1E 80 01 31 00 00 00 45 20 80 01 1B 00 00 00 99 20 80 01 2B 00 00 00 33 21 80 01 CD 76 2D 00 BC 8D BB 01 A0 AC 12 00");
        }
        ret ^= (mapleVersion & 0x7FFF);
        ret ^= (ServerConstants.check << 15);
        ret ^= ((ServerConstants.subVersion & 0xFF) << 16);
        String version = String.valueOf(ret);
        int packetsize = 0;
        if (ingame) {
            packetsize = 13 + bytes.length + version.length();
        } else {
            packetsize = 14 + version.length(); //1.2.220+
        }
        w.writeShort(packetsize);
        w.write(0x23);
        w.write(0x01);
        w.writeMapleAsciiString(version);

        w.write(recvIv);
        w.write(sendIv);
        w.write(2); // 1 = KMS, 2 = KMST, 7 = MSEA, 8 = GlobalMS, 5 = Test Server
        w.write(bytes);

        return w.getPacket();
    }

    public static final byte[] getHotfix() {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.HOTFIX.getValue());
        w.writeInt(0);

        return w.getPacket();
    }

    public static final byte[] getSessionResponse(int pResponse) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.SESSION_CHECK.getValue());
        w.writeInt(pResponse);

        return w.getPacket();
    }

    public static final byte[] getClientQuitRequest(String Key) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.KEYGUARD_CHECK.getValue());
        w.writeMapleAsciiString(Key);

        return w.getPacket();
    }

    public static final byte[] getKeyGuardResponse(String Key) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.KEYGUARD_CHECK.getValue());
        w.writeMapleAsciiString(Key);

        return w.getPacket();
    }

    public static byte[] getRelogResponse() {
        WritingPacket packet = new WritingPacket(3);
        packet.writeShort(SendPacketOpcode.RELOG_RESPONSE.getValue());
        packet.write(1);

        return packet.getPacket();
    }

    public static final byte[] getPing() {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.PING.getValue());
        w.write(HexTool.getByteArrayFromHexString("80 19 68 00 20 02 00 00"));

        return w.getPacket();
    }

    /*
         * 로그인 메세지 코드
         * 
         * 0 : 성공
         * 3 : 지워지거나 접속 중지된 아이디 입니다.
         * 4 : 비밀번호가 일치하지 않습니다.
         * 5 : 등록되지 않은 아이디 입니다.
         * 6 : 시스템 오류로 접속할 수 없습니다.
         * 7 : 현재 접속중인 아이디 입니다.
         * 8 : 시스템 오류로 접속할 수 없습니다.
         * 9 : 시스템 오류로 접속할 수 없습니다.
         * 10 : 현재 서버에 접속요청이 많아 처리하지 못했습니다.
         * 11 : 20세 이상만 접속할 수 있습니다. 다른 서버에 선택해 주세요.
         * 17 : U-OTP 번호를 입력해주세요.
         * 18 : OTP 번호가 틀립니다.
     */
    public static final byte[] getLoginFailed(final int reason) {
        final WritingPacket w = new WritingPacket(16);
        w.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        w.writeInt(reason);
        w.writeShort(0);

        return w.getPacket();
    }

    public static final byte[] getPermBan(final byte reason) {
        final WritingPacket w = new WritingPacket(16);

        w.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        w.writeShort(2); // Account is banned
        w.write(0);
        w.write(reason);
        w.write(HexTool.getByteArrayFromHexString("01 01 01 01 00"));

        return w.getPacket();
    }

    public static final byte[] getTempBan(final long timestampTill, final byte reason) {
        final WritingPacket w = new WritingPacket(17);

        w.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        w.write(2);
        w.write(HexTool.getByteArrayFromHexString("00 00 00 00 00"));
        w.write(reason);
        w.writeLong(timestampTill); // Tempban date is handled as a 64-bit long, number of 100NS intervals since 1/1/1601. Lulz.

        return w.getPacket();
    }

    public static final byte[] getAuthSuccessRequest(final MapleClient client) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.LOGIN_STATUS.getValue());
        w.write(0);
        w.writeMapleAsciiString(client.getAccountName()); //sID
        w.writeInt(client.getAccID());//dwAccountID
        w.write(client.getGender()); //Gender
        w.write(client.isGm() ? 1 : 0); //Admin byte
        w.writeInt(0); // admin flag
        w.writeInt(0); // vip grade
        w.writeInt(0); // nBlockReason
        w.write(0); // purchase exp
        w.write(0); // pBlockReason
        w.writeLong(0); // chat unblock date
        if (true) { // NexonLogin
            w.write(1);
        } else {
            w.write(0);
            w.writeMapleAsciiString(client.getAccountName());
        }
        w.write(0); // is naver account?
        w.writeMapleAsciiString("");

        if (false) {
            w.write(0);
        } else {
            w.write(1);

            w.write(0x13); //1.2.250+
            for (int i = 0; i < 19; i++) { //Character Open Packet, 1.2.250+
                byte flag;
                if (i == 17) {
                    flag = 0;
                } else {
                    flag = 1;
                }
                w.write(flag);
                if (i == 17) {
                    w.writeShort(0);
                } else {
                    w.writeShort(1);
                }
            }
        }
        w.write(0);
        w.writeInt(0);
        return w.getPacket();
    }

    public static final byte[] getCharEndRequest(final MapleClient client, String Acc, String Pwd, boolean Charlist) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.CHAR_END_REQUEST.getValue());
        w.write(0);
        w.writeInt(client.getAccID());
        w.write(client.getGender());
        w.write(client.isGm() ? 1 : 0); // Admin byte
        w.write0(22);
        w.writeMapleAsciiString(Pwd); //패스워드.
        w.writeMapleAsciiString(Acc); //게임 아이디.
        w.write(0);
        w.write(0);
        w.write(1);
        w.write(0x13);
        for (int i = 1; i <= 20; i++) { //Character Open Packet
            w.write(1);
            w.writeShort(1);
        }
        w.write0(3); //1.2.250-
        w.write(Charlist ? 1 : 0);

        return w.getPacket();
    }

    public static final byte[] deleteCharResponse(final int cid, final int state) {
        final WritingPacket w = new WritingPacket();

        w.writeShort(SendPacketOpcode.DELETE_CHAR_RESPONSE.getValue());
        w.writeInt(cid);
        w.write(state);

        return w.getPacket();
    }

    public static final byte[] secondPwError(final byte mode) {
        final WritingPacket w = new WritingPacket(3);

        /*	 
	 * 14 - Invalid password
	 * 15 - Second password is incorrect
         */
        w.writeShort(SendPacketOpcode.SECONDPW_ERROR.getValue());
        w.write(mode);

        return w.getPacket();
    }

    public static final byte[] getServerList(final int serverId, final Map<Integer, Integer> channelLoad) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.WORLD_INFORMATION.getValue());
        w.write(serverId);
        w.writeMapleAsciiString(LoginServer.getInstance().getServerName());
        w.write(LoginServer.getInstance().getFlag());
        String msg = "";
        if (GameConstants.isServerReady()) {
            /* 서버가 데이터가 완전히 로딩되었을 경우 */
            msg = LoginServer.getInstance().getEventMessage();
        } else {
            /* 서버가 데이터가 완전히 로딩되지 않았을 경우 */
            msg = "서버가 준비되지 않았습니다.\r\n\r\n필요한 데이터를 모두 \r\n불러올 때 까지 잠시만 \r\n기다려 주시기 바랍니다.";
        }
        w.writeMapleAsciiString(msg);

        for (int i = 0; i < 2; i++) {
            w.writeShort(100); // EXP WSE, DROP WSE
        }

        int lastChannel = ServerConstants.serverCount;
        Set<Integer> channels = channelLoad.keySet();
        for (int i = 30; i > 0; i--) {
            if (channels.contains(i)) {
                lastChannel = i;
                break;
            }
        }
        w.write(lastChannel);

        int load;
        for (int i = 0; i < lastChannel; i++) {
            if (channels.contains(i)) {
                load = (ChannelServer.getInstance(i).getPlayerStorage().getConnectedClients());
            } else {
                load = 50;
            }
            w.writeMapleAsciiString(LoginServer.getInstance().getServerName() + "-" + (i == 1 ? i : (i == 2 ? ("20세이상") : (i))));
            w.writeInt(load == 0 ? 1 : load >= 50 ? 50 : load);
            w.write(serverId);
            w.write(i);
            w.write(0); // adult channel
        }
        w.writeShort(0); // {x, y, message}
        w.writeInt(0); // boom up event notice
        w.write(0); // star planet

        return w.getPacket();
    }

    public static byte[] getLastWorld() {
        WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.LAST_WORLD.getValue());
        w.writeInt(0);

        return w.getPacket();
    }

    public static byte[] getSelectedWorld() {
        WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.SELECTED_WORLD.getValue());
        w.writeInt(0);

        return w.getPacket();
    }

    public static byte[] recommendWorld() {
        boolean message = ServerConstants.recommendMessage.length() > 0;
        WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.RECOMMEND_WORLD.getValue());
        w.write(message ? 1 : 0); // 갯수
        if (message) {
            w.writeInt(0); // 월드 id
            w.writeMapleAsciiString(ServerConstants.recommendMessage);
        }
        return w.getPacket();
    }

    public static byte[] getSecondPasswordConfirm(boolean success) {
        WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.AUTH_STATUS_WITH_SPW.getValue());
        w.write(success ? 0 : 0x14);
        w.write(1);
        w.write(0x13); //1.2.250+
        for (int i = 0; i < 19; i++) { //Character Open Packet, 1.2.250+
            w.write(1);
            w.writeShort(1);
        }
        return w.getPacket();
    }

    public static byte[] getSecondPasswordResult(boolean success) {
        WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.AUTH_STATUS_WITH_SPW_RESULT.getValue());
        w.write(success ? 0 : 0x14);

        return w.getPacket();
    }

    public static byte[] getSecondPasswordCheck(boolean enable, boolean picwrong, boolean success) {
        WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.SECONDPW_RESULT.getValue());
        w.write(1);
        w.write(6);

        return w.getPacket();
    }

    public static final byte[] getEndOfServerList() {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.WORLD_INFORMATION.getValue());
        w.write(0xFF);
        /* 1.2.240 광고 추가 */
        int advertisement = 0; //1.2.250(2) 기준.
        w.write(advertisement);
        for (int i = 0; i < advertisement; i++) {
            w.writeMapleAsciiString((i == 0) ? "http://maplestory.nexon.com/maplestory/news/2015/login_banner.html"
                    : (i == 1) ? "http://s.nx.com/s2/Game/Maplestory/Maple2013/image/banner/ingame_bn/MS2_Festival_1.jpg"
                            : (i == 2) ? "http://s.nx.com/s2/Game/Maplestory/Maple2013/image/banner/ingame_bn/MS2_Festival_2.jpg"
                                    : "http://s.nx.com/s2/Game/Maplestory/Maple2013/image/banner/ingame_bn/ingame_150701_01.jpg"); //광고 사진.

            w.writeMapleAsciiString((i == 0) ? "http://maplestory2.nexon.com/event/2015/OnLineFestival?"
                    : (i == 1) ? "http://maplestory2.nexon.com/live/20150627/OnlineFestival?st=maple1&bn=cla_ser&ev=live&dt=20150627"
                            : (i == 2) ? "http://maplestory2.nexon.com/event/2015/StarterPack?st=maple1&bn=cla_ser&ev=starter&dt=20150623"
                                    : "http://closers.nexon.com/news/events/view.aspx?n4articlesn=117&st=maple&bn=login&ev=20150624"); //이동할 주소.
            w.writeInt(5000); // 시간
            w.writeInt(415); // width
            /* 광고 width, weight 고정 */
            w.writeInt((i == 0) ? 80 : 70); // height
            w.writeInt((i == 0) ? 192 : 0); // x
            w.writeInt((i == 0) ? 452 : 0); // y
        }
        /* 1.2.240 광고 추가 */
        w.write(0); // NotActiveAccountDlgFocus
        w.write(0); // 잠긴계정 접속 시도?

        return w.getPacket();
    }

    public static final byte[] setBurningEffect(final int chrid) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.SET_BURNING_CHAR.getValue());
        w.write(1);
        w.writeInt(chrid);

        return w.getPacket();
    }

    public static final byte[] getChannelBackImg(final boolean first_login, final int status) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.CHANNEL_BACK_IMG.getValue());
        w.write(!first_login ? 2 : 0);
        if (!first_login) {
            w.writeMapleAsciiString("main");
            w.write(1);
            w.writeMapleAsciiString("sub");
            w.write(status);
        }
        return w.getPacket();
    }

    /*	 
     * 0 - Normal
     * 1 - Highly populated
     * 2 - Full
     */
    public static final byte[] getServerStatus(final int status) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.SERVERSTATUS.getValue());
        w.writeShort(status);

        return w.getPacket();
    }

    public static final byte[] charlist(final MapleClient c, final boolean secondpw, final List<MapleCharacter> chars) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.CHARLIST.getValue());
        w.write(0);
        w.writeMapleAsciiString("");
        w.writeInt(0);
        w.write(0);//버닝
        w.writeInt(0);
        w.writeLong(PacketProvider.getKoreanTimestamp(System.currentTimeMillis()));
        w.write(0); //1.2.238+
        w.writeInt(chars.size()); //1.2.238+
        for (final MapleCharacter chr : chars) { //1.2.238+
            w.writeInt(chr.getId()); //TODO : 캐릭터 위치.
        }
        w.write(chars.size()); //1.2.238+
        for (final MapleCharacter chr : chars) {
            addPlayerEntry(w, chr);
            w.write(0);
            w.write(0);
        }
        w.write(0);
        w.write(0);
        w.writeInt(c.getChrSlot());
        w.writeInt(0);
        w.writeInt(0xFF);
        w.writeReversedLong(PacketProvider.getKoreanTimestamp(System.currentTimeMillis()));
        int value = c.getNameChangeValue();
        w.write(value);
        if (value != 0) {
            w.write(0);
        }
        w.write(0);

        return w.getPacket();
    }

    public static final byte[] addNewCharacterEntry(final MapleCharacter chr, final boolean worked) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.ADD_NEW_CHAR_ENTRY.getValue());
        w.write(worked ? 0 : 1);
        addPlayerEntry(w, chr);

        return w.getPacket();
    }

    public static final byte[] charNameResponse(final String charname, final boolean nameUsed) {
        final WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.CHAR_NAME_RESPONSE.getValue());
        w.writeMapleAsciiString(charname);
        w.write(nameUsed ? 1 : 0);

        return w.getPacket();
    }

    private static final void addPlayerEntry(final WritingPacket w, final MapleCharacter chr) {
        PacketProvider.addPlayerStats(w, chr, false);
        PacketProvider.addPlayerLooks(w, chr, true);
        if (GameConstants.isZero(chr.getJob())) {
            PacketProvider.addPlayerLooksZero(w, chr, true);
        }
    }
}
