/*
	곰고(leehodud302@naver.com)님의  스크립트 파일입니다.
*/
var status = -1;

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == 1) {
		status++;
	} else {
		status--;
		cm.dispose();
	}
	if (status == 0) {
		if(mode == 0)
			cm.dispose();
		else
		cm.sendGetText("#r#e[코인캐시검색]#n#k\r\n#r#e[올스탯 400 공/마 40]#n#k #i4310038# 100개로 구매가능합니다.\r\n캐시아이템 두글자 이상 입력해주세요.");
	} else if (status == 1) {
		var itemid = cm.getText();
		cm.SearchItem(itemid);
	} else if (status == 2) {
                if (cm.haveItem(4310038, 100)) {
                cm.gainItem(4310038, -100);
		cm.sendOk("#i"+selection+"# #fs14##e#b#t"+selection+"##n#k#fs12#을(를) 획득하셨습니다.");
		cm.gainSponserItem(selection,'[홍보검색]',400,40,0);
		cm.dispose();
                } else {
                cm.sendOk("에플코인이 부족합니다.");
                cm.dispose();
               }
	}
}