
/*
	본 스크립트는 선히팩의 파일입니다.
	선히팩은 KMS 기준으로 만들어졌습니다.

	네이버 : 선우(seonwoo__@naver.com)

	엔피시 : 9000030
*/

var status = 0;

function start() {
	status = -1;
	action(1,0,0);
}


function action(mode , type , selection){
	if (mode == -1) {
		cm.dispose();
	} else {
	if (mode == 0 && (status == 0)) {
		cm.sendOk("안녕히 가세요.");
		cm.dispose();
	} 
	if (mode > 0)
	    status++;
	else
	    status--;
	if (status == 0) {
            cm.sendYesNo("#b안녕하세요?#e 스마트온라인#n # 핫타임#n을 보급중인 NPC 입니다.\r\n지금#e 스마트온라인#n은 #i4001715# #i4310119#이 아이템을\r\n배급 중입니다. \r\n#r\r\n#b아이템을 받으시겠습니까?\r\n#r※장비칸 1칸을 남겨두세요!")
        } else if (status == 1){
           if (cm.getPlayer().getKeyValue(cm.getNpc()+"_Pure") == null) {
            cm.gainItem(4310119, 3000); //
            cm.gainMeso(100000000);
            cm.gainItem(4001715, 1);
            cm.getPlayer().setKeyValue(cm.getNpc()+"_Pure", "1");
		        cm.sendOk("아이템을 받으셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("이미 받으셨습니다.");
		        cm.dispose();
			}
		}
	}
}
}