/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package handler.channel;

import constants.GameConstants;
import client.MapleCharacter;
import client.skills.ISkill;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import tools.AttackPair;
import java.awt.Point;
import java.util.List;

public class AttackInfo {

    public byte skillLevel, tbyte, animation, speed, AOE, csstar, hits, targets, slot, unk;
    public int display, skill, charge, lastAttackTickCount;
    public Point position;
    public List<AttackPair> allDamage;
    public final SkillStatEffect getAttackEffect(final MapleCharacter chr, int skillLevel, final ISkill skill_) {
	if (skillLevel == 0) {
	    return null;
	}
	if (GameConstants.isLinkedAttackSkill(skill)) {
	    final ISkill skillLink = SkillFactory.getSkill(skill);
	    return skillLink.getEffect(skillLevel);
	}
	return skill_.getEffect(skillLevel);
    }
}
