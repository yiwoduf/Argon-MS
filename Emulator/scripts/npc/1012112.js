importPackage(Packages.client);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(java.lang);

var itemidd = 0;
var mesorate = 7500; // ���� �޼�

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
if (mode == 1) status++;
else { cm.dispose(); return; }

if (status == 0) {
           var chat = "#fn������� Extrabold#	    �ر�ȯ�Ͻ� �������� �������ּ����#fs10#\r\n";
	var inven = cm.getInventory(4);
	var inventory = cm.getInventory(4).getSlotLimit();
	for (var limit = 0; limit < inventory; limit++) {
	if (inven.getItem(limit) == null) { continue; }
		var itemid = inven.getItem(limit).getItemId();
		chat += "#L"+(type * 1000 + limit)+"##i"+itemid+"##l";
	}
	cm.sendSimple(chat);

} else if (status == 1) {
	s = selection;
	item = cm.getInventory(4).getItem(s % 9000).copy();
	if (item.getQuantity() != 1){
		itemidd = item.getItemId();
		cm.sendGetNumber("#fn������� Extrabold# ���� ���� �� �޼� ������ #b"+mesorate+":1#k �Դϴ�.\r\n��� ��ȯ �Ͻðڽ��ϱ�? �����Ͻ� ��������\r\n#b#i"+item.getItemId()+"# #t"+item.getItemId()+"# #r"+item.getQuantity()+"��#k �Դϴ�.",1,1,item.getQuantity());
	} else {
		cm.sendOk("������ 1���� �������� ��ȯ �� �� �����ϴ�.");
		cm.dispose();
	}

} else if (status == 2) {
	gmeso = selection*mesorate;
	if (cm.haveItem(itemidd,selection)) {
		cm.gainItem(itemidd,-selection);
		cm.sendOk("#b#e"+gmeso+" �޼�#n#k��ŭ ��ȯ �Ǿ����ϴ�. ��ſ� ���� �Ǽ���!");
		cm.gainMeso(gmeso);
	} else {
		cm.sendOk("Ȯ���� �Է� ������ŭ ������ ��Ű� �³���?");
	}
	cm.dispose();
}
}