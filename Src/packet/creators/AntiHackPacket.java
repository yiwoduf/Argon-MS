/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package packet.creators;

import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;

public class AntiHackPacket {
    
    // CheckProcessResult
    public static byte[] sendProcessRequest() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PROCESS_CHECK.getValue());
        packet.write(1);
      
        return packet.getPacket();
    }
}