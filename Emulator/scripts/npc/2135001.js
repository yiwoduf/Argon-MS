


/*

	* 단문엔피시 자동제작 스크립트를 통해 만들어진 스크립트 입니다.

	* (Pure Online Development Source Script)

	정글러 에 의해 만들어 졌습니다.

	엔피시아이디 : 9330008

	엔피시 이름 : FAQ 퀘스트 npc 1

	엔피시가 있는 맵 : 메이플로드 : 선착장 (2000100)

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
         cm.sendMixHair("123",2008);
    } else if (status == 1) {
         cm.sendOk("헤어가 잘 염색되었습니다.");
		 cm.gainItem(2432946,-1);
         cm.dispose();
		 	 
    }
}