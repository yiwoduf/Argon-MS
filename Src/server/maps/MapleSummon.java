/*
 Maple Team ProJect
 제작 용도 : 서버운영용
 팀원목록
 * 강동원 dongwon1852@nate.com 
 * 김선일 fileupload@nate.com
 * 김석현 azxcs3@nate.com
 * 김진성 m0nday_s@nate.com
 * 공준협 kkong1001@nate.com
 * 김민호 rubystory0603@nate.com
 * 이재왕 ejwj5592@nate.com
 * 최용재 virgo_s_t@nate.com
 * 서성덕 abq1239@nate.com
 */
package server.maps;

import constants.GameConstants;
import client.MapleClient;
import client.MapleCharacter;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import client.stats.BuffStats;
import packet.creators.MainPacketCreator;
import tools.Timer.ShowTimer;
import java.awt.Point;
import java.lang.ref.WeakReference;

public class MapleSummon extends AnimatedHinaMapObjectExtend {

    private final MapleCharacter owner;
    private final WeakReference<MapleCharacter> ownerchr;
    private final int skillLevel;
    private final int skill;
    private int hp;
    private int maelstromid;
    private SummonMovementType movementType;

    // Since player can have more than 1 summon [Pirate] 
    // Let's put it here instead of cheat tracker
    private byte Summon_tickResetCount;
    private long endTime;

    public MapleSummon(final MapleCharacter owner, final SkillStatEffect skill, final Point pos, final SummonMovementType movementType, long startTime) {
        this(owner, skill.getSourceId(), skill.getLevel(), pos, movementType, startTime);
    }

    public MapleSummon(final MapleCharacter owner, final int skill, final Point pos, final SummonMovementType movementType, long startTime) {
        super();
        this.owner = owner;
        this.ownerchr = new WeakReference<MapleCharacter>(owner);
        this.skill = skill;
        this.movementType = movementType;
        this.skillLevel = owner.getSummonLinkSkillLevel(SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(skill)));
        this.endTime = startTime + SkillFactory.getSkill(skill).getEffect(skillLevel).getLocalDuraction(owner);
        if (skillLevel == 0) {
            return;
        }
        setPosition(pos);
        Summon_tickResetCount = 0;
    }

    public MapleSummon(MapleCharacter owner, int skill, int duration, Point pos, SummonMovementType movementType, long startTime) {
        this.owner = owner;
        this.ownerchr = new WeakReference<MapleCharacter>(owner);
        this.skill = skill;
        int lkk = 0;
        if (owner.getSkillLevel(GameConstants.getLinkedAttackSkill(skill)) > 0) {
            lkk = owner.getSkillLevel(GameConstants.getLinkedAttackSkill(skill));
        }
        this.skillLevel = (byte) lkk;
        this.movementType = movementType;
        this.endTime = startTime + SkillFactory.getSkill(skill).getEffect(skillLevel).getLocalDuraction(owner);
        setPosition(pos);
    }

    @Override
    public final void sendSpawnData(final MapleClient client) {
        client.getSession().writeAndFlush(MainPacketCreator.spawnSummon(MapleSummon.this, skillLevel, false));
    }

    @Override
    public final void sendDestroyData(final MapleClient client) {
        client.getSession().writeAndFlush(MainPacketCreator.removeSummon(this, true));
    }

    public final void removeSummon(final MapleMap map, final boolean animation) {
        map.broadcastMessage(MainPacketCreator.removeSummon(this, animation));
        map.removeMapObject(this);
        getOwner().removeVisibleMapObject(this);
        getOwner().removeSummon(getObjectId());
    }
    
    public final void removeSummon(final MapleMap map) {
        removeSummon(map, true);
    }

    public final int getSkill() {
        return skill;
    }

    public final int getHP() {
        return hp;
    }

    public final void addHP(final int delta) {
        this.hp += delta;
    }

    public final MapleCharacter getOwnerChr() {
        return ownerchr.get();
    }

    public final SummonMovementType getMovementType() {
        return movementType;
    }

    public final boolean isStaticSummon() {
        return SkillFactory.getSkill(getSkill()).getEffect(1).isStaticSummon();
    }

    public final boolean isSummon() {
        switch (skill) {
            case 12111004:
            case 1301013: //beholder
            case 1311014:
            case 2321003:
            case 2121005:
            case 35111011:
            case 2221005:
            case 2211011:
            case 5211001: // Pirate octopus summon
            case 5211002:
            case 5220002: // wrath of the octopi
            case 4341006: //더미 이펙트
            case 61111002: //페트리 파이드
            case 3221014:
            case 22171052: //서먼 오닉스드래곤
            case 13111004:
            case 11001004:
            case 12001004:
            case 13001004:
            case 14001005:
            case 35111005:
            case 15001004:
            case 35121011:
            case 35121009: //로보 팩토리
            case 35121010:
            case 14000027: //쉐도우 배트
                return true;
        }
        return false;
    }

    public final boolean isRemovableSummon() {
        switch (skill) {
            case 35111002:
                return true;
        }
        return false;
    }

    public final int getSummonType() {
        switch (skill) {
            case 35121010:
            case 14000027:
            case 14111024:
                return 0;
            case 1301013:
            case 36121014:
                return 2; //buffs and stuff
            case 23111008:
            case 23111009:
            case 23111010:
            case 35111001:
            case 35111009:
            case 35111010:
                return 3; //attacks what you attack
            case 35121009:
                return 5; //sub summons
            case 35121003:
                return 6; //charge
            case 4111007:
            case 4211007:
                return 7; //attacks what you get hit by
            case 33101010:
            case 33001011:
                return 10;
        }
        return 1;
    }

    public final boolean isGaviota() {
        return skill == 5211002;
    }

    public final int getSkillLevel() {
        return skillLevel;
    }

    @Override
    public final MapleMapObjectType getType() {
        return MapleMapObjectType.SUMMON;
    }

    public final void CheckSummonAttackFrequency(final MapleCharacter chr, final int tickcount) {
        Summon_tickResetCount++;
        if (Summon_tickResetCount > 4) {
            Summon_tickResetCount = 0;
        }
    }

    public final MapleCharacter getOwner() {
        return owner;
    }

    public final int getMaelstromId() {
        return maelstromid;
    }

    public final void setMaelstromId(int maelstromid) {
        this.maelstromid = maelstromid;
    }
    
    public long getEndTime() {
        return endTime;
    }
    
    public  void setEndTime(long i) {
        endTime = i;
    }
}
