/*

������ ���ð�(eunseekyung@nate.com)
	1�� ���� ��� �¶��� ��ũ��Ʈ ���� (projectchiu16@nate.com)

*/

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            var chat = "#e#b[AURORA ONLINE]#k�� ȭ�� �ý����Դϴ�. ����� �������ּ��� \r\n";
	    chat += "\r\n#L1##b�޼� �� �ʰ淮ȭ�� ��ȯ�ϱ�";
	    cm.sendSimple(chat);

} if (selection == 1) {
	       var chat = "#e#b ���� [AURORA ONLINE]ȭ�� ���ǽ��Դϴ�.#k\r\n";
               chat += "\r\n#r21���� �޼� �Ѱ��� �Դϴ�. �޼Ұ� �ȵ��͵� ���� ����� å���� ������ �˸��ϴ�.#e";
               chat += "\r\n#L100##e#r[#i4000001# ��Ÿ ������(1:7500) ]  ��ȯ#e";
               chat += "\r\n#L200##e[#i4310185# 1�� �� #r�޼�#n#eõ��  ]  ��ȯ#e";
               chat += "\r\n#L201##e[#i4310185# 10�� �� #r�޼�#n#e1��  ]  ��ȯ#e";
               chat += "\r\n#L202##e[#i4310185# 100�� �� #r�޼�#n#e10��  ]  ��ȯ#e";
               chat += "\r\n#L300##e[#i4310184# 1�� �� #r�޼�#n#e5õ��  ]  ��ȯ#e";
               chat += "\r\n#L301##e[#i4310184# 10�� �� #r�޼�#n#e5��  ]  ��ȯ#e";
               chat += "\r\n#L400##e[#i4310108# 1�� �� #r�޼�#n#e1��  ]  ��ȯ#e";
               chat += "\r\n#L401##e[#i4310108# 10�� �� #r�޼�#n#e10��  ]  ��ȯ#e";
               chat += "\r\n#L500##e[#r�޼�#n#eõ�� �� #i4310185# 1��  ]  ��ȯ#e";
               chat += "\r\n#L501##e[#r�޼�#n#e5õ�� �� #i4310184# 1��  ]  ��ȯ#e";
               chat += "\r\n#L502##e[#r�޼�#n#e1�� �� #i4310108# 1�� ]  ��ȯ#e";
               chat += "\r\n#L503##e[#r�޼�#n#e10�� �� #i4310108# 10�� ]  ��ȯ#e";
               cm.sendSimple(chat);


            }  if (selection == 100) {
		cm.dispose();
		cm.openNpc (1012112);


            }  if (selection == 200) {
		if (cm.haveItem(4310185,1)) {
		    if (cm.canHold(4310185)) {
			cm.gainItem(4310185, -1);
			cm.gainMeso(10000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �ִ��� �ٽ� �ѹ� Ȯ���� �ּ���!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("ȭ�� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 201) {
		if (cm.haveItem(4310185,10)) {
		    if (cm.canHold(4310185)) {
			cm.gainItem(4310185, -10);
			cm.gainMeso(100000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �ִ��� �ٽ� �ѹ� Ȯ���� �ּ���!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("ȭ�� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 202) {
		if (cm.haveItem(4310185,100)) {
		    if (cm.canHold(4310185)) {
			cm.gainItem(4310185, -100);
			cm.gainMeso(1000000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �ִ��� �ٽ� �ѹ� Ȯ���� �ּ���!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("ȭ�� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 300) {
		if (cm.haveItem(4310184,1)) {
		    if (cm.canHold(4310184)) {
			cm.gainItem(4310184, -1);
			cm.gainMeso(50000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �ִ��� �ٽ� �ѹ� Ȯ���� �ּ���!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("ȭ�� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 301) {
		if (cm.haveItem(4310184,10)) {
		    if (cm.canHold(4310184)) {
			cm.gainItem(4310184, -10);
			cm.gainMeso(500000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �ִ��� �ٽ� �ѹ� Ȯ���� �ּ���!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("ȭ�� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 400) {
		if (cm.haveItem(4310108,1)) {
		    if (cm.canHold(4310108)) {
			cm.gainItem(4310108, -1);
			cm.gainMeso(100000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �ִ��� �ٽ� �ѹ� Ȯ���� �ּ���!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("ȭ�� �����մϴ�.");
		    cm.dispose();

}


            }  if (selection == 401) {
		if (cm.haveItem(4310108,10)) {
		    if (cm.canHold(4310108)) {
			cm.gainItem(4310108, -10);
			cm.gainMeso(1000000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿâ�� �� ������ �ִ��� �ٽ� �ѹ� Ȯ���� �ּ���!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("ȭ�� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 500) {
		if (cm.getMeso() >= 10000000) {
			cm.gainItem(4310185, 1);
			cm.gainMeso(-10000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		} else {
		    cm.sendOk("�޼Ұ� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 501) {
		if (cm.getMeso() >= 50000000) {
			cm.gainItem(4310184, 1);
			cm.gainMeso(-50000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		} else {
		    cm.sendOk("�޼Ұ� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 502) {
		if (cm.getMeso() >= 100000000) {
			cm.gainItem(4310108, 1);
			cm.gainMeso(-100000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		} else {
		    cm.sendOk("�޼Ұ� �����մϴ�.");
		    cm.dispose();

}

            }  if (selection == 503) {
		if (cm.getMeso() >= 1000000000) {
			cm.gainItem(4310108, 10);
			cm.gainMeso(-1000000000);
		        cm.sendOk("��ȯ�Ϸ�.");
			cm.dispose();
		} else {
		    cm.sendOk("�޼Ұ� �����մϴ�.");
		    cm.dispose();

}



		}
	}
}



