var status = -1;

pass = true;

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        if (cm.getPlayer().getQuestStatus(31851) == 2) {
             cm.sendNext("�� ��Ż�� ���� �ű׳ʽ����� �������� ü���� ���� �� �־��. ���� �ű׳ʽ��� ���� ���� �ξ��� ����ġ������ ����� ���� ����δ� �װ� �Ѱ豺��.");
        } else {
             cm.dispose();
             return;
        }
    } else if (status == 1) {
        cm.sendYesNo("�ű׳ʽ����� ������(���� ���)�� ���� �̵��Ͻǰǰ���?\r\n#b"
                    +"<< �ű׳ʽ� �������� 1�Ͽ� 3ȸ Ŭ���� �����մϴ�.>>\r\n"
                    +"<< 115 ���� �̻� ���� �� ��Ƽ�� �����Ͻ� �� �ֽ��ϴ�.>>");
    } else if (status == 2) {
        cm.sendNext("�ִ��� ����� ȯ���� �����ϱ� ���� ������ ��ä�� ������ �ξ����. �� ������ ���¿� ������ �� �־��.")
    } else if (status == 3) {
        cm.warp(401060399, "west00");
        cm.dispose();
    }
}