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
            cm.sendYesNo("#fn������� Extrabold#�ڳ�.. ������ �� ���� �ִ°�?\r\n�����.. �ڳ״� #rŻ����#k �� ���� ����� �� ����..\r\n���� ����� �¿��ְڳ�.. ���� �ٷ� #d���#k �ϰڳ�?")
    } else if (status == 1) {
		cm.warp (302020000,0);
                cm.sendNext("#fn������� Extrabold#����.. ������� �� �ִ� ���� ���������..\r\n�ƹ��ɷ� ���� �� .. ������ �� ���Գ�..");
                cm.getPlayer().dropMessage(-1,"��.. ����..? �ϴ� ������.. ���ư� ����?...");
                cm.getPlayer().dropMessage(5,"��.. ����..? �ϴ� ������.. ���ư� ����?..."); 
                cm.dispose();
    }
}


