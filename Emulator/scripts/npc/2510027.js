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
        if (!cm.haveItem(4032801,1) && cm.haveItem(4034075,1)) {
		var jessica = "#fn������� Extrabold#����.. ū ���̾�.. �зƲ۵��� ���������־�..\r\n";
		jessica += "�ٵ� �� �ΰ��̳�... ��¶�� ������ �ϰ� ���� ��\r\n";
		jessica += "�������� �ʰھ�?.. �ƴ���... �ƴϾ�.. �ΰ� ���� ���Ϸ���..?\r\n\r\n";
		jessica += "#fs14##d * �ش� ������ ��� ���� ������#k#fs12#\r\n      ������ ħ���� 3~4 - ����� �� ������ �� ��Ż\r\n\r\n     #r[����]#k #i4032801# #b#z4032801##k\r\n\r\n";
                if(cm.haveItem(4009078,30) && cm.haveItem(4009150,30)) {
                jessica += "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L0##i4009078# " + cm.itemQuantity(4009078) + "/30 + #i4009150# " + cm.itemQuantity(4009150) + "/30";
                } else {
                jessica += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##i4009078# " + cm.itemQuantity(4009078) + "/30 + #i4009150# " + cm.itemQuantity(4009150) + "/30";
                }
		cm.sendSimple(jessica);
        } else {
        cm.sendOk("#fn������� Extrabold#��.. �ΰ����̶�..");
        }
	} else if (status == 1) {

	if (selection == 0) {
               if(cm.haveItem(4009078,30) && cm.haveItem(4009150,30)) {
	       if (cm.canHold(4032801)) {
               cm.gainItem(4009078,-30);
               cm.gainItem(4009150,-30);
               cm.gainItem(4032801, 1);
               cm.sendOk("#fn������� Extrabold#��������.. ����!.. �ΰ����� �ż��� ���ٴ�...\r\n�̹��Ϸ� ���� �ΰ����� �ٽ� ���� �ɰž�..!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4032801# #b#z4032801##k");
               cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##r��õ�Ѱǰ�.. ��Ÿ â�� ����ְڴ�..?#k");
		         cm.dispose();	
			}
               } else {
               cm.sendOk("#fn������� Extrabold##r����.. �ΰ����Դ� ���� ��Ź�� ���������ž�..?#k");
               cm.dispose();
                }
}    
}
}
}