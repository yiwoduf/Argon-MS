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
	var chat = "���õ� ���� �Ϸ��~#r\r\n";
	chat += "#L0#���⸦ �ٽ� �޴´�.#l\r\n";
	chat += "#L1#��ȭ�� �׸��Ѵ�.#l";
	cm.sendSimple_Zero(chat);
    } else if (status == 1) {
	if (selection == 0) {
		cm.sendYesNo_Zero("���⸦ �ٽ� �ްԵǸ� ������ �������ִ� ����� ������� ���ٵ� ������ ���⸦ �ٽ� �ްھ�?");
	} else if (selection == 1) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.sendOk_Zero("�Žú� ������� �����Ͻ� �����츦 ���� ������ �̺��丮�� Ȯ�� �غ�������");
	cm.rebuyZeroEquip();
	cm.dispose();
    }
}