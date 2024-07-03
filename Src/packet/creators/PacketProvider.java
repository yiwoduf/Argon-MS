/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package packet.creators;

import client.stats.*;
import constants.GameConstants;
import client.MapleClient;
import client.MaplePet;
import client.MapleCharacter;
import client.MapleQuestStatus;
import client.items.*;
import client.skills.ISkill;
import client.skills.InnerSkillValueHolder;
import client.skills.SkillEntry;
import client.skills.SkillFactory;

import java.math.BigInteger;

import launch.holder.MapleCoolDownValueHolder;
import packet.transfer.write.WritingPacket;
import server.items.ItemInformation;
import server.movement.LifeMovementFragment;
import server.shops.AbstractPlayerStore;
import server.shops.IMapleCharacterShop;
import server.shops.MapleShopItem;
import tools.BitTools;
import tools.HexTool;
import tools.KoreanDateUtil;
import tools.Triple;

import java.util.Map.Entry;
import java.util.*;

import server.items.MapleRing;
import server.quest.MapleQuest;
import tools.Pair;
import tools.RandomStream.Randomizer;

public class PacketProvider {
    
    public static final byte unk1[] = new byte[]{(byte) 0x00, (byte) 0x40, (byte) 0xE0, (byte) 0xFD};
    public static final byte unk2[] = new byte[]{(byte) 0x3B, (byte) 0x37, (byte) 0x4F, (byte) 0x01};
    
    public final static long FT_UT_OFFSET = 116445060000000000L; //KST   (GMT + 9:00)
    public final static long MAX_TIME = 150842304000000000L; //00 80 05 BB 46 E6 17 02
    public final static long ZERO_TIME = 94354848000000000L; //00 40 E0 FD 3B 37 4F 01
    public final static long ZERO_TIME_REVERSE = -153052018564450501L; //3B 37 4F 01 00 40 E0 FD
    public final static long PERMANENT = 150841440000000000L; // 00 C0 9B 90 7D E5 17 02

    public static final long getKoreanTimestamp(final long realTimestamp) {
        return getTime(realTimestamp);
    }
    
    public static final long getTime(long realTimestamp) {
        if (realTimestamp == -1) {
            return MAX_TIME;
        } else if (realTimestamp == -2) {
            return ZERO_TIME;
        } else if (realTimestamp == -3) {
            return PERMANENT;
        } else if (realTimestamp == -4) {
            return ZERO_TIME_REVERSE;
        }
        return ((realTimestamp * 10000) + FT_UT_OFFSET);
    }
    
