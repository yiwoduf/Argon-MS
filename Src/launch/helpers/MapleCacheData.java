/*
 * ArcStory Project
 * ���ֿ� sch2307@naver.com
 * ���� junny_adm@naver.com
 * ������ raccoonfox69@gmail.com
 * ������ ku3135@nate.com
 * ����ȫ designer@inerve.kr
 */
package launch.helpers;

import client.items.StructPotentialItem;
import client.skills.Skill;
import client.skills.SkillFactory;
import static client.skills.SkillFactory.SummonSkillInformation;
import client.skills.SummonSkillEntry;
import constants.GameConstants;
import constants.ServerConstants;
import java.awt.Point;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import provider.MapleData;
import provider.MapleDataDirectoryEntry;
import provider.MapleDataFileEntry;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.items.CashItemFactory;
import server.items.CashItemInfo;
import server.items.ItemInformation;
import server.items.MapleProfessionRecipe;
import server.items.MapleProfessionRecipeEntry;
import server.items.PotentialOption;
import server.items.StructSetItem;
import server.quest.MapleQuest;
import tools.Pair;
import tools.Triple;

public class MapleCacheData {

    public static boolean cached = false;

    public void startCacheData() {
        Thread sdt = new Thread(new LoadSkillDataThread());
        Thread lqt = new Thread(new LoadQuestData());
        Thread i1t = new Thread(new LoadItemDataThread());
        Thread i2t = new Thread(new LoadPotenOptionDataThread());
        Thread i3t = new Thread(new LoadEquOptionDataThread());
        Thread cdt = new Thread(new LoadCashItemData());
        sdt.start();
        lqt.start();
        i1t.start();
        i2t.start();
        i3t.start();
        cdt.start();
    }
}

class LoadQuestData implements Runnable {

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                cacheQuestData();
                Thread.currentThread().sleep(1);
            } catch (InterruptedException ie) {
                //System.out.println("���ͷ�Ʈ �߻�");
            } finally {
                Thread.currentThread().interrupt();
            }
        }
    }

    public void cacheQuestData() {
        synchronized (MapleQuest.questReady) {
            if (!MapleQuest.questReady) {
                for (MapleData d : MapleQuest.actions.getChildren()) {
                    MapleQuest ret = new MapleQuest();
                    if (MapleQuest.loadQuest(ret, Integer.parseInt(d.getName()))) {
                        MapleQuest.quests.put(Integer.parseInt(d.getName()), ret);
                    }
                }
                MapleQuest.questReady = Boolean.TRUE;
            }
        }
    }
}

/*
     * type - ��� ������
     * 0 : ��ü
     * 10 : ����
     * 11 : ���� ����
     * 20 : ����
     * 40 : �Ǽ��縮
     * 51 : ����
     * 52 : ����, �ѹ���
     * 53 : ����
     * 54 : �尩
     * 55 : �Ź�
 */
class LoadItemDataThread implements Runnable {

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                cachePotentialItemData();
                Thread.currentThread().sleep(1);
            } catch (InterruptedException ie) {
                //System.out.println("���ͷ�Ʈ �߻�");
            } finally {
                Thread.currentThread().interrupt();
            }
        }
    }

    public void cachePotentialItemData() {
        final MapleData potsData = ItemInformation.getInstance().itemData.getData("ItemOption.img");
        StructPotentialItem item;
        List<StructPotentialItem> items = null;
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
                    case 31001://������ ���̽�Ʈ
                    case 31002://������ �̽�ƽ ����
                    case 31003://������ ���� ������
                    case 31004://������ ������ �ٵ�
                        item.skillID = 0;//(short) (item.potentialID - 23001);
                        break;
                    case 41005://������ �Ĺ� ������
                    case 41006://������ ���꽺�� ����
                    case 41007://������ ���� �ν���
                        item.skillID = 0;//(short) (item.potentialID - 33001);//�����ʿ�
                        break;
                    default:
                        item.skillID = 0;
                        break;
                }
                items.add(item);
            }
            ItemInformation.getInstance().potentialCache.put(Integer.parseInt(data.getName()), items);
        }
    }
}

