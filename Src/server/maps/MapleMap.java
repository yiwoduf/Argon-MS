/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 * 
 */
package server.maps;

import client.MapleClient;
import client.MapleCharacter;
import client.items.*;
import client.skills.ISkill;
import client.skills.Skill;
import client.skills.SkillFactory;
import client.skills.SkillStatEffect;
import client.stats.BuffStats;
import client.stats.DiseaseStats;
import client.stats.MonsterStatus;
import client.stats.MonsterStatusEffect;
import community.MaplePartyOperation;
import constants.ServerConstants;
import constants.GameConstants;
import constants.subclasses.QuickMove;
import database.MYSQL;
import launch.ChannelServer;
import launch.Start;
import launch.holder.MapleDiseaseValueHolder;
import launch.world.WorldBroadcasting;
import packet.creators.*;
import server.items.InventoryManipulator;
import server.items.ItemInformation;
import server.life.*;
import tools.*;
import tools.RandomStream.Randomizer;
import tools.Timer.MapTimer;

import java.awt.Point;
import java.awt.Rectangle;
import java.lang.ref.WeakReference;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.*;
import java.util.Timer;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

import handler.channel.MapleMechDoor;
import client.stats.PlayerStat;
import community.MaplePartyCharacter;
import handler.channel.InterServerHandler;
import handler.channel.InventoryHandler;

import java.sql.Connection;
import java.sql.ResultSet;
import java.util.concurrent.locks.ReentrantReadWriteLock;

import launch.holder.MapleCoolDownValueHolder;

import packet.skills.MechanicSkill;
import packet.transfer.read.ByteStream;
import packet.transfer.read.ReadingMaple;

public class MapleMap {

    private int tyep = 0;
    private int Raed = 0;
    private int Raed_a = 0;
    private long damage = 0;
    private boolean spawncheck[] = {false, false, false};

    public static transient ScheduledFuture<?> diabolicRecoveryTask = null;
    private transient ScheduledFuture<?> mapTimeLimitTask = null;

    private final Lock mutex = new ReentrantLock();
    private final Map<Integer, MapleMapObject> mapobjects = new HashMap<Integer, MapleMapObject>();
    private final Collection<Spawns> monsterSpawn = new LinkedList<Spawns>();
    private final AtomicInteger spawnedMonstersOnMap = new AtomicInteger(0);
    private final ReentrantReadWriteLock charactersLock = new ReentrantReadWriteLock();
    private final List<MapleCharacter> characters = new ArrayList<MapleCharacter>();
    private final Map<Integer, MaplePortal> portals = new HashMap<Integer, MaplePortal>();
    private final List<Rectangle> areas = new ArrayList<Rectangle>();
    private MapleFootholdTree footholds = null;
    private float monsterRate, recoveryRate;
    private MapleMapEffect mapEffect;
    private byte channel;
    private short decHP = 0, createMobInterval = 9000;
    private String fieldType = "";
    private int protectItem = 0, barrier = 0, mapid, returnMapId, timeLimit, fieldLimit, maxRegularSpawn = 0;
    private int forcedReturnMap = 999999999;
    private boolean town, clock, personalShop, everlast = false, dropsDisabled = false;
    private String mapName, streetName, onUserEnter, onFirstUserEnter, fieldScript;
    private Map<Integer, MapleNPC> tempnpcs3 = new HashMap<Integer, MapleNPC>();
    private Map<Integer, MapleMonster> tempmonsters3 = new HashMap<Integer, MapleMonster>();
    private WeakReference<MapleCharacter> changeMobOrigin = null;
    private List<Integer> droppedItems = new LinkedList<Integer>();
    private long maptimer = 0;
    public short soulamount;
    private Map<MapleMapObjectType, ReentrantReadWriteLock> mapobjectlocks;
    // private final ReentrantReadWriteLock charactersLock = new ReentrantReadWriteLock();

    private int runningOid = 500000;
    private final Lock runningOidLock = new ReentrantLock();
    private ScheduledFuture<?> catchstart = null;

    public boolean Mulung = false;
    private long lastPlayerLeft = System.currentTimeMillis();
    private int EliteMobCount;
    private int EliteMobCommonCount;
    private boolean elitebossmap;
    private boolean elitebossrewardmap;
    private List<ObtacleAtom> obtacleAtoms = new LinkedList<>();
    public String name[] = new String[10];
    public int voteamount = 0;
    public boolean dead = false, MapiaIng = false;
    public String names = "";
    public String deadname = "";
    public int MapiaChannel;
    public int aftertime, nighttime, votetime, nightnumber = 0;
    public int citizenmap1, citizenmap2, citizenmap3, citizenmap4, citizenmap5, citizenmap6, mapiamap, policemap, drmap, morningmap;
    public int playern;
    private MapleClient c;

    public MapleMap(final int mapid, final int channel, final int returnMapId, final float monsterRate) {
        this.mapid = mapid;
        this.channel = (byte) channel;
        this.returnMapId = returnMapId;
        this.monsterRate = monsterRate;
        EnumMap<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>> mapobj = new EnumMap<MapleMapObjectType, LinkedHashMap<Integer, MapleMapObject>>(MapleMapObjectType.class);
        for (MapleMapObjectType type : MapleMapObjectType.values()) {
            mapobj.put(type, new LinkedHashMap<Integer, MapleMapObject>());
        }
        /*
        if (isSwooBoss()) {
            resetObtacleAtom();
        }*/
    }

    public void MapiaMorning(final MapleCharacter player) {
        broadcastMessage(MainPacketCreator.getClock(aftertime));
        final Timer m_timer = new Timer();
        TimerTask m_task = new TimerTask() {
            public void run() {
                m_timer.cancel();
                MapiaVote(player);
            }
        };
        m_timer.schedule(m_task, aftertime * 1000);
    }

    public void MapiaVote(final MapleCharacter player) {
        broadcastMessage(MainPacketCreator.musicChange("Wps.img/VOTE"));
        broadcastMessage(MainPacketCreator.getClock(votetime));
        broadcastMessage(MainPacketCreator.serverNotice(5, "투표를 진행하시기 바랍니다. 제한시간은 30초 입니다."));
        names = "";
        for (MapleCharacter chr : getCharacters()) {
            names += chr.getName() + ",";
            chr.isVoting = true;
        }
        int i = 0;
        final Timer m_timer = new Timer();
        TimerTask m_task = new TimerTask() {
            public void run() {
                m_timer.cancel();
                MapiaCompare(player);

            }
        };
        m_timer.schedule(m_task, votetime * 1000);
    }

    public void MapiaComparable(final MapleCharacter player) {
        //final List<MapleCharacter> players = new ArrayList<MapleCharacter>();
        //players.addAll(getCharacters());
        int playernum = 0;
        for (MapleCharacter chr : getCharacters()) {
            playernum++;
        }
        int i = 0;
        int ii = 0;
        int iii = 0;
        int citizen = 0;
        String deadname = "";
        String deadjob = "";
        String guessname = "";
        for (MapleCharacter chr : getCharacters()) {
            if (chr.getpolicevote == 1 && !chr.isDead) {
                if (chr.mapiajob == "마피아") {
                    iii++;
                }
            }
            if (chr.getmapiavote == 1 && !chr.isDead) {
                if (chr.getdrvote < 1 && !chr.isDead) {
                    chr.isDead = true;
                    deadname = chr.getName();
                    deadjob = chr.mapiajob;
                    //chr.warp(ServerConstants.mainMap); //죽을시 가는맵
                    chr.Message(1, "당신은 마피아에게 암살 당하였습니다.");
                    i++;
                } else {
                    chr.dropMessage(6, "의사가 당신을 살렸습니다.");
                    ii++;
                }
            }
            if (chr.mapiajob == "시민" && !chr.isDead) {
                citizen++;
            }
        }
        for (MapleCharacter chr : getCharacters()) {
            if (iii > 0) {
                chr.dropMessage(6, "경찰은 마피아를 찾았습니다.");
            } else {
                chr.dropMessage(5, "경찰은 마피아를 찾지 못하였습니다.");
            }
            if (i == 0) {
                if (ii > 0) {
                    chr.dropMessage(6, "의사는 마피아가 암살하려던 사람을 살렸습니다.");
                } else {
                    chr.dropMessage(5, "마피아는 아무도 죽이지 못하였습니다.");
                }
            } else {
                chr.dropMessage(5, "의사는 아무도 살리지 못했습니다.");
                chr.dropMessage(5, "마피아는 " + deadname + "님을 죽였습니다. 그의 직업은 " + deadjob + " 이었습니다.");
            }
        }

        if (citizen == 0) {// 마피아 승
            final Timer m_timer = new Timer();
            TimerTask m_task = new TimerTask() {
                public void run() {
                    m_timer.cancel();
                    MapiaWin(player);
                }
            };
            m_timer.schedule(m_task, 15 * 1000);
        } else {
            MapiaMorning(player);
        }
    }

    public void MapiaWin(MapleCharacter player) {
        MapiaIng = false;
        nightnumber = 0;
        int chan;
        if (MapiaChannel == 1) {
            chan = 20;
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[마피아 알림] " + chan + "세이상 채널에서 마피아의 승리로 게임이 종료 되었습니다."));
        } else {
            chan = MapiaChannel + 1;
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[마피아 알림] " + chan + " 채널에서 마피아의 승리로 게임이 종료 되었습니다."));
        }
        int rand = Randomizer.rand(50, 100);
        for (MapleCharacter chr : getCharacters()) {
            if (chr.mapiajob.equals("마피아") && !chr.isDead) {
                chr.gainMeso(nightnumber * rand * 100000, false);
            }
            chr.isDead = false;
            chr.isDrVote = false;
            chr.isMapiaVote = false;
            chr.isPoliceVote = false;
            chr.getdrvote = 0;
            chr.getmapiavote = 0;
            chr.getpolicevote = 0;
            chr.voteamount = 0;
            chr.warp(ServerConstants.mainMap); // 퇴장맵
            chr.dropMessage(5, "수고하셨습니다. 이번 게임은 마피아의 승리입니다!!");
            chr.dropMessage(6, "마피아 게임 보상으로 소정의 메소를 지급해드렸습니다.");
        }
        return;
    }

    public void CitizenWin(MapleCharacter player) {
        MapiaIng = false;
        int chan;
        if (MapiaChannel == 1) {
            chan = 20;
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[마피아 알림] " + chan + "세이상 채널에서 시민의 승리로 게임이 종료 되었습니다."));
        } else {
            chan = MapiaChannel + 1;
            WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[마피아 알림] " + chan + " 채널에서 시민의 승리로 게임이 종료 되었습니다."));
        }
        int rand = Randomizer.rand(10, 80);
        int rand2 = Randomizer.rand(30, 100);
        for (MapleCharacter chr : getCharacters()) {
            if (chr.mapiajob.equals("시민") && !chr.isDead) {
                chr.gainMeso(nightnumber * rand * 100000, false);
            }
            if ((chr.mapiajob.equals("경찰") || chr.mapiajob.equals("의사")) && !chr.isDead) {
                chr.gainMeso(nightnumber * rand * 100000, false);
            }
            chr.isDead = false;
            chr.isDrVote = false;
            chr.isMapiaVote = false;
            chr.isPoliceVote = false;
            chr.getdrvote = 0;
            chr.getmapiavote = 0;
            chr.getpolicevote = 0;
            chr.voteamount = 0;
            chr.warp(ServerConstants.mainMap); // 퇴장맵
            chr.dropMessage(5, "수고하셨습니다. 이번 게임은 시민의 승리입니다!!");
            chr.dropMessage(6, "마피아 게임 보상으로 소정의 메소를 지급해드렸습니다.");
        }
        nightnumber = 0;
        return;
    }

    public void MapiaCompare(MapleCharacter player) {
        int[] voteamount = new int[playern];
        String[] charinfo = new String[2];
        int j = 0;
        for (MapleCharacter chr : getCharacters()) {
            if (!chr.isDead) {
                voteamount[j] = chr.voteamount;
                j++;
            }
        }
        int mapia = 0;
        Arrays.sort(voteamount);
        try {
            for (MapleCharacter chr : getCharacters()) {
                if (chr.voteamount == voteamount[playern - 1]) {
                    charinfo[0] = chr.getName();
                    charinfo[1] = chr.mapiajob;
                }
            }
            if (voteamount[playern - 1] == voteamount[playern - 2]) {
                for (MapleCharacter chr : getCharacters()) {
                    chr.dropMessage(6, "투표 결과 아무도 죽지 않았습니다.");
                    chr.dropMessage(5, "잠시 후 밤이 됩니다.");
                }
                MapiaNight(player);
            } else {
                for (MapleCharacter chr : getCharacters()) {
                    if (charinfo[0] == chr.getName()) {
                        chr.Message(1, "진행자>>당신은 투표 결과로 인해 처형당하였습니다.");
                        chr.isDead = true;
                    } else {
                        chr.dropMessage(6, "투표 결과 " + charinfo[0] + " 님이 처형당했습니다.");
                        chr.dropMessage(6, charinfo[0] + " 님의 직업은 " + charinfo[1] + " 입니다.");
                        chr.dropMessage(5, "잠시 후 밤이 됩니다.");
                    }
                    if (chr.mapiajob == "마피아" && !chr.isDead) {
                        mapia++;
                    }

                }

                if (mapia == 0) {
                    CitizenWin(player);
                } else {
                    MapiaNight(player);
                }

            }
        } catch (Exception e) {
            int chana;
            if (MapiaChannel == 1) {
                chana = 20;
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[마피아 알림] " + chana + "세이상 채널에서 게임이 다시 활성화 되었습니다."));
            } else {
                chana = MapiaChannel + 1;
                WorldBroadcasting.broadcast(MainPacketCreator.getGMText(8, "[마피아 알림] " + chana + " 채널에서 게임이 다시 활성화 되었습니다."));
            }
            MapiaIng = false;
            nightnumber = 0;
            for (MapleCharacter chr : getCharacters()) {
                chr.warp(ServerConstants.mainMap);
                chr.dropMessage(1, "오류 입니다. 운영자에게 문의 해 주세요.");
            }
            return;
        }
    }

    public void MapiaNight(final MapleCharacter player) {
        final int maps[] = {citizenmap1, citizenmap2, citizenmap3, citizenmap4, citizenmap5, citizenmap6}; // 시민밤맵
        nightnumber++;
        final Timer m_timer = new Timer();
        final List<MapleCharacter> chars = new ArrayList<MapleCharacter>();
        TimerTask m_task = new TimerTask() {
            int status = 0;

            public void run() {
                int citizen = 0;
                if (status == 0) {
                    names = "";
                    for (MapleCharacter chr : getCharacters()) {
                        if (!chr.isDead) {
                            chars.add(chr);
                            names += chr.getName() + ",";
                            chr.isDrVote = false;
                            chr.isMapiaVote = false;
                            chr.isPoliceVote = false;
                            chr.getdrvote = 0;
                            chr.getmapiavote = 0;
                            chr.getpolicevote = 0;
                            chr.voteamount = 0;
                            if (chr.mapiajob == "시민") {
                                chr.warp(maps[citizen]);
                                chr.dropMessage(5, nightnumber + "번째 밤이 되었습니다. 마피아, 경찰, 의사가 투표를 모두 할때까지 잠시만 기다려 주세요.");
                                citizen++;
                            } else if (chr.mapiajob == "마피아") {
                                chr.warp(mapiamap);
                                chr.isMapiaVote = true;
                                chr.dropMessage(5, nightnumber + "번째 밤이 되었습니다. 바로 옆의 엔피시를 통해 암살할 사람을 지목해 주세요. 제한시간은 " + nighttime + "초 입니다.");
                            } else if (chr.mapiajob == "경찰") {
                                chr.warp(policemap);
                                chr.isPoliceVote = true;
                                chr.dropMessage(5, nightnumber + "번째 밤이 되었습니다. 바로 옆의 엔피시를 통해 마피아 일것 같다는 사람을 지목 해 주세요. 제한시간은 " + nighttime + "초 입니다.");
                            } else if (chr.mapiajob == "의사") {
                                chr.warp(drmap);
                                chr.isDrVote = true;
                                chr.dropMessage(5, nightnumber + "번째 밤이 되었습니다. 바로 옆의 엔피시를 통해 살리고 싶은 사람을 지목 해 주세요. 제한시간은 " + nighttime + "초 입니다.");
                            }
                            chr.getClient().send(MainPacketCreator.getClock(nighttime));
                        }
                    }
                    status = 1;
                } else if (status == 1) {
                    for (MapleCharacter chr : chars) {
                        if (!chr.isDead) {
                            chr.isVoting = false;
                            chr.warp(morningmap); //아침맵
                            chr.dropMessage(6, "아침이 되었습니다. 투표 결과를 발표하겠습니다.");
                        }
                    }
                    m_timer.cancel();
                    chars.clear();
                    MapiaComparable(player);
                }
            }

        };
        m_timer.schedule(m_task, 3000, nighttime * 1000);
    }

