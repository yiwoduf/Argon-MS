package server.maps;

import client.MapleCharacter;
import client.MapleClient;
import java.awt.Point;
import java.util.Collections;
import packet.creators.MainPacketCreator;

/**
 *
 * @author Ella <auradev2@nate.com>
 */
public class MapleWreckage extends AbstractHinaMapObject {

    int duration;
    int skillID;
    int index;
    long endTime;
    MapleCharacter owner;
    Point position;
    
    public MapleWreckage(MapleCharacter owner, int duration, int skillID, int index, Point position) {
        this.owner = owner;
        this.duration = duration;
        this.skillID = skillID;
        this.index = index;
        this.position = position;
        setPosition(position);
        endTime = System.currentTimeMillis() + duration;
    }
    
    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.WRECKAGE;
    }

    @Override
    public void sendSpawnData(MapleClient client) {
        client.getSession().writeAndFlush(MainPacketCreator.AddWreckage(owner.getId(), position, duration, getObjectId(), skillID, index));
    }

    @Override
    public void sendDestroyData(MapleClient client) {
        client.getSession().writeAndFlush(MainPacketCreator.DelWreckage(owner.getId(), Collections.singletonList(this), false));
    }
    
    public long getEndTime() {
        return endTime;
    }
    
    public MapleCharacter getOwner() {
        return owner;
    }
    
    public Point getPosition() {
        return position;
    }
    
    public final void removeWreckage(final MapleMap map, final boolean useSkill) {
        map.removeMapObject(this);
        owner.removeVisibleMapObject(this);
    }
    
}
