/* ȭ��Ʈ�Ŵ����� ��ũ��Ʈ */

importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);

var items = new Array(1122156, 1122017, 1122150, 1123012, 1123005, 1122254);

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
                var chat= "#e#rAURORA ONLINE ���Ʈ�̱��Դϴ�.\r\n#r���� �̱�#k������ #b�������� ���Ʈ ������ �� ���ɴϴ�. \r\n\r\n#r#e�̱� ���#n#k���δ� ���ѻ������ 30000���� �ʿ��մϴ�.\r\n";
	    chat += "#L0##b���Ʈ�� �̰ڽ��ϴ�.#k#n\r\n#l";
	    cm.sendSimple(chat);
	} else if (selection == 0) {
	if (cm.haveItem(4310153, 30000)) {
			cm.sendOk("���Ʈ �̱⿡�� �Ʒ��� �������� ���Խ��ϴ�.\r\n #r���ĭ#k#l Ȯ�κ�Ź�帳�ϴ�.");
//			WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(5, cm.getPlayer().getName() + " ���� ���Ʈ �̱⸦ �ϼ̽��ϴ�."));
			makeSponserItem(items[Math.floor(Math.random() * items.length)]);
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

	item.setOwner("[���Ʈ�̱�]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
    

    

