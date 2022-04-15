
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
        cm.sendSimple(cm.ChaosBossShop());
    } else if (status == 1) {
        if (selection >= 0) {
            cm.gainChaosBossShop(selection);
            cm.dispose();
        } else {
            cm.dispose();
        }
    }
}
