/* 화이트매니저의 스크립트 */

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
                var chat= "#e#rAURORA ONLINE 펜던트뽑기입니다.\r\n#r의자 뽑기#k에서는 #b여러가지 펜던트 아이템 이 나옵니다. \r\n\r\n#r#e뽑기 비용#n#k으로는 흔한사냥코인 30000개가 필요합니다.\r\n";
	    chat += "#L0##b펜던트를 뽑겠습니다.#k#n\r\n#l";
	    cm.sendSimple(chat);
	} else if (selection == 0) {
	if (cm.haveItem(4310153, 30000)) {
			cm.sendOk("펜던트 뽑기에서 아래의 아이템이 나왔습니다.\r\n #r장비칸#k#l 확인부탁드립니다.");
//			WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(5, cm.getPlayer().getName() + " 님이 펜던트 뽑기를 하셨습니다."));
			makeSponserItem(items[Math.floor(Math.random() * items.length)]);
                	cm.gainItem(4310153, -30000);
                	cm.dispose();
	} else {
		cm.sendOk("흔한사냥 코인이 부족합니다.");
		cm.dispose();
	}
        }
    }
}
    
        function makeSponserItem(itemid,allstat,atk) {
	var ii = Packages.server.items.ItemInformation.getInstance();
	var item = ii.getEquipById(itemid);

	item.setOwner("[펜던트뽑기]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
    

    

