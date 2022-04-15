/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 배지훈 raccoonfox69@gmail.com
 * ==================================
 * 
 */
package client.commands;

import client.MapleClient;
import launch.ChannelServer;
import tools.StringUtil;
import java.util.Collection;

public class ServerMessageCommand implements Command {

    @Override
    public void execute(MapleClient c, String[] splittedLine) throws Exception, IllegalCommandSyntaxException {
        Collection<ChannelServer> cservs = ChannelServer.getAllInstances();
        String outputMessage = StringUtil.joinStringFrom(splittedLine, 1);
        for (ChannelServer cserv : cservs) {
            cserv.setServerMessage(outputMessage);
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
        return new CommandDefinition[]{
            new CommandDefinition("서버공지", "<메시지>", "서버 전체의 노란색 공지 메시지를 바꿉니다.", 2)
        };
    }
}
