


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	츠나 에 의해 만들어 졌습니다.

	엔피시아이디 : 2520010

	엔피시 이름 : 키리두

	엔피시가 있는 맵 :  :  (303090020)

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
        cm.sendOk("#fn나눔고딕 Extrabold#아니.. 이럴수가!.. #r마르스#k 님 까지.. 이렇게 되다니..\r\n이 곳 에레브 마저.. 어둠의 기운이.. 몰려오는군..");
        cm.dispose();
        return;
    }
}
