/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package provider;

public interface MapleDataProvider {
	MapleData getData(String path);
	MapleDataDirectoryEntry getRoot();
}
