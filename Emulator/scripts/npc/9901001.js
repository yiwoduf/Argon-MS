importPackage(Packages.server.items);
var status = 0;
var sel = -1;
var itemList = Array (5030000, 5030002, 5030004, 5030008); // 아이템 목록 
var day = Array (7,1,7,1,7,1,7,1);
var pch = Array (7900,7900,7900,7900,7900,7900,7900,1200);
var status2 = 0;
var sel2 = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    } else {
        if (status <= 2 && mode == 0) {
            cm.dispose();
            return;
        }  
        if (mode == 0) {
            cm.dispose();
        }
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendSimple("하아.. 날씨는 덥지.. 장사도안되고..\r\n#b#L1#경매장 이용하기#l\r\n#L3#경매장 아이템 낙찰하기#l\r\n#L0#경매장 물품,메소 회수하기#l\r\n");
        } else if (status == 1) {
	    sel2 = selection;
            if (selection == 0) {	
		cm.sendSimple("어떤걸 이용 하겠나\r\n\r\n#b#L0#메소 회수#l\r\n#L1#아이템 회수#l");	
           } else if (selection == 1) {
		if (cm.getPlayer().isDumeGM()) {
			cm.sendOk("이 캐릭터로는 경매장을 이용 할 수 없습니다.");
			cm.dispose();
			return;
		}
		cm.openUI(161);
		MapleAuction.경매장오픈(cm.getClient());
		cm.dispose();
            } else if (selection == 3) {
		var text = MapleAuction.경매장낙찰리스트(cm.getPlayer().getName());
		cm.sendSimple(text);
		if (text == "자네는 경매중인 아이템이 없는것 같군...\r\n\r\n#r흥정중인 아이템은 낙찰 리스트에는 출력되지 않으므로\r\n흥정 신청이오면 회수하여 직접 만나 거래하세요.") cm.dispose();
	    }
        } else if (status == 2) {
		if (sel2 == 3) {
			cm.sendOk(MapleAuction.경매장아이템낙찰(cm.getPlayer(),selection));
			cm.dispose();
		} else {
            	sel = selection;
		if (sel == 0) {
			if (MapleAuction.경매장메소회수(cm.getPlayer().getName()) == 0) {
				cm.sendOk("자네는 회수할 메소가 없는거 같군");
				cm.dispose();
			} else {
				cm.gainMeso(MapleAuction.경매장메소회수(cm.getPlayer().getName()));
				cm.sendOk(MapleAuction.경매장메소회수(cm.getPlayer().getName()) + "메소를 회수 완료 하였네");
				MapleAuction.메소회수완료(cm.getPlayer().getName());
				cm.getPlayer().saveToDB(false,false);
				cm.dispose();
			}
		} else if (sel == 1) {
			cm.sendSimple(MapleAuction.경매장아이템회수(cm.getPlayer().getName()));
		}
		}
	} else if (status == 3) {
			MapleAuction.아이템회수(cm.getClient(),selection);
			cm.getPlayer().saveToDB(false,false);
			cm.dispose();
	}
    }
}