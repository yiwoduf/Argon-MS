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
            cm.sendYesNo("#e<�೪���� óġ���ּ���!>#n\r\n\r\n#e#d #fUI/UIWindow2.img/MobGage/Mob/8220010# �೪��#n#k#n#k   ȹ������� #i4310034# (1~1��)\r\n\r\n#e#r�̵��Ͻðڽ��ϱ�?\r\n[��Ƽ���������� ������ ������ �Ұ����մϴ�.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(240070303) > 0 || cm.getPlayerCount(350060180) > 1 || cm.getPlayerCount(350060200) > 2) {
                    cm.sendOk("���� �೪���� ���� ���� �÷��̾ �ֽ��ϴ�.");
                    cm.dispose();
                } else {
		    cm.resetMap(240070303);
                    cm.warpParty(240070303);
                    cm.spawnMob(8220010, cm.getPlayer().getPosition().x + 600, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("��Ƽ�� ����� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
	    }
        }
    }
}