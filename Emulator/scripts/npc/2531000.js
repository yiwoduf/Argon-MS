


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	츠나 에 의해 만들어 졌습니다.

	엔피시아이디 : 2531000

	엔피시 이름 : 듀나미스

	엔피시가 있는 맵 :  :  (304020000)

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
        cm.sendOk("#fn나눔고딕 Extrabold#자네.. 자네를 찾고 있었네..\r\n어서 #r알렌#k 에게 부탁해서 나를 꺼내주게..");
        cm.dispose();
        return;
    }
}
