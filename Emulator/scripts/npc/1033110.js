/*
제작 : 엘리뚜(skymin0307)
*/
/**
배경음악 변경 NPC
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
  cm.sendOk("#fn바탕#흥칫뿡!");
  cm.dispose();
 }
  status++;
  if(status == 0) {
  //cm.sendSimple("ㅗㅗ");
   cm.sendSimple ("#fn나눔고딕 Extrabold##fs13# BGM 1회변경당 황금색단풍잎30개 소모됩니다★\r\n   변경된 BGM은 모두에게 적용됩니다 #n\r\n#b#L0# 시그너스의 전당#I\r\n#I#L1# 엔젤릭버스터의 방\r\n#I#L2# 클로버 전용 브금\r\n#I#L3# 야외 연극 무대\r\n#I#L4# 핼리오스탑 도서관\r\n#I#L5# 개미굴\r\n#I#L6# 엘리니아 사냥터\r\n#I#L7# 발록 출현\r\n#I#L8# 헤네시스 서쪽 사냥터\r\n#I#L9# 페리온 던전\r\n#I#L10# 커닝시티\r\n#I#L11# 엘리니아 던전\r\n#I#L12# 엘리니아\r\n#I#L13# 이블아이굴\r\n#I#L14# 커닝시티 파티퀘스트\r\n#I#L15# 리스항구\r\n#I#L16# 커닝시티 지하철\r\n#I#L17# 리스항구\r\n#I#L18# 커닝시티 니은숲\r\n#I#L19# 플로리나비치\r\n#I#L20# 엘나스\r\n#I#L21# 놀아줘\r\n#I#L22# 행복한마을\r\n#I#L23# 항해중\r\n#I#L24# 크림슨발록 습격\r\n#I#L25# 오르비스\r\n#I#L26# 엘나스 사냥터\r\n#I#L27# 늑대의 영역\r\n#I#L28# 개미굴2\r\n#I#L29# 폐광\r\n#I#L30# 시련의 동굴\r\n#I#L31# 자쿰으로 통하는 문\r\n#I#L32# 자쿰 전투\r\n#I#L33# 자쿰의 제단\r\n#I#L34# 오르비스 탑\r\n#I#L35# 루디브리엄 기차\r\n#I#L36# 루디브리엄\r\n#I#L37# 장난감 공정\r\n#I#L38# 시간의 소용돌이\r\n#I#L39# 에오스 탑 내부\r\n#I#L40# 에오스 탑 외부\r\n#I#L41# 루디브리엄 파티퀘스트\r\n#I#L42# 지구방위본부\r\n#I#L43# 격납고\r\n#I#L44# 쿨란 초원\r\n#I#L45# 로스웰 초원\r\n#I#L46# 파파픽시#I\r\n#I#L47# 탑의 암흑#I\r\n#I#L48# 시공의 균열#I\r\n#I#L49# 잊혀진 시간의 길#I\r\n#I#L50# 잊혀진 시간의 길2#I\r\n#I#L51# 파풀라투스 & 카니발#I\r\n#I#L52# 뒤틀린 시간의 길#I\r\n#I#L53# 뒤틀린 시간의 길2#I\r\n#I#L54# 타나토스#I\r\n#I#L55# 게이트키퍼#I\r\n#I#L56# 에레고스#I\r\n#I#L57# 아쿠아리움 사냥터#I\r\n#I#L58# 아쿠아리움#I\r\n#I#L59# 아쿠아리움 사냥터2#I\r\n#I#L60# 아랫마을#I\r\n#I#L61# 까막산#I\r\n#I#L62# 피아누스#I\r\n#I#L63# 아쿠아리움 던전#I\r\n#I#L64# 사우스페리\r\n#I#L65# 대난투#I\r\n#I#L66# 에레고스의 왕좌#I\r\n#I#L67# 마가티아#I\r\n#I#L68# 코크타운#I\r\n#I#L69# 리프레#I\r\n#I#L70# 리프레 사냥터#I\r\n#I#L71# 리프레 전장\r\n#I#L72# 여신의 탑\r\n#I#L73# 아리안트 투기장\r\n#I#L74# 용의 숲\r\n#I#L75# 혼테일\r\n#I#L76# 혼테일의 동굴\r\n#I#L77# 용의 둥지\r\n#I#L78# 아리안트\r\n#I#L79# 아리안트 사냥터\r\n#I#L82# 백초 마을\r\n#I#L83# 해적의 소굴\r\n#I#L84# 아리안트 해질녘\r\n#I#L85# 노틸러스 선착장\r\n#I#L86# 노틸러스호 복도\r\n#I#L87# 엘린숲\r\n#I#L89# 고지를향해서\r\n#I#L90# 고지를향해서빠르게\r\n#I#L91# 할로윈\r\n#I#L92# 결혼 댄스\r\n#I#L93# 웨딩빌리지\r\n#I#L94# 웨딩 댄스\r\n#I#L95# 웨딩\r\n#I#L96# 웨딩2\r\n#I#L100# 헌티드맨션\r\n#I#L722# Dolphin Noon\r\n#I#L723# Wich Tower\r\n#I#L724# Dolphin Night\r\n#I#L725# 할로윈파티\r\n#I#L726# 코디왕콘테스트\r\n#I#L727# MapleHighSchool\r\n#I#L728# kiteBgm\r\n#I#L729# tenthBoard\r\n#I#L730# rhythmBgm1\r\n#I#L731# rhythmBgm2\r\n#I#L117# 타이틀#I");
  } else if(status == 1) {
musicplayer = cm.getChar().getName();
    if (selection == 0) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm25/CygnusGarden");
     cm.sendOk("#fMap/MapHelper.img/mark/darkEreb##e 시그너스의 전당 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 시그너스의 전당으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 1) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm27/AngelsRoom");
     cm.sendOk("#fMap/MapHelper.img/mark/Pantheon##e 엔젤릭버스터의 방 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 엔젤릭버스터의 방으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 2) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/risingStar");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e 클로버 전용 브금 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 클로버 전용 브금으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 3) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm34/MoleKingRises");
     cm.sendOk("#fMap/MapHelper.img/mark/fairyAcademy##e 야외 연극 무대 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 야외 연극 무대로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 4) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/FunnyTimeMaker");
     cm.sendOk("#fMap/MapHelper.img/mark/LudiTower1##e 핼리오스탑 도서관 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 핼리오스탑 도서관으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 5) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/AncientMove");
     cm.sendOk("#fMap/MapHelper.img/mark/Dungeon##e 개미굴 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 개미굴로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 6) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/MoonlightShadow");
     cm.sendOk("#fMap/MapHelper.img/mark/Ellinia##e 엘리니아 사냥터 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 헤네시스 동쪽 사냥터로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 7) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/WhereTheBarlogFrom");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e 발록 출현 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 발록 출현으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 8) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/CavaBien");
     cm.sendOk("#fMap/MapHelper.img/mark/Henesys##e 헤네시스 서쪽 사냥터 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 헤네시스 서쪽 사냥터로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 9) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/HighlandStar");
     cm.sendOk("#fMap/MapHelper.img/mark/Perion##e 헤네시스 동쪽 사냥터 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 헤네시스 동쪽 사냥터로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 10) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm01/BadGuys");
     cm.sendOk("#fMap/MapHelper.img/mark/KerningCity##e 커닝시티 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 커닝시티로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 11) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/MissingYou");
     cm.sendOk("#fMap/MapHelper.img/mark/Ellinia##e 엘리니아 던전 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 엘리니아 던전으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 12) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/WhenTheMorningComes");
     cm.sendOk("#fMap/MapHelper.img/mark/Ellinia##e 엘리니아 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 엘리니아로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 13) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/EvilEyes");
     cm.sendOk("#fMap/MapHelper.img/mark/Dungeon##e 이블아이굴이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 이블아이굴로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 14) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/JungleBook");
     cm.sendOk("#fMap/MapHelper.img/mark/KerningParty##e 커닝시티 파티퀘스트 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 커닝시티 파티퀘스트로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 15) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm02/AboveTheTreetops");
     cm.sendOk("#fMap/MapHelper.img/mark/Rith##e 리스항구 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 리스항구로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 16) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/Subway");
     cm.sendOk("#fMap/MapHelper.img/mark/KerningCity##e 커닝시티 지하철 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 커닝시티 지하철로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 17) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/Elfwood");
     cm.sendOk("#fMap/MapHelper.img/mark/Rith##e 리스항구 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 리스항구로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 18) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/BlueSky");
     cm.sendOk("#fMap/MapHelper.img/mark/KerningCity##e 커닝시티 니은숲 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 커닝시티 니은숲로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 19) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/Beachway");
     cm.sendOk("#fMap/MapHelper.img/mark/SouthPerry##e 플로리나비치 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 플로리나 비치로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 20) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm03/SnowyVillage");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNath##e 엘나스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 엘나스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 21) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/PlayWithMe");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e 놀아줘 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 놀아줘로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 22) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/WhiteChristmas");
     cm.sendOk("#fMap/MapHelper.img/mark/HappyVillage##e 행복한마을 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 행복한마을로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 23) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/UponTheSky");
     cm.sendOk("#fMap/MapHelper.img/mark/Orbis##e 항해중 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 항해중으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 24) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/ArabPirate");
     cm.sendOk("#fMap/MapHelper.img/mark/Orbis##e 크림슨발록 습격 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 크림슨발록 습격으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 25) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/Shinin'Harbor");
     cm.sendOk("#fMap/MapHelper.img/mark/Orbis##e 오르비스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 오르비스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 26) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm04/WarmRegard");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNath##e 엘나스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 엘나스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 27) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/WolfWood");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e 늑대의 영역 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 늑대의 영역으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 28) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/DownToTheCave");
     cm.sendOk("#fMap/MapHelper.img/mark/Dungeon##e 개미굴2 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 개미굴2로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 29) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/AbandonedMine");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e 폐광 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 폐광으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 30) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/MineQuest");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e 시련의 동굴 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 시련의 동굴로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 31) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm05/HellGate");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e 자쿰으로 통하는문 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 자쿰으로 통하는문 으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 32) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/FinalFight");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e 자쿰 전투 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 자쿰전투로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 33) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/WelcomeToTheHell");
     cm.sendOk("#fMap/MapHelper.img/mark/ElNathDungeon##e 자쿰의 제단 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 자쿰의 제단으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 34) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/ComeWithMe");
     cm.sendOk("#fMap/MapHelper.img/mark/GoddessTower##e 오르비스 탑 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 오르비스 탑으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 35) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/FlyingInABlueDream");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 루디브리엄 기차 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 루디브리엄 기차로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 36) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm06/FantasticThinking");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 루디브리엄 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 루디브리엄으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 37) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/WaltzForWork");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 장난감 공정 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 장난감 공정으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 38) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/WhereverYouAre");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 시간의 소용돌이이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 시간의 소용돌이로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 39) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/FunnyTimeMaker");
     cm.sendOk("#fMap/MapHelper.img/mark/LudiTower1##e 에오스 탑 내부 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 에오스 탑 내부 음악으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 40) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/HighEnough");
     cm.sendOk("#fMap/MapHelper.img/mark/LudiTower1##e 에오스 탑 외부 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을에오스 탑 외부로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 41) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm07/Fantasia");
     cm.sendOk("#fMap/MapHelper.img/mark/AbandonTower##e 루디브리엄 파티퀘스트 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 루디브리엄 파티퀘스트로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 42) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/LetsMarch");
     cm.sendOk("#fMap/MapHelper.img/mark/OmegaSector##e 지구방위본부 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 지구방위본부로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 43) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/ForTheGlory");
     cm.sendOk("#fMap/MapHelper.img/mark/OmegaSector##e 격납고 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 격납고로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 44) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/FindingForest");
     cm.sendOk("#fMap/MapHelper.img/mark/OmegaSector##e 쿨란 초원 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 쿨란 초원으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 45) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/LetsHuntAliens");
     cm.sendOk("#fMap/MapHelper.img/mark/OmegaSector##e 로스웰 초원 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 로스웰 초원으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 46) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm08/PlotOfPixie");
     cm.sendOk("#fMap/MapHelper.img/mark/GoddessTower##e 파파픽시 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 파파픽시로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 47) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/DarkShadow");
     cm.sendOk("#fMap/MapHelper.img/mark/AbandonTower##e 탑의 암흑 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 탑의 암흑으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 48) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/TheyMenacingYou");
     cm.sendOk("#fMap/MapHelper.img/mark/AbandonTower##e 시공의 균열 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 시공의 균열로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 49) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/FairyTale");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 잊혀진 시간의 길 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 잊혀진 시간의 길로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 50) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/FairyTalediffvers");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 잊혀진 시간의 길2 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 잊혀진 시간의 길2로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 51) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm09/TimeAttack");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 파풀라투스 & 카니발 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 파풀라투스 & 카니발로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 52) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/Timeless");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 뒤틀린 시간의 길 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 뒤틀린 시간의 길로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 53) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/TimelessB");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 뒤틀린 시간의 길2 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 뒤틀린 시간의 길2로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 54) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/BizarreTales");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 타나토스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 타나토스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 55) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/TheWayGrotesque");
     cm.sendOk("#fMap/MapHelper.img/mark/Ludibrium##e 게이트키퍼 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 게이트키퍼로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 56) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm10/Eregos");
     cm.sendOk("#fMap/MapHelper.img/mark/Guild##e 에레고스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 에레고스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 57) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/BlueWorld");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e 아쿠아리움 사냥터 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아쿠아리움 사냥터로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 58) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/Aquarium");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e 아쿠아리움 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아쿠아리움로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 59) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/ShiningSea");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e 아쿠아리움 사냥터 2 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아쿠아리움 사냥터 2로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 60) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/DownTown");
     cm.sendOk("#fMap/MapHelper.img/mark/Folkvillige##e 아랫마을 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아랫마을로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 61) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm11/DarkMountain");
     cm.sendOk("#fMap/MapHelper.img/mark/Folkvillige##e 까막산 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 까막산으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 62) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm12/AquaCave");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e 피아누스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 피아누스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 63) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm12/DeepSee");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e 아쿠아리움 던전 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아쿠아리움 던전으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 64) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm00/GoPicnic");
     cm.sendOk("#fMap/MapHelper.img/mark/SouthPerry##e 사우스페리 음악이 재생됩니다다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 사우스페리로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 65) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm24/battleBGMTypeD");
     cm.sendOk("#fMap/MapHelper.img/mark/AquaRoad##e 대난투 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 대난투로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 66) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm12/RuinCastle");
     cm.sendOk("#fMap/MapHelper.img/mark/Guild##e 에레고스의 왕좌 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 에레고스의 왕좌로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 67) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm12/Dispute");
     cm.sendOk("#fMap/MapHelper.img/mark/Magatia##e 마가티아 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 마가티아로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 68) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/CokeTown");
     cm.sendOk("#fMap/MapHelper.img/mark/CokeTown##e 코크타운 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 코크타운으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 69) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/Leafre");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e 리프레 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 리프레로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 70) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/Minar'sDream");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e 리프레 사냥터 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 리프레 사냥터로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 71) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/AcientForest");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e 리프레 전장이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 리프레 전장으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 72) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/TowerOfGoddess");
     cm.sendOk("#fMap/MapHelper.img/mark/GoddessTower##e 여신의 탑 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 여신의 탑으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 73) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm13/FightSand");
     cm.sendOk("#fMap/MapHelper.img/mark/Ariant##e 아리안트 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아리안트로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 74) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/DragonLoad");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e 용의 숲 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 용의 숲으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 75) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/HonTale");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e 혼테일 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 혼테일으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 76) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/CaveOfHontale");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e 혼테일의 동굴 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 혼테일의 동굴로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 77) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/DragonNest");
     cm.sendOk("#fMap/MapHelper.img/mark/Leafre##e 용의 둥지 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 용의 둥지로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 78) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/Ariant");
     cm.sendOk("#fMap/MapHelper.img/mark/Ariant##e 아리안트 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아리안트로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 79) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm14/HotDesert");
     cm.sendOk("#fMap/MapHelper.img/mark/Ariant##e 아리안트 사냥터 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아리안트 사냥터로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 80) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/MureungHill");
     cm.sendOk("#fMap/MapHelper.img/mark/Mureung##e 무릉 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 무릉으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 81) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/MureungForest");
     cm.sendOk("#fMap/MapHelper.img/mark/Mureung##e 무릉 사냥터 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 무릉사냥터로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 82) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/WhiteHerb");
     cm.sendOk("#fMap/MapHelper.img/mark/WhiteHerb##e 백초마을 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 백초마을로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 83) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/Pirate");
     cm.sendOk("#fMap/MapHelper.img/mark/DevijonParty##e 해적의 소굴 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 해적의 소굴로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 84) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/SunsetDesert");
     cm.sendOk("#fMap/MapHelper.img/mark/Ariant##e 아리안트 해질녘 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 아리안트 해질녘으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 85) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/Nautilus");
     cm.sendOk("#fMap/MapHelper.img/mark/Nautilus##e 노틸러스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 노틸러스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 86) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/inNautilus");
     cm.sendOk("#fMap/MapHelper.img/mark/Nautilus##e 노틸러스호 복도 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 노틸러스호 복도로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 87) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/ElinForest");
     cm.sendOk("#fMap/MapHelper.img/mark/ElinForest##e 엘린숲 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 엘린숲으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 88) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("Bgm15/PoisonForest");
     cm.sendOk("#fMap/MapHelper.img/mark/ElinForest##e 오염된 숲 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 오염된 숲로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 89) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/FunnyRabbit");
     cm.sendOk("#fMap/MapHelper.img/mark/Event##e 고지를 향해서 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 고지를 향해서로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 90) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/FunnyRabbitFaster");
     cm.sendOk("#fMap/MapHelper.img/mark/Event##e 고지를향해서 빠르게 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 고지를향해서 빠르게로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }    } else if (selection == 91) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/halloweenMainHall");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e 할로윈 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 할로윈으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 92) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/weddingDance");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e 결혼 댄스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 결혼 댄스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 93) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/amoria");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e 웨딩빌리지 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 웨딩빌리지로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 94) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/chapel");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e 웨딩댄스 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 웨딩댄스로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 95) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/cathedral");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e 웨딩 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 웨딩으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 96) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/cathedral");
     cm.sendOk("#fMap/MapHelper.img/mark/Wedding##e 웨딩 2 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 웨딩 2로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 97) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/NLCupbeat");
     cm.sendOk("#fMap/MapHelper.img/mark/NLC##e 뉴리프시티 업비트 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 뉴리프시티 업비트로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 98) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/NLChunt");
     cm.sendOk("#fMap/MapHelper.img/mark/NLC##e 뉴리프시티 사냥터 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 뉴리프시티 사냥터로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 99) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/NLCtown");
     cm.sendOk("#fMap/MapHelper.img/mark/NLC##e 뉴리프시티 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 뉴리프시티로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 100) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/HauntedHouse");
     cm.sendOk("#fMap/MapHelper.img/mark/HuntedMansion##e 헌티드 맨션 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 헌티드 맨션으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 101) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/CrimsonwoodKeep");
     cm.sendOk("#fMap/MapHelper.img/mark/Crimsonwood##e 크림슨우드 키프 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 크림슨우드 키프로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 102) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/Bigfoot");
     cm.sendOk("#fMap/MapHelper.img/mark/Crimsonwood##e 거대한발 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 거대한발로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 103) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmGL/PhantomForest");
     cm.sendOk("#fMap/MapHelper.img/mark/Crimsonwood##e 유령의 숲 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 유령의 숲로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 104) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/Feeling");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e 일본 버섯신사 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 일본 버섯신사로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 105) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/BizarreForest");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e 일본 무덤 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 일본 무덤로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 106) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/Hana");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e 일본 하나 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 일본 하나로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 107) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/Yume");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e 일본 트로트 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 일본 트로트로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 108) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/Bathroom");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e 일본 화장실 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 일본 화장실로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 109) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/BattleField");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e 일본 배틀필드 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 일본 배틀필드로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 110) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmJp/FirstStepMaster");
     cm.sendOk("#fMap/MapHelper.img/mark/jipangu##e 일본 첫스탭 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 일본 첫스탭로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 111) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/CBD_town");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e 싱가폴 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 싱가폴로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 112) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/CBD_field");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e 싱가폴 필드 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 싱가폴 필드로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 113) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/BoatQuay_field");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e 보트퀘이 필드 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 보트퀘이 필드로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 114) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/Ghostship");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e 유령선 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 유령선으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 115) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmSG/BoatQuay_town");
     cm.sendOk("#fMap/MapHelper.img/mark/Singapore##e 보트퀘이 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 보트퀘이로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 116) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmUI/ShopBgm");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e 캐시샵 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 캐시샵으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }

} else if (selection == 722) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/dolphin_noon");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e dolphin_noon 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 dolphin_noon으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 723) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/wichTower");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e wichTower 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 wichTower으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 724) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/dolphin_night");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e dolphin_night 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 dolphin_night으로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 725) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/halloweenParty");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e 할로윈파티 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 할로윈파티로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 726) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent/coordiKing");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e 코디왕콘테스트 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 코디왕콘테스트로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 727) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmTW/MapleHighSchool");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e MapleHighSchool 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 MapleHighSchool로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 728) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/kiteBgm");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e kiteBgm 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 kiteBgm로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 729) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/tenthBoard");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e tenthBoard 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 tenthBoard로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 730) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/rhythmBgm1");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e rhythmBgm1 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 rhythmBgm1로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
} else if (selection == 731) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmEvent2/rhythmBgm2");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e rhythmBgm2 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 rhythmBgm2로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
    } else if (selection == 117) {
    if (cm.haveItem(4033247,30)) { 
     cm.gainItem(4033247,-30);
     cm.changeMusic("BgmUI/Title");
     cm.sendOk("#fMap/MapHelper.img/mark/TestServer##e 타이틀 음악이 재생됩니다.");
     cm.mapMessage("[BGM변경] "+ musicplayer +"님이 배경음악을 타이틀로 바꾸셨습니다.");
     cm.dispose();
    } else {
     cm.sendOk("#i4033247##z4033247# 30개가 없으면 배경음악을 바꾸실수 없습니다.");
     cm.dispose();
    }
   }
  }
 }
}