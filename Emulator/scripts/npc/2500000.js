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
            cm.sendYesNo("#fn나눔고딕 Extrabold#그만 두고 #b퀘스트의 전당#k 으로 돌아가시겠어요..?")
    } else if (status == 1) {
	cm.warp (100030301,0);
        cm.dispose();
    }
}


