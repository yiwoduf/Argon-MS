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
        cm.sendOk("#fn나눔고딕 Extrabold##r[경축]#k #어 영구 정지 처리 되었습니다.#k");
        cm.dispose();
        return;
    }

