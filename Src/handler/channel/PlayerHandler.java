/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package handler.channel;

import client.*;
import client.items.*;
import client.skills.*;
import client.stats.*;
import community.MaplePartyCharacter;
import constants.ServerConstants;
import constants.GameConstants;
import database.MYSQL;

import java.awt.*;

import launch.ChannelServer;
import packet.creators.AndroidPacket;
import packet.creators.CashPacket;
import packet.creators.MainPacketCreator;
import packet.creators.MobPacket;
import packet.creators.UIPacket;
import packet.skills.*;
import packet.transfer.read.ReadingMaple;
import server.items.InventoryManipulator;
import server.items.ItemInformation;
import server.life.*;
import server.maps.FieldLimitType;
import server.maps.MapleMap;
import server.maps.MaplePortal;
import server.maps.MapleSummon;
import server.movement.LifeMovementFragment;
import tools.*;
import tools.RandomStream.Randomizer;
import tools.Timer.BuffTimer;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;
import java.util.Random;
import java.io.File;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.logging.Level;
import java.util.logging.Logger;

import launch.Start;

import packet.creators.LoginPacket;
import packet.opcode.RecvPacketOpcode;
import provider.MapleData;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import scripting.NPCScriptManager;
import server.items.MakerItemFactory;
import server.maps.ArrowFlatter;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleMist;
import server.maps.MapleWorldMapItem;
import server.maps.SummonMovementType;
import server.quest.MapleQuest;
import packet.creators.SoulWeaponPacket;
import server.maps.MapleWreckage;

public class PlayerHandler {

    private static ItemInformation ii = ItemInformation.getInstance();
    private static int 여우령 = 0, Rank = 0;
    public static transient ScheduledFuture<?> diabolicRecoveryTask = null;

    private static int isFinisher(int skillid) {
        switch (skillid) {
            case 1111003:
                return 2;
            case 1121015:
                return 4;
            case 1101012:
                return 1;
        }
        return 0;
    }

    public static void ChangeSkillMacro(ReadingMaple rh, MapleCharacter chr) {
        int num = rh.readByte();
        String name;
        int shout, skill1, skill2, skill3;
        SkillMacro macro;

        for (int i = 0; i < num; i++) {
            name = rh.readMapleAsciiString();
            shout = rh.readByte();
            skill1 = rh.readInt();
            skill2 = rh.readInt();
            skill3 = rh.readInt();

            macro = new SkillMacro(skill1, skill2, skill3, name, shout, i);
            chr.updateMacros(i, macro);
        }
    }

    public static void ChangeKeymap(ReadingMaple rh, MapleCharacter chr) {
        if ((rh.available() != 8) && (chr != null)) { // else = pet auto pot
            rh.skip(4);
            int numChanges = rh.readInt();
            for (int i = 0; i < numChanges; i++) {
                int key = rh.readInt();
                byte type = rh.readByte();
                int action = rh.readInt();
                if ((type == 1) && (action >= 1000)) {
                    ISkill skill = SkillFactory.getSkill(action);
                    if ((skill != null) && (((!skill.isFourthJob()) && (!skill.isBeginnerSkill()) && (skill.isInvisible()) && (chr.getSkillLevel(skill) <= 0)) || (GameConstants.isLinkedAttackSkill(action)) || (action % 10000 < 1000))) {
                        continue;
                    }
                }
                chr.changeKeybinding(key, new MapleKeyBinding(type, action));
            }
        } else {
            int mode = rh.readInt(); //1 : HP, 2 : MP
            int itemId = rh.readInt();
            if (mode == 1) {
                chr.setPetAutoHP(itemId);
            } else {
                chr.setPetAutoMP(itemId);
            }
        }
    }

    public static void ChangeQuickSlot(ReadingMaple rh, MapleCharacter chr) {
        final StringBuilder ret = new StringBuilder();
        for (int i = 0; i < 8; i++) { //really hacky way of doing it
            ret.append(rh.readAsciiString(1));
            rh.skip(3);
        }
        chr.getQuestNAdd(MapleQuest.getInstance(GameConstants.QUICK_SLOT)).setCustomData(ret.toString());
    }

    public static void UseChair(int itemId, MapleClient c, MapleCharacter chr, ReadingMaple rh) {
        IItem toUse = chr.getInventory(MapleInventoryType.SETUP).findById(itemId);

        if (itemId == 3014000 || itemId == 3014001) {
            final String Special = rh.readMapleAsciiString();
            chr.setChairText(Special);
        }
        if (itemId == 3010000 && chr.getMapId() == 3000500) {
            NPCScriptManager.getInstance().start(c, 2003);
        }
        chr.setChair(itemId);
        chr.getMap().broadcastMessage(chr, MainPacketCreator.showChair(chr.getId(), itemId, chr.getChairText()), false);
        c.getSession().writeAndFlush(MainPacketCreator.resetActions());
    }

