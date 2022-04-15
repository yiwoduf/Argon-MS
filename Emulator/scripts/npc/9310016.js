var status = -1;
var itemid = 0;
var material = 4251202;
var quan = 3;
var chats = "";
var blocked = new Array (1102271,1142705,1082501,1702471,1152136,1102466,1132182,1012331,1182061,1142349,1142593,1142249,1142603,1662006,1003142,1042003,1062007,1022102,1022079,1102450,1102451,1102452,1102546,1102547,1102548,1102550,1102551,1102644,1102700,1702375,1702211,1702348,1702334,1702336,1702453,1702503,1702501,1702523,1702512,1000050,1001076,1002447,1050227,1051278,1072646,1032034,1082250,1012104,1092056,1112925,1081013,1051391,1071077,1702504,1102669,1662041,1662039,1004194,1004212,1004197,1004180,1042319,1062207,1004177,1702488,1050312,1051384,1000070,1001093,1102624,1112145,1112257,1082580,1702521,1004167,1004167,1004036,1102648,1082571,1052692,1072890,1012047,1102624,1102643,1102688);

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
    if (status == 0) {
	var chat = cm.getPlayer().getName() + "님도 저와 같은 궁극의 패션을 가지고 싶으신가요? #b후원크리스탈#k만 있으면 당신도 가능합니다.";
	chat += "\r\n\r\n#fUI/UIWindow.img/UtilDlgEx/list1#\r\n";
	chat += "#L0##b최신 캐시아이템 구매#l";
	cm.sendSimple(chat);
    } else if (status == 1) {
	cm.sendGetText("구매를 원하는 아이템의 이름을 검색해주세요. 아이템의 정확한 명칭을 모를 경우 #b일부분만 입력해도 검색이 가능합니다.#k\r\n\r\n#e#r예) 카오스 자쿰의 투구 > 자쿰으로 검색이 가능합니다.");
    } else if (status == 2) {
	if (cm.getText() == "" || cm.getText() == " ") {
		cm.sendOk("검색된 결과가 없습니다.");
		cm.dispose();
		return;
	}
	chats = cm.getCashItemList(cm.getText());
	cm.sendSimple(chats);
	if (chats == "검색된 결과가 없습니다.") cm.dispose();
    } else if (status == 3) {
	itemid = selection;
	cm.sendYesNo("#i" + itemid + "##b#z" + itemid + "##k(을)를 정말로 구매 하시겠습니까?");
    } else if (status == 4) {
	if (!cm.haveItem(material,quan)) {
		cm.sendOk("아이템을 구매하기 위해선 후원크리스탈이 필요합니다.");
		cm.dispose();
		return;
	}
	if (!cm.canHold(itemid)) {
		cm.sendOk("인벤토리에 빈 공간을 확보 한 후 다시 시도해 주십시오.");
		cm.dispose();
		return;
	}
	  for (var i = 0; i < blocked.length; i++) {
      if (itemid == blocked[i]) {
	cm.sendOk("후원템이거나 구매 금지된 아이템입니다.");
	return;
}
                        }
	//cm.checkitems(itemid);
	cm.gainItem(material,-quan);
	faker(itemid);
	cm.getPlayer().modifyCSPoints(1,-20000,false);
	cm.sendOk("다음에도 또 이용해 주시면 감사하겠습니다.");
	cm.dispose();
    }
}
function faker(itemid) {

	var ii = Packages.server.items.ItemInformation.getInstance();
	var item = ii.getEquipById(itemid);
	item.setStr(0);
	item.setDex(0);
	item.setInt(0);
	item.setLuk(0);
	item.setWatk(0);
	item.setMatk(0);
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}