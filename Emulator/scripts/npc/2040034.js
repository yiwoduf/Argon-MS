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
		cm.sendNext((cm.getParty() != null ? "" : "주변의 친구들에게 파티를 신청해 보세요. ") + "파티찾기(단축키 O)를 이용하면 언제 어디서든 원하는 파티를 찾을 수 있으니 참고하세요.");
	    }
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
	    if (cm.getPlayer().getKeyValue("CrackyGlassAcquire") == null) {
		cm.getPlayer().setKeyValue("CrackyGlassAcquire","0");
	    }
	    var chat = "#e<파티퀘스트 : 차원의 균열>#n\r\n\r\n이 위부터는 엄청나게 위험한 존재들로 가득 차 있어 더이상 올라가실 수 없어요. 파티원들과 함께 힘을 모아 퀘스트를 해결해 보시지 않겠습니까? 도전해 보고 싶다면 #b당신이 속한 파티의 파티장#k을 통해 저에게 말을 걸어 주세요.#b\r\n";
	    chat += "\r\n#L0#파티퀘스트에 참가하고 싶습니다.";
	    chat += "\r\n#L1#함께 할 파티원을 찾고 싶어요.";
	    chat += "\r\n#L2#금이 간 안경을 받고 싶어요.";
	    chat += "\r\n#L3#설명을 듣고 싶어요.";
	    chat += "\r\n#L4#오늘의 남은 도전 횟수를 알고 싶어요.";
	    cm.sendSimple(chat);
	} else if (status == 1) {
	    if (selection == 0) {
		if (cm.getParty() != null) {
		    if (cm.isLeader() == true) {
			if (cm.getParty().getMembers().size() >= 0) {
			    if (cm.checkLevel(50,250)) {
				if (cm.allMembersHere() == true) {
				/*    if (cm.getDayKeyParty("3") != 10) {
					cm.setDayKeyParty("3",(Integer.parseInt(cm.getDayKey("3")) + 1) + "");*/
					var em = cm.getEventManager("PartyQuest").readyInstance(); 
					em.setProperty("Global_StartMap","922010100");
					em.setProperty("Global_ExitMap","922010000");
					em.startEventTimer(1200000);
					em.registerParty(cm.getParty(),cm.getMap());
					cm.getEventInstance().setProperty("LudiPQ_Gate","0");
					cm.getEventInstance().setProperty("LudiPQ_Foot","0");
					cm.getEventInstance().setProperty("LudiPQ_PassCoupon","0");
					cm.dispose();
				/*    } else {
					cm.sendNext("Error Code : 1");
					cm.dispose(); 
				    } */
				} else {
				    cm.sendYesNo("당신이 속한 파티의 파티원이 3명 이상이 아니라서 퀘스트를 하실 수 없습니다. 3명 이상으로 맞춰 주세요. 만약 파티원이 모자라다면 파티 찾기를 이용해보시겠어요?");
				}
			    } else {
				cm.sendNext("파티원 중에 50레벨 미만인 분이 있습니다. 차원의 균열의 최소 입장 가능 레벨은 50입니다.");
				cm.dispose();
			    }
			} else {
			    cm.sendYesNo("당신이 속한 파티의 파티원이 3명 이상이 아니라서 퀘스트를 하실 수 없습니다. 3명 이상으로 맞춰 주세요. 만약 파티원이 모자라다면 파티 찾기를 이용해보시겠어요?");
			}
		    } else {
			cm.sendOk("이 위부터는 엄청나게 위험한 존재들로 가득 차 있어 더이상 올라가실 수 없어요. 하지만 당신이 우리 루디브리엄의 평화를 위해 나서주실 생각이 있으시다면 얘기는 달라지겠죠. 탑 꼭대기에 있는 강하고 무서운 몬스터를 쓰러뜨려보고 싶다면 파티원을 모아 보세요. 결코 쉽지는 않겠지만... 왠지 당신이라면 믿을 수 있을것 같아요.");
			cm.dispose();
		    }
		} else {
		    cm.sendYesNo("파티퀘스트는 파티를 구성하여 참여하실 수 있습니다. 다른 사람들과 파티를 구성해서 도전해 주세요. 파티원들을 찾기 위해 파티 찾기 게시판을 이용해 보시겠어요?");
		}
	    } else if (selection == 1) {
		cm.getPlayer().dropMessage(5,"파티찾기(단축키 O)를 이용하면 언제 어디서든 원하는 파티를 찾을 수 있습니다.");
		cm.dispose();
	    } else if (selection == 2) {
		if (cm.getPlayer().getKeyValue("CrackyGlass") > 34) {
		    if (cm.getPlayer().getKeyValue("CrackyGlassAcquire") == 0) {
			cm.sendYesNo("그동안 도와주셔서 감사합니다. 총 " + cm.getPlayer().getKeyValue("CrackyGlass") + "번 도와 주셨고 #b금이 간 안경#k을 " + cm.getPlayer().getKeyValue("CrackyGlassAcquire") + "번 받으셔서 아직 " + (1 - cm.getPlayer().getKeyValue("CrackyGlassAcquire")) + "번 더 받으실 수 있습니다. #b금이 간 안경#k를 받으시겠습니까?");
		    } else {
			cm.sendNext("Error Code : 5");
			cm.dispose();
		    }
		} else {
		    cm.sendNext("저를 35번 도와주실 때 마다 #i1022073# #b금이 간 안경#k를 1개씩 드리고 있습니다. #b" + (35 - cm.getPlayer().getKeyValue("CrackyGlass")) + "번#k 더 도와주시면 #b금이 간 안경#k를 받으실 수 있습니다.");
		    cm.dispose();
		}
	    } else if (selection == 3) {
		var notice = "#e<파티퀘스트 : 차원의 균열>#n\r\n#b루디브리엄#k에 차원의 균열이 생겨났습니다! 이곳으로부터 침입한 몬스터들을 막아내려면 용감한 모험가들의 자발적인 도움이 절실해요. 믿을 수 있는 동료들과 힘을 합하여 루디브리엄을 구해주세요! 몬스터를 퇴치하거나 퀴즈를 풀어나가는 각종 난관을 해결하고 #r알리샤르#k에게 승리해야 한답니다.";
		notice += "\r\n#e- 레벨#n : 50이상 #r( 추천레벨 : 50 ~ 69 )#k";
		notice += "\r\n#e- 제한시간#n : 20분";
		notice += "\r\n#e- 참가인원#n : 3~6명";
		notice += "\r\n#e- 획득 아이템#n : #i1022073# 금이 간 안경 #b(35번 도와줄 때마다 획득)#k";
		notice += "\r\n　　　　　　　　각종 소비, 기타, 장비 아이템";
		cm.sendOk(notice);
		cm.dispose();
	    } else if (selection == 4) {
		//cm.sendOk("오늘 남은 도전 횟수는 " + (10 - cm.getDayKey("3")) + "회입니다.");
	cm.sendOk("테스트 기간 동안에는 무제한입니다.");
		cm.dispose();
	    }
	    jgys = selection;
	} else if (status == 2) {
	    if (jgys == 0) {
		cm.getPlayer().dropMessage(5,"파티찾기(단축키 O)를 이용하면 언제 어디서든 원하는 파티를 찾을 수 있습니다.");
	    } else if (jgys == 2) {
		cm.gainItem(1022073,1);
		cm.getPlayer().setKeyValue("CrackyGlassAcquire","1");
	    }
	    cm.dispose();
	}
    }
}