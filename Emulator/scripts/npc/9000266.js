var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
        if (status == 0) {
		cm.sendSimple("#r ���ÿ¶��� ������� !! #k\r\n#L2##r[HOT]#k#b[�Һ� ����]#k#l#L102##r[NEW]#k#b[�Ǽ� ����]#k#l\r\n#r#k#l#L12##r[NEW]#k#b[���� ����]#k#l\r\n#L6##r[NEW]#k#b[��������Ų ����]#k#l#L103##r[NEW]#k#b[��������]#k#l");
        } else if (status == 1) {
		if (selection == 0) {
			cm.sendOk("��ǰ���Ŀ��� �Ʒ���Ŀ� �°� �ۼ��ؼ� ���Ϸ� �����ּ���\r\n��ǰ���̸� : \r\n��ǰ���ɹ�ȣ : \r\n��ǰ�ǹ�������(���ǸӴ��ϰ��) : \r\n��ǰ�Ǳݾ� : \r\n���޹����г��� : \r\n kki_looking@naver.com ���� �̷��� ��Ŀ����纸���ø�\r\n�ִ��� ���������ص帮�ڽ��ϴ�.\r\n����ǥ�� www.coreple.kr.pe ������ �Ŀ�����������\r\n�ѿ�� �� �ٸ�������״� �����Ŀ��̺Ұ����մϴ�.");
		} else if (selection == 1) {
			cm.openShop(20121125);
		} else if (selection == 5) {
			cm.openShop(9000153);
      } else if (selection == 2) {
        cm.openShop (10068);
        cm.dispose();
	return;

      } else if (selection == 3) {
        cm.dispose();
        cm.openShop(2134010);
	return;

      } else if (selection == 4) {
        cm.dispose();
        cm.openShop(10070);
	return;

      } else if (selection == 12) {
        cm.dispose();
        cm.openShop(10071);
	return;

      } else if (selection == 6) {
        cm.dispose();
        cm.openShop(9000069);
	return;

      } else if (selection == 5) {
        cm.dispose();
        cm.openNpc(10071);
	return;

      } else if (selection == 20) {
        cm.dispose();
        cm.openShop(2134005);
	return;

      } else if (selection == 102) {
        cm.dispose();
        cm.openShop(10069);
	return;
      } else if (selection == 103) {
	cm.dispose();
	cm.openShop(10067);

      } else if (selection == 104) {
        cm.dispose();
        cm.openNpc(9000175);
	return;

      } else if (selection == 100) {
        cm.dispose();
        cm.openNpc(2101018);
	return;

      } else if (selection == 101) {
        cm.dispose();
        cm.openNpc(9250007);
	return;
		}
		cm.dispose();
	}
    
}
