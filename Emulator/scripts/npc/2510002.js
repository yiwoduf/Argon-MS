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
		var jessica = "#fn������� Extrabold#����.. ������ �����ڸ��� ���� �� ȯ���ؿ�..\r\n\r\n";
                if (cm.haveItem(4032801,1) && cm.haveItem(4033338,1) && cm.haveItem(4034075,1)) {
		jessica += "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L2##d�������� ���� �ޱ�..(�Ϸ� ����)#k\r\n";
                } else if (cm.haveItem(4034075,1)) {
		jessica += "#fUI/UIWindow2.img/UtilDlgEx/list0#\r\n#L1##d�������� ���� �ޱ�..(������)#k\r\n";
                } else {
		jessica += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##d�������� ���� �ޱ�..(���� ����)#k\r\n";
                }
		cm.sendSimple(jessica);
	} else if (status == 1) {
        if (selection == 0 ) {
	cm.sendNext("#fn������� Extrabold#����! #rŻ����#k ���� #b���� ����#k �� ����ִ��� �˰��־��..\r\n��!, �׻�.. ���°� �־��.. �����Ե� ���°� �ִ¹�..\r\n���� ������ ���� ���غ��� ���� ���� ������.\r\n�ٸ�.. ���� ������ �ΰ��� ���� �������� �ʴ´�ϴ�..\r\n���.. ���� �������� ����� ���� �ݰ��� ���� �����ſ���..\r\n�ϴ�! ���� �ֺ��� �ִ� �������� ã�ư� ������ �ּ���.\r\n������ �ֽ� �� �����鿡�� �������� �޾ƿ�����..");
        cm.gainItem(4034075, 1);
        cm.dispose();
        } else if (selection == 1 ) {
        cm.sendOk("#fn������� Extrabold#�� ����.. ���� ������ ������ �޾ƿ�����.");
        cm.dispose();
	} else if (selection == 2) {
               if(cm.haveItem(4032801,1) && cm.haveItem(4033338,1) && cm.haveItem(4034075,1)){
               cm.gainItem(4032801,-1);
               cm.gainItem(4033338,-1);
               cm.gainItem(4034075,-1);
               cm.warp(302090220);
               cm.sendOk("#fn������� Extrabold#���� ���鿡�� ������ �����̱���!..\r\n�׷� ���� �ƴ� ������ �ִ��� ���� �帮���� ������..\r\n���.. ���� �׸��ڰ� #b����#k ���� �� ������ �̰��� ���������..\r\n�� �̻���.. ������ ������ #r�Ƹ�#k �� ����������!..");
               cm.dispose();
               } else {
               cm.sendOk("#fn������� Extrabold##r����� ����.. ���� ������ ������ ���� ���ϼ̱���..#k");
               cm.dispose();
                }
}    
}
}
}