/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package provider;

/**
 *
 * @author Matze
 */
public interface MapleDataEntry extends MapleDataEntity {
	public String getName();
	public int getSize();
	public int getChecksum();
	public int getOffset();
}
