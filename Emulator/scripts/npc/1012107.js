/*
	����(leehodud302@naver.com)����  ��ũ��Ʈ �����Դϴ�.
*/
var status = -1;

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
	if(mode == 1) {
		status++;
	} else {
		status--;
		cm.dispose();
	}
	if (status == 0) {
		if(mode == 0)
			cm.dispose();
		else
		cm.sendGetText("#r#e[����ĳ�ð˻�]#n#k\r\n#r#e[�ý��� 400 ��/�� 40]#n#k #i4310038# 100���� ���Ű����մϴ�.\r\nĳ�þ����� �α��� �̻� �Է����ּ���.");
	} else if (status == 1) {
		var itemid = cm.getText();
		cm.SearchItem(itemid);
	} else if (status == 2) {
                if (cm.haveItem(4310038, 100)) {
                cm.gainItem(4310038, -100);
		cm.sendOk("#i"+selection+"# #fs14##e#b#t"+selection+"##n#k#fs12#��(��) ȹ���ϼ̽��ϴ�.");
		cm.gainSponserItem(selection,'[ȫ���˻�]',400,40,0);
		cm.dispose();
                } else {
                cm.sendOk("���������� �����մϴ�.");
                cm.dispose();
               }
	}
}