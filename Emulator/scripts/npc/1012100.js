


/*

	ǻ�� �ҽ�  ���� ��ũ��Ʈ �Դϴ�. (���� : ��ũ��) - �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	�ĳ����� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1012100

	���ǽ� �̸� : �ﷹ��

	���ǽð� �ִ� �� : ��׽ý� : �ü� ������ (100000201)

	���ǽ� ���� : �ü� ������


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
        cm.sendOk("�ü��� �ǰ� ��������?");
        cm.dispose();
        return;
    }
}
