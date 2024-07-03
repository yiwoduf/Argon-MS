var status = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {

	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	}
	if (status == 0) {
		if(cm.getMonsterCount(cm.getPlayer().getMapId()) == 0) {
			cm.warp(271041100);
                        cm.dispose();
			return;
		} else {
			cm.getPlayer().dropMessage(6, "몬스터를 모두 처치해야 시그너스의 정원으로 이동하실 수 있습니다.")
                        cm.dispose();
		}

	}
}
