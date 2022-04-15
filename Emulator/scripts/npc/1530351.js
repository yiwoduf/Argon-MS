importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);

importPackage(Packages.provider);
importPackage(Packages.tools);
importPackage(Packages.client);
importPackage(Packages.server);


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
	var text = "#fn나눔고딕 Extrabold#\r\n#d#h ##k 님 안녕하세요.\r\n\r\n#b검색#k #fs14##r1번#k#fs11# 을 통해 #b모든 캐시 아이템#k 을 구입 해보세요.\r\n"
            text+= "#Cgray#(아이템의 가격은 캐시 아이템 한 개당#k #r300 만 메소 + M 코인 30 개#k #Cgray#입니다.)#k\r\n\r\n#fs12#"
            text+= "#L0##d#h ##k : 아이템을 구입 하겠습니다."
            cm.sendSimple(text);
} else {
cm.sendOk("#fn나눔고딕 Extrabold##r캐시템 검색 구매 기능은 레벨 200 이상만 이용 가능합니다.",9062004);
cm.dispose();
}

	} else if (status == 1) {
                if(selection == 0) {
		cm.sendGetText("#fn나눔고딕 Extrabold#\r\n구매를 원하는 아이템의 이름을 검색해주세요.\r\n\r\n아이템의 정확한 명칭을 모르시나요?\r\n#b아이템의 이름 일부분만 입력해도 검색이 가능합니다.#k#fs13#\r\n\r\n#r예) 카오스 자쿰의 투구 → '자쿰' 으로 검색이 가능합니다.#k\r\n\r\n");
            }else{
                cm.dispose();
                }


	} else if (status == 2) {
	if(cm.getText().split("").length<2) { //1
	cm.sendOk("#fs12##fn나눔고딕 Extrabold##r입력한 글자가 너무 짧습니다. 두 글자 이상 입력해주세요.#k")
	cm.dispose();
	} else if(cm.getText().split("").length<3) { //2
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,2);
		var dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
		var retItems = new ArrayList();
		var it = BOWN29.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
		cm.dispose();
					}
				}
			}
		else {
					chat += "";
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
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
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5010000 && itemPair.getLeft() <= 5029999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase()) || itemPair.getLeft() >= 5390000 && itemPair.getLeft() <= 5399999 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "#fs12##fn나눔고딕 Extrabold##b해당 검색 결과입니다.#k\r\n#r원하시는 아이템을 선택해주세요.#k\r\n\r\n#d단, 아래에 아무것도 출력이 되지 않을경우\r\n꼭#k #rESC#k #d로 종료해야 팅김을 방지할 수 있습니다.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
					chat += "";
					}
				}
			}
		else {
		cm.sendOk("#fs12##fn나눔고딕 Extrabold##r해당 검색 결과가 없습니다.#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
        }
	} else if (status == 3) {
	itemid = selection;
        cm.sendSimple("#fs12##fn나눔고딕 Extrabold##i"+selection+"# #b[#z"+selection+"#]#k\r\n\r\n해당 #b아이템#k 을 구입 하시겠습니까?\r\n구매에는 #r300 만 메소 및 M 코인 30 개#k 가 소모 됩니다.\r\n\r\n구입을 원하지 않으시면 #rESC#k 를 눌러주세요.\r\n#L100##b지금 바로 구매 하겠습니다.#k");
    } else if (status == 4) {
        selection = itemid
       if (cm.getMeso() >= 3000000 && cm.haveItem(4310175, 30)) {
	if (cm.canHold(itemid)) {
        cm.gainMeso (-3000000);
        cm.gainItem (4310175,-30);
        cm.gainItem(itemid, 1)
        cm.sendOk("#fs12##fn나눔고딕 Extrabold##d구매가 완료 되었습니다.#k\r\n\r\n다른 아이템을 더 구매 하시겠습니까?\r\n\r\n#L500##b네, 다른 아이템을 구매 하겠습니다.#k\r\n#L600##r아니요, 그만 구매 하겠습니다.#k");
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r장비 또는 캐시 창을 한 칸 이상 비워주게나..#k");
	cm.dispose();
	}
	} else {
        cm.sendOk ("#fn나눔고딕 Extrabold##r구매를 위한 메소 또는 M 코인이 부족합니다.#k");
        cm.dispose();
	}
    } else if (selection == 500) {
	    cm.dispose();
	    cm.openNpc(2040052);
    } else if (selection == 600) {
	    cm.sendOk("#fn나눔고딕 Extrabold##d다음에 또 들러주세요~!#k");
	    cm.dispose();
	}
}
}

