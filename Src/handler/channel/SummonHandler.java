/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package handler.channel;

import client.MapleCharacter;
import client.MapleClient;
import client.skills.ISkill;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import client.skills.SummonSkillEntry;
import client.stats.BuffStats;
import client.stats.MonsterStatus;
import client.stats.MonsterStatusEffect;
import constants.GameConstants;
import java.awt.Point;
import java.util.*;
import packet.creators.MainPacketCreator;
import packet.transfer.read.ReadingMaple;
import server.items.ItemInformation;
import server.life.MapleMonster;
import server.life.SummonAttackEntry;
import server.maps.*;
import server.movement.LifeMovementFragment;
import tools.Pair;
import tools.RandomStream.Randomizer;

public class SummonHandler {

    public static final void MoveDragon(final ReadingMaple rh, final MapleCharacter chr) {
        rh.skip(12); //POS v192 +4byte.
        final List<LifeMovementFragment> res = MovementParse.parseMovement(rh);
        if (chr.getDragon() != null) {
            final List<LifeMovementFragment> res2 = new ArrayList<LifeMovementFragment>(res);
            final Point pos = chr.getDragon().getPosition();
            MovementParse.updatePosition(res, chr.getDragon(), 0);
            if (!chr.isHidden()) {
                chr.getMap().broadcastMessage(chr, MainPacketCreator.moveDragon(chr.getDragon(), pos, res), chr.getPosition());
            }
        }
    }

    public static final void MoveSummon(final ReadingMaple rh, final MapleCharacter chr) {
        final int oid = rh.readInt();
        rh.skip(12); // +4byte [v192]
        final List<LifeMovementFragment> res = MovementParse.parseMovement(rh);

        for (Pair<Integer, MapleSummon> sum : chr.getSummons().values()) {
            if (sum.right.getObjectId() == oid && sum.right.getMovementType() != SummonMovementType.STATIONARY) {
                final Point startPos = sum.right.getPosition();
                MovementParse.updatePosition(res, sum.right, 0);
                chr.getMap().broadcastMessage(chr, MainPacketCreator.moveSummon(chr.getId(), oid, startPos, res), sum.right.getPosition());
                break;
            }
        }
    }

    public static final void DamageSummon(final ReadingMaple rh, final MapleCharacter chr) {
        final int unkByte = rh.readByte();
        final int damage = rh.readInt();
        final int monsterIdFrom = rh.readInt();

        final Iterator<Pair<Integer, MapleSummon>> iter = chr.getSummons().values().iterator();
        MapleSummon summon;

        while (iter.hasNext()) {
            summon = iter.next().right;
            if (summon.getOwner().getId() == chr.getId()) {
                summon.addHP((short) -damage);
                chr.getMap().broadcastMessage(chr, MainPacketCreator.damageSummon(chr.getId(), summon.getSkill(), damage, unkByte, monsterIdFrom), summon.getPosition());
                if (summon.getSkill() == 14000027) {
                    chr.getMap().broadcastMessage(MainPacketCreator.removeSummon(summon, true));
                    chr.getMap().removeMapObject(summon);
                    summon.getOwner().removeVisibleMapObject(summon);
                    if (summon.getOwner().getSummons().get(summon.getSkill()) != null) {
                        summon.getOwner().getSummons().remove(summon.getObjectId());
                    }
                }
            }
        }
    }

    public static final void SummonAttack(final ReadingMaple rh, final MapleClient c, final MapleCharacter chr) {
        if (!chr.isAlive()) {
            return;
        }
        final MapleMap map = chr.getMap();
        final MapleMapObject obj = map.getMapObject(rh.readInt());
        if (obj == null || !obj.getType().equals(MapleMapObjectType.SUMMON)) {
            return;
        }
        int v1 = rh.readInt();
        int skillid = rh.readInt();
        int v2 = rh.readInt();
        final byte animation = rh.readByte();
        byte tbyte = (byte) (rh.readByte());
        short targets = (short) ((tbyte >>> 4) & 0xF);
        byte hits = (byte) (tbyte & 0xF);
        byte v3 = rh.readByte();
        int v4 = rh.readInt(); //?
        int v5 = rh.readInt(); //?
        int v6 = rh.readInt(); //flag
        int v7 = rh.readInt();
        int v8 = rh.readInt();
        int v9 = rh.readInt();
        short v10 = rh.readShort();
        if (skillid == 35111002) {
            rh.skip(12);
        }
        final MapleSummon summon = (MapleSummon) obj;
        final ISkill summonSkill = SkillFactory.getSkill(skillid);
        final SummonSkillEntry sse = SkillFactory.getSummonData(summon.getSkill());
        if (sse == null) {
            return;
        }
        final List<SummonAttackEntry> allDamage = new ArrayList<SummonAttackEntry>();
        for (int i = 0; i < targets; i++) {
            int oid = rh.readInt();
            MapleMonster mob = map.getMonsterByOid(oid);
            rh.skip(24);
            List<Integer> damage = new ArrayList<Integer>();
            for (int j = 0; j < hits; j++) {
                damage.add(rh.readInt());
            }
            allDamage.add(new SummonAttackEntry(mob, damage));
            rh.skip(5);
        }
        for (SummonAttackEntry attackEntry : allDamage) {
            final long toDamage = attackEntry.getTotDamage();
            final MapleMonster mob = attackEntry.getMonster();
            final SkillStatEffect summonEffect = summonSkill.getEffect(summon.getSkillLevel());
            if (mob != null) {
                if (summonEffect.getMonsterStati().size() > 0) {
                    if (summonEffect.makeChanceResult()) {
                        mob.applyStatus(chr, new MonsterStatusEffect(summonEffect.getMonsterStati(), summonSkill, summon.getSkillLevel(), null, false), summonEffect.getDuration(), summon.getObjectId());
                    }
                }
                mob.damage(chr, toDamage, true, 0);
                chr.checkMonsterAggro(mob);
            }
        }
        map.broadcastMessage(chr, MainPacketCreator.summonAttack(summon, tbyte, animation, allDamage), summon.getPosition());
        switch (summon.getSkill()) {
            case 32001014: // 데스
            case 32100010: // 데스 컨트랙트
            case 32110017: // 데스 컨트랙트2
            case 32120019: // 데스 컨트랙트3
                summon.setEndTime(System.currentTimeMillis() + 1000);
                c.getPlayer().deathCount = 1;
                c.getPlayer().getBuffedSkillEffect(BuffStats.CTS_BMageDeath).applyToBMDeath(chr);
                break;
            case 2111010:
            case 33101008:
                summon.removeSummon(map);
                break;
        }
    }