    public static void addZeroQuestInfo(final WritingPacket w, final MapleCharacter chr) {
        w.write(HexTool.getByteArrayFromHexString("01 18 01 5C 7C 00 00 09 00 31 30 30 30 30 30 30 30 30 00 00 00 00 09 00 31 30 31 30 30 30 30 30 30 A5 81 00 00 00 00 A6 81 00 00 00 00 40 83 00 00 01 00 34 41 83 00 00 01 00 34 42 83 00 00 01 00 32 F1 81 00 00 00 00 F3 81 00 00 00 00 40 84 00 00 01 00 30 41 84 00 00 01 00 30 42 84 00 00 01 00 30 43 84 00 00 03 00 32 36 36 08 84 00 00 02 00 39 39 DB 81 00 00 00 00 09 84 00 00 01 00 30 0A 84 00 00 01 00 30 0B 84 00 00 01 00 30 0C 84 00 00 01 00 30 0D 84 00 00 01 00 30 54 83 00 00 01 00 32 0E 84 00 00 01 00 30 55 83 00 00 01 00 30 0F 84 00 00 01 00 30 56 83 00 00 01 00 32 10 84 00 00 01 00 30 57 83 00 00 01 00 30 11 84 00 00 01 00 30 58 83 00 00 01 00 30 12 84 00 00 01 00 30 59 83 00 00 01 00 30 13 84 00 00 03 00 32 36 36 5A 83 00 00 01 00 30 14 84 00 00 01 00 30 5B 83 00 00 01 00 30 15 84 00 00 01 00 30 5C 83 00 00 01 00 30 3A 84 00 00 01 00 30 3B 84 00 00 01 00 30 3C 84 00 00 01 00 30 3D 84 00 00 01 00 30 3E 84 00 00 01 00 30 3F 84 00 00 03 00 31 30 30 21 0B 00 00 01 00 31 E6 0A 00 00 01 00 31 94 0A 00 00 01 00 31 0E 51 00 00 06 00 C5 BD BB F6 C1 DF 9B 0F 00 00 01 00 30 18 51 00 00 01 00 30 A0 99 00 00 00 00 A1 99 00 00 00 00 A2 99 00 00 00 00 C1 99 00 00 00 00 84 99 00 00 00 00 A3 99 00 00 00 00 C2 99 00 00 00 00 85 99 00 00 00 00 A4 99 00 00 00 00 A5 99 00 00 00 00 86 99 00 00 00 00 87 99 00 00 00 00 A6 99 00 00 00 00 88 99 00 00 00 00 A7 99 00 00 00 00 89 99 00 00 00 00 A8 99 00 00 00 00 8A 99 00 00 00 00 A9 99 00 00 00 00 8B 99 00 00 00 00 AA 99 00 00 00 00 8C 99 00 00 00 00 AB 99 00 00 00 00 8D 99 00 00 00 00 AC 99 00 00 00 00 8E 99 00 00 00 00 AD 99 00 00 00 00 8F 99 00 00 00 00 AE 99 00 00 00 00 90 99 00 00 00 00 AF 99 00 00 00 00 91 99 00 00 00 00 B0 99 00 00 00 00 92 99 00 00 00 00 B1 99 00 00 00 00 93 99 00 00 00 00 B2 99 00 00 00 00 94 99 00 00 00 00 B3 99 00 00 00 00 95 99 00 00 00 00 B4 99 00 00 00 00 96 99 00 00 00 00 B5 99 00 00 00 00 97 99 00 00 00 00 B6 99 00 00 00 00 98 99 00 00 00 00 B7 99 00 00 06 00 30 31 39 30 30 30 6B 1B 00 00 01 00 30 8A 1B 00 00 09 00 33 32 32 30 30 30 30 30 30 99 99 00 00 00 00 B8 99 00 00 00 00 82 9C 00 00 01 00 32 9A 99 00 00 00 00 9B 99 00 00 00 00 BA 99 00 00 00 00 45 9C 00 00 01 00 31 9C 99 00 00 00 00 84 9C 00 00 01 00 31 9D 99 00 00 00 00 47 9C 00 00 01 00 31 9E 99 00 00 00 00 4A 1C 00 00 01 00 30 9F 99 00 00 03 00 30 31 36 4B 1C 00 00 08 00 31 34 2F 30 35 2F 30 34 2D 1C 00 00 01 00 30 4B 9C 00 00 01 00 31 E0 9D 00 00 01 00 31 30 1C 00 00 01 00 30 58 1B 00 00 01 00 73 31 1C 00 00 08 00 31 34 2F 30 35 2F 30 34 C5 1D 00 00 00 00 40 9E 00 00 01 00 31 41 9E 00 00 01 00 31 5B 1B 00 00 08 00 31 35 2F 30 37 2F 30 34 72 1C 00 00 01 00 30 5C 1B 00 00 01 00 32 42 9E 00 00 01 00 35 82 1E 00 00 06 00 30 30 30 30 30 30 A0 9E 00 00 01 00 31 44 9E 00 00 01 00 30 A1 9E 00 00 01 00 31 A2 9E 00 00 01 00 31 B3 9C 00 00 01 00 31 A3 9E 00 00 01 00 31 B4 9C 00 00 01 00 31 A4 9E 00 00 01 00 31 B5 9C 00 00 01 00 31 7A 1C 00 00 07 00 33 37 30 30 31 33 35 B6 9C 00 00 01 00 31 13 9D 00 00 01 00 31 A6 9E 00 00 01 00 31 03 9F 00 00 01 00 31 B7 9C 00 00 01 00 31 14 9D 00 00 01 00 31 A7 9E 00 00 01 00 31 04 9F 00 00 01 00 31 7C 1C 00 00 07 00 33 31 31 30 30 30 30 15 9D 00 00 01 00 31 A8 9E 00 00 01 00 31 05 9F 00 00 01 00 31 62 9F 00 00 01 00 31 16 9D 00 00 01 00 31 A9 9E 00 00 01 00 31 06 9F 00 00 01 00 31 63 9F 00 00 01 00 31 17 9D 00 00 01 00 31 07 9F 00 00 01 00 31 64 9F 00 00 01 00 32 18 9D 00 00 01 00 31 08 9F 00 00 01 00 31 65 9F 00 00 01 00 30 19 9D 00 00 01 00 31 09 9F 00 00 01 00 31 77 9D 00 00 01 00 31 0A 9F 00 00 01 00 31 78 9D 00 00 01 00 31 0B 9F 00 00 01 00 31 79 9D 00 00 01 00 31 0C 9F 00 00 01 00 31 7A 9D 00 00 01 00 31 7B 9D 00 00 01 00 31 7C 9D 00 00 01 00 30 7D 9D 00 00 01 00 31 DB 9D 00 00 01 00 31 DD 9D 00 00 01 00 31 DE 9D 00 00 01 00 31 3B 9E 00 00 01 00 31 DF 9D 00 00 01 00 31 3C 9E 00 00 01 00 31 3D 9E 00 00 01 00 31 18 1F 00 00 01 00 30 3E 9E 00 00 01 00 31 19 1F 00 00 08 00 31 34 2F 30 35 2F 30 34 3F 9E 00 00 01 00 31 DC 1E 00 00 00 00 DD 1E 00 00 01 00 32 1B 1F 00 00 01 00 30 66 A1 00 00 01 00 34 1C 1F 00 00 08 00 31 34 2F 30 35 2F 30 34 98 A0 00 00 06 00 30 30 39 30 30 39 63 25 00 00 01 00 30 B1 A3 00 00 00 00 B3 A3 00 00 01 00 30 B8 A3 00 00 01 00 30 6D 65 00 00 01 00 30 76 A4 00 00 01 00 30 40 67 00 00 00 00 41 67 00 00 00 00 23 67 00 00 00 00 42 67 00 00 00 00 A0 67 00 00 00 00 43 67 00 00 00 00 A1 67 00 00 00 00 44 67 00 00 00 00 A2 67 00 00 00 00 45 67 00 00 00 00 A3 67 00 00 00 00 46 67 00 00 00 00 E2 67 00 00 00 00 A4 67 00 00 00 00 47 67 00 00 00 00 48 67 00 00 00 00 49 67 00 00 00 00 4A 67 00 00 00 00 9A 65 00 00 09 00 32 34 30 30 30 30 30 30 30 8D 67 00 00 00 00 8F 67 00 00 00 00 90 67 00 00 00 00 82 69 00 00 01 00 34 00 2A 00 00 00 00 83 69 00 00 01 00 35 93 67 00 00 00 00 20 2A 00 00 00 00 94 67 00 00 00 00 02 2A 00 00 00 00 95 67 00 00 00 00 38 67 00 00 00 00 96 67 00 00 00 00 88 69 00 00 01 00 31 99 67 00 00 00 00 A9 29 00 00 03 00 31 38 30 AA 29 00 00 00 00 3E 67 00 00 00 00 3F 67 00 00 00 00 9D 67 00 00 00 00 0A 2A 00 00 00 00 9E 67 00 00 00 00 EC 29 00 00 00 00 9F 67 00 00 00 00 0C 2A 00 00 00 00 EE 29 00 00 00 00 0E 2A 00 00 00 00 F0 29 00 00 00 00 10 2A 00 00 00 00 F2 29 00 00 00 00 12 2A 00 00 00 00 F4 29 00 00 00 00 14 2A 00 00 00 00 F6 29 00 00 00 00 16 2A 00 00 00 00 F8 29 00 00 00 00 18 2A 00 00 00 00 FA 29 00 00 00 00 1A 2A 00 00 00 00 FC 29 00 00 00 00 1C 2A 00 00 00 00 B5 AA 00 00 00 00 FE 29 00 00 00 00 1E 2A 00 00 00 00 64 2D 00 00 01 00 30 4D 71 00 00 00 00 4E 71 00 00 00 00 53 71 00 00 00 00 57 71 00 00 00 00 4C 75 00 00 09 00 31 30 30 30 30 30 30 30 30 4D 75 00 00 05 00 73 74 61 72 74 38 75 00 00 00 00 CD 36 00 00 09 00 33 32 37 30 30 30 30 30 30 17 37 00 00 09 00 31 30 30 30 30 30 30 30 30 21 7A 00 00 09 00 31 30 31 30 30 30 30 30 30 0E 7A 00 00 06 00 30 36 37 30 30 30 5F 38 00 00 00 00 2C 3B 00 00 00 00 D6 79 00 00 01 00 30 D7 79 00 00 01 00 30 65 7C 00 00 08 00 31 34 2F 30 37 2F 31 30 7D 79 00 00 00 00 66 7C 00 00 01 00 31 DB 79 00 00 01 00 30 DE 79 00 00 00 00 6B 7C 00 00 00 00 01 25 01 26 7F 00 00 00 5A 82 9F E8 8E CE 01 1D 83 00 00 00 D0 3C 03 47 3F D1 01 9A 0F 00 00 00 6A 7F 37 F2 85 CE 01 70 17 00 00 00 3A 2C 8F 32 E9 CE 01 59 98 00 00 00 60 BE 18 8B C5 D0 01 40 9C 00 00 00 AA 59 6C C3 83 CE 01 41 9C 00 00 00 36 E0 B3 C3 83 CE 01 89 1B 00 00 00 D2 29 28 E2 83 CE 01 42 9C 00 00 00 C2 66 FB C3 83 CE 01 43 9C 00 00 00 4E ED 42 C4 83 CE 01 44 9C 00 00 00 66 FA D1 C4 83 CE 01 A4 9C 00 00 00 5C 4C E6 E0 83 CE 01 A5 9C 00 00 00 46 A3 E0 E1 83 CE 01 53 1B 00 00 00 EE 96 A8 65 8D CE 01 A6 9C 00 00 00 4A 6B F3 E4 83 CE 01 A7 9C 00 00 00 7A 85 11 E6 83 CE 01 A8 9C 00 00 00 06 0C 59 E6 83 CE 01 A9 9C 00 00 00 2A 71 20 F0 83 CE 01 AA 9C 00 00 00 70 34 44 F0 83 CE 01 AB 9C 00 00 00 7E F0 05 FB 83 CE 01 08 9D 00 00 00 28 6B 67 A1 84 CE 01 AC 9C 00 00 00 7E F0 05 FB 83 CE 01 09 9D 00 00 00 6E 2E 8B A1 84 CE 01 AD 9C 00 00 00 24 E8 65 FD 83 CE 01 0A 9D 00 00 00 D4 8E 63 A8 84 CE 01 AE 9C 00 00 00 3C F5 F4 FD 83 CE 01 0B 9D 00 00 00 1A 52 87 A8 84 CE 01 AF 9C 00 00 00 56 66 0D 00 84 CE 01 0C 9D 00 00 00 F4 2B 18 AF 84 CE 01 72 9C 00 00 00 80 6B EA C6 83 CE 01 B0 9C 00 00 00 56 66 0D 00 84 CE 01 0D 9D 00 00 00 F6 8F A1 B0 84 CE 01 73 9C 00 00 00 82 CF 73 C8 83 CE 01 0E 9D 00 00 00 F8 F3 2A B2 84 CE 01 74 9C 00 00 00 C8 92 97 C8 83 CE 01 0F 9D 00 00 00 60 B8 8C BA 84 CE 01 6C 9D 00 00 00 9C 42 F0 53 85 CE 01 00 9F 00 00 00 E0 F0 8F 60 8C CE 01 75 9C 00 00 00 CA F6 20 CA 83 CE 01 10 9D 00 00 00 68 48 B2 C0 84 CE 01 6D 9D 00 00 00 28 C9 37 54 85 CE 01 67 1E 00 00 00 E4 58 FD C3 1F D1 01 76 9C 00 00 00 9C 40 8C CA 83 CE 01 11 9D 00 00 00 3A 92 1D C1 84 CE 01 6E 9D 00 00 00 B4 4F 7F 54 85 CE 01 01 9F 00 00 00 D8 A6 2D 7E 8C CE 01 77 9C 00 00 00 28 C7 D3 CA 83 CE 01 12 9D 00 00 00 80 55 41 C1 84 CE 01 6F 9D 00 00 00 FA 12 A3 54 85 CE 01 78 9C 00 00 00 E6 CB C2 CD 83 CE 01 70 9D 00 00 00 18 4C CE 59 85 CE 01 B0 1D 00 00 00 80 6F 12 0E C3 D0 01 60 9F 00 00 00 98 0F A6 82 8C CE 01 79 9C 00 00 00 72 52 0A CE 83 CE 01 71 9D 00 00 00 EE 5D 4C 5D 85 CE 01 61 9F 00 00 00 DE D2 C9 82 8C CE 01 7A 9C 00 00 00 B8 15 2E CE 83 CE 01 72 9D 00 00 00 34 21 70 5D 85 CE 01 7B 9C 00 00 00 DC 7A F5 D7 83 CE 01 73 9D 00 00 00 0A 33 EE 60 85 CE 01 D0 9D 00 00 00 DA 30 DD EE 85 CE 01 7C 9C 00 00 00 24 A2 A2 D9 83 CE 01 74 9D 00 00 00 A4 BB BA 8F 85 CE 01 D1 9D 00 00 00 F2 3D 6C EF 85 CE 01 7D 9C 00 00 00 6A 65 C6 D9 83 CE 01 75 9D 00 00 00 22 29 22 97 85 CE 01 D2 9D 00 00 00 42 3B 02 1B 86 CE 01 00 A0 00 00 00 74 5F A1 7D 88 CE 01 7E 9C 00 00 00 FA B3 20 DD 83 CE 01 76 9D 00 00 00 22 29 22 97 85 CE 01 D3 9D 00 00 00 CE C1 49 1B 86 CE 01 E2 9F 00 00 00 FA 12 A3 54 85 CE 01 01 A0 00 00 00 B2 F0 6F 2A 89 CE 01 7F 9C 00 00 00 86 3A 68 DD 83 CE 01 D4 9D 00 00 00 A8 9B DA 21 86 CE 01 C4 9F 00 00 00 66 FA D1 C4 83 CE 01 E3 9F 00 00 00 34 21 70 5D 85 CE 01 02 A0 00 00 00 DA 1D 4A 37 89 CE 01 D5 9D 00 00 00 EE 5E FE 21 86 CE 01 CF 1E 00 00 00 F4 68 6B 32 E9 CE 01 C5 9F 00 00 00 C8 92 97 C8 83 CE 01 E4 9F 00 00 00 0A 33 EE 60 85 CE 01 03 A0 00 00 00 E4 9E 31 4B 8A CE 01 D6 9D 00 00 00 0C 98 29 27 86 CE 01 C6 9F 00 00 00 28 C7 D3 CA 83 CE 01 E5 9F 00 00 00 A4 BB BA 8F 85 CE 01 04 A0 00 00 00 C6 09 9A 1C 8B CE 01 D7 9D 00 00 00 52 5B 4D 27 86 CE 01 34 9E 00 00 00 EE 01 E0 33 86 CE 01 C7 9F 00 00 00 B8 15 2E CE 83 CE 01 E6 9F 00 00 00 22 29 22 97 85 CE 01 D8 9D 00 00 00 A2 12 20 2F 86 CE 01 35 9E 00 00 00 06 0F 6F 34 86 CE 01 C8 9F 00 00 00 6A 65 C6 D9 83 CE 01 D9 9D 00 00 00 E8 D5 43 2F 86 CE 01 36 9E 00 00 00 92 95 B6 34 86 CE 01 B4 1E 00 00 00 4E 1F 95 19 7B D0 01 C9 9F 00 00 00 86 3A 68 DD 83 CE 01 37 9E 00 00 00 48 0B 32 F6 86 CE 01 D4 1E 00 00 00 CE 2F 0C 63 FE CE 01 1B 1E 00 00 00 C8 06 89 C2 4E D1 01 38 9E 00 00 00 88 8B 5E 27 87 CE 01 39 9E 00 00 00 EA 3B 31 BA 87 CE 01 0A A0 00 00 00 F6 98 E3 9A 8B CE 01 3A 9E 00 00 00 0C 3D 6F C2 87 CE 01 EC 9F 00 00 00 F2 3D 6C EF 85 CE 01 0B A0 00 00 00 60 C1 CE A4 8B CE 01 22 A1 00 00 00 74 5E EF B8 87 CE 01 60 A1 00 00 00 E4 9E 31 4B 8A CE 01 98 9E 00 00 00 74 5F A1 7D 88 CE 01 CE 9F 00 00 00 46 A3 E0 E1 83 CE 01 ED 9F 00 00 00 CE C1 49 1B 86 CE 01 0C A0 00 00 00 A8 D1 20 DC 8B CE 01 23 A1 00 00 00 16 76 2F 29 87 CE 01 99 9E 00 00 00 B2 F0 6F 2A 89 CE 01 CF 9F 00 00 00 06 0C 59 E6 83 CE 01 EE 9F 00 00 00 EE 5E FE 21 86 CE 01 0D A0 00 00 00 E0 F0 8F 60 8C CE 01 24 A1 00 00 00 8C 6B 7E B9 87 CE 01 9A 9E 00 00 00 DA 1D 4A 37 89 CE 01 D0 9F 00 00 00 7E F0 05 FB 83 CE 01 EF 9F 00 00 00 52 5B 4D 27 86 CE 01 0E A0 00 00 00 D8 A6 2D 7E 8C CE 01 25 A1 00 00 00 8C 6B 7E B9 87 CE 01 63 A1 00 00 00 6A 9D 70 1D 8B CE 01 C0 A1 00 00 00 54 B0 0B 84 8C CE 01 9B 9E 00 00 00 CC 91 A2 4A 8A CE 01 D1 9F 00 00 00 3C F5 F4 FD 83 CE 01 F0 9F 00 00 00 E8 D5 43 2F 86 CE 01 26 A1 00 00 00 5E B5 E9 B9 87 CE 01 64 A1 00 00 00 E0 7A B2 1E 8B CE 01 9C 9E 00 00 00 12 55 C6 4A 8A CE 01 D2 9F 00 00 00 56 66 0D 00 84 CE 01 27 A1 00 00 00 CE 4E 82 27 87 CE 01 65 A1 00 00 00 0C CD BD 1C 8B CE 01 9D 9E 00 00 00 E4 9E 31 4B 8A CE 01 28 A1 00 00 00 BA 09 06 2A 87 CE 01 9E 9E 00 00 00 3A 83 52 1C 8B CE 01 29 A1 00 00 00 4A 70 6D BC 87 CE 01 86 A1 00 00 00 54 69 96 9B 8B CE 01 9F 9E 00 00 00 C6 09 9A 1C 8B CE 01 FC 9E 00 00 00 52 05 0D 9A 8B CE 01 8F A0 00 00 00 DE 25 F4 C1 84 CE 01 2A A1 00 00 00 D0 B2 0B 29 87 CE 01 87 A1 00 00 00 E2 53 67 9D 8B CE 01 FD 9E 00 00 00 F6 98 E3 9A 8B CE 01 14 A0 00 00 00 DE D2 C9 82 8C CE 01 90 A0 00 00 00 C8 7C EE C2 84 CE 01 88 A1 00 00 00 54 69 96 9B 8B CE 01 FE 9E 00 00 00 60 C1 CE A4 8B CE 01 F6 9F 00 00 00 92 95 B6 34 86 CE 01 91 A0 00 00 00 82 B9 CA C2 84 CE 01 89 A1 00 00 00 FA 60 F6 9D 8B CE 01 FF 9E 00 00 00 A8 D1 20 DC 8B CE 01 D8 9F 00 00 00 6E 2E 8B A1 84 CE 01 F7 9F 00 00 00 48 0B 32 F6 86 CE 01 92 A0 00 00 00 24 E9 17 C2 84 CE 01 2D A1 00 00 00 A8 40 20 BD 87 CE 01 8A A1 00 00 00 CA 46 D8 9C 8B CE 01 D9 9F 00 00 00 1A 52 87 A8 84 CE 01 F8 9F 00 00 00 88 8B 5E 27 87 CE 01 DA 9F 00 00 00 F8 F3 2A B2 84 CE 01 F9 9F 00 00 00 EA 3B 31 BA 87 CE 01 2F A1 00 00 00 8E CF 07 BB 87 CE 01 DB 9F 00 00 00 60 B8 8C BA 84 CE 01 FA 9F 00 00 00 0C 3D 6F C2 87 CE 01 30 A1 00 00 00 D4 92 2B BB 87 CE 01 8D A1 00 00 00 E2 3C 0C D3 8B CE 01 DC 9F 00 00 00 80 55 41 C1 84 CE 01 8E A1 00 00 00 9E DD 71 D4 8B CE 01 97 A0 00 00 00 E0 89 7D C3 84 CE 01 8F A1 00 00 00 E2 3C 0C D3 8B CE 01 5A A0 00 00 00 3C F5 F4 FD 83 CE 01 90 A1 00 00 00 9E DD 71 D4 8B CE 01 9A A0 00 00 00 DE 25 F4 C1 84 CE 01 35 A1 00 00 00 8C 6B 7E B9 87 CE 01 54 A1 00 00 00 AE 58 77 45 8A CE 01 9B A0 00 00 00 98 62 D0 C1 84 CE 01 36 A1 00 00 00 8C 6B 7E B9 87 CE 01 55 A1 00 00 00 3A DF BE 45 8A CE 01 93 A1 00 00 00 9C 34 D7 73 8C CE 01 56 A1 00 00 00 AE 58 77 45 8A CE 01 94 A1 00 00 00 86 8B D1 74 8C CE 01 57 A1 00 00 00 98 AF 71 46 8A CE 01 95 A1 00 00 00 9C 34 D7 73 8C CE 01 5F A0 00 00 00 6A AB 89 FD 83 CE 01 58 A1 00 00 00 AE 58 77 45 8A CE 01 96 A1 00 00 00 70 E2 CB 75 8C CE 01 59 A1 00 00 00 3C 43 48 47 8A CE 01 C5 A3 00 00 00 6A C2 E4 C7 83 CE 01 5A A1 00 00 00 E0 D6 1E 48 8A CE 01 C6 A3 00 00 00 B0 85 08 C8 83 CE 01 5B A1 00 00 00 F8 E3 AD 48 8A CE 01 B8 A1 00 00 00 5A EF 3A 40 89 CE 01 9A A1 00 00 00 C4 61 B1 80 8C CE 01 B9 A1 00 00 00 5A EF 3A 40 89 CE 01 5D A1 00 00 00 E4 9E 31 4B 8A CE 01 BA A1 00 00 00 A0 B2 5E 40 89 CE 01 C9 A3 00 00 00 F6 48 2C C8 83 CE 01 5E A1 00 00 00 40 0B 5B 4A 8A CE 01 BC A1 00 00 00 5A EF 3A 40 89 CE 01 AC A3 00 00 00 4E 98 B5 AD 4E CF 01 BD A1 00 00 00 5A EF 3A 40 89 CE 01 BE A1 00 00 00 C6 09 9A 1C 8B CE 01 BF A1 00 00 00 D8 A6 2D 7E 8C CE 01 AF A3 00 00 00 5A EF 3A 40 89 CE 01 B0 A3 00 00 00 F6 DF 58 83 8C CE 01 B2 A3 00 00 00 A0 B2 5E 40 89 CE 01 67 65 00 00 00 02 94 89 3C D3 CE 01 B4 A3 00 00 00 86 3A 68 DD 83 CE 01 B5 A3 00 00 00 CC FD 8B DD 83 CE 01 6E 65 00 00 00 5A B6 53 63 FE CE 01 40 67 00 00 00 AE 25 A7 0D C3 D0 01 43 67 00 00 00 BC E8 A3 97 B6 D0 01 54 65 00 00 00 94 D2 24 55 B6 D0 01 2B 67 00 00 00 0C F2 31 C7 83 CE 01 2E 67 00 00 00 98 78 79 C7 83 CE 01 90 67 00 00 00 EE A8 E9 8C C5 D0 01 54 67 00 00 00 DA 73 8A C4 83 CE 01 35 67 00 00 00 98 78 79 C7 83 CE 01 A5 29 00 00 00 B0 48 A0 4D DE CF 01 79 67 00 00 00 BC D0 65 3C D3 CE 01 3B 67 00 00 00 12 C8 8D 3E 89 CE 01 A8 29 00 00 00 9A C9 E4 3C 04 CF 01 3E 67 00 00 00 62 E0 03 9A B6 D0 01 3F 67 00 00 00 AE 25 A7 0D C3 D0 01 CE AA 00 00 00 C8 06 89 C2 4E D1 01 1E 69 00 00 00 DA 73 8A C4 83 CE 01 BD 2B 00 00 00 94 B0 66 C4 83 CE 01 BE 2B 00 00 00 94 B0 66 C4 83 CE 01 79 2C 00 00 00 94 B0 66 C4 83 CE 01 BF 2B 00 00 00 0E 19 53 4E DE CF 01 6A 30 00 00 00 BA 79 B7 CF 83 CE 01 6B 30 00 00 00 BA 79 B7 CF 83 CE 01 6C 30 00 00 00 00 3D DB CF 83 CE 01 C0 36 00 00 00 F0 B3 BC 7E 8C CE 01 C1 36 00 00 00 94 B0 66 C4 83 CE 01 A3 36 00 00 00 DA 73 8A C4 83 CE 01 20 37 00 00 00 E2 05 14 54 85 CE 01 A4 36 00 00 00 20 F4 00 EF 85 CE 01 30 75 00 00 00 7C 81 79 67 8D CE 01 21 37 00 00 00 20 F4 00 EF 85 CE 01 22 37 00 00 00 BA 1F AF 2F 86 CE 01 A6 36 00 00 00 20 F4 00 EF 85 CE 01 32 75 00 00 00 C2 44 9D 67 8D CE 01 23 37 00 00 00 B0 2E 16 76 88 CE 01 A7 36 00 00 00 BA 79 B7 CF 83 CE 01 33 75 00 00 00 C2 44 9D 67 8D CE 01 A0 37 00 00 00 02 94 89 3C D3 CE 01 24 37 00 00 00 3E C0 90 9C 8B CE 01 A8 36 00 00 00 72 E2 58 28 87 CE 01 34 75 00 00 00 08 08 C1 67 8D CE 01 25 37 00 00 00 24 96 ED 82 8C CE 01 C9 36 00 00 00 42 E2 AB 3F 89 CE 01 AA 36 00 00 00 6A FF 08 E3 8E CE 01 35 75 00 00 00 08 08 C1 67 8D CE 01 36 75 00 00 00 94 8E 08 68 8D CE 01 AC 36 00 00 00 B6 93 0E 83 90 CE 01 37 75 00 00 00 DA 51 2C 68 8D CE 01 28 37 00 00 00 6A FF 08 E3 8E CE 01 0F 37 00 00 00 B0 C2 2C E3 8E CE 01 14 37 00 00 00 88 36 D0 5E 8D CE 01 80 79 00 00 00 A0 79 77 63 FE CE 01 16 37 00 00 00 20 37 AE C4 83 CE 01 B9 36 00 00 00 22 29 22 97 85 CE 01 81 79 00 00 00 A0 79 77 63 FE CE 01 06 39 00 00 00 76 07 18 04 58 D0 01 07 39 00 00 00 76 07 18 04 58 D0 01 F8 36 00 00 00 00 3D DB CF 83 CE 01 82 79 00 00 00 E6 3C 9B 63 FE CE 01 F9 36 00 00 00 1E B1 C6 66 8D CE 01 09 39 00 00 00 76 07 18 04 58 D0 01 0D 39 00 00 00 76 07 18 04 58 D0 01 0E 39 00 00 00 76 07 18 04 58 D0 01 1E 37 00 00 00 F8 50 49 A0 84 CE 01 62 7A 00 00 00 A2 14 6F C1 46 D0 01 0F 39 00 00 00 76 07 18 04 58 D0 01 1F 37 00 00 00 F8 50 49 A0 84 CE 01 08 7A 00 00 00 20 15 50 68 8D CE 01 30 39 00 00 00 D0 CA 03 C1 46 D0 01 09 7A 00 00 00 F6 85 50 E3 8E CE 01 68 3A 00 00 00 AE 25 A7 0D C3 D0 01 0A 7A 00 00 00 3C 49 74 E3 8E CE 01 69 3A 00 00 00 AE 25 A7 0D C3 D0 01 0B 7A 00 00 00 82 0C 98 E3 8E CE 01 8F 79 00 00 00 FE 49 2A 64 FE CE 01 0C 7A 00 00 00 82 0C 98 E3 8E CE 01 0D 7A 00 00 00 82 0C 98 E3 8E CE 01 C7 7B 00 00 00 94 B0 66 C4 83 CE 01 7C 79 00 00 00 14 64 C1 83 90 CE 01 7F 79 00 00 00 A0 79 77 63 FE CE 01 12 7D 00 00 00 6A FF 08 E3 8E CE 01 13 7D 00 00 00 BC D0 65 3C D3 CE 01"));
    }
    
