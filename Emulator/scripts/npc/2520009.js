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
        cm.sendNext("#fn������� Extrabold#\r\n#rŰ�� ::#k �ȳ��ϼ���.. �ݰ�����..\r\n������ �������� #rŻ����#k ���� ��Ų� ������ �ٶ�� �־��..");
        } else {
	cm.sendOk("#fn������� Extrabold##r* �÷��� ����#k\r\n\r\n#d- ���� 160 �̻� �� ĳ����\r\n- ����Ʈ�� ���� ���� �÷��� ����#k",9062004);
	cm.dispose();
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. �����Կ�?.. �����Ϸ�..?",2);
    } else if (status == 2) {
        cm.sendNext("#fn������� Extrabold##rŰ�� ::#k �ϴ���.. #rŻ����#k �Բ� ���庸����..\r\n���� �ٷ� �̵��Ͻðھ��?\r\n\r\n#d(������ ������ �ٷ� �̵��մϴ�.)#k");
    } else if (status == 3) {
        cm.warp(302000000,0);
	cm.getPlayer().dropMessage(-1, "�������� Ż���� �� ��ȭ�ϼ���.");
	cm.getPlayer().dropMessage(5, "�������� Ż���� �� ��ȭ�ϼ���.");
        cm.dispose();  
    }
}