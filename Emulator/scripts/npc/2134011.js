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
            cm.sendYesNo("#e<���븦 óġ���ּ���!>\r\n#fUI/UIWindow2.img/MobGage/Mob/8930100# ����#n#k#n#k   ȹ������� #i4310058# (30~40��)\r\n\r\n#e#r�̵��Ͻðڽ��ϱ�?\r\n[��Ƽ���������� ������ ������ �Ұ����մϴ�.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(105200410) > 0 || cm.getPlayerCount(350060180) > 1 || cm.getPlayerCount(350060200) > 2) {
                    cm.sendOk("���� ���뿡 ���� ���� �÷��̾ �ֽ��ϴ�.");
                    cm.dispose();
                } else {
		    cm.resetMap(105200410);
                    cm.warpParty(105200410);
                    cm.spawnMob(8930000, cm.getPlayer().getPosition().x, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("��Ƽ�� ����� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
	    }
        }
    }
}