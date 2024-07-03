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

public class FlashMovement extends AbstractLifeMovement {

    private Point pixelsPerSecond;

    public FlashMovement(int type, Point position, int duration, int newstate) {
	super(type, position, duration, newstate);
    }

	public Point getPixelsPerSecond() {
		return pixelsPerSecond;
	}

	public void setPixelsPerSecond(Point ye) {
		this.pixelsPerSecond = ye;
	}

    @Override
    public void serialize(WritingPacket packet) {
        packet.write(getType());
	packet.writePos(getPosition());
	packet.writePos(pixelsPerSecond);
        packet.write(getNewstate());
        packet.writeShort(getDuration());
    }
}
