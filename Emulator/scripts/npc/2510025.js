var status = 0;

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
        if (!cm.haveItem(4033338,1) && cm.haveItem(4034075,1)) {
		var jessica = "#fn������� Extrabold#��.. �ΰ��̳�...����� ������ ���±�..\r\n";
		jessica += "#r�� ��#k ����.. ����� �־�����.. Ư���� �ð��� ������..\r\n";
		jessica += "�� �� ���ϰھ�.. �ʰ� ���ϴٴ� �� �����ֱ� �ٷ�..\r\n\r\n";
		jessica += "#fs14##d * �ش� ������ ��� ���� ������#k#fs12#\r\n      ������ ħ���� 1~2 - ����� �� ������ �Ʒ� \r\n\r\n     #r[����]#k #i4033338# #b#z4033338##k\r\n\r\n";
                if(cm.haveItem(4009151,30) && cm.haveItem(4009152,30)) {
                jessica += "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L0##i4009151# " + cm.itemQuantity(4009151) + "/30 + #i4009152# " + cm.itemQuantity(4009152) + "/30";
                } else {
                jessica += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##i4009151# " + cm.itemQuantity(4009151) + "/30 + #i4009152# " + cm.itemQuantity(4009152) + "/30";
                }
		cm.sendSimple(jessica);
        } else {
        cm.sendOk("#fn������� Extrabold#�ΰ� ������.. �� ó�� ����..");
        }
	} else if (status == 1) {

	if (selection == 0) {
               if(cm.haveItem(4009151,30) && cm.haveItem(4009152,30)) {
	       if (cm.canHold(4033338)) {
               cm.gainItem(4009151,-30);
               cm.gainItem(4009152,-30);
               cm.gainItem(4033338, 1);
               cm.sendOk("#fn������� Extrabold#�ʴ� �ٸ� ������ �ΰ����� �� �ٸ��� ����..\r\n��Ű�� ������.. ���ϴٴ� �� ���� ������..\r\nƯ����.. �������ְھ� �� ������..\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4033338# #b#z4033338##k");
               cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �����.. �� �ΰ���!#k");
		         cm.dispose();	
			}
               } else {
               cm.sendOk("#fn������� Extrabold##r������ �� ��ƿ����Ѱž�?..\r\n���̰�.. ������ �ΰ���.. ������ �ۿ� �𸥴ٴϱ�..#k");
               cm.dispose();
                }
}    
}
}
}