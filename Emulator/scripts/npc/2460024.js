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
           if (cm.getPlayer().getMapId() == 326090310) {
		var jessica = "#fn������� Extrabold##r����#k �� ��Ź�� �����ϰ� #b����Ʈ�� ����#k ���� ���ڳ�..?\r\n";
		jessica += "#L0##r[����]#k #b����Ʈ�� ���� ���� �̵��ҰԿ�.#k\r\n";
		cm.sendSimple(jessica);
           } else {
	   cm.sendOk("#fn������� Extrabold#�̰�.. �� ����� ����..");
	   cm.dispose();
           }
	} else if (status == 1) {
	if (selection == 0) {
	cm.killAllMob();
        cm.removeAll(4032335);
        cm.removeAll(4033012);
        cm.warp(100030301,0);
	cm.dispose();
}
}
}
}