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
	cm.sendNext("#fn������� Extrabold#\r\n#rŻ���� ::#k ��.. �����̾�.. ����..\r\n�ſ�.. �����̾�.. ������.. �Ƚ��� �� �� ������..");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ���.. ������ �����Ű���?..\r\n��Ʈ������ �ǰ��� ���� ������..",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#rŻ���� ::#k ����.. ���� �������� �ʵ�.. �ù߳�� ������..\r\n�ɰ��ϰ� ����� ���ҷ��� ���� �� ����.. ��������..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��..�ù߷õ��̿�?..������",2);
    } else if (status == 4) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#rŻ���� ::#k �������� ��ǰ�� �������� �ڲ� �������\r\n�����Ѵٳ�.. ����.. ��� ���� �� �ϸ� ���ظ� �ϰڴٸ�..\r\n����! ���� �Ƴ��� ����ϴ� #b���� ����#k �� ��������! ����!!..\r\n��.. �����.. ������ ������ �� ���� �󸶳��� �ʾҰŴ�..\r\n���� �ʹ��Ѵٰ� �������ϳ�? .. ���.. �̷�����..");
    } else if (status == 5) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. �׷� ���� ��� ������ �� ��������..?",2);
    } else if (status == 6) {
        cm.sendNextPrev("#fn������� Extrabold#\r\n#rŻ���� ::#k �ڳ�.. �����ΰ�?\r\n������ �׷��� �ǰڴ°�?..");
    } else if (status == 7) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. �� ������ �� �ϵ� �����°ɿ�..",2);
    } else if (status == 8) {  
        cm.sendNextPrev("#fn������� Extrabold#\r\n#rŻ���� ::#k ���� ���� ���� �������±���...\r\n���� ��Ⱑ ���ٸ���.. �ڳװ�.. �ſ� ���� ���..");
    } else if (status == 9) {
        cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. �̷��Ϸ� ��������.. ����..;;",2);
    } else if (status == 10) {
        cm.sendNextPrev("#fn������� Extrabold##rŻ���� ::#k �׷�.. �ڳ׿���.. ��Ź����!..\r\n���� �ٷ� �������ڳ�?...\r\n\r\n#d(������ ������ �ٷ� �̵��մϴ�.)#k");
    } else if (status == 11) {
	if (cm.getPlayerCount(302010100) > 0) {
        cm.sendOk("#fn������� Extrabold##r�̹�.. ������.. ���ֱ�.. ��� ��ٷ� �ְԳ�..#k");
        cm.dispose();
        } else {
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
        cm.warp(302010100,0);
	cm.killAllMob();
	cm.getPlayer().dropMessage(-1, "[����] �ʵ����� ����� ���Ϳ��� �������� �������.. ��ٷ� �Ѱܳ��ϴ�.");
	cm.getPlayer().dropMessage(5, "[����] �ʵ����� ����� ���Ϳ��� �������� �������.. ��ٷ� �Ѱܳ��ϴ�.");
        cm.dispose();
        }
    }
}