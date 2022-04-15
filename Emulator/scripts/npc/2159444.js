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
		var c1 = "#fn나눔고딕 Extrabold##fs14#공허의 균열을 비틀면 위대한 어둠의 존재가 깨어나지...\r\n\r\n#fs12##d공허에는 총 5 종류의 어둠의 존재가 살고있지..\r\n자네가.. 어둠의 존재를 물리친다면 특별한 보상을 획득할 수도..#k\r\n";
		c1+= "#L0##fs13#◐ 공허속에서 #d어둠의 하수인#k 소환하기 #r(10 마리)#k\r\n    →  #fs12##i2028048#  #r- 1 천 5 백만 메소 차감#k\r\n";
		c1+= "#L1##fs13#◐ 공허속에서 #b어둠의 존재#k 소환하기 #r(체력 100 조)#k\r\n    →  #fs12##i4033335#  #r- 100 개 차감#k ";
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
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

		cm.playerMessage(5,"[알림] 공허속에서 어둠의 하수인이 소환 되었습니다.");
		cm.dispose();
		} else {
		cm.sendOk ("#fn나눔고딕 Extrabold##r이 곳에는 공허의 균열이 존재하지 않습니다.#k");
		}
	} else {
	cm.senOk("#fn나눔고딕 Extrabold##r소환을 위한 메소가 부족합니다.#k");
	cm.dispose();
	}
       } else if (selection == 1) {
           if (cm.haveItem(4033335, 100)) {
		cm.gainItem(4033335,-100);
		cm.getPlayer().hsBOSS();
		cm.playerMessage(5,"[알림] 공허속에서 어둠의 존재가 등장 하였습니다.");
		cm.dispose();
           } else {
           cm.sendOk ("#fn나눔고딕 Extrabold##r어둠의 존재를 소환하기 위한 #i4033335# 가 부족합니다.#k");
           cm.dispose();
           }
       }
}
}