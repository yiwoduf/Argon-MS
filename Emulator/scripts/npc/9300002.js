


/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Guardian Project Development Source Script)

	���÷��� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 9300002

	���ǽ� �̸� : �������

	���ǽð� �ִ� �� :  :  (0)

	���ǽ� ���� : MISSINGNO
*/

status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
            if (cm.getClient().getChannelServer().getMapFactory().getMap(0).getCharactersSize() > 0) {
                cm.sendOk("#b(�̹� �ٸ� ���Ͱ� �������ΰ� ����.)");
                cm.dispose();
                return;
            }
            if (cm.getPlayer().getKeyValue("�絹������") != null) {
                cm.sendOk("�Ϸ� �ѹ����尡��. �����ϼ����� �⼮üũ�� �ٽ��������ּ���.");
                cm.dispose();
                return;
            }
cm.getPlayer().setKeyValue("�絹������", "��")
cm.sendOk("�ߵ�");
cm.TimeMoveMap(0,100000000,300);
cm.getPlayer().getMap().spawnMonsterOnGroundBelow(Packages.server.life.MapleLifeProvider.getMonster(9300808), new java.awt.Point(50, 97));
cm.sendOk("5�е��� �����ð� @������ �����ѹ� �Ͻø� ��ŷ�ý��ۿ� ����˴ϴ�. �׸��� ���߿� �����ø� ��������Ұ����մϴ�.�� ������ ������");
        cm.dispose();
        return;
    }
cm.sendOk("5�е��� �����ð� @������ �����ѹ� �Ͻø� ��ŷ�ý��ۿ� ����˴ϴ�.");
cm.dispose();
}

