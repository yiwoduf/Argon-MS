/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
/*
 Maple Team ProJect
 제작 용도 : 서버운영용
 팀원목록
 * 강동원 dongwon1852@nate.com 
 * 김선일 fileupload@nate.com
 * 김석현 azxcs3@nate.com
 * 김진성 m0nday_s@nate.com
 * 공준협 kkong1001@nate.com
 * 김민호 rubystory0603@nate.com
 * 이재왕 ejwj5592@nate.com
 * 최용재 virgo_s_t@nate.com
 * 서성덕 abq1239@nate.com
 */
package server.life;

import client.MapleCharacter;
import client.stats.DiseaseStats;
import client.stats.MonsterStatus;
import server.maps.MapleMapObject;
import server.maps.MapleMapObjectType;
import server.maps.MapleMist;
import tools.ArrayMap;
import java.awt.Point;
import java.awt.Rectangle;
import java.util.*;
import packet.creators.MainPacketCreator;
import packet.creators.UIPacket;
import tools.Pair;
import tools.RandomStream.Randomizer;

public class MobSkill {

    private int skillId, skillLevel, mpCon, spawnEffect, hp, x, y;
    private long duration, cooltime;
    private float prop;
//    private short effect_delay;
    private short limit;
    private List<Integer> toSummon = new ArrayList<Integer>();
    private Point lt, rb;
    private List<Pair<Integer, Point>> monsterId = new ArrayList<>();

    public MobSkill(int skillId, int level) {
        this.skillId = skillId;
        this.skillLevel = level;
    }

    public void setMpCon(int mpCon) {
        this.mpCon = mpCon;
    }

    public void addSummons(List<Integer> toSummon) {
        this.toSummon = toSummon;
    }

    /*   public void setEffectDelay(short effect_delay) {
     this.effect_delay = effect_delay;
     }*/
    public void setSpawnEffect(int spawnEffect) {
        this.spawnEffect = spawnEffect;
    }

    public void setHp(int hp) {
        this.hp = hp;
    }

    public void setX(int x) {
        this.x = x;
    }

    public void setY(int y) {
        this.y = y;
    }

    public void setDuration(long duration) {
        this.duration = duration;
    }

    public void setCoolTime(long cooltime) {
        this.cooltime = cooltime;
    }

    public void setProp(float prop) {
        this.prop = prop;
    }

    public void setLtRb(Point lt, Point rb) {
        this.lt = lt;
        this.rb = rb;
    }

    public void setLimit(short limit) {
        this.limit = limit;
    }

    public void addMonster(int id, Point pos) {
        this.monsterId.add(new Pair<>(id, pos));
    }
    
    public boolean checkCurrentBuff(MapleCharacter player, MapleMonster monster) {
        boolean stop = false;
        switch (skillId) {
            case 100:
            case 110:
                stop = monster.isBuffed(MonsterStatus.WEAPON_ATTACK_UP);
                break;
            case 101:
            case 111:
                stop = monster.isBuffed(MonsterStatus.MAGIC_ATTACK_UP);
                break;
            case 102:
            case 112:
                stop = monster.isBuffed(MonsterStatus.WEAPON_DEFENSE_UP);
                break;
            case 103:
            case 113:
                stop = monster.isBuffed(MonsterStatus.MAGIC_DEFENSE_UP);
                break;
            case 140:
            case 141:
            case 143:
            case 144:
            case 145:
                stop = monster.isBuffed(MonsterStatus.MAGIC_IMMUNITY) || monster.isBuffed(MonsterStatus.WEAPON_IMMUNITY);
                break;
            case 200:
//		int count = 0;
//		for (MapleMapObject ob_mob : player.getMap().getAllMonster()) {
//		    if (((MapleMonster) ob_mob).getId() == 0) {
//			count++;
//		    }
//		}
                stop = player.getMap().getAllMonster().size() >= limit;
                break;
        }
        return stop;
    }

