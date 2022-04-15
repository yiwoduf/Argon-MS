package client.skills;

import constants.ServerConstants;
import constants.GameConstants;
import client.MapleCharacter;
import client.PlayerStats;
import client.items.*;
import client.stats.*;
import launch.ChannelServer;
import launch.holder.MapleCoolDownValueHolder;
import packet.creators.MainPacketCreator;
import provider.MapleData;
import server.items.InventoryManipulator;
import server.items.ItemInformation;
import server.life.MapleMonster;
import server.maps.*;
import tools.ArrayMap;
import tools.Pair;
import tools.RandomStream.Randomizer;
import tools.Triple;

import java.awt.Point;
import java.awt.Rectangle;
import java.lang.ref.WeakReference;
import java.util.*;

import handler.channel.MapleMechDoor;

import java.io.File;
import java.util.Map.Entry;
import java.util.concurrent.ScheduledFuture;

import launch.Start;
import packet.creators.RunePacket;

import packet.creators.SoulWeaponPacket;
import packet.creators.UIPacket;
import packet.skills.AngelicBusterSkill;
import packet.skills.KaiserSkill;
import packet.skills.MechanicSkill;
import provider.MapleDataProvider;
import provider.MapleDataProviderFactory;
import provider.MapleDataTool;
import server.life.MobSkillFactory;
import tools.CaltechEval;
import tools.Timer.BuffTimer;

public class SkillStatEffect {

    private transient ScheduledFuture<?> diabolicRecoveryTask = null;
    private int sourceid;
    private boolean overTime, skill, absstats = true;
    private List<Triple<BuffStats, Integer, Boolean>> statups;
    private Map<MonsterStatus, Integer> monsterStatus;
    private Point lt, rb;
    private SkillStats effects;
    private List<DiseaseStats> cureDebuffs;
    private int stackskill;
    private byte level;
    private double hpR;
    private double mpR;
    private int mhpX = 0;
    private int mhpR = 0;
    private int lv2mhp = 0;
    private int mmpX = 0;
    private int mmpR = 0;
    private int lv2mmp = 0;
    private boolean isRune = false;

    public static final SkillStatEffect loadItemEffectFromData(final MapleData source, final int itemid) {
        return loadFromData(source, itemid, false, false, 0);
    }

    public static final SkillStatEffect loadSkillEffectFromData(final MapleData source, final int skillid, final boolean overtime) {
        return loadFromData(source, skillid, true, overtime, 1);
    }

    public static final SkillStatEffect loadSkillEffectFromData(final MapleData source, final int skillid, final boolean overtime, final int level) {
        return loadFromData(source, skillid, true, overtime, level);
    }

    private static final void addBuffStatPairToListIfNotZero(final List<Triple<BuffStats, Integer, Boolean>> list, final BuffStats buffstat, final Integer val, boolean overlap) {
        if (val.intValue() != 0) {
            boolean isExist = false;
            for (Triple<BuffStats, Integer, Boolean> stats : list) {
                if (stats.getFirst() == buffstat) {
                    isExist = true;
                }
            }
            if (!isExist) {
                list.add(new Triple<BuffStats, Integer, Boolean>(buffstat, val, overlap));
            }
        }
    }

    private static SkillStatEffect loadFromData(final MapleData source, final int sourceid, final boolean skill, final boolean overTime, final int level) {
        final SkillStatEffect ret = new SkillStatEffect();
        ret.effects = new SkillStats(level);
        for (MapleData d : source.getChildren()) {
            try {
                if (!d.getName().equals("hs") && !d.getName().equals("lt") && !d.getName().equals("rb")
                        && !d.getName().equals("lt2") && !d.getName().equals("rb2") && !d.getName().equals("hit")
                        && !d.getName().equals("hit") && !d.getName().equals("ball") && !d.getName().equals("action")
                        && !d.getName().equals("Point") && !d.getName().equals("variableRect") && !d.getName().equals("property")
                        && !d.getName().equals("mob")) { //imgdir 명은 캐싱할 필요 X.
                    if (sourceid == 2321001) {
                        ret.effects.setStats(d.getName(), String.valueOf(d.getData()), true);
                    } else {
                        ret.effects.setStats(d.getName(), String.valueOf(d.getData()), false);
                    }
                }
            } catch (Exception e) {
                if (!ServerConstants.realese) {
                    System.out.println("[경고] 스킬값 로딩중 잘못된 값이 삽입되었습니다. : " + sourceid + " : " + d.getName());
                }
            }
        }
        ret.sourceid = sourceid;
        ret.skill = skill;
        ret.mhpR = ret.effects.getStats("mhpR");
        if (ret.mhpR > 0) {
            if (!ServerConstants.hp_skillid_dummy.contains(String.valueOf(ret.sourceid))) {
                ServerConstants.hp_skillid_dummy = ServerConstants.hp_skillid_dummy + ret.sourceid + ",";
            }
        }
        ret.mhpX = ret.effects.getStats("mhpX");
        if (ret.mhpX > 0) {
            if (!ServerConstants.hp_skillid_dummy.contains(String.valueOf(ret.sourceid))) {
                ServerConstants.hp_skillid_dummy = ServerConstants.hp_skillid_dummy + ret.sourceid + ",";
            }
        }
        ret.lv2mhp = ret.effects.getStats("lv2mhp");
        if (ret.lv2mhp > 0) {
            if (!ServerConstants.hp_skillid_dummy.contains(String.valueOf(ret.sourceid))) {
                ServerConstants.hp_skillid_dummy = ServerConstants.hp_skillid_dummy + ret.sourceid + ",";
            }
        }
        ret.mmpR = ret.effects.getStats("mmpR");
        if (ret.mmpR > 0) {
            if (!ServerConstants.hp_skillid_dummy.contains(String.valueOf(ret.sourceid))) {
                ServerConstants.hp_skillid_dummy = ServerConstants.hp_skillid_dummy + ret.sourceid + ",";
            }
        }
        ret.mmpX = ret.effects.getStats("mmpX");
        if (ret.mmpX > 0) {
            if (!ServerConstants.hp_skillid_dummy.contains(String.valueOf(ret.sourceid))) {
                ServerConstants.hp_skillid_dummy = ServerConstants.hp_skillid_dummy + ret.sourceid + ",";
            }
        }
        ret.lv2mmp = ret.effects.getStats("lv2mmp");
        if (ret.lv2mmp > 0) {
            if (!ServerConstants.hp_skillid_dummy.contains(String.valueOf(ret.sourceid))) {
                ServerConstants.hp_skillid_dummy = ServerConstants.hp_skillid_dummy + ret.sourceid + ",";
            }
        }
        if ((!ret.skill && ret.effects.getStats("time") > -1) || (sourceid >= 2022125 && sourceid <= 2022129)) {
            ret.overTime = true;
        } else {
            if (ret.effects.getStats("time") < 2100000000) {
                ret.effects.setStats("time", ret.effects.getStats("time") * 1000); //milliseconds 형태로 수정
            }
            ret.overTime = overTime || ret.isMorph() || ret.isPirateCTS_Morph() || ret.isFinalAttack() || ret.isInflation();
        }
        final ArrayList<Triple<BuffStats, Integer, Boolean>> statups = new ArrayList<Triple<BuffStats, Integer, Boolean>>();

        List<DiseaseStats> cure = new ArrayList<DiseaseStats>(5);
        if (ret.effects.getStats("poison") > 0) {
            cure.add(DiseaseStats.POISON);
        }
        if (ret.effects.getStats("seal") > 0) {
            cure.add(DiseaseStats.SEAL);
        }
        if (ret.effects.getStats("darkness") > 0) {
            cure.add(DiseaseStats.DARKNESS);
        }
        if (ret.effects.getStats("weakness") > 0) {
            cure.add(DiseaseStats.WEAKEN);
        }
        if (ret.effects.getStats("curse") > 0) {
            cure.add(DiseaseStats.CURSE);
        }
        ret.cureDebuffs = cure;

        final MapleData ltd = source.getChildByPath("lt");
        if (ltd != null) {
            ret.lt = (Point) ltd.getData();
            ret.rb = (Point) source.getChildByPath("rb").getData();
        }
        Map<MonsterStatus, Integer> monsterStatus = new ArrayMap<MonsterStatus, Integer>();

        if (skill) { // hack because we can't get from the datafile...
            switch (sourceid) {
                case 1000003: //
                    //물리 방어력 #pddX, 최대 HP #mhpR% 증가. 적에게 피격 시 데미지 #damAbsorbShieldR% 감소
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PDD, ret.effects.getStats("pddX"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MHPCutR, ret.effects.getStats("mhpR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamAbsorbShield, ret.effects.getStats("damAbsorbShieldR"), false));
                    break;
                case 2001002:
                    //마법의 힘으로 받는 데미지를 감소시키고 일부를 MP로 대신한다.\n
                    //활성화 된 상태에서 MP가 0 이상일 경우 자동으로 발동되며 MP가 0일 경우에는 그대로 HP를 소모하게 된다. 
                    //사용 시 효과가 활성화되고 재사용 시 비활성화되는 #c온오프 스킬
                    //MP #mpCon 소비, 활성화 되어있는 동안 받는 데미지의 #x%를 MP로 대신함
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MagicGuard, ret.effects.getStats("x"), false));
                    break;
                case 2001003:
                    //일정 시간 갑옷에 마력을 응집시켜 방어력을 증가시킨다.\n필요 스킬 : #c매직 가드 3레벨 이상#
                    //MP #mpCon 소비, #time초간 물리 방어력 #pdd, 마법 방어력 #mdd 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PDD, ret.effects.getStats("pdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MDD, ret.effects.getStats("mdd"), false));
                    break;
                case 4001005:
                    //MP #mpCon 소비, #time초간 이동속도 #speed, 점프력 #jump 증가\n[패시브 효과 : 이동 속도 상한#speedMax 만큼 증가]
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Speed, ret.effects.getStats("speed"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Jump, ret.effects.getStats("jump"), false));
                    break;
                case 4001006:
                    //MP #mpCon 소비, #time초간 이동속도 #speed, 점프력 #jump 증가\n[패시브 효과 : 이동 속도 상한#speedMax 만큼 증가]
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Speed, ret.effects.getStats("speed"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Jump, ret.effects.getStats("jump"), false));
                    break;
                case 1101006:
                    //일정 시간동안 아군의 공격력을 증가시키고 자신이 받는 데미지를 증폭시켜 반사한다. #c다른 버프와 중첩#하여 사용할 수 있다.
                    //일정 시간동안 아군의 공격력을 증가시키고 자신이 받는 데미지를 증폭시켜 반사한다. #c다른 버프와 중첩#하여 사용할 수 있다.
                    //MP #mpCon 소비, #time초간 파티원의 공격력 #indiePad 증가. 받는 데미지 #x% 흡수하고 #y% 증폭시켜 반사
                    //MP #mpCon 소비, #time초간 파티원의 공격력 #indiePad 증가. 받는 데미지 #x% 흡수하고 #y% 증폭시켜 반사
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, ret.effects.getStats("y"), false));
                    break;
                case 1101013:
                    //활성화되면 공격할 때마다 일정 확률로 콤보 카운트가 누적된다. 최대 다섯 개의 콤보 카운트를 쌓을 수 있다.\n
                    //스킬 사용 시 효과가 활성화되고 재사용 시 비활성화되는 #c온오프 스킬#
                    //활성화되면 공격할 때마다 일정 확률로 콤보 카운트가 누적된다. 최대 다섯 개의 콤보 카운트를 쌓을 수 있다.
                    //활성화 시 공격할 때마다 #prop%의 확률로 콤보 카운트 누적. 콤보 카운터 당 공격력 #y 증가. 최대 콤보 카운트 #x
                    //활성화 시 공격할 때마다 #prop%의 확률로 콤보 카운트 누적. 최대 콤보 카운트 #x
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ComboCounter, 1, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 2211011:
                case 2221005: // 엘퀴네스
                case 2321003: // 바하뮤트
                case 5201012:
                case 5201013:
                case 5201014:
                case 5210015:
                case 5210016:
                case 5210017:
                case 5210018:
                case 23111008:
                case 23111009:
                case 23111010:
                case 35101012:
                case 35121009:
                case 61111002:
                    break;
                case 5211014:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("x"), false));
                    break;
                case 1200014:
                    //직전에 사용한 속성과 #c다른 속성의 차지 스킬 사용#시 엘리멘탈 차지 1개 충전. 
                    //최대 #z개 충전 가능, 충전한 엘리멘탈 차지 당 데미지 및 물약을 제외한 치유량 #x%, 
                    //공격력 #y, 상태 이상 내성 #u% 증가, 
                    //최대 HP의 일정 비율로 피해를 입히는 공격을 포함한 피격 데미지 #w% 감소, #c최대 방어력 20000#으로 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ElementalCharge, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EVAR, ret.effects.getStats("u"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, ret.effects.getStats("w"), false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 1301006: // 아이언 월
                    //MP #mpCon 소비, #time초간 팀원의 물리 방어력 #pdd, 마법 방어력 #mdd 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PDD, ret.effects.getStats("pdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MDD, ret.effects.getStats("mdd"), false));
                    break;
                case 1301007:
                    //MP #mpCon 소비, #time초간 파티원의 최대 HP와 최대 MP #x% 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MaxHP, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MaxMP, ret.effects.getStats("x"), false));
                    break;
                case 1301013:
                    //주위에 있을 때 일정 시간마다 자신을 치유해 주는 비홀더를 소환한다.
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Beholder, ret.effects.getStats("x"), false));
                    break;

                case 1310016:
                    //#x초 마다 지속시간이 #time초인 공격력 +#epad, 물리 방어력 +#epdd, 
                    //크리티컬 확률 #indieCr%, 마법 방어력 +#emdd, 명중치+#acc, 회피치 +#eva 버프 시전
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieCr, ret.effects.getStats("indieCr"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EPAD, ret.effects.getStats("epad"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EPDD, ret.effects.getStats("epdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EMDD, ret.effects.getStats("emdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, ret.effects.getStats("acc"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EVA, ret.effects.getStats("eva"), false));
                    break;
                case 1301012:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    ret.effects.setStats("time", 1500);
                    break;
                case 1311015:
                    ret.effects.setStats("hpR", -ret.effects.getStats("x"));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CrossOverChain, ret.effects.getStats("x"), false));
                    break;
                case 1320019:
                    //리인카네이션
                    //HP가 0이 되면 HP 및 MP 완전 회복, #time초 동안 무적, 궁그닐 디센트 재사용 대기시간 무시. 
                    //#time초 동안 #z명의 적 처치, 혹은 보스를 #z번 타격 시 지속 시간이 끝난 후 부활. 재발동 대기시간 #cooltime초. 
                    //[패시브 효과 : HP가 #x% 이상일 때 데미지 +#damage%, 이동속도 +#psdSpeed, 크리티컬 확률 #cr% 증가, 최소 크리티컬 데미지 #criticaldamageMin% 증가]
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Reincarnation, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NotDamaged, 1, false));
                    ret.effects.setStats("time", ret.getTime() / 30);
                    break;
                case 1201013:
                    //MP #mpCon 소모. 최대 #mobCount명의 적에게 #damage%로 #attackCount번 데미지를 입히며 자신에게로 당긴 후 #prop% 확률로 #time초 동안 기절
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 1201012:
                    //MP #mpCon 소모. 최대 #mobCount명의 적에게 #damage%로 #attackCount번 공격. #prop% 확률로 #time초 동안 적의 이동속도 감속. #c불타고 있는 적 공격 시 #z% 추가 데미지#
                    monsterStatus.put(MonsterStatus.SPEED, ret.effects.getStats("x"));
                    break;
                case 1201011:
                    //MP #mpCon 소모. 최대 #mobCount명의 적에게 #damage%로 #attackCount번 공격. #prop% 확률로 #dotTime초 동안 #dot% 화속성 데미지
                    monsterStatus.put(MonsterStatus.Burned, ret.effects.getStats("dot"));
                    break;
                case 1211008:
                    //MP #mpCon 소모. 최대 #mobCount명의 적에게 #damage%로 #attackCount번 공격. #prop% 확률로 #time초 동안 기절. 기절하지 않는 적은 #dot% 지속 데미지. 
                    //#c블리자드 차지 효과로 느려진 적 공격 시 #z% 추가 데미지#
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 1105:
                    statups.clear();
                    statups.add(new Triple<>(BuffStats.CTS_IndieMaxDamageOver, 2050000000, true));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    ret.overTime = true;
                    break;
                case 1210016:
