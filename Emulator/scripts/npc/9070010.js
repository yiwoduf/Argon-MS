
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
	var chat = "#d#e #b#h0##k... 지직..  미스틱세계가 ㅈ직. 혼란에빠져있다. 도움이필요하다.#l";
	chat += "\r\n#g#L2##fUI/UIWindow2.img/MobGage/Mob/9300003#  【 EASY 】#l #g#L50##fUI/UIWindow2.img/MobGage/Mob/9300594# 【 Normal 】#l";
        chat += "#r#L51##fUI/UIWindow2.img/MobGage/Mob/9300608#  【 Hard 】#l #d#L52##fUI/UIWindow2.img/MobGage/Mob/9300600# 【 Ultimate 】#l\r\n";
        chat += "#b#L3##i4000814# 『포인트 상점』#l #b#L4##i4170040# 『전리품 상점』#l\r\n ";
	chat += "#d#L5# 대화를 그만 한다.#l";
        

	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(2150007);
	} else if (selection == 6) {
               cm.dispose();
		cm.openNpc(2001003);
		
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(1022007);
} else if (selection == 50) {
		cm.dispose();
		cm.openNpc(2111003);
} else if (selection == 51) {
		cm.dispose();
		cm.openNpc(2460006);
} else if (selection == 52) {
		cm.dispose();
		cm.openNpc(2460027);
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(9073008);
	} else if (selection == 4) {
                cm.dispose();
		cm.openNpc(2142923);
	} else if (selection == 5) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
