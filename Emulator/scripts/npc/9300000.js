var status = 0;

function start() {
   status = -1;
   action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1)
	status++;
	else {
	cm.dispose();
	return;
}

	if (status == 0) {
	var chat =  "#r #fs13##fn나눔고딕 Extrabold#AURORA ONLINE 도움 시스템입니다\r\n";
	chat += "#r  #fs13##fn나눔고딕 Extrabold#각종 편리한 기능을 이용해보세요\r\n";
	chat += "#fn 굴림체##b#L1#오로라온라인의 뉴비지원을 받겠습니다.\r\n";
	chat += "#b#L2#오로라온라인의 출석체크를 하겠습니다.\r\n";
	chat += "#b#L4#무료 검색캐시를 이용하겠습니다.\r\n";
	chat += "#b#L5#오로라온라인 뽑기샵을 이용하겠습니다.\r\n";
	chat += "#b#L6#오로라온라인 돌림판을 이용하겠습니다.\r\n";
	chat += "#b#L7#핫타임 보상을 지급받겠습니다.\r\n";
	chat += "#b#L9#대가리에 있는 전구를 지우겠습니다 .\r\n";
	//chat += "#b#L8#라이딩스킬을 모두배우겠습니다.\r\n";
         
	cm.sendSimpleS(chat,2);

	} else if (status == 1) {

	if (selection == 1) {
	cm.dispose();
	cm.openNpc(9001040);

	} else if (selection == 2) {
	cm.dispose();
	cm.openNpc(9330027);

	} else if (selection == 3) {
	cm.dispose();
	cm.openNpc(9070206);

	} else if (selection == 4) {
	cm.dispose();
	cm.openNpc(1530340);

	} else if (selection == 5) {
	cm.dispose();
	cm.openNpc(1012117);

	} else if (selection == 6) {
	cm.dispose();
	cm.openNpc(9000155);

	} else if (selection == 7) {
	cm.dispose();
	cm.openNpc(9000453);

	} else if (selection == 8) {
	cm.dispose();
	cm.openNpc(1103002);

	} else if (selection == 9) {
	cm.dispose();
	cm.openNpc(1052107);

		}
	}
}