/*
 * Tespia Project
 * ==================================
 * ��� abyss_min@nate.com
 * ==================================
 * 
 */
package packet.skills;

import client.MapleCharacter;
import java.awt.Point;
import packet.creators.PacketProvider;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import tools.HexTool;

/**
 *
 * @author ȣ��
 */
public class ZeroSkill {

    public static byte[] onZeroWP(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_WP.getValue());
        packet.writeInt(chr.getWP());

        return packet.getPacket();
    }

    public static byte[] ZeroWeaponE(int action, int spirit) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_WEAPON.getValue());
        packet.writeInt(action);
        switch (action) {
            case 0:
                packet.writeInt(50000);
                packet.writeInt(500);
                packet.write(spirit);
                break;
            case 1:
                packet.writeInt(100000);
                packet.writeInt(600);
                packet.write(spirit); //1�� ����â
                break;
        }
        packet.write(1);
        return packet.getPacket();
    }

    public static byte[] ScrollStart() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_SCROLL_START.getValue());

        return packet.getPacket();
    }

    public static byte[] Scroll(int scroll) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_SCROLL.getValue());
        packet.writeShort(1);
        packet.write(0);
        packet.writeInt(scroll);

        return packet.getPacket();
    }

    public static byte[] Open(int type) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_WEAPON.getValue());
        packet.writeInt(type);
        packet.writeInt((type == 1) ? 100000 : 50000);
        packet.writeInt((type == 1) ? 600 : 500);
        packet.writeShort(0);

        return packet.getPacket();
    }

    public static byte[] WeaponInfo(int type, int level, int action, int weapon) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_WEAPONINFO.getValue());
        packet.write(0);
        packet.write(action);
        packet.writeInt(type);
        packet.writeInt(level);
        packet.writeInt(weapon + 10001);
        packet.writeInt(weapon + 1);

        return packet.getPacket();
    }

    public static byte[] WeaponUpgradeSuccess() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_UPGRADE_SU.getValue());
        packet.writeShort(1);

        return packet.getPacket();
    }

    public static byte[] WeaponLevelUp() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_UPGRADE.getValue());
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] NPCTalk(String txt) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(3);
        packet.writeInt(0);
        packet.writeShort(0);
        packet.writeShort(0x24);
        packet.writeInt(2400010); // 2400009 ����, 2400010 ����
        packet.writeMapleAsciiString(txt);
        packet.write(HexTool.getByteArrayFromHexString("00 01"));
        packet.writeInt(0); //1.2.239+

        return packet.getPacket();
    }

    public static byte[] ZeroTag(MapleCharacter chr, byte Gender, int changeTF, int realTimeTF) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_TAG.getValue());
        packet.writeShort(0xC7);
        packet.write(Gender);
        packet.writeInt(chr.getStat().getHp());
        packet.writeInt(changeTF);
        packet.writeInt(chr.getStat().getMaxHp());
        packet.writeInt(changeTF);

        return packet.getPacket();
    }

    public static byte[] TagTip(MapleCharacter chr, int type) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        packet.write(0);
        packet.writeInt(0x4000);
        packet.writeInt(chr.getStat().getMaxHp());
        packet.write(1);
        packet.writeShort(type);

        return packet.getPacket();
    }

    public static byte[] MultiTag(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_MUITTAG.getValue());
        packet.writeInt(chr.getId());
        if (chr.getGender() == 0 && chr.getSecondGender() == 1) {
            PacketProvider.addPlayerLooks(packet, chr, false);
        } else {
            PacketProvider.addPlayerLooksZero(packet, chr, false);
        }
        return packet.getPacket();
    }

    public static byte[] Clothes(int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_TAG.getValue());
        packet.write(0);
        packet.write(1);
        packet.writeInt(value);

        return packet.getPacket();
    }

    public static byte[] Reaction() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(0);
        packet.writeShort(0);
        packet.write(0);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] shockWave(int skillid, int delay, int direction, Point position) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_SHOCKWAVE.getValue());
        packet.writeInt(skillid);
        packet.writeInt(101000102);
        packet.writeInt(56);
        packet.writeInt(delay);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(direction);
        packet.writePos(position);

        return packet.getPacket();
    }

    public static byte[] OnZeroInfo(MapleCharacter chr, byte gender, int changeTF, int realTimeTF) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_TAG.getValue());
        packet.writeShort(0xC7);
        packet.write(gender);
        packet.writeInt(chr.getStat().getHp());
        packet.writeInt(changeTF);
        packet.writeInt(chr.getStat().getMaxHp());
        packet.writeInt(changeTF);

        return packet.getPacket();
    }

    public static byte[] OnLastAssistUpdate(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_ASSIST_UPDATE.getValue());
        packet.writeInt(chr.getId());

        return packet.getPacket();
    }
}
