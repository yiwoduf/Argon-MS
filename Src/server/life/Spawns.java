/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.life;

import server.maps.MapleMap;

public abstract class Spawns {
    public abstract MapleMonster getMonster();
    public abstract boolean shouldSpawn();
    public abstract MapleMonster spawnMonster(MapleMap map);
}