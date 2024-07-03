/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package tools;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Locale;
import java.util.TimeZone;

/**
 *
 * @author 에반테이르
 */
public class CurrentTime {

    public static String getCurrentTime() {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("HH:mm:ss");
        String time = simpleTimeFormat.format(calz.getTime());
//        if (calz.getTime().getHours() >= 12) {
//            time = "오후 "+time;
//        } else {
//            time = "오전 "+time;
//        }
        return time;
    }

    public static String getAllCurrentTime1(long times) {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("MM월dd일");
        String time = simpleTimeFormat.format(times);
//        if (calz.getTime().getHours() >= 12) {
//            time = "오후 "+time;
//        } else {
//            time = "오전 "+time;
//        }
        return time;
    }

    public static String getAllCurrentTime() {
        Calendar calz = Calendar.getInstance(TimeZone.getTimeZone("KST"), Locale.KOREAN);
        SimpleDateFormat simpleTimeFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm:ss");
        String time = simpleTimeFormat.format(calz.getTime());
//        if (calz.getTime().getHours() >= 12) {
//            time = "오후 "+time;
//        } else {
//            time = "오전 "+time;
//        }
        return time;
    }

    public static int getLeftTimeFromMinute(int minute) {
        Calendar d = Calendar.getInstance(TimeZone.getTimeZone("KST"));
        int min = d.get(Calendar.MINUTE), sec = d.get(Calendar.SECOND);
        int secs = (min * 60) + sec;
        int leftsecs = (minute * 60) - (secs % (minute * 60));
        return leftsecs;
    }
}
