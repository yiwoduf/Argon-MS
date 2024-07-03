/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package launch;

import client.MapleCharacter;
import client.skills.SkillStatEffectCancelHandler;
import constants.ServerConstants;
import constants.programs.HighRanking;
import constants.programs.RewardScroll;
import constants.subclasses.QuickMove;
import constants.subclasses.setScriptableNPC;
import database.MYSQL;
import handler.channel.AuctionHandler.WorldAuction;

import java.io.File;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.*;

import launch.helpers.MapleCacheData;
import launch.world.WorldBroadcasting;
import packet.chat.opcode.ChatRecvPacketOpcode;
import packet.creators.MainPacketCreator;
import packet.opcode.RecvPacketOpcode;
import packet.opcode.SendPacketOpcode;
import server.items.CashItemFactory;
import server.life.CharacterCardFactory;
import server.life.MapleMonsterProvider;
import server.maps.MapleMapObjectHandler;
import server.named.Named;
import tools.MemoryUsageWatcher;
import tools.RandomStream.Randomizer;
import constants.programs.ControlUnit;
import constants.programs.EquipRemover;
import constants.programs.GarbageDataBaseRemover;
import org.fusesource.jansi.Ansi;
import static org.fusesource.jansi.Ansi.ansi;
import org.fusesource.jansi.AnsiConsole;
import server.items.ItemInformation;
import server.life.MapleLifeProvider;
import server.life.MapleMonster;

public final class Start {

    public static long START = System.currentTimeMillis();

    public static void main(String args[]) throws IOException, InterruptedException {
        AnsiConsole.systemInstall();
        println("[ARGON] ARGON ONLINE :: V1.2." + ServerConstants.MAPLE_VERSION + "[" + ServerConstants.subVersion + "] sas been successfully started!\n", 34);
        System.out.println("[DEV] ARGON STORY :: #dev_chiussi :: project_global\n");
        MYSQL.init();
        /* 타이머 시작 */
        tools.Timer.WorldTimer.getInstance().start();
        tools.Timer.EtcTimer.getInstance().start();
        tools.Timer.MapTimer.getInstance().start();
        tools.Timer.CloneTimer.getInstance().start();
        tools.Timer.EventTimer.getInstance().start();
        tools.Timer.BuffTimer.getInstance().start();
        tools.Timer.PingTimer.getInstance().start();
        tools.Timer.ShowTimer.getInstance().start();

        /* EquipRemover 가동 / 치우씨 :: 에이플러스 시스템 사용 */
        EquipRemover.main(args);
        GarbageDataBaseRemover.main(args);

        /* 데이터베이스 정리 */
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement del = con.prepareStatement("DELETE FROM acceptip");
            del.executeUpdate();
            del.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }

        /* 소켓 설정 및 서버 가동 */
        LoginServer.getInstance().run_startup_configurations();
        ChannelServer.startServer();
        CashShopServer.getInstance().run_startup_configurations();
        BuddyChatServer.getInstance().run_startup_configurations();
        // AdminToolServer.run_startup_configurations(); // 치우씨 :: 이거 어차피 사용 안함

        /* 옵코드 설정 */
        SendPacketOpcode.loadOpcode();
        RecvPacketOpcode.loadOpcode();
        ChatRecvPacketOpcode.initalized();

