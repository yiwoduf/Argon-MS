/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.maps;

public interface AnimatedmapleMapObject extends MapleMapObject {
    int getStance();
    void setStance(int stance);
    boolean isFacingLeft();
}
