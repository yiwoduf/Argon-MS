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
			cm.sendSimple("Ÿ���� �ñ׳ʽ�(����) �� ������ �غ�� �Ǽ̽��ϱ�?\r\n\r\n" + "#L0##b �ñ׳ʽ�( ���� ) ������ ��û�Ѵ�.");
		} else {
			cm.sendYesNo("�ñ׳ʽ� ������ �׸��ϰ� �����ðڽ��ϱ�?");
		}
	} else if (status == 1) {

		if (cm.getPlayer().getMapId() == 271041000) {
			if (cm.getPlayer().getParty() == null) {
				cm.sendOk("1�� �̻� ��Ƽ�� �ξ�߸� ������ �� �ֽ��ϴ�.");
				cm.dispose();
				return;
			} else if (!cm.isLeader()) {
				cm.sendOk("��Ƽ�常 �����û�� �����մϴ�");
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
				cm.sendOk("���� �ñ׳ʽ��� Ŭ������ ��Ƽ���� �ֽ��ϴ�.\r\n�ñ׳ʽ��� �Ϸ翡 3ȸ�� ���� �����մϴ�.\r\n#e#r<Ŭ���� ����� ���� ������ �ϰ� �ʱ�ȭ�˴ϴ�.>#k#n");

			} else if (cm.getPlayerCount(271041100) > 0) {
				cm.sendOk("�̹� �ٸ� ��Ƽ�� �ñ׳ʽ��� óġ�� �Դϴ�.");
			} else {
				cm.resetMap(271041100);
				cm.PartyTimeMove(cm.getPlayer().getMapId(), 271041100, 1800);
				cm.spawnMob(8850011, -280, 117);
				for (i = 0; i < cm.getPartyMembers().size(); i++) {
					target = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(cm.getPlayer().getParty().getMembers().get(i).getName())
						target.setDateKey("EasyCygnus", target.getDateKey("EasyCygnus") - 1);
						target.setKeyValue("EasyCygnusTime", new Date().getTime());
				}
				cm.getPlayer().getMap().startMapEffect("�̰��� ã�� �� ����� ���� ���� ���� �������̿���. ������ ������ ���ư� �е� ������ϴ�.", 5120043);
				
			}
			cm.dispose();
			return;
		} else {
			cm.warp(271041100, 1);
			cm.dispose();
		}
	}
}
