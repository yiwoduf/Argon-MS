/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.maps;

public class ReactorDropEntry {

    public ReactorDropEntry(int itemId, int chance, int questid) {
	this.itemId = itemId;
	this.chance = chance;
	this.questid = questid;
    }
    public int itemId, chance, questid;
    public int assignedRangeStart, assignedRangeLength;
}

