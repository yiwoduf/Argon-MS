/* ȭ��Ʈ�Ŵ����� ��ũ��Ʈ */

importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);

var items = new Array(1012478, 1022231, 1022232, 1012300, 1032136, 1032241, 1113149, 1132272, 1152170, 1182087);

var ran = Math.floor(Math.random() * 100) +1;

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
                var chat= "#fn�������##e#r���ζ�¶��� ������ű��̱��Դϴ�.\r\n#r������ű� �̱�#k������ #b�������� ����� ������ �� ���ɴϴ�. \r\n\r\n#r#e�̱� ���#n#k���δ� ���ѻ������ 30000���� �ʿ��մϴ�.\r\n";
	    chat += "#fn�������##L0##b������ű��� �̰ڽ��ϴ�.#k#n\r\n#L2##r���⿡�� ������������ ��������?";
	    cm.sendSimple(chat);
		  } else if ( selection == 2) { 
	cm.dispose();
	cm.openNpc(2000);
	} else if (selection == 0) {
	if (cm.haveItem(4310153, 30000)) {
			cm.sendOk("��ű� �̱⿡�� �Ʒ��� �������� ���Խ��ϴ�.\r\n #r���ĭ#k#l Ȯ�κ�Ź�帳�ϴ�.");
//			WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(5, cm.getPlayer().getName() + " ���� ��ű� �̱⸦ �ϼ̽��ϴ�."));
			makeSponserItem(items[Math.floor(Math.random() * items.length)], 100,50,0);
                	cm.gainItem(4310153, -30000);
                	cm.dispose();
	} else {
		cm.sendOk("���ѻ�������� �����մϴ�.");
		cm.dispose();
	}
        }
    }
}
    
        function makeSponserItem(itemid,allstat,atk) {
	var ii = Packages.server.items.ItemInformation.getInstance();
	var item = ii.getEquipById(itemid);
	item.setStr(allstat);
	item.setDex(allstat);
	item.setInt(allstat);
	item.setLuk(allstat);
	item.setWatk(atk);
	item.setMatk(atk);
	
	item.setOwner("[�̱��Ʋ]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
    

    

