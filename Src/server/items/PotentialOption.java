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
import java.util.List;
import java.util.Map;

/**
 *
 * @author 최용재 <virgo_s_t@naver.com>
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
