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

public class AranMovement extends AbstractLifeMovement {
    
    private byte ForcedStop;
    
    public AranMovement(int type, Point position, int duration, int newstate) {
	super(type, position, duration, newstate);
    }
    
    public void setForcedStop(byte ForceStop) {
        this.ForcedStop = ForceStop;
    }
    
    @Override
    public void serialize(WritingPacket packet) {
        packet.write(getType());
        packet.write(getNewstate());
        packet.writeShort(getDuration());
        packet.write(ForcedStop);
    }
}
