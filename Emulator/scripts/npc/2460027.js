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
            cm.sendYesNo("#e<혼란에 빠진 미스틱 필드를 구원해주세요!>#n\r\n\r\n#e#rNo.F#n#k #fUI/UIWindow2.img/MobGage/Mob/9300600# #e#r미스틱 힐라#n#k  획득아이템 #i4033304# (1~2개)\r\n\r\n#e#d이동하시겠습니까?\r\n[파티를구성하지 않으면 입장이 불가능합니다.]\r\n#e#b#n#k#n#k\r\n");
	} else if (status == 1) {
            if (cm.getPlayer().getParty() != null) {
                if (cm.getPlayerCount(931050820) > 0) {
                    cm.sendOk("지금 미스틱 레이드에 도전 중인 플레이어가 있습니다.");
                    cm.dispose();
                } else {
		    cm.resetMap(931050820);
                    cm.warpParty(931050820);
                    cm.spawnMob(9300600, cm.getPlayer().getPosition().x + 800, cm.getPlayer().getPosition().y);
                    cm.dispose();
                }
            } else {
		cm.sendOk("파티를 만들어 주시길 바랍니다.");
		cm.dispose();
	    }
        }
    }
}