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
	if (cm.getPlayer().getMapId() == 304090310) { 
        cm.sendNext("#fn������� Extrabold#\r\n#r��Ÿ ::#k �ȳ��ϼ���.. ���� #rŻ����#k ���� ����� �����Դϴ�..\r\n");
        } else {
        cm.sendOk("#fn������� Extrabold#����.. ������..");
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����.. �׷�����..\r\n�嵥.. �ٵ�.. ��� �Ȱ���..?\r\n���� ���ع����� ���Ҵµ�..\r\n",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#r��Ÿ ::#k ���п�.. ��� ������� ������ ���ƿԾ��..\r\n����.. ��Ź �� ����.. �̸� ū ������ �𸣼˴ٰ�\r\n#rŻ����#k �Ե� �ſ� �̾����ϼ���..\r\n");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����..! ��������.. ���������..\r\n��ο��� ������ �Ǿ��ٴ�.. �����մϴ�..",2);
    } else if (status == 4) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#r��Ÿ ::#k #rŻ����#k ���� ������ #b���� ����#k ��\r\n���п�.. ����.. ������ ��ã���̾��...\r\n�ż��� �������̴ٸ鼭.. ������ �ֽðڴٴ�����..!");
    } else if (status == 5) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����.. �� �������.. �ٶ�� �Ѱ� �ƴѵ�..\r\n��.. �ֽŴٴ�.. �׷�.. ���.. �ʰ� �ްڽ��ϴ�..~^^*",2);
    } else if (status == 6) {
        if (cm.getQuestStatus(200) == 0) {
	cm.sendNextPrev("#fn������� Extrabold##r��Ÿ ::#k ����..! �翬��.. �׷��ð�����..!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i1122017# #b#z1122017##k #r2 �ϱ�#k\r\n#i4080000# #b#z4080000##k\r\n#i4080100# #b#z4080100##k\r\n#i4310129# #b��Ӹ��� ����#k #r40 ��#k\r\n\r\n#d(������ ������ ������ �ް� ����Ʈ�� ���� ���� �̵��մϴ�.)#k");
        } else {
	cm.sendNextPrev("#fn������� Extrabold##r��Ÿ ::#k ����..! �翬��.. �׷��ð�����..!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4310129# #b��Ӹ��� ����#k #r20 ��#k\r\n\r\n#d(������ ������ ������ �ް� ����Ʈ�� ���� ���� �̵��մϴ�.)#k");
        }
    } else if (status == 7) {
        if (cm.getQuestStatus(200) == 0) {
	if (cm.canHold(4080000) && cm.canHold(4080100) && cm.canHold(4310129) && cm.canHold(1122017)) {
	cm.gainItemPeriod(1122017, 1, 2);
        cm.gainItem(4080000, 1);
        cm.gainItem(4080100, 1);
        cm.gainItem(4310129, 40);
	cm.forceStartQuest(200);
	cm.removeAll(4032801);
	cm.removeAll(4033338);
	cm.removeAll(4034075);
	cm.removeAll(4009151);
	cm.removeAll(4009152);
	cm.removeAll(4009078);
	cm.removeAll(4009150);
	cm.removeAll(4009157);
	cm.removeAll(4009158);
	cm.removeAll(4033220);
	cm.removeAll(4033972);
	cm.removeAll(4009155);
	cm.removeAll(4033966);
	cm.removeAll(4033975);
	cm.removeAll(4031217);
	cm.removeAll(4033976);
	cm.removeAll(4033977);
	cm.removeAll(4033802);
	cm.removeAll(4032743);
	cm.warp(100030301,0);
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
               } else {
               cm.sendOk("#fn������� Extrabold##r��� �Ǵ� ��Ÿ â�� �� ĭ �̻� ����ּ���..#k");
               cm.dispose();
                }
        } else {
	if (cm.canHold(4310129)) {
        cm.gainItem(4310129, 20);
	cm.removeAll(4032801);
	cm.removeAll(4033338);
	cm.removeAll(4034075);
	cm.removeAll(4009151);
	cm.removeAll(4009152);
	cm.removeAll(4009078);
	cm.removeAll(4009150);
	cm.removeAll(4009157);
	cm.removeAll(4009158);
	cm.removeAll(4033220);
	cm.removeAll(4033972);
	cm.removeAll(4009155);
	cm.removeAll(4033966);
	cm.removeAll(4033975);
	cm.removeAll(4031217);
	cm.removeAll(4033976);
	cm.removeAll(4033977);
	cm.removeAll(4033802);
	cm.removeAll(4032743);
	cm.warp(100030301,0);
	cm.showEffect(false,"monsterPark/clear");
        cm.playSound(false,"Field.img/Party1/Clear");
               } else {
               cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ּ���..#k");
               cm.dispose();
                }
        }
        cm.dispose();  
    }
}