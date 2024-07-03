var status = -1;
var sel = 0;
var scroll = Array(2046025, 2046026, 2046119, 2046120, 2046251, 2046340, 2046341);
var canbuyitem = [[2431870, 500000]];
var scroll_sel1 = 0;
var scroll_sel2 = 0;
var scroll_check = false;
var po = 0;
var allstats = 0;
var sefq = 0;

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
    	var chat = "#e#r안녕하세요 벅샷 3단계 엔피시  입니다 !";
	//chat += "\r\n#e#b2만원 이상 후원 시 특수닉네임 추가 지급#n#k";
	chat += "\r\n#e#d[이것은 타격이 10배로 증가하고 10퍼센트 데미지가 감소됩니다. 30만후원포인트입니다.]#n#k\r\n";
	chat += "　◆ #b#h #님의 보유 후원포인트 : #e#r"+cm.getRC()+"#n#k\r\n";
	//chat += "#L0##b아이템에 올스텟을 부여 하겠습니다.#l\r\n";
	chat += "#L1##b후원포인트로 아이템을 구매하겠습니다.#l#k";
	cm.sendSimple(chat);
    } else if (status == 1) {
	sefq = selection;
	if (selection == 0) {
	var chat = cm.getDonateList();
	if (chat == "옵션을 부여 할 수 있는 아이템이 존재하지 않습니다.") {
		cm.sendOk(chat);
		cm.dispose();
		return;
	}
	cm.sendSimple("옵션을 부여 할 아이템을 선택해 주세요.\r\n" + chat);
	} else if (selection == 1) {
		var chatt = "어떤 아이템을 구매하시겠습니까?\r\n";
		for (var dkq = 0; dkq < canbuyitem.length; dkq++) {
			chatt += "\r\n#L" + dkq + "##b#i" + canbuyitem[dkq][0] + "# #z" + canbuyitem[dkq][0] + "# (" + canbuyitem[dkq][1] + " 포인트)#l";
		}
		cm.sendSimple(chatt);
	}
    } else if (status == 2) {
	po = selection;
	if (sefq == 0) {
	var allstat = parseInt(((cm.getRC()) / 10) > 32767 ? 32767 : ((cm.getRC()) / 10));
	cm.sendGetNumber("부여할 올스탯을 입력해 주십시오\r\n(후원포인트가 아닌 올스텟을 입력해야 합니다.)\r\n#Cgray##e[#n#r올스텟 10 : 후원포인트 100#e#Cgray#]#n#b\r\n" + cm.getPlayer().getName() + "님은 최대 올스텟 " + allstat + "(을)를 부여 할 수 있습니다.#k",0,0,allstat);
	} else if (sefq == 1) {
	  cm.sendYesNo("정말로 #b" + canbuyitem[po][1] + "포인트#k를 사용하여\r\n#b#i" + canbuyitem[po][0] + "# #z" + canbuyitem[po][0] + "##k을 구매하시겠습니까?");
	}
    } else if (status == 3) {
	if (sefq == 0) {
	sel = selection;
	cm.sendYesNo("정말로 후원포인트를 사용 하시겠습니까?");
	} else if (sefq == 1) {
		if (cm.getRC() >= canbuyitem[po][1]) {
			if (cm.canHold(canbuyitem[po][0])) {
				cm.sendOk("구매가 완료되었습니다.");
				cm.gainItem(canbuyitem[po][0], 1);			
				cm.gainRC(-(canbuyitem[po][1]));
				cm.dispose();
				return;
			} else {
				cm.sendOk("선택하신 아이템을 구매하기에는 인벤토리에 빈 공간이 부족 합니다.");
				cm.dispose();
				return;
			}
		} else {
			cm.sendOk("후원포인트가 부족하여 구매하실수 없습니다.");
			cm.dispose();
			return;
		}
	}
    } else if (status == 4) {
	if ((sel * 10) >= 50000) {
		if ((sel * 10) >= 50000) {
			var chat = "50000 후원포인트 이상 구매 고객에게는 #b8樂주문서 2장#k이 지급됩니다. 첫번째 주문서를 서택해 주세요.\r\n#b";
			for (var i = 0; i < scroll.length; i ++) {
				chat += "#L" + i + "# #i" + scroll[i] + "# #z" + scroll[i] + "##l\r\n";
			}
			cm.sendSimple(chat);
			scroll_check = true;
		}
	} else {
		cm.gainRC(-(sel * 10));
		cm.setDonateStat(po,sel);
		cm.dispose();
	}
    } else if (status == 5) {
	scroll_sel1 = selection;
	var chat = "50000 후원포인트 이상 구매 고객에게는 #b8樂주문서 2장#k이 지급됩니다. 두번째 주문서를 서택해 주세요.\r\n#b";
	for (var i = 0; i < scroll.length; i ++) {
		chat += "#L" + i + "# #i" + scroll[i] + "# #z" + scroll[i] + "##l\r\n";
	}
	cm.sendSimple(chat);
	scroll_check = false;
    } else if (status == 6) {
	scroll_sel2 = selection;
	if (cm.canHold(scroll[scroll_sel1]) && cm.canHold(scroll[scroll_sel2])) {			
		cm.gainRC(-(sel * 10));
		cm.gainItem(scroll[scroll_sel1], 1);
		cm.gainItem(scroll[scroll_sel2], 1);
		cm.setDonateStat(po,sel);
		cm.dispose();
	} else {
		cm.sendOk("선택하신 아이템을 구매하기에는 인벤토리에 빈 공간이 부족 합니다.");
		cm.dispose();
		return;
	}
    }
}
