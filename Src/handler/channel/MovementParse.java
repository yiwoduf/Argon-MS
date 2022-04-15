/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */
package handler.channel;

import packet.transfer.read.ReadingMaple;
import server.maps.AnimatedHinaMapObject;
import server.movement.*;
import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

public class MovementParse {

    public static final List<LifeMovementFragment> parseMovement(final ReadingMaple rh) {
        final List<LifeMovementFragment> res = new ArrayList<LifeMovementFragment>();
        final byte numCommands = rh.readByte();
        for (byte i = 0; i < numCommands; i++) {
            final byte command = rh.readByte();
            short fh = 0;
            switch (command) {
                case 0:
                case 8:
                case 15:
                case 17:
                case 19:
                case 65:
                case 66:
                case 67: {
                    final short xpos = rh.readShort();
                    final short ypos = rh.readShort();
                    final short xwobble = rh.readShort();
                    final short ywobble = rh.readShort();
                    final short unk = rh.readShort();
                    if (command == 15 || command == 17) {
                        fh = rh.readShort();
                    }
                    final short xoffset = rh.readShort();
                    final short yoffset = rh.readShort();
                    final byte newstate = rh.readByte();
                    final short duration = rh.readShort();
                    final byte ForcedStop_CS = rh.readByte();
                    final AbsoluteLifeMovement alm = new AbsoluteLifeMovement(command, new Point(xpos, ypos), duration, newstate);
                    alm.setFh(fh);
                    alm.setUnk(unk);
                    alm.setPixelsPerSecond(new Point(xwobble, ywobble));
                    alm.setOffset(new Point(xoffset, yoffset));
                    alm.setForcedStop_CS(ForcedStop_CS);
                    res.add(alm);
                    break;
                }
                case 1:
                case 2:
                case 18:
                case 21:
                case 22:
                case 24:
                case 60:
                case 61:
                case 62:
                case 63: {
                    final short xmod = rh.readShort();
                    final short ymod = rh.readShort();
                    if (command == 21 || command == 22) {
                        fh = rh.readShort();
                    }
                    final byte newstate = rh.readByte();
                    final short duration = rh.readShort();
                    final byte ForcedStop = rh.readByte();
                    final RelativeLifeMovement rlm = new RelativeLifeMovement(command, new Point(xmod, ymod), duration, newstate);
                    rlm.setFh(fh);
                    rlm.setForcedStop(ForcedStop);
                    res.add(rlm);
                    break;
                }
                case 3:
                case 4:
                case 5:
                case 6:
                case 7:
                case 9:
                case 10:
                case 11:
                case 13:
                case 26:
                case 27:
                case 51:
                case 52:
                case 53:
                case 74:
                case 75:
                case 76:
                case 78:
                case 80: {
                    final short xpos = rh.readShort();
                    final short ypos = rh.readShort();
                    final short unk = rh.readShort();
                    final byte newstate = rh.readByte();
                    final short duration = rh.readShort();
                    final byte ForcedStop_CS = rh.readByte();
                    final ChairMovement cm = new ChairMovement(command, new Point(xpos, ypos), duration, newstate);
                    cm.setUnk(unk);
                    cm.setForcedStop_CS(ForcedStop_CS);
                    res.add(cm);
                    break;
                }
                case 55:
                case 64: {
                    final short xpos = rh.readShort();
                    final short ypos = rh.readShort();
                    final short xwobble = rh.readShort();
                    final short ywobble = rh.readShort();
                    final short unk = rh.readShort();
                    final byte newstate = rh.readByte();
                    final short duration = rh.readShort();
                    final byte ForcedStop = rh.readByte();
                    final UnknownMovement um = new UnknownMovement(command, new Point(xpos, ypos), duration, newstate);
                    um.setUnk(unk);
                    um.setForcedStop(ForcedStop);
                    um.setPixelsPerSecond(new Point(xwobble, ywobble));
                    res.add(um);
                    break;
                }
                case 14:
                case 16: {
                    final short xpos = rh.readShort();
                    final short ypos = rh.readShort();
                    final short unk = rh.readShort();
                    final byte newstate = rh.readByte();
                    final short duration = rh.readShort();
                    final byte force = rh.readByte();
                    final SunknownMovement sum = new SunknownMovement(command, new Point(xpos, ypos), duration, newstate);
                    sum.setUnk(unk);
                    sum.setForce(force);
                    res.add(sum);
                    break;
                }
                case 23: {
                    final short xpos = rh.readShort();
                    final short ypos = rh.readShort();
                    final short xoffset = rh.readShort();
                    final short yoffset = rh.readShort();
                    final byte newstate = rh.readByte();
                    final short duration = rh.readShort();
                    final byte force = rh.readByte();
                    final TunknownMovement tum = new TunknownMovement(command, new Point(xpos, ypos), duration, newstate);
                    tum.setOffset(new Point(xoffset, yoffset));
                    tum.setForce(force);
                    res.add(tum);
                    break;
                }
                case 12: {
                    res.add(new ChangeEquipSpecialAwesome(command, rh.readByte()));
                    break;
                }
                default: {
                    if (command != 71 && command != 73) {
                        final byte newstate = rh.readByte();
                        final short duration = rh.readShort();
                        final byte ForcedStop = rh.readByte();
                        final AranMovement am = new AranMovement(command, new Point(0, 0), duration, newstate);
                        am.setForcedStop(ForcedStop);
                        res.add(am);
                        break;
                    } else if (command == 71 || command == 73) {
                        MPA_INFO p = new MPA_INFO(rh.readShort(), rh.readShort(), rh.readShort(), rh.readShort(), rh.readShort(), rh.readShort(), rh.readShort());
                        res.add(p);
                        break;
                    }
                }
            }
        }
        if (numCommands != res.size()) {
            return null; // Probably hack
        }
        return res;
    }

    public static final void updatePosition(final List<LifeMovementFragment> movement, final AnimatedHinaMapObject target, final int yoffset) {
        for (final LifeMovementFragment move : movement) {
            if (move instanceof LifeMovement) {
                if (move instanceof AbsoluteLifeMovement) {
                    Point position = ((LifeMovement) move).getPosition();
                    position.y += yoffset;
                    target.setPosition(position);
                }

                if (!(move instanceof MPA_INFO)) {
                    target.setStance(((LifeMovement) move).getNewstate());
                }
            }
        }
    }
}
