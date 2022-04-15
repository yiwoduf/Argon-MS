/*
	본 스크립트는 선히팩의 선우 기능에 있는 엔피시입니다.
	선히팩은 KMS 기준으로 만들어졌습니다.

	네이버 : 선우(seonwoo__@naver.com)
*/

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
            var chat = "#b<보스 한꺼번에 2마리 이상 소환시 기존 몹은 제거됩니다.>#k \r\n#r<데미안 소환>#k : #i4001432# 1장#e#n";
            chat += "\r\n#r소지중인 #i4001432#갯수 :: "+ cm.itemQuantity(4001432) +"#k";
            chat += "\r\n#L0##b데미안를 소환 하고싶습니다.#k";
            chat += "\r\n#L1##b소환되어 있는 몹을 죽이고 싶습니다.(단, 아이템 드롭X)#k";
            chat += "\r\n#L2##b[AURORA STORY] 마을로 돌아가고싶습니다.#k";
            cm.sendSimple(chat);
        } else if (status == 1) {
            if (selection == 0) {
         if (cm.itemQuantity(4001432) >= 1  && cm.getMonsterCount(cm.getMapId()) == 0) {
        var chat = "보스 한꺼번에 2마리 이상 소환시 기존 몹은 제거됩니다.";
	cm.removeNpc(cm.getMapId(), 2083002);
        cm.gainItem(4001432 ,-1);
	cm.spawnMob(8880131, cm.getPlayer().getPosition().x + 300, cm.getPlayer().getPosition().y);
        cm.sendNext(chat);
	cm.dispose();
        }
     else {
        cm.sendOk("메소가 없거나 사냥터에 몹이 있습니다. ");
    	cm.killAllMob();
        cm.dispose();

		}
}

        } if (selection == 1) {
		cm.killAllMob();
		cm.dispose();

        } else if (selection == 2) {
		cm.warp(100000000);
		cm.dispose();






    }
}
}


