/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package handler.channel;

import client.MapleClient;
import client.MapleCharacter;
import client.test.TestMobSkill;
import client.test.TestMobSkillFactory;
import packet.creators.MainPacketCreator;
import packet.creators.MobPacket;
import packet.transfer.read.ReadingMaple;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.life.MobSkillFactory;
import server.maps.MapleMap;
import server.movement.LifeMovementFragment;
import tools.Pair;
import tools.RandomStream.Randomizer;
import tools.Timer.ShowTimer;

import java.awt.Point;
import java.util.ArrayList;
import java.util.List;

import packet.transfer.read.ReadingMaple;

public class MobHandler {

    public static final void MoveMonster(final ReadingMaple rh, final MapleClient c, final MapleCharacter chr) {
        int oid = rh.readInt();
        final MapleMonster monster = chr.getMap().getMonsterByOid(oid);

        if (monster == null) { // movin something which is not a monster
            return;
        }
        if (chr.getMapId() == 120000102) {
            return;
        }
        rh.skip(1);  // 아스완 아니면 디멘션
        final short moveid = rh.readShort(); // m_nMobCtrlSN
        final byte useSkill = rh.readByte(); // bMovingAttack | 4 * (bRushMove | 2 * (bRiseByToss | 2 * (m_nMobCtrlState < 0)))
        final boolean bCheatResult = (useSkill & 0xF) != 0;
        final boolean v56 = (useSkill & 0xF0) != 0;
        final int skill = rh.readByte() & 0xFF;
        final byte skill1 = rh.readByte(); // unsigned?
        final byte skill2 = rh.readByte();
        final byte skill3 = rh.readByte();
        final byte skill4 = rh.readByte();
        int realskill = 0;
        int level = 0;

        if ((useSkill & 1) != 0) {
            final byte size = monster.getNoSkills();
            boolean used = false;

            if (size > 0) {

                final Pair<Integer, Integer> skillToUse = monster.getSkills().get(Randomizer.nextInt(size));
                realskill = skillToUse.getLeft();
                level = skillToUse.getRight();
                // Skill ID and Level
                final TestMobSkill mobSkill = TestMobSkillFactory.getMobSkill(realskill, level);
                if (!mobSkill.checkCurrentBuff(chr, monster)) {
                    final long now = System.currentTimeMillis();
                    final long ls = monster.getLastSkillUsed(realskill);

                    if (ls == 0 || ((now - ls) > mobSkill.getCoolTime())) {
                        monster.setLastSkillUsed(realskill, now, mobSkill.getCoolTime());

                        final int reqHp = (int) (((float) monster.getHp() / monster.getMobMaxHp()) * 100); // In case this monster have 2.1b and above HP
                        if (reqHp <= mobSkill.getHP()) {
                            used = true;
                            if (mobSkill.getCoolTime() == 0) {
                                mobSkill.applyEffect(chr, monster, true);
                            } else {
                                ShowTimer.getInstance().schedule(new Runnable() {
                                    @Override
                                    public void run() {
                                        if (monster != null) {
                                            mobSkill.applyEffect(c.getPlayer(), monster, true);
                                        }
                                    }
                                }, 1000L); // TODO delay
                            }
                        }
                    }
                }
            }
            if (used) {
                c.getPlayer().dropMessage(6, "SKILL : " + realskill + "LVLEL : " + level + "");
            }
            if (!used) {
                realskill = 0;
                level = 0;
            }
        }

        if (monster.getController() != null && monster.getController().getId() != c.getPlayer().getId()) {
            if (!v56) { // 동시에 컨트롤 방지.. 안그럼 문워크함 ㅠㅠ
                c.sendPacket(MobPacket.stopControllingMonster(oid, false));
                return;
            } else {
                monster.switchController(chr, true);
            }
        }

        int count = rh.readByte();
        final List<Pair<Short, Short>> multiTargetForBall = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            // multiTargetForBall
            multiTargetForBall.add(new Pair<>(rh.readShort(), rh.readShort()));
        }

        count = rh.readByte();
        final List<Short> randTimeForAreaAttack = new ArrayList<>();
        for (int i = 0; i < count; i++) {
            // randTimeForAreaAttack
            randTimeForAreaAttack.add(rh.readShort());
        }

