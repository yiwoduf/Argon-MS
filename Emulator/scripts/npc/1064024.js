var status = -1;var k = "#fNpc/9000000/stand/0#";
var k1 = "#fNpc/9000000/stand/0#";
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
    if (status == 0) {
	var chat = "안녕하세요 #b" + cm.getPlayer().getName() + "#k님 보스레이드 샵입니다. 골라보세요~#r";
	chat += "\r\n#g#L3000##i1102550# 라임그린 윙즈(800) #l #b#L3001##i1102551# 사파이어 윙즈(800)#l\r\n";
	chat += "#r#L3002##i1702624# 마스터 타임(1100)#l#L3005##i1702565# 죽음의데스 (1100)\r\n";
	chat += "#b#L3003##i1002186# 투명모자(900)   #b#L3004##i1072153# 투명신발 (900)\r\n#k#l";
	chat += "#r#L3015##i2434655# 『구미호 데미지스킨』(500개) #l#k#l";
    chat += "\r\n#L5# 대화를 그만 한다.#l\r\n";

	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(2150007);
	} else if (selection == 1) {
		cm.warp(410000000);
		cm.dispose();
	} else if (selection == 2) {
		cm.warp(910196002);
		cm.dispose();
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(2192002);
} else if (selection == 3000) {
if (cm.haveItem(4310058, 800)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r보스레이드 코인으#k로 #r#i1102550# 를 구입 하셨습니다.");
			cm.gainItem(4310058, -800);
                        cm.gainSponserItem(1102550,'[에이플러스]',1000,200,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r보스레이드코인#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3001) {
if (cm.haveItem(4310058, 800)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r보스레이드 코인으#k로 #r#i1102551# 를 구입 하셨습니다.");
			cm.gainItem(4310058, -800);
                        cm.gainSponserItem(1102551,'[에이플러스]',1000,200,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r보스레이드코인#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3002) {
if (cm.haveItem(4310058, 1100)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r보스레이드 코인으#k로 #r#i1702624# 를 구입 하셨습니다.");
			cm.gainItem(4310058, -1100);
                        cm.gainSponserItem(1702624,'[에이플러스]',1200,300,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r보스레이드코인#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3003) {
if (cm.haveItem(4310058, 900)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r보스레이드 코인으#k로 #r#i1702624# 를 구입 하셨습니다.");
			cm.gainItem(4310058, -900);
                        cm.gainSponserItem(1002186,'[에이플러스]',800,150,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r보스레이드코인#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3004) {
if (cm.haveItem(4310058, 900)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r보스레이드 코인으#k로 #r#i1702624# 를 구입 하셨습니다.");
			cm.gainItem(4310058, -900);
                        cm.gainSponserItem(1072153,'[에이플러스]',800,150,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r보스레이드코인#k이 부족합니다.");
		    cm.dispose();
}
} else if (selection == 3005) {
if (cm.haveItem(4310058, 1100)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r보스레이드 코인으#k로 #r#i1702624# 를 구입 하셨습니다.");
			cm.gainItem(4310058, -1100);
                        cm.gainSponserItem(1702565,'[에이플러스]',1200,300,0);
			cm.dispose();
		    } else {
		        cm.sendOk("장비칸에 빈 공간이 없습니다.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r보스레이드코인#k이 부족합니다.");
		    cm.dispose();
}
	} else if (selection == 4) {
                cm.dispose();
		cm.openNpc(1540010);
	} else if (selection == 5) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
