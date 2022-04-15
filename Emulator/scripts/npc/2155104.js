
/*
제작:모름 수정:에덴
*/
importPackage(java.lang);
importPackage(Packages.launch.world);
importPackage(Packages.packet.creators);

var cost = 50000; // 소환가격
var status = -1;

function start() {
 action(1, 0, 0);
}

function action(mode, type, selection) {
 status++;
 if (status == 0) {
  cm.sendSpirit("폭업사냥터를 이용하시겠습니까? \r\n#i4310016# #z4310016# 고렙사냥터=50개필요 필요/제한시간은 3분입니다.\r\n #g#L2#저렙 폭업사냥터#l#k#l#k#r#L5#고렙 폭업사냥터#l#k\r\n#L3#대화를 그만한다.",true,0);
 } else if(status == 1) {
  if(selection == 10) {
  if (cm.getPlayer().getLevel() >= 30) {
  cm.sendOk("#fn나눔고딕 Extrabold##fs16#30 이상이라니까?.");
  cm.dispose();
 } else {    
cm.warp(910160000, 0);

 cm.dispose();
}
  } else if (selection == 2) {
             if (cm.getClient().getChannelServer().getMapFactory().getMap(910180000).getCharactersSize() > 0) {
             cm.sendOk("#fn나눔고딕 Extrabold##fs16#이미 다른 모험가가 입장하였습니다. 다른채널을 이용해주시거나 잠시후에 다시 찾아와 주십시오.");
             cm.dispose();
             return;
	     }
        if (cm.getPlayerStat("LVL") <= 29) {
	cm.sendOk("#fn나눔고딕 Extrabold##fs16#30 이상만 도전하실수 있습니다.");
        cm.dispose();
        return;
        }
        if (cm.getPlayerStat("LVL") >= 120) {
	cm.sendOk("#fn나눔고딕 Extrabold##fs16#120이상은 도전하실수 없습니다.");
        cm.dispose();
        return;
        }
	     if (cm.haveItem(4310016,0)) {
            cm.TimeMoveMap(910180000,100050001,180);
            cm.gainItem(4310016, -0);
            cm.dispose();
            } else {
            cm.sendSpirit("\r\n#fn나눔고딕 Extrabold##fs16##i4310016##b#z4310016##k 부족한거같은데요?",false,2008);
            cm.dispose();
}
  } else if (selection == 4) {
             if (cm.getClient().getChannelServer().getMapFactory().getMap(951000240).getCharactersSize() > 0) {
             cm.sendOk("이미 다른 모험가가 입장하였습니다. 다른채널을 이용해주시거나 잠시후에 다시 찾아와 주십시오.");
             cm.dispose();
             return;
	     }
        if (cm.getPlayerStat("LVL") <= 120) {
	cm.sendOk("120 이상만 도전하실수 있습니다.");
        cm.dispose();
        return;
        }
        if (cm.getPlayerStat("LVL") >= 200) {
	cm.sendOk("200이상은 도전하실수 없습니다.");
        cm.dispose();
        return;
        }
	     if (cm.haveItem(4310016,50)) {
            cm.TimeMoveMap(951000240,100050001,180);
            cm.gainItem(4310016, -50);
            cm.dispose();
            } else {
            cm.sendSpirit("\r\n#fn나눔고딕 Extrabold##fs16##i4310016##b#z4310016##k 부족한거같은데요?",false,2008);
            cm.dispose();
}
  } else if (selection == 5) {
             if (cm.getClient().getChannelServer().getMapFactory().getMap(951000270).getCharactersSize() > 0) {
             cm.sendOk("#fn나눔고딕 Extrabold##fs16#이미 다른 모험가가 입장하였습니다. 다른채널을 이용해주시거나 잠시후에 다시 찾아와 주십시오.");
             cm.dispose();
             return;
	     }
        if (cm.getPlayerStat("LVL") <= 199) {
	cm.sendOk("200 이상만 도전하실수 있습니다.");
        cm.dispose();
        return;
        }
	     if (cm.haveItem(4310016,50)) {
            cm.TimeMoveMap(951000270,100050001,180);
            cm.gainItem(4310016, -50);
            cm.dispose();
            } else {
            cm.sendSpirit("\r\n#fn나눔고딕 Extrabold##fs16##i4310016##b#z4310016##k 부족한거같은데요?",false,2008);
            cm.dispose();
}
  } else if (selection == 3) {
cm.sendOk("#fn나눔고딕 Extrabold##fs17#이용을 그만하고싶나보군. 그럼 다음에봐~");
cm.dispose();
  } else {
   cm.dispose();
  }
 } else {
  cm.dispose();
 }
}