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
                 cm.sendNext("��ȭ�� �����ϴ�.");
             }
             cm.dispose();
             return;
         }
         if (mode == 1)
             status++;
         else
             status--;
         if (status == 0) {
             var chat = "#e<��Ƽ����Ʈ : ���� ������>#n\r\n\r\n������ ���ϴ°ǰ�?#b\r\n";
             chat += "\r\n#L0#��Ƽ����Ʈ�� �ϰ� �;��.";
             chat += "\r\n#L1#�Բ� �� ��Ƽ���� ã�� �;��.";
             chat += "\r\n#L2#������ ��� �;��.";
             chat += "\r\n#L3#�������� ���ڸ� �ް� �;��.";
             chat += "\r\n#L4#������ ���� ���� Ƚ���� �˰� �;��.";
             cm.sendSimple(chat);
         } else if (status == 1) {
             if (selection == 0) {
                 if (cm.getParty() != null) {
                     if (cm.isLeader() == true) {
                         if (cm.getParty().getMembers().size() >= 0) {
                             if (cm.checkLevel(100,250)) {
                                 if (cm.allMembersHere() == true) {
                                  /*   if (cm.getDayKeyParty("7") != 10) {
                                         cm.setDayKeyParty("7",(cm.getDayKey("7") + 1) + ""); */
                                         var em = cm.getEventManager("PartyQuest");
				var eim = em.readyInstance();
                                         eim.setProperty("Global_StartMap","925100000");
                                         eim.setProperty("Global_ExitMap","925100700");
                                         eim.startEventTimer(240000);
                                         eim.registerParty(cm.getParty(),cm.getMap()); 
                                         cm.setKeyValueParty("DavyzonePQ_Gift","0");
                                         cm.setKeyValueParty("DavyzonePQ_KillMonster","0");
                                         cm.getEventInstance().setProperty("DavyzonePQ_Gate","0");
                                         cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(925100000).respawn(false, 0);
                                         cm.killAllMonsters(925100000);
			/*	for (var i = 100015; i < 100029; i++) {
				cm.getPlayer().getMap().getReactorByOid(i).hitReactor(cm.getClient());
			} */
                                         cm.dispose();
                              /*       } else {
                                         cm.sendNext("��ȭ�� �����ϴ�.");
                                         cm.dispose();
                                     } */
                                 } else {
                                     cm.sendYesNo("�ڳװ� ���� ��Ƽ�� ��Ƽ���� 3���̻��� �ƴ϶� ����Ʈ�� �� �� ����. 3���̻����� ���� �ְ�. ��Ƽ���� �������� ��Ƽ ã�⸦ �̿��� ���°� ���?");
                                 }
                             } else {
                                 cm.sendNext("��ȭ�� �����ϴ�.");
                                 cm.dispose();
                             }
                         } else {
                             cm.sendYesNo("�ڳװ� ���� ��Ƽ�� ��Ƽ���� 3���̻��� �ƴ϶� ����Ʈ�� �� �� ����. 3���̻����� ���� �ְ�. ��Ƽ���� �������� ��Ƽ ã�⸦ �̿��� ���°� ���?");
                         }
                     } else {
                         cm.sendNext("�ڳ׵��� ��ǥ�� ���� �ɾ� �ְԳ�.");
                         cm.dispose();
                     }
                 } else {
                     cm.sendNext("�ڳ׵��� ��ǥ�� ���� �ɾ� �ְԳ�.");
                     cm.dispose();
                 }
             } else if (selection == 1) {
                 cm.getPlayer().dropMessage(5,"��Ƽã��(����Ű O)�� �̿��ϸ� ���� ��𼭵� ���ϴ� ��Ƽ�� ã�� �� �ֽ��ϴ�.");
                 cm.dispose();
             } else if (selection == 2) {
                 var notice = "���������� ��� #b���ʸ���#k�� #r���� ������#k�� �����ؿԴٳ�. ���������� ���� #b���#k���� ��ġ�Ǽ̾�. ������ �������� ħ���� �������� ���Ƴ��ֽÿ�. ��Ź�ϳ�";
                 notice += "\r\n#e- ����#n : 100���� �̻� #r( ��õ���� : 100 ~ 129 )#k";
                 notice += "\r\n#e- �����ο�#n : 3 ~ 6��";
                 notice += "\r\n#e- ���� ����#n : #i1003856# #b���� �������� ����#k";
                 cm.sendNext(notice);
                 cm.dispose();
             } else if (selection == 3) {
                 var hat = "#b������#k�� ����ġ�� #b���#k���� �����༭ ���� ����. ��ʷ� ���� ������ ���� �������� #b�������� ����#k�� ���������. � ���ڸ� ���ϴ°�?\r\n";
                 hat += "\r\n#L0##i1003856# #b���� �������� ����#k\r\n#r(�������� ���� ���� 100�� �ʿ�)#k";
                 hat += "\r\n#L1##i1003857# #b������ �������� ����#k\r\n#r(���� �������� ���� 1��, �������� ���� ���� 200�� �ʿ�)#k";
                 hat += "\r\n#L2##i1003858# #bŽ���� �������� ����#k\r\n#r(������ �������� ���� 1��, �������� ���� ���� 1000�� �ʿ�)#k";
                 cm.sendSimple(hat);
             } else if (selection == 4) {
	var ten = 10;
	var total = ten - cm.getDayKey("7");
                // cm.sendOk("���� ���� ���� Ƚ���� " + total + "ȸ�ϼ�.");
	cm.sendOk("�׽�Ʈ �Ⱓ �������� ������ �Դϴ�.");
                 cm.dispose();
             }
         } else if (status == 2) {
             if (selection == 0) {
                 cm.sendNext("�������� ���ڸ� ����ڴ°�? ���� ������ ����� �����԰���?");
             } else if (selection == 1) {
                 cm.sendNext("������ �ִ� #b���� �������� ����#k�� �� �� ��ȭ�ϰڳ�? ��ȭ��, ���� �ɼ��� �ٽ� �ʱ�ȭ �Ǵµ�, ���������?");
             } else if (selection == 2) {
                 cm.sendNext("������ �ִ� #b������ �������� ����#k�� �� �� ��ȭ�ϰڳ�? ��ȭ��, ���� �ɼ��� �ٽ� �ʱ�ȭ �Ǵµ�, ���������?");
             }
             rudy = selection;
         } else if (status == 3) {
             if (rudy == 0) {
                 if (cm.haveItem(4001455,100)) {
		cm.gainItem(4001455,-100);
		cm.gainItem(1003856,1);
	cm.sendOk("��ȯ�� �Ϸ�Ǿ���.");
	cm.dispose();
                 } else {
                     cm.sendNextPrev("����? �װɷδ� �������� ���ڷ� ���� ���� ����. �������� ���ڸ� ���Ѵٸ� ���� ���� 100���� �ʿ��ϳ�.");
                     cm.dispose();
                 }
             } else if (rudy == 1) {
                 if (cm.haveItem(4001455,200) && cm.haveItem(1003856,1)) {
		cm.gainItem(1003856,-1);
		cm.gainItem(4001455,-200);
		cm.gainItem(1003857,1);
	cm.sendOk("��ȯ�� �Ϸ�Ǿ���.");
	cm.dispose();
                 } else {
                     cm.sendNextPrev("����? �װɷδ� �������� ���ڸ� ��ȭ�� �� ����. �������� ���ڸ� ��ȭ�ϱ� ���Ѵٸ� ���� ���� 200���� #i1003856# ���� �������� ���� 1���� �ʿ��ϴٳ�.");
                     cm.dispose();
                 }
             } else if (rudy == 2) {
                 if (cm.haveItem(4001455,1000) && cm.haveItem(1003857,1)) {
		cm.gainItem(4001455,-1000);
		cm.gainItem(1003857,-1);
		cm.gainItem(1003858,1);
	cm.sendOk("��ȯ�� �Ϸ�Ǿ���.");
	cm.dispose();
             } else {
                     cm.sendNextPrev("����? �װɷδ� �������� ���ڸ� ��ȭ�� �� ����. �������� ���ڸ� ��ȭ�ϱ� ���Ѵٸ� ���� ���� 1000���� #i1003857# ������ �������� ���� 1���� �ʿ��ϴٳ�.");
                     cm.dispose();
                 }
             }
         }
     }
 }



