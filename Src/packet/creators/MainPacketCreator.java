/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package packet.creators;

import constants.GameConstants;
import constants.subclasses.QuickMoveEntry;
import client.*;
import client.items.IEquip.ScrollResult;
import client.items.*;
import client.skills.ISkill;
import client.skills.InnerSkillValueHolder;
import client.skills.SkillEntry;
import client.skills.SkillFactory;
import client.skills.SkillMacro;
import client.skills.SkillStatEffect;
import client.skills.StackedSkillEntry;
import client.stats.BuffStats;
import client.stats.DiseaseStats;
import client.stats.GlobalBuffStat;
import client.stats.PlayerStat;
import client.test.TestMobSkill;
import community.*;
import constants.ServerConstants;
import handler.channel.PlayerInteractionHandler;
import launch.Start;
import packet.opcode.SendPacketOpcode;
//import packet.transfer.write.byte[];
import packet.transfer.write.WritingPacket;
import server.items.ItemInformation;
import server.life.MapleNPC;
import server.life.MaplePlayerNPC;
import server.life.MobSkill;
import server.life.SummonAttackEntry;
import server.maps.*;
import server.movement.LifeMovementFragment;
import server.shops.MapleShop;
import server.shops.MapleShopItem;
import tools.RandomStream.Randomizer;
import tools.*;

import java.awt.Point;
import java.math.BigInteger;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.*;
import java.util.Map.Entry;

import launch.ChannelServer;
import packet.opcode.RecvPacketOpcode;
import server.items.MapleRing;
import server.life.MapleMonster;
import server.quest.MapleQuest;

public class MainPacketCreator {

    public static byte[] Host;
    public final static List<Pair<PlayerStat, Integer>> EMPTY_STATUPDATE = Collections.emptyList();

