


/*
 
 * �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.
 
 * (Aeos Development Source Script
 
 5�η� �� ���� ����� �����ϴ�.
 
 ���ǽþ��̵� : 2141002
 
 ���ǽ� �̸� : ������ ����������
 
 ���ǽð� �ִ� �� : �ŵ��� Ȳȥ
 
 ���ǽ� ���� : MISSINGNO
 
 
 */

var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        cm.sendYesNo("�����븦 ��ġ�� ������ �����ðڽ��ϱ�?");
    } else if (status == 1) {
        if (cm.getPlayer().getParty().getLeader().getId() != cm.getPlayer().getId()) {
            if (cm.getPlayer().getMapId() == 270050100) {
                cm.warp(270050300);
            } else {
                cm.warp(270051300);
            }
        } else {
            if (cm.getPlayer().getMapId() == 270050100) {
                cm.removeNpc(cm.getMapId(), 2141000);
                cm.mapMessage(5, "���������� ������ �����ϰų� �Ϸ��ϰ� ������ �����Ͽ�. ��� ��Ƽ���� ���ܿ��� ���� �Ͽ����ϴ�.");
                cm.allPartyWarp(270050300, true);
                cm.resetMap(270050200);
                cm.resetMap(270050100);
                cm.resetMap(270050000);
            } else {
                cm.removeNpc(cm.getMapId(), 2141000);
                cm.mapMessage(5, "���������� ������ �����ϰų� �Ϸ��ϰ� ������ �����Ͽ�. ��� ��Ƽ���� ���ܿ��� ���� �Ͽ����ϴ�.");
                cm.allPartyWarp(270051300, true);
                cm.resetMap(270051200);
                cm.resetMap(270051100);
                cm.resetMap(270050000);
            }
        }
        cm.dispose();
    }

}
