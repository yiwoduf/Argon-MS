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
		var jessica = "#fn�������� Extrabold##b"+ServerConstants.serverName+" ����#k ���� �̵��ϰ� ��������.?\r\n";
		jessica += "#L0##b"+ServerConstants.serverName+" ����#k ���� �̵��ϱ�#k\r\n"
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.warp(680000000,0);
	}
}
}
}