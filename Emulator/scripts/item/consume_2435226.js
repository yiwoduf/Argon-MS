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
        cm.sendYesNo("#fn나눔고딕 Extrabold#지금 바로 #b#z"+boxcode+"##k 를 오픈하시겠습니까?\r\n\r\n#r* 최대한 소비 창의 여유 공간을 확보 후 진행하세요.#k\r\n#Cgray#* 최소 권장 > 소비 : 1 ~ 2 칸 이상\r\n\r\n#fs15##r[▶]#k #d랜덤 1 종 획득#k#fs12#\r\n\r\n#i2049373# #b#z2049373##k #r1 장#k\r\n#i2049370# #b#z2049370##k #r1 장#k\r\n#i2049372# #b#z2049372##k #r1 장#k\r\n#i2049371# #b#z2049371##k #r1 장#k\r\n#i2049376# #b#z2049376##k #r1 장#k");
	} else if (status == 1) {




        if (Randomizer.nextInt(100) <= 50) { // 스타포스 10 성
	if (cm.canHold(2049373)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[스폐셜 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 스타포스 10 성 주문서 1 장을 획득했습니다!"));
	cm.gainItem(2049373,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d매우! 축하드려요!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049373# #b#z2049373##k #r1 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(100) <= 49) { // 스타포스 12 성
	if (cm.canHold(2049370)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[스폐셜 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 스타포스 12 성 주문서 1 장을 획득했습니다!"));
	cm.gainItem(2049370,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d매우! 축하드려요!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049370# #b#z2049370##k #r1 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


        } else if (Randomizer.nextInt(100) <= 48) { // 스타포스 15 성
	if (cm.canHold(2049372)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[스폐셜 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 스타포스 15 성 주문서 1 장을 획득했습니다!"));
	cm.gainItem(2049372,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d매우! 축하드려요!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049372# #b#z2049372##k #r1 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(100) <= 46) { // 스타포스 17 성
	if (cm.canHold(2049371)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[스폐셜 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 스타포스 17 성 주문서 1 장을 획득했습니다!"));
	cm.gainItem(2049371,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d매우! 축하드려요!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049371# #b#z2049371##k #r1 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(100) <= 44) { // 스타포스 20 성
	if (cm.canHold(2049376)) {
	WorldBroadcasting.broadcastSmega(MainPacketCreator.getGMText(10, "[스폐셜 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 스타포스 20 성 주문서 1 장을 획득했습니다!"));
	cm.gainItem(2049376,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d매우! 축하드려요!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049376# #b#z2049376##k #r1 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

	} else {
        cm.sendOk("#fn나눔고딕 Extrabold#상자를 열기에는.. 당신의 힘이 부족해요..\r\n한..번.. #d다시 시도#k .. 해보실래요..?");
        cm.dispose();
	}


        cm.dispose();
    }
}

