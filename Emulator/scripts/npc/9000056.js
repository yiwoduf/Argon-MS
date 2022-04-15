importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.constants);
importPackage(Packages.client);
importPackage(Packages.launch);
importPackage(Packages.packet.creators);


var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";
var status = 0;
var operation = -1;
var select = -1;
var type;
var ty;
var gc = GameConstants;
var dd = true;
var yes= 1;
var invs = Array(1, 5);
var invv;
var selected;
var slot_1 = Array();
var slot_2 = Array();
var statsSel;
var sel;
var name;

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

	if (cm.getPlayer().getLevel() >= 150) {
			var ask = "              #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" ������ ���� "+��+"\r\n#fs10##Cgray#               ���Ͻô� ������ ������ ���� ������ Ÿ���� �������ּ���.#k\r\n\r\n#fs11#";
			ask +="#r#fs12#* ������ �κ��丮 ���� ������ �ݵ�� ������ Ȯ���ϼ���.#k#fs11#\r\n";
			ask +="#r#fs12#* ���� �������ϰ�� ������ ���� ���θ� ������ Ȯ���ϼ���.#k#fs11#\r\n\r\n";
			ask +="#d�� �����Ͻ� ������ ������ �������ּ���.#k\r\n";
			ask +="#L1##b[���]#k�������� ���� �ϰڽ��ϴ�.\r\n";
			ask +="#L2##b[�Һ�]#k�������� ���� �ϰڽ��ϴ�.\r\n";
			ask +="#L4##b[��Ÿ]#k�������� ���� �ϰڽ��ϴ�.\r\n";
			ask +="#L3##b[��ġ]#k�������� ���� �ϰڽ��ϴ�.\r\n";
			ask +="#L5##b[ĳ��]#k�������� ���� �ϰڽ��ϴ�.\r\n";
			ask +="#L6##b�� ������ ������ ���� ������ ��� �ͽ��ϴ�.#k"
			cm.sendSimple(ask);
	} else {
	cm.sendOk("#fn������� Extrabold##r������ ������ ���� 200 �̻� �̿� �����մϴ�.");
	cm.dispose();
        }
		} else if (status == 1) {
			operation = selection;
			if (operation == 1) {
				type = MapleInventoryType.EQUIP;
				yes = 1;
			} else if (operation == 2) {
				type = MapleInventoryType.USE;
				yes = 2;
			} else if (operation == 4) {
				type = MapleInventoryType.SETUP;
				yes = 4;
			} else if (operation == 3) {
				type = MapleInventoryType.ETC;
				yes = 3;
			} else if (operation == 5) {
				type = MapleInventoryType.CASH;
				yes = 5;
			}
			if (selection >= 1 && selection <=5) {
				cm.sendGetText("#fn������� Extrabold##b���������� ���� �г����� �Է����ּ���.#k");
			} else if (selection == 6) {
				cm.sendOk("#fn������� Extrabold#�������� #b����#k �� #b�ɼ�#k �� ������� �������Գ� ������ �����ϸ�,\r\n�ִ� #r1 õ�� �޼�#k ���� �� #d���� ä��#k �� �������̿��� �մϴ�.\r\n\r\n#r(��, ���� ���� �߻��� ������ ����� å������ �ʽ��ϴ�.)#k");
				cm.dispose();
			}
		} else if (status == 2) {
			if (operation == 1) {
				type = MapleInventoryType.EQUIP;
			} else if (operation == 2) {
				type = MapleInventoryType.USE;
			} else if (operation == 3) {
				type = MapleInventoryType.SETUP;
			} else if (operation == 4) {
				type = MapleInventoryType.ETC;
			} else if (operation == 5) {
				type = MapleInventoryType.CASH;
			}
				var item = cm.getChar().getInventory(type);
		var text = cm.getText();
		var conn = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(text);
		if (conn == null){
		cm.sendOk("#fn������� Extrabold##r���� �������� �ƴϰų� ä���� �ٸ��ϴ�.\r\n�Ǵ� �������� �ʴ� �г����� ���� �ֽ��ϴ�.#k");
		cm.dispose();
		}else{
		var ok = false;
		var selStr = "#fn������� Extrabold##d"+conn.getName()+"#k �� ���� � �������� ���� �Ͻðڽ��ϱ�?\r\n";
		for (var x = 1; x < 2; x++) {
			var inv = cm.getInventory(yes);
			for (var i = 0; i <= cm.getInventory(yes).getSlotLimit(); i++) {
				if (x == 0) {
					slot_1.push(i);
				} else {
					slot_2.push(i);
				}
				var it = inv.getItem(i);
				if (it == null) {
					continue;
				}
				var itemid = it.getItemId();
				ok = true;
				selStr += "#L" + (yes * 1000 + i) + "##v" + itemid + "##t" + itemid + "##l\r\n";
			}
		}
		if (!ok) {
			cm.sendOk("#fn������� Extrabold##r�κ��丮�� �������� �������� �ʽ��ϴ�.#k");
			cm.dispose();
			return;
		}
		cm.sendSimple(selStr + "#k");
		}
		} else if (status == 3) {
		sel = selection;
			if (operation == 1) {
				type = MapleInventoryType.EQUIP;
			} else if (operation == 2) {
				type = MapleInventoryType.USE;
			} else if (operation == 3) {
				type = MapleInventoryType.SETUP;
			} else if (operation == 4) {
				type = MapleInventoryType.ETC;
			} else if (operation == 5) {
				type = MapleInventoryType.CASH;
			}
			var item = cm.getChar().getInventory(type).getItem(selection%1000).copy();
			var text = cm.getText();
			invv = selection / 1000;
			var inzz = cm.getInventory(invv);
			selected = selection % 1000;
				if (invv == invs[0]) {
					statsSel = inzz.getItem(slot_1[selected]);
				} else {
					statsSel = inzz.getItem(slot_2[selected]);
				}
				if (statsSel == null) {
					cm.sendOk("#fn������� Extrabold##r�����Դϴ�. ��ڿ��� �������ּ���.#k");
					cm.dispose();
					return;
				}
			var text = cm.getText();
			var con = cm.getClient().getChannelServer().isMyChannelConnected(text);
			var conn = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(text);


	if (item.getQuantity() == 1){
		if (cm.getMeso()>=5000000){
			if (GameConstants.isPet(item.getItemId()) == false) {
			if (item.getItemId() !== 4001130 && item.getItemId() !== 4001131 && item.getItemId() !== 4001132 && item.getItemId() !== 4001133 && item.getItemId() !== 4001134 && item.getItemId() !== 4001135 && item.getItemId() !== 1112750 && item.getItemId() !== 4033302 && item.getItemId() !== 4033831 && item.getItemId() !== 4310129 && item.getItemId() !== 4001187 && item.getItemId() !== 4001188 && item.getItemId() !== 4001189 && item.getItemId() !== 1143032 && item.getItemId() !== 1142373 && item.getItemId() !== 1182058 && item.getItemId() !== 1142551 && item.getItemId() !== 1182062 && item.getItemId() !== 1182063 && item.getItemId() !== 1182064 && item.getItemId() !== 1182192) {
						//�ι̿��� ����			//�ٸ���������			//������ ��ü			//ī��Ű		//��ī����� �����ڷ�		//���̴���Ʈ�� �����ڷ�			//�����			//������ ������			//������ ��ǥ			 //��Ӹ��� ����			//��ġ				//��ġ				//��ġ			     //���� ����		//ũ�������� ����			// ȫ����			//����� ����			//������			//������			//�ݼ���			//���̾Ƽ���
				if (cm.getPlayer().getName() != text) {
			MapleInventoryManipulator.removeFromSlot(cm.getC(), type, selection%1000, item.getQuantity(), true);
			MapleInventoryManipulator.addFromDrop(conn.getClient(), item, true);
			conn.getClient().getSession().write(CField.getGameMessage(10, "[����] "+cm.getPlayer().getName()+" �� ���� "+BOWN29.getInstance().getName(item.getItemId())+" ��(��) ���������̽��ϴ�. �κ��丮�� Ȯ���غ�����."));
			cm.sendOk("#fn������� Extrabold##d"+text + "#k �� ���� #i"+item.getItemId()+"# #b(#t"+item.getItemId()+"#)#k ��(��) ���½��ϴ�.");
			cm.gainMeso(-5000000);
			cm.dispose();
			}else {
				cm.sendOk("#fn������� Extrabold##r�ڱ� �ڽſ��Դ� ������ �� �����ϴ�.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn������� Extrabold##r�ش� �������� �����Ͻ� �� �����ϴ�.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn������� Extrabold##r���� ������ �� �����ϴ�.#k");
				cm.dispose();
			}
			}else{
			cm.sendOk("#fn������� Extrabold##r������ ���� �޼Ұ� �����մϴ�.#k");
			cm.dispose();
			}
			}else {
				cm.sendGetNumber("#fn������� Extrabold#�� �� ���� ���� �Ͻðڽ��ϱ�?\r\n���� �������� #i"+item.getItemId()+"# #b(#t"+item.getItemId()+"#)#k ���� : #r"+item.getQuantity()+"#k",1,1,item.getQuantity());
			}
			name = text;
		}else if (status==4){

		var sele = selection%1000;
		var quan = cm.getText();
			if (operation == 1) {
				type = MapleInventoryType.EQUIP;
			} else if (operation == 2) {
				type = MapleInventoryType.USE;
			} else if (operation == 3) {
				type = MapleInventoryType.SETUP;
			} else if (operation == 4) {
				type = MapleInventoryType.ETC;
			} else if (operation == 5) {
				type = MapleInventoryType.CASH;
			}
			var item = cm.getChar().getInventory(type).getItem(sel%1000).copy();
			var text = cm.getText();
			invv = sel / 1000;
			var inzz = cm.getInventory(invv);
			selected = sel % 1000;
				if (invv == invs[0]) {
					statsSel = inzz.getItem(slot_1[selected]);
				} else {
					statsSel = inzz.getItem(slot_2[selected]);
				}
				if (statsSel == null) {
					cm.sendOk("#fn������� Extrabold##r�����Դϴ�. ��ڿ��� �������ּ���.#k");
					cm.dispose();
					return;
				}

			var text = selection;
			var con = cm.getClient().getChannelServer().isMyChannelConnected(name);
			var conn = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(name);
	if (item.getQuantity() >= text) {
		if (cm.getMeso()>=10000000){
		     if (item.getItemId() !== 4001130 && item.getItemId() !== 4001131 && item.getItemId() !== 4001132 && item.getItemId() !== 4001133 && item.getItemId() !== 4001134 && item.getItemId() !== 4001135 && item.getItemId() !== 4033302 && item.getItemId() !== 4033831 && item.getItemId() !== 4310129 && item.getItemId() !== 4001187 && item.getItemId() !== 4001188 && item.getItemId() !== 4001189) {
					//�ι̿��� ����			//�ٸ���������			//������ ��ü				//ī��Ű		//��ī����� �����ڷ�		//���̴���Ʈ�� �����ڷ�		//������ ������			 //������ ��ǥ				//��Ӹ��� ����			//��ġ				//��ġ				//��ġ
			if (cm.getPlayer().getName() != name) {
			item.setQuantity(text);
			MapleInventoryManipulator.removeFromSlot(cm.getC(), type, sel%1000, item.getQuantity(), true);
			MapleInventoryManipulator.addFromDrop(conn.getClient(), item, true);
			conn.getClient().getSession().write(CField.getGameMessage(10, "[����] "+cm.getPlayer().getName()+" �� ���� "+BOWN29.getInstance().getName(item.getItemId())+" "+item.getQuantity()+" �� �� ���������̽��ϴ�. �κ��丮�� Ȯ���غ�����."));
			cm.sendOk("#fn������� Extrabold##d"+name + "#k �� ���� #i"+item.getItemId()+"# #b(#t"+item.getItemId()+"#)#k #r"+item.getQuantity()+" ��#k �� ���½��ϴ�.");
			cm.gainMeso(-10000000)
			cm.dispose();
			}else {
				cm.sendOk("#fn������� Extrabold##r�ڱ� �ڽſ��Դ� ������ �� �����ϴ�.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn������� Extrabold##r�ش� �������� �����Ͻ� �� �����ϴ�.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn������� Extrabold##r������ ���� �޼Ұ� �����մϴ�.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn������� Extrabold##r������ �ִ� ������ �� ū ���� �Է��߽��ϴ�.#k");
				cm.dispose();
			}
		}
	}
}