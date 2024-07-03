/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package client.skills;

import constants.GameConstants;
import java.util.HashMap;
import java.util.Map;
import provider.MapleData;
import provider.MapleDataTool;
import tools.StringUtil;
import java.util.concurrent.locks.ReentrantLock;

public class SkillFactory {

    public static final Map<Integer, Skill> skills = new HashMap<>();
    public static final Map<Integer, SummonSkillEntry> SummonSkillInformation = new HashMap<>();
    public static ReentrantLock lock = new ReentrantLock();

    public static Skill getSkill(final int id) {
        if (!skills.isEmpty()) {
            return skills.get(id);
        }
        return null;
    }

    public static String getSkillName(final int id, final MapleData stringData) {
        if (id == 0) {
            return "평타";
        }
        String strId = Integer.toString(id);
        strId = StringUtil.getLeftPaddedStr(strId, '0', 7);
        MapleData skillroot = stringData.getChildByPath(strId);
        if (skillroot != null) {
            return MapleDataTool.getString(skillroot.getChildByPath("name"), "");
        }
        return "";
    }

    public static String getSkillName(final int id) {
        ISkill skill = getSkill(id);
        if (skill != null) {
            return skill.getName();
        }
        return null;
    }

    public static final SummonSkillEntry getSummonData(final int skillid) {
        return SummonSkillInformation.get(skillid);
    }

    public static boolean is_skill_need_master_level(int skillid) {
        boolean result;
        int v2;
        if (is_ignore_master_level(skillid)
                || (skillid / 1000000 == 92 && (skillid % 10000) == 0)
                || is_making_skill_recipe(skillid)
                || is_common_skill(skillid)
                || is_novice_skill(skillid)
                || is_field_attack_obj_skill(skillid)) {
            result = false;
        } else {
            v2 = get_skill_root_from_skill(skillid);
            result = is_added_sp_dual_and_zero_skill(skillid) || (get_job_level(v2) == 4 && !GameConstants.isZero(v2));
        }
        return result;
    }

    public static int get_skill_root_from_skill(int nSkillID) {
        int result; // eax@1

        result = nSkillID / 10000;
        if (nSkillID / 10000 == 8000) {
            result = nSkillID / 100;
        }
        return result;
    }

    public static boolean is_added_sp_dual_and_zero_skill(int nSkillID) {
        boolean v1; // zf@7

        if (nSkillID > 101100101) {
            if (nSkillID > 101110203) {
                if (nSkillID == 101120104) {
                    return true;
                }
                v1 = nSkillID == 101120204;
            } else {
                if (nSkillID == 101110203 || nSkillID == 101100201 || nSkillID == 101110102) {
                    return true;
                }
                v1 = nSkillID == 101110200;
            }
        } else {
            if (nSkillID == 101100101) {
                return true;
            }
            if (nSkillID > 4331002) {
                if (nSkillID == 4340007 || nSkillID == 4341004) {
                    return true;
                }
                v1 = nSkillID == 101000101;
            } else {
                if (nSkillID == 4331002 || nSkillID == 4311003 || nSkillID == 4321006) {
                    return true;
                }
                v1 = nSkillID == 4330009;
            }
        }
        if (!v1) {
            return false;
        }
        return true;
    }

    public static int get_job_level(int nJob) {
        int result; // eax@6
        int v2; // esi@8

        if (is_beginner_job(nJob) || (nJob % 100) == 0 || nJob == 501 || nJob == 3101) {
            result = 1;
        } else if (GameConstants.isEvan(nJob)) {
            result = GameConstants.get_evan_job_level(nJob);
        } else {
            if (GameConstants.isDualBlade(nJob)) {
                v2 = nJob % 10 / 2;
            } else {
                v2 = nJob % 10;
            }
            result = (int) v2 <= 2 ? v2 + 2 : 0;
        }
        return result;
    }

    public static boolean is_common_skill(int skillid) {
        int v1;
        v1 = skillid / 10000;
        if (skillid / 10000 == 8000) {
            v1 = skillid / 100;
        }
        return v1 >= 800000 && v1 <= 800099;
    }

    public static boolean is_novice_skill(int skillid) {
        int v1;
        v1 = skillid / 10000;
        if (skillid / 10000 == 8000) {
            v1 = skillid / 100;
        }
        return is_beginner_job(v1);
    }

    public static boolean is_beginner_job(int nJob) {
        if (nJob > 6001) {
            if (nJob == 13000) {
                return true;
            }
            if (nJob == 14000) {
                return true;
            }
            if ((nJob % 1000) == 0) {
                return true;
            }
            return nJob / 100 == 8000;
        }
        if (nJob >= 6000) {
            return true;
        }
        if (nJob > 3002) {
            if (nJob == 5000) {
                return true;
            }
            if ((nJob % 1000) == 0) {
                return true;
            }
            return nJob / 100 == 8000;
        }
        if (nJob >= 3001 || nJob >= 2001 && nJob <= 2005) {
            return true;
        }
        if ((nJob % 1000) == 0) {
            return true;
        }
        return nJob / 100 == 8000;
    }

    public static boolean is_making_skill_recipe(int nRecipeID) {
        int v1;
        if (nRecipeID / 1000000 != 92 || (nRecipeID % 10000) != 0) {
            v1 = 10000 * (nRecipeID / 10000);
            if (v1 / 1000000 == 92 && (v1 % 10000) == 0) {
                return true;
            }
        }
        return false;
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
                return false;
            }
            return nSkillID == 2121009;
        }
    }

    public static boolean is_field_attack_obj_skill(int nSkillID) {
        int v1; // eax@3
        boolean result; // al@5

        if (nSkillID != 0 && nSkillID >= 0) {
            v1 = nSkillID / 10000;
            if (nSkillID / 10000 == 8000) {
                v1 = nSkillID / 100;
            }
            result = v1 == 9500;
        } else {
            result = false;
        }
        return result;
    }
}
