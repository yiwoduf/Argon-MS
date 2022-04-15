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
        if (!cm.haveItem(4032801,1) && cm.haveItem(4034075,1)) {
		var jessica = "#fn나눔고딕 Extrabold#지금.. 큰 일이야.. 밀렵꾼들이 몰려오고있어..\r\n";
		jessica += "근데 넌 인간이네... 어쨋든 지금은 니가 나를 좀\r\n";
		jessica += "도와주지 않겠어?.. 아니지... 아니야.. 인간 따윈 약하려나..?\r\n\r\n";
		jessica += "#fs14##d * 해당 아이템 드롭 몬스터 서식지#k#fs12#\r\n      엘린숲 침략지 3~4 - 현재맵 맨 오른쪽 위 포탈\r\n\r\n     #r[보상]#k #i4032801# #b#z4032801##k\r\n\r\n";
                if(cm.haveItem(4009078,30) && cm.haveItem(4009150,30)) {
                jessica += "#fUI/UIWindow2.img/UtilDlgEx/list3#\r\n#L0##i4009078# " + cm.itemQuantity(4009078) + "/30 + #i4009150# " + cm.itemQuantity(4009150) + "/30";
                } else {
                jessica += "#fUI/UIWindow2.img/UtilDlgEx/list1#\r\n#L0##i4009078# " + cm.itemQuantity(4009078) + "/30 + #i4009150# " + cm.itemQuantity(4009150) + "/30";
                }
		cm.sendSimple(jessica);
        } else {
        cm.sendOk("#fn나눔고딕 Extrabold#흠.. 인간들이란..");
        }
	} else if (status == 1) {

	if (selection == 0) {
               if(cm.haveItem(4009078,30) && cm.haveItem(4009150,30)) {
	       if (cm.canHold(4032801)) {
               cm.gainItem(4009078,-30);
               cm.gainItem(4009150,-30);
               cm.gainItem(4032801, 1);
               cm.sendOk("#fn나눔고딕 Extrabold#정말이지.. 고마워!.. 인간에게 신세를 지다니...\r\n이번일로 너희 인간들을 다시 보게 될거야..!\r\n\r\n#fUI/UIWindow2.img/QuestIcon/4/0#\r\n\r\n#i4032801# #b#z4032801##k");
               cm.dispose();
		} else {		         
			 cm.sendOk("#fn나눔고딕 Extrabold##r멍천한건가.. 기타 창을 비워주겠니..?#k");
		         cm.dispose();	
			}
               } else {
               cm.sendOk("#fn나눔고딕 Extrabold##r역시.. 인간에게는 나의 부탁이 무리였던거야..?#k");
               cm.dispose();
                }
}    
}
}
}