//��ȭ���� ��

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
		var jessica = "#fn������� Extrabold#���� ���� ���̾�Ʈ�� ����Ϸ��� #b���� ���#k �� #r1 ��#k �ʿ���..\r\n";
		jessica += "�׸��� �ϰ� Į�θ��� üũ�Ҷ����� #bĮ�θ� �Ҹ� ������#k ��\r\n";
		jessica += "#r1 ��#k �� #r�Ҹ�#k �Ǵϰ�.. �ʿ��Ѹ�ŭ ����� �����ϱ� �ٷ�~\r\n";
		jessica += "�׸��� �̹� ��������� �ٽ� �ѹ� ����� �˷��ٰ�~\r\n\r\n";
		jessica += "  #r*#k ���̾�Ʈ ���� ���\r\n";
		jessica += "    1. ������ #b���� ���#k�� #b������#k �� �Ѵ� �����Ѵ�.\r\n";
		jessica += "    2. �ʿ��� #r�Ϲ� ����#k �� �ϸ� ���̾�Ʈ�� #r����#k �ȴ�.\r\n\r\n";
		jessica += "    #r��#k #d�� �����ø��� Į�θ� �����Ⱑ 1 �� �� �Ҹ� �ȴܴ�..#k\r\n";
		jessica += "    #r��#k #dĮ�θ� �Ҹ� �����ϸ� ������ ������ ȹ���Ұž�..#k\r\n";
		jessica += "    #r��#k #d��, ��Ÿâ�� ������ ������ ȹ������ ���Ҽ��� �־�..#k\r\n";
		jessica += "    #r��#k #d������ ������ ���� ���� ���������� ��ȯ���ٰ�~#k\r\n";
		jessica += " -----------------------------------------------------------------------------\r\n";
		jessica += "#L0##i4033109# #b#t4033109##k #d����(1��)#k - #r1 õ�� �޼�#k\r\n";
		jessica += "#L1##i3994287# #b#t3994287##k #d����(50��)#k - #r5 �鸸 �޼�#k#l\r\n\r\n";
		jessica += " -----------------------------------------------------------------------------\r\n";
		jessica += "#L2##i4032559# #b#t4032559##k #d��ȯ ����#k#l\r\n\r\n";
		jessica += " -----------------------------------------------------------------------------\r\n";
		jessica += "#L3#  #d����Ʈ�� ����#k ���� �̵��ϱ�#k#l\r\n\r\n";
		jessica += " -----------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
        } else if (status == 1) {
	if (selection == 0) {
		if (cm.getMeso() >= 10000000) {
		if (cm.canHold(4033109)) {
		cm.gainItem(4033109, 1);
		cm.gainMeso(-10000000);
		cm.sendOk("#fn������� Extrabold#���� �� ���� ���� ���̾�Ʈ�� ����� �� ����!");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��Ÿ â �� �� ĭ �̻� ����ּ���..#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r�޼Ұ� ������ �� ������..?#k");
		cm.dispose();
		}

	} else if (selection == 1) {
		if (cm.getMeso() >= 5000000) {
		if (cm.canHold(3994287)) {
		cm.gainItem(3994287, 50);
		cm.gainMeso(-5000000);
		cm.sendOk("#fn������� Extrabold#���� ���� �Ǿ�����, ���� Į�θ� ������ �����غ�!");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r��ġ â �� �� ĭ �̻� ����ּ���..#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r�޼Ұ� ������ �� ������..?#k");
		cm.dispose();
		}

	} else if (selection == 2) {
		var jessica3 = "#fn������� Extrabold##b����ó�� ������ ����#k �� �����ִ�?~\r\n\r\n";
		jessica3 += " --------------------------------------------------------------------------------\r\n";
		jessica3 += "#L0##b�ֹ���#k #i2048094# #d���ݷ�#k #r[���� 100]#k\r\n";
		jessica3 += "#L1##b�ֹ���#k #i2048095# #d��   ��#k #r[���� 100]#k#l\r\n\r\n";
		jessica3 += " --------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica3);
	
	} else if (selection == 3) {
		cm.dispose();
		cm.warp(100030301,0);
		}		
        } else if (status == 2) {
	if (selection == 0) {
		if (cm.haveItem(4032559, 100)) {
		if (cm.canHold(2048094)) {
		cm.gainItem(4032559, -100);
		cm.gainItem(2048094, 1);
		cm.sendOk("#fn������� Extrabold#���п� ��ǰ�� ���ۿ� ���ٴ°��� ���޾Ҿ�!\r\n�ʰ� ���ϴ� #i2048094# �� �ٰ�~");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ĭ �̻� ����ּ���..#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r������ ������ �� ������..?#k");
		cm.dispose();
		}
	} else if (selection == 1) {
		if (cm.haveItem(4032559, 100)) {
		if (cm.canHold(2048095)) {
		cm.gainItem(4032559, -100);
		cm.gainItem(2048095, 1);
		cm.sendOk("#fn������� Extrabold#���п� ��ǰ�� ���ۿ� ���ٴ°��� ���޾Ҿ�!\r\n�ʰ� ���ϴ� #i2048095# �� �ٰ�~");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ĭ �̻� ����ּ���..#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn������� Extrabold##r������ ������ �� ������..?#k");
		cm.dispose();
		}
}
}
}
}