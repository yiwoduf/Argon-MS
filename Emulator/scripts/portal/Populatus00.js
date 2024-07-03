function enter(pi) {
    if (!pi.checkTimeValue("Papulatus_BattleStartTime", 3600 * 2)) {
        pi.getPlayer().message(5, "시계탑의 근원에는 2시간마다 한번씩만 입장할 수 있습니다.");
        return false;
    }
    if (pi.getPlayerCount(230040420) >= 1) {
           pi.getPlayer().message(5, "이미 누군가가 피아누스를 잡고있습니다.");
           return false;
    }
    if (!pi.haveItem(4031179)) {
	pi.playerMessage(5, "차원 균열의 조각을 소지하고 있지 않아 파풀라투스를 만날 수 없습니다.");
	return false;
    }
    pi.setTimeValueCurrent("Papulatus_BattleStartTime");
    pi.playPortalSE();
    pi.warp(pi.getPlayer().getMapId() + 1, "sp");
    pi.getPlayer().getMap().resetReactors();
    pi.getPlayer().getMap().killAllMonsters(true);
    return true;
}