var status = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action (mode, type, selection) {
	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	}
	if (status == 0) {
		var chat = "#e�����ƿ��� #b#h ##k \r\n#r#���Ŀ�����Ʈ ���Ź���\r\n#b#��ī����� �Ŀ��������� \r\n#b���� �������� �Ŀ�����Ʈ : #k" + cm.getRC() + "#n\r\n";
		chat += "#L0##b���ϴ���� �ý��� 2�� �Ŀ�����Ʈ 100 #k\r\n";
		chat += "#L1##b���ϴ���� ��/�� 1�� �Ŀ�����Ʈ 100 #k";
		cm.sendSimple(chat);
	} else if (status == 1) {
		sel = selection;
		if (sel == 0) {
            		var chat = "�ý��� ��ȭ�� �� �������� ������ �ּ���.\r\n\r\n";
			chat += cm.getDonateList();
            		cm.sendSimple(chat);
		} else if (sel == 1) {
			var chat = "��/�� ��ȭ�� �� �������� ������ �ּ���.\r\n\r\n";
			chat += cm.getDonateList();
            		cm.sendSimple(chat);
		}
	} else if (status == 2) {
		itemId = selection;
		if (sel == 0) {
			cm.sendGetNumber("���Ͻô� �ý��� ��ġ�� �Է����ּ���\r\n#r�ý��� 2 �� �Ŀ�����Ʈ 100#k\r\n", 0, 0, 32000);
		} else if (sel == 1) {
			cm.sendGetNumber("���Ͻô� ��/�� ��ġ�� �Է����ּ���\r\n#r��/�� 1 �� �Ŀ�����Ʈ 100#k\r\n", 0, 0, 32000);
		}
	} else if (status == 3) {
		if (sel == 0) {
			allstat = selection;
			price = (allstat * 50);
			if (cm.getRC() >= price) {
				cm.loseRC(price);
				cm.setDonateStat(itemId, allstat);
				cm.dispose();
			} else {
				cm.sendOk("�Ŀ�����Ʈ�� ���ڶ��ϴ�.");
				cm.dispose();
			}
		} else if (sel == 1) {
			damage = selection;
			price = (damage * 100);
			if (cm.getRC() >= price) {
				cm.loseRC(price);
				cm.setDonateWatk(itemId, damage);
				cm.dispose();
			} else {
				cm.sendOk("�Ŀ�����Ʈ�� ���ڶ��ϴ�.");
				cm.dispose();
			}
		}
	}
}