var status = 0;
var mapids = [951000200,951000210,951000220,951000230,951000240,951000250,951000260,951000270];

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) 
	status++;
    else 
	status--;
    if (status == 0) {
	cm.sendYesNo("#fn나눔고딕 Extrabold##r[입장 제한]#k LV.140 ~ LV.180\r\n#b몬스터 파크 익스트림#k 에 입장 하시겠어요?");
    } else if (status == 1) {
	var jgys = Math.floor(Math.random() * mapids.length);
	if (cm.getParty() && cm.isLeader()) {
	    if (cm.checkItem(4001760)) {
		if (cm.checkLevel(140,179)) {
		    if (cm.getPlayerCount(mapids[jgys]) == 0) {
			cm.gainPartyItem(4001760,-1,false);
			cm.forcePartyStartQuest(100001);
			var em = cm.getEventManager("MonsterParkExtreme").readyInstance();
    			em.setProperty("StartMap",mapids[jgys] + "");
    			em.setProperty("LeaveMap",951000000 + "");
			em.registerParty(cm.getParty(),cm.getMap());
    	                cm.killAllMob();
			cm.sendOk("#fn나눔고딕 Extrabold##b몬스터 파크 익스트림#k 에 오신 걸 환영합니다.\r\n\r\n#fs14##r곧 몬스터 소환이 시작됩니다.#k");
		    } else {
			cm.sendOk("#fn나눔고딕 Extrabold##r이미 다른 파티가 이용하고 있습니다.#k");
                        cm.dispose();
                    }
            	} else {
                    cm.sendOk("#fn나눔고딕 Extrabold##r파티원 중 레벨이 맞지 않는 파티원이 있습니다.#k");
                    cm.dispose();
            	}
            } else {
            	cm.sendOk("#fn나눔고딕 Extrabold##i4001760# #d익스트림 티켓#k 이 있는지 확인해 주세요.\r\n\r\n          * #r티켓 구입은 왼쪽의 저를 찾아 오세요.#k");
                cm.dispose();
            }
    	} else {
	    cm.sendOk("#fn나눔고딕 Extrabold##r파티장을 통해서만 입장이 가능합니다.#k");
            cm.dispose();
    	}
	cm.dispose();
    }
}