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
            cm.sendYesNo("#fn������� Extrabold#�׸� �ΰ� #b����Ʈ�� ����#k ���� ���ư��ðھ��..?")
    } else if (status == 1) {
	cm.warp (100030301,0);
        cm.dispose();
    }
}


