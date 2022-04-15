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
import client.MapleClient;
import java.io.FileInputStream;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import packet.creators.MainPacketCreator;

public class ServerConstants {


    /* 서버 설정 */
    public static String Host;
    public static int startMap;
    public static int mainMap; // 치우씨 :: 광장 따로 추가
    public static byte defaultFlag;
    public static int serverCount;
    public static int LoginPort;
    public static int ChannelPort;
    public static int CashShopPort;
    public static int BuddyChatPort;

    public static boolean isLocal = false;
    public static int AHT_VERSION = 0;
    public static long SKILL_FILE_CRC = 1459447157; // skill.wz crc32

    public static byte[] testPacket = null;

    public static int defaultExpRate;
    public static int defaultMesoRate;
    public static int defaultDropRate;
    public static int defaultCashRate;
    public static int defaultBossCashRate;
    public static int maxDrop;
    public static int bossMaxDrop;

    public static String mrank1 = null;
    public static String crank1 = null;

    public static int defaultMaxChannelLoad = 50;
    public static int cshopNpc = 0;
    public static int chatlimit = 0;

    /* DB 설정 */
    public static int dbPort;
    public static String dbHost;
    public static String dbUser;
    public static String dbPassword;

    /* Message 설정 및 이벤트 설정*/
    public static String recommendMessage = "";
    public static String serverName = "";
    public static String serverMessage = "";
    public static String serverWelcome = "";
    public static String eventMessage = "";
    public static String serverHint = "DEBUG SEND HINT";
    public static String beginner = "";
    public static String serverNotice = "";
    public static String serverNotititle = "";
    public static String serverNotification = "";
    public static String events = "";
    public static String real_face_hair = "";
    public static String serverCheckMessage = "현재 " + serverName + " 서버 점검 중입니다.\r\n 자세한 내용은 홈페이지를 참고하여 주십시오.\r\n [사유 : 시스템 안정화]";

    /* 개발 설정 */
    public static boolean serverCheck;

    /* 기타 설정 */
    public static boolean UnlockMaxDamage = true;
    public static boolean feverTime = false;
    public static boolean useMaxDrop;
    public static boolean useBossMaxDrop;
    public static boolean showPackets = true;
    public static boolean sendPacketShow = false;
    public static boolean recvPacketShow = false;
    public static boolean realese = false;
    public static String path = "";
    public static String windowsDumpPath = "";

    /* 버전 설정 */
    public static short MAPLE_VERSION;
    public static byte subVersion;
    public static final byte check = 1;

    /* 기타 설정 2 */
    public static String hp_skillid_dummy = "";
    public static String hp_skillid_real[];

    public static MapleCharacter chr;

    public static List<MapleCharacter> mChat_char = new ArrayList<>();

    public static boolean isShutdown = false;
    public static boolean isMarri = false;

    public static boolean AutoHotTimeSystem;
    public static boolean AutoHotTimeSystemtemchacks = false;

    public static int AutoHotTimeSystemHour = 0;
    public static int AutoHotTimeSystemMinute = 0;
    public static int AutoHotTimeSystemSecond = 0;

    public static List<Integer> AutoHotTimeSundayItemCode = new ArrayList<Integer>();
    public static List<Integer> AutoHotTimeMondayItemCode = new ArrayList<Integer>();
    public static List<Integer> AutoHotTimeTuesdayItemCode = new ArrayList<Integer>();
    public static List<Integer> AutoHotTimeWednesdayItemCode = new ArrayList<Integer>();
    public static List<Integer> AutoHotTimeThursdayItemCode = new ArrayList<Integer>();
    public static List<Integer> AutoHotTimeFridayItemCode = new ArrayList<Integer>();
    public static List<Integer> AutoHotTimeSaturdayItemCode = new ArrayList<Integer>();

    public static List<Short> AutoHotTimeSundayItemCount = new ArrayList<Short>();
    public static List<Short> AutoHotTimeMondayItemCount = new ArrayList<Short>();
    public static List<Short> AutoHotTimeTuesdayItemCount = new ArrayList<Short>();
    public static List<Short> AutoHotTimeWednesdayItemCount = new ArrayList<Short>();
    public static List<Short> AutoHotTimeThursdayItemCount = new ArrayList<Short>();
    public static List<Short> AutoHotTimeFridayItemCount = new ArrayList<Short>();
    public static List<Short> AutoHotTimeSaturdayItemCount = new ArrayList<Short>();

