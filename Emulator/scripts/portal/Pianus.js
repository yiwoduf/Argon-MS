


/*

	ǻ�� �¶��� �ҽ� ��ũ��Ʈ �Դϴ�.

	��Ż�� �ִ� �� : ������ ����

	��Ż ���� : �Ǿƴ����� ����


*/

var map = 230040420;

function enter(pi) {
    if (!pi.checkTimeValue("Pianus_BattleStartTime", 3600 * 2)) {
        pi.getPlayer().message(5, "�Ǿƴ����� 2�ð����� �ѹ����� ������ �� �ֽ��ϴ�.");
        return false;
    }
    if (pi.getPlayerCount(230040420) >= 1) {
           pi.getPlayer().message(5, "�̹� �������� �Ǿƴ����� ����ֽ��ϴ�.");
           return false;
    }
    pi.setTimeValueCurrent("Pianus_BattleStartTime");
    pi.playPortalSE();
    pi.warp(map);
    pi.getPlayer().getMap().killAllMonsters(true);
    pi.getPlayer().getMap().respawn(true);
    
    return true;
}
