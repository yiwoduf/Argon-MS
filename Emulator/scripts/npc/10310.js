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
		var c1 = "#fn������� Extrabold##d[���� ���� : 200 LV �̻�] [���� ��� : 1 õ�� �޼�]#k\r\n#r* ����� ���� - ���� HP 1000 ��#k\r\n";
		c1+= "#L0##fs15##b[����]#k ŷ���ε� : ���۵Ǵ� ����� �� 2\r\n";
		c1+= "#L1##b[����]#k "+ServerConstants.serverName+" ����\r\n";
		cm.sendSimple(c1);
	} else if (status == 1) {
	if (selection == 0) {
           if (cm.getPlayer().getLevel() >= 200 && cm.getMeso() >= 10000000) {
		cm.warp (241000214,0);
		cm.gainMeso (-10000000);
		cm.dispose();
           } else {
           cm.sendOk ("#fn������� Extrabold##r[���� �Ұ�] ���� �Ǵ� �޼Ұ� �����մϴ�.#k");
           cm.dispose();
           }
       } else if (selection == 1) {
		cm.warp (680000000,0);
		cm.dispose();
       }
}
}