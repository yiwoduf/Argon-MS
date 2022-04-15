var status = -1;
var etc;
var selFirstJob;
var selFinal;

var r = "#fs11.5##Cgray#(";
var s = ")#fs12#\r\n";

var talk;


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
            cm.sendSimple("Welcom! I am#b#e Argon Online#n#k job NPC.\r\n#b#e#h #,#k#n Let's get started!\r\n#b" + "#L1##kI#r#e AGREE#n#k to terms of use and I want to start the game!#l\r\n#b#L13000##i3010307##r#ePink Bean Server Point Event!");
            if (cm.getPlayer().getJob() == 2004) {
                cm.teachSkill(27000106, 5, 5);
                cm.teachSkill(27000207, 5, 5);
                cm.teachSkill(27001201, 20, 20);
                cm.teachSkill(27001100, 20, 20);
            }
            if (cm.getPlayer().getJob() == 2007) {
                cm.teachSkill(25001002, 25, 25);
                cm.teachSkill(25000003, 25, 25);
            }
            if (cm.getPlayer().getJob() == 3001) {
                cm.teachSkill(30010111, 1, 1);
                cm.teachSkill(30010185, 1, 1);
                cm.teachSkill(30010112, 2, 2);
            }
	    if (cm.getPlayer().getJob() == 2005) {
		cm.teachSkill(20051284, 1, 1);
		cm.teachSkill(20050285, 1, 1);
		cm.teachSkill(25001000, 30,30);
	 	cm.teachSkill(25001002, 30, 30);
	    }
	    if (cm.getPlayer().getJob() == 1000) {
		cm.teachSkill(10001251, 1, 1);
		cm.teachSkill(10001252, 1, 1);
		cm.teachSkill(10001253, 1, 1);
		cm.teachSkill(10001254, 1, 1);
		cm.teachSkill(10001255, 1, 1);
	    }
        } else if (selection == 1) { // status ���� selection ���� ����
            FirstJob(cm.getPlayer().getJob());
		} else if (selection == 13000) {
            cm.warp(921171100);
            cm.dispose();
        } else if (status == 2) {
            selFirstJob = selection;
            if (selection < 1000) {
                SecondJob(selection);
            } else if (selection ==  2100) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/1/0\r\nDo you want to start the game with this job?\r\n���� ���� �迭 ���������� ������ �����մϴ�.\r\n\r\n#r�� �� ������ ���å�� �����ʾ� ����� ��� ��������\r\n    '��'�� �������μ� ������ å���Դϴ�.\r\n\r\n#b�� ��å�� �������� �����Ŵٸ�, ��ȭâ�� �ݰ� ������\r\n    �����Ͻñ� �ٶ��ϴ�.");
                etc = 1;
			} else if (selection ==  2200) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/4/0\r\nDo you want to start the game with this job?\r\n���� ���� �迭 ���������� ������ �����մϴ�.\r\n\r\n#r�� �� ������ ���å�� �����ʾ� ����� ��� ��������\r\n    '��'�� �������μ� ������ å���Դϴ�.\r\n\r\n#b�� ��å�� �������� �����Ŵٸ�, ��ȭâ�� �ݰ� ������\r\n    �����Ͻñ� �ٶ��ϴ�.");
                etc = 1;
			} else if (selection ==  2300) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/0/0\r\nDo you want to start the game with this job?\r\n���� ���� �迭 ���������� ������ �����մϴ�.\r\n\r\n#r�� �� ������ ���å�� �����ʾ� ����� ��� ��������\r\n    '��'�� �������μ� ������ å���Դϴ�.\r\n\r\n#b�� ��å�� �������� �����Ŵٸ�, ��ȭâ�� �ݰ� ������\r\n    �����Ͻñ� �ٶ��ϴ�.");
                etc = 1;
			} else if (selection ==  2400) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/3/0\r\nDo you want to start the game with this job?\r\n���� ���� �迭 ���������� ������ �����մϴ�.\r\n\r\n#r�� �� ������ ���å�� �����ʾ� ����� ��� ��������\r\n    '��'�� �������μ� ������ å���Դϴ�.\r\n\r\n#b�� ��å�� �������� �����Ŵٸ�, ��ȭâ�� �ݰ� ������\r\n    �����Ͻñ� �ٶ��ϴ�.");
                etc = 1;
			} else if (selection ==  2500) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/2/0\r\nDo you want to start the game with this job?\r\n���� ���� �迭 ���������� ������ �����մϴ�.\r\n\r\n#r�� �� ������ ���å�� �����ʾ� ����� ��� ��������\r\n    '��'�� �������μ� ������ å���Դϴ�.\r\n\r\n#b�� ��å�� �������� �����Ŵٸ�, ��ȭâ�� �ݰ� ������\r\n    �����Ͻñ� �ٶ��ϴ�.");
                etc = 1;
			} else if (selection ==  2600) {
				cm.sendYesNo("#fUI/UIWindow5/HofM_Switch/Large/Normal/5/0\r\nDo you want to start the game with this job?\r\n���� ���� �迭 ���������� ������ �����մϴ�.\r\n\r\n#r�� �� ������ ���å�� �����ʾ� ����� ��� ��������\r\n    '��'�� �������μ� ������ å���Դϴ�.\r\n\r\n#b�� ��å�� �������� �����Ŵٸ�, ��ȭâ�� �ݰ� ������\r\n    �����Ͻñ� �ٶ��ϴ�.");
                etc = 1;
			} else {
                cm.sendYesNo("Do you want to start the game with this job?\r\n���� ���� �迭 ���������� ������ �����մϴ�.\r\n\r\n#r�� �� ������ ���å�� �����ʾ� ����� ��� ��������\r\n    '��'�� �������μ� ������ å���Դϴ�.\r\n\r\n#b�� ��å�� �������� �����Ŵٸ�, ��ȭâ�� �ݰ� ������\r\n    �����Ͻñ� �ٶ��ϴ�.");
                etc = 1;
            }

        } else if (status == 3) {
            selFinal = selection;
            switch (etc) {
                case 1:
                    for (var i = cm.getPlayer().getLevel(); i < 10; i++) {
                        cm.getPlayer().levelUp();
                    }
                    if (cm.getPlayer().getExp() < 0)
                        cm.getPlayer().gainExp(-cm.getPlayer().getExp(), false, false, true);
                    
                    AutoJob();
		    cm.sendGuide();

        	    if (!cm.isCheckMeso()) {
                        cm.gainMeso(100000000);
                    }
                    cm.setCheckMeso();
	 	    cm.gainItemAllStat(1005001, 1, 500, 50);
		    cm.gainItemAllStat(1053215, 1, 500, 50);
                    cm.getPlayer().changeJob(selFirstJob);
	  	    cm.resetStats(4, 4, 4, 4);
		    cm.warp(100000000, 0);
	    	    if (cm.getPlayer().getJob() == 3500) {
			cm.teachSkill(30001068, 1, 1);
	    	    }
                    cm.dispose();
		    cm.openNpc(9010031);
                    break;
                default:
                    cm.sendYesNo("Do you want to start the game with this job? �ش� �������� �޼� �Ҹ� ���� ���������� ���� �ٸ� Ŭ������ �ٸ� �������� �ٲ� �� �ֽ��ϴ�.\r\n\r\n#r�� �̿� ����� ���� ���ο� ������� �ش� â���� �� ��ư�� �����ø� ���� �̿� ����� ������ ������ ���ֵ˴ϴ�.\r\n\r\n#b�� �̿� ���� �������� �����Ŵٸ�, ��ȭ�� ������ �� ESC�� ���� ������ �����Ͻø� �˴ϴ�.");
            }
        } else if (status == 4) {
	    if (!cm.isCheckMeso()) {
                cm.gainMeso(100000000);
            }
            cm.setCheckMeso();
	    cm.gainItemAllStat(1005001, 1, 500, 50);
	    cm.gainItemAllStat(1053215, 1, 500, 50);
            for (var i = cm.getPlayer().getLevel(); i < 10; i++) {
                cm.getPlayer().levelUp();
            }
            if (cm.getPlayer().getExp() < 0)
                cm.getPlayer().gainExp(-cm.getPlayer().getExp(), false, false, true);
	    if (selFinal == 532) {
                cm.getPlayer().changeJob(501);
            } else if (selFinal == 434) {
                cm.getPlayer().changeJob(430);
                for (var i = cm.getPlayer().getLevel(); i < 20; i++) {
                    cm.getPlayer().levelUp();
                }
                if (cm.getPlayer().getExp() < 0)
                    cm.getPlayer().gainExp(-cm.getPlayer().getExp(), false, false, true);
            } else {
                cm.getPlayer().changeJob(selFirstJob);
            }
	    cm.resetStats(4, 4, 4, 4);
            AdvAutoJob();
	    cm.sendGuide();
            if (cm.getPlayer().getJob() >= 1000 && cm.getPlayer().getJob() <= 1500) {
                cm.teachSkill(10000252, 1, 1);
                cm.teachSkill(10001253, 1, 1);
                cm.teachSkill(10001254, 1, 1);
            }
	    cm.warp(100000000, 0);
	    if (cm.getPlayer().getJob() == 3500) {
		cm.teachSkill(30001068, 1, 1);
	    }
	    cm.dispose();
	    cm.openNpc(9010031);
        }
    }
}

