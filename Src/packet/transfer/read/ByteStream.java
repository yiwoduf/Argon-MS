/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package packet.transfer.read;

import tools.HexTool;
import java.io.IOException;

public class ByteStream {

    private int pos = 0;
    private long bytesRead = 0;
    private byte[] arr;

    public ByteStream(byte[] arr) {
        this.arr = arr;
    }

    public long getPosition() {
        return pos;
    }

    public void seek(long offset) throws IOException {
        pos = (int) offset;
    }

    public long getBytesRead() {
        return bytesRead;
    }

    public int readByte() {
        bytesRead++;
        return ((int) arr[pos++]) & 0xFF;
    }

    public String toString() {
        String nows = "";
        if (arr.length - pos > 0) {
            byte[] now = new byte[arr.length - pos];
            System.arraycopy(arr, pos, now, 0, arr.length - pos);
            nows = HexTool.toString(now);
        }
        return "리시브 데이터 : " + nows;
    }

    public String toString(final boolean b) {
        String nows = "";
        if (arr.length - pos > 0) {
            byte[] now = new byte[arr.length - pos];
            System.arraycopy(arr, pos, now, 0, arr.length - pos);
            nows = HexTool.toString(now);
        }
        return "All: " + HexTool.toString(arr) + "\nNow: " + nows;
    }

    public long available() {
        return arr.length - pos;
    }
}
