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
        cm.sendNext("#fn������� Extrabold#\r\n#rŰ�� ::#k �츮�� ���.. #r������#k �� ����.. �̷��� �ǽôٴ�..\r\n");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����.. �����Դϴ�.. ���� ���ѵ�Ⱦ���ϴ°ǵ�..",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#rŰ�� ::#k ������.. �ڳ״� ��å���� ����..\r\n�� �ڸ� ���� ����.. �츮 å������..\r\n�׷���!.. ���� �츮�� �� ���� ��ü�� �˾Ƴ´ٳ�..!");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��ü �� �ڰ� ��������?\r\n����.. ���� #r������#k ���� ������ �����Կ�..!",2);
    } else if (status == 4) {
        cm.sendNextPrev("#fn������� Extrabold#\r\n#rŰ�� ::#k �װ�.. �ٷ�.. ����� #r���� ����#k ��� �༮����..\r\n�ϴ� �ڳ� ���Ҹ� �ൿ���� ����..\r\n�ڳ� �����̶�� ������ #r������#k �Բ� ���� �ֱ�����..\r\n#rŻ����#k ���� #b���� ����#k �� ã���� �Դ���..?\r\n�ϴ���!.. �ڳװ� �ƹ�����.. ��� �ӹ��� ����������� �� ����..");
    } else if (status == 5) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����.. ��� �غ� �Ǿ��ֽ��ϴ�..!\r\n\r\n#d(������ ������ �Ӻθ� �����Ϸ� �ٷ� �̵��մϴ�.)#k",2);
    } else if (status == 6) {
        cm.warp (303090030,0);
        cm.sendOk("#fn������� Extrabold#�ϴ� �츮�� ����.. #r������Ʈ#k �� ã�ư����Գ�..");
        cm.dispose();
    }
}