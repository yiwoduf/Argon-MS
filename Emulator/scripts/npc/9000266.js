var status = -1;

function start() {
    status = -1;
    action (1, 0, 0);
}

function action(mode, type, selection) {
    if (mode == -1 || mode == 0) {
        cm.dispose();
        return;
    }
    if (mode == 1) {
        status++;
    }
        if (status == 0) {
		cm.sendSimple("#r 리플온라인 공용상점 !! #k\r\n#L2##r[HOT]#k#b[소비 상점]#k#l#L102##r[NEW]#k#b[악세 상점]#k#l\r\n#r#k#l#L12##r[NEW]#k#b[변신 상점]#k#l\r\n#L6##r[NEW]#k#b[데미지스킨 상점]#k#l#L103##r[NEW]#k#b[보조무기]#k#l");
        } else if (status == 1) {
		if (selection == 0) {
			cm.sendOk("상품권후원은 아래양식에 맞게 작성해서 메일로 보내주세요\r\n상품권이름 : \r\n상품권핀번호 : \r\n상품권발행일자(해피머니일경우) : \r\n상품권금액 : \r\n지급받을닉네임 : \r\n kki_looking@naver.com 으로 이렇게 양식에맞춰보내시면\r\n최대한 빨리지급해드리겠습니다.\r\n가격표는 www.coreple.kr.pe 접속후 후원공지보세요\r\n총운영자 외 다른운영자한테는 절대후원이불가능합니다.");
		} else if (selection == 1) {
			cm.openShop(20121125);
		} else if (selection == 5) {
			cm.openShop(9000153);
      } else if (selection == 2) {
        cm.openShop (10068);
        cm.dispose();
	return;

      } else if (selection == 3) {
        cm.dispose();
        cm.openShop(2134010);
	return;

      } else if (selection == 4) {
        cm.dispose();
        cm.openShop(10070);
	return;

      } else if (selection == 12) {
        cm.dispose();
        cm.openShop(10071);
	return;

      } else if (selection == 6) {
        cm.dispose();
        cm.openShop(9000069);
	return;

      } else if (selection == 5) {
        cm.dispose();
        cm.openNpc(10071);
	return;

      } else if (selection == 20) {
        cm.dispose();
        cm.openShop(2134005);
	return;

      } else if (selection == 102) {
        cm.dispose();
        cm.openShop(10069);
	return;
      } else if (selection == 103) {
	cm.dispose();
	cm.openShop(10067);

      } else if (selection == 104) {
        cm.dispose();
        cm.openNpc(9000175);
	return;

      } else if (selection == 100) {
        cm.dispose();
        cm.openNpc(2101018);
	return;

      } else if (selection == 101) {
        cm.dispose();
        cm.openNpc(9250007);
	return;
		}
		cm.dispose();
	}
    
}
