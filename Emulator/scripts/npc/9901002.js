


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	���� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9901002

	���ǽ� �̸� : MISSINGNO

	���ǽð� �ִ� �� :  : ����Ÿ�� (100050001)

	���ǽ� ���� : MISSINGNO


*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }

    if (status == 0) {
	var chat = "�ȳ��ϼ��� " + cm.getPlayer().getName() + "�� �� ����Ÿ��� �����е鿡�� ���� ��������� �˷��帮�� ��»�̶�� �մϴ�.";
	chat += "\r\n#L0##b#e���� ��������� �˾ƺ���.#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	if (selection == 0) {
		cm.sendGetText("�˻��Ͻ� �������� �̸��� �Ϻγ� ���θ� �Է��� �ּ���");
	}
    } else if (status == 2) {
	if (cm.getText() == "" || cm.getText() == " ") {
		cm.sendOk("�ùٸ� �˻�� �Է��� �ּ���");
		cm.dispose();
		return;
	}
	var text = cm.getSearchItem(cm.getText());
	if (text == "�˻��Ͻ� �������� �������� �ʽ��ϴ�. �ٽ� �ѹ� Ȯ���� �ֽñ� �ٶ��ϴ�.") {
		cm.sendOk("�˻��Ͻ� �������� �������� �ʽ��ϴ�. �ٽ� �ѹ� Ȯ���� �ֽñ� �ٶ��ϴ�.");
		cm.dispose();
		return;
	}
	cm.sendSimple("�Է��Ͻ� �˻����� ��� �Դϴ�.#b" + text);
    } else if (status == 3) {
	var text = cm.MonsterDrop(selection);
	cm.sendOk((text == "������ �������� ����ϴ� ���ʹ� �������� �ʽ��ϴ�." ? "" : "�����Ͻ� �������� ����ϴ� ���� �Դϴ�.\r\n#b") + text);
	cm.dispose();
    }
}