    public static void addStartedQuestInfo(final WritingPacket w, final MapleCharacter chr) {
        final List<MapleQuestStatus> started = chr.getStartedQuests();
        w.write(1);
        w.writeShort(started.size());
        for (final MapleQuestStatus q : started) {
            w.writeInt(q.getQuest().getId()); //1.2.251+
            w.writeMapleAsciiString(q.getCustomData() != null ? q.getCustomData() : "");
        }
    }
    
    public static void addCompletedQuestInfo(final WritingPacket w, final MapleCharacter chr) {
        final List<MapleQuestStatus> completed = chr.getCompletedQuests();
        int time;
        w.write(1);
        short size = (short) completed.size();
        w.writeShort(size);
        for (final MapleQuestStatus q : completed) {
            w.writeInt(q.getQuest().getId()); //1.2.251+
            time = KoreanDateUtil.getQuestTimestamp(q.getCompletionTime());
            w.writeInt(time); // maybe start time
            w.writeInt(time); // completion time
        }
    }
    
    public static void addPlayerInfo(final WritingPacket packet, final MapleCharacter chr) {
        packet.writeLong(-1); //Flag.
        packet.write(chr.getBuffedValue(BuffStats.CTS_CombatOrders) != null ? 1 : 0);
        
        for (int i = 0; i < 3; i++) {
            packet.writeInt(0); // 펫 액티브 스킬 쿨타임
        }
        
        packet.write(0);
        for (int i = 0; i < 0; i++) {
            packet.writeInt(0); // tour?
        }
        
        packet.writeInt(0); // cooltime over
        for (int i = 0; i < 0; i++) {
            packet.writeInt(0); // key
            packet.writeLong(0); // value
        }
        
        packet.write(0);
        if (false) {
            packet.write(0); // unused

            packet.writeInt(0); // count
            for (int i = 0; i < 0; i++) {
                packet.writeLong(0); // unknown, but used
            }
            
            packet.writeInt(0); // count
            for (int i = 0; i < 0; i++) {
                packet.writeLong(0); // unused?
            }
        }
        
        PacketProvider.addPlayerStats(packet, chr, true);
        packet.write(chr.getBuddylist().getCapacity());

        /* 정령의 축복 */
        if (chr.getBlessOfFairyOrigin() != null) {
            packet.write(1);
            packet.writeMapleAsciiString(chr.getBlessOfFairyOrigin());
        } else {
            packet.write(0);
        }

        /* 여제의 축복 */
        if (chr.getBlessOfEmpressOrigin() != null) {
            packet.write(1);
            packet.writeMapleAsciiString(chr.getBlessOfEmpressOrigin());
        } else {
            packet.write(0);
        }
        packet.write(0); //여제의 강화

        addMoneyInfo(packet, chr);
        
        packet.writeInt(0); // count
        for (int i = 0; i < 0; i++) {
            // exp consume item
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeInt(0);
            packet.writeLong(0);
        }
        
        packet.writeInt(0); // count
        for (int i = 0; i < 0; i++) {
            //monster battle?
            packet.writeInt(0); // mobId
            packet.writeInt(0); // level
            packet.writeInt(0); // exp
            packet.writeInt(0); // ability1
            packet.writeInt(0); // ability2
            packet.writeInt(0); // ability3
            packet.write(0); // mobType
            packet.writeInt(0); // mainCharacterID
            packet.writeInt(0); // slotIndex
        }
        
        packet.writeInt(0); // MobSkillSlot?

        for (int i = 0; i < 3; i++) {
            packet.writeInt(0); // unknown, related to top
            packet.writeInt(0); // unknown, related to top
        }
        
        packet.writeInt(0);
        for (int i = 0; i < 0; i++) {
            packet.writeInt(0); // monsterBattleSkillID
        }
        
        packet.write(0); // bMonsterBattleLadderUser
        if (false) {
            /*
  this->nWorldID = CInPacket::Decode4(iPacket);
  v2->dwAccountID = CInPacket::Decode4(iPacket);
  v2->dwCharacterID = CInPacket::Decode4(iPacket);
  v2->nPoint = CInPacket::Decode4(iPacket);
  v2->nWin = CInPacket::Decode4(iPacket);
  v2->nDefeat = CInPacket::Decode4(iPacket);
  v2->nDraw = CInPacket::Decode4(iPacket);
  v2->nCountBattle = CInPacket::Decode4(iPacket);
  v2->nCountPVP = CInPacket::Decode4(iPacket);
  CInPacket::DecodeBuffer(iPacket, &v2->ftBPUpdateTime, 8u);
  CInPacket::DecodeBuffer(iPacket, &v2->ftPVPUpdateTime, 8u);
  CInPacket::DecodeBuffer(iPacket, &v2->ftRegisterDate, 8u);
             */
        }
        
        packet.write(0); // count
        for (int i = 0; i < 0; i++) // top ranking
        {
            /*
			  this->nWorldID = CInPacket::Decode4(iPacket);
  v2->dwAccountID = CInPacket::Decode4(iPacket);
  v2->dwCharacterID = CInPacket::Decode4(iPacket);
  v2->nPoint = CInPacket::Decode4(iPacket);
  v2->nWin = CInPacket::Decode4(iPacket);
  v2->nDefeat = CInPacket::Decode4(iPacket);
  v2->nDraw = CInPacket::Decode4(iPacket);
  v2->nCountBattle = CInPacket::Decode4(iPacket);
  v2->nCountPVP = CInPacket::Decode4(iPacket);
  CInPacket::DecodeBuffer(iPacket, &v2->ftBPUpdateTime, 8u);
  CInPacket::DecodeBuffer(iPacket, &v2->ftPVPUpdateTime, 8u);
  CInPacket::DecodeBuffer(iPacket, &v2->ftRegisterDate, 8u);
             */
        }
        
        packet.write(0); // count
        for (int i = 0; i < 0; i++) // user ranking
        {
            /*
			  this->nWorldID = CInPacket::Decode4(iPacket);
  v2->dwAccountID = CInPacket::Decode4(iPacket);
  v2->dwCharacterID = CInPacket::Decode4(iPacket);
  v2->nPoint = CInPacket::Decode4(iPacket);
  v2->nWin = CInPacket::Decode4(iPacket);
  v2->nDefeat = CInPacket::Decode4(iPacket);
  v2->nDraw = CInPacket::Decode4(iPacket);
  v2->nCountBattle = CInPacket::Decode4(iPacket);
  v2->nCountPVP = CInPacket::Decode4(iPacket);
  CInPacket::DecodeBuffer(iPacket, &v2->ftBPUpdateTime, 8u);
  CInPacket::DecodeBuffer(iPacket, &v2->ftPVPUpdateTime, 8u);
  CInPacket::DecodeBuffer(iPacket, &v2->ftRegisterDate, 8u);
             */
        }
        
        addInventoryInfo(packet, chr);
        
        addSkillInfo(packet, chr);
        addCoolDownInfo(packet, chr);
        
        if (GameConstants.isZero(chr.getJob())) {
            addZeroQuestInfo(packet, chr);
        } else {
            addStartedQuestInfo(packet, chr);
            addCompletedQuestInfo(packet, chr);
        }
        
        packet.writeShort(0); // minigame

        addRingInfo(packet, chr);
        addRocksInfo(packet, chr);
        chr.QuestInfoPacket(packet);
        
        packet.writeShort(0); // journalAvatarData

        packet.write(1); // nxRecordAccessAuth

        packet.writeInt(0); // count
        for (int i = 0; i < 0; i++) {
            packet.writeInt(0);
            packet.writeMapleAsciiString("");
        }
        
        packet.writeInt(0); // count
        for (int i = 0; i < 0; i++) {
            // signAccountRecord
            packet.writeInt(0);
            packet.writeInt(0);
        }
        
        if (GameConstants.isWildHunter(chr.getJob())) {
            addWildHunterInfo(packet, chr);
        }
        
        if (GameConstants.isZero(chr.getJob())) {
            chr.getStat().ZeroData(packet, chr);
        }
        
        packet.writeShort(0); // npcShopBuyLimitRecord

        chr.getSteelSkills().connectData(packet, chr);
        
        addInnerStats(packet, chr);
        
        packet.writeShort(0); // soul collection count

        packet.writeInt(0); // monsterlife invitation
        packet.write(0); // nMonsterLifeInviteRewardGrade

        addHonorInfo(packet, chr);
        
        packet.write(1); // entry record???
        packet.writeShort(0); // entry record size

        packet.write(0); // return effect info

        // dress up info start //
        packet.writeInt(chr.getSecondFace() != 0 ? chr.getSecondFace() : 21173);
        packet.writeInt(chr.getSecondHair() != 0 ? chr.getSecondHair() : 37141);
        packet.writeInt(chr.getSecondSkinColor() != 0 ? 1051200 + chr.getSecondSkinColor() : 1051291);
        packet.write(0); //nSkin
        packet.writeInt(-1);//nMixBaseHairColor
        packet.writeInt(0);//nMixAddHairColor
        packet.writeInt(0);//nMixHairBaseProb
        // dress up info end //
        packet.writeShort(0); // core?
        packet.writeShort(0); // core?

        packet.write(0); // farm potential count
        addMonsterLife(packet, chr);
        packet.writeInt(0); // farmSubInfo.nLastWorldID
        packet.writeInt(0); // farmSubInfo.nStatus

        packet.write(0); // memorial cube

        packet.writeInt(0); // likePoint.nPoint
        packet.writeLong(getTime(-2)); // likePont.ftIncTime
        packet.writeInt(0); // likePoint.nSeason

        packet.writeInt(chr.getId());
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeInt(0);
        packet.writeLong(getTime(-2));
        packet.writeInt(0);
        
        packet.writeShort(0); // worldShareRecord count
        packet.writeShort(0); // collectionRecord count

        packet.write(0); // farmOnline

        packet.writeInt(0); // textEquipInfo count
    }
    
