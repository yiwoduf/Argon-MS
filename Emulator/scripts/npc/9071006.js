


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	플레임위자드 에 의해 만들어 졌습니다.

	엔피시아이디 : 9071006

	엔피시 이름 : 슈피겔라

	엔피시가 있는 맵 : 몬스터파크 : 몬스터파크 (951000000)

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
        cm.sendOk("몬스터파크에 오신 것을 환영해요. 아 참, 이미 오빠한테 환영 인사는 들어셨을테죠? 호호.");
        cm.dispose();
        return;
    }
}
