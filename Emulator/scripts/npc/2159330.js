/*
	�� ��ũ��Ʈ�� �������� ���� ��ɿ� �ִ� ���ǽ��Դϴ�.
	�������� KMS �������� ����������ϴ�.

	���̹� : ����(seonwoo__@naver.com)
*/

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
            var chat = "#b<���� �Ѳ����� 2���� �̻� ��ȯ�� ���� ���� ���ŵ˴ϴ�.>#k \r\n#r<���̾� ��ȯ>#k : #i4001432# 1��#e#n";
            chat += "\r\n#r�������� #i4001432#���� :: "+ cm.itemQuantity(4001432) +"#k";
            chat += "\r\n#L0##b���̾ȸ� ��ȯ �ϰ�ͽ��ϴ�.#k";
            chat += "\r\n#L1##b��ȯ�Ǿ� �ִ� ���� ���̰� �ͽ��ϴ�.(��, ������ ���X)#k";
            chat += "\r\n#L2##b[AURORA STORY] ������ ���ư���ͽ��ϴ�.#k";
            cm.sendSimple(chat);
        } else if (status == 1) {
            if (selection == 0) {
         if (cm.itemQuantity(4001432) >= 1  && cm.getMonsterCount(cm.getMapId()) == 0) {
        var chat = "���� �Ѳ����� 2���� �̻� ��ȯ�� ���� ���� ���ŵ˴ϴ�.";
	cm.removeNpc(cm.getMapId(), 2083002);
        cm.gainItem(4001432 ,-1);
	cm.spawnMob(8880131, cm.getPlayer().getPosition().x + 300, cm.getPlayer().getPosition().y);
        cm.sendNext(chat);
	cm.dispose();
        }
     else {
        cm.sendOk("�޼Ұ� ���ų� ����Ϳ� ���� �ֽ��ϴ�. ");
    	cm.killAllMob();
        cm.dispose();

		}
}

        } if (selection == 1) {
		cm.killAllMob();
		cm.dispose();

        } else if (selection == 2) {
		cm.warp(100000000);
		cm.dispose();






    }
}
}


