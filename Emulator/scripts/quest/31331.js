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
            qm.sendNext("�̳��� �� ���δ� ���κ��� �̻��� ���� �Ͼ��� ��������. ������ �̹�ó�� �̻��� ���� ó���̾�. �Ϻ� ���� ��Ƽ� ���� �Ͼ�ٴ� ���̾� ");
        } else if (status == 1) {
            qm.sendYesNo("�ڳװ� Ȯ�� ���ټ� �ְڴ°�?"); 
        } else if (status == 2) {
            qm.forceCompleteQuest();
            qm.sendOk("����. ���޻� ��Ÿ�� ���� �Ϻ������� �ִ°����� ������");
            qm.dispose();
        } else if (status == 3) {
            qm.sendOk("������ �غ� �ʉ�°�?");
            qm.dispose();
        }
    }
}