
function start() {
 if (true) {
	    var chat = "�ȳ��ϼ���, "+ cm.getPlayer().getName() +" �Ե� ���� ���� �ñ��� �м��� ������ �����Ű���? #bũ����Ż#k�� ������ ��ŵ� �����մϴ�. \r\n";
	    //chat += "#L4##b[�ö�ö�]������ ���ؼ�#k#e#r(���̵�:�ڡڡڡ١�)#k#n\r\n";
            chat += "#L0##b#v4251202#x3 ���� �ֽ� ĳ�þ����� ����!";
chat += "\r\n#L1##v4251002#x40 ���� �ֽ� ĳ�þ����� ����!";
   	    cm.sendSimple(chat);
}
}
function action(mode, type, selection) {
cm.dispose();
        if (selection == 0) {
        	cm.dispose();
	cm.openNpc(9310016);

	 } else if (selection == 1) {
	 	cm.dispose();
	cm.openNpc(9310017);

	}
	}
    




