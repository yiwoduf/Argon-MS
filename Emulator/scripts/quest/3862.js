/*
�Ķ�������
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
            qm.sendNext("�غ� �Ǿ�����..");
        } else if (status == 1) {
            qm.forceCompleteQuest();
            qm.completeQuest(3864);
            qm.dispose();
        }
    }
}