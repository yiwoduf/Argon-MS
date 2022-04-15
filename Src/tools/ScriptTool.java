/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package tools;

import java.io.File;

/**
 *
 *
 */
public class ScriptTool {

    public static final String findScript(final String code, final String type) {
        final String findFile = code + ".js";
        File directory = new File("Emulator/Scripts/" + type);
        File[] fileList = directory.listFiles();
        for (File f : fileList) {
            if (!f.isDirectory()) {
                if (findFile.equals(f.getName())) {
                    return f.getName();
                }
            } else {
                for (File child : f.listFiles()) {
                    if (f.getName().indexOf("backup-") == -1) {
                        if (findFile.equals(child.getName())) {
                            return f.getName() + "\\" + child.getName();
                        }
                    }
                }
            }
        }
        return code + ".js";
    }

}
