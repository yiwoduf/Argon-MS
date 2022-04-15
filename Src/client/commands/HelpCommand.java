/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ������ raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

import constants.ServerConstants;
import client.MapleClient;

public class HelpCommand implements Command {

    @Override
    public void execute(MapleClient c, String[] splittedLine) throws Exception, IllegalCommandSyntaxException {
        try {
            CommandProcessor.getInstance().dropHelp(c.getPlayer(), CommandProcessor.getOptionalIntArg(splittedLine, 1, 1));
        } catch (Exception e) {
            if (!ServerConstants.realese) e.printStackTrace();
        }
    }

    @Override
    public CommandDefinition[] getDefinition() {
	return new CommandDefinition[]{
            new CommandDefinition("GM��ɾ�", "[������ - �⺻�� : 1]", "��ɾ� ������ ǥ���մϴ�.", 1),
            new CommandDefinition("GM����", "[������ - �⺻�� : 1]", "��ɾ� ������ ǥ���մϴ�.", 1)
	};
    }
}
