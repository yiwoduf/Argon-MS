/*
 * ��ī�̷�
 */
function enter(pi) {
    var map = pi.getPlayer().getMap();
    if (pi.getMonsterCount(map.getId()) <= 0) {
        pi.warp(map.getId() - 100);
    } else {
        pi.getPlayer().message(5, "�̵� �� �� �����ϴ�.");
    }
    return false;
}