    public static void CancelChair(short id, MapleClient c, MapleCharacter chr) {
        if (id == -1) { // Cancel Chair
            if (chr.getChair() == 3010587) {
                for (final MapleMapObject mmo : chr.getMap().getMapObjectsInRange(chr.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MIST))) {
                    final MapleMist capsule = (MapleMist) mmo;
                    if (chr.getId() == capsule.getOwner().getId() && capsule.isTimeCapsule()) {
                        chr.getMap().removeMapObject(mmo);
                        chr.getMap().broadcastMessage(MainPacketCreator.removeMist(capsule.getObjectId(), false));
                        break;
                    }
                }
            }
            chr.setChair(0);
            chr.setChairText(null);
            c.getSession().writeAndFlush(MainPacketCreator.cancelChair(chr, -1));
            chr.getMap().broadcastMessage(chr, MainPacketCreator.showChair(chr.getId(), 0, chr.getChairText()), true);
        } else { // Use In-Map Chair
            chr.setChair(id);
            c.getSession().writeAndFlush(MainPacketCreator.cancelChair(chr, id));
        }
    }

    public static void TrockAddMap(ReadingMaple rh, MapleClient c, MapleCharacter chr) {
        byte addrem = rh.readByte();
        byte vip = rh.readByte();

        if (addrem == 0) {
            chr.deleteFromTrockMaps(vip, rh.readInt());
        } else if (addrem == 1) {
            if (chr.getMap().getForcedReturnId() == 999999999) {
                chr.addTrockMap(vip, chr.getMapId());
            }
        }
        c.getSession().writeAndFlush(CashPacket.getTrockRefresh(chr, vip, addrem == 3));
    }

    public static void CharInfoRequest(int objectid, MapleClient c, MapleCharacter chr) {
        MapleCharacter player = (MapleCharacter) c.getPlayer().getMap().getMapObject(objectid);
        if (player != null) {
            if (!player.isGM() || (c.getPlayer().isGM() && player.isGM())) {
                c.getSession().writeAndFlush(MainPacketCreator.getCharInfo(player, c.getPlayer().equals(player)));
            } else {
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            }
        }
    }

    public static void absorbingDF(ReadingMaple rh, MapleClient c) {
        int size = rh.readInt();
        int skillid = rh.readInt();
        /*시커 테스트*/
        int room = 0;
        byte unk = 0;
        int sn = 0;
        for (int i = 0; i < size; i++) {
            room = GameConstants.isDemonAvenger(c.getPlayer().getJob()) || c.getPlayer().getJob() == 212 ? 0 : rh.readInt();
            unk = rh.readByte();
            sn = rh.readInt();
            if (GameConstants.isDemonSlayer(c.getPlayer().getJob())) {
                c.getPlayer().addMP(c.getPlayer().getStat().getForce(room));
            }
            /*if (rh.available() > 0 && !GameConstants.isMechanic(c.getPlayer().getJob()) && !GameConstants.isBattleMage(c.getPlayer().getJob()) && !GameConstants.isPhantom(c.getPlayer().getJob()) && !GameConstants.isWindBreaker(c.getPlayer().getJob()) && !GameConstants.isNightWalker(c.getPlayer().getJob()) && !GameConstants.isAngelicBuster(c.getPlayer().getJob())) { //제발 예외처리좀 하자
                unk = rh.readByte();
                sn = rh.readInt();
            }*/
            if (GameConstants.isEunWol(c.getPlayer().getJob()) && 여우령 != 0) {
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.absorbingRFG(c.getPlayer().getId(), skillid, sn));
                여우령 = 여우령 - 50;
            }
            if (GameConstants.isAngelicBuster(c.getPlayer().getJob())) {
                boolean rand = Randomizer.isSuccess(80);
                if (rand) {
                    c.getPlayer().getMap().broadcastMessage(AngelicBusterSkill.SoulSeekerRegen(c.getPlayer(), sn));
                }
            }
            if ((GameConstants.isDemonAvenger(c.getPlayer().getJob())) && rh.available() >= 8) {
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.ShieldChacingRe(c.getPlayer().getId(), rh.readInt(), rh.readInt(), unk, c.getPlayer().getKeyValue2("schacing")));
                break;
            }

            switch (skillid) {
                case 14000028: {
                    int objectID = sn;
                    MapleMonster beforeTarget = c.getPlayer().getMap().getMonsterByOid(objectID);
                    final List<MapleMapObject> mobs_ = c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 1366 * 768, Arrays.asList(MapleMapObjectType.MONSTER));
                    int nextTarget = 0;
                    if (mobs_.size() > 0) {
                        for (final MapleMapObject mo : mobs_) {
                            MapleMonster mons = (MapleMonster) mo;
                            if (mons.getObjectId() != objectID) {
                                nextTarget = mons.getObjectId();
                                break;
                            }
                        }
                    }
                    if (beforeTarget == null || nextTarget == 0) {
                        return;
                    }
                    c.getPlayer().dropMessage(5, "beforeOid : " + objectID + ", nextTarget : " + nextTarget + ", posX : " + beforeTarget.getPosition().x + ", posY : " + beforeTarget.getPosition().y);
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.giveShadowBatBounce(c.getPlayer().getId(), objectID, nextTarget, beforeTarget.getPosition().x, beforeTarget.getPosition().y));
                    break;
                }
                case 14000029: {
                    int beforeTarget = sn;
                    int beforeX = rh.readShort();
                    int beforeY = rh.readShort();

                    int nextTarget = rh.readInt();
                    int posX = rh.readInt();
                    int posY = rh.readInt();
                    c.getPlayer().setShadowAttackCount(c.getPlayer().getShadowAttackCount() + 1);
                    if (c.getPlayer().getShadowAttackCount() >= c.getPlayer().getShadowBatMobCount() - 1) {
                        c.getPlayer().setShadowAttackCount(0);
                        return;
                    }
                    c.getPlayer().dropMessage(5, "oid1 : " + beforeTarget + " oid2 : " + nextTarget + ", posX : " + posX + ", posY : " + posY);
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.giveShadowBatBounce(c.getPlayer().getId(), beforeTarget, nextTarget, posX, posY));
                    break;
                }
            }
        }
    }

    public static void ArrowFlatterAction(ReadingMaple rh, final MapleCharacter chr) {
        final ArrowFlatter be = chr.getMap().getArrowFlatter(chr.getId());
        if (be != null) {
            chr.getMap().broadcastMessage(MainPacketCreator.cancelArrowFlatter(be.getObjectId(), be.getArrow()));
            chr.getMap().removeMapObject(be);
        }
        final int arrow = rh.readByte();
        final Point pos = rh.readIntPos();
        final ArrowFlatter arrowflatter = new ArrowFlatter(chr.getId(), System.currentTimeMillis() + 30000, pos, arrow);
        chr.getMap().spawnArrowFlatter(arrowflatter);
    }

    public static void absorbingSword(ReadingMaple rh, MapleCharacter chr) {
        if (!chr.isAlive()) {
            chr.getClient().getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        final int mobcount = rh.readInt();
        final List<Integer> oids = new ArrayList<>();
        for (int i = 0; i < mobcount; i++) {
            oids.add(rh.readInt());
        }
        int skillid = chr.getBuffedSkillEffect(BuffStats.CTS_StopForceAtomInfo).getSourceId();
        chr.getMap().broadcastMessage(KaiserSkill.absorbingSwordCount(chr.getId(), oids, skillid));
        chr.cancelEffect(chr.getBuffedSkillEffect(BuffStats.CTS_StopForceAtomInfo), false, chr.getBuffedStarttime(BuffStats.CTS_StopForceAtomInfo, skillid));
    }

    public static void TakeDamage(ReadingMaple rh, MapleClient c, MapleCharacter chr) throws InterruptedException {
        // <1:46:19> - [Receive] : TAKE_DAMAGE [185] : 리시브 데이터 : 00 E0 00 00 00 00 01 2D A1 07 00 07 8B 02 F4 FE 8B 02 12 FF 00 00 00 00 00 00 00 00 00 00 00 00 00 00
        rh.skip(4); // Ticks 26 91 41 EB 
        rh.skip(4); // B0 36 8B 01  
        byte type = rh.readByte(); // FF 
        rh.skip(1); // Element - 0x00 = elementless, 0x01 = ice, 0x02 = fire, 0x03 = lightning 00
        int damage = rh.readInt(); // 01 00 00 00 
        final int odamage = damage;

        int oid = 0; // 00 00 4F 35 7C 00 23 A1 07 00 00 39 06 51 00
        int monsteridfrom = 0;
        int reflect = 0;
        byte direction = 0;
        int pos_x = 0;
        int pos_y = 0;
        int fake = 0;
        int mpattack = 0;
        boolean is_pg = false;
        boolean isDeadlyAttack = false;
        boolean guardianSpiritActivated = false;
        MapleMonster attacker = null;
        MapleCharacter attacker2 = null;
        MapleMapObject attacke = null;
        PlayerStats stats = chr.getStat();
        rh.skip(2); // 00 00 
        if (type != -2 && type != -3 && type != -4 && type != -6) { // Not map damage
            monsteridfrom = rh.readInt(); // 4F 35 7C 00 
            oid = rh.readInt(); // 2D A1 07 00 
            attacker = (MapleMonster) chr.getMap().getMonsterByOid(oid);
            direction = rh.readByte(); // 00 

            if (GameConstants.isCannon(chr.getJob())) {
                if (chr.getSkillLevel(5310009) > 0) {
                    rh.skip(4);
                    int redamage = rh.readInt();
                    attacker.damage(chr, redamage, true, oid);
                }
            }

            if (chr.isActiveBuffedValue(36111004)) {
                chr.getMap().broadcastMessage(chr, MainPacketCreator.EazisSystem(chr.getId(), oid), true);
            }

            if (chr.getSkillLevel(12000024) > 0) {
                int minermp = (int) (damage * 0.8);
                damage -= minermp;
                chr.addMP(-minermp);
            }

            SkillStatEffect eff = chr.getBuffedSkillEffect(BuffStats.CTS_StackBuff, 36111003);
            if (eff != null && damage == -1) {
                if (eff.makeChanceResult()) {
                    chr.dualBrid++;
                    if (chr.dualBrid >= 10) {
                        chr.cancelEffectFromBuffStat(BuffStats.CTS_StackBuff, 36111003);
                    } else {
                        eff.applyTo(chr);
                    }
                }
            }

            if (GameConstants.isDualBlade(chr.getJob())) {
                if (chr.getSkillLevel(4330001) > 0) {
                    if (chr.getBuffedValue(BuffStats.CTS_DarkSight, 4330001) == null) {
                        if (Randomizer.isSuccess(20)) {
                            SkillFactory.getSkill(4330001).getEffect(chr.getSkillLevel(4330001)).applyTo(chr);
                        }
                    }
                }
            }

            if (chr.getJob() >= 433 && chr.getJob() <= 434 && damage != -1) {
                if (chr.getSkillLevel(4330009) > 0) {
                    if (Randomizer.rand(1, 100) <= SkillFactory.getSkill(4330009).getEffect(chr.getSkillLevel(4330009)).getER()) {
                        damage = -1;
                        SkillFactory.getSkill(4330009).getEffect(chr.getSkillLevel(4330009)).applyTo(chr);
                    }
                }
            }
            if (damage != -1) {
                if ((chr.getJob() >= 411 && chr.getJob() <= 412) || (chr.getJob() >= 421 && chr.getJob() <= 422) || (chr.getJob() >= 1411 && chr.getJob() <= 1412)) {
                    int v1 = chr.getJob() >= 411 && chr.getJob() <= 412 ? 4111007 : chr.getJob() >= 421 && chr.getJob() <= 422 ? 4211007 : 14111010;
                    for (Pair<Integer, MapleSummon> s : chr.getSummons().values()) {
                        if (s.getLeft() == v1) {
                            final List<SummonAttackEntry> allDamage = new ArrayList<SummonAttackEntry>();
                            List<Integer> dmg = new ArrayList<Integer>();
                            dmg.add(damage * 13);
                            allDamage.add(new SummonAttackEntry(attacker, dmg));
                            SkillStatEffect e = SkillFactory.getSkill(v1).getEffect(chr.getSkillLevel(v1));
                            int refDmg = (int) (e.getX() * 0.01) * damage;
                            chr.getMap().broadcastMessage(chr, MainPacketCreator.summonAttack(chr.getId(), s.getRight().getObjectId(), (byte) 0x86, (byte) 0x11, allDamage, chr.getLevel(), true, 0), s.getRight().getPosition());
                            attacker.damage(chr, refDmg, true, v1); // 데미지 제한
                        }
                    }
                }
            }
            if (type != -1) { // Bump damage
                MobAttackInfo attackInfo = MobAttackInfoFactory.getInstance().getMobAttackInfo(attacker, type);
                if (attackInfo != null) {
                    if (attackInfo.isDeadlyAttack()) {
                        isDeadlyAttack = true;
                        mpattack = stats.getMp() - 1;
                    } else {
                        mpattack += attackInfo.getMpBurn();
                    }
                    MobSkill skill = MobSkillFactory.getMobSkill(attackInfo.getDiseaseSkill(), attackInfo.getDiseaseLevel());
                    if (skill != null && (damage == -1 || damage > 0)) {
                        skill.applyEffect(chr, attacker, false);
                    }
                    attacker.setMp(attacker.getMp() - attackInfo.getMpCon());
                }
            }
        } else if (type == -6) {
            chr.addHP(-chr.getStat().getCurrentMaxHp());
        }

        /* 홀리 매직쉘 가드 카운트 차감 */
        if (chr.getBuffedValue(BuffStats.CTS_HolyMagicShell) != null) {
            if (chr.getKeyValue2("HolyMagicShellLifeCount") != 0 && chr.getKeyValue2("HolyMagicShellLifeCount") != -1) {
                int life = chr.getKeyValue2("HolyMagicShellLifeCount");
                if (life > 0) {
                    life--;
                }
                chr.setKeyValue2("HolyMagicShellLifeCount", life);
                if (life == 0) {
                    chr.cancelEffectFromBuffStat(BuffStats.CTS_HolyMagicShell, -1);
                }
            }
        }

        if (GameConstants.isXenon(chr.getJob())) {
            if (Randomizer.isSuccess(60)) {
                chr.giveSurPlus(1);
            }
        }

        if (GameConstants.isZero(chr.getJob())) {
            if (chr.getGender() == 0 && chr.getSecondGender() == 1) {
                if (chr.getSkillLevel(101120109) > 0) {
                    SkillStatEffect effects = SkillFactory.getSkill(101120109).getEffect(chr.getSkillLevel(101120109));
                    //effects.applyTo(chr);
                    //damage -= damage;
                }
            }
        }

        if (chr.getBuffedValue(BuffStats.CTS_BlessingArmor, 1210016) != null) {
            int guardCount = chr.getBuffedValue(BuffStats.CTS_BlessingArmor, 1210016).intValue();
            if (guardCount == 0) {
                chr.cancelEffectFromBuffStat(BuffStats.CTS_BlessingArmor, 1210016);
            } else {
                chr.setBuffedValue(BuffStats.CTS_BlessingArmor, 1210016, guardCount - 1);
            }
        }

        if (damage == -1) {
            if (chr.getJob() / 100 == 4) {
                fake = 4020002 + ((chr.getJob() / 10 - 40) * 100000);
            } else if (chr.getJob() == 122) { //가디언 이리스
                fake = 1220006;
                guardianSpiritActivated = true;
            } else if (GameConstants.isMercedes(chr.getJob())) {
                fake = 23000001;
            } else if (chr.getJob() == 512) { //가드 크러쉬
                fake = 5120014;
            }
        }
        if (damage == 0) { //가드
            if (chr.getSkillLevel(31110008) > 0) {
                SkillStatEffect effs = SkillFactory.getSkill(31110008).getEffect(chr.getSkillLevel(31110008));
                int recHP = (int) (chr.getStat().getCurrentMaxHp() * (effs.getY() / 100.0D));
                int recMP = effs.getZ();
                chr.addHP(recHP);
                chr.addMP(recMP);
                chr.handleForceGain(oid, 31110008, chr.getStat().addForce(effs.getZ()));
            }
        }

        if (chr.getJob() == 2711 || chr.getJob() == 2712) {
            if (chr.getSkillLevel(27110007) > 0) { // 라이프 타이달
                ISkill skill = SkillFactory.getSkill(27110007);
                int critical = chr.getSkillLevel(skill);
                if ((chr.getStat().getHp() / chr.getStat().getCurrentMaxHp()) * 100 < (chr.getStat().getMp() / chr.getStat().getCurrentMaxMp()) * 100) {
                    c.send(MainPacketCreator.giveLifeTidal(false, skill.getEffect(critical).getX()));
                } else if ((chr.getStat().getHp() / chr.getStat().getCurrentMaxHp()) * 100 > (chr.getStat().getMp() / chr.getStat().getCurrentMaxMp()) * 100) {
                    if (critical > 0) {
                        chr.getStat().passive_sharpeye_rate += skill.getEffect(critical).getProb();
                        chr.getStat().passive_sharpeye_min_percent += skill.getEffect(critical).getCriticalMin();
                        c.send(MainPacketCreator.giveLifeTidal(true, skill.getEffect(critical).getProb()));
                    }
                }
            }
        }
        if (damage > 0) {
            if (chr.getBuffedValue(BuffStats.CTS_Morph) != null) {
                chr.cancelCTS_Morphs();
            }

            if (type == -1) {
                if (chr.getBuffedValue(BuffStats.CTS_PowerGuard) != null) {
                    attacker = (MapleMonster) chr.getMap().getMapObject(oid);
                    if (attacker != null) {
                        long bouncedamage = (int) (damage * (chr.getBuffedValue(BuffStats.CTS_PowerGuard).doubleValue() / 100));
                        bouncedamage = (int) Math.min(bouncedamage, attacker.getMobMaxHp() / 2);
                        if (chr.getKeyValue("maxdamage") != null) {
                            bouncedamage += Long.parseLong(chr.getKeyValue("maxdamage"));
                        }
                        if (GameConstants.isMechanic(chr.getJob())) {
                            attacker.damage(chr, bouncedamage, true, 35101007);
                        } else {
                            attacker.damage(chr, bouncedamage, true, 0);
                        }
                        chr.checkMonsterAggro(attacker);
                        damage -= bouncedamage;
                        chr.getMap().broadcastMessage(chr, MobPacket.damageMonster(oid, bouncedamage), chr.getPosition());
                        if (GameConstants.isDemonSlayer(chr.getJob())) { //다크 리벤지 효과
                            if (chr.getBuffedValue(BuffStats.CTS_PowerGuard, 31101003) != null) {
                                SkillStatEffect skills = SkillFactory.getSkill(31101003).getEffect(chr.getSkillLevel(31101003));
                                if (skills.makeChanceResult()) {
                                    attacker.applyStatus(chr, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.FREEZE, 1), SkillFactory.getSkill(31101003), chr.getSkillLevel(31101003), null, false), skills.getStatusDuration());
                                }
                            }
                        }
                        is_pg = true;
                    }
                } else if (chr.getBuffedValue(BuffStats.CTS_BlessOfDarkness) != null) {
                    attacker = (MapleMonster) chr.getMap().getMapObject(oid);
                    if (attacker != null) {
                        int reducedamage = (int) (damage * (chr.getBuffedValue(BuffStats.CTS_BlessOfDarkness).doubleValue() / 100));
                        damage = reducedamage;
                        chr.setBlessOfDark((byte) (chr.getBlessOfDark() - 1));
                        if (chr.getBlessOfDark() == 0) {
                            chr.cancelEffect(SkillFactory.getSkill(27100003).getEffect(1), false, -1);
                        } else {
                            SkillFactory.getSkill(27100003).getEffect(chr.getSkillLevel(27100003)).applyTo(chr);
                        }
                    }
                } else if (chr.getSkillLevel(4221006) > 0) {
                    for (final MapleMist mist : chr.getMap().getAllMistsThreadsafe()) {
                        if (mist.getSourceSkill() != null) {
                            if (mist.getSourceSkill().getId() == 4221006) {
                                for (final MapleMapObject mo : chr.getMap().getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.PLAYER))) {
                                    if (((MapleCharacter) mo).getId() == chr.getId()) {
                                        damage = 0;
                                    }
                                }
                            }
                        }
                    }
                }
            } else if (type != -2 && type != -3 && type != -4) { //-2, -3, -4 : Map Damage
                switch (chr.getJob()) {
                    case 112: {
                        ISkill skill = SkillFactory.getSkill(1120004);
                        if (chr.getSkillLevel(1120004) > 0) {
                            damage = (int) ((skill.getEffect(chr.getSkillLevel(skill)).getX() / 1000.0) * damage);
                        }
                        break;
                    }
                    case 122: {
                        ISkill skill = SkillFactory.getSkill(1220005);
                        if (chr.getSkillLevel(1220005) > 0) {
                            damage = (int) ((skill.getEffect(chr.getSkillLevel(skill)).getX() / 1000.0) * damage);
                        }
                        break;
                    }
                    case 132: {
                        ISkill skill = SkillFactory.getSkill(1320005);
                        if (chr.getSkillLevel(1320005) > 0) {
                            damage = (int) ((skill.getEffect(chr.getSkillLevel(skill)).getX() / 1000.0) * damage);
                        }
                        break;
                    }
                }
            }
            int hploss = 0;
            int mploss = 0;
            if (chr.getBuffedValue(BuffStats.CTS_PartyBarrier) != null) {
                damage -= (int) Math.ceil(damage / 10);
                if (chr.getParty() != null) {
                    for (MaplePartyCharacter pPlayer : chr.getParty().getMembers()) {
                        final MapleCharacter player = chr.getClient().getChannelServer().getPlayerStorage().getCharacterById(pPlayer.getId());
                        player.addHP((int) Math.ceil(damage / 10));
                    }
                }
            }
            if (chr.getBuffedValue(BuffStats.CTS_MagicGuard) != null || chr.getSkillLevel(27000003) > 0) {
                if (isDeadlyAttack) {
                    if (stats.getHp() > 1) {
                        hploss = stats.getHp() - 1;
                    }
                    if (stats.getMp() > 1) {
                        mploss = stats.getMp() - 1;
                    }
                } else {
                    if (chr.getSkillLevel(27000003) > 0) {
                        ISkill skill = SkillFactory.getSkill(27000003);
                        SkillStatEffect eff = skill.getEffect(chr.getSkillLevel(skill));
                        mploss = (int) (damage * (eff.getX() / 100.0));
                    } else {
                        mploss = (int) (damage * (chr.getBuffedValue(BuffStats.CTS_MagicGuard).doubleValue() / 100.0));
                    }
                    hploss = damage - mploss;
                    mpattack += mploss;

                    if (mploss > stats.getMp()) {
                        hploss += mploss - stats.getMp();
                        mpattack = stats.getMp();
                    }
                }
            }
            if (chr.getBuffedValue(BuffStats.CTS_MesoGuard) != null) {
                damage = (damage % 2 == 0) ? damage / 2 : (damage / 2) + 1;

                int mesoloss = (int) (damage * (chr.getBuffedValue(BuffStats.CTS_MesoGuard).doubleValue() / 100.0));
                if (chr.getMeso() < mesoloss) {
                    chr.gainMeso(-chr.getMeso(), false);
                    chr.cancelEffectFromBuffStat(BuffStats.CTS_MesoGuard, -1);
                } else {
                    chr.gainMeso(-mesoloss, false);
                }
                if (isDeadlyAttack && stats.getMp() > 1) {
                    mpattack = stats.getMp() - 1;
                }
            }
            if (chr.getBuffedValue(BuffStats.CTS_Stance, 22181004) != null) { //오닉스의 의지
                int level = chr.getSkillLevel(22181004);
                int lessDaMper = (int) (new CaltechEval("5+d(" + level + "/2)").evaluate());
                if (hploss > 0) {
                    int lessDaM = (int) (hploss * (lessDaMper / 100.0D));
                    hploss -= lessDaM;
                } else {
                    int lessDaM = (int) (damage * (lessDaMper / 100.0D));
                    damage -= lessDaM;
                }
            }

            if (chr.getSkillLevel(1210016) > 0 && (chr.getJob() == 121 || chr.getJob() == 122)) { //블래싱 아머
                SkillStatEffect effect = SkillFactory.getSkill(1210016).getEffect(chr.getSkillLevel(1210016));
                if (!chr.skillisCooling(1210016)) {
                    if (effect.makeChanceResult()) {
                        effect.applyTo(chr);
                        chr.addCooldown(1210016, System.currentTimeMillis(), effect.getCooldown());
                        chr.getClient().getSession().writeAndFlush(MainPacketCreator.skillCooldown(1210016, 0, chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                    }
                }
            }
            if ((chr.getJob() == 512 || chr.getJob() == 522) && chr.getBuffedValue(BuffStats.CTS_DamR) == null && chr.getSkillLevel(chr.getJob() == 512 ? 5120011 : 5220012) > 0) {
                final ISkill divine = SkillFactory.getSkill(chr.getJob() == 512 ? 5120011 : 5220012);
                SkillStatEffect effect = divine.getEffect(chr.getSkillLevel(chr.getJob() == 512 ? 5120011 : 5220012));
                if (chr.getSkillLevel(divine) > 0 && !chr.skillisCooling(divine.getId())) {
                    final SkillStatEffect divineShield = divine.getEffect(chr.getSkillLevel(divine));
                    if (divineShield.makeChanceResult()) {
                        divineShield.applyTo(chr);
                        chr.addCooldown(chr.getJob() == 512 ? 5120011 : 5220012, System.currentTimeMillis(), effect.getCooldown());
                    }
                }
            }

            if (attacker != null && chr.getBuffedValue(BuffStats.CTS_Beholder, 1301013) != null && chr.getSkillLevel(1320011) > 0 && chr.getSummons().get(1301013) != null) {
                if (!chr.skillisCooling(1320011)) {
                    for (Pair<Integer, MapleSummon> summon : chr.getSummons().values()) {
                        if (summon.getLeft() == 1301013) {
                            chr.getMap().broadcastMessage(MainPacketCreator.SummonBeholderRevengeAttack(chr.getId(), summon.getRight().getObjectId(), oid));
                        }
                    }
                }
            }
            if (damage > odamage) {
                damage = odamage;
            }
            if (isDeadlyAttack) {
                chr.addMPHP(stats.getHp() > 1 ? -(stats.getHp() - 1) : 0, stats.getMp() > 1 ? -(stats.getMp() - 1) : 0);
            } else {
                chr.addMPHP(hploss > 0 ? -hploss : -damage, -mpattack);
            }
            c.getPlayer().dropMessage(6, "mpattack : " + mpattack + "");
        }

        if (guardianSpiritActivated) {
            rh.skip(11);
            int gsOid = rh.readInt();
            MapleMonster gsMob = (MapleMonster) chr.getMap().getMonsterByOid(gsOid);
            if (!gsMob.getStats().isBoss()) {
                gsMob.applyStatus(chr, new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.STUN, 1), SkillFactory.getSkill(1220006), chr.getSkillLevel(1220006), null, false), SkillFactory.getSkill(1220006).getEffect(chr.getSkillLevel(1220006)).getStatusDuration());
            }
        }
        if (!chr.isHidden()) {
            chr.getMap().broadcastMessage(chr, MainPacketCreator.damagePlayer(type, monsteridfrom, chr.getId(), damage, fake, direction, reflect, is_pg, oid, pos_x, pos_y), false);
        }
    }

    public static void AranGainCombo(MapleClient c, MapleCharacter chr) {
        if (GameConstants.isAran(chr.getJob())) {
            short combo = chr.getCombo();
            long curr = System.currentTimeMillis();
            combo++;
            chr.updateCombo(combo, curr);
        }
    }

    public static void AranLoseCombo(MapleClient c, MapleCharacter chr) {
        if (GameConstants.isAran(chr.getJob())) {
            final short losecombo = (short) ((chr.getCombo() / 100) + 1);
            chr.updateCombo((short) (chr.getCombo() - losecombo), System.currentTimeMillis());
        }
    }

    public static void BlessOfDarkness(MapleCharacter chr) {
        if (chr.getJob() >= 2710 && chr.getJob() <= 2712) {
            if (chr.getBlessOfDark() < 3) {
                chr.setBlessOfDark((byte) (chr.getBlessOfDark() + 1));
                SkillFactory.getSkill(27100003).getEffect(chr.getSkillLevel(27100003)).applyTo(chr);
            }
        }
    }

    public static void UseItemEffect(int itemId, MapleClient c, MapleCharacter chr) {
        IItem toUse = chr.getInventory(MapleInventoryType.CASH).findById(itemId);
        if (toUse == null || toUse.getItemId() != itemId || toUse.getQuantity() < 1) {
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        chr.setItemEffect(itemId);
        chr.getMap().broadcastMessage(chr, MainPacketCreator.itemEffect(chr.getId(), itemId), false);
    }

    public static void CancelItemEffect(int id, MapleCharacter chr) {
        if (GameConstants.isAngelicBlessBuffEffectItem(id)) {
            return;
        }
        if (GameConstants.isAngelicBlessBuffEffectItem(-id)) {
            return;
        }
        chr.cancelEffect(ItemInformation.getInstance().getItemEffect(-id), false, -1);
    }

    public static void CancelBuffHandler(int sourceid, MapleCharacter chr, ReadingMaple rh) {
        if (chr.getSkillEffect() != null) {
            if (chr.getSkillEffect().getSkillId() == sourceid) {
                chr.setSkillEffect(null);
                chr.getMap().broadcastMessage(chr, MainPacketCreator.skillCancel(chr, sourceid), false);
            }
        }
        Map<SkillStatEffect, Long> bsvhs = new HashMap<>();
        chr.getEffects().entrySet().stream().forEach((Entry<BuffStats, List<BuffStatsValueHolder>> effect) -> {
            effect.getValue().stream().filter((bsvh) -> (!bsvhs.containsKey(bsvh.effect) && bsvh.effect.getSourceId() == sourceid)).forEach((bsvh) -> {
                bsvhs.put(bsvh.effect, bsvh.startTime);
            });
        });
        bsvhs.entrySet().stream().forEach((bsvh) -> {
            chr.cancelEffect(bsvh.getKey(), false, bsvh.getValue());
        });
        chr.send(MainPacketCreator.SkillUseResult(sourceid));
        chr.ea();
        switch (sourceid) {
            case 14111024:
                for (final Pair<Integer, MapleSummon> summon : chr.getSummons().values()) {
                    if (summon.getLeft() == 14111024) {
                        summon.getRight().removeSummon(chr.getMap());
                        chr.getMap().removeMapObject(summon.getRight());
                        chr.getMap().broadcastMessage(MainPacketCreator.removeSummon(summon.getRight(), true));
                    }
                }
                chr.getClient().getSession().writeAndFlush(CygnusSkill.CancelShadowServant());
                chr.cancelEffectFromBuffStat(BuffStats.CTS_ShadowServant, 14111024);
                break;
            case 14121054:
            case 14121055:
                for (final Pair<Integer, MapleSummon> summon : chr.getSummons().values()) {
                    if (summon.getLeft() == 14121054 && summon.getLeft() == 14121055) {
                        summon.getRight().removeSummon(chr.getMap());
                        chr.getMap().removeMapObject(summon.getRight());
                        chr.getMap().broadcastMessage(MainPacketCreator.removeSummon(summon.getRight(), true));
                    }
                }
                chr.getClient().getSession().writeAndFlush(CygnusSkill.CancelShadowIllusion());
                chr.cancelEffectFromBuffStat(BuffStats.CTS_ShadowIllusion, 14121054);
                break;
        }
    }

    public static void SkillEffect(ReadingMaple rh, MapleCharacter chr) {
        SkillEffectEntry entry = new SkillEffectEntry(rh.readInt(), rh.readByte(), rh.readByte(), rh.readByte(), rh.readByte());
        chr.setKeyDownSkill_Time(System.currentTimeMillis());
        chr.setSkillEffect(entry);
        chr.getMap().broadcastMessage(chr, MainPacketCreator.skillEffect(chr, entry, chr.getPosition()), false);
    }

    public static void SpecialSkill(ReadingMaple rh, final MapleClient c, final MapleCharacter chr) {
        if (c.getPlayer() == null || chr == null || !chr.isAlive()) {
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        Point oid_pos = rh.readPos(); // Old X and Y
        int skillid = rh.readInt();
        if (GameConstants.isZero(chr.getJob())) {
            rh.skip(1);
        }
        int skillLevel = rh.readByte();
        if (GameConstants.isAran(chr.getJob())) {
            chr.useComboSkill(skillid);
        }
        ISkill skill = SkillFactory.getSkill(GameConstants.getLinkedBuffSkill(skillid));
        SkillStatEffect effect = SkillFactory.getSkill(GameConstants.getLinkedBuffSkill(skillid)).getEffect(skillLevel);
        c.getPlayer().getMap().broadcastMessage(chr, MainPacketCreator.showSkillEffect(c.getPlayer().getId(), chr.getLevel(), skillid, skillLevel, (byte) 0, 1, chr.getPosition(), oid_pos), false);
        switch (skillid) {
            case 13111024: {
                SkillStatEffect effects = SkillFactory.getSkill(skillid).getEffect(c.getPlayer().getSkillLevel(skillid));
                Rectangle rect = effects.calculateBoundingBox(c.getPlayer().getPosition(), c.getPlayer().isFacingLeft());
                if (c.getPlayer().isFacingLeft()) {
                    rect.x -= effect.getX() / 2;
                } else {
                    rect.x += effect.getX() / 2;
                }
                Point pos = chr.getMap().calcDropPos(new Point(rect.x, rect.y - 23), c.getPlayer().getPosition());
                rect.y = pos.y - 23;
                for (final Pair<Integer, MapleSummon> summon : c.getPlayer().getSummons().values()) {
                    if (summon.getLeft() == 13111024) {
                        summon.getRight().removeSummon(c.getPlayer().getMap());
                        c.getPlayer().getMap().removeMapObject(summon.getRight());
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeSummon(summon.getRight(), true));
                    }
                }
                MapleSummon summon = new MapleSummon(c.getPlayer(), 13111024, pos, SummonMovementType.STATIONARY, System.currentTimeMillis());
                c.getPlayer().getMap().spawnSummon(summon, true, 60000);
                c.getPlayer().getSummons().put(13111024, new Pair<Integer, MapleSummon>(13111024, summon));
                BuffTimer tMan = BuffTimer.getInstance();
                if (diabolicRecoveryTask != null) {
                    diabolicRecoveryTask.cancel(true);
                    diabolicRecoveryTask = null;
                }
                Runnable r = new Runnable() {
                    @Override
                    public void run() {
                        for (final MapleMapObject mo : c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                            ((MapleMonster) mo).applyStatus(c.getPlayer(), new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, -20), SkillFactory.getSkill(13111024), c.getPlayer().getSkillLevel(13111024), null, false), SkillFactory.getSkill(13111024).getEffect(c.getPlayer().getSkillLevel(13111024)).getStatusDuration());
                        }
                    }
                };
                diabolicRecoveryTask = tMan.register(r, 8000);
                tMan.schedule(new Runnable() {
                    @Override
                    public void run() {
                        if (diabolicRecoveryTask != null) {
                            diabolicRecoveryTask.cancel(true);
                            diabolicRecoveryTask = null;
                        }
                    }
                }, 60000);
                break;
            }
            case 13120007: {
                SkillStatEffect effects = SkillFactory.getSkill(skillid).getEffect(c.getPlayer().getSkillLevel(skillid));
                Rectangle rect = effects.calculateBoundingBox(c.getPlayer().getPosition(), c.getPlayer().isFacingLeft());
                if (c.getPlayer().isFacingLeft()) {
                    rect.x -= effect.getX() / 2;
                } else {
                    rect.x += effect.getX() / 2;
                }
                Point pos = chr.getMap().calcDropPos(new Point(rect.x, rect.y - 23), c.getPlayer().getPosition());
                rect.y = pos.y - 23;
                for (final Pair<Integer, MapleSummon> summon : c.getPlayer().getSummons().values()) {
                    if (summon.getLeft() == 13120007) {
                        summon.getRight().removeSummon(c.getPlayer().getMap());
                        c.getPlayer().getMap().removeMapObject(summon.getRight());
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeSummon(summon.getRight(), true));
                    }
                }
                MapleSummon summon = new MapleSummon(c.getPlayer(), 13120007, pos, SummonMovementType.STATIONARY, System.currentTimeMillis());
                c.getPlayer().getMap().spawnSummon(summon, true, 60000);
                c.getPlayer().getSummons().put(13120007, new Pair<Integer, MapleSummon>(13120007, summon));
                BuffTimer tMan = BuffTimer.getInstance();
                if (diabolicRecoveryTask != null) {
                    diabolicRecoveryTask.cancel(true);
                    diabolicRecoveryTask = null;
                }
                Runnable r = new Runnable() {
                    @Override
                    public void run() {
                        for (final MapleMapObject mo : c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), Double.POSITIVE_INFINITY, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                            ((MapleMonster) mo).applyStatus(c.getPlayer(), new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, -20), SkillFactory.getSkill(13111024), c.getPlayer().getSkillLevel(13111024), null, false), SkillFactory.getSkill(13111024).getEffect(c.getPlayer().getSkillLevel(13111024)).getStatusDuration());
                            ((MapleMonster) mo).applyStatus(c.getPlayer(), new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.MDEF, -20), SkillFactory.getSkill(13111024), c.getPlayer().getSkillLevel(13111024), null, false), SkillFactory.getSkill(13111024).getEffect(c.getPlayer().getSkillLevel(13111024)).getStatusDuration());
                        }
                    }
                };
                diabolicRecoveryTask = tMan.register(r, 8000);
                tMan.schedule(new Runnable() {
                    @Override
                    public void run() {
                        if (diabolicRecoveryTask != null) {
                            diabolicRecoveryTask.cancel(true);
                            diabolicRecoveryTask = null;
                        }
                    }
                }, 60000);
                break;
            }
            case 14111024: {
                for (final Pair<Integer, MapleSummon> summon : chr.getSummons().values()) {
                    if (summon.left == 14111024) {
                        summon.getRight().removeSummon(chr.getMap());
                        chr.getMap().removeMapObject(summon.getRight());
                        chr.getMap().broadcastMessage(MainPacketCreator.removeSummon(summon.getRight(), true));
                    }
                }
                MapleSummon summon = new MapleSummon(chr, skillid, chr.getPosition(), SummonMovementType.SHADOW_SERVANT, System.currentTimeMillis());
                chr.getMap().spawnSummon(summon, true, effect.getDuration());
                chr.getSummons().put(skillid, new Pair<Integer, MapleSummon>(skillid, summon));
                final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowServant, 1, false));
                c.getSession().writeAndFlush(MainPacketCreator.giveBuff(14111024, effect.getDuration(), stat, SkillFactory.getSkill(14111024).getEffect(c.getPlayer().getSkillLevel(14111024)), null, SkillFactory.getSkill(14111024).getAnimationTime(), c.getPlayer()));
                break;
            }
            case 14121054:
            case 14121055:
            case 14121056: {
                for (final Pair<Integer, MapleSummon> summon : chr.getSummons().values()) {
                    if (summon.left == 14111024) {
                        MapleSummon tosummon = new MapleSummon(chr, 14121054, chr.getPosition(), SummonMovementType.SHADOW_SERVANT, System.currentTimeMillis());
                        MapleSummon tosummons = new MapleSummon(chr, 14121055, chr.getPosition(), SummonMovementType.SHADOW_SERVANT, System.currentTimeMillis());
                        chr.getMap().spawnSummon(tosummon, true, effect.getDuration());
                        chr.getMap().spawnSummon(tosummons, true, effect.getDuration());
                        chr.getSummons().put(14121054, new Pair<Integer, MapleSummon>(14121054, tosummon));
                        chr.getSummons().put(14121054, new Pair<Integer, MapleSummon>(14121055, tosummons));
                    }
                }
                MapleSummon tosummons = new MapleSummon(chr, 14111024, chr.getPosition(), SummonMovementType.SHADOW_SERVANT, System.currentTimeMillis());
                MapleSummon tosummonss = new MapleSummon(chr, 14121054, chr.getPosition(), SummonMovementType.SHADOW_SERVANT, System.currentTimeMillis());
                MapleSummon tosummonsss = new MapleSummon(chr, 14121055, chr.getPosition(), SummonMovementType.SHADOW_SERVANT, System.currentTimeMillis());
                chr.getMap().spawnSummon(tosummons, true, SkillFactory.getSkill(14111024).getEffect(chr.getSkillLevel(14111024)).getDuration());
                chr.getMap().spawnSummon(tosummonss, true, 30000);
                chr.getMap().spawnSummon(tosummonsss, true, 30000);
                chr.getSummons().put(14111024, new Pair<Integer, MapleSummon>(14111024, tosummons));
                chr.getSummons().put(14121054, new Pair<Integer, MapleSummon>(14121054, tosummonss));
                chr.getSummons().put(14121055, new Pair<Integer, MapleSummon>(14121055, tosummonsss));
                final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowServant, 1, false));
                final List<Triple<BuffStats, Integer, Boolean>> stat2 = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowIllusion, 1, false));
                c.getSession().writeAndFlush(MainPacketCreator.giveBuff(14111024, effect.getDuration(), stat, SkillFactory.getSkill(14111024).getEffect(c.getPlayer().getSkillLevel(14111024)), null, SkillFactory.getSkill(14111024).getAnimationTime(), c.getPlayer()));
                c.getSession().writeAndFlush(MainPacketCreator.giveBuff(14121054, effect.getDuration(), stat2, SkillFactory.getSkill(14121054).getEffect(c.getPlayer().getSkillLevel(14121054)), null, SkillFactory.getSkill(14121054).getAnimationTime(), c.getPlayer()));
                break;
            }

            case 60001216: {
                if (chr.getBuffedValue(BuffStats.CTS_ReshuffleSwitch, 60001216) != null) {
                    chr.cancelEffectFromBuffStat(BuffStats.CTS_ReshuffleSwitch, 60001216);
                    return;
                }
                effect.applyTo(chr);
                break;
            }
            case 5121054: {
                startStimulation(chr);
                break;
            }

            case 80001804:
            case 80001210:
            case 80001212:
            case 80001213:
            case 80001214:
            case 80001215:
            case 80001218:
            case 80001219:
            case 80001266:
            case 80001267:
            case 80001268:
            case 80001269:
            case 80001270:
            case 80001273:
            case 80001274:
            case 80001280:
            case 80001281:
            case 80001321:
            case 80001322:
            case 80001323:
            case 80001339:
            case 80001340:
            case 80001341:
            case 80001395:
            case 80001396:
            case 80001493:
            case 80001495:
            case 80001497:
            case 80001499:
            case 80001501:
            case 80001696:
            case 80001697: {
                Point possxx = rh.readPos();
                for (final Pair<Integer, MapleSummon> summons : c.getPlayer().getSummons().values()) {
                    if (summons.left == skillid) {
                        summons.getRight().removeSummon(c.getPlayer().getMap());
                        c.getPlayer().getMap().removeMapObject(summons.getRight());
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeSummon(summons.getRight(), true));
                        c.getPlayer().getSummons().remove(summons.getLeft());
                    }
                }
                MapleSummon summons = new MapleSummon(c.getPlayer(), effect, c.getPlayer().getPosition(), SummonMovementType.FOLLOW, System.currentTimeMillis());
                c.getPlayer().getMap().spawnSummon(summons, true, effect.getDuration());
                c.getPlayer().getSummons().put(skillid, new Pair<Integer, MapleSummon>(skillid, summons));
                c.getPlayer().setSoulCount(c.getPlayer().getSoulCount() - c.getPlayer().getSoulSkillMpCon());
                c.getPlayer().getClient().getSession().writeAndFlush(SoulWeaponPacket.giveSoulGauge(c.getPlayer().getSoulCount(), skillid));
                c.getSession().write(SoulWeaponPacket.giveSoulEffect(0));
                c.getPlayer().getMap().broadcastMessage(SoulWeaponPacket.cancelForeignSoulEffect(c.getPlayer().getId()));
                c.getSession().writeAndFlush(MainPacketCreator.resetActions(c.getPlayer()));
                break;
            }

            case 100001274: {
                if (c.getPlayer().getLevel() < 201) {
                    effect.applyTo(c.getPlayer());
                } else {
                    SkillStatEffect effects = SkillFactory.getSkill(100001281).getEffect(1);
                    effect.applyTo(c.getPlayer());
                    effects.applyTo(c.getPlayer());
                }
                break;
            }

            //--------------------------------------------------------------------------------------------------------// 랜덤 소환물 시작
            case 5201012: {
                if (skillid == 5201012) {
                    switch (Randomizer.nextInt(3)) { // 1 ~ 3
                        case 0:
                            skillid = 5201012;
                            break;
                        case 1:
                            skillid = 5201013;
                            break;
                        case 2:
                            skillid = 5201014;
                            break;
                    }
                    SkillStatEffect effects = SkillFactory.getSkill(skillid).getEffect(chr.getSkillLevel(5201012));
                    effects.applyTo(chr, chr.getPosition());
                }
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                break;
            }
            case 5210015: {
                if (skillid == 5210015) { // 어셈블 크루
                    switch (Randomizer.nextInt(4)) { // 1 ~ 4 
                        case 0:
                            skillid = 5210015;
                            break;
                        case 1:
                            skillid = 5210016;
                            break;
                        case 2:
                            skillid = 5210017;
                            break;
                        case 3:
                            skillid = 5210018;
                            break;
                    }
                    SkillStatEffect effects = SkillFactory.getSkill(skillid).getEffect(chr.getSkillLevel(5210015));
                    effects.applyTo(chr, chr.getPosition());
                }
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                break;
            }
            case 23111008: {
                if (skillid == 23111008) {// 엘리멘트 나이트
                    switch (Randomizer.nextInt(3)) {
                        case 0: // 얼음
                            skillid = 23111008;
                            break;
                        case 1: // 불
                            skillid = 23111009;
                            break;
                        case 2: // 어둠
                            skillid = 23111010;
                            break;
                    }
                    SkillStatEffect effects = SkillFactory.getSkill(skillid).getEffect(chr.getSkillLevel(23111008));
                    effects.applyTo(chr, chr.getPosition());
                }
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                break;
            }
            //--------------------------------------------------------------------------------------------------------// 랜덤 소환물 끝
            case 2001009: {
                if (chr.isActiveBuffedValue(2201009)) {
                    if (chr.getBuffedSkillEffect(BuffStats.CTS_ChillingStep).makeChanceResult()) {
                        SkillStatEffect e = SkillFactory.getSkill(2201009).getEffect(chr.getSkillLevel(2201009));
                        Rectangle rect = e.calculateBoundingBox(chr.getPosition(), chr.isFacingLeft());
                        if (chr.isFacingLeft()) {
                            rect.x -= e.getX() / 2;
                        } else {
                            rect.x += e.getX() / 2;
                        }
                        Point pos = chr.getMap().calcDropPos(new Point(rect.x, rect.y - 23), chr.getPosition());
                        rect.y = pos.y - 23;
                        chr.getMap().spawnMist(new MapleMist(rect, chr, e, chr.getSkillLevel(2201009), pos), 6000, false, false, false, false, false, false, false);
                    }
                }
                break;
            }
            case 36121002:   //홀로그램 그래피티 : 관통
            case 36121013:   //홀로그램 그래피티 : 역장
            case 36121014: { //홀로그램 그래피티 : 지원
                Point pos = rh.readPos();
                MapleSummon summon = new MapleSummon(chr, skillid, pos, SummonMovementType.STATIONARY, System.currentTimeMillis());
                chr.getMap().spawnSummon(summon, true, 20000);
                break;
            }
            case 101100100:
            case 101100101: { //스로잉 웨폰 
                Point pos = rh.readPos();
                final MapleSummon summon = new MapleSummon(chr, skillid, pos, SummonMovementType.ZEROWEAPON, System.currentTimeMillis());
                chr.getMap().spawnSummon(summon, true, 5000);
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                break;
            }
            case 25100009: { //여우령
                rh.skip(1);
                int sn = rh.readInt();
                c.getPlayer().send(MainPacketCreator.absorbingFG(c.getPlayer().getId(), 25100010, sn));
                여우령 = 50;
                break;
            }
            case 25120110: // 불여우령
                rh.skip(1);
                int fsn = rh.readInt();
                c.getPlayer().send(MainPacketCreator.absorbingFG(c.getPlayer().getId(), 25120115, fsn));
                여우령 = 100;
                break;
            case 12001027:
            case 12001028: { //파이어 워크
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.FireWork(chr));
                break;
            }
            case 12101025: { //파이어 블링크
                Point position = rh.readPos();
                c.getPlayer().send(MainPacketCreator.FireBlink(chr.getId(), position));
                break;
            }
            case 12120013:
            case 12120014: { // 스피릿 오브 플레임
                rh.skip(7);
                if (chr.getSkillLevel(skillid) <= 0) {
                    chr.teachSkill(skillid, (byte) 30, (byte) 30);
                }
                for (Pair<Integer, MapleSummon> summon : chr.getSummons().values()) {
                    if (summon.left == 12120013 || summon.left == 12120014) {
                        summon.right.removeSummon(chr.getMap());
                    }
                }
                MapleSummon tosummons = new MapleSummon(chr, skillid, chr.getPosition(), SummonMovementType.FLAME_SUMMON, System.currentTimeMillis());
                tosummons.setPosition(chr.getPosition());
                chr.getMap().spawnSummon(tosummons, true, SkillFactory.getSkill(skillid).getEffect(chr.getSkillLevel(skillid)).getDuration());
                chr.getSummons().put(tosummons.getObjectId(), new Pair<>(skillid, tosummons));
                tosummons.addHP(Integer.MAX_VALUE);
                break;
            }
            case 1311013:   //비홀더 도미넌트
            case 1311014: { //비홀더 쇼크
                c.getSession().write(AdventurerSkill.giveBeholderDominant(skillid == 1311013 ? true : false));
                c.getSession().write(MainPacketCreator.resetActions());
                break;
            }
            case 65111100: { //소울시커
                rh.skip(4);
                int soulnum = rh.readByte();
                int scheck = 0;
                int scheck2 = 0;
                if (soulnum == 1) {
                    scheck = rh.readInt();
                } else if (soulnum == 4) {
                    scheck = rh.readInt();
                    scheck2 = rh.readInt();
                }
                rh.skip(3);
                c.send(AngelicBusterSkill.SoulSeeker(chr, skillid, soulnum, scheck, scheck2));
                c.send(AngelicBusterSkill.unlockSkill());
                c.send(AngelicBusterSkill.showRechargeEffect());
                break;
            }
            case 2121052:    // 메기도 플레임
            case 31221001:   // 쉴드 체이싱
            case 35101002:   // 호밍 미사일 
            case 35110017:    // 어드밴스트 호밍 미사일
            case 36001005: { // 핀포인트 로켓
                List<Integer> moblist = new ArrayList<Integer>();
                //CA FB F4 18 5C 5D 20 00 01 01 A2 86 01 00 76 02 00
                if (skillid == 31221001) {
                    rh.skip(4);
                }
                int len = rh.readByte();
                for (int i = 0; i < len; i++) {
                    moblist.add(rh.readInt());
                }
                switch (skillid) {
                    case 31221001:
                        c.getPlayer().getMap().broadcastMessage(chr, MainPacketCreator.ShieldChacing(chr.getId(), moblist, 31221014), true);
                        break;
                    case 36001005:
                        c.getPlayer().getMap().broadcastMessage(chr, MainPacketCreator.PinPointRocket(chr.getId(), moblist), true);
                        /*if (c.getPlayer().getBuffedValue(BuffStats.CTS_XenonAegisSystem, 36001005) != null) {
                            c.getPlayer().cancelBuffStats(36001005, BuffStats.CTS_XenonAegisSystem);
                        } else {
                            effect.applyTo(c.getPlayer(), chr.getPosition());
                        }*/
                        break;
                    case 2121052:
                        c.getPlayer().getMap().broadcastMessage(chr, MainPacketCreator.MegidoFlameRe(chr.getId(), moblist.get(0), chr.getPosition(), rh.readByte(), rh.readByte(), rh.readByte()), true);
                        break;
                    case 35101002:
                    case 35110017:
                        c.getPlayer().getMap().broadcastMessage(chr, MainPacketCreator.HomingMisile(chr.getId(), moblist, skillid, skillLevel), true);
                        break;
                    case 142110011:
                        for (int i = 0; i < moblist.size(); i++) {
                            c.getPlayer().getMap().broadcastMessage(chr, MainPacketCreator.PsychicGrep(chr.getId(), moblist.get(i), i, skillid, skillLevel), true);
                        }
                        break;
                    default:
                        break;
                }
                break;
            }
            case 12111022: { //마엘스트룸
                Point mpos = rh.readPos();
                rh.skip(3);
                int mobid = rh.readInt();
                // 마엘스트롬 시전시 이전에 소환된 마엘스트롬 삭제 
                List<MapleSummon> maelstrom = new ArrayList<>();
                chr.getSummons().values().stream().filter(sum -> sum.left == 12111022).forEach(s -> maelstrom.add(s.right));
                maelstrom.forEach(sum -> {
                    chr.removeSummon(sum.getObjectId());
                    chr.getMap().broadcastMessage(MainPacketCreator.removeSummon(sum, true));
                    chr.getMap().removeMapObject(sum);
                    chr.removeVisibleMapObject(sum);
                });
                MapleSummon summon = new MapleSummon(chr, skillid, mpos, SummonMovementType.STATIONARY, System.currentTimeMillis());
                summon.setPosition(mpos);
                summon.setMaelstromId(chr.getMap().getMonsterByOid(mobid).getId());
                chr.getMap().spawnSummon(summon, true, effect.getDuration());
                chr.getSummons().put(summon.getObjectId(), new Pair<>(12111022, summon));
                chr.ea();
                break;
            }
            case 12101022: { // 번 앤 레스트
                c.getPlayer().addMP((int) (c.getPlayer().getStat().getCurrentMaxMp() * 60 / 100.0D));
                c.getPlayer().addCooldown(skillid, 0, System.currentTimeMillis());
                c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(skillid, 0, chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                break;
            }
            case 4211006: { //메소 익스플로젼
                rh.skip(3);
                List<MapleMapObject> drops = c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 320000, Arrays.asList(MapleMapObjectType.ITEM));
                final List<MapleWorldMapItem> allmesos = new ArrayList<>();
                for (int i = 0; i < drops.size(); i++) { //범위 내에 있는 1메소이며, 소유권이 자신에게 있는 메소
                    MapleWorldMapItem drop = (MapleWorldMapItem) drops.get(i);
                    if (drop.getMeso() == 1 && drop.getOwner() == c.getPlayer().getId()) {
                        allmesos.add(drop);
                    }
                }
                final int maxmeso_count = Randomizer.rand(allmesos.isEmpty() ? 0 : 1, allmesos.size() > effect.getBulletCount() ? effect.getBulletCount() : allmesos.size());
                final List<Pair<Integer, Point>> mesos = new ArrayList<>();
                for (int i = 0; i < maxmeso_count; i++) {
                    final int randmeso_remove = Randomizer.rand(0, allmesos.size() - 1);
                    mesos.add(new Pair(allmesos.get(randmeso_remove).getObjectId(), allmesos.get(randmeso_remove).getPosition()));
                    allmesos.remove(randmeso_remove);
                }
                final List<MapleMapObject> mobjects = c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 320000, Arrays.asList(MapleMapObjectType.MONSTER));
                final List<Integer> moids = new ArrayList<>();
                final int randmob_count = Randomizer.rand(mobjects.isEmpty() ? 0 : 1, mobjects.size() > 10 ? 10 : mobjects.size());
                for (int i = 0; i < randmob_count; i++) {
                    final int randmob_remove = Randomizer.rand(0, mobjects.size() - 1);
                    moids.add(mobjects.get(randmob_remove).getObjectId());
                    mobjects.remove(randmob_remove);
                }
                if (mesos.isEmpty() || moids.isEmpty()) {
                    c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                    return;
                }
                MapleWorldMapItem remove;
                for (int i = 0; i < mesos.size(); i++) {
                    remove = (MapleWorldMapItem) c.getPlayer().getMap().getMapObject(mesos.get(i).left);
                    c.getPlayer().getMap().removeMapObject(remove);
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeItemFromMap(remove.getObjectId(), 0, c.getPlayer().getId()));
                }
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.giveMesoExplosion(c.getPlayer().getId(), moids, mesos));
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                break;
            }
            case 33001025:
            case 33101115:
            case 33111015:
            case 33121255:
            case 33121017:
            case 33001016: {
                c.getPlayer().send(MainPacketCreator.OnJaguarSkill(skillid));
                break;
            }
        }
        if (chr.lastUsedSkill + 100 > System.currentTimeMillis()) {
            chr.usedSkillFast++;
        } else {
            chr.usedSkillFast = 0;
        }
        chr.lastUsedSkill = System.currentTimeMillis();
        if (skillid != 0) {
            c.send(MainPacketCreator.resetActions());
        }
        switch (skillid) {
            case 36111008:
                chr.giveSurPlus(10);
                break;
            case 36111003:
                chr.dualBrid = 0;
                break;
            case 36121054:
                chr.giveSurPlus(20);
                break;
            case 4221054:
                chr.send(MainPacketCreator.OnOffFlipTheCoin(false));
                if (!chr.isActiveBuffedValue(skillid)) {
                    chr.flipTheCoin = 0;
                }
                break;
            /*
            case 21121058:
                SkillFactory.getSkill(21110016).getEffect(chr.getSkillLevel(21110016)).applyTo(chr);
                break;
             */
            case 2111010:
                chr.setSlimeVirusCount(10);
                break;
            case 2111011:
                chr.elementalAdep = 5;
                break;
            case 15001022:
                chr.lightning = 1;
                break;
            case 25121209:
                chr.SpiritGuard = 3;
                break;
            case 27121054:
                effect.applyequilibriumBuff(chr, Randomizer.nextBoolean());
                break;
            /*case 32001014: // 데스
            case 32100010: // 데스 컨트랙트
            case 32110017: // 데스 컨트랙트2
            case 32120019:  // 데스 컨트랙트3 
                if (chr.getBuffedValue(BuffStats.CTS_BMageDeath) != null) {
                    chr.cancelBuffStats(skillid, BuffStats.CTS_BMageDeath);
                    return;
                }
                chr.deathCount = 1;
                break;*/
        }
        if (GameConstants.isBlaster(chr.getJob())) {
            chr.giveBulletGauge(skillid, false);
        }
        if (skill != null) {
            if (skillid == 31211004) {
                chr.startDiabolicRecovery(effect);
            }

            if (effect.getPowerEnergy() > 0) {
                chr.giveSurPlus(-effect.getPowerEnergy());
            }

            if (GameConstants.isKinesis(chr.getJob())) {
                chr.givePPoint(effect);
            }

            if (effect.getCooldown() > 0 && !chr.isEquilibrium()) {
                if (chr.skillisCooling(skillid)) {
                    return;
                }
                boolean hasNoCoolTime = false;
                for (InnerSkillValueHolder isvh : chr.getInnerSkills()) {
                    if (isvh.getSkillId() == 70000045) {
                        hasNoCoolTime = Randomizer.isSuccess(SkillFactory.getSkill(70000045).getEffect(chr.getSkillLevel(70000045)).getSkillStats().getStats("nocoolProp"));
                        if (hasNoCoolTime) {
                            break;
                        }
                    }
                }
                if (!hasNoCoolTime && skillid != 35111002) {
                    if (!chr.isEquilibrium() && !GameConstants.isDarkSkills(skillid)) {
                        c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(skillid, effect.getCooldown(), chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                        chr.addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown() * 1000);
                    }
                }
            }
            switch (skillid) {
                case 1121001:
                case 1221001:
                case 1321001:
                case 9001020: // GM magnet
                    byte number_of_mobs = rh.readByte();
                    rh.skip(3);
                    for (int i = 0; i < number_of_mobs; i++) {
                        int mobId = rh.readInt();
                        MapleMonster mob = chr.getMap().getMonsterByOid(mobId);
                        if (mob != null) {
                            mob.switchController(chr, mob.isControllerHasAggro());
                        }
                    }
                    break;
                case 30001061: { //포획
                    int mobid = rh.readInt();
                    MapleMonster mob = chr.getMap().getMonsterByOid(mobid);
                    if (mob.getHp() > mob.getMobMaxHp() / 2) {
                        chr.send(MainPacketCreator.captureMob(false));
                        chr.ea();
                        return;
                    }
                    if (!Randomizer.isSuccess(95)) {
                        chr.send(MainPacketCreator.captureMob(false));
                        chr.ea();
                        return;
                    }
                    //    chr.send(MainPacketCreator.catchMonster(mobid, (byte) 1));
                    chr.getMap().killMonster(mob, chr, false, false, (byte) 1);
                    chr.setKeyValue2("CapturedJaguar", mob.getId());
                    chr.ea();
                    //   chr.send(MainPacketCreator.captureMob(true));
                    chr.send(MainPacketCreator.updateJaguar(chr));
                    break;
                }
                case 35111002: { // 마그네틱 필드
                    byte entry = rh.readByte(); //0,1,2 (first:0 second:1 third:2)
                    if (entry == 2) {
                        rh.skip(8);
                    }
                    Point pos = rh.readPos();
                    MapleSummon summon = new MapleSummon(chr, 35111002, pos, SummonMovementType.STATIONARY, System.currentTimeMillis());
                    chr.getMap().spawnSummon(summon, true, 0);
                    chr.getSummons().put(summon.getObjectId(), new Pair<>(summon.getSkill(), summon));
                    if (chr.getMap().countSummonSkill(chr, 35111002) == 3) {
                        c.getPlayer().send(MainPacketCreator.resetActions());
                        c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(skillid, effect.getCooldown(), chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                        chr.addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown() * 1000);
                    }
                    List<MapleSummon> summonlist = new ArrayList<MapleSummon>();
                    for (Pair<Integer, MapleSummon> summon2 : chr.getSummons().values()) {
                        if (summon2.right.getSkill() == 35111002) {
                            summon2.right.setEndTime(System.currentTimeMillis() + 60000);
                            summonlist.add(summon2.right);
                        }
                        if (chr.getMap().countSummonSkill(chr, 35111002) == 3) {
                            c.getPlayer().getMap().broadcastMessage(MainPacketCreator.showMagneticConnect(c.getPlayer().getId(), chr.getMap().getSummonObjects(chr, 35111002)));
                            c.getPlayer().send(MainPacketCreator.showMagneticConnect(c.getPlayer().getId(), chr.getMap().getSummonObjects(chr, 35111002)));
                        }
                    }
                    effect.applyTo(c.getPlayer(), pos);
                    break;
                }
                case 22141017:
                case 22170070: {
                    MapleMap field = c.getPlayer().getMap();
                    final List<MapleMapObject> mobs = c.getPlayer().getMap().getMapObjectsInRange(c.getPlayer().getPosition(), 320000, Arrays.asList(MapleMapObjectType.MONSTER));
                    final List<Integer> mobList = new LinkedList<Integer>();
                    final List<MapleWreckage> wreakageList = new LinkedList<MapleWreckage>();
                    int i = 0;
                    field.getAllWreakage().stream().filter(w -> w.getOwner().getId() == c.getPlayer().getId()).forEach(w -> {
                        wreakageList.add(w);
                        w.removeWreckage(field, true);
                    });
                    c.getPlayer().setWreckageCount(0);
                    Collections.sort(wreakageList, (r1, r2) -> r1.getObjectId() - r2.getObjectId());
                    for (final MapleMapObject mo : mobs) {
                        MapleMonster mons = (MapleMonster) mo;
                        mobList.add(mons.getObjectId());
                        i++;
                        if (i >= 15) {
                            break;
                        }
                    }
                    field.broadcastMessage(MainPacketCreator.DelWreckage(c.getPlayer().getId(), wreakageList, true));
                    field.broadcastMessage(MainPacketCreator.EvanMagicWreckage(c.getPlayer().getId(), mobList, wreakageList, skillid));
                    break;
                }
                default:
                    Point pos = null;
                    if (rh.available() == 7 || rh.available() == 8) {
                        pos = rh.readPos();
                    }
                    if (effect.isMagicDoor() || effect.isMechDoor()) { // Mystic Door
                        if (effect.isMagicDoor() && c.getPlayer().getParty() == null) {
                            c.getPlayer().dropMessage(5, "파티가 없으면 미스틱 도어 스킬을 사용하실 수 없습니다.");
                            c.getPlayer().send(MainPacketCreator.resetActions());
                            return;
                        }
                        if (pos == null) {
                            pos = rh.readPos();
                        }
                        if (effect.isMechDoor()) {
                            for (Pair<Integer, MapleSummon> summon2 : chr.getSummons().values()) {
                                if (summon2.right.getSkill() == 35101005) {
                                    summon2.right.setEndTime(System.currentTimeMillis() + 30000);
                                }
                                break;
                            }
                        }
                        if (!FieldLimitType.MysticDoor.check(chr.getMap().getFieldLimit()) || effect.isMechDoor()) {
                            effect.applyTo(c.getPlayer(), pos);
                        } else {
                            chr.dropMessage(5, "현재 위치에선 미스틱 도어를 소환할 수 없습니다.");
                            chr.send(MainPacketCreator.resetActions());
                        }
                    } else {
                        if (effect.parseMountInfo(c.getPlayer(), skill.getId()) != 0 && c.getPlayer().getBuffedValue(BuffStats.CTS_MonsterRiding) == null && c.getPlayer().getDragon() != null) {
                            c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeDragon(c.getPlayer().getId()));
                            c.getPlayer().getMap().removeMapObject(c.getPlayer().getDragon());
                            c.getPlayer().setDragon(null);
                        }
                        boolean v1 = false;
                        if (effect.getSourceId() == 2101010) {
                            if (c.getPlayer().isActiveBuffedValue(2101010)) {
                                v1 = true;
                            }
                        }
                        boolean v2 = false;
                        if (effect.getSourceId() == 35001002) {
                            if (c.getPlayer().isActiveBuffedValue(35001002)) {
                                v2 = true;
                            } else {
                                c.getPlayer().cancelEffectFromBuffStat(BuffStats.CTS_Mechanic, 35111003);
                            }
                        }
                        boolean v3 = false;
                        if (effect.getSourceId() == 4101011) {
                            if (c.getPlayer().isActiveBuffedValue(4101011)) {
                                v3 = true;
                            }
                        }
                        boolean v4 = false;
                        if (effect.getSourceId() == 14001027) {
                            if (c.getPlayer().isActiveBuffedValue(14001027)) {
                                v4 = true;
                            }
                        }
                        boolean v5 = false;
                        if (effect.getSourceId() == 142001007) {
                            if (c.getPlayer().isActiveBuffedValue(142001007)) {
                                v5 = true;
                            }
                        }
                        boolean v6 = false;
                        if (effect.getSourceId() == 25101009) {
                            if (c.getPlayer().getBuffedValue(BuffStats.CTS_HiddenPossession, 25101009) != null) {
                                v6 = true;
                            }
                        }
                        effect.applyTo(c.getPlayer(), pos);
                        if (v1) {
                            c.getPlayer().cancelEffectFromBuffStat(BuffStats.CTS_WizardIgnite, 2101010);
                        }
                        if (v2) {
                            c.getPlayer().cancelEffectFromBuffStat(BuffStats.CTS_MonsterRiding, 35001002);
                        }
                        if (v3) {
                            c.getPlayer().cancelEffectFromBuffStat(BuffStats.CTS_NightLordMark, 4101011);
                        }
                        if (v4) {
                            c.getPlayer().cancelEffectFromBuffStat(BuffStats.CTS_NightWalkerBat, 14001027);
                        }
                        if (v5) {
                            c.getPlayer().cancelEffectFromBuffStat(BuffStats.CTS_KinesisPsychicEnergeShield, 142001007);
                        }
                        if (v6) {
                            c.getPlayer().cancelEffectFromBuffStat(BuffStats.CTS_HiddenPossession, 25101009);
                        }
                    }
                    break;
            }
        }
    }

    public static void closeRangeAttack(ReadingMaple rh, final MapleClient c, final MapleCharacter chr, RecvPacketOpcode recv) {
        if (c.getPlayer() == null || !chr.isAlive()) {
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }

        AttackInfo attack = DamageParse.parseDmgM(rh, recv);
        boolean mirror = chr.getBuffedValue(BuffStats.CTS_ShadowPartner) != null;
        int attackCount = ((chr.getJob() >= 430 && chr.getJob() <= 434) ? 2 : (attack.skill == 61101002 || attack.skill == 61110211) ? 3 : (attack.skill == 61120007 || attack.skill == 61121217) ? 5 : 1);
        int skillLevel = attack.skillLevel != 0 ? attack.skillLevel : 1;

        ISkill skill = null;
        SkillStatEffect effect = null;
        if (GameConstants.SurfaceDamageSkillLink(attack.skill)) {
            for (int i = 0; i < attack.allDamage.size(); ++i) { //마리수
                for (int x = 0; x < attack.allDamage.get(i).attack.size(); ++x) { //뎀지수
                    MapleMonster Target = chr.getMap().getMonsterByOid(attack.allDamage.get(i).objectid);
                    Target.damage(chr, attack.allDamage.get(i).attack.get(x).left, false, 0);
                    if (Target.getHp() <= 0) {
                        break;
                    }
                }
            }
        }
        if (attack.skill != 0) {
            skill = SkillFactory.getSkill(attack.skill);
            effect = attack.getAttackEffect(chr, skillLevel, skill);
            if (attack.skill == 61120007 || attack.skill == 61121217) { // 어드밴스드 윌 오브 소드 (트랜스피규레이션
                DamageParse.applyAttack(attack, skill, c.getPlayer(), attackCount, effect, mirror ? AttackType.NON_RANGED_WITH_MIRROR : AttackType.NON_RANGED);
                chr.cancelEffect(chr.getBuffedSkillEffect(BuffStats.CTS_StopForceAtomInfo), false, chr.getBuffedStarttime(BuffStats.CTS_StopForceAtomInfo, attack.skill));
                SkillStatEffect realEffect = SkillFactory.getSkill(61101002).getEffect(c.getPlayer().getSkillLevel(61101002));
                c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(61101002, realEffect.getCooldown(), chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                chr.addCooldown(61101002, System.currentTimeMillis(), realEffect.getCooldown());
                chr.cancelEffectFromBuffStat(BuffStats.CTS_StopForceAtomInfo, -1);
                return;
            }
            if (attack.skill == 101120104) {
                chr.getMap().spawnMist(new MapleMist(effect.calculateBoundingBox(chr.getTruePosition(), chr.isFacingLeft()), chr, effect, effect.getSkillStats().getLevel(), chr.getPosition()), (3000), false, false, false, false, false, false, false);
                DamageParse.applyAttack(attack, skill, c.getPlayer(), attackCount, effect, mirror ? AttackType.NON_RANGED_WITH_MIRROR : AttackType.NON_RANGED);
            }
            attackCount = effect.getAttackCount();
            if (SkillFactory.getSkill(attack.skill).getEffect(skillLevel).getCooldown() > 0) {
                if (attack.skill == 1321013) {
                    if (!chr.isActiveBuffedValue(1311005) && !chr.isActiveBuffedValue(1320019) && !chr.isActiveBuffedValue(1321015)) {
                        c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(attack.skill, effect.getCooldown(), chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                        chr.addCooldown(attack.skill, System.currentTimeMillis(), effect.getCooldown());
                    }
                } else if (attack.skill == 15111022 || attack.skill == 15120003) {
                    if (c.getPlayer().getBuffedValue(BuffStats.CTS_StrikerHyperElectric, 15121054) != null) {
                        c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(attack.skill, 0, chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                        chr.addCooldown(attack.skill, System.currentTimeMillis(), 0);
                        c.getPlayer().dropMessage(5, "TSET");
                    } else {
                        c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(attack.skill, effect.getCooldown(), chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                        chr.addCooldown(attack.skill, System.currentTimeMillis(), effect.getCooldown());
                    }
                } else {
                    c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(attack.skill, SkillFactory.getSkill(attack.skill).getEffect(skillLevel).getCooldown(), chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                    chr.addCooldown(attack.skill, System.currentTimeMillis(), SkillFactory.getSkill(attack.skill).getEffect(skillLevel).getCooldown());
                }
            }
            /*if (GameConstants.isPinkBean(chr.getJob())) { // 치우씨 :: 핑크빈 요요 구현
                YoYoCount(c, true);
            }*/
            if (chr.getJob() >= 510 && chr.getJob() <= 512) {//Byper
                if (attack.targets > 0) {
                    int ChargeEnergy = chr.getSkillLevel(5120018) > 0 ? 350 : chr.getSkillLevel(5110014) > 0 ? 300 : chr.getSkillLevel(5100015) > 0 ? 250 : 0;
                    for (int i = 0; i < attack.allDamage.size(); i++) {
                        MapleMonster mmo = chr.getMap().getMonsterByOid(attack.allDamage.get(i).objectid);
                        if (mmo != null) {
                            if (mmo.getStats().isBoss()) {
                                ChargeEnergy *= 2;//보스공격시 2배충전
                            }
                        }
                    }
                    final int MinusEnergy = GameConstants.Minus_Energy(attack.skill);
                    if (chr.Byper_Max()) {
                        chr.MinusEnergyCharge(MinusEnergy);
                    } else {
                        chr.addEnergyCharge(ChargeEnergy);
                    }
                }
            }

            if (chr.getSkillLevel(4221054) > 0) {
                if (isCritical(attack)) {
                    chr.send(MainPacketCreator.OnOffFlipTheCoin(true));
                }
            }
            if (attack.skill == 31111003) { //블러디 레이븐 피회복
                int recover = (int) (chr.getStat().getCurrentMaxHp() * (effect.getX() / 100.0D));
                chr.addHP(recover);
            }

            if (GameConstants.isBlaster(chr.getJob())) {
                chr.giveBulletGauge(attack.skill, true);
            }

            if (GameConstants.isAngelicBuster(chr.getJob())) {
                int Recharge = effect.getOnActive();
                if (chr.getJob() == 6512) {
                    Recharge = 100;
                }
                if (Randomizer.isSuccess(Recharge)) {
                    c.send(AngelicBusterSkill.unlockSkill());
                    c.send(AngelicBusterSkill.showRechargeEffect());
                }
            }
            if (chr.getBuffedValue(BuffStats.CTS_GlimmeringTime) != null) {
                try {
                    new Robot().delay(180);
                } catch (AWTException ex) {
                    ex.printStackTrace();
                }
                int stateid = 0;
                if (chr.getBuffedValue(BuffStats.CTS_PoseType, 11101022) != null) {
                    chr.cancelEffect(chr.getBuffedSkillEffect(BuffStats.CTS_PoseType, 11101022), false, -1);
                    stateid = 11111022;
                } else if (chr.getBuffedValue(BuffStats.CTS_PoseType, 11111022) != null) {
                    chr.cancelEffect(chr.getBuffedSkillEffect(BuffStats.CTS_PoseType, 11111022), false, -1);
                    stateid = 11101022;
                }
                SkillStatEffect stateeffect = SkillFactory.getSkill(stateid).getEffect(chr.getSkillLevel(stateid));
                stateeffect.applyTo(chr);
            }
        }

        attack = DamageParse.Modify_AttackCrit(attack, chr, 1, effect);
        attackCount *= mirror ? 2 : 1;

        int numFinisherOrbs = 0;
        Integer comboBuff = chr.getBuffedValue(BuffStats.CTS_ComboCounter);

        if (isFinisher(attack.skill) > 0) {
            if (comboBuff != null) {
                numFinisherOrbs = comboBuff.intValue() - 1;
            }
            //chr.handleOrbconsume(isFinisher(attack.skill));
        } else if ((attack.targets > 0) && (comboBuff != null)) {
            switch (chr.getJob()) {
                case 110:
                case 111:
                case 112:
                case 2411:
                case 2412:
                    if (attack.skill == 1111008) {
                        break;
                    }
                    chr.handleOrbgain();
            }
        }
        if ((isFinisher(attack.skill) > 0) && (numFinisherOrbs == 0)) {
            return;
        }
        List<Integer> damage = new LinkedList<Integer>();
        chr.checkFollow();
        if (GameConstants.isZero(chr.getJob())) {
            chr.getMap().broadcastMessage(chr, MainPacketCreator.showSkillEffect(chr.getId(), skillLevel, attack.skill, attack.skillLevel, 0, 1, chr.getPosition(), null, !(attack.animation >= 0)), chr.getPosition());
        }

        if (effect != null) {
            int cooldown = effect.getCooldown();
            if (cooldown > 0) {
                if (attack.skill == 3221007) {
                    if (chr.getSkillLevel(3220051) > 0) {
                        cooldown = 0;
                    }
                }
                c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(attack.skill, cooldown, chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                chr.addCooldown(attack.skill, System.currentTimeMillis(), cooldown * 1000);
            }
        }

        chr.getMap().broadcastMessage(chr, MainPacketCreator.attack(RecvPacketOpcode.CLOSE_RANGE_ATTACK, chr, chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.animation, attack.speed, attack.allDamage, attack.position, (byte) 0, 0, chr.getLevel(), 0), chr.getPosition());
        DamageParse.applyAttack(attack, skill, c.getPlayer(), attackCount, effect, mirror ? AttackType.NON_RANGED_WITH_MIRROR : AttackType.NON_RANGED);
    }

    public static boolean isCritical(AttackInfo attack) {
        for (int i = 0; i < attack.allDamage.size(); i++) {
            for (int j = 0; j < attack.allDamage.get(i).attack.size(); j++) {
                if (!attack.allDamage.get(i).attack.get(j).right) {
                    return true;
                }
            }
        }
        return false;
    }

    public static void rangedAttack(ReadingMaple rh, MapleClient c, MapleCharacter chr) {
        if (c.getPlayer() == null || chr == null || !chr.isAlive()) {
            c.getSession().write(MainPacketCreator.resetActions());
            return;
        }

        AttackInfo attack = DamageParse.parseDmgR(c.getPlayer(), rh);
        int skillLevel = attack.skillLevel;

        ISkill skill = SkillFactory.getSkill(attack.skill);
        SkillStatEffect effect = attack.getAttackEffect(chr, skillLevel, skill);
        int bulletCount = 1;
        if (attack.skill > 0) {
            bulletCount = effect.getBulletCount();
        }
        if (GameConstants.SurfaceDamageSkillLink(attack.skill)) {
            for (int i = 0; i < attack.allDamage.size(); ++i) { //마리수
                for (int x = 0; x < attack.allDamage.get(i).attack.size(); ++x) { //뎀지수
                    MapleMonster Target = chr.getMap().getMonsterByOid(attack.allDamage.get(i).objectid);
                    Target.damage(chr, attack.allDamage.get(i).attack.get(x).left, false, 0);
                    if (Target.getHp() <= 0) {
                        break;
                    }
                }
            }
        }

        if (GameConstants.isAngelicBuster(chr.getJob())) {
            int Recharge = effect.getOnActive();
            if (Recharge > -1) {
                if (Randomizer.isSuccess(Recharge)) {
                    c.send(AngelicBusterSkill.unlockSkill());
                    c.send(AngelicBusterSkill.showRechargeEffect());
                }
            }
        }

        attack = DamageParse.Modify_AttackCrit(attack, chr, 2, effect);
        Integer ShadowPartner = chr.getBuffedValue(BuffStats.CTS_ShadowPartner);
        if (ShadowPartner != null) {
            bulletCount *= 2;
        }
        int projectile = 0, visProjectile = 0;

        if (chr.getBuffedValue(BuffStats.CTS_SoulArrow) == null && attack.skill != 4111004
                && !GameConstants.isMercedes(chr.getJob())
                && (GameConstants.isUsingArrowForBowJob(chr.getJob())
                || GameConstants.isUsingArrowForCrossBowJob(chr.getJob())
                || GameConstants.isUsingStarJob(chr.getJob())
                || GameConstants.isUsingBulletJob(chr.getJob()))) {
            if (attack.slot == 0) {
                for (IItem item : chr.getInventory(MapleInventoryType.USE).list()) {
                    if (GameConstants.isUsingBulletJob(chr.getJob()) && GameConstants.isBullet(item.getItemId())) {
                        projectile = item.getItemId();
                        break;
                    } else if (GameConstants.isUsingStarJob(chr.getJob()) && GameConstants.isThrowingStar(item.getItemId())) {
                        projectile = item.getItemId();
                        break;
                    } else if (GameConstants.isUsingArrowForBowJob(chr.getJob()) && GameConstants.isArrowForBow(item.getItemId())) {
                        projectile = item.getItemId();
                        break;
                    } else if (GameConstants.isUsingArrowForCrossBowJob(chr.getJob()) && GameConstants.isArrowForCrossBow(item.getItemId())) {
                        projectile = item.getItemId();
                        break;
                    }
                }
            } else {
                projectile = chr.getInventory(MapleInventoryType.USE).getItem(attack.slot).getItemId();
            }
            boolean termed = false;
            if (projectile == 0) {
                if (chr.getJob() >= 3500 && chr.getJob() <= 3512) {
                    projectile = 2330000;
                }
                if (chr.getJob() == 501 || (chr.getJob() >= 530 && chr.getJob() <= 533)) {
                    projectile = 2330000;
                }
                if (projectile == 0) {
                    projectile = 0;
                }
                termed = true;
            }
            ///////////////////캐시 표창 멀티//////////////////////////////
            for (IItem item : chr.getInventory(MapleInventoryType.CASH)) {
                if ((item.getItemId() / 1000) == 5021) {
                    visProjectile = item.getItemId();
                    break;
                }
            }
            if ((visProjectile / 1000) != 5021) {
                visProjectile = projectile;
            }
            ///////////////////////////////////////////////////////////////
            if (chr.getBuffedValue(BuffStats.CTS_NoBulletConsume) == null && !termed) {
                IItem ipp = chr.getInventory(MapleInventoryType.USE).getItem(attack.slot);
                int bulletConsume = bulletCount;
                if (effect != null && effect.getBulletConsume() != 0) {
                    bulletConsume = effect.getBulletConsume() * (ShadowPartner != null ? 2 : 1);
                }
                if ((chr.getJob() == 411 || chr.getJob() == 412) && bulletConsume > 0 && ipp.getQuantity() < ItemInformation.getInstance().getSlotMax(projectile) && chr.getBuffedValue(BuffStats.CTS_NoBulletConsume) == null) {
                    final ISkill expert = SkillFactory.getSkill(4110012);
                    if (chr.getSkillLevel(expert) > 0) {
                        final SkillStatEffect eff = expert.getEffect(chr.getSkillLevel(expert));
                        if (eff.makeChanceResult()) {
                            ipp.setQuantity((short) (ipp.getQuantity() + 1));
                            c.getSession().write(MainPacketCreator.updateInventorySlot(MapleInventoryType.USE, ipp, false));
                            bulletConsume = 0;
                        }
                    }
                }
                if ((bulletConsume > 0) && (!GameConstants.isMechanic(chr.getJob()))) {
                    InventoryManipulator.removeById(c, MapleInventoryType.USE, projectile, bulletConsume, false, true);
                }
            }
        }
        if (effect != null) {
            int cooldown = effect.getCooldown();
            if (cooldown > 0) {
                if (attack.skill == 3221007) {
                    if (chr.getSkillLevel(3220051) > 0) {
                        cooldown = 0;
                    }
                }
                c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(attack.skill, cooldown, chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                chr.addCooldown(attack.skill, System.currentTimeMillis(), cooldown * 1000);
            }
        }
        if (GameConstants.isZero(chr.getJob())) {
            chr.getMap().broadcastMessage(chr, MainPacketCreator.showSkillEffect(chr.getId(), skillLevel, attack.skill, attack.skillLevel, 0, 1, chr.getPosition(), null, !(attack.animation >= 0)), chr.getPosition());
        }

        chr.getMap().broadcastMessage(chr, MainPacketCreator.attack(RecvPacketOpcode.RANGED_ATTACK, chr, chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.animation, attack.speed, attack.allDamage, attack.position, (byte) 0, 0, chr.getLevel(), visProjectile), chr.getPosition());
        DamageParse.applyAttack(attack, skill, chr, bulletCount, effect, ShadowPartner != null ? AttackType.RANGED_WITH_SHADOWPARTNER : AttackType.RANGED);
    }

    public static void MagicDamage(ReadingMaple rh, MapleClient c, MapleCharacter chr) {
        if (c.getPlayer() == null || chr == null || !chr.isAlive()) {
            c.getSession().writeAndFlush(MainPacketCreator.resetActions(c.getPlayer()));
            return;
        }

        AttackInfo attack = DamageParse.parseDmgMa(rh);
        int bulletCount = 1;
        int skillLevel = attack.skillLevel;

        ISkill skill = SkillFactory.getSkill(attack.skill);
        SkillStatEffect effect = attack.getAttackEffect(chr, skillLevel, skill);
        MapleMap map = chr.getMap();
        if (GameConstants.SurfaceDamageSkillLink(attack.skill)) {
            for (int i = 0; i < attack.allDamage.size(); ++i) { //마리수
                for (int x = 0; x < attack.allDamage.get(i).attack.size(); ++x) { //뎀지수
                    MapleMonster Target = chr.getMap().getMonsterByOid(attack.allDamage.get(i).objectid);
                    Target.damage(chr, attack.allDamage.get(i).attack.get(x).left, false, 0);
                    if (Target.getHp() <= 0) {
                        break;
                    }
                }
            }
        }

        chr.checkFollow();
        attack = DamageParse.Modify_AttackCrit(attack, chr, 3, effect);

        if (effect.getCooldown() > 0) {
            if (!chr.isEquilibrium() && !GameConstants.isDarkSkills(attack.skill)) {
                c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(attack.skill, effect.getCooldown(), chr.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, chr.isGM()));
                chr.addCooldown(attack.skill, System.currentTimeMillis(), effect.getCooldown() * 1000);
            }
        }

        chr.getMap().broadcastMessage(chr, MainPacketCreator.attack(RecvPacketOpcode.MAGIC_ATTACK, chr, chr.getId(), attack.tbyte, attack.skill, skillLevel, attack.display, attack.animation, attack.speed, attack.allDamage, attack.position, (byte) 0, attack.charge, chr.getLevel(), 0), chr.getPosition());
        switch (attack.skill) {
            case 27101100: // 실피드 랜서
            case 27101202: // 보이드 프레셔
            case 27111100: // 스펙트럴 라이트
            case 27111202: // 녹스피어
            case 27121100: // 라이트 리플렉션
            case 27121202: // 아포칼립스
            case 2121006:
            case 2221003:
            case 2221006:
            case 2221007:
            case 2221012:
            case 2321007: // 엔젤 레이
            case 2121003: // 미스트 이럽션
            case 22181002: //다크포그
                bulletCount = effect.getAttackCount();
                DamageParse.applyAttack(attack, skill, chr, bulletCount, effect, AttackType.RANGED);
                break;
            default:
                DamageParse.applyAttackMagic(attack, skill, c.getPlayer(), effect);
                break;
        }
    }

    public static void WheelOfFortuneEffect(int itemId, MapleCharacter chr) {
        switch (itemId) {
            case 5510000: {
                if (!chr.isAlive()) {
                    chr.getMap().broadcastMessage(chr, MainPacketCreator.showSpecialEffect(chr.getId(), itemId), false);
                }
                break;
            }
            default:
                break;
        }
    }

    public static void DropMeso(int meso, MapleCharacter chr) {
        if (!chr.isAlive() || (meso < 10 || meso > 50000) || (meso > chr.getMeso())) {
            chr.getClient().getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        chr.gainMeso(-meso, false, true);
        chr.getMap().spawnMesoDrop(meso, chr.getPosition(), chr, chr, true, (byte) 0);
    }

    public static void ChangeEmotion(int emote, MapleCharacter chr) {
        if (emote > 7) {
            int emoteid = 5159992 + emote;
            MapleInventoryType type = GameConstants.getInventoryType(emoteid);
        }
        if (emote > 0) {
            chr.getMap().broadcastMessage(chr, MainPacketCreator.facialExpression(chr, emote), false);
        }
    }

    public static void ChangeEmotionAndroid(int emote, MapleCharacter chr) {
        if (emote > 0) {
            chr.getMap().broadcastMessage(chr, AndroidPacket.showAndroidEmotion(chr.getId(), emote), false);
        }
    }

    public static void Heal(ReadingMaple rh, MapleCharacter chr) {
        rh.skip(8);
        int healHP = rh.readShort();
        int healMP = rh.readShort();
        PlayerStats stats = chr.getStat();
        if (stats.getHp() <= 0) {
            return;
        }
        if (healHP != 0) {
            chr.addHP(healHP);
        }
        if (healMP != 0) {
            chr.addMP(healMP);
        }
    }

    public static final void MoveAndroid(final ReadingMaple rh, final MapleClient ha, final MapleCharacter hp) {
        rh.skip(12); //v192 +4byte.
        final List<LifeMovementFragment> res = MovementParse.parseMovement(rh);
        if (res != null && hp != null && res.size() != 0 && hp.getMap() != null && hp.getAndroid() != null) { // map crash hack
            final Point pos = new Point(hp.getAndroid().getPosition());
            hp.getAndroid().updatePosition(res);
            hp.getMap().broadcastMessage(hp, AndroidPacket.moveAndroid(hp.getId(), pos, res), false);
        }
    }

    public static void MovePlayer(ReadingMaple rh, MapleClient c, MapleCharacter chr) {
        Point Original_Pos = chr.getPosition(); // 4 bytes Added on v.80 MSEA
        rh.skip(22); // v192 Unknown +4byte.
        List<LifeMovementFragment> res = null;
        try {
            res = MovementParse.parseMovement(rh);
        } catch (ArrayIndexOutOfBoundsException aioobe) {
            if (!ServerConstants.realese) {
                aioobe.printStackTrace();
            }
            System.out.println("Movement Parse Error : " + rh.toString());
        }
        if (res != null) { // TODO more validation of input data
            MapleMap map = c.getPlayer().getMap();
            if (chr.isHidden()) {
                chr.setLastRes(res);
            } else {
                map.broadcastMessage(chr, MainPacketCreator.movePlayer(chr.getId(), res, Original_Pos), false);
            }
            MovementParse.updatePosition(res, chr, 0);
            Point pos = chr.getTruePosition();
            map.movePlayer(chr, chr.getPosition());

            if ((chr.getFollowId() > 0) && (chr.isFollowOn()) && (chr.isFollowInitiator())) {
                MapleCharacter fol = map.getCharacterById_InMap(chr.getFollowId());
                if (fol != null) {
                    Point original_pos = fol.getPosition();
                    fol.getClient().getSession().writeAndFlush(MainPacketCreator.moveFollow(Original_Pos, original_pos, pos, res));
                    MovementParse.updatePosition(res, fol, 0);
                    map.movePlayer(fol, pos);
                    map.broadcastMessage(fol, MainPacketCreator.movePlayer(fol.getId(), res, Original_Pos), false);
                } else {
                    chr.checkFollow();
                }
            }
        }
    }

    public static void ChangeMapSpecial(String portal_name, MapleClient c, MapleCharacter chr) {
        MaplePortal portal = chr.getMap().getPortal(portal_name);
        if (portal != null) {
            portal.enterPortal(c);
        }
    }

    public static void ChangeMap(ReadingMaple rh, MapleClient c, MapleCharacter chr) {
        if (rh.available() != 0) {
            rh.skip(7); // 1 = from dying 2 = regular portals
            int targetid = rh.readInt();
            MaplePortal portal = chr.getMap().getPortal(rh.readMapleAsciiString());
            if (rh.available() >= 7) {
                rh.skip(4);
            }
            if (chr.getMapId() == 109090300) {
                chr.dropMessage(1, "술래잡기가 다 끝날 때까지 기다려주세요! 보상있습니다.");
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                return;
            }
            boolean wheel = rh.readShort() > 0;
            if (targetid != -1 && !chr.isAlive()) {
                if (chr.getEventInstance() != null) {
                    chr.getEventInstance().revivePlayer(chr);
                }
                chr.setStance(0);
                if (wheel && chr.getEventInstance() == null) {
                    if (chr.haveItem(5510000, 1, false, true)) { // Wheel of Fortune
                        chr.getStat().setHp((chr.getStat().getMaxHp() / 100) * 40, chr);
                        InventoryManipulator.removeById(c, MapleInventoryType.CASH, 5510000, 1, true, false);
                        MapleMap to = chr.getMap();
                        chr.changeMap(to, to.getPortal(0));
                    } else {
                        chr.getStat().setHp(50, chr);
                        MapleMap to = chr.getMap().getReturnMap();
                        chr.changeMap(to, to.getPortal(0));
                        if (chr.getParty() != null) {
                            if (chr.getParty().getExpedition() != null && chr.getParty().getExpedition().getLastBossMap() != -1) {
                                chr.getParty().getExpedition().addDeadChar(chr.getId());
                            }
                        }
                    }
                } else {
                    chr.getStat().setHp(50, chr);
                    MapleMap to = chr.getMap().getReturnMap();
                    chr.changeMap(to, to.getPortal(0));
                    if (chr.getParty() != null) {
                        if (chr.getParty().getExpedition() != null && chr.getParty().getExpedition().getLastBossMap() != -1) {
                            chr.getParty().getExpedition().addDeadChar(chr.getId());
                        }
                    }
                }
            } else if (targetid != -1 && chr.isGM()) {
                if (chr.getEventInstance() == null) {
                    MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetid);
                    chr.changeMap(to, to.getPortal(0));
                } else {
                    MapleMap to = chr.getEventInstance().getMapFactory().getMap(targetid);
                    chr.changeMap(to, to.getPortal(0));
                }
            } else if (portal != null) {
                portal.enterPortal(c);
            } else {
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            }
        }
    }

    public static void InnerPortal(ReadingMaple rh, MapleClient c, MapleCharacter chr) {
        MaplePortal portal = c.getPlayer().getMap().getPortal(rh.readMapleAsciiString());
        int toX = rh.readShort();
        int toY = rh.readShort();

        if (portal == null) {
            c.disconnect(true, false);
            return;
        }
        chr.getMap().movePlayer(chr, new Point(toX, toY));
        chr.checkFollow();
    }

    public static void Agi_Buff(ReadingMaple rh, MapleClient c) {
        int skill = rh.readInt();
        if (c.getPlayer().getSkillLevel(skill) > 0) {
            SkillStatEffect eff = SkillFactory.getSkill(skill).getEffect(c.getPlayer().getSkillLevel(skill));
            if (eff.makeChanceResult()) {
                eff.applyTo(c.getPlayer());
            }
        }
    }

    public static void RoomChange(ReadingMaple rh, MapleClient c, MapleCharacter player) {
        if (player.getMapId() < 910000000 || player.getMapId() > 910000022) {
            c.getPlayer().ea();
            return;
        }
        byte channel = rh.readByte();
        int targetMap = rh.readInt();
        MapleMap to = ChannelServer.getInstance(c.getChannel()).getMapFactory().getMap(targetMap);

        if (c.getChannel() != channel) {
            if (c.getPlayer().getLastCC() + 10000 > System.currentTimeMillis()) {
                c.getPlayer().message(5, "채널 이동은 10초마다 가능합니다.");
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
                return;
            }
            c.getPlayer().crossChannelWarp(c, targetMap, channel);
        } else {
            player.changeMap(to, to.getPortal("sp"));
        }
    }

    public static void makerSkill(ReadingMaple rh, MapleClient c) {
        ItemInformation ii = ItemInformation.getInstance();
        int type = rh.readInt();// type: 1 = make something, 4 = dissassemble, 3 = make monster crystals
        int toCreate = rh.readInt();
        switch (type) {
            case 1:
                MakerItemFactory.MakerItemCreateEntry recipe = MakerItemFactory.getItemCreateEntry(toCreate);
                if (!canCreate(c, recipe) || c.getPlayer().getInventory(ii.getInventoryType(toCreate)).isFull()) {
                    c.getPlayer().dropMessage(1, "해당 아이템이 없거나 인벤토리가 꽉 찼습니다.");
                    return;
                }
                c.getPlayer().gainMeso(-recipe.getCost(), false);
                for (Pair<Integer, Integer> p : recipe.getReqItems()) {
                    int toRemove = p.getLeft();
                    InventoryManipulator.removeById(c, ii.getInventoryType(toRemove), toRemove, p.getRight(), false, false);
                }
                if (ii.getInventoryType(toCreate) == MapleInventoryType.EQUIP) {
                    boolean prodStim = rh.readByte() == 1; // 1 = production manual used, 0 = not
                    int gemz = rh.readShort(); // amount of gems used
                    rh.readShort(); // O_o
                    Equip item = (Equip) ii.getEquipById(toCreate);
                    if (prodStim) {
                        int prodId = recipe.getcatalyst();
                        if (prodId == -1) {
                            c.getPlayer().dropMessage(1, "Something went wrong, please notify a GM about this issue.");
                            return;
                        }
                        if (!c.getPlayer().haveItem(prodId)) { // meaning he tried to packet edit, feel free to autoban here
                            return;
                        }
                        if (new Random().nextInt(9) < 1) { // 10% fail rate when u use a stimulator
                            item = null;
                        } else {
                            item = ii.randomizeStats(item);
                        }
                        InventoryManipulator.removeById(c, MapleInventoryType.ETC, prodId, 1, false, false);
                    }
                    for (int i = 0; i < gemz; i++) {
                        int gem = rh.readInt();
                        if (c.getPlayer().haveItem(gem)) {
                            InventoryManipulator.removeById(c, MapleInventoryType.ETC, gem, 1, false, false);
                            ii.addCrystalEffect(item, gem);
                        } else { // he/she tried to packet edit
                            return;
                        }
                    }
                    if (item != null) {
                        InventoryManipulator.addFromDrop(c, item, true);
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.getScrollEffect(c.getPlayer().getId(), IEquip.ScrollResult.SUCCESS));
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.showSpecialEffect(0x12)); //1.2.251+, (+1)
                        c.getPlayer().dropMessage(1, "제작 성공하였습니다.");
                    } else {
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.getScrollEffect(c.getPlayer().getId(), IEquip.ScrollResult.FAIL));
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.showSpecialEffect(0x12)); //1.2.251+, (+1)
                        c.getPlayer().dropMessage(1, "Failed attempt to create your item.");
                    }
                } else { //strengthening crystals O:
                    Pair<Integer, Short> reward = recipe.getRandomReward();
                    InventoryManipulator.addById(c, reward.getLeft(), reward.getRight());
                    c.getSession().writeAndFlush(MainPacketCreator.getShowItemGain(reward.getLeft(), reward.getRight(), true));
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.getScrollEffect(c.getPlayer().getId(), reward.getLeft() >= toCreate ? IEquip.ScrollResult.SUCCESS : IEquip.ScrollResult.FAIL));
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.showSpecialEffect(0x12)); //1.2.251+, (+1)
                    c.getPlayer().dropMessage(1, reward.getLeft() >= toCreate ? "Congratulations! You've succeeded in the making of the item! You've made " : "Failed attempt to create your item.");
                }
                break;
            case 3:
                // monster crystal making
                if (c.getPlayer().getItemQuantity(toCreate, false) >= 100) {
                    int lvl = ii.getETCMonsLvl(toCreate);
                    if (lvl != -1) {
                        InventoryManipulator.removeById(c, MapleInventoryType.ETC, toCreate, 100, false, false);
                        InventoryManipulator.addById(c, Math.min(Math.max(5, (int) Math.ceil(lvl / 10.0)) - 5 + 4260000, 4260008), (short) 1);
                        c.getPlayer().dropMessage(1, "Congratulations. You've made 1 Monster Crystals!");
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.showSpecialEffect(0x12)); //1.2.251+, (+1)
                        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.getScrollEffect(c.getPlayer().getId(), IEquip.ScrollResult.SUCCESS));
                    } else {
                        c.getPlayer().dropMessage(1, "You cannot use these items to make a monster crystal!");
                    }
                }
                break;
            case 4:
                //dissassemble
                rh.readInt(); // No idea what this is, it's always 1 so maybe the amount? O:
                short slot = rh.readShort();
                if (c.getPlayer().haveItem(toCreate)) {
                    InventoryManipulator.removeFromSlot(c, slot >= 0 ? MapleInventoryType.EQUIP : MapleInventoryType.EQUIPPED/*I'm not sure u can put one of ur equipped items but w.e not taking risks :D*/, (byte) slot, (short) 1, false);
                    int itemToGain = ((ii.getReqLevel(toCreate) - 50) / 10) + 4260000;
                    int amount = ii.getWeaponType(toCreate) == MapleWeaponType.NOT_A_WEAPON ? new Random().nextInt(15) + 6 : new Random().nextInt(15) + 20; // I never checked the real amounts but that's about what i Maple in GMS O_o
                    InventoryManipulator.addById(c, itemToGain, (short) amount);
                    c.getPlayer().dropMessage(1, "Congratulations. You've made " + amount + " Monster Crystals!");
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.getScrollEffect(c.getPlayer().getId(), IEquip.ScrollResult.SUCCESS));
                    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.showSpecialEffect(0x12)); //1.2.251+, (+1)
                    c.getSession().writeAndFlush(MainPacketCreator.getShowItemGain(itemToGain, (short) amount, true));
                }
                break;
            default:
                break;
        }
    }

    public static boolean canCreate(MapleClient c, MakerItemFactory.MakerItemCreateEntry recipe) {
        return hasItems(c, recipe) && c.getPlayer().getMeso() >= recipe.getCost() && c.getPlayer().getLevel() >= recipe.getReqLevel() && c.getPlayer().getSkillLevel(c.getPlayer().getJob() / 1000 * 1000 + 1007) >= recipe.getReqSkillLevel();
    }

    public static boolean hasItems(MapleClient c, MakerItemFactory.MakerItemCreateEntry recipe) {
        for (Pair<Integer, Integer> p : recipe.getReqItems()) {
            int itemId = p.getLeft();
            if (c.getPlayer().getInventory(ii.getInventoryType(itemId)).countById(itemId) < p.getRight()) {
                return false;
            }
        }
        return true;
    }

    public static void VoydPressure(ReadingMaple rh, MapleCharacter chr) {
        chr.getMap().broadcastMessage(chr, MainPacketCreator.showVoydPressure(chr.getId(), rh.toString(true).replace("리시브 데이터 : ", "")), false);
    }

    //37 01 04 00
    /*
    DF 17 00 00

    2F 00 00 00

    00 FF 52 00

    9E AA 4F 00

    00 00

    1E 00 07 00

    09 00

    78 00 00 00

    28 00 00 00
     */
    public static void subSummonAction(ReadingMaple rh, MapleClient c) {
        short check = rh.readShort();
        if (check == 4) {
            int cid = rh.readInt();
            int value1 = rh.readInt();
            int value2 = rh.readInt();
            int skillid = rh.readInt();
            short value7 = rh.readShort();
            int value3 = rh.readInt();
            int value4 = rh.readShort();
            int value5 = rh.readInt();
            int value6 = rh.readInt();
            c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MainPacketCreator.spawnSubSummon(check, c.getPlayer(), value1, value2, value3, value4, value5, value6, value7, skillid), true);
        } else if (check == 0) {
            rh.skip(4); //cid
            int BodyID = rh.readInt();
            byte v1 = rh.readByte();
            short x = rh.readShort();
            short y = rh.readShort();
            short v76 = 0;
            short Radius = 0;
            if (v1 == 5) {
                v76 = rh.readShort();
                Radius = rh.readShort();
            } else if (v1 == 6) {
                rh.skip(4);
            }
            short ForceY = rh.readShort();
            int skillid = rh.readInt();
            short sLV = rh.readShort();
            byte ForceX = rh.readByte();
            byte Redraw = rh.readByte();
            short m_bIsEncryptedByShanda = rh.readShort();
            short m_uOffset = rh.readShort();
            short time = rh.readShort();
            c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MainPacketCreator.spawnSubSummon(c.getPlayer(), check, BodyID, v1, x, y, v76, Radius, ForceY, m_bIsEncryptedByShanda, m_uOffset, (short) time, skillid, sLV, Redraw, ForceX), true);
        } else if (check == 3) {
            int cid = rh.readInt();
            int BodyID = rh.readInt();
            int skillid = rh.readInt();
            int skillLevel = rh.readInt();
            int v1 = rh.readInt();
            int v2 = rh.readInt();
            c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MainPacketCreator.moveSubSummon(c.getPlayer(), check, cid, skillid, v1, v2), true);
        }
    }

    public static void getStarPlanetRank(final ReadingMaple rh, final MapleCharacter chr) {
        List name = new LinkedList();
        List level = new LinkedList();
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM characters WHERE gm = 0 ORDER BY level DESC LIMIT 100");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                name.add(rs.getString("name"));
                level.add(Integer.valueOf(rs.getInt("level")));
            }
            rs.close();
            ps.close();
            con.close();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        chr.send(MainPacketCreator.getStarPlanetRank(name, level));
    }

    public static void warpToStarplanet(final byte action, final ReadingMaple rh, final MapleCharacter chr) {
        if (action == 2) {
            rh.skip(1); //알 수 없음.
            int mapcode = rh.readInt(); //이전에 있는 맵의 코드.
            int direction = rh.readByte(); //현재 스타플래닛 맵이면 1, 아니면 0.

            if (direction == 1) {
                chr.dropMessage(5, "[알림] " + ServerConstants.serverName + "의 광장인 스타플래닛맵으로 이동합니다.");
                MapleMap map = chr.getClient().getChannelServer().getMapFactory().getMap(340000100);
                chr.changeMap(map, map.getPortal(0));
            } else {
                chr.dropMessage(5, "[알림] 광장으로 이동하기 이전의 맵으로 다시 이동합니다.");
                MapleMap map = chr.getClient().getChannelServer().getMapFactory().getMap(chr.getKeyValue2("Return_to_Starplanet"));
                chr.changeMap(map, map.getPortal(0));
            }
            chr.setKeyValue2("Return_to_Starplanet", mapcode);
        }
    }

    public static void MapleGuide(final ReadingMaple rh, final short action, final MapleCharacter chr) {
        if (action == 0) {
            final int mapid = rh.readInt();
            MapleMap map = chr.getClient().getChannelServer().getMapFactory().getMap(mapid);
            chr.changeMap(map, map.getPortal(0));
        }
    }

    public static void MapleChat(ReadingMaple rh, MapleCharacter chr) {
        byte type = rh.readByte();
        int first_rank = 0;
        int second_rank = 0;
        int i = 0;
        try {
            ResultSet sql = MYSQL.getConnection().prepareStatement("SELECT * FROM characters WHERE gm = 0 ORDER BY level DESC LIMIT 2").executeQuery();
            while (sql.next()) {
                i++;
                if (i == 1) {
                    first_rank = sql.getInt("id");
                } else if (i == 2) {
                    second_rank = sql.getInt("id");
                }
            }
            sql.close();
        } catch (SQLException ex) {
            System.out.println(ex + "");
        }
        chr.send(UIPacket.getMapleStar(type, chr.getClient(), first_rank, second_rank));
    }

    public static void OrbitalAttack(ReadingMaple rh, final MapleCharacter chr) {
        if (chr == null) {
            return;
        }
        AttackInfo attack = DamageParse.parseDmgOrb(rh);
        SkillStatEffect effect = null;
        ISkill skill = null;
        skill = SkillFactory.getSkill(attack.skill);
        effect = attack.getAttackEffect(chr, 0, skill);
        DamageParse.applyAttack(attack, skill, chr, 1, effect, AttackType.NON_RANGED);
    }

    public static void OrbitalFlame(final ReadingMaple rh, final MapleClient c) {
        MapleCharacter chr = c.getPlayer();
        int tempskill = rh.readInt();
        byte unk = rh.readByte();
        int direction = rh.readShort();
        int skillid = 0;
        AtomicInteger elementid = new AtomicInteger(0);
        int effect = 0;
        int mobCount = 8;
        switch (tempskill) {
            case 12001020:
                skillid = 12000026;
                elementid.set(12000022);
                effect = 1;
                mobCount = 4;
                break;
            case 12100020:
                skillid = 12100028;
                elementid.set(12100026);
                effect = 2;
                break;
            case 12110020:
                skillid = 12110028;
                elementid.set(12110024);
                effect = 3;
                break;
            case 12120006:
                skillid = 12120010;
                elementid.set(12120007);
                effect = 4;
                break;
        }
        SkillStatEffect flame = SkillFactory.getSkill(tempskill).getEffect(chr.getSkillLevel(tempskill));
        if (flame != null && chr.getSkillLevel(elementid.get()) > 0) {
            if (chr.getSummons().values().stream().filter(sum -> sum.right.getSkill() == elementid.get()).count() == 0) {
                SkillStatEffect element = SkillFactory.getSkill(elementid.get()).getEffect(chr.getSkillLevel(elementid.get()));
                MapleSummon summon = new MapleSummon(chr, element, chr.getPosition(), SummonMovementType.FOLLOW, System.currentTimeMillis());
                chr.getMap().spawnSummon(summon, true, element.getDuration());
                chr.getSummons().put(summon.getObjectId(), new Pair<>(elementid.get(), summon));
                element.applyTo(chr);
            }
        }
        chr.getMap().broadcastMessage(MainPacketCreator.OrbitalFlame(chr.getId(), skillid, effect, direction, flame.getRange(), mobCount));
    }

    public static final void ChangeInner(ReadingMaple rh, MapleClient ha) {
        int rank = rh.readInt(); //고정한 등급
        int count = rh.readInt(); //고정한 어빌리티 갯수
        int consume = 100 + (rank == 1 ? 400 : rank == 2 ? 5000 : rank == 3 ? 10000 : 0) + (count == 1 ? 3000 : count == 2 ? 8000 : 0);
        ha.getPlayer().setInnerExp(ha.getPlayer().getInnerExp() - consume);
        ha.getPlayer().getClient().getSession().writeAndFlush(MainPacketCreator.updateInnerExp(ha.getPlayer().getInnerExp()));
        List<InnerSkillValueHolder> newValues = new LinkedList<InnerSkillValueHolder>();
        int i = 1;
        int line = count >= 1 ? rh.readInt() : 0;
        int line2 = count >= 2 ? rh.readInt() : 0;
        boolean check_rock = false;
        for (InnerSkillValueHolder isvh : ha.getPlayer().getInnerSkills()) {
            switch (count) {
                case 1:
                    check_rock = line == i;
                    break;
                case 2:
                    check_rock = line == i || line2 == i;
                    break;
                default:
                    check_rock = false;
                    break;
            }
            if (check_rock) {
                newValues.add(isvh);
            } else {
                newValues.add(InnerAbillity.getInstance().renewSkill(rank > 0 ? rank : isvh.getRank(), 0, false));
            }
            ha.getPlayer().changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), (byte) 0, (byte) 0);
            i++;
        }
        ha.getPlayer().getInnerSkills().clear();
        for (InnerSkillValueHolder isvh : newValues) {
            ha.getPlayer().getInnerSkills().add(isvh);
            ha.getPlayer().changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), isvh.getSkillLevel(), isvh.getSkillLevel());
            ha.getPlayer().getClient().getSession().writeAndFlush(MainPacketCreator.updateInnerAbility(isvh, ha.getPlayer().getInnerSkills().size(), ha.getPlayer().getInnerSkills().size() == 3));
        }
        ha.getPlayer().getClient().getSession().writeAndFlush(UIPacket.showPopupMessage("어빌리티 재설정에 성공 하였습니다."));
    }

    public static int getRank() {
        return Rank;
    }

    public static void Holly(ReadingMaple rh, MapleClient c) {
        rh.readByte();
        MapleCharacter player = c.getPlayer();

        if (player == null) {
            return;
        }

        int oid = rh.readInt();
        int skillId = rh.readInt();
        rh.skip(4);

        MapleMist mist = (MapleMist) player.getMap().getMapObject(oid);
        if (mist == null) {
            return;
        }
        if (mist.getSourceSkill().getId() == skillId) {
            SkillStatEffect effect = mist.getSource();
            // MP #mpCon 소비, 사용 시 HP #x% 회복, 총 #y번 사용 가능, 유지 시간 #time초. 재사용 대기시간 #cooltime초
            if (mist.getUseEffectCount() > 0) {
                int incHpPer = effect.getX();
                double incHp = player.getStat().getMaxHp() * (incHpPer * 0.01);

                player.addHP((int) incHp);
                mist.decrementUseEffectCount(); // 사용 가능횟수 감소
                if (player.isGM()) {
                    player.dropMessage(5, "[디버그] incHp : " + incHp + ", 남은 사용 횟수 : " + mist.getUseEffectCount());
                }
            } else {
                player.dropMessage(5, "사용 가능한 횟수를 모두 사용하여 사용할 수 없습니다.");
            }
        }
        c.getSession().writeAndFlush(MainPacketCreator.resetActions());
    }

    public static void Move_Greaned(ReadingMaple rh, MapleClient c) {
        byte[] unk1 = rh.read(8);
        rh.skip(4);
        byte[] unk2 = rh.read(4);
        int skillid = rh.readInt();
        rh.skip(4);
        byte direction = rh.readByte();
        rh.skip(8);
        if (skillid == 12121001) {
            c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(skillid, 5, c.getPlayer().getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, c.getPlayer().isGM()));
            c.getPlayer().addCooldown(skillid, System.currentTimeMillis(), 5 * 1000);
        }
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MainPacketCreator.showStardust(c.getPlayer().getId(), unk1, unk2, skillid, direction), false);
        c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MainPacketCreator.showSkillEffect(c.getPlayer().getId(), skillid, c.getPlayer().getSkillLevel(skillid)), false);
    }

    public static void mistSkill(ReadingMaple rh, MapleCharacter chr) {
        int duration = 0;
        final int skillId = rh.readInt(); //칠링 스텝, 이그나이트
        if (skillId == 2100010) {
            duration = rh.readInt(); //300 or 350.
        }
        final int size = rh.readShort();
        SkillStatEffect effect = SkillFactory.getSkill(skillId).getEffect(chr.getSkillLevel(skillId));
        for (int i = 0; i < (size * 2); i++) {
            Point pos = rh.readIntPos();
            chr.getMap().spawnMist(new MapleMist(effect.calculateBoundingBox(pos, chr.isFacingLeft()), chr, effect, effect.getSkillStats().getLevel(), chr.getPosition()), (skillId == 2100010) ? (duration * 20) : (size * 2000), false, false, false, false, false, false, false);
        }
    }

    public static void CharacterCard(ReadingMaple rh, MapleClient c) {
        Map<Integer, Integer> card = new HashMap<Integer, Integer>();
        for (int i = 0; i < 9; i++) {
            card.put(i, rh.readInt());
        }
        c.setCharacterCard(card);
    }

    public static void OnOpenGateClose(ReadingMaple rm, MapleClient c) {
        int cid = rm.readInt();
        c.getPlayer().getMap().broadcastMessage(MechanicSkill.OnOpenGateClose(cid));
    }

    public static void CreateKinesisPsychicArea(ReadingMaple rm, MapleClient c) {
        int nAction = rm.readInt();
        int ActionSpeed = rm.readInt();
        int PsychicAreaKey = rm.readInt();
        int LocalKey = rm.readInt();
        int SkillID = rm.readInt();
        short SLV = rm.readShort();
        int DurationTime = rm.readInt();
        byte second = rm.readByte();
        short SkeletonFieldPathIdx = rm.readShort();
        short SkeletonAniIdx = rm.readShort();
        short SkeletonLoop = rm.readShort();
        long mask8 = rm.readLong();
        SkillStatEffect eff = SkillFactory.getSkill(SkillID).getEffect(SLV);
        c.getPlayer().getMap().broadcastMessage(MainPacketCreator.OnCreatePsychicArea(c.getPlayer().getId(), nAction, ActionSpeed, LocalKey, SkillID, SLV, PsychicAreaKey, DurationTime, second, SkeletonFieldPathIdx, SkeletonAniIdx, SkeletonLoop, mask8));
        c.getPlayer().givePPoint(eff);
        if (eff.getCooldown() > 0) {
            c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(SkillID, eff.getCooldown(), c.getPlayer().getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, c.getPlayer().isGM()));
            c.getPlayer().addCooldown(SkillID, System.currentTimeMillis(), eff.getCooldown());
        }
    }

    public static final void ReleasePsychicLock(ReadingMaple rm, MapleClient c) {
        int skillid = rm.readInt();
        int skillLevel = rm.readInt();
        int Count = rm.readInt();
        int oid = rm.readInt();
        int v1 = rm.readInt();
        long mask = rm.readLong();
        c.getSession().writeAndFlush(KinesisSkill.OnReleasePsychicLock(c.getPlayer().getId(), skillid));
    }

    public static final void DoActivePsychicArea(ReadingMaple rm, MapleClient c) {
        int nPsychicAreaKey = rm.readInt();
        int v16 = rm.readShort();
        long ptCurrent = rm.readLong();
        c.getSession().writeAndFlush(MainPacketCreator.OnDoActivePsychicArea(nPsychicAreaKey, v16));
    }

    public static final void DebuffPsychicArea(ReadingMaple rm, MapleClient c) {
        int skillid = rm.readInt();
        short slv = rm.readShort();
        int v1 = rm.readInt();
        byte v2 = rm.readByte();
        int v3 = rm.readInt();
        int v4 = rm.readInt();
        short size = rm.readShort();
        ISkill theSkill = SkillFactory.getSkill(skillid);
        SkillStatEffect effect = theSkill.getEffect(slv);
        for (int i = 0; i < size; i++) {
            final MapleMonster monster = c.getPlayer().getMap().getMonsterByOid(rm.readInt());
            if (monster != null) {
                monster.applyStatus(c.getPlayer(), new MonsterStatusEffect(effect.getMonsterStati(), theSkill, slv, null, false), effect.getStatusDuration());
            }
        }
        short v5 = rm.readShort();
    }

    public static final void UserDamageSkinSaveRequest(final ReadingMaple rm, final MapleClient c) {
        byte active = rm.readByte();
        switch (active) {
            case 0x00: { // 저장
                c.getPlayer().saveDamageSkin(c, GameConstants.getDamageSkinItemByNumber(c.getPlayer().getDamageSkin()), active);
                c.send(MainPacketCreator.resetActions(c.getPlayer()));
                break;
            }

            case 0x02: { // 변경
                int skinnumber = rm.readShort();
                MapleQuest quest = MapleQuest.getInstance(7291);
                MapleQuestStatus queststatus = new MapleQuestStatus(quest, (byte) 1);
                String skinString = String.valueOf(skinnumber);
                queststatus.setCustomData(skinString == null ? "0" : skinString);
                c.getPlayer().updateQuest(queststatus);
                c.getPlayer().getMap().broadcastMessage(c.getPlayer(), MainPacketCreator.setDamageSkin(c.getPlayer(), skinnumber), false);
                c.send(MainPacketCreator.showQuestMessage("저장되있던 " + ItemInformation.getInstance().getName(GameConstants.getDamageSkinItemByNumber(skinnumber)) + "으로 스킨이 변경 되었습니다."));
                break;
            }

            default: {
                c.getPlayer().Message("active : " + active + " Data : " + rm.toString() + "");
                break;
            }
        }
    }

    public static void link_skill(ReadingMaple rh, MapleClient c) {
        try {
            int sid = rh.readInt();
            int ssid = sid;
            String sname = SkillFactory.getSkillName(sid);
            String pname = null;
            int cid = rh.readInt();
            rh.skip(4);
            if (c.getPlayer().getLevel() < 70) {
                c.getPlayer().dropMessage(1, "70 레벨 이상부터 전승이 가능합니다.");
                c.getPlayer().ea();
                return;
            }
            MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File("Property/wz/String.wz"));
            MapleData data = dataProvider.getData("Skill.img");
            List<Pair<Integer, String>> skillPairList = new LinkedList<>();
            for (MapleData skillIdData : data.getChildren()) {
                skillPairList.add(new Pair(Integer.valueOf(Integer.parseInt(skillIdData.getName())), MapleDataTool.getString(skillIdData.getChildByPath("name"), "NO-NAME")));
            }
            for (Pair<Integer, String> skillPair : skillPairList) {
                if (skillPair.getRight().toLowerCase().contains(sname) && (sid != skillPair.left.intValue())) {
                    sid = skillPair.left.intValue();
                    break;
                }
            }
            int l = c.getPlayer().getKeyValue2("linkskillTime");
            if ((l != -1) && (l > (int) (System.currentTimeMillis() / 1000L))) {
                int time = (int) (l - System.currentTimeMillis() / 1000L) / 60 / 60;
                c.getPlayer().dropMessage(1, "설정하신 시간 기준으로 24시간 후에 가능합니다. 약" + time + "시간이 남았습니다. ");
                c.getPlayer().ea();
                return;
            }
            data = null;
            dataProvider = null;
            Connection con = MYSQL.getConnection();
            if (con.prepareStatement("SELECT * FROM link_skill WHERE skillid = " + sid + " AND link_cid = " + c.getPlayer().getId()).executeQuery().next()) {
                PreparedStatement ps = con.prepareStatement("DELETE FROM link_skill WHERE link_cid = ?");
                ps.setInt(1, c.getPlayer().getId());
                ps.executeUpdate();
                ps.close();
            }
            PreparedStatement ps = con.prepareStatement("INSERT INTO link_skill (skillid, link_cid, cid, skilllevel) VALUES (?, ?, ?, ?)");
            ps.setInt(1, sid);
            ps.setInt(2, c.getPlayer().getId());
            ps.setInt(3, cid);
            ps.setInt(4, c.getPlayer().getLevel() >= 120 ? 2 : c.getPlayer().getLevel() >= 70 ? 1 : 0);
            //-------------------------------------------------------------------------------------------------------------------------//
            PreparedStatement pse = con.prepareStatement("SELECT * FROM `characters` WHERE `id` = ?");
            pse.setInt(1, cid);
            ResultSet rs = pse.executeQuery();
            if (rs.next()) {
                pname = rs.getString("name");
            }
            rs.close();
            pse.close();
            //-------------------------------------------------------------------------------------------------------------------------//
            if (ps.executeUpdate() == 1) {
                c.getPlayer().send(MainPacketCreator.getLinkedSkill(ssid, cid, pname));
            } else {
                c.getPlayer().dropMessage(1, "DB 등록에 실패하였습니다. 관리자에게 문의해주세요.");
            }
            ps.close();
            con = null;
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            c.getSession().write(MainPacketCreator.resetActions());
        }
    }

    public static void OnMemoInGameRequest(final ReadingMaple r, final MapleClient c) {
        if (c.getPlayer().getMeso() < 10000) {
            c.getPlayer().dropMessage(1, "메소가 부족 합니다.");
            return;
        }
        int v1 = r.readByte();
        String name = null;
        if (v1 == 0) {
            name = r.readMapleAsciiString();
        } else {
            int cid = r.readInt();
            try {
                name = BuddyListHandler.getCharacterNameFromId(cid);
            } catch (SQLException ex) {
                Logger.getLogger(PlayerHandler.class.getName()).log(Level.SEVERE, null, ex);
                return;
            }
        }
        String t = r.readMapleAsciiString();
        c.getPlayer().sendNote(name, t);
        c.getPlayer().dropMessage(1, name + "님에게 쪽지를 보냈습니다.");
    }

    public static void ChangeMeisterBillMap(final ReadingMaple rh, final MapleClient c) {
        MapleMap map = c.getChannelServer().getMapFactory().getMap(910001000);
        c.getPlayer().changeMap(map, map.getPortal(0));
    }

    public static void NameChange(ReadingMaple rp, MapleClient c) {
        final short type = rp.readShort();
        //if (type == 27) {
        c.getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "닉네임 변경신청이 완료 되었습니다. 캐릭터 선택 창에서 닉네임을 변경 할 수 있습니다."));
        c.getSession().writeAndFlush(MainPacketCreator.resetActions());
        c.getPlayer().gainItem(rp.readInt(), (short) -1, false, -1, "");
        c.setNameChangeValue(1, c.getPlayer().getAccountID());
        //  }
    }

    public static void NameChange_From_Login(ReadingMaple rp, MapleClient c) {
        final int cid = rp.readInt();
        final String beforeName = rp.readMapleAsciiString();
        final String afterName = rp.readMapleAsciiString();
        if (c.getNameChangeValue() == 0) {
            c.send(MainPacketCreator.serverNotice(1, "이미 닉네임을 변경 하였습니다."));
        } else if (beforeName.equals(afterName)) {
            c.getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "이전과 같은 닉네임으로는 변경 할 수 없습니다."));
        } else if (MapleCharacterUtil.canCreateChar(afterName)) {
            c.setCharName(afterName, cid);
            c.setNameChangeValue(0, c.getAccID());
            c.getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "닉네임 변경을 완료 하였습니다. 로그인을 다시 해주시길 바랍니다."));
        } else {
            c.getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "[" + afterName + "] 으로는 변경 할 수 없습니다."));
        }
        c.send(LoginPacket.getLoginFailed(20));
    }

    public static void UseBlazingExtinction(final ReadingMaple rh, final MapleClient c) {
        rh.skip(4);
        rh.skip(4);
        rh.skip(4);
        rh.skip(4);
        final int skillid = rh.readInt();
        rh.skip(4);
        rh.skip(1);
        rh.skip(4);
        rh.skip(4);
        final SkillStatEffect effect = SkillFactory.getSkill(skillid).getEffect(c.getPlayer().getSkillLevel(skillid));
        if (skillid == 12121001) {
            c.getSession().writeAndFlush(MainPacketCreator.skillCooldown(skillid, effect.getCooldown(), c.getPlayer().getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, c.getPlayer().getBuffedValue(BuffStats.CTS_FixCoolTime) != null, c.getPlayer().isGM()));
            c.getPlayer().addCooldown(skillid, System.currentTimeMillis(), effect.getCooldown());
        }
        c.getPlayer().dropMessage(6, skillid + " : [" + effect.getCooldown() * 1000 + "]");
    }

    public static void RemoveBlazingExtinction(final ReadingMaple rh, final MapleClient c) {
        int skillid = rh.readInt();
        rh.skip(1);
        int unk = rh.readInt();
    }

    public static void YoYoCount(final MapleClient c, boolean b) {
        if (GameConstants.isPinkBean(c.getPlayer().getJob())) {
            if (b && c.getPlayer().acaneAim > 8) {
                c.getPlayer().acaneAim--;
            } else if (!b && c.getPlayer().acaneAim < 8) {
                c.getPlayer().acaneAim++;
            }
            final SkillStatEffect effect = SkillFactory.getSkill(131001010).getEffect(c.getPlayer().getSkillLevel(131001010));
            c.getSession().writeAndFlush(MainPacketCreator.giveBuff(131001010, effect.getDuration(), Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PinkbeanYoYoStack, c.getPlayer().acaneAim, false)), SkillFactory.getSkill(131001010).getEffect(c.getPlayer().getSkillLevel(131001010)), null, SkillFactory.getSkill(131001010).getAnimationTime(), c.getPlayer()));
            c.getPlayer().dropMessage(6, "[핑크빈] 요요 충전");
        }
    }

    public static void CharacterPosition(final ReadingMaple littleEndianAccessor, final MapleClient mapleClient) {
        littleEndianAccessor.readInt();
        littleEndianAccessor.skip(1);
        final int int1 = littleEndianAccessor.readInt();
        final LinkedHashMap<Integer, Integer> linkedHashMap = new LinkedHashMap<Integer, Integer>();
        for (int i = 0; i < int1; ++i) {
            linkedHashMap.put(i + 1, littleEndianAccessor.readInt());
        }
        mapleClient.updateCharacterPosition(linkedHashMap, false);
    }

    public static void BlasterSkill(final ReadingMaple rh, final MapleClient c, boolean cancel) {
        if (!cancel) {
            rh.skip(1);
        }
        final int skillid = rh.readInt();
        c.getPlayer().dropMessage(6, "" + skillid);
        if (skillid == 37121004 && cancel) {
            //c.getPlayer().CylinderBuff(skillid, true);
            c.getSession().writeAndFlush(MainPacketCreator.cancelBuff(Collections.singletonList(BuffStats.CTS_IgnorePCounter), false, false, null));
            c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        if (!cancel && (skillid == 37100002 || skillid == 37110001 || skillid == 37110004 || skillid == 37101000 || skillid == 37100002 || skillid == 37110001 || skillid == 37110004 || skillid == 37101000)) {
            if (skillid == 37110001) {
                final ArrayList list;
                (list = new ArrayList()).add(skillid + 1);
                //c.send(MainPacketCreator.BlasterAttack(new Point(c.getPlayer().getPosition().x + 165, c.getPlayer().getPosition().y), skillid, list, c.getPlayer().isFacingLeft() ? -1 : 1));
            }
            c.getPlayer().giveBulletGauge(skillid, false);
            if (c.getPlayer().getSkillLevel(37110009) > 0) {
                if (c.getPlayer().getSkillLevel(37120012) > 0) {
                    SkillFactory.getSkill(37120012).getEffect(c.getPlayer().getSkillLevel(37120012)).applyTo(c.getPlayer());
                    return;
                }
                SkillFactory.getSkill(37110009).getEffect(c.getPlayer().getSkillLevel(37110009)).applyTo(c.getPlayer());
            }
        }
    }

    public static void AranCommandLock(final ReadingMaple rh, final MapleClient c) {
        String s = "";
        int skillid = rh.readInt();
        final ArrayList<Pair> list = new ArrayList<Pair>();
        final String infoQuest;
        final String[] array = (String[]) (((infoQuest = c.getPlayer().getInfoQuest(21770)) == "") ? null : infoQuest.split(";"));
        String s2 = "";
        for (int i = 0; i < 9; ++i) {
            list.add(i, new Pair((byte) (-1), (byte) (-1)));
        }
        if (array != null) {
            for (int j = 0; j < array.length; ++j) {
                list.remove(Byte.parseByte(array[j].split("=")[0]) - 1);
                list.add(Byte.parseByte(array[j].split("=")[0]) - 1, new Pair(Byte.parseByte(array[j].split("=")[0]), Byte.parseByte(array[j].split("=")[1])));
            }
        }
        switch (skillid) {
            case 21001009: {
                s = "1";
                break;
            }
            case 21101011: {
                s = "2";
                break;
            }
            case 21101016: {
                s = "3";
                break;
            }
            case 21101017: {
                s = "4";
                break;
            }
            case 21111017: {
                s = "5";
                break;
            }
            case 21111019: {
                s = "6";
                break;
            }
            case 21111021: {
                s = "7";
                break;
            }
            case 21120023: {
                s = "8";
                break;
            }
            case 21120019: {
                s = "9";
                break;
            }
        }
        if (s == "") {
            c.send(MainPacketCreator.resetActions());
            return;
        }
        boolean b = false;
        for (int k = 0; k < list.size(); ++k) {
            if (((Byte) ((Pair) list.get(k)).getLeft()).equals(Byte.parseByte(s))) {
                final int n = ((byte) list.get(k).getRight() == 0) ? 1 : 0;
                c.getPlayer().dropMessage(6, n + "");
                if (n == 1) {
                    c.getPlayer().Message(8, "[ARGON] " + SkillFactory.getSkillName(skillid) + "에 대하여 커멘드키 사용이 금지 됩니다..");
                } else if (n == 0) {
                    c.getPlayer().Message(8, "[ARGON] " + SkillFactory.getSkillName(skillid) + "에 대하여 커멘드키 사용이 가능 합니다..");
                }
                list.remove(k);
                list.add(k, new Pair(Byte.parseByte(s), (byte) n));
                b = true;
                break;
            }
        }
        if (!b) {
            list.remove(Byte.parseByte(s) - 1);
            list.add(Byte.parseByte(s) - 1, new Pair(Byte.parseByte(s), (byte) 1));
        }
        for (int l = 0; l < list.size(); ++l) {
            if ((byte) ((Pair) list.get(l)).getLeft() != -1) {
                if (s2 == "") {
                    s2 = ((Pair) list.get(l)).getLeft() + "=" + ((Pair) list.get(l)).getRight();
                } else {
                    s2 = s2 + ";" + ((Pair) list.get(l)).getLeft() + "=" + ((Pair) list.get(l)).getRight();
                }
            }
        }
        c.getPlayer().updateInfoQuest(21770, s2);
    }

    public static void getCombatAnalyze(ReadingMaple rh, MapleClient c) {
        byte mode = rh.readByte();
        switch (mode) {
            case 1:
                c.getSession().writeAndFlush(MainPacketCreator.getCombatAnalyze((byte) 1));
                break;
            default: {
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            }
        }
    }

    public static void SetFreeJob(final ReadingMaple rh, final MapleCharacter chr) {
        int jobId = rh.readInt();
        byte value = rh.readByte();
        int freejob = chr.getFreeJob();
        int level = chr.getLevel();
        int sp = level - 120 + 1 * 3;
        int ap = level - 10 * 5;
        int meso = 0;
        if (freejob > 0 && !chr.isGM()) {
            chr.send(MainPacketCreator.setFreeJobChangeResult((byte) 6));
            chr.send(MainPacketCreator.resetActions(chr));
            return;
        }
        if (chr.getInventory(MapleInventoryType.USE).getSlotLimit() < 0) {
            chr.send(MainPacketCreator.setFreeJobChangeResult((byte) 7));
            chr.send(MainPacketCreator.resetActions(chr));
            return;
        }

        if (value == 0) { // 메소
            for (int i = 0; i < (chr.getJob() % 10) + 1; i++) {
                chr.zerooskill(((i + 1) == ((chr.getJob() % 10) + 1)) ? chr.getJob() - (chr.getJob() % 100) : chr.getJob() - (i + 1));
            }
            chr.changeJob(jobId);
            for (int i = 0; i < chr.remainingSp.length; i++) {
                chr.remainingSp[i] = 0;
            }
            chr.gainSP(GameConstants.getFreeRequestSkill(jobId), 34);
            chr.gainSP(chr.getJob() - 2, 91);
            chr.gainSP(chr.getJob() - 1, 211);
            chr.gainSP(chr.getJob(), sp);
            chr.resetStats(4, 4, 4, 4);
            chr.setFreeJob(1);
            chr.loseMeso(GameConstants.isFreeRequestMeso(level), true, false, true);
            chr.gainItem(2431849, 1);
            chr.gainAp(ap);
            chr.getClient().getSession().write(MainPacketCreator.setFreeJobChangeResult((byte) 0));
            chr.getClient().getSession().write(MainPacketCreator.resetActions(chr));
        }
        if (value == 1) {
            if (!chr.haveItem(4310086, 1, false, true)) {
                chr.send(MainPacketCreator.setFreeJobChangeResult((byte) 3));
                chr.send(MainPacketCreator.resetActions(chr));
                return;
            }
            for (int i = 0; i < (chr.getJob() % 10) + 1; i++) {
                chr.zerooskill(((i + 1) == ((chr.getJob() % 10) + 1)) ? chr.getJob() - (chr.getJob() % 100) : chr.getJob() - (i + 1));
            }
            chr.changeJob(jobId);
            for (int i = 0; i < chr.remainingSp.length; i++) {
                chr.remainingSp[i] = 0;
            }
            chr.gainSP(GameConstants.getFreeRequestSkill(jobId), 34);
            chr.gainSP(chr.getJob() - 2, 91);
            chr.gainSP(chr.getJob() - 1, 211);
            chr.gainSP(chr.getJob(), sp);
            chr.resetStats(4, 4, 4, 4);
            chr.setFreeJob(1);
            chr.gainAp(ap);
            chr.gainItem(4310086, -1);
            chr.gainItem(2431849, 1);
            chr.getClient().getSession().write(MainPacketCreator.setFreeJobChangeResult((byte) 0));
            chr.getClient().getSession().write(MainPacketCreator.resetActions(chr));
        }
        final int[] array1 = {2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 31, 33, 34, 35, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 50, 51, 56, 57, 59, 60, 61, 62, 63, 64, 65, 83};
        for (int i = 0; i < array1.length; i++) {
            chr.getKeyLayout().Layout().remove(array1[i]);
            chr.getKeyLayout().Layout().clear();
        }
    }

    public static void finalAttackRequest(ReadingMaple rh, MapleClient c) {
        if (!c.getPlayer().isAlive()) {
            c.getSession().write(MainPacketCreator.resetActions());
            return;
        }
        final int skillId = rh.readInt();
        rh.skip(skillId == 2120013 || skillId == 2220014 ? 4 : 0);
        final int delay = rh.readInt();
        final int targetID = rh.readInt();
        final int userRequestTime = rh.readInt();
        final ISkill skills = SkillFactory.getSkill(skillId);
        if (skillId == 101000101) {
            byte direction = rh.readByte();
            Point position = rh.readPos();
            rh.skip(1);
            c.getSession().write(MainPacketCreator.onFinalAttackRequest(c.getPlayer(), skillId, skills.getFinalAttackIdx(), delay, targetID, userRequestTime, skills.getWeaponIdx(), direction, position));
        } else {
            c.getSession().write(MainPacketCreator.onFinalAttackRequest(c.getPlayer(), skillId, skills.getFinalAttackIdx(), delay, targetID, userRequestTime, skills.getWeaponIdx()));
        }
    }

    public static void StartEmeraldFlower(MapleClient c, Rectangle rect, Point pos) {
        for (final Pair<Integer, MapleSummon> summon : c.getPlayer().getSummons().values()) {
            if (summon.getLeft() == 13111024) {
                summon.getRight().removeSummon(c.getPlayer().getMap());
                c.getPlayer().getMap().removeMapObject(summon.getRight());
                c.getPlayer().getMap().broadcastMessage(MainPacketCreator.removeSummon(summon.getRight(), true));
            }
        }
        MapleSummon summon = new MapleSummon(c.getPlayer(), 13111024, pos, SummonMovementType.STATIONARY, System.currentTimeMillis());
        c.getPlayer().getMap().spawnSummon(summon, true, 60000);
        c.getPlayer().getSummons().put(13111024, new Pair<Integer, MapleSummon>(13111024, summon));
        BuffTimer tMan = BuffTimer.getInstance();
        if (diabolicRecoveryTask != null) {
            diabolicRecoveryTask.cancel(true);
            diabolicRecoveryTask = null;
        }
        Runnable r = new Runnable() {
            @Override
            public void run() {
                for (final MapleMapObject mo : c.getPlayer().getMap().getMapObjectsInRect(rect, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                    ((MapleMonster) mo).applyStatus(c.getPlayer(), new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.SPEED, -20), SkillFactory.getSkill(13111024), c.getPlayer().getSkillLevel(13111024), null, false), SkillFactory.getSkill(13111024).getEffect(c.getPlayer().getSkillLevel(13111024)).getStatusDuration());
                }
                c.getPlayer().dropMessage(5, "TEST");
            }
        };
        diabolicRecoveryTask = tMan.register(r, 8000);
        tMan.schedule(new Runnable() {
            @Override
            public void run() {
                if (diabolicRecoveryTask != null) {
                    diabolicRecoveryTask.cancel(true);
                    diabolicRecoveryTask = null;
                }
            }
        }, 60000);
    }

    public static void startStimulation(final MapleCharacter player) {
        BuffTimer tMan = BuffTimer.getInstance();
        if (diabolicRecoveryTask != null) {
            diabolicRecoveryTask.cancel(true);
            diabolicRecoveryTask = null;
        }
        Runnable r = new Runnable() {

            @Override
            public void run() {
                player.addEnergyCharge(800);
                //player.send(AdventurerSkill.giveEnergyCharge(800, 10000, 0, 0, false, false));
            }
        };
        diabolicRecoveryTask = tMan.register(r, 4000);
        tMan.schedule(new Runnable() {

            @Override
            public void run() {
                if (diabolicRecoveryTask != null) {
                    diabolicRecoveryTask.cancel(true);
                    diabolicRecoveryTask = null;
                }
            }
        }, 120000);
    }
}
