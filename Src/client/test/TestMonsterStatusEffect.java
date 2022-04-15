/*






 */

package client.test;

import client.MapleCharacter;
import java.util.Map;
import java.util.concurrent.ScheduledFuture;

import client.skills.Skill;
import java.lang.ref.WeakReference;
import server.life.MapleMonster;
import server.life.MobSkill;
import tools.ArrayMap;

public class TestMonsterStatusEffect {

    private final Map<TestMonsterStatus, Integer> stati;
    private final Skill skill;
    private final TestMobSkill mobskill;
    private final boolean monsterSkill;
    private int ownerid;
    private long cancelTime;
    private int poisonSchedule;
    private WeakReference<MapleCharacter> weakChr = null;

    public TestMonsterStatusEffect(final Map<TestMonsterStatus, Integer> stati, final Skill skillId, final TestMobSkill mobskill, final boolean monsterSkill) {
        this.stati = new ArrayMap<TestMonsterStatus, Integer>(stati);
        this.skill = skillId;
        this.monsterSkill = monsterSkill;
        this.mobskill = mobskill;
    }

    public final Map<TestMonsterStatus, Integer> getStati() {
        return stati;
    }

    public final Integer setValue(final TestMonsterStatus status, final Integer newVal) {
        return stati.put(status, newVal);
    }

    public final Skill getSkill() {
        return skill;
    }

    public final TestMobSkill getMobSkill() {
        return mobskill;
    }

    public final boolean isMonsterSkill() {
        return monsterSkill;
    }

    public final void setOwnerId(final int ownerid) {
        this.ownerid = ownerid;
    }

    public final int getOwnerId() {
        return ownerid;
    }


    public final void removeActiveStatus(final TestMonsterStatus stat) {
        stati.remove(stat);
    }

    public final void setCancelTask(final long cancelTask) {
        this.cancelTime = System.currentTimeMillis() + cancelTask;
    }

    public final long getCancelTask() {
        return this.cancelTime;
    }

    public final void setPoisonSchedule(final int poisonSchedule, MapleCharacter chrr) {
        this.poisonSchedule = poisonSchedule;
        this.weakChr = new WeakReference<MapleCharacter>(chrr);
        this.ownerid = chrr.getId();
    }

    public WeakReference<MapleCharacter> getWeakChr() {
        return weakChr;
    }

    public final int getPoisonSchedule() {
        return this.poisonSchedule;
    }

    public final boolean shouldCancel(long now) {
        return (cancelTime > 0 && cancelTime <= now);
    }

    public final void cancelTask() {
        cancelTime = 0;
    }

    public final int getFromID() {
        return weakChr == null || weakChr.get() == null ? 0 : weakChr.get().getId();
    }

    public final void cancelPoisonSchedule(MapleMonster mm) {
        this.poisonSchedule = 0;
        this.weakChr = null;
    }


}