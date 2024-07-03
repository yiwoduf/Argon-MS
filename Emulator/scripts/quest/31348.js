/*
파란돌륜군
*/
importPackage(Packages.server.quest);

var status = -1;

function end(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        qm.dispose();
        return;
    } else {
        status++;
        if (status == 0) {
if (qm.getQuestStatus(31348) == 0) {
            qm.forceStartQuest();
} else {
            qm.forceCompleteQuest();
}
            qm.dispose();
        }
    }
}