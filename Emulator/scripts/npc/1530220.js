


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	���� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1530220

	���ǽ� �̸� : �ﷹ��

	���ǽð� �ִ� �� :  : ����Ÿ�� (100050001)

	���ǽ� ���� : ������ ������


*/

var status = -1;
var type = -1;
var text = "";
var sel = -1;
var name = "";

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }

    if (status == 0) {
	if (cm.getPlayer().isGM()) {
		var chat = "�ȳ��ϼ��� " + cm.getPlayer().getName() + "�� ������� ���� ���� �Դϴ�.\r\n#b";
		chat += cm.listReport();
		cm.sendSimple(chat);
	} else {
		var chat = "����Ÿ���� ������ ������ ������ ���� �� �ֽñ� �ٶ��ϴ�.";
		chat += "\r\n#L0##b�Ű� �� ���� �ϱ� #r(50,000�޼�)#l";
		chat += "\r\n#L1##b��� ȣ�� �ϱ� #r(70,000�޼�)#l";
		cm.sendSimple(chat);
	}
    } else if (status == 1) {
	sel = selection;
	if (cm.getPlayer().isGM()) {
		cm.sendYesNo(cm.getReport(sel));
	} else {
		if (selection == 0)
			cm.sendSimple("����Ÿ���� ������ ������ ������ ���� �� �ֽñ� �ٶ��ϴ�.\r\n#L0##b�÷��̾� �Ű�#l\r\n#L1#���� ����Ʈ �� ����#l");
		else if (selection == 1) 
			cm.sendYesNo("������ ��� ȣ���� �Ͻðڽ��ϱ�? ����� ȣ���ϱ� ���ؼ� #b70,000#k�޼Ұ� �Ҹ�Ǹ� 10�п� �ѹ� ȣ���� �����մϴ�.");
	}
    } else if (status == 2) {
	if (cm.getPlayer().isGM()) {
		cm.deleteReport(sel);
		cm.sendOk("�����Ͻ� ����Ʈ�� ���� �Ͽ����ϴ�.");
		cm.dispose();
	} else {
		if (sel == 0) {
			sel = selection;
			if (selection == 0) {
				cm.sendGetText("�Ű��� �÷��̾ �Է��� �ֽñ� �ٶ��ϴ�.");
			} else if (selection == 1) {
				cm.sendGetText(cm.getPlayer().getName() + "���� ���� ������ �Է��� �ֽñ� �ٶ��ϴ�.");
			}
		} else if (sel == 1) {
			sel = 3;
			cm.sendGetText("ȣ�� ������ �Է��� �ֽñ� �ٶ��ϴ�.");		
		}
	}
    } else if (status == 3) {
	if (sel != -1) {
		if (sel == 0) {
			name = cm.getText();
			cm.sendGetText("�Ű� ������ �Է��� �ֽñ� �ٶ��ϴ�.");
		} else if (sel == 1) {
			text = cm.getText();
			cm.sendYesNo(cm.getPlayer().getName() + "���� ������ ������ \r\n\r\n#e���� ���� : #n" + cm.getText() + "\r\n\r\n�� ������ �´��� Ȯ���� �ֽñ� �ٶ��ϴ�.");
		} else if (sel == 3) {
			if (cm.getMeso() < 70000) {
				cm.sendOk("��� ȣ���� ����ϱ� ���ؼ� 70,000�޼Ұ� �ʿ��մϴ�.");
				cm.dispose();
				return;
			}
			cm.GMCall(cm.getPlayer().getName(),cm.getText());
			cm.gainMeso(-70000);
			cm.dispose();
		}
	} else {
		cm.dispose();
	}
    } else if (status == 4) {
	if (sel != -1) {
		if (sel == 0) {
			text = cm.getText();
			cm.sendYesNo("#e�Ű��� �÷��̾� : #n" + name + "\r\n#e�Ű� ���� : #n" + text + "\r\n\r\n�� ������ �´��� Ȯ���� �ֽñ� �ٶ��ϴ�.");
		} else if (sel == 1) {
			report(cm.getPlayer().getName(),text);
			cm.dispose();
		}
	}
    } else if (status == 5) {
	if (sel == 0) {
		report(name,text);
		cm.dispose();
	} else {
		cm.dispose();
	}
    }
}

function report(name1, text1) {
	if (cm.getMeso() < 50000) {
		cm.sendOk("�Ű� �� ���� �ϱ⸦ ����ϱ� ���ؼ� 50,000�޼Ұ� �ʿ��մϴ�.");
		cm.dispose();
		return;
	}
	if (name == "") {
		cm.sendOk(cm.getPlayer().getName() + "���� ������ �ǰ� ����帳�ϴ�. ������ ���� ���ϳ��� ó���ϵ��� �ϰڽ��ϴ�.");
		cm.gainMeso(-50000);
		cm.report(name1,text1,0);
	} else {
		cm.sendOk(cm.getPlayer().getName() + "���� ������ �Ű� ����帳�ϴ�. ������ ���� ���ϳ��� ó���ϵ��� �ϰڽ��ϴ�.");
		cm.report(name1,text1,1);
		cm.gainMeso(-50000);
	}
}