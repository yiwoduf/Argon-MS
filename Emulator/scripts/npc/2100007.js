


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	��Ÿ�� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 2100007

	���ǽ� �̸� : ���϶�

	���ǽð� �ִ� �� :  :  (0)

	���ǽ� ���� : �Ǻΰ�����


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
        cm.sendOk("�غ����Դϴ�..");
        cm.dispose();
        return;
    }
}
