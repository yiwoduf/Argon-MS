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
            qm.sendNext("�׷���, �ʴ� ��ü ��� �°���? �ñ׳ʽ��� ���� ���� �ٸ��������� ������ ���׾�.");
        } else if (status == 1) {
            qm.sendNextPrevS("(���ſ��� �Դٴ� �� ������ �ȵǴµ�...)�� �װ� ���� ������ �Ҿ����� �� ���̾���. ���� ��� ���� �ְ� �� ���� ����� �ȳ�. ���� ��Ȳ�� ��� ���� �� ���ٷ�?",2); 
        } else if (status == 2) {
            qm.sendNextPrev("������ ��� ������ ������ ��� ����� �Ȱǰ�...�ñ׳ʽ��� ���� �������� ������ �ɷ� Ÿ���ع��Ⱦ�. ���� ��ü�� �츮�� ���� �Ǿ���. �׵��� �츮�� �����߰�, ���ٽ��� �츮������... �� �������� �ƹ����� ���ư��ð� �Ǿ���...���� ����̴� �� �̻� ������. �ڼ��� ���� �ﷹ���Բ� �����.");
        } else if (status == 3) {
            qm.sendNextPrevS("��, �׷� �˾Ҿ�.", 2);
            qm.forceStartQuest();
            qm.dispose();
        }
    }
}