    static {
        try {
            FileInputStream setting = new FileInputStream("property/Setting/ServerSettings.properties");
            Properties setting_ = new Properties();
            setting_.load(setting);
            setting.close();
            defaultFlag = Byte.parseByte(setting_.getProperty(toUni("Flag")));
            Host = new String(setting_.getProperty(toUni("아이피")).getBytes("ISO-8859-1"), "euc-kr");
            if (!Host.isEmpty()) {
                String v1 = Host.replace('.', '@');
                String[] split = v1.split("@");
                MainPacketCreator.Host = new byte[]{(byte) Integer.parseInt(split[0]), (byte) Integer.parseInt(split[1]), (byte) Integer.parseInt(split[2]), (byte) Integer.parseInt(split[3])};
            }
            serverCount = Integer.parseInt(setting_.getProperty(toUni("서버개수")));
            LoginPort = Integer.parseInt(setting_.getProperty(toUni("로그인포트")));
            ChannelPort = Integer.parseInt(setting_.getProperty(toUni("채널포트")));
            CashShopPort = Integer.parseInt(setting_.getProperty(toUni("캐시샵포트")));
            BuddyChatPort = Integer.parseInt(setting_.getProperty(toUni("친구서버포트")));

            defaultExpRate = Integer.parseInt(setting_.getProperty(toUni("경험치배율")));
            defaultDropRate = Integer.parseInt(setting_.getProperty(toUni("드롭배율")));
            defaultMesoRate = Integer.parseInt(setting_.getProperty(toUni("메소배율")));
            defaultCashRate = Integer.parseInt(setting_.getProperty(toUni("캐시배율")));
            defaultBossCashRate = Integer.parseInt(setting_.getProperty(toUni("보스캐시배율")));

            cshopNpc = Integer.parseInt(setting_.getProperty(toUni("캐시샵NPC")));

            serverName = new String(setting_.getProperty(toUni("서버이름")).getBytes("ISO-8859-1"), "euc-kr");
            serverMessage = new String(setting_.getProperty(toUni("서버메세지")).getBytes("ISO-8859-1"), "euc-kr");
            serverWelcome = new String(setting_.getProperty(toUni("서버환영메세지")).getBytes("ISO-8859-1"), "euc-kr");
            eventMessage = new String(setting_.getProperty(toUni("이벤트메세지")).getBytes("ISO-8859-1"), "euc-kr");
            beginner = new String(setting_.getProperty(toUni("처음시작공지")).getBytes("ISO-8859-1"), "euc-kr");
            serverNotititle = new String(setting_.getProperty(toUni("서버공지제목")).getBytes("ISO-8859-1"), "euc-kr");
            serverNotification = new String(setting_.getProperty(toUni("서버공지내용")).getBytes("ISO-8859-1"), "euc-kr");
            recommendMessage = new String(setting_.getProperty(toUni("추천메세지")).getBytes("ISO-8859-1"), "euc-kr");
            serverHint = new String(setting_.getProperty(toUni("서버힌트")).getBytes("ISO-8859-1"), "euc-kr");

            dbHost = new String(setting_.getProperty(toUni("Arc.dbHost")).getBytes("ISO-8859-1"), "euc-kr");
            dbPort = Integer.parseInt(setting_.getProperty(toUni("Arc.dbPort")));
            dbUser = new String(setting_.getProperty(toUni("Arc.dbUser")).getBytes("ISO-8859-1"), "euc-kr");
            dbPassword = new String(setting_.getProperty(toUni("Arc.dbPassword")).getBytes("ISO-8859-1"), "euc-kr");

            events = new String(setting_.getProperty(toUni("이벤트")).getBytes("ISO-8859-1"), "euc-kr");

            startMap = Integer.parseInt(setting_.getProperty(toUni("시작맵")));
            mainMap = Integer.parseInt(setting_.getProperty(toUni("마을맵")));
            serverHint = new String(setting_.getProperty(toUni("서버힌트")).getBytes("ISO-8859-1"), "euc-kr");

            MAPLE_VERSION = Short.parseShort(setting_.getProperty(toUni("클라이언트버전")));
            subVersion = Byte.parseByte(setting_.getProperty(toUni("마이너버전")));

            path = new String(setting_.getProperty(toUni("옵션경로지정")).getBytes("ISO-8859-1"), "euc-kr");
            windowsDumpPath = new String(setting_.getProperty(toUni("덤프경로지정")).getBytes("ISO-8859-1"), "euc-kr");

            serverCheck = Boolean.parseBoolean(setting_.getProperty(toUni("서버점검")));
            showPackets = Boolean.parseBoolean(setting_.getProperty(toUni("패킷출력")));
            useMaxDrop = Boolean.parseBoolean(setting_.getProperty(toUni("최대드랍사용")));
            useBossMaxDrop = Boolean.parseBoolean(setting_.getProperty(toUni("최대보스드랍사용")));
            AutoHotTimeSystem = Boolean.parseBoolean(setting_.getProperty(toUni("자동핫타임사용")));

            bossMaxDrop = Integer.parseInt(setting_.getProperty(toUni("최대보스드랍아이템개수")));
            maxDrop = Integer.parseInt(setting_.getProperty(toUni("최대드랍아이템개수")));

            AutoHotTimeSystemHour = Integer.parseInt(setting_.getProperty(toUni("자동핫타임시간")));
            AutoHotTimeSystemMinute = Integer.parseInt(setting_.getProperty(toUni("자동핫타임분")));
            AutoHotTimeSystemSecond = Integer.parseInt(setting_.getProperty(toUni("자동핫타임초")));

            String AutoHotTimeSundayItemCodes = setting_.getProperty(toUni("일요일핫타임아이템"));
            if (!AutoHotTimeSundayItemCodes.isEmpty()) {
                String AutoHotTimeSundayItemCodess[] = AutoHotTimeSundayItemCodes.split(",");
                for (int i = 0; i < AutoHotTimeSundayItemCodess.length; i++) {
                    AutoHotTimeSundayItemCode.add(Integer.parseInt(AutoHotTimeSundayItemCodess[i]));
                }
            }

            String AutoHotTimeMondayItemCodes = setting_.getProperty(toUni("월요일핫타임아이템"));
            if (!AutoHotTimeMondayItemCodes.isEmpty()) {
                String AutoHotTimeMondayItemCodess[] = AutoHotTimeMondayItemCodes.split(",");
                for (int i = 0; i < AutoHotTimeMondayItemCodess.length; i++) {
                    AutoHotTimeMondayItemCode.add(Integer.parseInt(AutoHotTimeMondayItemCodess[i]));
                }
            }

            String AutoHotTimeTuesdayItemCodes = setting_.getProperty(toUni("화요일핫타임아이템"));
            if (!AutoHotTimeTuesdayItemCodes.isEmpty()) {
                String AutoHotTimeTuesdayItemCodess[] = AutoHotTimeTuesdayItemCodes.split(",");
                for (int i = 0; i < AutoHotTimeTuesdayItemCodess.length; i++) {
                    AutoHotTimeTuesdayItemCode.add(Integer.parseInt(AutoHotTimeTuesdayItemCodess[i]));
                }
            }

            String AutoHotTimeWednesdayItemCodes = setting_.getProperty(toUni("수요일핫타임아이템"));
            if (!AutoHotTimeWednesdayItemCodes.isEmpty()) {
                String AutoHotTimeWednesdayItemCodess[] = AutoHotTimeWednesdayItemCodes.split(",");
                for (int i = 0; i < AutoHotTimeWednesdayItemCodess.length; i++) {
                    AutoHotTimeWednesdayItemCode.add(Integer.parseInt(AutoHotTimeWednesdayItemCodess[i]));
                }
            }

            String AutoHotTimeThursdayItemCodes = setting_.getProperty(toUni("목요일핫타임아이템"));
            if (!AutoHotTimeThursdayItemCodes.isEmpty()) {
                String AutoHotTimeThursdayItemCodess[] = AutoHotTimeThursdayItemCodes.split(",");
                for (int i = 0; i < AutoHotTimeThursdayItemCodess.length; i++) {
                    AutoHotTimeThursdayItemCode.add(Integer.parseInt(AutoHotTimeThursdayItemCodess[i]));
                }
            }

            String AutoHotTimeFridayItemCodes = setting_.getProperty(toUni("금요일핫타임아이템"));
            if (!AutoHotTimeFridayItemCodes.isEmpty()) {
                String AutoHotTimeFridayItemCodess[] = AutoHotTimeFridayItemCodes.split(",");
                for (int i = 0; i < AutoHotTimeFridayItemCodess.length; i++) {
                    AutoHotTimeFridayItemCode.add(Integer.parseInt(AutoHotTimeFridayItemCodess[i]));
                }
            }

            String AutoHotTimeSaturdayItemCodes = setting_.getProperty(toUni("토요일핫타임아이템"));
            if (!AutoHotTimeSaturdayItemCodes.isEmpty()) {
                String AutoHotTimeSaturdayItemCodess[] = AutoHotTimeSaturdayItemCodes.split(",");
                for (int i = 0; i < AutoHotTimeSaturdayItemCodess.length; i++) {
                    AutoHotTimeSaturdayItemCode.add(Integer.parseInt(AutoHotTimeSaturdayItemCodess[i]));
                }
            }
            String AutoHotTimeSundayItemCounts = setting_.getProperty(toUni("일요일핫타임아이템갯수"));
            if (!AutoHotTimeSundayItemCounts.isEmpty()) {
                String AutoHotTimeSundayItemCountss[] = AutoHotTimeSundayItemCounts.split(",");
                for (int i = 0; i < AutoHotTimeSundayItemCountss.length; i++) {
                    AutoHotTimeSundayItemCount.add(Short.parseShort(AutoHotTimeSundayItemCountss[i]));
                }
            }

            String AutoHotTimeMondayItemCounts = setting_.getProperty(toUni("월요일핫타임아이템갯수"));
            if (!AutoHotTimeMondayItemCounts.isEmpty()) {
                String AutoHotTimeMondayItemCountss[] = AutoHotTimeMondayItemCounts.split(",");
                for (int i = 0; i < AutoHotTimeMondayItemCountss.length; i++) {
                    AutoHotTimeMondayItemCount.add(Short.parseShort(AutoHotTimeMondayItemCountss[i]));
                }
            }

            String AutoHotTimeTuesdayItemCounts = setting_.getProperty(toUni("화요일핫타임아이템갯수"));
            if (!AutoHotTimeTuesdayItemCounts.isEmpty()) {
                String AutoHotTimeTuesdayItemCountss[] = AutoHotTimeTuesdayItemCounts.split(",");
                for (int i = 0; i < AutoHotTimeTuesdayItemCountss.length; i++) {
                    AutoHotTimeTuesdayItemCount.add(Short.parseShort(AutoHotTimeTuesdayItemCountss[i]));
                }
            }

            String AutoHotTimeWednesdayItemCounts = setting_.getProperty(toUni("수요일핫타임아이템갯수"));
            if (!AutoHotTimeWednesdayItemCounts.isEmpty()) {
                String AutoHotTimeWednesdayItemCountss[] = AutoHotTimeWednesdayItemCounts.split(",");
                for (int i = 0; i < AutoHotTimeWednesdayItemCountss.length; i++) {
                    AutoHotTimeWednesdayItemCount.add(Short.parseShort(AutoHotTimeWednesdayItemCountss[i]));
                }
            }

            String AutoHotTimeThursdayItemCounts = setting_.getProperty(toUni("목요일핫타임아이템갯수"));
            if (!AutoHotTimeThursdayItemCounts.isEmpty()) {
                String AutoHotTimeThursdayItemCountss[] = AutoHotTimeThursdayItemCounts.split(",");
                for (int i = 0; i < AutoHotTimeThursdayItemCountss.length; i++) {
                    AutoHotTimeThursdayItemCount.add(Short.parseShort(AutoHotTimeThursdayItemCountss[i]));
                }
            }

            String AutoHotTimeFridayItemCounts = setting_.getProperty(toUni("금요일핫타임아이템갯수"));
            if (!AutoHotTimeFridayItemCounts.isEmpty()) {
                String AutoHotTimeFridayItemCountss[] = AutoHotTimeFridayItemCounts.split(",");
                for (int i = 0; i < AutoHotTimeFridayItemCountss.length; i++) {
                    AutoHotTimeFridayItemCount.add(Short.parseShort(AutoHotTimeFridayItemCountss[i]));
                }
            }

            String AutoHotTimeSaturdayItemCounts = setting_.getProperty(toUni("토요일핫타임아이템갯수"));
            if (!AutoHotTimeSaturdayItemCounts.isEmpty()) {
                String AutoHotTimeSaturdayItemCountss[] = AutoHotTimeSaturdayItemCounts.split(",");
                for (int i = 0; i < AutoHotTimeSaturdayItemCountss.length; i++) {
                    AutoHotTimeSaturdayItemCount.add(Short.parseShort(AutoHotTimeSaturdayItemCountss[i]));
                }
            }
        } catch (Exception e) {
            System.err.println("[오류] 서버 세팅파일을 불러오는데 실패하였습니다.");
            if (!realese) {
                e.printStackTrace();
            }
        }
    }

    public static int basePorts = (isLocal ? 100 : 0) + (ChannelPort);

    protected static String toUni(String kor)
            throws UnsupportedEncodingException {
        return new String(kor.getBytes("KSC5601"), "8859_1");
    }

    public static String getServerHost(MapleClient ha) {
        try {
            return InetAddress.getByName(ServerConstants.Host).getHostAddress().replace("/", "");
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
        return ServerConstants.Host;
    }
}
