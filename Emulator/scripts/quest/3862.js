/*
파란돌륜군
*/

var status = -1;


function end(mode, type, selection) {
    if (mode == -1) {
        qm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
            qm.sendNext("준비가 되었구나..");
        } else if (status == 1) {
            qm.forceCompleteQuest();
            qm.completeQuest(3864);
            qm.dispose();
        }
    }
}