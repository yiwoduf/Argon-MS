


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	�丮 �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 2159110

	���ǽ� �̸� : ���

	���ǽð� �ִ� �� : ���罺Ʈ��Ʈ : ����! ����� ���� (931000310)

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
        cm.sendOk("�����´���ġ");
        cm.dispose();
        return;
    }
}
