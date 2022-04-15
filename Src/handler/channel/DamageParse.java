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
import client.PlayerStats;
import client.MapleClient;
import client.items.*;
import client.skills.ISkill;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import client.stats.BuffStats;
import client.stats.MonsterStatus;
import client.stats.MonsterStatusEffect;
import client.stats.PlayerStat;
import community.MaplePartyCharacter;
import constants.GameConstants;
import constants.ServerConstants;

import java.awt.Point;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import packet.creators.MainPacketCreator;
import packet.creators.MobPacket;
import packet.creators.UIPacket;
import packet.opcode.RecvPacketOpcode;
import packet.skills.AngelicBusterSkill;
import packet.skills.KaiserSkill;
import packet.transfer.read.ReadingMaple;
import server.items.ItemInformation;
import server.life.MapleMonster;
import server.life.MapleMonsterStats;
import server.maps.*;
import tools.AttackPair;
import tools.Pair;
import tools.RandomStream.Randomizer;
import tools.Timer.EtcTimer;
import handler.skill.SkillSubHandler.*;

import java.awt.Rectangle;
import java.util.Arrays;
import java.util.Map;

import packet.creators.SoulWeaponPacket;
import tools.ArrayMap;

public class DamageParse {

    public static MapleClient c;

    public DamageParse(MapleClient c) {
        DamageParse.c = c;
    }

    public MapleClient getClient() {
        return c;
    }

    public static void doHideAndSeek(MapleCharacter player, AttackInfo attack, boolean catched) {
        for (MapleCharacter attackedPlayers : player.getMap().getNearestPvpChar(player.getPosition(), 91, 40, attack.animation >= 0 ? true : false, Collections.unmodifiableCollection(player.getMap().getCharacters()))) {
            if (attackedPlayers.isAlive() && attackedPlayers.isCatched && player.isCatching) {
                CatchPlayer(player, attackedPlayers);
            }
        }
    }

