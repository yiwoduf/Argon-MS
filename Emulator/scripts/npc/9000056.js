importPackage(java.util);
importPackage(java.lang);
importPackage(java.io);
importPackage(Packages.client.items);
importPackage(Packages.server.items);
importPackage(Packages.constants);
importPackage(Packages.client);
importPackage(Packages.launch);
importPackage(Packages.packet.creators);


var 별 = "#fUI/FarmUI.img/objectStatus/star/whole#";
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
			var ask = "              #fn나눔고딕 Extrabold##fs17#"+별+" "+ServerConstants.serverName+" 아이템 선물 "+별+"\r\n#fs10##Cgray#               원하시는 아이템 선물을 위해 아이템 타입을 선택해주세요.#k\r\n\r\n#fs11#";
			ask +="#r#fs12#* 상대방의 인벤토리 여유 공간을 반드시 사전에 확인하세요.#k#fs11#\r\n";
			ask +="#r#fs12#* 고유 아이템일경우 상대방의 보유 여부를 사전에 확인하세요.#k#fs11#\r\n\r\n";
			ask +="#d▶ 선물하실 아이템 종류를 선택해주세요.#k\r\n";
			ask +="#L1##b[장비]#k아이템을 선물 하겠습니다.\r\n";
			ask +="#L2##b[소비]#k아이템을 선물 하겠습니다.\r\n";
			ask +="#L4##b[기타]#k아이템을 선물 하겠습니다.\r\n";
			ask +="#L3##b[설치]#k아이템을 선물 하겠습니다.\r\n";
			ask +="#L5##b[캐시]#k아이템을 선물 하겠습니다.\r\n";
			ask +="#L6##b→ 아이템 선물에 대한 설명을 듣고 싶습니다.#k"
			cm.sendSimple(ask);
	} else {
	cm.sendOk("#fn나눔고딕 Extrabold##r아이템 선물은 레벨 200 이상만 이용 가능합니다.");
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
				cm.sendGetText("#fn나눔고딕 Extrabold##b선물받으실 분의 닉네임을 입력해주세요.#k");
			} else if (selection == 6) {
				cm.sendOk("#fn나눔고딕 Extrabold#아이템의 #b종류#k 나 #b옵션#k 에 관계없이 누구에게나 선물이 가능하며,\r\n최대 #r1 천만 메소#k 차감 및 #d같은 채널#k 에 접속중이여야 합니다.\r\n\r\n#r(단, 선물 사용시 발생한 문제는 운영진이 책임지지 않습니다.)#k");
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
		cm.sendOk("#fn나눔고딕 Extrabold##r현재 접속중이 아니거나 채널이 다릅니다.\r\n또는 존재하지 않는 닉네임일 수도 있습니다.#k");
		cm.dispose();
		}else{
		var ok = false;
		var selStr = "#fn나눔고딕 Extrabold##d"+conn.getName()+"#k 님 에게 어떤 아이템을 선물 하시겠습니까?\r\n";
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
			cm.sendOk("#fn나눔고딕 Extrabold##r인벤토리에 아이템이 존재하지 않습니다.#k");
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
					cm.sendOk("#fn나눔고딕 Extrabold##r오류입니다. 운영자에게 보고해주세요.#k");
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
						//로미오의 편지			//줄리엣의편지			//수상한 액체			//카드키		//알카드노의 실험자료		//제미뉴스트의 실험자료			//프렌즈링			//자쿰의 돌조각			//수련의 증표			 //썸머리밋 코인			//음치				//몸치				//박치			     //설날 훈장		//크리스마스 훈장			// 홍보왕			//대통령 훈장			//동수저			//은수저			//금수저			//다이아수저
				if (cm.getPlayer().getName() != text) {
			MapleInventoryManipulator.removeFromSlot(cm.getC(), type, selection%1000, item.getQuantity(), true);
			MapleInventoryManipulator.addFromDrop(conn.getClient(), item, true);
			conn.getClient().getSession().write(CField.getGameMessage(10, "[선물] "+cm.getPlayer().getName()+" 님 에게 "+BOWN29.getInstance().getName(item.getItemId())+" 을(를) 선물받으셨습니다. 인벤토리를 확인해보세요."));
			cm.sendOk("#fn나눔고딕 Extrabold##d"+text + "#k 님 에게 #i"+item.getItemId()+"# #b(#t"+item.getItemId()+"#)#k 을(를) 보냈습니다.");
			cm.gainMeso(-5000000);
			cm.dispose();
			}else {
				cm.sendOk("#fn나눔고딕 Extrabold##r자기 자신에게는 선물할 수 없습니다.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn나눔고딕 Extrabold##r해당 아이템은 선물하실 수 없습니다.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn나눔고딕 Extrabold##r펫은 선물할 수 없습니다.#k");
				cm.dispose();
			}
			}else{
			cm.sendOk("#fn나눔고딕 Extrabold##r선물을 위한 메소가 부족합니다.#k");
			cm.dispose();
			}
			}else {
				cm.sendGetNumber("#fn나눔고딕 Extrabold#총 몇 개를 선물 하시겠습니까?\r\n현재 소지중인 #i"+item.getItemId()+"# #b(#t"+item.getItemId()+"#)#k 갯수 : #r"+item.getQuantity()+"#k",1,1,item.getQuantity());
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
					cm.sendOk("#fn나눔고딕 Extrabold##r오류입니다. 운영자에게 보고해주세요.#k");
					cm.dispose();
					return;
				}

			var text = selection;
			var con = cm.getClient().getChannelServer().isMyChannelConnected(name);
			var conn = cm.getClient().getChannelServer().getPlayerStorage().getCharacterByName(name);
	if (item.getQuantity() >= text) {
		if (cm.getMeso()>=10000000){
		     if (item.getItemId() !== 4001130 && item.getItemId() !== 4001131 && item.getItemId() !== 4001132 && item.getItemId() !== 4001133 && item.getItemId() !== 4001134 && item.getItemId() !== 4001135 && item.getItemId() !== 4033302 && item.getItemId() !== 4033831 && item.getItemId() !== 4310129 && item.getItemId() !== 4001187 && item.getItemId() !== 4001188 && item.getItemId() !== 4001189) {
					//로미오의 편지			//줄리엣의편지			//수상한 액체				//카드키		//알카드노의 실험자료		//제미뉴스트의 실험자료		//자쿰의 돌조각			 //수련의 증표				//썸머리밋 코인			//음치				//몸치				//박치
			if (cm.getPlayer().getName() != name) {
			item.setQuantity(text);
			MapleInventoryManipulator.removeFromSlot(cm.getC(), type, sel%1000, item.getQuantity(), true);
			MapleInventoryManipulator.addFromDrop(conn.getClient(), item, true);
			conn.getClient().getSession().write(CField.getGameMessage(10, "[선물] "+cm.getPlayer().getName()+" 님 에게 "+BOWN29.getInstance().getName(item.getItemId())+" "+item.getQuantity()+" 개 를 선물받으셨습니다. 인벤토리를 확인해보세요."));
			cm.sendOk("#fn나눔고딕 Extrabold##d"+name + "#k 님 에게 #i"+item.getItemId()+"# #b(#t"+item.getItemId()+"#)#k #r"+item.getQuantity()+" 개#k 를 보냈습니다.");
			cm.gainMeso(-10000000)
			cm.dispose();
			}else {
				cm.sendOk("#fn나눔고딕 Extrabold##r자기 자신에게는 선물할 수 없습니다.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn나눔고딕 Extrabold##r해당 아이템은 선물하실 수 없습니다.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn나눔고딕 Extrabold##r선물을 위한 메소가 부족합니다.#k");
				cm.dispose();
			}
			}else {
				cm.sendOk("#fn나눔고딕 Extrabold##r가지고 있는 수보다 더 큰 수를 입력했습니다.#k");
				cm.dispose();
			}
		}
	}
}