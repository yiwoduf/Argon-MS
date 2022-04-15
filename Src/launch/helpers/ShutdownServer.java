/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package launch.helpers;

import java.sql.SQLException;

import database.MYSQL;
import launch.ChannelServer;
import launch.LoginServer;
import tools.Timer.WorldTimer;

public class ShutdownServer implements Runnable {

    private int channel;

    public ShutdownServer(int channel) {
	this.channel = channel;
    }

    @Override
    public void run() {
	try {
	    ChannelServer.getInstance(channel).shutdown();
	} catch (Throwable t) {
	    System.err.println("SHUTDOWN ERROR" + t);
	}

	System.out.println("[종료] 채널 " + channel + " 서버가 포트를 닫습니다.");
	

	boolean error = true;
	while (error) {
	    try {
		error = false;
	    } catch (Exception e) {
		error = true;
	    }
	}

	System.out.println("[종료] 채널 " + channel + " 서버를 종료중입니다.");

	for (ChannelServer cserv : ChannelServer.getAllInstances()) {
	    while (!cserv.hasFinishedShutdown()) {
		try {
		    Thread.sleep(1000);
		} catch (InterruptedException e) {
		    System.err.println("ERROR" + e);
		}
	    }
	}
        System.out.println("[종료] 채널 " + channel + " 서버가 종료되었습니다.");
    }
}
