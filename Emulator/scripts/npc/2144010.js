
/*

	MapleStory 1.2.246 Varon Team Script Maker	Scripted By Varon Team :: MelnoK


	SCRIPT MAKER : ���K

	NPC ID : 2144010

	NPC NAME : ��ī�̷�

*/

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
        cm.sendYesNo("�� ���� ��ȹ�� ����ǰ���� ���� �༮���� �̷��� �� �߷� ã�ƿ��ִ� ���� ��ڱ� ���� ����.\r\n\r\n#r�� �񰡷� ���󿡼� ���� ���뽺���� ������ ������ �ָ�!");
        cm.playSound(false,"Sound/Voice.img/akayrum/3")
    } else if (status == 1) {
        cm.spawnMob(8860007,446,-181);
        cm.removeNpc(cm.getPlayer().getMapId(), 2144010);
        cm.dispose();
    }
}
