/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package handler.channel;

import client.MapleClient;
import java.util.ArrayList;
import java.util.List;
import packet.transfer.read.ReadingMaple;

public class AntiHackHandler {
    
    public static final void ProcessCheck(final ReadingMaple rh, final MapleClient c) {
        final int processCount = rh.readInt();
        rh.skip(1);
        final List<String> processInfos = new ArrayList<>();
        for (int i = 0; i < processCount; i++) {
            String path = rh.readMapleAsciiString();
            String a = rh.readMapleAsciiString();
            String b = rh.readMapleAsciiString();
            String hash = rh.readMapleAsciiString();
            String d = rh.readMapleAsciiString();
            String check = path + " " + a + " " + b + " " + hash + " " + d;
            processInfos.add(check);
        }
        for (String str : processInfos) {
            if (str.contains("engine.exe") || str.contains("eng1ne.exe")) {
                c.disconnect(true, (c.getLoginState() == 4 || c.getLoginState() == 5));
                c.getSession().close();
                c.getSession().close();
            }           
        }
    }
}   
