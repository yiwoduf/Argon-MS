var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var �ĺ� = "#fUI/GuildMark.img/Mark/Pattern/00004001/10#";

importPackage(Packages.constants);

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
	    if (cm.getPlayer().getLevel() >= 200) {
		var jessica = "              #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" ȯ�� ���� "+��+"\r\n#fs10##Cgray#                               ���Ͻô� �޴��� �������ּ���.#k#fs12#\r\n\r\n";
		jessica += "--------------------------------------------------------------------------------\r\n";
		jessica += �ĺ�+"#L0##i2028335# #r1 �鸸 �޼�#k �� #i4310129# #b��Ӹ��� ����#k #r1 ��#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L1##i2028335# #r1 õ�� �޼�#k �� #i4310129# #b��Ӹ��� ����#k #r10 ��#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L2##i2028335# #r1 �� �޼�#k �� #i4310129# #b��Ӹ��� ����#k #r100 ��#k �� ȯ��#l\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += �ĺ�+"#L3##i4310129# #b��Ӹ��� ����#k #r1 ��#k �� #i2028335# #r5 �ʸ� �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L4##i4310129# #b��Ӹ��� ����#k #r10 ��#k �� #i2028335# #r5 �鸸 �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L5##i4310129# #b��Ӹ��� ����#k #r100 ��#k �� #i2028335# #r5 õ�� �޼�#k �� ȯ��#l\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += �ĺ�+"#L6##i4001549# #b�������� ��ȭ#k #r1 ��#k �� #i2028335# #r1 �ʸ� �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L7##i4001550# #b�������� ��ȭ#k #r1 ��#k �� #i2028335# #r1 �鸸 �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L70##i4001551# #b�������� ��ȭ#k #r1 ��#k �� #i2028335# #r1 õ�� �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L8##i4001549# #b�������� ��ȭ#k #r10 ��#k �� #i2028335# #r1 �鸸 �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L9##i4001550# #b�������� ��ȭ#k #r10 ��#k �� #i2028335# #r1 õ�� �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L90##i4001551# #b�������� ��ȭ#k #r10 ��#k �� #i2028335# #r1 �� �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L10##i4001549# #b�������� ��ȭ#k #r100 ��#k �� #i2028335# #r1 õ�� �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L11##i4001550# #b�������� ��ȭ#k #r100 ��#k �� #i2028335# #r1 �� �޼�#k �� ȯ��#l\r\n";
		jessica += �ĺ�+"#L110##i4001551# #b�������� ��ȭ#k #r100 ��#k �� #i2028335# #r10 �� �޼�#k �� ȯ��#l\r\n\r\n--------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ӹ��� ���� ȯ�� ������ ���� 200 �̻� �̿� �����մϴ�.",9062004);
	cm.dispose();
        }
	} else if (status == 1) {
	if (selection == 0) {
           if(cm.getMeso() > 1000000) {
	   if (cm.canHold(4310129)) {
              cm.gainMeso(-1000000);
              cm.gainItem(4310129,1);
	      cm.sendOk("#fn������� Extrabold##i2028335# #r1 �鸸 �޼�#k �� #i4310129# #b��Ӹ��� ����#k #r1 ��#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i2028335# 1 �鸸 �޼� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
        } else if (selection == 1) {
           if(cm.getMeso() > 10000000) {
	   if (cm.canHold(4310129)) {
              cm.gainMeso(-10000000);
              cm.gainItem(4310129,10);
	      cm.sendOk("#fn������� Extrabold##i2028335# #r1 õ�� �޼�#k �� #i4310129# #b��Ӹ��� ����#k #r10 ��#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i2028335# 1 õ�� �޼� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
        } else if (selection == 2) {
           if(cm.getMeso() > 680000000) {
	   if (cm.canHold(4310129)) {
              cm.gainMeso(-680000000);
              cm.gainItem(4310129,100);
	      cm.sendOk("#fn������� Extrabold##i2028335# #r1 �� �޼�#k �� #i4310129# #b��Ӹ��� ����#k #r100 ��#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ּ���.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i2028335# 1 �� �޼� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }

	} else if (selection == 3) {
           if(cm.haveItem(4310129, 1)) {
              cm.gainItem(4310129, -1);
              cm.gainMeso(500000);
	      cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k #r1 ��#k �� #i2028335# #r5 �ʸ� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4310129# 1 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 4) {
           if(cm.haveItem(4310129, 10)) {
              cm.gainItem(4310129, -10);
              cm.gainMeso(5000000);
	      cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k #r10 ��#k �� #i2028335# #r5 �鸸 �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4310129# 10 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 5) {
           if(cm.haveItem(4310129, 100)) {
              cm.gainItem(4310129, -100);
              cm.gainMeso(50000000);
	      cm.sendOk("#fn������� Extrabold##b��Ӹ��� ����#k #r100 ��#k �� #i2028335# #r5 õ�� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4310129# 100 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 6) {
           if(cm.haveItem(4001549, 1)) {
              cm.gainItem(4001549, -1);
              cm.gainMeso(100000);
	      cm.sendOk("#fn������� Extrabold##b�������� ��ȭ#k #r1 ��#k �� #i2028335# #r1 �ʸ� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001549# 1 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 7) {
           if(cm.haveItem(4001550, 1)) {
              cm.gainItem(4001550, -1);
              cm.gainMeso(1000000);
	      cm.sendOk("#fn������� Extrabold##�������� ��ȭ#k #r1 ��#k �� #i2028335# #r1 �鸸 �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001550# 1 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 8) {
           if(cm.haveItem(4001549, 10)) {
              cm.gainItem(4001549, -10);
              cm.gainMeso(1000000);
	      cm.sendOk("#fn������� Extrabold##b�������� ��ȭ#k #r10 ��#k �� #i2028335# #r1 �鸸 �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001549# 10 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 9) {
           if(cm.haveItem(4001550, 10)) {
              cm.gainItem(4001550, -10);
              cm.gainMeso(10000000);
	      cm.sendOk("#fn������� Extrabold##b�������� ��ȭ#k #r10 ��#k �� #i2028335# #r1 õ�� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001550# 10 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 10) {
           if(cm.haveItem(4001549, 100)) {
              cm.gainItem(4001549, -100);
              cm.gainMeso(10000000);
	      cm.sendOk("#fn������� Extrabold##b�������� ��ȭ#k #r100 ��#k �� #i2028335# #r1 õ�� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001549# 100 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 11) {
           if(cm.haveItem(4001550, 100)) {
              cm.gainItem(4001550, -100);
              cm.gainMeso(680000000);
	      cm.sendOk("#fn������� Extrabold##b�������� ��ȭ#k #r100 ��#k �� #i2028335# #r1 �� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001550# 100 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }

	} else if (selection == 70) {
           if(cm.haveItem(4001551, 1)) {
              cm.gainItem(4001551, -1);
              cm.gainMeso(10000000);
	      cm.sendOk("#fn������� Extrabold##�������� ��ȭ#k #r1 ��#k �� #i2028335# #r1 õ�� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001551# 1 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 90) {
           if(cm.haveItem(4001551, 10)) {
              cm.gainItem(4001551, -10);
              cm.gainMeso(680000000);
	      cm.sendOk("#fn������� Extrabold##b�������� ��ȭ#k #r10 ��#k �� #i2028335# #r1 �� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001551# 10 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
	} else if (selection == 110) {
           if(cm.haveItem(4001551, 100)) {
              cm.gainItem(4001551, -100);
              cm.gainMeso(6800000000);
	      cm.sendOk("#fn������� Extrabold##b�������� ��ȭ#k #r100 ��#k �� #i2028335# #r10 �� �޼�#k �� #dȯ�� �Ϸ�#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn������� Extrabold##rȯ���� �ϱ� ���ؼ��� #i4001551# 100 �� �� �ʿ��մϴ�.#k");
		cm.dispose();
	   }
}
}
}
}