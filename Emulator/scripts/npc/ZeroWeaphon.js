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
	var chat = "오늘도 좋은 하루야~#r\r\n";
	chat += "#L0#무기를 다시 받는다.#l\r\n";
	chat += "#L1#대화를 그만한다.#l";
	cm.sendSimple_Zero(chat);
    } else if (status == 1) {
	if (selection == 0) {
		cm.sendYesNo_Zero("무기를 다시 받게되면 기존에 장착되있던 무기는 사라지게 될텐데 정말로 무기를 다시 받겠어?");
	} else if (selection == 1) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.sendOk_Zero("매시브 섀도우와 샤프니스 섀도우를 장착 했으니 이벤토리를 확인 해보도록해");
	cm.rebuyZeroEquip();
	cm.dispose();
    }
}