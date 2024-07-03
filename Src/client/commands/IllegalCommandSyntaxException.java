/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 배지훈 raccoonfox69@gmail.com
 * ==================================
 * 
 */

package client.commands;

public class IllegalCommandSyntaxException extends Exception {


    public IllegalCommandSyntaxException() {
	super();
    }

    public IllegalCommandSyntaxException(String message) {
	super(message);
    }

    public IllegalCommandSyntaxException(int expectedArguments) {
	super("Expected at least " + expectedArguments + " arguments");
    }
}
