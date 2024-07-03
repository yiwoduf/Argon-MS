/*
 * 테스피아 Project
 * ==================================
 * 어비스 abyss_min@nate.com
 * 어비스 abyss_min@nate.com
 * ==================================
 * 
 */
package server.items;

import client.MapleClient;
import client.MapleCharacter;
import client.items.*;
import client.skills.SkillStatEffect;
import constants.GameConstants;
import constants.ServerConstants;
import database.MYSQL;

import java.sql.SQLException;

import provider.*;
import server.items.StructSetItem.SetItem;
import tools.Pair;
import tools.RandomStream.Randomizer;
import tools.StringUtil;

import java.io.File;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.*;
import java.util.Map.Entry;

import launch.world.WorldBroadcasting;
import packet.creators.UIPacket;

public class ItemInformation {

    private final static ItemInformation instance = new ItemInformation();
    public final MapleDataProvider etcData = MapleDataProviderFactory.getDataProvider(new File("Property/wz/Etc.wz"));
    public final MapleDataProvider itemData = MapleDataProviderFactory.getDataProvider(new File("Property/wz/Item.wz"));
    protected final MapleDataProvider equipData = MapleDataProviderFactory.getDataProvider(new File("Property/wz/Character.wz"));
    protected final MapleDataProvider stringData = MapleDataProviderFactory.getDataProvider(new File("Property/wz/String.wz"));
    protected final MapleData cashStringData = stringData.getData("Cash.img");
    protected final MapleData consumeStringData = stringData.getData("Consume.img");
    protected final MapleData eqpStringData = stringData.getData("Eqp.img");
    protected final MapleData etcStringData = stringData.getData("Etc.img");
    protected final MapleData insStringData = stringData.getData("Ins.img");
    protected final MapleData petStringData = stringData.getData("Pet.img");
    protected final Map<Integer, Short> slotMaxCache = new HashMap<Integer, Short>();
    protected final Map<Integer, SkillStatEffect> itemEffects = new HashMap<Integer, SkillStatEffect>();
    protected final Map<Integer, Map<String, Integer>> equipStatsCache = new HashMap<Integer, Map<String, Integer>>();
    protected final Map<Integer, Map<String, Byte>> itemMakeStatsCache = new HashMap<Integer, Map<String, Byte>>();
    protected final Map<Integer, Map<Integer, StructEquipLevel>> equipLevelCache = new HashMap<Integer, Map<Integer, StructEquipLevel>>();
    protected final Map<Integer, Integer> equipLevelMaxLevel = new HashMap<Integer, Integer>();
    protected final Map<Integer, Short> itemMakeLevel = new HashMap<Integer, Short>();
    protected final Map<Integer, Equip> equipCache = new HashMap<Integer, Equip>();
    protected final Map<Integer, Double> priceCache = new HashMap<Integer, Double>();
    protected final Map<Integer, Integer> successCache = new HashMap<Integer, Integer>();
    protected final Map<Integer, Integer> cursedCache = new HashMap<Integer, Integer>();
    protected final Map<Integer, Integer> wholePriceCache = new HashMap<Integer, Integer>();
    protected final Map<Integer, Integer> projectileWatkCache = new HashMap<Integer, Integer>();
    protected final Map<Integer, Integer> monsterBookID = new HashMap<Integer, Integer>();
    protected final Map<Integer, String> nameCache = new HashMap<Integer, String>();
    protected final Map<Integer, String> descCache = new HashMap<Integer, String>();
    protected final Map<Integer, String> msgCache = new HashMap<Integer, String>();
    protected final Map<Integer, Map<String, Integer>> SkillStatsCache = new HashMap<Integer, Map<String, Integer>>();
    protected final Map<Integer, Byte> consumeOnPickupCache = new HashMap<Integer, Byte>();
    protected final Map<Integer, Byte> runOnPickupCache = new HashMap<Integer, Byte>();
    protected final Map<Integer, Boolean> dropRestrictionCache = new HashMap<Integer, Boolean>();
    protected final Map<Integer, Boolean> expirationOnLogOutCache = new HashMap<Integer, Boolean>();
    protected final Map<Integer, Boolean> pickupRestrictionCache = new HashMap<Integer, Boolean>();
    protected final Map<Integer, Integer> stateChangeCache = new HashMap<Integer, Integer>(40);
    protected final Map<Integer, Integer> karmaEnabledCache = new HashMap<Integer, Integer>();
    protected final Map<Integer, Integer> scrollUpgradeSlotUse = new HashMap<Integer, Integer>();
    protected final Map<Integer, Boolean> isQuestItemCache = new HashMap<Integer, Boolean>();
    protected final Map<Integer, List<Pair<Integer, Integer>>> summonMobCache = new HashMap<Integer, List<Pair<Integer, Integer>>>();
    protected final List<Pair<Integer, String>> itemNameCache = new ArrayList<Pair<Integer, String>>();
    protected final Map<Integer, Boolean> accCache = new HashMap<Integer, Boolean>();
    public final Map<Integer, StructSetItem> setItems = new HashMap();
    public final Map<Integer, List<StructPotentialItem>> potentialCache = new HashMap<Integer, List<StructPotentialItem>>();
    protected final Map<Integer, Pair<Integer, List<StructRewardItem>>> RewardItem = new HashMap<Integer, Pair<Integer, List<StructRewardItem>>>();
    protected Map<Integer, Integer> scriptedItemCache = new HashMap<Integer, Integer>();
    protected Map<Integer, Integer> androidCache = new HashMap<Integer, Integer>();
    protected Map<Integer, Integer> bagTypeCache = new HashMap<Integer, Integer>();
    protected List<Integer> nonLevelEquip = new LinkedList<Integer>();
    protected List<Integer> incSkill = null;
    protected Map<Integer, BasicAndroid> androidBasicCache = new HashMap<Integer, BasicAndroid>();
    protected Map<Integer, String> scriptedItemScriptCache = new HashMap<Integer, String>();
    public Map<Integer, PotentialOption> potentialOpCache = new HashMap<Integer, PotentialOption>();
    protected Map<Integer, MapleInventoryType> inventoryTypeCache = new HashMap<Integer, MapleInventoryType>();
    protected Map<Integer, Integer> mipCache = new HashMap<Integer, Integer>();
    private short slotMax;
    protected Map<Integer, Map<String, Integer>> equipStats = null;

    protected ItemInformation() {
        cache();
    }

    public static ItemInformation getInstance() {
        return instance;
    }

    private void cache() {
        cachePotentialItems();
        cachePotentialOption();
        cacheSetItems();
    }

    private void cacheItemsFromList(List<Pair<Integer, String>> pair) {
        for (Pair<Integer, String> p : pair) {
            getItemData(p.getLeft());
        }
    }

    /*
     * type -
     * 0 : 전체
     * 10 : 무기
     * 11 : 무기 제외
     * 20 : 방패
     * 40 : 악세사리
     * 51 : 투구
     * 52 : 상의, 한벌옷
     * 53 : 하의
     * 54 : 장갑
     * 55 : 신발
     */
    public void cachePotentialOption() {
        final MapleData potsData = itemData.getData("ItemOption.img");
        for (MapleData data : potsData) {
            int potentialID = Integer.parseInt(data.getName());
            int type = MapleDataTool.getIntConvert("info/optionType", data, 0);
            int level = 0;
            Map<Integer, List<Integer>> option = new HashMap<Integer, List<Integer>>();
            List<Integer> id = new ArrayList<Integer>(100);
            switch (potentialID) {
                case 31001:
                case 31002:
                case 31003:
                case 31004:
                case 60002:
                    continue;
            }
            if (potentialID > 0 && potentialID < 906) { //1단계 옵션
                level = 1;
            } else if ((potentialID > 10000 && potentialID < 10292) || (potentialID > 20000 && potentialID < 20015)
                    || (potentialID > 30000 && potentialID < 30015) || (potentialID > 40000 && potentialID < 40015)) { //2단계 옵션
                level = 2;
            } else if (potentialID > 20040 && potentialID < 20407) { //3단계 옵션
                level = 3;
            } else if (potentialID > 30040 && potentialID < 31005) { //4단계 옵션
                level = 4;
            } else if (potentialID > 40040 && potentialID < 60004) { //5단계 옵션
                level = 5;
            }
            if (potentialOpCache.containsKey(level)) {
                if (potentialOpCache.get(level).getPotentialOption().get(type) != null) {
                    id = potentialOpCache.get(level).getPotentialOption().get(type);
                }
                id.add(potentialID);
                potentialOpCache.get(level).getPotentialOption().put(type, id);
            } else {
                id.add(potentialID);
                option.put(type, id);
                potentialOpCache.put(level, new PotentialOption(option));
            }
        }
    }

    public void cachePotentialItems() {
        final MapleData potsData = itemData.getData("ItemOption.img");
        StructPotentialItem item;
        List<StructPotentialItem> items;
        for (MapleData data : potsData) {
            items = new LinkedList<StructPotentialItem>();
            for (MapleData level : data.getChildByPath("level")) {
                item = new StructPotentialItem();
                item.optionType = MapleDataTool.getIntConvert("info/optionType", data, 0);
                item.reqLevel = MapleDataTool.getIntConvert("info/reqLevel", data, 0);
                item.weight = MapleDataTool.getIntConvert("info/weight", data, 0);
                item.string = MapleDataTool.getString("info/string", level, "");
                item.face = MapleDataTool.getString("face", level, "");
                item.boss = MapleDataTool.getIntConvert("boss", level, 0) > 0;
                item.potentialID = Integer.parseInt(data.getName());
                item.attackType = (short) MapleDataTool.getIntConvert("attackType", level, 0);
                item.incMHP = (short) MapleDataTool.getIntConvert("incMHP", level, 0);
                item.incMMP = (short) MapleDataTool.getIntConvert("incMMP", level, 0);
                item.incSTR = (byte) MapleDataTool.getIntConvert("incSTR", level, 0);
                item.incDEX = (byte) MapleDataTool.getIntConvert("incDEX", level, 0);
                item.incINT = (byte) MapleDataTool.getIntConvert("incINT", level, 0);
                item.incLUK = (byte) MapleDataTool.getIntConvert("incLUK", level, 0);
                item.incACC = (byte) MapleDataTool.getIntConvert("incACC", level, 0);
                item.incEVA = (byte) MapleDataTool.getIntConvert("incEVA", level, 0);
                item.incSpeed = (byte) MapleDataTool.getIntConvert("incSpeed", level, 0);
                item.incJump = (byte) MapleDataTool.getIntConvert("incJump", level, 0);
                item.incPAD = (byte) MapleDataTool.getIntConvert("incPAD", level, 0);
                item.incMAD = (byte) MapleDataTool.getIntConvert("incMAD", level, 0);
                item.incPDD = (byte) MapleDataTool.getIntConvert("incPDD", level, 0);
                item.incMDD = (byte) MapleDataTool.getIntConvert("incMDD", level, 0);
                item.prop = (byte) MapleDataTool.getIntConvert("prop", level, 0);
                item.time = (byte) MapleDataTool.getIntConvert("time", level, 0);
                item.incSTRr = (byte) MapleDataTool.getIntConvert("incSTRr", level, 0);
                item.incDEXr = (byte) MapleDataTool.getIntConvert("incDEXr", level, 0);
                item.incINTr = (byte) MapleDataTool.getIntConvert("incINTr", level, 0);
                item.incLUKr = (byte) MapleDataTool.getIntConvert("incLUKr", level, 0);
                item.incMHPr = (byte) MapleDataTool.getIntConvert("incMHPr", level, 0);
                item.incMMPr = (byte) MapleDataTool.getIntConvert("incMMPr", level, 0);
                item.incACCr = (byte) MapleDataTool.getIntConvert("incACCr", level, 0);
                item.incEVAr = (byte) MapleDataTool.getIntConvert("incEVAr", level, 0);
                item.incPADr = (byte) MapleDataTool.getIntConvert("incPADr", level, 0);
                item.incMADr = (byte) MapleDataTool.getIntConvert("incMADr", level, 0);
                item.incPDDr = (byte) MapleDataTool.getIntConvert("incPDDr", level, 0);
                item.incMDDr = (byte) MapleDataTool.getIntConvert("incMDDr", level, 0);
                item.incCr = (byte) MapleDataTool.getIntConvert("incCr", level, 0);
                item.incDAMr = (byte) MapleDataTool.getIntConvert("incDAMr", level, 0);
                item.RecoveryHP = (byte) MapleDataTool.getIntConvert("RecoveryHP", level, 0);
                item.RecoveryMP = (byte) MapleDataTool.getIntConvert("RecoveryMP", level, 0);
                item.HP = (byte) MapleDataTool.getIntConvert("HP", level, 0);
                item.MP = (byte) MapleDataTool.getIntConvert("MP", level, 0);
                item.level = (byte) MapleDataTool.getIntConvert("level", level, 0);
                item.ignoreTargetDEF = (byte) MapleDataTool.getIntConvert("ignoreTargetDEF", level, 0);
                item.ignoreDAM = (byte) MapleDataTool.getIntConvert("ignoreDAM", level, 0);
                item.DAMreflect = (byte) MapleDataTool.getIntConvert("DAMreflect", level, 0);
                item.mpconReduce = (byte) MapleDataTool.getIntConvert("mpconReduce", level, 0);
                item.mpRestore = (byte) MapleDataTool.getIntConvert("mpRestore", level, 0);
                item.incMesoProp = (byte) MapleDataTool.getIntConvert("incMesoProp", level, 0);
                item.incRewardProp = (byte) MapleDataTool.getIntConvert("incRewardProp", level, 0);
                item.incAllskill = (byte) MapleDataTool.getIntConvert("incAllskill", level, 0);
                item.ignoreDAMr = (byte) MapleDataTool.getIntConvert("ignoreDAMr", level, 0);
                item.RecoveryUP = (byte) MapleDataTool.getIntConvert("RecoveryUP", level, 0);
                switch (item.potentialID) {
                    case 31001:
                    case 31002:
                    case 31003:
                    case 31004:
                        //      item.skillID = (short) (item.potentialID - 23001);
                        item.skillID = 0;
                        break;
                    default:
                        item.skillID = 0;
                        break;
                }
                items.add(item);
            }
            potentialCache.put(Integer.parseInt(data.getName()), items);
        }
    }

