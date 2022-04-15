/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.items;

import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author �������̸�
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
