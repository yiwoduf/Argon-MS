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
		var jessica = "#fn������� Extrabold##r����� ��Ծ�#k �� ����ϰڳ�..?\r\n\r\n";
		jessica += "#b* ��ȯ ��� : 3 �� �޼�\r\n\r\n"
		jessica += "#d#L0#���̶� ��ȯ\r\n"
		jessica += "#L1#����� ȭ��Ʈ ��ȯ\r\n"
		jessica += "#L2#���н� ��Ծ� ��ȯ\r\n"
		jessica += "#L3#�Ƹӵ� ũ���� ��ȯ\r\n"
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
        if (cm.getMeso() >= 300000000) {
		cm.dispose();
		cm.gainMeso (-300000000);
		cm.spawnMob(9304005,0,0);
                cm.sendOk ("#fn������� Extrabold##b���ʿ� ��ȯ �Ǿ��ܴ�..\r\n�غ� �� �ڶ��.. ����� �ϰŶ�..#k");
        } else
        cm.sendOk ("#fn������� Extrabold##r��ȯ ����� ������ �� ����..#k");
        cm.dispose();
	} else if (selection == 1) {
        if (cm.getMeso() >= 300000000) {
		cm.dispose();
		cm.gainMeso (-300000000);
		cm.spawnMob(9304006,0,0);
                cm.sendOk ("#fn������� Extrabold##b���ʿ� ��ȯ �Ǿ��ܴ�..\r\n�غ� �� �ڶ��.. ����� �ϰŶ�..#k");
        } else
        cm.sendOk ("#fn������� Extrabold##r��ȯ ����� ������ �� ����..#k");
        cm.dispose();
	} else if (selection == 2) {
        if (cm.getMeso() >= 300000000) {
		cm.dispose();
		cm.gainMeso (-300000000);
		cm.spawnMob(9304007,0,0);
                cm.sendOk ("#fn������� Extrabold##b���ʿ� ��ȯ �Ǿ��ܴ�..\r\n�غ� �� �ڶ��.. ����� �ϰŶ�..#k");
        } else
        cm.sendOk ("#fn������� Extrabold##r��ȯ ����� ������ �� ����..#k");
        cm.dispose();
	} else if (selection == 3) {
        if (cm.getMeso() >= 300000000) {
		cm.dispose();
		cm.gainMeso (-300000000);
		cm.spawnMob(9304008,0,0);
                cm.sendOk ("#fn������� Extrabold##b���ʿ� ��ȯ �Ǿ��ܴ�..\r\n�غ� �� �ڶ��.. ����� �ϰŶ�..#k");
        } else
        cm.sendOk ("#fn������� Extrabold##r��ȯ ����� ������ �� ����..#k");
        cm.dispose();
}
}
}
}