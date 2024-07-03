/*

자쿰 던전 퀘스트 시작 본섭화
제작자 : 가군 (qor6101@naver.com)

*/

var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0 && status == 0) {
	    cm.sendNext("생각이 드신면 다시 말을 걸어주세요.");
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
		cm.sendSimple("저에게 무슨 볼일이라도 있으신가요?\r\n#b#L0#자쿰던전 퀘스트를 허가해 주세요");
	} else if (status == 1) {
             if (selection == 0) {
	    	if (cm.getPlayer().getLevel() >= 50 && cm.getQuestStatus(100000) == 0) {
		cm.sendNext("자쿰던전 퀘스트를 허가해 달라 그거군요... #b아도비스#k인가요... 아무튼 좋습니다! 당신이라면 그 던전을 탐색하는 데 모자람이 없을 것 같습니다. 그럼 아무쪼록 조심하시길 바랍니다.");
	    	} else if (cm.getQuestStatus(100000) == 1) {
		cm.sendNext("당신은 이미 자쿰던전 퀘스트를 허가받지 않으셨나요? 아무쪼록 조심하시길 바랍니다.");
	} else {
		cm.sendNext("당신은 아직 자쿰던전을 탐색하는 데 모자라는 것 같습니다. 좀 더 수련을 쌓은 뒤 다시 찾아오시길 바랍니다");
	    	cm.dispose();
	    }
	}
	} else if (status == 2) {
	    cm.forceStartQuest(100000);
	    cm.dispose();
	}
     }
  }