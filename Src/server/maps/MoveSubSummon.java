/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.maps;

import client.MapleCharacter;
import java.lang.ref.WeakReference;

/**
 *
 * @author GOOD
 */
public class MoveSubSummon {
    private int check, skillid, point1, point2;
    private final WeakReference<MapleCharacter> ownerchr;
    public MoveSubSummon(MapleCharacter owner, int check, int skillid, int point1, int point2) {
        this.ownerchr = new WeakReference<>(owner);
        this.check = check;
        this.skillid = skillid;
        this.point1 = point1;
        this.point2 = point2;
    }
    
    public int getSkillid() {
        return skillid;
    }
    
    public int getCheck() {
        return check;
    }
    
    public int getPoint1() {
        return point1;
    }
    
    public int getPoint2() {
        return point2;
    }
    
    public MapleCharacter getOwnerChr() {
        return ownerchr.get();
    }
}
