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
        var str = "ȯ�������Դϴ� ���Ͻô� �������� �������ּ���\r\n";
        str += "              #fn������� Extrabold##fs13#���� #b#h0##k���� ȯ������Ʈ : #r"+cm.Comma(cm.getPlayer().getGP())+"��#n#k\r\n"
     //   str += "#L1##b#i5050100#(#z5050100#)#k - #rȯ������Ʈ 1000����Ʈ#k\r\n";
        str += "#L2##b#i4033247#(#z4033247#)#k - #rȯ������Ʈ 1000����Ʈ#k\r\n";
     //   str += "#L3##b#i4001716#(#z4001716#)#k - #rȯ������Ʈ 3000����Ʈ#k\r\n";
        str += "#L4##b#i2048718#(#z2048718#)#k - #rȯ������Ʈ 3000����Ʈ#k\r\n";
       // str += "#L5##b#i4001254#(#z4001254#)#k - #rȯ������Ʈ 5000����Ʈ#k\r\n";
        str += "#L6##b#i3015246#(#z3015246#)#k - #rȯ������Ʈ 7000����Ʈ#k\r\n";
        str += "#L7##b#i2590007#(#z2590007#)#k - #rȯ������Ʈ 10000����Ʈ#k\r\n";
        str += "#L8##b#i1112141#(#z1112141#)#k - #rȯ������Ʈ 15000����Ʈ#k\r\n";
        str += "#L9##b#i1112585#(#z1112585#)#k - #rȯ������Ʈ 30000����Ʈ#k\r\n";
        cm.sendSimple(str);
    } else if (selection >= 0) {
        cm.gainRebornShop(selection);
        cm.dispose();
    }
}