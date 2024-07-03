


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	아룽 에 의해 만들어 졌습니다.

	엔피시아이디 : 1512003

	엔피시 이름 : 아기 말라뮤트

	엔피시가 있는 맵 : 리에나 해협 : 마녀 바바라의 집 (141040000)

	엔피시 설명 : MISSINGNO


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
        var str = "#b#h0##k님 안녕하세요 오로라 레드 무기 상점입니다.\r\n구매를 원하시는 레드 무기를 선택해주세여.\r\n";
        str += "#r소지중인 홍보 코인 갯수 : "+cm.Comma(cm.itemQuantity(4310129))+"개#k\r\n\r\n";
        str += "#L0##b#i1402214#(#z1402214#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L1##b#i1422156#(#z1422156#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L2##b#i1472230#(#z1472230#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L3##b#i1332242#(#z1332242#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L4##b#i1342087#(#z1342087#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L5##b#i1382226#(#z1382226#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L6##b#i1492194#(#z1492194#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L7##b#i1462208#(#z1462208#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L8##b#i1452220#(#z1452220#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L9##b#i1532112#(#z1532112#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L10##b#i1432182#(#z1432182#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";
        str += "#L11##b#i1482183#(#z1482183#)#k (#r"+cm.Comma(cm.itemQuantity(4310129))+" / 50개)\r\n";

        cm.sendSimple(str);
    } else if (status == 1) {
        if (selection >= 0) {
            cm.RadWeaponShopGain(selection);
            cm.dispose();
        }
    }
}
