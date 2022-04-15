/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package constants.subclasses;

/**
 *
 * @author TSun
 */
public enum HighRankingType {
    
    FirstAdvance,SecondAdvance,ThirdAdvance,ForthAdvance;
    
    public int getType() {
        return ordinal();
    }
}
