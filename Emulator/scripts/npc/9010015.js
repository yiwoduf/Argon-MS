/*

��Ʈ�ǿ¶��� ���

*/

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
		var jessica = "#fn������� Extrabold##d���ũ����Ʈ#k �� �̿� �غ��ðھ��?\r\n";
		jessica += "#L0##b���ũ����Ʈ ����#k\r\n";
                jessica += "#L1##r���ũ����Ʈ �ռ�#k";
		cm.sendSimple(jessica);

	} else if (status == 1) {
	if (selection == 0) {
	cm.dispose();
        cm.openNpc(9000131);

	} else if (selection == 1) {
	cm.dispose();
        cm.openNpc(9000132);
}
}
}
}