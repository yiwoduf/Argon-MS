/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package handler.admin;

import launch.ChannelServer;
import org.apache.mina.common.ByteBuffer;
import packet.transfer.write.WritingPacket;

/**
 *
 * @author KSH
 */
public class AdminToolPacket {
    
    public static ByteBuffer Info() {
        String data = "";
        data += enp("Header", 0);
        data += enp("Exp", ChannelServer.getInstance(0).getExpRate());
        data += enp("Drop", ChannelServer.getInstance(0).getDropRate());
        data += enp("Meso", ChannelServer.getInstance(0).getMesoRate());
        data += enp("ServerTopMessage", ChannelServer.getInstance(0).getServerMessage());
        String OnlineCharacter = "";
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            for (String name : cserv.getPlayerStorage().getAllCharacters().keySet()) {
                OnlineCharacter += name + ", ";
            }
        }
        data += enp("OnlineCharacter", OnlineCharacter);
        WritingPacket packet = new WritingPacket();
        packet.writeAsciiString(Encrypt(data));
        return getPacket(packet.getPacket());
    }

    public static ByteBuffer Message(int type) {
        /*
        1 : 서버 정보를 업데이트 하였습니다.
        2 : 아이템 지급을 완료 하였습니다.
        3 : 후원 포인트 지급을 완료 하였습니다.
        4 : 메소 지급을 완료 하였습니다.
        5 : 모두 로그인 서버로 이동 하였습니다.
        6 : 해당 플레이어를 벤 하였습니다.
        7 : 모든 채팅을 얼렸습니다.
        8 : 모든 채팅을 녹였습니다.
        9 : 핫타임 지급을 완료 하였습니다.
        10 : 공지사항을 보냈습니다.
        11 : 해당 플레이어를 GM으로 설정 하였습니다.
        12 : 해당 플레이어를 찾을수 없습니다.
        13 : 해당 플레이어를 채팅 금지상태로 만들었습니다.
        14 : 해당 플레이어의 채팅 금지상태를 해제 하였습니다.
        15 : 해당 플레이어의 접속을 끊었습니다.
         */
        String data = "";
        data += enp("Header", 1);
        data += enp("Message", type);
        WritingPacket packet = new WritingPacket();
        packet.writeAsciiString(Encrypt(data));
        return getPacket(packet.getPacket());
    }
    
    public static ByteBuffer sendChatText(String txt) {
        String data = "";
        data += enp("Header", 2);
        data += enp("Message", txt);
        WritingPacket packet = new WritingPacket();
        packet.writeAsciiString(Encrypt(data));
        return getPacket(packet.getPacket());
    }

    private static String enp(final String data, final Object value) {
        return data + "=" + value + ";";
    }

    private static ByteBuffer getPacket(final byte[] packet) {
        return ByteBuffer.wrap(packet);
    }
    
    private static String Reverse(String s) {
        return new StringBuffer(s).reverse().toString();
    }

    private static String Encrypt(String strInput) {
        StringBuilder sb = new StringBuilder();
        String input = Reverse(strInput);

        for (char ch : input.toCharArray()) {
            sb.append((char) (ch + 4));
        }

        return sb.toString();
    }
}
