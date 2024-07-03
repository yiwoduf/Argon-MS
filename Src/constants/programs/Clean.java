/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package constants.programs;

import java.util.concurrent.ScheduledFuture;
import launch.world.WorldBroadcasting;
import packet.creators.MainPacketCreator;
import packet.creators.UIPacket;
import tools.CPUSampler;
import tools.DeadLockDetector;

/**
 *
 * @author Asteria
 */
public class Clean {
    private static transient ScheduledFuture<?> start;
    private static int timeo = 0;
    public static void main(String[] args) {
         if (start == null) {
            start = tools.Timer.WorldTimer.getInstance().register(new Runnable() {
                public void run() {
                    if (timeo == 0) {
                        CPUSampler.getInstance().start();
                        System.out.println("CPUSampler Thread Start!!");
                        DeadLockDetector clean = new DeadLockDetector(10,(byte)1);
                        clean.run();
                        timeo++;
                    } else if (timeo == -1) {
                        timeo = 0;
                    } else if (timeo != 0) {
                        CPUSampler.getInstance().start();
                        System.out.println("CPUSampler Thread Start!!");
                        DeadLockDetector clean = new DeadLockDetector(10,(byte)1);
                        clean.run();
                        WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(1, "서버최적화가 진행중입니다. 다소 렉이 유발될수도 있으니 양해 부탁드립니다."));
                        timeo++;
                    }
                }
            }, 3600000 * 3);
        }
    }
}
