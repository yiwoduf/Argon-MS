/* ȭ��Ʈ�Ŵ����� ��ũ��Ʈ */

importPackage(java.lang);
importPackage(Packages.handling.world);
importPackage(Packages.packet.creators);

var items = new Array(1142268, 1142499, 1402214 , 1452220, 1462208, 1492194, 1432182, 1482183, 1382226, 1472230, 1332242, 1342087, 1422156, 1122012, 1402180 );

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
                var chat= "#e#r���� �̱Ⱑ ���� ���ϴ� ��찡 �ֽ��ϴ�.\r\n���� 2000 ���� 500#n#k\r\n#r�Ŀ������� �̱�#k������ #b�������� �Ŀ��ý��ۿ� ��밡���� �����۵��� ���ɴϴ�.\r\n\r\n������ ����Ʈ : #v1142268# #v1142499# #v1402214# #v1452220# #v1462208# #v1492194# #v1432182# #v1482183# #v1382226# #v1472230# #v1332242# #v1342087# #v1422156# #v1122012# #v1402180# \r\n\r\n#r#e�̱� ���#n#k���δ� 5�� ����Ʈ�� �ʿ��մϴ�.\r\n";
	    chat += "#L0##b�Ŀ��������� �̰ڽ��ϴ�.#k#n\r\n#l";
	    cm.sendSimple(chat);
	} else if (selection == 0) {
	if (cm.getPlayer().getRC() >= 50000) {
			cm.sendOk("�Ŀ������� �̱⿡�� �Ʒ��� �������� ���Խ��ϴ�.");
			//WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(5, cm.getPlayer().getName() + " ���� �Ŀ������� �̱⸦ �ϼ̽��ϴ�."));
			makeSponserItem(items[Math.floor(Math.random() * items.length)], 2000,500,0);
                	cm.getPlayer().loseRC(50000);
                	cm.dispose();
	} else {
		cm.sendOk("�Ŀ�����Ʈ�� �����մϴ�.");
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
	
	item.setOwner("[�絹��]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
    

