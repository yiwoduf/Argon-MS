


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Aeos Development Source Script

	�ĳ����� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1033002

	���ǽ� �̸� : ��Ƽ

	���ǽð� �ִ� �� : ������ �� : ���췼 (101050000)

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
        cm.sendOk("1033002");
        cm.dispose();
        return;
    }
}
