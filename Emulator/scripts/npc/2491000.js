importPackage(Packages.packet.creators);

var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {

    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        status --;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
	cm.sendSimple_("���� ���� �������� ���� ������ �� �帱�״� �� ����ֽñ� �ٶ��ϴ�.\r\n#L0##b#e������ ��´�#l");
    } else if (status == 1) {
	cm.sendSimple_("�������� �ʵ��� ���͸� ��� óġ�ϰ��� �Ŵ��� �񸶰� ��Ÿ���ϴ�. �񸶸� óġ�ϰ��� ���� ���������� �̵��̰��� �ϸ� ���̳� ������������ Ŭ���� �ϰԵǸ� �������� ����˴ϴ�.\r\n#L0##b#e�������� �����Ѵ�.#l");
    } else if (status == 2) {
	cm.getPlayer().getMap().respawn(true);
	cm.getPlayer().getMap().broadcastMessage(UIPacket.clearMidMsg());
	cm.getPlayer().getMap().broadcastMessage(MaplePacketCreator.showEffect("monsterPark/stageEff/stage"));
	cm.getPlayer().getMap().broadcastMessage(MaplePacketCreator.showEffect("monsterPark/stageEff/number/" + 1));
	cm.dispose();
    }
}
