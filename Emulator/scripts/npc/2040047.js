function start() {
    status = (cm.getMapId() % 1000 == 0 || cm.getMapId() % 1000 == 800) ? -1 : 0;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
	    cm.sendNext("�׷�����. ��Ƽ����� ���� ���� ���ݸ� �� ������ ���ּ���.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
	    if (cm.getMapId() == 922010000) {
		cm.removeAll(4001022);
		cm.warp(910002000,0);
		cm.dispose();
	    } else {
		var chat = "������ �ʿ��ϼ���?#b\r\n";
		chat += "\r\n#L1#���� ������ �ʿ��ؿ�.";
		chat += "\r\n#L0#�̰����� ������ �;��.";
		cm.sendSimple(chat);
	    }
	} else if (status == 1) {
	    if (selection == 0) {
		cm.sendYesNo("���� ���� �ٽ� ����Ʈ�� ������ ��쿡�� ó������ �ٽ� Ŭ���� �ؾ� �մϴ�. �� �ʿ��� ������ �����Ű���?");
	    } else {
		cm.gainItem(4001454,1);
		cm.dispose();
	    }
	} else if (status == 2) {
	    cm.getEventInstance().unregisterPlayer(cm.getPlayer());
	    cm.warp(922010000,0);
	    cm.dispose();
	}
    }
}