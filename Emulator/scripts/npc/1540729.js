


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	�ñ�Ÿ�� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1540729

	���ǽ� �̸� : �ñ׳ʽ�

	���ǽð� �ִ� �� : ���� ��� : �ñ׳ʽ��� ���� (271040100)

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
        cm.spawnMob(8850000, -181, -100);
	cm.removeNpc(1540729);
        cm.dispose();
    }
}
