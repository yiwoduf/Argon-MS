

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
		var sungwoo = "#r#e#fn나눔고딕 Extrabold#     　　      [ 잠재&기타 주문서 관련 아이템 ]#k#n\r\n";
		sungwoo += "　#b#L0##r500만#k#b메소#i2049300##k(#t2049300#)#b50구매#k\r\n#l";
		sungwoo += "　#b#L1##r500만#k#b메소#i2049400##k(#t2049400#)#b50구매#k\r\n#l";
		sungwoo += "　#b#L2##r500만#k#b메소#i2048305##k(#t2048305#)#b50구매#k\r\n#l";
		sungwoo += "　#b#L3##r2000만#k#b메소#i2049704##k(#t2049704#)#b20구매#k\r\n#l";
		sungwoo += "　#b#L4##r3000만#k#b메소#i5064000##k(#t5064000#)#b100구매#k\r\n#l";
		sungwoo += "　#b#L5##r3000만#k#b메소#i5064100##k(#t5064100#)#b100구매#k\r\n#l";
		sungwoo += "　#b#L6##r3000만#k#b메소#i5064300##k(#t5064300#)#b100구매#k\r\n#l\r\n"
		cm.sendSimple(sungwoo);

	} else if (status == 1) {
             if (selection == 0) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2049300,50);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 구매하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               
               }
} else if (selection == 1) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2049400,50);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 구매하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 2) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2048305,50);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 구매하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 3) {
               if(cm.getMeso() >= 20000000){
               cm.gainItem(2049704,20);
               cm.gainMeso(-20000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 구매하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 4) {
               if(cm.getMeso() >= 30000000){
               cm.gainItem(5064000,100);
               cm.gainMeso(-30000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("완료.");
               cm.dispose();
               }
} else if (selection == 5) {
               if(cm.getMeso() >= 30000000){
               cm.gainItem(5064100,100);
               cm.gainMeso(-30000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 구매하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 6) {
               if(cm.getMeso() >= 30000000){
               cm.gainItem(5064300,100);
               cm.gainMeso(-30000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 구매하기엔, 메소가 부족한거같은데?");
               cm.dispose();
}

}
}
}
}

