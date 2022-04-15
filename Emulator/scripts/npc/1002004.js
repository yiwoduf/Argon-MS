importPackage(Packages.server.named);

var status = 0;
var sel = -1;
var mesos = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}
function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
	var chat = cm.getPlayer().getName() + "님 반갑습니다. 네임드 홀,짝 딜러인 가위,바위,보 운영자라고 합니다.\r\n";
	chat += "#b#e네임드 홀,짝 " + Named.nextTime + "회차 결과 까지 " + Named.namedTime + "#k#n\r\n";
	//if (cm.isNamedTimeOver()) {
	//	chat += "#L3##b네임드 홀,짝 배팅을 하고 싶습니다.(#r시간초과#b)#l\r\n";
	//} else {
		chat += "#L0##b네임드 홀,짝에 배팅을 하고 싶습니다.#l\r\n";
	//}
	chat += "#L2#네임드 홀,짝 배팅 보상을 받고 싶습니다.#l\r\n";
	chat += "#L1#네임드 홀,짝에 대해서 설명을 듣고 싶습니다.#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	sel = selection;
	if (selection == 0) {
		if (Named.isCheck(cm.getPlayer().getId(), Named.nextDate + "-" + Named.nextTime)) {
			cm.sendOk(cm.getPlayer().getName() + "님은 " + Named.nextTime + "회차에 이미 배팅을 하셨습니다.");
			cm.dispose();
			return;
		}
		if (Named.isCheck(cm.getPlayer().getId())) {
			cm.sendOk("기존 배팅 보상을 회수 하신후 이용해 주시길 바랍니다.");
			cm.dispose();
			return;
		}
		cm.sendSimple("어떤 배팅을 선택 하시겠습니까?\r\n#b#L0#메소를 배팅 하겠습니다.#l");
	} else if (selection == 1) {
		cm.sendOk("네임드사다리(홀,짝)결과를 사용하는 방식이며 메소와 기타아이템을 배팅 할 수 있습니다.\r\n\r\n#e#b<홀,짝 배당률>#n#k\r\n홀 / 짝 1.8배\r\n좌출 우출 4줄  3줄 / 1.6배\r\n좌3 우3 좌4 우4 /2.5\r\n\r\n#e#r<네임드 사다리 용어>#n#k\r\n좌출 / 왼쪽에서 출발\r\n우출 / 오른쪽에서 출발\r\n3줄 / 사다리 세줄\r\n4줄 / 사다리 네줄\r\n좌3 / 왼쪽에서 출발해서 사다리 세줄\r\n우3 / 오른쪽에서 출발해서 사다리 세줄\r\n좌4 / 왼쪽에서 출발해서 사다리 네줄\r\n우4 / 오른쪽에서 출발해서 사다리 네줄\r\n\r\n적중률 100%! 배팅률 100%!를 기원합니다!!\r\n#r홀,짝 결과는 http://named.com에서도 확인 가능합니다.");
		cm.dispose();
	} else if (selection == 2) {
		cm.sendYesNo("아직 결과가 나오지 않았을 경우 배팅기록이 제거 됩니다. \r\n#e#rex)1회차에 배팅 한 후 1회차가 끝나지 않았을때 보상을 받을려고 할때#n#k 정말로 보상을 받으시겠습니까?");
	} else if (selection ==3 ){
		cm.dispose();
		return;
	}
    } else if (status == 2) {
	if (sel == 2) {
		if (!Named.isCheck(cm.getPlayer().getId())) {
			cm.sendOk("죄송하지만 받을 수 있는 보상이 없습니다.");
			cm.dispose();
			return;
		} else {
			cm.sendSimple("보상을 받으실 배팅을 선택해 주세요.\r\n#b" + Named.getText(cm.getPlayer().getId()));
		}
	} else if (sel == 0 ) {
		cm.sendGetNumber("배팅하실 메소를 입력해 주세요",1,1,cm.getMeso() > 200000000 ? 200000000 : cm.getMeso());
	}
    } else if (status == 3) {
	if (sel == 2) {
		if (Named.giveItemorMeso(selection,cm.getPlayer())) {
			cm.sendOk("배팅 보상은 잘 받으셨나요? 다음에도 또 이용해주시면 감사 하겠습니다.");
			cm.dispose();
			return;
		} else {
			cm.sendOk("인벤토리에 빈 공간을 확보 한 후 다시 시도해 주시길 바랍니다.");
			cm.dispose();	
			return;
		}
	} else if (sel == 0) {
		mesos = selection;
		cm.sendYesNo("정말로 " + cm.Comma(mesos) + "메소를 배팅 하시겠습니까?");
	}
    } else if (status == 4) {
	if (mesos > 30000000) {
		cm.sendOk("최대 배팅 금액은 3천만 메소 입니다.");
		cm.dispose();
		return;
	}
	cm.sendSimple("배팅하실 쪽을 선택 하세요.\r\n#b#L0#홀 #r(1.8배)#b#l\r\n#L1#짝 #r(1.8배)#b#l\r\n#L2#좌출 #r(1.6배)#b#l\r\n#L3#우출 #r(1.6배)#b#l\r\n#L4#3줄 #r(1.6배)#b#l\r\n#L5#4줄 #r(1.6배)#b#l\r\n#L6#좌3 #r(2.5배)#b#l\r\n#L7#우3 #r(2.5배)#b#l\r\n#L8#좌4 #r(2.5배)#b#l\r\n#L9#우4 #r(2.5배)#b#l");
    } else if (status == 5) {
	cm.installNamed(mesos,selection);
    }
}
