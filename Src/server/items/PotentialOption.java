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
import java.util.List;
import java.util.Map;

/**
 *
 * @author �ֿ��� <virgo_s_t@naver.com>
 */
public class PotentialOption {
    
    private Map<Integer, List<Integer>> option = new HashMap<Integer, List<Integer>>();
    
    public PotentialOption(final Map<Integer, List<Integer>> option) {
        this.option = option;
    }
    
    public Map<Integer, List<Integer>> getPotentialOption() {
        return option;
    }
}
