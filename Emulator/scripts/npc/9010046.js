/*
   ��ų������ ��ũ��Ʈ
   ������ - ���(love_789456) = ��ũ����(yhalks)

    �����߻� �� ���� �� 2�������� ��α׿����� �մϴ�

    ������ ��α� : http://yhalks.xe.to
*/

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

	cm.sendSimple ("#e�ȳ�,���� ĳ�ñ�ȯ�� ���ִ� �Ȱ��̾�!#k\r\n#e#d" +
		  "#k\r\n#L100##rĳ�� �����ϱ�(���������");

 
	  } else if (selection == 100) {
                cm.sendSimple ("ĳ�� ��ȯ�� #rLv.100#k���� ���� �ϸ�, �ִ� �ѵ��� 90���� �Դϴ�.\r\n#Cgray#(ĳ�� ���� 1:100)#d" +
                 "#k\r\n#L1##r#i4310080##z4310080#30���� 1�� ĳ�� ��ȯ�ϱ�" +
                 "#k\r\n#L2##r#i4310080##z4310080#300���� 15�� ĳ�� ��ȯ�ϱ�" +
                 "#k\r\n#L3##r#i4310080##z4310080#900���� 50�� ĳ�� ��ȯ�ϱ�");

                } else if (selection == 1) {
		if (cm.haveItem(4310080, 30)) {
				cm.sendOk ("#i4310080##z4310080#���� 1�� ĳ�÷� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainItem (4310080, -30);
                   		cm.gainNX (10000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("#e#i4310080##z4310080#�� �����մϴ�. #k   #r(90�� �ѵ�)#n");
                   		cm.dispose();
			        
			}           
                } else if (selection == 2) {
		if (cm.haveItem(4310080, 300)) {
				cm.sendOk ("#i4310080##z4310080#���� 15�� ĳ�÷� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainItem (4310080, -300);
                   		cm.gainNX (150000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("#i4310080##z4310080#�����Ծƴϸ� �� �ִ��ѵ��� ���� ����(90�� �ѵ�)");
                   		cm.dispose();
			        
			} 
                } else if (selection == 3) {
		if (cm.haveItem(4310080, 900)) {
				cm.sendOk ("#i4310080##z4310080#���� 50�� ĳ�÷� ��ȯ�Ͽ����ϴ�!");
                   		cm.gainItem (4310080, -900);
                   		cm.gainNX (500000);
                   		cm.dispose();
                     	} else {
                   		cm.sendOk ("#i4310080##z4310080#�����Ծƴϸ� �� �ִ��ѵ��� ���� ����(90�� �ѵ�)");
                   		cm.dispose();
			        
			} 
			
		}
	}
}


