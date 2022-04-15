var status;

function start() {
    status = -1;
    action(1, 1, 0);
}

function action(mode, type, selection) {
    if (mode < 0) {
        cm.dispose();
    return;
    } else {
        if (mode == 1)
            status++;
        else
            status--;
        if (status == 0) {
cm.setDamageSkin("0");
cm.sendOk("데미지스킨이 설정 되었습니다.");
cm.gianItem(2431965, -1);
cm.dispose();
}
}
}