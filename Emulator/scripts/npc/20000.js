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
    if (cm.getPlayer().getMapId() == 100030301) {
        var john = "#fn������� Extrabold#���Ǿ�.. ���� �׳డ �ʹ����� ������ ����..\r\n��� �ϸ� �׳డ �� ������ �˾��ٱ�?\r\n\r\n";
    if (!cm.haveItem(4033970,1)) {
        john += "#fs11##fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#fn����##L1##d���� ������ ����ִ� ��";
    } else {
        john += "#fs11##fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#fn����##L2##d���� ������ ����ִ� ��";
    }
        cm.sendSimple(john);
    } else {
        cm.dispose();
    }
    } else if (status == 1) {
            if (selection == 2 ) {
	cm.sendOk("#fn������� Extrabold#���� ���� ������! �̰��� �� ���� �����̾�..\r\n��縻�� �޵��� �ϰ�!..\r\n\\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n\r\n#i4310129# #b��Ӹ��� ����#k #r1 ��#k");
	cm.gainItem(4033970,-1);
	cm.gainItem(4310129, 1);
	cm.forceStartQuest(501);
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
	cm.dispose();
        } else {
        cm.sendNextS("#fn������� Extrabold##b���̸� �����ִٰ� ������ �״��� �˾Ҿ� ����..\r\n������... #fs14#��#fs12# �̶�� ����̿���..?",2);
        }
    } else if (status == 2) {
        cm.sendNextPrevS("#fn������� Extrabold##b�ȳ��ϼ���! #fs14#��#fs12# �� �����Ű���??\r\n���� #fs14##h ##fs12# (��)��� �մϴ�.#k",2);
    } else if (status == 3) {
        cm.sendNextPrev("#fn������� Extrabold#��? ������ �����̷α����׷�, �����Ϸ� �� ã�ƿ���?..");
    } else if (status == 4) {
        cm.sendNextS("#fn������� Extrabold##b��! ���� #fs14#��#fs12# ���� �� \r\n\r\n#fs13##L1#�������� ���� �;� �ҹ���� ã�ƿԽ��ϴ�.\r\n#L2#���͵帮��� �Ƿڸ� �޾Ƽ� �Խ��ϴ�.",2);
    } else if (status == 5) {
            if (selection == 2) {
	cm.sendYesNo("#fn������� Extrabold#��, �¾�! ������ �ѹ� ���ʹ޶�� �Ƿ� �߾��� ���� �־�����..?\r\n��¶�� �ݰ���!.. �׷��ٸ� �� �̾߱⸦ ���� �غ�� �Ǿ���?");
	} else {
        	cm.sendYesNo("#fn������� Extrabold#��? �� �ҹ��� ���� �׷��� ������...?\r\n�ڼ��� ���� ���״� �� �̾߱⸦ ��� ���ھ�?");
    }
    } else if (status == 6) { 
       cm.sendNext("#fn������� Extrabold#�β�������, ���� �� ���̿� �����ϴ� ������ �Ѹ� �־�!\r\n�׳��� �̸��� ���Ǿ�..��, �̸��� �� �Ƹ�����?\r\n������ �׳࿡�� ��� ��� �ؾ����� ��� �ϴ� �ߡ�");
    } else if (status == 7) { 
       cm.sendYesNo("#fn������� Extrabold#���� ���� ����� ���ö���! �ٷ� �γ��� �� ����⿡ �ִ�\r\n#i4033970# #b#z4033970##k �� �ִ°ž�! �̸� ������ ���ڱ�..\r\n������ �� �����δ� ������.. ���ϱ� ������ �ʾ�..\r\n���� ��� ���ش� �شٸ� �ʿ��� ������ �Ǵ� �� �ֵ��� �Ұ�!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/3/0#\r\n#i4310129# #b��Ӹ��� ����#k #r1 ��#k\r\n\r\n#d�׷� ���� �ٷ� �γ��� ������ ����..??#k");
    } else if (status == 8) { 
        cm.warp(910130101,0);
        cm.sendOk("#fn������� Extrabold##b��#k �� ���ϸ� �ٽ� ������ ����! �׷� ��Ź�� #b#h ##k !!");
      }
    }
