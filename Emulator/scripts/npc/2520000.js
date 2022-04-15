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
		var jessica = "#fn나눔고딕 Extrabold#일단.. 어서 오십시요..\r\n그대가.. 이번 임무를 맡아주실분이군요..\r\n일단은.. 그건 중요치 않습니다.\r\n#r검은 마녀#k 의 움직임이 시작되었어요..\r\n";
		jessica += "#L0##b검은 마녀를 지금 바로 쫓아갑니다.#k\r\n"
		jessica += "#L1##r아직은 준비가 되지 않았습니다.#k\r\n"
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
		cm.warp(303030100);
                cm.sendOk("#fn나눔고딕 Extrabold#일단.. 우리의.. 하늘의 신.. #r학#k 님 에게 이동을 부탁하세요..");
		cm.dispose();
} else if (selection == 1) {
                cm.sendOk("#fn나눔고딕 Extrabold##r모든 준비가 되면 다시 와주세요..\r\n시간은 그리 많지 않습니다..#k");
		cm.dispose();
}
}
}