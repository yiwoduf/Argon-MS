


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	kaiser �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1540795

	���ǽ� �̸� : ����

	���ǽð� �ִ� �� :  :  (350140100)

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
        cm.sendOk("Hello #d#e#h #!#n#k I hope you enjoy Argon Online! \r\n Discord#b#e :: chiussi@#0071");
        cm.dispose();
        return;
    }
}
