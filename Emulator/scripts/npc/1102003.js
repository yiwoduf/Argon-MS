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
            var chat = "#e#b[AURORA ONLINE]#k�� �Ŀ�����Ʈ ��ȯ �ý����Դϴ�. ����� �������ּ��� \r\n";
	    chat += "\r\n#L1##b�޼ҹ� Ȳ�ݻ� ��ǳ�� �� �Ŀ�����Ʈ ��ȯ�ϱ�";
	    cm.sendSimple(chat);

} if (selection == 1) {
	       var chat = "#e#b ���� [AURORA ONLINE]�Ŀ�����Ʈ ��ȯ ���ǽ��Դϴ�.#k\r\n";
               chat += "\r\n#L100##e#r[ #b�Ŀ�����Ʈ#k 3õ#r -> #r�޼�#n#e5�� ]  ��ȯ#e";
               chat += "\r\n#L200##e[ #b�Ŀ�����Ʈ#k 6õ#r �� #r�޼�#n#e10��  ]  ��ȯ#e";
               chat += "\r\n#L300##e[#b�Ŀ�����Ʈ#k 1õ#r �� #r#i4033247##n#e1��  ]  ��ȯ#e";
               chat += "\r\n#L400##e[#b�Ŀ�����Ʈ#k 1��#r �� #r#i4033247##n#e10��  ]  ��ȯ#e";
               chat += "\r\n#L500##e[#b�Ŀ�����Ʈ#k 10��#r �� #r#i4033247##n#e100��  ]  ��ȯ#e";
               cm.sendSimple(chat);


            }  if (selection == 100) {
		if (cm.getRC() > 3000) {
		cm.getPlayer().loseRC(3000);
		cm.gainMeso(500000000);
		cm.sendOk("��ȯ�� �Ϸ�Ǿ����ϴ�.");

		} else {
		    cm.sendOk("�Ŀ�����Ʈ�� �����մϴ�.");
		    cm.dispose();
}


            }  if (selection == 200) {
		if (cm.getRC() > 6000) {
		cm.getPlayer().loseRC(6000);
		cm.gainMeso(1000000000);
		cm.sendOk("��ȯ�� �Ϸ�Ǿ����ϴ�.");

		} else {
		    cm.sendOk("�Ŀ�����Ʈ�� �����մϴ�.");
		    cm.dispose();
}


            }  if (selection == 300) {
		if (cm.getRC() > 1000) {
			cm.getPlayer().loseRC(1000);
			cm.gainItem(4033247, 1);
		        cm.sendOk("��ȯ�Ϸ�.");

		} else {
		    cm.sendOk("�Ŀ�����Ʈ�� �����մϴ�.");
		    cm.dispose();

}


            }  if (selection == 400) {
		if (cm.getRC() > 10000) {
			cm.getPlayer().loseRC(10000);
			cm.gainItem(4033247, 10);
		        cm.sendOk("��ȯ�Ϸ�.");

		} else {
		    cm.sendOk("�Ŀ�����Ʈ�� �����մϴ�.");
		    cm.dispose();

}



            }  if (selection == 500) {
		if (cm.getRC() > 100000) {
			cm.getPlayer().loseRC(100000);
			cm.gainItem(4033247, 100);
		        cm.sendOk("��ȯ�Ϸ�.");

		} else {
		    cm.sendOk("�Ŀ�����Ʈ�� �����մϴ�.");
		    cm.dispose();

}






		}
	}
}