    public static void CatchPlayer(MapleCharacter player, MapleCharacter catched) {

        player.getMap().broadcastMessage(MainPacketCreator.showGatherComplete(player.getId(), true));
        player.getMap().broadcastMessage(MainPacketCreator.serverNotice(6, "[술래잡기] 늑대 " + player.getName() + "님이 양 " + catched.getName() + "님을 잡으셨습니다."));
        catched.getStat().setHp(0, catched);
        catched.updateSingleStat(PlayerStat.HP, 0);
        boolean alliveCatched = false;
        for (MapleCharacter chr : player.getMap().getCharacters()) {
            if (chr.isAlive() && chr.isCatched) {
                alliveCatched = true;
                break;
            }
        }
        if (!alliveCatched) {
            player.getMap().stopCatch();
            for (MapleCharacter chr : player.getMap().getCharacters()) {
                chr.getStat().setHp(chr.getStat().getMaxHp(), chr);
                chr.updateSingleStat(PlayerStat.HP, chr.getStat().getHp());
                if (chr.isCatching) {
                    chr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(109090200), chr.getClient().getChannelServer().getMapFactory().getMap(109090200).getPortalSP().get(0));
                } else {
                    chr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(109090101), chr.getClient().getChannelServer().getMapFactory().getMap(109090101).getPortalSP().get(0));
                }
            }
            player.getMap().broadcastMessage(MainPacketCreator.serverNotice(1, "양들이 모두 잡혀서 늑대가 승리하였습니다!\r\n모든 분들은 게임 보상맵으로 이동 됩니다."));
        }
    }

    public static void applyAttack(AttackInfo attack, ISkill theSkill, final MapleCharacter player, int attackCount, SkillStatEffect effect, AttackType attack_type) {
        MapleMap map = player.getMap();
        if (player.getMapId() == 109090300) {
            doHideAndSeek(player, attack, true);
            return;
        }
        //int 피브이피맵코드 = 100000203;
        if (player.getMapId() == 100000203) {
            BattleHandler.doPVPattack(player, attack);
        }

        if (player.isGM()) { // 치우씨 : 스킬 정보 뜨게끔 처리
            player.Message("[applyAttack] [skill name : " + SkillFactory.getSkillName(attack.skill) + "] [skill code : " + attack.skill + "] [skill level : " + attack.skillLevel + "] ");
        }

        if (attack.skill == 24121054) {
            if (player.phantome_count >= 4) {
                player.phantome_count = 0;
            }
        }
        if (player.getBuffedValue(BuffStats.CTS_Roulette) != null) {
            player.Message(4, "[오크통 롤렛 효과 : " + player.getBuffedValue(BuffStats.CTS_Roulette) + "]");
        }
        if (player.isEquippedSoulWeapon() && attack.skill == player.getEquippedSoulSkill()) {
            SkillStatEffect effects = SkillFactory.getSkill(player.getEquippedSoulSkill()).getEffect(player.getSkillLevel(player.getEquippedSoulSkill()));
            player.setSoulCount(player.getSoulCount() - player.getSoulSkillMpCon());
            player.getClient().getSession().writeAndFlush(SoulWeaponPacket.giveSoulGauge(player.getSoulCount(), player.getEquippedSoulSkill()));
            player.getClient().getSession().write(SoulWeaponPacket.giveSoulEffect(0));
            player.getMap().broadcastMessage(SoulWeaponPacket.cancelForeignSoulEffect(player.getId()));
            player.getClient().getSession().writeAndFlush(MainPacketCreator.resetActions(player));
            player.Message(effects.getSourceId() + " / " + effects.getSoulMPCon() + "");
            player.checkSoulState(true, player.getEquippedSoulSkill());
        }
        /*if (player.getBuffedValue(BuffStats.ct) != null) { //윈드워크 은신해제
            player.cancelEffectFromBuffStat(BuffStats.WIND_WALK, -1);
        }*/

        if (GameConstants.isAran(player.getJob()) && attack.skill != 0) { // 치우씨 :: 아란 useComboSkill 추가
            //player.Message("aran useComboSkill Check "); // 혹시 적용이 안된거 아님? 확인차 적용
            player.useComboSkill(attack.skill);
        }

        if (GameConstants.isAran(player.getJob()) && attack.targets != 0) {
            if (player.combo < 30000) {
                player.combo++;
            }
            player.updateCombo(player.combo, System.currentTimeMillis());
            // 에어로 스윙 구현부
            /*if (GameConstants.isAeroSwingSkill(attack.skill)) {
                player.send(MainPacketCreator.setSlowDown());
            }*/
            switch (attack.skill) {
                case 21110022:
                case 21110023:
                case 21110026:
                    player.send(MainPacketCreator.setSlowDown());
                    break;
            }
        }

        if (attack.skill == 35121052) {
            player.getMap().spawnMist(new MapleMist(SkillFactory.getSkill(35121052).getEffect(35121052).calculateBoundingBox(attack.position, player.isFacingLeft()), player, effect, player.getSkillLevel(3111003), attack.position), 4000, false, false, false, false, false, false, false);
        }
        if ((attack.skill != 0) && (GameConstants.isKinesis(player.getJob()))) {
            player.givePPoint(effect);
        }
        if ((attack.skill != 0) && (GameConstants.isBlaster(player.getJob()))) {
            player.giveBulletGauge(attack.skill, false);
        }
        if (attack.skill == 4211006) { // meso explosion
            for (AttackPair oned : attack.allDamage) {
                if (oned.attack != null) {
                    continue;
                }
                MapleMapObject mapobject = map.getMapObject(oned.objectid);

                if (mapobject != null && mapobject.getType() == MapleMapObjectType.ITEM) {
                    MapleWorldMapItem mapitem = (MapleWorldMapItem) mapobject;

                    if (mapitem.getMeso() > 0) {
                        if (mapitem.isPickedUp()) {
                            return;
                        }
                        map.removeMapObject(mapitem);
                        map.broadcastMessage(MainPacketCreator.explodeDrop(mapitem.getObjectId()));
                        mapitem.setPickedUp(true);
                    } else {
                        return;
                    }
                } else {
                    return; // etc explosion, exploding nonexistant things, etc.
                }
            }
        }

        int fixeddmg;
        long totDamage = 0, totDamageToOneMonster = 0;
        PlayerStats stats = player.getStat();

        MapleMonster monster;
        MapleMonsterStats monsterstats;
        int mobs = 0;

        for (final AttackPair mob : attack.allDamage) {
            int mdmg = 0;
            monster = map.getMonsterByOid(mob.objectid);
            for (Pair<Integer, Boolean> dmg : mob.attack) {
                mdmg += dmg.left;
            }
            if (monster != null) {
                if (monster.getMobMaxHp() - mdmg < 0) {
                    mobs++;
                }
            }
        }

        for (final AttackPair oned : attack.allDamage) {
            monster = map.getMonsterByOid(oned.objectid);
            if (monster != null) {
                totDamageToOneMonster = 0;
                monsterstats = monster.getStats();
                fixeddmg = monsterstats.getFixedDamage();
                if (player.haveItem(3994514, 1, false, true)) {
                    if (monster.getStats().getLevel() + 20 > player.getLevel() && monster.getStats().getLevel() - 20 <= player.getLevel()) {
                        player.getStat().addSaintSaver(1);
                    }
                }
                if (attack.skill == 3211010 || attack.skill == 3111010 || attack.skill == 1100012) {
                    player.send(MainPacketCreator.showSkillEffect(-1, player.getLevel(), attack.skill, attack.skillLevel, monster.getObjectId(), 1, monster.getPosition(), null, !(attack.animation >= 0)));
                    player.getMap().broadcastMessage(player, MainPacketCreator.showSkillEffect(player.getId(), player.getLevel(), attack.skill, attack.skillLevel, monster.getObjectId(), 1, monster.getPosition(), null, !(attack.animation >= 0)), false);
                }
                if (GameConstants.isKaiser(player.getJob())) {
                    if (!player.isFinalFiguration) {
                        player.getClient().send(KaiserSkill.giveCTS_MorphGauge(player.getStat().addCTS_Morph(5)));
                    }
                }
                Integer eachd;
                for (Pair<Integer, Boolean> eachde : oned.attack) {
                    eachd = eachde.left;
                    if (fixeddmg != -1) {
                        if (monsterstats.getOnlyNoramlAttack()) {
                            eachd = attack.skill != 0 ? 0 : fixeddmg;
                        } else {
                            eachd = fixeddmg;
                        }
                    } else if (monsterstats.getOnlyNoramlAttack()) {
                        eachd = attack.skill != 0 ? 0 : eachd;
                    }
                    totDamageToOneMonster += (long) eachd;
                }
                totDamage += totDamageToOneMonster;
                player.checkMonsterAggro(monster);

                MonsterStatusEffect monsterStatusEffect;
                if (player.getSkillLevel(1200014) > 0) {
                    int skillid[] = {1201011, 1201012, 1211004, 1211006, 1211008};
                    if (player.GetCount() < 5) {
                        for (int i = 0; i < skillid.length; i++) {
                            if (attack.skill == skillid[i]) {
                                if (player.GetSkillid() != skillid[i]) {
                                    player.SetSkillid(attack.skill);
                                    if (player.GetSkillid() != 0) {
                                        player.elementalChargeHandler(1);
                                    }
                                }
                            }
                        }
                    }
                }

                if (player.getSkillLevel(100000267) > 0) {
                    switch (attack.skill) {
                        case 101001200:
                        case 101000200:
                        case 101000201:
                        case 101101200:
                        case 101100200:
                        case 101100201:
                        case 101111200:
                        case 101110200:
                        case 101110202:
                        case 101110203:
                        case 101120201:
                        case 101120202:
                        case 101120204:
                            if (player.getSkillLevel(100000276) < 10) {
                                player.getClient().getSession().writeAndFlush(MainPacketCreator.showSkillEffect(-1, 101120207, player.getSkillLevel(101120207)));
                                player.changeSkillLevel(100000276, (byte) (player.getSkillLevel(100000276) + 1), (byte) (player.getSkillLevel(100000276) + 1));
                            }
                            SkillStatEffect eff = SkillFactory.getSkill(100000276).getEffect(player.getSkillLevel(100000276));
                            eff.applyTo(player);
                            if (player.rapidtimer1 != null) {
                                player.rapidtimer1.cancel(false);
                                player.rapidtimer1 = null;
                            }
                            player.cancelRapidTime((byte) 1);
                            break;
                        case 101001100:
                        case 101000100:
                        case 101000101:
                        case 101101100:
                        case 101100100:
                        case 101100101:
                        case 101111100:
                        case 101110100:
                        case 101110102:
                        case 101110103:
                        case 101120101:
                        case 101120102:
                        case 101120104:
                            if (player.getSkillLevel(100000277) < 10) {
                                player.RapidTimeCount++;
                                player.changeSkillLevel(100000277, (byte) (player.getSkillLevel(100000277) + 1), (byte) (player.getSkillLevel(100000277) + 1));
                            }
                            SkillStatEffect eff2 = SkillFactory.getSkill(100000277).getEffect(player.getSkillLevel(100000277));
                            eff2.applyTo(player);
                            if (player.rapidtimer2 != null) {
                                player.rapidtimer2.cancel(false);
                                player.rapidtimer2 = null;
                            }
                            player.cancelRapidTime((byte) 2);
                            break;
                    }
                }

                if (player.getSkillLevel(37110009) > 0) {
                    SkillFactory.getSkill(37110009).getEffect(player.getSkillLevel(37110009)).applyTo(player);
                }

                if (player.getSkillLevel(3210013) > 0 && (player.getJob() == 311 || player.getJob() == 312)) {
                    SkillStatEffect sse = SkillFactory.getSkill(3210013).getEffect(player.getSkillLevel(3210013));
                    sse.applyToDamageReversing(player, totDamageToOneMonster);
                }

                /*
                if (player.getSkillLevel(36110003) > 0) {
                    ISkill skill = SkillFactory.getSkill(36110003);
                    SkillStatEffect effs = skill.getEffect(player.getSkillLevel(skill));
                    if (player.getLastCombo() + 5000 < System.currentTimeMillis()) {
                        player.acaneAim = 0;
                        player.clearDamageMeters();
                    }
                    if (effs.makeChanceResult()) {
                        player.setLastCombo(System.currentTimeMillis());
                        if (player.acaneAim < 3) {
                            player.acaneAim++;
                        }
                        Map<MonsterStatus, Integer> stat = new ArrayMap<MonsterStatus, Integer>();
                        stat.put(MonsterStatus.DARKNESS, effs.getX());
                        stat.put(MonsterStatus.TRIANGLE_FOMATION, player.acaneAim);
                        stat.put(MonsterStatus.TRIANGLE_FOMATION_S, player.acaneAim);
                        monsterStatusEffect = new MonsterStatusEffect(stat, skill, null, false);
                        monster.applyStatus(player, monsterStatusEffect, false, effs.getDuration(), true);
                    }
                }*/
 /* 픽파킷 */
                if (player.getBuffedValue(BuffStats.CTS_PickPocket) != null) {
                    switch (attack.skill) {
                        case 0:
                        case 4001334: //더블 스탭
                        case 4201004: //스틸
                        case 4201005: //새비지 블로우
                        case 4211002: //무스펠 하임
                        case 4211011: //엣지 카니발
                        case 4221016: //암살
                        case 4221007: //부메랑 스탭
                        case 4221010:
                            handlePickPocket(player, monster, oned);
                            break;
                    }
                }

                if (totDamageToOneMonster > 0) {

                    if (attack.skill == 4201004) { //Steal
                        monster.handleSteal(player);
                    }
                    if (GameConstants.isDemonSlayer(player.getJob())) { //포스 흡수
                        player.handleForceGain(monster.getObjectId(), attack.skill);
                    }
                    if (player.getSkillLevel(30010111) > 0) { //데쓰 커스
                        SkillStatEffect effs = SkillFactory.getSkill(30010111).getEffect(1);
                        if (effs.makeChanceResult()) {
                            if (!monster.getStats().isBoss() && player.getMapId() != 900000000 && player.getMapId() != 109040004) { //보스가 아니어야함.
                                totDamageToOneMonster = 999999999;
                                player.addHP((int) (player.getStat().getCurrentMaxHp() * (effs.getX() / 100.0D))); //체력 회복
                            }
                        }
                    }
                    if (attack.skill == 27121303) {
                        if (!monster.getStats().isBoss()) {
                            totDamageToOneMonster = 999999999;
                        }
                    }
                    if (GameConstants.isLuminous(player.getJob())) {
                        SkillStatEffect dkeffect = player.getBuffedSkillEffect(BuffStats.CTS_StackBuff, 27121005);
                        if (dkeffect != null) {
                            if (player.getLastCombo() + 5000 < System.currentTimeMillis()) {
                                player.acaneAim = 0;
                                player.clearDamageMeters();
                            }

                            if (dkeffect.makeChanceResult()) {
                                player.setLastCombo(System.currentTimeMillis());
                                if (player.acaneAim <= 29) {
                                    player.acaneAim++;
                                    dkeffect.applyTo(player);
                                }
                            }
                        }
                    }
                    if (player.getJob() == 422) {
                        int critical = player.acaneAim;
                        if (attack.skill > 0) {
                            player.send(MainPacketCreator.CriticalGrowing(critical));
                        }
                        if (player.acaneAim <= 23) {
                            player.acaneAim++;
                        }
                    }
                    if (player.getJob() == 422) {
                        if (player.getSkillLevel(4221013) > 0) {
                            for (int i = 0; i < 6; i++) {
                                if (attack.skill > 0) {
                                    player.send(MainPacketCreator.KillingPoint(i));
                                }
                            }
                        }
                    }
                    if (player.getJob() >= 310 && player.getJob() <= 312 && attack.skill != 3100010) {
                        boolean modeChange = false;
                        if (player.quiver) {
                            if (player.quivermode == 1) {
                                if (player.quivercount[0] > 1) {//흡혈
                                    if (Randomizer.nextInt(100) < 50) {
                                        player.quivercount[0] -= 1;
                                        player.refreshMaxHp();
                                    }
                                } else if (player.quivercount[0] == 1) {//흡혈끝
                                    player.quivercount[0] += (9 + player.getSkillLevel(3121016));
                                    player.quivermode = 2;
                                    modeChange = true;
                                }
                            } else if (player.quivermode == 2) {
                                if (player.quivercount[1] > 1) {//독
                                    if (Randomizer.nextInt(20) < 100) {
                                        player.quivercount[1] -= 1;
                                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, (int) Randomizer.rand(100, 500)), SkillFactory.getSkill(3101009), player.getSkillLevel(attack.skill), null, false), (long) 10 * 1000);
                                    }
                                } else if (player.quivercount[1] == 1) {//독끝
                                    player.quivercount[1] += (9 + player.getSkillLevel(3121016));
                                    player.quivermode = 3;
                                    modeChange = true;
                                }
                            } else if (player.quivermode == 3) {
                                if (player.quivercount[2] > 1) {//마법 화살
                                    if (player.getBuffedSkillEffect(BuffStats.CTS_QuiverCatridge).makeChanceResult()) {
                                        player.quivercount[2] -= 1;
                                        SkillFactory.getSkill(3100010).getEffect(1).applyAtom(player, 10);
                                    }
                                } else if (player.quivercount[2] == 1) {//마법 화살끝
                                    player.quivercount[2] += (9 + (player.getSkillLevel(3121016) * 3));
                                    player.quivermode = 1;
                                    modeChange = true;
                                }
                            }
                            if (modeChange) {
                                player.getClient().getSession().writeAndFlush(UIPacket.showWZEffect("Skill/310.img/skill/3101009/mode/" + (player.quivermode - 1), 1));
                                player.getClient().getSession().writeAndFlush(UIPacket.showWZEffect("Skill/310.img/skill/3101009/modeStatus/" + (player.quivermode - 1) + "/" + (player.quivercount[player.quivermode - 1] * 1), 1));
                                player.getMap().broadcastMessage(player, UIPacket.broadcastWZEffect(player.getId(), "Skill/310.img/skill/3101009/mode/" + (player.quivermode - 1), 1), player.getPosition());
                                player.getMap().broadcastMessage(player, UIPacket.broadcastWZEffect(player.getId(), "Skill/310.img/skill/3101009/modeStatus/" + (player.quivermode - 1) + "/" + (player.quivercount[player.quivermode - 1] * 1), 1), player.getPosition());
                            }
                            player.getBuffedSkillEffect(BuffStats.CTS_QuiverCatridge).applyToQuiverCatridge(player, (player.quivercount[0] * 10000) + (player.quivercount[1] * 100) + (player.quivercount[2] * 1));
                        }
                    }

                    if (player.isActiveBuffedValue(65121011)) {
                        SkillStatEffect eff = player.getBuffedSkillEffect(BuffStats.CTS_AngelicBursterSoulSeeker, 65121011);
                        if (eff.makeChanceResult() && attack.skill != 65111007) {
                            eff.applyAtom(player, 3);
                        }
                    }
                    if (GameConstants.isKinesis(player.getJob()) && attack.skill != 142110011) {
                        short skillLevel = (short) player.getSkillLevel(142110011);
                        if (skillLevel > 0) {
                            SkillStatEffect eff = SkillFactory.getSkill(142110011).getEffect(skillLevel);
                            if (eff.makeChanceResult()) {
                                eff.applyAtom(player, 22);
                            }
                        }
                    }
                    if (player.getSkillLevel(4330007) > 0) { //바이탈 스틸
                        SkillStatEffect effects = SkillFactory.getSkill(4330007).getEffect(player.getSkillLevel(4330007));
                        if (effects.makeChanceResult()) {
                            int fhp = (int) (totDamageToOneMonster / effects.getX());
                            int shp = (int) (player.getStat().getCurrentMaxHp() / 100.0D) * 20;
                            if (fhp > shp) { //자신의 HP의 15%이상은 흡수 불가
                                fhp = shp;
                            }
                            player.addHP(fhp);
                        }
                    }

                    for (IItem item : player.getInventory(MapleInventoryType.EQUIPPED)) {
                        Equip equip = (Equip) item;
                        if (equip.getState() > 1) {
                            int[] potentials = {equip.getPotential1(), equip.getPotential2(), equip.getPotential3(), equip.getPotential4(), equip.getPotential5()};
                            ItemInformation ii = ItemInformation.getInstance();
                            StructPotentialItem pot;
                            for (int i : potentials) {
                                if (i > 0) {
                                    pot = ii.getPotentialInfo(i).get((ii.getReqLevel(equip.getItemId()) / 10) - 1);
                                    if (pot != null && pot.prop > 0) {
                                        if (Randomizer.nextInt(100) <= pot.prop) {
                                            switch (i) {
                                                case 10201:
                                                case 20201:
                                                    player.addHP(pot.HP);
                                                    break;
                                                case 10202:
                                                case 20206:
                                                    player.addMP(pot.MP);
                                                    break;
                                                case 10221:
                                                    //시간을 잘몰라서 5초라 생각하고 구현
                                                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, (int) pot.level), SkillFactory.getSkill(90001003), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                    break;
                                                case 10226:
                                                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, (int) pot.level), SkillFactory.getSkill(90001001), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                    break;
                                                case 10231:
                                                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, (int) pot.level), SkillFactory.getSkill(90001002), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                    break;
                                                case 10236:
                                                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.DARKNESS, (int) pot.level), SkillFactory.getSkill(90001004), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                    break;
                                                case 10241:
                                                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, (int) pot.level), SkillFactory.getSkill(90001006), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                    break;
                                                case 10246:
                                                    monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SEAL, (int) pot.level), SkillFactory.getSkill(90001005), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                    break;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (player.getBuffedValue(BuffStats.CTS_SpiritLink) != null && totDamageToOneMonster <= 999999 && totDamageToOneMonster > 0) { //뱀피릭 터치
                        SkillStatEffect effs = SkillFactory.getSkill(31121002).getEffect(player.getSkillLevel(31121002));
                        if (player.getParty() == null) {
                            int recover = (int) (totDamageToOneMonster * (effs.getX() / 100.0D));
                            Math.min(recover, (int) (player.getStat().getCurrentMaxHp() * 0.03D));
                            player.addHP(recover);
                        } else {
                            for (MaplePartyCharacter hpc : player.getParty().getMembers()) {
                                if (hpc.isOnline() && hpc.getMapid() == player.getMapId()) {
                                    MapleCharacter pchar = player.getClient().getChannelServer().getPlayerStorage().getCharacterById(hpc.getId());
                                    if (pchar != null) {
                                        int recover = (int) (totDamageToOneMonster * (effs.getX() / 100.0D));
                                        Math.min(recover, (int) (pchar.getStat().getCurrentMaxHp() * 0.03D));
                                        pchar.addHP(recover);
                                    }
                                }
                            }
                        }
                    }
                    /* 엔젤릭버스터 스킬 비활성 */
                    if (GameConstants.isAngelicBuster(player.getJob())) {
                        switch (attack.skill) {
                            case 65001100: //버블 스타
                            case 65101100: //스팅 익스플로전
                            case 65111101: //폴링 스타
                            case 65121100: //프라이멀 로어
                            case 65121101: //트리니티
                                player.getClient().send(AngelicBusterSkill.lockSkill(attack.skill));
                                player.getClient().send(MainPacketCreator.resetActions());
                                break;
                        }
                    }

                    /* 소울 리차지 */
                    if (GameConstants.isAngelicBuster(player.getJob())) {
                        for (AttackPair a : attack.allDamage) {
                            if (a.attack.get(0).getLeft() > 0) {
                                int prop = SkillFactory.getSkill(attack.skill).getEffect(player.getSkillLevel(GameConstants.getLinkedAttackSkill(attack.skill))).getOnActive();
                                switch (attack.skill) {
                                    case 65111007: //소울 시커 (공격)
                                        if (Randomizer.rand(0, 100) <= 30) {
                                            player.getClient().send(AngelicBusterSkill.unlockSkill());
                                            player.getClient().send(AngelicBusterSkill.showRechargeEffect());
                                            player.ea();
                                        }
                                        break;

                                    default:
                                        if (Randomizer.rand(0, 100) <= prop) {
                                            player.getClient().send(AngelicBusterSkill.unlockSkill());
                                            player.getClient().send(AngelicBusterSkill.showRechargeEffect());
                                            player.ea();
                                        }
                                        break;
                                }
                                break;
                            }
                        }
                    }

                    if (player.getSkillLevel(30010112) > 0) { //데몬스퓨리 보스에서 포스 흡수.
                        if (monster.getStats().isBoss()) {
                            stats.addForce(SkillFactory.getSkill(30010112).getEffect(1).getX());
                        }
                    }

                    if (attack.skill != 24120002 && attack.skill != 24100003) {
                        if (player.getSkillLevel(24120002) > 0) { //느와르 카르트
                            if (SkillFactory.getSkill(24120002).getEffect(player.getSkillLevel(24120002)).makeChanceResult() && Randomizer.isSuccess(20)) {
                                player.addCardStack(1);
                                int cardid = player.addCardStackRunningId();
                                player.getMap().broadcastMessage(player, MainPacketCreator.absorbingCardStack(player.getId(), cardid, 24120002, false, 1), true);

                            }
                        } else if (player.getSkillLevel(24100003) > 0) { //블랑 카르트
                            if (SkillFactory.getSkill(24100003).getEffect(player.getSkillLevel(24100003)).makeChanceResult() && Randomizer.isSuccess(20)) {
                                player.addCardStack(1);
                                int cardid = player.addCardStackRunningId();
                                player.getMap().broadcastMessage(player, MainPacketCreator.absorbingCardStack(player.getId(), cardid, 24100003, false, 1), true);
                            }
                        }
                    }
                }

                /*if (totDamageToOneMonster > 0) { //트라이플링 윔
                        if (GameConstants.isWindBreaker(player.getJob())) {
                            int skillid = 0;
                            if (player.getSkillLevel(SkillFactory.getSkill(13120003)) > 0) {
                                skillid = 13120003;
                            } else if (player.getSkillLevel(SkillFactory.getSkill(13110022)) > 0) {
                                skillid = 13110022;
                            } else if (player.getSkillLevel(SkillFactory.getSkill(13101022)) > 0) {
                                skillid = 13100022;
                            }
                            if (skillid != 0) {
                                SkillStatEffect eff = SkillFactory.getSkill(skillid).getEffect(1);
                                if (eff != null) {
                                    if (eff.makeChanceResult()) {
                                        eff.applyAtom(player, 7);
                                    }
                                }
                            }
                        }
                    }*/
                if (attack.skill == 1321012) {  //다크 임페일
                    int y = 0;
                    int z = 0;
                    if (SkillFactory.getSkill(1321012).getEffect(player.getSkillLevel(1321012)).makeChanceResult()) {
                        if (!monster.getStats().isBoss()) {
                            if (player.getSkillLevel(1321012) > 0) {
                                y = SkillFactory.getSkill(1321012).getEffect(player.getSkillLevel(1321012)).getY();
                                z = SkillFactory.getSkill(1321012).getEffect(player.getSkillLevel(1321012)).getZ();
                            } else if (Randomizer.nextInt(100) < y) {
                                totDamageToOneMonster = 99999999;
                            }
                        }
                    }
                }
                if (player.getSkillLevel(1310009) > 0) { // 드래곤 저지먼트
                    SkillStatEffect eff = SkillFactory.getSkill(1310009).getEffect(player.getSkillLevel(1310009));
                    if (eff.makeChanceResult()) {
                        player.addHP((int) Math.min((totDamageToOneMonster * (eff.getX() / 100.0D)), player.getStat().getCurrentMaxHp() / 2)); //체력 회복
                    }
                }
                if (player.getSkillLevel(31010002) > 0) { // 앱졸브 라이프
                    SkillStatEffect eff = SkillFactory.getSkill(31010002).getEffect(player.getSkillLevel(31010002));
                    if (eff.makeChanceResult()) {
                        if (player.exeedCount / 2 > ((player.getSkillLevel(31210006) > 0 ? player.getSkillLevel(31210006) + 5 : 0) + eff.getX())) {
                            player.addHP((int) Math.min((totDamageToOneMonster * ((((player.getSkillLevel(31210006) > 0 ? player.getSkillLevel(31210006) + 5 : 0) + eff.getX()) - ((int) (player.exeedCount / 2))) / 100.0D)) * -1, player.getStat().getCurrentMaxHp() / 2)); //체력 차감
                        } else {
                            player.addHP((int) Math.min((totDamageToOneMonster * ((((player.getSkillLevel(31210006) > 0 ? player.getSkillLevel(31210006) + 5 : 0) + eff.getX()) - ((int) (player.exeedCount / 2))) / 100.0D)), player.getStat().getCurrentMaxHp() / 2)); //체력 회복
                        }
                    }
                }

                if (player.isEquilibrium()) {
                    if (GameConstants.isLightSkills(attack.skill)) {
                        player.addHP((int) Math.min((totDamageToOneMonster * (1 / 100.0D)), player.getStat().getCurrentMaxHp() / 2)); //체력 회복
                    }
                }

                if (attack.skill == 21120006) { //생츄어리 or 콤보 템페스트
                    totDamageToOneMonster = (int) (monster.getStats().isBoss() ? 500000 : (monster.getHp() - 1));
                }

                if (attack.skill == 3111008) { //애로우
                    int x = SkillFactory.getSkill(3111008).getEffect(player.getSkillLevel(3111008)).getX();
                    int recoverhp = (int) (player.getStat().getCurrentMaxHp() * (x / 100.0D));
                    recoverhp = Math.min(recoverhp, player.getStat().getCurrentMaxHp() / 2);
                    recoverhp = (int) Math.min(recoverhp, monster.getMobMaxHp());
                    player.addHP(recoverhp);
                }

                if (attack.skill == 33111006) { //클로우 컷
                    int x = SkillFactory.getSkill(33111006).getEffect(player.getSkillLevel(33111006)).getX();
                    int recoverhp = (int) (player.getStat().getCurrentMaxHp() * (x / 100.0D));
                    recoverhp = Math.min(recoverhp, (int) (player.getStat().getCurrentMaxHp() * 0.15D));
                    recoverhp = (int) Math.min(recoverhp, monster.getMobMaxHp());
                    player.addHP(recoverhp);
                }

                if (attack.skill == 5011002) { //기간틱 백스탭
                    SkillStatEffect eff = SkillFactory.getSkill(5011002).getEffect(player.getSkillLevel(5011002));
                    if (eff.makeChanceResult()) {
                        monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, eff.getSkillStats().getStats("z")), SkillFactory.getSkill(5011002), player.getSkillLevel(attack.skill), null, false);
                        monster.applyStatus(player, monsterStatusEffect, eff.getDuration());
                    }
                }

                if (attack.skill == 5221016) {
                    if (!monster.getStats().isBoss()) {
                        if (totDamageToOneMonster > 0) {
                            totDamageToOneMonster = 99999999;
                        }
                    }
                }

                if (player.getSkillLevel(13111006) > 0) { //윈드 피어싱
                    int x = 0;
                    if (player.getSkillLevel(13110006) > 0) {
                        x = SkillFactory.getSkill(13110006).getEffect(player.getSkillLevel(13110006)).getX();
                    }
                    int recoverhp = (int) (player.getStat().getCurrentMaxHp() * (x / 100.0D));
                    recoverhp = Math.min(recoverhp, player.getStat().getCurrentMaxHp());
                    recoverhp = (int) Math.min(recoverhp, monster.getMobMaxHp());
                    player.addHP(recoverhp);
                }

                /*if (player.getBuffedValue(BuffStats.CTS_Roulette) != null) {
                        //오크통 룰렛 효과
                        int oakid = player.getBuffedValue(BuffStats.CTS_Roulette).intValue();
                        SkillStatEffect eff = SkillFactory.getSkill(5311004).getEffect(player.getSkillLevel(5311004));
                        if (!monster.getStats().isBoss()) {
                            if (oakid == 4) { //암흑 확률 상승
                                if (Randomizer.nextInt(100) < eff.getX()) {
                                    monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.DARKNESS, 1), SkillFactory.getSkill(5311004), player.getSkillLevel(attack.skill), null, false);
                                    monster.applyStatus(player, monsterStatusEffect, eff.getSkillStats().getStats("v") * 1000 * 1000);
                                }
                            } else if (oakid == 3) { //슬로우 확률 상승
                                if (Randomizer.nextInt(100) < eff.getX()) {
                                    monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, eff.getSkillStats().getStats("u")), SkillFactory.getSkill(5311004), player.getSkillLevel(attack.skill), null, false);
                                    monster.applyStatus(player, monsterStatusEffect, eff.getSkillStats().getStats("v") * 1000);
                                }
                            } else if (oakid == 2) { //스턴 확률 상승
                                if (Randomizer.nextInt(100) < eff.getX()) {
                                    monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(5311004), player.getSkillLevel(attack.skill), null, false);
                                    monster.applyStatus(player, monsterStatusEffect, eff.getSkillStats().getStats("v") * 1000);
                                }
                            } else if (oakid == 1) { //결빙 확률 상승 (20%)
                                if (Randomizer.nextInt(100) < eff.getY()) {
                                    monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(5311004), player.getSkillLevel(attack.skill), null, false);
                                    monster.applyStatus(player, monsterStatusEffect, eff.getSkillStats().getStats("v") * 1000);
                                }
                            }
                        }
                    }*/
                if (player.getJob() == 511 || player.getJob() == 512 || player.getJob() == 1511) { //스턴 마스터리
                    if (player.getSkillLevel(5110000) > 0) {
                        SkillStatEffect eff = SkillFactory.getSkill(5110000).getEffect(player.getSkillLevel(5110000));
                        if (Randomizer.nextInt(100) < eff.getSkillStats().getStats("subProp")) {
                            monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(5110000), player.getSkillLevel(attack.skill), null, false);
                            monster.applyStatus(player, monsterStatusEffect, 3000);
                        }
                    }
                    if (player.getSkillLevel(15110010) > 0) {
                        SkillStatEffect eff = SkillFactory.getSkill(15110010).getEffect(player.getSkillLevel(15110010));
                        if (Randomizer.nextInt(100) < eff.getSkillStats().getStats("subProp")) {
                            monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(15110010), player.getSkillLevel(attack.skill), null, false);
                            monster.applyStatus(player, monsterStatusEffect, 3000);
                        }
                    }
                    if (player.getSkillLevel(27101101) > 0) {
                        SkillStatEffect eff = SkillFactory.getSkill(27101101).getEffect(player.getSkillLevel(27101101));
                        if (Randomizer.nextInt(100) < eff.getSkillStats().getStats("subProp")) {
                            monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(27101101), player.getSkillLevel(attack.skill), null, false);
                            monster.applyStatus(player, monsterStatusEffect, 3000);
                        }
                    }
                }

                if (player.getBuffedValue(BuffStats.CTS_BMageAura, 32101004) != null) {
                    ISkill skill = SkillFactory.getSkill(32101004);
                    player.addHP((int) Math.min(totDamage / 5, (totDamage * skill.getEffect(player.getSkillLevel(skill)).getX()) / 100));
                }
                if (player.isActiveBuffedValue(1321054)) {
                    ISkill skill = SkillFactory.getSkill(1321054);
                    player.addHP((int) Math.min(totDamage / 5, (totDamage * skill.getEffect(player.getSkillLevel(skill)).getX()) / 100));
                }
                // effects
                switch (attack.skill) {
                    case 5211006:
                    case 5220011://homing
                    case 22151002: {//killer wing
                        player.setLinkMid(attack.skill, monster.getObjectId());
                        break;
                    }
                    case 4341002: {
                        if (Randomizer.rand(1, 30) <= effect.getZ()) {
                            totDamageToOneMonster = 99999999;
                        }
                        break;
                    }
                    default: //passives attack bonuses
                        if (totDamageToOneMonster > 0) {
                            if (player.getBuffedValue(BuffStats.CTS_IllusionStep) != null) {
                                ISkill skill = SkillFactory.getSkill(3121007);
                                SkillStatEffect eff = skill.getEffect(player.getSkillLevel(skill));
                                if (eff.makeChanceResult()) {
                                    monsterStatusEffect = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, eff.getX()), skill, player.getSkillLevel(attack.skill), null, false);
                                    monster.applyStatus(player, monsterStatusEffect, eff.getY() * 1000);
                                }
                            }
                        }
                        break;
                }

                if (monster.getBuff(MonsterStatus.WEAPON_DAMAGE_REFLECT) != null) {
                    player.addHP(-(7000 + Randomizer.nextInt(8000))); //this is what it seems to be?
                }
                if (player.isActiveBuffedValue(2101010) && attack.skill != 2101010) {
                    SkillStatEffect ignight = SkillFactory.getSkill(2100010).getEffect(attack.skillLevel);
                    if (ignight.makeChanceResult()) {
                        ignight.applyTo(player, monster.getTruePosition());
                    }
                }
                try {
                    if (mobs > 2) {
                        long comboexp = monster.getStats().getExp() / 6;
                        player.send(MainPacketCreator.multikill(mobs, comboexp));
                        player.gainExp(comboexp, false, false, false);
                    }

                    if (attack.skill == 142101003) {
                        if (monster.getKinesisUltimateDeep() < System.currentTimeMillis()) {
                            for (final MonsterStatusEffect mseff : monster.getStati().values()) {
                                mseff.CancelEffect();
                            }
                            monster.setKinesisUltimateDeep(System.currentTimeMillis() + (120 * 1000));
                        }
                    }
                    if (GameConstants.isKinesis(player.getJob()) && attack.skill != 142110011) {
                        short skillLevel = (short) player.getSkillLevel(142110011);
                        if (skillLevel > 0) {
                            SkillStatEffect eff = SkillFactory.getSkill(142110011).getEffect(skillLevel);
                            if (eff.makeChanceResult()) {
                                eff.applyAtom(player, 22);
                            }
                        }
                    }
                    if (monster == null) {
                        continue;
                    }
                    if (player.getBuffedValue(BuffStats.CTS_Ember) != null) {
                        if (attack.skill != 0) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, 1), SkillFactory.getSkill(12101024), player.getSkillLevel(12101024), null, false), (long) 10 * 1000);
                        }
                    }

                    if (attack.skill > 0 && attack.skill != 80001770) {
                        if (GameConstants.isHero(player.getJob())) {
                            AdventureSkillHandler.HeroAttackHandler(player, monster, attack);
                        } else if (GameConstants.isPaladin(player.getJob())) {
                            AdventureSkillHandler.PaladinAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isDarkNight(player.getJob())) {
                            AdventureSkillHandler.DarkNightAttackHandler(player, monster, attack);
                        } else if (GameConstants.isFireMagic(player.getJob())) {
                            AdventureSkillHandler.FireMagicAttackHandler(player, monster, attack);
                        } else if (GameConstants.isIceMagic(player.getJob())) {
                            AdventureSkillHandler.IceMagicAttackHandler(player, monster, attack);
                        } else if (GameConstants.isBiShop(player.getJob())) {
                            AdventureSkillHandler.BiShopAttackHandler(player, monster, attack);
                        } else if (GameConstants.isBowMaster(player.getJob())) {
                            AdventureSkillHandler.BowMasterAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isChiron(player.getJob())) {
                            AdventureSkillHandler.ChironAttackHandler(player, monster, attack);
                        } else if (GameConstants.isNightRoad(player.getJob())) {
                            AdventureSkillHandler.NightRoadAttackHandler(player, monster, attack);
                        } else if (GameConstants.isShador(player.getJob())) {
                            AdventureSkillHandler.ShadorAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isDualBlade(player.getJob())) {
                            AdventureSkillHandler.DualBladeAttack(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isViper(player.getJob())) {
                            AdventureSkillHandler.ViperAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isCannon(player.getJob())) {
                            AdventureSkillHandler.CannonAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isSoulMaster(player.getJob())) {
                            CygnusSkillHandler.SoulMasterAttackHandler(player, monster, attack);
                        } else if (GameConstants.isFlameWizard(player.getJob())) {
                            CygnusSkillHandler.FlameWizardAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isWindBreaker(player.getJob())) {
                            CygnusSkillHandler.WindBreakAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isNightWalker(player.getJob())) {
                            CygnusSkillHandler.NightWalkerAttackHandler(player, monster, attack);
                        } else if (GameConstants.isStriker(player.getJob())) {
                            CygnusSkillHandler.StrikerAttackHandler(player, monster, attack);
                        } else if (GameConstants.isAran(player.getJob())) {
                            HeroSkillHandler.AranAttackHandler(player, monster, attack);
                        } else if (GameConstants.isEvan(player.getJob())) {
                            HeroSkillHandler.EvanAttackHandler(player, monster, attack);
                        } else if (GameConstants.isMercedes(player.getJob())) {
                            HeroSkillHandler.MercedesAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isPhantom(player.getJob())) {
                            HeroSkillHandler.PhantomAttackHandler(player, monster, attack);
                        } else if (GameConstants.isEunWol(player.getJob())) {
                            HeroSkillHandler.EunWolAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isLuminous(player.getJob())) {
                            HeroSkillHandler.LuminousSkillHandler(player, monster, attack, totDamageToOneMonster);
                        }
                    }

                    if (monster.getId() != 9500532 && monster.getId() != 3300005) {
                        monster.damage(player, totDamageToOneMonster, true, attack.skill);
                        if (player.haveItem(0)) { // 아이템 코드 1개면 10억 2개면 20억임 ㅇㅋ? 아오키
                            int check = player.getInventory(GameConstants.getInventoryType(0)).countById(0);
                            long damge = 1000000000 * check;
                            player.send(UIPacket.showInfo("특별 추가 데미지 < " + damge + " >"));
                            monster.damage(player, damge, true, attack.skill);
                        } else if (player.haveItem(0)) {
                            int check = player.getInventory(GameConstants.getInventoryType(0)).countById(0);
                            long damge = 50000000000L * check;
                            player.send(UIPacket.showInfo("특별 추가 데미지 < " + damge + " >"));
                            monster.damage(player, damge, true, attack.skill);
                        } else if (player.haveItem(0)) {
                            int check = player.getInventory(GameConstants.getInventoryType(0)).countById(0);
                            long damge = 100000000000L * check;
                            player.send(UIPacket.showInfo("특별 추가 데미지 < " + damge + " >"));
                            monster.damage(player, damge, true, attack.skill);
                        }
                        if (player.getAddDamage() > 0) {
                            for (int i = 0; i < player.getAddDamageHit(); i++) {
                                player.send(UIPacket.detailShowInfo("추가데미지 < " + player.getAddDamage() + " > 타격 횟수 < " + player.getAddDamageHit() + " >", true));
                                monster.damage(player, player.getAddDamage(), true, attack.skill);
                            }
                        }
                    } else if (monster.getId() == 9500532 && monster.getId() == 3300005) {
                        monster.damage(player, 100, true, attack.skill);
                    }
                    if (!monster.isAlive()) {
                        SkillStatEffect death_eff = player.getBuffedSkillEffect(BuffStats.CTS_BMageDeath);
                        if (death_eff != null) {
                            if (player.deathCount != 10) {
                                player.deathCount++;
                                death_eff.applyToBMDeath(player);
                            }
                        }
                    }
                } catch (Exception e) {
                    if (!ServerConstants.realese) {
                        e.printStackTrace();
                    }
                }
            } else {
                player.send(MobPacket.killMonster(oned.objectid, 1, GameConstants.isAswanMap(player.getMapId())));
            }
        }

        if (effect != null) {
            if (attack.skill != 0 && !effect.isMist()) {
                if (attack.skill != 4341052 && attack.skill != 35111003 && attack.skill != 35001002 && attack.skill != 31121005) { //메타모포시스 재사용 방지
                    effect.applyTo(player, attack.position);
                }
            }
        }
        player.send(MainPacketCreator.SkillUseResult(attack.skill));
    }

    public static void applyAttackMagic(AttackInfo attack, ISkill theSkill, MapleCharacter player, SkillStatEffect effect) {

        long totDamage = 0, totDamageToOneMonster = 0;
        MapleMonsterStats monsterstats;
        final ISkill eaterSkill = SkillFactory.getSkill(GameConstants.getMPEaterForJob(player.getJob()));
        final int eaterLevel = player.getSkillLevel(eaterSkill);

        //int 피브이피맵코드 = 100000203;
        if (player.getMapId() == 100000203) {
            BattleHandler.doPVPattack(player, attack);
        }

        if (player.isGM()) { // 치우씨 : 스킬 정보 뜨게끔 처리
            player.Message("[applyAttackMagic] [skill name : " + SkillFactory.getSkillName(attack.skill) + "] [skill code : " + attack.skill + "] [skill level : " + attack.skillLevel + "] ");
        }

        MapleMap map = player.getMap();
        Integer eachd;
        int mobs = 0;
        for (final AttackPair mob : attack.allDamage) {
            MapleMonster monster = map.getMonsterByOid(mob.objectid);
            int mdmg = 0;
            monster = map.getMonsterByOid(mob.objectid);
            for (Pair<Integer, Boolean> dmg : mob.attack) {
                mdmg += dmg.left;
            }
            if (monster != null) {
                if (monster.getMobMaxHp() - mdmg < 0) {
                    mobs++;
                }
            }
        }

        if ((attack.skill != 0) && (GameConstants.isKinesis(player.getJob()))) {
            player.givePPoint(effect);
        }

        if ((attack.skill != 0) && (GameConstants.isBlaster(player.getJob()))) {
            player.giveBulletGauge(attack.skill, false);
        }

        for (AttackPair oned : attack.allDamage) {
            MapleMonster monster = map.getMonsterByOid(oned.objectid);
            if (monster != null) {
                totDamageToOneMonster = 0;
                monsterstats = monster.getStats();

                if (player.haveItem(3994514, 1, false, true) && monster.getStats() != null
                        && monster.getStats().getLevel() + 20 > player.getLevel() && monster.getStats().getLevel() - 20 <= player.getLevel()) {
                    player.getStat().addSaintSaver(1);
                }

                for (Pair<Integer, Boolean> eachde : oned.attack) {
                    eachd = eachde.left;
                    totDamageToOneMonster += (long) eachd;
                }

                totDamage += totDamageToOneMonster;
                player.checkMonsterAggro(monster);
                if (totDamageToOneMonster > 0) {
                    if (player.getJob() == 221 || player.getJob() == 222) {
                        if (player.getSkillLevel(2210000) > 0) { //익스트림 매직 : 썬/콜
                            if (attack.skill > 0) { //평타는 효과 대상에서 제외
                                final MapleMonster mob = monster;
                                final SkillStatEffect eff = SkillFactory.getSkill(2210000).getEffect(player.getSkillLevel(2210000));
                                if (Randomizer.nextInt(100) < eff.getY()) { //y값 = 즉사가 터질 확률이므로, 확률계산을 해서 확률을 통과한다면,
                                    if (mob.getHp() < (int) (mob.getHp() * (eff.getX() / 100.0D))) { // x값을 통해 x퍼센트의 체력보다 낮은지 확인.
                                        if (!monster.getStats().isBoss()) { //만약 통과한다면, 해당 몬스터는 보스가 아니어야함.
                                            totDamageToOneMonster = 999999999;
                                        }
                                    }
                                }
                            }
                        }
                    }

                    if (player.isEquilibrium()) {
                        if (GameConstants.isLightSkills(attack.skill)) {
                            player.addHP((int) Math.min((totDamageToOneMonster * (1 / 100.0D)), player.getStat().getCurrentMaxHp() / 2)); //체력 회복
                        }
                    }

                    try { //속성 효과.
                        for (IItem item : player.getInventory(MapleInventoryType.EQUIPPED)) {
                            Equip equip = (Equip) item;
                            if (equip.getState() > 1) {
                                int[] potentials = {equip.getPotential1(), equip.getPotential2(), equip.getPotential3(), equip.getPotential4(), equip.getPotential5()};
                                ItemInformation ii = ItemInformation.getInstance();
                                StructPotentialItem pot;
                                for (int i : potentials) {
                                    if (i > 0) {
                                        pot = ii.getPotentialInfo(i).get((ii.getReqLevel(equip.getItemId()) / 10) - 1);
                                        if (pot != null && pot.prop > 0) {
                                            if (Randomizer.nextInt(100) <= pot.prop) {
                                                switch (i) {
                                                    case 10201:
                                                    case 20201:
                                                        player.addHP(pot.HP);
                                                        break;
                                                    case 10202:
                                                    case 20206:
                                                        player.addMP(pot.MP);
                                                        break;
                                                    case 10221:
                                                        //시간을 잘몰라서 5초라 생각하고 구현
                                                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, (int) pot.level), SkillFactory.getSkill(90001003), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                        break;
                                                    case 10226:
                                                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, (int) pot.level), SkillFactory.getSkill(90001001), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                        break;
                                                    case 10231:
                                                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, (int) pot.level), SkillFactory.getSkill(90001002), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                        break;
                                                    case 10236:
                                                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.DARKNESS, (int) pot.level), SkillFactory.getSkill(90001004), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                        break;
                                                    case 10241:
                                                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, (int) pot.level), SkillFactory.getSkill(90001006), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                        break;
                                                    case 10246:
                                                        monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SEAL, (int) pot.level), SkillFactory.getSkill(90001005), player.getSkillLevel(attack.skill), null, false), (long) 5 * 1000);
                                                        break;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }

                        if (player.getJob() == 222 || player.getJob() == 212 || player.getJob() == 232) { //아케인 에임
                            int[] skills = {2120010, 2220010, 2320011};
                            for (int d : skills) {
                                if (player.getSkillLevel(d) > 0) {
                                    if (player.getLastCombo() + 5000 < System.currentTimeMillis()) {
                                        player.acaneAim = 0;
                                        player.clearDamageMeters();
                                    }
                                    if (SkillFactory.getSkill(d).getEffect(player.getSkillLevel(d)).makeChanceResult()) {
                                        player.setLastCombo(System.currentTimeMillis());
                                        if (player.acaneAim < 5) {
                                            player.acaneAim++;
                                        }
                                        SkillFactory.getSkill(d).getEffect(player.getSkillLevel(d)).applyTo(player);
                                    }
                                }
                            }
                        }

                        if (GameConstants.isLuminous(player.getJob())) {
                            SkillStatEffect dkeffect = player.getBuffedSkillEffect(BuffStats.CTS_StackBuff, 27121005);
                            if (dkeffect != null) {
                                if (player.getLastCombo() + 5000 < System.currentTimeMillis()) {
                                    player.acaneAim = 0;
                                    player.clearDamageMeters();
                                }

                                if (dkeffect.makeChanceResult()) {
                                    player.setLastCombo(System.currentTimeMillis());
                                    if (player.acaneAim <= 29) {
                                        player.acaneAim++;
                                        dkeffect.applyTo(player);
                                    }
                                }
                            }
                        }
                    } catch (Exception e) {
                        if (!ServerConstants.realese) {
                            e.printStackTrace();
                        }
                    }

                    if (monster.getBuff(MonsterStatus.MAGIC_DAMAGE_REFLECT) != null) {
                        player.addHP(-(7000 + Randomizer.nextInt(8000))); //this is what it seems to be?
                    }

                    if (GameConstants.isKinesis(player.getJob()) && attack.skill != 142110011) {
                        short skillLevel = (short) player.getSkillLevel(142110011);
                        if (skillLevel > 0) {
                            SkillStatEffect eff = SkillFactory.getSkill(142110011).getEffect(skillLevel);
                            if (eff.makeChanceResult()) {
                                eff.applyAtom(player, 22);
                            }
                        }
                    }

                    if (player.getBuffedValue(BuffStats.CTS_Ember) != null) {
                        if (attack.skill != 0) {
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.Burned, 1), SkillFactory.getSkill(12101024), player.getSkillLevel(12101024), null, false), (long) 10 * 1000);
                        }
                    }

                    if (attack.skill > 0 && attack.skill != 80001770) {
                        if (GameConstants.isHero(player.getJob())) {
                            AdventureSkillHandler.HeroAttackHandler(player, monster, attack);
                        } else if (GameConstants.isPaladin(player.getJob())) {
                            AdventureSkillHandler.PaladinAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isDarkNight(player.getJob())) {
                            AdventureSkillHandler.DarkNightAttackHandler(player, monster, attack);
                        } else if (GameConstants.isFireMagic(player.getJob())) {
                            AdventureSkillHandler.FireMagicAttackHandler(player, monster, attack);
                        } else if (GameConstants.isIceMagic(player.getJob())) {
                            AdventureSkillHandler.IceMagicAttackHandler(player, monster, attack);
                        } else if (GameConstants.isBiShop(player.getJob())) {
                            AdventureSkillHandler.BiShopAttackHandler(player, monster, attack);
                        } else if (GameConstants.isBowMaster(player.getJob())) {
                            AdventureSkillHandler.BowMasterAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isChiron(player.getJob())) {
                            AdventureSkillHandler.ChironAttackHandler(player, monster, attack);
                        } else if (GameConstants.isNightRoad(player.getJob())) {
                            AdventureSkillHandler.NightRoadAttackHandler(player, monster, attack);
                        } else if (GameConstants.isShador(player.getJob())) {
                            AdventureSkillHandler.ShadorAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isDualBlade(player.getJob())) {
                            AdventureSkillHandler.DualBladeAttack(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isViper(player.getJob())) {
                            AdventureSkillHandler.ViperAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isCannon(player.getJob())) {
                            AdventureSkillHandler.CannonAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isSoulMaster(player.getJob())) {
                            CygnusSkillHandler.SoulMasterAttackHandler(player, monster, attack);
                        } else if (GameConstants.isFlameWizard(player.getJob())) {
                            CygnusSkillHandler.FlameWizardAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isWindBreaker(player.getJob())) {
                            CygnusSkillHandler.WindBreakAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isNightWalker(player.getJob())) {
                            CygnusSkillHandler.NightWalkerAttackHandler(player, monster, attack);
                        } else if (GameConstants.isStriker(player.getJob())) {
                            CygnusSkillHandler.StrikerAttackHandler(player, monster, attack);
                        } else if (GameConstants.isAran(player.getJob())) {
                            HeroSkillHandler.AranAttackHandler(player, monster, attack);
                        } else if (GameConstants.isEvan(player.getJob())) {
                            HeroSkillHandler.EvanAttackHandler(player, monster, attack);
                        } else if (GameConstants.isMercedes(player.getJob())) {
                            HeroSkillHandler.MercedesAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isPhantom(player.getJob())) {
                            HeroSkillHandler.PhantomAttackHandler(player, monster, attack);
                        } else if (GameConstants.isEunWol(player.getJob())) {
                            HeroSkillHandler.EunWolAttackHandler(player, monster, attack, totDamageToOneMonster);
                        } else if (GameConstants.isLuminous(player.getJob())) {
                            HeroSkillHandler.LuminousSkillHandler(player, monster, attack, totDamageToOneMonster);
                        }
                    }

                    try { //몬스터 2마리 이상 겉뎀 수정 및 멀티킬.
                        if (mobs > 2) {
                            int comboexp = (int) (monster.getStats().getExp() * ((6 * 100) / 100.0D));
                            player.send(MainPacketCreator.multikill(mobs, comboexp));
                            player.gainExp(comboexp, false, false, false);
                        }
                        if (monster.getId() != 9500532 && monster.getId() != 3300005) {
                            monster.damage(player, totDamageToOneMonster, true, attack.skill);
                            if (player.haveItem(0)) { // 아이템 코드 1개면 10억 2개면 20억임 ㅇㅋ? 아오키
                                int check = player.getInventory(GameConstants.getInventoryType(0)).countById(0);
                                long damge = 1000000000 * check;
                                player.send(UIPacket.showInfo("특별 추가 데미지 < " + damge + " >"));
                                monster.damage(player, damge, true, attack.skill);
                            } else if (player.haveItem(0)) {
                                int check = player.getInventory(GameConstants.getInventoryType(0)).countById(0);
                                long damge = 50000000000L * check;
                                player.send(UIPacket.showInfo("특별 추가 데미지 < " + damge + " >"));
                                monster.damage(player, damge, true, attack.skill);
                            } else if (player.haveItem(0)) {
                                int check = player.getInventory(GameConstants.getInventoryType(0)).countById(0);
                                long damge = 100000000000L * check;
                                player.send(UIPacket.showInfo("특별 추가 데미지 < " + damge + " >"));
                                monster.damage(player, damge, true, attack.skill);
                            }
                            if (player.getAddDamage() > 0) {
                                for (int i = 0; i < player.getAddDamageHit(); i++) {
                                    player.send(UIPacket.detailShowInfo("추가데미지 < " + player.getAddDamage() + " > 타격 횟수 < " + player.getAddDamageHit() + " >", true));
                                    monster.damage(player, player.getAddDamage(), true, attack.skill);
                                }
                            }
                        } else if (monster.getId() == 9500532 && monster.getId() == 3300005) {
                            monster.damage(player, 100, true, attack.skill);
                        }
                        if (!monster.isAlive()) {
                            SkillStatEffect death_eff = player.getBuffedSkillEffect(BuffStats.CTS_BMageDeath);
                            if (death_eff != null) {
                                if (player.deathCount != 10) {
                                    player.deathCount++;
                                    death_eff.applyToBMDeath(player);
                                }
                            }
                        }
                    } catch (Exception e) {
                        if (!ServerConstants.realese) {
                            e.printStackTrace();
                        }
                    }

                    int[] venomskills = {4110011, 4210010, 4320005, 4120005, 4120011, 4220005, 4220011, 4340001, 4340012, 14110004};
                    for (int i : venomskills) {
                        if (i == 4110011) {
                            if (player.getSkillLevel(4120011) > 0) {
                                i = 4120011;
                            }
                        } else if (i == 4210010) {
                            if (player.getSkillLevel(4220011) > 0) {
                                i = 4220011;
                            }
                        }
                        final ISkill skill = SkillFactory.getSkill(i);
                        if (player.getSkillLevel(skill) > 0) {
                            final SkillStatEffect venomEffect = skill.getEffect(player.getSkillLevel(skill));
                            monster = map.getMonsterByOid(oned.objectid);
                            if (venomEffect.makeChanceResult() && monster != null) {
                                monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, venomEffect.getSkillStats().getStats("dot")), SkillFactory.getSkill(i), player.getSkillLevel(attack.skill), null, false), venomEffect.getStatusDuration());
                            }
                            break;
                        }
                    }
                    /*
                    int[] skills = {4120005, 4120011, 4220005, 4220011, 4340001, 4340012};
                    for (int i : skills) {
                        ISkill skill = SkillFactory.getSkill(i);
                        if (player.getSkillLevel(skill) > 0) {
                            SkillStatEffect venomEffect = skill.getEffect(player.getSkillLevel(skill));
                            if (!venomEffect.makeChanceResult()) {
                                break;
                            }
                            monster.applyStatus(player, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, Integer.valueOf(1)), SkillFactory.getSkill(i), player.getSkillLevel(attack.skill), null, false), venomEffect.getStatusDuration());
                            break;
                        }
                    }*/

                    if (player.getBuffedValue(BuffStats.CTS_BMageAura, 32101004) != null) { //콤보 드레인
                        ISkill skill = SkillFactory.getSkill(32101004);
                        player.addHP((int) (Math.min(totDamage / 5, (totDamage * skill.getEffect(player.getSkillLevel(skill)).getX()) / 100)));
                    }
                    if (eaterLevel > 0) {
                        eaterSkill.getEffect(eaterLevel).applyPassive(player, monster);
                    }
                    if (player.isActiveBuffedValue(2101010) && attack.skill != 2101010) {
                        SkillStatEffect ignight = SkillFactory.getSkill(2100010).getEffect(attack.skillLevel);
                        if (ignight.makeChanceResult()) {
                            ignight.applyTo(player, monster.getTruePosition());
                        }
                    }
                }
            }
        }
        if (effect != null && attack.skill != 12120012) {
            if (player.getBuffedValue(BuffStats.CTS_Larkness, 20040216) != null) {

            }
            effect.applyTo(player, player.getTruePosition());
        }
        player.send(MainPacketCreator.SkillUseResult(attack.skill));
    }

    private static void handlePickPocket(final MapleCharacter player, final MapleMonster mob, AttackPair oned) {
        ISkill skill = SkillFactory.getSkill(4211003);
        SkillStatEffect s = skill.getEffect(player.getSkillLevel(skill));
        for (final Pair<Integer, Boolean> eachde : oned.attack) {
            final Integer eachd = eachde.left;
            if (s.makeChanceResult()) {
                EtcTimer.getInstance().schedule(new Runnable() {
                    @Override
                    public void run() {
                        player.getMap().spawnMesoDrop(1, new Point((int) (mob.getPosition().getX()), (int) (mob.getPosition().getY())), mob, player, true, (byte) 0);
                    }
                }, 100L);
            }
        }
    }

    public static final AttackInfo Modify_AttackCrit(final AttackInfo attack, final MapleCharacter player, final int type, final SkillStatEffect effect) {
        if (attack.skill != 4211006 && attack.skill != 3211003 && attack.skill != 4111004) { //blizz + shadow meso + m.e no crits
            final int CriticalRate = player.getStat().passive_sharpeye_rate() + (effect == null ? 0 : effect.getCr());
            final boolean shadow = player.getBuffedValue(BuffStats.CTS_ShadowPartner) != null && (type == 1 || type == 2);
            final List<Integer> damages = new ArrayList<Integer>(), damage = new ArrayList<Integer>();
            int hit, toCrit, mid_att;
            boolean isCritical = false;
            for (AttackPair p : attack.allDamage) {
                if (p.attack != null) {
                    hit = 0;
                    mid_att = shadow ? (p.attack.size() / 2) : p.attack.size();
                    //grab the highest hits
                    toCrit = attack.skill == 4221016 || attack.skill == 3221007 || attack.skill == 23121003 || attack.skill == 4331006 || attack.skill == 21120005 ? mid_att : 0;
                    if (toCrit == 0) {
                        for (Pair<Integer, Boolean> eachd : p.attack) {
                            if (!eachd.right && hit < mid_att) {
                                if (eachd.left > 999999 || Randomizer.nextInt(100) < CriticalRate) {
                                    toCrit++;
                                    isCritical = true;
                                }
                                damage.add(eachd.left);
                            }
                            hit++;
                        }
                        if (toCrit == 0) {
                            damage.clear();
                            continue; //no crits here
                        }
                        Collections.sort(damage); //least to greatest
                        for (int i = damage.size(); i > damage.size() - toCrit; i--) {
                            damages.add(damage.get(i - 1));
                        }
                        damage.clear();
                    }
                    hit = 0;
                    for (Pair<Integer, Boolean> eachd : p.attack) {
                        if (!eachd.right) {
                            if (attack.skill == 4221016) { //assassinate never crit first 3, always crit last
                                eachd.right = hit == 3;
                            } else if (attack.skill == 3221007 || attack.skill == 23121003 || attack.skill == 21120005 || attack.skill == 4331006 || attack.skill == 5221016 || eachd.left > 999999) { //snipe always crit
                                eachd.right = true;
                            } else if (hit >= mid_att) { //shadowpartner copies second half to first half
                                eachd.right = p.attack.get(hit - mid_att).right;
                            } else {
                                //rough calculation
                                eachd.right = damages.contains(eachd.left);
                            }
                            if (eachd.right) {
                                isCritical = true;
                            }
                        }
                        hit++;
                    }
                    damages.clear();
                }
            }
            if (isCritical) {
                if (player.getJob() == 422 && player.flipTheCoin < 5) {
                    player.send(MainPacketCreator.OnOffFlipTheCoin(true));
                }
            }
        }
        return attack;
    }

    public static AttackInfo parseDmgOrb(ReadingMaple lea) {
        AttackInfo ret = new AttackInfo();
        lea.skip(13);
        ret.tbyte = lea.readByte();
        ret.targets = (byte) ((ret.tbyte >>> 4) & 0xF);
        ret.hits = (byte) (ret.tbyte & 0xF);
        ret.skill = lea.readInt();
        ret.skillLevel = lea.readByte();
        lea.skip(7);
        ret.display = lea.readByte();
        ret.animation = lea.readByte();
        lea.skip(5);
        ret.speed = lea.readByte(); // Confirmed
        ret.lastAttackTickCount = lea.readInt(); // Ticks
        ret.csstar = (byte) lea.readInt();
        ret.slot = (byte) lea.readInt();
        int damage, oid;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        ret.allDamage = new ArrayList<AttackPair>();
        byte hitAction;
        for (int i = 0; i < ret.targets; i++) {
            oid = lea.readInt();
            hitAction = lea.readByte();
            lea.skip(19); //added MonsterID
            allDamageNumbers = new ArrayList<Pair<Integer, Boolean>>();
            for (int j = 0; j < ret.hits; j++) {
                damage = lea.readInt();
                allDamageNumbers.add(new Pair<Integer, Boolean>(Integer.valueOf(damage), false));
            }
            lea.skip(9);
            ret.allDamage.add(new AttackPair(Integer.valueOf(oid), allDamageNumbers, hitAction));
        }
        ret.position = lea.readPos();
        return ret;
    }

    public static AttackInfo parseDmgM(ReadingMaple lea, RecvPacketOpcode recv) {
        AttackInfo ret = new AttackInfo();
        lea.skip(1);
        ret.tbyte = lea.readByte();
        ret.targets = (byte) ((ret.tbyte >>> 4) & 0xF);
        ret.hits = (byte) (ret.tbyte & 0xF);
        ret.skill = lea.readInt();
        ret.skillLevel = lea.readByte();
        lea.skip(5); //SET By sch2307
        if (recv == RecvPacketOpcode.MAGNETIC_DAMAGE || recv == RecvPacketOpcode.PASSIVE_ENERGY) {
            lea.skip(1);
        } else {
            lea.skip(2);
        }
        switch (ret.skill) {
            case 2221012:
            case 4221052:
            case 2221052:
            case 5201002: // Gernard
            case 5101014:
            case 5121013:
            case 1311011:
            case 5101012:
            case 4341002:
            case 4341003:
            case 5301001:
            case 5300007:
            case 15101010:
            case 14111006: // Poison bomb
            case 24121000: //얼티밋 드라이브
            case 24121005: //템페스트 오브 카드
            case 25111005:
            case 25121030:
            case 27101202: //보이드 프레셔
            case 27111100: //스펙트럴 라이트
            case 14111023:
            case 14111022:
            case 11121055:
            case 14101021:
            case 27121201: //모닝 스타폴
            case 27120211:
            case 31001000: //데빌 사이더
            case 31101000: //소울 이터
            case 31111005: //데모닉 브레스
            case 32121003: //싸이클론
            case 61111100: //윙비트
            case 61111218: //윙비트
            case 65121003: //소울 레조넌스
            case 65121052: //슈퍼 노바
            case 31201001:
            case 31211001:
            case 35121015: //매시브 파이어 : SPLASH-F
            case 36101001:
            case 36121000:
            case 37121003:
            case 37121052: // 하이퍼 매그넘 펀치
            case 37121055: // 하이퍼 매그넘 펀치
            case 37121056: // 하이퍼 매그넘 펀치
            case 37121057: // 하이퍼 매그넘 펀치
            case 37121058: // 하이퍼 매그넘 펀치
            case 37121059: // 하이퍼 매그넘 펀치
            case 11121052:
            case 12121054:
            case 21120018:
            case 21120019:
            case 21120023:
            case 21120026:
            case 21120027:
            case 22171083:
            case 80001762: // 천둥의 룬
            case 101110101:
            case 101110102:
            case 101110104:
            case 101120200:
                ret.charge = lea.readInt();
                break;
            default:
                ret.charge = 0;
                break;
        }
        lea.skip(GameConstants.OnHideSkillRequest(ret.skill) ? 1 : 0);
        if ((ret.skill == 14000028) || (ret.skill == 14000029) || (ret.skill == 11121055) || (ret.skill == 14111022)
                || (ret.skill == 14121004) || (ret.skill == 14111023) || (ret.skill == 14121052)) {
            lea.skip(4);
        }
        ret.display = lea.readByte();
        ret.animation = lea.readByte();
        if (recv == RecvPacketOpcode.MAGNETIC_DAMAGE) { // 바디프레셔, 텔마, 아수라, 미스트 스킬 등
            lea.skip(4);
        } else if (recv != RecvPacketOpcode.PASSIVE_ENERGY) {
            lea.skip(5); // Weapon class
        }
        ret.speed = lea.readByte(); // Confirmed
        if (recv == RecvPacketOpcode.MAGNETIC_DAMAGE || recv == RecvPacketOpcode.PASSIVE_ENERGY) {
            lea.skip(5);
        }
        ret.lastAttackTickCount = 0; // Ticks
        lea.skip(8);
        if (ret.skill == 35111006 || ret.skill == 4210014 || (recv == RecvPacketOpcode.CLOSE_RANGE_ATTACK && ret.skill != 11121055)) {
            lea.skip(4);
        }
        if (ret.skill == 14000028 || ret.skill == 14000029 || ret.skill == 14111022 || ret.skill == 14111023 || ret.skill == 14121004 || ret.skill == 14121052) {
            lea.skip(2);
        }
        if (GameConstants.isABYTE(ret.skill / 10000) || ret.skill == 14101021) { // 치우씨 :: 블래스터 겉뎀, 제로 겉뎀
            lea.skip(1);
        }
        ret.allDamage = new ArrayList<AttackPair>();
        int oid, damage;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        byte hitAction;
        for (int i = 0; i < ret.targets; i++) {
            oid = lea.readInt();
            hitAction = lea.readByte();
            lea.readByte();
            lea.readByte();
            lea.readByte();
            lea.skip(16); //added MonsterID
            allDamageNumbers = new ArrayList<Pair<Integer, Boolean>>();
            for (int j = 0; j < ret.hits; j++) {
                damage = lea.readInt();
                allDamageNumbers.add(new Pair<Integer, Boolean>(Integer.valueOf(damage), false));
            }
            lea.skip(9); // CRC of monster [Wz Editing], 1.2.250+
            ret.allDamage.add(new AttackPair(Integer.valueOf(oid), allDamageNumbers, hitAction));
        }
        ret.position = lea.readPos();
        return ret;
    }

    public static AttackInfo parseDmgMa(ReadingMaple lea) {
        AttackInfo ret = new AttackInfo();
        lea.skip(1);
        ret.tbyte = lea.readByte();
        ret.targets = (byte) ((ret.tbyte >>> 4) & 0xF);
        ret.hits = (byte) (ret.tbyte & 0xF);
        ret.skill = lea.readInt();
        ret.skillLevel = lea.readByte();
        lea.skip(5);
        switch (ret.skill) {
            case 2121001: // Big Bang
            case 2221001:
            case 2321001:
                ret.charge = lea.readInt();
                break;
            default:
                ret.charge = -1;
                break;
        }
        if (ret.skill == 22171063 || ret.skill == 22141011 || ret.skill == 22140022 || ret.skill == 22171062 || ret.skill == 22111011 || ret.skill == 22110023) { // 치우씨 :: 에반 미싱 스킬 추가
            lea.skip(1);
        }
        if (ret.skill == 22140024) {
            lea.skip(4);
        }
        
        /*if (ret.skill == 142120001 || ret.skill == 142110003 || ret.skill == 142120002) { // 치우씨 :: 이건 따로 처리. 추뎀도 OK.
         //   lea.skip(8);
        }*/
        ret.unk = lea.readByte();
        ret.display = lea.readByte();
        ret.animation = lea.readByte();
        lea.skip(5);
        ret.speed = lea.readByte();
        ret.lastAttackTickCount = lea.readInt();
        lea.skip(4);
        int oid, damage;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        ret.allDamage = new ArrayList<AttackPair>();
        byte hitAction;
        for (int i = 0; i < ret.targets; i++) {
            oid = lea.readInt();
            hitAction = lea.readByte();
            lea.skip(20);
            allDamageNumbers = new ArrayList<Pair<Integer, Boolean>>();
            for (int j = 0; j < ret.hits; j++) {
                damage = lea.readInt();
                allDamageNumbers.add(new Pair<Integer, Boolean>(Integer.valueOf(damage), false));
            }
            lea.skip(9); // CRC of monster [Wz Editing], 1.2.250+
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers, hitAction));
        }
        ret.position = lea.readPos();
        return ret;
    }

    public static AttackInfo parseDmgR(MapleCharacter chr, ReadingMaple lea) {
        AttackInfo ret = new AttackInfo();
        lea.skip(2); //1.2.201+
        ret.tbyte = lea.readByte();
        ret.targets = (byte) ((ret.tbyte >>> 4) & 0xF);
        ret.hits = (byte) (ret.tbyte & 0xF);
        ret.skill = lea.readInt();
        ret.skillLevel = lea.readByte();
        lea.skip(7); //SET By sch2307
        switch (ret.skill) {
            case 3101008:
            case 3111013:
            case 3120019:
            case 3121004:
            case 3121020:
            case 3221001:
            case 4341052:
            case 5220023:
            case 5221004:
            case 5221022:
            case 5311002:
            case 13111002:
            case 13111020:
            case 13121001:
            case 23121000:
            case 33121009:
            case 33121114:
            case 33121214:
            case 35001001:
            case 35101009:
            case 60011216:
            case 14001020:
            case 14101020:
            case 14101021:
            case 14111022:
            case 14111023:
            case 14111020:
            case 14111021:
            case 14121001:
            case 14121002:
            case 14121003:
                lea.skip(4); // extra 4 bytesra 4 bytes
                break;
        }
        lea.skip(4); //1.2.251+
        ret.charge = -1;
        ret.unk = lea.readByte();
        ret.display = lea.readByte();
        ret.animation = lea.readByte();
        lea.skip(5);
        if ((ret.skill == 101000202) || (ret.skill == 101100202) || (ret.skill == 101120200) || (ret.skill == 101110204)) {
            lea.skip(1);
        }
        if ((ret.skill == 3111013) || (ret.skill == 5221022) || (ret.skill == 5220023) || (ret.skill == 95001000) || (ret.skill == 5311010 && ret.targets > 0) || (ret.skill == 5310011)) {
            lea.skip(8);
        }
        if (ret.skill == 23111001 || ret.skill == 36111010) {
            lea.skip(12);
        }
        ret.speed = lea.readByte(); // Confirmed
        ret.lastAttackTickCount = lea.readInt(); // Ticks
        ret.csstar = (byte) lea.readInt();
        ret.slot = (byte) lea.readInt();
        ret.AOE = lea.readByte();

        lea.skip(8); //1.2.251+

        int damage, oid;
        List<Pair<Integer, Boolean>> allDamageNumbers;
        ret.allDamage = new ArrayList<AttackPair>();
        byte hitAction;
        for (int i = 0; i < ret.targets; i++) {
            oid = lea.readInt();
            hitAction = lea.readByte();
            lea.skip(19); //added MonsterID
            allDamageNumbers = new ArrayList<Pair<Integer, Boolean>>();
            for (int j = 0; j < ret.hits; j++) {
                damage = lea.readInt();
                allDamageNumbers.add(new Pair<Integer, Boolean>(damage, false));
            }
            lea.skip(9); // CRC of monster [Wz Editing], 1.2.250+
            ret.allDamage.add(new AttackPair(oid, allDamageNumbers, hitAction));
        }
        ret.position = lea.readPos();
        if (ret.skill == 13111020 || ret.skill == 33121114 || ret.skill == 33121214) {
            lea.skip(4);
        }
        return ret;
    }
}
