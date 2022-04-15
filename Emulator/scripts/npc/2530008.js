


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	알바용 에 의해 만들어 졌습니다.

	엔피시아이디 : 2530008

	엔피시 이름 : 오즈

	엔피시가 있는 맵 : 위기의 에레브 : 돌이 된 여제 (304070000)

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
        cm.sendOk("#fn나눔고딕 Extrabold#끄윽...이..럴......수..가");
        cm.dispose();
        return;
    }
}