    public final Integer getSetItemID(final int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("setItemID")) {
            return 0;
        }
        return getEquipStats(itemId).get("setItemID");
    }

    public final List<Integer> getEquipSkills(final int itemId) {
        if (getEquipStats(itemId) == null) {
            return null;
        }
        if (incSkill == null) {
            incSkill = new ArrayList<Integer>();
            final MapleData iz = getItemData(itemId);
            final MapleData dat = iz.getChildByPath("info/level/case");
            if (dat != null) {
                for (MapleData info : dat) {
                    for (MapleData data : info) {
                        if (data.getName().length() == 1 && data.getChildByPath("Skill") != null) {
                            for (MapleData skil : data.getChildByPath("Skill")) {
                                int incSkillz = MapleDataTool.getIntConvert("id", skil, 0);
                                if (incSkillz != 0) {
                                    incSkill.add(incSkillz);
                                }
                            }
                        }
                    }
                }
            }
        }
        return incSkill;
    }

    public final Map<Integer, Map<String, Integer>> getEquipIncrements(final int itemId) {
        if (getEquipStats(itemId) == null) {
            return null;
        }
        if (equipStats == null) {
            equipStats = new HashMap<Integer, Map<String, Integer>>();
            equipStats.put(-1, new HashMap<String, Integer>());
            final MapleData iz = getItemData(itemId);
            final MapleData dat = iz.getChildByPath("mob");
            if (dat != null) {
                for (MapleData child : dat) {
                    equipStats.get(-1).put("mob" + MapleDataTool.getIntConvert("id", child, 0), MapleDataTool.getIntConvert("prob", child, 0));
                }
            }
        }
        return equipStats;
    }

    public void cacheSetItems() {
        final MapleData setsData = etcData.getData("SetItemInfo.img");
        StructSetItem itemz;
        SetItem itez;
        for (MapleData dat : setsData) {
            itemz = new StructSetItem();
            itemz.setItemID = (short) Short.parseShort(dat.getName());
            itemz.completeCount = (byte) MapleDataTool.getIntConvert("completeCount", dat, 0);
            for (MapleData level : dat.getChildByPath("Effect")) {
                itez = new SetItem();
                itez.incPDD = MapleDataTool.getIntConvert("incPDD", level, 0);
                itez.incMDD = MapleDataTool.getIntConvert("incMDD", level, 0);
                itez.incSTR = MapleDataTool.getIntConvert("incSTR", level, 0);
                itez.incDEX = MapleDataTool.getIntConvert("incDEX", level, 0);
                itez.incINT = MapleDataTool.getIntConvert("incINT", level, 0);
                itez.incLUK = MapleDataTool.getIntConvert("incLUK", level, 0);
                itez.incACC = MapleDataTool.getIntConvert("incACC", level, 0);
                itez.incPAD = MapleDataTool.getIntConvert("incPAD", level, 0);
                itez.incMAD = MapleDataTool.getIntConvert("incMAD", level, 0);
                itez.incSpeed = MapleDataTool.getIntConvert("incSpeed", level, 0);
                itez.incMHP = MapleDataTool.getIntConvert("incMHP", level, 0);
                itez.incMMP = MapleDataTool.getIntConvert("incMMP", level, 0);
                itez.incMHPr = MapleDataTool.getIntConvert("incMHPr", level, 0);
                itez.incMMPr = MapleDataTool.getIntConvert("incMMPr", level, 0);
                itez.incAllStat = MapleDataTool.getIntConvert("incAllStat", level, 0);
                itez.option1 = MapleDataTool.getIntConvert("Option/1/option", level, 0);
                itez.option2 = MapleDataTool.getIntConvert("Option/2/option", level, 0);
                itez.option1Level = MapleDataTool.getIntConvert("Option/1/level", level, 0);
                itez.option2Level = MapleDataTool.getIntConvert("Option/2/level", level, 0);
                itemz.items.put(Integer.parseInt(level.getName()), itez);
            }
            setItems.put(itemz.setItemID, itemz);
        }
    }

    public final Integer getSetItemId(int itemId) {
        if (getEquipStats(itemId) == null || !getEquipStats(itemId).containsKey("setItemID")) {
            return 0;
        }
        return getEquipStats(itemId).get("setItemID");
    }

    public final StructSetItem getSetItem(final int setItemId) {
        return setItems.get(setItemId);
    }

    public final List<Pair<Integer, String>> getAllItems() {
        if (!itemNameCache.isEmpty()) {
            return itemNameCache;
        }
        final List<Pair<Integer, String>> itemPairs = new ArrayList<Pair<Integer, String>>();
        MapleData itemsData;

        itemsData = stringData.getData("Cash.img");
        for (final MapleData itemFolder : itemsData.getChildren()) {
            itemPairs.add(new Pair<Integer, String>(Integer.parseInt(itemFolder.getName()), MapleDataTool.getString("name", itemFolder, "NO-NAME")));
        }

        itemsData = stringData.getData("Consume.img");
        for (final MapleData itemFolder : itemsData.getChildren()) {
            itemPairs.add(new Pair<Integer, String>(Integer.parseInt(itemFolder.getName()), MapleDataTool.getString("name", itemFolder, "NO-NAME")));
        }

        itemsData = stringData.getData("Eqp.img").getChildByPath("Eqp");
        for (final MapleData eqpType : itemsData.getChildren()) {
            for (final MapleData itemFolder : eqpType.getChildren()) {
                itemPairs.add(new Pair<Integer, String>(Integer.parseInt(itemFolder.getName()), MapleDataTool.getString("name", itemFolder, "NO-NAME")));
            }
        }

        itemsData = stringData.getData("Etc.img").getChildByPath("Etc");
        for (final MapleData itemFolder : itemsData.getChildren()) {
            itemPairs.add(new Pair<Integer, String>(Integer.parseInt(itemFolder.getName()), MapleDataTool.getString("name", itemFolder, "NO-NAME")));
        }

        itemsData = stringData.getData("Ins.img");
        for (final MapleData itemFolder : itemsData.getChildren()) {
            itemPairs.add(new Pair<Integer, String>(Integer.parseInt(itemFolder.getName()), MapleDataTool.getString("name", itemFolder, "NO-NAME")));
        }

        itemsData = stringData.getData("Pet.img");
        for (final MapleData itemFolder : itemsData.getChildren()) {
            itemPairs.add(new Pair<Integer, String>(Integer.parseInt(itemFolder.getName()), MapleDataTool.getString("name", itemFolder, "NO-NAME")));
        }
        return itemPairs;
    }

    public final List<Pair<Integer, String>> getAllEquips() {
        if (!itemNameCache.isEmpty()) {
            return itemNameCache;
        }
        final List<Pair<Integer, String>> itemPairs = new ArrayList<Pair<Integer, String>>();
        MapleData itemsData;

        itemsData = stringData.getData("Eqp.img").getChildByPath("Eqp");
        for (final MapleData eqpType : itemsData.getChildren()) {
            for (final MapleData itemFolder : eqpType.getChildren()) {
                itemPairs.add(new Pair<Integer, String>(Integer.parseInt(itemFolder.getName()), MapleDataTool.getString("name", itemFolder, "NO-NAME")));
            }
        }
        return itemPairs;
    }

    protected final MapleData getStringData(final int itemId) {
        String cat = null;
        MapleData data;

        if (itemId >= 5010000) {
            data = cashStringData;
        } else if (itemId >= 2000000 && itemId < 3000000) {
            data = consumeStringData;
        } else if (itemId >= 1142000 && itemId < 1143000 || itemId >= 1010000 && itemId < 1040000 || itemId >= 1122000 && itemId < 1123000) {
            data = eqpStringData;
            cat = "Accessory";
        } else if (itemId >= 1000000 && itemId < 1010000) {
            data = eqpStringData;
            cat = "Cap";
        } else if (itemId >= 1102000 && itemId < 1103000) {
            data = eqpStringData;
            cat = "Cape";
        } else if (itemId >= 1040000 && itemId < 1050000) {
            data = eqpStringData;
            cat = "Coat";
        } else if (itemId >= 20000 && itemId < 22000) {
            data = eqpStringData;
            cat = "Face";
        } else if (itemId >= 1080000 && itemId < 1090000) {
            data = eqpStringData;
            cat = "Glove";
        } else if (itemId >= 30000 && itemId < 32000) {
            data = eqpStringData;
            cat = "Hair";
        } else if (itemId >= 1050000 && itemId < 1060000) {
            data = eqpStringData;
            cat = "Longcoat";
        } else if (itemId >= 1060000 && itemId < 1070000) {
            data = eqpStringData;
            cat = "Pants";
        } else if (itemId >= 1802000 && itemId < 1810000) {
            data = eqpStringData;
            cat = "PetEquip";
        } else if (itemId >= 1112000 && itemId < 1120000) {
            data = eqpStringData;
            cat = "Ring";
        } else if (itemId >= 1092000 && itemId < 1100000) {
            data = eqpStringData;
            cat = "Shield";
        } else if (itemId >= 1070000 && itemId < 1080000) {
            data = eqpStringData;
            cat = "Shoes";
        } else if (itemId >= 1900000 && itemId < 2000000) {
            data = eqpStringData;
            cat = "Taming";
        } else if (itemId >= 1200000 && itemId < 1800000) { // Base : 1300000
            data = eqpStringData;
            cat = "Weapon";
        } else if (itemId >= 4000000 && itemId < 5000000) {
            data = etcStringData;
        } else if (itemId >= 3000000 && itemId < 4000000) {
            data = insStringData;
        } else if (itemId >= 5000000 && itemId < 5010000) {
            data = petStringData;
        } else {
            return null;
        }
        if (cat == null) {
            return data.getChildByPath(String.valueOf(itemId));
        } else {
            return data.getChildByPath("Eqp/" + cat + "/" + itemId);
        }
    }

    public final MapleData getItemData(final int itemId) {
        MapleData ret = null;
        final String idStr = "0" + String.valueOf(itemId);
        MapleDataDirectoryEntry root = itemData.getRoot();
        for (final MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            // we should have .img files here beginning with the first 4 IID
            for (final MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr.substring(0, 4) + ".img")) {
                    ret = itemData.getData(topDir.getName() + "/" + iFile.getName());
                    if (ret == null) {
                        return null;
                    }
                    ret = ret.getChildByPath(idStr);
                    return ret;
                } else if (iFile.getName().equals(idStr.substring(1) + ".img")) {
                    return itemData.getData(topDir.getName() + "/" + iFile.getName());
                }
            }
        }
        root = equipData.getRoot();
        for (final MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            for (final MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr + ".img")) {
                    return equipData.getData(topDir.getName() + "/" + iFile.getName());
                }
            }
        }
        return ret;
    }

    /**
     * returns the maximum of items in one slot
     */
    public final short getSlotMax(final MapleClient c, final int itemId) {
        if (slotMaxCache.containsKey(itemId)) {
            return slotMaxCache.get(itemId);
        }
        short ret = 0;
        final MapleData item = getItemData(itemId);
        if (item != null) {
            final MapleData smEntry = item.getChildByPath("info/slotMax");
            if (smEntry == null) {
                if (GameConstants.getInventoryType(itemId) == MapleInventoryType.EQUIP) {
                    ret = 1;
                } else {
                    ret = 100;
                }
            } else {
                ret = (short) MapleDataTool.getInt(smEntry);
            }
        }
        if (ret == 0) {
            ret = 1;
        }
        if (itemId == 4000313) {
            ret = 1000;
        }
        if (GameConstants.isEtc(itemId) || GameConstants.isConsume(itemId)) {
            ret = 5000;
        }
        slotMaxCache.put(itemId, ret);
        return ret;
    }

    public final List<StructPotentialItem> getPotentialInfo(final int potId) {
        return potentialCache.get(potId);
    }

    public final Map<Integer, List<StructPotentialItem>> getAllPotentialInfo() {
        return potentialCache;
    }

    public final int getPotentialOptionID(int level, int type) {
        Map<Integer, List<Integer>> option = potentialOpCache.get(level).getPotentialOption();
        List<Integer> newId = new ArrayList<Integer>();
        int rand = 0;
        for (Integer type_ : option.keySet()) {
            if ((type != 10 && type_ == 11) || type_ == type || (type != 0 && type_ == 0)) { //무기제외, 자신타입, 전체
                for (Integer id : option.get(type_)) {
                    if (type != 10 && (id % 1000 == 70 || id % 1000 == 71 || id % 1000 == 291 || id % 1000 == 292 || id % 1000 == 601 || id % 1000 == 602 || id % 1000 == 603 || id >= 60000)) {
                        continue;
                    }
                    //방어구에 보공,총뎀 붙는거 삭제
                    newId.add(id);
                }
            }
        }
        rand = Randomizer.rand(0, newId.size() - 1);
        if (newId.get(rand) != null) {
            return newId.get(rand);
        }
        return -17;
    }

    public int getScriptedItemNpc(int itemId) {
        if (scriptedItemCache.containsKey(itemId)) {
            return scriptedItemCache.get(itemId);
        }
        int npcId = MapleDataTool.getInt("spec/npc", getItemData(itemId), 0);
        scriptedItemCache.put(itemId, npcId);
        return scriptedItemCache.get(itemId);
    }

    public String getScriptedItemScript(int itemId) {
        if (scriptedItemScriptCache.containsKey(itemId)) {
            return scriptedItemScriptCache.get(itemId);
        }
        String script = MapleDataTool.getString("spec/script", getItemData(itemId));
        scriptedItemScriptCache.put(itemId, script);
        return scriptedItemScriptCache.get(itemId);
    }

    public final int getUpgradeScrollUseSlot(int itemid) {
        if (scrollUpgradeSlotUse.containsKey(itemid)) {
            return scrollUpgradeSlotUse.get(itemid);
        }
        int useslot = MapleDataTool.getIntConvert("info/tuc", getItemData(itemid), 1);
        scrollUpgradeSlotUse.put(itemid, useslot);
        return scrollUpgradeSlotUse.get(itemid);
    }

    public final int getWholePrice(final int itemId) {
        if (wholePriceCache.containsKey(itemId)) {
            return wholePriceCache.get(itemId);
        }
        final MapleData item = getItemData(itemId);
        if (item == null) {
            return -1;
        }
        int pEntry = 0;
        final MapleData pData = item.getChildByPath("info/price");
        if (pData == null) {
            return -1;
        }
        pEntry = MapleDataTool.getInt(pData);

        wholePriceCache.put(itemId, pEntry);
        return pEntry;
    }

    public final double getPrice(final int itemId) {
        if (priceCache.containsKey(itemId)) {
            return priceCache.get(itemId);
        }
        final MapleData item = getItemData(itemId);
        if (item == null) {
            return -1;
        }
        double pEntry = 0.0;
        MapleData pData = item.getChildByPath("info/unitPrice");
        if (pData != null) {
            try {
                pEntry = MapleDataTool.getDouble(pData);
            } catch (Exception e) {
                pEntry = (double) MapleDataTool.getInt(pData);
            }
        } else {
            pData = item.getChildByPath("info/price");
            if (pData == null) {
                MapleData lv = item.getChildByPath("info/lv");
                return MapleDataTool.getInt(lv) * 2;
            }
            pEntry = (double) MapleDataTool.getInt(pData);
        }
        if (itemId == 2070019 || itemId == 2330007) {
            pEntry = 1.0;
        }
        priceCache.put(itemId, pEntry);
        return pEntry;
    }

    public final int getSuccess(final int itemId, final MapleCharacter player, IItem equip) {
        if (player.getGMLevel() > 0) {
            return 100;
        }
        if (player.getInventory(MapleInventoryType.ETC).countById(4001136) >= 1) {
            player.gainItem(4001136, (short) -1, false, -1L, "The jewel of legend");
            player.message(5, "주문서의 조각이 불타올라 주문서가 100%확률로 성공합니다!");
            return 100;
        }
        if (player.getInventory(MapleInventoryType.ETC).countById(4031034) >= 1) {
            player.gainItem(4031034, (short) -1, false, -1L, "The jewel of legend");
            player.message(5, "마법의 두루마리를 펼치자 70%확률로 성공했을까? 안했을까?? 직접 확인해봐!");
            return 70;
        }
        Equip t = (Equip) equip.copy();
        if (itemId / 100 == 20493) {
            int success = 0;
            Equip lev = (Equip) equip.copy();
            byte leve = lev.getEnhance();
            switch (itemId) {
                case 2049300:
                case 2049303:
                case 2049306:
                case 2049323: {
                    if (leve == 0) {
                        success = 100;
                    } else if (leve == 1) {
                        success = 90;
                    } else if (leve == 2) {
                        success = 80;
                    } else if (leve == 3) {
                        success = 70;
                    } else if (leve == 4) {
                        success = 60;
                    } else if (leve == 5) {
                        success = 50;
                    } else if (leve == 6) {
                        success = 40;
                    } else if (leve == 7) {
                        success = 30;
                    } else if (leve == 8) {
                        success = 20;
                    } else if (leve == 9) {
                        success = 10;
                    } else if (leve >= 10) {
                        success = 5;
                    }
                    return success;
                }
                case 2049301:
                case 2049307: {
                    if (leve == 0) {
                        success = 80;
                    } else if (leve == 1) {
                        success = 70;
                    } else if (leve == 2) {
                        success = 60;
                    } else if (leve == 3) {
                        success = 50;
                    } else if (leve == 4) {
                        success = 40;
                    } else if (leve == 5) {
                        success = 30;
                    } else if (leve == 6) {
                        success = 20;
                    } else if (leve == 7) {
                        success = 10;
                    } else if (leve >= 8) {
                        success = 5;
                    }
                    return success;
                }
            }
        }
        switch (itemId) {
            case 2046841:
            case 2046842:
            case 2046967:
            case 2046971:
            case 2047803:
            case 2047917: {
                return 20;
            }
        }
        if (equip == null) {
            System.err.println("[오류] 주문서의 성공확률을 구하던 중, 장비 아이템 값에 널 값이 입력되었습니다." + itemId);
            player.message(5, "[오류] 현재 주문서의 성공확률을 구하는데 실패하였습니다.");
            player.gainItem(itemId, (short) 1, false, -1, "주문서 성공확률 얻기 실패로 얻은 주문서");
            player.ea();
            return 0;
        }
        if (successCache.containsKey(itemId)) {
            return successCache.get(itemId);
        }

        final MapleData item = getItemData(itemId);
        if (item == null) {
            System.err.println("[오류] 주문서의 성공확률을 구하던 중, 주문서 데이터 값에 널 값이 입력되었습니다." + itemId);
            player.message(5, "[오류] 현재 주문서의 성공확률을 구하는데 실패하였습니다.");
            player.gainItem(itemId, (short) 1, false, -1, "주문서 성공확률 얻기 실패로 얻은 주문서");
            player.ea();
            return 0;
        }
        int success = 0;
        if (item.getChildByPath("info/successRates") != null) {
            success = MapleDataTool.getIntConvert(t.getLevel() + "", item.getChildByPath("info/successRates"), 20);
        } else {
            success = MapleDataTool.getIntConvert("info/success", item, 100);
        }
        if (!GameConstants.isEpicScroll(itemId) && !GameConstants.isPotentialScroll(itemId) && !GameConstants.isEquipScroll(itemId)) {
            if (ItemFlag.LUKCYDAY.check(t.getFlag())) {
                success += 10;
            }
        }
        successCache.put(itemId, success);
        return success;
    }

    public final int getCursed(final int itemId, final MapleCharacter player) {
        return getCursed(itemId, player, null);
    }

    public final int getCursed(final int itemId, final MapleCharacter player, IItem equip) {
//        if (player.getGMLevel() > 0) {
//            return -1;
//        }
        if (cursedCache.containsKey(itemId)) {
            return cursedCache.get(itemId);
        }
        final MapleData item = getItemData(itemId);
        if (item == null) {
            return -1;
        }
        int success = 0;
        success = MapleDataTool.getIntConvert("info/cursed", item, -1);
        cursedCache.put(itemId, success);
        return success;
    }

    public final boolean isAccountShared(final int itemId) {
        if (accCache.containsKey(itemId)) {
            return accCache.get(itemId);
        }
        final boolean bRestricted = MapleDataTool.getIntConvert("info/accountSharable", getItemData(itemId), 0) == 1;

        accCache.put(itemId, bRestricted);
        return bRestricted;
    }

    public final int getStateChangeItem(final int itemId) {
        if (stateChangeCache.containsKey(itemId)) {
            return stateChangeCache.get(itemId);
        }
        final int triggerItem = MapleDataTool.getIntConvert("info/stateChangeItem", getItemData(itemId), 0);
        stateChangeCache.put(itemId, triggerItem);
        return triggerItem;
    }

    public final int getAndroid(final int itemId) {
        if (androidCache.containsKey(itemId)) {
            return androidCache.get(itemId);
        }
        final int i = MapleDataTool.getIntConvert("info/android", getItemData(itemId), 0);

        androidCache.put(itemId, i);
        return i;
    }

    public final BasicAndroid getAndroidBasicSettings(final int android) {
        if (androidBasicCache.containsKey(android)) {
            return androidBasicCache.get(android);
        }
        List<Integer> hairs = new LinkedList<Integer>();
        List<Integer> faces = new LinkedList<Integer>();
        String name = StringUtil.getLeftPaddedStr(android + "", '0', 4) + ".img";
        MapleData root = etcData.getData("Android/" + name);
        if (root == null) {
            System.err.println("[오류] 서버의 Etc.wz에서 안드로이드 기본 셋팅이 저장된 " + name + " 파일을 발견하지 못했습니다.");
            return null;
        }
        MapleData costume = root.getChildByPath("costume");
        for (MapleData d : costume.getChildByPath("hair")) {
            hairs.add(MapleDataTool.getIntConvert(d));
        }
        for (MapleData d : costume.getChildByPath("face")) {
            faces.add(MapleDataTool.getIntConvert(d));
        }
        final BasicAndroid basicAnd = new BasicAndroid(hairs, faces, MapleDataTool.getIntConvert(root.getChildByPath("info/gender")));
        androidBasicCache.put(android, basicAnd);
        return basicAnd;
    }

    public final int getBagType(final int itemid) {
        if (bagTypeCache.containsKey(itemid)) {
            return bagTypeCache.get(itemid);
        }
        int prefix = itemid / 10000;
        String name = StringUtil.getLeftPaddedStr(prefix + "", '0', 4) + ".img";
        MapleData d = itemData.getData("Etc/" + name);
        if (d == null) {
            return 0;
        }
        name = StringUtil.getLeftPaddedStr(itemid + "", '0', 8);
        d = d.getChildByPath(name + "/info/bagType");
        int ret = MapleDataTool.getInt(d, 0);
        bagTypeCache.put(itemid, ret);
        return ret;
    }

    public final boolean isKarmaEnabled(final int itemId) {
        if (karmaEnabledCache.containsKey(itemId)) {
            return karmaEnabledCache.get(itemId) == 1;
        }
        final int iRestricted = MapleDataTool.getIntConvert("info/tradeAvailable", getItemData(itemId), 0);

        karmaEnabledCache.put(itemId, iRestricted);
        return iRestricted == 1;
    }

    public final boolean isPKarmaEnabled(final int itemId) {
        if (karmaEnabledCache.containsKey(itemId)) {
            return karmaEnabledCache.get(itemId) == 2;
        }
        final int iRestricted = MapleDataTool.getIntConvert("info/tradeAvailable", getItemData(itemId), 0);

        karmaEnabledCache.put(itemId, iRestricted);
        return iRestricted == 2;
    }

    public final void cacheEquipLevelStat(int itemid) {
        final MapleData item = getItemData(itemid);
        if (item == null) {
            return;
        }
        final MapleData info = item.getChildByPath("info/level");
        if (info == null) {
            nonLevelEquip.add(itemid);
            return;
        }
        final Map<Integer, StructEquipLevel> el = new HashMap<Integer, StructEquipLevel>();
        StructEquipLevel sel;
        for (final MapleData data : info.getChildByPath("info").getChildren()) {
            sel = new StructEquipLevel();
            sel.incSTRMax = (byte) MapleDataTool.getInt("incSTRMax", data, 0);
            sel.incSTRMin = (byte) MapleDataTool.getInt("incSTRMin", data, 0);

            sel.incDEXMax = (byte) MapleDataTool.getInt("incDEXMax", data, 0);
            sel.incDEXMin = (byte) MapleDataTool.getInt("incDEXMin", data, 0);

            sel.incLUKMax = (byte) MapleDataTool.getInt("incLUKMax", data, 0);
            sel.incLUKMin = (byte) MapleDataTool.getInt("incLUKMin", data, 0);

            sel.incINTMax = (byte) MapleDataTool.getInt("incINTMax", data, 0);
            sel.incINTMin = (byte) MapleDataTool.getInt("incINTMin", data, 0);

            sel.incPADMax = (byte) MapleDataTool.getInt("incPADMax", data, 0);
            sel.incPADMin = (byte) MapleDataTool.getInt("incPADMin", data, 0);

            sel.incMADMax = (byte) MapleDataTool.getInt("incMADMax", data, 0);
            sel.incMADMin = (byte) MapleDataTool.getInt("incMADMin", data, 0);

            sel.incMHPMax = (byte) MapleDataTool.getInt("incMHPMax", data, 0);
            sel.incMHPMin = (byte) MapleDataTool.getInt("incMHPMin", data, 0);

            el.put(Integer.parseInt(data.getName()), sel);
        }
        equipLevelMaxLevel.put(itemid, el.size());
        equipLevelCache.put(itemid, el);
    }

    public final StructEquipLevel getEquipLevelStat(final int itemid, final int level) {
        if (equipLevelCache.containsKey(itemid)) {
            if (equipLevelCache.get(itemid).containsKey(level)) {
                return equipLevelCache.get(itemid).get(level);
            }
        }
        cacheEquipLevelStat(itemid);
        return equipLevelCache.get(itemid).get(level);
    }

    public final int getMaxLevelEquip(int itemid) {
        if (nonLevelEquip.contains(itemid)) {
            return 0;
        }
        if (!equipLevelMaxLevel.containsKey(itemid)) {
            cacheEquipLevelStat(itemid);
        }
        if (equipLevelMaxLevel.containsKey(itemid)) {
            return equipLevelMaxLevel.get(itemid);
        }
        return 0;
    }

    public final Map<String, Byte> getItemMakeStats(final int itemId) {
        if (itemMakeStatsCache.containsKey(itemId)) {
            return itemMakeStatsCache.get(itemId);
        }
        if (itemId / 10000 != 425) {
            return null;
        }
        final Map<String, Byte> ret = new LinkedHashMap<String, Byte>();
        final MapleData item = getItemData(itemId);
        if (item == null) {
            return null;
        }
        final MapleData info = item.getChildByPath("info");
        if (info == null) {
            return null;
        }
        ret.put("incPAD", (byte) MapleDataTool.getInt("incPAD", info, 0)); // WATK
        ret.put("incMAD", (byte) MapleDataTool.getInt("incMAD", info, 0)); // MATK
        ret.put("incACC", (byte) MapleDataTool.getInt("incACC", info, 0)); // ACC
        ret.put("incEVA", (byte) MapleDataTool.getInt("incEVA", info, 0)); // AVOID
        ret.put("incSpeed", (byte) MapleDataTool.getInt("incSpeed", info, 0)); // SPEED
        ret.put("incJump", (byte) MapleDataTool.getInt("incJump", info, 0)); // JUMP
        ret.put("incMaxHP", (byte) MapleDataTool.getInt("incMaxHP", info, 0)); // HP
        ret.put("incMaxMP", (byte) MapleDataTool.getInt("incMaxMP", info, 0)); // MP
        ret.put("incSTR", (byte) MapleDataTool.getInt("incSTR", info, 0)); // STR
        ret.put("incINT", (byte) MapleDataTool.getInt("incINT", info, 0)); // INT
        ret.put("incLUK", (byte) MapleDataTool.getInt("incLUK", info, 0)); // LUK
        ret.put("incDEX", (byte) MapleDataTool.getInt("incDEX", info, 0)); // DEX
        ret.put("randOption", (byte) MapleDataTool.getInt("randOption", info, 0)); // Black Crystal Wa/MA
        ret.put("randStat", (byte) MapleDataTool.getInt("randStat", info, 0)); // Dark Crystal - Str/Dex/int/Luk

        itemMakeStatsCache.put(itemId, ret);
        return ret;
    }

    public final Map<String, Integer> getEquipStats(final int itemId) {
        if (equipStatsCache.containsKey(itemId)) {
            return equipStatsCache.get(itemId);
        }
        final Map<String, Integer> ret = new LinkedHashMap<String, Integer>();
        final MapleData item = getItemData(itemId);
        if (item == null) {
            return null;
        }
        final MapleData info = item.getChildByPath("info");
        if (info == null) {
            return null;
        }
        for (final MapleData data : info.getChildren()) {
            if (data.getName().startsWith("inc")) {
                ret.put(data.getName().substring(3), (int) MapleDataTool.getIntConvert(data));
            }
        }
        ret.put("tuc", MapleDataTool.getInt("tuc", info, 0));
        ret.put("reqLevel", MapleDataTool.getInt("reqLevel", info, 0));
        ret.put("reqJob", MapleDataTool.getInt("reqJob", info, 0));
        ret.put("reqSTR", MapleDataTool.getInt("reqSTR", info, 0));
        ret.put("reqDEX", MapleDataTool.getInt("reqDEX", info, 0));
        ret.put("reqINT", MapleDataTool.getInt("reqINT", info, 0));
        ret.put("reqLUK", MapleDataTool.getInt("reqLUK", info, 0));
        ret.put("reqPOP", MapleDataTool.getInt("reqPOP", info, 0));
        ret.put("cash", MapleDataTool.getInt("cash", info, 0));
        ret.put("canLevel", info.getChildByPath("level") == null ? 0 : 1);
        ret.put("cursed", MapleDataTool.getInt("cursed", info, 0));
        ret.put("success", MapleDataTool.getInt("success", info, 0));
        ret.put("equipTradeBlock", MapleDataTool.getInt("equipTradeBlock", info, 0));
        ret.put("setItemID", MapleDataTool.getInt("setItemID", info, 0));
        ret.put("gatherTool", MapleDataTool.getInt("gatherTool", info, 0));
        ret.put("expireOnLogout", MapleDataTool.getInt("expireOnLogout", info, 0));
        ret.put("charmEXP", MapleDataTool.getInt("charmEXP", info, 0));
        ret.put("willEXP", MapleDataTool.getInt("willEXP", info, 0));
        ret.put("charismaEXP", MapleDataTool.getInt("charismaEXP", info, 0));
        ret.put("forceUpgrade", MapleDataTool.getInt("forceUpgrade", info, 1));
        ret.put("bdR", MapleDataTool.getInt("bdR", info, 0));
        ret.put("imdR", MapleDataTool.getInt("imdR", info, 0));
        if (GameConstants.isMagicWeapon(itemId)) {
            ret.put("elemDefault", MapleDataTool.getInt("elemDefault", info, 100));
            ret.put("incRMAS", MapleDataTool.getInt("incRMAS", info, 100)); // Poison
            ret.put("incRMAF", MapleDataTool.getInt("incRMAF", info, 100)); // Fire
            ret.put("incRMAL", MapleDataTool.getInt("incRMAL", info, 100)); // Lightning
            ret.put("incRMAI", MapleDataTool.getInt("incRMAI", info, 100)); // Ice
        }

        equipStatsCache.put(itemId, ret);
        return ret;
    }

    public final boolean canEquip(final Map<String, Integer> stats, final int itemid, final int level, final int job, final int fame, final int str, final int dex, final int luk, final int int_) {
        if (level >= stats.get("reqLevel") && str >= stats.get("reqSTR") && dex >= stats.get("reqDEX") && luk >= stats.get("reqLUK") && int_ >= stats.get("reqINT")) {
            final int fameReq = stats.get("reqPOP");
            if (fameReq != 0 && fame < fameReq) {
                return false;
            }
            return true;
        }
        return false;
    }

    public final int getReqLevel(final int itemId) {
        try {
            return getEquipStats(itemId).get("reqLevel");
        } catch (Exception ex) {
            return 0;
        }
    }

    public final List<Integer> getScrollReqs(final int itemId) {
        final List<Integer> ret = new ArrayList<Integer>();
        final MapleData data = getItemData(itemId).getChildByPath("req");

        if (data == null) {
            return ret;
        }
        for (final MapleData req : data.getChildren()) {
            ret.add(MapleDataTool.getInt(req));
        }
        return ret;
    }

    public final IItem scrollEquipWithId(final IItem equip, final IItem scrollId, final boolean ws, final MapleCharacter chr) {
        if (equip.getType() == 1) {
            Equip nEquip = (Equip) equip;
            IEquip zeroEquip = null;
            if (GameConstants.isAlphaWeapon(nEquip.getItemId())) {
                zeroEquip = (IEquip) chr.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -10);
            }
            Equip nZero = (Equip) zeroEquip;
            final Map<String, Integer> stats = getEquipStats(scrollId.getItemId());
            final Map<String, Integer> eqstats = getEquipStats(equip.getItemId());
            boolean failed = false;
            switch (scrollId.getItemId()) {
                case 2049000: //백의 주문서 1%
                case 2049001: //백의 주문서 3%
                case 2049002: //백의 주문서 5%
                case 2049004: //백의 주문서 10%
                case 2049005: //백의 주문서 20%
                case 2049009:
                case 2049010:
                case 2049011:
                case 2049012:
                case 2049013:
                case 2049014:
                case 2049015:
                case 2049016:
                case 2049017:
                case 2049018:
                case 2049019:
                case 2049020:
                case 2049021:
                case 2049022:
                case 2049023:
                case 2049024:
                case 2049025:
                case 2049026:
                case 2049027:
                case 2049028:
                case 2049029:
                case 2049030:
                case 2049031:
                case 2049032:
                case 2049033:
                case 2049034:
                case 2049035:
                case 2049036:
                case 2049037:
                case 2049038:
                case 2049039:
                case 2049040: {
                /*    if (nEquip.getLevel() + nEquip.getUpgradeSlots() < eqstats.get("tuc")) {
                        nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() + 1));
                        chr.dropMessage(6, getCursed(scrollId.getItemId(), chr) + "");
                    } else {
                        chr.dropMessage(5, "주문서 실패가 발견되지 않아 주문서가 효과를 발휘하지 못하였습니다.");
                    }
                    break;*/ //황금망치 아래꺼랑 고체 바람 오류뜨면
                        if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip))) {
                        if (Randomizer.isSuccess(getCursed(scrollId.getItemId(), chr))) {
                            if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                nEquip.setAmazing(false);
                            } else {
                                return null; //펑
                            }
                        }
                        failed = true;
                    } else if (nEquip.getLevel() + nEquip.getUpgradeSlots() < (eqstats.get("tuc") + (nEquip.getViciousHammer() > 0 ? 1 : 0))) {
                        nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() + 1));
                    } else {
                        chr.dropMessage(5, "주문서 실패가 발견되지 않아 주문서가 효과를 발휘하지 못하였습니다.");
                    }
                    break;
                }
                case 2049006: //저주받은 백의 주문서 1%
                case 2049007: //저주받은 백의 주문서 3%
                case 2049008: //저주받은 백의 주문서 5%
                {
                    if (nEquip.getLevel() + nEquip.getUpgradeSlots() < eqstats.get("tuc")) {
                        nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() + 2));
                    }
                    break;
                }
                case 2040727: // 신발 스파이크 주문서 10% - 신발에 미끄럼 방지 옵션 추가. 성공률:10%, 업그레이드 가능 횟수에 영향 없음
                {
                    short flag = nEquip.getFlag();
                    flag |= ItemFlag.SPIKES.getValue();
                    nEquip.setFlag(flag);
                    break;
                }
                case 2041058: // 망토 방한 주문서 10% - 망토에 방한 옵션 추가.
                {
                    short flag = nEquip.getFlag();
                    flag |= ItemFlag.COLD.getValue();
                    nEquip.setFlag(flag);
                    break;
                }
                /* 8樂 주문서, 저스티스 주문서 */
                case 2046025:
                case 2046026:
                case 2046340:
                case 2046119:
                case 2046341:
                case 2046120:
                case 2046251:
                case 2046054:
                case 2046055:
                case 2046056:
                case 2046057:
                case 2046058:
                case 2046059:
                case 2046138:
                case 2046139:
                case 2046140:
                case 2046374:
                case 2046094:
                case 2046095:
                case 2046162:
                case 2046163:
                case 2046564:
                    if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip))) {
                        if (Randomizer.isSuccess(getCursed(scrollId.getItemId(), chr))) {
                            if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                nEquip.setAmazing(false);
                            } else {
                                return null; //펑
                            }
                        }
                        failed = true;
                    } else {
                        switch (scrollId.getItemId()) {
                            case 2046025: // 8樂 한손 무기 공격력 주문서 20%
                                nEquip.setWatk((short) (nEquip.getWatk() + Randomizer.rand(7, 8)));
                                break;
                            case 2046026: // 8樂 한손 무기 마력 주문서 20%
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.rand(7, 8)));
                                break;
                            case 2046340: // 8樂 악세서리 공격력 주문서 20%
                                nEquip.setWatk((short) (nEquip.getWatk() + 1));
                                break;
                            case 2046341: // 8樂 악세서리 마력 주문서 20%
                                nEquip.setMatk((short) (nEquip.getMatk() + 1));
                                break;
                            case 2046119: // 8樂 두손무기 공격력 주문서 20%
                                nEquip.setWatk((short) (nEquip.getWatk() + Randomizer.rand(7, 8)));
                                break;
                            case 2046120: // 8樂 두손무기 마력 주문서 20%
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.rand(7, 8)));
                                break;
                            case 2046251: // 8樂 방어구 강화 주문서 20%
                                nEquip.setStr((short) (nEquip.getStr() + 3));
                                nEquip.setInt((short) (nEquip.getInt() + 3));
                                nEquip.setDex((short) (nEquip.getDex() + 3));
                                nEquip.setLuk((short) (nEquip.getLuk() + 3));
                                break;
                            case 2046054: // 저스티스 한손무기 공격력 주문서 20%
                            case 2046055: // 저스티스 한손 무기 마력 주문서 20%
                            case 2046056: // 저스티스 한손 무기 공격력 주문서 40%
                            case 2046057: // 저스티스 한손 무기 마력 주문서 40%
                            case 2046138: // 저스티스 두손무기 공격력 주문서 20%
                            case 2046139: // 저스티스 두손무기 공격력 주문서 40%
                                if (scrollId.getItemId() == 2046055 || scrollId.getItemId() == 2046057) {
                                    nEquip.setMatk((short) (nEquip.getMatk() + 5));
                                } else {
                                    nEquip.setWatk((short) (nEquip.getWatk() + 5));
                                }
                                nEquip.setStr((short) (nEquip.getStr() + 3));
                                nEquip.setDex((short) (nEquip.getDex() + 3));
                                nEquip.setInt((short) (nEquip.getInt() + 3));
                                nEquip.setLuk((short) (nEquip.getLuk() + 3));
                                nEquip.setAcc((short) (nEquip.getAcc() + 15));
                                break;
                            case 2046058: // 저스티스 한손 무기 공격력 주문서 70%
                            case 2046059: // 저스티스 한손 무기 마력 주문서 70%
                            case 2046140: // 저스티스 두손무기 공격력 주문서 70%
                                if (scrollId.getItemId() == 2046059) {
                                    nEquip.setMatk((short) (nEquip.getMatk() + 2));
                                } else {
                                    nEquip.setWatk((short) (nEquip.getWatk() + 2));
                                }
                                nEquip.setStr((short) (nEquip.getStr() + 1));
                                nEquip.setDex((short) (nEquip.getDex() + 1));
                                nEquip.setInt((short) (nEquip.getInt() + 1));
                                nEquip.setLuk((short) (nEquip.getLuk() + 1));
                                nEquip.setAcc((short) (nEquip.getAcc() + 5));
                                break;
                            case 2046374: //비틀린 시간의 파편
                                nEquip.setWatk((short) (nEquip.getWatk() + 3));
                                nEquip.setMatk((short) (nEquip.getMatk() + 3));
                                nEquip.setWdef((short) (nEquip.getWdef() + 25));
                                nEquip.setMdef((short) (nEquip.getMdef() + 25));
                                nEquip.setStr((short) (nEquip.getStr() + 3));
                                nEquip.setDex((short) (nEquip.getDex() + 3));
                                nEquip.setInt((short) (nEquip.getInt() + 3));
                                nEquip.setLuk((short) (nEquip.getLuk() + 3));
                                nEquip.setAvoid((short) (nEquip.getAvoid() + 30));
                                nEquip.setAcc((short) (nEquip.getAcc() + 30));
                                nEquip.setSpeed((short) (nEquip.getSpeed() + 3));
                                nEquip.setJump((short) (nEquip.getJump() + 2));
                                nEquip.setMp((short) (nEquip.getMp() + 25));
                                nEquip.setHp((short) (nEquip.getHp() + 25));
                                break;
                            case 2046094: // 9주년 한손 무기 공격력 주문서 10%
                                nEquip.setWatk((short) (nEquip.getWatk() + Randomizer.ScrollRand(7, 9)));
                                break;
                            case 2046095: // 9주년 한손 무기 마력 주문서 10%
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.ScrollRand(7, 9)));
                                break;
                            case 2046162: // 9주년 두손 무기 공격력 주문서 10%
                                nEquip.setWatk((short) (nEquip.getWatk() + Randomizer.ScrollRand(7, 9)));
                                break;
                            case 2046163: // 9주년 두손 무기 마력 주문서 10%
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.ScrollRand(7, 9)));
                                break;
                            case 5530336: // 악세서리 공격력 스크롤 100%
                                nEquip.setWatk((short) (nEquip.getWatk() + Randomizer.ScrollRand(2, 4)));
                                break;
                            case 5530337: // 악세서리 마력 스크롤 100%
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.ScrollRand(2, 4)));
                                break;
                            case 5530338: // 펫장비 공격력 스크롤 100%
                                nEquip.setWatk((short) (nEquip.getWatk() + Randomizer.ScrollRand(2, 4)));
                                break;
                            case 5530339: // 펫장비 마력 스크롤 100%
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.ScrollRand(2, 4)));
                                break;
                            case 2048094: //프리미엄 펫장비 공격력 주문서 100%
                            case 2046856: //프리미엄 악세서리 공격력 주문서 100%
                                nEquip.setWatk((short) (nEquip.getWatk() + Randomizer.ScrollRand(4, 5)));
                                break;
                            case 2048095: //프리미엄 펫장비 마력 주문서 100%
                            case 2046857: //프리미엄 악세서리 마력 주문서 100%
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.ScrollRand(4, 5)));
                                break;
                            case 2046991: //매지컬 한손무기 공격력 주문서
                            case 2047814: //매지컬 두손무기 공격력 주문서
                                nEquip.setStr((short) (nEquip.getStr() + 3));
                                nEquip.setInt((short) (nEquip.getInt() + 3));
                                nEquip.setDex((short) (nEquip.getDex() + 3));
                                nEquip.setLuk((short) (nEquip.getLuk() + 3));
                                nEquip.setWatk((short) (nEquip.getMatk() + Randomizer.ScrollRand(9, 11)));
                                break;
                            case 2046992: //매지컬 한손무기 마력 주문서
                                nEquip.setStr((short) (nEquip.getStr() + 3));
                                nEquip.setInt((short) (nEquip.getInt() + 3));
                                nEquip.setDex((short) (nEquip.getDex() + 3));
                                nEquip.setLuk((short) (nEquip.getLuk() + 3));
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.ScrollRand(9, 11)));
                            case 2046564: // 9주년 방어구 강화 주문서 10%
                                nEquip.setStr((short) (nEquip.getStr() + 5));
                                nEquip.setInt((short) (nEquip.getInt() + 5));
                                nEquip.setDex((short) (nEquip.getDex() + 5));
                                nEquip.setLuk((short) (nEquip.getLuk() + 5));
                                break;
                        }
                    }
                    break;
                case 2046841:
                case 2046842:
                case 2046967:
                case 2046971:
                case 2047803:
                case 2047917:
                    if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip))) {
                        if (Randomizer.isSuccess(getCursed(scrollId.getItemId(), chr))) {
                            if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                nEquip.setAmazing(false);
                            } else {
                                return null; //펑
                            }
                        }
                        failed = true;
                    } else {
                        switch (scrollId.getItemId()) {
                            case 2046841:
                                nEquip.setWatk((short) (nEquip.getWatk() + 1));
                                break;
                            case 2046842:
                                nEquip.setMatk((short) (nEquip.getMatk() + 1));
                                break;
                            case 2046967:
                                nEquip.setWatk((short) (nEquip.getWatk() + 9));
                                nEquip.setStr((short) (nEquip.getStr() + 3));
                                nEquip.setInt((short) (nEquip.getInt() + 3));
                                nEquip.setDex((short) (nEquip.getDex() + 3));
                                nEquip.setLuk((short) (nEquip.getLuk() + 3));
                                break;
                            case 2046971:
                                nEquip.setMatk((short) (nEquip.getMatk() + 9));
                                nEquip.setStr((short) (nEquip.getStr() + 3));
                                nEquip.setInt((short) (nEquip.getInt() + 3));
                                nEquip.setDex((short) (nEquip.getDex() + 3));
                                nEquip.setLuk((short) (nEquip.getLuk() + 3));
                                break;
                            case 2047803:
                                nEquip.setWatk((short) (nEquip.getWatk() + 9));
                                nEquip.setStr((short) (nEquip.getStr() + 3));
                                nEquip.setInt((short) (nEquip.getInt() + 3));
                                nEquip.setDex((short) (nEquip.getDex() + 3));
                                nEquip.setLuk((short) (nEquip.getLuk() + 3));
                                break;
                            case 2047917:
                                nEquip.setStr((short) (nEquip.getStr() + 9));
                                nEquip.setInt((short) (nEquip.getInt() + 9));
                                nEquip.setDex((short) (nEquip.getDex() + 9));
                                nEquip.setLuk((short) (nEquip.getLuk() + 9));
                                break;
                        }
                    }
                    break;
                case 2049701:
                case 2049702:
                case 2049703:
                case 2049700:
                    if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip), chr)) {
                        if (Randomizer.isSuccess(getCursed(scrollId.getItemId(), chr))) {
                            if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                nEquip.setAmazing(false);
                            } else {
                                return null; //펑
                            }
                        }
                        failed = true;
                    } else if (nEquip.getState() <= 17) {
                        nEquip.setState((byte) 2);
                        if (Randomizer.nextInt(100) < 30) {
                            nEquip.setLines((byte) 3);
                        } else {
                            nEquip.setLines((byte) 2);
                        }
                    }
                    break;
                case 2049750:
                case 2049751:
                case 2049752:
                    if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip), chr)) {
                        if (Randomizer.isSuccess(getCursed(scrollId.getItemId(), chr))) {
                            if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                nEquip.setAmazing(false);
                            } else {
                                return null; //펑
                            }
                        }
                        failed = true;
                    } else if (nEquip.getState() <= 19) {
                        nEquip.setState((byte) 3);
                        if (Randomizer.nextInt(100) < 30) {
                            nEquip.setLines((byte) 3);
                        } else {
                            nEquip.setLines((byte) 2);
                        }
                    }
                    break;
                case 2531000: // 프로텍트
                {
                    short flag = nEquip.getFlag();
                    flag |= ItemFlag.PROTECT.getValue();
                    nEquip.setFlag(flag);
                    break;
                }
                case 2532000: // 세이프티
                {
                    short flag = nEquip.getFlag();
                    flag |= ItemFlag.SAFETY.getValue();
                    nEquip.setFlag(flag);
                    break;
                }

                case 5064300: // 리커버리
                {
                    short flag = nEquip.getFlag();
                    flag |= ItemFlag.RECOVERY.getValue();
                    nEquip.setFlag(flag);
                    break;
                }
                case 5063000:
                case 2049704: {// 레전드리 잠재 주문서/에픽 40%에 적용 - 120705 추가
                    if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip), chr)) {
                        failed = true;
                    } else if (nEquip.getState() <= 17) {
                        nEquip.setState((byte) 4);
                        if (Randomizer.nextInt(100) < 30) {
                            nEquip.setLines((byte) 3);
                        } else {
                            nEquip.setLines((byte) 2);
                        }
                    }
                    break;
                }
                case 2530000:
                case 2530001:
                case 2530002: // 럭키데이
                {
                    short flag = nEquip.getFlag();
                    flag |= ItemFlag.LUKCYDAY.getValue();
                    nEquip.setFlag(flag);
                    break;
                }

                case 5064200: {
                    Equip origin = (Equip) ItemInformation.getInstance().getEquipById(nEquip.getItemId());
                    nEquip.setAcc(origin.getAcc());
                    nEquip.setAvoid(origin.getAvoid());
                    nEquip.setDex(origin.getDex());
                    nEquip.setHands(origin.getHands());
                    nEquip.setHp(origin.getHp());
                    nEquip.setHpR(origin.getHpR());
                    nEquip.setInt(origin.getInt());
                    nEquip.setJump(origin.getJump());
                    nEquip.setLevel(origin.getLevel());
                    nEquip.setLuk(origin.getLuk());
                    nEquip.setMatk(origin.getMatk());
                    nEquip.setMdef(origin.getMdef());
                    nEquip.setMp(origin.getMp());
                    nEquip.setMpR(origin.getMpR());
                    nEquip.setSpeed(origin.getSpeed());
                    nEquip.setStr(origin.getStr());
                    nEquip.setUpgradeSlots(origin.getUpgradeSlots());
                    nEquip.setWatk(origin.getWatk());
                    nEquip.setWdef(origin.getWdef());
                    nEquip.setEnhance((byte) 0);
                    nEquip.setViciousHammer((byte) 0);
                    nEquip.setFireStat(new int[16]);
                    nEquip.setAllDamageP(origin.getAllDamageP());
                    nEquip.setIgnoreWdef(origin.getIgnoreWdef());
                    nEquip.setBossDamage(origin.getBossDamage());
                    nEquip.setAllStatP(origin.getAllStatP());
                    nEquip.setDownLevel(origin.getDownLevel());
                    break;
                }
                default: {
                    if (GameConstants.isChaosScroll(scrollId.getItemId())) {
                        if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip), chr)) {
                            if (Randomizer.isSuccess(getCursed(scrollId.getItemId(), chr, nEquip))) {
                                if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                    chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                    nEquip.setAmazing(false);
                                } else {
                                    return null; //펑
                                }
                            }
                            failed = true;
                        } else {
                            final int z = GameConstants.getChaosNumber(scrollId.getItemId());
                            final boolean a = scrollId.getItemId() == 2049122 || scrollId.getItemId() == 2049153; //긍정의 혼돈의 주문서
                            if (nEquip.getStr() > 0) {
                                nEquip.setStr((short) (nEquip.getStr() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getDex() > 0) {
                                nEquip.setDex((short) (nEquip.getDex() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getInt() > 0) {
                                nEquip.setInt((short) (nEquip.getInt() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getLuk() > 0) {
                                nEquip.setLuk((short) (nEquip.getLuk() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getWatk() > 0) {
                                nEquip.setWatk((short) (nEquip.getWatk() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getWdef() > 0) {
                                nEquip.setWdef((short) (nEquip.getWdef() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getMatk() > 0) {
                                nEquip.setMatk((short) (nEquip.getMatk() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getMdef() > 0) {
                                nEquip.setMdef((short) (nEquip.getMdef() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getAcc() > 0) {
                                nEquip.setAcc((short) (nEquip.getAcc() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getAvoid() > 0) {
                                nEquip.setAvoid((short) (nEquip.getAvoid() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getSpeed() > 0) {
                                nEquip.setSpeed((short) (nEquip.getSpeed() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getJump() > 0) {
                                nEquip.setJump((short) (nEquip.getJump() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getHp() > 0) {
                                nEquip.setHp((short) (nEquip.getHp() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                            if (nEquip.getMp() > 0) {
                                nEquip.setMp((short) (nEquip.getMp() + Randomizer.nextInt(z) * (a ? 1 : Randomizer.nextBoolean() ? 1 : -1)));
                            }
                        }
                        break;
                    } else if (scrollId.getItemId() == 2049100) { // 랜덤 주문서 나중에 코드 찾아 볼 것
                        int chance = Randomizer.nextInt(50);
                        int option = Randomizer.nextInt(50);
                        int wmoption = (option / 2);
                        if (chance >= 51) {
                            if (option >= 20) {
                                nEquip.setStr((short) (nEquip.getStr() + option));
                                nEquip.setDex((short) (nEquip.getDex() + option));
                                nEquip.setInt((short) (nEquip.getInt() + option));
                                nEquip.setLuk((short) (nEquip.getLuk() + option));
                                nEquip.setWatk((short) (nEquip.getWatk() + wmoption));
                                nEquip.setMatk((short) (nEquip.getMatk() + wmoption));
                                break;
                            } else if (option < 20) {
                                option = 20;
                                wmoption = (option / 2);
                                nEquip.setStr((short) (nEquip.getStr() + option));
                                nEquip.setDex((short) (nEquip.getDex() + option));
                                nEquip.setInt((short) (nEquip.getInt() + option));
                                nEquip.setLuk((short) (nEquip.getLuk() + option));
                                nEquip.setWatk((short) (nEquip.getWatk() + wmoption));
                                nEquip.setMatk((short) (nEquip.getMatk() + wmoption));
                                break;
                            } else {
                                System.out.println("예외상황 발생");
                            }
                        } else if (chance <= 50) {
                            break;
                        } else {
                            System.out.println("예외상황 발생");
                        }
                    } else if (scrollId.getItemId() == 2049370) {
                        for (int i = 0; i < 12; i++) {
                            int at = 0;
                            int aps = 0;
                            boolean weapon = GameConstants.isWeapon(nEquip.getItemId());
                            switch (nEquip.getEnhance()) {// 성당 강화 확률
                                case 0:
                                    at = 19;
                                    aps = weapon ? 6 : 0;
                                    break;
                                case 1:
                                    at = 21;
                                    aps = weapon ? 6 : 0;
                                    break;
                                case 2:
                                    at = 23;
                                    aps = weapon ? 7 : 0;
                                    break;
                                case 3:
                                    at = 25;
                                    aps = weapon ? 7 : 0;
                                    break;
                                case 4:
                                    at = 27;
                                    aps = weapon ? 8 : 0;
                                    break;
                                case 5:
                                    aps = weapon ? 11 : 8;
                                    break;
                                case 6:
                                    aps = weapon ? 15 : 9;
                                    break;
                                case 7:
                                    aps = weapon ? 17 : 10;
                                    break;
                                case 8:
                                    aps = weapon ? 18 : 11;
                                    break;
                                case 9:
                                    aps = weapon ? 19 : 12;
                                    break;
                                case 10:
                                    aps = weapon ? 22 : 13;
                                    break;
                                case 11:
                                    aps = weapon ? 23 : 14;
                                    break;
                                case 12:
                                    aps = weapon ? 25 : 15;
                                    break;
                                case 13:
                                    aps = weapon ? 26 : 16;
                                    break;
                                case 14:
                                    aps = weapon ? 27 : 17;
                                    break;
                                default: //13성 이상
                                    break;
                            }
                            if (ItemInformation.getInstance().getReqLevel(nEquip.getItemId()) < 150) {
                                if (at > 0) {
                                    at -= ((150 - ItemInformation.getInstance().getReqLevel(nEquip.getItemId())) / 10) * 2;
                                }
                                if (aps > 0) {
                                    aps -= ((150 - ItemInformation.getInstance().getReqLevel(nEquip.getItemId())) / 10);
                                }
                            }
                            nEquip.setStr((short) (nEquip.getStr() + at));
                            nEquip.setDex((short) (nEquip.getDex() + at));
                            nEquip.setInt((short) (nEquip.getInt() + at));
                            nEquip.setLuk((short) (nEquip.getLuk() + at));
                            nEquip.setWatk((short) (nEquip.getWatk() + aps));
                            nEquip.setMatk((short) (nEquip.getMatk() + aps));
                            nEquip.setEnhance((byte) (nEquip.getEnhance() + 1));
                        }
                    } else if (scrollId.getItemId() == 2049371) {
                        int fo = scrollId.getItemId() == 2049371 ? 17 : 12;
                        for (int i = 0; i < fo; i++) {
                            EnforceSystem.StarForceStat(chr.getClient(), nEquip, null, i);
                            EnforceSystem.StarSystemUpgrade(nEquip, 1, chr);
                        }
                    } else if (GameConstants.isEquipScroll(scrollId.getItemId())) {
                        if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip), chr)) {
                            if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing() || nEquip.isAmazing()) {
                                chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                nEquip.setAmazing(false);
                            } else if (scrollId.getItemId() != 2049323) {
                                return null; //펑
                            }
                            failed = true;
                        } else {
                            for (int i = 1; i <= MapleDataTool.getIntConvert("info/forceUpgrade", getItemData(scrollId.getItemId()), 1); i++) {
                                if (GameConstants.isSuperior(nEquip.getItemId())) {
                                    int slevel = getReqLevel(nEquip.getItemId());
                                    int senhance = nEquip.getEnhance();
                                    if (senhance < 1) { // 0 -> 1
                                        nEquip.setStr((short) (nEquip.getStr() + (slevel > 140 ? 19 : slevel > 100 ? 9 : slevel > 70 ? 2 : 1)));
                                        nEquip.setDex((short) (nEquip.getDex() + (slevel > 140 ? 19 : slevel > 100 ? 9 : slevel > 70 ? 2 : 1)));
                                        nEquip.setInt((short) (nEquip.getInt() + (slevel > 140 ? 19 : slevel > 100 ? 9 : slevel > 70 ? 2 : 1)));
                                        nEquip.setLuk((short) (nEquip.getLuk() + (slevel > 140 ? 19 : slevel > 100 ? 9 : slevel > 70 ? 2 : 1)));
                                        nEquip.setEnhance((byte) 1);
                                    } else if (senhance == 1) { // 1 -> 2
                                        nEquip.setStr((short) (nEquip.getStr() + (slevel > 140 ? 20 : slevel > 100 ? 10 : slevel > 70 ? 3 : 2)));
                                        nEquip.setDex((short) (nEquip.getDex() + (slevel > 140 ? 20 : slevel > 100 ? 10 : slevel > 70 ? 3 : 2)));
                                        nEquip.setInt((short) (nEquip.getInt() + (slevel > 140 ? 20 : slevel > 100 ? 10 : slevel > 70 ? 3 : 2)));
                                        nEquip.setLuk((short) (nEquip.getLuk() + (slevel > 140 ? 20 : slevel > 100 ? 10 : slevel > 70 ? 3 : 2)));
                                        nEquip.setEnhance((byte) 2);
                                    } else if (senhance == 2) { // 2 -> 3
                                        nEquip.setStr((short) (nEquip.getStr() + (slevel > 140 ? 22 : slevel > 100 ? 12 : slevel > 70 ? 5 : 4)));
                                        nEquip.setDex((short) (nEquip.getDex() + (slevel > 140 ? 22 : slevel > 100 ? 12 : slevel > 70 ? 5 : 4)));
                                        nEquip.setInt((short) (nEquip.getInt() + (slevel > 140 ? 22 : slevel > 100 ? 12 : slevel > 70 ? 5 : 4)));
                                        nEquip.setLuk((short) (nEquip.getLuk() + (slevel > 140 ? 22 : slevel > 100 ? 12 : slevel > 70 ? 5 : 4)));
                                        nEquip.setEnhance((byte) 3);
                                    } else if (senhance == 3) { // 3 -> 4
                                        nEquip.setStr((short) (nEquip.getStr() + (slevel > 140 ? 25 : slevel > 100 ? 15 : slevel > 70 ? 8 : 7)));
                                        nEquip.setDex((short) (nEquip.getDex() + (slevel > 140 ? 25 : slevel > 100 ? 15 : slevel > 70 ? 8 : 7)));
                                        nEquip.setInt((short) (nEquip.getInt() + (slevel > 140 ? 25 : slevel > 100 ? 15 : slevel > 70 ? 8 : 7)));
                                        nEquip.setLuk((short) (nEquip.getLuk() + (slevel > 140 ? 25 : slevel > 100 ? 15 : slevel > 70 ? 8 : 7)));
                                        nEquip.setEnhance((byte) 4);
                                    } else if (senhance == 4) { // 4 -> 5
                                        nEquip.setStr((short) (nEquip.getStr() + (slevel > 140 ? 29 : slevel > 100 ? 19 : slevel > 70 ? 12 : 11)));
                                        nEquip.setDex((short) (nEquip.getDex() + (slevel > 140 ? 29 : slevel > 100 ? 19 : slevel > 70 ? 12 : 11)));
                                        nEquip.setInt((short) (nEquip.getInt() + (slevel > 140 ? 29 : slevel > 100 ? 19 : slevel > 70 ? 12 : 11)));
                                        nEquip.setLuk((short) (nEquip.getLuk() + (slevel > 140 ? 29 : slevel > 100 ? 19 : slevel > 70 ? 12 : 11)));
                                        nEquip.setEnhance((byte) 5);
                                    } else if (senhance == 5) { // 5 -> 6
                                        nEquip.setWatk((short) (nEquip.getWatk() + (slevel > 140 ? 9 : slevel > 100 ? 5 : slevel > 70 ? 2 : 2)));
                                        nEquip.setMatk((short) (nEquip.getMatk() + (slevel > 140 ? 9 : slevel > 100 ? 5 : slevel > 70 ? 2 : 2)));
                                        nEquip.setEnhance((byte) 6);
                                    } else if (senhance == 6) { // 6 -> 7
                                        nEquip.setWatk((short) (nEquip.getWatk() + (slevel > 140 ? 10 : slevel > 100 ? 6 : slevel > 70 ? 3 : 3)));
                                        nEquip.setMatk((short) (nEquip.getMatk() + (slevel > 140 ? 10 : slevel > 100 ? 6 : slevel > 70 ? 3 : 3)));
                                        nEquip.setEnhance((byte) 7);
                                    } else if (senhance == 7) { // 7 -> 8
                                        nEquip.setWatk((short) (nEquip.getWatk() + (slevel > 140 ? 11 : slevel > 100 ? 7 : slevel > 70 ? 4 : 5)));
                                        nEquip.setMatk((short) (nEquip.getMatk() + (slevel > 140 ? 11 : slevel > 100 ? 7 : slevel > 70 ? 4 : 5)));
                                        nEquip.setEnhance((byte) 8);
                                    } else if (senhance == 8) { // 8 -> 9
                                        nEquip.setWatk((short) (nEquip.getWatk() + (slevel > 140 ? 12 : slevel > 100 ? 8 : slevel > 70 ? 5 : 8)));
                                        nEquip.setMatk((short) (nEquip.getMatk() + (slevel > 140 ? 12 : slevel > 100 ? 8 : slevel > 70 ? 5 : 8)));
                                        nEquip.setEnhance((byte) 9);
                                    } else if (senhance == 9) { // 9 -> 10
                                        nEquip.setWatk((short) (nEquip.getWatk() + (slevel > 140 ? 13 : slevel > 100 ? 9 : slevel > 70 ? 6 : 12)));
                                        nEquip.setMatk((short) (nEquip.getMatk() + (slevel > 140 ? 13 : slevel > 100 ? 9 : slevel > 70 ? 6 : 12)));
                                        nEquip.setEnhance((byte) 10);
                                    } else {
                                        nEquip.setStr((short) (nEquip.getStr() + (slevel > 140 ? 30 : slevel > 100 ? 20 : slevel > 70 ? 15 : 10)));
                                        nEquip.setDex((short) (nEquip.getDex() + (slevel > 140 ? 30 : slevel > 100 ? 20 : slevel > 70 ? 15 : 10)));
                                        nEquip.setInt((short) (nEquip.getInt() + (slevel > 140 ? 30 : slevel > 100 ? 20 : slevel > 70 ? 15 : 10)));
                                        nEquip.setLuk((short) (nEquip.getLuk() + (slevel > 140 ? 30 : slevel > 100 ? 20 : slevel > 70 ? 15 : 10)));
                                        nEquip.setEnhance((byte) (nEquip.getEnhance() + 1));
                                    }
                                } else {
                                    if (nEquip.getStr() > 0) {
                                        nEquip.setStr((short) (nEquip.getStr() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(0, 1))));
                                    }
                                    if (nEquip.getDex() > 0) {
                                        nEquip.setDex((short) (nEquip.getDex() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(0, 1))));
                                    }
                                    if (nEquip.getInt() > 0) {
                                        nEquip.setInt((short) (nEquip.getInt() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(0, 1))));
                                    }
                                    if (nEquip.getLuk() > 0) {
                                        nEquip.setLuk((short) (nEquip.getLuk() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(0, 1))));
                                    }
                                    if (nEquip.getWatk() > 0) {
                                        nEquip.setWatk((short) (nEquip.getWatk() + (GameConstants.isWeapon(nEquip.getItemId()) ? 무기마공공식(nEquip.getWatk()) : 방어구마공공식(nEquip.getWatk()))));
                                    }
                                    if (nEquip.getWdef() > 0) {
                                        nEquip.setWdef((short) (nEquip.getWdef() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(1, 2))));
                                    }
                                    if (nEquip.getMatk() > 0) {
                                        nEquip.setMatk((short) (nEquip.getMatk() + (GameConstants.isWeapon(nEquip.getItemId()) ? 무기마공공식(nEquip.getMatk()) : 방어구마공공식(nEquip.getMatk()))));
                                    }
                                    if (nEquip.getMdef() > 0) {
                                        nEquip.setMdef((short) (nEquip.getMdef() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(1, 2))));
                                    }
                                    if (nEquip.getAcc() > 0) {
                                        nEquip.setAcc((short) (nEquip.getAcc() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(1, 2))));
                                    }
                                    if (nEquip.getAvoid() > 0) {
                                        nEquip.setAvoid((short) (nEquip.getAvoid() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(1, 2))));
                                    }
                                    if (nEquip.getHp() > 0) {
                                        nEquip.setMp((short) (nEquip.getHp() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(1, 2))));
                                    }
                                    if (nEquip.getMp() > 0) {
                                        nEquip.setMp((short) (nEquip.getMp() + getEquipLevel(getReqLevel(nEquip.getItemId()) + Randomizer.rand(1, 2))));
                                    }
                                    nEquip.setEnhance((byte) (nEquip.getEnhance() + 1)); //이게 별붙는 부분
                                    if (nEquip.getEnhance() >= 8) {
                                        WorldBroadcasting.broadcastMessage(UIPacket.enforceMSG(chr.getName() + "님의 " + ItemInformation.getInstance().getName(nEquip.getItemId()) + " 이(가) " + nEquip.getEnhance() + "성 강화에 성공 하였습니다.", 48, 5000));
                                    }
                                }
                            }
                        }
                        break;
                    } else if ((scrollId.getItemId() == 2049360) || (scrollId.getItemId() == 2049361)) {//아이템
                        int at = 0;
                        int aps = 0;
                        int suc = 10;
                        boolean weapon = GameConstants.isWeapon(nEquip.getItemId());
                        switch (nEquip.getEnhance()) {// 성당 강화 확률
                            case 0:
                                at = 19;
                                aps = weapon ? 6 : 0;
                                suc = 60;
                                break;
                            case 1:
                                at = 21;
                                aps = weapon ? 6 : 0;
                                suc = 55;
                                break;
                            case 2:
                                at = 23;
                                aps = weapon ? 7 : 0;
                                suc = 50;
                                break;
                            case 3:
                                at = 25;
                                aps = weapon ? 7 : 0;
                                suc = 40;
                                break;
                            case 4:
                                at = 27;
                                aps = weapon ? 8 : 0;
                                suc = 30;
                                break;
                            case 5:
                                aps = weapon ? 11 : 8;
                                suc = 20;
                                break;
                            case 6:
                                aps = weapon ? 15 : 9;
                                suc = 19;
                                break;
                            case 7:
                                aps = weapon ? 17 : 10;
                                suc = 18;
                                break;
                            case 8:
                                aps = weapon ? 18 : 11;
                                suc = 17;
                                break;
                            case 9:
                                aps = weapon ? 19 : 12;
                                suc = 16;
                                break;
                            case 10:
                                aps = weapon ? 22 : 13;
                                suc = 14;
                                break;
                            case 11:
                                aps = weapon ? 23 : 14;
                                suc = 12;
                                break;
                            case 12:
                                aps = weapon ? 25 : 15;
                                break;
                            case 13:
                                aps = weapon ? 26 : 16;
                                break;
                            case 14:
                                aps = weapon ? 27 : 17;
                                break;
                            default: //13성 이상
                                break;
                        }
                        if (chr.isGM()) {
                            suc = 100;
                        }
                        if (!Randomizer.isSuccess(suc)) {
                            if (Randomizer.isSuccess(100)) {
                                if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                    chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                    nEquip.setAmazing(false);
                                } else {
                                    return null; //펑
                                }
                            }
                            failed = true;
                        } else {
                            if (ItemInformation.getInstance().getReqLevel(nEquip.getItemId()) < 150) {
                                if (at > 0) {
                                    at -= ((150 - ItemInformation.getInstance().getReqLevel(nEquip.getItemId())) / 10) * 2;
                                }
                                if (aps > 0) {
                                    aps -= ((150 - ItemInformation.getInstance().getReqLevel(nEquip.getItemId())) / 10);
                                }
                            }
                            nEquip.setStr((short) (nEquip.getStr() + at));
                            nEquip.setDex((short) (nEquip.getDex() + at));
                            nEquip.setInt((short) (nEquip.getInt() + at));
                            nEquip.setLuk((short) (nEquip.getLuk() + at));
                            nEquip.setWatk((short) (nEquip.getWatk() + aps));
                            nEquip.setMatk((short) (nEquip.getMatk() + aps));
                            nEquip.setEnhance((byte) (nEquip.getEnhance() + 1));
                        }
                        break;
                    } else if (GameConstants.isPotentialScroll(scrollId.getItemId())) {
                        if (nEquip.getState() == 0) {
                            if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip))) {
                                if (Randomizer.isSuccess(getCursed(scrollId.getItemId(), chr))) {
                                    if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                        chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                        nEquip.setAmazing(false);
                                    } else {
                                        return null; //펑
                                    }
                                }
                                failed = true;
                            } else {
                                nEquip.setState((byte) 1);
                            }
                        }
                        break;
                    } else if (GameConstants.isRebirhFireScroll(scrollId.getItemId())) {
                        if (nEquip.getFire() == -1) {
                            if (Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip))) {
                                nEquip.setFire((byte) 5);
                                if (nZero != null) {
                                    nZero.setFire((byte) 5);
                                }
                                nEquip = randomizeStatsFire((Equip) nEquip, true);
                                if (nZero != null) {
                                    nEquip = randomizeStatsFire((Equip) nEquip, true);
                                }
                            }
                        } else if (Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip))) {
                            nEquip = randomizeStatsFire((Equip) nEquip, false);
                        }
                        break;
                    } else {
                        if (!Randomizer.isSuccess(getSuccess(scrollId.getItemId(), chr, nEquip), chr)) {
                            if (Randomizer.isSuccess(getCursed(scrollId.getItemId(), chr))) {
                                if (ItemFlag.PROTECT.check(nEquip.getFlag()) || nEquip.isAmazing()) {
                                    chr.dropMessage(5, "주문서의 효과로 아이템이 파괴되지 않았습니다.");
                                    nEquip.setAmazing(false);
                                } else {
                                    return null; //펑
                                }
                            }
                            failed = true;
                        } else {
                            for (Entry<String, Integer> stat : stats.entrySet()) {
                                final String key = stat.getKey();

                                if (key.equals("STR")) {
                                    nEquip.setStr((short) (nEquip.getStr() + stat.getValue().intValue()));
                                } else if (key.equals("DEX")) {
                                    nEquip.setDex((short) (nEquip.getDex() + stat.getValue().intValue()));
                                } else if (key.equals("INT")) {
                                    nEquip.setInt((short) (nEquip.getInt() + stat.getValue().intValue()));
                                } else if (key.equals("LUK")) {
                                    nEquip.setLuk((short) (nEquip.getLuk() + stat.getValue().intValue()));
                                } else if (key.equals("PAD")) {
                                    nEquip.setWatk((short) (nEquip.getWatk() + stat.getValue().intValue()));
                                } else if (key.equals("PDD")) {
                                    nEquip.setWdef((short) (nEquip.getWdef() + stat.getValue().intValue()));
                                } else if (key.equals("MAD")) {
                                    nEquip.setMatk((short) (nEquip.getMatk() + stat.getValue().intValue()));
                                } else if (key.equals("MDD")) {
                                    nEquip.setMdef((short) (nEquip.getMdef() + stat.getValue().intValue()));
                                } else if (key.equals("ACC")) {
                                    nEquip.setAcc((short) (nEquip.getAcc() + stat.getValue().intValue()));
                                } else if (key.equals("EVA")) {
                                    nEquip.setAvoid((short) (nEquip.getAvoid() + stat.getValue().intValue()));
                                } else if (key.equals("Speed")) {
                                    nEquip.setSpeed((short) (nEquip.getSpeed() + stat.getValue().intValue()));
                                } else if (key.equals("Jump")) {
                                    nEquip.setJump((short) (nEquip.getJump() + stat.getValue().intValue()));
                                } else if (key.equals("MHP")) {
                                    nEquip.setHp((short) (nEquip.getHp() + stat.getValue().intValue()));
                                } else if (key.equals("MMP")) {
                                    nEquip.setMp((short) (nEquip.getMp() + stat.getValue().intValue()));
                                } else if (key.equals("MHPr")) {
                                    nEquip.setHpR((short) (nEquip.getHpR() + stat.getValue().intValue()));
                                } else if (key.equals("MMPr")) {
                                    nEquip.setMpR((short) (nEquip.getMpR() + stat.getValue().intValue()));
                                }
                            }
                        }
                        break;
                    }
                }
            }
            if (!GameConstants.isCleanSlate(scrollId.getItemId()) && !GameConstants.isSpecialScroll(scrollId.getItemId()) && !GameConstants.isEquipScroll(scrollId.getItemId()) && !GameConstants.isPotentialScroll(scrollId.getItemId()) && !GameConstants.isRebirhFireScroll(scrollId.getItemId()) && !GameConstants.isEpicScroll(scrollId.getItemId()) && scrollId.getItemId() != 2049360 && scrollId.getItemId() != 2049361) {
                if (ItemFlag.SAFETY.check(nEquip.getFlag()) && failed) {
                    chr.dropMessage(5, "주문서의 효과로 업그레이드 가능 횟수가 차감되지 않았습니다.");
                } else {
                    nEquip.setUpgradeSlots((byte) (nEquip.getUpgradeSlots() - getUpgradeScrollUseSlot(scrollId.getItemId())));
                }
                if (!failed) {
                    nEquip.setLevel((byte) (nEquip.getLevel() + 1));
                }
            }
        }
        return equip;
    }

    private static int getEquipLevel(int level) {
        int stat = 0;
        if (level >= 0 && level <= 50) {
            stat = 1;
        } else if (level >= 51 && level <= 100) {
            stat = 2;
        } else {
            stat = 3;
        }
        return stat;
    }

    public final IItem getEquipById(final int equipId) {
        return getEquipById(equipId, -1);
    }

    public final IItem getEquipById(final int equipId, final int ringId) {
        final Equip nEquip = new Equip(equipId, (byte) 0, (byte) 0);
        nEquip.setQuantity((short) 1);
        final Map<String, Integer> stats = getEquipStats(equipId);
        if (stats != null) {
            for (Entry<String, Integer> stat : stats.entrySet()) {
                final String key = stat.getKey();

                if (key.equals("STR")) {
                    nEquip.setStr((short) stat.getValue().intValue());
                } else if (key.equals("DEX")) {
                    nEquip.setDex((short) stat.getValue().intValue());
                } else if (key.equals("INT")) {
                    nEquip.setInt((short) stat.getValue().intValue());
                } else if (key.equals("LUK")) {
                    nEquip.setLuk((short) stat.getValue().intValue());
                } else if (key.equals("PAD")) {
                    nEquip.setWatk((short) stat.getValue().intValue());
                } else if (key.equals("PDD")) {
                    nEquip.setWdef((short) stat.getValue().intValue());
                } else if (key.equals("MAD")) {
                    nEquip.setMatk((short) stat.getValue().intValue());
                } else if (key.equals("MDD")) {
                    nEquip.setMdef((short) stat.getValue().intValue());
                } else if (key.equals("ACC")) {
                    nEquip.setAcc((short) stat.getValue().intValue());
                } else if (key.equals("EVA")) {
                    nEquip.setAvoid((short) stat.getValue().intValue());
                } else if (key.equals("Speed")) {
                    nEquip.setSpeed((short) stat.getValue().intValue());
                } else if (key.equals("Jump")) {
                    nEquip.setJump((short) stat.getValue().intValue());
                } else if (key.equals("MHP")) {
                    nEquip.setHp((short) stat.getValue().intValue());
                } else if (key.equals("MMP")) {
                    nEquip.setMp((short) stat.getValue().intValue());
                } else if (key.equals("MHPr")) {
                    nEquip.setHpR((short) stat.getValue().intValue());
                } else if (key.equals("MMPr")) {
                    nEquip.setMpR((short) stat.getValue().intValue());
                } else if (key.equals("tuc")) {
                    nEquip.setUpgradeSlots((byte) stat.getValue().intValue());
                } else if (key.equals("Craft")) {
                    nEquip.setHands((short) stat.getValue().intValue());
                } else if (key.equals("durability")) {
                    nEquip.setDurability(stat.getValue().intValue());
                } else if (key.equals("imdR")) {
                    nEquip.setIgnoreWdef(stat.getValue().shortValue());
                } else if (key.equals("bdR")) {
                    nEquip.setBossDamage(stat.getValue().byteValue());
                }
            }
        }
        equipCache.put(equipId, nEquip);
        return nEquip.copy();
    }

    private final int 방어구마공공식(int i) {
        if (i >= 25) {
            return 6;
        } else if (i >= 20) {
            return 5;
        } else if (i >= 15) {
            return 4;
        } else if (i >= 10) {
            return 3;
        } else if (i >= 1) {
            return 2;
        } else {
            return 0;
        }
    }

    private final int 무기마공공식(int i) {
        if (i >= 250) {
            return 6;
        } else if (i >= 200) {
            return 5;
        } else if (i >= 150) {
            return 4;
        } else if (i >= 100) {
            return 3;
        } else if (i >= 50) {
            return 2;
        } else {
            return 0;
        }
    }

    private final short getRandStat(final short defaultValue, final int maxRange) {
        if (defaultValue == 0) {
            return 0;
        }
        // vary no more than ceil of 10% of stat
        final int lMaxRange = (int) Math.min(Math.ceil(defaultValue * 0.1), maxRange);
        return (short) ((defaultValue - lMaxRange) + Math.floor(Math.random() * (lMaxRange * 2 + 1)));
    }

    protected final short getRandStatFusion(final short defaultValue, final int value1, final int value2) {
        if (defaultValue == 0) {
            return 0;
        }
        final int range = ((value1 + value2) / 2) - defaultValue;
        final int rand = Randomizer.nextInt(Math.abs(range) + 1);
        return (short) (defaultValue + (range < 0 ? -rand : rand));
    }

    protected final short getRandStatAbove(final short defaultValue, final int maxRange) {
        if (defaultValue <= 0) {
            return 0;
        }
        final int lMaxRange = (int) Math.min(Math.ceil(defaultValue * 0.1), maxRange);

        return (short) ((defaultValue) + Randomizer.nextInt(lMaxRange + 1));
    }

    public final Equip randomizeStats(final Equip equip, final boolean potential) {

        equip.setStr(getRandStat(equip.getStr(), 5));
        equip.setDex(getRandStat(equip.getDex(), 5));
        equip.setInt(getRandStat(equip.getInt(), 5));
        equip.setLuk(getRandStat(equip.getLuk(), 5));
        equip.setMatk(getRandStat(equip.getMatk(), 5));
        equip.setWatk(getRandStat(equip.getWatk(), 5));
        equip.setAcc(getRandStat(equip.getAcc(), 5));
        equip.setAvoid(getRandStat(equip.getAvoid(), 5));
        equip.setJump(getRandStat(equip.getJump(), 5));
        equip.setHands(getRandStat(equip.getHands(), 5));
        equip.setSpeed(getRandStat(equip.getSpeed(), 5));
        equip.setWdef(getRandStat(equip.getWdef(), 10));
        equip.setMdef(getRandStat(equip.getMdef(), 10));
        equip.setHp(getRandStat(equip.getHp(), 10));
        equip.setMp(getRandStat(equip.getMp(), 10));
        //   if (equip.getItemId() / 10000 != 166 && equip.getItemId() / 10000 != 167) { // ANDROID
        //       if (Randomizer.nextInt(1000) < 333 && potential) {
        //           equip.setState((byte) 1);
        //       }
        //   }

        return equip;
    }

    public final SkillStatEffect getItemEffect(final int itemId) {
        SkillStatEffect ret = itemEffects.get(Integer.valueOf(itemId));
        if (ret == null) {
            final MapleData item = getItemData(itemId);
            if (item == null) {
                return null;
            }
            ret = SkillStatEffect.loadItemEffectFromData(item.getChildByPath("spec"), itemId);
            itemEffects.put(Integer.valueOf(itemId), ret);
        }
        return ret;
    }

    public final List<Pair<Integer, Integer>> getSummonMobs(final int itemId) {
        if (summonMobCache.containsKey(Integer.valueOf(itemId))) {
            return summonMobCache.get(itemId);
        }
        if (!GameConstants.isSummonSack(itemId)) {
            return null;
        }
        final MapleData data = getItemData(itemId).getChildByPath("mob");
        if (data == null) {
            return null;
        }
        final List<Pair<Integer, Integer>> mobPairs = new ArrayList<Pair<Integer, Integer>>();

        for (final MapleData child : data.getChildren()) {
            mobPairs.add(new Pair(
                    MapleDataTool.getIntConvert("id", child),
                    MapleDataTool.getIntConvert("prob", child)));
        }
        summonMobCache.put(itemId, mobPairs);
        return mobPairs;
    }

    public final int getCardMobId(final int id) {
        if (id == 0) {
            return 0;
        }
        if (monsterBookID.containsKey(id)) {
            return monsterBookID.get(id);
        }
        final MapleData data = getItemData(id);
        final int monsterid = MapleDataTool.getIntConvert("info/mob", data, 0);

        if (monsterid == 0) { // Hack.
            return 0;
        }
        monsterBookID.put(id, monsterid);
        return monsterBookID.get(id);
    }

    public final int getWatkForProjectile(final int itemId) {
        Integer atk = projectileWatkCache.get(itemId);
        if (atk != null) {
            return atk.intValue();
        }
        final MapleData data = getItemData(itemId);
        atk = Integer.valueOf(MapleDataTool.getInt("info/incPAD", data, 0));
        projectileWatkCache.put(itemId, atk);
        return atk.intValue();
    }

    public final boolean canScroll(final int scrollid, final int itemid) {
        return (scrollid / 100) % 100 == (itemid / 10000) % 100;
    }

    public final boolean notReturn(final int scrollid) {
        switch (scrollid / 1000) {
            case 1352:
            case 167:
            case 1099:
            case 1098:
            case 2046:
            case 2047:
                return true;
        }
        return false;
    }

    public final String getName(final int itemId) {
        if (nameCache.containsKey(itemId)) {
            return nameCache.get(itemId);
        }
        final MapleData strings = getStringData(itemId);
        if (strings == null) {
            return null;
        }
        final String ret = MapleDataTool.getString("name", strings, null);
        nameCache.put(itemId, ret);
        return ret;
    }

    public final String getDesc(final int itemId) {
        if (descCache.containsKey(itemId)) {
            return descCache.get(itemId);
        }
        final MapleData strings = getStringData(itemId);
        if (strings == null) {
            return null;
        }
        final String ret = MapleDataTool.getString("desc", strings, null);
        descCache.put(itemId, ret);
        return ret;
    }

    public final String getMsg(final int itemId) {
        if (msgCache.containsKey(itemId)) {
            return msgCache.get(itemId);
        }
        final MapleData strings = getStringData(itemId);
        if (strings == null) {
            return null;
        }
        final String ret = MapleDataTool.getString("msg", strings, null);
        msgCache.put(itemId, ret);
        return ret;
    }

    public final short getItemMakeLevel(final int itemId) {
        if (itemMakeLevel.containsKey(itemId)) {
            return itemMakeLevel.get(itemId);
        }
        if (itemId / 10000 != 400) {
            return 0;
        }
        final short lvl = (short) MapleDataTool.getIntConvert("info/lv", getItemData(itemId), 0);
        itemMakeLevel.put(itemId, lvl);
        return lvl;
    }

    public final byte isConsumeOnPickup(final int itemId) {
        // 0 = not, 1 = consume on pickup, 2 = consume + party
        if (consumeOnPickupCache.containsKey(itemId)) {
            return consumeOnPickupCache.get(itemId);
        }
        final MapleData data = getItemData(itemId);
        byte consume = (byte) MapleDataTool.getIntConvert("spec/consumeOnPickup", data, 0);
        if (consume == 0) {
            consume = (byte) MapleDataTool.getIntConvert("specEx/consumeOnPickup", data, 0);
        }
        if (consume == 1) {
            if (MapleDataTool.getIntConvert("spec/party", getItemData(itemId), 0) > 0) {
                consume = 2;
            }
        }
        consumeOnPickupCache.put(itemId, consume);
        return consume;
    }

    public final byte isRunOnPickup(final int itemid) {
        if (runOnPickupCache.containsKey(itemid)) {
            return runOnPickupCache.get(itemid);
        }
        final MapleData data = getItemData(itemid);
        byte run = (byte) MapleDataTool.getIntConvert("spec/runOnPickup", data, 0);
        runOnPickupCache.put(itemid, run);
        return run;
    }

    public final boolean isDropRestricted(final int itemId) {
        if (dropRestrictionCache.containsKey(itemId)) {
            return dropRestrictionCache.get(itemId);
        }
        final MapleData data = getItemData(itemId);

        boolean trade = false;
        if (MapleDataTool.getIntConvert("info/tradeBlock", data, 0) == 1
                || MapleDataTool.getIntConvert("info/quest", data, 0) == 1
                || MapleDataTool.getIntConvert("info/accountSharable", data, 0) == 1) {
            trade = true;
        }
        dropRestrictionCache.put(itemId, trade);
        return trade;
    }

    public final boolean isTradeBlock(final int itemId) {
        final MapleData data = getItemData(itemId);
        boolean tradeblock = false;
        if (MapleDataTool.getIntConvert("info/tradeBlock", data, 0) == 1
                || MapleDataTool.getIntConvert("info/quest", data, 0) == 1
                || MapleDataTool.getIntConvert("info/accountSharable", data, 0) == 1) {
            tradeblock = true;
        }
        return tradeblock;
    }

    public final boolean isOnlyTradeBlock(final int itemId) {
        final MapleData data = getItemData(itemId);
        boolean tradeblock = false;
        if (MapleDataTool.getIntConvert("info/tradeBlock", data, 0) == 1) {
            tradeblock = true;
        }
        return tradeblock;
    }

    public final boolean isExpireOnLogout(final int itemId) {
        if (expirationOnLogOutCache.containsKey(itemId)) {
            return expirationOnLogOutCache.get(itemId);
        }
        final MapleData data = getItemData(itemId);

        boolean expire = false;
        if (MapleDataTool.getIntConvert("info/expireOnLogout", data, 0) == 1) {
            expire = true;
        }
        expirationOnLogOutCache.put(itemId, expire);
        return expire;
    }

    public final boolean isPickupRestricted(final int itemId) {
        if (pickupRestrictionCache.containsKey(itemId)) {
            return pickupRestrictionCache.get(itemId);
        }
        final boolean bRestricted = MapleDataTool.getIntConvert("info/only", getItemData(itemId), 0) == 1;

        pickupRestrictionCache.put(itemId, bRestricted);
        return bRestricted;
    }

    public final Pair<Integer, List<StructRewardItem>> getRewardItem(final int itemid) {
        if (RewardItem.containsKey(itemid)) {
            return RewardItem.get(itemid);
        }
        final MapleData data = getItemData(itemid);
        if (data == null) {
            return null;
        }
        final MapleData rewards = data.getChildByPath("reward");
        if (rewards == null) {
            return null;
        }
        int totalprob = 0; // As there are some rewards with prob above 2000, we can't assume it's always 100
        List<StructRewardItem> all = new ArrayList();

        for (final MapleData reward : rewards) {
            StructRewardItem struct = new StructRewardItem();

            struct.itemid = MapleDataTool.getInt("item", reward, 0);
            struct.prob = (byte) MapleDataTool.getInt("prob", reward, 0);
            struct.quantity = (short) MapleDataTool.getInt("count", reward, 0);
            struct.statGrade = MapleDataTool.getInt("statGrade", reward, 0);
            struct.effect = MapleDataTool.getString("Effect", reward, "");
            struct.worldmsg = MapleDataTool.getString("worldMsg", reward, null);
            struct.period = MapleDataTool.getInt("period", reward, -1);

            totalprob += struct.prob;

            all.add(struct);
        }
        Pair<Integer, List<StructRewardItem>> toreturn = new Pair(totalprob, all);
        RewardItem.put(itemid, toreturn);
        return toreturn;
    }

    public final Map<String, Integer> getSkillStats(final int itemId) {
        if (SkillStatsCache.containsKey(itemId)) {
            return SkillStatsCache.get(itemId);
        }
        if (!(itemId / 10000 == 228 || itemId / 10000 == 229)) { // Skillbook and mastery book
            return null;
        }
        final MapleData item = getItemData(itemId);
        if (item == null) {
            return null;
        }
        final MapleData info = item.getChildByPath("info");
        if (info == null) {
            return null;
        }
        final Map<String, Integer> ret = new LinkedHashMap<String, Integer>();
        for (final MapleData data : info.getChildren()) {
            if (data.getName().startsWith("inc")) {
                ret.put(data.getName().substring(3), MapleDataTool.getIntConvert(data));
            }
        }
        ret.put("masterLevel", MapleDataTool.getInt("masterLevel", info, 0));
        ret.put("reqSkillLevel", MapleDataTool.getInt("reqSkillLevel", info, 0));
        ret.put("success", MapleDataTool.getInt("success", info, 0));

        final MapleData skill = info.getChildByPath("skill");

        for (int i = 0; i < skill.getChildren().size(); i++) { // List of allowed skillIds
            ret.put("skillid" + i, MapleDataTool.getInt(Integer.toString(i), skill, 0));
        }
        SkillStatsCache.put(itemId, ret);
        return ret;
    }

    public final List<Integer> petsCanConsume(final int itemId) {
        final List<Integer> ret = new ArrayList<Integer>();
        final MapleData data = getItemData(itemId);
        int curPetId = 0;
        int size = data.getChildren().size();
        int count = 0;
        while (true) {
            curPetId = MapleDataTool.getInt("spec/" + Integer.toString(count), data, 0);
            if (curPetId == 0) {
                break;
            }
            ret.add(Integer.valueOf(curPetId));
            count++;
        }
        return ret;
    }

    public final int getTameness(final int itemId) {
        return MapleDataTool.getInt("spec/incTameness", getItemData(itemId), 0);
    }

    public final int getRepleteness(final int itemId) {
        return MapleDataTool.getInt("spec/incRepleteness", getItemData(itemId), 0);
    }

    public final boolean isQuestItem(final int itemId) {
        if (isQuestItemCache.containsKey(itemId)) {
            return isQuestItemCache.get(itemId);
        }
        final boolean questItem = MapleDataTool.getIntConvert("info/quest", getItemData(itemId), 0) == 1;
        isQuestItemCache.put(itemId, questItem);
        return questItem;
    }

    public final boolean itemExists(final int itemId) {
        if (GameConstants.getInventoryType(itemId) == MapleInventoryType.UNDEFINED) {
            return false;
        }
        return getItemData(itemId) != null;
    }

    public final boolean isCash(final int itemid) {
        if (getEquipStats(itemid) == null) {
            return GameConstants.getInventoryType(itemid) == MapleInventoryType.CASH;
        }
        return GameConstants.getInventoryType(itemid) == MapleInventoryType.CASH || getEquipStats(itemid).get("cash") > 0;
    }

    public final boolean pickupItem(final int itemid) {
        if (getItemData(itemid) == null) {
            return false;
        }
        return MapleDataTool.getIntConvert("info/pickupItem", getItemData(itemid), 0) == 1;
    }

    public final Equip fuse(final Equip equip1, final Equip equip2) {
        if (equip1.getItemId() != equip2.getItemId()) {
            return equip1;
        }
        final Equip equip = (Equip) getEquipById(equip1.getItemId());
        equip.setStr(getRandStatFusion(equip.getStr(), equip1.getStr(), equip2.getStr()));
        equip.setDex(getRandStatFusion(equip.getDex(), equip1.getDex(), equip2.getDex()));
        equip.setInt(getRandStatFusion(equip.getInt(), equip1.getInt(), equip2.getInt()));
        equip.setLuk(getRandStatFusion(equip.getLuk(), equip1.getLuk(), equip2.getLuk()));
        equip.setMatk(getRandStatFusion(equip.getMatk(), equip1.getMatk(), equip2.getMatk()));
        equip.setWatk(getRandStatFusion(equip.getWatk(), equip1.getWatk(), equip2.getWatk()));
        equip.setAcc(getRandStatFusion(equip.getAcc(), equip1.getAcc(), equip2.getAcc()));
        equip.setAvoid(getRandStatFusion(equip.getAvoid(), equip1.getAvoid(), equip2.getAvoid()));
        equip.setJump(getRandStatFusion(equip.getJump(), equip1.getJump(), equip2.getJump()));
        equip.setHands(getRandStatFusion(equip.getHands(), equip1.getHands(), equip2.getHands()));
        equip.setSpeed(getRandStatFusion(equip.getSpeed(), equip1.getSpeed(), equip2.getSpeed()));
        equip.setWdef(getRandStatFusion(equip.getWdef(), equip1.getWdef(), equip2.getWdef()));
        equip.setMdef(getRandStatFusion(equip.getMdef(), equip1.getMdef(), equip2.getMdef()));
        equip.setHp(getRandStatFusion(equip.getHp(), equip1.getHp(), equip2.getHp()));
        equip.setMp(getRandStatFusion(equip.getMp(), equip1.getMp(), equip2.getMp()));
        return equip;
    }

    public final int getTotalStat(final Equip equip) { //i get COOL when my defense is higher on gms...
        return equip.getStr() + equip.getDex() + equip.getInt() + equip.getLuk() + equip.getMatk() + equip.getWatk() + equip.getAcc() + equip.getAvoid() + equip.getJump()
                + equip.getHands() + equip.getSpeed() + equip.getHp() + equip.getMp() + equip.getWdef() + equip.getMdef();
    }

    public final Equip levelUpItem(Equip e) {
        e.setItemLevel((byte) (e.getItemLevel() + 1));
        e.setItemEXP(0);
        StructEquipLevel stats = getEquipLevelStat(e.getItemId(), e.getItemLevel());
        if (stats.incSTRMin > 0) {
            e.setStr((short) (e.getStr() + Randomizer.rand(stats.incSTRMin, stats.incSTRMax)));
        }
        if (stats.incDEXMin > 0) {
            e.setDex((short) (e.getDex() + Randomizer.rand(stats.incDEXMin, stats.incDEXMax)));
        }
        if (stats.incINTMin > 0) {
            e.setInt((short) (e.getInt() + Randomizer.rand(stats.incINTMin, stats.incINTMax)));
        }
        if (stats.incLUKMin > 0) {
            e.setLuk((short) (e.getLuk() + Randomizer.rand(stats.incLUKMin, stats.incLUKMax)));
        }
        if (stats.incMHPMin > 0) {
            e.setHp((short) (e.getHp() + Randomizer.rand(stats.incMHPMin, stats.incMHPMax)));
        }
        return e;
    }

    public final int getCashCharmExp(Equip equip) {
        if (!equip.isCash()) {
            return 0;
        }
        int id = equip.getItemId() / 10000;
        if (GameConstants.isWeapon(equip.getItemId())) {
            return 60; //무기
        } else if (id == 109 || id == 110 || id == 113) {
            return 10; //방패 & 망토 & 벨트
        } else if (GameConstants.isAccessory(equip.getItemId())) {
            return 40; //악세사리
        } else if (id == 100) {
            return 50; //투구
        } else if (id == 104 || id == 106) {
            return 30; //상의, 하의
        } else if (id == 105) {
            return 60; //한벌옷
        } else if (id == 108) {
            return 40; //장갑
        } else if (id == 107) {
            return 40; //신발
        }
        return 0;
    }

    public final short getSlotMax(final int itemId) {
        final MapleData item = getItemData(itemId);
        if (item == null) {
            return 0;
        }
        if (itemId == 4000313) {
            return 1000;
        }
        return slotMax;
    }

    public MapleInventoryType getInventoryType(int itemId) {
        if (inventoryTypeCache.containsKey(itemId)) {
            return inventoryTypeCache.get(itemId);
        }
        MapleInventoryType ret;
        String idStr = "0" + String.valueOf(itemId);
        MapleDataDirectoryEntry root = itemData.getRoot();
        for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            for (MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr.substring(0, 4) + ".img")) {
                    ret = MapleInventoryType.getByWZName(topDir.getName());
                    inventoryTypeCache.put(itemId, ret);
                    return ret;
                } else if (iFile.getName().equals(idStr.substring(1) + ".img")) {
                    ret = MapleInventoryType.getByWZName(topDir.getName());
                    inventoryTypeCache.put(itemId, ret);
                    return ret;
                }
            }
        }
        root = equipData.getRoot();
        for (MapleDataDirectoryEntry topDir : root.getSubdirectories()) {
            for (MapleDataFileEntry iFile : topDir.getFiles()) {
                if (iFile.getName().equals(idStr + ".img")) {
                    ret = MapleInventoryType.EQUIP;
                    inventoryTypeCache.put(itemId, ret);
                    return ret;
                }
            }
        }
        ret = MapleInventoryType.UNDEFINED;
        inventoryTypeCache.put(itemId, ret);
        return ret;
    }

    public final Equip randomizeStats(final Equip equip) {
        equip.setStr(getRandStat(equip.getStr(), 5));
        equip.setDex(getRandStat(equip.getDex(), 5));
        equip.setInt(getRandStat(equip.getInt(), 5));
        equip.setLuk(getRandStat(equip.getLuk(), 5));
        equip.setMatk(getRandStat(equip.getMatk(), 5));
        equip.setWatk(getRandStat(equip.getWatk(), 5));
        equip.setAcc(getRandStat(equip.getAcc(), 5));
        equip.setAvoid(getRandStat(equip.getAvoid(), 5));
        equip.setJump(getRandStat(equip.getJump(), 5));
        equip.setHands(getRandStat(equip.getHands(), 5));
        equip.setSpeed(getRandStat(equip.getSpeed(), 5));
        equip.setWdef(getRandStat(equip.getWdef(), 10));
        equip.setMdef(getRandStat(equip.getMdef(), 10));
        equip.setHp(getRandStat(equip.getHp(), 10));
        equip.setMp(getRandStat(equip.getMp(), 10));
        if (Randomizer.nextInt(100) > 90) { // 9% chance
            equip.setState((byte) 1);
            //equip.setPotential((byte) 1);
        }
        return equip;
    }

    public double getFireWMtk(int level) {
        int r = Randomizer.rand(1, 5);
        boolean ol = level >= 160;
        switch (r) {
            case 1:
                return ol ? 15.44 : 12.35;
            case 2:
                return ol ? 22.31 : 17.85;
            case 3:
                return ol ? 30.70 : 24.56;
            case 4:
                return ol ? 40.3 : 32.24;
            case 5:
                return ol ? 51.69 : 41.35;
            default:
                return 0;
        }
    }

    public Equip randomizeStatsFire(final Equip equip, final boolean isFirst) {
        int[] efs = equip.getFireStat();
        int[] nefs = new int[16];
        Equip def = (Equip) ItemInformation.getInstance().getEquipById(equip.getItemId());
        nefs[0] = getRandStatFire(60);
        equip.setStr((short) (equip.getStr() - efs[0] + nefs[0]));
        nefs[1] = getRandStatFire(60);
        equip.setDex((short) (equip.getDex() - efs[0] + nefs[0]));
        nefs[2] = getRandStatFire(60);
        equip.setInt((short) (equip.getInt() - efs[0] + nefs[0]));
        nefs[3] = getRandStatFire(60);
        equip.setLuk((short) (equip.getLuk() - efs[0] + nefs[0]));
        int wmtk = 15;
        if (GameConstants.isWeapon(equip.getItemId())) {
            wmtk = (int) (def.getWatk() * (getFireWMtk(getReqLevel(equip.getItemId())) * 0.01D));
        }
        nefs[4] = getRandStatFire(wmtk);
        equip.setMatk((short) (equip.getMatk() - efs[0] + nefs[0]));
        nefs[5] = getRandStatFire(wmtk);
        equip.setWatk((short) (equip.getWatk() - efs[0] + nefs[0]));
        nefs[6] = getRandStatFire(200);
        equip.setAcc((short) (equip.getAcc() - efs[0] + nefs[0]));
        nefs[7] = getRandStatFire(200);
        equip.setAvoid((short) (equip.getAvoid() - efs[0] + nefs[0]));
        nefs[8] = getRandStatFire(200);
        equip.setJump((short) (equip.getJump() - efs[0] + nefs[0]));
        nefs[10] = getRandStatFire(40);
        equip.setHands((short) (equip.getHands() - efs[0] + nefs[0]));
        nefs[11] = getRandStatFire(20);
        equip.setSpeed((short) (equip.getSpeed() - efs[0] + nefs[0]));
        nefs[12] = getRandStatFire(40);
        equip.setWdef((short) (equip.getWdef() - efs[0] + nefs[0]));
        nefs[13] = getRandStatFire(40);
        equip.setMdef((short) (equip.getMdef() - efs[0] + nefs[0]));
        nefs[14] = getRandStatFire(2500);
        equip.setHp((short) (equip.getHp() - efs[0] + nefs[0]));
        nefs[15] = getRandStatFire(2500);
        equip.setMp((short) (equip.getMp() - efs[0] + nefs[0]));

        if (!GameConstants.isWeapon(equip.getItemId())) {
            if (Randomizer.rand(1, 2) == 1) {
                equip.setAllStatP((byte) def.getAllStatP());
            } else {
                equip.setAllStatP((byte) (def.getAllStatP() + (Randomizer.nextInt(4) + 1)));
            }
        }
        if (Randomizer.rand(1, 2) == 1) {
            byte downlevel = (byte) (Randomizer.nextInt(30) + 1);
            if (downlevel > ItemInformation.getInstance().getReqLevel(equip.getItemId())) {
                equip.setDownLevel((byte) (ItemInformation.getInstance().getReqLevel(equip.getItemId()) - 1));
            } else {
                equip.setDownLevel((byte) downlevel);
            }
        } else {
            equip.setDownLevel((byte) 0);
        }
        if (GameConstants.isWeapon(equip.getItemId())) {
            if (Randomizer.rand(1, 2) == 1) {
                equip.setBossDamage((byte) (def.getBossDamage() + Randomizer.nextInt(4)));
            } else {
                equip.setBossDamage((byte) def.getBossDamage());
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setAllDamageP((byte) (Randomizer.nextInt(4) + def.getAllDamageP()));
            } else {
                equip.setAllDamageP((byte) def.getAllDamageP());
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setIgnoreWdef((short) (def.getIgnoreWdef() + Randomizer.nextInt(4)));
            } else {
                equip.setIgnoreWdef((short) def.getIgnoreWdef());
            }
        }
        short flag = def.getFlag();
        flag |= ItemFlag.UNTRADEABLE.getValue();
        equip.setFlag(flag);
        equip.setFireStat(nefs);
        return equip;
    }

    private short getRandStatFire(final int maxRange) {
        int rate = Randomizer.rand(1, 10);
        short value = 0;
        if (rate >= 7) {
            value = (short) Randomizer.rand(0, maxRange);
        }
        return (short) value;
    }

    public Equip addCrystalEffect(Equip equip, int crystalId) {
        switch (crystalId) {
            case 4250400:
            case 4250401:
            case 4250402:
                equip.setSpeed((short) (equip.getSpeed() + (crystalId == 4250402 ? 5 : crystalId - 4250400 + 2)));
                break;
            case 4250500:
            case 4250501:
            case 4250502:
                equip.setJump((short) (equip.getJump() + crystalId - 4250500 + 1));
                break;
            case 4251100:
            case 4251101:
            case 4251102:
                equip.setDex((short) (equip.getDex() + (crystalId == 4251102 ? 5 : crystalId - 4251100 + 2)));
                break;
            case 4250000:
            case 4250001:
            case 4250002:
                equip.setWatk((short) (equip.getWatk() + crystalId - 4250000 + 1));
                break;
            case 4250700:
            case 4250701:
            case 4250702:
                equip.setMp((short) (equip.getMp() + ((crystalId - 4250702 + 1) * 10)));
                break;
            case 4250200:
            case 4250201:
            case 4250202:
                equip.setAcc((short) (equip.getAcc() + (crystalId == 4250202 ? 5 : crystalId - 4250200 + 2)));
                break;
            case 4251000:
            case 4251001:
            case 4251002:
                equip.setLuk((short) (equip.getLuk() + (crystalId == 4251002 ? 5 : crystalId - 4251000 + 2)));
                break;
            case 4250300:
            case 4250301:
            case 4250302:
                equip.setAvoid((short) (equip.getAvoid() + (crystalId == 4250302 ? 5 : crystalId - 4250302 + 2)));
                break;
            case 4250800:
            case 4250801:
            case 4250802:
                equip.setStr((short) (equip.getStr() + (crystalId == 4250802 ? 5 : crystalId - 4250802 + 2)));
                break;
            case 4250100:
            case 4250101:
            case 4250102:
                equip.setMatk((short) (equip.getMatk() + crystalId - 4250100 + 1));
                break;
            case 4250600:
            case 4250601:
            case 4250602:
                equip.setHp((short) (equip.getHp() + ((crystalId - 4250600 + 1) * 10)));
                break;
            case 4250900:
            case 4250901:
            case 4250902:
                equip.setInt((short) (equip.getInt() + (crystalId == 4250902 ? 5 : crystalId - 4250900 + 2)));
                break;
            case 4251300:
            case 4251301:
            case 4251302:
                equip.setWatk(getRandStat(equip.getWatk(), crystalId - 4251300 + 1));
                equip.setMatk(getRandStat(equip.getMatk(), crystalId - 4251300 + 1));
                equip.setJump(getRandStat(equip.getJump(), crystalId - 4251300 + 1));
                equip.setSpeed(getRandStat(equip.getSpeed(), crystalId - 4251300 + 1));
                break;
            case 4251400:
            case 4251401:
            case 4251402:
                equip.setStr(getRandStat(equip.getStr(), (crystalId == 4251402 ? 5 : crystalId - 4251400 + 2)));
                equip.setDex(getRandStat(equip.getDex(), (crystalId == 4251402 ? 5 : crystalId - 4251400 + 2)));
                equip.setInt(getRandStat(equip.getInt(), (crystalId == 4251402 ? 5 : crystalId - 4251400 + 2)));
                equip.setLuk(getRandStat(equip.getLuk(), (crystalId == 4251402 ? 5 : crystalId - 4251400 + 2)));
                break;
        }
        return equip;
    }

    public int getETCMonsLvl(int itemid) {
        if (getItemData(itemid) != null) {
            final MapleData lvl = getItemData(itemid).getChildByPath("info/lv");
            if (lvl == null) {
                return -1;
            }
            return MapleDataTool.getInt(lvl);
        }
        return -1;
    }

    public MapleWeaponType getWeaponType(int itemId) {
        int cat = (itemId / 10000) % 100;
        MapleWeaponType[] type = {MapleWeaponType.SWORD1H, MapleWeaponType.AXE1H, MapleWeaponType.BLUNT1H, MapleWeaponType.DAGGER, MapleWeaponType.NOT_A_WEAPON, MapleWeaponType.NOT_A_WEAPON, MapleWeaponType.NOT_A_WEAPON, MapleWeaponType.WAND, MapleWeaponType.STAFF, MapleWeaponType.NOT_A_WEAPON, MapleWeaponType.SWORD2H, MapleWeaponType.AXE2H, MapleWeaponType.BLUNT2H, MapleWeaponType.SPEAR, MapleWeaponType.POLE_ARM, MapleWeaponType.BOW, MapleWeaponType.CROSSBOW, MapleWeaponType.CLAW, MapleWeaponType.KNUCKLE, MapleWeaponType.GUN, MapleWeaponType.DESPERADO, MapleWeaponType.GUNTLIT, MapleWeaponType.LIMITER};
        if (cat < 30 || cat > 49) {
            return MapleWeaponType.NOT_A_WEAPON;
        }
        return type[cat - 30];
    }

    public int getImpLifeid(int itemId) {
        if (mipCache.containsKey(itemId)) {
            return mipCache.get(itemId);
        }
        MapleData item = getItemData(itemId);
        if (item == null) {
            return -1;
        }
        int pEntry = 0;
        MapleData pData = item.getChildByPath("spec/lifeId");
        if (pData == null) {
            return -1;
        }
        pEntry = MapleDataTool.getInt(pData);
        mipCache.put(itemId, pEntry);
        return pEntry;
    }

    public final Equip randomizeStatspig(Equip equip, boolean potential) /*      */ {
        if ((equip.getLevel() >= 0) && (equip.getLevel() <= 79)) {
            if (Randomizer.rand(1, 2) == 1) {
                equip.setStr(getRandStatAbove(equip.getStr(), 10));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setDex(getRandStatAbove(equip.getDex(), 10));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setInt(getRandStatAbove(equip.getInt(), 10));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setLuk(getRandStatAbove(equip.getLuk(), 10));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setMatk(getRandStatAbove(equip.getMatk(), GameConstants.isWeapon(equip.getItemId()) ? 5 : 1));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setWatk(getRandStatAbove(equip.getWatk(), GameConstants.isWeapon(equip.getItemId()) ? 5 : 1));
            }
        } else if ((equip.getLevel() >= 80) && (equip.getLevel() <= 119)) {
            if (Randomizer.rand(1, 2) == 1) {
                equip.setStr(getRandStatAbove(equip.getStr(), 15));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setDex(getRandStatAbove(equip.getDex(), 15));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setInt(getRandStatAbove(equip.getInt(), 15));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setLuk(getRandStatAbove(equip.getLuk(), 15));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setMatk(getRandStatAbove(equip.getMatk(), GameConstants.isWeapon(equip.getItemId()) ? 8 : 2));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setWatk(getRandStatAbove(equip.getWatk(), GameConstants.isWeapon(equip.getItemId()) ? 8 : 2));
            }
        } else if ((equip.getLevel() >= 120) && (equip.getLevel() <= 200)) {
            if (Randomizer.rand(1, 2) == 1) {
                equip.setStr(getRandStatAbove(equip.getStr(), 20));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setDex(getRandStatAbove(equip.getDex(), 20));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setInt(getRandStatAbove(equip.getInt(), 20));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setLuk(getRandStatAbove(equip.getLuk(), 20));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setMatk(getRandStatAbove(equip.getMatk(), GameConstants.isWeapon(equip.getItemId()) ? 12 : 3));
            }
            if (Randomizer.rand(1, 2) == 1) {
                equip.setWatk(getRandStatAbove(equip.getWatk(), GameConstants.isWeapon(equip.getItemId()) ? 12 : 3));
            }
        }
        return equip;
    }
}
