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
		var c1 = "#fn나눔고딕 Extrabold##i3014005# #d[착용 제한 : 250 LV]#k #r1 천만 메소#k #b명예의 상징#k\r\n\r\n오! #r250 레벨#k 을 달성 했네요! 제가 #d특별한 기회#k 를 드릴게요!\r\n저에게 이 #b특별한 의자#k 를 구매하지 않을래요?\r\n#r250 레벨#k 을 찍었으니 #d기념 사진#k 한 장 정도?!\r\n";
		c1+= "#L0##d오! 이 기회를 놓칠 수 없어요!#k#l\r\n";
		c1+= "#L1##r저는, 관심 없어요..#k#l\r\n";
		cm.sendSimple(c1);
	} else if (status == 1) {
	if (selection == 0) {
        if (cm.getPlayer().getLevel() >= 250 && cm.getMeso() >= 10000000 && !cm.haveItem(3014005, 1)) {
	       if (cm.canHold(3014005)) {
		cm.gainMeso (-10000000);
		cm.gainItem (3014005, 1);
                cm.sendOk("#fn나눔고딕 Extrabold##b좋은 사진 나오길 바랄게요..#k");
		cm.dispose();
		} else {		         
			 cm.sendOk("#fn나눔고딕 Extrabold##d설치창#k 을 비워주시겠어요..?");
		         cm.dispose();	
			}
} else {
        cm.sendOk ("#fn나눔고딕 Extrabold##r레벨 또는 메소가 부족하거나, 또는 이미 소지중 이신데요..#k");
        cm.dispose();
}

} else if (selection == 1) {
        cm.sendOk ("#fn나눔고딕 Extrabold##r이 기회를 놓치시다니.. 아쉽군요..#k");
        cm.dispose();
}
}
}
}