/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 배지훈 raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

public class CommandDefinition {
    private String command;
    private String parameterDescription;
    private String help;
    private int requiredLevel; // gm level

    public CommandDefinition(String command, String parameterDescription, String help, int requiredLevel) {
	this.command = command;
	this.help = help;
	this.parameterDescription = parameterDescription;
	this.requiredLevel = requiredLevel;
    }

    public String getCommand() {
	return command;
    }

    public String getHelp() {
	return help;
    }

    public String getParameterDescription() {
	return parameterDescription;
    }

    public int getRequiredLevel() {
	return requiredLevel;
    }
}