    public static final void addWildHunterInfo(final WritingPacket packet, final MapleCharacter chr) {
        packet.write(GameConstants.getJaguarType(chr)); //SUB_INFO
        for (int i = 0; i < 5; i++) {
            packet.writeInt(GameConstants.getJaguarType(chr)); //최대 5마리 포획 가능.
        }
    }
    
    public static final void addMoneyInfo(final WritingPacket packet, final MapleCharacter chr) {
        packet.writeLong(chr.getMeso()); //Mesos
    }
    
    public static final void addHonorInfo(final WritingPacket packet, final MapleCharacter chr) {
        packet.writeInt(chr.getInnerExp());
        packet.writeInt(chr.getInnerLevel());
    }
    
    public static void addRingInfo(final WritingPacket packet, final MapleCharacter chr) {
        Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> aRing = chr.getRings(true);
        List<MapleRing> cRing = aRing.getFirst();
        List<MapleRing> fRing = aRing.getSecond();
        List<MapleRing> mRing = aRing.getThird();
        packet.writeShort(cRing.size());
        for (MapleRing ring : cRing) {
            packet.writeInt(ring.getPartnerChrId());
            packet.writeAsciiString(ring.getPartnerName(), 13);
            packet.writeLong(ring.getRingId());
            packet.writeLong(ring.getPartnerRingId());
        }
        packet.writeShort(fRing.size());
        for (MapleRing ring : fRing) {
            packet.writeInt(ring.getPartnerChrId());
            packet.writeAsciiString(ring.getPartnerName(), 13);
            packet.writeLong(ring.getRingId());
            packet.writeLong(ring.getPartnerRingId());
            packet.writeInt(ring.getItemId());
        }
        packet.writeShort(mRing.size());
        int marriageId = 30000;
        for (MapleRing ring : mRing) {
            packet.writeInt(marriageId);
            packet.writeInt(chr.getId());
            packet.writeInt(ring.getPartnerChrId());
            packet.writeShort(3);
            packet.writeInt(ring.getItemId());
            packet.writeInt(ring.getItemId());
            packet.writeAsciiString(chr.getName(), 13);
            packet.writeAsciiString(ring.getPartnerName(), 13);
        }
    }
    
    public static final void addSkillInfo(final WritingPacket w, final MapleCharacter chr) {
        final Map<Integer, Integer> link_skill = chr.getLinkSkill();
        final Map<Integer, Integer> link_skillLv = chr.getLinkSkillLevel();
        final Map<ISkill, SkillEntry> skills = chr.getSkills();
        int result = 0;
        w.write(1);
        w.writeShort(skills.size() + link_skill.size());
        for (Map.Entry<ISkill, SkillEntry> skill : skills.entrySet()) {
            w.writeInt(skill.getKey().getId());
            if (skill.getKey().is_professional_skill()) {
                if (result == 0) {
                    w.writeShort(chr.getProfession().getFirstProfessionExp());
                    w.write(0);
                    w.write(chr.getProfession().getFirstProfessionLevel());
                    result++;
                } else {
                    w.writeShort(chr.getProfession().getSecondProfessionExp());
                    w.write(0);
                    w.write(chr.getProfession().getSecondProfessionLevel());
                }
            } else {
                w.writeInt(skill.getValue().skillevel);
            }
            w.writeLong(skill.getValue().expiration);
            if (skill.getKey().CheckMasterLevel()) {
                w.writeInt(skill.getValue().masterlevel);
            }
        }
        result = 0;
        for (Map.Entry<Integer, Integer> link_skills : link_skill.entrySet()) {
            w.writeInt(link_skills.getKey());
            w.writeInt(link_skills.getValue());
            w.writeLong(getTime(-2));
        }
        for (Map.Entry<Integer, Integer> link_skills : link_skillLv.entrySet()) {
            if (link_skills.getValue() > 1) {
                result++;
            }
        }
        w.writeShort(result);
        for (Map.Entry<Integer, Integer> link_skills : link_skillLv.entrySet()) {
            if (link_skills.getValue() > 1) {
                w.writeInt(link_skills.getKey());
                w.writeShort(link_skills.getValue() - 1);
            }
        }
    }
    
    private static boolean isFortyJob(int job) {
        if (job / 10 == 43) {
            return job == 434;
        } else if (job / 100 == 22) {
            return job == 2219;
        } else {
            return job / 100 % 10 > 0 && job % 10 == 2;
        }
    }
    
    public static int checkHyper(int skillid) {
        final int job = skillid / 10000;
        if (!isFortyJob(job)) {
            return -2; //is not FortyJob
        }
        final int compare = skillid % 1000;
        if (30 <= compare && compare <= 52) {
            return 0; //passive
        } else if (53 <= compare && compare <= 60 || 30 <= compare && compare <= 32) {
            return 1; //active
        }
        return -1; //is not Hyper
    }
    
    public static final void addCoolDownInfo(final WritingPacket w, final MapleCharacter chr) {
        w.writeShort(chr.getAllCooldowns().size());
        for (final MapleCoolDownValueHolder cooling : chr.getAllCooldowns()) {
            int time = (int) (cooling.length + cooling.startTime - System.currentTimeMillis()) / 1000;
            w.writeInt(cooling.skillId);
            w.writeInt(time);
            chr.Message("[Skill CoolTime : " + cooling.skillId + " ] [CoolTime : " + time + "초");
        }        
    }
    
    public static final void addRocksInfo(final WritingPacket w, final MapleCharacter chr) {
        chr.sendPacketTrock(w);
    }
    
    public static final void addInnerStats(final WritingPacket w, final MapleCharacter player) {
        final List<InnerSkillValueHolder> skills = player.getInnerSkills();
        w.writeShort(skills.size());
        for (int i = 0; i < skills.size(); ++i) {
            w.write(i + 1);
            w.writeInt(skills.get(i).getSkillId()); //스킬 id
            w.write(skills.get(i).getSkillLevel()); //옵션 (x값, 최대값 = maxLevel)
            w.write(skills.get(i).getRank());
        }
    }
    
