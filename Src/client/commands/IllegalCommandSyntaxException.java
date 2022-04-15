/*
 * Å×½ºÇÇ¾Æ Project
 * ==================================
 * ÆÒ´õ spirit_m@nate.com
 * ¹èÁöÈÆ raccoonfox69@gmail.com
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
