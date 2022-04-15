/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package community;

/**
 *
 * @author 이재왕<saviorms@naver.com>
 */
public class MapleGuildSkill implements java.io.Serializable {
    public static final long serialVersionUID = 3565477792055301248L;
    public String purchaser, activator;
    public long timestamp;
    public int skillID, level;

    public MapleGuildSkill(final int skillID, final int level, final long timestamp, final String purchaser, final String activator) {
        this.timestamp = timestamp;
	this.skillID = skillID;
	this.level = level;
	this.purchaser = purchaser;
	this.activator = activator;
    }
}
