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
	var text = "#fn������� Extrabold#\r\n#d#h ##k �� �ȳ��ϼ���.\r\n\r\n#b�˻�#k #fs14##r1��#k#fs11# �� ���� #b��� ĳ�� ������#k �� ���� �غ�����.\r\n"
            text+= "#Cgray#(�������� ������ ĳ�� ������ �� ����#k #r300 �� �޼� + M ���� 30 ��#k #Cgray#�Դϴ�.)#k\r\n\r\n#fs12#"
            text+= "#L0##d#h ##k : �������� ���� �ϰڽ��ϴ�."
            cm.sendSimple(text);
} else {
cm.sendOk("#fn������� Extrabold##rĳ���� �˻� ���� ����� ���� 200 �̻� �̿� �����մϴ�.",9062004);
cm.dispose();
}

	} else if (status == 1) {
                if(selection == 0) {
		cm.sendGetText("#fn������� Extrabold#\r\n���Ÿ� ���ϴ� �������� �̸��� �˻����ּ���.\r\n\r\n�������� ��Ȯ�� ��Ī�� �𸣽ó���?\r\n#b�������� �̸� �Ϻκи� �Է��ص� �˻��� �����մϴ�.#k#fs13#\r\n\r\n#r��) ī���� ������ ���� �� '����' ���� �˻��� �����մϴ�.#k\r\n\r\n");
            }else{
                cm.dispose();
                }


	} else if (status == 2) {
	if(cm.getText().split("").length<2) { //1
	cm.sendOk("#fs12##fn������� Extrabold##r�Է��� ���ڰ� �ʹ� ª���ϴ�. �� ���� �̻� �Է����ּ���.#k")
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
				var it2 = retItems.iterator();
				while(it2.hasNext()) {
				var singleRetItem = it2.next();
					if(cm.isCash(singleRetItem)) {
					chat += "#L"+singleRetItem+"##i"+singleRetItem+"# #z"+singleRetItem+"#\r\n";
					} else {
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
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
				chat += "#fs12##fn������� Extrabold##b�ش� �˻� ����Դϴ�.#k\r\n#r���Ͻô� �������� �������ּ���.#k\r\n\r\n#d��, �Ʒ��� �ƹ��͵� ����� ���� �������\r\n��#k #rESC#k #d�� �����ؾ� �ñ��� ������ �� �ֽ��ϴ�.#k\r\n#b";
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
		cm.sendOk("#fs12##fn������� Extrabold##r�ش� �˻� ����� �����ϴ�.#k");
		cm.dispose();
	}
	cm.sendSimple(chat);
        }
	} else if (status == 3) {
	itemid = selection;
        cm.sendSimple("#fs12##fn������� Extrabold##i"+selection+"# #b[#z"+selection+"#]#k\r\n\r\n�ش� #b������#k �� ���� �Ͻðڽ��ϱ�?\r\n���ſ��� #r300 �� �޼� �� M ���� 30 ��#k �� �Ҹ� �˴ϴ�.\r\n\r\n������ ������ �����ø� #rESC#k �� �����ּ���.\r\n#L100##b���� �ٷ� ���� �ϰڽ��ϴ�.#k");
    } else if (status == 4) {
        selection = itemid
       if (cm.getMeso() >= 3000000 && cm.haveItem(4310175, 30)) {
	if (cm.canHold(itemid)) {
        cm.gainMeso (-3000000);
        cm.gainItem (4310175,-30);
        cm.gainItem(itemid, 1)
        cm.sendOk("#fs12##fn������� Extrabold##d���Ű� �Ϸ� �Ǿ����ϴ�.#k\r\n\r\n�ٸ� �������� �� ���� �Ͻðڽ��ϱ�?\r\n\r\n#L500##b��, �ٸ� �������� ���� �ϰڽ��ϴ�.#k\r\n#L600##r�ƴϿ�, �׸� ���� �ϰڽ��ϴ�.#k");
	} else {
	cm.sendOk("#fn������� Extrabold##r��� �Ǵ� ĳ�� â�� �� ĭ �̻� ����ְԳ�..#k");
	cm.dispose();
	}
	} else {
        cm.sendOk ("#fn������� Extrabold##r���Ÿ� ���� �޼� �Ǵ� M ������ �����մϴ�.#k");
        cm.dispose();
	}
    } else if (selection == 500) {
	    cm.dispose();
	    cm.openNpc(2040052);
    } else if (selection == 600) {
	    cm.sendOk("#fn������� Extrabold##d������ �� �鷯�ּ���~!#k");
	    cm.dispose();
	}
}
}

