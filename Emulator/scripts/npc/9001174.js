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
            var chat = "#e#b[AURORA ONLINE]#k의 홍보 코인 교환 시스템입니다. 기능을 선택해주세요 \r\n";
	    chat += "\r\n#L1##b메소및 기타코인 ↔ 홍보코인 교환하기";
	    cm.sendSimple(chat);

} if (selection == 1) {
	       var chat = "#e#b 저는 [AURORA ONLINE]홍보 코인 교환 엔피시입니다.#k\r\n";
               chat += "\r\n#L100##e[#i4310129# 10개 → #r메소#n#e3억  ]  교환#e";
               chat += "\r\n#L200##e[#i4310129# 20개 → #r메소#n#e6억  ]  교환#e";
               chat += "\r\n#L300##e[#i4310129# 30개 → #r메소#n#e10억  ]  교환#e";
               chat += "\r\n#L400##e[#i4310129# 15개 → #i2591088# 1개  ]  교환#e";
               chat += "\r\n#L500##e[#i4310129# 3개 → #i4033247# 1개  ]  교환#e";
               chat += "\r\n#L600##e[#i4310129# 30개 → #i4033247# 10개  ]  교환#e";
               cm.sendSimple(chat);


            }  if (selection == 100) {
		if (cm.haveItem(4310129,10)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -10);
			cm.gainMeso(300000000);
		        cm.sendOk("교환완료.");
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 있는지 다시 한번 확인해 주세요!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("화폐가 부족합니다.");
		    cm.dispose();

}


            }  if (selection == 200) {
		if (cm.haveItem(4310129,20)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -20);
			cm.gainMeso(600000000);
		        cm.sendOk("교환완료.");
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 있는지 다시 한번 확인해 주세요!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("화폐가 부족합니다.");
		    cm.dispose();

}

            }  if (selection == 300) {
		if (cm.haveItem(4310129,30)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -30);
			cm.gainMeso(1000000000);
		        cm.sendOk("교환완료.");
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 있는지 다시 한번 확인해 주세요!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("화폐가 부족합니다.");
		    cm.dispose();

}

            }  if (selection == 400) {
		if (cm.haveItem(4310129,15)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -15);
			cm.gainItem(2591088, 1);
		        cm.sendOk("교환완료.");
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 있는지 다시 한번 확인해 주세요!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("화폐가 부족합니다.");
		    cm.dispose();

}

            }  if (selection == 500) {
		if (cm.haveItem(4310129,3)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -3);
			cm.gainItem(4033247, 1);
		        cm.sendOk("교환완료.");
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 있는지 다시 한번 확인해 주세요!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("화폐가 부족합니다.");
		    cm.dispose();

}


            }  if (selection == 600) {
		if (cm.haveItem(4310129,30)) {
		    if (cm.canHold(4310129)) {
			cm.gainItem(4310129, -30);
			cm.gainItem(4033247, 10);
		        cm.sendOk("교환완료.");
			cm.dispose();
		    } else {
		        cm.sendOk("기타창에 빈 공간이 있는지 다시 한번 확인해 주세요!");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("화폐가 부족합니다.");
		    cm.dispose();

}



		}
	}
}



