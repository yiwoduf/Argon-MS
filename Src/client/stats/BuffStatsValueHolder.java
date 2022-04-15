/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client.stats;

import client.skills.SkillStatEffect;
import java.util.concurrent.ScheduledFuture;


public class BuffStatsValueHolder {

    public SkillStatEffect effect;
    public long startTime;
    public int value;
    public ScheduledFuture<?> schedule;

    public BuffStatsValueHolder(SkillStatEffect effect, long startTime, ScheduledFuture<?> schedule, int value) {
	super();
	this.effect = effect;
	this.startTime = startTime;
	this.value = value;
        this.schedule = schedule;
    }
}
