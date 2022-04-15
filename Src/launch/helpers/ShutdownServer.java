/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
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

	System.out.println("[����] ä�� " + channel + " ������ ��Ʈ�� �ݽ��ϴ�.");
	

	boolean error = true;
	while (error) {
	    try {
		error = false;
	    } catch (Exception e) {
		error = true;
	    }
	}

	System.out.println("[����] ä�� " + channel + " ������ �������Դϴ�.");

	for (ChannelServer cserv : ChannelServer.getAllInstances()) {
	    while (!cserv.hasFinishedShutdown()) {
		try {
		    Thread.sleep(1000);
		} catch (InterruptedException e) {
		    System.err.println("ERROR" + e);
		}
	    }
	}
        System.out.println("[����] ä�� " + channel + " ������ ����Ǿ����ϴ�.");
    }
}