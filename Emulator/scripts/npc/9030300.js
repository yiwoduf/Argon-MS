importPackage(Packages.server.items);
var status = 0;
var sel = -1;
var status2 = 0;

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
            cm.sendSimple("하아... 요즘 날씨가 참덥지 장사도안되고..\r\n\r\n#b#L0#경매장 이용하기#l\r\n#L1#경매장 물품, 메소 회수하기#l");
        } else if (status == 1) {
            if (selection == 1) {	
				if (cm.getPlayer().getLevel() < 120) {
					cm.sendOk("레벨 120이상의 유저만 경매장을 이용할 수 있다네.");
					cm.dispose();
					return;
				}
			cm.sendSimple("회수할 물품을 선택해주게나.\r\n\r\n#b#L0#메소 회수#l\r\n#L1#아이템 회수#l");
           } else if (selection == 0) {
				if (cm.getPlayer().getLevel() < 120) {
					cm.sendOk("레벨 120이상의 유저만 경매장을 이용할 수 있다네.");
					cm.dispose();
					return;
				}
				cm.openAuction();
           } else if (selection == 2) {
				if (cm.getPlayer().getLevel() < 251) {
					cm.sendOk("경매장에서 아이템 판매후 메소회수시에 인벤토리 에있는 메소와 합하여 풀메소(99억)이 넘어갈시 메소회수가되지않습니다. 이점 유의 하시고 사용하세요.");
					cm.dispose();
					return;
				}
				cm.openUI(0xA1);
				cm.dispose()
}
        } else if (status == 2) {
            sel = selection;
			if (sel == 0) {
				if (MapleAuction.경매장메소회수(cm.getPlayer().getName()) == 0) {
					cm.sendOk("자네는 회수할 메소가 없는거 같군.");
					cm.dispose();
				} else {
					cm.gainMeso(MapleAuction.경매장메소회수(cm.getPlayer().getName()));
					cm.sendOk(MapleAuction.경매장메소회수(cm.getPlayer().getName()) + "메소를 회수 완료 하였네.");
					MapleAuction.메소회수완료(cm.getPlayer().getName());
					cm.getPlayer().saveToDB(false, false);
					cm.dispose();
				}
			} else if (sel == 1) {
				cm.sendSimple(MapleAuction.경매장아이템회수(cm.getPlayer().getName()));
				status = 2;
			}
		} else if (status == 3) {
			MapleAuction.아이템회수(cm.getClient(),selection);
			cm.getPlayer().saveToDB(false, false);
			cm.dispose();
		}
    }
}