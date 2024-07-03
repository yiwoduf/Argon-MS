function start() {
    status = (cm.getMapId() % 1000 == 0 || cm.getMapId() % 1000 == 800) ? -1 : 0;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 1) {
	    cm.sendNext("그렇군요. 파티원들과 힘을 합쳐 조금만 더 열심히 해주세요.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
	    if (cm.getMapId() == 922010000) {
		cm.removeAll(4001022);
		cm.warp(910002000,0);
		cm.dispose();
	    } else {
		var chat = "도움이 필요하세요?#b\r\n";
		chat += "\r\n#L1#발판 인형이 필요해요.";
		chat += "\r\n#L0#이곳에서 나가고 싶어요.";
		cm.sendSimple(chat);
	    }
	} else if (status == 1) {
	    if (selection == 0) {
		cm.sendYesNo("나간 이후 다시 퀘스트에 도전할 경우에는 처음부터 다시 클리어 해야 합니다. 이 맵에서 나가고 싶으신가요?");
	    } else {
		cm.gainItem(4001454,1);
		cm.dispose();
	    }
	} else if (status == 2) {
	    cm.getEventInstance().unregisterPlayer(cm.getPlayer());
	    cm.warp(922010000,0);
	    cm.dispose();
	}
    }
}