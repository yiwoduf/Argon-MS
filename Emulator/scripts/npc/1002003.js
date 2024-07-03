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
        var str = "보스상점입니다 원하시는 아이템을 선택해주세요\r\n";
        str += "              #fn나눔고딕 Extrabold##fs13#현재 #b#h0##k님의 소지 중인 코인 갯수 : #r"+cm.itemQuantity(4310038)+"개#n#k\r\n"
        str += "#L0##b#i4001780#(#z4001780#)#k - #r코인 50개 #k\r\n";
        str += "#L1##b#i2049360#(#z2049360#)#k - #r코인 100개 #k\r\n";
        str += "#L2##b#i2450087#(#z2450087#)#k - #r코인 150개 #k\r\n";
        str += "#L3##b#i1122076#(#z1122076#)#k - #r코인 200개 #k\r\n";
        cm.sendSimple(str);
    } else if (selection >= 0) {
        cm.gainCoinShop(selection);
        cm.dispose();
    }
}