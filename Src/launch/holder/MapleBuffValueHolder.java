/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package launch.holder;

import client.skills.SkillStatEffect;

public class MapleBuffValueHolder {

    public long startTime;
    public SkillStatEffect effect;

    public MapleBuffValueHolder(final long startTime, final SkillStatEffect effect) {
	this.startTime = startTime;
	this.effect = effect;
    }
}
