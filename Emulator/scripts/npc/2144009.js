


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	백란이 에 의해 만들어 졌습니다.

	엔피시아이디 : 2111003

	엔피시 이름 : 휴머노이드 A

	엔피시가 있는 맵 : HITMAN1c : 히트맨 광장 (101000100)

	엔피시 설명 : MISSINGNO


*/

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }
;
    if (status == 0) {
        cm.sendYesNo("마을로 이동하시겠습니까?");
    } else if (status == 1) {
        cm.warp(100050001);
    } else {
	cm.sendOk("다음에 이용해줘");
	cm.dispose();

}
}