    public final void toggleDrops() {
        this.dropsDisabled = !dropsDisabled;
    }

    public int EliteMobCount() {
        return this.EliteMobCount;
    }

    public int EliteMobCommonCount() {
        return this.EliteMobCommonCount;
    }

    public void SetEliteMobCount(int a) {
        this.EliteMobCount = a;
    }

    public void SetEliteMobCommonCount(int a) {
        this.EliteMobCommonCount = a;
    }

    public boolean isEliteBossMap() {
        return this.elitebossmap;
    }

    public void setEliteBossMap(boolean bool) {
        this.elitebossmap = bool;
    }

    public boolean isEliteBossRewardMap() {
        return this.elitebossrewardmap;
    }

    public void setEliteBossRewardMap(boolean bool) {
        this.elitebossrewardmap = bool;
    }

    public final int getId() {
        return mapid;
    }

    public boolean canDelete() {
        return (System.currentTimeMillis() - lastPlayerLeft > (30 * 60 * 1000L)) && (getCharactersSize() == 0);
    }

    public final MapleMap getReturnMap() {
        return ChannelServer.getInstance(channel).getMapFactory().getMap(returnMapId);
    }

    public final int getReturnMapId() {
        return returnMapId;
    }

    public final int getForcedReturnId() {
        return forcedReturnMap;
    }

    public final MapleMap getForcedReturnMap() {
        return ChannelServer.getInstance(channel).getMapFactory().getMap(forcedReturnMap);
    }

    public final void setForcedReturnMap(final int map) {
        this.forcedReturnMap = map;
    }

    public final float getRecoveryRate() {
        return recoveryRate;
    }

    public final void setRecoveryRate(final float recoveryRate) {
        this.recoveryRate = recoveryRate;
    }

    public final int getBarrier() {
        return barrier;
    }

    public final void setBarrier(final int barrier) {
        this.barrier = barrier;
    }

    public final int getFieldLimit() {
        return fieldLimit;
    }

    public final void setFieldLimit(final int fieldLimit) {
        this.fieldLimit = fieldLimit;
    }

    public final String getFieldType() {
        return fieldType;
    }

    public final void setFieldType(final String fieldType) {
        this.fieldType = fieldType;
    }

    public final void setCreateMobInterval(final short createMobInterval) {
        this.createMobInterval = createMobInterval;
    }

    public final void setTimeLimit(final int timeLimit) {
        this.timeLimit = timeLimit;
    }

    public final void setMapName(final String mapName) {
        this.mapName = mapName;
    }

    public final String getMapName() {
        return mapName;
    }

    public final String getStreetName() {
        return streetName;
    }

    public final void setChangeableMobOrigin(MapleCharacter d) {
        this.changeMobOrigin = new WeakReference<MapleCharacter>(d);
    }

    public final MapleCharacter getChangeableMobOrigin() {
        if (changeMobOrigin == null) {
            return null;
        }
        return changeMobOrigin.get();
    }

    public final void setFirstUserEnter(final String onFirstUserEnter) {
        this.onFirstUserEnter = onFirstUserEnter;
    }

    public final void setUserEnter(final String onUserEnter) {
        this.onUserEnter = onUserEnter;
    }

    public final void setFieldScript(final String fieldScript) {

    }

    public final boolean hasClock() {
        return clock;
    }

    public final void setClock(final boolean hasClock) {
        this.clock = hasClock;
    }

    public final boolean isTown() {
        return town;
    }

    public final void setTown(final boolean town) {
        this.town = town;
    }

    public final boolean allowPersonalShop() {
        return personalShop;
    }

    public final void setPersonalShop(final boolean personalShop) {
        this.personalShop = personalShop;
    }

    public final void setStreetName(final String streetName) {
        this.streetName = streetName;
    }

    public final void setEverlast(final boolean everlast) {
        this.everlast = everlast;
    }

    public final boolean getEverlast() {
        return everlast;
    }

    public final int getHPDec() {
        return decHP;
    }

    public final void setHPDec(final int delta) {
        decHP = (short) delta;
    }

    public final int getHPDecProtect() {
        return protectItem;
    }

    public final void setHPDecProtect(final int delta) {
        this.protectItem = delta;
    }

    public final int getCurrentPartyId() {
        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter chr;
            while (ltr.hasNext()) {
                chr = ltr.next();
                if (chr.getPartyId() != -1) {
                    return chr.getPartyId();
                }
            }
            return -1;
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    public final void addMapObject(final MapleMapObject mapobject) {
        mutex.lock();
        int newoid;
        try {
            newoid = ++runningOid;
            mapobject.setObjectId(newoid);
            mapobjects.put(newoid, mapobject);
        } finally {
            mutex.unlock();
        }
        if (mapobject.getType() == MapleMapObjectType.ITEM) {
            droppedItems.add(mapobject.getObjectId());
        }

    }

    private void spawnAndAddRangedMapObject(final MapleMapObject mapobject, final DelayedPacketCreation packetbakery, final SpawnCondition condition) {
        mutex.lock();
        try {
            runningOid++;
            mapobject.setObjectId(runningOid);
            mapobjects.put(runningOid, mapobject);

            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter chr;
            while (ltr.hasNext()) {
                chr = ltr.next();
                if (condition == null || condition.canSpawn(chr)) {
                    if (chr.getPosition().distanceSq(mapobject.getPosition()) <= GameConstants.maxViewRangeSq()) {
                        packetbakery.sendPackets(chr.getClient());
                        chr.addVisibleMapObject(mapobject);
                    }
                }
            }
        } finally {
            mutex.unlock();
        }
    }

    public final List<MapleMist> getMistInRange(final Point from, final double rangeSq, final List<MapleMapObjectType> MapObject_types) {
        final List<MapleMapObject> ret = new LinkedList<MapleMapObject>();
        final List<MapleMist> ret2 = new ArrayList<MapleMist>();
        mutex.lock();
        try {
            final Iterator<MapleMapObject> ltr = mapobjects.values().iterator();
            MapleMapObject obj;
            while (ltr.hasNext()) {
                obj = ltr.next();
                if (MapObject_types.contains(obj.getType())) {
                    if (from.distanceSq(obj.getPosition()) <= rangeSq) {
                        ret.add(obj);
                    }
                }
            }
        } finally {
            mutex.unlock();
        }
        return ret2;
    }

    public final List<MapleSummon> getSummonInRange(final Point from, final double rangeSq, final List<MapleMapObjectType> MapObject_types) {
        final List<MapleMapObject> ret = new LinkedList<MapleMapObject>();
        final List<MapleSummon> ret2 = new ArrayList<MapleSummon>();
        mutex.lock();
        try {
            final Iterator<MapleMapObject> ltr = mapobjects.values().iterator();
            MapleMapObject obj;
            while (ltr.hasNext()) {
                obj = ltr.next();
                if (MapObject_types.contains(obj.getType())) {
                    if (from.distanceSq(obj.getPosition()) <= rangeSq) {
                        ret.add(obj);
                    }
                }
            }
        } finally {
            mutex.unlock();
        }
        return ret2;
    }

    public final List<MapleWreckage> getWreckageInRange(final Point from, final double rangeSq, final List<MapleMapObjectType> MapObject_types) {
        final List<MapleWreckage> ret = new LinkedList<MapleWreckage>();
        mutex.lock();
        try {
            final Iterator<MapleMapObject> ltr = mapobjects.values().iterator();
            MapleMapObject obj;
            while (ltr.hasNext()) {
                obj = ltr.next();
                if (MapObject_types.contains(obj.getType())) {
                    if (from.distanceSq(obj.getPosition()) <= rangeSq) {
                        ret.add((MapleWreckage) obj);
                    }
                }
            }
        } finally {
            mutex.unlock();
        }
        return ret;
    }

    public final List<MapleRune> getRuneInRange(final Point from, final double rangeSq, final List<MapleMapObjectType> MapObject_types) {
        final List<MapleMapObject> mapobjects = this.getMapObjectsInRange(from, rangeSq);
        final List<MapleRune> runes = new ArrayList<MapleRune>();
        for (int i = 0; i < mapobjects.size(); i++) {
            if (mapobjects.get(i).getType() == MapleMapObjectType.RUNE) {
                runes.add((MapleRune) mapobjects.get(i));
            }
        }
        return runes;
    }

    public final MapleMapObject getMapObject(final int oid) {
        return mapobjects.get(oid);
    }

    public final MapleMapObject getMapObject(int oid, MapleMapObjectType type) {
        mutex.lock();
        try {
            return mapobjects.get(oid);
        } finally {
            mutex.unlock();
        }
    }

    public final void checkClockContact(final MapleCharacter chr, final MapleMonster monster) {
        final Point m_Pos = monster.getPosition();
        if (this.getFieldType().equals("63")) {
            for (MapleMapObject object : this.getMapObjectsInRange(chr.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MIST))) {
                final MapleMist clock = (MapleMist) object;
                if (clock.isClock()) {
                    Rectangle rect = new Rectangle(clock.getBox().x, clock.getBox().y, clock.getBox().width, clock.getBox().height);
                    if (rect.intersects(monster.getRectangle())) {
                        clock.setUsed(true);
                        chr.send(UIPacket.showInfo("반반이 시간을 움직임"));
                        return;
                    }
                }
            }
        }
    }

    public final void removeMapObject(final int num) {
        mutex.lock();
        try {
            mapobjects.remove(Integer.valueOf(num));
        } finally {
            mutex.unlock();
        }
        if (droppedItems.contains(Integer.valueOf(num))) {
            droppedItems.remove(Integer.valueOf(num));
        }

    }

    public final void removeMapObject(final MapleMapObject obj) {
        mutex.lock();
        try {
            if (obj.getType().equals(MapleMapObjectType.SUMMON)) {
                final MapleSummon summon = getSummonById(obj.getObjectId());
                if (summon != null) {
                    if (summon.getSkill() == 2111010) {
                        summon.getOwner().addSlimeVirusCount(-1);
                    }
                }
            }
            if (mapobjects.containsKey(Integer.valueOf(obj.getObjectId()))) {
                mapobjects.remove(Integer.valueOf(obj.getObjectId()));
            }
        } finally {
            mutex.unlock();
        }
        if (obj.getType() == MapleMapObjectType.ITEM) {
            if (droppedItems.contains(Integer.valueOf(obj.getObjectId()))) {
                droppedItems.remove(Integer.valueOf(obj.getObjectId()));
            }
        }
    }

    public final MapleSummon getSummonById(final int id) {
        for (MapleSummon summon : getAllSummon()) {
            if (summon.getObjectId() == id) {
                return summon;
            }
        }
        return null;
    }

    public final Point calcPointMaple(final Point initial) {
        final MapleFoothold fh = footholds.findMaple(initial);
        if (fh == null) {
//            System.out.println("[오류] 위치를 구하던 중 바닥의 풋홀드를 구하는데 실패했습니다.");
            return null;
        }
        int dropY = fh.getY1();
        if (!fh.isWall() && fh.getY1() != fh.getY2()) {
            final double s1 = Math.abs(fh.getY2() - fh.getY1());
            final double s2 = Math.abs(fh.getX2() - fh.getX1());
            if (fh.getY2() < fh.getY1()) {
                dropY = fh.getY1() - (int) (Math.cos(Math.atan(s2 / s1)) * (Math.abs(initial.x - fh.getX1()) / Math.cos(Math.atan(s1 / s2))));
            } else {
                dropY = fh.getY1() + (int) (Math.cos(Math.atan(s2 / s1)) * (Math.abs(initial.x - fh.getX1()) / Math.cos(Math.atan(s1 / s2))));
            }
        }
        return new Point(initial.x, dropY);
    }

    public final Point calcDropPos(final Point initial, final Point fallback) {
        final Point ret = calcPointMaple(new Point(initial.x, initial.y - 50));
        if (ret == null) {
            return fallback;
        }
        return ret;
    }

