function start() {
	cm.sendSimple("#fn������� Extrabold#�ȳ��ϼ���? #dĳ���� AP ��ȭ#k �� ���� �����Ű���?\r\n�Ʒ��� �׸��� ���Ͻô� �о߸� �������ּ���.\r\n#L0##bĳ���� AP ��ȭ ����#k\r\n#L1##bĳ���� AP ��ȭ�� ���� ����#k");
}

function action (mode, type, selection) {
	cm.dispose();
if (selection == 0) {
          var rand = Math.floor(Math.random() * 17);

	     if (cm.haveItem(4310129,100) && rand == 0) {
                 cm.getPlayer().gainAp(1);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 1 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 1 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 1) {
                 cm.getPlayer().gainAp(1);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 1 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 1 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 2) {
                 cm.getPlayer().gainAp(2);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 2 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 2 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 3) {
                 cm.getPlayer().gainAp(2);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 2 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 2 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 4) {
                 cm.getPlayer().gainAp(3);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 3 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 3 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 5) {
                 cm.getPlayer().gainAp(3);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 3 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 3 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 6) {
                 cm.getPlayer().gainAp(4);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 4 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 4 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 7) {
                 cm.getPlayer().gainAp(4);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 4 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 4 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 8) {
                 cm.getPlayer().gainAp(5);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 5 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 5 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 9) {
                 cm.getPlayer().gainAp(5);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 5 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 5 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 10) {
                 cm.getPlayer().gainAp(6);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 6 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 6 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 11) {
                 cm.getPlayer().gainAp(6);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 6 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 6 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 14) {
                 cm.getPlayer().gainAp(7);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 7 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 7 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 15) {
                 cm.getPlayer().gainAp(8);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 8 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 8 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 16) {
                 cm.getPlayer().gainAp(9);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 9 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 9 �� �ö󰬽��ϴ�.");

                } else if (cm.haveItem(4310038,30) && rand == 17) {
                 cm.getPlayer().gainAp(10);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "�����Ƽ ����Ʈ + 10 �� �ö󰬽��ϴ�.");
                 cm.getPlayer().dropMessage(5, "�����Ƽ ����Ʈ + 10 �� �ö󰬽��ϴ�.");

            } else {
                cm.sendOk("#fn������� Extrabold##b���۷��� ����#k �� #r30 ��#k ���������� Ȯ�����ּ���.");
                cm.dispose();
            }
	} else if (selection == 1) {
		cm.sendOk("#fn������� Extrabold##dĳ���� AP ��ȭ#k �� �����е��� ���� ���õ� �ý������ν�\r\n#b���۷��� ����#k ���� ����ϴ� #dAP ��ȭ ���#k �Դϴ�.\r\n\r\n��ȭ���� #b���۷��� ����#k #r100 ��#k �� �Ҹ�Ǹ�\r\n������ �������� #r1 ~ 10 AP#k �� ���޵˴ϴ�.");
		cm.dispose();
}
}