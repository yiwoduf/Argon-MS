load('nashorn:mozilla_compat.js');
importPackage(Packages.tools.RandomStream);

var status = -1;
var ����ǥ���� = 2430026;  
var Ȳ�� = 4033247;
var S��� = [[1182200, 1], [2434710, 1], [1032232, 1], [1402180, 1], [1382235, 1], [1122280, 1], [1032110, 1], [1113231, 1], [2431023, 1]];
var A��� = [[1142078, 1], [2431011, 1], [1182191, 1], [2431012, 1], [1113149, 1], [1402224, 1], [1113070, 1]];
var B��� = [[1142922, 1], [3700347, 1], [1142032, 1], [1122254, 1], [1012283, 1], [1022232, 1], [1113055, 1], [2430686, 1], [2434981, 1]];
var C��� = [[1142099, 1], [1142472, 1], [3700346, 1], [1112662, 1], [3700345, 1]];

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
	cm.sendSimple("���� �̱� ���� ���ǽ� �Դϴ�. \r\n\r\n#b#L1#Ȳ�ݴ�ǳ�� ����̱�");
    } else if(status == 1) {
	sel = selection;
	if(sel == 0) {
		cm.sendSimple("���� �̱⸦ �����Ͻðڽ��ϱ�?\r\n\r\n#b#L0#S ���#l #L1#A ���#l #L2#B ���#l");
	} else if(sel == 1) {
		cm.sendSimple("���� �̱⸦ �����Ͻðڽ��ϱ�?\r\n\r\n#b#L0#A ���#l #L1#B ���#l #L2#C ���#l");
	}
    } else if(status == 2) {
	state = selection;
	if(sel == 0) {
		if(state == 0) {
			cm.sendYesNo("S ��� �̱⸦ �����ϼ̽��ϴ�. �ʿ��� �Ŀ�����Ʈ�� 7000  �Դϴ�. ��� �����Ͻðڽ��ϱ�?");
		} else if(state == 1) {
			cm.sendYesNo("A ��� �̱⸦ �����ϼ̽��ϴ�. �ʿ��� �Ŀ�����Ʈ�� 4000 �Դϴ�. ��� �����Ͻðڽ��ϱ�?");
		} else { 
			cm.sendYesNo("B ��� �̱⸦ �����ϼ̽��ϴ�. �ʿ��� �Ŀ�����Ʈ�� 2000 �Դϴ�. ��� �����Ͻðڽ��ϱ�?");
		}
	} else {
		if(state == 0) {
			cm.sendYesNo("A ��� �̱⸦ �����ϼ̽��ϴ�. �ʿ��� Ȳ�ݴ�ǳ���� 50�� �Դϴ�. ��� �����Ͻðڽ��ϱ�?");
		} else if(state == 1) {
			cm.sendYesNo("B ��� �̱⸦ �����ϼ̽��ϴ�. �ʿ��� Ȳ�ݴ�ǳ���� 30�� �Դϴ�. ��� �����Ͻðڽ��ϱ�?");
		} else { 
			cm.sendYesNo("C ��� �̱⸦ �����ϼ̽��ϴ�. �ʿ��� Ȳ�ݴ�ǳ���� 10�� �Դϴ�. ��� �����Ͻðڽ��ϱ�?");
		}
	}
    } else if(status == 3) {
	if(sel == 0) {
		if(state == 0) {
			var rand = Randomizer.rand(0, S���.length-1);
			var item = S���[rand];
			if(cm.getPlayer().getRC() < 7000) {
				cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�."); cm.dispose(); return;
			}
			cm.sendSimple("�Ʒ��� ������ �� �ϳ��� �����Ͻʽÿ�.\r\n\r\n#L0##i"+����ǥ����+"##l  #L1##i"+����ǥ����+"##l  #L2##i"+����ǥ����+"##l");
		} else if(state == 1) {
			var rand = Randomizer.rand(0, A���.length-1);
			var item = A���[rand];
			if(cm.getPlayer().getRC() < 4000) {
				cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�."); cm.dispose(); return;
			}
			cm.sendSimple("�Ʒ��� ������ �� �ϳ��� �����Ͻʽÿ�.\r\n\r\n#L0##i"+����ǥ����+"##l  #L1##i"+����ǥ����+"##l  #L2##i"+����ǥ����+"##l");
		} else { 
			var rand = Randomizer.rand(0, B���.length-1);
			var item = B���[rand];
			if(cm.getPlayer().getRC() < 2000) {
				cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�."); cm.dispose(); return;
			}
			cm.sendSimple("�Ʒ��� ������ �� �ϳ��� �����Ͻʽÿ�.\r\n\r\n#L0##i"+����ǥ����+"##l  #L1##i"+����ǥ����+"##l  #L2##i"+����ǥ����+"##l");
		}
	} else {
		if(state == 0) {
			var rand = Randomizer.rand(0, A���.length-1);
			var item = A���[rand];
			if(!cm.haveItem(Ȳ��, 50)) {
				cm.sendOk("Ȳ���� �����մϴ�."); cm.dispose(); return;
			}
			cm.sendSimple("�Ʒ��� ������ �� �ϳ��� �����Ͻʽÿ�.\r\n\r\n#L0##i"+����ǥ����+"##l  #L1##i"+����ǥ����+"##l  #L2##i"+����ǥ����+"##l");
		} else if(state == 1) {
			var rand = Randomizer.rand(0, B���.length-1);
			var item = B���[rand];
			if(!cm.haveItem(Ȳ��, 30)) {
				cm.sendOk("Ȳ���� �����մϴ�."); cm.dispose(); return;
			}
			cm.sendSimple("�Ʒ��� ������ �� �ϳ��� �����Ͻʽÿ�.\r\n\r\n#L0##i"+����ǥ����+"##l  #L1##i"+����ǥ����+"##l  #L2##i"+����ǥ����+"##l");
		} else { 
			var rand = Randomizer.rand(0, C���.length-1);
			var item = C���[rand];
			if(!cm.haveItem(Ȳ��, 10)) {
				cm.sendOk("Ȳ���� �����մϴ�."); cm.dispose(); return;
			}
			cm.sendSimple("�Ʒ��� ������ �� �ϳ��� �����Ͻʽÿ�.\r\n\r\n#L0##i"+����ǥ����+"##l  #L1##i"+����ǥ����+"##l  #L2##i"+����ǥ����+"##l");
		}
	}
    } else if(status == 4) {
	box = selection;
	if(sel == 0) {
		if(state == 0) {
				var item = S���[Randomizer.rand(0, S���.length-1)]; var item1 = S���[Randomizer.rand(0, S���.length-1)]; var item2 = S���[Randomizer.rand(0, S���.length-1)];
				cm.sendOk("S ��� ������ �̱� ����Դϴ�.\r\n\r\n#i"+item[0]+"#["+item[1]+"��]  #i"+item1[0]+"#["+item1[1]+"��]  #i"+item2[0]+"#["+item2[1]+"��]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4032838, 1);
				cm.getPlayer().loseRC(7000);
				cm.dispose(); return;
		} else if(state == 1) {
				var item = A���[Randomizer.rand(0, A���.length-1)]; var item1 = A���[Randomizer.rand(0, A���.length-1)]; var item2 = A���[Randomizer.rand(0, A���.length-1)];
				cm.sendOk("A ��� ������ �̱� ����Դϴ�.\r\n\r\n#i"+item[0]+"#["+item[1]+"��]  #i"+item1[0]+"#["+item1[1]+"��]  #i"+item2[0]+"#["+item2[1]+"��]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4001530, 1);
				cm.getPlayer().loseRC(4000);
				cm.dispose(); return;
		} else { 
				var item = B���[Randomizer.rand(0, B���.length-1)]; var item1 = B���[Randomizer.rand(0, B���.length-1)]; var item2 = B���[Randomizer.rand(0, C���.length-1)];
				cm.sendOk("B ��� ������ �̱� ����Դϴ�.\r\n\r\n#i"+item[0]+"#["+item[1]+"��]  #i"+item1[0]+"#["+item1[1]+"��]  #i"+item2[0]+"#["+item2[1]+"��]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4032125, 1);
				cm.getPlayer().loseRC(10);
				cm.dispose(); return;
		}
	} else {
		if(state == 0) {
				var item = A���[Randomizer.rand(0, A���.length-1)]; var item1 = A���[Randomizer.rand(0, A���.length-1)]; var item2 = A���[Randomizer.rand(0, A���.length-1)];
				cm.sendOk("A ��� ������ �̱� ����Դϴ�.\r\n\r\n#i"+item[0]+"#["+item[1]+"��]  #i"+item1[0]+"#["+item1[1]+"��]  #i"+item2[0]+"#["+item2[1]+"��]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4001530, 1);
				cm.gainItem(Ȳ��, -50);
				cm.dispose(); return;
		} else if(state == 1) {
				var item = B���[Randomizer.rand(0, B���.length-1)]; var item1 = B���[Randomizer.rand(0, B���.length-1)]; var item2 = B���[Randomizer.rand(0, B���.length-1)];
				cm.sendOk("B ��� ������ �̱� ����Դϴ�.\r\n\r\n#i"+item[0]+"#["+item[1]+"��]  #i"+item1[0]+"#["+item1[1]+"��]  #i"+item2[0]+"#["+item2[1]+"��]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4032125, 1);
				cm.gainItem(Ȳ��, -30);
				cm.dispose(); return;
		} else { 
				var item = C���[Randomizer.rand(0, C���.length-1)]; var item1 = C���[Randomizer.rand(0, C���.length-1)]; var item2 = C���[Randomizer.rand(0, C���.length-1)];
				cm.sendOk("C ��� ������ �̱� ����Դϴ�.\r\n\r\n#i"+item[0]+"#["+item[1]+"��]  #i"+item1[0]+"#["+item1[1]+"��]  #i"+item2[0]+"#["+item2[1]+"��]");
				if(box == 0) {
					cm.gainItem(item[0], item[1]);
				} else if(box == 1) {
					cm.gainItem(item1[0], item1[1]);
				} else {
					cm.gainItem(item2[0], item2[1]);
				}
				cm.gainItem(4033571, 1);
				cm.gainItem(Ȳ��, -10);
				cm.dispose(); return;
		}
	}
    }
}	


