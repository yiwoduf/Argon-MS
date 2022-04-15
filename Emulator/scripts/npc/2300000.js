
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
	var chat = "#d#e #b#h0##k! 도움이필요합니다.\r\n#e#b[스우 해방 컨텐츠에오신것을 환영합니다.]";
	chat += "\r\n#r#L2# 스우 해방하기】#l #b#L3#【오르카의 상점】#l  ";
	chat += "\r\n#g#L4##i4033825# 【별빛의결정 상점】#r#L5##i4033248# 【스우코인상점】#k#l"; 
        chat += "\r\n#d#L6# 대화를 그만 한다.\r\n";
        chat += "\r\n";

	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 6) {
		cm.dispose();
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(2159380);
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(9075002);
	} else if (selection == 4) {
                cm.dispose();
		cm.openNpc(2020006);
	} else if (selection == 5) {
                cm.dispose();
		cm.openShop(9300007);
	} else if (selection == 6) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
