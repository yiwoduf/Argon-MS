
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
	var chat = "#d#e #b#h0##k! �������ʿ��մϴ�.\r\n#e#b[���� �ع� �����������Ű��� ȯ���մϴ�.]";
	chat += "\r\n#r#L2# ���� �ع��ϱ⡽#l #b#L3#������ī�� ������#l  ";
	chat += "\r\n#g#L4##i4033825# �������ǰ��� ������#r#L5##i4033248# ���������λ�����#k#l"; 
        chat += "\r\n#d#L6# ��ȭ�� �׸� �Ѵ�.\r\n";
        chat += "\r\n";

	cm.sendSpirit(chat,true,0);
    } else if (status == 1) {
	if (selection == 6) {
		cm.dispose();
	} else if (selection == 2) {
		cm.dispose();
		cm.openNpc(2159380);
	} else if (selection == 3) {
		cm.dispose();
		cm.openNpc(9075002);
	} else if (selection == 4) {
                cm.dispose();
		cm.openNpc(2020006);
	} else if (selection == 5) {
                cm.dispose();
		cm.openShop(9300007);
	} else if (selection == 6) {
		cm.dispose();
	}
    } else if (status == 2) {
	cm.dispose();
	cm.openShop(selection);
    }
}
