var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
	if (cm.getPlayer().getLevel() >= 180 && cm.getPlayer().getMapId() == 100030301) {
        cm.sendNext("#fn나눔고딕 Extrabold#\r\n안녕하세용~.. 혹시 시간 좀 있으세용~..?\r\n제 친구 #r따보#k 가.. 지금.. 도움이 필요해용~...");
        } else {
	cm.sendOk("#fn나눔고딕 Extrabold##r* 플레이 조건#k\r\n\r\n#d- 레벨 180 이상 의 캐릭터\r\n- 퀘스트의 전당 에서 플레이 가능#k",9062004);
	cm.dispose();
        }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn나눔고딕 Extrabold#\r\n그래요..용..? 아니..아니.. 뭐라고..?",2);
    } else if (status == 2) {
        cm.sendYesNo("#fn나눔고딕 Extrabold#자세한 설명은 생략할게용~!..\r\n\r\n#d(수락하면 바로 퀘스트를 진행하러 이동합니다.)#k");
    } else if (status == 3) {
	if (cm.getPlayerCount(914050000) > 0) {
	cm.sendOk("#fn나눔고딕 Extrabold##r이미 누군가가 항해중이에용~... 잠시 기다려보세용~!#k");
	cm.dispose();
	} else {
        cm.removeAll(4032335);
        cm.removeAll(4033012);
	cm.warp(914050000,0);
	cm.dispose();
	}  
    }
}