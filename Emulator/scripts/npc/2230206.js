function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
	// lv1~150 ���� : 9302011 , 9302039
var star = "#fUI/UIToolTip/Item/Equip/Star/Star#"
    if (status == 0) {
	var choose = "     #fn������� Extrabold##fs19##e #g#i2450042##h0##k#fs15# �� �ȳ��ϼ��� ���� #r���������#k#l ��Ʋ�̿���~#b";
        choose += "\r\n#L1##i2430373# #gLV1~150#L2##i2430374# #bLv.200~250 (10��)";//#L3##i2430375# #rLv.200~250 (100��)#k#l";
        choose += "\r\n#L29#��ȭ�� �׸� �Ѵ�.#l #L30##b������ :#r 1��޼� ";
	cm.sendSpirit(choose,true,0);
    } else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
	} else if (selection == 1) {
        cm.dispose();
	    cm.gainMeso(-100000000);
		cm.TimeMoveMap(910160000,100000000,600);
         } else if (selection == 2) {
        cm.dispose();
		cm.gainMeso(-100000000);
		cm.TimeMoveMap(273060300,100000000,750);
} else if (selection == 3) {
        cm.dispose();
		cm.gainMeso(-100000000);
		cm.TimeMoveMap(241000206,100000000,750);
		} else if (selection == 30) {
       cm.sendOk("���� ����� 1��޼��Դϴ�.");
	   cm.dispose();
    }
}
}