    private void dropFromMonster(final MapleCharacter chr, final MapleMonster mob) {
        final ItemInformation ii = ItemInformation.getInstance();
        final byte droptype = (byte) (mob.getStats().isExplosiveReward() ? 3 : mob.getStats().isFfaLoot() ? 2 : chr.getParty() != null ? 1 : 0);
        final int mobpos = mob.getTruePosition().x, cmServerrate = ChannelServer.getInstance(channel).getMesoRate(), chServerrate = ChannelServer.getInstance(channel).getDropRate();
        Item idrop;
        byte d = 1;
        Point pos = new Point(0, mob.getTruePosition().y);
        double showdown = 100.0;
        final MapleMonsterProvider mi = MapleMonsterProvider.getInstance();
        final List<MonsterDropEntry> derp = mi.retrieveDrop(mob.getId());
        final MapleClient c = null;
        if (derp == null) {
            return;
        }
        final List<MonsterDropEntry> dropEntry = new ArrayList<MonsterDropEntry>(derp);
        if (chr.isEquippedSoulWeapon()) {
            dropEntry.add(new MonsterDropEntry(4001536, Integer.MAX_VALUE, 1, Randomizer.rand(1, 3), (short) 0));
        }
        Collections.shuffle(dropEntry);
        boolean mesoDropped = false;
        int maxdrop = -1;
        if ((mob.getStats().isBoss()) && (ServerConstants.useBossMaxDrop)) {
            maxdrop = ServerConstants.bossMaxDrop;
        } else if ((!mob.getStats().isBoss()) && (ServerConstants.useMaxDrop)) {
            maxdrop = ServerConstants.maxDrop;
        }
        for (final MonsterDropEntry de : dropEntry) {
            if (de.itemId == mob.getStolen()) {
                continue;
            }
            if (de.itemId == 4000245) {
                return;
            }
            if ((Randomizer.nextInt(999999) < de.chance * chServerrate * (showdown / 100.0D)) && ((maxdrop == -1) || (d < maxdrop + 1))) {
                if (mesoDropped && droptype != 3 && de.itemId == 0) {
                    continue;
                }
                if (de.itemId / 10000 == 238 && !mob.getStats().isBoss()) {
                    continue;
                }
                if (droptype == 3) {
                    pos.x = (mobpos + (d % 2 == 0 ? (40 * (d + 1) / 2) : -(40 * (d / 2))));
                } else {
                    pos.x = (mobpos + ((d % 2 == 0) ? (25 * (d + 1) / 2) : -(25 * (d / 2))));
                }
                if (de.itemId == 0) {
                    int mesos = Randomizer.nextInt(1 + Math.abs(de.Maximum - de.Minimum)) + de.Minimum;
                    if (mesos > 0) {
                        spawnMobMesoDrop((int) (mesos * cmServerrate), calcDropPos(pos, mob.getTruePosition()), mob, chr, false, droptype);
                        mesoDropped = true;
                    }
                } else {
                    if (GameConstants.getInventoryType(de.itemId) == MapleInventoryType.EQUIP) {
                        idrop = ii.randomizeStats((Equip) ii.getEquipById(de.itemId));
                        if (idrop.getItemId() == 1000000) {
                            idrop = (Item) InventoryHandler.환생의불꽃((Equip) idrop);
                        }
                    } else {
                        final int range = Math.abs(de.Maximum - de.Minimum);
                        idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(range <= 0 ? 1 : range) + de.Minimum : 1), (byte) 0);
                    }
                    spawnMobDrop(idrop, calcDropPos(pos, mob.getTruePosition()), mob, chr, droptype, de.questid);
                }
                d++;
            }
        }
        final List<MonsterGlobalDropEntry> globalEntry = new ArrayList<MonsterGlobalDropEntry>(mi.getGlobalDrop());
        Collections.shuffle(globalEntry);
        for (final MonsterGlobalDropEntry de : globalEntry) {
            if (Randomizer.nextInt(999999) < de.chance) {
                if (de.itemId != 0) {
                    if (droptype == 3) {
                        pos.x = (mobpos + (d % 2 == 0 ? (40 * (d + 1) / 2) : -(40 * (d / 2))));
                    } else {
                        pos.x = (mobpos + ((d % 2 == 0) ? (25 * (d + 1) / 2) : -(25 * (d / 2))));
                    }
                    if (GameConstants.getInventoryType(de.itemId) == MapleInventoryType.EQUIP) {
                        idrop = ii.randomizeStats((Equip) ii.getEquipById(de.itemId));
                        if (idrop.getItemId() == 1000000) {
                            idrop = InventoryHandler.환생의불꽃((Equip) idrop);
                        }
                    } else {
                        idrop = new Item(de.itemId, (byte) 0, (short) (de.Maximum != 1 ? Randomizer.nextInt(de.Maximum - de.Minimum) + de.Minimum : 1), (byte) 0);
                    }
                    if (de.itemId == 4000421 && !chr.haveItem(2430492)) {
                        return;
                    }
                    if (de.itemId == 2022165) {
                        return;
                    }
                    if ((de.itemId == 4001513 && !(mob.getStats().getLevel() >= 105 && mob.getStats().getLevel() <= 114)) || (de.itemId == 4001515 && !(mob.getStats().getLevel() >= 115 && mob.getStats().getLevel() <= 159)) || (de.itemId == 4001521 && !(mob.getStats().getLevel() >= 160 && mob.getStats().getLevel() <= 250))) {
                        return;
                    }
                    spawnMobDrop(idrop, calcDropPos(pos, mob.getTruePosition()), mob, chr, droptype, de.questid);
                    d++;
                } else {
                    chr.modifyCSPoints(1, Randomizer.rand(50, 1000), true);
                }
            }
        }
    }

    private final void killMonster(final MapleMonster monster) { // For mobs with removeAfter
        spawnedMonstersOnMap.decrementAndGet();
        monster.setHp(0);
        monster.spawnRevives(this);
        broadcastMessage(MobPacket.killMonster(monster.getObjectId(), 1, GameConstants.isAswanMap(mapid)));
        removeMapObject(monster);
    }

    public final void killMonster(final MapleMonster monster, final MapleCharacter chr, final boolean withDrops, final boolean second, final byte animation) {
        if ((monster.getId() == 8810018 || monster.getId() == 8810122) && !second) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                    killMonster(monster, chr, true, true, (byte) 1);
                    killAllMonsters(true);
                }
            }, 3000);
            return;
        }

        MapleCharacter dropOwner = monster.killBy(chr);

        if (GameConstants.isZero(chr.getJob())) { //WP 흡수
            int wp = 1;
            chr.gainWP(wp);
            chr.send(MainPacketCreator.ZeroUpdate(chr));
            chr.send(MainPacketCreator.absorbingDF(monster.getObjectId(), chr.addWP(wp), wp, true, chr, chr.getTruePosition()));
            chr.send(MainPacketCreator.ZeroWP(wp));
        }

        if (chr.getMapId() == 105200812) {
            RaedMains(chr, monster);
        }
        if ((chr.getSkillLevel(4221013) > 0) && (chr.KillingPoint < 5)) {
            chr.KillingPoint += 1;
            chr.send(MainPacketCreator.KillingPoint(chr.KillingPoint));
        }

        broadcastMessage(MobPacket.killMonster(monster.getObjectId(), animation, GameConstants.isAswanMap(getId())));
        spawnedMonstersOnMap.decrementAndGet();
        removeMapObject(monster);

        if (monster.getBuffToGive() > -1) {
            final int buffid = monster.getBuffToGive();
            final SkillStatEffect buff = ItemInformation.getInstance().getItemEffect(buffid);
            charactersLock.readLock().lock();
            try {
                for (final MapleMapObject mmo : characters) {
                    final MapleCharacter c = (MapleCharacter) mmo;
                    if (c.isAlive()) {
                        buff.applyTo(c);
                        switch (monster.getId()) {
                            case 8810018:
                            case 8810122:
                            case 8820001:
                            case 8820101:
                                c.getClient().getSession().writeAndFlush(MainPacketCreator.showSkillEffect(-1, buffid, 20)); // HT nine spirit
                                broadcastMessage(c, MainPacketCreator.showSkillEffect(c.getId(), buffid, 20), false); // HT nine spirit
                                break;
                        }
                    }
                }
            } finally {
                charactersLock.readLock().unlock();
            }
        }
        final int mobid = monster.getId();

        if (monster.getId() == 8900100) {
            spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(8900101), monster.getPosition());
        } else if (monster.getId() == 8900101) {
            spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(8900102), monster.getPosition());
        } else if (monster.getId() == 8900000) {
            chr.getClient().getChannelServer().getMapFactory().getMap(105200610).spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(8900001), monster.getPosition());
        } else if (monster.getId() == 8900001) {
            chr.getClient().getChannelServer().getMapFactory().getMap(105200610).spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(8900002), monster.getPosition());
        }

        if (mobid == 8820008 || mobid == 8820108) { //wipe out statues and respawn
            for (final MapleMapObject mmo : getAllMonster()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getLinkOid() != monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                }
            }
        } else if (mobid >= 8820010 && mobid <= 8820014) {
            for (final MapleMapObject mmo : getAllMonster()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getId() != 8820000 && mons.getId() != 8820001 && mons.getObjectId() != monster.getObjectId() && mons.isAlive() && mons.getLinkOid() == monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                }
            }
        } else if (mobid >= 8820110 && mobid <= 8820114) {
            for (final MapleMapObject mmo : getAllMonster()) {
                MapleMonster mons = (MapleMonster) mmo;
                if (mons.getId() != 8820100 && mons.getId() != 8820101 && mons.getObjectId() != monster.getObjectId() && mons.isAlive() && mons.getLinkOid() == monster.getObjectId()) {
                    killMonster(mons, chr, false, false, animation);
                }
            }
        } else if (mobid >= 8810102 && mobid <= 8810109) {
            boolean notyetdead = false;
            for (int i = 8810102; i < 8810109; i++) {
                if (getMonsterById(i) != null) {
                    notyetdead = true;
                    break;
                }
            }
            if (!notyetdead) {
                killMonster(getMonsterById(8810122), chr, false, false, (byte) 0);
            }
        } else if (mobid >= 8850000 && mobid <= 8850003) {
            spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobid + 1), new Point(-363, 100));
        } else if (mobid == 8850004) {
            spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(8850012), new Point(-363, 100));
        } else if (mobid == 8800002 || mobid == 8800102 || mobid == 8800022) { //자쿰
            killAllMonsters(true);
        }
        if (mobid == 8800102) { //카오스자쿰
            chr.setExpeditionKilledBoss(true);
        }
        if (mobid == 8840000) { //반레온
            chr.setExpeditionKilledBoss(true);
        }
        switch (mapid) {
            case 105200130:
            case 105200200:
            case 105200300:
            case 105200400:
            case 105200140:
            case 105200210:
            case 105200313:
            case 105200411:
                if (chr.getClient().getChannelServer().getMapFactory().getMap(mapid).getAllMonster().size() == 0) {
                    broadcastMessage(MainPacketCreator.showEffect("Gstar/ClearS"));
                }
        }

        if (withDrops) {
            if (dropOwner == null) {
                dropOwner = chr;
            }
            dropFromMonster(dropOwner, monster);
        }

        if (getId() == 330003100 && monster.getId() == 2700100) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        if (!spawncheck[0]) {
                            chr.getClient().getChannelServer().getMapFactory().getMap(330003500).spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(2700104), chr.getPosition());
                            spawncheck[0] = true;
                        }
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(330003500), chr.getClient().getChannelServer().getMapFactory().getMap(330003500).getPortal(0));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 330003500 && monster.getId() == 2700104) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        if (!spawncheck[0]) {
                            chr.getClient().getChannelServer().getMapFactory().getMap(330003400).spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(2700103), chr.getPosition());
                            spawncheck[0] = true;
                        }
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(330003400), chr.getClient().getChannelServer().getMapFactory().getMap(330003400).getPortal(0));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 330003400 && monster.getId() == 2700103) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        if (!spawncheck[0]) {
                            chr.getClient().getChannelServer().getMapFactory().getMap(330003200).spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(2700101), chr.getPosition());
                            spawncheck[0] = true;
                        }
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(330003200), chr.getClient().getChannelServer().getMapFactory().getMap(330003200).getPortal(0));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 330003200 && monster.getId() == 2700101) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000000), chr.getClient().getChannelServer().getMapFactory().getMap(100000000).getPortal(0));
                        }
                    } else {
                        if (!spawncheck[0]) {
                            chr.getClient().getChannelServer().getMapFactory().getMap(330003300).spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(2700102), chr.getPosition());
                            spawncheck[0] = true;
                        }
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(330003300), chr.getClient().getChannelServer().getMapFactory().getMap(330003300).getPortal(0));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 330003300 && monster.getId() == 2700102) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        if (!spawncheck[0]) {
                            chr.getClient().getChannelServer().getMapFactory().getMap(330005400).spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(2700200), chr.getPosition());
                            spawncheck[0] = true;
                        }
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(330005400), chr.getClient().getChannelServer().getMapFactory().getMap(330005400).getPortal(0));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 330005400 && monster.getId() == 2700200) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 구관탈환에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        }

        if (getId() == 272000310 && monster.getId() == 9101078) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 늑대 벼락 격파에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        }

        if (getId() == 970072300 && monster.getId() == 8881000) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 최강보스 우르스 격파에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        }

        if (getId() == 450004900 && monster.getId() == 8880151) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 몽환의 루시드 격파에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        }

        if (getId() == 931050800 && monster.getId() == 9300003) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 EASY MODE - 미스틱 필드 격파에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 931050810 && monster.getId() == 9300594) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 NORMMAL MODE - 미스틱 필드 격파에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 931050810 && monster.getId() == 9300608) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 HARD MODE - 미스틱 필드 격파에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 931050810 && monster.getId() == 9300608) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000000), chr.getClient().getChannelServer().getMapFactory().getMap(100000000).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000000), chr.getClient().getChannelServer().getMapFactory().getMap(100000000).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 HARD MODE - 미스틱 필드 격파에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        } else if (getId() == 931050820 && monster.getId() == 9300600) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (chr.getParty() == null) {
                        for (MapleMapObject mcr : chr.getMap().getAllPlayer()) {
                            MapleCharacter mcrr = (MapleCharacter) mcr;
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                        }
                    } else {
                        for (MaplePartyCharacter mcr : chr.getParty().getMembers()) {
                            MapleCharacter mcrr = ChannelServer.getInstance(chr.getClient().getChannel()).getPlayerStorage().getCharacterByName(mcr.getName());
                            mcrr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(100000027), chr.getClient().getChannelServer().getMapFactory().getMap(100000027).getPortal(0));
                            mcrr.getMap().broadcastMessage(MainPacketCreator.getGMText(21, "" + mcrr.getName() + "님의 파티가 [" + chr.getClient().getChannel() + "]채널에서 ULTIMATE MODE - 미스틱 필드 격파에 성공 하였습니다. 모두 축하해주세요"));
                        }
                    }
                }
            }, 7000);
        }

        //ULTIMATE
        if (!this.isEliteBossMap() && !monster.isEliteMonster() && !monster.isEliteBoss() && !monster.getStats().isBoss() && monster.getStats().getLevel() - 20 <= chr.getLevel() && chr.getLevel() <= monster.getStats().getLevel() + 20) {
            SetEliteMobCommonCount(this.EliteMobCommonCount + 1);
        } else if (monster.isEliteMonster()) {
            broadcastMessage(MainPacketCreator.startMapEffect("어두운 기운이 사라지지 않아 이곳을 음산하게 만들고 있습니다.", 5120124, true));
            monster.setEliteMonster(false);
            timeAllPlayer(this);
        }
        if (this.EliteMobCommonCount == 200) {
            SetEliteMobCommonCount(0);
            MapleMonster elite = makeEliteMonster(monster);
            spawnMonster(elite, -2);
            broadcastMessage(UIPacket.playSpecialMapSound("Field.img/eliteMonster/Regen"), chr.getPosition());
            broadcastMessage(MainPacketCreator.startMapEffect("어두운 기운과 함께 강력한 몬스터가 출현합니다.", 5120124, true));
            timeAllPlayer(this);
        }
    }

    public MapleMonster makeEliteMonster(final MapleMonster monster) {
        final MapleMonster elite = MapleLifeProvider.getMonster(monster.getId());
        final OverrideMonsterStats ostats = new OverrideMonsterStats();
        final MapleMonsterStats stats = elite.getStats();
        elite.setEliteMonster(true);
        elite.setEliteType(Randomizer.rand(0x70, 0x88));
        ostats.setOHp(elite.getMobMaxHp() * 30);
        ostats.setOMp(elite.getMobMaxMp());
        ostats.setOPad(stats.getPad() * 8);
        ostats.setOPhysicalDefense(stats.getPhysicalDefense());
        ostats.setOMad(stats.getMad() + 60);
        ostats.setOMagicDefense(stats.getMagicDefense());
        ostats.setOSpeed(stats.getSpeed() + 30);
        ostats.setOAcc(stats.getAcc());
        ostats.setOEva(stats.getEva());
        ostats.setOPushed(stats.getPushed() * 2);
        ostats.setOLevel(stats.getLevel());
        elite.setOverrideStats(ostats);
        elite.setPosition(monster.getTruePosition());
        elite.setFh(monster.getFh());
        return elite;
    }

    public MapleMonster makeEliteMonster(final MapleMonster monster, final Point ps) {
        final MapleMonster elite = MapleLifeProvider.getMonster(monster.getId());
        final OverrideMonsterStats ostats = new OverrideMonsterStats();
        final MapleMonsterStats stats = elite.getStats();
        elite.setEliteMonster(true);
        elite.setEliteType(Randomizer.rand(0x70, 0x88));
        ostats.setOHp(elite.getMobMaxHp() * 30);
        ostats.setOMp(elite.getMobMaxMp());
        ostats.setOPad(stats.getPad() * 8);
        ostats.setOPhysicalDefense(stats.getPhysicalDefense());
        ostats.setOMad(stats.getMad() + 60);
        ostats.setOMagicDefense(stats.getMagicDefense());
        ostats.setOSpeed(stats.getSpeed() + 30);
        ostats.setOAcc(stats.getAcc());
        ostats.setOEva(stats.getEva());
        ostats.setOPushed(stats.getPushed() * 2);
        ostats.setOLevel(stats.getLevel());
        elite.setOverrideStats(ostats);
        elite.setPosition(ps);
        elite.setFh(monster.getFh());
        return elite;
    }

    public MapleMonster makeEliteBoss(final MapleMonster sourcemob, final MapleMonster sourceboss) {
        final MapleMonster eliteboss = MapleLifeProvider.getMonster(sourceboss.getId());
        final OverrideMonsterStats ostats = new OverrideMonsterStats();
        eliteboss.setEliteBoss(true);
        eliteboss.setEliteType(Randomizer.rand(0x64, 0x88));
        ostats.setOHp(sourcemob.getMobMaxHp() * 75); //필드몹의 75배
        ostats.setOMp(sourcemob.getMobMaxMp());
        ostats.setOPad(0);
        ostats.setOPhysicalDefense(sourcemob.getStats().getPhysicalDefense());
        ostats.setOMad((int) (sourcemob.getStats().getMad() * 2.5));
        ostats.setOMagicDefense(sourcemob.getStats().getMagicDefense());
        ostats.setOSpeed(sourcemob.getStats().getSpeed() + 35);
        ostats.setOAcc(sourcemob.getStats().getAcc());
        ostats.setOEva(sourcemob.getStats().getEva());
        ostats.setOPushed(0);
        ostats.setOLevel(sourcemob.getStats().getLevel());
        ostats.setOExp(0);
        eliteboss.setOverrideStats(ostats);
        eliteboss.setFh(sourcemob.getFh());
        return eliteboss;
    }

    private void time(final MapleCharacter chr) {
        MapTimer.getInstance().schedule(new Runnable() {
            public final void run() {
                chr.send(MainPacketCreator.removeMapEffect());
            }
        }, 5000L);
    }

    public void timeAllPlayer(final MapleMap map) {
        MapTimer.getInstance().schedule(new Runnable() {
            public final void run() {
                broadcastMessage(MainPacketCreator.removeMapEffect());
            }
        }, 5000L);
    }

    private void AlarmEliteBoss(final MapleMap currentmap, final MapleCharacter player, final int mobid) {
        Timer timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public final void run() {
                if (currentmap.isEliteBossMap()) {
                    MapleWorldMapProvider mwmp = ChannelServer.getInstance(player.getClient().getChannel()).getMapFactory();
                    Iterator itr = mwmp.getMaps().values().iterator();
                    while (itr.hasNext()) {
                        MapleMap target = ((MapleMap) itr.next());
                        if (target.getReturnMapId() == currentmap.getReturnMapId()) {
                            target.broadcastMessage(UIPacket.eliteBossNotice(2, currentmap.getId(), mobid));
                        }
                    }
                    mwmp = null;
                    itr = null;
                } else {
                    this.cancel();
                }
            }
        }, 0, 30000);
    }

    private void CancelEliteBossAlarm(final MapleMap currentmap, final MapleCharacter player) {
        MapleWorldMapProvider mwmp = ChannelServer.getInstance(player.getClient().getChannel()).getMapFactory();
        Iterator itr = mwmp.getMaps().values().iterator();
        while (itr.hasNext()) {
            MapleMap target = ((MapleMap) itr.next());
            if (target.getReturnMapId() == currentmap.getReturnMapId()) {
                target.broadcastMessage(UIPacket.eliteBossNotice(1, currentmap.getId(), 0));
            }
        }
        mwmp = null;
        itr = null;
    }

    public final void killAllMonsters(final boolean animate) {
        for (final MapleMapObject m : getAllMonster()) {
            MapleMonster monster = (MapleMonster) m;
            spawnedMonstersOnMap.decrementAndGet();
            monster.setHp(0);
            broadcastMessage(MobPacket.killMonster(monster.getObjectId(), animate ? 1 : 0, GameConstants.isAswanMap(mapid)));
            removeMapObject(monster);
        }
    }

    public final void killMonster(final int monsId) {
        for (final MapleMapObject mmo : getAllMonster()) {
            if (((MapleMonster) mmo).getId() == monsId) {
                broadcastMessage(MobPacket.killMonster(mmo.getObjectId(), 1, GameConstants.isAswanMap(mapid)));
                spawnedMonstersOnMap.decrementAndGet();
                removeMapObject(mmo);
                break;
            }
        }
    }

    public final void destroyReactor(final int oid) {
        final MapleReactor reactor = getReactorByOid(oid);
        if (reactor == null) {
            return;
        }
        broadcastMessage(MainPacketCreator.destroyReactor(reactor));
        reactor.setAlive(false);
        removeMapObject(reactor);
        reactor.setTimerActive(false);

        if (reactor.getDelay() > 0) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    respawnReactor(reactor);
                }
            }, reactor.getDelay());
        }
    }


    /*
     * command to reset all item-reactors in a map to state 0 for GM/NPC use - not tested (broken reactors get removed
     * from mapobjects when destroyed) Should create instances for multiple copies of non-respawning reactors...
     */
    public final void resetReactors(MapleClient c) {
        setReactorState(c, (byte) 0);
    }

    public final void setReactorState(MapleClient c) {
        setReactorState(c, (byte) 1);
    }

    public final void setReactorState(MapleClient c, byte state) {
        for (final MapleMapObject o : getAllReactor()) {
            ((MapleReactor) o).setState(state);
            ((MapleReactor) o).setTimerActive(false);
            broadcastMessage(MainPacketCreator.triggerReactor((MapleReactor) o, 1, c.getPlayer().getId()));
        }
    }

    /*
     * command to shuffle the positions of all reactors in a map for PQ purposes (such as ZPQ/LMPQ)
     */
    public final void shuffleReactors() {
        List<Point> points = new ArrayList<Point>();
        for (final MapleMapObject o : getAllReactor()) {
            points.add(((MapleReactor) o).getPosition());
        }
        Collections.shuffle(points);
        for (final MapleMapObject o : getAllReactor()) {
            ((MapleReactor) o).setPosition(points.remove(points.size() - 1));
        }
    }

    /**
     * Automagically finds a new controller for the given monster from the chars
     * on the map...
     *
     * @param monster
     */
    public final void updateMonsterController(final MapleMonster monster) {
        if (!monster.isAlive()) {
            return;
        }
        if (monster.getController() != null) {
            if (monster.getController().getMap() != this) {
                monster.getController().stopControllingMonster(monster);
            } else {
                return;
            }
        }
        int mincontrolled = -1;
        MapleCharacter newController = null;
        charactersLock.readLock().lock();
        try {
            Iterator ltr = this.characters.iterator();
            while (ltr.hasNext()) {
                MapleCharacter chr = (MapleCharacter) ltr.next();
                if ((!chr.isHidden()) && ((chr.getControlledMonsters().size() < mincontrolled) || (mincontrolled == -1))) {
                    mincontrolled = chr.getControlledMonsters().size();
                    newController = chr;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        if (newController != null) {
            if (monster.isFirstAttack() && monster.getId() != 8220028) {
                newController.controlMonster(monster, true);
                if (monster.getId() != 8220028) {
                    monster.setControllerHasAggro(true);
                    monster.setControllerKnowsAboutAggro(true);
                }
            } else {
                newController.controlMonster(monster, false);
            }
        }
    }

    public final int containsNPC(final int npcid) {
        for (MapleMapObject obj : getAllNPC()) {
            if (((MapleNPC) obj).getId() == npcid) {
                return obj.getObjectId();
            }
        }
        return -1;
    }

    public MapleMonster getMonsterById(int id) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            MapleMonster ret = null;
            Iterator<MapleMapObject> itr = getAllMonster().iterator();
            while (itr.hasNext()) {
                MapleMonster n = (MapleMonster) itr.next();
                if (n.getId() == id) {
                    ret = n;
                    break;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    public int countMonsterById(int id) {
        mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().lock();
        try {
            int ret = 0;
            Iterator<MapleMapObject> itr = getAllMonster().iterator();
            while (itr.hasNext()) {
                MapleMonster n = (MapleMonster) itr.next();
                if (n.getId() == id) {
                    ret++;
                }
            }
            return ret;
        } finally {
            mapobjectlocks.get(MapleMapObjectType.MONSTER).readLock().unlock();
        }
    }

    /**
     * returns a monster with the given oid, if no such monster exists returns
     * null
     *
     * @param oid
     * @return
     */
    public final MapleMonster getMonsterByOid(final int oid) {
        final MapleMapObject mmo = getMapObject(oid);
        if (mmo == null) {
            return null;
        }
        if (mmo.getType() == MapleMapObjectType.MONSTER) {
            return (MapleMonster) mmo;
        }
        return null;
    }

    public final MapleNPC getNPCByOid(final int oid) {
        final MapleMapObject mmo = getMapObject(oid);
        if (mmo == null) {
            return null;
        }
        if (mmo.getType() == MapleMapObjectType.NPC || mmo.getType() == MapleMapObjectType.PLAYERNPC) {

            return (MapleNPC) mmo;
        }
        return null;
    }

    public final MapleNPC getNPCById(final int id) {
        for (MapleMapObject hmo : getAllNPC()) {
            MapleNPC d = (MapleNPC) hmo;
            if (d.getId() == id) {
                return d;
            }
        }
        return null;
    }

    public final MapleReactor getReactorByOid(final int oid) {
        final MapleMapObject mmo = getMapObject(oid);
        if (mmo == null) {
            return null;
        }
        if (mmo.getType() == MapleMapObjectType.REACTOR) {
            return (MapleReactor) mmo;
        }
        return null;
    }

    public final MapleReactor getReactorByName(final String name) {
        for (final MapleMapObject obj : getAllReactor()) {
            if (((MapleReactor) obj).getName().equals(name)) {
                return (MapleReactor) obj;
            }
        }
        return null;
    }

    public final MapleReactor getReactor(final int rid) {
        for (final MapleMapObject obj : getAllReactor()) {
            if (((MapleReactor) obj).getReactorId() == rid) {
                return (MapleReactor) obj;
            }
        }
        return null;
    }

    public final void spawnTempNpc(final int id, final int x, final int y, final int owner) {
        final MapleNPC npc = MapleLifeProvider.getNPC(id);
        final Point pos = new Point(x, y);
        npc.setPosition(pos);
        npc.setCy(y);
        npc.setRx0(x + 50);
        npc.setRx1(x - 50);
        npc.setFh(getFootholds().findMaple(pos).getId());
        npc.setTemp(true);
        addMapObject(npc);
        tempnpcs3.put(owner, npc);
        charactersLock.readLock().lock();
        try {
            for (MapleMapObject mo : characters) {
                MapleCharacter hp = ((MapleCharacter) mo);
                if (hp.getId() == owner) {
                    hp.send(MainPacketCreator.spawnNPC(npc, true));
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    public void setTyep(int tyep) {

        this.tyep = tyep;

    }

    public int getTyep() {

        return tyep;

    }

    public void RaedMains(MapleCharacter chr, MapleMonster monster) {

        if (tyep == 0) {

            Raed_a++;
            this.broadcastMessage(UIPacket.greenShowInfo("" + monster.getStats().getName() + "  " + Raed_a + " / 170 "));

            if (Raed_a == 10 || Raed_a == 50 || Raed_a == 80 || Raed_a == 160) {

                for (int i = 0; i < 50; i++) {

                    monster = MapleLifeProvider.getMonster(9300826);
                    this.spawnMonsterOnGroundBelow(monster, new Point(-548, 445));
                }
            } else if (Raed_a == 170) {

                Raed_a = 0;
                tyep = 1;
                RisTimer(chr);

            }

        } else if (tyep == 1) {

            if (monster.getId() == 9500365) {

                tyep = 2;
                RisTimer(chr);
            }

        } else if (tyep == 2) {

            if (monster.getId() == 8230033) {

                tyep = 3;
                RisTimer(chr);
            }

        } else if (tyep == 3) {

            if (monster.getId() == 9305676) {

                tyep = 0;
                RisTimer(chr);
                chr.send(MainPacketCreator.removeMapEffect());
                chr.setKeyValue2("Raed", 0);
                RaedTimer(chr);
                chr.dropShowInfo("모든 스테이지를 클리어 하셨습니다. 랭킹과 아이템을 확인해보세요");
                chr.gainItem(4310210, 1);
                return;

            }
        }
    }

    public void RaedTimer(MapleCharacter chr) {

        Calendar cal = Calendar.getInstance();

        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int date = cal.get(Calendar.DATE);
        int hour = cal.get(Calendar.HOUR);
        int min = cal.get(Calendar.MINUTE);

        String days = year + "년 " + month + "월 " + date + "일 " + hour + "시 " + min + "분 ";

        Connection con = null;
        PreparedStatement pr = null;
        ResultSet rs = null;

        try {

            con = MYSQL.getConnection();
            pr = con.prepareStatement("SELECT * FROM raed WHERE Name = ?");
            pr.setString(1, chr.getName());

            rs = pr.executeQuery();

            while (rs.next()) {

                pr = con.prepareStatement("UPDATE raed SET ran = ? , countta = ? WHERE Name = ?");
                pr.setString(1, days);
                pr.setInt(2, rs.getInt("countta") + 1);
                pr.setString(3, chr.getName());
                pr.executeUpdate();
                con.close();
                pr.close();
                rs.close();
                return;

            }

            pr = con.prepareStatement("INSERT INTO raed (Name, ran, countta) VALUES (?, ?, ?)");
            pr.setString(1, chr.getName());
            pr.setString(2, days);
            pr.setInt(3, 1);
            pr.executeUpdate();
            con.close();
            pr.close();
            rs.close();
            return;

        } catch (SQLException e) {

        }
    }

    public void Raed(MapleCharacter chr, MapleMonster monster) {

        int mobae[] = {2022433, 2023236};
        int ran = (int) (Math.random() * mobae.length);

        IItem item = (IItem) ItemInformation.getInstance().getItemData(mobae[ran]);

        spawnMobDrop(item, monster.getPosition(), monster, chr, item.getType(), 1);

    }

    public void RisTimer(final MapleCharacter chr) {

        killAllMonsters(true);
        broadcastMessage(MainPacketCreator.showEffect("Gstar/clearS"));
        chr.setKeyValue2("Raed", chr.getKeyValue2("Raed") + 1);
        broadcastMessage(MainPacketCreator.getClock(10));
        catchstart = MapTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                chr.warp(105200812);
                return;
            }
        }, 10000);
    }

    public void Ris(final MapleCharacter chr) {

        String text = "";

        ArrayList<Integer> Timer = new ArrayList<>();

        MapleMonster monster = null;
        String eff[] = new String[2];
        int size = 0;
        int monsterid[] = new int[2];
        Point point = null;

        switch (chr.getKeyValue2("Raed")) {

            case 1:
                eff[0] = "defense/count/ " + chr.getKeyValue2("moba");
                Timer.add(100000);
                Timer.add(1000); // 시간초
                size = 40; // 몬스터 마리수
                monsterid[0] = 9300826;
                monsterid[1] = 9300471;  // 앞이 서브몬스터 뒤에가 보스
                text = "소환된 몬스터 170 마리를 처치해주세요 ";
                break;
            case 2:
                eff[0] = "defense/count/ " + chr.getKeyValue2("moba");
                Timer.add(90000);
                Timer.add(90);
                size = 15;
                monsterid[0] = 9500617;
                monsterid[1] = 9500365;
                text = "미빈들 사이를 피해서 상자를 처치해주세요 미니빈들을 공격하면 안됩니다 ";
                break;
            case 3:
                eff[0] = "defense/count/ " + chr.getKeyValue2("moba");
                Timer.add(60000);
                Timer.add(60);
                size = 1;
                monsterid[0] = 8230033;
                monsterid[1] = 9305676;
                text = "60초 시간동안 결계기를 처치해주세요 몬스터는 데미지를 입지 않습니다. ";
                break;
            case 4:
                eff[0] = "defense/count/ " + chr.getKeyValue2("moba");
                Timer.add(300000);
                Timer.add(300);
                size = 30;
                monsterid[0] = 9300826;
                monsterid[1] = 9305676;
                text = "아주 막강한 몬스터가 소환되었습니다 몬스터를 처치해주세요";
                break;
            case 5:
                text = "";
                break;
        }

        chr.dropShowInfo(text);
        broadcastMessage(MainPacketCreator.showEffect(eff[0]));
        Effs(size, monsterid);
        TimerLed(chr, Timer.get(0), Timer.get(1));
        Timer.remove(Timer);
        chr.getAllBuffs().remove(chr.getAllBuffs());

    }

    public void TimerLed(final MapleCharacter chr, int Timers, int are) {

        broadcastMessage(MainPacketCreator.getClock(are));
        catchstart = MapTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                chr.dropMessage(5, "[시스템] 시간이 되어 대기실로 퇴장되었습니다.");
                chr.warp(100000027);
                catchstart.cancel(true);
                return;
            }
        }, Timers);
    }

    public void Effs(int size, int[] mobida) {

        broadcastMessage(MainPacketCreator.showEffect("defense/count"));

        catchstart = MapTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {

                broadcastMessage(MainPacketCreator.showEffect("killing/first/start"));
                catchstart.cancel(true);
            }
        }, 2700);
        catchstart = MapTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {

                if (tyep == 0) {

                    for (int i = 0; i < size; i++) {

                        spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobida[0]), new Point(-340, 445));
                    }
                    spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobida[1]), new Point(102, 445));

                } else if (tyep == 1) {

                    for (int i = 0; i < size; i++) {

                        spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(9500617), new Point(-548, 445));
                    }
                    spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobida[1]), new Point(959, 445));

                } else if (tyep == 2) {

                    for (int i = 0; i < size; i++) {

                        spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobida[0]), new Point(18, 445));
                    }
                    spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobida[1]), new Point(-316, 445));

                } else if (tyep == 3) {

                    for (int i = 0; i < size; i++) {

                        spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobida[0]), new Point(-548, 445));
                    }
                    spawnMonsterOnGroundBelow(MapleLifeProvider.getMonster(mobida[1]), new Point(102, 445));

                }

                catchstart.cancel(true);
            }
        }, 4200);

    }

    public final void removeTempNpc(final int id, final int owner) {

        for (final MapleMapObject npcmo : getAllNPC()) {
            final MapleNPC npc = (MapleNPC) npcmo;
            if (npc.isTemp() && npc.getId() == id && tempnpcs3.get(owner).getId() == id) {
                broadcastMessage(MainPacketCreator.removeNPC(npc.getObjectId()));
                removeMapObject(npc);
            }
        }
    }

    public final void spawnNpc(final int id, final Point pos) {
        final MapleNPC npc = MapleLifeProvider.getNPC(id);
        npc.setPosition(pos);
        npc.setCy(pos.y);
        npc.setRx0(pos.x + 50);
        npc.setRx1(pos.x - 50);
        npc.setFh(getFootholds().findMaple(pos).getId());
        npc.setCustom(true);
        addMapObject(npc);
        broadcastMessage(MainPacketCreator.spawnNPC(npc, true));
    }

    public final void removeNpc(final int id) {
        Iterator<MapleMapObject> itr = getAllNPC().iterator();
        while (itr.hasNext()) {
            MapleNPC npc = (MapleNPC) itr.next();
            if (npc.isCustom() && (id == -1 || npc.getId() == id)) {
                broadcastMessage(MainPacketCreator.removeNPCController(npc.getObjectId()));
                broadcastMessage(MainPacketCreator.removeNPC(npc.getObjectId()));
                removeMapObject(npc);
                break;
            }
        }
    }

    public final void spawnMonster_sSack(final MapleMonster mob, final Point pos, final int spawnType) {
        spawnMonster_sSack(mob, pos, spawnType, 0);
    }

    public final void spawnMonster_sSack(final MapleMonster mob, final Point pos, final int spawnType, int effect) {
        final Point spos = calcPointMaple(new Point(pos.x, pos.y - 100));
        mob.setPosition(spos);
        spawnMonster(mob, spawnType, effect);
    }

    public final int getMapId() {
        return mapid;
    }

    public final void spawnMonsterOnGroundBelow(final MapleMonster mob, final Point pos) {
        spawnMonster_sSack(mob, pos, -2);
    }

    public final void spawnMonsterOnGroundBelow(final short level, final MapleMonster mob, final Point pos) {
        spawnMonster_sSack(mob, pos, -2);
    }

    public final void spawnTempMonster(final int key, final int id, final Point pos) {
        if (tempmonsters3.containsKey(key) && getAllPlayer().size() == 1) {
            killMonster(tempmonsters3.get(key));
        }
        final MapleMonster mob = MapleLifeProvider.getMonster(id);
        tempmonsters3.put(key, mob);
        spawnMonsterOnGroundBelow(mob, pos);
    }

    public final void spawnZakum(final Point pos) {
        final Point spos = calcPointMaple(new Point(pos.x, pos.y - 100));
        final int[] zakpart = {8800002, 8800003, 8800004, 8800005, 8800006, 8800007,
            8800008, 8800009, 8800010};

        for (final int i : zakpart) {
            final MapleMonster part = MapleLifeProvider.getMonster(i);
            part.setFake(true);
            part.setPosition(spos);
            spawnFakeMonster(part);
        }
    }

    public final void spawnChaosZakum(final int x, final int y) {
        final Point pos = new Point(x, y);
        final MapleMonster mainb = MapleLifeProvider.getMonster(8800100);
        final Point spos = calcPointMaple(new Point(pos.x, pos.y - 100));
        mainb.setPosition(spos);
        mainb.setFake(true);

        // Might be possible to use the map object for reference in future.
        spawnFakeMonster(mainb);

        final int[] zakpart = {8800103, 8800104, 8800105, 8800106, 8800107,
            8800108, 8800109, 8800110};

        for (final int i : zakpart) {
            final MapleMonster part = MapleLifeProvider.getMonster(i);
            part.setPosition(spos);

            spawnMonster(part, -2);
        }
    }

    public final void spawnFakeMonsterOnGroundMaple(final MapleMonster mob, final Point pos) {
        Point spos = new Point(pos.x, pos.y - 100);
        spos = calcPointMaple(spos);
        spos.y -= 1;
        mob.setPosition(spos);
        spawnFakeMonster(mob);
    }

    private final void checkRemoveAfter(final MapleMonster monster) {
        final int ra = monster.getStats().getRemoveAfter();

        if (ra > 0) {
            MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public final void run() {
                    if (monster != null) {
                        killMonster(monster);
                    }
                }
            }, ra * 1000);
        }
    }

    public final void spawnRevives(final MapleMonster monster, final int oid) {
        monster.setMap(this);
        checkRemoveAfter(monster);
        monster.setLinkOid(oid);
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
            @Override
            public final void sendPackets(MapleClient c) {
                c.getSession().writeAndFlush(MobPacket.spawnMonster(monster, -2, 0, oid, GameConstants.isAswanMap(c.getPlayer().getMapId()))); // TODO effect
            }
        }, null);
        updateMonsterController(monster);
        spawnedMonstersOnMap.incrementAndGet();
    }

    public final void spawnMonster(final MapleMonster monster, final int spawnType) {
        spawnMonster(monster, spawnType, 0);
    }

    public final void spawnMonster(final MapleMonster monster, final int spawnType, final int effect) {
        monster.setMap(this);
        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
            public final void sendPackets(MapleClient c) {
                if (c != null) {
                    c.getSession().writeAndFlush(MobPacket.spawnMonster(monster, spawnType, effect, 0, GameConstants.isAswanMap(c.getPlayer().getMapId())));
                }
            }
        }, null);
        updateMonsterController(monster);
        checkRemoveAfter(monster);
        spawnedMonstersOnMap.incrementAndGet();
    }

    public final void spawnMonsterWithEffect(final MapleMonster monster, final int effect, Point pos) {
        try {
            monster.setMap(this);
            monster.setPosition(pos);

            spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
                @Override
                public final void sendPackets(MapleClient c) {
                    c.getSession().writeAndFlush(MobPacket.spawnMonster(monster, -2, effect, 0, GameConstants.isAswanMap(c.getPlayer().getMapId())));
                }
            }, null);
            updateMonsterController(monster);

            spawnedMonstersOnMap.incrementAndGet();
        } catch (Exception e) {
        }
    }

    public final void spawnFakeMonster(final MapleMonster monster) {
        monster.setMap(this);
        monster.setFake(true);

        spawnAndAddRangedMapObject(monster, new DelayedPacketCreation() {
            @Override
            public final void sendPackets(MapleClient c) {
                c.getSession().writeAndFlush(MobPacket.spawnMonster(monster, -2, 0, 0, false));
            }
        }, null);
        updateMonsterController(monster);

        spawnedMonstersOnMap.incrementAndGet();
    }

    public final void spawnRune(final MapleRune rune) {
        rune.setMap(this);
        spawnAndAddRangedMapObject(rune, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                /* Respawn Effect 발동 */
                c.getSession().writeAndFlush(RunePacket.spawnRune(rune, true));
                c.getSession().writeAndFlush(RunePacket.spawnRune(rune, false));
            }
        }, null);
    }

    public final void spawnReactor(final MapleReactor reactor) {
        reactor.setMap(this);
        spawnAndAddRangedMapObject(reactor, new DelayedPacketCreation() {
            @Override
            public final void sendPackets(MapleClient c) {
                c.getSession().writeAndFlush(MainPacketCreator.spawnReactor(reactor));
            }
        }, null);
    }

    private final void respawnReactor(final MapleReactor reactor) {
        if (reactor.getReactorId() >= 100000 && reactor.getReactorId() <= 200011 && reactor.getRank() > 0) {
            int reactid = GameConstants.getRandomProfessionReactorByRank(reactor.getRank());
            final MapleReactorStats stats = MapleReactorFactory.getReactor(reactid);
            final MapleReactor myReactor = new MapleReactor(stats, reactid);
            myReactor.setPosition(reactor.getPosition());
            myReactor.setDelay(900000);
            myReactor.setState((byte) 0);
            myReactor.setName("광맥");
            myReactor.setRank(reactor.getRank());
            spawnReactor(myReactor);
        } else {
            reactor.setState((byte) 0);
            reactor.setAlive(true);
            spawnReactor(reactor);
        }
    }

    public final void spawnWreckage(final MapleWreckage wreackage) {
        spawnAndAddRangedMapObject(wreackage, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                wreackage.sendSpawnData(c);
            }
        }, null);
    }

    public final void spawnDoor(final MapleDoor door) {
        spawnAndAddRangedMapObject(door, new DelayedPacketCreation() {
            public final void sendPackets(MapleClient c) {
                door.sendSpawnData(c, true);
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            }
        }, null);
    }

    public final void spawnMechDoor(final MapleMechDoor door) {
        spawnAndAddRangedMapObject(door, new DelayedPacketCreation() {
            public final void sendPackets(MapleClient c) {
                c.getSession().writeAndFlush(MechanicSkill.mechDoorSpawn(door, true));
                c.getSession().writeAndFlush(MainPacketCreator.resetActions());
            }
        }, new SpawnCondition() {
            public final boolean canSpawn(final MapleCharacter chr) {
                return chr.getParty() == null;
            }
        });
    }

    public final void removeMechDoor(final MapleMechDoor door) {
        MapTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                broadcastMessage(MechanicSkill.mechDoorRemove(door, false));
                removeMapObject(door);
            }
        }, 1000 * 60 * 5);
    }

    public final void spawnDragon(final MapleDragon summon) {
        spawnAndAddRangedMapObject(summon, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().writeAndFlush(MainPacketCreator.spawnDragon(summon));
            }
        }, null);
    }

    public final void spawnSummon(final MapleSummon summon, final boolean animated, final int duration) {
        try {
            spawnAndAddRangedMapObject(summon, new DelayedPacketCreation() {
                @Override
                public void sendPackets(MapleClient c) {
                    c.getSession().writeAndFlush(MainPacketCreator.spawnSummon(summon, summon.getSkillLevel(), animated));
                }
            }, null);
        } catch (Exception ex) {
            ex.printStackTrace();
        }
    }

    public final void spawnExtractor(final MapleExtractor ex) {
        spawnAndAddRangedMapObject(ex, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                ex.sendSpawnData(c);
            }
        }, null);
    }

    public final void spawnClockMist(final MapleMist clock) {
        spawnAndAddRangedMapObject(clock, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                broadcastMessage(MainPacketCreator.spawnClockMist(clock));
            }
        }, null);
        MapTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                broadcastMessage(MainPacketCreator.removeMist(clock.getObjectId(), false));
                removeMapObject(clock);
            }
        }, 22000);
    }

    public final void spawnMist(final MapleMist mist, final int duration, boolean poison, boolean fake, boolean rv, boolean burningregion, boolean timecapsule, boolean zero, boolean aran) {
        mist.setEndTime(duration);
        mist.setMap(this);
        spawnAndAddRangedMapObject(mist, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.sendPacket(MainPacketCreator.spawnMist(mist));
            }
        }, null);

        final MapTimer tMan = MapTimer.getInstance();
        final ScheduledFuture<?> poisonSchedule;

        if (poison) {
            poisonSchedule = tMan.register(new Runnable() {
                @Override
                public void run() {
                    for (final MapleMapObject mo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.MONSTER))) {
                        if (mist.makeChanceResult()) {
                            ((MapleMonster) mo).applyStatus(mist.getOwner(), new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.POISON, 1), mist.getSourceSkill(), 0, null, false), duration);
                        }
                    }
                }
            }, 2000, 2500);
        } else if (rv) {
            poisonSchedule = tMan.register(new Runnable() {
                @Override
                public void run() {
                    for (final MapleMapObject mo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.PLAYER))) {
                        if (mist.makeChanceResult()) {
                            final MapleCharacter chr = ((MapleCharacter) mo);
                            chr.addMP((int) (mist.getSource().getX() * (chr.getStat().getMaxMp() / 100.0)));
                        }
                    }
                }
            }, 2000, 2500);
        } else if (zero) {
            poisonSchedule = tMan.register(new Runnable() {
                @Override
                public void run() {
                    for (final MapleMapObject mo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.MONSTER))) {
                        if (mist.makeChanceResult()) {
                            ((MapleMonster) mo).applyStatus(mist.getOwner(), new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.AddDamSkill, 20), mist.getSourceSkill(), mist.getOwner().getSkillLevel(mist.getSourceSkill()), null, false), duration);
                        }
                    }
                    for (final MapleMapObject mo : getAllPlayer()) {
                        final MapleCharacter chr = ((MapleCharacter) mo);
                        final ISkill skill = SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(100001261));
                        final SkillStatEffect effect = skill.getEffect(chr.getSkillLevel(mist.getOwner().getSkillLevel(skill)));
                        boolean contain = getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.PLAYER)).contains(mo);
                        if (chr.getBuffedValue(BuffStats.CTS_Booster, 100001261) != null) {
                            if (!contain) {
                                chr.cancelEffect(skill.getEffect(1), false, -1);
                            }
                        } else if (contain) {
                            effect.applyTo(chr);
                        }
                    }

                }
            }, 2000, 2500);
        } else if (aran) {
            poisonSchedule = tMan.register(new Runnable() {
                @Override
                public void run() {
                    for (MapleMapObject mo : getAllPlayer()) {
                        final MapleCharacter chr = ((MapleCharacter) mo);
                        for (MapleCharacter player : chr.getClient().getChannelServer().getPartyMembers(chr.getParty())) {
                            player.addMPHP((int) (player.getStat().getCurrentMaxHp() / 20.0D), (int) (player.getStat().getCurrentMaxMp() / 20.0D));
                            player.dispelDebuffs();
                            player.Message("효과발동");
                        }
                    }
                }
            }, 1000, 10000);
        } else if (burningregion) {
            poisonSchedule = tMan.register(new Runnable() {
                @Override
                public void run() {
                    for (final MapleMapObject mo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.PLAYER))) {
                        final MapleCharacter chr = ((MapleCharacter) mo);
                        final ISkill skill = SkillFactory.getSkill(GameConstants.getLinkedAttackSkill(12121005));
                        final SkillStatEffect effect = skill.getEffect(chr.getSkillLevel(mist.getOwner().getSkillLevel(skill)));
                        if (!chr.isActiveBuffedValue(12121005)) {
                            effect.applyTo(chr);
                        }
                    }
                }
            }, 2000, 2500);
        } else if (timecapsule) {
            poisonSchedule = tMan.register(new Runnable() {
                @Override
                public void run() {
                    for (MapleMapObject mmo : getMapObjectsInRect(mist.getBox(), Collections.singletonList(MapleMapObjectType.PLAYER))) {
                        MapleCharacter chr = (MapleCharacter) mmo;
                        //캡슐 존재여부 체크
                        for (final MapleMapObject mistoo : chr.getMap().getMapObjectsInRange(chr.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MIST))) {
                            final MapleMist check = (MapleMist) mistoo;
                            if (mist.getOwner() == check.getOwner() && mist.isTimeCapsule()) {
                                for (MapleCoolDownValueHolder mcdvh : chr.getAllCooldowns()) {
                                    if (mcdvh.skillId != 36121007) {
                                        chr.changeCooldown(mcdvh.skillId, -15000);
                                    }
                                }
                            } else {
                                return;
                            }
                        }
                    }
                }
            }, 5000, 5000);
        } else if (mist.getSource().isMonsterBuff()) {
            poisonSchedule = tMan.register(new Runnable() {
                @Override
                public void run() {
                    mist.getSource().applyMonsterBuff(mist.getOwner());
                }
            }, 2000, 2500);
        } else {
            poisonSchedule = null;
        }
        tMan.schedule(new Runnable() {
            @Override
            public void run() {
                broadcastMessage(MainPacketCreator.removeMist(mist.getObjectId(), false));
                removeMapObject(mist);
                if (poisonSchedule != null) {
                    poisonSchedule.cancel(false);
                }
            }
        }, duration);
    }

    public final void checkMaxItemInMap() {
        if (droppedItems.size() + 1 > 400) {
            MapleWorldMapItem mapitem = (MapleWorldMapItem) getMapObject(droppedItems.get(0));
            if (mapitem == null) {
                return;
            }
            if (mapitem.isPickedUp()) {
                return;
            }
            mapitem.setPickedUp(true);
            broadcastMessage(MainPacketCreator.removeItemFromMap(mapitem.getObjectId(), 0, 0));
            removeMapObject(mapitem);
        }
    }

    public final void disappearingItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final IItem item, final Point pos) {
        final Point droppos = calcDropPos(pos, pos);
        final MapleWorldMapItem drop = new MapleWorldMapItem(item, droppos, dropper, owner, (byte) 1, false);
        broadcastMessage(MainPacketCreator.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 3), drop.getPosition());
    }

    public final void spawnMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {

        final Point droppos = calcDropPos(position, position);
        final MapleWorldMapItem mdrop = new MapleWorldMapItem(meso, droppos, dropper, owner, droptype, playerDrop);
        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().writeAndFlush(MainPacketCreator.dropItemFromMapObject(mdrop, dropper.getPosition(), droppos, (byte) 1));
            }
        }, null);
        if (!everlast) {
            MapTimer.getInstance().schedule(new ExpireMapItemJob(mdrop), 60000L);
        }
    }

    public final void spawnMobMesoDrop(final int meso, final Point position, final MapleMapObject dropper, final MapleCharacter owner, final boolean playerDrop, final byte droptype) {
        final MapleWorldMapItem mdrop = new MapleWorldMapItem(meso, position, dropper, owner, droptype, playerDrop);

        spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().writeAndFlush(MainPacketCreator.dropItemFromMapObject(mdrop, dropper.getPosition(), position, (byte) 1));
            }
        }, null);
        MapTimer.getInstance().schedule(new ExpireMapItemJob(mdrop), 60000L);
    }

    public final void spawnMobDrop(final IItem idrop, final Point dropPos, final MapleMonster mob, final MapleCharacter chr, final byte droptype, final int questid) {
        final MapleWorldMapItem mdrop = new MapleWorldMapItem(idrop, dropPos, mob, chr, droptype, false, questid);
        checkMaxItemInMap();
        //Start nx block from fm
        int[] nxItems = {5150030, 5151025, 5152033, 5152035, 1002186, 1082102, 1002999, 1052211, 1072175, 1003000, 1052212, 1003001, 1052213, 1072406, 1002998, 1052210, 1072404};
        if (mapid != 104040000) { //HHG1
            for (int i : nxItems) {
                if (mdrop.getItemId() == i) {
                    return;
                }
            }
        }
        if (mdrop.getItemId() != 4001536) {
            spawnAndAddRangedMapObject(mdrop, new DelayedPacketCreation() {
                @Override
                public void sendPackets(MapleClient c) {
                    if (questid <= 0 || c.getPlayer().getQuestStatus(questid) == 1) {
                        c.getSession().write(MainPacketCreator.dropItemFromMapObject(mdrop, mob.getPosition(), dropPos, (byte) 1));
                    }
                }
            }, null);
        } else {
            runningOid++;
            mdrop.setObjectId(runningOid);
            chr.send(MainPacketCreator.dropItemFromMapObject(mdrop, mdrop.getPosition(), dropPos, (byte) 1));
            chr.send(MainPacketCreator.dropItemFromMapObject(mdrop, mdrop.getPosition(), dropPos, (byte) 0));
            chr.send(MainPacketCreator.removeItemFromMap(mdrop.getObjectId(), (byte) 2, chr.getId()));
            chr.send(SoulWeaponPacket.giveSoulGauge(chr.addgetSoulCount(), chr.getEquippedSoulSkill()));
            chr.checkSoulState(false, chr.getEquippedSoulSkill());
        }
        MapTimer.getInstance().schedule(new ExpireMapItemJob(mdrop), 60000L);
        activateItemReactors(mdrop, chr.getClient());
        if (mdrop.getItemId() == 4001536) {
            removeMapObject(mdrop);
        }
    }

    public final void spawnItemDrop(MapleMapObject dropper, MapleCharacter owner, IItem item, Point pos, boolean ffaDrop, boolean playerDrop) {
        spawnItemDrop(dropper, owner, item, pos, ffaDrop, playerDrop, false, false, 0, 0);
    }

    public final void spawnItemDrop(final MapleMapObject dropper, final MapleCharacter owner, final IItem item, Point pos, final boolean ffaDrop, final boolean playerDrop, boolean fly, boolean touch, int gradiant, int speed) {

        IEquip equip = null;
        if (item.getType() == 1) {
            equip = (IEquip) item;
        }
        final Point droppos = calcDropPos(pos, pos);
        final MapleWorldMapItem drop = new MapleWorldMapItem(item, droppos, dropper, owner, (byte) 0, playerDrop, equip, fly, touch, gradiant, speed);

        spawnAndAddRangedMapObject(drop, new DelayedPacketCreation() {
            @Override
            public void sendPackets(MapleClient c) {
                c.getSession().writeAndFlush(MainPacketCreator.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 1));
            }
        }, null);
        broadcastMessage(MainPacketCreator.dropItemFromMapObject(drop, dropper.getPosition(), droppos, (byte) 0));

        if (!everlast) {
            MapTimer.getInstance().schedule(new ExpireMapItemJob(drop), 60000L);
            activateItemReactors(drop, owner.getClient());
        }
    }

    private void activateItemReactors(final MapleWorldMapItem drop, final MapleClient c) {
        final IItem item = drop.getItem();

        for (final MapleMapObject o : getAllReactor()) {
            final MapleReactor react = (MapleReactor) o;
            for (int i = 0; i < react.getStats().getStateEventSize(react.getState()); i++) {
                if (react.getReactorType((byte) i) == 100) {
                    if (react.getReactItem((byte) i).getLeft() == item.getItemId() && react.getReactItem((byte) i).getRight() == item.getQuantity()) {
                        if (react.getArea().contains(drop.getPosition())) {
                            if (!react.isTimerActive()) {
                                MapTimer.getInstance().schedule(new ActivateItemReactor(drop, react, c), 5000);
                                react.setTimerActive(true);
                                break;
                            }
                        }
                    }
                }
            }
        }
    }

    public final void returnEverLastItem(final MapleCharacter chr) {
        for (final MapleMapObject o : getAllItems()) {
            final MapleWorldMapItem item = ((MapleWorldMapItem) o);
            item.setPickedUp(true);
            broadcastMessage(MainPacketCreator.removeItemFromMap(item.getObjectId(), 2, chr.getId()), item.getPosition());
            if (item.getMeso() > 0) {
                chr.gainMeso(item.getMeso(), false);
            } else {
                InventoryManipulator.addFromDrop(chr.getClient(), item.getItem(), false);
            }
            removeMapObject(item);
        }
    }

    public final void startMapEffect(final String msg, final int itemId) {
        startMapEffect(msg, itemId, 30000);
    }

    public final void startMapEffect(final String msg, final int itemId, final long time) {
        if (mapEffect != null) {
            return;
        }
        mapEffect = new MapleMapEffect(msg, itemId);
        broadcastMessage(mapEffect.makeStartData());
        MapTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                broadcastMessage(mapEffect.makeDestroyData());
                mapEffect = null;
            }
        }, time);
    }

    public boolean isSwooBoss() {
        return mapid == 350060160 || mapid == 350060180 || mapid == 350060200;
    }

    public void resetObtacleAtom() {
        if (!isSwooBoss()) {
            System.out.println("@MapleMap::resetObtacleAtom | not swoo boss map");

            return;
        }

        int count = Randomizer.nextInt(10) + 5;

        for (int i = 0; i < count; i++) {

            /*
             final int type, final int sx, final int sy, 
             final int ex, final int ey, final int range, 
             final int pdam, final int mdam, final int delay, 
             final int high, final int speed, final int len, final int float_
             */
            ObtacleAtom oa = new ObtacleAtom(Randomizer.rand(48, 52),
                    292, -607, // sx, sy
                    5000, 5000, // ex, ey
                    50000, // range
                    25, -5,
                    1000, // delay
                    10000800, // high (duration?)
                    1,
                    70000, 0);

            obtacleAtoms.add(oa);
        }
    }

    public final void addPlayer(final MapleCharacter chr) {
        mutex.lock();
        RespawnNPC();
        try {
            characters.add(chr);
            mapobjects.put(chr.getObjectId(), chr);
        } finally {
            mutex.unlock();
        }

        if (!chr.isHidden()) {
            broadcastMessage(chr, MainPacketCreator.spawnPlayerMapobject(chr), false);
        }
        sendObjectPlacement(chr);

        if (chr.getKeyValue2("mountid") == -1) {
            chr.setKeyValue2("mountid", 0);
        }

        if (chr.getKeyValue2("mountskillid") == -1) {
            chr.setKeyValue2("mountskillid", 0);
        }

        if (!onFirstUserEnter.equals("")) {
            if (getCharactersSize() == 1) {
                MapleMapScriptMethods.startScript_FirstUser(chr.getClient(), onFirstUserEnter);
            }
        }

        if (!onUserEnter.equals("")) {
            MapleMapScriptMethods.startScript_User(chr.getClient(), onUserEnter);
        }

        if (mapid == ServerConstants.startMap) {
            chr.send(MainPacketCreator.musicChange("BgmEvent2/risingStar2"));
            mapEffect = new MapleMapEffect(ServerConstants.serverWelcome, 5121035);
            chr.send(mapEffect.makeStartData());
        }
        /* 미션 전용 이펙트 알림 (By.에코) */
        if (mapid == 921120300) {
            mapEffect = new MapleMapEffect("Mission STEP 1 : 맵에 있는 모든 몬스터를 퇴치 하십시오.", 5120124);
            chr.send(mapEffect.makeStartData());
        }
        if (mapid == 931000300) {
            mapEffect = new MapleMapEffect("Mission STEP 2 : 철 밧줄을 타고 아래로 이동 하십시오.", 5120124);
            chr.send(mapEffect.makeStartData());
        }
        if (mapid == 931000310) {
            mapEffect = new MapleMapEffect("Mission STEP 3 : 보라색 마력석 = 1 개, 카드키 = 100 개", 5120124);
            chr.send(mapEffect.makeStartData());
        }
        if (mapid == 991000000) {
            mapEffect = new MapleMapEffect("Mission Final : 드리미를 통해 단테를 소환하여 무찌르십시오.", 5120124);
            chr.send(mapEffect.makeStartData());
        }
        if (mapid == 109050001) { //이벤트맵 나가는 곳
            MapleMap map = chr.getClient().getChannelServer().getMapFactory().getMap(ServerConstants.startMap);
            chr.changeMap(map, map.getPortal(0));
        }

        if (QuickMove.getQuickMoves(mapid) != null) {
            chr.send(MainPacketCreator.getQuickMove(QuickMove.getQuickMoves(mapid)));
            chr.setQuickMoved(true);
        }
        chr.dispelDebuff(DiseaseStats.TELEPORT); //팅방지

        if (chr.getJob() >= 1400 && chr.getJob() <= 1412) {
            chr.acaneAim = 0;
        }

        for (int i = 0; i < 3; ++i) {
            if (chr.getPet(i) != null) {
                chr.getPet(i).setPos(chr.getPosition()); //펫 좌표 업데이트
                chr.getClient().send(PetPacket.updatePet(chr, chr.getPet(i), false, chr.getPetLoot()));
                chr.send(PetPacket.showPet(chr, chr.getPet(i), false, false, false));
                broadcastMessage(chr, PetPacket.showPet(chr, chr.getPet(i), false, false, true), false);
            }
        }

        if (chr.getPetAutoHP() > 0) {
            chr.getClient().send(MainPacketCreator.getPetAutoHP(chr.getPetAutoHP()));
        }

        if (chr.getPetAutoMP() > 0) {
            chr.getClient().send(MainPacketCreator.getPetAutoMP(chr.getPetAutoMP()));
        }

        if (chr.getAndroid() != null) { //Set
            chr.getAndroid().setPosition(chr.getPosition()); //안드로이드 좌표 업데이트
            broadcastMessage(chr, AndroidPacket.spawnAndroid(chr, chr.getAndroid()), true);
        }

        if (getHPDec() > 0) {
            chr.startHurtHp();
        }

        if (chr.getParty() != null) {
            chr.silentPartyUpdate();
            chr.getClient().getSession().write(MainPacketCreator.updateParty(chr.getClient().getChannel(), chr.getParty(), MaplePartyOperation.SILENT_UPDATE, null));
            chr.updatePartyMemberHP();
            chr.receivePartyMemberHP();
        }

        if (!chr.getSummons().isEmpty()) {
            for (Pair<Integer, MapleSummon> summon : chr.getSummons().values()) {
                if (!summon.right.isStaticSummon()) {
                    summon.right.setPosition(chr.getPosition());
                    chr.addVisibleMapObject(summon.right);
                    spawnSummon(summon.right, false, SkillFactory.getSkill(summon.right.getSkill()).getEffect(summon.right.getSkillLevel()).getDuration());
                }
            }
        }

        if (mapEffect != null) {
            mapEffect.sendStartData(chr.getClient());
        }

        if (timeLimit > 0 && getForcedReturnMap() != null) {
            chr.startMapTimeLimitTask(timeLimit, getForcedReturnMap());
        }

        if (chr.getBuffedValue(BuffStats.CTS_MonsterRiding) != null) {
            if (FieldLimitType.Mount.check(fieldLimit)) {
                chr.cancelBuffStats(-1, BuffStats.CTS_MonsterRiding);
            }
        }

        if (chr.getEventInstance() != null && chr.getEventInstance().isTimerStarted() && !chr.getEventInstance().isCleared()) {
            chr.getClient().getSession().write(MainPacketCreator.getClock((int) (chr.getEventInstance().getTimeLeft() / 1000)));
        }

        if (chr.getEventInstance() != null && chr.getEventInstance().isUsingAchievementRatio() && !chr.getEventInstance().isCleared()) {
            chr.getClient().getSession().write(UIPacket.AchievementRatio(chr.getEventInstance().getAchievementRatio()));
        }

        if (hasClock()) {
            final Calendar cal = Calendar.getInstance();
            chr.getClient().getSession().write((MainPacketCreator.getClockTime(cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND))));
        }

        if (chr.getEventInstance() != null) {
            chr.getEventInstance().onMapLoad(chr);
        }

        if (GameConstants.isEvan(chr.getJob()) && chr.getJob() >= 2200 && chr.getBuffedValue(BuffStats.CTS_MonsterRiding) == null) {
            if (chr.getDragon() == null) {
                chr.makeDragon();
            }
            spawnDragon(chr.getDragon());
            updateMapObjectVisibility(chr, chr.getDragon());
        }

        if (chr.getMapId() == 105200812) {
            Ris(chr);
        }

        for (MapleDiseaseValueHolder hdvh : chr.getAllDiseases()) {
            for (Pair<DiseaseStats, Integer> p : GameConstants.getBroadcastDebuffs()) {
                if (hdvh.disease == p.getLeft()) {
                    broadcastMessage(MainPacketCreator.giveForeignDebuff(chr.getId(), p.getLeft(), new MobSkill(p.getRight(), 1)));
                }
            }
        }

        if (!isExpiredMapTimer()) {
            long lefttime = maptimer - System.currentTimeMillis();
            int sec = (int) (lefttime / 1000);
            chr.send(MainPacketCreator.getClock(sec));
        }

        if (isEliteBossMap()) {
            chr.send(UIPacket.showSpecialMapEffect(2, 1, "Bgm36.img/RoyalGuard", null));
        } else if (isEliteBossRewardMap()) {
            chr.send(UIPacket.showSpecialMapEffect(3, 1, "Bgm36.img/HappyTimeShort", "Map/Map/Map9/924050000.img/back"));
        }

        /* 룬 시작 */
        mutex.lock();
        try {
            final List<MapleMapObject> monsters = this.getAllMonster();
            if (!this.isTown() && monsters.size() > 0 && Randomizer.nextInt(380) < 48) {
                MapleMonster mob = (MapleMonster) monsters.get(Randomizer.rand(0, monsters.size() - 1));
                MapleRune rune = new MapleRune(Randomizer.rand(0, 3), mob.getPosition().x, mob.getPosition().y, this);
                this.spawnRune(rune);
            }
        } finally {
            mutex.unlock();
        }
        /* 룬 종료 */

        if (chr.getSkillEffect() != null) {
            if (isTown()) {
                chr.setKeyDownSkill_Time(0);
                broadcastMessage(MainPacketCreator.skillCancel(chr, chr.getSkillEffect().getSkillId()));
                chr.setSkillEffect(null);
            } else {
                broadcastMessage(MainPacketCreator.skillEffect(chr, chr.getSkillEffect(), chr.getPosition()));
            }
        }
    }

    public final void removePlayer(final MapleCharacter chr) {
        lastPlayerLeft = System.currentTimeMillis();
        if (everlast) {
            returnEverLastItem(chr);
        }
        mutex.lock();
        try {
            characters.remove(chr);
        } finally {
            mutex.unlock();
        }
        removeMapObject(Integer.valueOf(chr.getObjectId()));
        broadcastMessage(MainPacketCreator.removePlayerFromMap(chr.getId()));
        chr.checkFollow();
        for (final MapleMonster monster : chr.getControlledMonsters()) {
            monster.setController(null);
            monster.setControllerHasAggro(false);
            monster.setControllerKnowsAboutAggro(false);
            updateMonsterController(monster);
        }
        chr.leaveMap();
        chr.cancelMapTimeLimitTask();
        for (Pair<Integer, MapleSummon> summon : chr.getSummons().values()) {
            broadcastMessage(MainPacketCreator.removeSummon(summon.getRight(), true));
            removeMapObject(summon.getRight());
            chr.removeVisibleMapObject(summon.getRight());
        }
        if (getArrowFlatter(chr.getId()) != null) {
            chr.getMap().broadcastMessage(MainPacketCreator.cancelArrowFlatter(getArrowFlatter(chr.getId()).getObjectId(), getArrowFlatter(chr.getId()).getArrow()));
            removeMapObject(getArrowFlatter(chr.getId()));
        }
        if (chr.getExtractor() != null) {
            removeMapObject(chr.getExtractor());
            chr.setExtractor(null);
            chr.message(5, "맵을 이동하여 분해기가 해체되었습니다.");
        }

        if (chr.getDragon() != null) {
            removeMapObject(chr.getDragon());
        }
        if (tempnpcs3.containsKey(chr.getId())) {
            removeTempNpc(tempnpcs3.get(chr.getId()).getId(), chr.getId());
            tempnpcs3.remove(chr.getId());
        }

        if (getId() == 103050510) { // 단련실 1
            spawnTempMonster(1, 9300522, new Point(-578, 152));
            spawnTempMonster(2, 9300521, new Point(-358, 152));
            spawnTempMonster(3, 9300522, new Point(-138, 152));
            spawnTempMonster(4, 9300522, new Point(82, 152));
            spawnTempMonster(5, 9300522, new Point(302, 152));
            spawnTempMonster(6, 9300522, new Point(522, 152));
        }

        if (getId() == 103050530 && getAllMonster().isEmpty()) { // 단련실 3
            spawnTempMonster(1, 9300523, new Point(-192, 152));
        }
    }

    public final void broadcastMessage(final byte[] packet) {
        broadcastMessage(null, packet, Double.POSITIVE_INFINITY, null);
    }

    public final void broadcastMessage(final MapleCharacter source, final byte[] packet, final boolean repeatToSource) {
        broadcastMessage(repeatToSource ? null : source, packet, Double.POSITIVE_INFINITY, source.getPosition());
    }

    public final void broadcastMessage(final byte[] packet, final Point rangedFrom) {
        broadcastMessage(null, packet, GameConstants.maxViewRangeSq(), rangedFrom);
    }

    public final void broadcastMessage(final MapleCharacter source, final byte[] packet, final Point rangedFrom) {
        broadcastMessage(source, packet, GameConstants.maxViewRangeSq(), rangedFrom);
    }

    private void broadcastMessage(final MapleCharacter source, final byte[] packet, final double rangeSq, final Point rangedFrom) { // 치우씨 :: 채팅 딜레이 문제 해결
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter chr : characters) {
                if (chr != source) {
                    if (rangeSq < Double.POSITIVE_INFINITY) {
                        if (rangedFrom.distanceSq(chr.getTruePosition()) <= rangeSq) {
                            chr.getClient().getSession().writeAndFlush(packet);
                        }
                    } else {
                        chr.getClient().getSession().writeAndFlush(packet);
                    }
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    private final void sendObjectPlacement(final MapleCharacter c) {
        if (c == null) {
            return;
        }
        for (final MapleMapObject o : getMapObjectsInRange(c.getPosition(), GameConstants.maxViewRangeSq(), GameConstants.rangedMapobjectTypes)) {
            if (o.getType() == MapleMapObjectType.REACTOR) {
                if (!((MapleReactor) o).isAlive()) {
                    continue;
                }
            }
            o.sendSpawnData(c.getClient());
            c.addVisibleMapObject(o);
        }
        for (final MapleMapObject o : getAllMonster()) {
            updateMonsterController((MapleMonster) o);
        }
    }

    public final List<MapleMapObject> getMapObjectsInRange(final Point from, final double rangeSq) {
        final List<MapleMapObject> ret = new LinkedList<MapleMapObject>();

        mutex.lock();
        try {
            final Iterator<MapleMapObject> ltr = mapobjects.values().iterator();
            MapleMapObject obj;
            while (ltr.hasNext()) {
                obj = ltr.next();
                if (from.distanceSq(obj.getPosition()) <= rangeSq) {
                    ret.add(obj);
                }
            }
        } finally {
            mutex.unlock();
        }
        return ret;
    }

    public final List<MapleMapObject> getMapObjectsInRange(final Point from, final double rangeSq, final List<MapleMapObjectType> MapObject_types) {
        final List<MapleMapObject> ret = new LinkedList<MapleMapObject>();

        mutex.lock();
        try {
            final Iterator<MapleMapObject> ltr = mapobjects.values().iterator();
            MapleMapObject obj;
            while (ltr.hasNext()) {
                obj = ltr.next();
                if (MapObject_types.contains(obj.getType())) {
                    if (from.distanceSq(obj.getPosition()) <= rangeSq) {
                        ret.add(obj);
                    }
                }
            }
        } finally {
            mutex.unlock();
        }
        return ret;
    }

    public final List<MapleMapObject> getMapObjectsInRect(final Rectangle box, final List<MapleMapObjectType> MapObject_types) {
        final List<MapleMapObject> ret = new LinkedList<MapleMapObject>();

        mutex.lock();
        try {
            final Iterator<MapleMapObject> ltr = mapobjects.values().iterator();
            MapleMapObject obj;
            while (ltr.hasNext()) {
                obj = ltr.next();
                if (MapObject_types.contains(obj.getType())) {
                    if (box.contains(obj.getPosition())) {
                        ret.add(obj);
                    }
                }
            }
        } finally {
            mutex.unlock();
        }
        return ret;
    }

    public final List<MapleCharacter> getPlayersInRect(final Rectangle box, final List<MapleCharacter> CharacterList) {
        final List<MapleCharacter> character = new LinkedList<MapleCharacter>();

        mutex.lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter a;
            while (ltr.hasNext()) {
                a = ltr.next();
                if (CharacterList.contains(a.getClient().getPlayer())) {
                    if (box.contains(a.getPosition())) {
                        character.add(a);
                    }
                }
            }
        } finally {
            mutex.unlock();
        }
        return character;
    }

    public final List<MapleMapObject> getAllItems() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ITEM));
    }

    public List<MapleWorldMapItem> getAllItemsThreadsafe() {
        ArrayList<MapleWorldMapItem> ret = new ArrayList<MapleWorldMapItem>();
        for (MapleMapObject mmo : getAllItems()) {
            ret.add((MapleWorldMapItem) mmo);
        }
        return ret;
    }

    public final List<MapleMapObject> getAllNPC() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.NPC, MapleMapObjectType.PLAYERNPC));
    }

    public final List<MapleMapObject> getAllPlayerNPC() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.PLAYERNPC));
    }

    public final List<MapleMapObject> getAllReactor() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.REACTOR));
    }

    public final List<MapleMapObject> getAllPlayer() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.PLAYER));
    }

    public final List<MapleMapObject> getAllMonster() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER));
    }

    public final List<MapleMapObject> getAllMist() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MIST));
    }

    public final List<MapleMapObject> getAllDoor() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.DOOR));
    }

    public final List<MapleMapObject> getAllMechDoor() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.DOOR));
    }

    public List<MapleMapObject> getAllHiredMerchant() {
        return getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.HIRED_MERCHANT));
    }

    public List<MapleMist> getAllMistsThreadsafe() {
        return getMistInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MIST));
    }

    public final List<MapleSummon> getAllSummon() {
        return getSummonInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.SUMMON));
    }

    public final List<MapleRune> getAllRune() {
        return getRuneInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.RUNE));
    }

    public final List<MapleWreckage> getAllWreakage() {
        return getWreckageInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.WRECKAGE));
    }

    public final void addPortal(final MaplePortal myPortal) {
        portals.put(myPortal.getId(), myPortal);
    }

    public final MaplePortal getPortal(final String portalname) {
        for (final MaplePortal port : portals.values()) {
            if (port.getName().equals(portalname)) {
                return port;
            }
        }
        return null;
    }

    public final MaplePortal getPortal(final int portalid) {
        return portals.get(portalid);
    }

    public final List<MaplePortal> getPortalSP() {
        List<MaplePortal> res = new LinkedList<MaplePortal>();
        for (final MaplePortal port : portals.values()) {
            if (port.getName().equals("sp")) {
                res.add(port);
            }
        }
        return res;
    }

    public final void addMapleArea(final Rectangle rec) {
        areas.add(rec);
    }

    public final List<Rectangle> getAreas() {
        return new ArrayList<Rectangle>(areas);
    }

    public final Rectangle getArea(final int index) {
        return areas.get(index);
    }

    public final void setFootholds(final MapleFootholdTree footholds) {
        this.footholds = footholds;
    }

    public final MapleFootholdTree getFootholds() {
        return footholds;
    }

    public final void loadMonsterRate(final boolean first) {
        final int spawnSize = monsterSpawn.size();
        maxRegularSpawn = Math.round(spawnSize * monsterRate);
        if (maxRegularSpawn < 2) {
            maxRegularSpawn = 2;
        } else if (maxRegularSpawn > spawnSize) {
            maxRegularSpawn = spawnSize - (spawnSize / 15);
        }
        Collection<Spawns> newSpawn = new LinkedList<Spawns>();
        Collection<Spawns> newBossSpawn = new LinkedList<Spawns>();
        for (final Spawns s : monsterSpawn) {
            if (s.getMonster().getStats().isBoss()) {
                newBossSpawn.add(s);
            } else {
                newSpawn.add(s);
            }
        }
        monsterSpawn.clear();
        monsterSpawn.addAll(newBossSpawn);
        monsterSpawn.addAll(newSpawn);
        respawn(true);
        if (first && spawnSize > 0) {
            MapTimer.getInstance().register(new Runnable() {
                @Override
                public void run() {
                    respawn(false);
                }
            }, createMobInterval);
        }
    }

    public final void addMonsterSpawn(final MapleMonster monster, final int mobTime, final String msg) {
        final Point newpos = calcPointMaple(monster.getPosition());
        newpos.y -= 1;

        monsterSpawn.add(new SpawnPoint(monster, newpos, mobTime, msg));
    }

    public final void addAreaMonsterSpawn(final MapleMonster monster, Point pos1, Point pos2, Point pos3, final int mobTime, final String msg) {
        pos1 = calcPointMaple(pos1);
        pos2 = calcPointMaple(pos2);
        pos3 = calcPointMaple(pos3);
        pos1.y -= 1;
        pos2.y -= 1;
        pos3.y -= 1;

        monsterSpawn.add(new SpawnPointAreaBoss(monster, pos1, pos2, pos3, mobTime, msg));
    }

    public final MapleCharacter getCharacterByName_InMap(final String name) {
        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter c;
            while (ltr.hasNext()) {
                c = ltr.next();
                if (c.getName().equals(name)) {
                    return c;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return null;
    }

    public final List<MapleCharacter> getCharacters() {
        return getCharactersThreadsafe();
    }

    public final List<MapleCharacter> getCharactersThreadsafe() {
        final List<MapleCharacter> chars = new ArrayList<MapleCharacter>();

        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                chars.add(mc);
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return chars;
    }

    public final MapleCharacter getCharacterById_InMap(final int id) {
        return getCharacterById(id);
    }

    public final MapleCharacter getCharacterById(final int id) {
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter mc : characters) {
                if (mc.getId() == id) {
                    return mc;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return null;
    }

    private final void updateMapObjectVisibility(final MapleCharacter chr, final MapleMapObject mo) {
        if (chr == null) {
            return;
        }
        if (!chr.isMapObjectVisible(mo)) { // monster entered view range
            if (mo.getType() == MapleMapObjectType.MIST || mo.getType() == MapleMapObjectType.EXTRACTOR || mo.getType() == MapleMapObjectType.ANDROID || mo.getType() == MapleMapObjectType.SUMMON || mo.getPosition().distanceSq(chr.getPosition()) <= GameConstants.maxViewRangeSq()) {
                chr.addVisibleMapObject(mo);
                mo.sendSpawnData(chr.getClient());
            }
        } else // monster left view range
        {
            if (mo.getType() != MapleMapObjectType.MIST && mo.getType() != MapleMapObjectType.EXTRACTOR && mo.getType() != MapleMapObjectType.ANDROID && mo.getType() != MapleMapObjectType.SUMMON && mo.getPosition().distanceSq(chr.getPosition()) > GameConstants.maxViewRangeSq()) {
                chr.removeVisibleMapObject(mo);
                mo.sendDestroyData(chr.getClient());
            } else if (mo.getType() == MapleMapObjectType.MONSTER) { //monster didn't leave view range, and is visible
                if (chr.getPosition().distanceSq(mo.getPosition()) <= GameConstants.maxViewRangeSq()) {
                    updateMonsterController((MapleMonster) mo);
                }
            }
        }
    }

    public void moveMonster(MapleMonster monster, Point reportedPos) {
        monster.setPosition(reportedPos);
        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            while (ltr.hasNext()) {
                updateMapObjectVisibility(ltr.next(), monster);
            }
        } finally {
            charactersLock.readLock().unlock();
        }
    }

    public void movePlayer(final MapleCharacter player, final Point newPosition) {
        player.setPosition(newPosition);

        final Collection<MapleMapObject> visibleObjects = player.getVisibleMapObjects();
        final MapleMapObject[] visibleObjectsNow = visibleObjects.toArray(new MapleMapObject[visibleObjects.size()]);

        for (MapleMapObject mo : visibleObjectsNow) {
            if (getMapObject(mo.getObjectId()) == mo) {
                updateMapObjectVisibility(player, mo);
            } else {
                player.removeVisibleMapObject(mo);
            }
        }
        for (MapleMapObject mo : getMapObjectsInRange(player.getPosition(), GameConstants.maxViewRangeSq())) {
            if (!player.isMapObjectVisible(mo)) {
                mo.sendSpawnData(player.getClient());
                player.addVisibleMapObject(mo);
            }
        }
    }

    public MaplePortal findClosestSpawnpoint(Point from) {
        MaplePortal closest = null;
        double distance, shortestDistance = Double.POSITIVE_INFINITY;
        for (MaplePortal portal : portals.values()) {
            distance = portal.getPosition().distanceSq(from);
            if (portal.getType() >= 0 && portal.getType() <= 2 && distance < shortestDistance && portal.getTargetMapId() == 999999999) {
                closest = portal;
                shortestDistance = distance;
            }
        }
        return closest;
    }

    public void setMapTimer(long time) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM bosscooltime WHERE map = ? AND channel = ?");
            ps.setInt(1, mapid);
            ps.setInt(2, channel);
            ps.executeUpdate();
            ps = con.prepareStatement("INSERT INTO bosscooltime VALUES (?, ?, ?)");
            ps.setInt(1, channel);
            ps.setInt(2, mapid);
            ps.setLong(3, time);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (Exception e) {
            System.out.println("[오류] DB로 보스 쿨타임을 저장하는데 실패했습니다.");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
        this.maptimer = time;
    }

    public void setMapTimerNotDB(long time) {
        this.maptimer = time;
    }

    public boolean isExpiredMapTimer() {
        return maptimer < System.currentTimeMillis();
    }

    public String spawnDebug() {
        StringBuilder sb = new StringBuilder("Mapobjects in map : ");
        sb.append(this.getMapObjectSize());
        sb.append(" spawnedMonstersOnMap: ");
        sb.append(spawnedMonstersOnMap);
        sb.append(" spawnpoints: ");
        sb.append(monsterSpawn.size());
        sb.append(" maxRegularSpawn: ");
        sb.append(maxRegularSpawn);
        sb.append(" actual monsters: ");
        sb.append(getAllMonster().size());

        return sb.toString();
    }

    public final int getMapObjectSize() {
        return mapobjects.size();
    }

    public final int getCharactersSize() {
        return characters.size();
    }

    public Collection<MaplePortal> getPortals() {
        return Collections.unmodifiableCollection(portals.values());
    }

    public int getSpawnedMonstersOnMap() {
        return spawnedMonstersOnMap.get();
    }

    public final MapleCharacter getCharacterByName(final String name) {
        charactersLock.readLock().lock();
        try {
            final Iterator<MapleCharacter> ltr = characters.iterator();
            MapleCharacter c;
            while (ltr.hasNext()) {
                c = ltr.next();
                if (c.getName().equals(name)) {
                    return c;
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return null;
    }

    private class ExpireMapItemJob implements Runnable {

        private MapleWorldMapItem mapitem;

        public ExpireMapItemJob(MapleWorldMapItem mapitem) {
            this.mapitem = mapitem;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId())) {
                if (droppedItems.contains(Integer.valueOf(mapitem.getObjectId()))) {
                    droppedItems.remove(Integer.valueOf(mapitem.getObjectId()));
                }
                if (mapitem.isPickedUp()) {
                    return;
                }
                mapitem.setPickedUp(true);

                broadcastMessage(MainPacketCreator.removeItemFromMap(mapitem.getObjectId(), 0, 0));
                removeMapObject(mapitem);
            }
        }
    }

    private class ActivateItemReactor implements Runnable {

        private MapleWorldMapItem mapitem;
        private MapleReactor reactor;
        private MapleClient c;

        public ActivateItemReactor(MapleWorldMapItem mapitem, MapleReactor reactor, MapleClient c) {
            this.mapitem = mapitem;
            this.reactor = reactor;
            this.c = c;
        }

        @Override
        public void run() {
            if (mapitem != null && mapitem == getMapObject(mapitem.getObjectId())) {
                if (mapitem.isPickedUp()) {
                    reactor.setTimerActive(false);
                    return;
                }
                mapitem.setPickedUp(true);

                broadcastMessage(MainPacketCreator.removeItemFromMap(mapitem.getObjectId(), 0, 0));
                removeMapObject(mapitem);
                try {
                    reactor.hitReactor(c);
                } catch (Exception e) {
                    if (!ServerConstants.realese) {
                        e.printStackTrace();
                    }
                }
                reactor.setTimerActive(false);

                if (reactor.getDelay() > 0) {
                    MapTimer.getInstance().schedule(new Runnable() {
                        @Override
                        public void run() {
                            reactor.setState((byte) 0);
                            broadcastMessage(MainPacketCreator.triggerReactor(reactor, c.getPlayer().getId(), 0));
                        }
                    }, reactor.getDelay());
                }
            }
        }
    }

    public int countSummonSkill(MapleCharacter chr, int skill) {
        int count = 0;
        if (GameConstants.isEvan(chr.getJob())) {
            return 0;
        }
        List<MapleMapObject> mapobjs = chr.getMap().getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.SUMMON));
        for (MapleMapObject o : mapobjs) {
            if (o.getType() == MapleMapObjectType.SUMMON) {
                if (((MapleSummon) o).getOwnerChr() == chr) {
                    if (((MapleSummon) o).getSkill() == skill) {
                        count++;
                    }
                }
            }
        }
        return count;
    }

    public List<MapleMapObject> getSummonObjects(MapleCharacter chr, int skill) {
        List<MapleMapObject> ret = new ArrayList<MapleMapObject>();
        List<MapleMapObject> mapobjs = chr.getMap().getMapObjectsInRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.SUMMON));
        for (MapleMapObject o : mapobjs) {
            if (o.getType() == MapleMapObjectType.SUMMON) {
                if (((MapleSummon) o).getOwnerChr() == chr) {
                    if (((MapleSummon) o).getSkill() == skill) {
                        ret.add(o);
                    }
                }
            }
        }
        return ret;
    }

    public void respawn(final boolean force) {
        if (!isEliteBossMap() && !isEliteBossRewardMap()) {
            if (force) {
                final int numShouldSpawn = monsterSpawn.size() - spawnedMonstersOnMap.get();
                if (numShouldSpawn > 0) {
                    int spawned = 0;
                    for (Spawns spawnPoint : monsterSpawn) {
                        spawnPoint.spawnMonster(this);
                        spawned++;
                        if (spawned >= numShouldSpawn) {
                            break;
                        }
                    }
                }
            } else {
                if (getCharactersSize() <= 0) {
                    return;
                }
                final int numShouldSpawn = maxRegularSpawn - spawnedMonstersOnMap.get();
                if (numShouldSpawn > 0) {
                    int spawned = 0;
                    final List<Spawns> randomSpawn = new ArrayList<Spawns>(monsterSpawn);
                    Collections.shuffle(randomSpawn);
                    for (Spawns spawnPoint : randomSpawn) {
                        if (spawnPoint.shouldSpawn()) {
                            spawnPoint.spawnMonster(this);
                            spawned++;
                        }
                        if (spawned >= numShouldSpawn) {
                            break;
                        }
                    }
                }
            }
        }
    }

    public static interface DelayedPacketCreation {

        void sendPackets(MapleClient c);
    }

    private static interface SpawnCondition {

        boolean canSpawn(MapleCharacter chr);
    }

    public Collection<MapleCharacter> getNearestPvpChar(Point attacker, double maxRange, double maxHeight, boolean isLeft, Collection<MapleCharacter> chr) {
        Collection<MapleCharacter> character = new LinkedList<MapleCharacter>();
        charactersLock.readLock().lock();
        try {
            for (MapleCharacter a : characters) {
                if (chr.contains(a.getClient().getPlayer())) {
                    Point attackedPlayer = a.getPosition();
                    MaplePortal Port = a.getMap().findClosestSpawnpoint(a.getPosition());
                    Point nearestPort = Port.getPosition();
                    double safeDis = attackedPlayer.distance(nearestPort);
                    double distanceX = attacker.distance(attackedPlayer.getX(), attackedPlayer.getY());

                    if (isLeft) {
                        if (attacker.x < attackedPlayer.x && distanceX < maxRange && distanceX > 1
                                && attackedPlayer.y >= attacker.y - maxHeight && attackedPlayer.y <= attacker.y + maxHeight) {
                            character.add(a);
                        }
                    } else if (attacker.x > attackedPlayer.x && distanceX < maxRange && distanceX > 1
                            && attackedPlayer.y >= attacker.y - maxHeight && attackedPlayer.y <= attacker.y + maxHeight) {
                        character.add(a);
                    }
                }
            }
        } finally {
            charactersLock.readLock().unlock();
        }
        return character;
    }

    public void startCatch() {
        if (catchstart == null) {
            broadcastMessage(MainPacketCreator.getClock(180));
            catchstart = MapTimer.getInstance().schedule(new Runnable() {
                @Override
                public void run() {
                    broadcastMessage(MainPacketCreator.serverNotice(1, "제한시간 2분이 지나 양이 승리하였습니다!\r\n모든 분들은 게임 보상맵으로 이동됩니다."));
                    for (MapleCharacter chr : getCharacters()) {
                        chr.getStat().setHp(chr.getStat().getMaxHp(), chr);
                        chr.updateSingleStat(PlayerStat.HP, chr.getStat().getMaxHp());
                        if (chr.isCatching) {
                            chr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(109090201), chr.getClient().getChannelServer().getMapFactory().getMap(109090201).getPortalSP().get(0));
                        } else {
                            chr.changeMap(chr.getClient().getChannelServer().getMapFactory().getMap(109090100), chr.getClient().getChannelServer().getMapFactory().getMap(109090100).getPortalSP().get(0));
                        }
                    }
                    stopCatch();
                }
            }, 180000);
        }
    }

    public void stopCatch() {
        if (catchstart != null) {
            catchstart.cancel(true);
            catchstart = null;
        }
    }

    public void RespawnNPC() {
        try {
            Connection con = MYSQL.getConnection();
            String sql = "SELECT * FROM `spawn` WHERE mapid = " + mapid + " AND type = 'n'";
            PreparedStatement ps = con.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                if (!CheckNPC(rs.getInt("lifeid"))) {
                    final MapleNPC npc = MapleLifeProvider.getNPC(rs.getInt("lifeid"));
                    npc.setRx0(rs.getInt("rx0"));
                    npc.setRx1(rs.getInt("rx1"));
                    npc.setCy(rs.getInt("cy"));
                    npc.setF(rs.getInt("dir"));
                    npc.setFh(rs.getInt("fh"));
                    npc.setPosition(new Point(npc.getRx0() - 50, npc.getCy()));
                    if (npc != null) {
                        addMapObject(npc);
                    } else {
                        System.out.println("[오류] 엔피시 데이터를 만드는중 널 포인터 오류가 발생했습니다.");
                    }
                }
            }
            rs.close();
            ps.close();
            con.close();
        } catch (Exception e) {
            System.out.println("[오류] 엔피시를 DB로부터 불러오는데 오류가 발생했습니다.");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public boolean CheckNPC(int i) {
        for (MapleMapObject ob : getAllNPC()) {
            MapleNPC imsi = (MapleNPC) ob;
            if (imsi.getId() == i) {
                return true;
            }
        }
        return false;
    }

    public final MapleCharacter getCharacterById(MapleCharacter player, final int id) {
        for (MapleCharacter chr : player.getMap().getCharacters()) {
            if (chr.getId() == id) {
                return chr;
            }
        }
        return null;
    }

    public final List<ArrowFlatter> getArrowFlatterRange(Point from, double rangeSq, List<MapleMapObjectType> MapObject_types) {
        List mapobjects = getMapObjectsInRange(from, rangeSq);
        List arrows = new ArrayList();
        for (int i = 0; i < mapobjects.size(); i++) {
            if (((MapleMapObject) mapobjects.get(i)).getType() == MapleMapObjectType.ARROWFLATTER) {
                arrows.add((ArrowFlatter) mapobjects.get(i));
            }
        }
        return arrows;
    }

    public final void spawnArrowFlatter(final ArrowFlatter arrow) {
        spawnAndAddRangedMapObject(arrow, new DelayedPacketCreation() {
            public void sendPackets(MapleClient c) {
                broadcastMessage(MainPacketCreator.spawnArrowFlatter(arrow.getCid(), arrow.getArrow(), arrow.getPosition(), arrow.getObjectId()));
                broadcastMessage(MainPacketCreator.spawnArrowFlatter(arrow.getArrow(), arrow.getObjectId()));
            }
        }, null);
    }

    public final ArrowFlatter getArrowFlatter(final int cid) {
        for (ArrowFlatter arrows : getArrowFlatter()) {
            if (arrows.getCid() == cid) {
                return arrows;
            }
        }
        return null;
    }

    public final List<ArrowFlatter> getArrowFlatter() {
        return getArrowFlatterRange(new Point(0, 0), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.ARROWFLATTER));
    }

    public final int getPlayerCount(final int mapid, MapleClient c) {
        return c.getChannelServer().getMapFactory().getMap(mapid).getCharactersSize();
    }

    public List<MapleMapObject> getItemsInRange(Point from, double rangeSq) {
        return getMapObjectsInRange(from, rangeSq, Arrays.asList(MapleMapObjectType.ITEM));
    }

    public void resetSpawnCheck() {
        spawncheck[0] = false;
        spawncheck[1] = false;
        spawncheck[2] = false;
    }
}
