var status = -1;

function start() {
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	datecheck = true;

	if (mode == -1 || mode == 0) {
		cm.dispose();
		return;
	}
	if (mode == 1) {
		status++;
	}

	if (status == 0) {
		if (cm.getPlayer().getMapId() == 271041000) {
			cm.sendSimple("타락한 시그너스(이지) 에 참가할 준비는 되셨습니까?\r\n\r\n" + "#L0##b 시그너스( 이지 ) 입장을 신청한다.");
		} else {
			cm.sendYesNo("시그너스 원정을 그만하고 나가시겠습니까?");
		}
	} else if (status == 1) {

		if (cm.getPlayer().getMapId() == 271041000) {
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("1인 이상 파티를 맺어야만 입장할 수 있습니다.");
				cm.dispose();
				return;
			} else if (!cm.isLeader()) {
				cm.sendOk("파티장만 입장신청이 가능합니다");
				cm.dispose();
				return;
			}
			for (i = 0; i < cm.getPartyMembers().size(); i++) {
				target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getParty().getMembers().get(i).getName())
					if (target.getDateKey("EasyCygnus") == null) {
						target.setDateKey("EasyCygnus", 3);
					}
					if (target.getDateKey("EasyCygnus") <= 0) {
						datecheck = false;
					}
			}
			if (!datecheck) {
				cm.sendOk("오늘 시그너스를 클리어한 파티원이 있습니다.\r\n시그너스는 하루에 3회만 입장 가능합니다.\r\n#e#r<클리어 기록은 매일 자정에 일괄 초기화됩니다.>#k#n");

			} else if (cm.getPlayerCount(271041100) > 0) {
				cm.sendOk("이미 다른 파티가 시그너스를 처치중 입니다.");
			} else {
				cm.resetMap(271041100);
				cm.PartyTimeMove(cm.getPlayer().getMapId(), 271041100, 1800);
				cm.spawnMob(8850011, -280, 117);
				for (i = 0; i < cm.getPartyMembers().size(); i++) {
					target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getParty().getMembers().get(i).getName())
						target.setDateKey("EasyCygnus", target.getDateKey("EasyCygnus") - 1);
						target.setKeyValue("EasyCygnusTime", new Date().getTime());
				}
				cm.getPlayer().getMap().startMapEffect("이곳을 찾아 온 사람을 보는 것은 정말 오랜만이에요. 하지만 무사히 돌아간 분도 없었답니다.", 5120043);
				
			}
			cm.dispose();
			return;
		} else {
			cm.warp(271041100, 1);
			cm.dispose();
		}
	}
}
