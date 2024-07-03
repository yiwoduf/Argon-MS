/*
 * 테스피아 Project
 * ==================================
 * 팬더 spirit_m@nate.com
 * 백호 softwarewithcreative@nate.com
 * ==================================
 *
 */
package client;

import client.items.*;
import client.skills.*;
import client.stats.*;
import client.test.TestMobSkill;
import community.*;
import constants.ServerConstants;
import constants.GameConstants;
import constants.subclasses.QuickMoveEntry;
import database.MYSQL;
import database.MYSQLException;
import launch.ChannelServer;
import launch.helpers.ChracterTransfer;
import launch.holder.MapleBuffValueHolder;
import launch.holder.MapleCoolDownValueHolder;
import launch.holder.MapleDiseaseValueHolder;
import launch.world.WorldBroadcasting;
import launch.world.WorldCommunity;
import packet.creators.*;
import packet.transfer.write.WritingPacket;
import provider.MapleData;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import scripting.EventInstanceManager;
import server.items.MapleCashInventory;
import server.items.MapleStorage;
import server.items.InventoryManipulator;
import server.items.ItemInformation;
import server.life.MapleMonster;
import server.life.MobSkill;
import server.maps.*;
import server.movement.LifeMovementFragment;
import server.quest.MapleQuest;
import server.shops.IMapleCharacterShop;
import server.shops.MapleShop;
import server.shops.MapleShopFactory;
import tools.*;
import tools.RandomStream.PlayerRandomStream;
import tools.RandomStream.Randomizer;
import tools.Timer.BuffTimer;

import java.awt.Point;
import java.io.Serializable;
import java.sql.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map.Entry;
import java.util.*;
import java.util.concurrent.ScheduledFuture;
import java.util.concurrent.atomic.AtomicInteger;

import handler.channel.MapleMechDoor;

import java.util.concurrent.locks.ReentrantLock;
import launch.holder.MaplePlayerHolder;
import server.items.MapleRing;
import tools.Timer.CloneTimer;
import tools.Timer.EtcTimer;
import tools.Timer.MapTimer;

public class MapleCharacter extends AnimatedHinaMapObjectExtend implements InventoryContainer, Serializable {

    public int STACK = 0;
    public int blow = 0;
    public int restonation = 0;
    public byte phantome_count = 0;
    private int nMixBaseHairColor = 0;
    private int nMixAddHairColor = 0;
    private int nMixHairBaseProb = 0;

    private int freejob = 0;

    private int event = 0, wdding = 0, equip = 0, internet = 0;
    private int rain = 0, boom = 0, elixir = 0, rest = 0, item = 0;
    private int aswan = 0, itemP = 0, value = 0, itemPap = 0, blood = 0, enterBurningEXP = 0;
    public boolean enterBurningField = false;

    public int itcafetime = 0;
    private transient ScheduledFuture<?> itcafetimer = null;
    private transient ScheduledFuture<?> endBounsTimer = null;
    private boolean reincooling = false;

    private int doox = 0;
    private int dooy = 0;

    private String name, chalktext, BlessOfFairy_Origin, BlessOfEmpress_Origin;
    private boolean quickmoved = false;
    private transient Map<Integer, Integer> linkMobIds = new HashMap<Integer, Integer>();
    private transient Map<Integer, Integer> damageMeter = new ArrayMap<Integer, Integer>();
    private long lastCombo, lastfametime, keydown_skill, lastSummonTime, lastChannelChange = System.currentTimeMillis(), exp, meso;
    private byte gender, secondGender, skinColor, secondSkinColor, gmLevel, burning;
    private short level, job;
    public short combo;
    private List<MapleSummon> mines = new ArrayList<MapleSummon>();
    public IItem cashPacketTemp = null;
    public int reborns, RecoveryShoot = 0;
    private int accountid, id, headtitle = 0,
            rank, rankMove, worldRank, worldRankdMove, mpApUsed, hpApUsed,
            hair, hair2, face, face2, remainingAp, fame, mapid, initialSpawnPoint,
            guildid, guildrank, allianceRank, fallcounter, maplepoints,
            nxcash, realcash, messengerposition, followid, chair, itemEffect,
            subcategory, innerExp, innerLevel, artifactPoints, CTS_MorphGage, cardStack,
            cardStackRunningId, betaclothes;
    public int[] remainingSp = new int[10];
    private transient MapleDragon dragon;
    public ScheduledFuture<?> rapidtimer1 = null;
    public ScheduledFuture<?> rapidtimer2 = null;
    public int RapidTimeCount = 0;

    private boolean canDoor, smega, hidden, petLoot, followinitiator, followon;
    private int[] wishlist, savedLocations;
    private Map<Integer, List<Integer>> rocks;
    private boolean fishing2 = false;
    private boolean fishings2 = false;
    private transient AtomicInteger inst;
    private transient List<LifeMovementFragment> lastres;
    private transient Set<MapleMonster> controlled;
    private transient Set<MapleMapObject> visibleMapObjects;
    private transient ScheduledFuture<?> hpDecreaseTask;
    private transient ScheduledFuture<?> mapTimeLimitTask, fishing;
    private transient ScheduledFuture<?> infinityReGenTask = null;
    private transient ScheduledFuture<?> diabolicRecoveryTask = null;
    private transient ScheduledFuture<?> InduerenseTask = null;
    private transient ScheduledFuture<?> selfRecoveryTask = null;
    private transient ScheduledFuture<?> mercedesRecoveryTask = null;
    private transient ScheduledFuture<?> SurPlusTask = null;

    private List<Integer> lastmonthfameids, extendedSlots;
    private int rankpoint;
    private List<MapleDoor> doors;
    private List<MapleMechDoor> mechdoors;
    private MaplePet[] pets = new MaplePet[3];
    private PhantomSteelSkill steelskills;
    private int glass_plusCTS_Morph = 1;
    private int glass_minusCTS_Morph = 9999;
    private List<IItem> rebuyList;
    private MapleShop aswanShopList;
    private transient MapleExtractor extractor;
    public int vpoints;
    private Map<MapleQuest, MapleQuestStatus> quests;
    private Map<Integer, String> questinfo;
    private Map<ISkill, SkillEntry> skills = new LinkedHashMap<ISkill, SkillEntry>();
    private List<InnerSkillValueHolder> innerSkills;
    private transient Map<BuffStats, List<BuffStatsValueHolder>> effects = new LinkedHashMap<BuffStats, List<BuffStatsValueHolder>>();
    private transient Map<BuffStats, List<StackedSkillEntry>> stackedEffects = new LinkedHashMap<BuffStats, List<StackedSkillEntry>>();
    private MapleCashInventory cashInv;
    private Map<String, String> CustomValues = new HashMap<String, String>();
    private Map<String, Integer> CustomValues2 = new HashMap<String, Integer>();
    private transient Map<Integer, Pair<Integer, MapleSummon>> summons;
    private transient Map<Integer, CoolDownValueHolder> coolDowns = new LinkedHashMap<Integer, CoolDownValueHolder>(50);
    private transient Map<DiseaseStats, DiseaseValueHolder> diseases;
    private MapleAlliance alliance;
    private BuddyList buddylist;
    private MapleClient client;
    private PlayerStats stats;
    private MapleAndroid android;
    private PlayerRandomStream CRand;
    private transient MapleMap map;
    private transient MapleShop shop;
    private MapleStorage storage;
    private transient MapleUserTrade trade;
    private MapleMount mount;
    private MapleMultiChat messenger;
    private IMapleCharacterShop playerShop;
    private MapleParty party;
    private MapleGuildCharacter mgc;
    private transient EventInstanceManager eventInstance;
    private MapleInventory[] inventory;
    private SkillMacro[] skillMacros = new SkillMacro[5];
    private MapleKeyLayout keylayout;
    private MapleProfession profession;
    private SkillEffectEntry skilleffects;
    public transient long lastUsedSkill = System.currentTimeMillis();
    public int usedSkillFast = 0;
    private short ForcingItem = 0;
    private int askguildid = 0;
    private transient Map<Integer, Integer> wpForce = new HashMap<Integer, Integer>();
    private int wp = 0;
    private MapleQuickSlot quickslot;
    public boolean skillmacros_changed = false,
            inventoryslot_changed = false,
            skillcooldown_changed = false,
            savedlocation_changed = false,
            keyvalue_changed = false,
            isCatching = false,
            isCatched = false,
            isExitBuff = true,
            EnergyCharge = false,
            isVoting = false,
            isDead = false,
            isMapiaVote = false,
            isDrVote = false,
            isPoliceVote = false;
    public String mapiajob = "";
    public int voteamount = 0, getmapiavote = 0, getpolicevote = 0, getdrvote = 0;
    private int petAutoHP, petAutoMP, SurPlus = 0, PPoint = 0, Bullet = 0, Cylinder = 3, Cycount = 0, monsterCombo = 0, ELEMENTAL_CHARGE = 0, ELEMENTAL_CHARGE_ID = 0;
    private long lastViewTime, monsterComboTime;
    private byte blessOfDarkness;
    public boolean isFinalFiguration = false, isTrade = false;
    public int flipTheCoin = 0, combination = 0, beath = 0, attackcount = 0, acaneAim = 0, elementalAdep = -1, exeedCount = 0, exeedSkill = 0, exeedAttackCount = 0, dualBrid = 0, unitiyOfPower = 0, lightning = 0;
    public int KillingPoint;
    private int hitcountbat, batcount;
    public final Integer effectssy = 0;
    public Equip MemorialE = null;
    private ScheduledFuture<?> pendantOfSpirit = null;
    public boolean quiver = false;
    public int quivermode = 0;
    public int[] quivercount = {10, 10, 10};
    /* Rune 처리 구간 시작 */
    private ScheduledFuture<?> LastTouchedRune = null;
    private int TouchedRune, LastTouchedRuneTime = 0;
    /* Rune 처리 구간 끝 */
 /* Starforce 처리 구간 시작 */
    private int itemstaticcount = 0;
    private int itemstatic1 = 0;
    private int itemstatic2 = 0;
    private int itemstatic3 = 0;
    private int itemstatic4 = 0;
    private int itemstatic5 = 0;
    private String scrollstring1 = "";
    private String scrollstring2 = "";
    private String scrollstring3 = "";
    private String scrollstring4 = "";
    private String scrollstring5 = "";
    private int scrollcount = 0;
    private int scrollacount = 0;
    private int scrollorder = 0;
    private int StarPer[] = {0, 0, 0};
    private List<Pair<EnchantEquipStats, Integer>> stata = new ArrayList<Pair<EnchantEquipStats, Integer>>();
    /* StarForce 처리 구간 끝 */
    private int gp;
    private int Soul;
    private byte pendantExp = 0;
    private boolean prmiumpc = false;
    public java.util.Timer fishings = null;
    public int fishingfirst = 0;
    public long time = 0;
    private String chatban;
    private String chairtext;
    private long reincarnationTime = -1;
    private int reincarnationCount = 30;
    private int reincarnationMobCount = 30;
    private transient CalcDamage calcDamage;
    private int slimeVirusCount = 10;
    public int SpiritGuard = 3;
    public int luminusskill[] = new int[2];
    public int luminusskillLen[] = new int[2];
    public int deathCount = 1;
    private int BULLET_SKILL_ID;
    private Map<Integer, Pair<Integer, Integer>> link_skill = new HashMap<Integer, Pair<Integer, Integer>>();
    public byte soulEffect = 1;
    private int WarpRand = -1;
    private long DamageMeter_ = -1;
    private int loginpoint = 0;
    private long logintimer = -1;
    private long eaTime = 0;

    private int damageskinslot;
    private int karta = 0;
    private int[] saveDamageSkin = new int[10];

    private long damage;
    private int damagehit = 1;

    private MapleCharacter(final boolean ChannelServer) {
        setStance(0);
        setPosition(new Point(0, 0));
        inventory = new MapleInventory[MapleInventoryType.values().length];
        for (MapleInventoryType type : MapleInventoryType.values()) {
            inventory[type.ordinal()] = new MapleInventory(type);
        }
        quests = new LinkedHashMap<MapleQuest, MapleQuestStatus>(); // Stupid erev quest.
        stats = new PlayerStats();
        profession = new MapleProfession(this);
        innerSkills = new LinkedList<InnerSkillValueHolder>();
        aswanShopList = null;
        for (int i = 0; i < remainingSp.length; i++) {
            remainingSp[i] = 0;
        }
        if (ChannelServer) {
            lastCombo = 0;
            combo = 0;
            keydown_skill = 0;
            messengerposition = 4;
            canDoor = true;
            smega = true;
            isExitBuff = true;
            wishlist = new int[12];
            rocks = new HashMap<Integer, List<Integer>>();
            inst = new AtomicInteger();
            inst.set(0); // 1 = NPC Quest, 2 = Duey, 3 = Hired Merch store, 4 = Storage
            keylayout = new MapleKeyLayout();
            doors = new ArrayList<MapleDoor>();
            mechdoors = new ArrayList<MapleMechDoor>();
            diseases = new LinkedHashMap<DiseaseStats, DiseaseValueHolder>(5);
            controlled = new LinkedHashSet<MapleMonster>();
            summons = new LinkedHashMap<Integer, Pair<Integer, MapleSummon>>();
            visibleMapObjects = new LinkedHashSet<MapleMapObject>();
            skilleffects = null;
            savedLocations = new int[SavedLocationType.values().length];
            for (int i = 0; i < SavedLocationType.values().length; i++) {
                savedLocations[i] = -1;
            }
            questinfo = new LinkedHashMap<Integer, String>();
            cardStack = 0;
            cardStackRunningId = 0;
            android = null;
            extendedSlots = new ArrayList<Integer>();
            followid = 0;
            followinitiator = false;
            followon = false;
        }
    }

    public static MapleCharacter getDefault(final MapleClient client) {
        MapleCharacter ret = new MapleCharacter(false);
        ret.client = client;
        ret.map = null;
        ret.exp = 0;
        ret.gmLevel = 0;
        ret.job = 0;
        ret.meso = 0;
        ret.level = 1;
        ret.remainingAp = 0;
        ret.fame = 0;
        ret.accountid = client.getAccID();
        ret.buddylist = new BuddyList(50);
        ret.stats.str = 12;
        ret.stats.dex = 5;
        ret.stats.int_ = 4;
        ret.stats.luk = 4;
        ret.stats.maxhp = 50;
        ret.stats.hp = 50;
        ret.stats.maxmp = 5;
        ret.stats.mp = 5;

        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps;
            ps = con.prepareStatement("SELECT name, nxCash, mPoints, vpoints, realcash FROM accounts WHERE id = ?");
            ps.setInt(1, ret.accountid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                ret.client.setAccountName(rs.getString("name"));
                ret.nxcash = rs.getInt("nxCash");
                ret.maplepoints = rs.getInt("mPoints");
                ret.vpoints = rs.getInt("vpoints");
                ret.realcash = rs.getInt("realcash");
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Error getting character default" + e);
        }
        return ret;
    }

    public final static MapleCharacter ReconstructChr(final ChracterTransfer ct, final MapleClient client, final boolean isChannel) {
        MapleCharacter ret = new MapleCharacter(true); // Always true, it's change channel
        ret.client = client;
        if (!isChannel) {
            ret.client.setChannel(ct.channel);
        }
        ret.id = ct.characterid;
        ret.name = ct.name;
        ret.level = ct.level;
        ret.fame = ct.fame;

        ret.CRand = new PlayerRandomStream();

        ret.stats.setStr(ct.str);
        ret.stats.setDex(ct.dex);
        ret.stats.setInt(ct.int_);
        ret.stats.setLuk(ct.luk);
        ret.stats.setMaxHp(ct.maxhp);
        ret.stats.setMaxMp(ct.maxmp);
        ret.stats.hp = (ct.hp);
        ret.stats.mp = (ct.mp);

        ret.exp = ct.exp;
        ret.hpApUsed = ct.hpApUsed;
        ret.mpApUsed = ct.mpApUsed;
        ret.remainingSp = (int[]) ct.remainingSp;
        ret.remainingAp = ct.remainingAp;
        ret.meso = ct.meso;
        ret.gmLevel = ct.gmLevel;
        ret.skinColor = ct.skinColor;
        ret.secondSkinColor = ct.secondSkinColor;
        ret.gender = ct.gender;
        ret.secondGender = ct.secondGender;
        ret.job = ct.job;
        ret.hair = ct.hair;
        ret.hair2 = ct.hair2;
        ret.face = ct.face;
        ret.face2 = ct.face2;
        ret.wp = ct.wp;
        ret.askguildid = ct.askguildid;
        ret.accountid = ct.accountid;
        ret.mapid = ct.mapid;
        ret.initialSpawnPoint = ct.initialSpawnPoint;
        ret.rank = ct.rank;
        ret.rankMove = ct.rankMove;
        ret.worldRank = ct.worldRank;
        ret.worldRankdMove = ct.worldRankMove;
        ret.reborns = ct.reborns;
        ret.guildid = ct.guildid;
        ret.guildrank = ct.guildrank;
        ret.allianceRank = ct.alliancerank;
        ret.subcategory = ct.subcategory;
        ret.exeedCount = ct.exeedCount;
        ret.rankpoint = ct.rankpoint;
        ret.gp = ct.gp;
        ret.Soul = ct.Soul;
        ret.chatban = ct.chatban;
        ret.betaclothes = ct.betaclothes;
        ret.karta = ct.karta;
        ret.extendedSlots = (List<Integer>) ct.extendedSlots;
        ret.loginpoint = ct.loginpoint;
        ret.nMixBaseHairColor = ct.nMixBaseHairColor;
        ret.itcafetime = ct.itcafetime;
        ret.damageskinslot = ct.damageskinslot;
        ret.saveDamageSkin = (int[]) ct.saveDamageSkin;
        ret.damage = ct.damage;
        ret.damagehit = ct.damagehit;
        ret.freejob = ct.freejob;
        ret.nMixAddHairColor = ct.nMixAddHairColor;
        ret.nMixHairBaseProb = ct.nMixHairBaseProb;
        ret.logintimer = ct.logintimer;
        if (ret.guildid > 0) {
            ret.mgc = new MapleGuildCharacter(ret);
        }
        ret.buddylist = new BuddyList(ct.buddysize);
        ret.cashInv = (MapleCashInventory) ct.cashinventory;
        ret.quickslot = (MapleQuickSlot) ct.quickslot;
        ret.CustomValues = ct.CustomValues;
        ret.CustomValues2 = ct.CustomValues2;
        ret.steelskills = (PhantomSteelSkill) ct.steelskills;
        ret.rebuyList = (ArrayList<IItem>) ct.rebuyList;
        ret.profession = (MapleProfession) ct.profession;
        ret.stats = (PlayerStats) ct.stats;
        ret.hidden = ct.hidden;
        ret.innerExp = ct.innerexp;
        ret.innerLevel = ct.innerlevel;
        ret.isFinalFiguration = ct.isFinalFiguration;
        ret.innerSkills = (LinkedList<InnerSkillValueHolder>) ct.innerSkills;
        ret.aswanShopList = (MapleShop) ct.aswanShopList;
        ret.lastChannelChange = System.currentTimeMillis();
        if (isChannel) {
            final MapleWorldMapProvider mapFactory = ChannelServer.getInstance(client.getChannel()).getMapFactory();
            ret.map = mapFactory.getMap(ret.mapid);
            if (ret.map == null) {
                ret.map = mapFactory.getMap(101050000);
            } else if (ret.map.getForcedReturnId() != 999999999) {
                ret.map = ret.map.getForcedReturnMap();
            }
            MaplePortal portal = ret.map.getPortal(ret.initialSpawnPoint);
            if (portal == null) {
                portal = ret.map.getPortal(0); // char is on a spawnpoint that doesn't exist - select the first spawnpoint instead
                ret.initialSpawnPoint = 0;
            }
            ret.setPosition(portal.getPosition());

            int partyid = ct.partyid;
            if (partyid >= 0) {
                MapleParty party = WorldCommunity.getParty(partyid);
                if (party != null && party.getMemberById(ret.id) != null) {
                    ret.party = party;
                }
            }

            final int messengerid = ct.messengerid;
            final int position = ct.messengerposition;
            if (messengerid > 0 && position < 4 && position > -1) {
                MapleMultiChat messenger = WorldCommunity.getMessenger(messengerid);
                if (messenger != null) {
                    ret.messenger = messenger;
                    ret.messengerposition = position;
                }
            }
        } else {
            int partyid = ct.partyid;
            if (partyid >= 0) {
                MapleParty party = WorldCommunity.getParty(partyid);
                if (party != null && party.getMemberById(ret.id) != null) {
                    ret.party = party;
                }
            }

            ret.messenger = null;
            ret.messengerposition = ct.messengerposition;
        }

        MapleQuestStatus queststatus;
        MapleQuestStatus queststatus_from;
        MapleQuest quest;
        for (final Map.Entry<Integer, Object> qs : ct.Quest.entrySet()) {
            quest = MapleQuest.getInstance(qs.getKey());
            queststatus_from = (MapleQuestStatus) qs.getValue();

            queststatus = new MapleQuestStatus(quest, queststatus_from.getStatus());
            queststatus.setForfeited(queststatus_from.getForfeited());
            queststatus.setCustomData(queststatus_from.getCustomData());
            queststatus.setCompletionTime(queststatus_from.getCompletionTime());

            if (queststatus_from.getMobKills() != null) {
                for (final Map.Entry<Integer, Integer> mobkills : queststatus_from.getMobKills().entrySet()) {
                    queststatus.setMobKills(mobkills.getKey(), mobkills.getValue());
                }
            }
            ret.quests.put(quest, queststatus);
        }
        for (final Map.Entry<Integer, Object> qs : ct.Skills.entrySet()) {
            ret.skills.put(SkillFactory.getSkill(qs.getKey()), (SkillEntry) qs.getValue());
        }

        ret.inventory = (MapleInventory[]) ct.inventorys;
        ret.BlessOfFairy_Origin = ct.BlessOfFairy;
        ret.BlessOfEmpress_Origin = ct.BlessOfEmpress;
        ret.skillMacros = (SkillMacro[]) ct.skillmacro;
        ret.keylayout = (MapleKeyLayout) ct.keymap;
        ret.questinfo = (Map<Integer, String>) ct.InfoQuest;
        ret.savedLocations = (int[]) ct.savedlocation;
        ret.wishlist = (int[]) ct.wishlist;
        ret.rocks = (Map<Integer, List<Integer>>) ct.rocks;
        ret.burning = ct.burning;

        ret.buddylist.loadFromTransfer(ct.buddies);
        ret.keydown_skill = 0; // Keydown skill can't be brought over
        ret.lastfametime = ct.lastfametime;
        ret.lastmonthfameids = (List<Integer>) ct.famedcharacters;
        ret.storage = (MapleStorage) ct.storage;
        client.setAccountName(ct.accountname);
        ret.nxcash = ct.nxcash;
        ret.vpoints = ct.vpoints;
        ret.realcash = ct.realcash;
        ret.maplepoints = ct.MaplePoints;
        ret.headtitle = ct.headtitle;
        ret.cardStack = ct.cardStack;
        ret.android = (MapleAndroid) ct.android;
        ret.pets = ct.pets;
        ret.petAutoHP = ct.petAutoHP;
        ret.petAutoMP = ct.petAutoMP;
        ret.petLoot = ct.petLoot;
        ret.mount = new MapleMount(ret, ct.mount_itemid, 80001000, ct.mount_Fatigue, ct.mount_level, ct.mount_exp);
        ret.silentEnforceMaxHpMp();
        return ret;
    }

    public static MapleCharacter loadCharFromDB(int charid, MapleClient client, boolean channelserver) {
        return loadCharFromDB(charid, client, channelserver, null);
    }

    public static MapleCharacter loadCharFromDB(int charid, MapleClient client, boolean channelserver, final Map<Integer, CardData> cads) {
        MapleCharacter ret = new MapleCharacter(channelserver);
        ret.client = client;
        ret.id = charid;
        ret.calcDamage = new CalcDamage();
        long t = System.currentTimeMillis();

        Connection con = null;
        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;

        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM characters WHERE id = ?");
            ps.setInt(1, charid);
            rs = ps.executeQuery();
            if (!rs.next()) {
                throw new RuntimeException("Loading the Char Failed (char not found)");
            }
            ret.name = rs.getString("name");
            ret.level = rs.getShort("level");
            ret.fame = rs.getInt("fame");

            ret.stats = new PlayerStats();
            ret.profession = new MapleProfession(ret);

            if (channelserver) {
                ret.stats.setStr(rs.getInt("str"));
                ret.stats.setDex(rs.getInt("dex"));
                ret.stats.setInt(rs.getInt("int"));
                ret.stats.setLuk(rs.getInt("luk"));
                ret.stats.setMaxHp(rs.getInt("maxhp"));
                ret.stats.setMaxMp(rs.getInt("maxmp"));
                ret.stats.hp = rs.getInt("hp");
                ret.stats.mp = rs.getInt("mp");
            } else {
                ret.stats.str = rs.getInt("str");
                ret.stats.dex = rs.getInt("dex");
                ret.stats.int_ = rs.getInt("int");
                ret.stats.luk = rs.getInt("luk");
                ret.stats.maxhp = rs.getInt("maxhp");
                ret.stats.maxmp = rs.getInt("maxmp");
                ret.stats.hp = rs.getInt("hp");
                ret.stats.mp = rs.getInt("mp");
            }

            ret.exp = rs.getLong("exp");
            ret.hpApUsed = rs.getInt("hpApUsed");
            ret.mpApUsed = rs.getInt("mpApUsed");

            final String[] sp = rs.getString("sp").split(",");
            for (int i = 0; i < ret.remainingSp.length; i++) {
                ret.remainingSp[i] = Integer.parseInt(sp[i]);
            }

            ret.remainingAp = rs.getInt("ap");
            ret.subcategory = rs.getInt("subcategory");
            ret.meso = rs.getLong("meso");
            ret.gmLevel = rs.getByte("gm");
            ret.skinColor = rs.getByte("skincolor");
            ret.secondSkinColor = rs.getByte("skincolor2");
            ret.gender = rs.getByte("gender");
            ret.secondGender = rs.getByte("gender2");
            ret.job = rs.getShort("job");
            ret.hair = rs.getInt("hair");
            ret.hair2 = rs.getInt("hair2");
            ret.face = rs.getInt("face");
            ret.face2 = rs.getInt("face2");
            ret.wp = rs.getInt("wp");
            ret.askguildid = rs.getInt("askguildid");
            ret.accountid = rs.getInt("accountid");
            ret.mapid = rs.getInt("map");
            ret.initialSpawnPoint = rs.getInt("spawnpoint");
            ret.rank = rs.getInt("rank");
            ret.rankMove = rs.getInt("rankMove");
            ret.worldRank = rs.getInt("worldRank");
            ret.worldRankdMove = rs.getInt("worldRankMove");
            ret.guildid = rs.getInt("guildid");
            ret.guildrank = rs.getInt("guildrank");
            ret.allianceRank = rs.getInt("allianceRank");
            ret.gp = rs.getInt("gp");
            ret.Soul = rs.getInt("Soul");
            ret.chatban = rs.getString("chatban");
            ret.betaclothes = rs.getInt("betaclothes");
            ret.karta = rs.getInt("karta");
            ret.burning = rs.getByte("burning");
            ret.reborns = rs.getInt("reborns");
            ret.profession.setFirstProfession(MapleProfessionType.getProfessionById(rs.getInt("firstProfession")));
            ret.profession.setSecondProfession(MapleProfessionType.getProfessionById(rs.getInt("secondProfession")));
            ret.profession.setFirstProfessionLevel(rs.getInt("firstProfessionLevel"));
            ret.profession.setSecondProfessionLevel(rs.getInt("secondProfessionLevel"));
            ret.profession.setFirstProfessionExp(rs.getInt("firstProfessionExp"));
            ret.profession.setSecondProfessionExp(rs.getInt("secondProfessionExp"));
            ret.profession.setFatigue(rs.getInt("fatigue"));
            ret.lastViewTime = rs.getLong("last_command_time");
            ret.getStat().setAmbition(rs.getInt("ambition"));
            ret.getStat().setCharm(rs.getInt("charm"));
            ret.getStat().setDiligence(rs.getInt("diligence"));
            ret.getStat().setEmpathy(rs.getInt("empathy"));
            ret.getStat().setInsight(rs.getInt("insight"));
            ret.getStat().setWillPower(rs.getInt("willpower"));
            if (ret.guildid > 0 && client != null) {
                ret.mgc = new MapleGuildCharacter(ret);
            }
            ret.buddylist = new BuddyList(rs.getInt("buddyCapacity"));
            ret.innerExp = rs.getInt("innerExp");
            ret.innerLevel = rs.getInt("innerLevel");
            ret.artifactPoints = rs.getInt("artifactPoints");
            ret.CTS_MorphGage = rs.getInt("morphGage");
            ret.petLoot = rs.getInt("pet_loot") == 1;
            ret.loginpoint = rs.getInt("loginpoint");
            ret.nMixBaseHairColor = rs.getInt("nMixBaseHairColor");
            ret.itcafetime = rs.getInt("itcafetime");
            ret.damageskinslot = rs.getInt("damageskinslot");
            final String spp[] = rs.getString("saveDamageSkin").split(",");
            for (int i = 0; i < ret.saveDamageSkin.length; i++) {
                ret.saveDamageSkin[i] = Integer.parseInt(spp[i]);
            }
            ret.damage = rs.getLong("damage");
            ret.damagehit = rs.getInt("damagehit");
            ret.freejob = rs.getInt("freejob");
            ret.nMixAddHairColor = rs.getInt("nMixAddHairColor");
            ret.nMixHairBaseProb = rs.getInt("nMixHairBaseProb");
            if (ServerConstants.isLocal) {
                System.out.println("base info : " + (System.currentTimeMillis() - t) + "ms");
                t = System.currentTimeMillis();
            }
            if (channelserver) {
                MapleWorldMapProvider mapFactory = ChannelServer.getInstance(client.getChannel()).getMapFactory();
                ret.map = mapFactory.getMap(ret.mapid);
                if (ret.map == null) { //char is on a map that doesn't exist warp it to henesys
                    ret.map = mapFactory.getMap(101050000);
                }
                MaplePortal portal = ret.map.getPortal(ret.initialSpawnPoint);
                if (portal == null) {
                    portal = ret.map.getPortal(0); // char is on a spawnpoint that doesn't exist - select the first spawnpoint instead
                    ret.initialSpawnPoint = 0;
                }
                if (ServerConstants.isLocal) {
                    System.out.println("map info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ret.setPosition(portal.getPosition());

                int partyid = rs.getInt("party");
                if (partyid >= 0) {
                    MapleParty party = WorldCommunity.getParty(partyid);
                    if (party != null && party.getMemberById(ret.id) != null) {
                        ret.party = party;
                    }
                }

                final int messengerid = rs.getInt("messengerid");
                final int position = rs.getInt("messengerposition");
                if (messengerid > 0 && position < 4 && position > -1) {
                    MapleMultiChat messenger = WorldCommunity.getMessenger(messengerid);
                    if (messenger != null) {
                        ret.messenger = messenger;
                        ret.messengerposition = position;
                    }
                }

                if (ServerConstants.isLocal) {
                    System.out.println("etc info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                /* Pet Loading... */
                String[] pets = rs.getString("pet_id").split(",");
                ps = con.prepareStatement("SELECT * FROM inventoryitems WHERE uniqueid = ?");
                for (int next = 0; next < 3; ++next) {
                    if (!pets[next].equals("-1")) {
                        int petid = Integer.parseInt(pets[next]);
                        ps.setInt(1, petid);
                        rs = ps.executeQuery();
                        while (rs.next()) {
                            MaplePet pet = MaplePet.loadFromDb(rs.getInt("itemid"), petid, rs.getShort("position"));
                            ret.addPetBySlotId(pet, (byte) next);
                        }
                        rs.close();
                    }
                }
                ps.close();
            }
            rs.close();
            ps.close();

            if (ServerConstants.isLocal) {
                System.out.println("pet info : " + (System.currentTimeMillis() - t) + "ms");
                t = System.currentTimeMillis();
            }

            if (channelserver) {
                ps = con.prepareStatement("SELECT * FROM queststatus WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                pse = con.prepareStatement("SELECT * FROM queststatusmobs WHERE queststatusid = ?");
                if (ServerConstants.isLocal) {
                    System.out.println("quest query time : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                while (rs.next()) {
                    final int id = rs.getInt("quest");
                    final MapleQuest q = MapleQuest.getInstance(id);
                    final MapleQuestStatus status = new MapleQuestStatus(q, rs.getByte("status"));
                    final long cTime = rs.getLong("time");
                    if (cTime > -1) {
                        status.setCompletionTime(cTime * 1000);
                    }
                    status.setForfeited(rs.getInt("forfeited"));
                    status.setCustomData(rs.getString("customData"));
                    ret.quests.put(q, status);
                    pse.setInt(1, rs.getInt("queststatusid"));
                    final ResultSet rsMobs = pse.executeQuery();

                    while (rsMobs.next()) {
                        status.setMobKills(rsMobs.getInt("mob"), rsMobs.getInt("count"));
                    }
                    rsMobs.close();
                }
                rs.close();
                ps.close();
                pse.close();

                if (ServerConstants.isLocal) {
                    System.out.println("quest info parsing : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ret.loadKeyValues();
                if (ServerConstants.isLocal) {
                    System.out.println("keyvalues info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                if (ret.getKeyValue("HeadTitle") == null) {
                    ret.setKeyValue("HeadTitle", "0");
                }
                ret.headtitle = Integer.parseInt(ret.getKeyValue("HeadTitle"));
                ret.CRand = new PlayerRandomStream();

                ps = con.prepareStatement("SELECT * FROM inventoryslot where characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();

                if (!rs.next()) {
                    throw new RuntimeException("No Inventory slot column found in SQL. [inventoryslot]");
                } else {
                    ret.getInventory(MapleInventoryType.EQUIP).setSlotLimit(rs.getByte("equip"));
                    ret.getInventory(MapleInventoryType.USE).setSlotLimit(rs.getByte("use"));
                    ret.getInventory(MapleInventoryType.SETUP).setSlotLimit(rs.getByte("setup"));
                    ret.getInventory(MapleInventoryType.ETC).setSlotLimit(rs.getByte("etc"));
                    ret.getInventory(MapleInventoryType.CASH).setSlotLimit(rs.getByte("cash"));
                }
                ps.close();
                rs.close();

                if (ServerConstants.isLocal) {
                    System.out.println("etc2 info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ItemFactory.loadItemsFromPlayer(ret);
                if (ServerConstants.isLocal) {
                    System.out.println("inventory info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ret.cashInv = new MapleCashInventory(ret.accountid);
                ret.cashInv.loadFromDB();

                if (ServerConstants.isLocal) {
                    System.out.println("csinv info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                rs.close();
                ps.close();

                ret.quickslot = new MapleQuickSlot(ret.id);
                ret.quickslot.loadFromDB();

                ps = con.prepareStatement("SELECT * FROM accounts WHERE id = ?");
                ps.setInt(1, ret.accountid);
                rs = ps.executeQuery();
                if (rs.next()) {
                    ret.getClient().setAccountName(rs.getString("name"));
                    ret.nxcash = rs.getInt("nxCash");
                    ret.vpoints = rs.getInt("vpoints");
                    ret.maplepoints = rs.getInt("mPoints");
                    ret.realcash = rs.getInt("realcash");
                }
                rs.close();
                ps.close();

                if (ServerConstants.isLocal) {
                    System.out.println("etc3 info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ps = con.prepareStatement("SELECT * FROM questinfo WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();

                while (rs.next()) {
                    ret.questinfo.put(rs.getInt("quest"), rs.getString("data"));
                }
                rs.close();
                ps.close();

                if (ServerConstants.isLocal) {
                    System.out.println("questinfo info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ps = con.prepareStatement("SELECT skillid, skilllevel, masterlevel, expiration FROM skills WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    int sid = rs.getInt("skillid");
                    if (sid == 80001044
                            || sid == 80001027
                            || sid == 80001028
                            || sid == 80001137
                            || sid == 80001144) {
                        continue;
                    }
                    ret.skills.put(SkillFactory.getSkill(rs.getInt("skillid")), new SkillEntry(rs.getByte("skilllevel"), rs.getByte("masterlevel"), rs.getLong("expiration")));
                }
                rs.close();
                ps.close();
                ps = con.prepareStatement("SELECT SkillID,StartTime,length FROM skills_cooldowns WHERE charid = ?");
                ps.setInt(1, ret.getId());
                rs = ps.executeQuery();
                while (rs.next()) {
                    int time = (int) (rs.getLong("length") + rs.getLong("StartTime") - System.currentTimeMillis());
                    if (time <= 0) {
                        System.out.println("스킬테스트 : " + time + "초");
                        continue;
                    }
                    ret.addCooldown(rs.getInt("SkillID"), rs.getLong("StartTime"), rs.getLong("length"));
                }
                ps.close();
                rs.close();
                if (ServerConstants.isLocal) {
                    System.out.println("skill info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ps = con.prepareStatement("SELECT skill_id, skill_level, max_level, rank FROM inner_ability_skills WHERE player_id = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.innerSkills.add(new InnerSkillValueHolder(rs.getInt("skill_id"), (byte) rs.getInt("skill_level"), (byte) rs.getInt("max_level"), (byte) rs.getInt("rank")));
                }
                rs.close();
                ps.close();

                if (ServerConstants.isLocal) {
                    System.out.println("inner info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ret.retrieveLinkBless();

                if (ServerConstants.isLocal) {
                    System.out.println("linkbless info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ps = con.prepareStatement("SELECT * FROM skillmacros WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                int position;
                while (rs.next()) {
                    position = rs.getInt("position");
                    SkillMacro macro = new SkillMacro(rs.getInt("skill1"), rs.getInt("skill2"), rs.getInt("skill3"), rs.getString("name"), rs.getInt("shout"), position);
                    ret.skillMacros[position] = macro;
                }

                rs.close();
                ps.close();

                if (ServerConstants.isLocal) {
                    System.out.println("skillmacro info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ps = con.prepareStatement("SELECT `key`,`type`,`action` FROM keymap WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();

                final Map<Integer, MapleKeyBinding> keyb = ret.keylayout.Layout();
                while (rs.next()) {
                    keyb.put(Integer.valueOf(rs.getInt("key")), new MapleKeyBinding(rs.getInt("type"), rs.getInt("action")));
                }
                rs.close();
                ps.close();

                if (ServerConstants.isLocal) {
                    System.out.println("keymap info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ps = con.prepareStatement("SELECT `locationtype`,`map` FROM savedlocations WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.savedLocations[rs.getInt("locationtype")] = rs.getInt("map");
                }
                rs.close();
                ps.close();

                ps = con.prepareStatement("SELECT `characterid_to`,`when` FROM famelog WHERE characterid = ? AND DATEDIFF(NOW(),`when`) < 30");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                ret.lastfametime = 0;
                ret.lastmonthfameids = new ArrayList<Integer>(31);
                while (rs.next()) {
                    ret.lastfametime = Math.max(ret.lastfametime, rs.getTimestamp("when").getTime());
                    ret.lastmonthfameids.add(Integer.valueOf(rs.getInt("characterid_to")));
                }
                rs.close();
                ps.close();

                ret.buddylist.loadFromDb(charid);
                ret.storage = MapleStorage.loadStorage(ret.accountid);
                ret.loadSteelSkills();

                ps = con.prepareStatement("SELECT sn FROM wishlist WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                int i = 0;
                while (rs.next()) {
                    ret.wishlist[i] = rs.getInt("sn");
                    i++;
                }
                while (i < 12) {
                    ret.wishlist[i] = 0;
                    i++;
                }
                rs.close();
                ps.close();

                if (ServerConstants.isLocal) {
                    System.out.println("etc4 info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ps = con.prepareStatement("SELECT `uniqueid` FROM extendedslots WHERE characterid = ? ORDER by `index` ASC");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.extendedSlots.add(Integer.valueOf(rs.getInt("uniqueid")));
                }
                rs.close();
                ps.close();

                if (ServerConstants.isLocal) {
                    System.out.println("bags info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }
                ps = con.prepareStatement("SELECT mapid, type FROM trocklocations WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    ret.addTrockMap(rs.getInt("type"), rs.getInt("mapid"));
                }
                rs.close();
                ps.close();

                ps = con.prepareStatement("SELECT * FROM mountdata WHERE characterid = ?");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                if (!rs.next()) {
                    throw new RuntimeException("No mount data found on SQL column");
                }
                final IItem mount = ret.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -22);
                ret.mount = new MapleMount(ret, mount != null ? mount.getItemId() : 0, 1004, rs.getInt("Fatigue"), rs.getInt("Level"), rs.getInt("Exp"));
                ps.close();
                rs.close();
                loadItemPot(charid);

                if (ServerConstants.isLocal) {
                    System.out.println("etc5 info : " + (System.currentTimeMillis() - t) + "ms");
                    t = System.currentTimeMillis();
                }

            } else { // Not channel server
                ps = con.prepareStatement("SELECT itemid, `position`, flag FROM inventoryitems LEFT JOIN inventoryequipment USING (inventoryitemid) WHERE characterid = ? AND type = 1 AND inventorytype = -1");
                ps.setInt(1, charid);
                rs = ps.executeQuery();
                while (rs.next()) {
                    final Equip equip = new Equip(rs.getInt("itemid"), rs.getShort("position"), rs.getShort("flag"));
                    ret.getInventory(MapleInventoryType.EQUIPPED).addFromDB(equip);
                }
                rs.close();
                ps.close();
            }
        } catch (SQLException ess) {
            if (!ServerConstants.realese) {
                ess.printStackTrace();
            }
            System.err.println("캐릭터 로딩에 실패했습니다.");
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ignore) {

            }
        }
        if (ServerConstants.isLocal) {
            System.out.println("QUERY Searched Time : " + (System.currentTimeMillis() - t) + "ms");
        }
        t = System.currentTimeMillis();
        if (channelserver) {
            if (ret.stats.getHp() > ret.stats.getCurrentMaxHp()) {
                ret.stats.setHp(ret.stats.getCurrentMaxHp(), ret);
            }
            if (ret.stats.getMp() > ret.stats.getCurrentMaxMp()) {
                ret.stats.setMp(ret.stats.getCurrentMaxMp());
            }
        }
        ret.stats.recalcLocalStats(ret);
        ret.silentEnforceMaxHpMp();
        //ret.loadMarri();
        if (ServerConstants.isLocal) {
            System.out.println("all char loaded time : " + (System.currentTimeMillis() - t) + "ms");
        }
        return ret;
    }

    public static void saveNewCharToDB(final MapleCharacter chr) {
        Connection con = null;
        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;
        try {
            con = MYSQL.getConnection();
            con.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);
            con.setAutoCommit(false);
            ps = con.prepareStatement("INSERT INTO characters (level, fame, str, dex, luk, `int`, exp, hp, mp, maxhp, maxmp, sp, ap, gm, skincolor, skincolor2, gender, gender2, job, hair, hair2, face, face2, wp, askguildid, map, meso, hpApUsed, mpApUsed, spawnpoint, party, buddyCapacity, messengerid, messengerposition, monsterbookcover, accountid, name, reborns, subcategory, rankpoint, gp, Soul, chatban, betaclothes, nMixBaseHairColor, nMixAddHairColor, nMixHairBaseProb, karta, itcafetime, damageskinslot, saveDamageSkin, damage, damagehit, freejob) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", MYSQL.RETURN_GENERATED_KEYS);
            final PlayerStats stat = chr.stats;
            int level = 1;
            if (GameConstants.isZero(chr.getJob())) {
                level = 100;
                stat.setMaxHp(7457);
                stat.setMaxMp(100);
                stat.setStr(518);
                stat.setCurrentMaxHp(7457);
                stat.setCurrentMaxMp(100);
            }
            ps.setInt(1, level); // Level
            ps.setInt(2, chr.fame); // Fame
            ps.setInt(3, stat.getStr()); // Str
            ps.setInt(4, stat.getDex()); // Dex
            ps.setInt(5, stat.getInt()); // Int
            ps.setInt(6, stat.getLuk()); // Luk
            ps.setInt(7, 0); // EXP
            ps.setLong(8, stat.getHp()); // HP
            ps.setInt(9, stat.getMp()); // MP
            ps.setInt(10, stat.getMaxHp());
            ps.setInt(11, stat.getMaxMp());
            ps.setString(12, "0,0,0,0,0,0,0,0,0,0"); // Remaining SP
            ps.setInt(13, 0); // Remaining AP
            ps.setInt(14, 0); // GM Level
            ps.setByte(15, chr.skinColor);
            ps.setByte(16, chr.secondSkinColor);
            if (GameConstants.isZero(chr.getJob())) {
                ps.setByte(17, (byte) 0);
                ps.setByte(18, (byte) 1);
            } else {
                ps.setByte(17, chr.gender);
                ps.setByte(18, chr.secondGender);
            }
            ps.setInt(19, chr.job);
            ps.setInt(20, chr.hair);
            ps.setInt(21, chr.hair2);
            ps.setInt(22, chr.face);
            ps.setInt(23, chr.face2);
            ps.setInt(24, chr.wp);
            ps.setInt(25, chr.askguildid);
            ps.setInt(26, chr.mapid);
            ps.setLong(27, chr.meso); // Meso
            ps.setInt(28, 0); // HP ap used
            ps.setInt(29, 0); // MP ap used
            ps.setInt(30, 0); // Spawnpoint
            ps.setInt(31, -1); // Party
            ps.setInt(32, chr.buddylist.getCapacity()); // Buddylist
            ps.setInt(33, 0); // MessengerId
            ps.setInt(34, 4); // Messenger Position
            ps.setInt(35, 0); // Monster book cover
            ps.setInt(36, chr.getAccountID());
            ps.setString(37, chr.name);
            ps.setInt(38, chr.reborns);
            ps.setInt(39, chr.subcategory); //for now
            ps.setInt(40, chr.rankpoint);
            ps.setInt(41, chr.gp);
            ps.setInt(42, chr.Soul);
            ps.setString(43, "false");
            ps.setInt(44, 0); // BetaClothes
            ps.setInt(45, 0); // BetaClothes
            ps.setInt(46, 0); // BetaClothes
            ps.setInt(47, 0); // BetaClothes
            ps.setInt(48, GameConstants.isMercedes(chr.job) ? 1 : 0);
            ps.setInt(49, 0);
            ps.setInt(50, 0);
            ps.setString(51, "0,0,0,0,0,0,0,0,0,0");
            ps.setLong(52, chr.damage);
            ps.setInt(53, chr.damagehit);
            ps.setInt(54, chr.freejob);
            ps.executeUpdate();

            rs = ps.getGeneratedKeys();
            if (rs.next()) {
                chr.id = rs.getInt(1);
            } else {
                throw new MYSQLException("Inserting char failed.");
            }
            ps.close();
            rs.close();

            ps = con.prepareStatement("INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`, `customData`) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", MYSQL.RETURN_GENERATED_KEYS);
            pse = con.prepareStatement("INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)");
            ps.setInt(1, chr.id);
            for (final MapleQuestStatus q : chr.quests.values()) {
                ps.setInt(2, q.getQuest().getId());
                ps.setInt(3, q.getStatus());
                ps.setInt(4, (int) (q.getCompletionTime() / 1000));
                ps.setInt(5, q.getForfeited());
                ps.setString(6, q.getCustomData());
                ps.executeUpdate();
                rs = ps.getGeneratedKeys();
                rs.next();

                if (q.hasMobKills()) {
                    for (int mob : q.getMobKills().keySet()) {
                        pse.setInt(1, rs.getInt(1));
                        pse.setInt(2, mob);
                        pse.setInt(3, q.getMobKills(mob));
                        pse.executeUpdate();
                    }
                }
                rs.close();
            }
            ps.close();
            pse.close();

            ps = con.prepareStatement("INSERT INTO inventoryslot (characterid, `equip`, `use`, `setup`, `etc`, `cash`) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            ps.setInt(2, 96); // Eq
            ps.setInt(3, 96); // Use
            ps.setInt(4, 96); // Setup
            ps.setInt(5, 96); // ETC
            ps.setInt(6, 60); // Cash
            ps.execute();
            ps.close();

            ps = con.prepareStatement("INSERT INTO mountdata (characterid, `Level`, `Exp`, `Fatigue`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            ps.setInt(2, 1);
            ps.setInt(3, 0);
            ps.setInt(4, 0);
            ps.execute();
            ps.close();

            ps = con.prepareStatement("INSERT INTO inventoryitems (characterid, type, itemid, inventorytype, position, quantity, owner, GM_Log, uniqueid, expiredate, flag) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", MYSQL.RETURN_GENERATED_KEYS);
            pse = con.prepareStatement("INSERT INTO inventoryequipment VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            IEquip equip;

            for (final MapleInventory iv : chr.inventory) {
                ps.setInt(4, iv.getType().getType());
                for (final IItem item : iv.list()) {
                    ps.setInt(1, chr.id);
                    ps.setInt(2, 1); //반드시 인벤토리로 저장.
                    ps.setInt(3, item.getItemId());
                    ps.setInt(5, item.getPosition());
                    ps.setInt(6, item.getQuantity());
                    ps.setString(7, item.getOwner());
                    ps.setString(8, item.getGMLog());
                    ps.setInt(9, item.getUniqueId()); // Pet cant be loaded on logins + new char doesn't have.
                    ps.setLong(10, item.getExpiration());
                    ps.setShort(11, item.getFlag());
                    ps.executeUpdate();

                    rs = ps.getGeneratedKeys();
                    int itemid;
                    if (rs.next()) {
                        itemid = rs.getInt(1);
                    } else {
                        throw new MYSQLException("Inserting char failed.");
                    }
                    rs.close();

                    if (iv.getType().equals(MapleInventoryType.EQUIP) || iv.getType().equals(MapleInventoryType.EQUIPPED)) {
                        pse.setInt(1, itemid);
                        equip = (IEquip) item;
                        pse.setInt(2, equip.getUpgradeSlots());
                        pse.setInt(3, equip.getLevel());
                        pse.setInt(4, equip.getStr());
                        pse.setInt(5, equip.getDex());
                        pse.setInt(6, equip.getInt());
                        pse.setInt(7, equip.getLuk());
                        pse.setInt(8, equip.getHp());
                        pse.setInt(9, equip.getMp());
                        pse.setInt(10, equip.getWatk());
                        pse.setInt(11, equip.getMatk());
                        pse.setInt(12, equip.getWdef());
                        pse.setInt(13, equip.getMdef());
                        pse.setInt(14, equip.getAcc());
                        pse.setInt(15, equip.getAvoid());
                        pse.setInt(16, equip.getHands());
                        pse.setInt(17, equip.getSpeed());
                        pse.setInt(18, equip.getJump());
                        pse.setInt(19, equip.getViciousHammer());
                        pse.setInt(20, 0);
                        pse.setInt(21, 0);
                        pse.setInt(22, -1);
                        pse.setInt(23, equip.getState());
                        pse.setInt(24, equip.getLines());
                        pse.setInt(25, equip.getEnhance());
                        pse.setInt(26, equip.getPotential1());
                        pse.setInt(27, equip.getPotential2());
                        pse.setInt(28, equip.getPotential3());
                        pse.setInt(29, equip.getPotential4());
                        pse.setInt(30, equip.getPotential5());
                        pse.setInt(31, equip.getPotential6());
                        pse.setInt(32, equip.getPotential7());
                        pse.setInt(33, equip.getanvil());
                        pse.setInt(34, equip.getHpR());
                        pse.setInt(35, equip.getMpR());
                        pse.setInt(36, equip.getFire());
                        pse.setInt(37, equip.getBossDamage());
                        pse.setInt(38, equip.getAllDamageP());
                        pse.setInt(39, equip.getAllStatP());
                        pse.setInt(40, equip.getDownLevel());
                        pse.setInt(41, equip.getIgnoreWdef());
                        pse.setInt(42, equip.getSoulName());
                        pse.setInt(43, equip.getSoulEnchanter());
                        pse.setInt(44, equip.getSoulPotential());
                        pse.setInt(45, equip.getSoulSkill());
                        pse.setInt(46, 0);
                        pse.setInt(47, equip.getItemTrace());
                        pse.setString(48, equip.getFireStatToString());
                        pse.executeUpdate();
                    }
                }
            }
            ps.close();
            pse.close();

            ps = con.prepareStatement("INSERT INTO mountdata (characterid, `Level`, `Exp`, `Fatigue`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            ps.setInt(2, 1);
            ps.setInt(3, 0);
            ps.setInt(4, 0);
            ps.execute();
            ps.close();

            final int[] array1 = {2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 29, 31, 33, 34, 35, 37, 38, 39, 40, 41, 43, 44, 45, 46, 47, 48, 50, 51, 56, 57, 59, 60, 61, 62, 63, 64, 65, 83};
            final int[] array2 = {4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 5, 4, 4, 4, 4, 4, 5, 5, 6, 6, 6, 6, 6, 6, 6, 0};
            final int[] array3 = {10, 12, 13, 18, 23, 28, 8, 5, 0, 4, 27, 30, 32, 1, 24, 19, 14, 15, 52, 2, 25, 17, 11, 3, 20, 26, 16, 22, 9, 50, 51, 6, 31, 29, 7, 33, 53, 54, 100, 101, 102, 103, 104, 105, 106, 52};

            ps = con.prepareStatement("INSERT INTO keymap (characterid, `key`, `type`, `action`) VALUES (?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            for (int i = 0; i < array1.length; i++) {
                ps.setInt(2, array1[i]);
                ps.setInt(3, array2[i]);
                ps.setInt(4, array3[i]);
                ps.execute();
            }
            ps.close();

            chr.deleteWhereCharacterId(con, "DELETE FROM skills WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO skills (characterid, skillid, skilllevel, masterlevel, expiration) VALUES (?, ?, ?, ?, ?)");
            ps.setInt(1, chr.id);
            for (final Entry<ISkill, SkillEntry> skill : chr.skills.entrySet()) {
                ps.setInt(2, skill.getKey().getId());
                ps.setInt(3, skill.getValue().skillevel);
                ps.setInt(4, skill.getValue().masterlevel);
                ps.setLong(5, skill.getValue().expiration);
                ps.executeUpdate();
            }
            ps.close();

            chr.saveKeyValues();

            con.commit();
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
            System.err.println("[charsave] Error saving character data");
            try {
                con.rollback();
            } catch (SQLException ex) {
                if (!ServerConstants.realese) {
                    ex.printStackTrace();
                }
                System.err.println("[charsave] Error Rolling Back");
            }
        } finally {
            try {
                if (pse != null) {
                    pse.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
                con.setAutoCommit(true);
                con.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
                if (con != null) {
                    con.close();
                }
            } catch (SQLException e) {
                if (!ServerConstants.realese) {
                    e.printStackTrace();
                }
                System.err.println("[charsave] Error going back to autocommit mode");
            }
        }
    }

    public void CharacterSaveToDB(boolean fromcs) {
        Connection con = null;
        try {
            con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET level = ?, fame = ?, str = ?, dex = ?, luk = ?, `int` = ?, exp = ?, hp = ?, mp = ?, maxhp = ?, maxmp = ?, sp = ?, ap = ?, gm = ?, skincolor = ?, skincolor2 = ?, gender = ?, gender2 = ?, job = ?, hair = ?, hair2 = ?, face = ?, face2 = ?, wp = ?, askguildid = ?, map = ?, meso = ?, hpApUsed = ?, mpApUsed = ?, spawnpoint = ?, party = ?, buddyCapacity = ?, messengerid = ?, messengerposition = ?, reborns = ?, subcategory = ?, rankpoint = ?, gp = ?, Soul = ?, ambition = ?, insight = ?, willpower = ?, diligence = ?, empathy = ?, charm = ?, innerExp = ?, innerLevel = ?, artifactPoints = ?, morphGage = ?, firstProfession = ?, secondProfession = ?, firstProfessionLevel = ?, secondProfessionLevel = ?, firstProfessionExp = ?, secondProfessionExp = ?, fatigue = ?, last_command_time = ?, pet_id = ?, pet_loot = ?, pet_hp = ?, pet_mp = ?, chatban = ?, betaclothes = ?, loginpoint = ?, nMixBaseHairColor = ?, nMixAddHairColor = ?, nMixHairBaseProb = ?, itcafetime = ?, damageskinslot = ?, saveDamageSkin = ?, karta = ?, damage = ?, damagehit = ?, freejob = ? WHERE id = ?", MYSQL.RETURN_GENERATED_KEYS);
            ps.setInt(1, level);
            ps.setInt(2, fame);
            ps.setInt(3, stats.getStr());
            ps.setInt(4, stats.getDex());
            ps.setInt(5, stats.getLuk());
            ps.setInt(6, stats.getInt());
            ps.setLong(7, exp);
            ps.setLong(8, stats.getHp() < 1 ? 50 : stats.getHp());
            ps.setInt(9, stats.getMp());
            ps.setInt(10, stats.getMaxHp());
            ps.setInt(11, stats.getMaxMp());

            final StringBuilder sps = new StringBuilder();
            for (int i = 0; i < remainingSp.length; i++) {
                sps.append(remainingSp[i]);
                sps.append(",");
            }

            String sp = sps.toString();
            ps.setString(12, sp.substring(0, sp.length() - 1));
            ps.setInt(13, remainingAp);
            ps.setByte(14, gmLevel);
            ps.setByte(15, skinColor);
            ps.setByte(16, secondSkinColor);
            if (GameConstants.isZero(getJob())) {
                ps.setByte(17, (byte) 0);
                ps.setByte(18, (byte) 1);
            } else {
                ps.setByte(17, gender);
                ps.setByte(18, secondGender);
            }
            ps.setShort(19, job);
            ps.setInt(20, hair);
            ps.setInt(21, hair2);
            ps.setInt(22, face);
            ps.setInt(23, face2);
            ps.setInt(24, wp);
            ps.setInt(25, askguildid);
            if (map != null) {
                if (map.getForcedReturnId() != 999999999) {
                    ps.setInt(26, map.getForcedReturnId());
                } else {
                    ps.setInt(26, stats.getHp() < 1 ? map.getReturnMapId() : map.getId());
                }
            } else {
                ps.setInt(26, mapid);
            }
            ps.setLong(27, meso);
            ps.setInt(28, hpApUsed);
            ps.setInt(29, mpApUsed);
            if (map == null) {
                ps.setInt(30, 0);
            } else {
                final MaplePortal closest = map.findClosestSpawnpoint(getPosition());
                ps.setInt(30, closest != null ? closest.getId() : 0);
            }
            ps.setInt(31, party != null ? party.getId() : -1);
            ps.setInt(32, buddylist.getCapacity());
            if (messenger != null) {
                ps.setInt(33, messenger.getId());
                ps.setInt(34, messengerposition);
            } else {
                ps.setInt(33, 0);
                ps.setInt(34, 4);
            }
            ps.setInt(35, getReborns());
            ps.setInt(36, subcategory);
            ps.setInt(37, rankpoint);
            ps.setInt(38, gp);
            ps.setInt(39, Soul);
            ps.setInt(40, getStat().getAmbition());
            ps.setInt(41, getStat().getInsight());
            ps.setInt(42, getStat().getWillPower());
            ps.setInt(43, getStat().getDiligence());
            ps.setInt(44, getStat().getEmpathy());
            ps.setInt(45, getStat().getCharm());
            ps.setInt(46, getInnerExp());
            ps.setInt(47, getInnerLevel());
            ps.setInt(48, getArtifactPoints());
            ps.setInt(49, getCTS_MorphGage());
            ps.setInt(50, profession.getFirstProfessionSkill());
            ps.setInt(51, profession.getSecondProfessionSkill());
            ps.setInt(52, profession.getFirstProfessionLevel());
            ps.setInt(53, profession.getSecondProfessionLevel());
            ps.setInt(54, profession.getFirstProfessionExp());
            ps.setInt(55, profession.getSecondProfessionExp());
            ps.setInt(56, profession.getFatigue());
            ps.setLong(57, lastViewTime);
            sps.delete(0, sps.toString().length());
            for (int i = 0; i < 3; i++) {
                if (pets[i] != null) {
                    sps.append(pets[i].getUniqueId());
                } else {
                    sps.append("-1");
                }
                sps.append(",");
            }
            sp = sps.toString();

            ps.setString(58, sp.substring(0, sp.length() - 1));
            ps.setBoolean(59, petLoot);
            ps.setInt(60, petAutoHP);
            ps.setInt(61, petAutoMP);
            ps.setString(62, chatban);
            ps.setInt(63, GameConstants.isZero(getJob()) ? betaclothes : 0);
            ps.setInt(64, loginpoint);
            ps.setInt(65, nMixBaseHairColor);
            ps.setInt(66, nMixAddHairColor);
            ps.setInt(67, nMixHairBaseProb);
            ps.setInt(68, itcafetime);
            ps.setInt(69, damageskinslot);
            final StringBuilder skin = new StringBuilder();
            for (int i = 0; i < saveDamageSkin.length; i++) {
                skin.append(saveDamageSkin[i]);
                skin.append(",");
            }
            String skins = skin.toString();
            ps.setString(70, skins.substring(0, skins.length() - 1));
            ps.setInt(71, karta);
            ps.setLong(72, damage);
            ps.setInt(73, damagehit);
            ps.setInt(74, freejob);
            ps.setInt(75, id);
            if (ps.executeUpdate() < 1) {
                throw new MYSQLException("Character not in database (" + id + ")");
            }
            ps.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        } finally {
            try {
                if (con != null) {
                    con.close();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
    }

    public void PetSaveToDB() {
        for (int i = 0; i < pets.length; ++i) {
            if (pets[i] != null) {
                pets[i].saveToDb();
            }
        }
    }

    public void MacroSaveToDB() {
        Connection con = null;
        PreparedStatement ps = null;
        if (skillmacros_changed) {
            try {
                con = MYSQL.getConnection();
                deleteWhereCharacterId(con, "DELETE FROM skillmacros WHERE characterid = ?");
                for (int i = 0; i < 5; i++) {
                    final SkillMacro macro = skillMacros[i];
                    if (macro != null) {
                        ps = con.prepareStatement("INSERT INTO skillmacros (characterid, skill1, skill2, skill3, name, shout, position) VALUES (?, ?, ?, ?, ?, ?, ?)");
                        ps.setInt(1, id);
                        ps.setInt(2, macro.getSkill1());
                        ps.setInt(3, macro.getSkill2());
                        ps.setInt(4, macro.getSkill3());
                        ps.setString(5, macro.getName());
                        ps.setInt(6, macro.getShout());
                        ps.setInt(7, i);
                        ps.execute();
                    }
                }
                ps.close();
                con.close();
            } catch (SQLException e) {
                if (!ServerConstants.realese) {
                    e.printStackTrace();
                }
            }
        }
    }

    public void SlotSaveToDB() {
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = MYSQL.getConnection();
            if (inventoryslot_changed) {
                deleteWhereCharacterId(con, "DELETE FROM inventoryslot WHERE characterid = ?");
                ps = con.prepareStatement("INSERT INTO inventoryslot (characterid, `equip`, `use`, `setup`, `etc`, `cash`) VALUES (?, ?, ?, ?, ?, ?)");
                ps.setInt(1, id);
                ps.setInt(2, getInventory(MapleInventoryType.EQUIP).getSlotLimit());
                ps.setInt(3, getInventory(MapleInventoryType.USE).getSlotLimit());
                ps.setInt(4, getInventory(MapleInventoryType.SETUP).getSlotLimit());
                ps.setInt(5, getInventory(MapleInventoryType.ETC).getSlotLimit());
                ps.setInt(6, getInventory(MapleInventoryType.CASH).getSlotLimit());
                ps.execute();
                ps.close();
            }
            deleteWhereCharacterId(con, "DELETE FROM extendedslots WHERE `characterid` = ?");
            for (int i = 0; i < extendedSlots.size(); i++) {
                if (getInventory(MapleInventoryType.ETC).findByUniqueId(extendedSlots.get(i)) != null) { //just in case
                    ps = con.prepareStatement("INSERT INTO `extendedslots` (`index`, `characterid`, `uniqueid`) VALUES (?, ?, ?) ");
                    ps.setInt(1, i);
                    ps.setInt(2, getId());
                    ps.setInt(3, extendedSlots.get(i));
                    ps.executeUpdate();
                    ps.close();
                }
            }
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void QuestInfoSaveToDB() {
        Connection con = null;
        PreparedStatement ps = null;
        PreparedStatement pse = null;
        ResultSet rs = null;
        try {
            con = MYSQL.getConnection();
            deleteWhereCharacterId(con, "DELETE FROM questinfo WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO questinfo (`characterid`, `quest`, `data`) VALUES (?, ?, ?)");
            ps.setInt(1, id);
            for (final Entry<Integer, String> q : questinfo.entrySet()) {
                ps.setInt(2, q.getKey());
                ps.setString(3, q.getValue());
                ps.execute();
            }
            ps.close();

            deleteWhereCharacterId(con, "DELETE FROM queststatus WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO queststatus (`queststatusid`, `characterid`, `quest`, `status`, `time`, `forfeited`, `customData`) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?)", MYSQL.RETURN_GENERATED_KEYS);
            pse = con.prepareStatement("INSERT INTO queststatusmobs VALUES (DEFAULT, ?, ?, ?)");
            ps.setInt(1, id);
            for (final MapleQuestStatus q : quests.values()) {
                ps.setInt(2, q.getQuest().getId());
                ps.setInt(3, q.getStatus());
                ps.setInt(4, (int) (q.getCompletionTime() / 1000));
                ps.setInt(5, q.getForfeited());
                ps.setString(6, q.getCustomData());
                ps.executeUpdate();
                rs = ps.getGeneratedKeys();
                rs.next();

                if (q.hasMobKills()) {
                    for (int mob : q.getMobKills().keySet()) {
                        pse.setInt(1, rs.getInt(1));
                        pse.setInt(2, mob);
                        pse.setInt(3, q.getMobKills(mob));
                        pse.executeUpdate();
                    }
                }
                rs.close();
            }
            ps.close();
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void SkillSaveToDB(boolean dc) {
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = MYSQL.getConnection();
            deleteWhereCharacterId(con, "DELETE FROM skills WHERE characterid = ?");
            ps = con.prepareStatement("INSERT INTO skills (characterid, skillid, skilllevel, masterlevel) VALUES (?, ?, ?, ?)");
            ps.setInt(1, id);
            for (final Entry<ISkill, SkillEntry> skill : skills.entrySet()) {
                ps.setInt(2, skill.getKey().getId());
                ps.setInt(3, skill.getValue().skillevel);
                ps.setInt(4, skill.getValue().masterlevel);
                ps.execute();
            }
            ps.close();
            if (innerSkills != null) {
                deleteWhereCharacterId(con, "DELETE FROM inner_ability_skills WHERE player_id = ?");
                ps = con.prepareStatement("INSERT INTO inner_ability_skills (player_id, skill_id, skill_level, max_level, rank) VALUES (?, ?, ?, ?, ?)");
                ps.setInt(1, id);
                for (InnerSkillValueHolder inner : innerSkills) {
                    ps.setInt(2, inner.getSkillId());
                    ps.setInt(3, inner.getSkillLevel());
                    ps.setInt(4, inner.getMaxLevel());
                    ps.setInt(5, inner.getRank());
                    ps.executeUpdate();
                }
                ps.close();
            }
            if (getAllCooldowns().size() > 0) {
                for (final MapleCoolDownValueHolder cooling : getAllCooldowns()) {
                    ps = con.prepareStatement("INSERT INTO skills_cooldowns (charid, SkillID, length, StartTime) VALUES (?, ?, ?, ?)");
                    ps.setInt(1, getId());
                    ps.setInt(2, cooling.skillId);
                    ps.setLong(3, cooling.length);
                    ps.setLong(4, cooling.startTime);
                    ps.executeUpdate();
                    ps.close();
                }
            }
            ps.close();
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void BuddiesSaveToDB() {
        Connection con = null;
        try {
            con = MYSQL.getConnection();
            deleteWhereCharacterId(con, "DELETE FROM buddies WHERE characterid = ? AND pending = 0");
            PreparedStatement ps = con.prepareStatement("INSERT INTO buddies (characterid, `buddyid`, `pending`, `groupname`) VALUES (?, ?, 0, ?)");
            ps.setInt(1, id);
            for (BuddylistEntry entry : buddylist.getBuddies()) {
                if (entry.isVisible()) {
                    ps.setInt(2, entry.getCharacterId());
                    ps.setString(3, entry.getGroup());
                    ps.execute();
                }
            }
            ps.close();
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void CashSaveToDB() {
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("UPDATE accounts SET `nxCash` = ?, `mPoints` = ?, `vpoints` = ?, `realcash` = ? WHERE id = ?");
            ps.setInt(1, nxcash);
            ps.setInt(2, maplepoints);
            ps.setInt(3, getVPoints());
            ps.setInt(4, getRC());
            ps.setInt(5, client.getAccID());
            ps.execute();
            ps.close();
            if (cashInv != null) {
                ps = con.prepareStatement("DELETE FROM inventoryitems WHERE accountid = ? AND type = ?");
                ps.setInt(1, accountid);
                ps.setInt(2, ItemFactory.getType(ItemFactory.InventoryType.CASHSHOP));
                ps.executeUpdate();
                ps.close();
                cashInv.saveToDB();
            } else {
                System.err.println("캐시샵 인벤토리가 널 포인터가 발생하여 저장을 실패했습니다.");
            }
            ps.close();
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void WishSaveToDB() {
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = MYSQL.getConnection();
            deleteWhereCharacterId(con, "DELETE FROM wishlist WHERE characterid = ?");
            for (int i = 0; i < getWishlistSize(); i++) {
                ps = con.prepareStatement("INSERT INTO wishlist(characterid, sn) VALUES(?, ?) ");
                ps.setInt(1, getId());
                ps.setInt(2, wishlist[i]);
                ps.execute();
                ps.close();
            }
            deleteWhereCharacterId(con, "DELETE FROM trocklocations WHERE characterid = ?");
            for (Entry<Integer, List<Integer>> e : rocks.entrySet()) {
                for (Integer i : e.getValue()) {
                    if (i != 999999999) {
                        ps = con.prepareStatement("INSERT INTO trocklocations(characterid, mapid, type) VALUES(?, ?, ?) ");
                        ps.setInt(1, getId());
                        ps.setInt(2, i);
                        ps.setInt(3, e.getKey());
                        ps.execute();
                        ps.close();
                    }
                }
            }
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void saveToDB(boolean dc, boolean fromcs) {
        Connection con = null;
        ReentrantLock LockObj = new ReentrantLock();
        LockObj.lock();
        try {
            con = MYSQL.getConnection();
            con.setTransactionIsolation(Connection.TRANSACTION_READ_UNCOMMITTED);
            con.setAutoCommit(false);

            /* 키 레이아웃, 라이딩 저장 */
            try {
                deleteWhereCharacterId(con, "DELETE FROM inventoryitems WHERE characterid = ? AND issale = 0");
                keylayout.saveKeys(id);
                mount.saveMount(id);
            } catch (SQLException e) {
                if (!ServerConstants.realese) {
                    e.printStackTrace();
                }
            }

            /* 캐릭터 저장 */
            CharacterSaveToDB(fromcs);

            /* 펫 저장 */
            PetSaveToDB();

            /* 매크로 슬롯 저장 */
            MacroSaveToDB();

            /* 슬롯 저장 */
            SlotSaveToDB();

            /* 퀘스트 정보 저장 */
            QuestInfoSaveToDB();

            /* 스킬 데이터 저장 */
            SkillSaveToDB(dc);

            /* 친구 데이터 저장 */
            BuddiesSaveToDB();

            /* 캐쉬 인벤토리 저장 */
            CashSaveToDB();

            /* 소원 목록 저장 */
            WishSaveToDB();

            /* 아이템 저장 */
            ItemFactory.saveItemsFromPlayer(this);

            /* 창고 저장 */
            if (storage != null) {
                storage.saveToDB();
            } else {
                System.err.println("창고 인벤토리가 널 포인터가 발생하여 저장을 실패했습니다.");
            }

            /* 스틸 스킬 저장 */
            if (steelskills != null) {
                saveSteelSkills();
            } else {
                System.err.println("스틸 스킬 정보가 널 포인터가 발생하여 저장을 실패했습니다.");
            }

            /* 퀵 슬롯 저장 */
            quickslot.saveToDB();

            /* 키벨류 저장 */
            if (keyvalue_changed) {
                setKeyValue("HeadTitle", headtitle + "");
                saveKeyValues();
            }
            con.commit();
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
            System.err.println(MapleClient.getLogMessage(this, "[charsave] Error saving character data."));
            try {
                con.rollback();
            } catch (SQLException ex) {
                System.err.println(MapleClient.getLogMessage(this, "[charsave] Error Rolling Back"));
                ex.printStackTrace();
            }
        } finally {
            try {
                con.setTransactionIsolation(Connection.TRANSACTION_REPEATABLE_READ);
                con.setAutoCommit(true);
                con.close();
            } catch (SQLException e) {
                if (ServerConstants.realese) {
                    e.printStackTrace();
                }
            }
            LockObj.unlock();
        }
    }

    private void deleteWhereCharacterId(Connection con, String sql) throws SQLException {
        PreparedStatement ps = con.prepareStatement(sql);
        ps.setInt(1, id);
        ps.executeUpdate();
        ps.close();
    }

    public final PlayerStats getStat() {
        return stats;
    }

    public int getMaxHp() {
        return getStat().getMaxHp();
    }

    public int getMaxMp() {
        return getStat().getMaxMp();
    }

    public void setHp(int amount) {
        getStat().setHp(amount, this);
    }

    public void setMp(int amount) {
        getStat().setMp(amount);
    }

    public void healHP(int delta) {
        addHP(delta);
        //client.getSession().writeAndFlush(EffectPacket.showOwnHpHealed(delta));
        //getMap().broadcastMessage(this, EffectPacket.showHpHealed(getId(), delta), false);
    }

    public void healMP(int delta) {
        addMP(delta);
        //client.getSession().writeAndFlush(EffectPacket.showOwnHpHealed(delta));
        //getMap().broadcastMessage(this, EffectPacket.showHpHealed(getId(), delta), false); //WHY SHOW HP HEALED?!
    }

    public final PlayerRandomStream CRand() {
        return CRand;
    }

    public final void QuestInfoPacket(final WritingPacket packet) {
        packet.writeShort(questinfo.size());
        for (final Entry<Integer, String> q : questinfo.entrySet()) {
            packet.writeInt(q.getKey()); //1.2.251+
            packet.writeMapleAsciiString(q.getValue() == null ? "" : q.getValue());
        }
    }

    public final void updateInfoQuest(final int questid, final String data) {
        questinfo.put(questid, data);
        client.getSession().writeAndFlush(MainPacketCreator.updateInfoQuest(questid, data));
    }

    public final String getInfoQuest(final int questid) {
        if (questinfo.containsKey(questid)) {
            return questinfo.get(questid);
        }
        return "";
    }

    public final int getNumQuest() {
        int i = 0;
        for (final MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == 2 && !q.isCustomQuest()) {
                i++;
            }
        }
        return i;
    }

    public final byte getQuestStatus(final int quest) {
        for (final MapleQuestStatus q : quests.values()) {
            if (q.getQuest().getId() == quest) {
                return q.getStatus();
            }
        }
        return 0;
    }

    public final MapleQuestStatus getQuest(final MapleQuest quest) {
        if (!quests.containsKey(quest)) {
            return new MapleQuestStatus(quest, (byte) 0);
        }
        return quests.get(quest);
    }

    public final MapleQuestStatus getQuestNAdd(final MapleQuest quest) {
        if (!quests.containsKey(quest)) {
            MapleQuestStatus status = new MapleQuestStatus(quest, (byte) 0);
            quests.put(quest, status);
            return status;
        }
        return quests.get(quest);
    }

    public final void updateQuest(final MapleQuestStatus quest) {
        quests.put(quest.getQuest(), quest);
        if (!quest.isCustomQuest()) {
            if (quest.getStatus() == 1) {
                client.getSession().writeAndFlush(MainPacketCreator.startQuest(this, (short) quest.getQuest().getId(), quest.getCustomData()));
            } else if (quest.getStatus() == 2) {
                client.getSession().writeAndFlush(MainPacketCreator.completeQuest((short) quest.getQuest().getId()));
            } else if (quest.getStatus() == 0) {
                client.getSession().writeAndFlush(MainPacketCreator.forfeitQuest(this, (short) quest.getQuest().getId()));
            }
        }
    }

    public final Map<Integer, String> getInfoQuest_Map() {
        return questinfo;
    }

    public final Map<MapleQuest, MapleQuestStatus> getQuest_Map() {
        return quests;
    }

    public boolean isActiveBuffedValue(int skillid) {
        LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
        for (List<BuffStatsValueHolder> holders : effects.values()) {
            for (BuffStatsValueHolder bsvh : holders) {
                allBuffs.add(bsvh);
            }
        }
        for (BuffStatsValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skillid) {
                return true;
            }
        }
        return false;
    }

    public final Integer getBuffedSkill_X(final BuffStats effect) {
        return getBuffedSkill_X(effect, -1);
    }

    public final Integer getBuffedSkill_X(final BuffStats effect, int skillid) {
        final List<BuffStatsValueHolder> mbsvh = effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        if (skillid == -1) {
            if (effects.get(effect) != null) {
                return effects.get(effect).get(0).effect.getX();
            }
        } else {
            for (BuffStatsValueHolder bsvh : mbsvh) {
                if (bsvh.effect.getSourceId() == skillid) {
                    return bsvh.effect.getX();
                }
            }
        }
        return null;
    }

    public final Integer getBuffedSkill_Y(final BuffStats effect) {
        return getBuffedSkill_Y(effect, -1);
    }

    public final Integer getBuffedSkill_Y(final BuffStats effect, int skillid) {
        final List<BuffStatsValueHolder> mbsvh = effects.get(effect);
        if (mbsvh == null) {
            return null;
        }
        if (skillid == -1) {
            if (effects.get(effect) != null) {
                return effects.get(effect).get(0).effect.getY();
            }
        } else {
            for (BuffStatsValueHolder bsvh : mbsvh) {
                if (bsvh.effect.getSourceId() == skillid) {
                    return bsvh.effect.getY();
                }
            }
        }
        return null;
    }

    public Integer getBuffedValue(BuffStats effect) {
        return getBuffedValue(effect, -1);
    }

    public Integer getBuffedValue(BuffStats effect, int skillid) {
        if (!effects.containsKey(effect)) {
            return null;
        }
        final List<BuffStatsValueHolder> mbsvh = effects.get(effect);
        for (BuffStatsValueHolder bsvh : mbsvh) {
            if (bsvh.effect.getSourceId() == skillid || skillid == -1) {
                return Integer.valueOf(bsvh.value);
            }
        }
        return null;
    }

    public int getTrueBuffSource(final BuffStats effect) {
        if (!effects.containsKey(effect)) {
            return -1;
        }
        final List<BuffStatsValueHolder> mbsvh = effects.get(effect);
        for (BuffStatsValueHolder bsvh : mbsvh) {
            return bsvh.effect == null ? -1 : (bsvh.effect.isSkill() ? bsvh.effect.getSourceId() : -bsvh.effect.getSourceId());
        }
        return -1;
    }

    public final SkillStatEffect getStatForBuff(final BuffStats effect) {
        return getBuffedSkillEffect(effect);
    }

    public final SkillStatEffect getBuffedSkillEffect(final BuffStats effect) {
        return getBuffedSkillEffect(effect, -1);
    }

    public final SkillStatEffect getBuffedSkillEffect(final BuffStats effect, int skillid) {
        if (!effects.containsKey(effect)) {
            return null;
        }
        final List<BuffStatsValueHolder> mbsvh = effects.get(effect);
        for (BuffStatsValueHolder bsvh : mbsvh) {
            if (bsvh.effect.getSourceId() == skillid || skillid == -1) {
                return bsvh.effect;
            }
        }
        return null;
    }

    public int getItemQuantity(int itemid, boolean checkEquipped) {
        int possesed = inventory[GameConstants.getInventoryType(itemid).ordinal()].countById(itemid);
        if (checkEquipped) {
            possesed += inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }
        return possesed;
    }

    public int getReborns() {
        return reborns;
    }

    public int getVPoints() {
        return vpoints;
    }

    public int getMaxStats() {
        return (getJob() > 999 && getJob() < 2000 ? 15000 : 32000);
    }

    public int getNX() {
        return nxcash;
    }

    public void gainVPoints(int gainedpoints) {
        this.vpoints += gainedpoints;
    }

    public final void gainItem(final int id, final int quantity) {
        gainItem(id, (short) quantity, false, -1, null);
    }

    public final void gainItem(final int id, final short quantity, final boolean randomStats, final long period, String gm_log) {
        if (quantity >= 0) {
            final ItemInformation ii = ItemInformation.getInstance();
            final MapleInventoryType type = GameConstants.getInventoryType(id);

            if (!InventoryManipulator.checkSpace(client, id, quantity, "")) {
                return;
            }
            if (type.equals(MapleInventoryType.EQUIP) && !GameConstants.isThrowingStar(id) && !GameConstants.isBullet(id)) {
                IItem item = randomStats ? ii.randomizeStats((Equip) ii.getEquipById(id), true) : ii.getEquipById(id);
                if (period > 0) {
                    item.setExpiration(System.currentTimeMillis() + period);
                }
                item.setGMLog(CurrentTime.getAllCurrentTime() + "에 " + gm_log);
                InventoryManipulator.addbyItem(client, item);
            } else {
                InventoryManipulator.addById(client, id, quantity, "", null, period, CurrentTime.getAllCurrentTime() + "에 " + getName() + "에서 호출된 gainItem 스크립트로 얻은 아이템.");
            }
        } else {
            InventoryManipulator.removeById(client, GameConstants.getInventoryType(id), id, -quantity, true, false);
        }
        client.getSession().writeAndFlush(MainPacketCreator.getShowItemGain(id, quantity, true));
    }

    public void setBuffedValue(BuffStats effect, int skillid, int value) {
        if (!effects.containsKey(effect)) {
            return;
        }
        if (skillid == -1) {
            if (effects.get(effect) != null) {
                try {
                    effects.get(effect).get(0).value = value;
                } catch (ArrayIndexOutOfBoundsException e) {
                    e.printStackTrace();
                } catch (IndexOutOfBoundsException ef) {
                    ef.printStackTrace();
                }
            }
        } else {
            for (BuffStatsValueHolder bsvhs : effects.get(effect)) {
                if (bsvhs.effect.getSourceId() == skillid) {
                    bsvhs.value = value;
                }
            }
        }
    }

    public Long getBuffedStarttime(BuffStats effect, int skillid) {
        if (!effects.containsKey(effect)) {
            return null;
        }
        final List<BuffStatsValueHolder> mbsvh = effects.get(effect);
        if (mbsvh.size() == 1 && skillid == -1) {
            return Long.valueOf(mbsvh.get(0).startTime);
        }
        for (BuffStatsValueHolder bsvh : mbsvh) {
            if (bsvh.effect.getSourceId() == skillid) {
                return bsvh.startTime;
            }
        }
        return null;
    }

    public void startMapTimeLimitTask(int time, final MapleMap to) {
        client.getSession().writeAndFlush(MainPacketCreator.getClock(time));

        time *= 1000;
        mapTimeLimitTask = EtcTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                changeMap(to, to.getPortal(0));
            }
        }, time, time);
    }

    public void cancelMapTimeLimitTask() {
        if (mapTimeLimitTask != null) {
            mapTimeLimitTask.cancel(false);
        }
    }

    public void registerEffect(SkillStatEffect effect, long starttime, ScheduledFuture<?> schedule) {
        if (effect.isHide()) {
            this.hidden = true;
            map.broadcastMessage(this, MainPacketCreator.removePlayerFromMap(getId()), false);
        }
        for (Triple<BuffStats, Integer, Boolean> statup : effect.getStatups()) {
            if (!effects.containsKey(statup.getFirst())) {
                effects.put(statup.getFirst(), new ArrayList<BuffStatsValueHolder>());
            }
            effects.get(statup.getFirst()).add(new BuffStatsValueHolder(effect, starttime, schedule, statup.getSecond()));
        }
        stats.recalcLocalStats(this);
    }

    public void checkInduerense() {
        if (getJob() == 510 || getJob() == 511 || getJob() == 512) {
            if (getSkillLevel(5100013) > 0) {
                if (InduerenseTask == null) {
                    final SkillStatEffect eff = SkillFactory.getSkill(5100013).getEffect(getSkillLevel(5100013));
                    Runnable r = new Runnable() {

                        @Override
                        public void run() {
                            int recoverhp = (int) ((eff.getX() / 100.0D) * getStat().getCurrentMaxHp());
                            int recovermp = (int) ((eff.getX() / 100.0D) * getStat().getCurrentMaxMp());
                            if (isAlive()) {
                                addHP(recoverhp);
                                if (getStat().getHp() + recoverhp < getStat().getCurrentMaxHp()) {
                                    send(MainPacketCreator.showOwnRecoverHP(Math.min(getStat().getCurrentMaxHp() - getStat().getHp(), recoverhp)));
                                }
                                addMP(recovermp);
                            }
                        }
                    };
                    BuffTimer tMan = BuffTimer.getInstance();
                    InduerenseTask = tMan.register(r, eff.getY() * 1000);
                }
            }
        }
    }

    public void setNullSelfRecovery() {
        selfRecoveryTask = null;
    }

    public void checkSelfRecovery() {
        if (getSkillLevel(GameConstants.getRecoverySkill(getJob() / 10)) > 0) {
            if (selfRecoveryTask == null) {
                final SkillStatEffect eff = SkillFactory.getSkill(GameConstants.getRecoverySkill(getJob() / 10)).getEffect(getSkillLevel(GameConstants.getRecoverySkill(getJob() / 10)));
                Runnable r = new Runnable() {

                    @Override
                    public void run() {
                        int recoverhp = eff.getSkillStats().getStats("hp");
                        int recovermp = eff.getSkillStats().getStats("mp");
                        if (GameConstants.getRecoverySkill(getJob() / 10) == 61110006) {
                            recoverhp = getStat().getCurrentMaxHp() * (eff.getSkillStats().getStats("x") / 100);
                            recovermp = getStat().getCurrentMaxMp() * (eff.getSkillStats().getStats("x") / 100);
                        }
                        if (isAlive()) {
                            addHP(recoverhp);
                            addMP(recovermp);
                        }
                    }
                };
                BuffTimer tMan = BuffTimer.getInstance();
                selfRecoveryTask = tMan.register(r, 4000);
            }
        }
    }

    public void checkMercedesRecovery() {
        if (GameConstants.isMercedes(getJob())) {
            if (getSkillLevel(20020109) > 0) {
                if (mercedesRecoveryTask == null) {
                    final SkillStatEffect eff = SkillFactory.getSkill(20020109).getEffect(getSkillLevel(20020109));
                    Runnable r = new Runnable() {

                        @Override
                        public void run() {
                            int recoverhp = (int) ((eff.getX() / 100.0D) * getStat().getCurrentMaxHp());
                            int recovermp = (int) ((eff.getX() / 100.0D) * getStat().getCurrentMaxMp());
                            if (isAlive()) {
                                addHP(recoverhp);
                                if (getStat().getHp() + recoverhp < getStat().getCurrentMaxHp()) {
                                    send(MainPacketCreator.showOwnRecoverHP(Math.min(getStat().getCurrentMaxHp() - getStat().getHp(), recoverhp)));
                                }
                                addMP(recovermp);
                            }
                        }
                    };
                    BuffTimer tMan = BuffTimer.getInstance();
                    mercedesRecoveryTask = tMan.register(r, 4000);
                }
            }
        }
    }

    public final void startInfinityRegen(final SkillStatEffect eff, final int duration) {
        BuffTimer tMan = BuffTimer.getInstance();
        final int regenHP = (int) (getStat().getCurrentMaxHp() * (eff.getY() / 100.0D));
        final int regenMP = (int) (getStat().getCurrentMaxMp() * (eff.getY() / 100.0D));
        Runnable r = new Runnable() {

            @Override
            public void run() {
                MapleCharacter.this.addMPHP(regenHP, regenMP);
                if (getStat().getCurrentMaxHp() - regenHP > 0) {
                    send(MainPacketCreator.showOwnRecoverHP(Math.min(getStat().getCurrentMaxHp() - regenHP, regenHP)));
                }
            }
        };
        infinityReGenTask = tMan.register(r, 4000);
        tMan.schedule(new Runnable() {

            @Override
            public void run() {
                infinityReGenTask.cancel(true);
                infinityReGenTask = null;
            }
        }, duration * 1000);
    }

    public final void startSurPlus() {
        if (SurPlusTask == null) {
            Runnable r = new Runnable() {
                @Override
                public void run() {
                    if (isAlive()) {
                        giveSurPlus(1);
                    }
                }
            };
            BuffTimer tMan = BuffTimer.getInstance();
            SurPlusTask = tMan.register(r, 4000);
        }
    }

    public final void startDiabolicRecovery(final SkillStatEffect eff) {
        BuffTimer tMan = BuffTimer.getInstance();
        final int regenHP = (int) (getStat().getCurrentMaxHp() * (eff.getX() / 100.0D));
        if (diabolicRecoveryTask != null) {
            diabolicRecoveryTask.cancel(true);
            diabolicRecoveryTask = null;
        }
        Runnable r = new Runnable() {

            @Override
            public void run() {
                MapleCharacter.this.addHP(regenHP);
                if (getStat().getCurrentMaxHp() - regenHP > 0) {
                    send(MainPacketCreator.showOwnRecoverHP(Math.min(getStat().getCurrentMaxHp() - regenHP, regenHP)));
                }
            }
        };
        diabolicRecoveryTask = tMan.register(r, eff.getW() * 1000);
        tMan.schedule(new Runnable() {

            @Override
            public void run() {
                if (diabolicRecoveryTask != null) {
                    diabolicRecoveryTask.cancel(true);
                    diabolicRecoveryTask = null;
                }
            }
        }, eff.getDuration());
    }

    public List<BuffStats> getBuffStats(final SkillStatEffect effect, final long startTime) {
        final List<BuffStats> bstats = new ArrayList<BuffStats>();
        for (final Entry<BuffStats, List<BuffStatsValueHolder>> stateffect : effects.entrySet()) {
            final List<BuffStatsValueHolder> mbsvh = stateffect.getValue();
            for (final BuffStatsValueHolder bsvh : mbsvh) {
                if (bsvh.effect.sameSource(effect) && (startTime == -1 || startTime == bsvh.startTime)) {
                    bstats.add(stateffect.getKey());
                }
            }
        }
        return bstats;
    }

    public void cancelEffect(final SkillStatEffect effect, final boolean overwrite, final long startTime) {
        try {
            List<BuffStats> buffstats;
            final List<BuffStatsValueHolder> effectsToCancel;
            final MaplePlayerHolder hph = getClient().getChannelServer().getPlayerStorage();
            synchronized (hph.getEffect(getId())) {
                isExitBuff = false;
                if (!overwrite) {
                    buffstats = getBuffStats(effect, startTime);
                } else {
                    final List<Triple<BuffStats, Integer, Boolean>> statups = effect.getStatups();
                    buffstats = new ArrayList<BuffStats>(statups.size());
                    for (final Triple<BuffStats, Integer, Boolean> statup : statups) {
                        buffstats.add(statup.getFirst());
                    }
                }
                if (effect.getSourceId() == 20040220) {
                    glass_plusCTS_Morph = 1;
                    setBuffedValue(BuffStats.CTS_Larkness, -1, -1);
                    send(MainPacketCreator.cancelEquilbriam());
                    final ISkill eclipseid = SkillFactory.getSkill(20040217);
                    final byte skilllevel = getSkillLevel(eclipseid);
                    final SkillStatEffect eclipseBuff = eclipseid.getEffect(skilllevel);
                    eclipseBuff.applyEclipseBuff(this, false, 20041226);
                    isExitBuff = true;
                    hph.getEffect(getId()).notifyAll();
                    return;
                } else if (effect.getSourceId() == 20040219) {
                    glass_minusCTS_Morph = 9999;
                    setBuffedValue(BuffStats.CTS_Larkness, -1, -1);
                    send(MainPacketCreator.cancelEquilbriam());
                    final ISkill sunfireid = SkillFactory.getSkill(20040216);
                    final byte skilllevel = getSkillLevel(sunfireid);
                    final SkillStatEffect sunfireBuff = sunfireid.getEffect(skilllevel);
                    sunfireBuff.applySunfireBuff(this, false, 27001201);
                    isExitBuff = true;
                    hph.getEffect(getId()).notifyAll();
                    return;
                } else if ((effect.getSourceId() == 15001022 || effect.getSourceId() == 27121005) && !overwrite) {
                    acaneAim = 0;
                }
                if (!overwrite && buffstats == null) {
                    isExitBuff = true;
                    hph.getEffect(getId()).notifyAll();
                    return;
                }
                if (effect.isInfinity()) {
                    if (infinityReGenTask != null) {
                        infinityReGenTask.cancel(true);
                        infinityReGenTask = null;
                    }
                }
                effectsToCancel = new ArrayList<BuffStatsValueHolder>(buffstats.size());
                for (final BuffStats stat : buffstats) {
                    if (stackedEffects.containsKey(stat)) {
                        final List<StackedSkillEntry> sses = stackedEffects.get(stat);
                        int i = 0;
                        boolean delete = false;
                        for (final StackedSkillEntry sse : sses) {
                            if (sse.getSkillId() == (effect.isSkill() ? effect.getSourceId() : -effect.getSourceId())) {
                                delete = true;
                                break;
                            }
                            ++i;
                        }
                        if (delete) {
                            sses.remove(i);
                            if (sses.isEmpty()) {
                                stackedEffects.remove(stat);
                            }
                        }
                    }
                    if (effects.containsKey(stat)) {
                        final List<BuffStatsValueHolder> mbsvh = effects.get(stat);
                        if (mbsvh.size() > 0) {
                            int i = 0;
                            boolean delete = false;
                            for (final BuffStatsValueHolder bsvh : mbsvh) {
                                if (bsvh.effect.getSourceId() == effect.getSourceId()) {
                                    boolean addMbsvh = true;
                                    for (final BuffStatsValueHolder contained : effectsToCancel) {
                                        if (bsvh.startTime == contained.startTime && contained.effect == bsvh.effect) {
                                            addMbsvh = false;
                                        }
                                    }
                                    if (addMbsvh) {
                                        effectsToCancel.add(bsvh);
                                    }
                                    final int summonId = bsvh.effect.getSourceId();
                                    for (Pair<Integer, MapleSummon> summon : summons.values()) {
                                        if (summon.getRight().getSkill() == summonId) {
                                            summon.getRight().removeSummon(map);
                                        }
                                    }
                                    if (summonId == 14001027) {
                                        int skillids[] = {14000027, 14100027, 14110029, 14120008};
                                        for (int s : skillids) {
                                            for (Pair<Integer, MapleSummon> summon : summons.values()) {
                                                if (summon.left == s) {
                                                    summon.getRight().removeSummon(map);
                                                }
                                            }
                                        }
                                    }
                                    delete = true;
                                    break;
                                }
                                ++i;
                            }
                            if (delete) {
                                mbsvh.remove(i);
                                if (mbsvh.isEmpty()) {
                                    effects.remove(stat);
                                }
                            }
                        }
                    }
                }
                isExitBuff = true;
                hph.getEffect(getId()).notifyAll();
            }
            for (final BuffStatsValueHolder cancelEffectCancelTasks : effectsToCancel) {
                if (cancelEffectCancelTasks.schedule != null) {
                    cancelEffectCancelTasks.schedule.cancel(false);
                }
            }
            getStat().recalcLocalStats(this);
            enforceMaxHpMp();
            if (effect.isMagicDoor()) {
                if (!getDoors().isEmpty()) {
                    final MapleDoor door = getDoors().iterator().next();
                    for (final MapleCharacter chr : door.getTarget().getCharacters()) {
                        door.sendDestroyData(chr.getClient());
                    }
                    for (final MapleCharacter chr : door.getTown().getCharacters()) {
                        door.sendDestroyData(chr.getClient());
                    }
                    for (final MapleDoor destroyDoor : getDoors()) {
                        door.getTarget().removeMapObject(destroyDoor);
                        door.getTown().removeMapObject(destroyDoor);
                    }
                    clearDoors();
                    silentPartyUpdate();
                }
            } else if (effect.isMonsterRiding()) {
                setKeyValue2("mountid", 0);
                setKeyValue2("mountsourceid", 0);
            } else if (effect.isAranCombo()) {
                combo = 0;
            }
            if (!overwrite) {
                cancelPlayerBuffs(buffstats, effect.getSourceId());
            }
        } catch (Exception ex) {
            if (!ServerConstants.realese) {
                ex.printStackTrace();
            }
        }
        send(MainPacketCreator.SkillUseResult(effect.getSourceId()));
        ea();
    }

    public void cancelBuffStats(int skill, BuffStats... statt) {
        final List<BuffStats> buffStatList = Arrays.asList(statt);
        for (BuffStats stats : buffStatList) {
            cancelEffectFromBuffStat(stats, skill);
        }
    }

    public void cancelEffectFromBuffStat(BuffStats stat, int skill) {
        final List<SkillStatEffect> toCancelEffects = new ArrayList<SkillStatEffect>();
        if (effects.containsKey(stat)) {
            for (BuffStatsValueHolder bsvh : effects.get(stat)) {
                if (bsvh.effect != null) {
                    if (bsvh.effect.getSourceId() == skill || skill == -1) {
                        toCancelEffects.add(bsvh.effect);
                    }
                }
            }
        }
        for (SkillStatEffect effect : toCancelEffects) {
            cancelEffect(effect, false, -1);
        }
    }

    private void cancelPlayerBuffs(List<BuffStats> buffstats, int skillid) {
        if (skillid == 61111008 || skillid == 61120008 || skillid == 61121053) {
            isFinalFiguration = false;
            changeKaiserTransformKey();
        }
        if (skillid == 1105) {
            return;
        }
        client.getSession().writeAndFlush(MainPacketCreator.cancelBuff(buffstats, buffstats.contains(BuffStats.CTS_MonsterRiding), false, Collections.unmodifiableMap(stackedEffects)));
        map.broadcastMessage(this, MainPacketCreator.cancelForeignBuff(getId(), skillid, buffstats), false);

        if (skillid == 4221054) {
            flipTheCoin = 0;
        }
        if (skillid == 37110009 || skillid == 37120012) {
            combination = 0;
        }
        if ((buffstats.contains(BuffStats.CTS_MonsterRiding) || buffstats.contains(BuffStats.CTS_RideVehicleExpire)) && GameConstants.isEvan(job) && job >= 2200) { // 
            makeDragon();
            map.spawnDragon(dragon);
        }
        stats.recalcLocalStats(this);
        enforceMaxHpMp();
    }

    public void dispel() {
        if (!isHidden()) {
            LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
            for (final List<BuffStatsValueHolder> holders : effects.values()) {
                for (final BuffStatsValueHolder bsvh : holders) {
                    allBuffs.add(bsvh);
                }
            }

            for (final BuffStatsValueHolder mbsvh : allBuffs) {
                if (mbsvh.effect.isSkill() && mbsvh.schedule != null && !mbsvh.effect.isMorph()) {
                    cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                }
            }
        }
    }

    public void dispelSkill(int skillid) {
        LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
        for (List<BuffStatsValueHolder> holders : effects.values()) {
            for (BuffStatsValueHolder bsvh : holders) {
                allBuffs.add(bsvh);
            }
        }

        for (BuffStatsValueHolder mbsvh : allBuffs) {
            if (skillid == 0) {
                if (mbsvh.effect.isSkill() && (mbsvh.effect.getSourceId() == 1004 || mbsvh.effect.getSourceId() == 10001004 || mbsvh.effect.getSourceId() == 20001004 || mbsvh.effect.getSourceId() == 20011004 || mbsvh.effect.getSourceId() == 20011004 || mbsvh.effect.getSourceId() == 20021004 || mbsvh.effect.getSourceId() == 20031004 || mbsvh.effect.getSourceId() == 30001004 || mbsvh.effect.getSourceId() == 30011004 || mbsvh.effect.getSourceId() == 50001004 || mbsvh.effect.getSourceId() == 2121005 || mbsvh.effect.getSourceId() == 2221005 || mbsvh.effect.getSourceId() == 2321003 || mbsvh.effect.getSourceId() == 3111002 || mbsvh.effect.getSourceId() == 3111005 || mbsvh.effect.getSourceId() == 3211002 || mbsvh.effect.getSourceId() == 3211005 || mbsvh.effect.getSourceId() == 4111002 || mbsvh.effect.getSourceId() == 2211011)) {
                    cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                    break;
                }
            } else if (mbsvh.effect.isSkill() && mbsvh.effect.getSourceId() == skillid) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                break;
            }
        }
    }

    public void dispelItem(int skillid) {
        final LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();

        for (BuffStatsValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.getSummonMovementType() != null) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
            }
        }
    }

    public void cancelAllBuffs_() {
        effects.clear();
    }

    public void cancelAllBuffs() {
        LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
        for (List<BuffStatsValueHolder> holders : effects.values()) {
            for (BuffStatsValueHolder bsvh : holders) {
                allBuffs.add(bsvh);
            }
        }

        for (BuffStatsValueHolder mbsvh : allBuffs) {
            cancelEffect(mbsvh.effect, false, mbsvh.startTime);
        }
    }

    public void cancelCTS_Morphs() {
        LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
        for (List<BuffStatsValueHolder> holders : effects.values()) {
            for (BuffStatsValueHolder bsvh : holders) {
                allBuffs.add(bsvh);
            }
        }

        for (BuffStatsValueHolder mbsvh : allBuffs) {
            switch (mbsvh.effect.getSourceId()) {
                case 5111005:
                case 5121003:
                case 15111002:
                case 13111005:
                case 61111008: // 트랜스 피규레이션, 파이널 피규레이션
                case 61120008:
                    return; // Since we can't have more than 1, save up on loops
                default:
                    if (mbsvh.effect.isMorph()) {
                        cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                        continue;
                    }
            }
        }
    }

    public int getCTS_MorphState() {
        LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
        for (List<BuffStatsValueHolder> holders : effects.values()) {
            for (BuffStatsValueHolder bsvh : holders) {
                allBuffs.add(bsvh);
            }
        }

        for (BuffStatsValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isMorph()) {
                return mbsvh.effect.getSourceId();
            }
        }
        return -1;
    }

    public void silentGiveBuffs(List<MapleBuffValueHolder> buffs) {
        for (MapleBuffValueHolder mbsvh : buffs) {
            mbsvh.effect.silentApplyBuff(this, mbsvh.startTime);
        }

    }

    public List<BuffStatsValueHolder> getAllBuffs_() {
        LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
        for (List<BuffStatsValueHolder> holders : effects.values()) {
            for (BuffStatsValueHolder bsvh : holders) {
                allBuffs.add(bsvh);
            }
        }
        return allBuffs;
    }

    public List<MapleBuffValueHolder> getAllBuffs() {
        List<MapleBuffValueHolder> ret = new ArrayList<MapleBuffValueHolder>();
        LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
        for (List<BuffStatsValueHolder> holders : effects.values()) {
            for (BuffStatsValueHolder bsvh : holders) {
                allBuffs.add(bsvh);
            }
        }
        for (Iterator<BuffStatsValueHolder> it = allBuffs.iterator(); it.hasNext();) {
            BuffStatsValueHolder mbsvh = it.next();
            ret.add(new MapleBuffValueHolder(mbsvh.startTime, mbsvh.effect));
        }
        return ret;
    }

    public Map<BuffStats, List<BuffStatsValueHolder>> getEffects() {
        return effects;
    }

    public void cancelMagicDoor() {
        LinkedList<BuffStatsValueHolder> allBuffs = new LinkedList<BuffStatsValueHolder>();
        for (List<BuffStatsValueHolder> holders : effects.values()) {
            for (BuffStatsValueHolder bsvh : holders) {
                allBuffs.add(bsvh);
            }
        }
        for (BuffStatsValueHolder mbsvh : allBuffs) {
            if (mbsvh.effect.isMagicDoor()) {
                cancelEffect(mbsvh.effect, false, mbsvh.startTime);
                break;
            }
        }
    }

    public int getMonsterCombo() {
        return monsterCombo;
    }

    public void setMonsterCombo(int count) {
        monsterCombo = count;
    }

    public void addMonsterCombo(int amount) {
        monsterCombo += amount;
    }

    public long getMonsterComboTime() {
        return monsterComboTime;
    }

    public void setMonsterComboTime(long count) {
        monsterComboTime = count;
    }

    public void silentEnforceMaxHpMp() {
        stats.setMp(stats.getCurrentMaxMp());
        stats.setHp(stats.getCurrentMaxHp(), true, this);
    }

    public void enforceMaxHpMp() {
        try {
            List<Pair<PlayerStat, Long>> statups = new ArrayList<Pair<PlayerStat, Long>>(2);
            stats.setMp(stats.getMp());
            statups.add(new Pair<PlayerStat, Long>(PlayerStat.MP, Long.valueOf(stats.getMp())));
            stats.setHp(stats.getHp(), this);
            statups.add(new Pair<PlayerStat, Long>(PlayerStat.HP, Long.valueOf(stats.getHp())));
            if (statups.size() > 0) {
                client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, statups));
            }
        } catch (NullPointerException ex) {
        }
    }

    public void refreshMaxHpMp() {
        getStat().recalcLocalStats(this);
        List<Pair<PlayerStat, Long>> statups = new ArrayList<Pair<PlayerStat, Long>>(2);
        stats.setMp(stats.getMp());
        statups.add(new Pair<PlayerStat, Long>(PlayerStat.MP, Long.valueOf(stats.getMp())));
        stats.setHp(stats.getHp(), this);
        statups.add(new Pair<PlayerStat, Long>(PlayerStat.HP, Long.valueOf(stats.getHp())));
        client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, statups));
    }

    public void refreshMaxHp() {
        getStat().recalcLocalStats(this);
        List<Pair<PlayerStat, Long>> statups = new ArrayList<Pair<PlayerStat, Long>>(2);
        stats.setHp(stats.getHp(), this);
        statups.add(new Pair<PlayerStat, Long>(PlayerStat.HP, Long.valueOf(stats.getHp())));
        client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, statups));
    }

    public MapleMap getMap() {
        return map;
    }

    public void setMap(MapleMap newmap) {
        this.map = newmap;
    }

    public void setMap(int PmapId) {
        this.mapid = PmapId;
    }

    public int getMapId() {
        if (map != null) {
            return map.getId();
        }
        return mapid;
    }

    public int getInitialSpawnpoint() {
        return initialSpawnPoint;
    }

    public int getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public final String getBlessOfFairyOrigin() {
        return BlessOfFairy_Origin;
    }

    public final String getBlessOfEmpressOrigin() {
        return BlessOfEmpress_Origin;
    }

    public final short getLevel() {
        return level;
    }

    public int getRank() {
        return rank;
    }

    public int getRankMove() {
        return rankMove;
    }

    public int getWorldRank() {
        return worldRank;
    }

    public int getWorldRankMove() {
        return worldRankdMove;
    }

    public int getFame() {
        return fame;
    }

    public final int getFallCounter() {
        return fallcounter;
    }

    public final MapleClient getClient() {
        return client;
    }

    public final void setClient(final MapleClient client) {
        this.client = client;
    }

    public long getExp() {
        return exp;
    }

    public void setInnerExp(int exp) {
        this.innerExp = exp;
    }

    public void gainInnerExp(int exp) {
        this.innerExp += exp;
    }

    public int getInnerExp() {
        return innerExp;
    }

    public void setInnerLevel(int level) {
        this.innerLevel = level;
    }

    public int getInnerLevel() {
        if (innerLevel == 0) {
            innerLevel++;
        }
        return innerLevel;
    }

    public int getArtifactPoints() {
        return artifactPoints;
    }

    public void setArtifactPoints(int points) {
        artifactPoints = points;
    }

    public void addArtifactPoints(int points) {
        artifactPoints = artifactPoints + points;
    }

    public int getRemainingAp() {
        return remainingAp;
    }

    public int[] getRemainingSps() {
        return remainingSp;
    }

    public void setRemainingSps(int[] s) {
        remainingSp = s;
    }

    public int getRemainingSp() {
        return remainingSp[GameConstants.getSkillBook(job, 0)]; //default
    }

    public int getRemainingSp(final int skillbook) {
        return remainingSp[skillbook];
    }

    public int getRemainingSpSize() {
        int ret = 0;
        for (int i = 0; i < remainingSp.length; i++) {
            if (remainingSp[i] > 0) {
                ret++;
            }
        }
        return ret;
    }

    public int getMpApUsed() {
        return mpApUsed;
    }

    public void setMpApUsed(int mpApUsed) {
        this.mpApUsed = mpApUsed;
    }

    public int getHpApUsed() {
        return hpApUsed;
    }

    public boolean isHidden() {
        return hidden;
    }

    public void setHpApUsed(int hpApUsed) {
        this.hpApUsed = hpApUsed;
    }

    public byte getSkinColor() {
        return skinColor;
    }

    public void setSkinColor(byte skinColor) {
        this.skinColor = skinColor;
    }

    public byte getSecondSkinColor() {
        return secondSkinColor;
    }

    public void setSecondSkinColor(byte skinColor) {
        this.secondSkinColor = skinColor;
    }

    public short getJob() {
        return job;
    }

    public void setJob(short newcharjob) {
        job = newcharjob;
    }

    public int getDamageSkinSlot() {
        return damageskinslot;
    }

    public void setDamageSkinSlot(int slot) {
        this.damageskinslot = slot;
    }

    public void addDamageSkinSlot(int slot) {
        this.damageskinslot += slot;
    }

    public int getFreeJob() {
        return freejob;
    }

    public void setFreeJob(int job) {
        this.freejob = job;
    }

    public int getAddDamageHit() {
        return damagehit;
    }

    public long getAddDamage() {
        return damage;
    }

    public void setAddDamage(long dmg) {
        this.damage = dmg;
    }

    public void gainAddDamage(long dmg) {
        this.damage += dmg;
    }

    public void unlockMaxDamage() {
        SkillFactory.getSkill(1105).getEffect(1).applyTo(this);
        if (isBuckshot()) {
            BuckShot();
        }
        if (isStance()) {
            Stance();
        }
        if (isHolySymbol()) {
            HolySymbol();
        }
        if (isSharpEyes()) {
            SharpEyes();
        }
        if (isPartyBooster()) {
            PartyBooster();
        }
        if (isShadowPartner()) {
            if (GameConstants.isThief(getJob())) {
                ShadowPartner();
            }
        }
        if (isMagicArrow()) {
            MagicArrow();
        }
        if (isTrifleWorm()) {
            TrifleWorm();
            changeSkillLevel(SkillFactory.getSkill(13120003), (byte) 20, (byte) 20);
        }
        if (isNoir()) {
            Noir();
        }
        if (isBling()) {
            Bling();
        }
        if (isKinesis()) {
            Kinesis();
        }
    }

    public boolean isBuckshot() {
        return getKeyValue("rc_shot") != null;
    }

    public void BuckShot() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BuckShot, 20, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(5321054, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(5321054, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BuckShot, 20, false)), SkillFactory.getSkill(5321054).getEffect(getSkillLevel(5321054)), null, SkillFactory.getSkill(5321054).getAnimationTime(), getClient().getPlayer()));
    }

    public boolean isStance() {
        return getKeyValue("stance") != null;
    }

    public void Stance() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(80001140, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(80001140, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, 1, false)), SkillFactory.getSkill(80001140).getEffect(getSkillLevel(80001140)), null, SkillFactory.getSkill(80001140).getAnimationTime(), getClient().getPlayer()));
    }

    public boolean isHolySymbol() {
        return getKeyValue("holysymbol") != null;
    }

    public void HolySymbol() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HolySymbol, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(2311003, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(2311003, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HolySymbol, 1, false)), SkillFactory.getSkill(2311003).getEffect(getSkillLevel(2311003)), null, SkillFactory.getSkill(2311003).getAnimationTime(), getClient().getPlayer()));
    }

    public boolean isSharpEyes() {
        return getKeyValue("SharpEyes") != null;
    }

    public void SharpEyes() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SharpEyes, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(3121002, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(3121002, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SharpEyes, 1, false)), SkillFactory.getSkill(3121002).getEffect(getSkillLevel(3121002)), null, SkillFactory.getSkill(3121002).getAnimationTime(), getClient().getPlayer()));
    }

    // CTS_PartyBooster
    public boolean isPartyBooster() {
        return getKeyValue("PartyBooster") != null;
    }

    public void PartyBooster() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PartyBooster, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(5121009, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(5121009, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PartyBooster, 1, false)), SkillFactory.getSkill(5121009).getEffect(getSkillLevel(5121009)), null, SkillFactory.getSkill(5121009).getAnimationTime(), getClient().getPlayer()));
    }

    // 4331002 CTS_ShadowPartner
    public boolean isShadowPartner() {
        return getKeyValue("ShadowPartner") != null;
    }

    public void ShadowPartner() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowPartner, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(4331002, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(4331002, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowPartner, 1, false)), SkillFactory.getSkill(4331002).getEffect(getSkillLevel(4331002)), null, SkillFactory.getSkill(4331002).getAnimationTime(), getClient().getPlayer()));
    }

    public boolean isMagicArrow() {
        return getKeyValue("MagicArrow") != null;
    }

    public void MagicArrow() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PvPRaceEffect, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(3100010, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(3100010, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PvPRaceEffect, 1, false)), SkillFactory.getSkill(3100010).getEffect(getSkillLevel(3100010)), null, SkillFactory.getSkill(3100010).getAnimationTime(), getClient().getPlayer()));
    }

    // CTS_WindBreakTrifleWorm
    public boolean isTrifleWorm() {
        return getKeyValue("TrifleWorm") != null;
    }

    public void TrifleWorm() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_WindBreakTrifleWorm, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(13101022, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(13101022, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_WindBreakTrifleWorm, 1, false)), SkillFactory.getSkill(13101022).getEffect(getSkillLevel(13101022)), null, SkillFactory.getSkill(13101022).getAnimationTime(), getClient().getPlayer()));
    }

    public boolean isNoir() {
        return getKeyValue("noir") != null;
    }

    public void Noir() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PvPInvincible, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(24120002, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(24120002, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PvPInvincible, 1, false)), SkillFactory.getSkill(24120002).getEffect(getSkillLevel(24120002)), null, SkillFactory.getSkill(24120002).getAnimationTime(), getClient().getPlayer()));
        changeSkillLevel(SkillFactory.getSkill(24120002), (byte) 20, (byte) 20);
    }

    public boolean isBling() {
        return getKeyValue("bling") != null;
    }

    public void Bling() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PvPRaceEffect, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(24100003, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(24100003, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PvPRaceEffect, 1, false)), SkillFactory.getSkill(24100003).getEffect(getSkillLevel(24100003)), null, SkillFactory.getSkill(24120002).getAnimationTime(), getClient().getPlayer()));
        changeSkillLevel(SkillFactory.getSkill(24100003), (byte) 20, (byte) 20);
    }

    public boolean isKinesis() {
        return getKeyValue("kinesis") != null;
    }

    public void Kinesis() {
        int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
        Map<BuffStats, List<StackedSkillEntry>> stacked = getStackSkills();
        for (Triple<BuffStats, Integer, Boolean> statup : Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PvPScoreBonus, 1, false))) {
            if (statup.getThird()) {
                if (!stacked.containsKey(statup.getFirst())) {
                    stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                }
                stacked.get(statup.getFirst()).add(new StackedSkillEntry(142110011, statup.getSecond(), overlap_magic, Integer.MAX_VALUE));
            }
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(142110011, Integer.MAX_VALUE, Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PvPScoreBonus, 1, false)), SkillFactory.getSkill(142110011).getEffect(getSkillLevel(142110011)), null, SkillFactory.getSkill(142110011).getAnimationTime(), getClient().getPlayer()));
        changeSkillLevel(SkillFactory.getSkill(142110011), (byte) 20, (byte) 20);
    }

    public void setAddDamageHit(int hit) {
        this.damagehit = hit;
    }

    public void gainAddDamageHit(int hit) { // 치우씨 :: setAddDamageHit 이랑 다를게 뭐임? =+ hit; 로 설정함 / 다른 섭은 모르겠는데 스크립트 없으니까 이렇게
        this.damagehit += hit;
    }

    public int[] getSaveDamageSkins() {
        return saveDamageSkin;
    }

    public void setSaveDamageSkin(int[] s) {
        this.saveDamageSkin = s;
    }

    public int getSaveDamageSkin(int i) {
        return saveDamageSkin[i];
    }

    public int getSaveDamageSkinSize() {
        int ret = 0;
        for (int i = 0; i < saveDamageSkin.length; i++) {
            if (saveDamageSkin[i] > 0) {
                ret++;
            }
        }
        return ret;
    }

    public void setSaveDamageSkin(int i, int skin) {
        this.saveDamageSkin[i] = skin;
    }

    public void saveDamageSkin(final MapleClient c, final int itemId, final byte mode) {
        for (int i = 0; i < getDamageSkinSlot(); i++) {
            if (getSaveDamageSkins()[i] <= 0) {
                setSaveDamageSkin(i, itemId);
                c.send(MainPacketCreator.DamageSkinSaveResult(c.getPlayer()));
                c.send(MainPacketCreator.resetActions(this));
                c.send(MainPacketCreator.serverNotice(1, "" + ItemInformation.getInstance().getName(GameConstants.getDamageSkinItemByNumber(getDamageSkin())) + "이 정상적으로 저장 되었습니다."));
            } else {
                c.send(MainPacketCreator.resetActions(this));
            }
        }
    }

    public int getEventTime() {
        return event;
    }

    public void setEventTime(int event) {
        this.event = event;
    }

    public int getWeddingTime() {
        return wdding;
    }

    public void setWeddingTime(int wdding) {
        this.wdding = wdding;
    }

    public int getEquipTime() {
        return equip;
    }

    public void setEquipTime(int equip) {
        this.equip = equip;
    }

    public int getRainTime() {
        return rain;
    }

    public void setRainTime(int rain) {
        this.rain = rain;
    }

    public int getBoomUPTime() {
        return boom;
    }

    public void setBoomUPTime(int boom) {
        this.boom = boom;
    }

    public int getElixirTime() {
        return elixir;
    }

    public void setElixirTime(int elixir) {
        this.elixir = elixir;
    }

    public int getRestTime() {
        return rest;
    }

    public void setRestTime(int rest) {
        this.rest = rest;
    }

    public int getItemTime() {
        return item;
    }

    public void setItemTime(int item) {
        this.item = item;
    }

    public int getAswanTime() {
        return aswan;
    }

    public void setAswanTime(int aswan) {
        this.aswan = aswan;
    }

    public int getItemPTime() {
        return itemP;
    }

    public void setItemPTime(int itemP) {
        this.itemP = itemP;
    }

    public int getValueTime() {
        return value;
    }

    public void setValueTime(int value) {
        this.value = value;
    }

    public int getItemPaPTime() {
        return itemPap;
    }

    public void setItemPapTime(int itemPap) {
        this.itemPap = itemPap;
    }

    public int getBloodTime() {
        return blood;
    }

    public void setBloodTime(int blood) {
        this.blood = blood;
    }

    public String getBounsTypeName(int type) {
        switch (type) {
            case 0:
                return "이벤트 보너스";
            case 1:
                return "웨딩 보너스";
            case 2:
                return "장착 보너스";
            case 3:
                return "피시방 보너스";
            case 4:
                return "레인보우 보너스";
            case 5:
                return "붐업 보너스";
            case 6:
                return "비약 보너스";
            case 7:
                return "휴식 보너스";
            case 8:
                return "아이템 보너스";
            case 9:
                return "아스완 보너스";
            case 10:
                return "아이템퍼센트 보너스";
            case 11:
                return "벨류팩 보너스";
            case 12:
                return "파티 아이템 보너스";
            case 13:
                return "혈맹의 반지 보너스";
        }
        return "알수없음";
    }

    public int getBounsType(int i) {
        switch (i) {
            case 0: // Event
                return getEventTime();
            case 1: // Wedding
                return getWeddingTime();
            case 2: // Equip
                return getEquipTime();
            case 3: // PC
                return getInternetCafeTime();
            case 4: // rain
                return getRainTime();
            case 5: // boom
                return getBoomUPTime();
            case 6: // elixir
                return getElixirTime();
            case 7: // rest
                return getRestTime();
            case 8: // item
                return getItemTime();
            case 9: // aswan
                return getAswanTime();
            case 10: // itemP
                return getItemPTime();
            case 11: // value
                return getValueTime();
            case 12: //ItemPaP
                return getItemPaPTime();
            case 13: // boold
                return getBloodTime();
        }
        return 0;
    }

    public void setBounsType(int type) {
        switch (type) {
            case 0: // Event
                setEventTime(getEventTime() - 1);
                break;
            case 1: // Wedding
                setWeddingTime(getWeddingTime() - 1);
                break;
            case 2: // Equip
                setEquipTime(getEquipTime() - 1);
                break;
            case 3: // PC
                setInternetCafeTime(getInternetCafeTime() - 1);
                break;
            case 4: // rain
                setRainTime(getRainTime() - 1);
                break;
            case 5: // boom
                setBoomUPTime(getBoomUPTime() - 1);
                break;
            case 6: // elixir
                setElixirTime(getElixirTime() - 1);
                break;
            case 7: // rest
                setRestTime(getRestTime() - 1);
                break;
            case 8: // item
                setItemTime(getItemTime() - 1);
                break;
            case 9: // aswan
                setAswanTime(getAswanTime() - 1);
                break;
            case 10: // itemP
                setItemPTime(getItemPTime() - 1);
                break;
            case 11: // value
                setValueTime(getValueTime() - 1);
                break;
            case 12: //ItemPaP
                setItemPapTime(getItemPaPTime() - 1);
                break;
            case 13: // boold
                setBloodTime(getBloodTime() - 1);
                break;
        }
    }

    public void clearBounsTime(int type) {
        for (int i = 0; i < getBounsType(type); i++) {
            setBounsTime(type, -1);
            dropMessage(6, getBounsTypeName(type));
        }
    }

    public void setBounsTime(int type, int time) {
        switch (type) {
            case 0: // Event
                setEventTime(time);
                break;
            case 1: // Wedding
                setWeddingTime(time);
                break;
            case 2: // Equip
                setEquipTime(time);
                break;
            case 3: // PC
                setInternetCafeTime(time);
                break;
            case 4: // rain
                setRainTime(time);
                break;
            case 5: // boom
                setBoomUPTime(time);
                break;
            case 6: // elixir
                setElixirTime(time);
                break;
            case 7: // rest
                setRestTime(time);
                break;
            case 8: // item
                setItemTime(time);
                break;
            case 9: // aswan
                setAswanTime(time);
                break;
            case 10: // itemP
                setItemPTime(time);
                break;
            case 11: // value
                setValueTime(time);
                break;
            case 12: //ItemPaP
                setItemPapTime(time);
                break;
            case 13: // boold
                setBloodTime(time);
                break;
        }
    }

    public void giveInternetCafeTime() {
        if (getInternetCafeTime() > 1) {
            if (getSkillLevel(92000000) > 0) {
                gainItem(1502002, (short) 1, false, 3, "PC방 황금샵");
            } else if (getSkillLevel(92010000) > 0) {
                gainItem(1512002, (short) 1, false, 3, "PC방 황금 곡갱이 ");
            }

            getClient().send(MainPacketCreator.getInternetCafe((byte) 3, getInternetCafeTime()));
            gainItem(1142145, (short) 1, false, 3, "PC방 프리미엄 훈장");
            gainItem(2430267, (short) 1, false, 3, "PC방 전용 시공석");
            getClient().send(MainPacketCreator.resetActions(this));
            InternetCafeTimer();
        }
    }

    public int getInternetCafeTime() {
        return itcafetime;
    }

    public void setInternetCafeTime(int itcafetime) {
        this.itcafetime = itcafetime;
    }

    public void InternetCafeTimer() {
        if (itcafetimer != null) {
            itcafetimer.cancel(false);
        }
        itcafetimer = CloneTimer.getInstance().register((new Runnable() {
            public void run() {
                if (getInternetCafeTime() < 1) {
                    client.send(MainPacketCreator.getInternetCafe((byte) 4, 0));
                    return;
                }
                setInternetCafeTime(getInternetCafeTime() - 1);
            }
        }), 1000 * 60);
    }

    public void EndBounsExpTimer(int t) {
        if (endBounsTimer != null) {
            endBounsTimer.cancel(false);
        }
        endBounsTimer = CloneTimer.getInstance().register((new Runnable() {
            @Override
            public void run() {
                if (getBounsType(t) > 0) {
                    setBounsType(t);
                }
            }
        }), 1000 * 60);
    }

    public int getMixBaseHairColor() {
        return nMixBaseHairColor;
    }

    public void setMixBaseHairColor(int mixBaseHairColor) {
        this.nMixBaseHairColor = mixBaseHairColor;
    }

    public int getMixAddHairColor() {
        return nMixAddHairColor;
    }

    public void setMixAddHairColor(int MixAddHairColor) {
        this.nMixAddHairColor = MixAddHairColor;
    }

    public int getMixHairBaseProb() {
        return nMixHairBaseProb;
    }

    public void setMixHairBaseProb(int MixHairBaseProb) {
        this.nMixHairBaseProb = MixHairBaseProb;
    }

    public int getGender() {
        return gender;
    }

    public byte getSecondGender() {
        return secondGender;
    }

    public int getHair() {
        return hair;
    }

    public int getSecondHair() {
        return hair2;
    }

    public int getFace() {
        return face;
    }

    public int getSecondFace() {
        return face2;
    }

    public int getAskGuildid() {
        return askguildid;
    }

    public void setAskguildid(int askguildid) {
        this.askguildid = askguildid;
    }

    public int getWP() {
        return wp;
    }

    public void setWP(int wp) {
        this.wp = wp;
    }

    public void gainWP(int wp) {
        this.wp += wp;
    }

    public void loseWP(int wp) {
        this.wp -= wp;
    }

    public int addWP(int wp) {
        int wf = wpForce.size() + 1;
        wpForce.put(wf, wp);
        return wf;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setExp(long exp) {
        this.exp = exp;
    }

    public void setHair(int hair) {
        this.hair = hair;
    }

    public void setSecondHair(int hair) {
        this.hair2 = hair;
    }

    public void setFace(int face) {
        this.face = face;
    }

    public void setSecondFace(int face) {
        this.face2 = face;
    }

    public void setFame(int fame) {
        this.fame = fame;
    }

    public void setFallCounter(int fallcounter) {
        this.fallcounter = fallcounter;
    }

    public void setRemainingAp(int remainingAp) {
        this.remainingAp = remainingAp;
    }

    public void setRemainingSp(int remainingSp) {
        this.remainingSp[GameConstants.getSkillBook(job, 0)] = remainingSp; //default
    }

    public void setRemainingSp(int remainingSp, final int skillbook) {
        this.remainingSp[skillbook] = remainingSp;
    }

    public void setAllGender(byte gender, byte gender2) {
        Connection con = null;
        PreparedStatement ps = null;
        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("UPDATE characters SET gender = ?, gender2 = ? WHERE id = ?", MYSQL.RETURN_GENERATED_KEYS);
            ps.setInt(1, gender);
            ps.setInt(2, gender2);
            ps.setInt(3, this.getId());
            ps.execute();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (con != null) {
                    con.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (Exception error) {
            }
        }
    }

    public void setGender(byte gender) {
        this.gender = gender;
    }

    public void setSecondGender(byte gender) {
        this.secondGender = gender;
    }

    public BuddyList getBuddylist() {
        return buddylist;
    }

    public void addFame(int famechange) {
        this.fame += famechange;
    }

    public void setLastViewTime(long time) {
        this.lastViewTime = time;
    }

    public long getLastViewTime() {
        return lastViewTime;
    }

    public void setPetLoot(boolean status) {
        this.petLoot = status;
    }

    public boolean getPetLoot() {
        return petLoot;
    }

    public void setPetAutoHP(int itemId) {
        this.petAutoHP = itemId;
    }

    public int getPetAutoHP() {
        return petAutoHP;
    }

    public void setPetAutoMP(int itemId) {
        this.petAutoMP = itemId;
    }

    public int getPetAutoMP() {
        return petAutoMP;
    }

    public void changeMapBanish(final int mapid, final String portal, final String msg) {
        dropMessage(5, msg);
        final MapleMap map = client.getChannelServer().getMapFactory().getMap(mapid);
        changeMap(map, map.getPortal(portal));
    }

    public void changeMap(final MapleMap to, final Point pos) {
        changeMapInternal(to, pos, MainPacketCreator.getWarpToMap(to, 0x81, this));
    }

    public void changeMap(final MapleMap to, final MaplePortal pto) {
        changeMapInternal(to, pto.getPosition(), MainPacketCreator.getWarpToMap(to, pto.getId(), this));
    }

    private void changeMapInternal(final MapleMap to, final Point pos, byte[] warpPacket) {

        if (getGMLevel() <= 0 && getMapId() == 931000610) {
            Message(6, "[알림] 현재 감옥에 갇혀 계시므로 다른맵으로 이동 하실수 없습니다.");
            send(MainPacketCreator.resetActions(this));
            return;
        }

        if (eventInstance != null) {
            eventInstance.changedMap(this, to.getId());
        }

        client.send(warpPacket);

        if (getQuickMoved()) {
            client.send(MainPacketCreator.getQuickMove(new ArrayList<QuickMoveEntry>()));
            setQuickMoved(false);
        }
        if (GameConstants.isPhantom(getJob())) {
            client.send(MainPacketCreator.cardAmount(getCardStack()));
        }
        if (ServerConstants.UnlockMaxDamage) {
            unlockMaxDamage();
        }

        map.removePlayer(this);
        if (client.getChannelServer().getPlayerStorage().getCharacterById(getId()) != null) {
            map = to;
            setPosition(pos);
            if (android != null) {
                android.setPosition(pos);
            }
            to.addPlayer(this);
        }
    }

    public void leaveMap() {
        controlled.clear();
        visibleMapObjects.clear();
        if (hpDecreaseTask != null) {
            hpDecreaseTask.cancel(false);
        }
        cancelMapTimeLimitTask();
    }

    public int getDooX() {
        return doox;
    }

    public int getDooY() {
        return dooy;
    }

    public void setDooX(int x) {
        this.doox = x;
    }

    public void setDooY(int y) {
        this.dooy = y;
    }

    public void resetStats(final int str, final int dex, final int int_, final int luk) {
        List<Pair<PlayerStat, Long>> stats = new ArrayList<Pair<PlayerStat, Long>>(2);
        final MapleCharacter chr = this;
        int total = chr.getStat().getStr() + chr.getStat().getDex() + chr.getStat().getLuk() + chr.getStat().getInt() + chr.getRemainingAp();

        total -= str;
        chr.getStat().setStr(str);

        total -= dex;
        chr.getStat().setDex(dex);

        total -= int_;
        chr.getStat().setInt(int_);

        total -= luk;
        chr.getStat().setLuk(luk);

        chr.setRemainingAp(total);

        stats.add(new Pair<PlayerStat, Long>(PlayerStat.STR, Long.valueOf(str)));
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.DEX, Long.valueOf(dex)));
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.INT, Long.valueOf(int_)));
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.LUK, Long.valueOf(luk)));
        stats.add(new Pair<PlayerStat, Long>(PlayerStat.AVAILABLEAP, Long.valueOf(total)));
        client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, stats));
    }

    public void startHurtHp() {
        hpDecreaseTask = EtcTimer.getInstance().register(new Runnable() {

            @Override
            public void run() {
                if (map.getHPDec() < 1 || !isAlive()) {
                    return;
                } else if (getInventory(MapleInventoryType.EQUIPPED).findById(map.getHPDecProtect()) == null) {
                    addHP(-map.getHPDec());
                }
            }
        }, 10000);
    }

    public void changeJob(int newJob) {
        int maxhp = stats.getMaxHp(), maxmp = stats.getMaxMp();
        List<Pair<PlayerStat, Long>> statup = new ArrayList<Pair<PlayerStat, Long>>(2);
        this.job = (short) newJob;
        updateSingleStat(PlayerStat.JOB, job);
        switch (job) {
            case 100:
            case 1100:
            case 2100:
            case 3100:
            case 3101:
                maxhp += Randomizer.rand(500, 700);
                break;
            case 200:
            case 2200:
            case 2210:
            case 3200:
                maxmp += Randomizer.rand(200, 450);
                break;
            case 300:
            case 400:
            case 500:
            case 501:
            case 3500:
                maxhp += Randomizer.rand(200, 380);
                maxmp += Randomizer.rand(50, 150);
                break;
            case 110:
            case 3110:
                maxhp += Randomizer.rand(700, 1000);
                break;
            case 120:
            case 130:
            case 1110:
            case 2110:
                maxhp += Randomizer.rand(600, 800);
                break;
            case 210:
            case 220:
            case 230:
            case 3210:
                maxmp += Randomizer.rand(800, 1000);
                break;
            case 310:
            case 320:
            case 410:
            case 420:
            case 430:
            case 1310:
            case 1410:
            case 2310:
            case 3510:
            case 3310:
            case 530:
                maxhp += Randomizer.rand(600, 800);
                maxmp += Randomizer.rand(300, 500);
                break;
            case 900:
            case 800:
                maxhp += 500000;
                maxmp += 500000;
                break;
        }
        if (!GameConstants.isBeginnerJob(job)) {
            if (GameConstants.isEvan(job)) {
                makeDragon();
                map.spawnDragon(dragon);
            } else if (GameConstants.isPhantom(job)) {
                client.send(MainPacketCreator.cardAmount(getCardStack()));
            }
            gainSP(3);
            client.send(MainPacketCreator.updateSp(this, false));
        }
        if (GameConstants.isKOC(getJob()) && getLevel() >= 100) {
            if (getSkillLevel(Integer.parseInt(String.valueOf(getJob() + "1000"))) <= 0) {
                teachSkill(Integer.parseInt(String.valueOf(getJob() + "1000")), (byte) 0, SkillFactory.getSkill(Integer.parseInt(String.valueOf(getJob() + "1000"))).getMaxLevel());
            }
        }
        if (!isGM()) {
            switch (job % 1000) {
                case 100:
                    resetStats(4, 4, 4, 4);
                    break;
                case 200:
                    resetStats(4, 4, 4, 4);
                    break;
                case 300:
                case 400:
                    resetStats(4, 4, 4, 4);
                    break;
                case 500:
                    resetStats(4, 4, 4, 4);
                    break;
            }
        }
        if (maxhp >= 500000) {
            maxhp = 500000;
        }
        if (maxmp >= 500000) {
            maxmp = 500000;
        }
        if (newJob == 3112) {
            maxmp += 5;
        }
        stats.setMaxHp(maxhp);
        stats.setMaxMp(maxmp);
        stats.setHp(stats.getCurrentMaxHp(), this);
        stats.setMp(stats.getCurrentMaxMp());
        stats.recalcLocalStats(this);
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.MAXHP, Long.valueOf(maxhp)));
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.MAXMP, Long.valueOf(maxmp)));
        client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, statup));
        map.broadcastMessage(this, MainPacketCreator.showSpecialEffect(getId(), 14), false); //1.2.251+, (+1)
        silentPartyUpdate();
        guildUpdate();
        checkForceShield();
        if (ServerConstants.UnlockMaxDamage) {
            unlockMaxDamage();
        }
    }

    public void makeDragon() {
        dragon = new MapleDragon(this);
    }

    public MapleDragon getDragon() {
        return dragon;
    }

    public void gainAp(int ap) {
        this.remainingAp += ap;
        updateSingleStat(PlayerStat.AVAILABLEAP, this.remainingAp);
    }

    public void gainHellAp(final int amount) {
        gainAp(amount);
    }

    public void setAp(int ap) {
        this.remainingAp = ap;
        updateSingleStat(PlayerStat.AVAILABLEAP, this.remainingAp);
    }

    public void gainSP(int job, int sp) {
        this.remainingSp[GameConstants.getSkillBook(job, 0)] += sp;
        updateSingleStat(PlayerStat.AVAILABLESP, 0);
        client.getSession().write(UIPacket.getSPMsg((byte) sp, (short) job));
    }

    public void gainSP(int sp) {
        this.remainingSp[GameConstants.getSkillBook(job, 0)] += sp; //default
        updateSingleStat(PlayerStat.AVAILABLESP, 0); // we don't care the value here
        client.getSession().write(UIPacket.getSPMsg((byte) sp, (short) job));
    }

    public void changeSkillLevel(final int skill, byte newLevel, byte newMasterLevel) {
        changeSkillLevel(SkillFactory.getSkill(skill), newLevel, newMasterLevel, -1);
    }

    public void changeSkillLevel(final ISkill skill, byte newLevel, byte newMasterlevel) {
        changeSkillLevel(skill, newLevel, newMasterlevel, -1);
    }

    public void changeSkillLevel(final ISkill skill, byte newLevel, byte newMasterlevel, long expiration) {
        if (skill == null) {
            return;
        }
        if (newLevel == 0 && newMasterlevel == 0) {
            if (skills.containsKey(skill)) {
                skills.remove(skill);
            }
        } else {
            if (newLevel < 0) {
                newLevel = 0;
            }
            if (newMasterlevel < 0) {
                newMasterlevel = 0;
            }
            skills.put(skill, new SkillEntry(newLevel, newMasterlevel, expiration));
        }
        if (client.getPlayer() != null) {
            if (!GameConstants.isProfessionSkill(skill.getId())) {
                final Map<ISkill, SkillEntry> updates = new HashMap<>();
                updates.put(skill, new SkillEntry(newLevel, newMasterlevel, expiration));
                client.getSession().writeAndFlush(MainPacketCreator.updateSkill(this, updates));
            } else if (profession.getFirstProfessionSkill() == skill.getId()) {
                client.send(MainPacketCreator.updateProfessionSkill(profession.getFirstProfessionExp(), skill.getId(), profession.getFirstProfessionLevel(), 12));
            } else if (profession.getSecondProfessionSkill() == skill.getId()) {
                client.send(MainPacketCreator.updateProfessionSkill(profession.getSecondProfessionExp(), skill.getId(), profession.getSecondProfessionLevel(), 12));
            } else if (newLevel == 0 && newMasterlevel == 0) {
                client.send(MainPacketCreator.updateProfessionSkill(0, skill.getId(), 0, 0));
            } else {
                client.send(MainPacketCreator.updateProfessionSkill(-1, skill.getId(), -1, 1));
            }
            getStat().recalcLocalStats(this);
            if (GameConstants.isDemonAvenger(job)) {
                getStat().giveDemonWatk(this);
            }
        }
    }

    public void playerDead() {
        if (getEventInstance() != null) {
            getEventInstance().playerKilled(this);
        }
        dispelSkill(0);
        cancelAllBuffs();
        checkFollow();
        int charms = getItemQuantity(5130000, false);
        if (charms > 0) {
            InventoryManipulator.removeById(client, MapleInventoryType.CASH, 5130000, 1, true, false);
            charms--;
            if (charms > 0xFF) {
                charms = 0xFF;
            }
            client.getSession().writeAndFlush(CashPacket.useCharm((byte) charms, (byte) 0));
        }
    }

    public void updatePartyMemberHP() {
        if (party != null) {
            final int channel = client.getChannel();
            for (MaplePartyCharacter partychar : party.getMembers()) {
                if (partychar.getMapid() == getMapId() && partychar.getChannel() == channel) {
                    final MapleCharacter other = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(partychar.getName());
                    if (other != null) {
                        other.getClient().getSession().writeAndFlush(MainPacketCreator.updatePartyMemberHP(getId(), stats.getHp(), stats.getCurrentMaxHp()));
                    }
                }
            }
        }
    }

    public void receivePartyMemberHP() {
        int channel = client.getChannel();
        for (MaplePartyCharacter partychar : party.getMembers()) {
            if (partychar.getMapid() == getMapId() && partychar.getChannel() == channel) {
                MapleCharacter other = ChannelServer.getInstance(channel).getPlayerStorage().getCharacterByName(partychar.getName());
                if (other != null) {
                    client.getSession().writeAndFlush(MainPacketCreator.updatePartyMemberHP(other.getId(), other.getStat().getHp(), other.getStat().getCurrentMaxHp()));
                }
            }
        }
    }

    /**
     * Convenience function which adds the supplied parameter to the current hp
     * then directly does a updateSingleStat.
     *
     * @param delta
     * @see MapleCharacter#setHp(int)
     */
    public void addHP(int delta) {
        int alpha = stats.getHp() + delta;
        alpha = Math.min(getStat().getCurrentMaxHp(), alpha);
        if (stats.setHp(alpha, this)) {
            updateSingleStat(PlayerStat.HP, stats.getHp());
        }
    }

    /**
     * Convenience function which adds the supplied parameter to the current mp
     * then directly does a updateSingleStat.
     *
     * @param delta
     * @see MapleCharacter#setMp(int)
     */
    public void addMP(int delta) {
        int beta = stats.getMp() + delta;
        beta = Math.min(getStat().getCurrentMaxMp(), beta);
        if (stats.setMp(beta)) {
            updateSingleStat(PlayerStat.MP, stats.getMp());
        }
    }

    public void addMPHP(int hpDiff, int mpDiff) {
        List<Pair<PlayerStat, Long>> statups = new ArrayList<Pair<PlayerStat, Long>>();
        int alpha = Math.min(getStat().getCurrentMaxHp(), stats.getHp() + hpDiff);
        int beta = Math.min(getStat().getCurrentMaxMp(), stats.getMp() + mpDiff);
        if (stats.setHp(alpha, this)) {
            statups.add(new Pair<PlayerStat, Long>(PlayerStat.HP, Long.valueOf(stats.getHp())));
        }
        if (stats.setMp(beta)) {
            statups.add(new Pair<PlayerStat, Long>(PlayerStat.MP, Long.valueOf(stats.getMp())));
        }
        if (statups.size() > 0) {
            client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, statups, false, false));
            if (stats.getHp() <= 0) {
                client.getSession().writeAndFlush(UIPacket.OpenUIOnDead());
            }
        }
    }

    public void updateSingleStat(PlayerStat stat, long newval) {
        updateSingleStat(stat, newval, false);
    }

    /**
     * Updates a single stat of this MapleCharacter for the client. This method
     * only creates and sends an update packet, it does not update the stat
     * stored in this MapleCharacter instance.
     *
     * @param stat
     * @param newval
     * @param itemReaction
     */
    public void updateSingleStat(PlayerStat stat, long newval, boolean itemReaction) {
        List<Pair<PlayerStat, Long>> statups = new ArrayList<Pair<PlayerStat, Long>>();
        statups.add(new Pair<PlayerStat, Long>(PlayerStat.AVAILABLESP, Long.valueOf(newval)));
        if (stat == PlayerStat.AVAILABLESP) {
            if (statups.size() >= newval) {
                client.getSession().writeAndFlush(MainPacketCreator.updateSp(this, false));
                return;
            } else {
                client.getSession().writeAndFlush(MainPacketCreator.updateSp(this, false));
                return;
            }
        }
        Pair<PlayerStat, Long> statpair = new Pair<PlayerStat, Long>(stat, Long.valueOf(newval));
        client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, Collections.singletonList(statpair), itemReaction, false));
    }

    public void gainExp(final long total, final boolean show, final boolean inChat, final boolean white) {
        if (level == 250) {
            final long needed = GameConstants.getExpNeededForLevel(level);
            if (exp + total > needed) {
                setExp(needed);
            } else {
                exp += total;
            }
        } else if (exp + total >= GameConstants.getExpNeededForLevel(level)) {
            exp += total;
            levelUp();
            if ((this.getBurningCharacter() == 1) && (this.getLevel() > 10)
                    && (this.getLevel() <= 99)) { //1.2.251+, 버닝시즌 2 대응.
                for (int i = 0; i < 3; i++) {
                    levelUp();
                }
                setExp(0);
            }
            final long needed = GameConstants.getExpNeededForLevel(level);
            if (exp > needed) {
                setExp(needed);
            }
        } else {
            exp += total;
        }
        if (total != 0) {
            if (exp < 0) { // After adding, and negative
                if (total > 0) {
                    setExp(GameConstants.getExpNeededForLevel(level));
                } else if (total < 0) {
                    setExp(0);
                }
            }
            updateSingleStat(PlayerStat.EXP, getExp());
            if (show) { // still show the expgain even if it's not there
                client.getSession().writeAndFlush(MainPacketCreator.GainEXP_Others(total, inChat, white));
            }
        }
    }

    public void gainExpMonster(final int gain, final boolean show, final boolean white, final byte pty, final int Class_Bonus_EXP) {
        int rate = client.getChannelServer().getExpRate();
        int total = gain;
        int SelectedMobBonusExp = 0;
        int PartyBonusPercentage = 0;
        int WeddingBonusExp = 0;
        int PartyBonusExp = 0;
        int ItemBonusExp = 0;
        int PremiumIPBonusExp = 0;
        int RainbowWeekEventBonusExp = 0;
        int BoomUpEventBonusExp = 0;
        int PlusExpBuffBonusExp = 0;
        int PsdBonusExpRate = 0;
        int IndieBonusExp = 0;
        int RelaxBonusExp = 0;
        int InstallItemBonusExp = 0;
        int AswanWinnerBonusExp = 0;
        int ExpByIncExpR = 0;
        int ValuePackBonusExp = 0;
        int ExpByIncPQExpR = 0;
        int BaseAddExp = 0;
        int BloodAllianceBonusExp = 0;
        int FreezeHotEventBonusExp = 0;
        int UserHPRateBonusExp = 0;

        if (getBuffedSkillEffect(BuffStats.CTS_ExpBuffRate) != null) {
            for (BuffStatsValueHolder bsvh : effects.get(BuffStats.CTS_ExpBuffRate)) {
                PlusExpBuffBonusExp += (int) (gain * (bsvh.value / 100.0D));
                total += PlusExpBuffBonusExp;
            }
        }

        if (getPendantExp() > 0) {
            ItemBonusExp = (int) (gain * ((this.pendantExp * 10) / 100.0D));
            total += ItemBonusExp;
        }

        Integer UserHPRate = getBuffedValue(BuffStats.CTS_MaxHP, -2023128);
        if (UserHPRate != null) {
            UserHPRateBonusExp = (int) (gain * (UserHPRate / 100.0D));
            total += UserHPRateBonusExp;
        }

        if (prmiumpc) {
            PremiumIPBonusExp = (int) (gain * (150 / 100.0D));
            total += PremiumIPBonusExp;
        }

        if (getSkillLevel(20021110) > 0) { //엘프의 축복
            PsdBonusExpRate += (int) (gain * (SkillFactory.getSkill(20021110).getEffect(getSkillLevel(20021110)).getStat("expR") / 100.0D));
            total += PsdBonusExpRate;
        }

        if (getSkillLevel(80001040) > 0) {
            PsdBonusExpRate += (int) (gain * (SkillFactory.getSkill(80001040).getEffect(getSkillLevel(80001040)).getStat("expR") / 100.0D));
            total += PsdBonusExpRate;
        }

        if (getBuffedSkillEffect(BuffStats.CTS_IndieEXP) != null) {
            for (BuffStatsValueHolder bsvh : effects.get(BuffStats.CTS_IndieEXP)) {
                IndieBonusExp += (int) (gain * (bsvh.value / 100.0D));
                total += IndieBonusExp;
            }
        }

        if (pty > 1) {
            PartyBonusExp = (int) (((float) (gain / 20)) * (pty + 1));
            total += PartyBonusExp;
        }

        Integer hsb = getBuffedValue(BuffStats.CTS_HolySymbol);
        if (hsb != null) {
            BaseAddExp = (int) (gain * (hsb / 100.0D));
            total += BaseAddExp;
        }

        if (getBuffedValue(BuffStats.CTS_Dice) != null) {
            if (getBuffedValue(BuffStats.CTS_Dice) == 6) {
                PsdBonusExpRate += (int) (gain * (30 / 100.0D));
                total += PsdBonusExpRate;
            } else {
                int rand1 = 0;
                int rand2 = 0;
                rand1 = getBuffedValue(BuffStats.CTS_Dice) & 0xF;
                rand2 = getBuffedValue(BuffStats.CTS_Dice) & 0xF0;
                if (rand1 == 6 && rand2 == 6) {
                    PsdBonusExpRate += (int) (gain * (60 / 100.0D));
                    total += PsdBonusExpRate;
                } else if (rand1 == 6 || (rand1 == 1 && rand2 == 6)) {
                    PsdBonusExpRate += (int) (gain * (30 / 100.0D));
                    total += PsdBonusExpRate;
                }
            }
        }
        if (rate > 1) {
            BoomUpEventBonusExp = (int) (gain * ((rate * 100) / 100.0D));
            total += BoomUpEventBonusExp;
        }
        if (String.valueOf(total).contains("-")) {
            total = Integer.parseInt(String.valueOf(total).replaceAll("-", ""));
        }
        gainItemExp(total);
        if (level == 250) {
            final long needed = GameConstants.getExpNeededForLevel(level);
            if (exp + total > needed) {
                setExp(needed);
            } else {
                exp += total;
            }
        } else if (exp + total >= GameConstants.getExpNeededForLevel(level)) {
            exp += total;
            levelUp();
            if ((this.getBurningCharacter() == 1) && (this.getLevel() > 10)
                    && (this.getLevel() <= 99)) { //1.2.251+, 버닝 시즌2 대응.
                for (int i = 0; i < 3; i++) {
                    levelUp();
                }
                setExp(0);
            }
            final long needed = GameConstants.getExpNeededForLevel(level);
            if (exp > needed) {
                setExp(needed);
            }
        } else {
            exp += total;
        }
        if (gain != 0) {
            if (exp < 0) { // After adding, and negative
                if (gain > 0) {
                    setExp(GameConstants.getExpNeededForLevel(level));
                } else if (gain < 0) {
                    setExp(0);
                }
            }
            updateSingleStat(PlayerStat.EXP, getExp());
            if (show) { // still show the expgain even if it's not there
                client.getSession().writeAndFlush(MainPacketCreator.GainEXP_Monster(gain, false, white,
                        SelectedMobBonusExp,
                        PartyBonusPercentage,
                        WeddingBonusExp,
                        PartyBonusExp,
                        ItemBonusExp,
                        PremiumIPBonusExp,
                        RainbowWeekEventBonusExp,
                        BoomUpEventBonusExp,
                        PlusExpBuffBonusExp,
                        PsdBonusExpRate,
                        IndieBonusExp,
                        RelaxBonusExp,
                        InstallItemBonusExp,
                        AswanWinnerBonusExp,
                        ExpByIncExpR,
                        ValuePackBonusExp,
                        ExpByIncPQExpR,
                        BaseAddExp,
                        BloodAllianceBonusExp,
                        FreezeHotEventBonusExp,
                        UserHPRateBonusExp));
            }
        }
    }

    public void gainItemExp(int exp) {
        boolean levelup = false;
        for (IItem item : getInventory(MapleInventoryType.EQUIPPED).list()) {
            Equip equip = (Equip) item;
            if (ItemInformation.getInstance().getMaxLevelEquip(equip.getItemId()) > 0 && equip.getItemLevel() < ItemInformation.getInstance().getMaxLevelEquip(equip.getItemId())) {
                equip.setItemEXP(equip.getItemEXP() + exp);
                client.getSession().writeAndFlush(MainPacketCreator.updateSpecialItemUse(equip, (byte) 1));
                if (equip.getItemEXP() >= GameConstants.getTimelessRequiredEXP(equip.getItemLevel())) {
                    ItemInformation.getInstance().levelUpItem(equip);
                    levelup = true;
                }
            }
        }
        if (levelup) {
            equipChanged();
            send(MainPacketCreator.showItemLevelupEffect());
            getMap().broadcastMessage(this, MainPacketCreator.showForeignItemLevelupEffect(getId()), false);
        }
    }

    public void silentPartyUpdate() {
        if (party != null) {
            WorldCommunity.updateParty(party.getId(), MaplePartyOperation.SILENT_UPDATE, new MaplePartyCharacter(this));
        }
    }

    public boolean isGM() {
        return gmLevel > 0;
    }

    public int getGMLevel() {
        return gmLevel;
    }

    public boolean hasGmLevel(byte level) {
        return gmLevel >= level;
    }

    public void setGMLevel(byte level) {
        this.gmLevel = level;
    }

    public final MapleInventory getInventory(MapleInventoryType type) {
        return inventory[type.ordinal()];
    }

    public final MapleInventory[] getInventorys() {
        return inventory;
    }

    public final void expirationTask() {
        long expiration;
        final long currenttime = System.currentTimeMillis();
        for (final MapleInventory inv : inventory) {
            final List<IItem> toberemove = new ArrayList<IItem>();
            for (final IItem item : inv.list()) {
                expiration = item.getExpiration();
                if (expiration != -1 && !GameConstants.isPet(item.getItemId())) {
                    short flag = item.getFlag();
                    if (ItemFlag.LOCK.check(flag)) {
                        if (currenttime > expiration) {
                            item.setExpiration(-1);
                            item.setFlag((short) (flag - ItemFlag.LOCK.getValue()));
                            client.getSession().writeAndFlush(MainPacketCreator.updateSpecialItemUse(item, item.getType()));
                        }
                    } else if (currenttime > expiration) {
                        if (item.isCash()) {
                            client.getSession().writeAndFlush(CashPacket.itemExpired(item.getItemId()));
                        } else {
                            message(5, "[" + ItemInformation.getInstance().getName(item.getItemId()) + "] 의 유효기간이 만료되어 사라졌습니다.");
                        }
                        toberemove.add(item);
                    }
                } else if (ItemInformation.getInstance().isExpireOnLogout(item.getItemId())) {
                    client.getSession().writeAndFlush(CashPacket.itemExpired(item.getItemId()));
                    toberemove.add(item);
                } else if (expiration == -1 && item.getItemId() == 1012270) {
                    item.setExpiration(System.currentTimeMillis() + (5L * 86400L * 1000L));
                    client.getSession().writeAndFlush(MainPacketCreator.updateSpecialItemUse(item, inv.getType() == MapleInventoryType.EQUIPPED ? (byte) 1 : inv.getType().getType()));
                }
            }
            for (final IItem item : toberemove) {
                InventoryManipulator.removeFromSlot(client, inv.getType(), item.getPosition(), item.getQuantity(), false);
            }
        }
        final List<Integer> toRemoveSkills = new ArrayList<Integer>();
        for (Entry<ISkill, SkillEntry> se : skills.entrySet()) {
            if (se.getValue().expiration < currenttime && se.getValue().expiration != -1) {
                toRemoveSkills.add(se.getKey().getId());
            }
        }
        for (Integer i : toRemoveSkills) {
            changeSkillLevel(SkillFactory.getSkill(i), (byte) 0, (byte) 0);
            dropMessage(5, "[" + SkillFactory.getSkillName(i) + "] 스킬이 유효기간이 만료되어 사라졌습니다.");
        }
    }

    public MapleShop getShop() {
        return shop;
    }

    public void setShop(MapleShop shop) {
        this.shop = shop;
    }

    public long getMeso() {
        return meso;
    }

    public final int[] getSavedLocations() {
        return savedLocations;
    }

    public int getSavedLocation(SavedLocationType type) {
        return savedLocations[type.ordinal()];
    }

    public void saveLocation(SavedLocationType type) {
        savedLocations[type.ordinal()] = getMapId();
    }

    public void clearSavedLocation(SavedLocationType type) {
        savedLocations[type.ordinal()] = -1;
    }

    public void setMeso(long gain) {
        meso = gain;
        updateSingleStat(PlayerStat.MESO, meso);
    }

    public void loseMeso(long gain, boolean show, boolean enableActions, boolean inChat) {
        meso -= gain;
        updateSingleStat(PlayerStat.MESO, meso, enableActions);
        if (show) {
            client.getSession().writeAndFlush(MainPacketCreator.showMesoGain(gain, inChat));
        }
    }

    public void gainMeso(long gain, boolean show) {
        gainMeso(gain, show, false, false);
    }

    public void gainMeso(long gain, boolean show, boolean enableActions) {
        gainMeso(gain, show, enableActions, false);
    }

    public void gainMeso(long gain, boolean show, boolean enableActions, boolean inChat) {
        if (meso + gain < 0) {
            client.getSession().writeAndFlush(MainPacketCreator.resetActions());
            return;
        }
        meso += gain;
        updateSingleStat(PlayerStat.MESO, meso, enableActions);
        if (show) {
            client.getSession().writeAndFlush(MainPacketCreator.showMesoGain(gain, inChat));
        }
    }

    public void controlMonster(MapleMonster monster, boolean aggro) {
        monster.setController(this);
        controlled.add(monster);
        client.getSession().writeAndFlush(MobPacket.controlMonster(monster, false, monster.getId() != 8220028 ? aggro : false, GameConstants.isAswanMap(mapid)));
    }

    public void stopControllingMonster(MapleMonster monster) {
        controlled.remove(monster);
    }

    public void checkMonsterAggro(MapleMonster monster) {
        if (monster.getController() == this) {
            monster.setControllerHasAggro(true);
        } else {
            monster.switchController(this, true);
        }
    }

    public Collection<MapleMonster> getControlledMonsters() {
        return Collections.unmodifiableCollection(controlled);
    }

    public int getAccountID() {
        return accountid;
    }

    public void mobKilled(final int id) {
        try {
            for (MapleQuestStatus q : quests.values()) {
                if (q.getStatus() != 1 || !q.hasMobKills()) {
                    continue;
                }
                if (q.mobKilled(id)) {
                    client.getSession().writeAndFlush(MainPacketCreator.updateQuestMobKills(q));
                    if (q.getQuest().canComplete(this, null)) {
                        client.getSession().writeAndFlush(MainPacketCreator.getShowQuestCompletion(q.getQuest().getId()));
                    }
                }
            }
        } catch (NullPointerException e) {
        }
    }

    public final List<MapleQuestStatus> getStartedQuests() {
        List<MapleQuestStatus> ret = new LinkedList<MapleQuestStatus>();
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == 1 && !q.isCustomQuest()) {
                ret.add(q);
            }
        }
        return Collections.unmodifiableList(ret);
    }

    public final List<MapleQuestStatus> getCompletedQuests() {
        List<MapleQuestStatus> ret = new LinkedList<MapleQuestStatus>();
        for (MapleQuestStatus q : quests.values()) {
            if (q.getStatus() == 2 && !q.isCustomQuest()) {
                ret.add(q);
            }
        }
        return Collections.unmodifiableList(ret);
    }

    public Map<ISkill, SkillEntry> getSkills() {
        return Collections.unmodifiableMap(skills);
    }

    public List<InnerSkillValueHolder> getInnerSkills() {
        return innerSkills;
    }

    public byte getSummonLinkSkillLevel(final ISkill skill) {
        switch (skill.getId()) {
            case 23111009:
            case 23111010:
                return (byte) getSkillLevel(23111008);
            case 5211015:
            case 5211016:
                return (byte) getSkillLevel(5211011);
            case 5320011:
                return (byte) getSkillLevel(5321004);
            case 33101008:
                return (byte) getSkillLevel(33101004);
            case 33001011:
                return (byte) getSkillLevel(33001010);
            case 35111009:
            case 35111010:
                return (byte) getSkillLevel(35111001);
            case 35121013:
                return (byte) getSkillLevel(35121005);
            case 35121011:
                return (byte) getSkillLevel(35121009);
            case 36121013:
            case 36121014:
                return (byte) getSkillLevel(36121002);
        }
        if (GameConstants.isAngelicBlessSkill(skill.getId())) {
            return (byte) 1;
        }
        if (GameConstants.isSaintSaverSkill(skill.getId())) {
            return (byte) 1;
        }
        return getSkillLevel(skill);
    }

    public byte getSummonLinkSkillLevel(final int skill) {
        switch (skill) {
            case 23111009:
            case 23111010:
                return (byte) getSkillLevel(23111008);
            case 5211015:
            case 5211016:
                return (byte) getSkillLevel(5211011);
            case 5320011:
                return (byte) getSkillLevel(5321004);
            case 33101008:
                return (byte) getSkillLevel(33101004);
            case 35111009:
            case 35111010:
                return (byte) getSkillLevel(35111001);
        }
        if (GameConstants.isAngelicBlessSkill(skill)) {
            return (byte) 1;
        }
        if (GameConstants.isSaintSaverSkill(skill)) {
            return (byte) 1;
        }
        return (byte) getSkillLevel(skill);
    }

    public byte getSkillLevel(final ISkill skill) {
        final SkillEntry ret = skills.get(skill);
        if (skill == null) {
            return 0;
        }
        if (ret == null) {
            return 0;
        }
        if (ret.skillevel == 0) {
            return 0;
        }
        if (SkillFactory.getSkill(skill.getId()).getMaxLevel() == 1) {
            return 1;
        }
        if (link_skill.containsKey(skill.getId())) {
            return link_skill.get(skill.getId()).getLeft().byteValue();
        }
        byte skillLevel = (byte) Math.min(ret.skillevel + getStat().getIncAllSkill(), skill.getMaxLevel());
        if (skill.canCombatOrdered() && getBuffedValue(BuffStats.CTS_CombatOrders) != null) {
            skillLevel += getBuffedValue(BuffStats.CTS_CombatOrders).byteValue();
        }
        return skillLevel;
    }

    public int getSkillLevel(int skill) {
        SkillEntry ret = skills.get(SkillFactory.getSkill(skill));
        if (ret == null) {
            return 0;
        }
        if (ret.skillevel == 0) {
            return 0;
        }
        if (SkillFactory.getSkill(skill).getMaxLevel() == 1) {
            return 1;
        }
        if (link_skill.containsKey(skill)) {
            return link_skill.get(skill).getLeft();
        }
        byte skillLevel = (byte) Math.min(ret.skillevel + getStat().getIncAllSkill(), SkillFactory.getSkill(skill).getMaxLevel());
        if (SkillFactory.getSkill(skill).canCombatOrdered() && getBuffedValue(BuffStats.CTS_CombatOrders) != null) {
            skillLevel += getBuffedValue(BuffStats.CTS_CombatOrders).byteValue();
        }
        return skillLevel;
    }

    public byte getOriginSkillLevel(final ISkill skill) {
        final SkillEntry ret = skills.get(skill);
        if (skill == null) {
            return 0;
        }
        if (ret == null) {
            return 0;
        }
        if (ret.skillevel == 0) {
            return 0;
        }
        if (SkillFactory.getSkill(skill.getId()).getMaxLevel() == 1) {
            return 1;
        }
        return ret.skillevel;
    }

    public int getOriginSkillLevel(int skill) {
        SkillEntry ret = skills.get(SkillFactory.getSkill(skill));
        if (ret == null) {
            return 0;
        }
        if (ret.skillevel == 0) {
            return 0;
        }
        if (SkillFactory.getSkill(skill).getMaxLevel() == 1) {
            return 1;
        }
        return ret.skillevel;
    }

    public byte getMasterLevel(final ISkill skill) {
        final SkillEntry ret = skills.get(skill);
        if (ret == null) {
            return 0;
        }
        return ret.masterlevel;
    }

    public byte getMasterLevel(final int skill) {
        final SkillEntry ret = skills.get(SkillFactory.getSkill(skill));
        if (ret == null) {
            return 0;
        }
        return ret.masterlevel;
    }

    public void levelUp() {
        int ap1 = (short) Randomizer.rand(1, 10);
        if (getKeyValue("hellmode") != null) {
            gainHellAp(ap1);
        }
        exp -= GameConstants.getExpNeededForLevel(level);
        level += 1;

        if (AutoJob()) {
            maxskill(job);
        }
        remainingAp += 5;
        int maxhp = stats.getMaxHp();
        int maxmp = stats.getMaxMp();
        //  if (level == 60) {
        //      gainItem(4001848, (short) 1, false, -1, "레벨업지급");
        //   }
        //      else if (level == 250) {
        //         gainItem(4001715, (short) 1, false, -1, "레벨업지급");
        //       }
        if ((GameConstants.isBeginnerJob(job)) && (job != 3001) && (job != 10000)) { // 초보자
            maxhp += Randomizer.rand(24, 32);
            maxmp += Randomizer.rand(20, 24);
        } else if (job == 3001 || job == 10000) { // 초보자
            maxhp += Randomizer.rand(52, 56);
        } else if (job >= 100 && job <= 132) { // 전사
            maxhp += Randomizer.rand(70, 105);
            maxmp += Randomizer.rand(10, 20);
        } else if (job >= 200 && job <= 232) { // 마법사
            maxhp += Randomizer.rand(20, 36);
            maxmp += Randomizer.rand(44, 63);
        } else if ((job >= 300 && job <= 322)
                || (job >= 400 && job <= 434)
                || (job >= 1300 && job <= 1312)
                || (job >= 1400 && job <= 1412)
                || (job >= 3300 && job <= 3312) //와일드헌터
                ) {
            maxhp += Randomizer.rand(34, 55);
            maxmp += Randomizer.rand(28, 40);
        } else if (job >= 2300 && job <= 2312) { // 메르세데스
            maxhp += Randomizer.rand(45, 66);
            maxmp += Randomizer.rand(35, 43);
        } else if (job >= 3100 && job <= 3122) { // 데몬슬레이어, 데몬어벤져
            maxhp += Randomizer.rand(70, 105);
        } else if (job >= 500 && job <= 532) { // 해적
            maxhp += Randomizer.rand(50, 60);
            maxmp += Randomizer.rand(37, 50);
        } else if (job >= 1100 && job <= 1112) { // 소울마스터
            maxhp += Randomizer.rand(70, 100);
            maxmp += Randomizer.rand(10, 20);
        } else if (job >= 1200 && job <= 1212) { // 플레임 위자드
            maxhp += Randomizer.rand(20, 38);
            maxmp += Randomizer.rand(50, 75);
        } else if (job >= 2200 && job <= 2218) { // 에반
            maxhp += Randomizer.rand(25, 40);
            maxmp += Randomizer.rand(50, 80);
        } else if (job >= 2700 && job <= 2712) { // 루미너스
            maxhp += Randomizer.rand(25, 40);
            maxmp += Randomizer.rand(60, 100);
        } else if (job >= 1500 && job <= 1512) { // 스트라이커
            maxhp += Randomizer.rand(56, 67);
            maxmp += Randomizer.rand(34, 47);
        } else if (job >= 2100 && job <= 2112) { // 아란
            maxhp += Randomizer.rand(100, 130);
            maxmp += Randomizer.rand(10, 15);
        } else if (job >= 2400 && job <= 2412) { // 팬텀
            maxhp += Randomizer.rand(56, 67);
            maxmp += Randomizer.rand(74, 100);
        } else if (job >= 3700 && job <= 3712) { //블래셔
            maxhp += Randomizer.rand(56, 67);
            maxmp += Randomizer.rand(74, 100);
        } else if (job >= 3500 && job <= 3512) { // 메카닉
            maxhp += Randomizer.rand(56, 67);
            maxmp += Randomizer.rand(34, 47);
        } else if (job >= 3600 && job <= 3612) { // 제논
            maxhp += Randomizer.rand(100, 130);
            maxmp += Randomizer.rand(10, 15);
        } else if (job >= 2500 && job <= 2512) { // 은월
            maxhp += Randomizer.rand(66, 77);
            maxmp += Randomizer.rand(44, 57);
        } else if (job >= 3200 && job <= 3212) { // 배틀메이지
            maxhp += Randomizer.rand(30, 36);
            maxmp += Randomizer.rand(44, 63);
        } else if (job >= 5100 && job <= 5112) { // 미하일
            maxhp += Randomizer.rand(70, 105);
            maxmp += Randomizer.rand(10, 20);
        } else if (job >= 6100 && job <= 6112) { // 카이저
            maxhp += Randomizer.rand(70, 105);
            maxmp += Randomizer.rand(10, 20);
        } else if (job >= 6500 && job <= 6512) { // 엔젤릭버스터
            maxhp += Randomizer.rand(56, 67);
        } else if (job >= 10100 && job <= 10112) { // 제로
            maxhp += Randomizer.rand(70, 105);
        } else if (job >= 13000 && job <= 13100) { // 핑크빈
            maxhp += Randomizer.rand(56, 67);
            maxmp += Randomizer.rand(44, 63);
        } else if (job >= 14000 && job <= 14212) { //키네시스
            maxhp += Randomizer.rand(70, 105);
        }
        maxmp += stats.getInt() / 10;

        if (level == 200 || level == 250 && !isGM()) {
            final StringBuilder sb = new StringBuilder("[축하] ");
            final IItem medal = getInventory(MapleInventoryType.EQUIPPED).getItem((byte) -46);
            if (medal != null) { // Medal
                sb.append("<");
                sb.append(ItemInformation.getInstance().getName(medal.getItemId()));
                sb.append("> ");
            }
            sb.append(getName());
            sb.append(" 님이 레벨 " + level + "을(를) 달성했습니다! 모두 축하해 주세요.");
            WorldBroadcasting.broadcastMessage(MainPacketCreator.serverNotice(6, sb.toString()));
        }

        maxhp = Math.min(500000, Math.abs(maxhp));
        maxmp = Math.min(500000, Math.abs(maxmp));

        stats.setInfo(maxhp, maxmp, getStat().getCurrentMaxHp(), getStat().getCurrentMaxMp());
        stats.recalcLocalStats(this);

        final List<Pair<PlayerStat, Long>> statup = new ArrayList<Pair<PlayerStat, Long>>(8);
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.MAXHP, Long.valueOf(maxhp)));
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.MAXMP, Long.valueOf(maxmp)));
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.HP, Long.valueOf(getStat().getCurrentMaxHp())));
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.MP, Long.valueOf(getStat().getCurrentMaxMp())));
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.EXP, exp));
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.LEVEL, (long) level));

        if (!GameConstants.isZero(getJob()) && getLevel() > 10) {
            gainSP(3);
            zeroSkillMaster(); // 치우씨 :: 제로 @스킬마스터 구현
        }

        client.getSession().writeAndFlush(MainPacketCreator.updateSp(this, false));

        if (level <= 10) {
            stats.setStr(stats.getStr() + remainingAp);
            remainingAp = 0;
            statup.add(new Pair<PlayerStat, Long>(PlayerStat.STR, (long) stats.getStr()));
        }
        statup.add(new Pair<PlayerStat, Long>(PlayerStat.AVAILABLEAP, (long) remainingAp));

        client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, statup));
        map.broadcastMessage(this, MainPacketCreator.showSpecialEffect(getId(), 0), false);

        silentPartyUpdate();
        guildUpdate();

        if (GameConstants.isDemonAvenger(job)) {
            getStat().giveDemonWatk(this);
        }
    }

    public int getHitCountBat() {
        return hitcountbat;
    }

    public void setHitCountBat(int hitcount) {
        this.hitcountbat = hitcount;
    }

    public int getBatCount() {
        return batcount;
    }

    public void setBatCount(int count) {
        this.batcount = count;
    }

    public void changeKeybinding(int key, MapleKeyBinding keybinding) {
        if (keybinding.getType() != 0) {
            keylayout.Layout().put(Integer.valueOf(key), keybinding);
        } else {
            keylayout.Layout().remove(Integer.valueOf(key));
        }
    }

    public void zeroSkillMaster() { // 치우씨 :: 제로 @스킬마스터 구현
        int skill[][] = GameConstants.getZeroSkillList();
        for (int i = 0; i < skill.length; i++) {
            if (level >= skill[i][1]) {
                if (getSkillLevel(skill[i][0]) <= 0) {
                    changeSkillLevel(skill[i][0], (byte) SkillFactory.getSkill(skill[i][0]).getMaxLevel(), (byte) SkillFactory.getSkill(skill[i][0]).getMaxLevel());
                }
            }
        }
    }

    public void sendMacros() {
        for (int i = 0; i < 5; i++) {
            if (skillMacros[i] != null) {
                send(MainPacketCreator.getMacros(skillMacros));
                break;
            }
        }
    }

    public void updateMacros(int position, SkillMacro updateMacro) {
        skillMacros[position] = updateMacro;
        skillmacros_changed = true;
    }

    public final SkillMacro[] getMacros() {
        return skillMacros;
    }

    public void tempban(String reason, Calendar duration, int greason, boolean IPMac) {
        if (IPMac) {
            client.banMacs();
        }

        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
            ps.setString(1, client.getIp());
            ps.execute();
            ps.close();

            client.getSession().close();

            ps = con.prepareStatement("UPDATE accounts SET tempban = ?, banreason = ?, greason = ? WHERE id = ?");
            Timestamp TS = new Timestamp(duration.getTimeInMillis());
            ps.setTimestamp(1, TS);
            ps.setString(2, reason);
            ps.setInt(3, greason);
            ps.setInt(4, accountid);
            ps.execute();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            System.err.println("Error while tempbanning" + ex);
        }

    }

    public final boolean ban(String reason, boolean IPMac, boolean autoban) {
        if (lastmonthfameids == null) {
            throw new RuntimeException("Trying to ban a non-loaded character (testhack)");
        }
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE accounts SET banned = ?, banreason = ? WHERE id = ?");
            ps.setInt(1, autoban ? 2 : 1);
            ps.setString(2, reason);
            ps.setInt(3, accountid);
            ps.execute();
            ps.close();

            if (IPMac) {
                client.banSerial();
                ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, client.getIp());
                ps.execute();
                ps.close();
            }
            con.close();
        } catch (SQLException ex) {
            System.err.println("Error while banning" + ex);
            return false;
        }
        return true;
    }

    public int gainReward(int cid, int item, int quan) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO rewardsaves (cid, itemid, quantity) VALUES (?, ?, ?)");
            ps.setInt(1, cid);
            ps.setInt(2, item);
            ps.setInt(3, quan);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (Exception e) {
        }
        return -1;
    }

    public static boolean ban(String id, String reason, boolean accountId) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps;
            if (id.matches("/[0-9]{1,3}\\..*")) {
                ps = con.prepareStatement("INSERT INTO ipbans VALUES (DEFAULT, ?)");
                ps.setString(1, id);
                ps.execute();
                ps.close();
                con.close();
                return true;
            }
            if (accountId) {
                ps = con.prepareStatement("SELECT id FROM accounts WHERE name = ?");
            } else {
                ps = con.prepareStatement("SELECT accountid FROM characters WHERE name = ?");
            }
            boolean ret = false;
            ps.setString(1, id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                PreparedStatement psb = con.prepareStatement("UPDATE accounts SET banned = 1, banreason = ? WHERE id = ?");
                psb.setString(1, reason);
                psb.setInt(2, rs.getInt(1));
                psb.execute();
                psb.close();
                ret = true;
            }
            rs.close();
            ps.close();
            con.close();
            return ret;
        } catch (SQLException ex) {
            System.err.println("Error while banning" + ex);
        }
        return false;
    }

    /**
     * Oid of players is always = the cid
     */
    @Override
    public int getObjectId() {
        return getId();
    }

    /**
     * Throws unsupported operation exception, oid of players is read only
     */
    @Override
    public void setObjectId(int id) {
        throw new UnsupportedOperationException();
    }

    public MapleStorage getStorage() {
        return storage;
    }

    public void addVisibleMapObject(MapleMapObject mo) {
        visibleMapObjects.add(mo);
    }

    public void removeVisibleMapObject(MapleMapObject mo) {
        visibleMapObjects.remove(mo);
    }

    public boolean isMapObjectVisible(MapleMapObject mo) {
        return visibleMapObjects.contains(mo);
    }

    public Collection<MapleMapObject> getVisibleMapObjects() {
        return visibleMapObjects;
    }

    public boolean isAlive() {
        return stats.getHp() > 0;
    }

    @Override
    public void sendDestroyData(final MapleClient client) {
        client.getSession().writeAndFlush(MainPacketCreator.removePlayerFromMap(this.getObjectId()));
    }

    @Override
    public void sendSpawnData(final MapleClient client) {
        if (!isHidden()) {
            client.getSession().writeAndFlush(MainPacketCreator.spawnPlayerMapobject(this));
            for (int i = 0; i < 3; ++i) {
                if (pets[i] != null) {
                    client.send(PetPacket.showPet(this, this.getPet(i), false, false, false));
                }
            }
            if (android != null) {
                client.getSession().writeAndFlush(AndroidPacket.spawnAndroid(this, android));
            }
            if (dragon != null) {
                client.getSession().writeAndFlush(MainPacketCreator.spawnDragon(dragon));
            }
            if (followid > 0 && followon) {
                client.getSession().writeAndFlush(MainPacketCreator.followEffect(followinitiator ? followid : id, followinitiator ? id : followid, null));
            }
            List<Triple<BuffStats, Integer, Boolean>> statups = new ArrayList<Triple<BuffStats, Integer, Boolean>>();
            for (Entry<BuffStats, List<BuffStatsValueHolder>> effect : effects.entrySet()) {
                for (BuffStatsValueHolder bsvh : effect.getValue()) {
                    statups.add(new Triple<BuffStats, Integer, Boolean>(effect.getKey(), bsvh.value, false));
                }
            }
            if (statups.size() > 0) {
                getMap().broadcastMessage(this, MainPacketCreator.giveForeignBuff(this, statups), false);
            }
            if (getSkillEffect() != null) {
                getMap().broadcastMessage(MainPacketCreator.skillEffect(this, getSkillEffect(), getPosition()));
            }
        }
    }

    public void setDragon(MapleDragon d) {
        this.dragon = d;
    }

    public void checkForceShield() {
        final ItemInformation li = ItemInformation.getInstance();
        Equip equip;
        boolean potential = false;
        switch (job) {

            case 110:
                equip = (Equip) li.getEquipById(1352200);
                break;
            case 111:
                equip = (Equip) li.getEquipById(1352201);
                break;
            case 112:
                equip = (Equip) li.getEquipById(1352202);
                break;

            case 120:
                equip = (Equip) li.getEquipById(1352210);
                break;
            case 121:
                equip = (Equip) li.getEquipById(1352211);
                break;
            case 122:
                equip = (Equip) li.getEquipById(1352212);
                break;

            case 130:
                equip = (Equip) li.getEquipById(1352220);
                break;
            case 131:
                equip = (Equip) li.getEquipById(1352221);
                break;
            case 132:
                equip = (Equip) li.getEquipById(1352222);
                break;

            case 210:
                equip = (Equip) li.getEquipById(1352230);
                break;
            case 211:
                equip = (Equip) li.getEquipById(1352231);
                break;
            case 212:
                equip = (Equip) li.getEquipById(1352232);
                break;

            case 220:
                equip = (Equip) li.getEquipById(1352240);
                break;
            case 221:
                equip = (Equip) li.getEquipById(1352241);
                break;
            case 222:
                equip = (Equip) li.getEquipById(1352242);
                break;

            case 230:
                equip = (Equip) li.getEquipById(1352250);
                break;
            case 231:
                equip = (Equip) li.getEquipById(1352251);
                break;
            case 232:
                equip = (Equip) li.getEquipById(1352252);
                break;

            case 310:
                equip = (Equip) li.getEquipById(1352260);
                break;
            case 311:
                equip = (Equip) li.getEquipById(1352261);
                break;
            case 312:
                equip = (Equip) li.getEquipById(1352262);
                break;

            case 320:
                equip = (Equip) li.getEquipById(1352270);
                break;
            case 321:
                equip = (Equip) li.getEquipById(1352271);
                break;
            case 322:
                equip = (Equip) li.getEquipById(1352272);
                break;

            case 410:
                equip = (Equip) li.getEquipById(1352290);
                break;
            case 411:
                equip = (Equip) li.getEquipById(1352291);
                break;
            case 412:
                equip = (Equip) li.getEquipById(1352292);
                break;

            case 420:
                equip = (Equip) li.getEquipById(1352280);
                break;
            case 421:
                equip = (Equip) li.getEquipById(1352281);
                break;
            case 422:
                equip = (Equip) li.getEquipById(1352282);
                break;

            case 510:
                equip = (Equip) li.getEquipById(1352900);
                break;
            case 511:
                equip = (Equip) li.getEquipById(1352901);
                break;
            case 512:
                equip = (Equip) li.getEquipById(1352902);
                break;

            case 520:
                equip = (Equip) li.getEquipById(1352910);
                break;
            case 521:
                equip = (Equip) li.getEquipById(1352911);
                break;
            case 522:
                equip = (Equip) li.getEquipById(1352912);
                break;

            case 530:
                equip = (Equip) li.getEquipById(1352920);
                break;
            case 531:
                equip = (Equip) li.getEquipById(1352921);
                break;
            case 532:
                equip = (Equip) li.getEquipById(1352922);
                break;

            case 1110:
            case 1210:
            case 1310:
            case 1410:
            case 1510:
                equip = (Equip) li.getEquipById(1352970);
                break;
            case 1111:
            case 1211:
            case 1311:
            case 1411:
            case 1511:
                equip = (Equip) li.getEquipById(1352971);
                break;
            case 1112:
            case 1212:
            case 1312:
            case 1412:
                equip = (Equip) li.getEquipById(1352972);
                break;

            case 2110:
                equip = (Equip) li.getEquipById(1352930);
                break;
            case 2111:
                equip = (Equip) li.getEquipById(1352931);
                break;
            case 2112:
                equip = (Equip) li.getEquipById(1352932);
                break;

            case 2210:
                equip = (Equip) li.getEquipById(1352940);
                break;
            case 2211:
                equip = (Equip) li.getEquipById(1352941);
                break;
            case 2212:
                equip = (Equip) li.getEquipById(1352942);
                break;

            case 2300:
                equip = (Equip) li.getEquipById(1352000);
                break;
            case 2310:
                equip = (Equip) li.getEquipById(1352001);
                break;
            case 2311:
                equip = (Equip) li.getEquipById(1352002);
                break;
            case 2312:
                equip = (Equip) li.getEquipById(1352003);
                break;

            case 2400:
                equip = (Equip) li.getEquipById(1352100);
                break;
            case 2410:
                equip = (Equip) li.getEquipById(1352101);
                break;
            case 2411:
                equip = (Equip) li.getEquipById(1352102);
                break;
            case 2412:
                equip = (Equip) li.getEquipById(1352103);
                break;

            case 2500:
                equip = (Equip) li.getEquipById(1353100);
                break;
            case 2510:
                equip = (Equip) li.getEquipById(1353101);
                break;
            case 2511:
                equip = (Equip) li.getEquipById(1353102);
                break;
            case 2512:
                equip = (Equip) li.getEquipById(1353103);
                break;

            case 2700:
                equip = (Equip) li.getEquipById(1352400);
                break;
            case 2710:
                equip = (Equip) li.getEquipById(1352401);
                break;
            case 2711:
                equip = (Equip) li.getEquipById(1352402);
                break;
            case 2712:
                equip = (Equip) li.getEquipById(1352403);
                break;

            case 3100:
                equip = (Equip) li.getEquipById(1099001);
                break;
            case 3110:
                equip = (Equip) li.getEquipById(1099002);
                break;
            case 3111:
                equip = (Equip) li.getEquipById(1099003);
                break;
            case 3112:
                equip = (Equip) li.getEquipById(1099004);
                break;

            case 3210:
                equip = (Equip) li.getEquipById(1352950);
                break;
            case 3211:
                equip = (Equip) li.getEquipById(1352951);
                break;
            case 3212:
                equip = (Equip) li.getEquipById(1352952);
                break;

            case 3310:
                equip = (Equip) li.getEquipById(1352960);
                break;
            case 3311:
                equip = (Equip) li.getEquipById(1352961);
                break;
            case 3312:
                equip = (Equip) li.getEquipById(1352962);
                break;

            case 3510:
                equip = (Equip) li.getEquipById(1352701);
                break;
            case 3511:
                equip = (Equip) li.getEquipById(1352702);
                break;
            case 3512:
                equip = (Equip) li.getEquipById(1352703);
                break;

            case 3600:
                equip = (Equip) li.getEquipById(1353001);
                break;
            case 3610:
                equip = (Equip) li.getEquipById(1353002);
                break;
            case 3611:
                equip = (Equip) li.getEquipById(1353003);
                break;
            case 3612:
                equip = (Equip) li.getEquipById(1353004);
                break;

            case 3700:
                equip = (Equip) li.getEquipById(1353400);
                break;
            case 3710:
                equip = (Equip) li.getEquipById(1353401);
                break;
            case 3711:
                equip = (Equip) li.getEquipById(1353402);
                break;
            case 3712:
                equip = (Equip) li.getEquipById(1353403);
                break;

            case 6500:
                equip = (Equip) li.getEquipById(1352601);
                break;
            case 6510:
                equip = (Equip) li.getEquipById(1352602);
                break;
            case 6511:
                equip = (Equip) li.getEquipById(1352603);
                break;
            case 6512:
                equip = (Equip) li.getEquipById(1352604);
                break;

            case 6100:
                equip = (Equip) li.getEquipById(1352500);
                break;
            case 6110:
                equip = (Equip) li.getEquipById(1352501);
                break;
            case 6111:
                equip = (Equip) li.getEquipById(1352502);
                break;
            case 6112:
                equip = (Equip) li.getEquipById(1352503);
                break;

            case 14200:
                equip = (Equip) li.getEquipById(1353200);
                break;
            case 14210:
                equip = (Equip) li.getEquipById(1353201);
                break;
            case 14211:
                equip = (Equip) li.getEquipById(1353202);
                break;
            case 14212:
                equip = (Equip) li.getEquipById(1353203);
                break;
            default:
                equip = null;
        }
        if (equip != null) {
            if (potential) {
                equip.renewPotential();
            }
            equip.setPosition((short) -10);
            equip.setQuantity((short) 1);
            equip.setGMLog("보조무기");
            forceReAddItem_NoUpdate(equip, MapleInventoryType.EQUIPPED);
            Message("" + getJobNameById(job) + " 직업을 달성하여 Name. " + li.getName(equip.getItemId()) + " Lv. " + li.getReqLevel(equip.getItemId()) + " 보조무기로 교체 되었습니다.");
            client.getSession().write(MainPacketCreator.updateSpecialItemUse(equip, equip.getType(), true, this));
            equipChanged();
        }
    }

    public static final String getJobNameById(final int job) {
        switch (job) {
            case 0:
                return "초보자";
            case 100:
                return "검사";
            case 110:
                return "파이터";
            case 111:
                return "크루세이더";
            case 112:
                return "히어로";
            case 120:
                return "페이지";
            case 121:
                return "나이트";
            case 122:
                return "팔라딘";
            case 130:
                return "스피어맨";
            case 131:
                return "버서커";
            case 132:
                return "다크나이트";
            case 200:
                return "마법사";
            case 210:
                return "위자드(불,독)";
            case 211:
                return "메이지(불,독)";
            case 212:
                return "아크메이지(불,독)";
            case 220:
                return "위자드(썬,콜)";
            case 221:
                return "메이지(썬,콜)";
            case 222:
                return "아크메이지(썬,콜)";
            case 230:
                return "클레릭";
            case 231:
                return "프리스트";
            case 232:
                return "비숍";
            case 300:
                return "아처";
            case 310:
                return "헌터";
            case 311:
                return "레인저";
            case 312:
                return "보우마스터";
            case 320:
                return "사수";
            case 321:
                return "저격수";
            case 322:
                return "신궁";
            case 400:
                return "로그";
            case 410:
                return "어쌔신";
            case 411:
                return "허밋";
            case 412:
                return "나이트로드";
            case 420:
                return "시프";
            case 421:
                return "시프마스터";
            case 422:
                return "섀도어";
            case 430:
                return "세미듀어러";
            case 431:
                return "듀어러";
            case 432:
                return "듀얼마스터";
            case 433:
                return "슬래셔";
            case 434:
                return "듀얼블레이더";
            case 500:
                return "해적";
            case 510:
                return "인파이터";
            case 511:
                return "버커니어";
            case 512:
                return "바이퍼";
            case 520:
                return "건슬링거";
            case 521:
                return "발키리";
            case 522:
                return "캡틴";
            case 800:
                return "매니저";
            case 900:
                return "운영자";
            case 1000:
                return "노블레스";
            case 1100:
            case 1110:
            case 1111:
            case 1112:
                return "소울마스터";
            case 1200:
            case 1210:
            case 1211:
            case 1212:
                return "플레임위자드";
            case 1300:
            case 1310:
            case 1311:
            case 1312:
                return "윈드브레이커";
            case 1400:
            case 1410:
            case 1411:
            case 1412:
                return "나이트워커";
            case 1500:
            case 1510:
            case 1511:
            case 1512:
                return "스트라이커";
            case 2000:
                return "레전드";
            case 2100:
            case 2110:
            case 2111:
            case 2112:
                return "아란";
            case 2001:
            case 2200:
            case 2210:
            case 2211:
            case 2212:
            case 2213:
            case 2214:
            case 2215:
            case 2216:
            case 2217:
            case 2218:
                return "에반";
            case 3000:
                return "시티즌";
            case 3200:
            case 3210:
            case 3211:
            case 3212:
                return "배틀메이지";
            case 3300:
            case 3310:
            case 3311:
            case 3312:
                return "와일드헌터";
            case 3500:
            case 3510:
            case 3511:
            case 3512:
                return "메카닉";
            case 501:
                return "해적(캐논슈터)";
            case 530:
                return "캐논슈터";
            case 531:
                return "캐논블래스터";
            case 532:
                return "캐논마스터";
            case 2002:
            case 2300:
            case 2310:
            case 2311:
            case 2312:
                return "메르세데스";
            case 3001:
            case 3100:
            case 3110:
            case 3111:
            case 3112:
                return "데몬슬레이어";
            case 2003:
            case 2400:
            case 2410:
            case 2411:
            case 2412:
                return "팬텀";
            case 2004:
            case 2700:
            case 2710:
            case 2711:
            case 2712:
                return "루미너스";
            case 5000:
            case 5100:
            case 5110:
            case 5111:
            case 5112:
                return "미하일";
            case 6000:
            case 6100:
            case 6110:
            case 6111:
            case 6112:
                return "카이저";
            case 6001:
            case 6500:
            case 6510:
            case 6511:
            case 6512:
                return "엔젤릭버스터";
            case 3101:
            case 3120:
            case 3121:
            case 3122:
                return "데몬어벤져";
            case 3002:
            case 3600:
            case 3610:
            case 3611:
            case 3612:
                return "제논";
            case 3700:
            case 3710:
            case 3711:
            case 3712:
                return "블래스터";
            case 10000:
                return "제로JR";
            case 10100:
                return "제로10100";
            case 10110:
                return "제로10110";
            case 10111:
                return "제로10111";
            case 10112:
                return "제로";
            case 2005:
                return "???";
            case 2500:
            case 2510:
            case 2511:
            case 2512:
                return "은월";
            case 14200:
            case 14210:
            case 14211:
            case 14212:
                return "키네시스";
            case 13000:
            case 13100:
                return "핑크빈";
            default:
                return "알수없음";
        }
    }

    public final void equipChanged() {
        map.broadcastMessage(MainPacketCreator.updateCharLook(this));
        stats.recalcLocalStats(this);
        enforceMaxHpMp();
        if (client.getPlayer().getMessenger() != null) {
            WorldCommunity.updateMessenger(client.getPlayer().getMessenger().getId(), client.getPlayer().getName(), client.getChannel());

        }
        if (GameConstants.isDemonAvenger(job)) {
            getStat().giveDemonWatk(this);
        }
    }

    public final MaplePet getPet(final long index) {
        return pets[(int) index];
    }

    public void updatePet() {
        for (int i = 0; i < 3; ++i) {
            if (pets[i] != null) {
                getClient().send(PetPacket.updatePet(this, pets[i], false, petLoot));
            }
        }
    }

    public void addPet(final MaplePet pet) {
        for (int i = 0; i < 3; ++i) {
            if (pets[i] == null) {
                pets[i] = pet;
                return;
            }
        }
    }

    public void addPetBySlotId(final MaplePet pet, int slotid) {
        if (pets[slotid] == null) {
            pets[slotid] = pet;
            //System.out.println(slotid + " : " + pets[slotid].getName());
            pets[slotid].setPos(getPosition());
        }
    }

    public void removePet(MaplePet pet, boolean shiftLeft) {
        int slot = -1;
        for (int i = 0; i < 3; i++) {
            if (pets[i] != null) {
                if (pets[i].getUniqueId() == pet.getUniqueId()) {
                    pets[i] = null;
                    slot = i;
                    break;
                }
            }
        }
        if (shiftLeft) {
            if (slot > -1) {
                for (int i = slot; i < 3; i++) {
                    if (i != 2) {
                        pets[i] = pets[i + 1];
                    } else {
                        pets[i] = null;
                    }
                }
            }
        }
    }

    public final int getPetIndex(final MaplePet pet) {
        for (int i = 0; i < 3; ++i) {
            if (pets[i] != null) {
                if (pets[i].getUniqueId() == pet.getUniqueId()) {
                    return i;
                }
            }
        }
        return -1;
    }

    public final int getPetIndex(final int petId) {
        for (int i = 0; i < 3; ++i) {
            if (pets[i] != null) {
                if (pets[i].getUniqueId() == petId) {
                    return i;
                }
            }
        }
        return -1;
    }

    public final MaplePet[] getPets() {
        return pets;
    }

    public final MaplePet[] getEqPets() {
        final MaplePet[] pets = new MaplePet[getEqPet()];
        int ret = 0;
        for (int i = 0; i < 3; i++) {
            if (this.pets[i] != null) {
                pets[ret] = this.pets[i];
                ret++;
            }
        }
        return pets;
    }

    public final int getEqPet() {
        int ret = 0;
        for (int i = 0; i < 3; i++) {
            if (pets[i] != null) {
                ret++;
            }
        }
        return ret;
    }

    public final void unequipAllPets() {
        for (final MaplePet pet : pets) {
            if (pet != null) {
                unequipPet(pet, true, false);
            }
        }
    }

    public void unequipPet(MaplePet pet, boolean shiftLeft, boolean hunger) {
        pet.saveToDb();
        client.send(PetPacket.updatePet(this, pet, true, petLoot));
        map.broadcastMessage(this, PetPacket.showPet(this, pet, true, hunger, false), true);
        if (pet != null) {
            removePet(pet, shiftLeft);
        }
    }

    public void shiftPetsRight() {
        if (pets[2] == null) {
            pets[2] = pets[1];
            pets[1] = pets[0];
            pets[0] = null;
        }
    }

    public final long getLastFameTime() {
        return lastfametime;
    }

    public final List<Integer> getFamedCharacters() {
        return lastmonthfameids;
    }

    public FameStatus canGiveFame(MapleCharacter from) {
        if (lastfametime >= System.currentTimeMillis() - 60 * 60 * 24 * 1000) {
            return FameStatus.NOT_TODAY;
        } else if (lastmonthfameids.contains(Integer.valueOf(from.getId()))) {
            return FameStatus.NOT_THIS_MONTH;
        }
        return FameStatus.OK;
    }

    public void hasGivenFame(MapleCharacter to) {
        lastfametime = System.currentTimeMillis();
        lastmonthfameids.add(Integer.valueOf(to.getId()));
        Connection con = null;
        try {
            con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO famelog (characterid, characterid_to) VALUES (?, ?)");
            ps.setInt(1, getId());
            ps.setInt(2, to.getId());
            ps.execute();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("ERROR writing famelog for char " + getName() + " to " + to.getName() + e);
        }
    }

    public final MapleKeyLayout getKeyLayout() {
        return this.keylayout;
    }

    public final void setExpeditionKilledBoss(boolean kill) {
        if (getParty() != null) {
            if (getParty().getExpedition() != null) {
                getParty().getExpedition().setBossKilled(kill);
            }
        }
    }

    public MapleParty getParty() {
        return party;
    }

    public int getPartyId() {
        return (party != null ? party.getId() : -1);
    }

    public void setParty(MapleParty party) {
        this.party = party;
    }

    public MapleUserTrade getTrade() {
        return trade;
    }

    public void setTrade(MapleUserTrade trade) {
        this.trade = trade;
    }

    public EventInstanceManager getEventInstance() {
        return eventInstance;
    }

    public void setEventInstance(EventInstanceManager eventInstance) {
        this.eventInstance = eventInstance;
    }

    public void addDoor(MapleDoor door) {
        doors.add(door);
    }

    public void clearDoors() {
        doors.clear();
    }

    public void cancelMechDoor() {
        for (final MapleMechDoor destroyDoor : getMechDoors()) {
            for (final MapleCharacter chr : getMap().getCharacters()) {
                destroyDoor.sendDestroyData(chr.getClient());
            }
            getMap().removeMapObject(destroyDoor);
        }
        clearMechDoors();
    }

    public void clearMechDoors() {
        mechdoors.clear();
    }

    public void addMechDoor(MapleMechDoor door) {
        mechdoors.add(door);
    }

    public List<MapleMechDoor> getMechDoors() {
        return new ArrayList<MapleMechDoor>(mechdoors);
    }

    public List<MapleDoor> getDoors() {
        return new ArrayList<MapleDoor>(doors);
    }

    public void setSmega() {
        if (smega) {
            smega = false;
            dropMessage(5, "You have set megaphone to disabled mode");
        } else {
            smega = true;
            dropMessage(5, "You have set megaphone to enabled mode");
        }
    }

    public boolean getSmega() {
        return smega;
    }

    public boolean canDoor() {
        return canDoor;
    }

    public void disableDoor() {
        canDoor = false;
        BuffTimer.getInstance().schedule(new Runnable() {

            @Override
            public void run() {
                canDoor = true;
            }
        }, 5000);
    }

    public Map<Integer, Pair<Integer, MapleSummon>> getSummons() {
        return summons;
    }

    public void removeSummon(int oid) {
        for (final Pair<Integer, MapleSummon> summon : summons.values()) {
            if (summon.getRight().getObjectId() == oid) {
                summons.remove(oid);
                break;
            }
        }
    }

    public int getChair() {
        return chair;
    }

    public int getItemEffect() {
        return itemEffect;
    }

    public void setChair(int chair) {
        this.chair = chair;
    }

    public String getChairText() {
        return this.chairtext;
    }

    public void setChairText(String chairtext) {
        this.chairtext = chairtext;
    }

    public void setItemEffect(int itemEffect) {
        this.itemEffect = itemEffect;
    }

    @Override
    public Collection<MapleInventory> allInventories() {
        return Arrays.asList(inventory);
    }

    @Override
    public MapleMapObjectType getType() {
        return MapleMapObjectType.PLAYER;
    }

    public int getGuildId() {
        return guildid;
    }

    public int getGuildRank() {
        return guildrank;
    }

    public void setGuildId(int _id) {
        guildid = _id;
        if (guildid > 0) {
            if (mgc == null) {
                mgc = new MapleGuildCharacter(this);
            } else {
                mgc.setGuildId(guildid);
            }
        } else {
            mgc = null;
        }
    }

    public void setGuildRank(int _rank) {
        guildrank = _rank;
        if (mgc != null) {
            mgc.setGuildRank(_rank);
        }
    }

    public MapleGuildCharacter getMGC() {
        return mgc;
    }

    public void setAllianceRank(int rank) {
        allianceRank = rank;
    }

    public int getAllianceRank() {
        return allianceRank;
    }

    public MapleGuild getGuild() {
        return ChannelServer.getGuild(getGuildId());
    }

    public void guildUpdate() {
        if (guildid <= 0) {
            return;
        }
        mgc.setLevel((short) level);
        mgc.setJobId(job);

        ChannelServer.memberLevelJobUpdate(mgc);
    }

    public boolean reborn() {
        if (level < 200) {
            return false;
        }

        this.resetStats(4, 4, 4, 4);
        this.reborns += 100 + ((level - 200) * 2);
        if (level == 250) {
            this.reborns += 8;
        }
        level = 10;
        remainingAp = reborns;
        for (ChannelServer cserv : ChannelServer.getAllInstances()) {
            cserv.broadcastPacket(MainPacketCreator.getGMText(10, "[축하] " + name + "님이 환생을 하셨습니다. (현재 환생포인트 : " + reborns + ")"));
        }
        client.send(MainPacketCreator.getPlayerInfo(this));
        map.removePlayer(this);
        map.addPlayer(this);
        return true;
    }

    public void setReborns(int reborns) {
        this.reborns = reborns;
    }

    public void saveGuildStatus() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE characters SET guildid = ?, guildrank = ? WHERE id = ?");
            ps.setInt(1, guildid);
            ps.setInt(2, guildrank);
            ps.setInt(3, id);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException se) {
            System.err.println("SQL error: " + se.getLocalizedMessage() + se);
        }
    }

    public MapleAlliance getAlliance() {
        return alliance;
    }

    public void modifyCSPoints(int type, int quantity, boolean show) {
        if (getNX() < 0) {
            nxcash = 0;
        }
        switch (type) {
            case 1:
                nxcash += quantity;
                break;
            case 2:
                maplepoints += quantity;
                send(MainPacketCreator.showMaplePoint(this));
                break;
            default:
                break;
        }
        if (show) {
            send(MainPacketCreator.sendHint("#e#r[알림]#n#k" + quantity + " 캐시를 획득했습니다.", 250, 5));
        }
    }

    public void message(int type, String msg) {
        getClient().send(MainPacketCreator.serverNotice(type, msg));
    }

    public void message(String msg) {
        getClient().send(MainPacketCreator.serverNotice(5, msg));
    }

    public void Message(int type, String msg) {
        getClient().send(MainPacketCreator.getGMText(type, msg));
    }

    public void Message(String msg) {
        getClient().send(MainPacketCreator.getGMText(8, msg));
    }

    public void dropShowInfo(String msg) {
        getClient().send(UIPacket.showInfo(msg));
    }

    public int getCSPoints(int type) {
        switch (type) {
            case 1:
                return nxcash;
            case 2:
                return maplepoints;
            default:
                return 0;
        }
    }

    public final boolean haveItem(int itemid, int quantity, boolean checkEquipped, boolean greaterOrEquals) {
        int possesed = inventory[GameConstants.getInventoryType(itemid).ordinal()].countById(itemid);
        if (checkEquipped) {
            possesed += inventory[MapleInventoryType.EQUIPPED.ordinal()].countById(itemid);
        }
        if (greaterOrEquals) {
            return possesed >= quantity;
        } else {
            return possesed == quantity;
        }
    }

    public void setLevel(int level) {
        this.level = (short) level;
    }

    public final MapleQuestStatus getQuestNoAdd(final MapleQuest quest) {
        return quests.get(quest);
    }

    public boolean canSummon(int g) {
        if (lastSummonTime + g < System.currentTimeMillis()) {
            lastSummonTime = System.currentTimeMillis();
            return true;
        }
        return false;
    }

    public int getCTS_MorphGage() {
        return CTS_MorphGage;
    }

    public void setCTS_MorphGage(int gage) {
        CTS_MorphGage = gage;
    }

    public final int getLevel_fromsql(int id) {
        int level = 0;
        try {
            ResultSet rs = MYSQL.getConnection().prepareStatement(new StringBuilder().append("SELECT * FROM characters WHERE id = ").append(id).toString()).executeQuery();
            if (rs.next()) {
                level = rs.getInt("level");
            }
            rs.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return level;
    }

    public final int getJob_fromsql(int id) {
        int level = 0;
        try {
            ResultSet rs = MYSQL.getConnection().prepareStatement(new StringBuilder().append("SELECT * FROM characters WHERE id = ").append(id).toString()).executeQuery();
            if (rs.next()) {
                level = rs.getInt("job");
            }
            rs.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return level;
    }

    public final int getAccId_fromsql() {
        int accid = 0;
        try {
            ResultSet rs = MYSQL.getConnection().prepareStatement(new StringBuilder().append("SELECT * FROM characters WHERE id = ").append(getId()).toString()).executeQuery();
            if (rs.next()) {
                accid = rs.getInt("accountid");
            }
            rs.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return accid;
    }

    public final void writeCharacterCardPacket(WritingPacket packet) {
        int i = 0;
        try {
            PreparedStatement ps = MYSQL.getConnection().prepareStatement(new StringBuilder().append("SELECT * FROM character_cards WHERE accid = ").append(getAccId_fromsql()).toString());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                packet.writeInt(rs.getInt("characterid"));
                packet.write(getLevel_fromsql(rs.getInt("characterid")));
                packet.writeInt(getJob_fromsql(rs.getInt("characterid")));
                i++;
            }
            rs.close();
            ps.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        for (int a = i; a < 9; a++) {
            packet.writeInt(0);
            packet.write(0);
            packet.writeInt(0);
        }
    }

    public static int getPartTimeJob(int cid) {
        Connection con = null;
        int job = 0;
        try {
            con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM parttime WHERE cid = ?");
            ps.setInt(1, cid);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                job = rs.getByte("job");
            }
            rs.close();
            ps.close();
            con.close();
        } catch (Exception ex) {
            System.out.println("Failed to retrieve part time job: " + ex);
        }
        return job;
    }

    public static Triple<Byte, Long, Integer> getPartTime(int cid) {
        byte job = 0;
        long time = 0;
        int reward = 0;
        Connection con = null;
        try {
            con = MYSQL.getConnection();
            try (PreparedStatement ps = con.prepareStatement("SELECT * FROM parttime WHERE cid = ?")) {
                ps.setInt(1, cid);
                try (ResultSet rs = ps.executeQuery()) {
                    if (rs.next()) {
                        job = rs.getByte("job");
                        time = rs.getLong("starttime");
                        reward = rs.getInt("reward");
                    }
                    rs.close();
                }
                ps.close();
            }
        } catch (Exception ex) {
            System.out.println("Failed to retrieve part time job: " + ex);
        }
        return new Triple<Byte, Long, Integer>(job, time, reward);
    }

    public void BuyPET(int Petitem) {
        int uniqueid = Petitem;
        Item itemr = new Item(Petitem, (short) 1, (short) 1, (short) 0);
        itemr.setExpiration(2475606994921L);
        final MaplePet pet = MaplePet.createPet(Petitem, itemr.getExpiration());
        itemr.setPet(pet);
        itemr.setUniqueId(pet.getUniqueId());
        InventoryManipulator.addbyItem(client, itemr);
        InventoryManipulator.addFromDrop(getClient(), itemr, false);
    }

    private int MortalBlowCount;

    public int getMortalBlowCount() {
        return MortalBlowCount;
    }

    public void setMortalBlowCount(int count) {
        this.MortalBlowCount = count;
    }

    public void addMortalBlowCount(int count) {
        this.MortalBlowCount += count;
    }

    private List<Integer> cashwishlist = new ArrayList<Integer>();

    public List<Integer> getCashWishList() {
        return cashwishlist;
    }

    public void addCashWishList(int id) {
        cashwishlist.add(id);
    }

    public void removeCashWishList(int id) {
        cashwishlist.remove(id);
    }

    public enum FameStatus {
        OK, NOT_TODAY, NOT_THIS_MONTH
    }

    public int getBuddyCapacity() {
        return buddylist.getCapacity();
    }

    public void setBuddyCapacity(int capacity) {
        buddylist.setCapacity(capacity);
        client.getSession().writeAndFlush(MainPacketCreator.updateBuddyCapacity(capacity));
    }

    public MapleMultiChat getMessenger() {
        return messenger;
    }

    public void setMessenger(MapleMultiChat messenger) {
        this.messenger = messenger;
    }

    public int getMessengerPosition() {
        return messengerposition;
    }

    public void setMessengerPosition(int position) {
        this.messengerposition = position;
    }

    public boolean getNXCodeValid(String code, boolean validcode) throws SQLException {
        Connection con = MYSQL.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT `valid` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            validcode = rs.getInt("valid") == 0 ? false : true;
        }
        rs.close();
        ps.close();
        con.close();
        return validcode;
    }

    public int getNXCodeType(String code) throws SQLException {
        int type = -1;
        Connection con = MYSQL.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT `type` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            type = rs.getInt("type");
        }
        rs.close();
        ps.close();
        con.close();
        return type;
    }

    public int getNXCodeItem(String code) throws SQLException {
        int item = -1;
        Connection con = MYSQL.getConnection();
        PreparedStatement ps = con.prepareStatement("SELECT `item` FROM nxcode WHERE code = ?");
        ps.setString(1, code);
        ResultSet rs = ps.executeQuery();
        while (rs.next()) {
            item = rs.getInt("item");
        }
        rs.close();
        ps.close();
        con.close();
        return item;
    }

    public void setNXCodeUsed(String code) throws SQLException {
        Connection con = MYSQL.getConnection();
        PreparedStatement ps = con.prepareStatement("UPDATE nxcode SET `valid` = 0 WHERE code = ?");
        ps.setString(1, code);
        ps.execute();

        ps = con.prepareStatement("UPDATE nxcode SET `user` = ? WHERE code = ?");
        ps.setString(1, getName());
        ps.setString(2, code);
        ps.execute();
        ps.close();
        con.close();
    }

    public void addCooldown(int skillId, long startTime, long length) {
        coolDowns.put(Integer.valueOf(skillId), new CoolDownValueHolder(skillId, startTime, length));
        getClient().getSession().writeAndFlush(MainPacketCreator.skillCooldown(skillId, (int) length / 1000, getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, getBuffedValue(BuffStats.CTS_FixCoolTime) != null, isGM()));
    }

    public void removeCooldown(int skillId) {
        if (coolDowns.containsKey(Integer.valueOf(skillId))) {
            coolDowns.remove(Integer.valueOf(skillId));
        }
    }

    public void changeCooldown(int skillid, long changetime) {
        if (skillisCooling(skillid)) {
            for (MapleCoolDownValueHolder mcdvh : getAllCooldowns()) {
                if (mcdvh.skillId == skillid) {
                    long startTime = mcdvh.startTime;
                    long length = mcdvh.length;
                    removeCooldown(skillid);
                    addCooldown(skillid, startTime, length + changetime);
                    getClient().getSession().writeAndFlush(MainPacketCreator.skillCooldown(skillid, (int) (length + changetime) / 1000, getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, getBuffedValue(BuffStats.CTS_FixCoolTime) != null, isGM()));
                    break;
                }
            }
        }
    }

    public void cancelCooldown(int skillid) {
        removeCooldown(skillid);
        getClient().getSession().writeAndFlush(MainPacketCreator.skillCooldown(skillid, 0, getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, getBuffedValue(BuffStats.CTS_FixCoolTime) != null, isGM()));
    }

    public boolean skillisCooling(int skillId) {
        return coolDowns.containsKey(Integer.valueOf(skillId));
    }

    public void giveCoolDowns(final int skillid, long starttime, long length) {
        addCooldown(skillid, System.currentTimeMillis(), length * 1000);
    }

    public void giveCoolDowns(final List<MapleCoolDownValueHolder> cooldowns) {
        int time;
        if (cooldowns != null) {
            for (MapleCoolDownValueHolder cooldown : cooldowns) {
                time = (int) ((cooldown.length + cooldown.startTime) - System.currentTimeMillis());
                addCooldown(cooldown.skillId, System.currentTimeMillis(), time);
            }
        }
    }

    public long getCooldownLimit(int skillid) {
        for (MapleCoolDownValueHolder mcdvh : getAllCooldowns()) {
            if (mcdvh.skillId == skillid) {
                return System.currentTimeMillis() - mcdvh.startTime;
            }
        }
        return 0L;
    }

    public List<MapleCoolDownValueHolder> getAllCooldowns() {
        List<MapleCoolDownValueHolder> ret = new ArrayList<MapleCoolDownValueHolder>();
        for (CoolDownValueHolder mcdvh : coolDowns.values()) {
            ret.add(new MapleCoolDownValueHolder(mcdvh.skillId, mcdvh.startTime, mcdvh.length));
        }
        return ret;
    }

    public final List<MapleDiseaseValueHolder> getAllDiseases() {
        final List<MapleDiseaseValueHolder> ret = new ArrayList<MapleDiseaseValueHolder>(5);

        DiseaseValueHolder vh;
        for (Entry<DiseaseStats, DiseaseValueHolder> disease : diseases.entrySet()) {
            vh = disease.getValue();
            ret.add(new MapleDiseaseValueHolder(disease.getKey(), vh.startTime, vh.length));
        }
        return ret;
    }

    public final boolean hasDisease(final DiseaseStats dis) {
        for (final DiseaseStats disease : diseases.keySet()) {
            if (disease == dis) {
                return true;
            }
        }
        return false;
    }

    public void elementalAdep_fp() {
        elementalAdep--;
        client.getSession().writeAndFlush(UIPacket.showWZEffect("Skill/211.img/skill/2111011/special", 1));
        getMap().broadcastMessage(this, UIPacket.broadcastWZEffect(id, "Skill/211.img/skill/2111011/special", 1), false);
        client.getSession().writeAndFlush(UIPacket.showWZEffect("Skill/211.img/skill/2111011/special0", 1));
        getMap().broadcastMessage(this, UIPacket.broadcastWZEffect(id, "Skill/211.img/skill/2111011/special0", 1), false);
        client.getSession().writeAndFlush(UIPacket.showWZEffect("Skill/211.img/skill/2111011/count/" + elementalAdep, 1));
        getMap().broadcastMessage(this, UIPacket.broadcastWZEffect(id, "Skill/211.img/skill/2111011/count/" + elementalAdep, 1), false);
        getBuffedSkillEffect(BuffStats.CTS_StackBuff, 2111011).applyTo(this, getPosition());
        if (elementalAdep == 0) {
            elementalAdep = -1;
            cancelEffectFromBuffStat(BuffStats.CTS_StackBuff, 2111011);
        }
    }

    public void SpiritGuard() {
        SpiritGuard--;
        getBuffedSkillEffect(BuffStats.CTS_SpiritGuard, 25121209).applyTo(this);
        if (SpiritGuard == 0) {
            cancelEffectFromBuffStat(BuffStats.CTS_SpiritGuard, 25121209);
        }
    }

    public void giveDeBuffTest(final DiseaseStats disease, TestMobSkill skill) {
        if (!hasDisease(disease) && diseases.size() < 2) {
            if (isActiveBuffedValue(2111011)) {
                elementalAdep_fp();
                return;
            }
            if (isActiveBuffedValue(25121209)) {
                SpiritGuard();
                return;
            }
            if (!(disease == DiseaseStats.SEDUCE || disease == DiseaseStats.STUN)) {
                if (isActiveBuffedValue(2321005)) {
                    return;
                }
            }
            BuffTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    dispelDebuff(disease);
                }
            }, skill.getDuration());
            diseases.put(disease, new DiseaseValueHolder(System.currentTimeMillis(), skill.getDuration()));
            client.getSession().writeAndFlush(MainPacketCreator.giveDebuff(disease, skill.getX(), skill));
            map.broadcastMessage(this, MainPacketCreator.giveForeignDebuff(id, disease, skill), false);
        }
    }

    public void giveDebuff(final DiseaseStats disease, MobSkill skill) {

        if (!hasDisease(disease) && diseases.size() < 2) {
            if (isActiveBuffedValue(2111011)) {
                elementalAdep_fp();
                return;
            }
            if (isActiveBuffedValue(25121209)) {
                SpiritGuard();
                return;
            }
            if (!(disease == DiseaseStats.SEDUCE || disease == DiseaseStats.STUN)) {
                if (isActiveBuffedValue(2321005)) {
                    return;
                }
            }
            BuffTimer.getInstance().schedule(new Runnable() {

                @Override
                public void run() {
                    dispelDebuff(disease);
                }
            }, skill.getDuration());
            diseases.put(disease, new DiseaseValueHolder(System.currentTimeMillis(), skill.getDuration()));
            client.getSession().writeAndFlush(MainPacketCreator.giveDebuff(disease, skill.getX(), skill));
            map.broadcastMessage(this, MainPacketCreator.giveForeignDebuff(id, disease, skill), false);
        }
    }

    public final void giveSilentDebuff(final List<MapleDiseaseValueHolder> ld) {
        if (ld != null) {
            for (final MapleDiseaseValueHolder disease : ld) {

                BuffTimer.getInstance().schedule(new Runnable() {

                    @Override
                    public void run() {
                        dispelDebuff(disease.disease);
                    }
                }, (disease.length + disease.startTime) - System.currentTimeMillis());

                diseases.put(disease.disease, new DiseaseValueHolder(disease.startTime, disease.length));
            }
        }
    }

    public void dispelDebuff(DiseaseStats debuff) {
        if (hasDisease(debuff)) {
            client.getSession().writeAndFlush(MainPacketCreator.cancelDebuff(debuff));
            map.broadcastMessage(this, MainPacketCreator.cancelForeignDebuff(id, debuff), false);
            diseases.remove(debuff);
        }
    }

    public void dispelDebuffs() {
        dispelDebuff(DiseaseStats.CURSE);
        dispelDebuff(DiseaseStats.DARKNESS);
        dispelDebuff(DiseaseStats.POISON);
        dispelDebuff(DiseaseStats.SEAL);
        dispelDebuff(DiseaseStats.WEAKEN);
    }

    public void cancelAllDebuffs() {
        diseases.clear();
    }

    public void setLevel(final short level) {
        this.level = (short) (level - 1);
    }

    public void sendNote(String to, String msg) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO notes (`to`, `from`, `message`, `timestamp`) VALUES (?, ?, ?, ?)");
            ps.setString(1, to);
            ps.setString(2, getName());
            ps.setString(3, msg);
            ps.setLong(4, System.currentTimeMillis());
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Unable to send note" + e);
        }
    }

    public void showNote() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM notes WHERE `to`= ?");
            ps.setString(1, getName());
            ResultSet rs = ps.executeQuery();
            int count = getNoteSize();
            client.getSession().writeAndFlush(MainPacketCreator.showNotes(rs, count));
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Unable to show note" + e);
        }
    }

    public int getNoteSize() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM notes WHERE `to`= ?");
            ps.setString(1, getName());
            ResultSet rs = ps.executeQuery();
            int ret = 0;
            while (rs.next()) {
                ret++;
            }
            rs.close();
            ps.close();
            con.close();
            return ret;
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return 0;
    }

    public void deleteNote(int id) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM notes WHERE `id`=?");
            ps.setInt(1, id);
            ps.execute();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Unable to delete note" + e);
        }
    }

    public void deleteNote() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM notes WHERE `to`= ?");
            ps.setString(1, getName());
            ps.execute();
            ps.close();
            con.close();
        } catch (SQLException e) {
            System.err.println("Unable to delete note" + e);
        }
    }

    public void cancelRapidTime(byte type) {
        if (type == 1) {
            this.rapidtimer1 = tools.Timer.MapTimer.getInstance().schedule(new Runnable() {
                public void run() {
                    client.getPlayer().changeSkillLevel(100000277, (byte) 0, (byte) 0);
                }
            }, 20000L);
        } else if (type == 2) {
            this.rapidtimer2 = tools.Timer.MapTimer.getInstance().schedule(new Runnable() {
                public void run() {
                    client.getPlayer().changeSkillLevel(100000277, (byte) 0, (byte) 0);
                }
            }, 20000L);
        }
    }

    public final short getCombo() {
        return combo;
    }

    public void setCombo(final short combo) {
        this.combo = combo;
    }

    public void updateCombo(short combo, long curr) { // 치우씨 :: applyComboBuff 로 따로 처리해서 combo 50 오류 안생기게
        if (combo > 30000) {
            combo = 30000;
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.AranCombo(combo));
        setLastCombo(curr);
        setCombo(combo);
        switch (combo) { // Hackish method xD
            case 50:
            case 100:
            case 150:
            case 200:
            case 250:
            case 300:
            case 350:
            case 400:
            case 450:
            case 500:
                SkillFactory.getSkill(21000000).getEffect(getSkillLevel(21000000)).applyComboBuff(this, combo);
                break;
            default:
                if (combo % 1000 == 0) {
                    SkillFactory.getSkill(21110016).getEffect(getSkillLevel(21110016)).applyComboBuff(this, combo);
                }
                break;
        }
    }

    public void useComboSkill(int skill) {
        if (getBuffedValue(BuffStats.CTS_ComboUnlimited) == null && getSkillLevel(skill) > 0) {
            SkillStatEffect effect = SkillFactory.getSkill(skill).getEffect(getSkillLevel(skill));
            if (effect != null && effect.getComboCon() > 0) {
                updateCombo((short) (getCombo() - effect.getComboCon()), System.currentTimeMillis());
            }
        }
    }

    public final long getLastCombo() {
        return lastCombo;
    }

    public void setLastCombo(final long combo) {
        this.lastCombo = combo;
    }

    public final long getKeyDownSkill_Time() {
        return keydown_skill;
    }

    public void setKeyDownSkill_Time(final long keydown_skill) {
        this.keydown_skill = keydown_skill;
    }

    public void setChalkboard(String text) {
        this.chalktext = text;
        map.broadcastMessage(CashPacket.useChalkboard(getId(), text));
    }

    public String getChalkboard() {
        return chalktext;
    }

    public MapleMount getMount() {
        return mount;
    }

    public void setWishList(int[] wishlist) {
        this.wishlist = wishlist;
    }

    public int[] getWishlist() {
        return wishlist;
    }

    public void clearWishlist() {
        for (int i = 0; i < 12; i++) {
            wishlist[i] = 0;
        }
    }

    public int getWishlistSize() {
        int ret = 0;
        for (int i = 0; i < 12; i++) {
            if (wishlist[i] > 0) {
                ret++;
            }
        }
        return ret;
    }

    public List<LifeMovementFragment> getLastRes() {
        return lastres;
    }

    public void setLastRes(List<LifeMovementFragment> lastres) {
        this.lastres = lastres;
    }

    public void dropMessage(int type, String message) {
        client.getSession().writeAndFlush(MainPacketCreator.serverNotice(type, message));
    }

    public IMapleCharacterShop getPlayerShop() {
        return playerShop;
    }

    public void setPlayerShop(IMapleCharacterShop playerShop) {
        this.playerShop = playerShop;
    }

    public int getConversation() {
        return inst.get();
    }

    public void setConversation(int inst) {
        this.inst.set(inst);
    }

    public int getSubcategory() {
        if (job >= 430 && job <= 434) {
            return 1; //dont set it
        } else if (job == 501 || (job >= 530 && job <= 532)) {
            return 2;
        }
        if (getKeyValue("dualBlade") == null) {
            return 0;
        }
        if (getKeyValue("dualBlade").equals("1")) {
            return 1;
        }
        return 0;
    }

    public void setSubcategory(int a) {
        subcategory = a;
    }

    public final void clearLinkMids() {
        linkMobIds.clear();
        if (getBuffedValue(BuffStats.CTS_ArcaneAim) != null) {
            this.cancelEffectFromBuffStat(BuffStats.CTS_ArcaneAim, -1);
        }
    }

    public int getLinkMid(int mob) {
        if (!linkMobIds.containsKey(mob)) {
            return -1;
        }
        return linkMobIds.get(mob);
    }

    public void setLinkMid(int mob, int lm) {
        this.linkMobIds.put(mob, lm);
    }

    public Map<Integer, Integer> getAllLinkMid() {
        return linkMobIds;
    }

    public final void clearDamageMeters() {
        damageMeter.clear();
    }

    public int getDamageMeter(int mob) {
        if (!damageMeter.containsKey(mob)) {
            return -1;
        }
        return damageMeter.get(mob);
    }

    public void setDamageMeter(int mob, int dmg) {
        this.damageMeter.put(mob, dmg);
    }

    public Map<Integer, Integer> getAllDamageMeter() {
        return damageMeter;
    }

    public MapleCashInventory getCashInventory() {
        return cashInv;
    }

    public MapleQuickSlot getQuickSlot() {
        return quickslot;
    }

    public Map<String, String> getCustomValues() {
        return CustomValues;
    }

    public Map<String, Integer> getCustomValues2() {
        return CustomValues2;
    }

    public String getKeyValue(String key) {
        if (CustomValues.containsKey(key)) {
            return CustomValues.get(key);
        }
        return null;
    }

    public void setKeyValue(String key, String values) {
        if (CustomValues.containsKey(key)) {
            CustomValues.remove(key);
        }
        CustomValues.put(key, values);
        keyvalue_changed = true;
    }

    public void deleteKeyValue(String key) {
        if (CustomValues.containsKey(key)) {
            CustomValues.remove(key);
        }
        keyvalue_changed = true;
    }

    public int getKeyValue2(String key) {
        if (CustomValues2.containsKey(key)) {
            return CustomValues2.get(key).intValue();
        }
        if (key.contains("hyper")) {
            return 0;
        }
        return -1;
    }

    public void setKeyValue2(String key, int values) {
        if (CustomValues2.containsKey(key)) {
            CustomValues2.remove(key);
        }
        CustomValues2.put(key, values);
        keyvalue_changed = true;
    }

    public boolean isEquippedSoulWeapon() {
        IEquip weapon = (IEquip) getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);
        if (weapon == null) {
            return false;
        }
        return weapon.getSoulEnchanter() != 0;
    }

    public boolean isSoulWeapon(IEquip equip) {
        if (equip == null) {
            return false;
        }
        return equip.getSoulEnchanter() != 0;
    }

    public void equipSoulWeapon(Equip equip) {
        changeSkillLevel(getEquippedSoulSkill(), (byte) -1, (byte) 0);
        changeSkillLevel(equip.getSoulSkill(), (byte) 1, (byte) 1);
        setSoulCount(0);

        getClient().getSession().writeAndFlush(SoulWeaponPacket.giveSoulGauge(getSoulCount(), equip.getSoulSkill()));
    }

    public void unequipSoulWeapon(Equip equip) {
        changeSkillLevel(equip.getSoulSkill(), (byte) -1, (byte) 0);
        setSoulCount(0);
        getClient().getSession().writeAndFlush(SoulWeaponPacket.cancelSoulGauge());
        SkillStatEffect eff = getBuffedSkillEffect(BuffStats.CTS_FullSoulMP, -1);
        if (eff != null) {
            cancelEffect(eff, false, getBuffedStarttime(BuffStats.CTS_FullSoulMP, eff.getSourceId()));
        }
    }

    public void checkSoulState(boolean useskill, int skillid) {
        //   int skillid = getEquippedSoulSkill();
        SkillStatEffect skill = SkillFactory.getSkill(skillid).getEffect(getSkillLevel(skillid));
        long cooldown = getCooldownLimit(skillid);
        if (useskill) {
            if (getSoulCount() >= skill.getSoulMPCon()) {
                getClient().getSession().write(SoulWeaponPacket.giveSoulEffect(0));
                getMap().broadcastMessage(SoulWeaponPacket.cancelForeignSoulEffect(getId()));
                getClient().getSession().write(MainPacketCreator.getInventoryFull());
            }
        } else {
            if ((getSoulCount() >= skill.getSoulMPCon()) && (cooldown <= 0)) {
                getClient().getSession().write(SoulWeaponPacket.giveSoulEffect(skillid));
                getMap().broadcastMessage(this, SoulWeaponPacket.giveForeignSoulEffect(getId(), skillid), false);
            }
        }
    }

    public int getKarta() {
        return karta;
    }

    public void setKarta(int karta) {
        this.karta = karta;
    }

    public int getSoulCount() {
        return this.Soul;
    }

    public void setSoulCount(int soulcount) {
        this.Soul = (soulcount > 1000 ? 1000 : soulcount);
    }

    public void addSoulCount() {
        if (this.Soul < 1000) {
            this.Soul = (short) (this.Soul + 1);
        }
    }

    public int addgetSoulCount() {
        addSoulCount();
        return getSoulCount();
    }

    public int getEquippedSoulSkill() {
        IEquip weapon = (IEquip) getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11);

        return weapon.getSoulSkill();
    }

    public int getSoulSkillMpCon() {
        int skillid = getEquippedSoulSkill();
        SkillStatEffect skill = SkillFactory.getSkill(skillid).getEffect(getSkillLevel(skillid));

        return skill.getSoulMPCon();
    }

    public void saveKeyValues() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM keyvalue WHERE cid = ?");
            ps.setInt(1, id);
            ps.executeUpdate();
            for (Entry<String, String> keyset : CustomValues.entrySet()) {
                StringBuilder sb = new StringBuilder("INSERT INTO `keyvalue` VALUES ('");
                sb.append(id);
                sb.append("', '");
                sb.append(keyset.getKey());
                sb.append("', '");
                sb.append(keyset.getValue() == null ? "null" : keyset.getValue());
                sb.append("')");
                ps = con.prepareStatement(sb.toString());
                ps.executeUpdate();
            }
            ps.close();

            ps = con.prepareStatement("DELETE FROM keyvalue2 WHERE cid = ?");
            ps.setInt(1, id);
            ps.executeUpdate();
            for (Entry<String, Integer> keyset : CustomValues2.entrySet()) {
                StringBuilder sb = new StringBuilder("INSERT INTO `keyvalue2` VALUES ('");
                sb.append(id);
                sb.append("', '");
                sb.append(keyset.getKey());
                sb.append("', '");
                sb.append(keyset.getValue());
                sb.append("')");
                ps = con.prepareStatement(sb.toString());
                ps.executeUpdate();
            }
            ps.close();
            con.close();
        } catch (Exception e) {
            System.err.println("[오류] 커스텀 값들을 저장하는데 실패했습니다.");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void loadKeyValues() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM keyvalue WHERE cid = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                CustomValues.put(rs.getString("key"), rs.getString("value").equals("null") ? null : rs.getString("value"));
            }
            ps.close();

            ps = con.prepareStatement("SELECT * FROM keyvalue2 WHERE cid = ?");
            ps.setInt(1, id);
            rs = ps.executeQuery();
            while (rs.next()) {
                CustomValues2.put(rs.getString("key"), rs.getInt("value"));
            }
            ps.close();
            rs.close();
            con.close();
        } catch (Exception e) {
            System.err.println("[오류] 커스텀 값들을 불러오는데 실패했습니다.");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void saveSteelSkills() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM steelskills WHERE cid = ?");
            ps.setInt(1, id);
            ps.executeUpdate();
            for (int i = 1; i <= 5; ++i) {
                for (SteelSkillEntry sse : steelskills.getSkillEntrys(i)) {
                    ps = con.prepareStatement("INSERT INTO steelskills VALUES (?, ?, ?, ?, ?, ?)");
                    ps.setInt(1, id);
                    ps.setInt(2, sse.getSkillId());
                    ps.setInt(3, sse.getSkillLevel());
                    ps.setInt(4, sse.getJobIndex(sse.getSkillId()));
                    ps.setInt(5, sse.getSlot());
                    ps.setInt(6, sse.isEquipped() ? 1 : 0);
                    ps.executeUpdate();
                }
            }
            ps.close();
            con.close();
        } catch (Exception e) {
            System.err.println("[오류] 스틸 스킬 정보를 저장하는데 실패했습니다.");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public void loadSteelSkills() {
        steelskills = new PhantomSteelSkill();
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM steelskills WHERE cid = ?");
            ps.setInt(1, id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                SteelSkillEntry sse = new SteelSkillEntry(rs.getInt("skillid"), rs.getInt("skilllevel"));
                sse.setSlot(rs.getInt("slot"));
                if (rs.getInt("equipped") == 1) {
                    sse.setEquipped(true);
                }
                steelskills.addSkill(SteelSkillEntry.getJobIndex(rs.getInt("skillid")), sse);
                int[] baseskills = {24001001, 24101001, 24111001, 24121001, 24121054};
                for (int i : baseskills) {
                    if (getSkillLevel(i) >= rs.getInt("skilllevel") && getSkillLevel(rs.getInt("skillid")) < rs.getInt("skilllevel")) {
                        changeSkillLevel(SkillFactory.getSkill(rs.getInt("skillid")), (byte) rs.getInt("skilllevel"), (byte) rs.getInt("skilllevel"));
                    }
                }
            }
            ps.close();
            rs.close();
            con.close();
        } catch (Exception e) {
            System.err.println("[오류] 스틸 스킬 정보들을 불러오는데 실패했습니다.");
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public PhantomSteelSkill getSteelSkills() {
        return steelskills;
    }

    public int getEquippedSkillId(int index) {
        int count = 0;
        switch (index) {
            case 1:
            case 2:
                count = 4;
                break;
            case 3:
                count = 3;
                break;
            case 4:
            case 5:
                count = 2;
                break;
        }
        for (int i = 0; i < count; ++i) {
            SteelSkillEntry sse = getSteelSkills().getSkillEntrys(index).get(i);
            if (sse.isEquipped()) {
                return sse.getSkillId();
            }
        }
        return 1;
    }

    public void send(Object ob) {
        getClient().getSession().writeAndFlush((byte[]) ob);
    }

    public void ea() {
        send(MainPacketCreator.resetActions());
    }

    public void forceReAddItem_NoUpdate(IItem item, MapleInventoryType type) {
        getInventory(type).removeSlot(item.getPosition());
        getInventory(type).addFromDB(item);
    }

    public void forceReAddItem(IItem item, MapleInventoryType type) { //used for stuff like durability, item exp/level, probably owner?
        forceReAddItem_NoUpdate(item, type);
        if (type != MapleInventoryType.UNDEFINED) {
            client.getSession().writeAndFlush(MainPacketCreator.updateSpecialItemUse(item, type == MapleInventoryType.EQUIPPED ? (byte) 1 : type.getType()));
        }
    }

    public List<IItem> getRebuyList() {
        if (rebuyList == null) {
            rebuyList = new ArrayList<IItem>();
        }
        return rebuyList;
    }

    public void setQuickMoved(boolean t) {
        quickmoved = t;
    }

    public final boolean getQuickMoved() {
        return quickmoved;
    }

    public final void setGM(int d) {
        setGMLevel((byte) d);
    }

    public void setHeadTitle(int title) {
        this.headtitle = title;
    }

    public int getHeadTitle() {
        return headtitle;
    }

    private int Dungeon;
    private int freeDungeon;
    private int DungeonMileage;

    public void InsterDungeon() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO dungeon (cid, dungeon, freedungeon, dungeonmileage) VALUES (?, ?, ?, ?)");
            ps.setInt(1, id);
            ps.setInt(2, 7);
            ps.setInt(3, 2);
            ps.setInt(4, 0);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public void saveDungeon(int dungeon, int freedungeon, int dungeonmileage) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("UPDATE dungeon SET dungeon = ?, freedungeon = ?, dungeonmileage = ? WHERE cid = " + id);
            ps.setInt(1, dungeon);
            ps.setInt(2, freedungeon);
            ps.setInt(3, dungeonmileage);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public void loadDungeon() {
        Connection con = null;
        PreparedStatement ps = null;
        ResultSet rs = null;
        try {
            con = MYSQL.getConnection();
            ps = con.prepareStatement("SELECT * FROM dungeon WHERE cid = " + id);
            rs = ps.executeQuery();
            if (rs.next()) {
                Dungeon = rs.getInt("dungeon");
                freeDungeon = rs.getInt("freedungeon");
                DungeonMileage = rs.getInt("dungeonmileage");
            } else {
                InsterDungeon();
            }
            ps.close();
            rs.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        } finally {
            try {
                if (con != null) {
                    con.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (rs != null) {
                    rs.close();
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        }
    }

    public int getDungeon() {
        return Dungeon;
    }

    public void setDungeon(int number) {
        this.Dungeon = number;
    }

    public void addDungeon(int Dungeon) {
        this.Dungeon += Dungeon;
    }

    public int getFreeDungeon() {
        return freeDungeon;
    }

    public void setFreeDungeon(int freedungeon) {
        this.freeDungeon = freedungeon;
    }

    public void addFreeDungeon(int freedungeon) {
        this.freeDungeon += freedungeon;
    }

    public int getDungeonMileage() {
        return DungeonMileage;
    }

    public void setDungeonMaileage(int mileage) {
        this.DungeonMileage = mileage;
    }

    public void addDungeonMileage(int mileage) {
        this.DungeonMileage += mileage;
    }

    public Triple<List<MapleRing>, List<MapleRing>, List<MapleRing>> getRings(boolean equip) {
        MapleInventory iv = getInventory(MapleInventoryType.EQUIPPED);
        List<Item> equipped = iv.newList();
        Collections.sort(equipped);
        List<MapleRing> crings = new ArrayList<>(), frings = new ArrayList<>(), mrings = new ArrayList<>();
        MapleRing ring;
        for (IItem ite : equipped) {
            Equip item = (Equip) ite;
            if (item.getRing() != null) {
                ring = item.getRing();
                ring.setEquipped(true);
                if (GameConstants.isEffectRing(item.getItemId())) {
                    if (equip) {
                        if (GameConstants.isCrushRing(item.getItemId())) {
                            crings.add(ring);
                        } else if (GameConstants.isFriendshipRing(item.getItemId())) {
                            frings.add(ring);
                        } else if (GameConstants.isMarriageRing(item.getItemId())) {
                            mrings.add(ring);
                        }
                    } else if (crings.isEmpty() && GameConstants.isCrushRing(item.getItemId())) {
                        crings.add(ring);
                    } else if (frings.isEmpty() && GameConstants.isFriendshipRing(item.getItemId())) {
                        frings.add(ring);
                    } else if (mrings.isEmpty() && GameConstants.isMarriageRing(item.getItemId())) {
                        mrings.add(ring);
                    }
                }
            }
        }
        if (equip) {
            iv = getInventory(MapleInventoryType.EQUIP);
            for (IItem ite : iv.list()) {
                Equip item = (Equip) ite;
                if (item.getRing() != null && GameConstants.isCrushRing(item.getItemId())) {
                    ring = item.getRing();
                    ring.setEquipped(false);
                    if (GameConstants.isFriendshipRing(item.getItemId())) {
                        frings.add(ring);
                    } else if (GameConstants.isCrushRing(item.getItemId())) {
                        crings.add(ring);
                    } else if (GameConstants.isMarriageRing(item.getItemId())) {
                        mrings.add(ring);
                    }
                }
            }
        }
        Collections.sort(frings, new MapleRing.RingComparator());
        Collections.sort(crings, new MapleRing.RingComparator());
        Collections.sort(mrings, new MapleRing.RingComparator());
        return new Triple<>(crings, frings, mrings);
    }

    public void addTrockMap(int type, int map) {
        if (!rocks.containsKey(type)) {
            rocks.put(type, new ArrayList<Integer>());
        }
        rocks.get(type).add(map);
    }

    public List<Integer> getTrockMaps(int type) {
        if (!rocks.containsKey(type)) {
            rocks.put(type, new ArrayList<Integer>());
        }
        return rocks.get(type);
    }

    public Map<Integer, List<Integer>> getTrockMaps() {
        return rocks;
    }

    public void deleteFromTrockMaps(int type, int mapid) {
        List<Integer> maps = rocks.get(type);
        if (maps != null) {
            maps.remove(mapid);
        }
    }

    public void sendPacketTrock(WritingPacket packet) {
        for (Integer i : getTrockMaps(1)) {
            packet.writeInt(i);
        }
        for (int i = getTrockMaps(1).size(); i < 5; i++) {
            packet.writeInt(999999999);
        }
        for (Integer i : getTrockMaps(2)) {
            packet.writeInt(i);
        }
        for (int i = getTrockMaps(2).size(); i < 10; i++) {
            packet.writeInt(999999999);
        }
        for (Integer i : getTrockMaps(3)) {
            packet.writeInt(i);
        }
        for (int i = getTrockMaps(3).size(); i < 13; i++) {
            packet.writeInt(999999999);
        }
    }

    public void sendPacketTrock(WritingPacket packet, int type) {
        if (type == 1) {
            for (Integer i : getTrockMaps(1)) {
                packet.writeInt(i);
            }
            for (int i = getTrockMaps(1).size(); i < 5; i++) {
                packet.writeInt(999999999);
            }
        } else if (type == 2) {
            for (Integer i : getTrockMaps(2)) {
                packet.writeInt(i);
            }
            for (int i = getTrockMaps(2).size(); i < 10; i++) {
                packet.writeInt(999999999);
            }
        } else if (type == 3) {
            for (Integer i : getTrockMaps(3)) {
                packet.writeInt(i);
            }
            for (int i = getTrockMaps(3).size(); i < 13; i++) {
                packet.writeInt(999999999);
            }
        }
    }

    public void addRewardDB(int cid, int itemid, int quantity) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO rewardsaves VALUES (NULL, ?, ?, ?)");
            ps.setInt(1, cid);
            ps.setInt(2, itemid);
            ps.setInt(3, quantity);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public List<Pair<Integer, Integer>> getRewardDB() {
        List<Pair<Integer, Integer>> rewards = new ArrayList<Pair<Integer, Integer>>();
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM `rewardsaves` WHERE `cid` = ?");
            ps.setInt(1, this.id);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                rewards.add(new Pair(rs.getInt("itemid"), rs.getInt("quantity")));
            }
            ps.close();
            rs.close();
            con.close();
        } catch (SQLException e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
        return rewards;

    }

    public void removeRewardsDB(int selection, int quantity, int cid) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("DELETE FROM rewardsaves WHERE itemid = ? AND quantity = ? AND cid = ? LIMIT 1");
            ps.setInt(1, selection);
            ps.setInt(2, quantity);
            ps.setInt(3, cid);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            if (!ServerConstants.realese) {
                ex.printStackTrace();
            }
        }
    }

    public String printRewardsSaves() {
        String str = "";
        int o = 0;
        for (Pair<Integer, Integer> d : getRewardDB()) {
            str += "#L" + (o++) + "#" + "#z" + d.getLeft() + "# " + d.getRight() + "개#l\r\n";
        }
        return str;
    }

    public int[] getRewardsSavedItem(int what) {
        int po = 0;
        int[] items = {0, 0};
        for (Pair<Integer, Integer> d : getRewardDB()) {
            if (what == po) {
                items[0] = d.getLeft();
                items[1] = d.getRight();
                break;
            }
            po++;
        }
        return items;
    }

    public void gainMedalReward(int item) {
        send(UIPacket.showInfo("<" + ItemInformation.getInstance().getName(item) + "> 훈장을 획득하셨습니다!"));
        message(5, ("<" + ItemInformation.getInstance().getName(item)) + "> 훈장을 획득하셨습니다.");
        gainItem(item, (short) 1, false, -1, "자동 훈장 퀘스트 완료 훈장.");
    }

    public List<MapleSummon> getMines() {
        return mines;
    }

    public void addCardStack(int amount) {
        if (this.getSkillLevel(24120002) > 0) {
            this.cardStack = Math.min(40, amount + getCardStack());
        } else {
            this.cardStack = Math.min(20, amount + getCardStack());
        }
        send(MainPacketCreator.cardAmount(getCardStack()));
    }

    public void setCardStack(int amount) {
        this.cardStack = amount;
    }

    public int getCardStack() {
        return cardStack;
    }

    public int addCardStackRunningId() {
        return ++cardStackRunningId;
    }

    public MapleProfession getProfession() {
        return profession;
    }

    public int getGatherToolPosition(MapleProfessionType type) {
        if (type == MapleProfessionType.HERBALISM) {
            //1502000
            for (IItem i : getInventory(MapleInventoryType.EQUIP).list()) {
                if (i.getItemId() / 10000 == 150) {
                    return i.getPosition();
                }
            }
        } else if (type == MapleProfessionType.MINING) {
            //1512000
            for (IItem i : getInventory(MapleInventoryType.EQUIP).list()) {
                if (i.getItemId() / 10000 == 151) {
                    return i.getPosition();
                }
            }
        }
        return 0;
    }

    public int getGatherTool(MapleProfessionType type) {
        if (type == MapleProfessionType.HERBALISM) {
            //1502000
            for (IItem i : getInventory(MapleInventoryType.EQUIP).list()) {
                if (i.getItemId() / 10000 == 150) {
                    return i.getItemId();
                }
            }
        } else if (type == MapleProfessionType.MINING) {
            //1512000
            for (IItem i : getInventory(MapleInventoryType.EQUIP).list()) {
                if (i.getItemId() / 10000 == 151) {
                    return i.getItemId();
                }
            }
        }
        return 0;
    }

    //                ret.getStat().setAmbition(rs.getInt("ambition"));
//            ret.getStat().setCharm(rs.getInt("charm"));
//            ret.getStat().setDiligence(rs.getInt("diligence"));
//            ret.getStat().setEmpathy(rs.getInt("empathy"));
//            ret.getStat().setInsight(rs.getInt("insight"));
//            ret.getStat().setWillPower(rs.getInt("willpower"));
    /* 0 : 카리스마
     * 1 : 통찰력
     * 2 : 의지
     * 3 : 손재주
     * 4 : 감성
     * 5 : 매력
     */
    public void addAmbition(int amount) {
        addCharisma(amount);
    }

    public void addCharisma(int amount) {
        boolean limited = false;
        if (getTodayCharisma() >= 500) {
            limited = true;
        } else {
            if (getTodayCharisma() + amount > 500) {
                amount = 500 - getTodayCharisma();
            }
            getStat().setAmbition(getStat().getAmbition() + amount);
            updateSingleStat(PlayerStat.CHARISMA, getStat().getAmbition() + amount);
            addTodayCharisma(amount);
        }
        send(MainPacketCreator.GainEXP_Trait(amount, 0, limited));
    }

    public final short getTodayCharisma() {
        if (getKeyValue("Today_Charisma") == null) {
            setKeyValue("Today_Charisma", "0");
        }
        return Short.parseShort(getKeyValue("Today_Charisma"));
    }

    public final void addTodayCharisma(int amount) {
        setKeyValue("Today_Charisma", Math.min((getTodayCharisma() + amount), 500) + "");
        send(MainPacketCreator.updateTodayTrait(this));
    }

    public void addCharm(int amount) {
        boolean limited = false;
        if (getTodayCharm() >= 5000) {
            limited = true;
        } else {
            if (getTodayCharm() + amount > 5000) {
                amount = 5000 - getTodayCharm();
            }
            getStat().setCharm(getStat().getCharm() + amount);
            addTodayCharm(amount);
            updateSingleStat(PlayerStat.CHARM, getStat().getCharm() + amount);
        }
        send(MainPacketCreator.GainEXP_Trait(amount, 5, limited));
    }

    public final short getTodayCharm() {
        if (getKeyValue("Today_Charm") == null) {
            setKeyValue("Today_Charm", "0");
        }
        return Short.parseShort(getKeyValue("Today_Charm"));
    }

    public final void addTodayCharm(int amount) {
        setKeyValue("Today_Charm", Math.min((getTodayCharm() + amount), 500) + "");
        send(MainPacketCreator.updateTodayTrait(this));
    }

    public void addDiligence(int amount) {
        boolean limited = false;
        if (getTodayDiligence() >= 500) {
            limited = true;
        } else {
            if (getTodayDiligence() + amount > 500) {
                amount = 500 - getTodayDiligence();
            }
            getStat().setDiligence(getStat().getDiligence() + amount);
            addTodayDiligence(amount);
            updateSingleStat(PlayerStat.CRAFT, getStat().getDiligence() + amount);
        }
        send(MainPacketCreator.GainEXP_Trait(amount, 3, limited));
    }

    public final short getTodayDiligence() {
        if (getKeyValue("Today_Diligence") == null) {
            setKeyValue("Today_Diligence", "0");
        }
        return Short.parseShort(getKeyValue("Today_Diligence"));
    }

    public final void addTodayDiligence(int amount) {
        setKeyValue("Today_Diligence", Math.min((getTodayDiligence() + amount), 500) + "");
        send(MainPacketCreator.updateTodayTrait(this));
    }

    public void addEmpathy(int amount) {
        boolean limited = false;
        if (getTodayEmpathy() >= 500) {
            limited = true;
        } else {
            if (getTodayEmpathy() + amount > 500) {
                amount = 500 - getTodayEmpathy();
            }
            getStat().setEmpathy(getStat().getEmpathy() + amount);
            addTodayEmpathy(amount);
            updateSingleStat(PlayerStat.SENSE, getStat().getEmpathy() + amount);
        }
        send(MainPacketCreator.GainEXP_Trait(amount, 4, limited));
    }

    public final short getTodayEmpathy() {
        if (getKeyValue("Today_Empathy") == null) {
            setKeyValue("Today_Empathy", "0");
        }
        return Short.parseShort(getKeyValue("Today_Empathy"));
    }

    public final void addTodayEmpathy(int amount) {
        setKeyValue("Today_Empathy", Math.min((getTodayEmpathy() + amount), 500) + "");
        send(MainPacketCreator.updateTodayTrait(this));
    }

    public void addInsight(int amount) {
        boolean limited = false;
        if (getTodayInsight() >= 500) {
            limited = true;
        } else {
            if (getTodayInsight() + amount > 500) {
                amount = 500 - getTodayInsight();
            }
            getStat().setInsight(getStat().getInsight() + amount);
            updateSingleStat(PlayerStat.INSIGHT, getStat().getInsight() + amount);
            addTodayInsight(amount);
        }
        send(MainPacketCreator.GainEXP_Trait(amount, 1, limited));
    }

    public final short getTodayInsight() {
        if (getKeyValue("Today_Insight") == null) {
            setKeyValue("Today_Insight", "0");
        }
        return Short.parseShort(getKeyValue("Today_Insight"));
    }

    public final void addTodayInsight(int amount) {
        setKeyValue("Today_Insight", Math.min((getTodayInsight() + amount), 500) + "");
        send(MainPacketCreator.updateTodayTrait(this));
    }

    public void addWillPower(int amount) {
        boolean limited = false;
        if (getTodayWillPower() >= 500) {
            limited = true;
        } else {
            if (getTodayWillPower() + amount > 500) {
                amount = 500 - getTodayWillPower();
            }
            getStat().setWillPower(getStat().getWillPower() + amount);
            addTodayWillPower(amount);
            updateSingleStat(PlayerStat.WILLPOWER, getStat().getWillPower() + amount);
        }
        send(MainPacketCreator.GainEXP_Trait(amount, 2, limited));
    }

    public final short getTodayWillPower() {
        if (getKeyValue("Today_WillPower") == null) {
            setKeyValue("Today_WillPower", "0");
        }
        return Short.parseShort(getKeyValue("Today_WillPower"));
    }

    public final void addTodayWillPower(int amount) {
        setKeyValue("Today_WillPower", Math.min((getTodayWillPower() + amount), 500) + "");
        send(MainPacketCreator.updateTodayTrait(this));
    }

    public final String getToday() {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMdd");
        String time = sdf.format(Calendar.getInstance().getTime());
        return time;
    }

    public final void updateToday() {
        try {
            if (getKeyValue("Today_TraitLimit") == null) {
                setKeyValue("Today_TraitLimit", getToday());
            }
            if (!getToday().equals(getKeyValue("Today_TraitLimit"))) {
                DateFormat df = new SimpleDateFormat("yyyyMMdd");
                Date z = df.parse(getKeyValue("Today_TraitLimit"));
                if (Calendar.getInstance().getTime().after(z)) {
                    setKeyValue("Today_TraitLimit", getToday());
                    setKeyValue("Today_WillPower", "0");
                    setKeyValue("Today_Insight", "0");
                    setKeyValue("Today_Empathy", "0");
                    setKeyValue("Today_Diligence", "0");
                    setKeyValue("Today_Charm", "0");
                    setKeyValue("Today_Charisma", "0");
                    setKeyValue("Today_EnergyDrink", "0");
                    setKeyValue("Today_Check", null);
                    getProfession().setFatigue(0);
                    setArtifactPoints(0);
                    //updateSingleStat(PlayerStat.FATIGUE, 0);
                }

            }
        } catch (Exception e) {
            if (!ServerConstants.realese) {
                e.printStackTrace();
            }
        }
    }

    public MapleExtractor getExtractor() {
        return extractor;
    }

    public void setExtractor(MapleExtractor me) {
        removeExtractor();
        this.extractor = me;
    }

    public void removeExtractor() {
        if (extractor != null) {
            map.broadcastMessage(MainPacketCreator.removeExtractor(this.id));
            map.removeMapObject(extractor);
            extractor = null;
        }
    }

    public void setHide(boolean h) {
        if (h == true) {
            this.hidden = true;
            map.broadcastMessage(this, MainPacketCreator.removePlayerFromMap(getId()), false);
        } else {
            this.hidden = false;
            for (MapleMapObject objs : map.getAllPlayer()) {
                MapleCharacter chr = (MapleCharacter) objs;
                if (chr.getId() != getId()) {
                    sendSpawnData(chr.getClient());
                }
            }
        }
    }

    public void checkBossMapOut() {
        MapleWorldMapProvider fac = getClient().getChannelServer().getMapFactory();
        if (GameConstants.getBossReturnMap(getMapId()) == -1) {
            return;
        }
        changeMap(fac.getMap(GameConstants.getBossReturnMap(getMapId())), fac.getMap(GameConstants.getBossReturnMap(getMapId())).getPortal(0));
    }

    public void setSkillEffect(SkillEffectEntry eff) {
        this.skilleffects = eff;
    }

    public SkillEffectEntry getSkillEffect() {
        return skilleffects;
    }

    public void updateOneInfoQuest(int questid, String key, String value) {
        String allValues = getInfoQuest(questid);
        if (!allValues.equals("")) {
            Map<String, String> values = new HashMap<String, String>();
            String[] keyvalues = allValues.split(";");
            for (int i = 0; i < keyvalues.length; i++) {
                String[] keyandvalue = keyvalues[i].split("=");
                values.put(keyandvalue[0], keyandvalue[1]);
            }
            if (values.containsKey(key)) {
                values.remove(key);
            }
            values.put(key, value);
            allValues = "";
            int size = 1;
            for (Entry<String, String> e : values.entrySet()) {
                allValues += e.getKey() + "=" + e.getValue();
                if (size < values.size()) {
                    allValues += ";";
                }
                size++;
            }
        } else {
            allValues = key + "=" + value;
        }
        updateInfoQuest(questid, allValues);
    }

    public String getOneInfoQuest(int questid, String key) {

        String allValues = getInfoQuest(questid);
        if (!allValues.equals("")) {
            Map<String, String> values = new HashMap<String, String>();
            String[] keyvalues = allValues.split(";");
            for (int i = 0; i < keyvalues.length; i++) {
                String[] keyandvalue = keyvalues[i].split("=");
                values.put(keyandvalue[0], keyandvalue[1]);
            }
            if (values.containsKey(key)) {
                return values.get(key);
            }
        }
        return "";
    }

    public void addInnerExp(int amount) {
        if (getInnerExp() + amount >= Integer.MAX_VALUE) {
            setInnerExp(Integer.MAX_VALUE);
        } else {
            setInnerExp(getInnerExp() + amount);
        }
        send(MainPacketCreator.updateInnerExp(getInnerExp()));
    }

    public int getInnerNextExp() {
        if (getInnerLevel() == 0) {
            return 0; //divined by 0
        }
        return (getInnerLevel() + 1) * 500;
    }

    public void innerLevelUp() {
        if (getInnerLevel() == 1) {
            InnerSkillValueHolder isvh = InnerAbillity.getInstance().renewSkill(0, -1);
            innerSkills.add(isvh);
            changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), isvh.getSkillLevel(), isvh.getMaxLevel());
            send(MainPacketCreator.updateInnerAbility(isvh, 1, false));
        } else if (getInnerLevel() == 2) {
            InnerSkillValueHolder isvh = InnerAbillity.getInstance().renewSkill(Randomizer.rand(0, 2), -1);
            innerSkills.add(isvh);
            changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), isvh.getSkillLevel(), isvh.getMaxLevel());
            send(MainPacketCreator.updateInnerAbility(isvh, 2, false));
        } else if (getInnerLevel() >= 3) {
            InnerSkillValueHolder isvh = InnerAbillity.getInstance().renewSkill(Randomizer.rand(1, 3), -1);
            innerSkills.add(isvh);
            changeSkillLevel(SkillFactory.getSkill(isvh.getSkillId()), isvh.getSkillLevel(), isvh.getMaxLevel());
            send(MainPacketCreator.updateInnerAbility(isvh, 3, true));
        }

        setInnerLevel(getInnerLevel() + 1);
    }

    public MapleShop getAswanShop() {
        return aswanShopList;
    }

    public void openAswanShop() {
        if (aswanShopList == null) {
            MapleShopFactory.getInstance().getShop(2182002).sendShop(client);
        } else {
            getAswanShop().sendShop(client);
        }
    }

    public Map<BuffStats, List<StackedSkillEntry>> getStackSkills() {
        return stackedEffects;
    }

    public final void warp(final int map) {
        final MapleMap mapz = getWarpMap(map);
        changeMap(mapz, mapz.getPortalSP().get(Randomizer.nextInt(mapz.getPortalSP().size())));
    }

    public final void warp(final int map, final String portal) {
        final MapleMap mapz = getWarpMap(map);
        changeMap(mapz, mapz.getPortal(portal));
    }

    private final MapleMap getWarpMap(final int map) {
        if (getEventInstance() != null) {
            return getEventInstance().getMapFactory().getMap(map);
        }
        return ChannelServer.getInstance(client.getChannel()).getMapFactory().getMap(map);
    }

    public void setAndroid(MapleAndroid and) {
        this.android = and;
        if (map != null && and != null) { //Set
            android.setStance(0);
            android.setPosition(getPosition());
            map.broadcastMessage(this, AndroidPacket.spawnAndroid(this, android), true);
            map.broadcastMessage(this, AndroidPacket.showAndroidEmotion(this.getId(), Randomizer.nextInt(17) + 1), true);
        } else if (map != null && and == null) { //Remove
            map.broadcastMessage(this, AndroidPacket.deactivateAndroid(this.getId()), true);
        }
    }

    public void updateAndroid() {
        if (map != null && android != null) { //Set
            map.broadcastMessage(this, AndroidPacket.spawnAndroid(this, android), true);
        } else if (map != null && android == null) { //Remove
            map.broadcastMessage(this, AndroidPacket.deactivateAndroid(this.getId()), true);
        }
    }

    public MapleAndroid getAndroid() {
        return android;
    }

    public void removeAndroid() {
        setAndroid(null);
    }

    public List<Integer> getExtendedSlots() {
        return extendedSlots;
    }

    public int getExtendedSlot(int index) {
        if (extendedSlots.size() <= index || index < 0) {
            return -1;
        }
        return extendedSlots.get(index);
    }

    public boolean hasBlockedInventory() {
        return !isAlive() || getTrade() != null || getConversation() > 0 || getPlayerShop() != null || map == null;
    }

    public int addPlusOfGlassCTS_Morph(int amount) {
        glass_plusCTS_Morph += amount;
        if (glass_plusCTS_Morph >= 10000) {
            glass_plusCTS_Morph = 10000;
        }
        return glass_plusCTS_Morph;
    }

    public int addMinusOfGlassCTS_Morph(int amount) {
        glass_minusCTS_Morph -= amount;
        if (glass_minusCTS_Morph <= 1) {
            glass_minusCTS_Morph = 1;
        }

        return glass_minusCTS_Morph;
    }

    public int getPlusOfGlassCTS_Morph() {
        return glass_plusCTS_Morph;
    }

    public int getMinusOfGlassCTS_Morph() {
        return glass_minusCTS_Morph;
    }

    public boolean isEquilibrium() {
        if (getBuffedValue(BuffStats.CTS_Larkness) != null) {
            if (getBuffedValue(BuffStats.CTS_Larkness) == 20040218 || getBuffedValue(BuffStats.CTS_Larkness) == 20040219) {
                return true;
            }
        }
        return false;
    }

    public final void getSunfireBuffedValue(int skillid, int attackSkill, Integer Gauge) {
        final ISkill sunfireid = SkillFactory.getSkill(skillid);
        final byte skilllevel = getSkillLevel(sunfireid);
        if (skilllevel > 0) {
            final SkillStatEffect sunfireBuff = sunfireid.getEffect(skilllevel);
            if (attackSkill > 0) {
                if (getBuffedValue(BuffStats.CTS_Larkness) == null || getBuffedValue(BuffStats.CTS_Larkness) == -1) {
                    sunfireBuff.applySunfireBuff(this, false, attackSkill);
                } else if (getBuffedValue(BuffStats.CTS_Larkness) != 20040219) {
                    if (getMinusOfGlassCTS_Morph() <= 1) {
                        final SkillStatEffect equilibriumBuff = SkillFactory.getSkill(20040220).getEffect(1);
                        equilibriumBuff.applyequilibriumBuff(this, true);
                    } else {
                        sunfireBuff.applySunfireBuff(this, true, attackSkill);
                    }
                }
            } else {
                System.out.println("선파이어 스킬데이터를 알 수 없습니다.");
            }
        } else {
            System.out.println("현재 선파이어 스킬레벨이 0 이거나 배우않아 스킬을 발동할 수 없습니다.");
        }
    }

    public final void getEclipseBuffedValue(int skillid, int attackSkill, Integer Gauge) {
        final ISkill eclipseid = SkillFactory.getSkill(skillid);
        final byte skilllevel = getSkillLevel(eclipseid);
        if (skilllevel > 0) {
            final SkillStatEffect eclipseBuff = eclipseid.getEffect(skilllevel);
            if (attackSkill > 0) {
                if (getBuffedValue(BuffStats.CTS_Larkness) == null || getBuffedValue(BuffStats.CTS_Larkness) == -1) {
                    eclipseBuff.applyEclipseBuff(this, false, attackSkill);
                } else if (getBuffedValue(BuffStats.CTS_Larkness) != 20040218) {
                    if (getPlusOfGlassCTS_Morph() >= 10000) {
                        final SkillStatEffect equilibriumBuff = SkillFactory.getSkill(20040219).getEffect(1);
                        equilibriumBuff.applyequilibriumBuff(this, false);
                    } else {
                        eclipseBuff.applyEclipseBuff(this, true, attackSkill);
                    }
                }
            } else {
                System.out.println("이클립스 스킬데이터를 알 수 없습니다.");
            }
        } else {
            System.out.println("현재 이클립스 스킬레벨이 0 이거나 배우않아 스킬을 발동할 수 없습니다.");
        }
    }

    /*
     * 4차 직업의 마스터레벨을 기본 10으로 지급한다.
     */
    public void mastery4thJobSkills(MapleCharacter player, int jobId) {
        MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr("" + jobId, '0', 3) + ".img");
        for (MapleData skill : data) {
            if (skill != null) {
                for (MapleData skillId : skill.getChildren()) {
                    if (!skillId.getName().equals("icon")) {
                        if (MapleDataTool.getIntConvert("invisible", skillId, 0) == 0) { //스킬창에 안보이는 스킬은 올리지않음
                            player.changeSkillLevel(SkillFactory.getSkill(Integer.parseInt(skillId.getName())), (byte) 0, (byte) 10);
                        }
                    }
                }
            }
        }
    }

    public void startQuest(int id, int npcid) {
        try {
            MapleQuest.getInstance(id).forceStart(this, npcid, "");
        } catch (NullPointerException ex) {

        }
    }

    public void completeQuest(int id, int npcid) {
        try {
            MapleQuest.getInstance(id).forceComplete(this, npcid);
        } catch (NullPointerException ex) {

        }
    }

    public static final void crossChannelWarp(final MapleClient c, final int map, final byte channel) {
        String IP = null;
        IP = ServerConstants.getServerHost(c);

        MapleCharacter chr = c.getPlayer();
        MapleMap target = c.getChannelServer().getMapFactory().getMap(map);
        {
            if (chr.getTrade() != null) {
                MapleUserTrade.cancelTrade(chr.getTrade());
            }
            if (chr.getPets() != null) {
                chr.unequipAllPets();
            }
            final IMapleCharacterShop shop = chr.getPlayerShop();
            if (shop != null) {
                shop.removeVisitor(chr);
                if (shop.isOwner(chr)) {
                    shop.setOpen(true);
                }
            }
        }
        final ChannelServer ch = ChannelServer.getInstance(c.getChannel());
        if (chr.getMessenger() != null) {
            WorldCommunity.silentLeaveMessenger(chr.getMessenger().getId(), new MapleMultiChatCharacter(chr));
        }
        for (final Entry<BuffStats, List<BuffStatsValueHolder>> effects : chr.getEffects().entrySet()) {
            for (BuffStatsValueHolder cancelEffectCancelTasks : effects.getValue()) {

                if (cancelEffectCancelTasks.schedule != null) {
                    cancelEffectCancelTasks.schedule.cancel(false);
                }
            }
        }
        //  ChannelServer.addBuffsToStorage(chr.getId(), chr.getAllBuffs());
        ChannelServer.addCooldownsToStorage(chr.getId(), chr.getAllCooldowns());
        ChannelServer.addDiseaseToStorage(chr.getId(), chr.getAllDiseases());
        ChannelServer.ChannelChange_Data(new ChracterTransfer(chr), chr.getId(), channel);
        chr.setMap(target);
        chr.setMap(target.getId());
        chr.saveToDB(false, false);
        ch.removePlayer(chr);
        chr.getMap().removePlayer(chr);
        c.setPlayer(null);
        c.updateLoginState(MapleClient.CHANGE_CHANNEL, c.getSessionIPAddress());
        c.getSession().writeAndFlush(MainPacketCreator.getChannelChange(ServerConstants.basePorts + (channel), IP));
    }

    public void setLastCC(long d) {
        lastChannelChange = d;
    }

    public long getLastCC() {
        return lastChannelChange;
    }

    public void skillReset() {
        List<ISkill> skillss = new ArrayList<ISkill>();
        for (ISkill skill : skills.keySet()) {
            skillss.add(skill);
        }
        for (ISkill i : skillss) {
            changeSkillLevel(i, (byte) 0, (byte) 0);
        }
    }

    public void retrieveLinkBless() {
        int blessOfFairy = 12;
        blessOfFairy += GameConstants.getBeginnerJobCode(job) * 10000;
        int blessOfEmpress = 73;
        blessOfEmpress += GameConstants.getBeginnerJobCode(job) * 10000;
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT `level`, `name` FROM `characters` WHERE `accountid` = ? AND (`job` DIV 1000 != 1) AND (`job` DIV 1000 != 5) AND `name` NOT LIKE ? ORDER BY `level` DESC");
            ps.setInt(1, accountid);
            ps.setString(2, name);
            ResultSet rs = ps.executeQuery();
            this.BlessOfFairy_Origin = null;
            if (rs.next()) {
                int skillLevel = 0;
                skillLevel = rs.getInt("level") / 10;
                BlessOfFairy_Origin = rs.getString("name");
                skills.put(SkillFactory.getSkill(blessOfFairy), new SkillEntry((byte) skillLevel, (byte) 0, -1));
            }
            ps.close();
            rs.close();

            ps = con.prepareStatement("SELECT `level`, `name` FROM `characters` WHERE `accountid` = ? AND ((`job` DIV 1000 = 1) OR (`job` DIV 1000 = 5)) AND `name` NOT LIKE ? ORDER BY `level` DESC");
            ps.setInt(1, accountid);
            ps.setString(2, name);
            rs = ps.executeQuery();
            BlessOfEmpress_Origin = null;
            if (rs.next()) {
                int skillLevel = 0;
                skillLevel = rs.getInt("level") / 5;
                BlessOfEmpress_Origin = rs.getString("name");
                int saintSpirit = 24 + getSkillLevel(GameConstants.getBeginnerJobCode(job) * 10000 + 202);
                skillLevel = Math.min(skillLevel, saintSpirit);
                skills.put(SkillFactory.getSkill(blessOfEmpress), new SkillEntry((byte) skillLevel, (byte) 0, -1));
            }
            ps.close();
            rs.close();
            con.close();
        } catch (SQLException sql) {
            sql.printStackTrace();
        }
    }

    public static void loadItemPot(int charid) {
        MapleItempotMain.getInstance().saveToDB(charid);
    }

    public boolean haveItem(int itemid) {
        return getItemQuantity(itemid, false) > 0;
    }

    public byte getBlessOfDark() {
        return blessOfDarkness;
    }

    public void setBlessOfDark(byte count) {
        blessOfDarkness = count;
    }

    public void giveSurPlus(int surplus) {
        int MaxSurPlus = 0;
        SurPlus += surplus;
        switch (getJob()) {
            case 3600:
                MaxSurPlus = 5;
                break;
            case 3610:
                MaxSurPlus = 10;
                break;
            case 3611:
                MaxSurPlus = 15;
                break;
            case 3612:
                MaxSurPlus = 20;
                break;
        }
        if (SurPlus < 0) {
            SurPlus = 0;
        }
        if (MaxSurPlus < SurPlus) {
            SurPlus = MaxSurPlus;
        }
        send(MainPacketCreator.giveSurPlus(SurPlus));
    }

    public void giveBulletGauge(int skillid, boolean CloseR) {
        SkillStatEffect effect = null;
        byte MaxBulletGauge = 6;
        byte MaxCylinderGauge = 6;
        boolean isRevolving = (this.Bullet <= 0) || (skillid == 37000010);
        if (CloseR) {
            this.BULLET_SKILL_ID = skillid;
        }

        switch (skillid) {
            case 37001001:
                if (this.BULLET_SKILL_ID != 0) {
                    this.BULLET_SKILL_ID = 0;
                    this.Cylinder = (byte) (this.Cylinder + 1);
                } else {
                    return;
                }
            case 37001004:
                this.Bullet = (byte) (this.Bullet - 1);
                break;
            case 37000013:
                effect = SkillFactory.getSkill(skillid).getEffect(getSkillLevel(skillid));
                effect.applyTo(this);
                this.Cylinder = 0;
                break;
        }

        if (isRevolving) {
            this.Bullet = MaxBulletGauge;
        }
        if (MaxCylinderGauge < this.Cylinder) {
            this.Cylinder = MaxCylinderGauge;
        }
        send(MainPacketCreator.giveBulletGauge(isRevolving ? 37000010 : skillid, (byte) this.Bullet, (byte) this.Cylinder));
    }

    public void givePPoint(SkillStatEffect effects) {
        if (effects == null) {
            return;
        }
        int MaxPPoint = 30;
        if (effects != null) {
            if (effects.getPPCon() > 0) {
                PPoint -= effects.getPPCon();
            } else if (effects.getPPRecovery() > 0) {
                PPoint += effects.getPPRecovery();
            }
        }
        if (PPoint < 0) {
            PPoint = 0;
        }
        if (MaxPPoint < PPoint) {
            PPoint = MaxPPoint;
        }
        send(MainPacketCreator.givePsychicPoint(getJob(), PPoint));
    }

    public void gainRC(int rc) {
        this.realcash += rc;
    }

    public int getRC() {
        return realcash;
    }

    public void loseRC(int rc) {
        this.realcash -= rc;
    }

    public void modifyRC(int type, int quantity, boolean show) {
        if (getRC() < 0) {
            realcash = 0;
        }
        if (getRC() + quantity < 9000000) {
            switch (type) {
                case 1:
                    realcash += quantity;
                    break;
                case 2:
                    maplepoints += quantity;
                    break;
                default:
                    break;
            }
        } else {
            dropMessage(5, "소지가능한 후원포인트량을 초과했습니다.");
        }
    }

    public int getRuneTimeStamp() {
        return LastTouchedRuneTime;
    }

    public void setRuneTimeStamp() {
        if (LastTouchedRune == null) {
            LastTouchedRuneTime = 360000;
            LastTouchedRune = EtcTimer.getInstance().register(new Runnable() {
                @Override
                public void run() {
                    LastTouchedRuneTime = LastTouchedRuneTime - 1000;
                    if (LastTouchedRuneTime <= 0) {
                        LastTouchedRune = null;
                        LastTouchedRuneTime = 0;
                    }
                }
            }, 1000);
        }
    }

    public int getTouchedRune() {
        return TouchedRune;
    }

    public void setTouchedRune(int type) {
        TouchedRune = type;
    }

    public int getFollowId() {
        return followid;
    }

    public void setFollowId(int fi) {
        this.followid = fi;
        if (fi == 0) {
            this.followinitiator = false;
            this.followon = false;
        }
    }

    public void setFollowInitiator(boolean fi) {
        this.followinitiator = fi;
    }

    public void setFollowOn(boolean fi) {
        this.followon = fi;
    }

    public boolean isFollowOn() {
        return followon;
    }

    public boolean isFollowInitiator() {
        return followinitiator;
    }

    public void checkFollow() {
        if (followid <= 0) {
            return;
        }
        if (followon) {
            map.broadcastMessage(MainPacketCreator.followEffect(id, 0, null));
            map.broadcastMessage(MainPacketCreator.followEffect(followid, 0, null));
        }
        MapleCharacter tt = map.getCharacterById_InMap(followid);
        client.getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "따라가기가 취소 되었습니다."));
        if (tt != null) {
            tt.setFollowId(0);
            tt.getClient().getSession().writeAndFlush(MainPacketCreator.serverNotice(1, "따라가기가 취소 되었습니다."));
        }
        setFollowId(0);
    }

    public final void timeMoveMap(final int destination, final int movemap, final int time) {
        warp(movemap);
        getClient().send(MainPacketCreator.getClock(time));
        CloneTimer tMan = CloneTimer.getInstance();
        Runnable r = new Runnable() {
            @Override
            public void run() {
                if (client.getPlayer() != null) {
                    if (getMapId() == movemap) {
                        warp(destination);
                    }
                }
            }
        };
        tMan.schedule(r, time * 1000);
    }

    public int getPendantExp() {
        return pendantExp;
    }

    public void equipPendantOfSpirit() {
        if (pendantOfSpirit == null) {
            pendantOfSpirit = EtcTimer.getInstance().register(new Runnable() {
                @Override
                public void run() {
                    if (pendantExp == 0) {
                        pendantExp++;
                        dropMessage(5, "정령의 팬던트를 착용으로 인해 몬스터 사냥 시 보너스 경험치 " + pendantExp + "0%를 추가로 획득하게 됩니다.");
                    } else if (pendantExp < 3) {
                        pendantExp++;
                        dropMessage(5, "정령의 팬던트를 착용한지 " + pendantExp + " 시간이 지났습니다. " + pendantExp + "0%의 보너스 경험치를 얻습니다.");
                    } else {
                        pendantOfSpirit.cancel(false);
                    }
                }
            }, 3600000); //1 hour
        }
    }

    public void unequipPendantOfSpirit() {
        if (pendantOfSpirit != null) {
            pendantOfSpirit.cancel(false);
            pendantOfSpirit = null;
        }
        pendantExp = 0;
    }

    public void setPC(boolean a) {
        this.prmiumpc = a;
    }

    public void fakeRelog() {
        this.client.getSession().writeAndFlush(MainPacketCreator.getPlayerInfo(this));
        MapleMap mapp = getMap();
        mapp.removePlayer(this);
        mapp.addPlayer(this);
    }

    public void handleForceGain(int oid, int skillid) {
        handleForceGain(oid, skillid, 0);
    }

    public void handleForceGain(int oid, int skillid, int extraForce) {
        if (!GameConstants.isForceIncrease(skillid) && extraForce <= 0) {
            return;
        }
        int forceGain = 1;
        if (getLevel() >= 30 && getLevel() < 70) {
            forceGain = 2;
        } else if (getLevel() >= 70 && getLevel() < 120) {
            forceGain = 3;
        } else if (getLevel() >= 120) {
            forceGain = 4;
        }
        stats.mp++; // counter
        if (GameConstants.isDemonSlayer(getJob())) {
            getStat().addForce(extraForce > 0 ? extraForce : forceGain);
        }
        getClient().getSession().writeAndFlush(MainPacketCreator.absorbingDF(oid, stats.mp, forceGain, false, this, null));
        if (GameConstants.isDemonSlayer(getJob())) {
            if (stats.mpRecoverProp > 0 && extraForce <= 0) {
                if (Randomizer.nextInt(100) <= stats.mpRecoverProp) {//i think its out of 100, anyway
                    stats.mp++; // counter
                    getStat().addForce(stats.mpRecover);
                    getClient().getSession().writeAndFlush(MainPacketCreator.absorbingDF(oid, stats.mp, stats.mpRecover, false, this, null));
                }
            }
        }
        if (stats.mp <= stats.getCurrentMaxMp()) {
            final List<Pair<PlayerStat, Long>> statupz = new ArrayList<Pair<PlayerStat, Long>>(8);
            statupz.add(new Pair<PlayerStat, Long>(PlayerStat.MP, (long) stats.mp));
            client.getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(this, statupz));
        }
    }

    public void zerooskill(int i) {
        MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr("" + i, '0', 3) + ".img");
        final ISkill skills = null;
        byte maxLevel = 0;
        for (MapleData skill : data) {
            if (skill != null) {
                for (MapleData skillId : skill.getChildren()) {
                    if (!skillId.getName().equals("icon")) {
                        maxLevel = (byte) MapleDataTool.getIntConvert("maxLevel", skillId.getChildByPath("common"), 0);
                        if (getLevel() >= MapleDataTool.getIntConvert("reqLev", skillId, 0)) {
                            changeSkillLevel(SkillFactory.getSkill(Integer.parseInt(skillId.getName())), (byte) 0, (byte) 0);
                        }
                    }
                }
            }
        }
    }

    public void maxskill(int i) {
        MapleData data = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz")).getData(StringUtil.getLeftPaddedStr("" + i, '0', 3) + ".img");
        byte maxLevel = 0;
        for (MapleData skill : data) {
            if (skill != null) {
                for (MapleData skillId : skill.getChildren()) {
                    if (!skillId.getName().equals("icon")) {
                        maxLevel = (byte) MapleDataTool.getIntConvert("maxLevel", skillId.getChildByPath("common"), 0);
                        if (MapleDataTool.getIntConvert("invisible", skillId, 0) == 0) { //스킬창에 안보이는 스킬은 올리지않음
                            if (getLevel() >= MapleDataTool.getIntConvert("reqLev", skillId, 0)) {
                                try {
                                    changeSkillLevel(SkillFactory.getSkill(Integer.parseInt(skillId.getName())), maxLevel, maxLevel);
                                } catch (NumberFormatException ex) {
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    public int getFH() {
        MapleFoothold fh = getMap().getFootholds().findMaple(getTruePosition());
        if (fh != null) {
            return fh.getId();
        }
        return 0;
    }

    public final int getRankPoint() {
        return rankpoint;
    }

    public final void setRankPoint(int point) {
        this.rankpoint = point;
    }

    public final void addRankPoint(int point) {
        this.rankpoint += point;
    }

    public int getGP() {
        return this.gp;
    }

    public void gainGP(int i) {
        this.gp += i;
    }

    public final void teachSkill(final int id, final byte level, final byte masterlevel) {
        changeSkillLevel(SkillFactory.getSkill(id), level, masterlevel);
    }

    public String getDateKey(String key) {
        Calendar ocal = Calendar.getInstance();
        int year = ocal.get(ocal.YEAR);
        int month = ocal.get(ocal.MONTH) + 1;
        int day = ocal.get(ocal.DAY_OF_MONTH);
        return getKeyValue1(year + "" + month + "" + day + "_" + key);
    }

    public void setDateKey(String key, String value) {
        Calendar ocal = Calendar.getInstance();
        int year = ocal.get(ocal.YEAR);
        int month = ocal.get(ocal.MONTH) + 1;
        int day = ocal.get(ocal.DAY_OF_MONTH);
        setKeyValue(year + "" + month + "" + day + "_" + key, value, true);
    }

    public void setKeyValue(String key, String value, boolean a) {
        if (getKeyValue1(key) == null) {
            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = null;
                String query = "INSERT into `acheck` (`cid`, `keya`, `value`, `day`) VALUES ('";
                query = new StringBuilder().append(query).append(id).toString();
                query = new StringBuilder().append(query).append("', '").toString();
                query = new StringBuilder().append(query).append(key).toString();
                query = new StringBuilder().append(query).append("', '").toString();
                query = new StringBuilder().append(query).append(value).toString();
                if (a) {
                    query = new StringBuilder().append(query).append("', '").toString();
                    query = new StringBuilder().append(query).append("1").toString();
                    query = new StringBuilder().append(query).append("')").toString();
                } else {
                    query = new StringBuilder().append(query).append("', '").toString();
                    query = new StringBuilder().append(query).append("0").toString();
                    query = new StringBuilder().append(query).append("')").toString();
                }
                ps = con.prepareStatement(query);
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (SQLException ex) {

            }
        } else {
            try {
                Connection con = MYSQL.getConnection();
                PreparedStatement ps = con.prepareStatement("UPDATE acheck SET value = ? WHERE cid = ? AND keya = ?");
                ps.setString(1, value);
                ps.setInt(2, id);
                ps.setString(3, key);
                ps.executeUpdate();
                ps.close();
                con.close();
            } catch (SQLException ex) {

            }
        }
    }

    public String getKeyValue1(String key) {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM acheck WHERE cid = ? and keya = ?");
            ps.setInt(1, id);
            ps.setString(2, key);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                String ret = rs.getString("value");
                rs.close();
                ps.close();
                con.close();
                return ret;
            }
            rs.close();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            return null;
        }
        return null;
    }

    public final void handleOrbgain() {
        int orbcount = getBuffedValue(BuffStats.CTS_ComboCounter).intValue();
        ISkill combo;
        ISkill advcombo;
        switch (getJob()) {
            case 1110:
            case 1111:
            case 1112:
                combo = SkillFactory.getSkill(11111001);
                advcombo = SkillFactory.getSkill(11110005);
                break;
            default:
                combo = SkillFactory.getSkill(1101013);
                advcombo = SkillFactory.getSkill(1120003);
        }
        if (GameConstants.isPhantom(getJob())) {
            int comboid = getBuffedSkillEffect(BuffStats.CTS_ComboCounter, -1).getSourceId();
            if (comboid == 11111001) {
                combo = SkillFactory.getSkill(11111001);
                advcombo = SkillFactory.getSkill(11110005);
            } else if (comboid == 1101013) {
                combo = SkillFactory.getSkill(1101013);
                advcombo = SkillFactory.getSkill(1120003);
            }
        }
        SkillStatEffect ceffect = null;
        int advComboSkillLevel = getSkillLevel(advcombo);
        if (advComboSkillLevel > 0) {
            ceffect = advcombo.getEffect(advComboSkillLevel);
        } else {
            ceffect = combo.getEffect(getSkillLevel(combo));
        }
        if (orbcount < ceffect.getX() + 1) {
            int neworbcount = orbcount + 1;
            if ((advComboSkillLevel > 0) && (ceffect.makeChanceResult()) && (neworbcount < ceffect.getX() + 1)) {
                neworbcount++;
            }
            List stat = Collections.singletonList(new Triple(BuffStats.CTS_ComboCounter, Integer.valueOf(neworbcount), Boolean.valueOf(false)));
            setBuffedValue(BuffStats.CTS_ComboCounter, combo.getId(), neworbcount);
            int duration = ceffect.getDuration();
            duration += (int) (getBuffedStarttime(BuffStats.CTS_ComboCounter, combo.getId()).longValue() - System.currentTimeMillis());
            synchronized (this.stackedEffects) {
                this.client.getSession().writeAndFlush(MainPacketCreator.giveBuff(combo.getId(), duration, stat, ceffect, Collections.unmodifiableMap(this.stackedEffects), combo.getAnimationTime(), this));
            }
            getMap().broadcastMessage(this, MainPacketCreator.giveForeignBuff(this, stat), false);
        }
    }

    public void handleOrbconsume(int amount) {
        ISkill combo;
        switch (getJob()) {
            case 1110:
            case 1111:
            case 1112:
                combo = SkillFactory.getSkill(11111001);
                break;
            default:
                combo = SkillFactory.getSkill(1101013);
        }
        SkillStatEffect ceffect = combo.getEffect(getSkillLevel(combo));
        List stat = Collections.singletonList(new Triple(BuffStats.CTS_ComboCounter, (getBuffedValue(BuffStats.CTS_ComboCounter) - amount), false));
        setBuffedValue(BuffStats.CTS_ComboCounter, combo.getId(), getBuffedValue(BuffStats.CTS_ComboCounter, combo.getId()) - amount);
        int duration = ceffect.getDuration();
        duration += (int) (getBuffedStarttime(BuffStats.CTS_ComboCounter, combo.getId()) - System.currentTimeMillis());
        this.client.getSession().writeAndFlush(MainPacketCreator.giveBuff(combo.getId(), duration, stat, ceffect, Collections.unmodifiableMap(this.stackedEffects), combo.getAnimationTime(), this));
    }

    public void LoginPoint() {
        this.fishings = new java.util.Timer();
        this.fishings.scheduleAtFixedRate(new TimerTask() {
            @Override
            public void run() {
                if (fishings != null) {
                    if (fishingfirst == 0) {
                        fishingfirst++;
                    } else {
                        giveLP();
                    }
                }
            }
        }, 0, 3600000);
    }

    public String getChatban() {
        return chatban;
    }

    public void setChatban(String a) {
        this.chatban = a;
    }

    public int getTotalSkillLevel(int skillid) {
        return getTotalSkillLevel(SkillFactory.getSkill(skillid));
    }

    public int getTotalSkillLevel(ISkill skill) {
        if (skill == null) {
            return 0;
        }
        if (GameConstants.iskaiser_Transfiguration_Skill(skill.getId())) {
            return skill.getMaxLevel();
        }
        SkillEntry ret = (SkillEntry) this.skills.get(skill);
        if ((ret == null) || (ret.skillevel <= 0)) {
            return 0;
        }
        return ret.skillevel;
    }

    public List HeadTitle() {
        List<Integer> num_ = new ArrayList<Integer>();
        int num = getKeyValue2("HeadTitle");
        int aa = num / 10000;
        int bb = num / 1000 - aa * 10;
        int cc = num / 100 - (aa * 100 + bb * 10);
        int dd = num / 10 - (aa * 1000 + bb * 100 + cc * 10);
        int ee = num / 1 - (aa * 10000 + bb * 1000 + cc * 100 + dd * 10);
        num_.add(aa);
        num_.add(bb);
        num_.add(cc);
        num_.add(dd);
        num_.add(ee);
        return num_;
    }

    public boolean AutoJob() {
        if (getKeyValue("AutoJob") != null) {
            if (level == 20) {
                switch (getKeyValue("AutoJob")) {
                    case "430":
                        getClient().send(UIPacket.showInfo("[암흑을 기억하는자] 세미듀어러로 전직하였습니다."));
                        changeJob(430);
                        setKeyValue("AutoJob", "430");
                        return true;
                }
            } else if (level == 30) {
                switch (getKeyValue("AutoJob")) {
                    case "110":
                        getClient().send(UIPacket.showInfo("[양손검술의 기사] 파이터로 전직하였습니다."));
                        changeJob(110);
                        return true;
                    case "120":
                        getClient().send(UIPacket.showInfo("[한손검술의 기사] 페이지로 전직하였습니다."));
                        changeJob(120);
                        return true;
                    case "130":
                        getClient().send(UIPacket.showInfo("[창술의 기사] 스피어맨로 전직하였습니다."));
                        changeJob(130);
                        return true;
                    case "210":
                        getClient().send(UIPacket.showInfo("[불*독] 위자드로 전직하였습니다."));
                        changeSkillLevel(SkillFactory.getSkill(2100010), (byte) 10, (byte) 10);
                        changeJob(210);
                        return true;
                    case "220":
                        getClient().send(UIPacket.showInfo("[얼음*번개] 위자드로 전직하였습니다."));
                        changeJob(220);
                        return true;
                    case "230":
                        getClient().send(UIPacket.showInfo("[힐*버프] 클레릭으로 전직하였습니다."));
                        changeJob(230);
                        return true;
                    case "310":
                        getClient().send(UIPacket.showInfo("[사격수] 헌터로 전직하였습니다."));
                        changeJob(310);
                        return true;
                    case "320":
                        getClient().send(UIPacket.showInfo("[명사수] 사수로 전직하였습니다."));
                        changeJob(320);
                        return true;
                    case "410":
                        getClient().send(UIPacket.showInfo("[표창 암살 입문기] 어쌔신로 전직하였습니다."));
                        changeJob(410);
                        return true;
                    case "420":
                        getClient().send(UIPacket.showInfo("[단도 암살 입문기] 시프로 전직하였습니다."));
                        changeJob(420);
                        return true;
                    case "510":
                        getClient().send(UIPacket.showInfo("[너클 입문기] 인파이터로 전직하였습니다."));
                        changeJob(510);
                        return true;
                    case "520":
                        getClient().send(UIPacket.showInfo("[건 입문기] 건슬링거로 전직하였습니다."));
                        changeJob(520);
                        return true;
                    case "430":
                        getClient().send(UIPacket.showInfo("[암흑 속의 과거] 듀어러로 전직하였습니다."));
                        changeJob(431);
                        return true;
                    case "530":
                        getClient().send(UIPacket.showInfo("[캐논 입문기] 캐논슈터로 전직하였습니다."));
                        changeJob(530);
                        return true;
                    case "1110":
                        getClient().send(UIPacket.showInfo("[시그너스 입문기] 빛의 기사로 전직하였습니다."));
                        changeJob(1110);
                        return true;
                    case "1210":
                        getClient().send(UIPacket.showInfo("[시그너스 입문기] 불의 기사로 전직하였습니다."));
                        changeJob(1210);
                        return true;
                    case "1310":
                        getClient().send(UIPacket.showInfo("[시그너스 입문기] 바람의 기사로 전직하였습니다."));
                        changeJob(1310);
                        return true;
                    case "1410":
                        getClient().send(UIPacket.showInfo("[시그너스 입문기] 어둠의 기사로 전직하였습니다."));
                        changeJob(1410);
                        return true;
                    case "1510":
                        getClient().send(UIPacket.showInfo("[시그너스 입문기] 번개의 기사로 전직하였습니다."));
                        changeJob(1510);
                        return true;
                    case "2110":
                        getClient().send(UIPacket.showInfo("[영웅의 본능] 아란으로 전직하였습니다."));
                        changeJob(2110);
                        return true;
                    case "2210":
                        getClient().send(UIPacket.showInfo("[두번째 걸음] 에반으로 전직하였습니다."));
                        changeJob(2211);
                        return true;
                    case "2310":
                        getClient().send(UIPacket.showInfo("[영웅의 본능] 메르세데스로 전직하였습니다."));
                        changeJob(2310);
                        return true;
                    case "2410":
                        getClient().send(UIPacket.showInfo("[영웅의 본능] 팬텀으로 전직하였습니다."));
                        changeJob(2410);
                        return true;
                    case "2510":
                        getClient().send(UIPacket.showInfo("[영웅의 본능] 은월으로 전직하였습니다."));
                        changeJob(2510);
                        return true;
                    case "2710":
                        getClient().send(UIPacket.showInfo("[영웅의 본능] 루미너스로 전직하였습니다."));
                        changeJob(2710);
                        return true;
                    case "3110":
                        getClient().send(UIPacket.showInfo("[레지스탕스 입문기] 데몬슬레이어로 전직하였습니다."));
                        changeJob(3110);
                        return true;
                    case "3120":
                        getClient().send(UIPacket.showInfo("[레지스탕스 입문기] 데몬어벤져로 전직하였습니다."));
                        changeJob(3120);
                        return true;
                    case "3210":
                        getClient().send(UIPacket.showInfo("[레지스탕스 입문기] 배틀메이지로 전직하였습니다."));
                        changeJob(3210);
                        return true;
                    case "3310":
                        getClient().send(UIPacket.showInfo("[레지스탕스 입문기] 와일드헌터로 전직하였습니다."));
                        changeJob(3310);
                        return true;
                    case "3510":
                        getClient().send(UIPacket.showInfo("[레지스탕스 입문기] 메카닉으로 전직하였습니다."));
                        changeJob(3510);
                        return true;
                    case "3610":
                        getClient().send(UIPacket.showInfo("[레지스탕스 입문기] 제논으로 전직하였습니다."));
                        changeJob(3610);
                        return true;
                    case "3710":
                        getClient().send(UIPacket.showInfo("[레지스탕스 입문기] 블래스터으로 전직하였습니다."));
                        changeJob(3710);
                        return true;
                    case "5110":
                        getClient().send(UIPacket.showInfo("[시그너스 단장] 빛의 기사로 전직하였습니다."));
                        changeJob(5110);
                        return true;
                    case "6110":
                        getClient().send(UIPacket.showInfo("[노바 수련생] 카이저로 전직하였습니다."));
                        changeJob(6110);
                        return true;
                    case "6510":
                        getClient().send(UIPacket.showInfo("[노바 수련생] 엔젤릭버스터로 전직하였습니다."));
                        changeJob(6510);
                        return true;
                    case "14200":
                        getClient().send(UIPacket.showInfo("[초능력의 깨달음] 키네시스로 전직하였습니다."));
                        changeJob(14210);
                        return true;
                    default:
                        return true;
                }
            } else if (level == 55) {
                switch (getKeyValue("AutoJob")) {
                    case "430":
                        getClient().send(UIPacket.showInfo("[암흑의 정체성] 듀얼마스터로 전직하였습니다."));
                        changeJob(432);
                        return true;
                    default:
                        return true;
                }
            } else if (level == 60) {
                switch (getKeyValue("AutoJob")) {
                    case "110":
                        getClient().send(UIPacket.showInfo("[영혼 검술의 기사] 크루세이더로 전직하였습니다."));
                        changeJob(111);
                        return true;
                    case "120":
                        getClient().send(UIPacket.showInfo("[속성 검술의 기사] 나이트로 전직하였습니다."));
                        changeJob(121);
                        return true;
                    case "130":
                        getClient().send(UIPacket.showInfo("[드래곤 창술의 기사] 드래곤 나이트로 전직하였습니다."));
                        changeJob(131);
                        return true;
                    case "210":
                        getClient().send(UIPacket.showInfo("[불*독] 메이지로 전직하였습니다."));
                        changeJob(211);
                        return true;
                    case "220":
                        getClient().send(UIPacket.showInfo("[얼음*번개] 메이지로 전직하였습니다."));
                        changeJob(221);
                        return true;
                    case "230":
                        getClient().send(UIPacket.showInfo("[힐*버프] 프리스트로 전직하였습니다."));
                        changeJob(231);
                        return true;
                    case "310":
                        getClient().send(UIPacket.showInfo("[연쇄 사격수] 레인저로 전직하였습니다."));
                        changeJob(311);
                        return true;
                    case "320":
                        getClient().send(UIPacket.showInfo("[백발백중 명사수] 저격수로 전직하였습니다."));
                        changeJob(321);
                        return true;
                    case "410":
                        getClient().send(UIPacket.showInfo("[암살 전문가] 허밋로 전직하였습니다."));
                        changeJob(411);
                        return true;
                    case "420":
                        getClient().send(UIPacket.showInfo("[암흑자] 시프 마스터로 전직하였습니다."));
                        changeJob(421);
                        return true;
                    case "510":
                        getClient().send(UIPacket.showInfo("[드래곤 너클 파이터] 버커니어로 전직하였습니다."));
                        changeJob(511);
                        return true;
                    case "520":
                        getClient().send(UIPacket.showInfo("[건 마스터리] 발키리로 전직하였습니다."));
                        changeJob(521);
                        return true;
                    case "430":
                        getClient().send(UIPacket.showInfo("[암흑을 알아버린자] 슬래셔로 전직하였습니다."));
                        changeJob(433);
                        return true;
                    case "530":
                        getClient().send(UIPacket.showInfo("[캐논 마스터리] 캐논슈터로 전직하였습니다."));
                        changeJob(531);
                        return true;
                    case "2110":
                        getClient().send(UIPacket.showInfo("[영웅의 깨달음] 아란으로 전직하였습니다."));
                        changeJob(2111);
                        return true;
                    case "2210":
                        getClient().send(UIPacket.showInfo("[진화의 드래곤] 에반으로 전직하였습니다."));
                        changeJob(2214);
                        return true;
                    case "2310":
                        getClient().send(UIPacket.showInfo("[영웅의 깨달음] 메르세데스로 전직하였습니다."));
                        changeJob(2311);
                        return true;
                    case "2410":
                        getClient().send(UIPacket.showInfo("[영웅의 깨달음] 팬텀으로 전직하였습니다."));
                        changeJob(2411);
                        return true;
                    case "2510":
                        getClient().send(UIPacket.showInfo("[영웅의 깨달음] 은월으로 전직하였습니다."));
                        changeJob(2511);
                        return true;
                    case "2710":
                        getClient().send(UIPacket.showInfo("[영웅의 깨달음] 루미너스로 전직하였습니다."));
                        changeJob(2711);
                        return true;
                    case "3110":
                        getClient().send(UIPacket.showInfo("[레지스탕스 요원] 데몬슬레이어로 전직하였습니다."));
                        changeJob(3111);
                        return true;
                    case "3120":
                        getClient().send(UIPacket.showInfo("[레지스탕스 요원] 데몬어벤져로 전직하였습니다."));
                        changeJob(3121);
                        return true;
                    case "3210":
                        getClient().send(UIPacket.showInfo("[레지스탕스 요원] 배틀메이지로 전직하였습니다."));
                        changeJob(3211);
                        return true;
                    case "3310":
                        getClient().send(UIPacket.showInfo("[레지스탕스 요원] 와일드헌터로 전직하였습니다."));
                        changeJob(3311);
                        return true;
                    case "3510":
                        getClient().send(UIPacket.showInfo("[레지스탕스 요원] 메카닉으로 전직하였습니다."));
                        changeJob(3511);
                        return true;
                    case "3610":
                        getClient().send(UIPacket.showInfo("[레지스탕스 요원] 제논으로 전직하였습니다."));
                        changeJob(3611);
                        return true;
                    case "3710":
                        getClient().send(UIPacket.showInfo("[레지스탕스 요원] 블래스터로 전직하였습니다."));
                        changeJob(3711);
                        return true;
                    case "5110":
                        getClient().send(UIPacket.showInfo("[시그너스 단장] 빛의 기사로 전직하였습니다."));
                        changeJob(5111);
                        return true;
                    case "6110":
                        getClient().send(UIPacket.showInfo("[노바의 수호자] 카이저로 전직하였습니다."));
                        changeJob(6111);
                        return true;
                    case "6510":
                        getClient().send(UIPacket.showInfo("[노바의 수호자] 엔젤릭버스터로 전직하였습니다."));
                        changeJob(6511);
                        return true;
                    case "1110":
                        getClient().send(UIPacket.showInfo("[시그너스 정식 기사] 소울 마스터로 전직하였습니다."));
                        changeJob(1111);
                        return true;
                    case "1210":
                        getClient().send(UIPacket.showInfo("[시그너스 정식 기사] 플레임 위자드로 전직하였습니다."));
                        changeJob(1211);
                        return true;
                    case "1310":
                        getClient().send(UIPacket.showInfo("[시그너스 정식 기사] 윈드 브레이커로 전직하였습니다."));
                        changeJob(1311);
                        return true;
                    case "1410":
                        getClient().send(UIPacket.showInfo("[시그너스 정식 기사] 나이트 워커로 전직하였습니다."));
                        changeJob(1411);
                        return true;
                    case "1510":
                        getClient().send(UIPacket.showInfo("[시그너스 정식 기사] 스트라이커로 전직하였습니다."));
                        changeJob(1511);
                        return true;
                    case "14200":
                        getClient().send(UIPacket.showInfo("[초능력의 깨달음] 키네시스로 전직하였습니다."));
                        changeJob(14211);
                        return true;
                }
            } else if (level == 100) {
                switch (getKeyValue("AutoJob")) {
                    case "110":
                        getClient().send(UIPacket.showInfo("[연쇄 검술의 마스터] 히어로로 전직하였습니다."));
                        changeJob(112);
                        return true;
                    case "120":
                        getClient().send(UIPacket.showInfo("[환상 검술의 마스터] 팔라딘로 전직하였습니다."));
                        changeJob(122);
                        return true;
                    case "130":
                        getClient().send(UIPacket.showInfo("[다크 드래곤 창술의 마스터] 다크 나이트로 전직하였습니다."));
                        changeJob(132);
                        return true;
                    case "210":
                        getClient().send(UIPacket.showInfo("[불*독 마스터] 아크메이지로 전직하였습니다."));
                        changeJob(212);
                        return true;
                    case "220":
                        getClient().send(UIPacket.showInfo("[얼음*번개 마스터] 아크메이지로 전직하였습니다."));
                        changeJob(222);
                        return true;
                    case "230":
                        getClient().send(UIPacket.showInfo("[힐*버프 마스터] 비숍으로 전직하였습니다."));
                        changeJob(232);
                        return true;
                    case "310":
                        getClient().send(UIPacket.showInfo("[화살 연사의 마스터] 보우 마스터로 전직하였습니다."));
                        changeJob(312);
                        return true;
                    case "320":
                        getClient().send(UIPacket.showInfo("[화살 파워의 마스터] 신궁로 전직하였습니다."));
                        changeJob(322);
                        return true;
                    case "410":
                        getClient().send(UIPacket.showInfo("[연쇄 암살의 마스터] 나이트 로드로 전직하였습니다."));
                        changeJob(412);
                        return true;
                    case "420":
                        getClient().send(UIPacket.showInfo("[암흑의 암살 마스터] 섀도우로 전직하였습니다."));
                        changeJob(422);
                        return true;
                    case "510":
                        getClient().send(UIPacket.showInfo("[정령의 너클 파이터] 바이퍼로 전직하였습니다."));
                        changeJob(512);
                        return true;
                    case "520":
                        getClient().send(UIPacket.showInfo("[배틀 건 마스터리] 캡틴으로 전직하였습니다."));
                        changeJob(522);
                        return true;
                    case "430":
                        getClient().send(UIPacket.showInfo("[암흑을 조정하는자] 듀얼블레이드로 전직하였습니다."));
                        changeJob(434);
                        return true;
                    case "530":
                        getClient().send(UIPacket.showInfo("[파괴의 캐논 마스터리] 캐논슈터로 전직하였습니다."));
                        changeJob(532);
                        return true;
                    case "2110":
                        getClient().send(UIPacket.showInfo("[영웅의 부활] 아란으로 전직하였습니다."));
                        changeJob(2112);
                        return true;
                    case "2210":
                        getClient().send(UIPacket.showInfo("[전설의 드래곤] 에반으로 전직하였습니다."));
                        changeJob(2217);
                        return true;
                    case "2310":
                        getClient().send(UIPacket.showInfo("[영웅의 부활] 메르세데스로 전직하였습니다."));
                        changeJob(2312);
                        return true;
                    case "2410":
                        getClient().send(UIPacket.showInfo("[영웅의 부활] 팬텀으로 전직하였습니다."));
                        changeJob(2412);
                        return true;
                    case "2510":
                        getClient().send(UIPacket.showInfo("[영웅의 부활] 은월으로 전직하였습니다."));
                        changeJob(2512);
                        return true;
                    case "2710":
                        getClient().send(UIPacket.showInfo("[영웅의 부활] 루미너스로 전직하였습니다."));
                        changeJob(2712);
                        return true;
                    case "3110":
                        getClient().send(UIPacket.showInfo("[레지스탕스의 영웅] 데몬슬레이어로 전직하였습니다."));
                        changeJob(3112);
                        return true;
                    case "3120":
                        getClient().send(UIPacket.showInfo("[레지스탕스 영웅] 데몬어벤져로 전직하였습니다."));
                        changeJob(3122);
                        return true;
                    case "3210":
                        getClient().send(UIPacket.showInfo("[레지스탕스의 영웅] 배틀메이지로 전직하였습니다."));
                        changeJob(3212);
                        return true;
                    case "3310":
                        getClient().send(UIPacket.showInfo("[레지스탕스의 영웅] 와일드헌터로 전직하였습니다."));
                        changeJob(3312);
                        return true;
                    case "3510":
                        getClient().send(UIPacket.showInfo("[레지스탕스의 영웅] 메카닉으로 전직하였습니다."));
                        changeJob(3512);
                        return true;
                    case "3610":
                        getClient().send(UIPacket.showInfo("[레지스탕스의 영웅] 제논으로 전직하였습니다."));
                        changeJob(3612);
                        return true;
                    case "3710":
                        getClient().send(UIPacket.showInfo("[레지스탕스의 영웅] 블래스터로 전직하였습니다."));
                        changeJob(3712);
                        return true;
                    case "5110":
                        getClient().send(UIPacket.showInfo("[시그너스 단장] 빛의 기사로 전직하였습니다."));
                        changeJob(5112);
                        return true;
                    case "6110":
                        getClient().send(UIPacket.showInfo("[용의 기사] 카이저로 전직하였습니다."));
                        changeJob(6112);
                        return true;
                    case "6510":
                        getClient().send(UIPacket.showInfo("[전장의 아이돌] 엔젤릭버스터로 전직하였습니다."));
                        changeJob(6512);
                        return true;
                    case "1110":
                        getClient().send(UIPacket.showInfo("[시그너스 영웅] 빛의 대정령으로 전직하였습니다."));
                        changeJob(1112);
                        changeSkillLevel(11121000, (byte) 30, (byte) 30);
                        return true;
                    case "1210":
                        getClient().send(UIPacket.showInfo("[시그너스 영웅] 불의 대정령으로 전직하였습니다."));
                        changeJob(1212);
                        changeSkillLevel(12121000, (byte) 30, (byte) 30);
                        return true;
                    case "1310":
                        getClient().send(UIPacket.showInfo("[시그너스 영웅] 바람의 대정령으로 전직하였습니다."));
                        changeJob(1312);
                        changeSkillLevel(13121000, (byte) 30, (byte) 30);
                        return true;
                    case "1410":
                        getClient().send(UIPacket.showInfo("[시그너스 영웅] 어둠의 대정령으로 전직하였습니다."));
                        changeJob(1412);
                        changeSkillLevel(14121000, (byte) 30, (byte) 30);
                        return true;
                    case "1510":
                        getClient().send(UIPacket.showInfo("[시그너스 영웅] 번개의 대정령으로 전직하였습니다."));
                        changeJob(1512);
                        changeSkillLevel(15121000, (byte) 30, (byte) 30);
                        return true;
                    case "14200":
                        getClient().send(UIPacket.showInfo("[초능력의 영웅] 키네시스로 전직하였습니다."));
                        changeJob(14212);
                        return true;
                }
            }
        }
        return false;
    }

    public int getDamageSkin() {
        final List<MapleQuestStatus> started = getStartedQuests();
        String customdata = "0";
        for (final MapleQuestStatus q : started) {
            if (q.getQuest().getId() == 7291 && q.getCustomData() != null) {
                customdata = q.getCustomData();
            }
        }
        return Integer.parseInt(customdata);
    }

    public void setAuctionMeso(int meso) {
        this.setKeyValue2("AUCTION_Meso", meso);
    }

    public int getBetaClothes() {
        return betaclothes;
    }

    public void pBetaClothes(int value) {
        betaclothes += value;
    }

    public void mBetaClothes(int value) {
        betaclothes -= value;
    }

    public void giveBuff(int skill, int level) {
        SkillFactory.getSkill(skill).getEffect(level).applyTo(getClient().getPlayer());
    }

    public int ForcingItem() {
        return ForcingItem;
    }

    public void setForcingItem(short a) {
        this.ForcingItem = a;
    }

    public void elementalChargeHandler(int Count) {
        this.ELEMENTAL_CHARGE += Count;
        ISkill skill = SkillFactory.getSkill(1200014);
        int skillLevel = getSkillLevel(skill);
        SkillStatEffect effect = getBuffedSkillEffect(BuffStats.CTS_ElementalCharge, 1200014);
        if (effect == null) {
            effect = skill.getEffect(skillLevel);
            System.out.println("ELEMENTAL CHARGE NULL");
        }
        effect.applyTo(this);
    }

    public int GetCount() {
        return ELEMENTAL_CHARGE;
    }

    public void SetSkillid(int id) {
        this.ELEMENTAL_CHARGE_ID = id;
    }

    public int GetSkillid() {
        return ELEMENTAL_CHARGE_ID;
    }

    public byte getBurningCharacter() {
        return burning;
    }

    private int Unity = 0;

    public int Unity() {
        return Unity;
    }

    public void UnityP(boolean reset) {
        if (!reset) {
            Unity += 1;
        } else {
            Unity = 0;
        }
    }

    private int Byper_Energy = 0;
    private boolean Byper_Max = false;

    public boolean Byper_Max() {
        return Byper_Max;
    }

    public void addEnergyCharge(int a) {
        int MaxEnergy = getSkillLevel(5110014) > 0 ? 10000 : 5000;
        if (Byper_Energy + a >= MaxEnergy) {
            Byper_Energy = MaxEnergy;
            Byper_Max = true;
            send(MainPacketCreator.giveEnergyChargeMaximum(getSkillLevel(5120018) > 0 ? 5120018 : getSkillLevel(5110014) > 0 ? 5110014 : getSkillLevel(5100015) > 0 ? 5100015 : 0, MaxEnergy));
            return;
        }
        this.Byper_Energy += a;
        if (Byper_Max) {
            send(MainPacketCreator.giveEnergyChargecooling(getSkillLevel(5120018) > 0 ? 5120018 : getSkillLevel(5110014) > 0 ? 5110014 : getSkillLevel(5100015) > 0 ? 5100015 : 0, Byper_Energy));
        } else {
            send(MainPacketCreator.giveEnergyCharge(getSkillLevel(5120018) > 0 ? 5120018 : getSkillLevel(5110014) > 0 ? 5110014 : getSkillLevel(5100015) > 0 ? 5100015 : 0, Byper_Energy));
        }
    }

    public void MinusEnergyCharge(int a) {
        int MaxEnergy = getSkillLevel(5110014) > 0 ? 10000 : 5000;
        if (Byper_Energy - a < 0) {
            Byper_Energy = 0;
            Byper_Max = false;
            send(MainPacketCreator.giveEnergyCharge(Byper_Energy, MaxEnergy));
            return;
        }
        this.Byper_Energy -= a;
        send(MainPacketCreator.giveEnergyChargecooling(getSkillLevel(5120018) > 0 ? 5120018 : getSkillLevel(5110014) > 0 ? 5110014 : getSkillLevel(5100015) > 0 ? 5100015 : 0, Byper_Energy));
    }

    public int Byper_Energy() {
        return Byper_Energy;
    }

    public int itemstaticcount() {
        return itemstaticcount;
    }

    public int itemstatic1() {
        return itemstatic1;
    }

    public int itemstatic2() {
        return itemstatic2;
    }

    public int itemstatic3() {
        return itemstatic3;
    }

    public int itemstatic4() {
        return itemstatic4;
    }

    public int itemstatic5() {
        return itemstatic5;
    }

    public String scrollstring1() {
        return scrollstring1;
    }

    public String scrollstring2() {
        return scrollstring2;
    }

    public String scrollstring3() {
        return scrollstring3;
    }

    public String scrollstring4() {
        return scrollstring4;
    }

    public String scrollstring5() {
        return scrollstring5;
    }

    public int scrollcount() {
        return scrollcount;
    }

    public int scrollacount() {
        return scrollacount;
    }

    public int scrollorder() {
        return scrollorder;
    }

    public int[] StarPer() {
        return StarPer;
    }

    public List<Pair<EnchantEquipStats, Integer>> stata() {
        return stata;
    }

    public void itemstaticcounts(int a) {
        this.itemstaticcount = a;
    }

    public void itemstatic1s(int a) {
        this.itemstatic1 = a;
    }

    public void itemstatic2s(int a) {
        this.itemstatic2 = a;
    }

    public void itemstatic3s(int a) {
        this.itemstatic3 = a;
    }

    public void itemstatic4s(int a) {
        this.itemstatic4 = a;
    }

    public void itemstatic5s(int a) {
        this.itemstatic5 = a;
    }

    public void scrollstring1s(String a) {
        this.scrollstring1 = a;
    }

    public void scrollstring2s(String a) {
        this.scrollstring2 = a;
    }

    public void scrollstring3s(String a) {
        this.scrollstring3 = a;
    }

    public void scrollstring4s(String a) {
        this.scrollstring4 = a;
    }

    public void scrollstring5s(String a) {
        this.scrollstring5 = a;
    }

    public void scrollcounts(int a) {
        this.scrollcount = a;
    }

    public void scrollacounts(int a) {
        this.scrollacount = a;
    }

    public void scrollorders(int a) {
        this.scrollorder = a;
    }

    public void setFishing(boolean a) {
        this.fishing2 = a;
    }

    public boolean Fishing() {
        return fishing2;
    }

    public void StarPers(int a, int b, int c) {
        this.StarPer[0] = a;
        this.StarPer[1] = b;
        this.StarPer[2] = c;
    }

    public void statas(List<Pair<EnchantEquipStats, Integer>> a) {
        this.stata = a;
    }

    public boolean reincooling() {
        return reincooling;
    }

    public void setReinCooling(boolean c) {
        this.reincooling = c;
    }

    public void checkReincarnation(final long time) {
        if (this.reincarnationTime == -1) {
            this.reincarnationTime = time + 10000;
        } else if (this.reincarnationTime <= time) {
            final ISkill BerserkX = SkillFactory.getSkill(1320016);
            final int skilllevel = getSkillLevel(BerserkX);
            if (skilllevel >= 1 && map != null) {
                client.getSession().writeAndFlush(MainPacketCreator.showSkillEffect(-1, level, 1320016, skilllevel, (byte) 0, 1, null, null));
                map.broadcastMessage(this, MainPacketCreator.showSkillEffect(getId(), level, 1320016, skilllevel, (byte) 0, 1, null, null), false);
            }
            this.reincarnationTime = time + 10000;
        }
    }

    public int getReincarnationCount() {
        return this.reincarnationCount;
    }

    public void resetCheckReincarnationBuff() {
        this.reincarnationCount = 30;
        this.reincarnationMobCount = 30;
    }

    public void checkReincarnationBuff(boolean killMonster) {
        if (killMonster) {
            if (this.reincarnationMobCount > 0) {
                this.reincarnationMobCount--;
            }
            if (this.reincarnationCount > 0) {
                this.reincarnationCount--;
                SkillStatEffect eff = getBuffedSkillEffect(BuffStats.CTS_Reincarnation, 1320019);
                if (eff != null) {
                    eff.applyTo(this);
                }
            }
        } else {
            if (reincarnationCount > 0) {
                this.reincarnationCount--;
                SkillStatEffect eff = getBuffedSkillEffect(BuffStats.CTS_Reincarnation, 1320019);
                if (eff != null) {
                    eff.applyTo(this);
                }
            }
        }
    }

    public void changeSkillLevel_Skip(ISkill skil, int skilLevel, byte masterLevel) {
        final Map<ISkill, SkillEntry> enry = new HashMap<ISkill, SkillEntry>(1);
        enry.put(skil, new SkillEntry((byte) skilLevel, masterLevel, -1L));
        changeSkillLevel_Skip(enry, true);
    }

    public void changeSkillLevel_NoSkip(ISkill skil, int skilLevel, byte masterLevel) {
        final Map<ISkill, SkillEntry> enry = new HashMap<ISkill, SkillEntry>(1);
        enry.put(skil, new SkillEntry((byte) skilLevel, masterLevel, -1L));
        changeSkillLevel_NoSkip(enry, true);
    }

    public void changeSkillLevel_Skip(final Map<ISkill, SkillEntry> skill, final boolean write) { // only used for temporary skills (not saved into db)
        if (skill.isEmpty()) {
            return;
        }
        final Map<ISkill, SkillEntry> newL = new HashMap<>();
        for (final Entry<ISkill, SkillEntry> z : skill.entrySet()) {
            if (z.getKey() == null) {
                continue;
            }
            newL.put(z.getKey(), z.getValue());
            if (z.getValue().skillevel == 0 && z.getValue().masterlevel == 0) {
                if (skills.containsKey(z.getKey())) {
                    skills.remove(z.getKey());
                } else {
                    continue;
                }
            } else {
                skills.put(z.getKey(), z.getValue());
            }
        }
        if (write && !newL.isEmpty()) {
            client.send(MainPacketCreator.updateSkill(this, newL));
        }
    }

    public void changeSkillLevel_NoSkip(final Map<ISkill, SkillEntry> skill, final boolean write) { // only used for temporary skills (not saved into db)
        if (skill.isEmpty()) {
            return;
        }
        final Map<ISkill, SkillEntry> newL = new HashMap<>();
        for (final Entry<ISkill, SkillEntry> z : skill.entrySet()) {
            if (z.getKey() == null) {
                continue;
            }
            newL.put(z.getKey(), z.getValue());
            if ((z.getValue().skillevel == 0 && z.getValue().masterlevel == 0) || (z.getValue().skillevel == -1 && z.getValue().masterlevel == -1)) {
                if (skills.containsKey(z.getKey())) {
                    skills.remove(z.getKey());
                } else {
                    continue;
                }
            } else {
                skills.put(z.getKey(), z.getValue());
            }
        }
        if (write && !newL.isEmpty()) {
            client.send(MainPacketCreator.updateSkill(this, newL));
        }
    }

    public byte getProfessionLevel(int id) {
        int ret = getSkillLevel(id);
        if (ret <= 0) {
            return 0;
        }
        return (byte) ((ret >>> 24) & 0xFF); //the last byte
    }

    public void cancelEffectFromBuffStat(BuffStats stat) {
        cancelEffectFromBuffStat(stat, -1);
    }

    public CalcDamage getCalcDamage() {
        return calcDamage;
    }

    public void addSlimeVirusCount(int i) {
        slimeVirusCount += i;
    }

    public void setSlimeVirusCount(int i) {
        slimeVirusCount = i;
    }

    public int getSlimeVirusCount() {
        return slimeVirusCount;
    }

    public void changeKaiserTransformKey() {
        MapleKeyLayout key = getKeyLayout();
        Integer k = null;
        if (this.isFinalFiguration) {
            for (Entry<Integer, MapleKeyBinding> lay : key.Layout().entrySet()) {
                if (lay.getValue().getAction() == 53) {
                    k = lay.getKey();
                    break;
                }
            }
            if (k != null) {
                if (getSkillLevel(61111114) == 0) {
                    changeSkillLevel(61111114, (byte) 1, (byte) 1);
                }
                key.Layout().get(k).setAction(61111114);
                key.Layout().get(k).setType(1);
            }
        } else {
            for (Entry<Integer, MapleKeyBinding> lay : key.Layout().entrySet()) {
                if (lay.getValue().getAction() == 61111114) {
                    k = lay.getKey();
                    break;
                }
            }
            if (k != null) {
                if (getSkillLevel(61111114) != 0) {
                    changeSkillLevel(61111114, (byte) 0, (byte) 0);
                }
                key.Layout().get(k).setAction(53);
                key.Layout().get(k).setType(5);
            }
        }
        send(MainPacketCreator.getKeymap(key));
    }

    public Map<Integer, Integer> getLinkSkill() {
        Map skilllist = new HashMap();
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement(new StringBuilder().append("SELECT * FROM link_skill WHERE cid = ").append(this.id).toString());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                skilllist.put(rs.getInt("skillid"), rs.getInt("link_cid"));
            }
            ps.close();
            rs.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return skilllist;
    }

    public Map<Integer, Integer> getLinkSkillLevel() {
        Map skilllist = new HashMap();
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement(new StringBuilder().append("SELECT * FROM link_skill WHERE cid = ").append(this.id).toString());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                skilllist.put(rs.getInt("skillid"), rs.getInt("skilllevel"));
            }
            ps.close();
            rs.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
        return skilllist;
    }

    public void setWarpRand(int i) {
        this.WarpRand = i;
    }

    public int getWarpRand() {
        return this.WarpRand;
    }

    public void setDamageMeter(long i) {
        this.DamageMeter_ = i;
    }

    public void addDamageMeter(long i) {
        this.DamageMeter_ += i;
    }

    public long getDamageMeter() {
        return this.DamageMeter_;
    }

    public void removeAllEquip(int id, boolean show) {
        MapleInventoryType type = GameConstants.getInventoryType(id);
        int possessed = getInventory(type).countById(id);

        if (possessed > 0) {
            InventoryManipulator.removeById(getClient(), type, id, possessed, true, false);
            if (show) {
                getClient().getSession().writeAndFlush(MainPacketCreator.getShowItemGain(id, (short) -possessed, true));
            }
        }
        if (type == MapleInventoryType.EQUIP) { //check equipped
            type = MapleInventoryType.EQUIPPED;
            possessed = getInventory(type).countById(id);

            if (possessed > 0) {
                IItem equip = getInventory(type).findById(id);
                if (equip != null) {
                    getInventory(type).removeSlot(equip.getPosition());
                    equipChanged();
                    getClient().getSession().writeAndFlush(MainPacketCreator.dropInventoryItem(MapleInventoryType.EQUIP, equip.getPosition()));
                }
            }
        }
    }

    public void giveLP() {
        loginpoint += (!getMap().getAllMonster().isEmpty() ? 2 : 1);
        getClient().getSession().writeAndFlush(MainPacketCreator.OnAddPopupSay(9062000, 3000, "접속후 60분이 지나 로그인 포인트" + (getMap().getAllMonster().size() != 0 ? 2 : 1) + "점이 적립되었습니다.", ""));
        dropMessage(5, "접속후 60분이 지나 로그인 포인트" + (!getMap().getAllMonster().isEmpty() ? 2 : 1) + "점이 적립되었습니다.");
    }

    public long getLT() {
        return logintimer;
    }

    public int getLoginPoint() {
        return loginpoint;
    }

    public void addLoginPoint(int i) {
        this.loginpoint += i;
    }

    public boolean isEA() {
        return System.currentTimeMillis() >= eaTime;
    }

    public void updateEA() {
        eaTime = System.currentTimeMillis() + 5000;
        send(MainPacketCreator.SkillUseResult(0));
    }

    public void updateChar() {
        MapleMap currentMap = getMap();
        currentMap.removePlayer(this);
        currentMap.addPlayer(this);
    }

    private boolean dominant = false;

    public boolean isDominant() {
        return dominant;
    }

    public void setDominant(boolean value) {
        this.dominant = value;
    }

    public void reloadChar() {
        fakeRelog();
        updateChar();
    }

    public boolean canHold(final int itemid) {
        return getInventory(GameConstants.getInventoryType(itemid)).getNextFreeSlot() > -1;
    }

    private long marritime = 0;
    private int mcid = 0;
    private String mname = "";
    private int mringid = 0;

    public void setMarri(final String pname, final int pcid, final long time, final int ringid) {
        mname = pname;
        mcid = pcid;
        marritime = time;
        mringid = ringid;
    }

    public void saveMarri() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("INSERT INTO marri (cid, pid, time, pname, ringid) VALUES (?, ?, ?, ?, ?)");
            ps.setInt(1, id);
            ps.setInt(2, mcid);
            ps.setLong(3, System.currentTimeMillis());
            ps.setString(4, mname);
            ps.setInt(5, mringid);
            ps.executeUpdate();
            ps.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public void loadMarri() {
        try {
            Connection con = MYSQL.getConnection();
            PreparedStatement ps = con.prepareStatement("SELECT * FROM marri WHERE cid = " + id);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                mcid = rs.getInt("pid");
                marritime = rs.getLong("time");
                mname = rs.getString("pname");
                mringid = rs.getInt("ringid");
            }
            ps.close();
            rs.close();
            con.close();
        } catch (SQLException ex) {
            ex.printStackTrace();
        }
    }

    public int getMid() {
        return mcid;
    }

    public long getMarriTime() {
        return marritime;
    }

    public String getMName() {
        return mname;
    }

    public int getMringId() {
        return mringid;
    }

    public void PVP_Revive() {
        getStat().setHp(0, this);
        updateSingleStat(PlayerStat.HP, 0);

        send(UIPacket.detailShowInfo("8초뒤 부활합니다", false));
        send(MainPacketCreator.serverNotice(6, "8초뒤 부활합니다."));
        BuffTimer.getInstance().schedule(new Runnable() {
            @Override
            public void run() {
                getStat().setHp(getStat().getMaxHp(), client.getPlayer());
                updateSingleStat(PlayerStat.HP, getStat().getMaxHp());
                getClient().send(UIPacket.showWZEffect("Effect/PvPEff.img/Heal", 1));
            }
        }, 8100);
    }

    private int wreckageCount = 0;
    private int shadowBatMobCount = 3;
    private int shadowAttackCount = 0;
    private int nightWalkerAttackCount = 0;

    public int getWreckageCount() {
        return wreckageCount;
    }

    public void setWreckageCount(int wreckageCount) {
        this.wreckageCount = wreckageCount;
    }

    public int incAndGetWreckageCount() {
        return ++this.wreckageCount;
    }

    public int decAndGetWreckageCount() {
        return --this.wreckageCount;
    }

    public int getShadowBatMobCount() {
        return shadowBatMobCount;
    }

    public void setShadowBatMobCount(int shadowBatMobCount) {
        this.shadowBatMobCount = shadowBatMobCount;
    }

    public int getShadowAttackCount() {
        return shadowAttackCount;
    }

    public void setShadowAttackCount(int attackCount) {
        this.shadowAttackCount = attackCount;
    }

    public int getNightWalkerAttackCount() {
        return nightWalkerAttackCount;
    }

    public void setNightWalkerAttackCount(int nightWalkerAttackCount) {
        this.nightWalkerAttackCount = nightWalkerAttackCount;
    }

    /*    public void removeLinkSkill(final int n, final int n2) {
        Statement prepareStatement = null;
        ResultSet executeQuery = null;
        try {
            final Connection connection;
            if ((executeQuery = ((PreparedStatement)(prepareStatement = (connection = DatabaseConnection.getConnection()).prepareStatement("SELECT * FROM linkskill WHERE skillid = " + n + " AND linking_cid = " + n2))).executeQuery()).next()) {
                connection.prepareStatement("DELETE FROM linkskill WHERE skillid = " + n + " AND linking_cid = " + n2).execute();
            }
            try {
                prepareStatement.close();
                executeQuery.close();
            }
            catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
        catch (SQLException ex2) {
            ex2.printStackTrace();
            try {
                prepareStatement.close();
                executeQuery.close();
            }
            catch (SQLException ex3) {
                ex3.printStackTrace();
            }
        }
        finally {
            try {
                prepareStatement.close();
                executeQuery.close();
            }
            catch (SQLException ex4) {
                ex4.printStackTrace();
            }
        }
    }
    
    public void LinkSkill(final LinkSkill linkSkill) {
        final LinkSkill linkSkill2 = new LinkSkill(this.getClient().getAccID(), linkSkill.getRealSkillId(), linkSkill.getSkillId(), linkSkill.getLinkingCid(), this.getId(), linkSkill.getSkillLevel(), linkSkill.getTime());
        this.addLinkSkill(linkSkill2);
        this.getClient().send(CWvsContext.ChangeLinkSkillState(linkSkill.getSkillId(), true));
        this.getClient().send(CWvsContext.LinkedSkill(linkSkill2));
    }
    
    public void UnLinkSkill(final LinkSkill linkSkill) {
        final LinkSkill linkSkill2 = new LinkSkill(this.getClient().getAccID(), linkSkill.getRealSkillId(), linkSkill.getSkillId(), linkSkill.getLinkingCid(), linkSkill.getLinkingCid(), linkSkill.getSkillLevel(), linkSkill.getTime());
        this.addLinkSkill(linkSkill2);
        this.getClient().send(CWvsContext.ChangeLinkSkillState(linkSkill.getSkillId(), false));
        this.getClient().send(CWvsContext.UnLinkedSkill(linkSkill2.getSkillId(), linkSkill2.getLinkedCid()));
    }
    
    public void addLinkSkill(final LinkSkill linkSkill) {
        PreparedStatement prepareStatement = null;
        try {
            this.removeLinkSkill(linkSkill.getSkillId(), linkSkill.getLinkingCid());
            (prepareStatement = DatabaseConnection.getConnection().prepareStatement("INSERT INTO linkskill (accid, realskillid, skillid, linking_cid, linked_cid, skilllevel, time) VALUES (?, ?, ?, ?, ?, ?, ?)")).setInt(1, linkSkill.getAccId());
            prepareStatement.setInt(2, linkSkill.getRealSkillId());
            prepareStatement.setInt(3, linkSkill.getSkillId());
            prepareStatement.setInt(4, linkSkill.getLinkingCid());
            prepareStatement.setInt(5, linkSkill.getLinkedCid());
            prepareStatement.setInt(6, linkSkill.getSkillLevel());
            prepareStatement.setLong(7, linkSkill.getTime());
            prepareStatement.execute();
            try {
                prepareStatement.close();
            }
            catch (SQLException ex) {
                ex.printStackTrace();
            }
        }
        catch (SQLException ex2) {
            ex2.printStackTrace();
            try {
                prepareStatement.close();
            }
            catch (SQLException ex3) {
                ex3.printStackTrace();
            }
        }
        finally {
            try {
                prepareStatement.close();
            }
            catch (SQLException ex4) {
                ex4.printStackTrace();
            }
        }
    }
    
    public List getLinkSkill(final boolean b, final boolean b2, final boolean b3) {
        final ArrayList<LinkSkill> list = new ArrayList<LinkSkill>();
        try {
            final Connection connection = DatabaseConnection.getConnection();
            PreparedStatement preparedStatement;
            if (b) {
                preparedStatement = connection.prepareStatement("SELECT * FROM linkskill WHERE accid = " + this.getClient().getAccID());
            }
            else if (b2) {
                preparedStatement = connection.prepareStatement("SELECT * FROM linkskill WHERE linking_cid = " + this.getId());
            }
            else {
                preparedStatement = connection.prepareStatement("SELECT * FROM linkskill WHERE linked_cid = " + this.getId());
            }
            final ResultSet executeQuery = preparedStatement.executeQuery();
            while (executeQuery.next()) {
                if (!b2 && b3) {
                    if (executeQuery.getInt("linked_cid") != this.getId() || executeQuery.getInt("skilllevel") <= 1) {
                        continue;
                    }
                    list.add(new LinkSkill(executeQuery.getInt("accid"), executeQuery.getInt("realskillid"), executeQuery.getInt("skillid"), executeQuery.getInt("linking_cid"), executeQuery.getInt("linked_cid"), executeQuery.getInt("skilllevel"), executeQuery.getLong("time")));
                }
                else if (!b && !b2 && !b3) {
                    if (this.getId() == executeQuery.getInt("linking_cid")) {
                        continue;
                    }
                    list.add(new LinkSkill(executeQuery.getInt("accid"), executeQuery.getInt("realskillid"), executeQuery.getInt("skillid"), executeQuery.getInt("linking_cid"), executeQuery.getInt("linked_cid"), executeQuery.getInt("skilllevel"), executeQuery.getLong("time")));
                }
                else {
                    if (executeQuery.getInt("skilllevel") <= 1) {
                        continue;
                    }
                    list.add(new LinkSkill(executeQuery.getInt("accid"), executeQuery.getInt("realskillid"), executeQuery.getInt("skillid"), executeQuery.getInt("linking_cid"), executeQuery.getInt("linked_cid"), executeQuery.getInt("skilllevel"), executeQuery.getLong("time")));
                }
            }
            executeQuery.close();
            preparedStatement.close();
        }
        catch (SQLException ex) {
            ex.printStackTrace();
        }
        return list;
    }
    
    public void gainLinkSkill() {
        LinkSkill linkSkill = null;
        final int linkSkill2 = GameConstants.getLinkSkill(this.getJob());
        int n = (this.level >= 120) ? 2 : ((this.level >= 70) ? 1 : 0);
        if (linkSkill2 == 100000271) {
            n = ((this.level >= 200) ? 5 : ((this.level >= 190) ? 4 : ((this.level >= 180) ? 3 : ((this.level >= 170) ? 2 : ((this.level >= 160) ? 1 : 0)))));
        }
        if (linkSkill2 != -1) {
            final int linkSkillId = this.getLinkSkillId(linkSkill2);
            final Iterator<LinkSkill> iterator = this.getLinkSkill(false, true, false).iterator();
            while (iterator.hasNext()) {
                final LinkSkill linkSkill3;
                if ((linkSkill3 = iterator.next()).checkInfo(linkSkillId, this.getId())) {
                    if (n == linkSkill3.getSkillLevel()) {
                        return;
                    }
                    linkSkill = new LinkSkill(this.getClient().getAccID(), linkSkill2, linkSkillId, this.getId(), linkSkill3.getLinkedCid(), n, linkSkill3.getTime());
                    break;
                }
            }
            if (linkSkill == null) {
                linkSkill = new LinkSkill(this.getClient().getAccID(), linkSkill2, linkSkillId, this.getId(), this.getId(), n, System.currentTimeMillis() - 86400000L);
            }
            this.addLinkSkill(linkSkill);
            this.getClient().send(CWvsContext.updateLinkSkill(linkSkill.getRealSkillId(), linkSkill.getLinkingCid(), -1, linkSkill.getTime()));
        }
    }
    
    public int getLinkSkillId(final int n) {
        final String skillName = SkillFactory.getSkillName(n);
        final MapleData data = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz")).getData("Skill.img");
        final LinkedList<Pair> list = new LinkedList<Pair>();
        for (final MapleData mapleData : data.getChildren()) {
            list.add(new Pair(Integer.parseInt(mapleData.getName()), MapleDataTool.getString(mapleData.getChildByPath("name"), "NO-NAME")));
        }
        final Iterator<Object> iterator2 = list.iterator();
        while (iterator2.hasNext()) {
            final Pair pair;
            if (((String)(pair = iterator2.next()).getRight()).toLowerCase().equals(skillName) && n != (int)pair.left && (int)pair.left >= 80000000 && (int)pair.left <= 90000000) {
                return (int)pair.left;
            }
        }
        return -1;
    }*/
}
