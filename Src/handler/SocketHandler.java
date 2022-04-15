/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handler;

import client.MapleClient;
import packet.transfer.read.ReadingMaple;

/**
 *
 * @author KSH
 */
public class SocketHandler {

    public static void handleClientExceptionInfo(ReadingMaple iPacket, MapleClient c) {
        String sFileName = iPacket.readMapleAsciiString();
        int nLine = iPacket.readInt();
        
        System.out.println("[ERROR] Client Exception : FILE " + sFileName + ", LINE " + nLine);
    }
}