        rh.readByte(); // (m_bActive == 0) | 16 * !(IsCheatMobMoveRand() == 0)

        rh.readInt(); // getHackedCode();
        rh.readInt(); // m_moveCtx.fc.ptTarget.x
        rh.readInt(); // m_moveCtx.fc.ptTarget.y
        rh.readInt(); // m_dwHackedCodeCRC
        rh.readByte(); // unknown

        int tEncodedGatherDuration = rh.readInt(); // m_tEncodedGatherDuration
        final Point startPos = new Point(
                rh.readShort(), // m_x
                rh.readShort() // m_y
        );
        final Point velPos = new Point(
                rh.readShort(), // m_vx
                rh.readShort() // m_vy
        );
        //final Point startPos = monster.getPosition();
        final List<LifeMovementFragment> res = MovementParse.parseMovement(rh);

        count = rh.readByte();

        for (int i = 0; i < count; i += 2) {
            rh.readByte();
        }

        rh.readByte();
        rh.readInt();
        rh.readInt();
        rh.readInt();
        rh.readInt();
        rh.readByte();
        rh.readInt();
        rh.readByte();
        rh.readByte();
        rh.readByte();

        if (monster != null && c != null) {
            c.getSession().writeAndFlush(MobPacket.moveMonsterResponse(oid, moveid, monster.getMp(), monster.isControllerHasAggro(), realskill, level));
        }
        if (res != null && res.size() > 0) {
            final MapleMap map = c.getPlayer().getMap();

            MovementParse.updatePosition(res, monster, -1);
            map.moveMonster(monster, monster.getPosition());
            map.broadcastMessage(chr, MobPacket.moveMonster(useSkill, skill, skill1, skill2, skill3, skill4, oid, tEncodedGatherDuration, startPos, velPos, res, multiTargetForBall, randTimeForAreaAttack), monster.getPosition());
        }
    }

    public static final void FriendlyDamage(final ReadingMaple rh, final MapleCharacter chr) {
        final MapleMap map = chr.getMap();
        final MapleMonster mobfrom = map.getMonsterByOid(rh.readInt());
        rh.skip(4); // Player ID
        final MapleMonster mobto = map.getMonsterByOid(rh.readInt());

        if (mobfrom != null && mobto != null && mobto.getStats().isFriendly()) {
            final int damage = (mobto.getStats().getLevel() * Randomizer.nextInt(99)) / 2; // Temp for now until I figure out something more effective
            mobto.damage(chr, damage, true, 0);
        }
    }

    public static final void MonsterBomb(final int oid, final MapleCharacter chr) {
        final MapleMonster monster = chr.getMap().getMonsterByOid(oid);

        if (monster == null || !chr.isAlive() || chr.isHidden()) {
            return;
        }
        final byte selfd = monster.getStats().getSelfD();
        if (selfd != -1) {
            chr.getMap().killMonster(monster, chr, false, false, selfd);
        }
    }

    public static final void AutoAggro(final int monsteroid, final MapleCharacter chr) {
        final MapleMonster monster = chr.getMap().getMonsterByOid(monsteroid);

        if (monster != null && chr.getPosition().distance(monster.getPosition()) < 200000) {
            if (monster.getController() != null) {
                if (chr.getMap().getCharacterById_InMap(monster.getController().getId()) == null) {
                    monster.switchController(chr, true);
                } else {
                    monster.switchController(monster.getController(), true);
                }
            } else {
                monster.switchController(chr, true);
            }
        }
    }

    public static final void HypnotizeDmg(final ReadingMaple slea, final MapleCharacter chr) {
        final MapleMonster mob_from = chr.getMap().getMonsterByOid(slea.readInt()); // From
        slea.skip(4); // Player ID
        final int to = slea.readInt(); // mobto
        slea.skip(1); // Same as player damage, -1 = bump, integer = skill ID
        final int damage = slea.readInt();

        final MapleMonster mob_to = chr.getMap().getMonsterByOid(to);

        if (mob_from != null && mob_to != null) {
            if (damage > 30000) {
                return;
            }
            mob_to.damage(chr, damage, true, 0);
            // TODO : Get the real broadcast damage packet
            chr.getMap().broadcastMessage(chr, MobPacket.damageMonster(to, damage), false);
        }
    }
}
