/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */

package server.life;

import client.MapleClient;
import packet.creators.MainPacketCreator;
import server.maps.MapleMap;
import server.maps.MapleMapObjectType;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 *
 * @author 티썬
 */
public class MaplePlayerNPC extends MapleNPC {
    private Map<Byte, Integer> equips = new LinkedHashMap<Byte, Integer>();
    private int face, hair;
    private byte skin, direction;
    
    public MaplePlayerNPC(final int id, final MapleNPCStats stats) {
	super(id, stats);
    }
    
    @Override
    public void broadcastPacket(MapleMap map) {
        map.broadcastMessage(MainPacketCreator.spawnNPC(this, true));
//        map.broadcastMessage(MainPacketCreator.spawnNPCRequestController(this, true));
        map.broadcastMessage(MainPacketCreator.spawnPlayerNPC(this, getId()));
    }
    
    @Override
    public void sendSpawnData(final MapleClient client) {
        client.getSession().writeAndFlush(MainPacketCreator.spawnNPC(this, true));
//        client.getSession().writeAndFlush(MainPacketCreator.spawnNPCRequestWController(this, true));
        client.getSession().writeAndFlush(MainPacketCreator.spawnPlayerNPC(this, getId()));
        
    }
    
    public byte getSkin() {
        return skin;
    }
    
    public byte getDirection() {
        return direction;
    }

    public int getFace() {
        return face;
    }

    public int getHair() {
        return hair;
    }
    
    public Map<Byte, Integer> getEquips() {
        return equips;
    }
    
    public void setEquips(Map<Byte, Integer> equips) {
        this.equips = equips;
    }
    
    public void setSkin(byte skin) {
        this.skin = skin;
    }
    
    public void setDirection(byte dir) {
        this.direction = dir;
    }

    public void setFace(int face) {
        this.face = face;
    }

    public void setHair(int hair) {
        this.hair = hair;
    }
    
    @Override
    public final MapleMapObjectType getType() {
	return MapleMapObjectType.PLAYERNPC;
    }
}
