


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	메르세데스 에 의해 만들어 졌습니다.

	엔피시아이디 : 9000337

	엔피시 이름 : 플레타

	엔피시가 있는 맵 : 메이플로드 : 단풍나무 언덕 (10000)

	엔피시 설명 : 가위바위보 매니아


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
        cm.sendOk("테스피아");
        cm.dispose();
        return;
    }
}
