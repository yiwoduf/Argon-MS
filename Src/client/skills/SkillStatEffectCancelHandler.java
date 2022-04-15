/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package client.skills;

import client.MapleCharacter;
import client.MapleClient;
import client.stats.BuffStats;
import client.stats.BuffStatsValueHolder;
import client.stats.MonsterStatus;
import client.stats.MonsterStatusEffect;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import launch.ChannelServer;
import launch.Start;
import launch.holder.MapleCoolDownValueHolder;
import packet.creators.MainPacketCreator;
import server.life.MapleMonster;
import server.maps.ArrowFlatter;
import server.maps.MapleMap;
import server.maps.MapleMapObject;
import server.maps.MapleMist;
import server.maps.MapleSummon;
import server.maps.MapleWorldMapItem;
import tools.Pair;

/**
 *
 * @author KSH
 */
public class SkillStatEffectCancelHandler implements Runnable {

    public SkillStatEffectCancelHandler() {
        Start.println("[ARGON] SkillStatEffectCancelHandler Thred started.", 34);
    }

    @Override
    public void run() {
        long time = System.currentTimeMillis();
        for (final ChannelServer cs : ChannelServer.getAllInstances()) {
            //  cs.getPlayerStorage().lockMutex();
            //   try {
            for (final MapleCharacter chr : cs.getPlayerStorage().getAllCharacters().values()) {
                if (chr.getAllCooldowns().size() > 0) {
                    for (final MapleCoolDownValueHolder mcvh : chr.getAllCooldowns()) {
                        if (time >= mcvh.startTime + mcvh.length) {
                            chr.removeCooldown(mcvh.skillId);
                        }
                    }
                }
                if (chr.getSummons().size() > 0) {
                    MapleSummon summon;
                    for (final Entry<Integer, Pair<Integer, MapleSummon>> summons : chr.getSummons().entrySet()) {
                        summon = summons.getValue().right;
                        if (summon.getEndTime() <= time) {
                            summon.removeSummon(summon.getOwner().getMap());
                        }
                    }
                }
                if (chr.getBuffedValue(BuffStats.CTS_FireAura) != null) {
                    chr.addMP(-100);
                }
                if (chr.getBuffedValue(BuffStats.CTS_IceAura) != null) {
                    chr.addMP(-60);
                }
            }

            for (final MapleMap map : cs.getMapFactory().getMaps().values()) {
                if (map.getArrowFlatter().size() > 0) {
                    for (final ArrowFlatter arrow : map.getArrowFlatter()) {
                        if (time >= arrow.getTime()) {
                            map.broadcastMessage(MainPacketCreator.cancelArrowFlatter(arrow.getObjectId(), arrow.getArrow()));
                            map.removeMapObject(arrow);
                        }
                    }
                }
                if (map.getAllSummon().size() > 0) {
                    for (final MapleSummon summon : map.getAllSummon()) {
                        if (summon.getEndTime() <= time) {
                            summon.removeSummon(summon.getOwner().getMap());
                        }
                    }
                }
                if (map.getAllMonster().size() > 0) {
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
}
