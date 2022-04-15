importPackage(Packages.client.items);
var status = -1;
var sel = 0;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
	var list = cm.getCashEquipList();
	if (list == "") {
		cm.sendOk("장착중인 캐시 장비가 없습니다.");
		cm.dispose();
		return;
	}
	var chat = "잠재능력을 설정,재설정할 캐시 장비를 선택해 주세요\r\n#b";
	chat += list;
	cm.sendSimple(chat);
    } else if (status == 1) {
	sel = selection;
	cm.sendYesNo("정말로 선택하신 아이템 #b#t" + cm.getPlayer().getInventory(MapleInventoryType.EQUIPPED).getItem(sel).getItemId() + "##k에 잠재능력을 설정,재설정 하시겠습니까?");
    } else if (status == 2) {
	cm.renewCashPotential(sel);
	cm.gainItem(2431578,-1);
	cm.sendOk("잠재능력 설정,재설정을 완료 하였습니다. 아이템을 확인해 주세요");
	cm.dispose();
    }
}
