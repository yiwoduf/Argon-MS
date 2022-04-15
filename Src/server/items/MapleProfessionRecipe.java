/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.items;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author 에반테이르
 */
public class MapleProfessionRecipe {
    public Map<Integer, MapleProfessionRecipeEntry> recipes = new HashMap<Integer, MapleProfessionRecipeEntry>();
    private static MapleProfessionRecipe instance = null;
    
    public static MapleProfessionRecipe getInstance() {
        if (instance == null) {
            instance = new MapleProfessionRecipe();
        }
        return instance;
    }
    
    public MapleProfessionRecipeEntry getRecipe(int skillid) {
        return recipes.get(skillid);
    }
}
