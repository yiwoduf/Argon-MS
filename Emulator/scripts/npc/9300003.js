/* ȭ��Ʈ�Ŵ����� ��ũ��Ʈ */

importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);

var items = new Array(3015473, 3015429, 3015517, 3015438, 3015404, 3015309, 3015448, 3015310, 3015311, 3015247, 3015247, 3015433, 3015236 ,3015431, 3015327, 3015447, 3015434);

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
                var chat= "#e#r���ζ�¶��� ���ڻ̱��Դϴ�.\r\n#r���� �̱�#k������ #b�������� ���ھ������̳��ɴϴ�. \r\n\r\n#r#e�̱� ���#n#k���δ� ���ѻ������ 30000���� �ʿ��մϴ�.\r\n";
	    chat += "#L0##b���ڸ� �̰ڽ��ϴ�.#k#n\r\n#l";
	    cm.sendSimple(chat);
	} else if (selection == 0) {
	if (cm.haveItem(4310153, 30000)) {
			cm.sendOk("���� �̱⿡�� �Ʒ��� �������� ���Խ��ϴ�.\r\n #r��ġĭ#k#l Ȯ�κ�Ź�帳�ϴ�.");
//			WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(5, cm.getPlayer().getName() + " ���� ���� �̱⸦ �ϼ̽��ϴ�."));
			makeSponserItem(items[Math.floor(Math.random() * items.length)], 0000,000,0);
                	cm.gainItem(4310153, -30000);
                	cm.dispose();
	} else {
		cm.sendOk("���ѻ�� ������ �����մϴ�.");
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
	
	item.setOwner("[���ڻ̱��Ʋ]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
    

    

