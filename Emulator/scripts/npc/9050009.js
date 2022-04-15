


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	아룽 에 의해 만들어 졌습니다.

	엔피시아이디 : 9050009

	엔피시 이름 : 에뜨랑의 안내판

	엔피시가 있는 맵 : 메이플로드 : 단풍나무 언덕 (10000)

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
        cm.sendOk("#fn맑은 고딕##r그냥 닥치고 후원..^^ 꿀");
        cm.dispose();
        return;
    }
}
