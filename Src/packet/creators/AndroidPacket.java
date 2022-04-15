/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package packet.creators;

import client.MapleAndroid;
import client.MapleCharacter;
import client.items.IItem;
import client.items.MapleInventoryType;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import server.movement.LifeMovementFragment;
import java.awt.Point;
import java.util.List;
import server.items.ItemInformation;

/**
 *
 * @author �������̸�
 */
public class AndroidPacket {
    public static byte[] spawnAndroid(MapleCharacter chr, MapleAndroid android) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ANDROID_SPAWN.getValue());
        packet.writeInt(chr.getId());
        packet.write(ItemInformation.getInstance().getAndroid(android.getItemId())); //type of android, 1-4
        packet.writePos(android.getPosition());
        packet.write(android.getStance());
        packet.writeShort(0); //no idea, FH or something
        packet.writeShort(android.getSkinColor());
        packet.writeShort(android.getHair() - 30000);
        packet.writeShort(android.getFace() - 20000);
        packet.writeMapleAsciiString(android.getName());
        for (short i = -1200; i > -1207; i--) {
            final IItem item = chr.getInventory(MapleInventoryType.EQUIPPED).getItem(i);
            packet.writeInt(item != null ? item.getItemId() : 0);
        }
        return packet.getPacket();
    }
    
    public static byte[] deactivateAndroid(int cid) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ANDROID_DEACTIVATED.getValue());
        packet.writeInt(cid);
        
        return packet.getPacket();
    }
    
    public static byte[] removeAndroid(int cid, int animation) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ANDROID_REMOVE.getValue());
        packet.writeInt(cid);
        packet.write(animation);
        packet.writeInt(0);
        
        return packet.getPacket();
    }
    
    
    public static byte[] moveAndroid(int cid, Point pos, List<LifeMovementFragment> res) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ANDROID_MOVE.getValue());
        packet.writeInt(cid);
        packet.writeInt(0); //v192
        packet.writePos(pos);
        packet.writeInt(Integer.MAX_VALUE);
        PacketProvider.serializeMovementList(packet, res);
        
        return packet.getPacket();
    }

    public static byte[] showAndroidEmotion(int cid, int animation) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ANDROID_EMOTION.getValue());
        packet.writeInt(cid);
        packet.write(0);
        packet.write(animation);
        
        return packet.getPacket();
    }
}
