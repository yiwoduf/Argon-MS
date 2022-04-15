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
	cm.sendYesNo("#fn������� Extrabold##r[���� ����]#k LV.140 ~ LV.180\r\n#b���� ��ũ �ͽ�Ʈ��#k �� ���� �Ͻðھ��?");
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
			cm.sendOk("#fn������� Extrabold##b���� ��ũ �ͽ�Ʈ��#k �� ���� �� ȯ���մϴ�.\r\n\r\n#fs14##r�� ���� ��ȯ�� ���۵˴ϴ�.#k");
		    } else {
			cm.sendOk("#fn������� Extrabold##r�̹� �ٸ� ��Ƽ�� �̿��ϰ� �ֽ��ϴ�.#k");
                        cm.dispose();
                    }
            	} else {
                    cm.sendOk("#fn������� Extrabold##r��Ƽ�� �� ������ ���� �ʴ� ��Ƽ���� �ֽ��ϴ�.#k");
                    cm.dispose();
            	}
            } else {
            	cm.sendOk("#fn������� Extrabold##i4001760# #d�ͽ�Ʈ�� Ƽ��#k �� �ִ��� Ȯ���� �ּ���.\r\n\r\n          * #rƼ�� ������ ������ ���� ã�� ������.#k");
                cm.dispose();
            }
    	} else {
	    cm.sendOk("#fn������� Extrabold##r��Ƽ���� ���ؼ��� ������ �����մϴ�.#k");
            cm.dispose();
    	}
	cm.dispose();
    }
}