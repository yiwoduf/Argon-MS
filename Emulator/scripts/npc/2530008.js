


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	�˹ٿ� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 2530008

	���ǽ� �̸� : ����

	���ǽð� �ִ� �� : ������ ������ : ���� �� ���� (304070000)

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
        cm.sendOk("#fn������� Extrabold#����...��..��......��..��");
        cm.dispose();
        return;
    }
}
