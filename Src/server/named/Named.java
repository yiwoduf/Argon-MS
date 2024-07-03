package server.named;

import client.MapleCharacter;
import constants.GameConstants;
import constants.ServerConstants;
import database.MYSQL;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.logging.Level;
import java.util.logging.Logger;
import launch.world.WorldBroadcasting;
import packet.creators.MainPacketCreator;
import tools.CurrentTime;
import tools.Timer.WorldTimer;

/**
 *
 * @author SEUNGHYEON
 */
public class Named {

    private static URL page;
    private static HttpURLConnection con;
    private static BufferedReader br;
    public static int nextTime = -1;
    public static String nextDate = "-";
    public static String namedTime = "-분 --초";

    public static void main(String args[]) throws IOException, InterruptedException {
        try {
            PreparedStatement ps;
            Connection con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM named");
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String day = rs.getString("date").split("-")[0];
                if (!day.equals(CurrentTime.getAllCurrentTime1(System.currentTimeMillis()))) {
                    ps = con.prepareStatement("DELETE FROM named WHERE id = ?");
                    ps.setInt(1, rs.getInt("id"));
                    ps.executeUpdate();
                }
            }
            ps.close();
            rs.close();
            con.close();
        } catch (SQLException ex) {
        }
        WorldTimer.getInstance().register(new NamedHandle(), 100);
    }

    public static class NamedHandle implements Runnable {

        public NamedHandle() throws MalformedURLException, IOException {
            page = new URL("http://ladder.named.com/data/json/ladder/result.json");
        }

        @Override
        public void run() {
            if (nextTime == -1) {
                try {
                    nextTime = Integer.parseInt(nextTimes(1));
                    nextDate = nextTimes(0);
                } catch (IOException ex) {
                    Logger.getLogger(Named.class.getName()).log(Level.SEVERE, null, ex);
                }
            }
            Date d = new Date();
            long baseTime = d.getTime();
            baseTime -= 10000;
            double pass_seconds = baseTime % (60 * 5 * 1000);
            double countdown_seconds = Math.ceil(((60 * 5 * 1000) - pass_seconds) / 1000);
            countdown_seconds = (countdown_seconds >= (60 * 5)) ? 0 : countdown_seconds;
            int countdown_ii = (int) Math.floor(countdown_seconds / 60);
            int countdown_ss = (int) countdown_seconds % 60;
            String countdown_clock = countdown_ii + "분 " + countdown_ss + "초";
            if (!namedTime.equals(countdown_clock)) {
                namedTime = countdown_clock;
            } else {
                return;
            }
            if (countdown_ii == 0 && countdown_ss == 0) {
                try {
                    String result = result();
                    String date = result.split("\"date\":\"")[1].split("\",")[0];
                    date = date.replaceAll("2016-", "");
                    date = date.split("-")[0] + "월" + date.split("-")[1] + "일";
                    String times = result.split("\"times\":\"")[1].split("\",")[0];
                    String start_point = result.split("\"start_point\":\"")[1].split("\",")[0];
                    String line_count = result.split("\"line_count\":\"")[1].split("\",")[0];
                    String odd_even = result.split("\"odd_even\":\"")[1].split("\"")[0];
                    WorldBroadcasting.broadcastMessage(MainPacketCreator.OnAddPopupSay(9000019, 3000, "#r" + times + "#k회차 네임드 홀,짝 결과는\r\n[#b" + getScoreString(start_point + " " + line_count + " " + odd_even) + "#k] 입니다.", ""));
                    WorldBroadcasting.broadcastMessage(MainPacketCreator.getGMText(30, "[메이플온라인 사다리알림] " + times + "회차 네임드 홀,짝 결과는 [" + getScoreString(start_point + " " + line_count + " " + odd_even) + "] 입니다."));
                    install_named(getScore(start_point + " " + line_count + " " + odd_even), date + "-" + times);
                    nextTime = Integer.parseInt(times) + 1;
                    nextDate = date;
                } catch (IOException ex) {
                    ex.printStackTrace();
                }
            }
        }
    }

    public static int getScore(String data) {
        if (data.equals("LEFT 4 ODD")) {//홀 좌4
            return 1;
        } else if (data.equals("RIGHT 3 ODD")) {// 홀 우3
            return 2;
        } else if (data.equals("LEFT 3 EVEN")) {// 짝 좌3
            return 3;
        } else if (data.equals("RIGHT 4 EVEN")) {// 짝 우4
            return 4;
        } else {
            return -1;
        }
    }

    public static String getScoreString(String data) {
        if (data.equals("LEFT 4 ODD")) {//홀 좌4
            return "좌4홀";
        } else if (data.equals("RIGHT 3 ODD")) {// 홀 우3
            return "우3홀";
        } else if (data.equals("LEFT 3 EVEN")) {// 짝 좌3
            return "좌3짝";
        } else if (data.equals("RIGHT 4 EVEN")) {// 짝 우4
            return "우4짝";
        } else {
            return "알수없음";
        }
    }

    private static String result() throws IOException {
        con = (HttpURLConnection) page.openConnection();
        con.setRequestMethod("GET");
        con.setRequestProperty("User-Agent", "Mozilla/5.0");
        br = new BufferedReader(new InputStreamReader(con.getInputStream(), "UTF-8"));
        String data = "";
        String temp_data = "";
        while ((data = br.readLine()) != null) {
            temp_data += data + "\n";
        }
        br.close();
        con.disconnect();
        return temp_data;
    }

    private static String nextTimes(int len) throws IOException {
        String result = result();
        String date = result.split("\"date\":\"")[1].split("\",")[0];
        date = date.replaceAll("2016-", "");
        date = date.split("-")[0] + "월" + date.split("-")[1] + "일";
        String times = result.split("\"times\":\"")[1].split("\",")[0];
        if (len == 0) {
            return date;
        } else {
            return String.valueOf(Integer.parseInt(times) + 1);
        }
    }

    public static void install_named(int score, String date) {
        try {
            Connection con = MYSQL.getConnection();
            String sql = "INSERT INTO `named`(`date`, `score`) VALUES (? ,?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setString(1, date);
            ps.setInt(2, score);
            ps.executeUpdate();
            ps.close();
            con.close();
            //     MYSQL.closeObject(con);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static void install_named_char(int cid, int itemid, int quantity, int meso, int score, String date) {
        try {
            Connection con = MYSQL.getConnection();
            String sql = "INSERT INTO `named_char`(`cid`, `itemid`, `quantity`, `meso`, `score`, `date`) VALUES (?, ?, ?, ?, ? ,?)";
            PreparedStatement ps = con.prepareStatement(sql);
            ps.setInt(1, cid);
            ps.setInt(2, itemid);
            ps.setInt(3, quantity);
            ps.setInt(4, meso);
            ps.setInt(5, score);
            ps.setString(6, date);
            ps.executeUpdate();
            ps.close();
            con.close();
            //     MYSQL.closeObject(con);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static boolean isCheck(int cid, String date) {
        boolean check = false;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM named_char WHERE cid = " + cid);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (!check) {
                    if (rs.getString("date").equals(date)) {
                        check = true;
                    }
                }
            }
            ps.close();
            rs.close();
            con.close();
            //     MYSQL.closeObject(con);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return check;
    }

    public static boolean isCheck_() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM named WHERE date = ?");
            ps.setString(1, nextDate + "-" + nextTime);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ps.close();
                rs.close();
                con.close();
                return true;
            }
            ps.close();
            rs.close();
            con.close();
            //  MYSQL.closeObject(con);
            return false;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return false;
    }

    public static boolean isCheck(int cid) {
        boolean check = false;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM named");
            ResultSet rs = ps.executeQuery();
            PreparedStatement ps1;
            ResultSet rs1;
            while (rs.next()) {
                if (!check) {
                    ps1 = con.prepareStatement("SELECT * FROM named_char WHERE cid = ? AND date = ?");
                    ps1.setInt(1, cid);
                    ps1.setString(2, rs.getString("date"));
                    rs1 = ps1.executeQuery();
                    if (rs1.next()) {
                        if (getScore(rs1.getInt("score"), rs.getInt("score"))) {
                            check = true;
                        }
                    }
                    ps1.close();
                    rs1.close();
                }
            }
            ps.close();
            rs.close();
            if (!check) {
                ps = con.prepareStatement("DELETE FROM named_char WHERE cid = " + cid);
                ps.executeUpdate();
                ps.close();
            }
            con.close();
            //    MYSQL.closeObject(con);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return check;
    }

    public static void onlineCheck(int cid, MapleCharacter chr) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM named");
            ResultSet rs = ps.executeQuery();
            PreparedStatement ps1;
            ResultSet rs1;
            boolean check = false;
            while (rs.next()) {
                if (!check) {
                    ps1 = con.prepareStatement("SELECT * FROM named_char WHERE cid = ? AND date = ?");
                    ps1.setInt(1, cid);
                    ps1.setString(2, rs.getString("date"));
                    rs1 = ps1.executeQuery();
                    if (rs1.next()) {
                        if (getScore(rs1.getInt("score"), rs.getInt("score"))) {
                            check = true;
                        }
                    }
                    ps1.close();
                    rs1.close();
                }
            }
            ps.close();
            rs.close();
            con.close();
            //        MYSQL.closeObject(con);
            if (check) {
                chr.dropMessage(5, "가위바위보 운영자 : 배팅 보상을 회수 해주시길 바랍니다.");
            }
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public static String getText(int cid) {
        String text = "";
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM named");
            ResultSet rs = ps.executeQuery();
            PreparedStatement ps1;
            ResultSet rs1;
            while (rs.next()) {
                ps1 = con.prepareStatement("SELECT * FROM named_char WHERE cid = ? AND date = ?");
                ps1.setInt(1, cid);
                ps1.setString(2, rs.getString("date"));
                rs1 = ps1.executeQuery();
                if (rs1.next()) {
                    if (getScore(rs1.getInt("score"), rs.getInt("score"))) {
                        text += "#L" + rs1.getInt("id") + "# #e" + rs1.getString("date") + "#n";
                        if (rs1.getInt("meso") > 0) {
                            text += " 메소 : " + rs1.getInt("meso");
                        } else {
                            text += "아이템 : #z" + rs1.getInt("itemid") + "# " + rs1.getInt("quantity") + "개";
                        }
                        text += "\r\n";
                    }
                }
                ps1.close();
                rs1.close();
            }
            ps.close();
            rs.close();
            con.close();
            //          MYSQL.closeObject(con);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return text;
    }

    /*
        홀 0
        짝 1
        좌출 2
        우출 3
        3줄 4
        4줄 5
        좌3 6
        우3 7
        좌4 8
        우4 9
        홀 좌4 1
        홀 우3 2
        짝 좌3 3
        짝 우4 4
     */
    public static boolean getScore(int score, int score2) {
        if (score == 0) {
            if (score2 == 1 || score2 == 2) {
                return true;
            }
        } else if (score == 1) {
            if (score2 == 3 || score2 == 4) {
                return true;
            }
        } else if (score == 2) {
            if (score2 == 1 || score2 == 3) {
                return true;
            }
        } else if (score == 3) {
            if (score2 == 2 || score2 == 4) {
                return true;
            }
        } else if (score == 4) {
            if (score2 == 2 || score2 == 3) {
                return true;
            }
        } else if (score == 5) {
            if (score2 == 1 || score2 == 4) {
                return true;
            }
        } else if (score == 6) {
            if (score2 == 3) {
                return true;
            }
        } else if (score == 7) {
            if (score2 == 2) {
                return true;
            }
        } else if (score == 8) {
            if (score2 == 1) {
                return true;
            }
        } else if (score == 9) {
            if (score2 == 4) {
                return true;
            }
        }
        return false;
    }

    public static boolean giveItemorMeso(int id, MapleCharacter chr) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM named_char WHERE id = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                if (rs.getInt("meso") > 0) {
                    chr.gainMeso(rs.getInt("meso"), false);
                } else if ((chr.getInventory(GameConstants.getInventoryType(rs.getInt("itemid"))).getNextFreeSlot() > -1)) {
                    chr.gainItem(rs.getInt("itemid"), (short) rs.getInt("quantity"));
                } else {
                    ps.close();
                    rs.close();
                    con.close();
                    return false;
                }
            }
            ps.close();
            rs.close();
            ps = con.prepareStatement("DELETE FROM named_char WHERE id = " + id);
            ps.executeUpdate();
            ps.close();
            con.close();
            //        MYSQL.closeObject(con);
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return true;
    }
}