        /* 메모리 정리 및 캐싱쓰레드 시작 */
        CashItemFactory.getInstance();
        Start.clean();
        MapleCacheData mc = new MapleCacheData();
        mc.startCacheData();
        HighRanking.getInstance().startTasking();
        WorldAuction.load();
        QuickMove.doMain();
        setScriptableNPC.doMain();
        RewardScroll.getInstance();
        MapleMonsterProvider.getInstance().retrieveGlobal();
        Rank1Character();
        Meso1Character();
        catchHair_Face();
        cRank1Character();
        autoRestartHiredMerchant.respawnMerchants();
        //MapleMonsterProvider.getInstance().FinalMaxHpMonster();
        //  MChat_Chr();
        tools.Timer.WorldTimer.getInstance().register(new SkillStatEffectCancelHandler(), 1000);
        AutoWarpMap();
        /* 서버 오픈 완료 메세지 */
        long END = System.currentTimeMillis();
        println("[SERVER OPENED] Server has been opened completely. Time took : " + (END - START) / 1000.0 + "Seconds", 33);
        //Named.main(args);
        //     MemoryUsageWatcher.main(args);
        if (ServerConstants.AutoHotTimeSystem) {
            println("[EVENT] Auto Hot time System started.", 32);
            switch (Calendar.getInstance().get(Calendar.DAY_OF_WEEK)) {
                case 1: {
                    for (int i = 0; i < ServerConstants.AutoHotTimeSundayItemCode.size(); i++) {
                        println("[EVENT] Between " + ServerConstants.AutoHotTimeSystemHour + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute & " + (ServerConstants.AutoHotTimeSystemHour - 12) + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute Item : " + ItemInformation.getInstance().getName(ServerConstants.AutoHotTimeSundayItemCode.get(i)) + " Will be given " + ServerConstants.AutoHotTimeSundayItemCount.get(i) + " of them.", 32);
                    }
                    break;
                }
                case 2: {
                    for (int i = 0; i < ServerConstants.AutoHotTimeMondayItemCode.size(); i++) {
                        println("[EVENT] Between " + ServerConstants.AutoHotTimeSystemHour + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute & " + (ServerConstants.AutoHotTimeSystemHour - 12) + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute Item : " + ItemInformation.getInstance().getName(ServerConstants.AutoHotTimeMondayItemCode.get(i)) + " Will be given " + ServerConstants.AutoHotTimeMondayItemCount.get(i) + " of them.", 32);
                    }
                    break;
                }
                case 3:
                    for (int i = 0; i < ServerConstants.AutoHotTimeTuesdayItemCode.size(); i++) {
                        println("[EVENT] Between " + ServerConstants.AutoHotTimeSystemHour + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute & " + (ServerConstants.AutoHotTimeSystemHour - 12) + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute Item : " + ItemInformation.getInstance().getName(ServerConstants.AutoHotTimeTuesdayItemCode.get(i)) + " Will be given " + ServerConstants.AutoHotTimeTuesdayItemCount.get(i) + " of them.", 32);
                    }
                    break;
                case 4:
                    for (int i = 0; i < ServerConstants.AutoHotTimeWednesdayItemCode.size(); i++) {
                        println("[EVENT] Between " + ServerConstants.AutoHotTimeSystemHour + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute & " + (ServerConstants.AutoHotTimeSystemHour - 12) + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute Item : " + ItemInformation.getInstance().getName(ServerConstants.AutoHotTimeWednesdayItemCode.get(i)) + " Will be given " + ServerConstants.AutoHotTimeWednesdayItemCount.get(i) + " of them.", 32);
                    }
                    break;
                case 5:
                    for (int i = 0; i < ServerConstants.AutoHotTimeThursdayItemCode.size(); i++) {
                        println("[EVENT] Between " + ServerConstants.AutoHotTimeSystemHour + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute & " + (ServerConstants.AutoHotTimeSystemHour - 12) + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute Item : " + ItemInformation.getInstance().getName(ServerConstants.AutoHotTimeThursdayItemCode.get(i)) + " Will be given " + ServerConstants.AutoHotTimeThursdayItemCount.get(i) + " of them.", 32);
                    }
                    break;
                case 6:
                    for (int i = 0; i < ServerConstants.AutoHotTimeFridayItemCode.size(); i++) {
                        println("[EVENT] Between " + ServerConstants.AutoHotTimeSystemHour + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute & " + (ServerConstants.AutoHotTimeSystemHour - 12) + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute Item : " + ItemInformation.getInstance().getName(ServerConstants.AutoHotTimeFridayItemCode.get(i)) + " Will be given " + ServerConstants.AutoHotTimeFridayItemCount.get(i) + " of them.", 32);
                    }
                    break;
                case 7:
                    for (int i = 0; i < ServerConstants.AutoHotTimeSaturdayItemCode.size(); i++) {
                        println("[EVENT] Between " + ServerConstants.AutoHotTimeSystemHour + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute & " + (ServerConstants.AutoHotTimeSystemHour - 12) + "Hour " + ServerConstants.AutoHotTimeSystemMinute + "Minute Item : " + ItemInformation.getInstance().getName(ServerConstants.AutoHotTimeSaturdayItemCode.get(i)) + " Will be given " + ServerConstants.AutoHotTimeSaturdayItemCount.get(i) + " of them.", 32);
                    }
                    break;
            }
        }
        CharacterCardFactory.getInstance().initialize();
        ControlUnit.main(args);
    }

