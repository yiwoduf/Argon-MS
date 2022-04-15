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
		cm.sendNext("�ֺ��� ģ���鿡�� ��Ƽ�� ��û�� ������. ��Ƽã��(����Ű O)�� �̿��ϸ� ���� ��𼭵� ���ϴ� ��Ƽ�� ã�� �� ������ �����ϼ���.");
	    }
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
	    var chat = "#e<��Ƽ����Ʈ : ù ��° ����>#n\r\n\r\n��Ƽ����� �Բ� ���� ��� ����Ʈ�� �ذ��� ������ �ʰڽ��ϱ�? �� �ȿ��� ���� ���� ��ġ�� ������ �ذ��� �� ���� ��ֹ����� ���� �ִ�ϴ�... ������ ���� �ʹٸ� #b����� ���� ��Ƽ�� ��Ƽ��#k�� ���� ������ ���� �ɾ��ּ���.#b\r\n";
	    chat += "\r\n#L0#��Ƽ����Ʈ�� �ϰ� �;��.";
	    chat += "\r\n#L1#������ ��� �;��.";
	    chat += "\r\n#L2#������ ���� ���� Ƚ���� �˰� �;��.";
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
				    cm.sendNext("�����ڴ��� ���� ��Ƽ���� 4���� �ƴ϶� �����Ͻ� �� �����. ���� 50�̻��� 4���̻� ��Ƽ���� �־�� �����Ͻ� �� ������ Ȯ���Ͻð� �ٽ� ������ ���� �ɾ��ּ���.");
				    cm.dispose();
				}
			    } else {
				cm.sendNext("��Ƽ�� �߿� 50���� �̸��� ���� �ֽ��ϴ�. ù ��° ������ �ּ� ���� ���� ������ 50�Դϴ�.");
				cm.dispose();
			    }
			} else {
			    cm.sendNext("�����ڴ��� ���� ��Ƽ���� 4���� �ƴ϶� �����Ͻ� �� �����. ���� 50�̻��� 4���̻� ��Ƽ���� �־�� �����Ͻ� �� ������ Ȯ���Ͻð� �ٽ� ������ ���� �ɾ��ּ���.");
			    cm.dispose();
			}
		    } else {
			cm.sendOk("Error Code : 1");
			cm.dispose();
		    }
		} else {
		    cm.sendYesNo("��Ƽ����Ʈ�� ��Ƽ�� �����Ͽ� �����Ͻ� �� �ֽ��ϴ�. �ٸ� ������ ��Ƽ�� �����ؼ� ������ �ּ���. ��Ƽ������ ã�� ���� ��Ƽ ã�� �Խ����� �̿��� ���ðھ��?");
		}
	    } else if (selection == 1) {
		cm.sendOk("#e<��Ƽ����Ʈ : ù ��° ����>#n\r\n\r\n���� �غ����Դϴ�.");
		cm.dispose();
	    } else if (selection == 2) {
		cm.sendOk("���� ���� ���� Ƚ���� " + (5 - cm.getDayKey("2")) + "ȸ�Դϴ�.");
		cm.dispose();
	    }
	} else if (status == 2) {
	    cm.getPlayer().dropMessage(5,"��Ƽã��(����Ű O)�� �̿��ϸ� ���� ��𼭵� ���ϴ� ��Ƽ�� ã�� �� �ֽ��ϴ�.");
	    cm.dispose();
	}
    }
}