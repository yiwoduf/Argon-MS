var status = -1;
var sel = 0;
var scroll = Array(2046025, 2046026, 2046119, 2046120, 2046251, 2046340, 2046341);
var canbuyitem = [[2431870, 500000]];
var scroll_sel1 = 0;
var scroll_sel2 = 0;
var scroll_check = false;
var po = 0;
var allstats = 0;
var sefq = 0;

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
    	var chat = "#e#r�ȳ��ϼ��� ���� 3�ܰ� ���ǽ�  �Դϴ� !";
	//chat += "\r\n#e#b2���� �̻� �Ŀ� �� Ư���г��� �߰� ����#n#k";
	chat += "\r\n#e#d[�̰��� Ÿ���� 10��� �����ϰ� 10�ۼ�Ʈ �������� ���ҵ˴ϴ�. 30���Ŀ�����Ʈ�Դϴ�.]#n#k\r\n";
	chat += "���� #b#h #���� ���� �Ŀ�����Ʈ : #e#r"+cm.getRC()+"#n#k\r\n";
	//chat += "#L0##b�����ۿ� �ý����� �ο� �ϰڽ��ϴ�.#l\r\n";
	chat += "#L1##b�Ŀ�����Ʈ�� �������� �����ϰڽ��ϴ�.#l#k";
	cm.sendSimple(chat);
    } else if (status == 1) {
	sefq = selection;
	if (selection == 0) {
	var chat = cm.getDonateList();
	if (chat == "�ɼ��� �ο� �� �� �ִ� �������� �������� �ʽ��ϴ�.") {
		cm.sendOk(chat);
		cm.dispose();
		return;
	}
	cm.sendSimple("�ɼ��� �ο� �� �������� ������ �ּ���.\r\n" + chat);
	} else if (selection == 1) {
		var chatt = "� �������� �����Ͻðڽ��ϱ�?\r\n";
		for (var dkq = 0; dkq < canbuyitem.length; dkq++) {
			chatt += "\r\n#L" + dkq + "##b#i" + canbuyitem[dkq][0] + "# #z" + canbuyitem[dkq][0] + "# (" + canbuyitem[dkq][1] + " ����Ʈ)#l";
		}
		cm.sendSimple(chatt);
	}
    } else if (status == 2) {
	po = selection;
	if (sefq == 0) {
	var allstat = parseInt(((cm.getRC()) / 10) > 32767 ? 32767 : ((cm.getRC()) / 10));
	cm.sendGetNumber("�ο��� �ý����� �Է��� �ֽʽÿ�\r\n(�Ŀ�����Ʈ�� �ƴ� �ý����� �Է��ؾ� �մϴ�.)\r\n#Cgray##e[#n#r�ý��� 10 : �Ŀ�����Ʈ 100#e#Cgray#]#n#b\r\n" + cm.getPlayer().getName() + "���� �ִ� �ý��� " + allstat + "(��)�� �ο� �� �� �ֽ��ϴ�.#k",0,0,allstat);
	} else if (sefq == 1) {
	  cm.sendYesNo("������ #b" + canbuyitem[po][1] + "����Ʈ#k�� ����Ͽ�\r\n#b#i" + canbuyitem[po][0] + "# #z" + canbuyitem[po][0] + "##k�� �����Ͻðڽ��ϱ�?");
	}
    } else if (status == 3) {
	if (sefq == 0) {
	sel = selection;
	cm.sendYesNo("������ �Ŀ�����Ʈ�� ��� �Ͻðڽ��ϱ�?");
	} else if (sefq == 1) {
		if (cm.getRC() >= canbuyitem[po][1]) {
			if (cm.canHold(canbuyitem[po][0])) {
				cm.sendOk("���Ű� �Ϸ�Ǿ����ϴ�.");
				cm.gainItem(canbuyitem[po][0], 1);			
				cm.gainRC(-(canbuyitem[po][1]));
				cm.dispose();
				return;
			} else {
				cm.sendOk("�����Ͻ� �������� �����ϱ⿡�� �κ��丮�� �� ������ ���� �մϴ�.");
				cm.dispose();
				return;
			}
		} else {
			cm.sendOk("�Ŀ�����Ʈ�� �����Ͽ� �����ϽǼ� �����ϴ�.");
			cm.dispose();
			return;
		}
	}
    } else if (status == 4) {
	if ((sel * 10) >= 50000) {
		if ((sel * 10) >= 50000) {
			var chat = "50000 �Ŀ�����Ʈ �̻� ���� �����Դ� #b8ե�ֹ��� 2��#k�� ���޵˴ϴ�. ù��° �ֹ����� ������ �ּ���.\r\n#b";
			for (var i = 0; i < scroll.length; i ++) {
				chat += "#L" + i + "# #i" + scroll[i] + "# #z" + scroll[i] + "##l\r\n";
			}
			cm.sendSimple(chat);
			scroll_check = true;
		}
	} else {
		cm.gainRC(-(sel * 10));
		cm.setDonateStat(po,sel);
		cm.dispose();
	}
    } else if (status == 5) {
	scroll_sel1 = selection;
	var chat = "50000 �Ŀ�����Ʈ �̻� ���� �����Դ� #b8ե�ֹ��� 2��#k�� ���޵˴ϴ�. �ι�° �ֹ����� ������ �ּ���.\r\n#b";
	for (var i = 0; i < scroll.length; i ++) {
		chat += "#L" + i + "# #i" + scroll[i] + "# #z" + scroll[i] + "##l\r\n";
	}
	cm.sendSimple(chat);
	scroll_check = false;
    } else if (status == 6) {
	scroll_sel2 = selection;
	if (cm.canHold(scroll[scroll_sel1]) && cm.canHold(scroll[scroll_sel2])) {			
		cm.gainRC(-(sel * 10));
		cm.gainItem(scroll[scroll_sel1], 1);
		cm.gainItem(scroll[scroll_sel2], 1);
		cm.setDonateStat(po,sel);
		cm.dispose();
	} else {
		cm.sendOk("�����Ͻ� �������� �����ϱ⿡�� �κ��丮�� �� ������ ���� �մϴ�.");
		cm.dispose();
		return;
	}
    }
}
