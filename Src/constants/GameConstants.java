/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package constants;

import client.MapleCharacter;
import client.PlayerStats;
import client.items.IEquip;
import client.items.MapleInventoryType;
import client.items.MapleWeaponType;
import client.skills.ISkill;
import client.skills.SkillFactory;
import client.stats.BuffStats;
import client.stats.DiseaseStats;
import client.stats.MonsterStatus;
import database.MYSQL;
import server.maps.MapleMapObjectType;
import tools.Pair;
import tools.RandomStream.Randomizer;

import java.util.*;
import java.sql.*;

import launch.helpers.MapleCacheData;
import server.items.ItemInformation;

public class GameConstants {

    public static final List<Pair<String, String>> dList = new ArrayList<>();
    public static final int OMOK_SCORE = 122200;
    public static final int MATCH_SCORE = 122210;
    public static final List<MapleMapObjectType> rangedMapobjectTypes = Arrays.asList(
            MapleMapObjectType.ITEM,
            MapleMapObjectType.MONSTER,
            MapleMapObjectType.DOOR,
            MapleMapObjectType.REACTOR,
            MapleMapObjectType.SUMMON,
            MapleMapObjectType.MIST);
    public static final int MAX_MOB_BUFFSTAT = 3;
    public static final int[] itemBlock = {2340000, 2049100, 4001129, 2040037, 2040006, 2040007, 2040303, 2040403, 2040506, 2040507, 2040603, 2040709, 2040710, 2040711, 2040806, 2040903, 2041024, 2041025, 2043003, 2043103, 2043203, 2043303, 2043703, 2043803, 2044003, 2044103, 2044203, 2044303, 2044403, 2044503, 2044603, 2044908, 2044815, 2044019, 2044703};
    public static final int[] rankC = {70000000, 70000001, 70000002, 70000003, 70000004, 70000005, 70000006, 70000007, 70000008, 70000009, 70000010, 70000011, 70000012, 70000013};
    public static final int[] rankB = {70000014, 70000015, 70000016, 70000017, 70000018, 70000021, 70000022, 70000023, 70000024, 70000025, 70000026};
    public static final int[] rankA = {70000027, 70000028, 70000029, 70000030, 70000031, 70000032, 70000033, 70000034, 70000035, 70000036, 70000039, 70000040, 70000041, 70000042};
    public static final int[] rankS = {70000043, 70000044, 70000045, 70000047, 70000048, 70000049, 70000050, 70000051, 70000052, 70000053, 70000054, 70000055, 70000056, 70000057, 70000058, 70000059, 70000060, 70000061, 70000062};
    private static int[] dmgskinitem = {2431965, 2431966, 2431967, 2432084, 2432131, 2432153, 2432154, 2432207, 2432354, 2432355, 2432465, 2432479, 2432526, 2432532, 2432592, 2432637, 2432638, 2432639, 2432640, 2432658, 2432659, 2432660, 2432661, 2432710, 2432836, 2432972, 2432973, 2433063, 2433178, 2433456, 2433631, 2433655, 2433715, 2433804, 2433913, 2433919, 2433980, 2433981, 2433990, 2434248, 2434273, 2434274, 2434289, 2434390, 2434391, 2434528, 2434529, 2434530, 2434542, 2434546, 2434574, 2434575, 2434654, 2434655, 2434661, 2434710, 2434734, 2434824, 2434950, 2434951, 2435023, 2435024, 2435025, 2435026, 2435027, 2435028, 2435029, 2435030, 2435043, 2435044, 2435045, 2435046, 2435047, 2435140, 2435141, 2435157, 2435158, 2435159, 2435160, 2435161, 2435162, 2435166, 2435168, 2435169, 2435170, 2435171, 2435172, 2435173, 2435174, 2435175, 2435176, 2435177, 2435179, 2435182, 2435184, 2435222, 2435293, 2435313, 2435316, 2435325, 2435326, 2435331, 2435332, 2435333, 2435334, 2435408, 2435424, 2435425, 2435427, 2435428, 2435429, 2435430, 2435431, 2435432, 2435433, 2435456, 2435461, 2435473, 2435474, 2435477, 2435478, 2435490, 2435491, 2435493, 2435516, 2435521, 2435522, 2435523, 2435524, 2435538, 2435972, 2436023, 2436024, 2436026, 2436027, 2436028, 2436029, 2435832, 2435833, 2435839, 2435840, 2435841, 2436045, 2436083, 2436084, 2436085, 2436098, 2436103, 2436140, 2436182, 2436206, 2436212, 2436215, 2435905, 2435906, 2435948, 2435949, 2435955, 2435956, 2436132, 2436258, 2436259, 2436268, 2436400, 2436437, 2436521, 2436522, 2436528, 2436529, 2436553, 2436560, 2436578, 2436596, 2436611, 2436612, 2436679, 2436680, 2436681, 2436682, 2436683, 2436684, 2436785, 2436810, 2436951, 2436952, 2436953, 2437009, 2437022, 2437023, 2437024, 2437164, 2437238, 2437239, 2437243, 2437482, 2437495, 2437496, 2437498, 2437515, 2437691, 2437877, 2438143, 2438144, 2438352, 2438378, 2438379, 2438413, 2438415, 2438417, 2438419, 2438460};
    private static int[] dmgskinnum = {0, 1, 2, 1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 5, 4, 11, 14, 5, 4, 11, 14, 15, 16, 8, 17, 18, 20, 19, 22, 22, 23, 24, 26, 15, 27, 28, 29, 34, 35, 36, 37, 38, 39, 41, 42, 43, 47, 44, 45, 46, 48, 49, 50, 51, 52, 53, 74, 75, 7, 23, 26, 27, 34, 35, 36, 76, 77, 78, 5, 79, 80, 81, 82, 85, 86, 87, 88, 89, 84, 91, 24, 20, 15, 46, 1, 8, 11, 14, 16, 17, 83, 90, 92, 93, 94, 95, 100, 48, 49, 96, 97, 98, 99, 101, 109, 110, 102, 103, 104, 112, 111, 113, 114, 105, 106, 96, 99, 34, 12, 36, 35, 106, 115, 116, 117, 118, 119, 120, 127, 128, 129, 130, 131, 132, 133, 121, 122, 123, 124, 125, 134, 136, 137, 135, 1, 138, 140, 142, 141, 143, 144, 1114, 1115, 1118, 1119, 1125, 1126, 1133, 146, 147, 145, 148, 149, 150, 154, 152, 153, 155, 156, 157, 160, 158, 159, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 175, 172, 173, 174, 176, 177, 179, 178, 184, 180, 181, 182, 183, 185, 190, 191, 192, 193, 194, 195, 196, 197, 198, 199, 200
    }; // 치우씨 :: 테설님 USFM 자료 데미지스킨
    public static final int PENDANT_SLOT = 122700, MAX_BUFFSTAT = 15;
    private static final int[] cumulativeTraitExp = {20, 46, 80, 124, 181, 255, 351, 476, 639, 851, 1084,
        1340, 1622, 1932, 2273, 2648, 3061, 3515, 4014, 4563, 5128,
        5710, 6309, 6926, 7562, 8217, 8892, 9587, 10303, 11040, 11788,
        12547, 13307, 14089, 14883, 15689, 16507, 17337, 18179, 19034, 19902,
        20783, 21677, 22584, 23505, 24440, 25399, 26362, 27339, 28331, 29338,
        30360, 31397, 32450, 33519, 34604, 35705, 36823, 37958, 39110, 40279,
        41466, 32671, 43894, 45135, 46395, 47674, 48972, 50289, 51626, 52967,
        54312, 55661, 57014, 58371, 59732, 61097, 62466, 63839, 65216, 66597,
        67982, 69371, 70764, 72161, 73562, 74967, 76376, 77789, 79206, 80627,
        82052, 83481, 84914, 86351, 87792, 89237, 90686, 92139, 93596, 96000};
    public static final long[] exp = {
        1,
        15,
        34,
        57,
        92, //5
        135,
        372,
        560,
        840,
        1242, //10
        1242,
        1242,
        1242,
        1242,
        1242, //15
        1490,
        1788,
        2145,
        2574,
        3088, //20
        3705,
        4446,
        5335,
        6402,
        7682, //25
        9218,
        11061,
        13273,
        15927,
        19112, //30
        19112,
        19112,
        19112,
        19112,
        19112, //35
        22934,
        27520,
        33024,
        39628,
        47553, //40
        51357,
        55465,
        59902,
        64694,
        69869, //45
        75458,
        81494,
        88013,
        95054,
        102658, //50
        110870,
        119739,
        129318,
        139663,
        150836, //55
        162902,
        175934,
        190008,
        205208,
        221624, //60
        221624,
        221624,
        221624,
        221624,
        221624, //65
        239353,
        258501,
        279181,
        301515,
        325636, //70
        351686,
        379820,
        410205,
        443021,
        478462, //75
        511954,
        547790,
        586135,
        627164,
        671065, //80
        718039,
        768301,
        822082,
        879627,
        941200, //85
        1007084,
        1077579,
        1153009,
        1233719,
        1320079, //90
        1412484,
        1511357,
        1617151,
        1730351,
        1851475, //95
        1981078,
        2119753,
        2268135,
        2426904,
        2596787, //100
        2596787,
        2596787,
        2596787,
        2596787,
        2596787, //105
        2778562,
        2973061,
        3181175,
        3403857,
        3642126, //110
        3897074,
        4169869,
        4461759,
        4774082,
        5108267, //115
        5465845,
        5848454,
        6257845,
        6695894,
        7164606, //120
        7666128,
        8202756,
        8776948,
        9391334,
        10048727, //125
        10752137,
        11504786,
        12310121,
        13171829,
        14093857, //130
        15080426,
        16136055,
        17265578,
        18474168,
        19767359, //135,
        21151074,
        22631649,
        24215864,
        25910974,
        27724742, //140
        29665473,
        31742056,
        33963999,
        36341478,
        38885381, //145
        41607357,
        44519871,
        47636261,
        50970799,
        54538754, //150
        58356466,
        62441418,
        66812317,
        71489179,
        76493421, //155
        81847960,
        87577317,
        93707729,
        100267270,
        107285978, //160
        113723136,
        120546524,
        127779315,
        135446073,
        143572837, //165
        152187207,
        161318439,
        170997545,
        181257397,
        192132840, //170
        203660810,
        215880458,
        228833285,
        242563282,
        257117078, //175
        272544102,
        288896748,
        306230552,
        324604385,
        344080648, //180
        364725486,
        386609015,
        409805555,
        434393888,
        460457521, //185
        488084972,
        517370070,
        548412274,
        581317010,
        616196030, //190
        653167791,
        692357858,
        733899329,
        777933288,
        824609285, //195
        874085842,
        926530992,
        982122851,
        1041050222,
        1103513235, //200
        2207026470L,
        2648431764L,
        3178118116L,
        3813741739L,
        4576490086L, //205
        5491788103L,
        6590145723L,
        7908174867L,
        9489809840L,
        11387771808L, //210
        24142076232L,
        25590600805L,
        27126036853L,
        28753599064L,
        30478815007L, //215
        32307543907L,
        34245996541L,
        36300756333L,
        38478801712L,
        40787529814L, //220
        84838062013L,
        88231584493L,
        91760847872L,
        95431281786L,
        99248533057L, //225
        103218474379L,
        107347213354L,
        111641101888L,
        116106745963L,
        120751015801L, //230
        246332072234L,
        251258713678L,
        256283887951L,
        261409565710L,
        266637757024L, //235
        271970512164L,
        277409922407L,
        282958120855L,
        288617283272L,
        294389628937L, //240
        594667050452L,
        600613720956L,
        606619858165L,
        612686056746L,
        618812917313L, //245
        625001046846L,
        631251056950L,
        637563567519L,
        643939203194L,
        650378595225L, Integer.MAX_VALUE}; //250};
    private static final int[] closeness = {0, 1, 3, 6, 14, 31, 60, 108, 181, 287, 434, 632, 891, 1224, 1642, 2161, 2793,
        3557, 4467, 5542, 6801, 8263, 9950, 11882, 14084, 16578, 19391, 22547, 26074,
        30000};
    public static int[] soulItemid = {2591010, 2591011, 2591012, 2591013, 2591014, 2591015, 2591016, 2591017, 2591018, 2591019, 2591020, 2591021, 2591022, 2591023, 2591024, 2591025, 2591026,
        2591027, 2591028, 2591029, 2591030, 2591031, 2591032, 2591033, 2591034, 2591035, 2591036, 2591037, 2591038, 2591039, 2591040, 2591041, 2591042, 2591043, 2591044, 2591045, 2591046,
        2591047, 2591048, 2591049, 2591050, 2591051, 2591052, 2591053, 2591054, 2591055, 2591056, 2591057, 2591058, 2591059, 2591060, 2591061, 2591062, 2591063, 2591064, 2591065, 2591066,
        2591067, 2591068, 2591069, 2591070, 2591071, 2591072, 2591073, 2591074, 2591075, 2591076, 2591077, 2591078, 2591079, 2591080, 2591081, 2591082, 2591085, 2591086, 2591087, 2591088,
        2591089, 2591090, 2591091, 2591092, 2591093, 2591094, 2591095, 2591096, 2591097, 2591098, 2591099, 2591100, 2591101, 2591102, 2591103, 2591104, 2591105, 2591106, 2591107, 2591108,
        2591109, 2591110, 2591111, 2591112, 2591113, 2591114, 2591115, 2591116, 2591117, 2591118, 2591119, 2591120, 2591121, 2591122, 2591123, 2591124, 2591125, 2591126, 2591127, 2591128,
        2591129, 2591130, 2591131, 2591132, 2591133, 2591134, 2591135, 2591136, 2591137, 2591138, 2591139, 2591140, 2591141, 2591142, 2591143, 2591144, 2591145, 2591146, 2591147, 2591148,
        2591149, 2591150, 2591151, 2591152, 2591153, 2591154, 2591155, 2591156, 2591157, 2591158, 2591159, 2591160, 2591161, 2591162, 2591163, 2591164, 2591165, 2591166, 2591167, 2591168,
        2591169, 2591170, 2591171, 2591172, 2591173, 2591174, 2591175, 2591176, 2591177, 2591178, 2591179, 2591180, 2591181, 2591182, 2591183, 2591184, 2591185, 2591186, 2591187, 2591188,
        2591189, 2591190, 2591191, 2591192, 2591193, 2591194, 2591195, 2591196, 2591197, 2591198, 2591199, 2591200, 2591201, 2591202, 2591203, 2591204, 2591205, 2591206, 2591207, 2591208,
        2591209, 2591210, 2591211, 2591212, 2591213, 2591214, 2591215, 2591216, 2591217, 2591218, 2591219, 2591220, 2591221, 2591222, 2591223, 2591224, 2591225, 2591226, 2591227, 2591228,
        2591229, 2591230, 2591231, 2591232, 2591233, 2591234, 2591235, 2591236, 2591237, 2591238, 2591239, 2591240, 2591241, 2591242, 2591243, 2591244, 2591245, 2591246, 2591247, 2591248,
        2591249, 2591250, 2591251, 2591252, 2591253, 2591254, 2591255, 2591256, 2591257, 2591258, 2591259, 2591260, 2591261, 2591262, 2591263, 2591264, 2591265, 2591266, 2591267, 2591268,
        2591269, 2591270, 2591271, 2591272, 2591273, 2591274, 2591275, 2591276, 2591277, 2591278, 2591279, 2591288, 2591289, 2591290, 2591291, 2591292, 2591293, 2591294, 2591295, 2591296,
        2591297, 2591298, 2591299, 2591300, 2591301, 2591302, 2591303, 2591304, 2591305, 2591306, 2591307, 2591308, 2591309, 2591310, 2591311, 2591312, 2591313, 2591314, 2591315, 2591316,
        2591317, 2591318, 2591319, 2591320, 2591321, 2591322, 2591323, 2591324, 2591325, 2591326, 2591327, 2591328, 2591329, 2591330, 2591331, 2591332, 2591333, 2591334, 2591335, 2591336,
        2591337, 2591338, 2591339, 2591340, 2591341, 2591342, 2591343, 2591344, 2591345, 2591346, 2591347, 2591348, 2591349, 2591350, 2591351, 2591352, 2591353, 2591354, 2591355, 2591356,
        2591357, 2591358, 2591359, 2591360, 2591361, 2591362, 2591363, 2591364, 2591365, 2591366, 2591367, 2591368, 2591369, 2591370, 2591371, 2591372, 2591373, 2591374, 2591375, 2591376,
        2591377, 2591378, 2591379, 2591380, 2591381}; // 치우씨 :: 소울 아이템 부분
    public static short[] soulPotentials = {177, 102, 103, 104, 131, 132, 201, 101, 102, 103, 104, 131, 132, 201, 105, 106, 107, 108, 133, 134, 202, 105, 106, 107, 108, 133, 134, 202, 109, 110,
        111, 112, 135, 136, 203, 113, 114, 115, 116, 204, 151, 152, 137, 403, 603, 121, 122, 123, 124, 206, 155, 156, 139, 403, 603, 117, 118, 119, 120, 207, 153, 154, 138, 403, 603, 167,
        168, 169, 170, 208, 171, 172, 177, 0, 0, 0, 0, 101, 102, 103, 104, 131, 132, 201, 101, 102, 103, 104, 131, 132, 201, 105, 106, 107, 108, 133, 134, 202, 105, 106, 107, 108, 133,
        134, 202, 109, 110, 111, 112, 135, 136, 203, 113, 114, 115, 116, 204, 151, 152, 137, 117, 118, 119, 120, 207, 153, 154, 138, 121, 122, 123, 124, 206, 155, 156, 139, 101, 102,
        103, 104, 131, 132, 201, 163, 164, 165, 166, 210, 151, 152, 175, 0, 101, 102, 103, 104, 131, 132, 201, 163, 164, 165, 166, 210, 151, 152, 175, 167, 168, 169, 170, 208, 171,
        172, 177, 179, 180, 181, 182, 183, 184, 201, 185, 186, 187, 188, 205, 153, 154, 189, 0, 179, 180, 181, 182, 183, 184, 201, 185, 186, 187, 188, 205, 153, 154, 189, 109, 110,
        111, 112, 135, 136, 203, 117, 118, 119, 120, 207, 153, 154, 138, 0, 109, 110, 111, 112, 135, 136, 203, 117, 118, 119, 120, 205, 153, 154, 138, 101, 102, 103, 104, 131, 132,
        201, 167, 168, 169, 170, 208, 173, 172, 177, 0, 101, 102, 103, 104, 131, 132, 201, 167, 168, 169, 170, 208, 173, 172, 177, 167, 168, 169, 170, 208, 171, 172, 177, 0, 121,
        186, 187, 188, 205, 153, 154, 189, 0, 185, 186, 187, 188, 207, 153, 154, 189, 0, 185, 186, 187, 188, 205, 153, 154, 189, 0, 185, 186, 187, 188, 207, 153, 154, 189, 0, 185,
        186, 187, 188, 206, 153, 154, 189, 0, 121, 186, 187, 188, 205, 153, 154, 189, 185, 186, 187, 188, 205, 153, 154, 189, 185, 186, 187, 188, 205, 153, 154, 189, 185, 186, 187,
        188, 207, 153, 154, 189, 185, 186, 187, 188, 206, 153, 154, 189};
    private static final int[] mountexp = {0, 6, 25, 50, 105, 134, 196, 254, 263, 315, 367, 430, 543, 587, 679, 725, 897, 1146, 1394, 1701, 2247,
        2543, 2898, 3156, 3313, 3584, 3923, 4150, 4305, 4550};
    private static final int[] guildexp = {0, 20000, 160000, 540000, 1280000, 2500000, 4320000, 6860000, 10240000, 14580000};
    private static final int[] professionexp = {250, 250, 600, 1050, 1600, 2250, 3000, 3850, 4900, 5850, 45000, 160000, Integer.MAX_VALUE};
    private static final int[] pot = {1, 100, 400, 700, 1000};
    public static final int QUICK_SLOT = 123000;
    public static int[] Equipments_Bonus = {1122017};
    public static String[] processesKillList = {
        "cmd.exe",
        "MapleStoryT.exe",};