    public void applyEffect(MapleCharacter player, MapleMonster monster, boolean skill) {
        DiseaseStats disease = null;
        Map<MonsterStatus, Integer> stats = new ArrayMap<MonsterStatus, Integer>();
        List<Integer> reflection = new LinkedList<Integer>();
        switch (skillId) {
            case 100:
            case 110:
                stats.put(MonsterStatus.WEAPON_ATTACK_UP, Integer.valueOf(x));
                break;
            case 101:
            case 111:
                stats.put(MonsterStatus.MAGIC_ATTACK_UP, Integer.valueOf(x));
                break;
            case 102:
            case 112:
                stats.put(MonsterStatus.WEAPON_DEFENSE_UP, Integer.valueOf(x));
                break;
            case 103:
            case 113:
                stats.put(MonsterStatus.MAGIC_DEFENSE_UP, Integer.valueOf(x));
                break;
            case 114:
                if (lt != null && rb != null && skill) {
                    List<MapleMapObject> objects = getObjectsInRange(monster, MapleMapObjectType.MONSTER);
                    final int hp = (getX() / 1000) * (int) (950 + 1050 * Math.random());
                    for (MapleMapObject mons : objects) {
                        ((MapleMonster) mons).heal(hp, getY(), true);
                    }
                } else {
                    monster.heal(getX(), getY(), true);
                }
                break;
            case 120:
                disease = DiseaseStats.SEAL;
                break;
            case 121:
                disease = DiseaseStats.DARKNESS;
                break;
            case 122:
                disease = DiseaseStats.WEAKEN;
                break;
            case 123:
                disease = DiseaseStats.STUN;
                break;
            case 124:
                disease = DiseaseStats.CURSE;
                break;
            case 125:
                disease = DiseaseStats.POISON;
                break;
            case 126: // Slow
                disease = DiseaseStats.SLOW; 
                break;
            case 127:
                if (lt != null && rb != null && skill) {
                    for (MapleCharacter character : getPlayersInRange(monster, player)) {
                        character.dispel();
                    }
                } else {
                    player.dispel();
                }
                break;
            case 128: // Seduce
                disease = DiseaseStats.SEDUCE; //packet
                break;
            case 129: // Banish
                final BanishInfo info = monster.getStats().getBanishInfo();
                if (lt != null && rb != null && skill) {
                    for (MapleCharacter chr : getPlayersInRange(monster, player)) {
                        chr.changeMapBanish(info.getMap(), info.getPortal(), info.getMsg());
                    }
                } else {
                    player.changeMapBanish(info.getMap(), info.getPortal(), info.getMsg());
                }
                break;
            case 131: // Mist
                monster.getMap().spawnMist(new MapleMist(calculateBoundingBox(monster.getPosition(), true), monster, this, monster.getPosition()), x * 10, false, false, false, false, false, false, false);
                break;
            case 132:
                disease = DiseaseStats.REVERSE_DIRECTION;
                break;
            case 133:
                disease = DiseaseStats.ZOMBIFY; 
                break;
            case 134:
                disease = DiseaseStats.POTION; 
                break;
            case 135:
                disease = DiseaseStats.SHADOW;
                break;
            case 136:
                disease = DiseaseStats.BLIND;
                break;
            case 137:
                disease = DiseaseStats.FREEZE;
                break;
            case 140:
                if (makeChanceResult()) {
                    stats.put(MonsterStatus.WEAPON_IMMUNITY, Integer.valueOf(x));
                }
                break;
            case 141:
                if (makeChanceResult()) {
                    stats.put(MonsterStatus.MAGIC_IMMUNITY, Integer.valueOf(x));
                }
                break;
            case 143: // Weapon Reflect
                stats.put(MonsterStatus.WEAPON_DAMAGE_REFLECT, Integer.valueOf(x));
                stats.put(MonsterStatus.WEAPON_IMMUNITY, Integer.valueOf(x));
                reflection.add(x);
                break;
            case 144: // Magic Reflect
                stats.put(MonsterStatus.MAGIC_DAMAGE_REFLECT, Integer.valueOf(x));
                stats.put(MonsterStatus.MAGIC_IMMUNITY, Integer.valueOf(x));
                reflection.add(x);
                break;
            case 145: // Weapon / Magic reflect
                stats.put(MonsterStatus.WEAPON_DAMAGE_REFLECT, Integer.valueOf(x));
                stats.put(MonsterStatus.WEAPON_IMMUNITY, Integer.valueOf(x));
                stats.put(MonsterStatus.MAGIC_DAMAGE_REFLECT, Integer.valueOf(x));
                stats.put(MonsterStatus.MAGIC_IMMUNITY, Integer.valueOf(x));
                reflection.add(x);
                break;
            case 184: //반반 강제위치이동 - 자쿰
                disease = DiseaseStats.TELEPORT;
                this.setX(player.getPosition().x);
                this.setY(player.getPosition().y);
                break;
            case 191: //반반 타임워프 - 자쿰
                Point posFrom = monster.getPosition();
                Point mylt = new Point(lt.x + posFrom.x, lt.y + posFrom.y);
                Point myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
                Rectangle box = new Rectangle(posFrom.x, posFrom.y, myrb.x - mylt.x, myrb.y - mylt.y);
                MapleMist clock = new MapleMist(box, monster, this, monster.getPosition());
                clock.setClockType(Randomizer.rand(1, 2));
                monster.getMap().spawnClockMist(clock);
                monster.getMap().broadcastMessage(UIPacket.showInfo("시간의 틈새에 '균열'이 발생하였습니다."));
                break;
            case 201:
                for (Pair<Integer, Point> pa : monsterId) {
                    monster.getMap().spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(pa.left), pa.right);
                }
                break;
            case 200:
                for (Integer mobId : getSummons()) {
                    final MapleMonster toSpawn = MapleLifeProvider.getMonster(mobId);
                    toSpawn.setPosition(monster.getPosition());
                    int ypos = (int) monster.getPosition().getY(), xpos = (int) monster.getPosition().getX();
                    switch (mobId) {
                        case 8500003: // Pap bomb high
                            toSpawn.setFh((int) Math.ceil(Math.random() * 19.0));
                            ypos = -590;
                            break;
                        case 8500004: // Pap bomb
                            //Spawn between -500 and 500 from the monsters X position
                            xpos = (int) (monster.getPosition().getX() + Math.ceil(Math.random() * 1000.0) - 500);
                            ypos = (int) monster.getPosition().getY();
                            break;
                        case 8510100: //Pianus bomb
                            if (Math.ceil(Math.random() * 5) == 1) {
                                ypos = 78;
                                xpos = (int) (0 + Math.ceil(Math.random() * 5)) + ((Math.ceil(Math.random() * 2) == 1) ? 180 : 0);
                            } else {
                                xpos = (int) (monster.getPosition().getX() + Math.ceil(Math.random() * 1000.0) - 500);
                            }
                            break;
                    }
		    // Get spawn coordinates (This fixes monster lock)
                    // TODO get map left and right wall.
                    switch (monster.getMap().getId()) {
                        case 220080001: //Pap map
                            if (xpos < -890) {
                                xpos = (int) (-890 + Math.ceil(Math.random() * 150));
                            } else if (xpos > 230) {
                                xpos = (int) (230 - Math.ceil(Math.random() * 150));
                            }
                            break;
                        case 230040420: // Pianus map
                            if (xpos < -239) {
                                xpos = (int) (-239 + Math.ceil(Math.random() * 150));
                            } else if (xpos > 371) {
                                xpos = (int) (371 - Math.ceil(Math.random() * 150));
                            }
                            break;
                    }
                    monster.getMap().spawnMonsterWithEffect(toSpawn, getSpawnEffect(), monster.getMap().calcPointMaple(new Point(xpos, ypos - 1)));
                }
                break;
        }

