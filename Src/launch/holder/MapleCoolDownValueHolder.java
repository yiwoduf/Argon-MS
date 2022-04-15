/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package launch.holder;


public class MapleCoolDownValueHolder {

    public int skillId;
    public long startTime;
    public long length;

    public MapleCoolDownValueHolder(final int skillId, final long startTime, final long length) {
	this.skillId = skillId;
	this.startTime = startTime;
	this.length = length;
    }
}
