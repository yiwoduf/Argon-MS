/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client.stats;

import java.math.BigInteger;

public enum DiseaseStats implements GlobalBuffStat {    
    BLIND                   ("10000000000000000"),
    SLOW                    ("10000000000000000000"),
    CURSE                   ("20000000000000000000"),
    WEAKEN                  ("40000000000000000000"),
    
    SEAL                    ("10000000000000000000000"),
    POISON                  ("20000000000000000000000"),
    STUN                    ("40000000000000000000000"),
    DARKNESS                ("8000000000000000000000"),
    SHADOW                  ("10000000000000000000000000"),
    SEDUCE                  ("10000000000000000000000000"),
    POTION                  ("20000000000000000000000000"),
    REVERSE_DIRECTION       ("2000000000000000000000000000000"),
    FREEZE                  ("2000000000000000000000000000000000000000"),
    TELEPORT                ("80000000000000000000000000000000000000000000000000000000000000000000000000000000"),
    ZOMBIFY                 ("8000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");

        
    public static int BIT_COUNT = 96;
    private BigInteger value;

    private DiseaseStats(String hex) {
        value = new BigInteger(hex, 16);
    }

    @Override
    public BigInteger getBigValue() {
        return value;
    }
}
