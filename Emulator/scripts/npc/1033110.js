/*
���� : ������(skymin0307)
*/
/**
������� ���� NPC
**/
var status = 0;
var musicplayer

function start() {
 status = -1;
 action(1, 0, 0);
}

function action(mode, type, selection) {
 if (mode == -1) {
  cm.dispose();
 } else {
 if (mode == 0) {
  cm.sendOk("#fn����#��ĩ��!");
  cm.dispose();
 }
  status++;
  if(status == 0) {
  //cm.sendSimple("�Ǥ�");
   cm.sendSimple ("#fn������� Extrabold##fs13# BGM 1ȸ����� Ȳ�ݻ���ǳ��30�� �Ҹ�˴ϴ١�\r\n   ����� BGM�� ��ο��� ����˴ϴ� #n\r\n#b#L0# �ñ׳ʽ��� ����#I\r\n#I#L1# �������������� ��\r\n#I#L2# Ŭ�ι� ���� ���\r\n#I#L3# �߿� ���� ����\r\n#I#L4# �۸�����ž ������\r\n#I#L5# ���̱�\r\n#I#L6# �����Ͼ� �����\r\n#I#L7# �߷� ����\r\n#I#L8# ��׽ý� ���� �����\r\n#I#L9# �丮�� ����\r\n#I#L10# Ŀ�׽�Ƽ\r\n#I#L11# �����Ͼ� ����\r\n#I#L12# �����Ͼ�\r\n#I#L13# �̺���̱�\r\n#I#L14# Ŀ�׽�Ƽ ��Ƽ����Ʈ\r\n#I#L15# �����ױ�\r\n#I#L16# Ŀ�׽�Ƽ ����ö\r\n#I#L17# �����ױ�\r\n#I#L18# Ŀ�׽�Ƽ ������\r\n#I#L19# �÷θ�����ġ\r\n#I#L20# ������\r\n#I#L21# �����\r\n#I#L22# �ູ�Ѹ���\r\n#I#L23# ������\r\n#I#L24# ũ�����߷� ����\r\n#I#L25# ������\r\n#I#L26# ������ �����\r\n#I#L27# ������ ����\r\n#I#L28# ���̱�2\r\n#I#L29# ��\r\n#I#L30# �÷��� ����\r\n#I#L31# �������� ���ϴ� ��\r\n#I#L32# ���� ����\r\n#I#L33# ������ ����\r\n#I#L34# ������ ž\r\n#I#L35# ���긮�� ����\r\n#I#L36# ���긮��\r\n#I#L37# �峭�� ����\r\n#I#L38# �ð��� �ҿ뵹��\r\n#I#L39# ������ ž ����\r\n#I#L40# ������ ž �ܺ�\r\n#I#L41# ���긮�� ��Ƽ����Ʈ\r\n#I#L42# ������������\r\n#I#L43# �ݳ���\r\n#I#L44# ��� �ʿ�\r\n#I#L45# �ν��� �ʿ�\r\n#I#L46# �����Ƚ�#I\r\n#I#L47# ž�� ����#I\r\n#I#L48# �ð��� �տ�#I\r\n#I#L49# ������ �ð��� ��#I\r\n#I#L50# ������ �ð��� ��2#I\r\n#I#L51# ��Ǯ������ & ī�Ϲ�#I\r\n#I#L52# ��Ʋ�� �ð��� ��#I\r\n#I#L53# ��Ʋ�� �ð��� ��2#I\r\n#I#L54# Ÿ���佺#I\r\n#I#L55# ����ƮŰ��#I\r\n#I#L56# ������#I\r\n#I#L57# ����Ƹ��� �����#I\r\n#I#L58# ����Ƹ���#I\r\n#I#L59# ����Ƹ��� �����2#I\r\n#I#L60# �Ʒ�����#I\r\n#I#L61# ���#I\r\n#I#L62# �Ǿƴ���#I\r\n#I#L63# ����Ƹ��� ����#I\r\n#I#L64# ��콺�丮\r\n#I#L65# �볭��#I\r\n#I#L66# �������� ����#I\r\n#I#L67# ����Ƽ��#I\r\n#I#L68# ��ũŸ��#I\r\n#I#L69# ������#I\r\n#I#L70# ������ �����#I\r\n#I#L71# ������ ����\r\n#I#L72# ������ ž\r\n#I#L73# �Ƹ���Ʈ ������\r\n#I#L74# ���� ��\r\n#I#L75# ȥ����\r\n#I#L76# ȥ������ ����\r\n#I#L77# ���� ����\r\n#I#L78# �Ƹ���Ʈ\r\n#I#L79# �Ƹ���Ʈ �����\r\n#I#L82# ���� ����\r\n#I#L83# ������ �ұ�\r\n#I#L84# �Ƹ���Ʈ ������\r\n#I#L85# ��ƿ���� ������\r\n#I#L86# ��ƿ����ȣ ����\r\n#I#L87# ������\r\n#I#L89# ���������ؼ�\r\n#I#L90# ���������ؼ�������\r\n#I#L91# �ҷ���\r\n#I#L92# ��ȥ ��\r\n#I#L93# ����������\r\n#I#L94# ���� ��\r\n#I#L95# ����\r\n#I#L96# ����2\r\n#I#L100# ��Ƽ��Ǽ�\r\n#I#L722# Dolphin Noon\r\n#I#L723# Wich Tower\r\n#I#L724# Dolphin Night\r\n#I#L725# �ҷ�����Ƽ\r\n#I#L726# �ڵ�����׽�Ʈ\r\n#I#L727# MapleHighSchool\r\n#I#L728# kiteBgm\r\n#I#L729# tenthBoard\r\n#I#L730# rhythmBgm1\r\n#I#L731# rhythmBgm2\r\n#I#L117# Ÿ��Ʋ#I");
  } else if(status == 1) {
musicplayer = cm.getChar().getName();
    if (selection == 0) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm25/CygnusGarden");
     cm.sendOk("#fMap/MapHelper.img/mark/darkEreb##e �ñ׳ʽ��� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ñ׳ʽ��� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 1) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm27/AngelsRoom");
     cm.sendOk("#fMap/MapHelper.img/mark/Pantheon##e �������������� �� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������������� ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 2) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/risingStar");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e Ŭ�ι� ���� ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� Ŭ�ι� ���� ������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 3) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm34/MoleKingRises");
     cm.sendOk("#fMap/MapHelper.img/mark/fairyAcademy##e �߿� ���� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �߿� ���� ����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 4) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/FunnyTimeMaker");
     cm.sendOk("#fMap/MapHelper.img/mark/LudiTower1##e �۸�����ž ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �۸�����ž ���������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 5) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/AncientMove");
     cm.sendOk("#fMap/MapHelper.img/mark/Dungeon##e ���̱� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���̱��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 6) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/MoonlightShadow");
     cm.sendOk("#fMap/MapHelper.img/mark/Ellinia##e �����Ͼ� ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��׽ý� ���� ����ͷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 7) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/WhereTheBarlogFrom");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e �߷� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �߷� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 8) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/CavaBien");
     cm.sendOk("#fMap/MapHelper.img/mark/Henesys##e ��׽ý� ���� ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��׽ý� ���� ����ͷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 9) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/HighlandStar");
     cm.sendOk("#fMap/MapHelper.img/mark/Perion##e ��׽ý� ���� ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��׽ý� ���� ����ͷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 10) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/BadGuys");
     cm.sendOk("#fMap/MapHelper.img/mark/KerningCity##e Ŀ�׽�Ƽ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� Ŀ�׽�Ƽ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 11) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/MissingYou");
     cm.sendOk("#fMap/MapHelper.img/mark/Ellinia##e �����Ͼ� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �����Ͼ� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 12) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/WhenTheMorningComes");
     cm.sendOk("#fMap/MapHelper.img/mark/Ellinia##e �����Ͼ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �����ϾƷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 13) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/EvilEyes");
     cm.sendOk("#fMap/MapHelper.img/mark/Dungeon##e �̺���̱��� ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� �̺���̱��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 14) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/JungleBook");
     cm.sendOk("#fMap/MapHelper.img/mark/KerningParty##e Ŀ�׽�Ƽ ��Ƽ����Ʈ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� Ŀ�׽�Ƽ ��Ƽ����Ʈ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 15) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/AboveTheTreetops");
     cm.sendOk("#fMap/MapHelper.img/mark/Rith##e �����ױ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �����ױ��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 16) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/Subway");
     cm.sendOk("#fMap/MapHelper.img/mark/KerningCity##e Ŀ�׽�Ƽ ����ö ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� Ŀ�׽�Ƽ ����ö�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 17) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/Elfwood");
     cm.sendOk("#fMap/MapHelper.img/mark/Rith##e �����ױ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �����ױ��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 18) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/BlueSky");
     cm.sendOk("#fMap/MapHelper.img/mark/KerningCity##e Ŀ�׽�Ƽ ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� Ŀ�׽�Ƽ �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 19) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/Beachway");
     cm.sendOk("#fMap/MapHelper.img/mark/SouthPerry##e �÷θ�����ġ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �÷θ��� ��ġ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 20) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/SnowyVillage");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNath##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 21) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/PlayWithMe");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 22) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/WhiteChristmas");
     cm.sendOk("#fMap/MapHelper.img/mark/HappyVillage##e �ູ�Ѹ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ູ�Ѹ����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 23) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/UponTheSky");
     cm.sendOk("#fMap/MapHelper.img/mark/Orbis##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 24) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/ArabPirate");
     cm.sendOk("#fMap/MapHelper.img/mark/Orbis##e ũ�����߷� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ũ�����߷� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 25) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/Shinin'Harbor");
     cm.sendOk("#fMap/MapHelper.img/mark/Orbis##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �����񽺷� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 26) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/WarmRegard");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNath##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 27) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/WolfWood");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e ������ ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 28) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/DownToTheCave");
     cm.sendOk("#fMap/MapHelper.img/mark/Dungeon##e ���̱�2 ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���̱�2�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 29) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/AbandonedMine");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e �� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 30) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/MineQuest");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e �÷��� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �÷��� ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 31) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/HellGate");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e �������� ���ϴ¹� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� ���ϴ¹� ���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 32) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/FinalFight");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e ���� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 33) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/WelcomeToTheHell");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e ������ ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 34) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/ComeWithMe");
     cm.sendOk("#fMap/MapHelper.img/mark/GoddessTower##e ������ ž ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ ž���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 35) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/FlyingInABlueDream");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e ���긮�� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���긮�� ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 36) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/FantasticThinking");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e ���긮�� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���긮������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 37) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/WaltzForWork");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e �峭�� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �峭�� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 38) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/WhereverYouAre");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e �ð��� �ҿ뵹���� ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ð��� �ҿ뵹�̷� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 39) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/FunnyTimeMaker");
     cm.sendOk("#fMap/MapHelper.img/mark/LudiTower1##e ������ ž ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ ž ���� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 40) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/HighEnough");
     cm.sendOk("#fMap/MapHelper.img/mark/LudiTower1##e ������ ž �ܺ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������������� ž �ܺη� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 41) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/Fantasia");
     cm.sendOk("#fMap/MapHelper.img/mark/AbandonTower##e ���긮�� ��Ƽ����Ʈ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���긮�� ��Ƽ����Ʈ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 42) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/LetsMarch");
     cm.sendOk("#fMap/MapHelper.img/mark/OmegaSector##e ������������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �����������η� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 43) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/ForTheGlory");
     cm.sendOk("#fMap/MapHelper.img/mark/OmegaSector##e �ݳ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ݳ���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 44) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/FindingForest");
     cm.sendOk("#fMap/MapHelper.img/mark/OmegaSector##e ��� �ʿ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��� �ʿ����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 45) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/LetsHuntAliens");
     cm.sendOk("#fMap/MapHelper.img/mark/OmegaSector##e �ν��� �ʿ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ν��� �ʿ����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 46) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/PlotOfPixie");
     cm.sendOk("#fMap/MapHelper.img/mark/GoddessTower##e �����Ƚ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �����Ƚ÷� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 47) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/DarkShadow");
     cm.sendOk("#fMap/MapHelper.img/mark/AbandonTower##e ž�� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ž�� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 48) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/TheyMenacingYou");
     cm.sendOk("#fMap/MapHelper.img/mark/AbandonTower##e �ð��� �տ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ð��� �տ��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 49) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/FairyTale");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e ������ �ð��� �� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ �ð��� ��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 50) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/FairyTalediffvers");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e ������ �ð��� ��2 ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ �ð��� ��2�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 51) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/TimeAttack");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e ��Ǯ������ & ī�Ϲ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��Ǯ������ & ī�Ϲ߷� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 52) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/Timeless");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e ��Ʋ�� �ð��� �� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��Ʋ�� �ð��� ��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 53) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/TimelessB");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e ��Ʋ�� �ð��� ��2 ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��Ʋ�� �ð��� ��2�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 54) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/BizarreTales");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e Ÿ���佺 ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� Ÿ���佺�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 55) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/TheWayGrotesque");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e ����ƮŰ�� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ����ƮŰ�۷� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 56) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/Eregos");
     cm.sendOk("#fMap/MapHelper.img/mark/Guild##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 57) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/BlueWorld");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e ����Ƹ��� ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ����Ƹ��� ����ͷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 58) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/Aquarium");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e ����Ƹ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ����Ƹ���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 59) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/ShiningSea");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e ����Ƹ��� ����� 2 ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ����Ƹ��� ����� 2�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 60) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/DownTown");
     cm.sendOk("#fMap/MapHelper.img/mark/Folkvillige##e �Ʒ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ʒ������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 61) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/DarkMountain");
     cm.sendOk("#fMap/MapHelper.img/mark/Folkvillige##e ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 62) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm12/AquaCave");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e �Ǿƴ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ǿƴ����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 63) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm12/DeepSee");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e ����Ƹ��� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ����Ƹ��� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 64) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm00/GoPicnic");
     cm.sendOk("#fMap/MapHelper.img/mark/SouthPerry##e ��콺�丮 ������ ����˴ϴٴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��콺�丮�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 65) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm24/battleBGMTypeD");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e �볭�� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �볭���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 66) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm12/RuinCastle");
     cm.sendOk("#fMap/MapHelper.img/mark/Guild##e �������� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� ���·� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 67) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm12/Dispute");
     cm.sendOk("#fMap/MapHelper.img/mark/Magatia##e ����Ƽ�� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ����Ƽ�Ʒ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 68) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/CokeTown");
     cm.sendOk("#fMap/MapHelper.img/mark/CokeTown##e ��ũŸ�� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��ũŸ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 69) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/Leafre");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 70) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/Minar'sDream");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e ������ ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ ����ͷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 71) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/AcientForest");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 72) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/TowerOfGoddess");
     cm.sendOk("#fMap/MapHelper.img/mark/GoddessTower##e ������ ž ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ ž���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 73) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/FightSand");
     cm.sendOk("#fMap/MapHelper.img/mark/Ariant##e �Ƹ���Ʈ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ƹ���Ʈ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 74) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/DragonLoad");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e ���� �� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���� ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 75) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/HonTale");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e ȥ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ȥ�������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 76) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/CaveOfHontale");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e ȥ������ ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ȥ������ ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 77) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/DragonNest");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e ���� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���� ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 78) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/Ariant");
     cm.sendOk("#fMap/MapHelper.img/mark/Ariant##e �Ƹ���Ʈ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ƹ���Ʈ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 79) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/HotDesert");
     cm.sendOk("#fMap/MapHelper.img/mark/Ariant##e �Ƹ���Ʈ ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ƹ���Ʈ ����ͷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 80) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/MureungHill");
     cm.sendOk("#fMap/MapHelper.img/mark/Mureung##e ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 81) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/MureungForest");
     cm.sendOk("#fMap/MapHelper.img/mark/Mureung##e ���� ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��������ͷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 82) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/WhiteHerb");
     cm.sendOk("#fMap/MapHelper.img/mark/WhiteHerb##e ���ʸ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���ʸ����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 83) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/Pirate");
     cm.sendOk("#fMap/MapHelper.img/mark/DevijonParty##e ������ �ұ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ �ұ��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 84) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/SunsetDesert");
     cm.sendOk("#fMap/MapHelper.img/mark/Ariant##e �Ƹ���Ʈ ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ƹ���Ʈ ���������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 85) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/Nautilus");
     cm.sendOk("#fMap/MapHelper.img/mark/Nautilus##e ��ƿ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��ƿ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 86) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/inNautilus");
     cm.sendOk("#fMap/MapHelper.img/mark/Nautilus##e ��ƿ����ȣ ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��ƿ����ȣ ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 87) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/ElinForest");
     cm.sendOk("#fMap/MapHelper.img/mark/ElinForest##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 88) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/PoisonForest");
     cm.sendOk("#fMap/MapHelper.img/mark/ElinForest##e ������ �� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ ���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 89) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/FunnyRabbit");
     cm.sendOk("#fMap/MapHelper.img/mark/Event##e ������ ���ؼ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ ���ؼ��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 90) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/FunnyRabbitFaster");
     cm.sendOk("#fMap/MapHelper.img/mark/Event##e ���������ؼ� ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���������ؼ� �����Է� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }    } else if (selection == 91) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/halloweenMainHall");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e �ҷ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ҷ������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 92) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/weddingDance");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e ��ȥ �� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��ȥ ���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 93) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/amoria");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e ���������� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 94) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/chapel");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e ������ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 95) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/cathedral");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �������� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 96) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/cathedral");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e ���� 2 ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���� 2�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 97) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/NLCupbeat");
     cm.sendOk("#fMap/MapHelper.img/mark/NLC##e ��������Ƽ ����Ʈ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��������Ƽ ����Ʈ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 98) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/NLChunt");
     cm.sendOk("#fMap/MapHelper.img/mark/NLC##e ��������Ƽ ����� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��������Ƽ ����ͷ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 99) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/NLCtown");
     cm.sendOk("#fMap/MapHelper.img/mark/NLC##e ��������Ƽ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��������Ƽ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 100) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/HauntedHouse");
     cm.sendOk("#fMap/MapHelper.img/mark/HuntedMansion##e ��Ƽ�� �Ǽ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��Ƽ�� �Ǽ����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 101) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/CrimsonwoodKeep");
     cm.sendOk("#fMap/MapHelper.img/mark/Crimsonwood##e ũ������� Ű�� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ũ������� Ű���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 102) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/Bigfoot");
     cm.sendOk("#fMap/MapHelper.img/mark/Crimsonwood##e �Ŵ��ѹ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ŵ��ѹ߷� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 103) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/PhantomForest");
     cm.sendOk("#fMap/MapHelper.img/mark/Crimsonwood##e ������ �� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ������ ���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 104) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/Feeling");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e �Ϻ� �����Ż� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ϻ� �����Ż�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 105) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/BizarreForest");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e �Ϻ� ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ϻ� ������ �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 106) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/Hana");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e �Ϻ� �ϳ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ϻ� �ϳ��� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 107) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/Yume");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e �Ϻ� Ʈ��Ʈ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ϻ� Ʈ��Ʈ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 108) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/Bathroom");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e �Ϻ� ȭ��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ϻ� ȭ��Ƿ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 109) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/BattleField");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e �Ϻ� ��Ʋ�ʵ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ϻ� ��Ʋ�ʵ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 110) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/FirstStepMaster");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e �Ϻ� ù���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �Ϻ� ù���Ƿ� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 111) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/CBD_town");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e �̰��� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �̰����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 112) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/CBD_field");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e �̰��� �ʵ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �̰��� �ʵ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 113) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/BoatQuay_field");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e ��Ʈ���� �ʵ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��Ʈ���� �ʵ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 114) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/Ghostship");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e ���ɼ� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ���ɼ����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 115) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/BoatQuay_town");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e ��Ʈ���� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ��Ʈ���̷� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 116) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmUI/ShopBgm");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e ĳ�ü� ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� ĳ�ü����� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }

} else if (selection == 722) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/dolphin_noon");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e dolphin_noon ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� dolphin_noon���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 723) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/wichTower");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e wichTower ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� wichTower���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 724) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/dolphin_night");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e dolphin_night ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� dolphin_night���� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 725) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/halloweenParty");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e �ҷ�����Ƽ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ҷ�����Ƽ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 726) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/coordiKing");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e �ڵ�����׽�Ʈ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� �ڵ�����׽�Ʈ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 727) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmTW/MapleHighSchool");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e MapleHighSchool ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� MapleHighSchool�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 728) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/kiteBgm");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e kiteBgm ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� kiteBgm�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 729) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/tenthBoard");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e tenthBoard ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� tenthBoard�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 730) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/rhythmBgm1");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e rhythmBgm1 ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� rhythmBgm1�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
} else if (selection == 731) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/rhythmBgm2");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e rhythmBgm2 ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� rhythmBgm2�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
    } else if (selection == 117) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmUI/Title");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e Ÿ��Ʋ ������ ����˴ϴ�.");
     cm.mapMessage("[BGM����] "+ musicplayer +"���� ��������� Ÿ��Ʋ�� �ٲټ̽��ϴ�.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30���� ������ ��������� �ٲٽǼ� �����ϴ�.");
     cm.dispose();
    }
   }
  }
 }
}