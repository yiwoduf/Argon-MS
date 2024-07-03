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
		var jessica = "               #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 소비 상점 "+별+"\r\n#fs10##Cgray#                               원하시는 아이템을 선택해주세요.#k#fs12#\r\n\r\n";
		jessica += "--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L0##i2000004# #b#z2000004##k #d100 개#k#l\r\n\r\n       * #i2028335# #r- 1 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L1##i2000005# #b#z2000005##k #d100 개#k#l\r\n\r\n       * #i2028335# #r- 2 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L2##i2050004# #b#z2050004##k #d100 개#k#l\r\n\r\n       * #i2028335# #r- 2 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L3##i2060002# #b#z2060002##k #d2000 개#k#l\r\n\r\n       * #i2028335# #r- 1 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L4##i2060011# #b#z2060011##k #d2000 개#k#l\r\n\r\n       * #i2028335# #r- 2 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L5##i2061002# #b#z2061002##k #d2000 개#k#l\r\n\r\n       * #i2028335# #r- 1 십만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L6##i2061009# #b#z2061009##k #d2000 개#k#l\r\n\r\n       * #i2028335# #r- 2 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L7##i2070000# #b#z2070000##k #d2500 개#k#l\r\n\r\n       * #i2028335# #r-  2 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L8##i2070023# #b#z2070023##k #d2500 개#k#l\r\n\r\n       * #i2028335# #r- 4 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L9##i2330000# #b#z2330000##k #d2500 개#k#l\r\n\r\n       * #i2028335# #r- 2 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L10##i2330016# #b#z2330016##k #d2500 개#k#l\r\n\r\n       * #i2028335# #r- 4 백만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L11##i2120000# #b#z2120000##k #d100 개#k#l\r\n\r\n       * #i2028335# #r- 1 천만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L12##i5050000# #b#z5050000##k #d1 개#k#l\r\n\r\n       * #i2028335# #r- 1 천만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		jessica += 작은별+"#L13##i5050100# #b#z5050100##k #d1 개#k#l\r\n\r\n       * #i2028335# #r- 1 천만 메소#k\r\n\r\n--------------------------------------------------------------------------------\r\n";
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
           if(cm.getMeso() > 1000000) {
	   if (cm.canHold(2000004)) {
              cm.gainMeso(-1000000);
              cm.gainItem(2000004,100);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2000004# #b#z2000004##k #d100 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 1) {
           if(cm.getMeso() > 2000000) {
	   if (cm.canHold(2000005)) {
              cm.gainMeso(-2000000);
              cm.gainItem(2000005,100);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2000005# #b#z2000005##k #d100 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 2) {
           if(cm.getMeso() > 2000000) {
	   if (cm.canHold(2050004)) {
              cm.gainMeso(-2000000);
              cm.gainItem(2050004,100);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2050004# #b#z2050004##k #d100 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 3) {
           if(cm.getMeso() > 1000000) {
	   if (cm.canHold(2060002)) {
              cm.gainMeso(-1000000);
              cm.gainItem(2060002,2000);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2060002# #b#z2060002##k #d2000 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 4) {
           if(cm.getMeso() > 2000000) {
	   if (cm.canHold(2060011)) {
              cm.gainMeso(-2000000);
              cm.gainItem(2060011,2000);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2060011# #b#z2060011##k #d2000 개#k 가 구입이 완료 되었습니다.");
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
           if(cm.getMeso() > 1000000) {
	   if (cm.canHold(2061002)) {
              cm.gainMeso(-1000000);
              cm.gainItem(2061002,2000);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2061002# #b#z2061002##k #d2000 개#k 가 구입이 완료 되었습니다.");
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
           if(cm.getMeso() > 2000000) {
	   if (cm.canHold(2061009)) {
              cm.gainMeso(-2000000);
              cm.gainItem(2061009,2000);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2061009# #b#z2061009##k #d2000 개#k 가 구입이 완료 되었습니다.");
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
           if(cm.getMeso() > 2000000) {
	   if (cm.canHold(2070000)) {
              cm.gainMeso(-2000000);
              cm.gainItem(2070000,2500);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2070000# #b#z2070000##k #d2500 개#k 가 구입이 완료 되었습니다.");
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
           if(cm.getMeso() > 4000000) {
	   if (cm.canHold(2070023)) {
              cm.gainMeso(-4000000);
              cm.gainItem(2070023,2500);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2070023# #b#z2070023##k #d2500 개#k 가 구입이 완료 되었습니다.");
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
           if(cm.getMeso() > 2000000) {
	   if (cm.canHold(2330000)) {
              cm.gainMeso(-2000000);
              cm.gainItem(2330000,2500);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2330000# #b#z2330000##k #d2500 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 10) {
           if(cm.getMeso() > 4000000) {
	   if (cm.canHold(2330016)) {
              cm.gainMeso(-4000000);
              cm.gainItem(2330016,2500);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2330016# #b#z2330016##k #d2500 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 11) {
           if(cm.getMeso() > 10000000) {
	   if (cm.canHold(2120000)) {
              cm.gainMeso(-10000000);
              cm.gainItem(2120000,100);
	      cm.sendOk("#fn나눔고딕 Extrabold##i2120000# #b#z2120000##k #d100 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 12) {
           if(cm.getMeso() > 10000000) {
	   if (cm.canHold(5050000)) {
              cm.gainMeso(-10000000);
              cm.gainItem(5050000,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i5050000# #b#z5050000##k #d1 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r캐시 창을 한 칸 이상 비워주세요.#k");
		        cm.dispose();
		    }
	   } else {
		cm.sendOk("#fn나눔고딕 Extrabold##r구매를 위한 메소 가 부족합니다.#k");
		cm.dispose();
	   }
	} else if (selection == 13) {
           if(cm.getMeso() > 10000000) {
	   if (cm.canHold(5050100)) {
              cm.gainMeso(-10000000);
              cm.gainItem(5050100,1);
	      cm.sendOk("#fn나눔고딕 Extrabold##i5050100# #b#z5050100##k #d1 개#k 가 구입이 완료 되었습니다.");
	      cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r캐시 창을 한 칸 이상 비워주세요.#k");
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