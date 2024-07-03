//동화나라 잭

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
		var jessica = "#fn나눔고딕 Extrabold#숲이 너의 다이어트를 허락하려면 #b숲의 기운#k 이 #r1 개#k 필요해..\r\n";
		jessica += "그리고 니가 칼로리를 체크할때마다 #b칼로리 소모 측정기#k 가\r\n";
		jessica += "#r1 개#k 식 #r소모#k 되니간.. 필요한만큼 충분히 구입하길 바래~\r\n";
		jessica += "그리고 이미 들었겠지만 다시 한번 방법을 알려줄게~\r\n\r\n";
		jessica += "  #r*#k 다이어트 측정 방법\r\n";
		jessica += "    1. 나에게 #b숲의 기운#k과 #b측정기#k 를 둘다 구입한다.\r\n";
		jessica += "    2. 맵에서 #r일반 공격#k 을 하면 다이어트가 #r시작#k 된다.\r\n\r\n";
		jessica += "    #r→#k #d매 측정시마다 칼로리 측정기가 1 개 가 소모 된단다..#k\r\n";
		jessica += "    #r→#k #d칼로리 소모에 성공하면 가벼운 솜털을 획득할거야..#k\r\n";
		jessica += "    #r→#k #d단, 기타창이 꽉차면 솜털을 획득하지 못할수도 있어..#k\r\n";
		jessica += "    #r→#k #d솜털을 모으면 내가 여러 아이템으로 교환해줄게~#k\r\n";
		jessica += " -----------------------------------------------------------------------------\r\n";
		jessica += "#L0##i4033109# #b#t4033109##k #d구입(1개)#k - #r1 천만 메소#k\r\n";
		jessica += "#L1##i3994287# #b#t3994287##k #d구입(50개)#k - #r5 백만 메소#k#l\r\n\r\n";
		jessica += " -----------------------------------------------------------------------------\r\n";
		jessica += "#L2##i4032559# #b#t4032559##k #d교환 상점#k#l\r\n\r\n";
		jessica += " -----------------------------------------------------------------------------\r\n";
		jessica += "#L3#  #d퀘스트의 전당#k 으로 이동하기#k#l\r\n\r\n";
		jessica += " -----------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
        } else if (status == 1) {
	if (selection == 0) {
		if (cm.getMeso() >= 10000000) {
		if (cm.canHold(4033109)) {
		cm.gainItem(4033109, 1);
		cm.gainMeso(-10000000);
		cm.sendOk("#fn나눔고딕 Extrabold#이제 이 숲이 너의 다이어트를 허락할 것 같아!");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 창 을 한 칸 이상 비워주세요..#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r메소가 부족한 것 같은데..?#k");
		cm.dispose();
		}

	} else if (selection == 1) {
		if (cm.getMeso() >= 5000000) {
		if (cm.canHold(3994287)) {
		cm.gainItem(3994287, 50);
		cm.gainMeso(-5000000);
		cm.sendOk("#fn나눔고딕 Extrabold#정상 구입 되었으니, 이제 칼로리 측정을 시작해봐!");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r설치 창 을 한 칸 이상 비워주세요..#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r메소가 부족한 것 같은데..?#k");
		cm.dispose();
		}

	} else if (selection == 2) {
		var jessica3 = "#fn나눔고딕 Extrabold##b공기처럼 가벼운 솜털#k 을 갖고있니?~\r\n\r\n";
		jessica3 += " --------------------------------------------------------------------------------\r\n";
		jessica3 += "#L0##b주문서#k #i2048094# #d공격력#k #r[솜털 100]#k\r\n";
		jessica3 += "#L1##b주문서#k #i2048095# #d마   력#k #r[솜털 100]#k#l\r\n\r\n";
		jessica3 += " --------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica3);
	
	} else if (selection == 3) {
		cm.dispose();
		cm.warp(100030301,0);
		}		
        } else if (status == 2) {
	if (selection == 0) {
		if (cm.haveItem(4032559, 100)) {
		if (cm.canHold(2048094)) {
		cm.gainItem(4032559, -100);
		cm.gainItem(2048094, 1);
		cm.sendOk("#fn나눔고딕 Extrabold#덕분에 제품에 부작용 없다는것을 깨달았어!\r\n너가 원하는 #i2048094# 을 줄게~");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요..#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r솜털이 부족한 것 같은데..?#k");
		cm.dispose();
		}
	} else if (selection == 1) {
		if (cm.haveItem(4032559, 100)) {
		if (cm.canHold(2048095)) {
		cm.gainItem(4032559, -100);
		cm.gainItem(2048095, 1);
		cm.sendOk("#fn나눔고딕 Extrabold#덕분에 제품에 부작용 없다는것을 깨달았어!\r\n너가 원하는 #i2048095# 을 줄게~");
		cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요..#k");
		        cm.dispose();
		    }
	} else {
		cm.sendOk("#fn나눔고딕 Extrabold##r솜털이 부족한 것 같은데..?#k");
		cm.dispose();
		}
}
}
}
}