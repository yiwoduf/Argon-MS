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
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k �ű�! ��! ������ �� �� �� ���ڴ�..?");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��?.. ��.. ����?..",2);
    } else if (status == 2) {
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k �׷�!.. �� ����..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��?.. ���� ��..\r\n\r\n#d(�� ����.. ���� ������� �ú��..)#k",2);
    } else if (status == 4) {
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k ����.. ����ϱ��.. ������! �� ����..\r\n�Ķ���� �г�� �����̵��� �����ϴ� �Ҹ���.. �鸮�� �ʴ�?");
    } else if (status == 5) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. ��.. ��.. �ڼ��� ����..\r\n�鸮�°� ���⵵ �ϰ�.. �ƴ� �� ���⵵ �ϰ�..\r\n\r\n#d(�� ����.. ���� �ͽ��� ������..)#k",2);
    } else if (status == 6) {
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k �׷�! �ٷ� �װž�!!\r\n�̰� �и��� �Ķ���� ��� �Ƕ�̵忡 �������� ����� Ʋ������!");
    } else if (status == 7) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. ��.. �׷�.. �� ���� ���Ϸ� ��������.~\r\n�� ����! �ٻ� ���������.. �̸�..\r\n\r\n#d(����.. ���ϵ簡 �ؾ���..)#k",2);
    } else if (status == 8) {
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k ���!.. ��! �� ��� ������ �׷���..\r\n���� �Ķ���� �г�� �������.. ������ �ܸ��Ұž�!?");
    } else if (status == 9) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k �ƴ�.. �ۼ�.. ���� �Ķ���ΰ� �ӽñ䰡..\r\n����.. ������ ���ٴϱ� �׷��׿�..\r\n\r\n#d(����.. ����.. �ǰ��� ��Ÿ���̾�..)#k",2);
    } else if (status == 10) {
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k ��.. �׷�..? �װ� �� �ƽ���..\r\n#fs15#�Ķ���� ���� #fs12#��.. �׷��� ��ġ�� ���ٴ���..\r\n��.. �ٻڴٴ�.. ���� �� �.. ���� ����..~^^");
    } else if (status == 11) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����.. ������ ����� �ܸ��� �� ������..\r\n�� �ʿ�� �ϴ� ����� �ִٸ�.. �� �� ���� ��ġ�ڳ��̴�..\r\n\r\n#d(��.. �Ķ���� ��.. ����..?..)#k",2);
    } else if (status == 12) {
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k ��.. ����.. �������� ���忡 �����㱸��.. �׷�..\r\n��.. �̰�.. ����Ͻ��ϱ�.. �� �ٸ� ����� ������..\r\n������ �̻ڰ� ������ ���ڴ�.. ������ �ʿ�� �ϴ� �����ڳ�?");
    } else if (status == 13) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. �װ�.. �׷��� ġ��.. �� �ϸ� �Ǵµ���.?",2);
    } else if (status == 14) {
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k ����� ����! ������!\r\n�Ƕ�̵忡 ���� �������� ������� �˾ƺ��� �ǰŵ�..?\r\n�������� ����ٸ�.. ���͵� �� �ְ�.. �׷���..");
    } else if (status == 15) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. �װ� ��..\r\n���� ���θ� �� �����..; �����ϳ׿�.. ���� �׳�.. Ȯ..;",2);
    } else if (status == 16) {
        cm.sendNext("#fn������� Extrabold#\r\n#r������ī ::#k ����.. �����ϰ�.. ���� �ٷ� �����ٰ�..\r\n\r\n#d(������ ������ �ٷ� �̵��մϴ�.)#k");
    } else if (status == 17) {
        cm.warp(926010000,0);
        cm.dispose();  
    }
}