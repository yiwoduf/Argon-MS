/*

제작자 : 타임 (time_amd@nate.com)

*/

 

var status = -1;
var time = "#fUI/UIToolTip/Item/Equip/Star/Star#"
function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    if (status == 0) {
        var str = "#b#h0##k님 안녕하세요 에이플러스 의자 상점입니다.\r\n구매를 원하시는 의자를 선택해주세여.\r\n";
        str += "#r소지중인 황금단풍잎 갯수 : "+cm.Comma(cm.itemQuantity(4033247))+"개#k\r\n\r\n";
        str += "#L0##b#i3015873#(#z3015873#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L1##b#i3015788#(#z3015788#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L2##b#i3015564#(#z3015564#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L3##b#i3016200#(#z3016200#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L4##b#i3015646#(#z3015646#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L5##b#i3015643#(#z3015643#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L6##b#i3015705#(#z3015705#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L7##b#i3015844#(#z3015844#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L8##b#i3015387#(#z3015387#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L9##b#i3015388#(#z3015388#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L10##b#i3015389#(#z3015389#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L11##b#i3015390#(#z3015390#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L12##b#i3015391#(#z3015391#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L13##b#i3015392#(#z3015392#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L14##b#i3017011#(#z3017011#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L15##b#i3017012#(#z3017012#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L16##b#i3017013#(#z3017013#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L17##b#i3017014#(#z3017014#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L18##b#i3017015#(#z3017015#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";
        str += "#L19##b#i3017016#(#z3017016#)#k (#r"+cm.Comma(cm.itemQuantity(4033247))+" / 1000개)\r\n";

        cm.sendSimple(str);
    } else if (status == 1) {
        if (selection >= 0) {
            cm.gainInsItem(selection);
            cm.dispose();
        }
    }
}
