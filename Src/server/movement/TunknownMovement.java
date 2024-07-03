/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.movement;

import packet.transfer.write.WritingPacket;
import java.awt.Point;


public class TunknownMovement extends AbstractLifeMovement {

    private Point offset;
    private byte force;

    public TunknownMovement(int type, Point position, int duration, int newstate) {
	super(type, position, duration, newstate);
    }

    public Point getOffset() {
	return offset;
    }

    public void setOffset(Point wobble) {
	this.offset = wobble;
    }
    
    public void setForce(byte force) {
        this.force = force;
    }
    
    @Override
    public void serialize(WritingPacket packet) {
	packet.write(getType());
	packet.writePos(getPosition());
        packet.writePos(offset);
	packet.write(getNewstate());
	packet.writeShort(getDuration());
        packet.write(force);
    }
}