    public static byte[] getServerIP(final MapleClient c, final int port, final int buddyport, final int clientId) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SERVER_IP.getValue());
        packet.write(0);
        packet.write(0);

        /* if (c.getTempIP().length() > 0) {
            for (String s : c.getTempIP().split(",")) {
                packet.write(Integer.parseInt(s));
            }
        } else {*/
        packet.write(Host);
        //}
        packet.writeShort(port);

        // 채팅 서버 ///////////////////////////////
        /*if (c.getTempIP().length() > 0) {
            for (String s : c.getTempIP().split(",")) {
                packet.write(Integer.parseInt(s));
            }
        } else {*/
        packet.write(Host);
        //}
        packet.writeShort(buddyport);
        /////////////////////////////////////////////

        packet.writeInt(clientId);
        packet.write(0);
        packet.writeInt(0);
        packet.write(0);
        packet.writeLong(1); // fdtShutdown

        return packet.getPacket();
    }

    public static byte[] getChannelChange(final int port, String IP) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CHANGE_CHANNEL.getValue());
        packet.write(1);
        packet.write(Host);
        packet.writeShort(port);

        return packet.getPacket();
    }

    public static byte[] getPlayerInfo(final MapleCharacter chr) {
        final WritingPacket packet = new WritingPacket();
        final boolean NotifiCheck = ServerConstants.serverNotititle.length() > 0;
        packet.writeShort(SendPacketOpcode.WARP_TO_MAP.getValue());
        packet.writeLong(chr.getClient().getChannel());
        packet.write(0);
        packet.write(1);
        for (int i = 0; i < 3; i++) {
            packet.writeInt(0); //1.2.239, 유동 값.
        }
        packet.write(1);
        packet.writeShort(NotifiCheck ? 1 : 0);
        if (NotifiCheck) {
            packet.writeMapleAsciiString(ServerConstants.serverNotititle);
            packet.writeMapleAsciiString(ServerConstants.serverNotification);
        }
        chr.CRand().connectData(packet);
        PacketProvider.addPlayerInfo(packet, chr);
        PacketProvider.addCoreInfo(packet, chr);
        packet.writeLong(PacketProvider.getTime(System.currentTimeMillis()));
        packet.writeInt(100);
        packet.writeShort(0);
        packet.write(GameConstants.isPhantom(chr.getJob()) ? 0 : 1);
        packet.writeLong(0);
        packet.writeLong(0);
        if (chr.getMap().getFieldType().equals("63")) {
            packet.write(0);
        }

        return packet.getPacket();
    }

    public static byte[] resetActions() {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        packet.write(1);
        packet.writeInt(0);
        packet.write(0xFF); //1.2.220+
        packet.writeInt(0); //1.2.220+ 

        return packet.getPacket();
    }

    public static byte[] resetActions(MapleCharacter chr) {
        return updatePlayerStats(chr, null, true, true);
    }

    public static byte[] updatePlayerStats(MapleCharacter chr, final List<Pair<PlayerStat, Long>> stats) {
        return updatePlayerStats(chr, stats, false, false);
    }

    public static byte[] updatePlayerStats(final MapleCharacter chr, final List<Pair<PlayerStat, Long>> stats, final boolean itemReaction, final boolean isResetAction) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        packet.write(itemReaction ? 1 : 0);
        if (!isResetAction) {
            int updateMask = 0;
            for (final Pair<PlayerStat, Long> statupdate : stats) {
                updateMask |= statupdate.getLeft().getValue();
            }
            List<Pair<PlayerStat, Long>> mystats = stats;
            if (mystats.size() > 1) {
                Collections.sort(mystats, new Comparator<Pair<PlayerStat, Long>>() {
                    @Override
                    public int compare(final Pair<PlayerStat, Long> o1, final Pair<PlayerStat, Long> o2) {
                        long val1 = o1.getLeft().getValue();
                        long val2 = o2.getLeft().getValue();
                        return (val1 < val2 ? -1 : (val1 == val2 ? 0 : 1));
                    }
                });
            }
            Integer value;
            packet.writeInt(updateMask);
            for (final Pair<PlayerStat, Long> statupdate : mystats) {
                value = statupdate.getLeft().getValue();
                if (value >= 1) {
                    if (value == PlayerStat.SKIN.getValue()) {
                        packet.writeShort(statupdate.getRight().shortValue());
                    } else if (value <= PlayerStat.HAIR.getValue()) {
                        packet.writeInt(statupdate.getRight());
                    } else if (value < PlayerStat.JOB.getValue()) {
                        packet.write(statupdate.getRight().byteValue());
                    } else if (value == PlayerStat.JOB.getValue()) {
                        packet.writeShort(statupdate.getRight().shortValue());
                        packet.writeShort(0); //1.2.220+
                    } else if (value == PlayerStat.HP.getValue() && value == PlayerStat.MP.getValue()) {
                        packet.writeShort(statupdate.getRight().shortValue());
                    } else if (value >= PlayerStat.HP.getValue() && value <= PlayerStat.MAXMP.getValue()) {
                        packet.writeInt(statupdate.getRight().intValue());
                    } else if (value == PlayerStat.AVAILABLESP.getValue()) { //availablesp
                        if (!GameConstants.isPinkBean(chr.getJob())) { //핑크빈 제외 모든직업 Extended SP.
                            packet.write(0);
                        } else {
                            packet.writeShort(statupdate.getRight().shortValue());
                        }
                    } else if (value == PlayerStat.EXP.getValue() || value == PlayerStat.MESO.getValue()) {
                        packet.writeLong(statupdate.getRight().longValue());
                    } else if (value < 0xFFFF) {
                        packet.writeShort(statupdate.getRight().shortValue());
                    } else {
                        packet.writeInt(statupdate.getRight().intValue());
                    }
                }
            }
        } else {
            packet.writeInt(0);
        }
        packet.write(chr.getMixBaseHairColor());
        if (chr.getMixBaseHairColor() != -1) {
            packet.write(chr.getMixAddHairColor());
            packet.write(chr.getMixHairBaseProb());
        } else {
            packet.write(0);
            packet.write(0);
        }
        packet.write(0); //aLevelQuest, SetSecondaryStatChangedPoint
        packet.write(0); //aHPRateQuest, setBattleRecoveryInfo

        return packet.getPacket();
    }

    public static byte[] updateHyperSp(int mode, int remainSp) {
        return updateHyperSp("hyper", 0x1C, mode, remainSp);
    }

    public static byte[] updateHyperSp(String value, int array, int mode, int gainCount) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.HYPER.getValue());
        packet.writeMapleAsciiString(value); // 이것도 어떤 값이 있는거같음.
        packet.writeInt(array); // 값이 16진수로 1씩 늘어남.
        packet.writeInt(mode); // 0: 처음, 1: 두번째, 2: 세번째
        packet.write(gainCount);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] getHyperStats(String name, int lvl, int sp, final byte b, int n3) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.RESULT_INSTANCE_TABLE.getValue());
        packet.writeMapleAsciiString(name);
        packet.writeInt(lvl);
        packet.writeInt(sp);
        packet.write(b);
        packet.writeInt(n3);
        System.out.println(packet.toString());
        return packet.getPacket();
    }

    public static byte[] getPacketFromHexString(String hex) {
        return HexTool.getByteArrayFromHexString(hex);
    }

    public static byte[] GameEnd() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GAME_END.getValue());

        return packet.getPacket();
    }

    public static byte[] HeadTitle(List<Integer> num) { // EventNameTag
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.HEAD_TITLE_NEW.getValue());
        for (Integer num_ : num) {
            packet.writeMapleAsciiString("");
            packet.write(num_ == 0 ? -1 : num_); //존재하면 num_ 
        }
        return packet.getPacket();
    }

    public static byte[] FireWork(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FIRE_WORK.getValue());
        packet.writeInt(chr.getId());

        return packet.getPacket();
    }

    public static byte[] updateSp(MapleCharacter chr, final boolean itemReaction) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        packet.write(itemReaction ? 1 : 0);
        packet.writeInt(PlayerStat.AVAILABLESP.getValue());
        if (!GameConstants.isPinkBean(chr.getJob())) { //핑크빈 제외 모든직업 Extended SP.
            packet.write(chr.getRemainingSpSize());
            for (int i = 0; i < chr.getRemainingSps().length; i++) {
                if (chr.getRemainingSp(i) > 0) {
                    packet.write(i + 1);
                    packet.writeInt(chr.getRemainingSp(i));
                }
            }
            packet.write(0xFF); //1.2.220+ 스타포스 관련 패킷 추정.
            packet.writeInt(0); //1.2.220+ 스타포스 관련 패킷 추정.
        } else {
            packet.writeShort(chr.getRemainingSp());
            packet.write(0xFF); //1.2.220+ 스타포스 관련 패킷 추정.
            packet.write0(6); //1.2.220+ 스타포스 관련 패킷 추정.
        }
        return packet.getPacket();
    }

    public static byte[] saintSaver(MapleCharacter chr) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        packet.write(0);
        packet.writeInt(PlayerStat.SAINT_SABER.getValue());
        packet.writeInt(chr.getStat().getSaintSaver());
        packet.write(0xFF); //1.2.220+ 스타포스 관련 패킷 추정.
        packet.writeInt(0); //1.2.220+ 스타포스 관련 패킷 추정.

        return packet.getPacket();
    }

    public static byte[] updateTodayTrait(MapleCharacter chr) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        packet.write(0);
        packet.writeInt(PlayerStat.TRAIT_LIMIT.getValue());
        packet.writeShort(chr.getTodayCharisma());     //오늘의 카리스마
        packet.writeShort(chr.getTodayInsight());     //오늘의 통찰력
        packet.writeShort(chr.getTodayWillPower());     //오늘의 의지
        packet.writeShort(chr.getTodayDiligence());     //오늘의 손재주
        packet.writeShort(chr.getTodayEmpathy());     //오늘의 감성
        packet.writeShort(chr.getTodayCharm());     //오늘의 매력
        packet.writeShort(0);
        packet.writeLong(PacketProvider.getTime(-2));
        packet.write(0xFF); //1.2.220+ 스타포스 관련 패킷 추정.
        packet.writeInt(0); //1.2.220+ 스타포스 관련 패킷 추정.

        return packet.getPacket();
    }

    public static byte[] getWarpToMap(final MapleMap to, final int spawnPoint, final MapleCharacter chr) {
        final WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.WARP_TO_MAP.getValue());
        packet.writeLong(chr.getClient().getChannel());
        packet.write(0);
        packet.write(2); //맵 이동횟수(처음 접속도 포함)
        for (int i = 0; i < 4; i++) {
            packet.writeInt(0);
        }
        packet.writeInt(to.getId());
        packet.write(spawnPoint);
        packet.writeInt(chr.getStat().getHp());
        packet.writeShort(0);
        packet.writeLong(PacketProvider.getTime(System.currentTimeMillis()));
        packet.writeInt(100);
        packet.writeShort(0);
        packet.write(GameConstants.isPhantom(chr.getJob()) ? 0 : 1);
        packet.writeLong(0);
        packet.writeLong(0);
        if (to.getFieldType().equals("63")) {
            packet.write(0);
        }
        return packet.getPacket();
    }

    public static byte[] instantMapWarp(final byte portal) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CURRENT_MAP_WARP.getValue());
        packet.writeShort(0); //1.2.220+
        packet.writeInt(portal);

        return packet.getPacket();
    }

    public static byte[] spawnPortal(final int townId, final int targetId, int skillid, final Point pos) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_PORTAL.getValue());
        packet.writeInt(townId);
        packet.writeInt(targetId);
        if (townId != 999999999 && targetId != 999999999) {
            packet.writeInt(skillid);
            packet.writePos(pos);
        }
        return packet.getPacket();
    }

    public static byte[] spawnDoor(final int cid, final Point pos, final boolean animated) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_DOOR.getValue());
        packet.write(!animated ? 1 : 0);
        packet.writeInt(cid);
        packet.writePos(pos);

        return packet.getPacket();
    }

    public static byte[] removeDoor(final int cid, final boolean animation) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.REMOVE_DOOR.getValue());
        packet.write(!animation ? 1 : 0);
        packet.writeInt(cid);

        return packet.getPacket();
    }

    public static byte[] spawnSummon(MapleSummon summon, int skillLevel, boolean animated) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SPAWN_SUMMON.getValue());
        packet.writeInt(summon.getOwner().getId());
        packet.writeInt(summon.getObjectId());
        packet.writeInt(summon.getSkill());
        packet.write(summon.getOwnerChr().getLevel()); //owner LEVEL
        packet.write(skillLevel);
        packet.writePos(summon.getPosition());
        int nMoveAction = 4;
        packet.write(nMoveAction);
        short Foothold = 0;
        if (summon.getOwner().getMap().getFootholds().findMaple(summon.getPosition()) != null) {
            Foothold = (short) summon.getOwner().getMap().getFootholds().findMaple(summon.getPosition()).getId();
        }
        packet.writeShort(Foothold);
        packet.write(summon.getMovementType().getValue()); //nMoveAbility
        packet.write(summon.getSummonType()); //nAssistType
        packet.write(animated ? 1 : 0); //nEnterType
        packet.writeInt(summon.getMaelstromId()); //dwMobID
        packet.write(0);//bFlyMob
        packet.write(1);//bBeforeFirstAttack
        packet.writeInt(0);//nLookID
        packet.writeInt(0);//nBulletID
        MapleCharacter player = summon.getOwnerChr();
        boolean AvatarLook = (summon.getSkill() == 4341006 || summon.getSkill() == 14111024 || summon.getSkill() == 14121054 || summon.getSkill() == 14121055 || summon.getSkill() == 14121056);
        packet.write(AvatarLook ? 1 : 0); //미러 이미징, 쉐도우 서번트
        if (AvatarLook) {
            PacketProvider.addPlayerLooks(packet, player, true);
        }
        if (summon.getSkill() == 35111002) {
            boolean m_nTeslaCoilState = false;
            packet.write(m_nTeslaCoilState ? 1 : 0);
            if (m_nTeslaCoilState) {
                for (int i = 0; i < 3; i++) {
                    packet.writeShort(0);//x
                    packet.writeShort(0);//y
                }
            }
        }
        boolean m_bJaguarActive = false;
        packet.write(m_bJaguarActive ? 1 : 0);
        int m_tSummonTerm = SkillFactory.getSkill(summon.getSkill()).getEffect(summon.getSkillLevel()).getDuration();
        packet.writeInt(m_tSummonTerm);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] spawnSubSummon(short check, MapleCharacter chr, int value1, int value2, int value3, int value4, int value5, int value6, int value7, int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_SUB_SUMMON.getValue());
        packet.writeShort(check);
        packet.writeInt(chr.getId());
        packet.writeInt(chr.getMapId());
        packet.writeShort(1);
        packet.write(0);
        packet.writeInt(value2);
        packet.writeInt(900);
        packet.writeInt(value3);
        packet.writeShort(value4);
        packet.writeInt(skillid);
        packet.write(value7);
        if (value7 == 1) {
            packet.writeInt(value5 * -1);
        } else {
            packet.writeInt(value5);
        }
        packet.writeInt(value6);
        return packet.getPacket();
    }

    public static byte[] spawnSubSummon(MapleCharacter chr, short v13, int v1, byte v2, short v3, short v4, short v5, short v6, short v7, short v8, short v9, short v10, int v11, short v12, byte Redraw, byte ForceX) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_SUB_SUMMON.getValue());
        packet.writeShort(v13);
        packet.writeInt(chr.getId());
        packet.writeInt(chr.getMapId());
        packet.writeShort(1);
        packet.writeInt(v1);
        packet.write(v2);
        packet.write(Redraw);
        packet.writeShort(v3);
        packet.writeShort(v4);
        if (v2 == 5) {
            packet.writeShort(v5);
            packet.writeShort(v6);
        } else if (v2 == 6) {
            packet.writeInt(0);
        }
        packet.writeShort(v7);
        packet.writeShort(v8);
        packet.writeShort(v9);
        packet.writeShort(v10);
        packet.writeInt(v11);
        packet.writeShort(v12);
        packet.write(ForceX);

        return packet.getPacket();
    }

    public static byte[] moveSubSummon(MapleCharacter chr, short sheck, int v1, int v2, int v3, int v4) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_SUB_SUMMON.getValue());
        packet.writeShort(sheck);
        packet.writeInt(chr.getId());
        packet.writeInt(chr.getMapId());
        packet.writeInt(v1);
        packet.writeInt(v2);
        packet.writeInt(v3);
        packet.writeInt(v4);

        return packet.getPacket();
    }

    public static byte[] removeSummon(MapleSummon summon, boolean animated) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.REMOVE_SUMMON.getValue());
        packet.writeInt(summon.getOwner().getId());
        packet.writeInt(summon.getObjectId());
        if (animated) {
            switch (summon.getSkill()) {
                case 35121003:
                case 14000027:
                case 14111024: //쉐도우 서번트
                case 14121054: //쉐도우 일루전
                    packet.write(10);
                    break;
                case 35111001:
                case 35111010:
                case 35111009:
                case 35111002:
                case 35111005:
                case 35111011:
                case 35121009:
                case 35121010:
                case 35121011:
                case 33101008:
                    packet.write(5);
                    break;
                case 101100100:
                case 101100101:
                case 14121003: //다크니스 오멘
                case 36121002: //홀로그램 그래피티 : 관통
                case 36121013: //홀로그램 그래피티 : 역장
                case 36121014: //홀로그램 그래피티 : 지원
                case 5321052:  //롤링 캐논 레인보우
                    packet.write(0);
                    break;
                default:
                    packet.write(4);
                    break;
            }
        } else if (summon.getSkill() == 14000027 || summon.getSkill() == 14100027 || summon.getSkill() == 14110029 || summon.getSkill() == 14120008) {
            packet.write(16);
        } else {
            packet.write(1);
        }
        return packet.getPacket();
    }

    /**
     * Possible values for <code>type</code>:<br>
     * 1: You cannot move that channel. Please try again later.<br>
     * 2: You cannot go into the cash shop. Please try again later.<br>
     * 3: The Item-Trading shop is currently unavailable, please try again
     * later.<br>
     * 4: You cannot go into the trade shop, due to the limitation of user
     * count.<br>
     * 5: You do not meet the minimum level requirement to access the Trade
     * Shop.<br>
     *
     * @param type The type
     * @return The "block" packet.
     */
    public static byte[] serverMessage(String message) {
        return serverMessage(4, 0, message, true, false, 0);
    }

    public static byte[] serverNotice(int type, String message) {
        return serverMessage(type, 0, message, false, false, 0);
    }

    public static byte[] serverNotice(int type, String message, int itemid) {
        return serverMessage(type, 0, message, false, false, type == 6 && itemid != 0 ? itemid : 0);
    }

    public static byte[] serverNotice(int type, int channel, String message) {
        return serverMessage(type, channel, message, false, false, 0);
    }

    public static byte[] serverNotice(int type, int channel, String message, boolean smegaEar) {
        return serverMessage(type, channel, message, false, smegaEar, 0);
    }

    private static byte[] serverMessage(int type, int channel, String message, boolean servermessage, boolean megaEar, int itemid) {
        WritingPacket packet = new WritingPacket();

        /*	* 0: [Notice]<br>
         * 1: Popup<br>
         * 2: Megaphone<br>
         * 3: Super Megaphone<br>
         * 4: Scrolling message at top<br>
         * 5: Pink Text<br>
         * 6: Lightblue Text
         * 8: Item megaphone
         * 9: Heart megaphone
         * 10: Skull Super megaphone
         * 11: Green megaphone message?
         * 12: Three line of megaphone text
         * 13: End of file =.="
         * 14: Green Gachapon box
         * 15: Red Gachapon box*/
        packet.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        packet.write(type);
        if (servermessage) {
            packet.write(1);
        }
        packet.writeMapleAsciiString(message);

        switch (type) {
            case 3:
            case 9:
            case 10:
                packet.write(channel - 1); // channel
                packet.write(megaEar ? 1 : 0);
                break;
            case 6:
            case 18:
                packet.writeInt(itemid);
                break;
        }
        return packet.getPacket();
    }

    public static byte[] tripleSmega(List<String> message, boolean ear, int channel) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        packet.write(10);

        if (message.get(0) != null) {
            packet.writeMapleAsciiString(message.get(0));
        }
        packet.write(message.size());
        for (int i = 1; i < message.size(); i++) {
            if (message.get(i) != null) {
                packet.writeMapleAsciiString(message.get(i));
            }
        }
        packet.write(channel);
        packet.write(ear ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] getAvatarMega(MapleCharacter chr, int channel, int itemId, List<String> text, boolean ear) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.AVATAR_MEGA.getValue());
        packet.writeInt(itemId);
        packet.writeMapleAsciiString(chr.getName());
        for (String i : text) {
            packet.writeMapleAsciiString(i);
        }
        packet.writeInt(channel);
        packet.write(ear ? 1 : 0);
        PacketProvider.addPlayerLooks(packet, chr, true);

        return packet.getPacket();
    }

    public static byte[] itemMegaphone(String msg, boolean whisper, int channel, IItem item) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        packet.write(8);
        packet.writeMapleAsciiString(msg);
        packet.write(channel);
        packet.write(whisper ? 1 : 0);
        if (item == null) {
            packet.write(0);
        } else {
            PacketProvider.addItemInfo(packet, item, false, false, true, null);
        }
        return packet.getPacket();
    }

    public static byte[] spawnNPC(MapleNPC life, boolean show) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_NPC.getValue());
        packet.writeInt(life.getObjectId());
        packet.writeInt(life.getId());
        packet.writeShort(life.getPosition().x);
        packet.writeShort(life.getCy());
        packet.write(0); // bMove
        packet.write(life.getF() == 1 ? 0 : 1); // nMoveAction
        packet.writeShort(life.getFh());
        packet.writeShort(life.getRx0());
        packet.writeShort(life.getRx1());
        packet.write(show ? 1 : 0); // bEnabled
        packet.writeInt(0); // PresentItem
        packet.write(0); // nPresentTimeState
        packet.writeInt(-1); // tPresent
        packet.writeInt(0); // nNoticeBoardType (1 => send nNoticeBoardValue as int)
        packet.writeInt(0); // alpha
        packet.writeMapleAsciiString("");

        boolean useScreenInfo = life.getId() == 1540000 && ServerConstants.chr != null;
        packet.write(useScreenInfo ? 1 : 0);
        if (useScreenInfo) {

            if (life.getId() == 1540000) {
                packet.write(3);

                packet.writeInt(7); // typeMiniGame
                packet.writeInt(1); // rank
                packet.writeInt(0); // starPoint
                MapleCharacter c = ServerConstants.chr;

                packet.writeMapleAsciiString(c.getName());

                PacketProvider.encodePackedCharacterLook(packet, c);
            } else {
                packet.write(0); // 타입
                // 데이터 (전광판같은거)
            }
        }
        return packet.getPacket();
    }

    public static byte[] removeNPC(final int objectid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.REMOVE_NPC.getValue());
        packet.writeInt(objectid);

        return packet.getPacket();
    }

    public static byte[] removeNPCController(final int objectid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_NPC_REQUEST_CONTROLLER.getValue());
        packet.write(0);
        packet.writeInt(objectid);

        return packet.getPacket();
    }

    public static byte[] spawnNPCRequestController(MapleNPC life, boolean MiniMap) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_NPC_REQUEST_CONTROLLER.getValue());
        packet.write(1);
        packet.writeInt(life.getObjectId());
        packet.writeInt(life.getId());
        packet.writeShort(life.getPosition().x);
        packet.writeShort(life.getCy());
        packet.write(life.getF() == 1 ? 0 : 1);
        packet.writeShort(life.getFh());
        packet.writeShort(life.getRx0());
        packet.writeShort(life.getRx1());
        packet.write(MiniMap ? 1 : 0);
        packet.write0(5);
        packet.writeInt(-1);
        packet.write0(7); //1.2.239+

        return packet.getPacket();
    }

    public static byte[] spawnPlayerNPC(MaplePlayerNPC npc, int id) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PLAYER_NPC.getValue());
        packet.write(npc.getDirection());
        packet.writeInt(id);
        packet.writeMapleAsciiString(npc.getName());
        packet.write(1);//173change
        packet.write(npc.getSkin());
        packet.writeInt(npc.getFace());
        packet.writeInt(0);
        packet.write(0);
        packet.writeInt(npc.getHair());
        Map<Byte, Integer> equip = npc.getEquips();
        Map<Byte, Integer> myEquip = new LinkedHashMap<Byte, Integer>();
        Map<Byte, Integer> maskedEquip = new LinkedHashMap<Byte, Integer>();
        for (byte position : equip.keySet()) {
            byte pos = (byte) (position * -1);
            if (pos < 100 && myEquip.get(pos) == null) {
                myEquip.put(pos, equip.get(position));
            } else if ((pos > 100 || pos == -128) && pos != 111) { // don't ask. o.o
                pos -= 100;
                if (myEquip.get(pos) != null) {
                    maskedEquip.put(pos, myEquip.get(pos));
                }
                myEquip.put(pos, equip.get(position));
            } else if (myEquip.get(pos) != null) {
                maskedEquip.put(pos, equip.get(position));
            }
        }
        for (Entry<Byte, Integer> entry : myEquip.entrySet()) {
            packet.write(entry.getKey());
            packet.writeInt(entry.getValue());
        }
        packet.write(0xFF);
        for (Entry<Byte, Integer> entry : maskedEquip.entrySet()) {
            packet.write(entry.getKey());
            packet.writeInt(entry.getValue());
        }
        packet.write(0xFF);
        Integer cWeapon = equip.get((byte) -111);
        Integer weapon = equip.get((byte) -11);
        packet.writeInt(cWeapon != null ? cWeapon : 0);
        packet.writeInt(weapon != null ? weapon : 0);
        packet.write0(17);

        return packet.getPacket();
    }

    public static byte[] getChatText(int cidfrom, String text, boolean whiteBG, int show) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CHATTEXT.getValue());
        packet.writeInt(cidfrom);
        packet.write(whiteBG ? 1 : 0);
        packet.writeMapleAsciiString(text);
        packet.write(show);
        packet.writeShort(0);
        packet.write(0xFF); //1.2.201+

        return packet.getPacket();
    }

    public static byte[] AranCombo(int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ARAN_COMBO.getValue());
        packet.writeInt(value);

        return packet.getPacket();
    }

    public static byte[] RechargeCombo(int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.RECHARGE_COMBO.getValue());
        packet.writeInt(value);

        return packet.getPacket();
    }

    public static byte[] moveFollow(Point otherStart, Point myStart, Point otherEnd, List<LifeMovementFragment> moves) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FOLLOW_MOVE.getValue());
        packet.writeInt(0); //v192
        packet.writePos(otherStart);
        packet.writePos(myStart);
        PacketProvider.serializeMovementList(packet, moves);
        packet.write(4);
        for (int i = 0; i < 5; i++) {
            packet.write(0);
        }
        packet.write(0);
        packet.writePos(otherEnd);
        packet.writePos(otherStart);

        return packet.getPacket();
    }

    public static byte[] GainEXP_Trait(final int gain, final int type, boolean limited) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(limited ? 0x14 : 0x13); //1.2.250+ (+2)
        /* 0 : 카리스마
         * 1 : 통찰력
         * 2 : 의지
         * 3 : 손재주
         * 4 : 감성
         * 5 : 매력
         */
        switch (type) {
            case 0:
                packet.writeInt(PlayerStat.CHARISMA.getValue());
                break;
            case 1:
                packet.writeInt(PlayerStat.INSIGHT.getValue());
                break;
            case 2:
                packet.writeInt(PlayerStat.WILLPOWER.getValue());
                break;
            case 3:
                packet.writeInt(PlayerStat.CRAFT.getValue());
                break;
            case 4:
                packet.writeInt(PlayerStat.SENSE.getValue());
                break;
            case 5:
                packet.writeInt(PlayerStat.CHARM.getValue());
                break;
        }
        packet.writeInt(gain);
        return packet.getPacket();
    }

    public static byte[] GainEXP_Others(final long gain, final boolean inChat, final boolean white) {
        return GainEXP_Monster(gain, inChat, white, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }

    public static byte[] GainEXP_Monster(final long gain, final boolean inChat, final boolean white,
            final int SelectedMobBonusExp,
            final int PartyBonusPercentage,
            final int WeddingBonusExp,
            final int PartyBonusExp,
            final int ItemBonusExp,
            final int PremiumIPBonusExp,
            final int RainbowWeekEventBonusExp,
            final int BoomUpEventBonusExp,
            final int PlusExpBuffBonusExp,
            final int PsdBonusExpRate,
            final int IndieBonusExp,
            final int RelaxBonusExp,
            final int InstallItemBonusExp,
            final int AswanWinnerBonusExp,
            final int ExpByIncExpR,
            final int ValuePackBonusExp,
            final int ExpByIncPQExpR,
            final int BaseAddExp,
            final int BloodAllianceBonusExp,
            final int FreezeHotEventBonusExp,
            final int UserHPRateBonusExp) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(0x04); // 0x04 = exp, 0x05 = fame, 0x06 = mesos, 0x07 = guildpoints
        packet.write(white ? 1 : 0);
        packet.writeInt(gain);
        packet.write(inChat ? 1 : 0); // Not in chat
        long flag = 0;
        if (SelectedMobBonusExp > 0) {
            flag |= 1;
        }
        if (PartyBonusPercentage > 0) {
            flag |= 4;
        }
        if (WeddingBonusExp > 0) {
            flag |= 0x20;
        }
        if (PartyBonusExp > 0) {
            flag |= 0x10;
        }
        if (ItemBonusExp > 0) {
            flag |= 0x40;
        }
        if (PremiumIPBonusExp > 0) {
            flag |= 0x80;
        }
        if (RainbowWeekEventBonusExp > 0) {
            flag |= 0x100;
        }
        if (BoomUpEventBonusExp > 0) {
            flag |= 0x200;
        }
        if (PlusExpBuffBonusExp > 0) {
            flag |= 0x400;
        }
        if (PsdBonusExpRate > 0) {
            flag |= 0x800;
        }
        if (IndieBonusExp > 0) {
            flag |= 0x1000;
        }
        if (RelaxBonusExp > 0) {
            flag |= 0x2000;
        }
        if (InstallItemBonusExp > 0) {
            flag |= 0x4000;
        }
        if (AswanWinnerBonusExp > 0) {
            flag |= 0x8000;
        }
        if (ExpByIncExpR > 0) {
            flag |= 0x10000;
        }
        if (ValuePackBonusExp > 0) {
            flag |= 0x20000;
        }
        if (ExpByIncPQExpR > 0) {
            flag |= 0x40000;
        }
        if (BaseAddExp > 0) {
            flag |= 0x80000;
        }
        if (BloodAllianceBonusExp > 0) {
            flag |= 0x100000;
        }
        if (FreezeHotEventBonusExp > 0) {
            flag |= 0x200000;
        }
        if (UserHPRateBonusExp > 0) {
            flag |= 0x800000;
        }
        packet.writeLong(flag);
        if ((flag & 1) != 0) {
            packet.writeInt(SelectedMobBonusExp);
        }
        if ((flag & 4) != 0) {
            packet.write(PartyBonusPercentage); // unused
        }
        if (inChat) {
            byte wat = 1;
            packet.write(wat);
            if (wat > 0) {
                packet.write(1);
            }
        }
        if ((flag & 0x20) != 0) {
            packet.writeInt(WeddingBonusExp);
        }
        if ((flag & 0x10) != 0) {
            packet.writeInt(PartyBonusExp);
        }
        if ((flag & 0x40) != 0) {
            packet.writeInt(ItemBonusExp);
        }
        if ((flag & 0x80) != 0) {
            packet.writeInt(PremiumIPBonusExp);
        }
        if ((flag & 0x100) != 0) {
            packet.writeInt(RainbowWeekEventBonusExp);
        }
        if ((flag & 0x200) != 0) {
            packet.writeInt(BoomUpEventBonusExp);
        }
        if ((flag & 0x400) != 0) {
            packet.writeInt(PlusExpBuffBonusExp);
        }
        if ((flag & 0x800) != 0) {
            packet.writeInt(PsdBonusExpRate);
        }
        if ((flag & 0x1000) != 0) {
            packet.writeInt(IndieBonusExp);
        }
        if ((flag & 0x2000) != 0) {
            packet.writeInt(RelaxBonusExp);
        }
        if ((flag & 0x4000) != 0) {
            packet.writeInt(InstallItemBonusExp);
        }
        if ((flag & 0x8000) != 0) {
            packet.writeInt(AswanWinnerBonusExp);
        }
        if ((flag & 0x10000) != 0) {
            packet.writeInt(ExpByIncExpR);
        }
        if ((flag & 0x20000) != 0) {
            packet.writeInt(ValuePackBonusExp);
        }
        if ((flag & 0x40000) != 0) {
            packet.writeInt(ExpByIncPQExpR);
        }
        if ((flag & 0x80000) != 0) {
            packet.writeInt(BaseAddExp);
        }
        if ((flag & 0x100000) != 0) {
            packet.writeInt(BloodAllianceBonusExp);
        }
        if ((flag & 0x200000) != 0) {
            packet.writeInt(FreezeHotEventBonusExp);
        }
        if ((flag & 0x800000) != 0) {
            packet.writeInt(UserHPRateBonusExp);
        }
        return packet.getPacket();
    }

    public static byte[] fairyPendantMessage(final int incExpR) { // bonusExp, <= 0x3D
        final WritingPacket mplew = new WritingPacket(14);

        mplew.writeShort(SendPacketOpcode.EXP_BONUS.getValue());
        mplew.writeInt(0x11); // 0x11 = pendant, 0x31 = evan medal
        mplew.writeInt(0/*termStart*/); // hour = 0 upon equipping
        mplew.writeInt(incExpR);

        return mplew.getPacket();
    }

    public static byte[] getShowFameGain(final int gain) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(6); //1.2.250+ (+1)
        packet.writeInt(gain);

        return packet.getPacket();
    }

    public static byte[] showMesoGain(final long gain, final boolean inChat) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        if (!inChat) {
            packet.write(0);
            packet.write(1);
            packet.write(0);
            packet.writeLong(gain); //1.2.203+
        } else {
            packet.write(7); //1.2.250+ (+1)
            packet.writeInt(gain);
            packet.writeInt(-1);
        }
        return packet.getPacket();
    }

    public static byte[] getShowItemGain(int itemId, short quantity) {
        return getShowItemGain(itemId, quantity, false);
    }

    public static byte[] getShowItemGain(int itemId, short quantity, boolean inChat) {
        WritingPacket packet = new WritingPacket();
        if (inChat) {
            packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
            packet.write(6); //1.2.220+
            packet.write(1); //item count
            packet.writeInt(itemId);
            packet.writeInt(quantity);
        } else {
            packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
            packet.write(0);
            packet.write(0);
            packet.writeInt(itemId);
            packet.writeInt(quantity);
        }
        return packet.getPacket();
    }

    public static byte[] getShowItemGainSimple(int itemId, boolean full) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(0);
        packet.write(full ? 3 : 2);
        packet.writeInt(itemId);

        return packet.getPacket();
    }

    public static byte[] showRewardItemAnimation(int itemId, String effect) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        packet.write(0x11);
        packet.writeInt(itemId);
        packet.write(effect != null && effect.length() > 0 ? 1 : 0);
        if (effect != null && effect.length() > 0) {
            packet.writeMapleAsciiString(effect);
        }

        return packet.getPacket();
    }

    public static byte[] showRewardItemAnimation(int itemId, String effect, int from_playerid) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        packet.writeInt(from_playerid);
        packet.write(0x11);
        packet.writeInt(itemId);
        packet.write(effect != null && effect.length() > 0 ? 1 : 0);
        if (effect != null && effect.length() > 0) {
            packet.writeMapleAsciiString(effect);
        }
        return packet.getPacket();
    }

    public static byte[] dropItemFromMapObject(MapleWorldMapItem drop, Point dropfrom, Point dropto, byte mod) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.DROP_ITEM_FROM_MAPOBJECT.getValue());
        packet.write(0);
        packet.write(mod);
        packet.writeInt(drop.getObjectId());
        packet.write(drop.getMeso() > 0 ? 1 : 0);
        packet.writeInt(drop.isFly() ? 1 : 0);
        packet.writeInt(drop.getGradiant());
        packet.writeInt(drop.getSpeed());
        packet.writeInt(drop.getItemId());
        packet.writeInt(drop.getOwner());
        packet.write(drop.getMeso() > 0 ? 2 : 0);
        packet.writePos(dropto);
        packet.writeInt(0);
        if (mod != 2) {
            packet.writePos(drop.isFly() ? new Point(dropfrom.x, dropfrom.y - 71) : dropfrom);
            packet.writeShort(0);
            packet.write0(3);
        }
        if (drop.getMeso() == 0) {
            packet.write(0);
            packet.writeLong(PacketProvider.getTime(drop.getItem().getExpiration()));
        }
        packet.writeShort(drop.isPlayerDrop() ? 0 : 1);
        if (mod == 2) {
            if (drop.getMeso() > 0) {
                packet.write0(3);
            } else {
                packet.write(0);
            }
        }
        packet.write(0);
        packet.writeInt(drop.isTouch() ? 1 : 0);
        if ((drop.getItemId() / 1000000 == 1) && (drop.getMeso() == 0) && (drop.getEquip() != null)) {
            Equip item = (Equip) drop.getItem();
            switch (item.getState()) {
                case 17: //레어
                    packet.write(1);
                    break;
                case 18: //에픽
                    packet.write(2);
                    break;
                case 19: //유니크
                    packet.write(3);
                    break;
                case 20: //레전드리
                    packet.write(4);
                    break;
                default:
                    packet.write(0);
                    break;
            }
        } else {
            packet.write(0);
        }
        packet.writeInt(0); //1.2.250+

        return packet.getPacket();
    }

    public static byte[] spawnPlayerMapobject(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_PLAYER.getValue());
        packet.writeInt(chr.getId());
        packet.write(chr.getLevel()); //Level
        packet.writeMapleAsciiString(chr.getName()); //CharacterName
        packet.writeMapleAsciiString(""); //ParentName
        MapleGuildContents gs = chr.getClient().getChannelServer().getGuildSummary(chr.getGuildId());
        packet.writeMapleAsciiString(gs == null ? "" : gs.getName());//GuildName
        packet.writeShort(gs == null ? 0 : gs.getLogoBG());
        packet.write(gs == null ? 0 : gs.getLogoBGColor());
        packet.writeShort(gs == null ? 0 : gs.getLogo());
        packet.write(gs == null ? 0 : gs.getLogoColor());
        packet.write(chr.getGender()); //Gender
        packet.write(chr.getGender()); //AccountGender
        packet.writeInt(chr.getFame()); //Popularity
        packet.writeInt(0); //FarmLevel
        packet.writeInt(0); //NameTagMark
        final List<Pair<Integer, Integer>> buffvalue = new ArrayList<Pair<Integer, Integer>>();

        int[] mask = new int[15];
        for (int i = 0; i < mask.length; i++) {
            packet.writeInt(mask[i]);
        }
        for (Pair<Integer, Integer> i : buffvalue) {
            if (i.right == 3) {
                packet.writeInt(i.left.intValue());
            } else if (i.right == 2) {
                packet.writeShort(i.left.shortValue());
            } else if (i.right == 1) {
                packet.write(i.left.byteValue());
            }
        }
        /* 버프마스크 종료 */
        packet.write(0);
        packet.write(0);
        packet.write(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);

        packet.writeInt(0);
        for (int i = 0; i < 0; i++) {
            packet.writeInt(0);
        }
        packet.writeInt(0);

        packet.writeShort(chr.getJob());
        packet.writeShort(chr.getSubcategory());
        packet.writeInt(0);

        PacketProvider.addPlayerLooks(packet, chr, false);
        if (GameConstants.isZero(chr.getJob())) {
            PacketProvider.addPlayerLooksZero(packet, chr, false);
        }
        packet.writeInt(0); //DriverID
        packet.writeInt(0); //PassenserID
        packet.writeInt(0); //ChocoCount
        packet.writeInt(chr.getItemEffect()); //ActiveEffectItemID
        packet.writeInt(0); //MonkeyEffectItemID
        packet.writeInt(chr.getHeadTitle()); //ActiveNickItemID
        packet.writeInt(chr.getDamageSkin()); //DamageSkin
        packet.writeInt(0); //DamageSkin_Premium
        packet.writeInt(0); //DemonWingID
        packet.writeInt(0); //KaiserWingID
        packet.writeInt(0); //KaiserTailID
        packet.writeInt(0); //CompletedSetItemID
        packet.writeShort(-1); //FieldSeatID
        packet.writeInt(chr.getChair()); //PortableChairID
        packet.writeInt(chr.getChairText() != null ? 1 : 0); //ChairTextCheck
        if (chr.getChairText() != null) {
            packet.writeMapleAsciiString(chr.getChairText()); //PortableChairMsg
        }
        packet.writeInt(0); //TowerChairIDList
        packet.writePos(chr.getPosition());// x y
        packet.write(chr.getStance()); //MoveAction
        packet.writeShort(chr.getFH()); //FootHold

        packet.write(0); //petSize
        packet.write(0); //riding?

        packet.writeInt(chr.getMount().getLevel()); //TamingMobLevel
        packet.writeInt(chr.getMount().getExp()); //TamingMobExp
        packet.writeInt(chr.getMount().getFatigue()); //TamingMobFatigue

        PlayerShopPacket.addAnnounceBox(packet, chr); //MiniRoom

        packet.write(chr.getChalkboard() != null ? 1 : 0); //ADBoardRemote
        if (chr.getChalkboard() != null) {
            packet.writeMapleAsciiString(chr.getChalkboard());
        }

        Triple rings = chr.getRings(false);
        addRingInfo(packet, (List) rings.getFirst());
        addRingInfo(packet, (List) rings.getSecond());
        addMRingInfo(packet, (List) rings.getThird(), chr);
        byte flag = 0;
        if (chr.getSkillLevel(1320016) > 0 && chr.getJob() == 132 && !chr.skillisCooling(1320019)) {
            flag |= 1;
        }
        // 에반이면서 용 있을때
        //flag |= 2;
        //flag |= 8; // PVP 분노효과 시간 int로 보내줘야됨
        //flag |= 0x10; 8과 else로 처리됨. PVP 챔피언 효과. int로 보내줘야됨
        //flag | 0x20 HitPeriodRemain_Revive int로 보내줌.
        packet.write(flag); //Flag

        packet.writeInt(0); //EvanDragonGlide_Riding

        if (GameConstants.isKaiser(chr.getJob())) {
            packet.writeInt(0);
            packet.writeInt(0);
            packet.write(0);
        }
        packet.writeInt(0); //SetMakingMeisterSkillEff
        PacketProvider.addMonsterLife(packet, chr);
        List<Integer> num_ = chr.HeadTitle();
        for (Integer num_1 : num_) {
            packet.write(num_1 == 0 ? -1 : num_1);
        }

        packet.writeInt(0); // if 1 > CustomizeEffect
        packet.write(chr.soulEffect); // soulEffect

        // 라이딩일시
        // 아이템 코드가 1932249 일시
        // int로 갯수 보내줌. 갯수만큼 int로 커스텀 라이딩 보내줌.
        packet.write(0);
        if (false) {
            packet.write(0);
            if (false) {
                packet.writeInt(0); // SLV
                packet.writeInt(0);
                packet.writeShort(0); // x
                packet.writeShort(0); // y
            }
        }

        packet.write(0);
        if (false) {
            // 스타플래닛 정보
            packet.writeInt(0); // round id
            packet.write(0); // 랭킹?
            /*
            위에 보낸값이 10보다 크다면 10만큼만
            아니면 그 갯수대로
             */
            for (int i = 0; i < 0; i++) {
                packet.writeInt(0); // point
                packet.writeInt(0); // ranking
                packet.writeInt(0); // last rank check time
            }
            packet.writeLong(0); // shiningstarexpiretime
            packet.writeInt(0); // shiningstarpickedcount
            packet.writeInt(0); // roundstarpoint
        }

        packet.writeInt(0);
        for (int i = 0; i < 0; i++) {
            packet.writeInt(0); // StarPlanetTrendShopLook
        }

        packet.writeInt(0);
        for (int i = 0; i < 0; i++) {
            packet.writeInt(0);
            packet.writeMapleAsciiString(""); // text equip
        }

        //FreezeHotEventInfo
        packet.write(0);
        packet.writeInt(0);

        packet.writeInt(0); // EventBestFriendInfo > eventbestfriendAID

        packet.write(0); // kinesisPsychicEnergyShieldEffect
        packet.write(0); // beastFormWingOnOff
        packet.writeInt(0); // mesochairCount

        if (chr.getMapId() == 109090300) {
            packet.write(chr.isCatching ? 1 : 0);
        }
        return packet.getPacket();
    }

    public static byte[] finishedSort(int type) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FINISH_SORT.getValue());
        packet.write(1);
        packet.write(type);

        return packet.getPacket();
    }

    public static byte[] finishedGather(int type) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FINISH_GATHER.getValue());
        packet.write(1);
        packet.write(type);

        return packet.getPacket();
    }

    public static byte[] removePlayerFromMap(int cid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.REMOVE_PLAYER_FROM_MAP.getValue());
        packet.writeInt(cid);

        return packet.getPacket();
    }

    public static byte[] getMilliClock(int time) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CLOCK.getValue());
        packet.write(6);
        packet.writeInt(time);
        return packet.getPacket();
    }

    public static byte[] facialExpression(MapleCharacter from, int expression) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.FACIAL_EXPRESSION.getValue());
        packet.writeInt(from.getId());
        packet.writeInt(expression);
        packet.writeInt(-1);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] movePlayer(int cid, List<LifeMovementFragment> moves, Point startPos) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MOVE_PLAYER.getValue());
        packet.writeInt(cid);
        packet.writeInt(0); //v192
        packet.writePos(startPos);
        packet.writeInt(0);
        PacketProvider.serializeMovementList(packet, moves);

        return packet.getPacket();
    }

    public static byte[] moveSummon(int cid, int oid, Point startPos, List<LifeMovementFragment> moves) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MOVE_SUMMON.getValue());
        packet.writeInt(cid);
        packet.writeInt(oid);
        packet.writeInt(0);
        packet.writePos(startPos);
        packet.writeInt(0);
        PacketProvider.serializeMovementList(packet, moves);

        return packet.getPacket();
    }

    public static byte[] summonAttack(final int cid, final int summonSkillId, final byte animation, final byte tbyte, final List<SummonAttackEntry> allDamage, final int level, boolean isDarkFlare, final int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SUMMON_ATTACK.getValue());
        packet.writeInt(cid);
        packet.writeInt(summonSkillId);
        packet.write(level);
        packet.write(animation);
        packet.write(tbyte);
        for (final SummonAttackEntry attackEntry : allDamage) {
            packet.writeInt(attackEntry.getMonster().getObjectId()); // oid
            packet.write(7); // who knows
            for (Integer damage : attackEntry.getDamage()) {
                packet.writeInt(damage); // damage
            }
        }
        packet.write(!isDarkFlare ? 0 : 1); //bCounterAttack
        packet.write(0); //bNoAction
        packet.writeInt(!isDarkFlare ? value : 0); //pMob + (25121133) Check;

        return packet.getPacket();
    }

    public static byte[] summonAttack(final MapleSummon summon, final byte tByte, final byte animation, final List<SummonAttackEntry> allDamage) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SUMMON_ATTACK.getValue());
        packet.writeInt(summon.getOwner().getId()); //dwCharacterID
        packet.writeInt(summon.getSkill());
        packet.write(summon.getOwner().getLevel()); //m_nCharLevel
        packet.write(animation); //bLeft
        packet.write(tByte); //tByte
        for (final SummonAttackEntry attackEntry : allDamage) {
            packet.writeInt(attackEntry.getMonster().getObjectId()); // oid
            packet.write(7); // who knows
            for (Integer damage : attackEntry.getDamage()) {
                packet.writeInt(damage); // damage
            }
        }
        boolean CounterAttack = false;
        packet.write(CounterAttack ? 1 : 0); //bCounterAttack
        boolean NoAction = false;
        packet.write(NoAction ? 1 : 0);
        boolean pMob = false;
        packet.writeShort(pMob ? 1 : 0);
        packet.writeShort(0);
        return packet.getPacket();
    }

    public static byte[] attack(RecvPacketOpcode op, MapleCharacter player, int cid, byte tbyte, int skill, int level, int display, byte animation, byte speed, List<AttackPair> damage, final Point pos, final byte mastery, final int charge, final int lvl, final int itemid) {
        WritingPacket packet = new WritingPacket();
        if (op == RecvPacketOpcode.CLOSE_RANGE_ATTACK) {
            packet.writeShort(SendPacketOpcode.CLOSE_RANGE_ATTACK.getValue());
        }
        if (op == RecvPacketOpcode.RANGED_ATTACK) {
            packet.writeShort(SendPacketOpcode.RANGED_ATTACK.getValue());
        }
        if (op == RecvPacketOpcode.MAGIC_ATTACK) {
            packet.writeShort(SendPacketOpcode.MAGIC_ATTACK.getValue());
        }

        packet.writeInt(cid);
        packet.write(0);
        packet.write(tbyte);
        packet.write(lvl);
        packet.write(level);
        if (level > 0) {
            packet.writeInt(skill);
        }
        boolean tag = false;
        if (GameConstants.is_zero_skill(skill)) {
            packet.write(lvl);
        }

        if (op == RecvPacketOpcode.RANGED_ATTACK
                && (GameConstants.GetAdvancedBulletCountHyperSkill(skill) != 0
                || GameConstants.GetAdvancedAttackCountHyperSkill(skill) != 0)) {
            int passiveId = 0;
            int passiveLv = 0;

            if ((passiveId = GameConstants.GetAdvancedBulletCountHyperSkill(skill)) == 0) {
                if ((passiveId = GameConstants.GetAdvancedAttackCountHyperSkill(skill)) == 0) {
                    passiveLv = 0;
                } else {
                    passiveId = GameConstants.GetAdvancedAttackCountHyperSkill(skill);
                    passiveLv = player.getSkillLevel(skill);
                }
            } else {
                passiveId = GameConstants.GetAdvancedBulletCountHyperSkill(skill);
                passiveLv = player.getSkillLevel(skill);
            }

            packet.write(passiveLv);
            if (passiveLv != 0) {
                packet.writeInt(passiveId);
            }
        }

        if (skill == 80001850) {
            int passiveLv = player.getSkillLevel(80001851);

            packet.write(passiveLv);
            if (passiveLv != 0) {
                packet.writeInt(80001851);
            }
        }
        byte flag = 0;
        packet.write(flag); // FLAG 0x20: Remote Rush Info, 0x4 : bRepeatAttack, 0x8 : bShadowPartner
        flag = 0;
        packet.write(flag);
        packet.writeInt(0); //nOption3
        packet.writeInt(0); //nBySummonedID
        if ((flag & 2) == 2) { // buckshot
            packet.writeInt(0);//buckShotInfo.nSkillID
            packet.writeInt(0);//buckShotInfo.nSLV
        }
        if ((flag & 8) == 8) {
            packet.write(0); // nPassiveAddAttackCount
        }
// bManaburn = (v22 >> 2) & 1; to set this, packet..write(1 << 2)

        packet.write(display);
        packet.write(animation);

        packet.write(0xFF); // nAttackAction
        packet.writeShort(0); // x
        packet.writeShort(0); // y
        packet.write(0); // bShowFixedDamage
        packet.write(0); // true > no dragon stuff

        packet.write(speed);
        packet.write(mastery);
        packet.writeInt(itemid > 0 ? itemid : charge > 0 ? charge : 0);
        for (AttackPair oned : damage) {
            if (oned.attack != null) {
                packet.writeInt(oned.objectid);
                if (oned.objectid == 0) {
                    continue;
                }
                packet.write(0x07); // nHitAction
                packet.write(0); // bLifting
                packet.write(0); // bAlone
                packet.writeShort(0); // tDelay

                if (skill == 80001835) {
                    packet.write(0); // attackCount

                    for (int i = 0; i < 0; i++) {
                        packet.writeInt(0); // damage
                    }
                }
                for (Pair<Integer, Boolean> eachd : oned.attack) {
                    if (eachd.right) {
                        packet.writeInt(eachd.left.intValue() | -2147483648); //이쪽 내일 수정 바람.
                    } else {
                        packet.writeInt(eachd.left.intValue());
                    }
                }

                if (GameConstants.is_kinesis_psychiclock_skill(skill)) {
                    packet.writeInt(0);
                }

                if (skill == 37111005) {
                    packet.write(0); // lift?
                }
            }
        }
        if (skill == 2321001 || skill == 2221052 || skill == 11121052 || skill == 12121054) {
            packet.writeInt(charge); // tKeyDown
        } else if (GameConstants.is_super_nova_skill(skill) || GameConstants.is_screen_center_attack_skill(skill)
                || skill == 101000202 || skill == 101000102 || skill == 80001762) {
            packet.writeInt(0); // ptAttackRefPoint.x
            packet.writeInt(0); // ptAttackRefPoint.y
        }

        if (GameConstants.is_keydown_skill_rect_move_xy(skill)) {
            packet.writeShort(0); // m_ptKeyDownRectMoveXY.x
            packet.writeShort(0); // m_ptKeyDownRectMoveXY.y
        }

        if (skill == 51121009) {
            packet.write(0); // bUpgrade
        }

        if (skill == 21120019 || skill == 37121052) {
            packet.writeInt(0); // ptTeleportTarget.x
            packet.writeInt(0); // ptTeleportTarget.y
        }
        return packet.getPacket();
    }

    public static void addShopInfo(WritingPacket packet, MapleClient c, int sid, List<MapleShopItem> items) {
        final ItemInformation ii = ItemInformation.getInstance();
        packet.writeInt(0);
        packet.writeInt(sid); //1.2.240+
        packet.writeLong(0); //1.2.251+
        packet.writeShort(items.size() + c.getPlayer().getRebuyList().size());
        for (MapleShopItem item : items) {
            PacketProvider.addShopItemInfo(packet, item, c, null, sid);
        }
        for (IItem item : c.getPlayer().getRebuyList()) {
            PacketProvider.addShopItemInfo(packet, new MapleShopItem((short) 1000, item.getItemId(), (int) ii.getPrice(item.getItemId()), 0, (byte) 0, (short) item.getQuantity(), 0, 0), c, item, -1);
        }
    }

    public static byte[] getNPCShop(MapleClient c, int sid, List<MapleShopItem> items) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_NPC_SHOP.getValue());
        packet.write(0);
        addShopInfo(packet, c, sid, items);

        return packet.getPacket();
    }

    public static byte[] confirmShopTransaction(byte code, int boughtIndex) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CONFIRM_SHOP_TRANSACTION.getValue());
        packet.write(code); // 8 = sell, 0 = buy, 0x20 = due to an error
        packet.write(boughtIndex >= 0 ? 1 : 0);
        if (boughtIndex >= 0) {
            packet.writeInt(boughtIndex);
        } else {
            packet.write(0); //1.2.168+
            packet.writeInt(0);
        }
        return packet.getPacket();
    }

    public static byte[] confirmShopTransactionAdditional(int sid, List<MapleShopItem> items, MapleShop shop, final MapleClient c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CONFIRM_SHOP_TRANSACTION.getValue());
        packet.write(8); // 8 = sell, 0 = buy, 0x20 = due to an error <- 160은 (4) 168은 (5)
        addShopInfo(packet, c, sid, items);

        return packet.getPacket();
    }

    public static byte[] addInventorySlot(MapleInventoryType type, IItem item) {
        return addInventorySlot(type, item, false);
    }

    public static byte[] addInventorySlot(MapleInventoryType type, IItem item, boolean fromDrop) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(fromDrop ? 1 : 0);
        packet.writeShort(1); // add mode
        packet.write(item.getPosition() > 100 && type == MapleInventoryType.ETC ? 9 : 0);
        packet.write(type.getType()); // iv type
        packet.write(item.getPosition()); // slot id
        PacketProvider.addItemInfo(packet, item, true, false, null);

        return packet.getPacket();
    }

    public static byte[] updateInventorySlot(MapleInventoryType type, IItem item, boolean fromDrop) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(fromDrop ? 1 : 0);
        packet.write(1);
        packet.write(0);
        packet.write(item.getPosition() > 100 && type == MapleInventoryType.ETC ? 6 : 1);
        packet.write(type.getType()); // iv type
        packet.writeShort(item.getPosition()); // slot id
        packet.writeShort(item.getQuantity());
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] moveInventoryItem(MapleInventoryType type, short src, short dst, boolean bag, boolean bothBag) {
        return moveInventoryItem(type, src, dst, (byte) -1, bag, bothBag);
    }

    public static byte[] moveInventoryItem(MapleInventoryType type, short src, short dst, short equipIndicator, boolean bag, boolean bothBag) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1);
        packet.write(1);
        packet.write(0);
        packet.write(bag ? (bothBag ? 8 : 5) : 2);
        packet.write(type.getType());
        packet.writeShort(src);
        packet.writeShort(dst);
        if (equipIndicator != -1) {
            packet.writeShort(equipIndicator);
        }
        return packet.getPacket();
    }

    public static byte[] moveAndMergeInventoryItem(MapleInventoryType type, short src, short dst, short total, boolean bag, boolean switchSrcDst, boolean bothBag) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1);
        packet.write(2);
        packet.write(0);
        packet.write(bag && (switchSrcDst || bothBag) ? 7 : 3);
        packet.write(type.getType());
        packet.writeShort(src);
        packet.write(bag && (!switchSrcDst || bothBag) ? 6 : 1); // merge mode?
        packet.write(type.getType());
        packet.writeShort(dst);
        packet.writeShort(total);

        return packet.getPacket();
    }

    public static byte[] moveAndMergeWithRestInventoryItem(MapleInventoryType type, short src, short dst, short srcQ, short dstQ, boolean bag, boolean switchSrcDst, boolean bothBag) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1);
        packet.write(2);
        packet.write(0);
        packet.write(bag && (switchSrcDst || bothBag) ? 6 : 1);
        packet.write(type.getType());
        packet.writeShort(src);
        packet.writeShort(srcQ);
        packet.write(bag && (!switchSrcDst || bothBag) ? 6 : 1);
        packet.write(type.getType());
        packet.writeShort(dst);
        packet.writeShort(dstQ);

        return packet.getPacket();
    }

    public static byte[] clearInventoryItem(MapleInventoryType type, short slot, boolean fromDrop) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(fromDrop ? 1 : 0);
        packet.write(1);
        packet.write(0);
        packet.write(slot > 100 && type == MapleInventoryType.ETC ? 7 : 3);
        packet.write(type.getType());
        packet.writeShort(slot);

        return packet.getPacket();
    }

    public static byte[] removeInventoryItem(MapleInventoryType type, short slot) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(0);
        packet.write(1);
        packet.write(0);
        packet.write(slot > 100 && type == MapleInventoryType.ETC ? 7 : 3);
        packet.write(type.getType());
        packet.writeShort(slot);

        return packet.getPacket();
    }

    public static byte[] updateSpecialItemUse(IItem item, byte invType) {
        return updateSpecialItemUse(item, invType, false, null);
    }

    public static byte[] updateSpecialItemUse(IItem item, byte invType, boolean theShort, MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(0); // could be from drop
        packet.write(2); // always 2
        packet.write(0);
        packet.write(invType == MapleInventoryType.ETC.getType() && item.getPosition() > 100 ? 7 : 3); // quantity > 0 (?)
        packet.write(invType); // Inventory type
        packet.writeShort(item.getPosition()); // item slot
        packet.write(0);
        packet.write(invType);
        if (item.getType() == 1 || theShort) {
            packet.writeShort(item.getPosition()); // wtf repeat
        } else {
            packet.write(item.getPosition());
        }
        PacketProvider.addItemInfo(packet, item, true, true, false, false, chr);
        if (item.getPosition() < 0) {
            packet.write(2); //?
        }

        return packet.getPacket();
    }

    public static byte[] updateSpecialItemUseT(IItem item, byte invType, MapleCharacter chr, int type) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(0); // could be from drop
        packet.write(2); // always 2
        packet.write(0);
        packet.write(3); // quantity > 0 (?)
        packet.write(invType); // Inventory type
        packet.writeShort(item.getPosition()); // item slot
        packet.write(0);
        packet.write(invType);
        if (item.getType() == 1) {
            packet.writeShort(item.getPosition()); // wtf repeat
        } else {
            packet.write(item.getPosition());
        }
        PacketProvider.addItemInfo(packet, item, true, true, false, false, chr);
        packet.write(type);

        return packet.getPacket();
    }

    public static byte[] scrolledItem(IItem scroll, IItem item, boolean destroyed, boolean potential) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1); // fromdrop always true
        packet.write(destroyed ? 2 : 3);
        packet.write(0);
        packet.write(scroll.getQuantity() > 0 ? 1 : 3);
        packet.write(GameConstants.getInventoryType(scroll.getItemId()).getType());
        packet.writeShort(scroll.getPosition());
        if (scroll.getQuantity() > 0) {
            packet.writeShort(scroll.getQuantity());
        }
        packet.write(3);
        if (!destroyed) {
            packet.write(MapleInventoryType.EQUIP.getType());
            packet.writeShort(item.getPosition());
            packet.write(0);
        }
        packet.write(MapleInventoryType.EQUIP.getType());
        packet.writeShort(item.getPosition());
        if (!destroyed) {
            PacketProvider.addItemInfo(packet, item, true, true, null);
        }
        if (!potential) {
            packet.write(7);
        } else {
            packet.write(11);
        }

        return packet.getPacket();
    }

    public static byte[] getScrollEffect(int chr, ScrollResult scrollSuccess) {
        return getScrollEffect(chr, scrollSuccess, 0, 0);
    }

    public static byte[] getScrollEffect(int chr, int scrollid, int victimid) {
        return getScrollEffect(chr, ScrollResult.SUCCESS, scrollid, victimid);
    }

    public static byte[] getScrollEffect(int chr, ScrollResult scrollSuccess, int scrollid, int victimid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_SCROLL_EFFECT.getValue());
        packet.writeInt(chr);

        switch (scrollSuccess) {
            case SUCCESS:
                packet.write(1);
                packet.write(0);
                packet.writeInt(scrollid);
                packet.writeInt(victimid);
                break;
            case FAIL:
                packet.write(0);
                packet.write(0);
                packet.writeInt(scrollid);
                packet.writeInt(victimid);
                break;
            case CURSE:
                packet.write(2);
                packet.write(0);
                packet.writeInt(scrollid);
                packet.writeInt(victimid);
                break;
        }

        return packet.getPacket();
    }

    public static byte[] MemorialCubeWindow(IItem item) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MEMORIAL_CUBE_WINDOW.getValue());
        packet.writeInt(7245);
        packet.write(0x43);
        packet.writeShort(2);
        packet.write(0x14);
        packet.write(1);
        PacketProvider.addItemInfo(packet, item, true, true, null);
        packet.writeInt(5062090);
        packet.writeInt(item.getPosition());

        return packet.getPacket();
    }

    public static byte[] MemorialCube() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MEMORIAL_CUBE.getValue());
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] ItemMaker_Success() {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        packet.write(0x15);
        packet.write0(4);

        return packet.getPacket();
    }

    public static byte[] ItemMaker_Success_3rdParty(final int from_playerid) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        packet.writeInt(from_playerid);
        packet.write(0x15);
        packet.write0(4);

        return packet.getPacket();
    }

    public static byte[] explodeDrop(int oid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.REMOVE_ITEM_FROM_MAP.getValue());
        packet.write(4); // 4 = Explode
        packet.writeInt(oid);
        packet.writeShort(655);

        return packet.getPacket();
    }

    public static byte[] removeItemFromMap(int oid, int animation, int cid) {
        return removeItemFromMap(oid, animation, cid, false, 0);
    }

    public static byte[] removeItemFromMap(int oid, int animation, int cid, boolean pet, int slot) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.REMOVE_ITEM_FROM_MAP.getValue());
        packet.write(animation); // 0 = Expire, 1 = without animation, 2 = pickup, 4 = explode
        packet.writeInt(oid);
        if (animation >= 2) {
            packet.writeInt(cid);
            if (pet) { // allow pet pickup?
                packet.writeInt(slot);
            }
        }
        return packet.getPacket();
    }

    public static byte[] updateCharLook(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_CHAR_LOOK.getValue());
        packet.writeInt(chr.getId());
        packet.write(1);
        PacketProvider.addPlayerLooks(packet, chr, false);
        if (GameConstants.isZero(chr.getJob())) {
            PacketProvider.addPlayerLooksZero(packet, chr, false);
        }
        Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> rings = chr.getRings(false);
        addRingInfo(packet, rings.getFirst());
        addRingInfo(packet, rings.getSecond());
        addMRingInfo(packet, rings.getThird(), chr);
        packet.writeInt(0); //nCompletedSetItemID
        packet.writeInt(0); //nTotalCHUC

        return packet.getPacket();
    }

    public static byte[] updateCharLook(MapleCharacter chr, boolean Angelic) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_CHAR_LOOK.getValue());
        packet.writeInt(chr.getId());
        packet.write(1);
        PacketProvider.addPlayerLooks(packet, chr, false);
        if (GameConstants.isZero(chr.getJob())) {
            PacketProvider.addPlayerLooksZero(packet, chr, false);
        }
        Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> rings = chr.getRings(false);
        addRingInfo(packet, rings.getFirst());
        addRingInfo(packet, rings.getSecond());
        addMRingInfo(packet, rings.getThird(), chr);
        packet.writeInt(0);
        packet.writeInt(0); //1.2.220+, 0x68
        if (Angelic) {
            packet.writeShort(0);
            packet.writeInt(34);
        }
        return packet.getPacket();
    }

    public static byte[] dropInventoryItem(MapleInventoryType type, short src) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1);
        packet.write(1);
        packet.write(0);
        packet.write(3);
        packet.write(type.getType());
        packet.writeShort(src);
        if (src < 0) {
            packet.write(1);
        }

        return packet.getPacket();
    }

    public static byte[] dropInventoryItemUpdate(MapleInventoryType type, IItem item) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1);
        packet.write(1);
        packet.write(0);
        packet.write(1);
        packet.write(type.getType());
        packet.writeShort(item.getPosition());
        packet.writeShort(item.getQuantity());

        return packet.getPacket();
    }

    public static byte[] damagePlayer(int type, int monsteridfrom, int cid, int damage, int fake, byte direction, int reflect, boolean is_pg, int oid, int pos_x, int pos_y) throws InterruptedException {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.DAMAGE_PLAYER.getValue());
        packet.writeInt(cid);
        packet.write(type);
        packet.writeInt(0); // unused
        packet.write(direction);
        packet.write(0); // guard?

        if (type < -1) {
            if (type == -8) {
                packet.writeInt(0);
                packet.writeInt(0);
                packet.writeInt(0);
            }
        } else {
            packet.writeInt(monsteridfrom);
            packet.write(direction);
            packet.writeInt(oid);
            packet.writeInt(0); // unused
            packet.writeInt(reflect);
            packet.write(0); // bGuard

            if (reflect > 0) {
                packet.write(is_pg ? 1 : 0); // powerguard(
                packet.writeInt(oid);
                packet.write(6); // nAction
                packet.writeShort(pos_x);
                packet.writeShort(pos_y);
            }

            packet.write(0);
        }

        packet.writeInt(damage);

        if (damage == -1) {
            packet.writeInt(fake);
        }

        return packet.getPacket();
    }

    public static byte[] startQuest(final MapleCharacter c, final short quest, final String data) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(1);
        packet.writeInt(quest); //1.2.250+
        packet.write(1);
        packet.writeMapleAsciiString(data != null ? data : "");

        return packet.getPacket();
    }

    public static byte[] forfeitQuest(MapleCharacter c, short quest) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(1);
        packet.writeInt(quest); //1.2.250+
        packet.write(0);
        packet.writeShort(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeLong(0);

        return packet.getPacket();
    }

    public static byte[] completeQuest(final int quest) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(1);
        packet.writeInt(quest); //1.2.250+
        packet.write(2);
        packet.writeLong(PacketProvider.getTime(System.currentTimeMillis()));

        return packet.getPacket();
    }

    public static byte[] updateInfoQuest(final int quest, final String data) { //sub_17C6DA0
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(0x0D); //1.2.250+ (+1)
        packet.writeInt(quest);
        packet.writeMapleAsciiString(data);

        return packet.getPacket();
    }

    public static byte[] getCharInfo(final MapleCharacter hp, final boolean isSelf) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CHAR_INFO.getValue());
        packet.writeInt(hp.getId());
        packet.write(0); //1.2.220+
        packet.write(hp.getLevel());
        packet.writeShort(hp.getJob());
        packet.write0(3); //배틀랭크 0A 포함.
        packet.writeInt(hp.getFame()); //인기도
        packet.write(0); //결혼
        List<Integer> professions = new ArrayList<Integer>(2);
        packet.write(professions.size()); //전문기술갯수
        for (Integer i : professions) {
            packet.writeShort(i);
        }
        if (hp.getGuildId() <= 0) {
            packet.writeMapleAsciiString("-");
            packet.writeMapleAsciiString(GameConstants.랭크(hp.getRankPoint()));
        } else {
            final MapleGuildContents gs = hp.getClient().getChannelServer().getGuildSummary(hp.getGuildId());
            if (gs != null) {
                packet.writeMapleAsciiString(gs.getName());
                if (gs.getAllianceId() > 0) {
                    final MapleAlliance alliance = ChannelServer.getAlliance(gs.getAllianceId());
                    if (alliance != null) {
                        packet.writeMapleAsciiString(GameConstants.랭크(hp.getRankPoint()));
                    } else {
                        packet.writeMapleAsciiString(GameConstants.랭크(hp.getRankPoint()));
                    }
                } else {
                    packet.writeMapleAsciiString(GameConstants.랭크(hp.getRankPoint()));
                }
            } else {
                packet.writeMapleAsciiString("-");
                packet.writeMapleAsciiString(GameConstants.랭크(hp.getRankPoint()));
            }
        }
        packet.write(hp.getEqPet());
        packet.write(0);
        packet.write(hp.getEqPet() > 0 ? 1 : 0);
        packet.write(hp.getEqPet() > 0 ? 1 : 0);
        if (hp.getEqPet() > 0) {
            for (int i = 0; i < hp.getEqPets().length; i++) {
                packet.writeInt(i);
                packet.writeInt(hp.getEqPets()[i].getPetItemId()); // petid
                packet.writeMapleAsciiString(hp.getEqPets()[i].getName());
                packet.write(hp.getEqPets()[i].getLevel()); // pet level
                packet.writeShort(hp.getEqPets()[i].getCloseness()); // pet closeness
                packet.write(hp.getEqPets()[i].getFullness()); // pet fullness
                packet.writeShort(hp.getEqPets()[i].getSkillValue());
                packet.writeInt(hp.getEqPets()[i].getPetItemId());
                packet.writeInt(hp.getEqPets()[i].getColor()); //v171
                packet.write((i + 1) == hp.getEqPet() ? 0 : 1);
            }
        }
        packet.write(0);
        IItem medal = hp.getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -21);
        if (medal != null) {
            packet.writeInt(medal.getItemId());
        } else {
            packet.writeInt(0);
        }
        ArrayList<Integer> medalQuests = new ArrayList<>();
        ArrayList<Long> medalQuestsTime = new ArrayList<>();
        for (MapleQuestStatus q : hp.getCompletedQuests()) {
            if (q.getQuest().getMedalItem() != 0) {
                medalQuests.add((Integer) q.getQuest().getId());
                medalQuestsTime.add(q.getCompletionTime());
            }
        }
        Collections.sort(medalQuests);
        packet.writeShort(medalQuests.size());
        int iz = 0;
        for (Integer i : medalQuests) {
            packet.writeInt(i); //1.2.251+
            packet.writeLong(PacketProvider.getTime(medalQuestsTime.get(iz)));
            ++iz;
        }

        DamageSkinSaveInfo(hp, packet);

        packet.write(GameConstants.getTraitLevel(hp.getStat().getAmbition())); // ambition
        packet.write(GameConstants.getTraitLevel(hp.getStat().getInsight())); // insight
        packet.write(GameConstants.getTraitLevel(hp.getStat().getWillPower())); // willpower
        packet.write(GameConstants.getTraitLevel(hp.getStat().getDiligence())); // diligence
        packet.write(GameConstants.getTraitLevel(hp.getStat().getEmpathy())); // empathy
        packet.write(GameConstants.getTraitLevel(hp.getStat().getCharm())); // charm
        packet.writeInt(hp.getClient().getAccID());
        packet.writeMapleAsciiString(ServerConstants.serverName);
        packet.write0(29);
        packet.writeInt(hp.getGender());

        return packet.getPacket();
    }

    public static byte[] giveSpecialMount(int skillid, int bufflength, int mountid, List<Triple<BuffStats, Integer, Boolean>> statups, Map<BuffStats, List<StackedSkillEntry>> stacks) { // 치우씨 :: 라이딩 구현
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (!statup.getThird()) {
                if (statup.getFirst() != BuffStats.CTS_MonsterRiding) {
                    packet.writeInt(statup.getSecond().intValue());
                    packet.writeInt(skillid);
                    packet.writeInt(bufflength);
                }
            }
        }
        packet.write0(9);
        packet.writeInt(mountid);
        packet.writeInt(skillid);
        packet.write0(10);
        packet.write(1);
        packet.write(8);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] giveMount(int buffid, int skillid) { // 치우씨 :: 라이딩 구현
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_MonsterRiding);
        packet.write0(9);
        packet.writeInt(buffid);
        packet.writeInt(skillid);
        packet.write0(10);
        packet.write(1);
        packet.write(8);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] cancelMount() { // 치우씨 :: 라이딩 구현
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_MonsterRiding);
        packet.write(8);
        packet.write(1);

        return packet.getPacket();
    }

    public static byte[] showMonsterRiding(int cid, int itemId, int skillId) { // 치우씨 :: 라이딩 구현
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_MonsterRiding);
        packet.write0(23);
        packet.writeInt(itemId);
        packet.writeInt(skillId);
        packet.write0(7);

        return packet.getPacket();
    }

    public static byte[] cancelJaguarRiding() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_MonsterRiding);
        packet.write(7); //1,2,239+
        packet.write(1); //1.2.239+

        return packet.getPacket();
    }

    public static byte[] giveEnergyCharge(int bar, int maxbar) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_EnergyCharged);
        packet.write0(9);
        packet.writeShort(Math.min(bar, maxbar)); // 0 = no bar, 10000 = full bar
        packet.write0(10);
        packet.writeShort(0);//short - bufflength...50
        packet.writeInt(0);
        packet.writeInt(62);
        packet.write(0); //v193
        return packet.getPacket();
    }

    public static byte[] giveEnergyChargeMaximum(int skillid, int charge) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_EnergyCharged);
        packet.writeInt(0);
        packet.write(0);
        packet.writeInt(skillid);
        packet.writeShort(charge);
        packet.writeInt(0);
        packet.writeShort(0);
        packet.write(0);
        packet.write(0);
        packet.writeLong(0);
        packet.writeInt(0x48);
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] giveEnergyChargecooling(int skillid, int charge) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_EnergyCharged);
        packet.writeInt(0);
        packet.write(0);
        packet.writeInt(skillid);
        packet.writeShort(charge);
        packet.writeInt(0);
        packet.writeShort(0);
        packet.write(1);
        packet.write(1);
        packet.writeLong(0);
        packet.writeInt(0x48);
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] giveForeignEnergyCharge(int cid, int bar, int bufflength) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_EnergyCharged);
        packet.writeLong(0);
        packet.writeLong(0);
        packet.writeLong(0);
        packet.write0(31); //v193
        packet.writeShort(Math.min(bar, 10000)); // 0 = no bar, 10000 = full bar
        packet.writeShort(0);
        packet.writeLong(0);
        packet.write(0);
        packet.writeShort(bar >= 10000 ? bufflength : 0);//short - bufflength...50
        packet.write0(2);
        packet.writeInt(0); //v193
        return packet.getPacket();
    }

    public final static byte[] giveArcane(int skillid, int x, Map<Integer, Integer> statups, int duration) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_ArcaneAim);
        packet.writeShort(x);
        packet.writeInt(skillid);
        packet.writeInt(duration);
        packet.write0(18);

        return packet.getPacket();
    }

    public static final byte[] giveAffinity(int skillid, int value, int bufflength) {
        WritingPacket packet = new WritingPacket();
        final List<Triple<BuffStats, Integer, Boolean>> statups = Collections.singletonList(new Triple<>(BuffStats.CTS_AffinitySlug, 0, false));
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        packet.writeShort(value);
        packet.writeInt(skillid);
        packet.writeInt(bufflength);
        packet.write0(13);

        return packet.getPacket();
    }

    public static byte[] giveDice(int buffid, int skillid, int duration, List<Triple<BuffStats, Integer, Boolean>> statups) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        packet.writeShort(buffid);
        packet.writeInt(skillid);
        packet.writeInt(duration);
        packet.writeShort(0);
        packet.write(0);
        packet.writeShort(0);
        /*
         * 2 : 30
         * 3 : 20, 20
         * 4 : 15
         * 5 : 20
         * 6 : 30
         *
         */
        packet.writeInt(buffid == 3 ? 30 : 0); //MAX HP
        packet.writeInt(buffid == 3 ? 30 : 0); //MAX MP
        packet.writeInt(buffid == 4 ? 15 : 0); //CRITICAL RATE
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(buffid == 2 ? 30 : 0); //Physical Defense
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(buffid == 5 ? 20 : 0); //Increase Damage
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(buffid == 6 ? 30 : 0); //Increase EXP Rate
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0); //1.2.214+
        packet.writeInt(0);
        packet.write(1);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] giveDoubleDice(int buffid, int skillid, int duration, List<Triple<BuffStats, Integer, Boolean>> statups) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        packet.writeShort(buffid);
        packet.writeInt(skillid);
        packet.writeInt(duration);
        packet.write0(5);
        int dice2 = 0, dice3 = 0, dice4 = 0, dice5 = 0, dice6 = 0;
        switch (buffid & 0xF) {
            case 2:
                dice2 += 30;
                break;
            case 3:
                dice3 += 30;
                break;
            case 4:
                dice4 += 15;
                break;
            case 5:
                dice5 += 20;
                break;
            case 6:
                dice6 += 30;
                break;
        }
        if ((buffid & 0xF) == 0x1 || ((buffid & 0xF) == ((buffid & 0xF0) / 10))) {
            switch ((buffid & 0xF0) / 10) {
                case 2:
                    dice2 += 30;
                    break;
                case 3:
                    dice3 += 30;
                    break;
                case 4:
                    dice4 += 15;
                    break;
                case 5:
                    dice5 += 20;
                    break;
                case 6:
                    dice6 += 30;
                    break;
            }
        }
        packet.writeInt(dice3); //MAX HP
        packet.writeInt(dice3); //MAX MP
        packet.writeInt(dice4); //CRITICAL RATE
        packet.writeInt(0);

        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);

        packet.writeInt(dice2); //Physical Defense
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);

        packet.writeInt(dice5); //Increase Damage
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);

        packet.writeInt(0);
        packet.writeInt(dice6); //Increase EXP Rate
        packet.writeInt(0);
        packet.writeInt(0);

        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0); //1.2.214+
        packet.writeInt(0);

        packet.write(1);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] noteMessage(int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_NOTES.getValue());
        packet.write(value);
        if (value == 6) {
            packet.write(5);
        }
        return packet.getPacket();
    }

    public static byte[] showNotes(ResultSet notes, int count) throws SQLException {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_NOTES.getValue());
        packet.write(4); //1.2.251+ (+1)
        packet.write(count);
        while (notes.next()) {
            packet.writeInt(notes.getInt("id"));
            packet.writeMapleAsciiString(notes.getString("from"));
            packet.writeMapleAsciiString(notes.getString("message"));
            packet.writeLong(PacketProvider.getKoreanTimestamp(notes.getLong("timestamp")));
            packet.write(0);
        }
        return packet.getPacket();
    }

    public static byte[] givePhantomJudgement(int buffid, int bufflength, List<Triple<BuffStats, Integer, Boolean>> statups, int type) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (!statup.getThird()) {
                packet.writeShort(type);
                packet.writeInt(buffid);
                packet.writeInt(bufflength);
            }
        }
        packet.write0(5);
        packet.writeInt(type == 1 ? 10 : 20);
        packet.writeLong(0);
        packet.write(1);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] giveBuff(int buffid, int bufflength, List<Triple<BuffStats, Integer, Boolean>> statups, SkillStatEffect effect, Map<BuffStats, List<StackedSkillEntry>> stacks, int animationTime) { // 치우씨 :: 아란 콤보 및 이뮨배리어
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (!statup.getThird()) {
                if (buffid == 23101003 || buffid == 65101002 || buffid == 4111002 || buffid == 4211008
                        || buffid == 14111000 || buffid == 4331002 || buffid == 36111006 || buffid == 15121004
                        || buffid == 31121054 || buffid == 65121004 || buffid == 80001428 || buffid == 3210013
                        || buffid == 13110026 || buffid == 101120109) {
                    packet.writeInt(statup.getSecond().intValue());
                } else {
                    packet.writeShort(statup.getSecond().shortValue());
                }
                packet.writeInt(buffid);
                packet.writeInt(bufflength);
            }
        }

        if (buffid == 1301013) {
            packet.writeInt(0);
            packet.write(5);
        }

        packet.writeInt(0);

        if (buffid == 80001757) {
            packet.write(0x0A);
        } else {
            packet.write(0);
        }

        if (buffid == 2321054 || buffid == 13120008 || buffid == 32001016 || buffid == 32101009 || buffid == 32111012 || buffid == 32121017 || buffid == 32121018 || buffid == 51111008) {
            packet.writeInt(buffid == 51111008 ? 1 : 0);
        }

        if (buffid == 1211014 || buffid == 32001016 || buffid == 32101009 || buffid == 32111012 || buffid == 32121017
                || buffid == 32121018 || buffid == 2221054 || buffid == 36121003 || buffid == 11101022 || buffid == 51111008
                || buffid == 11111022 || buffid == 33101006 || buffid == 100001263 || buffid == 100001264) {
            packet.write(buffid == 3111011 || buffid == 3211012 ? 0 : buffid == 33101006 ? 0x5A : 1);
        }

        /* Stack Buff 처리 구간, 시작*/
        if (buffid == 2321005 || buffid == 3111011 || buffid == 3211012 || buffid == 36111003 || buffid == 25121209 || buffid == 27121005) {
            packet.writeInt(buffid == 36111003 || buffid == 2321005 ? 10 - effect.getX() : effect.getX());
            if (buffid == 36111003) {
                packet.write(0);
            } else if (buffid == 25121209 || buffid == 2321005) {
                packet.writeInt(0);
            } else if (buffid == 3111011 || buffid == 3211012) {
                packet.writeLong(0);
            }
        } else {
            packet.writeInt(buffid == 80001428 ? 0x78 : buffid == 1301013 ? buffid : buffid == 1311015 || buffid == 51111008 ? 1 : buffid == 5121055 ? 5120018 : 0);
            if (buffid == 2111011 || buffid == 2211012 || buffid == 2311012 || buffid == 3211011 || buffid == 27111004
                    || buffid == 30021237 || buffid == 32121054) {
                packet.write(buffid == 32121054 ? 1 : 0);
            } else if (buffid == 1301013 || buffid == 1311015 || buffid == 1321015 || buffid == 2321054 || buffid == 3121002
                    || buffid == 3221002 || buffid == 27121006 || buffid == 32111005 || buffid == 33121004 || buffid == 36121004
                    || buffid == 80001428 || buffid == 13121005 || buffid == 12120013 || buffid == 12120014 || buffid == 3221054
                    || buffid == 11111023 || buffid == 24121004) {
                packet.writeInt(0);
            } else if (buffid == 51111008) {
                packet.writeLong(0);
            }
        }

        /* Stack Buff 처리 구간, 종료 */
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (statup.getThird()) {
                packet.writeInt(stacks.get(statup.getFirst()).size());
                for (StackedSkillEntry sse : stacks.get(statup.getFirst())) {
                    packet.writeInt(sse.getSkillId());
                    packet.writeInt(sse.getValue());
                    for (int i = 0; i < 2; i++) {
                        packet.writeInt(sse.getTime()); //1.2.252+
                    }
                    packet.writeLong(sse.getBuffLength()); //1.2.251+
                }
            }
        }

        /* 스킬 딜레이 시작 */
        if ((animationTime > 0) && (buffid != 101120109)) {
            packet.writeShort(animationTime * 10);
        } else if (buffid == 101120109) {
            for (Triple<BuffStats, Integer, Boolean> statup : statups) {
                // if (statup.getFirst() == BuffStats.IMMUNITY_BARRIER) {
                packet.writeInt(statup.getSecond().intValue());
                break;
                //}
            }
            packet.writeShort(0);
        } else {
            packet.writeShort(0);
        }
        /* 스킬 딜레이 종료 */
        packet.writeShort(0);
        /* SkillType 시작 */
        packet.write(1);
        /* SkillType 종료 */
        packet.writeLong(0); //1.2.251+, 모든 버프 팅김 방지.

        return packet.getPacket();
    }

    public static byte[] giveBuff(int buffid, int bufflength, List<Triple<BuffStats, Integer, Boolean>> statups, SkillStatEffect effect, Map<BuffStats, List<StackedSkillEntry>> stacks, int animationTime, MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        if (true) {
            return SecondaryStat.encodeForLocal(packet, buffid, bufflength, statups, effect, stacks, animationTime, chr);
        }

        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        for (Triple<BuffStats, Integer, Boolean> statup : statups) { // 치우씨 :: 이뮨배리어
            if (!statup.getThird()) {
                if (buffid == 101120109) {
                    packet.writeInt(statup.getSecond().intValue());
                } else {
                    packet.writeShort(statup.getSecond().shortValue());
                }
                packet.writeInt(buffid);
                packet.writeInt(bufflength);
            }
        }

        if (buffid == 1301013) {
            packet.writeInt(0);
            packet.write(5);
        }
        if (buffid == 2321054 || buffid == 13120008) {
            packet.writeInt(0);
        }
        if (buffid == 33101006) {
            packet.write(0x5A);
        }

        packet.write0(5);

        if (buffid == 32001016 || buffid == 32101009 || buffid == 32111012 || buffid == 32121017 || buffid == 32121018 || buffid == 51111008) {
            packet.writeInt(buffid == 51111008 ? 1 : 0); //Unknown...?
        }

        if (buffid == 1211014 || buffid == 32001016 || buffid == 32101009 || buffid == 32111012 || buffid == 32121017
                || buffid == 32121018 || buffid == 2221054 || buffid == 36121003 || buffid == 11101022 || buffid == 51111008
                || buffid == 11111022 || buffid == 100001263 || buffid == 100001264) {
            packet.write(1);
        }

        /* Stack Buff 처리 구간, 시작*/
        if (buffid == 15001022) {
            packet.writeInt(effect.getY());
            if (buffid == 15001022) {
                packet.writeInt(0);
            }
        } else if (buffid == 2321005 || buffid == 3111011 || buffid == 3211012 || buffid == 36111003 || buffid == 25121209 || buffid == 27121005) {
            packet.writeInt(buffid == 36111003 || buffid == 2321005 ? 10 - effect.getX() : effect.getX());
            if (buffid == 36111003) {
                packet.write(0);
            } else if (buffid == 25121209 || buffid == 2321005 || buffid == 3111011 || buffid == 3211012) {
                packet.writeInt(0);
            }
        } else {
            packet.writeInt(buffid == 80001428 ? 0x78 : buffid == 1301013 ? buffid : buffid == 1311015 || buffid == 51111008 ? 1 : buffid == 5121055 ? 5120018 : 0);
            if (buffid == 2111011 || buffid == 2211012 || buffid == 2311012 || buffid == 3211011 || buffid == 27111004
                    || buffid == 30021237 || buffid == 32121054) {
                packet.write(buffid == 32121054 ? 1 : 0);
            } else if (buffid == 1301013 || buffid == 1311015 || buffid == 1321015 || buffid == 2321054 || buffid == 3121002
                    || buffid == 3221002 || buffid == 27121006 || buffid == 32111005 || buffid == 33121004 || buffid == 36121004
                    || buffid == 80001428 || buffid == 13121005 || buffid == 12120013 || buffid == 12120014 || buffid == 3221054
                    || buffid == 11111023 || buffid == 24121004) {
                packet.writeInt(0);
            } else if (buffid == 51111008) {
                packet.writeLong(0);
            }
        }
        packet.write0((buffid != 36111003 && buffid != 101120109 && buffid != 27121005) ? 3 : 0); //1.2.197+ 치우씨 :: 이뮨배리어

        /* Stack Buff 처리 구간, 종료 */
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (statup.getThird()) {
                packet.writeInt(stacks.get(statup.getFirst()).size());
                for (StackedSkillEntry sse : stacks.get(statup.getFirst())) {
                    packet.writeInt(sse.getSkillId());
                    packet.writeInt(sse.getValue());
                    packet.writeLong(sse.getTime());
                    packet.writeLong(sse.getBuffLength()); //1.2.251+
                }
            }
        }

        /* 스킬 딜레이 시작 */
        if ((animationTime > 0) && (buffid != 101120109)) {
            packet.writeShort(animationTime * 10);
        } else if (buffid == 101120109) {
            for (Triple<BuffStats, Integer, Boolean> statup : statups) {
                if (statup.getFirst() == BuffStats.CTS_ImmuneBarrier) {
                    packet.writeInt(statup.getSecond().intValue());
                    break;
                }
            }
            packet.writeShort(0);
        } else {
            packet.writeShort(0);
        }
        /* 스킬 딜레이 종료 */
        packet.writeShort(0);
        /* SkillType 시작 */
        packet.write(1);
        /* SkillType 종료 */
        packet.writeLong(0); //1.2.251+, 모든 버프 팅김 방지.

        return packet.getPacket();
    }

    public static byte[] giveSpiritLink(int duration, int skill1, int skill2) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_SpiritLink);
        packet.writeInt(skill1);
        packet.writeInt(skill2);
        packet.writeInt(duration);
        packet.write0(9);
        packet.writeInt(0); //v192

        return packet.getPacket();
    }

    public static byte[] giveSurPlus(int surplus) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_SurplusSupply);
        packet.writeShort(surplus);
        packet.writeInt(30020232);
        packet.write0(22);

        return packet.getPacket();
    }

    public static byte[] giveBulletGauge(int skillid, byte bullet, byte cylinder) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_RWCylinder);
        packet.writeShort(1);
        packet.writeInt(skillid);
        packet.write0(9);
        packet.write(bullet);
        packet.write(cylinder);
        packet.write0(14);

        return packet.getPacket();
    }

    public static byte[] givePsychicPoint(int skillid, int point) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_KinesisPsychicPoint);
        packet.writeShort(point);
        packet.writeInt(skillid);
        packet.write0(22);

        return packet.getPacket();
    }

    public static byte[] giveDebuff(final DiseaseStats stats, int x, final TestMobSkill skill) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, stats);
        if (stats.equals(DiseaseStats.TELEPORT)) {
            packet.writeShort(skill.getY());
        }
        if (stats.equals(DiseaseStats.ZOMBIFY)) {
            packet.write0(9);
        }
        packet.writeShort(x);
        packet.writeShort(skill.getSkillId());
        packet.writeShort(skill.getSkillLevel());
        if (!stats.equals(DiseaseStats.ZOMBIFY)) {
            packet.writeInt((int) skill.getDuration());
            packet.writeInt(0); //delay(?)
            packet.write(0);
            packet.writeInt(0);
        } else {
            packet.writeInt(0);
            packet.write(0);
            packet.writeShort(9);
        }
        if (stats.CURSE != null || stats.STUN != null) {
            packet.writeShort(0);
        } else if (stats.SEAL != null || stats.BLIND != null) {
            packet.writeShort(900);
        } else if (stats.SEDUCE != null) {
            packet.writeShort(2400); //1.2.239+
        } else if (stats.TELEPORT != null || stats.WEAKEN != null) {
            packet.writeShort(2350); //머리위에 뜨기까지의 시간
        } else if (stats.ZOMBIFY != null) {
            packet.writeShort(2280);
        } else {
            packet.write(0);
        }
        if (stats.SLOW != null) {
            packet.writeInt(1500);
        }
        packet.write(0);
        if (stats.SLOW != null) {
            packet.write(4);
        }
        packet.writeShort(0);
        packet.write(0); //1.2.239+
        packet.writeInt(0);
        packet.writeLong(0);
        packet.writeLong(0);
        return packet.getPacket();
    }

    public static byte[] giveForeignDebuff(int cid, final DiseaseStats statups, TestMobSkill skill) {
        if (statups == DiseaseStats.ZOMBIFY) {
            return MainPacketCreator.SkillUseResult(0);
        }
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeSingleMask(packet, statups);
        if (skill.getSkillId() == 125) {
            packet.writeShort(0);
        }
        packet.writeShort(skill.getX());
        packet.writeShort(skill.getSkillId());
        packet.writeShort(skill.getSkillLevel());
        packet.writeLong(0);
        packet.writeLong(0);
        packet.write(0);
        packet.writeInt(0);
        packet.writeShort(0);
        packet.writeShort(900); //Delay

        return packet.getPacket();
    }

    public static byte[] giveDebuff(final DiseaseStats stats, int x, final MobSkill skill) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, stats);
        if (stats.equals(DiseaseStats.TELEPORT)) {
            packet.writeShort(skill.getY());
        }
        if (stats.equals(DiseaseStats.ZOMBIFY)) {
            packet.write0(9);
        }
        packet.writeShort(x);
        packet.writeShort(skill.getSkillId());
        packet.writeShort(skill.getSkillLevel());
        if (!stats.equals(DiseaseStats.ZOMBIFY)) {
            packet.writeInt((int) skill.getDuration());
            packet.writeInt(0); //delay(?)
            packet.write(0);
            packet.writeInt(0);
        } else {
            packet.writeInt(0);
            packet.write(0);
            packet.writeShort(9);
        }
        if (stats.CURSE != null || stats.STUN != null) {
            packet.writeShort(0);
        } else if (stats.SEAL != null || stats.BLIND != null) {
            packet.writeShort(900);
        } else if (stats.SEDUCE != null) {
            packet.writeShort(2400); //1.2.239+
        } else if (stats.TELEPORT != null || stats.WEAKEN != null) {
            packet.writeShort(2350); //머리위에 뜨기까지의 시간
        } else if (stats.ZOMBIFY != null) {
            packet.writeShort(2280);
        } else {
            packet.write(0);
        }
        if (stats.SLOW != null) {
            packet.writeInt(1500);
        }
        packet.write(0);
        if (stats.SLOW != null) {
            packet.write(4);
        }
        packet.writeShort(0);
        packet.write(0); //1.2.239+
        packet.writeInt(0);
        packet.writeLong(0);
        packet.writeLong(0);
        return packet.getPacket();
    }

    public static byte[] giveForeignDebuff(int cid, final DiseaseStats statups, MobSkill skill) {
        if (statups == DiseaseStats.ZOMBIFY) {
            return MainPacketCreator.SkillUseResult(0);
        }
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeSingleMask(packet, statups);
        if (skill.getSkillId() == 125) {
            packet.writeShort(0);
        }
        packet.writeShort(skill.getX());
        packet.writeShort(skill.getSkillId());
        packet.writeShort(skill.getSkillLevel());
        packet.writeLong(0);
        packet.writeLong(0);
        packet.write(0);
        packet.writeInt(0);
        packet.writeShort(0);
        packet.writeShort(900); //Delay

        return packet.getPacket();
    }

    public static byte[] cancelForeignDebuff(int cid, DiseaseStats stats) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeSingleMask(packet, stats);

        return packet.getPacket();
    }

    public static byte[] giveForeignBuff(MapleCharacter chr, List<Triple<BuffStats, Integer, Boolean>> statups) {
        return SecondaryStat.encodeForRemote(chr, statups);
    }

    public static byte[] showVoydPressure(int cid, String Hex) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_VOYD_PRESSURE.getValue());
        packet.writeInt(cid);
        packet.write(HexTool.getByteArrayFromHexString(Hex)); //익시드랑 익시드공격스킬

        return packet.getPacket();
    }

    public static final <T extends GlobalBuffStat> byte[] cancelForeignBuff(int cid, int skillid, List<T> statups) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeMask(packet, statups);
        packet.writeLong(0);
        packet.writeLong(0);
        return packet.getPacket();
    }

    public static final <T extends GlobalBuffStat> byte[] cancelForeignRiding(int cid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_FOREIGN_BUFF.getValue());
        packet.writeInt(cid);
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_MonsterRiding);
        packet.write(1);

        return packet.getPacket();
    }

    public static final <T extends GlobalBuffStat> byte[] cancelBuff(List<T> statups, boolean mount, boolean saint, Map<BuffStats, List<StackedSkillEntry>> stacks) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        if (statups != null) {
            PacketProvider.writeMask(packet, statups);
            for (T buffs : statups) {
                if (stacks.containsKey((BuffStats) buffs)) {
                    packet.writeInt(stacks.get((BuffStats) buffs).size());
                    for (StackedSkillEntry sse : stacks.get((BuffStats) buffs)) {
                        packet.writeInt(sse.getSkillId());
                        packet.writeInt(sse.getValue());
                        packet.writeLong(sse.getTime());
                        packet.writeLong(sse.getBuffLength());
                    }
                }
            }
            packet.write0(statups.size() * 4);
            packet.write(statups.size());
            packet.writeInt(0);
        }
        return packet.getPacket();
    }

    public static byte[] cancelDebuff(DiseaseStats stats) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, stats);
        packet.write(3);
        packet.write(1);

        return packet.getPacket();
    }

    public static byte[] cancelExeedCount() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_OverloadCount);
        return packet.getPacket();
    }

    public static byte[] cancelExeed() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_Exceed);

        return packet.getPacket();
    }

    public static byte[] updateMount(MapleCharacter chr, boolean levelup) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_MOUNT.getValue());
        packet.writeInt(chr.getId());
        packet.writeInt(chr.getMount().getLevel());
        packet.writeInt(chr.getMount().getExp());
        packet.writeInt(chr.getMount().getFatigue());
        packet.write(levelup ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] mountInfo(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_MOUNT.getValue());
        packet.writeInt(chr.getId());
        packet.write(1);
        packet.writeInt(chr.getMount().getLevel());
        packet.writeInt(chr.getMount().getExp());
        packet.writeInt(chr.getMount().getFatigue());

        return packet.getPacket();
    }

    public static byte[] getPlayerShopChat(MapleCharacter c, String chat, boolean owner) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(24);
        packet.write(25); //v192 +9
        packet.write(owner ? 0 : 1);
        packet.writeMapleAsciiString(c.getName() + " : " + chat);
        return packet.getPacket();
    }

    public static byte[] getTradePartnerAdd(MapleCharacter c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(PlayerInteractionHandler.InteractionAction.VISIT.getAction());
        packet.write(1);
        PacketProvider.addPlayerLooks(packet, c, false);
        packet.writeMapleAsciiString(c.getName());
        packet.writeShort(c.getJob());

        return packet.getPacket();
    }

    public static byte[] getTradeInvite(MapleCharacter c, boolean isTrade) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(PlayerInteractionHandler.InteractionAction.INVITE_TRADE.getAction());
        packet.write(isTrade ? 4 : 3);
        packet.writeMapleAsciiString(c.getName());
        packet.writeShort(733); // v201
        packet.writeShort(0); // Trade ID

        return packet.getPacket();
    }

    public static byte[] getTradeMesoSet(byte number, long meso) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(4);
        packet.write(number);
        packet.writeLong(meso);

        return packet.getPacket();
    }

    public static byte[] getTradeItemAdd(byte number, IItem item) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(0);
        packet.write(number);
        PacketProvider.addItemInfo(packet, item, false, false, true, null);

        return packet.getPacket();
    }

    public static byte[] getTradeStart(MapleClient c, MapleUserTrade trade, byte number, boolean isTrade) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(0x14);
        packet.write(isTrade ? 4 : 3);
        packet.write(2);
        packet.write(number);
        if (number == 1) {
            packet.write(0);
            PacketProvider.addPlayerLooks(packet, trade.getPartner().getChr(), false);
            packet.writeMapleAsciiString(trade.getPartner().getChr().getName());
            packet.writeShort(trade.getPartner().getChr().getJob());
        }
        packet.write(number);
        PacketProvider.addPlayerLooks(packet, c.getPlayer(), false);
        packet.writeMapleAsciiString(c.getPlayer().getName());
        packet.writeShort(c.getPlayer().getJob());
        packet.write(-1);

        return packet.getPacket();
    }

    public static byte[] getTradeConfirmation() {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(8); //v192 +6

        return packet.getPacket();
    }

    public static byte[] StartRPS() {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(0x60);

        return packet.getPacket();
    }

    public static byte[] FinishRPS(byte result, byte rps) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(0x71);
        packet.write(result);
        packet.write(rps);

        return packet.getPacket();
    }

    public static byte[] ExitRPS() {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(0x1C);
        packet.write(0);
        packet.write(0x03);

        return packet.getPacket();
    }

    public static byte[] TradeMessage(final byte UserSlot, final byte message) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(28); //v192 +6
        packet.write(UserSlot);
        packet.write(message);
        //0x07 = success [tax is automated]
        //0x08 = unsuccessful
        //0x09 = "You cannot make the trade because there are some items which you cannot carry more than one."
        //0x10 = "You cannot make the trade because the other person's on a different map."

        return packet.getPacket();
    }

    public static byte[] getTradeCancel(final byte UserSlot) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PLAYER_INTERACTION.getValue());
        packet.write(28); //v192 +6
        packet.write(UserSlot);
        packet.write(2);

        return packet.getPacket();
    }

    public static byte[] getNPCTalk(int npc, byte msgType, String talk, String endBytes, byte type) {
        return getNPCTalk(npc, msgType, talk, endBytes, type, 0);
    }

    public static byte[] getNPCTalk(int npcId, byte msgType, String talk, String endBytes, byte type, int speaker) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(4);
        packet.writeInt(npcId);
        packet.write(0); //Not mean. Add. v192 
        packet.write(msgType);
        packet.writeShort(type); // 1 = No ESC, 3 = show character + no esc
        if (speaker != 0) {
            packet.writeInt(speaker);
        }
        if (msgType == 0x10) {
            packet.writeInt(0);
            packet.writeInt(5);
        }
        packet.writeMapleAsciiString(talk);
        packet.write(HexTool.getByteArrayFromHexString(endBytes));
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] newgetNPCTalk(int npcid, String msg) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(3);
        packet.writeInt(0);
        packet.write(0);
        packet.write(5);
        packet.writeShort(0x125);
        packet.writeInt(npcid);
        packet.writeMapleAsciiString(msg);
        packet.write(HexTool.getByteArrayFromHexString("00 01"));
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] NPCTalk(int npcid, String txt) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(3);
        packet.writeInt(0);
        packet.writeShort(0);
        packet.writeShort(0x24);
        packet.writeInt(npcid);
        packet.writeMapleAsciiString(txt);
        packet.write(HexTool.getByteArrayFromHexString("00 01"));
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] getQuickMove(List<QuickMoveEntry> quickmoves) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.QUICK_MOVE.getValue());
        packet.write(quickmoves.size());
        for (QuickMoveEntry q : quickmoves) {
            packet.writeShort(0); //1.2.193+
            packet.writeMapleAsciiString(q.getName());
            packet.writeInt(q.getNpcId());
            packet.writeInt(q.getIcon());
            packet.writeInt(q.getLevelLimit());
            packet.writeMapleAsciiString(q.getDesc());
            packet.writeLong(PacketProvider.getTime(-2));
            packet.writeLong(PacketProvider.MAX_TIME);
        }
        return packet.getPacket();
    }

    public static byte[] getMapSelection(final int npcid, final String sel) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(4);
        packet.writeInt(npcid);
        packet.write(0);
        packet.writeShort(0x11);
        packet.write0(9);
        packet.writeMapleAsciiString(sel);

        return packet.getPacket();
    }

    public static byte[] setMix(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_STATS.getValue());
        packet.writeInt(0);
        packet.write(0);
        packet.write(chr.getMixBaseHairColor());
        packet.write(chr.getMixAddHairColor());
        packet.write(chr.getMixHairBaseProb());
        packet.writeShort(0);

        return packet.getPacket();
    }

    public static byte[] getNPCTalkMixStyle(int npcId, String talk, boolean isAngelicBuster) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(4);
        packet.writeInt(npcId);
        packet.write(0);
        packet.write(0x29);
        packet.write(0);
        packet.write(0);
        packet.write(isAngelicBuster ? 1 : 0);
        packet.writeInt(1); //bZeroBeta
        packet.writeInt(0x32);
        packet.writeMapleAsciiString(talk);
        return packet.getPacket();
    }

    public static byte[] getNPCTalkStyleZero(int npcId, String talk, int[] fargs, int[] sargs) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(4);
        packet.writeInt(npcId);
        packet.write(0);
        packet.writeShort(32);
        packet.write(0);
        packet.writeMapleAsciiString(talk);
        packet.writeInt(0);
        packet.write(fargs.length);

        for (int i = 0; i < fargs.length; i++) {
            packet.writeInt(fargs[i]);
        }

        packet.writeInt(1);
        packet.write(sargs.length);

        for (int i = 0; i < sargs.length; i++) {
            packet.writeInt(sargs[i]);
        }
        return packet.getPacket();
    }

    public static byte[] getNPCTalkStyle(int npcId, String talk, boolean adventure, boolean isZero, int... args) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(4);
        packet.writeInt(npcId);
        packet.write(0); //Not mean, 192+
        if (!adventure) {
            packet.writeShort(isZero ? 0x20 : 0x0A);
        } else {
            packet.writeInt(0x09);
        }
        packet.write(0);
        packet.writeMapleAsciiString(talk);
        if (isZero) {
            packet.writeInt(0);
        }
        packet.write(args.length);
        for (int i = 0; i < args.length; i++) {
            packet.writeInt(args[i]);
        }
        if (isZero) { //임시처리, 추후 수정바람.
            packet.write(args.length);
            for (int i = 0; i < args.length; i++) {
                packet.writeInt(args[i]);
            }
        }
        return packet.getPacket();
    }

    public static byte[] getNPCTalkNum(int npc, String talk, int def, int min, int max) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(4);
        packet.writeInt(npc);
        packet.write(0); //Not mean. Add. v192 
        packet.writeShort(4);
        packet.write(0);
        packet.writeMapleAsciiString(talk);
        packet.writeInt(def);
        packet.writeInt(min);
        packet.writeInt(max);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] getNPCTalkText(int npc, String talk) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_TALK.getValue());
        packet.write(4);
        packet.writeInt(npc);
        packet.write(0); //Not mean. Add. v192 
        packet.writeShort(3);
        packet.write(0);
        packet.writeMapleAsciiString(talk);
        packet.writeInt(0);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] showSkillEffect(int cid, int skillid, int sLevel) {
        WritingPacket packet = new WritingPacket();
        if (cid == -1) {
            packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            packet.writeInt(cid);
        }
        packet.write(3);
        packet.writeInt(skillid);
        packet.write(sLevel);
        if (skillid == 31111003) {
            packet.writeInt(0);//IncDecHPEffect
        } else if (skillid == 25121006) {
            packet.writeInt(0);
        }
        return packet.getPacket();
    }

    public static byte[] showSkillEffect(int cid, int cLevel, int skillid, int sLevel, byte direction, int effectid, Point origin, Point dest) {
        return showSkillEffect(cid, cLevel, skillid, sLevel, direction, effectid, origin, dest, false);
    }

    public static byte[] showSkillEffect(int cid, int cLevel, int skillid, int sLevel, int mobid, int effectid, Point origin, Point dest, boolean Left) {
        WritingPacket packet = new WritingPacket();
        if (cid == -1) {
            packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            packet.writeInt(cid);
        }
        packet.write(effectid);
        if (effectid == 2) {
            packet.writeInt(0);
        }
        packet.writeInt(skillid);
        packet.write(cLevel);
        packet.write(sLevel);
        boolean create = false;
        switch (skillid) {
            case 22170074:
                packet.write(create ? 1 : 0);//에반 용 이펙트
                break;
            case 1320016:
                packet.write(create ? 1 : 0);//리인카네이션 이펙트
                break;
            case 4331006:
                packet.write(0);
                packet.writeInt(0);
                break;
            default:
                if (skillid == 3211010 || skillid == 3111010 || skillid == 1100012) {
                    packet.write(Left ? 1 : 0);//z
                    packet.writeInt(mobid);//mobid
                    packet.writeInt(origin.x);//x
                    packet.writeInt(origin.y);//y
                }
                if (skillid == 30001062) {
                    packet.write(0);
                    packet.writeShort(0);
                    packet.writeShort(0);
                }
                if (skillid == 30001061) {
                    packet.write(0);
                }
                if (skillid == 60001218 || skillid == 60011218) {
                    packet.writeInt(0);
                    packet.writeInt(dest.x);//x
                    packet.writeInt(dest.y);//y
                }
                if (skillid == 20041222 || skillid == 15001021 || skillid == 20051284) {
                    packet.writeInt(origin.x);//OriginX
                    packet.writeInt(origin.y);//OriginY
                    packet.writeInt(dest.x);//DestX
                    packet.writeInt(dest.y);//DestY
                }
                break;
        }
        if (skillid == 4221052 || skillid == 65121052) {
            packet.writeInt(0);
            packet.writeInt(0);
        }
        if (skillid != 12001027 && skillid != 12001028) {
            if (GameConstants.is_rw_multi_charge_skill(skillid)) {
                packet.writeInt(0);
            }
            if (GameConstants.is_unregisterd_skill(skillid)) {
                packet.write(0);
            }
        }
        return packet.getPacket();
    }

    public static byte[] showNovaLift(int cid, int skillid, byte[] available) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        packet.writeInt(cid);
        packet.write(1);
        packet.writeInt(skillid);
        packet.writeShort(0x166);
        packet.write(available);
        packet.write(1);

        return packet.getPacket();
    }

    public static byte[] captureMob(boolean success) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        packet.write(1);
        packet.writeInt(30001061);
        packet.write(0x47); //1.2.239+
        packet.write(1);
        packet.write(!success ? 1 : 0);

        return packet.getPacket();
    }

    /**
     * 운영자 채팅 색상 코드
     * <p>
     * <code>색상 코드</code>:<br>
     * 0 : 일반 채팅(흰색) 1 : 귓속말 채팅(초록색) 2 : 파티 채팅(분홍색) 3 : 친구 채팅(주황색) 4 : 길드
     * 채팅(보라색) 5 : (옅은 초록색) 6 : (약간 크고 진한 분홍색) 7 : (회색) 8 : (노란색) 9 : (연한 노란색)
     * 10 : (파란색) 11 : 운영자 채팅(흰색바탕에 검은색) 12 : (갈색) 13 : (옅은파란바탕에 파란색) 15 :
     * (빨간바탕에 검은색) 17 : (진보라색) 18 : (연한파란색바탕에 분홍색) 19 : (갈색바탕에 검은색) 20 : (갈색바탕에
     * 흰색) 21 : (노란색바탕에 검은색) 22 : (초록색바탕에 흰색) 23 : (초록색바탕에 갈색[W:-1]) 25 : (노란색)
     * 26 : (하늘색) 27 : (작은 글씨체)
     */
    public static byte[] getGMText(int type, String text) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_TEXT.getValue());
        packet.writeShort(type);
        packet.writeMapleAsciiString(text);
        return packet.getPacket();
    }

    /*
     * 추가로 매개변수가 필요하지 않은 이펙트 *
     *
     * 0x01 : 레벨업
     * 0x0A : RESIST
     * 0x0C : 포탈사운드
     * 0x0D : 직업변경
     * 0x12 : 몬스터북
     * 0x14 : 장비제작 (또는 대난투) 레벨업
     *
     */
    public static byte[] showSpecialEffect(int effect) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        packet.write(effect);

        return packet.getPacket();
    }

    public static byte[] showSpecialEffect(int cid, int effect) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        packet.writeInt(cid);
        packet.write(effect);

        return packet.getPacket();
    }

    public static byte[] updateSkill(MapleCharacter chr, final Map<ISkill, SkillEntry> update) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_SKILLS.getValue());
        packet.write(1);
        packet.writeShort(0);
        packet.writeShort(update.size());
        for (final Entry<ISkill, SkillEntry> skills : update.entrySet()) {
            packet.writeInt(skills.getKey().getId());
            packet.writeInt(skills.getValue().skillevel);
            packet.writeInt(skills.getValue().masterlevel);
            packet.writeLong(PacketProvider.getTime(skills.getValue().expiration));
        }
        packet.write(4); //1.2.251+

        return packet.getPacket();
    }

    public static byte[] updateProfessionSkill(int exp, int skillid, int level, int master) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_SKILLS.getValue());
        packet.write(0);
        packet.write(0);
        packet.write(0); // v203
        packet.writeShort(1);
        packet.writeInt(skillid);
        if (level == 0 && exp == 0) {
            packet.writeInt(-1); //Delete Skill
            packet.writeInt(0);
            packet.writeLong(PacketProvider.getTime(-2)); //zero Time
        } else if (exp != -1 && level != -1) {
            packet.writeShort(exp);
            packet.write(0);
            packet.write(level);
            packet.writeInt(master);
            packet.writeLong(PacketProvider.getTime(-1)); //max Time
        } else if (exp == 0 && level == 0) {
            packet.writeShort(exp);
            packet.write(0);
            packet.write(level);
            packet.writeInt(master);
            packet.writeLong(PacketProvider.getTime(-1)); //max Time
        } else {
            packet.writeInt(2147483647);
            packet.writeInt(0);
            packet.writeLong(PacketProvider.getTime(-1)); //max Time
        }
        packet.write(4);

        return packet.getPacket();
    }

    public static byte[] updateQuestMobKills(final MapleQuestStatus status) {
        final WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(1);
        packet.writeInt(status.getQuest().getId()); //1.2.251+
        packet.write(1);
        final StringBuilder sb = new StringBuilder();
        for (final int kills : status.getMobKills().values()) {
            sb.append(StringUtil.getLeftPaddedStr(String.valueOf(kills), '0', 3));
        }
        packet.writeMapleAsciiString(sb.toString());
        packet.write0(8);

        return packet.getPacket();
    }

    public static byte[] getShowQuestCompletion(int id) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_QUEST_COMPLETION.getValue());
        packet.writeInt(id); //1.2.251+

        return packet.getPacket();
    }

    public static byte[] getKeymap(MapleKeyLayout layout) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.KEYMAP.getValue());
        layout.writeData(packet);

        return packet.getPacket();
    }

    public static byte[] getPetAutoHP(int itemId) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PET_AUTO_HP.getValue());
        packet.writeInt(itemId);
        return packet.getPacket();
    }

    public static byte[] getPetAutoMP(int itemId) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PET_AUTO_MP.getValue());
        packet.writeInt(itemId);
        return packet.getPacket();
    }

    public static void addRingInfo(WritingPacket packet, List<MapleRing> rings) {
        packet.write(rings.size());
        for (MapleRing ring : rings) {
            packet.writeInt(1);
            packet.writeLong(ring.getRingId());
            packet.writeLong(ring.getPartnerRingId());
            packet.writeInt(ring.getItemId());
        }
    }

    public static void addMRingInfo(WritingPacket packet, List<MapleRing> rings, MapleCharacter chr) {
        packet.write(rings.size());
        for (MapleRing ring : rings) {
            packet.writeInt(1);
            packet.writeInt(chr.getId());
            packet.writeInt(ring.getPartnerChrId());
            packet.writeInt(ring.getItemId());
        }
    }

    public static byte[] getWhisper(String sender, int channel, String text) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.WHISPER.getValue());
        packet.write(0x12);
        packet.writeMapleAsciiString(sender);
        packet.writeShort(channel);
        packet.writeMapleAsciiString(text);

        return packet.getPacket();
    }

    public static byte[] getWhisperReply(String target, byte reply) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.WHISPER.getValue());
        packet.write(0x0A);
        packet.writeMapleAsciiString(target);
        packet.write(reply);//  0x0 = cannot find char, 0x1 = success

        return packet.getPacket();
    }

    public static byte[] getFindReply(String target, boolean friend, int channel) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.WHISPER.getValue());
        packet.write(friend ? 72 : 9);
        packet.writeMapleAsciiString(target);
        packet.write(3);
        packet.writeInt(channel);

        return packet.getPacket();
    }

    public static byte[] getFindReplyWithCS(String target, boolean friend) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.WHISPER.getValue());
        packet.write(friend ? 72 : 9);
        packet.writeMapleAsciiString(target);
        packet.write(2);
        packet.writeInt(-1);

        return packet.getPacket();
    }

    public static byte[] getFindReplyWithMap(String target, boolean friend, int mapid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.WHISPER.getValue());
        packet.write(friend ? 72 : 9);
        packet.writeMapleAsciiString(target);
        packet.write(1);
        packet.writeInt(mapid);
        packet.write0(8); // ?? official doesn't send zeros here but whatever

        return packet.getPacket();
    }

    public static byte[] getInventoryFull() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1);
        packet.write(0);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] getShowInventoryFull() {
        return getShowInventoryStatus(0xFF);
    }

    public static byte[] showItemUnavailable() {
        return getShowInventoryStatus(0xFE);
    }

    public static byte[] getShowInventoryStatus(int mode) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(0);
        packet.write(mode);
        packet.writeInt(0);
        packet.writeInt(0);

        return packet.getPacket();
    }

    /* 창고 패킷 시작 */
    public static byte[] getStorage(int npcId, byte slots, Collection<IItem> items, long meso) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        packet.write(0x16);
        packet.writeInt(npcId);
        packet.write(slots);
        packet.writeLong(0x7E);
        packet.writeLong(meso);
        packet.writeShort(0);
        packet.write((byte) items.size());
        for (IItem item : items) {
            PacketProvider.addItemInfo(packet, item, true, true, null);
        }
        packet.writeShort(0);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] getStorageFull() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        packet.write(0x11);

        return packet.getPacket();
    }

    public static byte[] mesoStorage(byte slots, long meso) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        packet.write(0x13);
        packet.write(slots);
        packet.writeShort(2);
        packet.writeShort(0);
        packet.writeInt(0);
        packet.writeLong(meso);

        return packet.getPacket();
    }

    public static byte[] storeStorage(byte slots, MapleInventoryType type, Collection<IItem> items) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        packet.write(0x0D);
        packet.write(slots);
        packet.writeShort(type.getBitfieldEncoding());
        packet.writeShort(0);
        packet.writeInt(0);
        packet.write(items.size());
        for (IItem item : items) {
            PacketProvider.addItemInfo(packet, item, true, true, null);
        }
        return packet.getPacket();
    }

    public static byte[] arrangeStorage(byte slots, Collection<IItem> items, boolean changed) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        packet.write(0x0F);
        packet.write(slots);
        packet.write(124);
        packet.write0(10);
        packet.write(items.size());
        for (IItem item : items) {
            PacketProvider.addItemInfo(packet, item, true, true, null);
        }
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] takeOutStorage(byte slots, MapleInventoryType type, Collection<IItem> items) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        packet.write(0x9);
        packet.write(slots);
        packet.writeShort(type.getBitfieldEncoding());
        packet.writeShort(0);
        packet.writeInt(0);
        packet.write(items.size());
        for (IItem item : items) {
            PacketProvider.addItemInfo(packet, item, true, true, null);
        }
        return packet.getPacket();
    }

    public static byte[] get2ndPWChecking(boolean incorrect) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OPEN_STORAGE.getValue());
        packet.write(0x15);
        packet.write(!incorrect ? 1 : 0);

        return packet.getPacket();
    }

    /* 창고 패킷 종료 */
    public static byte[] fairyPendantMessage(int type, int percent) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FAIRY_PEND_MSG.getValue());
        packet.writeShort(21); // 0x15
        packet.writeInt(0); // idk
        packet.writeShort(0); // idk
        packet.writeShort(percent); // percent
        packet.writeShort(0); // idk

        return packet.getPacket();
    }

    public static byte[] giveFameResponse(int mode, String charname, int newfame) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.FAME_RESPONSE.getValue());
        packet.write(0);
        packet.writeMapleAsciiString(charname);
        packet.write(mode);
        packet.writeInt(newfame); //Change Short -> Int

        return packet.getPacket();
    }

    public static byte[] giveFameErrorResponse(int status) {
        WritingPacket packet = new WritingPacket();

        /*	* 0: ok, use giveFameResponse<br>
         * 1: the username is incorrectly entered<br>
         * 2: users under level 15 are unable to toggle with fame.<br>
         * 3: can't raise or drop fame anymore today.<br>
         * 4: can't raise or drop fame for this character for this month anymore.<br>
         * 5: received fame, use receiveFame()<br>
         * 6: level of fame neither has been raised nor dropped due to an unexpected error*/
        packet.writeShort(SendPacketOpcode.FAME_RESPONSE.getValue());
        packet.write(status);

        return packet.getPacket();
    }

    public static byte[] receiveFame(int mode, String charnameFrom) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.FAME_RESPONSE.getValue());
        packet.write(5);
        packet.writeMapleAsciiString(charnameFrom);
        packet.write(mode);

        return packet.getPacket();
    }

    public static byte[] partyCreated(MapleParty party) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        packet.write(0x10); //1.2.220+ (+1)
        packet.writeInt(party.getId());
        packet.writeInt(party.getLeader().getDoorTown());
        packet.writeInt(party.getLeader().getDoorTarget());
        packet.write(0); //Unk
        packet.writeInt(party.getLeader().getDoorPosition().x);
        packet.writeInt(party.getLeader().getDoorPosition().y);
        packet.write(party.getVisible());
        packet.writeMapleAsciiString(party.getPatryTitle());

        return packet.getPacket();
    }

    public static byte[] partyInvite(MapleCharacter from) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        packet.write(0x4);
        packet.writeInt(from.getParty().getId());
        packet.writeMapleAsciiString(from.getName());
        packet.writeInt(from.getLevel());
        packet.writeInt(from.getJob());
        packet.writeInt(0);
        packet.write(0);
        packet.write(0); //1.2.220+

        return packet.getPacket();
    }

    public static byte[] partyStatusMessage(int message) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        packet.write(message);

        return packet.getPacket();
    }

    public static byte[] partyStatusMessage(int message, String charname) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        packet.write(message); // 23: 'Char' have denied request to the party.
        packet.writeMapleAsciiString(charname);

        return packet.getPacket();
    }

    private static void addPartyStatus(int forchannel, MapleParty party, WritingPacket packet, boolean leaving, boolean exped) {
        List<MaplePartyCharacter> partymembers = new ArrayList<MaplePartyCharacter>(party.getMembers());
        if (party == null) {
            partymembers = new ArrayList<>();
        } else {
            partymembers = new ArrayList<>(party.getMembers());
        }
        while (partymembers.size() < 6) {
            partymembers.add(new MaplePartyCharacter());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            packet.writeInt(partychar.getId());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            packet.writeAsciiString(StringUtil.getRightPaddedStr(partychar.getName(), '\0', 13));
        }
        for (MaplePartyCharacter partychar : partymembers) {
            packet.writeInt(partychar.getJobId());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.isOnline()) {
                packet.writeInt(1);
            } else {
                packet.writeInt(0);
            }
        }
        for (MaplePartyCharacter partychar : partymembers) {
            packet.writeInt(partychar.getLevel());
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.isOnline()) {
                packet.writeInt(partychar.getChannel());
            } else {
                packet.writeInt(-2);
            }
        }
        for (MaplePartyCharacter partychar : partymembers) {
            packet.writeInt(0);
        }
        packet.writeInt(party.getLeader().getId());
        if (exped) {
            return;
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.getChannel() == forchannel) {
                packet.writeInt(partychar.getMapid());
            } else {
                packet.writeInt(0);
            }
        }
        for (MaplePartyCharacter partychar : partymembers) {
            if (partychar.getChannel() == forchannel && !leaving) {
                packet.writeInt(partychar.getDoorTown());
                packet.writeInt(partychar.getDoorTarget());
                packet.writeInt(0);
                packet.writeInt(partychar.getDoorPosition().x);
                packet.writeInt(partychar.getDoorPosition().y);
            } else {
                packet.writeInt(leaving ? 999999999 : 0);
                packet.writeLong(leaving ? 999999999 : 0);
                packet.writeLong(leaving ? -1 : 0);
            }
        }
        packet.write(party.getVisible());
        packet.writeMapleAsciiString(party.getPatryTitle());
    }

    public static byte[] updateParty(int forChannel, MapleParty party, MaplePartyOperation op, MaplePartyCharacter target) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        switch (op) {
            case DISBAND:
            case EXPEL:
            case LEAVE:
                packet.write(0x15); //1.2.220+ (+1)
                packet.writeInt(party.getId());
                packet.writeInt(target.getId());
                if (op == MaplePartyOperation.DISBAND) {
                    packet.write(0);
                    packet.writeInt(target.getId());
                } else {
                    packet.write(1);
                    if (op == MaplePartyOperation.EXPEL) {
                        packet.write(1);
                    } else {
                        packet.write(0);
                    }
                    packet.writeMapleAsciiString(target.getName());
                    addPartyStatus(forChannel, party, packet, op == MaplePartyOperation.LEAVE, false);
                }
                break;
            case JOIN:
                packet.write(0x18); //1.2.220+ (+1)
                packet.writeInt(party.getId());
                packet.writeMapleAsciiString(target.getName());
                addPartyStatus(forChannel, party, packet, false, false);
                break;
            case SILENT_UPDATE:
            case LOG_ONOFF:
                packet.write(0x0F); //1.2.220+ (+1)
                packet.writeInt(party.getId());
                addPartyStatus(forChannel, party, packet, op == MaplePartyOperation.LOG_ONOFF, false);
                break;
            case CHANGE_LEADER:
                packet.write(0x30); //1.2.220+ (+1)
                packet.writeInt(target.getId());
                packet.write(0);
                break;
            case CHANGE_PARTY_TITLE:
                packet.write(0x4D); //1.2.220 New+
                packet.write(party.getVisible());
                packet.writeMapleAsciiString(party.getPatryTitle());
                packet.writeInt(target.getId());
                packet.writeInt(party.getId());
                packet.writeInt(1);
                packet.writeInt(1);
                packet.write(1);
                break;
        }
        return packet.getPacket();
    }

    public static byte[] partyPortal(int townId, int targetId, int skillId, Point position, boolean animation) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.PARTY_OPERATION.getValue());
        packet.write(0x4E); //1.2.220 (+1)
        packet.write(animation ? 0 : 1);
        packet.writeInt(townId);
        packet.writeInt(targetId);
        packet.writeInt(skillId);
        packet.writePos(position);

        return packet.getPacket();
    }

    public static byte[] updatePartyMemberHP(int cid, long curhp, int maxhp) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.UPDATE_PARTYMEMBER_HP.getValue());
        packet.writeInt(cid);
        packet.writeInt(curhp);
        packet.writeInt(maxhp);

        return packet.getPacket();
    }

    public static byte[] multiChat(String name, String chattext, int mode) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MULTICHAT.getValue());
        packet.write(mode); //  0 buddychat; 1 partychat; 2 guildchat
        packet.writeMapleAsciiString(name);
        packet.writeMapleAsciiString(chattext);

        return packet.getPacket();
    }

    public static byte[] getClock(int time) { // time in seconds
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CLOCK.getValue());
        packet.write(2); // clock type. if you send 3 here you have to send another byte (which does not matter at all) before the timestamp
        packet.writeInt(time);

        return packet.getPacket();
    }

    public static byte[] getClockTime(int hour, int min, int sec) { // Current Time
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CLOCK.getValue());
        packet.write(1); //Clock-Type
        packet.write(hour);
        packet.write(min);
        packet.write(sec);

        return packet.getPacket();
    }

    public static byte[] spawnClockMist(MapleMist clock) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_MIST.getValue());
        packet.writeInt(clock.getObjectId());
        packet.write(1);
        packet.writeInt(clock.getMobOwner().getObjectId());
        packet.writeInt(clock.getMobSkill().getSkillId());
        packet.write(clock.getClockType());
        packet.writeShort(7);
        packet.writeInt(clock.getBox().x);
        packet.writeInt(clock.getBox().y);
        packet.writeInt(clock.getBox().x + clock.getBox().width);
        packet.writeInt(clock.getBox().y + clock.getBox().height);
        packet.writeInt(0);
        packet.writePos(clock.getMobOwner().getPosition());
        packet.writeInt(0);
        packet.writeInt(clock.getClockType() == 2 ? -15 : clock.getClockType() == 1 ? 15 : 0);
        packet.writeInt(120);
        packet.writeInt(0);
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] spawnMist(final MapleMist mist) {

        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SPAWN_MIST.getValue());
        packet.writeInt(mist.getObjectId());
        packet.write(0);
        if (mist.getOwner() != null) {
            packet.writeInt(mist.getOwner().getId());
            packet.writeInt(mist.getSourceSkill().getId());
            packet.write(mist.getSkillLevel());
        } else {
            packet.writeInt(mist.getMobOwner().getId());
            packet.writeInt(mist.getMobSkill().getSkillId());
            packet.write(mist.getMobSkill().getSkillLevel());
        }
        packet.writeShort(mist.getSkillDelay());
        packet.writeInt(mist.getBox().x);
        packet.writeInt(mist.getBox().y);
        packet.writeInt(mist.getBox().x + mist.getBox().width);
        packet.writeInt(mist.getBox().y + mist.getBox().height);
        packet.writeInt(mist.isShelter() ? 2 : (mist.isBurningRegion() || mist.isTimeCapsule() || mist.getSourceSkill().getId() == 80001431 || mist.getSourceSkill().getId() == 24121052) ? 0 : mist.getSourceSkill().getId() == 33121012 || mist.getSourceSkill().getId() == 35121052 ? 3 : 1);
        if (mist.getTruePosition() != null) {
            packet.writePos(mist.getTruePosition());
        } else if (mist.getPosition() != null) {
            packet.writePos(mist.getPosition());
        } else if (mist.getOwner() != null) {
            packet.writePos(mist.getOwner().getPosition());
        } else {
            packet.writeInt(0);
        }
        packet.writeInt(0);//Force
        packet.writeInt(0);//dwOption
        packet.write(0);//PreUOL
        packet.writeInt(0);//Temp
        if (mist.getSourceSkill() != null) {
            if (GameConstants.is_flip_affected_area_skil(mist.getSourceSkill().getId())) {
                packet.write(mist.getOwner().getPosition().x < mist.getBox().x ? 1 : 0);
            }
        }
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] removeMist(final int oid, final boolean eruption) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.REMOVE_MIST.getValue());
        packet.writeInt(oid);
        packet.write(1); //1.2.181+

        return packet.getPacket();
    }

    public static byte[] damageSummon(int cid, int summonSkillId, int damage, int unkByte, int monsterIdFrom) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.DAMAGE_SUMMON.getValue());
        packet.writeInt(cid);
        packet.writeInt(summonSkillId);
        packet.write(unkByte);
        packet.writeInt(damage);
        packet.writeInt(monsterIdFrom);
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] buddylistMessage(byte message) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        packet.write(message);

        return packet.getPacket();
    }

    public static byte[] updateBuddylist(Collection<BuddylistEntry> buddylist, int deleted, int OtherCid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        if (deleted == 18) {
            packet.writeShort(0x2A); //1.2.239+ (+5)
            packet.writeInt(OtherCid);
        } else {
            packet.write(24); //1.2.239+ (+4)
            packet.writeInt(buddylist.size());
            for (BuddylistEntry buddy : buddylist) {
                packet.writeInt(buddy.getCharacterId());
                packet.writeAsciiString(StringUtil.getRightPaddedStr(buddy.getName(), '\0', 13));
                packet.write(0x7); //Unknown Packets.
                packet.writeInt(buddy.getChannel());
                packet.writeAsciiString(StringUtil.getRightPaddedStr(buddy.getGroup(), '\0', 18));
                packet.writeInt(buddy.getCharacterId()); //AccID Packets
                packet.writeAsciiString(StringUtil.getRightPaddedStr(buddy.getName(), '\0', 13)); //NICKNAME
                packet.write0(260); //메모 + 그룹
            }
        }
        return packet.getPacket();
    }

    public static byte[] requestBuddylistAdd(MapleClient c, int cidFrom, String nameFrom, int levelFrom, int jobFrom, boolean add) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        if (!add) {
            packet.write(0x1B);
            packet.write(0);
            packet.writeInt(cidFrom);
            packet.writeInt(0);
            packet.writeMapleAsciiString(nameFrom);
            packet.writeInt(levelFrom);
            packet.writeInt(jobFrom);
            packet.writeInt(0);
            packet.writeInt(cidFrom);
            packet.writeAsciiString(StringUtil.getRightPaddedStr(nameFrom, '\0', 13));
            packet.write(1);
            packet.writeInt(c.getChannel());
            packet.writeAsciiString("그룹 미지정", 18);
            packet.write0(280); //메모 + 그룹.
        } else {
            packet.write(0x28);
            packet.writeInt(cidFrom);
            packet.writeAsciiString(StringUtil.getRightPaddedStr(nameFrom, '\0', 13));
            packet.write(1);
            packet.writeInt(c.getChannel());
            packet.writeAsciiString("그룹 미지정", 18);
            packet.writeInt(0); //IP, 계정친구 등록.
            packet.writeAsciiString(" ", 13); //닉네임
            packet.writeAsciiString(" ", 270); //메모
        }
        return packet.getPacket();
    }

    public static byte[] updateBuddyChannel(int characterid, int channel, String nameFrom, boolean isVisible) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        packet.write(0x2C);
        packet.writeInt(characterid);
        packet.write0(5);
        packet.writeInt(channel);
        packet.write(isVisible ? 1 : 0);
        packet.write(1);
        packet.writeMapleAsciiString(nameFrom); //1.2.220+

        return packet.getPacket();
    }

    public static byte[] itemEffect(int characterid, int itemid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_ITEM_EFFECT.getValue());
        packet.writeInt(characterid);
        packet.writeInt(itemid);

        return packet.getPacket();
    }

    public static byte[] updateBuddyCapacity(int capacity) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.BUDDYLIST.getValue());
        packet.write(0x2E);
        packet.write(capacity);

        return packet.getPacket();
    }

    public static byte[] showChair(int characterid, int itemid, String chairtext) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_CHAIR.getValue());
        packet.writeInt(characterid);
        packet.writeInt(itemid);
        if (chairtext != null) {
            packet.writeInt(1);
            packet.writeMapleAsciiString(chairtext);
        } else {
            packet.writeInt(0);
        }
        packet.writeInt(0);
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] cancelChair(MapleCharacter chr, int id) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CANCEL_CHAIR.getValue());
        packet.writeInt(chr.getId()); //1.2.220+
        if (id == -1) {
            packet.write(0);
        } else {
            packet.write(1);
            packet.writeShort(id);
        }
        return packet.getPacket();
    }

    public static byte[] spawnReactor(MapleReactor reactor) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.REACTOR_SPAWN.getValue());
        packet.writeInt(reactor.getObjectId());
        packet.writeInt(reactor.getReactorId());
        packet.write(reactor.getState());
        packet.writePos(reactor.getPosition());
        packet.write(reactor.getFacingDirection()); // stance
        packet.writeShort(0);

        return packet.getPacket();
    }

    public static byte[] triggerReactor(MapleReactor reactor, int cid, int stance) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.REACTOR_HIT.getValue());
        packet.writeInt(reactor.getObjectId());
        packet.write(reactor.getState());
        packet.writePos(reactor.getPosition());
        packet.writeShort(stance);
        packet.write(0);
        packet.write(4);
        packet.writeInt(cid); //1.2.241+

        return packet.getPacket();
    }

    public static byte[] destroyReactor(MapleReactor reactor) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.REACTOR_DESTROY.getValue());
        packet.writeInt(reactor.getObjectId());
        packet.write(reactor.getState());
        packet.writePos(reactor.getPosition());

        return packet.getPacket();
    }

    public static byte[] musicChange(String song) {
        return environmentChange(song, 7); // +1 [v181]
    }

    public static byte[] showEffect(String effect) {
        return environmentChange(effect, 4); // +1 [v181]
    }

    public static byte[] playSound(String sound) {
        return environmentChange(sound, 5); // +1 [v181]
    }

    public static byte[] environmentChange(String env, int mode) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        packet.write(mode);
        packet.writeMapleAsciiString(env);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] startMapEffect(String msg, int itemid, boolean active) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MAP_EFFECT.getValue());
        packet.writeInt(itemid);
        packet.writeMapleAsciiString(msg);
        packet.writeShort(!active ? 1 : 0); //1.2.239+

        return packet.getPacket();
    }

    public static byte[] removeMapEffect() {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MAP_EFFECT.getValue());
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] startMapEffectTime(String msg, int id, int time) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MAP_EFFECT_TIME.getValue());
        packet.writeMapleAsciiString(msg);
        packet.writeInt(id);
        packet.writeInt(time);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] createGuildInfo(MapleCharacter c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x38);

        MapleGuildCharacter initiator = c.getMGC();
        MapleGuild g = c.getClient().getChannelServer().getGuild(initiator);
        if (g == null) { //failed to read from DB - don't show a guild
            packet.write(0);
            return packet.getPacket();
        } else {
            //MapleGuild holds the absolute correct value of guild rank after it is initiated
            MapleGuildCharacter mgc = g.getMGC(c.getId());
            c.setGuildRank(mgc.getGuildRank());
        }
        packet.writeInt(c.getGuildId()); //not entirely sure about this one
        packet.writeMapleAsciiString(g.getName());
        for (int i = 1; i <= 5; i++) {
            packet.writeMapleAsciiString(g.getRankTitle(i));
        }
        g.addMemberData(packet);
        packet.writeInt(g.getCapacity());
        packet.writeShort(g.getLogoBG());
        packet.write(g.getLogoBGColor());
        packet.writeShort(g.getLogo());
        packet.write(g.getLogoColor());
        packet.writeMapleAsciiString(g.getNotice());
        packet.writeInt(500); //명성치
        packet.writeInt(500); //명성치
        packet.writeInt(g.getAllianceId());
        packet.write(1); // GuildLevel
        packet.writeShort(1); // GuildRank
        packet.writeShort(g.getGP()); // GuildPoint
        packet.write0(5); // 1.2.203+

        return packet.getPacket();
    }

    public static byte[] showGuildInfo(MapleCharacter c) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x31);
        packet.write(0);
        if (c == null) { //failed to read from DB - don't show a guild
            packet.write(0);
            return packet.getPacket();
        } else {
            packet.write(1);
            MapleGuildCharacter initiator = c.getMGC();
            MapleGuild g = c.getClient().getChannelServer().getGuild(initiator);
            MapleGuildCharacter mgc = g.getMGC(c.getId());
            c.setGuildRank(mgc.getGuildRank());
            packet.writeInt(c.getGuildId());
            packet.writeMapleAsciiString(g.getName());
            for (int i = 1; i <= 5; i++) {
                packet.writeMapleAsciiString(g.getRankTitle(i));
            }
            g.addMemberData(packet);
            packet.writeInt(g.getCapacity());
            packet.writeShort(g.getLogoBG());
            packet.write(g.getLogoBGColor());
            packet.writeShort(g.getLogo());
            packet.write(g.getLogoColor());
            packet.writeMapleAsciiString(g.getNotice());
            packet.writeInt(500); // 명성치
            packet.writeInt(500); // 명성치
            packet.writeInt(g.getAllianceId());
            packet.write(1); // GuildLevel
            packet.writeShort(c.getMGC().getGuildRank()); // GuildRank
            packet.writeInt(g.getGP()); // GuildPoint
            packet.writeShort(g.getSkills().size());
            for (GuildSkills i : g.getSkills()) {
                packet.writeInt(i.skillID);
                packet.writeShort(i.level);
                packet.writeLong(PacketProvider.getTime(i.timestamp));
                packet.writeMapleAsciiString(i.purchaser);
                packet.writeMapleAsciiString(i.activator);
            }
            packet.write(0);
            packet.write0(106); //이외의 값들.
        }
        return packet.getPacket();
    }

    public static byte[] guildLeaderChanged(int gid, int oldLeader, int newLeader, int allianceId) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x79); //1.2.251+ (+1)
        packet.writeInt(gid);
        packet.writeInt(oldLeader);
        packet.writeInt(newLeader);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] guildSkillPurchased(int gid, int sid, int level, long expiration, String purchase, String activate) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x73); //1.2.251+ (+1)
        packet.writeInt(gid);
        packet.writeInt(sid);
        packet.writeInt(0);
        packet.writeShort(level);
        packet.writeLong(PacketProvider.getTime(expiration));
        packet.writeMapleAsciiString(purchase);
        packet.writeMapleAsciiString(activate);

        return packet.getPacket();
    }

    public static byte[] guildMemberOnline(int gid, int cid, boolean bOnline) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x5F); //1.2.251+ (+1)  
        packet.writeInt(gid);
        packet.writeInt(cid);
        packet.writeShort(bOnline ? 0x101 : 0); //ON : 01 01, OFF : 00 00

        return packet.getPacket();
    }

    public static byte[] guildInvite(int gid, String charName, int levelFrom, int jobFrom, int cidFrom) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x07);
        packet.writeInt(gid);
        packet.writeMapleAsciiString(charName);
        packet.writeInt(levelFrom);
        packet.writeInt(jobFrom);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] guildLevel(int gid, int exp, int level) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x68);
        packet.writeInt(gid);
        packet.writeInt(exp);
        packet.writeInt(level);

        return packet.getPacket();
    }

    public static byte[] denyGuildInvitation(String charname) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x3E);
        packet.writeMapleAsciiString(charname);

        return packet.getPacket();
    }

    public static byte[] genericGuildMessage(byte code) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(code);

        return packet.getPacket();
    }

    public static byte[] newGuildMember(MapleGuildCharacter mgc) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x47);
        packet.writeInt(mgc.getGuildId());
        packet.writeInt(mgc.getId());
        packet.writeAsciiString(StringUtil.getRightPaddedStr(mgc.getName(), '\0', 13));
        packet.writeInt(mgc.getJobId());
        packet.writeInt(mgc.getLevel());
        packet.writeInt(mgc.getGuildRank()); //should be always 5 but whatevs
        packet.writeInt(mgc.isOnline() ? 1 : 0); //should always be 1 too
        packet.writeInt(3);
        packet.writeInt(0); //v192
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeLong(PacketProvider.getTime(-2));

        return packet.getPacket();
    }

    public static byte[] memberLeft(MapleGuildCharacter mgc, boolean bExpelled) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(bExpelled ? 0x4E : 0x4B);
        packet.writeInt(mgc.getGuildId());
        packet.writeInt(mgc.getId());
        packet.writeMapleAsciiString(mgc.getName());

        return packet.getPacket();
    }

    public static byte[] changeRank(MapleGuildCharacter mgc) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x62); //1.2.251+ (+1)
        packet.writeInt(mgc.getGuildId());
        packet.writeInt(mgc.getId());
        packet.write(mgc.getGuildRank());

        return packet.getPacket();
    }

    public static byte[] guildNotice(int gid, String notice) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x64); //1.2.251+ (+1) 
        packet.writeInt(gid);
        packet.writeMapleAsciiString(notice);

        return packet.getPacket();
    }

    public static byte[] guildMemberLevelJobUpdate(MapleGuildCharacter mgc) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x5E); //1.2.251+ (+1)
        packet.writeInt(mgc.getGuildId());
        packet.writeInt(mgc.getId());
        packet.writeInt(mgc.getLevel());
        packet.writeInt(mgc.getJobId());

        return packet.getPacket();
    }

    public static byte[] rankTitleChange(int gid, String[] ranks) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x60); //1.2.251+ (+1) 
        packet.writeInt(gid);
        for (String r : ranks) {
            packet.writeMapleAsciiString(r);
        }
        return packet.getPacket();
    }

    public static byte[] guildDisband(int gid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x51); //1.2.251+ (+1)
        packet.writeInt(gid);

        return packet.getPacket();
    }

    public static byte[] guildEmblemChange(int gid, short bg, byte bgcolor, short logo, byte logocolor) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x65); //1.2.251+ (+1)
        packet.writeInt(gid);
        packet.writeShort(bg);
        packet.write(bgcolor);
        packet.writeShort(logo);
        packet.write(logocolor);

        return packet.getPacket();
    }

    public static byte[] guildCapacityChange(int gid, int capacity) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x5A); //1.2.251+ (+1)
        packet.writeInt(gid);
        packet.write(capacity);

        return packet.getPacket();
    }

    public static byte[] removeGuildFromAlliance(MapleAlliance alliance, MapleGuild expelledGuild, boolean expelled) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x10);
        addAllianceInfo(packet, alliance);
        packet.writeInt(expelledGuild.getId());
        packet.writeMapleAsciiString(expelledGuild.getName());
        for (int a = 1; a <= 5; a++) {
            packet.writeMapleAsciiString(expelledGuild.getRankTitle(a));
        }
        expelledGuild.addMemberData(packet);

        packet.writeInt(expelledGuild.getCapacity());
        packet.writeShort(expelledGuild.getLogoBG());
        packet.write(expelledGuild.getLogoBGColor());
        packet.writeShort(expelledGuild.getLogo());
        packet.write(expelledGuild.getLogoColor());
        packet.writeMapleAsciiString(expelledGuild.getNotice());
        packet.writeInt(expelledGuild.getGP());
        packet.writeInt(expelledGuild.getGP());
        packet.writeInt(expelledGuild.getAllianceId());
        packet.write(6); //길드레벨
        packet.writeShort(0); // guild rank 
        packet.writeShort(expelledGuild.getSkills().size());
        for (GuildSkills sk : expelledGuild.getSkills()) {
            packet.writeInt(sk.skillID);
            packet.writeShort(sk.level);
            packet.writeLong(PacketProvider.getTime(sk.timestamp));
            packet.writeMapleAsciiString(sk.purchaser);
            packet.writeMapleAsciiString(sk.activator);
        }
        packet.write(expelled ? 1 : 0); //1 = expelled, 0 = left
        return packet.getPacket();
    }

    public static byte[] disbandAlliance(int alliance) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x1D);
        packet.writeInt(alliance);

        return packet.getPacket();
    }

    public static byte[] addGuildToAlliance(MapleAlliance alliance, MapleGuild newGuild) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x12);
        addAllianceInfo(packet, alliance);
        packet.writeInt(newGuild.getId()); //???
        packet.writeInt(newGuild.getId());
        packet.writeMapleAsciiString(newGuild.getName());
        for (int a = 1; a <= 5; a++) {
            packet.writeMapleAsciiString(newGuild.getRankTitle(a));
        }
        newGuild.addMemberData(packet);

        packet.writeInt(newGuild.getCapacity());
        packet.writeShort(newGuild.getLogoBG());
        packet.write(newGuild.getLogoBGColor());
        packet.writeShort(newGuild.getLogo());
        packet.write(newGuild.getLogoColor());
        packet.writeMapleAsciiString(newGuild.getNotice());
        packet.writeInt(newGuild.getGP());
        packet.writeInt(newGuild.getGP());
        packet.writeInt(newGuild.getAllianceId());
        packet.write(6); //길드레벨
        packet.writeShort(0); // guild rank 
        packet.writeShort(newGuild.getSkills().size());
        for (GuildSkills sk : newGuild.getSkills()) {
            packet.writeInt(sk.skillID);
            packet.writeShort(sk.level);
            packet.writeLong(PacketProvider.getTime(sk.timestamp));
            packet.writeMapleAsciiString(sk.purchaser);
            packet.writeMapleAsciiString(sk.activator);
        }
        packet.write(0); //???
        return packet.getPacket();
    }

    private static void addAllianceInfo(WritingPacket packet, MapleAlliance alliance) {
        packet.writeInt(alliance.getId());
        packet.writeMapleAsciiString(alliance.getName());
        for (int i = 1; i <= 5; i++) {
            packet.writeMapleAsciiString(alliance.getRank(i));
        }

        packet.write(alliance.getNoGuilds());
        for (int i = 0; i < alliance.getNoGuilds(); i++) {
            packet.writeInt(alliance.getGuildId(i));
        }
        packet.writeInt(alliance.getCapacity()); // ????
        packet.writeMapleAsciiString(alliance.getNotice());
    }

    public static byte[] getAllianceInfo(MapleAlliance alliance) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x0C);
        packet.write(alliance == null ? 0 : 1); //in an alliance
        if (alliance != null) {
            addAllianceInfo(packet, alliance);
        }
        return packet.getPacket();
    }

    public static byte[] changeAlliance(MapleAlliance alliance, final boolean in) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x01);
        packet.write(in ? 1 : 0);
        packet.writeInt(in ? alliance.getId() : 0);
        final int noGuilds = alliance.getNoGuilds();
        MapleGuild[] g = new MapleGuild[noGuilds];
        for (int i = 0; i < noGuilds; i++) {
            g[i] = ChannelServer.getGuild(alliance.getGuildId(i));
            if (g[i] == null) {
                return resetActions();
            }
        }
        packet.write(noGuilds);
        for (int i = 0; i < noGuilds; i++) {
            packet.writeInt(g[i].getId());
            //must be world
            Collection<MapleGuildCharacter> members = g[i].getMembers();
            packet.writeInt(members.size());
            for (MapleGuildCharacter mgc : members) {
                packet.writeInt(mgc.getId());
                packet.write(in ? mgc.getAllianceRank() : 0);
            }
        }
        return packet.getPacket();
    }

    public static byte[] changeAllianceLeader(int allianceid, int newLeader, int oldLeader) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x02);
        packet.writeInt(allianceid);
        packet.writeInt(oldLeader);
        packet.writeInt(newLeader);
        return packet.getPacket();
    }

    public static byte[] allianceMemberOnline(int alliance, int gid, int id, boolean online) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x0E);
        packet.writeInt(alliance);
        packet.writeInt(gid);
        packet.writeInt(id);
        packet.write(online ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] updateAlliance(MapleGuildCharacter mgc, int allianceid) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x18);
        packet.writeInt(allianceid);
        packet.writeInt(mgc.getGuildId());
        packet.writeInt(mgc.getId());
        packet.writeInt(mgc.getLevel());
        packet.writeInt(mgc.getJobId());

        return packet.getPacket();
    }

    public static byte[] updateAllianceRank(int allianceid, MapleGuildCharacter mgc) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x1B);
        packet.writeInt(allianceid);
        packet.writeInt(mgc.getId());
        packet.writeInt(mgc.getAllianceRank());

        return packet.getPacket();
    }

    public static byte[] updateAllianceLeader(int allianceid, int newLeader, int oldLeader) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x19);
        packet.writeInt(allianceid);
        packet.writeInt(oldLeader);
        packet.writeInt(newLeader);
        return packet.getPacket();
    }

    public static byte[] sendAllianceInvite(String allianceName, MapleCharacter inviter) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x03);
        packet.writeInt(inviter.getGuildId());
        packet.writeMapleAsciiString(inviter.getName());
        //alliance invite did NOT change
        packet.writeMapleAsciiString(allianceName);
        return packet.getPacket();
    }

    public static byte[] changeGuildInAlliance(MapleAlliance alliance, MapleGuild guild, final boolean add) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x04);
        packet.writeInt(add ? alliance.getId() : 0);
        packet.writeInt(guild.getId());
        Collection<MapleGuildCharacter> members = guild.getMembers();
        packet.writeInt(members.size());
        for (MapleGuildCharacter mgc : members) {
            packet.writeInt(mgc.getId());
            packet.write(add ? mgc.getAllianceRank() : 0);
        }
        return packet.getPacket();
    }

    public static byte[] changeAllianceRank(int allianceid, MapleGuildCharacter player) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x05);
        packet.writeInt(allianceid);
        packet.writeInt(player.getId());
        packet.writeInt(player.getAllianceRank());
        return packet.getPacket();
    }

    public static byte[] createGuildAlliance(MapleAlliance alliance) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x0F);
        addAllianceInfo(packet, alliance);
        final int noGuilds = alliance.getNoGuilds();
        MapleGuild[] g = new MapleGuild[noGuilds];
        for (int i = 0; i < alliance.getNoGuilds(); i++) {
            g[i] = ChannelServer.getGuild(alliance.getGuildId(i));
            if (g[i] == null) {
                return resetActions();
            }
        }
        for (MapleGuild gg : g) {
            if (gg != null) {
                packet.writeInt(gg.getId());
                packet.writeMapleAsciiString(gg.getName());
                for (int a = 1; a <= 5; a++) {
                    packet.writeMapleAsciiString(gg.getRankTitle(a));
                }
                gg.addMemberData(packet);

                packet.writeInt(gg.getCapacity());
                packet.writeShort(gg.getLogoBG());
                packet.write(gg.getLogoBGColor());
                packet.writeShort(gg.getLogo());
                packet.write(gg.getLogoColor());
                packet.writeMapleAsciiString(gg.getNotice());
                packet.writeInt(gg.getGP());
                packet.writeInt(gg.getGP());
                packet.writeInt(gg.getAllianceId());
                packet.write(6); //길드레벨
                packet.writeShort(0); // guild rank 
                packet.writeShort(gg.getSkills().size());
                for (GuildSkills sk : gg.getSkills()) {
                    packet.writeInt(sk.skillID);
                    packet.writeShort(sk.level);
                    packet.writeLong(PacketProvider.getTime(sk.timestamp));
                    packet.writeMapleAsciiString(sk.purchaser);
                    packet.writeMapleAsciiString(sk.activator);
                }
            }
        }
        return packet.getPacket();
    }

    public static byte[] getAllianceUpdate(MapleAlliance alliance) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x17);
        addAllianceInfo(packet, alliance);
        return packet.getPacket();
    }

    public static byte[] getGuildAlliance(MapleAlliance alliance) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ALLIANCE_OPERATION.getValue());
        packet.write(0x0D);

        final int noGuilds = alliance.getNoGuilds();
        MapleGuild[] g = new MapleGuild[noGuilds];
        for (int i = 0; i < alliance.getNoGuilds(); i++) {
            g[i] = ChannelServer.getGuild(alliance.getGuildId(i));
            if (g[i] == null) {
                return resetActions();
            }
        }
        packet.writeInt(noGuilds);//ammount of guilds joined
        for (MapleGuild gg : g) {
            if (gg != null) {
                packet.writeInt(gg.getId());
                packet.writeMapleAsciiString(gg.getName());
                for (int a = 1; a <= 5; a++) {
                    packet.writeMapleAsciiString(gg.getRankTitle(a));
                }
                gg.addMemberData(packet);

                packet.writeInt(gg.getCapacity());
                packet.writeShort(gg.getLogoBG());
                packet.write(gg.getLogoBGColor());
                packet.writeShort(gg.getLogo());
                packet.write(gg.getLogoColor());
                packet.writeMapleAsciiString(gg.getNotice());
                packet.writeInt(gg.getGP());
                packet.writeInt(gg.getGP());
                packet.writeInt(gg.getAllianceId());
                packet.write(6); //길드레벨
                packet.writeShort(0); // guild rank 
                packet.writeShort(gg.getSkills().size());
                for (GuildSkills sk : gg.getSkills()) {
                    packet.writeInt(sk.skillID);
                    packet.writeShort(sk.level);
                    packet.writeLong(PacketProvider.getTime(sk.timestamp));
                    packet.writeMapleAsciiString(sk.purchaser);
                    packet.writeMapleAsciiString(sk.activator);
                }
            }
        }
        return packet.getPacket();
    }

    public static byte[] BBSThreadList(ResultSet rs, int start) throws SQLException {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.BBS_OPERATION.getValue());
        packet.write(6);

        int threadCount = rs.getRow();

        if (!rs.last()) {
            packet.write(0);
        } else if (rs.getInt("localthreadid") == 0) { //has a notice
            packet.write(1);
            addThread(packet, rs);
            threadCount--; //one thread didn't count (because it's a notice)
        } else {
            packet.write(0);
        }
        if (!rs.absolute(start + 1)) { //seek to the thread before where we start
            rs.first(); //uh, we're trying to start at a place past possible
            start = 0;
        }
        packet.writeInt(threadCount);
        packet.writeInt(Math.min(10, threadCount - start));

        for (int i = 0; i < Math.min(10, threadCount - start); i++) {
            addThread(packet, rs);
            rs.next();
        }
        return packet.getPacket();
    }

    private static void addThread(WritingPacket packet, ResultSet rs) throws SQLException {
        packet.writeInt(rs.getInt("localthreadid"));
        packet.writeInt(rs.getInt("postercid"));
        packet.writeMapleAsciiString(rs.getString("name"));
        packet.writeLong(PacketProvider.getKoreanTimestamp(rs.getLong("timestamp")));
        packet.writeInt(rs.getInt("icon"));
        packet.writeInt(rs.getInt("replycount"));
    }

    public static byte[] showThread(int localthreadid, ResultSet threadRS, ResultSet repliesRS) throws SQLException, RuntimeException {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.BBS_OPERATION.getValue());
        packet.write(7);

        packet.writeInt(localthreadid);
        packet.writeInt(threadRS.getInt("postercid"));
        packet.writeLong(PacketProvider.getKoreanTimestamp(threadRS.getLong("timestamp")));
        packet.writeMapleAsciiString(threadRS.getString("name"));
        packet.writeMapleAsciiString(threadRS.getString("startpost"));
        packet.writeInt(threadRS.getInt("icon"));

        if (repliesRS != null) {
            int replyCount = threadRS.getInt("replycount");
            packet.writeInt(replyCount);

            int i;
            for (i = 0; i < replyCount && repliesRS.next(); i++) {
                packet.writeInt(repliesRS.getInt("replyid"));
                packet.writeInt(repliesRS.getInt("postercid"));
                packet.writeLong(PacketProvider.getKoreanTimestamp(repliesRS.getLong("timestamp")));
                packet.writeMapleAsciiString(repliesRS.getString("content"));
            }
            if (i != replyCount || repliesRS.next()) {
                //in the unlikely event that we lost count of replyid
                throw new RuntimeException(String.valueOf(threadRS.getInt("threadid")));
                //we need to fix the database and stop the packet sending
                //or else it'll probably error 38 whoever tries to read it
                //there is ONE case not checked, and that's when the thread
                //has a replycount of 0 and there is one or more replies to the
                //thread in bbs_replies
            }
        } else {
            packet.writeInt(0); //0 replies
        }
        return packet.getPacket();
    }

    public static byte[] showGuildRanks(int npcid, List<GuildRankingInfo> all) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x49);
        packet.writeInt(npcid);
        packet.writeInt(all.size());

        for (GuildRankingInfo info : all) {
            packet.writeMapleAsciiString(info.getName());
            packet.writeInt(info.getGP());
            packet.writeInt(info.getLogo());
            packet.writeInt(info.getLogoBg());
            packet.writeInt(info.getLogoBgColor());
            packet.writeInt(info.getLogoColor());
        }

        return packet.getPacket();
    }

    public static byte[] updateGP(int gid, int GP) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.GUILD_OPERATION.getValue());
        packet.write(0x48);
        packet.writeInt(gid);
        packet.writeInt(GP);

        return packet.getPacket();
    }

    public static byte[] skillEffect(MapleCharacter from, SkillEffectEntry entry, final Point pos) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SKILL_EFFECT.getValue());
        packet.writeInt(from.getId());
        packet.writeInt(entry.getSkillId());
        packet.write(entry.getLevel());
        packet.write(entry.getFlags());
        packet.write(entry.getSpeed());
        packet.write(entry.getUnk()); // Direction ??
        if (entry.getSkillId() == 13111020) {
            packet.writePos(pos); // Position
        }
        return packet.getPacket();
    }

    public static byte[] skillCancel(MapleCharacter from, int skillId) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.CANCEL_SKILL_EFFECT.getValue());
        packet.writeInt(from.getId());
        packet.writeInt(skillId);

        return packet.getPacket();
    }

    public static byte[] showMagnet(int mobid, byte success) { // Monster Magnet
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_MAGNET.getValue());
        packet.writeInt(mobid);
        packet.write(success);

        return packet.getPacket();
    }

    public static byte[] sendHint(String hint, int width, int height) {
        WritingPacket packet = new WritingPacket();
        if (width < 1) {
            width = hint.length() * 10;
            if (width < 40) {
                width = 40;
            }
        }
        if (height < 5) {
            height = 5;
        }
        packet.writeShort(SendPacketOpcode.PLAYER_HINT.getValue());
        packet.writeMapleAsciiString(hint);
        packet.writeShort(width);
        packet.writeShort(height);
        packet.write(1);

        return packet.getPacket();
    }

    public static byte[] messengerInvite(String from, int messengerid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MESSENGER.getValue());
        packet.write(0x03);
        packet.writeMapleAsciiString(from);
        packet.write(0x10);
        packet.writeInt(messengerid);
        packet.write(0x00);

        return packet.getPacket();
    }

    public static byte[] addMessengerPlayer(String from, MapleCharacter chr, int position, int channel) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MESSENGER.getValue());
        packet.write(0);
        packet.write(position);
        PacketProvider.addPlayerLooks(packet, chr, true);
        packet.writeMapleAsciiString(from);
        packet.write(channel);
        packet.write(position);
        packet.writeShort(chr.getJob());
        packet.writeShort(0);

        return packet.getPacket();
    }

    public static byte[] removeMessengerPlayer(int position) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MESSENGER.getValue());
        packet.write(0x02);
        packet.write(position);

        return packet.getPacket();
    }

    public static byte[] updateMessengerPlayer(String from, MapleCharacter chr, int position, int channel) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MESSENGER.getValue());
        packet.write(0x08);
        packet.write(1);
        packet.write(position);
        PacketProvider.addPlayerLooks(packet, chr, true);
        packet.writeMapleAsciiString(from);
        packet.write(channel);
        packet.write(0x00);

        return packet.getPacket();
    }

    public static byte[] joinMessenger(int position) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MESSENGER.getValue());
        packet.write(0x01);
        packet.write(position);

        return packet.getPacket();
    }

    public static byte[] messengerChat(String from, String text) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MESSENGER.getValue());
        packet.write(0x06);
        packet.writeMapleAsciiString(from);
        packet.writeMapleAsciiString(text);

        return packet.getPacket();
    }

    public static byte[] messengerNote(String text, int mode, int mode2) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MESSENGER.getValue());
        packet.write(mode);
        packet.writeMapleAsciiString(text);
        packet.write(mode2);

        return packet.getPacket();
    }

    public static byte[] showEquipEffect(byte team) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_EQUIP_EFFECT.getValue());
        packet.writeShort(team);

        return packet.getPacket();
    }

    public static byte[] summonSkill(int cid, int summonSkillId, int newStance) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SUMMON_SKILL.getValue());
        packet.writeInt(cid);
        packet.writeInt(summonSkillId);
        packet.write(newStance);

        return packet.getPacket();
    }

    public static byte[] skillCooldown(int sid, int time, boolean isNoCoolBuff, boolean isRune, final boolean isGM) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.COOLDOWN.getValue());
        if (isNoCoolBuff) {
            return serverNotice(5, "");
        }
        if (isGM) { // 치우씨 :: GM 쿨타입 스킵 credit 송민우
            return serverNotice(5, "");
        }
        if (isRune) {
            packet.writeInt(1);
            packet.writeInt(sid);
            packet.writeInt(5);
            return packet.getPacket();
        }
        packet.writeInt(1); //1.2.239+, Activated.
        packet.writeInt(sid);
        packet.writeInt(time);
        return packet.getPacket();
    }

    public static byte[] skillCooldown(int sid, int time, final boolean isGM) {
        WritingPacket packet = new WritingPacket();
        if (isGM) { // 치우씨 :: GM 쿨타입 스킵 credit 송민우
            return serverNotice(5, "");
        }
        packet.writeShort(SendPacketOpcode.COOLDOWN.getValue());
        packet.writeInt(1); //1.2.239+, Activated.
        packet.writeInt(sid);
        packet.writeInt(time);
        return packet.getPacket();
    }

    public static byte[] useSkillBook(MapleCharacter chr, int skillid, int maxlevel, boolean canuse, boolean success) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.USE_SKILL_BOOK.getValue());
        packet.writeInt(chr.getId());
        packet.write(1);
        packet.writeInt(skillid);
        packet.writeInt(maxlevel);
        packet.write(canuse ? 1 : 0);
        packet.write(success ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] getMacros(SkillMacro[] macros) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SKILL_MACRO.getValue());
        int count = 0;
        for (int i = 0; i < 5; i++) {
            if (macros[i] != null) {
                count++;
            }
        }
        packet.write(count); // number of macros
        for (int i = 0; i < 5; i++) {
            SkillMacro macro = macros[i];
            if (macro != null) {
                packet.writeMapleAsciiString(macro.getName());
                packet.write(macro.getShout());
                packet.writeInt(macro.getSkill1());
                packet.writeInt(macro.getSkill2());
                packet.writeInt(macro.getSkill3());
            }
        }
        return packet.getPacket();
    }

    public static byte[] catchMonster(int mobid, byte success) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CATCH_MONSTER.getValue());
        packet.writeInt(mobid);
        packet.write(success);
        packet.write(success);

        return packet.getPacket();
    }

    public static byte[] giveSunfireBuff(List<Triple<BuffStats, Integer, Boolean>> statups, int gauge, int bufflength) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (!statup.getThird()) {
                packet.writeShort(statup.getSecond().shortValue());
                packet.writeInt(20040216);
                packet.writeInt(bufflength);
            }
        }
        addSunfireGaugeInfo(packet, gauge, bufflength);
        return packet.getPacket();
    }

    public static byte[] giveEclipseBuff(List<Triple<BuffStats, Integer, Boolean>> statups, int gauge, int bufflength) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeBuffMask(packet, statups);
        for (Triple<BuffStats, Integer, Boolean> statup : statups) {
            if (!statup.getThird()) {
                packet.writeShort(statup.getSecond().shortValue());
                packet.writeInt(20040217);
                packet.writeInt(bufflength);
            }
        }
        addEclipseGaugeInfo(packet, gauge, bufflength);
        return packet.getPacket();
    }

    public static byte[] giveEquilibriumBuff(int equilibrium, int skill_1, int skill_2) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_Larkness);
        addEquilibriumGaugeInfo(packet, equilibrium, skill_1, skill_2);

        return packet.getPacket();
    }

    private static void addSunfireGaugeInfo(WritingPacket packet, int gauge, int bufflength) {
        packet.write0(5);
        packet.writeInt(20040216);
        packet.writeInt(bufflength);
        packet.writeLong(0);
        packet.writeInt(Math.min(gauge, 10000));
        packet.writeInt(-1);
        packet.writeLong(0);
        packet.write(1);
        packet.writeInt(0);
    }

    private static void addEclipseGaugeInfo(WritingPacket packet, int gauge, int bufflength) {
        packet.write0(5);
        packet.writeInt(20040217);
        packet.writeInt(bufflength);
        packet.writeLong(0);
        packet.writeInt(Math.max(gauge, -1));
        packet.writeInt(10000);
        packet.writeLong(0);
        packet.write(1);
        packet.writeInt(0);
    }

    private static void addEquilibriumGaugeInfo(final WritingPacket packet, int equilibrium, int skill_1, int skill_2) {
        packet.writeShort(2);
        packet.writeInt(equilibrium);
        packet.writeInt(10000);
        packet.write0(5);
        packet.writeInt(skill_1);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(skill_2);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(-1);
        packet.writeInt(10000);
        packet.writeLong(0);
        packet.writeInt(1);
        packet.write(0);
        packet.writeLong(0);
        packet.writeLong(0);
    }

    public static byte[] checkSunfireSkill(int gauge) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.LUMINOUS_MORPH.getValue());
        packet.writeInt(Math.min(gauge, 9999));
        packet.write(gauge <= 1 ? 1 : 2);

        return packet.getPacket();
    }

    public static byte[] checkEclipseSkill(int gauge) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.LUMINOUS_MORPH.getValue());
        packet.writeInt(Math.min(gauge, 9999));
        packet.write(gauge >= 9999 ? 2 : 1);

        return packet.getPacket();
    }

    public static byte[] spawnDragon(MapleDragon d) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.DRAGON_SPAWN.getValue());
        packet.writeInt(d.getOwner());
        packet.writeInt(d.getPosition().x);
        packet.writeInt(d.getPosition().y);
        packet.write(d.getStance()); //stance?
        packet.writeShort(0);
        packet.writeShort(d.getJobId());

        return packet.getPacket();
    }

    public static byte[] removeDragon(int chrid) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.DRAGON_REMOVE.getValue());
        packet.writeInt(chrid);

        return packet.getPacket();
    }

    public static byte[] moveDragon(MapleDragon d, Point startPos, List<LifeMovementFragment> moves) {
        final WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.DRAGON_MOVE.getValue()); //not sure
        packet.writeInt(d.getOwner());
        packet.writeInt(0); //192+
        packet.writePos(startPos);
        packet.writeInt(0);
        PacketProvider.serializeMovementList(packet, moves);

        return packet.getPacket();
    }

    public static byte[] updateEquipSlot(IItem item) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1);
        packet.write(2);
        packet.write(0);
        packet.write(3);
        packet.write(1);
        packet.writeShort(item.getPosition());
        packet.write(0);
        packet.write(item.getType());
        packet.writeShort(item.getPosition());
        PacketProvider.addItemInfo(packet, item, true, true, null);
        if (item.getPosition() < 0) {
            packet.write(2);
        }
        return packet.getPacket();
    }

    public static byte[] updateStarForceEquipSlot(IItem item) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(1);
        packet.write(2);
        packet.write(0);
        packet.write(3);
        packet.write(1);
        packet.writeShort(item.getPosition());
        packet.write(0);
        packet.write(item.getType());
        packet.writeShort(item.getPosition());
        PacketProvider.addItemInfo(packet, item, true, true, null);
        packet.write(4);

        return packet.getPacket();
    }

    public static byte[] showMagnifyingEffect(int id, int slot) {
        WritingPacket packet = new WritingPacket(8);
        packet.writeShort(SendPacketOpcode.SHOW_MAGNIFYING_EFFECT.getValue());
        packet.writeInt(id);
        packet.writeShort(slot);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] showCubeEffect(int id, int cubeid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_POTENTIAL_EFFECT.getValue());
        packet.writeInt(id);
        packet.write(1);
        packet.writeInt(cubeid);

        return packet.getPacket();
    }

    public static byte[] showStampEffect(int id, int stampid, boolean success) {
        WritingPacket mppacket = new WritingPacket();
        mppacket.writeShort(SendPacketOpcode.SHOW_POTENTIAL_EFFECT.getValue());
        mppacket.writeInt(id);
        mppacket.write(success ? 1 : 0);
        mppacket.writeInt(stampid);

        return mppacket.getPacket();
    }

    public static byte[] getQuickSlot(List<Pair<Integer, Integer>> quickslots) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.QUICK_SLOT.getValue());
        packet.write(1);
        Collections.sort(quickslots, new Comparator<Pair<Integer, Integer>>() {
            @Override
            public int compare(Pair<Integer, Integer> p1, Pair<Integer, Integer> p2) {
                int val1index = p1.getLeft();
                int val2index = p2.getLeft();
                if (val1index > val2index) {
                    return 1;
                } else if (val1index == val2index) {
                    return 0;
                } else {
                    return -1;
                }
            }
        });
        for (Pair<Integer, Integer> p : quickslots) {
            packet.writeInt(p.getRight());
        }
        return packet.getPacket();
    }

    public static byte[] absorbingDF(int oid, int count, int color, boolean isZeroWP, MapleCharacter chr, Point pos) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(1);
        packet.writeInt(chr.getId());
        packet.writeInt(oid);
        packet.writeInt(isZeroWP ? 0x09 : 0);
        packet.write(1);
        packet.writeInt(count);
        packet.writeInt(color);
        packet.writeInt(isZeroWP ? 0x2B : 0x2E);
        packet.writeInt(0x06);
        packet.writeInt(isZeroWP ? 0x2D : 0x1F);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);
        if (isZeroWP) {
            packet.writeInt((int) pos.getX());
            packet.writeInt((int) pos.getY());
            packet.writeInt((int) pos.getX());
            packet.writeInt((int) pos.getY());
        }
        return packet.getPacket();
    }

    public static byte[] absorbingCardStack(int cid, int room, int skillid, boolean judgement, int x) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(1);
        packet.writeInt(room);
        packet.write(0);
        packet.writeInt(skillid);
        for (int i = 0; i < x; i++) {
            packet.write(1);
            packet.writeInt(Randomizer.rand(1, 10));
            packet.writeInt(Randomizer.rand(1, 3));
            packet.writeInt(Randomizer.rand(1, 28));
            packet.writeInt(Randomizer.rand(1, 10));
            packet.writeInt(Randomizer.rand(0, 8));
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(Randomizer.nextInt());
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] cardAmount(int amount) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PHANTOM_CARD.getValue());
        packet.write(amount);

        return packet.getPacket();
    }

    public static byte[] showRandBuffEffect(int cid, int skillid, int effectid, int level, boolean broadcast, boolean doubledice) {
        WritingPacket packet = new WritingPacket();
        if (broadcast) {
            packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            packet.writeInt(cid);
        } else {
            packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        }
        packet.write(5); //1.2.239+, (+1)
        packet.writeInt(effectid);
        packet.writeInt(-1);
        packet.writeInt(skillid);
        packet.write(level);
        packet.write(doubledice ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] spawnNPCTemp(int value1, int value2) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_TEMP_SUMMON.getValue());
        packet.writeShort(value1);
        packet.writeShort(value2);
        packet.writeMapleAsciiString("summon");
        packet.write0(5);

        return packet.getPacket();
    }

    /**
     * Makes any NPC in the game scriptable.
     *
     * @param npcId - The NPC's ID, found in WZ files/MCDBdjdd
     * @param description - If the NPC has quests, this will be the text of the
     * menu item
     * @return
     */
    public static byte[] setNPCScriptable(List<Pair<Integer, String>> npcs) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.NPC_SCRIPTABLE.getValue());
        packet.write(npcs.size());
        for (Pair<Integer, String> s : npcs) {
            packet.writeInt(s.left);
            packet.writeMapleAsciiString(s.right);
            packet.writeInt(0); // start time
            packet.writeInt(Integer.MAX_VALUE); // end time
        }
        return packet.getPacket();
    }

    public static byte[] showItemLevelupEffect() {
        return showSpecialEffect(0x16); //1.2.251+, (+1)
    }

    public static byte[] showForeignItemLevelupEffect(int cid) {
        return showSpecialEffect(cid, 0x16); //1.2.251+, (+1)
    }

    public static byte[] itemCooldown(int itemid, int uniqueid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ITEM_COOLDOWN.getValue());
        packet.write(0);
        packet.writeInt(itemid);
        packet.writeLong(uniqueid);

        return packet.getPacket();
    }

    public static byte[] showAngelicBlessEffect(int cid, int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
        packet.writeInt(cid);
        packet.write(3);
        packet.writeInt(skillid);
        packet.write(1);

        return packet.getPacket();
    }

    public static byte[] showHeadTitle(int cid, int title) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.HEAD_TITLE.getValue());
        packet.writeInt(cid);
        packet.writeInt(title);

        return packet.getPacket();
    }

    public static byte[] updateJaguar(MapleCharacter hp) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.JAGUAR_UPDATE.getValue());
        PacketProvider.addWildHunterInfo(packet, hp);

        return packet.getPacket();
    }

    public static byte[] startGathering(int oid, int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.START_GATHER.getValue());
        packet.writeInt(oid);
        packet.writeInt(value);

        return packet.getPacket();
    }

    public static byte[] showGathering(int cid, int tool) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.REACTOR_HIT.getValue());
        packet.writeInt(cid);
        if (tool > 0) {
            packet.write(1);
            packet.writeInt(tool);
            packet.writeInt(0);
        } else {
            packet.write(0);
        }
        return packet.getPacket();
    }

    public static byte[] showGatherComplete(int cid, boolean success) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_GATHER_EFFECT.getValue());
        packet.writeInt(cid);
        packet.write(success ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] getProfessionInfo(String skillid, int skill1, int skill2, int rate) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PROFESSION_INFO.getValue());
        packet.writeMapleAsciiString(skillid);
        packet.writeInt(skill1);
        packet.writeInt(skill2);
        packet.write(1);
        packet.writeInt(rate);

        return packet.getPacket();
    }

    public static byte[] showProfessionMakeEffect(int cid, String effect, int time, int value) {
        WritingPacket packet = new WritingPacket();
        if (cid != -1) {
            packet.writeShort(SendPacketOpcode.SHOW_FOREIGN_EFFECT.getValue());
            packet.writeInt(cid);
        } else {
            packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        }
        packet.write(0x23); //1.2.241+, (+3)
        packet.writeMapleAsciiString(effect);
        packet.write(1);
        packet.writeInt(time);
        packet.writeInt(value);

        return packet.getPacket();
    }

    public static byte[] showProfessionMakeSomething(int cid, int thing, int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_MAKE_EFFECT.getValue());
        packet.writeInt(cid);
        packet.writeInt(thing);
        packet.writeInt(value);

        return packet.getPacket();
    }

    public static byte[] showProfessionMakeResult(int cid, int skillid, int grade, int itemid, int quantity, int exp) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_MAKE_RESULT.getValue());
        packet.writeInt(cid);
        packet.writeInt(skillid);
        packet.writeInt(grade);
        packet.writeInt(itemid);
        packet.writeInt(quantity);
        packet.writeInt(exp);

        return packet.getPacket();
    }

    public static byte[] makeExtractor(int cid, String cname, Point pos, int timeLeft, int itemId, int fee) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SPAWN_EXTRACTOR.getValue());
        packet.writeInt(cid);
        packet.writeMapleAsciiString(cname);
        packet.writeInt(pos.x);
        packet.writeInt(pos.y);
        packet.writeShort(timeLeft); //fh or time left, dunno
        packet.writeInt(itemId); //3049000, 3049001...
        packet.writeInt(fee);

        return packet.getPacket();
    }

    public static byte[] removeExtractor(int cid) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.REMOVE_EXTRACTOR.getValue());
        packet.writeInt(cid);
        packet.writeInt(1); //probably 1 = animation, 2 = make something?

        return packet.getPacket();
    }

    public static byte[] showOwnRecoverHP(long hp) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        packet.write(0x23); //1.2.251+, (+1)
        packet.writeInt(hp);

        return packet.getPacket();
    }

    public static byte[] inviteExpedition(MapleExpeditionType exptype, MapleCharacter chr) {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(0x57); //v192
        wh.writeInt(chr.getLevel());
        wh.writeInt(chr.getJob());
        wh.writeInt(0);
        wh.writeMapleAsciiString(chr.getName());
        wh.writeInt(exptype.code);

        return wh.getPacket();
    }

    public static byte[] updateExpedition(boolean silent, MapleExpedition exp) {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(silent ? 0x4A : 0x4C); //v192
        wh.writeInt(exp.getType().code);
        wh.writeInt(0);
        for (int i = 0; i <= 4; i++) {
            if (exp.isContained(i)) {
                addPartyStatus(0, exp.getParty(i), wh, false, true);
            } else {
                wh.write0(226);
            }
        }
        return wh.getPacket();
    }

    public static byte[] partymoveExpedition(MapleParty party, int to, int channel) {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(0x55);
        wh.writeInt(0);
        wh.writeInt(to);
        addPartyStatus(channel, party, wh, false, true);
        return wh.getPacket();
    }

    public static byte[] changeLeaderExpedition(int index) {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(0x54);
        wh.writeInt(index);
        return wh.getPacket();
    }

    public static byte[] expelExpedition(String name) {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(0x51);
        wh.writeMapleAsciiString(name);
        return wh.getPacket();
    }

    public static byte[] expeledExpedition() {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(0x52);
        return wh.getPacket();
    }

    public static byte[] disbandExpedition() {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(0x53);
        return wh.getPacket();
    }

    public static byte[] leavedExpedition() {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(0x50);
        return wh.getPacket();
    }

    public static byte[] leaveExpedition(String name) {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.EXPEDITION_OPERATION.getValue());
        wh.write(0x4F);
        wh.writeMapleAsciiString(name);

        return wh.getPacket();
    }

    public static byte[] updateAswanFame(int level, int fame, boolean levelup) {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.ASWAN_FAME.getValue());
        wh.writeInt(level);
        wh.writeInt(fame);
        wh.write(levelup ? 1 : 0);

        return wh.getPacket();
    }

    public static byte[] openBag(int index, int itemId, boolean firstTime) {
        WritingPacket wh = new WritingPacket();
        wh.writeShort(SendPacketOpcode.OPEN_BAG.getValue());
        wh.writeInt(index);
        wh.writeInt(itemId);
        wh.writeShort(firstTime ? 1 : 0); //this might actually be 2 bytes

        return wh.getPacket();
    }

    public static byte[] addMoruItem(IItem item) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(0); // could be from drop
        packet.write(2); // always 2
        packet.write(0);
        packet.write(3); // quantity > 0 (?)
        packet.write(1); // Inventory type
        packet.writeShort(item.getPosition()); // item slot
        packet.write(0);
        packet.write(1);
        packet.writeShort(item.getPosition()); // wtf repeat
        PacketProvider.addItemInfo(packet, item, true, true, null);

        return packet.getPacket();
    }

    public static byte[] showMagneticConnect(int cid, List<MapleMapObject> objs) {
        WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.SHOW_MAGNETIC_EFFECT.getValue());
        w.writeInt(cid);
        for (MapleMapObject o : objs) {
            w.writeInt(o.getObjectId());
        }
        return w.getPacket();
    }

    public static byte[] showItempotAction(MapleItempot mip, boolean show) {
        WritingPacket w = new WritingPacket();
        w.writeShort(SendPacketOpcode.ITEMPOT_ACTION.getValue());
        w.write(show ? 0 : 1);
        w.writeInt(mip.getSlot());
        w.writeInt(show ? 2 : 1);
        if (show) {
            w.writeInt(mip.getLifeId());
            w.write(mip.getLevel());
            w.write(mip.getStatus());
            w.writeInt(mip.getFullness());
            w.writeInt(mip.getCloseness());
            w.writeInt(mip.getIncCloseLeft());
            w.writeInt(10);
            w.writeInt(1);
            w.write(0);
            w.writeLong(PacketProvider.getKoreanTimestamp(mip.getLastFeedTime()));
            w.writeLong(PacketProvider.getKoreanTimestamp(mip.getSleepTime()));
            w.writeLong(PacketProvider.getKoreanTimestamp(mip.getStartTime()));
            w.writeLong(PacketProvider.getKoreanTimestamp(System.currentTimeMillis()));
            w.writeInt(mip.getMaxClose());
            w.writeInt(mip.getMaxFull());
            w.writeInt(mip.getIncClose() + 1);
            w.writeInt(mip.getFeedInterval());
            w.write(10);
            w.writeInt(0);
        }
        return w.getPacket();
    }

    public static byte[] giveLifeTidal(boolean isHpBetter, int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_LifeTidal);
        packet.writeShort(isHpBetter ? 2 : 1);
        packet.writeInt(27110007);
        packet.writeInt(2100000000);
        packet.write0(5);
        packet.writeInt(value);
        packet.write0(14);

        return packet.getPacket();
    }

    public static byte[] giveDemonWatk(long hp) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_LifeTidal);
        packet.writeShort(3);
        packet.writeInt(0);
        packet.writeInt(2100000000);
        packet.write0(5);
        packet.writeInt(hp);
        packet.write0(13);

        return packet.getPacket();
    }

    public static byte[] FireBlink(int cid, Point pos) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CURRENT_MAP_WARP.getValue());
        packet.write(0);
        packet.write(3);
        packet.writeInt(cid);
        packet.writePos(pos);

        return packet.getPacket();
    }

    public static byte[] OrbitalFlame(int cid, int skillid, int effect, int direction, int range, int targetCount) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(0x11);
        packet.write(1);
        packet.writeInt(0);
        packet.writeInt(skillid);

        packet.write(1);
        packet.writeInt(42);
        packet.writeInt(effect); //effect
        packet.writeInt(20);
        packet.writeInt(20);
        packet.writeInt(90);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt((int) System.currentTimeMillis());
        packet.writeInt(targetCount);
        packet.writeInt(0);
        packet.write(0); // 반복 종료
        packet.writeInt(direction);
        packet.writeInt(range); //range

        return packet.getPacket();
    }

    public static byte[] giveMagicArrow(MapleCharacter chr, MapleMonster mob) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(chr.getId());
        packet.writeInt(0x0A);
        packet.write(1);
        packet.writeInt(mob.getObjectId());
        packet.writeInt(3100010);
        packet.write(1);
        packet.writeInt(10);
        packet.writeInt(2);
        packet.writeInt(Randomizer.rand(0x0A, 0x14));
        packet.writeInt(Randomizer.rand(0x05, 0x0A));
        packet.writeInt(Randomizer.rand(0x04, 0x12D));
        packet.writeInt(Randomizer.rand(0x14, 0x30));
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] giveMesoExplosion(int cid, List<Integer> mobs, List<Pair<Integer, Point>> mesos) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(0x0C);
        packet.write(1);
        packet.writeInt(mobs.size());
        for (Integer mob : mobs) {
            packet.writeInt(mob);
        }
        packet.writeInt(4210014);
        for (int i = 0; i < mesos.size(); i++) {
            packet.write(1);
            packet.writeInt(i + 2);
            packet.writeInt(1);
            packet.writeInt(Randomizer.rand(0x2A, 0x2F));
            packet.writeInt(Randomizer.rand(0x03, 0x04));
            packet.writeInt(Randomizer.rand(0x04, 0x132));
            packet.writeInt(700);
            packet.writeInt(mesos.get(i).right.x);
            packet.writeInt(mesos.get(i).right.y);
            packet.writeInt(Randomizer.nextInt());
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] giveShadowBat(int cid, int firstMob, int skillid, Point pos, int type) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(type);
        packet.write(1);
        packet.writeInt(firstMob);
        packet.writeInt(14000028);
        packet.write(1);
        packet.writeInt(2);
        packet.writeInt(1);
        packet.writeInt(1);
        packet.writeInt(5);
        packet.writeInt(50);
        packet.writeInt(500);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt((int) System.currentTimeMillis());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);
        packet.writeInt((int) pos.getX());
        packet.writeInt((int) pos.getY());
        packet.writeInt((int) pos.getX());
        packet.writeInt((int) pos.getY());
        return packet.getPacket();
    }

    public static byte[] giveShadowBatBounce(int cid, int beforeTarget, int nextTarget, int posX, int posY) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(1);
        packet.writeInt(cid);
        packet.writeInt(beforeTarget); // 이전 타겟 ID
        packet.writeInt(0x10);
        packet.write(1);
        packet.writeInt(nextTarget); // 다음 타겟 ID
        packet.writeInt(14000029);
        packet.write(1);
        packet.writeInt(12); //key
        packet.writeInt(0);
        packet.writeInt(5);
        packet.writeInt(5);
        packet.writeInt(46);
        packet.writeInt(8);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt((int) System.currentTimeMillis());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);
        packet.writeInt(posX);
        packet.writeInt(posY);

        return packet.getPacket();

    }

    public static byte[] cancelEquilbriam() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_Larkness);
        return packet.getPacket();
    }

    // BuyEquipExt
    public static byte[] pendantSlot(boolean p) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PENDANT_SLOT.getValue());
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] CongratulationMusicBox(String name, int itemid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MUSIC_BOX.getValue());
        packet.writeInt(itemid);
        packet.writeMapleAsciiString(name);
        return packet.getPacket();
    }

    public static byte[] followRequest(int chrid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FOLLOW_REQUEST.getValue());
        packet.writeInt(chrid);

        return packet.getPacket();
    }

    public static byte[] getFollowMsg(int opcode) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FOLLOW_MSG.getValue());
        packet.writeLong(opcode);

        return packet.getPacket();
    }

    public static byte[] followEffect(int initiator, int replier, Point toMap) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FOLLOW_EFFECT.getValue());
        packet.writeInt(initiator);
        packet.writeInt(replier);
        if (replier == 0) {
            packet.write(toMap == null ? 0 : 1);
            if (toMap != null) {
                packet.writeInt(toMap.x);
                packet.writeInt(toMap.y);
            }
        }
        return packet.getPacket();
    }

    public static byte[] MegidoFlameRe(int cid, int oid, Point pt, int v1, int v2, int v3) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(3);

        packet.write(1);

        packet.writeInt(1);
        packet.writeInt(oid);
