importPackage(Packages.packet.creators);
importPackage(Packages.handling.world);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.launch.world);
importPackage(Packages.main.world);
importPackage(Packages.tools);
importPackage(java.lang);

�޷� = new Date();

��   = �޷�.getFullYear();
��   = �޷�.getMonth() + 1;
��   = �޷�.getDate();
�Ͽ� = �޷�.getDay();
���� = �޷�.getHours() < 12 ? "����" : "����"			
��   = �޷�.getHours() > 12 ? �޷�.getHours() - 12 : �޷�.getHours();
��   = �޷�.getMinutes();
��   = �޷�.getSeconds();
���� = �Ͽ� == 0 ? "�Ͽ���" : �Ͽ� == 1 ? "������" : �Ͽ� == 2 ? "ȭ����" : �Ͽ� == 3 ? "������" : �Ͽ� == 4 ? "�����" : �Ͽ� == 5 ? "�ݿ���" : "�����";
�ð� = ""+��+"�� "+��+"�� "+��+"�� "+����+" "+����+" "+��+"�� "+��+"�� "+��+"�� ";

�ָ�� = new Array(
new Array(4310080, 299),
new Array(4310069, 29),
new Array(4310156, 12),
new Array(4310088, 14)
)

�ִ�÷ = new Array(
new Array(1012532, ""),
new Array(1012427, "(#r�ý��� +50 / ���ݷ� +30#b)"),
new Array(1012531, ""),
new Array(1012529, ""),
new Array(1012437, ""),
new Array(1012436, ""),
new Array(1012435, ""),
new Array(1012434, ""),
new Array(1012433, ""),
new Array(1012432, ""),
new Array(1012431, ""),
new Array(1012430, ""),
new Array(1012429, ""),
new Array(1012428, ""),
new Array(1012427, ""),
new Array(3994641, ""),
new Array(3994002, ""),
new Array(3991013, ""),
new Array(3991003, "")


)

�̺�Ʈ = [
["�̺�Ʈ ���� 1", "���ʷ� ���� ���ĵ������ض�!!!"],
["�̺�Ʈ ���� 2", "������ ��� ������ ����̺�Ʈ~!"]
]

