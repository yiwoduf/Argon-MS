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
            cm.sendYesNo("#e<������ ��ã���ּ���!>#n\r\n\r\n#e#dNo.1 #fUI/UIWindow2.img/MobGage/Mob/2700100# �ǹ��� ����#n#k   ȹ������� #i4310125# (1��)\r\n#e#dNo.2 #fUI/UIWindow2.img/MobGage/Mob/2700104# ����#n#k              ȹ������� #i4310125# (1~2��)\r\n#e#bNo.3 #fUI/UIWindow2.img/MobGage/Mob/2700103# C.�巡��#n#k       ȹ������� #i4310125# (1~2��)\r\n#e#bNo.4 #fUI/UIWindow2.img/MobGage/Mob/2700101# �ݰ���#n#k           ȹ������� #i4310125# (1~3��)\r\n#e#bNo.5 #fUI/UIWindow2.img/MobGage/Mob/2700102# �ֹڻ�#n#k           ȹ������� #i4310125# (1~4��)\r\n#e#rNo.F #fUI/UIWindow2.img/MobGage/Mob/2700200# �ڷ�#n#k              ȹ������� #i4310124# (1~5��)\r\n\r\n#e#r�̵��Ͻðڽ��ϱ�?\r\n[��Ƽ���������� ������ ������ �Ұ����մϴ�.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(330003100) > 0 || cm.getPlayerCount(330003500) > 1 || cm.getPlayerCount(330003400) > 2 || cm.getPlayerCount(330003200) > 3 || cm.getPlayerCount(330003300) > 4 || cm.getPlayerCount(330003600) > 5)  {
                    cm.sendOk("���� ������ ���� ���� �÷��̾ �ֽ��ϴ�.");
                    cm.dispose();
                } else {
		    cm.resetMap(330003100);
                    cm.warpParty(330003100);
                    cm.spawnMob(2700100, cm.getPlayer().getPosition().x + 1000, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("��Ƽ�� ����� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
	    }
        }
    }
}