    public static void addInventoryInfo(WritingPacket w, MapleCharacter chr) {
        w.write(chr.getInventory(MapleInventoryType.EQUIP).getSlotLimit()); //equip slots
        w.write(chr.getInventory(MapleInventoryType.USE).getSlotLimit()); //use slots
        w.write(chr.getInventory(MapleInventoryType.SETUP).getSlotLimit()); //set-up slots
        w.write(chr.getInventory(MapleInventoryType.ETC).getSlotLimit()); //etc slots
        w.write(chr.getInventory(MapleInventoryType.CASH).getSlotLimit()); //cash slots

        // 펜던트 만료일
        w.write(new byte[]{0, (byte) 0xC0, (byte) 0xEC, (byte) 0x3A, (byte) 0xD2, (byte) 0xB3, (byte) 0xFF, 1});
        
        w.write(0); // 캐시아이템 보내는지 여부
        MapleInventory iv = chr.getInventory(MapleInventoryType.EQUIPPED);
        Collection<IItem> equippedC = iv.list();
        List<IItem> equipped = new ArrayList<IItem>(equippedC.size());
        
        for (IItem item : equippedC) {
            equipped.add((IItem) item);
        }
        /* 장착중인 아이템 시작 */
        Collections.sort(equipped);
        for (IItem item : equipped) {
            if (item.getPosition() < 0 && item.getPosition() > -100) {
                addItemInfo(w, item, false, false, null);
            }
        }
        /* 장착중인 아이템 종료 */
        w.writeShort(0);
        /* 장착중인 캐시아이템 시작 */
        for (IItem item : equipped) {
            if (item.getPosition() <= -100 && item.getPosition() > -1000) {
                addItemInfo(w, item, false, false, null);
            }
        }
        /* 장착중인 캐시아이템 종료 */
        w.writeShort(0);
        /* 장비 인벤토리 시작 */
        iv = chr.getInventory(MapleInventoryType.EQUIP);
        for (IItem item : iv.list()) {
            addItemInfo(w, item, false, false, null);
        }
        /* 장비 인벤토리종료 */
        w.writeShort(0);
        /* 에반 장비 인벤토리 시작 */
        for (IItem item : equipped) {
            if (item.getPosition() <= -1000 && item.getPosition() > -1100) {
                addItemInfo(w, item, false, false, null);
            }
        }
        /* 에반 장비 인벤토리 종료 */
        w.writeShort(0);
        /* 메카닉 장비 인벤토리 시작 */
        for (IItem item : equipped) {
            if (item.getPosition() <= -1100 && item.getPosition() > -1200) {
                addItemInfo(w, item, false, false, null);
            }
        }
        /* 메카닉 장비 인벤토리 종료 */
        w.writeShort(0);
        /* 안드로이드 장비 인벤토리 시작 */
        for (IItem item : equipped) {
            if (item.getPosition() <= -1200 && item.getPosition() > -1300) {
                addItemInfo(w, item, false, false, null);
            }
        }
        /* 안드로이드 장비 인벤토리 종료 */
        w.writeShort(0);
        for (IItem item : equipped) {
            if (item.getPosition() <= -1300 && item.getPosition() > -1400) {
                addItemInfo(w, item, false, false, null);
            }
        }
        /* 드레스업 캐쉬 종료 */
        w.writeShort(0); //1.2.169+
        w.writeShort(0); //1.2.182+
        for (IItem item : equipped) {
            if (item.getPosition() <= -1500 && item.getPosition() > -2000) {
                addItemInfo(w, item, false, false, null);
            }
        }
        /* 제로 베타 옷 종료 */
        w.writeShort(0); //1.2.183+

        w.writeShort(0); //1.2.193+
        w.writeShort(0); //1.2.201+

        /* 소비 인벤토리 시작 */
        iv = chr.getInventory(MapleInventoryType.USE);
        for (IItem item : iv.list()) {
            addItemInfo(w, item, false, false, null);
        }
        /* 소비 인벤토리 종료 */
        w.write(0);
        /* 설치 인벤토리 시작 */
        iv = chr.getInventory(MapleInventoryType.SETUP);
        for (IItem item : iv.list()) {
            addItemInfo(w, item, false, false, null);
        }
        /* 설치 인벤토리 종료 */
        w.write(0);
        /* 기타 인벤토리 시작 */
        iv = chr.getInventory(MapleInventoryType.ETC);
        for (IItem item : iv.list()) {
            addItemInfo(w, item, false, false, chr);
        }
        /* 기타 인벤토리 종료 */
        w.write(0);
        /* 캐시 인벤토리 시작 */
        iv = chr.getInventory(MapleInventoryType.CASH);
        for (IItem item : iv.list()) {
            addItemInfo(w, item, false, false, chr);
        }
        /* 캐시 인벤토리 종료 */
        w.write(0);
        w.writeInt(0); // 소비 가방
        w.writeInt(chr.getExtendedSlots().size()); // 기타 가방
        for (int i = 0; i < chr.getExtendedSlots().size(); i++) {
            w.writeInt(i);
            w.writeInt(chr.getInventory(MapleInventoryType.ETC).findByUniqueId(chr.getExtendedSlot(i)).getItemId());
            for (IItem item : chr.getInventory(MapleInventoryType.ETC).list()) {
                if (item.getPosition() > (i * 100 + 100) && item.getPosition() < (i * 100 + 200)) {
                    addItemInfo(w, item, false, false, false, true, chr);
                }
            }
            w.writeInt(-1);
        }
        w.writeInt(0); //1.2.173+ // 설치 가방

        w.writeInt(0);
        for (int i = 0; i < 0; i++) {
            // consumeItemLimit
            w.writeInt(0);
            w.writeLong(0);
        }
        
        w.writeInt(0);
        for (int i = 0; i < 0; i++) {
            // cashItemCoolTime
            w.writeLong(0);
            w.writeLong(0);
        }
        
        w.write(0); // POT?
    }
    
    public static final void addPlayerStats(final WritingPacket w, final MapleCharacter chr, final boolean ingame) {
        for (int i = 0; i < 2; i++) {
            w.writeInt(chr.getId()); //1.2.239+
        }
        w.writeInt(0); //WorldIDForLog
        w.writeAsciiString(chr.getName(), 13);
        w.write(chr.getGender());
        w.write(chr.getSkinColor());
        w.writeInt(chr.getFace());
        if (chr.getMixBaseHairColor() != 0) {
            w.writeInt(chr.getHair() / 10 * 10 + chr.getMixBaseHairColor());
        } else {
            w.writeInt(chr.getHair());
        }
        w.write(chr.getMixBaseHairColor());
        if (chr.getMixBaseHairColor() != 0) {
            w.write(chr.getMixAddHairColor());
            w.write(chr.getMixHairBaseProb());
        } else {
            w.write(0);
            w.write(0);
        }
        w.write(chr.getLevel());
        w.writeShort(chr.getJob());
        chr.getStat().connectData(w);
        w.writeShort(chr.getRemainingAp());
        if (!GameConstants.isPinkBean(chr.getJob()) && chr.getJob() != 4100 && chr.getJob() != 900) { //핑크빈 제외.
            w.write(chr.getRemainingSpSize());
            for (int i = 0; i < chr.getRemainingSps().length; i++) {
                if (chr.getRemainingSp(i) > 0) {
                    w.write(i + 1);
                    w.writeInt(chr.getRemainingSp(i));
                }
            }
        } else {
            w.writeShort(chr.getRemainingSp());
        }
        w.writeLong(chr.getExp());
        w.writeInt(chr.getFame());
        w.writeInt(chr.getWP());
        w.writeInt(chr.getMapId());
        w.write(chr.getInitialSpawnpoint());
        w.writeShort(chr.getSubcategory());
        if (GameConstants.isDemonSlayer(chr.getJob()) || GameConstants.isDemonAvenger(chr.getJob()) || GameConstants.isXenon(chr.getJob())) {
            w.writeInt(chr.getSecondFace());
        }
        w.write(0); //Fatigue
        w.writeInt(chr.getClient().getLastConnection()); //LastFatigueUpdateTime
        addAdditionalStats(w, chr);
        w.write(0);
        w.write(unk1);
        w.write(unk2);
        if (ingame) {
            w.writeInt(0);    //배틀 경험치
            w.write(0);      //배틀 등급
            w.writeInt(0);    //보유 배틀 포인트 (BP)
            w.write(5);       //고정
            w.write(6);       //156 new
            w.writeInt(0);
            PacketProvider.PartTimeJob(w, MapleCharacter.getPartTime(chr.getId()));
            chr.writeCharacterCardPacket(w);
            w.write(unk2);
            w.write(unk1);
        } else {
            w.writeInt(0);    //배틀 경험치
            w.write(0);      //배틀 등급
            w.writeInt(0);    //보유 배틀 포인트 (BP)
            w.write(5);
            w.write(6);
            w.writeInt(0);
            PacketProvider.PartTimeJob(w, MapleCharacter.getPartTime(chr.getId()));
            chr.writeCharacterCardPacket(w);
            w.write(unk2);
            w.write(unk1);
        }
        w.write(chr.getBurningCharacter());
    }
    
    public static void addAdditionalStats(WritingPacket w, MapleCharacter chr) {
        w.writeInt(chr.getStat().getAmbition()); //카리스마
        w.writeInt(chr.getStat().getInsight());  //통찰력
        w.writeInt(chr.getStat().getWillPower());//의지
        w.writeInt(chr.getStat().getDiligence());//손재주
        w.writeInt(chr.getStat().getEmpathy());  //감성
        w.writeInt(chr.getStat().getCharm());    //매력
        w.writeShort(chr.getTodayCharisma());     //오늘의 카리스마
        w.writeShort(chr.getTodayInsight());     //오늘의 통찰력
        w.writeShort(chr.getTodayWillPower());     //오늘의 의지
        w.writeShort(chr.getTodayDiligence());     //오늘의 손재주
        w.writeShort(chr.getTodayEmpathy());     //오늘의 감성
        w.writeShort(chr.getTodayCharm());     //오늘의 매력
    }
    
    public static void addMonsterLife(WritingPacket packet, MapleCharacter chr) {
        packet.writeMapleAsciiString(""); // sFarmName
        packet.writeInt(0); // FarmPoint
        packet.writeInt(0); // FarmLevel
        packet.writeInt(0); // FarmEXP
        packet.writeInt(0); // DecoPoint
        packet.writeInt(0); // FarmCash
        packet.write(0); // FarmGender
        packet.writeInt(0); // FarmTheme
        packet.writeInt(0); // SlotExtend
        packet.writeInt(0); // LockerSlotCount
    }
    
