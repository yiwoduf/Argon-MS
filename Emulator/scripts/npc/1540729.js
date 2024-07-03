


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	시그타으 에 의해 만들어 졌습니다.

	엔피시아이디 : 1540729

	엔피시 이름 : 시그너스

	엔피시가 있는 맵 : 기사단 요새 : 시그너스의 전당 (271040100)

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
        cm.spawnMob(8850000, -181, -100);
	cm.removeNpc(1540729);
        cm.dispose();
    }
}