    public static void clean() {
        try {
            int nu = 0;
            PreparedStatement ps;
            Calendar ocal = Calendar.getInstance();
            Connection con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM acheck WHERE day = 1");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String key = rs.getString("keya");
                String day = ocal.get(ocal.YEAR) + "" + (ocal.get(ocal.MONTH) + 1) + "" + ocal.get(ocal.DAY_OF_MONTH);
                String da[] = key.split("_");
                if (!da[0].equals(day)) {
                    ps = con.prepareStatement("DELETE FROM acheck WHERE keya = ?");
                    ps.setString(1, key);
                    ps.executeUpdate();
                    nu++;
                }
            }
            rs.close();
            ps.close();
            con.close();
            println("[ARGON] " + nu + " Daily Entrance Data Cleaned.", 34);
            ps.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static void Rank1Character() {
        try {
            Connection con = MYSQL.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM characters WHERE gm = 0 ORDER BY reborns DESC LIMIT 1")) {
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    ServerConstants.chr = MapleCharacter.loadCharFromDB(rs.getInt("id"), null, false);
                }
                rs.close();
                ps.close();
            }
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        println("[ARGON] Data for Ranker Character Display Board has been set.", 34);
    }

    public static void MChat_Chr() {
        try {
            Connection con = MYSQL.getConnection();
            ResultSet sql = con.prepareStatement("SELECT * FROM characters WHERE gm = 0 ORDER BY fame DESC LIMIT 2").executeQuery();
            while (sql.next()) {
                ServerConstants.mChat_char.add(MapleCharacter.loadCharFromDB(sql.getInt("id"), null, false));
            }
            sql.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static void Meso1Character() {
        try {
            Connection con = MYSQL.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM characters WHERE gm = 0 ORDER BY meso DESC LIMIT 1")) {
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    ServerConstants.mrank1 = rs.getString("name");
                }
                rs.close();
                ps.close();
            }
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        println("[ARGON] Top Meso Character has been identified.", 34);
    }

    public static void cRank1Character() {
        try {
            Connection con = MYSQL.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT id, recom, count(*) AS player FROM recom_log GROUP BY recom ORDER BY player DESC")) {
                ResultSet rs = ps.executeQuery();
                if (rs.next()) {
                    ServerConstants.crank1 = rs.getString("recom");
                }
                rs.close();
                ps.close();
            }
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        println("[ARGON] Top Recommender Character has been identified.", 34);
    }

    public static void AutoWarpMap() {
        try {
            int i = 0;
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM characters WHERE map = 120043000");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                ps = con.prepareStatement("UPDATE characters SET map = ? WHERE map = ?");
                ps.setInt(1, 100000000);
                ps.setInt(2, 120043000);
                ps.executeUpdate();
                i++;
            }
            con.close();
            ps.close();
            rs.close();
            println("[ARGON] " + i + "Characters Cleared from crashing maps", 34);
        } catch (SQLException e) {

        }
    }

    public static void catchHair_Face() {
        File Hair = new File("property/Wz/Character.wz/Hair");
        File Face = new File("property/Wz/Character.wz/Face");
        for (File file : Hair.listFiles()) {
            ServerConstants.real_face_hair += file.getName();
        }
        for (File file : Face.listFiles()) {
            ServerConstants.real_face_hair += file.getName();
        }
        println("[ARGON] Hair and Face Cashing has been completed.", 34);
    }

    public static final void println(final String text, final int color) {
        Ansi sec = ansi().a("\033[01;37m" + ("<" + Calendar.getInstance().get(Calendar.HOUR_OF_DAY) + ":" + Calendar.getInstance().get(Calendar.MINUTE) + ":" + Calendar.getInstance().get(Calendar.SECOND) + ">"));
        System.out.println(sec + "\033[01;" + color + "m" + " - " + text);
        sec.reset();
    }
}
