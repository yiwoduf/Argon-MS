var status = 0;
var list = new Array(

/*�ۼַ��� ���� ����*/
new Array(1232109, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ������� 
new Array(1302333, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ���̹�
new Array(1312199, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ����
new Array(1322250, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ��Ʈ�ظ�
new Array(1402251, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ��ε弼�̹�
new Array(1412177, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ��ε忢��
new Array(1422184, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ��ε��ظ�
new Array(1432214, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� �Ǿ�̽��Ǿ�

/*�ۼַ��� ���� ��*/
new Array(1004422, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ����Ʈ�︧ 
new Array(1102775, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ����Ʈ������ 
new Array(1082636, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ����Ʈ�۷��� 
new Array(1052882, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ����Ʈ��Ʈ 
new Array(1073030, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ����Ʈ���� 
new Array(1152174, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ����Ʈ��� 

/*�ۼַ��� ���� ����*/
new Array(1212115, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ���̴׷ε� 
new Array(1372222, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ���縵�ϵ� 
new Array(1382259, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ���縵������ 

/*�ۼַ��� ���� ��*/
new Array(1004423, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ������ũ��� 
new Array(1102794, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ������������ 
new Array(1082637, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� �������۷��� 
new Array(1052887, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ��������Ʈ 
new Array(1073032, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ���������� 
new Array(1152176, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ��������� 

/*�ۼַ��� �ü� ����*/ 
new Array(1452252, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ���ú���
new Array(1462239, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ũ�ν�����

/*�ۼַ��� �ü� ��*/ 
new Array(1004424, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ��ó�ĵ� 
new Array(1102795, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ��ó������ 
new Array(1082638, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ��ó�۷��� 
new Array(1052888, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ��ó��Ʈ 
new Array(1073033, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ��ó���� 
new Array(1152177, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ��ó��� 

/*�ۼַ��� ���� ����*/
new Array(1332274, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ������ 
new Array(1472261, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ���������� 
new Array(1242116, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� �������ҵ� 
new Array(1342101, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ���̵� 
new Array(1362135, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� �������� 

/*�ۼַ��� ���� ��*/
new Array(1004425, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ����ĸ 
new Array(1102796, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ���������� 
new Array(1082639, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� �����۷��� 
new Array(1052889, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ������Ʈ 
new Array(1073034, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� �������� 
new Array(1152178, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ������� 

/*�ۼַ��� �ؠ� ����*/
new Array(1222109, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� �ҿｴ�� 
new Array(1482216, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ��ο��Ŭ 
new Array(1492231, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� �����ð� 
new Array(1532144, 4310016, 300, 4033248, 100, 4031456,10, 500, 30000000), // �ۼַ��� ����Ʈĳ�� 

/*�ۼַ��� �ؠ� ��*/
new Array(1004426, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ���̷��䵵�� 
new Array(1102797, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ���̷������� 
new Array(1082640, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ���̷��۷��� 
new Array(1052890, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ���̷���Ʈ 
new Array(1073035, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000), // �ۼַ��� ���̷����� 
new Array(1152179, 4310016, 100, 4033248, 50, 4310014, 10, 150, 15000000)); // �ۼַ��� ���̷���� 

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
		if(cm.getPlayer().getKeyValue("S_1") != null) { cm.getPlayer().setKeyValue("S_1", 5) }
		if(cm.getPlayer().getKeyValue("S_2") != null) { cm.getPlayer().setKeyValue("S_2", 3) }
		var k = "#fUI/UIToolTip/Item/Equip/Star/Star#"
		var yk = "�ۼַ��� ���⸦ �����Ҽ� �ֽ��ϴ� ������ ���ϴ� �������� ������ �ּ���\r\n";

		yk += "#L0#"+k+" #e���� �ۼַ��� ���� �����Ѵ�\r\n";
		yk += "#L1#"+k+" #e���� �ۼַ��� ���� �����Ѵ�\r\n";
		yk += "#L2#"+k+" #e�ü� �ۼַ��� ���� �����Ѵ�\r\n";
		yk += "#L3#"+k+" #e���� �ۼַ��� ���� �����Ѵ�\r\n";
		yk += "#L4#"+k+" #e���� �ۼַ��� ���� �����Ѵ�\r\n";
		
		cm.sendSimple(yk);
		} else if (status == 1) {
		var category = selection == 0 ? "���� �ۼַ��� ����" : selection == 1 ? "���� �ۼַ��� ����" : selection == 2 ? "�ü� �ۼַ��� ����" : selection == 3 ? "���� �ۼַ��� ����" : "���� �ۼַ��� ����"
		var chat = "������ ���Ͻô� "+category+" ��������. ������ ���� ���콺�� �ø��� �������� ������ �� �� �ִ�.#b\r\n\r\n"
		if (selection == 0) {
		chat += "#e#r[�ۼַ��� ���� ���� ����]#k#n\r\n";
		for (i = 0; i < 8; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r[�ۼַ��� ���� �� ����]#k#n\r\n"
		for (i = 9; i < 14; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";

		} else if (selection == 1) {
		chat += "#e#r#e[�ۼַ��� ���� ���� ����]#k#n\r\n";
		for (i = 14; i < 17; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r#e[�ۼַ��� ���� �� ����]#k#n\r\n";
		for (i = 17; i < 23; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		}
		else if (selection == 2) {
		chat += "#e#r#e[�ۼַ��� �ü� ���� ����]#k#n\r\n";
		for (i = 23; i < 25; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r#e[�ۼַ��� ���� �� ����]#k#n\r\n";
		for (i = 25; i < 30; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		}
		else if (selection == 3) {
		chat += "#e#r#e[�ۼַ��� ���� ���� ����]#k#n\r\n";
		for (i = 31; i < 36; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r#e[�ۼַ��� ���� �� ����]#k#n\r\n";
		for (i = 36; i < 42; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		} else if (selection == 4) {
		chat += "#e#r#e[�ۼַ��� ���� ���� ����]#k#n\r\n";
		for (i = 42; i < 46; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";
		chat += "#e#r#e[�ۼַ��� ���� �� ����]#k#n\r\n";
		for (i = 46; i < 52; chat += "#b#L"+i+"##i"+list[i][0]+"# #z"+list[i][0]+"##l\r\n",i++); chat += "\r\n\r\n";

		cm.sendSimple(chat);
	}
	
	else if (status == 2) {
		item = selection;
			if(selection < 3000) {
		var chat = "#b#z"+list[selection][0]+"##k�� ������� �Ʒ��� �ִ� ���� �ణ�� �����ᰡ �ʿ��ϴ�.\r\n\r\n#b"
		chat += "#i"+list[selection][1]+"# #z"+list[selection][1]+"# "+list[selection][2]+"��\r\n";
		chat += "#i"+list[selection][3]+"# #z"+list[selection][3]+"# "+list[selection][4]+"��\r\n";
		chat += "#i"+list[selection][5]+"# #z"+list[selection][5]+"# "+list[selection][6]+"��\r\n";
		chat += "#i4310156# #z4310156# "+list[selection][7]+"��\r\n";
		chat += "#i4031138# "+list[selection][8] / 10000+"�� �޼�";
		spirit = 1;
			} else {
		var chat = "#b#z"+list[selection][0]+"##k�� ������� �Ʒ��� �ִ� ���� �ణ�� �����ᰡ �ʿ��ϴ�.\r\n\r\n#b"
		chat += "#i"+list[selection][1]+"# #z"+list[selection][1]+"# "+list[selection][2]+"��\r\n";
		chat += "#i"+list[selection][3]+"# #z"+list[selection][3]+"# "+list[selection][4]+"��\r\n";
		chat += "#i"+list[selection][5]+"# #z"+list[selection][5]+"# "+list[selection][6]+"��\r\n";
		chat += "#i"+list[selection][7]+"# #z"+list[selection][7]+"# "+list[selection][8]+"��\r\n";
		chat += "#i"+list[selection][9]+"# #z"+list[selection][9]+"# "+list[selection][10]+"��\r\n";
		chat += "#i"+list[selection][11]+"# #z"+list[selection][11]+"# "+list[selection][12]+"��\r\n";
		chat += "#i4310156# #z4310156# "+list[selection][13]+"��\r\n";
		chat += "#i4031138# "+list[selection][14] / 10000+"�� �޼�";
		spirit = 2;
		}

		cm.sendNextS(chat, 2);
	}

	else if (status == 3) {
		if(spirit == 1) {
			if(cm.haveItem(list[item][1], list[item][2]) && cm.haveItem(list[item][3], list[item][4]) && cm.haveItem(list[item][5], list[item][6]) && cm.haveItem(4310156, list[item][7]) && cm.getMeso() > list[item][8]) {
				if(!cm.canHold(list[item][0])) {
				cm.sendNextS("�κ��丮�� ���� ������ ���ų� �����Ϸ��� �������� ���� �������� �� ����.", 2);
				cm.dispose();
				}
				else {
					if(list[item][0] < 1232109 || list[item][0] > 1432214) {
						cm.gainItem(list[item][0], 1);
						cm.gainItem(list[item][1], -list[item][2]);
						cm.gainItem(list[item][3], -list[item][4]);
						cm.gainItem(list[item][5], -list[item][6]);
						cm.gainItem(4310156, -list[item][7]);
						cm.gainMeso(-list[item][8]);
						cm.sendNext("#b#i"+list[item][0]+"# #z"+list[item][0]+"##k �������� �����ϴµ� �����Ͽ���. �κ��丮�� Ȯ���غ���.");

					} else {
						if(cm.getPlayer().getKeyValue("S_1") != 0) {
						cm.gainItem(list[item][0], 1);
						cm.gainItem(list[item][1], -list[item][2]);
						cm.gainItem(list[item][3], -list[item][4]);
						cm.gainItem(list[item][5], -list[item][6]);
						cm.gainItem(4310156, -list[item][7]);
						cm.gainMeso(-list[item][8]);
						cm.sendNext("#b#i"+list[item][0]+"# #z"+list[item][0]+"##k �������� �����ϴµ� �����Ͽ���. �κ��丮�� Ȯ���غ���.");
						} else {
						}
					}
				if(list[item][0] == 1152149 || list[item][0] == 1152150 || list[item][0] == 1152151 || list[item][0] == 1152152 )
					if(cm.getPlayer().getKeyValue("S_1") == 5) { cm.getPlayer().setKeyValue("S_1", 4) }
					else if(cm.getPlayer().getKeyValue("S_1") == 4) { cm.getPlayer().setKeyValue("S_1", 3) }
					else if(cm.getPlayer().getKeyValue("S_1") == 3) { cm.getPlayer().setKeyValue("S_1", 2) }
					else if(cm.getPlayer().getKeyValue("S_1") == 2) { cm.getPlayer().setKeyValue("S_1", 1) }
					else if(cm.getPlayer().getKeyValue("S_1") == 1) { cm.getPlayer().setKeyValue("S_1", 0) }
				cm.dispose();
				}
			}
			else {
			cm.sendNextS("��ᰡ �����ϰų� �����ᰡ ����. ��� ��ƿ� �� �ٽ� �õ��غ���.", 2);
			cm.dispose();
			}
		}
		else if(spirit == 2) {
		if(cm.getPlayer().getKeyValue("S_2") != 0) {
			if(cm.haveItem(list[item][1], list[item][2]) && cm.haveItem(list[item][3], list[item][4]) && cm.haveItem(list[item][5], list[item][6]) && cm.haveItem(list[item][7], list[item][8]) && cm.haveItem(list[item][9], list[item][10]) && cm.haveItem(list[item][11], list[item][12]) && cm.haveItem(4310156, list[item][13]) && cm.getMeso() > list[item][14]) {
				if(!cm.canHold(list[item][0])) {
				cm.sendNextS("�κ��丮�� ���� ������ ���ų� �����Ϸ��� �������� ���� �������� �� ����.", 2);
				cm.dispose();
				}
				else {
				cm.gainItem(list[item][0], 1);
				cm.gainItem(list[item][1], -list[item][2]);
				cm.gainItem(list[item][3], -list[item][4]);
				cm.gainItem(list[item][5], -list[item][6]);
				cm.gainItem(list[item][7], -list[item][8]);
				cm.gainItem(list[item][9], -list[item][10]);
				cm.gainItem(list[item][11], -list[item][12]);
				cm.gainItem(4310156, -list[item][13]);
				cm.gainMeso(-list[item][14]);
				cm.sendNextS("#b#i"+list[item][0]+"# #z"+list[item][0]+"##k �������� �����ϴµ� �����Ͽ���. �κ��丮�� Ȯ���غ���.", 2);
					if(cm.getPlayer().getKeyValue("S_2") == 3) { cm.getPlayer().setKeyValue("S_2", 2) }
					else if(cm.getPlayer().getKeyValue("S_2") == 2) { cm.getPlayer().setKeyValue("S_2", 1) }
					else if(cm.getPlayer().getKeyValue("S_2") == 1) { cm.getPlayer().setKeyValue("S_2", 0) }

				cm.dispose();
				}
			}
			else {
			cm.sendNextS("��ᰡ �����ϰų� �����ᰡ ����. ��� ��ƿ� �� �ٽ� �õ��غ���.", 2);
			cm.dispose();
			}
			}
			else {
			cm.dispose();
			}
		}
	}
}
}
}