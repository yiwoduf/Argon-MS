/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package constants;

/**
 *
 * @author 에반테이르
 */
public enum GMType {
    DONATOR(1),
    BJGM_ADGM(2),
    POLICE(3),
    LOWGM(4),
    GM(5),
    SUPERGM(6);
    private int level;
    private GMType (int level) {
        this.level = level;
    }
    public int getValue() {
        return level;
    }
}
