load('nashorn:mozilla_compat.js');
importPackage(Packages.tools.RandomStream);
var status = -1;
var state, amount;
var needitem = 4033247;
var num = 20;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

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
	cm.sendSimple("�ȳ��ϼ���, ���� �Ϲ� ��ȭ ���ǽ� �Դϴ�.\r\n\r\n#b#L0#�ý����� ��ȭ�ϰڽ��ϴ�.\r\n#L1#�� ���� ��ȭ�ϰڽ��ϴ�.");
    } else if (status == 1) {
	slot = selection;
	sel = selection == 0 ? "�ý���" : "����";
	var itemid = 0;
	var text = "#b#e"+sel+" ��ȭ#n#k�� ���� �ϼ̽��ϴ�.\r\n��ȭ�� �������� ���� �� �ּ���.\r\n";
	for(i = 1; i < 101; i ++) {
		if(cm.getEquip(i)) {
			itemid = cm.getEquip(i).getItemId();
			text += "\r\n#L"+i+"##b#i"+itemid+"##t"+itemid+"##k";
		}
	}
	cm.sendSimple(text);
    } else if (status == 2) {
	if(!cm.haveItem(needitem, num)) {
		cm.sendOk("��ȭ�� �ʿ��� #b#z"+needitem+"##k�� �����մϴ�.");
		cm.dispose(); return;
	}
	eq = cm.getEquip(selection);
	state = owner(eq);
	if(check(eq)) {
		cm.sendYesNo("���� ��ȭ���� : #b"+state+"#k\r\n������ ���� : "+sel+"\r\n���� ��ȭ�� �ö󰥶� ����Ȯ���� ������ �������� ��ġ�� �־����ϴ�. ��ȭ�� �����Ͻðڽ��ϱ�?");
	}
    } else if (status == 3) {
	if(Randomizer.rand(1, 100) > chance(eq)) {
		cm.sendOk("������ ��ȭ�� �����߽��ϴ�.");
		cm.dispose(); return;
	}
	amount = java.lang.Integer.parseInt(stat(eq, sel));
	level = level(eq);
		eq.setOwner(level);
		if(sel.equals("�ý���")) {
			eq.setStr(eq.getStr() + amount); 
			eq.setDex(eq.getDex() + amount); 
			eq.setInt(eq.getInt() + amount); 
			eq.setLuk(eq.getLuk() + amount);
			cm.sendOk("��ȭ�� �����Ͽ� �ý��� "+amount+" �� �߰��ǰ� "+level+" �� �Ǿ����ϴ�."); 
			cm.dispose(); return;
		} else {
			eq.setMatk(eq.getMatk() + amount);
			eq.setWatk(eq.getWatk() + amount);
			cm.sendOk("��ȭ�� �����Ͽ� ���� "+amount+" �� �߰��ǰ� "+level+" �� �Ǿ����ϴ�."); 
			cm.dispose(); return;
		}
    }
}

function chance(eq) {
var chance;
	if(eq.getOwner().equals("1��")) {
 		chance = 90; // 1������ 2������ Ȯ�� ex) 10 : 10%
	} else if(eq.getOwner().equals("2��")) {
		chance = 80; // 2������ 3������ Ȯ�� ex) 10 : 10%
	} else if(eq.getOwner().equals("3��")) {
		chance = 70; // 3������ 4������ Ȯ�� ex) 10 : 10%
	} else if(eq.getOwner().equals("4��")) {
		chance = 60; // 4������ 5������ Ȯ�� ex) 10 : 10%
	} else if(eq.getOwner().equals("5��")) {
		chance = 50; // 5������ 6������ Ȯ�� ex) 10 : 10%
	} else if(eq.getOwner().equals("6��")) {
		chance = 40; // 6������ 7������ Ȯ�� ex) 10 : 10%
	} else {
		chance = 100; // 1������ Ȯ�� ex) 10 : 10%
	}
	return chance;
}

function level(eq) {
var lev;
	if(eq.getOwner().equals("1��")) {
		lev = "2��";
	} else if(eq.getOwner().equals("2��")) {
		lev = "3��";
	} else if(eq.getOwner().equals("3��")) {
		lev = "4��";
	} else if(eq.getOwner().equals("4��")) {
		lev = "5��";
	} else if(eq.getOwner().equals("5��")) {
		lev = "6��";
	} else if(eq.getOwner().equals("6��")) {
		lev = "7��";
	} else {
		lev = "1��";	
	}
	return lev;
}
function stat(eq, sel) {
	var stat;
	if(eq.getOwner().equals("1��")) { // 1�� - 2�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);
						//	���� �̰͵� ó�� �ؿ��ŵ� �����ϰ�

	} else if(eq.getOwner().equals("2��")) { // 2�� - 3�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);	

	} else if(eq.getOwner().equals("3��")) { // 3�� - 4�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);
	
	} else if(eq.getOwner().equals("4��")) { // 4�� - 5�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);
	
	} else if(eq.getOwner().equals("5��")) { // 5�� - 6�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);	

	} else if(eq.getOwner().equals("6��")) { // 6�� - 7�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);	

	} else { // 1������ ���� ����
		stat = sel == "�ý���" ? Randomizer.rand(1, 30) : Randomizer.rand(2, 15);	
	}
	return stat;	
}
function check(eq) {
	if(eq.getUpgradeSlots() > 0) {
		cm.sendOk("���׷��̵� ���� Ƚ���� ��� �����ؾ� ��ȭ�� �� �� �ֽ��ϴ�.");
		cm.dispose(); return;
	}
	if(eq.getOwner().equals("7��")) {
		cm.sendOk("�ش� �������� ��ȭ�� ���̻� �� �� �����ϴ�.");
		cm.dispose(); return;
	}
	return true;
}

function owner(eq) {
	for(i = 1; i < 7; i++) {
		if(eq.getOwner().equals(i+"��")) {
			return eq.getOwner();
		}
	} 
	if(state == null) {
		return "#r��ȭ����#k";
	}
}

