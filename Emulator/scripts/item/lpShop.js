var status = -1;


function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
    if (status == 0) {
	var chat = "로그인포인트로 모험에 도움이 되는 아이템을 교환 해드리고 있습니다. 시간은 많으니 천천히 살펴 보세요.\r\n\r\n" + cm.getPlayer().getName() + "님의 보유 로그인 포인트 : #r" + cm.getPlayer().getLoginPoint() + "#k#n\r\n\r\n#L0##b로그인 포인트로 아이템을 교환 하겠습니다.#l");
	cm.sendSimple(chat);
	cm.dispose();
    }
}
