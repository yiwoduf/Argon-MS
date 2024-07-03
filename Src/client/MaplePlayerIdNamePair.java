/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package client;

public class MaplePlayerIdNamePair {

    private int id, level, job;
    private String name;

    public MaplePlayerIdNamePair(int id, String name, int level, int job) {
        super();
        this.id = id;
        this.name = name;
	this.level = level;
	this.job = job;
    }
    

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

	public int getLevel() {
		return level;
	}

	public int getJob() {
		return job;
	}
}
