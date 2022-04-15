
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.constants);

var arr = new Array(1004422,1052882,1102775,1082636,1073030,1152174,1004423,1052887,1102794,1082637,1073032,1152176,1004424,1052888,1102795,1082638,1073033,1152177,1004425,1052889,1102796,1082639,1073034,1152178,1004426,1052890,1102797,1082640,1073035,1152179);

function setItem(slot,stat,name){
	cm.getEquip(slot).setOwner(name);
	cm.getEquip(slot).setDownLevel(stat);;
	cm.getEquip(slot).setBossDamage(stat);
	cm.getEquip(slot).setAllStatP(stat);
	cm.getEquip(slot).setAllDamageP(stat);
}

function start() {
	var st = "#fn������� Extrabold##b�ۼַ��� ���潺 �ý���#k �� ���Ͽ� ���� ������ ���� �����ϼ���.\r\n\r\n#d* ���Ͻô� �ۼַ��� ���潺�� ���� ���ּ���.#k\r\n\r\n                                      #b�ʿ� ����Ʈ#k : #r"+cm.getRC()+" P#k\r\n";
	for(var i = 0;i<arr.length;i++){
		st += "#L"+arr[i]+"##d#i"+arr[i]+"# #z"+arr[i]+"#\r\n";
	}
	cm.sendSimple(st);
}

function itemCheck() {
	for(var i=0;arr.length;i++){
		if(cm.haveItem(arr[i])){return true;}			
	}
	for(var i=0;arr.length;i++){
		if(!cm.haveItem(arr[i])){return false;}			
	}
}

var status = -1;
var item;
var stat;
var name;
var cost;
var sel;
var slot = -1;

function action(m,t,s){
	m==1?status++:m==0?status--||cm.dispose():cm.dispose();
	if(status == 0){
		sel = s;
		if(s == 1){
			if(itemCheck() == true){
				var str = "#fn������� Extrabold##d�������� ������ ��� �Դϴ�.#k\r\n";
				for(var i=1;i < cm.getInventory(1).getSlotLimit(); i++){
					if(cm.getEquip(i)){
						for(var k=0;k<arr.length;k++){
							if(cm.haveItem(arr[k])){
								if(cm.getEquip(i).getItemId() == arr[k]){
									str += "#L"+i+"#";
									str += "#i"+cm.getEquip(i).getItemId()+"#";
									str += "\t#b(#z"+cm.getEquip(i).getItemId()+"#)";
									str += "\t#k��� : "+cm.getEquip(i).getOwner()+"\r\n";
									break;
								}
							}
						}
					}
				}
				cm.sendSimple(str);
			}else{
				cm.sendOk("#fn������� Extrabold##r���� ���׷��̵� ������ �������� �����ϴ�.#k");
				cm.dispose();
			}
		}else{
			item = s;
			var t="#fn������� Extrabold##fs13##d�ɷ�ġ#k �� #d(�ý���/����������/�ѵ�����/���밨�ҷ���)#k#fs11#\r\n";
			t+="#b�ϱ� ���#k  ������  (10% / 10% / 10% / -10)#k\r\n";
			t+="#b�߱� ���#k  ������  (20% / 20% / 20% / -20)#k\r\n";
			t+="#r��� ���#k  ������  (30% / 30% / 30% / -30)#k\r\n\r\n";
			t+="#fs12##d* ���Ͻô� �������� ����� ����ּ���.\r\n* ��ȯ���� M ���� 200 ���� �߰��� �Ҹ�˴ϴ�.#k\r\n"
			t+="#L1##b�ϱ�#k #d(1000 P)#k";
			t+="#L2##b�߱�#k #d(1500 P)#k";
			t+="#L3##r���#k #d(2000 P)#k\r\n";
			cm.sendSimple(t);
		}
	}else if(status == 1){
		if(sel != 1){
			s==1?name="�ϱ�":s==2?name="�߱�":s==3?name="���":name="�̻��";
			stat = s*10;
			s==1?cost = 1000:s==2?cost=1500:s==3?cost=2000:cost=0;
			cm.sendNext("#fn������� Extrabold##i"+item+"##b "+(name)+"#k #d(#z"+item+"#)#k #r- "+cost+" �ʿ� ����Ʈ#k\r\n\r\n�ش� �������� ���� �ٷ� ��ȯ �Ͻðڽ��ϱ�?\r\n��ȯ�� ���Ͻø� ������ �����ּ���.\r\n\r\n#Cgray#(��ȯ�� ��ġ �����ø� ��ȭ �׸��ϱ⸦ �����ּ���.)#k");
		}
	}else if(status == 2){
		if(slot<1000){
		if(cm.canHold(item)){
		if(cm.haveItem(4310175, 200)) {
			if(cm.getRC() >= cost){
				var Item = BOWN29.getInstance().getEquipById(item);
				Item.setDownLevel(stat);
				Item.setBossDamage(stat);
				Item.setAllStat(stat);
				Item.setTotalDamage(stat);
				Item.setOwner(name);
				MapleInventoryManipulator.addFromDrop(cm.getC(), Item, false);
				cm.gainRC(-cost);
				cm.gainItem(4310175, -200);
				cm.sendOk("#fn������� Extrabold##b���������� ��ȯ �ϼ̽��ϴ�.#k");
			}else{
				cm.sendOk("#fn������� Extrabold##r�ʿ� ����Ʈ�� �����մϴ�.#k");
			}
		}else{
			cm.sendOk("#fn������� Extrabold##r��ȯ�� ���� M ������ �����մϴ�.#k");
		}
		}else{
			cm.sendOk("#fn������� Extrabold##r�κ��丮 ��� â�� �����մϴ�.#k");
		}
		}
		cm.dispose();
	}else{
		cm.dispose();
	}
}