//                  //피격 시 #prop% 확률로 개인 보호막 생성, #time초 동안 #c공격력이 #epad 증가하며 최대 #x번의 피해를 흡수#, 
                    //단 최대 HP의 일정 비율로 피해를 입히는 공격에 한해 피해 #y% 감소, 발동 시 #cooltime초 동안 보호막 재생성 불가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BlessingArmorIncPAD, ret.effects.getStats("epad"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BlessingArmor, ret.effects.getStats("x"), false));
                    break;
                case 1221004:
                    //P #mpCon 소모. 최대 #mobCount명의 적에게 #damage%로 #attackCount번 공격. 
                    //#prop% 확률로 #time초 동안 침묵. #c라이트닝 차지 효과로 기절한 적 공격 시 #z% 추가 데미지#
                    monsterStatus.put(MonsterStatus.SEAL, 1);
                    break;
                case 1221009:
                    //MP #mpCon 소비, #damage% 데미지로 #attackCount번 공격.\n
                    //엘리멘탈 차지 모두 충전되어 있을 경우 이를 소모하여 #time초 동안 크리티컬 확률 #cr%, 방어 무시 비율 #ignoreMobpdpR%, 최종 데미지 #damR% 증가\n
                    //블래스트 버프의 지속시간 동안에는 엘리멘탈 차지를 소모하지 않음.
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, ret.effects.getStats("cr"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreMobpdpR, ret.effects.getStats("ignoreMobpdpR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamR, ret.effects.getStats("damR"), false));
                    break;
                case 1221015: // 엘리멘탈 포스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 1221052:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 1221054:
                    //MP #mpCon 소비, #time초간 완전 무적 상태. \n재사용 대기시간 : #cooltime초
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NotDamaged, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnorePCounter, 1, false));
                    break;
                case 2100009: // TEST
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DotBasedBuff, 1, false));
                    break;
                case 2101005:
                    monsterStatus.put(MonsterStatus.POISON, 1);
                    break;
                case 2101010:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_WizardIgnite, 1, false));
                    break;
                case 2101001:
                    //MP #mpCon 소비, #time초간 파티원의 마력 #indieMad 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    break;
                case 2111010:
                    monsterStatus.put(MonsterStatus.POISON, 1);
                    break;
                case 2111011:
                    ///MP #mpCon 소비, 치명적인 상태 이상 방어 시 최대 MP의 #x%를 소모하고 #c#prop% 확률로 최대 #y번까지 보호막 재생성#. 재사용 대기시간 #cooltime초\n
                    //[패시브 효과 : 상태 이상 및 모든 속성 저항 #asrR% 증가]
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StackBuff, ret.effects.getStats("y"), false));
                    break;
                case 2111007:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TeleportMasteryOn, ret.effects.getStats("x"), false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    monsterStatus.put(MonsterStatus.Burned, 1);
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 2121005:
                    monsterStatus.put(MonsterStatus.Burned, ret.effects.getStats("dot"));
                    break;
                case 2121006:
                    //MP #mpCon 소비, 최대 #mobCount명의 적에게 #damage% 데미지로 #attackCount번 공격, #time초 동안 마비, #dotInterval초당 #dot%의 도트 피해
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    monsterStatus.put(MonsterStatus.Burned, 1);
                    break;
                case 2121011:
                    //MP #mpCon 소비, 단일 적 #damage% 데미지로 #attackCount번 공격, #prop% 확률로 #dotTime초 동안 #dot% 지속 데미지를 주며 #c부딪히지 않는 상태 지속 및 #x% 감속#, 
                    //적 명중 시 포이즌 미스트 적 위치 생성, 맞은 적이 없을 경우 자신 위치에 포이즌 미스트 생성\n재사용 대기시간 #cooltime초
                    monsterStatus.put(MonsterStatus.Burned, 1);
                    monsterStatus.put(MonsterStatus.SHOWDOWN, 1);
                    monsterStatus.put(MonsterStatus.SPEED, ret.effects.getStats("x"));
                    break;
                case 2121052:
                case 2121055:
                    monsterStatus.put(MonsterStatus.Burned, 1);
                    break;
                case 2211007:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TeleportMasteryOn, ret.effects.getStats("x"), false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 2221006:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 2221011: //프리징 브레스
                    //#mpCon 소비, 자신은 무적이 되며 최대 #mobCount명의 적 #c행동 불가 및 마법 방어도 #y%, 물리 방어도 #x%#. 키다운 지속 시 최대 #time초 간 유지
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NotDamaged, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnorePCounter, 1, false));
                    monsterStatus.put(MonsterStatus.FREEZE, 1);
                    monsterStatus.put(MonsterStatus.WDEF, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.MDEF, ret.effects.getStats("y"));
                    break;
                case 2221054: //아이스 오라
                    //초당 MP #mpCon 소비, 주위 아군에게 밀리지 않을 확률 #x%, 데미지 흡수 #y%, 
                    //초당 MP #mpCon 소비, 주위 아군에게 스탠스 확률 #x%, 데미지 흡수 #y%, 상태이상 내성 및 모든 속성 저항 #v% 증가 효과  
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IceAura, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("v"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("v"), false));
                    break;
                case 3121014:
                    monsterStatus.put(MonsterStatus.SPEED, -ret.effects.getStats("w"));
                    break;
                case 3201008:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 4121017:
                    monsterStatus.put(MonsterStatus.SHOWDOWN, 1);
                    break;
                case 4221010:
                case 4341011:
                case 4121016:
                    monsterStatus.put(MonsterStatus.Burned, 1);
                    break;
                case 4121015:
                    monsterStatus.put(MonsterStatus.WATK, -ret.effects.getStats("w"));
                    monsterStatus.put(MonsterStatus.WDEF, -ret.effects.getStats("w"));
                    monsterStatus.put(MonsterStatus.SPEED, ret.effects.getStats("x"));
                    break;
                case 4221007:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 4321006:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 4331006:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 21110016:
                    //1000콤보 도달 시 아드레날린 부스트 진입 : #time초 동안 아란의 공격 스킬 데미지 #w%p 증가, 최대 공격 횟수 #x회 증가, 최대 공격 가능한 몬스터 수 #y 증가\n영구적으로 아란의 공격 스킬 데미지 #z%p 증가
                    statups.add(new Triple<>(BuffStats.CTS_AdrenalinBoost, ret.effects.getStats("y"), false));
                    statups.add(new Triple<>(BuffStats.CTS_AttackCountX, ret.effects.getStats("x"), false));
                    statups.add(new Triple<>(BuffStats.CTS_DamR, ret.effects.getStats("w"), false));
                    ret.overTime = true;
                    break;
                case 22110013:
                case 22110014:
                    monsterStatus.put(MonsterStatus.WDEF, 1);
                    monsterStatus.put(MonsterStatus.MDEF, 1);
                    break;
                case 21120018: //부스트 엔드 헌트
                case 21120019:
                case 21120023:
                case 21120026:
                case 21120027:
                    statups.add(new Triple<>(BuffStats.CTS_AranBoostEndHunt, ret.effects.getStats("x"), false));
                    break;
                case 22140013:
                    statups.add(new Triple<>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    break;
                case 22170064:
                    monsterStatus.put(MonsterStatus.Burned, 1);
                    break;
                case 25120003:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 25121006:
                    monsterStatus.put(MonsterStatus.Burned, 1);
                    break;
                case 27121052:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 31111005:
                    monsterStatus.put(MonsterStatus.POISON, 1);
                    break;
                case 31121001:
                    monsterStatus.put(MonsterStatus.SPEED, -30);
                    break;
                case 31121003:
                    //공격력, 방어력 #x%, 명중률 #z% 감소
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DevilCry, 1, false));
                    monsterStatus.put(MonsterStatus.WATK, -ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.WDEF, -ret.effects.getStats("x"));
                    break;
                case 33101115:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 35121055:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BombTime, 1, false));
                    break;
                case 35111008:
                    monsterStatus.put(MonsterStatus.WDEF, -ret.effects.getStats("y"));
                    monsterStatus.put(MonsterStatus.SPEED, ret.effects.getStats("x"));
                    break;
                case 35120002: //파티원 최종데미지증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePMdR, ret.effects.getStats("indiePMdR"), true));
                    break;
                case 65001002:
                    statups.add(new Triple<>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    break;
                case 65121011:
                    statups.add(new Triple<>(BuffStats.CTS_AngelicBursterSoulSeeker, ret.effects.getStats("prop"), false));
                    break;
                case 142111010:
                    statups.add(new Triple<>(BuffStats.CTS_NewFlying, 1, false));
                    break;
                case 142111006:
                case 142120003:
                    //영역 내 적의 이동속도 감소, #s% 만큼 해당 적의 방어율 감소
                    monsterStatus.put(MonsterStatus.SPEED, ret.effects.getStats("y"));
                    monsterStatus.put(MonsterStatus.WDEF, -ret.effects.getStats("s"));
                    break;
                case 37110009:
                case 37120012:
                    //최대 #x 단계까지 누적 가능, #time초간 유지, 1단계 당 최종 데미지 #y% 증가, #w단계 당 공격 속도 1단계 증가, #z단계 당 스킬 연계 속도 1단계 증가\n영구히 공격력 #padR% 증가
                    statups.add(new Triple<>(BuffStats.CTS_RWCombination, 1, false));
                    break;
                case 51101004: //격려
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 1121010: // 인레이지
                case 51121006: //소울 레이지
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Enrage, ret.effects.getStats("mobCount"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EnrageCr, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EnrageCrDamMin, ret.effects.getStats("x"), false));
                    break;
                case 12001001: //매직가드
                case 27000003: //매직가드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MagicGuard, ret.effects.getStats("x"), false));
                    break;
                /* 에반 시작 */
                case 22001012: //에반 매직가드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MagicGuard, ret.effects.getStats("x"), false));
                    break;
                case 22110016: //교감
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 22171073: //오닉스의 축복
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EMAD, ret.effects.getStats("emad"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EPDD, ret.effects.getStats("epdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EMDD, ret.effects.getStats("emdd"), false));
                    break;
                /* 에반 종료 */
                case 2300003: //인빈서블
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamAbsorbShield, ret.effects.getStats("damAbsorbShieldR"), false));
                    break;
                case 4101004:
                case 4201003:
                case 4301003:
                case 4311001:
                case 9001001: //운영자 헤이스트
                case 14001022: //헤이스트
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Speed, ret.effects.getStats("speed"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Jump, ret.effects.getStats("jump"), false));
                    break;
                case 4201009:
                case 4311005: // 카르마
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 2301002: // 힐
                    monsterStatus.put(MonsterStatus.MAGIC_ATTACK_UP, ret.effects.getStats("x"));
                    break;
                case 2301004: // 블레스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Bless, ret.effects.getStats("x"), false));
                    break;
                case 2300009: // 블레싱 앙상블
                case 2320013: // 블레싱 하모니
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BlessEnsenble, 5, false));
                    break;
                case 4001003: // 모험가 다크 사이트
                case 4330001: // 어드밴스드 다크 사이트
                case 14001023: // 나이트 워커 다크 사이트
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DarkSight, ret.effects.getStats("x"), false));
                    break;
                case 30001001: //잠입
                case 30011001: //잠입
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Speed, ret.effects.getStats("speed"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DarkSight, ret.effects.getStats("x"), false));
                    break;
                case 4211003: // 픽파킷
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PickPocket, ret.effects.getStats("x"), false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 4201011: // 메소 가드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MesoGuard, ret.effects.getStats("x"), false));
                    break;
                case 4111002: // 쉐도우 파트너
                case 4211008: // 쉐도우 파트너
                case 36111006: //버추얼 프로젝션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowPartner, ret.effects.getStats("x"), false));
                    break;
                case 15101006:
                case 21101006: // 아란 - 스노우 차지
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_WeaponCharge, ret.effects.getStats("x"), false));
                    break;
                case 21100015:
                case 21120021: // 스윙 연구II
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AranSmashSwing, ret.effects.getStats("w"), false));
                    break;
                case 1311008: // 드래곤 스트랭스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_STR, ret.effects.getStats("str"), false));
                    break;
                case 33101004: // 마인
                    // statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.cts_mi, ret.effects.getStats("y"), false)); 
                    break;
                case 4330009: //섀도우 이베이젼
                    statups.clear();
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, 100, false)); // 미존재 패킷 임시방편
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                /* 전사 시작 */
                case 1001003: //아이언 바디
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePDD, ret.effects.getStats("indiePdd"), true));
                    break;
                case 13101022:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TriflingWhimOnOff, 1, false));
                    break;
                /* 궁수 시작 */
                case 3101004: //소울 애로우 : 활
                case 3201004: //소울 애로우 : 석궁
                case 13101003: //소울 애로우 : 활
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EPAD, ret.effects.getStats("epad"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SoulArrow, ret.effects.getStats("x"), false));
                    break;
                case 33101003: //소울 애로우 : 크로스 보우
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SoulArrow, ret.effects.getStats("x"), false));
                    break;
                case 3121002: // 샤프 아이즈
                case 3221002: // 샤프 아이즈
                case 13121005: // 샤프 아이즈
                case 33121004: // 샤프 아이즈
                    int value = 0;
                    value += ret.effects.getStats("y");
                    value |= ret.effects.getStats("x") << 8;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SharpEyes, value, false));
                    break;
                case 3111002: // puppet ranger
                case 3211002: // puppet sniper
                case 13111004: // puppet cygnus
                case 5211001: // Pirate octopus summon
                case 5220002: // wrath of the octopi
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PickPocket, 1, false));
                    break;
                case 3121007: // 일루젼 스탭
                case 3221006: // 일루젼 스탭
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DEX, ret.effects.getStats("dex"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IllusionStep, ret.effects.getStats("x"), false));
                    break;
                case 3121016: //어드밴스드 퀴버
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AdvancedQuiver, 1, false));
                    break;
                /* 궁수 종료 */
 /* 법사 시작 */
                case 2111008:
                case 2211008:
                case 12101005:
                case 22141016:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ElementalReset, ret.effects.getStats("x"), false));
                    break;
                /* 법사 종료 */
                case 22171054: //프렌지드 소울[HyperSkill]
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 5100015: // 에너지 차지
                case 5120018: // 울트라 차지
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RWMovingEvar, sourceid != 5100015 ? 0 : 1, false));
                    break;
                /* 키네시스 시작 */
                case 142001007: //싸이킥 인스팅트
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_KinesisPsychicEnergeShield, 1, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 142001003: //ESP 부스터
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    break;
                case 142101004: //싸이킥 실드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_KinesisPsychicShield, ret.effects.getStats("er"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePDD, ret.effects.getStats("indiePdd"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMDD, ret.effects.getStats("indieMdd"), true));
                    break;
                case 142101005: //순수한 힘
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 142111008: //정신 강화
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMADR, ret.effects.getStats("indieMadR"), true));
                    break;
                case 142121006: //ESP 배틀 오더
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                /* 키네시스 종료 */
                case 1101005:
                case 1101004:
                case 1201005:
                case 1201004:
                case 1301005:
                case 1301004:
                case 2101008:
                case 2201010:
                case 2301008:
                case 3101002:
                case 3201002:
                case 4101003:
                case 4201002:
                case 4311009:
                case 2111005:
                case 2211005:
                case 5101006:
                case 5201003:
                case 5301002:
                case 11101001:
                case 12101004:
                case 13101023:
                case 15101022:
                case 22111020: //매직 부스터
                case 23101002: //듀얼보우건 부스터
                case 24101005: //케인 부스터
                case 31001001: //데몬 부스터
                case 31201002: //데몬 부스터
                case 36101004:
                case 32101005: //스태프 부스터
                case 33001003: //크로스보우 부스터
                case 35101006: //메카닉 부스터
                case 51101003: //소드 부스터
                case 27101004: //매직 부스터
                case 11101024:
                case 14101022: //스로잉 부스터 - 나이트워커
                case 33101012: // 크로스보우 부스터 - 와일드헌터
                case 37101003: //건틀렛 부스터 - 블래스터
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Booster, ret.effects.getStats("x"), false));
                    break;
                case 21001003: // Aran - Pole Arm Booster
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Booster, -(ret.effects.getStats("y")), false));
                    break;

                /* 플레임위자드 */
                case 12000022: // 엘리멘트: 플레임 1
                case 12100026: // 엘리멘트: 플레임 2
                case 12110024: // 엘리멘트: 플레임 3
                case 12120007: // 엘리멘트: 플레임 4
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MAD, ret.effects.getStats("x"), false));
                    break;
                case 12101024: // 이그니션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Ember, ret.effects.getStats("prop"), false));
                    break;
                case 12100029:
                    monsterStatus.put(MonsterStatus.MS_TimeBomb, 1);
                    break;
                case 12101023: // 북 오브 파이어
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    break;
                case 12111023: // 본 피닉스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_FlareTrick, 1, false));
                    break;
                case 12111029:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NotDamaged, 1, false));
                    ret.effects.setStats("time", 3 * 1000);
                    break;
                case 12120013: // 스피릿 오브 플레임
                case 12120014: // 스피릿 오브 플레임
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreMobDamR, ret.effects.getStats("y"), false));
                    break;
                case 12120012: // 플레임 배리어 폭발
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShieldAttack, ret.effects.getStats("x"), false));
                    break;
                case 12121003: // 플레임 배리어
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, ret.effects.getStats("x"), false));
                    break;
                case 12121005: // 버닝 리젼
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;

                /* 나이트워커 */
                case 14001021:
                    statups.add(new Triple(BuffStats.CTS_ElementDarkness, 1, false));
                    monsterStatus.put(MonsterStatus.POISON, ret.effects.getStats("dot"));
                    break;
                case 14121004: //쉐도우 스티치
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 14110030: // 다크니스 어센션 
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DarknessAscension, ret.effects.getStats("x"), false));
                    break;
                case 14121052:
                    ret.effects.setStats("time", 30 * 1000);
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieCr, ret.effects.getStats("indieCr"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("indieStance"), false));
                    break;
                case 14111024: // 쉐도우 서번트
                    ret.effects.setStats("time", 180 * 1000);
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowServant, ret.effects.getStats("x"), false));
                    break;
                case 14121054: // 쉐도우 일루젼
                case 14121055:
                case 14121056:
                    ret.effects.setStats("time", 30 * 1000);
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowIllusion, ret.effects.getStats("x"), false));
                    break;
                case 5120011: // 카운터 어택
                case 5220012: // 카운터 어택
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 20031205: // 팬텀 슈라우드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Invisible, ret.effects.getStats("x"), false));
                    break;
                case 24111002: //럭 오브 팬텀 시프
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StackBuff, 1, false));
                    break;
                case 24111003: // 미스포츈 프로텍션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMMPR, ret.effects.getStats("indieMmpR"), true));
                    break;
                case 24111005: //문라이트
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieACC, ret.effects.getStats("indieAcc"), true));
                    break;
                case 24121004: //프레이 오브 아리아
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamR, ret.effects.getStats("damR") + 10, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreMobDamR, ret.effects.getStats("x") + 10, false));
                    break;
                case 5121015: //바이퍼지션  
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePADR, ret.effects.getStats("indiePadR"), true));
                    break;
                case 51111003: //샤이닝 차지
                case 11111007: //샤이닝 차지
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 5111010: // 윌로우 디펜시브
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamAbsorbShield, ret.effects.getStats("damAbsorbShieldR"), false));
                    break;
                case 5101011: // 멘탈 클리어리티
                case 15101008: // 멘탈 클리어리티
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieACC, ret.effects.getStats("indieAcc"), true));
                    break;
                case 21111001: // 마이트
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EPAD, ret.effects.getStats("epad"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EPDD, ret.effects.getStats("epdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EMDD, ret.effects.getStats("emdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_KnockBack, ret.effects.getStats("x"), false));
                    break;
                case 21111012: // 블레싱 마하
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    break;
                case 8004:
                case 1211011: //컴뱃오더스
                case 10008004:
                case 20008004:
                case 20018004:
                case 20028004:
                case 20038004:
                case 30008004:
                case 30018004:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CombatOrders, ret.effects.getStats("x"), false));
                    break;
                case 5001005: //대쉬
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Dash_Speed, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Dash_Jump, ret.effects.getStats("y"), false));
                    break;
                case 5121009:  //윈드 부스터
                case 15111005: //윈드 부스터
                case 15121005: //윈드 부스터
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PartyBooster, ret.effects.getStats("x"), false));
                    break;
                case 4321000: //tornado spin uses same buffstats
                    ret.effects.setStats("time", 1000);
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Speed, 100 + ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Jump, ret.effects.getStats("y"), false)); //always 0 but its there
                    break;
                case 1101007: //파워 리플렉션
                case 1201007: //파워 리플렉션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, ret.effects.getStats("x"), false));
                    break;
                case 31101003: //다크 리벤지
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PowerGuard, ret.effects.getStats("y"), false));
                    break;
                case 9001008: //하이퍼 바디
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MaxHP, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MaxMP, ret.effects.getStats("x"), false));
                    break;
                case 1001: // 회복
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DotHealHPPerSecond, ret.effects.getStats("x"), false));
                    break;
                case 1311006: //dragon roar
                    ret.effects.setStats("hpR", -ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 4341002: //파이널 컷
                    ret.effects.setStats("time", 60 * 1000);
                    ret.overTime = true;
                    ret.effects.setStats("hpR", -ret.effects.getStats("x"));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, 40, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_FinalCut, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NotDamaged, 1, false));
                    break;
                case 4331002:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowPartner, ret.effects.getStats("x"), false));
                    break;
                case 27110007: //라이프 타이달.
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_LifeTidal, 1, false));
                    break;
                case 1121000:
                case 1221000:
                case 1321000:
                case 2121000:
                case 2221000:
                case 2321000:
                case 3121000:
                case 3221000:
                case 4121000:
                case 4221000:
                case 5121000:
                case 5221000:
                case 21121000:
                case 22171068: // 에반 메이플 용사
                case 27121009: // 메이플 용사
                case 31121004: // 메이플 용사
                case 31221008: // 메이플 용사
                case 36121008: // 메이플 용사
                case 32121007: // 메이플 용사
                case 24121008: // 메이플 용사
                case 4341000:
                case 5321005:
                case 23121005:
                case 25121108:
                case 35121007:
                case 33121007:
                case 37121006: //블래스터 메이플 용사
                case 51121005:
                case 11121000: //시그너스 나이츠
                case 12121000: //시그너스 나이츠
                case 13121000: //시그너스 나이츠
                case 14121000: //시그너스 나이츠
                case 15121000: //시그너스 나이츠
                case 65121009:
                case 61121014:
                case 100001268: //제로 륀느의 가호
                case 142121016: //키네시스 이계의 용사
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BasicStatUp, ret.effects.getStats("x"), false));
                    break;
                case 3111011: //익스트림 아쳐리 : 활
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ExtremeArchery, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, ret.effects.getStats("padX"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 3211012: //익스트림 아쳐리 : 석궁
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ExtremeArchery, ret.effects.getStats("x"), false));
                    break;
                case 37121054: //맥시마이즈 캐논
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RWMaximizeCannon, ret.effects.getStats("y"), false));
                    break;
                case 37101001: //더 킹
                case 37111003: //스웨이
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RWMovingEvar, 90, false));
                    ret.effects.setStats("time", 15 * 100);
                    break;
                case 25121209: //소혼
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SpiritGuard, 3, false));
                    break;
                case 25121131: //정령 결속 극대화
                    //"MP #mpCon 소비, #time초 동안에 정령 강령 시 데미지 #indieDamR%, 공격력 #indiePad, 보스 몬스터 공격 시 데미지 #indieBDR%, 공격 속도 1단계 증가, 적의 방어율 #indieIgnoreMobpdpR% 무시\n#c재사용 대기시간: #cooltime초#"
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBDR, ret.effects.getStats("indieBDR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieIgnoreMobpdpR, ret.effects.getStats("indieIgnoreMobpdpR"), true));
                    break;
                case 65121004: //소울 게이즈   
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IncCriticalDamMax, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IncCriticalDamMin, ret.effects.getStats("x"), false));
                    break;
                case 22151003: //매직 레지스턴스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMDD, ret.effects.getStats("indieMdd"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MagicResistance, ret.effects.getStats("x"), false));
                    break;
                case 21000000: //아란 콤보
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ComboAbilityBuff, ret.effects.getStats("x"), false));
                    break;
                case 21101005: //드레인
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ComboDrain, ret.effects.getStats("x"), false));
                    break;
                case 31110004: //다크 인듀어
                    //물리/마법 방어력 #pddR%, 상태이상 내성 #asrR%, 모든 속성 내성 #terR% 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PDD, ret.effects.getStats("pddR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MDD, ret.effects.getStats("pddR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("asrR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("terR"), false));
                    break;
                case 51111004: //소울 인듀어
                    //MP #mpCon 소비, #time초간 방어력 #x%, 상태이상 내성 #y%, 모든 속성 내성 #z% 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DefenseAtt, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("z"), false));
                    break;
                case 51111008: //소울 링크
                    //초당 MP #mpCon 소비.\n[#c미하일#] : 파티원 1명마다 데미지 #indieDamR% 증가, 
                    //#dot초당 최대 HP의 #s% 회복. 파티원이 받는 데미지의 #q%를 대신 받음. 
                    //대신 받는 데미지를 로얄 가드로 무효화 가능.
                    //\n[#c파티원#] : 미하일이 로얄 가드를 성공하여 증가하는 공격력의 #x%만큼 공격력과 마력 증가, 소울 인듀어로 증가하는 상태이상 내성의 #y%, 소울 인듀어로 증가하는 방어력의 #w% 공유.
                    statups.add(new Triple<>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<>(BuffStats.CTS_MichaelSoulLink, 1, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 31121005: //메타모포시스
                    int dam = ret.effects.getStats("damage") - 100;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DevilishPower, dam < 0 ? -dam : dam, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamR, ret.effects.getStats("damR"), false));
                    ret.overTime = true;
                    break;
                case 31121007: //인피니티 포스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_InfinityForce, 1, false));
                    break;
                case 31121002: //뱀피릭 터치
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_VampiricTouch, ret.effects.getStats("x"), false));
                    break;
                case 22131001: //매직 실드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PDD, ret.effects.getStats("pdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PartyBarrier, ret.effects.getStats("x"), false));
                    break;
                case 22181003:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SoulStone, ret.effects.getStats("x"), false));
                    break;
                case 4101011:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NightLordMark, 1, false));
                    break;
                case 4121014: // 다크 세레니티
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 4121054: // 블리딩 톡신
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BleedingToxin, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    monsterStatus.put(MonsterStatus.POISON, ret.effects.getStats("dot"));
                    break;
                case 4221013: // 섀도어 인스팅트
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, ret.effects.getStats("x"), true));
                    break;
                case 23111004: // 이그니스 로어
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 23121004: // 앤시언트 스피릿
                    //MP #mpCon 소비, #time초간 공격력 #indiePadR%, HP #emhp 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EMHP, ret.effects.getStats("emhp"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePADR, ret.effects.getStats("indiePadR"), true));
                    break;
                case 33001007:
                case 33001008:
                case 33001009:
                case 33001010:
                case 33001011:
                case 33001012:
                case 33001013:
                case 33001014:
                case 33001015:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_JaguarSummoned, 3870, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 33101005: // 하울링
                    //MP #mpCon 소비, #time초간 캐릭터의 받는 데미지가 #x% 감소하고 추가 회피 확률 #x%, 최대 MP #x% 증가, 모든 파티원의 공격력과 마력 #z% 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HowlingDefence, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HowlingMaxMP, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HowlingEvasion, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HowlingAttackDamage, ret.effects.getStats("z"), false));
                    break;
                case 33111007: // 비스트 폼
                    statups.clear();
                    //"MP #mpCon 소비, #time초간 공격력 #z%, 이동속도 #x 증가, 공격 속도 #w단계 증가\n[패시브 효과 : 최대 HP #mhpR% 증가]"
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Speed, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BeastFormDamageUp, ret.effects.getStats("z"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Booster, ret.effects.getStats("w"), false));
                    break;
                case 2311009: //홀리 매직쉘
                    //MP #mpCon 소비, 순수 HP #z% 회복, #time초간 마법의 보호막 생성. 보호막이 유지되는 동안 최대 #x번의 피해를 흡수, 발동 시 #y초 동안 보호막 재생성 및 홀리 매직쉘으로 회복 불가. 재사용 대기시간 90초"
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HolyMagicShell, ret.effects.getStats("x"), false));
                    break;
                case 11001022: //엘리멘트 : 소울
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ElementSoul, 1, false));
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 11101022: //폴링 문
                    //MP #mpCon 소비, 크리티컬 확률 #indieCr% 증가, 모든 스킬의 공격 횟수 #x배 증가, 최종 데미지 #y%로 감소. 라이징 선과 같이 사용 불가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieCr, ret.effects.getStats("indieCr"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BuckShot, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PoseType, 1, false));
                    break;
                case 11101023: //이너 트러스트
                    statups.add(new Triple(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 11111022: //라이징 선
                    //MP #mpCon 소비, 데미지 #indieDamR% 및 공격 속도 1단계 증가. 폴링 문과 같이 사용 불가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PoseType, 2, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 11111023: //트루 사이트
                    //MP #mpCon 소비, #time초 동안 #prop% 확률로 범위 내 적의 방어력 #v% 감소, 적이 받는 최종 데미지 #s% 증가
                    monsterStatus.put(MonsterStatus.WDEF, -ret.effects.getStats("v"));
                    monsterStatus.put(MonsterStatus.MS_TrueSight, ret.effects.getStats("s"));
                    break;
                case 11111024: //소울 가디언
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePDD, ret.effects.getStats("indiePdd"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHP, ret.effects.getStats("indieMhp"), true));
                    break;
                case 11121054: //소울 포지
                    statups.clear();
                    //MP #mpCon 소비, #time초 동안 공격력 #indiePad, 최대 데미지 제한 #indieMaxDamageOver 증가. 
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_LightOfSpirit, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 4001002: // disorder
                case 14001002: // cygnus disorder
                    monsterStatus.put(MonsterStatus.WATK, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.WDEF, ret.effects.getStats("y"));
                    break;
                case 1211013: // threaten
                    monsterStatus.put(MonsterStatus.WATK, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.WDEF, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.MATK, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.MDEF, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.AVOID, ret.effects.getStats("z"));
                    break;
                case 22131000: // 매직 플레어
                case 51111007:
                case 27101101: //인바이러빌리티
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 22141001:
                case 1111008: // shout
                case 4211002: // assaulter
                case 3101005: // arrow bomb
                case 1111005: // coma: sword
                case 5101002: // Backspin Blow
                case 5101003: // Double Uppercut
                case 5121004: // Demolition
                case 5121005: // Snatch
                case 5121007: // Barrage
                case 5201004: // pirate blank shot
                case 4121008: // Ninja Storm
                case 22151001:
                case 4201004: //steal, new
                case 33101001:
                case 33101002:
                case 32101001:
                case 32111011:
                case 32121004:
                case 33111002:
                case 33121002:
                case 35101003:
                case 5111002: //energy blast
                case 15101005:
                case 4331005:
                case 1121001: //magnet
                case 1221001:
                case 1321001:
                case 9001020:
                case 31111001:
                case 31101002:
                case 2211003:
                case 2311004:
                case 22181001:
                case 23111000:
                case 21110006:
                case 5301001:
                case 5311001:
                case 5311002:
                case 5310008:
                case 2022994:
                    if (sourceid == 5310008) { //몽키 웨이브 최고 출력
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_KeyDownTimeIgnore, 1, false));
                    }
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 1120003:
                case 11110005:
                    break;
                case 90001004:
                case 4321002:
                case 1111003:
                case 11111002:
                case 51121007:
                    monsterStatus.put(MonsterStatus.DARKNESS, ret.effects.getStats("x"));
                    break;
                case 4221003:
                case 4121003:
                case 33121005:
                    monsterStatus.put(MonsterStatus.SHOWDOWN, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.MDEF, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.WDEF, ret.effects.getStats("x"));
                    break;
                case 2221001:
                case 3211003:
                case 5211005:
                case 21120006:
                case 22121000:
                case 90001006:
                    monsterStatus.put(MonsterStatus.FREEZE, 1);
                    ret.effects.setStats("time", Integer.MAX_VALUE); //because it seems to dispel asap.
                    ret.overTime = true;
                    break;
                case 25111206:
                    monsterStatus.put(MonsterStatus.FREEZE, 1);
                    break;
                case 2121009: //마스터 매직
                case 2221009:
                case 2321010:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MasterMagicOn, 1, false));
                    break;
                case 12101001:
                case 22141003:
                    monsterStatus.put(MonsterStatus.SPEED, ret.effects.getStats("x"));
                    break;
                case 31121006: //다크 바인드
                    monsterStatus.put(MonsterStatus.POISON, ret.effects.getStats("dot"));
                    monsterStatus.put(MonsterStatus.FREEZE, 1);
                    break;
                case 21110011: //콤보저지먼트
                    monsterStatus.put(MonsterStatus.FREEZE, 1);
                    break;
                case 23111002:
                    monsterStatus.put(MonsterStatus.Burned, ret.effects.getStats("x"));
                    break;
                case 2211006:
                case 2221003: //글레이셜 체인
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 20031209: //저지먼트
                    ret.overTime = true;
                    break;
                case 20031210: //빨강 저지먼트 - 120705
                    ret.overTime = true;
                    break;
                case 3201007:
                case 3101007:
                case 3211005: // golden eagle
                case 3111005: // golden hawk
                case 33111005:
                case 33101011:
                case 3121006: // phoenix
                case 5321003: //마그네틱 앵커
                    monsterStatus.put(MonsterStatus.STUN, Integer.valueOf(1));
                    break;
                case 3221005: // frostprey
                    monsterStatus.put(MonsterStatus.FREEZE, Integer.valueOf(1));
                    break;
                case 1085:
                case 1087:
                case 1090:
                case 1179:
                case 10001085:
                case 10001087:
                case 10001090:
                case 10001179:
                case 20001085:
                case 20001087:
                case 20001090:
                case 20001179:
                case 20011085:
                case 20011087:
                case 20011090:
                case 20011179:
                case 20021085:
                case 20021087:
                case 20021090:
                case 20021179:
                case 20031085:
                case 20031087:
                case 20031090:
                case 20031179:
                case 20041085:
                case 20041087:
                case 20041090:
                case 20041179:
                case 20051085:
                case 20051087:
                case 30001085:
                case 30001087:
                case 30001090:
                case 30001179:
                case 30011085:
                case 30011087:
                case 30011090:
                case 30011179:
                case 30021085:
                case 30021087:
                case 30021090:
                case 30021179:
                case 50001085:
                case 50001087:
                case 50001090:
                case 50001179:
                case 60001085:
                case 60001087:
                case 60001090:
                case 60001179:
                case 60011085:
                case 60011087:
                case 60011090:
                case 60011179:
                    ret.effects.setStats("time", Integer.MAX_VALUE); //because it seems to dispel asap.
                    ret.overTime = true;
                    break;
                case 23121002: //레전드리 스피어
                    monsterStatus.put(MonsterStatus.WDEF, -ret.effects.getStats("x"));
                    break;
                case 2311003: // 홀리 심볼
                case 9001002: // 홀리 심볼
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HolySymbol, ret.effects.getStats("x"), false));
                    break;
                case 2211004: // il seal
                case 2111004: // fp seal
                case 12111002: // cygnus seal
                case 90001005:
                    monsterStatus.put(MonsterStatus.SEAL, 1);
                    break;
                case 4111003: // shadow web
                case 14111001:
                    monsterStatus.put(MonsterStatus.SHADOW_WEB, 1);
                    break;
                case 4111009: // 스피릿 자벨린
                case 5201008: // 인피닛 불릿
                case 14111025: //스피릿 스로윙
                    statups.add(new Triple(BuffStats.CTS_NoBulletConsume, 1, false));
                    break;
                case 2121004:
                case 2221004:
                case 2321004: // 인피니티
                    statups.add(new Triple(BuffStats.CTS_Infinity, ret.effects.getStats("x"), false));
                    statups.add(new Triple(BuffStats.CTS_Stance, ret.effects.getStats("prop"), false));
                    break;
                case 1121002:
                case 1221002:
                case 1321002: // Stance
                case 21121003: // Aran - Freezing Posture
                case 32111014: //스탠스
                case 50001214: //빛의 수호
                case 51121004: //스탠스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("prop"), false));
                    break;
                case 5321010: // 파이렛 스피릿
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("prop"), false));
                    break;
                case 1005:
                case 10001005:
                case 20001005:
                case 30001005:
                case 20011005:
                case 20021005:
                case 20031005:
                case 30011005:
                case 50001005:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MaxLevelBuff, ret.effects.getStats("x"), false));
                    break;
                case 2121002: //마나 리플렉션
                case 2221002: //마나 리플렉션
                case 2321002: //마나 리플렉션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ManaReflection, 1, false));
                    break;
                case 2321005: //어드밴스드 블레스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AdvancedBless, level, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MDD, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHP, ret.effects.getStats("indieMhp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMMP, ret.effects.getStats("indieMmp"), true));
                    break;
                case 9001003: //운영자의 축복
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Speed, ret.effects.getStats("speed"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PDD, ret.effects.getStats("pdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MDD, ret.effects.getStats("mdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EVA, ret.effects.getStats("eva"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMMPR, ret.effects.getStats("indieMmpR"), true));
                    break;
                // 캡틴
                case 5211009: //할로포인트 불릿
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 5221018: //파이렛 스타일
                    //MP #mpCon 소비, #time초간 공격력 #indiePadR% 증가, 상태 이상과 모든 속성 내성 #indieAsrR% 증가, #indieStance% 확률로 밀리지 않음. 회피치 #indieEva
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEVA, ret.effects.getStats("indieEva"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieAsrR, 30, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieStance, 60, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePADR, 20, true));
                    break;
                // 캐논슈터
                case 5301003: //몽키매직
                case 5320008: //하이퍼 몽키 스펠
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHP, ret.effects.getStats("indieMhp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMMP, ret.effects.getStats("indieMmp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieACC, ret.effects.getStats("indieAcc"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEVA, ret.effects.getStats("indieEva"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieJump, ret.effects.getStats("indieJump"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieSpeed, ret.effects.getStats("indieSpeed"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieAllStat, ret.effects.getStats("indieAllStat"), true));
                    break;
                case 5311004: //오크통 룰렛
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Roulette, 4, false));
                    break;
                case 5311010:
                    //MP #mpCon 소모. 최대 #mobCount명의 적에게 #damage%로 #attackCount번 공격. #prop% 확률로 #dotTime초 동안 #dot% 화속성 데미지
                    monsterStatus.put(MonsterStatus.MS_AddDamParty, ret.effects.getStats("z"));
                    monsterStatus.put(MonsterStatus.Burned, ret.effects.getStats("dot"));
                    break;
                case 80001034: //세인트 세이버 1단계
                case 80001035: //세인트 세이버 2단계
                case 80001036: //세인트 세이버 3단계
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieJump, ret.effects.getStats("indieJump"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieSpeed, ret.effects.getStats("indieSpeed"), true));
                    break;
                case 5111007:
                case 5120012:
                case 5211007:
                case 5220014:
                case 35111013:
                case 35120014: //double lucky
                case 15111011:
                case 5311005:
                case 5320007: // 럭키 다이스
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Dice, 0, false));
                    break;
                // 메르세데스
                case 23101003: //스피릿 인퓨전
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, ret.effects.getStats("damage"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, ret.effects.getStats("x"), false));
                    break;
                case 23111005: // 워터 쉴드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("terR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("terR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamAbsorbShield, 1, false));
                    break;
                case 20050286: // 이스케이프
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PreReviveOnce, ret.effects.getStats("prop"), false));
                    break;
                case 25101009: // 여우령
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HiddenPossession, 1, false));
                    break;
                /* 메카닉 시작 */
                case 35111016: // 오버튜닝
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 35121010: // 앰플리파이어
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AmplifyDamage, ret.effects.getStats("x"), false));
                    ret.effects.setStats("time", 60000);
                    break;
                case 35121006: // 세이프티
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 35111011: // 힐링로봇
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MaxHP, ret.effects.getStats("hp"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MaxHP, ret.effects.getStats("hcHp"), false));
                    break;
                case 35111002: // 마그네틱 필드
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 35101007: // 퍼펙트 아머
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Guard, ret.effects.getStats("x"), false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 35111005: // 액셀레이터
                    monsterStatus.put(MonsterStatus.SPEED, ret.effects.getStats("x"));
                    monsterStatus.put(MonsterStatus.WDEF, ret.effects.getStats("y"));
                    break;
                case 35121003: // 워머신 타이탄
                    ret.effects.setStats("time", 60 * 120 * 1000);
                    break;
                case 35001002: // 메탈아머 : 휴먼
                case 35111003: // 메탈아머 : 탱크
                    ret.effects.setStats("time", 60 * 120 * 1000);
                    break;
                /* 메카닉 종료 */
 /* 배틀 메이지 시작 */
                case 32001016: // 옐로우 오라
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BMageAura, level, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieSpeed, ret.effects.getStats("indieSpeed"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 32101009: // 드레인 오라
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BMageAura, level, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 32111012: // 블루 오라
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BMageAura, level, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieAsrR, ret.effects.getStats("indieAsrR"), true));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 32111016: // 다크 라이트닝
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DarkLighting, ret.effects.getStats("x"), false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 32121010: //배틀 레이지
                    //MP #mpCon 소비, 데미지 #x% 증가, 크리티컬 확률 #z% 증가, 최소 크리티컬 데미지 #y% 증가, 모든 공격 스킬의 최대 타겟 수 #mobCount명으로 제한
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Enrage, (ret.effects.getStats("x") * 100) + 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EnrageCr, ret.effects.getStats("z"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EnrageCrDamMin, ret.effects.getStats("y"), false));
                    ret.effects.setStats("time", 2100000000);
                    break;
                case 32121017: // 다크 오라
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BMageAura, level, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                /*case 32001014: // 데스
                case 32100010: // 데스 컨트랙트
                case 32110017: // 데스 컨트랙트2
                case 32120019: // 데스 컨트랙트3
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BMageDeath, 0, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;*/
                case 32121018: // 디버프 오라
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BMageAura, level, false));
                    break;
                /* 배틀 메이지 종료 */
                case 2311007: // 텔레포트 마스터리
                case 12111007: // 텔레포트 마스터리
                case 22161005: // 텔레포트 마스터리
                case 32111010: // 텔레포트 마스터리
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TeleportMasteryOn, ret.effects.getStats("x"), false));
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 33111011: // 드로우 백
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DrawBack, ret.effects.getStats("x"), false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 2320011:
                case 2220010:
                case 2120010:
                    ret.effects.setStats("time", 5000);
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ArcaneAim, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreMobpdpR, ret.effects.getStats("ignoreMobpdpR"), false));
                    break;
                case 3111000: //집중
                case 3211000:
                case 33111009: //와일드헌터 집중
                case 13111001:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EPAD, ret.effects.getStats("epad"), false));
                    break;
                case 3210013: //데미지 리버싱
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PowerTransferGauge, ret.effects.getStats("y"), false));
                    break;
                case 3120006: //스피릿 링크
                case 3220005: // x값 : 체력 +% 량.. 패킷전송에는 관련없음
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SpiritLink, ret.effects.getStats("x"), false));
                    break;
                case 13111005: //알바트로스
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Speed, ret.effects.getStats("speed"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Jump, ret.effects.getStats("jump"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EMDD, ret.effects.getStats("emdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EPDD, ret.effects.getStats("epdd"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 27001004: //익스텐드 마나
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMMPR, ret.effects.getStats("indieMmpR"), true));
                    break;
                case 27101202: // 보이드 프레셔
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_KeyDownAreaMoving, ret.effects.getStats("x"), false));
                    break;
                case 27100003: //블레스 오브 다크니스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BlessOfDarkness, ret.effects.getStats("y"), false));
                    ret.overTime = true;
                    break;
                case 27111005: //라이트쉐도우 가드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePDD, ret.effects.getStats("indiePdd"), true));
                    break;
                case 27111006: //포틱 메디테이션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EMAD, ret.effects.getStats("emad"), false));
                    break;
                case 20040216: //선파이어
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Larkness, ret.effects.getStats("x"), false));
                    break;
                case 20040217: //이클립스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Larkness, ret.effects.getStats("y"), false));
                    break;
                case 20040219: //이퀄리브리엄
                case 20040220: //이퀄리브리엄
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Larkness, 2, false));
                    ret.effects.setStats("time", 1000);
                    break;
                case 2022911: // 괴도의 예고장
                    statups.clear();
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ChangeFoxMan, level, false));
                    break;
                case 27121005: //다크 크레센도
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StackBuff, ret.effects.getStats("x"), false));
                    break;
                case 27121006: //다크니스 소서리
                    //MP #mpCon 소비, #time초간 몬스터 속성 내성 #y% 무시\n[패시브 효과 : 최종 데미지 #mdR% 증가, 방어율 #ignoreMobpdpR% 무시]
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ElementalReset, ret.effects.getStats("y"), false));
                    break;
                case 31121053: //윌 오브 리버티[데몬슬레이어-Hyper]
                case 31221053: //[데몬어벤져-Hyper]
                case 32121053: //[배틀메이지-Hyper]
                case 33121053: //[와일드헌터-Hyper]
                case 35121053: //[메카닉-Hyper]
                case 37121053: //[블래스터-Hyper]
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 32121056: // 배틀 마스터
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MasterMagicOn, 1, false));
                    break;
                case 33121054: // 사일런트 램피지
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_FinalAttackProp, ret.effects.getStats("x"), false));
                    break;

                case 51001006:
                case 51001007:
                case 51001008:
                case 51001009:
                case 51001010:
                case 51001011:
                case 51001012:
                case 51001013:
                case 51111012:
                case 51111013:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RoyalGuardPrepare, 1, false));
                    ret.overTime = true;
                    break;
                case 51001005:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RoyalGuardState, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RoyalGuardPrepare, 1, false));
                    break;
                case 60001216: // 리셔플스위치 : 방어모드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ReshuffleSwitch, 0, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    ret.overTime = true;
                    break;
                case 60001217: // 리셔플스위치 : 공격모드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ReshuffleSwitch, 0, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    ret.overTime = true;
                    break;
                case 61101004: // 블레이즈 업
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Booster, ret.effects.getStats("x"), false));
                    ret.overTime = true;
                    break;
                case 61101002: // 윌 오브 소드
                case 61110211: // 윌 오브 소드 (트랜스피규레이션)
                case 61120007: // 어드밴스드 윌 오브 소드
                case 61121217: // 어드밴스드 윌 오브 소드 (트랜스피규레이션)
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StopForceAtomInfo, ret.effects.getStats("cooltime"), false));
                    ret.effects.setStats("time", level * 12 * 1000);
                    ret.overTime = true;
                    break;
                case 61111003: // 리게인 스트렝스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("asrR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("terR"), false));
                    break;
                case 61111004: // 카탈라이즈
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 61121009: // 로버스트 아머
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PartyBarrier, ret.effects.getStats("v"), false));
                    break;
                case 61111008: // 파이널 피규레이션 (3차)
                case 61120008: // 파이널 피규레이션 (4차)
                case 61121053:
                    statups.add(new Triple<>(BuffStats.CTS_Speed, ret.effects.getStats("speed"), false));
                    statups.add(new Triple<>(BuffStats.CTS_Morph, ret.effects.getStats("morph"), false));
                    statups.add(new Triple<>(BuffStats.CTS_Stance, ret.effects.getStats("prop"), false));
                    statups.add(new Triple<>(BuffStats.CTS_HitCriDamR, ret.effects.getStats("cr"), false));
                    statups.add(new Triple<>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    break;
                case 5321004: // 서포트 몽키 트윈스
                case 5320011: // 서포트 몽키 트윈스2
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("prop"), false));
                    monsterStatus.put(MonsterStatus.SPEED, ret.effects.getStats("x"));
                    ret.overTime = true;
                    break;
                case 22171064:
                    statups.add(new Triple<>(BuffStats.CTS_AsrR, ret.effects.getStats("asrR"), false));
                    break;
                case 65111003: // 콜 오브 에인션트
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 60011219: // 소울 컨트랙트
                case 80001155:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 65101002: // 파워 트랜스퍼
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PowerTransferGauge, 1000, false));
                    break;
                case 65101100: // 스팅 익스플로전
                    monsterStatus.put(MonsterStatus.MS_Explosion, 1);
                    break;
                case 65111004: // 아이언 로터스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("prop"), false));
                    break;
                case 65121053: //파이널 컨트랙트
                    //#time초간 크리티컬 확률 #x%. 스탠스 확률 #indieStance%, 상태 이상 저항 #asrR%, 모든 속성 저항 #terR% 증가\n재사용 대기시간 #cooltime초
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("asrR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("terR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieStance, ret.effects.getStats("indieStance"), true));
                    break;
                case 31201003: // 어비셜 레이지
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 31211003: // 리프랙트 이블
                    //HP #hpCon 소비, #time초동안 모든 속성 내성 #y%, 상태 내성 #z% 증가, 받는 데미지 #x% 감소
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("z"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, ret.effects.getStats("x"), false));
                    break;
                case 31211004: // 디아볼릭 리커버리
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DiabolikRecovery, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    break;
                case 31221004: // 오버휄밍 파워
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 51121052: // 데들리 차지 
                    monsterStatus.put(MonsterStatus.MS_DeadlyCharge, level);
                    monsterStatus.put(MonsterStatus.MS_AddDamParty, level);
                    break;
                case 51121054: // 세이크리드 큐브[Hyper]
                    //P #mpCon 소비, #time초간 데미지 #indieDamR%, 최대 HP #indieMhpR% 증가\n데미지 감소 #x% 추가, 로얄 가드의 방어 가능한 시간 1회째로 고정.\n재사용 대기시간 : #cooltime초
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamAbsorbShield, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    break;
                case 51121053: // 퀸 오브 투모로우[Hyper]
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    ret.effects.setStats("time", 60 * 1000);
                    break;
                case 23121054: //엘비쉬 블레싱[Hyper]
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("x"), false));
                    break;
                case 1121053:
                case 1221053:
                case 1321053:
                case 2121053:
                case 2221053:
                case 2321053:
                case 3121053:
                case 3221053:
                case 4121053:
                case 4221053:
                case 4341053:
                case 5121053:
                case 5221053:
                case 5321053:
                case 11121053:
                case 12121053:
                case 13121053:
                case 14121053:
                case 15121053:
                case 27121053:
                case 21121053:
                case 22171082:
                case 23121053:
                case 24121053:
                case 25121132:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    ret.effects.setStats("time", 60 * 1000);
                    break;
                case 31011000:
                case 31201000:
                case 31211000:
                case 31221000: {
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Exceed, 0, false));
                    ret.effects.setStats("time", 15000);
                    break;
                }
                case 36001002: //인클라인 파워
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 36111003: //듀얼브리드 디펜시브
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StackBuff, ret.effects.getStats("prop"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, ret.effects.getStats("z"), false));
                    break;
                case 36111004: //이지스 시스템
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_XenonAegisSystem, 1, false));
                    break;
                case 36101002: //리니어 퍼스펙티브
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, ret.effects.getStats("x"), false));
                    break;
                case 36101003: //에피션시 파이프라인
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMMPR, ret.effects.getStats("indieMmpR"), true));
                    break;
                case 36121003: //오파츠 코드
                    //#c[서플라이]#\n에너지 #powerCon 소비, #time초 동안 데미지 #indieDamR%, 보스 몬스터 공격 시 데미지 #indieBDR% 증가
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBDR, ret.effects.getStats("indieBDR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 36121004: //오펜시브 매트릭스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("stanceProp"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreMobpdpR, ret.effects.getStats("ignoreMobpdpR"), false));
                    break;
                case 27121054:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Larkness, 2, false));
                    break;
                case 31221054: // 포비든 컨트랙트
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 30021237: //에비에이션 리버티
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NewFlying, 1, false));
                    break;
                case 4341052:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Asura, 100, false));
                    break;
                case 4341054: //히든 블레이드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_WindBreakerFinal, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowPartner, ret.effects.getStats("x"), false));
                    ret.overTime = true;
                    break;
                case 3110001: //모탈 블로우
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BowMasterMortalBlow, 1, false));
                    break;
                case 3110012: //컨센트레이션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BowMasterConcentration, 1, false));
                    break;
                case 4221054: //플립 더 코인
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_FlipTheCoin, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, ret.effects.getStats("x"), false));
                    break;

                case 5121054: //스티뮬레이트
                    //발동 시 MP #mpCon 소비, #time 초간 데미지 #indieDamR% 증가, 일정 주기로 에너지 #x 스스로 충전
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stimulate, 1, false));
                    break;
                case 5121052:
                case 5121055: //유니티 오브 파워
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_UnityOfPower, 1, false));
                    break;
                case 5321054: //벅 샷
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BuckShot, level, false));
                    break;
                case 15121004: //축뢰
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowPartner, ret.effects.getStats("x"), false));
                    break;
                case 15121054: //천지개벽
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StrikerHyperElectric, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 61121054:
                    //"공격력 #indiePad, 공격 속도 1단계 증가. 공격 무시 및 공격 반사 상태의 적에게도 피해를 입힘
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    break;
                case 1121054:
                    //적의 어떠한 공격에도 밀려나지 않음.\n
                    //크리티컬 확률 #indieCr%, 상태이상 내성 및 모든 속성 저항 #x%만큼 증가.\n
                    //레이징 블로우가 강화되어 최대 #w명의 적을 #z% 데미지로 #u번 공격, #c마지막 두 번의 공격은 크리티컬 판정##\n
                    //재사용 대기시간 : #cooltime초.\n영구적으로 최대 데미지 제한 #psdIncMaxDam 증가
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, 100, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieCr, ret.effects.getStats("indieCr"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("x"), false));
                    break;
                case 1321054: //다크 서스트
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 2121054: //파이어 오라
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_FireAura, 1, false));
                    break;
                case 31121054:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowPartner, ret.effects.getStats("x"), false));
                    break;
                case 2321055: //헤븐즈 도어
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_HeavensDoor, 1, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 2321054: //벤전스 오브 엔젤
                    ret.absstats = false;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_VengeanceOfAngel, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreMobpdpR, ret.effects.getStats("ignoreMobpdpR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 5221021: //퀵 드로우
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_QuickDraw, 1, false));
                    break;
                case 5221054: // 언위어링 넥타
                    //MP #mpCon 소비. #time초간 최대 HP, 상태 이상 내성, 모든 속성 저항 #y% 증가\n크리티컬 확률, 최대 데미지 제한 #indieMaxDamageOverR% 증가, 피격 데미지 #w% 감소
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AsrR, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("y"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, ret.effects.getStats("w"), false));
                    break;
                case 15001022: // 엘리멘트 : 라이트닝
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CygnusElementSkill, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StackBuff, 1, false));
                    break;
                case 3121054: // 프리퍼레이션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BdR, ret.effects.getStats("y"), false));
                    break;
                case 3221054:
                    //MP #mpCon 소비, #time초간 크리티컬 확률 #x%, 
                    //최대 크리티컬 데미지 #y%, 몬스터 방어율 무시 #indieIgnoreMobpdpR%, 
                    //데미지 #indieDamR% 증가\n재사용 대기시간 : #cooltime초
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreMobpdpR, ret.effects.getStats("ignoreMobpdpR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BullsEye, 5180, false));
                    break;
                case 15120003:
                case 15111022:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamR, ret.effects.getStats("y"), false));
                    break;
                /* 윈드브레이커 시작 */
                case 13001022: // 엘리멘트 : 스톰
                    statups.clear();
                    statups.add(new Triple<>(BuffStats.CTS_CygnusElementSkill, 1, false));
                    statups.add(new Triple<>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    break;
                case 13101024: // 실프스 에이드
                    //"MP #mpCon 소비, #time초 동안 화살 소비 없이 공격 가능하며 공격력 #indiePad, 크리티컬 확률 #x% 증가 "
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SoulArrow, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 13110026: //세컨드 윈드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    break;
                case 13121004: //윈드 블레싱
                    //"MP #mpCon 소비, #time초 동안 공격력 #indiePadR%, 민첩성 #x%, 명중률 #y%, 추가 회피율 #prop%, 최대 HP #indieMhpR% 증가 "
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePadR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EVA, ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    break;
                case 13111023: //알바트로스
                    ret.absstats = false;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHP, ret.effects.getStats("indieMhp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieCr, ret.effects.getStats("indieCr"), true));
                    break;
                case 13120008: //알바트로스 맥시멈
                    ret.absstats = false;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreMobpdpR, ret.effects.getStats("ignoreMobpdpR"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHP, ret.effects.getStats("indieMhp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieAsrR, ret.effects.getStats("indieAsrR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieCr, ret.effects.getStats("indieCr"), true));
                    break;
                case 13121052:
                    monsterStatus.put(MonsterStatus.Burned, 1);
                    break;
                case 13121054: //스톰 브링어
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StormBringer, 1, false));
                    break;

                case 3211011: //페인 킬러
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MagicShield, ret.effects.getStats("asrR"), false));
                    break;
                case 2211012: //엘리멘탈 어뎁팅(썬,콜)
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AntiMagicShell, 1, false));
                    break;
                case 2311012: //디바인 프로텍션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AntiMagicShell, 1, false));
                    break;
                case 27111004: //안티 매직쉘
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MagicShield, 3, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TerR, ret.effects.getStats("terR"), false));
                    break;
                case 2201001: //메디테이션
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    break;
                case 2201009: //칠링 스텝
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ChillingStep, 1, false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                case 1321015: //새크리파이스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBDR, ret.effects.getStats("indieBDR"), true));
                    break;
                case 21121054: //콤보 언리미티드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ComboUnlimited, ret.effects.getStats("cooltime"), false));
                    break;
                /*사용 후 #time초간 데미지 #indieDamR%, 데미지 최대값 #indieMaxDamageOverR% 증가*/
                case 36121052:
                    monsterStatus.put(MonsterStatus.WDEF, 30);
                    break;
                case 36121055:
                    statups.add(new Triple<>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    ret.overTime = true;
                    break;
                case 36121053:
                    monsterStatus.put(MonsterStatus.STUN, 1);
                    break;
                case 36121054:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SurplusSupply, 20, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AmaranthGenerator, 30020232, false));
                    ret.overTime = true;
                    break;
                case 65121054:
                    //#time초간 방어 무시 비율 #indieIgnoreMobpdpR%, 보스 몬스터 공격 시 데미지 #indieBDR%, 소울 시커 엑스퍼트 발동확률 #x% 증가\n재사용 대기시간 #cooltime초
                    statups.add(new Triple<>(BuffStats.CTS_IndieIgnoreMobpdpR, ret.effects.getStats("indieIgnoreMobpdpR"), true));
                    statups.add(new Triple<>(BuffStats.CTS_IndieBDR, ret.effects.getStats("indieBDR"), true));
                    break;
                case 1211014: // 파라쇼크 가드 
                    //자신의 #c가드 확률과 방어력#을 감소시키는 대신 주위 아군들의 피격 시 데미지를 감소시키고 일정 확률로 가드할 수 있게 하며 
                    //자신의 #c공격력을 증가#시킨다.\n스킬 사용 시 효과가 활성화되고 재사용 시 비활성화되는 #c온오프 스킬#
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePDDR, ret.effects.getStats("x"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_KnightsAura, ret.effects.getStats("z"), true));
                    break;
                case 100000276: //래피드 타임(디텍트)
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TimeFastABuff, level, false));
                    break;
                case 100000277: //래피드 타임(컴뱃)
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_TimeFastBBuff, level, false));
                    break;
                case 100001263: //디바인 포스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ZeroAuraStr, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMAD, ret.effects.getStats("indieMad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePDD, ret.effects.getStats("indiePdd"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMDD, ret.effects.getStats("indieMdd"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieTerR, ret.effects.getStats("indieTerR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieAsrR, ret.effects.getStats("indieAsrR"), true));
                    break;
                case 100001264: //디바인 스위프트
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ZeroAuraSpd, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieACC, ret.effects.getStats("indieAcc"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEVA, ret.effects.getStats("indieEva"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieJump, ret.effects.getStats("indieJump"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieSpeed, ret.effects.getStats("indieSpeed"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    break;
                case 100001216:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Booster, 1, false));
                    break;
                case 100001274: //타임 홀딩
                    ret.effects.setStats("time", 15 * 1000);
                    //타임 포스 #forceCon 소비, #time초 동안 무적 상태, 타임 리와인드를 제외한 제로의 모든 스킬 재사용 대기시간 초기화.\n
                    //제로가 200레벨 이상일 경우 사용 후 #x초간 데미지 #y%, 최대 데미지 제한 #z% 증가\n#c재사용 대기시간 #cooltime초#"
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NotDamaged, 1, false));
                    break;
                case 100001281:
                    ret.effects.setStats("time", 90 * 1000);
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, 10, true));
                    break;
                case 100001005: //인탠시브 타임
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, 4, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IllusionStep, 4, false));
                    break;
                case 100001272: //타임 리와인드
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PreReviveOnce, ret.effects.getStats("x"), false));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
                /* 룬 스킬 */
                case 80001427: //신속의 룬 버프
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieJump, ret.effects.getStats("indieJump"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieSpeed, ret.effects.getStats("indieSpeed"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEXP, ret.effects.getStats("indieExp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    ret.isRune = true;
                    break;
                case 80001428: //재생의 룬 버프
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DotHealHPPerSecond, 1, false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEXP, ret.effects.getStats("indieExp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieAsrR, ret.effects.getStats("indieAsrR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieTerR, ret.effects.getStats("indieTerR"), true));
                    ret.isRune = true;
                    break;
                case 80001430: //붕괴의 룬 버프
                case 80001432: //파멸의 룬 버프 
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEXP, ret.effects.getStats("indieExp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, ret.effects.getStats("indieDamR"), true));
                    ret.isRune = true;
                    break;
                case 80001874: //증식의 룬
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IncMobRateDummy, ret.effects.getStats("incMobRateDummy"), false));
                    break;
                case 80001875: //초월의 룬fixCoolTime
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_FixCoolTime, ret.effects.getStats("fixCoolTime"), false));
                    ret.isRune = true;
                    break;
                case 80001752: //천둥의 룬 경험치 버프
                case 80001753: //지진의 룬 경험치 버프
                case 80001754: //어둠의 룬 경험치 버프
                case 80001877: //증식의 룬 경험치 버프
                case 80001878: //초월의 룬 경험치 버프
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEXP, ret.effects.getStats("indieExp"), true));
                    ret.isRune = true;
                    break;
                case 80001757: //지진의 룬 거대 버프.
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieJump, ret.effects.getStats("indieJump"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieSpeed, ret.effects.getStats("indieSpeed"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Inflation, ret.effects.getStats("x"), false));
                    ret.isRune = true;
                    break;
                case 80001762: //천둥의 룬 버프
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RandAreaAttack, 3, false)); //3회, WZ에 미존재.
                    break;
                /* 소울스킬 */
                case 80001280: //여왕의 향기는 나빌레라
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMMPR, ret.effects.getStats("indieMmpR"), true));
                    break;
                case 80001218: //회춘신공
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, ret.effects.getStats("x"), true));
                    break;
                case 80001455: //리스트레인트 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePADR, ret.effects.getStats("indiePadR"), true));
                    break;
                case 80001456: //얼티메이덤 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, 30000, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MAD, 30000, true));
                    break;
                case 80001457: //리밋 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBDR, ret.effects.getStats("indieBDR"), true));
                    break;
                case 80001458: //헬스컷 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MHPCutR, -ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBDR, ret.effects.getStats("indieBDR"), true));
                    break;
                case 80001459: //마나컷 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MMPCutR, -ret.effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieIgnoreMobpdpR, ret.effects.getStats("indieIgnoreMobpdpR"), true));
                    break;
                case 80001460: //듀라빌리티 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, -ret.effects.getStats("indieMhpR"), true));
                    break;
                case 80001474: //스위프트 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, ret.effects.getStats("indieBooster"), true));
                    break;
                case 80001477: //리플렉티브 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, ret.effects.getStats("x"), false));
                    break;
                case 80001479: //리스크테이커 링
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePADR, ret.effects.getStats("indiePadR"), true));
                    break;
                case 80001466:
                case 80001467:
                case 80001468: //스페셜 반지
                case 80001469:
                case 80001470:
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AttackCountX, 1, false));
                    break;
                case 80001816: //무신초례
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePAD, ret.effects.getStats("indiePad"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMHPR, ret.effects.getStats("indieMhpR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMMPR, ret.effects.getStats("indieMmpR"), true));
                    break;
                case 80001843: //화염결계!!
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_FireBarrier, ret.effects.getStats("x"), false));
                    break;
                //테스트
                case 131001000: //핑크빈 공격
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PinkbeanAttackBuff, ret.effects.getStats("u"), false));
                    break;
                case 131001009: //모두 힘내요!
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieSpeed, ret.effects.getStats("indieSpeed"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEXP, ret.effects.getStats("indieExp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePADR, ret.effects.getStats("indiePadR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMADR, ret.effects.getStats("indieMadR"), true));
                    break;
                case 131001010: //초불꽃 요요
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PinkbeanYoYoStack, 8, false));
                    break;
                case 131001015: //미니빈 출동!
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PinkbeanMinibeenMove, level, false));
                    break;
                case 131001106: //릴랙스
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEXP, ret.effects.getStats("indieExp"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieAsrR, ret.effects.getStats("indieAsrR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMADR, ret.effects.getStats("indieMadR"), true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PinkbeanRelax, level, false));
                    break;
                case 36001005: // 핀포인트 로켓
                    statups.clear();
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_XenonAegisSystem, 1, true));
                    ret.effects.setStats("time", Integer.MAX_VALUE);
                    break;
            }
            /* 끝 */
            if (GameConstants.isBeginnerJob(sourceid / 10000)) {
                switch (sourceid % 10000) {
                    case 8001:
                        //statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, 1, false));
                        break;
                    case 1011: // Berserk fury
                        //  statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.BERSERK_FURY, ret.getSkillStats().getStats("x"), false));
                        break;
                    case 1010:
                        //  statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.DIVINE_BODY, 1, false));
                        break;
                    case 8003:
                        //   statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.MAXHP, ret.getSkillStats().getStats("x"), false));
                        //    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MaxMP, ret.getSkillStats().getStats("x"), false));
                        break;
                    case 8004:
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CombatOrders, ret.getSkillStats().getStats("x"), false));
                        break;
                    case 8005:
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_AdvancedBless, 1, false));
                        break;
                    case 8006:
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Inflation, ret.getSkillStats().getStats("x"), false));
                        break;
                    case 8002:
                        int valuez = 0;
                        valuez += ret.effects.getStats("y");
                        valuez |= ret.effects.getStats("x") << 8;
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_SharpEyes, valuez, false));
                        break;
                    case 1026: // Soaring
                    case 1142: // Soaring
                        ret.getSkillStats().setStats("time", 600000);
                        //        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.cts_so, 1, false));
                        break;
                }
            }
        }

        if (ret.isFlyRiding()) {
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_NewFlying, 1, false);
        }

        if (ret.isMonsterRiding() && !ret.isFlyRiding()) { // 치우씨 :: 플라이 라이딩
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_MonsterRiding, 1, false);
        }

        if (ret.isEvanDragonMaster()) {
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_RideVehicleExpire, 1, false);
        }

        if (sourceid != 1105) {
            if (ret.effects.getStats("morph") > 0 || ret.isPirateCTS_Morph()) {
                addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_Morph, ret.getMorph(), false);
            }
        }
        if (ret.overTime && ret.getSummonMovementType() == null && ret.absstats) {
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_PAD, Integer.valueOf(ret.effects.getStats("pad")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_IndiePAD, Integer.valueOf(ret.effects.getStats("indiePad")), true);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_PDD, Integer.valueOf(ret.effects.getStats("pdd")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_MAD, Integer.valueOf(ret.effects.getStats("mad")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_IndieMAD, Integer.valueOf(ret.effects.getStats("indieMad")), true);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_MDD, Integer.valueOf(ret.effects.getStats("mdd")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_ACC, Integer.valueOf(ret.effects.getStats("acc")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_EVA, Integer.valueOf(ret.effects.getStats("eva")), false);
            if (sourceid == 14001027) {
                addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_NightWalkerBat, Integer.valueOf(2), false);
            } else {
                addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_Speed, Integer.valueOf(ret.effects.getStats("speed")), false);
            }
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_Jump, Integer.valueOf(ret.effects.getStats("jump")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_EMHP, Integer.valueOf(ret.effects.getStats("emhp")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_EMMP, Integer.valueOf(ret.effects.getStats("emmp")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_EMAD, Integer.valueOf(ret.effects.getStats("emad")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_EPAD, Integer.valueOf(ret.effects.getStats("epad")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_EPDD, Integer.valueOf(ret.effects.getStats("epdd")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_EMDD, Integer.valueOf(ret.effects.getStats("emdd")), false);
            if (sourceid != 21101005 && sourceid != 22131001 && sourceid == 3211010 && sourceid == 3111010 && sourceid == 1100012) { //매직 실드, 드레인은 패시브효과임
                addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_MHPCutR, ret.effects.getStats("mhpR"), false);
            }
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_MMPCutR, ret.effects.getStats("mmpR"), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_ExpBuffRate, Integer.valueOf(ret.effects.getStats("expBuff")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_Inflation, Integer.valueOf(ret.effects.getStats("inflation")), false);
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_IndieEXP, Integer.valueOf(ret.effects.getStats("indieExp")), true);
        }
        if (ret.isInflation()) {
            addBuffStatPairToListIfNotZero(statups, BuffStats.CTS_Inflation, Integer.valueOf(ret.getInflation()), false);
        }
        if (!skill) {
            switch (sourceid) {
                case 2022747:
                    statups.clear();
                    ret.effects.setStats("time", 600000);
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, 10, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MAD, 10, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RepeatEffect, 1, false));
                    break;
                case 2022746:
                case 2022764:
                    statups.clear();
                    ret.effects.setStats("time", 600000);
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, 5, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MAD, 5, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RepeatEffect, 1, false));
                    break;
                case 2022823:
                    statups.clear();
                    ret.effects.setStats("time", 600000);
                    ret.overTime = true;
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_PAD, 12, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MAD, 12, true));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RepeatEffect, 1, false));
                    break;
            }
        }
        ret.monsterStatus = monsterStatus;
        statups.trimToSize();
        ret.statups = statups;

        return ret;
    }

    /**
     * @param applyto
     * @param obj
     * @param attack damage done by the skill
     */
    public final boolean applyTo(MapleCharacter chr) {
        return applyTo(chr, chr, true, null);
    }

    public final boolean applyTo(MapleCharacter chr, Point pos) {
        return applyTo(chr, chr, true, pos);
    }

    public final void applyTo(MapleCharacter chr, Point pos, boolean showEffect) {
        applyTo(chr, chr, showEffect, pos);
    }

    private final boolean applyTo(final MapleCharacter applyfrom, final MapleCharacter applyto, final boolean primary, Point pos) {
        int hpchange = calcHPChange(applyfrom, primary);
        int mpchange = calcMPChange(applyfrom, primary);

        final PlayerStats stat = applyto.getStat();
        if (primary) {
            if (effects.getStats("itemConNo") != 0) {
                InventoryManipulator.removeById(applyto.getClient(), GameConstants.getInventoryType(effects.getStats("itemCon")), effects.getStats("itemCon"), effects.getStats("itemConNo"), false, true);
            }
        } else if (!primary && isResurrection()) {
            hpchange = stat.getMaxHp();
            applyto.setStance(0); //TODO fix death bug, player doesnt spawn on other screen
        }
        if (isDispel() && makeChanceResult()) {
            applyto.dispelDebuffs();
            final Rectangle bounds = calculateBoundingBox(pos != null ? pos : applyfrom.getPosition(), applyfrom.isFacingLeft());
            int i = 0;
            List<MonsterStatus> cancel = new ArrayList<MonsterStatus>();
            cancel.add(MonsterStatus.WEAPON_DEFENSE_UP);
            cancel.add(MonsterStatus.MAGIC_DEFENSE_UP);
            cancel.add(MonsterStatus.WEAPON_ATTACK_UP);
            cancel.add(MonsterStatus.MAGIC_ATTACK_UP);
            for (MapleMapObject hmo : applyfrom.getMap().getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                if (makeChanceResult()) {
                    MapleMonster mob = (MapleMonster) hmo;
                    for (MonsterStatus statlulz : cancel) {
                        mob.cancelStatus(statlulz);
                    }
                }
                ++i;
            }
        } else if (isHeroWill()) {
            applyto.dispelDebuff(DiseaseStats.SEDUCE);
        } else if (cureDebuffs.size() > 0) {
            for (final DiseaseStats debuff : cureDebuffs) {
                applyfrom.dispelDebuff(debuff);
            }
        } else if (isComboRecharge()) {
            ISkill comboskill = SkillFactory.getSkill(21111009);
            final int comboskillLvl = applyto.getSkillLevel(comboskill);
            final SkillStatEffect comboEffect = comboskill.getEffect(comboskillLvl);
            final long curr = System.currentTimeMillis();
            int combo = comboEffect.getY();
            final int toDecreaseHP = ((stat.getMaxHp() / 100) * comboEffect.getX());
            if (stat.getHp() > toDecreaseHP) {
                hpchange += -toDecreaseHP; // -10% of max HP
            } else {
                hpchange = stat.getHp() == 1 ? 0 : stat.getHp() - 1;
            }
            applyto.setLastCombo(curr);
            applyto.setCombo((short) combo);
            applyto.getClient().getSession().writeAndFlush(MainPacketCreator.RechargeCombo(combo));
            SkillFactory.getSkill(21000000).getEffect(applyto.getSkillLevel(21000000)).applyTo(applyto);
        } else if (isMPRecovery()) {
            final int toDecreaseHP = ((stat.getMaxHp() / 100) * 10);
            if (stat.getHp() > toDecreaseHP) {
                hpchange += -toDecreaseHP; // -10% of max HP
            } else {
                hpchange = stat.getHp() == 1 ? 0 : stat.getHp() - 1;
            }
            mpchange += ((toDecreaseHP / 100) * getY());
        }
        int recoveryUP = 0;
        for (IItem item : applyto.getInventory(MapleInventoryType.EQUIPPED)) {
            Equip equip = (Equip) item;
            if (equip.getState() > 1) {
                int[] potential = {equip.getPotential1(), equip.getPotential2(), equip.getPotential3(), equip.getPotential4(), equip.getPotential5()};
                for (Integer id : potential) {
                    if (id > 0) {
                        ItemInformation ii = ItemInformation.getInstance();
                        StructPotentialItem pot = ii.getPotentialInfo(id).get((ii.getReqLevel(equip.getItemId()) / 10) - 1);
                        if (pot != null) {
                            switch (id) {
                                case 30551:
                                case 40551:
                                    recoveryUP += pot.RecoveryUP;
                                    break;
                            }
                        }
                    }
                }
            }
        }
        if (recoveryUP > 0) {
            hpchange += (int) (hpchange / 100) * recoveryUP;
        }
        final List<Pair<PlayerStat, Long>> hpmpupdate = new ArrayList<Pair<PlayerStat, Long>>(2);
        if (hpchange != 0) {
            if (hpchange < 0 && (-hpchange) > stat.getHp() && !applyto.hasDisease(DiseaseStats.ZOMBIFY)) {
                return false;
            }
            stat.setHp(stat.getHp() + hpchange, applyfrom);
            if (sourceid == 2321007) {
                applyfrom.getClient().getSession().writeAndFlush(MainPacketCreator.showSkillEffect(-1, applyfrom.getLevel(), sourceid, level, (byte) 0, 1, null, null));
                applyfrom.getMap().broadcastMessage(MainPacketCreator.showSkillEffect(applyfrom.getId(), applyfrom.getLevel(), sourceid, level, (byte) 0, 1, null, null));
            }
        }
        if (mpchange != 0) {
            if (mpchange < 0 && (-mpchange) > stat.getMp()) {
                return false;
            }
            stat.setMp(stat.getMp() + mpchange);
            hpmpupdate.add(new Pair<PlayerStat, Long>(PlayerStat.MP, Long.valueOf(stat.getMp())));
        }
        hpmpupdate.add(new Pair<PlayerStat, Long>(PlayerStat.HP, Long.valueOf(stat.getHp())));
        applyto.getClient().getSession().writeAndFlush(MainPacketCreator.updatePlayerStats(applyto, hpmpupdate, true, false));
        if (effects.getStats("expinc") != 0) {
            applyto.gainExp(effects.getStats("expinc"), true, true, false);
            applyto.getClient().getSession().writeAndFlush(MainPacketCreator.showSpecialEffect(0x18)); //1.2.251+, (+1)
        } else if (isSpiritClaw()) {
            MapleInventory use = applyto.getInventory(MapleInventoryType.USE);
            IItem item = null;
            int i = 0;
            while (i < use.getSlotLimit()) {
                item = use.getItem((short) i);
                if (item != null) {
                    if ((GameConstants.isBullet(item.getItemId()) || GameConstants.isThrowingStar(item.getItemId())) && item.getQuantity() >= 100) {
                        statups.clear();
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NoBulletConsume, (item.getItemId() % 100) + 1, false));
                        InventoryManipulator.removeFromSlot(applyto.getClient(), MapleInventoryType.USE, (short) i, (short) effects.getStats("bulletConsume"), false, true);
                        break;
                    }
                }
                i++;
            }
        }
        if (isSoulStone()) {
            final Rectangle bounds = calculateBoundingBox(applyfrom.getPosition(), applyfrom.isFacingLeft());
            final List<MapleMapObject> affecteds = applyfrom.getMap().getMapObjectsInRect(bounds, Arrays.asList(MapleMapObjectType.PLAYER));
            final List<MapleCharacter> chrs = new LinkedList<MapleCharacter>();
            if (applyfrom.getParty() != null) {
                for (MapleMapObject mo : affecteds) {
                    MapleCharacter hp = (MapleCharacter) mo;
                    if (hp.getPartyId() == applyfrom.getPartyId()) {
                        chrs.add(hp);
                    }
                }
            }
            for (int i = 0; i < getY(); i++) {
                int rand = Randomizer.nextInt(chrs.size() - 1);
                final MapleCharacter affected = chrs.get(rand);
                applyTo(applyfrom, affected, false, null);
                affected.getClient().getSession().writeAndFlush(MainPacketCreator.showSkillEffect(-1, sourceid, level));
                affected.getMap().broadcastMessage(affected, MainPacketCreator.showSkillEffect(affected.getId(), sourceid, level), false);
                chrs.remove(rand);
            }
            return true;
        } else if (sourceid == 37000006) { //인듀어런스 실드
            statups.clear();
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RWBarrier, effects.getStats("x"), false));
        } else if (sourceid == 11001021 || sourceid == 11121054) { //소드 오브 라이트, 소울 포스 중첩 방지.
            applyfrom.cancelEffect(sourceid == 11001021 ? SkillFactory.getSkill(11121054).getEffect(applyfrom.getSkillLevel(11121054))
                    : SkillFactory.getSkill(11001021).getEffect(applyfrom.getSkillLevel(11001021)), false, -1);
        } else if (sourceid == 37121005) {
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RWBarrierHeal, effects.getStats("x"), false));
        } else if (sourceid == 142110009) { //싸이킥 실드2(왜곡)
            statups.clear();
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_KinesisPsychicShield, effects.getStats("er"), false));
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, effects.getStats("stanceProp"), false));
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndiePDD, effects.getStats("indiePdd"), true));
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieMDD, effects.getStats("indieMdd"), true));
        } else if (sourceid == 101120109) { //이뮨 배리어
            statups.clear();
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ImmuneBarrier, (int) (applyto.getStat().getMaxHp() * (Float.valueOf(effects.getStats("x")) / 100)), false));
        } else if (sourceid == 80001428) { //재생의 룬
            statups.clear();
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DotHealHPPerSecond, applyfrom.getStat().getMaxHp() / 10, false));
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieEXP, effects.getStats("indieExp"), true));
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieAsrR, effects.getStats("indieAsrR"), true));
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieTerR, effects.getStats("indieTerR"), true));
        } else if (sourceid == 21001008) { // 바디 프레셔
            if (applyfrom.getBuffedValue(BuffStats.CTS_BodyPressure) == null) {
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BodyPressure, effects.getStats("x"), false));
            } else {
                return false;
            }
        } else if (sourceid == 5121013) {
            if (applyfrom.getCooldownLimit(5121013) > 0) {
                SkillStatEffect cooltime = SkillFactory.getSkill(5121013).getEffect(applyfrom.getSkillLevel(5121013));
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_NautilusFinalAttack, 1, false));
                this.effects.setStats("time", cooltime.getCooldown() * 1000);
            }
        } else if (sourceid == 2321001) { // 비숍 빅뱅
            if (applyfrom.getCooldownLimit(2321008) > 0 && applyfrom.getBuffedValue(BuffStats.CTS_KeyDownTimeIgnore, 2321001) == null) {
                SkillStatEffect cooltime = SkillFactory.getSkill(2321008).getEffect(applyfrom.getSkillLevel(2321008));
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_KeyDownTimeIgnore, 1, false));
                this.effects.setStats("time", cooltime.getCooldown() * 1000);
            } else {
                return false;
            }
        } else if (sourceid == 22110016) { // 오닉스의 의지
            if (applyfrom.getSkillLevel(22170072) > 0) {
                SkillStatEffect effect = SkillFactory.getSkill(22170072).getEffect(applyfrom.getSkillLevel(22170072));
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Stance, effect.getProb(), false));
            }
        } else if (sourceid == 100001263 || sourceid == 100001264) { //디바인 스위프트, 디바인 포스 중첩 방지.
            applyfrom.cancelEffect(sourceid == 100001263 ? SkillFactory.getSkill(100001264).getEffect(applyfrom.getSkillLevel(100001264)) : SkillFactory.getSkill(100001263).getEffect(applyfrom.getSkillLevel(100001263)), false, -1);
        } else if (sourceid == 11101022 || sourceid == 11111022) { //폴링문, 라이징선 중첩 방지.
            int skillid = sourceid == 11101022 ? 11111022 : 11101022;
            applyfrom.cancelEffect(SkillFactory.getSkill(skillid).getEffect(applyfrom.getSkillLevel(skillid)), false, -1);
        } else if (sourceid == 11121005) { //솔루나 타임
            statups.clear();
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_GlimmeringTime, 1, false));
            int stateskill = applyfrom.getBuffedSkillEffect(BuffStats.CTS_PoseType, -1).getSourceId();
            int skillid = stateskill == 11101022 ? 11121012 : 11121011;
            SkillStatEffect stateeffect = SkillFactory.getSkill(skillid).getEffect(applyfrom.getSkillLevel(sourceid));
            stateeffect.applyTo(applyto);
        } else if (sourceid == 11121011) { //솔루나 타임 : 폴링 문
            statups.clear();
            //크리티컬 확률 #indieCr% 증가, 모든 스킬의 공격 횟수 #x배 증가, 최종 데미지 #y%로 감소
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BuckShot, effects.getStats("x"), false));
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieCr, effects.getStats("indieCr"), true));
        } else if (sourceid == 11121012) {//솔루나 타임 : 라이징 선
            //데미지 #indieDamR% 및 공격 속도 1단계 증가
            statups.clear();
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieBooster, effects.getStats("indieBooster"), true));
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, effects.getStats("indieDamR"), true));
        } else if (sourceid == 5221021) { //퀵 드로우 발동
            statups.clear();
            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_QuickDraw, effects.getStats("damR"), false));
        }
        final SummonMovementType summonMovementType = getSummonMovementType();
        if (sourceid == 32001014 || sourceid == 32100010 || sourceid == 32110017 || sourceid == 32120019) {
            if (applyfrom.deathCount != getX()) {
                pos = null;
            }
        }
        if (summonMovementType != null && pos != null) {
            if (isStaticSummon()) {
                if (sourceid == 5321004) {
                    pos.x -= 100;
                } else if (sourceid == 5320011) {
                    pos.x += 100;
                }
            }
            final MapleSummon tosummon = new MapleSummon(applyfrom, sourceid, pos, summonMovementType, System.currentTimeMillis());
            tosummon.setPosition(pos);

            if (sourceid == 5211014) {
                applyfrom.cancelEffectFromBuffStat(BuffStats.CTS_Stance, 5211014);
            } else if (sourceid == 5321004) { //서포트 몽키 트윈스  기존 소환수 있는지 체크
                applyfrom.cancelEffectFromBuffStat(BuffStats.CTS_Stance, 5320011);
                applyfrom.cancelEffectFromBuffStat(BuffStats.CTS_Stance, 5321004);
            }
            if (sourceid == 20051085) {
                ItemInformation ii = ItemInformation.getInstance();
                ii.getItemEffect(2022746).applyTo(applyto);
            } else if (sourceid == 20051087) {
                ItemInformation ii = ItemInformation.getInstance();
                ii.getItemEffect(2022747).applyTo(applyto);
            }
            if (sourceid == 4341006) {
                applyfrom.cancelEffectFromBuffStat(BuffStats.CTS_ShadowPartner, 4331002);
                for (Pair<Integer, MapleSummon> s : applyfrom.getSummons().values()) {
                    if (s.getRight().getSkill() == sourceid) {
                        s.getRight().removeSummon(applyfrom.getMap());
                        applyfrom.removeSummon(s.getRight().getObjectId());
                    }
                }
            }
            switch (sourceid) {
                case 33001007:
                case 33001008:
                case 33001009:
                case 33001010:
                case 33001011:
                case 33001012:
                case 33001013:
                case 33001014:
                case 33001015:
                    for (Pair<Integer, MapleSummon> s : applyfrom.getSummons().values()) {
                        if (s.getRight().getSkill() >= 33001007 && s.getRight().getSkill() <= 33001015) {
                            s.getRight().removeSummon(applyfrom.getMap());
                            applyfrom.removeSummon(s.getRight().getObjectId());
                        }
                    }
                    break;
            }
            if (sourceid != 14100027 || sourceid != 14110029 || sourceid != 14120008) {
                int Chance = getProb();
                List<MapleSummon> summons = new ArrayList<MapleSummon>();
                if (applyfrom.getMap().countSummonSkill(applyfrom, sourceid) == 1) {
                    if (Randomizer.nextInt(100) < Chance) {
                        applyAtom(applyto, 15);
                        summons.get(Randomizer.nextInt(summons.size())).removeSummon(applyto.getMap());
                    }
                }
            }
            if (sourceid != 35111002) {
                applyfrom.getMap().spawnSummon(tosummon, true, getDuration());
                applyfrom.getSummons().put(tosummon.getObjectId(), new Pair<>(sourceid, tosummon));
            }
            tosummon.addHP(effects.getStats("x"));
            if (sourceid == 5321004) {
                try {
                    SkillFactory.getSkill(5320011).getEffect(applyfrom.getSkillLevel(5320011)).applyTo(applyfrom, applyfrom.getPosition());
                } catch (Exception e) {
                    System.out.println("[오류] 서포트 몽키 트윈스 오류");
                    if (!ServerConstants.realese) {
                        e.printStackTrace();
                    }
                }
            }
            if (sourceid == 3111005) { //피닉스
                try {
                    if (applyfrom.getSkillLevel(3120006) > 0) { //스피릿 링크
                        SkillFactory.getSkill(3120006).getEffect(applyfrom.getSkillLevel(3120006)).applyTo(applyfrom, applyfrom.getPosition());
                    }
                } catch (Exception e) {
                    System.out.println("[오류] 서포트 몽키 트윈스 오류");
                    if (!ServerConstants.realese) {
                        e.printStackTrace();
                    }
                }
            }
            if (sourceid == 3211005) { //프리져
                try {
                    if (applyfrom.getSkillLevel(3220005) > 0) { //스피릿 링크
                        SkillFactory.getSkill(3220005).getEffect(applyfrom.getSkillLevel(3220005)).applyTo(applyfrom, applyfrom.getPosition());
                    }
                } catch (Exception e) {
                    System.out.println("[오류] 서포트 몽키 트윈스 오류");
                    if (!ServerConstants.realese) {
                        e.printStackTrace();
                    }
                }
            }
            if (getSkillStats().getStats("selfDestruction") > 0) {
                applyto.getMines().add(tosummon);
            }
//            if (applyfrom.isGM()) {
//                applyfrom.Message("SkillID : " + sourceid + " Pos : X : " + pos.x + " Y : " + pos.y + " OID : " + tosummon.getObjectId());
//            }
        }

        boolean hasBuffLonger = false;
        /*for (InnerSkillValueHolder isvh : applyfrom.getInnerSkills()) {
            if (isvh.getSkillId() == 70000048) {
                hasBuffLonger = true;
                break;
            }
        }*/
        if (hasBuffLonger) {
            int rate = SkillFactory.getSkill(70000048).getEffect(applyfrom.getSkillLevel(70000048)).getSkillStats().getStats("bufftimeR");
            effects.setStats("time", getDuration() + (int) (getDuration() * (rate / 100.0D)));
        }

        if (overTime && !isEnergyCharge()) {
            applyBuffEffect(applyfrom, applyto, primary, false);
        }

        if (primary) {
            if (overTime || isHeal() && !isEnergyCharge()) {
                applyBuff(applyfrom);
            }
            if (isMonsterBuff()) {
                applyMonsterBuff(applyfrom);
            }
        }

        if (sourceid == 35121003) {
            applyfrom.getClient().getSession().writeAndFlush(MainPacketCreator.resetActions()); //doubt we need this at all
        }
        if (isMagicDoor()) {
            MapleMap map = applyto.getMap();
            for (MapleMapObject obj : map.getAllDoor()) {
                MapleDoor door = ((MapleDoor) obj);
                if (door.getOwner().getId() == applyto.getId()) {
                    map.removeMapObject(obj);
                }
            }
            MapleDoor door = new MapleDoor(applyto, new Point(pos == null ? applyto.getTruePosition() : pos));
            if (door.getTownPortal() != null) {
                applyto.getMap().spawnDoor(door);
                applyto.addDoor(door);

                MapleDoor townDoor = new MapleDoor(door);
                door.getTown().spawnDoor(townDoor);
                applyto.addDoor(townDoor);

                if (applyto.getParty() != null) { // update town doors
                    applyto.silentPartyUpdate();
                }
            }
        } else if (isMechDoor()) { // 오픈 게이트
            int newId = 0;
            boolean applyBuff = false;
            if (applyto.getMechDoors().size() >= 2) {
                final MapleMechDoor remove = applyto.getMechDoors().remove(0);
                newId = remove.getId();
                applyto.getMap().broadcastMessage(MechanicSkill.mechDoorRemove(remove, true));
                applyto.getMap().removeMapObject(remove);
            } else {
                for (MapleMechDoor p : applyto.getMechDoors()) {
                    if (p.getId() == newId) {
                        applyBuff = true;
                        newId = 1;
                        break;
                    }
                }
            }
            final MapleMechDoor door = new MapleMechDoor(applyto, new Point(pos == null ? applyto.getTruePosition() : pos), newId);
            applyto.getMap().spawnMechDoor(door);
            applyto.addMechDoor(door);
            if (applyto.getMechDoors().size() >= 1) {
                applyto.getMap().removeMechDoor(door);
            }
            if (!applyBuff) {
                return true;
            }
        } else if (isMist()) {
            try {
                final Rectangle bounds = calculateBoundingBox(pos != null ? pos : applyfrom.getPosition(), applyfrom.isFacingLeft());
                final MapleMist mist = new MapleMist(bounds, applyfrom, this, effects.getLevel(), pos == null ? applyto.getPosition() : pos);
                applyfrom.getMap().spawnMist(mist, getDuration(), isMistPoison(), false, isRecovery(), isBurningRegion(), isTimeCapsule(), false, isAran());
                applyfrom.dropMessage(6, "스폰 미스트 발동 유지시간 : " + getDuration() + "초");
                if (isTimeCapsule()) {
                    applyfrom.send(MainPacketCreator.TimeCapsule());
                    applyfrom.setChairText(null);
                    applyfrom.setChair(3010587);
                    applyfrom.getMap().broadcastMessage(applyfrom, MainPacketCreator.showChair(applyfrom.getId(), applyfrom.getChair(), applyfrom.getChairText()), false);
                }
            } catch (Exception ex) {
                ex.printStackTrace();
            }
        } else if (isTimeLeap() || isTimeHolding()) { // Time Leap & 타임 홀딩
            for (MapleCoolDownValueHolder i : applyto.getAllCooldowns()) {
                if (i.skillId != sourceid) {
                    applyto.removeCooldown(i.skillId);
                    applyto.getClient().getSession().writeAndFlush(MainPacketCreator.skillCooldown(i.skillId, 0, applyto.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, applyto.getBuffedValue(BuffStats.CTS_FixCoolTime) != null, applyto.isGM()));
                }
            }
        } else if (isMagicCrash()) { //매직 크래쉬
            final Rectangle bounds = calculateBoundingBox(pos != null ? pos : applyfrom.getPosition(), applyfrom.isFacingLeft());
            int i = 0;
            List<MonsterStatus> cancel = new ArrayList<MonsterStatus>();
            cancel.add(MonsterStatus.WEAPON_DEFENSE_UP);
            cancel.add(MonsterStatus.MAGIC_DEFENSE_UP);
            cancel.add(MonsterStatus.WEAPON_ATTACK_UP);
            cancel.add(MonsterStatus.MAGIC_ATTACK_UP);
            cancel.add(MonsterStatus.MAGIC_IMMUNITY);
            cancel.add(MonsterStatus.WEAPON_IMMUNITY);
            for (MapleMapObject hmo : applyfrom.getMap().getMapObjectsInRect(bounds, Collections.singletonList(MapleMapObjectType.MONSTER))) {
                if (i >= 10) {
                    break;
                }
                if (makeChanceResult()) {
                    MapleMonster mob = (MapleMonster) hmo;
                    try {
                        MonsterStatusEffect mobeff = new MonsterStatusEffect(Collections.singletonMap(MonsterStatus.MAGIC_CRASH, 1), SkillFactory.getSkill(sourceid), level, null, false);
                        mob.applyStatus(applyfrom, mobeff, getStatusDuration());
                    } catch (Exception e) {
                        if (!ServerConstants.realese) {
                            e.printStackTrace();
                        }
                    }
                    for (MonsterStatus statlulz : cancel) {
                        mob.cancelStatus(statlulz);
                    }
                }
                ++i;
            }

        } else if (isInfinity()) {
            applyto.startInfinityRegen(this, alchemistModifyVal(applyto, effects.getStats("time"), false));
        } else if (isExceed(sourceid)) { // 익시드 스킬시전시 버프지급
            int count = applyto.getStat().getDemonCount();
            int overload = applyto.getStat().getOverLoad();
            final List<Triple<BuffStats, Integer, Boolean>> DemonE = Collections.singletonList(new Triple<>(BuffStats.CTS_OverloadCount, effects.getStats("x"), false));
            final List<Triple<BuffStats, Integer, Boolean>> DemonS = Collections.singletonList(new Triple<>(BuffStats.CTS_Exceed, count, false));
            //applyto.send(SkillPacketCreator.giveDemonAvengerExceed(30010230, overload, DemonE));
            //applyto.send(SkillPacketCreator.giveExceedSkill(sourceid, 10000, DemonS));
            if (overload != 21) {
                applyto.getStat().addOverLoad(1);
            } else {
                applyto.getStat().setOverLoad(20);
            }
            if (count != 5) {
                applyto.getStat().addDemonCount(1);
            } else {
                applyto.getStat().setDemonCount(0);
            }
        } else if (sourceid == 1211010) { //리스토네이션
            int recover = (int) (applyto.getStat().getCurrentMaxHp() * (getX() / 100.0D));
            applyto.addHP(recover);
        } else if (sourceid == 1281) { // 리턴 투 메이플 (모험가)
            if (applyto.getEventInstance() == null) {
                MapleMap map = applyto.getClient().getChannelServer().getMapFactory().getMap(20000);
                applyto.changeMap(map, map.getPortal(0));
            } else {
                applyto.dropMessage(5, "이곳에서는 사용할 수 없습니다.");
            }
        } else if (sourceid == 10001245) { // 져지홈 (시그너스)
            if (applyto.getEventInstance() == null) {
                MapleMap map = applyto.getClient().getChannelServer().getMapFactory().getMap(130000000);
                applyto.changeMap(map, map.getPortal(0));
            } else {
                applyto.dropMessage(5, "이곳에서는 사용할 수 없습니다.");
            }
        } else if (sourceid == 20031203) { // 리턴 오브 팬텀 (팬텀)
            if (applyto.getEventInstance() == null) {
                MapleMap map = applyto.getClient().getChannelServer().getMapFactory().getMap(150000000);
                applyto.changeMap(map, map.getPortal(0));
            } else {
                applyto.dropMessage(5, "이곳에서는 사용할 수 없습니다.");
            }
        } else if (sourceid == 100001262) { // 리트레이스 템플 (제로)
            if (applyto.getEventInstance() == null) {
                MapleMap map = applyto.getClient().getChannelServer().getMapFactory().getMap(320000000);
                applyto.changeMap(map, map.getPortal(0));
            } else {
                applyto.dropMessage(5, "이곳에서는 사용할 수 없습니다.");
            }
        } else if (sourceid == 2311009) { //홀리 매직쉘
            if (applyto.getKeyValue("HolyMagicShell_lastReceived") == null) {
                applyto.setKeyValue("HolyMagicShell_lastReceived", System.currentTimeMillis() + "");
            }
            applyto.getStat().setHp((int) (applyto.getStat().getCurrentMaxHp() * (getSkillStats().getStats("z")) / 100.0D), applyto);
        } else if (sourceid >= 80001034 && sourceid <= 80001036) {
            applyto.getStat().addSaintSaver(-applyto.getStat().getSaintSaver());
        } else if (isSoulSkill()) {
            Equip weapon = (Equip) (applyto.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -11));
            File source = new File("property/wz/Skill.wz");
            MapleDataProvider sourceData;
            sourceData = MapleDataProviderFactory.getDataProvider(source);
            MapleData dd = sourceData.getData(String.valueOf(sourceid).substring(0, 5) + ".img");
            final int ReqSoul = MapleDataTool.getIntConvert(dd.getChildByPath("skill/" + weapon.getSoulSkill() + "/common/soulmpCon"));
            applyto.setSoulCount((short) (applyto.getSoulCount() - ReqSoul));
            if (applyto.getSoulCount() < ReqSoul) {
                SkillStatEffect eff = applyto.getBuffedSkillEffect(BuffStats.CTS_FullSoulMP);
                if (eff != null) {
                    applyto.cancelEffect(eff, false, applyto.getBuffedStarttime(BuffStats.CTS_FullSoulMP, eff.getSourceId()));
                }
            }
        }
        return true;
    }

    public final boolean applyReturnScroll(final MapleCharacter applyto) { // 치우씨 :: 마을 귀환 주문서 서버화
        if (applyto.getMapId() != ServerConstants.mainMap) {
            MapleMap home;
            home = applyto.getClient().getChannelServer().getMapFactory().getMap(ServerConstants.mainMap);
            applyto.changeMap(home, home.getPortal(0));
            return true;
        }
        //MapleMap test;
        //test = ChannelServer.getInstance(applyto.getClient().getChannel()).getMapFactory().getMap(effects.getStats("moveTo"));
        //applyto.dropMessage(5, "MoveTo Value : " + effects.getStats("moveTo"));
        //applyto.dropMessage(5, "target value : " + test.getId());
        applyto.dropMessage(5, "you are already in town");
        return false;
    }

    /*public final boolean applyReturnScroll(final MapleCharacter applyto) { // 치우씨 :: 마을 귀환 주문서 원본 소스
        if (effects.getStats("moveTo") != -1) {
            if (applyto.getMap().getReturnMapId() != applyto.getMapId()) {
                MapleMap target;
                if (effects.getStats("moveTo") == 999999999) {
                    target = applyto.getMap().getReturnMap();
                } else {
                    target = ChannelServer.getInstance(applyto.getClient().getChannel()).getMapFactory().getMap(effects.getStats("moveTo"));
                    if (target.getId() / 10000000 != 60 && applyto.getMapId() / 10000000 != 61) {
                        if (target.getId() / 10000000 != 21 && applyto.getMapId() / 10000000 != 20) {
                            if (target.getId() / 10000000 != applyto.getMapId() / 10000000) {
                                return false;
                            }
                        }
                    }
                }
                applyto.changeMap(target, target.getPortal(0));
                return true;
            }
        }
        return false;
    }*/
    private final void applyBuff(final MapleCharacter applyfrom) {
        if (isPartyBuff() && (applyfrom.getParty() != null || isGmBuff())) {
            final Rectangle bounds = calculateBoundingBox(applyfrom.getPosition(), applyfrom.isFacingLeft());
            final List<MapleMapObject> affecteds = applyfrom.getMap().getMapObjectsInRect(bounds, Arrays.asList(MapleMapObjectType.PLAYER));

            for (final MapleMapObject affectedmo : affecteds) {
                final MapleCharacter affected = (MapleCharacter) affectedmo;
                if (affected != applyfrom && (isGmBuff() || applyfrom.getParty().equals(affected.getParty()))) {
                    if ((isResurrection() && !affected.isAlive()) || (!isResurrection() && affected.isAlive())) {
                        if (sourceid == 2311009) { //홀리 매직쉘 30초 보호막 적용 불가
                            if (affected.getKeyValue("HolyMagicShell_lastReceived") != null) {
                                long lasttime = Long.parseLong(affected.getKeyValue("HolyMagicShell_lastReceived"));
                                if (lasttime + (getY() * 1000) > System.currentTimeMillis()) {
                                    continue;
                                } else {
                                    affected.setKeyValue("HolyMagicShell_lastReceived", null);
                                }
                            }
                            affected.setKeyValue2("HolyMagicShellLifeCount", getX());
                        }
                        applyTo(applyfrom, affected, false, null);
                        affected.getClient().getSession().writeAndFlush(MainPacketCreator.showSkillEffect(-1, sourceid, level));
                        affected.getMap().broadcastMessage(affected, MainPacketCreator.showSkillEffect(affected.getId(), sourceid, level), false);
                    }
                    if (isTimeLeap()) {
                        for (MapleCoolDownValueHolder i : affected.getAllCooldowns()) {
                            if (i.skillId != 5121010) {
                                affected.removeCooldown(i.skillId);
                                affected.getClient().getSession().writeAndFlush(MainPacketCreator.skillCooldown(i.skillId, 0, affected.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, affected.getBuffedValue(BuffStats.CTS_FixCoolTime) != null, affected.isGM()));
                            }
                        }
                    }
                }
            }
        }
    }

    public final void applyMonsterBuff(final MapleCharacter applyfrom) {
        final Rectangle bounds = calculateBoundingBox(applyfrom.getPosition(), applyfrom.isFacingLeft());
        final List<MapleMapObject> affected = sourceid == 35111005 ? applyfrom.getMap().getMapObjectsInRange(applyfrom.getPosition(), Double.POSITIVE_INFINITY, Arrays.asList(MapleMapObjectType.MONSTER)) : applyfrom.getMap().getMapObjectsInRect(bounds, Arrays.asList(MapleMapObjectType.MONSTER));
        int i = 0;
        for (final MapleMapObject mo : affected) {
            if (makeChanceResult()) {
                MapleMonster mons = (MapleMonster) mo;
                if (sourceid == 35111005 && mons.getStats().isBoss()) {
                    break;
                }
                ((MapleMonster) mo).applyStatus(applyfrom, new MonsterStatusEffect(getMonsterStati(), SkillFactory.getSkill(sourceid), applyfrom.getSkillLevel(sourceid), null, false), getStatusDuration());
            }
            i++;
            if (i >= effects.getStats("mobCount") && sourceid != 35111005) {
                break;
            }
        }
    }

    public final void applyAtom(final MapleCharacter applyfrom, final int type) {
        final Rectangle bounds = calculateBoundingBox(applyfrom.getPosition(), applyfrom.isFacingLeft());
        int i = 0;
        for (final MapleMapObject object : applyfrom.getMap().getMapObjectsInRect(bounds, Arrays.asList(MapleMapObjectType.MONSTER))) {
            switch (type) {
                case 10:
                    applyfrom.getMap().broadcastMessage(MainPacketCreator.giveMagicArrow(applyfrom, (MapleMonster) object), applyfrom.getPosition());
                    break;
                case 8:
                    applyfrom.getMap().broadcastMessage(MainPacketCreator.StormBlinger(applyfrom, (MapleMonster) object), applyfrom.getPosition());
                    break;
                case 4:
                    applyfrom.getMap().broadcastMessage(MainPacketCreator.ShieldChacingRe(applyfrom.getId(), object.getObjectId(), i, sourceid, level));
                    break;
                case 7:
                    int count = 0;
                    if (sourceid == 13120003) { // 여기서 count 가 트라이플링 웜의 갯수 (By.플랜더스)
                        count = Randomizer.rand(1, 5);
                    } else if (sourceid == 13110022) {
                        count = Randomizer.rand(1, 4);
                    } else if (sourceid == 13100022) {
                        count = Randomizer.rand(1, 3);
                    }
                    applyfrom.getMap().broadcastMessage(MainPacketCreator.TrifleWorm(applyfrom.getId(), sourceid, count, object.getObjectId(), 1));
                    break;
                case 3:
                    applyfrom.getMap().broadcastMessage(AngelicBusterSkill.SoulSeeker(applyfrom, 0, 1, object.getObjectId(), 0));
                    break;
                case 22:
                    applyfrom.getMap().broadcastMessage(MainPacketCreator.KinesisAtom(applyfrom.getId(), object.getObjectId(), i, sourceid, level));
                    break;
            }
            i++;
            if (i >= effects.getStats("mobCount")) {
                break;
            }
        }
    }

    public final void applyToDamageReversing(final MapleCharacter applyto, final long damage) {
        statups.clear();
        statups.add(new Triple<>(BuffStats.CTS_PowerTransferGauge, (int) (damage / effects.getStats("y")), false));
        int localDuration = effects.getStats("time");
        if (localDuration < 0) {
            localDuration = Integer.MAX_VALUE;
        }
        if (SkillFactory.getSkill(sourceid).notCancel()) {
            localDuration = Integer.MAX_VALUE;
        }
        applyto.cancelEffect(this, true, -1);
        if (statups.size() > 0 && !isSummon()) {
            long overlap_magic = (long) (System.currentTimeMillis() % 1000000000);
            Map<BuffStats, List<StackedSkillEntry>> stacked = applyto.getStackSkills();
            for (Triple<BuffStats, Integer, Boolean> statup : statups) {
                if (statup.getThird()) {
                    if (!stacked.containsKey(statup.getFirst())) {
                        stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                    }
                    stacked.get(statup.getFirst()).add(new StackedSkillEntry(skill ? getSourceId() : -getSourceId(), statup.getSecond(), overlap_magic, localDuration));
                }
            }
            applyto.getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff((skill ? sourceid : -sourceid), localDuration, statups, this, stacked, SkillFactory.getSkill(sourceid).getAnimationTime(), applyto));
        }
        final long starttime = System.currentTimeMillis();
        final CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
        final ScheduledFuture<?> schedule = tools.Timer.BuffTimer.getInstance().schedule(cancelAction, ((starttime + localDuration) - System.currentTimeMillis()));
        applyto.registerEffect(this, starttime, schedule);
        applyto.refreshMaxHpMp();
        if (sourceid != 5001005) {
            applyto.getMap().broadcastMessage(applyto, MainPacketCreator.giveForeignBuff(applyto, statups), false);
        }
    }

    public final Rectangle calculateBoundingBox(final Point posFrom, final boolean facingLeft) {
        return calculateBoundingBox(posFrom, facingLeft, lt, rb, effects.getStats("range"));
    }

    public static Rectangle calculateBoundingBox(final Point posFrom, final boolean facingLeft, final Point lt, final Point rb, final int range) {
        if (lt == null || rb == null) {
            return new Rectangle((facingLeft ? (-200 - range) : 0) + posFrom.x, (-100 - range) + posFrom.y, 200 + range, 100 + range);
        }
        Point mylt;
        Point myrb;
        if (facingLeft) {
            mylt = new Point(lt.x + posFrom.x - range, lt.y + posFrom.y);
            myrb = new Point(rb.x + posFrom.x, rb.y + posFrom.y);
        } else {
            myrb = new Point(lt.x * -1 + posFrom.x + range, rb.y + posFrom.y);
            mylt = new Point(rb.x * -1 + posFrom.x, lt.y + posFrom.y);
        }
        return new Rectangle(mylt.x, mylt.y, myrb.x - mylt.x, myrb.y - mylt.y);
    }

    public final void silentApplyBuff(final MapleCharacter chr, final long starttime) {
        final int localDuration = effects.getStats("time");
        if (((starttime + localDuration) - System.currentTimeMillis()) > 0) {
            int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
            Map<BuffStats, List<StackedSkillEntry>> stacked = chr.getStackSkills();
            for (Triple<BuffStats, Integer, Boolean> statup : statups) {
                if (statup.getThird()) {
                    if (!stacked.containsKey(statup.getFirst())) {
                        stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                    }
                    stacked.get(statup.getFirst()).add(new StackedSkillEntry(skill ? getSourceId() : -getSourceId(), statup.getSecond(), overlap_magic,
                            (int) (((starttime + localDuration) - System.currentTimeMillis()) / 1000)));
                }
            }
            chr.cancelEffect(this, true, -1);
            final CancelEffectAction cancelAction = new CancelEffectAction(chr, this, starttime);
            final ScheduledFuture<?> schedule = tools.Timer.BuffTimer.getInstance().schedule(cancelAction, ((starttime + localDuration) - System.currentTimeMillis()));
            chr.registerEffect(this, starttime, schedule);
            final SummonMovementType summonMovementType = getSummonMovementType();
            if (summonMovementType != null) {
                final MapleSummon tosummon = new MapleSummon(chr, sourceid, chr.getPosition(), summonMovementType, starttime);
                if (!tosummon.isStaticSummon()) {
                    chr.getMap().spawnSummon(tosummon, true, getDuration());
                    chr.getSummons().put(tosummon.getObjectId(), new Pair<>(sourceid, tosummon));
                    tosummon.addHP(getX());
                }
            }
        }
    }

    public void applySunfireBuff(final MapleCharacter applyto, boolean used, int attackSkill) {
        final int localDuration = 21000000;
        final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Larkness, 1, false));
        final long startTime = System.currentTimeMillis();
        if (used && (applyto.getBuffedValue(BuffStats.CTS_Larkness) != null && applyto.getBuffedValue(BuffStats.CTS_Larkness) == 20040216)) {
            if (GameConstants.isLightSkills(attackSkill)) {
                applyto.send(MainPacketCreator.checkSunfireSkill(applyto.addMinusOfGlassCTS_Morph(GameConstants.isLightSkillsGaugeCheck(attackSkill))));
            }
        } else if (GameConstants.isDarkSkills(attackSkill)) {
            applyto.send(MainPacketCreator.giveSunfireBuff(stat, 10000, effects.getStats("time")));
            applyto.send(MainPacketCreator.checkSunfireSkill(9999));
            applyto.cancelEffect(this, true, -1);
            applyto.registerEffect(this, startTime, null);
            applyto.setBuffedValue(BuffStats.CTS_Larkness, -1, 20040216);
        }
    }

    public void applyEclipseBuff(final MapleCharacter applyto, boolean used, int attackSkill) {
        final int localDuration = 21000000;
        final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Larkness, 100, false));
        final long startTime = System.currentTimeMillis();

        if (used && (applyto.getBuffedValue(BuffStats.CTS_Larkness) != null && applyto.getBuffedValue(BuffStats.CTS_Larkness) == 20040217)) {
            if (GameConstants.isDarkSkills(attackSkill)) {
                applyto.send(MainPacketCreator.checkEclipseSkill(applyto.addPlusOfGlassCTS_Morph(GameConstants.isDarkSkillsGaugeCheck(attackSkill))));
            }
        } else if (GameConstants.isLightSkills(attackSkill)) {
            applyto.send(MainPacketCreator.giveEclipseBuff(stat, -1, effects.getStats("time")));
            applyto.send(MainPacketCreator.checkEclipseSkill(1));
            applyto.cancelEffect(this, true, -1);
            applyto.registerEffect(this, startTime, null);
            applyto.setBuffedValue(BuffStats.CTS_Larkness, -1, 20040217);
        }
    }

    public void applyequilibriumBuff(final MapleCharacter applyto, boolean sunfire) {
        final long startTime = System.currentTimeMillis();
        if (sunfire) {
            applyto.send(MainPacketCreator.giveEquilibriumBuff(20040220, 20040216, 20040217));
            applyto.send(MainPacketCreator.checkSunfireSkill(1));
            applyto.setBuffedValue(BuffStats.CTS_Larkness, -1, 20040219);
        } else {
            applyto.send(MainPacketCreator.giveEquilibriumBuff(20040219, 20040217, 20040216));
            applyto.send(MainPacketCreator.checkEclipseSkill(1));
            applyto.setBuffedValue(BuffStats.CTS_Larkness, -1, 20040218);
        }
        //applyto.cancelEffect(this, true, -1);
        final long starttime = System.currentTimeMillis();
        final CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
        final ScheduledFuture<?> schedule = BuffTimer.getInstance().schedule(cancelAction, ((starttime + 15000) - System.currentTimeMillis()));
        applyto.registerEffect(this, startTime, schedule);
    }

    public final void applyBuffEffectz(final MapleCharacter applyfrom, final MapleCharacter applyto, final boolean primary, final boolean lightCharge) {
        this.applyBuffEffect(applyfrom, applyto, primary, lightCharge);
    }

    private final void applyBuffEffect(final MapleCharacter applyfrom, final MapleCharacter applyto, final boolean primary, final boolean lightCharge) { // 치우씨 :: '알수없는오류로 스킬사용에 실패하였습니다' 라이딩 오류
        if (sourceid == 5311005) {
            final int DoubleDice = applyto.getSkillLevel(SkillFactory.getSkill(5320007));
            if (DoubleDice > 0) {
                setSourceId(5320007);
            }
        } else if (sourceid == 5301003) {
            final int HyperMonkey = applyto.getSkillLevel(SkillFactory.getSkill(5320008));
            if (HyperMonkey > 0) {
                setSourceId(5320008);
            }
        }
        int localDuration = effects.getStats("time");
        boolean normal = true;
        switch (sourceid) {
            case 5111007:
            case 5120012:
            case 5211007:
            case 5220014:
            case 35111013:
            case 35120014: //double lucky
            case 15111011:
            case 5311005:
            case 5320007: {
                int diceid = 0;
                int doublediceid = 0;
                int rand1 = 0, rand2 = 0;
                if (isDoubleDice(sourceid) && makeChanceResult()) {
                    rand1 = Randomizer.rand(1, 6);
                    rand2 = Randomizer.rand(1, 6);
                    doublediceid |= rand1 >> 4;
                    doublediceid |= rand2;
                } else {
                    diceid = Randomizer.rand(1, 6);
                }
                if (doublediceid > 0) {
                    applyto.getMap().broadcastMessage(applyto, MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand1, level, true, false), false);
                    applyto.getMap().broadcastMessage(applyto, MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand2, level, true, true), false);
                    applyto.getClient().getSession().writeAndFlush(MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand1, level, false, false));
                    applyto.getClient().getSession().writeAndFlush(MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand2, level, false, true));
                    if (rand1 == 1 && rand2 == 1) {
                        applyto.dropMessage(5, "더블 럭키 다이스 스킬이 [" + rand2 + "], [" + rand1 + "] 이 나와 아무런 효과를 받지 못했습니다.");
                        return;
                    } else if (rand1 == 1) {
                        applyto.dropMessage(5, "더블 럭키 다이스 스킬이 [" + rand2 + "] 번 효과를 발동 시켰습니다.");
                    } else if (rand2 == 1) {
                        applyto.dropMessage(5, "더블 럭키 다이스 스킬이 [" + rand1 + "] 번 효과를 발동 시켰습니다.");
                    } else {
                        applyto.dropMessage(5, "더블 럭키 다이스 스킬이 [" + rand2 + "], [" + rand1 + "] 번 효과를 발동 시켰습니다.");
                    }
                    final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Dice, doublediceid, false));
                    applyto.getClient().getSession().writeAndFlush(MainPacketCreator.giveDoubleDice(doublediceid, sourceid, localDuration, stat));
                } else {
                    int tempsource = sourceid == 5320007 ? 5311005 : sourceid == 5220014 ? 5211007 : sourceid == 5120012 ? 5111007 : sourceid;
                    applyto.getMap().broadcastMessage(applyto, MainPacketCreator.showRandBuffEffect(applyto.getId(), tempsource, diceid, level, true, false), false);
                    applyto.getClient().getSession().writeAndFlush(MainPacketCreator.showRandBuffEffect(applyto.getId(), tempsource, diceid, level, false, false));
                    if (diceid <= 1) {
                        applyto.dropMessage(5, "럭키 다이스 스킬이 [1] 이 나와 아무런 효과를 받지 못했습니다.");
                        return;
                    }
                    final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Dice, Integer.valueOf(diceid), false));
                    applyto.getClient().getSession().writeAndFlush(MainPacketCreator.giveDice(diceid, tempsource, localDuration, stat));
                    applyto.dropMessage(5, "럭키 다이스 스킬이 [" + diceid + "] 번 효과를 발동 시켰습니다.");
                }
                normal = false;
                break;
            }
            case 5311004: {
                int Oakid = Randomizer.rand(1, 4);
                applyto.getMap().broadcastMessage(applyto, MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, Oakid, 0, true, false), false);
                applyto.getClient().getSession().writeAndFlush(MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, Oakid, 0, false, false));
                final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Roulette, Oakid, false));
                this.statups = stat;
                int overlap_magic = (int) (System.currentTimeMillis() % 1000000000);
                Map<BuffStats, List<StackedSkillEntry>> stacked = applyto.getStackSkills();
                for (Triple<BuffStats, Integer, Boolean> statup : stat) {
                    if (statup.getThird()) {
                        if (!stacked.containsKey(statup.getFirst())) {
                            stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                        }
                        stacked.get(statup.getFirst()).add(new StackedSkillEntry(getSourceId(), statup.getSecond(), overlap_magic, localDuration));
                    }
                }
                applyto.getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(sourceid, localDuration, stat, this, stacked, SkillFactory.getSkill(sourceid).getAnimationTime(), applyto));
                normal = false;
                break;
            }
            case 3101009: { // 퀴버 카트리지
                if (applyto.quiver && applyto.quivermode < 3) {
                    applyto.quivermode += 1;
                } else {
                    if (!applyto.quiver) {
                        applyto.quivercount[0] += applyto.getSkillLevel(3121016);
                        applyto.quivercount[1] += applyto.getSkillLevel(3121016);
                        applyto.quivercount[2] += applyto.getSkillLevel(3121016) * 3;
                    }
                    applyto.quiver = true;
                    applyto.quivermode = 1;
                }
                applyto.getClient().getSession().writeAndFlush(UIPacket.showWZEffect("Skill/310.img/skill/3101009/mode/" + (applyto.quivermode - 1), 1));
                applyto.getClient().getSession().writeAndFlush(UIPacket.showWZEffect("Skill/310.img/skill/3101009/modeStatus/" + (applyto.quivermode - 1) + "/" + (applyto.quivercount[applyto.quivermode - 1] * 1), 1));
                applyto.getMap().broadcastMessage(applyto, UIPacket.broadcastWZEffect(applyto.getId(), "Skill/310.img/skill/3101009/mode/" + (applyto.quivermode - 1), 1), applyto.getPosition());
                applyto.getMap().broadcastMessage(applyto, UIPacket.broadcastWZEffect(applyto.getId(), "Skill/310.img/skill/3101009/modeStatus/" + (applyto.quivercount[applyto.quivermode - 1] * 1), 1), applyto.getPosition());
                statups.clear();
                statups.add(new Triple<>(BuffStats.CTS_QuiverCatridge, (applyto.quivercount[0] * 10000) + (applyto.quivercount[1] * 100) + (applyto.quivercount[2] * 1), false));
                break;
            }
            case 60001216:   //리셔플스위치 : 방어모드
            case 60001217: { //리셔플스위치 : 공격 모드
                if (applyto.getBuffedValue(BuffStats.CTS_ReshuffleSwitch) != null) {
                    if (applyto.getSkillLevel(60001216) > 0) {
                        applyto.cancelEffectFromBuffStat(BuffStats.CTS_ReshuffleSwitch, 60001217);
                    }
                    if (applyto.getSkillLevel(60001217) > 0) {
                        applyto.cancelEffectFromBuffStat(BuffStats.CTS_ReshuffleSwitch, 60001216);
                    }
                }
                break;
            }
            // 윌 오브 소드
            case 61101002:
            case 61110211:
            case 61120007:
            case 61121217: {
                if (applyto.getCooldownLimit(61101002) == 0) {
                    SkillStatEffect effect = SkillFactory.getSkill(61101002).getEffect(applyfrom.getSkillLevel(61101002));
                    applyto.send(MainPacketCreator.skillCooldown(61101002, effect.getCooldown(), applyto.getBuffedValue(BuffStats.CTS_StrikerHyperElectric) != null, applyto.getBuffedValue(BuffStats.CTS_FixCoolTime) != null, applyto.isGM()));
                    //applyto.addCooldown(61101002, System.currentTimeMillis(), effect.getCooldown());
                }
                break;
            }
            case 61111008:   // 파이널 피규레이션 (3차)
            case 61120008:
            case 61121053: { // 파이널 피규레이션 (4차)
                if (applyto.getJob() == 6112 && sourceid == 61111008) {
                    if (applyto.getSkillLevel(61120007) < 0) {
                        applyto.changeSkillLevel(61120007, (byte) 30, (byte) 30);
                    }
                    SkillFactory.getSkill(61120008).getEffect(applyto.getSkillLevel(61111008)).applyTo(applyto);
                    return;
                }
                applyto.isFinalFiguration = true;
                applyto.changeKaiserTransformKey();
                applyto.getStat().setCTS_Morph(0);
                applyto.getClient().send(KaiserSkill.giveCTS_MorphGauge(applyto.getStat().addCTS_Morph(0)));
                if (applyto.getBuffedValue(BuffStats.CTS_StopForceAtomInfo) != null) {
                    applyto.cancelEffectFromBuffStat(BuffStats.CTS_StopForceAtomInfo, -1);
                    if (sourceid == 61120008 || sourceid == 61121053) {
                        SkillFactory.getSkill(61121217).getEffect(applyto.getSkillLevel(61120007)).applyTo(applyto);
                    } else {
                        SkillFactory.getSkill(61110211).getEffect(applyto.getSkillLevel(61101002)).applyTo(applyto);
                    }
                }
                break;
            }
            case 2320011:
            case 2220010:
            case 2120010:
                applyto.send(MainPacketCreator.giveArcane(sourceid, getSkillStats().getStats("x") * applyto.acaneAim, applyto.getAllLinkMid(), localDuration));
                normal = false;
                break;
            case 1211006: //라이트닝 차지 이외
            case 1211004:
            case 1221004:
                List<Triple<BuffStats, Integer, Boolean>> statt = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_WeaponCharge, 1, false));
                if (applyto.getBuffedValue(BuffStats.CTS_WeaponCharge) != null && applyto.getBuffedValue(BuffStats.CTS_WeaponCharge, 1211008) != null) {
                    applyto.cancelEffectFromBuffStat(BuffStats.CTS_WeaponCharge, -1);
                    SkillFactory.getSkill(1211008).getEffect(applyto.getSkillLevel(1211008)).applyBuffEffect(applyto, applyto, primary, true);
                }
                break;
            case 11121054: { //소울 포지
                final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_LightOfSpirit, (sourceid == 11001021 ? 1 : 2), false));
                if (!applyto.isHidden()) {
                    applyto.getMap().broadcastMessage(applyto, MainPacketCreator.giveForeignBuff(applyto, stat), false);
                    break;
                }
                break;
            }

            case 4111002: // 쉐도우 파트너
            case 4211008: // 쉐도우 파트너
            case 36111006: {//버추얼 프로젝션
                final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ShadowPartner, 1, false));
                if (!applyto.isHidden()) {
                    applyto.getMap().broadcastMessage(applyto, MainPacketCreator.giveForeignBuff(applyto, stat), false);
                    break;
                }
                break;
            }
            case 1211008: //라이트닝 차지
                if ((applyto.getBuffedValue(BuffStats.CTS_WeaponCharge) != null && applyto.getBuffedValue(BuffStats.CTS_WeaponCharge, 1211008) == null) || lightCharge) {
                    this.statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MAD, getSkillStats().getStats("mad"), false));
                }
                break;
            case 3220005: { //스피릿 링크 : 프리져
                SkillStatEffect eff_ = SkillFactory.getSkill(3211005).getEffect(applyto.getSkillLevel(3211005));
                effects.setStats("time", eff_.getSkillStats().getStats("time"));
                localDuration = eff_.getDuration();
                applyto.send(MainPacketCreator.giveSpiritLink(localDuration, 3211005, 3220005));
                normal = false;
                break;
            }
            case 3120006: { //스피릿 링크 : 피닉스
                SkillStatEffect eff_ = SkillFactory.getSkill(3111005).getEffect(applyto.getSkillLevel(3111005));
                effects.setStats("time", eff_.getSkillStats().getStats("time"));
                localDuration = eff_.getDuration();
                applyto.send(MainPacketCreator.giveSpiritLink(localDuration, 3111005, 3120006));
                normal = false;
                break;
            }
            case 20031210: { // 빨강 저지먼트 - 120725 추가
                if (applyto.getCardStack() < 40) {
                    applyto.getClient().getSession().close();
                    return;
                }
                applyto.setCardStack(0);
                int skillid = 0;
                if (applyto.getSkillLevel(24120002) > 0) {
                    skillid = 24120002;
                } else if (applyto.getSkillLevel(24100003) > 0) {
                    skillid = 24100003;
                }
                if (skillid == 0) {
                    System.out.println("phantom judgement returned...");
                    return;
                }
                int rand = Randomizer.nextBoolean() ? 1 : 0;
                applyto.getMap().broadcastMessage(applyto, MainPacketCreator.absorbingCardStack(applyto.getId(), 0, skillid, true, 5), true);
                applyto.getMap().broadcastMessage(MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand, 1, true, false));
                applyto.getMap().broadcastMessage(applyto, MainPacketCreator.absorbingCardStack(applyto.getId(), 2, skillid, true, 5), true);
                applyto.getMap().broadcastMessage(MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand, 3, true, false));
                applyto.getMap().broadcastMessage(applyto, MainPacketCreator.absorbingCardStack(applyto.getId(), 4, skillid, true, 5), true);
                applyto.send(MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand, 1, false, false));
                //0 : 크리티컬, 1 : 아이템드롭률 2 : 몰라 3 : 몰라 4: 몰라
                final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DebuffTolerance, rand == 0 ? 5 : 10, false));
                applyto.send(MainPacketCreator.givePhantomJudgement(sourceid, getDuration(), stat, rand + 1));
                statups = stat;
                normal = false;
                break;
            }
            case 20031209: { //저지먼트
                if (applyto.getCardStack() < 20) {
                    applyto.getClient().getSession().close();
                    return;
                }
                applyto.setCardStack(0);
                int skillid = 0;
                if (applyto.getSkillLevel(24120002) > 0) {
                    skillid = 24120002;
                } else if (applyto.getSkillLevel(24100003) > 0) {
                    skillid = 24100003;
                }
                if (skillid == 0) {
                    System.out.println("phantom judgement returned...");
                    return;
                }
                int rand = Randomizer.nextBoolean() ? 1 : 0;
                applyto.getMap().broadcastMessage(applyto, MainPacketCreator.absorbingCardStack(applyto.getId(), 0, skillid, true, 5), true);
                applyto.getMap().broadcastMessage(MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand, 1, true, false));
                applyto.send(MainPacketCreator.showRandBuffEffect(applyto.getId(), sourceid, rand, 1, false, false));
                //0 : 크리티컬, 1 : 아이템드롭률
                final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DebuffTolerance, rand == 0 ? 5 : 10, false));
                applyto.send(MainPacketCreator.givePhantomJudgement(sourceid, getDuration(), stat, rand + 1));
                statups = stat;
                normal = false;
                break;
            }
            case 27100003: { //블레스 오브 다크니스
                final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BlessOfDarkness, Integer.valueOf(applyto.getBlessOfDark()), false));
                applyto.getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff(sourceid, localDuration, stat, this, null, SkillFactory.getSkill(sourceid).getAnimationTime(), applyto));
                normal = false;
                break;
            }
            case 27121054: {
                applyequilibriumBuff(applyto, true);
                normal = false;
                break;
            }
            case 36111003: {
                statups.clear();
                if (applyto.dualBrid != 0) {
                    effects.setStats("prop", effects.getStats("prop") - effects.getStats("y"));
                }
                effects.setStats("x", applyto.dualBrid);
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StackBuff, applyto.dualBrid, false));
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, 100, false));
                break;
            }
            case 27121005: {
                statups.clear();
                applyto.acaneAim = applyto.acaneAim == 0 ? 1 : applyto.acaneAim;
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StackBuff, applyto.acaneAim, false));
                effects.setStats("x", applyto.acaneAim);
                break;
            }
            case 3110001: {
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BowMasterMortalBlow, applyto.blow, false));
                if (applyto.blow == 10) {
                    SkillStatEffect blow = applyto.getBuffedSkillEffect(BuffStats.CTS_BowMasterMortalBlow);
                    applyto.cancelEffect(blow, false, applyto.getBuffedStarttime(BuffStats.CTS_BowMasterMortalBlow, blow.getSourceId()));
                    applyto.blow = 0;
                }
                break;
            }
            case 142001000:
            case 142100000:
            case 142110000: {
                applyto.blow++;
                monsterStatus.put(MonsterStatus.Burned, applyto.blow);
                break;
            }
            case 2100009: {
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DotBasedBuff, applyto.blow, false));
                break;
            }
            case 3110012: {
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BowMasterConcentration, applyto.acaneAim, false));
                if (applyto.getLastCombo() + 90000 < System.currentTimeMillis()) {
                    applyto.acaneAim = 0;
                }
                break;
            }
            case 4221054: {
                statups.clear();
                applyto.flipTheCoin++;
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_FlipTheCoin, applyto.flipTheCoin, false));
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IndieDamR, effects.getStats("indieDamR") * applyto.flipTheCoin, true));
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CriticalBuff, effects.getStats("x") * applyto.flipTheCoin, false));
                break;
            }
            case 5121055: {
                statups.clear();
                applyto.unitiyOfPower++;
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_UnityOfPower, applyto.unitiyOfPower > 4 ? 4 : applyto.unitiyOfPower, false));
                break;
            }
            case 1211010: {
                statups.clear();
                applyto.restonation++;
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Restoration, applyto.restonation * getY(), false));
                if (applyto.restonation == 10) {
                    applyto.restonation = 0;
                }
                break;
            }
            case 15120003:
            case 15111022: {
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamR, applyto.acaneAim * getY(), true));
                applyto.acaneAim = 0;
                applyto.cancelEffectFromBuffStat(BuffStats.CTS_CygnusElementSkill, 15001022);
                break;
            }
            case 15001022: {
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_CygnusElementSkill, applyto.lightning, false));
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_IgnoreTargetDEF, getX() * applyto.lightning, false));
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_StackBuff, applyto.lightning, false));
                effects.setStats("y", applyto.lightning);
                break;
            }
            case 1200014: {
                if (applyto.GetCount() > 0) {
                    statups.clear();
                    effects.setStats("x", applyto.GetCount());
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ElementalCharge, effects.getStats("x"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ACC, effects.getStats("y"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_EVAR, effects.getStats("u"), false));
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_DamageReduce, effects.getStats("w"), false));
                    break;
                }
            }
            case 1301013: {
                effects.setStats("sBeholder", 0); // 임시처리
                break;
            }
            case 100001268: { //륀느의 가호
                statups.clear();
                if (GameConstants.isZero(applyto.getJob())) {
                    statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BasicStatUp, effects.getStats("x"), false));
                }
                effects.setStats("time", Integer.MAX_VALUE);
                break;
            }
            case 1321015: {
                applyto.cancelEffect(applyto.getBuffedSkillEffect(BuffStats.CTS_Beholder, 1301013), false, -1);
                break;
            }
            case 1320019: {
                effects.setStats("z", applyto.getReincarnationCount());
                if (applyto.getReincarnationCount() == 0) {
                    localDuration = 10000;
                }
                break;
            }
            case 2111011: {
                effects.setStats("y", applyto.elementalAdep);
                break;
            }
            case 21000000: {
                statups.clear();
                //스탠스 #stanceProp% 증가, 콤보 카운트 50 당 공격력 #y, 물리 방어력 #z, 마법 방어력 #z, 이동속도 #w씩 최대 #x회까지 누적효과 중첩
                statups.add(new Triple<>(BuffStats.CTS_Stance, effects.getStats("stanceProp"), false));
                statups.add(new Triple<>(BuffStats.CTS_PAD, getY() * applyto.getCombo() / 50, true));
                statups.add(new Triple<>(BuffStats.CTS_PDD, getZ() * applyto.getCombo() / 50, true));
                statups.add(new Triple<>(BuffStats.CTS_MDD, getZ() * applyto.getCombo() / 50, true));
                statups.add(new Triple<>(BuffStats.CTS_Speed, getW() * applyto.getCombo() / 50, true));
                break;
            }
            case 25121209: {
                statups.clear();
                statups.add(new Triple<>(BuffStats.CTS_SpiritGuard, applyto.SpiritGuard, false));
                break;
            }
            case 27121052: {
                applyto.giveDebuff(DiseaseStats.STUN, MobSkillFactory.getMobSkill(123, 1));
                break;
            }
            /*case 32001014: // 데스
            case 32100010: // 데스 컨트랙트
            case 32110017: // 데스 컨트랙트2
            case 32120019: { // 데스 컨트랙트3
                statups.clear();
                statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_BMageDeath, applyto.deathCount, false));
                break;
            }*/
            case 4221013: {
                statups.clear();
                statups.add(new Triple<>(BuffStats.CTS_IndiePAD, effects.getStats("x") + (applyto.KillingPoint * 10), true));
                applyto.KillingPoint = 0;
                applyto.send(MainPacketCreator.KillingPoint(applyto.KillingPoint));
                break;
            }
            case 31011001: {
                int count = applyto.getStat().getDemonCount();
                statups.add(new Triple<>(BuffStats.CTS_IndiePMdR, effects.getStats("indiePMdR") + (count), true));
                applyto.getStat().setDemonCount(0);
                applyto.getStat().setOverLoad(0);
                applyto.send(MainPacketCreator.cancelExeedCount());
                applyto.send(MainPacketCreator.cancelExeed());
                int recover = (int) (applyto.getStat().getCurrentMaxHp() * (getX() / 100.0D));
                applyto.addHP(recover);
                break;
            }
            case 37110009:
            case 37120012: {
                if (sourceid == 37110009) {
                    if (applyto.getSkillLevel(37120012) > 0) {
                        SkillFactory.getSkill(37120012).getEffect(applyto.getSkillLevel(37120012)).applyTo(applyto);
                        return;
                    }
                }
                //최대 #x 단계까지 누적 가능, #time초간 유지, 1단계 당 최종 데미지 #y% 증가, #w단계 당 공격 속도 1단계 증가, #z단계 당 스킬 연계 속도 1단계 증가\n영구히 공격력 #padR% 증가
                applyto.combination++;
                if (applyto.combination > 10) {
                    applyto.combination = 10;
                }
                statups.clear();
                statups.add(new Triple<>(BuffStats.CTS_RWCombination, applyto.combination, false));
                break;
            }
            /* 종료 */
            default:
                if (sourceid == 22171080 ? isEvanDragonMaster() : isMonsterRiding()) { // 치우시 :: 에반 하이퍼 라이딩 분리
                    statups.clear();
                    int mountid = (sourceid == 33001001 ? GameConstants.getJaguarIdByMob(applyto.getKeyValue2("CapturedJaguar")) : parseMountInfo(applyfrom, sourceid));
                    if (sourceid == 33001001) { //재규어 라이딩
                        SkillStatEffect sjagur = applyto.getBuffedSkillEffect(BuffStats.CTS_JaguarSummoned);
                        if (sjagur != null) {
                            applyto.cancelEffect(sjagur, false, applyto.getBuffedStarttime(BuffStats.CTS_JaguarSummoned, sjagur.getSourceId()));
                        }
                        SkillStatEffect ja_eff = applyto.getBuffedSkillEffect(BuffStats.CTS_JaguarSummoned);
                        if (ja_eff != null) {
                            applyto.cancelEffect(ja_eff, true, -1);
                        }
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MonsterRiding, mountid, false));
                    } else if (sourceid == 35001002) { //메탈아머 : 휴먼
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Mechanic, 0, false));
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MonsterRiding, mountid, false));
                        applyto.setKeyValue2("mountid", mountid);
                        applyto.setKeyValue2("mountskillid", sourceid);
                    } else if (sourceid == 35111003) { //메탈아머 : 탱크
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MonsterRiding, mountid, false));
                        statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_Mechanic, 1, false));
                        applyto.setKeyValue2("mountid", mountid);
                        applyto.setKeyValue2("mountskillid", sourceid);
                    } else if (mountid != 0) {
                        if (sourceid == 22171080) {
                            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_RideVehicleExpire, mountid, false));
                        } else {
                            statups.add(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_MonsterRiding, mountid, false));
                            applyfrom.getClient().send(MainPacketCreator.giveMount(mountid, sourceid));
                        }
                    } else {
                        return;
                    }
                    normal = true;
                }
                break;
        }
        if (localDuration < 0) {
            localDuration = Integer.MAX_VALUE;
        }

        if (SkillFactory.getSkill(sourceid) != null) {
            if (SkillFactory.getSkill(sourceid).notCancel()) {
                localDuration = Integer.MAX_VALUE;
            }
        }
        applyto.cancelEffect(this, true, -1);

        if (sourceid == 35001002 || sourceid == 35111003) {
            applyto.send(MechanicSkill.giveHuman(statups, sourceid, localDuration, parseMountInfo(applyto, sourceid)));
        } else if (normal && statups.size() > 0 && !isSummon() && !isMonsterRiding()) { // 치우씨 :: 라이딩 관여
            long overlap_magic = (long) (System.currentTimeMillis() % 1000000000);
            Map<BuffStats, List<StackedSkillEntry>> stacked = applyto.getStackSkills();
            for (Triple<BuffStats, Integer, Boolean> statup : statups) {
                if (statup.getThird()) {
                    if (!stacked.containsKey(statup.getFirst())) {
                        stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                    }
                    stacked.get(statup.getFirst()).add(new StackedSkillEntry(skill ? getSourceId() : -getSourceId(), statup.getSecond(), overlap_magic, localDuration));
                }
            }
            applyto.getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff((skill ? sourceid : -sourceid), localDuration, statups, this, stacked, skill ? SkillFactory.getSkill(sourceid).getAnimationTime() : 0, applyto));
        }

        final long starttime = System.currentTimeMillis();
        final CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
        final ScheduledFuture<?> schedule = tools.Timer.BuffTimer.getInstance().schedule(cancelAction, ((starttime + localDuration) - System.currentTimeMillis()));
        applyto.registerEffect(this, starttime, schedule);
        applyto.refreshMaxHpMp();
        if (sourceid != 5001005) {
            applyto.getMap().broadcastMessage(applyto, MainPacketCreator.giveForeignBuff(applyto, statups), false);
        }
    }

    public final void applyToBMDeath(MapleCharacter applyto) {
        statups.clear();
        statups.add(new Triple<>(BuffStats.CTS_BMageDeath, applyto.deathCount, false));
        int localDuration = effects.getStats("time");
        if (localDuration < 0) {
            localDuration = Integer.MAX_VALUE;
        }
        if (SkillFactory.getSkill(sourceid).notCancel()) {
            localDuration = Integer.MAX_VALUE;
        }
        if (statups.size() > 0) {
            long overlap_magic = (long) (System.currentTimeMillis() % 1000000000);
            Map<BuffStats, List<StackedSkillEntry>> stacked = applyto.getStackSkills();
            for (Triple<BuffStats, Integer, Boolean> statup : statups) {
                if (statup.getThird()) {
                    if (!stacked.containsKey(statup.getFirst())) {
                        stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                    }
                    stacked.get(statup.getFirst()).add(new StackedSkillEntry(skill ? getSourceId() : -getSourceId(), statup.getSecond(), overlap_magic, localDuration));
                }
            }
            applyto.getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff((skill ? sourceid : -sourceid), localDuration, statups, this, stacked, SkillFactory.getSkill(sourceid).getAnimationTime(), applyto));
        }

        for (Entry<Integer, Pair<Integer, MapleSummon>> summons : applyto.getSummons().entrySet()) {
            if (summons.getValue().left == sourceid) {
                return;
            }
        }
        if (applyto.deathCount == getX()) {
            Point pos = applyto.getPosition();
            final MapleSummon tosummon = new MapleSummon(applyto, sourceid, pos, getSummonMovementType(), System.currentTimeMillis());
            tosummon.setPosition(pos);
            applyto.getMap().spawnSummon(tosummon, true, getDuration());
            applyto.getSummons().put(tosummon.getObjectId(), new Pair<>(sourceid, tosummon));
            tosummon.addHP(Integer.MAX_VALUE);
        }
    }

    public final void applyToQuiverCatridge(MapleCharacter applyto, int v1) {
        statups.clear();
        statups.add(new Triple<>(BuffStats.CTS_QuiverCatridge, v1, false));
        int localDuration = effects.getStats("time");
        if (localDuration < 0) {
            localDuration = Integer.MAX_VALUE;
        }
        if (SkillFactory.getSkill(sourceid).notCancel()) {
            localDuration = Integer.MAX_VALUE;
        }
        applyto.cancelEffect(this, true, -1);
        if (statups.size() > 0) {
            long overlap_magic = (long) (System.currentTimeMillis() % 1000000000);
            Map<BuffStats, List<StackedSkillEntry>> stacked = applyto.getStackSkills();
            for (Triple<BuffStats, Integer, Boolean> statup : statups) {
                if (statup.getThird()) {
                    if (!stacked.containsKey(statup.getFirst())) {
                        stacked.put(statup.getFirst(), new ArrayList<StackedSkillEntry>());
                    }
                    stacked.get(statup.getFirst()).add(new StackedSkillEntry(skill ? getSourceId() : -getSourceId(), statup.getSecond(), overlap_magic, localDuration));
                }
            }
            applyto.getClient().getSession().writeAndFlush(MainPacketCreator.giveBuff((skill ? sourceid : -sourceid), localDuration, statups, this, stacked, SkillFactory.getSkill(sourceid).getAnimationTime(), applyto));
        }
        final long starttime = System.currentTimeMillis();
        final CancelEffectAction cancelAction = new CancelEffectAction(applyto, this, starttime);
        final ScheduledFuture<?> schedule = tools.Timer.BuffTimer.getInstance().schedule(cancelAction, ((starttime + localDuration) - System.currentTimeMillis()));
        applyto.registerEffect(this, starttime, schedule);
        applyto.refreshMaxHpMp();
        applyto.getMap().broadcastMessage(applyto, MainPacketCreator.giveForeignBuff(applyto, statups), false);
    }

    public static final int parseMountInfo(final MapleCharacter player, final int skillid) {
        switch (skillid) {
            case 1004: // Monster riding
            case 10001004:
            case 20001004:
            case 20011004:
            case 30001004:
            case 20021004:
            case 20031004:
            case 30011004:
            case 50001004:
                if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -122) != null) {
                    return player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -122).getItemId();
                }
                if (player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -22) != null) {
                    return player.getInventory(MapleInventoryType.EQUIPPED).getItem((short) -22).getItemId();
                }
                return 0;
            case 35001002:
            case 35111003:
            case 35120000:
                return 1932016;
            case 22171080:
                return 1939007;
            default: // default parses all
                return GameConstants.getMountItem(skillid, player);
        }
    }

    private final int calcHPChange(final MapleCharacter applyfrom, final boolean primary) {
        int hpchange = 0;
        if (effects.getStats("hp") != 0) {
            if (!skill) {
                hpchange += effects.getStats("hp");
                if (applyfrom.hasDisease(DiseaseStats.ZOMBIFY)) {
                    hpchange /= 2;
                }
                if (applyfrom.getSkillLevel(30000002) > 0) { //이피션시
                    double percent = (double) (SkillFactory.getSkill(30000002).getEffect(1).getX() / 100.0D);
                    hpchange = (int) ((double) hpchange * percent);
                } else if (applyfrom.getSkillLevel(30010002) > 0) { //이피션시
                    double percent = (double) (SkillFactory.getSkill(30010002).getEffect(1).getX() / 100.0D);
                    hpchange = (int) ((double) hpchange * percent);
                }
            } else // assumption: this is heal
            {
                if (isHeal()) {
                    int hpPercent = effects.getStats("hp");
                    hpchange += (int) (applyfrom.getStat().getCurrentMaxHp() * ((double) hpPercent / 100.0D));
                    if (applyfrom.hasDisease(DiseaseStats.ZOMBIFY)) {
                        hpchange = -hpchange;
                    }
                } else {
                    hpchange += effects.getStats("hp");
                }
            }
        }
        if (effects.getStats("hpR") != 0) {
            hpchange += (int) (applyfrom.getStat().getCurrentMaxHp() * (effects.getStats("hpR") / 100.0D));
        }
        if (effects.getStats("hpRCon") != 0) {
            hpchange -= (int) (applyfrom.getStat().getCurrentMaxHp() * (effects.getStats("hpRCon") / 100.0D));
        }
        if (primary) {
            if (effects.getStats("hpCon") != 0) {
                hpchange -= effects.getStats("hpCon");
            }
        }
        return hpchange;
    }

    private static final int getElementalAmp(final int job) {
        switch (job) {
            case 211:
            case 212:
                return 2110001;
            case 221:
            case 222:
                return 2210001;
            case 1211:
            case 1212:
                return 12110001;
            case 2215:
            case 2216:
            case 2217:
            case 2218:
                return 22150000;
        }
        return -1;
    }

    public final int calcMPChange(final MapleCharacter applyfrom, final boolean primary) {
        int mpchange = 0;
        if (isTeleport()) {
            if (applyfrom.getBuffedValue(BuffStats.CTS_TeleportMasteryOn) != null) {
                mpchange -= applyfrom.getBuffedValue(BuffStats.CTS_TeleportMasteryOn).intValue();
            }
        }

        if (effects.getStats("mp") != 0) {
//	    if (primary) {
//		mpchange += alchemistModifyVal(applyfrom, effects.getStats("mp"), true);
//	    } else {
//		
//	    }
            mpchange += effects.getStats("mp");
        }

        if (effects.getStats("mpR") != 0) {
            mpchange += (int) (applyfrom.getStat().getCurrentMaxMp() * effects.getStats("mpR"));
        }
        if (primary) {
            if (effects.getStats("mpCon") != 0) {
                double mod = 1.0;

                final int ElemSkillId = getElementalAmp(applyfrom.getJob());
                if (ElemSkillId != -1) {
                    final ISkill amp = SkillFactory.getSkill(ElemSkillId);
                    final int ampLevel = applyfrom.getSkillLevel(amp);
                    if (ampLevel > 0) {
                        SkillStatEffect ampStat = amp.getEffect(ampLevel);
                        mod = ampStat.getX() / 100.0;
                    }
                }
                if (applyfrom.getBuffedValue(BuffStats.CTS_Infinity) != null) {
                    mpchange = 0;
                } else if (applyfrom.getBuffedValue(BuffStats.CTS_AdvancedBless) != null) {
                    SkillStatEffect eff = applyfrom.getBuffedSkillEffect(BuffStats.CTS_AdvancedBless);
                    int reduce = eff.getSkillStats().getStats("mpConReduce");
                    mpchange -= (int) (mpchange * ((double) reduce / 100.0D));
                } else {
                    mpchange -= effects.getStats("mpCon") * mod;
                }
            }
            if (effects.getStats("forceCon") != 0) {
                if (applyfrom.getBuffedValue(BuffStats.CTS_InfinityForce) != null) {
                    mpchange = 0;
                } else {
                    mpchange = -effects.getStats("forceCon");
                }
            }
        }
        if (!skill && sourceid / 1000000 == 2 && GameConstants.isDemonSlayer(applyfrom.getJob()) || GameConstants.isDemonAvenger(applyfrom.getJob()) || GameConstants.isZero(applyfrom.getJob())) { // 데몬 제로는 회복을 물약x
            mpchange = 0;
        }
        if (applyfrom.getBuffedValue(BuffStats.CTS_Larkness) != null) {
            switch (applyfrom.getBuffedValue(BuffStats.CTS_Larkness).intValue()) {
                case 20040217:
                    if (GameConstants.isDarkSkills(getSourceId())) {
                        mpchange = 0;
                    }
                case 2:
                    if (GameConstants.isDarkSkills(getSourceId())) {
                        mpchange = 0;
                    }
            }
        }
        return mpchange;
    }

    private final int alchemistModifyVal(final MapleCharacter chr, int val, final boolean withX) {
        if (!skill) {
            final SkillStatEffect alchemistEffect = getAlchemistEffect(chr);
            if (alchemistEffect != null) {
                return (int) (val * ((withX ? alchemistEffect.getX() : alchemistEffect.getY()) / 100.0));
            }
        }
        return val;
    }

    private final SkillStatEffect getAlchemistEffect(final MapleCharacter chr) {
        ISkill al;
        switch (chr.getJob()) {
            case 411:
            case 412:
                al = SkillFactory.getSkill(4110000);
                if (chr.getSkillLevel(al) == 0) {
                    return null;
                }
                return al.getEffect(chr.getSkillLevel(al));
            case 1411:
            case 1412:
                al = SkillFactory.getSkill(14110003);
                if (chr.getSkillLevel(al) == 0) {
                    return null;
                }
                return al.getEffect(chr.getSkillLevel(al));
            case 3000:
            case 3200:
            case 3210:
            case 3211:
            case 3212:
            case 3300:
            case 3310:
            case 3311:
            case 3312:
            case 3500:
            case 3510:
            case 3511:
            case 3512:
                al = SkillFactory.getSkill(30000002);
                if (chr.getSkillLevel(al) == 0) {
                    return null;
                }
                return al.getEffect(chr.getSkillLevel(al));
            case 3001:
            case 3100:
            case 3110:
            case 3111:
            case 3112:
                al = SkillFactory.getSkill(30010002);
                if (chr.getSkillLevel(al) == 0) {
                    return null;
                }
                return al.getEffect(chr.getSkillLevel(al));

        }
        return null;
    }

    public final void setSourceId(final int newid) {
        sourceid = newid;
    }

    private final boolean isGmBuff() {
        switch (sourceid) {
            case 1005: // echo of hero acts like a gm buff
            case 10001005: // cygnus Echo
            case 20001005: // Echo
            case 20011005:
            case 9001000: // GM dispel
            case 9001001: // GM haste
            case 9001002: // GM Holy Symbol
            case 9001003: // GM Bless
            case 9001005: // GM resurrection
            case 9001008: // GM Hyper body
                return true;
            default:
                return false;
        }
    }

    private final boolean isEnergyCharge() {
        return skill && (sourceid == 5100015 || sourceid == 15100004);
    }

    public final boolean isMonsterBuff() {
        switch (sourceid) {
            case 1211013:
            case 2121006:
            case 2221011:
            case 4111003:
            case 4121015:
            case 4321002:
            case 22141003:
            case 11111023:
            case 22121000:
            case 22161002:
            case 22151001:
            case 25111206:
            case 35111005:
            case 32120000:
            case 32120001:
            case 22110013:
                return skill;
        }
        return false;
    }

    public final boolean isMonsterRiding_() {
        return skill
                && (sourceid == 1004
                || sourceid == 10001004
                || sourceid == 20001004
                || sourceid == 20011004
                || sourceid == 30001004
                && (sourceid >= 80001000 && sourceid <= 80001033)
                || sourceid == 80001037
                || sourceid == 80001038
                || sourceid == 80001039
                || sourceid == 80001044
                || (sourceid >= 80001082 && sourceid <= 80001090)
                || sourceid == 30011159
                || sourceid == 30011109 || sourceid == 33001001 || sourceid == 35001002 || sourceid == 35111003); // 치우씨 :: 에반 하이퍼 리이딩 분리
        //|| sourceid == 30011109 || sourceid == 33001001 || sourceid == 35001002 || sourceid == 35111003 || sourceid == 22171080);
    }

    public final boolean isEvanDragonMaster_() { // 치우씨 :: 에반 하이퍼 라이딩 분리
        return skill
                && (sourceid == 22171080);
    }

    public final boolean isEvanDragonMaster() { // 치우씨 :: 에반 하이퍼 라이딩 분리
        return skill && (isEvanDragonMaster_() || GameConstants.checkMountItem(sourceid) != 0);
    }

    public final boolean isMonsterRiding() {
        return skill && (isMonsterRiding_() || GameConstants.checkMountItem(sourceid) != 0);
    }

    private final boolean isPartyBuff() {
        if (lt == null || rb == null) {
            return false;
        }
        switch (sourceid) {
            case 1211003:
            case 1211004:
            case 1211005:
            case 1211006:
            case 1211007:
            case 1211008:
            case 1221003:
            case 1221004:
            case 4311001:
            case 11111007:
            case 12101005:
            case 22171080:
            case 22171083:
                return false;
        }
        return true;
    }

    public final boolean isFlyRiding() {
        switch (sourceid) {
            case 80001285: //둥실둥실 풍선 라이딩
            case 22171083:
                return skill;
        }
        return false;
    }

    public final boolean isHeal() {
        return sourceid == 2301002 || sourceid == 9001000;
    }

    public final boolean isResurrection() {
        return sourceid == 9001005 || sourceid == 2321006;
    }

    public final boolean isTimeLeap() {
        return sourceid == 5121010;
    }

    public final boolean isTimeHolding() {
        return sourceid == 100001274;
    }

    public final int getHp() {
        return effects.getStats("hp");
    }

    public final int getMp() {
        return effects.getStats("m");
    }

    public final int getMastery() {
        return effects.getStats("mastery");
    }

    public final int getWatk() {
        return effects.getStats("pad");
    }

    public final int getMatk() {
        return effects.getStats("mad");
    }

    public final int getWdef() {
        return effects.getStats("pdd");
    }

    public final int getMdef() {
        return effects.getStats("mdd");
    }

    public final int getAcc() {
        return effects.getStats("acc");
    }

    public final int getAvoid() {
        return effects.getStats("eva");
    }

    public final int getHands() {
        return effects.getStats("hands");
    }

    public final int getSpeed() {
        return effects.getStats("speed");
    }

    public final int getJump() {
        return effects.getStats("jump");
    }

    public final int getStatusDuration() {
        if (sourceid == 31121003) { //데빌크라이
            return effects.getStats("subTime") * 1000;
        }
        if (effects.getStats("subTime") > 0) {
            return effects.getStats("subTime");
        }
        return effects.getStats("time");
    }

    public final int getDuration() {
        if (sourceid == 31121003 || sourceid == 37100002 || sourceid == 37110004) {
            return effects.getStats("subTime") * 1000;
        }
        if ((sourceid != 2121005) && (effects.getStats("dotTime") > 0)) {
            return effects.getStats("dotTime") * 1000;
        }
        if (effects.getStats("time") < 100) {
            return effects.getStats("time") * 1000;
        }
        return effects.getStats("time");
    }

    public final int getDotTime() {
        return effects.getStats("dotTime");
    }

    public final int getDotInterval() {
        return effects.getStats("dotInterval") * 1000;
    }

    public final boolean isOverTime() {
        return overTime;
    }

    public final List<Triple<BuffStats, Integer, Boolean>> getStatups() {
        return statups;
    }

    public final boolean sameSource(final SkillStatEffect effect) {
        return this.sourceid == effect.sourceid && this.skill == effect.skill;
    }

    public final int getX() {
        return effects.getStats("x");
    }

    public final int getV() {
        return effects.getStats("v");
    }

    public final int getValue(String value) {
        return effects.getStats(value);
    }

    public final int getY() {
        return effects.getStats("y");
    }

    public final int getZ() {
        return effects.getStats("z");
    }

    public final int getW() {
        return effects.getStats("w");
    }

    public final int getU() {
        return effects.getStats("u");
    }

    public final int getDamage() {
        return effects.getStats("damage");
    }

    public final byte getAttackCount() {
        return (byte) effects.getStats("attackCount");
    }

    public final byte getBulletCount() {
        return (byte) effects.getStats("bulletCount");
    }

    public final int getBulletConsume() {
        return effects.getStats("bulletConsume");
    }

    public final int getOnActive() {
        return effects.getStats("onActive");
    }

    public final byte getMobCount() {
        return (byte) effects.getStats("mobCount");
    }

    public final int getMoneyCon() {
        return effects.getStats("moneyCon");
    }

    public final int getCooldown() {
        return effects.getStats("cooltime");
    }

    public final int getMaxDamageOver() {
        return effects.getStats("indieMaxDamageOver");
    }

    public final int getPowerEnergy() {
        return effects.getStats("powerCon");
    }

    public final int getPPRecovery() {
        return effects.getStats("ppRecovery");
    }

    public final int getPPCon() {
        return effects.getStats("ppCon");
    }

    public final Map<MonsterStatus, Integer> getMonsterStati() {
        return monsterStatus;
    }

    public final boolean isHide() {
        return skill && sourceid == 9001004;
    }

    public final boolean isBerserk() {
        return skill && sourceid == 1320006;
    }

    public final boolean isComboRecharge() {
        return skill && sourceid == 21111009;
    }

    public final boolean isMPRecovery() {
        return skill && sourceid == 5101005;
    }

    public final boolean isMagicDoor() {
        return skill && sourceid == 2311002;
    }

    public final boolean isMesoGuard() {
        return skill && sourceid == 4201011;
    }

    public final boolean isMechDoor() {
        return skill && sourceid == 35101005;
    }

    public final boolean isMechPassive() {
        switch (sourceid) {
            case 35121013:
                return true;
        }
        return false;
    }

    public final boolean isCharge() {
        switch (sourceid) {
            case 1211006:
            case 1211003:
            case 1211004:
            case 1211005:
            case 1211007:
            case 1211008:
            case 1221003:
            case 1221004:
            case 15101006:
            case 21101006:
                return skill;
        }
        return false;
    }

    public final boolean isFinalAttack() {
        switch (sourceid) {
            case 13101002:
            case 11101002:
                return skill;
        }
        return false;
    }

    public final boolean isMistPoison() {
        switch (sourceid) {
            case 2111003:
            case 14111006:
            case 22181002:
            case 80001431:
                return true;
        }
        return false;
    }

    public final boolean isRecovery() {
        switch (sourceid) {
            case 22161003:
                return true;
        }
        return false;
    }

    public final boolean isBurningRegion() {
        return sourceid == 12121005;
    }

    public final boolean isAran() {
        return sourceid == 21121068;
    }

    public final boolean isTimeCapsule() {
        switch (sourceid) {
            case 36121007:
                return true;
        }
        return false;
    }

    public final boolean isPoison() {
        switch (sourceid) {
            case 2111003:
            case 2101005:
            case 2111006:
            case 2221003:
            case 3111003:
            case 25111206:
            case 80001431:
                return skill;
        }
        return false;
    }

    public final boolean isMist() {
        return sourceid == 80001431 || sourceid == 22170064 || sourceid == 131001107 || sourceid == 21100002 || sourceid == 2311011 || sourceid == 36121007 || sourceid == 2100010 || sourceid == 2111003 || sourceid == 4121015 || sourceid == 4221006 || sourceid == 12121005 || sourceid == 21121068 || sourceid == 25111206 || sourceid == 32121006 || sourceid == 33111013 || sourceid == 33121016;
    }

    public final boolean isSpiritClaw() {
        return skill && (sourceid == 4111009 || sourceid == 5201008 || sourceid == 14111025);
    }

    private final boolean isDispel() {
        return skill && (sourceid == 2311001 || sourceid == 9001000);
    }

    private final boolean isHeroWill() {
        switch (sourceid) {
            case 1121011:
            case 1221012:
            case 1321010:
            case 2121008:
            case 2221008:
            case 2321009:
            case 3121009:
            case 3221008:
            case 4121009:
            case 4221008:
            case 5121008:
            case 5221010:
            case 21121008:
            case 22171004:
            case 4341008:
            case 80001478: //버든 리프트 링
                return skill;
        }
        return false;
    }

    public final void applyMist(final MapleCharacter applyfrom, final Point pos) {
        final Rectangle bounds = calculateBoundingBox(pos != null ? pos : applyfrom.getPosition(), applyfrom.isFacingLeft());
        final MapleMist mist = new MapleMist(bounds, applyfrom, this, effects.getLevel(), pos == null ? applyfrom.getPosition() : pos);
        applyfrom.getMap().spawnMist(mist, getTime(), isMistPoison(), false, isRecovery(), isBurningRegion(), isTimeCapsule(), false, isAran());
        if (isTimeCapsule()) {
            applyfrom.send(MainPacketCreator.TimeCapsule());
            applyfrom.setChairText(null);
            applyfrom.setChair(3010587);
            applyfrom.getMap().broadcastMessage(applyfrom, MainPacketCreator.showChair(applyfrom.getId(), applyfrom.getChair(), applyfrom.getChairText()), false);
        }
    }

    public final boolean isAranCombo() {
        return sourceid == 21000000;
    }

    public final boolean isMechChange() {
        switch (sourceid) {
            case 35121054:
            case 35111004: //siege
            case 35001001: //flame
            case 35101009:
            case 35121013:
            case 35121005:
            case 35100008:
                return skill;
        }
        return false;
    }

    public final boolean isPirateCTS_Morph() {
        switch (sourceid) {
            case 15111002:
            case 5111005:
            case 5121003:
                return skill;
        }
        return false;
    }

    public final boolean isMorph() {
        return effects.getStats("morph") > 0;
    }

    public final boolean isInflation() {
        return effects.getStats("inflation") > 0;
    }

    public final int getMorph() {
        return effects.getStats("morph");
    }

    public final boolean isSummon() {
        switch (sourceid) {
            case 2211011:
            case 2221005: // 엘퀴네스
            case 2321003: // 바하뮤트
            case 5201012:
            case 5201013:
            case 5201014:
            case 5210015:
            case 5210016:
            case 5210017:
            case 5210018:
            case 23111008:
            case 23111009:
            case 23111010:
            case 35101012:
            case 35121009:
            case 61111002:
                return true;
        }
        return false;
    }

    public final int getInflation() {
        return effects.getStats("inflation");
    }

    public final int getMorph(final MapleCharacter chr) {
        switch (effects.getStats("morph")) {
            case 1000:
            case 1100:
                return effects.getStats("morph") + chr.getGender();
            case 1003:
                return effects.getStats("morph") + (chr.getGender() * 100);
        }
        return effects.getStats("morph");
    }

    public final SummonMovementType getSummonMovementType() {
        switch (sourceid) {
            case 3211002:
            case 3111002:
            case 33111003:
            case 13111004:
            case 5211001:
            case 5220002:
            case 5321052:
            case 4341006:
            case 35111002:
            case 35111005:
            case 35111011:
            case 35121009:
            case 35121010:
            case 4111007:
            case 4211007:
            case 35121003:
            case 3120012:
            case 3220012:
            case 5321003:
            case 5321004:
            case 5320011:
            case 5211014:
            case 33101008:
            case 61111002:
            case 3221014:
            case 22171052:
            case 36121002:
            case 36121013:
            case 36121014:
            case 14121003:
            case 35111008:
            case 35120002:
            case 35101012:
                return SummonMovementType.STATIONARY;
            case 3101007:
            case 3201007:
            case 33111005:
            case 33101011:
                return SummonMovementType.CIRCLE_FOLLOW;
            case 5211002:
                return SummonMovementType.CIRCLE_STATIONARY;
            case 5201012:
            case 5201013:
            case 5201014:
            case 5210015:
            case 5210016:
            case 5210017:
            case 5210018:
            case 35121011:
            case 2111010:
            case 22171064:
            case 22171081:
                return SummonMovementType.WALK_STATIONARY;
            case 1301013:
            case 1321007:
            case 1311014:
            case 2121005:
            case 2221005:
            case 2211011:
            case 2321003:
            case 3111005:
            case 3211005:
            case 12111004:
            case 35111001:
            case 35111010:
            case 35111009:
            case 1085:
            case 1087:
            case 1090:
            case 1179:
            case 10001085:
            case 10001087:
            case 10001090:
            case 10001179:
            case 20001085:
            case 20001087:
            case 20001090:
            case 20001179:
            case 20011085:
            case 20011087:
            case 20011090:
            case 20011179:
            case 20021085:
            case 20021087:
            case 20021090:
            case 20021179:
            case 20031085:
            case 20031087:
            case 20031090:
            case 20031179:
            case 20041085:
            case 20041087:
            case 20041090:
            case 20041179:
            case 30001085:
            case 30001087:
            case 30001090:
            case 30001179:
            case 30011085:
            case 30011087:
            case 30011090:
            case 30011179:
            case 30021085:
            case 30021087:
            case 30021090:
            case 30021179:
            case 50001085:
            case 50001087:
            case 50001090:
            case 50001179:
            case 60001085:
            case 60001087:
            case 60001090:
            case 60001179:
            case 60011085:
            case 60011087:
            case 60011090:
            case 60011179: //Angel
            case 12120013:
            case 12120014:
            case 80001217:
            case 80001219:
            case 80001266:
            case 80001269:
            case 80001270:
            case 80001281:
            case 80001282:
            case 80001322:
            case 80001323:
            case 80001341:
            case 80001395:
            case 80001396:
            case 80001493:
            case 80001494:
            case 80001495:
            case 80001496:
            case 80001497:
            case 80001498:
            case 80001499:
            case 80001500:
            case 80001501:
            case 80001502:
            /*case 32001014: // 데스
            case 32100010: // 데스 컨트랙트
            case 32110017: // 데스 컨트랙트2
            case 32120019:*/
            case 23111008:
            case 23111009:
            case 23111010:
                return SummonMovementType.FOLLOW;
            case 101100100:
            case 101100101:
                return SummonMovementType.ZEROWEAPON;
            case 14120008:
            case 14110029:
            case 14100027:
            case 14000027: //쉐도우 배트
            case 131002015:
                return SummonMovementType.BIRD_FOLLOW;

            case 33001007:
            case 33001008:
            case 33001009:
            case 33001010:
            case 33001011:
            case 33001012:
            case 33001013:
            case 33001014:
            case 33001015:
                return SummonMovementType.SUMMON_JAGUAR;
        }
        if (!skill) {
            return null;
        }
        return null;
    }

    public final boolean isSoaring() {

        switch (sourceid) {
            case 1026: // Soaring
            case 10001026: // Soaring
            case 20001026: // Soaring
            case 20011026: // Soaring
                return skill;
        }
        return false;
    }

    public final boolean isSkill() {
        return skill;
    }

    public final int getSourceId() {
        return sourceid;
    }

    /**
     * @return true if the effect should happen based on it's probablity, false
     * otherwise
     */
    public final boolean makeChanceResult() {
        return effects.getStats("prop") == 100 || Randomizer.nextInt(100) < effects.getStats("prop");
    }

    public SkillStats getSkillStats() {
        return effects;
    }

    public final int getProb() {
        return effects.getStats("prop");
    }

    public final int getCr() {
        return effects.getStats("cr");
    }

    public final int getCriticalMin() {
        return effects.getStats("criticaldamageMin");
    }

    public final int getCriticalMax() {
        return effects.getStats("criticaldamageMax");
    }

    public final int getAttackX() {
        return effects.getStats("padX");
    }

    public boolean isPhantomSkill() {
        return sourceid / 1000000 == 24;
    }

    public boolean isMagicCrash() {
        return sourceid == 1111007 || sourceid == 1211009 || sourceid == 1311007 || sourceid == 11111008 || sourceid == 51111005;
    }

    public boolean isComboAttack() {
        return sourceid == 1101013 || sourceid == 11111001;
    }

    public boolean isSoulStone() {
        return sourceid == 22181003;
    }

    public boolean isTeleport() {
        switch (sourceid) {
            case 32001002:
            case 22101001:
            case 12101003:
            case 2301001:
            case 2201002:
            case 2101002:
                return true;
        }
        return false;
    }

    public boolean isSTEP() {
        switch (sourceid) {
            case 2201002:
                return true;
        }
        return false;
    }

    public boolean isStaticSummon() {
        switch (sourceid) {
            case 22141017:
            case 22170070:
            case 3211002:
            case 3111002:
            case 33111003:
            case 13111004:
            case 5211001:
            case 5220002:
            case 4341006:
            case 35111002:
            case 35111005:
            case 35111011:
            case 35121009:
            case 35121010:
            case 35121003:
            case 3120012:
            case 3220012:
            case 5321003:
            case 5321004:
            case 5320011:
            case 5211014:
            case 33101008:
            case 61111002:
            case 22171081:
            case 5321052:
            case 14121003:
            case 36121002: //홀로그램 그래피티 : 관통
            case 36121013: //홀로그램 그래피티 : 역장
            case 36121014: //홀로그램 그래피티 : 지원
            case 2111010:
                return true;
        }
        return false;
    }

    public boolean isInfinity() {
        switch (sourceid) {
            case 2121004:
            case 2221004:
            case 2321004:
                return true;
        }
        return false;
    }

    public boolean isSoulSkill() {
        switch (sourceid) {
            case 80001219:
            case 80001266:
            case 80001269:
            case 80001270:
            case 80001322:
            case 80001323:
            case 80001341:
            case 80001395:
            case 80001396:
            case 80001493:
            case 80001494:
            case 80001495:
            case 80001496:
            case 80001497:
            case 80001498:
            case 80001499:
            case 80001500:
            case 80001501:
            case 80001502:
                return true;
        }
        return false;
    }

    public boolean isDoubleDice(int id) {
        switch (id) {
            case 5120012:
            case 5220014:
            case 5320007:
            case 35120014:
                return true;
        }
        return false;
    }

    public static class CancelEffectAction implements Runnable {

        private final SkillStatEffect effect;
        private final WeakReference<MapleCharacter> target;
        private final long startTime;

        public CancelEffectAction(final MapleCharacter target, final SkillStatEffect effect, final long startTime) {
            this.effect = effect;
            this.target = new WeakReference<MapleCharacter>(target);
            this.startTime = startTime;
        }

        @Override
        public void run() {
            final MapleCharacter realTarget = target.get();
            if (realTarget != null && realTarget.getClient() != null) {
                realTarget.cancelEffect(effect, false, startTime);
            }
        }
    }

    public final byte getLevel() {
        return (byte) effects.getStats("level");
    }

    public final short getIgnoreMob() {
        return (short) effects.getStats("ignoreMob");
    }

    public final short getER() {
        return (short) effects.getStats("er");
    }

    public final int getPercentHP() {
        return effects.getStats("mhpR");
    }

    public final int getDAMRate() {
        return effects.getStats("damR");
    }

    public int getWDEFRate() {
        return effects.getStats("pddR");
    }

    public final int getLevelToWatk() {
        return effects.getStats("lv2pdX");
    }

    public final int getPercentMP() {
        return effects.getStats("mmpR");
    }

    public final int getLevelToMatk() {
        return effects.getStats("lv2mdX");
    }

    public final int getMPConsumeEff() {
        return effects.getStats("mpConEff");
    }

    public final int getPercentAcc() {
        return effects.getStats("accR");
    }

    public final int getPassiveSpeed() {
        return effects.getStats("psdSpeed");
    }

    public final int getPercentAvoid() {
        return effects.getStats("evaR");
    }

    public final int getPassiveJump() {
        return effects.getStats("psdJump");
    }

    public final int getLevelToDamage() {
        return effects.getStats("lv2damX");
    }

    public final int getSummonTimeInc() {
        return effects.getStats("summonTimeR");
    }

    public final int getEXPLossRate() {
        return effects.getStats("expLossReduceR");
    }

    public final int getASRRate() {
        return effects.getStats("asrR");
    }

    public final int getTERRate() {
        return effects.getStats("terR");
    }

    public final int getBuffTimeRate() {
        return effects.getStats("bufftimeR");
    }

    public final int getSuddenDeathR() {
        return effects.getStats("suddenDeathR");
    }

    public final int getCooltimeReduceR() {
        return effects.getStats("coolTimeR");
    }

    public final int getMesoAcquisition() {
        return effects.getStats("mesoR");
    }

    public final int getHpToDamage() {
        return effects.getStats("mhp2damX");
    }

    public final int getMpToDamage() {
        return effects.getStats("mmp2damX");
    }

    public final int getStrX() {
        return effects.getStats("strX");
    }

    public final int getDexX() {
        return effects.getStats("dexX");
    }

    public final int getIntX() {
        return effects.getStats("intX");
    }

    public final int getLukX() {
        return effects.getStats("lukX");
    }

    public final int getMaxHpX() {
        return effects.getStats("mhpX");
    }

    public final int getMaxMpX() {
        return effects.getStats("mmpX");
    }

    public final int getMagicX() {
        return effects.getStats("madX");
    }

    public int getBossDamage() {
        return effects.getStats("bdR");
    }

    public final int getPrice() {
        return effects.getStats("price");
    }

    public final int getExtendPrice() {
        return effects.getStats("extendPrice");
    }

    public final int getPeriod() {
        return effects.getStats("period");
    }

    public final int getReqGuildLevel() {
        return effects.getStats("reqGuildLevel");
    }

    public final int getKillingPoint() {
        return effects.getStats("kp");
    }

    public final byte getEXPRate() {
        return (byte) effects.getStats("expR");
    }

    public int getMDEFRate() {
        return effects.getStats("mddR");
    }

    public final int getLv2Mhp() {
        return effects.getStats("lv2mhp");
    }

    public final int getDOT() {
        return effects.getStats("dot");
    }

    public final int getTime() {
        return effects.getStats("time");
    }

    public final int getSoulMPCon() {
        return effects.getStats("soulmpCon");
    }

    public final int getComboCon() {
        return effects.getStats("aranComboCon");
    }

    public final int getRange() {
        return effects.getStats("range");
    }

    public final boolean isMistEruption() {
        switch (sourceid) {
            case 2121003:
                return skill;
        }
        return false;
    }

    public final void applyPassive(final MapleCharacter applyto, final MapleMapObject obj) {
        if (makeChanceResult()) {
            switch (sourceid) { // MP eater
                case 2100000:
                case 2200000:
                case 2300000:
                    if (obj == null || obj.getType() != MapleMapObjectType.MONSTER) {
                        return;
                    }
                    final MapleMonster mob = (MapleMonster) obj; // x is absorb percentage
                    if (!mob.getStats().isBoss()) {
                        final int absorbMp = Math.min((int) (mob.getMobMaxMp() * (getX() / 100.0)), mob.getMp());
                        if (absorbMp > 0) {
                            mob.setMp(mob.getMp() - absorbMp);
                            applyto.getStat().setMp(applyto.getStat().getMp() + absorbMp);
                            applyto.getClient().getSession().writeAndFlush(MainPacketCreator.showSkillEffect(-1, applyto.getLevel(), sourceid, level, (byte) 0, 1, null, null));
                            applyto.getMap().broadcastMessage(applyto, MainPacketCreator.showSkillEffect(applyto.getId(), applyto.getLevel(), sourceid, level, (byte) 0, 1, null, null), false);
                        }
                    }
                    break;
            }
        }
    }

    public final int getStackSkill() {
        return this.stackskill;
    }

    public final int getMhpX() {
        return this.mhpX;
    }

    public final int getMhpR() {
        return this.mhpR;
    }

    public final int getMmpX() {
        return this.mmpX;
    }

    public final int getMmpR() {
        return this.mmpR;
    }

    public final int getLv2Mmp() {
        return this.lv2mmp;
    }

    public final double getHpR() {
        return this.hpR;
    }

    public final double getMpR() {
        return this.mpR;
    }

    public final int getStat(String pr) {
        return effects.getStats(pr);
    }

    public final void setStat(String pr, int value) {
        this.effects.setStats(pr, value);
    }

    public int dotDamage(int minattack) {
        float multiplier = getDOT();
        return (Randomizer.rand((int) (minattack * multiplier), (int) ((minattack * 1.5) * multiplier))) / 200;
    }

    public static int parseEval(String data, int level) {
        String variables = "x";
        String dddd = data.replace(variables, String.valueOf(level));
        if (dddd.substring(0, 1).equals("-")) { //-30+3*x
            if (dddd.substring(1, 2).equals("u") || dddd.substring(1, 2).equals("d")) { //-u(x/2)
                dddd = "n(" + dddd.substring(1, dddd.length()) + ")"; //n(u(x/2))
            } else {
                dddd = "n" + dddd.substring(1, dddd.length()); //n30+3*x
            }
        } else if (dddd.substring(0, 1).equals("=")) { //lol nexon and their mistakes
            dddd = dddd.substring(1, dddd.length());
        }
        return (int) (new CaltechEval(dddd).evaluate());
    }

    public final void applyComboBuff(final MapleCharacter applyto, short combo) { // 치우씨 :: 아란 applyComboBuff 시도
        final List<Triple<BuffStats, Integer, Boolean>> stat = Collections.singletonList(new Triple<BuffStats, Integer, Boolean>(BuffStats.CTS_ComboAbilityBuff, (int) combo, false));
        applyto.getClient().getSession().write(MainPacketCreator.giveBuff(sourceid, 99999, stat, this, null, SkillFactory.getSkill(sourceid).getAnimationTime())); // Hackish timing, todo find out

        final long starttime = System.currentTimeMillis();
        applyto.registerEffect(this, starttime, null);
    }

    public final boolean isExceed(int skill) {
        switch (skill) {
            case 31011000: // 익시드 : 더블 슬래시
            case 31010004:
            case 31010005:
            case 31010006:
            case 31010007:
                return true;

            case 31201000: // 익시드 : 데몬 스트라이크
            case 31201007:
            case 31201008:
            case 31201009:
            case 31201010:
                return true;

            case 31211000: // 익시드 : 문라이트 슬래시
            case 31211007:
            case 31211008:
            case 31211009:
            case 31211010:
                return true;

            case 31221000: // 익시드 : 엑스큐션
            case 31221009:
            case 31221010:
            case 31221011:
            case 31221012:
                return true;
        }
        return false;
    }

    public final Rectangle calulateRoundingBox(final Point pos) {
        return new Rectangle(pos.x, pos.y, 200, 100);
    }

    public final int getLocalDuraction(final MapleCharacter applyfrom) {
        return alchemistModifyVal(applyfrom, getTime(), false);
    }

    public final Point getRb() {
        return rb;
    }

    public final Point getLt() {
        return lt;
    }
}
