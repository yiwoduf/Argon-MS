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
		var jessica = "#fn나눔고딕 Extrabold##r스페셜 재규어#k 와 계약하겠나..?\r\n\r\n";
		jessica += "#b* 소환 비용 : 3 억 메소\r\n\r\n"
		jessica += "#d#L0#제이라 소환\r\n"
		jessica += "#L1#스노우 화이트 소환\r\n"
		jessica += "#L2#오닉스 재규어 소환\r\n"
		jessica += "#L3#아머드 크림슨 소환\r\n"
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
        if (cm.getMeso() >= 300000000) {
		cm.dispose();
		cm.gainMeso (-300000000);
		cm.spawnMob(9304005,0,0);
                cm.sendOk ("#fn나눔고딕 Extrabold##b왼쪽에 소환 되었단다..\r\n준비가 된 자라면.. 계약을 하거라..#k");
        } else
        cm.sendOk ("#fn나눔고딕 Extrabold##r소환 비용이 부족한 것 같군..#k");
        cm.dispose();
	} else if (selection == 1) {
        if (cm.getMeso() >= 300000000) {
		cm.dispose();
		cm.gainMeso (-300000000);
		cm.spawnMob(9304006,0,0);
                cm.sendOk ("#fn나눔고딕 Extrabold##b왼쪽에 소환 되었단다..\r\n준비가 된 자라면.. 계약을 하거라..#k");
        } else
        cm.sendOk ("#fn나눔고딕 Extrabold##r소환 비용이 부족한 것 같군..#k");
        cm.dispose();
	} else if (selection == 2) {
        if (cm.getMeso() >= 300000000) {
		cm.dispose();
		cm.gainMeso (-300000000);
		cm.spawnMob(9304007,0,0);
                cm.sendOk ("#fn나눔고딕 Extrabold##b왼쪽에 소환 되었단다..\r\n준비가 된 자라면.. 계약을 하거라..#k");
        } else
        cm.sendOk ("#fn나눔고딕 Extrabold##r소환 비용이 부족한 것 같군..#k");
        cm.dispose();
	} else if (selection == 3) {
        if (cm.getMeso() >= 300000000) {
		cm.dispose();
		cm.gainMeso (-300000000);
		cm.spawnMob(9304008,0,0);
                cm.sendOk ("#fn나눔고딕 Extrabold##b왼쪽에 소환 되었단다..\r\n준비가 된 자라면.. 계약을 하거라..#k");
        } else
        cm.sendOk ("#fn나눔고딕 Extrabold##r소환 비용이 부족한 것 같군..#k");
        cm.dispose();
}
}
}
}