var status = -1;

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
	if (cm.haveItem(4032335, 1)) {
	var jessica = "#fn������� Extrabold#���� �ʹ�.. �ʹ�.. �⻵��~!!\r\n���� #bƲ��#k �� �ᱹ ã���ּ̱���~!!\r\n���� �����̴ּµ� ���� ���� ������ �ȵ帱 �� ������~..!\r\n��..��! #d���� �׸� �ڽ�#k �� ���� #r1 õ�� �޼�#k �� ����������\r\n#b�����̾� �Ǽ����� �ֹ���#k �� ȹ���� �� �־��~!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i2430460# #b#z2430460##k\r\n#i4310129# #b��Ӹ��� ����#k #r5 ��#k\r\n\r\n#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L100##b������ �ް� ����Ʈ�� ���� ���� �̵��ϱ�#k";
        cm.sendSimple(jessica);
    } else if(cm.haveItem(4033012, 1)) {
        cm.sendSimple("#fn������� Extrabold#����.. �����ֽŴٴ�.. ����.. ������~!\r\n����.. �ǽɰ��� �����ڰ� �� �ټ��� ���� �ε�..\r\n����.. �����ִ����� ���� ������ �𸣰ھ��~..\r\n�����ڵ鳢�� �� #bƲ��#k �� ���� �Űܰ���.. ����� �ֳ�����..\r\n��.. �� ������ Ư�� #bƲ��#k �� ã�ƿ��ּ���~!\r\n\r\n#fs14##r* ������ HP - 100 ��#k#fs12#\r\n#r   (��, ��Ÿ â�� �� ��������� Ʋ�ϸ� ȸ������ ���մϴ�.)#k\r\n\r\n#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n#b#L20#�������� �����.. ��� �Ķ� �ź���\r\n#L21#������ ����.. ��� �Ķ� ������\r\n#L22#������ ���׶�.. ���� ��� �ö�� ī��\r\n#L23#�Ϻ� ���� ������.. ������ ��� ������\r\n#L24#���� ���� �����.. �ö�� ��");
        } else {
	cm.sendNext("#fn������� Extrabold#\r\n#b#h ##k �� �ȳ��ϼ���~\r\n����� �׷��� ���ϴٰ� ������~..\r\n�ҹ���� �װ� �����ΰ���~?");
	}
    } else if (status == 1) {
    if (selection == 20) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn������� Extrabold##r�̹�.. �������� �������̿���.. ��� ��ٸ�����~#k");
	cm.dispose();
	} else {
	cm.GayQuest(1);
	cm.dispose();
	}
    } else if (selection == 21) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn������� Extrabold##r�̹�.. �������� �������̿���.. ��� ��ٸ�����~#k");
	cm.dispose();
	} else {
	cm.GayQuest(2);
	cm.dispose();
	}
    } else if (selection == 22) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn������� Extrabold##r�̹�.. �������� �������̿���.. ��� ��ٸ�����~#k");
	cm.dispose();
	} else {
	cm.GayQuest(3);
	cm.dispose();
	}
    } else if (selection == 23) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn������� Extrabold##r�̹�.. �������� �������̿���.. ��� ��ٸ�����~#k");
	cm.dispose();
	} else {
	cm.GayQuest(4);
	cm.dispose();
	}
    } else if (selection == 24) {
	if (cm.getPlayerCount(326090310) > 0) {
	cm.sendOk("#fn������� Extrabold##r�̹�.. �������� �������̿���.. ��� ��ٸ�����~#k");
	cm.dispose();
	} else {
	cm.GayQuest(5);
	cm.dispose();
	}
    } else if (selection == 100) {
	if (cm.haveItem(4032335, 1)) {
	if (cm.canHold(2430460) && cm.canHold(4310129)) {
        cm.removeAll(4032335);
        cm.removeAll(4033012);
        cm.gainItem(2430460, 1);
        cm.gainItem(4310129, 5);
        cm.warp(100030301,0);
        cm.sendOk("#fn������� Extrabold##b�츮�� ������!! �ȳ���! �߰�����~!!#k\r\n\r\n#d* ���� �׸� ���� �� ������ 1 õ�� �޼Ұ� ���� �˴ϴ�.\r\n* ���� �׸� ���� �� ������ �� �Һ� â�� �� ĭ �̻� ����μ���.#k");
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
	cm.dispose();
		    } else {
		        cm.sendOk("#fn������� Extrabold##r�Һ� �Ǵ� ��Ÿ ĭ�� �� ������ �����ϴ�.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn������� Extrabold##rƲ�ϰ� ���µ�.. ������ �����Ű� �³���..?..#k");
		    cm.dispose();
                }
    } else {
    cm.sendNextPrevS("#fn������� Extrabold#�¾�!.. ���� �׷��Գ� ������!!~ #fs15##b������!#k#fs12#\r\n\r\n#d(�̰͵���.. ���⺸�� ��� �� �� �ƴ±���..)", 2);
    }
    } else if (status == 2) {
    cm.sendNextPrev("#fn������� Extrabold#\r\n��������.. #b#h ##k ���� �����⵵ �ؿ�~!!\r\n\r\n�̷��ٰ� ���� ���ع��� �� ���ƿ�~!\r\n�׷� �ǹ̿��� #b#h ##k ��.. ��Ź �Ѱ����� �Ҳ���~!\r\n\r\n#r#fs15#�źδ� �����~~ Boy��!#k#fs12#");
    } else if (status == 3) {
    cm.sendNext("#fn������� Extrabold#\r\n#fs14#�װ� �ٷ�! �����̳�~!!#fs12#\r\n\r\n����.. ���� ���̸� �Ծ���� �� '��'�� ������~..�Ф���\r\n�׷��� �� �� ���� ���� �ֿ� ������ ���� ������~!!\r\n�׷�����!!.. �ǻ� �����Բ��� #bƲ��#k �� ��������~��");
    } else if (status == 4) {
    cm.sendNextPrevS("#fn������� Extrabold#\r\n�׷��� ��� �Ǿ��µ�...? #bƲ��#k �� ��ž�..?\r\n\r\n#d(�����ϴ�.. ���츦 1 ����..�� ������ ó�԰� ���ܰ�����..\r\nȤ�� �������� ���� ������ �����ؾ���...)#k", 2);
    } else if (status == 5) {
    cm.askAcceptDecline("#fn������� Extrabold#�翬��..!! #d������ �̻�#k �� ���� Ư�� #bƲ��#k �� ������~!\r\n�׷���.. ���� ��� ���̿� � #fs14##r�� ��ư#k#fs12# �༮��\r\n�� ������ #bƲ��#k �� ���İ� ���� ���̿���~...\r\n���̰�.. �����⸸ �ϸ� ���������� ����� �����ھ��~!!\r\n�׷��� ���ε�.. �� #bƲ��#k �� �� ã���ֽø� �ȵɱ��~?!");
    } else if (status == 6) {
           if (cm.canHold(4033012)) {
           cm.sendOkS("#fn������� Extrabold##d(�ϴܡ� ���� �ƴ� �� ������.. �ٽ� ���� �ɾ��..)#k", 2);
           cm.gainItem(4033012, 1);      
           cm.dispose();
           } else {
           cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�. �� ĭ �̻� ����ּ���.#k");
           cm.dispose();
           }
    }
}