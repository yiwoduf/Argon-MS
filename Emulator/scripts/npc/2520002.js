importPackage(java.lang);
var status = -1;
var point = 2000; // ����
var point2 = 1500; // ȯ��
var damage = 10000000; //�߰������� ��
function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    }
    if (mode == 0 || mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 0) {
        cm.sendSimple("#fs13##d#fn������� EXtrabold# �ȳ��ϼ���! AURORA ONLINE �߰������� ���� �߰��������� 21���̻��� �������� �հ� ���������� �������� ��½ý����Դϴ�. ���Ŵ�  " + damage + "����\r\n\r\n ���� �߰� ������ : ("+cm.getPlayer().getAddDamage()+")#l#k\r\n\r\n#L3#ȯ������Ʈ " + point2 + "�� �����ϱ�\r\n#l\r\n(���� ����Ʈ : "+cm.getPlayer().getGP()+")\r\n#r#L5#�Ŀ�����Ʈ ���Ź���\r\n#r");
    } else if (status == 1) {
if (selection == 2) {
        if (cm.getPlayer().getAddDamage() + damage > 999999000100000000) {
            cm.sendOk("21���� �ִ��Դϴ�.");
            cm.dispose();
        } else if (cm.getRC() > point) {
            cm.getPlayer().loseRC(point);
            cm.getPlayer().gainAddDamage(damage);
            cm.sendOk("��ȯ �Ϸ�");
            cm.dispose();
        } else {
            cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�");
            cm.dispose();
        }
} else if (selection == 3) {
        if (cm.getPlayer().getAddDamage() + damage > 999999000100000000) {
            cm.sendOk("21���� �ִ��Դϴ�.");
            cm.dispose();
        } else if (cm.getPlayer().getGP() > point2) {
            cm.getPlayer().gainGP(-point2);
            cm.getPlayer().gainAddDamage(damage);
            cm.sendOk("��ȯ �Ϸ�");
            cm.dispose();
        } else {
            cm.sendOk("ȯ�� ����Ʈ�� �����մϴ�");
cm.dispose();
        }
} else if (selection == 4) {
        if (Long.parseLong(cm.getPlayer().getKeyValue("maxdamage")!=null? cm.getPlayer().getKeyValue("maxdamage"):0)+damage > 999999000100000000) {
            cm.sendOk("21���� �ִ��Դϴ�.");
cm.dispose();
        } else if (cm.haveItem(4310088,20)) { // ���� �ڵ�� ���� �Է�.
            cm.gainItem(4310088,-20);
            cm.getPlayer().setKeyValue("maxdamage", Long.parseLong(cm.getPlayer().getKeyValue("maxdamage")!=null? cm.getPlayer().getKeyValue("maxdamage"):0)+damage);
            cm.sendOk("��ȯ �Ϸ�");
cm.dispose();
        } else {
            cm.sendOk("ȫ��20���ִ��� �³���?");
cm.dispose();
        }
} else if (selection == 5) {
	cm.sendOk("īī���� : @���ζ�¶��� \r\n����Ʈ�� : saracen_dev@nate.com");
	cm.dispose();
}
}
}