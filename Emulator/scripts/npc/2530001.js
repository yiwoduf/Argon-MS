var status = -1;

function start() {
	var vh = cm.itemQuantity(4033975);
	    if (vh >= 1){
		var sel = "#L1##b* ������ �����Խ��ϴ�.#k#l\r\n\r\n��������������������������������������������������������\r\n";
		} else {
		sel = "#L0##r* ���� ������ �߰����� ���Ͽ����.#k#l\r\n\r\n��������������������������������������������������������\r\n";
}
	    var chat = "#fn������� Extrabold#�� ��δ�.. �� �̻� �����־��..\r\n"
            chat += "������ ������ #b����#k �� �ִ�ϴ�...\r\n";
            chat += "�� #b����#k �� �帱�״� ���� �� �����ּ���..\r\n";
            chat += "�� �̻��� ���� ���ϴ� ���� ������ ���� ������\r\n";
            chat += "�� �Ʒ� ���.. #d���� ����#k �� ������ �����Ⱦ��..\r\n";
            chat += "���� ����� ��� ���� ������ �ִ����� �𸣰�����..\r\n";
            chat += "�����... ������ �ε� ã�ƿ��ּ���..\r\n";
	    chat += "��������������������������������������������������������\r\n\r\n";
	    chat += "#i4033975# #b#z4033975##k������("+vh+"/1)\r\n\r\n";
	    chat += "��������������������������������������������������������\r\n";
	    chat += ""+sel+"";
	    cm.sendSimple(chat);
}

function action(mode, type, selection) {
        cm.dispose();
	if (selection == 0) {
			 cm.sendOk("#fn������� Extrabold##r�� ������ ������ �ּ���...#k");
		         cm.dispose();
	} else if (selection == 1) {
	    if (cm.haveItem(4033975, 1)) {
	       if (cm.canHold(4031217)) {
			 cm.gainItem(4033975, -1);
			 cm.gainItem(4031217, 1);
                         cm.sendOk("#fn������� Extrabold#������ ��������!..\r\n��Ӵ�� #b����#k �� �帱�Կ�..\r\n\r\n#d(������ ���ؼ� ���� ������ ��Ż�� �̵����ּ���.)#k");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ĭ �̻� ����ּ���..#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r��ſ��Դ� ������ ���׿�..#k");
		 cm.dispose();	
		 }
}
}