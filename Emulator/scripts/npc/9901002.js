


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	우사밍 에 의해 만들어 졌습니다.

	엔피시아이디 : 9901002

	엔피시 이름 : MISSINGNO

	엔피시가 있는 맵 :  : 매직타운 (100050001)

	엔피시 설명 : MISSINGNO


*/

var status = -1;

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
	var chat = "안녕하세요 " + cm.getPlayer().getName() + "님 전 매직타운에서 유저분들에게 몬스터 드롭정보를 알려드리는 쥰쨩이라고 합니다.";
	chat += "\r\n#L0##b#e몬스터 드롭정보를 알아본다.#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	if (selection == 0) {
		cm.sendGetText("검색하실 아이템의 이름의 일부나 전부를 입력해 주세요");
	}
    } else if (status == 2) {
	if (cm.getText() == "" || cm.getText() == " ") {
		cm.sendOk("올바른 검색어를 입력해 주세요");
		cm.dispose();
		return;
	}
	var text = cm.getSearchItem(cm.getText());
	if (text == "검색하신 아이템은 존재하지 않습니다. 다시 한번 확인해 주시기 바랍니다.") {
		cm.sendOk("검색하신 아이템은 존재하지 않습니다. 다시 한번 확인해 주시기 바랍니다.");
		cm.dispose();
		return;
	}
	cm.sendSimple("입력하신 검색어의 결과 입니다.#b" + text);
    } else if (status == 3) {
	var text = cm.MonsterDrop(selection);
	cm.sendOk((text == "선택한 아이템을 드롭하는 몬스터는 존재하지 않습니다." ? "" : "선택하신 아이템을 드롭하는 몬스터 입니다.\r\n#b") + text);
	cm.dispose();
    }
}
