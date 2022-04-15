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
	cm.sendSimpleS("#b부활을 하시면 가까운 곳에 위치한 안전한 마을로 이동하게 됩니다.\r\n#L0##Cgray#부활 하겠습니다.#l", 2);
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
