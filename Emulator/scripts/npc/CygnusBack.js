var status = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
	}
	if (status == 0) {
		if(cm.getMonsterCount(cm.getPlayer().getMapId()) == 0) {
			cm.warp(271040100);
			cm.dispose();
			return;
		} else {
			cm.getPlayer().dropMessage(6, "���͸� ��� óġ�ؾ� �ñ׳ʽ��� �������� �̵��Ͻ� �� �ֽ��ϴ�.")
                        cm.dispose();
		}

	}
}
