


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	�絹�� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9001050

	���ǽ� �̸� : ���ǳ� ����

	���ǽð� �ִ� �� :  :  (0)

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
        cm.sendOk("�ۻ���");
        cm.dispose();
        return;
    }
}
