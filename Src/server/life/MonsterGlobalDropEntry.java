/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.life;

public class MonsterGlobalDropEntry {

    public MonsterGlobalDropEntry(int itemId, int chance, int continent, byte dropType, int Minimum, int Maximum, int questid) {
	this.itemId = itemId;
	this.chance = chance;
	this.dropType = dropType;
	this.questid = questid;
	this.Minimum = Minimum;
	this.Maximum = Maximum;
    }
    public byte dropType;
    public int itemId, chance, Minimum, Maximum, questid;
    public boolean checkNull = false;
}