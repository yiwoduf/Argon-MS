/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package tools;

import constants.ServerConstants;
import client.MapleCharacter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

/**
 *
 * @author 에반테이르
 */
public class LoggerChatting {
    
    public static String chatLog = "ChatLog.txt";
    
    public static void writeLog(String log, String text) {
        try {
            Calendar currentTime = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
       //     File file = new File("property/log/ChatLog.txt"+ log);
            FileWriter file = new FileWriter(new File("property/log/ChatLog.txt"), true);
            
            //FileOutputStream fos = new FileOutputStream(file, true);
            
            file.write(currentTime.getTime().toLocaleString() + " "+text+"");
            file.close();
        } catch (Exception e) {
            if (!ServerConstants.realese) e.printStackTrace();
        }
    }
    
    public static String getChatLogType(String type, MapleCharacter chr, String chattext) {
        return "["+type+"] "+chr.getName()+" : "+chattext + " 현재맵 : "+chr.getMap().getStreetName()+"-"+chr.getMap().getMapName()+" ("+chr.getMap().getId()+")\r\n";
    }
}