var check = 0;
var status = -1;
var sel = -1;


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
	}

	if(status == 0){
	cm.sendSimple("���� �ð� �� "+�ð�+"\r\n"
		+ "���� ���� �� ����ġ #e#r"+cm.getClient().getChannelServer().getExpRate()+"#k#n�� �� "
		+ "�޼� #e#r"+cm.getClient().getChannelServer().getDropRate()+"#k#n�� �� "
		+ "��� #e#r"+cm.getClient().getChannelServer().getMesoRate()+"#k#n��\r\n\r\n#b"
		+ "#L9##e��Ÿ�� ������ �ް�;��.#b(#r#z2433424##b)\r\n#fs12##n"
		+ "#L1##e���� �������� �̺�Ʈ�� �˰� �;��. #b(#r�� "+�̺�Ʈ.length+"��#b)\r\n\r\n#fs12##n"
		//+ "#L6##b�⼮üũ ������ �ް� �;��. (#r����ġ 2�� ����#b)#b\r\n#fs12##n"
		//+ "#L7##b����� �� ���� �������� ����� �����ϰ� �ٲ��ּ���."
		);


	}else if(status == 1){
	���� = selection;
	switch(����) {
		case 1:
		var str = "���� �������� �̺�Ʈ �Դϴ�. ���� �ڼ��� ������ ���������� Ȯ�� �� �ּ���.\r\n\r\n"
		for(var i = 0; i < �̺�Ʈ.length; i++){
			str += "��#e#r��#k#fs13# "+�̺�Ʈ[i][0]+"#fs12##n#b\r\n";
			str += "��#fn�������#"+�̺�Ʈ[i][1]+"#fn����#\r\n\r\n";

		}
		cm.sendNext(str);
		cm.dispose();
		break;

		case 6:
			if(cm.getParty() != null) {
				if(cm.BossCheck("�⼮üũ", 3)) {
				cm.BossAdd("�⼮üũ");
				cm.gainItem(2450042, 1);
				cm.sendOk("���õ� ��ſ� �Ϸ� ��������~. �̰� ��ڴ��� �帮�� ���� �����Դϴ�.");
				WorldBroadcasting.broadcast(MainPacketCreator.getGMText(20, ""+cm.getPlayer().getName()+" ���� �⼮üũ�� �ϼ̽��ϴ�. ("+�ð�+")"));	
				} else {
				cm.sendOk("�̹� ������ �⼮üũ�� �Ͽ����ϴ�. ���� �� �̿����ּ���~!");
				}
			} else {
			cm.sendOk("�⼮üũ�� ��Ƽ�� ����� �Ŀ� �����մϴ�. #b/��Ƽ�����#k�� ä��â�� ġ�ų� #b����Ű P#k�� ������ ��Ƽ�� ����� �� �ֽ��ϴ�.");

			}
		cm.dispose();			
		break;

		case 7:
		��� = [2640000, 2640004, 2640001, 2640005, 2028208]
		���� = [200,     200,     200,     200,     100]

		��ȯ = "#fs11##Cgray#��û��#k#fs12# �������� �Ǽ��� ����� �Ұ����� �������� ���޵Ǽ̳���? ����� ������ ���������� ��ȯ�ص帮���� �ϰڽ��ϴ�.\r\n#b"
		for (var i = 0; i < ���.length; i++) {
		��ȯ += "#L"+i+"# #i"+���[i]+"# #z"+���[i]+"# #r(���� : "+cm.itemQuantity(���[i])+")#b\r\n";
		}
		cm.sendSimple(��ȯ);
		break;


		case 9:
			if(cm.haveItem(2433424)) {
			hT  = "��Ÿ������ ���� #r#i2433424# #z2433424##k �������� ��ȯ�Ͻðھ��?\r\n\r\n#r";
			hT += "�κ��丮�� �� ĭ�� ���������� 4ĭ �̻��� �־�� ���������� ������ �����մϴ�. ";
			hT += "#e�κ��丮 �������� ���� ���� ���� �������� ������� �Ұ����մϴ�.#k#n\r\n\r\n\r\n";
	
			hT += "#fs20##fna������M#��������100% ���� ������#fs12##fn����#\r\n";
			hT += "������������������������������������������������������\r\n";
				for(i = 0; i < �ָ��.length; i++) {
				hT += "��#b#i"+�ָ��[i][0]+"# #z"+�ָ��[i][0]+"# (#r"+Integer(�ָ��[i][1]+1)+"��#b)\r\n"
				}
			hT += "\r\n\r\n#fs20##fna������M#���� #r��÷ ���� ������Ȯ��50%#fs12##fn����#\r\n";
			hT += "������������������������������������������������������\r\n";
				for(i = 0; i < �ִ�÷.length; i++) {
				hT += "��#b#i"+�ִ�÷[i][0]+"# #z"+�ִ�÷[i][0]+"# "+�ִ�÷[i][1]+"\r\n"
				}
			
			cm.sendYesNo(hT);
			} else {
			cm.sendOk("��Ÿ�� ���� ���� �Ⱓ�� �ƴϰų� �̹� �����ϼ̽��ϴ�. ������ �ٽ� �õ����ּ���.")
			cm.dispose();
			}
		break;
		
	}

	}else if(status == 2){
	switch(����) {

		case 7:
		if(cm.haveItem(���[selection])) {
			if(cm.canHold(4310119)) {
				cm.gainItem(���[selection], -1);
				cm.gainItem(4310119, ����[selection]);
				cm.sendOk("���� �̿뿡 ������ ��� �˼��մϴ�. ���������� ��ȯ�� �Ϸ�Ǿ����ϴ�.");
			} else {
			cm.sendOk("�κ��丮�� ���� ������ ���ų� ���޹������� �������� ���� �������� �� �ֽ��ϴ�. �κ��丮�� Ȯ���غ��ð�, �ٽ� �õ����ּ���.");
			}
		} else {
		cm.sendOk("������ #i"+���[selection]+"# #b#z"+���[selection]+"##k �������� �����ϽŰ� �³���? #h #���� �κ��丮�� �ƹ��� ã�ƺ��� �������� �ʳ׿䡦 ");
		}
		cm.dispose();
		break;


		case 9:
		cm.gainItem(2433424, -1);
		isLucky  = Math.floor(Math.random() * 60);
		getRate0 = Math.floor(Math.random() * �ָ��[0][1]+1);
		getRate1 = Math.floor(Math.random() * �ָ��[1][1]+1);
		getRate2 = Math.floor(Math.random() * �ָ��[2][1]+1);
		getRate3 = Math.floor(Math.random() * �ָ��[3][1]+1);
		//getRate4 = Math.floor(Math.random() * �ָ��[4][1]+1);
		//getRate5 = Math.floor(Math.random() * �ָ��[5][1]+1);
		//getRate6 = Math.floor(Math.random() * �ָ��[6][1]+1);

		gV = "#i2433424# #r#z2433424##k�� �� ���� �������� �Ʒ��� �������� ���Խ��ϴ�.\r\n\r\n#fUI/UIWindow.img/QuestIcon/4/0#\r\n"
		gV += "#i"+�ָ��[0][0]+"# #z"+�ָ��[0][0]+"# "+getRate0+"��\r\n"
		gV += "#i"+�ָ��[1][0]+"# #z"+�ָ��[1][0]+"# "+getRate1+"��\r\n"
		gV += "#i"+�ָ��[2][0]+"# #z"+�ָ��[2][0]+"# "+getRate2+"��\r\n"
		gV += "#i"+�ָ��[3][0]+"# #z"+�ָ��[3][0]+"# "+getRate3+"��\r\n"
		//gV += "#i"+�ָ��[4][0]+"# #z"+�ָ��[4][0]+"# "+getRate4+"��\r\n"
		//gV += "#i"+�ָ��[5][0]+"# #z"+�ָ��[5][0]+"# "+getRate5+"��\r\n"
		//gV += "#i"+�ָ��[6][0]+"# #z"+�ָ��[6][0]+"# "+getRate6+"��\r\n"

		cm.sendNext(gV);

		cm.gainItem(4310080, 300);
		cm.gainItem(4310069, 30);
		cm.gainItem(4310156, 13);
		cm.gainItem(4310088, 15);
		//cm.gainItem(�ָ��[4][0], getRate4);
		//cm.gainItem(�ָ��[5][0], getRate5);
		//cm.gainItem(�ָ��[6][0], getRate6);

			switch(isLucky){
			case 1:  case 2: gainOther = �ִ�÷[0][0]; break;
			case 7:  case 8: gainOther = �ִ�÷[1][0]; break;
			case 13: case 14: gainOther = �ִ�÷[2][0]; break;
			case 15: case 16: gainOther = �ִ�÷[3][0]; break;
			case 17: case 18: gainOther = �ִ�÷[4][0]; break;
			case 19: case 20: gainOther = �ִ�÷[5][0]; break;

			case 3:   case 4:  gainOther = �ִ�÷[6][0]; break;
			case 9:  case 10:  gainOther = �ִ�÷[7][0]; break;
			case 21: case 22: gainOther = �ִ�÷[8][0]; break;
			case 23: case 24: gainOther = �ִ�÷[9][0]; break;
			case 25: case 26: gainOther = �ִ�÷[10][0]; break;
			case 27: case 28: gainOther = �ִ�÷[11][0]; break;

			case 5:   case 6:   gainOther = �ִ�÷[12][0]; break;
			case 11:   case 12:  gainOther = �ִ�÷[13][0]; break;
			case 29: case 30: gainOther = �ִ�÷[14][0]; break;
			case 31:   case 34:   gainOther = �ִ�÷[15][0]; break;
			case 32:   case 35:  gainOther = �ִ�÷[16][0]; break;
			case 33: case 36: gainOther = �ִ�÷[17][0]; break;
			default: gainOther = 0; break;
			}
		break;

	}

	} else if (status == 3) {
		switch(gainOther) {
		case 0: cm.dispose(); break;
		default:
		cm.sendNext("#e#r"+isLucky+"#k#n\r\n\r\n���? #h #���� #i2433424# #r#z2433424##k�� ���� �� �ִ� �� ��������? ��ø���!");
		}
	} else if (status == 4) {
	WorldBroadcasting.broadcast(UIPacket.detailShowInfo("[��Ÿ��] "+cm.getPlayer().getName()+" ���� ["+Packages.server.items.ItemInformation.getInstance().getName(gainOther)+"] �������� ȹ���ϼ̽��ϴ�. ��� �������ּ���~",false));
	cm.sendOk("#i2433424# #r#z2433424##k���� �Ʒ��� �������� �߰��� ���Խ��ϴ�. ���ϵ����~\r\n\r\n"
		+ "#fUI/UIWindow.img/QuestIcon/4/0#\r\n#i"+gainOther+"# #z"+gainOther+"#");
			if(gainOther != 1012427) { cm.gainItem(gainOther, 1); } else {
			var ii = Packages.server.items.ItemInformation.getInstance();
			var item = ii.getEquipById(gainOther);
			item.setStr(50);
			item.setDex(50);
			item.setInt(50);
			item.setLuk(50);
			item.setWatk(30);
			item.setMatk(30);
			item.setOwner(""+ cm.getPlayer().getName()+"");
			Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
			}
	cm.dispose(); //MainPacketCreator.getGMText
	}
}