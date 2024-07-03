

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
		var sungwoo = "#r#e#fn나눔고딕 Extrabold#     　　      [ 10% 공격력 주문서 관련 아이템 ]#k#n\r\n";
		sungwoo += "　#b#L0##r500만#k#b메소 #i2043002##k(#t2043002#)#b5개#k\r\n#l";
		sungwoo += "　#b#L1##r500만#k#b메소#i2043102##k(#t2043102#)#b5개#k\r\n#l";
		sungwoo += "　#b#L2##r500만#k#b메소#i2043202##k(#t2043202#)#b5개#k\r\n#l";
		sungwoo += "　#b#L3##r500만#k#b메소#i2043302##k(#t2043302#)#b5개#k\r\n#l";
		sungwoo += "　#b#L4##r500만#k#b메소#i2044402##k(#t2044402#)#b5개#k\r\n#l";
		sungwoo += "　#b#L5##r500만#k#b메소#i2043702##k(#t2043702#)#b5개#k\r\n#l";
		sungwoo += "　#b#L6##r500만#k#b메소#i2043802##k(#t2043802#)#b5개#k\r\n#l";
		sungwoo += "　#b#L7##r500만#k#b메소#i2044502##k(#t2044502#)#b5개#k\r\n#l";
		sungwoo += "　#b#L8##r500만#k#b메소#i2044602##k(#t2044602#)#b5개#k\r\n#l";
		sungwoo += "　#b#L9##r500만#k#b메소#i2045202##k(#t2045202#)#b5개#k\r\n#l";
		sungwoo += "　#b#L10##r500만#k#b메소#i2043302##k(#t2043302#)#b5개#k\r\n#l";
		sungwoo += "　#b#L11##r500만#k#b메소#i2044702##k(#t2044702#)#b5개#k\r\n#l";
		sungwoo += "　#b#L12##r500만#k#b메소#i2043602##k(#t2043602#)#b5개#k\r\n#l";
		sungwoo += "　#b#L13##r500만#k#b메소#i2042402##k(#t2042402#)#b5개#k\r\n#l";
		sungwoo += "　#b#L14##r500만#k#b메소#i2044802##k(#t2044802#)#b5개#k\r\n#l";
		sungwoo += "　#b#L15##r500만#k#b메소#i2044902##k(#t2044902#)#b5개#k\r\n#l";
		sungwoo += "　#b#L16##r500만#k#b메소#i2042202##k(#t2042202#)#b5개#k\r\n#l\r\n"
		cm.sendSimple(sungwoo);

	} else if (status == 1) {
             if (selection == 0) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043002,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               
               }
} else if (selection == 1) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043102,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 2) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043202,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 3) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043302,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 4) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044402,5);
               cm.gainMeso(-5000000);
               cm.sendOk("구매가완료되었습니다.");
               cm.dispose();
               } else {
               cm.sendOk("완료.");
               cm.dispose();
               }
} else if (selection == 5) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043702,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 6) {
               if(cm.getMeso() >= 7000000){
               cm.gainItem(2043802,5);
               cm.gainMeso(-7000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
}
} else if (selection == 7) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044502,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 8) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044602,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 9) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2045202,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 10) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043302,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 11) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044702,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 12) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2043602,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 13) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2042402,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 14) {
               if(cm.getMeso() >= 1000000){
               cm.gainItem(2044802,5);
               cm.gainMeso(-1000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 15) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2044902,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
} else if (selection == 16) {
               if(cm.getMeso() >= 5000000){
               cm.gainItem(2042202,5);
               cm.gainMeso(-5000000);
               cm.sendOk("완료.");
               cm.dispose();
               } else {
               cm.sendOk("물건을 하기엔, 메소가 부족한거같은데?");
               cm.dispose();
               }
}
}
}
}

