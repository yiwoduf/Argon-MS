/*
�Ķ�������
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
           qm.sendYesNo("��, ���� �Ǿ����� ����� �����. �غ� �Ǿ����� ����ұ�?"); 
        } else if (status == 1) {
            qm.sendOk("������ ���, ģ��! �׷� �޷����ڰ�! ���� �ִ� ��Ż�� �̿�����!");
            qm.forceStartQuest();
            qm.dispose();
        } else if (status == 2) {
            qm.sendOk("����? ���� �غ�ʉ��?");
            qm.dispose();
        }
    }
}