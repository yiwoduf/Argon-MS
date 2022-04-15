package constants;

import client.MapleCharacter;
import database.MYSQL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 *
 * @author ?ดํ?ธ์??
 * @since 2018-01-15
 * @version 1
 * 
 **/

public class DailyQuest {
    public void QuestStart(MapleCharacter player, int id) {
        ResultSet rs = null;
        PreparedStatement ps = null;
        try {
            Connection con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM dailyquest WHERE charid = ? AND questid = ?");
            ps.setInt(1, player.getId());
            ps.setInt(2, id);
            rs = ps.executeQuery();
            if(rs.next()) {
                ps = con.prepareStatement("UPDATE dailyquest SET status = 1 WHERE charid = ? AND questid = ?");
                ps.setInt(1, player.getId());
                ps.setInt(2, id);
                ps.executeUpdate();
            } else {
                ps = con.prepareStatement("INSERT INTO dailyquest(charid, questid, status) VALUES(?, ?, ?)");
                ps.setInt(1, player.getId());
                ps.setInt(2, id);
                ps.setInt(3, 1);
                ps.executeUpdate();
            }
        } catch (SQLException ex) {
			
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException ignore) {
            }
        }
    }
    
    public int getQuestStatus(MapleCharacter player, int id) {
        ResultSet rs = null;
        PreparedStatement ps = null;
        int status = 0;
        try {
            Connection con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM dailyquest WHERE charid = ? AND questid = ?");
            ps.setInt(1, player.getId());
            ps.setInt(2, id);
            rs = ps.executeQuery();
            if(rs.next()) {
                status = rs.getInt("status");
            }
        } catch(SQLException ex) {

        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (SQLException ignore) {
            }
        }
        return status;
    }
    
    public void QuestClear(MapleCharacter player, int id) {
        PreparedStatement ps = null;
        try {
            Connection con = MYSQL.getConnection();
            ps = con.prepareStatement("UPDATE dailyquest SET status = 2, cleartime = ? WHERE charid = ? AND questid = ?");
            ps.setString(1, getCurrentTimeStamp());
            ps.setInt(2, player.getId());
            ps.setInt(3, id);
            ps.executeUpdate();
        } catch(SQLException ex) {

        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ignore) {
            }
        }
    }
    
    public void QuestReset(MapleCharacter player) {
        PreparedStatement ps = null;
        try {
            Connection con = MYSQL.getConnection();
            ps = con.prepareStatement("UPDATE dailyquest SET status = 0 WHERE charid = ? AND status = 2 AND cleartime != ?");
            ps.setInt(1, player.getId());
            ps.setString(2, getCurrentTimeStamp());
            ps.executeUpdate();
        } catch(SQLException ex) {

        } finally {
            try{
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException ignore) {
            }
        }
    }

    private String getCurrentTimeStamp() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
    }
}
