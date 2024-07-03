


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* 퓨어온라인 소스

	엔피시아이디 : 9010038

	엔피시 이름 : 루시아

	엔피시가 있는 맵 : 헤네시스

	엔피시 설명 : 보상엔피시


*/
var status = 0;
var select=0;
function start() {


    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            if (cm.getPlayer().getRewardDB().size() == 0) {
		cm.sendOk("보상받을 아이템이 없거나 동네 아가씨를 안 찾아가신 것 같네요.");
		cm.dispose();
		return;
	    }
		cm.sendSimple("받을 아이템을 선택해 주세요.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0##k#n\r\n#b"+cm.getPlayer().printRewardsSaves());
        } else if (status == 1) {
		select = selection;
		cm.sendYesNo("정말 다음 아이템을 받으시겠습니까?\r\n\r\n#b#i"+cm.getPlayer().getRewardsSavedItem(select)[0]+"# #z"+cm.getPlayer().getRewardsSavedItem(select)[0]+"# "+cm.getPlayer().getRewardsSavedItem(select)[1]+" 개");
	} else if (status == 2) {
		if(cm.canHold(cm.getPlayer().getRewardsSavedItem(select)[0])) {
			cm.gainItem(cm.getPlayer().getRewardsSavedItem(select)[0],cm.getPlayer().getRewardsSavedItem(select)[1]);
			cm.sendOk("아이템이 정상적으로 지급되었습니다.");
			cm.dispose();
			cm.getPlayer().removeRewardsDB(cm.getPlayer().getRewardsSavedItem(select)[0],cm.getPlayer().getRewardsSavedItem(select)[1],cm.getPlayer().getId());
		} else {
			cm.sendOk("죄송합니다. 받으실 인벤토리 공간을 확인하신 후 다시 시도해 주세요.");
			cm.dispose();
		}
	}
    }
}

