/*

제작자 은시경(eunseekyung@nate.com)
	1차 수정 사라센 온라인 스크립트 개발 (projectchiu16@nate.com)

*/

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
            var chat = "#e#b[AURORA ONLINE]#k의 후원포인트 교환 시스템입니다. 기능을 선택해주세요 \r\n";
	    chat += "\r\n#L1##b메소및 황금색 단풍잎 ↔ 후원포인트 교환하기";
	    cm.sendSimple(chat);

} if (selection == 1) {
	       var chat = "#e#b 저는 [AURORA ONLINE]후원포인트 교환 엔피시입니다.#k\r\n";
               chat += "\r\n#L100##e#r[ #b후원포인트#k 3천#r -> #r메소#n#e5억 ]  교환#e";
               chat += "\r\n#L200##e[ #b후원포인트#k 6천#r → #r메소#n#e10억  ]  교환#e";
               chat += "\r\n#L300##e[#b후원포인트#k 1천#r → #r#i4033247##n#e1개  ]  교환#e";
               chat += "\r\n#L400##e[#b후원포인트#k 1만#r → #r#i4033247##n#e10개  ]  교환#e";
               chat += "\r\n#L500##e[#b후원포인트#k 10만#r → #r#i4033247##n#e100개  ]  교환#e";
               cm.sendSimple(chat);


            }  if (selection == 100) {
		if (cm.getRC() > 3000) {
		cm.getPlayer().loseRC(3000);
		cm.gainMeso(500000000);
		cm.sendOk("교환이 완료되었습니다.");

		} else {
		    cm.sendOk("후원포인트가 부족합니다.");
		    cm.dispose();
}


            }  if (selection == 200) {
		if (cm.getRC() > 6000) {
		cm.getPlayer().loseRC(6000);
		cm.gainMeso(1000000000);
		cm.sendOk("교환이 완료되었습니다.");

		} else {
		    cm.sendOk("후원포인트가 부족합니다.");
		    cm.dispose();
}


            }  if (selection == 300) {
		if (cm.getRC() > 1000) {
			cm.getPlayer().loseRC(1000);
			cm.gainItem(4033247, 1);
		        cm.sendOk("교환완료.");

		} else {
		    cm.sendOk("후원포인트가 부족합니다.");
		    cm.dispose();

}


            }  if (selection == 400) {
		if (cm.getRC() > 10000) {
			cm.getPlayer().loseRC(10000);
			cm.gainItem(4033247, 10);
		        cm.sendOk("교환완료.");

		} else {
		    cm.sendOk("후원포인트가 부족합니다.");
		    cm.dispose();

}



            }  if (selection == 500) {
		if (cm.getRC() > 100000) {
			cm.getPlayer().loseRC(100000);
			cm.gainItem(4033247, 100);
		        cm.sendOk("교환완료.");

		} else {
		    cm.sendOk("후원포인트가 부족합니다.");
		    cm.dispose();

}






		}
	}
}



