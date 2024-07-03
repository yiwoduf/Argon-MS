/*
	본 스크립트는 선히팩의 파일입니다.
	선히팩은 KMS 기준으로 만들어졌습니다.

	네이버 : 선우(seonwoo__@naver.com)
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
            cm.sendYesNo("#fn나눔고딕 Extrabold# 초반에 힘들어하실거같은 유저들을 위해\r\n 장비템과 메소를 제공해드리고있습니다. \r\n#e#r(옵션은 비밀♡)\r\n#r\r\n#b아이템을 받으시겠습니까??\r\n#r※주의 : 장비칸3칸, 소비칸1칸 남겨두세요 복구불가")
        } else if (status == 1){
           if (cm.getPlayer().getKeyValue(cm.getNpc()+"_Pure") == null) {
                    cm.gainMeso(500000000); // 초기자본(메소)
		    cm.gainItem(2430443,1); // 10레벨 장비 상자
		    cm.gainItem(1142075, 1); // 초기자본(훈장)
	 	    cm.gainItemAllStat(1082102, 1, 300, 30); // 초기자본(캐시세트)
		    cm.gainItemAllStat(1072153, 1, 300, 30); // 초기자본(캐시세트)
		    cm.getPlayer().setKeyValue(cm.getNpc()+"_Pure", "1");
		        cm.sendOk("아이템을 받으셨습니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("이미 받았잖아! 욕심쟁이야!!!");
		        cm.dispose();
		    }
}
}
}