function FirstJob(i) {

    talk = "#fs12##b#h ##k Which job do you want to start the game with?\r\n";
    switch (i) {
        case 0:
            talk += "#L100##b���硡  " + r + "�� �����, ��ũ����Ʈ" + s + "";
            talk += "#L200##b������  " + r + "�� ��ũ������(��, ��), ��ũ������(��, ��), ���" + s + "";
            talk += "#L300##b�ü���  " + r + "�� ���츶����, �ű�" + s + "";
            talk += "#L400##b������  " + r + "�� ����Ʈ�ε�, ������, �����̴�" + s + "";
            talk += "#L500##b������  " + r + "�� ������, ĸƾ, ĳ����" + s + "";
            break;

        case 1000:
            talk += "#L1100##b�ҿ︶���͡�  " + r + "�� ���� �迭" + s + "";
            talk += "#L1200##b�÷������ڵ�  " + r + "�� ������ �迭" + s + "";
            talk += "#L1300##b����극��Ŀ  " + r + "�� �ü� �迭" + s + "";
            talk += "#L1400##b����Ʈ��Ŀ��  " + r + "�� ���� �迭" + s + "";
            talk += "#L1500##b��Ʈ����Ŀ��  " + r + "�� ���� �迭" + s + "";
            break;


        case 2000:
            talk += "#L2100##fUI/UIWindow5/HofM_Switch/Large/Normal/1/0";
            break;
        case 2001:
            talk += "#L2200##fUI/UIWindow5/HofM_Switch/Large/Normal/4/0";
            break;
        case 2002:
            talk += "#L2300##fUI/UIWindow5/HofM_Switch/Large/Normal/0/0";
            break;
        case 2003:
            talk += "#L2400##fUI/UIWindow5/HofM_Switch/Large/Normal/2/0";
            break;
        case 2005:
            talk += "#L2500##fUI/UIWindow5/HofM_Switch/Large/Normal/5/0";
            break;
        case 2004:
            talk += "#L2700##fUI/UIWindow5/HofM_Switch/Large/Normal/3/0";
            break;

        case 3000:
            talk += "#L3200##b��Ʋ������  " + r + "�� ������ �迭" + s + ""
            talk += "#L3300##b���ϵ�����  " + r + "�� �ü� �迭" + s + "";
            talk += "#L3500##b��ī�С���  " + r + "�� ���� �迭" + s + "";
            talk += "#L3700##b�����͡�  " + r + "�� ���� �迭" + s + "";
            break;

        case 3001:
            talk += "#L3100##b���󽽷��̾�  " + r + "�� ���ݷ� �迭" + s + "";
            talk += "#L3101##b��������  " + r + "�� MaxHP �迭" + s + "";
            break;

        case 3002:
            talk += "#L3600##b����";
            break;


        case 5000:
            talk += "#L5100# ������";
            break;
        case 6000:
            talk += "#L6100##bī����";
            break;
        case 6001:
            talk += "#L6500##b������������";
            break;
        case 14000:
            talk += "#L14200##bŰ�׽ý�";
            break;
	case 10112:
	    talk += "#L10112##b����";
	    break;
    }
    cm.sendSimple(talk);
}


