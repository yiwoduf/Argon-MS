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
    if (cm.getPlayer().getMapId() == 100030301) {
		var jessica = "#fn������� Extrabold#����! ����� �츮 ��ȭ���󿡼� #b����ǰ#k �� �����߰ŵ�?\r\n";
		jessica += "���Ҹ��İ�? #r���̾�Ʈ#k ���� ����! #bĮ�θ� �Ҹ� ������!!#k\r\n";
		jessica += "�̰� �ϳ��� �ΰ����� �� �̻� ���������� ���Ű����� NO!!\r\n";
		jessica += "�ٵ� �츮�� ���������� �ݴ��ϰɶ�!? ������ �����ϴϱ�!\r\n";
		jessica += "�׷��� ���ε�, �ʰ� #r����#k �� ���ٷ�? #b����#k �� �翬�� �־�!\r\n\r\n";
		jessica += "  #r*#k ���̾�Ʈ ���� ���\r\n";
		jessica += "    1. #r��#k ���� #r�̵�#k �Ѵ�.\r\n";
		jessica += "    2. ���� #r��#k �� #rŬ��#k �Ѵ�.\r\n";
		jessica += "    3. �迡�� #b���� ���#k �� #b������#k �� �Ѵ� �����Ѵ�.\r\n";
		jessica += "    4. �ʿ��� #r�Ϲ� ����#k �� �ϸ� ���̾�Ʈ�� #r����#k �ȴ�.\r\n\r\n";
		jessica += "    #r��#k #d�� �����ø��� Į�θ� �����Ⱑ 1 ���� �Ҹ�˴ϴ�.#k\r\n";
		jessica += "    #r��#k #dĮ�θ� �Ҹ� �����ϸ� ������ ������ ȹ���մϴ�.#k\r\n";
		jessica += "    #r��#k #d��, ��Ÿ â�� ������ ������ ȹ������ ���մϴ�.#k\r\n";
		jessica += "    #r��#k #d������ ��� �迡�� ���� ���������� ��ȯ �����մϴ�.#k\r\n";
		jessica += "#L0##r[���̾�Ʈ ����]#k #b���̾�Ʈ�� ������ �̵��ϱ�#k\r\n";
		cm.sendSimple(jessica);
        } else {
	cm.sendOk("#fn������� Extrabold##r* �÷��� ����#k\r\n\r\n#d- ����Ʈ�� ���� ���� �÷��� ����#k",9062004);
	cm.dispose();
    }
	} else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.warp(910142080);
}
}
}
}