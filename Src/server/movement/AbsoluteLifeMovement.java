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


public class AbsoluteLifeMovement extends AbstractLifeMovement {

    private Point pixelsPerSecond, offset;
    private int unk, fh;
    private byte ForcedStop_CS;
    
    public AbsoluteLifeMovement(int type, Point position, int duration, int newstate) {
	super(type, position, duration, newstate);
    }

    public Point getPixelsPerSecond() {
	return pixelsPerSecond;
    }

    public void setPixelsPerSecond(Point wobble) {
	this.pixelsPerSecond = wobble;
    }

    public Point getOffset() {
	return offset;
    }

    public void setOffset(Point wobble) {
	this.offset = wobble;
    }

    public int getUnk() {
	return unk;
    }

    public void setUnk(int unk) {
	this.unk = unk;
    }
    
    public void setFh(short fh) {
        this.fh = fh;
   }
    
    public void setForcedStop_CS(byte ForcedStop_CS) {
        this.ForcedStop_CS = ForcedStop_CS;
    }
    

    @Override
    public void serialize(WritingPacket packet) {
	packet.write(getType());
	packet.writePos(getPosition());
	packet.writePos(pixelsPerSecond);
	packet.writeShort(unk);
        if(getType() == 15 || getType() == 17) {
            packet.writeShort(fh);
        }
	packet.writePos(offset);
	packet.write(getNewstate());
	packet.writeShort(getDuration());
        packet.write(ForcedStop_CS);
    }
}
