var status = -1;
var chr;
var itemlist = Array(Array(1142009,1000),Array(2048304,300), Array(2049300,100), Array(2049400,100));
var sel = 0;
var info = "";
var sel2 = 0;

function start(infot, chrs) {
    status = -1;
	
    if (infot != null) 
	info = infot;

    if (info != "")
	action1 (1, 0, 0, chrs);
    else
    	action (1, 0, 0);
}

function action1(mode, type, selection, chrs) {
	if (chrs != null)
		chr = chrs;

	if (mode == 1) {
		status ++;
	} else {
		cm.dispose();
		return;
	}
	if (status == 0) {
		cm.sendYesNo(info + "\r\n������ ���� ������û�� ��� �Խ��ϴ�. �³��ҽ� �ٷ� PVP�� ���۵˴ϴ�.");
	} else {
		if (cm.getChar(chr.getName()) == null) {
			cm.sendOk(chr.getName() + "���� ���� �� �ʿ� �������� �ʾƿ�.");
			cm.dispose();
			return;
		}
		cm.timeMoveMap(100000000,100000203,600);
		chr.timeMoveMap(100000000,100000203,600);
		cm.getPlayer().dropMessage(1,"���ѽð� 10�оȿ� ������ ���� óġ �ϴ����� �¸� �մϴ�.");
		chr.dropMessage(1,"���ѽð� 10�оȿ� ������ ���� óġ �ϴ����� �¸� �մϴ�.");
		cm.dispose();
	}
}

