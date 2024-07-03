/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client.skills;

import java.util.concurrent.ScheduledFuture;

public class CoolDownValueHolder {

    public int skillId;
    public long startTime;
    public long length;
    
    public CoolDownValueHolder(int skillId, long startTime, long length) {
	super();
	this.skillId = skillId;
	this.startTime = startTime;
	this.length = length;
    }
}
