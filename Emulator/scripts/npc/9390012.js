importPackage(Packages.tools.RandomStream);
var status = -1;

function start() {
    action (1, 0, 0);
}

function action(mode, type, selection) {

    hpoint = 5000; //�ʿ��� �Ŀ�����Ʈ
    gpoint1 = 1000; //�����ּ�
    gpoint2 = 10000; //�����ִ�

    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
           status++;
    }
    if (status == 0) {
        �� = "�Ŀ�����Ʈ�� �ɰ�, ���� ���� �� �� �ϴ°� �?\r\n"
        ��+= "#b"+hpoint+"����Ʈ#k�� �ڱ׸�ġ #��"+gpoint2+"#k����Ʈ ���� �� �� �ִٰ�!\r\n";
        ��+= "����... ���� ���� �� �� ������ ���̾�!\r\n\r\n"
        ��+= "#L0# #d�Ŀ�����Ʈ�� ������ �� ����!"
        cm.sendSimple(��);
    } else if (status == 1) {
        if (hpoint > 0) {
            g1 = Math.floor(Math.random() * 100)
            if (g1>20) {
                g2 = Randomizer.rand(gpoint1,hpoint)
            } else {
                g2 = Randomizer.rand(gpoint1,gpoint2);
            }
            �� = "��.. "+hpoint+"����Ʈ�� ������ ����� ���Ծ�!\r\n"
            ��+= ""+g2+"����Ʈ�� ȹ���߱���!\r\n"
            ��+= "������ ����� �����̰�, �������� ���ص� �Ǹ�������!";
            cm.sendOk(��);
            cm.gainRC(-hpoint);
            cm.gainRC(g2);
            cm.dispose()l
         } else {
            cm.sendOk("��... ���� ��Ȳ�� �߸��� �� ������?\r\n����� ���Ǹ� �� �� �ְڴ�?");
            cm.dispose();
         }
    }
}