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

public class RelativeLifeMovement extends AbstractLifeMovement {

    private short fh;
    private byte ForcedStop;
    
    public RelativeLifeMovement(int type, Point position, int duration, int newstate) {
	super(type, position, duration, newstate);
    }
    
    public short getFh() {
        return fh;
    }
    
    public void setFh(short fh) {
        this.fh = fh;
    }
    
    public void setForcedStop(byte ForcedStop) {
        this.ForcedStop = ForcedStop;
    }

    @Override
    public void serialize(WritingPacket packet) {
	packet.write(getType());
	packet.writeShort(getPosition().x);
	packet.writeShort(getPosition().y);
        if(getType() == 21 || getType() == 22) {
            packet.writeShort(fh);
        }
	packet.write(getNewstate());
	packet.writeShort(getDuration());
        packet.write(ForcedStop);
    }
}