    public static void addPlayerLooks(final WritingPacket w, final MapleCharacter chr, final boolean mega) {
        if (chr.getStat().isDressup) {
            encodePackedCharacterLook(w, chr);
            return;
        }
        w.write(chr.getGender());
        
        if (chr.getGender() == 1 && chr.getSecondGender() == 0 && GameConstants.isZero(chr.getJob())) { // 베타를 addPlayerLooks에서 처리하는경우
            w.write(chr.getSkinColor());
            w.writeInt(chr.getFace());
            w.writeInt(chr.getJob());
            w.write(mega ? 0 : 1);
            if (chr.getMixBaseHairColor() != 0) {
                w.writeInt(chr.getHair() / 10 * 10 + chr.getMixBaseHairColor());
            } else {
                w.writeInt(chr.getHair());
            }
        } else if (chr.getGender() == 0 && chr.getSecondGender() == 1 && GameConstants.isZero(chr.getJob())) { // 알파를 addPlayerLooks에서 처리하는경우
            w.write(chr.getSecondSkinColor());
            w.writeInt(chr.getSecondFace());
            w.writeInt(chr.getJob());
            w.write(mega ? 0 : 1);
            if (chr.getMixBaseHairColor() != 0) {
                w.writeInt(chr.getSecondHair() / 10 * 10 + chr.getMixBaseHairColor());
            } else {
                w.writeInt(chr.getSecondHair());
            }
        } else { //제로 이외 직업군 or 제로 직업군 오류.
            w.write(chr.getSkinColor());
            w.writeInt(chr.getFace());
            w.writeInt(chr.getJob());
            w.write(mega ? 0 : 1);
            if (chr.getMixBaseHairColor() != 0) {
                w.writeInt(chr.getHair() / 10 * 10 + chr.getMixBaseHairColor());
            } else {
                w.writeInt(chr.getHair());
            }
        }
        
        final Map<Byte, Integer> myEquip = new LinkedHashMap<Byte, Integer>();
        final Map<Byte, Integer> maskedEquip = new LinkedHashMap<Byte, Integer>();
        MapleInventory equip = chr.getInventory(MapleInventoryType.EQUIPPED);
        
        for (final IItem item : equip.list()) {
            IEquip item_ = (IEquip) item;
            byte pos = (byte) (item.getPosition() * -1);
            if ((!GameConstants.isZero(chr.getJob())
                    || (chr.getSecondGender() == 1 && pos != 11)
                    || (chr.getSecondGender() == 0 && pos != 10))) {
                if (pos < 100 && myEquip.get(pos) == null) {
                    String lol = ((Integer) item.getItemId()).toString();
                    String ss = lol.substring(0, 3);
                    int moru = Integer.parseInt(ss + ((Integer) item_.getPotential7()).toString());
                    myEquip.put(pos, item_.getPotential7() != 0 ? moru : item.getItemId());
                } else if (pos > 100 && pos != 111) {
                    pos -= 100;
                    if (myEquip.get(pos) != null) {
                        maskedEquip.put(pos, myEquip.get(pos));
                    }
                    String lol = ((Integer) item.getItemId()).toString();
                    String ss = lol.substring(0, 3);
                    int moru = Integer.parseInt(ss + ((Integer) item_.getPotential7()).toString());
                    myEquip.put(pos, item_.getPotential7() != 0 ? moru : item.getItemId());
                } else if (myEquip.get(pos) != null) {
                    maskedEquip.put(pos, item.getItemId());
                }
            }
        }
        
        for (final Entry<Byte, Integer> entry : myEquip.entrySet()) {
            w.write(entry.getKey());
            w.writeInt(entry.getValue());
        }
        w.write(0xFF); // end of visible items

        /* masked items */
        for (final Entry<Byte, Integer> entry : maskedEquip.entrySet()) {
            w.write(entry.getKey());
            w.writeInt(entry.getValue());
        }
        w.write(0xFF); // ending markers

        IItem cWeapon = equip.getItem((byte) -111);
        IItem weapon = equip.getItem((byte) -11);
        IItem sWeapon = equip.getItem((byte) -10);
        w.writeInt(cWeapon != null ? cWeapon.getItemId() : 0);
        w.writeInt(weapon != null ? weapon.getItemId() : 0);
        w.writeInt(sWeapon != null && (!GameConstants.isZero(chr.getJob())) ? sWeapon.getItemId() : 0);
        w.write(0);
        for (int i = 0; i < 3; i++) {
            if (chr.getPet(i) != null) {
                w.writeInt(chr.getPet(i).getPetItemId());
            } else {
                w.writeInt(0);
            }
        }
        if (GameConstants.isDemonSlayer(chr.getJob()) || GameConstants.isDemonAvenger(chr.getJob()) || GameConstants.isXenon(chr.getJob())) {
            w.writeInt(chr.getSecondFace());
        }
        if (GameConstants.isZero(chr.getJob())) {
            w.write(chr.getSecondGender());
        }
        if (chr.getMixBaseHairColor() != 0) {
            w.write(chr.getMixAddHairColor());
            w.write(chr.getMixHairBaseProb());
        } else {
            w.write(0);
            w.write(0);
        }
    }
    
    public static void addPlayerLooksZero(final WritingPacket w, final MapleCharacter chr, final boolean mega) {
        w.write(chr.getSecondGender());
        if (chr.getGender() == 1 && chr.getSecondGender() == 0 && GameConstants.isZero(chr.getJob())) {
            w.write(chr.getSecondSkinColor());
            w.writeInt(chr.getSecondFace());
            w.writeInt(chr.getJob());
            w.write(mega ? 0 : 1);
            if (chr.getMixBaseHairColor() != 0) {
                w.writeInt(chr.getSecondHair() / 10 * 10 + chr.getMixBaseHairColor());
            } else {
                w.writeInt(chr.getSecondHair());
            }
        } else if (chr.getGender() == 0 && chr.getSecondGender() == 1 && GameConstants.isZero(chr.getJob())) {
            w.write(chr.getSkinColor());
            w.writeInt(chr.getFace());
            w.writeInt(chr.getJob());
            w.write(mega ? 0 : 1);
            if (chr.getMixBaseHairColor() != 0) {
                w.writeInt(chr.getHair() / 10 * 10 + chr.getMixBaseHairColor());
            } else {
                w.writeInt(chr.getHair());
            }
        } else { //제로 오류.
            w.write(chr.getSecondSkinColor());
            w.writeInt(chr.getSecondFace());
            w.writeInt(chr.getJob());
            w.write(mega ? 0 : 1);
            if (chr.getMixBaseHairColor() != 0) {
                w.writeInt(chr.getSecondHair() / 10 * 10 + chr.getMixBaseHairColor());
            } else {
                w.writeInt(chr.getSecondHair());
            }
        }
        
        final Map<Byte, Integer> myEquip = new LinkedHashMap<Byte, Integer>();
        final Map<Byte, Integer> maskedEquip = new LinkedHashMap<Byte, Integer>();
        MapleInventory equip = chr.getInventory(MapleInventoryType.EQUIPPED);
        
        for (final IItem item : equip.list()) {
            if (BetaSlot(item.getPosition()) || AlphaSlot(item.getPosition())) {
                item.setPosition(linkedZeroSlot(item.getPosition()));
            }
        }
        
        for (final IItem item : chr.getInventory(MapleInventoryType.EQUIPPED)) {
            IEquip item_ = (IEquip) item;
            byte pos = (byte) (item.getPosition() * -1);
            if ((!GameConstants.isZero(chr.getJob())
                    || (chr.getSecondGender() == 1 && pos != 10)
                    || (chr.getSecondGender() == 0 && pos != 11))) {
                if (pos < 100 && myEquip.get(pos) == null) {
                    String lol = ((Integer) item.getItemId()).toString();
                    String ss = lol.substring(0, 3);
                    int moru = Integer.parseInt(ss + ((Integer) item_.getPotential7()).toString());
                    myEquip.put(pos, item_.getPotential7() != 0 ? moru : item.getItemId());
                } else if (pos > 100 && pos != 111) {
                    pos -= 100;
                    if (myEquip.get(pos) != null) {
                        maskedEquip.put(pos, myEquip.get(pos));
                    }
                    String lol = ((Integer) item.getItemId()).toString();
                    String ss = lol.substring(0, 3);
                    int moru = Integer.parseInt(ss + ((Integer) item_.getPotential7()).toString());
                    myEquip.put(pos, item_.getPotential7() != 0 ? moru : item.getItemId());
                } else if (myEquip.get(pos) != null) {
                    maskedEquip.put(pos, item.getItemId());
                }
            }
        }
        
        for (final Entry<Byte, Integer> entry : myEquip.entrySet()) {
            w.write(entry.getKey());
            w.writeInt(entry.getValue());
        }
        w.write(0xFF); // end of visible items

        /* masked items */
        for (final Entry<Byte, Integer> entry : maskedEquip.entrySet()) {
            w.write(entry.getKey());
            w.writeInt(entry.getValue());
        }
        w.write(0xFF); // ending markers

        for (final IItem item : equip.list()) {
            if (BetaSlot(item.getPosition()) || AlphaSlot(item.getPosition())) {
                item.setPosition(linkedZeroSlot(item.getPosition()));
            }
        }
        
        IItem cWeapon = equip.getItem((short) -111);
        IItem weapon = equip.getItem((byte) -11);
        IItem sWeapon = equip.getItem((byte) -10);
        w.writeInt(cWeapon != null ? cWeapon.getItemId() : 0);
        w.writeInt(weapon != null ? weapon.getItemId() : 0);
        w.writeInt(sWeapon != null && (!GameConstants.isZero(chr.getJob())) ? sWeapon.getItemId() : 0);
        w.write(GameConstants.isMercedes(chr.getJob()) ? 1 : 0);
        for (int i = 0; i < 3; i++) {
            if (chr.getPet(i) != null) {
                w.writeInt(chr.getPet(i).getPetItemId());
            } else {
                w.writeInt(0);
            }
        }
        if (GameConstants.isZero(chr.getJob())) {
            w.write(chr.getGender());
        }
        if (chr.getMixBaseHairColor() != 0) {
            w.write(chr.getMixAddHairColor());
            w.write(chr.getMixHairBaseProb());
        } else {
            w.write(0);
            w.write(0);
        }
    }
    
    public final static boolean AlphaSlot(short slot) {
        switch (slot) {
            case (short) 0xFF9B:
            case (short) 0xFF99:
            case (short) 0xFF9A:
            case (short) 0xFF98:
            case (short) 0xFF97:
            case (short) 0xFF96:
            case (short) 0xFF95:
            case (short) 0xFF94:
            case (short) 0xFF93:
            case (short) 0xFF91:
                return true;
        }
        return false;
    }
    
    public final static boolean BetaSlot(short slot) {
        if (slot >= (short) 0xFA1B && slot <= (short) 0xFA24) {
            return true;
        }
        return false;
    }
    
    public final static short linkedZeroSlot(short slot) {
        switch (slot) {
            case (short) 0xFF9B:
                return (short) 0xFA23;
            case (short) 0xFF99:
                return (short) 0xFA24;
            case (short) 0xFF9A:
                return (short) 0xFA22;
            case (short) 0xFF98:
                return (short) 0xFA21;
            case (short) 0xFF97:
                return (short) 0xFA1F;
            case (short) 0xFF96:
                return (short) 0xFA1C;
            case (short) 0xFF95:
                return (short) 0xFA1B;
            case (short) 0xFF94:
                return (short) 0xFA1E;
            case (short) 0xFF93:
                return (short) 0xFA20;
            case (short) 0xFF91:
                return (short) 0xFA1D;
            
            case (short) 0xFA23://
                return (short) 0xFF9B;
            case (short) 0xFA24://
                return (short) 0xFF99;
            case (short) 0xFA22://
                return (short) 0xFF9A;
            case (short) 0xFA21://
                return (short) 0xFF98;
            case (short) 0xFA1F://
                return (short) 0xFF97;
            case (short) 0xFA1C://
                return (short) 0xFF96;
            case (short) 0xFA1B://
                return (short) 0xFF95;
            case (short) 0xFA1E://
                return (short) 0xFF94;
            case (short) 0xFA20://
                return (short) 0xFF93;
            case (short) 0xFA1D://
                return (short) 0xFF91;
            //위가 알파가낄때

            //밑이 베타가낄때
        }
        return 0;
    }
    
    public static void set2barr(int value, byte[] dest, int index) {
        dest[index + 0] = (byte) (value >> 0);
        dest[index + 1] = (byte) (value >> 8);
        dest[index + 2] = (byte) (value >> 16);
        dest[index + 3] = (byte) (value >> 24);
    }
    
    public static int byteArrayToInt(byte bytes[], int index) {
        return ((((int) bytes[index] & 0xff) << 0)
                | (((int) bytes[index + 1] & 0xff) << 8)
                | (((int) bytes[index + 2] & 0xff) << 16)
                | (((int) bytes[index + 3] & 0xff << 24)));
    }
    
    public static int b2ui32(byte[] bytes, int index) {
        return byteArrayToInt(bytes, index);
    }
    
    public static long toUnsigned(int value) {
        return ((long) value & 0xFFFFFFFFL);
    }
    
    public static int get_hundred(int val) {
        return val == 0 ? -1 : (val % 1000);
    }
    
    public static int[] g_anWeaponType = new int[]{0, 30, 31, 32, 33, 37, 38, 40, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 39, 34, 52, 53, 35, 36, 21, 22, 23, 24,
        56, 57, 26, 58};
    
