var status = -1;var k = "#fNpc/9000000/stand/0#";
var k1 = "#fNpc/9000000/stand/0#";
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
	var chat = "�ȳ��ϼ��� #b" + cm.getPlayer().getName() + "#k�� �������̵� ���Դϴ�. ��󺸼���~#r";
	chat += "\r\n#g#L3000##i1102550# ���ӱ׸� ����(800) #l #b#L3001##i1102551# �����̾� ����(800)#l\r\n";
	chat += "#r#L3002##i1702624# ������ Ÿ��(1100)#l#L3005##i1702565# �����ǵ��� (1100)\r\n";
	chat += "#b#L3003##i1002186# �������(900)   #b#L3004##i1072153# ����Ź� (900)\r\n#k#l";
	chat += "#r#L3015##i2434655# ������ȣ ��������Ų��(500��) #l#k#l";
    chat += "\r\n#L5# ��ȭ�� �׸� �Ѵ�.#l\r\n";

	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(2150007);
	} else if (selection == 1) {
		cm.warp(410000000);
		cm.dispose();
	} else if (selection == 2) {
		cm.warp(910196002);
		cm.dispose();
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(2192002);
} else if (selection == 3000) {
if (cm.haveItem(4310058, 800)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r�������̵� ������#k�� #r#i1102550# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310058, -800);
                        cm.gainSponserItem(1102550,'[�����÷���]',1000,200,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�������̵�����#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3001) {
if (cm.haveItem(4310058, 800)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r�������̵� ������#k�� #r#i1102551# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310058, -800);
                        cm.gainSponserItem(1102551,'[�����÷���]',1000,200,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�������̵�����#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3002) {
if (cm.haveItem(4310058, 1100)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r�������̵� ������#k�� #r#i1702624# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310058, -1100);
                        cm.gainSponserItem(1702624,'[�����÷���]',1200,300,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�������̵�����#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3003) {
if (cm.haveItem(4310058, 900)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r�������̵� ������#k�� #r#i1702624# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310058, -900);
                        cm.gainSponserItem(1002186,'[�����÷���]',800,150,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�������̵�����#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3004) {
if (cm.haveItem(4310058, 900)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r�������̵� ������#k�� #r#i1702624# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310058, -900);
                        cm.gainSponserItem(1072153,'[�����÷���]',800,150,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�������̵�����#k�� �����մϴ�.");
		    cm.dispose();
}
} else if (selection == 3005) {
if (cm.haveItem(4310058, 1100)) {
		    if (cm.canHold(4310058)) {
		        cm.sendOk("#r�������̵� ������#k�� #r#i1702624# �� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4310058, -1100);
                        cm.gainSponserItem(1702565,'[�����÷���]',1200,300,0);
			cm.dispose();
		    } else {
		        cm.sendOk("���ĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�������̵�����#k�� �����մϴ�.");
		    cm.dispose();
}
	} else if (selection == 4) {
                cm.dispose();
		cm.openNpc(1540010);
	} else if (selection == 5) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
