var count;

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
	var sel = 0;
	       var leaf = cm.itemQuantity(4310129);
	       var chat = "#fn나눔고딕 Extrabold#저는 #b썸머리밋 코인#k 으로 쥬얼을 만들고있어요\r\n혹시 찾으시는게 있으신가요? 어떤 쥬얼 재료가 필요하신가요?";
	       chat += "\r\n현재 #b#h0# 님#k 의 #b썸머리밋 코인#k 갯수는 #r"+ leaf +" 개#k 입니다."
	       chat += "\r\n\r\n#d아래 물품을 골라주세요.#k";
	       chat += "\r\n#b#L21##i4310129# (30 개)    -    #i1132191# (#z1132191#)"; // 쥬얼 크래프트 벨트
	       chat += "\r\n#L20##i4310129# (30 개)    -    #i1112762# (#z1112762#)\r\n"; // 쥬얼 크래프트 링

	       chat += "\r\n#L1##i4310129# (20 개)    -    #i4440000# (#z4440000#)";
	       chat += "\r\n#L2##i4310129# (20 개)    -    #i4441000# (#z4441000#)";
	       chat += "\r\n#L3##i4310129# (20 개)    -    #i4442000# (#z4442000#)";
	       chat += "\r\n#L4##i4310129# (20 개)    -    #i4443000# (#z4443000#)\r\n"; // S급

	       chat += "\r\n#L5##i4310129# (15 개)    -    #i4440100# (#z4440100#)";
	       chat += "\r\n#L6##i4310129# (15 개)    -    #i4441100# (#z4441100#)";
	       chat += "\r\n#L7##i4310129# (15 개)    -    #i4442100# (#z4442100#)";
	       chat += "\r\n#L8##i4310129# (15 개)    -    #i4443100# (#z4443100#)\r\n"; // A급

	       chat += "\r\n#L9##i4310129# (10 개)    -    #i4440200# (#z4440200#)";
	       chat += "\r\n#L10##i4310129# (10 개)    -    #i4441200# (#z4441200#)";
	       chat += "\r\n#L11##i4310129# (10 개)    -    #i4442200# (#z4442200#)";
	       chat += "\r\n#L12##i4310129# (10 개)    -    #i4443200# (#z4443200#)\r\n"; // B급

	       chat += "\r\n#L13##i4310129# (5 개)    -    #i4440300# (#z4440300#)";
	       chat += "\r\n#L14##i4310129# (5 개)    -    #i4441300# (#z4441300#)";
	       chat += "\r\n#L15##i4310129# (5 개)    -    #i4442300# (#z4442300#)";
	       chat += "\r\n#L16##i4310129# (5 개)    -    #i4443300# (#z4443300#)\r\n"; // C급

	       chat += "\r\n#L17##i4310129# (10 개)  - #i2049139# (#z2049139#)";
	       chat += "\r\n#L18##i4310129# (15 개)  - #i2049140# (#z2049140#)";
	       chat += "\r\n#L19##i4310129# (20 개)  - #i2049141# (#z2049141#)"; // 쥬얼 크래프트 주문서
	       cm.sendSimple(chat);

	    }  if (selection == 21) {
		if (cm.haveItem(4310129, 30)) {
		    if (cm.canHold(1132191)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #b쥬얼 크래프트 벨트#k 를 구매하였습니다.");

			cm.gainItem(4310129, -30);
			cm.gainItem(1132191, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 30 개 필요 ]#k");
		    cm.dispose();

}

	    }  if (selection == 20) {
		if (cm.haveItem(4310129, 30)) {
		    if (cm.canHold(1112762)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #b쥬얼 크래프트 링#k 을 구매하였습니다.");

			cm.gainItem(4310129, -30);
			cm.gainItem(1112762, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r장비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 30 개 필요 ]#k");
		    cm.dispose();

}

	    }  if (selection == 1) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(4440000)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bS급 힘의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -20);
			cm.gainItem(4440000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 20 개 필요 ]#k");
		    cm.dispose();

}	
				
	    }  if (selection == 2) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(4441000)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bS급 행운의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -20);
			cm.gainItem(4441000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 20 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 3) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(4442000)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bS급 지혜의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -20);
			cm.gainItem(4442000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 20 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 4) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(4443000)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bS급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -20);
			cm.gainItem(4443000, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 20 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 5) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(4440100)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bA급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -15);
			cm.gainItem(4440100, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 15 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 6) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(4441100)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bA급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -15);
			cm.gainItem(4441100, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 15 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 7) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(4442100)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bA급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -15);
			cm.gainItem(4442100, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 15 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 8) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(4443100)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bA급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -15);
			cm.gainItem(4443100, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 15 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 9) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(4440200)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bB급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -10);
			cm.gainItem(4440200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 10 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 10) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(4441200)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bB급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -10);
			cm.gainItem(4441200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 10 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 11) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(4442200)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bB급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -10);
			cm.gainItem(4442200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 10 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 12) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(4443200)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bB급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -10);
			cm.gainItem(4443200, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 10 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 13) {
		if (cm.haveItem(4310129, 5)) {
		    if (cm.canHold(4440300)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bC급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -5);
			cm.gainItem(4440300, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 5 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 14) {
		if (cm.haveItem(4310129, 5)) {
		    if (cm.canHold(4441300)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bC급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -5);
			cm.gainItem(4441300, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 5 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 15) {
		if (cm.haveItem(4310129, 5)) {
		    if (cm.canHold(4442300)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bC급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -5);
			cm.gainItem(4442300, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 5 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 16) {
		if (cm.haveItem(4310129, 5)) {
		    if (cm.canHold(4443300)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #bC급 민첩함의 쥬얼#k 을 구매하였습니다.");

			cm.gainItem(4310129, -5);
			cm.gainItem(4443300, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r기타 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 5 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 17) {
		if (cm.haveItem(4310129, 10)) {
		    if (cm.canHold(2049139)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #b쥬얼링의 혼돈의 주문서 60%#k 를 구매하였습니다.");

			cm.gainItem(4310129, -10);
			cm.gainItem(2049139, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 10 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 18) {
		if (cm.haveItem(4310129, 15)) {
		    if (cm.canHold(2049140)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #b쥬얼링의 놀라운 혼돈의 주문서 40%#k 를 구매하였습니다.");

			cm.gainItem(4310129, -15);
			cm.gainItem(2049140, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 15 개 필요 ]#k");
		    cm.dispose();

}
	    }  if (selection == 19) {
		if (cm.haveItem(4310129, 20)) {
		    if (cm.canHold(2049141)) {
		        cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 으로 #b쥬얼링의 긍정의 혼돈의 주문서 30%#k 를 구매하였습니다.");

			cm.gainItem(4310129, -20);
			cm.gainItem(2049141, 1);
			cm.dispose();
		    } else {
		        cm.sendOk("#fn나눔고딕 Extrabold##r소비 칸에 빈 공간이 없습니다.#k");
		        cm.dispose();
		    }
		} else {
		    cm.sendOk("#fn나눔고딕 Extrabold##b썸머리밋 코인#k 이 부족합니다.\r\n#r[ 썸머리밋 코인 20 개 필요 ]#k");
		    cm.dispose();

}
	 
		}
	}
}