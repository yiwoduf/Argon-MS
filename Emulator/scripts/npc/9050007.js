


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	Ǯ��� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9050007

	���ǽ� �̸� : ��ȯ�� �Ǳ׹�

	���ǽð� �ִ� �� : ���罺Ʈ��Ʈ : �������� ���� (109090204)

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
        cm.sendOk("ĳ��->��õ��-"SMī����"�������ֽø� �����ϰٽ��ϴ�. �����ʿ��ǽ� "�ߺ��Ѵ���" Ŭ���ؼ� ���������ϰ� �����ø�˴ϴ�.");
        cm.dispose();
        return;
    }
}
