


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	쁘띠 에 의해 만들어 졌습니다.

	엔피시아이디 : 9076003

	엔피시 이름 : 슈피겔라

	엔피시가 있는 맵 : 여신의 탑 : &lt;여신의 탑 입구> (933030000)

	엔피시 설명 : EXP 부스트 상인


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
        cm.sendOk("뭘보노 이기야 !");
        cm.dispose();
        return;
    }
}
