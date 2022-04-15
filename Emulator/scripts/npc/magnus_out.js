var status = -1;

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
        return;
    }
    if (mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }

    if (status == 0) {
        cm.sendYesNo("전투를 마치고 이동합니다.");
    } else if (status == 1) {
        if (cm.getPlayer().getMapId() == 401060300) {
            cm.warp(401060399, "out_magnusDoor");
        } else {
            cm.warp(401060000, "out_magnusDoor");
        }
        cm.dispose();
    }
}