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
        if(!cm.haveItem(4032743,1)){
        cm.sendNext("#fn������� Extrabold#\r\n#r�೪�̽� ::#k ������ �ö� ������ �����߳�..");
        } else {
        cm.sendOk ("#fn������� Extrabold#�ڳ״�.. �̹� ������ #bī��Ű#k �� ���� �� ����!..");
        cm.dispose();
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k �ƴմϴ�.. ���� ������ �ʾҽ��ϴ�.\r\n���� #r���� ����#k �� �ָ����� ���߰�����?",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#r�೪�̽� ::#k �ȱ׷��� ��� �Ѿ�� �ҽĿ� ���ϸ�\r\n#r���� ����#k �� ���� ������� ���ϰ� �ִٴ� �ҽ��� ��Գ�..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����... ����.. �ű������..!\r\n��¼�� ���� �� �ʰڴ°ɿ�?..",2);
    } else if (status == 4) {
	cm.sendNextPrev("#fn������� Extrabold##r�೪�̽� ::#k �������� �׷��� ���� �ʾ�����..\r\n�Ƚ��ϰ� ������ �Ѿư��Գ�!..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4032743# #b#z4032743##k");
    } else if (status == 5) {
	if (cm.canHold(4032743)) {
        cm.gainItem(4032743, 1);
        cm.sendOk ("#fn������� Extrabold#�� #bī��Ű#k �� ������.. � ���� �°��⸦ ž���ϰԳ�!..");
        cm.dispose();
        } else {
        cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ְԳ�..#k");
        cm.dispose();
        }
        cm.dispose();
    }
}