/*
 * ArcStory Project
 * √÷¡÷ø¯ sch2307@naver.com
 * ¿Ã¡ÿ junny_adm@naver.com
 * øÏ¡ˆ»∆ raccoonfox69@gmail.com
 * ∞≠¡§±‘ ku3135@nate.com
 * ±Ë¡¯»´ designer@inerve.kr
 */

package client.test;

public enum TestMonsterStatus implements GlobalTestMonsterStat {

    NEUTRALISE(0x8L),
    IMPRINT(0x4L),
    MONSTER_BOMB(0x8L),
    MAGIC_CRASH(0x1L),
    TRIANGLE_FOMATION(0x8000L),
    STING_EXPLOSION(0x10000L),

    MARKOF(0x4000000L),
    BLODTO(0x8000000L),
    QUIVER(0x10000000L),
    SLIME(0x20000000L),

    WDEF_PER(0x10000000, 1),//
    WATK_PER(0x20000000, 1),//
    MDEF_PER(0x40000000, 1),//
    MATK_PER(0x80000000, 1),//
    ELEMENT_PER(0x40000000, 3),//

    WATK(0x80000000L),
    WDEF(0x20000000L),
    MATK(0x40000000L),
    MARK(0x4000000L),
    MDEF(0x10000000L),
    ACC(0x200L),
    AVOID(0x2000000000L),
    SPEED(0x2000000L),
    STUN(0x1000000L),
    FREEZE(0x800000L),
    POISON(0x8000000000L),
    FLAME_CHARGE(0x80, 2),//
    BLIZARD_CHARGE(0x2000000, 1),//
    LIGHTNING_CHARGE(0x80, 2),//

    SEAL(0x200000, 1),//
    SHOWDOWN(0x2L),
    WEAPON_ATTACK_UP(0x100000000000L),
    WEAPON_DEFENSE_UP(0x20000L),
    MAGIC_ATTACK_UP(0x400000000000L),
    MAGIC_DEFENSE_UP(0x10000L),
    DOOM(0x1000000000000L),
    SHADOW_WEB(0x2000000000000L),
    WEAPON_IMMUNITY(0x8000L),
    MAGIC_IMMUNITY(0x4000L),
    NINJA_AMBUSH(0x40000000000000L),
    VENOMOUS_WEAPON(0x100000000000000L),
    DARKNESS(0x200000000000000L),
    HYPNOTIZE(0x1000000000000000L),
    WEAPON_DAMAGE_REFLECT(0x20000000L),
    MAGIC_DAMAGE_REFLECT(0x40000000L),
    SUMMON(0x8000000000000000L),
    ;

    private final long i;
    private final byte index;

    private TestMonsterStatus(long i) {
        this.i = i;
        this.index = 1;
    }

    private TestMonsterStatus(long i, int index) {
        this.i = i;
        this.index = (byte)index;
    }

    private TestMonsterStatus(int i, boolean first) {
        this.i = i;
        this.index = (first ? 1 : (byte) 2);
    }

    public boolean isFirst() {
        return this.index == 1;
    }

    public int getIndex() {
        return this.index;
    }

    public boolean isEmpty() {
        return this == SUMMON;
    }

    public long getValue() {
        return this.i;
    }
}
