/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.maps;

public interface AnimatedHinaMapObject extends MapleMapObject {
    int getStance();
    void setStance(int stance);
    boolean isFacingLeft();
}
