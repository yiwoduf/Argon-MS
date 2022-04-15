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
	if (cm.getPlayer().getLevel() >= 160 && cm.getPlayer().getMapId() == 100030301) {
        var jump = "��~��!��~��! ��? ����!? �ʵ� ��ó�� ������ �����ϴ±���!?\r\n����! �׷��ٸ� �ʰ� ���� �����ָ� ���� �������� �ٰ�!#k\r\n�����.. #b#h ##k, �ʰ� ���� ������ �� �ִ� �������\r\n\r\n";
        jump += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n";
        if (cm.getQuestStatus(500) == 1 && cm.getQuestStatus(501) == 1 && cm.getQuestStatus(502) == 1 && cm.getQuestStatus(503) == 1) {
        jump += "#L100##r#i4001308# ������ �Ҿ���� ���� (����Ʈ �Ϸ�)\r\n";
        jump += "#L200##i4001308# ���� ������ ����ִ� �� (����Ʈ �Ϸ�)\r\n";
        jump += "#L300##i4001308# ũ�������� ������� (����Ʈ �Ϸ�)\r\n";
        jump += "#L400##i4001308# �����߻��� �� Ž�� ���� (����Ʈ �Ϸ�)#k\r\n\r\n";
        jump += "#L5##b#h ##k : #r���� �����ְ� ������ ���� ������ �ּ���.#k";
        } else if (cm.getQuestStatus(500) == 1 && cm.getQuestStatus(501) == 1 && cm.getQuestStatus(502) == 1) {
        jump += "#L100##r#i4001308# ������ �Ҿ���� ���� (����Ʈ �Ϸ�)\r\n";
        jump += "#L200##i4001308# ���� ������ ����ִ� �� (����Ʈ �Ϸ�)\r\n";
        jump += "#L300##i4001308# ũ�������� ������� (����Ʈ �Ϸ�)#k\r\n";
        jump += "#L4##b �� �����߻��� �� Ž�� ���� (���۰���)#k\r\n";
        } else if (cm.getQuestStatus(500) == 1 && cm.getQuestStatus(501) == 1) {
        jump += "#L100##r#i4001308# ������ �Ҿ���� ���� (����Ʈ �Ϸ�)\r\n";
        jump += "#L200##i4001308# ���� ������ ����ִ� �� (����Ʈ �Ϸ�)#k\r\n";
        jump += "#L3##b �� ũ�������� ������� (���۰���)#k\r\n";
        jump += "#L40##r�����߻��� �� Ž�� ���� (���ۺҰ�)#k\r\n";
        } else if (cm.getQuestStatus(500) == 1) {
        jump += "#L100##r#i4001308# ������ �Ҿ���� ���� (����Ʈ �Ϸ�)#k\r\n";
        jump += "#L2#���� ������ ����ִ� �� (���۰���)\r\n";
        jump += "#L30##rũ�������� ������� (���ۺҰ�)\r\n";
        jump += "#L40#�����߻��� �� Ž�� ���� (���ۺҰ�)#k\r\n";
        } else {
        jump += "#L1##b������ �Ҿ���� ���� (���۰���)#k\r\n";
        jump += "#L20##r���� ������ ����ִ� �� (���ۺҰ�)\r\n";
        jump += "#L30#ũ�������� ������� (���ۺҰ�)\r\n";
        jump += "#L40#�����߻��� �� Ž�� ���� (���ۺҰ�)#k\r\n";
        }
	} else {
	cm.sendOk("#fn������� Extrabold##r* �÷��� ����#k\r\n\r\n#d- ���� 160 �̻� �� ĳ����\r\n- ����Ʈ�� ���� ���� �÷��� ����#k",9062004);
	cm.dispose();
        }
	cm.sendFriendsSimple(jump,true);
    } if (selection == 1) {
        cm.dispose();
        cm.openNpc(1052102);
    } else if (selection == 2) {
        cm.dispose();
        cm.openNpc(20000);
    } else if (selection == 3) {
        cm.dispose();
        cm.openNpc(1061000);
    } else if (selection == 4) {
        cm.dispose();
        cm.openNpc(2010000);
    } else if (selection == 5) {
        if (cm.getQuestStatus(505) == 0) {
	if (cm.canHold(1112750) && cm.canHold(4310129)) {
        cm.setAllStat(1112750,400,100,0);
        cm.gainItem(4310129, 30);
        cm.forfeitQuest(500);
        cm.forfeitQuest(501);
        cm.forfeitQuest(502);
        cm.forfeitQuest(503);
        cm.forfeitQuest(504);
	cm.forceStartQuest(505);
        cm.sendOk("#fn������� Extrabold#����~! �ʵ� �� #b����#k �ϴµ�!?\r\n���� �����߾� �̰� �����ִ� �����̾�!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#i1112750# #b#z1112750##k #r[�ý��� 400 / ��, �� 100]#k\r\n#i4310129# #b��Ӹ��� ����#k #r30 ��#k");
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
        cm.dispose();
               } else {
               cm.sendOk("#fn������� Extrabold##r��� �Ǵ� ��Ÿ â�� �� ĭ �̻� ����ּ���..#k");
               cm.dispose();
               }
      } else {
	if (cm.canHold(4310129)) {
        cm.gainItem(4310129, 10);
        cm.forfeitQuest(500);
        cm.forfeitQuest(501);
        cm.forfeitQuest(502);
        cm.forfeitQuest(503);
        cm.forfeitQuest(504);
	cm.sendOk("#fn������� Extrabold#����~! �ʵ� �� #d����#k �ϴµ�!?\r\n���� �����߾� �̰� �����ִ� �����̾�!\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#i4310129# #b��Ӹ��� ����#k #r10 ��#k");
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
        cm.dispose();
               } else {
               cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ּ���..#k");
               cm.dispose();
               }
     }
    } else if (selection == 20) {
        cm.sendOk("#fn������� Extrabold##b#h ##k �� �� #d������ �Ҿ���� ����#k �� �Ϸ����� ���Ͽ�\r\n#d���� ������ ����ִ� ��#k ����Ʈ ������ #r�Ұ���#k �մϴ�.",9062004);
        cm.dispose();
    } else if (selection == 30) {
        cm.sendOk("#fn������� Extrabold##b#h ##k���� #d���� ������ ����ִ� ��#k �� �Ϸ����� ���Ͽ�\r\n#dũ�������� �������#k ����Ʈ ������ #r�Ұ���#k �մϴ�.",9062004);
        cm.dispose();
    } else if (selection == 40) {
        cm.sendOk("#fn������� Extrabold##b#h ##k���� #dũ�������� �������#k �� �Ϸ����� ���Ͽ�\r\n#d�����߻��� �� Ž�� ����#k ����Ʈ ������ #r�Ұ���#k �մϴ�.",9062004);
        cm.dispose();
    } else if (selection == 100) {
        cm.sendOk("#fn������� Extrabold#��!? #b#h ##k !? �������� ���� ������!\r\n������ ������ �ʿ��ϸ� �� ��Ź�Ұ�~>_<",1052102);
        cm.dispose();
    } else if (selection == 200) {
        cm.sendOk("#fn������� Extrabold#���� ���� #b��#k �� ������ �־��� �����̷α�..\r\n�ڳ��� ������ ���� �ʰ� ����..\r\n�ε� �� ������ ���� ���� ������ �ϰԳ�..",20000);
        cm.dispose();
    } else if (selection == 300) {
        cm.sendOk("#fn������� Extrabold#�׶�.. #b�������#k �� ���θ� Ȯ���� �ּż� ����帳�ϴ�.",1061000);
        cm.dispose();
    } else if (selection == 400) {
        cm.sendOk("#fn������� Extrabold#��.. ���.. #b��������#k �� ã���༭ ����..!",2010000);
        cm.dispose();
    }  
}
