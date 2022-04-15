


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	쁘띠 에 의해 만들어 졌습니다.

	엔피시아이디 : 9076130

	엔피시 이름 : 요정 웡키

	엔피시가 있는 맵 : 여신의 탑 : &lt;여신의 탑 입구> (933030000)

	엔피시 설명 : 여신의 흔적


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
        cm.sendOk("앙 기무띠 ㅗ");
        cm.dispose();
        return;
    }
}
