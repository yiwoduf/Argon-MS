/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.life;

public class MonsterDropEntry {

    public MonsterDropEntry(int itemId, int chance, int Minimum, int Maximum, int questid) {
	this.itemId = itemId;
	this.chance = chance;
	this.questid = questid;
	this.Minimum = Minimum;
	this.Maximum = Maximum;
    }
    public int itemId, chance, Minimum, Maximum, questid;
    public boolean checkNull = false;
}