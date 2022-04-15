/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package server.maps;

import client.MapleClient;
import java.awt.Point;
import packet.creators.MainPacketCreator;
import packet.creators.RunePacket;

/**
 *
 * @author Administrator
 */
public class ArrowFlatter extends AbstractHinaMapObject {

    private int cid,arrow;
    private Point pos;
    private long time;
    
    public ArrowFlatter(int cid, long time, Point pos, int arrow) {
        this.cid = cid;
        this.time = time;
        this.pos = pos;
        this.arrow = arrow;
    }
    
    public int getCid() {
        return cid;
    }
    
    public int getArrow() {
        return arrow;
    }
    
    public Point getPosition() {
        return pos;
    }
    
    public long getTime() {
        return time;
    }
    
    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.ARROWFLATTER;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.getSession().writeAndFlush(MainPacketCreator.spawnArrowFlatter(cid, arrow, pos, getObjectId()));
        client.getSession().writeAndFlush(MainPacketCreator.spawnArrowFlatter(arrow, getObjectId()));
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().writeAndFlush(MainPacketCreator.cancelArrowFlatter(getObjectId(), arrow));
    }
}
