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
            cm.sendYesNo("#e<�ǾƴϽ�{Bonus}�� óġ���ּ���!>#n\r\n\r\n#e#d #fUI/UIWindow2.img/MobGage/Mob/9300515# �ǾƴϽ�#n#k#n#k   ȹ������� #i4310034# (30~40��)\r\n\r\n#e#r�̵��Ͻðڽ��ϱ�?\r\n[��Ƽ���������� ������ ������ �Ұ����մϴ�.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(923000100) > 0 ) {
                    cm.sendOk("���� �ǾƴϽ��� ���� ���� �÷��̾ �ֽ��ϴ�.");
                    cm.dispose();
                } else {
		    cm.resetMap(923000100);
                    cm.warpParty(923000100);
                    cm.spawnMob(9300515, cm.getPlayer().getPosition().x + 400, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("��Ƽ�� ����� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
	    }
        }
    }
}