/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package constants.programs;

import client.MapleCharacter;
import launch.ChannelServer;

/**
 *
 * @author �������̸�
 */
public class WorldTimerRunner implements Runnable {
    
            
    @Override
    public void run() {
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            for (MapleCharacter hp : cserv.getPlayerStorage().getAllCharacters().values()) {
                Run(hp);
            }
        }
    }
    
    public static void Run(MapleCharacter player) {
        
        
    }
    
}
