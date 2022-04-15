/*
 * ArcStory Project
 * ÃÖÁÖ¿ø sch2307@naver.com
 * ÀÌÁØ junny_adm@naver.com
 * ¿ìÁöÈÆ raccoonfox69@gmail.com
 * °­Á¤±Ô ku3135@nate.com
 * ±èÁøÈ« designer@inerve.kr
 */

package client.skills;

import client.MapleCharacter;
import client.stats.BuffStats;
import constants.GameConstants;

import java.lang.ref.WeakReference;

import packet.creators.MainPacketCreator;

public class CancelCooldownAction implements Runnable {

    private int skillId;
    private WeakReference<MapleCharacter> target;

    public CancelCooldownAction(MapleCharacter target, int skillId) {
        this.target = new WeakReference<MapleCharacter>(target);
        this.skillId = skillId;
    }

    @Override
    public void run() {
        final MapleCharacter realTarget = target.get();
        if (realTarget != null) {
            realTarget.removeCooldown(skillId);
            realTarget.getClient().send(MainPacketCreator.skillCooldown(skillId, 0, realTarget.isGM()));
            //if (GameConstants.isSoulSkill(skillId)) {
                //realTarget.checkSoulState(false, realTarget.getEquippedSoulSkill());
            //}
        }
    }
}
