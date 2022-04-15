/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package packet.chat.creator;

import client.MapleChatClient;
import packet.chat.opcode.ChatSendPacketOpcode;
import packet.transfer.read.ReadingMaple;
import packet.transfer.write.WritingPacket;

/**
 *
 * @author SEUNGHYEON
 */
public class ChatPacket {
    public static byte[] LoginResult(byte conncet) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(ChatSendPacketOpcode.LoginResult.getValue());
        packet.write(conncet);
        return packet.getPacket();
    }
    
    public static byte[] AliveReq() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(ChatSendPacketOpcode.AliveReq.getValue());
        return packet.getPacket();
    }
    
    public static byte[] OnFriendChatMessage(final MapleChatClient c, final String text) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(ChatSendPacketOpcode.FriendChatMessage.getValue());
        packet.writeInt(0);
        packet.writeInt(c.getSenderAID());
        packet.writeInt(c.getSenderCID());
        packet.writeLong(c.getReadTime());
        packet.writeMapleAsciiString(text);
        packet.write(c.getLowDateTime());
        return packet.getPacket();
    }
    
    public static byte[] OnGuildChatMessage(final MapleChatClient c, final String text) {
        WritingPacket p = new WritingPacket();
        p.writeShort(ChatSendPacketOpcode.GuildChatMessage.getValue());
        p.writeInt(0);
        p.writeInt(0);
        p.writeInt(0);
        p.writeInt(c.getSenderCID());
        p.writeLong(c.getReadTime());
        p.writeMapleAsciiString(text);
        p.write(c.getLowDateTime());
        return p.getPacket();
    }
}
