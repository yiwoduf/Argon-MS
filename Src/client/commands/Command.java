/*
 * Å×½ºÇÇ¾Æ Project
 * ==================================
 * ÆÒ´õ spirit_m@nate.com
 * ¹èÁöÈÆ raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

import client.MapleClient;

public interface Command {
	CommandDefinition[] getDefinition();
	void execute (final MapleClient c, final String []splittedLine) throws Exception, IllegalCommandSyntaxException;
}