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
                 cm.sendNext("�ٽ� �� ������ ���� ���� �ɾ� �ְ�.");
             }
             cm.dispose();
             return;
         }
         if (mode == 1)
             status++;
         else
             status--;
         if (status == 0) {
	if (cm.getMapId() == 925100700) {
	cm.warp(910002000,0);
	cm.removeAll(4001120);
	cm.removeAll(4001121);
	cm.removeAll(4001122);
	cm.removeAll(4001117);
	cm.dispose();
	} else {
             var main = "������ �ϰڳ�?#b\r\n";
	if (cm.getMapId() != 925100000 || cm.getMapId() != 925100700) {
             main += "\r\n#L0#������ �̾߱⸦ ��´�.";
}
             main += "\r\n#L1#���������� ������.";
             cm.sendSimple(main);
}
         } else if (status == 1) {
             if (selection == 0) {
                  if (cm.getMapId() == 925100100) {
                     if (cm.getPlayer().getEventInstance().getProperty("DavyzonePQ_Monster") == 9999) {
                         cm.sendNext("�����ϰ�! �̰������� ���� �������� ���������� �𸣴� ���ϼ�. ������ �׷��ٰ� �̰��� �׳� ������ �� ����. �������� ���� ��ҷ� ���� ��Ż�� ������ ������ �ɾ� �ξ����� ������.");
}
                 } else if (cm.getMapId() == 925100400 && cm.getPlayer().getEventInstance().getProperty("DavyzonePQ_Door") == null) {
                    // cm.worldMessage(6,"���踦 ã�� �������� ���� �� ������ ������ ���� �ݾƾ� �մϴ�.");
                     cm.sendNext("�ڳ׵��� �������� �ö�ź ���� ��� ������ �˰� �Ǿ��ٳ�. ����̾��� �༮����� ���� ���������� ����. �̴�ζ�� ���� �����״� �켱 �������� ������ ���� �ݾƾ� �Ұɼ�.");
                 } else {
                     cm.sendNext("��ȭ�� �����ϴ�.");
                     cm.dispose();
                 }

             } else if (selection == 1) {
                 cm.sendYesNo("����Ʈ�� �ߴ��ϰ� �� ������ �����ڳ�?");
             }
             rudy = selection;
         } else if (status == 2) {
             if (rudy == 0) {
                 if (cm.getMapId() == 925100100) {
                     cm.sendNextPrev("������ Ǫ�µ� �ʿ��� ���� #b������ ��ǥ#k���. �������� �����ϴ� ��������. �������� ���� �տ� �������� �����ϸ� ������ �ڿ��� Ǯ���ɼ�. �׷��� �̰��� �ִ� �������� ����� #b������ ��ǥ#k�� ���� ������ �ָ�, ��Ż�� ������ Ǯ�� ���ڳ�.");
                 } else if (cm.getMapId() == 925100400 && cm.getPlayer().getEventInstance().getProperty("DavyzonePQ_Door") == null) {
		cm.getPlayer().getEventInstance().setProperty("DavyzonePQ_Door","1");
                     cm.sendNextPrev("���� �ݴµ� �ʿ��� #b������ �迭��#k�� �������� ������ �����ɼ�. �׵��� ����ġ�� �������� ���� �ݰԳ�! �������ŵ� ������ ��Ź�ϸ� �ȴٳ�.");
                     cm.dispose();
                 }
             } else if (rudy == 1) {
                 cm.getEventInstance().unregisterPlayer(cm.getPlayer());
                 cm.warp(925100700,0);
                 cm.dispose();
             }
         } else if (status == 3) {
             cm.sendNextPrev("���� �� �������� �������� �ɼ�. �׵��� ����ġ�� #b��ǥ#k�� �����ٵ�, ���� ������ ��ǥ ���� ������ �ڵ����� �̼��� �Ϸ�Ǵ� ���� ���ð�.");
         } else if (status == 4) {
	cm.getPlayer().spawn�Ժ��();
             cm.getEventInstance().setProperty("DavyzonePQ_Monster","0");
	cm.getEventInstance().setProperty("Token_1","0"); // ���� ������ǥ
	cm.getEventInstance().setProperty("DavyzonePQ_Token","0"); // ��ǥ������ ����
             cm.dispose();
         }
     }
 }



