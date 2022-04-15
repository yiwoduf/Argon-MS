var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
var 작은별 = "#fUI/UIToolTip/Item/Equip/Star/Star#";

importPackage(Packages.constants);

var status = 0;

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
	    if (cm.getPlayer().getLevel() >= 150) {
		var jessica = "               #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 창고 이용 "+별+"\r\n#fs10##Cgray#                          원하시는 창고 이용 여부를 선택해주세요.#k#fs12#\r\n\r\n";
		jessica += "#fs14##d▶ 창고 이용을 위해서는 아래의 조건이 필요합니다.#k#fs12#\r\n\r\n";
		jessica += "#r1. 창고 이용은 광장에서만 이용이 가능합니다.\r\n";
		jessica += "2. 창고 이용은 레벨 150 이상만 이용이 가능합니다.\r\n";
		jessica += "3. 창고 이용시 1 회 500 만 메소가 차감됩니다.#k\r\n";
		jessica += "#L0##b지금 바로 창고를 이용하겠습니다.#k\r\n";

		cm.sendSimple(jessica);
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r창고 이용은 레벨 150 이상만 이용 가능합니다.");
	cm.dispose();
        }
	} else if (status == 1) {
	if (selection == 0) {
           if(cm.getPlayer().getLevel() >= 150 && cm.getPlayer().getMapId() == 100000000 && cm.getPlayer().getMeso() >= 5000000) {
			cm.gainMeso(-5000000);
			cm.sendStorage();
			cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##d창고 이용을 위해서는 아래의 조건이 필요합니다.#k\r\n\r\n#r1. 창고 이용은 광장에서만 이용이 가능합니다.\r\n2. 창고 이용은 레벨 150 이상만 이용이 가능합니다.\r\n3. 창고 이용시 1 회 500 만 메소가 차감됩니다.#k");
		cm.dispose();
	   }
	}
}
}
}