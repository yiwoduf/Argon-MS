
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
	var chat = "안녕하세요 #e#r에어플래닛#n#k에 오신 것을 환영합니다.\r\n처음 오신 분들께는 #e#b #i1142282# 에어플래닛 뉴페이스#n#k를 지급해드립니다.#r";
	chat += "\r\n#b#L3##i4161002# 전직 하기#l #L4##i4161002# #e#r제로 전용#n#k#l  #d#L5# 대화를 그만 한다.#l";

	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(2150007);

	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(3002106);

	} else if (selection == 4) {
		cm.dispose();
		cm.openNpc(3002100);

	} else if (selection == 5) {
		cm.dispose();
	}

    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
