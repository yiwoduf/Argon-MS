var status = 0;

importPackage(Packages.constants);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
           var chat = "#fn나눔고딕 Extrabold#	    #b"+ServerConstants.serverName+"#k의 기능 시스템 (Function System)입니다.#fs10#\r\n";

           chat += "				             #Cgray# "+ServerConstants.serverName+"에 오신것을 환영합니다.#fs12##k\r\n\r\n"
           chat += "               #k★현재 AURORA ONLINE에 #b" + cm.getConnect() + "#k명과 함께하고있습니다★\r\n";

        chat += "#b#L1012112#홍보 가즈아#n\r\n";
        chat += "#r#L1012112#후원 가즈아#n\r\n";
        chat += "#b#L1012112#24시간 플레이 가즈아#n\r\n";

/*
	chat += "#L1##v2434625# 외형 변경#l";
	chat += "#L2##v3994502# 장비 백업#l";
	chat += "#L3##v3700338# 상점 이용#l\r\n";
	chat += "#L4##v4001861# 메소 교환#l";
	chat += "  #L5##v4032279# 장래 희망#l";
	chat += "#L6##v2434620# 선물 하기#l\r\n";
	chat += "#L7##v2702000# 어빌 리티#l";
	chat += " #L8##v4009029# 아템 드롭#l";
	chat += " #L9##v3014005# 서버 랭킹#l\r\n";
	chat += "#L10##v4031286# 창고 이용";
	chat += " #L11##v2501000# 옵션 리셋#l"
	chat += "#L12##v1702445# 캐시 충전\r\n";
	chat += "#L13##v1112763# 쥬얼 제작";
	chat += "  #L14##v5050100# AP 강화";
	chat += " #L15##v2430205# 극한 변생\r\n";		*/
	cm.sendSimple(chat);

	} else if (status == 1) {

	if (selection == 1) {
	cm.dispose();
	cm.openNpc(2159473);
	
	} else if (selection == 2) {
	cm.dispose();
	cm.openNpc(9000217);

	} else if (selection == 3) {
	cm.dispose();
	cm.openNpc(1540101);

	} else if (selection == 4) {
	cm.dispose();
	cm.openNpc(1012112);

	} else if (selection == 5) {
	cm.dispose();
	cm.openNpc(1540315);

	} else if (selection == 6) {
	cm.dispose();
	cm.openNpc(9010009);

	} else if (selection == 7) {
	cm.dispose();
	cm.openNpc(1100004);

	} else if (selection == 8) {
	cm.dispose();
	cm.openNpc(1012121);

	} else if (selection == 9) {
	cm.dispose();
	cm.openNpc(2192002);

	} else if (selection == 10) {
	cm.dispose();
	cm.openNpc(2400002);

	} else if (selection == 11) {
	cm.dispose();
	cm.openNpc(1013001);

	} else if (selection == 12) {
	cm.dispose();
	cm.openNpc(2081010);
	
	} else if (selection == 13) {
	cm.dispose();
	cm.openNpc(9010015);

	} else if (selection == 14) {
	cm.dispose();
	cm.openNpc(2161005);

	} else if (selection == 15) {
	cm.dispose();
	cm.openNpc(1540523);

			}
		}
	}
}