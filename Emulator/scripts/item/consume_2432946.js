var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1 || mode == 0) {
        cm.sendOk("��! ���� ���ڰ� �� �� �ִ� ��ȸ���µ�")
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
	cm.sendMixHair("2���� ������ �ͽ��� �Ӹ������� ������ �� �־�. ���̽� �÷��� �ͽ� �÷��� �����ϰ� ��ũ���� ������ �ڽŸ��� ���� ����� ��", 1012103);
    } else if (status == 1) {
         cm.sendOk("�� �� �����Ǿ����ϴ�.");
         cm.gainItem(2432946,-1)
         cm.dispose();
    }
}
