


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Pure Online Development Source Script)

	���۷� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9330008

	���ǽ� �̸� : FAQ ����Ʈ npc 1

	���ǽð� �ִ� �� : �����÷ε� : ������ (2000100)

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
         cm.sendMixHair("123",2008);
    } else if (status == 1) {
         cm.sendOk("�� �� �����Ǿ����ϴ�.");
		 cm.gainItem(2432946,-1);
         cm.dispose();
		 	 
    }
}