//2121052
        packet.writeInt(2121055);

        packet.write(1);
        packet.writeInt(2); //dwKey
        packet.writeInt(2); //Inc
        packet.writeInt(Randomizer.rand(10, 17));
        packet.writeInt(Randomizer.rand(10, 16));
        packet.writeInt(Randomizer.rand(40, 52));
        packet.writeInt(20);
        packet.writeInt(0); //Start.x
        packet.writeInt(0); //Start.y
        packet.writeInt(0);//CreateTime
        packet.writeInt(0); //MaxHitCount
        packet.writeInt(0); //EffectIdx

        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] ShieldChacingRe(int cid, int unkwoun, int oid, int unkwoun2, int unkwoun3) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(1);
        packet.writeInt(cid);
        packet.writeInt(unkwoun);
        packet.writeInt(4);
        packet.write(1);
        packet.writeInt(oid);
        packet.writeInt(31221014);
        packet.write(1);
        packet.writeInt(unkwoun2 + 1);
        packet.writeInt(3);
        packet.writeInt(unkwoun3);
        packet.writeInt(3);
        packet.writeInt(Randomizer.rand(36, 205));
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(0);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] ShieldChacing(int cid, List<Integer> moblist, int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(3);
        packet.write(1);
        packet.writeInt(moblist.size());
        for (int i = 0; i < moblist.size(); i++) {
            packet.writeInt((moblist.get(i)).intValue());
        }
        packet.writeInt(skillid);
        for (int i = 1; i <= moblist.size(); i++) {
            packet.write(1);
            packet.writeInt(1 + i);
            packet.writeInt(3);
            packet.writeInt(Randomizer.rand(1, 20));
            packet.writeInt(Randomizer.rand(20, 50));
            packet.writeInt(Randomizer.rand(50, 200));
            packet.writeInt(skillid == 2121055 ? 720 : 660);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(Randomizer.nextInt());
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] PsychicGrep(int cid, int oid, int i, int skillid, int skillLevel) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(skillLevel);
        packet.write(1);
        packet.writeInt(oid);
        packet.writeInt(skillid);

        /* 스킬 도입부 시작 */
        packet.write(1);
        packet.writeInt((0x6 + i));
        packet.writeInt(0);
        packet.writeInt(Randomizer.rand(18, 25));
        packet.writeInt(Randomizer.rand(7, 11));
        packet.writeInt(Randomizer.rand(1, 8));
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(Randomizer.nextInt());
        /* 스킬 도입부 종료 */

        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] HomingMisile(int cid, List<Integer> moblist, int skillid, int skillLevel) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(20);
        packet.write(1);

        packet.writeInt(moblist.size());
        for (int i = 0; i < moblist.size(); i++) {
            packet.writeInt(moblist.get(i).intValue());
        }

        packet.writeInt(skillid);

        final int random = Randomizer.nextInt();
        for (int i = 0; i < moblist.size(); i++) {
            packet.write(1);
            packet.writeInt(10 + (i));
            packet.writeInt(skillid == 35101002 ? 1 : 2);
            packet.writeInt(Randomizer.rand(46, 51));
            packet.writeInt(Randomizer.rand(46, 48));
            packet.writeInt(Randomizer.rand(54, 142));
            packet.writeInt(Randomizer.rand(274, 541));
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(random);
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] EazisSystem(int cid, int oid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(5);
        packet.write(1);
        packet.writeInt(oid);
        packet.writeInt(36110004);
        for (int i = 0; i < 3; i++) {
            packet.write(1);
            packet.writeInt(i + 2);
            packet.writeInt(0);
            packet.writeInt(35);
            packet.writeInt(5);
            packet.writeInt(Randomizer.rand(80, 100));
            packet.writeInt(Randomizer.rand(200, 300));
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(Randomizer.nextInt());
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] getDeathCount(int count) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(644);
        packet.writeInt(SendPacketOpcode.DEATH_COUNT.getValue());

        return packet.getPacket();
    }

    public static byte[] combokill(int combo, int monster) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(0x25); //1.2.250+ (+2)
        packet.write(1);
        packet.writeInt(combo);
        packet.writeInt(monster);

        return packet.getPacket();
    }

    public static byte[] multikill(int combo, long exp) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(0x25); //1.2.250+ (+2)
        packet.write(0);
        packet.writeLong(exp);
        packet.writeInt(combo);

        return packet.getPacket();
    }

    public static byte[] PinPointRocket(int cid, List<Integer> moblist) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(6);
        packet.write(1);
        packet.writeInt(moblist.size());
        for (int i = 0; i < moblist.size(); i++) {
            packet.writeInt(((Integer) moblist.get(i)).intValue());
        }
        packet.writeInt(36001005);
        for (int i = 1; i <= moblist.size(); i++) {
            packet.write(1);
            packet.writeInt(i + 7);
            packet.writeInt(0);
            packet.writeInt(Randomizer.rand(10, 20));
            packet.writeInt(Randomizer.rand(20, 40));
            packet.writeInt(Randomizer.rand(40, 200));
            packet.writeInt(Randomizer.rand(500, 2000));
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(Randomizer.nextInt());
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] OnOffFlipTheCoin(boolean on) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FLIP_THE_COIN.getValue());
        packet.write(on ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] TrifleWorm(int cid, int skillid, int ga, int oid, int gu) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(7);
        packet.write(1);
        packet.writeInt(gu);
        packet.writeInt(oid);
        packet.writeInt(skillid);
        for (int i = 1; i < ga; i++) {
            packet.write(1);
            packet.writeInt(2 + i);
            packet.writeInt(Randomizer.rand(1, 2));
            packet.writeInt(Randomizer.rand(42, 47));
            packet.writeInt(7 + i);
            packet.writeInt(Randomizer.rand(5, 171));
            packet.writeInt(Randomizer.rand(0, 55));
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(Randomizer.nextInt());
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] StormBlinger(MapleCharacter chr, MapleMonster mob) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(chr.getId());
        packet.writeInt(8);
        packet.write(1);
        packet.writeInt(mob.getObjectId());
        packet.writeInt(13121054);
        packet.write(1);
        packet.writeInt(10);
        packet.writeInt(2);
        packet.writeInt(Randomizer.rand(0x0A, 0x14));
        packet.writeInt(Randomizer.rand(0x05, 0x0A));
        packet.writeInt(Randomizer.rand(0x04, 0x12D));
        packet.writeInt(Randomizer.rand(0x14, 0x30));
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);
        return packet.getPacket();
    }

    public static byte[] CriticalGrowing(int critical) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_CriticalGrowing);
        packet.writeShort(critical);
        packet.writeInt(4220015);
        packet.write0(22);

        return packet.getPacket();
    }

    public static byte[] absorbingMarkOfTheif(int cid, int oid, int skillid, List<MapleMonster> monsters, Point p1, int itemId) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(1);
        packet.writeInt(cid);
        packet.writeInt(oid);
        packet.writeInt(11); //type
        packet.write(1);
        packet.writeInt(monsters.size());
        for (MapleMonster monster : monsters) {
            packet.writeInt(monster.getObjectId());
        }
        packet.writeInt(skillid); //skillid
        for (int i = 0; i < monsters.size(); i++) {
            packet.write(1);
            packet.writeInt(2 + i);
            packet.writeInt(1);
            packet.writeInt(Randomizer.rand(0x2A, 0x2B));
            packet.writeInt(Randomizer.rand(0x03, 0x04));
            packet.writeInt(Randomizer.rand(0x43, 0xF5));
            packet.writeInt(0);
            packet.writeLong(0);
            packet.writeInt(Randomizer.nextInt());
            packet.writeInt(0);
            packet.writeInt(0); //1.2.252+
        }
        packet.write(0);
        packet.writeInt(p1.x - 50);
        packet.writeInt(p1.y - 100);

        packet.writeInt(p1.x + 50);
        packet.writeInt(p1.y + 100);
        packet.writeInt(itemId);
        return packet.getPacket();
    }

    public static byte[] CancelDarkSight() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_DarkSight);
        return packet.getPacket();
    }

    public static byte[] KillingPoint(int count) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_KillingPoint);
        packet.write0(5);
        packet.writeInt(count);
        packet.write0(10);

        return packet.getPacket();
    }

    public static byte[] ZeroWP(int wp) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(0x23); //1.2.250+ (+2)
        packet.writeInt(wp);

        return packet.getPacket();
    }

    public static byte[] ZeroUpdate(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ZERO_UPDATE.getValue());
        packet.writeInt(chr.getWP());

        return packet.getPacket();
    }

    public static byte[] RedCubeStart(MapleCharacter chr, IItem item, int cubeId) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_REDCUBE_EFFECT.getValue());
        packet.writeInt(chr.getId());
        packet.write(0);
        packet.writeInt(cubeId);
        packet.writeInt(item.getPosition());
        PacketProvider.addItemInfo(packet, item, true, true, false, false, chr);
        return packet.getPacket();
    }

    public static byte[] BlackCubeStart(MapleCharacter chr, IItem item, int cubeId) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_BLACKCUBE_EFFECT.getValue());
        packet.writeLong(PacketProvider.getTime(-2));
        packet.write(1);
        PacketProvider.addItemInfo(packet, item, true, true, false, false, chr);
        packet.writeInt(cubeId);
        packet.writeInt(item.getPosition());
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] BlackCube(int cid, int cubeId) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_BLACK_CUBE.getValue());
        packet.writeInt(cid);
        packet.write(1);
        packet.writeInt(cubeId);

        return packet.getPacket();
    }

    public static byte[] showKartaEffect() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_ITEM_GAIN_INCHAT.getValue());
        packet.write(0x21); //1.2.251+ (+1)
        packet.writeMapleAsciiString("Effect/BasicEff.img/JobChangedElf");
        packet.write(1);
        packet.writeInt(0);
        packet.writeInt(2);
        packet.writeInt(5155000);

        return packet.getPacket();
    }

    public static byte[] absorbingFG(int cid, int skillid, int sn) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(13);
        packet.writeInt(257);
        packet.write(0);
        packet.writeInt(sn);
        packet.writeInt(skillid);
        packet.write(1);
        packet.writeInt(Randomizer.rand(1, 10));
        packet.writeInt(skillid == 25100010 ? 1 : 2);
        packet.writeInt(Randomizer.rand(10, 20));
        packet.writeInt(Randomizer.rand(20, 40));
        packet.writeInt(Randomizer.rand(40, 50));
        packet.writeInt(630);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] absorbingRFG(int cid, int skillid, int sn) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(1);
        packet.writeInt(cid);
        packet.writeInt(sn);
        packet.writeInt(4);
        packet.write(1);
        packet.writeInt(sn);
        packet.writeInt(skillid);
        packet.write(1);
        packet.writeInt(Randomizer.rand(1, 10));
        packet.writeInt(skillid == 25100010 ? 4 : 5);
        packet.writeInt(Randomizer.rand(40, 43));
        packet.writeInt(Randomizer.rand(3, 4));
        packet.writeInt(Randomizer.rand(250, 294));
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] spawnArrowFlatter(int id, int a, Point pos, int oid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ARROW_FLATTER.getValue());
        packet.writeInt(oid);
        packet.writeInt(1);
        packet.writeInt(id);
        packet.writeInt(0);
        packet.writeintPos(pos);
        packet.write(a);

        return packet.getPacket();
    }

    public static byte[] spawnArrowFlatter(int arrow, int oid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ARROW_FLATTERS.getValue());
        packet.writeInt(oid);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] cancelArrowFlatter(int oid, int arrow) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_ARROW_FLATTER.getValue());
        packet.writeInt(1);
        packet.writeInt(oid);

        return packet.getPacket();
    }

    public static byte[] CancelExtremeArchery() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_ExtremeArchery);
        return packet.getPacket();
    }

    public static byte[] CancelMotralBlow() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.CANCEL_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_BowMasterMortalBlow);
        return packet.getPacket();
    }

    public static byte[] showIntro(boolean a) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.INTRO.getValue());
        if (!a) {
            packet.write(0);
        } else {
            packet.write(1);
            packet.writeShort(1);
        }
        return packet.getPacket();
    }

    public static byte[] showForeignDamageSkin(MapleCharacter chr, int skinid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_DAMAGE_SKIN.getValue());
        packet.writeInt(chr.getId());
        packet.writeInt(skinid);

        return packet.getPacket();
    }

    public static byte[] showQuestMessage(String text) { //sub_177AFF50
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(0x0C); //1.2.250+ (+1)
        packet.writeMapleAsciiString(text);

        return packet.getPacket();
    }

    public static byte[] showGageUI(int i) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_FEVER_GAUGE.getValue());
        packet.writeInt(70);//최대게이지
        packet.writeInt(i);

        return packet.getPacket();
    }

    public static byte[] updateInnerExp(int exp) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_INNER_EXP.getValue());
        packet.writeInt(exp);

        return packet.getPacket();
    }

    public static byte[] updateInnerAbility(final InnerSkillValueHolder skill, int index, boolean last) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.UPDATE_INNER_ABILITY.getValue());
        packet.write(last ? 1 : 0);
        packet.write(1);
        packet.writeShort(index);
        packet.writeInt(skill.getSkillId());
        packet.writeShort(skill.getSkillLevel());
        packet.writeShort(skill.getRank());
        packet.write(last ? 1 : 0);

        return packet.getPacket();
    }

    public static byte[] sendItemMessage(int itemid, String a) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SERVERMESSAGE.getValue());
        packet.write(0x16);
        packet.writeMapleAsciiString(a);
        PacketProvider.addItemInfo(packet, ItemInformation.getInstance().getEquipById(itemid), false, false, null);
        packet.write(0);

        return packet.getPacket();
    }

    public static byte[] showStardust(int cid, byte[] unk1, byte[] unk2, int skillid, int direction) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.STARDUST.getValue());
        packet.writeInt(cid);
        packet.writeInt(2);
        packet.write(unk1);
        packet.write(unk2);
        packet.writeInt(skillid);
        packet.writeInt(0);
        packet.writeInt(20);
        packet.write(direction);
        packet.writeInt(4);

        return packet.getPacket();
    }

    public static byte[] DummyBlueStar(int value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.DUMMY.getValue());
        packet.writeLong(0);
        packet.write(value);

        return packet.getPacket();
    }

    public static byte[] feverTime() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FEVER_TIME.getValue());
        packet.writeInt(2);

        return packet.getPacket();
    }

    public static byte[] TimeCapsule() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.TIME_CAPSULE.getValue());

        return packet.getPacket();
    }

    public static final byte[] showMaplePoint(MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SHOW_MAPLE_POINT.getValue());
        packet.writeInt(chr.getCSPoints(2));

        return packet.getPacket();
    }

    public static byte[] ElementalCharge(int count, int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.GIVE_BUFF.getValue());
        PacketProvider.writeSingleMask(packet, BuffStats.CTS_ElementalCharge);
        packet.writeShort(5);
        packet.writeInt(skillid);
        packet.writeLong(0);
        packet.write(0x6);
        packet.write(count);
        packet.writeShort(0x0C);
        packet.writeShort(514); //02 02, 의미가 있을 듯.
        packet.write0(13);

        return packet.getPacket();
    }

    public static byte[] updateMasterPix(MapleCharacter chr, IItem baseitem, IItem basicitem, IItem masterpix) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MODIFY_INVENTORY_ITEM.getValue());
        packet.write(0);
        packet.write(3);
        packet.write(0);
        packet.write(3);
        packet.write(baseitem.getType());
        packet.writeShort(baseitem.getPosition());
        packet.write(3);
        packet.write(basicitem.getType());
        packet.writeShort(basicitem.getPosition());
        packet.write(0);
        packet.write(masterpix.getType());
        packet.writeShort(masterpix.getPosition());
        PacketProvider.addItemInfo(packet, masterpix, true, true, false, false, chr);

        return packet.getPacket();
    }

    /*
    public static byte[] popupHomePage() {
        WritingPacket mplew = new WritingPacket();

        mplew.writeShort(SendPacketOpcode.POPUP_HOMEPAGE.getValue());
        mplew.write(1); //1 = enable, 0 = disable
        mplew.writeMapleAsciiString("http://blog.naver.com/jaeyoljo");

        return mplew.getPacket();
    } */
    public static byte[] popupHomePage(String url) { //cm.url
        WritingPacket mplew = new WritingPacket();

        mplew.writeShort(SendPacketOpcode.POPUP_HOMEPAGE.getValue());
        mplew.write(1); //1 = enable, 0 = disable
        mplew.writeMapleAsciiString(url);

        return mplew.getPacket();
    }

    public static byte[] MasterPix(IItem item, int ml) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MASTERPIX.getValue());
        packet.writeInt(0x79);
        packet.write(ml);
        packet.write(1);
        packet.writeShort(item.getPosition());
        packet.writeShort(0);

        return packet.getPacket();
    }

    public static byte[] getLinkedSkill(int sid, int cid, String playerName) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.LINK_SKILL.getValue());
        packet.writeInt(0);
        packet.writeInt(sid);
        packet.writeInt(cid);
        packet.writeMapleAsciiString(playerName);

        return packet.getPacket();
    }

    public static byte[] getAuctionInfo() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.WARP_TO_AUCTION.getValue());
        packet.write(7);
        packet.write(1);
        packet.writeInt(0);

        return packet.getPacket();
    }

    public static byte[] getStarPlanetRank(List<String> name, List<Integer> point) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.STAR_PLANET_RANK.getValue());
        packet.write(6);
        packet.writeLong(PacketProvider.getKoreanTimestamp(System.currentTimeMillis()));
        packet.write(name.size() != 0 ? 1 : 0);
        packet.writeInt(name.size());
        for (int i = 0; i < name.size(); i++) {
            packet.writeInt(i + 1);
            packet.writeInt((int) point.get(i).intValue());
            packet.writeInt((int) point.get(i).intValue());
            packet.writeMapleAsciiString((String) name.get(i));
        }
        return packet.getPacket();
    }

    public static byte[] getCombatAnalyze(byte on) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.START_COMBAT_ANALYZE.getValue());
        packet.write(on);

        return packet.getPacket();
    }

    public static byte[] CFieldRankSystem(int size) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(961);
        packet.writeInt(size);
        for (int i = 1; i <= size; i++) {
            packet.writeInt(i);
            packet.writeMapleAsciiString("");
        }
        return packet.getPacket();
    }

    public static byte[] SummonBeholderRevengeAttack(final int cid, final int sid, final int mid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SummonBeholderRevengeAttack.getValue());
        packet.writeInt(cid);
        packet.writeInt(sid);
        packet.writeInt(mid);
        return packet.getPacket();
    }

    public static byte[] OnJaguarSkill(final int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.JaguarSkill.getValue());
        packet.writeInt(skillid);
        return packet.getPacket();
    }

    public static byte[] randAreaAttackRequest(int skillid, Point pos) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(718);// Opcode JAGUAR_SKILL + 4
        packet.writeInt(skillid);
        packet.writeInt(1); //1이상시 포인트를 받는다.
        packet.writeInt(pos.x);//x
        packet.writeInt(pos.y);//y
        packet.writeInt(0); // area?
        return packet.getPacket();
    }

    public static byte[] ANOTHERBITE(int BonusSkillID, List<Triple<Integer, Integer, Integer>> mobList) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(717);//옵코드 JAGUAR_SKILL + 3
        packet.writeInt(BonusSkillID);//BonusSkillID
        packet.writeInt(mobList.size());
        packet.writeInt(1);//NJAGUARBLEEDINGATTACKCOUNT (v4)
        for (Triple<Integer, Integer, Integer> mob : mobList) {
            packet.writeInt(mob.getFirst());
            packet.writeInt(mob.getSecond());
        }
        return packet.getPacket();
    }

    public static byte[] AssistAttackRequest(final int cid, final int sid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.AssistAttackRequest.getValue());
        packet.writeInt(cid);
        packet.writeInt(sid);
        return packet.getPacket();
    }

    public static byte[] SummonAttackActive(final int cid, final int sid, final boolean active) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.SummonAttackActive.getValue());
        packet.writeInt(cid);
        packet.writeInt(sid);
        packet.write(active ? 1 : 0);
        return packet.getPacket();
    }

    public static byte[] OnAddPopupSay(final int npcid, final int duraction, final String title, final String msg) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(712);
        packet.writeInt(npcid);
        packet.writeInt(duraction);
        packet.writeMapleAsciiString(title);
        packet.writeMapleAsciiString(msg);
        return packet.getPacket();
    }

    public static byte[] RemovePopupSay() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(713);
        return packet.getPacket();
    }

    public static byte[] SetDressChanged(final boolean Set, final int dress) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(646);
        packet.write(Set ? 1 : 0);
        packet.write(dress);
        return packet.getPacket();
    }

    public static byte[] GrayBackground(final boolean gray) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(706);
        packet.write(gray ? 1 : 0);
        return packet.getPacket();
    }

    public static byte[] FreeLookChangeUIOpen() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(704);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] OpenURL(final String url) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(675);
        packet.writeMapleAsciiString(url);
        return packet.getPacket();
    }

    public static byte[] OpenWebUI() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(602);
        packet.writeInt(268);
        packet.writeMapleAsciiString("http://naver.com");
        packet.writeMapleAsciiString("http://naver.com");
        return packet.getPacket();
    }

    public static byte[] markof(final MapleCharacter chr, final MapleMonster monster, final List<Integer> mob, final int kunai, final int skillid) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(1);
        packet.writeInt(chr.getId());
        packet.writeInt(monster.getObjectId());
        packet.writeInt(11);
        packet.write(1);
        packet.writeInt(mob.size());
        for (int i = 0; i < mob.size(); i++) {
            packet.writeInt(mob.get(i));
        }
        // packet.writeInt(chr.getJob() != 412 ? 4100012 : 4120019);
        packet.writeInt(skillid);
        for (int j = 0; j < 4; j++) {
            packet.write(1);
            packet.writeInt(2 + j);
            packet.writeInt(1);
            packet.writeInt(Randomizer.rand(35, 75));
            packet.writeInt(Randomizer.rand(4, 6));
            packet.writeInt(Randomizer.rand(35, 75));
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(Randomizer.nextInt()); //1.2.220+ 그리고 유동
            packet.writeInt(0);
            packet.writeInt(0);
        }
        packet.write(0);

        packet.writeInt(monster.getPosition().x - 50);
        packet.writeInt(monster.getPosition().y - 100);

        packet.writeInt(monster.getPosition().x + 50);
        packet.writeInt(monster.getPosition().y + 100);

        packet.writeInt(kunai);
        return packet.getPacket();
    }

    public static byte[] DressUpInfoModified(final MapleCharacter chr) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(238);
        packet.writeInt(chr.getSecondFace());
        packet.writeInt(chr.getSecondHair());
        packet.writeInt(Integer.parseInt(chr.getKeyValue("dressUp_Clothe")));
        packet.writeInt(chr.getSecondSkinColor());
        packet.writeInt(0);//MixBaseHairColor
        packet.writeInt(0);//MixAddHairColor
        packet.writeInt(0);//MixHairBaseProb
        return packet.getPacket();
    }

    public static byte[] OnCreatePsychicArea(int cid, int nAction, int ActionSpeed, int LocalKey, int SkillID, int SLV, int PsychicAreaKey, int DurationTime, int second, int SkeletonFieldPathIdx, int SkeletonAnildx, int SkeletonLoop, long mask8) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OnCreatePsychicArea.getValue());
        packet.writeInt(cid);
        packet.write(1);
        packet.writeInt(nAction);
        packet.writeInt(ActionSpeed); //ActionSpeed
        packet.writeInt(LocalKey); //LocalKey
        packet.writeInt(SkillID); //SkillID
        packet.writeShort(SLV); //SLV
        packet.writeInt(PsychicAreaKey); //PsychicAreaKey
        packet.writeInt(DurationTime + 4000); //DurationTime
        packet.write(second); //second
        packet.writeShort(SkeletonFieldPathIdx);
        packet.writeShort(SkeletonAnildx);
        packet.writeShort(SkeletonLoop);
        packet.writeLong(mask8);
        return packet.getPacket();
    }

    public static byte[] OnDoActivePsychicArea(int v1, int v2) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.OnDoActivePsychicArea.getValue());
        packet.writeInt(v1);
        packet.writeInt(v2);
        return packet.getPacket();
    }

    public static byte[] KinesisAtom(int cid, int oid, int i, int skillid, int skillLevel) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0);
        packet.writeInt(cid);
        packet.writeInt(22);
        packet.write(1);
        packet.writeInt(oid);
        packet.writeInt(skillid);

        /* 스킬 도입부 시작 */
        packet.write(1);
        packet.writeInt(6 + i);
        packet.writeInt(Randomizer.rand(1, 3));
        packet.writeInt(Randomizer.rand(46, 51));
        packet.writeInt(Randomizer.rand(46, 48));
        packet.writeInt(Randomizer.rand(54, 142));
        packet.writeInt(Randomizer.rand(274, 541));
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(Randomizer.nextInt());
        packet.writeInt(0);
        packet.writeInt(0);
        /* 스킬 도입부 종료 */

        packet.write(0);

        return packet.getPacket();
    }

    public static void DamageSkinSaveInfo(final MapleCharacter hp, final WritingPacket packet) {
        int useDamageSkin = hp.getDamageSkin();
        String saveDSkin[] = hp.getKeyValue("SaveDamageSkin") == null ? new String[0] : hp.getKeyValue("SaveDamageSkin").split(",");
        if (useDamageSkin == 0) {
            packet.write(0);
        } else {
            packet.write(1);

            packet.writeInt(useDamageSkin);
            packet.writeInt(GameConstants.getDamageSkinItemByNumber(useDamageSkin));
            packet.write(0);
            packet.writeMapleAsciiString("데미지스킨");

            packet.writeInt(useDamageSkin);
            packet.writeInt(GameConstants.getDamageSkinItemByNumber(useDamageSkin));
            packet.write(0);
            packet.writeMapleAsciiString("데미지스킨");

            packet.writeShort(50);

            packet.writeShort(saveDSkin.length);

            for (String v2 : saveDSkin) {
                packet.writeInt(GameConstants.getDamageSkinNumberByItem(Integer.parseInt(v2)));
                packet.writeInt(Integer.parseInt(v2));
                packet.write(0);
                packet.writeMapleAsciiString("데미지스킨");
            }
        }
    }

    public static final void addDamageSkinInfo(final WritingPacket packet, final MapleCharacter chr) {
        List<Pair<Integer, Integer>> damageskin = new ArrayList<Pair<Integer, Integer>>();
        int skinNumber;
        boolean PremiumDamageSkin = ((GameConstants.getDamageSkinItemByNumber(chr.getDamageSkin()) / 10000) == 568);
        for (int i = 0; i < chr.getDamageSkinSlot(); i++) {
            skinNumber = GameConstants.getDamageSkinNumberByItem(chr.getSaveDamageSkins()[i]);
            if (skinNumber != -1) {
                damageskin.add(new Pair(chr.getSaveDamageSkins()[i], skinNumber));
            }
        }
        packet.write(1);
        //---------- ActiveDamageSkin ------------//
        packet.writeInt(PremiumDamageSkin ? -1 : chr.getDamageSkin());
        packet.writeInt(chr.getDamageSkin() == 0 ? 2431965 : PremiumDamageSkin ? 0 : GameConstants.getDamageSkinItemByNumber(chr.getDamageSkin()));
        packet.write(PremiumDamageSkin ? 1 : 0);
        packet.writeMapleAsciiString(PremiumDamageSkin ? "" : "사용 중인 데미지 스킨이다.\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n");
        //---------- PremiumDamageSkin ------------//
        packet.writeInt(PremiumDamageSkin ? chr.getDamageSkin() : -1);
        packet.writeInt(PremiumDamageSkin ? GameConstants.getDamageSkinItemByNumber(chr.getDamageSkin()) : 0);
        packet.write(PremiumDamageSkin ? 0 : 1);
        packet.writeMapleAsciiString(PremiumDamageSkin ? "사용 중인 프리미엄 데미지 스킨이다.\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n" : "");
        //------------- nSlotCount --------------//
        packet.writeShort(chr.getDamageSkinSlot());
        //---------- SavedDamageSkin -------------//
        packet.writeShort(damageskin.size());
        for (Pair<Integer, Integer> ds : damageskin) {
            packet.writeInt(ds.getRight());
            packet.writeInt(ds.getLeft());
            packet.write(0);
            packet.writeMapleAsciiString("저장된 데미지 스킨이다.\\r\\n\\r\\n\\r\\n\\r\\n\\r\\n");
        }
    }

    public static byte[] DamageSkinSaveResult(final MapleCharacter hp) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.DamageSkinSaveResult.getValue());
        packet.write(4); //errorMode
        addDamageSkinInfo(packet, hp);
        return packet.getPacket();
    }

    public static byte[] OnChatLetClientConnect() {
        WritingPacket p = new WritingPacket();
        p.writeShort(418);
        p.writeInt(1);
        return p.getPacket();
    }

    public static byte[] PartTimeJob(int chrid, byte job, int reward, long fitime) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.PART_TIME_JOB.getValue());
        packet.writeInt(chrid);
        packet.write(0);
        PacketProvider.PartTimeJob(packet, new Triple<Byte, Long, Integer>(job, fitime, reward));
        return packet.getPacket();
    }

    public static byte[] Mulung_Pts(int recv, int total) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.SHOW_STATUS_INFO.getValue());
        packet.write(10);
        packet.writeMapleAsciiString("You have received " + recv + " training points, for the accumulated total of " + total + " training points.");

        return packet.getPacket();
    }

    public static byte[] HexSend(String a, SendPacketOpcode name) {
        final WritingPacket packet = new WritingPacket();
        if (name != null) {
            packet.writeShort(name.getValue());
        }
        packet.write(HexTool.getByteArrayFromHexString(a));
        return packet.getPacket();
    }

    public static byte[] Mulunground(String a) {
        final WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.BOSS_ENV.getValue());
        packet.write(0x0C);
        packet.writeMapleAsciiString(a);
        packet.writeInt(0);
        return packet.getPacket();
    }

    public static byte[] MulungList(List<String> name, List<Long> time) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.MULUNG_LIST.getValue());
        packet.writeInt(name.size());
        for (int i = 0; i < name.size(); i++) {
            packet.writeShort(i + 1);
            packet.writeMapleAsciiString((String) name.get(i));
            packet.writeLong(((Long) time.get(i)).longValue());
        }
        System.out.println(name.size());
        return packet.getPacket();
    }

    public static byte[] MulungEnergy(int energy) {
        WritingPacket packet = new WritingPacket();

        packet.writeShort(SendPacketOpcode.MULUNG_ENERGY.getValue());

        packet.writeMapleAsciiString("energy");
        packet.writeMapleAsciiString(String.valueOf(energy));

        return packet.getPacket();
    }

    public static byte[] getInternetCafe(byte type, int time) {
        WritingPacket mplew = new WritingPacket();
        //0A 00 03 3C 00 00 00
        mplew.writeShort(SendPacketOpcode.INTERNET_CAFE.getValue());

        mplew.write(type); //2, 3 = 프리미엄 피시방 활성화 / 이외코드 = 피시방 정량 시간 만료
        mplew.writeInt(time); //시간 계산 EX) 60 = 1시간, 30 = 30분, 1 = 1분
        return mplew.getPacket();
    }

    public static byte[] pvpCool(int cid, List<Integer> damage) {
        WritingPacket mplew = new WritingPacket();

        mplew.writeShort(460);
        mplew.writeInt(cid);
        mplew.write(damage.size());
        for (Integer damages : damage) {
            mplew.writeInt(damages);
        }
        return mplew.getPacket();
    }

    public static byte[] getPVPHPBar(int cid, int hp, int maxHp) {
        final WritingPacket mplew = new WritingPacket();

        mplew.writeShort(562);
        mplew.writeInt(cid);
        mplew.writeInt(hp);
        mplew.writeInt(maxHp);

        return mplew.getPacket();
    }

    public static byte[] SkillUseResult(int skillid) {
        WritingPacket p = new WritingPacket();
        p.writeShort(SendPacketOpcode.SkillUseResult.getValue());
        p.write(skillid == 2221011 ? 1 : 0);
        return p.getPacket();
    }

    public static byte[] AddWreckage(int cid, Point pos, int duration, int oid, int skillID, int count) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(434);
        packet.writeInt(cid);
        packet.writeInt(pos.x);
        packet.writeInt(pos.y);
        packet.writeInt(duration);
        packet.writeInt(oid);
        packet.writeInt(skillID);
        packet.writeInt(0); //type
        packet.writeInt(count); //버프 효과
        return packet.getPacket();
    }

    public static byte[] DelWreckage(int cid, List<MapleWreckage> oid, boolean useSkill) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(435);
        packet.writeInt(cid);
        packet.writeInt(oid.size());
        packet.write(useSkill ? 0 : 1); // 1 : timeOut
        oid.forEach(o -> {
            packet.writeInt(o.getObjectId());
        });
        return packet.getPacket();
    }

    public static byte[] EvanMagicWreckage(int cid, List<Integer> mobList, List<MapleWreckage> wreakageList, int skillID) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.ABSORB_DF.getValue());
        packet.write(0); // byMob
        packet.writeInt(cid); // targetID
        packet.writeInt(24); // forceAtomType
        packet.write(1); // toMob
        packet.writeInt(mobList.size());
        mobList.forEach(m -> {
            packet.writeInt(m);
        });
        packet.writeInt(skillID);

        for (int i = 0; i < wreakageList.size(); ++i) {
            packet.write(1); // 0이될때까지 반복
            packet.writeInt(i + 2); // key
            packet.writeInt(1); // inc
            packet.writeInt(28 + i); // firstImpact
            packet.writeInt(Randomizer.rand(3, 4)); // secondImpact
            packet.writeInt(Randomizer.rand(309, 342)); // angle
            packet.writeInt(0); // startDelay
            packet.writeInt(wreakageList.get(i).getPosition().x); //startX
            packet.writeInt(wreakageList.get(i).getPosition().y); // startY
            packet.writeInt((int) System.currentTimeMillis());
            packet.writeInt(0); // maxHitCount
            packet.writeInt(0); // effectIdx
        }
        packet.write(0); // 반복 종료
        return packet.getPacket();
    }

    public static byte[] setDamageSkin(MapleCharacter chr, int skinId) {
        WritingPacket packet = new WritingPacket();
        if ((GameConstants.getDamageSkinItemByNumber(skinId) / 10000) == 568) {
            packet.writeShort(SendPacketOpcode.SHOW_PREMIUM_DAMAGE_SKIN.getValue());
        } else {
            packet.writeShort(SendPacketOpcode.SHOW_DAMAGE_SKIN.getValue());
        }
        packet.writeInt(chr.getId());
        packet.writeInt(skinId);

        return packet.getPacket();
    }

    public static byte[] setFreeJobChangeResult(byte value) {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(SendPacketOpcode.FREE_JOB_RESULT.getValue());
        /*
         * 0 :
         * 1 : 자유전직이 불가능한 직업군입니다.
         * 2 : 알 수 없는 오류로 전직에 실패 하였습니다.
         * 3 : 자유전직 비용이 부족합니다.
         * 4 : 해당 직업군으로는 자유전직을 할 수 없습니다.
         * 5 : 아직 전직 하실수 없습니다. 잠시후 다시 시도해주세요
         * 6 : 자유 전직은 하루에 한번만 진행 가능합니다. 12시이후에 다시 시도하여 주세요
         * 7 : 자유전직 후 장비 상자를 지급해드리고 있으나 빈 공간이 부족합니다. 소비 창 1칸을 비우고 다시 시도해주세요
         * */

        packet.write(value);

        return packet.getPacket();
    }

    public static byte[] onFinalAttackRequest(final MapleCharacter chr, final int skillId, final int finalSkillId,
            final int delay, final int targetId, final int userRequestTime, final int weaponIdx) {
        WritingPacket p = new WritingPacket();
        p.writeShort(SendPacketOpcode.FINAL_ATTACK_REQUEST.getValue());
        p.writeInt(skillId);
        p.writeInt(skillId == 32121004 ? 32121011 : skillId == 2121007 ? 2120013 : skillId == 2221007 ? 2220014 : finalSkillId);
        if (chr.getJob() == 3212) {
            p.writeInt(weaponIdx);
        } else {
            p.writeInt(MapleWeaponType.STAFF == GameConstants.getWeaponType(chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11).getItemId()) ? weaponIdx + 1 : MapleWeaponType.SWORD2H == GameConstants.getWeaponType(chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11).getItemId()) ? weaponIdx + 10 : weaponIdx);
        }
        p.writeInt(delay);
        p.writeInt(targetId);
        p.writeInt(userRequestTime);
        return p.getPacket();
    }

    public static byte[] onFinalAttackRequest(final MapleCharacter chr, final int skillId, final int finalSkillId,
            final int delay, final int targetId, final int userRequestTime, final int weaponIdx, int direction, Point position) {
        WritingPacket p = new WritingPacket();
        p.writeShort(SendPacketOpcode.FINAL_ATTACK_REQUEST.getValue());
        p.writeInt(skillId);
        p.writeInt(finalSkillId);
        p.writeInt(weaponIdx);
        p.writeInt(delay);
        p.writeInt(targetId);
        p.writeInt(userRequestTime);
        /* 좌표 업데이트*/
        p.write(direction);
        p.writePos(position);
        return p.getPacket();
    }

    public static byte[] setSlowDown() {
        WritingPacket packet = new WritingPacket();
        packet.writeShort(739);
        packet.writeShort(30);
        packet.writeShort(360); // or 300
        return packet.getPacket();
    }

}
