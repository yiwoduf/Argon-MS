var status = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	datecheck = true;

	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	}

	if (status == 0) {
		cm.sendSimple("#e<�ƽ��� �ع���>#n\\r\n������ �ƽ��� ������ ��ȸ�ϰ� �ִ� ������ �ܴ���� �����Ͻðڽ��ϱ�?\r\n\r\n\r\n"
                             +"#L0# ������ �ܴ��� �����Ѵ�.\r\n"
                             +"#L1# ���� ���� óġ�Ѵ�. (���� 120�̻�)\r\n");
        } else if (status == 1) {
	    if (selection == 0) {
		cm.getPlayer().dropMessage(5, "�ƽ��� �ع����� �ӽ� �Ұ� �����Դϴ�. ���� �ع��� ������� ��ٷ� �ּ���.");
 		cm.dispose();
	    } else {
		if (cm.getPlayer().getDateKey("hillah") == null) {
		    cm.getPlayer().setDateKey("hillah",3);
		}
		if (cm.getPlayer().getDateKey("hillah") <= 0) {
		    cm.sendOk("������ ž�� ���� �����߽��ϴ�. <����: ����>�� �Ϸ翡 3���� �����Ͻ� �� �ֽ��ϴ�.");
		    cm.dispose();
		} else if (cm.getPlayer().getLevel() < 120) {
		    cm.sendOk("������ ž�� ���尡���� ������ �����մϴ�. <����: ����>�� ���� 120�̻� �����Ͻ� �� �ֽ��ϴ�.");
		    cm.dispose();
		} else {
	  	    cm.warp(262030000);
		    cm.sendNext("������ ž �Ա��� �����帮�ڽ��ϴ�. ���� �� �������ּ���.");
         	    cm.dispose();
		}
	    }
	}
}