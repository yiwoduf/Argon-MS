package client.skills;

import constants.GameConstants;
import constants.ServerConstants;
import provider.MapleData;
import provider.MapleDataTool;
import server.life.Element;
import tools.StringUtil;
import java.util.ArrayList;
import java.util.List;
import provider.MapleDataProviderFactory;

public class Skill implements ISkill {

    private String name, psdDamR = "";
    private final List<SkillStatEffect> effects = new ArrayList<>();
    private Element element;
    private byte level;
    private int id = 0, skillType = 0, animationTime = 0, requiredSkill = 0, masterLevel = 0, psd = 0, psdSkill = 0, weaponIdx = 0, finalAttackId = 0;
    private boolean action = false, invisible = false, chargeskill = false, hyper = false, combatOrdered = false;
    private boolean notRemoved = false;
    private boolean notCancel = false;
    private boolean H = false;
    private int az;
    private int hyperStat;

    Skill(final int id) {
        super();
        this.id = id;
    }

    @Override
    public int getFinalAttackIdx() {
        return finalAttackId;
    }

    @Override
    public int getWeaponIdx() {
        return weaponIdx;
    }

    @Override
    public int getId() {
        return id;
    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public void setName(String name) {
        this.name = name;
    }

    public static final Skill loadFromData(final int id, final MapleData data) {
        Skill ret = new Skill(id);
        try {
            boolean isBuff = false;
            ret.skillType = MapleDataTool.getInt("skillType", data, -1);
            final String elem = MapleDataTool.getString("elemAttr", data, null);
            if (elem != null) {
                ret.element = Element.getFromChar(elem.charAt(0));
            } else {
                ret.element = Element.NEUTRAL;
            }
            ret.invisible = MapleDataTool.getInt("invisible", data, 0) > 0;
            ret.masterLevel = MapleDataTool.getInt("masterLevel", data, 0);
            ret.notRemoved = MapleDataTool.getInt("notRemoved", data, 0) > 0;
            ret.notCancel = MapleDataTool.getInt("info/type", data, 0) == 15;
            ret.psd = MapleDataTool.getInt("psd", data, 0);
            ret.weaponIdx = MapleDataTool.getInt("weapon", data, 0);
            ret.H = (MapleDataTool.getInt("timeLimited", data, 0) > 0);
            ret.hyperStat = MapleDataTool.getInt("hyperStat", data, 0);
            if (ret.psd == 1) {
                final MapleData psdskill = data.getChildByPath("psdSkill");
                if (psdskill != null) {
                    ret.psdSkill = Integer.parseInt(data.getChildByPath("psdSkill").getChildren().get(0).getName());
                }
            }
            final MapleData f_Data = data.getChildByPath("finalAttack");
            if (f_Data != null) {
                for (MapleData f_skillc : f_Data.getChildren()) {
                    int skillId_f = Integer.parseInt(f_skillc.getName());
                    if (skillId_f > 0) {
                        ret.finalAttackId = skillId_f;
                        break;
                    }
                }
            }
            ret.combatOrdered = MapleDataTool.getInt("combatOrders", data, 0) > 0;
            ret.hyper = (data.getChildByPath("hyper") != null);
            ret.az = MapleDataTool.getInt("hyper", data, 0);
            final MapleData effect = data.getChildByPath("effect");
            if (ret.skillType != -1) {
                if (ret.skillType == 2) {
                    isBuff = true;
                }
            } else {
                final MapleData action_ = data.getChildByPath("action");
                final MapleData hit = data.getChildByPath("hit");
                final MapleData ball = data.getChildByPath("ball");
                if ((action_ == null && data.getChildByPath("prepare/action") != null) || (id == 5201001)) {
                    ret.action = true;
                } else {
                    ret.action = true;
                }
                isBuff = effect != null && hit == null && ball == null;
                isBuff |= action_ != null && MapleDataTool.getString("0", action_, "").equals("alert2");
                if (StringUtil.getLeftPaddedStr(String.valueOf(id / 10000), '0', 3).equals("8000")) { //소울, 룬 스킬 등.
                    isBuff = true;
                }
                if (MapleDataTool.getInt("attackCount", data, 0) > 0 || MapleDataTool.getInt("mobCount", data, 0) > 0 || MapleDataTool.getInt("damage", data, 0) > 0) { //공격 스킬.
                    isBuff = false;
                } else if (id != 15001021 && id != 20041222 && id != 20051284 && id != 32121006 && id != 37000010 && id != 37001001 && id != 37101001 && id != 37111000 && id != 37110001 && id != 37111003 && id != 61121052 && id != 65121052) {
                    isBuff = true;
                }
            }

            ret.chargeskill = data.getChildByPath("keydown") != null;

            if (data.getChildByPath("level") != null) {
                int i = 1;
                for (MapleData level : data.getChildByPath("level")) {
                    ret.effects.add(SkillStatEffect.loadSkillEffectFromData(level, id, isBuff, i));
                    i++;
                }
            } else if (data.getChildByPath("common") != null) {
                int MaxLevel = MapleDataTool.getIntConvert("maxLevel", data.getChildByPath("common"));
                for (int i = 1; i <= (MaxLevel + (ret.combatOrdered ? 2 : 0)); i++) {
                    ret.effects.add(SkillStatEffect.loadSkillEffectFromData(data.getChildByPath("common"), id, isBuff, i));
                }
            }
            if (effect != null) {
                for (final MapleData effectEntry : effect) {
                    ret.animationTime = MapleDataTool.getIntConvert("delay", effectEntry, 0);
                }
            }
        } catch (Exception ex) {
            if (ServerConstants.realese) {
                ex.printStackTrace();
            }
        }
        return ret;
    }

    @Override
    public SkillStatEffect getEffect(final int level) {
        if (effects.size() < (level - 1)) {
            return effects.get(effects.size() - 1);
        } else if (level <= 0) {
            return effects.get(0);
        }
        return effects.get(level - 1);
    }

    @Override
    public boolean canCombatOrdered() {
        return combatOrdered;
    }

    @Override
    public boolean getAction() {
        return action;
    }

    @Override
    public boolean isChargeSkill() {
        return chargeskill;
    }

    @Override
    public boolean isInvisible() {
        return invisible;
    }

    @Override
    public boolean hasRequiredSkill() {
        return level > 0;
    }

    @Override
    public int getRequiredSkillLevel() {
        return level;
    }

    @Override
    public int getRequiredSkillId() {
        return requiredSkill;
    }

    @Override
    public byte getMaxLevel() {
        return (byte) effects.size();
    }

    @Override
    public Element getElement() {
        return element;
    }

    @Override
    public int getAnimationTime() {
        return animationTime;
    }

    @Override
    public int getMasterLevel() {
        return masterLevel;
    }

    @Override
    public boolean isBeginnerSkill() {
        if (id >= 10000000 || id <= 999999) {
            if (id / 10000 == 1000 || id / 10000 == 2000 || id / 10000 == 2001 || id / 10000 == 2002 || id / 10000 == 2003 || id / 10000 == 3000 || id / 10000 == 3001 || id / 10000 == 3002 || id / 10000 == 5000 || id / 10000 == 2004 || id / 10000 == 6000 || id / 10000 == 6001) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean haveMasterLevel() {
        MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr(String.valueOf((id / 10000 == 1) ? id
                : (id / 10000 == 8000) ? String.valueOf(id).substring(0, 6) : id / 10000), '0', 3) + ".img").getChildByPath("skill/" + StringUtil.getLeftPaddedStr(String.valueOf(id), '0', 7));
        return MapleDataTool.getInt("maxLevel", data, 0) > 20;
    }

    @Override
    public boolean canBeLearnedBy(int job) {
        int jid = job;
        int skillForJob = id / 10000;
        if (skillForJob == 2001 && GameConstants.isEvan(job)) {
            return true; //special exception for evan -.-
        }
        if (job < 1000) {
            if (jid / 100 != skillForJob / 100 && skillForJob / 100 != 0) { // wrong job
                return false;
            }
        } else if (jid / 1000 != skillForJob / 1000 && skillForJob / 1000 != 0) { // wrong job
            return false;
        }
        if (GameConstants.isAdventurer(skillForJob) && !GameConstants.isAdventurer(job)) {
            return false;
        } else if (GameConstants.isKOC(skillForJob) && !GameConstants.isKOC(job)) {
            return false;
        } else if (GameConstants.isAran(skillForJob) && !GameConstants.isAran(job)) {
            return false;
        } else if (GameConstants.isEvan(skillForJob) && !GameConstants.isEvan(job)) {
            return false;
        }
        if ((skillForJob / 10) % 10 > (jid / 10) % 10) { // wrong 2nd job
            return false;
        }
        if (skillForJob % 10 > jid % 10) { // wrong 3rd/4th job
            return false;
        }
        return true;
    }

    @Override
    public boolean isFourthJob() {
        if ((id / 10000) == 2312) { //all 10 skills.
            return true;
        }
        if ((getMaxLevel() <= 15 && !invisible && getMasterLevel() <= 0)) {
            return false;
        }
        if (id / 10000 >= 2212 && id / 10000 < 3000) { //evan skill
            return ((id / 10000) % 10) >= 7;
        }
        if (id / 10000 >= 430 && id / 10000 <= 434) { //db skill
            return ((id / 10000) % 10) == 4 || getMasterLevel() > 0;
        }
        return ((id / 10000) % 10) == 2 && id < 90000000 && !isBeginnerSkill();
    }

    public static boolean is_ignore_master_level(int nSkillID) {
        if (nSkillID > 5321004) {
            if (nSkillID > 23120011) {
                if (nSkillID <= 35120014) {
                    if (nSkillID == 35120014 || nSkillID == 23120013 || nSkillID == 23121008) {
                        return true;
                    }
                    return nSkillID == 33120010;
                }
                if (nSkillID != 51120000) {
                    return nSkillID == 80001913;
                }
            } else if (nSkillID != 23120011) {
                if (nSkillID <= 21120021) {
                    if (nSkillID >= 21120020 || nSkillID == 5321006 || nSkillID == 21120011) {
                        return true;
                    }
                    return nSkillID == 21120014;
                }
                if (nSkillID != 21121008) {
                    return nSkillID == 22171069;
                }
            }
            return true;
        }
        if (nSkillID == 5321004) {
            return true;
        }
        if (nSkillID > 4210012) {
            if (nSkillID > 5220012) {
                if (nSkillID != 5220014) {
                    return nSkillID == 5320007;
                }
            } else if (nSkillID != 5220012) {
                if (nSkillID > 4340012) {
                    if (nSkillID < 5120011 || nSkillID > 5120012) {
                        return false;
                    }
                } else if (nSkillID != 4340012) {
                    return nSkillID == 4340010;
                }
            }
            return true;
        }
        if (nSkillID == 4210012) {
            return true;
        }
        if (nSkillID > 2221009) {
            if (nSkillID == 2321010 || nSkillID == 3210015) {
                return true;
            }
            return nSkillID == 4110012;
        } else {
            if (nSkillID == 2221009 || nSkillID == 1120012 || nSkillID == 1320011) {
                return true;
            }
            return nSkillID == 2121009;
        }
    }

    public boolean is_making_skill_recipe() {
        int v1;
        if ((this.id / 1000000 != 92) || ((this.id % 10000) == 1)) {
            v1 = 10000 * (this.id / 10000);
            if ((v1 / 1000000) == 92 && (v1 % 10000) == 0) {
                return true;
            }
        }
        return false;
    }

    public boolean is_common_skll() {
        int v1 = get_skill_root_from_skill();
        return (v1 >= 800000 && v1 <= 800099);
    }

    public boolean is_novice_skill() {
        int v1 = get_skill_root_from_skill();
        return is_beginner_job(v1);
    }

    public boolean is_field_attack_obj_skill() {
        int v1;
        if (this.id >= 0) {
            v1 = get_skill_root_from_skill();
            return (v1 == 9500);
        } else {
            return false;
        }
    }

    public boolean is_beginner_job(int nJob) {
        boolean v2;
        if (nJob > 6001) {
            if (nJob == 13000) {
                return true;
            }
            v2 = (nJob == 14000);
            if (!v2) {
                if ((nJob % 1000) == 0) {
                    return true;
                }
                return (nJob / 100 == 8000);
            } else {
                return true;
            }
        }
        if (nJob >= 6000) {
            return true;
        }
        if (nJob > 3002) {
            v2 = (nJob == 5000);
            if (!v2) {
                if ((nJob % 1000) == 0) {
                    return true;
                }
                return (nJob / 100 == 8000);
            } else {
                return true;
            }
        }
        if (nJob >= 3001 || nJob >= 2001 && nJob <= 2005) {
            return true;
        }
        if ((nJob % 1000) == 0) {
            return true;
        }
        return (nJob / 100 == 8000);
    }

    public int get_skill_root_from_skill() {
        int result;
        result = (this.id / 10000);
        if (result == 8000) {
            result = (this.id / 100);
        }
        return result;
    }

    public boolean is_added_sp_dual_and_zero_skill() {
        boolean v1;
        if (this.id > 101100101) {
            if (this.id > 101110203) {
                if (this.id == 101120104) {
                    return true;
                }
                v1 = (this.id == 101120204);
            } else {
                if (this.id == 101110203 || this.id == 101100201 || this.id == 101110102) {
                    return true;
                }
                v1 = (this.id == 101110200);
            }
        } else {
            if (this.id == 101100101) {
                return true;
            }
            if (this.id > 4331002) {
                if (this.id == 4340007 || this.id == 4341004) {
                    return true;
                }
                v1 = (this.id == 101000101);
            } else {
                if (this.id == 4331002 || this.id == 4311003 || this.id == 4321006) {
                    return true;
                }
                v1 = (this.id == 4330009);
            }
        }
        if (!v1) {
            return false;
        }
        return true;
    }

    public int get_evan_job_level(int nJob) {
        int result;
        switch (nJob) {
            case 2200:
            case 2210:
                result = 1;
                break;
            case 2211:
            case 2212:
            case 2213:
                result = 2;
                break;
            case 2214:
            case 2215:
            case 2216:
                result = 3;
                break;
            case 2217:
            case 2218:
                result = 4;
                break;
            default:
                result = 0;
                break;
        }
        return result;
    }

    public int get_job_level(int nJob) {
        int result, v2;
        if (is_beginner_job(nJob) || (nJob % 100) == 0 || nJob == 501 || nJob == 3101) {
            result = 1;
        } else if (GameConstants.isEvan(nJob)) {
            result = get_evan_job_level(nJob);
        } else {
            if (GameConstants.isDualBlade(nJob)) {
                v2 = (nJob % 10 / 2);
            } else {
                v2 = (nJob % 10);
            }
            result = (v2 <= 2) ? (v2 + 2) : 0;
        }
        return result;
    }

    @Override
    public boolean is_professional_skill() {
        return ((this.id / 1000000) == 92 && (this.id % 10000) == 0);
    }

    @Override
    public boolean CheckMasterLevel() {
        int v2;
        boolean result;
        if (is_ignore_master_level(id)
                || is_professional_skill()
                || ((this.id - get_skill_root_from_skill()) == 1054) //임의 추가.
                || is_making_skill_recipe()
                || is_common_skll()
                || is_novice_skill()
                || is_field_attack_obj_skill()) {
            return false;
        } else {
            v2 = get_skill_root_from_skill();
            result = (is_added_sp_dual_and_zero_skill()) || ((get_job_level(v2) == 4) && (!GameConstants.isZero(v2)));
        }
        return result;
    }

    @Override
    public boolean ishyper() {
        return hyper;
    }

    public int getSkillType() {
        return skillType;
    }

    @Override
    public int getPsdSkill() {
        return psdSkill;
    }

    @Override
    public int getPsd() {
        return psd;
    }

    @Override
    public String getPsdDamR() {
        return psdDamR;
    }

    @Override
    public boolean isNotRemoved() {
        return notRemoved;
    }

    @Override
    public boolean notCancel() {
        return notCancel;
    }

    @Override
    public int getHyperStats() {
        return hyperStat;
    }

    @Override
    public boolean isTimeLimited() {
        return this.H;
    }

    public int getHyper() {
        return this.az;
    }
}
