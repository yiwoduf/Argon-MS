/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package packet.chat.opcode;

import packet.opcode.*;
import constants.ServerConstants;
import tools.IniFileProcess;
import java.io.File;

public enum ChatSendPacketOpcode {
    LoginResult(1),
    AliveReq(13),
    GuildChatMessage(18),
    FriendChatMessage(19);
    
    private short value = -2;

    private ChatSendPacketOpcode(int val) {
        value = (short) val;
    }

    private ChatSendPacketOpcode() {
        value = (short) 0;
    }

    public static String getOpcodeName(int value) {

        for (ChatSendPacketOpcode opcode : values()) {
            if (opcode.getValue() == value) {
                System.out.println("DEBUG[SEND]: " + opcode.name());
                return opcode.name();
            }
        }
        return "UNKNOWN";
    }

    public void setValue(short value) {
        this.value = value;
    }

    public short getValue() {
        return value;
    }
}
