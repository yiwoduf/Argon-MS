importPackage(Packages.tools.RandomStream);
var status = -1;
var state, amount;

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
	//cm.sendSimple("#fn������� Extrabold##fs13# �ȳ��ϼ���, ���� �Ϲ� ��ȭ ���ǽ� �Դϴ�.\r\n#rȲ�ݴ�ǳ�� <6�� �Ҹ�>#k#l\r\n#b#L0#�ý����� ��ȭ�ϰڽ��ϴ�.\r\n#L1#�� ���� ��ȭ�ϰڽ��ϴ�.\r\n");
        var chat = "#fn������� Extrabold##fs13# #r#e" + cm.getPlayer().getName() + "#n#k�� �ȳ��ϼ���, ���� �޼� ��ȭ ���ǽ��Դϴ�.#l\r\n";
        chat += "#b#L0#�ý����� ��ȭ�ϰڽ��ϴ�.#k#l\r\n";
        chat += "#b#L1#���ݷ�/������ ��ȭ �ϰڽ��ϴ�.#k#l\r\n";
        
        cm.sendSimple(chat);
    } else if (status == 1) {
        slot = selection;
        sel = selection == 0 ? "�ý���" : "���ݷ�/����";
        var itemid = 0;
        text = "#b#e"+sel+"#fn������� Extrabold##fs13# ��ȭ#n#k�� ���� �ϼ˽��ϴ�.\r\n��ȭ�� �������� ���� �� �ּ���.\r\n";
        for (i = 0; i < 101; i++) {
            if (cm.getEquip(i)) {
                itemid = cm.getEquip(i).getItemId();
		text += "\r\n#L"+i+"##b#i"+itemid+"##t"+itemid+"##k";
            }
        }
        cm.sendSimple(text);
    } else if (status == 2) {
        eq = cm.getEquip(selection);
        state = owner(eq);
        if (cm.getPlayer().getMeso() < meso(eq)) {
            cm.sendOk("#fn������� Extrabold##fs13# ��ȭ�� �ʿ��� �޼Ұ� �����մϴ�.\r\n(�ʿ��� �޼��� �� : "+meso(eq)+")");
            cm.dispose();
            return;
        }
        
        if (check(eq)) {
            cm.sendYesNo("#fn������� Extrabold##fs13# ���� ��ȭ ���� : #b"+state+"#k\r\n������ ���� : "+sel+"\r\n���� ��ȭ�� �ö󰥶� ����Ȯ���� 40%�� ��ġ�� ��ȭȽ���� ���� �־����ϴ�.\r\n��ȭ�� ���� �Ͻðڽ��ϱ�?");
        }
    } else if (status == 3) {
        if (Randomizer.isSuccess(40)) {
            cm.sendOk("#fn������� Extrabold##fs13# ������ ��ȭ�� ���� �Ͽ����ϴ�.");
            cm.gainMeso(-meso(eq));
            cm.dispose();
            return;
        }
        amount = java.lang.Integer.parseInt(stat(eq,sel));
        level = level(eq);
        cm.gainMeso(-meso(eq));
        eq.setOwner(level);
        if (sel.equals("�ý���")) {
            eq.setStr(eq.getStr() + amount);
            eq.setDex(eq.getDex() + amount);
            eq.setInt(eq.getInt() + amount);
            eq.setLuk(eq.getLuk() + amount);
            cm.fakeRelog();
            cm.updateChar();
            cm.sendOk("��ȭ�� �����Ͽ� �ý��� "+amount+"�� �߰��ǰ� "+level+" �� �Ǿ����ϴ�.");
            cm.dispose();
            return;
        } else {
            eq.setMatk(eq.getMatk() + amount);
            eq.setWatk(eq.getWatk() + amount);
	    cm.fakeRelog();
	    cm.updateChar();
	    cm.sendOk("��ȭ�� �����Ͽ� ���� "+amount+" �� �߰��ǰ� "+level+" �� �Ǿ����ϴ�."); 
            cm.dispose();
            return;
        }
    }
}

function level(eq) {
    var lev;
    if (eq.getOwner().equals("1��")) {
        lev = "2��";
    } else if (eq.getOwner().equals("2��")) {
        lev = "3��";
    } else if (eq.getOwner().equals("3��")) {
        lev = "4��";
    } else if (eq.getOwner().equals("4��")) {
        lev = "5��";
    } else if (eq.getOwner().equals("5��")) {
        lev = "6��";
    } else if (eq.getOwner().equals("6��")) {
        lev = "7��";
    } else if (eq.getOwner().equals("7��")) {
        lev = "8��";
    } else if (eq.getOwner().equals("8��")) {
        lev = "9��";
    } else if (eq.getOwner().equals("9��")) {
        lev = "10��";
    } else {
        lev = "1��";
    }
    return lev;
}

function stat(eq, sel) {
    var stat;
	if(eq.getOwner().equals("1��")) { // 1�� - 2�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(15, 15);
	} else if(eq.getOwner().equals("2��")) { // 2�� - 3�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(20, 20);	
	} else if(eq.getOwner().equals("3��")) { // 3�� - 4�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(25, 25);	
	} else if(eq.getOwner().equals("4��")) { // 4�� - 5�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(30, 30);	
	} else if(eq.getOwner().equals("5��")) { // 5�� - 6�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(35, 35);	
	} else if(eq.getOwner().equals("6��")) { // 6�� - 7�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(40, 40);	
        } else if(eq.getOwner().equals("7��")) { // 6�� - 7�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(45, 45);	
        } else if(eq.getOwner().equals("8��")) { // 6�� - 7�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(50, 50);	
        } else if(eq.getOwner().equals("9��")) { // 6�� - 7�� �Ѿ�� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(60, 60);	         
	} else { // 1������ ���� ����
		stat = sel == "�ý���" ? Randomizer.rand(8, 50) : Randomizer.rand(10, 10);	
	}
	return stat;		
}

function check(eq) {
    if (eq.getOwner().equals("1��")) {
        cm.sendOk("#fn������� Extrabold##fs13# �ش�������� Ȳ�� ��ǳ�� ��ȭ�� �����Ͽ� �޼� ��ȭ�� �� �� �����ϴ�.");
        cm.dispose();
        return;
    }
    if (eq.getOwner().equals("10��")) {
        cm.sendOk("#fn������� Extrabold##fs13# �ش� �������� ��ȭ�� ���̻� �� �� �����ϴ�.");
        cm.dispose();
        return;
    }
    return true;
}

function meso (eq) {
    var meso;
    if (eq.getOwner().equals("1��")) {
        meso = 10000000;
    } else if (eq.getOwner().equals("2��")) {
        meso = 15000000;
    } else if (eq.getOwner().equals("3��")) {
        meso = 30000000;
    } else if (eq.getOwner().equals("4��")) {
        meso = 50000000;
    } else if (eq.getOwner().equals("5��")) {
        meso = 100000000;
    } else if (eq.getOwner().equals("6��")) {
        meso = 200000000;
    } else if (eq.getOwner().equals("7��")) {
        meso = 300000000;
    } else if (eq.getOwner().equals("8��")) {
        meso = 500000000;
    } else if (eq.getOwner().equals("9��")) {
        meso = 1000000000;
    } else {
        meso = 10000000;
    }
    return meso;
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