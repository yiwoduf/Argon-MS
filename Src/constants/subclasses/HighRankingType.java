/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
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
