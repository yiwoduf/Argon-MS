/*
 * Tespia Project
 * ==================================
 * ¾îºñ½º abyss_min@nate.com
 * ==================================
 *
 */
package packet.creators;

import client.MapleCharacter;
import client.stats.MonsterStatus;
import client.stats.MonsterStatusEffect;
import client.test.GlobalTestMonsterStat;
import client.test.TestMonsterStatus;
import client.test.TestMonsterStatusEffect;
import constants.GameConstants;
import packet.opcode.SendPacketOpcode;
import packet.transfer.write.WritingPacket;
import server.life.MapleMonster;
import server.movement.LifeMovementFragment;

import java.awt.Point;
import java.math.BigInteger;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import launch.Start;

import server.maps.ObtacleAtom;
import tools.AttackPair;
import tools.HexTool;
import tools.Pair;
import tools.RandomStream.Randomizer;

public class MobPacket {

    public static byte[] damageMonster(final int oid, final long damage) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        packet.writeInt(oid);
        packet.write(0);
        packet.writeInt(damage);
        return packet.getPacket();
    }

    public static byte[] damageFriendlyMob(final MapleMonster mob, final long damage) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        packet.writeInt(mob.getObjectId());
        packet.write(1);
        packet.writeInt(damage);
        packet.writeInt(mob.getHp());
        packet.writeInt(mob.getMobMaxHp());
        return packet.getPacket();
    }

    public static byte[] killMonster(final int oid, final int animation, boolean isAswan) {
        WritingPacket packet = new WritingPacket();

        if (isAswan) {
            packet.writeShort(SendPacketOpcode.ASWAN_KILL_MONSTER.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.KILL_MONSTER.getValue());
        }
        packet.writeInt(oid);
        packet.write(animation); // 0 = dissapear, 1 = fade out, 2+ = special

        return packet.getPacket();
    }

    public static byte[] healMonster(final int oid, final int heal) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.DAMAGE_MONSTER.getValue());
        packet.writeInt(oid);
        packet.write(0);
        packet.writeInt(-heal);

        return packet.getPacket();
    }

    public static byte[] showMonsterHP(int oid, int remhppercentage) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_MONSTER_HP.getValue());
        packet.writeInt(oid);
        packet.write(remhppercentage);

        return packet.getPacket();
    }

    public static byte[] showBossHP(final MapleMonster mob) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        packet.write(6);
        packet.writeInt(mob.getId());
        if (mob.getHp() > 2147483647L) {
            packet.writeInt((int) (mob.getHp() / (double) mob.getMobMaxHp() * 2147483647.0D));
        } else {
            packet.writeInt((int) mob.getHp());
        }
        if (mob.getMobMaxHp() > 2147483647L) {
            packet.writeInt(2147483647);
        } else {
            packet.writeInt((int) mob.getMobMaxHp());
        }
        packet.write(mob.getStats().getTagColor());
        packet.write(mob.getStats().getTagBgColor());

        return packet.getPacket();
    }

    public static byte[] showFinalBossHP(final MapleMonster mob) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        packet.write(6);
        packet.writeInt(mob.getId());
        if (mob.getHp() > 2147483647L) {
            packet.writeInt((int) (mob.getHp() / mob.getMobMaxHp() * 2147483647.0D));
        } else {
            packet.writeInt((int) mob.getHp());
        }
        if (mob.getMobMaxHp() > 2147483647L) {
            packet.writeInt(2147483647);
        } else {
            packet.writeInt((int) mob.getMobMaxHp());
        }
        packet.write(mob.getStats().getTagColor());
        packet.write(mob.getStats().getTagBgColor());
        return packet.getPacket();
    }

    public static byte[] moveMonster(boolean useskill, int skill, int skill1, int skill2, int skill3, int skill4, int oid, Point startPos, Point startWobble, List<LifeMovementFragment> moves) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MOVE_MONSTER.getValue());
        packet.writeInt(oid);
        packet.write(useskill ? 1 : 0); //?? I THINK
        packet.write(skill); //pCenterSplit
        packet.write(skill1);  //bIllegalVelocity
        packet.write(skill2);
        packet.write(skill3);
        packet.write(skill4);
        packet.write0(6); //o.o?
        packet.writePos(startPos);
        packet.writePos(startWobble);
        serializeMovementList(packet, moves);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] moveMonster(byte useskill, int skill, int skill1, int skill2, int skill3, int skill4, int oid, int tEncodedGatherDuration, Point startPos, Point velPos, List<LifeMovementFragment> moves, List<Pair<Short, Short>> multiTargetForBall, List<Short> randTimeForAreaAttack) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MOVE_MONSTER.getValue());
        packet.writeInt(oid);
        packet.write(useskill);
        packet.write(skill); //pCenterSplit
        packet.write(skill1);  //bIllegalVelocity
        packet.write(skill2);
        packet.write(skill3);
        packet.write(skill4);

        packet.write(multiTargetForBall.size());
        for (int i = 0; i < multiTargetForBall.size(); i++) {
            packet.writeShort(multiTargetForBall.get(i).left);
            packet.writeShort(multiTargetForBall.get(i).right);
        }

        packet.write(randTimeForAreaAttack.size());
        for (int i = 0; i < randTimeForAreaAttack.size(); i++) {
            packet.writeShort(randTimeForAreaAttack.get(i));
        }

        packet.writeInt(tEncodedGatherDuration); //1.2.192+
        packet.writePos(startPos);
        packet.writePos(velPos);
        serializeMovementList(packet, moves);
        packet.write(0); // boolean

        return packet.getPacket();
    }

    private static void serializeMovementList(WritingPacket packet, List<LifeMovementFragment> moves) {
        packet.write(moves.size());
        for (LifeMovementFragment move : moves) {
            move.serialize(packet);
        }
    }

    public static void addMobSkillInfo(WritingPacket packet, MapleMonster life) {
        if (life.isStatChanged()) {
            packet.write(1);
            packet.writeInt(life.getHp());
            packet.writeInt(life.getMp());
            packet.writeInt(life.getStats().getExp());
            packet.writeInt(life.getStats().getPad());
            packet.writeInt(life.getStats().getMad());
            packet.writeInt(0);//PDR
            packet.writeInt(0);//MDR
            packet.writeInt(life.getStats().getAcc());
            packet.writeInt(life.getStats().getEva());
            packet.writeInt(life.getStats().getPushed());
            packet.writeInt(life.getStats().getSpeed());
            packet.writeInt(life.getStats().getLevel());
            packet.writeInt(0);//UserCount
        } else {
            packet.write(0);
        }
        Map<MonsterStatus, Integer> stats = new HashMap<MonsterStatus, Integer>();
        for (Entry<MonsterStatus, Integer> stat : stats.entrySet()) {
            stats.put(stat.getKey(), stat.getValue());
        }
        byte[] by = writeMonsterIntMask(stats);
        packet.write(by);
        int mask1 = GameConstants.bint(by, 0);
        int mask2 = GameConstants.bint(by, 4);
        int mask3 = GameConstants.bint(by, 8);
        for (int i = 31; i >= 0; i--) {
            if (((mask1 >>> i) & 1) == 1) {
                MonsterStatus key = MonsterStatus.getStati(0, i);
                if (key != null) {
                    MonsterStatusEffect mse = life.getStati().get(key);
                    if (mse != null) {
                        Entry<MonsterStatus, Integer> stat = mse.getStati(i, 0);
                        if (stat != null) {
                            int value = stat.getValue();
                            packet.writeInt(value == 0 ? 1 : value);
                            packet.writeInt(mse.getSkillId());
                            packet.writeShort(0);
                        }
                    }
                }
            }
        }
        for (int i = 31; i >= 0; i--) {
            if (((mask2 >>> i) & 1) == 1) {
                MonsterStatus key = MonsterStatus.getStati(4, i);
                if (key != null) {
                    MonsterStatusEffect mse = life.getStati().get(key);
                    if (mse != null) {
                        Entry<MonsterStatus, Integer> stat = mse.getStati(i, 4);
                        if (stat != null) {
                            int value = stat.getValue();
                            packet.writeInt(value == 0 ? 1 : value);
                            packet.writeInt(mse.getSkillId());
                            packet.writeShort(0);
                        }
                    }
                }
            }
        }
        for (int i = 31; i >= 21; i--) {
            if (((mask3 >>> i) & 1) == 1) {
                MonsterStatus key = MonsterStatus.getStati(8, i);
                if (key != null) {
                    MonsterStatusEffect mse = life.getStati().get(key);
                    if (mse != null) {
                        Entry<MonsterStatus, Integer> stat = mse.getStati(i, 8);
                        if (stat != null) {
                            int value = stat.getValue();
                            packet.writeInt(value == 0 ? 1 : value);
                            packet.writeInt(mse.getSkillId());
                            packet.writeShort(0);
                        }
                    }
                }
            }
        }
        if (((mask1 >>> 30) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 28) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 6) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 5) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 6) & 1) == 1 || ((mask1 >>> 5) & 1) == 1) {
            packet.writeInt(0);
            packet.write(0);
            packet.writeInt(0);
        }
        if (((mask2 >>> 26) & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask3 >>> 22) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask3 >>> 17) & 1) == 1) {
            packet.write(1);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask2 >>> 24) & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask2 >>> 21) & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask1 >>> 25) & 1) == 1) {
            packet.write(0);
        }
        if (((mask2 >>> 12) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask2 >>> 9) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask2 >>> 7) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask2 >>> 1) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 23) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask3 >>> 20) & 1) == 1) {
            MonsterStatusEffect mse = life.getStati().get(MonsterStatus.Burned);
            if (mse != null) {
                packet.write(1);
                packet.writeInt(mse.getOwnerId());
                packet.writeInt(mse.getSkill().getId());
                packet.writeInt(mse.getStati().get(MonsterStatus.Burned));
                packet.writeInt(mse.getSkill().getEffect(mse.getSkillLevel()).getDotInterval()); //dot Interval
                packet.writeInt(mse.getV(1));
                packet.writeInt(mse.getV(2));
                packet.writeInt(mse.getSkill().getEffect(mse.getSkillLevel()).getDotTime()); // dotTime
                packet.writeInt(0);
                packet.writeInt(0);
                packet.writeInt(0);
                packet.writeInt(0);
            }
        }
        if (((mask3 >>> 19) & 1) == 1) {
            packet.write(0);
            packet.write(0);
        }
        if (((mask3 >>> 18) & 1) == 1) {
            packet.write(0);
        }
        if (((mask2 >>> 28) & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask3 >>> 16) & 1) == 1) {
            packet.writeMapleAsciiString("");
        }
        if ((mask3 & 0x8000) == 0x8000) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x4000) == 0x4000) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeShort(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x2000) == 0x2000) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeShort(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x1000) == 0x1000) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x800) == 0x800) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x20000000) == 0x20000000) {
            packet.writeInt(0);
        }
        if ((mask3 & 0x400) == 0x400) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask2 & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask2 & 0x80000000) == 0x80000000) {
            packet.writeInt(0);
            packet.writeInt(0);
        }
    }

    public static byte[] spawnMonster(MapleMonster life, int spawnType, int effect, int link, boolean isAswan) {
        WritingPacket packet = new WritingPacket();
        if (isAswan) {
            packet.writeShort(SendPacketOpcode.ASWAN_SPAWN_MONSTER.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.SPAWN_MONSTER.getValue());
        }
        packet.write(0);
        packet.writeInt(life.getObjectId());
        packet.write(1);
        packet.writeInt(life.getId());
        addMobSkillInfo(packet, life);
        packet.writeShort(life.getPosition().x);
        packet.writeShort(life.getPosition().y);
        packet.write(life.getStance());
        if ((life.getId() == 8910000) || (life.getId() == 8910100)) {
            packet.write(0);
        }
        packet.writeShort(0);
        packet.writeShort(life.getFh());
        int v24 = spawnType;
        packet.write(v24);
        if (v24 == -3 || v24 >= 0) {
            packet.writeInt(link);
        }
        packet.write(0xFF); //Monster Carnival.
        packet.writeInt(life.getHp() > 2147483647 ? 2147483647 : (int) life.getHp());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);
        if (false) {
            packet.writeInt(0);
            packet.writeMapleAsciiString("");
            packet.writeMapleAsciiString("");
        }
        packet.writeInt(-1);
        packet.writeInt(0);
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(life.getScale());
        packet.writeInt(life.isEliteMonster() ? 1 : -1);
        if (life.isEliteMonster()) {
            packet.writeInt(1);
            packet.writeInt(life.getEliteType());
            packet.writeInt(life.getEliteType());
            packet.writeInt(1);
        }
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] spawnEliteMonster(MapleMonster life, int spawnType, boolean controll, boolean aggro, boolean eliteboss) {
        WritingPacket packet = new WritingPacket();
        if (!controll) {
            packet.writeShort(SendPacketOpcode.SPAWN_MONSTER.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        }
        packet.write(0);
        packet.writeInt(life.getObjectId());
        packet.write(1);
        packet.writeInt(life.getId());
        addMobSkillInfo(packet, life);
        packet.writeShort(life.getPosition().x);
        packet.writeShort(life.getPosition().y);
        packet.write(life.getStance());
        if ((life.getId() == 8910000) || (life.getId() == 8910100)) {
            packet.write(0);
        }
        packet.writeShort(0);
        packet.writeShort(life.getFh());
        int v24 = spawnType;
        packet.write(v24);
        if (v24 == -3 || v24 >= 0) {
            packet.writeInt(0);
        }
        packet.write(0xFF); //Monster Carnival.
        packet.writeInt(life.getHp() > 2147483647 ? 2147483647 : (int) life.getHp());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);
        if (eliteboss) {
            packet.writeInt(0);
            packet.write(0);
            packet.writeInt(2);
            packet.writeInt(3);
            packet.writeInt(life.getEliteType());
            packet.writeInt(0xD3);
            packet.writeInt(0x85);
            packet.writeInt(0x02);
        } else {
            packet.writeInt(0x3D);
            packet.write(0);
            packet.writeInt(0);
            packet.writeInt(1);
            packet.writeInt(life.getEliteType());
            packet.writeInt(1);
        }
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] controlMonster(MapleMonster life, boolean newSpawn, boolean aggro, boolean isAswan, int EliteType1, int EliteType2) {
        WritingPacket packet = new WritingPacket();
        if (isAswan) {
            packet.writeShort(SendPacketOpcode.ASWAN_SPAWN_MONSTER_CONTROL.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        }
        packet.write(aggro ? 2 : 1);
        if (isAswan) {
            packet.write(1);
        }
        packet.writeInt(life.getObjectId());
        packet.write(1);
        packet.writeInt(life.getId());
        addMobSkillInfo(packet, life);
        packet.writeShort(life.getPosition().x);
        packet.writeShort(life.getPosition().y);
        packet.write(life.getStance());
        if ((life.getId() == 8910000) || (life.getId() == 8910100)) {
            packet.write(0);
        }
        packet.writeShort(0);
        packet.writeShort(life.getFh());
        byte AppearType = (byte) (newSpawn ? 0xFE : life.isFake() ? -4 : 0xFF);
        packet.write(AppearType);
        if (AppearType == -3 || AppearType >= 0) {
            packet.writeInt(0);
        }
        packet.write(0xFF); //Monster Carnival.
        packet.writeInt(life.getHp() > 2147483647 ? 2147483647 : (int) life.getHp());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);
        if (false) {
            packet.writeInt(0);
            packet.writeMapleAsciiString("");
            packet.writeMapleAsciiString("");
        }
        packet.writeInt(-1);
        packet.writeInt(0);
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(life.getScale());
        packet.writeInt(EliteType1);
        if (EliteType1 != -1) {
            packet.writeInt(1);
            packet.writeInt(EliteType2);
            packet.writeInt(EliteType2);
            packet.writeInt(1);
        }
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] controlMonster(MapleMonster life, boolean newSpawn, boolean aggro, boolean isAswan) {
        WritingPacket packet = new WritingPacket();
        if (isAswan) {
            packet.writeShort(SendPacketOpcode.ASWAN_SPAWN_MONSTER_CONTROL.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        }
        packet.write(aggro ? 2 : 1);
        if (isAswan) {
            packet.write(1);
        }
        packet.writeInt(life.getObjectId());
        packet.write(1);
        packet.writeInt(life.getId());
        addMobSkillInfo(packet, life);
        packet.writeShort(life.getPosition().x);
        packet.writeShort(life.getPosition().y);
        packet.write(life.getStance());
        if ((life.getId() == 8910000) || (life.getId() == 8910100)) {
            packet.write(0);
        }
        packet.writeShort(0);
        packet.writeShort(life.getFh());
        byte AppearType = (byte) (newSpawn ? 0xFE : life.isFake() ? -4 : 0xFF);
        packet.write(AppearType);
        if (AppearType == -3 || AppearType >= 0) {
            packet.writeInt(0);
        }
        packet.write(0xFF); //Monster Carnival.
        packet.writeInt(life.getHp() > 2147483647 ? 2147483647 : (int) life.getHp());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);
        if (false) {
            packet.writeInt(0);
            packet.writeMapleAsciiString("");
            packet.writeMapleAsciiString("");
        }
        packet.writeInt(-1);
        packet.writeInt(0);
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(life.getScale());
        packet.writeInt(life.isEliteMonster() ? 1 : -1);
        if (life.isEliteMonster()) {
            packet.writeInt(1);
            packet.writeInt(life.getEliteType());
            packet.writeInt(life.getEliteType());
            packet.writeInt(1);
        }
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] stopControllingMonster(int oid, boolean isAswan) {
        WritingPacket packet = new WritingPacket();

        if (isAswan) {
            packet.writeShort(SendPacketOpcode.ASWAN_SPAWN_MONSTER_CONTROL.getValue());
            packet.write(0);
        } else {
            packet.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        }
        packet.write(0);
        packet.writeInt(oid);

        return packet.getPacket();
    }

    public static byte[] makeMonsterInvisible(MapleMonster life, boolean isAswan) {
        WritingPacket packet = new WritingPacket();

        if (isAswan) {
            packet.writeShort(SendPacketOpcode.ASWAN_SPAWN_MONSTER_CONTROL.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.SPAWN_MONSTER_CONTROL.getValue());
        }
        packet.write(0);
        packet.writeInt(life.getObjectId());

        return packet.getPacket();
    }

    public static byte[] moveMonsterResponse(int objectid, short moveid, int currentMp, boolean useSkills, int skillId, int skillLevel) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MOVE_MONSTER_RESPONSE.getValue());
        packet.writeInt(objectid);
        packet.writeShort(moveid);
        packet.write(useSkills ? 1 : 0);
        packet.writeShort(currentMp);
        packet.writeShort(0);
        packet.write(skillId);
        packet.write(skillLevel);
        packet.writeInt(0);
        packet.write0(7); //1.2.250+

        return packet.getPacket();
    }

    public static byte[] writeMonsterIntMask(Map<MonsterStatus, Integer> stats) {
        BigInteger bi = BigInteger.valueOf(0);

        for (MonsterStatus stat : stats.keySet()) {
            bi = bi.or(stat.getBigValue());
        }

        return PacketProvider.convertFromBigInteger(bi, MonsterStatus.BIT_COUNT);
    }

    private static void writeMonsterLongMask(WritingPacket packet, Map<TestMonsterStatus, Integer> stats) {
        long mask = 0;
        for (TestMonsterStatus stat : stats.keySet()) {
            if (stat.getIndex() == 1) {
                mask |= stat.getValue();
            }
        }
        packet.writeLong(mask);
        packet.writeInt(0);
    }

    public static byte[] applyMonsterStatus(final int oid, final TestMonsterStatusEffect mse) {
        if (mse.getStati().containsKey(MonsterStatus.POISON)) {
            return applyPoison(oid, mse.getOwnerId(), mse.getSkill().getId(), mse.getPoisonSchedule(), 20);
        }
        int triangle = 0;
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        writeMonsterLongMask(packet, mse.getStati());
        for (Map.Entry<TestMonsterStatus, Integer> stat : mse.getStati().entrySet()) {
            if (stat.getKey().equals(TestMonsterStatus.TRIANGLE_FOMATION)) {
                triangle = stat.getValue();
            }
            packet.writeInt(stat.getValue());
            if (mse.isMonsterSkill()) {
                packet.writeShort(mse.getMobSkill().getSkillId());
                packet.writeShort(mse.getMobSkill().getSkillLevel());
            } else {
                packet.writeInt(mse.getSkill().getId());
            }
            if (mse.getStati().containsKey(TestMonsterStatus.NEUTRALISE)) {
                packet.writeInt(10);
                packet.write(1);
                return packet.getPacket();
            }
            packet.writeInt(0);
            packet.writeShort(5); //v177
        }
        if (!mse.isMonsterSkill()) {
            if (mse.getSkill().getId() == 36110005) {
                packet.writeInt(36110005);
            } else if (mse.getSkill().getId() == 25111206) {
                packet.writeInt(25111206);
                packet.write(-1);
            }
        }
        packet.writeShort(mse.getStati().isEmpty() ? 1 : 0);
        packet.write(mse.getStati().size()); // size
        packet.write(2);
        packet.write(1 + triangle);
        return packet.getPacket();
    }

    public static byte[] applyMonsterStatus(final int oid, final TestMonsterStatusEffect mse, final List<Integer> reflection) {

        WritingPacket packet = new WritingPacket();
        if (mse.getStati().containsKey(MonsterStatus.POISON)) {
            return applyPoison(oid, mse.getOwnerId(), mse.getSkill().getId(), mse.getPoisonSchedule(), 20);
        }
        packet.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        writeMonsterLongMask(packet, mse.getStati());
        for (Map.Entry<TestMonsterStatus, Integer> stat : mse.getStati().entrySet()) {
            packet.writeInt(stat.getValue());
            if (mse.isMonsterSkill()) {
                packet.writeShort(mse.getMobSkill().getSkillId());
                packet.writeShort(mse.getMobSkill().getSkillLevel());
            } else {
                packet.writeInt(mse.getSkill().getId());
            }
            packet.writeShort(0); // might actually be the buffTime but it's not displayed anywhere
        }
        for (Integer ref : reflection) {
            packet.writeInt(ref);
        }
        packet.writeLong(0);
        packet.writeShort(0);
        int size = mse.getStati().size(); // size
        if (reflection.size() > 0) {
            size /= 2; // This gives 2 buffs per reflection but it's really one buff
        }
        packet.write(size); // size
        packet.write(1);
        return packet.getPacket();
    }

    public static byte[] applyPoison(int oid, int cid, int skillid, int damage, int skilllevel) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        packet.writeInt(0);
        packet.writeLong(TestMonsterStatus.POISON.getValue());

        packet.write(1);
        packet.writeInt(cid);
        packet.writeInt(skillid);
        packet.writeInt(damage);
        packet.writeInt(1000);
        packet.write(HexTool.getByteArrayFromHexString("B9 26 A8 3E"));
        packet.writeInt(9000);

        packet.writeLong(skilllevel);
        packet.writeInt(0);
        packet.writeShort(0);
        packet.write(3);

        return packet.getPacket();
    }

    public static byte[] cancelMonsterStatus(int cid, int oid, TestMonsterStatus statup, TestMonsterStatusEffect mse) {
        if (statup == TestMonsterStatus.POISON) {
            return cancelPoison(oid, cid);
        }
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        writeMonsterLongMask(packet, mse.getStati());
        packet.write(3);
        packet.write(2);
        return packet.getPacket();
    }

    public static byte[] cancelMonsterStatus(int oid, Map<TestMonsterStatus, Integer> stats) {
        WritingPacket packet = new WritingPacket();
        if (stats.containsKey(TestMonsterStatus.POISON)) {
            return cancelPoison(oid, 0);
        }
        packet.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        writeMonsterLongMask(packet, stats);
        packet.write(3);
        packet.write(2);

        return packet.getPacket();
    }

    public static byte[] cancelMonsterStatus(int cid, int oid, MonsterStatus statup, TestMonsterStatusEffect mse) {
        if (statup == MonsterStatus.POISON) {
            return cancelPoison(oid, cid);
        }
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        writeMonsterLongMask(packet, mse.getStati());
        packet.write(3);
        packet.write(2);
        return packet.getPacket();
    }

    public static byte[] applyMonsterStatus(final MapleCharacter chr, final int oid, final MonsterStatusEffect mse) {
        return applyMonsterStatus(chr, oid, mse, null);
    }

    public static byte[] applySwooLaser(final int oid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        packet.write(writeMonsterIntMask(Collections.singletonMap(MonsterStatus.Laser, 1)));
        packet.writeInt(1);
        packet.writeShort(223); // mobskillid
        packet.writeShort(5); // mobskilllv
        packet.writeShort(24033); //position?
        packet.writeShort(23589); //position?
        packet.writeInt(1);
        packet.writeInt(233);
        packet.writeShort(0);
        packet.write(1);
        return packet.getPacket();
    }

    public static byte[] applyMonsterStatus(final MapleCharacter chr, final int oid, final MonsterStatusEffect mse, final List<Integer> reflection) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.APPLY_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        byte[] by = writeMonsterIntMask(mse.getStati());
        packet.write(by);
        int mask1 = GameConstants.bint(by, 0);
        int mask2 = GameConstants.bint(by, 4);
        int mask3 = GameConstants.bint(by, 8);
        for (int i = 31; i >= 0; i--) {
            if (((mask1 >>> i) & 1) == 1) {
                Entry<MonsterStatus, Integer> stat = mse.getStati(i, 0);
                if (stat != null) {
                    if (stat != null) {
                        int value = stat.getValue();
                        if ((mask1 & 0x2000000) == 0x2000000) {
                            packet.writeInt(0xF1FFFFFF);
                        } else {
                            packet.writeInt(value == 0 ? 1 : value);
                        }
                        packet.writeInt(mse.getSkillId());
                        packet.writeShort((mask1 & 0x2000000) == 0x2000000 ? 0x1E : 0);
                        if (mse.getSkillId() == 2321001) {
                            packet.writeInt(chr.getStat().getBigBangStack());
                        }
                        if ((mask1 & 0x2000000) == 0x2000000) {
                            packet.writeInt(chr.getStat().getFreezeStack());
                        }
                    }
                }
            }
        }
        for (int i = 31; i >= 0; i--) {
            if (((mask2 >>> i) & 1) == 1) {
                Entry<MonsterStatus, Integer> stat = mse.getStati(i, 4);
                if (stat != null) {
                    int value = stat.getValue();
                    packet.writeInt(value == 0 ? 1 : value);
                    packet.writeInt(mse.getSkillId());
                    packet.writeShort(0);
                }
            }
        }
        for (int i = 31; i >= 21; i--) {
            if (((mask3 >>> i) & 1) == 1) {
                Entry<MonsterStatus, Integer> stat = mse.getStati(i, 8);
                if (stat != null) {
                    int value = stat.getValue();
                    packet.writeInt(value == 0 ? 1 : value);
                    packet.writeInt(mse.getSkillId());
                    packet.writeShort(0);
                }
            }
        }
        if (((mask1 >>> 30) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 28) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 6) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 5) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 6) & 1) == 1 || ((mask1 >>> 5) & 1) == 1) {
            packet.writeInt(0);
            packet.write(0);
            packet.writeInt(0);
        }
        if (((mask2 >>> 26) & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask3 >>> 22) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask3 >>> 17) & 1) == 1) {
            packet.write(1);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask2 >>> 24) & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask2 >>> 21) & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask1 >>> 25) & 1) == 1) {
            packet.write(0);
        }
        if (((mask2 >>> 12) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask2 >>> 9) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask2 >>> 7) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask2 >>> 1) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask1 >>> 23) & 1) == 1) {
            packet.writeInt(0);
        }
        if (((mask3 >>> 20) & 1) == 1) {
            packet.write(1);
            packet.writeInt(mse.getOwnerId());
            packet.writeInt(mse.getSkill().getId());
            packet.writeInt(mse.getStati().get(MonsterStatus.Burned));
            packet.writeInt(mse.getSkill().getEffect(mse.getSkillLevel()).getDotInterval()); //dot Interval
            packet.writeInt(mse.getV(1));
            packet.writeInt(mse.getV(2));
            packet.writeInt(mse.getSkill().getEffect(mse.getSkillLevel()).getDotTime()); // dotTime
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask3 >>> 19) & 1) == 1) {
            packet.write(0);
            packet.write(0);
        }
        if (((mask3 >>> 18) & 1) == 1) {
            packet.write(0);
        }
        if (((mask2 >>> 28) & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (((mask3 >>> 16) & 1) == 1) {
            packet.writeMapleAsciiString("");
        }
        if ((mask3 & 0x8000) == 0x8000) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x4000) == 0x4000) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeShort(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x2000) == 0x2000) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeShort(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x1000) == 0x1000) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x800) == 0x800) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask3 & 0x20000000) == 0x20000000) {
            packet.writeInt(0);
        }
        if ((mask3 & 0x400) == 0x400) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask2 & 1) == 1) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if ((mask2 & 0x80000000) == 0x80000000) {
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.writeShort(0);
        packet.write(0);
        packet.writeLong(0);
        return packet.getPacket();
    }

    public static byte[] cancelPoison(int oid, int cid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        packet.writeInt(oid);

        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(TestMonsterStatus.POISON.getValue());

        packet.writeInt(0);
        packet.writeInt(1);
        packet.writeInt(cid);
        packet.write(HexTool.getByteArrayFromHexString("B9 26 A8 3E"));
        packet.write(4);

        return packet.getPacket();
    }

    public static byte[] cancelMonsterStatus(int cid, int oid, final MonsterStatusEffect mse, Map<MonsterStatus, Integer> stats) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_MONSTER_STATUS.getValue());
        packet.writeInt(oid);
        byte[] by = writeMonsterIntMask(stats);
        packet.write(by);
        int mask[] = {GameConstants.bint(by, 0), GameConstants.bint(by, 4), GameConstants.bint(by, 8)};
        if ((mask[2] & 0x100000) == 0x100000) {
            packet.writeInt(0);
            packet.writeInt(1);
            packet.writeInt(cid);
            packet.writeInt(mse == null ? -1 : mse.getV(1));
        }
        packet.write(3);
        packet.write(2);
        return packet.getPacket();
    }

    public static byte[] swallowMonster(final int oid, final int cid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.KILL_MONSTER.getValue());
        packet.writeInt(oid);
        packet.write(4);
        packet.writeInt(cid);

        return packet.getPacket();
    }

    public static byte[] removeObtacleAtomBomb(int objectid) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(405);
        mplew.writeInt(objectid);
        return mplew.getPacket();
    }

    public static byte[] spawnObtacleAtomBomb(List<ObtacleAtom> bombs) {
        WritingPacket mplew = new WritingPacket();
        mplew.writeShort(404);
        mplew.writeInt(bombs.size());
        byte unk = 0;
        mplew.write(unk);
        if (unk == 1) {
            mplew.writeInt(300);
            mplew.write(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
            mplew.writeInt(0);
        }
        for (ObtacleAtom bomb : bombs) {
            mplew.write(1);
            mplew.writeInt(bomb.type);
            mplew.writeInt(Randomizer.nextInt());
            mplew.writeInt(bomb.sx);
            mplew.writeInt(bomb.sy);
            mplew.writeInt(bomb.ex);
            mplew.writeInt(bomb.ey);
            mplew.writeInt(bomb.range);
            mplew.writeInt(bomb.pdam);
            mplew.writeInt(bomb.mdam);
            mplew.writeInt(bomb.delay);
            mplew.writeInt(bomb.high);
            mplew.writeInt(bomb.speed);
            mplew.writeInt(0x41200000);
            mplew.writeInt(bomb.len);
            mplew.writeInt(bomb.float_);
        }
        return mplew.getPacket();
    }
}
