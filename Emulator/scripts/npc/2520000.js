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
		var jessica = "#fn������� Extrabold#�ϴ�.. � ���ʽÿ�..\r\n�״밡.. �̹� �ӹ��� �þ��ֽǺ��̱���..\r\n�ϴ���.. �װ� �߿�ġ �ʽ��ϴ�.\r\n#r���� ����#k �� �������� ���۵Ǿ����..\r\n";
		jessica += "#L0##b���� ���ฦ ���� �ٷ� �Ѿư��ϴ�.#k\r\n"
		jessica += "#L1##r������ �غ� ���� �ʾҽ��ϴ�.#k\r\n"
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
		cm.warp(303030100);
                cm.sendOk("#fn������� Extrabold#�ϴ�.. �츮��.. �ϴ��� ��.. #r��#k �� ���� �̵��� ��Ź�ϼ���..");
		cm.dispose();
} else if (selection == 1) {
                cm.sendOk("#fn������� Extrabold##r��� �غ� �Ǹ� �ٽ� ���ּ���..\r\n�ð��� �׸� ���� �ʽ��ϴ�..#k");
		cm.dispose();
}
}
}