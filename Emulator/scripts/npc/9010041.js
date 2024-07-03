


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Guardian Project Development Source Script)

	엔버 에 의해 만들어 졌습니다.

	엔피시아이디 : 9010041

	엔피시 이름 : Ms. 어카운트

	엔피시가 있는 맵 : 헤네시스 : 헤네시스 (100000000)

	엔피시 설명 : 아르바이트 보상


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
        cm.sendSimple("안녕하세요. 정당한 노력의 댓가를 원하시나요? 아르바이트에 관한 모든것은 저 #b미스 어카운트#k가 도와드릴게요.\r\n#b#e#L0# 아르바이트 보상을 받는다. #l");
    } else if (status == 1) {
	cm.givePartTimeReward();
	cm.dispose();
    }
}
