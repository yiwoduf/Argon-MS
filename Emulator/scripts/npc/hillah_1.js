var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}
    ���� = "";
function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        if(cm.getPlayer().getMapId() == 262030100 || cm.getPlayer().getMapId() == 262030110 || cm.getPlayer().getMapId() == 262030200 || cm.getPlayer().getMapId() == 262030210) {
                ���� = "�̿�"
                cm.sendYesNo("�̴�� �����Ͻðھ��?");
        } else {
                   ���� = "�������"
            for (i=0; i<cm.getMonsterCount(cm.getPlayer().getMapId()); i++) {
               if (cm.getMap(cm.getPlayer().getMapId()).getAllMonster().get(i).getId() == 8870000 || cm.getMap(cm.getPlayer().getMapId()).getAllMonster().get(i).getId() == 8870200 || cm.getMap(cm.getPlayer().getMapId()).getAllMonster().get(i).getId() == 8870100) {
                   ���� = "��������"
               }
            }
         cm.sendYesNo("������ ��ġ�� �����Ͻðڽ��ϱ�?");
        }
    } else if (status == 1) {
        if (���� == "��������") {
            cm.sendYesNo("���� ���� ����ġ�� ���ߴµ�, ���� �����ϰ� �����ðھ��?");
        } else if (���� == "�������") {
            cm.warp(262030000,1);
            cm.dispose();
        } else {
            cm.sendNext("��¿ �� ������. ������� �����ּż� �����߾��.");
        }
    } else if (status == 2) {
        cm.warp(262030000, 1);
        cm.dispose();
    }
}