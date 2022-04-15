function start() {
	cm.sendSimple("#fn나눔고딕 Extrabold#안녕하세요? #d캐릭터 AP 강화#k 에 관심 있으신가요?\r\n아래의 항목중 원하시는 분야를 선택해주세요.\r\n#L0##b캐릭터 AP 강화 진행#k\r\n#L1##b캐릭터 AP 강화에 대한 설명#k");
}

function action (mode, type, selection) {
	cm.dispose();
if (selection == 0) {
          var rand = Math.floor(Math.random() * 17);

	     if (cm.haveItem(4310129,100) && rand == 0) {
                 cm.getPlayer().gainAp(1);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 1 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 1 이 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 1) {
                 cm.getPlayer().gainAp(1);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 1 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 1 이 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 2) {
                 cm.getPlayer().gainAp(2);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 2 가 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 2 가 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 3) {
                 cm.getPlayer().gainAp(2);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 2 가 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 2 가 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 4) {
                 cm.getPlayer().gainAp(3);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 3 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 3 이 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 5) {
                 cm.getPlayer().gainAp(3);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 3 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 3 이 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 6) {
                 cm.getPlayer().gainAp(4);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 4 가 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 4 가 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 7) {
                 cm.getPlayer().gainAp(4);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 4 가 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 4 가 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 8) {
                 cm.getPlayer().gainAp(5);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 5 가 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 5 가 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 9) {
                 cm.getPlayer().gainAp(5);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 5 가 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 5 가 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 10) {
                 cm.getPlayer().gainAp(6);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 6 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 6 이 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 11) {
                 cm.getPlayer().gainAp(6);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 6 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 6 이 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 14) {
                 cm.getPlayer().gainAp(7);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 7 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 7 이 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 15) {
                 cm.getPlayer().gainAp(8);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 8 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 8 이 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 16) {
                 cm.getPlayer().gainAp(9);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 9 가 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 9 가 올라갔습니다.");

                } else if (cm.haveItem(4310038,30) && rand == 17) {
                 cm.getPlayer().gainAp(10);
	         cm.gainItem(4310129,-100);
	         cm.getPlayer().dropMessage(1, "어빌리티 포인트 + 10 이 올라갔습니다.");
                 cm.getPlayer().dropMessage(5, "어빌리티 포인트 + 10 이 올라갔습니다.");

            } else {
                cm.sendOk("#fn나눔고딕 Extrabold##b엠퍼러스 코인#k 을 #r30 개#k 보유중인지 확인해주세요.");
                cm.dispose();
            }
	} else if (selection == 1) {
		cm.sendOk("#fn나눔고딕 Extrabold##d캐릭터 AP 강화#k 란 유저분들을 위해 마련된 시스템으로써\r\n#b엠퍼러스 코인#k 으로 사용하는 #dAP 강화 기능#k 입니다.\r\n\r\n강화에는 #b엠퍼러스 코인#k #r100 개#k 가 소모되며\r\n무작위 랜덤으로 #r1 ~ 10 AP#k 가 지급됩니다.");
		cm.dispose();
}
}