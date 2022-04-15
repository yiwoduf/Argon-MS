/*
	곰고(leehodud302@naver.com)님의  스크립트 파일입니다.
*/
var status = -1;
 var itemlist = new Array();
function start() {
    status = -1;
    action(1, 0, 0);
}

//function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        status--;
        cm.dispose();
    }
    if (status == 0) {
        if (mode == 0)
            cm.dispose();
        else
            cm.sendGetText("#r#e[무료캐시검색]#n#k \r\n\r\n캐시아이템 두글자 이상 입력해주세요.");
    } else if (status == 1) {
        var itemid = cm.getText();
        cm.SearchItem(itemid);
    } else if (status == 2) {
        for (var i = 0; i < itemlist.length; i++) {
            if (selection == itemlist[i]) {
                cm.sendOk("이아이템은 후원및 홍보로 구매가가능합니다.");
                cm.dispose();
                return;
            }
        }
        cm.sendOk("#i" + selection + "# #fs14##e#b#t" + selection + "##n#k#fs12#을(를) 획득하셨습니다.");
        cm.gainItem(selection, 1);
        cm.dispose();
    }
}