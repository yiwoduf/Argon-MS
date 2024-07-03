/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package community;

import packet.creators.MainPacketCreator;
//import packet.transfer.write.byte[];

public enum MapleGuildResponse {

    NOT_IN_CHANNEL(0x30), //0x30
    ALREADY_IN_GUILD(0x2E),
    NOT_IN_GUILD(0x33);
    private int value;

    private MapleGuildResponse(int val) {
	value = val;
    }

    public int getValue() {
	return value;
    }

    public byte[] getPacket() {
	return MainPacketCreator.genericGuildMessage((byte) value);
    }
}
