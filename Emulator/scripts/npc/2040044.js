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
	    cm.sendNext("#b알리샤르#k를 쓰러뜨리셨군요! 정말 수고하셨습니다. 여러분 덕분에 차원의 문을 무사히 닫을 수 있게 되었습니다. 이제 밖으로 보내드리도록 하겠습니다.");
	} else {
	    cm.sendNext("어서 #b알리샤르#k를 쓰러뜨리고 와주세요!");
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