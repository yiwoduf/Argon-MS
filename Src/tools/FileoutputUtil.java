/*
 This file is part of the OdinMS Maple Story Server
 Copyright (C) 2008 ~ 2010 Patrick Huy <patrick.huy@frz.cc> 
 Matthias Butz <matze@odinms.de>
 Jan Christian Meyer <vimes@odinms.de>

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU Affero General Public License version 3
 as published by the Free Software Foundation. You may not use, modify
 or distribute this program under any other version of the
 GNU Affero General Public License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Affero General Public License for more details.

 You should have received a copy of the GNU Affero General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
package tools;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class FileoutputUtil {

    // Logging output file
    public static final String AHT_Log = "log/Log_AntiHackTool.txt";
    // End
    private static final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdfGMT = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    private static final SimpleDateFormat sdf_ = new SimpleDateFormat("yyyy-MM-dd");

    static {
        sdfGMT.setTimeZone(TimeZone.getTimeZone("GMT"));
    }

    public static void log(final String file, final String msg) {
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file, true);
            out.write(("\r\n------------------------ " + CurrentReadable_Time() + " ------------------------\r\n").getBytes(Charset.forName("UTF-8")));
            out.write(msg.getBytes(Charset.forName("UTF-8")));
        } catch (IOException ess) {
            ess.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    private static Object lock = new Object();

    public static void logToFile(final String file, final String msg) {
        FileOutputStream out = null;
        try {
            synchronized (lock) {
                out = new FileOutputStream(file, true);
                out.write(("[" + CurrentReadable_Time() + "] ").getBytes(Charset.forName("UTF-8")));
                out.write(msg.getBytes(Charset.forName("UTF-8")));
                out.write(("\r\n").getBytes(Charset.forName("UTF-8")));
            }
        } catch (IOException ess) {
            ess.printStackTrace();
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static void outputFileError(final String file, final Throwable t) {
        FileOutputStream out = null;
        try {
            out = new FileOutputStream(file, true);
            out.write(("\r\n------------------------ " + CurrentReadable_Time() + " ------------------------\r\n").getBytes());
            out.write(getString(t).getBytes());
        } catch (IOException ess) {
        } finally {
            try {
                if (out != null) {
                    out.close();
                }
            } catch (IOException ignore) {
            }
        }
    }

    public static String CurrentReadable_Date() {
        return sdf_.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_Time() {
        return sdf.format(Calendar.getInstance().getTime());
    }

    public static String CurrentReadable_TimeGMT() {
        return sdfGMT.format(new Date());
    }

    public static String getString(final Throwable e) {
        e.printStackTrace();
        String retValue = null;
        StringWriter sw = null;
        PrintWriter pw = null;
        try {
            sw = new StringWriter();
            pw = new PrintWriter(sw);
            e.printStackTrace(pw);
            retValue = sw.toString();
        } finally {
            try {
                if (pw != null) {
                    pw.close();
                }
                if (sw != null) {
                    sw.close();
                }
            } catch (IOException ignore) {
            }
        }
        return retValue;
    }
}
