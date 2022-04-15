var status = -1;

pass = true;

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        for (i=0; i<cm.getPlayer().getMap().getAllMonster().size(); i++) {
            if (cm.getPlayer().getMap().getAllMonster().get(i).getId() == 8810001 + Number(cm.getPlayer().getMapId()%10 * 100)) {
                pass = false;
            }
        }
        if (!pass) {
            cm.getPlayer().dropMessage(5, "지금은 포탈이 작동하지 않습니다.");
            cm.dispose();
        } else {
            checkDate = 4500 - Math.floor((new Date().getTime() - cm.getPlayer().getKeyValue("HTailTime"))  / 1000);
            if (cm.getPlayer().getMapId() != 240060102) {
                cm.resetMap(Number(cm.getPlayer().getMapId()) + 100);

                cm.PartyTimeMove(240050400, Number(cm.getPlayer().getMapId()) + 100, checkDate);
            } else {
                cm.resetMap(240060300)
                cm.PartyTimeMove(240050400, 240060300, checkDate);
            }
            cm.resetReactors();
            cm.dispose();
        }
    }
}