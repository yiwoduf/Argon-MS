var status = 0;

importPackage(Packages.constants);

function start() {
    status = -1;
    action(1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1) {
        cm.dispose();
    } else {
        if (mode == 0) {
            cm.dispose();
            return;
        }
        if (mode == 1)
            status++;
        else
            status--;
	if (status == 0) {
		var jessica = "#fn나눔고딕 Extrabold##b"+ServerConstants.serverName+" 광장#k 으로 이동하고 싶으세요.?\r\n";
		jessica += "#L0##b"+ServerConstants.serverName+" 광장#k 으로 이동하기#k\r\n"
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
		cm.warp(680000000,0);
	}
}
}
}