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


public class TeleportMovement extends AbstractLifeMovement {
	private Point pixelsPerSecond;
	public TeleportMovement(int type, Point position, int newstate) {
		super(type, position, 0, newstate);
	}

	public Point getPixelsPerSecond() {
		return pixelsPerSecond;
	}

	public void setPixelsPerSecond(Point wobble) {
		this.pixelsPerSecond = wobble;
	}
        
	@Override
	public void serialize(WritingPacket packet) {
		packet.write(getType());
		packet.writeShort(getPosition().x);
		packet.writeShort(getPosition().y);
		packet.writeShort(getPixelsPerSecond().x);
		packet.writeShort(getPixelsPerSecond().y);
		packet.write(getNewstate());
	}
}
