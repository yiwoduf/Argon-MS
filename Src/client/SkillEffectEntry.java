/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client;

/**
 *
 * @author 에반테이르
 */
public class SkillEffectEntry {
    
    private int skillId;
    private byte level;
    private byte flags;
    private byte speed;
    private byte unk;
    
    public SkillEffectEntry (int skillId, byte level, byte flags, byte speed, byte unk) {
        this.skillId = skillId;
        this.level = level;
        this.flags = flags;
        this.speed = speed;
        this.unk = unk;
    }
    
    public int getSkillId() {
        return skillId;
    }
    
    public byte getLevel() {
        return level;
    }
    
    public byte getFlags() {
        return flags;
    }
    
    public byte getSpeed() {
        return speed;
    }
    
    public byte getUnk() {
        return unk;
    }
}
