function start() {
    coupon = [5,6,7,8,9];
    status = cm.getMapId() % 1000 == 100 ? -1 : cm.getMapId() % 1000 == 200 ? 1 : cm.getMapId() % 1000 == 300 ? 2 : cm.getMapId() % 1000 == 400 ? 4 : 5;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
	cm.dispose();
        return;
    } else 
	status++;
    if (status == 0) {
	if (cm.getPlayer().getKeyValue("KerningPQ_Stage_1") == null) {
	    if (cm.isLeader() == true) {
		cm.getPlayer().setKeyValue("KerningPQ_Stage_1","0");
		cm.sendNext("안녕하세요. 첫번째 스테이지에 오신 것을 환영합니다. 주변을 둘러보면 리게이터가 돌아다니고 있는 것을 볼 수 있을 겁니다. 리게이터는 쓰러뜨리면 꼭 한 개의 #b쿠폰#k을 떨어뜨립니다. 파티장을 제외한 파티원 전원은 각각 저에게 말을 걸어 문제를 받고 문제의 답에 해당하는 수 만큼 리게이터가 주는 #b쿠폰#k을 모아와야 합니다.\r\n답만큼 #b쿠폰#k을 모아오면 미션을 완료하게 됩니다. 파티장을 제외한 모든 파티원이 #b개별 미션을 클리어#k 하면 스테이지를 클리어 하게 됩니다. 되도록 빨리 해결해야 더 많은 스테이지에 도전할 수 있으므로 서둘러 주세요. 그럼 행운을 빕니다.");
		cm.dispose();
	    } else {
		cm.sendNext("이곳에서는 개인별로 제가 내는 미션을 수행해야 합니다. 미션을 수행하면 이 곳을 통과할 수 있는 통행권을 받을 수 있습니다.");
	    }
	} else {
	    if (cm.isLeader() == true) {
		if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 0) {
		    if (cm.checkPQItem(4001008)) {
			cm.removePartyItemAll(4001007);
			cm.removePartyItemAll(4001008);
		 	cm.environmentChange(true,"gate");
			cm.getEventInstance().setProperty("KerningPQ_Gate","1");
			cm.sendNext("이번 스테이지를 클리어 한 것을 축하드립니다! 다음 스테이지로 통하는 포탈을 만들어 드리겠습니다. 제한 시간이 있으니 서둘러 주세요. 그럼 행운을 빕니다!");
		    } else {
			cm.sendNext("죄송합니다만 아직 미션을 완료하지 못한 파티원이 있습니다. 파티장을 제외한 파티원 모두 개인 미션을 완료하셔야 이 스테이지를 클리어 하실 수 있습니다.");
		    }	
		} else {
		    cm.sendNext("다음 스테이지로 통하는 포탈이 열렸습니다. 서둘러 주세요.");
		}
	    } else {
		if (cm.getPlayer().getKeyValue("KerningPQ_Stage_1") == 0) {
		    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 0) {
			if (cm.haveItem(4001007,cm.getPlayer().getKeyValue("KerningPQ_Coupon"))) {
			    cm.gainItem(4001008,1);
			    cm.getPlayer().setKeyValue("KerningPQ_Stage_1","1");
			    cm.gainItem(4001007,-cm.getPlayer().getKeyValue("KerningPQ_Coupon"));
			    cm.sendNext("미션을 성공하셨습니다. 아직 미션을 수행하지 못한 다른 파티원이 있다면 그들의 미션을 도와주세요.");
			} else {
			    cm.sendNext("미션입니다. #r쿠폰 " + cm.getPlayer().getKeyValue("KerningPQ_Coupon") + "장#k을 모아오세요. 쿠폰은 이곳의 #r리게이터를 물리치면#k 얻을 수 있습니다.");
			}
		    } else {
			cm.sendNext("다음 스테이지로 통하는 포탈이 열렸습니다. 서둘러 주세요.");
		    }
		} else {
		    cm.sendNext("#rText Error Code : 1#k");
		}
	    }
	    cm.dispose();
	}
    } else if (status == 1) {
	var rudy = Math.floor(Math.random() * coupon.length);
	cm.getPlayer().setKeyValue("KerningPQ_Stage_1","0");
	cm.getPlayer().setKeyValue("KerningPQ_Coupon",coupon[rudy] + "");
	cm.sendNextPrev("미션입니다. #r쿠폰 " + coupon[rudy] + "장#k을 모아오세요. 쿠폰은 이곳의 #r리게이터를 물리치면#k 얻을 수 있습니다.");
	cm.dispose();
    } else if (status == 2) {
	if (cm.getPlayer().getKeyValue("KerningPQ_Stage_2") == null) {
	    if (cm.isLeader() == true) {
		cm.getEventInstance().clearFootholds();
		cm.getEventInstance().addFootholds(3);
		cm.getEventInstance().addFootholds(11);
		cm.getEventInstance().addFootholds(12);
		cm.getEventInstance().addFootholds(13);
		cm.getEventInstance().shuffleFootholds(3);
		cm.getPlayer().setKeyValue("KerningPQ_Stage_2","0");
		cm.sendNext("안녕하세요. 두번째 스테이지에 오신 것을 환영합니다. 제 옆에 여러 개의 줄이 보일 것입니다. 이 줄 중에서 #b3개가 다음 스테이지로 향하는 포탈#k과 통해 있습니다. 파티원 중에서 #b3 명이 정답줄을 찾아 매달리면#k 됩니다.\r\n단, 줄을 너무 아래 쪽으로 잡고 매달리면 정답으로 인정되지 않으므로 줄을 잡고 충분히 위로 올라가 주시기 바랍니다. 그리고 반드시 3 명만 줄을 잡고 있어야 합니다. 파티원이 줄에 매달리면 파티장은 #b저를 더블클릭하여 정답인지 아닌지 확인#k하세요. 그럼 정답줄을 찾아 주세요~!");
	    } else {
		if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 1) {
		    cm.sendNext("#rText Error Code : 2#k");
		} else {
		    cm.sendNext("다음 스테이지로 통하는 포탈이 열렸습니다. 서둘러 주세요.");
		}
	    }
	} else {
	    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 2) {
		if (cm.getEventInstance().resultFootholds(3) == 0) {
		    cm.environmentChange(true,"gate");
		    cm.playSound(true,"Party1/Clear");
		    cm.showEffect(true,"quest/party/clear");
		    cm.getEventInstance().setProperty("KerningPQ_Gate","3");
		} else {
		    cm.playSound(true,"Party1/Failed");
		    cm.showEffect(true,"quest/party/wrong_kor");
		}
	    } else {
		cm.sendNext("다음 스테이지로 통하는 포탈이 열렸습니다. 서둘러 주세요.");
	    }
	}
	cm.dispose();
    } else if (status == 3) {
	if (cm.getPlayer().getKeyValue("KerningPQ_Stage_3") == null) {
	    if (cm.isLeader() == true) {
		cm.getEventInstance().clearFootholds();
		cm.getEventInstance().addFootholds(5);
		cm.getEventInstance().addFootholds(10);
		cm.getEventInstance().addFootholds(15);
		cm.getEventInstance().addFootholds(19);
		cm.getEventInstance().addFootholds(27);
		cm.getEventInstance().shuffleFootholds(3);
		cm.getPlayer().setKeyValue("KerningPQ_Stage_3","0");
		cm.sendNext("안녕하세요. 세번째 스테이지에 오신 것을 환영합니다. 옆에 고양이가 들어있는 통이 놓인 발판들이 보일 것입니다. 이 발판 중에서 #b3개가 다음 스테이지로 향하는 포탈#k과 통해 있습니다. 파티원 중에서 #b3 명이 정답발판을 찾아 위에 올라서면#k 됩니다.\r\n단, 발판 끝에 아슬아슬하게 걸쳐서 서지 말고 발판 중간에 서야 정답으로 인정되니 이점 주의해 주시기 바랍니다. 그리고 반드시 3 명만 발판 위에 올라가 있어야 합니다.");
	    } else {
		if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 4) {
		    cm.sendNext("#rText Error Code : 3#k");
		} else {
		    cm.sendNext("다음 스테이지로 통하는 포탈이 열렸습니다. 서둘러 주세요.");
		    cm.dispose();
		}
	    }
	} else {
	    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 4) {
		if (cm.getEventInstance().resultFootholds(3) == 0) {
		    cm.environmentChange(true,"gate");
		    cm.playSound(true,"Party1/Clear");
		    cm.showEffect(true,"quest/party/clear");
		    cm.getEventInstance().setProperty("KerningPQ_Gate","5");
		} else {
		    cm.playSound(true,"Party1/Failed");
		    cm.showEffect(true,"quest/party/wrong_kor");
		}
	    } else {
		cm.sendNext("다음 스테이지로 통하는 포탈이 열렸습니다. 서둘러 주세요.");
	    }
	    cm.dispose();
	}
    } else if (status == 4) {
	cm.sendNextPrev("발판 위로 올라갈 사람이 부족하면 네일리아에게 발판 인형#i4001454#을 구입해서 정답 발판 위에 올려주세요. 발판은 위에 올려진 발판 인형을 1명의 캐릭터로 인식한답니다.");
	cm.dispose();
    } else if (status == 5) {
	if (cm.isLeader() == true) {
	    if (cm.getEventInstance().getProperty("Kerning_Eyes") == 1) {
		if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 6) {
		    cm.environmentChange(true,"gate");
		    cm.getEventInstance().setProperty("KerningPQ_Gate","7");
		    cm.sendNext("여러분들은 이 스테이지의 퀘스트를 훌륭히 클리어하셨습니다. 보이는 포탈을 통하여 다음 스테이지로 이동해 주세요..");
		} else {
		    cm.sendNext("다음 스테이지로 통하는 포탈이 열렸습니다. 서둘러 주세요.");
		}
	    } else {
		cm.sendNext("네번째 스테이지에 대해 설명해 드리겠습니다. 이 곳에 있는 #b20마리의 커즈아이#k를 모두 물리치면 됩니다. 그럼 힘내주세요.");
	    }
	} else {
	    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 3) {
		cm.sendNext("#rText Error Code : 4#k");
	    } else {
		cm.sendNext("다음 스테이지로 통하는 포탈이 열렸습니다. 서둘러 주세요.");
	    }
	}
	cm.dispose();
    } else if (status == 6) {
	if (cm.getMonsterCount(cm.getMapId()) == 0) {
	    if (cm.getEventInstance().getProperty("KerningPQ_Gate") == 9) {
		cm.sendSimple("축하드립니다. 모든 스테이지를 클리어 하셨습니다. 이제 이 곳에서 더 이상 볼 일이 없으시면 밖으로 보내드리겠습니다.\r\n\r\n#b#L0#지금 나가겠습니다.");
	    } else {
		cm.getEventInstance().setProperty("KerningPQ_Gate","9");
		cm.sendNext("축하드립니다. 모든 스테이지를 클리어하였습니다. 이제 이 곳에서 더 이상 볼일이 없으시면 저에게 말을 걸어주세요. 밖으로 보내드리겠습니다.");
		cm.dispose();
	    }
	} else {
	    cm.sendNext("#rText Error Code : 5#k");
	    cm.dispose();
	}
    } else if (status == 7) {
	cm.getEventInstance().unregisterPlayer(cm.getPlayer());
	cm.warp(910340000,0);
    }
}