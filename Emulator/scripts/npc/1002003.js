var status = -1;

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
        var str = "���������Դϴ� ���Ͻô� �������� �������ּ���\r\n";
        str += "              #fn������� Extrabold##fs13#���� #b#h0##k���� ���� ���� ���� ���� : #r"+cm.itemQuantity(4310038)+"��#n#k\r\n"
        str += "#L0##b#i4001780#(#z4001780#)#k - #r���� 50�� #k\r\n";
        str += "#L1##b#i2049360#(#z2049360#)#k - #r���� 100�� #k\r\n";
        str += "#L2##b#i2450087#(#z2450087#)#k - #r���� 150�� #k\r\n";
        str += "#L3##b#i1122076#(#z1122076#)#k - #r���� 200�� #k\r\n";
        cm.sendSimple(str);
    } else if (selection >= 0) {
        cm.gainCoinShop(selection);
        cm.dispose();
    }
}