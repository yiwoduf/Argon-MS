var status = -1;

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
	cm.sendNext("��,,,,��");
//cm.getPlayer().setKeyValue2("�������", 60300);
    } else if (status == 1) {
	cm.warp(350060300);
	cm.dispose();
    }
}
