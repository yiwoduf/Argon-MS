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
import client.items.IEquip;
import client.stats.BuffStats;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;

public class SoulWeaponPacket {

    public static byte[] giveSoulGauge(int count, int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_SoulMP);
        packet.writeShort(count);
        packet.writeInt(skillid);
        packet.writeInt(0);
        packet.writeInt(1000);
        packet.writeInt(skillid);
        packet.write0(18);

        return packet.getPacket();
    }

    public static byte[] cancelSoulGauge() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_SoulMP);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] showEnchanterEffect(int cid, byte result) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_ENCHANTER_EFFECT.getValue());
        packet.writeInt(cid);
        packet.write(result);

        return packet.getPacket();
    }

    public static byte[] showSoulScrollEffect(IEquip equip, int cid, byte result, boolean destroyed) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_SOULSCROLL_EFFECT.getValue());
        packet.writeInt(cid);
        packet.write(result);
        packet.write(destroyed ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] giveSoulEffect(int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_FullSoulMP);
        packet.writeShort(0);
        packet.writeInt(skillid);
        packet.writeInt(640000);
        packet.write0(22);

        return packet.getPacket();
    }

    public static byte[] giveForeignSoulEffect(int cid, int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_FullSoulMP);
        packet.writeInt(skillid);
        packet.writeLong(0x60000000000L);
        packet.write0(21);

        return packet.getPacket();
    }

    public static byte[] cancelForeignSoulEffect(int cid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_FullSoulMP);
        packet.write(1);

        return packet.getPacket();
    }

    public static byte[] showSoulEffect(MapleCharacter chr, byte use) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_SOULEFFECT_RESPONESE.getValue());
        packet.writeInt(chr.getId());
        packet.write(use);

        return packet.getPacket();
    }
}
