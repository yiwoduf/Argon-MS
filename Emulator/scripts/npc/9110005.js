importPackage(java.lang);
var status = -1;
var point = 100000;
var damage = 1000000000;
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
        cm.sendSimple("#fs13# #d �ȳ��ϼ��� ���ÿ¶��� �߰��������� ����ϴ� ������Դϴ� #fs13# #l\r\n #fn�������# #fs12# #g�߰��������� 21���̻��� �������� �հ� ���������� �������� ��½ý����Դϴ�#l\r\n  #h #  #r�� ���� �Ŀ�����Ʈ : " + cm.getPlayer().getRC() + "#L2##r\r\n\r\n\r\n\r\n" + damage + "�߰� �������� �Ŀ�����Ʈ " + point + "�� �����ϱ�");
    } else if (status == 1) {
        if (Long.parseLong(cm.getPlayer().getKeyValue("maxdamage")!=null? cm.getPlayer().getKeyValue("maxdamage"):0)+damage > 999999000100000000)
            cm.sendOk("21���� �ִ��Դϴ�.");
        else if (cm.getRC() > point) {
            cm.getPlayer().loseRC(point);
            cm.getPlayer().setKeyValue("maxdamage", Long.parseLong(cm.getPlayer().getKeyValue("maxdamage")!=null? cm.getPlayer().getKeyValue("maxdamage"):0)+damage);
            cm.sendOk("��ȯ �Ϸ�");
        } else
            cm.sendOk("�Ŀ� ����Ʈ�� �����մϴ�");
    }
}