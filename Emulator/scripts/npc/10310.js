var status = -1;

importPackage(Packages.constants);

function start() {
    status = -1;
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
		var c1 = "#fn나눔고딕 Extrabold##d[입장 제한 : 200 LV 이상] [입장 비용 : 1 천만 메소]#k\r\n#r* 사냥터 정보 - 몬스터 HP 1000 억#k\r\n";
		c1+= "#L0##fs15##b[워프]#k 킹덤로드 : 시작되는 비극의 숲 2\r\n";
		c1+= "#L1##b[워프]#k "+ServerConstants.serverName+" 광장\r\n";
		cm.sendSimple(c1);
	} else if (status == 1) {
	if (selection == 0) {
           if (cm.getPlayer().getLevel() >= 200 && cm.getMeso() >= 10000000) {
		cm.warp (241000214,0);
		cm.gainMeso (-10000000);
		cm.dispose();
           } else {
           cm.sendOk ("#fn나눔고딕 Extrabold##r[입장 불가] 레벨 또는 메소가 부족합니다.#k");
           cm.dispose();
           }
       } else if (selection == 1) {
		cm.warp (680000000,0);
		cm.dispose();
       }
}
}