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

import provider.WzXML.MapleDataType;

public interface MapleData extends MapleDataEntity, Iterable<MapleData> {
	public String getName();
	public MapleDataType getType();
	public List<MapleData> getChildren();
	public MapleData getChildByPath(String path);
	public Object getData();
}
