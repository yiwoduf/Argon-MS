var status = -1;

var npcs = new Array("놀장놀혼 상점","훈장상점","뱃지상점","반지상점","어깨장식","귀걸이","목걸이","안경");
var shops = new Array(13,5,8,7,9,10,11,12);

function start() {
	action(1,0,0);
}

function action(mode, type, selection) {
if (mode == 1) { 
    status++;
} else { 
    cm.dispose(); 
    return;
}
if (status == 0) {
        try { 
	var chat = "상점을 선택하세요.\r\n";
	for (var i = 0; i < npcs.length; i++) {
		chat += "#L"+i+"#"+npcs[i];
	}
	cm.sendSimple(chat);
        } catch (e) {
            cm.sendOk(e);
            cm.dispose();
        }
} else if (status == 1) {
	cm.openShop(shops[selection]);
	cm.dispose();
}
}	