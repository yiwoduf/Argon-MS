
importPackage(java.util);
importPackage(java.lang);
importPackage(Packages.tools);


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	GM�þ� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1011100

	���ǽ� �̸� : �糪

	���ǽð� �ִ� �� : ��׽ý� : ��׽ý���ȭ���� (100000102)

	���ǽ� ���� : ��ȭ ����


*/

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
	var str = "�ȳ��ϼ��� #h #�� ���� ���ζ� �¶��ο� �߰������� �ο� ���ǽ��Դϴ�\r\n";
	str += "#b#e #h #���� ���� �߰� ������ : [ " + cm.getPlayer().getAddDamage() + " ]#n\r\n\r\n";
	str += "#b#e #h #���� ���� �Ŀ� ����Ʈ : [ "+cm.getRC()+" ]#n\r\n";
	str += "\r\n#L0# #r#i4310016# 1,000 �Ŀ� ����Ʈ�� #g�߰������� õ�� �ο��ϱ�#k";
	str += "\r\n#L1# #r#i4310016# 2,000 �Ŀ� ����Ʈ�� #g�߰������� 1�︸ �ο��ϱ�#k";
	str += "\r\n#L2# #r#i4310016# 20,000 �Ŀ� ����Ʈ�� #g�߰������� 10�� �ο��ϱ�#k";
	str += "\r\n#L3# #r#i4310016# 200,000 �Ŀ� ����Ʈ�� #g�߰������� 100�� �ο��ϱ�#k";
	str += "\r\n#L4# #r#i4310016# 2,000,000 �Ŀ� ����Ʈ�� #g�߰������� 1000�� �ο��ϱ�#k";
	cm.sendSimple(str);

    } else if (selection == 0) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21���� �ִ��Դϴ�.");
            cm.dispose();
        } else if (cm.getRC() >= 1000) {
            cm.getPlayer().loseRC(1000);
            cm.getPlayer().gainAddDamage(10000000);
            cm.sendOk("��ȯ �Ϸ�");
            cm.dispose();
        } else {
            cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�");
            cm.dispose();
        }



    } else if (selection == 1) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21���� �ִ��Դϴ�.");
            cm.dispose();
        } else if (cm.getRC() >= 2000) {
            cm.getPlayer().loseRC(2000);
            cm.getPlayer().gainAddDamage(100000000);
            cm.sendOk("��ȯ �Ϸ�");
            cm.dispose();
        } else {
            cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�");
            cm.dispose();
        }


    } else if (selection == 2) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21���� �ִ��Դϴ�.");
            cm.dispose();
        } else if (cm.getRC() >= 20000) {
            cm.getPlayer().loseRC(20000);
            cm.getPlayer().gainAddDamage(1000000000);
            cm.sendOk("��ȯ �Ϸ�");
            cm.dispose();
        } else {
            cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�");
            cm.dispose();
        }


    } else if (selection == 3) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21���� �ִ��Դϴ�.");
            cm.dispose();
        } else if (cm.getRC() >= 200000) {
            cm.getPlayer().loseRC(200000);
            cm.getPlayer().gainAddDamage(10000000000);
            cm.sendOk("��ȯ �Ϸ�");
            cm.dispose();
        } else {
            cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�");
            cm.dispose();
        }

    } else if (selection == 4) {
        if (cm.getPlayer().getAddDamage() > 999999000100000000) {
            cm.sendOk("21���� �ִ��Դϴ�.");
            cm.dispose();
        } else if (cm.getRC() >= 2000000) {
            cm.getPlayer().loseRC(2000000);
            cm.getPlayer().gainAddDamage(100000000000);
            cm.sendOk("��ȯ �Ϸ�");
            cm.dispose();
        } else {
            cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�");
            cm.dispose();
        }

    }
}
