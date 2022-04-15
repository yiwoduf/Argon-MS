/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package packet.skills;

import client.MapleCharacter;
import client.items.IItem;
import client.items.MapleInventory;
import client.items.MapleInventoryType;
import client.stats.BuffStats;
import packet.creators.PacketProvider;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import tools.RandomStream.Randomizer;
import tools.Triple;
import java.util.List;
import tools.HexTool;

/**
 *
 * @author Developer
 */
public class KaiserSkill {

    /**
     * ī���� ���������� ������Ŷ.
     * 
     * @param gauge
     */
    public static byte[] giveCTS_MorphGauge(int gauge) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_SmashStack);
        if (gauge == -1000) {
            packet.writeShort(0);
        } else {
            packet.writeShort(Math.min(gauge, 700));
        }
        packet.write0(30); //1.2.239+
        
        return packet.getPacket();
    }


    /**
     * �� ���� �ҵ�/���꽺�� �� ���� �ҵ�.
     * @param characterid - ĳ���� ���̵�
     * @param swordSize - �ҵ� ������, ex) 2th - 3, 4th - 5
     * @param swordCount - ������
     * @param skillid - ��ų�ڵ�
     * @return 
     */
    public static byte[] absorbingSwordCount(int cid, List<Integer> oids, int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(2);
        packet.write(1);
        packet.writeInt(oids.size());
        for (Integer oid : oids) {
          packet.writeInt(oid.intValue());
        }
        packet.writeInt(skillid);
        boolean advanced = (skillid == 61120007) || (skillid == 61121217);
        boolean transform = (skillid == 61110211) || (skillid == 61121217);
        for (int i = 0; i < (advanced ? 5 : 3); i++) {
          packet.write(1);
          packet.writeInt(i + 2);
          packet.writeInt(transform ? 4 : 2);
          packet.writeInt(Randomizer.rand(15, 18));
          packet.writeInt(Randomizer.rand(26, 31));
          packet.writeInt(0);
          packet.writeInt(Randomizer.rand(1000, 1500));
          packet.writeInt(0);
          packet.writeInt(0);
          packet.write(HexTool.getByteArrayFromHexString("CF C7 29 D5"));
          packet.writeInt(0);
          packet.writeInt(0);
        }
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] ItemSkillFromButton() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.REBUTTON_FORM_ITEM_SKILL.getValue());
        packet.writeLong(9);
        packet.writeLong(Randomizer.nextLong());
        packet.writeLong(Randomizer.nextLong());
        
        return packet.getPacket();
    }
}
