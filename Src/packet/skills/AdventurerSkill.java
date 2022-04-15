/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package packet.skills;

import client.stats.BuffStats;
import packet.creators.PacketProvider;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;

public class AdventurerSkill {

    public static byte[] giveBeholderDominant(boolean isDominant) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_Beholder);
        packet.writeShort(1);
        packet.writeInt(1301013);
        packet.writeInt(400000); //지속시간, 내 마음대로~
        packet.writeInt(0);
        packet.write(5);
        packet.writeInt(isDominant ? 1311013 : 1301013);
        packet.writeInt(isDominant ? 0 : 1311014);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(1);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] CancelHeholderBuff() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_Beholder);

        return packet.getPacket();
    }
}
