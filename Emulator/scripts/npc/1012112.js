importPackage(Packages.client);
importPackage(Packages.server.items);
importPackage(Packages.client.items);
importPackage(java.lang);

var itemidd = 0;
var mesorate = 7500; // 개당 메소

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
if (mode == 1) status++;
else { cm.dispose(); return; }

if (status == 0) {
           var chat = "#fn나눔고딕 Extrabold#	    ※교환하실 아이템을 선택해주세요※#fs10#\r\n";
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
		cm.sendGetNumber("#fn나눔고딕 Extrabold# 현재 적용 된 메소 배율은 #b"+mesorate+":1#k 입니다.\r\n몇개를 전환 하시겠습니까? 선택하신 아이템은\r\n#b#i"+item.getItemId()+"# #t"+item.getItemId()+"# #r"+item.getQuantity()+"개#k 입니다.",1,1,item.getQuantity());
	} else {
		cm.sendOk("개수가 1개인 아이템은 전환 할 수 없습니다.");
		cm.dispose();
	}

} else if (status == 2) {
	gmeso = selection*mesorate;
	if (cm.haveItem(itemidd,selection)) {
		cm.gainItem(itemidd,-selection);
		cm.sendOk("#b#e"+gmeso+" 메소#n#k만큼 전환 되었습니다. 즐거운 게임 되세요!");
		cm.gainMeso(gmeso);
	} else {
		cm.sendOk("확실히 입력 갯수만큼 가지고 계신게 맞나요?");
	}
	cm.dispose();
}
}