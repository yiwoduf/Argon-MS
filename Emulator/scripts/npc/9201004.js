importPackage(Packages.constants);
var itemid = 4214002;
var status = -1;
var chr;
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
		cm.sendYesNo(info + "\r\n������ ���� ûȥ ��û�� �Խ��ϴ�. �³� �ҽ� �ٷ� ��ȥ���� ���� �˴ϴ�.");
	} else {
		if (cm.getChar(chr.getName()) == null) {
			cm.sendOk(chr.getName() + "���� ���� �� �ʿ� �������� �ʽ��ϴ�.");
			cm.dispose();
			return;
		}
		chr.gainItem(itemid,-1,false,-1,"");
		cm.startMarri(chr.getName());
		cm.dispose();
	}
}

function action(mode, type, selection) {
    if (cm.getPlayer().getMapId() != 680000210) {
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
	cm.sendSimple("�������� ����ϴ� ����� ��ȥ�� �غ��ðڽ��ϱ�?\r\n#L0##b��ȥ���� �����ϰ� �ͽ��ϴ�.#l");
    } else if (status == 1) {
	if (ServerConstants.isMarri) {
		cm.sendOk("�̹� �ٸ� Ŀ���� ��ȥ���� �����ϰ� �ֽ��ϴ�. ��ȥ���� ������ ��û�� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
		return;
	}
	cm.sendGetText("��ȥ�� �ϰ���� ������ �г����� �Է��� �ּ���.");
    } else if (status == 2) {
	if (cm.getPlayer().getName() == cm.getText()) {
		cm.sendOk("���ΰ��� ��ȥ�� �ɰŶ�� ���� �Ͻʴϱ�?");
		cm.dispose();
		return;
	}
	var error = cm.isMarriCheck(cm.getText());
	if (error != "") {
		cm.sendOk(error);
		cm.dispose();
		return;
	}

	if (!cm.haveItem(itemid,1)) {
		cm.sendOk("��ȥ���� �����ϱ� ���ؼ� #i" + itemid + "##b#z" + itemid + "##k�� �ʿ� �մϴ�.");
		cm.dispose();
		return;
	}
	chr = cm.getChar(cm.getText());
	if (chr != null) {
		cm.sendYesNo("#Cgray##e�г��� : " + chr.getName() + "#n#k\r\n�Կ��� ������ ûȥ ��û�� �Ͻðڽ��ϱ�?");
	} else {
		cm.sendOk("�Է��Ͻ� ���� ���� �̸ʿ� ����� �ʽ��ϴ�.");
		cm.dispose();
	}
    } else if (status == 3) {
		cm.sendOk("#Cgray##e�г��� : " + chr.getName() + "#n#k\r\n�Կ��� ûȥ ��û�� �Ͽ����ϴ�. ������ ûȥ�� �³� �ҽ� �� �ٷ� ��ȥ���� ���� �˴ϴ�.");
		cm.sendPVP("#Cgray##e�г��� : " + cm.getPlayer().getName() + "#n#k", cm.getPlayer(), chr, 9201004);
		cm.dispose();
    }
    } else {
    	if (mode == -1) {
        	cm.dispose();
        	return;
    	}
    	if (mode == 0) {
        	status --;
    	}
    	if (mode == 1) {
        	status++;
    	}

   	if (status == 0) {
        	cm.sendOk("������ ����� ��� ���� �����ϰ� �Ѵ�ϴ�.");
       		cm.dispose();
        	return;
    	}
	}
}
