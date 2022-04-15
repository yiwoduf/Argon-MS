/* 화이트매니저의 스크립트 */

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
                var chat= "#e#r오로라온라인 의자뽑기입니다.\r\n#r의자 뽑기#k에서는 #b여러가지 의자아이템이나옵니다. \r\n\r\n#r#e뽑기 비용#n#k으로는 흔한사냥코인 30000개가 필요합니다.\r\n";
	    chat += "#L0##b의자를 뽑겠습니다.#k#n\r\n#l";
	    cm.sendSimple(chat);
	} else if (selection == 0) {
	if (cm.haveItem(4310153, 30000)) {
			cm.sendOk("의자 뽑기에서 아래의 아이템이 나왔습니다.\r\n #r설치칸#k#l 확인부탁드립니다.");
//			WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(5, cm.getPlayer().getName() + " 님이 의자 뽑기를 하셨습니다."));
			makeSponserItem(items[Math.floor(Math.random() * items.length)], 0000,000,0);
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
	item.setStr(allstat);
	item.setDex(allstat);
	item.setInt(allstat);
	item.setLuk(allstat);
	item.setWatk(atk);
	item.setMatk(atk);
	
	item.setOwner("[의자뽑기셔틀]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
    

    

