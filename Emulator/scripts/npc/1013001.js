importPackage(Packages.constants);

var status = 0;
var invs = Array(1, 5);
var invv;
var selected;
var slot_1 = Array();
var slot_2 = Array();
var statsSel;
var �� = "#fUI/FarmUI.img/objectStatus/star/whole#";

function start() {
	action(1,0,0);
}

function action(mode, type, selection) {
	if (mode != 1) {
		cm.dispose();
		return;
	}
	status++;
	if (status == 1) {
		var a = Array(1,2,3);
		var b = 4;
		a.push(b);
		var txt = "       #fn������� Extrabold##fs17#"+��+" "+ServerConstants.serverName+" ����� �ɼ� �ʱ�ȭ "+��+"\r\n#fs10##Cgray#               ���Ͻô� ����� �ɼ��� �ʱ�ȭ ���� ���θ� �������ּ���.#k\r\n\r\n#fs11#�������� �ɼ��� �ʱ�ȭ�ϰ� �����Ű���?\r\n�������� �ʱ�ȭ �ϰԵǸ� �������� �ɼ��� ��ȭ�� \r\n#r�����̳� ����ɷ�, ����ų�#k �� ��� ���ŵ˴ϴ�.\r\n\r\n#d * �ʱ�ȭ�� 500 �鸸 �޼Ұ� �ʿ��մϴ�.\r\n * ������� ���� ����� ��������� å������ �ʽ��ϴ�.#d\r\n";
		txt += "#L1##b��. �������� �ɼ��� �ʱ�ȭ ���ּ���.#k\r\n";
		txt += "#L2##r�ƴϿ�. ������ �̿��ϰڽ��ϴ�.#k\r\n";
		cm.sendSimple(txt);
	} else if (status == 2) {
		var ok = false;
		var selStr = "#fn������� Extrabold#�ʱ�ȭ�� ���ϴ� �������� ����ּ���.\r\n#dȤ�� �������̶�� ���� ������ �Ŀ� �õ��ϼ���.#k\r\n\r\n#r * �ʱ�ȭ�� 500 �鸸 �޼Ұ� �ʿ��մϴ�.#k\r\n";
		for (var x = 0; x < invs.length; x++) {
			var inv = cm.getInventory(invs[x]);
			for (var i = 0; i <= inv.getSlotLimit(); i++) {
				if (x == 0) {
					slot_1.push(i);
				} else {
					slot_2.push(i);
				}
				var it = inv.getItem(i);
				if (it == null) {
					continue;
				}
				if (cm.isCash(it.getItemId())){
				var itemid = 0;
				}else{
				var itemid = it.getItemId();
				}
				
				if (selection == 1){
				if (!GameConstants.isEquip(itemid)) {
					continue;
				}
				}else if (selection == 2){
					continue;
				}
				ok = true;
				selStr += "#L" + (invs[x] * 1000 + i) + "##v" + itemid + "##t" + itemid + "##l\r\n";
			}
		}
		if (!ok && selection == 1) {
			cm.sendOk("#fn������� Extrabold##r��� �������� �ϳ��� ���µ���? Ȥ�� �����ϰ� ��Ű� �ƴѰ���?#k");
			cm.dispose();
			return;
		}
 		if (selection == 1){
		if (cm.getMeso()>=5000000){
		cm.sendSimple(selStr + "#k");
		}else{
		cm.sendOk("#fn������� Extrabold##r�޼Ұ� �����մϴ�#k");
		cm.dispose();
		}
		}else if (selection == 2){
		cm.sendOk("#fn������� Extrabold##d������ �� ���ּ���.#k");
		cm.dispose();
		}
	} else if (status == 3) {
		invv = selection / 1000;
		selected = selection % 1000;
		var inzz = cm.getInventory(invv);
		if (invv == invs[0]) {
			statsSel = inzz.getItem(slot_1[selected]);
		} else {
			statsSel = inzz.getItem(slot_2[selected]);
		}
		if (statsSel == null) {
			cm.sendOk("Error, please try again.");
			cm.dispose();
			return;
		}
		var item = statsSel.getItemId();
		if(cm.isCash(item)){
		cm.sendOk("#fn������� Extrabold##rĳ���������� �ʱ�ȭ�� �� �� �����ϴ�.#k");
		}else{
		cm.sendOk("#fn������� Extrabold#�ʱ�ȭ �� �������� #b#i"+statsSel.getItemId()+"#(#z"+statsSel.getItemId()+"#)#k �½��ϱ�?");
		}
	} else if (status == 4) {
		cm.gainItem(statsSel.getItemId(),-1);
		cm.gainItem(statsSel.getItemId(),1);
		//cm.gainPotentialItem(statsSel.getItemId(),1,grade,thing,potential_1,potential_2,potential_3);
		//var option = statsSel;
		//var grade = option.getLines();
		//var thing = option.getState();
		//var potential_1 = option.getPotential1();
		//var potential_2 = option.getPotential2();
		//var potential_3 = option.getPotential3();
		//cm.gainPotentialItem(statsSel.getItemId(),1,grade,thing,potential_1,potential_2,potential_3);
		cm.gainMeso(-5000000);
		cm.sendOk("#fn������� Extrabold##b#i"+statsSel.getItemId()+"#(#z"+statsSel.getItemId()+"#)#k �� �ʱ�ȭ�� ���������� �Ϸ�Ǿ����ϴ�.");		
		cm.dispose();
	}
}
