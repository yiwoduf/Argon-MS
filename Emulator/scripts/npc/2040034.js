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
		cm.sendNext((cm.getParty() != null ? "" : "�ֺ��� ģ���鿡�� ��Ƽ�� ��û�� ������. ") + "��Ƽã��(����Ű O)�� �̿��ϸ� ���� ��𼭵� ���ϴ� ��Ƽ�� ã�� �� ������ �����ϼ���.");
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
	    var chat = "#e<��Ƽ����Ʈ : ������ �տ�>#n\r\n\r\n�� �����ʹ� ��û���� ������ ������ ���� �� �־� ���̻� �ö󰡽� �� �����. ��Ƽ����� �Բ� ���� ��� ����Ʈ�� �ذ��� ������ �ʰڽ��ϱ�? ������ ���� �ʹٸ� #b����� ���� ��Ƽ�� ��Ƽ��#k�� ���� ������ ���� �ɾ� �ּ���.#b\r\n";
	    chat += "\r\n#L0#��Ƽ����Ʈ�� �����ϰ� �ͽ��ϴ�.";
	    chat += "\r\n#L1#�Բ� �� ��Ƽ���� ã�� �;��.";
	    chat += "\r\n#L2#���� �� �Ȱ��� �ް� �;��.";
	    chat += "\r\n#L3#������ ��� �;��.";
	    chat += "\r\n#L4#������ ���� ���� Ƚ���� �˰� �;��.";
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
				    cm.sendYesNo("����� ���� ��Ƽ�� ��Ƽ���� 3�� �̻��� �ƴ϶� ����Ʈ�� �Ͻ� �� �����ϴ�. 3�� �̻����� ���� �ּ���. ���� ��Ƽ���� ���ڶ�ٸ� ��Ƽ ã�⸦ �̿��غ��ðھ��?");
				}
			    } else {
				cm.sendNext("��Ƽ�� �߿� 50���� �̸��� ���� �ֽ��ϴ�. ������ �տ��� �ּ� ���� ���� ������ 50�Դϴ�.");
				cm.dispose();
			    }
			} else {
			    cm.sendYesNo("����� ���� ��Ƽ�� ��Ƽ���� 3�� �̻��� �ƴ϶� ����Ʈ�� �Ͻ� �� �����ϴ�. 3�� �̻����� ���� �ּ���. ���� ��Ƽ���� ���ڶ�ٸ� ��Ƽ ã�⸦ �̿��غ��ðھ��?");
			}
		    } else {
			cm.sendOk("�� �����ʹ� ��û���� ������ ������ ���� �� �־� ���̻� �ö󰡽� �� �����. ������ ����� �츮 ���긮���� ��ȭ�� ���� �����ֽ� ������ �����ôٸ� ���� �޶�������. ž ����⿡ �ִ� ���ϰ� ������ ���͸� �����߷����� �ʹٸ� ��Ƽ���� ��� ������. ���� ������ �ʰ�����... ���� ����̶�� ���� �� ������ ���ƿ�.");
			cm.dispose();
		    }
		} else {
		    cm.sendYesNo("��Ƽ����Ʈ�� ��Ƽ�� �����Ͽ� �����Ͻ� �� �ֽ��ϴ�. �ٸ� ������ ��Ƽ�� �����ؼ� ������ �ּ���. ��Ƽ������ ã�� ���� ��Ƽ ã�� �Խ����� �̿��� ���ðھ��?");
		}
	    } else if (selection == 1) {
		cm.getPlayer().dropMessage(5,"��Ƽã��(����Ű O)�� �̿��ϸ� ���� ��𼭵� ���ϴ� ��Ƽ�� ã�� �� �ֽ��ϴ�.");
		cm.dispose();
	    } else if (selection == 2) {
		if (cm.getPlayer().getKeyValue("CrackyGlass") > 34) {
		    if (cm.getPlayer().getKeyValue("CrackyGlassAcquire") == 0) {
			cm.sendYesNo("�׵��� �����ּż� �����մϴ�. �� " + cm.getPlayer().getKeyValue("CrackyGlass") + "�� ���� �ּ̰� #b���� �� �Ȱ�#k�� " + cm.getPlayer().getKeyValue("CrackyGlassAcquire") + "�� �����ż� ���� " + (1 - cm.getPlayer().getKeyValue("CrackyGlassAcquire")) + "�� �� ������ �� �ֽ��ϴ�. #b���� �� �Ȱ�#k�� �����ðڽ��ϱ�?");
		    } else {
			cm.sendNext("Error Code : 5");
			cm.dispose();
		    }
		} else {
		    cm.sendNext("���� 35�� �����ֽ� �� ���� #i1022073# #b���� �� �Ȱ�#k�� 1���� �帮�� �ֽ��ϴ�. #b" + (35 - cm.getPlayer().getKeyValue("CrackyGlass")) + "��#k �� �����ֽø� #b���� �� �Ȱ�#k�� ������ �� �ֽ��ϴ�.");
		    cm.dispose();
		}
	    } else if (selection == 3) {
		var notice = "#e<��Ƽ����Ʈ : ������ �տ�>#n\r\n#b���긮��#k�� ������ �տ��� ���ܳ����ϴ�! �̰����κ��� ħ���� ���͵��� ���Ƴ����� �밨�� ���谡���� �ڹ����� ������ �����ؿ�. ���� �� �ִ� ������ ���� ���Ͽ� ���긮���� �����ּ���! ���͸� ��ġ�ϰų� ��� Ǯ����� ���� ������ �ذ��ϰ� #r�˸�����#k���� �¸��ؾ� �Ѵ�ϴ�.";
		notice += "\r\n#e- ����#n : 50�̻� #r( ��õ���� : 50 ~ 69 )#k";
		notice += "\r\n#e- ���ѽð�#n : 20��";
		notice += "\r\n#e- �����ο�#n : 3~6��";
		notice += "\r\n#e- ȹ�� ������#n : #i1022073# ���� �� �Ȱ� #b(35�� ������ ������ ȹ��)#k";
		notice += "\r\n�������������������� �Һ�, ��Ÿ, ��� ������";
		cm.sendOk(notice);
		cm.dispose();
	    } else if (selection == 4) {
		//cm.sendOk("���� ���� ���� Ƚ���� " + (10 - cm.getDayKey("3")) + "ȸ�Դϴ�.");
	cm.sendOk("�׽�Ʈ �Ⱓ ���ȿ��� �������Դϴ�.");
		cm.dispose();
	    }
	    jgys = selection;
	} else if (status == 2) {
	    if (jgys == 0) {
		cm.getPlayer().dropMessage(5,"��Ƽã��(����Ű O)�� �̿��ϸ� ���� ��𼭵� ���ϴ� ��Ƽ�� ã�� �� �ֽ��ϴ�.");
	    } else if (jgys == 2) {
		cm.gainItem(1022073,1);
		cm.getPlayer().setKeyValue("CrackyGlassAcquire","1");
	    }
	    cm.dispose();
	}
    }
}