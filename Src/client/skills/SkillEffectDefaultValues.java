/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client.skills;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author T-Sun
 * 
 *   This file was written by T-Sun (doomgate17@naver.com)
 *
 *
 *
 */
public class SkillEffectDefaultValues {
    private final static Map<String, Integer> defvalues = new HashMap<String, Integer>();

    static {
        defvalues.put("time", -1);
        defvalues.put("damage", 100);
        defvalues.put("attackCount", 1);
        defvalues.put("bulletCount", 1);
        defvalues.put("moveTo", -1);
        defvalues.put("prop", 100);
        defvalues.put("mobCount", 1);
        defvalues.put("slotCount", 0);
        defvalues.put("type", 0);
        defvalues.put("onActive", -1); //리차지
    }
    
    public static int getDef(String key) {
        if (defvalues.containsKey(key)) {
            return defvalues.get(key);
        }
        return 0;
    }
}
