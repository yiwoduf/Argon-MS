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
import constants.ServerConstants;
import java.io.IOException;
import java.util.concurrent.ScheduledFuture;
import launch.ChannelServer;
import launch.Start;
import launch.world.WorldBroadcasting;
import packet.creators.MainPacketCreator;
import tools.Timer.WorldTimer;

/**
 *
 * @author �����
 */
public class AutoReboot {

    private static String path = "";
    private static int time = 0;

    public static void main(final String args[]) {
        WorldTimer tMan = WorldTimer.getInstance();
        Runnable r = new Runnable() {
            public void run() {
                if (time == 0) {
                    System.out.println("[�˸�] �� �ð��η� 4�ð� �ֱ�� ������ �ڵ����� �������մϴ�.");
                    time++;
                } else if (time == -1) {
                    time = 0;
                } else {
                    WorldBroadcasting.broadcastMessage(MainPacketCreator.serverNotice(1, "�������� ������� ����, �� 1�а� ������������ ����˴ϴ�.\r\n������ ���ĵ�� �˼��մϴ�."));
                    try {
                        Thread.sleep(10000L);
                    } catch (Exception ex) {
                        ex.printStackTrace();
                    }
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) { //���� ������, �����ͺ��̽� ����.
                        cserv.saveAllMerchant();
                        for (MapleCharacter hp : cserv.getPlayerStorage().getAllCharacters().values()) {
                            if (hp != null) {
                                hp.saveToDB(false, false);
                            }
                        }
                    }
                    MedalRanking.getInstance().save();
                    for (ChannelServer cserv : ChannelServer.getAllInstances()) {
                        cserv.getPlayerStorage().disconnectAll();
                    }
                    runFile();
                    System.exit(1);
                }
            }
        };
        tMan.register(r, 14400000);
    }

    public static void runFile() {
        Runtime rt = Runtime.getRuntime();
        try {
            rt.exec(ServerConstants.path + "\\AutoReboot.exe");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
