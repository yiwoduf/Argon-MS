importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(Packages.client);
importPackage(Packages.tools.packet);
importPackage(Packages.server);
importPackage(Packages.handling.world);

var status = 0;
var boxcode = 2432127;

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
        cm.sendYesNo("#fn������� Extrabold#���� �ٷ� #b#z"+boxcode+"##k �� �����Ͻðڽ��ϱ�?\r\n\r\n#r* �ִ��� �Һ� â�� ��Ÿ â�� ���� ������ Ȯ�� �� �����ϼ���.#k\r\n#Cgray#* �ּ� ���� > �Һ� : 20 ~ 40 ĭ �̻� / ��Ÿ : 2 ~ 4 ĭ �̻�\r\n\r\n#fs15##r[��]#k #d���� 1 �� ȹ��#k#fs12#\r\n\r\n#i2028048# #b���� �޼�#k #r4 ~ 20 ��#k\r\n#i4310175# #bM ����#k #r200 ~ 500 ��#k\r\n#i2430218# #b#z2430218##k #r5 ~ 15 ��#k\r\n#i2049153# #b#z2049153##k #r2 ~ 8 ��#k\r\n#i2048717# #b#z2048717##k #r2 ~ 8 ��#k\r\n#i2049360# #b#z2049360##k #r2 ~ 8 ��#k\r\n#i3994592# #b�ʿ��� ����Ʈ#k #r100 ~ 150 P#k\r\n#i2046991# #b#z2046991##k #r1 ~ 2 ��#k\r\n#i2047814# #b#z2047814##k #r1 ~ 2 ��#k\r\n#i2046992# #b#z2046992##k #r1 ~ 2 ��#k\r\n#i4001869# #b#z4001869##k #r1 ~ 2 ��#k");
	} else if (status == 1) {
		        if (Randomizer.nextInt(750) <= 80) { // 4 �� �޼�
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� 4 �� �޼Ҹ� ȹ���߽��ϴ�!"));
			cm.gainMeso(400000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2028048# #b#z2028048##k #r4 �� �޼�#k");
		        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 79) { // M ���� 200 ��
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� M ���� 200 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4310175,200);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4310175# #bM ����#k #r200 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 78) { // 8 �� �޼�
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� 8 �� �޼Ҹ� ȹ���߽��ϴ�!"));
			cm.gainMeso(800000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2028048# #b#z2028048##k #r8 �� �޼�#k");
		        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 77) { // M ���� 250 ��
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� M ���� 250 �� �� ȹ���߽��ϴ�!"));
	cm.gainItem(4310175,250);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4310175# #bM ����#k #r250 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 76) { // 12 �� �޼�
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� 12 �� �޼Ҹ� ȹ���߽��ϴ�!"));
			cm.gainMeso(1200000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2028048# #b#z2028048##k #r12 �� �޼�#k");
		        cm.dispose();



        } else if (Randomizer.nextInt(750) <= 75) { // M ���� 300 ��
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� M ���� 300 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4310175,300);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4310175# #bM ����#k #r300 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 74) { // 16 �� �޼�
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� 16 �� �޼Ҹ� ȹ���߽��ϴ�!"));
			cm.gainMeso(1600000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2028048# #b#z2028048##k #r16 �� �޼�#k");
			cm.dispose();



        } else if (Randomizer.nextInt(750) <= 73) { // M ���� 350 ��
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� M ���� 350 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4310175,350);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4310175# #bM ����#k #r350 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 72) { // 20 �� �޼�
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� 20 �� �޼Ҹ� ȹ���߽��ϴ�!"));
			cm.gainMeso(2000000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2028048# #b#z2028048##k #r20 �� �޼�#k");
		        cm.dispose();




        } else if (Randomizer.nextInt(750) <= 71) { // M ���� 400 ��
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� M ���� 400 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4310175,400);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4310175# #bM ����#k #r400 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 70) { // ��ǳ ������ ��� 5 ��
			if (cm.canHold(2430218)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��ǳ ������ ��� 5 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2430218,5);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2430218# #b#z2430218##k #r5 ��#k");
		        cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}


        } else if (Randomizer.nextInt(750) <= 69) { // M ���� 450 ��
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� M ���� 450 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4310175,450);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4310175# #bM ����#k #r450 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

			} else if (Randomizer.nextInt(750) <= 68) { // ��ǳ ������ ��� 10 ��
			if (cm.canHold(2430218)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��ǳ ������ ��� 10 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2430218,10);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2430218# #b#z2430218##k #r10 ��#k");
			cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}

        } else if (Randomizer.nextInt(750) <= 67) { // M ���� 500 ��
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� M ���� 500 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4310175,500);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4310175# #bM ����#k #r500 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 66) { // ��ǳ ������ ��� 15 ��
			if (cm.canHold(2430218)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��ǳ ������ ��� 15 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2430218,15);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2430218# #b#z2430218##k #r15 ��#k");
		        cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}


        } else if (Randomizer.nextInt(750) <= 65) { // M ���� 400 ��
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� M ���� 400 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4310175,400);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4310175# #bM ����#k #r400 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


        } else if (Randomizer.nextInt(750) <= 64) { // ���� ������ ȥ���� �ֹ��� 2 ��
	if (cm.canHold(2049153)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ���� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ������ ȥ�� �ֹ��� 2 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049153,2);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049153# #b#z2049153##k #r2 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


	} else if (Randomizer.nextInt(750) <= 63) { // ������ ȯ���� �Ҳ� 2 ��
	if (cm.canHold(2048717)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ������ ȯ���� �Ҳ� 2 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2048717,2);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2048717# #b#z2048717##k #r2 ��#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(750) <= 62) { // ���� ��� ��ȭ �ֹ��� 2 ��
	if (cm.canHold(2049360)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ��� ��ȭ �ֹ��� 2 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049360,2);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049360# #b#z2049360##k #r2 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}



        		} else if (Randomizer.nextInt(750) <= 61) { // ���� ������ ȥ���� �ֹ��� 4 ��
			if (cm.canHold(2049153)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ������ ȥ�� �ֹ��� 4 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2049153,4);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049153# #b#z2049153##k #r4 ��#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}

			} else if (Randomizer.nextInt(750) <= 60) { // ������ ȯ���� �Ҳ� 4 ��
			if (cm.canHold(2048717)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ������ ȯ���� �Ҳ� 4 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2048717,4);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2048717# #b#z2048717##k #r4 ��#k");
			cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}

        		} else if (Randomizer.nextInt(750) <= 59) { // ���� ��� ��ȭ �ֹ��� 4 ��
			if (cm.canHold(2049360)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ��� ��ȭ �ֹ��� 4 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2049360,4);
			cm.gainItem(boxcode, -1);
        		cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049360# #b#z2049360##k #r4 ��#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}


        } else if (Randomizer.nextInt(750) <= 58) { // ���� ������ ȥ���� �ֹ��� 6 ��
	if (cm.canHold(2049153)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ������ ȥ�� �ֹ��� 6 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049153,6);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049153# #b#z2049153##k #r6 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}


	} else if (Randomizer.nextInt(750) <= 57) { // ������ ȯ���� �Ҳ� 6 ��
	if (cm.canHold(2048717)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ������ ȯ���� �Ҳ� 6 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2048717,6);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2048717# #b#z2048717##k #r6 ��#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

	} else if (Randomizer.nextInt(750) <= 56) { // ���� ��� ��ȭ �ֹ��� 6 ��
	if (cm.canHold(2049360)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ��� ��ȭ �ֹ��� 6 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2049360,6);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049360# #b#z2049360##k #r6 ��#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}
 

        		} else if (Randomizer.nextInt(750) <= 55) { // ���� ������ ȥ���� �ֹ��� 8 ��
			if (cm.canHold(2049153)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ������ ȥ�� �ֹ��� 8 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2049153,8);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049153# #b#z2049153##k #r8 ��#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}

			} else if (Randomizer.nextInt(750) <= 54) { // ������ ȯ���� �Ҳ� 8 ��
			if (cm.canHold(2048717)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ������ ȯ���� �Ҳ� 8 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2048717,8);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2048717# #b#z2048717##k #r8 ��#k");
			cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}

        		} else if (Randomizer.nextInt(750) <= 53) { // ���� ��� ��ȭ �ֹ��� 8 ��
			if (cm.canHold(2049360)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���� ��� ��ȭ �ֹ��� 8 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2049360,8);
			cm.gainItem(boxcode, -1);
        		cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2049360# #b#z2049360##k #r8 ��#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}



        } else if (Randomizer.nextInt(750) <= 52) { // �ʿ��� 100 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� �ʿ��� ����Ʈ 100 P �� ȹ���߽��ϴ�!"));
        cm.getPlayer().gainTSD(100);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#b�ʿ��� ����Ʈ#k #r100 P#k\r\n#r�ʿ��� ����Ʈ �հ� : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();


        } else if (Randomizer.nextInt(750) <= 51) { // �ʿ��� 110 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� �ʿ��� ����Ʈ 110 P �� ȹ���߽��ϴ�!"));
        cm.getPlayer().gainTSD(110);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#b�ʿ��� ����Ʈ#k #r110 P#k\r\n#r�ʿ��� ����Ʈ �հ� : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 50) { // �ʿ��� 120 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� �ʿ��� ����Ʈ 120 P �� ȹ���߽��ϴ�!"));
        cm.getPlayer().gainTSD(120);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#b�ʿ��� ����Ʈ#k #r120 P#k\r\n#r�ʿ��� ����Ʈ �հ� : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 49) { // �ʿ��� 130 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� �ʿ��� ����Ʈ 130 P �� ȹ���߽��ϴ�!"));
        cm.getPlayer().gainTSD(130);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#b�ʿ��� ����Ʈ#k #r130 P#k\r\n#r�ʿ��� ����Ʈ �հ� : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 48) { // �ʿ��� 140 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� �ʿ��� ����Ʈ 140 P �� ȹ���߽��ϴ�!"));
        cm.getPlayer().gainTSD(140);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#b�ʿ��� ����Ʈ#k #r140 P#k\r\n#r�ʿ��� ����Ʈ �հ� : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 47) { // �ʿ��� 150 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� �ʿ��� ����Ʈ 150 P �� ȹ���߽��ϴ�!"));
        cm.getPlayer().gainTSD(150);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#b�ʿ��� ����Ʈ#k #r150 P#k\r\n#r�ʿ��� ����Ʈ �հ� : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();




	} else if (Randomizer.nextInt(750) <= 44) { // ���Һ� �Ѽչ��� ���ݷ� 1 ��
	if (cm.canHold(2046991)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���Һ� �Ѽչ��� ���ݷ� �ֹ��� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2046991,1);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2046991# #b#z2046991##k #r1 ��#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(750) <= 43) { // ���Һ� �μչ��� ���ݷ� 1 ��
	if (cm.canHold(2047814)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���Һ� �μչ��� ���ݷ� �ֹ��� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2047814,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2047814# #b#z2047814##k #r1 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

	} else if (Randomizer.nextInt(750) <= 42) { // ���Һ� �Ѽչ��� ���� 1 ��
	if (cm.canHold(2046992)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���Һ� �Ѽչ��� ���� �ֹ��� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(2046992,1);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2046992# #b#z2046992##k #r1 ��#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

			} else if (Randomizer.nextInt(750) <= 40) { // ���Һ� �Ѽչ��� ���ݷ� 2 ��
			if (cm.canHold(2046991)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���Һ� �Ѽչ��� ���ݷ� �ֹ��� 2 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2046991,2);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2046991# #b#z2046991##k #r2 ��#k");
			cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}

        		} else if (Randomizer.nextInt(750) <= 39) { // ���Һ� �μչ��� ���ݷ� 2 ��
			if (cm.canHold(2047814)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���Һ� �μչ��� ���ݷ� �ֹ��� 2 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2047814,2);
			cm.gainItem(boxcode, -1);
        		cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2047814# #b#z2047814##k #r2 ��#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}

		        } else if (Randomizer.nextInt(750) <= 38) { // ���Һ� �Ѽչ��� ���� 2 ��
			if (cm.canHold(2046992)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ���Һ� �Ѽչ��� ���� �ֹ��� 2 ���� ȹ���߽��ϴ�!"));
			cm.gainItem(2046992,2);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i2046992# #b#z2046992##k #r2 ��#k");
		        cm.dispose();
			} else {
			cm.sendOk("#fn������� Extrabold##r�Һ� â�� �� ������ �����ϴ�.#k");
			cm.dispose();
			}

        } else if (Randomizer.nextInt(750) <= 35) { // ��ȥ�� 1 ��
	if (cm.canHold(4001869)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��Ʋ�� ������ ��ȥ�� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4001869,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4001869# #b#z4001869##k #r1 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(750) <= 30) { // ��ȥ�� 2 ��
	if (cm.canHold(4001869)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[���Ÿ� ����] > ["+ cm.getPlayer().getName()+"] �Բ��� "+(cm.getClient().getChannel()+1) +" ä�ο��� ��Ʋ�� ������ ��ȥ�� 1 ���� ȹ���߽��ϴ�!"));
	cm.gainItem(4001869,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn������� Extrabold##d�������� ���ϵ帳�ϴ�.!!#k\r\n#b#z"+boxcode+"##k ���� �Ʒ��� ������ ���Խ��ϴ�.\r\n\r\n#i4001869# #b#z4001869##k #r1 ��#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn������� Extrabold##r��Ÿ â�� �� ������ �����ϴ�.#k");
	cm.dispose();
	}

	} else {
        cm.sendOk("#fn������� Extrabold#���ڸ� ���⿡��.. ����� ���� �����ؿ�..\r\n��..��.. #d�ٽ� �õ�#k .. �غ��Ƿ���..?");
        cm.dispose();
	}

        cm.dispose();
    }
}

