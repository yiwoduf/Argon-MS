/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package packet.creators;

import client.MapleCharacter;
import client.items.IItem;
import client.items.MapleInventory;
import client.items.MapleInventoryType;
import client.skills.SkillStatEffect;
import client.skills.StackedSkillEntry;
import client.stats.BuffStats;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import tools.RandomStream.Randomizer;
import tools.Triple;

/**
 *
 * @author KSH
 */
public class SecondaryStat {

    private static boolean check(BigInteger f, BuffStats b) {
        if (f.and(b.getBigValue()).equals(BigInteger.ZERO) == false) {
            return true;
        }

        return false;
    }

    private static boolean check(BigInteger f, BigInteger b) {
        if (f.and(b).equals(BigInteger.ZERO) == false) {
            return true;
        }

        return false;
    }

    private static int get(Map<BuffStats, Integer> m, BuffStats b) {
        Integer ret = m.get(b);

        return ret == null ? 0 : (int) ret;
    }

    private static BigInteger s_uFilter = null;
    private static BigInteger s_uFilter2 = null;
    private static BigInteger s_uFilter3 = null;

    private static boolean IsEnDecode4Byte(BigInteger f) {
        if (s_uFilter == null) {
            s_uFilter = BigInteger.ZERO;
            s_uFilter = s_uFilter.or(BuffStats.CTS_CarnivalDefence.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_SpiritLink.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_DojangLuckyBonus.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_SoulGazeCriDamR.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_PowerTransferGauge.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_ReturnTeleport.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_ShadowPartner.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_SetBaseDamage.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_QuiverCatridge.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_ImmuneBarrier.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_NaviFlying.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_Dance.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_SetBaseDamageByBuff.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_DotHealHPPerSecond.getBigValue());
            s_uFilter = s_uFilter.or(BuffStats.CTS_MagnetArea.getBigValue());
        }

        return check(s_uFilter, f);
    }

