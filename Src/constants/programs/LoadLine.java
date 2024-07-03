/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package constants.programs;

import database.MYSQL;
import java.io.BufferedReader;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

/**
 *
 * @author 에반테이르
 */
public class LoadLine {
    public static void main(String[] args) {	
        System.out.println("RewardScroll 불러오는 중입니다.:::");
	// Gold Box
        try {
        FileReader fl = new FileReader("db.sql");
        BufferedReader br = new BufferedReader(fl);
        String[] readSplit = new String[2];
        String[] readSplit2 = new String[42];
        String readLine = null;
        FileOutputStream mhair = new FileOutputStream("db_.sql");
     //   mhair.write((br.toString().replaceAll("\\),", "\\),\r\n")).getBytes());
        int i = 46568;
        while ((readLine = br.readLine()) != null) {
            readSplit = readLine.split("\\(");
            readSplit2 = readSplit[1].split(",");
            mhair.write((readLine.replaceFirst(readSplit2[0], "" + i) + "\r\n").getBytes());
            i++;
       //     mhair.write((readLine.replaceAll("\\),", "\\),\r\n")).getBytes());
        }
        fl.close();
        br.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
