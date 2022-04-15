var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
var 파별 = "#fUI/GuildMark.img/Mark/Pattern/00004001/10#";

importPackage(Packages.constants);

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
	    if (cm.getPlayer().getLevel() >= 200) {
		var jessica = "              #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 환전 상점 "+별+"\r\n#fs10##Cgray#                               원하시는 메뉴를 선택해주세요.#k#fs12#\r\n\r\n";
		jessica += "--------------------------------------------------------------------------------\r\n";
		jessica += 파별+"#L0##i2028335# #r1 백만 메소#k 를 #i4310129# #b썸머리밋 코인#k #r1 개#k 로 환전#l\r\n";
		jessica += 파별+"#L1##i2028335# #r1 천만 메소#k 를 #i4310129# #b썸머리밋 코인#k #r10 개#k 로 환전#l\r\n";
		jessica += 파별+"#L2##i2028335# #r1 억 메소#k 를 #i4310129# #b썸머리밋 코인#k #r100 개#k 로 환전#l\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 파별+"#L3##i4310129# #b썸머리밋 코인#k #r1 개#k 를 #i2028335# #r5 십만 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L4##i4310129# #b썸머리밋 코인#k #r10 개#k 를 #i2028335# #r5 백만 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L5##i4310129# #b썸머리밋 코인#k #r100 개#k 를 #i2028335# #r5 천만 메소#k 로 환전#l\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 파별+"#L6##i4001549# #b해적왕의 금화#k #r1 개#k 를 #i2028335# #r1 십만 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L7##i4001550# #b해적왕의 금화#k #r1 개#k 를 #i2028335# #r1 백만 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L70##i4001551# #b해적왕의 금화#k #r1 개#k 를 #i2028335# #r1 천만 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L8##i4001549# #b해적왕의 금화#k #r10 개#k 를 #i2028335# #r1 백만 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L9##i4001550# #b해적왕의 금화#k #r10 개#k 를 #i2028335# #r1 천만 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L90##i4001551# #b해적왕의 금화#k #r10 개#k 를 #i2028335# #r1 억 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L10##i4001549# #b해적왕의 금화#k #r100 개#k 를 #i2028335# #r1 천만 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L11##i4001550# #b해적왕의 금화#k #r100 개#k 를 #i2028335# #r1 억 메소#k 로 환전#l\r\n";
		jessica += 파별+"#L110##i4001551# #b해적왕의 금화#k #r100 개#k 를 #i2028335# #r10 억 메소#k 로 환전#l\r\n\r\n--------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r썸머리밋 코인 환전 상점은 레벨 200 이상만 이용 가능합니다.",9062004);
	cm.dispose();
        }
	} else if (status == 1) {
	if (selection == 0) {
           if(cm.getMeso() > 1000000) {
	   if (cm.canHold(4310129)) {
              cm.gainMeso(-1000000);
              cm.gainItem(4310129,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2028335# #r1 백만 메소#k 를 #i4310129# #b썸머리밋 코인#k #r1 개#k 로 #d환전 완료#k");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i2028335# 1 백만 메소 가 필요합니다.#k");
		cm.dispose();
	   }
        } else if (selection == 1) {
           if(cm.getMeso() > 10000000) {
	   if (cm.canHold(4310129)) {
              cm.gainMeso(-10000000);
              cm.gainItem(4310129,10);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2028335# #r1 천만 메소#k 를 #i4310129# #b썸머리밋 코인#k #r10 개#k 로 #d환전 완료#k");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i2028335# 1 천만 메소 가 필요합니다.#k");
		cm.dispose();
	   }
        } else if (selection == 2) {
           if(cm.getMeso() > 680000000) {
	   if (cm.canHold(4310129)) {
              cm.gainMeso(-680000000);
              cm.gainItem(4310129,100);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2028335# #r1 억 메소#k 를 #i4310129# #b썸머리밋 코인#k #r100 개#k 로 #d환전 완료#k");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i2028335# 1 억 메소 가 필요합니다.#k");
		cm.dispose();
	   }

	} else if (selection == 3) {
           if(cm.haveItem(4310129, 1)) {
              cm.gainItem(4310129, -1);
              cm.gainMeso(500000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k #r1 개#k 를 #i2028335# #r5 십만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4310129# 1 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 4) {
           if(cm.haveItem(4310129, 10)) {
              cm.gainItem(4310129, -10);
              cm.gainMeso(5000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k #r10 개#k 를 #i2028335# #r5 백만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4310129# 10 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 5) {
           if(cm.haveItem(4310129, 100)) {
              cm.gainItem(4310129, -100);
              cm.gainMeso(50000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k #r100 개#k 를 #i2028335# #r5 천만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4310129# 100 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 6) {
           if(cm.haveItem(4001549, 1)) {
              cm.gainItem(4001549, -1);
              cm.gainMeso(100000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b해적왕의 금화#k #r1 개#k 를 #i2028335# #r1 십만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001549# 1 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 7) {
           if(cm.haveItem(4001550, 1)) {
              cm.gainItem(4001550, -1);
              cm.gainMeso(1000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##해적왕의 금화#k #r1 개#k 를 #i2028335# #r1 백만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001550# 1 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 8) {
           if(cm.haveItem(4001549, 10)) {
              cm.gainItem(4001549, -10);
              cm.gainMeso(1000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b해적왕의 금화#k #r10 개#k 를 #i2028335# #r1 백만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001549# 10 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 9) {
           if(cm.haveItem(4001550, 10)) {
              cm.gainItem(4001550, -10);
              cm.gainMeso(10000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b해적왕의 금화#k #r10 개#k 를 #i2028335# #r1 천만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001550# 10 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 10) {
           if(cm.haveItem(4001549, 100)) {
              cm.gainItem(4001549, -100);
              cm.gainMeso(10000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b해적왕의 금화#k #r100 개#k 를 #i2028335# #r1 천만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001549# 100 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 11) {
           if(cm.haveItem(4001550, 100)) {
              cm.gainItem(4001550, -100);
              cm.gainMeso(680000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b해적왕의 금화#k #r100 개#k 를 #i2028335# #r1 억 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001550# 100 개 가 필요합니다.#k");
		cm.dispose();
	   }

	} else if (selection == 70) {
           if(cm.haveItem(4001551, 1)) {
              cm.gainItem(4001551, -1);
              cm.gainMeso(10000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##해적왕의 금화#k #r1 개#k 를 #i2028335# #r1 천만 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001551# 1 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 90) {
           if(cm.haveItem(4001551, 10)) {
              cm.gainItem(4001551, -10);
              cm.gainMeso(680000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b해적왕의 금화#k #r10 개#k 를 #i2028335# #r1 억 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001551# 10 개 가 필요합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 110) {
           if(cm.haveItem(4001551, 100)) {
              cm.gainItem(4001551, -100);
              cm.gainMeso(6800000000);
	      cm.sendOk("#fn나눔고딕 Extrabold##b해적왕의 금화#k #r100 개#k 를 #i2028335# #r10 억 메소#k 로 #d환전 완료#k");
	      cm.dispose();
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r환전을 하기 위해서는 #i4001551# 100 개 가 필요합니다.#k");
		cm.dispose();
	   }
}
}
}
}