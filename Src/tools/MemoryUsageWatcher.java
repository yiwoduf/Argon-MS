/*
    김승현
 */
package tools;

import client.MapleCharacter;
import constants.ServerConstants;
import java.io.IOException;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryUsage;
import java.util.Calendar;
import java.util.TimeZone;
import launch.ChannelServer;
import launch.Start;
import launch.world.WorldBroadcasting;
import packet.creators.MainPacketCreator;
import packet.opcode.RecvPacketOpcode;
import packet.opcode.SendPacketOpcode;

public class MemoryUsageWatcher extends Thread {

    private long minRebootUsage;
    private static int maxOverflowCount = 200;
    private int overflowedCount = 0;
    private MemoryMXBean mmb = java.lang.management.ManagementFactory.getMemoryMXBean();
    private boolean a = false;

    public MemoryUsageWatcher(double rebootPercent) {
        super("MemoryUsageWatcher");
        MemoryUsage mem = mmb.getHeapMemoryUsage();
        minRebootUsage = (long) (mem.getMax() * rebootPercent);
    }

    @Override
    public void run() {
        boolean overflow = false;
        while (!overflow) {
            try {

                TimeZone zone = TimeZone.getTimeZone("Asia/Seoul");
                Calendar cal = Calendar.getInstance(zone);
                int H = cal.get(11);
                int M = cal.get(12);
                int S = cal.get(13);
                if (H >= 24) {
                    H -= 24;
                }
                AutoHotTimeItem(H, M, S, Calendar.getInstance().get(Calendar.DAY_OF_WEEK));
                MemoryUsage mem = mmb.getHeapMemoryUsage();
                System.out.println("Current Memory Usage : " + mem.getUsed() / 1024 + "K / Max : " + minRebootUsage / 1024 + "K");
                Thread.sleep(60000L);
            } catch (Exception e) {
            }
        }
    }

    public static void AutoHotTimeItem(int H, int M, int S, int day) {
        if (ServerConstants.AutoHotTimeSystem) {
            if (H == ServerConstants.AutoHotTimeSystemHour || H == ServerConstants.AutoHotTimeSystemHour - 12) {
                if (M == ServerConstants.AutoHotTimeSystemMinute) {
                    if (ServerConstants.AutoHotTimeSystemtemchacks) {
                        for (ChannelServer cs : ChannelServer.getAllInstances()) {
                            for (MapleCharacter chr : cs.getPlayerStorage().getAllCharacters().values()) {
                                switch (Calendar.getInstance().get(Calendar.DAY_OF_WEEK)) {
                                    case 1: {
                                        for (int i = 0; i < ServerConstants.AutoHotTimeSundayItemCode.size(); i++) {
                                            chr.gainItem(ServerConstants.AutoHotTimeSundayItemCode.get(i), ServerConstants.AutoHotTimeSundayItemCount.get(i), false, -1, null);
                                        }
                                        System.out.println("[ARGON] 총 " + cs.getPlayerStorage().getOnlinePlayers(false) + "명에게 아이템을 지급 하였습니다");
                                        break;
                                    }
                                    case 2: {
                                        for (int i = 0; i < ServerConstants.AutoHotTimeMondayItemCode.size(); i++) {
                                            chr.gainItem(ServerConstants.AutoHotTimeMondayItemCode.get(i), ServerConstants.AutoHotTimeMondayItemCount.get(i), false, -1, null);
                                        }
                                        System.out.println("[ARGON] 총 " + cs.getPlayerStorage().getOnlinePlayers(false) + "명에게 아이템을 지급 하였습니다");
                                        break;
                                    }
                                    case 3:
                                        for (int i = 0; i < ServerConstants.AutoHotTimeTuesdayItemCode.size(); i++) {
                                            chr.gainItem(ServerConstants.AutoHotTimeTuesdayItemCode.get(i), ServerConstants.AutoHotTimeTuesdayItemCount.get(i), false, -1, null);
                                        }
                                        System.out.println("[ARGON] 총 " + cs.getPlayerStorage().getOnlinePlayers(false) + "명에게 아이템을 지급 하였습니다");
                                        break;
                                    case 4:
                                        for (int i = 0; i < ServerConstants.AutoHotTimeWednesdayItemCode.size(); i++) {
                                            chr.gainItem(ServerConstants.AutoHotTimeWednesdayItemCode.get(i), ServerConstants.AutoHotTimeWednesdayItemCount.get(i), false, -1, null);
                                        }
                                        System.out.println("[ARGON] 총 " + cs.getPlayerStorage().getOnlinePlayers(false) + "명에게 아이템을 지급 하였습니다");
                                        break;
                                    case 5:
                                        for (int i = 0; i < ServerConstants.AutoHotTimeThursdayItemCode.size(); i++) {
                                            chr.gainItem(ServerConstants.AutoHotTimeThursdayItemCode.get(i), ServerConstants.AutoHotTimeThursdayItemCount.get(i), false, -1, null);
                                        }
                                        System.out.println("[ARGON] 총 " + cs.getPlayerStorage().getOnlinePlayers(false) + "명에게 아이템을 지급 하였습니다");
                                        break;
                                    case 6:
                                        for (int i = 0; i < ServerConstants.AutoHotTimeFridayItemCode.size(); i++) {
                                            chr.gainItem(ServerConstants.AutoHotTimeFridayItemCode.get(i), ServerConstants.AutoHotTimeFridayItemCount.get(i), false, -1, null);
                                        }
                                        System.out.println("[ARGON] 총 " + cs.getPlayerStorage().getOnlinePlayers(false) + "명에게 아이템을 지급 하였습니다");
                                        break;
                                    case 7:
                                        for (int i = 0; i < ServerConstants.AutoHotTimeSaturdayItemCode.size(); i++) {
                                            chr.gainItem(ServerConstants.AutoHotTimeSaturdayItemCode.get(i), ServerConstants.AutoHotTimeSaturdayItemCount.get(i), false, -1, null);
                                        }
                                        System.out.println("[ARGON] 총 " + cs.getPlayerStorage().getOnlinePlayers(false) + "명에게 아이템을 지급 하였습니다");
                                        break;
                                }
                                WorldBroadcasting.broadcastMessage(MainPacketCreator.serverNotice(1, "[오토 핫타임] 핫타임 아이템을 지급 받으셧습니다."));
                                ServerConstants.AutoHotTimeSystemtemchacks = false;
                            }
                        }
                    }
                } else if (M != ServerConstants.AutoHotTimeSystemMinute) {
                    ServerConstants.AutoHotTimeSystemtemchacks = true;
                }
            }
        }
    }

    public static void main(String[] args) {
        new MemoryUsageWatcher(5).start();
    }
}
