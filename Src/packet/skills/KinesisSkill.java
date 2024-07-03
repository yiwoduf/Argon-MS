/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package packet.skills;

import client.MapleClient;
import client.skills.SkillFactory;
import packet.opcode.SendPacketOpcode;
import packet.transfer.read.ReadingMaple;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import server.life.MapleMonster;

/**
 *
 * @author 최주원
 */
public class KinesisSkill {

    public static void PsychicUnknown(ReadingMaple rh, final MapleClient c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PSYCHIC_UNKNOWN.getValue());
        packet.writeInt(c.getPlayer().getId());
        packet.writeInt(rh.readInt());
        
        c.getSession().writeAndFlush(packet.getPacket());
    }
    
    public static void PsychicDamage(ReadingMaple rh, final MapleClient c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PSYCHIC_DAMAGE.getValue());
        packet.writeInt(rh.readInt());
        if (rh.available() >= 2) {
            packet.writeInt((int) rh.readShort());
        }
        
        c.getSession().writeAndFlush(packet.getPacket());
    }
    
    public static byte[] OnReleasePsychicLock(int cid, int oid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_PSYCHIC_GREP.getValue());
        packet.writeInt(cid);
        packet.writeInt(oid);
        return packet.getPacket();
    }
    
    public static void CancelPsychicGrep(ReadingMaple rh, final MapleClient c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_PSYCHIC_GREP.getValue());
        packet.writeInt(c.getPlayer().getId());
        packet.writeInt(rh.readInt());
        
        c.getPlayer().getMap().broadcastMessage(packet.getPacket());
    }
    
    public static void PsychicGrep(ReadingMaple rh, final MapleClient c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PSYCHIC_GREP.getValue());
        /* First AttackInfo Start */ 
        packet.writeInt(c.getPlayer().getId());
        packet.write(1);
        final int skillid = rh.readInt();
        packet.writeInt(skillid); 
        packet.writeShort(rh.readShort()); 
        packet.writeInt(rh.readInt()); 
        packet.writeInt(rh.readInt()); 
        /* First AttackInfo End */
        int i = 0;
        int point = 0;
        boolean end = false;
        MapleMonster target = null;
        while(true) {
            end = (rh.readByte() <= 0);
            packet.write(!end ? 1 : 0); 
            if (!end) {
                packet.write(!end ? 1 : 0);
                packet.writeInt(rh.readInt());
            } else {
                break;
            }
            rh.skip(4);
            packet.writeInt((i) + 1); 
            final int monsterid = rh.readInt();
            packet.writeInt(monsterid); //몬스터 아이디.
            packet.writeShort(rh.readShort());
            if (monsterid != 0) {
               target = c.getPlayer().getMap().getMonsterByOid(monsterid);
            }
            rh.skip(2);
            packet.writeInt(monsterid != 0 ? (int) target.getHp() : 100); 
            packet.writeInt(monsterid != 0 ? (int) target.getHp() : 100);
            packet.write(rh.readByte()); 
            packet.writePos(rh.readPos());
            packet.writePos(rh.readPos());
            packet.writePos(rh.readPos()); 
            packet.writePos(rh.readPos()); 
            i++;
        }
        
        c.getPlayer().getMap().broadcastMessage(packet.getPacket());
    }
}
