/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package launch.helpers;

import client.MapleClient;
import handler.login.CharLoginHandler;
import packet.creators.LoginPacket;
import tools.Pair;
import tools.Timer.PingTimer;
import tools.Timer.WorldTimer;
import java.util.LinkedList;
import java.util.List;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class MapleLoginWorker {

    private static Runnable persister;
    private static final List<Pair<Integer, String>> IPLog = new LinkedList<Pair<Integer, String>>();
    private static final Lock mutex = new ReentrantLock();

    protected MapleLoginWorker() {
	//WorldTimer.getInstance().register(persister, 1800000L);
    }

    public static void registerClient(final MapleClient c) {
	if (c.finishLogin() == 0) {
            c.getSession().writeAndFlush(LoginPacket.getAuthSuccessRequest(c));
            /* Display Channel 원일화. */
            CharLoginHandler.getDisplayChannel(true, c);
            c.setIdleTask(PingTimer.getInstance().schedule(new Runnable() {
                public void run() {
                    c.getSession().close();
                }
            }, 10 * 60 * 10000));
        } else {
	    c.getSession().writeAndFlush(LoginPacket.getLoginFailed(7));
	    return;
	}
	mutex.lock();
	try {
	    IPLog.add(new Pair<Integer, String>(c.getAccID(), c.getIp()));
	} finally {
	    mutex.unlock();
	}
    }
}
