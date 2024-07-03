function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
	cm.dispose();
        return;
    } else 
	status++;
    if (status == 0) {
	if (cm.getPlayer().getEventInstance().getProperty("LudiPQ_Gate") == 1) {
	    cm.sendNext("#b차원의 롬바드#k 를 모두 물리치시다니~ 대단해요!! 다음 스테이지로 가는 포탈을 열도록 하겠습니다.");
	} else {
		cm.sendNext("네번째 스테이지에 오신 것을 환영합니다. 이곳에는 아주 아주 강력한 몬스터가 있습니다. 바로 #b차원의 롬바드#k라는 녀석이죠. 이 녀석을 쓰러뜨리고 나서 저에게 오시면 다음 스테이지로 가는 포탈을 열어드릴게요. #b차원의 롬바드#k 이 녀석은 보통 녀석이 아니니까 주의하셔야 되요.");
	    
	    
	    cm.dispose();
	}
    } else if (status == 1) {
	cm.environmentChange(true,"gate");
	cm.getEventInstance().setProperty("LudiPQ_Gate","3");
	cm.sendNextPrev("다음 스테이지로 통하는 포탈이 열렸습니다.");
	cm.dispose();
    }
}