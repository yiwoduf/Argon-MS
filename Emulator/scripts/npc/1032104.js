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
            cm.sendYesNo("#fn나눔고딕 Extrabold# 후원포인트 이벵 진행중!!!\r\n\r\n3월 1일까지 진행합니다^^\r\n#r※주의 : 장비칸3칸, 소비칸1칸 남겨두세요 복구불가")
        } else if (status == 1){
           if (cm.getPlayer().getKeyValue(cm.getNpc()+"_Pure") == null) {
            //cm.gainRC(1000);
		    cm.getPlayer().setKeyValue(cm.getNpc()+"_Pure", "1");
		        cm.sendOk("카카오톡 @오로라온라인 친추 주시고\r\n이 화면을 캡쳐해서 보내주시길 바랍니다.");
			cm.dispose();
		    } else {
		        cm.sendOk("이미 받았잖아! 욕심쟁이야!!!");
		        cm.dispose();
		    }
}
}
}