importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(Packages.client);
importPackage(Packages.packet.creators);
importPackage(Packages.tools.RandomStream);
importPackage(Packages.launch.world);

var status = 0;
var boxcode = 2435226;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
        cm.sendYesNo("#fn������� Extrabold#���� �ٷ� #b#z"+boxcode+"##k �� �����Ͻðڽ��ϱ�?\r\n\r\n#r* �ִ��� �Һ� â�� ���� ������ Ȯ�� �� �����ϼ���.#k\r\n#Cgray#* �ּ� ���� > �Һ� : 1 ~ 2 ĭ �̻�\r\n\r\n#fs15##r[��]#k #d���� 1 �� ȹ��#k#fs12#\r\n\r\n#i2049373# #b#z2049373##k #r1 ��#k\r\n#i2049370# #b#z2049370##k #r1 ��#k\r\n#i2049372# #b#z2049372##k #r1 ��#k\r\n#i2049371# #b#z2049371##k #r1 ��#k\r\n#i2049376# #b#z2049376##k #r1 ��#k");
	} else if (status == 1) {




        if (Randomizer.nextInt(100) <= 50) { // ��Ÿ���� 10 ��
	if (cm.canHold(2049373)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[����� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��Ÿ���� 10 �� �ֹ��� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049373,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�ſ�! ���ϵ����!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049373# #b#z2049373##k #r1 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(100) <= 49) { // ��Ÿ���� 12 ��
	if (cm.canHold(2049370)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[����� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��Ÿ���� 12 �� �ֹ��� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049370,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�ſ�! ���ϵ����!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049370# #b#z2049370##k #r1 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


        } else if (Randomizer.nextInt(100) <= 48) { // ��Ÿ���� 15 ��
	if (cm.canHold(2049372)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[����� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��Ÿ���� 15 �� �ֹ��� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049372,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�ſ�! ���ϵ����!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049372# #b#z2049372##k #r1 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(100) <= 46) { // ��Ÿ���� 17 ��
	if (cm.canHold(2049371)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[����� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��Ÿ���� 17 �� �ֹ��� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049371,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�ſ�! ���ϵ����!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049371# #b#z2049371##k #r1 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(100) <= 44) { // ��Ÿ���� 20 ��
	if (cm.canHold(2049376)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[����� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��Ÿ���� 20 �� �ֹ��� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049376,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�ſ�! ���ϵ����!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049376# #b#z2049376##k #r1 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

	} else {
        cm.sendOk("#fn������� Extrabold#���ڸ� ���⿡��.. ����� ���� �����ؿ�..\r\n��..��.. #d�ٽ� �õ�#k .. �غ��Ƿ���..?");
        cm.dispose();
	}


        cm.dispose();
    }
}

