/*
파란돌륜군
*/
importPackage(Packages.server.quest);

var status = -1;

function start(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        qm.dispose();
        return;
    } else {
        status++;
        if (status == 0) {
            qm.sendNext("미나르 숲 남부는 예로부터 이상한 일이 일어나기로 유명했지. 하지만 이번처럼 이상한 일은 처음이야. 암벽 산이 살아서 벌떡 일어나다니 말이야 ");
        } else if (status == 1) {
            qm.sendYesNo("자네가 확인 해줄수 있겠는가?"); 
        } else if (status == 2) {
            qm.forceCompleteQuest();
            qm.sendOk("좋아. 종달새 리타를 통해 암벽거인이 있는곳으로 가보게");
            qm.dispose();
        } else if (status == 3) {
            qm.sendOk("아직은 준비가 않됬는가?");
            qm.dispose();
        }
    }
}