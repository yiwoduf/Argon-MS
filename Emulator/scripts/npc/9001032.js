/* 화이트매니저의 스크립트 */

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
                var chat= "#e#r가끔 뽑기가 무시 당하는 경우가 있습니다.\r\n올텟 2000 공마 500#n#k\r\n#r후원아이템 뽑기#k에서는 #b여러가지 후원시스템에 사용가능한 아이템들이 나옵니다.\r\n\r\n아이템 리스트 : #v1142268# #v1142499# #v1402214# #v1452220# #v1462208# #v1492194# #v1432182# #v1482183# #v1382226# #v1472230# #v1332242# #v1342087# #v1422156# #v1122012# #v1402180# \r\n\r\n#r#e뽑기 비용#n#k으로는 5만 포인트가 필요합니다.\r\n";
	    chat += "#L0##b후원아이템을 뽑겠습니다.#k#n\r\n#l";
	    cm.sendSimple(chat);
	} else if (selection == 0) {
	if (cm.getPlayer().getRC() >= 50000) {
			cm.sendOk("후원아이템 뽑기에서 아래의 아이템이 나왔습니다.");
			//WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(5, cm.getPlayer().getName() + " 님이 후원아이템 뽑기를 하셨습니다."));
			makeSponserItem(items[Math.floor(Math.random() * items.length)], 2000,500,0);
                	cm.getPlayer().loseRC(50000);
                	cm.dispose();
	} else {
		cm.sendOk("후원포인트가 부족합니다.");
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
	
	item.setOwner("[루돌이]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
    

