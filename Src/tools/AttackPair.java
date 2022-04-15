/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package tools;

import java.util.List;

public class AttackPair {

    public int objectid;
    public List<Pair<Integer, Boolean>> attack;
    public byte hitAction;

    public AttackPair(int objectid, List<Pair<Integer, Boolean>> attack, byte hitAction) {
	this.objectid = objectid;
	this.attack = attack;
        this.hitAction = hitAction;
    }
}