    public static final void removeSummon(final ReadingMaple rh, final MapleClient ha) {
        int oid = rh.readInt();
        MapleSummon hs = null;
        if ((MapleSummon) ha.getPlayer().getMap().getMapObject(oid) != null) {
            hs = (MapleSummon) ha.getPlayer().getMap().getMapObject(oid);
        }
        hs.removeSummon(ha.getPlayer().getMap());
        if (hs == null) {
            System.err.println("[오류] 현재 소환된 소환수들중 해당하는 오브젝트를 발견하지 못했습니다. : " + oid);
            return;
        }
    }

    public static final void summonSkill(final ReadingMaple rh, final MapleClient ha, final MapleCharacter chr) {
        int oid = rh.readInt();
        int skillid = rh.readInt();
        MapleSummon hs = null;
        if ((MapleSummon) ha.getPlayer().getMap().getMapObject(oid) != null) {
            hs = (MapleSummon) ha.getPlayer().getMap().getMapObject(oid);
        }
        if (hs == null) {
            System.err.println("[오류] 현재 소환된 소환수들중 해당하는 오브젝트를 발견하지 못했습니다. : " + oid);
            return;
        }
        switch (skillid) {
            case 3512009: {
                if (!ha.getPlayer().canSummon(2000)) {
                    return;
                }
                if (hs.getSkill() != skillid) {
                    return;
                }
                for (int i = 0; i < 3; i++) {
                    final MapleSummon tosummon = new MapleSummon(ha.getPlayer(), SkillFactory.getSkill(35121011).getEffect(hs.getSkillLevel()), new Point(hs.getPosition().x, hs.getPosition().y - 5), SummonMovementType.WALK_STATIONARY, System.currentTimeMillis());
                    ha.getPlayer().getMap().spawnSummon(tosummon, true, (int) (20 + 2 * Math.floor(hs.getSkillLevel() / 3)) * 1000);
                }
                break;
            }
            case 35111011: {
                if (!ha.getPlayer().canSummon(1000)) {
                    return;
                }
                ha.getPlayer().addHP((int) (ha.getPlayer().getStat().getCurrentMaxHp() * SkillFactory.getSkill(hs.getSkill()).getEffect(hs.getSkillLevel()).getHp() / 100.0));
                ha.getPlayer().getClient().getSession().writeAndFlush(MainPacketCreator.showSkillEffect(-1, chr.getLevel(), hs.getSkill(), hs.getSkillLevel(), (byte) 0, 2, null, null));
                ha.getPlayer().getMap().broadcastMessage(ha.getPlayer(), MainPacketCreator.showSkillEffect(ha.getPlayer().getId(), chr.getLevel(), hs.getSkill(), hs.getSkillLevel(), (byte) 0, 2, null, null), false);
            }
            case 1301013: {
                byte state = rh.readByte();
                ISkill bHealing = SkillFactory.getSkill(1301013);
                final int bHealingLvl = 1;
                final SkillStatEffect healEffect = bHealing.getEffect(bHealingLvl);
                chr.addHP(healEffect.getHp());
                chr.getMap().broadcastMessage(MainPacketCreator.summonSkill(chr.getId(), oid, state));
                break;
            }
            case 1310016: {
                byte state = rh.readByte();
                chr.getMap().broadcastMessage(MainPacketCreator.summonSkill(chr.getId(), oid, 11));
                SkillFactory.getSkill(skillid).getEffect(chr.getSkillLevel(skillid)).applyTo(chr);
                break;
            }
            default: {
                if (GameConstants.isAngelicBlessBuff(skillid)) {
                    ItemInformation ii = ItemInformation.getInstance();
                    int effectid = 0;
                    switch (skillid % 1000) {
                        case 86: //엔젤릭블레스
                            ii.getItemEffect(2022746).applyTo(ha.getPlayer());
                            effectid = 1085;
                            break;
                        case 88: //다크엔젤릭블레스
                            ii.getItemEffect(2022747).applyTo(ha.getPlayer());
                            effectid = 1087;
                            break;
                        case 91: //눈꽃엔젤릭블레스
                            ii.getItemEffect(2022764).applyTo(ha.getPlayer());
                            effectid = 1090;
                            break;
                        case 180://화이트엔젤릭블레스
                            ii.getItemEffect(2022823).applyTo(ha.getPlayer());
                            effectid = 1179;
                            break;
                    }
                    ha.getPlayer().getMap().broadcastMessage(MainPacketCreator.showSkillEffect(-1, skillid, chr.getSkillLevel(skillid)));
                    ha.getPlayer().getMap().broadcastMessage(MainPacketCreator.showSkillEffect(ha.getPlayer().getId(), skillid, chr.getSkillLevel(skillid)));
                    break;
                }
            }
        }
    }
}
