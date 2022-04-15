var status;
function start() {
    status = -1;
	action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0)
        cm.dispose();
    else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            cm.sendYesNo("#e<시그너스 여제를 처치해주세요!>\r\n#n\r\n\r\n#e#d #fUI/UIWindow2.img/MobGage/Mob/8850011# 시그너스 여제#n#k#n#k   획득아이템 #i4310058# (80~100개)\r\n\r\n#e#r이동하시겠습니까?\r\n[파티를구성하지 않으면 입장이 불가능합니다.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(271040100) > 0 || cm.getPlayerCount(350060180) > 1 || cm.getPlayerCount(350060200) > 2) {
                    cm.sendOk("지금 시그너스 여제에 도전 중인 플레이어가 있습니다.");
                    cm.dispose();
                } else {
		    cm.resetMap(271040100);
                    cm.warpParty(271040100);
                    cm.spawnMob(8850011, cm.getPlayer().getPosition().x + 300, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("파티를 만들어 주시길 바랍니다.");
		cm.dispose();
	    }
        }
    }
}