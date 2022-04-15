
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
	var chat = "안녕하세요 에이플러스의 #b[컨텐츠 상점]#k을\r\n담당하고 있는 리프 운영자라고합니다.#b";
	chat += "\r\n#L2##i4310071# 홍보 상점#l #r#L3##i4310070# 후원 상점#l  #b#L7##i4032101# 보물 상점#l";
	chat += "\r\n#r#L4##i4033825# 결정 상점#l #b#L6##i4033076# 징표 상점#l #r#L8##i4031144# 인챈트 상점#l  #d#L5# 대화를 그만 한다.#l";



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
		cm.openNpc(2020006);
	} else if (selection == 6) {
                cm.dispose();
		cm.openNpc(9075002);
	} else if (selection == 7) {
                cm.dispose();
		cm.openNpc(2520024);
	} else if (selection == 8) {
                cm.dispose();
		cm.openNpc(2159450);
	} else if (selection == 5) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
