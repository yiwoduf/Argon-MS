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
            var chat = "#b<���� �Ѳ����� 2���� �̻� ��ȯ�� ���� ���� ���ŵ˴ϴ�.>#k \r\n#r<��õ� ��ȯ>#k : 500�� �޼�#e#n";
            chat += "\r\n#L0##b��õ带 ��ȯ �ϰ�ͽ��ϴ�.#k";
            chat += "\r\n#L1##b��ȯ�Ǿ� �ִ� ���� ���̰� �ͽ��ϴ�.(��, ������ ���X)#k";
            chat += "\r\n#L2##b[AURORA STORY] ������ ���ư���ͽ��ϴ�.#k";
            cm.sendSimple(chat);
        } else if (status == 1) {
            if (selection == 0) {
         if (cm.getMeso() > 5000000  && cm.getMonsterCount(cm.getMapId()) == 0) {
        var chat = "���� �Ѳ����� 2���� �̻� ��ȯ�� ���� ���� ���ŵ˴ϴ�.";
	cm.removeNpc(cm.getMapId(), 2083002);
        cm.gainMeso(-5000000);
	cm.spawnMob(8880151, 100, 1);
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


