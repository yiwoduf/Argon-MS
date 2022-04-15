/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package community;

import java.io.Serializable;

/**
 *
 * @author Administrator
 */
public class GuildSkills implements Serializable {
    public static final long serialVersionUID = 3565477792055301248L;
    public String purchaser, activator;
    public long timestamp;
    public int skillID, level;

    public GuildSkills(final int skillID, final int level, final long timestamp, final String purchaser, final String activator) {
        this.timestamp = timestamp;
	this.skillID = skillID;
	this.level = level;
	this.purchaser = purchaser;
	this.activator = activator;
    }

}
