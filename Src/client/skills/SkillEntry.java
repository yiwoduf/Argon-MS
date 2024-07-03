/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client.skills;

public class SkillEntry {

    public final byte skillevel;
    public final byte masterlevel;
    public final long expiration;

    public SkillEntry(final byte skillevel, final byte masterlevel, final long expiration) {
	this.skillevel = skillevel;
	this.masterlevel = masterlevel;
	this.expiration = expiration;
    }
}
