/*
@블라디(aledmfrns4952)
트레이드잼
*/

importPackage(Packages.packet.creators);
importPackage(Packages.packet.skills);
importPackage(Packages.constants);
importPackage(Packages.handler.duey);

var status = -1;
var sel = 0;
var cash = "#fUI/SpiritNPC.img/BtAllReset/mouseOver/0#";
var vote = "#fUI/SpiritNPC.img/BtAllReset/pressed/0#";
var warp = "#fUI/SpiritNPC.img/backgrnd2#";
var shop = "#i5450003#";
var help = "#i4460004#";
var vmsms = "#i9330027#";
var nmsms = "#i4162001#";
var bfd = "#i3994735#";
var kss = "#fUI/UIToolTip/Item/Equip/Star/Star#";
var constants = "#i3994597#";
var bitbox = "#i1002140#";

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
       /// cm.sendOk("즐거운 여행 되세요.");
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        var rand = Math.random() * 1000;
	var chat = "    #ePlayer Info:#k#d Lv."+cm.getPlayer().getLevel()+" #k#d#h #님#k#d 환영합니다!#k\r\n";
	chat += "\r\n#L421421#"+kss+"―――――――――――간편트레이드―――――――――――"+kss+"#l\r\n ";
	var chat = "#k현재 에이플러스은 #b" + cm.getConnect() + "#k명과 함께하고있습니다.\r\n";
	chat += "\r\n\r\n"+bfd+"#L4#"+help+"#r서버안내#l ";
	chat += "#L5#"+constants+"#d기능관련#k#l\r\n\r\n\r\n";
	if (cm.getPlayer().hasGmLevel(6)){

}
	cm.sendSimple(chat);
  } else if (status == 1) {
	if(selection == 0) {
		sel = 100;
		cm.sendYesNo("정말 #b버그#k를 이용하시겠어요? #r바로 #e벤#n을 먹을수도있습니다.#k");
	} else if (selection == 1) {
		cm.dispose();
		cm.openNpc(9000230);
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(9000011);
	} else if (selection == 774) {
		cm.dispose();
		cm.openNpc(9000357);
	} else if (selection == 3) {
		cm.warp(1000000, 0)
	} else if (selection == 4) {
		var notice = "#e#r[서버 관리자 안내]#k#n\r\n"
		notice += "　1. 서버 운영자 : GM팡이\r\n"
	notice += "#e#r[서버 기능 안내]#k#n\r\n"
		notice += "　1. 주요 기능 엔피시는 모두 중앙 광장에 있습니다.\r\n";
		notice += "　2. 에이플러스은 자동전직 시스템을 사용하고 있습니다.\r\n";
                notice += "　3. 에이플러스은 최신캐쉬템/최신헤어성형가 무료입니다.\r\n";
		notice += "　4. 후원은 서버발전에 이용되며 큰힘이 될수있습니다.\r\n\r\n";
		notice += "#e#r[서버 주의사항 안내]#k#n\r\n"
		notice += "　1. 과도한 비속어 사용 및 싸움(싸움유도)을 할 경우에는 이유를 따지지 않고 #e접속 제한#n을 당할 수 있습니다.";
        notice += "\r\n\r\n#e#r[서버 도우미 안내]#k#n\r\n"
                notice += "　1. 유저분들간의 소통도 매우 중요합니다 질문이 있을경우 운영진보다 #e에이플러스 유저#n들에게 먼저 질문하시고 정말 모르겠다 싶으시면 운영진을 찾아주세요.";
		cm.sendNext(notice);
		cm.dispose();
	} else if (selection == 5) {
		var text = "　에이플러스 #bLv."+cm.getPlayer().getLevel()+" #r#h ##k님 환영합니다.\r\n\r\n";
		text += "　#e#r< 부가 기능 >#n\r\n";
                   text += "#L9001040#에이플러스 뉴비지원#l\r\n";
                   text += "#L9330027#에이플러스 출석체크#l\r\n";
		text += "#b#L9070206#에이플러스 캐시충전#l\r\n";
		text += "#L9070207#에이플러스 무료검색#l\r\n";
                   text += "#L1012117#에이플러스 뽑기샵#l\r\n";
		text += "#L9000155#에이플러스 돌림판#l\r\n";
		text += "#L9000453#에이플러스 핫타임#l\r\n";
		text += "#L1103002#에이플러스 라이딩#l\r\n";

                 
		cm.sendSimple(text);
	} else if (selection == 6) {
		cm.dispose();
		cm.openNpc(9090008);
	} else if (selection == 7) {
		cm.dispose();
		cm.openNpc(9900002);
	} else if (selection == 8) {
		cm.dispose();
		cm.openNpc(1052013);
	} else if (selection == 9) {
		cm.dispose();
		cm.openNpc(1052012);
	} else if (selection == 10) {
		cm.dispose();
		cm.openNpc(9900001);
	} else if (selection == 11) {
		cm.dispose();
		cm.openNpc(9090102);
	} else if (selection == 12) {
		cm.dispose();
		cm.openNpc(9000056);
	}
  } else if (status == 2) {
	if(sel == 100) {
	cm.dispose();
	cm.enterCS();
	} else {
	sel = selection;
	if (sel > 0) {
	cm.dispose();
	cm.openNpc(sel);
	}
	}
	} else {
		cm.dispose();
	}
}