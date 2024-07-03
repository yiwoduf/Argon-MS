var status = 0;

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
		var jessica = "#fn나눔고딕 Extrabold#용기도.. 능력도 없는자.. 는 나가도록..\r\n";
		jessica += "#L1##r5 천만 메소#k - #d능력의 하늘의 힘..#k\r\n"
		jessica += "#L0##b지하철 출구 게이트..#k\r\n"
		cm.sendSimple(jessica);
	} else if (status == 1) {
	if (selection == 0) {
		cm.dispose();
                cm.warp(100030301);
	} else if (selection == 1) {
                if(cm.getMeso() >= 50000000){
                cm.gainMeso(-50000000);
                cm.giveBuff(30021237,1);
                cm.dispose();
                }else{
                cm.sendOk("#fn나눔고딕 Extrabold##r당신은.. 재물의 능력이 없는 자..#k");
		cm.dispose();
		}
	}
}
}
}