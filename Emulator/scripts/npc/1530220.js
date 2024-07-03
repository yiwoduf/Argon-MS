


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	우사밍 에 의해 만들어 졌습니다.

	엔피시아이디 : 1530220

	엔피시 이름 : 헬레나

	엔피시가 있는 맵 :  : 매직타운 (100050001)

	엔피시 설명 : 민중의 지팡이


*/

var status = -1;
var type = -1;
var text = "";
var sel = -1;
var name = "";

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
	if (cm.getPlayer().isGM()) {
		var chat = "안녕하세요 " + cm.getPlayer().getName() + "님 현재까지 들어온 문의 입니다.\r\n#b";
		chat += cm.listReport();
		cm.sendSimple(chat);
	} else {
		var chat = "매직타운의 불편한 사항은 언제나 문의 해 주시길 바랍니다.";
		chat += "\r\n#L0##b신고 및 문의 하기 #r(50,000메소)#l";
		chat += "\r\n#L1##b운영진 호출 하기 #r(70,000메소)#l";
		cm.sendSimple(chat);
	}
    } else if (status == 1) {
	sel = selection;
	if (cm.getPlayer().isGM()) {
		cm.sendYesNo(cm.getReport(sel));
	} else {
		if (selection == 0)
			cm.sendSimple("매직타운의 불편한 사항은 언제나 문의 해 주시길 바랍니다.\r\n#L0##b플레이어 신고#l\r\n#L1#버그 리포트 및 문의#l");
		else if (selection == 1) 
			cm.sendYesNo("정말로 운영진 호출을 하시겠습니까? 운영진을 호출하기 위해선 #b70,000#k메소가 소모되며 10분에 한번 호출이 가능합니다.");
	}
    } else if (status == 2) {
	if (cm.getPlayer().isGM()) {
		cm.deleteReport(sel);
		cm.sendOk("선택하신 리포트를 삭제 하였습니다.");
		cm.dispose();
	} else {
		if (sel == 0) {
			sel = selection;
			if (selection == 0) {
				cm.sendGetText("신고할 플레이어를 입력해 주시길 바랍니다.");
			} else if (selection == 1) {
				cm.sendGetText(cm.getPlayer().getName() + "님의 불편 사항을 입력해 주시길 바랍니다.");
			}
		} else if (sel == 1) {
			sel = 3;
			cm.sendGetText("호출 사유를 입력해 주시길 바랍니다.");		
		}
	}
    } else if (status == 3) {
	if (sel != -1) {
		if (sel == 0) {
			name = cm.getText();
			cm.sendGetText("신고 사유를 입력해 주시길 바랍니다.");
		} else if (sel == 1) {
			text = cm.getText();
			cm.sendYesNo(cm.getPlayer().getName() + "님의 불편한 사항은 \r\n\r\n#e문의 내용 : #n" + cm.getText() + "\r\n\r\n위 내용이 맞는지 확인해 주시길 바랍니다.");
		} else if (sel == 3) {
			if (cm.getMeso() < 70000) {
				cm.sendOk("운영진 호출을 사용하기 위해선 70,000메소가 필요합니다.");
				cm.dispose();
				return;
			}
			cm.GMCall(cm.getPlayer().getName(),cm.getText());
			cm.gainMeso(-70000);
			cm.dispose();
		}
	} else {
		cm.dispose();
	}
    } else if (status == 4) {
	if (sel != -1) {
		if (sel == 0) {
			text = cm.getText();
			cm.sendYesNo("#e신고할 플레이어 : #n" + name + "\r\n#e신고 사유 : #n" + text + "\r\n\r\n위 내용이 맞는지 확인해 주시길 바랍니다.");
		} else if (sel == 1) {
			report(cm.getPlayer().getName(),text);
			cm.dispose();
		}
	}
    } else if (status == 5) {
	if (sel == 0) {
		report(name,text);
		cm.dispose();
	} else {
		cm.dispose();
	}
    }
}

function report(name1, text1) {
	if (cm.getMeso() < 50000) {
		cm.sendOk("신고 및 문의 하기를 사용하기 위해선 50,000메소가 필요합니다.");
		cm.dispose();
		return;
	}
	if (name == "") {
		cm.sendOk(cm.getPlayer().getName() + "님의 소중한 의견 감사드립니다. 검토후 빠른 시일내에 처리하도록 하겠습니다.");
		cm.gainMeso(-50000);
		cm.report(name1,text1,0);
	} else {
		cm.sendOk(cm.getPlayer().getName() + "님의 소중한 신고 감사드립니다. 검토후 빠른 시일내에 처리하도록 하겠습니다.");
		cm.report(name1,text1,1);
		cm.gainMeso(-50000);
	}
}