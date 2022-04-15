function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
	// lv1~150 몬스터 : 9302011 , 9302039
var star = "#fUI/UIToolTip/Item/Equip/Star/Star#"
    if (status == 0) {
	var choose = "     #fn나눔고딕 Extrabold##fs19##e #g#i2450042##h0##k#fs15# 님 안녕하세요 저는 #r폭업사냥터#k#l 셔틀이에요~#b";
        choose += "\r\n#L1##i2430373# #gLV1~150#L2##i2430374# #bLv.200~250 (10억)";//#L3##i2430375# #rLv.200~250 (100억)#k#l";
        choose += "\r\n#L29#대화를 그만 한다.#l #L30##b입장방법 :#r 1억메소 ";
	cm.sendSpirit(choose,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
	} else if (selection == 1) {
        cm.dispose();
	    cm.gainMeso(-100000000);
		cm.TimeMoveMap(910160000,100000000,600);
         } else if (selection == 2) {
        cm.dispose();
		cm.gainMeso(-100000000);
		cm.TimeMoveMap(273060300,100000000,750);
} else if (selection == 3) {
        cm.dispose();
		cm.gainMeso(-100000000);
		cm.TimeMoveMap(241000206,100000000,750);
		} else if (selection == 30) {
       cm.sendOk("입장 방법은 1억메소입니다.");
	   cm.dispose();
    }
}
}
