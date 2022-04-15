var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
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
        if (cm.getPlayer().getMapId() == 271040000) {
            cm.sendSimple("#e<�ñ׳ʽ� ����>#n\r\n" + "Ÿ���� �ñ׳ʽ����� �¼� �غ�� �Ǽ̽��ϱ�?\r\n\r\n" + "#L0##b �ñ׳ʽ� ������ ��û�Ѵ�.");
        } else {
            cm.sendYesNo("�ñ׳ʽ� ������ �׸��ϰ� �����ðڽ��ϱ�?");
        }
    } else if (status == 1) {
        if (cm.getPlayer().getMapId() == 271040000) {
            if (cm.getPlayer().getParty() == null) {
                cm.sendOk("��Ƽ�� �ΰ� ������ �ּ���.");
                cm.dispose();
            } else if (!cm.isLeader()) {
                cm.sendOk("��Ƽ�常 �����û�� �����մϴ�");
                cm.dispose();
            } else if (cm.getPlayerCount(271040100) > 0) {
		cm.sendOk("�̹� �ٸ� ��Ƽ�� �ñ׳ʽ��� óġ�� �Դϴ�.");
		cm.dispose();
	    } else {
		cm.resetMap(271040100);
                cm.warpParty(271040100);
                cm.spawnMob(8850011, -280, 117);
                cm.getPlayer().getMap().startMapEffect("�̰��� ã�� �� ����� ���� ���� ���� �������̿���. ������ ������ ���ư� �е� ������ϴ�.", 5120043);
                cm.dispose();
            }
        } else {
            cm.warp(271040000, 1);
            cm.dispose();
        }
    }
}