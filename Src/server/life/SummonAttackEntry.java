/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.life;

import java.util.List;

public class SummonAttackEntry {

    private MapleMonster mob;
    private List<Integer> damage;

    public SummonAttackEntry(MapleMonster mob, List<Integer> damage) {
	super();
	this.mob = mob;
	this.damage = damage;
    }

    public MapleMonster getMonster() {
	return mob;
    }

    public List<Integer> getDamage() {
	return damage;
    }
    
    public long getTotDamage() {
        long v1 = 0;
        for (int i : damage) {
            v1 += i;
        }
        return v1;
    }
}
