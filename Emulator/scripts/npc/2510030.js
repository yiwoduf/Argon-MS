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
    if (cm.getPlayer().getMapId() == 302090220) {
        cm.sendNext("#fn������� Extrabold#\r\n#r�Ƹ� ::#k ��������..? ��!.. �λ�� �ʿ� �����.. ������ ���ּ���..\r\n��.. ����� ���� ������ #d����#k ���� ��� ���� ���� �ް� �־��..");
    } else {
        cm.sendOk("#fn������� Extrabold#�ſ�.. �ǰ��ϱ���..");
        cm.dispose();
    }
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ��.. ����... #d����#k �̶��.. ��� ��� �� �� ������..",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#r�Ƹ� ::#k Ȥ��.. ����� ���ϽŰ���?..\r\n�׷��ٸ�.. ���� �ε�.. ����#�Ӱ� ���ּ���. ��Ź�����..");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k �� ������ ���� ����� ����! ������.. �� ���ϰŵ�!\r\n� ���� #d����#k �� �ִ� ������ �ȳ���!!",2);
    } else if (status == 4) {
        cm.sendNextPrev("#fn������� Extrabold##r�Ƹ� ::#k �����̽Ű���..? �׷�.. ��Ź�帱�Կ�..#k\r\n\r\n#d(������ ������ �ٷ� ������ ������ �̵��մϴ�.)#k");
    } else if (status == 5) {
	if (cm.getPlayerCount(302090240) > 0) {
        cm.sendOk("#fn������� Extrabold#�̹�.. �������� ���� #d����#k �� ������ �־�.. ���.. ��ٷ�..");
        cm.dispose();
        } else {
	cm.warp (302090240,0);
	cm.killAllMob();
        cm.sendNext("#fn������� Extrabold##r�Ƹ� ::#k #d����#k �� ��ġ �� �� �͵��� ������ �������ּ���..\r\n\r\n#i4009157# #b#z4009157##k "+cm.itemQuantity(4009157)+"/1\r\n#i4009158# #b#z4009158##k "+cm.itemQuantity(4009158)+"/1");
	cm.spawnMob(8230011, -650, 185);
	cm.spawnMob(8230012, -400, 185);
	cm.showEffect(false,"pepeKing/chat/nugu");
        cm.playSound(false,"Field.img/hekaton/enter00");
        cm.dispose();
        }
    }
}