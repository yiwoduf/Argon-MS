

importPackage(Packages.packet.creators);

/*

	* �ܹ����ǽ� �ڵ����� ��ũ��Ʈ�� ���� ������� ��ũ��Ʈ �Դϴ�.

	* (Hina Online Development Source Script)

	�׶� �� ���� ����� �����ϴ�.

	���ǽþ��̵� : 3000022

	���ǽ� �̸� : ����

	���ǽð� �ִ� �� :  :  (400000002)

	���ǽ� ���� : MISSINGNO


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
    if (cm.getPlayer().getMapId() == 109090100) {
    
    						cm.getPlayer().addSpiritPoint(5);
    						cm.warp(109090000);
                cm.getPlayer().send(MainPacketCreator.sendHint("#b������� ����#k�� ���޵Ǿ����ϴ�.\r\n#e#r����ų +6��#k#n�� ȹ���ϼ̽��ϴ�.",300,20));
                cm.dispose();
                } else if (cm.getPlayer().getMapId() == 109090101) {
                cm.getPlayer().addSpiritPoint(1);
                cm.warp(109090000);
                cm.getPlayer().send(MainPacketCreator.sendHint("#b������� ����#k�� ���޵Ǿ����ϴ�.\r\n#e#r����ų +1��#k#n�� ȹ���ϼ̽��ϴ�.",300,20));
                cm.dispose();
                } else if (cm.getPlayer().getMapId() == 109090200) {
                   cm.getPlayer().addSpiritPoint(6);
                cm.warp(109090000);
                cm.getPlayer().send(MainPacketCreator.sendHint("#b������� ����#k�� ���޵Ǿ����ϴ�.\r\n#e#r����ų +5��#k#n�� ȹ���ϼ̽��ϴ�.",300,20));
                cm.dispose();
                } else if (cm.getPlayer().getMapId() == 109090201) {
                cm.getPlayer().addSpiritPoint(1);
                cm.warp(109090000);
                cm.getPlayer().send(MainPacketCreator.sendHint("#b������� ����#k�� ���޵Ǿ����ϴ�.\r\n#e#r����ų +1��#k#n�� ȹ���ϼ̽��ϴ�.",300,20));
                cm.dispose();

}
}
}