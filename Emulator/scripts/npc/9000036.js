var status = -1;

function start() {
	action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1 && type != 1) {
        status++;
    } else {
        if (type == 1 && mode == 1) {
            status++;
            selection = 1;
        } else if (type == 1 && mode == 0) {
            status++;
            selection = 0;
        } else {
            cm.dispose();
            return;
        }
    }
    if (status == 0) {
        var chat = "#fn������� Extrabold##fs13# ����� ������ �����÷����� �˷����� �����ðڽ��ϱ�?";
	chat += "\r\n#b#L0#���� ���ͱⰡ �������� �ñ��մϴ�.#l";
	chat += "\r\n#L1#���� ���ͱ⸦ ������Ʈ �ϰڽ��ϴ�.#l";
	chat += "\r\n#L2#���� ���ͱ� ��ŷ�� Ȯ���ϰ� �ͽ��ϴ�.#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	if (selection == 0) {
		cm.sendOk("#fn������� Extrabold##fs13# ���� ���ͱ�� ü���� �������� ��Ȳ ������ 3�е��� ��� ȭ���� ��ƺξ� ������ ������������ �����ϴ� �ý����Դϴ�. ���� ���ͱ��� ���� �������� ��ŷ���� ������ ���� ��ŷ 1�����Դ� �������� ������ ���޵˴ϴ�.");
		cm.dispose();
	} else if (selection == 1) {
		if (cm.getPlayerCount(120000102) > 0) {
			cm.sendOk("�̹� �ٸ� ������ ���� ���ͱ⸦ ������Ʈ �ϰ� �ֽ��ϴ�.");
			cm.dispose();
			return;
		}
		cm.startDamageMeter();
		cm.sendOk("#fn������� Extrabold##fs13# ���� �ð� ���� ���� ����ų� ������ ���� �� �� ���� ���ͱⰡ ������Ʈ ���� �ʽ��ϴ�.");
		cm.dispose();
	} else if (selection == 2) {
		cm.sendOk(cm.DamageMeterRank());
		cm.dispose();
	}
    }
}