function enter(pi) {
    if (!pi.checkTimeValue("Papulatus_BattleStartTime", 3600 * 2)) {
        pi.getPlayer().message(5, "�ð�ž�� �ٿ����� 2�ð����� �ѹ����� ������ �� �ֽ��ϴ�.");
        return false;
    }
    if (pi.getPlayerCount(230040420) >= 1) {
           pi.getPlayer().message(5, "�̹� �������� �Ǿƴ����� ����ֽ��ϴ�.");
           return false;
    }
    if (!pi.haveItem(4031179)) {
	pi.playerMessage(5, "���� �տ��� ������ �����ϰ� ���� �ʾ� ��Ǯ�������� ���� �� �����ϴ�.");
	return false;
    }
    pi.setTimeValueCurrent("Papulatus_BattleStartTime");
    pi.playPortalSE();
    pi.warp(pi.getPlayer().getMapId() + 1, "sp");
    pi.getPlayer().getMap().resetReactors();
    pi.getPlayer().getMap().killAllMonsters(true);
    return true;
}