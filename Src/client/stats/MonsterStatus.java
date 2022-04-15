/*
 * Tespia Project
 * ==================================
 * 스마이트 smite_demolition@nate.com
 * ==================================
 *
 */
package client.stats;

import constants.GameConstants;
import java.math.BigInteger;
import java.util.Map;
import packet.creators.MobPacket;
import packet.creators.PacketProvider;

public enum MonsterStatus implements GlobalBuffStat {
    MS_BahamututAddDam      ("800000000000000000000000"),
    MS_BossPropPlus         ("400000000000000000000000"),
    MS_MultiDamSkill        ("200000000000000000000000"),
    MS_RWLiftPress          ("100000000000000000000000"),

    RWChoppingHammer        ("80000000000000000000000"),
    MS_TimeBomb             ("40000000000000000000000"),
    MS_Treasure             ("20000000000000000000000"),
    MS_AddEffect            ("10000000000000000000000"),

    MS_Invincible           ("8000000000000000000000"),
    MS_Explosion            ("4000000000000000000000"),
    MS_HangOver             ("2000000000000000000000"),
    Burned                  ("1000000000000000000000"),

    MS_BalogDisable         ("800000000000000000000"),
    MS_ExchangeAttack       ("400000000000000000000"),
    MS_AddBuffStat          ("200000000000000000000"),
    MS_LinkTeam             ("100000000000000000000"),

    MS_SoulExplosion        ("80000000000000000000"),
    MS_SeperateSoulP        ("40000000000000000000"),
    MS_SeperateSoulC        ("20000000000000000000"),
    MS_Ember                ("10000000000000000000"),

    MS_TrueSight            ("8000000000000000000"),
    Laser                   ("4000000000000000000"),
    MS_StatResetSkill       ("2000000000000000000"),
    //NULL                    ("1000000000000000000"),

    DamagedElemAttr         ("8000000000000000"),
    MS_Dark                 ("4000000000000000"),
    MS_Mystery              ("2000000000000000"),
    MS_AddDamParty          ("1000000000000000"),

    MS_HitCriDamR           ("800000000000000"),
    MS_Fatality             ("400000000000000"),
    MS_Lifting              ("200000000000000"),
    MS_DeadlyCharge         ("100000000000000"),

    MS_Smite                ("80000000000000"),
    AddDamSkill             ("40000000000000"),
    MS_Incizing             ("20000000000000"),

    FixDamRBuff             ("800000000000"),
    MS_ElementDarkness      ("400000000000"),
    MS_AreaInstallByHit     ("200000000000"),
    MS_BMageDebuff          ("100000000000"),

    MS_JaguarProvoke        ("80000000000"),
    MS_JaguarBleeding       ("40000000000"),
    MS_DarkLightning        ("20000000000"),
    MS_PinkbeanFlowerPot    ("10000000000"),

    WATK                    ("80000000"),
    WDEF                    ("40000000"),
    MATK                    ("20000000"),
    MARK_OF                 ("4000000"),
    HYPNOTIZE               ("1000000000000000"),
    MDEF                    ("10000000"),

    ACC                     ("8000000"),
    AVOID                   ("4000000"),
    SPEED                   ("2000000"),
    STUN                    ("1000000"),

    FREEZE                  ("800000"),
    POISON                  ("400000"),
    SEAL                    ("200000"),
    DARKNESS                ("100000"),

    WEAPON_ATTACK_UP        ("80000"),
    MAGIC_ATTACK_UP         ("40000"),
    WEAPON_DEFENSE_UP       ("20000"),
    MAGIC_DEFENSE_UP        ("10000"),

    WEAPON_IMMUNITY         ("8000"), //무력
    MAGIC_IMMUNITY          ("4000"), //무력
    SHADOW_WEB              ("2000"),
    MS_HardSkin             ("1000"),
    
    MS_Ambush               ("800"),
    VENOM                   ("400"),
    MS_Blind                ("200"),
    MS_SealSkill            ("100"),

    MS_Dazzle               ("80"),
    WEAPON_DAMAGE_REFLECT   ("40"), //반사
    MAGIC_DAMAGE_REFLECT    ("20"), //반사
    MS_RiseByToss           ("10"),

    BodyPressure            ("8"),
    MS_Weakness             ("4"),
    SHOWDOWN                ("2"),
    MAGIC_CRASH             ("1");


    public static int BIT_COUNT = 96;
    private BigInteger value;

    private MonsterStatus(String hex) {
        value = new BigInteger(hex, 16);
    }

    public static MonsterStatus getStati(int stat1, int stat_) {
        for (MonsterStatus stat : values()) {
            if (stat.getValue(stat_) == stat1) {
                return stat;
            }
        }
        return null;
    }

    public int getValue(int s) {
        final byte[] by = PacketProvider.convertFromBigInteger(value, MonsterStatus.BIT_COUNT);
        final int stat = GameConstants.bint(by, s);
        for (int i = 31; i >= 0; i --) {
            if ((stat >>> i) == 1) {
                return i;
            }
        }
        return -1;
    }

    @Override
    public BigInteger getBigValue() {
        return value;
    }
}
