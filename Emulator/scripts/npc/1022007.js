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
            cm.sendYesNo("#e<ȥ���� ���� �̽�ƽ �ʵ带 �������ּ���!>#n\r\n\r\n#e#dNo.1 #fUI/UIWindow2.img/MobGage/Mob/9300003# ŷ������#n#k#n#k   ȹ������� #i4170040# (1~2��)\r\n\r\n#e#r�̵��Ͻðڽ��ϱ�?\r\n[��Ƽ���������� ������ ������ �Ұ����մϴ�.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(931050800) > 0 || cm.getPlayerCount(931050810) > 1 || cm.getPlayerCount(931050820) > 2) {
                    cm.sendOk("���� �̽�ƽ ���̵忡 ���� ���� �÷��̾ �ֽ��ϴ�.");
                    cm.dispose();
                } else {
		    cm.resetMap(931050800);
                    cm.warpParty(931050800);
                    cm.spawnMob(9300003, cm.getPlayer().getPosition().x + 800, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("��Ƽ�� ����� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
	    }
        }
    }
}