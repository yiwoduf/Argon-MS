/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client.skills;

/**
 *
 * @author 최용재 <virgo_s_t@naver.com>
 */
public class InnerSkillValueHolder {
    
    private int skillId = 0;
    private byte skillLevel = 0;
    private byte maxLevel = 0;
    private byte rank = 0;
    
    public InnerSkillValueHolder(int skillId, byte skillLevel, byte maxLevel, byte rank) {
        this.skillId = skillId;
        this.skillLevel = skillLevel;
        this.maxLevel = maxLevel;
        this.rank = rank;
    }
    
    public int getSkillId() {
        return skillId;
    }
    
    public byte getSkillLevel() {
        return skillLevel;
    }
    
    public byte getMaxLevel() {
        return maxLevel;
    }
    
    public byte getRank() {
        return rank;
    }
}
