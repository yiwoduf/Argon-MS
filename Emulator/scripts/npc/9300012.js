var status;
function start() {
    status = -1;
	action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendYesNo("#e<ī���� ��ũ�� �� óġ���ּ���!>#n#k#n#k\r\n\r\n#e#r�̵��Ͻðڽ��ϱ�?\r\n[��Ƽ���������� ������ ������ �Ұ����մϴ�.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(270051100) > 0 || cm.getPlayerCount(350060180) > 1 || cm.getPlayerCount(350060200) > 2) {
                    cm.sendOk("���� ��ũ�� �� ����ִ� ������ �ֽ��ϴ�.");
                    cm.dispose();
                } else {
		    cm.resetMap(270051100);
                    cm.warpParty(270051100);
                    cm.spawnMob(9300798, cm.getPlayer().getPosition().x + 300, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("��Ƽ�� ����� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
	    }
        }
    }
}