
var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        var chat = "#e<��Ƽ����Ʈ : ������ ����>#n\r\n�ȳ�? �� ���� ��Ű��� ��. ������ ž�� �����ϰ� ������ ������ �̾߱� �϶��~ ��, ��Ƽ�� ����, ������, ����, �ü�, ������ ���� 1�� �̻� ������ ��Ű�� �ູ�� �ɾ� �ٰ�.\r\n\r\n";
	chat += "#b";
	chat += "#L1#������ ��û�Ѵ�.\r\n";
	chat += "#L2#������ ž�� ���� ���´�.\r\n";
	chat += "#L3#��Ű���� ���� ���� �ش�.\r\n";
	chat += "#L4#������ ������ �ٸ� �����۰� �ٲ۴�.\r\n";
	chat += "#L5#�Բ� �� ��Ƽ���� ã�´�.\r\n";
	chat += "#L6#������ ���� ���� Ƚ���� Ȯ���Ѵ�.\r\n";
	cm.sendSimple(chat);
	} else if (status == 1) {
	if (selection == 0) {
	      if (cm.getParty() != null) {
                     if (cm.isLeader() == true) {
                         if (cm.getParty().getMembers().size() >= 3) {
                             if (cm.checkLevel(70,250)) {
                                 if (cm.allMembersHere() == true) {
                                         var em = cm.getEventManager("PartyQuest");
				var eim = em.readyInstance();
                                         eim.setProperty("Global_StartMap","920010400");
                                         eim.setProperty("Global_ExitMap","920011200");
                                         eim.startEventTimer(240000);
                                         eim.registerParty(cm.getParty(),cm.getMap()); 
                                         cm.getEventInstance().setProperty("DavyzonePQ_Gate","0");
                                         cm.getPlayer().getClient().getChannelServer().getMapFactory().getMap(925100000).respawn(false, 0);
                                         cm.dispose();
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
    }
}
