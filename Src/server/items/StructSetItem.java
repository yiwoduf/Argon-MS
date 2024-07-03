/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.items;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class StructSetItem {

    public int setItemID;
    public byte completeCount;
    public Map<Integer, SetItem> items = new LinkedHashMap<Integer, SetItem>();
    public List<Integer> itemIDs = new ArrayList<Integer>();

    public static class SetItem {

        public int incPDD, incMDD, incSTR, incDEX, incINT, incLUK, incACC, incPAD, incMAD, incSpeed, incMHP, incMMP, incMHPr, incMMPr, incAllStat,
		option1, option2, option1Level, option2Level;
    }

    public Map<Integer, SetItem> getItems() {
        return new LinkedHashMap<Integer, SetItem>(items);
    }
}
