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
        cm.sendNext("#fn������� Extrabold#\r\n#r���� ���� ::#k ���.. �̰� ������~!.. ���ҷο� ��!~\r\n�ʵ� ���⺸�� �� �̷��ϱ�.. ������� �Ѿƿ��ٴ�..!!\r\n���鼭.. �� �Ǹ��� ����ǰ�� �� �ð���!~\r\n�Ǹ�������!.. �ʵ� �� �׷��� �ɰŴϱ�!...\r\n");
    } else if (status == 1) {
	cm.sendNextPrevS("#fn������� Extrabold#\r\n#b#h?# ::#k ����.. �� �� ������..\r\n���� �ʶ��� ����� �� �����ϸ�.. #d(�ε�ε�..)#k\r\n�� ���±迡 �� ���ҷο� �� �� ���� ����ǰڳ�~^^",2);
    } else if (status == 2) {
	cm.sendNextPrev("#fn������� Extrabold#\r\n#r���� ���� ::#k ����.. ���� �����ϸ� �밨�� ������...!~\r\n�� ö���� ��ȸ�ϰ� ������ְھ�!~ ���ҷο� ��!!");
    } else if (status == 3) {
	cm.sendNextPrevS("#fn������� Extrabold##b#h?# ::#k ��.. ��.. ����..?\r\n�׷�.. �����Ѱ� ���� ����� �����ٰ�~^^\r\n\r\n#fs15##r����!!.. �̾߾�!!#k#fs12#\r\n\r\n#d(������ ������ ��������� ������ �����մϴ�.)#k",2);
    } else if (status == 4) {
	if (cm.getPlayerCount(304070100) > 0) {
        cm.sendOk("#fn������� Extrabold##r��.. �̹� ������ ������ �����ϰ� �ֱ�..\r\n��.. �� ������ ���������..#k");
        cm.dispose();
        } else {
        cm.warp(304070100,0);
	cm.killAllMob();
	cm.spawnMob(9001010, 0, -100);
	cm.showEffect(false,"grandBattle/attack");
	cm.showEffect(false,"adventureStory/screenMsg/1");
        cm.playSound(false,"Field.img/flowervioleta/thunder");
        cm.dispose();
        }
    }
}