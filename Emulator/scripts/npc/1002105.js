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
            var chat = "#r<�̴� ���� ���� ��ȯ>#k : #i4001431# 1��#e#n";
            chat += "\r\n#r�������� #i4001431#����#k :: "+ cm.itemQuantity(4001431) +"#e#n";
            chat += "\r\n#L0##b�̴� ���� ���͸� ��ȯ �ϰ�ͽ��ϴ�.(100����)#k";
            chat += "\r\n#L1##b��ȯ�Ǿ� �ִ� ���� ���̰� �ͽ��ϴ�.(��, ������ ���X)#k";
            chat += "\r\n#L2##b[AURORA STORY] ������ ���ư���ͽ��ϴ�.#k";
            cm.sendSimple(chat);
        } else if (status == 1) {
            if (selection == 0) {
         if (cm.itemQuantity(4001431) >= 100) {
      //  cm.gainItem(4001431 ,-1);
	 for(i = 1; i <= 100; i++)
	{
	cm.spawnMob(9600002, 133, 33);
	}
	cm.dispose();
        }
     else {
        cm.sendOk("Ƽ���� �����ϴ�. ");
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


