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
//cm.sendOk("여기까지 오느라고 수고했어\r\n특별히 상으로 5천만메소를 줄께\r\n그럼 또 놀러와~");
        cm.dispose();
        return;
    }
}
