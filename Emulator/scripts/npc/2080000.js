
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
	str += "#b#e #h #���� ���� �߰� ������ : [ " + cm.getPlayer().getAddDamage() + " ]#n#k�Դϴ�\r\n\r\n";
	str += "#L1# #b#i4310129# #z4310129# 30���� �߰������� õ�� �ο��ϱ�#k - �������� ���� ("+cm.itemQuantity(4310129)+")";
	str += "\r\n#L2# #b#i4310129# #z4310129# 60���� �߰������� 2õ�� �ο��ϱ�#k - �������� ���� ("+cm.itemQuantity(4310129)+")";
	str += "\r\n#L3# #b#i4310129# #z4310129# 90���� �߰������� 3õ�� �ο��ϱ�#k - �������� ���� ("+cm.itemQuantity(4310129)+")";
	cm.sendSimple(str);
    } else if (selection == 1) {

         if (cm.itemQuantity(4310129) > 30) {
	cm.gainItem(4310129, -30);
	cm.getPlayer().gainAddDamage(10000000);
	cm.sendOk("�߰��������� �������ּż� �����մϴ�.");
	cm.dispose();
	}

	else{
	cm.sendOk("ȫ�������� ������ �����մϴ�.\r\n31�� �̻� �־���� ���� �����մϴ�.");
	}

    } else if (selection == 2) {

         if (cm.itemQuantity(4310129) > 60) {
	cm.gainItem(4310129, -60);
	cm.getPlayer().gainAddDamage(20000000);
	cm.sendOk("�߰��������� �������ּż� �����մϴ�.");
	cm.dispose();
	}

	else{
	cm.sendOk("ȫ�������� ������ �����մϴ�.\r\n61�� �̻� �־���� ���� �����մϴ�.");
	}

    } else if (selection == 3) {

         if (cm.itemQuantity(4310129) > 90) {
	cm.gainItem(4310129, -90);
	cm.getPlayer().gainAddDamage(30000000);
	cm.sendOk("�߰��������� �������ּż� �����մϴ�.\r\n91�� �̻� �־���� ���� �����մϴ�.");
	cm.dispose();
	}

	else{
	cm.sendOk("ȫ�������� ������ �����մϴ�.");
	}

    }
}
