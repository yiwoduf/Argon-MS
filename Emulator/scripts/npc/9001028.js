var status = -1;

importPackage(Packages.constants);

function start() {
	var aa = cm.itemQuantity(4033302); // ������ ������
	    if (aa >= 20){
		var sel = "\r\n#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n\r\n#r[�ϰ� ����]#k #i4310175# #bM ����#k\r\n                               #r10 �� -  �ϰ� ����#k\r\n  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\r\n\r\n#r[���� ����]#k #i1004637# #b#z1004637##k\r\n                                #r�ý��� 500 / ��, �� 100 / ��Ƚ 8#k\r\n#L1##d*�� �ش� �������� �����ϰڽ��ϴ�.#k#l\r\n\r\n  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\r\n\r\n#r[���� ����]#k #i1102871# #b#z1102871##k\r\n                                #r�ý��� 500 / ��, �� 100 / ��Ƚ 6#k\r\n#L2##d*�� �ش� �������� �����ϰڽ��ϴ�.#k#l\r\n\r\n  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\r\n\r\n#r[���� ����]#k #i1082447# #b#z1082447##k\r\n                                #r�ý��� 500 / ��, �� 100 / ��Ƚ 4#k\r\n#L3##d*�� �ش� �������� �����ϰڽ��ϴ�.#k#l\r\n\r\n  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\r\n\r\n#r[���� ����]#k #i1132296# #b#z1132296##k\r\n                                #r�ý��� 500 / ��, �� 100 / ��Ƚ 2#k\r\n#L4##d*�� �ش� �������� �����ϰڽ��ϴ�.#k#l\r\n\r\n\r\n";
		} else {
		sel = "\r\n#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##r���� ���� ����� �ϼ����� ���Ͽ����ϴ�.#k#l\r\n\r\n\r\n";
            }
	    if (cm.getPlayer().getLevel() >= 160 && cm.getPlayer().getMapId() == 100000000) {
            var chat = "#fn������� Extrabold#�ȳ��ϼ���.? ��� ������� �����Ϸ� ���̳�����..?\r\n";
	    chat += "�ų�.. ������ ��ȿ ������.. ���� ������ �߻��ؼ�..\r\n";
	    chat += "���ظ� ���� ����� �������� �� ���� �ƴϿ���..\r\n";
	    chat += "���� ��ü ���� �����ؾ� �׳��� ���� �� �ִ� ����������..\r\n";
	    chat += "��ŵ�.. "+ServerConstants.serverName+" ��� ������μ� ���� �ɾ�ðھ��..?\r\n";
            chat += "\r\n--------------------------------------------------------------------------------\r\n";
	    chat += "#L100##fs13##r[����]#k #b���� ��� ���� Ȯ���ϱ�#k#l#fs12#\r\n";
	    chat += "\r\n--------------------------------------------------------------------------------\r\n";
            chat += "                   #d[���� / ī���� ���� ��� ������ ���]#k\r\n";
            chat += "--------------------------------------------------------------------------------\r\n";
	    chat += "\r\n#i4033302# #z4033302# (����, ī���� ���� ���)             #d("+aa+"/20)#k\r\n\r\n";
	    chat += "--------------------------------------------------------------------------------\r\n";
	    chat += ""+sel+"";
	    chat += "--------------------------------------------------------------------------------";
	    cm.sendSimple(chat);
	} else {
	cm.sendOk("#fn������� Extrabold##r* �÷��� ����#k\r\n\r\n#d- ���� 160 �̻� �� ĳ����\r\n- ����Ʈ�� ���� ���� �÷��� ����#k");
	cm.dispose();
        }
}
function action(mode, type, selection) {
        cm.dispose();
	if (selection == 0) {
		         cm.sendOk("#fn������� Extrabold##r������.. ���� ����� �����Ͻ� �� ���׿�..#k");
		         cm.dispose();
	} else if (selection == 100) {
	    cm.sendOk("#fn������� Extrabold##r[�ϰ� ����]#k #i4310175# #bM ����#k\r\n                                #r10 �� -  �ϰ� ����#k\r\n#r[���� ����]#k #i1004637# #b#z1004637##k\r\n                                #r�ý��� 500 / ��, �� 100 / ��Ƚ 8#k\r\n#r[���� ����]#k #i1102871# #b#z1102871##k\r\n                                #r�ý��� 500 / ��, �� 100 / ��Ƚ 6#k\r\n#r[���� ����]#k #i1082447# #b#z1082447##k\r\n                                #r�ý��� 500 / ��, �� 100 / ��Ƚ 4#k\r\n#r[���� ����]#k #i1132296# #b#z1132296##k\r\n                                #r�ý��� 500 / ��, �� 100 / ��Ƚ 2#k");
	} else if (selection == 1) {
	    if (cm.haveItem(4033302, 20)) {
		 if (cm.canHold(4310175) && cm.canHold(1004637)) {
			 cm.sendOk("#fn������� Extrabold#���������� ���� ����� ��ġ�̱���.!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310175# #bM ����#k #r10 ��#k\r\n#i1004637# #b#z1004637##k #r(�ý��� 500 / ��, �� 100 / ��Ƚ 8)#k");
			 cm.gainItem(4033302, -20);
			 cm.gainItem(4310175, 10);
			 cm.setAllStat(1004637,500,100,8);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ �Ǵ� ���â�� �� ���� �� �����ϴ�.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r������.. ���� ����� �����Ͻ� �� ���׿�..#k");
		 cm.dispose();	
		 }
	} else if (selection == 2) {
	    if (cm.haveItem(4033302, 20)) {
		 if (cm.canHold(4310175) && cm.canHold(1102871)) {
			 cm.sendOk("#fn������� Extrabold#���������� ���� ����� ��ġ�̱���.!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310175# #bM ����#k #r10 ��#k\r\n#i1102871# #b#z1102871##k #r(�ý��� 500 / ��, �� 100 / ��Ƚ 6)#k");
			 cm.gainItem(4033302, -20);
			 cm.gainItem(4310175, 10);
			 cm.setAllStat(1102871,500,100,6);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ �Ǵ� ���â�� �� ���� �� �����ϴ�.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r������.. ���� ����� �����Ͻ� �� ���׿�..#k");
		 cm.dispose();	
		 }
	} else if (selection == 3) {
	    if (cm.haveItem(4033302, 20)) {
		 if (cm.canHold(4310175) && cm.canHold(1082447)) {
			 cm.sendOk("#fn������� Extrabold#���������� ���� ����� ��ġ�̱���.!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310175# #bM ����#k #r10 ��#k\r\n#i1082447# #b#z1082447##k #r(�ý��� 500 / ��, �� 100 / ��Ƚ 4)#k");
			 cm.gainItem(4033302, -20);
			 cm.gainItem(4310175, 10);
			 cm.setAllStat(1082447,500,100,4);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ �Ǵ� ���â�� �� ���� �� �����ϴ�.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r������.. ���� ����� �����Ͻ� �� ���׿�..#k");
		 cm.dispose();	
		 }
	} else if (selection == 4) {
	    if (cm.haveItem(4033302, 20)) {
		 if (cm.canHold(4310175) && cm.canHold(1132296)) {
			 cm.sendOk("#fn������� Extrabold#���������� ���� ����� ��ġ�̱���.!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n#i4310175# #bM ����#k #r10 ��#k\r\n#i1132296# #b#z1132296##k #r(�ý��� 500 / ��, �� 100 / ��Ƚ 2)#k");
			 cm.gainItem(4033302, -20);
			 cm.gainItem(4310175, 10);
			 cm.setAllStat(1132296,500,100,2);
	                 cm.showEffect(false,"monsterPark/clear");
                         cm.playSound(false,"Field.img/Party1/Clear");
			 cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ �Ǵ� ���â�� �� ���� �� �����ϴ�.#k");
		         cm.dispose();	
			}
	    } else {		         
		 cm.sendOk("#fn������� Extrabold##r������.. ���� ����� �����Ͻ� �� ���׿�..#k");
		 cm.dispose();	
		 }
	} else {
	cm.sendOk("#fn������� Extrabold##b��� ������μ��� ũ�� ū �ںν���..!#k");
	cm.dispose();		
}
}