


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	�Ʒ� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1510006

	���ǽ� �̸� : ��Ÿ�� ����

	���ǽð� �ִ� �� : ������ ���� : ���� �ٹٶ��� �� (141040000)

	���ǽ� ���� : MISSINGNO


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
        cm.sendOk("#fn���� ���##r���ε� �¶��� �⺻ �ȳ�#n#b\r\n\r\nTP����Ʈ�� ���� 1������ 1~50����Ʈ\r\n\r\n���̷� �������� ���Դϴ�.\r\n\r\nTP����Ʈ�� 400����Ʈ�� ���̸�\r\n\r\n�ڵ����� ��������1���� ��ȯ�˴ϴ�.\r\n\r\n�Ŀ� 2�� �̺�Ʈ �� ī�� ���� �ʵ�.");
        cm.dispose();
        return;
    }
}
