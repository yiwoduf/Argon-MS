/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.movement;

import java.awt.Point;

public interface LifeMovement extends LifeMovementFragment {

    @Override
    Point getPosition();

    int getNewstate();

    int getDuration();

    int getType();
}
