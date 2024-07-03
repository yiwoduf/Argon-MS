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
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import server.maps.MapleRune;

/**
 *
 * 
 */
public class RunePacket {
        
    public static byte[] spawnRune(MapleRune rune, boolean respawn) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(respawn ? SendPacketOpcode.RESPAWN_RUNE.getValue() : SendPacketOpcode.SPAWN_RUNE.getValue());
        packet.writeInt(1);
        packet.writeInt(rune.getRuneType());
        packet.writeInt(rune.getPositionX());
        packet.writeInt(rune.getPositionY());
        packet.write(0);
        
        return packet.getPacket();
    }
    
    public static byte[] removeRune(MapleRune rune, MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.REMOVE_RUNE.getValue());
        packet.writeInt(0);
        packet.writeInt(chr.getId());
        
        return packet.getPacket();
    }
    
    public static byte[] RuneAction(int type, int time) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.RUNE_ACTION.getValue());
        packet.writeInt(type);
        packet.writeInt(time);
        
        return packet.getPacket();
    }
    
    public static byte[] showRuneEffect(int type) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.RUNE_EFFECT.getValue());
        packet.writeInt(type);
        
        return packet.getPacket();
    }
}