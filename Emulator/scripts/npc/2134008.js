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
            cm.sendYesNo("#e<�븻 �� ���¸� óġ���ּ���!>\r\n#n\r\n\r\n#e#d #fUI/UIWindow2.img/MobGage/Mob/8840000# �ϵ� �븻 �� ����#n#k#n#k   ȹ������� #i4310058# (3~4��)\r\n\r\n#e#r�̵��Ͻðڽ��ϱ�?\r\n[��Ƽ���������� ������ ������ �Ұ����մϴ�.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(211070200) > 0 || cm.getPlayerCount(350060180) > 1 || cm.getPlayerCount(350060200) > 2) {
                    cm.sendOk("���� �븻 �� ���¿� ���� ���� �÷��̾ �ֽ��ϴ�.");
                    cm.dispose();
                } else {
		    cm.resetMap(211070200);
                    cm.warpParty(211070200);
                    cm.spawnMob(8840007, cm.getPlayer().getPosition().x + 2350, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("��Ƽ�� ����� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
	    }
        }
    }
}