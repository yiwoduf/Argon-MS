var status = -1;
var sel = 0;

function action(mode, type, selection) {
    if (mode == 1) {
	status++;
    } else {
	if (status == 0) {
	    cm.dispose();
	}
	status--;
    }
    if (status == 0) {
	cm.sendSimpleS("#b��Ȱ�� �Ͻø� ����� ���� ��ġ�� ������ ������ �̵��ϰ� �˴ϴ�.\r\n#L0##Cgray#��Ȱ �ϰڽ��ϴ�.#l", 2);
    } else if (status == 1) {
	if (cm.getPlayer().getEventInstance() != null) {
		cm.getPlayer().getEventInstance().revivePlayer(cm.getPlayer());
	}
	cm.getPlayer().getStat().setHp(50, cm.getPlayer());
	var to = cm.getPlayer().getMap().getReturnMap();
	cm.getPlayer().changeMap(to, to.getPortal(0));
	cm.dispose();
    }
}