    public static int getTimelessRequiredEXP(final int level) {
        return (70 + (level * 10)) * 10000000;
    }

    public static int getReverseRequiredEXP(final int level) {
        return (60 + (level * 5)) * 10000000;
    }

    public static final long getExpNeededForLevel(final int level) {
        return exp[level];
    }

    public static final String getProcessesKillList(final int index) {
        return processesKillList[index];
    }

    public static final int getClosenessNeededForLevel(final int level) {
        return closeness[level - 1];
    }

    public static final int getProfessionExpNeededForLevel(final int level) {
        return professionexp[level];
    }

    public static final int getPotExpNeededForLevel(final int level) {
        return pot[level];
    }

    public static final double maxViewRangeSq() {
        return /*1000 * 1000;*/ Double.POSITIVE_INFINITY; // 800 * 800
    }

    public static final double maxRange() {
        return Double.POSITIVE_INFINITY;
    }

    public static final int getFreeRequestSkill(final int job) {
        switch (job) {
            case 112:
            case 122:
            case 132:
                return 100;
            case 212:
            case 222:
            case 232:
                return 200;
            case 312:
            case 322:
                return 300;
            case 412:
            case 422:
                return 400;
            case 434:
                return 401;
            case 512:
            case 522:
                return 500;
            case 532:
                return 501;
        }
        return 0;
    }

    public static final int isFreeRequestMeso(final int lvl) {
        switch (lvl) {
            case 100:
            case 101:
            case 102:
            case 103:
            case 104:
            case 105:
                return 10000000;
            case 106:
                return 10050000;
            case 107:
                return 10200000;
            case 108:
                return 104500000;
            case 109:
                return 10080000;
            case 110:
                return 11250000;
            case 111:
                return 11800000;
            case 112:
                return 12450000;
            case 113:
                return 13200000;
            case 114:
                return 14050000;
            case 115:
                return 15000000;
            case 116:
                return 16050000;
            case 117:
                return 17200000;
            case 118:
                return 18450000;
            case 119:
                return 19800000;
            case 120:
                return 21250000;
            case 121:
                return 22800000;
            case 122:
                return 24450000;
            case 123:
                return 26200000;
            case 124:
                return 28050000;
            case 125:
                return 30000000;
            case 126:
                return 32050000;
            case 127:
                return 34200000;
            case 128:
                return 36450000;
            case 129:
                return 38800000;
            case 130:
                return 41250000;
            case 131:
                return 43800000;
            case 132:
                return 46450000;
            case 133:
                return 49200000;
            case 134:
                return 52050000;
            case 135:
                return 55000000;
            case 136:
                return 58050000;
            case 137:
                return 61200000;
            case 138:
                return 64450000;
            case 139:
                return 67800000;
            case 140:
                return 71250000;
            case 141:
                return 74800000;
            case 142:
                return 78450000;
            case 143:
                return 82200000;
            case 144:
                return 86050000;
            case 145:
                return 90000000;
            case 146:
                return 94050000;
            case 147:
                return 98200000;
            case 148:
                return 102450000;
            case 149:
                return 106800000;
            case 150:
                return 111250000;
            case 151:
                return 115800000;
            case 152:
                return 120450000;
            case 153:
                return 125200000;
            case 154:
                return 130050000;
            case 155:
                return 135000000;
            case 156:
                return 140050000;
            case 157:
                return 145200000;
            case 158:
                return 150450000;
            case 159:
                return 155800000;
            case 160:
                return 161250000;
            case 161:
                return 166800000;
            case 162:
                return 172450000;
            case 163:
                return 178200000;
            case 164:
                return 184050000;
            case 165:
                return 190000000;
            case 166:
                return 196050000;
            case 167:
                return 202200000;
            case 168:
                return 208450000;
            case 169:
                return 214800000;
            case 170:
                return 221250000;
            case 171:
                return 227800000;
            case 172:
                return 234450000;
            case 173:
                return 241200000;
            case 174:
                return 248050000;
            case 175:
                return 255000000;
            case 176:
                return 262050000;
            case 177:
                return 269200000;
            case 178:
                return 276450000;
            case 179:
                return 283800000;
            case 180:
                return 291250000;
            case 181:
                return 298800000;
            case 182:
                return 306450000;
            case 183:
                return 314200000;
            case 184:
                return 322050000;
            case 185:
                return 330000000;
            case 186:
                return 338050000;
            case 187:
                return 346200000;
            case 188:
                return 354450000;
            case 189:
                return 362800000;
            case 190:
                return 371250000;
            case 191:
                return 379800000;
            case 192:
                return 388450000;
            case 193:
                return 397200000;
            case 194:
                return 406050000;
            case 195:
                return 415000000;
            case 196:
                return 424050000;
            case 197:
                return 433200000;
            case 198:
                return 442450000;
            case 199:
                return 451800000;
            case 200:
                return 461250000;
            case 201:
                return 470800000;
            case 202:
                return 480450000;
            case 203:
                return 490200000;
            case 204:
                return 500050000;
            case 205:
                return 510000000;
            case 206:
                return 520500000;
            case 207:
                return 530200000;
            case 208:
                return 540450000;
            case 209:
                return 550800000;
            case 210:
                return 561250000;
            case 211:
                return 571800000;
            case 212:
                return 582450000;
            case 213:
                return 593200000;
            case 214:
                return 604050000;
            case 215:
                return 615000000;
            case 216:
                return 626050000;
            case 217:
                return 637200000;
            case 218:
                return 648450000;
            case 219:
                return 659800000;
            case 220:
                return 671250000;
            case 221:
                return 682800000;
            case 222:
                return 694450000;
            case 223:
                return 706200000;
            case 224:
                return 718050000;
            case 225:
                return 730000000;
            case 226:
                return 742050000;
            case 227:
                return 754200000;
            case 228:
                return 766450000;
            case 229:
                return 778800000;
            case 230:
                return 791250000;
            case 231:
                return 803800000;
            case 232:
                return 816450000;
            case 233:
                return 829200000;
            case 234:
                return 842050000;
            case 235:
                return 855000000;
            case 236:
                return 868050000;
            case 237:
                return 881200000;
            case 238:
                return 894450000;
            case 239:
                return 907800000;
            case 240:
                return 921250000;
            case 241:
                return 934800000;
            case 242:
                return 948450000;
            case 243:
                return 962200000;
            case 244:
                return 976050000;
            case 245:
                return 990000000;
            case 246:
                return 1004050000;
            case 247:
                return 1018200000;
            case 248:
                return 1032450000;
            case 249:
                return 1046800000;
            case 250:
                return 1061250000;
        }
        return 0;
    }

    public static final boolean isJobFamily(final int baseJob, final int currentJob) {
        return currentJob >= baseJob
                && currentJob / 100 == baseJob / 100;
    }

    public static final boolean isKOC(final int job) {
        return job >= 1000 && job < 2000;
    }

    public static final boolean isAran(final int job) {
        return job >= 2000 && job <= 2112 && job != 2001;
    }

    public static final boolean isAdventurer(final int job) {
        return job >= 0 && job < 1000;
    }

    public static final boolean isNightWalker(final int job) {
        return job == 1400 || (job >= 1400 && job <= 1412);
    }

    public static final boolean isReturnCygNus(final int job) {
        return job == 1000 || (job >= 1500 && job <= 1512);
    }

    public final static boolean isForceIncrease(int skillid) {
        switch (skillid) {
            case 24100003:
            case 24120002:
            case 31000004:
            case 31001006:
            case 31001007:
            case 31001008:

            case 30010166:
            case 30011167:
            case 30011168:
            case 30011169:
            case 30011170:
                return true;
        }
        return false;
    }

    public static final boolean isLinkedAttackSkill(final int id) {
        switch (id) {
            case 21110007:
            case 21110008:
            case 21120009:
            case 21120010:
            case 4321001:
                return true;
        }
        return false;
    }

    public static final int getLinkedBuffSkill(final int id) {
        switch (id) {
            case 61120008:
                return 61111008;
            case 11121011:
            case 11121012:
                return 11121005;
            case 142121008:
                return 142120015;
        }
        return id;
    }

    public static final int getLinkedAttackSkill(final int id) {
        switch (id) {
            case 21110007:
            case 21110008:
                return 21110002;
            case 21120009:
            case 21120010:
                return 21120002;
            case 4321001:
                return 4321000;
            case 33001011:
                return 33001010;
            case 33101008:
                return 33101004;
            case 35101009:
            case 35101010:
                return 35100008;
            case 35121013:
                return 35120013;
            case 35121011:
                return 35121009;
            case 35111009:
            case 35111010: //새틀라이트
                return 35111001;
            case 35100004:
                return 35101004;
            case 32001007:
            case 32001008:
            case 32001009:
            case 32001010:
            case 32001011:
                return 32001001;
            case 5300007:
                return 5301001;
            case 5320011:
                return 5321004;
            case 23101007:
                return 23101001;
            case 23111010:
            case 23111009:
                return 23111008;
            case 31001006:
            case 31001007:
            case 31001008:
                return 31000004;
            case 27120211:
                return 27121201; //모닝 스타폴
            case 61001004:
            case 61001005:
            case 61110212:
            case 61120219:
                return 61001000; //드래곤슬래시
            case 61110211:
            case 61120007:
            case 61121217:
                return 61101002; //윌오브소드
            case 61111215:
                return 61001101; // 플레임 샷
            case 61111217:
                return 61101101; // 피어스 러쉬
            case 61111216:
                return 61101100; // 임팩트 웨이브
            case 61111219:
                return 61111101; // 체인풀링
            case 61111113:
            case 61111218:
                return 61111100; //윙비트 - 커맨드
            case 61121201:
                return 61121100; //기가슬래셔
            case 61121203:
                return 61121102; //블루스트릭
            case 61110009:
                return 61111003; //리게인 스트렝스
            case 61121116:
                return 61121104; //소드스트라이크 - 폭팔
            case 61121223:
                return 61121221; //소드 스트라이크 - 폭팔
            case 61121221:
                return 61121104; // 소드 스트라이크
            case 65101006:
                return 65101106;
            case 65121007:
            case 65121008:
                return 65121101;
            case 61111220:
                return 61121105; // 인퍼널 브레스
            /* 카이저 종료 */
            case 65111007: //소울 시커
                return 65111100;
            case 4100012: //마크 오브 어쌔신
                return 4100011;
            case 24121010:
                return 24121003;
            case 24111008:
                return 24111006;
            case 5001008:
                return 5001005;
            case 61120008:
                return 61111008;
            case 51100006:
                return 51101006;
            case 31011004:
            case 31011005:
            case 31011006:
            case 31011007:
                return 31011000;
            case 31201007:
            case 31201008:
            case 31201009:
            case 31201010:
                return 31201000;
            case 31211007:
            case 31211008:
            case 31211009:
            case 31211010:
                return 31211000;
            case 31221009:
            case 31221010:
            case 31221011:
            case 31221012:
                return 31221000;
            case 31211011:
                return 31211002;
            case 31221014:
                return 31221001;
            case 25100010:
                return 25100009;
            case 25120115:
                return 25120110;
            case 36101008:
            case 36101009:
                return 36101000;
            case 36111009:
            case 36111010:
                return 36111000;
            case 36121011:
            case 36121012:
                return 36121001;
            case 35100009:
                return 35100009;
            case 2121055:
                return 2121052;
            case 11121055:
                return 11121052;
            case 1120017:
                return 1121008;
            case 25000003:
                return 25001002;
            case 25000001:
                return 25001000;
            case 25100001:
                return 25101000;
            case 25110001:
            case 25110002:
            case 25110003:
                return 25111000;
            case 25120001:
            case 25120002:
            case 25120003:
                return 25121000;
            case 95001000:
                return 3111013; // 애로우 플래터
            case 4210014: //메소 익스플로젼
                return 4211006;
            case 101000102: //어드밴스드 파워 스텀프(충격파) 
                return 101000101;
            /* 나이트워커 시작 */
            case 14101021:
                return 14101020; // 트리플 스로우
            case 14111021:
                return 14111020; // 쿼드러플 스로우
            case 14111023:
                return 14111022; // 스타더스트
            case 14121002:
                return 14121001; // 퀸터플 스로우
            /* 나이트워커 종료 */
        }
        return id;
    }

    public static final boolean SoulMoonSkill(final int skillid) {
        switch (skillid) {
            case 11101022:
            case 11111022:
            case 11121005:
            case 11121011:
            case 11121012:
                return true;
        }
        return false;
    }

    public static final int getBOF_ForJob(final int job) {
        if (isAdventurer(job)) {
            return 12;
        } else if (isKOC(job)) {
            return 10000012;
        } else if (isEvan(job)) {
            return 20010012;
        } else if (isMercedes(job)) {
            return 20020012;
        } else if (isDemonSlayer(job) || isDemonAvenger(job)) {
            return 30010012;
        } else if (isDemonAvenger(job)) {
            return 30010012;
        } else if (isXenon(job)) {
            return 30020012;
        } else if (isResistance(job)) {
            return 30000012;
        } else if (isAran(job)) {
            return 20000012;
        } else if (isMikhail(job)) {
            return 50000012;
        } else if (isPhantom(job)) {
            return 20030012;
        } else if (isLuminous(job)) {
            return 20040012;
        } else if (isKaiser(job)) {
            return 60000012;
        } else if (isAngelicBuster(job)) {
            return 60010012;
        } else if (isZero(job)) {
            return 100000012;
        }
        return 12;
    }

    public static final int getBOE_ForJob(final int job) {
        if (isAdventurer(job)) {
            return 73;
        } else if (isKOC(job)) {
            return 10000073;
        } else if (isEvan(job)) {
            return 20010073;
        } else if (isMercedes(job)) {
            return 20020073;
        } else if (isDemonSlayer(job) || isDemonAvenger(job)) {
            return 30010073;
        } else if (isDemonAvenger(job)) {
            return 30010073;
        } else if (isXenon(job)) {
            return 30020073;
        } else if (isResistance(job)) {
            return 30000073;
        } else if (isAran(job)) {
            return 20000073;
        } else if (isMikhail(job)) {
            return 50000073;
        } else if (isPhantom(job)) {
            return 20030073;
        } else if (isLuminous(job)) {
            return 20040073;
        } else if (isKaiser(job)) {
            return 60000073;
        } else if (isAngelicBuster(job)) {
            return 60010073;
        } else if (isZero(job)) {
            return 100000073;
        }
        return 73;
    }

    public static final boolean isElementAmp_Skill(final int skill) {
        switch (skill) {
            case 2110001:
            case 2210001:
            case 12110001:
            case 22150000:
                return true;
        }
        return false;
    }

    public static final int getJobShortValue(int job) {
        if (job >= 1000) {
            job -= (job / 1000) * 1000;
        }
        job /= 100;
        if (job == 4) { // For some reason dagger/ claw is 8.. IDK
            job *= 2;
        } else if (job == 3) {
            job += 1;
        } else if (job == 5) {
            job += 11; // 16
        }
        return job;
    }

    public static final boolean isUsingStarJob(final int job) {
        switch (job) {
            case 1400:
            case 1410:
            case 1411:
            case 1412:
            case 400:
            case 410:
            case 411:
            case 412:
                return true;
        }
        return false;
    }

    public static final boolean isUsingArrowForBowJob(final int job) {
        switch (job) {
            case 300:
            case 310:
            case 311:
            case 312:
            case 1312:
            case 1311:
            case 1310:
            case 1300:
                return true;
        }
        return false;
    }

    public static final boolean isUsingArrowForCrossBowJob(final int job) {
        switch (job) {
            case 300:
            case 320:
            case 321:
            case 322:
            case 3312:
            case 3311:
            case 3310:
            case 3300:
                return true;
        }
        return false;
    }

    public static final boolean isUsingBulletJob(final int job) {
        switch (job) {
            case 500:
            case 520:
            case 521:
            case 522:
            case 3500:
            case 3510:
            case 3511:
            case 3512:
                return true;
        }
        return false;
    }

    public static final boolean isCSSaleLock(final int itemId) {
        switch (itemId) {
            case 5044000:
            case 5680193:
            case 5680194:
            case 9103281:
            case 9103282:
            case 9103283:
            case 9103284:
            case 9103280:
            case 9103333:
            case 9103332:
            case 5044001:
            case 5044002:
            case 5044006:
            case 5044007:
            case 5077000:
            case 5062005:
            case 5062006:
            case 5062009:
            case 5062010:
            case 5062090:
            case 5062100:
            case 5062103:
            case 5062200:
            case 5062201:
            case 5062500:
            case 5062501:
            case 5062800:
            case 5062801:
            case 5490000:
            case 5490001:
            case 1002140:
            case 5140000:
            case 5140001:
            case 5140002:
            case 5140003:
            case 5140004:
            case 5830000:
            case 5830001:
            case 5830002:
            case 5680145:
            case 5680146:
            case 5680147:
            case 5680148:
            case 5680149:
            case 5680150:
            case 5680151:
            case 5680155:
            case 5502009:
                return true;
        }
        return false;
    }

    public static final boolean isBullet(final int itemId) {
        final int id = itemId / 10000;
        if (id == 233) {
            return true;
        } else {
            return false;
        }
    }

    public static final boolean isThrowingStar(final int itemId) { //작업자 by. 달님
        final int id = itemId / 10000;
        if (id == 207) {
            return true;
        } else {
            return false;
        }
    }

    public static final boolean isRechargable(final int itemId) {
        final int id = itemId / 10000;
        switch (id) {
            case 233:
            case 207:
                return true;
        }
        return false;
    }

    public static final boolean isStar(final int itemId) {
        final int id = itemId / 10000;
        switch (id) {
            case 207:
                return true;
        }
        return false;
    }

    public static final int getMasterySkill(final int job) {
        if (job >= 1410 && job <= 1412) { //나이트 워커
            return 14100000;
        } else if (job >= 410 && job <= 412) { //어쌔신
            return 4100000;
        } else if (job >= 520 && job <= 522) { //건슬링거
            return 5200000;
        }
        return 0;
    }

