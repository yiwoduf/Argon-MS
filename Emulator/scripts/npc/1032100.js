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
            cm.sendYesNo("#fn나눔고딕 Extrabold# 만렙보상 엔피시입니다.\r\n#r※주의 : 소비칸1칸, 설치칸1칸 남겨두세요 복구불가")
        } else if (status == 1){
           if (cm.getPlayer().getKeyValue(cm.getNpc()+"_Pure") == null && cm.getPlayer().getLevel() == 250) {
		cm.gainRC(2000);
		cm.gainItem(3014005, 1);
		cm.gainItem(2434981, 1);
		cm.getPlayer().setKeyValue(cm.getNpc()+"_Pure", "1");
		cm.sendOk("후원포인트 및 의자 그리고 데미지 스킨 뽑기권이 지급되었습니다.");
		cm.dispose();
		    } else {
		        cm.sendOk("이미 받았거나 250레벨이 아닙니다.");
		        cm.dispose();
		    }
}
}
}