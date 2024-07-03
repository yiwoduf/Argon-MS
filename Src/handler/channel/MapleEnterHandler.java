/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package handler.channel;

import constants.ServerConstants;

/**
 *
 * @author 4차원
 */
public class MapleEnterHandler {
    public static String PlayerHost = "192.168.194.2";
    public static void run() {
        try { 
            String Machine = java.net.InetAddress.getLocalHost().getHostAddress();
            if (Machine == null ? PlayerHost == null : Machine.equals(PlayerHost)) {
                if (Machine == null ? ServerConstants.Host == null : Machine.equals(ServerConstants.Host)) {
                    System.out.println("[ARGON] 구동기가 정상적으로 실행되었습니다.");
                } else {
                    if (Machine.contains("192.") && ServerConstants.Host.contains("5.")) {
                        System.out.println("[ARGON] 구동기가 정상적으로 실행되었습니다.");
                    } else {
                        System.exit(1);
                    }
                }
            } else {
                System.exit(1);
            }
        } catch (java.net.UnknownHostException error) {
            System.exit(1);
        }
    }
}
