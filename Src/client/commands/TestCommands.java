/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ������ raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

import static client.commands.CommandProcessor.getOptionalIntArg;
import client.MapleClient;
import packet.creators.MainPacketCreator;
import tools.StringUtil;

public class TestCommands implements Command {

    @Override
    public void execute(final MapleClient c, final String[] splitted) throws Exception, IllegalCommandSyntaxException {
        if (splitted[0].equals("!�ð�")) {
	    c.getPlayer().getMap().broadcastMessage(MainPacketCreator.getClock(getOptionalIntArg(splitted, 1, 60)));
	} else if (splitted[0].equals("!��Ŷ")) {
	    if (splitted.length > 1) {
		c.getSession().writeAndFlush(MainPacketCreator.getPacketFromHexString(StringUtil.joinStringFrom(splitted, 1)));
	    } else {
		c.getPlayer().dropMessage(6, "��Ŷ�����͸� �Է����ּ���.");
	    }
          }
    }

    @Override
    public CommandDefinition[] getDefinition() {
	return new CommandDefinition[]{
	    new CommandDefinition("�ð�", "<�ð�>", "���� �ʿ� �ð��� ���ϴ�.", 2),
	    new CommandDefinition("��Ŷ", "<��������>", "�Է��� 16���� �������� ��Ŷ�� ���� Ŭ���̾�Ʈ�� �����ϴ�.", 6),
	};
      }
}
