var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
		var jessica = "#fn나눔고딕 Extrabold##b돌림판 시스템#k 입니다.\r\n원하시는 항목을 골라주세요.\r\n";
                jessica += "#L0##r돌림판 돌리기#k\r\n";
                jessica += "#L1##b돌림판 이용권 구입하기";
		cm.sendSimple(jessica);

	} else if (status == 1) {
        if (selection == 0) {
		cm.dispose();
		cm.openNpc(9000155);
	} else if (selection == 1) {
		cm.dispose();
		cm.openNpc(9000156);

}
}
}
}