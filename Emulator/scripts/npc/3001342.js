
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
	var chat = "안녕하세요 드림플래닛의 #b후원상점#k을담당하고 있는 루디라고합니다.#b";
	chat += "\r\n#L4##i1004808# 아케인웨폰#l #Cyellow##L3##i4310070# 후원상점#l  #d#L9##s5321054# 후원버프#l#L10##b#i1702445# 검색캐시#l";
	chat += "\r\n#b#L11##i2450064# 폭업사냥패키지#l  #L12##r#i1142840# 핑크빈코인#l            #k#L5# 대화를 그만 한다.#l";



	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(2150007);
	} else if (selection == 1) {
		cm.warp(410000000);
		cm.dispose();
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(1530667);
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(1530065);
	} else if (selection == 4) {
                cm.dispose();
		cm.openNpc(2182002);
	} else if (selection == 6) {
                cm.dispose();
		cm.openNpc(9075002);
	} else if (selection == 7) {
                cm.dispose();
		cm.openNpc(2220002);
	} else if (selection == 8) {
                cm.dispose();
		cm.openNpc(2159450);
	} else if (selection == 9) {
		cm.dispose();
		cm.openNpc(9072200);
	} else if (selection == 10) {
		cm.dispose();
		cm.openNpc(9201013);
	} else if (selection == 11) {
		cm.dispose();
		cm.openNpc(1540629);
	} else if (selection == 12) {
		cm.dispose();
		cm.openNpc(9072303);
	} else if (selection == 5) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
