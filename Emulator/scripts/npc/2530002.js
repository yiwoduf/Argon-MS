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
		var jessica = "#fn������� Extrabold#�� öâ�ȿ�.. ����� ��ٸ��� ���� �־��..\r\n";
		jessica += "���� ���� ���̴���.. ���� ���� ���̶�� ������ �帱�Կ�..\r\n";
		jessica += "���� ��ġ�� ���� �ϱ� ���ؼ��� �Ʒ��� �������� �ʿ��ؿ�..\r\n";
		jessica += "�Ʒ��� ����ͷ� ���� ���͸� ��� ���ؿ�����!..\r\n\r\n";
                jessica += "#i4033976# #b#z4033976##k " + cm.itemQuantity(4033976) + "/50 #i4033977# #b#z4033977##k " + cm.itemQuantity(4033977) + "/50\r\n#L0##d�������� ��� ��ƿԽ��ϴ�..#l#k";
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
               if(cm.haveItem(4033976,50) && cm.haveItem(4033977,50)){
               cm.gainItem(4033976,-50);
               cm.gainItem(4033977,-50);
               cm.warp(304020010,0);
               cm.sendOk("#fn������� Extrabold#���������� ���� ��ġ�� ���� �Ͽ����..\r\n�տ� #r�೪�̽�#k ���� ����������..");
               cm.dispose();
               } else {
               cm.sendOk("#fn������� Extrabold##r���� ��ġ�� �����ϱ� ���� �������� ���ڶ�°ɿ�..?#k");
               cm.dispose();
                }
}    
}
}
}