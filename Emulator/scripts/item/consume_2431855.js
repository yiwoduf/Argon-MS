importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(Packages.provider);
importPackage(Packages.tools);
importPackage(Packages.client);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.tools.packet);
importPackage(Packages.server);
importPackage(Packages.system);


var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}
����1 = 0;
����2 = 0;
����3 = 0;
����4 = 0;
����5 = 0;
function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if(����1 == 0) {
        ��1 = "#Cgray#���� �������� ���õ��� �ʾҽ��ϴ�." ;
        } else {
        ��1 = "#i"+����1+"# #b#z"+����1+"##k �������� ���õǾ����ϴ�." 
              }
             if(����2 == 0) {
        ��2 = "#Cgray#���� �������� ���õ��� �ʾҽ��ϴ�." ;
        } else {
        ��2 = "#i"+����2+"# #b#z"+����2+"##k �������� ���õǾ����ϴ�." 
              }
        if(����3 == 0) {
        ��3 = "#Cgray#���� �������� ���õ��� �ʾҽ��ϴ�." ;
        } else {
        ��3 = "#i"+����3+"# #b#z"+����3+"##k �������� ���õǾ����ϴ�." 
              }
        if(����4 == 0) {
        ��4 = "#Cgray#���� �������� ���õ��� �ʾҽ��ϴ�." ;
        } else {
        ��4 = "#i"+����4+"# #b#z"+����4+"##k �������� ���õǾ����ϴ�." 
              }
        if(����5 == 0) {
        ��5 = "#Cgray#���� �������� ���õ��� �ʾҽ��ϴ�." ;
        } else {
        ��5 = "#i"+����5+"# #b#z"+����5+"##k �������� ���õǾ����ϴ�." 
              }
        �� = "�ȳ��ϼ���? �����÷����� ���� #b#h ##k�� ȯ���մϴ�!\r\n";
        ��+= "���� ���������� �ʱ��ڱ��� �帮�� ���ؼ� �Դ�ϴ�.\r\n\r\n";
        ��+= "#L0#"+��1+"#l\r\n"
        ��+= "#L1#"+��2+"#l\r\n";
        ��+= "#L2#"+��3+"#l\r\n";
        ��+= "#L3#"+��4+"#l\r\n";
        ��+= "#L4#"+��5+"#l\r\n\r\n";
        ��+= "#k#L5#���� �Ϸ�! �� �������� ��������!"
        cm.sendSimple(��);
    } else if (status == 1) {
       ���� = selection;
       if(selection !=5) {
       cm.sendGetText(" \r\n�ʱ������� ���Ͻô� #r#eĳ�� �����#k#n�� �̸��� �˻��غ�����!\r\n��? �������� ��Ȯ�� ��Ī�� �𸥽Ŵٰ��?\r\n#b���� ������, �Ϻκи� �Է��ص� �˻��� �����ϴ�ϴ�.\r\n\r\n#e#r��) ������ ���� �� ������ �˻��� �����մϴ�.\r\n\r\n");
       } else {
       if(����1 != 0 && ����2 != 0 && ����3 != 0 && ����4 != 0 && ����5 != 0) {
       givePeriodItem(����1,50,50,50,50,10,10,8,240);
       givePeriodItem(����2,50,50,50,50,10,10,8,240);
       givePeriodItem(����3,50,50,50,50,10,10,8,240);
       givePeriodItem(����4,50,50,50,50,10,10,8,240);
       givePeriodItem(����5,50,50,50,50,10,10,8,240);
       cm.gainMeso(100000000);
       cm.sendOk("��~ #b#h #��#k���� �����Ͻ� �����۵��� ��Ⱦ��! �����ۿ��� #b������ ����#k�� �ٿ� ��Ȱ��, #b�޼�#k�� ���� ��ȴ�ϴ�. ������ �ٷн��丮�� ������ �÷��� �� �ּ���!");
       cm.gainItem(2431855,-1)
       cm.dispose();
       } else {
       cm.sendOk("���? #b�������� �� �������� ������ ��#k ��������?\r\n�������� �� ���� �ϼ̴��� #b�ٽ� Ȯ��#k�� �ּ���!");
       cm.dispose();
       }
        }
    } else if (status == 2) {
       if(���� !=5) {
       if(cm.getText().equals(" ")) {
	cm.sendOk("�Է��� ���ڰ� �ʹ� ª���ϴ�. ���� �� �ڼ��ϰ� �����ּ���.")
	cm.dispose();
	} else {
		var chat = "";
		var search = cm.getText().length() == 1 ? cm.getText() : cm.getText().substring(0,2);
		var dataProvider = MapleDataProviderFactory.fileInWZPath("String.wz");
		var retItems = new ArrayList();
		var it = ItemInformation.getInstance().getAllItems().iterator();
		while(it.hasNext()) {
		var itemPair = it.next();
			if (itemPair.getLeft() >= 1000000 && itemPair.getLeft() <= 1800000 && itemPair.getRight().toLowerCase().contains(search.toLowerCase())) {
				retItems.add(itemPair.getLeft());
			}
		}
		if (retItems != null && retItems.size() > 0) {
				chat += "�˻� ����Դϴ�. ���Ͻô� �������� �������ּ���.#b\r\n";
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
		chat += "#b#e�߰ߵ� �������� �����ϴ�.#n#k";
	}
       
	cm.sendSimple(chat);
	}
       }
       } else if (status == 3) {
        if (���� == 0) {
        ����1 = selection;
        cm.sendOk("��~ #i"+����1+"# #b#z"+����1+"##k �������� ���ôٴ�~\r\n���� #h #���� �ȸ��� �ſ� �پ�ñ���!");
        } else if (���� == 1) {
        ����2 = selection;
         cm.sendOk("��~ #i"+����2+"# #b#z"+����2+"##k �������� ���ôٴ�~\r\n���� #h #���� �ȸ��� �ſ� �پ�ñ���!");
 } else if (���� == 2) {
        ����3 = selection;
         cm.sendOk("��~ #i"+����3+"# #b#z"+����3+"##k �������� ���ôٴ�~\r\n���� #h #���� �ȸ��� �ſ� �پ�ñ���!");
 } else if (���� == 3) {
        ����4 = selection;
         cm.sendOk("��~ #i"+����4+"# #b#z"+����4+"##k �������� ���ôٴ�~\r\n���� #h #���� �ȸ��� �ſ� �پ�ñ���!");
 } else {
        ����5 = selection;
         cm.sendOk("��~ #i"+����5+"# #b#z"+����5+"##k �������� ���ôٴ�~\r\n���� #h #���� �ȸ��� �ſ� �پ�ñ���!");
         }
        status -=4;
     }
    
}

function givePeriodItem(ItemNum, Str, Dex, Int, Luk, Watk, Matk, Flag, Hour) {
	Item = ItemInformation.getInstance().getEquipById(ItemNum);
	Item.setStr(Str);
	Item.setDex(Dex);
	Item.setInt(Int);
	Item.setLuk(Luk);
	Item.setWatk(Watk);
	Item.setMatk(Matk);
	Item.setFlag(Flag);
	Item.setExpiration(Number(System.currentTimeMillis()) + Number(3600 * Hour * 1000));
	InventoryManipulator.addFromDrop(cm.getClient(), Item, false);
}