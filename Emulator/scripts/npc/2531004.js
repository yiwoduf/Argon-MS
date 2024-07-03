


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	츠나 에 의해 만들어 졌습니다.

	엔피시아이디 : 2531004

	엔피시 이름 : 듀나미스

	엔피시가 있는 맵 :  :  (304050000)

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
        cm.sendOk("#fn나눔고딕 Extrabold#에레브로 가는 비행길은 #r키리루#k 저 자가 태워줄걸세...\r\n그럼.. 나 대신 꼭 임무를 성공적으로 이끌게나.. 행운을 비네!..");
        cm.dispose();
        return;
    }
}
