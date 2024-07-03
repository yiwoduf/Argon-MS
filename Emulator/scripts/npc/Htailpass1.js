importPackage(Packages.server.life);
var status = -1;

pass = true;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
        cm.dispose();
        return;
    }
    if (status == 0) {
        for (i = 0; i < cm.getPlayer().getMap().getAllMonster().size(); i++) {
            if (cm.getPlayer().getMap().getAllMonster().get(i).getId() == 8810000 + Number(cm.getPlayer().getMapId() % 10 * 100)) {
                pass = false;
            }
        }
        if (!pass) {
            cm.getPlayer().dropMessage(5, "지금은 포탈이 작동하지 않습니다.");
            cm.dispose();
        } else {
            checkDate = 4500 - Math.floor((new Date().getTime() - cm.getPlayer().getKeyValue("HTailTime")) / 1000);
            cm.PartyTimeMove(240050400, Number(cm.getPlayer().getMapId()) + 100, checkDate)
            cm.resetReactors();
            var map = cm.getPlayer().getMap();
            if (map.getReactor(2408003).getState() <= 0) {
                var pos = map.getReactor(2408003).getPosition();
                var mob = null;
                if (cm.getPlayer().getMapId() == 240060100) {
                    mob = MapleLifeProvider.getMonster(8810025);
                } else if (cm.getPlayer().getMapId() == 240060101) {
                    mob = MapleLifeProvider.getMonster(8810129);
                } else {
                    mob = MapleLifeProvider.getMonster(8810213);
                }
                cm.getPlayer().getMap().spawnMonsterOnGroundBelow(mob, pos);
                map.getReactor(2408003).setState(1);
                cm.mapMessage(6, "동굴이 울리면서 거대한 생물체가 다가오고 있습니다.")
            }
            cm.dispose();
        }
    }
}