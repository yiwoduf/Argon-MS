/* 화이트매니저의 스크립트 */

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
                var chat= "#fn맑은고딕##e#r오로라온라인 보스장신구뽑기입니다.\r\n#r보스장신구 뽑기#k에서는 #b여러가지 얼굴장식 아이템 이 나옵니다. \r\n\r\n#r#e뽑기 비용#n#k으로는 흔한사냥코인 30000개가 필요합니다.\r\n";
	    chat += "#fn맑은고딕##L0##b보스장신구를 뽑겠습니다.#k#n\r\n#L2##r여기에는 무슨아이템이 나오나요?";
	    cm.sendSimple(chat);
		  } else if ( selection == 2) { 
	cm.dispose();
	cm.openNpc(2000);
	} else if (selection == 0) {
	if (cm.haveItem(4310153, 30000)) {
			cm.sendOk("장신구 뽑기에서 아래의 아이템이 나왔습니다.\r\n #r장비칸#k#l 확인부탁드립니다.");
//			WorldBroadcasting.broadcast(MainPacketCreator.serverNotice(5, cm.getPlayer().getName() + " 님이 장신구 뽑기를 하셨습니다."));
			makeSponserItem(items[Math.floor(Math.random() * items.length)], 100,50,0);
                	cm.gainItem(4310153, -30000);
                	cm.dispose();
	} else {
		cm.sendOk("흔한사냥코인이 부족합니다.");
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
	
	item.setOwner("[뽑기셔틀]");
	Packages.server.items.InventoryManipulator.addFromDrop(cm.getC(),item,false);
}
    

    

