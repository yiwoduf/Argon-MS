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
               chat += "\r\n#L100##e#r[#i4000001# ��Ÿ ������(1:7500) ]  ��ȯ#e";
               chat += "\r\n#L200##e[#i4310185# 1�� �� #r�޼�#n#eõ��  ]  ��ȯ#e";
               chat += "\r\n#L300##e[#i4310184# 1�� �� #r�޼�#n#e5õ��  ]  ��ȯ#e";
               chat += "\r\n#L400##e[#i4310108# 1�� �� #r�޼�#n#e1��  ]  ��ȯ#e";
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
	}
}



