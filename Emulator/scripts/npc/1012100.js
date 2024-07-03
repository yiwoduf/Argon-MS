


/*

	퓨어 소스  팩의 스크립트 입니다. (제작 : 주크블랙) - 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	파끝쟁이 에 의해 만들어 졌습니다.

	엔피시아이디 : 1012100

	엔피시 이름 : 헬레나

	엔피시가 있는 맵 : 헤네시스 : 궁수 교육원 (100000201)

	엔피시 설명 : 궁수 전직관


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
        cm.sendOk("궁수가 되고 싶은가요?");
        cm.dispose();
        return;
    }
}
