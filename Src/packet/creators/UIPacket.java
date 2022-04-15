/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package packet.creators;

import client.MapleCharacter;
import client.MapleClient;
import constants.ServerConstants;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import tools.HexTool;

public class UIPacket {
    
    public static byte[] showInfo(String msg) {
	final WritingPacket packet = new WritingPacket();
	packet.writeShort(SendPacketOpcode.TOP_MSG.getValue());
	packet.writeMapleAsciiString(msg);
        
	return packet.getPacket();
    }
    
    public static byte[] greenShowInfo(String msg) {
	final WritingPacket packet = new WritingPacket();
	packet.writeShort(SendPacketOpcode.GREEN_SHOW_INFO.getValue());
        packet.write(0);
	packet.writeMapleAsciiString(msg);
        packet.write(1); // 0 = Lock 1 = Clear
        
	return packet.getPacket();
    }
    
    public static byte[] detailShowInfo(String msg, boolean RuneSystem) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.DETAIL_SHOW_INFO.getValue());
        packet.writeInt(3); //color
        packet.writeInt(RuneSystem ? 0x11 : 0x14); //width
        packet.writeInt(RuneSystem ? 0 : 0x0F); //heigh
        packet.writeInt(0); //Unk
        packet.writeMapleAsciiString(msg);
        
        return packet.getPacket();
  }
    
    public static byte[] getItemTopMsg(int itemid, String msg) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MID_MSG.getValue());
        packet.writeInt(itemid);
        packet.writeMapleAsciiString(msg);
        
        return packet.getPacket();
    }
    
    public static byte[] enforceMSG(String a, int id, int delay) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ENFORCE_MSG.getValue());
        packet.writeMapleAsciiString(a);
        packet.writeInt(id);
        packet.writeInt(delay);
        packet.write(1);
        
        return packet.getPacket();
    }
    
    public static byte[] enforceMSGY(String a, int id, int delay, int y) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ENFORCE_MSG.getValue() + 1);
        packet.writeMapleAsciiString(a);
        packet.writeInt(id);
        packet.writeInt(delay);
        packet.writeInt(y);
        
        return packet.getPacket();
    }
    
    public static byte[] clearMidMsg() {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(SendPacketOpcode.CLEAR_MID_MSG.getValue());

        return mplew.getPacket();
    }

    public static byte[] getStatusMsg(int itemid) {
	WritingPacket packet = new WritingPacket();
	packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
	packet.write(0x8); //1.2.250+ (+1)
	packet.writeInt(itemid);

	return packet.getPacket();
    }

   public static byte[] getSPMsg(byte sp, short job) {
	WritingPacket packet = new WritingPacket();

	packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
	packet.write(0x5); //1.2.250+ (+1)
	packet.writeShort(job);
	packet.write(sp);

	return packet.getPacket();
    }

    public static byte[] getGPMsg(int itemid) {
	WritingPacket packet = new WritingPacket();
	packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
	packet.write(0x8); //1.2.250+ (+1)
	packet.writeInt(itemid);

	return packet.getPacket();
    }
    
    public static final byte[] MapNameDisplay(final int mapid) {
	final WritingPacket packet = new WritingPacket();

	packet.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
	packet.write(0x4);
	packet.writeMapleAsciiString("maplemap/enter/" + mapid);

	return packet.getPacket();
    }

    public static final byte[] showWZEffect(final String data, int value) {
	WritingPacket packet = new WritingPacket();
	packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
	packet.write(value == 0 ? 25 : 27);
	packet.writeMapleAsciiString(data);
	packet.writeInt(value);
        
	return packet.getPacket();
    }
    
    public static final byte[] broadcastWZEffect(final int cid, final String data, int value) {
	WritingPacket packet = new WritingPacket();
	packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        packet.writeInt(cid);
	packet.write(value == 0 ? 25 : 27);
	packet.writeMapleAsciiString(data);
	packet.writeInt(value);
        
	return packet.getPacket();
    }  
    
    public static final byte[] showWZEffect(final String data) {
	return showWZEffect(data, 0);
    }

    public static byte[] summonHelper(boolean summon) {
	WritingPacket packet = new WritingPacket();

	packet.writeShort(SendPacketOpcode.SUMMON_HINT.getValue());
	packet.write(summon ? 1 : 0);

	return packet.getPacket();
    }

    public static byte[] summonMessage(int type) {
	WritingPacket packet = new WritingPacket();

	packet.writeShort(SendPacketOpcode.SUMMON_HINT_MSG.getValue());
	packet.write(1);
	packet.writeInt(type);
	packet.writeInt(7000); // probably the delay

	return packet.getPacket();
    }

    public static byte[] summonMessage(String message) {
	WritingPacket packet = new WritingPacket();

	packet.writeShort(SendPacketOpcode.SUMMON_HINT_MSG.getValue());
	packet.write(0);
	packet.writeMapleAsciiString(message);
	packet.writeInt(200); // IDK
	packet.writeShort(0);
	packet.writeInt(10000); // Probably delay

	return packet.getPacket();
    }

    public static byte[] IntroDisableUI(boolean enable) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.DISABLE_UI.getValue());
        packet.write(enable ? 1 : 0);
        if (enable) {
             packet.writeShort(1);
        }
        return packet.getPacket();
    }
    
    public static final byte[] AchievementRatio(int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ACHIVEMENT_RATIO.getValue());
        packet.writeInt(value);

        return packet.getPacket();
    }
        
    public static final byte[] MapleStar(MapleClient c, MapleCharacter chr, MapleCharacter chr1, int star1, int star2) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MAPLE_CHAT.getValue());
        packet.write(0x08);
        if (star1 > 0) {
            chr = MapleCharacter.loadCharFromDB(star1, c, true);
            packet.write(1);
            packet.writeInt(chr.getId());
            packet.writeInt(chr.getFame());
            packet.writeLong(System.currentTimeMillis());
            packet.writeMapleAsciiString(chr.getName());
            PacketProvider.addPlayerLooks(packet, chr, true);
            if (star2 > 0) {
                chr1 = MapleCharacter.loadCharFromDB(star2, c, true);
                packet.write(1);
                packet.writeInt(chr1.getId());
                packet.writeInt(chr1.getFame());
                packet.writeLong(System.currentTimeMillis());
                packet.writeMapleAsciiString(chr1.getName());
                PacketProvider.addPlayerLooks(packet, chr1, true);
            }
        }
        return packet.getPacket();
    }
    
    public static final byte[] MapleChat() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MAPLE_CHAT.getValue());
        packet.write(0x07);
        for (MapleCharacter chr : ServerConstants.mChat_char) {
            packet.write(1);
            packet.writeInt(chr.getId());
            packet.writeInt(chr.getFame());
            packet.writeLong(System.currentTimeMillis());
            packet.writeMapleAsciiString(chr.getName());
            PacketProvider.addPlayerLooks(packet, chr, true);
        }
        return packet.getPacket();
    }
    
        public static final byte[] getMapleStar(byte type, MapleClient c, int star1, int star2) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MAPLE_CHAT.getValue());
        packet.write(type);
        MapleCharacter chr = null, s_chr = null;
        if (star1 > 0 || star2 > 0) {
            chr = MapleCharacter.loadCharFromDB(star1, c, true);
            if (star2 > 0) {
                s_chr = MapleCharacter.loadCharFromDB(star2, c, true);
            }
        }
        for (int i = 0; i < 2; i++) {
            if (i == 0 ? chr != null : s_chr != null) {
                packet.write(1);
                packet.writeInt(i == 0 ? chr.getId() : s_chr.getId());
                packet.writeInt(i == 0 ? chr.getLevel() : s_chr.getLevel());
                packet.writeLong(System.currentTimeMillis());
                packet.writeMapleAsciiString(i == 0 ? chr.getName() : s_chr.getName());
                PacketProvider.addPlayerLooks(packet, i == 0 ? chr : s_chr, true);
            } else {
                packet.write(0);
            }
        }
        return packet.getPacket();
    }

    public static final byte[] OpenUI(byte value) {  
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_WINDOW.getValue());
        packet.write(value);
        packet.write0(11);
        
	return packet.getPacket();
    }
    
    public static final byte[] SetDead(byte value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SetDead.getValue());
        packet.write(value);
        return packet.getPacket();
    }
    
    public static final byte[] OpenUIOnDead() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.DEADED_WINDOW.getValue());
        packet.writeInt(1);
        packet.write(0);
        packet.writeInt(0);
        return packet.getPacket();
    }
    
    public static final byte[] showSpecialMapEffect(int type, int action, String music, String back) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPECIAL_MAP_EFFECT.getValue());
        packet.writeInt(type);
        packet.writeInt(action);
        packet.writeMapleAsciiString(music);
        if (back != null) {
          packet.writeMapleAsciiString(back);
        }
        return packet.getPacket();
    }

    public static final byte[] cancelSpecialMapEffect() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPECIAL_MAP_EFFECT.getValue());
        packet.writeLong(0);
        
        return packet.getPacket();
  }

    public static final byte[] playSpecialMapSound(String sound) {
      WritingPacket packet = new WritingPacket();
      packet.writeShort(SendPacketOpcode.SPECIAL_MAP_SOUND.getValue());
      packet.writeMapleAsciiString(sound);
      
      return packet.getPacket();
    }
    
    public static final byte[] eliteBossNotice(int type, int mapid, int mobid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ELITE_BOSS_NOTICE.getValue());
        packet.write(type);
        if (type == 1) {
            packet.writeInt(mapid);
        } else if (type == 2) {
            packet.writeInt(mapid);
            packet.writeInt(mobid);
            packet.write(HexTool.getByteArrayFromHexString("20 75 1A 00"));
        }
        return packet.getPacket();
    }
    
    public static byte[] showPopupMessage(final String msg) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.POPUP_MSG.getValue());
        packet.writeMapleAsciiString(msg);
        packet.write(1);
        
        return packet.getPacket();
    }
}
