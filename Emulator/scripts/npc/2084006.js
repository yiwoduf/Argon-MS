var status = 0;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == -1) {
		cm.dispose();
	} else {
		if (mode == 0 && status == 0) {
			cm.dispose();
			return;
		}
		if (mode == 1)
			status++;
		else
			status--;
		if (status == 0) {

	cm.sendSimple ("ĳ�� ��ȯ�� #rLv.30#k���� ���� �ϸ�, �ִ� �ѵ��� 90���� �Դϴ�.#e#d" +
		  "#k\r\n#L100##r�޼ҷ� ĳ�� �����ϱ�" +
		  "#k\r\n#L200##bĳ�÷� �޼� �����ϱ�");

 
	  } else if (selection == 100) {
                cm.sendSimple ("ĳ�� ��ȯ�� #rLv.30#k���� ���� �ϸ�, �ִ� �ѵ��� 90���� �Դϴ�.#d" +
                 "#k\r\n#L1##r1,000,000 �޼ҷ� 10,000 ĳ�� ��ȯ�ϱ�" +
                 "#k\r\n#L2##r500,000 �޼ҷ� 5,000 ĳ�� ��ȯ�ϱ�" +
                 "#k\r\n#L3##r250,000 �޼ҷ� 2,500 ĳ�� ��ȯ�ϱ�" +
                 "#k\r\n#L4##r100.000 �޼ҷ� 1,000 ĳ�� ��ȯ�ϱ�" +
                 "#k\r\n#L5##r50,000 �޼ҷ� 500 ĳ�� ��ȯ�ϱ�");

 
	  } else if (selection == 200) {
                cm.sendSimple ("ĳ�� ��ȯ�� #rLv.30#k���� ���� �ϸ�, �ִ� �ѵ��� 90���� �Դϴ�.#d" +
                 "#k\r\n#L6##b10,000 ĳ�÷� 900,000 �޼� ��ȯ�ϱ�" +
                 "#k\r\n#L7##b5,000 ĳ�÷� 400,000 �޼� ��ȯ�ϱ�" +
                 "#k\r\n#L8##b2,500 ĳ�÷� 200,000 �޼� ��ȯ�ϱ�" +
                 "#k\r\n#L9##b1,000 ĳ�÷� 90,000 �޼� ��ȯ�ϱ�" +
                 "#k\r\n#L10##b500 ĳ�÷� 50,000 �޼� ��ȯ�ϱ�");

                } else if (selection == 1) {
			 if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 5000000 && cm.getPlayer().getNX() < 399999) {
				cm.sendOk (" 1,000,000 �޼Ҹ� 10,000 ĳ�÷� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (-1000000);
                   		cm.gainNX (10000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ô� #rLv.30#k���� ��ȯ ���� �մϴ�.\r\n�޼Ұ� �����ϰų� ĳ�� �ִ��ѵ����� �Ѿ����ϴ�.(�ִ� 90��)");
                   		cm.dispose();
			        
			}                  	
                } else if (selection == 2) {
			if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 10000000 && cm.getPlayer().getNX() < 850000) {
		 		cm.sendOk ("500,000 �޼Ҹ� 5,000 ĳ�÷� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (-500000);
                   		cm.gainNX (5000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ô� #rLv.30#k���� ��ȯ ���� �մϴ�.\r\n�޼Ұ� �����ϰų� ĳ�� �ִ��ѵ����� �Ѿ����ϴ�.(�ִ� 90��)");
                   		cm.dispose();

                   	}

                } else if (selection == 3) {
			if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 1000000 && cm.getPlayer().getNX() < 895000) {
				cm.sendOk ("250,000 �޼Ҹ� 2,500 ĳ�÷� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (-250000);
                   		cm.gainNX (2500);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ô� #rLv.30#k���� ��ȯ ���� �մϴ�.\r\n�޼Ұ� �����ϰų� ĳ�� �ִ��ѵ����� �Ѿ����ϴ�.(�ִ� 90��)");
                   		cm.dispose();
                   	}
                } else if (selection == 4) {
			if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 100000 && cm.getPlayer().getNX() < 899500) {
				cm.sendOk ("100,000 �޼Ҹ� 1000 ĳ�÷� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (-100000);
                   		cm.gainNX (1000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ô� #rLv.30#k���� ��ȯ ���� �մϴ�.\r\n�޼Ұ� �����ϰų� ĳ�� �ִ��ѵ����� �Ѿ����ϴ�.(�ִ� 90��)");
                   		cm.dispose();
                   	}
                } else if (selection == 5) {
			if (cm.getPlayerStat("LVL") >= 29 && cm.getPlayer().getMeso() >= 10000 && cm.getPlayer().getNX() < 899950) {
				cm.sendOk ("50,000 �޼Ҹ� 500 ĳ�÷� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (-50000);
                   		cm.gainNX (500);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ô� #rLv.30#k���� ��ȯ ���� �մϴ�.\r\n�޼Ұ� �����ϰų� ĳ�� �ִ��ѵ����� �Ѿ����ϴ�.(�ִ� 90��)");
                   		cm.dispose();

			}
                } else if (selection == 6) {
			 if (cm.getPlayer().getNX() >= 10000) {
				cm.sendOk ("10,000 ĳ�ø� 900,000 �޼ҷ� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (900000);
                   		cm.gainNX (-10000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ð� �����մϴ�!");
                   		cm.dispose();
			        
			}                  	
                } else if (selection == 7) {
			if (cm.getPlayer().getNX() >= 5000) {
				cm.sendOk ("5,000 ĳ�ø� 400,000 �޼ҷ� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (400000);
                   		cm.gainNX (-5000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ð� �����մϴ�!");
                   		cm.dispose();
                   	}
                } else if (selection == 8) {
			if (cm.getPlayer().getNX() >= 2500) {
				cm.sendOk ("2,500 ĳ�ø� 200,000 �޼ҷ� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (200000);
                   		cm.gainNX (-2500);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ð� �����մϴ�!");
                   		cm.dispose();
                   	}
                } else if (selection == 9) {
			if (cm.getPlayer().getNX() >= 1000) {
				cm.sendOk ("1,000 ĳ�ø� 90,000 �޼ҷ� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (90000);
                   		cm.gainNX (-1000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ð� �����մϴ�!");
                   		cm.dispose();
                   	}
                } else if (selection == 10) {
			if (cm.getPlayer().getNX() >= 500) {
				cm.sendOk ("500 ĳ�ø� 50,000 �޼ҷ� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainMeso (50000);
                   		cm.gainNX (-500);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("ĳ�ð� �����մϴ�!");
                   		cm.dispose();
             
                		

			}
		}
	}
}


