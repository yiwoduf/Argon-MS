


/*

	퓨어 소스  팩의 스크립트 입니다. (제작 : 주크블랙) - 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	지렁 에 의해 만들어 졌습니다.

	엔피시아이디 : 2152012

	엔피시 이름 : 똘똘이

	엔피시가 있는 맵 :  :  (310000000)

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
        cm.sendOk("음... 거기 뭔가 좀 있어보이시는데요.");
        cm.dispose();
        return;
    }
}
