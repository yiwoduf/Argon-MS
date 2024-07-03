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
		cm.sendGetText("#r#e[올스탯 400 공/마 40]#n#k #i4310088# 10개로 구매가능합니다.\r\n캐시아이템 두글자 이상 입력해주세요.");
	} else if (status == 1) {
		var itemid = cm.getText();
		cm.SearchItem(itemid);
	} else if (status == 2) {
                if (cm.haveItem(4310088, 10)) {
                cm.gainItem(4310088, -10);
		cm.sendOk("#i"+selection+"# #fs14##e#b#t"+selection+"##n#k#fs12#을(를) 획득하셨습니다.");
		cm.gainSponserItem(selection ,1,400,40,40);
		cm.dispose();
                } else {
                cm.sendOk("#fn나눔고딕 Extrabold##fs13#물건구매하기 위해서 #i4310088# 10개가 필요합니다.");
                cm.dispose();
               }
	}
}