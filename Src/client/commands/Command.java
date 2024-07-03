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

public interface Command {
	CommandDefinition[] getDefinition();
	void execute (final MapleClient c, final String []splittedLine) throws Exception, IllegalCommandSyntaxException;
}