function action(mode, type, selection) {

    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (info != "") {
	action1 (1, type, selection, null);
	return;
    }
    if (status == 0) {
        var chat = "������ ����.. �� �ƴϰ�!! ����� ���ϽŴٸ� PVP ����!! �����?";
	chat += "\r\n#b#L0##e1 vs 1 PVP�� �̿� �ϰڽ��ϴ�.#l";
	//chat += "\r\n#L2#��Ʋ ����Ʈ�� �������� ��ȯ �ϰڽ��ϴ�.#l";
	//chat += "\r\n#L3#��Ʋ ����Ʈ�� �ʱ�ȭ �ϰڽ��ϴ�.#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	sel = selection;
	if (selection == 0) {
		if (cm.getPlayerCount(100000203) > 0) {
			cm.sendOk("�̹� �ٸ� �÷��̾���� PVP�� �̿��ϰ� ������ �ٸ�ä���� �̿����ֽø� �����ϰھ��");
			cm.dispose();
			return;
		}
		if (cm.getPlayer().getRankPoint() < 0) {
			cm.sendOk("PVP�� �̿��ϱ� ���ؼ� ��Ʋ ����Ʈ�� 20�̻��� �ʿ� �մϴ�. #Cgray#��Ʋ ����Ʈ �ʱ�ȭ ����� �̿��� �ּ���");
			cm.dispose();
			return;
		}
		cm.sendGetText("����� ���ϴ� ������ �г����� �Է��� �ּ���.");
	} else if (selection == 2) {
		var chat = "��ȯ �ϰ���� �������� �����غ�����.";
		chat += "\r\n\r\n";
		chat += "���� #b#h #���� ���� ��Ʋ����Ʈ : #e#r"+cm.getPlayer().getRankPoint() +"#n#k\r\n";
		for (var i = 0; i < itemlist.length; i ++) {
			chat += "#L" + i + "# #b#i" + itemlist[i][0] + "# #z" + itemlist[i][0] + "# #k#e: " + itemlist[i][1] + "����Ʈ#n#l\r\n";
		}
		cm.sendSimple(chat);
	} else if (selection == 3) {
		cm.sendYesNo("��Ʋ ����Ʈ�� �ʱ�ȭ�� �ϴµ� �ʿ��� ����� #e#b100,000,000 �޼�#n#k�� �ʿ� �ϸ� ��Ʋ ����Ʈ�� 500 ����Ʈ�� ���� �˴ϴ�.");
	}
    } else if (status == 2) {
	if (sel == 0) {
		if (cm.getPlayer().getName() == cm.getText()) {
			cm.sendOk("���ΰ��� �ο��� ���� �ȵ��ݾƿ�!!");
			cm.dispose();
			return;
		}
		chr = cm.getChar(cm.getText());
		if (chr != null) {
			cm.sendYesNo("#Cgray##e�г��� : " + chr.getName() + "\r\n#r���� : " + chr.getLevel() + "#n#k\r\n�Կ��� ������ ���� ��û�� �����ðھ��?");
		} else {
			cm.sendOk("�Է��Ͻ� ���� ���� �̸ʿ� ����� �ʾƿ�");
			cm.dispose();
		}
	} else if (sel == 2) {
		sel2 = selection;
		cm.sendYesNo("#i" + itemlist[sel2][0] + "# #Cgray##e" + itemlist[sel2][0] + "#r\r\n" + itemlist[sel2][1] + "��Ʋ ����Ʈ\r\n�� ������ ��ȯ �Ͻðھ��?");
	} else if (sel == 3) {
		if (cm.getPlayer().getMeso() >= 100000000) {
			cm.getPlayer().setRankPoint(500);
			cm.sendOk("��Ʋ ����Ʈ �ʱ�ȭ�� �Ϸ� �Ͽ����ϴ�.");
			cm.dispose();
		} else {
			cm.sendOk("��Ʋ ����Ʈ�� �ʱ�ȭ �ϱ� ���ؼ� #e#b100,000,000 �޼�#n#k�� �ʿ� �մϴ�.");
			cm.dispose();
		}
	}
    } else if (status == 3) {
	if (sel == 0) {
		if (chr.getLevel() >= cm.getPlayer().getLevel()) {
			if ((chr.getLevel() - cm.getPlayer().getLevel()) > 50) {
				cm.sendOk("PVP�� ���� ���� 50 �̻�,���� ���̳��� �̿��� �Ұ��� �մϴ�.");
				cm.dispose();
				return;
			}
		} else if (chr.getLevel() <= cm.getPlayer().getLevel()) {
			if ((cm.getPlayer().getLevel() - chr.getLevel()) > 50) {
				cm.sendOk("PVP�� ���� ���� 50 �̻�,���� ���̳��� �̿��� �Ұ��� �մϴ�.");
				cm.dispose();
				return;
			}
		}
		cm.sendOk("#Cgray##e�г��� : " + chr.getName() + "\r\n#r���� : " + chr.getLevel() + "#n#k\r\n�Կ��� ���� ��û�� ���½��ϴ�. ������ ���� ��û�� �³� �ҽ� �ٷ� PVP�� ���� �˴ϴ�.");
		cm.sendPVP("#Cgray##e�г��� : " + cm.getPlayer().getName() + "\r\n#r���� : " + cm.getPlayer().getLevel() + "#n#k", cm.getPlayer(), chr, 9000254);
		cm.dispose();
	} else if (sel == 2) {
		if (cm.getPlayer().getRankPoint() >= itemlist[sel2][1]) {
			if (!cm.canHold(itemlist[sel2][0])) {
				cm.sendOk("�����Ͻ� �������� ��ȯ �ϱ⿡�� �κ��丮�� ������ �����մϴ�.");
				cm.dispose();
				return;
			}
			cm.gainItem(itemlist[sel2][0],1);
			cm.getPlayer().addRankPoint(-itemlist[sel2][1]);
			cm.sendOk("�����Ͻ� �������� ���� �ص������ �κ��丮�� Ȯ���� ������.");
			cm.dispose();
		} else {
			cm.sendOk("�����Ͻ� �������� ��ȯ�ϱ⿡�� ��Ʋ ����Ʈ�� �����ؿ�");
			cm.dispose();
		}
	}
    }
}
