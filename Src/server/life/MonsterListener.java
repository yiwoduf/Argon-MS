/*
 * �׽��Ǿ� Project
 * ==================================
 * �Ҵ� spirit_m@nate.com
 * ��ȣ softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.life;

public interface MonsterListener {

    /**
     *
     * @param monster The monster that was killed
     * @param highestDamageChar The char that did the highest damage to the monster. Can be null if that char is offline.
     */
    public void monsterKilled();
}