    private static boolean IsMovementAffectingStat(BigInteger f) {
        if (s_uFilter2 == null) {
            s_uFilter2 = BigInteger.ZERO;
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Stun.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Weakness.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Slow.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Morph.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Ghost.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_BasicStatUp.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Attract.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Dash_Speed.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Dash_Jump.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Flying.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Frozen.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Frozen2.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Lapidification.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_IndieSpeed.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_IndieJump.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_KeyDownMoving.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_EnergyCharged.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Mechanic.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Magnet.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_MagnetArea.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_VampDeath.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_VampDeathSummon.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_GiveMeHeal.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_DarkTornado.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_NewFlying.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_NaviFlying.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_UserControlMob.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_Dance.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_SelfWeakness.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_BattlePvP_Helena_WindSpirit.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_BattlePvP_LeeMalNyun_ScaleUp.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_TouchMe.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_IndieForceSpeed.getBigValue());
            s_uFilter2 = s_uFilter2.or(BuffStats.CTS_IndieForceJump.getBigValue());
        }
        return check(s_uFilter2, f);
    }

    private static boolean aTS_StatFlag(BigInteger f) {
        if (s_uFilter3 == null) {
            s_uFilter3 = BigInteger.ZERO;
            s_uFilter3 = s_uFilter3.or(BuffStats.CTS_EnergyCharged.getBigValue());
            s_uFilter3 = s_uFilter3.or(BuffStats.CTS_Dash_Speed.getBigValue());
            s_uFilter3 = s_uFilter3.or(BuffStats.CTS_Dash_Jump.getBigValue());
            s_uFilter3 = s_uFilter3.or(BuffStats.CTS_MonsterRiding.getBigValue());
            s_uFilter3 = s_uFilter3.or(BuffStats.CTS_PartyBooster.getBigValue());
            s_uFilter3 = s_uFilter3.or(BuffStats.CTS_GuidedBullet.getBigValue());
            s_uFilter3 = s_uFilter3.or(BuffStats.CTS_Undead.getBigValue());
            s_uFilter3 = s_uFilter3.or(BuffStats.CTS_RideVehicleExpire.getBigValue());
        }
        return check(s_uFilter3, f);
    }

    public static byte[] encodeForRemote(final MapleCharacter chr, List<Triple<BuffStats, Integer, Boolean>> statups) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        packet.writeInt(chr.getId());
        
        BigInteger f = PacketProvider.writeBuffMask(packet, statups);
        BuffStats b = null;

        b = BuffStats.CTS_Speed;

        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_ComboCounter;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_WeaponCharge;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ElementalCharge;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_Stun;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Shock;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_Darkness;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Seal;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Weakness;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_WeaknessMdamage;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Curse;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Slow;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_PvPRaceEffect;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_IceKnight;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_TimeBomb;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Team;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_DisOrder;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Thread;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Poison;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_Poison;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ShadowPartner;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Morph;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Ghost;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_Attract;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Magnet;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_MagnetArea;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_NoBulletConsume;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_BanMap;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Barrier;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DojangShield;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ReverseInput;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_RespectPImmune;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_RespectMImmune;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DefenseAtt;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DefenseState;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DojangBerserk;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_RepeatEffect;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_StopPortion;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_StopMotion;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Fear;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_MagicShield;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Frozen;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Frozen2;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Web;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DrawBack;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_FinalCut;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Cyclone;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_OnCapsule;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_Mechanic;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Inflation;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Explosion;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DarkTornado;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_AmplifyDamage;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_HideAttack;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DevilishPower;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_SpiritLink;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Event;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Event2;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DeathMark;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_PainMark;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Lapidification;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_VampDeath;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_VampDeathSummon;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_VenomSnake;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_PyramidEffect;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_KillingPoint;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_PinkbeanRollingGrade;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_IgnoreTargetDEF;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Invisible;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Judgement;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_KeyDownAreaMoving;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_StackBuff;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_BlessOfDarkness;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Larkness;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ReshuffleSwitch;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_SpecialAction;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_StopForceAtomInfo;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_SoulGazeCriDamR;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_PowerTransferGauge;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_AffinitySlug;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_SoulExalt;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_HiddenPieceOn;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_SmashStack;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_MobZoneState;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_GiveMeHeal;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_TouchMe;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Contagion;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Contagion;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ComboUnlimited;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_IgnorePCounter;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_IgnoreAllCounter;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_IgnorePImmune;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_IgnoreAllImmune;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_FinalJudgement;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_KnightsAura;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_IceAura;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_FireAura;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_HeavensDoor;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DamAbsorbShield;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_AntiMagicShell;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_NotDamaged;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_BleedingToxin;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_WindBreakerFinal;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_IgnoreMobDamR;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Asura;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_UnityOfPower;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Stimulate;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ReturnTeleport;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_CapDebuff;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_OverloadCount;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_FireBomb;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_SurplusSupply;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_NewFlying;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_NaviFlying;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_AmaranthGenerator;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_CygnusElementSkill;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_StrikerHyperElectric;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_EventPointAbsorb;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_EventAssemble;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Albatross;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Translucence;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_PoseType;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_LightOfSpirit;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ElementSoul;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_GlimmeringTime;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Reincarnation;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Beholder;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_QuiverCatridge;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ArmorPiercing;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ZeroAuraStr;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ZeroAuraSpd;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ImmuneBarrier;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ImmuneBarrier;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_FullSoulMP;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
            packet.writeInt(0);
        }

        b = BuffStats.CTS_AntiMagicShell;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }
        b = BuffStats.CTS_Dance;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_SpiritGuard;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ComboTempest;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_HalfstatByDebuff;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_ComplusionSlant;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_JaguarSummoned;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_BMageAura;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_DarkLighting;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_AttackCountX;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_FireBarrier;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_KeyDownMoving;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_MichaelSoulLink;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_KinesisPsychicEnergeShield;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_BladeStance;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Fever;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_AdrenalinBoost;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_RWBarrier;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_RWMagnumBlow;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_Stigma;
        if (check(f, b)) {
            packet.writeShort(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        b = BuffStats.CTS_PoseType;
        if (check(f, b)) {
            packet.write(chr.getBuffedValue(b));
        }

        packet.write(0);//DefenseAtt
        packet.write(0);//DefenseState
        packet.write(0);//PVPDamage
        b = BuffStats.CTS_ZeroAuraStr;
        if (check(f, b)) {
            packet.write(0);
        }
        b = BuffStats.CTS_ZeroAuraSpd;
        if (check(f, b)) {
            packet.write(0);
        }
        b = BuffStats.CTS_BMageAura;
        if (check(f, b)) {
            packet.write(0);
        }
        b = BuffStats.CTS_BattlePvP_Helena_Mark;
        if (check(f, b)) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        b = BuffStats.CTS_BattlePvP_LangE_Protection;
        if (check(f, b)) {
            packet.writeInt(0);
            packet.writeInt(0);
        }
        b = BuffStats.CTS_MichaelSoulLink;
        if (check(f, b)) {
            packet.writeInt(0);
            packet.write(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        b = BuffStats.CTS_AdrenalinBoost;
        if (check(f, b)) {
            packet.write(0);
        }
        b = BuffStats.CTS_Stigma;
        if (check(f, b)) {
            packet.writeInt(0);
        }
        b = BuffStats.CTS_StopForceAtomInfo;
        if (check(f, b)) {
            int skillid = chr.getBuffedSkillEffect(b).getSourceId();
            MapleInventory equip = chr.getInventory(MapleInventoryType.EQUIPPED);
            IItem weapon = equip.getItem((byte) -11);
            if (skillid != 61101002 && skillid != 61110211) {
                packet.writeInt(skillid == 61121217 ? 4 : 2); // 스킬구분
                packet.writeInt(5); // 머리위에 뜨는 무기의 갯수
                packet.writeInt(weapon.getItemId()); // 착용중인 두손검
                packet.writeInt(5); // AttackCount
                for (int j = 0; j < 5; j ++) {
                    packet.writeInt(0);
                }
            } else {
                packet.writeInt(skillid == 61110211 ? 3 : 1); // 스킬구분
                packet.writeInt(3); // 머리위에 뜨는 무기의 갯수
                packet.writeInt(weapon.getItemId()); // 착용중인 두손검
                packet.writeInt(3); // AttackCount
                for (int j = 0; j < 3; j ++) {
                    packet.writeInt(0);
                }
            }
        } else {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.writeInt(0);
        b = BuffStats.CTS_MonsterRiding;
        if (check(f, b)) {
            packet.writeInt(chr.getBuffedValue(b));
            packet.writeInt(chr.getBuffedSkillEffect(b).getSourceId());
        }
        packet.writeLong(0);
        packet.writeLong(0);
        packet.writeLong(0);
        return packet.getPacket();
    }

    public static byte[] encodeForLocal(final WritingPacket p, int buffid, int bufflength, List<Triple<BuffStats, Integer, Boolean>> statups, SkillStatEffect effect, Map<BuffStats, List<StackedSkillEntry>> stacks, int animationTime, MapleCharacter chr) {
        //WritingPacket p = new WritingPacket();

        p.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());

        Map<BuffStats, Integer> m = new HashMap<>();
        BigInteger f = PacketProvider.writeBuffMask(p, statups);

        if (aTS_StatFlag(f)) {
            return encodeForPirate(statups, bufflength / 1000, buffid);
        }

        BuffStats b = null;

        for (Triple<BuffStats, Integer, Boolean> t : statups) {
            m.put(t.first, t.second);
        }

        b = BuffStats.CTS_STR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_INT;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DEX;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_LUK;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PAD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PDD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MAD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MDD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ACC;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EVA;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EVAR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Craft;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Speed;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Jump;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EMHP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EMMP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EPAD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EMAD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EPDD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EMDD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MagicGuard;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DarkSight;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Booster;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PowerGuard;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Guard;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MaxHP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MaxMP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Invincible;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulArrow;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Stun;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Shock;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Poison;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Seal;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Darkness;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ComboCounter;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_WeaponCharge;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ElementalCharge;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HolySymbol;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MesoUp;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ShadowPartner;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PickPocket;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MesoGuard;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Thaw;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Weakness;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_WeaknessMdamage;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Curse;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Slow;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TimeBomb;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BuffLimit;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Team;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DisOrder;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Thread;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Morph;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Ghost;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Regen;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BasicStatUp;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Stance;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SharpEyes;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ManaReflection;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Attract;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Magnet;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MagnetArea;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NoBulletConsume;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_StackBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Trinity;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Infinity;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AdvancedBless;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IllusionStep;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Blind;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Concentration;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BanMap;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MaxLevelBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Barrier;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DojangShield;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ReverseInput;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MesoUpByItem;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ItemUpByItem;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RespectPImmune;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RespectMImmune;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DefenseAtt;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DefenseState;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DojangBerserk;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DojangInvincible;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulMasterFinal;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_WindBreakerFinal;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ElementalReset;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HideAttack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EventRate;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ComboAbilityBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ComboDrain;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ComboBarrier;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PartyBarrier;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BodyPressure;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RepeatEffect;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ExpBuffRate;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_StopPortion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_StopMotion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Fear;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MagicShield;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MagicResistance;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulStone;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Flying;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NewFlying;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NaviFlying;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Frozen;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Frozen2;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Web;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Enrage;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NotDamaged;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FinalCut;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HowlingAttackDamage;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BeastFormDamageUp;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Dance;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Cyclone;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_OnCapsule;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HowlingCritical;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HowlingMaxMP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HowlingDefence;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HowlingEvasion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Conversion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Revive;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PinkbeanMinibeenMove;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Sneak;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Mechanic;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DrawBack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BeastFormMaxHP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Dice;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BlessingArmor;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BlessingArmorIncPAD;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DamR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TeleportMasteryOn;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CombatOrders;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Beholder;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DispelItemOption;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DispelItemOptionByField;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Inflation;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_OnixDivineProtection;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Bless;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Explosion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DarkTornado;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncMaxHP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncMaxMP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PVPDamage;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PVPDamageSkill;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PvPScoreBonus;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PvPInvincible;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PvPRaceEffect;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IceKnight;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HolyMagicShell;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_InfinityForce;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AmplifyDamage;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KeyDownTimeIgnore;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MasterMagicOn;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AsrR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AsrRByItem;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TerR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DamAbsorbShield;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Roulette;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Event;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SpiritLink;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CriticalBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DropRate;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PlusExpRate;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ItemInvincible;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ItemCritical;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ItemEvade;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Event2;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_VampiricTouch;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DDR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncCriticalDamMin;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncCriticalDamMax;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncTerR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncAsrR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DeathMark;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PainMark;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_UsefulAdvancedBless;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Lapidification;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_VampDeath;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_VampDeathSummon;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_VenomSnake;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CarnivalAttack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CarnivalDefence;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CarnivalExp;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SlowAttack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PyramidEffect;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HollowPointBullet;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KeyDownMoving;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KeyDownAreaMoving;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CygnusElementSkill;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IgnoreTargetDEF;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Invisible;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ReviveOnce;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AntiMagicShell;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EnrageCr;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EnrageCrDamMin;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BlessOfDarkness;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_LifeTidal;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Judgement;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DojangLuckyBonus;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HitCriDamR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Larkness;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SmashStack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ReshuffleSwitch;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SpecialAction;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ArcaneAim;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_StopForceAtomInfo;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulGazeCriDamR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulRageCount;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PowerTransferGauge;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AffinitySlug;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulExalt;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HiddenPieceOn;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BossShield;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MobZoneState;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_GiveMeHeal;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TouchMe;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Contagion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ComboUnlimited;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IgnorePCounter;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IgnoreAllCounter;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IgnorePImmune;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IgnoreAllImmune;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FinalJudgement;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KnightsAura;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IceAura;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FireAura;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_VengeanceOfAngel;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HeavensDoor;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Preparation;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BullsEye;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncEffectHPPotion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncEffectMPPotion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulMP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FullSoulMP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulSkillDamageUp;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BleedingToxin;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IgnoreMobDamR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Asura;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FlipTheCoin;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_UnityOfPower;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Stimulate;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ReturnTeleport;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CapDebuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DropRIncrease;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IgnoreMobpdpR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BdR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Exceed;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DiabolikRecovery;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FinalAttackProp;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ExceedOverload;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DevilishPower;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_OverloadCount;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BuckShot;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FireBomb;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HalfstatByDebuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SurplusSupply;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SetBaseDamage;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AmaranthGenerator;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_StrikerHyperElectric;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EventPointAbsorb;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_EventAssemble;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_StormBringer;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ACCR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DEXR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Albatross;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Translucence;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PoseType;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_LightOfSpirit;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ElementSoul;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_GlimmeringTime;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Restoration;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ComboCostInc;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ChargeBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TrueSight;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CrossOverChain;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ChillingStep;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Reincarnation;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DotBasedBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BlessEnsenble;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ExtremeArchery;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_QuiverCatridge;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AdvancedQuiver;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_UserControlMob;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ImmuneBarrier;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ArmorPiercing;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ZeroAuraStr;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ZeroAuraSpd;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CriticalGrowing;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_QuickDraw;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BowMasterConcentration;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TimeFastABuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TimeFastBBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_GatherDropR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AimBox2D;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_CursorSniping;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncMonsterBattleCaptureRate;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DebuffTolerance;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DotHealHPPerSecond;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SpiritGuard;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PreReviveOnce;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SetBaseDamageByBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_LimitMP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ReflectDamR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ComboTempest;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MHPCutR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MMPCutR;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SelfWeakness;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ElementDarkness;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FlareTrick;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Ember;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Dominion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SiphonVitality;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DarknessAscension;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BossWaitingLinesBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DamageReduce;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ShadowServant;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ShadowIllusion;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AddAttackCount;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ComplusionSlant;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_JaguarSummoned;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_JaguarCount;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SSFShootingAttack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DevilCry;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ShieldAttack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BMageAura;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DarkLighting;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AttackCountX;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BMageDeath;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BombTime;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NoDebuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_XenonAegisSystem;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AngelicBursterSoulSeeker;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HiddenPossession;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NightWalkerBat;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NightLordMark;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_WizardIgnite;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BattlePvP_Helena_Mark;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BattlePvP_Helena_WindSpirit;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BattlePvP_LangE_Protection;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BattlePvP_LeeMalNyun_ScaleUp;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BattlePvP_Revive;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PinkbeanAttackBuff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RandAreaAttack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BattlePvP_Mike_Shield;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BattlePvP_Mike_Bugle;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PinkbeanRelax;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_PinkbeanYoYoStack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NextAttackEnhance;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AranBeyonderDamAbsorb;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AranCombotempastOption;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_NautilusFinalAttack;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ViperTimeLeap;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RoyalGuardState;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RoyalGuardPrepare;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MichaelSoulLink;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_MichaelStanceLink;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TriflingWhimOnOff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AddRangeOnOff;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KinesisPsychicPoint;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KinesisPsychicOver;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KinesisPsychicShield;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KinesisIncMastery;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_KinesisPsychicEnergeShield;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BladeStance;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DebuffActiveSkillHPCon;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_DebuffIncHP;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_BowMasterMortalBlow;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AngelicBursterSoulResonance;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Fever;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IgnisRore;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RpSiksin;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_TeleportMasteryRange;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FireBarrier;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_ChangeFoxMan;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_FixCoolTime;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_IncMobRateDummy;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AdrenalinBoost;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AranSmashSwing;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AranDrain;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_AranBoostEndHunt;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_HiddenHyperLinkMaximization;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RWCylinder;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RWCombination;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RWMagnumBlow;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RWBarrier;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RWBarrierHeal;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RWMaximizeCannon;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RWOverHeat;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_RWMovingEvar;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_Stigma;
        if (check(f, b)) {
            if (IsEnDecode4Byte(f)) {
                p.writeInt(get(m, b));
            } else {
                p.writeShort((short) get(m, b));
            }

            p.writeInt(buffid);
            p.writeInt(bufflength);
        }

        b = BuffStats.CTS_SoulMP;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
            p.writeInt(0);
        }

        b = BuffStats.CTS_FullSoulMP;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        p.writeShort(0); // size
        for (int i = 0; i < 0; i++) {
            p.writeInt(0); // -key
            p.write(0); // bEnable
        }

        p.write(0); // nDefenseAtt
        p.write(0); // nDefenseState
        p.write(0); // nPVPDamage

        b = BuffStats.CTS_Dice;
        if (check(f, b)) {
            // TODO FIND OUT
            for (int i = 0; i < 22; i++) {
                p.writeInt(0);
            }
        }

        b = BuffStats.CTS_KillingPoint;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_PinkbeanRollingGrade;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_Judgement;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_StackBuff;
        if (check(f, b)) {
            byte stack = 0;
            // TODO FIND OUT
            switch (buffid) {
                case 36111003:
                    stack = (byte) chr.dualBrid;
                default:
                    stack = (byte) chr.acaneAim;
            }
            p.write(stack);
        }

        b = BuffStats.CTS_Trinity;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_ElementalCharge;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(effect.getX());
            p.writeShort(0);
            p.write(0);
            p.write(0);
        }

        b = BuffStats.CTS_LifeTidal;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_AntiMagicShell;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_Larkness;
        if (check(f, b)) {
            // TODO FIND OUT

            for (int i = 0; i < 2; i++) {
                p.writeInt(chr.luminusskill[i]);
                p.writeInt(Randomizer.nextInt());
            }

            p.writeInt(-1);
            p.writeInt(10000);
        }

        b = BuffStats.CTS_IgnoreTargetDEF;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(chr.lightning);
        }

        b = BuffStats.CTS_StopForceAtomInfo;
        if (check(f, b)) {
            // TODO FIND OUT
            MapleInventory equip = chr.getInventory(MapleInventoryType.EQUIPPED);
            IItem weapon = equip.getItem((byte) -11);
            if (buffid != 61101002 && buffid != 61110211) {
                p.writeInt(buffid == 61121217 ? 4 : 2); // 스킬구분
                p.writeInt(5); // 머리위에 뜨는 무기의 갯수
                p.writeInt(weapon.getItemId()); // 착용중인 두손검
                p.writeInt(5); // AttackCount
                for (int i = 0; i < 5; i++) {
                    p.writeInt(0);
                }
            } else {
                p.writeInt(buffid == 61110211 ? 3 : 1); // 스킬구분
                p.writeInt(3); // 머리위에 뜨는 무기의 갯수
                p.writeInt(weapon.getItemId()); // 착용중인 두손검
                p.writeInt(3); // AttackCount
                for (int i = 0; i < 3; i++) {
                    p.writeInt(0);
                }
            }
        }

        b = BuffStats.CTS_SmashStack;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_MobZoneState;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0); // send , and last is 0
        }

        b = BuffStats.CTS_Slow;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_IceAura;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_KnightsAura;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_IgnoreMobpdpR;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_BdR;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_DropRIncrease;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
            p.write(0);
        }

        b = BuffStats.CTS_PoseType;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_Beholder;
        if (check(f, b)) {
            p.writeInt(1301013);
            p.writeInt(1301013);
        }

        b = BuffStats.CTS_CrossOverChain;
        if (check(f, b)) {
            // TODO FIND OUT=
            p.writeInt(0);
        }

        b = BuffStats.CTS_Reincarnation;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(effect.getZ());
        }

        b = BuffStats.CTS_ExtremeArchery;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
            p.writeInt(0);
        }

        b = BuffStats.CTS_QuiverCatridge;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(chr.quivermode);
        }

        b = BuffStats.CTS_ImmuneBarrier;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_ZeroAuraStr;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_ZeroAuraSpd;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_ArmorPiercing;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_SharpEyes;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_AdvancedBless;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_DotHealHPPerSecond;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_SpiritGuard;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(get(m, b));
        }

        b = BuffStats.CTS_KnockBack;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
            p.writeInt(0);
        }

        b = BuffStats.CTS_ShieldAttack;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_SSFShootingAttack;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_BMageAura;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
            p.write(1);
        }

        b = BuffStats.CTS_BattlePvP_Helena_Mark;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_PinkbeanAttackBuff;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_RoyalGuardState;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
            p.writeInt(0);
        }

        b = BuffStats.CTS_MichaelSoulLink;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
            p.write(0);
            p.writeInt(0);
            p.writeInt(0);
        }

        b = BuffStats.CTS_AdrenalinBoost;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
        }

        b = BuffStats.CTS_RWCylinder;
        if (check(f, b)) {
            // TODO FIND OUT
            p.write(0);
            p.writeShort(0);
        }

        b = BuffStats.CTS_RWMagnumBlow;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeShort(0);
            p.write(0);
        }

        p.writeInt(0); // nViperEnergyCharge

        b = BuffStats.CTS_BladeStance;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(1);
        }

        b = BuffStats.CTS_DarkSight;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        b = BuffStats.CTS_Stigma;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        // i dont know what this really is
        //SecondaryStat::DecodeIndieTempStat
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (statup.getThird()) {
                p.writeInt(stacks.get(statup.getFirst()).size());
                for (StackedSkillEntry sse : stacks.get(statup.getFirst())) {
                    p.writeInt(sse.getSkillId());
                    p.writeInt(sse.getValue());
                    p.writeInt(sse.getTime());
                    p.writeInt(0);
                    p.writeInt(sse.getBuffLength());
                    p.writeInt(0);
                    // KVP <int, int>
                }
            }
        }

        b = BuffStats.CTS_UsingScouter;
        if (check(f, b)) {
            // TODO FIND OUT
            p.writeInt(0);
        }

        p.writeShort(0); // tDelay
        p.write(0); /// nOptionForIcon
        p.write(0); // bJustBuffCheck
        p.write(0); // bFirstSet
        if (IsMovementAffectingStat(f)) {
            p.write(0);
        }
        p.writeInt(0);
        p.writeLong(0);
        p.writeLong(0);
        return p.getPacket();
    }

    public static byte[] encodeForPirate(List<Triple<BuffStats, Integer, Boolean>> statups, int duration, int skillid) {
        boolean infusion = false;
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        BigInteger b = PacketProvider.writeBuffMask(packet, statups);
        if (check(b, BuffStats.CTS_PartyBooster)) {
            infusion = true;
        }
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(0);
        for (Triple<BuffStats, Integer, Boolean> stat : statups) {
            if (!stat.getThird()) {
                packet.writeInt(stat.getSecond());
                packet.writeInt(skillid);
                packet.write(!infusion ? 1 : 0);
                if (skillid == 33001001) {
                    packet.write(1);
                } else {
                    packet.writeInt(!infusion ? 1 : 0);
                }
                if (infusion) {
                    packet.write(0);
                    packet.writeInt(0);
                }
                packet.writeShort(duration);
            }
        }
        packet.writeInt(infusion ? 600 : 0);
        if (skillid == 33001001) {
            packet.write(0);
        }
        if (!infusion) {
            packet.write(1);
        }
        byte v1 = 0;
        if (skillid == 33001001) {
            v1 = 0x06;
        }
        if (!infusion) {
            v1 = 0x08;
        }
        packet.write(v1);
        packet.writeInt(0);

        return packet.getPacket();
    }
}
