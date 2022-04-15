var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
            cm.sendYesNo("#fn나눔고딕 Extrabold#지금 바로 #b에레브#k로 출발할까요..?")
    } else if (status == 1) {
	if (cm.getPlayerCount(200090030) > 0) {
	cm.sendOk("#fn나눔고딕 Extrabold##r누가.. 지금 에레브로 향하고 있어요.. 기다려주세요..#k");
	cm.dispose();
	} else {
	cm.TimeMoveMap(200090030, 304070000, 15);
        cm.dispose();
        }
    }
}


