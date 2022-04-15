var status = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action (mode, type, selection) {
	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	}
	if (status == 0) {
		var chat = "#e에리아월드 #b#h ##k \r\n#r#후후원포인트 구매문의\r\n#b#네카페공지 후원문의참고 \r\n#b현재 보유중인 후원포인트 : #k" + cm.getRC() + "#n\r\n";
		chat += "#L0##b원하는장비 올스텟 2당 후원포인트 100 #k\r\n";
		chat += "#L1##b원하는장비 공/마 1당 후원포인트 100 #k";
		cm.sendSimple(chat);
	} else if (status == 1) {
		sel = selection;
		if (sel == 0) {
            		var chat = "올스텟 강화를 할 아이템을 선택해 주세요.\r\n\r\n";
			chat += cm.getDonateList();
            		cm.sendSimple(chat);
		} else if (sel == 1) {
			var chat = "공/마 강화를 할 아이템을 선택해 주세요.\r\n\r\n";
			chat += cm.getDonateList();
            		cm.sendSimple(chat);
		}
	} else if (status == 2) {
		itemId = selection;
		if (sel == 0) {
			cm.sendGetNumber("원하시는 올스텟 수치를 입력해주세요\r\n#r올스텟 2 당 후원포인트 100#k\r\n", 0, 0, 32000);
		} else if (sel == 1) {
			cm.sendGetNumber("원하시는 공/마 수치를 입력해주세요\r\n#r공/마 1 당 후원포인트 100#k\r\n", 0, 0, 32000);
		}
	} else if (status == 3) {
		if (sel == 0) {
			allstat = selection;
			price = (allstat * 50);
			if (cm.getRC() >= price) {
				cm.loseRC(price);
				cm.setDonateStat(itemId, allstat);
				cm.dispose();
			} else {
				cm.sendOk("후원포인트가 모자랍니다.");
				cm.dispose();
			}
		} else if (sel == 1) {
			damage = selection;
			price = (damage * 100);
			if (cm.getRC() >= price) {
				cm.loseRC(price);
				cm.setDonateWatk(itemId, damage);
				cm.dispose();
			} else {
				cm.sendOk("후원포인트가 모자랍니다.");
				cm.dispose();
			}
		}
	}
}