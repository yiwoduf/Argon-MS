importPackage(Packages.constants);

var status = -1;

별보 = "#fUI/GuildMark.img/Mark/Pattern/00004001/13#"

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        var chat = "#fn나눔고딕 ExtraBold#         #b"+ServerConstants.serverName+"#k의 소비 상점에 오신것을 환영합니다 :)\r\n\r\n\r\n";
        chat += "#L1#"+"#d 10% 직업별 주문서상점\r\n";
        chat += "#L2#"+"#d 60% 직업별 주문서상점\r\n";
        chat += "#L3#"+"#d 잠재&기타 관련 아이템Ⅰ\r\n";
        chat += "#L4#"+"#d 기타 관련 아이템Ⅱ\r\n";
        chat += "#L5#"+"#d 큐브 관련 아이템\r\n";
        cm.sendSimple(chat);

    } else if (status == 1) {
    if (selection == 1) {
       cm.dispose();
       cm.openNpc(3003352);

    } else if (selection == 2) {
        cm.dispose();
        cm.openNpc(3003353);

    } else if (selection == 3) {
        cm.dispose();
        cm.openNpc(3003354);

    } else if (selection == 4) {
        cm.dispose();
        cm.openNpc(3003355);

    } else if (selection == 5) {
        cm.dispose();
        cm.openNpc(3003356);

    } else if (selection == 6) {
        cm.dispose();
        cm.openNpc(2400010);

    } else if (selection == 7) {
        cm.dispose();
        cm.openNpc(1032100);

		}
	}
}