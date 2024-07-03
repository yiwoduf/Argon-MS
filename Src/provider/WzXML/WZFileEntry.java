/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package provider.WzXML;

import provider.MapleDataEntity;
import provider.MapleDataFileEntry;

public class WZFileEntry extends WZEntry implements MapleDataFileEntry {

    private int offset;

    public WZFileEntry(String name, int size, int checksum, MapleDataEntity parent) {
	super(name, size, checksum, parent);
    }

    @Override
    public int getOffset() {
	return offset;
    }

    public void setOffset(int offset) {
	this.offset = offset;
    }
}
