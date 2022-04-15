/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */
package packet.skills;

import handler.channel.MapleMechDoor;
import client.stats.BuffStats;
import java.awt.Point;
import java.util.List;
import packet.creators.PacketProvider;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import tools.HexTool;
import tools.Triple;

/**
 *
 * @author ��ũ(sch2307)
 */
public class MechanicSkill {

    /**
     * ��Ż�Ƹ� : �޸�
     *
     * @param statups
     * @param skillid
     * @param bufflength
     * @param mountid
     * @param smountid
     * @return - ��Ŷ���� ����.
     */
    public static byte[] giveHuman(List<Triple<BuffStats, Integer, Boolean>> statups, int skillid, int bufflength, int mountid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (!statup.first.equals(BuffStats.CTS_MonsterRiding)) {
                packet.writeInt(statup.getSecond().shortValue());
                packet.writeInt(skillid);
                packet.writeInt(bufflength);
            }
        }

        packet.write(0);
        packet.writeLong(0);
        
        packet.writeInt(mountid);
        packet.writeInt(skillid);
        packet.writeInt(0);
        
        packet.write(0);
        
        packet.writeInt(0);
        packet.write(1);
        packet.write(5);
        packet.writeInt(0);
        packet.writeLong(0);
        packet.writeLong(0);
        return packet.getPacket();
    }

    public static byte[] giveTank(int skillid, int bufflength, int mountid, int smountid) {
        WritingPacket packet = new WritingPacket();
        int statup = 0;
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        packet.writeInt(0x4000000);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0x1D8010);
        packet.writeInt(0);
        packet.writeInt(0x400000);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0x4000000);
        for (int i = 0; i < 7; i++) {
            if ((i == 0) || (i == 1)) {
                statup = 2100;
            } else if ((i == 2)) {
                statup = 0x37;
            } else if (i == 5) {
                statup = 0x01;
            } else if (i == 6) {
                statup = 0x32;
            } else {
                statup = 600;
            }
            packet.writeInt(statup);
            packet.writeInt(skillid);
            packet.writeInt((i == 5) ? 0 : bufflength);
        }
        packet.write0(9);
        packet.writeInt(mountid);
        packet.writeInt(skillid);
        packet.writeInt(smountid);
        packet.write(0);
        packet.writeInt(1);
        packet.writeInt(skillid);
        packet.writeInt(30);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(1);
        packet.write(0x9);
        packet.writeInt(0);

        return packet.getPacket();
    }

    /**
     * ��Ż�Ƹ� : �޸� ĵ�����
     *
     * @param skillId - ��Ŷ�� ����.
     * @return - ��Ŷ���� ����.
     */
    public static byte[] cancelHuman() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        packet.write(PacketProvider.convertFromBigInteger(BuffStats.CTS_MonsterRiding.getBigValue(), BuffStats.BIT_COUNT));
        packet.write0(20);
        packet.write(0x7);
        packet.write(0x1);

        return packet.getPacket();
    }

    /**
     * ��Ż�Ƹ� : ��ũ ĵ�����
     *
     * @param skillId - ��Ŷ�� ����.
     * @return - ��Ŷ���� ����.
     */
    public static byte[] cancelTank() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        packet.write(PacketProvider.convertFromBigInteger(BuffStats.CTS_MonsterRiding.getBigValue(), BuffStats.BIT_COUNT));
        packet.write0(12);
        packet.write(0x25);
        packet.write(0x01);

        return packet.getPacket();
    }

    /**
     * ��Ż�Ƹ� : �޸�, ��ũ ���� ����
     *
     * @param skillId - ��Ŷ�� ����.
     * @return - ��Ŷ���� ����.
     */
    public static byte[] giveMetalStats(int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        packet.writeInt(0x5000020);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0x4);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeShort(0); //TODO : Color
        packet.writeInt(30000227);
        packet.write0(13);
        for (int i = 0; i < 4; i++) {
            packet.writeInt((i == 0) ? 2 : (i == 1) ? 0 : 1);
            packet.writeInt((i == 1) ? skillid : 30000227);
            packet.writeInt((i == 1) ? 30 : 10);
            packet.write(HexTool.getByteArrayFromHexString("38 3B D1 37 38 3B D1 37"));
            packet.writeInt((i == 1) && (skillid == 35111003) ? 1 : 0);
            if ((i != 0)) {
                packet.writeInt(0);
            }
        }
        packet.writeInt(0);
        packet.write(0x1);
        packet.writeInt(0);

        return packet.getPacket();
    }

    /**
     * ��ī�� ���°���Ʈ ��ȯ ��Ŷ
     *
     * @param door - ��ī���� ���°���Ʈ Ŭ������ �ҷ���.
     * @param active - �۵��ϴ��� ���ϴ��� ���θ� ����.
     * @return - ��Ŷ���� ����.
     */
    public static byte[] mechDoorSpawn(MapleMechDoor door, boolean active) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MECH_DOOR_SPAWN.getValue());
        packet.write(active ? 0 : 1);
        packet.writeInt(door.getOwnerId());
        packet.writePos(door.getTruePosition());
        packet.write(door.getId());
        if (door.getPartyId() > 0) {
            packet.writeInt(door.getPartyId());
        }
        return packet.getPacket();
    }

    public static byte[] OnOpenGateClose(int cid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MECH_DOOR_SPAWN.getValue() + 1);
        packet.writeInt(cid);
        return packet.getPacket();
    }

    /**
     * ��ī�� ���°���Ʈ ��� ��Ŷ
     *
     * @param door - ��ī���� ���°���Ʈ Ŭ������ �ҷ���.
     * @param active - �۵��ϴ��� ���ϴ��� ���θ� ����.
     * @return - ��Ŷ���� ����.
     */
    public static byte[] mechDoorRemove(MapleMechDoor door, boolean active) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MECH_DOOR_REMOVE.getValue());
        packet.write(active ? 0 : 1);
        packet.writeInt(door.getOwnerId());
        packet.write(door.getId());

        return packet.getPacket();
    }

    /**
     * ��ī�� ��Ż������Ŷ
     *
     * @param pos - ���� �÷��̾��� ��ġ.
     * @return - ��Ŷ���� ����.
     */
    public static byte[] mechPortal(Point pos) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_PORTAL.getValue());
        packet.writePos(pos);

        return packet.getPacket();
    }

    /**
     * ��ī�� �����
     *
     */
    public static byte[] MechanicMetalArmorCamouflage(int id, int time) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        //PacketProvider.writeSingleMask(packet, BuffStats.MECHANIC_CAMOUFLAGE);
        packet.writeShort(id);
        packet.writeInt(30000227);
        packet.writeInt(time);
        packet.write0(18);

        return packet.getPacket();
    }
}
