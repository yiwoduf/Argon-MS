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
            qm.sendNext("\r\n��ٸ��� �־����ϴ�. �׷���, ��¼��? ���� ���̷ε���� �������Դϴ�. ������ ���� ����������. ");
        } else if (status == 1) {
            qm.sendYesNo("��? ���� �̺�Ʈ ������ Big3 �̿� Ȯ�� ������ �ʿ��Ͻôٱ���? ��, �׷� �� ��Ź �ϳ��� ����ֽðھ��? �׷� Ȯ�� ������ ���帮�ڽ��ϴ�."); 
        } else if (status == 2) {
            qm.forceStartQuest();
            qm.sendOk("�ϴ� ������ ���� ���� ���� ����� �ҷ����ϴϴٸ�...������ ������ �������� ���� �˰� �ͱ���. ���̷ε�� ������ �ö� �� ������ּ���. �̻��� ���� ������ Ȯ�� �غ��ø� �˴ϴ�.");
            qm.dispose();
        } else if (status == 3) {
            qm.sendOk("\r\n���̷ε���� Ÿ���� ���ϼ̴µ�, ���� Ȯ�� ������ �׳� ���帱 ���� ������? �� ���� ��¥�� ���� ��������.");
            qm.dispose();
        }
    }
}