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
import tools.IniFileProcess;
import java.io.File;
import java.util.HashMap;
import java.util.Map;

public enum ChatRecvPacketOpcode {
    LoginResult(1),
    GuildChatMessage(19),
    FriendChatMessage(20);

    private short value;
    private final static Map<Short, ChatRecvPacketOpcode> RecvOpcodes = new HashMap<Short, ChatRecvPacketOpcode>();

    public static void initalized() {
        if (!RecvOpcodes.isEmpty()) {
            RecvOpcodes.clear();
        }
        for (ChatRecvPacketOpcode recv : ChatRecvPacketOpcode.values()) {
            RecvOpcodes.put(recv.getValue(), recv);
        }
    }

    public static Map<Short, ChatRecvPacketOpcode> getRecvOpcodes() {
        return RecvOpcodes;
    }

    private ChatRecvPacketOpcode(int value) {
        setValue((short)value);
    }

    public void setValue(short value) {
        this.value = value;
    }

    public short getValue() {
        return value;
    }

    public static String getOpcodeName(int value) {

        for (ChatRecvPacketOpcode opcode : values()) {
            if (opcode.getValue() == value) {
                return opcode.name();
            }
        }
        return "UNKNOWN";
    }
}
