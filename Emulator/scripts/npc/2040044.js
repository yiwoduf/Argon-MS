importPackage(java.util);
importPackage(java.lang);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode != 1) {
	cm.dispose();
        return;
    } else 
	status++;
    if (status == 0) {
	if (cm.getMonsterCount(cm.getMapId()) == 0) {
	    cm.sendNext("#b�˸�����#k�� �����߸��̱���! ���� �����ϼ̽��ϴ�. ������ ���п� ������ ���� ������ ���� �� �ְ� �Ǿ����ϴ�. ���� ������ �����帮���� �ϰڽ��ϴ�.");
	} else {
	    cm.sendNext("� #b�˸�����#k�� �����߸��� ���ּ���!");
	    cm.dispose();
	}
    } else if (status == 1) {
	cm.getEventInstance().unregisterPlayer(cm.getPlayer());
	cm.warp(922010000,0);
	cm.removeAll(4001022);
	cm.getPlayer().setKeyValue("CrackyGlass",(Integer.parseInt(cm.getPlayer().getKeyValue("CrackyGlass")) + 1) + "");
	cm.dispose();
    }
}