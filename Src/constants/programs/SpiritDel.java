/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package constants.programs;

import database.MYSQL;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

/**
 *
 * @author ±è½ÂÇö
 */
public class SpiritDel {
    public static void main(String args[]) {
        try {
          Connection con = MYSQL.getConnection();
          ResultSet sql = con.prepareStatement("SELECT * FROM accounts").executeQuery();
          PreparedStatement ps = con.prepareStatement("DELETE FROM accounts WHERE id = ?");
            while(sql.next()) {
                if (!CheckChar(con, sql.getInt("id"))) {
                    ps.setInt(1, sql.getInt("id"));
                    ps.executeUpdate();
                    System.out.println(sql.getString("name") + "°èÁ¤ »èÁ¦");
                }
            }
            ps.close();
            sql.close();
            con.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
    
    public static boolean CheckChar(Connection con, int i) {
        try {
          ResultSet sql = con.prepareStatement("SELECT * FROM characters WHERE accountid =" + i).executeQuery();
            if (sql.next()) {
               return true; 
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return false;
    }
}
