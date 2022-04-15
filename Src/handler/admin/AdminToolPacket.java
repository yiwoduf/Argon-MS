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
        1 : ���� ������ ������Ʈ �Ͽ����ϴ�.
        2 : ������ ������ �Ϸ� �Ͽ����ϴ�.
        3 : �Ŀ� ����Ʈ ������ �Ϸ� �Ͽ����ϴ�.
        4 : �޼� ������ �Ϸ� �Ͽ����ϴ�.
        5 : ��� �α��� ������ �̵� �Ͽ����ϴ�.
        6 : �ش� �÷��̾ �� �Ͽ����ϴ�.
        7 : ��� ä���� ��Ƚ��ϴ�.
        8 : ��� ä���� �쿴���ϴ�.
        9 : ��Ÿ�� ������ �Ϸ� �Ͽ����ϴ�.
        10 : ���������� ���½��ϴ�.
        11 : �ش� �÷��̾ GM���� ���� �Ͽ����ϴ�.
        12 : �ش� �÷��̾ ã���� �����ϴ�.
        13 : �ش� �÷��̾ ä�� �������·� ��������ϴ�.
        14 : �ش� �÷��̾��� ä�� �������¸� ���� �Ͽ����ϴ�.
        15 : �ش� �÷��̾��� ������ �������ϴ�.
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