function SecondJob(i) {
    etc = 0;
    var v1 = i == 100 ? "����" : i == 200 ? "������" : i == 300 ? "�ü�" : i == 400 ? "����" : "����"
    var v2  = "#e" + v1 + " ����#n�� ���̽��ϴ�. ���� #h #���� #b���� ������ ����ּ���.#k ���� ������ 30, 60, 100�� �޼��ϸ� #r�ڵ����� ����#k�� �˴ϴ�.\r\n";
    switch (i) {
        case 100:
            v2 += "#L112##b����Ρ���  " + r + "������ �� ũ�缼�̴� �� �����" + s + "";
            v2 += "#L132##b��ũ����Ʈ  " + r + "���Ǿ�� �� ����Ŀ �� ��ũ����Ʈ" + s + "";
            break;

        case 200:
            v2 += "#L212##b��ũ������(��, ��)  " + r + "���ڵ� �� ������ �� ��ũ������" + s + "";
            v2 += "#L222##b��ũ������(��, ��)  " + r + "���ڵ� �� ������ �� ��ũ������" + s + "";
            v2 += "#L232##b���#e����#n����������" + r + "Ŭ���� �� ������Ʈ �� ���" + s + "";
            break;

        case 300:
            v2 += "#L312##b���츶����  " + r + "���� �� ������ �� ���츶����" + s + "";
            v2 += "#L322##b�űá�����  " + r + "��� �� ���ݼ� �� �ű�" + s + "";
            break;

        case 400:
            v2 += "#L412##b����Ʈ�ε塡  " + r + "��ؽ� �� ��� �� ����Ʈ�ε�" + s + "";
            v2 += "#L422##b���������  " + r + "���� �� ���������� �� ������" + s + "";
            v2 += "#L434##b�����̴�  " + r + "�� �� ������ �� �����̴�" + s + "";
            break;

        case 500:
            v2 += "#L512##b�����ۡ���  " + r + "�������� �� ��Ŀ�Ͼ� �� ������" + s + "";
            v2 += "#L522##bĸƾ������  " + r + "�ǽ����� �� ��Ű�� �� ĸƾ" + s + "";
            v2 += "#L532##bĳ������  " + r + "ĳ���� �� ĳ������� �� ĳ������" + s + "";
            break;
    }

    cm.sendSimple(v2);

}


