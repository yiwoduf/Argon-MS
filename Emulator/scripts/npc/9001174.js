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
            var chat = "#e#b[AURORA ONLINE]#k�� ȫ�� ���� ��ȯ �ý����Դϴ�. ����� �������ּ��� \r\n";
	    chat += "\r\n#L1##b�޼ҹ� ��Ÿ���� �� ȫ������ ��ȯ�ϱ�";
	    cm.sendSimple(chat);

} if (selection == 1) {
	       var chat = "#e#b ���� [AURORA ONLINE]ȫ�� ���� ��ȯ ���ǽ��Դϴ�.#k\r\n";
               chat += "\r\n#L100##e[#i4310129# 10�� �� #r�޼�#n#e3��  ]  ��ȯ#e";
               chat += "\r\n#L200##e[#i4310129# 20�� �� #r�޼�#n#e6��  ]  ��ȯ#e";
               chat += "\r\n#L300##e[#i4310129# 30�� �� #r�޼�#n#e10��  ]  ��ȯ#e";
               chat += "\r\n#L400##e[#i4310129# 15�� �� #i2591088# 1��  ]  ��ȯ#e";
               chat += "\r\n#L500##e[#i4310129# 3�� �� #i4033247# 1��  ]  ��ȯ#e";
               chat += "\r\n#L600##e[#i4310129# 30�� �� #i4033247# 10��  ]  ��ȯ#e";
               cm.sendSimple(chat);


            }  if (selection == 100) {
		if (cm.haveItem(4310129,10)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -10);
			cm.gainMeso(300000000);
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


            }  if (selection == 200) {
		if (cm.haveItem(4310129,20)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -20);
			cm.gainMeso(600000000);
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
		if (cm.haveItem(4310129,30)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -30);
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

            }  if (selection == 400) {
		if (cm.haveItem(4310129,15)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -15);
			cm.gainItem(2591088, 1);
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
		if (cm.haveItem(4310129,3)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -3);
			cm.gainItem(4033247, 1);
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


            }  if (selection == 600) {
		if (cm.haveItem(4310129,30)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -30);
			cm.gainItem(4033247, 10);
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



		}
	}
}



