


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	�Ʒ� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1512000

	���ǽ� �̸� : �Ʊ� ���

	���ǽð� �ִ� �� : �����÷ε� : ��ǳ���� ��� (10000)

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
        cm.sendOk("
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
        cm.sendOk("#fn����#���ε� �¶��� �⺻ �ȳ�\r\n\r\n(TP����Ʈ�� ���� 1������ 1~50����Ʈ ���̷� �������� ���Դϴ�.)\r\n\r\nTP����Ʈ�� 400����Ʈ�� ���̸� �ڵ����� ��������1���� ��ȯ�˴ϴ�.\r\n\r\n�Ŀ� 2�� �̺�Ʈ �� ī�� ���� �ʵ�.");
        cm.dispose();
        return;
    }
}");
        cm.dispose();
        return;
    }
}
