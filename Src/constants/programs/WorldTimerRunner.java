/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package constants.programs;

import client.MapleCharacter;
import launch.ChannelServer;

/**
 *
 * @author 에반테이르
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
