importPackage(java.util);
importPackage(java.lang);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
	    if (status == 1) {
		cm.sendNext("주변의 친구들에게 파티를 신청해 보세요. 파티찾기(단축키 O)를 이용하면 언제 어디서든 원하는 파티를 찾을 수 있으니 참고하세요.");
	    }
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
	    var chat = "#e<파티퀘스트 : 첫 번째 동행>#n\r\n\r\n파티원들과 함께 힘을 모아 퀘스트를 해결해 보시지 않겠습니까? 이 안에는 서로 힘을 합치지 않으면 해결할 수 없는 장애물들이 많이 있답니다... 도전해 보고 싶다면 #b당신이 속한 파티의 파티장#k을 통해 저에게 말을 걸어주세요.#b\r\n";
	    chat += "\r\n#L0#파티퀘스트를 하고 싶어요.";
	    chat += "\r\n#L1#설명을 듣고 싶어요.";
	    chat += "\r\n#L2#오늘의 남은 도전 횟수를 알고 싶어요.";
	    cm.sendSimple(chat);
	} else if (status == 1) {
	    if (selection == 0) {
		if (cm.getParty() != null) {
		    if (cm.isLeader() == true) {
			if (cm.getParty().getMembers().size() > 0) { // 3
			    if (cm.checkLevel(50,250)) {
				if (cm.allMembersHere() == true) {
				/*    if (cm.getDayKeyParty("2") != 5) {
					cm.setDayKeyParty("2",(Integer.parseInt(cm.getDayKey("2")) + 1) + ""); */
					var em = cm.getEventManager("PartyQuest").readyInstance();
					em.setProperty("Global_StartMap",910340100 + "");
					em.setProperty("Global_ExitMap",910340000 + "");
					em.startEventTimer(1200000);
					em.registerParty(cm.getParty(),cm.getMap());
					cm.setPartyKeyValue("KerningPQ_Stage_1",null);
					cm.setPartyKeyValue("KerningPQ_Stage_2",null);
					cm.setPartyKeyValue("KerningPQ_Stage_3",null);
					cm.getEventInstance().setProperty("KerningPQ_Gate","0");
					cm.dispose();
			/*	    } else {
					cm.sendNext("Error Code : 1");
					cm.dispose();
				    } */
				} else {
				    cm.sendNext("여행자님이 속한 파티원이 4명이 아니라서 입장하실 수 없어요. 레벨 50이상의 4명이상 파티원이 있어야 입장하실 수 있으니 확인하시고 다시 저에게 말을 걸어주세요.");
				    cm.dispose();
				}
			    } else {
				cm.sendNext("파티원 중에 50레벨 미만인 분이 있습니다. 첫 번째 동행의 최소 입장 가능 레벨은 50입니다.");
				cm.dispose();
			    }
			} else {
			    cm.sendNext("여행자님이 속한 파티원이 4명이 아니라서 입장하실 수 없어요. 레벨 50이상의 4명이상 파티원이 있어야 입장하실 수 있으니 확인하시고 다시 저에게 말을 걸어주세요.");
			    cm.dispose();
			}
		    } else {
			cm.sendOk("Error Code : 1");
			cm.dispose();
		    }
		} else {
		    cm.sendYesNo("파티퀘스트는 파티를 구성하여 참여하실 수 있습니다. 다른 사람들과 파티를 구성해서 도전해 주세요. 파티원들을 찾기 위해 파티 찾기 게시판을 이용해 보시겠어요?");
		}
	    } else if (selection == 1) {
		cm.sendOk("#e<파티퀘스트 : 첫 번째 동행>#n\r\n\r\n설명 준비중입니다.");
		cm.dispose();
	    } else if (selection == 2) {
		cm.sendOk("오늘 남은 도전 횟수는 " + (5 - cm.getDayKey("2")) + "회입니다.");
		cm.dispose();
	    }
	} else if (status == 2) {
	    cm.getPlayer().dropMessage(5,"파티찾기(단축키 O)를 이용하면 언제 어디서든 원하는 파티를 찾을 수 있습니다.");
	    cm.dispose();
	}
    }
}