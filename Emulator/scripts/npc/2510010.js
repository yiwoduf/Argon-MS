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
		var jessica = "#fn������� Extrabold#���� ����.. �츮 ���Ҹ� �� �� #r�Ƹ�#k ��.. �����༭..\r\n";
		jessica += "�ڳװ� �ƴϿ��ٸ�.. �츮�� �� #r�Ƹ�#k �� ��� ���� �������Ŷ��..\r\n";
		jessica += "�ڳװ�.. �츱 ���� �ѹ��� �� ���� ���ְڴ°�..?\r\n";
                jessica += "����.. �츮 ���ζ� ��Ż�� ������ �������� �����Ǿ���..\r\n";
		jessica += "�嵥, �� ���� ��ȹ��.. �츮�� ���ζ�� #b���� ����#k �� �ʿ��ϴ���..\r\n";
		jessica += "�� �װ� �ʿ�����.. ����.. ������ ���� �ʴ� �������..\r\n";
		jessica += "�츮�� ���ζ� ���Ѿ߱⿡.. �� �ڸ� ��ġ �غ� �� �̶��..\r\n";
		jessica += "�ڳ׵�.. ������ ���� �� ������ ���� ������ �ʰڴ°�?\r\n";
		jessica += "�� �ڸ� ��ġ �ϱ� ���ؼ� �Ʒ��� ��ǰ���� �ʿ��ϴٳ�..\r\n\r\n";
                jessica += "#i4033220# #b#z4033220##k " + cm.itemQuantity(4033220) + "/1\r\n#d * ������ �ٷ� ������ ��Ż - �Ͼ� ������#k\r\n\r\n#i4033972# #b#z4033972##k " + cm.itemQuantity(4033972) + "/20\r\n#d* �κ� �� ���� ��Ż �� ���� �� ������� ���� �����#k\r\n\r\n#i4009155# #b#z4009155##k " + cm.itemQuantity(4009155) + "/20\r\n#d * �κ� �� ������ ��Ż �� ���� �� ������� ���� �����#k\r\n#L0##r��û�ϽŴ��.. ���.. ��ƿԽ��ϴ�.#k";
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
               if(cm.haveItem(4033220,1) && cm.haveItem(4033972,20) && cm.haveItem(4009155,20)){
               cm.gainItem(4033220,-1);
               cm.gainItem(4033972,-20);
               cm.gainItem(4009155,-20);
               cm.warp(302050020,0);
               cm.getPlayer().dropMessage(-1,"�� ������ �ſ� �ɻ�ġ ���� ����� ��������..");
               cm.getPlayer().dropMessage(5,"�� ������ �ſ� �ɻ�ġ ���� ����� ��������..");
               cm.sendOk("#fn������� Extrabold##r����..!!...#k\r\n��.. �� ���� �����̾�...\r\n\r\n#d(������ ��Ż�� ���� �κ�� ���� �������� ã��..)#k");
	       cm.showEffect(false,"adventureStory/brokenSeal");
	       cm.showEffect(false,"balog/clear/stone");
               cm.playSound(false,"Field.img/cannonshooter/bang");
               cm.dispose();
               } else {
               cm.sendOk("#fn������� Extrabold##r�ڳ�.. �󸥰��� ��ƿ��Գ�..\r\n�츮���Դ� �ð��� ���� ���ٳ�...#k");
               cm.dispose();
                }
}    
}
}
}