    public static void encodePackedCharacterLook(WritingPacket oPacket, MapleCharacter c) {
        final Map<Short, Integer> myEquip = new LinkedHashMap<Short, Integer>();
        final Map<Short, Integer> maskedEquip = new LinkedHashMap<Short, Integer>();
        MapleInventory equip = c.getInventory(MapleInventoryType.EQUIPPED);
        
        for (final IItem item : equip.list()) {
            IEquip item_ = (IEquip) item;
            short pos = (short) (item.getPosition() * -1);
            if (pos < 100 && myEquip.get(pos) == null) {
                String lol = ((Integer) item.getItemId()).toString();
                String ss = lol.substring(0, 3);
                int moru = Integer.parseInt(ss + ((Integer) item_.getPotential7()).toString());
                myEquip.put(pos, item_.getPotential7() != 0 ? moru : item.getItemId());
            } else if (pos > 100 && pos != 111) {
                pos -= 100;
                if (myEquip.get(pos) != null) {
                    maskedEquip.put(pos, myEquip.get(pos));
                }
                String lol = ((Integer) item.getItemId()).toString();
                String ss = lol.substring(0, 3);
                int moru = Integer.parseInt(ss + ((Integer) item_.getPotential7()).toString());
                myEquip.put(pos, item_.getPotential7() != 0 ? moru : item.getItemId());
            } else if (myEquip.get(pos) != null) {
                maskedEquip.put(pos, item.getItemId());
            }
        }
        
        int[] anHairEquip = new int[100];
        
        for (final Entry<Short, Integer> entry : myEquip.entrySet()) {
            anHairEquip[entry.getKey()] = entry.getValue();
        }
        
        byte[] data = new byte[24 + 4];
        
        int datai = b2ui32(data, 0);
        datai |= c.getGender() & 1;
        datai |= 2 * (c.getSkinColor() & 0xF);
        datai |= 32 * (get_hundred(c.getFace()) & 0x3FF);
        set2barr(datai, data, 0);
        
        datai = b2ui32(data, 1);
        datai |= (c.getFace() / 1000 % 10 & 7) << 7;
        set2barr(datai, data, 1);
        
        datai = b2ui32(data, 2);
        datai |= 4 * (c.getHair() / 10000 == 4 ? 1 : 0);
        datai |= 8 * (get_hundred(c.getHair()) & 0x3FF);
        set2barr(datai, data, 2);
        
        datai = b2ui32(data, 3);
        datai |= 32 * (c.getHair() / 1000 % 10 & 0xF);
        set2barr(datai, data, 3);
        
        datai = b2ui32(data, 4);
        datai |= 2 * (get_hundred(anHairEquip[1]) & 0x3FF);
        set2barr(datai, data, 4);
        
        datai = b2ui32(data, 5);
        datai |= 8 * (anHairEquip[1] / 1000 % 10 & 7);
        datai |= (get_hundred(anHairEquip[2]) & 0x3FF) << 6;
        set2barr(datai, data, 5);
        
        datai = b2ui32(data, 7);
        datai |= anHairEquip[2] / 1000 % 10 & 3;
        datai |= 4 * (get_hundred(anHairEquip[3]) & 0x3FF);
        set2barr(datai, data, 7);
        
        datai = b2ui32(data, 8);
        datai |= 16 * (anHairEquip[3] / 1000 % 10 & 3);
        datai |= (get_hundred(anHairEquip[4]) & 0x3FF) << 6;
        set2barr(datai, data, 8);
        
        datai = b2ui32(data, 10);
        datai |= anHairEquip[4] / 1000 % 10 & 3;
        datai |= 4 * (anHairEquip[5] / 10000 == 105 ? 1 : 0);
        datai |= 8 * (get_hundred(anHairEquip[5]) & 0x3FF);
        set2barr(datai, data, 10);
        
        datai = b2ui32(data, 11);
        datai |= 32 * (anHairEquip[5] / 1000 % 10 & 15);
        set2barr(datai, data, 11);
        
        datai = b2ui32(data, 12);
        datai |= 2 * (get_hundred(anHairEquip[6]) & 0x3FF);
        set2barr(datai, data, 12);
        
        datai = b2ui32(data, 13);
        datai |= 8 * (anHairEquip[6] / 1000 % 10 & 3);
        datai |= 32 * (get_hundred(anHairEquip[7]) & 0x3FF);
        set2barr(datai, data, 13);
        
        datai = b2ui32(data, 14);
        datai |= (anHairEquip[7] / 1000 % 10 & 3) << 7;
        set2barr(datai, data, 14);
        
        datai = b2ui32(data, 15);
        datai |= 2 * (get_hundred(anHairEquip[8]) & 0x3FF);
        set2barr(datai, data, 15);
        
        datai = b2ui32(data, 16);
        datai |= 8 * (anHairEquip[8] / 1000 % 10 & 3);
        datai |= 32 * (get_hundred(anHairEquip[9]) & 0x3FF);
        set2barr(datai, data, 16);
        
        datai = b2ui32(data, 17);
        datai |= (anHairEquip[9] / 1000 % 10 & 3) << 7;
        set2barr(datai, data, 17);
        
        datai = b2ui32(data, 18);
        int v39 = 0;
        if (anHairEquip[10] != 0) {
            if (anHairEquip[10] / 10000 == 109) {
                v39 = 1;
            } else {
                v39 = (anHairEquip[10] / 10000 != 134 ? 1 : 0) + 2;
            }
        }
        
        datai |= 2 * (v39 & 3);
        datai |= 8 * (get_hundred(anHairEquip[10]) & 0x3FF);
        set2barr(datai, data, 18);
        
        datai = b2ui32(data, 19);
        datai |= 32 * (anHairEquip[10] / 1000 % 10 & 15);
        set2barr(datai, data, 19);
        
        IItem cWeapon = equip.getItem((byte) -111);
        IItem weapon = equip.getItem((byte) -11);
        
        int nWeapon = cWeapon != null ? cWeapon.getItemId() : (weapon != null ? weapon.getItemId() : 0);
        
        datai = b2ui32(data, 20);
        if (cWeapon != null) {
            datai |= 2;
        }
        datai |= 4 * (get_hundred(nWeapon) & 0x3FF);
        set2barr(datai, data, 20);
        
        int v7 = 1;
        int v6 = weapon == null ? 0 : (weapon.getItemId() / 10000 % 100);
        int v45 = 0;
        boolean error = false;
        while (g_anWeaponType[v7] != v6) {
            ++v7;
            if (v7 > 30) {
                v45 = 0;
                error = true;
                break;
            }
        }
        if (!error) {
            v45 = v7;
        }
        
        datai = b2ui32(data, 21);
        datai |= 16 * (nWeapon / 1000 % 10 & 3);
        datai |= (v45 & 0x1F) << 6;
        set2barr(datai, data, 21);
        
        datai = b2ui32(data, 22);
        datai |= 8 * 0;
        set2barr(datai, data, 22);
        data[23] = 11;
        
        byte[] toWrite = new byte[24];
        System.arraycopy(data, 0, toWrite, 0, 24);
        oPacket.write(toWrite);
    }
    
    public static final void addStarForceItemInfo(final WritingPacket w, final IItem item) {
        addItemInfo(w, item, true, true, false, false, null);
    }
    
    public static final void addItemInfo(final WritingPacket w, final IItem item, final boolean zeroPosition, final boolean leaveOut, final MapleCharacter chr) {
        addItemInfo(w, item, zeroPosition, leaveOut, false, false, chr);
    }
    
    public static final void addItemInfo(final WritingPacket w, final IItem item, final boolean zeroPosition, final boolean leaveOut, final boolean trade, final MapleCharacter chr) {
        addItemInfo(w, item, zeroPosition, leaveOut, trade, false, chr);
    }
    
