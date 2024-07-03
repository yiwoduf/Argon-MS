var select = -1;
function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
	
	var text = "술래잡기 컨텐츠 입니다. 메뉴를 선택해주세요\r\n";
	text += "#L0#입장하겠습니다.\r\n";
	text += "#L1#술래잡기 설명을 듣겠습니다.\r\n";
	cm.sendSimple(text);

} else if (status == 1) {
	 sel = selection;
	   if(sel == 0) {
	if (getPlayerCount(109090300) < 7 ) {
		cm.warp((109090300);
		cm.dispose();return;
	} else {
		cm.sendOk("이미 7명이 되었습니다.");
		cm.dispose();return;
		}
		} 

	}
	
	
	}
}
}

