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
            var chat = "#e#b[AURORA ONLINE]#k의 화페 시스템입니다. 기능을 선택해주세요 \r\n";
	    chat += "\r\n#L1##b메소 ↔ 초경량화페 교환하기";
	    cm.sendSimple(chat);

} if (selection == 1) {
	       var chat = "#e#b 저는 [AURORA ONLINE]화폐 엔피시입니다.#k\r\n";
               chat += "\r\n#r21억이 메소 한계점 입니다. 메소가 안들어와도 서버 운영자의 책임은 없음을 알립니다.#e";
               chat += "\r\n#L100##e#r[#i4000001# 기타 아이템(1:7500) ]  교환#e";
               chat += "\r\n#L200##e[#i4310185# 1개 → #r메소#n#e천만  ]  교환#e";
               chat += "\r\n#L201##e[#i4310185# 10개 → #r메소#n#e1억  ]  교환#e";
               chat += "\r\n#L202##e[#i4310185# 100개 → #r메소#n#e10억  ]  교환#e";
               chat += "\r\n#L300##e[#i4310184# 1개 → #r메소#n#e5천만  ]  교환#e";
               chat += "\r\n#L301##e[#i4310184# 10개 → #r메소#n#e5억  ]  교환#e";
               chat += "\r\n#L400##e[#i4310108# 1개 → #r메소#n#e1억  ]  교환#e";
               chat += "\r\n#L401##e[#i4310108# 10개 → #r메소#n#e10억  ]  교환#e";
               chat += "\r\n#L500##e[#r메소#n#e천만 → #i4310185# 1개  ]  교환#e";
               chat += "\r\n#L501##e[#r메소#n#e5천만 → #i4310184# 1개  ]  교환#e";
               chat += "\r\n#L502##e[#r메소#n#e1억 → #i4310108# 1개 ]  교환#e";
               chat += "\r\n#L503##e[#r메소#n#e10억 → #i4310108# 10개 ]  교환#e";
               cm.sendSimple(chat);


            }  if (selection == 100) {
		cm.dispose();
		cm.openNpc (1012112);


            }  if (selection == 200) {
		if (cm.haveItem(4310185,1)) {
		    if (cm.canHold(4310185)) {
			cm.gainItem(4310185, -1);
			cm.gainMeso(10000000);
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

            }  if (selection == 201) {
		if (cm.haveItem(4310185,10)) {
		    if (cm.canHold(4310185)) {
			cm.gainItem(4310185, -10);
			cm.gainMeso(100000000);
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

            }  if (selection == 202) {
		if (cm.haveItem(4310185,100)) {
		    if (cm.canHold(4310185)) {
			cm.gainItem(4310185, -100);
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

            }  if (selection == 300) {
		if (cm.haveItem(4310184,1)) {
		    if (cm.canHold(4310184)) {
			cm.gainItem(4310184, -1);
			cm.gainMeso(50000000);
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

            }  if (selection == 301) {
		if (cm.haveItem(4310184,10)) {
		    if (cm.canHold(4310184)) {
			cm.gainItem(4310184, -10);
			cm.gainMeso(500000000);
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
		if (cm.haveItem(4310108,1)) {
		    if (cm.canHold(4310108)) {
			cm.gainItem(4310108, -1);
			cm.gainMeso(100000000);
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


            }  if (selection == 401) {
		if (cm.haveItem(4310108,10)) {
		    if (cm.canHold(4310108)) {
			cm.gainItem(4310108, -10);
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

            }  if (selection == 500) {
		if (cm.getMeso() >= 10000000) {
			cm.gainItem(4310185, 1);
			cm.gainMeso(-10000000);
		        cm.sendOk("교환완료.");
			cm.dispose();
		} else {
		    cm.sendOk("메소가 부족합니다.");
		    cm.dispose();

}

            }  if (selection == 501) {
		if (cm.getMeso() >= 50000000) {
			cm.gainItem(4310184, 1);
			cm.gainMeso(-50000000);
		        cm.sendOk("교환완료.");
			cm.dispose();
		} else {
		    cm.sendOk("메소가 부족합니다.");
		    cm.dispose();

}

            }  if (selection == 502) {
		if (cm.getMeso() >= 100000000) {
			cm.gainItem(4310108, 1);
			cm.gainMeso(-100000000);
		        cm.sendOk("교환완료.");
			cm.dispose();
		} else {
		    cm.sendOk("메소가 부족합니다.");
		    cm.dispose();

}

            }  if (selection == 503) {
		if (cm.getMeso() >= 1000000000) {
			cm.gainItem(4310108, 10);
			cm.gainMeso(-1000000000);
		        cm.sendOk("교환완료.");
			cm.dispose();
		} else {
		    cm.sendOk("메소가 부족합니다.");
		    cm.dispose();

}



		}
	}
}



