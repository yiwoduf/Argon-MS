/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
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
