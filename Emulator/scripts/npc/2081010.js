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
	if (cm.getPlayer().getMapId() == 100000000) {
		if (cm.getPlayer().getLevel() >= 150) {
		var jessica = "               #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 캐시 충전 "+별+"\r\n#fs10##Cgray#                          원하시는 캐시 충전 단위를 선택해주세요.#k\r\n#fs12#";
		jessica += "\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L0##i2431872#  #b> 1 만 Cash 구매#k#l\r\n\r\n       * #i2028048# #r- 3 백만 메소 차감#k\r\n";
		jessica += 작은별+"#L1##i2431872#  #b> 10 만 Cash 구매#k#l\r\n\r\n       * #i2028048# #r- 3 천만 메소 차감#k\r\n";
		jessica += 작은별+"#L2##i2431872#  #b> 100 만 Cash 구매#k#l\r\n\r\n       * #i2028048# #r- 3 억 메소 차감#k\r\n";
		jessica += "\r\n--------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
		} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r캐시 충전 레벨 150 이상만 이용 가능합니다.");
		cm.dispose();
        	}
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r캐시 충전은 광장에서만 이용이 가능합니다.#k");
	cm.dispose();
	}	
	} else if (status == 1) {
	if (selection == 0) {
           if (cm.getMeso() >= 3000000) {
		cm.gainMeso(-3000000);
		cm.getPlayer().modifyCSPoints(1, parseInt(10000), true);
		cm.getPlayer().fakeRelog();
		cm.sendOk("#fn나눔고딕 Extrabold##i2431872# #b1 만 Cash#k 구입이 완료 되었습니다.");
		cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 1) {
           if (cm.getMeso() >= 30000000) {
		cm.gainMeso(-30000000);
		cm.getPlayer().modifyCSPoints(1, parseInt(100000), true);
		cm.getPlayer().fakeRelog();
		cm.sendOk("#fn나눔고딕 Extrabold##i2431872# #b10 만 Cash#k 구입이 완료 되었습니다.");
		cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 2) {
           if (cm.getMeso() >= 300000000) {
		cm.gainMeso(-300000000);
		cm.getPlayer().modifyCSPoints(1, parseInt(1000000), true);
		cm.getPlayer().fakeRelog();
		cm.sendOk("#fn나눔고딕 Extrabold##i2431872# #b100 만 Cash#k 구입이 완료 되었습니다.");
		cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소가 부족합니다.#k");
		cm.dispose();
	   }
	}  
}
}
}