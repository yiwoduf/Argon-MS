


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	�Ʒ� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 1512001

	���ǽ� �̸� : �Ʊ� ���

	���ǽð� �ִ� �� : ������ ���� : ���� �ٹٶ��� �� (141040000)

	���ǽ� ���� : MISSINGNO


*/

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
        cm.sendOk("var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && (status == 0 || status == 1)) {
	    cm.sendOk("#fn����##e#r�̷� ��ģ������ ���ҰŸ� ������");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
	    cm.sendYesNo("#fn����##e#r�׿�#k#n#b ���� ���� ��� ģ�� ��� �ø��� ������  \r\n\r\n�� ��ư Ŭ�� �ض�.#k");
	} else if (status == 1) {
	    cm.sendYesNo("#fn����##k#n#b���� ��ģ��� #e#r3000000#k#n#b ���� ������ \r\n\r\n�� ��ư Ŭ�� �ض�.#k");
	} else if (status == 2) {
	    if (cm.getMeso() >= 2500000 && cm.getBuddyCapacity() < 100) {
		cm.gainMeso(-2500000);
           cm.teachSkill(20011004,1,1);
		cm.updateBuddyCapacity(cm.getBuddyCapacity() + 5);
		cm.sendNext("#fn����##r����,#k#n#b ���� ?���Ѱ� ģ���� ��������?");
	    } else {
		cm.sendNext("#fn����##e#r�������Ǥ�");
	    }
	    cm.dispose();
	}
    }
}");
        cm.dispose();
        return;
    }
}