        if (stats.size() > 0) {
            if (lt != null && rb != null && skill) {
                for (MapleMapObject mons : getObjectsInRange(monster, MapleMapObjectType.MONSTER)) {
                    ((MapleMonster) mons).applyMonsterBuff(stats, getX(), getSkillId(), getDuration(), this, reflection);
                }
            } else {
                monster.applyMonsterBuff(stats, getX(), getSkillId(), getDuration(), this, reflection);
            }
        }
        if (disease != null) {
            if (lt != null && rb != null && skill) {
                for (MapleCharacter chr : getPlayersInRange(monster, player)) {
                    chr.giveDebuff(disease, this);
                }
            } else {
                player.giveDebuff(disease, this);
            }
        }
        monster.setMp(monster.getMp() - getMpCon());
    }

    public int getSkillId() {
        return skillId;
    }

    public int getSkillLevel() {
        return skillLevel;
    }

    public int getMpCon() {
        return mpCon;
    }

    public List<Integer> getSummons() {
        return Collections.unmodifiableList(toSummon);
    }

    public int getSpawnEffect() {
        return spawnEffect;
    }

    public int getHP() {
        return hp;
    }

    public int getX() {
        return x;
    }

    public int getY() {
        return y;
    }

    public long getDuration() {
        return duration;
    }

    public long getCoolTime() {
        return cooltime;
    }

    public Point getLt() {
        return lt;
    }

    public Point getRb() {
        return rb;
    }

    public int getLimit() {
        return limit;
    }

    public boolean makeChanceResult() {
        return prop == 1.0 || Math.random() < prop;
    }

    private Rectangle calculateBoundingBox(Point posFrom, boolean facingLeft) {
        Point mylt, myrb;
        if (facingLeft) {
            mylt = new Point(lt.x + posFrom.x, lt.y + posFrom.y);
            myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
        } else {
            myrb = new Point(lt.x * -1 + posFrom.x, rb.y + posFrom.y);
            mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
        }
        final Rectangle bounds = new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
        return bounds;
    }

    private List<MapleCharacter> getPlayersInRange(MapleMonster monster, MapleCharacter player) {
        final Rectangle bounds = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        List<MapleCharacter> players = new ArrayList<MapleCharacter>();
        players.add(player);
        return monster.getMap().getPlayersInRect(bounds, players);
    }

    private List<MapleMapObject> getObjectsInRange(MapleMonster monster, MapleMapObjectType objectType) {
        final Rectangle bounds = calculateBoundingBox(monster.getPosition(), monster.isFacingLeft());
        List<MapleMapObjectType> objectTypes = new ArrayList<MapleMapObjectType>();
        objectTypes.add(objectType);
        return monster.getMap().getMapObjectsInRect(bounds, objectTypes);
    }
}