class LoadPotenOptionDataThread implements Runnable {

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                cachePotentialOptionData();
                Thread.currentThread().sleep(1);
            } catch (InterruptedException ie) {
                //System.out.println("���ͷ�Ʈ �߻�");
            } finally {
                Thread.currentThread().interrupt();
            }
        }
    }

    public void cachePotentialOptionData() {
        final MapleData potsData = ItemInformation.getInstance().itemData.getData("ItemOption.img");
        for (MapleData data : potsData) {
            int potentialID = Integer.parseInt(data.getName());
            int type = MapleDataTool.getIntConvert("info/optionType", data, 0);
            int level = 0;
            Map<Integer, List<Integer>> option = new HashMap<Integer, List<Integer>>();
            List<Integer> id = new ArrayList<Integer>(100);
            if (potentialID > 0 && potentialID < 906 || potentialID > 2000 && potentialID < 2906) { //1�ܰ� �ɼ�
                level = 1;
            } else if ((potentialID > 10000 && potentialID < 10292) || (potentialID > 20000 && potentialID < 20015)
                    || (potentialID > 30000 && potentialID < 30015) || (potentialID > 40000 && potentialID < 40015)
                    || (potentialID > 12000 && potentialID < 12802) || (potentialID > 22000 && potentialID < 22015)
                    || (potentialID > 32000 && potentialID < 32015) || (potentialID > 42000 && potentialID < 42015)) { //2�ܰ� �ɼ�
                level = 2;
            } else if ((potentialID > 20040 && potentialID < 20407) || (potentialID > 22040 && potentialID < 22803)) { //3�ܰ� �ɼ�
                level = 3;
            } else if ((potentialID > 30040 && potentialID < 31005) || (potentialID > 32040 && potentialID < 32803)) { //4�ܰ� �ɼ�
                level = 4;
            } else if ((potentialID > 40040 && potentialID < 41007) || (potentialID > 42040 && potentialID < 42803) || potentialID > 60000) { //5�ܰ� �ɼ�
                level = 5;
            }
            if (ItemInformation.getInstance().potentialOpCache.containsKey(level)) {
                if (ItemInformation.getInstance().potentialOpCache.get(level).getPotentialOption().get(type) != null) {
                    id = ItemInformation.getInstance().potentialOpCache.get(level).getPotentialOption().get(type);
                }
                id.add(potentialID);
                ItemInformation.getInstance().potentialOpCache.get(level).getPotentialOption().put(type, id);
            } else {
                id.add(potentialID);
                option.put(type, id);
                ItemInformation.getInstance().potentialOpCache.put(level, new PotentialOption(option));
            }
        }
    }
}

class LoadEquOptionDataThread implements Runnable {

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                cacheEquipOptionData();
                Thread.currentThread().sleep(1);
            } catch (InterruptedException ie) {
                //System.out.println("���ͷ�Ʈ �߻�");
            } finally {
                Thread.currentThread().interrupt();
            }
        }
    }

    public void cacheEquipOptionData() {
        final MapleData setsData = ItemInformation.getInstance().etcData.getData("SetItemInfo.img");
        StructSetItem itemz = null;
        StructSetItem.SetItem itez;
        for (MapleData dat : setsData) {
            itemz = new StructSetItem();
            itemz.setItemID = Integer.parseInt(dat.getName());
            itemz.completeCount = (byte) MapleDataTool.getIntConvert("completeCount", dat, 0);
            for (MapleData level : dat.getChildByPath("Effect")) {
                itez = new StructSetItem.SetItem();
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
            ItemInformation.getInstance().setItems.put(itemz.setItemID, itemz);
        }
    }
}

