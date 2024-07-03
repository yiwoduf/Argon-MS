


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	풀기용 에 의해 만들어 졌습니다.

	엔피시아이디 : 9050006

	엔피시 이름 : 소환수 피그미

	엔피시가 있는 맵 : 히든스트리트 : 늑대진영 대기실 (109090204)

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
        cm.sendOk("캐샵->추천인->SM카이져를 적어주시면 감사하겟습니다.");
        cm.dispose();
        return;
    }
}
