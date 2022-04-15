/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package provider;

import java.util.List;

/**
 *
 * @author Matze
 */
public interface MapleDataDirectoryEntry extends MapleDataEntry {
	public List<MapleDataDirectoryEntry> getSubdirectories();
	public List<MapleDataFileEntry> getFiles();
	public MapleDataEntry getEntry(String name);
}
