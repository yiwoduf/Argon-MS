importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);

importPackage(Packages.provider);
importPackage(Packages.tools);
importPackage(Packages.client);
importPackage(Packages.server);

importPackage(Packages.constants);

importPackage(Packages.client.inventory);
importPackage(Packages.client);

var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";


var status = -1;

var oldsel = 0;
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
	var text = "                 #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 펫 상점 "+별+"\r\n#fs10##Cgray#                                원하시는 메뉴를 선택해주세요.#k#fs12#\r\n\r\n"
		text+= "나처럼 귀여운 펫이 갖고싶냐옹~!?\r\n그렇다면 #d검색#k #fs14##r1번#k#fs11# 을 통해 #b모든 펫#k 을 구입을 할 수 있다능.. 냐옹!!\r\n\r\n"
		text+= "#r* 펫 구입은 썸머리밋 코인 50 개를 소모합니다.#k\r\n\r\n"
		text+= "#L0##b펫을 구입 하겠습니다.#k"
		cm.sendSimple(text);
} else {
cm.sendOk("#fn나눔고딕 Extrabold##r펫 상점은 레벨 200 이상만 이용 가능합니다.");
cm.dispose();
}
	} else if (status == 1) {
                if(selection == 0) {
		cm.sendGetText("#fn나눔고딕 Extrabold#\r\n구매를 원하는 아이템의 이름을 검색하면된다능..~ 냐옹~!\r\n\r\n아이템의 정확한 명칭을 모르냐옹?\r\n#b아이템의 이름 일부분만 입력해도 검색이 된다냐옹~!#k#fs13#\r\n\r\n#r예) 쁘띠 데미안 → '데미안' 으로 검색이 가능합니다.#k\r\n\r\n");
            }else{
                cm.dispose();
                }


	} else if (status == 2) {
	if(cm.getText().split("").length<2) { //1
	cm.sendOk("#fs12##fn나눔고딕 Extrabold##r입력한 글자가 너무 짧다냐옹~.. 두 글자 이상 입력해달라능.. 냐옹~#k")
	cm.dispose();
	} else if(cm.getText().split("").length<3) { //2
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,2);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
        }
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<4) { //3
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,3);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";

				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<5) { //4
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,4);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<6) { //5
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,5);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<7) { //6
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,6);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<8) { //7
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,7);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<9) { //8
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,8);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<10) { //9
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,9);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<11) { //10
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,10);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();	
        }
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<12) { //11
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,11);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else if(cm.getText().split("").length<13) { //12
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,12);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
	} else {
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,2); //last 2
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 5000000 && itemPair.getLeft() <= 5001050 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과다냐옹..!#k\r\n#r원하는 아이템을 선택해주라능.. 냐옹!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없다능.. 냐옹..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
        }
	} else if (status == 3) {
	itemid = selection;
        cm.sendSimple("#fs12##fn나눔고딕 Extrabold##i"+selection+"# #d[#z"+selection+"#]#k\r\n\r\n이 #b펫#k 을 구입하고 싶냐능.. 냐옹?\r\n구매에는 #b썸머리밋 코인#K - #r50 개#k 가 소모된다냐옹~!\r\n\r\n구입을 원지 않으면 #rESC#k 를 눌러주라능.. 냐옹!..\r\n#L100##b지금 바로 구매 하겠습니다.#k");
    } else if (status == 4) {
        selection = itemid;
	if (cm.haveItem(4310129, 50)) {
	if (cm.canHold(itemid)) {
        cm.gainItem (4310129,-50);
        cm.BuyPET(itemid)
        cm.sendOk("#fs12##fn나눔고딕 Extrabold##d구매가 완료 되었다냐옹..!#k\r\n\r\n다른 #b펫#k 을 더 구매하고 싶냐옹~?\r\n\r\n#L500##b네, 다른 펫을 구매 하겠습니다.#k\r\n#L600##r아니요, 그만 구매 하겠습니다.#k");
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r장비 창을 한 칸 이상 비워주라능.. 냐옹..#k");
	cm.dispose();
	}
	} else {
        cm.sendOk ("#fn나눔고딕 Extrabold##r구매를 위한 썸머리밋 코인이 부족하다능.. 냐옹..#k");
        cm.dispose();
	}
    } else if (selection == 500) {
	    cm.dispose();
	    cm.openNpc(2155110);
    } else if (selection == 600) {
	    cm.sendOk("#fn나눔고딕 Extrabold##d다음에 또 보면 좋을거라능.. 냐옹!#k");
	    cm.dispose();
	}
}
}

