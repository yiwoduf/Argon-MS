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
	if (cm.getPlayer().getLevel() >= 180 && cm.getPlayer().getMapId() == 100030301) {
        cm.sendNext("#fn������� Extrabold#\r\n�ȳ��ϼ���~.. Ȥ�� �ð� �� ��������~..?\r\n�� ģ�� #r����#k ��.. ����.. ������ �ʿ��ؿ�~...");
        } else {
	cm.sendOk("#fn������� Extrabold##r* �÷��� ����#k\r\n\r\n#d- ���� 180 �̻� �� ĳ����\r\n- ����Ʈ�� ���� ���� �÷��� ����#k",9062004);
	cm.dispose();
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n�׷���..��..? �ƴ�..�ƴ�.. �����..?",2);
    } else if (status == 2) {
        cm.sendYesNo("#fn������� Extrabold#�ڼ��� ������ �����ҰԿ�~!..\r\n\r\n#d(�����ϸ� �ٷ� ����Ʈ�� �����Ϸ� �̵��մϴ�.)#k");
    } else if (status == 3) {
	if (cm.getPlayerCount(914050000) > 0) {
	cm.sendOk("#fn������� Extrabold##r�̹� �������� �������̿���~... ��� ��ٷ�������~!#k");
	cm.dispose();
	} else {
        cm.removeAll(4032335);
        cm.removeAll(4033012);
	cm.warp(914050000,0);
	cm.dispose();
	}  
    }
}