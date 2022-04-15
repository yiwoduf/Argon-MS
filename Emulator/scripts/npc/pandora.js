var status = -1;
var itemid_ = 0;

function start(itemid) {
    status = -1;
    itemid_ = itemid;
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
	cm.sendYesNo("판도라의 열쇠로 판도라의 상자를 열었습니다.\r\n판도라의 상자를 한 번 더 열어보시겠습니까?\r\n#e현재 Fever게이지:#r" + cm.getPlayer().getFever() + "%#k#n\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n#v" + itemid_ + "##z" + itemid_ + "# 1개");
    } else if (status == 1) {
        if (!cm.haveItem(4170049) || !cm.haveItem(5060028)) {
            cm.sendOk("판도라의 상자를 개봉하기 위해선 #b#z" + 5060028 + "##k와 " + "#b#z" + 4170049 + "##k가 필요합니다.");
            cm.dispose();
	    return;
        }
	cm.dispose();
	cm.sendPandora();
	return;
    }
}