var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
    
    if (status == 0) {
            cm.sendYesNo("#fn������� Extrabold#���� �ٷ� #b������#k�� ����ұ��..?")
    } else if (status == 1) {
	if (cm.getPlayerCount(200090030) > 0) {
	cm.sendOk("#fn������� Extrabold##r����.. ���� ������� ���ϰ� �־��.. ��ٷ��ּ���..#k");
	cm.dispose();
	} else {
	cm.TimeMoveMap(200090030, 304070000, 15);
        cm.dispose();
        }
    }
}


