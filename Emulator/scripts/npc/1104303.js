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
		var jessica = "#fn������� Extrabold#�������� ������.. �ӹ��� ��..\r\n";
		jessica += "#L0##d���� ��� - ������ ��#k #r(�ҿ�)#k\r\n";
		jessica += "#L1##d���� ��� - ������ ��#k #r(�÷���)#k\r\n";
		jessica += "#L2##d���� ��� - ������ ��#k #r(����)#k\r\n";
		jessica += "#L3##d���� ��� - ������ ��#k #r(��ũ�Ͻ�)#k\r\n";
		jessica += "#L4##d���� ��� - ������ ��#k #r(����Ʈ��)#k\r\n";
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
              cm.warp(271030201,"out00");
	      cm.dispose();
	} else if (selection == 1) {
              cm.warp(271030202,"out00");
	      cm.dispose();
	} else if (selection == 2) {
              cm.warp(271030203,"out00");
	      cm.dispose();
	} else if (selection == 3) {
              cm.warp(271030204,"out00");
	      cm.dispose();
	} else if (selection == 4) {
              cm.warp(271030205,"out00");
	      cm.dispose();
}
}
}
}