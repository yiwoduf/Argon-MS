/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.maps;

import client.MapleCharacter;
import client.stats.BuffStats;
import client.stats.MonsterStatus;
import client.stats.MonsterStatusEffect;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import launch.ChannelServer;
import launch.holder.MapleCoolDownValueHolder;
import packet.creators.MainPacketCreator;
import server.life.MapleMonster;
import tools.Pair;
import client.skills.SkillStatEffect;

/**
 *
 * @author SEUNGHYEON
 */
public class MapleMapObjectHandler implements Runnable {
    
    public MapleMapObjectHandler() {
        System.out.println("MapleMapObjectHandler 가 작동 되었습니다.");
    }
    
    @Override
    public void run() {
        long time = System.currentTimeMillis();

        for (final ChannelServer cs : ChannelServer.getAllInstances()) {
            for (final MapleMap map : cs.getMapFactory().getMaps().values()) {
                for (final ArrowFlatter arrow : map.getArrowFlatter()) {
                    if (time >= arrow.getTime()) {
                        map.broadcastMessage(MainPacketCreator.cancelArrowFlatter(arrow.getObjectId(), arrow.getArrow()));
                        map.removeMapObject(arrow);
                    }
                }
                for (final MapleMapObject obj : map.getAllMonster()) {
                    if (((MapleMonster) obj).isAlive()) {
                        List<MonsterStatusEffect> cancelStatus = new ArrayList<MonsterStatusEffect>();
                        for (final Entry<MonsterStatus, MonsterStatusEffect> stat : ((MapleMonster) obj).getStati().entrySet()) {
                            if (stat.getValue().getPoison() != null) {
                                if (time >= stat.getValue().getPoison().getCheckTime()) {
                                    stat.getValue().getPoison().pdamage(time);
                                }
                            }
                            if (((MapleMonster) obj).isAlive()) {
                                if (time >= stat.getValue().getEndTime()) {
                                    cancelStatus.add(stat.getValue());
                                }
                            }
                        }
                        for (final MonsterStatusEffect cancelStat : cancelStatus) {
                            ((MapleMonster) obj).cancelSingleStatus(cancelStat);
                        }
                        if (cancelStatus.size() > 0) {
                            cancelStatus.clear();
                        }
                    }
                }
            }
        }
    }
}
