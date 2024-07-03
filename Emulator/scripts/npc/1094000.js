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
		cm.sendGetText("#fn나눔고딕 Extrabold#\r\n#d#h ##k 님 안녕하세요.\r\n\r\n#b검색#k #fs14##r1번#k#fs11# 을 통해 #b모든 캐시 아이템#k 을 구입 해보세요.\r\n#Cgray#(#Cgray# 아이템에 추가옵션 올스텟 + 200 가 증가합니다.#fs12#");
	} else if (status == 1) {
		var itemid = cm.getText();
		cm.SearchItem(itemid);
	} else if (status == 2) {
                if(cm.getRC() >= 5000){
		cm.sendOk("#fn나눔고딕 Extrabold##i"+selection+"# #fs14##e#b#t"+selection+"##n#k#fs12#을(를) 획득하셨습니다.");
		cm.gainSponserItem(selection ,1,0,200,0);
		cm.loseRC(5000);
		cm.dispose(); 
		}else{
		cm.sendOk("#fn나눔고딕 Extrabold#후원포인트가 부족합니다.");
		}
		}else{
		cm.dispose();

	}
}