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
      //  cm.warp(100000000);
//	cm.gainMeso(50000000);
//cm.sendOk("������� ������� �����߾�\r\nƯ���� ������ 5õ���޼Ҹ� �ٲ�\r\n�׷� �� ���~");
        cm.dispose();
        return;
    }
}
