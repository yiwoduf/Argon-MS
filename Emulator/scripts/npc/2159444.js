var status = -1;

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
		var c1 = "#fn������� Extrabold##fs14#������ �տ��� ��Ʋ�� ������ ����� ���簡 �����...\r\n\r\n#fs12##d���㿡�� �� 5 ������ ����� ���簡 �������..\r\n�ڳװ�.. ����� ���縦 ����ģ�ٸ� Ư���� ������ ȹ���� ����..#k\r\n";
		c1+= "#L0##fs13#�� ����ӿ��� #d����� �ϼ���#k ��ȯ�ϱ� #r(10 ����)#k\r\n    ��  #fs12##i2028048#  #r- 1 õ 5 �鸸 �޼� ����#k\r\n";
		c1+= "#L1##fs13#�� ����ӿ��� #b����� ����#k ��ȯ�ϱ� #r(ü�� 100 ��)#k\r\n    ��  #fs12##i4033335#  #r- 100 �� ����#k ";
		cm.sendSimple(c1);
	} else if (status == 1) {
	if (selection == 0) {
	if (cm.getMeso() >= 15000000) {
		if (cm.getPlayer().getMapId() == 310070300) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250013,1620,-119);
		cm.spawnMob (8250028,1660,-119);
		cm.spawnMob (8250013,1620,-119);
		cm.spawnMob (8250028,1660,-119);
		cm.spawnMob (8250013,1620,-119);
		cm.spawnMob (8250028,1660,-119);
		cm.spawnMob (8250013,1620,-119);
		cm.spawnMob (8250028,1660,-119);
		cm.spawnMob (8250013,1620,-119);
		cm.spawnMob (8250028,1660,-119);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070310) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250010,2830,2);
		cm.spawnMob (8250013,2870,2);
		cm.spawnMob (8250010,2830,2);
		cm.spawnMob (8250013,2870,2);
		cm.spawnMob (8250010,2830,2);
		cm.spawnMob (8250013,2870,2);
		cm.spawnMob (8250010,2830,2);
		cm.spawnMob (8250013,2870,2);
		cm.spawnMob (8250010,2830,2);
		cm.spawnMob (8250013,2870,2);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070320) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250010,1760,-119);
		cm.spawnMob (8250028,1800,-119);
		cm.spawnMob (8250010,1760,-119);
		cm.spawnMob (8250028,1800,-119);
		cm.spawnMob (8250010,1760,-119);
		cm.spawnMob (8250028,1800,-119);
		cm.spawnMob (8250010,1760,-119);
		cm.spawnMob (8250028,1800,-119);
		cm.spawnMob (8250010,1760,-119);
		cm.spawnMob (8250028,1800,-119);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070330) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250010,370,-119);
		cm.spawnMob (8250012,410,-119);
		cm.spawnMob (8250010,370,-119);
		cm.spawnMob (8250012,410,-119);
		cm.spawnMob (8250010,370,-119);
		cm.spawnMob (8250012,410,-119);
		cm.spawnMob (8250010,370,-119);
		cm.spawnMob (8250012,410,-119);
		cm.spawnMob (8250010,370,-119);
		cm.spawnMob (8250012,410,-119);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070400) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250011,510,61);
		cm.spawnMob (8250018,550,61);
		cm.spawnMob (8250019,590,61);
		cm.spawnMob (8250011,510,61);
		cm.spawnMob (8250018,550,61);
		cm.spawnMob (8250019,590,61);
		cm.spawnMob (8250011,510,61);
		cm.spawnMob (8250018,550,61);
		cm.spawnMob (8250019,590,61);
		cm.spawnMob (8250011,510,61);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070410) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250011,810,61);
		cm.spawnMob (8250025,850,61);
		cm.spawnMob (8250011,810,61);
		cm.spawnMob (8250025,850,61);
		cm.spawnMob (8250011,810,61);
		cm.spawnMob (8250025,850,61);
		cm.spawnMob (8250011,810,61);
		cm.spawnMob (8250025,850,61);
		cm.spawnMob (8250011,810,61);
		cm.spawnMob (8250025,850,61);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070420) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250024,600,-229);
		cm.spawnMob (8250025,640,-229);
		cm.spawnMob (8250024,600,-229);
		cm.spawnMob (8250025,640,-229);
		cm.spawnMob (8250024,600,-229);
		cm.spawnMob (8250025,640,-229);
		cm.spawnMob (8250024,600,-229);
		cm.spawnMob (8250025,640,-229);
		cm.spawnMob (8250024,600,-229);
		cm.spawnMob (8250025,640,-229);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070430) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250018,610,433);
		cm.spawnMob (8250019,650,433);
		cm.spawnMob (8250022,690,433);
		cm.spawnMob (8250023,730,433);
		cm.spawnMob (8250018,610,433);
		cm.spawnMob (8250019,650,433);
		cm.spawnMob (8250022,690,433);
		cm.spawnMob (8250023,730,433);
		cm.spawnMob (8250018,610,433);
		cm.spawnMob (8250019,650,433);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070440) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250016,620,496);
		cm.spawnMob (8250017,660,496);
		cm.spawnMob (8250016,620,496);
		cm.spawnMob (8250017,660,496);
		cm.spawnMob (8250016,620,496);
		cm.spawnMob (8250017,660,496);
		cm.spawnMob (8250016,620,496);
		cm.spawnMob (8250017,660,496);
		cm.spawnMob (8250016,620,496);
		cm.spawnMob (8250017,660,496);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070450) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250016,370,-1018);
		cm.spawnMob (8250017,410,-1018);
		cm.spawnMob (8250016,370,-1018);
		cm.spawnMob (8250017,410,-1018);
		cm.spawnMob (8250016,370,-1018);
		cm.spawnMob (8250017,410,-1018);
		cm.spawnMob (8250016,370,-1018);
		cm.spawnMob (8250017,410,-1018);
		cm.spawnMob (8250016,370,-1018);
		cm.spawnMob (8250017,410,-1018);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070460) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250020,120,150);
		cm.spawnMob (8250021,160,150);
		cm.spawnMob (8250026,200,150);
		cm.spawnMob (8250020,120,150);
		cm.spawnMob (8250021,160,150);
		cm.spawnMob (8250026,200,150);
		cm.spawnMob (8250020,120,150);
		cm.spawnMob (8250021,160,150);
		cm.spawnMob (8250026,200,150);
		cm.spawnMob (8250020,120,150);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070470) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250020,-640,691);
		cm.spawnMob (8250021,-600,691);
		cm.spawnMob (8250026,-560,691);
		cm.spawnMob (8250020,-640,691);
		cm.spawnMob (8250021,-600,691);
		cm.spawnMob (8250026,-560,691);
		cm.spawnMob (8250020,-640,691);
		cm.spawnMob (8250021,-600,691);
		cm.spawnMob (8250026,-560,691);
		cm.spawnMob (8250020,-640,691);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070480) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250014,120,4);
		cm.spawnMob (8250015,150,4);
		cm.spawnMob (8250020,180,4);
		cm.spawnMob (8250021,210,4);
		cm.spawnMob (8250026,230,4);
		cm.spawnMob (8250014,120,4);
		cm.spawnMob (8250015,150,4);
		cm.spawnMob (8250020,180,4);
		cm.spawnMob (8250021,210,4);
		cm.spawnMob (8250026,230,4);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else if (cm.getPlayer().getMapId() == 310070490) {
		cm.gainMeso (-15000000);
		cm.spawnMob (8250014,-670,-589);
		cm.spawnMob (8250015,-630,-589);
		cm.spawnMob (8250026,-590,-589);
		cm.spawnMob (8250014,-670,-589);
		cm.spawnMob (8250015,-630,-589);
		cm.spawnMob (8250026,-590,-589);
		cm.spawnMob (8250014,-670,-589);
		cm.spawnMob (8250015,-630,-589);
		cm.spawnMob (8250026,-590,-589);
		cm.spawnMob (8250014,-670,-589);

		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� �ϼ����� ��ȯ �Ǿ����ϴ�.");
		cm.dispose();
		} else {
		cm.sendOk ("#fn������� Extrabold##r�� ������ ������ �տ��� �������� �ʽ��ϴ�.#k");
		}
	} else {
	cm.senOk("#fn������� Extrabold##r��ȯ�� ���� �޼Ұ� �����մϴ�.#k");
	cm.dispose();
	}
       } else if (selection == 1) {
           if (cm.haveItem(4033335, 100)) {
		cm.gainItem(4033335,-100);
		cm.getPlayer().hsBOSS();
		cm.playerMessage(5,"[�˸�] ����ӿ��� ����� ���簡 ���� �Ͽ����ϴ�.");
		cm.dispose();
           } else {
           cm.sendOk ("#fn������� Extrabold##r����� ���縦 ��ȯ�ϱ� ���� #i4033335# �� �����մϴ�.#k");
           cm.dispose();
           }
       }
}
}