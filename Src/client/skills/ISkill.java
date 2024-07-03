/*
 * Tespia Project
 * ==================================
 * 어비스 abyss_min@nate.com
 * ==================================
 * 
 */
package client.skills;

import client.MapleCharacter;
import server.life.Element;

public interface ISkill {

    public int getId();
    public void setName(String name);
    public String getName();
    public SkillStatEffect getEffect(int level);
    public byte getMaxLevel();
    public int getAnimationTime();
    public boolean canBeLearnedBy(int job);
    public boolean isFourthJob();
    public boolean getAction();
    public Element getElement();
    public boolean isBeginnerSkill();
    public boolean hasRequiredSkill();
    public boolean isInvisible();
    public boolean isChargeSkill();
    public int getRequiredSkillLevel();
    public int getRequiredSkillId();
    public int getMasterLevel();
    public boolean canCombatOrdered();
    public boolean haveMasterLevel();
    public boolean CheckMasterLevel();
    public boolean ishyper();
    public int getFinalAttackIdx();
    public int getWeaponIdx();
    public int getPsdSkill();
    public int getPsd();
    public String getPsdDamR();
    public boolean isNotRemoved();
    public boolean notCancel();
    public int getHyperStats();
    public boolean isTimeLimited();
    public boolean is_professional_skill();
    public int getHyper();
}