    public static final void addItemInfo(final WritingPacket w, final IItem item, final boolean zeroPosition, final boolean leaveOut, final boolean trade, final boolean bagSlot, final MapleCharacter chr) {
        short pos = item.getPosition();
        if (zeroPosition) {
            if (!leaveOut) {
                w.write(0);
            }
        } else {
            if (pos <= -1) {
                pos *= -1;
                if (pos > 100 && pos < 1000) {
                    pos -= 100;
                }
            }
            if (bagSlot) {
                w.writeInt((pos % 100) - 1);
            } else if (!trade && item.getType() == 1) {
                w.writeShort(pos);
            } else {
                w.write(pos);
            }
        }
        w.write(item.getPet() != null ? 3 : item.getType());
        w.writeInt(item.getItemId());
        
        if (item.getPet() != null) { // Pet
            final MaplePet pet = item.getPet();
            addPetItemInfo(chr, w, pet, true, false);
            return;
        } else if (item.isCash()) { // Cash
            w.write(1);
            w.writeLong(item.getUniqueId());
            w.writeLong(getTime(item.getExpiration() <= System.currentTimeMillis() ? -1 : item.getExpiration()));
        } else {
            w.write(0);
            w.writeLong(getTime(item.getExpiration() <= System.currentTimeMillis() ? -1 : item.getExpiration()));
        }
        w.writeInt(chr == null ? -1 : chr.getExtendedSlots().indexOf(item.getUniqueId()));
        
        if (item.getType() == 1) {
            final Equip equip = (Equip) item;
            int equipStats = 0;
            try {
                for (EquipStats equipstat : EquipStats.values()) {
                    switch (equipstat.name()) {
                        case "UPGRADE": {
                            equipStats |= equip.getUpgradeSlots() > 0 ? EquipStats.UPGRADE.getValue() : 0;
                            break;
                        }
                        case "LEVEL":
                            equipStats |= equip.getLevel() > 0 ? EquipStats.LEVEL.getValue() : 0;
                            break;
                        case "STR":
                            equipStats |= equip.getStr() > 0 ? EquipStats.STR.getValue() : 0;
                            break;
                        case "DEX":
                            equipStats |= equip.getDex() > 0 ? EquipStats.DEX.getValue() : 0;
                            break;
                        case "INT":
                            equipStats |= equip.getInt() > 0 ? EquipStats.INT.getValue() : 0;
                            break;
                        case "LUK":
                            equipStats |= equip.getLuk() > 0 ? EquipStats.LUK.getValue() : 0;
                            break;
                        case "HP":
                            equipStats |= equip.getHp() > 0 ? EquipStats.HP.getValue() : 0;
                            break;
                        case "MP":
                            equipStats |= equip.getMp() > 0 ? EquipStats.MP.getValue() : 0;
                            break;
                        case "WATK":
                            equipStats |= equip.getWatk() > 0 ? EquipStats.WATK.getValue() : 0;
                            break;
                        case "MATK":
                            equipStats |= equip.getMatk() > 0 ? EquipStats.MATK.getValue() : 0;
                            break;
                        case "WDEF":
                            equipStats |= equip.getWdef() > 0 ? EquipStats.WDEF.getValue() : 0;
                            break;
                        case "MDEF":
                            equipStats |= equip.getMdef() > 0 ? EquipStats.MDEF.getValue() : 0;
                            break;
                        case "ACC":
                            equipStats |= equip.getAcc() > 0 ? EquipStats.ACC.getValue() : 0;
                            break;
                        case "AVOID":
                            equipStats |= equip.getAvoid() > 0 ? EquipStats.AVOID.getValue() : 0;
                            break;
                        case "HANDS":
                            equipStats |= equip.getHands() > 0 ? EquipStats.HANDS.getValue() : 0;
                            break;
                        case "SPEED":
                            equipStats |= equip.getSpeed() > 0 ? EquipStats.SPEED.getValue() : 0;
                            break;
                        case "JUMP":
                            equipStats |= equip.getJump() > 0 ? EquipStats.JUMP.getValue() : 0;
                            break;
                        case "FLAG":
                            equipStats |= equip.getFlag() > 0 ? EquipStats.FLAG.getValue() : 0;
                            break;
                        case "ITEMLEVEL":
                            equipStats |= equip.getItemLevel() != 0 ? EquipStats.ITEMLEVEL.getValue() : 0;
                            break;
                        case "ITEMEXP":
                            equipStats |= equip.getItemEXP() > 0 ? EquipStats.ITEMEXP.getValue() : 0;
                            break;
                        case "DURABILITY":
                            equipStats |= equip.getDurability() != -1 ? EquipStats.DURABILITY.getValue() : 0;
                            break;
                        case "HAMMER":
                            equipStats |= equip.getViciousHammer() > 0 ? EquipStats.HAMMER.getValue() : 0;
                            break;
                        case "DOWNLEVEL":
                            equipStats |= equip.getDownLevel() > 0 ? EquipStats.DOWNLEVEL.getValue() : 0;
                            break;
                        case "ITEMTRACE":
                            equipStats |= (equip.getItemTrace() > 0 ? EquipStats.ITEMTRACE.getValue() : 0);
                            break;
                        case "BOSSDAMAGE":
                            equipStats |= equip.getBossDamage() > 0 ? EquipStats.BOSSDAMAGE.getValue() : 0;
                            break;
                        case "IGNOREWDEF":
                            equipStats |= equip.getIgnoreWdef() > 0 ? EquipStats.IGNOREWDEF.getValue() : 0;
                            break;
                    }
                }
                w.writeInt(equipStats);
                for (EquipStats equipstat : EquipStats.values()) {
                    switch (equipstat.name()) {
                        case "UPGRADE": {
                            w.write(equip.getUpgradeSlots() > 0 ? equip.getUpgradeSlots() : -88888);
                            break;
                        }
                        case "LEVEL":
                            w.write(equip.getLevel() > 0 ? equip.getLevel() : -88888);
                            break;
                        case "STR":
                            w.writeShort(equip.getStr() > 0 ? equip.getStr() : -88888);
                            break;
                        case "DEX":
                            w.writeShort(equip.getDex() > 0 ? equip.getDex() : -88888);
                            break;
                        case "INT":
                            w.writeShort(equip.getInt() > 0 ? equip.getInt() : -88888);
                            break;
                        case "LUK":
                            w.writeShort(equip.getLuk() > 0 ? equip.getLuk() : -88888);
                            break;
                        case "HP":
                            w.writeShort(equip.getHp() > 0 ? equip.getHp() : -88888);
                            break;
                        case "MP":
                            w.writeShort(equip.getMp() > 0 ? equip.getMp() : -88888);
                            break;
                        case "WATK":
                            w.writeShort(equip.getWatk() > 0 ? equip.getWatk() : -88888);
                            break;
                        case "MATK":
                            w.writeShort(equip.getMatk() > 0 ? equip.getMatk() : -88888);
                            break;
                        case "WDEF":
                            w.writeShort(equip.getWdef() > 0 ? equip.getWdef() : -88888);
                            break;
                        case "MDEF":
                            w.writeShort(equip.getMdef() > 0 ? equip.getMdef() : -88888);
                            break;
                        case "ACC":
                            w.writeShort(equip.getAcc() > 0 ? equip.getAcc() : -88888);
                            break;
                        case "AVOID":
                            w.writeShort(equip.getAvoid() > 0 ? equip.getAvoid() : -88888);
                            break;
                        case "HANDS":
                            w.writeShort(equip.getHands() > 0 ? equip.getHands() : -88888);
                            break;
                        case "SPEED":
                            w.writeShort(equip.getSpeed() > 0 ? equip.getSpeed() : -88888);
                            break;
                        case "JUMP":
                            w.writeShort(equip.getJump() > 0 ? equip.getJump() : -88888);
                            break;
                        case "FLAG":
                            w.writeShort(equip.getFlag() > 0 ? equip.getFlag() : -88888);
                            break;
                        case "ITEMLEVEL":
                            w.write(equip.getItemLevel() != 0 ? equip.getItemLevel() : -88888);
                            break;
                        case "ITEMEXP":
                            w.writeLong(GameConstants.getEquipExpPercentage(equip) > 0 ? GameConstants.getEquipExpPercentage(equip) : -88888);
                            break;
                        case "DURABILITY":
                            w.writeInt(equip.getDurability() != -1 ? equip.getDurability() : -88888);
                            break;
                        case "HAMMER":
                            w.writeInt(equip.getViciousHammer() > 0 ? equip.getViciousHammer() : -88888);
                            break;
                        case "DOWNLEVEL":
                            w.write(equip.getDownLevel() > 0 ? equip.getDownLevel() : -88888);
                            break;
                        case "ITEMTRACE":
                            w.writeShort(equip.getItemTrace() > 0 ? 0x88 : -88888);
                            break;
                        case "BOSSDAMAGE":
                            w.write(equip.getBossDamage() > 0 ? equip.getBossDamage() : -88888);
                            break;
                        case "IGNOREWDEF":
                            w.write(equip.getIgnoreWdef() > 0 ? equip.getIgnoreWdef() : -88888);
                            break;
                    }
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
            int value = 4;
            if (equip.getAllDamageP() != 0) {
                value += 1;
            }
            if (equip.getAllStatP() != 0) {
                value += 2;
            }
            if (equip.getFire() >= 0) {
                value += 8;
            }
            if (equip.getEnhance() > 25) {
                value += 16;
            }
            w.writeInt(value);
            if (equip.getAllDamageP() != 0) {
                w.write(equip.getAllDamageP());
            }
            if (equip.getAllStatP() != 0) {
                w.write(equip.getAllStatP());
            }
            w.write(equip.getFire() == 0 ? -1 : equip.getFire());
            if (equip.getFire() >= 0) {
                w.writeInt(Randomizer.nextInt());
                w.writeInt(0);
            }
            if (equip.getEnhance() > 25) {
                w.writeInt(0x100); //+0x1000 : 장비의 전승
            }
            w.writeMapleAsciiString(equip.getOwner());
            w.write(equip.getState());
            w.write(equip.getEnhance() > 25 ? equip.getEnhance() - 25 : equip.getEnhance());
            w.writeShort(equip.getPotential1());
            w.writeShort(equip.getPotential2());
            w.writeShort(equip.getPotential3());
            w.writeShort(equip.getPotential4());
            w.writeShort(equip.getPotential5());
            w.writeShort(equip.getPotential6());
            w.writeShort(equip.getPotential7());
            if (!equip.isCash()) {
                w.writeLong(-1);
            }
            w.writeLong(getTime(-2));
            w.writeInt(-1);
            w.writeLong(0);
            w.writeLong(getTime(-2));
            w.writeLong(0);
            w.writeLong(0);
            w.writeShort(equip.getSoulName());
            w.writeShort(equip.getSoulEnchanter());
            w.writeShort(equip.getSoulPotential());
        } else {
            w.writeShort(item.getQuantity());
            w.writeMapleAsciiString(item.getOwner());
            w.writeShort(item.getFlag());
            if (GameConstants.isThrowingStar(item.getItemId()) || GameConstants.isBullet(item.getItemId())) {
                w.writeInt(2);
                w.writeShort(0x54);
                w.write(0);
                w.write(0x34);
            }
        }
    }
    
    public static void addCashItemInformation(WritingPacket packet, IItem item, int accid, int sn) {
        packet.writeLong(item.getUniqueId());
        packet.writeLong(accid);
        packet.writeInt(item.getItemId());
        packet.writeInt(sn);
        packet.writeShort(item.getQuantity());
        packet.writeAsciiString(item.getGiftFrom(), 13);
        packet.writeLong(PacketProvider.MAX_TIME);
        packet.write0(31); //1.2.251+
        packet.writeLong(PacketProvider.getTime(-2));
        packet.write0(16);
    }
    
    public static final void addCoreInfo(WritingPacket w, MapleCharacter player) {
        w.writeShort(0);
    }
    
    public static final void addPetItemInfo(final MapleCharacter player, final WritingPacket w, MaplePet pet, boolean unequip, boolean petLoot) {
        w.write(1);
        w.writeLong(pet.getUniqueId());
        w.writeLong(getTime(-1));
        w.writeInt(-1);
        w.writeAsciiString(pet.getName(), 13);
        w.write(pet.getLevel());
        w.writeShort(pet.getCloseness());
        w.write(pet.getFullness());
        w.writeLong(getTime(pet.getExpireDate()));
        w.writeShort(0);
        w.writeShort(pet.getSkillValue());
        w.writeShort(0);
        w.writeInt((petLoot || pet.getBuffSkillId() > 0) ? 0 : 0x20000);
        w.write(unequip ? 0 : (player.getPetIndex(pet) + 1));
        w.writeInt(pet.getBuffSkillId());
        w.writeInt(pet.getColor()); //+168
        w.writeShort(100);
    }
    
    public static final void serializeMovementList(final WritingPacket packet, final List<LifeMovementFragment> moves) {
        packet.write(moves.size());
        for (LifeMovementFragment move : moves) {
            move.serialize(packet);
        }
    }
    
    public static final void addInteraction(final WritingPacket packet, IMapleCharacterShop shop) {
        packet.write(shop.getShopType());
        packet.writeInt(((AbstractPlayerStore) shop).getObjectId());
        packet.writeMapleAsciiString(shop.getDescription());
        if (shop.getShopType() != IMapleCharacterShop.HIRED_MERCHANT) {
            packet.write(shop.getPassword().length() > 0 ? 1 : 0); //password = false
        }
        packet.write(shop.getItemId() % 10);
        packet.write(shop.getSize());
        packet.write(shop.getMaxSize()); //full slots... 4 = 4-1=3 = has slots, 1-1=0 = no slots
        if (shop.getShopType() != IMapleCharacterShop.HIRED_MERCHANT) {
            packet.write(shop.isOpen() ? 0 : 1);
        }
    }
    
    public static byte[] convertFromBigInteger(BigInteger bi, int bits) {
        byte[] retVal = new byte[bits / 8];
        byte[] originalData = bi.toByteArray();
        
        for (int i = 0; i < originalData.length; i++) {
            retVal[i] = originalData[originalData.length - 1 - i];
        }
        
        return retVal;
    }
    
    public static <E extends GlobalBuffStat> void writeSingleMask(WritingPacket mplew, E statup) {
        mplew.write(convertFromBigInteger(statup.getBigValue(), BuffStats.BIT_COUNT));
    }
    
    public static <E extends GlobalBuffStat> void writeMask(WritingPacket mplew, Collection<E> statups) {
        BigInteger bi = BigInteger.valueOf(0);
        
        for (GlobalBuffStat statup : statups) {
            bi = bi.or(statup.getBigValue());
        }
        
        mplew.write(convertFromBigInteger(bi, BuffStats.BIT_COUNT));
    }
    
    public static <E extends GlobalBuffStat> BigInteger writeBuffMask(WritingPacket mplew, Collection<Triple<E, Integer, Boolean>> statups) {
        BigInteger bi = BigInteger.valueOf(0);
        
        for (Triple statup : statups) {
            bi = bi.or(((GlobalBuffStat) statup.first).getBigValue());
        }
        
        mplew.write(convertFromBigInteger(bi, BuffStats.BIT_COUNT));
        
        return bi;
    }
    
    public static <E extends GlobalBuffStat> BigInteger writeBuffMask(WritingPacket mplew, BigInteger bi) {
        
        mplew.write(convertFromBigInteger(bi, 60));
        
        return bi;
    }
    
    public static <E extends GlobalBuffStat> void writeBuffMask(WritingPacket mplew, Map<E, Integer> statups) {
        BigInteger bi = BigInteger.valueOf(0);
        
        for (GlobalBuffStat statup : statups.keySet()) {
            bi = bi.or(statup.getBigValue());
        }
        
        mplew.write(convertFromBigInteger(bi, BuffStats.BIT_COUNT));
    }
    
    public static final void addShopItemInfo(final WritingPacket packet, MapleShopItem item, MapleClient c, final IItem i, int sid) {
        packet.writeInt(item.getItemId());
        packet.writeInt(item.getPriceQuantity() > 0 ? 0 : item.getPrice());
        packet.writeInt(item.getPriceQuantity() > 0 ? item.getPrice() : 0);
        packet.writeInt(item.getPriceQuantity());
        packet.writeInt(item.getPeriod()); //Period  1min = 1, 1days = 1440
        packet.write0(34); //1.2.250+, 임시처리.
        packet.writeLong(ZERO_TIME);
        packet.writeLong(MAX_TIME);
        packet.writeInt(item.getTab());
        packet.writeInt(item.getTab() == 1 && sid == 9010040 ? 1 : 0); //isHiddenPotential
        packet.writeInt(0); //1.2.201+
        packet.writeShort(0); //1.2.239+
        if (!GameConstants.isThrowingStar(item.getItemId()) && !GameConstants.isBullet(item.getItemId())) {
            packet.writeShort(item.getQuantity() > 1 ? item.getQuantity() : 1);
            packet.writeShort(item.getBuyable());
        } else {
            packet.writeAsciiString("333333");
            packet.writeShort(BitTools.doubleToShortBits(ItemInformation.getInstance().getPrice(item.getItemId())));
            packet.writeShort(ItemInformation.getInstance().getSlotMax(c, item.getItemId()));
        }
        packet.write(i == null ? 0 : 1);
        if (i != null) {
            addItemInfo(packet, i, true, true, c.getPlayer());
        }
    }
    
    public static final void PartTimeJob(final WritingPacket packet, Triple<Byte, Long, Integer> part) {
        packet.write(part.getFirst());
        packet.writeReversedLong(getTime(part.getSecond()));
        packet.writeInt(part.getThird());
        packet.write(part.getThird() > 0 ? 1 : 0);
    }
    
    public static boolean isContainsBuffStat(final BuffStats buff, List<Triple<BuffStats, Integer, Boolean>> statups) {
        for (Triple<BuffStats, Integer, Boolean> stat : statups) {
            if (stat.getFirst().equals(buff)) {
                return true;
            }
        }
        return false;
    }
}
