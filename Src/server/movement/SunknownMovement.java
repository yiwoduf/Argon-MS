/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.movement;

import packet.transfer.write.WritingPacket;
import java.awt.Point;


public class SunknownMovement extends AbstractLifeMovement {

    private int unk;
    private byte force;
    
    public SunknownMovement(int type, Point position, int duration, int newstate) {
	super(type, position, duration, newstate);
    }

    public int getUnk() {
	return unk;
    }

    public void setUnk(int unk) {
	this.unk = unk;
    }
    
    public void setForce(byte force) {
        this.force = force;
    }
    
    @Override
    public void serialize(WritingPacket packet) {
	packet.write(getType());
	packet.writePos(getPosition());
	packet.writeShort(unk);
	packet.write(getNewstate());
	packet.writeShort(getDuration());
        packet.write(force);
    }
}
