importPackage(Packages.tools.RandomStream);
importPackage(Packages.client.items);
importPackage(Packages.server.items);

var potential = [[40041, "STR : 6%"], [40042, "DEX : 6%"], [40043, "INT : 6%"], [40044, "LUK : 6%"], [40086, "�ý��� : 9%"], [10046, "MaxMP : 3%"], [20046, "MaxMP : 6%"], [30046, "MaxMP : 9%"], [40046, "MaxMP : 6%"], [10045, "MaxHP : 3%"], [20045, "MaxHP : 6%"], [30045, "MaxHP : 9%"], [40045, "MaxHP : 6%"], [20048, "ȸ��ġ : 6%"], [30048, "ȸ��ġ : 9%"], [40048, "ȸ��ġ : 6%"]];                                                                   
var status = -1;
var �ʿ����� = 5000;
var �ʿ�������ڵ� = 4033247;
var �ʿ�����۰��� = 20;
var first = 0, need;
function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
 try {
    if (mode == -1) {
	if(status == 2) {
		cm.fakeRelog();
		cm.updateChar();
	}
        cm.dispose();
        return;
    }
    if (mode == 0) {
	if(status == 2) {
		cm.fakeRelog();
		cm.updateChar();
	}
        cm.dispose();
	return;
    }
    if (mode == 1 && selection == 0 && status == 2) {
	status--;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
	var text = "����ɷ��� �ο��Ͻ� ĳ�� �������� ������ �ּ���.\r\n";
		for(i = 1 ; i < 100; i++) {
			if(cm.getEquip(i)) {
				if(ItemInformation.getInstance().isCash(cm.getEquip(i).getItemId())) {
					text += "#L"+i+"##i" + cm.getEquip(i).getItemId() + "#\r\n";
				}
			}
		}
	cm.sendSimple(text);
    } else if (status == 1) {
	se = selection;
	cm.sendSimple("���� � ������ ť�긦 �����ðڽ��ϱ�?\r\n\r\n#b#L0#����\r\n#L1##z"+�ʿ�������ڵ�+"# "+�ʿ�����۰���+"��");
    } else if (status == 2) {
	if(first == 0) {
		need = selection;
	}
	first = 1;
	item = cm.getEquip(se);
	if(need == 0) {
		if(cm.getPlayer().getRC() < �ʿ�����) {
			cm.sendOk("�Ŀ�����Ʈ 5õ���� �ִ��� Ȯ�����ּ���.");
			cm.dispose(); return;
		}
		cm.getPlayer().loseRC(�ʿ�����);
	} else if(need == 1) {
		if(!cm.haveItem(�ʿ�������ڵ�, �ʿ�����۰���)) {
			cm.sendOk("Ȳ�ݻ� ��ǳ���� 20���� �ִ��� Ȯ�����ּ���.");
			cm.dispose(); return;
		}
		cm.gainItem(�ʿ�������ڵ�, -�ʿ�����۰���);
	}
	var rand1 = Randomizer.rand(0, potential.length-1);
	var rand2 = Randomizer.rand(0, potential.length-1);
	var rand3 = Randomizer.rand(0, potential.length-1);
	item.setState(20);
	item.setLines(3);
	item.setPotential1(potential[rand1][0]);
	item.setPotential2(potential[rand2][0]);
	item.setPotential3(potential[rand3][0]);
	var text = "#L1##fs13##e#r< After >#k#n\r\n";
		text += "#fs11##bù��° ���� : "+potential[rand1][1]+"\r\n";
		text += "�ι�° ���� : "+potential[rand2][1]+"\r\n";
		text += "����° ���� : "+potential[rand3][1]+"\r\n\r\n\r\n";
		text += "#Cgray##L0#ť�긦 �ٽ� �����ڽ��ϴ�.";
	cm.sendSimple(text);
    } else if(status == 3) {
	cm.fakeRelog();
	cm.updateChar();
	cm.sendOk("�� �̿��� �ּ���~");
	cm.dispose(); return;
    }
}catch(e){
cm.sendOk(e);
cm.dispose();
}
}