

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
         
	       var Lcoin1 = cm.itemQuantity(4442100);
	       var Lcoin = cm.itemQuantity(4442000);
               
	       var chat = "\r\n";
	       chat += "#k#e���� #b#h0##k����\r\n#d#i4442100# A�� ������ ��� ���� #r#e"+ Lcoin1 +" #n#k#k#n\r\n\r\n"
	       chat += "#k#e#d#i4442000# ������ �� ���� #r#e"+ Lcoin +" #n#k#k#n\r\n\r\n"
               

	       chat += "#r#e#L9999999#������\r\n\r\r\n";


	       chat += "#L20001#\r\n#r#i4442100#  #e#r1000#k#n(��) #i4031144#[������ ����] #e#r1��#k#n\r\n";

               chat += "#L20002#\r\n#r#i4442000#  #e#r100#k#n(��) #i4031144#[������ ����] #e#r1��#k#n\r\n";
	      
	       
               chat += "#L20003#\r\n#r#i4442000#  #e#r1000#k#n(��) #i4031144#[������ ����] #e#r10��#k#n\r\n";

	    


	   

	       cm.sendSimple(chat);

	    }  if (selection >= 9999999) {
		    cm.dispose();
    } else if (selection == 20001) {
		if (cm.haveItem(4442100, 1000)) {
		    if (cm.canHold(4031144)) {
		        cm.sendOk("#rA�� ������ ���#k�� #r#i4031144#  1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4442100, -1000);
			cm.gainItem(4031144,1);
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�����ǵ�#k�� �����մϴ�.");
		    cm.dispose();

}	
    } else if (selection == 20002) {
		if (cm.haveItem(4442000, 100)) {
		    if (cm.canHold(4031144)) {
		        cm.sendOk("#r������ ��#k�� #r#i4031144#  1��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4442000, -100);
			cm.gainItem(4031144,1);
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�����ǵ�#k�� �����մϴ�.");
		    cm.dispose();
}
    } else if (selection == 20003) {
		if (cm.haveItem(4442000, 1000)) {
		    if (cm.canHold(4031144)) {
		        cm.sendOk("#r������ ��#k�� #r#i4031144#  10��#k�� ���� �ϼ̽��ϴ�.");
			cm.gainItem(4442000, -1000);
			cm.gainItem(4031144,10);
			cm.dispose();
		    } else {
		        cm.sendOk("��Ÿĭ�� �� ������ �����ϴ�.");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#r�����ǵ�#k�� �����մϴ�.");
		    cm.dispose();
}
	   
		}
	}
}