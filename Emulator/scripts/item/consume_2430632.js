var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (status == 2 && mode == 0) {
        status --;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if(cm.getPlayer().getLevel() < 250) {
            cm.sendYesNo("#fs11#�Ŀ� �������� �� ���� ������ �� ����� ���� ������ �˴ϴ�.\r\n"
                        +"���� ����Ͻðڽ��ϱ�?\r\n\r\n"
                        +"1~100 ���� : 1 ������\r\n"
                        +"101~120 ���� : ���� ���������� �ʿ��� ����ġ 60%\r\n"
                        +"121~140 ���� : ���� ���������� �ʿ��� ����ġ 50%\r\n"
                        +"141~160 ���� : ���� ���������� �ʿ��� ����ġ 40%\r\n"
                        +"161~180 ���� : ���� ���������� �ʿ��� ����ġ 30%\r\n"
                        +"181~200 ���� : ���� ���������� �ʿ��� ����ġ 20%\r\n"
                        +"201~220 ���� : ���� ���������� �ʿ��� ����ġ 10%\r\n"
                        +"221~249 ���� : ���� ���������� �ʿ��� ����ġ 5%");
       } else {
           cm.sendOk("���� ĳ���ʹ� ����Ͻ� �� �����ϴ�.");
           cm.gainItem(2430632,-1);
           cm.dispose();
       }
    } else if (status == 1) {
        �� = cm.getPlayer().getLevel();
        if(��<=100) {
            ���� = 1
        } else if (��<=120) {
            ���� = 0.6
        } else if (��<=140) {
            ���� = 0.5
        } else if (��<=160) {
            ���� = 0.4
        } else if (��<=180) {
            ���� = 0.3
        } else if (��<=200) {
            ���� = 0.2
        } else if (��<=220) {
            ���� = 0.1
        } else if (��<=249) {
            ���� = 0.05
        } else {
            ���� = 0
        }
        �� = Packages.constants.GameConstants.getExpNeededForLevel(��) * ����
        if (�� <= 2147483647) {
            cm.gainExp(��);
        } else {
            �� = ����(�� / 2147483647, 0)
            ������ = �� % 2147483647
                for(i=0; i<��; i++) {
                    cm.gainExp(2147483647);
                }
            cm.gainExp(������);
        }
        cm.gainItem(2430632, -1);
        cm.dispose();
    }
}

function ����(n, pos) {
    var digits = Math.pow(10, pos);
    var num = Math.floor(n * digits) / digits;
    return num.toFixed(pos);
}