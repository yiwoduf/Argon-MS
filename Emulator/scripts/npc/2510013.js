


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	츠나 에 의해 만들어 졌습니다.

	엔피시아이디 : 2510013

	엔피시 이름 : 오로라 연구원

	엔피시가 있는 맵 :  :  (302050030)

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

    if (status == 0) {
        cm.sendOk("#fn나눔고딕 Extrabold#으으... 견딜 수 없어..");
        cm.dispose();
        return;
    }
}
