package packet.skills;
import client.stats.BuffStats;
import packet.creators.*;
import packet.opcode.SendPacketOpcode;
import packet.transfer.write.WritingPacket;

public class CygnusSkill {

    public static byte[] CancelShadowServant() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_ShadowServant);
        return packet.getPacket();
    }

    public static byte[] CancelShadowIllusion() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_ShadowIllusion);
        return packet.getPacket();
    }
}
