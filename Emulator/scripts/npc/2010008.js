var status = 0;
var sel;

function start() {
    cm.sendSimple("������ ��带 ����� ���ðھ��?\r\n#b#L0#��带 ����� �;��.#l\r\n#L1#��带 ��ü�ϰ� �;��.#l\r\n#L2#��� �ο����� �ø��� �;��.#l#k");
}

function action(mode, type, selection) {
    if (mode == -1 || (mode == 0 && status < 2)) {
        cm.dispose();
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 1) {
            sel = selection;
            if (selection == 0) {
                if (cm.getPlayer().getGuildId() > 0) {
                    cm.sendOk("�̹� ��尡 �����ó׿�. ��带 ��ü�Ͻðų� Ż���ϰ� ���ּ���");
                    cm.dispose();
                } else
                    cm.sendYesNo("��带 ����� ���Ƿ�����? ��带 ����Ϸ��� #b150�� �޼�#k�� �ʿ��ϴ�ϴ�. �غ� �� �Ǽ̴ٸ� #b'��'#k��ư�� �����ּ���.");
            } else if (selection == 1) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("����常�� ��带 ��ü�� �� �ֽ��ϴ�.");
                    cm.dispose();
                } else
                    cm.sendYesNo("��带 ���� ��ü�ϰ� �����Űǰ���? �ѹ� ��ü�� �ع����� ���� ������ �����Ǿ� ������ϴ�. �������� ��� Ư�ǵ� ���� �Բ� �������. �׷��� �Ͻðھ��?");
            } else if (selection == 2) {
                if (cm.getPlayer().getGuildId() < 1 || cm.getPlayer().getGuildRank() != 1) {
                    cm.sendOk("����常�� ��带 Ȯ���� �� �ֽ��ϴ�.");
                    cm.dispose();
                } else
                    cm.sendYesNo("���� ���� #b5#k�� Ȯ���ϴµ� #b500�� �޼�#k�� �ʿ��մϴ�. �غ� �� �Ǽ̴ٸ� #b'��'#k��ư�� �����ּ���.");
            }
        } else if (status == 2) {
            if (sel == 0 && cm.getPlayer().getGuildId() <= 0) {
                cm.genericGuildMessage(3);
            } else if (cm.getPlayer().getGuildId() > 0 && cm.getPlayer().getGuildRank() == 1) {
                if (sel == 1) {
                    cm.disbandGuild();
                } else if (sel == 2) {
                    cm.increaseGuildCapacity();
                }
            }
            cm.dispose();
        }
    }
}
