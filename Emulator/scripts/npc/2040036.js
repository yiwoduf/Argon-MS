var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
var 작은별 = "#fUI/UIToolTip/Item/Equip/Star/Star#";

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
		var jessica = "          #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 메소 강화 상점 "+별+"\r\n#fs10##Cgray#                               원하시는 아이템을 선택해주세요.#k#fs12#\r\n\r\n";
		jessica += "--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L0##i4001832# #b#z4001832##k #d1000 개#k#l\r\n\r\n       * #i2028335# #r- 5.000 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L1##i5062009# #b#z5062009##k #d100 개#k#l\r\n\r\n       * #i2028335# #r- 1.500 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L2##i5062010# #b#z5062010##k #d100 개#k#l\r\n\r\n       * #i2028335# #r- 2.500 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L3##i5062500# #b#z5062500##k #d100 개#k#l\r\n\r\n       * #i2028335# #r- 2.800 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L4##i2049401# #b#z2049401##k #d1 개#k#l\r\n\r\n       * #i2028335# #r- 3.000 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L5##i2049400# #b#z2049400##k #d1 개#k#l\r\n\r\n       * #i2028335# #r- 3.300 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L6##i2049700# #b#z2049700##k #d1 개#k#l\r\n\r\n       * #i2028335# #r- 3.500 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L7##i2048309# #b#z2048309##k #d1 개#k#l\r\n\r\n       * #i2028335# #r- 5.000 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L8##i2049506# #b#z2049506##k #d1 개#k#l\r\n\r\n       * #i2028335# #r- 1.000 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L9##i2048304# #b#z2048304##k #d1 개#k#l\r\n\r\n       * #i2028335# #r- 1.000 만 메소 차감#k\r\n\r\n--------------------------------------------------------------------------------\r\n";

		cm.sendSimple(jessica);
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r메소 강화 상점은 레벨 200 이상만 이용 가능합니다.");
	cm.dispose();
        }
	} else if (status == 1) {
	if (selection == 0) {
           if(cm.getMeso() >= 50000000) {
	   if (cm.canHold(4001832)) {
              cm.gainMeso(-50000000);
              cm.gainItem(4001832,1000);
	      cm.sendOk("#fn나눔고딕 Extrabold##i4001832# #b#z4001832##k #d1000 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 1) {
           if(cm.getMeso() >= 15000000) {
	   if (cm.canHold(5062009)) {
              cm.gainMeso(-15000000);
              cm.gainItem(5062009,100);
	      cm.sendOk("#fn나눔고딕 Extrabold##i5062009# #b#z5062009##k #d100 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r캐시 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 2) {
           if(cm.getMeso() >= 25000000) {
	   if (cm.canHold(5062010)) {
              cm.gainMeso(-25000000);
              cm.gainItem(5062010,100);
	      cm.sendOk("#fn나눔고딕 Extrabold##i5062010# #b#z5062010##k #d100 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r캐시 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 3) {
           if(cm.getMeso() >= 28000000) {
	   if (cm.canHold(5062500)) {
              cm.gainMeso(-28000000);
              cm.gainItem(5062500,100);
	      cm.sendOk("#fn나눔고딕 Extrabold##i5062500# #b#z5062500##k #d100 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r캐시 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }

	} else if (selection == 4) {
           if(cm.getMeso() >= 30000000) {
	   if (cm.canHold(2049401)) {
              cm.gainMeso(-30000000);
              cm.gainItem(2049401,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2049401# #b#z2049401##k #d1 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 5) {
           if(cm.getMeso() >= 33000000) {
	   if (cm.canHold(2049400)) {
              cm.gainMeso(-33000000);
              cm.gainItem(2049400,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2049400# #b#z2049400##k #d1 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 6) {
           if(cm.getMeso() >= 35000000) {
	   if (cm.canHold(2049700)) {
              cm.gainMeso(-35000000);
              cm.gainItem(2049700,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2049700# #b#z2049700##k #d1 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 7) {
           if(cm.getMeso() >= 50000000) {
	   if (cm.canHold(2048309)) {
              cm.gainMeso(-50000000);
              cm.gainItem(2048309,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2048309# #b#z2048309##k #d1 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 8) {
           if(cm.getMeso() >= 10000000) {
	   if (cm.canHold(2049506)) {
              cm.gainMeso(-10000000);
              cm.gainItem(2049506,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2049506# #b#z2049506##k #d1 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 9) {
           if(cm.getMeso() >= 10000000) {
	   if (cm.canHold(2048304)) {
              cm.gainMeso(-10000000);
              cm.gainItem(2048304,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2048304# #b#z2048304##k #d1 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
}
}
}
}