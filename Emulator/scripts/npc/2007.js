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
        var str = "환생상점입니다 원하시는 아이템을 선택해주세요\r\n";
        str += "              #fn나눔고딕 Extrabold##fs13#현재 #b#h0##k님의 환생포인트 : #r"+cm.Comma(cm.getPlayer().getGP())+"원#n#k\r\n"
     //   str += "#L1##b#i5050100#(#z5050100#)#k - #r환생포인트 1000포인트#k\r\n";
        str += "#L2##b#i4033247#(#z4033247#)#k - #r환생포인트 1000포인트#k\r\n";
     //   str += "#L3##b#i4001716#(#z4001716#)#k - #r환생포인트 3000포인트#k\r\n";
        str += "#L4##b#i2048718#(#z2048718#)#k - #r환생포인트 3000포인트#k\r\n";
       // str += "#L5##b#i4001254#(#z4001254#)#k - #r환생포인트 5000포인트#k\r\n";
        str += "#L6##b#i3015246#(#z3015246#)#k - #r환생포인트 7000포인트#k\r\n";
        str += "#L7##b#i2590007#(#z2590007#)#k - #r환생포인트 10000포인트#k\r\n";
        str += "#L8##b#i1112141#(#z1112141#)#k - #r환생포인트 15000포인트#k\r\n";
        str += "#L9##b#i1112585#(#z1112585#)#k - #r환생포인트 30000포인트#k\r\n";
        cm.sendSimple(str);
    } else if (selection >= 0) {
        cm.gainRebornShop(selection);
        cm.dispose();
    }
}