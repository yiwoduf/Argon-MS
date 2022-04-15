/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ������ raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

import client.MapleClient;

public interface Command {
	CommandDefinition[] getDefinition();
	void execute (final MapleClient c, final String []splittedLine) throws Exception, IllegalCommandSyntaxException;
}