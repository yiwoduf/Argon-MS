var status = -1;

function start() {
	status = -1;
	action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == 1) {
        status++;
    } else {
	cm.dispose();
	return;
    }
    if (status == 0) {
        cm.sendNextS("(앞 쪽에 혼테일의 동굴이 보인다. 들어가자.)",2);
    } else if (status == 1) {
        cm.warp(240050000,0);
        cm.dispose();
    }
}