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
        if(!cm.haveItem(4033802,1)){
        cm.sendNext("#fn������� Extrabold#\r\n#r�೪�̽� ::#k �ڳ�.. #r���� ����#k �� ã�� ����!..");
        } else {
        cm.sendOk ("#fn������� Extrabold#�ڳ״�.. �̹� ������ #b���� ��ǥ#k �� ���� �� ����!..#k\r\n���� �ܿ����ν� �ڽŰ��� ������! ������!~");
        cm.dispose();
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��!.. �½��ϴ�.. �ٵ�.. �װ�..! ���?..",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#r�೪�̽� ::#k ��.. �̹� �ӹ��� ����.. #r�೪�̽�#k ���..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����.. ���� ����̽ñ���.. �׷��� ��¼�ٰ�.. ������..",2);
    } else if (status == 4) {
	cm.sendNextPrev("#fn������� Extrabold##r�೪�̽� ::#k ��.. Ʈ���� �ɷ�.. ��¼�ٺ��� �׷��� �Ǿ���..\r\n¶�� ���� ������ �͵� �ְ� ���⿡ �� �� ����\r\n�ڳ״� �Ϲ� ������� ���� ���Ѱ� �ƴ� �� ����..\r\n�ڳ׸� �츮 ���� �ܿ����� �Ӹ� �ϰ� �ͳ�..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4033802# #b#z4033802##k");
    } else if (status == 5) {
	if (cm.canHold(4033802)) {
        cm.gainItem(4033802, 1);
        cm.sendOk ("#fn������� Extrabold#�� #b��ǥ#k �� ������.. ������ ��Ż�� �̵��ϰԳ�..!");
        cm.dispose();
        } else {
        cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ְԳ�..#k");
        cm.dispose();
        }
        cm.dispose();
    }
}