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

public class ChairMovement extends AbstractLifeMovement {

    private int unk;
    private byte ForcedStop_CS;
    
    public ChairMovement(int type, Point position, int duration, int newstate) {
	super(type, position, duration, newstate);
    }

    public int getUnk() {
	return unk;
    }

    public void setUnk(int unk) {
	this.unk = unk;
    }
    
    public void setForcedStop_CS(byte ForcedStop_CS) {
        this.ForcedStop_CS = ForcedStop_CS;
    }

    @Override
    public void serialize(WritingPacket packet) {
	packet.write(getType());
	packet.writeShort(getPosition().x);
	packet.writeShort(getPosition().y);
	packet.writeShort(unk);
	packet.write(getNewstate());
	packet.writeShort(getDuration());
        packet.write(ForcedStop_CS);
    }
}

