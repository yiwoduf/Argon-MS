var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
    if (cm.getPlayer().getMapId() == 100030301) {
		var jessica = "#fn나눔고딕 Extrabold#저기! 요번에 우리 동화나라에서 #b신제품#k 을 개발했거든?\r\n";
		jessica += "뭔소리냐고? #r다이어트#k 계의 혁명! #b칼로리 소모 측정기!!#k\r\n";
		jessica += "이거 하나면 인간들은 더 이상 구질구질한 몸매걱정은 NO!!\r\n";
		jessica += "근데 우리는 동물실험은 반대하걸랑!? 생명은 소중하니까!\r\n";
		jessica += "그래서 말인데, 너가 #r실험#k 좀 해줄래? #b보상#k 은 당연히 있어!\r\n\r\n";
		jessica += "  #r*#k 다이어트 측정 방법\r\n";
		jessica += "    1. #r숲#k 으로 #r이동#k 한다.\r\n";
		jessica += "    2. 요정 #r잭#k 을 #r클릭#k 한다.\r\n";
		jessica += "    3. 잭에게 #b숲의 기운#k 과 #b측정기#k 를 둘다 구입한다.\r\n";
		jessica += "    4. 맵에서 #r일반 공격#k 을 하면 다이어트가 #r시작#k 된다.\r\n\r\n";
		jessica += "    #r→#k #d매 측정시마다 칼로리 측정기가 1 개씩 소모됩니다.#k\r\n";
		jessica += "    #r→#k #d칼로리 소모에 성공하면 가벼운 솜털을 획득합니다.#k\r\n";
		jessica += "    #r→#k #d단, 기타 창이 꽉차면 솜털을 획득하지 못합니다.#k\r\n";
		jessica += "    #r→#k #d솜털을 모아 잭에게 여러 아이템으로 교환 가능합니다.#k\r\n";
		jessica += "#L0##r[다이어트 시작]#k #b다이어트의 숲으로 이동하기#k\r\n";
		cm.sendSimple(jessica);
        } else {
	cm.sendOk("#fn나눔고딕 Extrabold##r* 플레이 조건#k\r\n\r\n#d- 퀘스트의 전당 에서 플레이 가능#k",9062004);
	cm.dispose();
    }
	} else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.warp(910142080);
}
}
}
}