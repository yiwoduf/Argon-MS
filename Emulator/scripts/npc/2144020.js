
var status = -1;var k = "#fNpc/9000000/stand/0#";
var k1 = "#fNpc/9000000/stand/0#";
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
	var chat = "�ȳ��ϼ��� #e#r�����÷���#n#k�� ���� ���� ȯ���մϴ�.\r\nó�� ���� �е鲲�� #e#b #i1142282# �����÷��� �����̽�#n#k�� �����ص帳�ϴ�.#r";
	chat += "\r\n#b#L3##i4161002# ���� �ϱ�#l #L4##i4161002# #e#r���� ����#n#k#l  #d#L5# ��ȭ�� �׸� �Ѵ�.#l";

	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.openNpc(2150007);

	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(3002106);

	} else if (selection == 4) {
		cm.dispose();
		cm.openNpc(3002100);

	} else if (selection == 5) {
		cm.dispose();
	}

    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