function AutoJob() {
    switch (selFirstJob) {
        case 570:
            cm.getPlayer().setKeyValue("AutoJob", "571");
            break;
        case 1100:
            cm.getPlayer().setKeyValue("AutoJob", "1110");
            break;
        case 1200:
            cm.getPlayer().setKeyValue("AutoJob", "1210");
            break;
        case 1300:
            cm.getPlayer().setKeyValue("AutoJob", "1310");
            break;
        case 1400:
            cm.getPlayer().setKeyValue("AutoJob", "1410");
            break;
        case 1500:
            cm.getPlayer().setKeyValue("AutoJob", "1510");
            break;
        case 2100:
            cm.getPlayer().setKeyValue("AutoJob", "2110");
            break;
        case 2200:
            cm.getPlayer().setKeyValue("AutoJob", "2210");
            break;
        case 2300:
            cm.getPlayer().setKeyValue("AutoJob", "2310");
            break;
        case 2400:
            cm.getPlayer().setKeyValue("AutoJob", "2410");
            break;
        case 2500:
            cm.getPlayer().setKeyValue("AutoJob", "2510");
            break;
        case 2700:
            cm.getPlayer().setKeyValue("AutoJob", "2710");
            break;
        case 3100:
            cm.getPlayer().setKeyValue("AutoJob", "3110");
            break;
        case 3101:
            cm.getPlayer().setKeyValue("AutoJob", "3120");
            break;
        case 3200:
            cm.getPlayer().setKeyValue("AutoJob", "3210");
            break;
        case 3300:
            cm.getPlayer().setKeyValue("AutoJob", "3310");
            break;
        case 3500:
            cm.getPlayer().setKeyValue("AutoJob", "3510");
            break;
        case 3600:
            cm.getPlayer().setKeyValue("AutoJob", "3610");
            break;
        case 3700:
            cm.getPlayer().setKeyValue("AutoJob", "3710");
            break;
        case 4100:
            cm.getPlayer().setKeyValue("AutoJob", "4110");
            break;
        case 4200:
            cm.getPlayer().setKeyValue("AutoJob", "4210");
            break;
        case 5100:
            cm.getPlayer().setKeyValue("AutoJob", "5110");
            break;
        case 6100:
            cm.getPlayer().setKeyValue("AutoJob", "6110");
            break;
        case 6500:
            cm.getPlayer().setKeyValue("AutoJob", "6510");
            break;
        case 14200:
            cm.getPlayer().setKeyValue("AutoJob", "14200");
            break;

    }
}


function AdvAutoJob() {
    switch (selFinal) {
        case 112:
            cm.getPlayer().setKeyValue("AutoJob", "110");
            break;
        case 122:
            cm.getPlayer().setKeyValue("AutoJob", "120");
            break;
        case 132:
            cm.getPlayer().setKeyValue("AutoJob", "130");
            break;
        case 212:
            cm.getPlayer().setKeyValue("AutoJob", "210");
            break;
        case 222:
            cm.getPlayer().setKeyValue("AutoJob", "220");
            break;
        case 232:
            cm.getPlayer().setKeyValue("AutoJob", "230");
            break;
        case 312:
            cm.getPlayer().setKeyValue("AutoJob", "310");
            break;
        case 322:
            cm.getPlayer().setKeyValue("AutoJob", "320");
            break;
        case 412:
            cm.getPlayer().setKeyValue("AutoJob", "410");
            break;
        case 422:
            cm.getPlayer().setKeyValue("AutoJob", "420");
            break;
        case 434:
            cm.getPlayer().setKeyValue("AutoJob", "430");
            break;
        case 512:
            cm.getPlayer().setKeyValue("AutoJob", "510");
            break;
        case 522:
            cm.getPlayer().setKeyValue("AutoJob", "520");
            break;
        case 532:
            cm.getPlayer().setKeyValue("AutoJob", "530");
            break;
    }
}