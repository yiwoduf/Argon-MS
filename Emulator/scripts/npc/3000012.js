/*

	���� �� : Rian Story Team

	���ǽþ��̵� : 3000012

	���ǽ� �̸� : ���� ����Ʈ

	���ǽð� �ִ� �� : ���׿� - ����� ���� (400000001)

	���ǽ� ���� : ������ �����̵�

*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
         cm.sendSimple("#L1# ��׽ý�#L2# �����Ͼ�#L3# �丮��#L4#Ŀ�׽�Ƽ\r\n#L5# �����ױ�#L6#�����ǿ��#L7#��ƿ����#L8# ������#L9#����\r\n#L10#������#L11#������#L12#���긮��#L15#����Ƹ���\r\n#L16#������#L17#����#L18# ���ʸ���#L19#�Ƹ���Ʈ#L20#����Ƽ��\r\n#L21#������Ÿ��#L22#���췼#L23#ũ��Ƽ�ƽ�#L24# ���̺�");
	    } else if (status == 0) {
		cm.warp(104020000);
		cm.dispose();

	    } else if(selection == 1) {
		cm.warp(100000000);
		cm.dispose();

	    } else if(selection == 2) {
		cm.warp(101000000);
		cm.dispose();

	    } else if(selection == 3) {
		cm.warp(102000000);
		cm.dispose();

	    } else if(selection == 4) {
		cm.warp(103000000);
		cm.dispose();

	    } else if(selection == 5) {
		cm.warp(104000000);
		cm.dispose();

	    } else if(selection == 6) {
		cm.warp(105000000);
		cm.dispose();

	    } else if(selection == 7) {
		cm.warp(120000000);
		cm.dispose();

	    } else if(selection == 8) {
		cm.warp(130000000);
		cm.dispose();

	    } else if(selection == 9) {
		cm.warp(140000000);
		cm.dispose();

	    } else if(selection == 10) {
		cm.warp(200000000);
		cm.dispose();

	    } else if(selection == 11) {
		cm.warp(211000000);
		cm.dispose();

	    } else if(selection == 12) {
		cm.warp(220000000);
		cm.dispose();

	    } else if(selection == 15) {
		cm.warp(230000000);
		cm.dispose();

	    } else if(selection == 16) {
		cm.warp(240000000);
		cm.dispose();

	    } else if(selection == 17) {
		cm.warp(250000000);
		cm.dispose();

	    } else if(selection == 18) {
		cm.warp(251000000);
		cm.dispose();

	    } else if(selection == 19) {
		cm.warp(260000000);
		cm.dispose();

	    } else if(selection == 20) {
		cm.warp(261000000);
		cm.dispose();

	    } else if(selection == 21) {
		cm.warp(310000000);
		cm.dispose();

	    } else if(selection == 22) {
		cm.warp(910150300);
		cm.dispose();

	    } else if(selection == 23) {
		cm.warp(241000000);
		cm.dispose();

	    } else if(selection == 24) {
		cm.warp(310070000);
		cm.dispose();
	}
}
