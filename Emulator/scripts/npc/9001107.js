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
		var c1 = "#fn������� Extrabold##i3014005# #d[���� ���� : 250 LV]#k #r1 õ�� �޼�#k #b���� ��¡#k\r\n\r\n��! #r250 ����#k �� �޼� �߳׿�! ���� #dƯ���� ��ȸ#k �� �帱�Կ�!\r\n������ �� #bƯ���� ����#k �� �������� ��������?\r\n#r250 ����#k �� ������� #d��� ����#k �� �� ����?!\r\n";
		c1+= "#L0##d��! �� ��ȸ�� ��ĥ �� �����!#k#l\r\n";
		c1+= "#L1##r����, ���� �����..#k#l\r\n";
		cm.sendSimple(c1);
	} else if (status == 1) {
	if (selection == 0) {
        if (cm.getPlayer().getLevel() >= 250 && cm.getMeso() >= 10000000 && !cm.haveItem(3014005, 1)) {
	       if (cm.canHold(3014005)) {
		cm.gainMeso (-10000000);
		cm.gainItem (3014005, 1);
                cm.sendOk("#fn������� Extrabold##b���� ���� ������ �ٶ��Կ�..#k");
		cm.dispose();
		} else {		         
			 cm.sendOk("#fn������� Extrabold##d��ġâ#k �� ����ֽðھ��..?");
		         cm.dispose();	
			}
} else {
        cm.sendOk ("#fn������� Extrabold##r���� �Ǵ� �޼Ұ� �����ϰų�, �Ǵ� �̹� ������ �̽ŵ���..#k");
        cm.dispose();
}

} else if (selection == 1) {
        cm.sendOk ("#fn������� Extrabold##r�� ��ȸ�� ��ġ�ôٴ�.. �ƽ�����..#k");
        cm.dispose();
}
}
}
}