class LoadSkillDataThread implements Runnable {

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                cacheSkillData();
                Thread.currentThread().sleep(1);
            } catch (InterruptedException ie) {
                //System.out.println("���ͷ�Ʈ �߻�!");
            } finally {
                Thread.currentThread().interrupt();
            }
        }
    }

    public static void cacheSkillData() {
        final MapleData stringData = MapleDataProviderFactory.getDataProvider(new File("property/wz/String.wz")).getData("Skill.img");
        final MapleDataProvider datasource = MapleDataProviderFactory.getDataProvider(MapleDataProviderFactory.fileInWZPath("Skill.wz"));
        final MapleDataDirectoryEntry root = datasource.getRoot();
        int skillid = 0;
        MapleData summon_Data;
        SummonSkillEntry sse;
        for (MapleDataFileEntry topDir : root.getFiles()) {
            if (topDir.getName().length() <= 10) {
                for (MapleData data : datasource.getData(topDir.getName())) {
                    if (data.getName().equals("skill")) {
                        for (MapleData S_data : data) {
                            if (S_data != null) {
                                skillid = Integer.parseInt(S_data.getName());
                                Skill skill = Skill.loadFromData(skillid, S_data);
                                skill.setName(SkillFactory.getSkillName(skillid, stringData));
                                SkillFactory.skills.put(skillid, skill);
                            }
                            summon_Data = S_data.getChildByPath("summon/attack1/info");
                            if (summon_Data == null) {
                                MapleData summonData2 = S_data.getChildByPath("summon/die/info"); //������ų (���� ��)
                                if (summonData2 != null) {
                                    summon_Data = summonData2;
                                }
                            }
                            if (summon_Data != null) {
                                sse = new SummonSkillEntry();
                                sse.type = (byte) MapleDataTool.getInt("type", summon_Data, 0);
                                sse.mobCount = (byte) (skillid == 33101008 ? 3 : MapleDataTool.getInt("mobCount", summon_Data, 1));
                                sse.attackCount = (byte) MapleDataTool.getInt("attackCount", summon_Data, 1);
                                if (summon_Data.getChildByPath("range/lt") != null) {
                                    final MapleData ltd = summon_Data.getChildByPath("range/lt");
                                    sse.lt = (Point) ltd.getData();
                                    sse.rb = (Point) summon_Data.getChildByPath("range/rb").getData();
                                } else {
                                    sse.lt = new Point(-100, -100);
                                    sse.rb = new Point(100, 100);
                                }
                                sse.delay = MapleDataTool.getInt("effectAfter", summon_Data, 0) + MapleDataTool.getInt("attackAfter", summon_Data, 0);
                                for (MapleData effect : summon_Data) {
                                    if (effect.getChildren().size() > 0) {
                                        for (final MapleData effectEntry : effect) {
                                            sse.delay += MapleDataTool.getIntConvert("delay", effectEntry, 0);
                                        }
                                    }
                                }
                                MapleData aa = S_data.getChildByPath("summon/attack1");
                                if (S_data.getChildByPath("summon/die/info") != null) { //������ų (���� ��)
                                    aa = S_data.getChildByPath("summon/die");
                                }
                                for (MapleData effect : aa) {
                                    sse.delay += MapleDataTool.getIntConvert("delay", effect, 0);
                                }
                                SummonSkillInformation.put(skillid, sse);
                            }
                        }
                    }
                }
            } else if (topDir.getName().startsWith("Recipe_")) {
                for (MapleData data : datasource.getData(topDir.getName())) {
                    skillid = Integer.parseInt(data.getName());
                    MapleProfessionRecipeEntry entry = new MapleProfessionRecipeEntry(MapleDataTool.getInt("reqSkillLevel", data, 0), MapleDataTool.getInt("reqSkillProficiency", data, 0), MapleDataTool.getInt("incSkillProficiency", data, 0), MapleDataTool.getInt("incFatigability", data, 0), MapleDataTool.getInt("needOpenItem", data, 0), MapleDataTool.getInt("period", data, -1));
                    for (MapleData targetData : data.getChildByPath("target")) {
                        entry.target.add(new Triple<Integer, Integer, Integer>(MapleDataTool.getInt("item", targetData, 0), MapleDataTool.getInt("count", targetData, 0), MapleDataTool.getInt("probWeight", targetData, 100)));
                    }
                    for (MapleData recipeData : data.getChildByPath("recipe")) {
                        entry.recipe.add(new Pair<Integer, Integer>(MapleDataTool.getInt("item", recipeData, 0), MapleDataTool.getInt("count", recipeData, 0)));
                    }
                    MapleProfessionRecipe.getInstance().recipes.put(skillid, entry);
                }
            }
        }
        MapleCacheData.cached = true;
        ServerConstants.hp_skillid_real = ServerConstants.hp_skillid_dummy.split(",");
    }
}

class LoadCashItemData implements Runnable {

    @Override
    public void run() {
        while (!Thread.currentThread().isInterrupted()) {
            try {
                cacheCashItemData();
                Thread.currentThread().sleep(1);
            } catch (InterruptedException ie) {
                //System.out.println("���ͷ�Ʈ �߻�");
            } finally {
                Thread.currentThread().interrupt();
            }
        }
    }

    public void cacheCashItemData() {
        int i = 0;
        for (MapleData field : CashItemFactory.getInstance().data.getData("Commodity.img").getChildren()) {
            int itemId = MapleDataTool.getIntConvert("ItemId", field, 0);
            boolean onSale = itemId > 0;
            int period = 0;
            if (GameConstants.isPet(itemId)) { //��
                period = MapleDataTool.getIntConvert("life", CashItemFactory.getInstance().petData.getData(itemId + ".img").getChildByPath("info"));
            } else {
                period = MapleDataTool.getIntConvert("Period", field, 0);
            }
            if (onSale) {
                final CashItemInfo stats = new CashItemInfo(
                        MapleDataTool.getIntConvert("ItemId", field),
                        MapleDataTool.getIntConvert("Count", field, 1),
                        MapleDataTool.getIntConvert("Price", field, 0), period,
                        MapleDataTool.getIntConvert("OnSale", field, 0) == 1);
                CashItemFactory.getInstance().itemStats.put(MapleDataTool.getIntConvert("SN", field, 0), stats);
            }
            i++;
        }
    }
}
