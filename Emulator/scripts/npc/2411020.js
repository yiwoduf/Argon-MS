importPackage(Packages.constants);
importPackage(Packages.tools.packet);

var status = -1;

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
        var saveSkin = cm.getQuestRecord(7291);
        saveSkinName = saveSkin.getCustomData() == 1 ? "�����ж�����" : saveSkin.getCustomData() == 2 ? "ũ��Ƽ�ƽ�" : saveSkin.getCustomData() == 3 ? "��Ƽ ����Ʈ" : saveSkin.getCustomData() == 4 ? "����Ƽ��" : saveSkin.getCustomData() == 5 ? "������ ���� �Ѱ�" : saveSkin.getCustomData() == 6 ? "Ŭ�� ��׽ý�" : saveSkin.getCustomData() == 7 ? "�޸� ũ��������" : saveSkin.getCustomData() == 8 ? "�� �ɼ���" : saveSkin.getCustomData() == 9 ? "�˸�����" : saveSkin.getCustomData() == 10 ? "���ν���" : saveSkin.getCustomData() == 11 ? "Ű���� ������" : saveSkin.getCustomData() == 12 ? "������ ���ٶ�" : saveSkin.getCustomData() == 13 ? "�ַκδ�" : saveSkin.getCustomData() == 14 ? "���̳ʼ���" : saveSkin.getCustomData() == 15 ? "��Ȳ����" : saveSkin.getCustomData() == 16 ? "�հ�" : saveSkin.getCustomData() == 17 ? "�����" : saveSkin.getCustomData() == 18 ? "��Ÿ�÷���" : saveSkin.getCustomData() == 19 ? "�ѱ۳�" : saveSkin.getCustomData() == 20 ? "�ҷ���" : saveSkin.getCustomData() == 22 ? "�׳�ġŲ" : saveSkin.getCustomData() == 23 ? "����" : saveSkin.getCustomData() == 24 ? "Ŀ�úδ�": saveSkin.getCustomData() == 25 ? "����" : saveSkin.getCustomData() == 26 ? "��ƼX����" : saveSkin.getCustomData() == 27 ? "������X��Ȳ����" : saveSkin.getCustomData() == 28 ? "��ũ��" : saveSkin.getCustomData() == 29 ? "������" : saveSkin.getCustomData() == 34 ? "������ ����" : saveSkin.getCustomData() == 35 ? "���ϴ�" : saveSkin.getCustomData() == 36 ? "���ø��" : saveSkin.getCustomData() == 37 ? "��������" : saveSkin.getCustomData() == 38 ? "������" : saveSkin.getCustomData() == 39 ? "�Ŀ�" : saveSkin.getCustomData() == 40 ? "����" : saveSkin.getCustomData() == 41 ? "USA" : saveSkin.getCustomData() == 42 ? "�򷯽�" : saveSkin.getCustomData() == 43 ? "�̰��� �߰�" : saveSkin.getCustomData() == 44 ? "�������� ���Ͻ�" : saveSkin.getCustomData() == 45 ? "����" : saveSkin.getCustomData() == 46 ? "�޴��� ��¦" : saveSkin.getCustomData() == 47 ? "������" : saveSkin.getCustomData() == 48 ? "��������" : saveSkin.getCustomData() == 49 ? "����ȣ" : saveSkin.getCustomData() == 50 ? "����" : saveSkin.getCustomData() == 51 ? "MVP ����� ����" : saveSkin.getCustomData() == 52 ? "�����" : saveSkin.getCustomData() == 53 ? "������ũ" : saveSkin.getCustomData() == 74 ? "������" : saveSkin.getCustomData() == 75 ? "����Ʈ ��" : saveSkin.getCustomData() == 77 ? "������� ����" : saveSkin.getCustomData() == 78 ? "������� �޸�������" : saveSkin.getCustomData() == 79 ? "����" : saveSkin.getCustomData() == 80 ? "��Ʈǳ��" : saveSkin.getCustomData() == 81 ? "�׿»���" : saveSkin.getCustomData() == 82 ? "������" : saveSkin.getCustomData() == 83 ? "ĵ��" : saveSkin.getCustomData() == 84 ? "��Ƽũ ���" : saveSkin.getCustomData() == 85 ? "�ױ۾�" : saveSkin.getCustomData() == 86 ? "�ͽ��÷���" : saveSkin.getCustomData() == 87 ? "������" : saveSkin.getCustomData() == 88 ? "��ȣ" : saveSkin.getCustomData() == 89 ? "����" : saveSkin.getCustomData() == 90 ? "�Ǻ�" : saveSkin.getCustomData() == 91 ? "����" : saveSkin.getCustomData() == 92 ? "�ټ��� ��" : "�⺻";        
        var loadSkin = cm.getQuestRecord(7292);
        loadSkinName = loadSkin.getCustomData() == 1 ? "�����ж�����" : loadSkin.getCustomData() == 2 ? "ũ��Ƽ�ƽ�" : loadSkin.getCustomData() == 3 ? "��Ƽ ����Ʈ" : loadSkin.getCustomData() == 4 ? "����Ƽ��" : loadSkin.getCustomData() == 5 ? "������ ���� �Ѱ�" : loadSkin.getCustomData() == 6 ? "Ŭ�� ��׽ý�" : loadSkin.getCustomData() == 7 ? "�޸� ũ��������" : loadSkin.getCustomData() == 8 ? "�� �ɼ���" : loadSkin.getCustomData() == 9 ? "�˸�����" : loadSkin.getCustomData() == 10 ? "���ν���" : loadSkin.getCustomData() == 11 ? "Ű���� ������" : loadSkin.getCustomData() == 12 ? "������ ���ٶ�" : loadSkin.getCustomData() == 13 ? "�ַκδ�" : loadSkin.getCustomData() == 14 ? "���̳ʼ���" : loadSkin.getCustomData() == 15 ? "��Ȳ����" : loadSkin.getCustomData() == 16 ? "�հ�" : loadSkin.getCustomData() == 17 ? "�����" : loadSkin.getCustomData() == 18 ? "��Ÿ�÷���" : loadSkin.getCustomData() == 19 ? "�ѱ۳�" : loadSkin.getCustomData() == 20 ? "�ҷ���" : loadSkin.getCustomData() == 22 ? "�׳�ġŲ" : loadSkin.getCustomData() == 23 ? "����" : loadSkin.getCustomData() == 24 ? "Ŀ�úδ�": loadSkin.getCustomData() == 25 ? "����" : loadSkin.getCustomData() == 26 ? "��ƼX����" : loadSkin.getCustomData() == 27 ? "������X��Ȳ����" : loadSkin.getCustomData() == 28 ? "��ũ��" : loadSkin.getCustomData() == 29 ? "������" : loadSkin.getCustomData() == 34 ? "������ ����" : loadSkin.getCustomData() == 35 ? "���ϴ�" : loadSkin.getCustomData() == 36 ? "���ø��" : loadSkin.getCustomData() == 37 ? "��������" : loadSkin.getCustomData() == 38 ? "������" : loadSkin.getCustomData() == 39 ? "�Ŀ�" : loadSkin.getCustomData() == 40 ? "����" : loadSkin.getCustomData() == 41 ? "USA" : loadSkin.getCustomData() == 42 ? "�򷯽�" : loadSkin.getCustomData() == 43 ? "�̰��� �߰�" : loadSkin.getCustomData() == 44 ? "�������� ���Ͻ�" : loadSkin.getCustomData() == 45 ? "����" : loadSkin.getCustomData() == 46 ? "�޴��� ��¦" : loadSkin.getCustomData() == 47 ? "������" : loadSkin.getCustomData() == 48 ? "��������" : loadSkin.getCustomData() == 49 ? "����ȣ" : loadSkin.getCustomData() == 50 ? "����" : loadSkin.getCustomData() == 51 ? "MVP ����� ����" : loadSkin.getCustomData() == 52 ? "�����" : loadSkin.getCustomData() == 53 ? "������ũ" : loadSkin.getCustomData() == 74 ? "������" : loadSkin.getCustomData() == 75 ? "����Ʈ ��" : loadSkin.getCustomData() == 77 ? "������� ����" : loadSkin.getCustomData() == 78 ? "������� �޸�������" : loadSkin.getCustomData() == 79 ? "����" : loadSkin.getCustomData() == 80 ? "��Ʈǳ��" : loadSkin.getCustomData() == 81 ? "�׿»���" : loadSkin.getCustomData() == 82 ? "������" : loadSkin.getCustomData() == 83 ? "ĵ��" : loadSkin.getCustomData() == 84 ? "��Ƽũ ���" : loadSkin.getCustomData() == 85 ? "�ױ۾�" : loadSkin.getCustomData() == 86 ? "�ͽ��÷���" : loadSkin.getCustomData() == 87 ? "������" : loadSkin.getCustomData() == 88 ? "��ȣ" : loadSkin.getCustomData() == 89 ? "����" : loadSkin.getCustomData() == 90 ? "�Ǻ�" : loadSkin.getCustomData() == 91 ? "����" : loadSkin.getCustomData() == 92 ? "�ټ��� ��" : "�⺻";

	var text = "#fn������� Extrabold##b������ ��Ų#k �� #r��ü#k �ϰ� ��������?\r\n\r\n";
	text += "#L1##fs14##r���� ���� ��#k �� #b������ ��Ų#k �� #r����#k �Ѵ�.#l\r\n\r\n";
        text += "#fs11#    * ���� ���� �� �� ������ ��Ų �� #d" + saveSkinName + " ������ ��Ų#k �Դϴ�.\r\n";
	text += "#L2##fs14##r����#k �Ǿ� �ִ� #b������ ��Ų#k �� #r����#k �Ѵ�.#l\r\n\r\n";
        text += "#fs11#    * ���� ���� �� ������ ��Ų �� #d" + loadSkinName + " ������ ��Ų#k �Դϴ�.";
	cm.sendSimple(text);
	} else if (status == 1) {
		switch(selection) {
			case 1: {
                        var skin = cm.getQuestRecord(7291);
                        if (skin.getCustomData() == 1) {
                            cm.forceStartQuest(7292, 1);
                        } else if (skin.getCustomData() == 2) {
                            cm.forceStartQuest(7292, 2);
                        } else if (skin.getCustomData() == 3) {
                            cm.forceStartQuest(7292, 3);
                        } else if (skin.getCustomData() == 4) {
                            cm.forceStartQuest(7292, 4);
                        } else if (skin.getCustomData() == 5) {
                            cm.forceStartQuest(7292, 5);
                        } else if (skin.getCustomData() == 6) {
                            cm.forceStartQuest(7292, 6);
                        } else if (skin.getCustomData() == 7) {
                            cm.forceStartQuest(7292, 7);
                        } else if (skin.getCustomData() == 8) {
                            cm.forceStartQuest(7292, 8);
                        } else if (skin.getCustomData() == 9) {
                            cm.forceStartQuest(7292, 9);
                        } else if (skin.getCustomData() == 10) {
                            cm.forceStartQuest(7292, 10);
                        } else if (skin.getCustomData() == 11) {
                            cm.forceStartQuest(7292, 11);
                        } else if (skin.getCustomData() == 12) {
                            cm.forceStartQuest(7292, 12);
                        } else if (skin.getCustomData() == 13) {
                            cm.forceStartQuest(7292, 13);
                        } else if (skin.getCustomData() == 14) {
                            cm.forceStartQuest(7292, 14);
                        } else if (skin.getCustomData() == 15) {
                            cm.forceStartQuest(7292, 15);
                        } else if (skin.getCustomData() == 16) {
                            cm.forceStartQuest(7292, 16);
                        } else if (skin.getCustomData() == 17) {
                            cm.forceStartQuest(7292, 17);
                        } else if (skin.getCustomData() == 18) {
                            cm.forceStartQuest(7292, 18);
                        } else if (skin.getCustomData() == 19) {
                            cm.forceStartQuest(7292, 19);
                        } else if (skin.getCustomData() == 20) {
                            cm.forceStartQuest(7292, 20);
                        } else if (skin.getCustomData() == 22) {
                            cm.forceStartQuest(7292, 22);
                        } else if (skin.getCustomData() == 23) {
                            cm.forceStartQuest(7292, 23);
                        } else if (skin.getCustomData() == 24) {
                            cm.forceStartQuest(7292, 24);
                        } else if (skin.getCustomData() == 25) {
                            cm.forceStartQuest(7292, 25);
                        } else if (skin.getCustomData() == 26) {
                            cm.forceStartQuest(7292, 26);
                        } else if (skin.getCustomData() == 27) {
                            cm.forceStartQuest(7292, 27);
                        } else if (skin.getCustomData() == 28) {
                            cm.forceStartQuest(7292, 28);
                        } else if (skin.getCustomData() == 29) {
                            cm.forceStartQuest(7292, 29);
                        } else if (skin.getCustomData() == 34) {
                            cm.forceStartQuest(7292, 34);
                        } else if (skin.getCustomData() == 35) {
                            cm.forceStartQuest(7292, 35);
                        } else if (skin.getCustomData() == 36) {
                            cm.forceStartQuest(7292, 36);
                        } else if (skin.getCustomData() == 37) {
                            cm.forceStartQuest(7292, 37);
                        } else if (skin.getCustomData() == 38) {
                            cm.forceStartQuest(7292, 38);
                        } else if (skin.getCustomData() == 39) {
                            cm.forceStartQuest(7292, 39);
                        } else if (skin.getCustomData() == 40) {
                            cm.forceStartQuest(7292, 40);
                        } else if (skin.getCustomData() == 41) {
                            cm.forceStartQuest(7292, 41);
                        } else if (skin.getCustomData() == 42) {
                            cm.forceStartQuest(7292, 42);
                        } else if (skin.getCustomData() == 43) {
                            cm.forceStartQuest(7292, 43);
                        } else if (skin.getCustomData() == 44) {
                            cm.forceStartQuest(7292, 44);
                        } else if (skin.getCustomData() == 45) {
                            cm.forceStartQuest(7292, 45);
                        } else if (skin.getCustomData() == 46) {
                            cm.forceStartQuest(7292, 46);
                        } else if (skin.getCustomData() == 47) {
                            cm.forceStartQuest(7292, 47);
                        } else if (skin.getCustomData() == 48) {
                            cm.forceStartQuest(7292, 48);
                        } else if (skin.getCustomData() == 49) {
                            cm.forceStartQuest(7292, 49);
                        } else if (skin.getCustomData() == 50) {
                            cm.forceStartQuest(7292, 50);
                        } else if (skin.getCustomData() == 51) {
                            cm.forceStartQuest(7292, 51);
                        } else if (skin.getCustomData() == 52) {
                            cm.forceStartQuest(7292, 52);
                        } else if (skin.getCustomData() == 53) {
                            cm.forceStartQuest(7292, 53);
                        } else if (skin.getCustomData() == 74) {
                            cm.forceStartQuest(7292, 74);
                        } else if (skin.getCustomData() == 75) {
                            cm.forceStartQuest(7292, 75);
                        } else if (skin.getCustomData() == 77) {
                            cm.forceStartQuest(7292, 77);
                        } else if (skin.getCustomData() == 78) {
                            cm.forceStartQuest(7292, 78);
                        } else if (skin.getCustomData() == 79) {
                            cm.forceStartQuest(7292, 79);
                        } else if (skin.getCustomData() == 80) {
                            cm.forceStartQuest(7292, 80);
                        } else if (skin.getCustomData() == 81) {
                            cm.forceStartQuest(7292, 81);
                        } else if (skin.getCustomData() == 82) {
                            cm.forceStartQuest(7292, 82);
                        } else if (skin.getCustomData() == 83) {
                            cm.forceStartQuest(7292, 83);
                        } else if (skin.getCustomData() == 84) {
                            cm.forceStartQuest(7292, 84);
                        } else if (skin.getCustomData() == 85) {
                            cm.forceStartQuest(7292, 85);
                        } else if (skin.getCustomData() == 86) {
                            cm.forceStartQuest(7292, 86);
                        } else if (skin.getCustomData() == 87) {
                            cm.forceStartQuest(7292, 87);
                        } else if (skin.getCustomData() == 88) {
                            cm.forceStartQuest(7292, 88);
                        } else if (skin.getCustomData() == 89) {
                            cm.forceStartQuest(7292, 89);
                        } else if (skin.getCustomData() == 90) {
                            cm.forceStartQuest(7292, 90);
                        } else if (skin.getCustomData() == 91) {
                            cm.forceStartQuest(7292, 91);
                        } else if (skin.getCustomData() == 92) {
                            cm.forceStartQuest(7292, 92);
                        } else {
                        cm.sendOk("#fn������� Extrabold##r���� ���� ������ ��Ų�� �����ϴ�.#k");
	                cm.dispose();   
                        }
                        cm.sendOk("#fn������� Extrabold##b������ ��Ų�� ���� �Ǿ����ϴ�.#k");
	                cm.dispose();   
			return;
                        }

			case 2: {
                        var saveSkin = cm.getQuestRecord(7291);
                        var loadSkin = cm.getQuestRecord(7292);
                        if (loadSkin.getCustomData() == 1) {
                        saveSkin.setCustomData("1");
                        } else if (loadSkin.getCustomData() == 2) {
                        saveSkin.setCustomData("2");
                        } else if (loadSkin.getCustomData() == 3) {
                        saveSkin.setCustomData("3");
                        } else if (loadSkin.getCustomData() == 4) {
                        saveSkin.setCustomData("4");
                        } else if (loadSkin.getCustomData() == 5) {
                        saveSkin.setCustomData("5");
                        } else if (loadSkin.getCustomData() == 6) {
                        saveSkin.setCustomData("6");
                        } else if (loadSkin.getCustomData() == 7) {
                        saveSkin.setCustomData("7");
                        } else if (loadSkin.getCustomData() == 8) {
                        saveSkin.setCustomData("8");
                        } else if (loadSkin.getCustomData() == 9) {
                        saveSkin.setCustomData("9");
                        } else if (loadSkin.getCustomData() == 10) {
                        saveSkin.setCustomData("10");
                        } else if (loadSkin.getCustomData() == 11) {
                        saveSkin.setCustomData("11");
                        } else if (loadSkin.getCustomData() == 12) {
                        saveSkin.setCustomData("12");
                        } else if (loadSkin.getCustomData() == 13) {
                        saveSkin.setCustomData("13");
                        } else if (loadSkin.getCustomData() == 14) {
                        saveSkin.setCustomData("14");
                        } else if (loadSkin.getCustomData() == 15) {
                        saveSkin.setCustomData("15");
                        } else if (loadSkin.getCustomData() == 16) {
                        saveSkin.setCustomData("16");
                        } else if (loadSkin.getCustomData() == 17) {
                        saveSkin.setCustomData("17");
                        } else if (loadSkin.getCustomData() == 18) {
                        saveSkin.setCustomData("18");
                        } else if (loadSkin.getCustomData() == 19) {
                        saveSkin.setCustomData("19");
                        } else if (loadSkin.getCustomData() == 20) {
                        saveSkin.setCustomData("20");
                        } else if (loadSkin.getCustomData() == 22) {
                        saveSkin.setCustomData("22");
                        } else if (loadSkin.getCustomData() == 23) {
                        saveSkin.setCustomData("23");
                        } else if (loadSkin.getCustomData() == 24) {
                        saveSkin.setCustomData("24");
                        } else if (loadSkin.getCustomData() == 25) {
                        saveSkin.setCustomData("25");
                        } else if (loadSkin.getCustomData() == 26) {
                        saveSkin.setCustomData("26");
                        } else if (loadSkin.getCustomData() == 27) {
                        saveSkin.setCustomData("27");
                        } else if (loadSkin.getCustomData() == 28) {
                        saveSkin.setCustomData("28");
                        } else if (loadSkin.getCustomData() == 29) {
                        saveSkin.setCustomData("29");
                        } else if (loadSkin.getCustomData() == 34) {
                        saveSkin.setCustomData("34");
                        } else if (loadSkin.getCustomData() == 35) {
                        saveSkin.setCustomData("35");
                        } else if (loadSkin.getCustomData() == 36) {
                        saveSkin.setCustomData("26");
                        } else if (loadSkin.getCustomData() == 37) {
                        saveSkin.setCustomData("37");
                        } else if (loadSkin.getCustomData() == 38) {
                        saveSkin.setCustomData("38");
                        } else if (loadSkin.getCustomData() == 39) {
                        saveSkin.setCustomData("39");
                        } else if (loadSkin.getCustomData() == 40) {
                        saveSkin.setCustomData("40");
                        } else if (loadSkin.getCustomData() == 41) {
                        saveSkin.setCustomData("41");
                        } else if (loadSkin.getCustomData() == 42) {
                        saveSkin.setCustomData("42");
                        } else if (loadSkin.getCustomData() == 43) {
                        saveSkin.setCustomData("43");
                        } else if (loadSkin.getCustomData() == 44) {
                        saveSkin.setCustomData("44");
                        } else if (loadSkin.getCustomData() == 45) {
                        saveSkin.setCustomData("45");
                        } else if (loadSkin.getCustomData() == 46) {
                        saveSkin.setCustomData("46");
                        } else if (loadSkin.getCustomData() == 47) {
                        saveSkin.setCustomData("47");
                        } else if (loadSkin.getCustomData() == 48) {
                        saveSkin.setCustomData("48");
                        } else if (loadSkin.getCustomData() == 49) {
                        saveSkin.setCustomData("49");
                        } else if (loadSkin.getCustomData() == 50) {
                        saveSkin.setCustomData("50");
                        } else if (loadSkin.getCustomData() == 51) {
                        saveSkin.setCustomData("51");
                        } else if (loadSkin.getCustomData() == 52) {
                        saveSkin.setCustomData("52");
                        } else if (loadSkin.getCustomData() == 53) {
                        saveSkin.setCustomData("53");
                        } else if (loadSkin.getCustomData() == 74) {
                        saveSkin.setCustomData("74");
                        } else if (loadSkin.getCustomData() == 75) {
                        saveSkin.setCustomData("75");
                        } else if (loadSkin.getCustomData() == 77) {
                        saveSkin.setCustomData("77");
                        } else if (loadSkin.getCustomData() == 78) {
                        saveSkin.setCustomData("78");
                        } else if (loadSkin.getCustomData() == 79) {
                        saveSkin.setCustomData("79");
                        } else if (loadSkin.getCustomData() == 80) {
                        saveSkin.setCustomData("80");
                        } else if (loadSkin.getCustomData() == 81) {
                        saveSkin.setCustomData("81");
                        } else if (loadSkin.getCustomData() == 82) {
                        saveSkin.setCustomData("82");
                        } else if (loadSkin.getCustomData() == 83) {
                        saveSkin.setCustomData("83");
                        } else if (loadSkin.getCustomData() == 84) {
                        saveSkin.setCustomData("84");
                        } else if (loadSkin.getCustomData() == 85) {
                        saveSkin.setCustomData("85");
                        } else if (loadSkin.getCustomData() == 86) {
                        saveSkin.setCustomData("86");
                        } else if (loadSkin.getCustomData() == 87) {
                        saveSkin.setCustomData("87");
                        } else if (loadSkin.getCustomData() == 88) {
                        saveSkin.setCustomData("88");
                        } else if (loadSkin.getCustomData() == 89) {
                        saveSkin.setCustomData("89");
                        } else if (loadSkin.getCustomData() == 90) {
                        saveSkin.setCustomData("90");
                        } else if (loadSkin.getCustomData() == 91) {
                        saveSkin.setCustomData("91");
                        } else if (loadSkin.getCustomData() == 92) {
                        saveSkin.setCustomData("92");
                        } else {
                        cm.sendOk("#fn������� Extrabold##r���� �� ������ ��Ų�� �����ϴ�.#k");
	                cm.dispose();   
                        }
                        cm.sendOk("#fn������� Extrabold##b������ ��Ų�� ���� �Ǿ����ϴ�.#k");
                        cm.getPlayer().updateQuest(saveSkin);
	                cm.dispose();   
			return;
                        }
		}
}
}
}