    public static final boolean isCore(final int itemId) {
        final int id = itemId / 100000;
        if (id == 36) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean isMedal(final int itemId) {
        return itemId / 10000 == 114;
    }

    public static boolean isOverall(final int itemId) {
        return itemId / 10000 == 105;
    }

    public static boolean isSecondaryWeapon(final int itemId) {
        return itemId / 10000 == 135;
    }

    public static final boolean isPet(final int itemId) {
        return itemId >= 5000000 && itemId <= 5000999;
    }

    public static final int getPetBuff(final int itemId) {
        switch (itemId) {
            //마족
            case 5000228:
            case 5000229:
            case 5000230:
            case 5000231:
            case 5000232:
            case 5000233:
                return 7;
            // 드래곤
            case 5000243:
            case 5000244:
            case 5000245:
                return 20;
            // 곰돌이     
            case 5000249:
            case 5000250:
            case 5000251:
                return 26;
            //펌킨잭
            case 5000256:
            case 5000257:
            case 5000258:
                return 29;
            //코알라
            case 5000271:
            case 5000272:
            case 5000273:
                return 56;
            //다람쥐    
            case 5000275:
            case 5000276:
            case 5000277:
                return 63;
            //NEW 메투스
            case 5000281:
            case 5000282:
            case 5000283:
                return 73;
            // 천사
            case 5000290:
            case 5000291:
            case 5000292:
                return 77;
            //어항속상어 단일
            case 5000239:
                return 13;
            //핑크빈 단일
            case 5000240:
            case 5000452:
                return 17;
            //루티펫
            case 5000293:
            case 5000294:
            case 5000295:
                return 81;
            //쁘띠펫
            case 5000296:
            case 5000297:
            case 5000298:
                return 98;
            //루타비스
            case 5000309:
            case 5000310:
            case 5000311:
                return 101;
            // 힘세고 강한 딜로
            case 5000320:
            case 5000321:
            case 5000322:
                return 111;
            // 쁘띠군단장
            case 5000330:
            case 5000331:
            case 5000332:
                return 120;
            // 밤톨형제
            case 5000342:
            case 5000343:
            case 5000344:
                return 138;
            //촛불펫
            case 5000352:
            case 5000353:
            case 5000354:
                return 166;
            //베이비슈펫
            case 5000365:
            case 5000366:
            case 5000367:
                return 288;
            // 해피해피콩
            case 5000368:
                return 294;
            //펭군펫
            case 5000375:
            case 5000376:
            case 5000377:
                return 295;
            // 쁘띠랑 단일
            case 5000383:
                return 307;
            // 치와와펫
            case 5000385:
            case 5000386:
            case 5000387:
                return 315;
            // 병정 펫
            case 5000402:
            case 5000403:
            case 5000404:
                return 320;
            // 카멜레온펫
            case 5000405:
            case 5000406:
            case 5000407:
                return 323;
            // 블랙헤븐
            case 5000415:
            case 5000416:
            case 5000417:
                return 326;
            //뉴하프물범
            case 5000429:
            case 5000430:
            case 5000431:
            case 5000432:
                return 331;
            //지켜양
            case 5000433:
            case 5000434:
            case 5000435:
                return 344;
            //프렌즈펫 
            case 5000443:
            case 5000444:
            case 5000445:
                return 347;
            //마카롱
            case 5000446:
            case 5000447:
            case 5000448:
                return 355;
            //물범 프린스
            case 5000460:
            case 5000461:
            case 5000462:
                return 358;
            //아깽이단
            case 5000469:
            case 5000470:
            case 5000471:
                return 361;
            //한입만 먹어봐
            case 5000474:
            case 5000475:
            case 5000476:
                return 196;
            //1st히어로즈
            case 5000484:
            case 5000485:
            case 5000486:
                return 379;
            //2nd히어로즈 
            case 5000490:
            case 5000491:
            case 5000492:
                return 382;
            //데미안의포로들 
            case 5000494:
            case 5000495:
            case 5000496:
                return 385;
            //갓트롤
            case 5000600:
            case 5000601:
            case 5000602:
                return 388;
            //데몽
            case 5001000:
            case 5001001:
            case 5001002:
                return 305;
            //데블
            case 5001003:
            case 5001004:
            case 5001005:
                return 306;
            // 미호
            case 5001006:
            case 5001007:
            case 5001008:
                return 318;
            // 절세미호
            case 5001009:
            case 5001010:
            case 5001011:
                return 319;
        }
        return 0;
    }

    public static final boolean isArrowForCrossBow(final int itemId) {
        return itemId >= 2061000 && itemId < 2062000;
    }

    public static final boolean isArrowForBow(final int itemId) {
        return itemId >= 2060000 && itemId < 2061000;
    }

    public static final boolean isMagicWeapon(final int itemId) {
        final int s = itemId / 10000;
        return s == 137 || s == 138;
    }

    public static final boolean isWeapon(final int itemId) {
        return (itemId >= 1212000 && itemId < 1500000) || (itemId >= 1520000 && itemId < 1540000);
    }

    public static final MapleInventoryType getInventoryType(final int itemId) {
        final byte type = (byte) (itemId / 1000000);
        if (type < 1 || type > 5) {
            return MapleInventoryType.UNDEFINED;
        }
        return MapleInventoryType.getByType(type);
    }

    public static final MapleWeaponType getWeaponType(final int itemId) {
        int cat = itemId / 10000;
        cat = cat % 100;
        switch (cat) {
            case 58:
                return MapleWeaponType.GUNTLIT;
            case 26:
                return MapleWeaponType.LIMITER;
            case 21:
                return MapleWeaponType.PLANE;
            case 22:
                return MapleWeaponType.SOULSHOOTER;
            case 23:
                return MapleWeaponType.DESPERADO;
            case 24:
                return MapleWeaponType.ENERGYSWORD;
            case 30:
                return MapleWeaponType.SWORD1H;
            case 31:
                return MapleWeaponType.AXE1H;
            case 32:
                return MapleWeaponType.BLUNT1H;
            case 33:
                return MapleWeaponType.DAGGER;
            case 34:
                return MapleWeaponType.KATARA;
            case 35:
                return MapleWeaponType.JS;
            case 36:
                return MapleWeaponType.CAIN;
            case 37:
                return MapleWeaponType.WAND;
            case 38:
                return MapleWeaponType.STAFF;
            case 40:
                return MapleWeaponType.SWORD2H;
            case 41:
                return MapleWeaponType.AXE2H;
            case 42:
                return MapleWeaponType.BLUNT2H;
            case 43:
                return MapleWeaponType.SPEAR;
            case 44:
                return MapleWeaponType.POLE_ARM;
            case 45:
                return MapleWeaponType.BOW;
            case 46:
                return MapleWeaponType.CROSSBOW;
            case 47:
                return MapleWeaponType.CLAW;
            case 48:
                return MapleWeaponType.KNUCKLE;
            case 49:
                return MapleWeaponType.GUN;
            case 50:
            case 51:
                return MapleWeaponType.GATHERTOOL;
            case 52:
                return MapleWeaponType.DUALBOW;
            case 53:
                return MapleWeaponType.HANDCANNON;
            case 56:
                return MapleWeaponType.SWORD;
            case 57:
                return MapleWeaponType.TEDO;
        }
        return MapleWeaponType.NOT_A_WEAPON;
    }

    public static boolean OnHideSkillRequest(int skill) {
        switch (skill) {
            case 1100002:
            case 1120013:
            case 1200002:
            case 1300002:
            case 3100001:
            case 3200001:
            case 4341054:
            case 5111009://CoolingSkill
            case 5120021:
            case 11101002:
            case 13101002:
            case 33100009:
            case 21100010:
            case 21120012:
            case 22000015:
            case 22150004:
            case 31220007:
            case 51100002:
            case 51120002:
            case 101000102:
                return true;
        }
        return false;
    }

    public static final boolean isShield(final int itemId) {
        int cat = itemId / 10000;
        cat = cat % 100;
        return cat == 9;
    }

    public static final boolean isEquip(final int itemId) {
        return itemId / 1000000 == 1;
    }

    public static final boolean isEtc(final int itemid) {
        return itemid / 1000000 == 4;
    }

    public static final boolean isConsume(final int itemid) {
        return itemid / 1000000 == 2;
    }

    public static final boolean isThief(final int job) {
        switch (job) {
            case 400:
            case 410:
            case 411:
            case 412:
            case 420:
            case 421:
            case 422:
            case 430:
            case 431:
            case 432:
            case 433:
            case 434:
            case 1400:
            case 1410:
            case 1411:
            case 1412:
                return true;
        }
        return false;
    }

    public static final boolean isHero(final int job) {
        return (job >= 110 && job <= 112);
    }

    public static final boolean isPaladin(final int job) {
        return (job >= 120 && job <= 122);
    }

    public static final boolean isDarkNight(final int job) {
        return (job >= 130 && job <= 132);
    }

    public static final boolean isFireMagic(final int job) {
        return (job >= 210 && job <= 212);
    }

    public static final boolean isIceMagic(final int job) {
        return (job >= 220 && job <= 222);
    }

    public static final boolean isBiShop(final int job) {
        return (job >= 230 && job <= 232);
    }

    public static final boolean isBowMaster(final int job) {
        return (job >= 310 && job <= 312);
    }

    public static final boolean isChiron(final int job) {
        return (job >= 320 && job <= 312);
    }

    public static final boolean isNightRoad(final int job) {
        return (job >= 410 && job <= 412);
    }

    public static final boolean isShador(final int job) {
        return (job >= 420 && job <= 422);
    }

    public static final boolean isViper(final int job) {
        return (job >= 510 && job <= 512);
    }

    public static final boolean isSoulMaster(final int job) {
        return (job >= 1100 && job <= 1112);
    }

    public static final boolean isFlameWizard(final int job) {
        return (job >= 1200 && job <= 1212);
    }

    public static final boolean isStriker(final int job) {
        return (job >= 1500 && job <= 1512);
    }

    public static boolean isZeroWeapon(int itemId) {
        return (isAlphaWeapon(itemId) || isBetaWeapon(itemId));
    }

    public static boolean isBetaWeapon(int itemId) {
        return itemId / 10000 == 156;
    }

    public static boolean isAlphaWeapon(int itemId) {
        return itemId / 10000 == 157;
    }

    public static final boolean isCleanSlate(int itemId) {
        return itemId / 100 == 20490;
    }

    public static final boolean isChaosScroll(int itemId) {
        return itemId / 100 == 20491;
    }

    public static final boolean isTwoHanded(final int itemId) {
        switch (getWeaponType(itemId)) {
            case AXE2H:
            case GUN:
            case KNUCKLE:
            case BLUNT2H:
            case BOW:
            case CLAW:
            case CROSSBOW:
            case POLE_ARM:
            case SPEAR:
            case SWORD2H:
                return true;
            default:
                return false;
        }
    }

    public static final boolean isTownScroll(final int id) {
        return id >= 2030000 && id < 2030020;
    }

    public static final boolean isGun(final int id) {
        return id >= 1492000 && id <= 1500000;
    }

    public static final boolean isUse(final int id) {
        return id >= 2000000 && id <= 2490000;
    }

    public static final boolean isSummonSack(final int id) {
        return id / 10000 == 210;
    }

    public static final boolean isMonsterCard(final int id) {
        return id / 10000 == 238;
    }

    public static final boolean isSpecialCard(final int id) {
        return id / 100 >= 2388;
    }

    public static final int getCardShortId(final int id) {
        return id % 10000;
    }

    public static final boolean isGem(final int id) {
        return id >= 4250000 && id <= 4251402;
    }

    public static final boolean isCustomQuest(final int id) {
        if (id > 99999) {
            return true;
        }
        switch (id) {
            case 7200: // Papulatus record and count
            case 20022: // Cygnus tutor quest
            case 20021: // Cygnus tutor quest
            case 20020: // Cygnus tutor quest
                return true;
        }
        return false;
    }

    public static final int getTaxAmount(final long meso) {
        if (meso >= 100000000) {
            return (int) Math.round(0.06 * meso);
        } else if (meso >= 25000000) {
            return (int) Math.round(0.05 * meso);
        } else if (meso >= 10000000) {
            return (int) Math.round(0.04 * meso);
        } else if (meso >= 5000000) {
            return (int) Math.round(0.03 * meso);
        } else if (meso >= 1000000) {
            return (int) Math.round(0.018 * meso);
        } else if (meso >= 100000) {
            return (int) Math.round(0.008 * meso);
        }
        return 0;
    }

    public static final int EntrustedStoreTax(final int meso) {
        if (meso >= 100000000) {
            return (int) Math.round(0.03 * meso);
        } else if (meso >= 25000000) {
            return (int) Math.round(0.025 * meso);
        } else if (meso >= 10000000) {
            return (int) Math.round(0.02 * meso);
        } else if (meso >= 5000000) {
            return (int) Math.round(0.015 * meso);
        } else if (meso >= 1000000) {
            return (int) Math.round(0.009 * meso);
        } else if (meso >= 100000) {
            return (int) Math.round(0.004 * meso);
        }
        return 0;
    }

    public static final short getAttackDelay(final int id) {
        switch (id) { // Assume it's faster(2)
            case 3111009: // Storm of Arrow
            case 13111002: // Storm of Arrow
            case 5221004: // Rapidfire
            case 4221016: //Assassinate?
            case 5201006: // Recoil shot/ Back stab shot
                return 120;
            case 13101005: // Storm Break
                return 360;
            case 5001003: // Double Fire
                return 390;
            case 5001001: // Straight/ Flash Fist
            case 15001001: // Straight/ Flash Fist
            case 1321003: // Rush
            case 1221007: // Rush
            case 1121006: // Rush
                return 450;
            case 5211004: // Flamethrower
            case 5211005: // Ice Splitter
                return 480;
            case 0: // Normal Attack, TODO delay for each weapon type
            case 5111002: // Energy Blast
            case 15101005: // Energy Blast
            case 1001004: // Power Strike
            case 11001002: // Power Strike
            case 1001005: // Slash Blast
            case 11001003: // Slash Blast
            case 1311005: // Sacrifice
            case 1321015:
                return 570;
            case 3111006: // Strafe
            case 311004: // Arrow Rain
            case 13111000: // Arrow Rain
            case 3111003: // Inferno
            case 3101005: // Arrow Bomb
            case 4001344: // Lucky Seven
            case 14001004: // Lucky seven
            case 4121007: // Triple Throw
            case 14111005: // Triple Throw
            case 4111004: // Shadow Meso
            case 4101005: // Drain
            case 4211004: // Band of Thieves
            case 4201004: // Steal
            case 4001334: // Double Stab
            case 5221007: // Battleship Cannon
            case 1211002: // Charged blow
            case 2301002: // Heal
            case 1311003: // Dragon Fury : Spear
            case 1311004: // Dragon Fury : Pole Arm
            case 3211006: // Strafe
            case 3211004: // Arrow Eruption
            case 3211003: // Blizzard Arrow
            case 3201005: // Iron Arrow
            case 3221001: // Piercing
            case 4111005: // Avenger
            case 14111002: // Avenger
            case 5201001: // Invisible shot
            case 5101004: // Corkscrew Blow
            case 15101003: // Corkscrew Blow
            case 1121008: // Brandish
            case 11111004: // Brandish
                return 600;
            case 5201004: // Blank Shot/ Fake shot
            case 5211000: // Burst Fire/ Triple Fire
            case 5001002: // Sommersault Kick
            case 15001002: // Sommersault Kick
            case 4221007: // Boomerang Stab
            case 1311001: // Spear Crusher, 16~30 pts = 810
            case 1311002: // PA Crusher, 16~30 pts = 810
            case 2221006: // Chain Lightning
                return 660;
            case 4121008: // Ninja Storm
            case 4201005: // Savage blow
            case 5211006: // Homing Beacon
            case 5221008: // Battleship Torpedo
            case 5101002: // Backspin Blow
            case 2001005: // Magic Claw
            case 12001003: // Magic Claw
            case 2001004: // Energy Bolt
            case 2301005: // Holy Arrow
            case 2121001: // Big Bang
            case 2221001: // Big Bang
            case 2321001: // Big Bang
            case 2321007: // Angel's Ray
            case 2101004: // Fire Arrow
            case 12101002: // Fire Arrow
            case 2101005: // Poison Breath
            case 2121003: // Fire Demon
            case 2221003: // Ice Demon
            case 2121006: // Paralyze
            case 2201005: // Thunderbolt
            case 2201004: // Cold Beam
            case 5121005: // Snatch
            case 12111006: // Fire Strike
            case 11101004: // Soul Blade
                return 750;
            case 15111007: // Shark Wave
            case 2111006: // Elemental Composition
            case 2211006: // Elemental Composition
                return 810;
            case 13111006: // Wind Piercing
            case 4211002: // Assaulter
            case 5101003: // Double Uppercut
                return 900;
            case 5121003: // Energy Orb
            case 2311004: // Shining Ray
            case 2211002: // Ice Strike
                return 930;
            case 13111007: // Wind Shot
                return 960;
            case 14101006: // Vampire
            case 4121003: // Showdown
            case 4221003: // Showdown
                return 1020;
            case 12101006: // Fire Pillar
                return 1050;
            case 5121001: // Dragon Strike
                return 1060;
            case 2211003: // Thunder Spear
            case 1311006: // Dragon Roar
                return 1140;
            case 11111006: // Soul Driver
                return 1230;
            case 2111003: // Poison Mist
                return 1320;
            case 5111006: // Shockwave
            case 15111003: // Shockwave
            case 2111002: // Explosion
                return 1500;
            case 5121007: // Barrage
            case 15111004: // Barrage
                return 1830;
            case 5221003: // Ariel Strike
            case 5121004: // Demolition
                return 2160;
            case 2321008: // Genesis
                return 2700;
            case 2121007: // Meteor Shower
            case 10001011: // Meteo Shower
            case 2221007: // Blizzard
                return 3060;
        }
        // TODO delay for final attack, weapon type, swing,stab etc
        return 330; // Default usually
    }

    public static final byte gachaponRareItem(final int id) {
        switch (id) {
            case 2340000: // White Scroll
            case 2049100: // Chaos Scroll
            case 2049000: // Reverse Scroll
            case 2049001: // Reverse Scroll
            case 2049002: // Reverse Scroll
            case 2040006: // Miracle
            case 2040007: // Miracle
            case 2040303: // Miracle
            case 2040403: // Miracle
            case 2040506: // Miracle
            case 2040507: // Miracle
            case 2040603: // Miracle
            case 2040709: // Miracle
            case 2040710: // Miracle
            case 2040711: // Miracle
            case 2040806: // Miracle
            case 2040903: // Miracle
            case 2041024: // Miracle
            case 2041025: // Miracle
            case 2043003: // Miracle
            case 2043103: // Miracle
            case 2043203: // Miracle
            case 2043303: // Miracle
            case 2043703: // Miracle
            case 2043803: // Miracle
            case 2044003: // Miracle
            case 2044103: // Miracle
            case 2044203: // Miracle
            case 2044303: // Miracle
            case 2044403: // Miracle
            case 2044503: // Miracle
            case 2044603: // Miracle
            case 2044908: // Miracle
            case 2044815: // Miracle
            case 2044019: // Miracle
            case 2044703: // Miracle
            case 1372039: // Elemental wand lvl 130
            case 1372040: // Elemental wand lvl 130
            case 1372041: // Elemental wand lvl 130
            case 1372042: // Elemental wand lvl 130
            case 1092049: // Dragon Khanjar
                return 2;
            case 1382037: // Blade Staff
            case 1102084: // Pink Gaia Cape
            case 1102041: // Pink Adventurer Cape
            case 1402044: // Pumpkin Lantern
            case 1082149: // Brown Work glove
            case 1102086: // Purple Gaia Cape
            case 1102042: // Purple Adventurer Cape

            case 3010065: // Pink Parasol
            case 3010064: // Brown Sand Bunny Cushion
            case 3010063: // Starry Moon Cushion
            case 3010068: // Teru Teru Chair
            case 3010054: // Baby Bear's Dream
            case 3012001: // Round the Campfire
            case 3012002: // Rubber Ducky Bath
            case 3010020: // Portable Meal Table
            case 3010041: // Skull Throne
                return 2;
        }
        return 0;
    }

    public final static int[] goldrewards = {
        1402037, 1, // Rigbol Sword
        2290096, 1, // Maple Warrior 20
        2290049, 1, // Genesis 30
        2290041, 1, // Meteo 30
        2290047, 1, // Blizzard 30
        2290095, 1, // Smoke 30
        2290017, 1, // Enrage 30
        2290075, 1, // Snipe 30
        2290085, 1, // Triple Throw 30
        2290116, 1, // Areal Strike
        1302059, 3, // Dragon Carabella
        2049100, 1, // Chaos Scroll
        2340000, 1, // White Scroll
        1092049, 1, // Dragon Kanjar
        1102041, 1, // Pink Cape
        1432018, 3, // Sky Ski
        1022047, 3, // Owl Mask
        3010051, 1, // Chair
        3010020, 1, // Portable meal table
        2040914, 1, // Shield for Weapon Atk

        1432011, 3, // Fair Frozen
        1442020, 3, // HellSlayer
        1382035, 3, // Blue Marine
        1372010, 3, // Dimon Wand
        1332027, 3, // Varkit
        1302056, 3, // Sparta
        1402005, 3, // Bezerker
        1472053, 3, // Red Craven
        1462018, 3, // Casa Crow
        1452017, 3, // Metus
        1422013, 3, // Lemonite
        1322029, 3, // Ruin Hammer
        1412010, 3, // Colonian Axe

        1472051, 1, // Green Dragon Sleeve
        1482013, 1, // Emperor's Claw
        1492013, 1, // Dragon fire Revlover

        1382050, 1, // Blue Dragon Staff
        1382045, 1, // Fire Staff, Level 105
        1382047, 1, // Ice Staff, Level 105
        1382048, 1, // Thunder Staff
        1382046, 1, // Poison Staff

        1332032, 4, // Christmas Tree
        1482025, 3, // Flowery Tube

        4001011, 4, // Lupin Eraser
        4001010, 4, // Mushmom Eraser
        4001009, 4, // Stump Eraser

        2030008, 5, // Bottle, return scroll
        1442012, 4, // Sky Snowboard
        1442018, 3, // Frozen Tuna
        2040900, 4, // Shield for DEF
        2000005, 10, // Power Elixir
        2000004, 10, // Elixir
        4280000, 4}; // Gold Box
    public final static int[] silverrewards = {
        1002452, 3, // Starry Bandana
        1002455, 3, // Starry Bandana
        2290084, 1, // Triple Throw 20
        2290048, 1, // Genesis 20
        2290040, 1, // Meteo 20
        2290046, 1, // Blizzard 20
        2290074, 1, // Sniping 20
        2290064, 1, // Concentration 20
        2290094, 1, // Smoke 20
        2290022, 1, // Berserk 20
        2290056, 1, // Bow Expert 30
        2290066, 1, // xBow Expert 30
        2290020, 1, // Sanc 20
        1102082, 1, // Black Raggdey Cape
        1302049, 1, // Glowing Whip
        2340000, 1, // White Scroll
        1102041, 1, // Pink Cape
        1452019, 2, // White Nisrock
        4001116, 3, // Hexagon Pend
        4001012, 3, // Wraith Eraser
        1022060, 2, // Foxy Racoon Eye

        1432011, 3, // Fair Frozen
        1442020, 3, // HellSlayer
        1382035, 3, // Blue Marine
        1372010, 3, // Dimon Wand
        1332027, 3, // Varkit
        1302056, 3, // Sparta
        1402005, 3, // Bezerker
        1472053, 3, // Red Craven
        1462018, 3, // Casa Crow
        1452017, 3, // Metus
        1422013, 3, // Lemonite
        1322029, 3, // Ruin Hammer
        1412010, 3, // Colonian Axe

        1002587, 3, // Black Wisconsin
        1402044, 1, // Pumpkin lantern
        2101013, 4, // Summoning Showa boss
        1442046, 1, // Super Snowboard
        1422031, 1, // Blue Seal Cushion
        1332054, 3, // Lonzege Dagger
        1012056, 3, // Dog Nose
        1022047, 3, // Owl Mask
        3012002, 1, // Bathtub
        1442012, 3, // Sky snowboard
        1442018, 3, // Frozen Tuna
        1432010, 3, // Omega Spear
        1432036, 1, // Fishing Pole
        2000005, 10, // Power Elixir
        2000004, 10, // Elixir
        4280001, 4}; // Silver Box
    public static final int[] fishingReward = {
        0, 80, // Meso
        1, 60, // EXP
        2022179, 1, // Onyx Apple
        1302021, 5, // Pico Pico Hammer
        1072238, 1, // Voilet Snowshoe
        1072239, 1, // Yellow Snowshoe
        2049100, 1, // Chaos Scroll
        1302000, 3, // Sword
        1442011, 1, // Surfboard
        4000517, 8, // Golden Fish
        4000518, 25, // Golden Fish Egg
        4031627, 2, // White Bait (3cm)
        4031628, 1, // Sailfish (120cm)
        4031630, 1, // Carp (30cm)
        4031631, 1, // Salmon(150cm)
        4031632, 1, // Shovel
        4031633, 2, // Whitebait (3.6cm)
        4031634, 1, // Whitebait (5cm)
        4031635, 1, // Whitebait (6.5cm)
        4031636, 1, // Whitebait (10cm)
        4031637, 2, // Carp (53cm)
        4031638, 2, // Carp (60cm)
        4031639, 1, // Carp (100cm)
        4031640, 1, // Carp (113cm)
        4031641, 2, // Sailfish (128cm)
        4031642, 2, // Sailfish (131cm)
        4031643, 1, // Sailfish (140cm)
        4031644, 1, // Sailfish (148cm)
        4031645, 2, // Salmon (166cm)
        4031646, 2, // Salmon (183cm)
        4031647, 1, // Salmon (227cm)
        4031648, 1, // Salmon (288cm)
        4031629, 1 // Pot
    };

    public static int isJobById(int job) {
        return job * 10000;
    }

    public static final boolean isEvan(final int job) {
        return job == 2001 || (job >= 2200 && job <= 2218);
    }

    public static int get_evan_job_level(final int job) {
        int result; // eax@2

        switch (job) {
            case 2200:
            case 2210:
                result = 1;
                break;
            case 2211:
            case 2212:
            case 2213:
                result = 2;
                break;
            case 2214:
            case 2215:
            case 2216:
                result = 3;
                break;
            case 2217:
            case 2218:
                result = 4;
                break;
            default:
                result = 0;
                break;
        }
        return result;
    }

    public static boolean isLuminous(int job) {
        return job == 2004 || (job >= 2700 && job <= 2712);
    }

    public static boolean isKaiser(int job) {
        return job == 6000 || (job >= 6100 && job <= 6112);
    }

    public static boolean isCTS_Morph1(int job) {
        return ((job == 6100) || (job == 6110));
    }

    public static boolean isCTS_Morph2(int job) {
        return ((job == 6111) || (job == 6112));
    }

    public static boolean isDemonSlayer(int job) {
        return job == 3001 || (job >= 3100 && job <= 3112);
    }

    public static boolean isZero(int job) {
        return job == 10000 || (job >= 10100 && job <= 10112);
    }

    public static boolean isEunWol(int job) {
        return job == 2005 || (job >= 2500 && job <= 2512);
    }

    public static boolean isDemonAvenger(int job) {
        return job == 3101 || (job >= 3120 && job <= 3122);
    }

    public static boolean hyperMagnumPunch(int skillId) {
        switch (skillId) {
            case 37121052: // 하이퍼 매그넘 펀치
            case 37121055: // 하이퍼 매그넘 펀치
            case 37121056: // 하이퍼 매그넘 펀치
            case 37121057: // 하이퍼 매그넘 펀치
            case 37121058: // 하이퍼 매그넘 펀치
            case 37121059: // 하이퍼 매그넘 펀치
                return true;
            default:
                return false;
        }
    }

    public static boolean isABYTE(int job) {
        switch (job) {
            case 10000:
            case 10100:
            case 10110:
            case 10111:
            case 10112:
                return true;
        }
        return false;
    }

    public static boolean isXenon(int job) {
        return job == 3002 || (job >= 3600 && job <= 3612);
    }

    public static boolean isResistance(int job) {
        return job >= 3000 && job <= 3712;
    }

    public static boolean isWildHunter(int job) {
        return job >= 3300 && job <= 3312;
    }

    public static boolean isMercedes(int job) {
        return job == 2002 || (job >= 2300 && job <= 2312);
    }

    public static boolean isBlaster(int job) {
        return job == 3700 || (job >= 3700 && job <= 3712);
    }

    public static boolean isDualBlade(int job) {
        return job >= 430 && job <= 434;
    }

    public static boolean isPhantom(int job) {
        return job == 2003 || (job >= 2400 && job <= 2412);
    }

    public static boolean isBattleMage(int job) {
        return job == 3000 || (job >= 3200 && job <= 3212);
    }

    public static boolean isMikhail(int job) {
        return job == 5000 || (job >= 5100 && job <= 5112);
    }

    public static boolean isMechanic(int job) {
        return job >= 3500 || (job >= 3500 && job <= 3512);
    }

    public static boolean isAngelicBuster(int job) {
        return job == 6001 || (job >= 6500 && job <= 6512);
    }

    public static boolean isPinkBean(int job) {
        return job == 13000 || job == 13100;
    }

    public static boolean isKinesis(int job) {
        return job == 14000 || (job >= 14200 && job <= 14212);
    }

    public static int getSkillBook(final int job, final int skill) {
        if (job >= 2210 && job <= 2218) {
            return job - 2209;
        }
        if (isZero(job)) {
            if (skill > 0) {
                int type = (skill % 1000) / 100; //1 beta 2 alpha
                return type == 1 ? 1 : 0;
            } else {
                return 0;
            }
        }
        switch (job) {

            case 110:
            case 120:
            case 130:
            case 210:
            case 220:
            case 230:
            case 310:
            case 320:
            case 410:
            case 420:
            case 510:
            case 520:

            case 570:
            case 1110:
            case 1310:
            case 1510:
            case 2310:
            case 2410:
            case 2510:
            case 2710:
            case 3110:
            case 3120:
            case 3210:
            case 3310:
            case 3510:
            case 3610:
            case 4110:
            case 4210:
            case 5110:
            case 6110:
            case 6510:
                return 1;
            case 111:
            case 121:
            case 131:
            case 211:
            case 221:
            case 231:
            case 311:
            case 321:
            case 411:
            case 421:
            case 511:
            case 521:

            case 571:
            case 1111:
            case 1311:
            case 1511:
            case 2311:
            case 2411:
            case 2511:
            case 2711:
            case 3111:
            case 3121:
            case 3211:
            case 3311:
            case 3511:
            case 3611:
            case 4111:
            case 4211:
            case 5111:
            case 6111:
            case 6511:
                return 2;
            case 112:
            case 122:
            case 132:
            case 212:
            case 222:
            case 232:
            case 312:
            case 322:
            case 412:
            case 422:
            case 512:
            case 522:

            case 572:
            case 1112:
            case 1312:
            case 1512:
            case 2312:
            case 2412:
            case 2512:
            case 2712:
            case 3112:
            case 3122:
            case 3212:
            case 3312:
            case 3512:
            case 3612:
            case 4112:
            case 4212:
            case 5112:
            case 6112:
            case 6512:
                return 3;
            case 508:
                return 0;
        }
        if (isSeparatedSp(job)) {
            if (job % 10 > 4) {
                return 0;
            }
            return (job % 10);
        }
        return 0;
    }

    public static boolean isSeparatedSp(int job) {
        switch (job) {
            /* 초보자 */
            case 0:
            /* 전사 */
            case 100:
            case 110:
            case 111:
            case 112:
            case 120:
            case 121:
            case 122:
            case 130:
            case 131:
            case 132:

            /* 마법사 */
            case 200:
            case 210:
            case 211:
            case 212:
            case 220:
            case 221:
            case 222:
            case 230:
            case 231:
            case 232:

            /* 궁수 */
            case 300:
            case 310:
            case 311:
            case 312:
            case 320:
            case 321:
            case 322:

            /* 도적 */
            case 400:
            case 410:
            case 411:
            case 412:
            case 420:
            case 421:
            case 422:

            /* 듀얼 블레이드 */
            case 430:
            case 431:
            case 432:
            case 433:
            case 434:

            /* 해적 */
            case 500:
            case 510:
            case 511:
            case 512:
            case 520:
            case 521:
            case 522:

            /* 캐논슈터 */
            case 501:
            case 530:
            case 531:
            case 532:

            //에반
            case 2001:
            case 2200:
            case 2210:
            case 2211:
            case 2212:
            case 2213:
            case 2214:
            case 2215:
            case 2216:
            case 2217:
            case 2218:

            //메르세데스
            case 2002:
            case 2300:
            case 2310:
            case 2311:
            case 2312:

            //팬텀
            case 2003:
            case 2400:
            case 2410:
            case 2411:
            case 2412:

            //은월
            case 2005:
            case 2500:
            case 2510:
            case 2511:
            case 2512:

            //데몬어벤져
            case 3101:
            case 3120:
            case 3121:
            case 3122:

            //제논
            case 3002:
            case 3600:
            case 3610:
            case 3611:
            case 3612:

            //블래스터
            case 3700:
            case 3710:
            case 3711:
            case 3712:

            //데몬슬레이어
            case 3001:
            case 3100:
            case 3110:
            case 3111:
            case 3112:

            //미하일
            case 5000:
            case 5100:
            case 5110:
            case 5111:
            case 5112:

            //레지스탕스 계열
            case 3000:
            case 3200:
            case 3210:
            case 3211:
            case 3212:
            case 3300:
            case 3310:
            case 3311:
            case 3312:
            case 3500:
            case 3510:
            case 3511:
            case 3512:

            //루미너스
            case 2004:
            case 2700:
            case 2710:
            case 2711:
            case 2712:

            //카이저
            case 6000:
            case 6100:
            case 6110:
            case 6111:
            case 6112:

            //엔젤릭버스터
            case 6001:
            case 6500:
            case 6510:
            case 6511:
            case 6512:

            case 1000:
            case 1100:
            case 1110:
            case 1111:
            case 1112:

            case 1500:
            case 1510:
            case 1511:
            case 1512:

            case 1200:
            case 1210:
            case 1211:
            case 1212:

            case 1300:
            case 1310:
            case 1311:
            case 1312:

            case 1400:
            case 1410:
            case 1411:
            case 1412:

            case 10000:
            case 10100:
            case 10110:
            case 10111:
            case 10112:

            //아란 v218
            case 2000:
            case 2100:
            case 2110:
            case 2111:
            case 2112:

            //키네시스
            case 14000:
            case 14200:
            case 14210:
            case 14211:
            case 14212:
                return true;
            default:
                return false;
        }
    }

    public final static int getSkillBookForSkill(final int skillid) {
        return getSkillBook(skillid / 10000, skillid);
    }

    public static boolean isRing(int itemId) {
        return itemId >= 1112000 && itemId < 1113000;
    }

    public static boolean isEffectRing(int itemid) {
        return isFriendshipRing(itemid) || isCrushRing(itemid) || isMarriageRing(itemid);
    }

    public static boolean isMarriageRing(int itemId) {
        switch (itemId) {
            case 1112803:
            case 1112806:
            case 1112807:
            case 1112809:
                return true;
        }
        return false;
    }

    public static boolean isFriendshipRing(int itemId) {
        switch (itemId) {
            case 1112800:
            case 1112801:
            case 1112802:
            case 1112810:
            case 1112811:
            case 1112812:
            case 1112816:
            case 1112817:
            case 1049000:
                return true;
        }
        return false;
    }

    public static boolean isCrushRing(int itemId) {
        switch (itemId) {
            case 1112001:
            case 1112002:
            case 1112003:
            case 1112005:
            case 1112006:
            case 1112007:
            case 1112012:
            case 1112015:
            case 1048000:
            case 1048001:
            case 1048002:
                return true;
        }
        return false;
    }

    public static final boolean isKatara(int itemId) {
        return itemId / 10000 == 134;
    }

    public static final boolean isJS(int itemId) {
        final int id = itemId / 100;
        if (id == 13525) {
            return true;
        } else {
            return false;
        }
    }

    public static final boolean isMagnum(final int itemId) {
        final int id = itemId / 100;
        if (id == 13527) {
            return true;
        } else {
            return false;
        }
    }

    public static final boolean isInvisibleKatara(int itemId) {
        return itemId == 1342069;
    }

    public static final boolean isDagger(int itemId) {
        return itemId / 10000 == 133;
    }

    public static final boolean isApplicableSkill(int skil) {
        return skil < 22190000 && (skil % 10000 < 8000 || skil % 10000 > 8003); //no additional/resistance/db/decent skills
    }

    public static final boolean isApplicableSkill_(int skil) { //not applicable to saving but is more of temporary
        return skil >= 90000000 || (skil % 10000 >= 8000 && skil % 10000 <= 8003);
    }

    public static final boolean isEvanDragonItem(final int itemId) {
        return itemId >= 1940000 && itemId < 1980000; //194 = mask, 195 = pendant, 196 = wings, 197 = tail
    }

    public static boolean isTablet(int itemId) {
        return itemId / 100 < 20478 && itemId / 100 >= 20470;
    }

    public static boolean isMagicHourglass(int itemId) {
        return itemId / 10000 == 550;
    }

    public static int getSuccessTablet(final int scrollId, final int level) {
        if (scrollId % 1000 / 100 == 2) { //2047_2_00 = armor, 2047_3_00 = accessory

            switch (level) {
                case 0:
                    return 70;
                case 1:
                    return 55;
                case 2:
                    return 43;
                case 3:
                    return 33;
                case 4:
                    return 26;
                case 5:
                    return 20;
                case 6:
                    return 16;
                case 7:
                    return 12;
                case 8:
                    return 10;
                default:
                    return 7;
            }
        } else if (scrollId % 1000 / 100 == 3) {
            switch (level) {
                case 0:
                    return 70;
                case 1:
                    return 35;
                case 2:
                    return 18;
                case 3:
                    return 12;
                default:
                    return 7;
            }
        } else {
            switch (level) {
                case 0:
                    return 70;
                case 1:
                    return 50; //-20

                case 2:
                    return 36; //-14

                case 3:
                    return 26; //-10

                case 4:
                    return 19; //-7

                case 5:
                    return 14; //-5

                case 6:
                    return 10; //-4

                default:
                    return 7;  //-3

            }
        }
    }

    public static int getCurseTablet(final int scrollId, final int level) {
        if (scrollId % 1000 / 100 == 2) { //2047_2_00 = armor, 2047_3_00 = accessory

            switch (level) {
                case 0:
                    return 10;
                case 1:
                    return 12;
                case 2:
                    return 16;
                case 3:
                    return 20;
                case 4:
                    return 26;
                case 5:
                    return 33;
                case 6:
                    return 43;
                case 7:
                    return 55;
                case 8:
                    return 70;
                default:
                    return 100;
            }
        } else if (scrollId % 1000 / 100 == 3) {
            switch (level) {
                case 0:
                    return 12;
                case 1:
                    return 18;
                case 2:
                    return 35;
                case 3:
                    return 70;
                default:
                    return 100;
            }
        } else {
            switch (level) {
                case 0:
                    return 10;
                case 1:
                    return 14; //+4
                case 2:
                    return 19; //+5
                case 3:
                    return 26; //+7
                case 4:
                    return 36; //+10
                case 5:
                    return 50; //+14
                case 6:
                    return 70; //+20
                default:
                    return 100;  //+30

            }
        }
    }

    public static int getMaxLevelImp(int lifeid) {
        switch (lifeid) {
            case 1000:
            case 2000:
                return 8;
            case 3000:
            case 3001:
                return 4;
            case 3002:
            case 3003:
                return 2;
        }
        return 1;
    }

    public static boolean isAccessory(final int itemId) {
        return (itemId >= 1010000 && itemId < 1040000) || (itemId >= 1122000 && itemId < 1153000) || (itemId >= 1112000 && itemId < 1113000);
    }

    public static boolean isEquipScroll(int scrollId) {
        return scrollId / 100 == 20493 && scrollId != 2049360 && scrollId != 2049361;
    }

    public static boolean isEpicScroll(int scrollId) {
        return scrollId / 100 == 20497;
    }

    public static boolean isPotentialScroll(int scrollId) {
        return scrollId / 100 == 20494;
    }

    public static boolean isEditionalScroll(int scrollId) {
        return scrollId / 100 == 20493;
    }

    public static boolean isRebirhFireScroll(int scrollId) {
        return scrollId / 100 == 20487;
    }

    public static boolean isProstyScroll(int scrollId) {
        switch (scrollId) {
            case 2046991:
            case 2046964:
            case 2046965:
            case 2047801:
            case 2047914:
            case 2047915:
            case 2046841:
            case 2046842:
            case 2046967:
            case 2046971:
            case 2047803:
            case 2047917:
            case 2047814:
                return true;
        }
        return false;
    }

    public static boolean isEightRockScroll(int scrollId) { //8樂 주문서
        return scrollId / 1000 == 2046;
    }

    public static int getOptionType(final int itemId) {
        int id = itemId / 10000;
        if (isWeapon(itemId) || ((int) (itemId / 1000)) == 1099) {
            return 10; //무기
        } else if (id == 109 || id == 110 || id == 113) {
            return 20; //방패 & 망토 & 벨트
        } else if (isAccessory(itemId)) {
            return 40; //악세사리
        } else if (id == 100) {
            return 51; //투구
        } else if (id == 104 || id == 106) {
            return 52; //상의, 한벌옷
        } else if (id == 105) {
            return 53; //하의
        } else if (id == 108) {
            return 54; //장갑
        } else if (id == 107) {
            return 55;
        }
        return 0;
    }

    public static boolean isSpecialScroll(final int scrollId) {
        switch (scrollId) {
            case 2040727: // Spikes on show
            case 2041058: // Cape for Cold protection
            case 5064000:
            case 5064003: // 슈페리얼
            case 2531000: // 프로텍트
            case 5064100:
            case 2532000: // 세이프티
            case 5064300: // 리커버리
            case 5063000:
            case 2530000:
            case 2530001:
            case 2530002: // 럭키데이
            case 5064200: // 이노센트
                return true;
        }
        return false;
    }

    public static boolean isSpecialCSScroll(final int scrollId) {
        switch (scrollId) {
            case 5064000:
            case 5064003: // 슈페리얼
            case 5064100:
            case 5064300: // 리커버리
            case 5063100:
            case 5063000:
            case 5064200: // 이노센트
                return true;
        }
        return false;
    }

    public static boolean isAccessoryScroll(int itemId) {
        return itemId / 100 == 20492;
    }

    public static boolean canScroll(final int itemId) {
        return itemId / 100000 != 19 && itemId / 100000 != 16 || itemId / 1000 == 1672; //no mech/taming/dragon
    }

    public static int getChaosNumber(int itemId) {
        return itemId == 2049116 || itemId == 2049153 ? 10 : 5;
    }

    public static int getMountItem(final int sourceid, MapleCharacter player) {
        if (sourceid == 33001001) {
            switch (player.getLevel()) { // 임시 아직 재규어 전임
                case 10:
                    return 1932015;
                case 20:
                    return 1932030;
                case 30:
                    return 1932031;
                case 40:
                    return 1932032;
                case 50:
                    return 1932033;
                case 60:
                    return 1932036;
                default:
                    return 0;
            }
        }
        return getMountItemEx(sourceid);
    }

    public static int checkMountItem(final int sourceid) {
        if (sourceid == 33001001) {
            return 1932005; // Just a check only, so doesn't matter
        }
        return getMountItemEx(sourceid);
    }

    public static int getJaguarIdByMob(int mob) {
        switch (mob) {
            case 9304004:
                return 1932033;
            case 9304003:
                return 1932032;
            case 9304002:
                return 1932031;
            case 9304001:
                return 1932030;
            case 9304000:
                return 1932015;
            case 9304005:
                return 1932036;
            case 9304006:
                return 1932100;
        }
        return 0;
    }

    public static int getJaguarType(MapleCharacter hp) {
        if (hp.getKeyValue2("CapturedJaguar") == -1) {
            hp.setKeyValue2("CapturedJaguar", 0);
        }
        int mobid = hp.getKeyValue2("CapturedJaguar");
        if (mobid > 0) {
            mobid = mobid - 9303999;
        }
        return mobid * 10;
    }

    public static boolean isBeginnerJob(final int job) {
        return job == 2005 || job == 0 || job == 1 || job == 1000 || job == 2000 || job == 2001 || job == 3000 || job == 3001 || job == 3002 || job == 2002 || job == 2003 || job == 5000 || job == 2004 || job == 6000 || job == 6001 || job == 10000;
    }

    public static boolean isAswanMap(int mapId) {
        if (mapId >= 262020000 && mapId <= 262023130) {
            return true;
        }
        return false;
    }

    public static boolean isAngel(int sourceid) {
        return isBeginnerJob(sourceid / 10000) && (sourceid % 10000 == 1085 || sourceid % 10000 == 1087 || sourceid % 10000 == 1090 || sourceid % 10000 == 1179);
    }

    public static boolean isServerReady() {
        return MapleCacheData.cached;
    }

    public static boolean isReverseItem(int itemId) {
        switch (itemId) {
            case 1002790:
            case 1002791:
            case 1002792:
            case 1002793:
            case 1002794:
            case 1082239:
            case 1082240:
            case 1082241:
            case 1082242:
            case 1082243:
            case 1052160:
            case 1052161:
            case 1052162:
            case 1052163:
            case 1052164:
            case 1072361:
            case 1072362:
            case 1072363:
            case 1072364:
            case 1072365:

            case 1302086:
            case 1312038:
            case 1322061:
            case 1332075:
            case 1332076:
            case 1372045:
            case 1382059:
            case 1402047:
            case 1412034:
            case 1422038:
            case 1432049:
            case 1442067:
            case 1452059:
            case 1462051:
            case 1472071:
            case 1482024:
            case 1492025:

            case 1342012:
            case 1942002:
            case 1952002:
            case 1962002:
            case 1972002:
            case 1532016:
            case 1522017:
                return true;
            default:
                return false;
        }
    }

    public static boolean isTimelessItem(int itemId) {
        switch (itemId) {
            case 1032031: //shield earring, but technically
            case 1102172:
            case 1002776:
            case 1002777:
            case 1002778:
            case 1002779:
            case 1002780:
            case 1082234:
            case 1082235:
            case 1082236:
            case 1082237:
            case 1082238:
            case 1052155:
            case 1052156:
            case 1052157:
            case 1052158:
            case 1052159:
            case 1072355:
            case 1072356:
            case 1072357:
            case 1072358:
            case 1072359:
            case 1092057:
            case 1092058:
            case 1092059:

            case 1122011:
            case 1122012:

            case 1302081:
            case 1312037:
            case 1322060:
            case 1332073:
            case 1332074:
            case 1372044:
            case 1382057:
            case 1402046:
            case 1412033:
            case 1422037:
            case 1432047:
            case 1442063:
            case 1452057:
            case 1462050:
            case 1472068:
            case 1482023:
            case 1492023:
            case 1342011:
            case 1532015:
            case 1522016:
                //raven.
                return true;
            default:
                return false;
        }
    }

    public static boolean isAngelicBlessSkill(int skill) {
        switch (skill % 10000) {
            case 1085: //엔젤릭 블레스
            case 1087: //다크 엔젤릭 블레스
            case 1090: //눈꽃 엔젤릭 블레스
            case 1179: //화이트 엔젤릭 블레스
                return true;
        }
        return false;
    }

    public static boolean isAngelicBlessBuff(int skill) {
        switch (skill % 1000) {
            case 86: //엔젤릭 블레스
            case 88: //다크 엔젤릭 블레스
            case 91: //눈꽃 엔젤릭 블레스
            case 180: //화이트 엔젤릭 블레스
                return true;
        }
        return false;
    }

    public static boolean isAngelicBlessBuffEffectItem(int skill) {
        switch (skill) {
            case 2022746: //엔젤릭 블레스
            case 2022747: //다크 엔젤릭 블레스
            case 2022764: //눈꽃 엔젤릭 블레스
            case 2022823: //화이트 엔젤릭 블레스
                return true;
        }
        return false;
    }

    public static boolean isSaintSaverSkill(int skill) {
        switch (skill) {
            case 80001034:
            case 80001035:
            case 80001036:
                return true;
        }
        return false;
    }

    public static List<BuffStats> getBroadcastBuffs() {
        List<BuffStats> ret = new ArrayList<BuffStats>();
        /*ret.add(BuffStats.COMBO);
        ret.add(BuffStats.DARKSIGHT);
        ret.add(BuffStats.DARK_SPECULATION); 
        ret.add(BuffStats.IGNORE_ATTACKNON); 
        ret.add(BuffStats.HOLY_SHELL);
        ret.add(BuffStats.LIGHTNING_CHARGE);
        ret.add(BuffStats.WK_CHARGE);
        ret.add(BuffStats.AURA);
        ret.add(BuffStats.BOOSTER_R);
        ret.add(BuffStats.SHADOW_PARTNER);
        ret.add(BuffStats.CTS_Morph);
        ret.add(BuffStats.ITEM_EFFECT);
        ret.add(BuffStats.INFLATION);
        ret.add(BuffStats.SAINT_SAVER);
        ret.add(BuffStats.WIND_WALK);
         */
        return ret;
    }

    public static List<Pair<DiseaseStats, Integer>> getBroadcastDebuffs() {
        List<Pair<DiseaseStats, Integer>> ret = new ArrayList<Pair<DiseaseStats, Integer>>();
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.CURSE, 124));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.STUN, 123));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.POISON, 125));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.SEAL, 120));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.DARKNESS, 121));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.WEAKEN, 122));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.SLOW, 126));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.SEDUCE, 128));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.ZOMBIFY, 133));
        ret.add(new Pair<DiseaseStats, Integer>(DiseaseStats.FREEZE, 137));
        return ret;
    }

    public static boolean 용사의의지(int 스킬) {
        switch (스킬) {
            case 22171004:
            case 1121011:
            case 1221012:
            case 1321010:
            case 2121008:
            case 2221008:
            case 2321009:
            case 3121009:
            case 3221008:
            case 4121009:
            case 4221008:
            case 4341008:
            case 5121008:
            case 5221010:
            case 21121008:
            case 32121008:
            case 33121008:
            case 35121008:
            case 36121009:
            case 24121009:
            case 23121008:
            case 25121211:
            case 27121010: //루미너스
            case 61121015: //카이저
            case 65121010: //엔젤릭버스터
                return true;
        }
        return false;
    }

    public static final List<Integer> 용사의의지() {
        final List<Integer> ret = new ArrayList<Integer>();
        ret.add(22171004);
        ret.add(1121011);
        ret.add(1221012);
        ret.add(1321010);
        ret.add(2121008);
        ret.add(2221008);
        ret.add(2321009);
        ret.add(3121009);
        ret.add(4341008);
        ret.add(3221008);
        ret.add(4121009);
        ret.add(4221008);
        ret.add(5121008);
        ret.add(5221010);
        ret.add(5321006);
        ret.add(21121008);
        ret.add(32121008);
        ret.add(33121008);
        ret.add(35121008);
        ret.add(36121009);
        ret.add(25121211);
        ret.add(24121009);
        ret.add(23121008);
        ret.add(27121010); //루미너스
        ret.add(61121015); //카이저
        ret.add(65121010); //엔젤릭버스터
        return ret;
    }

    public static boolean isProfessionSkill(int skillid) {
        return skillid >= 92000000 && skillid <= 92999999;
    }

    public static int getTraitExpNeededForLevel(final int level) {
        if (level < 0 || level >= cumulativeTraitExp.length) {
            return Integer.MAX_VALUE;
        }
        return cumulativeTraitExp[level];
    }

    public static int getTraitLevel(final int exp) {
        int leftExp = exp;
        int level = 1;
        while (leftExp >= getTraitExpNeededForLevel(level)) {
            level++;
        }
        return level;
    }

    public static int getDamageSkinNumberByItem(int itemid) {
        for (int i = 0; i < dmgskinitem.length; i++) {
            if (dmgskinitem[i] == itemid) {
                return dmgskinnum[i];
            }
        }
        return -1;
    }

    public static int getDamageSkinItemByNumber(int num) {
        for (int i = 0; i < dmgskinnum.length; i++) {
            if (dmgskinnum[i] == num) {
                return dmgskinitem[i];
            }
        }
        return -1;
    }

    public static Integer[] getDamageSkinsTradeBlock() {
        ArrayList<Integer> skins = new ArrayList<>();
        for (int i = 0; i < dmgskinitem.length; i++) {
            if (ItemInformation.getInstance().isOnlyTradeBlock(dmgskinitem[i])) {
                skins.add(dmgskinitem[i]);
            }
        }
        Integer list[] = new Integer[skins.size()];
        return skins.toArray(list);
    }

    public static int getRandomProfessionReactorByRank(int rank) {
        int base1 = 100000;
        int base2 = 200000;
        if (Randomizer.nextBoolean()) {
            if (rank == 1) {
                base1 += Randomizer.rand(0, 7);
            } else if (rank == 2) {
                base1 += Randomizer.rand(4, 9);
            } else if (rank == 3) {
                if (Randomizer.rand(0, 4) == 1) {
                    base1 += 11;
                } else {
                    base1 += Randomizer.rand(0, 9);
                }
            }
            return base1;
        } else {
            if (rank == 1) {
                base2 += Randomizer.rand(0, 7);
            } else if (rank == 2) {
                base2 += Randomizer.rand(4, 9);
            } else if (rank == 3) {
                if (Randomizer.rand(0, 6) == 1) {
                    base2 += 11;
                } else {
                    base2 += Randomizer.rand(0, 9);
                }
            }
            return base2;
        }
    }

    public static final boolean isComboAttackSkill(int nSkillID) {
        switch (nSkillID) {
            case 1:
                return true;
        }
        return false;
    }

    public static final List<Integer> getHiddenSkill() {
        final List<Integer> ret = new ArrayList<Integer>();
        ret.add(11110005);
        ret.add(11111006);
        ret.add(11111008);
        ret.add(12111003);
        ret.add(12111007);
        ret.add(12111004);
        ret.add(13111002);
        ret.add(13110003);
        ret.add(13110009);
        ret.add(14111010);
        ret.add(14110004);
        ret.add(15111011);
        ret.add(15111004);
        ret.add(15111005);
        ret.add(100001261);
        ret.add(100000267);
        ret.add(100001272);
        ret.add(100001274);
        ret.add(100001283);
        ret.add(100000280);
        ret.add(100001005);
        return ret;
    }

    public static int getBossReturnMap(int map) {

        switch (map) {
            case 280030000:
            case 280030100:
            case 280030001:
                return 280090000;
            case 240060200: //혼테일
            case 240060201: //카오스혼테일
                return 240050500;
            case 270050100: //핑크빈
                return 270050300;
            case 220080001: //파풀
                return 220080000;
            case 230040420: //피아누스
                return 230040400;
            case 240020101: //그리프
            case 240020401: //마뇽
                return 240000000;
            case 271040100: //시그너스
                return 271040200;
        }
        return -1;
    }

    public static boolean isExceptionBanMapId(int map) { //커닝스퀘어 3~4층
        switch (map) {
            case 103040200:
            case 103040201:
            case 103040202:
            case 103040203:
                return true;
        }
        return false;
    }

    public static int getEquipExpPercentage(IEquip e) {
        if (e.getItemLevel() == 0) {
            return 0;
        }
        int exp = e.getItemEXP();
        int level = e.getItemLevel();
        int needexp = GameConstants.getTimelessRequiredEXP(level);
        double percent = (((double) exp / (double) needexp) * 10000000D);
        //System.out.println(e.getItemId() + " : LEVEL "+level +" EXP "+exp + " NEEDEXP "+needexp +" PERCENTAGE "+percent);
        return (int) percent;
    }

    public static int[] getInnerSkillbyRank(int rank) {
        if (rank == 0) {
            return rankC;
        } else if (rank == 1) {
            return rankB;
        } else if (rank == 2) {
            return rankA;
        } else if (rank == 3) {
            return rankS;
        } else {
            return null;
        }
    }

    //엠퍼러스 70개
    private static int[] aswanRecipes = {2510483, 2510484, 2510485, 2510486, 2510487, 2510488, 2510489, 2510490, 2510491, 2510492, 2510493, 2510494, 2510495, 2510496, 2510497, 2510498, 2510499, 2510500, 2510501, 2510502, 2510503, 2510504, 2510505, 2510506, 2510507, 2510508, 2510509, 2510510, 2510511, 2510512, 2510513, 2510514, 2510515, 2510516, 2510517, 2510518, 2510519, 2510520, 2510521, 2510522, 2510523, 2510524, 2510525, 2510526, 2510527, 2511153, 2511154, 2511155};
    //컨쿼러스 15개
    private static int[] aswanScrolls = {2046060, 2046061, 2046062, 2046063, 2046064, 2046065, 2046066, 2046067, 2046068, 2046069, 2046141, 2046142, 2046143, 2046144, 2046145, 2046519, 2046520, 2046521, 2046522, 2046523, 2046524, 2046525, 2046526, 2046527, 2046528, 2046529, 2046530, 2046701, 2046702, 2046703, 2046704, 2046705, 2046706, 2046707, 2046708, 2046709, 2046710, 2046711, 2046712};
    private static Pair[] useItems = {new Pair<Integer, Integer>(2002010, 500), new Pair<Integer, Integer>(2002006, 600), new Pair<Integer, Integer>(2002007, 600), new Pair<Integer, Integer>(2002008, 600), new Pair<Integer, Integer>(2002009, 600), new Pair<Integer, Integer>(2022003, 770), new Pair<Integer, Integer>(2022000, 1155), new Pair<Integer, Integer>(2001001, 2300), new Pair<Integer, Integer>(2001002, 4000), new Pair<Integer, Integer>(2020012, 4680), new Pair<Integer, Integer>(2020013, 5824), new Pair<Integer, Integer>(2020014, 8100), new Pair<Integer, Integer>(2020015, 10200), new Pair<Integer, Integer>(2000007, 5), new Pair<Integer, Integer>(2000000, 5), new Pair<Integer, Integer>(2000008, 48), new Pair<Integer, Integer>(2000001, 48), new Pair<Integer, Integer>(2000009, 96), new Pair<Integer, Integer>(2000002, 96), new Pair<Integer, Integer>(2000010, 20), new Pair<Integer, Integer>(2000003, 20), new Pair<Integer, Integer>(2000011, 186), new Pair<Integer, Integer>(2000006, 186), new Pair<Integer, Integer>(2050000, 200), new Pair<Integer, Integer>(2050001, 200), new Pair<Integer, Integer>(2050002, 300), new Pair<Integer, Integer>(2050003, 500)};
    //컨쿼러스 등급 * 10개
    private static int[] circulators = {2700000, 2700100, 2700200, 2700300, 2700400, 2700500, 2700600, 2700700, 2700800, 2700900, 2701000};

    public static int[] getAswanRecipes() {
        return aswanRecipes;
    }

    public static int[] getAswanScrolls() {
        return aswanScrolls;
    }

    public static Pair[] getUseItems() {
        return useItems;
    }

    public static int[] getCirculators() {
        return circulators;
    }

    public static int getBeginnerJobCode(int job) {
        if (isAdventurer(job)) {
            return 0;
        } else if (isKOC(job)) {
            return 1000;
        } else if (isAran(job)) {
            return 2000;
        } else if (isEvan(job)) {
            return 2001;
        } else if (isMercedes(job)) {
            return 2002;
        } else if (isPhantom(job)) {
            return 2003;
        } else if (isLuminous(job)) {
            return 2004;
        } else if (isDemonSlayer(job) || isDemonAvenger(job)) {
            return 3001;
        } else if (isXenon(job)) {
            return 3002;
        } else if (isMikhail(job)) {
            return 5000;
        } else if (isKaiser(job)) {
            return 6000;
        } else if (isAngelicBuster(job)) {
            return 6001;
        } else if (isResistance(job)) {
            return 3000;
        } else if (isZero(job)) {
            return 10000;
        }
        return 0;
    }

    public static int getMaxLevelmip(int lifeid) {
        switch (lifeid) {
            case 1000:
            case 2000:
                return 8;
            case 3000:
            case 3001:
                return 4;
            case 3002:
            case 3003:
                return 2;
        }
        return 1;
    }

    public static int isLightSkillsGaugeCheck(int skillid) {
        switch (skillid) {
            case 20041226: // 스펙트럴 라이트 (기본 직업)
                return 110;
            case 27001100: // 트윙클 플래쉬
                return 123;
            case 27101100: // 실피드 랜서
                return 225;
            case 27101101: // 인바이러빌러티
                return 30;
            case 27111100: // 스펙트럴 라이트
                return 155;
            case 27111101: // 샤인 리뎀션
                return 50;
            case 27121100: // 라이트 리플렉션
                return 264;
            default:
                return 0;
        }
    }

    public static int isDarkSkillsGaugeCheck(int skillid) {
        switch (skillid) {
            case 27001201: // 다크 폴링
                return 140;
            case 27101202: // 보이드 프레셔
                return 73;
            case 27111202: // 녹스피어
                return 210;
            case 27121201: // 모닝 스타폴
                return 10;
            case 27121202: // 아포칼립스
                return 397;
            default:
                return 0;
        }
    }

    public static boolean isLightSkills(int skillid) {
        switch (skillid) {
            case 20041226: // 스펙트럴 라이트 (기본 직업)
            case 27001100: // 트윙클 플래쉬
            case 27101100: // 실피드 랜서
            case 27111100: // 스펙트럴 라이트
            case 27121100: // 라이트 리플렉션
                return true;
        }
        return false;
    }

    public static boolean isDarkSkills(int skillid) {
        switch (skillid) {
            case 27001201: // 다크 폴링
            case 27101202: // 보이드 프레셔
            case 27111202: // 녹스피어
            case 27121201: // 모닝 스타폴
            case 27121202: // 아포칼립스
                return true;
        }
        return false;
    }

    public static boolean isRecoveryIncSkill(final int id) {
        switch (id) {
            case 1110000:
            case 2000000:
            case 1210000:
            case 21100009:
            case 51110000:
            case 61110006:
            case 11110000:
            case 4100002:
            case 4200001:
                return true;
        }
        return false;
    }

    public static int getRecoverySkill(final int jobId) {
        switch (jobId) {
            case 11:
                return 1110000;
            case 20:
                return 2000000;
            case 12:
                return 1210000;
            case 41:
                return 4100002;
            case 42:
                return 4200001;
            case 211:
                return 21100009;
            case 511:
                return 51110000;
            case 611:
                return 61110006;
            case 111:
                return 11110000;
            default:
                return 0;
        }
    }

    public static int getSkillLevel(final int level) {
        if (level >= 70 && level < 120) {
            return 2;
        } else if (level >= 120 && level < 200) {
            return 3;
        } else if (level == 200) {
            return 4;
        }
        return 1;
    }

    public static int[] owlItems = new int[]{
        1082002, // work gloves
        2070005,
        2070006,
        1022047,
        1102041,
        2044705,
        2340000, // white scroll
        2040017,
        1092030,
        2040804};

    public static int getGuildExpNeededForLevel(final int level) {
        if (level < 0 || level >= guildexp.length) {
            return Integer.MAX_VALUE;
        }
        return guildexp[level];
    }

    public static int getMPEaterForJob(final int job) {
        switch (job) {
            case 210:
            case 211:
            case 212:
                return 2100000;
            case 220:
            case 221:
            case 222:
                return 2200000;
            case 230:
            case 231:
            case 232:
                return 2300000;
        }
        return 2100000; // Default, in case GM
    }

    public static int getVenomSkill(int job) {
        switch ((int) (job / 10)) {
            case 41:
                return 4110011;
            case 42:
                return 4210010;
            case 43:
                return 4320005;
            case 141:
                return 14110004;
        }
        return 0;
    }

    public static int getFatalVenomSkill(int job) {
        switch ((int) (job / 10)) {
            case 41:
                return 4120011;
            case 42:
                return 4220011;
            case 43:
                return 4340012;
        }
        return 0;
    }

    public static int HyperJob(MapleCharacter chr) {
        if (chr.getJob() >= 0) {
            return chr.getJob();
        }
        return 000;
    }

    public static List<Integer> getHyperSkill(MapleCharacter chr) {
        List<Integer> ret = new ArrayList<>();
        for (int i = 30; i < 53; i++) {
            ret.add(chr.getJob() * 10000 + i);
        }
        for (int i = 1052; i < 1057; i++) {
            ret.add(chr.getJob() * 10000 + i);
        }
        if (chr.getJob() == 2218) {
            for (int i = 1052; i < 1057; i++) {
                ret.add(2217 * 10000 + i);
            }
        }
        if (chr.getJob() == 10112) {
            ret.add(100000267);
            ret.add(100000276);
            ret.add(100000277);
            ret.add(100001261);
            ret.add(100001274);
            ret.add(100001272);
            ret.add(100001283);
            ret.add(100001005);
        }
        return ret;
    }

    public static List<Integer> 은월하이퍼() {
        List<Integer> ret = new ArrayList<>();
        for (int i = 25120133; i < 25120155; i++) {
            ret.add(i);
        }
        ret.add(25121030);
        ret.add(25121131);
        ret.add(25121132);
        return ret;
    }

    public static boolean isWindBreaker(int job) {
        return job == 1000 || (job >= 1300 && job <= 1312);
    }

    public static List<Integer> getHyperSkill(int job) {
        List<Integer> ret = new ArrayList<>();
        for (int i = 30; i < 53; i++) {
            ret.add(job * 10000 + i);
        }
        for (int i = 1052; i < 1057; i++) {
            ret.add(job * 10000 + i);
        }
        if (job == 2218) {
            for (int i = 1052; i < 1057; i++) {
                ret.add(2217 * 10000 + i);
            }
        }
        if (job == 10112) {
            ret.add(100000267);
            ret.add(100000276);
            ret.add(100000277);
            ret.add(100001261);
            ret.add(100001274);
            ret.add(100001272);
            ret.add(100001283);
            ret.add(100001005);
        }
        return ret;
    }

    public static List<Integer> getZeroSkill(MapleCharacter chr) {
        List<Integer> ret = new ArrayList<>();
        // 제로 1차
        ret.add(101001100);
        ret.add(101001200);
        for (int i = 100; i < 103; i++) {
            ret.add(101000000 + i);
        }
        for (int i = 200; i < 203; i++) {
            ret.add(101000000 + i);
        }
        // 제로 2차
        ret.add(101101100);
        ret.add(101101200);
        for (int i = 100; i < 102; i++) {
            ret.add(101100000 + i);
        }
        for (int i = 200; i < 203; i++) {
            ret.add(101100000 + i);
        }
        // 제로 3차
        ret.add(101111100);
        ret.add(101111200);
        for (int i = 101; i < 104; i++) {
            ret.add(101110000 + i);
        }
        for (int i = 200; i < 205; i++) {
            ret.add(101110000 + i);
        }
        // 제로 4차
        ret.add(101121100);
        ret.add(101121200);
        for (int i = 100; i < 110; i++) {
            ret.add(101120000 + i);
        }
        for (int i = 200; i < 207; i++) {
            ret.add(101120000 + i);
        }
        return ret;
    }

    public static List<Integer> getZeroSkill(int job) {
        List<Integer> ret = new ArrayList<>();
        // 제로 1차
        ret.add(101001100);
        ret.add(101001200);
        for (int i = 100; i < 103; i++) {
            ret.add(101000000 + i);
        }
        for (int i = 200; i < 203; i++) {
            ret.add(101000000 + i);
        }
        // 제로 2차
        ret.add(101101100);
        ret.add(101101200);
        for (int i = 100; i < 102; i++) {
            ret.add(101100000 + i);
        }
        for (int i = 200; i < 203; i++) {
            ret.add(101100000 + i);
        }
        // 제로 3차
        ret.add(101111100);
        ret.add(101111200);
        for (int i = 101; i < 104; i++) {
            ret.add(101110000 + i);
        }
        for (int i = 200; i < 205; i++) {
            ret.add(101110000 + i);
        }
        // 제로 4차
        ret.add(101121100);
        ret.add(101121200);
        for (int i = 100; i < 110; i++) {
            ret.add(101120000 + i);
        }
        for (int i = 200; i < 207; i++) {
            ret.add(101120000 + i);
        }
        return ret;
    }

    public static boolean isHyperFourthJob(int job) {
        switch (job) {
            case 112:
            case 122:
            case 132:
            case 212:
            case 222:
            case 232:
            case 312:
            case 322:
            case 412:
            case 422:
            case 512:
            case 532:
            case 1512:
            case 2112:
            case 2218:
            case 2217:
            case 2312:
            case 2412:
            case 2512:
            case 2712:
            case 3112:
            case 3122:
            case 3212:
            case 3312:
            case 3512:
            case 3612:
            case 5112:
            case 6112:
            case 6512:
            case 10112:
                return true;
        }
        return false;
    }

    public static boolean isDropEffect(int effect) {
        return (effect >= 1 && effect <= 4);
    }

    public final static boolean SurfaceDamageSkillLink(int skillid) {
        switch (skillid) {
            case 12121001:
            case 12120011:
            case 4221016:
            case 4221052:
            case 12121055:
            case 35121013:
                return true;
        }
        return false;
    }

    public static boolean isSoulEnchanter(int scrollId) {
        return scrollId / 100 == 25900;
    }

    public static boolean isSoulScroll(int scrollId) {
        return scrollId / 1000 == 2591;
    }

    public static short getSoulName(int soulid) {
        return (short) (soulid - 2591000 + 1);
    }

    public static short getSoulEnchanter(int itemid) {
        return 10;
    }

    public static short getSoulPotential(int soulid) {
        short potential = 0;
        for (int i = 0; i < soulItemid.length; i++) {
            if (soulItemid[i] == soulid) {
                potential = soulPotentials[i];
                break;
            }
        }
        return potential;
    }

    public static int getSoulSkill(int soulid) {
        int skillid = 0;
        switch (soulid) {
            case 2591045:
            case 2591046:
            case 2591047:
            case 2591048:
            case 2591049:
            case 2591050:
            case 2591051:
            case 2591052:
            case 2591053:
            case 2591054:
            case 2591124:
            case 2591125:
            case 2591126:
            case 2591127:
            case 2591128:
            case 2591129:
            case 2591130:
            case 2591131:
                skillid = 80001210;
                break;
            case 2591031:
            case 2591032:
            case 2591033:
            case 2591034:
            case 2591035:
            case 2591036:
            case 2591037:
            case 2591110:
            case 2591111:
            case 2591112:
            case 2591113:
            case 2591114:
            case 2591115:
            case 2591116:
                skillid = 80001012;
                break;
            case 2591017:
            case 2591018:
            case 2591019:
            case 2591020:
            case 2591021:
            case 2591022:
            case 2591023:
            case 2591096:
            case 2591097:
            case 2591098:
            case 2591099:
            case 2591100:
            case 2591101:
            case 2591102:
                skillid = 80001213;
                break;
            case 2591024:
            case 2591025:
            case 2591026:
            case 2591027:
            case 2591028:
            case 2591030:
            case 2591103:
            case 2591104:
            case 2591105:
            case 2591106:
            case 2591107:
            case 2591108:
            case 2591109:
                skillid = 80001214;
                break;
            case 2591065:
            case 2591066:
            case 2591067:
            case 2591068:
            case 2591069:
            case 2591070:
            case 2591071:
            case 2591072:
            case 2591073:
            case 2591074:
            case 2591132:
            case 2591133:
            case 2591134:
            case 2591135:
            case 2591136:
            case 2591137:
            case 2591138:
            case 2591139:
                skillid = 80001215;
                break;
            case 2591155:
            case 2591156:
            case 2591157:
            case 2591158:
            case 2591159:
            case 2591160:
            case 2591161:
            case 2591162:
            case 2591171:
            case 2591172:
            case 2591173:
            case 2591174:
            case 2591175:
            case 2591176:
            case 2591177:
            case 2591178:
                skillid = 80001216;
                break;
            case 2591010:
            case 2591011:
            case 2591012:
            case 2591013:
            case 2591014:
            case 2591015:
            case 2591016:
            case 2591089:
            case 2591090:
            case 2591091:
            case 2591092:
            case 2591093:
            case 2591094:
            case 2591095:
                skillid = 80001217;
                break;
            case 2591038:
            case 2591039:
            case 2591040:
            case 2591041:
            case 2591042:
            case 2591043:
            case 2591044:
            case 2591117:
            case 2591118:
            case 2591119:
            case 2591120:
            case 2591121:
            case 2591122:
            case 2591123:
                skillid = 80001218;
                break;
            case 2591055:
            case 2591056:
            case 2591057:
            case 2591058:
            case 2591059:
            case 2591060:
            case 2591061:
            case 2591062:
            case 2591063:
            case 2591064:
            case 2591140:
            case 2591141:
            case 2591142:
            case 2591143:
            case 2591144:
            case 2591145:
            case 2591146:
            case 2591147:
                skillid = 80001219;
                break;
            case 2591085:
                skillid = 80001267;
                break;
            case 2591075:
            case 2591076:
            case 2591077:
            case 2591078:
            case 2591079:
            case 2591080:
            case 2591081:
            case 2591082:
            case 2591179:
            case 2591180:
            case 2591181:
            case 2591182:
            case 2591183:
            case 2591184:
            case 2591185:
            case 2591186:
                skillid = 80001266;
                break;
            case 2591086:
                skillid = 80001268;
                break;
            case 2591087:
                skillid = 80001269;
                break;
            case 2591088:
                skillid = 80001270;
                break;
            case 2591148:
            case 2591149:
            case 2591150:
            case 2591151:
            case 2591152:
            case 2591153:
            case 2591154:
            case 2591164:
            case 2591165:
            case 2591166:
            case 2591167:
            case 2591168:
            case 2591169:
            case 2591170:
                skillid = 80001273;
                break;
            case 2591163:
                skillid = 80001274;
                break;
            case 2591187:
            case 2591188:
            case 2591189:
            case 2591190:
            case 2591191:
            case 2591192:
            case 2591193:
            case 2591203:
            case 2591204:
            case 2591205:
            case 2591206:
            case 2591207:
            case 2591208:
            case 2591209:
                skillid = 80001280;
                break;
            case 2591194:
            case 2591195:
            case 2591196:
            case 2591197:
            case 2591198:
            case 2591199:
            case 2591200:
            case 2591201:
            case 2591210:
            case 2591211:
            case 2591212:
            case 2591213:
            case 2591214:
            case 2591215:
            case 2591216:
            case 2591217:
                skillid = 80001281;
                break;
            case 2591202:
                skillid = 80001282;
                break;
            case 2591218:
            case 2591219:
            case 2591220:
            case 2591221:
            case 2591222:
            case 2591223:
            case 2591224:
            case 2591234:
            case 2591235:
            case 2591236:
            case 2591237:
            case 2591238:
            case 2591239:
            case 2591240:
                skillid = 80001321;
                break;
            case 2591225:
            case 2591226:
            case 2591227:
            case 2591228:
            case 2591229:
            case 2591230:
            case 2591231:
            case 2591232:
            case 2591241:
            case 2591242:
            case 2591243:
            case 2591244:
            case 2591245:
            case 2591246:
            case 2591247:
            case 2591248:
                skillid = 80001322;
                break;
            case 2591233:
                skillid = 80001323;
                break;
            case 2591249:
            case 2591250:
            case 2591251:
            case 2591252:
            case 2591253:
            case 2591254:
            case 2591255:
            case 2591265:
            case 2591266:
            case 2591267:
            case 2591268:
            case 2591269:
            case 2591270:
                skillid = 80001339;
                break;
            case 2591256:
            case 2591257:
            case 2591258:
            case 2591259:
            case 2591260:
            case 2591261:
            case 2591262:
            case 2591263:
            case 2591272:
            case 2591273:
            case 2591274:
            case 2591275:
            case 2591276:
            case 2591277:
            case 2591278:
            case 2591279:
                skillid = 80001340;
                break;
            case 2591264:
                skillid = 80001341;
                break;
            case 2591288:
            case 2591289:
            case 2591290:
            case 2591291:
            case 2591292:
            case 2591293:
            case 2591294:
            case 2591295:
                skillid = 80001395;
                break;
            case 2591296:
                skillid = 80001396;
                break;
            case 2591297:
            case 2591298:
            case 2591299:
            case 2591300:
            case 2591301:
            case 2591302:
            case 2591303:
            case 2591304:
            case 2591342:
            case 2591343:
            case 2591344:
            case 2591345:
            case 2591346:
            case 2591347:
            case 2591348:
            case 2591349:
                skillid = 80001493;
                break;
            case 2591305:
                skillid = 80001494;
                break;
            case 2591306:
            case 2591307:
            case 2591308:
            case 2591309:
            case 2591310:
            case 2591311:
            case 2591312:
            case 2591313:
            case 2591350:
            case 2591351:
            case 2591352:
            case 2591353:
            case 2591354:
            case 2591355:
            case 2591356:
            case 2591357:
                skillid = 80001495;
                break;
            case 2591314:
                skillid = 80001496;
                break;
            case 2591315:
            case 2591316:
            case 2591317:
            case 2591318:
            case 2591319:
            case 2591320:
            case 2591321:
            case 2591322:
            case 2591358:
            case 2591359:
            case 2591360:
            case 2591361:
            case 2591362:
            case 2591363:
            case 2591364:
            case 2591365:
                skillid = 80001497;
                break;
            case 2591323:
                skillid = 80001498;
                break;
            case 2591324:
            case 2591325:
            case 2591326:
            case 2591327:
            case 2591328:
            case 2591329:
            case 2591330:
            case 2591331:
            case 2591366:
            case 2591367:
            case 2591368:
            case 2591369:
            case 2591370:
            case 2591371:
            case 2591372:
            case 2591373:
                skillid = 80001499;
                break;
            case 2591332:
                skillid = 80001500;
                break;
            case 2591333:
            case 2591334:
            case 2591335:
            case 2591336:
            case 2591337:
            case 2591338:
            case 2591339:
            case 2591340:
            case 2591374:
            case 2591375:
            case 2591376:
            case 2591377:
            case 2591378:
            case 2591379:
            case 2591380:
            case 2591381:
                skillid = 80001501;
                break;
            case 2591341:
                skillid = 80001502;
                break;
            case 2591029:
            case 2591083:
            case 2591084:
            case 2591271:
            case 2591280:
            case 2591281:
            case 2591282:
            case 2591283:
            case 2591284:
            case 2591285:
            case 2591286:
            case 2591287:
        }
        return skillid;
    }

    public static double getVortexRange(final short id) {
        double range = 0.01;
        final byte level = (byte) (id % 10);
        if (level == 9) {
            range += 0.085;
        } else {
            range += ((level == 0 ? 9 : level) * 0.01);
        }
        return range;
    }

    public static int getHonorable(final int itemId) {
        switch (itemId) {
            case 2591085:
                return 80001267; //지옥불 재체기(발록)
            case 2591086:
                return 80001268;//반레온
            case 2591087:
                return 80001269;//핑크빈
            case 2591088:
                return 80001270;//시그너스
            case 2591202:
                return 80001282;//아카이럼
            case 2591163:
                return 80001274;//자쿰
            case 2591233:
                return 80001323;//힐라
            case 2591264:
                return 80001341;//매그너스
            case 2591296:
                return 80001396;//무르무르
            case 2591305:
                return 80001494;//모카딘
            case 2591314:
                return 80001496;//카리아인
            case 2591323:
                return 80001498;//cq57
            case 2591332:
                return 80001500;//줄라이
            case 2591341:
                return 80001502;//플레드
            default:
                return 0;
        }
    }

    public static final int getLinkedAranSkill(final int id) {
        switch (id) {
            case 21110007:
            case 21110008:
                return 21110002;
            case 21120009:
            case 21120010:
                return 21120002;
            case 4321001:
                return 4321000;
            case 33101006:
            case 33101007:
                return 33101005;
            case 33101008:
                return 33101004;
            case 35101009:
            case 35101010:
                return 35100008;
            case 35121013:
                return 35111004;
            case 41110008:
                return 41001001;
            case 35121011:
                return 35121009;
            case 35111009:
            case 35111010:
                return 35111001;
            case 35100004:
                return 35101004;
            case 35001001:
                return 35101009;
            case 32001007:
            case 32001008:
            case 32001009:
            case 32001010:
            case 32001011:
                return 32001001;
            case 5300007:
                return 5301001;
            case 5320011:
                return 5321004;
            case 23101007:
                return 23101001;
            case 23111010:
            case 23111009:
                return 23111008;
            case 31001006:
            case 31001007:
            case 31001008:
                return 31000004;
            case 27120211:
                return 27121201;
            case 61001004:
            case 61001005:
            case 61110212:
            case 61120219:
                return 61001000;
            case 61111113:
                return 61111100;
            case 61121201:
                return 61121100;
            case 61121203:
                return 61121102;
            case 61110009:
                return 61111003;
            case 61121217:
                return 61120007;
            case 61121116:
                return 61121104;
            case 65101006:
                return 65101106;
            case 65121007:
            case 65121008:
                return 65121101;
            case 65111007:
                return 65111100;
            case 24121010:
                return 24121003;
            case 24111008:
                return 24111006;
            case 61120008:
                return 61111008;
            case 51100006:
                return 51101006;
            case 31011004:
            case 31011005:
            case 31011006:
            case 31011007:
                return 31011000;
            case 31201007:
            case 31201008:
            case 31201009:
            case 31201010:
                return 31201000;
            case 31211007:
            case 31211008:
            case 31211009:
            case 31211010:
                return 31211000;
            case 31221009:
            case 31221010:
            case 31221011:
            case 31221012:
                return 31221000;
            case 31211011:
                return 31211002;
            case 31221014:
                return 31221001;
            case 36101008:
            case 36101009:
                return 36101000;
            case 36111009:
            case 36111010:
                return 36111000;
            case 36121011:
            case 36121012:
                return 36121001;
            case 35100009:
                return 35100009;
            case 2121055:
                return 2121052;
        }
        return id;
    }

    public static boolean iskaiser_Transfiguration_Skill(int id) {
        ISkill skill = (ISkill) SkillFactory.getSkill(getLinkedAranSkill(id));
        if ((skill.getId() == 61111114) || (skill.getId() == 61121015) || (skill.getId() == 61121116) || (skill.getId() == 61120018) || (skill.getId() == 61001004) || (skill.getId() == 61001005) || (skill.getId() == 61110009) || (skill.getId() == 61111113) || (skill.getId() == 61120008)) {
            return true;
        }
        return false;
    }

    public static final boolean isSuperior(final int itemId) {
        return (itemId >= 1102471 && itemId <= 1102485) || (itemId >= 1072732 && itemId <= 1072747)
                || (itemId >= 1132164 && itemId <= 1132178) || (itemId >= 1122241 && itemId <= 1122245)
                || (itemId >= 1082543 && itemId <= 1082547);
    }

    public static int getEmpress_ForJob(int job) {
        return PlayerStats.getSkillByJob(73, job);
    }

    public static int getMountItemEx(int buffid) {
        final int riding = 1932000;
        switch (buffid) {
            case 1204: // 배틀쉽
                return riding + 0;
            case 80001163: // 스페이스쉽
                return riding + 2;
            case 80001449: // 스페이스쉽2
                return riding + 225;
            case 80001450: // 오토바이2
                return riding + 226;
            case 80001451: // 슈트2
                return riding + 227;
            case 80001026: // 빗자루 ok
                return riding + 5;
            case 80001003: // 목마 ok
                return riding + 6;
            case 80001004: // 악어 ok
                return riding + 7;
            case 80001005: // 오토바이 (갈색) ok
                return riding + 8;
            case 80001006: // 오토바이 (분홍색) ok
                return riding + 9;
            case 80001007: // 구름 ok
                return riding + 11;
            case 80001008: // 진짜 발록 ok
                return riding + 10;
            case 80001009: // 레이싱카 ok
                return riding + 13;
            case 80001010: // 피시방 호랑이 ok
                return riding + 14;
            case 80001011: // 미스트 발록 (전체모습) ok
                return riding + 12;
            case 80001013: // 주황버섯 ok
                return riding + 23;
            case 80001014: // 불타는 말 ok
                return riding + 25;
            case 80001015: // 타조 ok
                return riding + 26;
            case 80001016: // 핑크곰 열기구 ok
                return riding + 27;
            case 80001017: // 파랑 로봇 ok
                return riding + 28;
            case 80001018: // 오토바이 (빨강색) ok
                return riding + 34;
            case 80001019: // 파워드 슈트 ok
                return riding + 35;
            case 80001020: // 라이언킹 ok
                return riding + 41;
            case 80001021: // 블루 스쿠더 ok
                return riding + 43;
            case 80001022: // 루돌푸 개삐대 ok
                return riding + 44;
            case 80001023: // 복주머니 ok
                return riding + 48;
            case 80001027: // 나무 비행기 ok
                return riding + 49;
            case 80001028: // 빨간 비행기 ok
                return riding + 50;
            case 80001038: // 황금 장식 배 ok
                return riding + 53;
            case 80001030: // 닭 ok
                return riding + 54;
            case 80001031: // 부엉이 ok
                return riding + 55;
            case 80001032: // 파랑 자동차 ok
                return riding + 56;
            case 80001033: // 카니발 라이딩 ok
                return riding + 57;
            case 80001044: // 꼬마토기 ok
                return riding + 90;
            case 80001082: // 황소 ok
                return riding + 93;
            case 80001083: // 수레꾼토끼 ok
                return riding + 94;
            case 80001084: // 시발무서운토끼 ok
                return riding + 95;
            case 80001090: // 추장멧돼지 ok
                return riding + 96;
            case 80001137: // 검은부엉이 ok
                return riding + 110;
            case 80001144: // 류호수레꾼 ok
                return riding + 113;
            case 80001148: // 빨간붕붕차 ok
                return riding + 114;
            case 80001149: // 멋진 로봇 ok
                return riding + 115;
            case 80001198: // 드래고니카 ok
                return riding + 140;
            case 80001220: // 팬텀 ok
                return riding + 143;
            case 80001221: // 아리아 ok
                return riding + 144;
            case 80001228: // 재규어 ok
                return riding + 148;
            case 80001237: // 블랙와이번 ok
                return riding + 153;
            case 80001243: // 외발자전거 ok
                return riding + 156;
            case 80001244: // 겨울왕국 ok
                return riding + 157;
            case 80001246: // 달 ok
                return riding + 159;
            case 80001257: // 핑크빈 둥둥 ok
                return riding + 161;
            case 80001258: // 블랙빈 둥둥 ok
                return riding + 162;
            case 80001261: // 어떤 이상한년 ok
                return riding + 164;
            case 80001285: // 풍선 둥둥 ok
                return riding + 167;
            case 80001289: // 데비존 ok
                return riding + 170;
            case 80001290: // 신비목마 ok
                return riding + 171;
            case 80001292: // 어린왕자 ok
                return riding + 173;
            case 80001302: // 검은 드래곤 ok
                return riding + 178;
            case 80001304: // 멧돼지 ok
                return riding + 179;
            case 80001305: // 은빛갈기 ok
                return riding + 180;
            case 80001306: // 레드 드라코 ok
                return riding + 181;
            case 80001307: // 티티아나 ok
                return riding + 182;
            case 80001308: // 티티오 ok
                return riding + 183;
            case 80001309: // 신조 ok
                return riding + 184;
            case 80001312: // 류호 1 ok
                return riding + 187;
            case 80001313: // 류호 2 ok
                return riding + 188;
            case 80001314: // 류호 3 ok
                return riding + 189;
            case 80001315: // 류호 4 ok
                return riding + 190;
            case 80001316: // 에반 1 ok
                return riding + 191;
            case 80001317: // 에반 2 ok
                return riding + 192;
            case 80001318: // 에반 3 ok
                return riding + 193;
            case 80001319: // 하이에나 ok
                return riding + 194;
            case 80001327: // 덕덕 ok
                return riding + 198;
            case 80001331: // 보석 섹스 ok
                return riding + 199;
            case 80001336: // 하얀병아리 ok
                return riding + 200;
            case 80001338: // 장난감 ok
                return riding + 201;
            case 80001333: // 빨간근두운 ok
                return riding + 205;
            case 80001347: // 악마년 ok
                return riding + 207;
            case 80001348: // 힙합 ok
                return riding + 208;
            case 80001353: // 악마년2 ok
                return riding + 211;
            case 80001413: // 쟁반 ok
                return riding + 219;
            case 80001421: // 마차 ok
                return riding + 221;
            case 80001423: // 벨룸 ok
                return riding + 222;
            case 80001445: // 빛날개 ok
                return riding + 242;
            case 80001447: // 어둠날개 ok
                return riding + 243;
            case 80001484: // 부츠 ok
                return riding + 235;
            case 80001508: // 얼음말 ok
                return riding + 244;
            case 80001345:// 헤카톤주먹
                return riding + 204;
            case 80001199:// 독수으리 대처
                return riding + 256;
            case 80001490: // 나으리 대처
                return riding + 259;
            case 80001491: // 헬리콥터 대처
                return riding + 258;
            case 80001505: // 지각했당   
                return riding + 251;
            case 80001492: // 꿀꿀나비     
                return riding + 249;
            case 80001503: // 투명발록
                return riding + 12;
            case 80001531: //이상한말
                return riding + 253;
            case 80001549: //메이플차?
                return riding + 254;
            case 80001550: //팬더
                return riding + 255;
            case 80001355://돌고래    
                return riding + 212;
            case 80001411://좀비트럭
                return riding + 218;
            case 80001552: //독수으리
            case 80001553:
                return +256;
            case 80001554: //헬리콥터?
            case 80001555:
                return +258;
            case 80001557://나으리
            case 80001558:
                return +259;
            // 치우띠 작업 시작    
            case 80001958: // 얼음 마법진?
            case 80001959:
                return riding + 375;
            case 80001404: // 지니 라이딩인듯
                return riding + 223;
            case 80001561:
                return riding + 263;
            case 80001562:
                return riding + 264;
            case 80001563:
                return riding + 265;
            case 80001564:
                return riding + 266;
            case 80001565:
                return riding + 267;
            case 80001566:
                return riding + 268;
            case 80001567:
                return riding + 269;
            case 80001568:
                return riding + 270;
            case 80001569:
                return riding + 271;
            case 80001570:
                return riding + 272;    // 스타플래닛
            case 80001571:
                return riding + 273;    // 스타플래닛
            case 80001572:
                return riding + 274;   // 스타플래닛
            case 80001779:
                return riding + 325; // 언프리티스타?
            case 80001810:
                return riding + 339; // 미니 우르스 라이딩
            case 80001784:
                return riding + 334; // 서핑 보드 라이딩
            case 80001701:
                return riding + 304; // 죽음의데스 마스터라벨 라이딩
            case 80001814:
                return riding + 342; // 밤하늘 기차 라이딩 
            case 80001923:
            case 80001924:
                return riding + 361; // 밤하늘 배 라이딩
            case 80001949:
                return riding + 367; // 카드 마스터라벨 라이딩
            case 80001703:
                return riding + 305; // 뭐냐 이거 우주에서 온 요원?
            case 80001786:
            case 80001787:
                return riding + 335; // 신현정이 좋아할 라이딩
            case 80001918:
            case 80001919:
                return riding + 353; // 신현정 방구 라이딩
            case 80001942:
            case 80001943:
                return riding + 365; // 루돌프 크리스마스 라이딩
            case 80001975:
            case 80001976:
                return riding + 377; // 슈퍼맨 ㄱㅁㄸ
            case 80001811:
            case 80001812:
                return riding + 341; // 에벌레 라이딩
            case 80002200:
                return riding + 393; // 여기서 부터 아케인리버 이후 라이딩
            case 80002201:
                return riding + 394;
            case 80002202:
                return riding + 395;
            case 80002203:
                return riding + 451;
            case 80002204:
                return riding + 399;
            case 80002205:
                return riding + 400;
            case 80002296:
            case 80002297:
                return riding + 449;
            case 80002299:
                return riding + 450;
            case 80002369:
            case 80002370:
                return riding + 486;
            case 80002375:
                return riding + 491; // 작업 나누기 ====
            case 80002400:
            case 80002401:
                return riding + 489;
            case 80002402:
            case 80002403:
                return riding + 499;
            case 80002417:
                return riding + 500;
            case 80002418:
                return riding + 501;
            case 80002425:
                return riding + 504;
            case 80002427:
                return riding + 506;
            case 80002429:
            case 80002430:
                return riding + 507;
            case 80002431:
            case 80002432:
                return riding + 508;
            case 80002433:
            case 80002434:
                return riding + 510;
            case 80002435:
            case 80002436:
                return riding + 511;
            case 80002437:
            case 80002438:
                return riding + 513; // 작업 끝
            default:
                return 0;
        }
    }

    public static boolean 환생의불꽃아이템(int id) {
        int itemid[] = {1000000};
        for (Integer s : itemid) {
            if (s == id) {
                return true;
            }
        }
        return false;
    }

    public static String 랭크(int a) {
        String name = "";
        if (a >= 1000) {
            name = "챌린저(Challenger)";
        } else if (a >= 800) {
            name = "다이아몬드(Diamond)";
        } else if (a >= 500) {
            name = "플레티넘(Platinum)";
        } else if (a >= 300) {
            name = "골드(Gold)";
        } else if (a >= 100) {
            name = "실버(Silver)";
        } else if (a > 0) {
            name = "브론즈(Bronze)";
        } else {
            name = "언 랭크(Unrank)";
        }
        return name;
    }

    public static boolean 엠블렘(int code) {
        int itemid[] = {1182000, 1182001, 1182002, 1182003, 1182005, 1182006, 1182007, 1182009, 1182010, 1182011, 1182019, 1182021, 1182022, 1182023, 1182053, 1182056, 1182058, 1182059, 1182061, 1182062, 1182063, 1182064, 1182066, 1182067, 1182069, 1182071, 1190000, 1190001};
        for (Integer id : itemid) {
            if (id == code) {
                return true;
            }
        }
        return false;
    }

    public static boolean is_zero_skill(int nSkillID) {
        int v1; // eax@1

        v1 = nSkillID / 10000;
        if (nSkillID / 10000 == 8000) {
            v1 = nSkillID / 100;
        }
        return v1 == 10000 || v1 == 10100 || v1 == 10110 || v1 == 10111 || v1 == 10112;
    }

    public static int GetAdvancedBulletCountHyperSkill(int nSkillID) {
        int result; // eax@1

        result = 0;
        if (nSkillID == 4121013) {
            result = 4120051;
        } else if (nSkillID == 5321012) {
            result = 5320051;
        }
        return result;
    }

    public static int GetAdvancedAttackCountHyperSkill(int nSkillID) {
        int result; // eax@1

        result = 0;
        if (nSkillID > 13121002) {
            if (nSkillID <= 31121001) {
                if (nSkillID == 31121001) {
                    result = 31120050;
                } else if (nSkillID > 21120006) {
                    if (nSkillID > 22140023) {
                        if (nSkillID == 25121005) {
                            result = 25120148;
                        } else if (nSkillID == 31111005) {
                            result = 31120044;
                        }
                    } else if (nSkillID == 22140023) {
                        result = 22170086;
                    } else if (nSkillID == 21120022 || nSkillID > 21121015 && nSkillID <= 21121017) {
                        result = 21120066;
                    }
                } else if (nSkillID == 21120006) {
                    result = 21120049;
                } else if (nSkillID > 15121002) {
                    if (nSkillID == 21110020 || nSkillID == 21111021) {
                        result = 21120047;
                    }
                } else {
                    switch (nSkillID) {
                        case 15121002:
                            result = 15120048;
                            break;
                        case 14121002:
                            result = 14120045;
                            break;
                        case 15111022:
                        case 15120003:
                            result = 15120045;
                            break;
                    }
                }
                return result;
            }
            if (nSkillID <= 51121008) {
                if (nSkillID == 51121008) {
                    return 51120048;
                }
                if (nSkillID <= 37120001) {
                    if (nSkillID != 37120001) {
                        if (nSkillID == 32111003) {
                            return 32120047;
                        }
                        if (nSkillID == 35121016) {
                            return 35120051;
                        }
                        if (nSkillID != 37110002) {
                            return result;
                        }
                    }
                    return 37120045;
                }
                if (nSkillID != 51120057) {
                    if (nSkillID == 51121007) {
                        result = 51120051;
                    }
                    return result;
                }
                return 51120058;
            }
            if (nSkillID > 61121201) {
                if (nSkillID >= 65121007 && (nSkillID <= 65121008 || nSkillID == 65121101)) {
                    result = 65120051;
                }
                return result;
            }
            if (nSkillID != 61121201) {
                if (nSkillID == 51121009) {
                    return 51120058;
                }
                if (nSkillID != 61121100) {
                    return result;
                }
            }
            return 61120045;
        }
        if (nSkillID == 13121002) {
            return 13120048;
        }
        if (nSkillID <= 5121017) {
            if (nSkillID >= 5121016) {
                return 5120051;
            }
            if (nSkillID <= 3121015) {
                if (nSkillID == 3121015) {
                    result = 3120048;
                } else if (nSkillID > 1221011) {
                    if (nSkillID == 2121006) {
                        result = 2120048;
                    } else if (nSkillID == 2221006) {
                        result = 2220048;
                    }
                } else {
                    switch (nSkillID) {
                        case 1221011:
                            result = 1220050;
                            break;
                        case 1120017:
                        case 1121008:
                            result = 1120051;
                            break;
                        case 1221009:
                            result = 1220048;
                            break;
                    }
                }
                return result;
            }
            if (nSkillID <= 4331000) {
                switch (nSkillID) {
                    case 4331000:
                        result = 4340045;
                        break;
                    case 3121020:
                        result = 3120051;
                        break;
                    case 3221017:
                        result = 3220048;
                        break;
                    case 4221007:
                        result = 4220048;
                        break;
                }
                return result;
            }
            if (nSkillID == 4341009) {
                return 4340048;
            }
            if (nSkillID != 5121007) {
                return result;
            }
            return 5120048;
        }
        if (nSkillID <= 11121203) {
            if (nSkillID != 11121203) {
                if (nSkillID <= 5321000) {
                    if (nSkillID == 5321000) {
                        return 5320048;
                    }
                    if (nSkillID == 5121020) {
                        return 5120048;
                    }
                    if (nSkillID == 5221016) {
                        return 5220047;
                    }
                    if (nSkillID != 5320011) {
                        return result;
                    }
                    return 5320043;
                }
                if (nSkillID == 5321004) {
                    return 5320043;
                }
                if (nSkillID != 11121103) {
                    return result;
                }
            }
            return 11120048;
        }
        if (nSkillID <= 12110028) {
            if (nSkillID != 12110028 && nSkillID != 12000026 && nSkillID != 12100028) {
                return result;
            }
            return 12120045;
        }
        if (nSkillID == 12120010) {
            return 12120045;
        }
        if (nSkillID == 12120011) {
            result = 12120046;
        }
        return result;
    }

    public static boolean is_kinesis_psychiclock_skill(int nSkillID) {
        if (nSkillID > 142111002) {
            if (nSkillID < 142120000 || nSkillID > 142120002 && nSkillID != 142120014) {
                return false;
            }
        } else if (nSkillID != 142111002 && nSkillID != 142100010 && nSkillID != 142110003 && nSkillID != 142110015) {
            return false;
        }
        return true;
    }

    public static boolean is_super_nova_skill(int nSkillID) {
        return nSkillID == 4221052 || nSkillID == 65121052;
    }

    public static boolean is_screen_center_attack_skill(int nSkillID) {
        boolean v1; // zf@5

        if (nSkillID > 21121057) {
            if (nSkillID == 80001431) {
                return true;
            }
            v1 = nSkillID == 100001283;
        } else {
            if (nSkillID == 21121057 || nSkillID == 13121052 || nSkillID == 14121052) {
                return true;
            }
            v1 = nSkillID == 15121052;
        }
        if (!v1) {
            return false;
        }
        return true;
    }

    public static boolean is_keydown_skill_rect_move_xy(int nSkillID) {
        return nSkillID == 13111020;
    }

    public static int bint(byte[] by, int i) {
        return ((by[i + 3] << 24) + (by[i + 2] << 16) + (by[i + 1] << 8) + by[i]);
    }

    public static int getMaxLevel(final int itemId) {
        //Map<Integer, Map<String, Integer>> inc = ItemInformation.getInstance().getEquipIncrements(itemId);
        return 0;
    }

    public static MonsterStatus getStatFromWeapon(final int itemid) {
        switch (itemid) {
            case 1302109:
            case 1312041:
            case 1322067:
            case 1332083:
            case 1372048:
            case 1382064:
            case 1402055:
            case 1412037:
            case 1422041:
            case 1432052:
            case 1442073:
            case 1452064:
            case 1462058:
            case 1472079:
            case 1482035:
                return MonsterStatus.DARKNESS;
            case 1302108:
            case 1312040:
            case 1322066:
            case 1332082:
            case 1372047:
            case 1382063:
            case 1402054:
            case 1412036:
            case 1422040:
            case 1432051:
            case 1442072:
            case 1452063:
            case 1462057:
            case 1472078:
            case 1482036:
                return MonsterStatus.SPEED;
        }
        return null;
    }

    public static int getMPByJob(MapleCharacter chr) {
        int job = chr.getJob();
        int mp = 10;
        List<Integer> demonShields = Collections.unmodifiableList(Arrays.asList(1099000, 1099002, 1099003, 1099004));
        IEquip shield = (IEquip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
        if (shield != null && demonShields.contains(shield.getItemId())) {
            mp += shield.getMp();
        }
        if (chr.getSkillLevel(31120038) > 0) {
            mp += 50;
        }
        return mp; // beginner or 3100
    }

    public static List<Integer> getPercentHP() {
        List<Integer> ret = new ArrayList<>();
        ret.add(1220036);
        ret.add(3220036);
        ret.add(35120036);
        ret.add(21120036);
        ret.add(23120036);
        ret.add(65120036);
        ret.add(31220036);
        ret.add(2320036);
        ret.add(1120036);
        ret.add(33120036);
        ret.add(4220036);
        ret.add(32120036);
        ret.add(61120036);
        ret.add(5220036);
        ret.add(5320036);
        ret.add(36120036);
        ret.add(5120036);
        ret.add(4340036);
        ret.add(24120036);
        ret.add(51120036);
        ret.add(22170036);
        ret.add(4120036);
        ret.add(2120036);
        ret.add(31120036);
        ret.add(1320036);
        ret.add(27120036);
        ret.add(3120036);
        ret.add(2220036);
        ret.add(22131001);//에반 매직실드
        ret.add(31000003);//데몬슬레이어HP증가
        ret.add(32121010);//배틀 레이지
        ret.add(61100007);//이너 블레이즈
        ret.add(60000222);//아이언 윌
        ret.add(61110007);//어드밴스드 이너블레이즈
        ret.add(80000006);//아이언 윌 : 링크
        return ret;
    }

    public static List<Integer> getPercentMP() {
        List<Integer> ret = new ArrayList<>();
        ret.add(1220037);
        ret.add(3220037);
        ret.add(35120037);
        ret.add(21120037);
        ret.add(23120037);
        ret.add(65120037);
        ret.add(31220037);
        ret.add(2320037);
        ret.add(1120037);
        ret.add(33120037);
        ret.add(4220037);
        ret.add(32120037);
        ret.add(61120037);
        ret.add(5220037);
        ret.add(5320037);
        ret.add(36120037);
        ret.add(5120037);
        ret.add(4340037);
        ret.add(24120037);
        ret.add(51120037);
        ret.add(22170037);
        ret.add(4120037);
        ret.add(2120037);
        ret.add(31120037);
        ret.add(1320037);
        ret.add(27120037);
        ret.add(3120037);
        ret.add(2220037);
        ret.add(32121010);//배틀 레이지        
        return ret;
    }

    public static boolean isResist(final int job) {
        return job / 1000 == 3;
    }

    public static int getDiceDef(int buffid, int stat) {
        if (buffid == stat) {
            return 30;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 != stat) {
            return 30;
        } else if (buffid != stat && buffid / 10 != stat && buffid % 10 == stat) {
            return 30;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 == stat) {
            return 40;
        }
        return 0;
    }

    public static int getDiceHPMP(int buffid, int stat) {
        if (buffid == stat) {
            return 20;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 != stat) {
            return 20;
        } else if (buffid != stat && buffid / 10 != stat && buffid % 10 == stat) {
            return 20;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 == stat) {
            return 30;
        }
        return 0;
    }

    public static int getDiceCrit(int buffid, int stat) {
        if (buffid == stat) {
            return 15;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 != stat) {
            return 15;
        } else if (buffid != stat && buffid / 10 != stat && buffid % 10 == stat) {
            return 15;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 == stat) {
            return 25;
        }
        return 0;
    }

    public static int getDiceDamage(int buffid, int stat) {
        if (buffid == stat) {
            return 20;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 != stat) {
            return 20;
        } else if (buffid != stat && buffid / 10 != stat && buffid % 10 == stat) {
            return 20;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 == stat) {
            return 30;
        }
        return 0;
    }

    public static int getDiceExp(int buffid, int stat) {
        if (buffid == stat) {
            return 30;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 != stat) {
            return 30;
        } else if (buffid != stat && buffid / 10 != stat && buffid % 10 == stat) {
            return 30;
        } else if (buffid != stat && buffid / 10 == stat && buffid % 10 == stat) {
            return 40;
        }
        return 0;
    }

    public static boolean isCannon(final int job) {
        return job == 1 || job == 501 || (job >= 530 && job <= 532);
    }

    public static boolean is_flip_affected_area_skil(int nSkillID) {
        boolean v1; // zf@4
        boolean v2; // zf@10

        if (nSkillID > 33121016) {
            v1 = nSkillID == 35121052;
        } else {
            if (nSkillID == 33121016 || nSkillID == 33111013) {
                return true;
            }
            v1 = nSkillID == 33121012;
        }
        if (!v1) {
            if (nSkillID > 131001107) {
                v2 = nSkillID == 131001207;
            } else {
                if (nSkillID == 131001107 || nSkillID == 4121015) {
                    return true;
                }
                v2 = nSkillID == 51120057;
            }
            if (!v2) {
                return false;
            }
        }
        return true;
    }

    public static boolean is_rw_multi_charge_skill(int nSkillID) {
        boolean v1; // zf@6

        if (nSkillID > 37110001) {
            if (nSkillID == 37110004 || nSkillID == 37111000) {
                return true;
            }
            v1 = nSkillID == 37111003;
        } else {
            if (nSkillID == 37110001) {
                return true;
            }
            if (nSkillID > 37100002) {
                v1 = nSkillID == 37101001;
            } else {
                if (nSkillID == 37100002 || nSkillID == 37000010) {
                    return true;
                }
                v1 = nSkillID == 37001001;
            }
        }
        if (!v1) {
            return false;
        }
        return true;
    }

    public static boolean is_unregisterd_skill(int nSkillID) {
        int v1; // eax@3
        boolean result; // eax@6

        if (nSkillID == 0 || nSkillID < 0) {
            return nSkillID / 10000000 == 9;
        }
        v1 = nSkillID / 10000;
        if (nSkillID / 10000 == 8000) {
            v1 = nSkillID / 100;
        }
        if (v1 == 9500) {
            result = false;
        } else {
            result = nSkillID / 10000000 == 9;
        }
        return result;
    }

    public static boolean isMonsterLifeBox(int itemId) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }

    public static boolean isBulletAttack(int skill) {
        switch (skill) {
            case 14001020:
            case 14101020:
                return true;
        }
        return false;
    }

    public static int[][] getZeroSkillList() {
        final int skilllist[][] = {{100000267, 100}, {100001261, 110}, {100001274, 120}, {100001272, 140}, {100001283, 170}, {101000101, 150}, {100001005, 200}};
        return skilllist;
    }

    public static boolean is시티즌(int jobid) {
        return jobid == 3000;
    }

    public static boolean isHat(int itemid) {
        return itemid / 10000 == 100;
    }

    public static boolean isForeHead(int itemid) {
        return itemid / 10000 == 101;
    }

    public static boolean isShoe(int itemid) {
        return itemid / 10000 == 107;
    }

    public static boolean isGlove(int itemid) {
        return itemid / 10000 == 108;
    }

    public static boolean isCape(int itemid) {
        return itemid / 10000 == 110;
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
            //위가 알파가낄때
            //밑이 베타가낄때
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
        }
        return 0;
    }

    /*public final static short linkedZeroSlot(short slot) {
        switch (slot) {
            case (short) 0xFA23:
                return (short) 0xFF9B;
            case (short) 0xFA24:
                return (short) 0xFF99;
            case (short) 0xFA22:
                return (short) 0xFF9A;
            case (short) 0xFA21:
                return (short) 0xFF98;
            case (short) 0xFA1F:
                return (short) 0xFF97;
            case (short) 0xFA1C:
                return (short) 0xFF96;
            case (short) 0xFA1B:
                return (short) 0xFF95;
            case (short) 0xFA1E:
                return (short) 0xFF94;
            case (short) 0xFA20:
                return (short) 0xFF93;
            case (short) 0xFA1D:
                return (short) 0xFF91;

            case (short) 0xFF9B:
                return (short) 0xFA23;//
            case (short) 0xFF99:
                return (short) 0xFA24;//            
            case (short) 0xFF9A:
                return (short) 0xFA22;//
            case (short) 0xFF98:
                return (short) 0xFA21;//
            case (short) 0xFF97:
                return (short) 0xFA1F;//
            case (short) 0xFF96:
                return (short) 0xFA1C;//
            case (short) 0xFF95:
                return (short) 0xFA1B;//
            case (short) 0xFF94:
                return (short) 0xFA1E;//
            case (short) 0xFF93:
                return (short) 0xFA20;//
            case (short) 0xFF91:
                return (short) 0xFA1D;//

        }
        return 0;
    }*/
    public static String[] zeroSet(String a) {
        return a.split(",");
    }

    public static boolean isNotPassiveLoading(int skillid) {
        switch (skillid) {
            case 5111007:
            case 31000003:
            case 60001216:
            case 61100005:
            case 61110005:
            case 61120010:
            case 100000279:
            case 101100203:
            case 2000006:
            case 22000014:
            case 12000025:
            case 36000004:
            case 36100007:
            case 36110007:
            case 36120010:
            case 71000013:
            case 71000021:
            case 71001100:
            case 71001101:
            case 71001102:
            case 71001103:
            case 5120012:
            case 5211007:
            case 5220014:
            case 35111013:
            case 35120014: //double lucky
            case 15111011:
            case 5311005:
            case 5320007:
                return true;
        }
        return false;
    }

    public static int Minus_Energy(int skillid) {
        switch (skillid) {
            case 5121020:
                return 150;
            case 5121017:
                return 260;
            case 5111013:
                return 140;
            case 5111015:
                return 180;
            case 5101014:
                return 85;
            case 5121019:
                return 180;
            case 5121052:
            case 5121055:
                return 2500;
        }
        return 0;
    }

    public static boolean isConvergenceSkill(final int skillID) {
        switch (skillID) {
            case 22110014:
            case 22110024:
            case 22110025:
            case 80001939:
            case 22140014:
            case 22140023:
            case 22140015:
            case 22140024:
            case 22170066:
            case 22170065:
            case 22170094:
            case 22170067:
                return true;
        }
        return false;
    }

    public static boolean isAeroSwingSkill(final int skillID) {
        switch (skillID) {
            case 21110022:
            case 21110023:
            case 21110026:
                return true;
        }
        return false;
    }

    public static boolean isNightWalkerThrowingSkill(final int skillID) {
        switch (skillID) {
            case 0:
            case 14001020:
            case 14101020:
            case 14101021:
            case 14111005:
            case 14111020:
            case 14111021:
            case 14111022:
            case 14111023:
            case 14121001:
            case 14121002:
            case 14121003:
                return true;
        }
        return false;
    }

    public static int getTheSidTower(int i) {
        switch (i) {
            case 992001000:
                return 1;
            case 992002000:
                return 2;
            case 992003000:
                return 3;
            case 992004000:
                return 4;
            case 992005000:
                return 5;
            case 992006000:
                return 6;
            case 992007000:
                return 7;
            case 992008000:
                return 8;
            case 992009000:
                return 9;
            case 992010000:
                return 10;
            case 992011000:
                return 11;
            case 992012000:
                return 12;
            case 992013000:
                return 13;
            case 992014000:
                return 14;
            case 992015000:
                return 15;
            case 992016000:
                return 16;
            case 992017000:
                return 17;
            case 992018000:
                return 18;
            case 992019000:
                return 19;
            case 992020000:
                return 20;
            case 992021000:
                return 21;
            case 992022000:
                return 22;
            case 992023000:
                return 23;
            case 992024000:
                return 24;
            case 992025000:
                return 25;
            case 992026000:
                return 26;
            case 992027000:
                return 27;
            case 992028000:
                return 28;
            case 992029000:
                return 29;
            case 992030000:
                return 30;
            case 992031000:
                return 31;
            case 992032000:
                return 32;
            case 992033000:
                return 33;
            case 992034000:
                return 34;
            case 992035000:
                return 35;
            case 992036000:
                return 36;
            case 992037000:
                return 37;
            case 992038000:
                return 38;
            case 992039000:
                return 39;
            case 992040000:
                return 40;
            case 992041000:
                return 41;
            case 992042000:
                return 42;
            case 992043000:
                return 43;
            case 992044000:
                return 44;
            case 992045000:
                return 45;
            case 992046000:
                return 46;
            case 992047000:
                return 47;
            case 992048000:
                return 48;
            case 992049000:
                return 49;
            case 992050000:
                return 50;
        }
        return 0;
    }

    public static int getTheSidMap(int i) {
        switch (i) {
            case 1:
                return 992001000;
            case 2:
                return 992002000;
            case 3:
                return 992003000;
            case 4:
                return 992004000;
            case 5:
                return 992005000;
            case 6:
                return 992006000;
            case 7:
                return 992007000;
            case 8:
                return 992008000;
            case 9:
                return 992009000;
            case 10:
                return 992010000;
            case 11:
                return 992011000;
            case 12:
                return 992012000;
            case 13:
                return 992013000;
            case 14:
                return 992014000;
            case 15:
                return 992015000;
            case 16:
                return 992016000;
            case 17:
                return 992017000;
            case 18:
                return 992018000;
            case 19:
                return 992019000;
            case 20:
                return 992020000;
            case 21:
                return 992021000;
            case 22:
                return 992022000;
            case 23:
                return 992023000;
            case 24:
                return 992024000;
            case 25:
                return 992025000;
            case 26:
                return 992026000;
            case 27:
                return 992027000;
            case 28:
                return 992028000;
            case 29:
                return 992029000;
            case 30:
                return 992030000;
            case 31:
                return 992031000;
            case 32:
                return 992032000;
            case 33:
                return 992033000;
            case 34:
                return 992034000;
            case 35:
                return 992035000;
            case 36:
                return 992036000;
            case 37:
                return 992037000;
            case 38:
                return 992038000;
            case 39:
                return 992039000;
            case 40:
                return 992040000;
            case 41:
                return 992041000;
            case 42:
                return 992042000;
            case 43:
                return 992043000;
            case 44:
                return 992044000;
            case 45:
                return 992045000;
            case 46:
                return 992046000;
            case 47:
                return 992047000;
            case 48:
                return 992048000;
            case 49:
                return 992049000;
            case 50:
                return 992050000;
        }
        return 0;
    }

    public static String getTheSidName(String name) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM thesid WHERE name = ?");
            ps.setString(1, name);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                return rs.getString("name");
            }
            ps.close();
            rs.close();
            con.close();
        } catch (SQLException ex) {
            return null;
        }
        return null;
    }

    public static void setTheSid(int floor, int time, String name, MapleCharacter chr) {
        if (getTheSidName(chr.getName()) == null) {
            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = null;
                String query = "INSERT into `thesid` (`name`, `floor`, `time`, `gm`) VALUES ('";
                query = new StringBuilder().append(query).append(name).toString();
                query = new StringBuilder().append(query).append("', '").toString();
                query = new StringBuilder().append(query).append(floor).toString();
                query = new StringBuilder().append(query).append("', '").toString();
                query = new StringBuilder().append(query).append(time).toString();
                query = new StringBuilder().append(query).append("', '").toString();
                query = new StringBuilder().append(query).append(0).toString();
                query = new StringBuilder().append(query).append("')").toString();
                ps = con.prepareStatement(query);
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (SQLException ex) {

            }
        } else {
            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("UPDATE thesid SET floor = ?, time = ?, gm = ? WHERE name = ?");
                ps.setInt(1, floor);
                ps.setInt(2, time);
                ps.setInt(3, 0);
                ps.setString(4, name);
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (SQLException ex) {

            }
        }
        System.out.println(time);
    }

    public static int getTheSid(int type) throws SQLException {
        //type = 1 : 층수
        //type = 2 : 맵코드
        int b = 0;
        Connection con1 = MYSQL.getConnection();
        ResultSet con = con1.prepareStatement("SELECT * FROM thesid WHERE id = 0 ORDER BY number DESC LIMIT 1").executeQuery();
        while (con.next()) {
            if (type == 1) {
                b = con.getInt("number");
            } else if (type == 2) {
                b = con.getInt("mapid");
            }
        }
        con.close();
        return b;
    }

    public static int getTheSidMob(int i) {
        if (i == 50) {
            return 9309205;
        } else if (i == 40) {
            return 9309200;
        } else if (i == 30) {
            return 9309203;
        } else if (i == 20) {
            return 9309207;
        } else if (i == 10) {
            return 9309201;
        } else {
            return 0;
        }
    }

    public static boolean isPickUpAuto(int itemid) {
        switch (itemid) {
            case 2434537:
            case 2434538:
                return true;
        }
        return false;
    }
}
