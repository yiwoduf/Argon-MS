package handler.skill;

import client.MapleCharacter;
import client.items.IItem;
import client.items.MapleInventoryType;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import client.stats.BuffStats;
import client.stats.MonsterStatus;
import client.stats.MonsterStatusEffect;
import constants.GameConstants;
import handler.channel.AttackInfo;

import java.awt.Point;

import java.util.*;

import server.life.Element;
import server.life.MapleMonster;
import server.maps.MapleMist;
import server.maps.MapleSummon;
import tools.Pair;
import tools.RandomStream.Randomizer;

import packet.creators.MainPacketCreator;
import packet.creators.MobPacket;
import packet.creators.UIPacket;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleWreckage;
import tools.AttackPair;

public class SkillSubHandler {

    public static class AdventureSkillHandler {

        public static void HeroAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            if (GameConstants.isHero(player.getJob())) {
                SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(player.getSkillLevel(attack.skill));
                switch (attack.skill) {
                    case 1101012:
                    case 1100012:
                    case 1111008:
                        if (attack.skill == 1100012) {
                            player.send(MainPacketCreator.showSkillEffect(-1, player.getLevel(), attack.skill, attack.skillLevel, monster.getObjectId(), 1, monster.getPosition(), null, !(attack.animation >= 0)));
                            player.getMap().broadcastMessage(player, MainPacketCreator.showSkillEffect(player.getId(), player.getLevel(), attack.skill, attack.skillLevel, monster.getObjectId(), 1, monster.getPosition(), null, !(attack.animation >= 0)), false);
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(1101012), player.getSkillLevel(1101012), null, false), effect.getStatusDuration());
                        break;
                    case 1111003:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.WATK, -30), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 80000);
                        if (Randomizer.isSuccess(effect.getProb())) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.DARKNESS, -10), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 80000);
                        }
                        break;
                    case 1121015:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void PaladinAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, long totDamageToOneMonster) {
            if (GameConstants.isPaladin(player.getJob())) {
                SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(player.getSkillLevel(attack.skill));
                switch (attack.skill) {
                    case 1201011:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 1201012:
                        if (monster.getBuff(MonsterStatus.POISON) != null) {
                            if (monster.getBuff(MonsterStatus.POISON).getOwnerId() == player.getId()) {
                                monster.cancelStatus(MonsterStatus.POISON);
                                totDamageToOneMonster += (long) totDamageToOneMonster * 115.0D / 100.0D;
                            }
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, -20), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 1201013:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 1211008:
                        if (monster.getBuff(MonsterStatus.SPEED) != null) {
                            if (monster.getBuff(MonsterStatus.SPEED).getOwnerId() == player.getId()) {
                                monster.cancelStatus(MonsterStatus.SPEED);
                                totDamageToOneMonster += (long) (totDamageToOneMonster * 115.0D / 100.0D);
                            }
                        }
                        if (Randomizer.isSuccess(effect.getProb())) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        } else {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        }
                        break;
                    case 1221004: {
                        if (monster.getBuff(MonsterStatus.STUN) != null) {
                            if (monster.getBuff(MonsterStatus.STUN).getOwnerId() == player.getId()) {
                                monster.cancelStatus(MonsterStatus.STUN);
                                totDamageToOneMonster += (long) (totDamageToOneMonster * 115.0D / 100.0D);
                            }
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SEAL, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    }
                    case 1221009: {
                        if (player.GetCount() == 5) {
                            if (player.getBuffedValue(BuffStats.CTS_IgnoreMobpdpR, 1221009) == null) {
                                player.elementalChargeHandler(0);
                                effect.applyTo(player);
                            }
                        }
                        break;
                    }
                    case 1221052: {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    }
                }
            }
        }

        public static void DarkNightAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isDarkNight(player.getJob())) {
                switch (attack.skill) {
                    case 1301012:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void FireMagicAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isFireMagic(player.getJob())) {
                switch (attack.skill) {
                    case 2101005:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(2101005), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 2111007:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(2111007), attack.skillLevel, null, false), effect.getStatusDuration());
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(2111007), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 2121006:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(2121006), attack.skillLevel, null, false), effect.getStatusDuration());
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, 1), SkillFactory.getSkill(2121006), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 2121052:
                    case 2121055:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(2121055), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void IceMagicAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            int count = player.getStat().getFreezeStack();
            if (GameConstants.isIceMagic(player.getJob())) {
                switch (attack.skill) {
                    case 2201008:
                    case 2201009:
                    case 2211002:
                    case 2211010:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, count), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 2100000000);
                        if (count != 5) {
                            player.getStat().addFreezeStack(1);
                        } else {
                            player.getStat().setFreezeStack(0);
                        }
                        break;
                    case 2111007:
                    case 2221006:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void BiShopAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isBiShop(player.getJob())) {
                if (monster.getBuff(MonsterStatus.AddDamSkill) != null) {
                    if (SkillFactory.getSkill(attack.skill).getElement().equals(Element.HOLY)) {
                        monster.cancelStatus(MonsterStatus.AddDamSkill);
                    }
                }

                switch (attack.skill) {
                    case 2311004:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 2321001: {
                        if (player.getStat().getBigBangStack() < 5) {
                            player.getStat().addBigBangStack(1);
                        } else {
                            player.getStat().setBigBangStack(1);
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.WDEF, player.getStat().getBigBangStack()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    }
                }
            }
        }

        public static void BowMasterAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, long totDamageToOneMonster) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isBowMaster(player.getJob())) {
                if (player.getSkillLevel(3110001) > 0 && totDamageToOneMonster > 0) {
                    if (player.getMortalBlowCount() < 10) {
                        player.addMortalBlowCount(1);
                        SkillFactory.getSkill(3110001).getEffect(player.getSkillLevel(3110001)).applyTo(player);
                        player.Message("MortalBlowCount : " + player.getMortalBlowCount() + "");
                    } else {
                        totDamageToOneMonster += (long) (totDamageToOneMonster / SkillFactory.getSkill(3110001).getEffect(player.getSkillLevel(3110001)).getY());
                        player.cancelEffectFromBuffStat(BuffStats.CTS_BowMasterMortalBlow, 3110001);
                        player.getClient().getSession().writeAndFlush(MainPacketCreator.CancelMotralBlow());
                        player.setMortalBlowCount(0);
                        player.getClient().getSession().writeAndFlush(UIPacket.showWZEffect("Skill/311.img/skill/3110001/special/1", 1));
                    }
                }

                if (player.getSkillLevel(3110012) > 0 && totDamageToOneMonster > 0) {
                    int count = player.acaneAim;
                    if (attack.skill > 0) {
                        if (player.acaneAim < 20) {
                            player.acaneAim++;
                        }
                        SkillFactory.getSkill(3110012).getEffect(player.getSkillLevel(3110012)).applyTo(player);
                    }
                    if (player.getLastCombo() + 90000 < System.currentTimeMillis()) {
                        player.acaneAim = 0;
                    }
                }

                switch (attack.skill) {
                    case 3101005:
                        if (Randomizer.isSuccess(effect.getProb())) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        }
                        break;
                    case 3111003:
                        player.getMap().spawnMist(new MapleMist(SkillFactory.getSkill(3111003).getEffect(3111003).calculateBoundingBox(monster.getPosition(), player.isFacingLeft()), player, effect, player.getSkillLevel(3111003), monster.getPosition()), 6000, true, false, false, false, false, false, false);
                        break;
                    case 3111010:
                        player.send(MainPacketCreator.showSkillEffect(-1, player.getLevel(), attack.skill, attack.skillLevel, monster.getObjectId(), 1, monster.getPosition(), null, !(attack.animation >= 0)));
                        player.getMap().broadcastMessage(player, MainPacketCreator.showSkillEffect(player.getId(), player.getLevel(), attack.skill, attack.skillLevel, monster.getObjectId(), 1, monster.getPosition(), null, !(attack.animation >= 0)), false);
                        break;
                    case 3121014:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, -10), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 3121052:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void ChironAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isChiron(player.getJob())) {
                switch (attack.skill) {
                    case 3201008:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 3211010:
                        player.send(MainPacketCreator.showSkillEffect(-1, player.getLevel(), attack.skill, attack.skillLevel, monster.getObjectId(), 1, monster.getPosition(), null, !(attack.animation >= 0)));
                        player.getMap().broadcastMessage(player, MainPacketCreator.showSkillEffect(player.getId(), player.getLevel(), attack.skill, attack.skillLevel, monster.getObjectId(), 1, monster.getPosition(), null, !(attack.animation >= 0)), false);
                        break;
                }
            }
        }

        public static void NightRoadAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isNightRoad(player.getJob())) {
                IItem nk = player.getInventory(MapleInventoryType.USE).getItem(attack.slot);
                if (!monster.getStats().isBoss() && attack.skill != 4120019 && attack.skill != 4100012 && attack.skill != 0
                        && player.getBuffedValue(BuffStats.CTS_NightLordMark) != null) {
                    if (nk == null) {
                        return;
                    }
                    int skillid = player.getSkillLevel(4120018) > 0 ? 4120018 : 4100011;
                    if (player.getSkillLevel(skillid + 1) <= 0) {
                        player.changeSkillLevel(skillid + 1, (byte) player.getSkillLevel(skillid), (byte) player.getSkillLevel(skillid));
                    }
                    SkillStatEffect eff = SkillFactory.getSkill(skillid).getEffect(player.getSkillLevel(skillid));
                    if (monster.getBuff(MonsterStatus.MARK_OF) != null) {
                        int bulletCount = eff.getBulletCount();
                        final List<MapleMapObject> objs = player.getMap().getMapObjectsInRange(player.getTruePosition(), 200000, Arrays.asList(MapleMapObjectType.MONSTER));
                        final List<MapleMonster> monsters = new ArrayList<>();
                        for (MapleMapObject o : objs) {
                            if (monsters.size() < bulletCount && !monster.equals((MapleMonster) o)) {
                                monsters.add((MapleMonster) o);
                            } else {
                                break;
                            }
                        }
                        if (monsters.size() > 0) {
                            player.getMap().broadcastMessage(MainPacketCreator.absorbingMarkOfTheif(player.getId(), monster.getObjectId(), skillid + 1, monsters, monster.getPosition(), nk.getItemId()));
                            monster.cancelStatus(MonsterStatus.MARK_OF);
                        }
                    } else {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.MARK_OF, 1), SkillFactory.getSkill(4120018), player.getSkillLevel(4120018), null, false), 5000);
                    }
                }
            }

            if (player.getSkillLevel(4110011) > 0 && player.getSkillLevel(4120011) < 1) {
                SkillStatEffect effects = SkillFactory.getSkill(4110011).getEffect(player.getSkillLevel(4110011));
                if (Randomizer.isSuccess(effects.getProb())) {
                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.VENOM, effects.getDotInterval()), SkillFactory.getSkill(4110011), player.getSkillLevel(4110011), null, false), 3000);
                }
            } else if (player.getSkillLevel(4120011) > 0) {
                SkillStatEffect effects = SkillFactory.getSkill(4120011).getEffect(player.getSkillLevel(4120011));
                if (Randomizer.isSuccess(effects.getProb())) {
                    if (player.STACK < 3) {
                        player.STACK++;
                    }
                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.VENOM, effect.getDotInterval()), SkillFactory.getSkill(4120011), player.getSkillLevel(4120011), null, false), 8000);
                }
            }

            if (player.getBuffedValue(BuffStats.CTS_BleedingToxin) != null) {
                monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 8 * 1000);
            }

            switch (attack.skill) {
                case 4111003:
                    if (Randomizer.isSuccess(effect.getProb())) {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SHADOW_WEB, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 8000);
                    }
                    break;
                case 4121017:
                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SHOWDOWN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 120 * 1000);
                    break;
                case 4121016:
                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 10 * 1000);
                    break;
            }
        }

        public static void ShadorAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, long totDamageToOneMonster) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isShador(player.getJob())) {
                if (player.getSkillLevel(4210011) > 0 && player.getSkillLevel(4210011) < 1) {
                    SkillStatEffect effects = SkillFactory.getSkill(4210011).getEffect(player.getSkillLevel(4210011));
                    if (Randomizer.isSuccess(effects.getProb())) {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.VENOM, effects.getDotInterval()), SkillFactory.getSkill(4210011), player.getSkillLevel(4210011), null, false), 3000);
                    }
                } else if (player.getSkillLevel(4220011) > 0) {
                    SkillStatEffect effects = SkillFactory.getSkill(4220011).getEffect(player.getSkillLevel(4220011));
                    if (Randomizer.isSuccess(effects.getProb())) {
                        if (player.STACK < 3) {
                            player.STACK++;
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.VENOM, effects.getDotInterval()), SkillFactory.getSkill(4220011), player.getSkillLevel(4220011), null, false), 8000);
                    }
                }
                switch (attack.skill) {
                    case 4221016:
                        if (player.getBuffedValue(BuffStats.CTS_DarkSight, 4001003) != null) {
                            if (player.KillingPoint > 2) {
                                totDamageToOneMonster += (long) (totDamageToOneMonster * 300.0D / 100.0D);
                            } else {
                                totDamageToOneMonster += (long) (totDamageToOneMonster / SkillFactory.getSkill(4221014).getEffect(player.getSkillLevel(4221014)).getX());
                            }
                            player.cancelEffectFromBuffStat(BuffStats.CTS_DarkSight, 4001003);
                        } else if (player.KillingPoint > 2) {
                            totDamageToOneMonster += (long) (totDamageToOneMonster * 150.0D / 100.0D);
                            player.KillingPoint = 0;
                            player.send(MainPacketCreator.KillingPoint(player.KillingPoint));
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 3 * 1000);
                        break;
                    case 4221007:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 4 * 1000);
                        break;
                }
            }
        }

        public static void DualBladeAttack(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, long totDamageToOneMonster) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isDualBlade(player.getJob())) {
                if (player.getBuffedValue(BuffStats.CTS_DarkSight, 4330001) != null) {
                    SkillStatEffect effects = SkillFactory.getSkill(4330001).getEffect(player.getSkillLevel(4330001));
                    if (Randomizer.isSuccess(effects.getProb())) {
                        totDamageToOneMonster += (long) (totDamageToOneMonster * 20 / 100.0D);
                    } else {
                        player.cancelEffectFromBuffStat(BuffStats.CTS_DarkSight, 4330001);
                        player.send(MainPacketCreator.CancelDarkSight());
                    }
                }
                if (player.getSkillLevel(4320005) > 0) {
                    SkillStatEffect effects = SkillFactory.getSkill(4320005).getEffect(player.getSkillLevel(4320005));
                    if (Randomizer.isSuccess(effects.getProb())) {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.VENOM, effects.getDotInterval()), SkillFactory.getSkill(4320005), player.getSkillLevel(4320005), null, false), 6000);
                    }
                } else if (player.getSkillLevel(4340012) > 0) {
                    SkillStatEffect effects = SkillFactory.getSkill(4340012).getEffect(player.getSkillLevel(4340012));
                    if (Randomizer.isSuccess(effects.getProb())) {
                        if (player.STACK < 3) {
                            player.STACK++;
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.VENOM, effects.getDotInterval()), SkillFactory.getSkill(4340012), player.getSkillLevel(4340012), null, false), 8000);
                    }
                }
                //4340012

                switch (attack.skill) {
                    case 4321006:
                        if (Randomizer.isSuccess(effect.getProb())) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 6000);
                        }
                        break;
                    case 4321002:
                        if (Randomizer.isSuccess(effect.getProb())) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.AddDamSkill, 20), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 50000);
                        }
                        break;
                    case 4331006:
                        if (Randomizer.isSuccess(effect.getProb())) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 4000);
                        }
                        break;
                    case 4341011:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 10000);
                        break;
                }
            }
        }

        public static void ViperAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, final long totDamageToOneMonste) {
            if (GameConstants.isViper(player.getJob())) {
                SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
                switch (attack.skill) {
                    case 5110002:
                    case 5111013:
                        if (Randomizer.isSuccess(effect.getProb())) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        }
                        break;
                    case 5121001:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.AddDamSkill, 20), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void CannonAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, final long totDamageToOneMonste) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isCannon(player.getJob())) {

                if (player.getBuffedValue(BuffStats.CTS_Roulette) != null) {
                    int oakid = player.getBuffedValue(BuffStats.CTS_Roulette).intValue();
                    switch (oakid) {
                        case 3:
                            if (Randomizer.isSuccess(SkillFactory.getSkill(5311004).getEffect(player.getSkillLevel(5311004)).getProb())) {
                                monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, -50), SkillFactory.getSkill(5311004), player.getSkillLevel(5311004), null, false), 5000);
                            }
                            break;
                        case 4:
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, SkillFactory.getSkill(5311004).getEffect(5311004).getDotInterval()), SkillFactory.getSkill(5311004), player.getSkillLevel(5311004), null, false), 5000);
                            break;
                    }
                }

                switch (attack.skill) {
                    case 5311010:
                    case 5311011:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.AddDamSkill, 20), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 5311002:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }
    }

    public static class CygnusSkillHandler {

        public static void SoulMasterAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isSoulMaster(player.getJob())) {
                if (player.getBuffedValue(BuffStats.CTS_ElementSoul) != null) {
                    if (Randomizer.isSuccess(SkillFactory.getSkill(11001022).getEffect(player.getSkillLevel(11001022)).getProb())) {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(11001022), player.getSkillLevel(11001022), null, false), 8000);
                    }
                }
                switch (attack.skill) {
                    case 11121004:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(11121004), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void FlameWizardAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, long totDamageToOneMonster) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isFlameWizard(player.getJob())) {
                if (player.getBuffedValue(BuffStats.CTS_Ember) != null) {
                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.MS_BMageDebuff, 1), SkillFactory.getSkill(12101024), player.getSkillLevel(12101024), null, false), 10000);
                }
                switch (attack.skill) {
                    case 12121002:
                        if (monster.getBuff(MonsterStatus.MS_BMageDebuff) != null) {
                            totDamageToOneMonster += (long) (totDamageToOneMonster * (totDamageToOneMonster * 90.0D / 100.0D));
                        }
                        break;
                }
            }
        }

        public static void WindBreakAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, final long totDamageToOneMonster) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (player.getBuffedValue(BuffStats.CTS_TriflingWhimOnOff) != null && attack.skill != 13120003 && attack.skill != 13120010 && attack.skill != 13110022 && attack.skill != 13110027 && attack.skill != 13100022 && attack.skill != 13100027) {
                if (totDamageToOneMonster > 0) {
                    int percent = 0, count = 0, skillid = 0, type = 0;
                    if (player.getSkillLevel(SkillFactory.getSkill(13120003)) > 0) {
                        if (Randomizer.nextInt(100) < 85) {
                            skillid = 13120003;
                            type = 1;
                        } else {
                            skillid = 13120010;
                            type = 1;
                        }
                        count = Randomizer.rand(1, 5);
                        percent = 20;
                    } else if (player.getSkillLevel(SkillFactory.getSkill(13110022)) > 0) {
                        if (Randomizer.nextInt(100) < 90) {
                            skillid = 13110022;
                            type = 1;
                        } else {
                            skillid = 13110027;
                            type = 1;
                        }
                        count = Randomizer.rand(1, 4);
                        percent = 10;
                    } else if (player.getSkillLevel(SkillFactory.getSkill(13100022)) > 0) {
                        if (Randomizer.nextInt(100) < 95) {
                            skillid = 13100022;
                            type = 1;
                        } else {
                            skillid = 13100027;
                            type = 1;
                        }
                        count = Randomizer.rand(1, 3);
                        percent = 5;
                    }
                    for (MapleMapObject ob : player.getMap().getAllMonster()) {
                        MapleMonster mob = (MapleMonster) ob;
                        if (ob != null && ((mob.getPosition().getX() + 597) >= player.getPosition().getX()) && ((mob.getPosition().getX() - 597) <= player.getPosition().getX()) && ((mob.getPosition().getY() + 480) >= player.getPosition().getY()) && ((mob.getPosition().getY() - 480) <= player.getPosition().getY())) {
                            if (Randomizer.nextInt(100) < percent) {
                                player.getMap().broadcastMessage(player, MainPacketCreator.TrifleWorm(player.getId(), skillid, count, mob.getObjectId(), type), false);
                                player.send(MainPacketCreator.TrifleWorm(player.getId(), skillid, count, mob.getObjectId(), type));
                            }
                        }
                    }
                }
            }

            if (player.getBuffedValue(BuffStats.CTS_StormBringer) != null) {
                if (Randomizer.isSuccess(SkillFactory.getSkill(13121054).getEffect(player.getSkillLevel(13121054)).getProb())) {
                    SkillFactory.getSkill(13121054).getEffect(player.getSkillLevel(13121054)).applyAtom(player, 8);
                    player.message("스톰브링어 발동");
                }
            }

            if (GameConstants.isWindBreaker(player.getJob())) {
                switch (attack.skill) {
                    case 13111021:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.MS_AddDamParty, 20), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 999999999);
                        break;
                    case 13121052:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(13121052), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void NightWalkerAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (player.getBuffedValue(BuffStats.CTS_NightWalkerBat) != null && attack.skill != 14000027 && attack.skill != 14000028 && attack.skill != 14000029) {
                SkillStatEffect eff = SkillFactory.getSkill(14000028).getEffect(1);
                SkillStatEffect b_eff = SkillFactory.getSkill(14000027).getEffect(player.getSkillLevel(14001027));
                int skillid = 14000027;
                int BatLimit = 2;
                int mobCount = 3;
                int Chance = b_eff.getProb();
                int skillids[] = {14100027, 14110029, 14120008};
                for (int skill : skillids) {
                    if (player.getSkillLevel(skill) > 0) {
                        if (skill != 14110029) {
                            Chance += SkillFactory.getSkill(skill).getEffect(player.getSkillLevel(skill)).getProb();
                        }
                        BatLimit += SkillFactory.getSkill(skill).getEffect(player.getSkillLevel(skill)).getY();
                        mobCount += SkillFactory.getSkill(skill).getEffect(player.getSkillLevel(skill)).getMobCount();
                        skillid = skill;
                    }
                }
                SkillStatEffect batskill = SkillFactory.getSkill(skillid).getEffect(player.getSkillLevel(skillid));
                List<MapleSummon> summons = new ArrayList<MapleSummon>();
                for (Pair<Integer, MapleSummon> summon : player.getSummons().values()) {
                    if (summon.getRight().getSkill() == 14000027
                            || summon.getRight().getSkill() == 14100027
                            || summon.getRight().getSkill() == 14110029
                            || summon.getRight().getSkill() == 14120008) {
                        summons.add(summon.getRight());
                    }
                }
                player.setShadowBatMobCount(mobCount);
                final List<MapleMapObject> mobs_ = player.getMap().getMapObjectsInRange(player.getPosition(), 800 * 800, Arrays.asList(MapleMapObjectType.MONSTER));
                final List<Integer> mobList = new LinkedList<Integer>();
                int i = 0;
                for (final MapleMapObject mo : mobs_) {
                    MapleMonster mons = (MapleMonster) mo;
                    mobList.add(mons.getObjectId());
                    break;
                }
                if (summons.size() >= 1) {
                    if (mobList.size() > 0) {
                        if (Randomizer.nextInt(100) < Chance) {
                            player.getMap().broadcastMessage(MainPacketCreator.giveShadowBat(player.getId(), mobList.get(0), skillid, player.getPosition(), 15));
                            summons.get(Randomizer.nextInt(summons.size())).removeSummon(player.getMap());
                        }
                    }
                }
                if (GameConstants.isNightWalkerThrowingSkill(attack.skill)) {
                    if (summons.size() < 5) {
                        player.setNightWalkerAttackCount(player.getNightWalkerAttackCount() + 1);
                        player.dropMessage(5, "attackCount : " + player.getNightWalkerAttackCount());
                        if (player.getNightWalkerAttackCount() >= 3) {
                            batskill.setStat("time", b_eff.getTime());
                            batskill.applyTo(player, player.getPosition());
                            player.setNightWalkerAttackCount(0);
                        }
                    }
                }
            }
            if (GameConstants.isNightWalker(player.getJob())) {
                int limit = 0;
                if (player.getSkillLevel(14100026) > 0 && player.getSkillLevel(14110028) < 1) {
                    limit = 1;
                } else if (player.getSkillLevel(14110028) > 0 && player.getSkillLevel(14120007) < 1) {
                    limit = 2;
                } else if (player.getSkillLevel(14120007) > 0) {
                    limit = 3;
                }
                if (player.getBuffedValue(BuffStats.CTS_ElementDarkness, 14001021) != null) {
                    SkillStatEffect effects = SkillFactory.getSkill(14001021).getEffect(player.getSkillLevel(14001021));
                    if (Randomizer.isSuccess(effects.getProb())) {
                        if (player.STACK < limit + 2) {
                            player.STACK++;
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.MS_ElementDarkness, player.STACK), SkillFactory.getSkill(14001021), player.getSkillLevel(14001021), null, false), effects.getStatusDuration());
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effects.getDotInterval()), SkillFactory.getSkill(14001021), player.getSkillLevel(14001021), null, false), effects.getStatusDuration());
                    }
                }
            }
        }

        public static void StrikerAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isStriker(player.getJob())) {

            }
        }

    }

    public static class HeroSkillHandler {

        public static void AranAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isAran(player.getJob())) {
                if (player.getBuffedValue(BuffStats.CTS_WeaponCharge) != null) {
                    if (!monster.getStats().isBoss()) {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, -20), SkillFactory.getSkill(21101006), player.getSkillLevel(21101006), null, false), 20000);
                    } else {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, -20), SkillFactory.getSkill(21101006), player.getSkillLevel(21101006), null, false), 10000);
                    }
                }
                if (player.getBuffedValue(BuffStats.CTS_ComboDrain) != null) {
                    player.addHP(player.getStat().getCurrentMaxHp() / player.getBuffedValue(BuffStats.CTS_ComboDrain).intValue());
                }
                if (player.getSkillLevel(0) > 21100014) {
                    if (GameConstants.isComboAttackSkill(attack.skill)) {

                    }
                }
                switch (attack.skill) {
                    case 21100002:
                    case 21100013:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 21110011:
                    case 21110024:
                    case 21110025:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void EvanAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isEvan(player.getJob())) {
                if (GameConstants.isEvan(player.getJob()) && attack.targets != 0) {
                    if (GameConstants.isConvergenceSkill(attack.skill)) {
                        int wreckageSkillID = 22141017;
                        if (player.getSkillLevel(22170070) > 0) {
                            wreckageSkillID = 22170070;
                        }
                        if (player.getCooldownLimit(wreckageSkillID) == 0 && player.getSkillLevel(wreckageSkillID) > 0) {
                            List<Point> mobList = new LinkedList<Point>();
                            attack.allDamage.forEach(m -> {
                                MapleMonster mob = player.getMap().getMonsterByOid(m.objectid);
                                mobList.add(mob.getPosition());
                            });
                            SkillStatEffect e = SkillFactory.getSkill(wreckageSkillID).getEffect(player.getSkillLevel(wreckageSkillID));
                            if (mobList.size() > 0) {
                                int i = 1;
                                for (Point pos : mobList) {
                                    if (player.getWreckageCount() < e.getX()) { // x개를 넘을 수 없다.
                                        player.getMap().spawnWreckage(new MapleWreckage(player, e.getTime() / 1000, wreckageSkillID, player.incAndGetWreckageCount(), pos));
                                    } else {
                                        break;
                                    }
                                }
                                player.addCooldown(wreckageSkillID, System.currentTimeMillis(), wreckageSkillID == 22141017 ? 600 : 400);
                            }
                        }
                    }
                }
            }
        }

        public static void MercedesAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, long totDamageToOneMonster) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isMercedes(player.getJob())) {
                switch (attack.skill) {
                    case 23111000:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 23120013:
                        if (monster.getBuff(MonsterStatus.STUN) != null) {
                            totDamageToOneMonster += (long) totDamageToOneMonster * 20.0D / 100.0D;
                            monster.cancelStatus(MonsterStatus.STUN);
                        }
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 23111002:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.AddDamSkill, 30), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 23121002:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.MDEF, -30), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;

                }
            }
        }

        public static void PhantomAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isPhantom(player.getJob())) {
                switch (attack.skill) {
                    case 24121010:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.MDEF, -20), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                    case 24121052:
                        if (player.phantome_count <= 4) {
                            player.phantome_count += 1;
                            player.getMap().spawnMist(new MapleMist(SkillFactory.getSkill(24121052).getEffect(1).calulateRoundingBox(monster.getPosition()), player, SkillFactory.getSkill(24121052).getEffect(1), player.getSkillLevel(24121052), monster.getPosition()), 12000, false, false, false, false, false, false, false);
                        }
                        break;
                }
            }
        }

        public static void EunWolAttackHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, long totDamageToOneMonster) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isEunWol(player.getJob())) {
                if (player.getSkillLevel(25110210) > 0) {
                    SkillStatEffect effects = SkillFactory.getSkill(25110210).getEffect(player.getSkillLevel(25110210));
                    if (Randomizer.isSuccess(effects.getProb())) {
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.AddDamSkill, 20), SkillFactory.getSkill(25110210), player.getSkillLevel(25110210), null, false), 15000);
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.DARKNESS, -60), SkillFactory.getSkill(25110210), player.getSkillLevel(25110210), null, false), 15000);
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.ACC, -40), SkillFactory.getSkill(25110210), player.getSkillLevel(25110210), null, false), 15000);
                    }
                }
                if (player.getSkillLevel(20050285) > 0) {
                    if (totDamageToOneMonster > 0) {
                        player.addHP((int) ((int) player.getStat().getCurrentMaxHp() * 1.0 / 100.0D));
                    }
                }
                switch (attack.skill) {
                    case 25121006:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, effect.getDotInterval()), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), effect.getStatusDuration());
                        break;
                }
            }
        }

        public static void LuminousSkillHandler(final MapleCharacter player, final MapleMonster monster, final AttackInfo attack, long totDamageToOneMonster) {
            SkillStatEffect effect = SkillFactory.getSkill(attack.skill).getEffect(attack.skillLevel);
            if (GameConstants.isLuminous(player.getJob())) {
                Integer Gauge = player.getBuffedValue(BuffStats.CTS_Larkness);
                if (player.getBuffedValue(BuffStats.CTS_Larkness) == null || player.getBuffedValue(BuffStats.CTS_Larkness) == -1) {
                    if (GameConstants.isDarkSkills(attack.skill)) {
                        player.getSunfireBuffedValue(20040216, attack.skill, Gauge);
                    } else {
                        player.getEclipseBuffedValue(20040217, attack.skill, Gauge);
                    }
                } else if (player.getBuffedValue(BuffStats.CTS_Larkness) == 20040216) {
                    player.getSunfireBuffedValue(20040216, attack.skill, Gauge);
                } else if (player.getBuffedValue(BuffStats.CTS_Larkness) == 20040217) {
                    player.getEclipseBuffedValue(20040217, attack.skill, Gauge);
                }
            }

            if (GameConstants.isLuminous(player.getJob())) {
                if (player.getBuffedValue(BuffStats.CTS_Larkness) != null) {
                    int equalibrium = player.getBuffedValue(BuffStats.CTS_Larkness).intValue();
                    if (equalibrium == 20040216) {
                        switch (attack.skill) {
                            case 20041226: // 스펙트럴 라이트 (기본 직업)
                            case 27001100: // 트윙클 플래쉬
                            case 27101100: // 실피드 랜서
                            case 27111100: // 스펙트럴 라이트
                            case 27121100: // 라이트 리플렉션
                                player.addHP((int) Math.min((totDamageToOneMonster * (1 / 100.0D)), player.getStat().getCurrentMaxHp() / 2)); //체력 회복
                                break;

                        }
                    }
                    if (equalibrium == 2) {
                        switch (attack.skill) {
                            case 20041226: // 스펙트럴 라이트 (기본 직업)
                            case 27001100: // 트윙클 플래쉬
                            case 27101100: // 실피드 랜서
                            case 27111100: // 스펙트럴 라이트
                            case 27121100: // 라이트 리플렉션
                                player.addHP((int) Math.min((totDamageToOneMonster * (1 / 100.0D)), player.getStat().getCurrentMaxHp() / 2)); //체력 회복
                                break;
                        }
                    }
                }

                switch (attack.skill) {
                    case 27121052:
                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(attack.skill), attack.skillLevel, null, false), 20000);
                        break;
                }
            }
        }
    }

    public static class ResistanceSkillHandler {

    }

    public static class NovaSkillHandler {

    }

    public static class ZeroSkillHandler {

    }

    public static class KinesisSkillHandler {

    }

}
