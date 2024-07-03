/*


	엔피시아이디 : 

	엔피시 이름 : 

	엔피시가 있는 맵 :  :  ()

	엔피시 설명 : 핫타임 채널지급


*/
var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status--;
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        var text = ""
        text += "핫타임 기능\r\n#b"
        if (cm.getPlayer().getGMLevel() > 0) {
            text += "#L0##i5121040# 아이템 뿌리기#l\r\n"
        }
        cm.sendSimple(text);
    } else if (status == 1) {
        var text = ""
        text += "지급할 아이템 코드를 입력하세요.\r\n"
        cm.sendGetNumber(text, 0, 0, 9999999);
    } else if (status == 2) {
        var text = ""
        ItemId = selection;
        if (ItemId >= 1000000 && ItemId < 2000000) {
            text += "입력된 아이템\r\n\r\n"
            text += "#i" + ItemId + "# #b#t" + ItemId + "##k\r\n\r\n"
            text += "현재 채널의 유저들에게 지급하시겠습니까?"
            cm.sendYesNo(text);
        } else {
            text += "입력된 아이템\r\n\r\n"
            text += "#i" + ItemId + "# #b#z" + ItemId + "##k\r\n\r\n"
            text += "지급하실 개수를 입력해 주세요.\r\n"
            cm.sendGetNumber(text, 1, 1, 99);
        }
    } else if (status == 3) {
        var text = ""
        if (ItemId >= 1000000 && ItemId < 2000000) {
            var it = cm.getClient().getChannelServer().getPlayerStorage().getAllCharacters().values().iterator();
            while (it.hasNext()) {
                var chr = it.next();
                chr.gainItem(ItemId, 1, false, -1, "핫타임 지급");
                chr.message(5, "핫타임 아이템이 도착했습니다. 인벤토리를 확인해 주세요!");
            }
            cm.dispose();
            return;
        } else {
            ItemQuantity = selection;
            text += "입력된 아이템\r\n\r\n"
            text += "#i" + ItemId + "# #b#t" + ItemId + "##k "
            text += "(#b" + ItemQuantity + "#k개)\r\n\r\n"
            text += "현재 채널의 유저들에게 지급하시겠습니까?"
            cm.sendYesNo(text);
        }
    } else if (status == 4) {
        var it = cm.getClient().getChannelServer().getPlayerStorage().getAllCharacters().values().iterator();
        while (it.hasNext()) {
            var chr = it.next();
            chr.gainItem(ItemId, ItemQuantity, false, -1, "핫타임 지급");
            chr.message(5, "핫타임 왓띠 인벤확인");
        }
        cm.dispose();
    }
}