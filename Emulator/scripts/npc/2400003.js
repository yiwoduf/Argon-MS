function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection, selection2) {
    if (status >= 0 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
        var str = "#b#e#h 0#��#n#k �ȳ��ϼ��� �����÷����� ���� �ʱ�ȭ ���ǽ��Դϴ�.\r\n";
        str += "#b#e#L1#���� �й��ϱ� (1õ���޼�)#n#k#l\r\n";
        cm.sendSimple(str);
    } else if (status == 1) {
        if (cm.getPlayer().getMeso() >= 10000000) {
            cm.resetStats(4,4,4,4);
            cm.sendOk("���� �ʱ�ȭ�� ���� �Ͽ����ϴ�.");
            cm.gainMeso(-10000000);
        } else {
            cm.sendOk("�޼Ұ� �����Ͽ� ���� �ʱ�ȭ�� �Ͻ� �� �����ϴ�.");
            cm.dispose();
        }
    }
}