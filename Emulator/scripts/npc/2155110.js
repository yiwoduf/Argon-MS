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

var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";


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
	var text = "                 #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" �� ���� "+��+"\r\n#fs10##Cgray#                                ���Ͻô� �޴��� �������ּ���.#k#fs12#\r\n\r\n"
		text+= "��ó�� �Ϳ��� ���� ����ͳĿ�~!?\r\n�׷��ٸ� #d�˻�#k #fs14##r1��#k#fs11# �� ���� #b��� ��#k �� ������ �� �� �ִٴ�.. �Ŀ�!!\r\n\r\n"
		text+= "#r* �� ������ ��Ӹ��� ���� 50 ���� �Ҹ��մϴ�.#k\r\n\r\n"
		text+= "#L0##b���� ���� �ϰڽ��ϴ�.#k"
		cm.sendSimple(text);
} else {
cm.sendOk("#fn������� Extrabold##r�� ������ ���� 200 �̻� �̿� �����մϴ�.");
cm.dispose();
}
	} else if (status == 1) {
                if(selection == 0) {
		cm.sendGetText("#fn������� Extrabold#\r\n���Ÿ� ���ϴ� �������� �̸��� �˻��ϸ�ȴٴ�..~ �Ŀ�~!\r\n\r\n�������� ��Ȯ�� ��Ī�� �𸣳Ŀ�?\r\n#b�������� �̸� �Ϻκи� �Է��ص� �˻��� �ȴٳĿ�~!#k#fs13#\r\n\r\n#r��) �ڶ� ���̾� �� '���̾�' ���� �˻��� �����մϴ�.#k\r\n\r\n");
            }else{
                cm.dispose();
                }


	} else if (status == 2) {
	if(cm.getText().split("").length<2) { //1
	cm.sendOk("#fs12##fn������� Extrabold##r�Է��� ���ڰ� �ʹ� ª�ٳĿ�~.. �� ���� �̻� �Է��ش޶��.. �Ŀ�~#k")
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";

				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����ٳĿ�..!#k\r\n#r���ϴ� �������� �������ֶ��.. �Ŀ�!#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
				}
			}
		else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� ���ٴ�.. �Ŀ�..#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
        }
	} else if (status == 3) {
	itemid = selection;
        cm.sendSimple("#fs12##fn������� Extrabold##i"+selection+"# #d[#z"+selection+"#]#k\r\n\r\n�� #b��#k �� �����ϰ� �ͳĴ�.. �Ŀ�?\r\n���ſ��� #b��Ӹ��� ����#K - #r50 ��#k �� �Ҹ�ȴٳĿ�~!\r\n\r\n������ ���� ������ #rESC#k �� �����ֶ��.. �Ŀ�!..\r\n#L100##b���� �ٷ� ���� �ϰڽ��ϴ�.#k");
    } else if (status == 4) {
        selection = itemid;
	if (cm.haveItem(4310129, 50)) {
	if (cm.canHold(itemid)) {
        cm.gainItem (4310129,-50);
        cm.BuyPET(itemid)
        cm.sendOk("#fs12##fn������� Extrabold##d���Ű� �Ϸ� �Ǿ��ٳĿ�..!#k\r\n\r\n�ٸ� #b��#k �� �� �����ϰ� �ͳĿ�~?\r\n\r\n#L500##b��, �ٸ� ���� ���� �ϰڽ��ϴ�.#k\r\n#L600##r�ƴϿ�, �׸� ���� �ϰڽ��ϴ�.#k");
	} else {
	cm.sendOk("#fn������� Extrabold##r��� â�� �� ĭ �̻� ����ֶ��.. �Ŀ�..#k");
	cm.dispose();
	}
	} else {
        cm.sendOk ("#fn������� Extrabold##r���Ÿ� ���� ��Ӹ��� ������ �����ϴٴ�.. �Ŀ�..#k");
        cm.dispose();
	}
    } else if (selection == 500) {
	    cm.dispose();
	    cm.openNpc(2155110);
    } else if (selection == 600) {
	    cm.sendOk("#fn������� Extrabold##d������ �� ���� �����Ŷ��.. �Ŀ�!#k");
	    cm.dispose();
	}
}
}

