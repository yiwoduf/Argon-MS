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
            qm.sendNextS("차후에 조사할 방법이 생기면 다시 조사하는게 좋을것같다.", 2);
        } else if (status == 1) {
            qm.sendNextS("\r\n\r\n#b(마스테리아를 구할자 칭호를 회득하였다.)", 2);
            qm.forceCompleteQuest();
            qm.dispose();
        }
    }
}

