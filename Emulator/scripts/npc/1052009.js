


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	���Ǹ��Ŵ��� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1012007

	���ǽ� �̸� : ���ε�

	���ǽð� �ִ� �� : ��׽ý� : ���å�� (100000202)

	���ǽ� ���� : ���û�


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
        cm.warp(100050001);
        //cm.gainItem(4310014, 25);//snowcoin
        cm.gainItem(4031040, 1);//������ ����ġ
        cm.dispose();
        return;
    }
}
