/*
 Maple Team ProJect
 Á¦ÀÛ ¿ëµµ : ¼­¹ö¿î¿µ¿ë
 ÆÀ¿ø¸ñ·Ï
 * °­µ¿¿ø dongwon1852@nate.com 
 * ±è¼±ÀÏ fileupload@nate.com
 * ±è¼®Çö azxcs3@nate.com
 * ±èÁø¼º m0nday_s@nate.com
 * °øÁØÇù kkong1001@nate.com
 * ±è¹ÎÈ£ rubystory0603@nate.com
 * ÀÌÀç¿Õ ejwj5592@nate.com
 * ÃÖ¿ëÀç virgo_s_t@nate.com
 * ¼­¼º´ö abq1239@nate.com
 */
package server.maps;

import client.MapleClient;
import client.MapleCharacter;
import client.skills.ISkill;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import java.awt.Point;
import java.awt.Rectangle;
import packet.creators.MainPacketCreator;
//import packet.transfer.write.byte[];
import server.life.MobSkill;
import server.life.MapleMonster;

public class MapleMist extends AbstractHinaMapObject {

    private Rectangle mistPosition;
    private MapleCharacter owner = null;
    private MapleMonster mob = null;
    private SkillStatEffect source;
    private MobSkill skill;
    private boolean isMobMist, isPoisonMist, isShelter, isRecovery, isBurningRegion, isTimeCapsule, isChilingStep;
    private int skillDelay, skilllevel;
    private int clockType; //¹Ý¹Ý
    private boolean isUsed;
    private Point position;
    private long endTime = -1;
    private MapleMap map;
    private int useEffectCount = 0; // È¦¸® ÆÄ¿îÆ¾ »ç¿ë°¡´É È½¼ö

    public MapleMist(Rectangle mistPosition, MapleMonster mob, MobSkill skill, Point position) {
        this.mistPosition = mistPosition;
        this.mob = mob;
        this.skill = skill;
        skilllevel = skill.getSkillId();
        isMobMist = true;
        isPoisonMist = true;
        isShelter = true;
        isBurningRegion = false;
        isTimeCapsule = false;
        isRecovery = true;
        skillDelay = 0;
        clockType = -1;
        isUsed = false;
    }

    public MapleMist(Rectangle mistPosition, MapleCharacter owner, SkillStatEffect source, int skilllevel, Point position) {
        this.mistPosition = mistPosition;
        this.owner = owner;
        this.source = source;
        this.skilllevel = skilllevel;
        this.position = position;
        switch (source.getSourceId()) {
            case 4121015: // ÆÛÁö ¿¡¾î¸®¾î
            case 4221006: // Smoke Screen
                isMobMist = false;
                isPoisonMist = false;
                isShelter = false;
                isRecovery = false;
                skillDelay = 8;
                break;
            case 1076:
            case 11076:
            case 2111003: // FP mist
            case 2100010: // Ignight
            case 14111006:
            case 61121105: // Infernal Breath
            case 3111003:
                isMobMist = false;
                isPoisonMist = true;
                isShelter = false;
                isRecovery = false;
                skillDelay = source.getSourceId() == 2100010 ? 6 : 0;
                break;
            case 32121006: //½©ÅÍ
                isMobMist = false;
                isPoisonMist = false;
                isShelter = true;
                isRecovery = false;
                skillDelay = 11;
                break;
            case 22161003:
                isMobMist = false;
                isPoisonMist = false;
                isShelter = false;
                isRecovery = true;
                skillDelay = 8;
                break;
            case 100001261:
                isMobMist = false;
                isPoisonMist = false;
                isShelter = false;
                isRecovery = false;
                skillDelay = 2;
                break;
            case 12121005: //¹ö´× ¸®Á¯
                skillDelay = 2;
                isBurningRegion = true;
                break;
            case 36121007: //Å¸ÀÓ Ä¸½¶
                skillDelay = 15;
                isTimeCapsule = true;
                break;
            case 2311011: // È¦¸®ÆÄ¿îÆ¾
                useEffectCount = source.getY();
                break;
            case 2201009: // Ä¥¸µ ½ºÅÜ
                isChilingStep = true;
                break;
        }
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.MIST;
    }

    @Override
    public Point getPosition() {
        return mistPosition.getLocation();
    }

    public void setEndTime(int i) {
        endTime = System.currentTimeMillis() + i;
    }

    public long getEndTime() {
        return endTime;
    }

    public ISkill getSourceSkill() {
        if (source == null) {
            return null;
        }
        return SkillFactory.getSkill(source.getSourceId());
    }

    public SkillStatEffect getSource() {
        return source;
    }

    public boolean isMobMist() {
        return isMobMist;
    }

    public boolean isPoisonMist() {
        return isPoisonMist;
    }

    public boolean isShelter() {
        return isShelter;
    }

    public boolean isBurningRegion() {
        return isBurningRegion;
    }

    public boolean isTimeCapsule() {
        return isTimeCapsule;
    }

    public boolean isChilingStep() {
        return isChilingStep;
    }

    public boolean isRecovery() {
        return isRecovery;
    }

    public void setMap(final MapleMap map) {
        this.map = map;
    }

    public void removeMist() {
        map.broadcastMessage(MainPacketCreator.removeMist(getObjectId(), false));
        map.removeMapObject(this);
        if (getOwner() != null) {
            getOwner().removeVisibleMapObject(this);
        }
    }

    public boolean isUsed() {
        return isUsed;
    }

    public void setUsed(boolean used) {
        this.isUsed = used;
    }

    public int getSkillDelay() {
        return skillDelay;
    }

    public int getSkillLevel() {
        return skilllevel;
    }

    public MapleMonster getMobOwner() {
        return mob;
    }

    public MapleCharacter getOwner() {
        return owner;
    }

    public MobSkill getMobSkill() {
        return this.skill;
    }

    public Rectangle getBox() {
        return mistPosition;
    }

    public int getClockType() {
        return clockType;
    }

    public void setClockType(int clockType) {
        this.clockType = clockType;
    }

    public boolean isClock() {
        return clockType != -1;
    }

    @Override
    public void setPosition(Point position) {
    }

    public byte[] fakeSpawnData(int level) {
        if (owner != null) {
            return MainPacketCreator.spawnMist(this);
        }
        return MainPacketCreator.spawnMist(this);
    }

    @Override
    public void sendSpawnData(final MapleClient c) {
        c.getSession().writeAndFlush(getClockType() > 0 ? MainPacketCreator.spawnClockMist(this) : MainPacketCreator.spawnMist(this));
    }

    @Override
    public void sendDestroyData(final MapleClient c) {
        c.getSession().writeAndFlush(MainPacketCreator.removeMist(getObjectId(), source.isMistEruption()));
    }

    public boolean makeChanceResult() {
        return source.makeChanceResult();
    }

    public Point getTruePosition() {
        return position;
    }

    public int getUseEffectCount() {
        return useEffectCount;
    }

    public void decrementUseEffectCount() {
        this.useEffectCount--;
    }
}
