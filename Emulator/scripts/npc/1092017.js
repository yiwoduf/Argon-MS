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
		var jessica = "#fn������� Extrabold##b������ �ý���#k �Դϴ�.\r\n���Ͻô� �׸��� ����ּ���.\r\n";
                jessica += "#L0##r������ ������#k\r\n";
                jessica += "#L1##b������ �̿�� �����ϱ�";
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