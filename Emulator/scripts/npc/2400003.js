function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection, selection2) {
    if (status >= 0 && mode == 0) {
	cm.dispose();
	return;
    }
    if (mode == 1)
	status++;
    else
	status--;
    if (status == 0) {
        var str = "#b#e#h 0#님#n#k 안녕하세요 에이플러스의 스탯 초기화 엔피시입니다.\r\n";
        str += "#b#e#L1#스탯 분배하기 (1천만메소)#n#k#l\r\n";
        cm.sendSimple(str);
    } else if (status == 1) {
        if (cm.getPlayer().getMeso() >= 10000000) {
            cm.resetStats(4,4,4,4);
            cm.sendOk("스탯 초기화에 성공 하였습니다.");
            cm.gainMeso(-10000000);
        } else {
            cm.sendOk("메소가 부족하여 스탯 초기화를 하실 수 없습니다.");
            cm.dispose();
        }
    }
}