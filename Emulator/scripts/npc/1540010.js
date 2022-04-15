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
        var chat = "   #i3120000##fn나눔고딕 Extrabold##fs13# 오로라온라인 후원상점입니다!#i3120000##n#k\r\n#fs11##Cgray#                   오로라온라인에서 즐거운 시간 되시기 바랍니다.\r\n\r\n\r\n";
        chat += "#r▶ #h0#님의 후원포인트는 "+cm.getPlayer().getRC()+" 원 입니다.#k\r\n";
        chat += "#b▶ #h0#님의 #z4001254#의 갯수는 "+cm.itemQuantity(4001254)+" 개 입니다.#k\r\n";
	chat += "#L0#"+별보+"#d [HOT] 추가 뎀지\r\n";
        chat += "#L1#"+별보+"#d [HOT] 후원 버프\r\n";
        chat += "#L2#"+별보+"#d [HOT] 특수 닉네임 변경권\r\n";
        chat += "#L3#"+별보+"#d 코디 후원상점A\r\n";
        chat += "#L4#"+별보+"#d 코디 후원상점B\r\n";
        chat += "#L6#"+별보+"#d 후원 상점 (남자세트)\r\n";
        chat += "#L7#"+별보+"#d 후원 상점 (여자세트)\r\n";
        chat += "#L8#"+별보+"#d 후원 장비상점\r\n";
        chat += "#L9#"+별보+"#d 후원포인트 교환\r\n";
        cm.sendSimple(chat);

    } else if (status == 1) {
    if (selection == 0) {
       cm.dispose();
     //  cm.openNpc(2520002);
       cm.openNpc(9010029);

    } else if (selection == 1) {
        cm.dispose();
        cm.openNpc(9072200);

    } else if (selection == 2) {
	cm.sendOk("카카오톡 : @오로라온라인\r\n네이트온 : saracen_dev@nate.com\r\n특별 후원은 1:1 상담을 이용해주세요!");
	cm.dispose();

    } else if (selection == 3) {
        cm.dispose();
        cm.openNpc(1032005);

    } else if (selection == 4) {
        cm.dispose();
        cm.openNpc(2030001);

    } else if (selection == 5) {
        cm.dispose();
        cm.openNpc(1094000);

    } else if (selection == 6) {
        cm.dispose();
        cm.openNpc(2400010);

    } else if (selection == 7) {
        cm.dispose();
        cm.openNpc(1032100);

    } else if (selection == 8) {
	cm.dispose();
	cm.openNpc(2182002);

    } else if (selection == 9) {
	cm.dispose();
	cm.openNpc(1102003);

		}
	}
}