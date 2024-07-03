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
        cm.sendYesNo("#fn나눔고딕 Extrabold#지금 바로 #b#z"+boxcode+"##k 를 오픈하시겠습니까?\r\n\r\n#r* 최대한 소비 창과 기타 창의 여유 공간을 확보 후 진행하세요.#k\r\n#Cgray#* 최소 권장 > 소비 : 20 ~ 40 칸 이상 / 기타 : 2 ~ 4 칸 이상\r\n\r\n#fs15##r[▶]#k #d랜덤 1 종 획득#k#fs12#\r\n\r\n#i2028048# #b게임 메소#k #r4 ~ 20 억#k\r\n#i4310175# #bM 코인#k #r200 ~ 500 개#k\r\n#i2430218# #b#z2430218##k #r5 ~ 15 개#k\r\n#i2049153# #b#z2049153##k #r2 ~ 8 장#k\r\n#i2048717# #b#z2048717##k #r2 ~ 8 개#k\r\n#i2049360# #b#z2049360##k #r2 ~ 8 장#k\r\n#i3994592# #b초월력 포인트#k #r100 ~ 150 P#k\r\n#i2046991# #b#z2046991##k #r1 ~ 2 장#k\r\n#i2047814# #b#z2047814##k #r1 ~ 2 장#k\r\n#i2046992# #b#z2046992##k #r1 ~ 2 장#k\r\n#i4001869# #b#z4001869##k #r1 ~ 2 개#k");
	} else if (status == 1) {
		        if (Randomizer.nextInt(750) <= 80) { // 4 억 메소
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 4 억 메소를 획득했습니다!"));
			cm.gainMeso(400000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2028048# #b#z2028048##k #r4 억 메소#k");
		        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 79) { // M 코인 200 개
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 M 코인 200 개를 획득했습니다!"));
	cm.gainItem(4310175,200);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4310175# #bM 코인#k #r200 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 78) { // 8 억 메소
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 8 억 메소를 획득했습니다!"));
			cm.gainMeso(800000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2028048# #b#z2028048##k #r8 억 메소#k");
		        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 77) { // M 코인 250 개
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 M 코인 250 개 를 획득했습니다!"));
	cm.gainItem(4310175,250);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4310175# #bM 코인#k #r250 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 76) { // 12 억 메소
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 12 억 메소를 획득했습니다!"));
			cm.gainMeso(1200000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2028048# #b#z2028048##k #r12 억 메소#k");
		        cm.dispose();



        } else if (Randomizer.nextInt(750) <= 75) { // M 코인 300 개
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 M 코인 300 개를 획득했습니다!"));
	cm.gainItem(4310175,300);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4310175# #bM 코인#k #r300 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 74) { // 16 억 메소
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 16 억 메소를 획득했습니다!"));
			cm.gainMeso(1600000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2028048# #b#z2028048##k #r16 억 메소#k");
			cm.dispose();



        } else if (Randomizer.nextInt(750) <= 73) { // M 코인 350 개
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 M 코인 350 개를 획득했습니다!"));
	cm.gainItem(4310175,350);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4310175# #bM 코인#k #r350 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 72) { // 20 억 메소
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 20 억 메소를 획득했습니다!"));
			cm.gainMeso(2000000000);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2028048# #b#z2028048##k #r20 억 메소#k");
		        cm.dispose();




        } else if (Randomizer.nextInt(750) <= 71) { // M 코인 400 개
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 M 코인 400 개를 획득했습니다!"));
	cm.gainItem(4310175,400);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4310175# #bM 코인#k #r400 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 70) { // 폭풍 성장의 비약 5 개
			if (cm.canHold(2430218)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 폭풍 성장의 비약 5 개를 획득했습니다!"));
			cm.gainItem(2430218,5);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2430218# #b#z2430218##k #r5 개#k");
		        cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}


        } else if (Randomizer.nextInt(750) <= 69) { // M 코인 450 개
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 M 코인 450 개를 획득했습니다!"));
	cm.gainItem(4310175,450);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4310175# #bM 코인#k #r450 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

			} else if (Randomizer.nextInt(750) <= 68) { // 폭풍 성장의 비약 10 개
			if (cm.canHold(2430218)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 폭풍 성장의 비약 10 개를 획득했습니다!"));
			cm.gainItem(2430218,10);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2430218# #b#z2430218##k #r10 개#k");
			cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}

        } else if (Randomizer.nextInt(750) <= 67) { // M 코인 500 개
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 M 코인 500 개를 획득했습니다!"));
	cm.gainItem(4310175,500);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4310175# #bM 코인#k #r500 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


		        } else if (Randomizer.nextInt(750) <= 66) { // 폭풍 성장의 비약 15 개
			if (cm.canHold(2430218)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 폭풍 성장의 비약 15 개를 획득했습니다!"));
			cm.gainItem(2430218,15);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2430218# #b#z2430218##k #r15 개#k");
		        cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}


        } else if (Randomizer.nextInt(750) <= 65) { // M 코인 400 개
	if (cm.canHold(4310175)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 M 코인 400 개를 획득했습니다!"));
	cm.gainItem(4310175,400);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4310175# #bM 코인#k #r400 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


        } else if (Randomizer.nextInt(750) <= 64) { // 놀라운 긍정의 혼돈의 주문서 2 장
	if (cm.canHold(2049153)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 놀라운 긍정의 혼돈 주문서 2 장을 획득했습니다!"));
	cm.gainItem(2049153,2);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049153# #b#z2049153##k #r2 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


	} else if (Randomizer.nextInt(750) <= 63) { // 영원한 환생의 불꽃 2 개
	if (cm.canHold(2048717)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 영원한 환생의 불꽃 2 개를 획득했습니다!"));
	cm.gainItem(2048717,2);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2048717# #b#z2048717##k #r2 개#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(750) <= 62) { // 놀라운 장비 강화 주문서 2 장
	if (cm.canHold(2049360)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 놀라운 장비 강화 주문서 2 장을 획득했습니다!"));
	cm.gainItem(2049360,2);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049360# #b#z2049360##k #r2 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}



        		} else if (Randomizer.nextInt(750) <= 61) { // 놀라운 긍정의 혼돈의 주문서 4 장
			if (cm.canHold(2049153)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 놀라운 긍정의 혼돈 주문서 4 장을 획득했습니다!"));
			cm.gainItem(2049153,4);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049153# #b#z2049153##k #r4 장#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}

			} else if (Randomizer.nextInt(750) <= 60) { // 영원한 환생의 불꽃 4 개
			if (cm.canHold(2048717)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 영원한 환생의 불꽃 4 개를 획득했습니다!"));
			cm.gainItem(2048717,4);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2048717# #b#z2048717##k #r4 개#k");
			cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}

        		} else if (Randomizer.nextInt(750) <= 59) { // 놀라운 장비 강화 주문서 4 장
			if (cm.canHold(2049360)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 놀라운 장비 강화 주문서 4 장을 획득했습니다!"));
			cm.gainItem(2049360,4);
			cm.gainItem(boxcode, -1);
        		cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049360# #b#z2049360##k #r4 장#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}


        } else if (Randomizer.nextInt(750) <= 58) { // 놀라운 긍정의 혼돈의 주문서 6 장
	if (cm.canHold(2049153)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 놀라운 긍정의 혼돈 주문서 6 장을 획득했습니다!"));
	cm.gainItem(2049153,6);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049153# #b#z2049153##k #r6 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}


	} else if (Randomizer.nextInt(750) <= 57) { // 영원한 환생의 불꽃 6 개
	if (cm.canHold(2048717)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 영원한 환생의 불꽃 6 개를 획득했습니다!"));
	cm.gainItem(2048717,6);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2048717# #b#z2048717##k #r6 개#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

	} else if (Randomizer.nextInt(750) <= 56) { // 놀라운 장비 강화 주문서 6 장
	if (cm.canHold(2049360)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 놀라운 장비 강화 주문서 6 장을 획득했습니다!"));
	cm.gainItem(2049360,6);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049360# #b#z2049360##k #r6 장#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}
 

        		} else if (Randomizer.nextInt(750) <= 55) { // 놀라운 긍정의 혼돈의 주문서 8 장
			if (cm.canHold(2049153)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 놀라운 긍정의 혼돈 주문서 8 장을 획득했습니다!"));
			cm.gainItem(2049153,8);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049153# #b#z2049153##k #r8 장#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}

			} else if (Randomizer.nextInt(750) <= 54) { // 영원한 환생의 불꽃 8 개
			if (cm.canHold(2048717)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 영원한 환생의 불꽃 8 개를 획득했습니다!"));
			cm.gainItem(2048717,8);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2048717# #b#z2048717##k #r8 개#k");
			cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}

        		} else if (Randomizer.nextInt(750) <= 53) { // 놀라운 장비 강화 주문서 8 장
			if (cm.canHold(2049360)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 놀라운 장비 강화 주문서 8 장을 획득했습니다!"));
			cm.gainItem(2049360,8);
			cm.gainItem(boxcode, -1);
        		cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2049360# #b#z2049360##k #r8 장#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}



        } else if (Randomizer.nextInt(750) <= 52) { // 초월력 100 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 초월력 포인트 100 P 를 획득했습니다!"));
        cm.getPlayer().gainTSD(100);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#b초월력 포인트#k #r100 P#k\r\n#r초월력 포인트 합계 : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();


        } else if (Randomizer.nextInt(750) <= 51) { // 초월력 110 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 초월력 포인트 110 P 를 획득했습니다!"));
        cm.getPlayer().gainTSD(110);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#b초월력 포인트#k #r110 P#k\r\n#r초월력 포인트 합계 : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 50) { // 초월력 120 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 초월력 포인트 120 P 를 획득했습니다!"));
        cm.getPlayer().gainTSD(120);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#b초월력 포인트#k #r120 P#k\r\n#r초월력 포인트 합계 : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 49) { // 초월력 130 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 초월력 포인트 130 P 를 획득했습니다!"));
        cm.getPlayer().gainTSD(130);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#b초월력 포인트#k #r130 P#k\r\n#r초월력 포인트 합계 : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 48) { // 초월력 140 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 초월력 포인트 140 P 를 획득했습니다!"));
        cm.getPlayer().gainTSD(140);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#b초월력 포인트#k #r140 P#k\r\n#r초월력 포인트 합계 : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();

        } else if (Randomizer.nextInt(750) <= 47) { // 초월력 150 P
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 초월력 포인트 150 P 를 획득했습니다!"));
        cm.getPlayer().gainTSD(150);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#b초월력 포인트#k #r150 P#k\r\n#r초월력 포인트 합계 : "+cm.getPlayer().gettranscendence()+" P#k");
        cm.dispose();




	} else if (Randomizer.nextInt(750) <= 44) { // 복불복 한손무기 공격력 1 장
	if (cm.canHold(2046991)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 복불복 한손무기 공격력 주문서 1 장을 획득했습니다!"));
	cm.gainItem(2046991,1);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2046991# #b#z2046991##k #r1 장#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(750) <= 43) { // 복불복 두손무기 공격력 1 장
	if (cm.canHold(2047814)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 복불복 두손무기 공격력 주문서 1 장을 획득했습니다!"));
	cm.gainItem(2047814,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2047814# #b#z2047814##k #r1 장#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

	} else if (Randomizer.nextInt(750) <= 42) { // 복불복 한손무기 마력 1 장
	if (cm.canHold(2046992)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 복불복 한손무기 마력 주문서 1 장을 획득했습니다!"));
	cm.gainItem(2046992,1);
	cm.gainItem(boxcode, -1);
	cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2046992# #b#z2046992##k #r1 장#k");
	cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

			} else if (Randomizer.nextInt(750) <= 40) { // 복불복 한손무기 공격력 2 장
			if (cm.canHold(2046991)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 복불복 한손무기 공격력 주문서 2 장을 획득했습니다!"));
			cm.gainItem(2046991,2);
			cm.gainItem(boxcode, -1);
			cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2046991# #b#z2046991##k #r2 장#k");
			cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}

        		} else if (Randomizer.nextInt(750) <= 39) { // 복불복 두손무기 공격력 2 장
			if (cm.canHold(2047814)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 복불복 두손무기 공격력 주문서 2 장을 획득했습니다!"));
			cm.gainItem(2047814,2);
			cm.gainItem(boxcode, -1);
        		cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2047814# #b#z2047814##k #r2 장#k");
        		cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}

		        } else if (Randomizer.nextInt(750) <= 38) { // 복불복 한손무기 마력 2 장
			if (cm.canHold(2046992)) {
			//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 복불복 한손무기 마력 주문서 2 장을 획득했습니다!"));
			cm.gainItem(2046992,2);
			cm.gainItem(boxcode, -1);
		        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i2046992# #b#z2046992##k #r2 장#k");
		        cm.dispose();
			} else {
			cm.sendOk("#fn나눔고딕 Extrabold##r소비 창에 빈 공간이 없습니다.#k");
			cm.dispose();
			}

        } else if (Randomizer.nextInt(750) <= 35) { // 영혼석 1 개
	if (cm.canHold(4001869)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 뒤틀린 낙인의 영혼석 1 개를 획득했습니다!"));
	cm.gainItem(4001869,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4001869# #b#z4001869##k #r1 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

        } else if (Randomizer.nextInt(750) <= 30) { // 영혼석 2 개
	if (cm.canHold(4001869)) {
	//World.Broadcast.broadcastSmega(CField.getGameMessage(10, "[럭셔리 상자] > ["+ cm.getPlayer().getName()+"] 님께서 "+(cm.getClient().getChannel()+1) +" 채널에서 뒤틀린 낙인의 영혼석 1 개를 획득했습니다!"));
	cm.gainItem(4001869,1);
	cm.gainItem(boxcode, -1);
        cm.sendOk("#fn나눔고딕 Extrabold##d진심으로 축하드립니다.!!#k\r\n#b#z"+boxcode+"##k 에서 아래의 보상이 나왔습니다.\r\n\r\n#i4001869# #b#z4001869##k #r1 개#k");
        cm.dispose();
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r기타 창에 빈 공간이 없습니다.#k");
	cm.dispose();
	}

	} else {
        cm.sendOk("#fn나눔고딕 Extrabold#상자를 열기에는.. 당신의 힘이 부족해요..\r\n한..번.. #d다시 시도#k .. 해보실래요..?");
        cm.dispose();
	}

        cm.dispose();
    }
}

